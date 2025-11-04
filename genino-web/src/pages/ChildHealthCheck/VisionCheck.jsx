// 📄 src/pages/ChildHealthCheck/VisionCheck.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GeninoDNABackground from "../../components/GeninoDNABackground";
import { Eye } from "lucide-react";

// 🎤 گفتار هوشمند با fallback برای همه مرورگرها
const speak = (text) => {
  if (!window.speechSynthesis) {
    console.warn("Speech Synthesis API not supported in this browser");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fa-IR";
  utterance.rate = 0.95;
  utterance.pitch = 1;

  const voices = window.speechSynthesis.getVoices();
  let voice = voices.find((v) => v.lang === "fa-IR");
  if (!voice) {
    // 🔁 fallback: استفاده از اولین صدای موجود
    voice = voices[0];
  }
  utterance.voice = voice;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};

function ColorTest({ onComplete }) {
  const [round, setRound] = useState(1);
  const [targetColor, setTargetColor] = useState(null);
  const [colorOrder, setColorOrder] = useState([]);
  const [results, setResults] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const colors = [
    { name: "قرمز", code: "red" },
    { name: "سبز", code: "green" },
    { name: "آبی", code: "blue" },
    { name: "زرد", code: "yellow" },
  ];

  // 🔁 شروع نوبت جدید
  const startRound = () => {
    const randomTarget = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(randomTarget);
    setColorOrder([...colors].sort(() => Math.random() - 0.5));
    setFeedback(null);

    // 🎤 گفتن دستور رنگ
    setTimeout(() => {
      speak(`رنگ ${randomTarget.name} را انتخاب کن`);
    }, 600);
  };

  useEffect(() => {
    // بارگذاری صداها در برخی مرورگرها مثل کروم
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
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

    if (round < 3) {
      setTimeout(() => setRound(round + 1), 1200);
    } else {
      setTimeout(() => onComplete(results.concat(result)), 1200);
    }
  };

  if (!targetColor) return null;

  return (
    <motion.div
      key={round}
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
            layout
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

export default function VisionCheck() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

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
                onClick={() => {
                  speak("پایش بینایی ژنینو فعال شد");
                  nextStep();
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 text-white 
                           font-bold rounded-full shadow-[0_0_25px_rgba(255,220,100,0.6)]"
              >
                شروع پایش بینایی
              </motion.button>
            </motion.section>
          )}

          {step === 1 && (
            <motion.section
              key="colors"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center"
            >
              <ColorTest onComplete={nextStep} />
            </motion.section>
          )}

          {step === 2 && (
            <motion.section
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Eye className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
              <h2 className="text-2xl font-bold text-yellow-700 mb-4">
                نتیجه پایش بینایی
              </h2>
              <p className="text-gray-700 mb-8 leading-relaxed">
                اگر کودک در هر مرحله دچار مشکل یا تردید در تشخیص بوده،  
                مراجعه به چشم‌پزشک اطفال توصیه می‌شود.  
                در غیر این صورت، وضعیت بینایی طبیعی به‌نظر می‌رسد.
              </p>
              <motion.button
                onClick={() => navigate("/child-health-check")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 text-white 
                           font-bold rounded-full shadow-[0_0_20px_rgba(255,220,80,0.6)]"
              >
                بازگشت به صفحه پایش سلامت کودک
              </motion.button>
            </motion.section>
          )}
        </AnimatePresence>

        {step > 0 && step < 2 && (
          <motion.button
            onClick={prevStep}
            whileHover={{ scale: 1.05 }}
            className="mt-10 text-sm text-yellow-700 underline"
          >
            بازگشت به مرحله قبل
          </motion.button>
        )}
      </main>
    </GeninoDNABackground>
  );
}
