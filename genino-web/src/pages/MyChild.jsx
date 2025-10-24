import { motion } from "framer-motion";
import { Baby, Brain, Heart, Activity } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import FamilyTree from "./FamilyTree";
import AchievementsBar from "../components/AchievementsBar";
import TodayCalendarBox from "../components/TodayCalendarBox";

export default function MyChild() {
  const [activeTab, setActiveTab] = useState("physical");

  const tabs = [
    { id: "physical", title: "رشد فیزیکی", icon: <Activity className="w-5 h-5 mr-2 text-yellow-700" /> },
    { id: "mental", title: "رشد ذهنی", icon: <Brain className="w-5 h-5 mr-2 text-yellow-700" /> },
    { id: "emotional", title: "رشد احساسی", icon: <Heart className="w-5 h-5 mr-2 text-yellow-700" /> },
  ];

  const tabContent = {
    physical: "در این بخش می‌توانید قد، وزن، خواب و فعالیت بدنی کودک خود را ثبت و مشاهده کنید.",
    mental: "در اینجا تمرکز، حافظه، خلاقیت و توانایی حل مسئله‌ی کودک بررسی و پیشنهادهای تقویتی ارائه می‌شود.",
    emotional: "در این بخش احساسات، رفتارها و ارتباطات کودک ردیابی می‌شود تا رشد هیجانی بهتری داشته باشد.",
  };

  const stats = [
    { label: "قد", value: 95, unit: "سانتی‌متر", percent: 80 },
    { label: "وزن", value: 13, unit: "کیلوگرم", percent: 75 },
    { label: "تمرکز ذهنی", value: "عالی", unit: "", percent: 90 },
    { label: "احساس و انرژی", value: "شاد و فعال", unit: "", percent: 95 },
  ];

  const average = stats.reduce((sum, s) => sum + s.percent, 0) / stats.length;

  // 🌳 استیت‌های درختواره
  const [showFamilyTree, setShowFamilyTree] = useState(false);
  const [sisters, setSisters] = useState([]);
  const [brothers, setBrothers] = useState([]);
  const [aunts, setAunts] = useState([]);
  const [uncles, setUncles] = useState([]);
  const [khaleha, setKhaleha] = useState([]);
  const [dayiha, setDayiha] = useState([]);
  const [others, setOthers] = useState([]);

  // 👶 اطلاعات کودک از localStorage
  const [childPhoto, setChildPhoto] = useState(localStorage.getItem("childPhoto") || null);
  const [childName, setChildName] = useState(localStorage.getItem("childName") || "حنا");
  const [birthDate, setBirthDate] = useState(localStorage.getItem("birthDate") || "2021-03-12");
  const [gender, setGender] = useState(localStorage.getItem("gender") || "girl");

  // 📆 محاسبه دقیق سن و روز مانده تا تولد
const birth = new Date(birthDate);
const today = new Date();

// محاسبه سن به سال و ماه
let ageYears = today.getFullYear() - birth.getFullYear();
let ageMonths = today.getMonth() - birth.getMonth();
if (today.getDate() < birth.getDate()) ageMonths--;

if (ageMonths < 0) {
  ageYears--;
  ageMonths += 12;
}
const ageText = `${ageYears} سال و ${ageMonths} ماه`;

// محاسبه دقیق روزهای مانده تا تولد بعدی
let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
if (nextBirthday < today) {
  nextBirthday = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
}
const msInDay = 1000 * 60 * 60 * 24;
const daysLeft = Math.ceil((nextBirthday - today) / msInDay);


  return (
    <main
      dir="rtl"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden 
             bg-gradient-to-b from-[#fff5cc] via-[#ffe88a] to-[#ffd95c] text-gray-800 pt-28 sm:pt-10"
    >
      {/* ☀️ نور طلایی بالا */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#fff8dc]/90 to-transparent z-[2] blur-2xl pointer-events-none" />

      {/* 🧬 DNA طلایی پراکنده */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fffce6] to-[#ffefb3] overflow-hidden z-[1]">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.svg
            key={i}
            viewBox="0 0 100 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute opacity-30"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              transformOrigin: "center",
            }}
            animate={{ rotate: [0, i % 2 === 0 ? 360 : -360] }}
            transition={{
              duration: 80 + Math.random() * 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <defs>
              <linearGradient id={`dnaGrad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffd700" />
                <stop offset="100%" stopColor="#b8860b" />
              </linearGradient>
            </defs>
            <path
              d="M30,10 C50,30 50,70 30,90 C10,110 10,150 30,170"
              stroke={`url(#dnaGrad-${i})`}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M70,10 C50,30 50,70 70,90 C90,110 90,150 70,170"
              stroke={`url(#dnaGrad-${i})`}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </motion.svg>
        ))}
      </div>

      {/* 🏅 نوار دستاوردهای کودک */}
      <AchievementsBar />

      {/* 📅 باکس تقویم امروز */}
<TodayCalendarBox color="yellow" />


     {/* 👶 دایره کودک */}
<motion.div
  className="relative z-[5] flex flex-col items-center text-center"
  animate={{ y: [0, -8, 0] }}
  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
>
  <div className="relative flex flex-col items-center">
    {/* 📸 دایره تصویر */}
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      className="flex items-center justify-center w-44 h-44 rounded-full bg-white/70 backdrop-blur-md 
                 shadow-[0_0_70px_rgba(212,175,55,0.6)] border border-yellow-300 overflow-hidden"
    >
      {childPhoto ? (
        <img src={childPhoto} alt="کودک" className="w-full h-full object-cover" />
      ) : (
        <Baby className="w-24 h-24 text-yellow-700 drop-shadow-xl" />
      )}
    </motion.div>

    {/* 🎂 روزشمار تولد (جای درست در همه حالت‌ها) */}
<motion.div
  className="mt-5 sm:mt-6 mb-2 
             bg-gradient-to-r from-yellow-400 to-yellow-300 
             text-yellow-900 text-sm sm:text-base font-semibold
             px-5 py-2 rounded-2xl shadow-lg border border-yellow-200 
             whitespace-nowrap z-10"
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5 }}
>
  🎂 {daysLeft} روز مانده تا تولد {childName}
</motion.div>


    {/* 🔗 لینک پروفایل کودک */}
    <Link
      to="/child-profile"
      className="mt-3 text-sm text-yellow-700 font-semibold hover:text-yellow-900 transition underline underline-offset-4"
    >
      ✏️ ویرایش اطلاعات کودک
    </Link>
  </div>

  {/* 👧 نام، سن و جنسیت */}
  <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold text-yellow-800 drop-shadow-[0_0_10px_rgba(255,220,100,0.7)]">
    {childName} 
  </h1>
  <p className="text-gray-700 text-sm mt-2">
    {ageText} ({gender === "girl" ? "دختر" : "پسر"})
  </p>
</motion.div>



{/* 🌳 دکمه باز کردن درختواره */}
<motion.div
  className="relative z-[5] mt-10 mb-10 flex justify-center"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.6 }}
