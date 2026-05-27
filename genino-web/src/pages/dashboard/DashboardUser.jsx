import DashboardLayout from "@components/Dashboard/DashboardLayout";
import LifeStageSwitcher from "@components/Dashboard/LifeStageSwitcher";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Brain,
  Heart,
  Stars,
  Sparkles,
  Search,
  Lightbulb,
  User,
  Apple,
} from "lucide-react";

export default function DashboardUser() {
  let user = null;

try {
  const storedUser = localStorage.getItem("genino_user");
  user = storedUser ? JSON.parse(storedUser) : null;
} catch (error) {
  user = null;
}



  const cards = [
    {
      title: "دانشنامه ژنینو",
      desc: "صدها مقاله علمی و ژنینویی برای رشد و آگاهی",
      icon: <BookOpen size={26} className="text-stone-600" />,
      link: "/world-knowledge",
      highlight: true,
    },
    {
      title: "کالری‌شمار",
      desc: "مدیریت تغذیه و وزن به روش ژنینو",
      icon: <Apple size={26} className="text-yellow-600" />,
      link: "/calorie-tracker",
    },
    {
      title: "پزشک من",
      desc: "مدیریت پرونده‌ها، نسخه‌ها و آزمایش‌های پزشکی",
      icon: <Heart size={26} className="text-yellow-600" />,
      link: "/my-doctor",
    },
    {
      title: "هوش عاطفی",
      desc: "مدیریت احساسات، آرامش و تصمیم‌گیری بهتر",
      icon: <Lightbulb size={26} className="text-yellow-600" />,
      link: "/emotional-intelligence",
    },
    {
      title: "الهام روزانه",
      desc: "جملات و تمرین‌های انرژی‌بخش",
      icon: <Stars size={26} className="text-yellow-600" />,
      link: "/inspiration",
    },
    {
      title: "آگاهی‌های ژنینویی",
      desc: "تست‌ها و چک‌لیست‌های کاربردی در زندگی",
      icon: <Search size={26} className="text-yellow-600" />,
      link: "/awareness-center",
    },
    {
  title: "پذیرش و توکل",
  desc: "رها کردن کنترل افراطی و آرام‌تر زندگی کردن",
  icon: <Sparkles size={26} className="text-yellow-600" />,
  link: "/acceptance-and-trust",
},
    {
      title: "پروفایل من",
      desc: "مدیریت اطلاعات و تنظیمات حساب کاربری",
      icon: <User size={26} className="text-yellow-600" />,
      link: "/social/profile",
    },
    {
  title: "علایق من",
  desc: "ذخیره مقالات، محصولات و چیزهایی که دوست داری",
  icon: <Heart size={26} className="text-yellow-600" />,
  link: "/favorites",
},
  ];

  return (
    <DashboardLayout title="پنل کاربران ژنینو">
      {/* 💛 خوش‌آمدگویی بالا */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl font-bold text-stone-700 mb-2">
              خوش آمدی{" "}
{user?.fullName || user?.firstName || user?.name
  ? `${user?.fullName || user?.firstName || user?.name} عزیز`
  : "کاربر عزیز"}   
        </h2>
        <p className="text-gray-600 text-sm">
         ژنینو مرکز رشد شماست؛ فضایی برای حرکت آگاهانه به‌سوی نسخه‌ای بهتر از خود.
        </p>
        <div className="mt-5 flex justify-center">
        <LifeStageSwitcher currentStage="normal" />
        </div>
      </motion.div>

      {/* 🟡 کارت‌ها */}
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
                    ? "bg-gradient-to-r from-stone-400 to-amber-200 border-stone-300 text-white shadow-[0_0_25px_rgba(120,113,108,0.25)] hover:shadow-[0_0_40px_rgba(180,150,90,0.35)]"
                    : "bg-gradient-to-b from-stone-50 to-amber-50 border-stone-200 hover:shadow-[0_0_20px_rgba(120,113,108,0.18)]"
                } hover:-translate-y-1`}
              >
                <div className="flex flex-col items-center gap-3 mb-2">
                  <div
                    className={`${
                      card.highlight
                        ? "bg-white/30"
                        : "bg-stone-100/80 border border-stone-200"
                    } p-3 rounded-full shadow-inner`}
                  >
                    {card.icon}
                  </div>
                  <h3
                    className={`font-semibold text-lg ${
                      card.highlight ? "text-white" : "text-stone-700"
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

      {/* 🌸 جمله الهام‌بخش پایین */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center text-gray-500 text-sm italic"
      >
        ✨ هر روزت فرصتی برای رشد و آگاهی بیشتره.
      </motion.div>
    </DashboardLayout>
  );
}
