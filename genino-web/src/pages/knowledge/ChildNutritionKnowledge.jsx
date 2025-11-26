// 📄 src/pages/knowledge/ChildNutritionKnowledge.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const articles = [
  {
    id: 1,
    title: "تغذیه کودکان ۰ تا ۲ سال",
    image: "/images/knowledge/nutrition/1.jpg",
    slug: null,
  },
  {
    id: 2,
    title: "غذاهای مفید برای رشد مغز کودک",
    image: "/images/knowledge/nutrition/2.jpg",
    slug: null,
  },
  {
    id: 3,
    title: "غذاهای ممنوعه برای کودکان زیر ۵ سال",
    image: "/images/knowledge/nutrition/3.jpg",
    slug: null,
  },
  {
    id: 4,
    title: "مواد مغذی ضروری برای تمرکز و یادگیری",
    image: "/images/knowledge/nutrition/4.jpg",
    slug: null,
  },
  {
    id: 5,
    title: "تغذیه و ایمنی بدن کودک",
    image: "/images/knowledge/nutrition/5.jpg",
    slug: null,
  },
  {
    id: 6,
    title: "بشقاب غذایی سالم برای کودکان",
    image: "/images/knowledge/nutrition/6.jpg",
    slug: null,
  },
  {
    id: 7,
    title: "ویتامین‌های حیاتی برای رشد سالم کودک",
    image: "/images/knowledge/nutrition/7.jpg",
    slug: null,
  },
  {
    id: 8,
    title: "چاقی کودکان؛ پیشگیری و راهکارهای علمی",
    image: "/images/knowledge/nutrition/8.jpg",
    slug: null,
  },
  {
    id: 9,
    title: "بدغذایی کودکان؛ چرا و چگونه؟",
    image: "/images/knowledge/nutrition/9.jpg",
    slug: null,
  },
  {
    id: 10,
    title: "تأثیر خواب و تغذیه بر رشد کودک",
    image: "/images/knowledge/nutrition/10.jpg",
    slug: null,
  },
  {
    id: 11,
    title: "نقش پروتئین در ساخت عضله و رشد کودک",
    image: "/images/knowledge/nutrition/11.jpg",
    slug: null,
  },
  {
    id: 12,
    title: "۵ قانون طلایی تغذیه سالم کودک",
    image: "/images/knowledge/nutrition/12.jpg",
    slug: null,
  },
];

export default function ChildNutritionKnowledge() {
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
        تغذیه کودکان
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
