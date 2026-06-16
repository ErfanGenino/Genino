// src/pages/MyMenHealth.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Brain,
  Flame,
  Pill,
  Moon,
  Ruler,
} from "lucide-react";
import GoldenModal from "@components/Core/GoldenModal";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import GeninoHealthButton from "@components/Assessments/GeninoHealthButton";
import { HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";
import GeninoAwarenessBox from "@components/Awareness/GeninoAwarenessBox";
import {
  createMenHealthReport,
  getMenHealthReports,
  deleteMenHealthReport,
} from "../services/api";



export default function MyMenHealth() {
  const [selectedTest, setSelectedTest] = useState(null);
  const [results, setResults] = useState([]); // نتایج تست‌ها
  const [resultsLoading, setResultsLoading] = useState(false);
  const [resultsError, setResultsError] = useState("");
  const [form, setForm] = useState({ height: "", weight: "" });
  const isLoggedIn = () => {return !!localStorage.getItem("genino_token");};
  const [guestNotice, setGuestNotice] = useState(false);

  // 🫀 پاسخ‌های تست سلامت قلب
  const [heartAnswers, setHeartAnswers] = useState({
    activity: "",
    stress: "",
    sleep: "",
    habit: "",
  });

  //  پاسخ‌های تست متابولیسم
  const [metabolismAnswers, setMetabolismAnswers] = useState({
    energy: "",
    sleep: "",
    food: "",
    activity: "",
  });

  // 💊 پاسخ‌های تست تعادل هورمونی
  const [hormoneAnswers, setHormoneAnswers] = useState({
    energy: "",
    focus: "",
    sleep: "",
    mood: "",
  });

  // 😴 پاسخ‌های تست کیفیت خواب
  const [sleepAnswers, setSleepAnswers] = useState({
    hours: "",
    wakeups: "",
    energy: "",
    screen: "",
  });

  // 🧠 پاسخ‌های تست تمرکز و انگیزه
  const [focusAnswers, setFocusAnswers] = useState({
    attention: "",
    motivation: "",
    tired: "",
    phone: "",
  });

  useEffect(() => {
  let mounted = true;

  (async () => {
    setResultsLoading(true);
    setResultsError("");

    const res = await getMenHealthReports(50);

    if (!mounted) return;

    if (res?.ok) {
      setResults(res.reports || []);
    } else {
      setResults([]);
      setResultsError(res?.message || "خطا در دریافت گزارش‌های سلامت آقایان.");
    }

    setResultsLoading(false);
  })();

  return () => {
    mounted = false;
  };
}, []);

  // 🧮 محاسبه BMI و ثبت تاریخ
  const handleBmiCalculate = async () => {
    const { height, weight } = form;
    if (!height || !weight) return;

    const h = parseFloat(height) / 100;
    const bmi = (parseFloat(weight) / (h * h)).toFixed(1);
    let status = "";
    let tip = "";

    if (bmi < 18.5) {
      status = "کم‌وزن";
      tip = "برای افزایش وزن، وعده‌های مغذی و پروتئینی مصرف کن.";
    } else if (bmi < 25) {
      status = "نرمال ✅";
      tip = "وزن متعادلی داری، حفظ سبک زندگی فعلیت عالیه.";
    } else if (bmi < 30) {
      status = "اضافه‌وزن ⚠️";
      tip = "فعالیت بدنی سبک و کاهش قند و چربی پیشنهاد می‌شود.";
    } else {
      status = "چاقی ❗";
      tip = "با پزشک مشورت کن؛ برنامه‌ی غذایی و تحرک روزانه لازم است.";
    }

    const payload = {
  date: new Date().toISOString(),
  type: "تست BMI و ترکیب بدن",
  score: bmi,
  status,
  tip,
  answers: {
    height,
    weight,
  },
};

if (!isLoggedIn()) {
  addGuestResult(payload);
} else {
  const res = await createMenHealthReport(payload);

  if (res?.ok && res.report) {
    setResults((prev) => [res.report, ...prev]);
  } else {
    alert(res?.message || "خطا در ذخیره نتیجه تست.");
    return;
  }
}
    setSelectedTest(null);
    setForm({ height: "", weight: "" });
  };

   // 🧠 لیست تست‌ها با رنگ‌بندی
  const tests = [
    {
      id: "bmi",
      icon: <Ruler className="w-8 h-8 text-yellow-600" />,
      title: "تست BMI و ترکیب بدن ",
      desc: "محاسبه شاخص توده بدنی و درصد چربی برای بررسی تناسب اندام.",
      bg: "bg-gradient-to-br from-yellow-50 to-white",
    },
    {
      id: "heart",
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "تست سلامت قلب ",
      desc: "بررسی استرس، نبض و سلامت عمومی قلب.",
      bg: "bg-gradient-to-br from-red-50 to-white",
    },
    {
      id: "metabolism",
      icon: <Flame className="w-8 h-8 text-orange-500" />,
      title: "تست متابولیسم ",
      desc: "تحلیل سوخت‌وساز و میزان کالری مورد نیاز بدن.",
      bg: "bg-gradient-to-br from-orange-50 to-white",
    },
    {
      id: "hormone",
      icon: <Pill className="w-8 h-8 text-blue-500" />,
      title: "تست تعادل هورمونی ",
      desc: "بررسی علائم افت انرژی، تمرکز و تستوسترون.",
      bg: "bg-gradient-to-br from-blue-50 to-white",
    },
    {
      id: "sleep",
      icon: <Moon className="w-8 h-8 text-indigo-500" />,
      title: "تست کیفیت خواب ",
      desc: "تحلیل خواب شبانه، انرژی صبحگاهی و استراحت ذهن.",
      bg: "bg-gradient-to-br from-indigo-50 to-white",
    },
    {
      id: "focus",
      icon: <Brain className="w-8 h-8 text-green-600" />,
      title: "تست تمرکز و انگیزه ",
      desc: "بررسی تعادل ذهن، تمرکز و سطح انگیزه کاری.",
      bg: "bg-gradient-to-br from-green-50 to-white",
    },
  ];
    // 🧩 فیلتر و حذف نتایج
  const [filterType, setFilterType] = useState("همه");
  const [filterExactDate, setFilterExactDate] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false); 

  // 📊 فیلتر کردن نتایج
  const filteredResults = results
    .filter((r) => (filterType === "همه" ? true : r.type.includes(filterType)))
    .filter((r) =>
      filterExactDate
        ? r.date === filterExactDate.format("YYYY/MM/DD")
        : true
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // آخرین گزارش بالا باشه
  
  function formatDate(date) {
  return new Date(date).toLocaleDateString("fa-IR");
}

const addGuestResult = (payload) => {
  setResults((prev) => [
    {
      id: `guest-${Date.now()}`,
      ...payload,
      isGuest: true,
    },
    ...prev,
  ]);

  setGuestNotice(true);
};



  return (
    <main
      dir="rtl"
      className="min-h-screen pb-10 flex flex-col items-center px-6 py-10 text-gray-800 bg-[#4b0614]
bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.10),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(255,215,160,0.10),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.05)_0%,transparent_35%,rgba(0,0,0,0.25)_100%),repeating-linear-gradient(90deg,rgba(255,255,255,0.035)_0px,rgba(255,255,255,0.035)_1px,transparent_1px,transparent_7px),repeating-linear-gradient(0deg,rgba(0,0,0,0.08)_0px,rgba(0,0,0,0.08)_1px,transparent_1px,transparent_6px)]"
    >
      {/* 🔹 عنوان صفحه */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-yellow-600 mb-2">
          سلامت آقایان 💪
        </h1>
        <p className="text-white text-lg sm:text-xl font-medium">
          بررسی علمی و شخصی سلامت جسم، ذهن و هورمون‌ها — مخصوص آقایان.
        </p>
      </motion.div>

      {/* 🔘 تست خانگی سلامت دستگاه تناسلی آقایان */}
      <div className="mb-10">
        <Link to="/articles/men-genital-self-check">
        <GeninoHealthButton
  title="تست خانگی سلامت دستگاه تناسلی آقایان"
  icon={HeartPulse}
  onClick={() => setSelectedTest("menReproductive")}
/>
        </Link>
</div>


      {/* 🧩 کارت تست‌ها با رنگ متفاوت */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl w-full">
        {tests.map((test) => (
          <motion.div
            key={test.id}
            whileHover={{ scale: 1.03 }}
            className={`${test.bg} border border-yellow-100 rounded-2xl shadow-md p-5 text-right cursor-pointer hover:shadow-lg transition`}
            onClick={() => setSelectedTest(test.id)}
          >
            <div className="flex items-center gap-3 mb-3">
              {test.icon}
              <h3 className="font-semibold text-yellow-700">{test.title}</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {test.desc}
            </p>
          </motion.div>
        ))}
      </div>

      
      {/* تست BMI - نسخه لوکس */}
{selectedTest === "bmi" && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4">
    <div className="w-full max-w-xl rounded-[28px] bg-white shadow-2xl border border-yellow-100 overflow-hidden">
      <div className="bg-gradient-to-l from-[#4b0614] to-[#6b1022] px-5 py-5 text-center">
        <p className="text-[11px] tracking-[0.25em] text-yellow-200/75">
          GENINO HEALTH
        </p>
        <h3 className="mt-2 text-xl font-bold text-yellow-100">
          شاخص تناسب بدن
        </h3>
        <p className="mt-2 text-xs leading-6 text-white/70">
          قد و وزن خود را وارد کنید.
        </p>
      </div>

      <div className="p-5 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-stone-700">
              قد
            </label>
            <div className="flex items-center rounded-2xl bg-stone-50 border border-yellow-100 px-4 py-3">
              <input
                type="number"
                value={form.height}
                onChange={(e) => setForm({ ...form, height: e.target.value })}
                className="w-full bg-transparent text-right text-lg font-semibold text-stone-800 placeholder:text-stone-300 outline-none"
                placeholder="مثلاً ۱۸۰"
              />
              <span className="mr-3 text-xs text-stone-400">سانتی‌متر</span>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-stone-700">
              وزن
            </label>
            <div className="flex items-center rounded-2xl bg-stone-50 border border-yellow-100 px-4 py-3">
              <input
                type="number"
                value={form.weight}
                onChange={(e) => setForm({ ...form, weight: e.target.value })}
                className="w-full bg-transparent text-right text-lg font-semibold text-stone-800 placeholder:text-stone-300 outline-none"
                placeholder="مثلاً ۸۵"
              />
              <span className="mr-3 text-xs text-stone-400">کیلوگرم</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-yellow-100 bg-[#fbf7ef] p-4">
          <p className="mb-3 text-sm font-semibold text-stone-800">
            راهنمای سریع BMI
          </p>
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between rounded-2xl bg-white px-4 py-2.5 border border-stone-100">
              <span className="text-stone-400">کمتر از ۱۸.۵</span>
              <span className="font-medium text-stone-700">کم‌وزن</span>
            </div>
            <div className="flex justify-between rounded-2xl bg-white px-4 py-2.5 border border-yellow-100">
              <span className="text-stone-400">۱۸.۵ تا ۲۴.۹</span>
              <span className="font-medium text-yellow-700">متعادل</span>
            </div>
            <div className="flex justify-between rounded-2xl bg-white px-4 py-2.5 border border-stone-100">
              <span className="text-stone-400">۲۵ تا ۲۹.۹</span>
              <span className="font-medium text-stone-700">اضافه‌وزن</span>
            </div>
            <div className="flex justify-between rounded-2xl bg-white px-4 py-2.5 border border-stone-100">
              <span className="text-stone-400">۳۰ به بالا</span>
              <span className="font-medium text-stone-700">نیازمند توجه</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => {
              setSelectedTest(null);
              setForm({ height: "", weight: "" });
            }}
            className="flex-1 rounded-2xl border border-stone-200 py-3 text-sm text-stone-600 hover:bg-stone-50"
          >
            انصراف
          </button>

          <button
            onClick={handleBmiCalculate}
            className="flex-1 rounded-2xl bg-gradient-to-l from-yellow-500 to-yellow-600 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg"
          >
            محاسبه
          </button>
        </div>
      </div>
    </div>
  </div>
)}


      <GoldenModal
  show={guestNotice}
  title="نتیجه تست آماده شد 💛"
  description="نتیجه شما در بخش «نتایج تست‌های من» قابل مشاهده است."
  confirmLabel="متوجه شدم"
  onConfirm={() => setGuestNotice(false)}
  onCancel={() => setGuestNotice(false)}
>
  <div className="rounded-2xl border border-yellow-100 bg-yellow-50/70 p-4 text-center text-sm leading-7 text-gray-700">
    برای ذخیره نتیجه در بایگانی سلامت ژنینو و مشاهده سوابق در آینده، لطفاً وارد حساب کاربری خود شوید.
  </div>
</GoldenModal>



      {/* تست سلامت قلب - نسخه لوکس */}
{selectedTest === "heart" && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4">
    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[28px] bg-white shadow-2xl border border-yellow-100">
      <div className="bg-gradient-to-l from-[#4b0614] to-[#6b1022] px-5 py-5 text-center">
        <p className="text-[11px] tracking-[0.25em] text-yellow-200/75">
          GENINO HEALTH
        </p>
        <h3 className="mt-2 text-xl font-bold text-yellow-100">
          سلامت قلب
        </h3>
        <p className="mt-2 text-xs leading-6 text-white/70">
          به چهار سؤال کوتاه پاسخ دهید.
        </p>
      </div>

      <div className="p-5 space-y-4">
        {[
          {
            title: "میزان فعالیت بدنی شما چقدر است؟",
            keyName: "activity",
            options: [
              { label: "منظم", hint: "سه روز یا بیشتر در هفته", value: "good" },
              { label: "گاهی", hint: "یک تا دو روز در هفته", value: "medium" },
              { label: "کم", hint: "خیلی کم یا تقریباً هیچ‌وقت", value: "low" },
            ],
          },
          {
            title: "در طول روز چقدر استرس دارید؟",
            keyName: "stress",
            options: [
              { label: "کم", hint: "اغلب آرام و کنترل‌شده", value: "low" },
              { label: "متوسط", hint: "گاهی تحت فشار", value: "medium" },
              { label: "زیاد", hint: "استرس مداوم یا شدید", value: "high" },
            ],
          },
          {
            title: "میانگین خواب شبانه شما چقدر است؟",
            keyName: "sleep",
            options: [
              { label: "مناسب", hint: "بیش از ۷ ساعت", value: "good" },
              { label: "متوسط", hint: "بین ۵ تا ۷ ساعت", value: "medium" },
              { label: "کم", hint: "کمتر از ۵ ساعت", value: "low" },
            ],
          },
          {
            title: "مصرف سیگار، قهوه زیاد یا نوشیدنی انرژی‌زا دارید؟",
            keyName: "habit",
            options: [
              { label: "خیر", hint: "مصرف ندارم یا بسیار کم است", value: "good" },
              { label: "گاهی", hint: "مصرف محدود و گهگاه", value: "medium" },
              { label: "بله", hint: "مصرف زیاد یا روزانه", value: "bad" },
            ],
          },
        ].map((question, index) => (
          <div
            key={question.keyName}
            className="rounded-3xl border border-yellow-100 bg-[#fbf7ef] p-4"
          >
            <p className="mb-3 text-sm font-semibold text-stone-800">
              {index + 1}. {question.title}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {question.options.map((option) => {
                const isSelected =
                  heartAnswers[question.keyName] === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setHeartAnswers({
                        ...heartAnswers,
                        [question.keyName]: option.value,
                      })
                    }
                    className={`rounded-2xl border px-3 py-3 text-right transition ${
                      isSelected
                        ? "border-yellow-400 bg-white shadow-md"
                        : "border-stone-100 bg-white/70 hover:bg-white"
                    }`}
                  >
                    <span
                      className={`block text-sm font-semibold ${
                        isSelected ? "text-yellow-700" : "text-stone-700"
                      }`}
                    >
                      {option.label}
                    </span>
                    <span className="mt-1 block text-[11px] leading-5 text-stone-400">
                      {option.hint}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="rounded-3xl border border-yellow-100 bg-white p-4">
          <p className="mb-3 text-sm font-semibold text-stone-800">
            راهنمای سریع نتیجه
          </p>

          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between rounded-2xl bg-[#fbf7ef] px-4 py-2.5 border border-stone-100">
              <span className="text-stone-400">۸ تا ۱۰</span>
              <span className="font-medium text-stone-700">وضعیت مطلوب</span>
            </div>

            <div className="flex justify-between rounded-2xl bg-[#fbf7ef] px-4 py-2.5 border border-stone-100">
              <span className="text-stone-400">۵ تا ۷</span>
              <span className="font-medium text-stone-700">نیازمند مراقبت بیشتر</span>
            </div>

            <div className="flex justify-between rounded-2xl bg-[#fbf7ef] px-4 py-2.5 border border-stone-100">
              <span className="text-stone-400">۰ تا ۴</span>
              <span className="font-medium text-stone-700">نیازمند توجه جدی‌تر</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              setSelectedTest(null);
              setHeartAnswers({
                activity: "",
                stress: "",
                sleep: "",
                habit: "",
              });
            }}
            className="flex-1 rounded-2xl border border-stone-200 py-3 text-sm text-stone-600 hover:bg-stone-50"
          >
            انصراف
          </button>

          <button
            type="button"
            onClick={async () => {
              let score = 0;
              heartAnswers.activity === "good" && (score += 2);
              heartAnswers.activity === "medium" && (score += 1);

              heartAnswers.stress === "low" && (score += 2);
              heartAnswers.stress === "medium" && (score += 1);

              heartAnswers.sleep === "good" && (score += 2);
              heartAnswers.sleep === "medium" && (score += 1);

              heartAnswers.habit === "good" && (score += 2);
              heartAnswers.habit === "medium" && (score += 1);

              let status = "";
              let tip = "";

              if (score >= 8) {
                status = "وضعیت مطلوب";
                tip = "سبک زندگی شما از نظر عوامل اولیه سلامت قلب در وضعیت خوبی قرار دارد.";
              } else if (score >= 5) {
                status = "نیازمند مراقبت بیشتر";
                tip = "بهتر است خواب، استرس و فعالیت بدنی خود را منظم‌تر کنید.";
              } else {
                status = "نیازمند توجه جدی‌تر";
                tip = "چند عامل مهم می‌تواند به سلامت قلب فشار وارد کند؛ بررسی سبک زندگی و مشورت پزشکی مفید است.";
              }

              const payload = {
                date: new Date().toISOString(),
                type: "تست سلامت قلب",
                score: `${score}/10`,
                status,
                tip,
                answers: heartAnswers,
              };

              const res = await createMenHealthReport(payload);

              if (res?.ok && res.report) {
                setResults((prev) => [res.report, ...prev]);
              } else {
                alert(res?.message || "خطا در ذخیره نتیجه تست.");
                return;
              }

              setSelectedTest(null);
              setHeartAnswers({
                activity: "",
                stress: "",
                sleep: "",
                habit: "",
              });
            }}
            className="flex-1 rounded-2xl bg-gradient-to-l from-yellow-500 to-yellow-600 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg"
          >
            محاسبه
          </button>
        </div>
      </div>
    </div>
  </div>
)}



      {/* تست متابولیسم - نسخه لوکس */}
{selectedTest === "metabolism" && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4">
    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[28px] bg-white shadow-2xl border border-yellow-100">
      <div className="bg-gradient-to-l from-[#4b0614] to-[#6b1022] px-5 py-5 text-center">
        <p className="text-[11px] tracking-[0.25em] text-yellow-200/75">
          GENINO HEALTH
        </p>
        <h3 className="mt-2 text-xl font-bold text-yellow-100">
          متابولیسم بدن
        </h3>
        <p className="mt-2 text-xs leading-6 text-white/70">
          وضعیت انرژی، خواب، تغذیه و تحرک خود را مشخص کنید.
        </p>
      </div>

      <div className="p-5 space-y-4">
        {[
          {
            title: "احساس انرژی روزانه شما چگونه است؟",
            keyName: "energy",
            options: [
              { label: "بالا", hint: "اغلب پرانرژی و فعال هستم", value: "good" },
              { label: "متوسط", hint: "انرژی معمولی دارم", value: "medium" },
              { label: "پایین", hint: "زود خسته می‌شوم", value: "low" },
            ],
          },
          {
            title: "الگوی خواب شبانه شما چگونه است؟",
            keyName: "sleep",
            options: [
              { label: "منظم", hint: "خواب کافی و نسبتاً ثابت", value: "good" },
              { label: "نسبتاً منظم", hint: "گاهی بی‌نظمی دارم", value: "medium" },
              { label: "نامنظم", hint: "خواب کوتاه یا بی‌برنامه", value: "low" },
            ],
          },
          {
            title: "وعده‌های غذایی شما چقدر منظم است؟",
            keyName: "food",
            options: [
              { label: "منظم", hint: "وعده‌های متعادل و قابل پیش‌بینی", value: "good" },
              { label: "گاهی نامنظم", hint: "گاهی وعده‌ها جابه‌جا می‌شود", value: "medium" },
              { label: "نامنظم", hint: "وعده‌ها اغلب بی‌برنامه است", value: "low" },
            ],
          },
          {
            title: "تحرک یا ورزش شما چقدر است؟",
            keyName: "activity",
            options: [
              { label: "خوب", hint: "حداقل سه بار در هفته", value: "good" },
              { label: "متوسط", hint: "گاهی پیاده‌روی یا فعالیت سبک", value: "medium" },
              { label: "کم", hint: "تحرک روزانه بسیار محدود", value: "low" },
            ],
          },
        ].map((question, index) => (
          <div
            key={question.keyName}
            className="rounded-3xl border border-yellow-100 bg-[#fbf7ef] p-4"
          >
            <p className="mb-3 text-sm font-semibold text-stone-800">
              {index + 1}. {question.title}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {question.options.map((option) => {
                const isSelected =
                  metabolismAnswers[question.keyName] === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setMetabolismAnswers({
                        ...metabolismAnswers,
                        [question.keyName]: option.value,
                      })
                    }
                    className={`rounded-2xl border px-3 py-3 text-right transition ${
                      isSelected
                        ? "border-yellow-400 bg-white shadow-md"
                        : "border-stone-100 bg-white/70 hover:bg-white"
                    }`}
                  >
                    <span
                      className={`block text-sm font-semibold ${
                        isSelected ? "text-yellow-700" : "text-stone-700"
                      }`}
                    >
                      {option.label}
                    </span>
                    <span className="mt-1 block text-[11px] leading-5 text-stone-400">
                      {option.hint}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="rounded-3xl border border-yellow-100 bg-white p-4">
          <p className="mb-3 text-sm font-semibold text-stone-800">
            راهنمای سریع نتیجه
          </p>

          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between rounded-2xl bg-[#fbf7ef] px-4 py-2.5 border border-stone-100">
              <span className="text-stone-400">۸ تا ۱۰</span>
              <span className="font-medium text-stone-700">سوخت‌وساز فعال</span>
            </div>

            <div className="flex justify-between rounded-2xl bg-[#fbf7ef] px-4 py-2.5 border border-stone-100">
              <span className="text-stone-400">۵ تا ۷</span>
              <span className="font-medium text-stone-700">وضعیت متعادل</span>
            </div>

            <div className="flex justify-between rounded-2xl bg-[#fbf7ef] px-4 py-2.5 border border-stone-100">
              <span className="text-stone-400">۰ تا ۴</span>
              <span className="font-medium text-stone-700">نیازمند بهبود سبک زندگی</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              setSelectedTest(null);
              setMetabolismAnswers({
                energy: "",
                sleep: "",
                food: "",
                activity: "",
              });
            }}
            className="flex-1 rounded-2xl border border-stone-200 py-3 text-sm text-stone-600 hover:bg-stone-50"
          >
            انصراف
          </button>

          <button
            type="button"
            onClick={async () => {
              let score = 0;
              metabolismAnswers.energy === "good" && (score += 2);
              metabolismAnswers.energy === "medium" && (score += 1);

              metabolismAnswers.sleep === "good" && (score += 2);
              metabolismAnswers.sleep === "medium" && (score += 1);

              metabolismAnswers.food === "good" && (score += 2);
              metabolismAnswers.food === "medium" && (score += 1);

              metabolismAnswers.activity === "good" && (score += 2);
              metabolismAnswers.activity === "medium" && (score += 1);

              let status = "";
              let tip = "";

              if (score >= 8) {
                status = "سوخت‌وساز فعال";
                tip = "بدن شما از نظر انرژی، خواب، تغذیه و تحرک در وضعیت مطلوبی قرار دارد.";
              } else if (score >= 5) {
                status = "وضعیت متعادل";
                tip = "وضعیت کلی قابل قبول است؛ با نظم بیشتر در خواب، تغذیه و تحرک بهتر می‌شود.";
              } else {
                status = "نیازمند بهبود سبک زندگی";
                tip = "کمبود خواب، تغذیه نامنظم یا تحرک پایین می‌تواند روی سوخت‌وساز بدن اثر بگذارد.";
              }

              const payload = {
                date: new Date().toISOString(),
                type: "تست متابولیسم",
                score: `${score}/10`,
                status,
                tip,
                answers: metabolismAnswers,
              };

              const res = await createMenHealthReport(payload);

              if (res?.ok && res.report) {
                setResults((prev) => [res.report, ...prev]);
              } else {
                alert(res?.message || "خطا در ذخیره نتیجه تست.");
                return;
              }

              setSelectedTest(null);
              setMetabolismAnswers({
                energy: "",
                sleep: "",
                food: "",
                activity: "",
              });
            }}
            className="flex-1 rounded-2xl bg-gradient-to-l from-yellow-500 to-yellow-600 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg"
          >
            محاسبه
          </button>
        </div>
      </div>
    </div>
  </div>
)}



      {/* تست تعادل هورمونی - نسخه لوکس */}
{selectedTest === "hormone" && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4">
    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[28px] bg-white shadow-2xl border border-yellow-100">
      <div className="bg-gradient-to-l from-[#4b0614] to-[#6b1022] px-5 py-5 text-center">
        <p className="text-[11px] tracking-[0.25em] text-yellow-200/75">
          GENINO HEALTH
        </p>
        <h3 className="mt-2 text-xl font-bold text-yellow-100">
          تعادل هورمونی
        </h3>
        <p className="mt-2 text-xs leading-6 text-white/70">
          وضعیت انرژی، تمرکز، خواب و خلق‌وخو را مشخص کنید.
        </p>
      </div>

      <div className="p-5 space-y-4">
        {[
          {
            title: "سطح انرژی روزانه شما چگونه است؟",
            keyName: "energy",
            options: [
              { label: "بالا", hint: "اغلب پرانرژی و فعال هستم", value: "good" },
              { label: "متوسط", hint: "انرژی معمولی دارم", value: "medium" },
              { label: "پایین", hint: "بیشتر روزها خسته‌ام", value: "low" },
            ],
          },
          {
            title: "تمرکز ذهنی شما در طول روز چگونه است؟",
            keyName: "focus",
            options: [
              { label: "خوب", hint: "تمرکز پایدار و عملکرد ذهنی مناسب", value: "good" },
              { label: "متوسط", hint: "گاهی افت تمرکز دارم", value: "medium" },
              { label: "ضعیف", hint: "تمرکز برایم سخت است", value: "low" },
            ],
          },
          {
            title: "کیفیت خواب و بیداری صبح شما چگونه است؟",
            keyName: "sleep",
            options: [
              { label: "خوب", hint: "خواب عمیق و بیداری با انرژی", value: "good" },
              { label: "متوسط", hint: "خواب نسبتاً قابل قبول", value: "medium" },
              { label: "ضعیف", hint: "خواب سبک یا بیداری خسته", value: "low" },
            ],
          },
          {
            title: "خلق‌وخو و انگیزه شما در روزهای اخیر چگونه بوده؟",
            keyName: "mood",
            options: [
              { label: "مثبت", hint: "آرام، باانگیزه و متعادل", value: "good" },
              { label: "متوسط", hint: "گاهی افت انگیزه یا نوسان خلق", value: "medium" },
              { label: "پایین", hint: "بی‌حوصلگی، تحریک‌پذیری یا افت انگیزه", value: "low" },
            ],
          },
        ].map((question, index) => (
          <div
            key={question.keyName}
            className="rounded-3xl border border-yellow-100 bg-[#fbf7ef] p-4"
          >
            <p className="mb-3 text-sm font-semibold text-stone-800">
              {index + 1}. {question.title}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {question.options.map((option) => {
                const isSelected =
                  hormoneAnswers[question.keyName] === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setHormoneAnswers({
                        ...hormoneAnswers,
                        [question.keyName]: option.value,
                      })
                    }
                    className={`rounded-2xl border px-3 py-3 text-right transition ${
                      isSelected
                        ? "border-yellow-400 bg-white shadow-md"
                        : "border-stone-100 bg-white/70 hover:bg-white"
                    }`}
                  >
                    <span
                      className={`block text-sm font-semibold ${
                        isSelected ? "text-yellow-700" : "text-stone-700"
                      }`}
                    >
                      {option.label}
                    </span>
                    <span className="mt-1 block text-[11px] leading-5 text-stone-400">
                      {option.hint}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="rounded-3xl border border-yellow-100 bg-white p-4">
          <p className="mb-3 text-sm font-semibold text-stone-800">
            راهنمای سریع نتیجه
          </p>

          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between rounded-2xl bg-[#fbf7ef] px-4 py-2.5 border border-stone-100">
              <span className="text-stone-400">۸ تا ۱۰</span>
              <span className="font-medium text-stone-700">تعادل مطلوب</span>
            </div>

            <div className="flex justify-between rounded-2xl bg-[#fbf7ef] px-4 py-2.5 border border-stone-100">
              <span className="text-stone-400">۵ تا ۷</span>
              <span className="font-medium text-stone-700">نوسان خفیف</span>
            </div>

            <div className="flex justify-between rounded-2xl bg-[#fbf7ef] px-4 py-2.5 border border-stone-100">
              <span className="text-stone-400">۰ تا ۴</span>
              <span className="font-medium text-stone-700">نیازمند بررسی بیشتر</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              setSelectedTest(null);
              setHormoneAnswers({
                energy: "",
                focus: "",
                sleep: "",
                mood: "",
              });
            }}
            className="flex-1 rounded-2xl border border-stone-200 py-3 text-sm text-stone-600 hover:bg-stone-50"
          >
            انصراف
          </button>

          <button
            type="button"
            onClick={async () => {
              let score = 0;
              hormoneAnswers.energy === "good" && (score += 2);
              hormoneAnswers.energy === "medium" && (score += 1);

              hormoneAnswers.focus === "good" && (score += 2);
              hormoneAnswers.focus === "medium" && (score += 1);

              hormoneAnswers.sleep === "good" && (score += 2);
              hormoneAnswers.sleep === "medium" && (score += 1);

              hormoneAnswers.mood === "good" && (score += 2);
              hormoneAnswers.mood === "medium" && (score += 1);

              let status = "";
              let tip = "";

              if (score >= 8) {
                status = "تعادل مطلوب";
                tip = "پاسخ‌های شما نشان می‌دهد انرژی، تمرکز، خواب و خلق‌وخو در وضعیت مناسبی قرار دارند.";
              } else if (score >= 5) {
                status = "نوسان خفیف";
                tip = "ممکن است خواب، استرس یا سبک زندگی روی تعادل بدن شما اثر گذاشته باشد.";
              } else {
                status = "نیازمند بررسی بیشتر";
                tip = "افت انرژی، تمرکز یا خلق‌وخو می‌تواند دلایل مختلفی داشته باشد؛ بررسی تخصصی می‌تواند مفید باشد.";
              }

              const payload = {
                date: new Date().toISOString(),
                type: "تست تعادل هورمونی",
                score: `${score}/10`,
                status,
                tip,
                answers: hormoneAnswers,
              };

              const res = await createMenHealthReport(payload);

              if (res?.ok && res.report) {
                setResults((prev) => [res.report, ...prev]);
              } else {
                alert(res?.message || "خطا در ذخیره نتیجه تست.");
                return;
              }

              setSelectedTest(null);
              setHormoneAnswers({
                energy: "",
                focus: "",
                sleep: "",
                mood: "",
              });
            }}
            className="flex-1 rounded-2xl bg-gradient-to-l from-yellow-500 to-yellow-600 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg"
          >
            محاسبه
          </button>
        </div>
      </div>
    </div>
  </div>
)}




      {/* تست کیفیت خواب - نسخه لوکس */}
{selectedTest === "sleep" && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4">
    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[28px] bg-white shadow-2xl border border-yellow-100">
      <div className="bg-gradient-to-l from-[#4b0614] to-[#6b1022] px-5 py-5 text-center">
        <p className="text-[11px] tracking-[0.25em] text-yellow-200/75">
          GENINO HEALTH
        </p>
        <h3 className="mt-2 text-xl font-bold text-yellow-100">
          کیفیت خواب
        </h3>
        <p className="mt-2 text-xs leading-6 text-white/70">
          وضعیت خواب شبانه و انرژی صبحگاهی خود را مشخص کنید.
        </p>
      </div>

      <div className="p-5 space-y-4">
        {[
          {
            title: "میانگین خواب شبانه شما چقدر است؟",
            keyName: "hours",
            options: [
              { label: "کافی", hint: "بیش از ۷ ساعت", value: "good" },
              { label: "متوسط", hint: "بین ۵ تا ۷ ساعت", value: "medium" },
              { label: "کم", hint: "کمتر از ۵ ساعت", value: "low" },
            ],
          },
          {
            title: "در طول شب چند بار بیدار می‌شوید؟",
            keyName: "wakeups",
            options: [
              { label: "کم", hint: "خیلی کم یا تقریباً هیچ‌وقت", value: "good" },
              { label: "متوسط", hint: "یک تا دو بار", value: "medium" },
              { label: "زیاد", hint: "بیش از دو بار", value: "low" },
            ],
          },
          {
            title: "بعد از بیدار شدن چه میزان انرژی دارید؟",
            keyName: "energy",
            options: [
              { label: "بالا", hint: "صبح‌ها سرحال و آماده‌ام", value: "good" },
              { label: "متوسط", hint: "انرژی قابل قبول دارم", value: "medium" },
              { label: "پایین", hint: "اغلب خسته بیدار می‌شوم", value: "low" },
            ],
          },
          {
            title: "قبل از خواب از موبایل، تلویزیون یا صفحه‌نمایش استفاده می‌کنید؟",
            keyName: "screen",
            options: [
              { label: "کم", hint: "کم یا تقریباً هیچ‌وقت", value: "good" },
              { label: "گاهی", hint: "بعضی شب‌ها", value: "medium" },
              { label: "زیاد", hint: "اغلب قبل از خواب", value: "low" },
            ],
          },
        ].map((question, index) => (
          <div
            key={question.keyName}
            className="rounded-3xl border border-yellow-100 bg-[#fbf7ef] p-4"
          >
            <p className="mb-3 text-sm font-semibold text-stone-800">
              {index + 1}. {question.title}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {question.options.map((option) => {
                const isSelected =
                  sleepAnswers[question.keyName] === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setSleepAnswers({
                        ...sleepAnswers,
                        [question.keyName]: option.value,
                      })
                    }
                    className={`rounded-2xl border px-3 py-3 text-right transition ${
                      isSelected
                        ? "border-yellow-400 bg-white shadow-md"
                        : "border-stone-100 bg-white/70 hover:bg-white"
                    }`}
                  >
                    <span
                      className={`block text-sm font-semibold ${
                        isSelected ? "text-yellow-700" : "text-stone-700"
                      }`}
                    >
                      {option.label}
                    </span>
                    <span className="mt-1 block text-[11px] leading-5 text-stone-400">
                      {option.hint}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="rounded-3xl border border-yellow-100 bg-white p-4">
          <p className="mb-3 text-sm font-semibold text-stone-800">
            راهنمای سریع نتیجه
          </p>

          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between rounded-2xl bg-[#fbf7ef] px-4 py-2.5 border border-stone-100">
              <span className="text-stone-400">۸ تا ۱۰</span>
              <span className="font-medium text-stone-700">خواب باکیفیت</span>
            </div>

            <div className="flex justify-between rounded-2xl bg-[#fbf7ef] px-4 py-2.5 border border-stone-100">
              <span className="text-stone-400">۵ تا ۷</span>
              <span className="font-medium text-stone-700">قابل بهبود</span>
            </div>

            <div className="flex justify-between rounded-2xl bg-[#fbf7ef] px-4 py-2.5 border border-stone-100">
              <span className="text-stone-400">۰ تا ۴</span>
              <span className="font-medium text-stone-700">نیازمند اصلاح خواب</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              setSelectedTest(null);
              setSleepAnswers({
                hours: "",
                wakeups: "",
                energy: "",
                screen: "",
              });
            }}
            className="flex-1 rounded-2xl border border-stone-200 py-3 text-sm text-stone-600 hover:bg-stone-50"
          >
            انصراف
          </button>

          <button
            type="button"
            onClick={async () => {
              let score = 0;
              sleepAnswers.hours === "good" && (score += 2);
              sleepAnswers.hours === "medium" && (score += 1);

              sleepAnswers.wakeups === "good" && (score += 2);
              sleepAnswers.wakeups === "medium" && (score += 1);

              sleepAnswers.energy === "good" && (score += 2);
              sleepAnswers.energy === "medium" && (score += 1);

              sleepAnswers.screen === "good" && (score += 2);
              sleepAnswers.screen === "medium" && (score += 1);

              let status = "";
              let tip = "";

              if (score >= 8) {
                status = "خواب باکیفیت";
                tip = "الگوی خواب شما از نظر مدت، پیوستگی و انرژی صبحگاهی در وضعیت مناسبی قرار دارد.";
              } else if (score >= 5) {
                status = "قابل بهبود";
                tip = "کیفیت خواب شما قابل قبول است، اما کاهش صفحه‌نمایش قبل از خواب و نظم بیشتر می‌تواند کمک کند.";
              } else {
                status = "نیازمند اصلاح خواب";
                tip = "کم‌خوابی، بیدار شدن مکرر یا خستگی صبحگاهی می‌تواند نیازمند توجه جدی‌تر باشد.";
              }

              const payload = {
                date: new Date().toISOString(),
                type: "تست کیفیت خواب",
                score: `${score}/10`,
                status,
                tip,
                answers: sleepAnswers,
              };

              const res = await createMenHealthReport(payload);

              if (res?.ok && res.report) {
                setResults((prev) => [res.report, ...prev]);
              } else {
                alert(res?.message || "خطا در ذخیره نتیجه تست.");
                return;
              }

              setSelectedTest(null);
              setSleepAnswers({
                hours: "",
                wakeups: "",
                energy: "",
                screen: "",
              });
            }}
            className="flex-1 rounded-2xl bg-gradient-to-l from-yellow-500 to-yellow-600 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg"
          >
            محاسبه
          </button>
        </div>
      </div>
    </div>
  </div>
)}



      {/* 🧠 تست تمرکز و انگیزه */}
      {/* تست تمرکز و انگیزه - نسخه لوکس */}
{selectedTest === "focus" && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4">
    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[28px] bg-white shadow-2xl border border-yellow-100">
      <div className="bg-gradient-to-l from-[#4b0614] to-[#6b1022] px-5 py-5 text-center">
        <p className="text-[11px] tracking-[0.25em] text-yellow-200/75">
          GENINO HEALTH
        </p>
        <h3 className="mt-2 text-xl font-bold text-yellow-100">
          تمرکز و انگیزه
        </h3>
        <p className="mt-2 text-xs leading-6 text-white/70">
          وضعیت تمرکز، انگیزه و خستگی ذهنی خود را مشخص کنید.
        </p>
      </div>

      <div className="p-5 space-y-4">
        {[
          {
            title: "در زمان کار یا مطالعه چقدر تمرکز دارید؟",
            keyName: "attention",
            options: [
              { label: "بالا", hint: "تمرکز پایدار و کم‌حواس‌پرتی", value: "good" },
              { label: "متوسط", hint: "گاهی تمرکزم کم می‌شود", value: "medium" },
              { label: "پایین", hint: "تمرکز برایم سخت است", value: "low" },
            ],
          },
          {
            title: "انگیزه شما برای انجام کارها چگونه است؟",
            keyName: "motivation",
            options: [
              { label: "زیاد", hint: "باانگیزه و پیگیر هستم", value: "good" },
              { label: "معمولی", hint: "انگیزه‌ام نوسان دارد", value: "medium" },
              { label: "کم", hint: "شروع یا ادامه کارها سخت است", value: "low" },
            ],
          },
          {
            title: "در طول روز چقدر خستگی ذهنی دارید؟",
            keyName: "tired",
            options: [
              { label: "کم", hint: "ذهنم اغلب آماده و سبک است", value: "good" },
              { label: "متوسط", hint: "گاهی احساس فشار ذهنی دارم", value: "medium" },
              { label: "زیاد", hint: "اغلب ذهنم خسته و سنگین است", value: "low" },
            ],
          },
          {
            title: "هنگام کار چقدر درگیر موبایل یا شبکه‌های اجتماعی می‌شوید؟",
            keyName: "phone",
            options: [
              { label: "کم", hint: "حواس‌پرتی دیجیتال کمی دارم", value: "good" },
              { label: "گاهی", hint: "گاهی تمرکزم را قطع می‌کند", value: "medium" },
              { label: "زیاد", hint: "زیاد از کار اصلی دور می‌شوم", value: "low" },
            ],
          },
        ].map((question, index) => (
          <div
            key={question.keyName}
            className="rounded-3xl border border-yellow-100 bg-[#fbf7ef] p-4"
          >
            <p className="mb-3 text-sm font-semibold text-stone-800">
              {index + 1}. {question.title}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {question.options.map((option) => {
                const isSelected =
                  focusAnswers[question.keyName] === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setFocusAnswers({
                        ...focusAnswers,
                        [question.keyName]: option.value,
                      })
                    }
                    className={`rounded-2xl border px-3 py-3 text-right transition ${
                      isSelected
                        ? "border-yellow-400 bg-white shadow-md"
                        : "border-stone-100 bg-white/70 hover:bg-white"
                    }`}
                  >
                    <span
                      className={`block text-sm font-semibold ${
                        isSelected ? "text-yellow-700" : "text-stone-700"
                      }`}
                    >
                      {option.label}
                    </span>
                    <span className="mt-1 block text-[11px] leading-5 text-stone-400">
                      {option.hint}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="rounded-3xl border border-yellow-100 bg-white p-4">
          <p className="mb-3 text-sm font-semibold text-stone-800">
            راهنمای سریع نتیجه
          </p>

          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between rounded-2xl bg-[#fbf7ef] px-4 py-2.5 border border-stone-100">
              <span className="text-stone-400">۸ تا ۱۰</span>
              <span className="font-medium text-stone-700">تمرکز پایدار</span>
            </div>

            <div className="flex justify-between rounded-2xl bg-[#fbf7ef] px-4 py-2.5 border border-stone-100">
              <span className="text-stone-400">۵ تا ۷</span>
              <span className="font-medium text-stone-700">قابل بهبود</span>
            </div>

            <div className="flex justify-between rounded-2xl bg-[#fbf7ef] px-4 py-2.5 border border-stone-100">
              <span className="text-stone-400">۰ تا ۴</span>
              <span className="font-medium text-stone-700">نیازمند بازیابی ذهنی</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              setSelectedTest(null);
              setFocusAnswers({
                attention: "",
                motivation: "",
                tired: "",
                phone: "",
              });
            }}
            className="flex-1 rounded-2xl border border-stone-200 py-3 text-sm text-stone-600 hover:bg-stone-50"
          >
            انصراف
          </button>

          <button
            type="button"
            onClick={async () => {
              let score = 0;
              focusAnswers.attention === "good" && (score += 2);
              focusAnswers.attention === "medium" && (score += 1);

              focusAnswers.motivation === "good" && (score += 2);
              focusAnswers.motivation === "medium" && (score += 1);

              focusAnswers.tired === "good" && (score += 2);
              focusAnswers.tired === "medium" && (score += 1);

              focusAnswers.phone === "good" && (score += 2);
              focusAnswers.phone === "medium" && (score += 1);

              let status = "";
              let tip = "";

              if (score >= 8) {
                status = "تمرکز پایدار";
                tip = "تمرکز، انگیزه و مدیریت حواس‌پرتی شما در وضعیت مطلوبی قرار دارد.";
              } else if (score >= 5) {
                status = "قابل بهبود";
                tip = "با نظم بیشتر در زمان کار، استراحت کوتاه و کاهش حواس‌پرتی دیجیتال می‌توانید تمرکز بهتری بسازید.";
              } else {
                status = "نیازمند بازیابی ذهنی";
                tip = "خستگی ذهنی، افت انگیزه یا حواس‌پرتی زیاد می‌تواند نشانه نیاز به استراحت، نظم و بازنگری در برنامه روزانه باشد.";
              }

              const payload = {
                date: new Date().toISOString(),
                type: "تست تمرکز و انگیزه",
                score: `${score}/10`,
                status,
                tip,
                answers: focusAnswers,
              };

              const res = await createMenHealthReport(payload);

              if (res?.ok && res.report) {
                setResults((prev) => [res.report, ...prev]);
              } else {
                alert(res?.message || "خطا در ذخیره نتیجه تست.");
                return;
              }

              setSelectedTest(null);
              setFocusAnswers({
                attention: "",
                motivation: "",
                tired: "",
                phone: "",
              });
            }}
            className="flex-1 rounded-2xl bg-gradient-to-l from-yellow-500 to-yellow-600 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg"
          >
            محاسبه
          </button>
        </div>
      </div>
    </div>
  </div>
)}



     {/* 📊 باکس نتایج تست‌ها */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="mt-12 w-full max-w-5xl bg-white/95 border border-yellow-100 shadow-md rounded-2xl p-6 text-sm text-gray-700"
>
  <h3 className="text-yellow-700 font-semibold text-lg mb-4 text-center">
    نتایج تست‌های من 🧾
  </h3>

  {/* 🔍 فیلترها برای موبایل */}
  <div className="mb-4 sm:hidden bg-yellow-50/60 border border-yellow-100 rounded-xl p-3">
    <button
      onClick={() => setShowFiltersMobile(!showFiltersMobile)}
      className="w-full text-yellow-700 font-semibold flex items-center justify-between"
    >
      <span>🔍 فیلتر نتایج</span>
      <span>{showFiltersMobile ? "▲" : "▼"}</span>
    </button>

    {showFiltersMobile && (
      <div className="mt-3 space-y-3 text-sm">
        {/* فیلتر تاریخ */}
        <div>
          <label className="block mb-1 text-gray-700 text-xs">تاریخ ثبت:</label>
          <DatePicker
            value={filterExactDate}
            onChange={(date) => setFilterExactDate(date)}
            calendar={persian}
            locale={persian_fa}
            inputClass="border border-yellow-200 rounded-lg px-2 py-1 w-full text-xs focus:ring-2 focus:ring-yellow-300 outline-none"
            placeholder="انتخاب تاریخ..."
            format="YYYY/MM/DD"
          />
        </div>

        {/* فیلتر نوع تست */}
        <div>
          <label className="block mb-1 text-gray-700 text-xs">نوع تست:</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-yellow-200 rounded-lg px-2 py-1 w-full text-xs focus:ring-2 focus:ring-yellow-300 outline-none"
          >
            <option>همه</option>
            <option>BMI</option>
            <option>سلامت قلب</option>
            <option>متابولیسم</option>
            <option>هورمون</option>
            <option>خواب</option>
            <option>تمرکز</option>
          </select>
        </div>

        <button
          onClick={() => setShowFiltersMobile(false)}
          className="w-full mt-2 bg-yellow-500 text-white rounded-xl py-1.5 text-xs hover:bg-yellow-600 transition"
        >
          اعمال فیلتر ✅
        </button>
      </div>
    )}
  </div>

  {/* 📱 نسخه موبایل (کارت‌ها) */}
  <div className="space-y-3 sm:hidden">
    {filteredResults.length > 0 ? (
      filteredResults.map((r) => (
        <div
          key={r.id}
          className="bg-yellow-50/70 border border-yellow-100 rounded-xl p-4 text-sm shadow-sm"
        >
          <div className="flex justify-between mb-1">
            <span className="text-gray-700 font-medium">{r.type}</span>
            <span className="text-xs text-gray-500">{formatDate(r.date)}</span>
          </div>
          <p className="text-gray-600">
            <strong>نتیجه:</strong> {r.score}
          </p>
          <p className="text-gray-600">
            <strong>وضعیت:</strong> {r.status}
          </p>
          <p className="text-gray-600">
            <strong>توصیه:</strong> {r.tip}
          </p>
          <div className="text-left mt-2">
            <button
              onClick={() => {
                setDeleteTarget({ type: "single", id: r.id });
                setShowDeleteModal(true);
              }}
              className="text-red-500 text-xs hover:text-red-700"
            >
              حذف 🗑️
            </button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500 italic py-3">
        هنوز تستی ثبت نشده 💭
      </p>
    )}
  </div>

  {/* 💻 نسخه دسکتاپ (جدول) */}
  <div className="hidden sm:block overflow-x-auto max-h-64 overflow-y-auto">
    <table className="w-full text-sm text-gray-700 border-collapse">
      <thead>
        <tr className="bg-yellow-50 text-gray-800 border-b border-yellow-100">
          <th className="py-2 px-3 text-right align-top">
            📅 تاریخ ثبت
            <div className="mt-1">
              <DatePicker
                value={filterExactDate}
                onChange={(date) => setFilterExactDate(date)}
                calendar={persian}
                locale={persian_fa}
                inputClass="border border-yellow-200 rounded-lg px-2 py-1 w-full text-xs focus:ring-2 focus:ring-yellow-300 outline-none"
                placeholder="انتخاب تاریخ..."
                format="YYYY/MM/DD"
              />
            </div>
          </th>

          <th className="py-2 px-3 text-right">
            🧩 نوع تست
            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="mt-1 border border-yellow-200 rounded-lg px-2 py-1 w-full text-xs focus:ring-2 focus:ring-yellow-300 outline-none"
              >
                <option>همه</option>
                <option>BMI</option>
                <option>سلامت قلب</option>
                <option>متابولیسم</option>
                <option>هورمون</option>
                <option>خواب</option>
                <option>تمرکز</option>
              </select>
            </div>
          </th>

          <th className="py-2 px-3 text-right">📈 نتیجه</th>
          <th className="py-2 px-3 text-right">📋 وضعیت</th>
          <th className="py-2 px-3 text-right">💡 توصیه</th>
          <th className="py-2 px-3 text-center">🗑️ حذف</th>
        </tr>
      </thead>
      <tbody>
        {filteredResults.length > 0 ? (
          filteredResults.map((r) => (
            <tr
              key={r.id}
              className="border-b border-yellow-50 hover:bg-yellow-50 transition"
            >
              <td className="py-2 px-3">{formatDate(r.date)}</td>
              <td className="py-2 px-3 font-medium text-yellow-700">{r.type}</td>
              <td className="py-2 px-3">{r.score}</td>
              <td className="py-2 px-3">{r.status}</td>
              <td className="py-2 px-3 text-gray-600">{r.tip}</td>
              <td className="py-2 px-3 text-center">
  <button
    onClick={() => {
      setDeleteTarget({ type: "single", id: r.id });
      setShowDeleteModal(true);
    }}
    className="text-red-600 hover:text-red-800 transition-colors"
  >
    🗑️
  </button>
</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center py-4 text-gray-500 italic">
              هنوز تستی ثبت نشده 💭
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  {/* 🔘 دکمه حذف همه گزارش‌ها */}
  <div className="flex justify-end mt-5">
    <button
      onClick={() => {
        if (results.length === 0) return;
        setDeleteTarget({ type: "all" });
        setShowDeleteModal(true);
      }}
      className="text-red-600 border border-red-300 px-4 py-1.5 rounded-xl text-sm hover:bg-red-50 transition-all duration-200"
    >
      🗑️ حذف همه گزارش‌ها
    </button>
  </div>

  {/* 🌟 مودال حذف */}
  <GoldenModal
    show={showDeleteModal}
    title="❗ تأیید حذف"
    description={
      deleteTarget?.type === "all"
        ? "آیا مطمئنی می‌خواهی تمام گزارش‌های ثبت‌شده را حذف کنی؟"
        : "آیا مطمئنی می‌خواهی این گزارش را حذف کنی؟"
    }
    confirmLabel="بله، حذف کن"
    onConfirm={async () => {
      if (deleteTarget?.type === "all") {
        setResults([]);
      } else if (deleteTarget?.type === "single" && deleteTarget.id) {
  const res = await deleteMenHealthReport(deleteTarget.id);

  if (res?.ok) {
    setResults((prev) => prev.filter((item) => item.id !== deleteTarget.id));
  } else {
    alert(res?.message || "خطا در حذف گزارش.");
    return;
  }
}
      setShowDeleteModal(false);
    }}
    onCancel={() => setShowDeleteModal(false)}
  >
    <p className="text-sm text-gray-600 text-center">
      حذف گزارش غیرقابل بازگشت است. لطفاً قبل از تأیید مطمئن شوید 💛
    </p>
  </GoldenModal>


</motion.div>


      {/* 📘 توضیحات و منابع علمی */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-10 mb-16 max-w-5xl w-full bg-white/90 border border-yellow-100 rounded-2xl shadow-md p-6 text-sm text-gray-700 leading-relaxed"
      >
        <h4 className="font-bold text-yellow-700 mb-2 flex items-center gap-1">
          📘 راهنمای تفسیر نتایج و منابع علمی
        </h4>

        <p className="mb-3">
          نتایج تست‌ها بر اساس پاسخ‌های شما به‌صورت تقریبی محاسبه می‌شوند و جایگزین
          تشخیص یا مشاوره پزشکی نیستند. هدف این ارزیابی‌ها افزایش آگاهی از وضعیت بدن
          و ذهن است تا بتوانید سبک زندگی سالم‌تری انتخاب کنید.
        </p>

        <h5 className="font-semibold text-yellow-700 mb-1">
          💡 توصیه‌های کلی برای بهبود سلامت:
        </h5>
        <ul className="list-disc pr-5 space-y-1 mb-3">
          <li>خواب کافی و منظم (حداقل ۷ ساعت در شب) داشته باشید.</li>
          <li>فعالیت بدنی منظم مثل پیاده‌روی یا ورزش سبک را فراموش نکنید.</li>
          <li>مصرف قند، چربی و دخانیات را کاهش دهید.</li>
          <li>استرس روزانه را با مدیتیشن یا طبیعت‌گردی کاهش دهید.</li>
          <li>در صورت مشاهده تغییرات غیرعادی، با پزشک مشورت کنید.</li>
        </ul>

        <h5 className="font-semibold text-yellow-700 mb-1">
          📚 منابع علمی مورد استفاده:
        </h5>
        <ul className="list-disc pr-5 space-y-1 text-gray-600">
          <li>World Health Organization (WHO) – BMI & Health Metrics 2023</li>
          <li>American Heart Association – Lifestyle & Stress Research 2022</li>
          <li>Harvard Medical School – Sleep & Cognitive Performance 2021</li>
          <li>Mayo Clinic – Hormonal Health & Wellness 2023</li>
          <li>National Institutes of Health (NIH) – Focus & Motivation Studies 2020–2024</li>
        </ul>
      </motion.div>


      {/* 🧠 جعبه آگاهی ژنینو */}
      <motion.div
        className="relative z-[6] -mt-2 mb-2 w-full max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <GeninoAwarenessBox
          image="/images/awareness/man/1.jpg"
          message="آگاهی، نیروی آرامِ مردان قدرتمند است."
          buttons={[
            { title: "تمرکز لیزری", link: "/articles/laser-focus" },
            { title: "بدن مردان", link: "/articles/body-men" },
            { title: "بدن زنان", link: "/articles/body-women" },
            { title: "ژن چیست؟", link: "/articles/what-is-gene" },
            { title: "اپی‌ژنتیک رفتاری", link: "/articles/behavioral-epigenetics" },
            { title: "۵ اصل طلایی موفقیت در کارآفرینی", link: "/articles/entrepreneurs/five-golden-principles" },
            { title: "نقش نظم شخصی در موفقیت", link: "/articles/entrepreneurs/personal-discipline" },
          ]}
        />
      </motion.div>

    </main>
  );
}
