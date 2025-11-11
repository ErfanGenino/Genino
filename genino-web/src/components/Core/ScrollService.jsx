// 📄 src/components/Core/ScrollService.jsx
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * 🌟 ScrollService
 * ------------------------
 * اسکرول افقی مخصوص خدمات (پزشکان، مشاوران، مراکز درمانی و غیره)
 * ایمن‌سازی‌شده برای جلوگیری از ارور 500 در خارج از BrowserRouter
 */
export default function ScrollService({
  title = "خدمات ویژه",
  items = [],
  autoScroll = true,
  interval = 6000,
  color = "yellow",
}) {
  const scrollRef = useRef(null);
  const navigate = useNavigate?.();
  const location = useLocation?.();

  // 🎞️ اسکرول خودکار
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
    <section className="relative z-10 w-full max-w-6xl mx-auto text-center mb-14">
      {/* 🏷️ تیتر و فلش‌ها */}
      <div className="relative flex items-center justify-center mb-6">
        <button
          onClick={() =>
            scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" })
          }
          className={`absolute right-0 sm:right-8 p-2 rounded-full bg-white border ${colorClasses} hover:bg-yellow-50 transition shadow-sm`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <h2
          className={`text-xl font-bold ${
            colorClasses?.split(" ")[0] || "text-yellow-600"
          }`}
        >
          {title}
        </h2>

        <button
          onClick={() =>
            scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" })
          }
          className={`absolute left-0 sm:left-8 p-2 rounded-full bg-white border ${colorClasses} hover:bg-yellow-50 transition shadow-sm`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* 🔄 لیست خدمات */}
      <div
        ref={scrollRef}
        dir="ltr"
        className="overflow-x-auto snap-x snap-mandatory no-scrollbar touch-pan-x"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "smooth",
          overflowY: "hidden",
        }}
      >
        <div
          className="grid grid-flow-col auto-cols-[75%] sm:auto-cols-[45%] md:auto-cols-[30%] lg:auto-cols-[22%]
                     gap-6 px-4 justify-center mx-auto"
          style={{ width: "max-content" }}
        >
          {items.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{
                y: -5,
                scale: 1.02,
                boxShadow: "0 10px 25px rgba(212,175,55,0.2)",
              }}
              transition={{ duration: 0.3 }}
              onClick={() =>
                navigate && navigate(`/service/${service.id}`)
              }
              className="group bg-gradient-to-b from-[#fffef9] to-[#fff7d1] rounded-2xl shadow-sm
                         overflow-hidden hover:shadow-lg transition-all border border-yellow-100
                         cursor-pointer snap-start"
            >
              <div className="flex flex-col items-center justify-center p-4">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-yellow-200 mb-3
                             transition-transform duration-500 group-hover:scale-110 group-hover:border-yellow-400"
                />
                <h3 className="text-sm font-semibold text-gray-700 mb-1 line-clamp-1">
                  {service.name}
                </h3>
                <p className="text-[12px] text-gray-500 line-clamp-2">
                  {service.specialty || service.desc || "—"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
