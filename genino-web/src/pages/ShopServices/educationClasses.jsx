import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function EducationClasses() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("زبان");

  const sections = [
    {
  title: "زبان‌های خارجی",
  items: [
    "زبان انگلیسی",
    "زبان آلمانی",
    "زبان فرانسه",
    "زبان ترکی استانبولی",
    "زبان عربی",
    "زبان اسپانیایی",
    "زبان ایتالیایی",
    "زبان روسی",
    "زبان چینی",
    "زبان کره‌ای",
    "زبان ژاپنی",
    "مکالمه زبان",
    "آمادگی آزمون آیلتس",
    "آمادگی آزمون تافل",
    "همه کلاس‌های زبان",
  ],
},
{
  title: "زبان‌ها و گویش‌های ایرانی",
  items: [
    "زبان کردی",
    "زبان لری",
    "زبان ترکی آذری",
    "زبان گیلکی",
    "زبان مازندرانی",
    "زبان بلوچی",
    "زبان عربی خوزستان",
    "زبان تالشی",
    "زبان ترکمنی",
    "زبان بختیاری",
    "زبان قشقایی",
    "همه زبان‌ها و گویش‌های ایرانی",
  ],
},
    {
  title: "فناوری",
  items: [
    "برنامه‌نویسی کودکان",
    "برنامه‌نویسی نوجوانان",
    "طراحی بازی",
    "ساخت اپلیکیشن",
    "طراحی سایت",
    "رباتیک",
    "هوش مصنوعی",
    "الکترونیک کودک",
    "ساخت اختراع و پروژه",
    "چاپ سه‌بعدی",
    "طراحی گرافیک",
    "انیمیشن‌سازی",
    "تولید محتوا",
    "کامپیوتر کودک",
    "مهارت‌های ICDL",
    "نرم‌افزارهای اداری",
    "امنیت سایبری",
    "علوم داده",
    "اینترنت و سواد دیجیتال",
    "همه کلاس‌های فناوری",
  ],
},
    {
  title: "مهارت‌های فردی",
  items: [
    "فن بیان و سخنوری",
    "اعتماد به نفس",
    "تمرکز و تقویت حافظه",
    "مهارت‌های زندگی",
    "خلاقیت و نوآوری",
    "هوش هیجانی",
    "مهارت‌های ارتباطی",
    "آداب معاشرت",
    "کار تیمی",
    "رهبری کودکان و نوجوانان",
    "حل مسئله",
    "تصمیم‌گیری",
    "مدیریت زمان",
    "تفکر خلاق",
    "تفکر انتقادی",
    "کنترل خشم و هیجانات",
    "خودشناسی",
    "مسئولیت‌پذیری",
    "مهارت نه گفتن",
    "آمادگی حضور در اجتماع",
    "همه مهارت‌های فردی",
  ],
},
    {
      title: "نمایش همه",
      items: ["همه کلاس‌های آموزشی"],
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
                src="/images/shop/services/education-classes.webp"
                alt="کلاس‌های آموزشی"
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>

            <div className="text-center sm:text-right">
              <p className="text-[11px] font-bold text-yellow-100/90">
                دسته‌بندی خدمات ژنینو
              </p>

              <h1 className="mt-2 text-xl font-black sm:text-2xl">
                کلاس‌های آموزشی
              </h1>

              <p className="mt-2 text-xs font-medium leading-6 text-white/85">
                کلاس موردنظر را انتخاب کنید و به بهترین مراکز آموزشی دسترسی پیدا کنید.
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