import { motion } from "framer-motion";
import { CalendarDays, PartyPopper } from "lucide-react";

export default function Events() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-gray-800 bg-gradient-to-b from-[#fffaf0] via-[#fff5d8] to-[#fff0c8] overflow-hidden">
      {/* ✨ افکت نور طلایی */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#fff8dc]/80 to-transparent blur-2xl"
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />

      {/* 🎉 آیکون متحرک */}
      <motion.div
        className="flex items-center justify-center mb-6 z-10"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-[0_0_40px_rgba(212,175,55,0.5)] border-4 border-yellow-300 flex items-center justify-center">
          <PartyPopper className="w-16 h-16 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        </div>
      </motion.div>

      {/* 💬 متن اصلی */}
      <motion.div
        className="text-center z-10 px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-yellow-700 mb-4 drop-shadow-[0_0_12px_rgba(255,220,100,0.6)]">
          رویدادها و جشن‌های ژنینو 🎈
        </h1>
        <p className="text-gray-700 text-lg max-w-md mx-auto leading-relaxed">
          به‌زودی، تقویم هوشمند ژنینو با معرفی جشن‌ها، رویدادهای آموزشی و
          کارگاه‌های ویژه‌ی والدین و کودکان فعال خواهد شد.  
        </p>
        <motion.p
          className="mt-6 text-2xl font-bold text-yellow-600 tracking-widest"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Coming Soon ✨
        </motion.p>
      </motion.div>

      {/* ✨ ذرات طلایی در پس‌زمینه */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(255,215,0,0.6)]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 4 + Math.random() * 3,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </main>
  );
}
