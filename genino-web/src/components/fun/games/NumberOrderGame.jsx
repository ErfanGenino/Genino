import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function NumberOrderGame({ count = 8, max = 20 }) {
  const [score, setScore] = useState(0);
  const [tries, setTries] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [feedback, setFeedback] = useState(null); // ok | bad | null

  const numbers = useMemo(() => {
    // انتخاب اعداد یکتا
    const pool = Array.from({ length: max }, (_, i) => i + 1);
    const picked = shuffle(pool).slice(0, count).sort((a, b) => a - b);
    return shuffle(picked);
  }, [score, count, max]);

  const sorted = useMemo(() => [...numbers].sort((a, b) => a - b), [numbers]);

  const resetRound = () => {
    setNextIndex(0);
    setFeedback(null);
    setTries(0);
  };

  const restart = () => {
    setScore(0);
    setTries(0);
    setNextIndex(0);
    setFeedback(null);
  };

  const onPick = (n) => {
    setTries((t) => t + 1);
    const expected = sorted[nextIndex];

    if (n === expected) {
      setFeedback("ok");
      setTimeout(() => setFeedback(null), 350);

      if (nextIndex + 1 === sorted.length) {
        setScore((s) => s + 1);
        // راند جدید
        setTimeout(() => {
          resetRound();
        }, 450);
      } else {
        setNextIndex((i) => i + 1);
      }
    } else {
      setFeedback("bad");
      setTimeout(() => setFeedback(null), 450);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="text-sm text-gray-600">
          <span className="font-bold text-gray-800">امتیاز:</span> {score}
          <span className="mx-3 text-gray-300">|</span>
          <span className="font-bold text-gray-800">تلاش‌ها:</span> {tries}
        </div>

        <button
          onClick={restart}
          className="px-4 py-2 rounded-xl bg-yellow-500 text-white font-semibold shadow hover:shadow-md hover:brightness-105 transition"
        >
          شروع دوباره
        </button>
      </div>

      <div className="rounded-2xl border border-yellow-200 bg-[#fffdf8] p-4 text-center mb-4">
        <div className="text-gray-700">عدد بعدی را بزن:</div>
        <div className="text-3xl font-extrabold text-yellow-700 mt-1">
          {sorted[nextIndex]}
        </div>
        <div className="text-xs text-gray-500 mt-2">(هدف: ترتیب اعداد و دقت)</div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {numbers.map((n) => (
          <button
            key={n}
            onClick={() => onPick(n)}
            className="h-16 sm:h-20 rounded-2xl border border-yellow-200 bg-white hover:bg-yellow-50 transition flex items-center justify-center text-xl font-bold text-gray-800"
            aria-label={`عدد ${n}`}
          >
            {n}
          </button>
        ))}
      </div>

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
          {feedback === "ok" ? "✅ درست بود." : "❌ نه، دوباره."}
        </motion.div>
      )}
    </div>
  );
}
