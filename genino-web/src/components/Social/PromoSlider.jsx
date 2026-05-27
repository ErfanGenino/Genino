import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function PromoSlider({
  slides = [],
  variant = "neutral",
  interval = 5,
  height = "h-64",
  className = "",
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timeoutRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (!slides.length) return;
    scheduleNext();
    return () => clearTimeout(timeoutRef.current);
  }, [index, slides.length]);

  const scheduleNext = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, interval * 1000);
  };

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const distance = touchEndX.current - touchStartX.current;
    if (Math.abs(distance) > 50) {
  if (distance > 0) nextSlide();
  else prevSlide();
}
  };

  const variants = {
  enter: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
};

  if (!slides.length) return null;

  return (
    <div
      className={`relative w-full ${height} overflow-visible rounded-3xl select-none pb-14 sm:pb-0 ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        background: "transparent", // ☑️ کاملاً شفاف
        boxShadow: "none", // ☑️ حذف سایه باکس
      }}
    >
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        <motion.div
          key={`slide-${index}-${slides[index]?.id || slides[index]?.image || slides[index]?.text || "item"}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={`absolute inset-0 flex flex-col items-center justify-center text-center ${
            variant === "golden" ? "text-white" : "text-yellow-700"
          }`}
          style={{
            backgroundImage: slides[index].image
              ? `url(${slides[index].image})`
              : "none",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* 🔹 حذف افکت‌های پس‌زمینه — فقط متن باقی می‌ماند */}
          <div className="relative z-10 px-6">
            <motion.h2
              key={`title-${index}-${slides[index]?.image || slides[index]?.text || "slide"}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
            >
              {slides[index].text}
            </motion.h2>
            <motion.p
              key={`sub-${index}-${slides[index]?.image || slides[index]?.sub || "slide"}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="text-base sm:text-lg md:text-xl font-light text-white drop-shadow-[0_0_4px_rgba(0,0,0,0.6)]"
            >
              {slides[index].sub}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* دکمه‌های چپ و راست */}
<div
  className="
    absolute z-20 flex gap-3
    left-1/2 -translate-x-1/2
    -bottom-12

    sm:left-0 sm:right-0 sm:bottom-auto
    sm:top-1/2 sm:-translate-y-1/2
    sm:translate-x-0
    sm:justify-between
    sm:px-3
  "
>
  <button
    onClick={prevSlide}
    className="
      w-7 h-7 sm:w-10 sm:h-10
      rounded-full
      bg-black/20
      backdrop-blur-sm
      text-white
      text-xl sm:text-3xl
      font-bold
      flex items-center justify-center
      hover:bg-black/40
      transition-all
      shadow-sm
    "
  >
    ‹
  </button>

  <button
    onClick={nextSlide}
    className="
      w-7 h-7 sm:w-10 sm:h-10
      rounded-full
      bg-black/20
      backdrop-blur-sm
      text-white
      text-xl sm:text-3xl
      font-bold
      flex items-center justify-center
      hover:bg-black/40
      transition-all
      shadow-sm
    "
  >
    ›
  </button>
</div>

      {/* 🔸 نقاط وضعیت (شفاف و مینیمال) */}
      <div className="absolute bottom-3 flex gap-2 justify-center w-full z-20">
        {slides.map((_, i) => (
          <motion.div
            key={`dot-${i}-${slides[i]?.image || slides[i]?.text || "slide"}`}
            animate={{
              scale: i === index ? [1, 1.3, 1] : 1,
              opacity: i === index ? 1 : 0.4,
            }}
            transition={{ duration: 0.6 }}
            className={`w-2.5 h-2.5 rounded-full ${
              i === index ? "bg-yellow-400" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
