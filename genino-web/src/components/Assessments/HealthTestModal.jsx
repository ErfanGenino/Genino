// 📄 src/components/HealthTestModal.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GoldenModal from "@components/Core/GoldenModal";

// 🧠 کامپوننت عمومی تست سلامت
export default function HealthTestModal({
  show = false,
  onClose = () => {},
  title = "تست سلامت بدن",
  sections = [],
  theme = "pink", // یا "blue", "yellow"
  onSubmit = () => {},
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  // 🎯 ثبت پاسخ هر سؤال
  const handleAnswer = (sectionId, questionIndex, value) => {
    setAnswers((prev) => {
      const section = prev[sectionId] || {};
      return {
        ...prev,
        [sectionId]: { ...section, [questionIndex]: value },
      };
    });
  };

  // 💾 پایان تست و ارسال نتیجه
  const handleFinish = () => {
    const result = { date: new Date().toISOString(), answers };
    onSubmit(result);
    onClose();
    setStep(0);
    setAnswers({});
  };

  const currentSection = sections[step];
  if (!currentSection) return null;

  // 🎨 رنگ تم بر اساس prop
  const colors = {
    pink: { primary: "bg-pink-500", secondary: "text-pink-600" },
    blue: { primary: "bg-blue-500", secondary: "text-blue-600" },
    yellow: { primary: "bg-yellow-500", secondary: "text-yellow-600" },
  };
  const c = colors[theme] || colors.pink;

  return (
    <GoldenModal
      show={show}
      title={`${title} (${step + 1} از ${sections.length})`}
      description={currentSection.title}
      onCancel={onClose}
      confirmLabel="بستن"
      onConfirm={onClose}
      showConfirmButton={false} // چون از کنترل سفارشی پایین استفاده می‌کنیم
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-right space-y-5"
        >
          {/* سوال‌ها */}
          {currentSection.questions.map((q, i) => (
            <div key={i}>
              <p className="font-medium text-gray-800 mb-2">{q.q}</p>
              <div className="flex flex-wrap gap-2">
                {q.options.map((opt) => {
                  const selected = answers[currentSection.id]?.[i] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() =>
                        handleAnswer(currentSection.id, i, opt)
                      }
                      className={`px-4 py-2 rounded-xl border text-sm transition-all ${
                        selected
                          ? `${c.primary} text-white shadow-md`
                          : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

         {/* 🔹 کنترل مرحله (قبلی / بعدی / ثبت) */}
<div className="flex justify-between items-center pt-6">
  {/* ⬅️ دکمه قبلی (سمت چپ) */}
  {step > 0 ? (
    <button
      onClick={() => setStep((s) => s - 1)}
      className="bg-white border border-gray-300 text-gray-700 font-medium px-6 py-2 rounded-xl hover:bg-gray-50 transition flex items-center gap-1 order-2 sm:order-1"
    >
      <span className="text-lg">➡️</span> قبلی
    </button>
  ) : (
    <div />
  )}

  {/* ➡️ دکمه بعدی یا ثبت (سمت راست) */}
  {step < sections.length - 1 ? (
    <button
      onClick={() => setStep((s) => s + 1)}
      className={`${c.primary} text-white font-medium px-6 py-2 rounded-xl hover:opacity-90 transition flex items-center gap-1 order-1 sm:order-2`}
    >
      بعدی <span className="text-lg">⬅️</span>
    </button>
  ) : (
    <button
      onClick={handleFinish}
      className="bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:scale-105 transition-all flex items-center gap-1 order-1 sm:order-2"
    >
       ثبت و مشاهده نتیجه
    </button>
  )}
</div>


          {/* نوار پیشرفت */}
          <div className="w-full bg-gray-100 h-2 rounded-full mt-6 overflow-hidden">
            <motion.div
              className={`${c.primary} h-2`}
              initial={{ width: 0 }}
              animate={{
                width: `${((step + 1) / sections.length) * 100}%`,
              }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </GoldenModal>
  );
}
