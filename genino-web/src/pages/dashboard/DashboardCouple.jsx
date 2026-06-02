import DashboardLayout from "@components/Dashboard/DashboardLayout";
import LifeStageSwitcher from "@components/Dashboard/LifeStageSwitcher";
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
  Home,
} from "lucide-react";
import LifeCompanionButton from "@components/Dashboard/LifeCompanionButton";

export default function DashboardCouple() {
  let user = null;

try {
  const storedUser = localStorage.getItem("genino_user");
  user = storedUser ? JSON.parse(storedUser) : null;
} catch (error) {
  user = null;
}


  const cards = [
    {
      title: "علایق من",
      desc: "ذخیره مقالات، محصولات و چیزهایی که دوست داری",
      icon: <Heart size={26} className="text-yellow-600" />,
      link: "/favorites",
    },
    {
  title: "رابطه‌ی عاشقانه",
  desc: "راهکارهایی برای افزایش صمیمیت، عشق و آرامش در رابطه‌تون",
  icon: <Heart size={26} className="text-pink-500" />,
  highlight: true,
  link: "/love-relationship",
},
    {
  title: "قرارهای دونفره",
  desc: "ایده‌هایی برای ساختن خاطره، صمیمیت و لحظه‌های خاص",
  icon: <Coffee size={26} className="text-pink-500" />,
  link: "/couple-dates",
},
    {
  title: "حرف زدن بدون دلخوری",
  desc: "مهارت‌هایی برای گفت‌وگوی آرام، شنیدن بهتر و حل اختلاف",
  icon: <Users size={26} className="text-pink-500" />,
  link: "/healthy-conversation",
},
    {
  title: "آرامش ذهن و مدیتیشن",
  desc: "تمرین‌هایی ساده برای آرام‌تر شدن ذهن و کاهش استرس",
  icon: <Leaf size={26} className="text-pink-500" />,
  link: "/mind-peace",
},
    {
      title: "اقتصاد مشترک",
      desc: "مدیریت بودجه، خرید و سرمایه‌گذاری به سبک زوج‌های موفق",
      icon: <DollarSign size={26} className="text-pink-500" />,
      link: "/family-finance",
    },
    {
  title: "تغذیه سالم زوجی",
  desc: "عادت‌های غذایی بهتر برای انرژی، سلامت و حال خوب دونفره",
  icon: <Apple size={26} className="text-pink-500" />,
  link: "/couple-nutrition",
},
    {
  title: "آمادگی برای والد شدن",
  desc: "نگاه‌هایی ساده برای آماده شدن ذهن، رابطه و سبک زندگی قبل از فرزند",
  icon: <CalendarHeart size={26} className="text-pink-500" />,
  link: "/future-parenting",
},
    {
  title: "خانه و زندگی دونفره",
  desc: "ایده‌هایی برای آرام‌تر، گرم‌تر و قشنگ‌تر شدن فضای زندگی مشترک",
  icon: <Home size={26} className="text-pink-500" />,
  link: "/couple-home",
},
    {
  title: "زوج‌های موفق",
  desc: "نگاه‌هایی واقعی به رابطه‌های پایدار، بالغ و آرام",
  icon: <Sparkles size={26} className="text-pink-500" />,
  link: "/successful-couples",
},
    {
  title: "آرامش در زندگی مشترک",
  desc: "کم کردن تنش‌ها و ساختن فضای امن و آرام در رابطه",
  icon: <Leaf size={26} className="text-pink-500" />,
  link: "/peaceful-marriage",
},
    {
  title: "پذیرش و توکل",
  desc: "یاد گرفتن رها کردن کنترل افراطی و آرام‌تر زندگی کردن",
  icon: <Sparkles size={26} className="text-pink-500" />,
  link: "/acceptance-and-trust",
},
    
  ];

  return (
    <DashboardLayout title="پنل کاربری زوج ها">
      {/* 💕 خوش‌آمدگویی بالا */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl font-bold text-pink-600 mb-2">
          خوش آمدی{" "}
{user?.fullName || user?.firstName || user?.name
  ? `${user?.fullName || user?.firstName || user?.name} عزیز`
  : "کاربر عزیز"} 
        </h2>
        <p className="text-gray-600 text-sm">
         عشق، در رشد متقابل معنا می‌یابد؛ ژنینو فضایی برای تقویت رابطه، آرامش پایدار و لبخندهای مشترک است.
        </p>
        <div className="mt-5 flex justify-center">
        <LifeStageSwitcher currentStage="married" />
        </div>
        <LifeCompanionButton />
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
