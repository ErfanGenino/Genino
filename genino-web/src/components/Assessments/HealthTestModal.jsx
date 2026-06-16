// 📄 src/components/Assessments/HealthTestModal.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HealthTestModal({
  show = false,
  onClose = () => {},
  title = "تست سلامت بدن",
  sections = [],
  onSubmit = () => {},
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");

  const currentSection = sections[step];
  if (!show || !currentSection) return null;

  const handleAnswer = (sectionId, questionIndex, value) => {
    setAnswers((prev) => {
      const section = prev[sectionId] || {};
      return {
        ...prev,
        [sectionId]: { ...section, [questionIndex]: value },
      };
    });
    setError("");
  };

  const isCurrentSectionComplete = () => {
    const secAns = answers?.[currentSection.id] || {};
    return currentSection.questions.every((_, i) => !!secAns[i]);
  };

  const resetTest = () => {
    setStep(0);
    setAnswers({});
    setError("");
  };

  const handleClose = () => {
    resetTest();
    onClose();
  };

  const handleNext = () => {
    if (!isCurrentSectionComplete()) {
      setError("لطفاً به همه سؤال‌های این بخش پاسخ دهید.");
      return;
    }
    setStep((s) => s + 1);
  };

  const handleFinish = () => {
    if (!isCurrentSectionComplete()) {
      setError("لطفاً به همه سؤال‌های این بخش پاسخ دهید.");
      return;
    }

    onSubmit({
      date: new Date().toISOString(),
      answers,
    });

    handleClose();
  };

  const progress = ((step + 1) / sections.length) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[28px] bg-white shadow-2xl border border-pink-100">
        <div className="relative bg-gradient-to-l from-[#5a0f2f] to-[#8b2450] px-5 py-5 text-center">
  <button
    type="button"
    onClick={handleClose}
    className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
    aria-label="بستن"
  >
    ✕
  </button>

  <p className="text-[11px] tracking-[0.25em] text-pink-100/80">
    GENINO HEALTH
  </p>

  <h3 className="mt-2 text-xl font-bold text-white">
    {title}
  </h3>

  <p className="mt-2 text-xs leading-6 text-white/70">
    بخش {step + 1} از {sections.length} — {currentSection.title.replace(/[^\u0600-\u06FF\s‌]/g, "").trim()}
  </p>
</div>

        <div className="p-5 space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {currentSection.questions.map((q, questionIndex) => (
                <div
                  key={questionIndex}
                  className="rounded-3xl border border-pink-100 bg-[#fff6f9] p-4"
                >
                  <p className="mb-3 text-sm font-semibold text-stone-800 leading-7">
                    {questionIndex + 1}. {q.q}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {q.options.map((opt) => {
                      const selected =
                        answers[currentSection.id]?.[questionIndex] === opt;

                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() =>
                            handleAnswer(currentSection.id, questionIndex, opt)
                          }
                          className={`rounded-2xl border px-3 py-3 text-center transition ${
                            selected
                              ? "border-pink-400 bg-white shadow-md"
                              : "border-stone-100 bg-white/75 hover:bg-white"
                          }`}
                        >
                          <span
                            className={`block text-sm font-semibold leading-6 ${
                              selected ? "text-pink-700" : "text-stone-700"
                            }`}
                          >
                            {opt}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {error && (
            <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="pt-2">
            <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-stone-100">
              <motion.div
                className="h-2 rounded-full bg-gradient-to-l from-pink-400 to-pink-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.35 }}
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={step > 0 ? () => setStep((s) => s - 1) : handleClose}
                className="flex-1 rounded-2xl border border-stone-200 py-3 text-sm text-stone-600 hover:bg-stone-50"
              >
                {step > 0 ? "قبلی" : "انصراف"}
              </button>

              {step < sections.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 rounded-2xl bg-gradient-to-l from-pink-500 to-pink-600 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg"
                >
                  بعدی
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinish}
                  className="flex-1 rounded-2xl bg-gradient-to-l from-yellow-500 to-pink-600 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg"
                >
                  ثبت نتیجه
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}