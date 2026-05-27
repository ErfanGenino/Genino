// 📄 src/components/Reports/GeninoReportBox.jsx
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Share2, Calendar, Download } from "lucide-react";

/**
 * GeninoReportBox
 * props:
 *  - title: string (مثلاً "گزارش هوشمند شنوایی ژنینو")
 *  - color: "sky" | "emerald" | "amber" | ... (تم رنگی)
 *  - sections: Array<{ title:string, score:number, max:number, status:string, desc:string }>
 *  - summary: string (جمع‌بندی)
 *  - tips: string[] (پیشنهادهای ژنینو)
 *  - reportDate: Date | string (تاریخ/زمان گزارش)
 *  - onSnapshot?: (dataUrl:string) => void  ← برای ذخیره تصویر در والد
 */
export default function GeninoReportBox({
  title,
  color = "sky",
  sections = [],
  summary = "",
  tips = [],
  reportDate = new Date(),
  onSnapshot,
}) {
  const boxRef = useRef(null);

  // 🎯 پالت‌های سبک برای رنگ‌ها
  const theme = {
    sky:   { ring: "ring-sky-200", head: "text-sky-700", dot: "bg-sky-500", cardBorder: "border-sky-100" },
    emerald: { ring: "ring-emerald-200", head: "text-emerald-700", dot: "bg-emerald-500", cardBorder: "border-emerald-100" },
    amber: { ring: "ring-amber-200", head: "text-amber-700", dot: "bg-amber-500", cardBorder: "border-amber-100" },
  }[color] || { ring: "ring-sky-200", head: "text-sky-700", dot: "bg-sky-500", cardBorder: "border-sky-100" };

  // 🧷 ساخت snapshot تمیز فقط از همین باکس (ایزوله و پایدار روی موبایل/Vercel)
  useEffect(() => {
    let timer = setTimeout(async () => {
      if (!boxRef.current) return;
      try {
        // اسکرول را صفر می‌کنیم تا تصویر shift نشود
        const prevX = window.scrollX;
        const prevY = window.scrollY;
        window.scrollTo(0, 0);

        const rect = boxRef.current.getBoundingClientRect();
        const scale = Math.min(3, Math.max(2, window.devicePixelRatio || 2));

        const { default: html2canvas } = await import("html2canvas");
        const canvas = await html2canvas(boxRef.current, {
          backgroundColor: "#ffffff",
          scale,
          scrollX: 0,
          scrollY: 0,
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY,
          width: rect.width,
          height: rect.height,
          useCORS: true,
          logging: false,
        });

        window.scrollTo(prevX, prevY);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
        onSnapshot && onSnapshot(dataUrl);
      } catch (e) {
        console.warn("Snapshot failed:", e);
      }
    }, 600); // کمی صبر تا فونت‌ها و انیمیشن‌ها کامل شوند

    return () => clearTimeout(timer);
  }, [onSnapshot]);

  // 📤 اشتراک‌گذاری (Web Share → fallback: کپی متن)
  const handleShare = async () => {
    const dateStr = new Date(reportDate).toLocaleString("fa-IR");
    const text =
      `${title}\n` +
      sections.map(s => `• ${s.title}: ${s.score}/${s.max} (${s.status})`).join("\n") +
      `\n— جمع‌بندی: ${summary}\n` +
      (tips.length ? `\nپیشنهادها:\n- ${tips.join("\n- ")}` : "") +
      `\nزمان گزارش: ${dateStr}`;

    try {
      if (navigator.share) {
        await navigator.share({ title, text });
      } else {
        await navigator.clipboard.writeText(text);
        alert("متن گزارش در کلیپ‌بورد کپی شد ✅");
      }
    } catch {}
  };

  return (
    <motion.section
      ref={boxRef}
      dir="rtl"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45 }}
      className={`max-w-3xl w-full mx-auto bg-white rounded-3xl border ${theme.cardBorder}
                  shadow-[0_0_40px_rgba(0,0,0,0.05)] ring-1 ${theme.ring} p-6 sm:p-8`}
    >
      {/* سربرگ */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold ${theme.head} flex items-center gap-2`}>
            گزارش هوشمند {title}
          </h2>
          <p className="text-gray-600 mt-1 text-sm sm:text-[15px]">
            نتایج بر اساس پاسخ‌های شما تحلیل شده است.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
            <Calendar className="w-4 h-4" />
            <span className="text-xs sm:text-sm">
              {new Date(reportDate).toLocaleString("fa-IR")}
            </span>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white px-3.5 py-1.5 rounded-xl text-sm font-semibold shadow hover:from-yellow-600 hover:to-yellow-500"
          >
            <Share2 className="w-4 h-4" />
            اشتراک‌گذاری
          </button>
        </div>
      </div>

      {/* سه ستون نتایج */}
      <div className="grid sm:grid-cols-3 gap-5 mb-8">
        {sections.map((s, idx) => (
          <div key={idx} className={`bg-white rounded-2xl border ${theme.cardBorder} shadow-sm p-5`}>
            <h3 className={`font-bold ${theme.head} mb-2 flex items-center gap-2`}>
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${theme.dot}`} />
              {s.title}
            </h3>
            <p className="text-gray-700 text-sm mb-1">
              امتیاز: {s.score}/{s.max} —{" "}
              <span className="font-semibold">{s.status}</span>
            </p>
            {s.desc && (
              <p className="text-xs text-gray-500 leading-relaxed">
                {s.desc}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* جمع‌بندی */}
      <div className={`w-full text-right bg-white rounded-2xl border ${theme.cardBorder} shadow-sm p-6 mb-6`}>
        <h4 className={`font-bold ${theme.head} mb-2`}>🔍 تفسیر نهایی:</h4>
        <p className="text-gray-700 text-sm leading-relaxed">{summary}</p>
      </div>

      {/* پیشنهادها */}
      {tips?.length > 0 && (
        <div className={`w-full text-right bg-white rounded-2xl border ${theme.cardBorder} shadow-sm p-6`}>
          <h4 className={`font-bold ${theme.head} mb-3`}>🎯 پیشنهادهای اختصاصی ژنینو:</h4>
          <ul className="list-disc pr-5 space-y-2 text-gray-700 text-sm leading-relaxed">
            {tips.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
      )}
    </motion.section>
  );
}
