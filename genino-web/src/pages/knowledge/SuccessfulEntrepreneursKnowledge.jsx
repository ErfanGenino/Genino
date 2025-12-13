// 📄 src/pages/knowledge/SuccessfulEntrepreneursKnowledge.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const articles = [
  {
    id: 1,
    title: "مسیر کارآفرینی از صفر تا اولین موفقیت",
    image: "/images/knowledge/entrepreneurs/1.jpg",
    slug: "entrepreneurs/from-zero-to-first-success",
  },
  {
    id: 2,
    title: "ذهنیت کارآفرینان موفق چیست؟",
    image: "/images/knowledge/entrepreneurs/2.jpg",
    slug: "entrepreneurs/entrepreneur-mindset",
  },
  {
    id: 3,
    title: "شکست در کارآفرینی؛ پایان یا شروع؟",
    image: "/images/knowledge/entrepreneurs/3.jpg",
    slug: "entrepreneurs/failure-or-beginning",
  },
  {
    id: 4,
    title: "مدیریت ریسک در مسیر کسب‌وکار",
    image: "/images/knowledge/entrepreneurs/4.jpg",
    slug: "entrepreneurs/risk-management",
  },
  {
    id: 5,
    title: "کارآفرینان موفق چگونه تصمیم می‌گیرند؟",
    image: "/images/knowledge/entrepreneurs/5.jpg",
    slug: "entrepreneurs/decision-making",
  },
  {
    id: 6,
    title: "ایده خوب یا اجرای قوی؟",
    image: "/images/knowledge/entrepreneurs/6.jpg",
    slug: "entrepreneurs/idea-vs-execution",
  },
  {
    id: 7,
    title: "نقش نظم شخصی در موفقیت کارآفرینان",
    image: "/images/knowledge/entrepreneurs/7.jpg",
    slug: "entrepreneurs/personal-discipline",
  },
  {
    id: 8,
    title: "داستان کارآفرینانی که دیر شروع کردند",
    image: "/images/knowledge/entrepreneurs/8.jpg",
    slug: "entrepreneurs/late-starters",
  },
  {
    id: 9,
    title: "چگونه از کارمندی به کارآفرینی برسیم؟",
    image: "/images/knowledge/entrepreneurs/9.jpg",
    slug: "entrepreneurs/employee-to-entrepreneur",
  },
  {
    id: 10,
    title: "کارآفرینی و تعادل بین کار و زندگی",
    image: "/images/knowledge/entrepreneurs/10.jpg",
    slug: "entrepreneurs/work-life-balance",
  },
  {
    id: 11,
    title: "اشتباهات رایج کارآفرینان تازه‌کار",
    image: "/images/knowledge/entrepreneurs/11.jpg",
    slug: "entrepreneurs/common-mistakes",
  },
  {
    id: 12,
    title: "۵ اصل طلایی موفقیت در کارآفرینی",
    image: "/images/knowledge/entrepreneurs/12.jpg",
    slug: "entrepreneurs/five-golden-principles",
  },
];

export default function SuccessfulEntrepreneursKnowledge() {
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
        کارآفرینان موفق
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
