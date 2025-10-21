// src/components/GoldenModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function GoldenModal({
  show,
  title = "",
  description = "",
  children,
  confirmLabel = "تأیید",
  onConfirm, // برای بستن مودال
}) {
  // جلوگیری از اسکرول پس‌زمینه
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
        // لایه‌ی پس‌زمینه تمام‌صفحه + تار
        <motion.div
          key="golden-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onConfirm} // کلیک روی پس‌زمینه، مودال بسته می‌شود
          className="
            fixed inset-0 z-[99999]
            flex items-center justify-center
            bg-black/60 backdrop-blur-sm
          "
          style={{
            // جلوگیری از تاثیر stacking context والدهای ترنسفورم‌شده
            isolation: "isolate",
          }}
        >
          {/* جعبه مودال */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.88, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            onClick={(e) => e.stopPropagation()} // کلیک روی خود مودال بسته نشه
            role="dialog"
            aria-modal="true"
            className="
              relative w-[92%] max-w-lg
              rounded-2xl border border-yellow-200
              bg-gradient-to-b from-[#fffefc] to-[#fff8e0]
              shadow-[0_0_25px_rgba(212,175,55,0.25)]
              p-6 text-right text-gray-800
            "
          >
            {/* رد درخشان ظریف عبوری */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              initial={{ x: "-150%" }}
              animate={{ x: ["-150%", "150%"] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
              }}
            />

            {/* دکمه بستن */}
            <button
              onClick={onConfirm}
              aria-label="بستن"
              className="
                absolute top-3 left-3
                w-8 h-8 rounded-full
                bg-yellow-100 text-yellow-700
                hover:bg-yellow-200
                flex items-center justify-center
                shadow-sm transition
              "
            >
              <X className="w-5 h-5" />
            </button>

            {/* عنوان و توضیح */}
            {!!title && (
              <h2 className="relative z-10 text-2xl font-bold text-yellow-700 mb-2">
                {title}
              </h2>
            )}
            {!!description && (
              <p className="relative z-10 text-gray-600 text-sm mb-4 leading-relaxed">
                {description}
              </p>
            )}

            {/* محتوای مودال */}
            <div
              className="
                relative z-10 max-h-[65vh] overflow-y-auto pr-2
              "
            >
              {children}
            </div>

            {/* دکمه تأیید/بستن */}
            <div className="relative z-10 mt-6 text-left">
              <button
                onClick={onConfirm}
                className="
                  bg-yellow-500 hover:bg-yellow-600
                  text-white font-medium
                  px-6 py-2 rounded-xl shadow-md transition
                "
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
