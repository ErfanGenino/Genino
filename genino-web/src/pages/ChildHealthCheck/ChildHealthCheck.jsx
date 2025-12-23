import { motion } from "framer-motion";
import { useState } from "react";
import GeninoDNABackground from "@components/Core/GeninoDNABackground";
import GoldenModal from "@components/Core/GoldenModal";
import { Link } from "react-router-dom";
import { HeartPulse, Brain, Activity, Eye, Ear, Smile, Utensils, Move, AlertTriangle, Moon } from "lucide-react";
import GeninoReportButton from "@components/Core/GeninoReportButton";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function ChildHealthCheck() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const navigate = useNavigate(); // 👈 این خط ضروریه
  const [searchParams] = useSearchParams();
  const childId = searchParams.get("childId");


  // 🌕 داده‌های سکه‌ها
  const physicalChecks = childId
  ? [
    { title: "پایش بینایی", icon: <Eye className="w-10 h-10" />, link: `/child-health-check/vision?childId=${childId}` },
    { title: "پایش شنوایی", icon: <Ear className="w-10 h-10" />, link: `/child-health-check/hearing?childId=${childId}` },
    { title: "سلامت دهان و دندان", icon: <Smile className="w-10 h-10" />, link: `/child-health-check/dental?childId=${childId}` },
    { title: "سلامت گوارش و بلع", icon: <Utensils className="w-10 h-10" />, link: `/child-health-check/digestion?childId=${childId}` },
    { title: "رشد حرکتی و تعادل", icon: <Move className="w-10 h-10" />, link: `/child-health-check/movement?childId=${childId}` },
    { title: "قد، وزن و BMI", icon: <Activity className="w-10 h-10" />, link: `/child-health-check/bodymetrics?childId=${childId}` },
  ]
  : [];

  const mentalChecks = [
  {
    title: "تنظیم هیجان کودک",
    icon: <HeartPulse className="w-10 h-10" />,
    link: `/child-mental-health/emotion-regulation?childId=${childId}`,
  },
  {
    title: "تمرکز و توجه",
    icon: <Brain className="w-10 h-10" />,
    link: `/child-mental-health/attention-focus?childId=${childId}`,
  },
  {
    title: "تعامل اجتماعی کودک",
    icon: <Activity className="w-10 h-10" />,
    link: `/child-mental-health/social-interaction?childId=${childId}`,
  },
  {
    title: "اضطراب و ترس‌های کودک",
    icon: <AlertTriangle className="w-10 h-10" />,
    link: `/child-mental-health/anxiety-fear?childId=${childId}`,
  },
  {
    title: "عزت‌نفس کودک",
    icon: <Smile className="w-10 h-10" />,
    link: `/child-mental-health/self-confidence?childId=${childId}`,
  },
  {
    title: "خواب و آرامش",
    icon: <Moon className="w-10 h-10" />,
    link: `/child-mental-health/sleep-calm?childId=${childId}`,
  },
];

if (!childId) {
  return (
    <div className="min-h-screen flex items-center justify-center text-gray-600">
      کودک مشخص نشده است
    </div>
  );
}

  return (
    <GeninoDNABackground strands={10} opacity={0.25} duration={90}>

      {/* 🩺 مودال اطلاع‌رسانی رسمی */}
      <GoldenModal
        show={showDisclaimer}
        title="⚠️ اطلاع مهم پیش از شروع پایش سلامت کودک"
        description="ژنینو با هدف پایش و آگاهی طراحی شده است، نه تشخیص یا درمان."
        onConfirm={() => setShowDisclaimer(false)}
        confirmLabel="متوجه شدم"
      >
        <p className="text-gray-700 text-sm leading-relaxed text-justify">
          تمامی آزمون‌های این بخش صرفاً جهت پایش اولیه و افزایش آگاهی والدین از وضعیت رشد و سلامت کودک ارائه می‌شوند.  
          این آزمون‌ها جایگزین و معادل معاینات بالینی یا آزمایش‌های پزشکی نیستند.  
          در صورت مشاهده هرگونه نشانه‌ی غیرعادی یا تردید در نتایج،  
          مراجعه به پزشک متخصص اطفال یا مراکز بهداشتی معتبر توصیه می‌شود.  
          <br />
          <br />
          <span className="font-semibold text-yellow-700">
            ژنینو همکار شما در مسیر آگاهی است، نه جایگزین پزشک.
          </span>
        </p>
      </GoldenModal>

      {/* 🌟 محتوای صفحه */}
      <main dir="rtl" className="relative z-10 flex flex-col items-center px-6 py-16 text-gray-800">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-extrabold text-yellow-700 mb-10 text-center drop-shadow-[0_0_15px_rgba(255,220,80,0.5)]"
        >
          پایش سلامت کودک
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-2xl text-center text-gray-700 mb-16 leading-relaxed"
        >
          در این بخش می‌توانید وضعیت رشد، سلامت جسمی و عاطفی کودک خود را از طریق آزمون‌های ساده و علمی بررسی کنید.  
          هر پایش به‌صورت مستقل طراحی شده و با هدف افزایش آگاهی و شناسایی زودهنگام علائم احتمالی عمل می‌کند.
        </motion.p>

        {/* 🧍‍♀️ بخش سلامت فیزیکی */}
        <section className="w-full max-w-5xl mb-20">
          <h2 className="text-2xl font-bold text-yellow-800 mb-6 text-center">🩺 سلامت فیزیکی کودک</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 justify-items-center">
            {physicalChecks.map((item, i) => (
              <Link key={i} to={item.link} className="flex flex-col items-center text-center group select-none">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 
                             text-white flex flex-col items-center justify-center border-4 border-yellow-200 shadow-[0_0_25px_rgba(255,220,100,0.6)] 
                             transition-all"
                >
                  <div className="mb-2">{item.icon}</div>
                  <span className="text-[13px] font-semibold leading-tight">{item.title}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* 🧠 بخش سلامت روحی و عاطفی */}
        <section className="w-full max-w-5xl mb-20">
          <h2 className="text-2xl font-bold text-yellow-800 mb-6 text-center">🧠 سلامت روحی و عاطفی کودک</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 justify-items-center">
            {mentalChecks.map((item, i) => (
              <Link key={i} to={item.link} className="flex flex-col items-center text-center group select-none">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-amber-600 
                             text-white flex flex-col items-center justify-center border-4 border-yellow-200 shadow-[0_0_25px_rgba(255,220,100,0.6)] 
                             transition-all"
                >
                  <div className="mb-2">{item.icon}</div>
                  <span className="text-[13px] font-semibold leading-tight">{item.title}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* 📊 دکمه مشاهده گزارش‌ها */}
<div className="mt-10">
  <GeninoReportButton
    label="📊 مشاهده گزارش پایش‌های انجام‌شده"
    onClick={() => navigate("/reports/child-health")}
  />
</div>


        {/* ⚖️ یادآوری کوچک پایین صفحه */}
        <p className="text-xs text-gray-600 text-center max-w-lg leading-relaxed border-t border-yellow-100 pt-6">
          این پایش‌ها با هدف ارتقای آگاهی والدین طراحی شده‌اند و نباید به‌عنوان جایگزین معاینات پزشکی یا درمان استفاده شوند.
        </p>
      </main>
    </GeninoDNABackground>
  );
}
