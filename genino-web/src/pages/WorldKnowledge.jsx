import React from "react";
import { motion } from "framer-motion";
import { Heart, Baby, Users, Sparkles, Smile, Utensils } from "lucide-react";

export default function WorldKnowledge() {
  const topics = [
    {
      icon: <Sparkles className="w-10 h-10 text-yellow-500 mb-3" />,
      title: "دانستنی‌های قبل از بارداری (مردان و زنان)",
      desc: "آمادگی جسمی و روانی پیش از بارداری، کلید سلامت نسل آینده.",
    },
    {
      icon: <Baby className="w-10 h-10 text-yellow-500 mb-3" />,
      title: "مراقبت از کودکان زیر ۳ سال",
      desc: "درک نیازهای اولیه، لمس، تغذیه و امنیت عاطفی در سال‌های آغازین.",
    },
    {
      icon: <Smile className="w-10 h-10 text-yellow-500 mb-3" />,
      title: "مراقبت از کودکان ۳ تا ۱۰ سال",
      desc: "رشد شناختی، خلاقیت و پرورش استقلال در دوران طلایی کودکی.",
    },
    {
      icon: <Utensils className="w-10 h-10 text-yellow-500 mb-3" />,
      title: "تغذیه کودکان",
      desc: "تغذیه سالم، انرژی و رشد پایدار برای ذهن و بدن کودک.",
    },
    {
      icon: <Users className="w-10 h-10 text-yellow-500 mb-3" />,
      title: "رفتار والدین با کودکان",
      desc: "نحوه ارتباط، تشویق و انضباط مثبت در تربیت آگاهانه.",
    },
    {
      icon: <Heart className="w-10 h-10 text-yellow-500 mb-3" />,
      title: "رفتار متقابل زن و مرد در خانواده",
      desc: "احترام، همدلی و درک متقابل، زیربنای رشد سالم فرزندان.",
    },
  ];

  return (
    <main
      dir="rtl"
      className="relative z-[10] min-h-screen bg-gradient-to-b from-[#f7f2eb] to-[#fffdf8] text-gray-800 flex flex-col items-center pt-24 px-6 text-center overflow-hidden"
    >
      {/* 🌿 بک‌گراند DNA متحرک طلایی */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fffdf8] to-[#f7f3e6] overflow-hidden z-[0]">
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

      {/* ✅ تیتر صفحه */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-[10] text-3xl font-bold text-yellow-600 mb-8"
      >
        🌍 دانستنی‌های روز دنیا
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative z-[10] text-gray-600 max-w-2xl leading-relaxed mb-12"
      >
        مجموعه‌ای از دانستنی‌های علمی، آموزشی و روان‌شناسی برای والدین آگاه و خانواده‌های آینده‌نگر.
      </motion.p>

      {/* 🔸 کارت‌های دانستنی‌ها */}
      <section className="relative z-[10] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mb-20">
        {topics.map((topic, i) => (
          <motion.div
            key={i}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 25px rgba(212,175,55,0.4)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="bg-white/80 backdrop-blur-md border border-yellow-100 rounded-3xl shadow-md p-6 text-right flex flex-col justify-between hover:bg-yellow-50 transition-all cursor-pointer"
          >
            <div className="flex flex-col items-center mb-4">
              {topic.icon}
              <h2 className="text-lg font-bold text-yellow-600 mb-2 text-center leading-snug">
                {topic.title}
              </h2>
              <p className="text-sm text-gray-600 text-center leading-relaxed">
                {topic.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* 🔸 کارت‌های بدن زنان و مردان */}
      <section className="relative z-[20] grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-5xl mb-20">
        {/* بدن زنان */}
        <motion.div
          whileHover={{ scale: 1.03, rotate: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 12 }}
          className="bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 rounded-3xl shadow-md p-10 flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition-all"
        >
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
        </motion.div>

        {/* بدن مردان */}
        <motion.div
          whileHover={{ scale: 1.03, rotate: -1 }}
          transition={{ type: "spring", stiffness: 180, damping: 12 }}
          className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-3xl shadow-md p-10 flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition-all"
        >
          <motion.div
            animate={{ rotate: [0, -360] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 text-yellow-500 mb-4"
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
          <h2 className="text-2xl font-bold text-yellow-600 mb-2">بدن مردان</h2>
          <p className="text-gray-600 text-sm text-center leading-relaxed max-w-xs">
            درک ساختار، هورمون‌ها و عملکرد بدن مردانه برای تعادل سلامت جسم و ذهن.
          </p>
        </motion.div>
      </section>

      {/* 🧍‍♀️🧍‍♂️ انیمیشن ظریف زن و مرد در پس‌زمینه */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end px-8 z-[1] opacity-30">
        {/* زن */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-24 h-24 text-pink-500"
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

        {/* مرد */}
        <motion.div
          animate={{ y: [-10, 0, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-24 h-24 text-yellow-500"
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
      </div>
    </main>
  );
}
