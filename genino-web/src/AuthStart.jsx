import { motion, AnimatePresence } from "framer-motion";
import logo from "./assets/logo-genino.png";
import { Brain, Gift, ShoppingBag, Bot, ChevronLeft, ChevronRight, Scale, Scale3D, Apple, BookCheck, Baby, DollarSign, PartyPopper, Play, LetterText, FileHeart } from "lucide-react";
import Footer from "./Footer.jsx";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { TbXboxY } from "react-icons/tb";
import { Smile, Flower2, UsersRound, Puzzle } from "lucide-react";
import PromoSlider from "@components/Social/PromoSlider";
import ScrollProduct from "./components/Core/ScrollProduct";
import TodayCalendarBox from "./components/Dashboard/TodayCalendarBox";




export default function AuthStart() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const features = [
  { icon: <Baby className="w-8 h-8 text-yellow-500 mb-3" />, title: "کودک من", desc: "پیگیری رشد ذهنی، عاطفی و فیزیکی کودک با ابزارهای هوشمند ژنینو.", link: "/mychild" },
  { icon: <ShoppingBag className="w-8 h-8 text-yellow-500 mb-3" />, title: "فروشگاه تخصصی", desc: "دسترسی به محصولات و خدمات منتخب ویژه‌ی والدین و فرزندان.", link: "/shop" },
  {
  icon: (
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-pink-400 via-pink-300 to-pink-200 shadow-md mb-3">
      <Flower2 className="w-6 h-6 text-white" />
    </div>
  ),
  title: "سلامت بانوان",
  desc: "پیگیری چرخه قاعدگی، شناخت بدن و دریافت پیشنهادهای آرام‌بخش روزانه",
  link: "/my-cycle",
  color: "pink",
},
{
  icon: (
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-400 via-blue-300 to-blue-200 shadow-md mb-3">
      <Flower2 className="w-6 h-6 text-white" />
    </div>
  ),
  title: "سلامت آقایان",
  desc: "بررسی علمی وضعیت جسمی، ذهنی و هورمونی آقایان با تست‌های تخصصی و شخصی‌سازی‌شده",
  link: "/my-men-health",
  color: "blue",
},
{
  icon: (
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-yellow-300 via-yellow-200 to-emerald-100 shadow-md mb-3">
      <FileHeart className="w-7 h-7 text-yellow-700" />
    </div>
  ),
  title: "پزشک من",
  desc: "بایگانی پرونده‌های پزشکی، نسخه‌ها و آزمایش‌های شما در ژنینو.",
  link: "/my-doctor",
  color: "green",
},
  { icon: <Apple className="w-8 h-8 text-yellow-500 mb-3" />, title: "کالری شمار", desc: "تغذیه سالم و به اندازه، ضامن سلامت شماست.", link: "/calorie-tracker",color: "pink",},  
  {
  specialMagazineCard: true,
  icon: (
    <div className="relative w-14 h-14 flex items-center justify-center mb-3">
      {/* 🔥 حلقه طلایی چرخان */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-yellow-400"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ boxShadow: "0 0 12px rgba(212,175,55,0.35)" }}
      />

      {/* 🌟 قرص مرکزی */}
      <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-200 flex items-center justify-center shadow-md">
        <BookCheck className="w-7 h-7 text-white drop-shadow" />
      </div>
    </div>
  ),
  title: "مجله ژنینو",
  desc: "مرجع علمی رشد، آگاهی و والدگری مدرن — DNA طلایی ذهن شما.",
  link: "/world-knowledge",
  color: "yellow",
},

  {
    icon: <UsersRound className="w-8 h-8 text-yellow-500 mb-3" />,
    title: "شبکه اجتماعی ژنینو",
    desc: "در ژنینو با والدین دیگر در ارتباط باشید، تجربه‌ها را به اشتراک بگذارید و از لحظات طلایی کودکی الهام بگیرید 💬✨",
    link: "/social",
    color: "blue",
  },
  { icon: <Puzzle className="w-8 h-8 text-yellow-500 mb-3" />, title: "بازی و سرگرمی", desc: "کودک شما با بازی‌های آموزشی و کارتون‌های هدفمند رشد می‌کند.", link: "/fun", color: "pink", },
  { icon: <PartyPopper className="w-8 h-8 text-yellow-500 mb-3" />, title: "رویدادها و جشن‌ها", desc: "معرفی رویدادهای آموزشی و تفریحی ویژه‌ی کودکان در شهر شما", link: "/events", color: "green", },
{
  icon: (
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-yellow-300 to-yellow-200 shadow-md mb-3">
      <Smile className="w-6 h-6 text-yellow-700" />
    </div>
  ),
  title: "جهان مجردها",
  desc: "ویژه افراد مجرد — محتوای آموزشی، سرگرمی و رشد فردی در ژنینو.", link: "/single-world", color: "yellow",
},
{ icon: <DollarSign className="w-8 h-8 text-yellow-500 mb-3" />, title: "اقتصاد و حسابداری خانواده", desc: "ژنینو دستیاری هوشمند و همراهی مطمئن برای ارتقاع سطح مالی خانواده", link: "/family-finance" },
  
];

// ✅ تقسیم کارت‌ها به دسته‌های ۴تایی
const chunk = (arr, size) => {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

const featuresChunks = chunk(features, 4);

// 🛍️ اسلایدر ۱: سیسمونی تخصصی ژنینو
const babyStarterProducts = Array.from({ length: 20 }).map((_, i) => ({
  id: `baby-${i + 1}`,
  name: `سیسمونی تخصصی ${i + 1}`,
  price: `${(Math.floor(Math.random() * 300) + 100) * 1000} تومان`,
  image: logo,
  category: ["کالسکه", "لباس نوزاد", "بهداشت کودک", "اتاق کودک"][i % 4],
}));

// 🧩 اسلایدر ۲: خدمات برگزیده ژنینو (ارائه‌دهنده خدمات)
const featuredServices = Array.from({ length: 20 }).map((_, i) => ({
  id: `svc-${i + 1}`,
  name:
    ["کلاس موسیقی کودک", "کلاس ورزشی کودک", "مهد کودک", "مدرسه"][i % 4] +
    ` ${i + 1}`,
  price: ["رزرو آنلاین", "مشاهده جزئیات", "شروع از ۱٫۲ میلیون", "ثبت‌نام/استعلام"][i % 4],
  image: logo,
  category: ["آموزشی", "ورزشی", "مراقبتی", "مدرسه"][i % 4],
}));


  const [highlight, setHighlight] = useState(false);

useEffect(() => {
  const interval = setInterval(() => {
    setHighlight(true);
    setTimeout(() => setHighlight(false), 2000); // طول زمان درخشش
  }, 5000); // هر ۷ ثانیه یک‌بار تکرار شود
  return () => clearInterval(interval);
}, []);
const [pulse, setPulse] = useState(false);

useEffect(() => {
  const interval = setInterval(() => {
    setPulse(true);
    setTimeout(() => setPulse(false), 1500); // مدت پالس ۱.۵ ثانیه
  }, 6000); // هر ۶ ثانیه یک‌بار
  return () => clearInterval(interval);
}, []);

const cardColors = {
  default: "bg-[#f8fafc] border-[#e2e8f0] text-gray-700", // خاکستری آبی روشن
  blue: "bg-[#e0f2fe] border-[#bae6fd] text-[#075985]",   // آبی ملایم
  green: "bg-[#dcfce7] border-[#bbf7d0] text-[#166534]",  // سبز ملایم
  pink: "bg-[#ffe4e6] border-[#fecdd3] text-[#9d174d]",   // صورتی
  yellow: "bg-[#fef9c3] border-[#fef08a] text-[#92400e]", // زرد ملایم
};


  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-[#f7f2eb] to-[#fffdf8] text-gray-800 px-6 pt-6 sm:pt-10 lg:pt-12 pb-[6rem] sm:pb-0 text-center overflow-x-hidden overflow-y-auto">

      
  {/* 🔹 دکمه دریافت اپ - نسخه نهایی با انیمیشن باز و بسته طبیعی */}
<motion.div
  ref={menuRef}
  className="fixed bottom-6 left-1/2 -translate-x-1/2 sm:bottom-8 sm:left-8 sm:translate-x-0 z-50 flex flex-col items-center sm:items-start"
  onMouseEnter={() => setOpen(true)}
  onMouseLeave={() => setOpen(false)}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  {/* 🔸 دسکتاپ */}
  <div className="hidden sm:flex flex-col items-center relative">
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(212,175,55,0.4)" }}
      whileTap={{ scale: 0.97 }}
      className="items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white px-5 py-3 rounded-xl text-sm font-medium shadow-lg hover:from-yellow-600 hover:to-yellow-500 transition-all w-44"
    >
      📱 دریافت اپ ژنینو
    </motion.button>

    {/* 🔸 افکت سایه طلایی بالا */}
    <AnimatePresence>
      {open && (
        <motion.div
          key="gold-shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 -translate-y-full h-2 w-full bg-gradient-to-b from-yellow-400/30 to-transparent blur-md rounded-t-xl pointer-events-none"
        ></motion.div>
      )}
    </AnimatePresence>

    {/* 🔸 منوی بازشونده (از بالا باز و بسته می‌شود با fade) */}
    <AnimatePresence>
      {open && (
        <motion.div
          key="menu"
          initial={{ opacity: 0, y: -5, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -5, scale: 0.97 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="absolute bottom-full left-0 w-full bg-white shadow-xl rounded-t-xl border border-yellow-100 overflow-hidden text-center"
        >
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition"
          >
            📲 نسخه Android
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition"
          >
            🍎 نسخه iOS
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  </div>

  {/* 🔸 موبایل */}
<AnimatePresence>
  {!open && (
    <motion.button
      key="mobileButton"
      onClick={() => setOpen(true)}
      whileTap={{ scale: 0.98 }}
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-white py-4 text-base font-medium shadow-[0_-2px_10px_rgba(0,0,0,0.1)] hover:from-yellow-600 hover:to-yellow-500 transition-all"
    >
      📱 دریافت اپ ژنینو
    </motion.button>
  )}

  {open && (
    <>
      {/* پس‌زمینه تار */}
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="sm:hidden fixed inset-0 bg-black z-40"
        onClick={() => setOpen(false)}
      />
      {/* کارت پایین */}
      <motion.div
        key="sheet"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl p-5 pt-6 text-center"
      >
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-5" />
        <h3 className="text-gray-700 font-semibold mb-3">انتخاب نسخه اپ</h3>
        <a
          href="#"
          className="block w-full py-3 mb-3 rounded-xl border border-yellow-300 text-yellow-600 font-medium hover:bg-yellow-50 transition"
        >
          📲 نسخه Android
        </a>
        <a
          href="#"
          className="block w-full py-3 rounded-xl border border-yellow-300 text-yellow-600 font-medium hover:bg-yellow-50 transition"
        >
          🍎 نسخه iOS
        </a>
      </motion.div>
    </>
  )}
</AnimatePresence>

</motion.div>


      {/* 🔹 بک‌گراند DNA چرخان */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fffdf8] to-[#f7f3e6] overflow-hidden z-[1]">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.svg
            key={i}
            viewBox="0 0 100 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute opacity-30"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              transformOrigin: "center",
            }}
            animate={{ rotate: [0, i % 2 === 0 ? 360 : -360] }}
            transition={{
              duration: 60 + Math.random() * 40,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <defs>
              <linearGradient id={`dnaGrad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#b88a1a" />
              </linearGradient>
            </defs>
            <path d="M30,10 C50,30 50,70 30,90 C10,110 10,150 30,170" stroke={`url(#dnaGrad-${i})`} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M70,10 C50,30 50,70 70,90 C90,110 90,150 70,170" stroke={`url(#dnaGrad-${i})`} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {Array.from({ length: 6 }).map((_, j) => (
              <line key={j} x1="30" y1={20 + j * 25} x2="70" y2={30 + j * 25} stroke={`url(#dnaGrad-${i})`} strokeWidth="1.5" opacity="0.7" />
            ))}
          </motion.svg>
        ))}
      </div>

<TodayCalendarBox className="mt-2 sm:mt-3 lg:mt-4" />

<motion.div
  className="relative w-full max-w-4xl my-10 rounded-3xl overflow-hidden z-20"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
>
  <PromoSlider
    variant="golden"
    interval={6}

    /* 🌟 ارتفاع بزرگ‌تر */
    height="h-80 sm:h-96 md:h-[30rem]"

    className="rounded-3xl overflow-hidden shadow-[0_10px_25px_rgba(212,175,55,0.25)]"
    slides={[
      { id: 1, text: "هر کودک، یک دنیا نوآوری", sub: "ژنینو، همراه رشد و خلاقیت فرزندتان.", image: "/images/slides/authstart/1.jpg" },
      { id: 2, text: "سلامت بانوان", sub: "با تحلیل داده‌ها و پیشنهادهای تخصصی.", image: "/images/slides/authstart/2.jpg" },
      { id: 3, text: "سلامت آقایان", sub: "همراه شما برای ساخت آینده‌ای سالم.", image: "/images/slides/authstart/3.jpg" },
      { id: 4, text: "پزشک من", sub: "بایگانی پرونده‌های پزشکی شما در ژنینو.", image: "/images/slides/authstart/4.jpg" },
      { id: 5, text: "فروشگاه تخصصی", sub: "خرید آسان و تخصصی کالاها و خدمات مورد نیاز شما.", image: "/images/slides/authstart/5.jpg" },
    ]}
  />
</motion.div>


{/* 🛍️ آخرین محصولات فروشگاه ژنینو */}
<ScrollProduct
  title=" آخرین محصولات فروشگاه ژنینو"
  color="yellow"
  items={Array.from({ length: 25 }).map((_, i) => ({
    id: i + 1,
    name: `محصول جدید ${i + 1}`,
    price: `${(Math.floor(Math.random() * 300) + 100) * 1000} تومان`,
    image: logo,
    category: ["آموزشی", "خلاقیت", "ورزشی", "تفریحی"][i % 4],
  }))}
/>


{/* ✅ کارت‌ها ۴تایی + اسلایدر زیر هر ۴ کارت */}
{/* 1) کارت‌ها داخل max-w */}
<div className="w-full mt-4 z-20">

  {/* 🔸 بلاک اول: ۴ کارت اول */}
  <div className="w-full max-w-6xl mx-auto">
    <motion.section
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, duration: 0.35 } },
      }}
    >
      {featuresChunks?.[0]?.map((item, i) => (
        <Link key={`f0-${i}`} to={item.link || "#"} className="group">
          {/* کارت خودت (بدون تغییر) */}
          <motion.div
            whileHover={{ scale: 1.05, y: -4, boxShadow: "0 0 20px rgba(212,175,55,0.32)" }}
            animate={
              item.title === "فروشگاه تخصصی" && highlight
                ? { scale: [1, 1.08, 1], rotate: [0, -3, 0] }
                : item.title === "کودک من" && pulse
                ? { scale: [1, 1.03, 1] }
                : {}
            }
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`
              relative p-4 rounded-2xl border 
              h-full min-h-[170px] lg:min-h-[190px]
              flex flex-col justify-between cursor-pointer
              transition-all duration-300

              ${item.specialMagazineCard ? "bg-[#fff9d9] border-yellow-300 shadow-lg" : ""}

              ${
                item.title === "کودک من"
                  ? "bg-gradient-to-br from-yellow-300 to-yellow-100 border-yellow-400 shadow-xl"
                  : item.title === "فروشگاه تخصصی"
                  ? "bg-gradient-to-br from-yellow-100 via-yellow-50 to-white border-yellow-200 shadow-md"
                  : item.title === "اقتصاد و حسابداری خانواده"
                  ? "bg-gradient-to-br from-[#fff8e1] via-[#f4f9ef] to-[#ffffff] border-[#d4af37] text-[#8c7729] shadow-[0_0_12px_rgba(212,175,55,0.15)]"
                  : cardColors[item.color] || cardColors.default
              }
            `}
          >
            <div className="flex flex-col items-center relative z-10">
              {item.title === "کودک من" ? (
                <Baby className="w-10 h-10 text-yellow-700 mb-3 drop-shadow-md" />
              ) : (
                item.icon
              )}

              <h3
                className={`${
                  item.title === "کودک من"
                    ? "text-lg font-extrabold text-yellow-800"
                    : "text-base font-semibold text-gray-700"
                } mb-1`}
              >
                {item.title}
              </h3>

              <p
                className={`${
                  item.title === "کودک من" ? "text-gray-700" : "text-gray-500"
                } text-sm leading-relaxed`}
              >
                {item.desc}
              </p>
            </div>
          </motion.div>
        </Link>
      ))}
    </motion.section>
  </div>

  {/* ✅ اسلایدر ۱: مثل اسکرول اول/آخر (مستقیم زیر main) */}
  <ScrollProduct title="سیسمونی تخصصی ژنینو" color="yellow" items={babyStarterProducts} />

  {/* 🔸 بلاک دوم: ۴ کارت دوم */}
  <div className="w-full max-w-6xl mx-auto">
    <motion.section
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mt-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, duration: 0.35 } },
      }}
    >
      {featuresChunks?.[1]?.map((item, i) => (
        <Link key={`f1-${i}`} to={item.link || "#"} className="group">
          {/* کارت خودت (همون قبلی) */}
          <motion.div
            whileHover={{ scale: 1.05, y: -4, boxShadow: "0 0 20px rgba(212,175,55,0.32)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`
              relative p-4 rounded-2xl border 
              h-full min-h-[170px] lg:min-h-[190px]
              flex flex-col justify-between cursor-pointer
              transition-all duration-300
              ${cardColors[item.color] || cardColors.default}
            `}
          >
            <div className="flex flex-col items-center relative z-10">
              {item.icon}
              <h3 className="text-base font-semibold text-gray-700 mb-1">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        </Link>
      ))}
    </motion.section>
  </div>

  {/* ✅ اسلایدر ۲: مثل اسکرول اول/آخر */}
  <ScrollProduct title="خدمات برگزیده ژنینو" color="blue" items={featuredServices} />

  {/* 🔸 باقی کارت‌ها */}
  <div className="w-full max-w-6xl mx-auto">
    <motion.section
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mt-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, duration: 0.35 } },
      }}
    >
      {featuresChunks?.slice(2).flat().map((item, i) => (
        <Link key={`rest-${i}`} to={item.link || "#"} className="group">
          <motion.div
            whileHover={{ scale: 1.05, y: -4, boxShadow: "0 0 20px rgba(212,175,55,0.32)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`${cardColors[item.color] || cardColors.default} relative p-4 rounded-2xl border h-full min-h-[170px] lg:min-h-[190px] flex flex-col justify-between`}
          >
            <div className="flex flex-col items-center relative z-10">
              {item.icon}
              <h3 className="text-base font-semibold text-gray-700 mb-1">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        </Link>
      ))}
    </motion.section>
  </div>

</div>



      {/* 🔥 محصولات تخفیف‌خورده */}

  <ScrollProduct
    title=" محصولات تخفیف‌خورده"
    color="amber"
    items={Array.from({ length: 25 }).map((_, i) => ({
    id: i + 1,
    name: `محصول جدید ${i + 1}`,
    price: `${(Math.floor(Math.random() * 300) + 100) * 1000} تومان`,
    image: logo,
    category: ["آموزشی", "خلاقیت", "ورزشی", "تفریحی"][i % 4],
  }))}
/>



            <Footer className="relative z-[2]" />
    </main>
  );
}
