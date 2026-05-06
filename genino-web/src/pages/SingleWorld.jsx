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
  ArrowLeft,
} from "lucide-react";

import heroImg from "../assets/single-world/single-world-hero.png";

export default function SingleWorld() {
  const cards = [
    {
      title: "رشد فردی",
      desc: "شناخت خودت و ساختن نسخه بهتر",
      icon: Brain,
      link: "/articles/personal-growth-mastery",
    },
    {
      title: "سلامت من",
      desc: "پرونده پزشکی و چکاپ‌ها",
      icon: Stethoscope,
      link: "/my-doctor",
    },
    {
      title: "آرامش ذهنی",
      desc: "تعادل، تنفس و آرامش",
      icon: Heart,
      link: "/knowledge/mind-calm",
    },
    {
      title: "تناسب اندام",
      desc: "انرژی، حرکت و سبک زندگی فعال",
      icon: Dumbbell,
      link: "/articles/fitness-for-single-world",
    },
    {
      title: "کتاب و یادگیری",
      desc: "کتاب‌های الهام‌بخش و مهارتی",
      icon: BookOpen,
      link: "/articles/books-that-change-life",
    },
    {
      title: "موسیقی و انرژی مثبت",
      desc: "پلی‌لیست‌هایی برای حال بهتر",
      icon: Music,
      link: "/single-world/music",
    },
    {
      title: "الهام روزانه",
      desc: "شروع روز با انگیزه",
      icon: Sparkles,
      link: "/articles/daily-inspiration",
    },
    {
      title: "استراحت با قهوه",
      desc: "خلوت کوتاه با خودت",
      icon: Coffee,
      link: "/articles/coffee-break",
    },
    {
      title: "دنیای دانستنی‌ها",
      desc: "برای ذهن‌های کنجکاو",
      icon: Globe,
      link: "/world-knowledge",
    },
  ];

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#4a2f22] px-4 py-8 text-[#f8ead8]"
    >
      <section className="mx-auto max-w-6xl">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 overflow-hidden rounded-[2.2rem] bg-[#6b442e] shadow-2xl shadow-black/20"
        >
          <div className="grid items-center gap-4 md:grid-cols-2">
            <div className="p-7 sm:p-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f3d6ad]/15 px-4 py-2 text-xs font-semibold text-[#f3d6ad]">
                <Coffee className="h-4 w-4" />
                جهان مجردها
              </div>

              <h1 className="mb-4 text-3xl font-black leading-tight text-[#ffe8c8] sm:text-5xl">
                وقتشه با خودت
                <span className="block text-[#e8bd82]">رفیق‌تر بشی</span>
              </h1>

              <p className="max-w-md text-sm leading-8 text-[#f8ead8]/80">
                یک فضای گرم و مینیمال برای رشد فردی، آرامش، سلامت، یادگیری،
                موسیقی و لحظه‌های شخصی تو.
              </p>
            </div>

            <div className="relative h-72 md:h-[390px]">
              <img
                src={heroImg}
                alt="جهان مجردها"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-[#6b442e] via-[#6b442e]/20 to-transparent md:bg-gradient-to-r" />
            </div>
          </div>
        </motion.div>

        {/* CARDS */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {cards.map((card, i) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={card.link}
                  className="group block h-full rounded-3xl border border-[#e8bd82]/20 bg-[#fff4e6] p-4 text-[#4a2f22] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#fff8ef] hover:shadow-xl hover:shadow-black/15"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8bd82]/30">
                      <Icon className="h-5 w-5 text-[#8a5a35]" />
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4a2f22]/8 text-[#8a5a35] transition group-hover:bg-[#4a2f22] group-hover:text-[#ffe8c8]">
                      <ArrowLeft className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="mb-1 text-sm font-black sm:text-base">
                    {card.title}
                  </h3>

                  <p className="line-clamp-2 text-xs leading-6 text-[#7b5a43]">
                    {card.desc}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center text-xs leading-7 text-[#f8ead8]/70"
        >
          مجرد بودن یعنی یک فرصت آرام، شیک و واقعی برای ساختن خودت.
        </motion.p>
      </section>
    </main>
  );
}