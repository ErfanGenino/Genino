import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Brain, Ear, Volume2, Headphones } from "lucide-react";

export default function ReportDetailModal({ report, onClose }) {
  if (!report) return null;

  const { label, date, data } = report;
  const { ear, sound, env, total, level } = data || {};

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          key="modal"
          initial={{ scale: 0.9, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className="relative bg-gradient-to-br from-white to-sky-50 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-sky-100"
        >
          {/* ✖️ دکمه بستن */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-gray-500 hover:text-sky-600 transition"
          >
            <X className="w-6 h-6" />
          </button>

          {/* 🧠 محتوای گزارش */}
          <div className="p-8 text-right">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-extrabold text-sky-700">🎧 گزارش شنوایی ژنینو</h2>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Calendar className="w-4 h-4" />
                {new Date(date).toLocaleDateString("fa-IR")}
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6 text-sm sm:text-base">
              در این پایش، وضعیت شنوایی کودک از نظر <strong>ساختار گوش</strong>، <strong>واکنش به صدا</strong> و <strong>عادات محیطی</strong> بررسی شد.
              بر اساس پاسخ‌ها، وضعیت کلی شنوایی کودک در سطح <strong className="text-sky-700">{level}</strong> ارزیابی شده است.
            </p>

            {/* 📊 جدول امتیازات */}
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white border border-sky-100 rounded-2xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-2 text-sky-700 font-bold">
                  <Ear className="w-5 h-5" /> ساختار گوش
                </div>
                <p className="text-gray-700 text-sm">
                  امتیاز: {ear}/15 <br />
                  {ear >= 12
                    ? "طبیعی ✅"
                    : ear >= 9
                    ? "نسبتاً طبیعی ⚠️"
                    : "نیاز به بررسی 🚨"}
                </p>
              </div>

              <div className="bg-white border border-sky-100 rounded-2xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-2 text-sky-700 font-bold">
                  <Volume2 className="w-5 h-5" /> واکنش به صدا
                </div>
                <p className="text-gray-700 text-sm">
                  امتیاز: {sound}/9 <br />
                  {sound >= 7
                    ? "طبیعی ✅"
                    : sound >= 5
                    ? "نسبتاً طبیعی ⚠️"
                    : "نیاز به بررسی 🚨"}
                </p>
              </div>

              <div className="bg-white border border-sky-100 rounded-2xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-2 text-sky-700 font-bold">
                  <Headphones className="w-5 h-5" /> عادات محیطی
                </div>
                <p className="text-gray-700 text-sm">
                  امتیاز: {env}/6 <br />
                  {env >= 5
                    ? "ایمن ✅"
                    : env >= 4
                    ? "قابل بهبود ⚠️"
                    : "در معرض خطر 🚨"}
                </p>
              </div>
            </div>

            {/* 🧩 تفسیر نهایی */}
            <div className="bg-white border border-sky-100 rounded-2xl shadow-sm p-5 mb-6">
              <h4 className="text-sky-700 font-bold mb-2">🔍 تفسیر نهایی:</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                مجموع امتیاز <strong>{total}/30</strong> است، که نشانگر وضعیت{" "}
                <strong className="text-sky-700">{level}</strong> می‌باشد.
                {level === "طبیعی" && " عملکرد شنوایی در محدوده‌ی سالم است."}
                {level === "نسبتاً مطلوب" && " برخی شاخص‌ها نیاز به توجه بیشتر دارند؛ پایش بعدی طی دو ماه آینده توصیه می‌شود."}
                {level === "نیازمند بررسی" && " مراجعه به پزشک متخصص گوش جهت تست ادیومتری توصیه می‌شود."}
              </p>
            </div>

            {/* 🎯 پیشنهاد ژنینو */}
            <div className="bg-gradient-to-r from-sky-50 to-white border border-sky-100 rounded-2xl shadow-sm p-5 text-sm leading-relaxed">
              <h4 className="text-sky-700 font-bold mb-2">🎯 پیشنهاد ژنینو:</h4>
              <ul className="list-disc pr-5 space-y-1 text-gray-700">
                {ear < 12 && (
                  <li>گوش کودک را از نظر جرم زیاد یا ترشح بررسی کنید؛ در صورت درد یا قرمزی به پزشک مراجعه شود.</li>
                )}
                {sound < 7 && (
                  <li>واکنش به صداهای آرام را تمرین کنید؛ در صورت کاهش پاسخ‌دهی، تست ادیومتری انجام دهید.</li>
                )}
                {env < 5 && (
                  <li>از هدفون یا محیط‌های پر سر و صدا طولانی‌مدت پرهیز شود. قانون ۶۰/۶۰ رعایت گردد.</li>
                )}
                {ear >= 12 && sound >= 7 && env >= 5 && (
                  <li>تبریک! شنوایی کودک کاملاً سالم است 💚</li>
                )}
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
