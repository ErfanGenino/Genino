// 📄 src/pages/ChildHealthReports.jsx
import HorizontalScrollReports from "@components/Reports/HorizontalScrollReports";
import MiniReportBox from "@components/Reports/MiniReportBox";
import ReportDetailModal from "@components/Reports/ReportDetailModal";
import GeninoDNABackground from "@components/Core/GeninoDNABackground";
import { FileHeart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function ChildHealthReports() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("childReports") || "[]");
    setReports(saved);
  }, []);

  // 🔎 فیلتر گزارش‌ها بر اساس نوع
  const hearingReports = reports.filter((r) => r.type === "hearing");
  const visionReports = reports.filter((r) => r.type === "vision");
  const dentalReports = reports.filter((r) => r.type === "dental");
  const digestionReports = reports.filter((r) => r.type === "digestion");
  const movementReports = reports.filter((r) => r.type === "movement"); // ✅ اضافه شد
  const bodyReports = reports.filter((r) => r.type === "bodymetrics");

  // 🗑️ حذف گزارش
  const handleDelete = (r) => {
    const updated = reports.filter((x) => x.id !== r.id);
    setReports(updated);
    localStorage.setItem("childReports", JSON.stringify(updated));
  };

  // 📤 اشتراک‌گذاری گزارش
  const handleShare = (r) => {
  let text = "";
  if (r.type === "bodymetrics") {
    const d = r.data || {};
    text =
      `📋 گزارش ${r.label}\n` +
      `BMI: ${d.bmi ?? "—"}\n` +
      `وضعیت: ${d.status ?? "—"}\n` +
      `سن: ${d.age ?? "—"}، قد: ${d.height ?? "—"}cm، وزن: ${d.weight ?? "—"}kg`;
  } else {
    text = `📋 گزارش ${r.label}\nوضعیت: ${r.data.level}\nامتیاز کل: ${r.data.total || r.data.score}`;
  }
  navigator.share ? navigator.share({ text }) : alert(text);
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
          className="text-3xl sm:text-4xl font-extrabold text-yellow-700 mb-10 
                     drop-shadow-[0_0_10px_rgba(255,215,0,0.4)]"
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
              key="groups"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-6xl space-y-10"
            >
              {/* 👁️ پایش بینایی */}
              {visionReports.length > 0 && (
                <section>
                  <h3 className="font-extrabold text-amber-700 mb-3">👁️ پایش بینایی</h3>
                  <HorizontalScrollReports color="amber">
                    {visionReports.map((r) => (
                      <div
                        key={r.id}
                        className="snap-start shrink-0 w-[18rem] flex justify-center relative"
                        style={{ scrollSnapAlign: "start", marginRight: "8px", zIndex: 1 }}
                      >
                        <MiniReportBox
                          report={r}
                          onShare={handleShare}
                          onDelete={handleDelete}
                          onOpen={() => setSelectedReport(r)}
                        />
                      </div>
                    ))}
                  </HorizontalScrollReports>
                </section>
              )}

              {/* 🎧 پایش شنوایی */}
              {hearingReports.length > 0 && (
                <section>
                  <h3 className="font-extrabold text-sky-700 mb-3">🎧 پایش شنوایی</h3>
                  <HorizontalScrollReports color="sky">
                    {hearingReports.map((r) => (
                      <div
                        key={r.id}
                        className="snap-start shrink-0 w-[18rem] flex justify-center relative"
                        style={{ scrollSnapAlign: "start", marginRight: "8px", zIndex: 1 }}
                      >
                        <MiniReportBox
                          report={r}
                          onShare={handleShare}
                          onDelete={handleDelete}
                          onOpen={() => setSelectedReport(r)}
                        />
                      </div>
                    ))}
                  </HorizontalScrollReports>
                </section>
              )}

              {/* 🦷 پایش سلامت دندان‌ها */}
              {dentalReports.length > 0 && (
                <section>
                  <h3 className="font-extrabold text-rose-700 mb-3">🦷 پایش سلامت دندان‌ها</h3>
                  <HorizontalScrollReports color="rose">
                    {dentalReports.map((r) => (
                      <div
                        key={r.id}
                        className="snap-start shrink-0 w-[18rem] flex justify-center relative"
                        style={{ scrollSnapAlign: "start", marginRight: "8px", zIndex: 1 }}
                      >
                        <MiniReportBox
                          report={r}
                          onShare={handleShare}
                          onDelete={handleDelete}
                          onOpen={() => setSelectedReport(r)}
                        />
                      </div>
                    ))}
                  </HorizontalScrollReports>
                </section>
              )}

              {/* 🌿 پایش گوارش و بلع */}
              {digestionReports.length > 0 && (
                <section>
                  <h3 className="font-extrabold text-emerald-700 mb-3">🌿 پایش گوارش و بلع</h3>
                  <HorizontalScrollReports color="emerald">
                    {digestionReports.map((r) => (
                      <div
                        key={r.id}
                        className="snap-start shrink-0 w-[18rem] flex justify-center relative"
                        style={{ scrollSnapAlign: "start", marginRight: "8px", zIndex: 1 }}
                      >
                        <MiniReportBox
                          report={r}
                          onShare={handleShare}
                          onDelete={handleDelete}
                          onOpen={() => setSelectedReport(r)}
                        />
                      </div>
                    ))}
                  </HorizontalScrollReports>
                </section>
              )}

              {/* 🧠 پایش رشد حرکتی و تعادل ✅ جدید */}
              {movementReports.length > 0 && (
                <section>
                  <h3 className="font-extrabold text-emerald-600 mb-3">
                    ⚖️ رشد حرکتی و تعادل
                  </h3>
                  <HorizontalScrollReports color="emerald">
                    {movementReports.map((r) => (
                      <div
                        key={r.id}
                        className="snap-start shrink-0 w-[18rem] flex justify-center relative"
                        style={{ scrollSnapAlign: "start", marginRight: "8px", zIndex: 1 }}
                      >
                        <MiniReportBox
                          report={r}
                          onShare={handleShare}
                          onDelete={handleDelete}
                          onOpen={() => setSelectedReport(r)}
                        />
                      </div>
                    ))}
                  </HorizontalScrollReports>
                </section>
              )}

                {/* ⚖️ رشد بدنی و BMI */}
{bodyReports.length > 0 && (
  <section>
    <h3 className="font-extrabold text-yellow-700 mb-3">⚖️ رشد بدنی و BMI</h3>
    <HorizontalScrollReports color="yellow">
      {bodyReports.map((r) => (
        <div
          key={r.id}
          className="snap-start shrink-0 w-[18rem] flex justify-center relative"
          style={{ scrollSnapAlign: "start", marginRight: "8px", zIndex: 1 }}
        >
          <MiniReportBox
            report={r}
            onShare={handleShare}
            onDelete={handleDelete}
            onOpen={() => setSelectedReport(r)}
          />
        </div>
      ))}
    </HorizontalScrollReports>
  </section>
)}

            </motion.div>
          )}
        </AnimatePresence>

        {/* ✅ مودال جزئیات */}
        <ReportDetailModal report={selectedReport} onClose={() => setSelectedReport(null)} />

        {/* 💡 نکته انتهایی */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center text-gray-500 text-sm flex flex-col items-center gap-2"
        >
          <FileHeart className="w-6 h-6 text-yellow-500" />
          <p>گزارش‌های شما به‌صورت آفلاین ذخیره می‌شوند و فقط برای شما قابل مشاهده‌اند.</p>
        </motion.div>
      </main>
    </GeninoDNABackground>
  );
}
