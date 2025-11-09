// 📄 src/components/GeninoButton.jsx
import { motion } from "framer-motion";

export default function GeninoButton({
  children,
  onClick,
  className = "",
  noDefaultStyle = false, // ✨ ورودی جدید برای غیرفعال کردن رنگ پیش‌فرض
}) {
  // 🎨 رنگ طلایی پیش‌فرض ژنینو
  const defaultStyle =
    "bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 shadow-[0_0_20px_rgba(245,158,11,0.35)]";

  // 🧠 اگر noDefaultStyle فعال باشه، استایل پیش‌فرض حذف می‌شه
  const buttonStyle = noDefaultStyle
    ? className
    : `${defaultStyle} text-white font-bold py-3 px-6 rounded-full transition-all duration-200 hover:shadow-lg`;

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
      className={`rounded-full ${buttonStyle} ${className}`}
    >
      {children}
    </motion.button>
  );
}
