// src/pages/SingleWorld.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain,
  Heart,
  BookOpen,
  Music,
  Dumbbell,
  Coffee,
  Sparkles,
  Stethoscope,
  Globe,
} from "lucide-react";

export default function SingleWorld() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 text-gray-800 px-6 py-12 flex flex-col items-center"
    >
      {/* 💙 عنوان صفحه */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-bold text-sky-700 mb-2">
          دنیای مجردها 🌊
        </h1>
        <p className="text-gray-600 text-sm">
          فضایی برای رشد فردی، آرامش ذهن، سلامت و شادی در مسیر زندگی 🌿
        </p>
      </motion.div>

      {/* 🌿 کارت‌ها */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center max-w-5xl w-full">
        {[
          {
            title: "رشد فردی",
            desc: "افزایش تمرکز و شناخت خودت",
            icon: <Brain className="w-6 h-6 text-sky-600" />,
            link: "/articles/personal-growth-mastery",
          },
          {
            title: "سلامت من",
            desc: "مدیریت پرونده‌های پزشکی و چکاپ‌ها",
            icon: <Stethoscope className="w-6 h-6 text-sky-600" />,
            link: "/my-doctor",
          },
          {
            title: "آرامش ذهنی",
            desc: "مدیتیشن و آرام‌سازی ذهن برای تعادل روحی",
            icon: <Heart className="w-6 h-6 text-sky-600" />,
            link: "/knowledge/mind-calm",
          },
          {
            title: "تناسب اندام",
            desc: "برنامه‌های ورزشی برای تقویت جسم و ذهن",
            icon: <Dumbbell className="w-6 h-6 text-sky-600" />,
            link: "/articles/fitness-for-single-world",
          },
          {
            title: "کتاب و یادگیری",
            desc: "مطالعه‌ی کتاب‌های الهام‌بخش و مهارتی",
            icon: <BookOpen className="w-6 h-6 text-sky-600" />,
            link: "/articles/books-that-change-life",
          },
          {
            title: "موسیقی و انرژی مثبت",
            desc: "گوش دادن به پلی‌لیست‌های آرامش‌بخش",
            icon: <Music className="w-6 h-6 text-sky-600" />,
            link: "/single-world/music",
          },
          {
            title: "الهام روزانه",
            desc: "جملات انگیزشی برای شروع روزی بهتر",
            icon: <Sparkles className="w-6 h-6 text-sky-600" />,
            link: "/articles/daily-inspiration",
          },
          {
            title: "استراحت با قهوه",
            desc: "لحظه‌هایی برای تفکر و خلوت با خودت",
            icon: <Coffee className="w-6 h-6 text-sky-600" />,
            link: "/articles/coffee-break",
          },
          {
            title: "دنیای دانستنی‌ها",
            desc: "مطالب علمی و جالب برای ذهن‌های کنجکاو",
            icon: <Globe className="w-6 h-6 text-sky-600" />,
            link: "/world-knowledge",
          },
        ].map((card, i) => {
          const CardTag = card.link ? Link : "div";
          const props = card.link ? { to: card.link } : {};
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <CardTag
                {...props}
                className="block bg-white rounded-2xl p-6 border border-blue-200 
                           shadow-sm hover:shadow-lg hover:-translate-y-1 
                           transition-all duration-300"
              >
                <div className="flex flex-col items-center gap-2 mb-2">
                  <div className="p-3 bg-blue-100 rounded-full">{card.icon}</div>
                  <h3 className="font-semibold text-sky-700">{card.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{card.desc}</p>
              </CardTag>
            </motion.div>
          );
        })}
      </div>

      {/* 🌸 جمله الهام‌بخش پایین */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-12 text-center text-gray-500 italic text-sm"
      >
        💙 مجرد بودن یعنی فرصت ساختن قوی‌ترین نسخه از خودت.
      </motion.p>
    </main>
  );
}
