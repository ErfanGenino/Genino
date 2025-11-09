import { useEffect, useState } from "react";
import GeninoDNABackground from "@components/Core/GeninoDNABackground";
import ChildReportCategoryBox from "@components/Reports/ChildReportCategoryBox";

export default function ChildHealthReports() {
  const [hearingReports, setHearingReports] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("hearingReports") || "[]");
    setHearingReports(saved);
  }, []);

  // نمونه‌های موقت برای دسته‌های دیگر تا بعد بسازیم
  const visionReports = [];
  const movementReports = [];

  return (
    <GeninoDNABackground strands={10} opacity={0.25} duration={90}>
      <main dir="rtl" className="relative z-10 flex flex-col items-center px-6 py-16 text-gray-800">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-yellow-700 mb-10 text-center drop-shadow-[0_0_15px_rgba(255,220,80,0.5)]">
          گزارش پایش سلامت کودک 👶
        </h1>

        <p className="text-gray-700 text-center max-w-2xl mb-12 leading-relaxed">
          نتایج پایش‌ها اینجاست. روی هر تصویر بزن تا بزرگ شود؛ می‌توانی حذف یا اشتراک‌گذاری هم انجام دهی.
        </p>

        <ChildReportCategoryBox
  title="🎧 پایش شنوایی"
  reports={JSON.parse(localStorage.getItem("hearingReports") || "[]")}
  storageKey="hearingReports"
/>
        <ChildReportCategoryBox title="👁️ پایش بینایی" reports={visionReports} />
        <ChildReportCategoryBox title="⚖️ رشد حرکتی و تعادل" reports={movementReports} />
      </main>
    </GeninoDNABackground>
  );
}
