import DashboardLayout from "@components/Dashboard/DashboardLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Baby,
  Dumbbell,
  Heart,
  Car,
  Wallet,
  Brain,
  Users,
  Leaf,
  Sparkles,
  Rocket,
  Apple,
  DollarSign,
} from "lucide-react";


export default function DashboardParent() {
let user = null;

try {
  const storedUser = localStorage.getItem("genino_user");
  user = storedUser ? JSON.parse(storedUser) : null;
} catch (error) {
  user = null;
}



  // 🌿 کارت‌ها
  const cards = [
    {
      title: "ورود به دنیای کودک من",
      desc: "مشاهده و مدیریت رشد کودک",
      icon: <Baby size={26} className="text-yellow-600" />,
      link: "/mychild",
      highlight: true,
    },
    {
      title: "پزشک من",
      desc: "مدیریت پرونده‌ها، نسخه‌ها و آزمایش‌های پزشکی",
      icon: <Heart size={26} className="text-yellow-600" />,
      link: "/my-doctor",
    },
    {
      title: "آرامش ذهن و روان",
      desc: "مدیتیشن و تمرین‌های ذهن‌آگاهی برای والد آرام‌تر",
      icon: <Leaf size={26} className="text-yellow-600" />,
      link: "/knowledge/mind-calm",
    },
    {
      title: "من ورزشکارم",
      desc: "برنامه‌های ورزشی ساده برای خانه",
      icon: <Dumbbell size={26} className="text-yellow-600" />,
      link: "/knowledge/home-workout",
    },
    ...(user?.gender === "female"
      ? [
          {
            title: "چرخه قاعدگی",
            desc: "پیگیری و آگاهی از وضعیت جسمی ماهانه",
            icon: <Heart size={26} className="text-yellow-600" />,
            link: "/my-cycle",
          },
        ]
      : []),
    {
      title: "همسرم را بهتر بشناسم",
      desc: "آموزش‌های ارتباط مؤثر و بهبود روابط زناشویی",
      icon: <Users size={26} className="text-yellow-600" />,
      link: "/knowledge/family-relations",
    },
    {
      title: "کالری‌شمار",
      desc: "مدیریت تغذیه و وزن به روش ژنینو",
      icon: <Apple size={26} className="text-yellow-600" />,
      link: "/calorie-tracker",
    },
    {
      title: "اقتصاد خانواده",
      desc: "مدیریت مالی و بودجه خانواده",
      icon: <DollarSign size={26} className="text-yellow-600" />,
      link: "/family-finance",
    },
    {
      title: "کارآفرینان موفق",
      desc: "درس‌هایی از زندگی کارآفرینان الهام‌بخش",
      icon: <Rocket size={26} className="text-yellow-600" />,
      link: "/knowledge/successful-entrepreneurs",
    },
    {
      title: "علایق من",
      desc: "ذخیره مقالات، محصولات و چیزهایی که دوست داری",
      icon: <Heart size={26} className="text-yellow-600" />,
      link: "/favorites",
    },
  ];
  

  return (
    <DashboardLayout title="پنل کاربری والدین">
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
         ژنینو همراه شما در مسیر رشد فردی، تحکیم خانواده و پرورش آگاهانه فرزندتان است؛ هر روز گامی سنجیده برای ساخت آینده‌ای سالم‌تر و پایدارتر.
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
        🌸 هر لبخند فرزندت بازتاب نوریه که از آرامش تو می‌تابه.
      </motion.div>
    </DashboardLayout>
  );
}
