import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function AuthFeatureCircleSlider({ items = [] }) {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [direction, setDirection] = useState("next");

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;

      if (width >= 1024) setVisibleCount(5);
      else if (width >= 640) setVisibleCount(4);
      else setVisibleCount(3);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const visibleItems = useMemo(() => {
    if (!items.length) return [];

    return Array.from({ length: visibleCount }).map((_, i) => {
      const index = (startIndex + i) % items.length;
      return items[index];
    });
  }, [items, startIndex, visibleCount]);

  const moveNext = () => {
    if (!items.length) return;
    setDirection("next");
    setStartIndex((prev) => (prev + 1) % items.length);
  };

  const movePrev = () => {
    if (!items.length) return;
    setDirection("prev");
    setStartIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  useEffect(() => {
    if (!items.length) return;

    const interval = setInterval(() => {
      moveNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <section
      dir="rtl"
      className="relative z-20 w-full max-w-4xl mx-auto mt-5 mb-2 px-2 overflow-hidden"
    >
      <div
        className="
          grid gap-4 justify-items-center
          grid-cols-3
          sm:grid-cols-4
          lg:grid-cols-5
        "
      >
        <AnimatePresence mode="popLayout">
          {visibleItems.map((item) => (
            <motion.div
              key={item.title}
              layout
              initial={{
                opacity: 0,
                x: direction === "next" ? -45 : 45,
                scale: 0.9,
              }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{
                opacity: 0,
                x: direction === "next" ? 45 : -45,
                scale: 0.9,
              }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(event, info) => {
                if (info.offset.x < -40) moveNext();
                if (info.offset.x > 40) movePrev();
              }}
              className="flex flex-col items-center select-none"
            >
              <Link
                to={item.link || "#"}
                className="group flex flex-col items-center"
              >
                <div
                  className="
                    w-20 h-20
                    sm:w-24 sm:h-24
                    rounded-full overflow-hidden
                    border-2 border-[#d4af37]
                    bg-[#fff8e6]
                    shadow-md
                    group-hover:shadow-[0_0_18px_rgba(212,175,55,0.45)]
                    group-hover:scale-105
                    transition-all duration-300
                  "
                >
                  <img
                    src={item.icon || item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    draggable="false"
                  />
                </div>

                <span className="mt-2 text-[11px] sm:text-xs font-bold text-[#b88a1a] leading-5 text-center">
                  {item.title}
                </span>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}