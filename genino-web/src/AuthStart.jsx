import { motion, AnimatePresence } from "framer-motion";
import logo from "./assets/logo-genino.png";
import { Brain, Gift, ShoppingBag, Bot, ChevronLeft, ChevronRight, Scale, Scale3D, Apple, BookCheck, Baby, DollarSign, PartyPopper, Play, LetterText, FileHeart } from "lucide-react";
import Footer from "./Footer.jsx";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbXboxY } from "react-icons/tb";
import { Smile, Flower2, UsersRound, Puzzle, Sparkles, HeartHandshake, Mail, Phone, UserRound, X, Send } from "lucide-react";
import PromoSlider from "@components/Social/PromoSlider";
import ScrollProduct from "./components/Core/ScrollProduct";
import TodayCalendarBox from "./components/Dashboard/TodayCalendarBox";
import { getConversations } from "./services/api";
import shopBg from "./assets/optimized/outhstart-cards/shop-bg.webp";
import womenHealthBg from "./assets/optimized/outhstart-cards/women-health-bg.webp";
import menHealthBg from "./assets/optimized/outhstart-cards/men-health-bg.webp";
import myDoctorBg from "./assets/optimized/outhstart-cards/my-doctor-bg.webp";
import calorieTrackerBg from "./assets/optimized/outhstart-cards/calorie-tracker-bg.webp";
import magazineBg from "./assets/optimized/outhstart-cards/magazine-bg.webp";
import socialBg from "./assets/optimized/outhstart-cards/social-bg.webp";
import funBg from "./assets/optimized/outhstart-cards/fun-bg.webp";
import eventsBg from "./assets/optimized/outhstart-cards/events-bg.webp";
import singleWorldBg from "./assets/optimized/outhstart-cards/single-world-bg.webp";
import familyFinanceBg from "./assets/optimized/outhstart-cards/family-finance-bg.webp";
import myChildBg from "./assets/optimized/outhstart-cards/mychild-bg.webp";
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
  const [showAppModal, setShowAppModal] = useState(false);
  const [showLifeCompanionModal, setShowLifeCompanionModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitePhone, setInvitePhone] = useState("");
  const [inviteUsername, setInviteUsername] = useState("");
  const [isSendingLifeInvite, setIsSendingLifeInvite] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:80/api";

  const features = [
  {
    title: "کودک من و کودکان ژنینویی",
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


const CrystalDust = () => {
  const particles = [
    { top: "18%", left: "12%", size: 1.5 },
    { top: "28%", left: "28%", size: 1 },
    { top: "20%", left: "48%", size: 1.2 },
    { top: "34%", left: "70%", size: 1.4 },
    { top: "52%", left: "18%", size: 1 },
    { top: "62%", left: "38%", size: 1.3 },
    { top: "55%", left: "58%", size: 1 },
    { top: "72%", left: "78%", size: 1.5 },
    { top: "42%", left: "88%", size: 1 },
    { top: "78%", left: "52%", size: 1.2 },
  ];

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      animate={{ opacity: [0.35, 0.9, 0.35] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            boxShadow:
              "0 0 5px rgba(255,255,255,0.95), 0 0 12px rgba(255,232,150,0.75)",
          }}
        />
      ))}
    </motion.div>
  );
};

