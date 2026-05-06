import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/colors/yellow.css";
import DateObject from "react-date-object";
import GeninoAwarenessBox from "../components/Awareness/GeninoAwarenessBox";
import calorieDietCategories from "../data/calorieDietCategories";
import { useNavigate } from "react-router-dom";
import FoodSelectorModal from "../components/Calorie/FoodSelectorModal";
import foodData from "../data/foodData";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function CalorieTracker() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [activeFoodDay, setActiveFoodDay] = useState(null);
  const [loggedDays, setLoggedDays] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const missedDays = selectedDay ? Math.max(totalDays - loggedDays, 0) : 0;
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("genino_user") || "{}");
  const userName =
        user?.fullName ||
        user?.fullname ||
        user?.displayName ||
        user?.name ||
       `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
       "دوست من";
  const [showDeleteStartModal, setShowDeleteStartModal] = useState(false);
  const [tempStartDay, setTempStartDay] = useState(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showTotalDaysModal, setShowTotalDaysModal] = useState(false);
  const [showLoggedDaysModal, setShowLoggedDaysModal] = useState(false);
  const [showMissedDaysModal, setShowMissedDaysModal] = useState(false);
  const [allDaysList, setAllDaysList] = useState([]);
  const [loggedDaysList, setLoggedDaysList] = useState([]);
  const [missedDaysList, setMissedDaysList] = useState([]);
  const [totalReportDateFilter, setTotalReportDateFilter] = useState("");
  const [totalReportYearFilter, setTotalReportYearFilter] = useState("");
  const [totalReportMonthFilter, setTotalReportMonthFilter] = useState("");
  const [loggedYearFilter, setLoggedYearFilter] = useState("");
  const [loggedMonthFilter, setLoggedMonthFilter] = useState("");
  const [missedYearFilter, setMissedYearFilter] = useState("");
  const [missedMonthFilter, setMissedMonthFilter] = useState("");
  const [isCalorieDataLoaded, setIsCalorieDataLoaded] = useState(false);

  const isLoggedIn = Boolean(localStorage.getItem("genino_token"));
  

  useEffect(() => {
  if (!isLoggedIn) return;

  const fetchCalorieData = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/calorie-tracker`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("genino_token")}`,
        },
      });

      const data = await res.json();

      if (!data?.ok) return;

      // تاریخ شروع
      if (data.startDate) {
        const [year, month, day] = data.startDate
          .split("/")
          .map(Number);

        setSelectedDay({
          year,
          month,
          day,
        });
      }

      // تاریخچه کالری
      if (Array.isArray(data.calorieHistory)) {
        const formattedHistory = data.calorieHistory.map((item) => ({
          effectiveFrom: normalizePersianDay({
            year: Number(item.effectiveFrom.split("/")[0]),
            month: Number(item.effectiveFrom.split("/")[1]),
            day: Number(item.effectiveFrom.split("/")[2]),
          }),
          calories: item.calories,
        }));

        setCalorieHistory(formattedHistory);

        const latestProfile =
          data.calorieHistory[data.calorieHistory.length - 1];

        if (latestProfile) {
          setDailyCalories(latestProfile.calories);

          setCalorieProfile({
            gender: latestProfile.gender,
            age: latestProfile.age,
            height: latestProfile.height,
            weight: latestProfile.weight,
            activityLevel: latestProfile.activityLevel,
            updatedAt: latestProfile.effectiveFrom,
            bmi: latestProfile.bmi,
            idealWeightMin: latestProfile.idealWeightMin,
            idealWeightMax: latestProfile.idealWeightMax,
            goal: latestProfile.goal,
            maintenanceCalories: latestProfile.maintenanceCalories,
          });
        }
      }

      // لاگ روزانه غذاها
      if (Array.isArray(data.dailyLogs)) {
        const logsObject = {};

        data.dailyLogs.forEach((log) => {
          logsObject[log.dateKey] = {
            dateText: log.dateText,
            foods: log.foods,
            calories: log.calories,
            totalCalories: log.totalCalories,
            allowedCalories: log.allowedCalories,
          };
        });

        setDailyFoodLogs(logsObject);
        setIsCalorieDataLoaded(true);
      }
    } catch (err) {
      console.error("FETCH CALORIE DATA ERROR:", err);
    }
  };

  fetchCalorieData();
}, [isLoggedIn]);

  const [selectedFoods, setSelectedFoods] = useState({
    صبحانه: [],
    ناهار: [],
    شام: [],
    "میان‌وعده": [],
  });

  const [mealCalories, setMealCalories] = useState({
    صبحانه: 0,
    ناهار: 0,
    شام: 0,
    "میان‌وعده": 0,
  });

  const [dailyFoodLogs, setDailyFoodLogs] = useState({});

  const totalCalories =
    mealCalories.صبحانه +
    mealCalories.ناهار +
    mealCalories.شام +
    mealCalories["میان‌وعده"];



  const foodOptions = foodData;

  const handleFoodSelection = (meal, food) => {
    const isSelected = selectedFoods[meal].includes(food.name);
    const updatedFoods = { ...selectedFoods };
    const updatedCalories = { ...mealCalories };

    if (isSelected) {
      updatedFoods[meal] = updatedFoods[meal].filter((f) => f !== food.name);
      updatedCalories[meal] -= food.calories;
    } else {
      updatedFoods[meal].push(food.name);
      updatedCalories[meal] += food.calories;
    }

    setSelectedFoods(updatedFoods);
    setMealCalories(updatedCalories);
  };

  useEffect(() => {
  if (selectedDay) {
    try {
      // ساخت تاریخ شمسی با DateObject و تبدیل دقیق به JS Date
      const start = new DateObject({
        calendar: persian,
        year: selectedDay.year,
        month: selectedDay.month,
        day: selectedDay.day,
      }).toDate();

      // نرمال‌سازی به ۰۰:۰۰ برای جلوگیری از خطای منطقه‌زمانی/ساعت تابستانی
      const today = new Date();
      start.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      // اختلاف روزها +1 تا روز شروع هم شمرده شود
      const diffDays = Math.floor((today - start) / 86400000);
      setTotalDays(diffDays >= 0 ? diffDays + 1 : 0);
    } catch {
      setTotalDays(0);
      setIsCalorieDataLoaded(true);
    }
  } else {
    setTotalDays(0);
  }
}, [selectedDay]);

  const apples = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    size: 28 + Math.random() * 25,
    top: `${Math.random() * 90}%`,
    left: `${Math.random() * 90}%`,
    duration: 25 + Math.random() * 30,
    delay: Math.random() * 10,
    emoji: Math.random() > 0.5 ? "🍎" : "🍏",
  }));

  
  const [showCalorieModal, setShowCalorieModal] = useState(false);
const [gender, setGender] = useState("");
const [age, setAge] = useState("");
const [height, setHeight] = useState("");
const [weight, setWeight] = useState("");
const [activityLevel, setActivityLevel] = useState("");
const [dailyCalories, setDailyCalories] = useState(null);
const [calorieHistory, setCalorieHistory] = useState([]);
const [calorieProfile, setCalorieProfile] = useState(null);
const [bmi, setBmi] = useState(null);
const [idealWeightRange, setIdealWeightRange] = useState(null);
const [weightGoal, setWeightGoal] = useState("maintain");

  const awarenessButtons = [
  { title: "رژیم‌های عمومی", categoryId: "general-lifestyle" },
  { title: "رژیم‌های هدف‌محور", categoryId: "goal-based" },
  { title: "رژیم‌های درمانی", categoryId: "medical-restrictive" },
  { title: "گروه‌های خاص", categoryId: "special-groups" },
];

const selectedCategoryData = calorieDietCategories.find(
  (category) => category.id === activeCategory
);

const handleAwarenessButtonClick = (btn) => {
  setActiveCategory((prev) =>
    prev === btn.categoryId ? null : btn.categoryId
  );
};

const todayPersian = useMemo(
  () =>
    new DateObject({
      calendar: persian,
      locale: persian_fa,
    }),
  []
);

const normalizePersianDay = (day) => ({
  year: Number(day.year),
  month: Number(day.month?.number || day.month),
  day: Number(day.day),
});

const formatPersianDay = (day) => {
  if (!day) return "";
  return `${day.year}/${String(day.month).padStart(2, "0")}/${String(
    day.day
  ).padStart(2, "0")}`;
};

const getDayKey = (day) => {
  if (!day) return "";
  return `${day.year}-${String(day.month).padStart(2, "0")}-${String(
    day.day
  ).padStart(2, "0")}`;
};


const persianDayToDateObject = (day) =>
  new DateObject({
    calendar: persian,
    locale: persian_fa,
    year: day.year,
    month: day.month,
    day: day.day,
  });

const comparePersianDays = (a, b) => {
  const dateA = persianDayToDateObject(a).toDate();
  const dateB = persianDayToDateObject(b).toDate();

  dateA.setHours(0, 0, 0, 0);
  dateB.setHours(0, 0, 0, 0);

  return dateA.getTime() - dateB.getTime();
};

const buildDaysListFromStartToToday = (startDay) => {
  if (!startDay) return [];

  const days = [];
  const current = persianDayToDateObject(startDay);
  const today = persianDayToDateObject(todayDay);

  while (current.toDate().getTime() <= today.toDate().getTime()) {
    days.push({
      year: current.year,
      month: current.month.number,
      day: current.day,
      dateText: formatPersianDay({
        year: current.year,
        month: current.month.number,
        day: current.day,
      }),
    });

    current.add(1, "day");
  }

  return days;
};

const todayDay = useMemo(
  () => normalizePersianDay(todayPersian),
  [todayPersian]
);

const activeDay = activeFoodDay || todayDay;

const isActiveDayToday =
  comparePersianDays(activeDay, todayDay) === 0;

const isActiveDayStartDay =
  selectedDay && comparePersianDays(activeDay, selectedDay) === 0;

  const openDayInFoodSection = (day) => {
  setActiveFoodDay({
    year: day.year,
    month: day.month,
    day: day.day,
  });

  setShowLoggedDaysModal(false);
  setShowMissedDaysModal(false);
  setShowTotalDaysModal(false);
};

const filterDaysByYearMonth = (days, yearFilter, monthFilter) => {
  return days.filter((day) => {
    const matchYear = yearFilter ? String(day.year) === String(yearFilter) : true;
    const matchMonth = monthFilter ? String(day.month) === String(monthFilter) : true;

    return matchYear && matchMonth;
  });
};

const filteredTotalDaysList = allDaysList.filter((day) => {
  const matchDate = totalReportDateFilter
    ? day.dateText.includes(totalReportDateFilter.trim())
    : true;

  const matchYear = totalReportYearFilter
    ? String(day.year) === String(totalReportYearFilter)
    : true;

  const matchMonth = totalReportMonthFilter
    ? String(day.month) === String(totalReportMonthFilter)
    : true;

  return matchDate && matchYear && matchMonth;
});

const filteredLoggedDaysList = filterDaysByYearMonth(
  loggedDaysList,
  loggedYearFilter,
  loggedMonthFilter
);

const filteredMissedDaysList = filterDaysByYearMonth(
  missedDaysList,
  missedYearFilter,
  missedMonthFilter
);

const filteredTotalReportLogs = filteredTotalDaysList
  .map((day) => dailyFoodLogs[getDayKey(day)])
  .filter((log) => log?.totalCalories > 0);

  const getAllowedCaloriesForDay = (day) => {
  const matchedHistory = calorieHistory
    .filter((item) => comparePersianDays(item.effectiveFrom, day) <= 0)
    .sort((a, b) => comparePersianDays(b.effectiveFrom, a.effectiveFrom))[0];

  return matchedHistory?.calories || 0;
};

useEffect(() => {
  if (!activeDay || !isCalorieDataLoaded) return;

  const dayKey = getDayKey(activeDay);
  const savedLog = dailyFoodLogs[dayKey];

  if (savedLog) {
    setSelectedFoods(savedLog.foods);
    setMealCalories(savedLog.calories);
  } else {
    setSelectedFoods({
      صبحانه: [],
      ناهار: [],
      شام: [],
      "میان‌وعده": [],
    });

    setMealCalories({
      صبحانه: 0,
      ناهار: 0,
      شام: 0,
      "میان‌وعده": 0,
    });
  }
}, [activeDay, isCalorieDataLoaded]);



  

useEffect(() => {
  const logged = allDaysList.filter((day) => {
    const dayKey = getDayKey(day);
    return Boolean(dailyFoodLogs[dayKey]);
  });

  const missed = allDaysList.filter((day) => {
    const dayKey = getDayKey(day);
    return !dailyFoodLogs[dayKey];
  });

  setLoggedDaysList(logged);
  setMissedDaysList(missed);
  setLoggedDays(logged.length);
}, [allDaysList, dailyFoodLogs]);

useEffect(() => {
  if (selectedDay && !activeFoodDay) {
    setActiveFoodDay(normalizePersianDay(todayPersian));
  }
}, [selectedDay]);

useEffect(() => {
  if (!selectedDay) {
    setAllDaysList([]);
    return;
  }

  const days = buildDaysListFromStartToToday(selectedDay);
  setAllDaysList(days);
  setTotalDays(days.length);
}, [selectedDay]);


  return (
    <main
      dir="rtl"
      className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-[#f7f2eb] to-[#fffdf8] text-gray-800 pt-10 px-6 text-center overflow-hidden"
    >
      {/* 🧬 بک‌گراند DNA */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fffdf8] to-[#f7f3e6] overflow-hidden z-0">
        {Array.from({ length: 8 }).map((_, i) => (
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
              duration: 60 + Math.random() * 40,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <path
              d="M30,10 C50,30 50,70 30,90 C10,110 10,150 30,170"
              stroke="#d4af37"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M70,10 C50,30 50,70 70,90 C90,110 90,150 70,170"
              stroke="#b88a1a"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </motion.svg>
        ))}
      </div>

      {/* 🍎 سیب‌ها */}
      {apples.map((apple) => (
        <motion.div
          key={apple.id}
          className="absolute text-3xl opacity-40 select-none z-[2]"
          style={{
            top: apple.top,
            left: apple.left,
            fontSize: apple.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 360],
          }}
          transition={{
            duration: apple.duration,
            delay: apple.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {apple.emoji}
        </motion.div>
      ))}

      

      {/* ✨ جمله انگیزشی + تاریخ */}
<motion.div
  initial={{ opacity: 0, y: -40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="relative z-10 mt-8 mb-16 bg-white/70 backdrop-blur-md border border-yellow-100 rounded-3xl shadow-lg p-6 sm:p-10 max-w-2xl text-center"
>
  <h1 className="text-2xl sm:text-3xl font-extrabold text-yellow-600 mb-4 leading-relaxed">
  {!selectedDay ? (
    "برای شروع کالری‌شماری، تاریخ شروع کالری‌شماری خود را ثبت کنید"
  ) : (
    <>
      <span className="block text-gray-700 text-lg mb-2">
        {userName} عزیز 🌿
      </span>
      بهت تبریک می‌گم
    </>
  )}
</h1>
  {selectedDay && (
  <p className="text-gray-700 leading-relaxed text-lg sm:text-xl font-medium">
    اولین قدم رو برای ساختن{" "}
    <span className="text-yellow-600 font-semibold">
      بهترین نسخه‌ی بدنی خودت
    </span>{" "}
    برداشتی.
  </p>
)}
  <p className="mt-4 text-gray-600 italic text-base sm:text-lg">
    یادت باشه 💫{" "}
    <span className="text-yellow-600 font-semibold">سخت‌ترین قدم، همیشه اولین قدمه.</span>
  </p>

  {/* 📅 تاریخ */}
<div className="mt-8 flex justify-center relative z-[50]">
  <button
  type="button"
  onClick={async () => {
    if (!isLoggedIn) {
      alert("برای ثبت تاریخ شروع کالری‌شماری، لطفاً ابتدا وارد حساب کاربری خود شوید 🌿");
      navigate("/login");
      return;
    }

    setShowStartDatePicker(true);
  }}
  className="rounded-xl border border-yellow-200 shadow-sm p-3 text-center bg-white/80 font-medium text-gray-700 w-72 text-sm hover:bg-yellow-50 transition"
>
  📅 تاریخ شروع کالری‌شماری خود را ثبت کن
</button>
</div>


  {selectedDay && (
  <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-gray-700 text-sm sm:text-base">
    <p>
      🗓 کالری‌شماری شما از تاریخ{" "}
      <span className="font-semibold text-yellow-700">
        {selectedDay.year}/{selectedDay.month}/{selectedDay.day}
      </span>{" "}
      شروع شده است.
    </p>

    <button
      type="button"
      onClick={() => setShowDeleteStartModal(true)}
      className="px-4 py-2 rounded-xl bg-red-50 text-red-500 border border-red-100 text-xs font-bold hover:bg-red-100 transition"
    >
      حذف تاریخ شروع
    </button>
  </div>
)}
</motion.div>



{/* 📊 جدول آماری پایین */}
{selectedDay && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 0.6 }}
    className="mt-6 grid grid-cols-3 gap-2 w-full max-w-md relative z-10"
  >
    <button
  type="button"
  onClick={() => setShowTotalDaysModal(true)}
  className="bg-white/80 backdrop-blur-sm border border-yellow-100 rounded-lg p-8 shadow-sm hover:shadow-md transition-all text-center"
>
  <h3 className="text-yellow-600 text-sm font-bold mb-1">مجموع روزها</h3>
  <p className="text-gray-700 text-lg font-extrabold">{totalDays}</p>
  <p className="text-gray-500 text-xs mt-1">برای نمایش کلیک کنید</p>
</button>

    <button
  type="button"
  onClick={() => setShowLoggedDaysModal(true)}
  className="bg-white/80 backdrop-blur-sm border border-yellow-100 rounded-lg p-8 shadow-sm hover:shadow-md transition-all text-center"
>
  <h3 className="text-green-600 text-sm font-bold mb-1">روزهای ثبت‌شده</h3>
  <p className="text-gray-700 text-lg font-extrabold">{loggedDays}</p>
  <p className="text-gray-500 text-xs mt-1">برای نمایش کلیک کنید</p>
</button>

    <button
  type="button"
  onClick={() => setShowMissedDaysModal(true)}
  className="bg-white/80 backdrop-blur-sm border border-yellow-100 rounded-lg p-8 shadow-sm hover:shadow-md transition-all text-center"
>
  <h3 className="text-red-500 text-sm font-bold mb-1">روزهای ثبت‌نشده</h3>
  <p className="text-gray-700 text-lg font-extrabold">{missedDays}</p>
  <p className="text-gray-500 text-xs mt-1">برای نمایش کلیک کنید</p>
</button>

  </motion.div>
)}


{/* ⚡ دکمه محاسبه کالری روزانه */}
{selectedDay && (
  <div className="relative z-20 flex flex-col items-center mt-10 mb-20">
    <motion.button
      onClick={() => setShowCalorieModal(true)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:from-yellow-600 hover:to-yellow-500 transition-all text-lg flex flex-col items-center gap-2"
    >
      ⚡ میزان مجاز دریافت کالری روزانه
      {dailyCalories ? (
  <span className="text-sm text-white/90 font-medium mt-1 leading-7">
    کالری مجاز شما:{" "}
    <span className="text-white font-extrabold text-lg">
      {dailyCalories.toFixed(0)} کیلوکالری
    </span>

    {calorieProfile && (
      <span className="block text-xs text-white/90 mt-1">
       آخرین بروزرسانی: {calorieProfile.updatedAt}
<br />
سن: {calorieProfile.age} | قد: {calorieProfile.height} | وزن: {calorieProfile.weight}
<br />
BMI: {calorieProfile.bmi.toFixed(1)}
<br />
وزن ایده‌آل: {calorieProfile.idealWeightMin.toFixed(1)} تا{" "}
{calorieProfile.idealWeightMax.toFixed(1)} کیلوگرم
<br />
کالری لازم برای حفظ وزن فعلی: {calorieProfile.maintenanceCalories.toFixed(0)} کیلوکالری
      </span>
    )}
  </span>
) : (
  <span className="text-sm text-white/90 font-medium mt-1">
    برای محاسبه کلیک کنید
  </span>
)}
    </motion.button>

    <AnimatePresence>
  {showCalorieModal && (
    <>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowCalorieModal(false)}
      />

      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg rounded-t-3xl shadow-2xl border-t border-yellow-100 p-6 z-[90] max-h-[85vh] overflow-y-auto text-right"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 250, damping: 30 }}
      >
        <h2 className="text-center text-xl font-bold text-yellow-600 mb-6">
          🔍 محاسبه کالری روزانه
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm mb-2">جنسیت:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border border-yellow-200 rounded-xl p-2 bg-white/80 focus:ring-2 focus:ring-yellow-400 outline-none"
            >
              <option value="">انتخاب کنید</option>
              <option value="male">مرد</option>
              <option value="female">زن</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-2">سن:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border border-yellow-200 rounded-xl p-2 bg-white/80 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-2">قد (cm):</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full border border-yellow-200 rounded-xl p-2 bg-white/80 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-2">وزن (kg):</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border border-yellow-200 rounded-xl p-2 bg-white/80 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          <div className="sm:col-span-2 rounded-2xl border border-yellow-100 bg-yellow-50/60 p-4">
  <label className="block text-gray-700 text-sm font-bold mb-3">
    هدف شما:
  </label>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
    {[
      { value: "maintain", label: "باقی ماندن در همین وزن فعلی" },
      { value: "ideal_3m", label: "رسیدن به وزن ایده‌آل در ۳ ماه" },
      { value: "ideal_6m", label: "رسیدن به وزن ایده‌آل در ۶ ماه" },
      { value: "ideal_12m", label: "رسیدن به وزن ایده‌آل در ۱ سال" },
    ].map((item) => (
      <button
        key={item.value}
        type="button"
        onClick={() => setWeightGoal(item.value)}
        className={`rounded-xl border px-3 py-2 text-xs sm:text-sm font-bold transition ${
          weightGoal === item.value
            ? "bg-yellow-500 text-white border-yellow-500"
            : "bg-white text-gray-600 border-yellow-100 hover:bg-yellow-50"
        }`}
      >
        {item.label}
      </button>
    ))}
  </div>
</div>

          <div className="sm:col-span-2">
            <label className="block text-gray-700 text-sm mb-2">
              فعالیت بدنی روزانه:
            </label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="w-full border border-yellow-200 rounded-xl p-2 bg-white/80 focus:ring-2 focus:ring-yellow-400 outline-none"
            >
              <option value="">انتخاب کنید</option>
              <option value="1.2">بدون فعالیت</option>
              <option value="1.375">پیاده‌روی سبک (حداکثر ۳ روز در هفته)</option>
              <option value="1.55">فعال متوسط (ورزش ۳–۵ روز در هفته)</option>
              <option value="1.725">فعال زیاد (ورزش روزانه)</option>
              <option value="1.9">ورزشکار حرفه‌ای</option>
            </select>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={async () => {
              if (!gender || !age || !height || !weight || !activityLevel) {
                alert("لطفاً تمام مقادیر را وارد کنید 🌿");
                return;
              }

              const numericAge = Number(age);
              const numericHeight = Number(height);
              const numericWeight = Number(weight);
              const numericActivity = Number(activityLevel);

              const bmr =
                gender === "male"
                  ? 10 * numericWeight + 6.25 * numericHeight - 5 * numericAge + 5
                  : 10 * numericWeight + 6.25 * numericHeight - 5 * numericAge - 161;
const heightInMeter = numericHeight / 100;

const calculatedBmi = numericWeight / (heightInMeter * heightInMeter);

const minIdealWeight = 18.5 * heightInMeter * heightInMeter;
const maxIdealWeight = 24.9 * heightInMeter * heightInMeter;

const maintenanceCalories = bmr * numericActivity;

const targetWeight =
  numericWeight > maxIdealWeight
    ? maxIdealWeight
    : numericWeight < minIdealWeight
    ? minIdealWeight
    : numericWeight;

const weightDifference = numericWeight - targetWeight;

const goalDays =
  weightGoal === "ideal_3m"
    ? 90
    : weightGoal === "ideal_6m"
    ? 180
    : weightGoal === "ideal_12m"
    ? 365
    : null;

let calculatedCalories = maintenanceCalories;

if (goalDays && weightDifference > 0) {
  const totalCalorieDeficit = weightDifference * 7700;
  const dailyDeficit = totalCalorieDeficit / goalDays;

  calculatedCalories = Math.max(maintenanceCalories - dailyDeficit, 1200);
}

if (goalDays && weightDifference < 0) {
  const totalCalorieSurplus = Math.abs(weightDifference) * 7700;
  const dailySurplus = totalCalorieSurplus / goalDays;

  calculatedCalories = maintenanceCalories + dailySurplus;
}

setBmi(calculatedBmi);

setIdealWeightRange({
  min: minIdealWeight,
  max: maxIdealWeight,
});

              const updatedAt = new DateObject({
                calendar: persian,
                locale: persian_fa,
              }).format("YYYY/MM/DD");

              await fetch(`${API_BASE_URL}/calorie-tracker/profile`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("genino_token")}`,
  },
  body: JSON.stringify({
    effectiveFrom: formatPersianDay(activeDay),
    calories: calculatedCalories,
    gender: gender === "male" ? "مرد" : "زن",
    age: numericAge,
    height: numericHeight,
    weight: numericWeight,
    activityLevel: numericActivity,
    bmi: calculatedBmi,
    idealWeightMin: minIdealWeight,
    idealWeightMax: maxIdealWeight,
    goal: weightGoal,
    maintenanceCalories,
  }),
});

              setDailyCalories(calculatedCalories);

              setCalorieHistory((prev) => [
               ...prev,
               {
                effectiveFrom: activeDay,
                calories: calculatedCalories,
               },
              ]);

              setCalorieProfile({
                gender: gender === "male" ? "مرد" : "زن",
                age,
                height,
                weight,
                activityLevel,
                updatedAt,
                bmi: calculatedBmi,
                idealWeightMin: minIdealWeight,
                idealWeightMax: maxIdealWeight,
                goal: weightGoal,
                maintenanceCalories,
              });

              setShowCalorieModal(false);
            }}
            className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:from-yellow-600 hover:to-yellow-500 transition-all"
          >
            محاسبه و ثبت کالری روزانه 🔢
          </button>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>

  </div>
)}

