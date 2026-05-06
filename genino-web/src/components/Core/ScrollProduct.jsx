// 📄 src/components/Core/ScrollProduct.jsx
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useEffect } from "react";
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
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  // 🎞️ اسکرول خودکار هر چند ثانیه
  useEffect(() => {
    if (!autoScroll) return;
    const timer = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      }
    }, interval);
    return () => clearInterval(timer);
  }, [autoScroll, interval]);

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
        <button
          onClick={() =>
            scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
          }
          className={`absolute right-0 sm:right-8 p-2 rounded-full bg-white border ${colorClasses} hover:bg-yellow-50 transition shadow-sm`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <h2
  className={`text-lg sm:text-xl font-bold ${
    colorClasses.split(" ")[0]
  }`}
>
  {title}
</h2>


        <button
          onClick={() =>
            scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
          }
          className={`absolute left-0 sm:left-8 p-2 rounded-full bg-white border ${colorClasses} hover:bg-yellow-50 transition shadow-sm`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* 🔄 لیست محصولات */}
      <div
        ref={scrollRef}
        className="overflow-x-auto snap-x snap-mandatory no-scrollbar"
        style={{ touchAction: "pan-y pan-x" }}
      >
        <div className="grid grid-flow-col 
                auto-cols-[60%] 
                sm:auto-cols-[40%] 
                md:auto-cols-[28%] 
                lg:auto-cols-[22%] 
                gap-4 px-2">
          {items.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{
                y: -4,
                boxShadow: "0 10px 25px rgba(212,175,55,0.15)",
              }}
              transition={{ duration: 0.3 }}
              onClick={() => navigate(`/product/${item.id}`)}
              className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm 
           overflow-hidden hover:shadow-md transition-all 
           border border-yellow-100 cursor-pointer snap-start"
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
        </div>
      </div>
    </section>
  );
}
