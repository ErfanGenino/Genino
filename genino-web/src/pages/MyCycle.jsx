// src/pages/MyCycle.jsx
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import { Heart, Flower2, Sun, Moon, Droplet, CalendarDays } from "lucide-react";
import GoldenModal from "../components/GoldenModal";
import { Link } from "react-router-dom";

const LS_KEY = "myCycle:v1";

// 🧠 تعیین فاز بر اساس روز چرخه
function getPhaseForDay(day, cycleLength, periodLength) {
  const ovulationCenter = Math.max(periodLength + 1, cycleLength - 14);
  const ovulationStart = ovulationCenter;
  const ovulationEnd = Math.min(cycleLength, ovulationCenter + 1);

  if (day <= periodLength) return "period";
  if (day < ovulationStart) return "follicular";
  if (day <= ovulationEnd) return "ovulation";
  return "luteal";
}

// 🎨 داده‌های هر فاز (برای کارت و تقویم)
const phaseMeta = {
  period: {
    name: "قاعدگی",
    bg: "from-pink-200 to-pink-100",
    icon: <Droplet className="w-10 h-10 text-pink-600" />,
    msg: "بدن در حال پاک‌سازی است 🌙 آرامش و استراحت را در اولویت بگذار.",
    tip: "غذاهای گرم و آرام‌بخش مثل سوپ یا زنجبیل مفید هستند.",
    chip: { bg: "bg-pink-300 text-white", emoji: "💧" },
  },
  follicular: {
    name: "فاز فولیکولی",
    bg: "from-green-200 to-emerald-100",
    icon: <Flower2 className="w-10 h-10 text-green-600" />,
    msg: "زمان رشد و انرژی تازه است 🌱",
    tip: "میوه‌های تازه، لبخند زیاد و تحرک ملایم توصیه می‌شود.",
    chip: { bg: "bg-green-200 text-green-800", emoji: "🌱" },
  },
  ovulation: {
    name: "تخمک‌گذاری",
    bg: "from-yellow-200 to-amber-100",
    icon: <Sun className="w-10 h-10 text-yellow-600" />,
    msg: "روزهای طلایی بدن! انرژی و احساسات در اوج هستند ☀️",
    tip: "آب زیاد بنوش و از تغذیه سبک لذت ببر.",
    chip: { bg: "bg-yellow-300 text-yellow-800", emoji: "☀️" },
  },
  luteal: {
    name: "فاز لوتئال",
    bg: "from-purple-200 to-fuchsia-100",
    icon: <Moon className="w-10 h-10 text-purple-600" />,
    msg: "بدن در حال آماده‌سازی است 💜 احساساتت را جدی بگیر و استراحت کن.",
    tip: "غذاهای منیزیم‌دار و خواب کافی در این فاز خیلی مؤثرند.",
    chip: { bg: "bg-purple-200 text-purple-800", emoji: "🌙" },
  },
};

// 📚 داده‌های جزئیات مودال هر فاز
const phaseDetails = {
  period: {
    title: "💧 فاز قاعدگی",
    tips: {
      lifestyle: "بدن به استراحت و آرامش نیاز دارد. کارهای سبک و مهربانی با خودت.",
      sleep: "حداقل ۸ ساعت خواب. حمام آب گرم یا دمنوش قبل خواب کمک‌کننده است.",
      exercise: "یوگا، پیاده‌روی آرام یا حرکات کششی سبک.",
      food: "غذاهای گرم، سبزیجات پخته، دمنوش زنجبیل. کافئین را کم کن.",
      intimacy: "حساسیت ممکن است بیشتر باشد؛ احترام به احساسات و راحتی خودت اولویت دارد.",
    },
  },
  follicular: {
    title: "🌱 فاز فولیکولی",
    tips: {
      lifestyle: "شروع انرژی تازه؛ زمان خوبی برای برنامه‌ریزی و یادگیری.",
      sleep: "خواب منظم ۷–۸ ساعت برای تمرکز عالیه.",
      exercise: "هوازی ملایم تا متوسط: دویدن سبک، شنا، رقص.",
      food: "میوه تازه، سبزیجات و پروتئین‌های سبک برای رشد فولیکول‌ها.",
      intimacy: "میل جنسی رو به افزایش؛ ارتباط احساسی تقویت می‌شود.",
    },
  },
  ovulation: {
    title: "☀️ فاز تخمک‌گذاری",
    tips: {
      lifestyle: "تعاملات اجتماعی و کارهای چالشی را در این فاز زمان‌بندی کن.",
      sleep: "با وجود انرژی زیاد، خواب کافی را حفظ کن.",
      exercise: "تمرینات شدیدتر یا گروهی می‌تونه عالی باشه.",
      food: "غذاهای سبک و آبدار (خیار، هندوانه) و پروتئین سبک مثل ماهی.",
      intimacy: "میل جنسی در اوج است؛ ارتباط و صمیمیت طبیعی‌تر حس می‌شود.",
    },
  },
  luteal: {
    title: "🌙 فاز لوتئال",
    tips: {
      lifestyle: "کمی سرعت را کم کن؛ مراقبت از خود و کاهش استرس مهم است.",
      sleep: "۸–۹ ساعت خواب، روتین آرامش‌بخش شبانه کمک می‌کند.",
      exercise: "یوگای ملایم، پیاده‌روی عصرگاهی، تمرینات کششی.",
      food: "منیزیم‌دارها (سبزیجات برگ‌دار، مغزها)، موز و شکلات تلخ.",
      intimacy: "ممکن است حساس‌تر باشی؛ گفتگوی صادقانه و آرامش‌بخش کمک می‌کند.",
    },
  },
};