{/* 📋 جدول خلاصه وضعیت کالری دریافتی */}
{selectedDay && (
  <>
  

    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.7 }}
      className="mt-2 text-xl sm:text-2xl font-bold text-yellow-600 text-center relative z-10"
    >
      🍽 خلاصه وضعیت کالری دریافتی شما
    </motion.h2>

    {/* 📊 جدول اکسل‌طور خلاصه وضعیت کالری */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.8 }}
      className="mt-6 w-full max-w-3xl mx-auto relative z-10 overflow-x-auto"
    >
      <table className="w-full border-collapse text-sm sm:text-base text-center bg-white/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-md border border-yellow-100">
        <thead className="bg-yellow-100/70 text-gray-700 font-semibold">
          <tr>
            <th className="py-3 px-2 border border-yellow-100">وعده غذایی</th>
            <th className="py-3 px-2 border border-yellow-100">کالری دریافتی</th>
            <th className="py-3 px-2 border border-yellow-100">پیشنهاد بهینه دریافت</th>
            <th className="py-3 px-2 border border-yellow-100">مانده کالری دریافت‌نشده</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {["صبحانه", "ناهار", "شام", "میان‌وعده"].map((meal) => {
            const received = mealCalories[meal];
            const suggested = dailyCalories
              ? (meal === "صبحانه"
                  ? dailyCalories * 0.2
                  : meal === "ناهار"
                  ? dailyCalories * 0.4
                  : meal === "شام"
                  ? dailyCalories * 0.3
                  : dailyCalories * 0.1)
              : 0;
            const diff = suggested - received;

            return (
              <tr
                key={meal}
                className={`hover:bg-yellow-50/60 transition ${
                  diff < 0 ? "text-red-500" : "text-gray-700"
                }`}
              >
                <td className="py-3 px-2 border border-yellow-100">{meal}</td>
                <td className="py-3 px-2 border border-yellow-100">{received}</td>
                <td className="py-3 px-2 border border-yellow-100">
                  {suggested ? suggested.toFixed(0) : "-"}
                </td>
                <td className="py-3 px-2 border border-yellow-100">
                  {diff ? diff.toFixed(0) : "-"}
                </td>
              </tr>
            );
          })}

          {dailyCalories && (
            <tr className="bg-yellow-50 font-bold text-yellow-700">
              <td className="py-3 px-2 border border-yellow-100">مجموع</td>
              <td className="py-3 px-2 border border-yellow-100">{totalCalories}</td>
              <td className="py-3 px-2 border border-yellow-100">
                {dailyCalories.toFixed(0)}
              </td>
              <td className="py-3 px-2 border border-yellow-100">
                {(dailyCalories - totalCalories).toFixed(0)}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </motion.div>
  </>
)}


    {/* 🍽 وعده‌ها و نمودار پایین */}
{selectedDay && (
  <>
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.7 }}
      className="mt-16 mb-20 w-full max-w-4xl bg-white/70 backdrop-blur-md border border-yellow-100 rounded-3xl shadow-md p-8 text-right relative z-10"
    >
      <h2 className="text-xl font-bold text-yellow-600 mb-6 text-center">
        🍽 انتخاب وعده غذایی
      </h2>

      <div className="grid grid-cols-3 gap-2 mb-8 text-center">
  <button
    type="button"
    disabled={isActiveDayStartDay}
    onClick={() => {
      if (isActiveDayStartDay) return;

      const prevDay = persianDayToDateObject(activeDay).subtract(1, "day");

      setActiveFoodDay({
        year: prevDay.year,
        month: prevDay.month.number,
        day: prevDay.day,
      });
    }}
    className={`rounded-2xl border px-3 py-4 text-sm font-bold transition ${
      isActiveDayStartDay
        ? "bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed"
        : "bg-white text-yellow-700 border-yellow-200 hover:bg-yellow-50"
    }`}
  >
    روز قبل
  </button>

  <div className="rounded-2xl border border-yellow-200 bg-yellow-50 px-3 py-4">
    <p className="text-sm font-extrabold text-yellow-700">برای امروز</p>
    <p className="mt-1 text-xs font-bold text-gray-600">
      {formatPersianDay(activeDay)}
    </p>
  </div>

  <button
    type="button"
    disabled={isActiveDayToday}
    onClick={() => {
      if (isActiveDayToday) return;

      const nextDay = persianDayToDateObject(activeDay).add(1, "day");

      setActiveFoodDay({
        year: nextDay.year,
        month: nextDay.month.number,
        day: nextDay.day,
      });
    }}
    className={`rounded-2xl border px-3 py-4 text-sm font-bold transition ${
      isActiveDayToday
        ? "bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed"
        : "bg-white text-yellow-700 border-yellow-200 hover:bg-yellow-50"
    }`}
  >
    روز بعد
  </button>
