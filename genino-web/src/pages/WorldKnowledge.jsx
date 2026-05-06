import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, Sparkles, Smile, Utensils, Dna, Activity, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import coverImage from "../assets/world-knowledge-pic/cover.jpg";

export default function WorldKnowledge() {
  const topics = [
    {
      icon: <Sparkles className="w-10 h-10 text-yellow-500 mb-3" />,
      title: "دانستنی‌های قبل از بارداری (مردان و زنان)",
      desc: "آمادگی جسمی و روانی پیش از بارداری، کلید سلامت نسل آینده.",
      link: "/knowledge/pre-pregnancy",
    },
    {
      icon: <Dna className="w-10 h-10 text-yellow-500 mb-3" />,
      title: "راز ژن‌ها",
      desc: "کاوش در دنیای درون سلول‌ها؛ جایی که کد زندگی نوشته شده است.",
      link: "/knowledge/genetic-secrets", // 👈 مسیر جدید کارت ژن‌ها
    },
    {
      icon: <Smile className="w-10 h-10 text-yellow-500 mb-3" />,
      title: "مراقبت از کودکان",
      desc: "رشد شناختی، خلاقیت و پرورش استقلال در دوران طلایی کودکی.",
      link: "/knowledge/child-care",
    },
    {
      icon: <Utensils className="w-10 h-10 text-yellow-500 mb-3" />,
      title: "تغذیه کودکان",
      desc: "تغذیه سالم، انرژی و رشد پایدار برای ذهن و بدن کودک.",
      link: "/knowledge/child-nutrition",
    },
    {
      icon: <Users className="w-10 h-10 text-yellow-500 mb-3" />,
      title: "رفتار والدین با کودکان",
      desc: "نحوه ارتباط، تشویق و انضباط مثبت در تربیت آگاهانه.",
      link: "/knowledge/parents-behavior",
    },
    {
      icon: <Heart className="w-10 h-10 text-yellow-500 mb-3" />,
      title: "رفتار متقابل زن و مرد در خانواده",
      desc: "احترام، همدلی و درک متقابل، زیربنای رشد سالم فرزندان.",
      link: "/knowledge/family-relations",
    },
    {
      icon: <Heart className="w-10 h-10 text-yellow-500 mb-3" />,
  title: "آرامش ذهن و روان (مدیتیشن)",
  desc: "مدیریت استرس، آرام‌سازی ذهن و تقویت سلامت روان برای والدین و خانواده‌ها.",
  link: "/knowledge/mind-calm",
},
{
  icon: <Activity className="w-10 h-10 text-yellow-500 mb-3" />,
  title: "ورزش در خانه",
  desc: "تمرین‌های ساده و کاربردی برای حفظ سلامت بدن بدون نیاز به باشگاه.",
  link: "/knowledge/home-workout",
},
{
  icon: <Briefcase className="w-10 h-10 text-yellow-500 mb-3" />,
  title: "کارآفرینان موفق",
  desc: "داستان‌ها، مسیرها و ذهنیت کارآفرینانی که از صفر به موفقیت رسیدند.",
  link: "/knowledge/successful-entrepreneurs",
},
  ];

  const cardColors = [
  {
    bg: "from-yellow-50 to-amber-100",
    border: "border-amber-200",
    icon: "text-amber-500",
    title: "text-amber-700",
  },
  {
    bg: "from-lime-50 to-lime-100",
    border: "border-lime-200",
    icon: "text-lime-500",
    title: "text-lime-700",
  },
  {
    bg: "from-pink-50 to-pink-100",
    border: "border-pink-200",
    icon: "text-pink-500",
    title: "text-pink-700",
  },
  {
    bg: "from-sky-50 to-sky-100",
    border: "border-sky-200",
    icon: "text-sky-500",
    title: "text-sky-700",
  },
  {
    bg: "from-violet-50 to-violet-100",
    border: "border-violet-200",
    icon: "text-violet-500",
    title: "text-violet-700",
  },
  {
    bg: "from-orange-50 to-orange-100",
    border: "border-orange-200",
    icon: "text-orange-500",
    title: "text-orange-700",
  },
  {
    bg: "from-emerald-50 to-emerald-100",
    border: "border-emerald-200",
    icon: "text-emerald-500",
    title: "text-emerald-700",
  },
  {
    bg: "from-blue-50 to-blue-100",
    border: "border-blue-200",
    icon: "text-blue-500",
    title: "text-blue-700",
  },
  {
    bg: "from-rose-50 to-rose-100",
    border: "border-rose-200",
    icon: "text-rose-500",
    title: "text-rose-700",
  },
];

  const [shine, setShine] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setShine(true);
      setTimeout(() => setShine(false), 2000);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      dir="rtl"
      className="relative z-[10] min-h-screen bg-gradient-to-b from-[#d9d9d9] via-[#eeeeee] to-[#cfcfcf] text-gray-800 flex flex-col items-center pt-24 px-6 text-center overflow-hidden"
    >
      {/* 🌿 بک‌گراند DNA طلایی متحرک */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e5e5e5] via-[#f3f3f3] to-[#c9c9c9] overflow-hidden z-[0] pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.svg
            key={i}
            viewBox="0 0 100 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute opacity-25"
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
            <path
              d="M30,10 C50,30 50,70 30,90 C10,110 10,150 30,170"
              stroke={`url(#dnaGrad-${i})`}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M70,10 C50,30 50,70 70,90 C90,110 90,150 70,170"
              stroke={`url(#dnaGrad-${i})`}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            {Array.from({ length: 6 }).map((_, j) => (
              <line
                key={j}
                x1="30"
                y1={20 + j * 25}
                x2="70"
                y2={30 + j * 25}
                stroke={`url(#dnaGrad-${i})`}
                strokeWidth="1.5"
                opacity="0.6"
              />
            ))}
          </motion.svg>
        ))}
      </div>

      {/* 🔥 HERO + COVER */}