// 🔢 تعیین احتمال بارداری بر اساس روز چرخه (نسخه دقیق ایرفان 💛)
function getPregnancyChance(day) {
  let level = "";
  let color = "";

  if (day >= 1 && day <= 7) {
    level = "خیلی کم";
    color = "text-gray-400";
  } else if (day >= 8 && day <= 9) {
    level = "کم";
    color = "text-blue-400";
  } else if (day >= 10 && day <= 11) {
    level = "متوسط";
    color = "text-green-500";
  } else if (day >= 12 && day <= 13) {
    level = "زیاد";
    color = "text-orange-500";
  } else if (day >= 14 && day <= 15) {
    level = "خیلی زیاد";
    color = "text-rose-600 font-semibold";
  } else if (day >= 16 && day <= 17) {
    level = "زیاد";
    color = "text-orange-500";
  } else if (day >= 18 && day <= 21) {
    level = "متوسط";
    color = "text-green-500";
  } else if (day >= 22 && day <= 25) {
    level = "کم";
    color = "text-blue-400";
  } else if (day >= 26 && day <= 28) {
    level = "خیلی کم";
    color = "text-gray-400";
  } else {
    // اگر چرخه بیشتر از 28 روز بود
    level = "خیلی کم";
    color = "text-gray-400";
  }

  return { level, color };
}


