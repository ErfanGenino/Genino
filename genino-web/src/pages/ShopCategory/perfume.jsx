import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Perfume() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("عطر مردانه");

  const sections = [
    {
title: "عطر مردانه",
items: [

"ادکلن مردانه",
"عطر مردانه",
"ادوپرفیوم مردانه",
"ادوتویلت مردانه",
"ادوکلن مردانه",

"عطر مردانه روزانه",
"عطر مردانه رسمی",
"عطر مردانه مجلسی",
"عطر مردانه لوکس",

"عطر مردانه اسپرت",
"عطر مردانه جوان پسند",
"عطر مردانه کلاسیک",

"عطر مردانه خنک",
"عطر مردانه گرم",
"عطر مردانه معتدل",

"عطر مردانه تلخ",
"عطر مردانه شیرین",
"عطر مردانه تند",

"عطر مردانه چوبی",
"عطر مردانه مرکباتی",
"عطر مردانه شرقی",
"عطر مردانه دریایی",
"عطر مردانه آروماتیک",

"عطر مردانه بهاری",
"عطر مردانه تابستانی",
"عطر مردانه پاییزی",
"عطر مردانه زمستانی",

"عطر جیبی مردانه",
"عطر سفری مردانه",

"ست هدیه عطر مردانه",
"باکس هدیه مردانه",

"دکانت عطر مردانه",
"سمپل عطر مردانه",

"همه عطرهای مردانه"

]
},
    {
title: "عطر زنانه",
items: [

"ادکلن زنانه",
"عطر زنانه",
"ادوپرفیوم زنانه",
"ادوتویلت زنانه",
"ادوکلن زنانه",

"عطر زنانه روزانه",
"عطر زنانه رسمی",
"عطر زنانه مجلسی",
"عطر زنانه لوکس",

"عطر زنانه دخترانه",
"عطر زنانه جوان پسند",
"عطر زنانه کلاسیک",

"عطر زنانه خنک",
"عطر زنانه گرم",
"عطر زنانه معتدل",

"عطر زنانه شیرین",
"عطر زنانه تلخ",
"عطر زنانه تند",

"عطر زنانه گلی",
"عطر زنانه میوه‌ای",
"عطر زنانه وانیلی",
"عطر زنانه شرقی",
"عطر زنانه چوبی",
"عطر زنانه مرکباتی",
"عطر زنانه دریایی",

"عطر زنانه بهاری",
"عطر زنانه تابستانی",
"عطر زنانه پاییزی",
"عطر زنانه زمستانی",

"عطر جیبی زنانه",
"عطر سفری زنانه",

"بادی میست زنانه",
"مه خوشبو کننده بدن",

"ست هدیه عطر زنانه",
"باکس هدیه زنانه",

"دکانت عطر زنانه",
"سمپل عطر زنانه",

"همه عطرهای زنانه"

]
},
    {
title: "عطر کودک و نوجوان",
items: [

"عطر کودک",
"ادکلن کودک",
"عطر نوزاد",

"عطر پسرانه",
"عطر دخترانه",

"عطر نوجوان پسر",
"عطر نوجوان دختر",

"عطر ملایم کودک",
"عطر بدون الکل کودک",
"عطر ضد حساسیت کودک",

"عطر خنک کودک",
"عطر شیرین کودک",
"عطر میوه‌ای کودک",

"عطر فانتزی کودک",
"عطر شخصیت کارتونی",

"بادی میست کودک",
"بادی اسپلش کودک",

"اسپری خوشبو کننده کودک",
"اسپری بدن کودک",

"ست هدیه کودک",
"ست هدیه نوجوان",

"عطر جیبی کودک",
"عطر جیبی نوجوان",

"عطر روزانه کودک",
"عطر روزانه نوجوان",

"عطر مدرسه",
"عطر مهمانی",

"باکس هدیه کودک",
"باکس هدیه نوجوان",

"همه عطرهای کودک و نوجوان"

]
},
    {
title: "بادی اسپلش و اسپری",
items: [

"بادی اسپلش زنانه",
"بادی اسپلش مردانه",
"بادی اسپلش دخترانه",
"بادی اسپلش پسرانه",

"اسپری بدن زنانه",
"اسپری بدن مردانه",
"اسپری بدن دخترانه",
"اسپری بدن پسرانه",

"اسپری خوشبو کننده بدن",
"اسپری ضد تعریق",
"اسپری دئودورانت",

"رول ضد تعریق",
"مام رول",

"بادی میست زنانه",
"بادی میست مردانه",
"بادی میست کودک",

"خوشبو کننده مو",
"میست مو",

"اسپری خوشبو کننده لباس",
"خوشبو کننده پارچه",

"اسپری خوشبو کننده کفش",
"خوشبو کننده کمد لباس",

"بادی اسپلش خنک",
"بادی اسپلش گرم",
"بادی اسپلش شیرین",

"اسپری روزانه",
"اسپری ورزشی",

"ست بادی اسپلش",
"ست اسپری بدن",
"ست خوشبو کننده بدن",

"همه بادی اسپلش‌ها و اسپری‌ها"

]
},
    {
title: "ست هدیه عطر",

items: [

"ست هدیه عطر مردانه",
"ست هدیه عطر زنانه",
"ست هدیه عطر کودک",
"ست هدیه عطر نوجوان",

"ست هدیه عطر زوج",
"ست هدیه عطر خانواده",

"باکس هدیه مردانه",
"باکس هدیه زنانه",

"ست عطر و اسپری",
"ست عطر و بادی اسپلش",
"ست عطر و دئودورانت",

"ست عطر و لوسیون بدن",
"ست عطر و شامپو بدن",

"ست خوشبو کننده بدن",
"ست مراقبت شخصی خوشبو",

"عطر جیبی هدیه",
"پک عطر جیبی",

"دکانت عطر",
"پک سمپل عطر",

"جعبه هدیه عطر",
"باکس لوکس عطر",
"بسته بندی هدیه عطر",

"جعبه نگهداری عطر",
"استند عطر",

"اتومایزر عطر",
"ظرف شارژ عطر جیبی",

"لوازم جانبی عطر",
"لوازم نگهداری عطر",

"هدیه روز مرد",
"هدیه روز زن",
"هدیه تولد",
"هدیه سالگرد",

"همه ست‌های هدیه عطر"


]
},
    {
      title: "نمایش همه",
      items: ["همه عطرها و ادکلن‌ها"],
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
                src="/images/shop/categories/perfume.webp"
                alt="عطر و ادکلن"
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>

            <div className="text-center sm:text-right">
              <p className="text-[11px] font-bold text-yellow-100/90">
                دسته‌بندی کالاهای ژنینو
              </p>

              <h1 className="mt-2 text-xl font-black sm:text-2xl">
                عطر و ادکلن
              </h1>

              <p className="mt-2 text-xs font-medium leading-6 text-white/85">
                رایحه موردنظر خود را انتخاب کنید تا فروشگاه ژنینو محصولات مرتبط را نمایش دهد.
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