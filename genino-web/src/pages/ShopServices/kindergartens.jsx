import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Kindergartens() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("رده سنی");

  const sections = [
    {
  title: "رده سنی",
  items: [
    "شیرخوار",
    "نوپا",
    "زیر ۱ سال",
    "۱ تا ۲ سال",
    "۲ تا ۳ سال",
    "۳ تا ۴ سال",
    "۴ تا ۵ سال",
    "۵ تا ۶ سال",
    "پیش‌دبستانی",
    "همه مهدکودک‌ها",
  ],
},
    {
      title: "نوع مهد",
      items: [
        "مهدکودک تمام وقت",
        "مهدکودک نیمه وقت",
        "مهدکودک شبانه‌روزی",
        "مهدکودک دو زبانه",
        "مهدکودک هوشمند",
        "مهدکودک تخصصی",
        "مهدکودک روستایی",
        "مهدکودک مذهبی",
        "مهدکودک و پیش‌دبستانی",
        "همه انواع مهدکودک",
      ],
    },
    {
  title: "فعالیت‌ها",
  items: [
    "آموزش زبان انگلیسی",
    "آموزش زبان دوم",
    "موسیقی کودک",
    "نقاشی و رنگ‌آمیزی",
    "کاردستی و خلاقیت",
    "قصه‌گویی و کتابخوانی",
    "بازی‌های فکری",
    "بازی‌های حرکتی",
    "ژیمناستیک کودک",
    "ورزش کودک",
    "آمادگی ورود به دبستان",
    "مهارت‌های اجتماعی",
    "آموزش مفاهیم علمی",
    "آشپزی کودک",
    "نمایش و تئاتر کودک",
    "همه فعالیت‌ها",
  ],
},
    {
  title: "امکانات",
  items: [
    "سرویس رفت‌وآمد",
    "وعده غذایی",
    "میان‌وعده سالم",
    "دوربین آنلاین",
    "حیاط اختصاصی",
    "فضای بازی سرپوشیده",
    "فضای بازی روباز",
    "اتاق خواب کودک",
    "سیستم تهویه مناسب",
    "سیستم گرمایش و سرمایش استاندارد",
    "مشاوره و روانشناس کودک",
    "پرستار کودک",
    "مربی و کمک‌مربی متخصص",
    "کلاس‌های مجهز",
    "سرویس بهداشتی کودک",
    "امکانات ایمنی استاندارد",
    "بیمه کودکان",
    "همه امکانات",
  ],
},
    {
      title: "نمایش همه",
      items: ["همه خدمات مهدکودک‌ها"],
    },
  ];

  const selectedSection = sections.find(
    (section) => section.title === activeSection
  );

  const goToShopFilter = (item) => {
  // 👶 رده سنی
  if (activeSection === "رده سنی") {
    if (item === "همه مهدکودک‌ها") {
      navigate("/shop?service=kindergarten");
      return;
    }

    navigate(
      `/shop?service=kindergarten&kindergartenAge=${encodeURIComponent(item)}`
    );
    return;
  }

  // 🏫 نوع مهد
  if (activeSection === "نوع مهد") {
    if (item === "همه انواع مهدکودک") {
      navigate("/shop?service=kindergarten");
      return;
    }

    navigate(
      `/shop?service=kindergarten&kindergartenType=${encodeURIComponent(item)}`
    );
    return;
  }

  // 🎨 فعالیت‌ها
  if (activeSection === "فعالیت‌ها") {
    if (item === "همه فعالیت‌ها") {
      navigate("/shop?service=kindergarten");
      return;
    }

    navigate(
      `/shop?service=kindergarten&kindergartenActivity=${encodeURIComponent(item)}`
    );
    return;
  }

  // 🏫 امکانات
  if (activeSection === "امکانات") {
    if (item === "همه امکانات") {
      navigate("/shop?service=kindergarten");
      return;
    }

    navigate(
      `/shop?service=kindergarten&kindergartenFacility=${encodeURIComponent(item)}`
    );
    return;
  }

  // 👀 نمایش همه
  if (activeSection === "نمایش همه") {
    navigate("/shop?service=kindergarten");
  }
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
                src="/images/shop/services/kindergartens.webp"
                alt="مهدکودک‌ها"
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>

            <div className="text-center sm:text-right">
              <p className="text-[11px] font-bold text-yellow-100/90">
                دسته‌بندی خدمات ژنینو
              </p>

              <h1 className="mt-2 text-xl font-black sm:text-2xl">
                مهدکودک‌ها
              </h1>

              <p className="mt-2 text-xs font-medium leading-6 text-white/85">
                بهترین مهدکودک را بر اساس سن کودک، امکانات و برنامه‌های آموزشی پیدا کنید.
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