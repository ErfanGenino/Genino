import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Ruler, Baby, Activity, Apple, Moon, HeartPulse } from "lucide-react";
import GeninoDNABackground from "@components/Core/GeninoDNABackground";

/* 🌟 دکمه ژنینویی استاندارد */
const Btn = ({ children, className = "", ...rest }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`px-8 py-3 rounded-full font-bold text-white 
                bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 
                shadow-[0_0_20px_rgba(255,215,0,0.4)] ${className}`}
    {...rest}
  >
    {children}
  </motion.button>
);

export default function BodyMetricsCheck() {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);

  const growthStandards = {
    2: { weight: [10, 14], height: [83, 92] },
    3: { weight: [12, 17], height: [91, 100] },
    4: { weight: [13, 19], height: [98, 108] },
    5: { weight: [15, 22], height: [104, 115] },
    6: { weight: [17, 25], height: [110, 121] },
    7: { weight: [19, 28], height: [115, 128] },
    8: { weight: [21, 32], height: [121, 134] },
    9: { weight: [23, 37], height: [126, 140] },
    10: { weight: [25, 42], height: [132, 146] },
  };

  const handleAnalyze = () => {
    if (!age || !height || !weight) return;
    const h = height / 100;
    const bmi = (weight / (h * h)).toFixed(1);

    let bmiStatus = "";
    if (age < 2) bmiStatus = "نامعتبر برای زیر دو سال";
    else if (bmi < 14) bmiStatus = "کم‌وزن";
    else if (bmi <= 17) bmiStatus = "طبیعی";
    else if (bmi <= 19) bmiStatus = "کمی اضافه وزن";
    else bmiStatus = "اضافه وزن / چاقی";

    const std = growthStandards[age] || { weight: [15, 25], height: [100, 120] };
    const [minW, maxW] = std.weight;
    const [minH, maxH] = std.height;

    let weightStatus =
      weight < minW
        ? "پایین‌تر از محدوده طبیعی"
        : weight > maxW
        ? "بالاتر از محدوده طبیعی"
        : "در محدوده طبیعی";

    let heightStatus =
      height < minH
        ? "کمتر از محدوده طبیعی"
        : height > maxH
        ? "بالاتر از محدوده طبیعی"
        : "در محدوده طبیعی";

    // 💛 پیشنهادات ژنینویی
    const tips = {
      low: [
        { icon: <Apple />, text: "غذاهای مقوی مانند تخم‌مرغ، برنج، عدس و کره‌بادام‌زمینی در وعده‌های کوچک مفید هستند." },
        { icon: <HeartPulse />, text: "بازی‌های آرام مانند طناب‌کشی یا دوچرخه‌سواری سبک برای تحریک اشتها مفید است." },
        { icon: <Moon />, text: "۹ تا ۱۱ ساعت خواب شبانه‌ی منظم برای رشد قدی و وزنی ضروری است." },
      ],
      normal: [
        { icon: <Apple />, text: "رژیم متعادل شامل میوه، سبزی، لبنیات و پروتئین سبک به حفظ تعادل کمک می‌کند." },
        { icon: <HeartPulse />, text: "حداقل یک ساعت فعالیت فیزیکی سبک مثل توپ‌بازی یا رقص کودکانه در روز پیشنهاد می‌شود." },
        { icon: <Moon />, text: "حفظ الگوی خواب منظم (۹–۱۰ ساعت شبانه) به رشد پایدار بدن کمک می‌کند." },
      ],
      high: [
        { icon: <Apple />, text: "کاهش خوراکی‌های شیرین و نوشیدنی‌های صنعتی و افزایش میوه و سبزی تازه پیشنهاد می‌شود." },
        { icon: <HeartPulse />, text: "شنا، دویدن یا پیاده‌روی خانوادگی روزانه باعث حفظ وزن سالم می‌شود." },
        { icon: <Moon />, text: "خواب کافی (۹–۱۰ ساعت شبانه) تعادل هورمونی را تقویت می‌کند و میل به خوراکی را تنظیم می‌کند." },
      ],
    };

    const tipSet =
      bmiStatus.includes("کم") || weightStatus.includes("پایین")
        ? tips.low
        : bmiStatus.includes("اضافه") || weightStatus.includes("بالاتر")
        ? tips.high
        : tips.normal;

    setResult({
      bmi,
      bmiStatus,
      weightStatus,
      heightStatus,
      level:
        bmiStatus.includes("کم") || weightStatus.includes("پایین")
          ? "نیازمند توجه"
          : bmiStatus.includes("اضافه") || weightStatus.includes("بیشتر")
          ? "قابل‌قبول"
          : "طبیعی",
      minW,
      maxW,
      minH,
      maxH,
      tips: tipSet,
    });
  };

  return (
    <GeninoDNABackground strands={10} opacity={0.25} duration={90}>
      <main dir="rtl" className="relative z-10 flex flex-col items-center px-6 py-16 text-gray-800">
        {/* 🌼 تیتر صفحه */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-extrabold text-yellow-700 mb-10 text-center drop-shadow-[0_0_12px_rgba(255,220,80,0.5)]"
        >
          پایش رشد بدنی و تغذیه کودک 💛
        </motion.h1>

        {/* 🧮 فرم ورود داده‌ها */}
        {!result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-yellow-50 via-white to-amber-50 
                       p-8 rounded-3xl shadow-[0_0_25px_rgba(255,215,0,0.3)] 
                       max-w-md w-full border border-yellow-200 text-center"
          >
            <p className="text-gray-700 mb-6 leading-relaxed">
              لطفاً اطلاعات زیر را وارد کنید تا ژنینو وضعیت رشد بدنی کودک را تحلیل کند 👇
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

            <Btn onClick={handleAnalyze}>شروع تحلیل ژنینو 🧠</Btn>
          </motion.div>
        )}

        {/* 💬 نمایش نتایج */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mt-10 bg-gradient-to-br from-yellow-50 via-white to-amber-50 
                         border border-yellow-100 rounded-3xl shadow-[0_0_30px_rgba(255,215,0,0.3)] 
                         p-8 max-w-2xl w-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <Activity className="w-7 h-7 text-yellow-600" />
                <h2 className="text-xl font-extrabold text-yellow-700">
                  تحلیل رشد بدنی ژنینو ✨
                </h2>
              </div>

              <div className="space-y-5 text-gray-700 leading-relaxed">
                <p>
                  <strong>📏 شاخص BMI:</strong> {result.bmi} —{" "}
                  <span className="font-bold text-yellow-700">{result.bmiStatus}</span>
                  <br />
                  <span className="text-sm text-gray-500">
                    محدوده‌ی طبیعی BMI برای این سن حدود <b>۱۴ تا ۱۷</b> است.
                  </span>
                </p>

                <p>
                  <strong>⚖️ وزن نسبت به سن:</strong>{" "}
                  <span className="font-bold text-yellow-700">{result.weightStatus}</span>
                  <br />
                  <span className="text-sm text-gray-500">
                    محدوده‌ی طبیعی در این سن بین{" "}
                    <b>
                      {result.minW} تا {result.maxW} کیلوگرم
                    </b>{" "}
                    است.
                  </span>
                </p>

                <p>
                  <strong>📏 قد نسبت به سن:</strong>{" "}
                  <span className="font-bold text-yellow-700">{result.heightStatus}</span>
                  <br />
                  <span className="text-sm text-gray-500">
                    محدوده‌ی طبیعی در این سن بین{" "}
                    <b>
                      {result.minH} تا {result.maxH} سانتی‌متر
                    </b>{" "}
                    است.
                  </span>
                </p>

                <p className="border-t border-yellow-100 pt-3 font-bold text-yellow-800">
                  💎 وضعیت کلی رشد: {result.level}
                </p>

                {/* 🌿 پیشنهادات ژنینویی */}
                <div className="mt-6 bg-white/70 rounded-2xl p-4 border border-yellow-100">
                  <h3 className="font-bold text-yellow-700 mb-3 flex items-center gap-2">
                    <HeartPulse className="w-5 h-5 text-yellow-600" />
                    پیشنهادات ژنینو برای رشد سالم‌تر 🌿
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {result.tips.map((t, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-yellow-500 mt-0.5">{t.icon}</span>
                        <span>{t.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Btn onClick={() => setResult(null)}>🔄 انجام دوباره تحلیل</Btn>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </GeninoDNABackground>
  );
}
