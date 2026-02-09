import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const rand = (min, max) => Math.random() * (max - min) + min;
const makeId = () => `${Date.now()}-${Math.random()}`;

const BEST_KEY = "genino_neonAim_best_v1";

const neonGradient = (kind) => {
  if (kind === "cyan")
    return "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(34,211,238,0.95) 35%, rgba(8,145,178,0.9) 65%, rgba(2,6,23,0) 100%)";
  if (kind === "pink")
    return "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(236,72,153,0.92) 35%, rgba(190,24,93,0.88) 65%, rgba(2,6,23,0) 100%)";
  return "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(250,204,21,0.92) 35%, rgba(202,138,4,0.88) 65%, rgba(2,6,23,0) 100%)";
};

const kindShadow = (kind) => {
  if (kind === "cyan") return "0 0 26px rgba(34,211,238,0.28)";
  if (kind === "pink") return "0 0 26px rgba(236,72,153,0.24)";
  return "0 0 30px rgba(250,204,21,0.22)";
};

function loadBest() {
  try {
    const v = Number(localStorage.getItem(BEST_KEY) || "0");
    return Number.isFinite(v) ? v : 0;
  } catch {
    return 0;
  }
}
function saveBest(v) {
  try {
    localStorage.setItem(BEST_KEY, String(v));
  } catch {}
}

