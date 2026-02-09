import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const SETS = [
  { target: "🔺", options: ["🔺", "🔵", "⭐️", "❤️"] },
  { target: "🔵", options: ["🔵", "🔺", "🟩", "⭐️"] },
  { target: "⭐️", options: ["⭐️", "❤️", "🔺", "🔵"] },
  { target: "❤️", options: ["❤️", "⭐️", "🟩", "🔵"] },
  { target: "🟩", options: ["🟩", "🔺", "⭐️", "❤️"] },
];

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function ShapeMatchGame({ rounds = 5 }) {
  const [score, setScore] = useState(0);
  const [step, setStep] = useState(1);
  const [stars, setStars] = useState(0);
  const [feedback, setFeedback] = useState(null); // ok | bad | null

  const round = useMemo(() => {
    const pick = SETS[Math.floor(Math.random() * SETS.length)];
    return { target: pick.target, opts: shuffle(pick.options) };
  }, [step]);

  const progress = Math.min(100, Math.round((step / rounds) * 100));

  const restart = () => {
    setScore(0);
    setStep(1);
    setStars(0);
    setFeedback(null);
  };

  const nextRound = () => {
    if (step >= rounds) return;
    setStep((s) => s + 1);
  };

  const onPick = (v) => {
    if (feedback) return; // وقتی پیام نشان داده می‌شود، کلیک نگیرد

    if (v === round.target) {
      setScore((s) => s + 1);
      setStars((x) => x + 1);
      setFeedback("ok");
      setTimeout(() => {
        setFeedback(null);
        nextRound();
      }, 550);
    } else {
      setFeedback("bad");
      setTimeout(() => setFeedback(null), 550);
    }
  };

  const isFinished = step >= rounds && score > 0 && (step === rounds);

  return (
    <div className="mt-4">
      {/* هدر بازی */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="text-sm text-gray-600">
          <span className="font-bold text-gray-800">مرحله:</span> {step} / {rounds}
          <span className="mx-3 text-gray-300">|</span>
          <span className="font-bold text-gray-800">امتیاز:</span> {score}
          <span className="mx-3 text-gray-300">|</span>
          <span className="font-bold text-gray-800">ستاره:</span> {stars} ⭐️
        </div>

        <button
          onClick={restart}
          className="px-4 py-2 rounded-xl bg-yellow-500 text-white font-semibold shadow hover:shadow-md hover:brightness-105 transition"
        >
          شروع دوباره
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full h-3 rounded-full bg-yellow-100 border border-yellow-200 overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-yellow-400"
        />
      </div>

      {/* هدف */}
      <div className="rounded-2xl border border-yellow-200 bg-[#fffdf8] p-4 text-center mb-4">
        <div className="text-gray-700">شکل مشابه را پیدا کن:</div>
        <motion.div
          key={round.target}
          initial={{ scale: 0.8, rotate: -6, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          className="text-5xl mt-2"
        >
          {round.target}
        </motion.div>
      </div>

      {/* گزینه‌ها */}
      <div className="grid grid-cols-2 gap-3">
        {round.opts.map((v) => (
          <motion.button
            key={v}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onPick(v)}
            className="h-20 sm:h-24 rounded-2xl border border-yellow-200 bg-white hover:bg-yellow-50 transition flex items-center justify-center text-4xl"
            aria-label="گزینه"
          >
            {v}
          </motion.button>
        ))}
      </div>

      {/* بازخورد */}
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 rounded-2xl border p-3 text-center ${
            feedback === "ok"
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {feedback === "ok" ? "✅ عالی! یک ستاره گرفتی ⭐️" : "❌ نه، دوباره امتحان کن"}
        </motion.div>
      )}

      {/* پایان */}
      {step === rounds && !feedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-2xl border border-yellow-200 bg-[#fffdf8] p-4 text-center"
        >
          <div className="text-2xl mb-1">🎉 تموم شد!</div>
          <div className="text-gray-700">
            امتیاز نهایی: <span className="font-bold">{score}</span> | ستاره‌ها:{" "}
            <span className="font-bold">{stars}</span> ⭐️
          </div>
        </motion.div>
      )}
    </div>
  );
}
