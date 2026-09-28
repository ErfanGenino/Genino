import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function PrivateTeachers() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("دروس مدرسه");

  const sections = [
    {
  title: "دروس مدرسه",
  items: [
    "ریاضی",
    "علوم",
    "فیزیک",
    "شیمی",
    "زیست‌شناسی",
    "ادبیات فارسی",
    "نگارش",
    "عربی",
    "دین و زندگی",
    "تاریخ",
    "جغرافیا",
    "مطالعات اجتماعی",
    "فلسفه و منطق",
    "اقتصاد",
    "حسابداری",
    "آمار و احتمال",
    "آمادگی کنکور",
    "تقویتی و رفع اشکال",
    "همه دروس مدرسه",
  ],
},
{
  title: "زبان‌ها",
  items: [
    "زبان انگلیسی",
    "زبان آلمانی",
    "زبان فرانسه",
    "زبان عربی",
    "زبان ترکی استانبولی",
    "زبان اسپانیایی",
    "زبان ایتالیایی",
    "زبان روسی",
    "زبان چینی",
    "زبان کره‌ای",
    "زبان ژاپنی",
    "آیلتس",
    "تافل",
    "مکالمه زبان",
    "زبان‌ها و گویش‌های بومی ایران",
    "همه زبان‌ها",
  ],
},
{
  title: "هنر",
  items: [
    "نقاشی",
    "طراحی",
    "سیاه‌قلم",
    "خوشنویسی",
    "نگارگری",
    "موسیقی",
    "پیانو",
    "گیتار",
    "ویولن",
    "آواز",
    "بازیگری",
    "گویندگی",
    "دوبله",
    "فن بیان هنری",
    "عکاسی",
    "فیلم‌سازی",
    "همه هنرها",
  ],
},
{
  title: "ورزش",
  items: [
    "شنا",
    "فوتبال",
    "فوتسال",
    "بسکتبال",
    "والیبال",
    "تنیس",
    "پدل",
    "بدمینتون",
    "تنیس روی میز",
    "ژیمناستیک",
    "دو و میدانی",
    "شطرنج",
    "بدنسازی",
    "فیتنس",
    "یوگا",
    "پیلاتس",
    "کاراته",
    "تکواندو",
    "جودو",
    "همه ورزش‌ها",
  ],
},
{
  title: "مهارت‌های تخصصی",
  items: [
    "برنامه‌نویسی",
    "طراحی سایت",
    "ساخت اپلیکیشن",
    "طراحی بازی",
    "رباتیک",
    "هوش مصنوعی",
    "علوم داده",
    "امنیت سایبری",
    "ICDL",
    "نرم‌افزارهای اداری",
    "اکسل",
    "فتوشاپ",
    "طراحی گرافیک",
    "تولید محتوا",
    "دیجیتال مارکتینگ",
    "فن بیان",
    "مهارت‌های زندگی",
    "مدیریت زمان",
    "همه مهارت‌ها",
  ],
},
{
  title: "آزمون‌ها و مهاجرت",
  items: [
    "کنکور",
    "تیزهوشان",
    "نمونه دولتی",
    "آیلتس",
    "تافل",
    "آزمون‌های بین‌المللی",
    "آمادگی مصاحبه",
    "همه آزمون‌ها",
  ],
},
    {
      title: "نمایش همه",
      items: [
        "همه معلمان خصوصی",
      ],
    },
  ];

  const selectedSection = sections.find(
    (section) => section.title === activeSection
  );

  const goToShopFilter = (item) => {
  // نمایش همه معلمان خصوصی
  if (item === "همه معلمان خصوصی") {
    navigate("/shop?service=private-teacher");
    return;
  }

  // گزینه‌های «همه ...»
  const allItems = [
    "همه دروس مدرسه",
    "همه زبان‌ها",
    "همه هنرها",
    "همه ورزش‌ها",
    "همه مهارت‌ها",
    "همه آزمون‌ها",
  ];

  if (allItems.includes(item)) {
    navigate("/shop?service=private-teacher");
    return;
  }

  // فیلتر براساس حوزه تدریس معلم
  navigate(
    `/shop?service=private-teacher&teacherField=${encodeURIComponent(item)}`
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
                src="/images/shop/services/private-teachers.webp"
                alt="معلمان خصوصی"
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>

            <div className="text-center sm:text-right">
              <p className="text-[11px] font-bold text-yellow-100/90">
                دسته‌بندی خدمات ژنینو
              </p>

              <h1 className="mt-2 text-xl font-black sm:text-2xl">
                معلمان خصوصی
              </h1>

              <p className="mt-2 text-xs font-medium leading-6 text-white/85">
                معلم خصوصی موردنظر خود را بر اساس درس، زبان، هنر یا مهارت انتخاب کنید.
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