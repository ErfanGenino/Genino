import { motion } from "framer-motion";
import { useState } from "react";

export default function FamilyTree({ show, onClose }) {
  const [sisters, setSisters] = useState([]);
  const [brothers, setBrothers] = useState([]);
  const [aunts, setAunts] = useState([]);
  const [uncles, setUncles] = useState([]);
  const [khaleha, setKhaleha] = useState([]);
  const [dayiha, setDayiha] = useState([]);
  const [others, setOthers] = useState([]);

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
      <div className="flex flex-col items-center py-10 px-6 space-y-10">
        {/* 👶 کودک */}
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full bg-white/80 border border-yellow-400 shadow-md flex items-center justify-center text-3xl font-bold text-yellow-700">
            H
          </div>
          <p className="mt-2 text-sm text-gray-700 font-medium">کودک</p>
        </div>

        {/* 👨‍👩 والدین */}
        <div className="flex justify-center gap-20 items-center">
          {["پدر", "مادر"].map((role, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-white/80 border border-yellow-300 shadow-sm flex items-center justify-center text-xl text-gray-700 font-medium">
                {role === "پدر" ? "F" : "M"}
              </div>
              <p className="mt-1 text-sm text-gray-600">{role}</p>
            </div>
          ))}
        </div>

        {/* 👴 پدربزرگ‌ها و مادربزرگ‌ها */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-8">
          {["پدربزرگ پدری", "مادربزرگ پدری", "پدربزرگ مادری", "مادربزرگ مادری"].map((title, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full bg-white/70 border border-yellow-200 shadow-sm flex items-center justify-center text-lg text-gray-700 font-semibold">
                {i % 2 === 0 ? "PG" : "GM"}
              </div>
              <p className="text-xs mt-2 text-yellow-800">{title}</p>
            </motion.div>
          ))}
        </div>

        {/* 👧👦 خواهرها و برادرها (بدون تیتر بالایی) */}
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

        {/* 👩‍👩‍👦 عمه‌ها، عموها، خاله‌ها و دایی‌ها (بدون تیتر بالایی) */}
        <FamilyRow
          title="عمه‌ها، عموها، خاله‌ها و دایی‌ها"
          leftItems={aunts}
          setLeftItems={setAunts}
          rightItems={uncles}
          setRightItems={setUncles}
          leftPrefix="A"
          rightPrefix="U"
          extraLeft={khaleha}
          setExtraLeft={setKhaleha}
          extraRight={dayiha}
          setExtraRight={setDayiha}
          doubleRow
          showTopTitle={false}
        />

        {/* 👭 سایر اقوام و دوستان */}
        <div className="mt-12 w-full flex flex-col items-center">
          <h3 className="text-yellow-800 font-semibold text-base sm:text-lg mb-4">
            سایر اقوام و دوستان
          </h3>

          <div className="w-full overflow-x-auto px-4">
            <div className="flex items-center gap-4 pb-4">
              {others.map((_, i) => (
                <DeletableCircle
                  key={`other-${i}`}
                  label={`O${i + 1}`}
                  onDelete={() =>
                    setOthers(others.filter((_, index) => index !== i))
                  }
                />
              ))}
            </div>
          </div>

          <AddButton onClick={() => setOthers([...others, {}])} />
        </div>
      </div>
    </motion.div>
  );
}

/* 🔸 جزء قابل حذف (دایره با سطل) */
function DeletableCircle({ label, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative group w-20 h-20 rounded-full bg-white/80 border border-yellow-300 flex items-center justify-center text-gray-700 shadow-sm"
    >
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
            {leftItems.map((_, i) => (
              <DeletableCircle
                key={`${leftPrefix}-${i}`}
                label={`${leftPrefix}${i + 1}`}
                onDelete={() =>
                  setLeftItems(leftItems.filter((_, idx) => idx !== i))
                }
              />
            ))}
            <AddButton onClick={() => setLeftItems([...leftItems, {}])} />
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
            {rightItems.map((_, i) => (
              <DeletableCircle
                key={`${rightPrefix}-${i}`}
                label={`${rightPrefix}${i + 1}`}
                onDelete={() =>
                  setRightItems(rightItems.filter((_, idx) => idx !== i))
                }
              />
            ))}
            <AddButton onClick={() => setRightItems([...rightItems, {}])} />
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

