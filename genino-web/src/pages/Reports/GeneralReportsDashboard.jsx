// 📄 src/pages/Reports/GeneralReportsDashboard.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GeninoDNABackground from "@components/Core/GeninoDNABackground";
import { Baby, Heart, Users, Shield } from "lucide-react";

export default function GeneralReportsDashboard() {
  const sections = [
    {
      title: "👶 گزارش سلامت کودک",
      desc: "مشاهده نتایج پایش‌های جسمی و ذهنی کودک، شامل بینایی، شنوایی، رشد و احساسات.",
      link: "/reports/child-health",
      icon: <Baby className="w-10 h-10 text-yellow-700" />,
    },
    {
      title: "👩 گزارش سلامت بانوان",
      desc: "تحلیل وضعیت عمومی، چرخه قاعدگی، تغذیه و تندرستی ویژه بانوان.",
      link: "/reports/women-health",
      icon: <Heart className="w-10 h-10 text-yellow-700" />,
    },
    {
      title: "👨 گزارش سلامت آقایان",
      desc: "پایش سلامت جسمی، روانی و سبک زندگی مردان در ژنینو.",
      link: "/reports/men-health",
      icon: <Shield className="w-10 h-10 text-yellow-700" />,
    },
    {
      title: "🏠 گزارش سلامت خانواده",
      desc: "جمع‌بندی هوشمند از پایش‌های انجام‌شده برای همه اعضای خانواده.",
      link: "/reports/family-health",
      icon: <Users className="w-10 h-10 text-yellow-700" />,
    },
  ];

  return (
    <GeninoDNABackground strands={10} opacity={0.25} duration={90}>
      <main dir="rtl" className="relative z-10 flex flex-col items-center px-6 py-16 text-gray-800">
        {/* ✨ تیتر اصلی */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-extrabold text-yellow-700 mb-10 text-center drop-shadow-[0_0_15px_rgba(255,220,80,0.5)]"
        >
          📊 مرکز گزارش‌های سلامت ژنینو
        </motion.h1>

        <p className="max-w-2xl text-center text-gray-700 mb-14 leading-relaxed">
          در این بخش، می‌توانید گزارش‌های تحلیلی و پایش‌های انجام‌شده را برای تمام اعضای خانواده مشاهده کنید.
          ژنینو با تحلیل داده‌ها، دید جامع‌تری از وضعیت سلامت جسمی و روحی خانواده‌تان به شما ارائه می‌دهد.
        </p>

        {/* 🧩 باکس‌های مسیر گزارش‌ها */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
          {sections.map((sec, i) => (
            <Link
              key={i}
              to={sec.link}
              className="group flex flex-col items-center text-center bg-white rounded-3xl border border-yellow-200 shadow-[0_0_20px_rgba(255,215,0,0.15)] p-6 hover:shadow-[0_0_30px_rgba(255,215,0,0.25)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="mb-3">{sec.icon}</div>
              <h3 className="font-bold text-yellow-700 text-lg mb-2">{sec.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{sec.desc}</p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mt-4 px-5 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold text-sm shadow-md"
              >
                مشاهده گزارش
              </motion.div>
            </Link>
          ))}
        </div>
      </main>
    </GeninoDNABackground>
  );
}
