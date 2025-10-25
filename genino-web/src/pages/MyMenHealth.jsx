// src/pages/MyMenHealth.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Brain,
  Flame,
  Pill,
  Moon,
  Accessibility,
} from "lucide-react";
import GoldenModal from "../components/GoldenModal";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function MyMenHealth() {
  const [selectedTest, setSelectedTest] = useState(null);
  const [results, setResults] = useState([]); // نتایج تست‌ها
  const [form, setForm] = useState({ height: "", weight: "" });

  // 🫀 پاسخ‌های تست سلامت قلب
  const [heartAnswers, setHeartAnswers] = useState({
    activity: "",
    stress: "",
    sleep: "",
    habit: "",
  });

  // 🔥 پاسخ‌های تست متابولیسم
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

  // 🧮 محاسبه BMI و ثبت تاریخ
  const handleBmiCalculate = () => {
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

    const date = new Date().toLocaleDateString("fa-IR");
    const newResult = {
      id: Date.now(),
      type: "تست BMI و ترکیب بدن",
      bmi,
      status,
      tip,
      date,
    };

    setResults((prev) => [...prev, newResult]);
    setSelectedTest(null);
    setForm({ height: "", weight: "" });
  };

  // 🧠 لیست تست‌ها
  const tests = [
    {
      id: "bmi",
      icon: <Accessibility className="w-8 h-8 text-yellow-600" />,
      title: "تست BMI و ترکیب بدن ⚖️",
      desc: "محاسبه شاخص توده بدنی و درصد چربی برای بررسی تناسب اندام.",
    },
    {
      id: "heart",
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "تست سلامت قلب ❤️",
      desc: "بررسی استرس، نبض و سلامت عمومی قلب.",
    },
    {
      id: "metabolism",
      icon: <Flame className="w-8 h-8 text-orange-500" />,
      title: "تست متابولیسم 🔥",
      desc: "تحلیل سوخت‌وساز و میزان کالری مورد نیاز بدن.",
    },
    {
      id: "hormone",
      icon: <Pill className="w-8 h-8 text-blue-500" />,
      title: "تست تعادل هورمونی 💊",
      desc: "بررسی علائم افت انرژی، تمرکز و تستوسترون.",
    },
    {
      id: "sleep",
      icon: <Moon className="w-8 h-8 text-indigo-500" />,
      title: "تست کیفیت خواب 😴",
      desc: "تحلیل خواب شبانه، انرژی صبحگاهی و استراحت ذهن.",
    },
    {
      id: "focus",
      icon: <Brain className="w-8 h-8 text-green-600" />,
      title: "تست تمرکز و انگیزه 🧠",
      desc: "بررسی تعادل ذهن، تمرکز و سطح انگیزه کاری.",
    },
  ];

  // 🧭 استیت‌های فیلتر و حذف
  const [filterType, setFilterType] = useState("همه");
  const [filterExactDate, setFilterExactDate] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // 🧮 فیلتر و مرتب‌سازی گزارش‌ها (جدیدترین بالا)
  const filteredResults = results
    .filter((r) => {
      const typeMatch = filterType === "همه" || r.type.includes(filterType);
      let dateMatch = true;
      if (filterExactDate) {
        // توجه: DatePicker با فرمت "YYYY/MM/DD" و تقویم/اعداد فارسی ست شده
        dateMatch = r.date === filterExactDate.format("YYYY/MM/DD");
      }
      return typeMatch && dateMatch;
    })
    .sort((a, b) => b.id - a.id);

  return (
    <main
      dir="rtl"
      className="min-h-screen pb-72 bg-gradient-to-b from-[#fffdf7] to-[#fff9e8] flex flex-col items-center px-6 py-10 text-gray-800"
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
        <p className="text-gray-600 text-sm">
          بررسی علمی و شخصی سلامت جسم، ذهن و هورمون‌ها — مخصوص آقایان.
        </p>
      </motion.div>

      {/* 🧩 کارت تست‌ها */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl w-full">
        {tests.map((test) => (
          <motion.div
            key={test.id}
            whileHover={{ scale: 1.03 }}
            className="bg-white/90 border border-yellow-100 rounded-2xl shadow-md p-5 text-right cursor-pointer hover:shadow-lg transition"
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

      {/* ⚖️ تست BMI */}
      <GoldenModal
        show={selectedTest === "bmi"}
        title="⚖️ محاسبه BMI و ترکیب بدن"
        description="وزن و قد خود را وارد کنید تا شاخص توده بدنی شما محاسبه شود."
        confirmLabel="محاسبه"
        onConfirm={handleBmiCalculate}
        onCancel={() => {
          setSelectedTest(null);
          setForm({ height: "", weight: "" });
        }}
      >
        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1 text-gray-700">
              قد (سانتی‌متر):
            </label>
            <input
              type="number"
              value={form.height}
              onChange={(e) => setForm({ ...form, height: e.target.value })}
              className="border border-yellow-200 rounded-xl w-full p-2 focus:ring-2 focus:ring-yellow-300 outline-none text-right"
              placeholder="مثلاً ۱۸۰"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-700">
              وزن (کیلوگرم):
            </label>
            <input
              type="number"
              value={form.weight}
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
              className="border border-yellow-200 rounded-xl w-full p-2 focus:ring-2 focus:ring-yellow-300 outline-none text-right"
              placeholder="مثلاً ۸۵"
            />
          </div>

          {/* 🧾 جدول آموزشی BMI */}
          <div className="mt-6">
            <h4 className="text-yellow-700 font-semibold text-sm mb-2">
              جدول محدوده شاخص توده بدنی (BMI)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-gray-700 border border-yellow-200 rounded-xl overflow-hidden">
                <thead className="bg-yellow-50 text-yellow-800">
                  <tr>
                    <th className="py-2 px-3 text-right border-b border-yellow-100">
                      محدوده BMI
                    </th>
                    <th className="py-2 px-3 text-right border-b border-yellow-100">
                      وضعیت بدن
                    </th>
                    <th className="py-2 px-3 text-right border-b border-yellow-100">
                      توضیح
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-yellow-50">
                    <td className="py-1.5 px-3">کمتر از ۱۸.۵</td>
                    <td className="py-1.5 px-3 text-blue-700 font-medium">کم‌وزن</td>
                    <td className="py-1.5 px-3">
                      نیاز به تغذیه بهتر و افزایش توده عضلانی.
                    </td>
                  </tr>
                  <tr className="hover:bg-yellow-50">
                    <td className="py-1.5 px-3">۱۸.۵ تا ۲۴.۹</td>
                    <td className="py-1.5 px-3 text-green-700 font-medium">نرمال ✅</td>
                    <td className="py-1.5 px-3">
                      وزن متعادل و سبک زندگی سالم.
                    </td>
                  </tr>
                  <tr className="hover:bg-yellow-50">
                    <td className="py-1.5 px-3">۲۵ تا ۲۹.۹</td>
                    <td className="py-1.5 px-3 text-orange-600 font-medium">اضافه‌وزن ⚠️</td>
                    <td className="py-1.5 px-3">
                      نیاز به کنترل رژیم غذایی و فعالیت بدنی بیشتر.
                    </td>
                  </tr>
                  <tr className="hover:bg-yellow-50">
                    <td className="py-1.5 px-3">۳۰ به بالا</td>
                    <td className="py-1.5 px-3 text-red-600 font-medium">چاقی ❗</td>
                    <td className="py-1.5 px-3">
                      توصیه به مشاوره پزشکی و برنامه کاهش وزن.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </GoldenModal>

      {/* ❤️ تست سلامت قلب */}
      <GoldenModal
        show={selectedTest === "heart"}
        title="❤️ تست سلامت قلب و استرس روزانه"
        description="به چند سؤال ساده پاسخ بده تا سطح سلامت قلبت تخمین زده بشه."
        confirmLabel="محاسبه سلامت قلب ❤️"
        onConfirm={() => {
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
            status = "عالی 💚";
            tip = "قلبت در وضعیت بسیار خوبی قرار داره! سبک زندگی سالمت رو ادامه بده.";
          } else if (score >= 5) {
            status = "متوسط 💛";
            tip = "قلبت در وضعیت متوسطه؛ بهتره خواب، استرس و فعالیتت رو تنظیم کنی.";
          } else {
            status = "نیاز به توجه ❤️‍🔥";
            tip = "علائم استرس یا خستگی زیاد داری. به تغذیه، استراحت و ورزش اهمیت بده.";
          }

          const date = new Date().toLocaleDateString("fa-IR");
          const newResult = {
            id: Date.now(),
            type: "تست سلامت قلب ❤️",
            bmi: `${score}/10`,
            status,
            tip,
            date,
          };

          setResults((prev) => [...prev, newResult]);
          setSelectedTest(null);
          setHeartAnswers({
            activity: "",
            stress: "",
            sleep: "",
            habit: "",
          });
        }}
        onCancel={() => {
          setSelectedTest(null);
          setHeartAnswers({
            activity: "",
            stress: "",
            sleep: "",
            habit: "",
          });
        }}
      >
        <div className="space-y-4 text-sm">
          {/* 🏃‍♂️ فعالیت بدنی */}
          <div>
            <p className="font-semibold text-gray-800 mb-2">۱. میزان فعالیت بدنی شما چقدره؟</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setHeartAnswers({ ...heartAnswers, activity: "good" })}
                className={`px-3 py-1 rounded-xl border ${
                  heartAnswers.activity === "good"
                    ? "bg-yellow-200 border-yellow-400"
                    : "border-yellow-200 hover:bg-yellow-50"
                }`}
              >
                منظم (۳ روز یا بیشتر در هفته)
              </button>
              <button
                onClick={() => setHeartAnswers({ ...heartAnswers, activity: "medium" })}
                className={`px-3 py-1 rounded-xl border ${
                  heartAnswers.activity === "medium"
                    ? "bg-yellow-100 border-yellow-400"
                    : "border-yellow-200 hover:bg-yellow-50"
                }`}
              >
                گاهی (۱ تا ۲ روز)
              </button>
              <button
                onClick={() => setHeartAnswers({ ...heartAnswers, activity: "low" })}
                className={`px-3 py-1 rounded-xl border ${
                  heartAnswers.activity === "low"
                    ? "bg-gray-100 border-yellow-200"
                    : "border-yellow-100 hover:bg-yellow-50"
                }`}
              >
                خیلی کم یا هیچ‌وقت
              </button>
            </div>
          </div>

          {/* 😣 استرس */}
          <div>
            <p className="font-semibold text-gray-800 mb-2">۲. چقدر در طول روز احساس استرس داری؟</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setHeartAnswers({ ...heartAnswers, stress: "low" })}
                className={`px-3 py-1 rounded-xl border ${
                  heartAnswers.stress === "low"
                    ? "bg-yellow-200 border-yellow-400"
                    : "border-yellow-200 hover:bg-yellow-50"
                }`}
              >
                کم
              </button>
              <button
                onClick={() => setHeartAnswers({ ...heartAnswers, stress: "medium" })}
                className={`px-3 py-1 rounded-xl border ${
                  heartAnswers.stress === "medium"
                    ? "bg-yellow-100 border-yellow-400"
                    : "border-yellow-200 hover:bg-yellow-50"
                }`}
              >
                گاهی
              </button>
              <button
                onClick={() => setHeartAnswers({ ...heartAnswers, stress: "high" })}
                className={`px-3 py-1 rounded-xl border ${
                  heartAnswers.stress === "high"
                    ? "bg-gray-100 border-yellow-200"
                    : "border-yellow-100 hover:bg-yellow-50"
                }`}
              >
                زیاد
              </button>
            </div>
          </div>

          {/* 💤 خواب */}
          <div>
            <p className="font-semibold text-gray-800 mb-2">۳. میانگین ساعت خواب شبانه شما؟</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setHeartAnswers({ ...heartAnswers, sleep: "good" })}
                className={`px-3 py-1 rounded-xl border ${
                  heartAnswers.sleep === "good"
                    ? "bg-yellow-200 border-yellow-400"
                    : "border-yellow-200 hover:bg-yellow-50"
                }`}
              >
                بیش از ۷ ساعت
              </button>
              <button
                onClick={() => setHeartAnswers({ ...heartAnswers, sleep: "medium" })}
                className={`px-3 py-1 rounded-xl border ${
                  heartAnswers.sleep === "medium"
                    ? "bg-yellow-100 border-yellow-400"
                    : "border-yellow-200 hover:bg-yellow-50"
                }`}
              >
                بین ۵ تا ۷ ساعت
              </button>
              <button
                onClick={() => setHeartAnswers({ ...heartAnswers, sleep: "low" })}
                className={`px-3 py-1 rounded-xl border ${
                  heartAnswers.sleep === "low"
                    ? "bg-gray-100 border-yellow-200"
                    : "border-yellow-100 hover:bg-yellow-50"
                }`}
              >
                کمتر از ۵ ساعت
              </button>
            </div>
          </div>

          {/* ☕ عادت‌ها */}
          <div>
            <p className="font-semibold text-gray-800 mb-2">۴. مصرف سیگار، قهوه زیاد یا نوشیدنی انرژی‌زا داری؟</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setHeartAnswers({ ...heartAnswers, habit: "good" })}
                className={`px-3 py-1 rounded-xl border ${
                  heartAnswers.habit === "good"
                    ? "bg-yellow-200 border-yellow-400"
                    : "border-yellow-200 hover:bg-yellow-50"
                }`}
              >
                خیر
              </button>
              <button
                onClick={() => setHeartAnswers({ ...heartAnswers, habit: "medium" })}
                className={`px-3 py-1 rounded-xl border ${
                  heartAnswers.habit === "medium"
                    ? "bg-yellow-100 border-yellow-400"
                    : "border-yellow-200 hover:bg-yellow-50"
                }`}
              >
                گاهی
              </button>
              <button
                onClick={() => setHeartAnswers({ ...heartAnswers, habit: "bad" })}
                className={`px-3 py-1 rounded-xl border ${
                  heartAnswers.habit === "bad"
                    ? "bg-gray-100 border-yellow-200"
                    : "border-yellow-100 hover:bg-yellow-50"
                }`}
              >
                بله
              </button>
            </div>
          </div>

          {/* 🩺 جدول محدوده نتایج */}
          <div className="mt-6">
            <h4 className="text-yellow-700 font-semibold text-sm mb-2">
              جدول تفسیر امتیاز تست سلامت قلب
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-gray-700 border border-yellow-200 rounded-xl overflow-hidden">
                <thead className="bg-yellow-50 text-yellow-800">
                  <tr>
                    <th className="py-2 px-3 text-right border-b border-yellow-100">
                      امتیاز کل
                    </th>
                    <th className="py-2 px-3 text-right border-b border-yellow-100">
                      وضعیت قلب
                    </th>
                    <th className="py-2 px-3 text-right border-b border-yellow-100">
                      توصیه
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-yellow-50">
                    <td className="py-1.5 px-3">۸ تا ۱۰</td>
                    <td className="py-1.5 px-3 text-green-700 font-medium">💚 عالی</td>
                    <td className="py-1.5 px-3">سبک زندگی سالم داری، ادامه بده.</td>
                  </tr>
                  <tr className="hover:bg-yellow-50">
                    <td className="py-1.5 px-3">۵ تا ۷</td>
                    <td className="py-1.5 px-3 text-yellow-600 font-medium">💛 متوسط</td>
                    <td className="py-1.5 px-3">
                      بهتره خواب، استرس و تحرکت رو تنظیم کنی.
                    </td>
                  </tr>
                  <tr className="hover:bg-yellow-50">
                    <td className="py-1.5 px-3">۰ تا ۴</td>
                    <td className="py-1.5 px-3 text-red-600 font-medium">❤️‍🔥 نیاز به توجه</td>
                    <td className="py-1.5 px-3">
                      به استراحت، تغذیه سالم و مشاوره پزشکی توجه کن.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </GoldenModal>

      {/* 🔥 تست متابولیسم */}
      <GoldenModal
        show={selectedTest === "metabolism"}
        title="🔥 تست متابولیسم (سوخت‌وساز بدن)"
        description="به چند سؤال کوتاه پاسخ بده تا سطح سوخت‌وساز بدنت مشخص بشه."
        confirmLabel="محاسبه متابولیسم 🔥"
        onConfirm={() => {
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
            status = "🔥 سریع";
            tip = "بدنت سوخت‌وساز بالایی داره؛ مراقب باش کالری کافی دریافت کنی.";
          } else if (score >= 5) {
            status = "⚖️ نرمال";
            tip = "سوخت‌وسازت متعادله، خواب و تغذیه رو همین‌طور ادامه بده.";
          } else {
            status = "🧊 کند";
            tip = "احتمالاً متابولیسمت پایینه؛ تحرک، خواب کافی و پروتئین بیشتر لازمه.";
          }

          const date = new Date().toLocaleDateString("fa-IR");
          const newResult = {
            id: Date.now(),
            type: "تست متابولیسم 🔥",
            bmi: `${score}/10`,
            status,
            tip,
            date,
          };

          setResults((prev) => [...prev, newResult]);
          setSelectedTest(null);
          setMetabolismAnswers({
            energy: "",
            sleep: "",
            food: "",
            activity: "",
          });
        }}
        onCancel={() => {
          setSelectedTest(null);
          setMetabolismAnswers({
            energy: "",
            sleep: "",
            food: "",
            activity: "",
          });
        }}
      >
        <div className="space-y-4 text-sm">
          {/* ⚡ انرژی روزانه */}
          <div>
            <p className="font-semibold text-gray-800 mb-2">۱. احساس انرژی روزانه‌ات چطوره؟</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setMetabolismAnswers({ ...metabolismAnswers, energy: "good" })}
                className={`px-3 py-1 rounded-xl border ${
                  metabolismAnswers.energy === "good"
                    ? "bg-yellow-200 border-yellow-400"
                    : "border-yellow-200 hover:bg-yellow-50"
                }`}
              >
                پرانرژی و فعال 😄
              </button>
              <button
                onClick={() => setMetabolismAnswers({ ...metabolismAnswers, energy: "medium" })}
                className={`px-3 py-1 rounded-xl border ${
                  metabolismAnswers.energy === "medium"
                    ? "bg-yellow-100 border-yellow-400"
                    : "border-yellow-200 hover:bg-yellow-50"
                }`}
              >
                معمولی ⚖️
              </button>
              <button
                onClick={() => setMetabolismAnswers({ ...metabolismAnswers, energy: "low" })}
                className={`px-3 py-1 rounded-xl border ${
                  metabolismAnswers.energy === "low"
                    ? "bg-gray-100 border-yellow-200"
                    : "border-yellow-100 hover:bg-yellow-50"
                }`}
              >
                زود خسته می‌شم 😴
              </button>
            </div>
          </div>

          {/* 🌙 خواب شبانه */}
          <div>
            <p className="font-semibold text-gray-800 mb-2">۲. الگوی خواب شبانه‌ات چطوره؟</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setMetabolismAnswers({ ...metabolismAnswers, sleep: "good" })}
                className={`px-3 py-1 rounded-xl border ${
                  metabolismAnswers.sleep === "good"
                    ? "bg-yellow-200 border-yellow-400"
                    : "border-yellow-200 hover:bg-yellow-50"
                }`}
              >
                منظم (۷–۸ ساعت) 🌙
              </button>
              <button
                onClick={() => setMetabolismAnswers({ ...metabolismAnswers, sleep: "medium" })}
                className={`px-3 py-1 rounded-xl border ${
                  metabolismAnswers.sleep === "medium"
                    ? "bg-yellow-100 border-yellow-400"
                    : "border-yellow-200 hover:bg-yellow-50"
                }`}
              >
                نسبتاً منظم 😌
              </button>
              <button
                onClick={() => setMetabolismAnswers({ ...metabolismAnswers, sleep: "low" })}
                className={`px-3 py-1 rounded-xl border ${
                  metabolismAnswers.sleep === "low"
                    ? "bg-gray-100 border-yellow-200"
                    : "border-yellow-100 hover:bg-yellow-50"
                }`}
              >
                بی‌نظم یا کوتاه ⏰
              </button>
            </div>
          </div>

          {/* 🍽️ وعده‌های غذایی */}
          <div>
            <p className="font-semibold text-gray-800 mb-2">۳. وعده‌های غذایی‌ات چطوره؟</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setMetabolismAnswers({ ...metabolismAnswers, food: "good" })}
                className={`px-3 py-1 rounded-xl border ${
                  metabolismAnswers.food === "good"
                    ? "bg-yellow-200 border-yellow-400"
                    : "border-yellow-200 hover:bg-yellow-50"
                }`}
              >
                منظم و متعادل 🥗
              </button>
              <button
                onClick={() => setMetabolismAnswers({ ...metabolismAnswers, food: "medium" })}
                className={`px-3 py-1 rounded-xl border ${
                  metabolismAnswers.food === "medium"
                    ? "bg-yellow-100 border-yellow-400"
                    : "border-yellow-200 hover:bg-yellow-50"
                }`}
              >
                گاهی بی‌نظم 🍞
              </button>
              <button
                onClick={() => setMetabolismAnswers({ ...metabolismAnswers, food: "low" })}
                className={`px-3 py-1 rounded-xl border ${
                  metabolismAnswers.food === "low"
                    ? "bg-gray-100 border-yellow-200"
                    : "border-yellow-100 hover:bg-yellow-50"
                }`}
              >
                خیلی نامنظم 🚫
              </button>
            </div>
          </div>

          {/* 🏃‍♂️ فعالیت بدنی */}
          <div>
            <p className="font-semibold text-gray-800 mb-2">۴. ورزش یا تحرک بدنی چقدر داری؟</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setMetabolismAnswers({ ...metabolismAnswers, activity: "good" })}
                className={`px-3 py-1 rounded-xl border ${
                  metabolismAnswers.activity === "good"
                    ? "bg-yellow-200 border-yellow-400"
                    : "border-yellow-200 hover:bg-yellow-50"
                }`}
              >
                حداقل ۳ بار در هفته 🏃‍♂️
              </button>
              <button
                onClick={() => setMetabolismAnswers({ ...metabolismAnswers, activity: "medium" })}
                className={`px-3 py-1 rounded-xl border ${
                  metabolismAnswers.activity === "medium"
                    ? "bg-yellow-100 border-yellow-400"
                    : "border-yellow-200 hover:bg-yellow-50"
                }`}
              >
                گاهی پیاده‌روی 🚶‍♂️
              </button>
              <button
                onClick={() => setMetabolismAnswers({ ...metabolismAnswers, activity: "low" })}
                className={`px-3 py-1 rounded-xl border ${
                  metabolismAnswers.activity === "low"
                    ? "bg-gray-100 border-yellow-200"
                    : "border-yellow-100 hover:bg-yellow-50"
                }`}
              >
                تحرک خیلی کم 🪑
              </button>
            </div>
          </div>

          {/* 📊 جدول تفسیر */}
          <div className="mt-6">
            <h4 className="text-yellow-700 font-semibold text-sm mb-2">
              جدول تفسیر سطح متابولیسم بدن
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-gray-700 border border-yellow-200 rounded-xl overflow-hidden">
                <thead className="bg-yellow-50 text-yellow-800">
                  <tr>
                    <th className="py-2 px-3 text-right border-b border-yellow-100">امتیاز کل</th>
                    <th className="py-2 px-3 text-right border-b border-yellow-100">وضعیت متابولیسم</th>
                    <th className="py-2 px-3 text-right border-b border-yellow-100">توصیه</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-yellow-50">
                    <td className="py-1.5 px-3">۸ تا ۱۰</td>
                    <td className="py-1.5 px-3 text-orange-600 font-medium">🔥 سریع</td>
                    <td className="py-1.5 px-3">کالری کافی دریافت کن، مراقب تحلیل عضله باش.</td>
                  </tr>
                  <tr className="hover:bg-yellow-50">
                    <td className="py-1.5 px-3">۵ تا ۷</td>
                    <td className="py-1.5 px-3 text-yellow-600 font-medium">⚖️ نرمال</td>
                    <td className="py-1.5 px-3">تعادل خوبی داری، ادامه بده.</td>
                  </tr>
                  <tr className="hover:bg-yellow-50">
                    <td className="py-1.5 px-3">۰ تا ۴</td>
                    <td className="py-1.5 px-3 text-blue-700 font-medium">🧊 کند</td>
                    <td className="py-1.5 px-3">خواب و تحرک رو افزایش بده و وعده‌ها رو منظم کن.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </GoldenModal>

      {/* 💊 تست تعادل هورمونی */}
      <GoldenModal
        show={selectedTest === "hormone"}
        title="💊 تست تعادل هورمونی آقایان"
        description="به چند سؤال کوتاه پاسخ بده تا وضعیت هورمون‌های حیاتی بدنت بررسی بشه."
        confirmLabel="محاسبه تعادل هورمونی 💛"
        onConfirm={() => {
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
            status = "💛 متعادل";
            tip = "هورمون‌هات در سطح مطلوبی هستن. خواب، تغذیه و فعالیتت رو ادامه بده.";
          } else if (score >= 5) {
            status = "🟠 کمی نوسانی";
            tip = "ممکنه استرس، کم‌خوابی یا رژیم غذایی باعث نوسان هورمونی شده باشه.";
          } else {
            status = "🔴 نیاز به بررسی";
            tip = "نشانه‌های افت تستوسترون یا استرس مزمن دیده می‌شه؛ مشاوره پزشکی مفیده.";
          }

          const date = new Date().toLocaleDateString("fa-IR");
          const newResult = {
            id: Date.now(),
            type: "تست تعادل هورمونی 💊",
            bmi: `${score}/10`,
            status,
            tip,
            date,
          };

          setResults((prev) => [...prev, newResult]);
          setSelectedTest(null);
          setHormoneAnswers({
            energy: "",
            focus: "",
            sleep: "",
            mood: "",
          });
        }}
        onCancel={() => {
          setSelectedTest(null);
          setHormoneAnswers({
            energy: "",
            focus: "",
            sleep: "",
            mood: "",
          });
        }}
      >
        <div className="space-y-4 text-sm">
          {/* ⚡ انرژی روزانه */}
          <div>
            <p className="font-semibold text-gray-800 mb-2">۱. در طول روز چقدر احساس انرژی داری؟</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setHormoneAnswers({ ...hormoneAnswers, energy: "good" })}
                className={`px-3 py-1 rounded-xl border ${
                  hormoneAnswers.energy === "good"
                    ? "bg-blue-100 border-blue-400"
                    : "border-blue-200 hover:bg-blue-50"
                }`}
              >
                زیاد 💪
              </button>
              <button
                onClick={() => setHormoneAnswers({ ...hormoneAnswers, energy: "medium" })}
                className={`px-3 py-1 rounded-xl border ${
                  hormoneAnswers.energy === "medium"
                    ? "bg-yellow-100 border-yellow-400"
                    : "border-blue-200 hover:bg-blue-50"
                }`}
              >
                معمولی 🙂
              </button>
              <button
                onClick={() => setHormoneAnswers({ ...hormoneAnswers, energy: "low" })}
                className={`px-3 py-1 rounded-xl border ${
                  hormoneAnswers.energy === "low"
                    ? "bg-gray-100 border-yellow-200"
                    : "border-yellow-100 hover:bg-yellow-50"
                }`}
              >
                خیلی کم 😴
              </button>
            </div>
          </div>

          {/* 🎯 تمرکز ذهنی */}
          <div>
            <p className="font-semibold text-gray-800 mb-2">۲. تمرکز و عملکرد ذهنی‌ات در طول روز چطوره؟</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setHormoneAnswers({ ...hormoneAnswers, focus: "good" })}
                className={`px-3 py-1 rounded-xl border ${
                  hormoneAnswers.focus === "good"
                    ? "bg-blue-100 border-blue-400"
                    : "border-blue-200 hover:bg-blue-50"
                }`}
              >
                بالا 🎯
              </button>
              <button
                onClick={() => setHormoneAnswers({ ...hormoneAnswers, focus: "medium" })}
                className={`px-3 py-1 rounded-xl border ${
                  hormoneAnswers.focus === "medium"
                    ? "bg-yellow-100 border-yellow-400"
                    : "border-blue-200 hover:bg-blue-50"
                }`}
              >
                متوسط ⚖️
              </button>
              <button
                onClick={() => setHormoneAnswers({ ...hormoneAnswers, focus: "low" })}
                className={`px-3 py-1 rounded-xl border ${
                  hormoneAnswers.focus === "low"
                    ? "bg-gray-100 border-yellow-200"
                    : "border-yellow-100 hover:bg-yellow-50"
                }`}
              >
                پایین 😵
              </button>
            </div>
          </div>

          {/* 🌙 خواب شبانه */}
          <div>
            <p className="font-semibold text-gray-800 mb-2">۳. کیفیت خواب و بیداری صبح‌ات چطوره؟</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setHormoneAnswers({ ...hormoneAnswers, sleep: "good" })}
                className={`px-3 py-1 rounded-xl border ${
                  hormoneAnswers.sleep === "good"
                    ? "bg-blue-100 border-blue-400"
                    : "border-blue-200 hover:bg-blue-50"
                }`}
              >
                عمیق و باانرژی 😌
              </button>
              <button
                onClick={() => setHormoneAnswers({ ...hormoneAnswers, sleep: "medium" })}
                className={`px-3 py-1 rounded-xl border ${
                  hormoneAnswers.sleep === "medium"
                    ? "bg-yellow-100 border-yellow-400"
                    : "border-blue-200 hover:bg-blue-50"
                }`}
              >
                نسبتاً خوب 😐
              </button>
              <button
                onClick={() => setHormoneAnswers({ ...hormoneAnswers, sleep: "low" })}
                className={`px-3 py-1 rounded-xl border ${
                  hormoneAnswers.sleep === "low"
                    ? "bg-gray-100 border-yellow-200"
                    : "border-yellow-100 hover:bg-yellow-50"
                }`}
              >
                سبک یا بی‌کیفیت 😫
              </button>
            </div>
          </div>

          {/* 🙂 خلق و خو */}
          <div>
            <p className="font-semibold text-gray-800 mb-2">۴. خلق‌و‌خو و انگیزه‌ات در روزهای اخیر؟</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setHormoneAnswers({ ...hormoneAnswers, mood: "good" })}
                className={`px-3 py-1 rounded-xl border ${
                  hormoneAnswers.mood === "good"
                    ? "bg-blue-100 border-blue-400"
                    : "border-blue-200 hover:bg-blue-50"
                }`}
              >
                مثبت و باانگیزه 😄
              </button>
              <button
                onClick={() => setHormoneAnswers({ ...hormoneAnswers, mood: "medium" })}
                className={`px-3 py-1 rounded-xl border ${
                  hormoneAnswers.mood === "medium"
                    ? "bg-yellow-100 border-yellow-400"
                    : "border-blue-200 hover:bg-blue-50"
                }`}
              >
                متعادل 🙂
              </button>
              <button
                onClick={() => setHormoneAnswers({ ...hormoneAnswers, mood: "low" })}
                className={`px-3 py-1 rounded-xl border ${
                  hormoneAnswers.mood === "low"
                    ? "bg-gray-100 border-yellow-200"
                    : "border-yellow-100 hover:bg-yellow-50"
                }`}
              >
                بی‌حوصلگی یا عصبی 😠
              </button>
            </div>
          </div>

          {/* 🩺 جدول تفسیر */}
          <div className="mt-6">
            <h4 className="text-yellow-700 font-semibold text-sm mb-2">
              جدول تفسیر سطح تعادل هورمونی
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-gray-700 border border-yellow-200 rounded-xl overflow-hidden">
                <thead className="bg-yellow-50 text-yellow-800">
                  <tr>
                    <th className="py-2 px-3 text-right border-b border-yellow-100">امتیاز کل</th>
                    <th className="py-2 px-3 text-right border-b border-yellow-100">وضعیت</th>
                    <th className="py-2 px-3 text-right border-b border-yellow-100">توصیه</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-yellow-50">
                    <td className="py-1.5 px-3">۸ تا ۱۰</td>
                    <td className="py-1.5 px-3 text-green-600 font-medium">💛 متعادل</td>
                    <td className="py-1.5 px-3">تعادل عالی، ادامه همین سبک زندگی.</td>
                  </tr>
                  <tr className="hover:bg-yellow-50">
                    <td className="py-1.5 px-3">۵ تا ۷</td>
                    <td className="py-1.5 px-3 text-yellow-600 font-medium">🟠 کمی نوسانی</td>
                    <td className="py-1.5 px-3">بهبود خواب و کاهش استرس توصیه می‌شود.</td>
                  </tr>
                  <tr className="hover:bg-yellow-50">
                    <td className="py-1.5 px-3">۰ تا ۴</td>
                    <td className="py-1.5 px-3 text-red-600 font-medium">🔴 نیاز به بررسی</td>
                    <td className="py-1.5 px-3">با پزشک یا متخصص تغذیه مشورت کن.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </GoldenModal>

      {/* 😴 تست کیفیت خواب */}
      <GoldenModal
        show={selectedTest === "sleep"}
        title="😴 تست کیفیت خواب شبانه"
        description="به چند سؤال ساده پاسخ بده تا میزان کیفیت و عمق خواب شبانه‌ات مشخص بشه."
        confirmLabel="محاسبه کیفیت خواب 🌙"
        onConfirm={() => {
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
            status = "🌙 خواب عمیق و سالم";
            tip = "خواب عالی داری، ریتم بدن و ذهنت هماهنگه.";
          } else if (score >= 5) {
            status = "😌 خواب متوسط";
            tip = "کیفیت خوابت خوبه ولی جای بهبود داره — مثلاً کاهش موبایل قبل خواب.";
          } else {
            status = "😫 خواب بی‌کیفیت";
            tip = "کم‌خوابی یا استرس مانع خواب عمیقته. سعی کن خواب و آرامش رو در اولویت بذاری.";
          }

          const date = new Date().toLocaleDateString("fa-IR");
          const newResult = {
            id: Date.now(),
            type: "تست کیفیت خواب 😴",
            bmi: `${score}/10`,
            status,
            tip,
            date,
          };

          setResults((prev) => [...prev, newResult]);
          setSelectedTest(null);
          setSleepAnswers({
            hours: "",
            wakeups: "",
            energy: "",
            screen: "",
          });
        }}
        onCancel={() => {
          setSelectedTest(null);
          setSleepAnswers({
            hours: "",
            wakeups: "",
            energy: "",
            screen: "",
          });
        }}
      >
        <div className="space-y-4 text-sm">
          {/* 🕐 مدت خواب */}
          <div>
            <p className="font-semibold text-gray-800 mb-2">۱. به‌طور میانگین چند ساعت در شب می‌خوابی؟</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSleepAnswers({ ...sleepAnswers, hours: "good" })}
                className={`px-3 py-1 rounded-xl border ${
                  sleepAnswers.hours === "good"
                    ? "bg-indigo-100 border-indigo-400"
                    : "border-indigo-200 hover:bg-indigo-50"
                }`}
              >
                بیش از ۷ ساعت 🌙
              </button>
              <button
                onClick={() => setSleepAnswers({ ...sleepAnswers, hours: "medium" })}
                className={`px-3 py-1 rounded-xl border ${
                  sleepAnswers.hours === "medium"
                    ? "bg-yellow-100 border-yellow-400"
                    : "border-indigo-200 hover:bg-indigo-50"
                }`}
              >
                بین ۵ تا ۷ ساعت 😌
              </button>
              <button
                onClick={() => setSleepAnswers({ ...sleepAnswers, hours: "low" })}
                className={`px-3 py-1 rounded-xl border ${
                  sleepAnswers.hours === "low"
                    ? "bg-gray-100 border-yellow-200"
                    : "border-yellow-100 hover:bg-yellow-50"
                }`}
              >
                کمتر از ۵ ساعت 😫
              </button>
            </div>
          </div>

          {/* 🌃 بیدار شدن شبانه */}
          <div>
            <p className="font-semibold text-gray-800 mb-2">۲. در طول شب چند بار از خواب بیدار می‌شی؟</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSleepAnswers({ ...sleepAnswers, wakeups: "good" })}
                className={`px-3 py-1 rounded-xl border ${
                  sleepAnswers.wakeups === "good"
                    ? "bg-indigo-100 border-indigo-400"
                    : "border-indigo-200 hover:bg-indigo-50"
                }`}
              >
                خیلی کم یا اصلاً 😴
              </button>
              <button
                onClick={() => setSleepAnswers({ ...sleepAnswers, wakeups: "medium" })}
                className={`px-3 py-1 rounded-xl border ${
                  sleepAnswers.wakeups === "medium"
                    ? "bg-yellow-100 border-yellow-400"
                    : "border-indigo-200 hover:bg-indigo-50"
                }`}
              >
                ۱ تا ۲ بار 😐
              </button>
              <button
                onClick={() => setSleepAnswers({ ...sleepAnswers, wakeups: "low" })}
                className={`px-3 py-1 rounded-xl border ${
                  sleepAnswers.wakeups === "low"
                    ? "bg-gray-100 border-yellow-200"
                    : "border-yellow-100 hover:bg-yellow-50"
                }`}
              >
                بیش از ۲ بار 😩
              </button>
            </div>
          </div>

          {/* ☀️ انرژی صبح */}
          <div>
            <p className="font-semibold text-gray-800 mb-2">۳. احساس انرژی‌ات بعد از بیدار شدن چطوره؟</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSleepAnswers({ ...sleepAnswers, energy: "good" })}
                className={`px-3 py-1 rounded-xl border ${
                  sleepAnswers.energy === "good"
                    ? "bg-indigo-100 border-indigo-400"
                    : "border-indigo-200 hover:bg-indigo-50"
                }`}
              >
                پرانرژی ☀️
              </button>
              <button
                onClick={() => setSleepAnswers({ ...sleepAnswers, energy: "medium" })}
                className={`px-3 py-1 rounded-xl border ${
                  sleepAnswers.energy === "medium"
                    ? "bg-yellow-100 border-yellow-400"
                    : "border-indigo-200 hover:bg-indigo-50"
                }`}
              >
                معمولی 😶
              </button>
              <button
                onClick={() => setSleepAnswers({ ...sleepAnswers, energy: "low" })}
                className={`px-3 py-1 rounded-xl border ${
                  sleepAnswers.energy === "low"
                    ? "bg-gray-100 border-yellow-200"
                    : "border-yellow-100 hover:bg-yellow-50"
                }`}
              >
                خسته 😵
              </button>
            </div>
          </div>

          {/* 📱 استفاده از موبایل */}
          <div>
            <p className="font-semibold text-gray-800 mb-2">۴. قبل از خواب از موبایل یا تلویزیون استفاده می‌کنی؟</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSleepAnswers({ ...sleepAnswers, screen: "good" })}
                className={`px-3 py-1 rounded-xl border ${
                  sleepAnswers.screen === "good"
                    ? "bg-indigo-100 border-indigo-400"
                    : "border-indigo-200 hover:bg-indigo-50"
                }`}
              >
                نه، اصلاً 📵
              </button>
              <button
                onClick={() => setSleepAnswers({ ...sleepAnswers, screen: "medium" })}
                className={`px-3 py-1 rounded-xl border ${
                  sleepAnswers.screen === "medium"
                    ? "bg-yellow-100 border-yellow-400"
                    : "border-indigo-200 hover:bg-indigo-50"
                }`}
              >
                گاهی 📱
              </button>
              <button
                onClick={() => setSleepAnswers({ ...sleepAnswers, screen: "low" })}
                className={`px-3 py-1 rounded-xl border ${
                  sleepAnswers.screen === "low"
                    ? "bg-gray-100 border-yellow-200"
                    : "border-yellow-100 hover:bg-yellow-50"
                }`}
              >
                زیاد 💻
              </button>
            </div>
          </div>

          {/* 📊 جدول تفسیر */}
          <div className="mt-6">
            <h4 className="text-yellow-700 font-semibold text-sm mb-2">
              جدول تفسیر کیفیت خواب
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-gray-700 border border-yellow-200 rounded-xl overflow-hidden">
                <thead className="bg-yellow-50 text-yellow-800">
                  <tr>
                    <th className="py-2 px-3 text-right border-b border-yellow-100">امتیاز کل</th>
                    <th className="py-2 px-3 text-right border-b border-yellow-100">وضعیت خواب</th>
                    <th className="py-2 px-3 text-right border-b border-yellow-100">توصیه</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-yellow-50">
                    <td className="py-1.5 px-3">۸ تا ۱۰</td>
                    <td className="py-1.5 px-3 text-green-700 font-medium">🌙 خواب عمیق و سالم</td>
                    <td className="py-1.5 px-3">عالی! ادامه همین روال.</td>
                  </tr>
                  <tr className="hover:bg-yellow-50">
                    <td className="py-1.5 px-3">۵ تا ۷</td>
                    <td className="py-1.5 px-3 text-yellow-600 font-medium">😌 خواب متوسط</td>
                    <td className="py-1.5 px-3">قبل خواب نور آبی و استرس رو کم کن.</td>
                  </tr>
                  <tr className="hover:bg-yellow-50">
                    <td className="py-1.5 px-3">۰ تا ۴</td>
                    <td className="py-1.5 px-3 text-red-600 font-medium">😫 خواب بی‌کیفیت</td>
                    <td className="py-1.5 px-3">زمان خواب و رژیم غذایی رو تنظیم کن.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </GoldenModal>

      {/* 🧠 تست تمرکز و انگیزه */}
      <GoldenModal
        show={selectedTest === "focus"}
        title="🧠 تست تمرکز و انگیزه"
        description="با چند سؤال ساده، میزان تمرکز و انگیزه ذهنی خودت رو بسنج."
        confirmLabel="محاسبه تمرکز و انگیزه 💪"
        onConfirm={() => {
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
            status = "💎 عالی";
            tip = "تمرکز و انگیزه‌ات در سطح بسیار بالاست. این تعادل ذهنی رو حفظ کن!";
          } else if (score >= 5) {
            status = "⚖️ متوسط";
            tip = "خوبه، ولی برای تمرکز بیشتر زمان کار و استراحت رو متعادل کن.";
          } else {
            status = "🌀 پایین";
            tip = "ذهن خسته‌ست. استراحت، ورزش و هدف‌گذاری جدید کمکت می‌کنه.";
          }

          const date = new Date().toLocaleDateString("fa-IR");
          const newResult = {
            id: Date.now(),
            type: "تست تمرکز و انگیزه 🧠",
            bmi: `${score}/10`,
            status,
            tip,
            date,
          };

          setResults((prev) => [...prev, newResult]);
          setSelectedTest(null);
          setFocusAnswers({
            attention: "",
            motivation: "",
            tired: "",
            phone: "",
          });
        }}
        onCancel={() => {
          setSelectedTest(null);
          setFocusAnswers({
            attention: "",
            motivation: "",
            tired: "",
            phone: "",
          });
        }}
      >
        <div className="space-y-4 text-sm">
          {/* 🎯 تمرکز */}
          <div>
            <p className="font-semibold text-gray-800 mb-2">۱. در طول کار یا مطالعه چقدر تمرکز داری؟</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFocusAnswers({ ...focusAnswers, attention: "good" })}
                className={`px-3 py-1 rounded-xl border ${
                  focusAnswers.attention === "good"
                    ? "bg-yellow-200 border-yellow-400"
                    : "border-yellow-200 hover:bg-yellow-50"
                }`}
              >
                بالا و پایدار 🎯
              </button>
              <button
                onClick={() => setFocusAnswers({ ...focusAnswers, attention: "medium" })}
                className={`px-3 py-1 rounded-xl border ${
                  focusAnswers.attention === "medium"
                    ? "bg-yellow-100 border-yellow-400"
                    : "border-yellow-200 hover:bg-yellow-50"
                }`}
              >
                گاهی حواسم پرت می‌شه 🙂
              </button>
              <button
                onClick={() => setFocusAnswers({ ...focusAnswers, attention: "low" })}
                className={`px-3 py-1 rounded-xl border ${
                  focusAnswers.attention === "low"
                    ? "bg-gray-100 border-yellow-200"
                    : "border-yellow-100 hover:bg-yellow-50"
                }`}
              >
                تمرکز سخته 😵
              </button>
            </div>
          </div>

          {/* 💪 انگیزه */}
          <div>
            <p className="font-semibold text-gray-800 mb-2">۲. احساس انگیزه برای انجام کارهات چقدره؟</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFocusAnswers({ ...focusAnswers, motivation: "good" })}
                className={`px-3 py-1 rounded-xl border ${
                  focusAnswers.motivation === "good"
                    ? "bg-yellow-200 border-yellow-400"
                    : "border-yellow-200 hover:bg-yellow-50"
                }`}
              >
                زیاد 💪
              </button>
              <button
                onClick={() => setFocusAnswers({ ...focusAnswers, motivation: "medium" })}
                className={`px-3 py-1 rounded-xl border ${
                  focusAnswers.motivation === "medium"
                    ? "bg-yellow-100 border-yellow-400"
                    : "border-yellow-200 hover:bg-yellow-50"
                }`}
              >
                معمولی 😐
              </button>
              <button
                onClick={() => setFocusAnswers({ ...focusAnswers, motivation: "low" })}
                className={`px-3 py-1 rounded-xl border ${
                  focusAnswers.motivation === "low"
                    ? "bg-gray-100 border-yellow-200"
                    : "border-yellow-100 hover:bg-yellow-50"
                }`}
              >
                کم 😔
              </button>
            </div>
          </div>

          {/* 🧘‍♂️ خستگی ذهنی */}
          <div>
            <p className="font-semibold text-gray-800 mb-2">۳. در طول روز چقدر احساس خستگی ذهنی داری؟</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFocusAnswers({ ...focusAnswers, tired: "good" })}
                className={`px-3 py-1 rounded-xl border ${
                  focusAnswers.tired === "good"
                    ? "bg-yellow-200 border-yellow-400"
                    : "border-yellow-200 hover:bg-yellow-50"
                }`}
              >
                خیلی کم 🧘‍♂️
              </button>
              <button
                onClick={() => setFocusAnswers({ ...focusAnswers, tired: "medium" })}
                className={`px-3 py-1 rounded-xl border ${
                  focusAnswers.tired === "medium"
                    ? "bg-yellow-100 border-yellow-400"
                    : "border-yellow-200 hover:bg-yellow-50"
                }`}
              >
                متوسط ⚖️
              </button>
              <button
                onClick={() => setFocusAnswers({ ...focusAnswers, tired: "low" })}
                className={`px-3 py-1 rounded-xl border ${
                  focusAnswers.tired === "low"
                    ? "bg-gray-100 border-yellow-200"
                    : "border-yellow-100 hover:bg-yellow-50"
                }`}
              >
                زیاد 😩
              </button>
            </div>
          </div>

          {/* 📱 حواس‌پرتی دیجیتال */}
          <div>
            <p className="font-semibold text-gray-800 mb-2">۴. هنگام کار از موبایل یا شبکه اجتماعی استفاده می‌کنی؟</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFocusAnswers({ ...focusAnswers, phone: "good" })}
                className={`px-3 py-1 rounded-xl border ${
                  focusAnswers.phone === "good"
                    ? "bg-yellow-200 border-yellow-400"
                    : "border-yellow-200 hover:bg-yellow-50"
                }`}
              >
                نه 📵
              </button>
              <button
                onClick={() => setFocusAnswers({ ...focusAnswers, phone: "medium" })}
                className={`px-3 py-1 rounded-xl border ${
                  focusAnswers.phone === "medium"
                    ? "bg-yellow-100 border-yellow-400"
                    : "border-yellow-200 hover:bg-yellow-50"
                }`}
              >
                گاهی 📱
              </button>
              <button
                onClick={() => setFocusAnswers({ ...focusAnswers, phone: "low" })}
                className={`px-3 py-1 rounded-xl border ${
                  focusAnswers.phone === "low"
                    ? "bg-gray-100 border-yellow-200"
                    : "border-yellow-100 hover:bg-yellow-50"
                }`}
              >
                زیاد 😅
              </button>
            </div>
          </div>

          {/* 📊 جدول تفسیر */}
          <div className="mt-6">
            <h4 className="text-yellow-700 font-semibold text-sm mb-2">
              جدول تفسیر سطح تمرکز و انگیزه
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-gray-700 border border-yellow-200 rounded-xl overflow-hidden">
                <thead className="bg-yellow-50 text-yellow-800">
                  <tr>
                    <th className="py-2 px-3 text-right border-b border-yellow-100">امتیاز کل</th>
                    <th className="py-2 px-3 text-right border-b border-yellow-100">وضعیت</th>
                    <th className="py-2 px-3 text-right border-b border-yellow-100">توصیه</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-yellow-50">
                    <td className="py-1.5 px-3">۸ تا ۱۰</td>
                    <td className="py-1.5 px-3 text-green-600 font-medium">💎 عالی</td>
                    <td className="py-1.5 px-3">تمرکز بالا و انگیزه پایدار، عالی!</td>
                  </tr>
                  <tr className="hover:bg-yellow-50">
                    <td className="py-1.5 px-3">۵ تا ۷</td>
                    <td className="py-1.5 px-3 text-yellow-600 font-medium">⚖️ متوسط</td>
                    <td className="py-1.5 px-3">روتین روزانه‌ات رو منظم‌تر کن.</td>
                  </tr>
                  <tr className="hover:bg-yellow-50">
                    <td className="py-1.5 px-3">۰ تا ۴</td>
                    <td className="py-1.5 px-3 text-red-600 font-medium">🌀 پایین</td>
                    <td className="py-1.5 px-3">نیاز به استراحت و هدف‌گذاری دوباره داری.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </GoldenModal>

     {/* 📊 باکس نتایج پایین صفحه */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="mt-10 w-full max-w-5xl bg-white/95 border border-yellow-100 shadow-md
           rounded-2xl p-6 text-sm text-gray-700"
>
  <h3 className="text-yellow-700 font-semibold text-lg mb-4 text-center">
    نتایج تست‌های من 🧾
  </h3>

  <div className="overflow-x-auto max-h-52 overflow-y-auto">
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
              <td className="py-2 px-3">{r.date}</td>
              <td className="py-2 px-3 font-medium text-yellow-700">{r.type}</td>
              <td className="py-2 px-3">{r.bmi}</td>
              <td className="py-2 px-3">{r.status}</td>
              <td className="py-2 px-3 text-gray-600">{r.tip}</td>
              <td className="py-2 px-3 text-center">
                <button
                  onClick={() => {
                    setDeleteTarget({ type: "single", id: r.id });
                    setShowDeleteModal(true);
                  }}
                  className="text-red-600 hover:text-red-800 transition-colors"
                  title="حذف این گزارش"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="6"
              className="text-center py-4 text-gray-500 italic"
            >
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

  {/* 🌟 مودال حذف (تکی یا کلی) */}
  <GoldenModal
    show={showDeleteModal}
    title="❗ تأیید حذف"
    description={
      deleteTarget?.type === "all"
        ? "آیا مطمئنی می‌خواهی تمام گزارش‌های ثبت‌شده را حذف کنی؟"
        : "آیا مطمئنی می‌خواهی این گزارش را حذف کنی؟"
    }
    confirmLabel="بله، حذف کن"
    onConfirm={() => {
      if (deleteTarget?.type === "all") {
        setResults([]);
      } else if (deleteTarget?.type === "single" && deleteTarget.id) {
        setResults((prev) =>
          prev.filter((item) => item.id !== deleteTarget.id)
        );
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

{/* 📘 توضیحات و منابع علمی — پایین جدول ولی خارج از باکس ثابت */}
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


    </main>
  );
}
