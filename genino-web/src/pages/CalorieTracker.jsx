import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-multi-date-picker";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/colors/yellow.css";
import DateObject from "react-date-object";

export default function CalorieTracker() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [loggedDays, setLoggedDays] = useState(5);
  const [missedDays, setMissedDays] = useState(2);
  const [totalDays, setTotalDays] = useState(0);
  const [selectedMeal, setSelectedMeal] = useState(null);

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

  const totalCalories =
    mealCalories.صبحانه +
    mealCalories.ناهار +
    mealCalories.شام +
    mealCalories["میان‌وعده"];

  const foodOptions = {
    صبحانه: [
      { name: "نان و پنیر", calories: 250 },
      { name: "تخم‌مرغ آب‌پز", calories: 155 },
      { name: "عسل و کره", calories: 300 },
      { name: "چای شیرین", calories: 100 },
    ],
    ناهار: [
      { name: "چلوکباب", calories: 800 },
      { name: "خورش قیمه", calories: 650 },
      { name: "خورش قورمه‌سبزی", calories: 550 },
      { name: "سالاد فصل", calories: 150 },
    ],
    شام: [
      { name: "سوپ جو", calories: 180 },
      { name: "ساندویچ مرغ", calories: 400 },
      { name: "املت سبزیجات", calories: 320 },
      { name: "ماست و خیار", calories: 90 },
    ],
    "میان‌وعده": [
      { name: "موز", calories: 100 },
      { name: "سیب", calories: 80 },
      { name: "بیسکوییت ساده", calories: 120 },
      { name: "آبمیوه طبیعی", calories: 140 },
    ],
  };

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

  const COLORS = ["#facc15", "#f59e0b", "#f87171", "#84cc16"];

  const pieData = [
    { name: "صبحانه", value: mealCalories.صبحانه },
    { name: "ناهار", value: mealCalories.ناهار },
    { name: "شام", value: mealCalories.شام },
    { name: "میان‌وعده", value: mealCalories["میان‌وعده"] },
  ].filter((item) => item.value > 0);
  const [showCalorieModal, setShowCalorieModal] = useState(false);
const [gender, setGender] = useState("");
const [age, setAge] = useState("");
const [height, setHeight] = useState("");
const [weight, setWeight] = useState("");
const [activityLevel, setActivityLevel] = useState("");
const [dailyCalories, setDailyCalories] = useState(null);

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
  className="relative z-10 bg-white/70 backdrop-blur-md border border-yellow-100 rounded-3xl shadow-lg p-6 sm:p-10 max-w-2xl text-center"
>
  <h1 className="text-3xl sm:text-4xl font-extrabold text-yellow-600 mb-4">
    بهت تبریک می‌گم 
  </h1>
  <p className="text-gray-700 leading-relaxed text-lg sm:text-xl font-medium">
    اولین قدم رو برای ساختن{" "}
    <span className="text-yellow-600 font-semibold">بهترین نسخه‌ی بدنی خودت</span> برداشتی.
  </p>
  <p className="mt-4 text-gray-600 italic text-base sm:text-lg">
    یادت باشه 💫{" "}
    <span className="text-yellow-600 font-semibold">سخت‌ترین قدم، همیشه اولین قدمه.</span>
  </p>

  {/* 📅 تاریخ */}
<div className="mt-8 flex justify-center relative z-[50]">
  <DatePicker
    value={selectedDay}
    onChange={(date) => {
      if (date) {
        const d = {
          year: date.year,
          month: date.month.number,
          day: date.day,
        };
        setSelectedDay(d);
      } else setSelectedDay(null);
    }}
    calendar={persian}
    locale={persian_fa}
    placeholder="📅 تاریخ شروع کالری‌شماری"
    containerClassName="relative z-[60]"  // 👈 بالاتر از جدول آماری
    inputClass="custom-input rounded-xl border border-yellow-200 shadow-sm p-3 text-center bg-white/80 font-medium text-gray-700 w-56 focus:ring-2 focus:ring-yellow-400 outline-none placeholder-gray-400"
    portal           // 👈 این باعث میشه تقویم در body باز بشه، نه داخل کارت
  />
