import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Kids() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("نوزاد");

  const sections = [
    {
title: "نوزاد",
items: [
"لباس نوزاد",
"کفش و پاپوش نوزاد",
"اسباب‌بازی نوزاد",
"کتاب و آموزش نوزاد",
"تغذیه نوزاد",
"بهداشت و مراقبت نوزاد",
"خواب و اتاق نوزاد",
"حمل و گردش نوزاد",
"لوازم ایمنی نوزاد",
"لوازم سفر نوزاد",
"هدایا و ست‌های نوزاد",
"همه کالاهای نوزاد"
]
},
    {
title: "کودک",
items: [
"لباس کودک",
"کفش کودک",
"کیف و کوله کودک",
"اکسسوری کودک",
"اسباب‌بازی کودک",
"بازی فکری کودک",
"پازل کودک",
"لگو و ساختنی",
"اسباب‌بازی آموزشی",
"اسباب‌بازی موزیکال",
"اسباب‌بازی کنترلی",
"عروسک و فیگور",
"ماشین و قطار اسباب‌بازی",
"کتاب کودک",
"کتاب داستان کودک",
"کتاب آموزشی کودک",
"کتاب مهارت‌های زندگی",
"کتاب رنگ‌آمیزی",
"مجلات کودک",
"لوازم تحریر کودک",
"دفتر و نوشت‌افزار",
"جامدادی",
"مداد رنگی و ماژیک",
"لوازم مدرسه کودک",
"کوله مدرسه",
"نقاشی و رنگ‌آمیزی",
"خمیر بازی",
"کاردستی و خلاقیت",
"ابزار هنری کودک",
"ورزش و بازی کودک",
"دوچرخه کودک",
"سه‌چرخه کودک",
"اسکوتر کودک",
"توپ و لوازم ورزشی",
"وسایل بازی فضای باز",
"اتاق کودک",
"تخت کودک",
"میز و صندلی کودک",
"کمد و دراور کودک",
"چراغ خواب کودک",
"دکور اتاق کودک",
"فرش و کفپوش کودک",
"تغذیه کودک",
"ظرف غذای کودک",
"قمقمه کودک",
"لانچ باکس کودک",
"سلامت و مراقبت کودک",
"بهداشت کودک",
"محصولات مراقبت پوست کودک",
"محصولات مراقبت مو کودک",
"ایمنی کودک",
"محافظ گوشه و لبه",
"محافظ پریز برق",
"قفل ایمنی کودک",
"وسایل سفر کودک",
"چمدان کودک",
"بالش سفری کودک",
"هدایا و ست‌های کودک",
"همه کالاهای کودک"
]
},
    {
title: "نوجوان",
items: [
"پوشاک نوجوان",
"کفش نوجوان",
"کیف و کوله نوجوان",
"اکسسوری نوجوان",
"ساعت نوجوان",
"ورزش نوجوان",
"دوچرخه نوجوان",
"اسکوتر نوجوان",
"توپ و تجهیزات ورزشی",
"لباس ورزشی نوجوان",
"کفش ورزشی نوجوان",
"کتاب نوجوان",
"رمان نوجوان",
"کتاب آموزشی نوجوان",
"کتاب موفقیت و رشد فردی",
"کتاب زبان‌آموزی",
"لوازم تحریر نوجوان",
"دفتر و نوشت‌افزار",
"جامدادی",
"کوله مدرسه",
"لوازم کمک آموزشی",
"کالای دیجیتال نوجوان",
"هدفون و هندزفری",
"ساعت هوشمند",
"تبلت",
"لوازم جانبی موبایل",
"چراغ مطالعه",
"گیم و سرگرمی",
"کنسول بازی",
"لوازم جانبی گیمینگ",
"بازی فکری نوجوان",
"پازل و معما",
"هنر و خلاقیت",
"لوازم نقاشی",
"لوازم طراحی",
"لوازم موسیقی",
"کاردستی و ساختنی",
"سلامت و مراقبت نوجوان",
"بهداشت فردی",
"مراقبت پوست نوجوان",
"مراقبت مو نوجوان",
"اتاق نوجوان",
"میز مطالعه",
"صندلی مطالعه",
"دکور اتاق نوجوان",
"چراغ خواب و مطالعه",
"سفر و گردش نوجوان",
"چمدان نوجوان",
"لوازم کمپینگ نوجوان",
"هدایا و ست‌های نوجوان",
"همه کالاهای نوجوان"
]
},
    {
title: "بازی، رشد و سرگرمی",
items: [
"بازی فکری",
"پازل",
"لگو و ساختنی",
"اسباب‌بازی آموزشی",
"اسباب‌بازی مونته‌سوری",
"اسباب‌بازی حسی",
"اسباب‌بازی موزیکال",
"اسباب‌بازی کنترلی",
"عروسک و فیگور",
"ماشین و قطار اسباب‌بازی",
"وسایل هنری",
"نقاشی و رنگ‌آمیزی",
"خمیر بازی",
"کاردستی و خلاقیت",
"ابزار طراحی کودک",
"لوازم موسیقی کودک",
"کتاب کودک و نوجوان",
"کتاب داستان",
"کتاب رنگ‌آمیزی",
"کتاب آموزشی",
"کتاب مهارت‌های زندگی",
"آموزش خلاقیت",
"آموزش برنامه‌نویسی کودک",
"آموزش زبان",
"آموزش رباتیک",
"آموزش علوم و آزمایش",
"بازی‌های گروهی",
"بازی‌های خانوادگی",
"بازی‌های فضای باز",
"وسایل بازی حیاط و پارک",
"تم تولد",
"بادکنک و تزئینات جشن",
"لوازم جشن تولد",
"گیفت و یادبود جشن",
"شمع و لوازم کیک",
"هدایا و پک‌های سرگرمی",
"همه کالاهای رشد و سرگرمی"
]
},
    {
      title: "نمایش همه",
      items: [
        "همه کالاهای نوزاد، کودک و نوجوان",
      ],
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
                src="/images/shop/categories/kids.webp"
                alt="نوزاد، کودک و نوجوان"
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>

            <div className="text-center sm:text-right">
              <p className="text-[11px] font-bold text-yellow-100/90">
                دسته‌بندی کالاهای ژنینو
              </p>

              <h1 className="mt-2 text-xl font-black sm:text-2xl">
                نوزاد، کودک و نوجوان
              </h1>

              <p className="mt-2 text-xs font-medium leading-6 text-white/85">
                متناسب با سن فرزندتان دسته موردنظر را انتخاب کنید و سپس وارد بخش تخصصی کالاها شوید.
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