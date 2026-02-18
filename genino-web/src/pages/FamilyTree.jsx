// src/pages/FamilyTree.jsx

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import InviteModal from "../components/FamilyTree/InviteModal";
import { authFetch } from "../services/api";
import ShareInviteModal from "../components/FamilyTree/ShareInviteModal";
import FamilyCircle from "../components/FamilyTree/FamilyCircle";
import FamilyLayerRow from "../components/FamilyTree/FamilyLayerRow";
import { buildInviteLink, buildInviteMessage } from "../utils/inviteShare";



export default function FamilyTree({ show, onClose, child, father, mother }) {

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


const [fatherOverridePhoto, setFatherOverridePhoto] = useState(null);
const [motherOverridePhoto, setMotherOverridePhoto] = useState(null);
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
  const [shareInvite, setShareInvite] = useState(null);
// شکل داده: { link, message, roleLabel, childName }

  


useEffect(() => {
  return () => {
    if (fatherOverridePhoto) URL.revokeObjectURL(fatherOverridePhoto);
    if (motherOverridePhoto) URL.revokeObjectURL(motherOverridePhoto);
  };
}, [fatherOverridePhoto, motherOverridePhoto]);


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
      prefix === "FR" ? "سایر" :
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

    // تا slot بساز
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
        slot: arr.length,
      });
    }

    // ✅ همون slot رو CONNECTED کن + نام
    arr[slot] = {
      ...arr[slot],
      nodeStatus: "CONNECTED",
      fullName: member?.user?.fullName || arr[slot].fullName,
      userId: member?.userId || arr[slot].userId,
      id: member?.id || arr[slot].id,
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

    const pendingUnique = Array.from(map.values()).map((x) => ({
      ...x,
      inviteLink: x.token ? `${base}/invite/${x.token}` : null,
    }));

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
  });

  // ✅ بعد pending ها رو فقط اگر اون slot هنوز CONNECTED نیست PENDING کن (زرد)
  pendingInvites.forEach((inv) => {
    const rt = backendRTtoPrefix(inv.relationType);
    const slot = inv.slot;

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

function openShareForPending(relationType, slot, roleLabelFallback) {
  const rt = normalizedRT(relationType);

  const inv = pendingInvites.find(
    (x) => normalizedRT(x.relationType) === rt && Number(x.slot) === Number(slot)
  );

  if (!inv?.token) {
    alert("برای این دعوت، لینک دستی پیدا نشد.");
    return;
  }

  const link = buildInviteLink(inv.token);
  const childName = child?.fullName || "";
  const roleLabel = roleLabelFallback || inv.roleLabel || "عضو خانواده";
  const message = buildInviteMessage({ roleLabel, childName, link });

  setShareInvite({ link, message, roleLabel, childName });
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
      relationLabel={item.relationLabel}
      onClick={() => {
        if (item.nodeStatus === "EMPTY") {
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
          openShareForPending(item.relationType, item.slot, item.relationLabel);
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
    <motion.div
      className="fixed bottom-0 left-0 w-full h-[85vh] bg-gradient-to-b from-[#fff8dc] via-[#ffe88a] to-[#ffd95c]
                 shadow-[0_-10px_30px_rgba(212,175,55,0.3)] rounded-t-3xl overflow-y-auto z-[100]"
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
  {/* 👨 پدر */}
  <div className="flex flex-col items-center">
    <div
      onClick={() => {
       if (!father) return;
       document.getElementById("father-override-photo")?.click();
        }}
      className={`w-20 h-20 rounded-full bg-white/90 border border-yellow-300 shadow-sm
       flex items-center justify-center overflow-hidden
       ${father ? "cursor-pointer hover:scale-105" : "opacity-60 cursor-not-allowed"}
       transition`}
      title={father ? "انتخاب عکس پدر" : "پدر ثبت نشده"}
    >
      {fatherOverridePhoto ? (
        <img
          src={fatherOverridePhoto}
          alt="father override"
          className="w-full h-full object-cover"
        />
      ) : father?.photo ? (
        <img
          src={father.photo}
          alt={father.fullName}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-xl text-gray-700 font-bold">👨</span>
      )}
    </div>

    <p className="mt-2 text-sm font-semibold text-gray-800">
      {father?.fullName || "پدر"}
    </p>
    <p className="text-xs text-gray-500">پدر</p>
  </div>

  {/* 👩 مادر */}
  <div className="flex flex-col items-center">
    <div
      onClick={() => {
       if (!mother) return; 
       document.getElementById("mother-override-photo")?.click();
      }}
      className={`w-20 h-20 rounded-full bg-white/90 border border-yellow-300 shadow-sm
       flex items-center justify-center overflow-hidden
       ${mother ? "cursor-pointer hover:scale-105" : "opacity-60 cursor-not-allowed"}
       transition`}
      title={mother ? "انتخاب عکس مادر" : "مادر ثبت نشده"}
    >
      {motherOverridePhoto ? (
        <img
          src={motherOverridePhoto}
          alt="mother override"
          className="w-full h-full object-cover"
        />
      ) : mother?.photo ? (
        <img
          src={mother.photo}
          alt={mother.fullName}
          className="w-full h-full object-cover"
        />
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


<input
  id="father-override-photo"
  type="file"
  accept="image/*"
  className="hidden"
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFatherOverridePhoto(url);
  }}
/>

<input
  id="mother-override-photo"
  type="file"
  accept="image/*"
  className="hidden"
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setMotherOverridePhoto(url);
  }}
/>



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
  relationLabel={node.label}
  onClick={() => {
    if (node.nodeStatus !== "EMPTY") return;
    setInviteTarget({
      label: node.label,
      relationType: node.relationType,
    });
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
  title="سایر"
  items={friends}
  onAdd={() =>
    setFriends((prev) => [
      ...prev,
      {
        id: null,
        fullName: null,
        relationType: "FR",
        slot: prev.length,
        relationLabel: "سایر",
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
  onConfirm={(res) => {
  if (!inviteTarget) return;

  const t = inviteTarget; // ✅ کپی محلی

  // ✅ 1) UI همون slot رو PENDING کن
  if (t?.slot !== undefined && t?.slot !== null) {
    setPendingByTarget(t);
    }

  // ✅ 2) InviteModal بسته شود
  setInviteTarget(null);

  // ✅ 3) shareInvite پر شود
  const link = res?.token
    ? `https://genino.ir/invite/${encodeURIComponent(res.token)}`
    : "";

  const childName = child?.fullName || "";
  const roleLabel = t?.roleLabel || t?.label || "";

  const message = `🌿 دعوت به ژنینو

شما به عنوان ${roleLabel}${childName ? `ِ ${childName}` : ""}
به ژنینو و صفحه ${childName} دعوت شده‌اید.

با پذیرش این دعوت می‌توانید همراه ${childName} باشید.

لینک پذیرش دعوت:
${link}
`;

  setShareInvite({ link, message, roleLabel, childName });

  // ✅ 4) sync با بک‌اند
  loadPendingInvites();
  loadMembers();
}}

  />

  <ShareInviteModal
  open={!!shareInvite}
  data={shareInvite}
  onClose={() => setShareInvite(null)}
/>


    </motion.div>
  );
}
