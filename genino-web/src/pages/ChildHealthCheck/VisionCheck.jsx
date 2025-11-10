// 📄 src/pages/ChildHealthCheck/VisionCheck.jsx
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GeninoDNABackground from "@components/Core/GeninoDNABackground";
import { Eye } from "lucide-react";
import GeninoAssessmentStart from "@components/Assessments/GeninoAssessmentStart";
import GeninoReportBox from "@components/Reports/GeninoReportBox";

/* ————————————————————————————————
🎨 مرحله ۱ - تست رنگ‌ها
——————————————————————————————— */
function ColorTest({ onComplete }) {
  const [round, setRound] = useState(1);
  const [targetColor, setTargetColor] = useState(null);
  const [colorOrder, setColorOrder] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [results, setResults] = useState([]);

  const colors = [
    { name: "قرمز", code: "red" },
    { name: "سبز", code: "green" },
    { name: "آبی", code: "blue" },
    { name: "زرد", code: "yellow" },
  ];

  const startRound = () => {
    const randomTarget = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(randomTarget);
    setColorOrder([...colors].sort(() => Math.random() - 0.5));
    setFeedback(null);
  };

  useEffect(() => {
    startRound();
  }, [round]);

  const handleColorClick = (selectedColor) => {
    const isCorrect = selectedColor.name === targetColor.name;
    const result = {
      round,
      target: targetColor.name,
      chosen: selectedColor.name,
      result: isCorrect ? "درست" : "اشتباه",
    };
    setResults((prev) => [...prev, result]);
    setFeedback(result);
    if (round < 3) setTimeout(() => setRound(round + 1), 1200);
    else setTimeout(() => onComplete(results.concat(result)), 1200);
  };

  if (!targetColor) return null;

  return (
    <motion.div
      key={`color-round-${round}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <p className="mb-3 text-gray-700">
        هدف این پایش: ارزیابی تشخیص رنگها و احتمال کوررنگی
      </p>
      <p className="mb-3 text-gray-700">
        <strong>نوبت {round} از ۳:</strong> به کودک بگویید 👇
      </p>
      <p className="text-amber-700 font-bold text-lg mb-6">
        «رنگ {targetColor.name} را انتخاب کن»
      </p>

      <div className="flex gap-6 mb-8 flex-wrap justify-center">
        {colorOrder.map((c) => (
          <motion.div
            key={c.code}
            onClick={() => handleColorClick(c)}
            className="w-20 h-20 lg:w-28 lg:h-28 rounded-full shadow-md border-2 border-gray-200 cursor-pointer transition-transform"
            style={{ backgroundColor: c.code }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm mt-2 text-center"
        >
          {feedback.result === "درست" ? (
            <p className="text-green-600 font-semibold">
              ✅ عالی! کودک رنگ {feedback.target} را درست انتخاب کرد.
            </p>
          ) : (
            <p className="text-orange-500 font-semibold">
              ⚠️ کودک به‌جای رنگ {feedback.target}، رنگ {feedback.chosen} را انتخاب کرد.
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

/* ————————————————————————————————
🔺 مرحله ۲ - تست اشکال هندسی
——————————————————————————————— */
function ShapeTest({ onComplete }) {
  const [round, setRound] = useState(1);
  const [targetShape, setTargetShape] = useState("");
  const [shapeOrder, setShapeOrder] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [results, setResults] = useState([]);

  const shapes = [
    { name: "دایره", type: "circle" },
    { name: "مربع", type: "square" },
    { name: "مثلث", type: "triangle" },
  ];

  const startRound = () => {
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    setTargetShape(randomShape);
    setShapeOrder([...shapes].sort(() => Math.random() - 0.5));
    setFeedback(null);
  };

  useEffect(() => {
    startRound();
  }, [round]);

  const handleShapeClick = (shape) => {
    const isCorrect = shape.name === targetShape.name;
    const result = {
      round,
      target: targetShape.name,
      chosen: shape.name,
      result: isCorrect ? "درست" : "اشتباه",
    };
    setResults((prev) => [...prev, result]);
    setFeedback(result);

    if (round < 3) setTimeout(() => setRound(round + 1), 1200);
    else setTimeout(() => onComplete(results.concat(result)), 1200);
  };

  if (!targetShape) return null;

  return (
    <motion.div
      key={`shape-round-${round}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <p className="mb-3 text-gray-700">
        هدف این پایش: درک شکل و تقارن دید
      </p>
      <p className="mb-3 text-gray-700">
        <strong>نوبت {round} از ۳:</strong> از کودک بخواهید 👇
      </p>
      <p className="text-amber-700 font-bold text-lg mb-6">
        «شکل {targetShape.name} را انتخاب کن»
      </p>

      <div className="flex gap-8 mb-8 flex-wrap justify-center">
        {shapeOrder.map((s) => (
          <motion.div
            key={s.type}
            onClick={() => handleShapeClick(s)}
            className="w-20 h-20 lg:w-28 lg:h-28 flex items-center justify-center bg-amber-400 shadow-md border-2 border-yellow-100 cursor-pointer transition-transform"
            style={{
              clipPath:
                s.type === "circle"
                  ? "circle(50%)"
                  : s.type === "square"
                  ? "inset(0)"
                  : "polygon(50% 0%, 0% 100%, 100% 100%)",
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm mt-2 text-center"
        >
          {feedback.result === "درست" ? (
            <p className="text-green-600 font-semibold">
              ✅ خیلی خوب! کودک شکل {feedback.target} را درست انتخاب کرد.
            </p>
          ) : (
            <p className="text-orange-500 font-semibold">
              ⚠️ کودک به‌جای شکل {feedback.target}، {feedback.chosen} را انتخاب کرد.
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

/* ————————————————————————————————
👁️ مرحله ۳ - تشخیص جهت فلش‌ها
——————————————————————————————— */
function ArrowDirectionTest({ onComplete }) {
  const [stage, setStage] = useState(0);
  const [round, setRound] = useState(1);
  const [correctCount, setCorrectCount] = useState(0);
  const [arrow, setArrow] = useState("⬆️");
  const [feedback, setFeedback] = useState(null);
  const [stagesPassed, setStagesPassed] = useState(0); // ✅ جدید

  const directions = ["⬆️", "⬇️", "⬅️", "➡️"];
  const sizes = ["text-7xl", "text-6xl", "text-5xl", "text-4xl", "text-3xl"];
  const labels = ["خیلی بزرگ", "بزرگ", "متوسط", "کوچک", "خیلی کوچک"];

  const nextArrow = () => {
    const random = directions[Math.floor(Math.random() * directions.length)];
    setArrow(random);
  };

  useEffect(() => {
    nextArrow();
  }, [round, stage]);

  const handleAnswer = (dir) => {
    const isCorrect = dir === arrow;
    if (isCorrect) setCorrectCount((c) => c + 1);
    setFeedback(isCorrect ? "✅ درست بود!" : "❌ اشتباه بود.");

    if (round < 3) {
      setTimeout(() => {
        setRound((r) => r + 1);
        setFeedback(null);
      }, 1000);
    } else {
      setTimeout(() => {
        const passedThisStage = (correctCount + (isCorrect ? 1 : 0)) >= 2;

        if (passedThisStage) {
          if (stage < 4) {
            setStagesPassed((p) => p + 1);  // ✅ مرحله فعلی پاس شد
            setStage((s) => s + 1);
            setRound(1);
            setCorrectCount(0);
            setFeedback(null);
          } else {
            // ✅ همه ۵ مرحله پاس شد
            onComplete({ success: true, stagesPassed: 5 });
          }
        } else {
          // ❌ شکست در همین مرحله → امتیاز همان تعداد مراحلِ قبلاً پاس شده
          onComplete({ success: false, stagesPassed });
        }
      }, 1200);
    }
  };

  return (
    <motion.div
      key={`arrow-stage-${stage}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center"
    >
      <p className="text-gray-700 mb-2">
        هدف این پایش: قدرت دید از فاصله دور
      </p>
      <p className="text-gray-700 mb-2">
        <strong>مرحله {stage + 1} از ۵:</strong> اندازه فلش {labels[stage]}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        (کودک باید از فاصله حدود ۳ متری جهت فلش را بگوید)
      </p>

      <motion.div
        key={arrow}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`${sizes[stage]} mb-8`}
      >
        {arrow}
      </motion.div>

      <div className="flex gap-4 justify-center mb-4 flex-wrap">
        {directions.map((dir, i) => (
          <motion.button
            key={i}
            onClick={() => handleAnswer(dir)}
            whileHover={{ scale: 1.1 }}
            className="px-6 py-2 bg-amber-500 text-white font-semibold rounded-full shadow"
          >
            {dir}
          </motion.button>
        ))}
      </div>

      {feedback && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mt-3 font-bold ${
            feedback.includes("✅") ? "text-green-600" : "text-orange-500"
          }`}
        >
          {feedback}
        </motion.p>
      )}
    </motion.div>
  );
}

/* ————————————————————————————————
👁️ صفحه اصلی پایش بینایی
——————————————————————————————— */
export default function VisionCheck() {
  const navigate = useNavigate();
  const [step, setStep] = useState(-1);
  const [colorResults, setColorResults] = useState([]);
  const [shapeResults, setShapeResults] = useState([]);
  const [arrowResult, setArrowResult] = useState(null); // { success, stagesPassed }

  const totalColor = colorResults.filter((r) => r.result === "درست").length;
  const totalShape = shapeResults.filter((r) => r.result === "درست").length;
  const dirScore = arrowResult ? (arrowResult.success ? 5 : arrowResult.stagesPassed) : 0; // ✅ 0..5
// وزن‌دهی نهاییِ ویژن (مثال: 3 دور رنگ + 3 دور شکل = 6 * 10 = 60 امتیاز، جهت‌ها از 5 تبدیل به 40 امتیاز)
const visionScore = totalColor * 10 + totalShape * 10 + Math.round((dirScore / 5) * 40);
const level = visionScore >= 90 ? "عالی" : visionScore >= 70 ? "قابل قبول" : "نیاز به بررسی";

  const handleSaveReport = () => {
    const report = {
  id: crypto.randomUUID(),
  type: "vision",
  label: `بینایی ${new Date().toLocaleDateString("fa-IR")}`,
  date: new Date().toISOString(),
  data: {
    colors: totalColor,
    shapes: totalShape,
    direction: {
      success: !!arrowResult?.success,
      stagesPassed: arrowResult?.stagesPassed ?? 0,
      score5: dirScore, // ✅ امتیاز ۰ تا ۵
    },
    score: visionScore,
    level,
  },
};

    const prev = JSON.parse(localStorage.getItem("childReports") || "[]");
    localStorage.setItem("childReports", JSON.stringify([report, ...prev]));

    console.log("✅ گزارش بینایی ذخیره شد:", report);
  };

  return (
    <GeninoDNABackground strands={10} opacity={0.25} duration={90}>
      <main
        dir="rtl"
        className="relative z-10 flex flex-col items-center px-6 py-16 text-gray-800"
      >
        <GeninoAssessmentStart
          step={step}
          setStep={setStep}
          title="پایش بینایی کودک"
          description={`این پایش وضعیت تشخیص رنگ‌ها، شکل‌ها و جهت‌ها را در کودک ارزیابی می‌کند.`}
          color="amber"
          buttonLabel="شروع پایش بینایی"
        />

        {step === 0 && <ColorTest onComplete={(r) => { setColorResults(r); setStep(1); }} />}
        {step === 1 && <ShapeTest onComplete={(r) => { setShapeResults(r); setStep(2); }} />}
        {step === 2 && (
  <ArrowDirectionTest
    onComplete={(res) => { // res = { success, stagesPassed }
      setArrowResult(res);
      setStep(3);
    }}
  />
)}

        {step === 3 && (
          <motion.section
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-3xl"
          >
            <GeninoReportBox
              title="بینایی کودک"
              color="amber"
              sections={[
                {
                  title: "🎨 تشخیص رنگ‌ها",
                  score: totalColor,
                  max: 3,
                  status: totalColor >= 3 ? "طبیعی" : "نیاز به بررسی",
                  desc: "این مرحله برای ارزیابی تشخیص رنگ‌ها و احتمال کوررنگی طراحی شده است.",
                },
                {
                  title: "🔺 تشخیص اشکال هندسی",
                  score: totalShape,
                  max: 3,
                  status: totalShape >= 3 ? "طبیعی" : "نسبتاً طبیعی",
                  desc: "درک شکل و تقارن دید در این مرحله بررسی می‌شود.",
                },
                {
      title: "👁️ تشخیص جهت‌ها",
      score: dirScore,    // ✅ 0..5 واقعی
      max: 5,
      status: dirScore >= 4 ? "طبیعی" : dirScore >= 2 ? "قابل بهبود" : "نیاز به بررسی",
      desc: "قدرت دید از فاصله‌ی دور و تشخیص جهت بررسی می‌شود.",
    },
  ]}
              summary={`امتیاز کل بینایی: ${visionScore}/100 — وضعیت کلی: ${level}`}
              tips={[
                ...(totalColor < 3 ? ["تمرین تشخیص رنگ‌ها با بازی‌های رنگی ساده توصیه می‌شود."] : []),
                ...(totalShape < 3 ? ["درک شکل و تقارن را با نقاشی و پازل تقویت کنید."] : []),
                ...(dirScore < 4 ? ["برای اطمینان، معاینه تخصصی چشم پیشنهاد می‌شود."] : []),
              ]}
              reportDate={new Date()}
              onSnapshot={handleSaveReport}
            />

            <div className="flex justify-center mt-6">
  <motion.button
    onClick={() => navigate("/reports/child-health")}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="px-8 py-3 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 
               text-white font-bold rounded-full shadow-[0_0_25px_rgba(255,220,80,0.7)]"
  >
    رفتن به بایگانی گزارش‌های کودک 📁
  </motion.button>
</div>
          </motion.section>
        )}

        {step >= 0 && step <= 2 && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="mt-8 text-sm text-amber-700 underline"
            onClick={() => setStep((s) => Math.max(-1, s - 1))}
          >
            بازگشت به مرحله قبل
          </motion.button>
        )}
      </main>
    </GeninoDNABackground>
  );
}
