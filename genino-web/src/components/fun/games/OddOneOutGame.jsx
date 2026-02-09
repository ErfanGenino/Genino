import React, { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";

// فقط میوه‌ها + حیوان‌ها
const SETS = [
  // میوه‌ها
  { same: "🍎", odd: "🍌" },
  { same: "🍇", odd: "🍓" },
  { same: "🍊", odd: "🍋" },
  { same: "🍉", odd: "🍑" },
  { same: "🍍", odd: "🥝" },
  { same: "🍐", odd: "🥭" },

  // حیوان‌ها
  { same: "🐶", odd: "🐱" },
  { same: "🐰", odd: "🐻" },
  { same: "🦊", odd: "🐼" },
  { same: "🐵", odd: "🐸" },
  { same: "🐯", odd: "🦁" },
  { same: "🐮", odd: "🐷" },
];

const LEVELS = [
  { id: 1, cells: 12, cols: "grid-cols-4", timeSec: 10, oddCount: 1, hint: "۱۲ خانه | ۱ متفاوت" },
  { id: 2, cells: 15, cols: "grid-cols-5", timeSec: 9, oddCount: 1, hint: "۱۵ خانه | ۱ متفاوت" },
  { id: 3, cells: 18, cols: "grid-cols-6", timeSec: 8, oddCount: 1, hint: "۱۸ خانه | ۱ متفاوت" },
  { id: 4, cells: 21, cols: "grid-cols-7", timeSec: 7, oddCount: 2, hint: "۲۱ خانه | ۲ متفاوت" },
  { id: 5, cells: 24, cols: "grid-cols-6", timeSec: 6, oddCount: 2, hint: "۲۴ خانه | ۲ متفاوت" },
];

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// راند: اکثریت "same" + 1 یا 2 "odd"
function buildRound({ cells, oddCount }) {
  // برای اینکه ۲ odd واقعاً متفاوت باشند، دو set متفاوت برمی‌داریم
  const base = SETS[Math.floor(Math.random() * SETS.length)];
  let second = null;

  if (oddCount === 2) {
    const candidates = SETS.filter(
      (s) => s.same !== base.same && s.odd !== base.odd && s.odd !== base.same && s.same !== base.odd
    );
    second = candidates.length
      ? candidates[Math.floor(Math.random() * candidates.length)]
      : SETS[(SETS.indexOf(base) + 1) % SETS.length];
  }

  const odds = oddCount === 1 ? [base.odd] : [base.odd, second.odd];
  const itemsRaw = [
    ...odds,
    ...Array.from({ length: cells - oddCount }).map(() => base.same),
  ];

  const items = shuffle(itemsRaw).map((v, idx) => ({
    id: `${v}-${idx}-${Math.random().toString(16).slice(2)}`,
    v,
    isOdd: odds.includes(v),
  }));

  return {
    items,
    oddCount,
  };
}

export default function OddOneOutGame5Levels() {
  const [levelIndex, setLevelIndex] = useState(0);
  const level = LEVELS[levelIndex];

  const [score, setScore] = useState(0); // مجموع درست‌ها
  const [tries, setTries] = useState(0); // مجموع تلاش‌ها
  const [feedback, setFeedback] = useState(null); // ok | bad | timeout | null

  const [roundKey, setRoundKey] = useState(0); // برای ساخت راند جدید
  const [pickedOdds, setPickedOdds] = useState(new Set()); // در مراحل ۴/۵ باید ۲ odd پیدا شود

  const [timeLeft, setTimeLeft] = useState(level.timeSec);
  const [isLocked, setIsLocked] = useState(false);

  const round = useMemo(() => buildRound(level), [levelIndex, roundKey]);

  const isLastLevel = levelIndex === LEVELS.length - 1;
  const needOdds = round.oddCount; // 1 یا 2
  const foundOdds = pickedOdds.size;

  // شروع/ریست تایمر با هر راند یا تغییر مرحله
  useEffect(() => {
    setTimeLeft(level.timeSec);
    setIsLocked(false);
    setPickedOdds(new Set());
  }, [levelIndex, roundKey, level.timeSec]);

  // شمارش معکوس
  useEffect(() => {
    if (isLocked) return;
    if (feedback === "ok") return;

    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(t);
          // تایم‌اوت
          setIsLocked(true);
          setFeedback("timeout");
          setTimeout(() => {
            setFeedback(null);
            nextRoundSameLevel(); // راند جدید در همین مرحله
          }, 700);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(t);
  }, [isLocked, feedback]); // eslint-disable-line react-hooks/exhaustive-deps

  const nextRoundSameLevel = () => {
    setRoundKey((k) => k + 1);
  };

  const goNextLevel = () => {
    if (isLastLevel) {
      // در مرحله ۵ فقط راند جدید میاد
      nextRoundSameLevel();
      return;
    }
    setLevelIndex((i) => i + 1);
    setRoundKey(0);
  };

  const restartLevel = () => {
    setFeedback(null);
    nextRoundSameLevel();
  };

  const restartAll = () => {
    setLevelIndex(0);
    setScore(0);
    setTries(0);
    setFeedback(null);
    setRoundKey(0);
    setPickedOdds(new Set());
    setIsLocked(false);
  };

  const onPick = (item) => {
    if (isLocked) return;

    setTries((t) => t + 1);

    if (!item.isOdd) {
      setFeedback("bad");
      setTimeout(() => setFeedback(null), 450);
      return;
    }

    // odd بود:
    setPickedOdds((prev) => {
      const next = new Set(prev);
      next.add(item.id); // هر کارت odd یک id جدا دارد
      return next;
    });

    // برای امتیاز: هر کارت odd که درست زده میشه +1
    setScore((s) => s + 1);

    // اگر مرحله نیاز به ۱ odd دارد → مستقیم موفق
    if (needOdds === 1) {
      setIsLocked(true);
      setFeedback("ok");
      setTimeout(() => {
        setFeedback(null);
        goNextLevel();
      }, 500);
      return;
    }

    // اگر نیاز به ۲ odd دارد:
    // چک کنیم چند odd پیدا شده
    setTimeout(() => {
      setPickedOdds((prev) => {
        const currentFound = prev.size;
        if (currentFound >= 2) {
          setIsLocked(true);
          setFeedback("ok");
          setTimeout(() => {
            setFeedback(null);
            goNextLevel();
          }, 500);
        }
        return prev;
      });
    }, 0);
  };

  const timePercent = Math.max(0, Math.min(100, (timeLeft / level.timeSec) * 100));

  return (
    <div className="mt-4">
      {/* Header */}
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-sm text-gray-600">
            <span className="font-bold text-gray-900">مرحله {level.id}</span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-gray-700">{level.hint}</span>

            <span className="mx-3 text-gray-300">|</span>
            <span className="font-bold text-gray-800">زمان:</span>{" "}
            <span className={`${timeLeft <= 3 ? "text-red-600 font-bold" : ""}`}>
              {timeLeft}s
            </span>

            <span className="mx-3 text-gray-300">|</span>
            <span className="font-bold text-gray-800">امتیاز:</span> {score}

            <span className="mx-3 text-gray-300">|</span>
            <span className="font-bold text-gray-800">تلاش‌ها:</span> {tries}

            {needOdds === 2 && (
              <>
                <span className="mx-3 text-gray-300">|</span>
                <span className="font-bold text-gray-800">پیدا شده:</span>{" "}
                {foundOdds} / 2
              </>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={restartLevel}
              className="px-4 py-2 rounded-xl bg-yellow-500 text-white font-semibold shadow hover:shadow-md hover:brightness-105 transition"
            >
              راند جدید
            </button>

            <button
              onClick={restartAll}
              className="px-4 py-2 rounded-xl bg-white border border-yellow-200 text-yellow-700 font-semibold shadow-sm hover:bg-yellow-50 transition rounded-xl"
            >
              شروع از اول
            </button>
          </div>
        </div>

        {/* Time bar */}
        <div className="h-2 rounded-full bg-yellow-100 overflow-hidden">
          <div
            className="h-full bg-yellow-400 transition-all"
            style={{ width: `${timePercent}%` }}
          />
        </div>
      </div>

      {/* Instruction */}
      <div className="rounded-2xl border border-yellow-200 bg-[#fffdf8] p-4 text-center mb-4">
        <div className="text-gray-700">
          {needOdds === 1
            ? "اون یکی که فرق داره رو پیدا کن 👀"
            : "دو تا گزینه‌ای که فرق دارن رو پیدا کن 👀👀"}
        </div>
        <div className="text-xs text-gray-500 mt-1">(فقط میوه‌ها و حیوان‌ها)</div>
      </div>

      {/* Grid */}
      <div className={`grid ${level.cols} gap-3`}>
        {round.items.map((item) => {
          const isPicked = pickedOdds.has(item.id);
          return (
            <button
              key={item.id}
              onClick={() => onPick(item)}
              className={`h-20 sm:h-24 rounded-2xl border transition flex items-center justify-center text-3xl
                ${isPicked ? "bg-emerald-50 border-emerald-200" : "border-yellow-200 bg-white hover:bg-yellow-50"}
              `}
              aria-label="گزینه"
            >
              {item.v}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 rounded-2xl border p-3 text-center ${
            feedback === "ok"
              ? "border-green-200 bg-green-50 text-green-700"
              : feedback === "timeout"
              ? "border-orange-200 bg-orange-50 text-orange-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {feedback === "ok"
            ? "✅ آفرین! درست بود."
            : feedback === "timeout"
            ? "⏳ زمان تموم شد! دوباره تلاش کن."
            : "❌ نه، دوباره تلاش کن."}
        </motion.div>
      )}

      {/* Footer note */}
      {isLastLevel && (
        <div className="mt-4 text-center text-xs text-gray-500">
          مرحله ۵ آخرین مرحله است. با هر موفقیت، یک راند جدید در همین مرحله می‌آید.
        </div>
      )}
    </div>
  );
}
