// 📌 src/components/Assessments/GeninoHealthButton.jsx

import { motion } from "framer-motion";

export default function GeninoHealthButton({ title, icon: Icon, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative mx-auto flex items-center justify-center rounded-full 
                 bg-gradient-to-br from-yellow-300 via-yellow-500 to-amber-600 
                 text-white shadow-[0_0_120px_rgba(255,220,100,0.8)]
                 w-[20rem] h-[20rem] font-extrabold text-center text-[25px]
                 border-[12px] border-yellow-200 select-none"
      whileHover={{
        scale: 1.05,
        rotate: [0, 1.5, -1.5, 0],
        boxShadow: "0 0 200px rgba(255,230,120,0.95)",
      }}
      whileTap={{ scale: 0.97 }}
      animate={{
        y: [0, -10, 0],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {/* محتوای اصلی دکمه */}
      <div className="flex flex-col items-center justify-center">
        {Icon && <Icon className="w-28 h-28 mb-8 drop-shadow-[0_0_25px_rgba(255,255,255,0.8)]" />}
<span className="text-lg mt-[-1rem] tracking-tight drop-shadow-[0_0_10px_rgba(0,0,0,0.3)] leading-snug">
  {title}
</span>
      </div>

      {/* ✨ داخل */}
      <div className="absolute inset-0 rounded-full 
                      bg-gradient-to-t from-yellow-400/20 to-white/40 
                      blur-[150px] animate-pulse" />

      {/* 🌟 براقیت بالا */}
      <div className="absolute top-0 left-0 w-56 h-56 
                      bg-white/50 rounded-full blur-[100px] 
                      -translate-x-8 -translate-y-8 opacity-60" />
    </motion.button>
  );
}