<section className="relative z-[10] w-full max-w-6xl mb-16">

  <motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="relative rounded-[32px] overflow-hidden shadow-xl"
  >

    {/* 📸 عکس کاور */}
    <img
      src={coverImage}
      alt="Genino Magazine Cover"
      className="w-full h-[260px] sm:h-[320px] object-cover"
    />

    {/* 🎨 لایه گرادینت روی عکس */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

    {/* ✨ متن روی کاور */}
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl sm:text-4xl font-extrabold text-white leading-relaxed"
      >
        مجله ژنینو ✨  
        <br />
        <span className="text-yellow-300">
          جایی برای رشد، آگاهی و ساختن آینده‌ای بهتر
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-sm sm:text-base text-gray-200 max-w-2xl leading-relaxed"
      >
        از ژن‌ها تا ذهن، از کودک تا خانواده؛  
        هر آنچه برای یک زندگی آگاهانه نیاز داری، اینجاست.
      </motion.p>

    </div>
  </motion.div>
</section>

      {/* 🔸 کارت‌ها */}
      <section className="relative z-[10] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl mb-20">
  {topics.map((topic, i) => {
    const theme = cardColors[i % cardColors.length];

    return (
      <Link key={i} to={topic.link} className="block h-full">
        <motion.div
          whileHover={{
            y: -4,
            scale: 1.02,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className={`h-44 bg-gradient-to-br ${theme.bg} border ${theme.border} rounded-2xl shadow-sm p-4 flex flex-col items-center justify-center hover:shadow-md transition-all cursor-pointer`}
        >
          <div className={`${theme.icon} mb-2`}>
            {React.cloneElement(topic.icon, {
              className: "w-7 h-7",
            })}
          </div>

          <h2 className={`text-sm font-bold ${theme.title} mb-2 text-center leading-6 line-clamp-2`}>
            {topic.title}
          </h2>

          <p className="text-xs text-gray-600 text-center leading-6 line-clamp-2">
            {topic.desc}
          </p>
        </motion.div>
      </Link>
    );
  })}
</section>

      {/* کارت‌های بدن زنان و مردان */}
      <section className="relative z-[20] grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-5xl mb-20">
        {/* بدن زنان */}
        {/* بدن زنان */}
<Link to="/articles/body-women">
  <motion.div
    whileHover={{ scale: 1.03, rotate: 1 }}
    transition={{ type: "spring", stiffness: 180, damping: 12 }}
    className={`relative bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 rounded-3xl shadow-md p-10 flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition-all ${
      shine ? "shadow-[0_0_40px_rgba(255,105,180,0.6)] scale-[1.02]" : ""
    } overflow-hidden`}
  >

    {/* 📸 بک‌گراند عکس + فیلتر صورتی */}
    <div
      className="absolute inset-0 z-0 opacity-30"
      style={{
        backgroundImage: "url('/images/bg/woman-body.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "hue-rotate(300deg) saturate(1.3)",
      }}
    />

    {/* لایه رنگ صورتی ملایم */}
    <div className="absolute inset-0 bg-pink-100 opacity-30 z-0"></div>

    {/* محتوا */}
    <div className="relative z-10 flex flex-col items-center">
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-20 h-20 text-pink-500 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 0v7m0 0h-3m3 0h3"
          />
        </svg>
      </motion.div>

      <h2 className="text-2xl font-bold text-pink-600 mb-2">بدن زنان</h2>
      <p className="text-gray-600 text-sm text-center leading-relaxed max-w-xs">
        شناخت فیزیولوژی و چرخه‌های طبیعی بدن زنانه، کلید درک عمیق‌تر از سلامت و احساسات.
      </p>
    </div>
  </motion.div>
</Link>


        {/* بدن مردان */}
        {/* بدن مردان */}
<Link to="/articles/body-men">
  <motion.div
    whileHover={{ scale: 1.03, rotate: -1 }}
    transition={{ type: "spring", stiffness: 180, damping: 12 }}
    className={`relative bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-3xl shadow-md p-10 flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition-all ${
      shine ? "shadow-[0_0_40px_rgba(70,130,180,0.6)] scale-[1.02]" : ""
    } overflow-hidden`}
  >

    {/* 📸 بک‌گراند عکس + فیلتر آبی */}
    <div
      className="absolute inset-0 z-0 opacity-30"
      style={{
        backgroundImage: "url('/images/bg/men-body.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "hue-rotate(200deg) saturate(1.3)",
      }}
    />

    {/* لایه رنگ آبی ملایم */}
    <div className="absolute inset-0 bg-blue-100 opacity-30 z-0"></div>

    {/* محتوا */}
    <div className="relative z-10 flex flex-col items-center">
      <motion.div
        animate={{ rotate: [0, -360] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-20 h-20 text-blue-500 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 8a4 4 0 1 0-8 0 4 4 0 0 0 8 0zm0 0v7m0 0h4m-4 0h-4"
          />
        </svg>
      </motion.div>

      <h2 className="text-2xl font-bold text-blue-600 mb-2">بدن مردان</h2>
      <p className="text-gray-600 text-sm text-center leading-relaxed max-w-xs">
        درک ساختار، هورمون‌ها و عملکرد بدن مردانه برای تعادل سلامت جسم و ذهن.
      </p>
    </div>
  </motion.div>
</Link>
      </section>
    </main>
  );
}