>
  <button
    onClick={() => setShowFamilyTree(true)}
    className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white px-8 py-3 rounded-2xl font-semibold shadow-md hover:from-yellow-600 hover:to-yellow-500 transition-all"
  >
    🌳 درختواره کودک من
  </button>
</motion.div>
<FamilyTree show={showFamilyTree} onClose={() => setShowFamilyTree(false)} />

{/* 🖼️ دکمه آلبوم خاطرات */}
<motion.div
  className="relative z-[5] -mt-6 mb-12 flex justify-center"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4, duration: 0.6 }}
>
  <Link
    to="/memory-album"
    className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#facc15] via-[#fbbf24] to-[#f59e0b] 
               text-white px-10 py-3 rounded-2xl font-semibold shadow-[0_0_20px_rgba(251,191,36,0.6)] 
               hover:scale-105 hover:shadow-[0_0_30px_rgba(251,191,36,0.8)] transition-all"
  >
    📸 آلبوم خاطرات
  </Link>
</motion.div>


      {/* 🧠 باکس پرسشنامه تخصصی ژنینو */}
<motion.div
  className="relative z-[6] mt-2 mb-4 bg-gradient-to-br from-yellow-100 to-yellow-50 border border-yellow-300 rounded-3xl shadow-lg p-8 text-center w-full max-w-2xl"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  <h2 className="text-2xl sm:text-3xl font-extrabold text-yellow-800 mb-4 drop-shadow-[0_0_8px_rgba(255,220,100,0.6)]">
    🧠 پرسشنامه تخصصی ژنینو – کودک من
  </h2>

  <p className="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
    با پاسخ به چند سؤال هدفمند درباره رفتار، احساس و رشد فرزندتان،
    ژنینو تحلیل هوشمند رشد کودک را در اختیارتان قرار می‌دهد.
  </p>

  <motion.div
    whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(212,175,55,0.6)" }}
    whileTap={{ scale: 0.97 }}
  >
    <Link
      to="/child-assessment"
      className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white px-10 py-3 rounded-xl font-semibold shadow-md hover:from-yellow-600 hover:to-yellow-500 transition-all"
    >
      ✨ شروع پرسشنامه
    </Link>
  </motion.div>