</div>

      

      {/* 📋 غذاهای انتخاب‌شده روز */}

  <div className="mt-10">
    <div className="text-center mb-6">
      <p className="text-xl font-bold text-yellow-700">
        ⚡ مجموع کالری روز:{" "}
        <span className="text-gray-800">{totalCalories}</span> کیلوکالری
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {["صبحانه", "ناهار", "شام", "میان‌وعده"].map((meal) => (
        <button
  type="button"
  key={meal}
  onClick={() => setSelectedMeal(meal)}
  className="rounded-2xl border border-yellow-100 bg-white/80 p-4 shadow-sm text-right hover:bg-yellow-50 hover:shadow-md transition-all"
>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-extrabold text-yellow-700">{meal}</h3>
            <span className="text-sm font-bold text-gray-600">
              {mealCalories[meal]} کالری
            </span>
          </div>

          {selectedFoods[meal]?.length > 0 ? (
            <div className="flex flex-col gap-2">
              {selectedFoods[meal].map((item, index) => (
                <div
                  key={`${meal}-${item.name}-${index}`}
                  className="flex items-center justify-between rounded-xl bg-yellow-50 border border-yellow-100 px-3 py-2 text-sm"
                >
                  <span className="font-bold text-gray-700">{item.name}</span>
                  <span className="text-gray-500">
                    {item.totalCalories} کالری
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400">
              هنوز غذایی برای این وعده ثبت نشده است.
            </p>
          )}
        </button>
      ))}
    </div>
  </div>

    </motion.section>

    {/* 🟡 پنجره انتخاب وعده از پایین */}
    <AnimatePresence>
  {selectedMeal && (
    <>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[40]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedMeal(null)}
      />

      <FoodSelectorModal
        meal={selectedMeal}
        foods={foodOptions[selectedMeal] || []}
        selectedFoods={selectedFoods}
        setSelectedFoods={setSelectedFoods}
        mealCalories={mealCalories}
        setMealCalories={setMealCalories}
        onClose={() => setSelectedMeal(null)}
        onSave={async (foodsToSave, caloriesToSave) => {
  try {
    const savedTotalCalories =
  caloriesToSave.صبحانه +
  caloriesToSave.ناهار +
  caloriesToSave.شام +
  caloriesToSave["میان‌وعده"];
    const hasFood =
      foodsToSave.صبحانه.length > 0 ||
      foodsToSave.ناهار.length > 0 ||
      foodsToSave.شام.length > 0 ||
      foodsToSave["میان‌وعده"].length > 0;

    const dayKey = getDayKey(activeDay);

    // اگر هیچ غذایی نداشت → حذف از دیتابیس
    if (!hasFood) {
      await fetch(
        `${API_BASE_URL}/calorie-tracker/daily-log/${dayKey}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("genino_token")}`,
          },
        }
      );

      setDailyFoodLogs((prev) => {
        const updated = { ...prev };
        delete updated[dayKey];
        return updated;
      });

      return;
    }

    // ذخیره عادی
    const payload = {
      dateKey: dayKey,
      dateText: formatPersianDay(activeDay),
      foods: foodsToSave,
      calories: caloriesToSave,
      totalCalories: savedTotalCalories,
      allowedCalories: getAllowedCaloriesForDay(activeDay),
    };

    const saveRes = await fetch(`${API_BASE_URL}/calorie-tracker/daily-log`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("genino_token")}`,
  },
  body: JSON.stringify(payload),
});

const saveData = await saveRes.json();

if (!saveRes.ok || !saveData?.ok) {
  console.error("SAVE DAILY LOG FAILED:", saveData);
  alert(saveData?.message || "ذخیره غذا انجام نشد");
  return;
}

setDailyFoodLogs((prev) => ({
  ...prev,
  [dayKey]: {
    ...payload,
    ...saveData.log,
  },
}));

    setDailyFoodLogs((prev) => ({
      ...prev,
      [dayKey]: payload,
    }));
  } catch (err) {
    console.error("SAVE DAILY LOG ERROR:", err);
  }
}}
      />
    </>
  )}
</AnimatePresence>
  </>
)}

<AnimatePresence>
  {showDeleteStartModal && (
    <>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowDeleteStartModal(false)}
      />

      <motion.div
        className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[90] max-w-md mx-auto bg-white rounded-3xl shadow-2xl border border-red-100 p-6 text-center"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
      >
        <h3 className="text-lg font-extrabold text-red-500 mb-3">
          حذف تاریخ شروع کالری‌شماری؟
        </h3>

        <p className="text-gray-600 text-sm leading-7 mb-6">
          با حذف تاریخ شروع، اطلاعات این شروع کالری‌شماری از صفحه پاک می‌شود.
          آیا مطمئنی؟
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setShowDeleteStartModal(false)}
            className="px-5 py-2 rounded-xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition"
          >
            انصراف
          </button>

          <button
            type="button"
            onClick={async () => {
  await fetch(`${API_BASE_URL}/calorie-tracker/start-date`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("genino_token")}`,
    },
  });

  setSelectedDay(null);
  setShowDeleteStartModal(false);
}}
            className="px-5 py-2 rounded-xl bg-red-500 text-white font-bold shadow hover:bg-red-600 transition"
          >
            بله، حذف شود
          </button>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>

