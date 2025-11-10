// 📄 src/pages/ChildHealthCheck/BodyMetricsCheck.jsx
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GeninoDNABackground from "@components/Core/GeninoDNABackground";
import { Scale, Baby, Ruler, Activity, AlertCircle } from "lucide-react";

/* 🎨 دکمه استاندارد ژنینو */
const Btn = ({ children, className = "", ...rest }) => (
  <motion.button
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.96 }}
    className={`px-8 py-3 rounded-full font-bold text-white 
                bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 
                shadow-[0_0_20px_rgba(255,215,0,0.4)] ${className}`}
    {...rest}
  >
    {children}
  </motion.button>
);

/* ✅ ProgressBar */
function ProgressBar({ step }) {
  const stages = ["BMI", "وزن به سن", "قد به سن"];
  const percent = ((step + 1) / 3) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto mb-8 text-center">
      <div className="flex justify-between text-xs sm:text-sm font-semibold text-yellow-700 mb-1">
        {stages.map((label, i) => (
          <span key={i} className={i <= step ? "text-yellow-800" : "text-yellow-400"}>
            {`مرحله ${i + 1}`} — {label}
          </span>
        ))}
      </div>
      <div className="relative w-full h-3 bg-yellow-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-full"
        ></motion.div>
      </div>
      <p className="text-xs text-yellow-600 mt-2">{Math.round(percent)}٪ تکمیل شده</p>
    </div>
  );
}

/* 🧩 کارت سؤال ژنینو */
function QuestionCard({ icon, title, goal, reason, advice, children }) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <motion.div
      layout
      className="bg-white rounded-2xl border border-yellow-100 shadow-sm p-5 mb-5"
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-yellow-50 text-yellow-600 border border-yellow-200">
            {icon}
          </div>
          <h4 className="font-bold text-yellow-800">{title}</h4>
        </div>
        <button
          onClick={() => setShowInfo((s) => !s)}
          className="flex items-center gap-1 text-yellow-700 text-sm"
        >
          <AlertCircle className="w-5 h-5" />
          <span className="hidden sm:inline">چرا این سؤال؟</span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="mt-3 text-sm text-gray-700 bg-yellow-50 border border-yellow-100 rounded-xl p-3 leading-relaxed"
          >
            <p><strong>🎯 هدف:</strong> {goal}</p>
            <p className="mt-1"><strong>🧬 دلیل علمی:</strong> {reason}</p>
            <p className="mt-1"><strong>💡 راهکار ژنینو:</strong> {advice}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4">{children}</div>
    </motion.div>
  );
}

/* ——————————————————————————————————
   ✅ مرحله ۱: BMI بر اساس قد و وزن
—————————————————————————————————— */
function BMIStep({ onDone }) {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);

  const calcBMI = () => {
    if (!height || !weight) return;
    const h = height / 100;
    const bmi = (weight / (h * h)).toFixed(1);
    let status = "";
    if (age < 2) status = "نامعتبر برای زیر دو سال";
    else if (bmi < 14) status = "کم‌وزن";
    else if (bmi <= 17) status = "طبیعی";
    else if (bmi <= 19) status = "کمی اضافه وزن";
    else status = "اضافه وزن / چاقی";

    setResult({ bmi, status });
  };

  return (
    <section className="w-full max-w-3xl mx-auto">
      <QuestionCard
        icon={<Scale className="w-5 h-5" />}
        title="محاسبه شاخص BMI کودک"
        goal="بررسی تناسب وزن با قد بر اساس سن."
        reason="BMI شاخصی از وضعیت تغذیه و سلامت عمومی بدن است."
        advice="در صورت خارج بودن از محدوده، مشورت با پزشک کودکان ضروری است."
      >
        <div className="grid gap-3">
          <input
            type="number"
            placeholder="سن (سال)"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="p-2 rounded-xl border border-yellow-300 focus:ring-2 focus:ring-yellow-400 outline-none"
          />
          <input
            type="number"
            placeholder="قد (سانتی‌متر)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="p-2 rounded-xl border border-yellow-300 focus:ring-2 focus:ring-yellow-400 outline-none"
          />
          <input
            type="number"
            placeholder="وزن (کیلوگرم)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="p-2 rounded-xl border border-yellow-300 focus:ring-2 focus:ring-yellow-400 outline-none"
          />
          <Btn onClick={calcBMI}>محاسبه شاخص BMI</Btn>

          {result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center mt-4"
            >
              <h4 className="text-yellow-700 font-bold text-lg">
                BMI: {result.bmi} — {result.status}
              </h4>
            </motion.div>
          )}
        </div>
      </QuestionCard>

      {result && <Btn className="mt-6" onClick={() => onDone(result)}>ادامه</Btn>}
    </section>
  );
}

