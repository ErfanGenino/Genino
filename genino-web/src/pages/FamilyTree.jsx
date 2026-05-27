// src/pages/FamilyTree.jsx

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import InviteModal from "../components/FamilyTree/InviteModal";
import { authFetch } from "../services/api";
import FamilyCircle from "../components/FamilyTree/FamilyCircle";
import FamilyLayerRow from "../components/FamilyTree/FamilyLayerRow";
import { useNavigate } from "react-router-dom";



export default function FamilyTree({ show, onClose, child, father, mother }) {

  const navigate = useNavigate();

  const currentUser = JSON.parse(
  localStorage.getItem("genino_user") || "null"
);

const isParent =
  String(father?.userId) === String(currentUser?.id) ||
  String(mother?.userId) === String(currentUser?.id);

  const [nodes, setNodes] = useState([
  // 👨‍👩 والدین
  { id: null, label: "پدر", relationType: "father", nodeStatus: "CONNECTED" },
  { id: null, label: "مادر", relationType: "mother", nodeStatus: "CONNECTED" },

  // 👴👵 پدربزرگ‌ها و مادربزرگ‌ها (پدری)
  {
    id: null,
    label: "پدربزرگ پدری",
    relationType: "grandfather_paternal",
    nodeStatus: "EMPTY",
  },
  {
    id: null,
    label: "مادربزرگ پدری",
    relationType: "grandmother_paternal",
    nodeStatus: "EMPTY",
  },

  // 👴👵 پدربزرگ‌ها و مادربزرگ‌ها (مادری)
  {
    id: null,
    label: "پدربزرگ مادری",
    relationType: "grandfather_maternal",
    nodeStatus: "EMPTY",
  },
  {
    id: null,
    label: "مادربزرگ مادری",
    relationType: "grandmother_maternal",
    nodeStatus: "EMPTY",
  },
]);



  // ✅ بخش‌های قابل افزایش با دکمه +
  const [sisters, setSisters] = useState([]);
  const [brothers, setBrothers] = useState([]);
  const [aunts, setAunts] = useState([]);     // عمه‌ها
  const [uncles, setUncles] = useState([]);   // عموها
  const [khaleha, setKhaleha] = useState([]); // خاله‌ها
  const [dayiha, setDayiha] = useState([]);   // دایی‌ها
  const [friends, setFriends] = useState([]);   // 👥 دوستان (سمت چپ)
  const [inviteTarget, setInviteTarget] = useState(null);
  const [pendingInvites, setPendingInvites] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
// شکل داده: { link, message, roleLabel, childName }

  



function metaByPrefix(prefix) {
  return {
    relationType: prefix,
    relationLabel:
      prefix === "S" ? "خواهر" :
      prefix === "B" ? "برادر" :
      prefix === "AM" ? "عمه" :
      prefix === "AO" ? "عمو" :
      prefix === "KH" ? "خاله" :
      prefix === "DY" ? "دایی" :
      prefix === "FR" ? "سایر دوستان" :
      prefix === "RL" ? "قوم" :
      "عضو",
    emoji:
      prefix === "S" ? "👧" :
      prefix === "B" ? "👦" :
      prefix === "AM" ? "👩" :
      prefix === "AO" ? "👨" :
      prefix === "KH" ? "👩" :
      prefix === "DY" ? "👨" :
      prefix === "FR" ? "👥" :
      prefix === "RL" ? "🧬" :
      "👤",
  };
}

function ensureSlotAndSetPending(setter, prefix, slot) {
  const meta = metaByPrefix(prefix);

  setter((prev) => {
    const arr = [...prev];

    // اگر آرایه کوتاه بود، تا slot پرش کن
    while (arr.length <= slot) {
      arr.push({
        id: null,
        fullName: null,
        relationType: meta.relationType,
        relationLabel: meta.relationLabel,
        emoji: meta.emoji,
        nodeStatus: "EMPTY",
        userId: null,
        overridePhoto: null,
        slot: arr.length, // ✅ خیلی مهم
      });
    }

    // حالا دقیقاً همون slot رو pending کن
    arr[slot] = { ...arr[slot], nodeStatus: "PENDING" };

    return arr;
  });
}

function ensureSlotAndSetConnected(setter, prefix, slot, member) {
  const meta = metaByPrefix(prefix);

  setter((prev) => {
    const arr = [...prev];

    while (arr.length <= slot) {
      arr.push({
        id: null,
        fullName: null,
        relationType: meta.relationType,
        relationLabel: meta.relationLabel,
        emoji: meta.emoji,
        nodeStatus: "EMPTY",
        userId: null,
        avatarUrl: null,
        overridePhoto: null,
        slot: arr.length,
      });
    }

    arr[slot] = {
      ...arr[slot],
      nodeStatus: "CONNECTED",
      fullName: member?.user?.fullName || arr[slot].fullName,
      userId: member?.userId || arr[slot].userId,
      id: member?.id || arr[slot].id,
      avatarUrl: member?.user?.avatarUrl || null,
      photo: member?.user?.avatarUrl || null,
    };

    return arr;
  });
}


function backendRTtoPrefix(rt) {
  const map = {
    sister: "S",
    brother: "B",
    amme: "AM",
    ammo: "AO",
    khale: "KH",
    dayi: "DY",
    friend: "FR",
    relative: "FR",

    // این‌ها همونطور بمونن
    grandfather_paternal: "grandfather_paternal",
    grandmother_paternal: "grandmother_paternal",
    grandfather_maternal: "grandfather_maternal",
    grandmother_maternal: "grandmother_maternal",
  };

  return map[rt] || rt;
}



  async function loadPendingInvites() {
  if (!show || !child?.id) return;

  try {
    const res = await authFetch(`/family-tree/${child.id}/pending-invitations`);
    if (!res?.ok) return;

    const base =
      window.location.origin.includes("localhost")
        ? "http://localhost:5173"
        : "https://genino.ir";

    // ✅ Dedup: برای هر (relationType, slot) فقط جدیدترین pending نگه داشته می‌شود
    const map = new Map();
    for (const inv of res.pendingInvitations || []) {
      const key = `${inv.relationType}:${inv.slot}`;
      const prev = map.get(key);

      if (!prev) {
        map.set(key, inv);
        continue;
      }

      // جدیدترین createdAt رو نگه داریم
      const prevT = new Date(prev.createdAt).getTime();
      const curT = new Date(inv.createdAt).getTime();
      if (curT > prevT) map.set(key, inv);
    }

    const pendingUnique = Array.from(map.values());

    setPendingInvites(pendingUnique);
  } catch (e) {
    console.log("loadPendingInvites error:", e);
  }
}


async function loadMembers() {
  if (!show || !child?.id) return;

  try {
    const res = await authFetch(`/family-tree/${child.id}/members`);
    if (!res?.ok) return;

    setMembers(res.members || []);
    console.log("MEMBERS:", res.members);
  } catch (e) {
    console.log("loadMembers error:", e);
  }
}



useEffect(() => {
  loadPendingInvites();
  loadMembers();
}, [show, child?.id]);

useEffect(() => {
  if (!show || !child?.id) return;

  // ✅ اول همه‌چی ریست
  setSisters([]);
  setBrothers([]);
  setAunts([]);
  setUncles([]);
  setKhaleha([]);
  setDayiha([]);
  setFriends([]);

  setNodes((prev) =>
  prev.map((node) => ({
    ...node,
    nodeStatus:
      node.relationType === "father" ||
      node.relationType === "mother"
        ? "CONNECTED"
        : "EMPTY",
    fullName: null,
    avatarUrl: null,
    userId: null,
    id: null,
  }))
);


  // ✅ اول members رو CONNECTED کن (سبز)
  members.forEach((m) => {
    const role = m.role;
    const slot = Number.isFinite(m.slot) ? m.slot : 0;

    if (role === "sister") ensureSlotAndSetConnected(setSisters, "S", slot, m);
    if (role === "brother") ensureSlotAndSetConnected(setBrothers, "B", slot, m);

    if (role === "amme") ensureSlotAndSetConnected(setAunts, "AM", slot, m);
    if (role === "ammo") ensureSlotAndSetConnected(setUncles, "AO", slot, m);

    if (role === "khale") ensureSlotAndSetConnected(setKhaleha, "KH", slot, m);
    if (role === "dayi") ensureSlotAndSetConnected(setDayiha, "DY", slot, m);

    if (role === "friend" || role === "relative")
  ensureSlotAndSetConnected(setFriends, "FR", slot, m);
if (
  [
    "grandfather_paternal",
    "grandmother_paternal",
    "grandfather_maternal",
    "grandmother_maternal",
  ].includes(role)
) {
  setNodes((prev) =>
    prev.map((node) =>
      node.relationType === role
        ? {
            ...node,
            nodeStatus: "CONNECTED",
            fullName: m?.user?.fullName || node.fullName,
            avatarUrl: m?.user?.avatarUrl || null,
            userId: m?.userId || node.userId,
            id: m?.id || node.id,
          }
        : node
    )
  );
}
  });

  // ✅ بعد pending ها رو فقط اگر اون slot هنوز CONNECTED نیست PENDING کن (زرد)
  pendingInvites.forEach((inv) => {
    const rt = backendRTtoPrefix(inv.relationType);
    const slot = inv.slot;
    if (
  [
    "grandfather_paternal",
    "grandmother_paternal",
    "grandfather_maternal",
    "grandmother_maternal",
  ].includes(rt)
) {
  setNodes((prev) =>
    prev.map((node) =>
      node.relationType === rt
        ? { ...node, nodeStatus: "PENDING" }
        : node
    )
  );
  return;
}

    // اگر اون عضو قبلاً CONNECTED شده، دیگه زردش نکن
    const isAlreadyConnected = members.some(
      (m) => backendRTtoPrefix(m.role) === rt && m.slot === slot
    );
    if (isAlreadyConnected) return;

    if (rt === "S") ensureSlotAndSetPending(setSisters, "S", slot);
    if (rt === "B") ensureSlotAndSetPending(setBrothers, "B", slot);

    if (rt === "AM") ensureSlotAndSetPending(setAunts, "AM", slot);
    if (rt === "AO") ensureSlotAndSetPending(setUncles, "AO", slot);

    if (rt === "KH") ensureSlotAndSetPending(setKhaleha, "KH", slot);
    if (rt === "DY") ensureSlotAndSetPending(setDayiha, "DY", slot);

    if (rt === "FR") ensureSlotAndSetPending(setFriends, "FR", slot);
  });
}, [show, child?.id, members, pendingInvites]);

function normalizedRT(rt) {
  // rt ممکنه 'KH' یا 'khale' یا ... باشه
  const map = {
    KH: "khale",
    DY: "dayi",
    AM: "amme",
    AO: "ammo",
    FR: "friend", // هر چیزی که تو UI "سایر" هست، در بک‌اند دوست/relative میاد، پس نرمالش = friend
    S: "sister",
    B: "brother",
  };
  return map[rt] || rt;
}

function findPendingInvitationId(relationType, slot) {
  const rt = normalizedRT(relationType);
  const inv = pendingInvites.find(
    (x) => normalizedRT(x.relationType) === rt && Number(x.slot) === Number(slot)
  );
  return inv?.id || null;
}

function findMemberId(role, slot) {
  const rt = normalizedRT(role);
  const m = members.find(
    (x) => normalizedRT(x.role) === rt && Number(x.slot) === Number(slot)
  );
  return m?.id || null;
}


async function handleCancelInvite(relationType, slot) {
  const invitationId = findPendingInvitationId(relationType, slot);
  if (!invitationId) return;

  const ok = window.confirm("دعوت لغو شود؟");
  if (!ok) return;

  try {
    const res = await authFetch(`/invitations/${invitationId}`, {
      method: "DELETE",
    });

    if (!res?.ok) {
      alert(res?.message || "لغو دعوت ناموفق بود.");
      return;
    }

    const fixedRoles = [
  "grandfather_paternal",
  "grandmother_paternal",
  "grandfather_maternal",
  "grandmother_maternal",
];

if (fixedRoles.includes(relationType)) {
  setNodes((prev) =>
    prev.map((node) =>
      node.relationType === relationType
        ? { ...node, nodeStatus: "EMPTY" }
        : node
    )
  );
}

    await loadPendingInvites();
    await loadMembers();
  } catch (e) {
    alert("خطا در اتصال به سرور.");
  }
}

async function handleRemoveMember(role, slot) {
  if (!child?.id) return;

  const memberId = findMemberId(role, slot);
  if (!memberId) return;

  const ok = window.confirm("اتصال این عضو لغو شود؟");
  if (!ok) return;

  try {
    const res = await authFetch(`/family-tree/${child.id}/members/${memberId}`, {
      method: "DELETE",
    });

    if (!res?.ok) {
      alert(res?.message || "لغو اتصال ناموفق بود.");
      return;
    }

    const fixedRoles = [
  "grandfather_paternal",
  "grandmother_paternal",
  "grandfather_maternal",
  "grandmother_maternal",
];

if (fixedRoles.includes(role)) {
  setNodes((prev) =>
    prev.map((node) =>
      node.relationType === role
        ? {
            ...node,
            nodeStatus: "EMPTY",
            fullName: null,
            avatarUrl: null,
            userId: null,
            id: null,
          }
        : node
    )
  );
}

    await loadPendingInvites();
    await loadMembers();
  } catch (e) {
    alert("خطا در اتصال به سرور.");
  }
}

function renderCircle(item, i) {
  return (
    <FamilyCircle
      nodeStatus={item.nodeStatus}
      emoji={item.emoji}
      fullName={item.fullName}
      photo={item.photo || item.avatarUrl}
      relationLabel={item.relationLabel}
      onClick={() => {
        if (item.nodeStatus === "EMPTY") {

          if (!isParent) return;

          setInviteTarget({
            childId: child?.id,
            label: item.relationLabel,
            relationType: item.relationType,
            slot: item.slot,
            roleLabel: item.relationLabel,
            index: i,
            side: "single", // تو لایه جدید دیگه چپ/راست نداریم
          });
          return;
        }

        if (item.nodeStatus === "PENDING") {
          handleCancelInvite(item.relationType, item.slot);
        }
        if (item.nodeStatus === "CONNECTED") {
          setSelectedMember({
            ...item,
            relationLabel: item.relationLabel,
            role: item.relationType,
            slot: item.slot,
          });
        }
      }}
      onDelete={() => {
        if (item.nodeStatus === "PENDING") return handleCancelInvite(item.relationType, item.slot);
        if (item.nodeStatus === "CONNECTED") return handleRemoveMember(item.relationType, item.slot);

        if (item.nodeStatus === "EMPTY") {
          // حذف اسلات
          const setter =
            item.relationType === "S" ? setSisters :
            item.relationType === "B" ? setBrothers :
            item.relationType === "KH" ? setKhaleha :
            item.relationType === "AM" ? setAunts :
            item.relationType === "DY" ? setDayiha :
            item.relationType === "AO" ? setUncles :
            // سایر: FR و RL با هم می‌شن "سایر" ولی فعلا اینجا جدا مدیریت می‌کنیم
            item.relationType === "FR" ? setFriends :
            null;

          if (!setter) return;

          setter((prev) =>
            prev
              .filter((_, idx) => idx !== i)
              .map((x, idx) => ({ ...x, slot: idx }))
          );
        }
      }}
    />
  );
}

function setPendingByTarget(t) {
  const fixedRoles = [
    "grandfather_paternal",
    "grandmother_paternal",
    "grandfather_maternal",
    "grandmother_maternal",
  ];

  if (fixedRoles.includes(t?.relationType)) {
    setNodes((prev) =>
      prev.map((node) =>
        node.relationType === t.relationType
          ? { ...node, nodeStatus: "PENDING" }
          : node
      )
    );
    return;
  }

  const map = {
    S: setSisters,
    B: setBrothers,
    KH: setKhaleha,
    AM: setAunts,
    DY: setDayiha,
    AO: setUncles,
    FR: setFriends,
  };

  const setter = map[t?.relationType];
  if (!setter) return;

  setter((prev) =>
    prev.map((item, idx) =>
      (Number.isFinite(t.index) ? idx === t.index : Number(item.slot) === Number(t.slot))
        ? { ...item, nodeStatus: "PENDING" }
        : item
    )
  );
}

  
if (!show) return null;

  return (
  <div
    className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-[2px]"
    onClick={onClose}
  >
    <motion.div
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-0 left-0 w-full h-[85vh] bg-gradient-to-b from-[#fff8dc] via-[#ffe88a] to-[#ffd95c]
                 shadow-[0_-10px_30px_rgba(212,175,55,0.3)] rounded-t-3xl overflow-y-auto"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 22, stiffness: 180 }}
    >
      {/* 🌿 هدر بالا */}
      <div className="flex justify-center items-center p-5 border-b border-yellow-300 relative">
        <h2 className="text-xl font-bold text-yellow-800">🌿 درختواره خانوادگی</h2>
        <button
          onClick={onClose}
          className="absolute right-5 text-yellow-700 hover:text-yellow-900 transition"
        >
          ✕
        </button>
      </div>

      {/* 🧬 کل محتوا */}
      <div className="flex flex-col items-center py-10 px-6 space-y-10 w-full max-w-4xl mx-auto">

        {/* 👶 کودک */}
        {/* 👶 هدر کودک (داینامیک از MyChild) */}
<div className="flex flex-col items-center text-center">
  <div className="w-28 h-28 rounded-full bg-white/90 border border-yellow-400 shadow-md flex items-center justify-center overflow-hidden">
    {child?.photo ? (
      <img src={child.photo} alt={child.fullName} className="w-full h-full object-cover" />
    ) : (
      <span className="text-3xl font-bold text-yellow-700">
        {child?.fullName?.[0] || "👶"}
      </span>
    )}
  </div>

  <p className="mt-3 text-lg font-extrabold text-yellow-900">
    {child?.fullName || "نام کودک"}
  </p>

  <p className="mt-1 text-xs text-gray-600">
    درختواره خانوادگی
  </p>
</div>


        {/* 👨‍👩 والدین */}
{/* 👨‍👩 والدین (داینامیک از MyChild) */}
<div className="flex justify-center gap-10 sm:gap-16 items-start">
  {/* پدر */}
  <div className="flex flex-col items-center text-center">
    <div className="w-20 h-20 rounded-full bg-white/90 border border-yellow-300 shadow-sm flex items-center justify-center overflow-hidden">
      {father?.avatarUrl ? (
        <img src={father.avatarUrl} alt={father.fullName || "پدر"} className="w-full h-full object-cover" />
      ) : (
        <span className="text-xl text-gray-700 font-bold">👨</span>
      )}
    </div>

    <p className="mt-2 text-sm font-semibold text-gray-800">
      {father?.fullName || "پدر"}
    </p>
    <p className="text-xs text-gray-500">پدر</p>
  </div>

  {/* مادر */}
  <div className="flex flex-col items-center text-center">
    <div className="w-20 h-20 rounded-full bg-white/90 border border-yellow-300 shadow-sm flex items-center justify-center overflow-hidden">
      {mother?.avatarUrl ? (
        <img src={mother.avatarUrl} alt={mother.fullName || "مادر"} className="w-full h-full object-cover" />
      ) : (
        <span className="text-xl text-gray-700 font-bold">👩</span>
      )}
    </div>

    <p className="mt-2 text-sm font-semibold text-gray-800">
      {mother?.fullName || "ثبت نشده"}
    </p>
    <p className="text-xs text-gray-500">مادر</p>
  </div>
</div>




        {/* 👴 پدربزرگ‌ها و مادربزرگ‌ها */}
        {/* 👴👵 پدربزرگ‌ها و مادربزرگ‌ها (داینامیک از nodes) */}
<div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-8">
  {nodes
    .filter((n) =>
      [
        "grandfather_paternal",
        "grandmother_paternal",
        "grandfather_maternal",
        "grandmother_maternal",
      ].includes(n.relationType)
    )
    .map((node) => (
      <div key={node.relationType} className="flex flex-col items-center">
       <FamilyCircle
  nodeStatus={node.nodeStatus}
  emoji={node.relationType.includes("grandfather") ? "👴" : "👵"}
  fullName={node.fullName}
  photo={node.avatarUrl}
  relationLabel={node.label}
  onClick={() => {
    if (node.nodeStatus === "EMPTY") {

  if (!isParent) return;

  setInviteTarget({
        childId: child?.id,
        label: node.label,
        relationType: node.relationType,
        roleLabel: node.label,
        slot: 0,
      });
      return;
    }

    if (node.nodeStatus === "PENDING") {
      return handleCancelInvite(node.relationType, 0);
    }
    if (node.nodeStatus === "CONNECTED") {
  setSelectedMember({
    ...node,
    photo: node.avatarUrl,
    relationLabel: node.label,
    role: node.relationType,
    slot: 0,
  });
}
  }}
  onDelete={() => {
    if (node.nodeStatus === "PENDING") {
      return handleCancelInvite(node.relationType, 0);
    }
  }}
/>
      </div>
    ))}
</div>



<FamilyLayerRow
  title="خواهرها"
  items={sisters}
  onAdd={() =>
    setSisters((prev) => [
      ...prev,
      {
        id: null,
        fullName: null,
        relationType: "S",
        slot: prev.length,
        relationLabel: "خواهر",
        emoji: "👧",
        nodeStatus: "EMPTY",
        userId: null,
        overridePhoto: null,
      },
    ])
  }
  renderItem={renderCircle}
/>

<FamilyLayerRow
  title="برادرها"
  items={brothers}
  onAdd={() =>
    setBrothers((prev) => [
      ...prev,
      {
        id: null,
        fullName: null,
        relationType: "B",
        slot: prev.length,
        relationLabel: "برادر",
        emoji: "👦",
        nodeStatus: "EMPTY",
        userId: null,
        overridePhoto: null,
      },
    ])
  }
  renderItem={renderCircle}
/>

<FamilyLayerRow
  title="خاله‌ها"
  items={khaleha}
  onAdd={() =>
    setKhaleha((prev) => [
      ...prev,
      {
        id: null,
        fullName: null,
        relationType: "KH",
        slot: prev.length,
        relationLabel: "خاله",
        emoji: "👩",
        nodeStatus: "EMPTY",
        userId: null,
        overridePhoto: null,
      },
    ])
  }
  renderItem={renderCircle}
/>

<FamilyLayerRow
  title="عمه‌ها"
  items={aunts}
  onAdd={() =>
    setAunts((prev) => [
      ...prev,
      {
        id: null,
        fullName: null,
        relationType: "AM",
        slot: prev.length,
        relationLabel: "عمه",
        emoji: "👩",
        nodeStatus: "EMPTY",
        userId: null,
        overridePhoto: null,
      },
    ])
  }
  renderItem={renderCircle}
/>

<FamilyLayerRow
  title="دایی‌ها"
  items={dayiha}
  onAdd={() =>
    setDayiha((prev) => [
      ...prev,
      {
        id: null,
        fullName: null,
        relationType: "DY",
        slot: prev.length,
        relationLabel: "دایی",
        emoji: "👨",
        nodeStatus: "EMPTY",
        userId: null,
        overridePhoto: null,
      },
    ])
  }
  renderItem={renderCircle}
/>

<FamilyLayerRow
  title="عموها"
  items={uncles}
  onAdd={() =>
    setUncles((prev) => [
      ...prev,
      {
        id: null,
        fullName: null,
        relationType: "AO",
        slot: prev.length,
        relationLabel: "عمو",
        emoji: "👨",
        nodeStatus: "EMPTY",
        userId: null,
        overridePhoto: null,
      },
    ])
  }
  renderItem={renderCircle}
/>

<FamilyLayerRow
  title="سایر دوستان"
  items={friends}
  onAdd={() =>
    setFriends((prev) => [
      ...prev,
      {
        id: null,
        fullName: null,
        relationType: "FR",
        slot: prev.length,
        relationLabel: "سایر دوستان",
        emoji: "👥",
        nodeStatus: "EMPTY",
        userId: null,
        overridePhoto: null,
      },
    ])
  }
  renderItem={renderCircle}
/>



      </div>

      {/* ⬇️⬇️⬇️ مودال Invite دقیقاً اینجا ⬇️⬇️⬇️ */}
      <InviteModal
  open={!!inviteTarget}
  target={inviteTarget}   // ✅ جدید
  child={child}
  title={`دعوت ${inviteTarget?.label || ""}`}
  description={`می‌خواهید ${inviteTarget?.label} را به درختواره کودک اضافه کنید؟`}
  onClose={() => setInviteTarget(null)}
  onConfirm={async () => {
  if (!inviteTarget) return;

  const t = inviteTarget;

  if (t?.slot !== undefined && t?.slot !== null) {
    setPendingByTarget(t);
  }

  setInviteTarget(null);


  alert("دعوت با موفقیت برای کاربر ژنینو ارسال شد.");

  await loadPendingInvites();
  await loadMembers();
}}

  />



{selectedMember && (
  <div
    className="fixed inset-0 z-[200] bg-black/40 flex items-center justify-center px-4"
    onClick={() => setSelectedMember(null)}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-xs bg-white rounded-3xl shadow-2xl p-6 text-center relative"
    >
      <button
        onClick={() => setSelectedMember(null)}
        className="absolute top-3 left-3 text-gray-400 hover:text-gray-700"
      >
        ✕
      </button>

      <div className="flex flex-col items-center">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-yellow-300 shadow-md">
          {selectedMember.photo ? (
            <img
              src={selectedMember.photo}
              alt={selectedMember.fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-5xl">
              {selectedMember.emoji || "👤"}
            </div>
          )}
        </div>

        <h3 className="mt-4 text-lg font-extrabold text-gray-800">
          {selectedMember.fullName || "عضو خانواده"}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {selectedMember.relationLabel}
        </p>

        <div className="flex flex-col gap-3 w-full mt-6">
          <button
  onClick={() => {
    navigate("/social", {
      state: {
        openPrivateChatUser: {
          id: selectedMember.userId,
          name: selectedMember.fullName,
          avatarUrl: selectedMember.photo || null,
        },
      },
    });

    setSelectedMember(null);
    onClose?.();
  }}
  className="w-full py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-bold transition"
>
  چت خصوصی
</button>

          {isParent && (
          <button
            onClick={() => {
              handleRemoveMember(
                selectedMember.role,
                selectedMember.slot
              );
              setSelectedMember(null);
            }}
            className="w-full py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold transition"
          >
            حذف اتصال
          </button>
          )}
        </div>
      </div>
    </div>
  </div>
)}


        </motion.div>
  </div>
);
}
