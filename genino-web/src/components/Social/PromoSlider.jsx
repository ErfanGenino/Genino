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
      if (distance > 0) prevSlide();
      else nextSlide();
    }
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  if (!slides.length) return null;

  return (
    <div
      className={`relative w-full ${height} overflow-hidden rounded-3xl select-none ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        background: "transparent", // ☑️ کاملاً شفاف
        boxShadow: "none", // ☑️ حذف سایه باکس
      }}
    >
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        <motion.div
          key={slides[index].id || index}
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
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* 🔹 حذف افکت‌های پس‌زمینه — فقط متن باقی می‌ماند */}
          <div className="relative z-10 px-6">
            <motion.h2
              key={slides[index].text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
            >
              {slides[index].text}
            </motion.h2>
            <motion.p
              key={slides[index].sub}
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

      {/* 🔸 دکمه‌ها بدون زمینه — فقط آیکون نیمه‌شفاف */}
      <div className="absolute bottom-6 flex justify-between w-full px-6 z-20">
        <button
          onClick={prevSlide}
          className="p-2 text-white/80 hover:text-white bg-transparent"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="p-2 text-white/80 hover:text-white bg-transparent"
        >
          ›
        </button>
      </div>

      {/* 🔸 نقاط وضعیت (شفاف و مینیمال) */}
      <div className="absolute bottom-3 flex gap-2 justify-center w-full z-20">
        {slides.map((_, i) => (
          <motion.div
            key={i}
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
