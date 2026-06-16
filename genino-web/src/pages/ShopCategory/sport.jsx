import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Sport() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("ورزش کودکان");

  const sections = [
    {
title: "ورزش کودکان",
items: [
"لباس ورزشی کودک",
"کفش ورزشی کودک",
"جوراب ورزشی کودک",
"کلاه ورزشی کودک",
"گرمکن کودک",
"مایو کودک",
"توپ کودک",
"توپ فوتبال کودک",
"توپ بسکتبال کودک",
"توپ والیبال کودک",
"توپ بازی نرم کودک",
"دوچرخه کودک",
"سه چرخه کودک",
"اسکوتر کودک",
"اسکیت کودک",
"واکر ورزشی کودک",
"طناب بازی کودک",
"حلقه هولاهوپ کودک",
"ترامپولین کودک",
"وسایل تعادلی کودک",
"دروازه فوتبال کودک",
"سبد بسکتبال کودک",
"ست بولینگ کودک",
"راکت و توپ کودک",
"ست بدمینتون کودک",
"لوازم شنا کودک",
"عینک شنا کودک",
"کلاه شنا کودک",
"بازوبند شنا",
"جلیقه شنا کودک",
"لوازم ژیمناستیک کودک",
"لوازم یوگا کودک",
"لوازم رزمی کودک",
"محافظ زانو کودک",
"محافظ آرنج کودک",
"کلاه ایمنی کودک",
"محافظ مچ کودک",
"کیف ورزشی کودک",
"قمقمه ورزشی کودک",
"بازی و ورزش فضای باز",
"وسایل بازی پارکی",
"وسایل حرکتی کودک",
"همه کالاهای ورزشی کودک"
]
},
    {
title: "ورزش بزرگسالان",
items: [
"پوشاک ورزشی مردانه",
"پوشاک ورزشی زنانه",
"کفش ورزشی",
"کفش دویدن",
"کفش پیاده‌روی",
"کفش باشگاهی",
"کفش فوتبال",
"کفش فوتسال",
"کفش بسکتبال",
"کفش والیبال",
"کفش تنیس",
"کفش کوهنوردی",
"بدنسازی و فیتنس",
"کراس فیت",
"پاورلیفتینگ",
"دویدن و پیاده‌روی",
"دو و میدانی",
"فوتبال",
"فوتسال",
"بسکتبال",
"والیبال",
"هندبال",
"تنیس",
"بدمینتون",
"پدل",
"اسکواش",
"شنا",
"غواصی",
"دوچرخه سواری",
"موتورسواری ورزشی",
"کوهنوردی",
"طبیعت گردی",
"کمپینگ",
"اسکی",
"اسنوبرد",
"یوگا",
"پیلاتس",
"مدیتیشن",
"ورزش های رزمی",
"کاراته",
"تکواندو",
"جودو",
"بوکس",
"کونگ فو",
"کشتی",
"ژیمناستیک",
"رقص",
"باله",
"ساک ورزشی",
"کوله ورزشی",
"قمقمه ورزشی",
"شیکر ورزشی",
"جوراب ورزشی",
"کلاه ورزشی",
"دستکش ورزشی",
"هدبند ورزشی",
"مچ بند ورزشی",
"ساعت ورزشی",
"دستبند سلامتی",
"همه کالاهای ورزشی بزرگسالان"
]
},
    {
title: "توپ و بازی‌های گروهی",
items: [
"توپ فوتبال",
"توپ فوتسال",
"توپ بسکتبال",
"توپ والیبال",
"توپ هندبال",
"توپ راگبی",
"توپ ساحلی",
"توپ پلاستیکی",
"توپ بادی",
"توپ آموزشی کودکان",
"راکت تنیس",
"راکت بدمینتون",
"راکت پدل",
"راکت پینگ پنگ",
"توپ تنیس",
"توپ پینگ پنگ",
"توپ بدمینتون",
"فریزبی",
"بومرنگ",
"ست بولینگ",
"بولینگ کودک",
"دارت",
"فوتبال دستی",
"ایرهاکی",
"میز پینگ پنگ",
"تور فوتبال",
"دروازه فوتبال",
"سبد بسکتبال",
"تور والیبال",
"تور بدمینتون",
"طناب کشی",
"حلقه پرتاب",
"بازی‌های حرکتی گروهی",
"بازی‌های خانوادگی",
"بازی‌های دورهمی",
"بازی‌های فضای باز",
"وسایل بازی پارکی",
"وسایل بازی حیاط",
"پیک نیک و تفریحات گروهی",
"همه توپ‌ها و بازی‌های گروهی"
]
},
    {
title: "بدنسازی و تناسب اندام",
items: [
"دمبل",
"دمبل قابل تنظیم",
"کتل بل",
"هالتر",
"میله هالتر",
"صفحه وزنه",
"نیمکت بدنسازی",
"رک بدنسازی",
"پایه اسکات",
"بارفیکس",
"کش ورزشی",
"کش مقاومتی",
"کش پیلاتس",
"کش کراس فیت",
"مت یوگا",
"مت پیلاتس",
"مت ورزشی",
"حلقه پیلاتس",
"آجر یوگا",
"بند یوگا",
"توپ یوگا",
"فوم رولر",
"ماساژور ورزشی",
"توپ ماساژ",
"طناب ورزشی",
"طناب کراس فیت",
"حلقه هولاهوپ",
"لوازم تمرین خانگی",
"لوازم تمرین باشگاهی",
"کراس فیت",
"پاورلیفتینگ",
"فیتنس",
"ترازو دیجیتال",
"ترازوی هوشمند",
"آنالیزور ترکیب بدن",
"قمقمه ورزشی",
"شیکر ورزشی",
"جا مکملی",
"دستکش بدنسازی",
"مچ بند بدنسازی",
"زانوبند ورزشی",
"آرنج بند ورزشی",
"کمربند بدنسازی",
"بند لیفت",
"بند مچ بدنسازی",
"دوچرخه ثابت",
"تردمیل",
"الپتیکال",
"استپر",
"وسایل چربی سوزی",
"وسایل هوازی",
"تجهیزات ریکاوری",
"تجهیزات کشش عضلات",
"همه لوازم تناسب اندام"
]
},
    {
      title: "نمایش همه",
      items: ["همه کالاهای ورزشی"],
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
                src="/images/shop/categories/sport.webp"
                alt="کالای ورزشی"
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>

            <div className="text-center sm:text-right">
              <p className="text-[11px] font-bold text-yellow-100/90">
                دسته‌بندی کالاهای ژنینو
              </p>

              <h1 className="mt-2 text-xl font-black sm:text-2xl">
                کالای ورزشی
              </h1>

              <p className="mt-2 text-xs font-medium leading-6 text-white/85">
                لوازم ورزشی مناسب کودکان، نوجوانان و خانواده را انتخاب کنید تا فروشگاه همان محصولات را نشان دهد.
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