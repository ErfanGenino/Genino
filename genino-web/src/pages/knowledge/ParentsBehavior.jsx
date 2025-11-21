import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const articles = [
  {
    id: 1,
    title: "بازی آزاد، مهم‌ترین لحظه‌های یادگیری بدون آموزش",
    image: "/images/knowledge/parentsbehavior/1.jpg",
    slug: "freeplay",
  },
  {
    id: 2,
    title: "ژن‌های طلایی کودکی؛ ۳ ژن اثرگذار در یادگیری و خلق‌وخو",
    image: "/images/knowledge/parentsbehavior/2.jpg",
    slug: "golden-child-genes",
  },
  {
    id: 3,
    title: "ژن‌های مرتبط با هوش کودکان، حافظه، یادگیری و تمرکز",
    image: "/images/knowledge/parentsbehavior/3.jpg",
    slug: "child-intelligence-genes",
  },
  {
    id: 4,
    title: "محبت بدون شرط؛ راز امنیت روانی کودک",
    image: "/images/knowledge/parentsbehavior/4.jpg",
  },
  {
    id: 5,
    title: "چطور با ترس‌ها و اضطراب کودک کنار بیایم؟",
    image: "/images/knowledge/parentsbehavior/5.jpg",
  },
  {
    id: 6,
    title: "الگوی رفتاری والدین در خانه",
    image: "/images/knowledge/parentsbehavior/6.jpg",
  },
  {
    id: 7,
    title: "تشویق هوشمندانه؛ مرز بین انگیزه و وابستگی",
    image: "/images/knowledge/parentsbehavior/7.jpg",
  },
  {
    id: 8,
    title: "احترام متقابل در گفت‌وگو با کودک",
    image: "/images/knowledge/parentsbehavior/8.jpg",
  },
  {
    id: 9,
    title: "نقش پدر در رشد هیجانی فرزند",
    image: "/images/knowledge/parentsbehavior/9.jpg",
  },
  {
    id: 10,
    title: "مدیریت خشم والدین هنگام تربیت کودک",
    image: "/images/knowledge/parentsbehavior/10.jpg",
  },
  {
    id: 11,
    title: "چطور اعتماد کودک را حفظ کنیم؟",
    image: "/images/knowledge/parentsbehavior/11.jpg",
  },
  {
    id: 12,
    title: "زمانِ با کیفیت؛ مهم‌تر از زمان زیاد",
    image: "/images/knowledge/parentsbehavior/12.jpg",
  },
];

export default function ParentsBehavior() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#fff9e6] to-[#fff4cc] text-gray-800 pt-24 px-6 flex flex-col items-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl font-extrabold text-yellow-700 mb-10 text-center"
      >
        رفتار والدین با کودکان
      </motion.h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl pb-20">
        {articles.map((a) => {
          const isActive = Boolean(a.slug);
          const path = isActive ? `/articles/${a.slug}` : null;

          return isActive ? (
            <Link key={a.id} to={path} className="block">
              <motion.div
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 20px rgba(212,175,55,0.4)",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-md border border-yellow-100 cursor-pointer hover:shadow-lg"
              >
                <div className="h-48 sm:h-40 md:h-44 overflow-hidden">
                  <img
                    src={a.image}
                    alt={a.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 text-center">
                  <h2 className="text-sm sm:text-base font-semibold text-gray-700 leading-snug">
                    {a.title}
                  </h2>
                </div>
              </motion.div>
            </Link>
          ) : (
            <div
              key={a.id}
              className="bg-white/70 backdrop-blur-md rounded-3xl overflow-hidden shadow-md border border-yellow-100 opacity-50 cursor-default"
            >
              <div className="h-48 sm:h-40 md:h-44 overflow-hidden">
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-full object-cover opacity-70"
                />
              </div>
              <div className="p-4 text-center">
                <h2 className="text-sm sm:text-base font-semibold text-gray-500 leading-snug">
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
