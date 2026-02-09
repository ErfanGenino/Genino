import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const makeId = () => `${Date.now()}-${Math.random()}`;

const randomBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

export default function FireflyCatchGame({ duration = 25 }) {
  const [flies, setFlies] = useState([]);
  const [pops, setPops] = useState([]); // افکت نورانی هنگام گرفتن
  const [score, setScore] = useState(0);

  const [timeLeft, setTimeLeft] = useState(duration);
  const [gameOver, setGameOver] = useState(false);

  // Combo
  const [combo, setCombo] = useState(0);
  const [comboText, setComboText] = useState(null); // "Perfect!" ...
  const lastCatchRef = useRef(0);
  const comboTimerRef = useRef(null);

  // مرحله/سطح کوچک برای جذابیت
  const level = useMemo(() => {
    if (score >= 35) return 4;
    if (score >= 20) return 3;
    if (score >= 10) return 2;
    return 1;
  }, [score]);

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

  // تولید کرم شب‌تاب
  useEffect(() => {
    if (gameOver) return;

    // با لول، سرعت تولید بیشتر
    const spawnMs = level === 1 ? 800 : level === 2 ? 700 : level === 3 ? 620 : 560;

    const interval = setInterval(() => {
      const typeRand = Math.random();
      let type = "normal";
      if (typeRand > 0.86) type = "gold";
      else if (typeRand < 0.14) type = "bad";

      setFlies((prev) => [
        ...prev,
        {
          id: makeId(),
          x: randomBetween(6, 90),
          y: randomBetween(18, 82),
          size: type === "gold" ? 36 : 28,
          type,
        },
      ]);
    }, spawnMs);

    return () => clearInterval(interval);
  }, [gameOver, level]);

  // پاکسازی لیست برای سبک موندن
  useEffect(() => {
    if (gameOver) return;
    const cleaner = setInterval(() => {
      setFlies((prev) => prev.slice(-16));
    }, 2000);
    return () => clearInterval(cleaner);
  }, [gameOver]);

  // نوار زمان
  const timePct = useMemo(() => {
    const v = (timeLeft / duration) * 100;
    return Number.isFinite(v) ? clamp(v, 0, 100) : 0;
  }, [timeLeft, duration]);

  // افکت نورانی (ذرات + رینگ)
  const spawnPop = ({ x, y, kind }) => {
    const id = makeId();
    const particles = Array.from({ length: kind === "gold" ? 14 : 10 }).map(() => ({
      id: makeId(),
      dx: randomBetween(-80, 80),
      dy: randomBetween(-90, 25),
      s: randomBetween(6, 12),
      r: randomBetween(-25, 25),
      t: randomBetween(420, 650),
      o: Math.random() * 0.35,
    }));

    setPops((prev) => [
      ...prev,
      {
        id,
        x,
        y,
        kind,
        particles,
      },
    ]);

    setTimeout(() => {
      setPops((prev) => prev.filter((p) => p.id !== id));
    }, 800);
  };

  // محاسبه امتیاز با combo
  const getBasePoints = (type) => {
    if (type === "gold") return 3;
    if (type === "bad") return -1;
    return 1;
  };

  const showComboText = (c) => {
    if (c >= 6) return "🔥 PERFECT!";
    if (c >= 4) return "✨ NICE!";
    if (c >= 2) return "👍 GOOD!";
    return null;
  };

  const catchFly = (fly, e) => {
    if (gameOver) return;

    // مختصات کلیک برای افکت
    const stage = e.currentTarget.closest("[data-firefly-stage]");
    if (stage) {
      const rect = stage.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      spawnPop({ x: cx, y: cy, kind: fly.type });
    }

    // combo logic: اگر بین دو گرفتن کمتر از 900ms باشد combo++
    const now = Date.now();
    const delta = now - lastCatchRef.current;
    const withinCombo = delta > 0 && delta <= 900;

    lastCatchRef.current = now;

    setCombo((prev) => {
      const next = withinCombo ? prev + 1 : 1;

      // نمایش متن
      const txt = showComboText(next);
      if (txt) {
        setComboText(txt);
        setTimeout(() => setComboText(null), 650);
      }

      // ریست خودکار combo بعد از وقفه
      if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
      comboTimerRef.current = setTimeout(() => {
        setCombo(0);
      }, 1100);

      return next;
    });

    const base = getBasePoints(fly.type);

    // ضریب کمبو: 1x, 1.2x, 1.4x, 1.7x, 2x ...
    // برای bad ضریب اعمال نمی‌کنیم که بازی منصفانه بماند
    const multiplier = base > 0 ? clamp(1 + (combo > 0 ? combo * 0.15 : 0), 1, 2.2) : 1;

    const gained = Math.round(base * multiplier);
    setScore((s) => Math.max(0, s + gained));

    setFlies((prev) => prev.filter((f) => f.id !== fly.id));
  };

  const restart = () => {
    setScore(0);
    setTimeLeft(duration);
    setGameOver(false);
    setFlies([]);
    setPops([]);
    setCombo(0);
    setComboText(null);
    lastCatchRef.current = 0;
    if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
  };

  return (
    <div
      data-firefly-stage
      className="relative h-[460px] pt-16 rounded-3xl border border-yellow-200 bg-gradient-to-b from-[#0f172a] via-[#020617] to-[#020617] overflow-hidden"
    >
      {/* ستاره‌ها */}
      <div className="absolute inset-0 opacity-45 pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{
              top: `${randomBetween(0, 100)}%`,
              left: `${randomBetween(0, 100)}%`,
            }}
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{
              duration: randomBetween(2, 5),
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* مه/نور پس زمینه */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <motion.div
          className="absolute -top-16 left-6 w-44 h-44 rounded-full bg-emerald-300/20"
          animate={{ y: [0, 18, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "blur(14px)" }}
        />
        <motion.div
          className="absolute top-24 right-10 w-60 h-60 rounded-full bg-yellow-300/15"
          animate={{ y: [0, 22, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "blur(16px)" }}
        />
      </div>

      {/* هدر */}
      <div className="absolute top-3 left-3 right-3 z-30 flex justify-between text-sm text-white">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-yellow-300" />
          ⏱ {timeLeft}s
        </div>
        <div className="flex items-center gap-3">
          <div className="text-slate-200">Level {level}</div>
          <div>✨ امتیاز: {score}</div>
        </div>
      </div>

      {/* نوار زمان */}
      <div className="absolute top-10 left-3 right-3 z-30">
        <div className="h-3 rounded-full bg-white/15 border border-white/20 overflow-hidden">
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: `${timePct}%` }}
            transition={{ type: "tween", duration: 0.2 }}
            className="h-full bg-yellow-400"
          />
        </div>
      </div>

      {/* راهنما + کمبو */}
      <div className="absolute top-14 left-0 right-0 z-30 text-center text-xs text-slate-300">
        کرم‌های نورانی رو بگیر ✨ | طلایی = +۳ | تیره = −۱
      </div>

      <div className="absolute top-[74px] left-0 right-0 z-30 flex items-center justify-center gap-3">
        <div className="text-xs text-white/90 bg-white/10 border border-white/15 rounded-full px-3 py-1">
          Combo: <span className="font-bold">{combo}</span>
        </div>

        <AnimatePresence>
          {comboText && (
            <motion.div
              key={comboText}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              className="text-xs font-extrabold text-yellow-300"
            >
              {comboText}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* افکت‌های نورانی (پاپ) */}
      <AnimatePresence>
        {pops.map((p) => (
          <motion.div
            key={p.id}
            className="absolute z-40 pointer-events-none"
            style={{ left: p.x, top: p.y }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* رینگ */}
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
              style={{
                width: 10,
                height: 10,
                borderColor:
                  p.kind === "gold"
                    ? "rgba(250,204,21,0.9)"
                    : p.kind === "bad"
                    ? "rgba(148,163,184,0.6)"
                    : "rgba(74,222,128,0.85)",
                boxShadow:
                  p.kind === "gold"
                    ? "0 0 14px rgba(250,204,21,0.7)"
                    : p.kind === "bad"
                    ? "0 0 8px rgba(148,163,184,0.35)"
                    : "0 0 12px rgba(74,222,128,0.6)",
              }}
              initial={{ scale: 0.2, opacity: 0.9 }}
              animate={{ scale: p.kind === "gold" ? 3 : 2.6, opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            />

            {/* ذرات */}
            {p.particles.map((pt) => (
              <motion.div
                key={pt.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: pt.s,
                  height: pt.s,
                  background:
                    p.kind === "gold"
                      ? "radial-gradient(circle, #fde047, #facc15, #ca8a04)"
                      : p.kind === "bad"
                      ? "radial-gradient(circle, #94a3b8, #334155)"
                      : "radial-gradient(circle, #bbf7d0, #4ade80)",
                  boxShadow:
                    p.kind === "gold"
                      ? "0 0 10px rgba(250,204,21,0.7)"
                      : p.kind === "bad"
                      ? "0 0 6px rgba(148,163,184,0.25)"
                      : "0 0 8px rgba(74,222,128,0.6)",
                }}
                initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
                animate={{
                  x: pt.dx,
                  y: pt.dy,
                  opacity: 0,
                  rotate: pt.r,
                  scale: 0.6,
                }}
                transition={{ duration: pt.t / 1000, ease: "easeOut", delay: pt.o }}
              />
            ))}

            {/* امتیاز کوچک */}
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-yellow-200"
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -24, opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              ✨
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* کرم‌ها */}
      <AnimatePresence>
        {flies.map((f) => (
          <motion.button
            key={f.id}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [0, randomBetween(-34, 34), 0],
              y: [0, randomBetween(-34, 34), 0],
            }}
            exit={{ opacity: 0, scale: 0.2 }}
            transition={{ duration: 3, ease: "easeInOut" }}
            onClick={(e) => catchFly(f, e)}
            className="absolute rounded-full z-20"
            style={{
              left: `${f.x}%`,
              top: `${f.y}%`,
              width: f.size,
              height: f.size,
              background:
                f.type === "gold"
                  ? "radial-gradient(circle, #fde047, #facc15, #ca8a04)"
                  : f.type === "bad"
                  ? "radial-gradient(circle, #64748b, #1e293b)"
                  : "radial-gradient(circle, #bbf7d0, #4ade80)",
              boxShadow:
                f.type === "gold"
                  ? "0 0 22px rgba(250,204,21,0.9)"
                  : f.type === "bad"
                  ? "0 0 10px rgba(100,116,139,0.55)"
                  : "0 0 16px rgba(74,222,128,0.85)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
            aria-label="کرم شب‌تاب"
            whileTap={{ scale: 0.85 }}
            title={
              f.type === "gold" ? "طلایی (+3)" : f.type === "bad" ? "تیره (-1)" : "+1"
            }
          >
            {/* برق روی کرم */}
            <span
              className="absolute top-2 left-2 w-2.5 h-4 rounded-full bg-white/35"
              style={{ filter: "blur(0.6px)" }}
            />
          </motion.button>
        ))}
      </AnimatePresence>

      {/* پایان */}
      {gameOver && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-center text-white z-50"
        >
          <div className="text-3xl mb-2">🌙 تموم شد!</div>
          <div className="mb-4">
            امتیاز نهایی: <span className="font-bold">{score}</span>
          </div>
          <button
            onClick={restart}
            className="px-6 py-3 rounded-xl bg-yellow-400 text-black font-bold hover:brightness-105 transition"
          >
            دوباره بازی کن
          </button>
        </motion.div>
      )}
    </div>
  );
}
