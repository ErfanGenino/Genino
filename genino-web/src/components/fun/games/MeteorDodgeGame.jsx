import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const makeId = () => `${Date.now()}-${Math.random()}`;
const rand = (min, max) => Math.random() * (max - min) + min;
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

const LEVELS = [
  { id: 1, label: "مرحله ۱", duration: 18, speedMult: 1.0, spawnMult: 1.0 },
  { id: 2, label: "مرحله ۲", duration: 18, speedMult: 1.15, spawnMult: 1.12 },
  { id: 3, label: "مرحله ۳", duration: 18, speedMult: 1.32, spawnMult: 1.25 },
  { id: 4, label: "مرحله ۴", duration: 18, speedMult: 1.55, spawnMult: 1.45 },
  { id: 5, label: "مرحله ۵", duration: 18, speedMult: 1.8, spawnMult: 1.7 },
];

const LS_BEST = "genino_meteor_best";
const LS_HISTORY = "genino_meteor_history";

function loadBest() {
  const raw = localStorage.getItem(LS_BEST);
  return raw ? Number(raw) || 0 : 0;
}
function loadHistory() {
  try {
    const raw = localStorage.getItem(LS_HISTORY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}
function saveRecord({ score, levelReached }) {
  const now = new Date().toISOString();

  const best = loadBest();
  if (score > best) localStorage.setItem(LS_BEST, String(score));

  const history = loadHistory();
  const next = [
    { at: now, score, levelReached },
    ...history,
  ].slice(0, 20);

  localStorage.setItem(LS_HISTORY, JSON.stringify(next));
  return { best: Math.max(best, score), history: next };
}

export default function MeteorDodgeGame5Levels({ livesStart = 3 }) {
  const stageRef = useRef(null);

  // مرحله
  const [levelIndex, setLevelIndex] = useState(0);
  const level = LEVELS[levelIndex];

  // بازی
  const [shipX, setShipX] = useState(50); // درصد
  const [meteors, setMeteors] = useState([]);
  const [pops, setPops] = useState([]);

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(level.duration);

  const [lives, setLives] = useState(livesStart);
  const [invincible, setInvincible] = useState(false);

  const [combo, setCombo] = useState(0);
  const [comboText, setComboText] = useState(null);
  const lastGoldRef = useRef(0);
  const comboTimerRef = useRef(null);

  const [shake, setShake] = useState(false);

  const [gameOver, setGameOver] = useState(false);
  const [betweenLevels, setBetweenLevels] = useState(false); // نمایش بین مرحله‌ها

  // رکوردها
  const [bestScore, setBestScore] = useState(0);

  // ستاره‌ها (یکبار)
  const stars = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        top: rand(0, 100),
        left: rand(0, 100),
        size: rand(1, 2.2),
        dur: rand(2.2, 5.5),
        op: rand(0.25, 0.8),
      })),
    []
  );

  // بهترین رکورد را اول کار بخوان
  useEffect(() => {
    try {
      setBestScore(loadBest());
    } catch {}
  }, []);

  // وقتی مرحله عوض شد، تایمر مرحله ریست شود (اگر بازی تمام نشده)
  useEffect(() => {
    if (gameOver) return;
    setTimeLeft(level.duration);
    setBetweenLevels(true);
    const t = setTimeout(() => setBetweenLevels(false), 750);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelIndex]);

  // تایمر مرحله
  useEffect(() => {
    if (gameOver) return;
    if (betweenLevels) return;

    if (timeLeft <= 0) {
      // مرحله تمام شد
      const isLast = levelIndex === LEVELS.length - 1;
      if (isLast) {
        // پایان کل بازی با موفقیت
        setGameOver(true);
      } else {
        setLevelIndex((i) => i + 1);
      }
      return;
    }

    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, gameOver, betweenLevels, levelIndex]);

  // امتیاز با زنده‌ماندن
  useEffect(() => {
    if (gameOver) return;
    if (betweenLevels) return;
    const interval = setInterval(() => setScore((s) => s + 1), 250);
    return () => clearInterval(interval);
  }, [gameOver, betweenLevels]);

  // سختی درون مرحله (مثل قبل) + سختی مرحله‌ای
  const difficulty = useMemo(() => level.duration - timeLeft, [level.duration, timeLeft]);

  // تولید شهاب‌سنگ‌ها (سریع‌تر + بیشتر در مراحل بالاتر)
  useEffect(() => {
    if (gameOver) return;
    if (betweenLevels) return;

    // پایه مثل نسخه تو، اما با multipliers مرحله
    const baseSpawn = clamp(820 - difficulty * 14, 320, 820);
    const spawnMs = clamp(baseSpawn / level.spawnMult, 180, 900);

    const interval = setInterval(() => {
      const isGold = Math.random() < 0.18;

      // سرعت سقوط: هرچه speedMult بالاتر، duration انیمیشن کمتر
      const baseSpeed = isGold ? rand(2.3, 3.2) : rand(2.6, 3.7);
      const speed = (baseSpeed - difficulty * 0.02) / level.speedMult;

      setMeteors((prev) => [
        ...prev,
        {
          id: makeId(),
          x: rand(4, 92),
          size: isGold ? rand(28, 44) : rand(34, 62),
          speed: Math.max(1.0, speed),
          rot: rand(-90, 90),
          type: isGold ? "gold" : "normal",
        },
      ]);
    }, spawnMs);

    return () => clearInterval(interval);
  }, [gameOver, betweenLevels, difficulty, level.spawnMult, level.speedMult]);

  // پاکسازی
  useEffect(() => {
    if (gameOver) return;
    const cleaner = setInterval(() => setMeteors((prev) => prev.slice(-24)), 1200);
    return () => clearInterval(cleaner);
  }, [gameOver]);

  // حرکت سفینه با ماوس/تاچ
  const onMove = (clientX) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setShipX(clamp(x, 6, 94));
  };

  const onMouseMove = (e) => !gameOver && onMove(e.clientX);
  const onTouchMove = (e) => {
    if (gameOver) return;
    const t = e.touches?.[0];
    if (t) onMove(t.clientX);
  };

  // افکت انفجار
  const spawnExplosion = (cx, cy, kind = "hit") => {
    const id = makeId();
    const particles = Array.from({ length: kind === "gold" ? 16 : 14 }).map(() => ({
      id: makeId(),
      dx: rand(-90, 90),
      dy: rand(-110, 30),
      s: rand(6, 14),
      r: rand(-30, 30),
      t: rand(420, 700),
      o: rand(0, 0.2),
    }));
    setPops((prev) => [...prev, { id, cx, cy, particles, kind }]);
    setTimeout(() => setPops((prev) => prev.filter((p) => p.id !== id)), 900);
  };

  const flashShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 250);
  };

  // کمبو طلایی
  const showComboText = (c) => {
    if (c >= 6) return "🔥 PERFECT!";
    if (c >= 4) return "✨ NICE!";
    if (c >= 2) return "👍 GOOD!";
    return null;
  };

  const addGoldCombo = () => {
    const now = Date.now();
    const delta = now - lastGoldRef.current;
    const within = delta > 0 && delta <= 1200;
    lastGoldRef.current = now;

    setCombo((prev) => {
      const next = within ? prev + 1 : 1;

      const txt = showComboText(next);
      if (txt) {
        setComboText(txt);
        setTimeout(() => setComboText(null), 650);
      }

      if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
      comboTimerRef.current = setTimeout(() => setCombo(0), 1400);

      return next;
    });
  };

  const takeDamage = () => {
    if (invincible) return;

    setCombo(0);
    setLives((lv) => {
      const next = lv - 1;
      if (next <= 0) {
        setGameOver(true);
      } else {
        setInvincible(true);
        setTimeout(() => setInvincible(false), 1000);
      }
      return next;
    });
  };

  // برخورد واقعی با DOM
  useEffect(() => {
    if (gameOver) return;
    if (betweenLevels) return;

    const tick = setInterval(() => {
      const stage = stageRef.current;
      if (!stage) return;

      const shipEl = stage.querySelector("[data-ship]");
      const meteorEls = stage.querySelectorAll("[data-meteor]");
      if (!shipEl || meteorEls.length === 0) return;

      const shipRect = shipEl.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();

      for (const el of meteorEls) {
        const r = el.getBoundingClientRect();
        const overlap =
          r.left < shipRect.right &&
          r.right > shipRect.left &&
          r.top < shipRect.bottom &&
          r.bottom > shipRect.top;

        if (overlap) {
          const id = el.getAttribute("data-id");
          const type = el.getAttribute("data-type") || "normal";

          const cx = (r.left + r.right) / 2 - stageRect.left;
          const cy = (r.top + r.bottom) / 2 - stageRect.top;

          setMeteors((prev) => prev.filter((m) => m.id !== id));

          if (type === "gold") {
            addGoldCombo();
            const mult = clamp(1 + combo * 0.2, 1, 2.4);
            const gained = Math.round(12 * mult);
            setScore((s) => s + gained);
            spawnExplosion(cx, cy, "gold");
          } else {
            spawnExplosion(cx, cy, "hit");
            flashShake();
            takeDamage();
          }
          break;
        }
      }
    }, 60);

    return () => clearInterval(tick);
  }, [gameOver, betweenLevels, combo, invincible]);

  // ثبت رکورد هر بار که gameOver شد (فقط یکبار)
  const recordedRef = useRef(false);
  useEffect(() => {
    if (!gameOver) {
      recordedRef.current = false;
      return;
    }
    if (recordedRef.current) return;
    recordedRef.current = true;

    try {
      const { best } = saveRecord({
        score,
        levelReached: LEVELS[levelIndex]?.id ?? 1,
      });
      setBestScore(best);
    } catch {}
  }, [gameOver, score, levelIndex]);

  const restartAll = () => {
    setShipX(50);
    setMeteors([]);
    setPops([]);

    setScore(0);

    setLevelIndex(0);
    setTimeLeft(LEVELS[0].duration);

    setLives(livesStart);
    setInvincible(false);

    setCombo(0);
    setComboText(null);
    lastGoldRef.current = 0;
    if (comboTimerRef.current) clearTimeout(comboTimerRef.current);

    setShake(false);
    setBetweenLevels(false);
    setGameOver(false);
  };

  const timePct = useMemo(
    () => clamp((timeLeft / level.duration) * 100, 0, 100),
    [timeLeft, level.duration]
  );

  return (
    <div
      ref={stageRef}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      className={`relative h-[470px] pt-16 rounded-3xl border border-yellow-200 overflow-hidden select-none
        bg-gradient-to-b from-[#0b1026] via-[#050815] to-[#020617]
        ${shake ? "animate-[wiggle_0.25s_ease-in-out_1]" : ""}`}
      style={{ touchAction: "none" }}
    >
      <style>{`
        @keyframes wiggle {
          0% { transform: translate(0,0); }
          25% { transform: translate(6px, -2px); }
          50% { transform: translate(-5px, 3px); }
          75% { transform: translate(4px, 2px); }
          100% { transform: translate(0,0); }
        }
      `}</style>

      {/* ستاره‌ها */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((s) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              opacity: s.op,
            }}
            animate={{ opacity: [s.op, 1, s.op] }}
            transition={{ duration: s.dur, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* هدر */}
      <div className="absolute top-3 left-3 right-3 z-30 flex justify-between text-sm text-white">
        <div className="flex items-center gap-2">
          <span className="text-yellow-300 font-bold">{level.label}</span>
          <span className="text-white/40">|</span>
          ⏱ {timeLeft}s
          <span className="text-white/40">|</span>
          <span>🚀 امتیاز: {score}</span>
          <span className="text-white/40">|</span>
          <span className="text-white/80">🏆 رکورد: {bestScore}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: livesStart }).map((_, i) => (
              <span key={i} className={i < lives ? "opacity-100" : "opacity-25"}>
                ❤️
              </span>
            ))}
          </div>
          <div className="text-xs bg-white/10 border border-white/15 rounded-full px-3 py-1">
            Combo: <span className="font-bold">{combo}</span>
          </div>
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

      {/* راهنما */}
      <div className="absolute top-14 left-0 right-0 z-30 text-center text-xs text-slate-300">
        سفینه رو حرکت بده و فرار کن ☄️ | شهاب طلایی رو بگیر: امتیاز + کمبو ✨
      </div>

      {/* متن کمبو */}
      <AnimatePresence>
        {comboText && (
          <motion.div
            key={comboText}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="absolute top-20 left-0 right-0 z-40 text-center text-yellow-300 font-extrabold"
          >
            {comboText}
          </motion.div>
        )}
      </AnimatePresence>

      {/* افکت انفجار */}
      <AnimatePresence>
        {pops.map((p) => (
          <motion.div
            key={p.id}
            className="absolute z-40 pointer-events-none"
            style={{ left: p.cx, top: p.cy }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
              style={{
                width: 10,
                height: 10,
                borderColor:
                  p.kind === "gold" ? "rgba(250,204,21,0.95)" : "rgba(250,204,21,0.75)",
                boxShadow:
                  p.kind === "gold"
                    ? "0 0 18px rgba(250,204,21,0.75)"
                    : "0 0 14px rgba(250,204,21,0.45)",
              }}
              initial={{ scale: 0.2, opacity: 0.95 }}
              animate={{ scale: p.kind === "gold" ? 3.6 : 3.2, opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            />
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
                      : "radial-gradient(circle, #fde047, #fb7185, #60a5fa)",
                  boxShadow:
                    p.kind === "gold"
                      ? "0 0 10px rgba(250,204,21,0.5)"
                      : "0 0 10px rgba(251,191,36,0.35)",
                }}
                initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
                animate={{ x: pt.dx, y: pt.dy, opacity: 0, rotate: pt.r, scale: 0.6 }}
                transition={{ duration: pt.t / 1000, ease: "easeOut", delay: pt.o }}
              />
            ))}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* شهاب‌سنگ‌ها */}
      <AnimatePresence>
        {meteors.map((m) => (
          <motion.div
            key={m.id}
            data-meteor
            data-id={m.id}
            data-type={m.type}
            className="absolute z-10"
            style={{
              left: `${m.x}%`,
              width: m.size,
              height: m.size,
            }}
            initial={{ y: -90, opacity: 0 }}
            animate={{ y: 540, opacity: 1, rotate: m.rot }}
            exit={{ opacity: 0 }}
            transition={{ duration: Math.max(0.9, m.speed), ease: "linear" }}
            onAnimationComplete={() => {
              setMeteors((prev) => prev.filter((x) => x.id !== m.id));
            }}
          >
            <div
              className="w-full h-full rounded-2xl"
              style={{
                background:
                  m.type === "gold"
                    ? "radial-gradient(circle at 30% 30%, #fde047, #facc15, #ca8a04)"
                    : "radial-gradient(circle at 30% 30%, #9ca3af, #475569, #0f172a)",
                boxShadow:
                  m.type === "gold"
                    ? "0 0 18px rgba(250,204,21,0.45)"
                    : "0 0 18px rgba(148,163,184,0.22)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            />

            {/* دنباله */}
            <div
              className="absolute -left-10 top-1/2 -translate-y-1/2 w-10 h-1 rounded-full"
              style={{
                background:
                  m.type === "gold"
                    ? "linear-gradient(90deg, transparent, rgba(250,204,21,0.55))"
                    : "linear-gradient(90deg, transparent, rgba(255,255,255,0.35))",
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* سفینه */}
      <motion.div
        data-ship
        className="absolute z-20 bottom-6 -translate-x-1/2"
        style={{ left: `${shipX}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        <div className={`relative w-14 h-14 ${invincible ? "opacity-70" : "opacity-100"}`}>
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(250,204,21,0.95), rgba(236,72,153,0.85))",
              boxShadow: "0 0 22px rgba(250,204,21,0.35)",
              transform: "rotate(45deg)",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          />

          {invincible && (
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                border: "2px solid rgba(250,204,21,0.45)",
                transform: "rotate(45deg)",
              }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 0.35, repeat: Infinity }}
            />
          )}

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-white/80" />
          </div>

          <motion.div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full"
            animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            style={{
              background:
                "radial-gradient(circle, rgba(251,191,36,1), rgba(239,68,68,0.85), transparent)",
              filter: "blur(0.3px)",
            }}
          />
        </div>
      </motion.div>

      {/* بین مرحله‌ها */}
      {betweenLevels && !gameOver && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 z-50 bg-black/65 backdrop-blur-sm flex flex-col items-center justify-center text-center text-white"
        >
          <div className="text-3xl mb-2">{level.label}</div>
          <div className="text-sm text-white/80 mb-3">
            سرعت بیشتر شد! آماده‌ای؟ 🚀
          </div>
          <div className="text-xs text-white/60">
            (به‌صورت خودکار ادامه می‌ده)
          </div>
        </motion.div>
      )}

      {/* پایان بازی */}
      {gameOver && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-center text-white px-4"
        >
          <div className="text-3xl mb-2">💥 بازی تموم شد!</div>

          <div className="mb-2">
            مرحله‌ای که رسیدی:{" "}
            <span className="font-bold">{LEVELS[levelIndex]?.id ?? 1}</span> / 5
          </div>

          <div className="mb-2">
            امتیاز نهایی: <span className="font-bold">{score}</span>
          </div>

          <div className="mb-5 text-white/80">
            رکورد: <span className="font-bold text-yellow-300">{bestScore}</span>
          </div>

          <button
            onClick={restartAll}
            className="px-6 py-3 rounded-xl bg-yellow-400 text-black font-bold hover:brightness-105 transition"
          >
            دوباره بازی کن
          </button>
        </motion.div>
      )}
    </div>
  );
}