<AnimatePresence>
  {showStartDatePicker && (
    <>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowStartDatePicker(false)}
      />

      <motion.div
        className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[90] max-w-sm mx-auto bg-white rounded-3xl shadow-2xl border border-yellow-100 p-6 text-center"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
      >
        <h3 className="text-lg font-extrabold text-yellow-600 mb-5">
          انتخاب تاریخ شروع کالری‌شماری
        </h3>

        <DatePicker
          value={tempStartDay}
          onChange={(date) => setTempStartDay(date)}
          calendar={persian}
          locale={persian_fa}
          inline
          calendarPosition="bottom-center"
        />

        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={() => setShowStartDatePicker(false)}
            className="px-5 py-2 rounded-xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition"
          >
            انصراف
          </button>

          <button
            type="button"
            onClick={async () => {
              if (!tempStartDay) {
                alert("لطفاً یک تاریخ انتخاب کنید 🌿");
                return;
              }

              const startDay = {
  year: tempStartDay.year,
  month: tempStartDay.month.number,
  day: tempStartDay.day,
};

await fetch(`${API_BASE_URL}/calorie-tracker/start-date`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("genino_token")}`,
  },
  body: JSON.stringify({
    startDate: `${startDay.year}/${startDay.month}/${startDay.day}`,
  }),
});

setSelectedDay(startDay);
setShowStartDatePicker(false);
            }}
            className="px-5 py-2 rounded-xl bg-yellow-500 text-white font-bold shadow hover:bg-yellow-600 transition"
          >
            ثبت تاریخ
          </button>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>

<AnimatePresence>
  {showTotalDaysModal && (
    <>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowTotalDaysModal(false)}
      />

      <motion.div
  className="fixed inset-0 z-[90] flex items-center justify-center px-3 sm:px-6"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
  <motion.div
    className="w-full max-w-5xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-yellow-100 p-3 sm:p-7 text-center max-h-[82vh] overflow-y-auto"
    initial={{ scale: 0.92 }}
    animate={{ scale: 1 }}
    exit={{ scale: 0.92 }}
  >
        <div className="flex items-center justify-between gap-3 mb-6">
          <button
            type="button"
            onClick={() => setShowTotalDaysModal(false)}
            className="px-4 py-2 rounded-xl bg-gray-100 text-gray-600 text-sm font-bold hover:bg-gray-200 transition"
          >
            بستن
          </button>

          <h3 className="text-base sm:text-xl font-extrabold text-yellow-600">
           گزارش مجموع روزهای کالری‌شماری
          </h3>

          <div className="w-16" />
        </div>

        {/* فیلترها */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-right">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-2">
              فیلتر بر اساس تاریخ
            </label>
            <input
  type="text"
  value={totalReportDateFilter}
  onChange={(e) => setTotalReportDateFilter(e.target.value)}
  placeholder="مثلاً 1405/02/10"
  className="w-full rounded-xl border border-yellow-100 bg-yellow-50/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-300"
/>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-2">
              سال
            </label>
            <select 
            value={totalReportYearFilter}
            onChange={(e) => setTotalReportYearFilter(e.target.value)}
              className="w-full rounded-xl border border-yellow-100 bg-yellow-50/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-300">
              <option value="">همه سال‌ها</option>
              <option value="1405">1405</option>
              <option value="1404">1404</option>
              <option value="1403">1403</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-2">
              ماه
            </label>
            <select
            value={totalReportMonthFilter}
            onChange={(e) => setTotalReportMonthFilter(e.target.value)}
            className="w-full rounded-xl border border-yellow-100 bg-yellow-50/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-300">
              <option value="">همه ماه‌ها</option>
              <option value="1">فروردین</option>
              <option value="2">اردیبهشت</option>
              <option value="3">خرداد</option>
              <option value="4">تیر</option>
              <option value="5">مرداد</option>
              <option value="6">شهریور</option>
              <option value="7">مهر</option>
              <option value="8">آبان</option>
              <option value="9">آذر</option>
              <option value="10">دی</option>
              <option value="11">بهمن</option>
              <option value="12">اسفند</option>
            </select>
          </div>
        </div>

        {/* جدول */}
        <div className="overflow-x-auto rounded-2xl border border-yellow-100">
          <table className="w-full min-w-[620px] text-xs sm:text-sm text-center border-collapse">
            <thead className="bg-yellow-100/70 text-gray-700">
              <tr>
                <th className="py-3 px-3 border border-yellow-100">ردیف</th>
                <th className="py-3 px-3 border border-yellow-100">تاریخ</th>
                <th className="py-3 px-3 border border-yellow-100">
                  میزان کالری مصرف شده
                </th>
                <th className="py-3 px-3 border border-yellow-100">
                  میزان کالری مجاز مصرف
                </th>
                <th className="py-3 px-3 border border-yellow-100">
                  میزان کالری باقی‌مانده
                </th>
              </tr>
            </thead>

            <tbody className="text-gray-700">
  {filteredTotalDaysList.length > 0 ? (
    filteredTotalDaysList.map((day, index) => {
      const dayKey = getDayKey(day);
      const log = dailyFoodLogs[dayKey];

      const usedCalories = log?.totalCalories || 0;
      const allowedCalories = log?.allowedCalories || 0;
      const remainingCalories = allowedCalories
        ? allowedCalories - usedCalories
        : 0;

      return (
        <tr
          key={dayKey}
          className={`transition hover:bg-yellow-50/60 ${
            log ? "text-gray-700" : "text-gray-400"
          }`}
        >
          <td className="py-3 px-3 border border-yellow-100">
            {index + 1}
          </td>

          <td className="py-3 px-3 border border-yellow-100 font-bold">
            {day.dateText}
          </td>

          <td className="py-3 px-3 border border-yellow-100">
            {log ? usedCalories : "عدم ثبت"}
          </td>

          <td className="py-3 px-3 border border-yellow-100">
            {log && allowedCalories ? allowedCalories.toFixed(0) : "عدم ثبت"}
          </td>

          <td
            className={`py-3 px-3 border border-yellow-100 font-bold ${
              log && remainingCalories < 0 ? "text-red-500" : ""
            }`}
          >
            {log && allowedCalories ? remainingCalories.toFixed(0) : "عدم ثبت"}
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td
        className="py-4 px-3 border border-yellow-100 text-gray-400"
        colSpan="5"
      >
        هنوز داده‌ای برای نمایش وجود ندارد.
      </td>
    </tr>
  )}

  <tr className="bg-yellow-50 font-extrabold text-yellow-700">
    <td className="py-3 px-3 border border-yellow-100" colSpan="2">
      جمع
    </td>

    <td className="py-3 px-3 border border-yellow-100">
  {filteredTotalReportLogs
    .reduce((sum, log) => sum + (log.totalCalories || 0), 0)
    .toFixed(0)}
</td>

<td className="py-3 px-3 border border-yellow-100">
  {filteredTotalReportLogs
    .reduce((sum, log) => {
      const allowed = log.allowedCalories || 0;
      return sum + allowed;
    }, 0)
    .toFixed(0)}
</td>

<td className="py-3 px-3 border border-yellow-100">
  {filteredTotalReportLogs
    .reduce((sum, log) => {
      const used = log.totalCalories || 0;
      const allowed = log.allowedCalories || 0;
      return sum + (allowed - used);
    }, 0)
    .toFixed(0)}
</td>
  </tr>
</tbody>
          </table>
        </div>
      </motion.div>
      </motion.div>
    </>
  )}
</AnimatePresence>

<AnimatePresence>
  {showLoggedDaysModal && (
    <>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowLoggedDaysModal(false)}
      />

      <motion.div
        className="fixed inset-0 z-[90] flex items-center justify-center px-3 sm:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-green-100 p-4 sm:p-7 text-center max-h-[82vh] overflow-y-auto"
          initial={{ scale: 0.92 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.92 }}
        >
          <div className="flex items-center justify-between gap-3 mb-6">
            <button
              type="button"
              onClick={() => setShowLoggedDaysModal(false)}
              className="px-4 py-2 rounded-xl bg-gray-100 text-gray-600 text-sm font-bold hover:bg-gray-200 transition"
            >
              بستن
            </button>

            <h3 className="text-base sm:text-xl font-extrabold text-green-600">
              روزهای ثبت‌شده کالری
            </h3>

            <div className="w-16" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-right">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2">
                سال
              </label>
              <select
  value={loggedYearFilter}
  onChange={(e) => setLoggedYearFilter(e.target.value)}
  className="w-full rounded-xl border border-green-100 bg-green-50/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-300"
>
                <option value="">همه سال‌ها</option>
                <option value="1405">1405</option>
                <option value="1404">1404</option>
                <option value="1403">1403</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2">
                ماه
              </label>
              <select
  value={loggedMonthFilter}
  onChange={(e) => setLoggedMonthFilter(e.target.value)}
  className="w-full rounded-xl border border-green-100 bg-green-50/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-300"
>
                <option value="">همه ماه‌ها</option>
                <option value="1">فروردین</option>
                <option value="2">اردیبهشت</option>
                <option value="3">خرداد</option>
                <option value="4">تیر</option>
                <option value="5">مرداد</option>
                <option value="6">شهریور</option>
                <option value="7">مهر</option>
                <option value="8">آبان</option>
                <option value="9">آذر</option>
                <option value="10">دی</option>
                <option value="11">بهمن</option>
                <option value="12">اسفند</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
  {filteredLoggedDaysList.length > 0 ? (
    filteredLoggedDaysList.map((day) => (
      <button
        key={getDayKey(day)}
        type="button"
        onClick={() => openDayInFoodSection(day)}
        className="rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-green-700 text-sm font-bold shadow-sm hover:bg-green-100 transition"
      >
        {day.dateText}
      </button>
    ))
  ) : (
    <p className="col-span-full text-sm text-gray-400">
      هنوز روز ثبت‌شده‌ای وجود ندارد.
    </p>
  )}
</div>

          <p className="mt-6 text-xs text-gray-400">
            این تاریخ‌ها فعلاً نمونه هستند؛ بعداً با داده‌های واقعی پر می‌شوند.
          </p>
        </motion.div>
      </motion.div>
    </>
  )}
</AnimatePresence>

<AnimatePresence>
  {showMissedDaysModal && (
    <>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowMissedDaysModal(false)}
      />

      <motion.div
        className="fixed inset-0 z-[90] flex items-center justify-center px-3 sm:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-red-100 p-4 sm:p-7 text-center max-h-[82vh] overflow-y-auto"
          initial={{ scale: 0.92 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.92 }}
        >
          {/* هدر */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <button
              type="button"
              onClick={() => setShowMissedDaysModal(false)}
              className="px-4 py-2 rounded-xl bg-gray-100 text-gray-600 text-sm font-bold hover:bg-gray-200 transition"
            >
              بستن
            </button>

            <h3 className="text-base sm:text-xl font-extrabold text-red-500">
              روزهای ثبت‌نشده کالری
            </h3>

            <div className="w-16" />
          </div>

          {/* فیلتر */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-right">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2">
                سال
              </label>
              <select
  value={missedYearFilter}
  onChange={(e) => setMissedYearFilter(e.target.value)}
  className="w-full rounded-xl border border-red-100 bg-red-50/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-300"
>
                <option value="">همه سال‌ها</option>
                <option value="1405">1405</option>
                <option value="1404">1404</option>
                <option value="1403">1403</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2">
                ماه
              </label>
              <select
  value={missedMonthFilter}
  onChange={(e) => setMissedMonthFilter(e.target.value)}
  className="w-full rounded-xl border border-red-100 bg-red-50/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-300"
>
                <option value="">همه ماه‌ها</option>
                <option value="1">فروردین</option>
                <option value="2">اردیبهشت</option>
                <option value="3">خرداد</option>
                <option value="4">تیر</option>
                <option value="5">مرداد</option>
                <option value="6">شهریور</option>
                <option value="7">مهر</option>
                <option value="8">آبان</option>
                <option value="9">آذر</option>
                <option value="10">دی</option>
                <option value="11">بهمن</option>
                <option value="12">اسفند</option>
              </select>
            </div>
          </div>

          {/* باکس‌ها */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
  {filteredMissedDaysList.length > 0 ? (
    filteredMissedDaysList.map((day) => (
      <button
        key={getDayKey(day)}
        type="button"
        onClick={() => openDayInFoodSection(day)}
        className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-red-600 text-sm font-bold shadow-sm hover:bg-red-100 transition"
      >
        {day.dateText}
      </button>
    ))
  ) : (
    <p className="col-span-full text-sm text-gray-400">
      همه روزها ثبت شده‌اند 🌿
    </p>
  )}
</div>

          <p className="mt-6 text-xs text-gray-400">
            این تاریخ‌ها فعلاً نمونه هستند؛ بعداً با داده‌های واقعی پر می‌شوند.
          </p>
        </motion.div>
      </motion.div>
    </>
  )}
</AnimatePresence>

{/* 🧠 جعبه آگاهی ژنینو + دسته‌بندی رژیم‌ها */}
<motion.section
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2, duration: 0.6 }}
  className="w-full max-w-6xl mt-10 mb-24 relative z-10"
>
  <GeninoAwarenessBox
    image="/images/calorie-tracker/genino-diet-awareness.jpg"
    message="در این بخش از کالری‌شمار ژنینو، می‌توانی با مهم‌ترین رژیم‌های غذایی آشنا شوی؛ از رژیم‌های عمومی و سبک زندگی گرفته تا رژیم‌های هدف‌محور، درمانی و گروه‌های خاص. هدف ما این است که محتواها علمی، ساده‌فهم و واقعاً کاربردی باشند تا هر کاربر بتواند مسیر مناسب خودش را بهتر پیدا کند."
    buttons={awarenessButtons}
    onButtonClick={handleAwarenessButtonClick}
  />

  <AnimatePresence initial={false}>
  {selectedCategoryData && (
    <motion.div
      initial={{ opacity: 0, y: -10, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: -10, height: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-6 overflow-hidden"
    >
      <div className="bg-white/85 backdrop-blur-sm border border-yellow-100 rounded-3xl shadow-sm p-6 text-right">
        <h3 className="text-xl sm:text-2xl font-bold text-yellow-700 mb-5 text-center">
          {selectedCategoryData.title}
        </h3>

        <div className="flex flex-wrap justify-center gap-3">
          {selectedCategoryData.items.map((item) => (
            <a
              key={item.link}
              href={item.link}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-white text-sm font-medium shadow hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] transition"
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

</motion.section>


    </main>
  );
}