/* ——————————————————————————————————
   ✅ مرحله ۲: وزن به سن
—————————————————————————————————— */
function WeightStep({ onDone }) {
  const [status, setStatus] = useState(null);
  const options = [
    { label: "پایین‌تر از میانگین", value: "کمبود رشد" },
    { label: "متناسب با سن", value: "طبیعی" },
    { label: "بالاتر از میانگین", value: "احتمال اضافه وزن" },
  ];

  return (
    <section className="w-full max-w-3xl mx-auto">
      <QuestionCard
        icon={<Baby className="w-5 h-5" />}
        title="وضعیت وزن نسبت به سن"
        goal="بررسی تناسب وزن کودک با میانگین هم‌سن‌ها."
        reason="وزن کمتر یا بیشتر از حد معمول ممکن است نشانه کم‌تغذیه یا اضافه وزن باشد."
        advice="اگر تفاوت زیاد است، بهتر است نمودار رشد توسط پزشک ارزیابی شود."
      >
        <div className="flex flex-col sm:flex-row gap-3">
          {options.map((o) => (
            <button
              key={o.value}
              onClick={() => setStatus(o.value)}
              className={`flex-1 border rounded-full py-2 font-semibold transition-all ${
                status === o.value
                  ? "bg-yellow-300 border-yellow-400 text-yellow-900 shadow-inner"
                  : "bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </QuestionCard>

      {status && <Btn className="mt-6" onClick={() => onDone(status)}>ادامه</Btn>}
    </section>
  );
}

/* ——————————————————————————————————
   ✅ مرحله ۳: قد به سن + نتیجه نهایی
—————————————————————————————————— */
function HeightStep({ onDone }) {
  const [status, setStatus] = useState(null);
  const options = [
    { label: "کوتاه‌تر از میانگین", value: "کمی کوتاه‌تر" },
    { label: "در محدوده طبیعی", value: "طبیعی" },
    { label: "بلندتر از میانگین", value: "بلندتر از میانگین" },
  ];

  return (
    <section className="w-full max-w-3xl mx-auto">
      <QuestionCard
        icon={<Ruler className="w-5 h-5" />}
        title="بررسی قد نسبت به سن"
        goal="تحلیل رشد طولی بدن بر اساس سن کودک."
        reason="قد کمتر از میانگین ممکن است نشانه تغذیه ناکافی یا عوامل ژنتیکی باشد."
        advice="تغذیه پروتئینی، خواب کافی و فعالیت بدنی در رشد قد تأثیر مستقیم دارند."
      >
        <div className="flex flex-col sm:flex-row gap-3">
          {options.map((o) => (
            <button
              key={o.value}
              onClick={() => setStatus(o.value)}
              className={`flex-1 border rounded-full py-2 font-semibold transition-all ${
                status === o.value
                  ? "bg-yellow-300 border-yellow-400 text-yellow-900 shadow-inner"
                  : "bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </QuestionCard>

      {status && <Btn className="mt-6" onClick={() => onDone(status)}>مشاهده نتیجه</Btn>}
    </section>
  );
}

/* ——————————————————————————————————
   ✅ صفحه اصلی پایش رشد بدنی ژنینو
—————————————————————————————————— */
export default function BodyMetricsCheck() {
  const navigate = useNavigate();
  const [step, setStep] = useState(-1);
  const [bmiResult, setBmiResult] = useState(null);
  const [weightStatus, setWeightStatus] = useState(null);
  const [heightStatus, setHeightStatus] = useState(null);

  const overallLevel = useMemo(() => {
    if (!bmiResult || !weightStatus || !heightStatus) return "نامشخص";
    if (
      [bmiResult.status, weightStatus, heightStatus].some((v) =>
        v.includes("کم")
      )
    )
      return "نیازمند توجه";
    if (
      [bmiResult.status, weightStatus, heightStatus].some((v) =>
        v.includes("اضافه")
      )
    )
      return "قابل‌قبول";
    return "طبیعی";
  }, [bmiResult, weightStatus, heightStatus]);

  return (
    <GeninoDNABackground strands={10} opacity={0.25} duration={90}>
      <main dir="rtl" className="relative z-10 flex flex-col items-center px-6 py-16 text-gray-800">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-extrabold text-yellow-700 mb-12 text-center drop-shadow-[0_0_12px_rgba(255,215,0,0.4)]"
        >
          پایش رشد بدنی و تغذیه کودک 🌿
        </motion.h1>

        {step >= 0 && step <= 2 && <ProgressBar step={step} />}

        <AnimatePresence mode="wait">
          {step === -1 && (
            <motion.section
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl text-center"
            >
              <p className="text-gray-700 mb-10 leading-relaxed">
                این پایش به شما کمک می‌کند وضعیت رشد بدنی و تغذیه کودک را با شاخص‌های علمی بسنجید.  
                ژنینو در سه مرحله، وضعیت BMI، وزن به سن و قد به سن را تحلیل می‌کند.
              </p>
              <Btn onClick={() => setStep(0)}>شروع پایش رشد بدنی 🌱</Btn>
            </motion.section>
          )}

          {step === 0 && <BMIStep onDone={(r) => { setBmiResult(r); setStep(1); }} />}
          {step === 1 && <WeightStep onDone={(s) => { setWeightStatus(s); setStep(2); }} />}
          {step === 2 && <HeightStep onDone={(s) => { setHeightStatus(s); setStep(3); }} />}

          {step === 3 && (
            <motion.section
              key="result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center bg-gradient-to-br from-yellow-50 via-white to-amber-50 rounded-3xl p-8 shadow-[0_0_30px_rgba(255,215,0,0.3)] border border-yellow-100 max-w-3xl"
            >
              <Activity className="w-16 h-16 mx-auto mb-3 text-yellow-600" />
              <h2 className="text-2xl font-extrabold text-yellow-700 mb-3">
                گزارش هوشمند رشد بدنی ژنینو ✨
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                BMI: <strong>{bmiResult?.bmi}</strong> ({bmiResult?.status})  
                <br />
                وزن به سن: <strong>{weightStatus}</strong>  
                <br />
                قد به سن: <strong>{heightStatus}</strong>  
              </p>
              <p className="text-gray-800 font-bold mt-3">
                وضعیت کلی: {overallLevel}
              </p>

              <Btn
                className="mt-6"
                onClick={() =>
                  navigate("/child-health-check/body-report", {
                    state: {
                      report: {
                        name: "حنا سمواتی",
                        date: new Date().toLocaleDateString("fa-IR"),
                        data: {
                          bmi: bmiResult?.bmi,
                          status: bmiResult?.status,
                          weightStatus,
                          heightStatus,
                          level: overallLevel,
                        },
                        type: "bodymetrics",
                        label: "پایش رشد بدنی و تغذیه",
                      },
                    },
                  })
                }
              >
                مشاهده گزارش رسمی ژنینو 🧾
              </Btn>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </GeninoDNABackground>
  );
}
