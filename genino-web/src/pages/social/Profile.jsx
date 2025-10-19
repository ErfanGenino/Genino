import React from "react";
import { motion } from "framer-motion";
import { User, Mail, MapPin, Calendar, Edit, LogOut } from "lucide-react";

export default function Profile() {
  const user = {
    name: "کاربر ژنینو",
    email: "user@genino.com",
    age: 32,
    city: "تهران",
    joinDate: "۱۴۰۳/۰۲/۱۵",
    avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png", // آواتار ساده طلایی
  };

  return (
    <main
      dir="rtl"
      className="relative min-h-screen bg-gradient-to-b from-[#fffaf0] via-[#fff3d8] to-[#fff0c4] text-gray-800 flex flex-col items-center pt-28 px-4 overflow-hidden"
    >
      {/* ☀️ افکت نور طلایی بالا */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#fff8dc]/90 to-transparent blur-3xl"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />

      {/* 🧑‍🎨 هدر پروفایل */}
      <motion.div
        className="flex flex-col items-center mb-10 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="relative w-32 h-32 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-[0_0_50px_rgba(212,175,55,0.4)] border-4 border-yellow-200 overflow-hidden flex items-center justify-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <img
            src={user.avatar}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <h1 className="mt-5 text-3xl font-extrabold text-yellow-700 drop-shadow-[0_0_10px_rgba(255,220,120,0.7)]">
          {user.name}
        </h1>
        <p className="text-sm text-gray-500 mt-1">عضو خانواده ژنینو 💛</p>
      </motion.div>

      {/* 🧾 کارت اطلاعات */}
      <motion.div
        className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-[0_0_25px_rgba(212,175,55,0.1)] border border-yellow-200 w-full max-w-lg p-8 text-right space-y-4 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <InfoRow icon={<Mail />} label="ایمیل" value={user.email} />
        <InfoRow icon={<Calendar />} label="سن" value={`${user.age} سال`} />
        <InfoRow icon={<MapPin />} label="شهر" value={user.city} />
        <InfoRow icon={<User />} label="تاریخ عضویت" value={user.joinDate} />
      </motion.div>

      {/* 🔘 دکمه‌ها */}
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md hover:from-yellow-600 hover:to-yellow-500 transition"
        >
          <Edit className="w-4 h-4" />
          ویرایش پروفایل
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-white text-yellow-600 border border-yellow-300 font-semibold px-6 py-2.5 rounded-xl shadow-sm hover:bg-yellow-50 transition"
        >
          <LogOut className="w-4 h-4" />
          خروج از حساب
        </motion.button>
      </motion.div>

      {/* ✨ ذرات طلایی */}
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

/* 💎 کامپوننت اطلاعات */
function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-yellow-100 pb-2">
      <div className="flex items-center gap-2 text-yellow-600">
        <span className="p-1 bg-yellow-100 rounded-lg">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <p className="text-gray-700 text-sm">{value}</p>
    </div>
  );
}