const handleOpenLifeCompanion = async () => {
  try {
    const token = localStorage.getItem("genino_token");

    const res = await fetch(`${API_BASE_URL}/life-companion/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data?.hasCompanion) {
      navigate("/life-companion");
      return;
    }

    setShowLifeCompanionModal(true);
  } catch (err) {
    console.error(err);
    setShowLifeCompanionModal(true);
  }
};


const resetLifeInviteForm = () => {
  setInviteEmail("");
  setInvitePhone("");
  setInviteUsername("");
};

const closeLifeCompanionModal = () => {
  setShowLifeCompanionModal(false);
  resetLifeInviteForm();
};

const handleSendInvite = async () => {
  try {
    const value =
      inviteUsername.trim() ||
      inviteEmail.trim() ||
      invitePhone.trim();

    if (!value) {
      alert("نام کاربری، ایمیل یا شماره موبایل را وارد کنید");
      return;
    }

    setIsSendingLifeInvite(true);

    const token = localStorage.getItem("genino_token");

    const res = await fetch(`${API_BASE_URL}/life-companion/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ value }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "ارسال دعوت انجام نشد");
      return;
    }

    alert("دعوت همراه زندگی ارسال شد");

    closeLifeCompanionModal();
    navigate("/life-companion");
  } catch (err) {
    console.error(err);
    alert("خطا در ارتباط با سرور");
  } finally {
    setIsSendingLifeInvite(false);
  }
};


  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-[#f7f2eb] to-[#fffdf8] text-gray-800 px-6 pt-3 sm:pt-6 lg:pt-8 pb-[6rem] sm:pb-0 text-center overflow-x-hidden overflow-y-auto">

      
  {/* 🔹 دکمه دریافت اپ */}
<motion.div
  className="
fixed bottom-0 left-0 right-0
sm:bottom-8 sm:left-8 sm:right-auto
sm:translate-x-0
z-50
flex justify-center sm:justify-start
"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  <button
    type="button"
    onClick={() => setShowAppModal(true)}
    className="
w-full sm:w-52
rounded-none sm:rounded-xl
bg-gradient-to-r from-yellow-500 to-yellow-400
text-white
px-5 py-4
text-sm font-bold
shadow-2xl
hover:shadow-xl hover:scale-105 active:scale-95
transition-all
"
  >
    📱 دریافت اپ ژنینو
  </button>
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

<TodayCalendarBox className="mt-0" />

<div className="w-full mt-1 z-20">
  <AuthFeatureCircleSlider items={features} />
</div>

<motion.div
  className="relative z-20 w-full flex justify-center mt-2 mb-1 px-4"
  initial={{ opacity: 0, y: 14 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
>
  <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-xl">
  <motion.button
    type="button"
    onClick={() => navigate("/mychild")}
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.97 }}
    className="group relative overflow-hidden rounded-3xl whitespace-nowrap whitespace-nowrap bg-gradient-to-r from-[#f6c343] via-[#d4af37] to-[#b8860b] px-3 sm:px-5 py-3 shadow-[0_12px_30px_rgba(212,175,55,0.35)] border border-yellow-200 text-white font-extrabold"
  >
    <CrystalDust />
    <span className="relative flex items-center justify-center gap-2 text-[11px] sm:text-sm">
      <Baby className="w-4 h-4 sm:w-5 sm:h-5" />
      کودک من
    </span>
  </motion.button>

  <motion.button
    type="button"
    onClick={() => navigate("/genino-children")}
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.97 }}
    className="group relative overflow-hidden rounded-3xl whitespace-nowrap whitespace-nowrap bg-gradient-to-r from-[#f6c343] via-[#d4af37] to-[#b8860b] px-3 sm:px-5 py-3 shadow-[0_12px_30px_rgba(212,175,55,0.35)] border border-yellow-200 text-white font-extrabold"
  >
    <CrystalDust /> 
    <span className="relative flex items-center justify-center gap-2 text-[11px] sm:text-sm">
      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
      کودکان ژنینویی
    </span>
  </motion.button>

  <motion.button
  type="button"
  onClick={handleOpenLifeCompanion}
  whileHover={{ scale: 1.04 }}
  whileTap={{ scale: 0.97 }}
  className="group relative overflow-hidden rounded-3xl whitespace-nowrap bg-gradient-to-r from-[#f6c343] via-[#d4af37] to-[#b8860b] px-3 sm:px-5 py-3 shadow-[0_12px_30px_rgba(212,175,55,0.35)] border border-yellow-200 text-white font-extrabold"
>
  <CrystalDust />

  <span className="relative flex items-center justify-center gap-2 text-[11px] sm:text-sm">
    <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5" />
    همراه زندگی
  </span>
</motion.button>

</div>
</motion.div>

<motion.div
  className="relative w-full max-w-4xl mt-2 mb-4 sm:mt-4 sm:mb-8 rounded-3xl overflow-hidden z-20"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
