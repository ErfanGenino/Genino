import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const COLORS = [
  { key: "yellow", name: "زرد", css: "bg-yellow-400" },
  { key: "blue", name: "آبی", css: "bg-blue-500" },
  { key: "green", name: "سبز", css: "bg-green-500" },
  { key: "red", name: "قرمز", css: "bg-red-500" },
  { key: "purple", name: "بنفش", css: "bg-purple-500" },
  { key: "orange", name: "نارنجی", css: "bg-orange-500" },
  { key: "pink", name: "صورتی", css: "bg-pink-500" },
  { key: "teal", name: "فیروزه‌ای", css: "bg-teal-500" },
];

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function ColorTapGame({ optionsCount = 4 }) {
  const [score, setScore] = useState(0);
  const [tries, setTries] = useState(0);
  const [feedback, setFeedback] = useState(null); // "ok" | "bad" | null

  const round = useMemo(() => {
    const opts = shuffle(COLORS).slice(0, optionsCount);
    const target = opts[Math.floor(Math.random() * opts.length)];
    return { opts, target };
  }, [score, tries, optionsCount]);

  const onPick = (pickedKey) => {
    setTries((t) => t + 1);
    if (pickedKey === round.target.key) {
      setScore((s) => s + 1);
      setFeedback("ok");
      setTimeout(() => setFeedback(null), 450);
    } else {
      setFeedback("bad");
      setTimeout(() => setFeedback(null), 450);
    }
  };

  const restart = () => {
    setScore(0);
    setTries(0);
    setFeedback(null);
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
        <div className="text-gray-700">روی این رنگ بزن:</div>
        <div className="text-3xl font-extrabold text-yellow-700 mt-1">
          {round.target.name}
        </div>
        <div className="text-xs text-gray-500 mt-2">
          (هدف: تشخیص رنگ‌ها و دقت)
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {round.opts.map((c) => (
          <button
            key={c.key}
            onClick={() => onPick(c.key)}
            className={`h-20 rounded-2xl ${c.css} shadow-sm hover:brightness-105 transition`}
            aria-label={c.name}
            title={c.name}
          />
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
          {feedback === "ok" ? "✅ آفرین! درست بود." : "❌ نه، دوباره تلاش کن."}
        </motion.div>
      )}
    </div>
  );
}
