// 📄 src/components/Reports/MiniReportBox.jsx
import { motion } from "framer-motion";
import { Share2, Trash2, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import GeninoConfirmModal from "@components/Shared/GeninoConfirmModal";

export default function MiniReportBox({ report, onShare, onDelete, onOpen }) {
  const { label, date, type, data = {} } = report || {};
  const formattedDate = date ? new Date(date).toLocaleDateString("fa-IR") : "";

  const [showConfirm, setShowConfirm] = useState(false);

  // 🎨 رنگ وضعیت
  const getColor = () => {
    switch (data.level) {
      case "طبیعی":
        return "text-green-600 border-green-200 bg-green-50";
      case "نسبتاً مطلوب":
      case "قابل قبول":
        return "text-yellow-700 border-yellow-200 bg-yellow-50";
      case "نیازمند بررسی":
      case "نیاز به بررسی":
        return "text-red-600 border-red-200 bg-red-50";
      default:
        return "text-gray-600 border-gray-200 bg-gray-50";
    }
  };

  // 🧠 تشخیص نوع و حداکثر امتیاز کل
  const { totalValue, totalMax } = useMemo(() => {
    if (type === "hearing") {
      return { totalValue: data.total ?? 0, totalMax: 30 };
    }
    if (type === "vision") {
      return { totalValue: data.score ?? 0, totalMax: 100 };
    }
    // سایر انواع (فیوچر-پروف)
    return { totalValue: data.total ?? data.score ?? 0, totalMax: 100 };
  }, [type, data]);

  // 👁️ استخراج امن جزئیات بینایی (پشتیبانی از نسخه‌های قدیمی)
  const visionDetails = useMemo(() => {
    if (type !== "vision") return null;

    // نسخه جدید
    const colors = typeof data.colors === "number" ? data.colors : undefined; // 0..3
    const shapes = typeof data.shapes === "number" ? data.shapes : undefined; // 0..3
    const dirScore =
      typeof data?.direction?.score5 === "number"
        ? data.direction.score5
        : // fallback: اگر stagesPassed بود تبدیل به امتیاز 0..5
          typeof data?.direction?.stagesPassed === "number"
          ? Math.max(0, Math.min(5, data.direction.stagesPassed))
          : undefined;

    return { colors, shapes, dirScore };
  }, [type, data]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative isolate z-[5] flex-shrink-0 w-72 sm:w-80 rounded-3xl p-5 pb-12 min-h-[14rem]
                 border border-gray-200 shadow-[0_0_15px_rgba(0,0,0,0.05)] bg-white transition-all cursor-pointer"
      style={{ isolation: "isolate", zIndex: 5 }}
      onClick={() => onOpen?.(report)}
    >
      {/* 🔹 عنوان و تاریخ */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-base font-extrabold text-sky-700 leading-tight line-clamp-2">
          {label}
        </h3>
        <p className="text-xs text-gray-500 whitespace-nowrap">{formattedDate}</p>
      </div>

      {/* 🔸 وضعیت کلی */}
      <div className={`text-sm font-semibold px-3 py-2 rounded-xl inline-block mb-3 border ${getColor()}`}>
        وضعیت کلی: {data.level ?? "—"}
      </div>

      {/* 📊 جزئیات */}
      <div className="text-sm text-gray-700 leading-relaxed space-y-1">
        {/* امتیاز کل (با حداکثر درست) */}
        <p>
          امتیاز کل: <span className="font-bold">{totalValue}</span> از {totalMax}
        </p>

        {/* 🎧 شنیداری */}
        {type === "hearing" && (
          <>
            <p>ساختار گوش: {Number.isFinite(data.ear) ? data.ear : "—"}/15</p>
            <p>واکنش به صدا: {Number.isFinite(data.sound) ? data.sound : "—"}/9</p>
            <p>عادات محیطی: {Number.isFinite(data.env) ? data.env : "—"}/6</p>
          </>
        )}

        {/* 👁️ بینایی */}
        {type === "vision" && (
          <>
            <p>تشخیص رنگ‌ها: {Number.isFinite(visionDetails?.colors) ? visionDetails.colors : "—"}/3</p>
            <p>تشخیص اشکال: {Number.isFinite(visionDetails?.shapes) ? visionDetails.shapes : "—"}/3</p>
            <p>تشخیص جهت‌ها: {Number.isFinite(visionDetails?.dirScore) ? visionDetails.dirScore : "—"}/5</p>
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
            setShowConfirm(true);
          }}
          className="p-2 bg-white rounded-full shadow hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </button>
      </div>

      {/* 🧾 فلش راهنما */}
      <ChevronRight className="absolute top-1/2 left-3 w-5 h-5 text-gray-400 transform -translate-y-1/2" />

      {/* ✨ مودال تأیید حذف ژنینویی */}
      <GeninoConfirmModal
        show={showConfirm}
        title="⚠️ تأیید حذف گزارش"
        message={"آیا مطمئن هستید که می‌خواهید این گزارش را حذف کنید؟\nاین عملیات قابل بازگشت نیست."}
        confirmText="بله، حذف شود"
        cancelText="انصراف"
        onConfirm={(e) => {
          e?.stopPropagation?.();
          onDelete?.(report);
          setShowConfirm(false);
        }}
        onCancel={(e) => {
          e?.stopPropagation?.();
          setShowConfirm(false);
        }}
      />
    </motion.div>
  );
}
