import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


export default function ArtClasses() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("هنرهای تجسمی");

  const sections = [
    {
  title: "هنرهای تجسمی",
  items: [
    "نقاشی",
    "طراحی",
    "سیاه‌قلم",
    "آبرنگ",
    "گواش",
    "رنگ روغن",
    "اکریلیک",
    "طراحی چهره",
    "طراحی شخصیت",
    "تصویرسازی",
    "کاریکاتور",
    "خوشنویسی",
    "نستعلیق",
    "شکسته نستعلیق",
    "تذهیب",
    "نگارگری ایرانی",
    "مینیاتور",
    "همه هنرهای تجسمی",
  ],
},
    {
  title: "موسیقی",
  items: [
    "موسیقی کودک",
    "ارف کودک",
    "تئوری موسیقی",
    "نت‌خوانی و سلفژ",
    "آهنگسازی",
    "تنظیم موسیقی",
    "آواز",
    "خوانندگی",
    "پیانو",
    "کیبورد",
    "گیتار",
    "گیتار الکتریک",
    "ویولن",
    "ویولا",
    "ویولنسل",
    "دف",
    "تنبک",
    "سنتور",
    "تار",
    "سه‌تار",
    "نی",
    "کمانچه",
    "عود",
    "قانون",
    "درامز",
    "فلوت",
    "ساکسیفون",
    "کلارینت",
    "همه کلاس‌های موسیقی",
  ],
},
    {
  title: "هنرهای نمایشی",
  items: [
    "تئاتر کودک",
    "تئاتر نوجوان",
    "بازیگری",
    "بازیگری سینما",
    "بازیگری تئاتر",
    "بداهه‌پردازی",
    "گویندگی",
    "دوبله",
    "فن بیان",
    "سخنوری",
    "مجری‌گری",
    "استندآپ کودک",
    "استندآپ کمدی",
    "نمایش خلاق",
    "قصه‌گویی",
    "نمایش عروسکی",
    "پانتومیم",
    "حرکت و بیان بدن",
    "آمادگی ورود به هنرستان‌های نمایشی",
    "همه هنرهای نمایشی",
  ],
},
    {
  title: "هنر دستی و خلاقیت",
  items: [
    "کاردستی",
    "خلاقیت کودک",
    "اوریگامی",
    "کاغذ و تا",
    "ماکت‌سازی",
    "ساخت عروسک",
    "سفالگری",
    "سرامیک",
    "مجسمه‌سازی",
    "رزین",
    "شمع‌سازی",
    "صابون‌سازی",
    "ساخت زیورآلات",
    "چرم‌دوزی",
    "معرق",
    "منبت‌کاری",
    "کلاژ و حجم‌سازی",
    "بازیافت خلاق",
    "DIY و ساختنی",
    "همه هنرهای دستی",
  ],
},
    {
      title: "نمایش همه",
      items: ["همه کلاس‌های هنری"],
    },
  ];

  const selectedSection = sections.find(
    (section) => section.title === activeSection
  );

  const goToShopFilter = (item) => {
  const showAllItems = [
    "همه هنرهای تجسمی",
    "همه کلاس‌های موسیقی",
    "همه هنرهای نمایشی",
    "همه هنرهای دستی",
    "همه کلاس‌های هنری",
  ];

  if (showAllItems.includes(item)) {
    navigate("/shop?service=art-class");
    return;
  }

  navigate(
    `/shop?service=art-class&artField=${encodeURIComponent(item)}`
  );
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
                src="/images/shop/services/art-classes.webp"
                alt="کلاس‌های هنری"
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>

            <div className="text-center sm:text-right">
              <p className="text-[11px] font-bold text-yellow-100/90">
                دسته‌بندی خدمات ژنینو
              </p>

              <h1 className="mt-2 text-xl font-black sm:text-2xl">
                کلاس‌های هنری
              </h1>

              <p className="mt-2 text-xs font-medium leading-6 text-white/85">
                مسیر رشد خلاقیت و استعدادهای هنری کودک و خانواده را انتخاب کنید.
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