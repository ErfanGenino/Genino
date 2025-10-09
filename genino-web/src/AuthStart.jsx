import { motion } from "framer-motion";
import logo from "./assets/logo-genino.png";
import { Brain, Gift, ShoppingBag, Bot } from "lucide-react";
import Footer from "./Footer.jsx";
import { useState, useEffect, useRef } from "react";


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
    {
      icon: <Brain className="w-8 h-8 text-yellow-500 mb-3" />,
      title: "رشد و آموزش کودک",
      desc: "پیگیری رشد ذهنی، عاطفی و فیزیکی کودک با ابزارهای هوشمند ژنینو.",
    },
    {
      icon: <Gift className="w-8 h-8 text-yellow-500 mb-3" />,
      title: "تعامل و هدیه خانوادگی",
      desc: "اتصال خانواده و اقوام برای اشتراک لحظات و هدیه به کودک.",
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-yellow-500 mb-3" />,
      title: "مارکت‌پلیس تخصصی کودک",
      desc: "دسترسی به محصولات و خدمات منتخب ویژه‌ی والدین و فرزندان.",
    },
    {
      icon: <Bot className="w-8 h-8 text-yellow-500 mb-3" />,
      title: "دستیار هوشمند والدین",
      desc: "پیشنهادهای هوشمند و تحلیل رفتار کودک بر اساس داده‌های روزانه.",
    },
  ];

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-[#f7f2eb] to-[#fffdf8] text-gray-800 px-6 pt-20 text-center overflow-hidden">
{/* 🔹 دکمه دریافت اپ بازشونده بالا سمت چپ */}
<div
  className="absolute top-20 left-20 z-50"
  onMouseEnter={() => setOpen(true)}
  onMouseLeave={() => setOpen(false)}
>
  <div className="relative">
    {/* دکمه اصلی */}
    <button
      className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-md hover:from-yellow-600 hover:to-yellow-500 transition-all"
    >
      📱 دریافت اپ ژنینو
    </button>

    {/* منوی بازشونده */}
    {open && (
      <div className="absolute left-0 bg-white shadow-lg rounded-xl border border-yellow-100 overflow-hidden w-40 text-right">
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
      </div>
    )}
  </div>
</div>

      {/* 🔹 پس‌زمینه DNA طلایی محو */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg
          viewBox="0 0 800 800"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
        >
          <defs>
            <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#fff4c2" />
            </linearGradient>
          </defs>
          <path
            d="M100,400 C200,200 400,200 500,400 C600,600 800,600 900,400"
            stroke="url(#dnaGradient)"
            strokeWidth="10"
            fill="none"
          />
          <path
            d="M100,420 C200,620 400,620 500,420 C600,220 800,220 900,420"
            stroke="url(#dnaGradient)"
            strokeWidth="8"
            fill="none"
          />
        </svg>
      </div>

      {/* 🔸 لوگو و معرفی برند با انیمیشن */}
      <motion.div
        className="flex flex-col items-center mb-16 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="w-32 h-32 rounded-full bg-yellow-100 p-3 shadow-lg flex items-center justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img src={logo} alt="Genino Logo" className="w-24 h-24 object-contain" />
        </motion.div>

        <h1 className="text-5xl font-bold text-yellow-600 mb-2 drop-shadow-sm">
          ژنینو 🌿
        </h1>
        <p className="text-gray-500 text-lg font-light mb-6">
          دستیار هوشمند والدین
        </p>

        <motion.p
          className="text-gray-700 max-w-md leading-relaxed text-[15px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          هر کودک، یک جهان نوآوری ✨  
          <br />
          ژنینو همراه شماست برای رشد، آموزش و شادی فرزندانتان.
        </motion.p>
      </motion.div>

      {/* 🔸 کارت‌های ویژگی با انیمیشن جداگانه */}
      <motion.section
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl mb-20 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.2, duration: 0.6 },
          },
        }}
      >
        {features.map((item, i) => (
          <motion.div
            key={i}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm hover:shadow-md border border-yellow-100 transition-all text-center"
          >
            <div className="flex flex-col items-center">
              {item.icon}
              <h3 className="text-base font-semibold text-gray-700 mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.section>

      <Footer />
    </main>
  );
}
