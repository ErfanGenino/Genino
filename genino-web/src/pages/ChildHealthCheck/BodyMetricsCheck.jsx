import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Activity } from "lucide-react";
import GeninoDNABackground from "../../components/GeninoDNABackground";

export default function BodyMetricsCheck() {
  const navigate = useNavigate();
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);

  const calculateBMI = () => {
    if (!height || !weight) return;
    const h = height / 100;
    const bmi = (weight / (h * h)).toFixed(1);
    let analysis = "";
    if (age < 2) {
      analysis = "برای کودکان زیر دو سال از BMI استفاده نمی‌شود؛ رشد باید با نمودارهای قد و وزن سنجیده شود.";
    } else if (bmi < 14) {
      analysis = "کودک دچار کم‌وزنی است. تغذیه مناسب و بررسی رشد توسط پزشک پیشنهاد می‌شود.";
    } else if (bmi >= 14 && bmi <= 17) {
      analysis = "شاخص توده بدنی کودک طبیعی است. الگوی رشد سالم دارد.";
    } else if (bmi > 17 && bmi <= 19) {
      analysis = "کمی اضافه وزن مشاهده می‌شود. بهتر است فعالیت بدنی کودک بررسی شود.";
    } else {
      analysis = "کودک در محدوده اضافه وزن یا چاقی قرار دارد. مشورت با پزشک و تنظیم برنامه تغذیه توصیه می‌شود.";
    }

    setResult({ bmi, analysis });
  };

  return (
    <GeninoDNABackground strands={10} opacity={0.25} duration={90}>
      <main
        dir="rtl"
        className="relative z-10 flex flex-col items-center px-6 py-16 text-gray-800"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-extrabold text-yellow-700 mb-10 text-center drop-shadow-[0_0_12px_rgba(255,220,80,0.5)]"
        >
          پایش قد، وزن و شاخص توده بدنی (BMI) 
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-yellow-50 via-white to-amber-50 p-8 rounded-3xl shadow-[0_0_25px_rgba(255,220,80,0.3)] max-w-md w-full border border-yellow-200 text-center"
        >
          <p className="text-gray-700 mb-6 leading-relaxed">
            لطفاً اطلاعات زیر را وارد کنید تا ژنینو شاخص توده بدنی (BMI) کودک شما را محاسبه و تحلیل کند 👇
          </p>

          <div className="flex flex-col gap-4 mb-6 text-right">
            <label className="font-semibold text-gray-700">
              سن کودک (سال):
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full mt-1 p-2 rounded-xl border border-yellow-300 focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </label>

            <label className="font-semibold text-gray-700">
              قد (سانتی‌متر):
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full mt-1 p-2 rounded-xl border border-yellow-300 focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </label>

            <label className="font-semibold text-gray-700">
              وزن (کیلوگرم):
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full mt-1 p-2 rounded-xl border border-yellow-300 focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </label>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={calculateBMI}
            className="px-10 py-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 text-white 
                       font-bold rounded-full shadow-[0_0_25px_rgba(255,220,100,0.6)]"
          >
            محاسبه شاخص BMI
          </motion.button>

          {result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 bg-white rounded-2xl border border-yellow-100 shadow-md p-6 text-center"
            >
              <Activity className="w-12 h-12 text-yellow-600 mx-auto mb-2" />
              <h2 className="text-xl font-bold text-yellow-700 mb-2">
                شاخص BMI کودک: {result.bmi}
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {result.analysis}
              </p>
            </motion.div>
          )}
        </motion.div>

        {result && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              navigate("/child-health-check/bmi-report", {
                state: {
                  report: {
                    name: "حنا سمواتی",
                    date: new Date().toLocaleDateString("fa-IR"),
                    bmi: result.bmi,
                    analysis: result.analysis,
                  },
                },
              })
            }
            className="mt-8 px-8 py-3 bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-700 
                       text-white font-bold rounded-full shadow-[0_0_25px_rgba(255,200,80,0.5)]"
          >
            مشاهده گزارش رسمی ژنینو 🧾
          </motion.button>
        )}
      </main>
    </GeninoDNABackground>
  );
}

