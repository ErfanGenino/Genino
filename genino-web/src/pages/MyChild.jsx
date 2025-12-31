import { motion } from "framer-motion";
import { Baby } from "lucide-react";
import { HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";
import FamilyTree from "./FamilyTree";
import AchievementsBar from "@components/Dashboard/AchievementsBar";
import TodayCalendarBox from "@components/Dashboard/TodayCalendarBox";
import GeninoAwarenessBox from "@components/Awareness/GeninoAwarenessBox";
import GeninoHealthButton from "@components/Assessments/GeninoHealthButton";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../services/api";




export default function MyChild() {

const navigate = useNavigate();


const [isLoading, setIsLoading] = useState(true);
const [confirmDelete, setConfirmDelete] = useState(false);
const [selectedChildForTree, setSelectedChildForTree] = useState(null);

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
const loadChildren = () => {
  const stored = localStorage.getItem("children");
  return stored ? JSON.parse(stored) : [];
};

const [childrenList, setChildrenList] = useState([]);
const [activeChildId, setActiveChildId] = useState(
  childrenList[0]?.id || null
); 

useEffect(() => {
  async function loadChildrenFromApi() {
    try {
      const token = localStorage.getItem("genino_token"); // همون JWT که بعد از لاگین ذخیره کردی
      if (!token) throw new Error("no token");

      const data = await authFetch("/children");
      setIsLoading(false);



      // اگر از بک‌اند داده داریم
      if (Array.isArray(data) && data.length > 0) {
        setChildrenList(data);
        setActiveChildId(data[0].id);
        localStorage.setItem("children", JSON.stringify(data));
        setIsLoading(false);
        return;
      }
    } catch (e) {
      // fallback
    }

    // fallback به localStorage
    const stored = localStorage.getItem("children");
const parsed = stored ? JSON.parse(stored) : [];

if (parsed.length === 0) {
  navigate("/child-profile?mode=createFirst", { replace: true });
} else {
  setChildrenList(parsed);
  setActiveChildId(parsed[0].id);
  setIsLoading(false);
}

}

  loadChildrenFromApi();  
}, []);


useEffect(() => {
  const sync = () => {
    const stored = localStorage.getItem("children");
    const parsed = stored ? JSON.parse(stored) : [];
    setChildrenList(parsed);

    // اگر activeChildId خالی بود و حداقل یک کودک داریم
    if (!activeChildId && parsed.length > 0) {
      setActiveChildId(parsed[0].id);
    }
  };

  sync();

  // وقتی در تب دیگری هم تغییر کرد
  window.addEventListener("storage", sync);
  return () => window.removeEventListener("storage", sync);
}, [activeChildId]);




const activeChild = childrenList.find(
  (child) => child.id === activeChildId
);

if (isLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      در حال آماده‌سازی صفحه کودک...
    </div>
  );
}

if (!activeChild) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      هیچ کودکی ثبت نشده است
    </div>
  );
}


  // 📆 محاسبه دقیق سن و روز مانده تا تولد
const birth = new Date(activeChild.birthDate);
const today = new Date();

// محاسبه دقیق روزهای مانده تا تولد بعدی
let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
if (nextBirthday < today) {
  nextBirthday = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
}
const msInDay = 1000 * 60 * 60 * 24;
const daysLeft = Math.ceil((nextBirthday - today) / msInDay);


// محاسبه سن به سال و ماه
let ageYears = today.getFullYear() - birth.getFullYear();
let ageMonths = today.getMonth() - birth.getMonth();
if (today.getDate() < birth.getDate()) ageMonths--;

if (ageMonths < 0) {
  ageYears--;
  ageMonths += 12;
}
const ageText = `${ageYears} سال و ${ageMonths} ماه`;