export default function NeonAimShooterGame({
  duration = 25,
  maxTargets = 3,
  spawnEveryMs = 650,
  missPenalty = 2,
  goldenChance = 0.08, // 8% هدف طلایی
  slowMoDurationMs = 500, // 0.5s
  slowMoScale = 0.6, // سرعت زمان هنگام اسلوموشن (کمتر = آهسته‌تر)
}) {
  const boxRef = useRef(null);

  const [targets, setTargets] = useState([]);
  const targetsRef = useRef([]);
  useEffect(() => {
    targetsRef.current = targets;
  }, [targets]);

  const [bursts, setBursts] = useState([]);

  const [score, setScore] = useState(0);
  const [best, setBest] = useState(loadBest());
  const [combo, setCombo] = useState(0);

  const [timeLeft, setTimeLeft] = useState(duration);
  const [gameOver, setGameOver] = useState(false);

  const [shake, setShake] = useState(false);

  // Time scale / Slow-mo
  const [timeScale, setTimeScale] = useState(1);
  const slowMoUntilRef = useRef(0);
  const timeScaleRef = useRef(1);
  useEffect(() => {
    timeScaleRef.current = timeScale;
  }, [timeScale]);

  const sparks = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        top: rand(6, 92),
        left: rand(0, 100),
        size: rand(2, 5),
        dur: rand(1.8, 3.6),
        op: rand(0.12, 0.55),
      })),
    []
  );

  // Timer (real time)
  useEffect(() => {
    if (gameOver) return;
    if (timeLeft <= 0) {
      setGameOver(true);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, gameOver]);

  // Spawn loop (dynamic, uses timeScale to "slow" spawning during slow-mo)
  useEffect(() => {
    if (gameOver) return;

    let stopped = false;
    const loop = () => {
      if (stopped || gameOver) return;

      setTargets((prev) => {
        if (prev.length >= maxTargets) return prev;

        const size = rand(54, 88);
        const x = rand(8, 92);
        const y = rand(16, 82);

        const r = Math.random();
        const kind =
          r < goldenChance ? "gold" : r < goldenChance + 0.45 ? "cyan" : "pink";

        // lifeLeft will be decreased by tick * timeScale
        const lifeLeft = rand(900, 1350);

        return [
          ...prev,
          {
            id: makeId(),
            x,
            y,
            size,
            kind,
            lifeLeft,
            points: kind === "gold" ? 10 : kind === "pink" ? 6 : 5,
          },
        ];
      });

      const scale = timeScaleRef.current || 1;
      // slow-mo => spawn slower (bigger delay)
      const nextDelay = clamp(spawnEveryMs / Math.max(0.35, scale), 280, 1400);
      setTimeout(loop, nextDelay);
    };

    const firstDelay = spawnEveryMs;
    const t = setTimeout(loop, firstDelay);

    return () => {
      stopped = true;
      clearTimeout(t);
    };
  }, [gameOver, maxTargets, spawnEveryMs, goldenChance]);

  // Life tick: remove expired targets using timeScale (slow-mo slows decay)
  useEffect(() => {
    if (gameOver) return;

    const tickMs = 70;
    const t = setInterval(() => {
      const scale = timeScaleRef.current || 1;

      setTargets((prev) => {
        if (!prev.length) return prev;

        const next = prev
          .map((tg) => ({ ...tg, lifeLeft: tg.lifeLeft - tickMs * scale }))
          .filter((tg) => tg.lifeLeft > 0);

        // if some expired => combo breaks
        if (next.length !== prev.length) setCombo(0);

        return next;
      });

      // End slow-mo if time passed
      if (slowMoUntilRef.current && Date.now() > slowMoUntilRef.current) {
        slowMoUntilRef.current = 0;
        setTimeScale(1);
      }
    }, tickMs);

    return () => clearInterval(t);
  }, [gameOver]);

  const spawnBurst = (cx, cy, kind) => {
    const id = makeId();
    const parts = Array.from({ length: 20 }).map(() => ({
      id: makeId(),
      dx: rand(-140, 140),
      dy: rand(-140, 90),
      s: rand(6, 14),
      r: rand(-60, 60),
      t: rand(380, 760),
      d: rand(0, 0.12),
    }));

    setBursts((b) => [...b, { id, cx, cy, kind, parts }]);
    setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 950);
  };

  const flashShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 180);
  };

  const triggerSlowMo = () => {
    slowMoUntilRef.current = Date.now() + slowMoDurationMs;
    setTimeScale(slowMoScale);
  };

  const registerScore = (delta) => {
    setScore((s) => {
      const next = s + delta;
      if (next > best) {
        setBest(next);
        saveBest(next);
      }
      return next;
    });
  };

  const hitTarget = (tg, e) => {
    if (gameOver) return;

    // burst position
    const box = boxRef.current?.getBoundingClientRect();
    if (box) {
      const cx = e.clientX - box.left;
      const cy = e.clientY - box.top;
      spawnBurst(cx, cy, tg.kind);
    } else {
      spawnBurst(220, 220, tg.kind);
    }

    // remove target
    setTargets((prev) => prev.filter((x) => x.id !== tg.id));

    // combo + score (combo bonus)
    setCombo((c) => {
      const nextCombo = c + 1;

      // هر 5 کمبو => slow-mo
      if (nextCombo % 5 === 0) triggerSlowMo();

      // bonus: هر 3 تا یک بونس تا سقف 6
      const bonus = clamp(Math.floor(nextCombo / 3), 0, 6);
      registerScore(tg.points + bonus);

      return nextCombo;
    });

    // Rapid-fire feel: سریع یک هدف جدید (اگر جا هست)
    setTargets((prev) => {
      if (prev.length >= maxTargets) return prev;

      const size = rand(54, 88);
      const x = rand(8, 92);
      const y = rand(16, 82);

      const r = Math.random();
      const kind =
        r < goldenChance ? "gold" : r < goldenChance + 0.45 ? "cyan" : "pink";

      const lifeLeft = rand(900, 1350);

      return [
        ...prev,
        { id: makeId(), x, y, size, kind, lifeLeft, points: kind === "gold" ? 10 : kind === "pink" ? 6 : 5 },
      ];
    });
  };

  // miss click
  const miss = () => {
    if (gameOver) return;
    setCombo(0);
    flashShake();
    registerScore(-missPenalty);
  };

  const restart = () => {
    setTargets([]);
    setBursts([]);
    setScore(0);
    setCombo(0);
    setTimeLeft(duration);
    setGameOver(false);
    setShake(false);
    setTimeScale(1);
    slowMoUntilRef.current = 0;
  };

  return (
    <div
      ref={boxRef}
      className={`relative h-[470px] rounded-3xl border border-yellow-200 overflow-hidden select-none
        bg-gradient-to-b from-[#070a1a] via-[#050815] to-[#020617]
        ${shake ? "animate-[wiggle_0.18s_ease-in-out_1]" : ""}`}
      style={{ touchAction: "manipulation" }}
      onMouseDown={(e) => {
        const isTarget = e.target?.closest?.("[data-target]");
        if (!isTarget) miss();
      }}
      onTouchStart={(e) => {
        const isTarget = e.target?.closest?.("[data-target]");
        if (!isTarget) miss();
      }}
    >
      <style>{`
        @keyframes wiggle {
          0% { transform: translate(0,0); }
          25% { transform: translate(4px, -2px); }
          50% { transform: translate(-3px, 3px); }
          75% { transform: translate(3px, 1px); }
          100% { transform: translate(0,0); }
        }
      `}</style>

      {/* HUD */}
      <div className="absolute top-3 left-3 right-3 z-30 flex justify-between text-sm text-white">
        <div className="flex items-center gap-2">
          ⏱ {timeLeft}s
          <span className="text-white/35">|</span>
          🎯 امتیاز: <span className="font-bold text-yellow-200">{score}</span>
          <span className="text-white/35">|</span>
          🏆 رکورد: <span className="font-bold">{best}</span>
        </div>

        <div className="flex items-center gap-2 text-xs bg-white/10 border border-white/15 rounded-full px-3 py-1">
          Combo: <span className="font-bold text-yellow-300">{combo}</span>
          {timeScale !== 1 && (
            <>
              <span className="text-white/35">|</span>
              <span className="text-cyan-200 font-bold">Slow-Mo</span>
            </>
          )}
        </div>
      </div>

      {/* background glow + sparks */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-24 left-0 right-0 h-72 opacity-70"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(34,211,238,0.35), transparent 55%), radial-gradient(circle at 70% 45%, rgba(236,72,153,0.30), transparent 55%), radial-gradient(circle at 55% 20%, rgba(250,204,21,0.16), transparent 50%)",
          }}
        />
        {sparks.map((s) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              opacity: s.op,
              background: "white",
              boxShadow: "0 0 12px rgba(34,211,238,0.55)",
            }}
            animate={{ opacity: [s.op, 1, s.op], y: [0, -8, 0] }}
            transition={{ duration: s.dur, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Targets */}
      <AnimatePresence>
        {targets.map((tg) => (
          <motion.button
            key={tg.id}
            data-target
            onMouseDown={(e) => {
              e.stopPropagation();
              hitTarget(tg, e);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              const touch = e.touches?.[0];
              if (touch) hitTarget(tg, { clientX: touch.clientX, clientY: touch.clientY });
            }}
            className="absolute rounded-full"
            style={{
              left: `${tg.x}%`,
              top: `${tg.y}%`,
              width: tg.size,
              height: tg.size,
              transform: "translate(-50%, -50%)",
              background: neonGradient(tg.kind),
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow: kindShadow(tg.kind),
            }}
            initial={{ scale: 0.55, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 1.25, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            aria-label="هدف"
          >
            {/* outer ring */}
            <motion.div
              className="absolute inset-2 rounded-full border"
              style={{
                borderColor:
                  tg.kind === "cyan"
                    ? "rgba(34,211,238,0.55)"
                    : tg.kind === "pink"
                    ? "rgba(236,72,153,0.55)"
                    : "rgba(250,204,21,0.65)",
              }}
              animate={{ opacity: [0.25, 0.95, 0.25], scale: [0.95, 1.10, 0.95] }}
              transition={{ duration: 0.55, repeat: Infinity }}
            />

            {/* inner ring */}
            <motion.div
              className="absolute inset-[18px] rounded-full border"
              style={{
                borderColor:
                  tg.kind === "cyan"
                    ? "rgba(34,211,238,0.35)"
                    : tg.kind === "pink"
                    ? "rgba(236,72,153,0.35)"
                    : "rgba(250,204,21,0.45)",
              }}
              animate={{ opacity: [0.15, 0.7, 0.15], scale: [0.95, 1.06, 0.95] }}
              transition={{ duration: 0.65, repeat: Infinity }}
            />

            {/* center dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-white/85" />
            </div>

            {/* golden badge */}
            {tg.kind === "gold" && (
              <div className="absolute -top-2 -right-2 text-[11px] px-2 py-[2px] rounded-full bg-yellow-300 text-black font-extrabold shadow">
                GOLD
              </div>
            )}

            {/* life bar */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[70%] h-[5px] rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full"
                style={{
                  background:
                    tg.kind === "gold"
                      ? "linear-gradient(90deg, rgba(250,204,21,0.95), rgba(202,138,4,0.9))"
                      : tg.kind === "cyan"
                      ? "linear-gradient(90deg, rgba(34,211,238,0.95), rgba(8,145,178,0.85))"
                      : "linear-gradient(90deg, rgba(236,72,153,0.92), rgba(190,24,93,0.85))",
                }}
                animate={{ width: `${clamp((tg.lifeLeft / 1350) * 100, 0, 100)}%` }}
                transition={{ duration: 0.08, ease: "linear" }}
              />
            </div>
          </motion.button>
        ))}
      </AnimatePresence>

      {/* Bursts */}
      <AnimatePresence>
        {bursts.map((b) => (
          <motion.div
            key={b.id}
            className="absolute z-40 pointer-events-none"
            style={{ left: b.cx, top: b.cy }}
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
                  b.kind === "cyan"
                    ? "rgba(34,211,238,0.80)"
                    : b.kind === "pink"
                    ? "rgba(236,72,153,0.80)"
                    : "rgba(250,204,21,0.85)",
                boxShadow: kindShadow(b.kind),
              }}
              initial={{ scale: 0.2, opacity: 0.95 }}
              animate={{ scale: 3.6, opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            />
            {b.parts.map((pt) => (
              <motion.div
                key={pt.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: pt.s,
                  height: pt.s,
                  background: "radial-gradient(circle, #fde047, #fb7185, #22d3ee)",
                  boxShadow: "0 0 10px rgba(251,191,36,0.35)",
                }}
                initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
                animate={{ x: pt.dx, y: pt.dy, opacity: 0, rotate: pt.r, scale: 0.6 }}
                transition={{ duration: pt.t / 1000, ease: "easeOut", delay: pt.d }}
              />
            ))}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Hint */}
      <div className="absolute bottom-3 left-0 right-0 z-30 text-center text-xs text-slate-300">
        روی هدف‌ها بزن 🎯 (کلیک اشتباه امتیاز کم می‌کند) — هر 5 کمبو: Slow-Mo ⚡
      </div>

      {/* Game Over */}
      {gameOver && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-center text-white"
        >
          <div className="text-3xl mb-2">🏁 پایان!</div>
          <div className="mb-1">
            امتیاز نهایی: <span className="font-bold">{score}</span>
          </div>
          <div className="mb-4 text-sm text-white/80">
            رکورد: <span className="font-bold">{best}</span>
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
