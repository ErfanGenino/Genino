// src/pages/MyMenHealth.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Brain, Flame, Pill, Moon, Scale, X, Accessibility } from "lucide-react";
import GoldenModal from "../components/GoldenModal";
import { FaT } from "react-icons/fa6";

export default function MyMenHealth() {
  const [selectedTest, setSelectedTest] = useState(null);
  const [bmiResult, setBmiResult] = useState(null);
  const [form, setForm] = useState({ height: "", weight: "" });

  // 🧮 محاسبه BMI
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

  setBmiResult({ bmi, status, tip });
  setSelectedTest(null); // 🔹 بستن مودال بعد از محاسبه
};

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

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#fffdf7] to-[#fff9e8] flex flex-col items-center px-6 py-10 text-gray-800"
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

      {/* 🌕 مودال BMI */}
      <GoldenModal
        show={selectedTest === "bmi"}
        title="⚖️ محاسبه BMI و ترکیب بدن"
        description="وزن و قد خود را وارد کنید تا شاخص توده بدنی شما محاسبه شود."
        confirmLabel="محاسبه"
        onConfirm={handleBmiCalculate}
        onCancel={() => {
          setSelectedTest(null);
          setBmiResult(null);
          setForm({ height: "", weight: "" });
        }}
      >
        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1 text-gray-700">قد (سانتی‌متر):</label>
            <input
              type="number"
              value={form.height}
              onChange={(e) => setForm({ ...form, height: e.target.value })}
              className="border border-yellow-200 rounded-xl w-full p-2 focus:ring-2 focus:ring-yellow-300 outline-none text-right"
              placeholder="مثلاً ۱۸۰"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-700">وزن (کیلوگرم):</label>
            <input
              type="number"
              value={form.weight}
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
              className="border border-yellow-200 rounded-xl w-full p-2 focus:ring-2 focus:ring-yellow-300 outline-none text-right"
              placeholder="مثلاً ۸۵"
            />
          </div>

          {bmiResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 bg-yellow-50 border border-yellow-100 rounded-xl p-4 text-sm text-gray-700"
            >
              <p className="font-semibold text-yellow-700 mb-1">
                BMI شما: {bmiResult.bmi} ({bmiResult.status})
              </p>
              <p>{bmiResult.tip}</p>
            </motion.div>
          )}
        </div>
      </GoldenModal>

      {/* 🔜 مودال‌های بعدی (در آینده فعال می‌شن) */}
      <GoldenModal
        show={
          selectedTest &&
          ["heart", "metabolism", "hormone", "sleep", "focus"].includes(selectedTest)
        }
        title="در حال توسعه 🧩"
        description="این تست‌ها به‌زودی فعال می‌شوند و بر اساس داده‌های علمی شخصی‌سازی خواهند شد."
        confirmLabel="باشه"
        onConfirm={() => setSelectedTest(null)}
        onCancel={() => setSelectedTest(null)}
      >
        <p className="text-sm text-gray-600">
          به‌زودی می‌تونی با چند پرسش ساده، وضعیت سلامت خودت رو دقیق‌تر بسنجی 💛
        </p>
      </GoldenModal>

      {/* 📊 جدول نتایج تست‌ها */}
{bmiResult && (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="mt-12 bg-white/90 border border-yellow-100 rounded-2xl shadow-md p-6 max-w-4xl w-full"
  >
    <h3 className="text-yellow-700 font-semibold text-lg mb-4 text-center">
      نتایج تست‌های من 🧾
    </h3>

    <div className="overflow-x-auto">
      <table className="w-full text-sm text-gray-700 border-collapse">
        <thead>
          <tr className="bg-yellow-50 text-gray-800 border-b border-yellow-100">
            <th className="py-2 px-3 text-right">🧩 نوع تست</th>
            <th className="py-2 px-3 text-right">📈 نتیجه</th>
            <th className="py-2 px-3 text-right">📋 وضعیت</th>
            <th className="py-2 px-3 text-right">💡 توصیه</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-yellow-50 hover:bg-yellow-50 transition">
            <td className="py-2 px-3 font-medium text-yellow-700">
              تست BMI و ترکیب بدن
            </td>
            <td className="py-2 px-3">{bmiResult.bmi}</td>
            <td className="py-2 px-3">{bmiResult.status}</td>
            <td className="py-2 px-3 text-gray-600">{bmiResult.tip}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </motion.div>
)}

    </main>
  );
}
