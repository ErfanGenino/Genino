import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import logo from "../assets/logo-genino.png";

export default function PromoSlider() {
  const slides = [
    { id: 1, bg: "from-[#fffaf0] to-[#fef7dc]", accent: "🌿" },
    { id: 2, bg: "from-[#fffdf8] to-[#f7f3e6]", accent: "🎁" },
    { id: 3, bg: "from-[#fff8eb] to-[#fef4da]", accent: "👶" },
    { id: 4, bg: "from-[#fffdf6] to-[#fff2d8]", accent: "🎨" },
    { id: 5, bg: "from-[#fefdf8] to-[#fff4e0]", accent: "🧸" },
    { id: 6, bg: "from-[#fffaf0] to-[#fff2db]", accent: "📚" },
    { id: 7, bg: "from-[#fff9ed] to-[#fdf0d0]", accent: "💛" },
    { id: 8, bg: "from-[#fffef8] to-[#f8f3e7]", accent: "✨" },
    { id: 9, bg: "from-[#fff7e8] to-[#fdeccb]", accent: "🪄" },
    { id: 10, bg: "from-[#fffaf3] to-[#f6ecd6]", accent: "🌈" },
  ];

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef(null);

  const next = () => {
    setDirection(1);
    setIndex((p) => (p + 1) % slides.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((p) => (p - 1 + slides.length) % slides.length);
  };

  // لمس موبایل
  const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) next();
    if (diff < -40) prev();
    touchStartX.current = null;
  };

  // اسلاید خودکار
  useEffect(() => {
    const t = setInterval(next, 8000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="relative w-full h-[220px] sm:h-[300px] md:h-[340px] lg:h-[380px] xl:h-[420px] overflow-hidden rounded-3xl shadow-[0_10px_40px_rgba(212,175,55,0.15)] mt-12 z-10 bg-white/30 backdrop-blur-md border border-yellow-100"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* 🔄 انیمیشن اسلایدها */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index].id}
          className={`absolute inset-0 bg-gradient-to-br ${slides[index].bg} flex flex-col items-center justify-center text-center select-none`}
          initial={{ opacity: 0, x: direction === 1 ? 80 : -80, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: direction === 1 ? -80 : 80, scale: 0.98 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.img
            src={logo}
            alt="Genino Logo"
            className="w-16 h-16 sm:w-20 sm:h-20 mb-4 drop-shadow-lg opacity-90"
            animate={{
              scale: [1, 1.03, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.h2
            className="text-yellow-600 text-2xl sm:text-3xl font-extrabold flex items-center justify-center gap-2 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span>{slides[index].accent}</span>
            <span>اینجا جای تبلیغ شماست</span>
          </motion.h2>

          <motion.p
            className="text-gray-600 text-sm sm:text-base font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Your Ad Here — Coming Soon
          </motion.p>

          <motion.div
            className="mt-5 h-[3px] w-28 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-400"
            animate={{ scaleX: [1, 0.7, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* 🔸 فلش‌ها */}
      <button
        onClick={prev}
        aria-label="previous"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-yellow-50 text-yellow-600 p-2.5 rounded-full shadow-md hover:shadow-lg transition z-20 border border-yellow-100"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        aria-label="next"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-yellow-50 text-yellow-600 p-2.5 rounded-full shadow-md hover:shadow-lg transition z-20 border border-yellow-100"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* 🔘 نقاط وضعیت */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2 z-20">
        {slides.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index
                ? "bg-gradient-to-r from-yellow-500 to-yellow-400 scale-125 shadow-md"
                : "bg-gray-300 hover:bg-yellow-300"
            }`}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
}

