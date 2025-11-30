// 📄 src/pages/knowledge/FamilyRelationsKnowledge.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const articles = [
  {
    id: 1,
    title: "احترام متقابل زن و مرد؛ پایه‌ای‌ترین رکن خانواده",
    image: "/images/knowledge/family/1.jpg",
    slug: "family-relations/mutual-respect-in-marriage",
  },
  {
    id: 2,
    title: "نحوه صحیح گفتگو در خانواده",
    image: "/images/knowledge/family/2.jpg",
    slug: "family-relations/healthy-family-communication",
  },
  {
    id: 3,
    title: "درک نیازهای احساسی همسر",
    image: "/images/knowledge/family/3.jpg",
    slug: "family-relations/emotional-needs-of-spouse",
  },
  {
    id: 4,
    title: "چگونه اختلافات کوچک را بدون تنش حل کنیم؟",
    image: "/images/knowledge/family/4.jpg",
    slug: "family-relations/resolve-minor-conflicts",
  },
  {
    id: 5,
    title: "نقش اعتماد در امنیت روانی زن و مرد",
    image: "/images/knowledge/family/5.jpg",
    slug: "family-relations/role-of-trust-in-emotional-security",
  },
  {
    id: 6,
    title: "محبت روزانه؛ سوخت اصلی رابطه سالم",
    image: "/images/knowledge/family/6.jpg",
    slug: "family-relations/daily-affection-as-relationship-fuel",
  },
  {
    id: 7,
    title: "وظایف و نقش‌ها در خانواده مدرن",
    image: "/images/knowledge/family/7.jpg",
    slug: "family-relations/roles-and-responsibilities-in-modern-family",
  },
  {
    id: 8,
    title: "چگونه از همسرمان حمایت عاطفی کنیم؟",
    image: "/images/knowledge/family/8.jpg",
    slug: "family-relations/how-to-provide-emotional-support",
  },
  {
    id: 9,
    title: "هشدارهای رفتاری که باید جدی گرفته شوند",
    image: "/images/knowledge/family/9.jpg",
    slug: "family-relations/behavioral-red-flags",
  },
  {
    id: 10,
    title: "مدیریت خشم در رابطه زوجین",
    image: "/images/knowledge/family/10.jpg",
    slug: "family-relations/anger-management-in-relationships",
  },
  {
    id: 11,
    title: "چگونه رابطه زن و شوهر بر رشد کودک اثر می‌گذارد؟",
    image: "/images/knowledge/family/11.jpg",
    slug: "family-relations/how-parental-relationship-affects-child-development",
  },
  {
    id: 12,
    title: "اشتباهات رایج زوجین که باید از آن‌ها دوری کرد",
    image: "/images/knowledge/family/12.jpg",
    slug: "family-relations/common-relationship-mistakes-couples-should-avoid",
  },
];

export default function FamilyRelationsKnowledge() {
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
        رفتار متقابل زن و مرد در خانه
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
              <div className="h-44 overflow-hidden">
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
            <Link key={a.id} to={path}>
              {Card}
            </Link>
          ) : (
            <div
              key={a.id}
              className="flex flex-col justify-between bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-md border border-yellow-100 h-[290px] opacity-70 cursor-default"
            >
              <div className="h-44 overflow-hidden">
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
