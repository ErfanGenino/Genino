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
  const [direction, setDirection] = useState(1); // 1: راست به چپ، -1: چپ به راست
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
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) next();
    if (diff < -50) prev();
    touchStartX.current = null;
  };

  // اسلاید خودکار
  useEffect(() => {
    const t = setInterval(next, 8000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] overflow-hidden rounded-3xl shadow-xl mt-16 z-10"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index].id}
          className={`absolute inset-0 bg-gradient-to-br ${slides[index].bg} pointer-events-none`}
          initial={{ opacity: 0, x: direction === 1 ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction === 1 ? -100 : 100 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* محتوای اسلاید */}
          <div className="relative w-full h-full flex flex-col items-center justify-center text-center select-none">
            <img
              src={logo}
              alt="Genino"
              className="w-14 h-14 sm:w-16 sm:h-16 mb-3 opacity-90 drop-shadow"
            />
            <div className="flex items-center gap-2 text-yellow-600/90 text-xl sm:text-2xl font-bold mb-1">
              <span>اینجا جای تبلیغ شماست</span>
              <span>{slides[index].accent}</span>
            </div>
            <div className="text-gray-600 text-xs sm:text-sm">
              Your Ad Here — Coming Soon
            </div>
            <div className="mt-4 h-[3px] w-24 rounded-full bg-gradient-to-r from-yellow-500/60 to-yellow-400/60" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* فلش‌ها */}
      <button
        onClick={prev}
        aria-label="previous"
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-yellow-600 p-2 rounded-full shadow-md transition z-20"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        aria-label="next"
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-yellow-600 p-2 rounded-full shadow-md transition z-20"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* نقاط وضعیت */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === index ? "bg-yellow-500 scale-110" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

