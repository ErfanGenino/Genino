import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "./assets/logo-genino.png";

export default function SignupStart() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-gray-800 overflow-hidden bg-gradient-to-b from-[#fff8e1] via-[#fff4cc] to-[#ffeaa7]">
      {/* ☀️ هاله‌ی نور طلایی بالای صفحه */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-yellow-200/70 via-yellow-100/30 to-transparent blur-3xl"
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />

      {/* ✨ حلقه‌های طلایی درخشان در پس‌زمینه */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-yellow-300/60"
          style={{
            width: `${180 + i * 150}px`,
            height: `${180 + i * 150}px`,
            top: `${20 + i * 5}%`,
            left: `${10 + i * 10}%`,
            opacity: 0.15,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.05, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 25 + i * 8,
            ease: "linear",
          }}
        />
      ))}

      {/* 🌟 ذرات طلایی شناور */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(255,215,0,0.8)]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* لوگو و عنوان */}
      <motion.div
        className="flex flex-col items-center mb-12 z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src={logo}
          alt="Genino Logo"
          className="w-28 h-28 mb-5 drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]"
        />
        <h1 className="text-4xl font-extrabold text-yellow-700 mb-2 tracking-tight drop-shadow-[0_0_12px_rgba(255,220,100,0.4)]">
          ثبت‌نام در ژنینو 🌿
        </h1>
        <p className="text-gray-700 text-sm sm:text-base">
          لطفاً نوع ثبت‌نام خود را انتخاب کنید
        </p>
      </motion.div>

      {/* گزینه‌های ثبت‌نام */}
      <motion.div
        className="flex flex-col gap-4 w-full max-w-xs z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
      >
        <Link
          to="/signup-user"
          className="text-center bg-gradient-to-r from-yellow-500 to-yellow-400 text-white py-3 rounded-2xl hover:from-yellow-600 hover:to-yellow-500 transition-all shadow-lg shadow-yellow-300/40 font-semibold backdrop-blur-sm"
        >
          ثبت‌نام به عنوان کاربر ژنینو 👨‍👩‍👧
        </Link>

        <Link
          to="/signup-vendor"
          className="text-center bg-white/80 text-yellow-700 border border-yellow-300 py-3 rounded-2xl hover:bg-yellow-50 hover:shadow-md transition-all font-semibold backdrop-blur-sm"
        >
          ثبت‌نام به عنوان ارائه‌دهنده کالا یا خدمت 🛍️
        </Link>
      </motion.div>

      {/* 🔶 خط تزئینی پایین */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-yellow-200/60 via-transparent to-transparent"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
    </main>
  );
}
