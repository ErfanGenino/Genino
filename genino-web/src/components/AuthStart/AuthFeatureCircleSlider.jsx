import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

export default function AuthFeatureCircleSlider({ items = [] }) {
  const trackRef = useRef(null);
  const oneSetWidthRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  const loopItems = useMemo(() => {
    if (!items.length) return [];
    return [...items, ...items, ...items];
  }, [items]);

  const normalizeX = () => {
    const oneSetWidth = oneSetWidthRef.current;
    if (!oneSetWidth) return;

    const currentX = x.get();

    if (currentX >= 0) {
  x.set(currentX - oneSetWidth);
}

if (currentX <= -oneSetWidth * 2) {
  x.set(currentX + oneSetWidth);
}
  };

  useEffect(() => {
    const calculateWidth = () => {
      if (!trackRef.current) return;

      const oneSetWidth = trackRef.current.scrollWidth / 3;
      oneSetWidthRef.current = oneSetWidth;

      x.set(-oneSetWidth);
    };

    const timer = setTimeout(calculateWidth, 100);
    window.addEventListener("resize", calculateWidth);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateWidth);
    };
  }, [items.length, x]);

  useAnimationFrame((_, delta) => {
    if (isDragging) return;

    const speed = 18; // سرعت حرکت خودکار
    x.set(x.get() + speed * (delta / 1000));
    normalizeX();
  });

  if (!items.length) return null;

  return (
    <section className="relative z-20 w-full max-w-4xl mx-auto mt-2 mb-2 px-1 overflow-hidden">
      <div
        dir="ltr"
        className="
          relative w-full overflow-hidden
          py-2
          touch-pan-y
        "
      >
        <motion.div
          ref={trackRef}
          className="flex items-start gap-5 sm:gap-7 w-max cursor-grab active:cursor-grabbing"
          style={{ x }}
          drag="x"
          dragMomentum={false}
          dragElastic={0}
          onDragStart={() => {
            hasDraggedRef.current = true;
            setIsDragging(true);
          }}
          onDrag={() => {
            normalizeX();
          }}
          onDragEnd={() => {
            normalizeX();
            setIsDragging(false);

            setTimeout(() => {
              hasDraggedRef.current = false;
            }, 80);
          }}
        >
          {loopItems.map((item, index) => (
            <Link
              key={`${item.title}-${index}`}
              to={item.link || "#"}
              dir="rtl"
              onClick={(e) => {
                if (hasDraggedRef.current) {
                  e.preventDefault();
                }
              }}
              className="
                group flex flex-col items-center shrink-0
                w-[74px] sm:w-[94px]
                select-none
              "
            >
              <div
                className="
                  w-16 h-16
                  sm:w-20 sm:h-20
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
                  className="w-full h-full object-cover pointer-events-none"
                  draggable="false"
                />
              </div>

              <span className="mt-2 text-[10px] sm:text-xs font-bold text-[#b88a1a] leading-5 text-center">
                {item.title}
              </span>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}