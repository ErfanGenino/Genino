// 📄 src/pages/ChildHealthCheck/VisionCheck.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GeninoDNABackground from "../../components/GeninoDNABackground";
import { Eye } from "lucide-react";

/* 🎨 مرحله ۱ - تست رنگ‌ها */
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
      result: isCorrect ? "درست" : "نیاز به بررسی بیشتر",
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
        <strong>نوبت {round} از ۳:</strong> به کودک بگویید 👇
      </p>
      <p className="text-yellow-700 font-bold text-lg mb-6">
        «رنگ {targetColor.name} را انتخاب کن»
      </p>

      <div className="flex gap-6 mb-8 flex-wrap justify-center">
        {colorOrder.map((c) => (
          <motion.div
            key={c.code}
            onClick={() => handleColorClick(c)}
            className="w-20 h-20 rounded-full shadow-md border-2 border-gray-200 cursor-pointer transition-transform"
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

/* 🔺 مرحله ۲ - تست اشکال هندسی */
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
      result: isCorrect ? "درست" : "نیاز به بررسی بیشتر",
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
        <strong>نوبت {round} از ۳:</strong> از کودک بخواهید 👇
      </p>
      <p className="text-yellow-700 font-bold text-lg mb-6">
        «شکل {targetShape.name} را انتخاب کن»
      </p>

      <div className="flex gap-8 mb-8 flex-wrap justify-center">
        {shapeOrder.map((s) => (
          <motion.div
            key={s.type}
            onClick={() => handleShapeClick(s)}
            className="w-20 h-20 flex items-center justify-center bg-yellow-400 shadow-md border-2 border-yellow-100 cursor-pointer transition-transform"
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

/* 👁️ مرحله ۳ - تشخیص جهت فلش‌ها */
function ArrowDirectionTest({ onComplete }) {
  const [stage, setStage] = useState(0); // 0 تا 4 برای سایزها
  const [round, setRound] = useState(1);
  const [correctCount, setCorrectCount] = useState(0);
  const [arrow, setArrow] = useState("⬆️");
  const [feedback, setFeedback] = useState(null);

  const directions = ["⬆️", "⬇️", "⬅️", "➡️"];
  const sizes = ["text-7xl", "text-6xl", "text-5xl", "text-4xl", "text-3xl"];
  const labels = ["خیلی بزرگ", "بزرگ", "متوسط", "کوچک", "خیلی کوچک"];

  // 🎯 تولید فلش جدید تصادفی
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

    // بعد از ۳ فلش
    if (round < 3) {
      setTimeout(() => {
        setRound((r) => r + 1);
        setFeedback(null);
      }, 1000);
    } else {
      setTimeout(() => {
        if (correctCount + (isCorrect ? 1 : 0) >= 2) {
          // حداقل دو جواب درست → مرحله بعد
          if (stage < 4) {
            setStage((s) => s + 1);
            setRound(1);
            setCorrectCount(0);
            setFeedback(null);
          } else {
            onComplete(true); // موفقیت کامل
          }
        } else {
          onComplete(false); // توقف زودتر
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
            className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded-full shadow"
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


/* 👁️ صفحه اصلی پایش بینایی */
export default function VisionCheck() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(0, prev - 1));

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
          className="text-3xl sm:text-4xl font-extrabold text-yellow-700 mb-10 text-center drop-shadow-[0_0_12px_rgba(255,220,80,0.4)]"
        >
          پایش بینایی کودک
        </motion.h1>

        <AnimatePresence mode="wait">
          {/* مرحله معرفی */}
          {step === 0 && (
            <motion.section
              key="intro"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl text-center"
            >
              <p className="text-gray-700 leading-relaxed mb-8">
                این آزمون شامل چند بخش ساده برای بررسی توانایی دید کودک است.  
                لطفاً توجه داشته باشید که این آزمون جایگزین معاینه تخصصی نیست.
              </p>
              <motion.button
                onClick={nextStep}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 text-white 
                           font-bold rounded-full shadow-[0_0_25px_rgba(255,220,100,0.6)]"
              >
                شروع پایش بینایی
              </motion.button>
            </motion.section>
          )}

          {/* مرحله ۱: رنگ‌ها */}
          {step === 1 && (
            <motion.section
              key="color-test"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center"
            >
              <ColorTest onComplete={nextStep} />
            </motion.section>
          )}

          {/* مرحله ۲: اشکال هندسی */}
          {step === 2 && (
            <motion.section
              key="shape-test"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center"
            >
              <ShapeTest onComplete={nextStep} />
            </motion.section>
          )}

          {/* مرحله ۳: تشخیص جهت فلش‌ها */}
{step === 3 && (
  <motion.section
    key="arrow-test"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.6 }}
    className="flex flex-col items-center text-center"
  >
    <p className="max-w-lg text-gray-700 leading-relaxed mb-8">
      لطفاً فاصله‌ی کودک تا صفحه حدود <strong>۳ متر</strong> باشد.  
      ابتدا <strong>چشم راست</strong> کودک را بپوشانید و تست را انجام دهید،  
      سپس همین کار را برای <strong>چشم چپ</strong> تکرار کنید.
    </p>
    <ArrowDirectionTest
      onComplete={(success) =>
        success ? setStep(4) : setStep(99) // 99 برای توقف در نتیجه خاص
      }
    />
  </motion.section>
)}

          {/* مرحله ۴: نتیجه نهایی */}
{step === 4 && (
  <motion.section
  key="result"
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6 }}
  className="flex flex-col items-center text-center bg-gradient-to-br from-yellow-50 via-white to-yellow-100 
             rounded-3xl shadow-[0_0_40px_rgba(255,215,80,0.4)] p-10 mx-4 max-w-3xl border border-yellow-200"
>
  <Eye className="w-16 h-16 mb-4 text-yellow-600 drop-shadow-[0_0_12px_rgba(255,200,0,0.6)]" />
  
  <h2 className="text-3xl font-extrabold text-yellow-700 mb-4">
    گزارش پایش بینایی کودک 👁️
  </h2>

  <p className="text-gray-700 text-base leading-relaxed mb-8 max-w-2xl">
    نتایج نشان می‌دهند که کودک شما در سه بخش زیر ارزیابی شد:
  </p>

  <div className="grid sm:grid-cols-3 gap-6 w-full mb-8 text-center">
    <div className="bg-white rounded-2xl shadow-md p-4 border border-yellow-100">
      <h3 className="text-yellow-700 font-bold mb-2">🎨 تشخیص رنگ‌ها</h3>
      <p className="text-gray-700 text-sm">عملکرد طبیعی و دقیق</p>
    </div>
    <div className="bg-white rounded-2xl shadow-md p-4 border border-yellow-100">
      <h3 className="text-yellow-700 font-bold mb-2">🔺 تشخیص اشکال</h3>
      <p className="text-gray-700 text-sm">در محدوده‌ی طبیعی</p>
    </div>
    <div className="bg-white rounded-2xl shadow-md p-4 border border-yellow-100">
      <h3 className="text-yellow-700 font-bold mb-2">👁️ تشخیص جهت‌ها</h3>
      <p className="text-gray-700 text-sm">در سطح بسیار خوب</p>
    </div>
  </div>

  <div className="bg-gradient-to-r from-yellow-100 via-white to-yellow-50 rounded-2xl p-6 border border-yellow-200 mb-8">
    <h4 className="text-lg font-bold text-yellow-700 mb-2">تحلیل کلی:</h4>
    <p className="text-gray-700 leading-relaxed text-sm">
      بر اساس نتایج سه مرحله، سیستم ژنینو نشان می‌دهد که بینایی کودک شما 
      در محدوده‌ی نرمال قرار دارد. پیشنهاد می‌شود برای اطمینان، 
      حداقل سالی یک‌بار معاینه‌ی تخصصی توسط چشم‌پزشک انجام شود.
    </p>
  </div>

  <div className="bg-yellow-50 px-8 py-4 rounded-full border border-yellow-200 shadow-inner mb-8">
    <span className="text-lg font-bold text-yellow-800">
      🌟 امتیاز بینایی کودک: ۹۸ / ۱۰۰
    </span>
  </div>

  <motion.button
    onClick={() => navigate("/child-health-check")}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="px-8 py-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 text-white 
               font-bold rounded-full shadow-[0_0_25px_rgba(255,220,80,0.7)]"
  >
    بازگشت به صفحه پایش سلامت کودک
  </motion.button>
</motion.section>

)}

        </AnimatePresence>

        {step > 0 && step < 3 && (
          <motion.button
            onClick={prevStep}
            whileHover={{ scale: 1.05 }}
            className="mt-10 text-sm text-yellow-700 underline"
          >
            بازگشت به مرحله قبل
          </motion.button> 
        )}
        
        <motion.button
  onClick={() =>
    navigate("/child-health-check/vision-report", {
      state: {
        report: {
          name: "حنا سمواتی",
          date: new Date().toLocaleDateString("fa-IR"),
          colors: 3,        // فعلاً نمونه
          shapes: 2,        // فعلاً نمونه
          arrows: 12,       // فعلاً نمونه
          score: 90,        // امتیاز فرضی
          analysis: "بینایی طبیعی است، پیشنهاد می‌شود سالی یک‌بار معاینه تخصصی انجام شود.",
        },
      },
    })
  }
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="px-8 py-3 bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-600 
             text-white font-bold rounded-full shadow-[0_0_25px_rgba(255,220,80,0.7)] mt-4"
>
  مشاهده گزارش رسمی ژنینو 🧾
</motion.button>


      </main>
    </GeninoDNABackground>
  );
}
