import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function WatchJewelry() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("ساعت");

  const sections = [
    {
title: "ساعت",
items: [
"ساعت مچی مردانه",
"ساعت مچی زنانه",
"ساعت مچی کودک",
"ساعت مچی نوجوان",
"ساعت عقربه‌ای",
"ساعت دیجیتال",
"ساعت ترکیبی آنالوگ دیجیتال",
"ساعت هوشمند",
"ساعت هوشمند مردانه",
"ساعت هوشمند زنانه",
"ساعت هوشمند کودک",
"دستبند هوشمند",
"مچ بند سلامتی",
"ساعت رسمی",
"ساعت کلاسیک",
"ساعت لوکس",
"ساعت مجلسی",
"ساعت اسپرت",
"ساعت ورزشی",
"ساعت ضد آب",
"ساعت کوهنوردی",
"ساعت طبیعت گردی",
"ساعت غواصی",
"ساعت روزمره",
"ساعت فشن",
"ساعت ست زن و مرد",
"ساعت ست خانواده",
"بند ساعت",
"بند ساعت چرمی",
"بند ساعت فلزی",
"بند ساعت سیلیکونی",
"جعبه ساعت",
"باکس نگهداری ساعت",
"شارژر ساعت هوشمند",
"لوازم جانبی ساعت",
"ساعت رومیزی",
"ساعت دیواری",
"ساعت زنگ دار",
"همه ساعت‌ها"
]
},
    {
title: "زیورآلات و اکسسوری",

items: [
"گردنبند زنانه",
"گردنبند مردانه",
"گردنبند کودک",
"دستبند زنانه",
"دستبند مردانه",
"دستبند کودک",
"انگشتر زنانه",
"انگشتر مردانه",
"انگشتر کودک",
"گوشواره زنانه",
"گوشواره دخترانه",
"گوشواره کودک",
"پابند",
"بازوبند",
"سنجاق سینه",
"زنجیر مردانه",
"پلاک",
"آویز گردنبند",
"زیورآلات دخترانه",
"زیورآلات پسرانه",
"زیورآلات کودک",
"زیورآلات نوزاد",
"زیورآلات فانتزی",
"بدلیجات",
"زیورآلات دست ساز",
"زیورآلات استیل",
"زیورآلات نقره",
"ست زیورآلات زنانه",
"ست زیورآلات مردانه",
"ست زیورآلات کودک",
"ست هدیه زیورآلات",
"ست مادر و دختر",
"تل مو",
"تل پارچه‌ای",
"تل فانتزی",
"هدبند",
"هدبند ورزشی",
"کش مو",
"کش موی پارچه‌ای",
"کش موی فانتزی",
"گیره مو",
"گلسر",
"کلیپس مو",
"سنجاق مو",
"شانه سر تزئینی",
"تاج دخترانه",
"تاج تولد",
"تاج عروسکی کودک",
"اکستنشن مو",
"مهره مو",
"اکسسوری بافت مو",
"آویز کیف",
"آویز کوله پشتی",
"جاکلیدی فانتزی",
"پیرسینگ",
"پیرسینگ گوش",
"پیرسینگ بینی",
"دکمه سرآستین",
"کراوات و پاپیون تزئینی",
"جعبه جواهرات",
"جا جواهری",
"استند زیورآلات",
"باکس هدیه زیورآلات",
"همه زیورآلات و اکسسوری‌ها"
]
},
    {
      title: "همه ساعت و زیورآلات",
      items: ["همه ساعت و زیورآلات"],
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
              <img
                src="/images/shop/categories/watch-jewelry.webp"
                alt="ساعت و زیورآلات"
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>

            <div className="text-center sm:text-right">
              <p className="text-[11px] font-bold text-yellow-100/90">
                دسته‌بندی کالاهای ژنینو
              </p>

              <h1 className="mt-2 text-xl font-black sm:text-2xl">
                ساعت و زیورآلات
              </h1>

              <p className="mt-2 text-xs font-medium leading-6 text-white/85">
                ابتدا بخش موردنظر را انتخاب کنید، سپس نوع کالا را بزنید تا فروشگاه همان محصولات را نمایش دهد.
              </p>
            </div>
          </div>
        </header>

        <section className="mt-5 rounded-[2rem] border border-yellow-200/60 bg-[#fff8e8] p-3 shadow-[0_14px_35px_rgba(120,90,20,0.10)]">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
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
          <h2 className="mb-4 text-right text-sm font-black text-[#7a5526]">
            {activeSection}
          </h2>

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