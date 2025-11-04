// 📄 src/pages/ChildHealthCheck/VisionReport.jsx
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import GeninoDNABackground from "../../components/GeninoDNABackground";
import { Eye, Download, Share2, BookOpenCheck } from "lucide-react";

export default function VisionReport() {
  const navigate = useNavigate();
  const location = useLocation();

  // 📊 داده‌های گزارش (در نسخه نهایی از props یا localStorage میاد)
  const report = location.state?.report || {
    name: "حنا سماوتی",
    date: "۱۴ آبان ۱۴۰۴",
    colors: 3,
    shapes: 2,
    arrows: 12,
    score: 90,
    analysis: "بینایی طبیعی است، پیشنهاد می‌شود سالی یک‌بار معاینه تخصصی انجام شود.",
  };

  // 🎯 تعیین رنگ و وضعیت بر اساس امتیاز
  const getTone = () => {
    if (report.score >= 90) return "text-green-600";
    if (report.score >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const handleDownload = () => {
    window.print(); // فعلاً ساده برای چاپ یا PDF
  };

  return (
    <GeninoDNABackground strands={8} opacity={0.2} duration={100}>
      <main
        dir="rtl"
        className="relative z-10 flex flex-col items-center px-6 py-16 text-gray-800"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-white via-yellow-50 to-amber-50 border border-yellow-200 
                     rounded-3xl shadow-[0_0_40px_rgba(255,215,80,0.4)] max-w-3xl mx-auto p-10 text-center"
        >
          {/* 🔶 هدر گزارش */}
          <img
            src="/images/logo-genino.png"
            alt="Genino Logo"
            className="mx-auto w-24 mb-6"
          />
          <h2 className="text-3xl font-extrabold text-yellow-700 mb-2">
            گزارش رسمی پایش بینایی کودک 👁️
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            تاریخ انجام تست: {report.date}
          </p>

          {/* 🧾 مشخصات کلی */}
          <div className="bg-white rounded-2xl border border-yellow-100 p-6 text-right leading-relaxed shadow-inner mb-6">
            <p className="mb-2">
              <strong>نام کودک:</strong> {report.name}
            </p>
            <p className="mb-2">
              <strong>مرحله ۱ - تشخیص رنگ‌ها:</strong> {report.colors} از ۳ درست
            </p>
            <p className="mb-2">
              <strong>مرحله ۲ - اشکال هندسی:</strong> {report.shapes} از ۳ درست
            </p>
            <p className="mb-2">
              <strong>مرحله ۳ - تشخیص جهت‌ها:</strong> {report.arrows} از ۱۵ درست
            </p>
          </div>

          {/* 🌟 امتیاز نهایی */}
          <div className="text-xl font-bold text-yellow-800 mt-2 mb-4">
            🌟 امتیاز بینایی کودک: {report.score} / 100
          </div>

          {/* 💬 تحلیل سیستم ژنینو */}
          <div
            className={`text-base font-semibold mb-6 ${getTone()} px-6 py-4 rounded-2xl bg-yellow-50 border border-yellow-100`}
          >
            تحلیل سیستم ژنینو: {report.analysis}
          </div>

          {/* 🔏 مهر دیجیتال */}
          <div className="mt-8 text-xs text-gray-500 italic">
            🔏 تولیدشده توسط سامانه هوشمند پایش سلامت کودک ژنینو  
          </div>

          {/* 🧿 QR Code */}
          <img
            src="/images/qr-sample.png"
            alt="QR Code"
            className="w-24 mx-auto mt-4"
          />

          {/* 🟡 دکمه‌ها */}
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-full font-semibold shadow-md"
            >
              <Download className="w-5 h-5" />
              دانلود PDF / چاپ
            </button>

            <button
              onClick={() => alert("گزارش به آلبوم سلامت اضافه شد ✅")}
              className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-white rounded-full font-semibold shadow-md"
            >
              <BookOpenCheck className="w-5 h-5" />
              افزودن به آلبوم سلامت
            </button>

            <button
              onClick={() => alert("لینک اشتراک‌گذاری آماده شد 📤")}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold shadow-md"
            >
              <Share2 className="w-5 h-5" />
              اشتراک‌گذاری
            </button>
          </div>

          {/* 🔙 بازگشت */}
          <motion.button
            onClick={() => navigate("/child-health-check")}
            whileHover={{ scale: 1.05 }}
            className="mt-10 px-8 py-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 text-white 
                       font-bold rounded-full shadow-[0_0_25px_rgba(255,220,80,0.7)]"
          >
            بازگشت به صفحه پایش سلامت کودک
          </motion.button>
        </motion.div>
      </main>
    </GeninoDNABackground>
  );
}