</motion.div>

{/* 📊 نمایش تحلیل نتایج پرسشنامه */}
{(() => {
  const savedResult = localStorage.getItem("childAssessmentResult");
  if (!savedResult) return null;

  const result = JSON.parse(savedResult);
  const keys = Object.keys(result);
  const values = Object.values(result);

  return (
    <motion.div
      className="relative z-[6] mt-8 bg-white/85 backdrop-blur-sm border border-yellow-200 rounded-3xl shadow-lg p-6 max-w-2xl w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-xl font-bold text-yellow-800 mb-4 text-center">
        📈 تحلیل نتایج رشد کودک
      </h3>

      <div className="space-y-4">
        {keys.map((key, i) => (
          <div key={i}>
            <div className="flex justify-between mb-1 text-sm text-gray-700">
              <span>{key}</span>
              <span>{values[i]}%</span>
            </div>
            <div className="w-full h-3 bg-yellow-100 rounded-full overflow-hidden">
              <motion.div
                className="h-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.6)]"
                initial={{ width: 0 }}
                animate={{ width: `${values[i]}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
})()}

      {/* 🌟 تب‌ها */}
      <motion.div
        className="relative z-[5] mt-12 bg-white/85 backdrop-blur-sm border border-yellow-200 rounded-3xl shadow-xl p-6 max-w-2xl w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-around mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-yellow-500 to-yellow-400 text-white shadow-md"
                  : "bg-white/60 border border-yellow-200 text-yellow-700 hover:bg-yellow-50"
              }`}
            >
              {tab.icon}
              {tab.title}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-gray-700 text-sm sm:text-base leading-relaxed text-center"
        >
          {tabContent[activeTab]}
        </motion.div>

        <div className="flex justify-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(212,175,55,0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white px-8 py-3 rounded-xl font-medium shadow-md hover:from-yellow-600 hover:to-yellow-500 transition-all"
          >
            ثبت اطلاعات در این بخش
          </motion.button>
        </div>
      </motion.div>

      {/* 📊 داشبورد رشد کودک */}
      <motion.div
        className="relative z-[5] mt-10 mb-20 bg-white/90 backdrop-blur-md border border-yellow-200 rounded-3xl shadow-2xl p-8 max-w-2xl w-full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <h2 className="text-xl font-bold text-yellow-700 text-center mb-6">
          🧾 خلاصه رشد حنا
        </h2>

        {/* 🟡 دایره پیشرفت کلی */}
        <div className="flex justify-center mb-8">
          <div className="relative w-40 h-40">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="45" stroke="#f0e0a0" strokeWidth="10" fill="none" />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#goldGradient)"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="283"
                strokeDashoffset={283 - (average * 283) / 100}
                className="drop-shadow-[0_0_10px_rgba(212,175,55,0.7)]"
              />
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffd700" />
                  <stop offset="100%" stopColor="#b8860b" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-bold text-yellow-700 text-xl">
              {Math.round(average)}%
            </span>
          </div>
        </div>

        {/* 🔸 نوارهای رشد */}
        <div className="space-y-5">
          {stats.map((stat, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm text-gray-700 mb-1">
                <span>{stat.label}</span>
                <span>
                  {stat.value} {stat.unit}
                </span>
              </div>
              <div className="w-full bg-yellow-100 h-3 rounded-full overflow-hidden">
                <motion.div
                  className="h-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.6)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.percent}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

</main>
);
}
