import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import InviteModal from "../components/FamilyTree/InviteModal";



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

  const [others, setOthers] = useState([]);   // سایر اقوام و دوستان
  const [inviteTarget, setInviteTarget] = useState(null);



useEffect(() => {
  return () => {
    if (fatherOverridePhoto) URL.revokeObjectURL(fatherOverridePhoto);
    if (motherOverridePhoto) URL.revokeObjectURL(motherOverridePhoto);
  };
}, [fatherOverridePhoto, motherOverridePhoto]);




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
        <div className="relative group">
  <div
    onClick={() => {
      if (node.nodeStatus !== "EMPTY") return;
      setInviteTarget({
        label: node.label,
        relationType: node.relationType,
      });
    }}
    className={`w-20 h-20 rounded-full flex items-center justify-center
      text-sm font-semibold transition
      ${
        node.nodeStatus === "CONNECTED"
          ? "bg-green-100 border border-green-400 text-green-800 cursor-default"
          : node.nodeStatus === "PENDING"
          ? "bg-yellow-100 border border-yellow-400 text-yellow-800 cursor-not-allowed opacity-80"
          : "bg-white border border-gray-300 text-gray-700 cursor-pointer hover:scale-105 hover:shadow-md"
      }
    `}
  >
    {node.relationType.includes("grandfather") ? "👴" : "👵"}
  </div>

  {/* 🟡 Tooltip فقط برای حالت PENDING */}
  {node.nodeStatus === "PENDING" && (
    <div
      className="absolute -top-9 left-1/2 -translate-x-1/2
                 bg-gray-800 text-white text-xs rounded-md px-2 py-1
                 opacity-0 group-hover:opacity-100 transition
                 pointer-events-none whitespace-nowrap"
    >
      دعوت ارسال شده – در انتظار پذیرش
    </div>
  )}
</div>

        <p className="text-xs mt-2 text-yellow-800 text-center">
          {node.label}
        </p>
      </div>
    ))}
</div>


        <FamilyRow
  title="خواهرها و برادرها"
  leftItems={sisters}
  setLeftItems={setSisters}
  rightItems={brothers}
  setRightItems={setBrothers}
  leftPrefix="S"
  rightPrefix="B"
  showTopTitle={false}
/>
<FamilyRow
  title="عمه‌ها و عموها"
  leftItems={aunts}
  setLeftItems={setAunts}
  rightItems={uncles}
  setRightItems={setUncles}
  leftPrefix="AM"
  rightPrefix="AO"
  showTopTitle={false}
/>
<FamilyRow
  title="خاله‌ها و دایی‌ها"
  leftItems={khaleha}
  setLeftItems={setKhaleha}
  rightItems={dayiha}
  setRightItems={setDayiha}
  leftPrefix="KH"
  rightPrefix="DY"
  showTopTitle={false}
/>

{/* 👭 سایر اقوام و دوستان */}
<div className="mt-6 w-full flex flex-col items-center">
  <h3 className="text-yellow-800 font-semibold text-base sm:text-lg mb-3">
    سایر اقوام و دوستان
  </h3>

  <div className="w-full overflow-x-auto px-4">
    <div className="flex items-center gap-4 pb-4">
      {others.map((_, i) => (
        <DeletableCircle
          key={`other-${i}`}
          label={`O${i + 1}`}
          onDelete={() => setOthers(others.filter((_, index) => index !== i))}
        />
      ))}
    </div>
  </div>

  <AddButton onClick={() => setOthers([...others, {}])} />
</div>
      </div>

      {/* ⬇️⬇️⬇️ مودال Invite دقیقاً اینجا ⬇️⬇️⬇️ */}
      <InviteModal
  open={!!inviteTarget}
  title={`دعوت ${inviteTarget?.label || ""}`}
  description={`می‌خواهید ${inviteTarget?.label} را به درختواره کودک اضافه کنید؟`}
  onClose={() => setInviteTarget(null)}
  onConfirm={() => {
  if (inviteTarget?.side === "left") {
    setLeftItems((prev) =>
      prev.map((item, i) =>
        i === inviteTarget.index
          ? { ...item, nodeStatus: "PENDING" }
          : item
      )
    );
  }

  if (inviteTarget?.side === "right") {
    setRightItems((prev) =>
      prev.map((item, i) =>
        i === inviteTarget.index
          ? { ...item, nodeStatus: "PENDING" }
          : item
      )
    );
  }

  setInviteTarget(null);
}}

/>

    </motion.div>
  );
}

/* 🔸 جزء قابل حذف (دایره با سطل) */
function DeletableCircle({ label, onDelete, nodeStatus, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`relative group w-20 h-20 rounded-full flex items-center justify-center
  text-sm font-semibold shadow-sm transition
  ${
    nodeStatus === "DRAFT"
      ? "bg-blue-50 border border-blue-400 text-blue-700 cursor-pointer"
      : nodeStatus === "PENDING"
      ? "bg-yellow-100 border border-yellow-400 text-yellow-800 cursor-not-allowed"
      : "bg-white/80 border border-yellow-300 text-gray-700"
  }
`}
onClick={onClick}
    >
      {nodeStatus === "DRAFT" && (
  <div
    className="absolute -top-9 left-1/2 -translate-x-1/2
               bg-blue-700 text-white text-xs rounded-md px-2 py-1
               opacity-0 group-hover:opacity-100 transition
               pointer-events-none whitespace-nowrap"
  >
    برای ارسال دعوت کلیک کنید
  </div>
)}

      <span className="text-sm font-semibold">{label}</span>
      <button
        onClick={onDelete}
        className="absolute bottom-1 right-1 bg-white/90 border border-gray-300 rounded-full p-[3px] opacity-0 group-hover:opacity-100 transition"
        title="حذف"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-3.5 h-3.5 text-red-500"
        >
          <path
            fillRule="evenodd"
            d="M6 8a1 1 0 011-1h6a1 1 0 011 1v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8zm3-5a1 1 0 00-1 1v1H4.5a.5.5 0 000 1h11a.5.5 0 000-1H12V4a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </motion.div>
  );
}

