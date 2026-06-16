import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Medical() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("سلامت کودک");

  const sections = [
    {
title: "سلامت کودک",
items: [

"تب سنج",
"تب سنج دیجیتال",
"تب سنج لیزری",
"تب سنج غیرتماسی",

"دستگاه بخور",
"بخور سرد",
"بخور گرم",

"تصفیه هوا اتاق کودک",

"دماسنج اتاق کودک",
"رطوبت سنج اتاق کودک",

"پوار بینی کودک",
"فین گیر کودک",
"شوینده بینی کودک",

"دستگاه شستشوی بینی",

"لوازم کمک های اولیه کودک",
"جعبه کمک های اولیه کودک",
"چسب زخم کودک",
"پانسمان کودک",

"کیسه آب گرم کودک",
"کمپرس سرد و گرم کودک",

"ترازو کودک",
"ترازوی نوزاد",

"قدسنج کودک",
"متر رشد کودک",

"پالس اکسیمتر",
"فشارسنج خانگی",

"مسواک کودک",
"مسواک برقی کودک",
"خمیر دندان کودک",
"دهان شویه کودک",

"دندان گیر نوزاد",

"مراقبت پوست کودک",
"کرم سوختگی کودک",
"کرم مرطوب کننده کودک",
"لوسیون کودک",
"ضد آفتاب کودک",

"شامپو کودک",
"شامپو بدن کودک",
"صابون کودک",

"محافظ گوش کودک",
"گوش پاک کن کودک",

"مراقبت نوزاد",
"سلامت نوزاد",

"پایش رشد کودک",
"پایش سلامت کودک",

"محصولات ضد حساسیت کودک",
"محصولات مراقبت تنفسی کودک",

"همه کالاهای سلامت کودک"

]
},
    {
title: "بهداشت فردی",
items: [

"مسواک",
"مسواک برقی",
"مسواک کودک",

"خمیر دندان",
"خمیر دندان کودک",
"خمیر دندان حساس",

"دهان شویه",
"نخ دندان",
"واترجت دندان",

"شامپو",
"شامپو کودک",
"شامپو ضد شوره",
"شامپو درمانی",

"صابون",
"صابون آنتی باکتریال",
"صابون درمانی",

"شامپو بدن",
"ژل شستشوی بدن",

"ضدعفونی کننده دست",
"ژل ضدعفونی کننده",
"الکل بهداشتی",

"دستمال مرطوب",
"دستمال مرطوب کودک",

"پنبه بهداشتی",
"گوش پاک کن",

"نوار بهداشتی",
"پد روزانه",
"تامپون",
"کاپ قاعدگی",

"تیغ اصلاح",
"خودتراش",
"فوم اصلاح",

"دئودورانت",
"مام رول",
"اسپری ضد تعریق",

"ناخن گیر",
"قیچی ناخن",
"سوهان ناخن",

"لیف",
"اسفنج حمام",

"ست بهداشت فردی",
"لوازم بهداشت سفر",

"بهداشت بانوان",
"بهداشت آقایان",
"بهداشت کودک",

"همه کالاهای بهداشت فردی"

]
},
    {
title: "تجهیزات پزشکی",
items: [

"فشارسنج",
"فشارسنج دیجیتال",
"فشارسنج بازویی",
"فشارسنج مچی",

"ترازو",
"ترازوی دیجیتال",
"ترازوی هوشمند",
"ترازوی نوزاد",

"پالس اکسیمتر",

"گلوکومتر",
"نوار تست قند خون",
"سوزن تست قند خون",

"تب سنج",
"تب سنج دیجیتال",
"تب سنج غیرتماسی",
"تب سنج لیزری",

"دماسنج محیط",

"دستگاه بخور",
"بخور سرد",
"بخور گرم",

"نبولایزر",
"اکسیژن ساز",
"ماسک اکسیژن",

"تصفیه هوا",

"تشک برقی",
"کیسه آب گرم",
"کمپرس سرد و گرم",

"ویلچر",
"واکر",
"عصا",
"عصای طبی",

"گردنبند طبی",
"زانو بند طبی",
"مچ بند طبی",
"کمربند طبی",
"قوزبند طبی",

"دستگاه ماساژور",
"ماساژور گردن",
"ماساژور پا",
"ماساژور بدن",

"تخت بیمار",
"میز غذا بیمار",

"جعبه کمک های اولیه",
"کیف کمک های اولیه",

"تجهیزات مراقبت سالمندان",
"تجهیزات مراقبت بیماران",

"تجهیزات پزشکی خانگی",

"همه تجهیزات پزشکی"

]
},
    {
      title: "نمایش همه",
      items: ["همه کالاهای سلامت و پزشکی"],
    },
  ];

  const selectedSection = sections.find(
    (section) => section.title === activeSection
  );

  const goToShopFilter = (item) => {
    navigate(`/shop?category=${encodeURIComponent(item)}`);
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#faf7ef] px-3 py-5 text-gray-800 sm:px-5 lg:px-8"
    >
      <section className="mx-auto max-w-4xl">
        <header className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#4b2f17] via-[#7a5526] to-[#b88724] p-4 text-white shadow-[0_18px_55px_rgba(75,47,23,0.22)]">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <div className="h-32 w-32 shrink-0 overflow-hidden rounded-3xl border border-yellow-200/50 bg-[#fff8e8] p-2 shadow-inner">
              <img
                src="/images/shop/categories/medical.webp"
                alt="سلامت و پزشکی"
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>

            <div className="text-center sm:text-right">
              <p className="text-[11px] font-bold text-yellow-100/90">
                دسته‌بندی کالاهای ژنینو
              </p>

              <h1 className="mt-2 text-xl font-black sm:text-2xl">
                سلامت و پزشکی
              </h1>

              <p className="mt-2 text-xs font-medium leading-6 text-white/85">
                کالاهای سلامت، بهداشت و تجهیزات پزشکی را انتخاب کنید تا فروشگاه ژنینو محصولات مرتبط را نمایش دهد.
              </p>
            </div>
          </div>
        </header>

        <section className="mt-5 rounded-[2rem] border border-yellow-200/60 bg-[#fff8e8] p-3 shadow-[0_14px_35px_rgba(120,90,20,0.10)]">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
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