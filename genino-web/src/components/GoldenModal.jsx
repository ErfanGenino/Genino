// 📄 src/components/GoldenModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function GoldenModal({
  show = false,
  title = "",
  description = "",
  children,
  confirmLabel = "تأیید",
  cancelLabel = "انصراف",
  onConfirm,
  onCancel,
  confirmColor = "yellow", // "yellow" | "red"
}) {
  // 🛑 جلوگیری از اسکرول پس‌زمینه
  useEffect(() => {
    if (show) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev || "auto";
      };
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onCancel}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-gradient-to-br from-yellow-50 to-white rounded-3xl shadow-2xl 
                       border border-yellow-200 p-6 text-center max-w-lg w-[92%]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* ✖️ دکمه بستن */}
            <button
              onClick={onCancel}
              aria-label="بستن"
              className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center 
                         bg-yellow-100 text-yellow-700 rounded-full shadow-sm hover:bg-yellow-200 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* 🧠 تیتر مودال */}
            {!!title && (
              <h2 className="text-xl sm:text-2xl font-bold text-yellow-700 mb-3">{title}</h2>
            )}

            {/* 💬 توضیحات کوتاه */}
            {!!description && (
              <p className="text-sm text-gray-600 mb-5 leading-relaxed whitespace-pre-line">
                {description}
              </p>
            )}

            {/* 📋 محتوای مودال (قابل اسکرول) */}
            {children && (
              <div className="text-sm text-gray-700 leading-relaxed max-h-[60vh] overflow-y-auto pr-1 mb-6">
                {children}
              </div>
            )}

            {/* 🎛 دکمه‌ها */}
            <div className="flex justify-center gap-4">
              {cancelLabel && (
                <button
                  onClick={onCancel}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-white px-5 py-2 
                             rounded-xl shadow hover:from-yellow-500 hover:to-yellow-400 transition-all"
                >
                  {cancelLabel}
                </button>
              )}

              <button
                onClick={onConfirm}
                className={`px-5 py-2 rounded-xl shadow font-medium text-white transition-all ${
                  confirmColor === "red"
                    ? "bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500"
                    : "bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500"
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
