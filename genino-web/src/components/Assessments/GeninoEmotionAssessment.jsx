
import { motion, AnimatePresence } from "framer-motion";
import GeninoDNABackground from "@components/Core/GeninoDNABackground";
import GoldenModal from "@components/Core/GoldenModal";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function GeninoEmotionAssessment({
  title,
  ageRange,
  intro,
  steps = [],
  sources = [],
  onFinish,
}) {
  const [stepIndex, setStepIndex] = useState(-1); // -1 = معرفی
  const [answers, setAnswers] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  const currentStep = steps[stepIndex];

  const navigate = useNavigate();


  const handleNext = () => {
  if (stepIndex < steps.length - 1) {
    setStepIndex(stepIndex + 1);
  } else {
    setShowSummary(true); // 👈 ورود به جمع‌بندی
  }
};

  const handlePrev = () => {
    setStepIndex((s) => Math.max(-1, s - 1));
  };
  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [stepIndex, showSummary]);


  return (
    <GeninoDNABackground strands={8} opacity={0.25} duration={90}>
      <main
        dir="rtl"
        className="relative z-10 min-h-screen flex flex-col items-center px-6 py-16 text-gray-800"
      >
        {/* 🟡 معرفی تست */}
        {stepIndex === -1 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl text-center"
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold text-yellow-700 mb-4">
              {title}
            </h1>
            <p className="text-sm text-gray-500 mb-2">
              مناسب برای کودکان {ageRange}
            </p>
            <p className="text-gray-700 leading-relaxed mb-10">
              {intro}
            </p>

            <button
              onClick={() => setStepIndex(0)}
              className="px-10 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 
                         text-white font-bold shadow-lg hover:scale-105 transition"
            >
              شروع پایش
            </button>
          </motion.section>
        )}

        {/* 🟢 جمع‌بندی پایانی */}
{showSummary && (
  <motion.section
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    className="max-w-3xl w-full bg-white rounded-3xl border border-yellow-200 
               p-6 shadow-sm text-right"
  >
    <h2 className="text-2xl font-extrabold text-yellow-700 mb-4">
      جمع‌بندی پایش تنظیم هیجان کودک
    </h2>

    <p className="text-gray-700 leading-relaxed mb-5">
      بر اساس پاسخ‌های شما، کودک در حال یادگیری مهارت‌های تنظیم هیجان
      متناسب با سن خود است. در این بازه سنی، بروز احساسات شدید طبیعی بوده
      و نقش والد در همراهی، آرام‌سازی و ایجاد امنیت هیجانی بسیار مهم است.
    </p>

    <ul className="list-disc pr-5 space-y-2 text-gray-700 text-sm mb-6">
      <li>در زمان ناراحتی، ابتدا احساس کودک را نام‌گذاری کنید.</li>
      <li>از توضیح طولانی در اوج هیجان پرهیز کنید.</li>
      <li>الگوی آرام‌بودن باشید؛ کودک از شما یاد می‌گیرد.</li>
      <li>ثبات رفتاری و پاسخ‌های قابل پیش‌بینی ایجاد امنیت می‌کند.</li>
    </ul>

    {/* منابع علمی */}
    <div className="border-t pt-4 text-xs text-gray-500">
      <span className="font-semibold">منابع علمی:</span>
      <ul className="mt-2 space-y-1">
        {sources.map((src, i) => (
  <li key={i}>
    <a
      href={src.link}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:underline"
    >
      {src.title}
    </a>
  </li>
))}
      </ul>
    </div>

    <div className="flex justify-center mt-8">
      <button
  onClick={() => {
    onFinish?.(answers);
    navigate("/child-health-check");
  }}
  className="px-10 py-4 rounded-2xl bg-gradient-to-r 
             from-yellow-400 to-yellow-500 text-white 
             font-bold shadow-lg hover:scale-105 transition"
>
  پایان پایش
</button>
    </div>
  </motion.section>
)}


        {/* 🟡 مراحل تست */}
        {!showSummary && (
        <AnimatePresence mode="wait">
          {currentStep && (
            <motion.section
              key={currentStep.key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-3xl"
            >
              {/* تصویر آموزشی */}
              {currentStep.image && (
                <img
                  src={currentStep.image}
                  alt=""
                  className="w-full max-h-64 object-cover rounded-2xl mb-6 shadow"
                />
              )}

              {/* عنوان مرحله */}
              <h2 className="text-xl font-extrabold text-yellow-700 mb-3">
                {currentStep.title}
              </h2>

              {/* چرا این مرحله مهم است */}
              {currentStep.why && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm mb-4">
                  <strong>چرا این مرحله مهم است؟</strong>
                  <p className="mt-1 text-gray-700">{currentStep.why}</p>
                </div>
              )}

              {/* مثال عینی */}
              {currentStep.example && (
                <div className="bg-white border border-gray-200 rounded-xl p-4 text-sm mb-6">
                  <strong>مثال واقعی:</strong>
                  <p className="mt-1 text-gray-700">{currentStep.example}</p>
                </div>
              )}

              {/* محل سؤال‌ها (فعلاً ساده) */}
              <div className="space-y-3 mb-8">
                {currentStep.questions?.map((q) => (
                  <button
                    key={q.value}
                    onClick={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        [currentStep.key]: q.value,
                      }))
                    }
                    className={`w-full text-right px-5 py-3 rounded-xl border transition
                      ${
                        answers[currentStep.key] === q.value
                          ? "bg-yellow-100 border-yellow-400"
                          : "bg-white border-gray-200 hover:bg-yellow-50"
                      }`}
                  >
                    {q.label}
                  </button>
                ))}
              </div>

              {/* واکنش پیشنهادی ژنینو */}
              {answers[currentStep.key] &&
                currentStep.reactions?.[answers[currentStep.key]] && (
                  <div className="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 
                                  rounded-xl p-4 text-sm mb-6">
                    <strong>پیشنهاد ژنینو:</strong>
                    <p className="mt-1 text-gray-700">
                      {currentStep.reactions[answers[currentStep.key]]}
                    </p>
                  </div>
                )}

              {/* ناوبری */}
              <div className="flex justify-between">
                <button
                  onClick={handlePrev}
                  className="text-sm text-gray-500 underline"
                >
                  مرحله قبل
                </button>

                <button
  onClick={handleNext}
  disabled={!answers[currentStep.key]}
  className={`px-8 py-3 rounded-xl font-bold transition
    ${
      answers[currentStep.key]
        ? "bg-yellow-500 text-white hover:bg-yellow-600"
        : "bg-gray-200 text-gray-400 cursor-not-allowed"
    }`}
>
  ادامه
</button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
        )}
      </main>
    </GeninoDNABackground>
  );
}
