// 📄 src/components/Core/ScrollService.jsx
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * 🌟 ScrollService – نسخه طلایی و فاصله‌دار ژنینویی
 */
export default function ScrollService({
  title = "پزشکان متخصص ژنینو",
  items = [],
  autoScroll = true,
  interval = 7000,
  color = "yellow",
}) {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  // 🎞️ اسکرول خودکار
  useEffect(() => {
    if (!autoScroll) return;
    const timer = setInterval(() => {
      scrollRef.current?.scrollBy({ left: 240, behavior: "smooth" });
    }, interval);
    return () => clearInterval(timer);
  }, [autoScroll, interval]);

  // 🎨 رنگ تم
  const colorClasses =
    color === "pink"
      ? "text-pink-600 border-pink-100"
      : color === "emerald"
      ? "text-emerald-600 border-emerald-100"
      : "text-yellow-600 border-yellow-100";

  return (
    <section className="relative z-10 w-full max-w-6xl mx-auto text-center mb-14 px-3">
      {/* 🏷️ تیتر و فلش‌ها */}
      <div className="relative flex items-center justify-center mb-5">
        <button
          onClick={() =>
            scrollRef.current.scrollBy({ left: -240, behavior: "smooth" })
          }
          className={`absolute right-0 sm:right-6 p-1.5 rounded-full bg-white border ${colorClasses} 
                     hover:bg-yellow-50 transition shadow-sm hidden sm:block`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <h2
          className={`text-lg sm:text-xl font-bold ${colorClasses.split(" ")[0]} drop-shadow-[0_0_6px_rgba(255,220,100,0.3)]`}
        >
          {title}
        </h2>

        <button
          onClick={() =>
            scrollRef.current.scrollBy({ left: 240, behavior: "smooth" })
          }
          className={`absolute left-0 sm:left-6 p-1.5 rounded-full bg-white border ${colorClasses} 
                     hover:bg-yellow-50 transition shadow-sm hidden sm:block`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* 🔄 لیست کارت‌ها */}
      <div
        ref={scrollRef}
        dir="ltr"
        className="overflow-x-auto no-scrollbar touch-pan-x"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "smooth",
          overflowY: "hidden",
        }}
      >
        <div
          className="flex items-stretch gap-5 sm:gap-7 px-3"
          style={{ width: "max-content" }}
        >
          {items.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{
                y: -4,
                scale: 1.03,
                boxShadow: "0 8px 22px rgba(212,175,55,0.25)",
              }}
              transition={{ duration: 0.25 }}
              onClick={() => navigate(`/service/${service.id}`)}
              className="group bg-gradient-to-b from-[#fffaf0] via-[#fff8e1] to-[#fef7da]
                         rounded-2xl border border-yellow-100 hover:border-yellow-300
                         hover:shadow-[0_6px_20px_rgba(255,220,100,0.25)]
                         transition-all cursor-pointer flex flex-col items-center justify-center
                         p-4 sm:p-5 min-w-[180px] sm:min-w-[200px]"
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover mb-3 border border-yellow-200 
                           transition-transform duration-500 group-hover:scale-110 group-hover:border-yellow-400"
              />
              <h3 className="text-sm sm:text-base font-semibold text-gray-700 mb-0.5 line-clamp-1">
                {service.name}
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-600 line-clamp-2 leading-snug">
                {service.specialty || service.desc || "—"}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
