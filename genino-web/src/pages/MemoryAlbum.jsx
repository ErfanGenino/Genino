import { motion } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";

export default function MemoryAlbum() {
  const floatingFrames = [
    { id: 1, top: "15%", left: "10%", rotate: -8, delay: 0.5 },
    { id: 2, top: "20%", right: "12%", rotate: 6, delay: 1 },
    { id: 3, bottom: "15%", left: "15%", rotate: 4, delay: 1.5 },
    { id: 4, bottom: "20%", right: "10%", rotate: -5, delay: 2 },
  ];

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#fff5cc] via-[#ffe88a] to-[#ffd95c] text-gray-800 overflow-hidden">
      
      {/* ☀️ نور طلایی بالا */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#fff8dc]/90 to-transparent z-[1] blur-2xl pointer-events-none" />

      {/* 🧬 DNA طلایی چرخان */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.svg
            key={i}
            viewBox="0 0 100 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute opacity-25"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              transformOrigin: "center",
            }}
            animate={{ rotate: [0, i % 2 === 0 ? 360 : -360] }}
            transition={{
              duration: 70 + Math.random() * 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <defs>
              <linearGradient id={`dnaGrad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffd700" />
                <stop offset="100%" stopColor="#b8860b" />
              </linearGradient>
            </defs>
            <path
              d="M30,10 C50,30 50,70 30,90 C10,110 10,150 30,170"
              stroke={`url(#dnaGrad-${i})`}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M70,10 C50,30 50,70 70,90 C90,110 90,150 70,170"
              stroke={`url(#dnaGrad-${i})`}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </motion.svg>
        ))}
      </div>

      {/* 🖼 قاب‌های خاطرات شناور */}
      {floatingFrames.map((frame) => (
        <motion.div
          key={frame.id}
          className="absolute w-36 h-44 bg-white/70 border-2 border-yellow-300 rounded-xl shadow-[0_0_25px_rgba(212,175,55,0.4)] overflow-hidden backdrop-blur-sm"
          style={{ top: frame.top, bottom: frame.bottom, left: frame.left, right: frame.right, rotate: frame.rotate }}
          animate={{
            y: [0, -15, 0],
            rotate: [frame.rotate, frame.rotate + 2, frame.rotate - 2, frame.rotate],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
            delay: frame.delay,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-yellow-50 flex items-center justify-center">
            <ImageIcon className="w-10 h-10 text-yellow-500 opacity-70" />
          </div>
        </motion.div>
      ))}

      {/* 📸 آیکون مرکزی */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="flex items-center justify-center w-32 h-32 rounded-full bg-white/70 backdrop-blur-md border border-yellow-300 shadow-[0_0_40px_rgba(212,175,55,0.5)] mb-6"
        >
          <ImageIcon className="w-16 h-16 text-yellow-600" />
        </motion.div>

        {/* ✨ متن مرکزی */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-yellow-700 drop-shadow-[0_0_10px_rgba(255,220,100,0.8)] mb-3">
          آلبوم خاطرات
        </h1>
        <p className="text-gray-700 text-sm sm:text-base mb-1">به زودی راه‌اندازی می‌شود...</p>
        <p className="text-yellow-600 font-semibold text-lg tracking-widest">
          Coming Soon ✨
        </p>
      </motion.div>

      {/* 🌟 درخشش طلایی نرم پشت آیکون */}
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-yellow-200/50 to-yellow-400/40 blur-3xl z-0"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }}
      />
    </main>
  );
}
