import DashboardLayout from "@components/Dashboard/DashboardLayout";
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
      icon: <BookOpen size={26} className="text-yellow-600" />,
      link: "/knowledge",
      highlight: true,
    },
    {
      title: "خودآگاهی و رشد فردی",
      desc: "تست‌ها، مهارت‌ها و شناخت بهتر خود",
      icon: <Brain size={26} className="text-yellow-600" />,
      link: "/awareness",
    },
    {
      title: "روابط سالم",
      desc: "بهبود ارتباط با شریک زندگی، خانواده و اطرافیان",
      icon: <Heart size={26} className="text-yellow-600" />,
      link: "/family-relations",
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
      title: "پروفایل من",
      desc: "مدیریت اطلاعات و تنظیمات حساب کاربری",
      icon: <User size={26} className="text-yellow-600" />,
      link: "/profile",
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
        <h2 className="text-2xl font-bold text-yellow-700 mb-2">
              خوش آمدی{" "}
{user?.fullName || user?.firstName || user?.name
  ? `${user?.fullName || user?.firstName || user?.name} عزیز`
  : "کاربر عزیز"}   
        </h2>
        <p className="text-gray-600 text-sm">
         ژنینو مرکز رشد شماست؛ فضایی برای حرکت آگاهانه به‌سوی نسخه‌ای بهتر از خود.
        </p>
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
