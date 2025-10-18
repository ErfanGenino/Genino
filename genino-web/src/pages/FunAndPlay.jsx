import React, { useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Film, Puzzle, Brain, Languages, Smile } from "lucide-react";

export default function FunAndPlay() {
  const [activeTab, setActiveTab] = useState("games");

  const games = [
    { id: 1, title: "پازل رنگ‌ها", category: "بازی آموزشی", icon: <Puzzle className="w-16 h-16 text-yellow-500" /> },
    { id: 2, title: "یادگیری اعداد", category: "تقویت حافظه", icon: <Brain className="w-16 h-16 text-yellow-500" /> },
    { id: 3, title: "چیدمان حیوانات", category: "شناختی", icon: <Smile className="w-16 h-16 text-yellow-500" /> },
  ];

  const videos = [
    { id: 1, title: "کارتون آموزش زبان انگلیسی", category: "آموزشی", icon: <Languages className="w-16 h-16 text-yellow-500" /> },
    { id: 2, title: "کارتون پرورش مهارت همکاری", category: "تربیتی", icon: <Brain className="w-16 h-16 text-yellow-500" /> },
    { id: 3, title: "انیمیشن احساسات من", category: "هیجانی", icon: <Smile className="w-16 h-16 text-yellow-500" /> },
  ];

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#f7f2eb] to-[#fffdf8] text-gray-800 flex flex-col items-center pt-28 px-6 relative overflow-hidden"
    >
      {/* 🌿 بک‌گراند DNA طلایی */}
      <div className="absolute inset-0 opacity-25 z-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.svg
            key={i}
            viewBox="0 0 100 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              transformOrigin: "center",
            }}
            animate={{ rotate: [0, i % 2 === 0 ? 360 : -360] }}
            transition={{ duration: 100 + i * 10, repeat: Infinity, ease: "linear" }}
          >
            <defs>
              <linearGradient id={`grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e2b744" />
                <stop offset="100%" stopColor="#c69a2c" />
              </linearGradient>
            </defs>
            <path
              d="M30,10 C50,30 50,70 30,90 C10,110 10,150 30,170"
              stroke={`url(#grad-${i})`}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M70,10 C50,30 50,70 70,90 C90,110 90,150 70,170"
              stroke={`url(#grad-${i})`}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </motion.svg>
        ))}
      </div>

      {/* 🎮 عنوان صفحه */}
      <h1 className="text-4xl font-extrabold text-yellow-700 mb-10 z-10 drop-shadow-md">
        🎮 بازی و سرگرمی ژنینو
      </h1>

      {/* 🟡 تب‌ها */}
      <div className="flex justify-center gap-4 mb-10 z-10">
        <button
          onClick={() => setActiveTab("games")}
          className={`flex items-center gap-2 px-6 py-2 rounded-xl font-semibold transition-all ${
            activeTab === "games"
              ? "bg-yellow-500 text-white shadow-lg"
              : "bg-white border border-yellow-300 text-yellow-700 hover:bg-yellow-50"
          }`}
        >
          <Gamepad2 className="w-5 h-5" />
          بازی‌ها
        </button>
        <button
          onClick={() => setActiveTab("videos")}
          className={`flex items-center gap-2 px-6 py-2 rounded-xl font-semibold transition-all ${
            activeTab === "videos"
              ? "bg-yellow-500 text-white shadow-lg"
              : "bg-white border border-yellow-300 text-yellow-700 hover:bg-yellow-50"
          }`}
        >
          <Film className="w-5 h-5" />
          فیلم و کارتون
        </button>
      </div>

      {/* 🔸 محتوای تب‌ها */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl z-10"
      >
        {(activeTab === "games" ? games : videos).map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.04 }}
            className="bg-white rounded-3xl shadow-lg overflow-hidden border border-yellow-200 cursor-pointer hover:shadow-xl transition-all flex flex-col items-center justify-center py-10"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="font-bold text-yellow-700">{item.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{item.category}</p>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