</div>


  {selectedDay && (
    <p className="mt-4 text-gray-700 text-sm sm:text-base">
      🗓 کالری‌شماری از{" "}
      <span className="font-semibold text-yellow-700">
        {selectedDay.year}/{selectedDay.month}/{selectedDay.day}
      </span>{" "}
      شروع شده است.
    </p>
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
    <div className="bg-white/80 backdrop-blur-sm border border-yellow-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-all text-center">
      <h3 className="text-yellow-600 text-sm font-bold mb-1">مجموع روزها</h3>
      <p className="text-gray-700 text-lg font-extrabold">{totalDays}</p>
      <p className="text-gray-500 text-xs mt-1">از شروع</p>
    </div>

    <div className="bg-white/80 backdrop-blur-sm border border-yellow-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-all text-center">
      <h3 className="text-green-600 text-sm font-bold mb-1">ثبت‌شده</h3>
      <p className="text-gray-700 text-lg font-extrabold">{loggedDays}</p>
      <p className="text-gray-500 text-xs mt-1">روز موفق</p>
    </div>

    <div className="bg-white/80 backdrop-blur-sm border border-yellow-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-all text-center">
      <h3 className="text-red-500 text-sm font-bold mb-1">ثبت‌نشده</h3>
      <p className="text-gray-700 text-lg font-extrabold">{missedDays}</p>
      <p className="text-gray-500 text-xs mt-1">در انتظار</p>
    </div>
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
        <span className="text-sm text-white/90 font-medium mt-1">
          کالری مجاز شما:{" "}
          <span className="text-white font-extrabold text-lg">
            {dailyCalories.toFixed(0)} کیلوکالری
          </span>
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
          {/* 🔹 پس‌زمینه تار */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[40]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCalorieModal(false)}
          />

          {/* 🔸 Sheet پایین صفحه */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg rounded-t-3xl shadow-2xl border-t border-yellow-100 p-6 z-[50] max-h-[85vh] overflow-y-auto"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 250, damping: 30 }}
          >
            <h2 className="text-center text-xl font-bold text-yellow-600 mb-6">
              🔍 محاسبه کالری روزانه
            </h2>

            {/* فرم ورودی */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-right">
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
                  <option value="1.375">پیاده‌روی سبک (۳ روز در هفته)</option>
                  <option value="1.55">فعال متوسط (ورزش ۳–۵ روز در هفته)</option>
                  <option value="1.725">فعال زیاد (ورزش روزانه)</option>
                  <option value="1.9">ورزشکار حرفه‌ای</option>
                </select>
              </div>
            </div>

            {/* دکمه محاسبه */}
            <div className="mt-8 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  if (!gender || !age || !height || !weight || !activityLevel)
                    return alert("لطفاً تمام مقادیر را وارد کنید 🌿");

                  let BMR =
                    gender === "male"
                      ? 10 * weight + 6.25 * height - 5 * age + 5
                      : 10 * weight + 6.25 * height - 5 * age - 161;

                  const totalCalories = BMR * activityLevel;
                  setDailyCalories(totalCalories);
                  setShowCalorieModal(false);
                }}
                className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:from-yellow-600 hover:to-yellow-500 transition-all"
              >
                محاسبه کالری روزانه 🔢
              </motion.button>
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
    {/* محاسبه پیشنهاد بهینه */}
    {dailyCalories && (
      <script>
        {`
          const suggestedCalories = {
            صبحانه: ${dailyCalories} * 0.2,
            ناهار: ${dailyCalories} * 0.4,
            شام: ${dailyCalories} * 0.3,
            "میان‌وعده": ${dailyCalories} * 0.1
          };
        `}
      </script>
    )}

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

      {/* دکمه‌های وعده‌ها */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {["صبحانه", "ناهار", "شام", "میان‌وعده"].map((meal) => (
          <button
            key={meal}
            onClick={() => setSelectedMeal(meal)}
            className={`px-5 py-2 rounded-xl text-sm font-medium border transition-all shadow-sm ${
              selectedMeal === meal
                ? "bg-yellow-500 text-white border-yellow-500 shadow-md"
                : "bg-white text-gray-700 border-yellow-200 hover:bg-yellow-50"
            }`}
          >
            {meal}
          </button>
        ))}
      </div>

      {/* 🔹 مجموع کالری وعده‌ها */}
      {totalCalories > 0 && (
        <div className="mt-10 text-center">
          <p className="text-xl font-bold text-yellow-700 mb-4">
            ⚡ مجموع کالری روز:{" "}
            <span className="text-gray-800">{totalCalories}</span> کیلوکالری
          </p>

          <div className="flex justify-center">
            <PieChart width={320} height={260}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} کالری`} />
              <Legend />
            </PieChart>
          </div>
        </div>
      )}
    </motion.section>

    {/* 🟡 پنجره انتخاب وعده از پایین */}
    <AnimatePresence>
      {selectedMeal && (
        <>
          {/* پس‌زمینه تار */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[40]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMeal(null)}
          />

          {/* Sheet پایین صفحه */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg rounded-t-3xl shadow-2xl border-t border-yellow-100 p-6 z-[50] max-h-[85vh] overflow-y-auto"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 250, damping: 30 }}
          >
            <h2 className="text-center text-xl font-bold text-yellow-600 mb-6">
              🍽 انتخاب غذا برای {selectedMeal}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-right">
              {foodOptions[selectedMeal].map((food) => (
                <label
                  key={food.name}
                  className={`flex justify-between items-center bg-white/80 p-3 rounded-xl border cursor-pointer transition ${
                    selectedFoods[selectedMeal].includes(food.name)
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-yellow-100 hover:bg-yellow-50"
                  }`}
                >
                  <span className="text-gray-700">{food.name}</span>
                  <span className="text-gray-500">{food.calories} کالری</span>
                  <input
                    type="checkbox"
                    checked={selectedFoods[selectedMeal].includes(food.name)}
                    onChange={() => handleFoodSelection(selectedMeal, food)}
                    className="hidden"
                  />
                </label>
              ))}

              {/* گزینه سایر */}
              <div className="bg-white/80 p-3 rounded-xl border border-yellow-100 hover:bg-yellow-50 transition">
                <label className="text-gray-700 font-medium block mb-2">
                  ➕ سایر (وارد کردن دستی کالری)
                </label>
                <input
                  type="number"
                  placeholder="مثلاً 220"
                  className="w-full border border-yellow-200 rounded-lg p-2 text-center focus:ring-2 focus:ring-yellow-400 outline-none text-gray-700"
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    const customFood = { name: "سایر", calories: value || 0 };
                    setMealCalories((prev) => ({
                      ...prev,
                      [selectedMeal]: prev[selectedMeal] + value,
                    }));
                  }}
                />
              </div>
            </div>

            <div className="mt-8 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedMeal(null)}
                className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:from-yellow-600 hover:to-yellow-500 transition-all"
              >
                ✅ محاسبه کالری {selectedMeal}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  </>
)}

      {/* 🔙 دکمه بازگشت به خانه (زیر نوبار سمت راست) */}
<motion.a
  href="/"
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="fixed top-24 right-6 z-50 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white font-bold py-2 px-5 rounded-xl shadow-lg hover:from-yellow-600 hover:to-yellow-500 transition-all text-sm sm:text-base flex items-center gap-2"
>
  <span>بازگشت</span>
  <span className="text-lg">➡️</span>
</motion.a>

    </main>
  );
}
