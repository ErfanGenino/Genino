import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Dumbbell, Brain, Book, Flower } from "lucide-react";

export default function AchievementsBar() {
  const [selectedBadge, setSelectedBadge] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selectedBadge ? "hidden" : "auto";
  }, [selectedBadge]);

  const badges = [
    {
      id: 1,
      title: "دستاورد هنری",
      icon: <Palette className="w-8 h-8 text-[#cfa500] drop-shadow-[0_0_8px_rgba(255,220,120,0.9)]" />,
      date: "12 مهر 1404",
      coach: "کلاس‌های خلاقیت کودک پاستیلا",
      score: "۹۵ از ۱۰۰",
      desc: "به خاطر خلاقیت بالا در ترکیب رنگ‌ها و طراحی آزاد کودکانه.",
    },
    {
      id: 2,
      title: "دستاورد ورزشی",
      icon: <Dumbbell className="w-8 h-8 text-[#cfa500] drop-shadow-[0_0_8px_rgba(255,220,120,0.9)]" />,
      date: "5 مهر 1404",
      coach: "کلاس‌های ورزشی و استخر ناوا",
      score: "۹۰ از ۱۰۰",
      desc: "شنا در مسافت ۱۰ متر بدون کمک مربی و حفظ آرامش.",
    },
    {
      id: 3,
      title: "دستاورد پرورشی",
      icon: <Brain className="w-8 h-8 text-[#cfa500] drop-shadow-[0_0_8px_rgba(255,220,120,0.9)]" />,
      date: "25 شهریور 1404",
      coach: "کلاس‌های خلاقیت کودک پاستیلا",
      score: "۱۰۰ از ۱۰۰",
      desc: "حل مسئله‌ی پیچیده با روش ابتکاری در کلاس هوش و تمرکز.",
    },
    {
      id: 4,
      title: "دستاورد علمی",
      icon: <Book className="w-8 h-8 text-[#cfa500] drop-shadow-[0_0_8px_rgba(255,220,120,0.9)]" />,
      date: "25 شهریور 1404",
      coach: "کلاس‌های خلاقیت کودک پاستیلا",
      score: "۱۰۰ از ۱۰۰",
      desc: "حل مسئله‌ی پیچیده با روش ابتکاری در کلاس هوش و تمرکز.",
    },
    {
      id: 5,
      title: "دستاورد معنوی",
      icon: <Flower className="w-8 h-8 text-[#cfa500] drop-shadow-[0_0_8px_rgba(255,220,120,0.9)]" />,
      date: "25 شهریور 1404",
      coach: "کلاس‌های خلاقیت کودک پاستیلا",
      score: "۱۰۰ از ۱۰۰",
      desc: "حل مسئله‌ی پیچیده با روش ابتکاری در کلاس هوش و تمرکز.",
    },
  ];

  return (
    <>
      {/* 🪙 نوار دستاوردها */}
      <div className="relative z-[10] w-full overflow-x-auto overflow-y-hidden whitespace-nowrap py-5 px-6 mb-8 
                      bg-gradient-to-r from-[#fff7cf] via-[#ffef99] to-[#ffe66e] backdrop-blur-sm shadow-inner border-b border-yellow-300 
                      scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-yellow-100">
        <div className="flex space-x-5 rtl:space-x-reverse">
          {badges.map((badge) => (
            <motion.div
              key={badge.id}
              whileHover={{
                rotateY: 15,
                scale: 1.12,
                boxShadow: "0 0 40px rgba(255, 215, 0, 0.9)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              onClick={() => setSelectedBadge(badge)}
              className="flex flex-col items-center justify-center text-center cursor-pointer"
            >
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#fff8c7] via-[#ffd84d] to-[#d6a700] 
                              shadow-[0_0_35px_rgba(212,175,55,0.6)] border-[3px] border-[#f8e47a] flex items-center justify-center overflow-hidden">

                {/* ✨ درخشش دائمی طلایی */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  animate={{ x: ["-150%", "150%"] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  style={{ transform: "rotate(20deg)" }}
                />

                {/* نور متحرک درخشان */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-yellow-200/40 to-transparent blur-[10px]"
                  animate={{ rotate: [0, 360] }}
                  transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
                />

                {/* آیکون طلایی */}
                {badge.icon}
              </div>

              <p className="text-xs mt-3 font-semibold text-yellow-800 drop-shadow-[0_0_6px_rgba(255,255,180,0.7)]">
                {badge.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🌟 پاپ‌آپ جزئیات دستاورد */}
      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-yellow-50 to-white rounded-3xl shadow-2xl p-6 w-80 sm:w-96 text-center border border-yellow-200"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
            >
              {/* سکه بزرگ طلایی در پاپ‌آپ */}
              <div className="relative mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-[#fff8c7] via-[#ffd84d] to-[#d6a700] 
                              shadow-[0_0_30px_rgba(212,175,55,0.8)] border-[3px] border-[#f8e47a] flex items-center justify-center overflow-hidden mb-4">

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  animate={{ x: ["-150%", "150%"] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  style={{ transform: "rotate(20deg)" }}
                />
                {selectedBadge.icon}
              </div>

              <h3 className="text-xl font-bold text-yellow-700 mb-2">
                {selectedBadge.title}
              </h3>
              <p className="text-sm text-gray-700 mb-2">{selectedBadge.desc}</p>
              <p className="text-xs text-gray-500 mb-1">📅 {selectedBadge.date}</p>
              <p className="text-xs text-gray-500 mb-1">🏫 {selectedBadge.coach}</p>
              <p className="text-xs text-gray-600 font-semibold mb-4">
                ⭐ امتیاز: {selectedBadge.score}
              </p>

              <button
                onClick={() => setSelectedBadge(null)}
                className="mt-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white px-6 py-2 rounded-full font-medium shadow-md hover:from-yellow-600 hover:to-yellow-500 transition"
              >
                بستن
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
