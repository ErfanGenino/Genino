import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const EMOJIS = [
  "🍎","🍌","🍇","🍓","🍒","🍍","🥝","🍉","🍑","🥥","🍋","🍊",
  "🍐","🥭","🍈","🍏","🍅","🥕","🌽","🥑","🍄","🥔","🧀","🍪"
];

const LEVELS = [
  { id: 1, label: "مرحله ۱", pairs: 6, cols: "grid-cols-4", hint: "۱۲ کارت" },   // 12
  { id: 2, label: "مرحله ۲", pairs: 8, cols: "grid-cols-4", hint: "۱۶ کارت" },   // 16
  { id: 3, label: "مرحله ۳", pairs: 10, cols: "grid-cols-5", hint: "۲۰ کارت" },  // 20
];

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

function buildDeck(pairs) {
  const picks = shuffle(EMOJIS).slice(0, pairs);
  return shuffle([...picks, ...picks]).map((value, idx) => ({
    id: `${value}-${idx}`,
    value,
  }));
}

export default function MemoryMatchGameLevels() {
  const [levelIndex, setLevelIndex] = useState(0);

  const level = LEVELS[levelIndex];

  const initialDeck = useMemo(() => buildDeck(level.pairs), [levelIndex, level.pairs]);

  const [cards, setCards] = useState(initialDeck);
  const [flipped, setFlipped] = useState([]);          // indices
  const [matched, setMatched] = useState(new Set());   // indices
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const isWin = matched.size === cards.length && cards.length > 0;

  const restartLevel = () => {
    setCards(buildDeck(level.pairs));
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setIsLocked(false);
  };

  const restartAll = () => {
    setLevelIndex(0);
    // deck و state ها بعد از تغییر levelIndex با useMemo و useEffect-style در state set پایین هماهنگ می‌شن
    // برای اینکه در همین لحظه هم ریست بشه:
    const first = LEVELS[0];
    setCards(buildDeck(first.pairs));
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setIsLocked(false);
  };

  const goNextLevel = () => {
    if (levelIndex >= LEVELS.length - 1) return;
    const nextIndex = levelIndex + 1;
    const nextLevel = LEVELS[nextIndex];
    setLevelIndex(nextIndex);
    setCards(buildDeck(nextLevel.pairs));
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setIsLocked(false);
  };

  const onFlipCard = (index) => {
    if (isLocked) return;
    if (matched.has(index)) return;
    if (flipped.includes(index)) return;
    if (isWin) return;

    const next = [...flipped, index];
    setFlipped(next);

    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = next;
      const isMatch = cards[a]?.value === cards[b]?.value;

      if (isMatch) {
        setMatched((prev) => new Set([...prev, a, b]));
        setFlipped([]);
      } else {
        setIsLocked(true);
        setTimeout(() => {
          setFlipped([]);
          setIsLocked(false);
        }, 650);
      }
    }
  };

  // اگر levelIndex عوض شد ولی state ها هنوز deck قبلی رو داشتن (rare)، همگامشون کن
  // (به جای useEffect، همین الگو کافیه چون ما هنگام تغییر مرحله دستی set می‌کنیم)
  // ولی اگر کامپوننت دوباره mount شد، initialDeck اعمال می‌شود:
  React.useEffect(() => {
    setCards(initialDeck);
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setIsLocked(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialDeck]);

  return (
    <div className="mt-4">
      {/* Header */}
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-sm text-gray-600">
            <span className="font-bold text-gray-900">{level.label}</span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-gray-700">{level.hint}</span>

            <span className="mx-3 text-gray-300">|</span>
            <span className="font-bold text-gray-800">حرکت‌ها:</span> {moves}

            <span className="mx-3 text-gray-300">|</span>
            <span className="font-bold text-gray-800">جفت‌های پیدا شده:</span>{" "}
            {Math.floor(matched.size / 2)} / {level.pairs}
          </div>

          <div className="flex gap-2">
            <button
              onClick={restartLevel}
              className="px-4 py-2 rounded-xl bg-yellow-500 text-white font-semibold shadow hover:shadow-md hover:brightness-105 transition"
            >
              شروع دوباره
            </button>

            <button
              onClick={restartAll}
              className="px-4 py-2 rounded-xl bg-white border border-yellow-200 text-yellow-700 font-semibold shadow-sm hover:bg-yellow-50 transition rounded-xl"
            >
              شروع از اول
            </button>
          </div>
        </div>

        {/* Progress bar (optional nice UX) */}
        <div className="h-2 rounded-full bg-yellow-100 overflow-hidden">
          <div
            className="h-full bg-yellow-400 transition-all"
            style={{
              width: `${(matched.size / cards.length) * 100 || 0}%`,
            }}
          />
        </div>
      </div>

      {/* Grid */}
      <div className={`grid ${level.cols} sm:${level.cols} gap-3`}>
        {cards.map((c, idx) => {
          const isOpen = flipped.includes(idx) || matched.has(idx);
          return (
            <button
              key={c.id}
              onClick={() => onFlipCard(idx)}
              className={`h-20 sm:h-24 rounded-2xl border transition flex items-center justify-center text-3xl
                ${isOpen ? "bg-yellow-50 border-yellow-300" : "bg-white border-yellow-200 hover:bg-yellow-50"}
                ${matched.has(idx) ? "opacity-70" : ""}
              `}
              aria-label="کارت بازی"
            >
              {isOpen ? c.value : "❓"}
            </button>
          );
        })}
      </div>

      {/* Win panel */}
      {isWin && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 rounded-2xl border border-yellow-200 bg-[#fffdf8] p-4 text-center"
        >
          <div className="text-2xl mb-1">✨ آفرین!</div>
          <div className="text-gray-700">
            همه جفت‌ها پیدا شد. تعداد حرکت‌ها:{" "}
            <span className="font-bold">{moves}</span>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {levelIndex < LEVELS.length - 1 ? (
              <button
                onClick={goNextLevel}
                className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-semibold shadow hover:shadow-md hover:brightness-105 transition"
              >
                مرحله بعد ▶
              </button>
            ) : (
              <button
                onClick={restartAll}
                className="px-5 py-2 rounded-xl bg-yellow-500 text-white font-semibold shadow hover:shadow-md hover:brightness-105 transition"
              >
                دوباره از مرحله ۱
              </button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
