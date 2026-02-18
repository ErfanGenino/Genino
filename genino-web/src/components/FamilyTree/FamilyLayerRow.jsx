// src/components/FamilyTree/FamilyLayerRow.jsx
import { motion } from "framer-motion";

function AddButtonInline({ onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="w-8 h-8 rounded-full border-2 border-dashed border-yellow-600
                 text-yellow-700 text-lg font-bold flex items-center justify-center
                 bg-white hover:bg-yellow-50 transition"
      title="افزودن"
      type="button"
    >
      +
    </motion.button>
  );
}

export default function FamilyLayerRow({
  title,
  items,
  onAdd,
  renderItem,
}) {
  return (
    <div className="w-full">
      <div className="bg-white/70 border border-yellow-200 rounded-2xl shadow-sm px-4 py-3">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="text-yellow-900 font-extrabold text-sm sm:text-base">
              {title}
            </div>
            <AddButtonInline onClick={onAdd} />
          </div>

          <div className="text-xs text-gray-500">اسکرول افقی</div>
        </div>

        <div
          className="flex items-center gap-3 overflow-x-auto pb-2"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="shrink-0 w-1" />
          {items.map((item, i) => (
            <div key={`${title}-${item.slot ?? i}`} className="shrink-0">
              {renderItem(item, i)}
            </div>
          ))}
          <div className="shrink-0 w-1" />
        </div>
      </div>
    </div>
  );
}
