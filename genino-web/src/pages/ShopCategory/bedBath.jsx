import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function BedBath() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("کالای خواب");

  const sections = [
    {
title: "کالای خواب",
items: [
"تشک",
"تشک طبی",
"تشک فنری",
"تشک کودک",
"تشک نوزاد",
"بالش",
"بالش طبی",
"بالش کودک",
"بالش نوزاد",
"بالش بارداری",
"لحاف",
"لحاف کودک",
"لحاف نوزاد",
"پتو",
"پتو مسافرتی",
"پتو کودک",
"پتو نوزاد",
"روتختی",
"ست روتختی",
"روتختی کودک",
"روتختی نوزاد",
"ملحفه",
"روبالشی",
"کاور لحاف",
"کاور تشک",
"محافظ تشک",
"محافظ بالش",
"کیسه خواب",
"کیسه خواب کودک",
"سرویس خواب بزرگسال",
"سرویس خواب کودک",
"سرویس خواب نوزاد",
"تخت خواب",
"تخت کودک",
"تخت نوزاد",
"پشه بند خواب",
"چشم بند خواب",
"بالشتک گردنی",
"همه کالای خواب"
]
},
    {
title: "کالای حمام",
items: [
"حوله حمام",
"حوله تن پوش",
"حوله استخری",
"حوله دستی",
"حوله صورت",
"حوله مهمان",
"حوله کودک",
"حوله نوزاد",
"ست حوله",
"ست حمام",
"روبدوشامبر",
"کلاه حمام",
"لیف حمام",
"اسفنج حمام",
"کیسه حمام",
"برس حمام",
"برس پشت شوی حمام",
"پادری حمام",
"محافظ ضد لغزش حمام",
"پرده حمام",
"میله پرده حمام",
"گیره پرده حمام",
"دمپایی حمام",
"دمپایی استخری",
"دمپایی روفرشی",
"جا صابونی",
"جا مسواکی",
"جا شامپویی",
"جا مایع دستشویی",
"جا دستمال کاغذی",
"ست سرویس بهداشتی و حمام",
"آویز حوله",
"جا حوله‌ای",
"حلقه حوله",
"آویز لباس حمام",
"قفسه حمام",
"شلف حمام",
"ارگانایزر حمام",
"لوازم نظم‌دهنده حمام",
"سبد حمام",
"سبد لباس چرک",
"آینه حمام",
"آینه آرایشی",
"آینه ضد بخار",
"وان حمام کودک",
"صندلی حمام کودک",
"آبریز حمام کودک",
"اسباب‌بازی حمام کودک",
"دوش دستی",
"سر دوش حمام",
"سر دوش کم مصرف",
"سطل حمام",
"سطل پدالی حمام",
"فرچه سرویس بهداشتی",
"لوازم اسپا و آرامش",
"شمع معطر",
"نمک حمام",
"بمب حمام",
"روغن ماساژ",
"اسکراب بدن",
"همه کالای حمام"
]
},
    {
      title: "همه کالاهای خواب و حمام",
      items: ["همه کالاهای خواب و حمام"],
    },
  ];

  const selectedSection = sections.find(
    (section) => section.title === activeSection
  );

  const goToShopFilter = (item) => {
    navigate(`/shop?category=${encodeURIComponent(item)}`);
  };

  return (
    <main dir="rtl" className="min-h-screen bg-[#faf7ef] px-3 py-5 text-gray-800 sm:px-5 lg:px-8">
      <section className="mx-auto max-w-4xl">
        <header className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#4b2f17] via-[#7a5526] to-[#b88724] p-4 text-white shadow-[0_18px_55px_rgba(75,47,23,0.22)]">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <div className="h-32 w-32 shrink-0 overflow-hidden rounded-3xl border border-yellow-200/50 bg-[#fff8e8] p-2 shadow-inner">
              <img src="/images/shop/categories/bed-bath.webp" alt="کالای خواب و حمام" className="h-full w-full rounded-2xl object-cover" />
            </div>

            <div className="text-center sm:text-right">
              <p className="text-[11px] font-bold text-yellow-100/90">دسته‌بندی کالاهای ژنینو</p>
              <h1 className="mt-2 text-xl font-black sm:text-2xl">کالای خواب و حمام</h1>
              <p className="mt-2 text-xs font-medium leading-6 text-white/85">
                ابتدا بخش موردنظر را انتخاب کنید، سپس نوع کالا را بزنید تا فروشگاه همان محصولات را نمایش دهد.
              </p>
            </div>
          </div>
        </header>

        <section className="mt-5 rounded-[2rem] border border-yellow-200/60 bg-[#fff8e8] p-3 shadow-[0_14px_35px_rgba(120,90,20,0.10)]">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
            {sections.map((section) => (
              <button
                key={section.title}
                onClick={() => setActiveSection(section.title)}
                className={`min-h-10 rounded-2xl px-2 py-2 text-[11px] font-black transition ${
                  activeSection === section.title
                    ? "bg-[#7a5526] text-white shadow-md"
                    : "bg-white text-[#7a5526] hover:bg-[#f3e3bd]"
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </section>

        <motion.section
          key={activeSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-5 rounded-[2rem] border border-yellow-200/60 bg-white/80 p-4 shadow-[0_14px_35px_rgba(120,90,20,0.08)]"
        >
          <h2 className="mb-4 text-right text-sm font-black text-[#7a5526]">{activeSection}</h2>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {selectedSection?.items.map((item) => (
              <button
                key={item}
                onClick={() => goToShopFilter(item)}
                className="min-h-12 rounded-2xl border border-yellow-200 bg-[#fff8e8] px-3 py-3 text-center text-[11px] font-bold text-gray-700 transition hover:bg-[#f3e3bd] hover:text-[#7a5526] hover:shadow-md"
              >
                {item}
              </button>
            ))}
          </div>
        </motion.section>
      </section>
    </main>
  );
}