>
  <PromoSlider
    variant="golden"
    interval={6}

    /* 🌟 ارتفاع بزرگ‌تر */
    height="h-56 sm:h-80 md:h-[30rem]"

    className="rounded-3xl overflow-hidden shadow-[0_10px_25px_rgba(212,175,55,0.25)]"
    slides={[
  { id: 1, text: "", sub: "", image: "/images/slides/authstart/1.jpg" },
  { id: 2, text: "", sub: "", image: "/images/slides/authstart/2.jpg" },
  { id: 3, text: "", sub: "", image: "/images/slides/authstart/3.jpg" },
  { id: 4, text: "", sub: "", image: "/images/slides/authstart/4.jpg" },
  { id: 5, text: "", sub: "", image: "/images/slides/authstart/5.jpg" },
  { id: 6, text: "", sub: "", image: "/images/slides/authstart/6.jpg" },
  { id: 7, text: "", sub: "", image: "/images/slides/authstart/7.jpg" },
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
  to={item.title === "کودک من و کودکان ژنینویی" ? "#" : item.link || "#"}
  onClick={(e) => {
    if (item.title === "کودک من و کودکان ژنینویی") {
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
         یکی از مسیرهای زیر را انتخاب کنید. 
        </p>

        <div className="grid grid-cols-1 gap-3">

  <button
    type="button"
    onClick={() => {
      setShowChildChoiceModal(false);
      navigate("/mychild");
    }}
    className="
      group w-full
      rounded-2xl
      bg-gradient-to-l from-yellow-400 via-amber-300 to-yellow-500
      hover:from-yellow-500 hover:to-amber-400
      text-yellow-950
      py-4
      font-extrabold
      shadow-[0_10px_25px_rgba(245,158,11,0.22)]
      hover:shadow-[0_14px_35px_rgba(245,158,11,0.34)]
      transition-all duration-300
      hover:-translate-y-1
    "
  >
    <div className="flex items-center justify-center gap-2">
      👶
     کودک من و کودکان فالو شده
    </div>
  </button>


  <button
    type="button"
    onClick={() => {
      setShowChildChoiceModal(false);
      navigate("/genino-children");
    }}
    className="
      group w-full
      rounded-2xl
      bg-gradient-to-l from-yellow-400 via-amber-300 to-yellow-500
      hover:from-yellow-500 hover:to-amber-400
      text-yellow-950
      py-4
      font-extrabold
      shadow-[0_10px_25px_rgba(245,158,11,0.22)]
      hover:shadow-[0_14px_35px_rgba(245,158,11,0.34)]
      transition-all duration-300
      hover:-translate-y-1
    "
  >
    <div className="flex items-center justify-center gap-2">
      ✨
      کودکان ژنینویی
    </div>
  </button>

  <button
    type="button"
    onClick={() => setShowChildChoiceModal(false)}
    className="
      w-full rounded-2xl
      py-2 text-sm text-gray-400
      hover:text-gray-600 transition
    "
  >
    انصراف
  </button>

</div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


<AnimatePresence>
  {showLifeCompanionModal && (
    <motion.div
      className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={closeLifeCompanionModal}
    >
      <motion.div
        className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-rose-200 bg-gradient-to-b from-white via-rose-50/70 to-amber-50 p-5 shadow-2xl"
        initial={{ opacity: 0, y: 26, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 26, scale: 0.92 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-rose-300/35 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-amber-300/35 blur-3xl" />

        <button
          type="button"
          onClick={closeLifeCompanionModal}
          className="absolute left-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-gray-500 shadow-sm transition hover:bg-white hover:text-rose-600"
        >
          <X size={18} />
        </button>

        <div className="relative z-10 text-center">
          <motion.div
            className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-rose-400 via-pink-400 to-amber-300 text-white shadow-[0_14px_40px_rgba(244,114,182,0.35)]"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <HeartHandshake size={38} />
          </motion.div>

          <h2 className="text-xl font-black text-rose-800">
            همراه زندگی من
          </h2>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-8 text-gray-600">
            اینجا فضای دونفره و شخصی شماست؛ جایی برای برنامه‌های مشترک،
            قرارها، لیست‌ها، مراقبت از همدیگر و لحظه‌های مهم زندگی.
          </p>

          <div className="mt-4 rounded-3xl border border-rose-100 bg-white/75 p-4 text-sm font-bold leading-7 text-rose-700 shadow-sm">
            همسر یا شریک زندگی خود را به این صفحه دو نفره شخصی دعوت کنید.
          </div>
        </div>

        <div className="relative z-10 mt-6 space-y-4 text-right">
          <div>
            <label className="mb-1.5 flex items-center gap-2 text-xs font-extrabold text-rose-700">
              <Mail size={15} />
              ایمیل
            </label>
            <input
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              type="email"
              placeholder="مثلاً name@gmail.com"
              className="w-full rounded-2xl border border-rose-100 bg-white/85 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
            />
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-2 text-xs font-extrabold text-rose-700">
              <Phone size={15} />
              یا شماره موبایل
            </label>
            <input
              value={invitePhone}
              onChange={(e) => setInvitePhone(e.target.value)}
              type="text"
              placeholder="مثلاً 0912..."
              className="w-full rounded-2xl border border-rose-100 bg-white/85 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
            />
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-2 text-xs font-extrabold text-rose-700">
              <UserRound size={15} />
              یا نام کاربری
            </label>
            <input
              value={inviteUsername}
              onChange={(e) => setInviteUsername(e.target.value)}
              type="text"
              placeholder="مثلاً user-genino"
              className="w-full rounded-2xl border border-rose-100 bg-white/85 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
            />
          </div>
        </div>

        <div className="relative z-10 mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleSendInvite}
            disabled={isSendingLifeInvite}
            className={`flex-1 rounded-2xl px-5 py-3 text-sm font-extrabold text-white shadow-lg transition-all ${
              isSendingLifeInvite
                ? "bg-gray-300"
                : "bg-gradient-to-l from-rose-500 via-pink-500 to-amber-400 hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            <span className="inline-flex items-center justify-center gap-2">
              <Send size={17} />
              {isSendingLifeInvite ? "در حال ارسال..." : "ارسال دعوت"}
            </span>
          </button>

          <button
            type="button"
            onClick={closeLifeCompanionModal}
            className="rounded-2xl border border-rose-200 bg-white/80 px-5 py-3 text-sm font-extrabold text-rose-700 transition hover:bg-rose-50 sm:w-32"
          >
            بستن
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>



<AnimatePresence>
  {showAppModal && (
    <motion.div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/45 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowAppModal(false)}
    >
      <motion.div
        className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-yellow-200 text-center"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-4xl mb-3">📱</div>

        <p className="text-sm sm:text-base text-gray-600 leading-8 font-bold">
          اپلیکیشن رسمی ژنینو
          <br />
          ژانویه ۲۰۲۷ افتتاح می‌شود ✨
        </p>

        <button
          type="button"
          onClick={() => setShowAppModal(false)}
          className="mt-6 w-full rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-400 py-3 text-white font-bold shadow-md hover:shadow-lg transition"
        >
          متوجه شدم
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

            <Footer className="relative z-[2]" />
    </main>
  );
}
