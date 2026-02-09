import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = [
  "bg-red-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-pink-400",
  "bg-yellow-400",
  "bg-purple-400",
];

const randomBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const makeId = () => `${Date.now()}-${Math.random()}`;

export default function BalloonPopGame({ duration = 20 }) {
  const [balloons, setBalloons] = useState([]);
  const [pops, setPops] = useState([]); // افکت‌های ترکیدن
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [gameOver, setGameOver] = useState(false);

  // تایمر
  useEffect(() => {
    if (gameOver) return;

    if (timeLeft <= 0) {
      setGameOver(true);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, gameOver]);

  // تولید بادکنک
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setBalloons((prev) => [
        ...prev,
        {
          id: makeId(),
          left: randomBetween(6, 86), // درصد
          size: randomBetween(52, 82), // px
          color: COLORS[randomBetween(0, COLORS.length - 1)],
          speed: randomBetween(3200, 4800), // ms
        },
      ]);
    }, 650);

    return () => clearInterval(interval);
  }, [gameOver]);

  // پاکسازی بادکنک‌هایی که مدت زیادی مونده‌اند (برای اینکه لیست سنگین نشه)
  useEffect(() => {
    if (gameOver) return;
    const cleaner = setInterval(() => {
      setBalloons((prev) => prev.slice(-18));
    }, 2000);
    return () => clearInterval(cleaner);
  }, [gameOver]);

  const restart = () => {
    setScore(0);
    setTimeLeft(duration);
    setGameOver(false);
    setBalloons([]);
    setPops([]);
  };

  // ایجاد افکت ترکیدن (ذرات + رینگ)
  const spawnPop = ({ x, y, colorClass }) => {
    const id = makeId();
    const particles = Array.from({ length: 10 }).map(() => ({
      id: makeId(),
      dx: randomBetween(-70, 70),
      dy: randomBetween(-80, 30),
      s: randomBetween(8, 14),
      r: randomBetween(-25, 25),
      t: randomBetween(420, 620),
    }));

    setPops((prev) => [
      ...prev,
      {
        id,
        x,
        y,
        colorClass,
        particles,
      },
    ]);

    // حذف افکت بعد از پایان انیمیشن
    setTimeout(() => {
      setPops((prev) => prev.filter((p) => p.id !== id));
    }, 750);
  };

  const popBalloon = (balloon, e) => {
    if (gameOver) return;

    // گرفتن مختصات کلیک نسبت به کانتینر
    const container = e.currentTarget.closest("[data-balloon-stage]");
    if (container) {
      const rect = container.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      spawnPop({ x: cx, y: cy, colorClass: balloon.color });
    }

    setScore((s) => s + 1);
    setBalloons((prev) => prev.filter((b) => b.id !== balloon.id));
  };

  const timePct = useMemo(() => {
    const v = (timeLeft / duration) * 100;
    return Number.isFinite(v) ? Math.max(0, Math.min(100, v)) : 0;
  }, [timeLeft, duration]);

  return (
    <div
      data-balloon-stage
      className="relative h-[440px] pt-16 rounded-3xl border border-yellow-200 bg-gradient-to-b from-sky-100 via-white to-[#fffdf8] overflow-hidden"
    >
      {/* هدر */}
      <div className="absolute top-3 left-3 right-3 z-20 flex justify-between text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-yellow-400" />
          ⏱ {timeLeft}s
        </div>
        <div>🎯 امتیاز: {score}</div>
      </div>

      {/* نوار زمان */}
      <div className="absolute top-10 left-3 right-3 z-20">
        <div className="h-3 rounded-full bg-white/70 border border-yellow-200 overflow-hidden">
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: `${timePct}%` }}
            transition={{ type: "tween", duration: 0.2 }}
            className="h-full bg-yellow-400"
          />
        </div>
      </div>

      {/* پس‌زمینه‌ی لطیف (ابر/نور) */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <motion.div
          className="absolute -top-10 left-6 w-40 h-40 rounded-full bg-white"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "blur(10px)" }}
        />
        <motion.div
          className="absolute top-10 right-10 w-56 h-56 rounded-full bg-white"
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "blur(12px)" }}
        />
      </div>

      {/* افکت‌های ترکیدن */}
      <AnimatePresence>
        {pops.map((p) => (
          <motion.div
            key={p.id}
            className="absolute z-30 pointer-events-none"
            style={{ left: p.x, top: p.y }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* رینگ موج */}
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-yellow-300"
              style={{ width: 10, height: 10 }}
              initial={{ scale: 0.2, opacity: 0.9 }}
              animate={{ scale: 2.6, opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            />

            {/* ذرات */}
            {p.particles.map((pt) => (
              <motion.div
                key={pt.id}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full ${p.colorClass}`}
                style={{ width: pt.s, height: pt.s }}
                initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
                animate={{
                  x: pt.dx,
                  y: pt.dy,
                  opacity: 0,
                  rotate: pt.r,
                  scale: 0.6,
                }}
                transition={{ duration: pt.t / 1000, ease: "easeOut" }}
              />
            ))}

            {/* متن کوچولو */}
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-yellow-700"
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -24, opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              +1
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* بادکنک‌ها */}
      <AnimatePresence>
        {balloons.map((b) => (
          <motion.button
            key={b.id}
            initial={{ y: 480, opacity: 0 }}
            animate={{ y: -160, opacity: 1 }}
            exit={{ scale: 1.25, opacity: 0 }}
            transition={{ duration: b.speed / 1000, ease: "linear" }}
            onClick={(e) => popBalloon(b, e)}
            className={`absolute z-10 rounded-full ${b.color} shadow-xl border border-white/50`}
            style={{
              left: `${b.left}%`,
              width: b.size,
              height: b.size,
            }}
            aria-label="بادکنک"
            title="بترکون!"
            whileTap={{ scale: 0.92 }}
          >
            {/* برق کوچک روی بادکنک */}
            <span
              className="absolute top-3 left-3 w-3 h-5 rounded-full bg-white/50"
              style={{ filter: "blur(0.5px)" }}
            />
          </motion.button>
        ))}
      </AnimatePresence>

      {/* پایان بازی */}
      {gameOver && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center text-center z-40"
        >
          <div className="text-3xl mb-2">🎉 عالی!</div>
          <div className="text-gray-700 mb-4">
            امتیاز نهایی: <span className="font-bold">{score}</span>
          </div>
          <button
            onClick={restart}
            className="px-6 py-3 rounded-xl bg-yellow-500 text-white font-bold shadow hover:brightness-105 transition"
          >
            شروع دوباره
          </button>
        </motion.div>
      )}
    </div>
  );
}
