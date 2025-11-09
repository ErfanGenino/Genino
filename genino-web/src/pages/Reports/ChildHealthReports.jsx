// 📄 src/pages/Reports/ChildHealthReports.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MiniReportBox from "@components/Reports/MiniReportBox";
import ReportDetailModal from "@components/Reports/ReportDetailModal"; // ✅ اضافه شد
import { FileHeart } from "lucide-react";
import GeninoDNABackground from "@components/Core/GeninoDNABackground";

export default function ChildHealthReports() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null); // ✅ مودال جزئیات

  // 📦 خواندن داده از localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("childReports") || "[]");
      setReports(saved);
    } catch (e) {
      console.error("❌ خطا در خواندن گزارش‌ها:", e);
    }
  }, []);

  // 🗑️ حذف گزارش
  const handleDelete = (r) => {
    const updated = reports.filter((x) => x.id !== r.id);
    setReports(updated);
    localStorage.setItem("childReports", JSON.stringify(updated));
  };

  // 🔗 اشتراک‌گذاری
  const handleShare = (r) => {
    const text = `📋 گزارش ${r.label}\n\nوضعیت: ${r.data.level}\nامتیاز کل: ${r.data.total}/30`;
    navigator.share
      ? navigator.share({ text })
      : alert(text);
  };

  return (
    <GeninoDNABackground strands={8} opacity={0.2} duration={90}>
      <main
        dir="rtl"
        className="relative z-10 min-h-screen flex flex-col items-center px-6 py-16 text-gray-800"
      >
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-extrabold text-yellow-700 mb-10 drop-shadow-[0_0_10px_rgba(255,215,0,0.4)]"
        >
          📁 بایگانی گزارش‌های سلامت کودک
        </motion.h1>

        <AnimatePresence>
          {reports.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-500 text-sm italic"
            >
              هنوز گزارشی ثبت نشده است.
            </motion.p>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-wrap gap-5 justify-center w-full max-w-6xl"
            >
              {reports.map((r) => (
                <MiniReportBox
                  key={r.id}
                  report={r}
                  onShare={handleShare}
                  onDelete={handleDelete}
                  onOpen={() => setSelectedReport(r)} // ✅ باز کردن مودال
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ✅ مودال جزئیات گزارش */}
        <ReportDetailModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />

        {/* 💡 نکته انتهایی */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center text-gray-500 text-sm flex flex-col items-center gap-2"
        >
          <FileHeart className="w-6 h-6 text-yellow-500" />
          <p>
            گزارش‌های شما به‌صورت آفلاین ذخیره می‌شوند و فقط برای شما قابل
            مشاهده‌اند.
          </p>
        </motion.div>
      </main>
    </GeninoDNABackground>
  );
}
