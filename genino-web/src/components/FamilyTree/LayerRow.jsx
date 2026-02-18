// src/components/FamilyTree/LayerRow.jsx
import { motion } from "framer-motion";
import FamilyCircle from "./FamilyCircle";

export default function LayerRow({
  title,
  items,
  onAdd,
  onCircleClick,
  onCircleDelete,
}) {
  return (
    <div className="w-full">
      {/* هدر ردیف: عنوان + دکمه افزودن (سمت راست) */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAdd}
            className="w-9 h-9 rounded-full border-2 border-dashed border-yellow-600
                       text-yellow-700 font-extrabold flex items-center justify-center
                       bg-white hover:bg-yellow-50 transition"
            type="button"
            title="افزودن"
          >
            +
          </motion.button>

          <span className="text-yellow-900 font-extrabold">{title}</span>
        </div>
      </div>

      {/* باکس افقی اسکرول‌دار */}
      <div
        className="w-full bg-white/70 border border-yellow-300 rounded-2xl
                   px-4 py-4 shadow-sm
                   overflow-x-auto"
      >
        <div className="flex items-center gap-4 min-w-max">
          {items.map((item, idx) => (
            <FamilyCircle
              key={`${item.relationType}-${item.slot ?? idx}-${idx}`}
              nodeStatus={item.nodeStatus}
              emoji={item.emoji}
              fullName={item.fullName}
              relationLabel={item.relationLabel}
              onClick={() => onCircleClick?.(item, idx)}
              onDelete={
                onCircleDelete
                  ? () => onCircleDelete(item, idx)
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