// امکان حذف کودک از نوار کودک من
const handleDeleteChild = async (childId) => {
  try {
    const token = localStorage.getItem("genino_token");
    if (!token) {
      alert("لطفاً دوباره وارد شوید");
      return;
    }

    await authFetch(`/children/${childId}`, { method: "DELETE" });

    // 🔄 بعد از حذف، لیست جدید کودکان
    const updatedChildren = await authFetch("/children");


    localStorage.setItem("children", JSON.stringify(updatedChildren));

    if (updatedChildren.length === 0) {
      navigate("/child-profile?mode=createFirst", { replace: true });
    } else {
      setChildrenList(updatedChildren);
      setActiveChildId(updatedChildren[0].id);
    }
  } catch (err) {
    console.error(err);
    alert("حذف کودک انجام نشد");
  }
};





  return (
    <main
      dir="rtl"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden 
             bg-gradient-to-b from-[#fff5cc] via-[#ffe88a] to-[#ffd95c] text-gray-800 pt-28 sm:pt-10 pb-24"
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

      {/* 👨‍👩‍👧 نوار تب‌های فرزندان من */}
<motion.div
  className="relative z-[6] mt-6 mb-6 w-full max-w-4xl px-4"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <div className="flex gap-3 overflow-x-auto pb-2">

    {childrenList.map((child) => (
      <button
        key={child.id}
        onClick={() => setActiveChildId(child.id)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border
          whitespace-nowrap transition
          ${
            activeChildId === child.id
              ? "bg-yellow-400 text-white border-yellow-400 shadow-md"
              : "bg-white/80 text-gray-700 border-yellow-200 hover:bg-yellow-50"
          }`}
      >
        {/* آواتار کوچک */}
        <div className="w-8 h-8 rounded-full bg-yellow-200 overflow-hidden flex items-center justify-center">
          {child.photo ? (
            <img
              src={child.photo}
              alt={child.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xs">👶</span>
          )}
        </div>

        <span className="text-sm font-medium">{child.fullName}</span>
      </button>
    ))}
    {/* ➕ افزودن فرزند */}
<Link
  to="/child-profile"
  className="flex items-center gap-2 px-4 py-2 rounded-full border
             bg-white/80 text-yellow-700 border-yellow-300
             hover:bg-yellow-50 transition
             whitespace-nowrap"
>
  <span className="text-lg">➕</span>
  <span className="text-sm font-medium">افزودن فرزند</span>
</Link>
  </div>
</motion.div>


      {/* 🏅 نوار دستاوردهای کودک */}
      <AchievementsBar />

      {/* 📅 باکس تقویم امروز */}
<TodayCalendarBox color="yellow" />



{/* 👶 باکس پروفایل کودک فعال */}
<motion.div
  className="relative z-[6] mt-8 mb-10 w-full max-w-2xl px-4"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <div
    className="bg-gradient-to-br from-[#fff7cc] via-[#fffbe6] to-white 
               backdrop-blur-sm border border-yellow-300 
               rounded-3xl shadow-lg p-6 text-center"
  >
    {/* 🧒 تصویر کودک */}
    <div className="flex justify-center -mt-16 mb-4">
      <div className="w-52 h-52 rounded-full p-[4px] bg-gradient-to-tr from-yellow-500 via-yellow-300 to-yellow-100 shadow-lg">
        <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
          {activeChild?.photo ? (
            <img
              src={activeChild.photo}
              alt={activeChild.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Baby className="w-20 h-20 text-yellow-700" />
          )}
        </div>
      </div>
    </div>

    {/* 📝 نام کودک */}
    <h2 className="text-2xl font-extrabold text-yellow-800 mb-1">
      {activeChild?.fullName || "نام کودک"}
    </h2>

    {/* 🎂 سن و جنسیت */}
    <p className="text-sm text-gray-600 mb-4">
      {ageText} (
      {activeChild?.gender === "girl" ? "دختر" : "پسر"}
      )
    </p>

    {/* 📊 اطلاعات خلاصه */}
    <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-5">
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
        🎂 {daysLeft} روز مانده تا تولد
      </div>
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
        🌸 جنسیت: {activeChild?.gender === "girl" ? "دختر" : "پسر"}
      </div>
    </div>

    <div className="mt-4 flex gap-3">

  {/* ✏️ ویرایش */}
  <Link
    to={`/child-profile?mode=edit&id=${activeChild.id}`}
    className="flex-1 inline-flex items-center justify-center gap-2
               bg-gradient-to-r from-yellow-500 to-yellow-400
               text-white py-2 rounded-xl font-semibold shadow-md
               hover:from-yellow-600 hover:to-yellow-500 transition"
  >
    ✏️ ویرایش
  </Link>

  {/* 🗑️ حذف */}
  {!confirmDelete ? (
    <button
      onClick={() => setConfirmDelete(true)}
      className="flex-1 inline-flex items-center justify-center gap-2
                 bg-white border border-gray-300 text-gray-600
                 py-2 rounded-xl font-semibold
                 hover:border-red-300 hover:text-red-600
                 hover:bg-red-50 transition"
    >
      🗑️ حذف
    </button>
  ) : (
    <button
      onClick={() => {
        setConfirmDelete(false);
        handleDeleteChild(activeChild.id);
      }}
      className="flex-1 inline-flex items-center justify-center gap-2
                 bg-red-600 text-white py-2 rounded-xl font-semibold
                 hover:bg-red-700 transition"
    >
      حذف قطعی
    </button>
  )}
</div>



  </div>
</motion.div>



{/* 🧩 باکس دسترسی‌های کودک */}
<motion.div
  className="relative z-[5] mt-10 mb-12 w-full max-w-3xl px-4"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

    {/* 🌳 درختواره کودک */}
    <button
      onClick={() => {
        if (!activeChild) return;
        setSelectedChildForTree(activeChild);
        setShowFamilyTree(true);
      }}
      className={`flex items-center justify-center gap-3 h-24 rounded-3xl
        bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500
        text-white font-extrabold text-lg
        shadow-[0_0_18px_rgba(251,191,36,0.55)]
        hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(251,191,36,0.75)]
        transition-all
        ${!activeChild ? "opacity-50 cursor-not-allowed" : ""}
      `}
      disabled={!activeChild}
    >
      🌳 درختواره کودک
    </button>

    {/* 📸 آلبوم خاطرات */}
    <Link
      to="/memory-album"
      className="flex items-center justify-center gap-3 h-24 rounded-3xl
                 bg-gradient-to-br from-[#fde68a] via-[#facc15] to-[#f59e0b]
                 text-white font-extrabold text-lg
                 shadow-[0_0_18px_rgba(251,191,36,0.55)]
                 hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(251,191,36,0.75)]
                 transition-all"
    >
      📸 آلبوم خاطرات
    </Link>

  </div>
</motion.div>

{/* 🌳 مودال درختواره کودک */}
<FamilyTree
  show={showFamilyTree}
  child={selectedChildForTree}
  onClose={() => {
    setShowFamilyTree(false);
    setSelectedChildForTree(null);
  }}
/>





{/* 🧠 جعبه آگاهی ژنینو */}
<motion.div
  className="relative z-[6] -mt-8 mb-10 w-full max-w-2xl"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <GeninoAwarenessBox
    image="/images/awareness/mychild/1.jpg"
    message="کودکان با هر نگاه، از ما یاد می‌گیرند 💛 آگاهی والد، روشنایی مسیر رشد کودک است."
    buttons={[
      { title: "بازی آزاد", link: "/articles/freeplay" },
      { title: "ژن های طلایی کودکی", link: "/articles/golden-child-genes" },
      { title: "ژن‌های مرتبط با هوش کودکان", link: "/articles/child-intelligence-genes" },
      { title: "محبت بدون شرط", link: "/articles/unconditional-love" },
      { title: "الگوی رفتاری والدین در خانه", link: "/articles/parenting-behavior-at-home" },
      { title: "کنار آمدن با ترس‌ها و اضطراب کودک", link: "/articles/child-anxiety-and-fear-management" },
    ]}
  />
</motion.div>

{/* 🌕 دکمه سکه‌ای پایش سلامت کودک */}
<motion.div
  className="relative z-[10] mt-6 mb-12 flex justify-center"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <Link
  to={`/child-health-check?childId=${activeChild?.id}`}
  className={`block ${!activeChild ? "pointer-events-none opacity-50" : ""}`}
>
  <GeninoHealthButton
    title="پایش سلامت کودک"
    icon={HeartPulse}
  />
</Link>

</motion.div>




</main>
);
}
