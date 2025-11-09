// 📄 src/components/Reports/MiniReportBox.jsx
import { motion } from "framer-motion";
import { Share2, Trash2, ChevronRight } from "lucide-react";

/**
 * 🧩 MiniReportBox
 * نمایش خلاصه یک گزارش ذخیره‌شده (بدون عکس)
 * props:
 * - report: دادهٔ گزارش شامل id، type، label، date، data
 * - onShare: تابع اشتراک‌گذاری (اختیاری)
 * - onDelete: تابع حذف (اختیاری)
 * - onOpen: تابع باز کردن جزئیات کامل (اختیاری)
 */

export default function MiniReportBox({ report, onShare, onDelete, onOpen }) {
  const { label, date, type, data } = report;
  const formattedDate = new Date(date).toLocaleDateString("fa-IR");

  const getColor = () => {
    switch (data.level) {
      case "طبیعی":
        return "text-green-600 border-green-200 bg-green-50";
      case "نسبتاً مطلوب":
        return "text-yellow-700 border-yellow-200 bg-yellow-50";
      case "نیازمند بررسی":
        return "text-red-600 border-red-200 bg-red-50";
      default:
        return "text-gray-600 border-gray-200 bg-gray-50";
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative flex-shrink-0 w-72 sm:w-80 rounded-3xl p-5 border border-gray-200 shadow-[0_0_15px_rgba(0,0,0,0.05)] bg-white transition-all cursor-pointer"
      onClick={() => onOpen?.(report)}
    >
      {/* 🔹 عنوان و تاریخ */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-base font-extrabold text-sky-700 leading-tight">{label}</h3>
        <p className="text-xs text-gray-500">{formattedDate}</p>
      </div>

      {/* 🔸 خلاصه امتیاز */}
      <div
        className={`text-sm font-semibold px-3 py-2 rounded-xl inline-block mb-3 border ${getColor()}`}
      >
        وضعیت کلی: {data.level}
      </div>

      <div className="text-sm text-gray-700 leading-relaxed">
        <p>
          امتیاز کل: <span className="font-bold">{data.total}</span> از ۳۰
        </p>
        {type === "hearing" && (
          <>
            <p>ساختار گوش: {data.ear}/15</p>
            <p>واکنش به صدا: {data.sound}/9</p>
            <p>عادات محیطی: {data.env}/6</p>
          </>
        )}
      </div>

      {/* ⚙️ دکمه‌ها */}
      <div className="absolute bottom-3 left-3 flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onShare?.(report);
          }}
          className="p-2 bg-white rounded-full shadow hover:bg-yellow-50"
        >
          <Share2 className="w-4 h-4 text-yellow-600" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(report);
          }}
          className="p-2 bg-white rounded-full shadow hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </button>
      </div>

      <ChevronRight className="absolute top-1/2 left-3 w-5 h-5 text-gray-400 transform -translate-y-1/2" />
    </motion.div>
  );
}
