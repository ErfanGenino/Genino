import DashboardLayout from "../../components/DashboardLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Heart,
  Users,
  Coffee,
  Leaf,
  CalendarHeart,
  DollarSign,
  Music,
  Apple,
  HandHeart,
  Sparkles,
} from "lucide-react";

export default function DashboardCouple() {
  const user = { name: "عرفان" }; // فعلاً فرضی

  const cards = [
    {
      title: "رابطه‌ی عاشقانه",
      desc: "راهکارهایی برای افزایش صمیمیت، عشق و آرامش در رابطه‌تون",
      icon: <Heart size={26} className="text-pink-500" />,
      highlight: true,
    },
    {
      title: "تفریحات دونفره",
      desc: "ایده‌هایی برای وقت‌گذرونی‌های خاص و خاطره‌انگیز دونفره",
      icon: <Coffee size={26} className="text-pink-500" />,
    },
    {
      title: "گفت‌وگوی سالم",
      desc: "یادگیری مهارت‌های گفت‌وگو و حل تعارض در رابطه",
      icon: <Users size={26} className="text-pink-500" />,
    },
    {
      title: "آرامش ذهنی و مدیتیشن",
      desc: "تمرین‌های ذهن‌آگاهی و آرامش برای هر دو نفر",
      icon: <Leaf size={26} className="text-pink-500" />,
    },
    {
      title: "اقتصاد مشترک",
      desc: "مدیریت بودجه، خرید و سرمایه‌گذاری به سبک زوج‌های موفق",
      icon: <DollarSign size={26} className="text-pink-500" />,
      link: "/family-finance",
    },
    {
      title: "تغذیه‌ی سالم زوجی",
      desc: "برنامه غذایی و کالری‌شمار ویژه زوج‌ها",
      icon: <Apple size={26} className="text-pink-500" />,
      link: "/calorie-tracker",
    },
    {
      title: "برنامه بارداری آینده",
      desc: "آمادگی جسمی و ذهنی برای ورود به دنیای والدگری",
      icon: <CalendarHeart size={26} className="text-pink-500" />,
    },
    {
      title: "مهربانی در رابطه",
      desc: "درس‌هایی از همدلی و درک متقابل برای روابط پایدار",
      icon: <HandHeart size={26} className="text-pink-500" />,
    },
    {
      title: "موسیقی و حس خوب",
      desc: "پلی‌لیست‌های مخصوص زوج‌ها برای لحظه‌های دونفره",
      icon: <Music size={26} className="text-pink-500" />,
    },
  ];

  return (
    <DashboardLayout title="داشبورد: زوج‌ها 💞">
      {/* 💕 خوش‌آمدگویی بالا */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl font-bold text-pink-600 mb-2">
          خوش اومدی {user.name} 💞
        </h2>
        <p className="text-gray-600 text-sm">
          عشق یعنی رشد دو نفره؛ اینجا جاییه برای رشد رابطه، آرامش و لبخندهای دونفره 🌸
        </p>
      </motion.div>

      {/* 💗 کارت‌ها */}
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
                    ? "bg-gradient-to-r from-pink-400 to-pink-300 border-pink-300 text-white shadow-[0_0_25px_rgba(255,150,200,0.7)] hover:shadow-[0_0_40px_rgba(255,150,200,0.9)]"
                    : "bg-gradient-to-b from-pink-50 to-pink-100 border-pink-200 hover:shadow-[0_0_20px_rgba(255,150,200,0.4)]"
                } hover:-translate-y-1`}
              >
                <div className="flex flex-col items-center gap-3 mb-2">
                  <div
                    className={`${
                      card.highlight
                        ? "bg-white/30"
                        : "bg-pink-100/80 border border-pink-200"
                    } p-3 rounded-full shadow-inner`}
                  >
                    {card.icon}
                  </div>
                  <h3
                    className={`font-semibold text-lg ${
                      card.highlight ? "text-white" : "text-pink-700"
                    }`}
                  >
                    {card.title}
                  </h3>
                </div>
                <p
                  className={`text-sm leading-relaxed ${
                    card.highlight ? "text-pink-50" : "text-gray-600"
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
        🌷 عشق واقعی یعنی رشد کردن در کنار کسی که به تو الهام می‌بخشه.
      </motion.div>
    </DashboardLayout>
  );
}
