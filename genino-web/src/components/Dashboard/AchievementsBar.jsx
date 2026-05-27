import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Dumbbell, Brain, Book, Flower } from "lucide-react";
import { authFetch } from "../../services/api";

export default function AchievementsBar({ childId }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [showIssuerInfoModal, setShowIssuerInfoModal] =
  useState(false);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
  document.body.style.overflow =
    selectedCategory || selectedAchievement ? "hidden" : "auto";

  return () => {
    document.body.style.overflow = "auto";
  };
}, [selectedCategory, selectedAchievement]);

  useEffect(() => {
  if (!childId) return;

  async function loadAchievements() {
    try {
      const res = await authFetch(
        `/child-achievements/child/${childId}`
      );

      if (res?.ok) {
        setAchievements(res.achievements || []);
      }
    } catch (err) {
      console.error("Achievements load error:", err);
    }
  }

  loadAchievements();
}, [childId]);

const getIssuerRoleText = (role) => {
  const roles = {
    father: "پدر",
    mother: "مادر",
    aunt: "عمه",
    uncle: "عمو",
    khaleh: "خاله",
    dayi: "دایی",
    sister: "خواهر",
    brother: "برادر",
  };

  return roles[role] || role || "عضو ژنینو";
};

const isFamilyIssuer = (issuer) => {
  const familyRoles = [
    "پدر",
    "مادر",
    "عمه",
    "عمو",
    "خاله",
    "دایی",
    "خواهر",
    "برادر",
    "عضو ژنینو",
  ];

  return familyRoles.includes(issuer);
};

  const badges = [
  {
    id: 1,
    title: "دستاورد هنری",
    icon: (
      <Palette className="w-8 h-8 text-[#cfa500]" />
    ),

    achievements: [
      {
        id: 101,
        title: "خلاقیت در نقاشی کودک",
        date: "12 مهر 1404",
        issuer: "آموزشگاه آوای هنر",
        score: "۹۵ از ۱۰۰",
        desc: "به دلیل خلاقیت بالا در ترکیب رنگ‌ها و طراحی آزاد کودکانه.",
      },

      {
        id: 102,
        title: "مهارت کاردستی",
        date: "18 مهر 1404",
        issuer: "خانه خلاقیت کودک",
        score: "۹۰ از ۱۰۰",
        desc: "ساخت کاردستی خلاقانه با دقت و تمرکز بالا.",
      },

      {
        id: 103,
        title: "نقاش کوچک طلایی",
        date: "25 مهر 1404",
        issuer: "آموزشگاه رنگین کمان",
        score: "۹۸ از ۱۰۰",
        desc: "نمایش استعداد ویژه در نقاشی آزاد.",
      },
    ],
  },

  {
    id: 2,
    title: "دستاورد ورزشی",
    icon: (
      <Dumbbell className="w-8 h-8 text-[#cfa500]" />
    ),

    achievements: [
      {
        id: 201,
        title: "شناگر کوچک",
        date: "5 مهر 1404",
        issuer: "استخر ناوا",
        score: "۹۰ از ۱۰۰",
        desc: "شنا در مسافت ۱۰ متر بدون کمک مربی.",
      },
    ],
  },

  {
    id: 3,
    title: "دستاورد پرورشی",
    icon: (
      <Brain className="w-8 h-8 text-[#cfa500]" />
    ),

    achievements: [
      {
        id: 301,
        title: "مهربانی با دوستان",
        date: "8 مهر 1404",
        issuer: "مهد کودک مهر",
        score: "۱۰۰ از ۱۰۰",
        desc: "تعامل بسیار خوب با سایر کودکان.",
      },
    ],
  },

  {
    id: 4,
    title: "دستاورد علمی",
    icon: (
      <Book className="w-8 h-8 text-[#cfa500]" />
    ),

    achievements: [],
  },

  {
  id: 5,
  title: "دستاورد معنوی",

  icon: (
    <Flower className="w-8 h-8 text-[#cfa500]" />
  ),

  achievements: achievements
    .filter((a) => a.category === "spiritual")
    .map((a) => ({
      id: a.id,

      title: a.title,

      date: new Date(a.issuedAt).toLocaleDateString("fa-IR"),

      issuer:
  getIssuerRoleText(a.issuerRole) ||
  a.issuerUser?.fullName ||
  "عضو ژنینو",

      desc:
        a.description ||
        "توضیحی برای این دستاورد ثبت نشده است.",
    })),
},
];

  return (
    <>
      {/* 🏅 نوار دستاوردهای مینیمال */}
<div className="relative z-[10] w-full px-4 mb-6">
  <div
    className="
      w-full max-w-3xl mx-auto
      overflow-visible
      rounded-3xl
      bg-white/65 backdrop-blur-xl
      border border-white/70
      shadow-[0_10px_35px_rgba(255,190,0,0.12)]
      px-2 py-2 sm:px-4 sm:py-3
      scrollbar-thin scrollbar-thumb-yellow-200 scrollbar-track-transparent
    "
  >
    <div className="grid grid-cols-5 gap-1 sm:flex sm:items-center sm:justify-center sm:gap-4">
      {badges.map((badge) => (
        <motion.button
          key={badge.id}
          type="button"
          whileHover={{ y: -2, scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          onClick={() => setSelectedCategory(badge)}
          className="
            shrink-0 flex flex-col items-center justify-center
            min-w-0
            text-center cursor-pointer
            rounded-xl sm:rounded-2xl px-0.5 py-1 sm:px-2 sm:py-1.5
            hover:bg-yellow-50/70
            transition-all
          "
        >
          <div
            className="
              w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl
              bg-gradient-to-br from-yellow-50 to-amber-100
              border border-yellow-100
              shadow-sm
              flex items-center justify-center
            "
          >
            <div className="[&>svg]:w-5 [&>svg]:h-5 [&>svg]:text-yellow-700 [&>svg]:drop-shadow-none">
              {badge.icon}
            </div>
          </div>

          <p className="text-[9px] sm:text-[11px] mt-1 font-bold text-yellow-900 leading-5">
            {badge.title}
          </p>
        </motion.button>
      ))}
    </div>
  </div>
</div>

      {/* 🌟 پاپ‌آپ جزئیات دستاورد */}
      {/* 📋 مودال لیست دستاوردهای یک دسته */}
<AnimatePresence>
  {selectedCategory && (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSelectedCategory(null)}
    >
      <motion.div
        className="w-full max-w-md rounded-3xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-white p-5 text-center shadow-2xl"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-[#f8e47a] bg-gradient-to-br from-[#fff8c7] via-[#ffd84d] to-[#d6a700] shadow-[0_0_25px_rgba(212,175,55,0.7)]">
          {selectedCategory.icon}
        </div>

        <h3 className="mb-2 text-xl font-extrabold text-yellow-800">
          {selectedCategory.title}
        </h3>

        <p className="mb-5 text-xs font-bold text-gray-500">
          تعداد دستاوردها: {selectedCategory.achievements.length}
        </p>

        {selectedCategory.achievements.length > 0 ? (
          <div className="max-h-[55vh] space-y-3 overflow-y-auto pr-1">
            {selectedCategory.achievements.map((achievement) => (
              <button
                key={achievement.id}
                type="button"
                onClick={() => setSelectedAchievement(achievement)}
                className="w-full rounded-2xl border border-yellow-100 bg-white/85 p-4 text-right shadow-sm transition hover:-translate-y-0.5 hover:border-yellow-300 hover:bg-yellow-50"
              >
                <p className="text-sm font-extrabold text-yellow-900">
                  {achievement.title}
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  🏫 صادرکننده: {achievement.issuer}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  📅 تاریخ: {achievement.date}
                </p>

                <p className="mt-2 line-clamp-2 text-xs leading-6 text-gray-600">
                  {achievement.desc}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-yellow-200 bg-white/70 p-6">
            <div className="mb-3 text-5xl">🏅</div>

            <p className="text-sm font-extrabold text-yellow-800">
              هنوز دستاوردی در این دسته ثبت نشده است.
            </p>

            <p className="mt-3 text-xs leading-6 text-gray-500">
              با دریافت اولین دستاورد، افتخارهای کودک در این بخش نمایش داده می‌شود.
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={() => setSelectedCategory(null)}
          className="mt-5 w-full rounded-2xl border border-yellow-300 bg-white px-6 py-3 text-sm font-extrabold text-yellow-700 transition hover:bg-yellow-50"
        >
          بستن
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

{/* 🏆 مودال جزئیات کامل دستاورد */}
<AnimatePresence>
  {selectedAchievement && (
    <motion.div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/55 backdrop-blur-sm px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSelectedAchievement(null)}
    >
      <motion.div
        className="
          relative w-full max-w-md overflow-hidden
          rounded-[2rem]
          border-2 border-[#d4af37]
          bg-gradient-to-br from-white via-yellow-50 to-amber-50
          p-5 text-center shadow-2xl
        "
        initial={{ scale: 0.9, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 24, opacity: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* نورهای بک‌گراند */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full bg-yellow-300/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-amber-300/25 blur-3xl" />

        {/* سربرگ رسمی */}
        <div className="relative z-10 mb-4 rounded-3xl border border-yellow-200 bg-white/80 px-4 py-3 shadow-sm">
          <p className="text-[11px] font-bold text-yellow-700">
            گواهی دستاورد ژنینو
          </p>

          <h3 className="mt-1 text-xl font-black text-yellow-900">
            {selectedAchievement.title}
          </h3>
        </div>

        {/* مدال */}
        <div
          className="
            relative z-10 mx-auto mb-4 flex h-28 w-28 items-center justify-center
            rounded-full border-[4px] border-[#f8e47a]
            bg-gradient-to-br from-[#fff8c7] via-[#ffd84d] to-[#d6a700]
            shadow-[0_0_35px_rgba(212,175,55,0.75)]
            overflow-hidden
          "
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/55 to-transparent"
            animate={{ x: ["-160%", "160%"] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
            style={{ transform: "rotate(20deg)" }}
          />

          <div className="relative z-10">
            {selectedCategory?.icon}
          </div>
        </div>

        {/* نوع دستاورد */}
        <div className="relative z-10 mb-4 inline-flex rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-xs font-extrabold text-yellow-800">
          {selectedCategory?.title}
        </div>

        {/* متن رسمی */}
        <div className="relative z-10 rounded-3xl border border-yellow-100 bg-white/85 p-4 text-right shadow-sm">
          <p className="text-sm leading-8 text-gray-700">
            {selectedAchievement.desc}
          </p>

          <div className="my-4 border-t border-yellow-100" />

          <div className="space-y-2 text-xs font-bold text-gray-600">
            <p>🏫 صادرکننده: {selectedAchievement.issuer}</p>
            <p>📅 تاریخ صدور: {selectedAchievement.date}</p>
          </div>
        </div>

        {/* دکمه‌ها */}
        <div className="relative z-10 mt-5 flex flex-col gap-3">

          <button
            type="button"
            className="
              w-full rounded-2xl
              bg-gradient-to-r from-pink-500 to-rose-400
              px-6 py-3 text-sm font-extrabold text-white
              shadow-md transition
              hover:from-pink-600 hover:to-rose-500
            "
          >
             ارسال هدیه
          </button>
          <button
  type="button"
  onClick={() => {
    if (isFamilyIssuer(selectedAchievement.issuer)) {
      setShowIssuerInfoModal(true);
      return;
    }

    alert("بعداً به صفحه صادرکننده متصل می‌شود");
  }}
  className="
    w-full rounded-2xl
    bg-gradient-to-r from-yellow-500 to-yellow-400
    px-6 py-3 text-sm font-extrabold text-white
    shadow-md transition
    hover:from-yellow-600 hover:to-yellow-500
  "
>
  مشاهده صفحه صادرکننده
</button>

          <button
            type="button"
            onClick={() => setSelectedAchievement(null)}
            className="
              w-full rounded-2xl border border-yellow-300 bg-white
              px-6 py-3 text-sm font-extrabold text-yellow-700
              transition hover:bg-yellow-50
            "
          >
            بازگشت به لیست دستاوردها
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

{/* ℹ️ مودال توضیح صادرکننده خانوادگی */}
<AnimatePresence>
  {showIssuerInfoModal && (
    <motion.div
      className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowIssuerInfoModal(false)}
    >
      <motion.div
        className="
          w-full max-w-md
          rounded-[2rem]
          border border-yellow-200
          bg-gradient-to-br from-white via-yellow-50 to-amber-50
          p-6 text-center
          shadow-2xl
        "
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-100 to-amber-200 shadow-inner">
          <span className="text-4xl">🌱</span>
        </div>

        <h3 className="text-xl font-black text-yellow-900">
          صادرکننده خانوادگی ژنینو
        </h3>

        <p className="mt-5 text-sm leading-8 text-gray-700">
          این دستاورد توسط یکی از اعضای خانواده یا درختواره کودک صادر شده است.
        </p>

        <p className="mt-3 text-sm leading-8 text-gray-600">
          در حال حاضر فقط صادرکنندگان رسمی ژنینو مانند مدارس،
          آموزشگاه‌ها، باشگاه‌ها و مراکز تخصصی دارای صفحه اختصاصی هستند.
        </p>

        <button
          type="button"
          onClick={() => setShowIssuerInfoModal(false)}
          className="
            mt-6 w-full rounded-2xl
            bg-gradient-to-r from-yellow-500 to-yellow-400
            px-6 py-3 text-sm font-extrabold text-white
            shadow-md transition
            hover:from-yellow-600 hover:to-yellow-500
          "
        >
          متوجه شدم
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </>
  );
}
