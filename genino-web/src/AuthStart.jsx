import { motion, AnimatePresence } from "framer-motion";
import logo from "./assets/logo-genino.png";
import { Brain, Gift, ShoppingBag, Bot } from "lucide-react";
import Footer from "./Footer.jsx";
import { useState, useEffect, useRef } from "react";

// 🔸 اسلایدر خودکار با انیمیشن ورود و خروج کامل
function AutoSlider() {
  const slides = [
    {
      id: 1,
      text: "هر کودک، یک دنیا نوآوری ✨",
      sub: "ژنینو، همراه رشد و خلاقیت فرزندتان.",
      bg: "from-[#fffaf0] to-[#fef7dc]",
    },
    {
      id: 2,
      text: "رشد کودک را هوشمندانه دنبال کنید 🌱",
      sub: "با تحلیل داده‌ها و پیشنهادهای تخصصی.",
      bg: "from-[#fefdf8] to-[#fff4e0]",
    },
    {
      id: 3,
      text: "ژنینو؛ پلی بین علم و احساس 💛",
      sub: "برای والدینی که می‌خواهند متفاوت تربیت کنند.",
      bg: "from-[#fffdf6] to-[#fff2d8]",
    },
    {
      id: 4,
      text: "هدیه‌ای برای آینده کودک شما 🎁",
      sub: "محیطی امن برای رشد و شادی.",
      bg: "from-[#fff8eb] to-[#fef4da]",
    },
    {
      id: 5,
      text: "دستیار هوشمند والدین 🌿",
      sub: "همراه روزهای پرماجرای کودکی.",
      bg: "from-[#fffdf8] to-[#f7f3e6]",
    },
  ];

  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
    timeoutRef.current = setTimeout(nextSlide, 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  const handleClick = () => setIndex((prev) => (prev + 1) % slides.length);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center text-center cursor-pointer select-none overflow-hidden"
      onClick={handleClick}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index].id}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${slides[index].bg} rounded-3xl`}
        >
          <img
            src={logo}
            alt="Genino Logo"
            className="w-24 h-24 mb-6 opacity-90 drop-shadow-md"
          />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-600 mb-2">
            {slides[index].text}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            {slides[index].sub}
          </p>
          <span className="text-xs text-gray-400 mt-4">
            (برای رفتن به بعدی کلیک کنید)
          </span>
        </motion.div>
      </AnimatePresence>

      {/* 🔸 نقاط وضعیت (Indicators) */}
      <div className="absolute bottom-4 flex gap-2 justify-center w-full">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === index ? "bg-yellow-500 scale-110" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

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
    { icon: <Brain className="w-8 h-8 text-yellow-500 mb-3" />, title: "رشد و آموزش کودک", desc: "پیگیری رشد ذهنی، عاطفی و فیزیکی کودک با ابزارهای هوشمند ژنینو." },
    { icon: <Gift className="w-8 h-8 text-yellow-500 mb-3" />, title: "تعامل و هدیه خانوادگی", desc: "اتصال خانواده و اقوام برای اشتراک لحظات و هدیه به کودک." },
    { icon: <ShoppingBag className="w-8 h-8 text-yellow-500 mb-3" />, title: "فروشگاه تخصصی", desc: "دسترسی به محصولات و خدمات منتخب ویژه‌ی والدین و فرزندان." },
    { icon: <Bot className="w-8 h-8 text-yellow-500 mb-3" />, title: "دستیار هوشمند والدین", desc: "پیشنهادهای هوشمند و تحلیل رفتار کودک بر اساس داده‌های روزانه." },
    { icon: <Brain className="w-8 h-8 text-yellow-500 mb-3" />, title: "آموزش والدین", desc: "مقاله‌ها و دوره‌های آموزشی برای پرورش بهتر و آگاهانه‌تر کودک." },
    { icon: <Gift className="w-8 h-8 text-yellow-500 mb-3" />, title: "بازی و سرگرمی", desc: "ایده‌های خلاقانه برای بازی‌های خانوادگی و تقویت مهارت‌های کودک." },
    { icon: <ShoppingBag className="w-8 h-8 text-yellow-500 mb-3" />, title: "رویدادها و جشن‌ها", desc: "معرفی رویدادهای آموزشی و تفریحی ویژه‌ی کودکان در شهر شما." },
    { icon: <Bot className="w-8 h-8 text-yellow-500 mb-3" />, title: "گزارش رشد هوشمند", desc: "تحلیل داده‌های روزانه و ارائه گزارش پیشرفت کودک در طول زمان." },
    { icon: <Brain className="w-8 h-8 text-yellow-500 mb-3" />, title: "سلامت و تغذیه کودک", desc: "برنامه‌های غذایی متناسب با سن و نیاز رشد کودک." },
    { icon: <Gift className="w-8 h-8 text-yellow-500 mb-3" />, title: "مدیریت خواب کودک", desc: "تنظیم و پایش الگوی خواب کودک برای رشد بهتر." },
    { icon: <ShoppingBag className="w-8 h-8 text-yellow-500 mb-3" />, title: "احساسات و رفتار", desc: "کمک به والدین در شناخت احساسات کودک و تقویت هوش هیجانی." },
    { icon: <Bot className="w-8 h-8 text-yellow-500 mb-3" />, title: "برنامه‌ریز روزانه", desc: "تنظیم خودکار فعالیت‌ها و یادآورها برای والدین و کودک." },
  ];

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-[#f7f2eb] to-[#fffdf8] text-gray-800 px-6 pt-20 text-center overflow-x-hidden overflow-y-auto">
      {/* 🔹 دکمه دریافت اپ */}
      <div
        className="absolute top-20 left-20 z-50"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="relative">
          <button className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-md hover:from-yellow-600 hover:to-yellow-500 transition-all">
            📱 دریافت اپ ژنینو
          </button>

          {open && (
            <div className="absolute left-0 bg-white shadow-lg rounded-xl border border-yellow-100 overflow-hidden w-40 text-right">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition">
                📲 نسخه Android
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition">
                🍎 نسخه iOS
              </a>
            </div>
          )}
        </div>
      </div>

      {/* 🔹 بک‌گراند DNA چرخان */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fffdf8] to-[#f7f3e6] overflow-hidden z-0">
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

      {/* 🔸 اسلایدر */}
      <motion.div
        className="relative w-full max-w-3xl h-72 sm:h-80 lg:h-96 mb-16 rounded-3xl overflow-hidden shadow-xl z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <AutoSlider />
      </motion.div>

      {/* 🔸 کارت‌های ویژگی */}
      <motion.section
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl mb-20 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.6 } },
        }}
      >
        {features.map((item, i) => (
          <motion.div
            key={i}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-yellow-100 transition-all text-center hover:bg-yellow-50 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="flex flex-col items-center">
              {item.icon}
              <h3 className="text-base font-semibold text-gray-700 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.section>

      <Footer />
    </main>
  );
}

