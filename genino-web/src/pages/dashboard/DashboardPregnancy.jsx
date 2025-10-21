import DashboardLayout from "../../components/DashboardLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Baby,
  Heart,
  Leaf,
  CalendarDays,
  Stethoscope,
  Apple,
  BookOpen,
  Sparkles,
  HandHeart,
  CloudSun,
} from "lucide-react";

export default function DashboardPregnancy() {
  const user = { name: "فرناز" }; // فعلاً فرضی

  const cards = [
    {
      title: "رشد هفته‌به‌هفته جنین",
      desc: "مشاهده تغییرات جنین و بدن در هر هفته بارداری",
      icon: <Baby size={26} className="text-yellow-600" />,
      highlight: true,
    },
    {
      title: "سلامت مادر",
      desc: "پیگیری وضعیت جسمی، تغذیه و خواب مادر در دوران بارداری",
      icon: <Heart size={26} className="text-yellow-600" />,
    },
    {
      title: "تغذیه دوران بارداری",
      desc: "خوراکی‌های مفید و برنامه‌ی تغذیه‌ی مناسب هر ماه",
      icon: <Apple size={26} className="text-yellow-600" />,
      link: "/calorie-tracker",
    },
    {
      title: "تمرین‌های آرامش و تنفس",
      desc: "مدیتیشن و تمرین‌های ملایم مخصوص مادران باردار",
      icon: <Leaf size={26} className="text-yellow-600" />,
    },
    {
      title: "ویزیت‌ها و سونوگرافی‌ها",
      desc: "یادآوری زمان مراجعه‌ها و پیگیری نتایج سونوگرافی",
      icon: <Stethoscope size={26} className="text-yellow-600" />,
    },
    {
      title: "آمادگی برای زایمان",
      desc: "آموزش و برنامه‌ریزی ذهنی و فیزیکی برای روز بزرگ",
      icon: <CalendarDays size={26} className="text-yellow-600" />,
    },
    {
      title: "یادداشت‌های بارداری من",
      desc: "ثبت احساسات، لحظه‌ها و عکس‌های خاص دوران بارداری",
      icon: <BookOpen size={26} className="text-yellow-600" />,
      link: "/memory-album",
    },
    {
      title: "پیوند عاطفی با جنین",
      desc: "موسیقی، گفت‌وگو و لمس‌های محبت‌آمیز برای ارتباط با نوزاد",
      icon: <HandHeart size={26} className="text-yellow-600" />,
    },
    {
      title: "الهام مادرانه",
      desc: "نقل‌قول‌ها و داستان‌های الهام‌بخش از مادران دیگر",
      icon: <Sparkles size={26} className="text-yellow-600" />,
    },
  ];

  return (
    <DashboardLayout title="داشبورد: در انتظار فرزند 🌼">
      {/* 💛 خوش‌آمدگویی بالا */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl font-bold text-yellow-700 mb-2">
          خوش اومدی {user.name} 🌿
        </h2>
        <p className="text-gray-600 text-sm">
          دوران بارداری سفریه از عشق و انتظار؛ هر روزش هدیه‌ای برای خلق زندگیه 💛
        </p>
      </motion.div>

      {/* 🌸 کارت‌ها */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
        {cards.map((card, i) => {
          const CardTag = card.link ? Link : "div";
          const cardProps = card.link ? { to: card.link } : {};

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <CardTag
                {...cardProps}
                className={`block rounded-2xl p-6 border transition-all duration-300 ${
                  card.highlight
                    ? "bg-gradient-to-r from-yellow-300 to-yellow-200 border-yellow-300 text-white shadow-[0_0_25px_rgba(255,220,100,0.7)] hover:shadow-[0_0_40px_rgba(255,220,100,0.9)]"
                    : "bg-gradient-to-b from-yellow-50 to-yellow-100 border-yellow-200 hover:shadow-[0_0_20px_rgba(255,220,100,0.4)]"
                } hover:-translate-y-1`}
              >
                <div className="flex flex-col items-center gap-3 mb-2">
                  <div
                    className={`${
                      card.highlight
                        ? "bg-white/30"
                        : "bg-yellow-100/80 border border-yellow-200"
                    } p-3 rounded-full shadow-inner`}
                  >
                    {card.icon}
                  </div>
                  <h3
                    className={`font-semibold text-lg ${
                      card.highlight ? "text-white" : "text-yellow-700"
                    }`}
                  >
                    {card.title}
                  </h3>
                </div>
                <p
                  className={`text-sm leading-relaxed ${
                    card.highlight ? "text-yellow-50" : "text-gray-600"
                  }`}
                >
                  {card.desc}
                </p>
              </CardTag>
            </motion.div>
          );
        })}
      </div>

      {/* 🌷 جمله الهام‌بخش پایین */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center text-gray-500 text-sm italic"
      >
        🌷 هر تپش قلب کوچولوت یادآور عشقیه که داره بزرگ می‌شه درونت.
      </motion.div>
    </DashboardLayout>
  );
}
