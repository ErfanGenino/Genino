// 📄 src/components/Core/ScrollProduct.jsx
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * 🌟 ScrollProduct
 * ------------------------
 * کامپوننت اسکرول افقی محصولات با دکمه‌های چپ و راست و اسکرول خودکار
 * props:
 * - title: عنوان بخش (مثلاً "محصولات مشابه" یا "پیشنهاد هوشمند ژنینو")
 * - items: آرایه‌ای از محصولات [{ id, name, price, image, category }]
 * - autoScroll: فعال‌سازی اسکرول خودکار (پیش‌فرض: true)
 * - interval: فاصله زمانی اسکرول خودکار (میلی‌ثانیه، پیش‌فرض 6000)
 * - color: رنگ تم (مثلاً "yellow" یا "pink")
 */
export default function ScrollProduct({
  title = "لیست محصولات",
  items = [],
  autoScroll = false,   // ⬅️ از این به بعد اسکرول خودکار غیرفعال است
  interval = 6000,
  color = "yellow",
}) {
  
  const navigate = useNavigate();

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

  const speed = 22;
  x.set(x.get() + speed * (delta / 1000));
  normalizeX();
});

  

  // 🎨 رنگ‌ها
  const colorClasses =
    color === "pink"
      ? "text-pink-600 border-pink-100"
      : color === "emerald"
      ? "text-emerald-600 border-emerald-100"
      : "text-yellow-600 border-yellow-100";

  return (
    <section className="relative z-10 w-full max-w-5xl mx-auto text-center mt-10 mb-14">
      {/* 🏷️ تیتر و فلش‌ها */}
      <div className="relative flex items-center justify-center mb-6">
      

        <h2
  className={`text-lg sm:text-xl font-bold ${
    colorClasses.split(" ")[0]
  }`}
>
  {title}
</h2>


      
      </div>

      {/* 🔄 لیست محصولات */}
      <div
  dir="ltr"
  className="relative w-full overflow-hidden py-2 touch-pan-y"
>
  <motion.div
    ref={trackRef}
    className="
      flex items-stretch gap-4 px-2
      w-max cursor-grab active:cursor-grabbing
    "
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
            <motion.div
  key={`${item.id}-${index}`}
  whileHover={{
    y: -4,
    boxShadow: "0 10px 25px rgba(212,175,55,0.15)",
  }}
  transition={{ duration: 0.3 }}
  onClick={() => {
    if (hasDraggedRef.current) return;
    navigate(`/product/${item.id}`);
  }}
  className="
    group shrink-0
    w-[62vw] sm:w-[240px] md:w-[220px] lg:w-[210px]
    bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm
    overflow-hidden hover:shadow-md transition-all
    border border-yellow-100 cursor-pointer select-none
  "
>
              <img
  src={item.image}
  alt={item.name}
  className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mt-4 
             object-contain transition-transform duration-500 
             group-hover:scale-110 group-hover:brightness-110"
/>
              <div className="p-3 text-center">
                {item.category && (
                  <div className="text-[11px] text-gray-500 mb-1">
                    {item.category}
                  </div>
                )}
                <h3 className="text-sm font-semibold text-gray-700 mb-1 line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-yellow-600 text-sm font-bold">
                  {item.price}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
