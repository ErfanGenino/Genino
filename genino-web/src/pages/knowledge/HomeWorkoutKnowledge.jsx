// 📄 src/pages/knowledge/HomeWorkoutKnowledge.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const articles = [
  {
    id: 1,
    title: "ورزش در خانه بدون تجهیزات",
    image: "/images/knowledge/home-workout/1.jpg",
    slug: "home-workout/no-equipment",
  },
  {
    id: 2,
    title: "تمرین‌های ساده روزانه برای والدین پرمشغله",
    image: "/images/knowledge/home-workout/2.jpg",
    slug: "home-workout/daily-workouts-for-busy-parents",
  },
  {
    id: 3,
    title: "ورزش‌های مناسب برای شروع دوباره",
    image: "/images/knowledge/home-workout/13.jpg",
    slug: "home-workout/restarting",
  },
  {
    id: 4,
    title: "تمرین‌های کششی برای کاهش دردهای عضلانی",
    image: "/images/knowledge/home-workout/4.jpg",
    slug: "home-workout/stretching-for-muscle-pain",
  },
  {
    id: 5,
    title: " ورزش‌های مناسب برای چربی‌سوزی در خانه",
    image: "/images/knowledge/home-workout/5.jpg",
    slug: "home-workout/fat-burning",
  },
  {
    id: 6,
    title: " ورزش‌های مناسب برای کمردرد",
    image: "/images/knowledge/home-workout/6.jpg",
    slug: "home-workout/back-pain",
  },
  {
    id: 7,
    title: "ورزش‌های مناسب فضای کوچک",
    image: "/images/knowledge/home-workout/7.jpg",
    slug: "home-workout/small-space-exercises",
  },
  {
    id: 8,
    title: "تمرین‌های خانگی برای تقویت عضلات",
    image: "/images/knowledge/home-workout/8.jpg",
    slug: "home-workout/muscle-strengthening",
  },
  {
    id: 9,
    title: "ورزش در خانه برای کاهش استرس",
    image: "/images/knowledge/home-workout/9.jpg",
    slug: "home-workout/stress-relief",
  },
  {
    id: 10,
    title: "تمرین‌های صبحگاهی در خانه",
    image: "/images/knowledge/home-workout/10.jpg",
    slug: "home-workout/morning-workout",
  },
  {
    id: 11,
    title: "ورزش در خانه بدون آسیب",
    image: "/images/knowledge/home-workout/11.jpg",
    slug: "home-workout/safe-exercises",
  },
  {
    id: 12,
    title: "۵ قانون طلایی ورزش در خانه",
    image: "/images/knowledge/home-workout/12.jpg",
    slug: "home-workout/five-golden-rules",
  },
];

export default function HomeWorkoutKnowledge() {
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
        ورزش در خانه
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
