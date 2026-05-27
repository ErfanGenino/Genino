import DashboardLayout from "@components/Dashboard/DashboardLayout";
import LifeStageSwitcher from "@components/Dashboard/LifeStageSwitcher";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain,
  Heart,
  Sparkles,
  BookOpen,
  Mountain,
  Coffee,
  Music,
  DollarSign,
  Dumbbell,
  Globe,
  Stethoscope,
} from "lucide-react";

export default function DashboardSingle() {
    let user = null;

try {
  const storedUser = localStorage.getItem("genino_user");
  user = storedUser ? JSON.parse(storedUser) : null;
} catch (error) {
  user = null;
}



  const cards = [
    {
  title: "نسخه بهتر من",
  desc: "اعتمادبه‌نفس، عادت‌های خوب و ساختن آینده‌ای که دوست داری",
  icon: <Sparkles size={26} className="text-sky-600" />,
  highlight: true,
  link: "/personal-growth",
},
    {
      title: "سلامت و تناسب اندام",
      desc: "برنامه‌ی ورزشی برای انرژی روزانه",
      icon: <Dumbbell size={26} className="text-sky-600" />,
      link: "/knowledge/home-workout",
    },
    {
      title: "پزشک من",
      desc: "مدیریت پرونده‌های پزشکی و پیگیری سلامت شخصی",
      icon: <Stethoscope size={26} className="text-sky-600" />,
      link: "/my-doctor",
    },
    {
      title: "روان آرام",
      desc: "مدیتیشن، آگاهی و کنترل استرس روزمره",
      icon: <Heart size={26} className="text-sky-600" />,
      link: "/knowledge/mind-calm",
    },
    {
  title: "حال خوب امروز",
  desc: "جمله‌ها و یادآوری‌هایی برای انرژی، انگیزه و ادامه دادن",
  icon: <Sparkles size={26} className="text-sky-600" />,
  link: "/inspiration",
},
    {
  title: "کتاب‌های حال خوب",
  desc: "کتاب‌هایی برای رشد ذهن، آرامش و ساختن آینده‌ای بهتر",
  icon: <BookOpen size={26} className="text-sky-600" />,
  link: "/books-positive-energy",
},
    {
  title: "سفر و تجربه‌های تازه",
  desc: "مکان‌ها، تجربه‌ها و حس‌هایی که زندگی را رنگی‌تر می‌کنند",
  icon: <Mountain size={26} className="text-sky-600" />,
  link: "/travel-experience",
},
    {
      title: "استراحت با قهوه",
      desc: "زمان‌هایی برای آرامش، خلوت و فکر کردن به خودت",
      icon: <Coffee size={26} className="text-sky-600" />,
      link: "/articles/coffee-break",
    },
    {
  title: "پول، آرامش و آینده",
  desc: "مدیریت پول، ذهن مالی و ساختن آینده‌ای آرام‌تر",
  icon: <DollarSign size={26} className="text-sky-600" />,
  link: "/money-and-future",
},
    {
  title: "دنیای موسیقی و ذهن",
  desc: "شناخت موسیقی، سازها و تأثیر صداها روی ذهن و احساسات",
  icon: <Music size={26} className="text-sky-600" />,
  link: "/music-and-mind",
},
    {
  title: "رها و رو به جلو",
  desc: "آرامش در پذیرش، توکل و ادامه دادن بدون کنترل افراطی",
  icon: <Sparkles size={26} className="text-sky-600" />,
  link: "/let-go-and-grow",
},
    {
  title: "علایق من",
  desc: "ذخیره مقالات، محصولات و چیزهایی که دوست داری",
  icon: <Heart size={26} className="text-yellow-600" />,
  link: "/favorites",
},
  ];

  return (
    <DashboardLayout title="پنل کاربری مجردها ">
      {/* 💙 خوش‌آمدگویی بالا */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl font-bold text-sky-700 mb-2">
          خوش آمدی{" "}
{user?.fullName || user?.firstName || user?.name
  ? `${user?.fullName || user?.firstName || user?.name} عزیز`
  : "کاربر عزیز"} 
        </h2>
        <p className="text-gray-600 text-sm">
         ژنینو فضایی برای رشد، آرامش و شادی است؛ هر روز فرصتی برای ارتقای آگاهانه‌ی توانمندی‌های فردی.
        </p>
        <div className="mt-5 flex justify-center">
          <LifeStageSwitcher currentStage="single" />
        </div>
      </motion.div>

      {/* 🌊 کارت‌ها */}
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
                    ? "bg-gradient-to-r from-sky-400 to-blue-300 border-sky-400 text-white shadow-[0_0_25px_rgba(125,200,255,0.6)] hover:shadow-[0_0_40px_rgba(125,200,255,0.8)]"
                    : "bg-gradient-to-b from-blue-50 to-blue-100 border-blue-200 hover:shadow-[0_0_20px_rgba(125,200,255,0.4)]"
                } hover:-translate-y-1`}
              >
                <div className="flex flex-col items-center gap-3 mb-2">
                  <div
                    className={`${
                      card.highlight
                        ? "bg-white/30"
                        : "bg-blue-100/80 border border-blue-200"
                    } p-3 rounded-full shadow-inner`}
                  >
                    {card.icon}
                  </div>
                  <h3
                    className={`font-semibold text-lg ${
                      card.highlight ? "text-white" : "text-blue-800"
                    }`}
                  >
                    {card.title}
                  </h3>
                </div>
                <p
                  className={`text-sm leading-relaxed ${
                    card.highlight ? "text-blue-50" : "text-gray-600"
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
        💙 تنهایی یعنی فرصتی برای آرامش، رشد و شناخت خودت.
      </motion.div>
    </DashboardLayout>
  );
}