/* 🔹 دکمه افزودن */
function AddButton({ onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="mt-3 w-8 h-8 rounded-full border-2 border-dashed border-yellow-500 text-yellow-600 text-lg font-bold flex items-center justify-center bg-white hover:bg-yellow-50 transition"
    >
      +
    </motion.button>
  );
}

/* 🔸 ردیف خانواده (عمومی برای دو طرف) */
function FamilyRow({
  title,
  leftItems,
  setLeftItems,
  rightItems,
  setRightItems,
  leftPrefix,
  rightPrefix,
  extraLeft,
  setExtraLeft,
  extraRight,
  setExtraRight,
  doubleRow = false,
  showTopTitle = true,
}) {
  return (
    <div className="mt-8 flex flex-col items-center w-full gap-6">
      {showTopTitle && (
        <h3 className="text-yellow-800 font-semibold text-base sm:text-lg mb-4">{title}</h3>
      )}

      <div className={`flex ${doubleRow ? "flex-col sm:flex-row" : "flex-row"} items-center justify-center gap-8`}>
        {/* 🔸 سمت چپ */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            {leftItems.map((item, i) => (
  <DeletableCircle
    key={`${leftPrefix}-${i}`}
    label={`${leftPrefix}${i + 1}`}
    nodeStatus={item.nodeStatus}
    onClick={() => {
      if (item.nodeStatus === "DRAFT") {
        setInviteTarget({
          label: title,
          relationType: leftPrefix,
          index: i,
          side: "left",
        });
      }
    }}
    onDelete={() =>
      setLeftItems(leftItems.filter((_, idx) => idx !== i))
    }
  />
))}
            <AddButton
  onClick={() =>
    setLeftItems([
      ...leftItems,
      {
        id: null,
        label: "در انتظار دعوت",
        relationType: leftPrefix,
        nodeStatus: "DRAFT",
      },
    ])
  }
/>
          </div>

          {extraLeft && (
            <div className="flex items-center gap-3">
              {extraLeft.map((_, i) => (
                <DeletableCircle
                  key={`exLeft-${i}`}
                  label={`KH${i + 1}`}
                  onDelete={() =>
                    setExtraLeft(extraLeft.filter((_, idx) => idx !== i))
                  }
                />
              ))}
              <AddButton onClick={() => setExtraLeft([...extraLeft, {}])} />
            </div>
          )}
        </div>

        {/* 🔸 تیتر وسط */}
        <div className="flex flex-col items-center justify-center">
          <span className="text-yellow-700 font-semibold text-sm sm:text-base text-center">
            {title}
          </span>
        </div>

        {/* 🔸 سمت راست */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            {rightItems.map((item, i) => (
  <DeletableCircle
    key={`${rightPrefix}-${i}`}
    label={`${rightPrefix}${i + 1}`}
    nodeStatus={item.nodeStatus}
    onClick={() => {
      if (item.nodeStatus === "DRAFT") {
        setInviteTarget({
          label: title,
          relationType: rightPrefix,
          index: i,
          side: "right",
        });
      }
    }}
    onDelete={() =>
      setRightItems(rightItems.filter((_, idx) => idx !== i))
    }
  />
))}
            <AddButton
  onClick={() =>
    setRightItems([
      ...rightItems,
      {
        id: null,
        label: "در انتظار دعوت",
        relationType: rightPrefix,
        nodeStatus: "DRAFT",
      },
    ])
  }
/>

          </div>

          {extraRight && (
            <div className="flex items-center gap-3">
              {extraRight.map((_, i) => (
                <DeletableCircle
                  key={`exRight-${i}`}
                  label={`D${i + 1}`}
                  onDelete={() =>
                    setExtraRight(extraRight.filter((_, idx) => idx !== i))
                  }
                />
              ))}
              <AddButton onClick={() => setExtraRight([...extraRight, {}])} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FamilyNode({ node, onClick }) {
  const isClickable = node.nodeStatus === "EMPTY";
  const isPending = node.nodeStatus === "PENDING";

  return (
    <div className="relative group">
      <div
        onClick={() => {
          if (isClickable && onClick) {
            onClick(node);
          }
        }}
        className={`w-20 h-20 rounded-full flex items-center justify-center
          text-sm font-semibold transition
          ${
            node.nodeStatus === "CONNECTED"
              ? "bg-green-100 border border-green-400 text-green-800 cursor-default"
              : node.nodeStatus === "PENDING"
              ? "bg-yellow-100 border border-yellow-400 text-yellow-800 cursor-not-allowed opacity-80"
              : "bg-white border border-gray-300 text-gray-700 cursor-pointer hover:scale-105 hover:shadow-md"
          }
        `}
      >
        {node.label}
      </div>

      {/* 🟡 Tooltip فقط برای PENDING */}
      {isPending && (
        <div
          className="absolute -top-9 left-1/2 -translate-x-1/2
                     bg-gray-800 text-white text-xs rounded-md px-2 py-1
                     opacity-0 group-hover:opacity-100 transition
                     pointer-events-none whitespace-nowrap"
        >
          دعوت ارسال شده – در انتظار پذیرش
        </div>
      )}
    </div>
  );
}





