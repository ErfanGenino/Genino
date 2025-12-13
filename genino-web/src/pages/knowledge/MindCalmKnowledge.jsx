// 📄 src/pages/knowledge/MindCalmKnowledge.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const articles = [
  {
    id: 1,
    title: "مدیتیشن چیست و چگونه به آرامش ذهن کمک می‌کند؟",
    image: "/images/knowledge/mind-calm/1.jpg",
    slug: "mind-calm/what-is-meditation",
  },
  {
    id: 2,
    title: "تمرین‌های تنفس برای کاهش استرس روزانه",
    image: "/images/knowledge/mind-calm/2.jpg",
    slug: "mind-calm/breathing-exercises",
  },
  {
    id: 3,
    title: "مدیتیشن برای والدین پرمشغله",
    image: "/images/knowledge/mind-calm/3.jpg",
    slug: "mind-calm/meditation-for-parents",
  },
  {
    id: 4,
    title: "آرام‌سازی ذهن قبل از خواب",
    image: "/images/knowledge/mind-calm/4.jpg",
    slug: "mind-calm/before-sleep-calm",
  },
  {
    id: 5,
    title: "تأثیر آرامش روان والدین بر رشد کودک",
    image: "/images/knowledge/mind-calm/5.jpg",
    slug: "mind-calm/parent-calm-child-growth",
  },
  {
    id: 6,
    title: "مدیتیشن کوتاه ۵ دقیقه‌ای در خانه",
    image: "/images/knowledge/mind-calm/6.jpg",
    slug: "mind-calm/5-minute-meditation",
  },
  {
    id: 7,
    title: "ذهن‌آگاهی (Mindfulness) در زندگی روزمره",
    image: "/images/knowledge/mind-calm/7.jpg",
    slug: "mind-calm/mindfulness-daily-life",
  },
  {
    id: 8,
    title: "کاهش اضطراب با تمرین‌های ساده ذهنی",
    image: "/images/knowledge/mind-calm/8.jpg",
    slug: "mind-calm/reduce-anxiety",
  },
  {
    id: 9,
    title: "آرامش ذهن در شرایط بحرانی",
    image: "/images/knowledge/mind-calm/9.jpg",
    slug: "mind-calm/calm-in-crisis",
  },
  {
    id: 10,
    title: "تأثیر مدیتیشن بر تمرکز و تصمیم‌گیری",
    image: "/images/knowledge/mind-calm/10.jpg",
    slug: "mind-calm/meditation-focus",
  },
  {
    id: 11,
    title: "مدیریت افکار منفی با تمرین ذهن",
    image: "/images/knowledge/mind-calm/11.jpg",
    slug: "mind-calm/negative-thoughts-control",
  },
  {
    id: 12,
    title: "۵ تمرین ساده برای آرامش فوری ذهن",
    image: "/images/knowledge/mind-calm/12.jpg",
    slug: "mind-calm/five-quick-calm-exercises",
  },
];

export default function MindCalmKnowledge() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#fff9e6] to-[#fff4cc] text-gray-800 pt-24 px-6 flex flex-col items-center"
    >
      {/* 🔸 تیتر صفحه */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl font-extrabold text-yellow-700 mb-10 text-center"
      >
        آرامش ذهن و روان (مدیتیشن)
      </motion.h1>

      {/* 🔹 کارت‌ها */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl pb-20">
        {articles.map((a) => {
          const path = a.slug ? `/articles/${a.slug}` : null;

          const Card = (
            <motion.div
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 20px rgba(212,175,55,0.4)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="flex flex-col justify-between bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-md border border-yellow-100 h-[290px] cursor-pointer hover:shadow-lg"
            >
              <div className="h-44 overflow-hidden flex-shrink-0">
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 text-center flex-grow flex items-center justify-center">
                <h2 className="text-sm sm:text-base font-semibold text-gray-700 leading-snug line-clamp-2">
                  {a.title}
                </h2>
              </div>
            </motion.div>
          );

          return path ? (
            <Link key={a.id} to={path} className="block">
              {Card}
            </Link>
          ) : (
            <div
              key={a.id}
              className="flex flex-col justify-between bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-md border border-yellow-100 h-[290px] opacity-70 cursor-default"
            >
              <div className="h-44 overflow-hidden flex-shrink-0">
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <div className="p-4 text-center flex-grow flex items-center justify-center">
                <h2 className="text-sm sm:text-base font-semibold text-gray-500 leading-snug line-clamp-2">
                  {a.title}
                </h2>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
