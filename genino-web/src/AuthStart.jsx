import { motion, AnimatePresence } from "framer-motion";
import logo from "./assets/logo-genino.png";
import { Brain, Gift, ShoppingBag, Bot, ChevronLeft, ChevronRight, Scale, Scale3D, Apple, BookCheck, Baby, DollarSign, PartyPopper, Play, LetterText, FileHeart } from "lucide-react";
import Footer from "./Footer.jsx";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbXboxY } from "react-icons/tb";
import { Smile, Flower2, UsersRound, Puzzle } from "lucide-react";
import PromoSlider from "@components/Social/PromoSlider";
import ScrollProduct from "./components/Core/ScrollProduct";
import TodayCalendarBox from "./components/Dashboard/TodayCalendarBox";
import { getConversations } from "./services/api";
import myChildBg from "./assets/outhstart-cards/mychild-bg.png";
import shopBg from "./assets/outhstart-cards/shop-bg.png";
import womenHealthBg from "./assets/outhstart-cards/women-health-bg.png";
import menHealthBg from "./assets/outhstart-cards/men-health-bg.png";
import myDoctorBg from "./assets/outhstart-cards/my-doctor-bg.png";
import calorieTrackerBg from "./assets/outhstart-cards/calorie-tracker-bg.png";
import magazineBg from "./assets/outhstart-cards/magazine-bg.png";
import socialBg from "./assets/outhstart-cards/social-bg.png";
import funBg from "./assets/outhstart-cards/fun-bg.png";
import eventsBg from "./assets/outhstart-cards/events-bg.png";
import singleWorldBg from "./assets/outhstart-cards/single-world-bg.png";
import familyFinanceBg from "./assets/outhstart-cards/family-finance-bg.png";
import AuthFeatureCircleSlider from "./components/AuthStart/AuthFeatureCircleSlider";
import myChildIcon from "./assets/authstart-icons/mychild.png";
import shopIcon from "./assets/authstart-icons/shop.png";
import womenHealthIcon from "./assets/authstart-icons/women-health.png";
import menHealthIcon from "./assets/authstart-icons/men-health.png";
import myDoctorIcon from "./assets/authstart-icons/my-doctor.png";
import calorieIcon from "./assets/authstart-icons/calorie.png";
import magazineIcon from "./assets/authstart-icons/magazine.png";
import socialIcon from "./assets/authstart-icons/social.png";
import funIcon from "./assets/authstart-icons/fun.png";
import eventsIcon from "./assets/authstart-icons/events.png";
import singleWorldIcon from "./assets/authstart-icons/single-world.png";
import familyFinanceIcon from "./assets/authstart-icons/family-finance.png";




export default function AuthStart() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const [socialUnreadCount, setSocialUnreadCount] = useState(0);
  const navigate = useNavigate();
  const [showChildChoiceModal, setShowChildChoiceModal] = useState(false);

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
  {
    title: "کودک من",
    desc: "پیگیری رشد ذهنی، عاطفی و فیزیکی کودک با ابزارهای هوشمند ژنینو.",
    link: "/mychild",
    image: myChildBg,
    icon: myChildIcon,
  },
  {
    title: "فروشگاه تخصصی",
    desc: "دسترسی به محصولات و خدمات منتخب ویژه‌ی والدین و فرزندان.",
    link: "/shop",
    image: shopBg,
    icon: shopIcon,
  },
  {
    title: "سلامت بانوان",
    desc: "پیگیری چرخه قاعدگی، شناخت بدن و دریافت پیشنهادهای آرام‌بخش روزانه",
    link: "/my-cycle",
    image: womenHealthBg,
    icon: womenHealthIcon,
  },
  {
    title: "سلامت آقایان",
    desc: "بررسی علمی وضعیت جسمی، ذهنی و هورمونی آقایان با تست‌های تخصصی و شخصی‌سازی‌شده",
    link: "/my-men-health",
    image: menHealthBg,
    icon: menHealthIcon,
  },
  {
    title: "پزشک من",
    desc: "بایگانی پرونده‌های پزشکی، نسخه‌ها و آزمایش‌های شما در ژنینو.",
    link: "/my-doctor",
    image: myDoctorBg,
    icon: myDoctorIcon,
  },
  {
    title: "کالری شمار",
    desc: "تغذیه سالم و به اندازه، ضامن سلامت شماست.",
    link: "/calorie-tracker",
    image: calorieTrackerBg,
    icon: calorieIcon,
  },
  {
    title: "مجله ژنینو",
    desc: "مرجع علمی رشد، آگاهی و والدگری مدرن — DNA طلایی ذهن شما.",
    link: "/world-knowledge",
    image: magazineBg,
    icon: magazineIcon,
  },
  {
    title: "شبکه اجتماعی ژنینو",
    desc: "در ژنینو با والدین دیگر در ارتباط باشید، تجربه‌ها را به اشتراک بگذارید و از لحظات طلایی کودکی الهام بگیرید 💬✨",
    link: "/social",
    image: socialBg,
    icon: socialIcon,
  },
  {
    title: "بازی و سرگرمی",
    desc: "کودک شما با بازی‌های آموزشی و کارتون‌های هدفمند رشد می‌کند.",
    link: "/fun",
    image: funBg,
    icon: funIcon,
  },
  {
    title: "رویدادها و جشن‌ها",
    desc: "معرفی رویدادهای آموزشی و تفریحی ویژه‌ی کودکان در شهر شما",
    link: "/events",
    image: eventsBg,
    icon: eventsIcon,
  },
  {
    title: "جهان مجردها",
    desc: "ویژه افراد مجرد — محتوای آموزشی، سرگرمی و رشد فردی در ژنینو.",
    link: "/single-world",
    image: singleWorldBg,
    icon: singleWorldIcon,
  },
  {
    title: "اقتصاد و حسابداری خانواده",
    desc: "ژنینو دستیاری هوشمند و همراهی مطمئن برای ارتقاع سطح مالی خانواده",
    link: "/family-finance",
    image: familyFinanceBg,
    icon: familyFinanceIcon,
  },
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

