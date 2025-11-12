import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const articles = [
  {
    id: 1,
    title: "ژن چیست و چگونه کار می‌کند؟",
    image: "/images/knowledge/genetics/1.jpg",
    slug: "what-is-gene",
  },
  {
    id: 2,
    title: "وراثت؛ شباهت یا تکرار؟",
    image: "/images/knowledge/genetics/2.jpg",
    slug: "inheritance",
  },
  {
    id: 3,
    title: "اپی‌ژنتیک؛ تأثیر احساس و رفتار بر ژن‌ها",
    image: "/images/knowledge/genetics/3.jpg",
    slug: "epigenetics",
  },
  {
    id: 4,
    title: "ژن‌های مثبت؛ شجاعت، عشق و زیبایی در DNA ما",
    image: "/images/knowledge/genetics/4.jpg",
    slug: "positive-genes",
  },
  {
    id: 5,
    title: "آینده ویرایش ژن‌ها؛ علم در مرز اخلاق",
    image: "/images/knowledge/genetics/5.jpg",
    slug: "gene-editing",
  },
  {
    id: 6,
    title: "وراثت و نیکی؛ مسئولیت انسان در برابر ژن‌ها",
    image: "/images/knowledge/genetics/6.jpg",
    slug: "genetic-ethics",
  },
  {
    id: 7,
    title: "راز تنوع انسان؛ چرا هیچ دو نفری یکسان نیستند؟",
    image: "/images/knowledge/genetics/7.jpg",
    slug: "genetic-diversity",
  },
  {
    id: 8,
    title: "از DNA تا احساس؛ علم و شعر درون ما",
    image: "/images/knowledge/genetics/8.jpg",
    slug: "dna-and-emotion",
  },
  {
    id: 9,
    title: "ژن و زیبایی؛ هماهنگی کدها و ظاهر",
    image: "/images/knowledge/genetics/9.jpg",
    slug: null,
  },
  {
    id: 10,
    title: "آیا ژن‌ها سرنوشت ما را تعیین می‌کنند؟",
    image: "/images/knowledge/genetics/10.jpg",
    slug: null,
  },
  {
    id: 11,
    title: "وراثت در احساسات و خلق‌و‌خو",
    image: "/images/knowledge/genetics/11.jpg",
    slug: null,
  },
  {
    id: 12,
    title: "آینده پزشکی ژنتیک در درمان بیماری‌ها",
    image: "/images/knowledge/genetics/12.jpg",
    slug: null,
  },
];

export default function GeneticSecrets() {
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
        راز ژن‌ها
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
