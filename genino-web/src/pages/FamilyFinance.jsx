import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";

export default function FamilyFinance() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#fffaf0] via-[#fff3c4] to-[#f6e8b1] text-gray-800 overflow-hidden">

      {/* ☀️ هاله نور طلایی بالا */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#fff8dc]/90 to-transparent blur-2xl z-[1]" />

      {/* ✨ بافت نوری آرام زمینه */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,240,190,0.5),transparent_70%)]"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
      />

      {/* 🪙 سکه طلایی درخشان و چرخان */}
      <motion.div
        className="relative z-10 flex items-center justify-center mb-20"
        animate={{ rotateY: [0, 360] }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
      >
        <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-[#facc15] via-[#fbbf24] to-[#f59e0b] border-[6px] border-yellow-400 shadow-[0_0_60px_rgba(212,175,55,0.6)] flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <DollarSign className="w-20 h-20 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
          </motion.div>

          {/* انعکاس نور روی سکه */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-b from-white/40 to-transparent blur-md"
            animate={{ opacity: [0.4, 0.8, 0.4], rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          />
        </div>
      </motion.div>

      {/* 💬 متن مرکزی */}
      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-700 mb-4 drop-shadow-[0_0_15px_rgba(255,220,120,0.7)]">
          اقتصاد و حسابداری خانواده
        </h1>
        <p className="text-gray-700 text-lg sm:text-xl max-w-lg mx-auto leading-relaxed">
          ژنینو به‌زودی دنیای مالی خانواده‌ها را متحول می‌کند — از بودجه‌بندی هوشمند تا پیش‌بینی هزینه‌ها، همه در یک نگاه.
        </p>
        <motion.p
          className="mt-6 text-2xl font-bold text-yellow-600 tracking-widest"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          COMING SOON ✨
        </motion.p>
      </motion.div>

      {/* 🌟 ذرات طلایی در حال درخشش */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(255,215,0,0.8)]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.8, 0.3, 0.8],
            scale: [1, 1.3, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 3 + Math.random() * 3,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* 🌕 درخشش طلایی ملایم پشت سکه */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-yellow-200/50 to-yellow-400/40 blur-[120px] z-0"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.9, 0.4],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
      />
    </main>
  );
}
