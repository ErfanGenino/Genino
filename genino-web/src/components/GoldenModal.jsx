// src/components/GoldenModal.jsx
import { motion, AnimatePresence } from "framer-motion";

export default function GoldenModal({
  show = false,
  title = "",
  description = "",
  confirmLabel = "تأیید",
  cancelLabel = "انصراف",
  onConfirm,
  onCancel,
  children, // برای محتوای سفارشی
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 0 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="relative bg-gradient-to-b from-[#fffef9] to-[#fff8d8] rounded-3xl 
                       border border-yellow-200 shadow-[0_0_30px_rgba(212,175,55,0.4)] 
                       p-8 w-[90%] max-w-sm text-center overflow-hidden"
          >
            {/* ✨ نور درخشان عبوری */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ["-150%", "150%"] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
            />

            {/* 💬 محتوای اصلی */}
            <div className="relative z-10">
              {title && (
                <h3 className="text-lg font-bold text-yellow-700 mb-2 drop-shadow-[0_0_8px_rgba(255,220,120,0.5)]">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                  {description}
                </p>
              )}

              {/* محتوای دلخواه (مثلاً فرم یا متن بیشتر) */}
              {children && <div className="mb-4">{children}</div>}

              {/* دکمه‌ها */}
              <div className="flex justify-center gap-4 mt-2">
                {onConfirm && (
                  <button
                    onClick={onConfirm}
                    className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white 
                               px-6 py-2 rounded-xl font-medium shadow-md 
                               hover:from-yellow-600 hover:to-yellow-500 transition-all"
                  >
                    {confirmLabel}
                  </button>
                )}
                {onCancel && (
                  <button
                    onClick={onCancel}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-xl 
                               hover:bg-gray-300 transition"
                  >
                    {cancelLabel}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
