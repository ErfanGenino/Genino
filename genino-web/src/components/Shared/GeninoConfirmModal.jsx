import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

export default function GeninoConfirmModal({
  show = false,
  title = "آیا مطمئن هستید؟",
  message = "این عملیات قابل بازگشت نیست.",
  confirmText = "تأیید",
  cancelText = "انصراف",
  onConfirm,
  onCancel,
}) {
  // اگر محیط مرورگر در دسترس نباشد (مثلاً SSR یا تست)، مودال را نرندر نکن
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="bg-gradient-to-br from-yellow-50 to-white rounded-3xl shadow-2xl p-6 text-center border border-yellow-200 max-w-sm w-[90%]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* 🧠 تیتر */}
            <h3 className="text-lg font-bold text-yellow-700 mb-3">{title}</h3>

            {/* 💬 پیام */}
            <p className="text-sm text-gray-600 mb-5 leading-relaxed whitespace-pre-line">
              {message}
            </p>

            {/* 🎛 دکمه‌ها */}
            <div className="flex justify-center gap-4">
              <button
                onClick={onConfirm}
                className="bg-gradient-to-r from-red-500 to-red-400 text-white px-5 py-2 rounded-xl shadow hover:from-red-600 hover:to-red-500 transition-all"
              >
                {confirmText}
              </button>

              <button
                onClick={onCancel}
                className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-white px-5 py-2 rounded-xl shadow hover:from-yellow-500 hover:to-yellow-400 transition-all"
              >
                {cancelText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
