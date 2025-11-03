import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function GoldenModal({
  show = false,
  title = "",
  description = "",
  children,
  confirmLabel = "تأیید",
  cancelLabel, // ❌ بدون مقدار پیش‌فرض
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
          {/* ✨ باکس مودال ژنینویی */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-gradient-to-b from-yellow-50 via-white to-yellow-50 rounded-3xl shadow-2xl border border-yellow-200 p-6 text-center max-w-lg w-[92%] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 20 }}
          >
            {/* ✨ نور درخشان ژنینویی در پس‌زمینه */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              initial={{ x: '-150%' }}
              animate={{ x: ['-150%', '150%'] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
              }}
            />

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
              <h2 className="text-xl sm:text-2xl font-extrabold text-yellow-700 mb-3 drop-shadow-[0_0_10px_rgba(250,204,21,0.3)]">
                {title}
              </h2>
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

            {/* 🎛 دکمه‌های پایین مودال */}
            <div
              className={`relative z-10 mt-4 flex ${
                cancelLabel?.trim() ? 'justify-end gap-3' : 'justify-center'
              }`}
            >
              {cancelLabel?.trim() && (
                <button
                  onClick={onCancel}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-xl text-sm transition"
                >
                  {cancelLabel}
                </button>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onConfirm}
                className={`px-6 py-2 rounded-xl text-sm font-medium shadow-md transition 
                  ${
                    confirmColor === 'red'
                      ? 'bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white'
                      : 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 hover:from-yellow-500 hover:to-yellow-500 text-white'
                  }`}
              >
                {confirmLabel}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