export default function MyCycle() {
  const [form, setForm] = useState({
    lastPeriod: "",
    cycleLength: 28,
    periodLength: 5,
  });
  const [phase, setPhase] = useState(null);
  const [currentDay, setCurrentDay] = useState(0);
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [todayPersian, setTodayPersian] = useState("");
  const [todayGregorian, setTodayGregorian] = useState("");

  // 🗓️ تاریخ امروز (شمسی و میلادی)
  useEffect(() => {
    const nowPersian = new DateObject({ calendar: persian, locale: persian_fa });
    setTodayPersian(nowPersian.format("dddd D MMMM YYYY"));
    const nowGregorian = new DateObject({ calendar: gregorian });
    setTodayGregorian(nowGregorian.format("dddd, MMMM D, YYYY"));
  }, []);

  // 🩷 خواندن از localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.form) setForm(parsed.form);
        if (parsed.phase) setPhase(parsed.phase);
        if (parsed.currentDay) setCurrentDay(parsed.currentDay);
      } catch {
        localStorage.removeItem(LS_KEY);
      }
    }
    const savedUpdate = localStorage.getItem("myCycleLastUpdate");
    if (savedUpdate) setLastUpdate(savedUpdate);
  }, []);

  // 💾 ذخیره در localStorage
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ form, phase, currentDay }));
  }, [form, phase, currentDay]);

  // 📅 محاسبه فاز فعلی
  const handleCalculate = () => {
    if (!form.lastPeriod) {
      setShowErrorModal(true);
      return;
    }

    const persianDate = new DateObject({
      date: form.lastPeriod,
      calendar: persian,
      locale: persian_fa,
    });
    const gregorianDate = persianDate.convert(gregorian).toDate();

    const today = new Date();
    today.setHours(12, 0, 0, 0);
    gregorianDate.setHours(12, 0, 0, 0);

    let diffDays = Math.floor((today - gregorianDate) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) diffDays = 0;

    const dayInCycle = (diffDays % form.cycleLength) + 1; // 1..cycleLength
    setCurrentDay(dayInCycle);

    const p = getPhaseForDay(dayInCycle, form.cycleLength, form.periodLength);
    setPhase(p);

    const nowISO = new Date().toISOString();
    localStorage.setItem("myCycleLastUpdate", nowISO);
    setLastUpdate(nowISO);
  };

  // 🔄 بازنشانی داده‌ها
  const handleReset = () => {
    setPhase(null);
    setCurrentDay(0);
    setForm({ lastPeriod: "", cycleLength: 28, periodLength: 5 });
    localStorage.removeItem(LS_KEY);
  };

  // 🧮 ساخت تقویم
  const daysArray = useMemo(
    () => Array.from({ length: Math.max(1, form.cycleLength) }, (_, i) => i + 1),
    [form.cycleLength]
  );

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#fffafc] to-[#fff7f4] flex flex-col items-center justify-start px-6 py-10 text-gray-800"
    >
        {/* 📅 باکس تاریخ امروز */}
      <div className="bg-white border border-yellow-200 rounded-2xl shadow-sm px-6 py-4 mb-4 flex flex-col items-center justify-center text-center text-yellow-700 w-full max-w-lg">
        <div className="flex items-center gap-2 mb-1">
          <CalendarDays className="w-6 h-6 text-yellow-500" />
          <span className="font-bold text-lg">امروز</span>
        </div>
        <p className="text-base font-semibold">{todayPersian}</p>
        <p className="text-sm text-gray-600 mt-1">{todayGregorian}</p>
      </div>
      {/* 🌟 نوار آخرین بروزرسانی */}
      {lastUpdate && (
        <div className="bg-yellow-50 border border-yellow-100 text-yellow-700 text-sm rounded-xl px-4 py-2 mb-6 shadow-sm">
          ✨ آخرین بروزرسانی:{" "}
          {new Date(lastUpdate).toLocaleDateString("fa-IR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      )}

      {/* 🔹 عنوان صفحه */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-8"
      >
        <Heart className="w-12 h-12 text-pink-500 mx-auto mb-3" />
        <h1 className="text-3xl font-bold text-pink-600 mb-2">سلامت بانوان 🌸</h1>
        <p className="text-gray-600 text-sm">
          بدن تو چرخه‌ای از زندگی و احساس است — با عشق به خودت هماهنگ شو 💫
        </p>
      </motion.div>

      {/* 🔸 فرم ورودی (وقتی فاز تعیین نشده) */}
      {!phase && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-white/80 backdrop-blur-sm border border-pink-100 rounded-2xl shadow-md p-6 max-w-md w-full text-right"
        >
          <label className="block text-sm text-gray-700 mb-2">
            تاریخ آخرین قاعدگی:
          </label>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            value={form.lastPeriod}
            onChange={(date) =>
              setForm((f) => ({ ...f, lastPeriod: date?.format("YYYY-MM-DD") }))
            }
            portal
            inputClass="border border-pink-200 rounded-xl p-3 w-full mb-4 focus:ring-2 focus:ring-pink-300 outline-none text-right"
          />

          <label className="block text-sm text-gray-700 mb-2">طول چرخه (روز):</label>
          <input
            type="number"
            min={18}
            max={60}
            value={form.cycleLength}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                cycleLength: parseInt(e.target.value) || 28,
              }))
            }
            className="border border-pink-200 rounded-xl p-3 w-full mb-4 focus:ring-2 focus:ring-pink-300 outline-none text-right"
          />

          <label className="block text-sm text-gray-700 mb-2">طول پریود (روز):</label>
          <input
            type="number"
            min={1}
            max={10}
            value={form.periodLength}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                periodLength: parseInt(e.target.value) || 5,
              }))
            }
            className="border border-pink-200 rounded-xl p-3 w-full mb-6 focus:ring-2 focus:ring-pink-300 outline-none text-right"
          />

          <button
            onClick={handleCalculate}
            className="w-full bg-pink-500 text-white py-3 rounded-xl font-medium hover:bg-pink-600 transition"
          >
            محاسبه وضعیت من 💖
          </button>
        </motion.div>
      )}

      {/* 🔹 کارت فاز فعلی */}
      <AnimatePresence>
        {phase && (
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`max-w-md w-full p-8 rounded-3xl shadow-lg border border-pink-200 bg-gradient-to-br ${phaseMeta[phase].bg} text-center mt-4`}
          >
            <div className="flex justify-center mb-4">{phaseMeta[phase].icon}</div>
            <h2 className="text-2xl font-bold text-pink-700 mb-2">
              {phaseMeta[phase].name}
            </h2>
            <p className="text-gray-700 mb-3 text-sm">{phaseMeta[phase].msg}</p>
            <p className="text-gray-600 text-sm italic">💡 {phaseMeta[phase].tip}</p>
            <p className="text-gray-500 text-xs mt-4">
              روز {currentDay} از چرخه {form.cycleLength} روزه‌ی شما
            </p>

            <button
              onClick={handleReset}
              className="mt-6 text-sm text-gray-700 underline hover:text-pink-600 transition"
            >
              تنظیم مجدد 🔄
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌸 تقویم چرخه */}
      {phase && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mt-8 bg-white/70 backdrop-blur-sm border border-pink-100 rounded-2xl shadow-md p-6 max-w-3xl w-full text-center"
        >
          <h3 className="text-pink-600 font-semibold mb-4 text-lg">تقویم چرخه من 🩷</h3>

          <div className="grid grid-cols-7 gap-2 text-sm">
            {daysArray.map((day) => {
              const p = getPhaseForDay(day, form.cycleLength, form.periodLength);
              const chip = phaseMeta[p].chip;
              const isToday = day === currentDay;
              const chance = getPregnancyChance(day);


              return (
                <div
                  key={day}
                  className={`relative flex flex-col items-center justify-center rounded-xl py-2 ${chip.bg} shadow-sm ${
                    isToday ? "ring-2 ring-pink-500 ring-offset-2 ring-offset-white" : ""
                  }`}
                  title={phaseMeta[p].name}
                >
                  <span className="font-semibold">{day}</span>
                  <span className="text-xs">{chip.emoji}</span>
                  <p className={`text-[10px] mt-0.5 ${chance.color}`}>
                  {chance.level}
                  </p>
                  {isToday && (
                    <span className="absolute -top-2 right-2 text-[10px] bg-white text-pink-600 px-1.5 py-0.5 rounded-md shadow">
                      امروز
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-gray-500 text-xs mt-4">
            رنگ‌ها و نمادها بر اساس وضعیت چرخه شما نمایش داده می‌شوند.
          </p>

          <p className="text-gray-500 text-xs mt-4">

            احتمال بارداری: خیلی کم🩶 | کم🩵 | متوسط💚 | زیاد🧡 | خیلی زیاد❤️
          </p>
        </motion.div>
      )}

      {/* 🩺 توضیحات فازها + کلیک برای مودال */}
      {phase && (
        <div className="mt-10 bg-white/90 border border-pink-100 rounded-2xl shadow-sm p-6 max-w-3xl w-full text-right leading-relaxed space-y-5">
          <h3 className="text-pink-600 font-semibold text-lg mb-5 text-center">
            آشنایی با فازهای چرخه قاعدگی 
          </h3>

          {/* 💧 قاعدگی */}
          <div
            className="p-4 rounded-xl border border-pink-100 hover:bg-pink-50 transition cursor-pointer group"
            onClick={() => setSelectedPhase("period")}
          >
            <div className="flex items-center gap-3 mb-1">
              <Droplet className="w-6 h-6 text-pink-500" />
              <p className="font-semibold text-pink-600 text-base group-hover:text-pink-700">
                💧 فاز قاعدگی (Period)
              </p>
            </div>
            <p className="text-gray-700 text-sm ml-2">
              از روز اول خونریزی آغاز می‌شود و معمولاً ۳ تا ۷ روز طول می‌کشد. بدن در
              این زمان در حال پاک‌سازی و شروع دوباره است.
            </p>
            <p className="mt-2 text-xs text-pink-500 group-hover:text-pink-600">
              (برای دیدن توصیه‌های کامل کلیک کنید)
            </p>
          </div>

          {/* 🌱 فولیکولی */}
          <div
            className="p-4 rounded-xl border border-green-100 hover:bg-green-50 transition cursor-pointer group"
            onClick={() => setSelectedPhase("follicular")}
          >
            <div className="flex items-center gap-3 mb-1">
              <Flower2 className="w-6 h-6 text-green-500" />
              <p className="font-semibold text-green-600 text-base group-hover:text-green-700">
                🌱 فاز فولیکولی (Follicular)
              </p>
            </div>
            <p className="text-gray-700 text-sm ml-2">
              بعد از پایان پریود شروع می‌شود و بدن با افزایش استروژن برای آزادسازی تخمک
              آماده می‌گردد. انرژی و تمرکز به‌تدریج بیشتر می‌شود.
            </p>
            <p className="mt-2 text-xs text-green-500 group-hover:text-green-600">
              (برای دیدن توصیه‌های کامل کلیک کنید)
            </p>
          </div>

          {/* ☀️ تخمک‌گذاری */}
          <div
            className="p-4 rounded-xl border border-yellow-100 hover:bg-yellow-50 transition cursor-pointer group"
            onClick={() => setSelectedPhase("ovulation")}
          >
            <div className="flex items-center gap-3 mb-1">
              <Sun className="w-6 h-6 text-yellow-500" />
              <p className="font-semibold text-yellow-600 text-base group-hover:text-yellow-700">
                ☀️ فاز تخمک‌گذاری (Ovulation)
              </p>
            </div>
            <p className="text-gray-700 text-sm ml-2">
              تخمک آزاد می‌شود و بدن در اوج انرژی و شادابی است؛ میل ارتباطی افزایش می‌یابد.
            </p>
            <p className="mt-2 text-xs text-yellow-500 group-hover:text-yellow-600">
              (برای دیدن توصیه‌های کامل کلیک کنید)
            </p>
          </div>

          {/* 🌙 لوتئال */}
          <div
            className="p-4 rounded-xl border border-purple-100 hover:bg-purple-50 transition cursor-pointer group"
            onClick={() => setSelectedPhase("luteal")}
          >
            <div className="flex items-center gap-3 mb-1">
              <Moon className="w-6 h-6 text-purple-500" />
              <p className="font-semibold text-purple-600 text-base group-hover:text-purple-700">
                🌙 فاز لوتئال (Luteal)
              </p>
            </div>
            <p className="text-gray-700 text-sm ml-2">
              از پایان تخمک‌گذاری تا شروع پریود بعدی ادامه دارد؛ بدن نیاز به استراحت و
              تغذیه آرامش‌بخش بیشتری دارد.
            </p>
            <p className="mt-2 text-xs text-purple-500 group-hover:text-purple-600">
              (برای دیدن توصیه‌های کامل کلیک کنید)
            </p>
          </div>
        </div>
      )}

      {/* ❌ مودال خطای فرم ناقص */}
      <GoldenModal
        show={showErrorModal}
        title="اطلاعات ناقص ⛔"
        description="برای محاسبه وضعیت چرخه، لطفاً ابتدا تاریخ آخرین قاعدگی را وارد کنید."
        confirmLabel="باشه 🌸"
        onConfirm={() => setShowErrorModal(false)}
      >
        <div className="text-right text-sm text-gray-600">
          بدون این تاریخ امکان محاسبه دقیق وجود ندارد.
        </div>
      </GoldenModal>

      {/* 📌 مودال توصیه‌های هر فاز */}
      <GoldenModal
        show={!!selectedPhase}
        title={selectedPhase ? phaseDetails[selectedPhase].title : ""}
        description="پیشنهادهای ویژه برای مراقبت از بدن و ذهن در این فاز 🌸"
        confirmLabel="باشه 💖"
        onConfirm={() => setSelectedPhase(null)}
        onCancel={() => setSelectedPhase(null)}
      >
        {selectedPhase && (
          <div className="space-y-3 text-right text-sm text-gray-700 leading-relaxed">
            <p>
              <strong>💆‍♀️ سبک زندگی:</strong>{" "}
              {phaseDetails[selectedPhase].tips.lifestyle}
            </p>
            <p>
              <strong>🛌 خواب:</strong> {phaseDetails[selectedPhase].tips.sleep}
            </p>
            <p>
              <strong>🏃‍♀️ ورزش:</strong>{" "}
              {phaseDetails[selectedPhase].tips.exercise}
            </p>
            <p>
              <strong>🍎 تغذیه:</strong> {phaseDetails[selectedPhase].tips.food}
            </p>
            <p>
              <strong>💞 رابطه زناشویی:</strong>{" "}
              {phaseDetails[selectedPhase].tips.intimacy}
            </p>
          </div>
        )}
      </GoldenModal>

      {/* 🧾 وضعیت سلامت من و جدول گزارش‌ها با نیم‌دایره‌ها */}
<section className="mt-14 bg-white/90 border border-pink-100 rounded-2xl shadow-sm p-6 max-w-5xl w-full text-center">
  <h2 className="text-xl font-bold text-pink-600 mb-3 text-center">
    وضعیت سلامت من
  </h2>
  <p className="text-gray-600 text-sm mb-6 text-center">
    در این بخش می‌توانید گزارش‌های سلامت خود را مشاهده و مدیریت کنید.
  </p>

  <Link
  to="/my-women-health-test"
  className="inline-block bg-pink-500 text-white px-6 py-2 rounded-xl hover:bg-pink-600 transition-all text-sm shadow-sm mb-8"
>
  رفتن به صفحه تست و بررسی سلامت بدن من
</Link>

  

  <div className="overflow-x-auto">
    <table className="w-full border-collapse bg-white rounded-2xl shadow-md overflow-hidden text-center">
      <thead className="bg-pink-100 text-gray-700">
        <tr>
          <th className="p-3 text-center">شماره گزارش</th>
          <th className="p-3 text-center">تاریخ ثبت</th>
          <th className="p-3 text-center">سلامت پوست و مو</th>
          <th className="p-3 text-center">سلامت پستان‌ها</th>
          <th className="p-3 text-center">سلامت واژن و رحم</th>
          <th className="p-3 text-center">سلامت تخمدان‌ها</th>
          <th className="p-3 text-center">نمایش</th>
          <th className="p-3 text-center">ویرایش</th>
          <th className="p-3 text-center">حذف</th>
          <th className="p-3 text-center">اشتراک</th>
        </tr>
      </thead>

      <tbody>
        <tr className="border-b hover:bg-pink-50 transition-all">
          <td className="p-3">1</td>
          <td className="p-3">1404/08/02</td>

          {/* 🌸 پوست و مو */}
          <td className="p-3">
            <div className="flex flex-col items-center justify-center">
              <span className="text-sm mb-1">85٪</span>
              <svg width="50" height="25" viewBox="0 0 50 25">
                <path d="M5 25 A20 20 0 0 1 45 25" fill="none" stroke="#f3cfe2" strokeWidth="6" />
                <path
                  d="M5 25 A20 20 0 0 1 45 25"
                  fill="none"
                  stroke="#ec4899"
                  strokeWidth="6"
                  strokeDasharray="40"
                  strokeDashoffset={40 - (40 * 0.85)}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </td>

          {/* 💗 پستان‌ها */}
          <td className="p-3">
            <div className="flex flex-col items-center justify-center">
              <span className="text-sm mb-1">65٪</span>
              <svg width="50" height="25" viewBox="0 0 50 25">
                <path d="M5 25 A20 20 0 0 1 45 25" fill="none" stroke="#f3cfe2" strokeWidth="6" />
                <path
                  d="M5 25 A20 20 0 0 1 45 25"
                  fill="none"
                  stroke="#f472b6"
                  strokeWidth="6"
                  strokeDasharray="40"
                  strokeDashoffset={40 - (40 * 0.65)}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </td>

          {/* 🌷 واژن و رحم */}
          <td className="p-3">
            <div className="flex flex-col items-center justify-center">
              <span className="text-sm mb-1">90٪</span>
              <svg width="50" height="25" viewBox="0 0 50 25">
                <path d="M5 25 A20 20 0 0 1 45 25" fill="none" stroke="#f3cfe2" strokeWidth="6" />
                <path
                  d="M5 25 A20 20 0 0 1 45 25"
                  fill="none"
                  stroke="#db2777"
                  strokeWidth="6"
                  strokeDasharray="40"
                  strokeDashoffset={40 - (40 * 0.9)}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </td>

          {/* 💖 تخمدان‌ها */}
          <td className="p-3">
            <div className="flex flex-col items-center justify-center">
              <span className="text-sm mb-1">75٪</span>
              <svg width="50" height="25" viewBox="0 0 50 25">
                <path d="M5 25 A20 20 0 0 1 45 25" fill="none" stroke="#f3cfe2" strokeWidth="6" />
                <path
                  d="M5 25 A20 20 0 0 1 45 25"
                  fill="none"
                  stroke="#be185d"
                  strokeWidth="6"
                  strokeDasharray="40"
                  strokeDashoffset={40 - (40 * 0.75)}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </td>

          {/* آیکون‌های اکشن */}
          <td className="p-3 text-center text-blue-500 cursor-pointer hover:scale-110 transition-transform">👁</td>
          <td className="p-3 text-center text-green-500 cursor-pointer hover:scale-110 transition-transform">✏️</td>
          <td className="p-3 text-center text-red-500 cursor-pointer hover:scale-110 transition-transform">🗑</td>
          <td className="p-3 text-center text-yellow-500 cursor-pointer hover:scale-110 transition-transform">🔗</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

    </main>
  );
}
