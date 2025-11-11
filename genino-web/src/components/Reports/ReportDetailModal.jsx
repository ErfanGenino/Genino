// 📄 src/components/Reports/ReportDetailModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText } from "lucide-react";

export default function ReportDetailModal({ report, onClose }) {
  if (!report) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white rounded-3xl shadow-xl p-6 max-w-lg w-full overflow-y-auto max-h-[85vh]"
        >
          {/* 🔸 دکمه بستن */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-gray-500 hover:text-gray-800"
          >
            <X className="w-6 h-6" />
          </button>

          {/* 🔹 عنوان */}
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-7 h-7 text-yellow-600" />
            <h2 className="text-xl font-extrabold text-yellow-700">
              {report.label}
            </h2>
          </div>

          {/* 🧾 جزئیات عمومی */}
          <div className="text-sm text-gray-700 space-y-2 mb-4">
            <p>
              <strong>📅 تاریخ:</strong> {report.date}
            </p>
            <p>
              <strong>👶 کودک:</strong> {report.name}
            </p>
          </div>

          {/* ✨ نمایش جزئیات مخصوص هر نوع گزارش */}
          <div className="border-t border-yellow-100 pt-4 text-gray-700 leading-relaxed space-y-2 text-sm">
            {/* 🎧 شنوایی */}
            {report.type === "hearing" && (
              <>
                <p>امتیاز کل: {report.data.total}/30</p>
                <p>ساختار گوش: {report.data.ear}/15</p>
                <p>واکنش به صدا: {report.data.sound}/9</p>
                <p>عادات محیطی: {report.data.env}/6</p>
              </>
            )}

            {/* 👁️ بینایی */}
            {report.type === "vision" && (
              <>
                <p>امتیاز نهایی: {report.data.score}/100</p>
                <p>تشخیص رنگ‌ها: {report.data.colors}/3</p>
                <p>تشخیص اشکال: {report.data.shapes}/3</p>
                <p>تشخیص جهت‌ها: {report.data.directions}/5</p>
              </>
            )}

            {/* ⚖️ رشد بدنی و BMI */}
            {report.type === "bodymetrics" && (
              <>
                <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
                  <p>
                    شاخص توده بدنی (BMI):{" "}
                    <strong className="text-yellow-700">
                      {report.data.bmi ?? "—"}
                    </strong>
                  </p>
                  <p>
                    وضعیت رشد:{" "}
                    <strong className="text-yellow-700">
                      {report.data.status ?? "—"}
                    </strong>
                  </p>
                  <p>
                    سن کودک: <strong>{report.data.age ?? "—"}</strong> سال
                  </p>
                  <p>
                    قد: <strong>{report.data.height ?? "—"}</strong> سانتی‌متر
                  </p>
                  <p>
                    وزن: <strong>{report.data.weight ?? "—"}</strong> کیلوگرم
                  </p>
                  <p className="font-bold text-yellow-700 border-t border-yellow-100 pt-3">
                    وضعیت کلی رشد: {report.data.level ?? "—"}
                  </p>

                  {/* 🌿 محدوده طبیعی (اختیاری برای فاز بعد) */}
                  {report.data.normalRange && (
                    <p className="text-gray-600 text-xs">
                      محدوده طبیعی BMI در این سن: {report.data.normalRange}
                    </p>
                  )}
                </div>

                {/* 💡 پیشنهادهای ژنینویی برای رشد سالم کودک */}
                <div className="mt-6 bg-gradient-to-br from-yellow-50 via-white to-amber-50 border border-yellow-100 rounded-2xl p-4">
                  <h3 className="text-yellow-700 font-bold mb-3 text-sm flex items-center gap-2">
                    🌟 پیشنهادهای ژنینو برای تعادل رشد کودک:
                  </h3>
                  <ul className="list-disc pr-5 space-y-2 text-gray-700 text-sm leading-relaxed">
                    {report.data.status?.includes("کم") && (
                      <>
                        <li>
                          وعده‌های غذایی پرکالری ولی سالم مانند برنج، تخم‌مرغ و
                          لبنیات مصرف شود.
                        </li>
                        <li>
                          افزایش وعده‌های کوچک در طول روز و میان‌وعده‌های مقوی
                          مفید است.
                        </li>
                        <li>
                          خواب کافی (۱۰ تا ۱۲ ساعت برای کودکان زیر ۶ سال) رشد را
                          بهبود می‌دهد.
                        </li>
                        <li>
                          بازی‌های فعال در فضای باز (تاب، دویدن، توپ) باعث
                          تحریک اشتها و رشد عضله می‌شود.
                        </li>
                      </>
                    )}

                    {report.data.status?.includes("اضافه") && (
                      <>
                        <li>
                          مصرف نوشیدنی‌های شیرین و خوراکی‌های فرآوری‌شده کاهش
                          یابد.
                        </li>
                        <li>
                          فعالیت بدنی روزانه مثل دویدن، طناب یا رقص کودکانه
                          توصیه می‌شود.
                        </li>
                        <li>
                          خواب کافی و منظم باعث تنظیم متابولیسم و تعادل وزن
                          می‌شود.
                        </li>
                        <li>
                          مصرف سبزیجات تازه و پروتئین بدون چربی افزایش یابد.
                        </li>
                      </>
                    )}

                    {report.data.status?.includes("طبیعی") && (
                      <>
                        <li>
                          الگوی تغذیه فعلی مناسب است؛ تعادل بین پروتئین، میوه و
                          لبنیات حفظ شود.
                        </li>
                        <li>
                          فعالیت‌های روزانه ادامه یابد؛ تنوع در بازی‌ها کمک به
                          رشد همه‌جانبه می‌کند.
                        </li>
                        <li>
                          حفظ ساعت خواب ثابت (مثلاً ۹ شب تا ۷ صبح) توصیه می‌شود.
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </>
            )}

            {/* 🦷 سلامت دندان */}
            {report.type === "dental" && (
              <>
                <p>رشد دندان‌ها: {report.data?.growth?.score}/3</p>
                <p>سلامت ظاهری: {report.data?.condition?.score}/3</p>
                <p>عادات بهداشتی: {report.data?.hygiene}/12</p>
              </>
            )}

            {/* 🌿 گوارش */}
            {report.type === "digestion" && (
              <>
                <p>بلع و جویدن: {report.data.swallowing}/12</p>
                <p>گوارش عمومی: {report.data.bowel}/12</p>
                <p>عادات تغذیه: {report.data.habits}/12</p>
              </>
            )}

            {/* 🧠 رشد حرکتی */}
            {report.type === "movement" && (
              <>
                <p>حرکت درشت: {report.data.gross}/9</p>
                <p>حرکت ظریف: {report.data.fine}/9</p>
                <p>تعادل: {report.data.balance}/9</p>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
