import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

const handleSlideClick = () => {
  const currentSlide = slides[index];

  if (currentSlide?.link) {
    navigate(currentSlide.link);
  }
};

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
      className={`relative w-full overflow-hidden rounded-3xl select-none ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
  aspectRatio: "3 / 2",
  background: "transparent",
  boxShadow: "none",
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
          onClick={handleSlideClick}
className={`absolute inset-0 flex cursor-pointer flex-col items-center justify-center text-center ${
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
          {/* لایه لطیف برند ژنینو روی تصویر */}
<div className="absolute inset-0 bg-gradient-to-l from-black/10 via-transparent to-yellow-900/10" />
        </motion.div>
      </AnimatePresence>

      {/* دکمه‌های چپ و راست */}
<div
  className="
    absolute inset-y-0 left-0 right-0
    z-20 flex items-center justify-between
    px-2 sm:px-3
    pointer-events-none
  "
>
  <button
  onClick={(e) => {
    e.stopPropagation();
    prevSlide();
  }}
    className="
      pointer-events-auto
      w-5 h-5 sm:w-6 sm:h-6
      rounded-full
      bg-black/20
      backdrop-blur-sm
      text-white
      text-sm sm:text-lg
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
  onClick={(e) => {
    e.stopPropagation();
    nextSlide();
  }}
    className="
      pointer-events-auto
      w-5 h-5 sm:w-6 sm:h-6
      rounded-full
      bg-black/20
      backdrop-blur-sm
      text-white
      text-sm sm:text-lg
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
