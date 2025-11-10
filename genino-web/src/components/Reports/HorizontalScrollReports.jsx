
/**
 * 🔹 HorizontalScrollReports
 * --------------------------
 * نوار اسکرول افقی مخصوص نمایش گزارش‌های بینایی، شنوایی و سایر پایش‌ها
 * - از Tailwind scrollbar استفاده می‌کند
 * - رنگ و فاصله‌ها قابل تنظیم‌اند
 */
// 📄 src/components/Reports/HorizontalScrollReports.jsx
import { motion } from "framer-motion";

export default function HorizontalScrollReports({
  children,
  color = "yellow",
  className = "",
}) {
  const thumb =
    color === "amber"
      ? "scrollbar-thumb-amber-300 scrollbar-track-amber-100"
      : color === "sky"
      ? "scrollbar-thumb-sky-300 scrollbar-track-sky-100"
      : "scrollbar-thumb-yellow-300 scrollbar-track-yellow-100";

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative w-full overflow-x-auto overflow-y-hidden scroll-smooth 
                  scrollbar-thin ${thumb} ${className}`}
    >
      {/* لایه داخلی که کارت‌ها در اون کنار هم میان */}
      <div
        className="flex flex-nowrap items-start gap-10 px-4 py-3 w-max"
        style={{
          isolation: "isolate",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}