// شمارش پیام های خوانده نشده بر روی کارت شبکه اجتماعی
useEffect(() => {
  let isMounted = true;

  const loadUnreadCount = async () => {
    const token = localStorage.getItem("genino_token");

    if (!token) {
      if (isMounted) setSocialUnreadCount(0);
      return;
    }

    const res = await getConversations();

    if (!isMounted) return;

    if (!res?.ok) {
      setSocialUnreadCount(0);
      return;
    }

    const totalUnread = (res.items || []).reduce((sum, item) => {
      return sum + (Number(item.unreadCount) || 0);
    }, 0);

    setSocialUnreadCount(totalUnread);
  };

  loadUnreadCount();

  const intervalId = setInterval(() => {
    loadUnreadCount();
  }, 5000);

  const handleTokenChange = () => {
    loadUnreadCount();
  };

  window.addEventListener("genino_token_changed", handleTokenChange);

  return () => {
    isMounted = false;
    clearInterval(intervalId);
    window.removeEventListener("genino_token_changed", handleTokenChange);
  };
}, []);


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

<AuthFeatureCircleSlider items={features} />

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
        <Link
  key={`f0-${i}`}
  to={item.title === "کودک من" ? "#" : item.link || "#"}
  onClick={(e) => {
    if (item.title === "کودک من") {
      e.preventDefault();
      setShowChildChoiceModal(true);
    }
  }}
  className="group"
>
          {/* کارت خودت (بدون تغییر) */}
          <motion.div
  whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(212,175,55,0.4)" }}
  transition={{ type: "spring", stiffness: 200, damping: 15 }}
  className="flex flex-col justify-between bg-[#fff8e6]/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-md border-2 border-[#d4af37] h-[360px] cursor-pointer hover:shadow-lg"
>
  {/* عکس کارت */}
  <div className="h-56 overflow-hidden flex-shrink-0">
    <img
      src={item.image || logo}
      alt={item.title}
      className="w-full h-full object-contain sm:object-cover bg-[#fff8e6] hover:scale-105 transition-transform duration-500"
    />
  </div>

  {/* متن کارت */}
  <div className="p-4 text-center flex-grow flex flex-col items-center justify-center">
    <h3 className="text-base font-extrabold text-yellow-700 mb-2 leading-snug">
      {item.title}
    </h3>

    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
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
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(212,175,55,0.4)" }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative flex flex-col justify-between bg-[#fff8e6]/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-md border-2 border-[#d4af37] h-[360px] cursor-pointer hover:shadow-lg"
    >
      {item.title === "شبکه اجتماعی ژنینو" && socialUnreadCount > 0 && (
        <div className="absolute top-3 left-3 z-20">
          <span className="min-w-[28px] h-[28px] px-2 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center shadow-md">
            {socialUnreadCount > 99 ? "99+" : socialUnreadCount}
          </span>
        </div>
      )}

      <div className="h-56 overflow-hidden flex-shrink-0">
        <img
          src={item.image || logo}
          alt={item.title}
          className="w-full h-full object-contain sm:object-cover bg-[#fff8e6] hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4 text-center flex-grow flex flex-col items-center justify-center">
        <h3 className="text-base font-extrabold text-yellow-700 mb-2 leading-snug">
          {item.title}
        </h3>

        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
          {item.desc}
        </p>
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
      whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(212,175,55,0.4)" }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="flex flex-col justify-between bg-[#fff8e6]/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-md border-2 border-[#d4af37] h-[360px] cursor-pointer hover:shadow-lg"
    >
      <div className="h-56 overflow-hidden flex-shrink-0">
        <img
          src={item.image || logo}
          alt={item.title}
          className="w-full h-full object-contain sm:object-cover bg-[#fff8e6] hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4 text-center flex-grow flex flex-col items-center justify-center">
        <h3 className="text-base font-extrabold text-yellow-700 mb-2 leading-snug">
          {item.title}
        </h3>

        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
          {item.desc}
        </p>
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


<AnimatePresence>
  {showChildChoiceModal && (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowChildChoiceModal(false)}
    >
      <motion.div
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-yellow-200 text-center"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Baby className="w-12 h-12 text-yellow-600 mx-auto mb-3" />

        <h3 className="text-lg font-extrabold text-yellow-800 mb-2">
          کدام مسیر را انتخاب می‌کنید؟
        </h3>

        <p className="text-sm text-gray-500 mb-5">
          لطفاً انتخاب کنید وارد بخش کودک من شوید یا دنیای کودکان.
        </p>

        <div className="grid grid-cols-1 gap-3">
          <button
            type="button"
            onClick={() => {
              setShowChildChoiceModal(false);
              navigate("/mychild");
            }}
            className="w-full rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-400 text-white py-3 font-bold shadow-md"
          >
            کودک من
          </button>

          <button
            type="button"
            onClick={() => {
              setShowChildChoiceModal(false);
              navigate("/children-world");
            }}
            className="w-full rounded-2xl border border-yellow-300 bg-yellow-50 text-yellow-800 py-3 font-bold"
          >
            دنیای کودکان
          </button>

          <button
            type="button"
            onClick={() => setShowChildChoiceModal(false)}
            className="w-full rounded-2xl text-gray-400 py-2 text-sm"
          >
            انصراف
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

            <Footer className="relative z-[2]" />
    </main>
  );
}
