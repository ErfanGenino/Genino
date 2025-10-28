// 📦 src/components/GeninoAwarenessBox.jsx
import { motion } from "framer-motion";

export default function GeninoAwarenessBox({ image, message, buttons = [] }) {
  return (
    <motion.div
      className="bg-white/90 backdrop-blur-sm border border-yellow-200 rounded-3xl shadow-[0_0_25px_rgba(212,175,55,0.25)] p-6 text-center overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* 🏷️ تیتر ثابت */}
      <h2 className="text-xl sm:text-2xl font-bold text-yellow-700 mb-4 drop-shadow-[0_0_6px_rgba(255,215,0,0.3)]">
        جعبه آگاهی ژنینو
      </h2>

    {/* 🖼️ عکس (هوشمند و هماهنگ با سایز واقعی + قاب طلایی) */}
{image && (
  <motion.div
    className="relative mb-5 inline-block overflow-hidden rounded-2xl border border-yellow-300 bg-white/80 
               shadow-[0_0_18px_rgba(212,175,55,0.25)] transition-all"
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
  >
    <img
      src={image}
      alt="Genino Awareness"
      className="block rounded-2xl object-cover"
      style={{
        width: "100%",
        height: "auto",
        display: "block",
      }}
    />

    {/* ✨ افکت نور طلایی عبوری */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/25 to-transparent pointer-events-none"
      animate={{ x: ["-100%", "100%"] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* 🟡 خط طلایی زیر عکس */}
    <motion.div
      className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 rounded-b-2xl shadow-[0_0_10px_rgba(212,175,55,0.6)]"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    />
  </motion.div>
)}



      {/* 💬 پیام کوتاه ژنینویی */}
      {message && (
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-5">
          {message}
        </p>
      )}

      {/* 🔘 دکمه‌های مقاله‌ها */}
      <div className="flex flex-wrap justify-center gap-3">
        {buttons.map((btn, index) => (
          <motion.a
            key={index}
            href={btn.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white text-sm font-medium rounded-full shadow hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition"
          >
            {btn.title}
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
