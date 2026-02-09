import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const rand = (min, max) => Math.random() * (max - min) + min;
const makeId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const LS_BEST = "genino_aurora_switch_best_v1";

const COLORS = [
  {
    key: "aurora",
    label: "Aurora",
    core:
      "radial-gradient(circle at 30% 30%, rgba(110,231,183,1), rgba(16,185,129,0.9), rgba(6,95,70,1))",
    pulse:
      "radial-gradient(circle at 30% 30%, rgba(110,231,183,1), rgba(16,185,129,0.9), rgba(4,120,87,1))",
    glow: "rgba(110,231,183,0.55)",
  },
  {
    key: "violet",
    label: "Violet",
    core:
      "radial-gradient(circle at 30% 30%, rgba(216,180,254,1), rgba(168,85,247,0.9), rgba(76,29,149,1))",
    pulse:
      "radial-gradient(circle at 30% 30%, rgba(216,180,254,1), rgba(168,85,247,0.9), rgba(88,28,135,1))",
    glow: "rgba(216,180,254,0.55)",
  },
  {
    key: "ice",
    label: "Ice",
    core:
      "radial-gradient(circle at 30% 30%, rgba(125,211,252,1), rgba(56,189,248,0.9), rgba(12,74,110,1))",
    pulse:
      "radial-gradient(circle at 30% 30%, rgba(125,211,252,1), rgba(56,189,248,0.9), rgba(7,89,133,1))",
    glow: "rgba(125,211,252,0.55)",
  },
];

function loadBest() {
  try {
    const v = Number(localStorage.getItem(LS_BEST));
    return Number.isFinite(v) ? v : 0;
  } catch {
    return 0;
  }
}
function saveBest(v) {
  try {
    localStorage.setItem(LS_BEST, String(v));
  } catch {}
}

export default function AuroraSwitchGame({ duration = 40, livesStart = 3 }) {
  const [best, setBest] = useState(() => loadBest());
  const [gameOver, setGameOver] = useState(false);

  // برای رندر نرم (30fps)
  const [, setTick] = useState(0);

  // ✅ pops state (فیکس اصلی همین بود)
  const [pops, setPops] = useState([]);

  // refs
  const tLeftRef = useRef(duration);
  const scoreRef = useRef(0);
  const livesRef = useRef(livesStart);

  const colorIndexRef = useRef(0);
  const pulsesRef = useRef([]); // {id, colorIdx, angle, dist, speed}
  const elapsedRef = useRef(0);

  const dashCdRef = useRef(0);
  const dashAnimRef = useRef(0);

  const [toast, setToast] = useState(null);
  const recordedRef = useRef(false);

  const showToast = (txt) => {
    setToast(txt);
    setTimeout(() => setToast(null), 650);
  };

  // ✅ افکت پاپ (برای جذابیت + بدون خطا)
  const spawnPop = (kind = "ok") => {
    const id = makeId();
    const parts = Array.from({ length: kind === "ok" ? 14 : 16 }).map(() => ({
      id: makeId(),
      dx: rand(-120, 120),
      dy: rand(-120, 120),
      s: rand(5, 12),
      r: rand(-60, 60),
      t: rand(420, 720),
      d: rand(0, 0.12),
      kind,
    }));

    setPops((prev) => [...prev, { id, parts, kind }]);
    setTimeout(() => {
      setPops((prev) => prev.filter((p) => p.id !== id));
    }, 900);
  };

  const restart = () => {
    tLeftRef.current = duration;
    scoreRef.current = 0;
    livesRef.current = livesStart;
    colorIndexRef.current = 0;
    pulsesRef.current = [];
    elapsedRef.current = 0;
    dashCdRef.current = 0;
    dashAnimRef.current = 0;
    setToast(null);
    setPops([]);
    setGameOver(false);
  };

  const switchColor = () => {
    if (gameOver) return;
    colorIndexRef.current = (colorIndexRef.current + 1) % COLORS.length;
    showToast("SWITCH");
  };

  const doDash = () => {
    if (gameOver) return;
    if (dashCdRef.current > 0) return;

    dashCdRef.current = 2.2;
    dashAnimRef.current = 0.25;

    pulsesRef.current = pulsesRef.current.map((p) => ({
      ...p,
      dist: Math.min(260, p.dist + 85),
    }));

    showToast("DASH!");
    spawnPop("dash");
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        doDash();
      }
      if (e.code === "ArrowUp" || e.code === "Enter") {
        e.preventDefault();
        switchColor();
      }
    };
    window.addEventListener("keydown", onKey, { passive: false });
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  // spawn pulses
  useEffect(() => {
    if (gameOver) return;

    const i = setInterval(() => {
      const t = elapsedRef.current;
      const density = clamp(1 + t * 0.045, 1, 2.25);
      const chance = 0.65 * density;

      if (Math.random() > chance) return;

      const colorIdx = Math.floor(Math.random() * COLORS.length);
      const angle = rand(0, Math.PI * 2);
      const speed = clamp(rand(62, 92) + t * 1.3, 62, 165);

      pulsesRef.current.push({
        id: makeId(),
        colorIdx,
        angle,
        dist: rand(230, 280),
        speed,
      });

      pulsesRef.current = pulsesRef.current.slice(-28);
    }, 260);

    return () => clearInterval(i);
  }, [gameOver]);

  // main loop
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let acc = 0;

    const loop = (now) => {
      const dt = clamp((now - last) / 1000, 0, 0.05);
      last = now;

      if (!gameOver) {
        elapsedRef.current += dt;

        // timer
        tLeftRef.current = Math.max(0, tLeftRef.current - dt);
        if (tLeftRef.current <= 0) setGameOver(true);

        dashCdRef.current = Math.max(0, dashCdRef.current - dt);
        dashAnimRef.current = Math.max(0, dashAnimRef.current - dt);

        // move pulses
        pulsesRef.current = pulsesRef.current
          .map((p) => ({ ...p, dist: p.dist - p.speed * dt }))
          .filter((p) => p.dist > -10);

        // collision
        const coreR = 34;
        const hits = [];
        const remain = [];

        for (const p of pulsesRef.current) {
          if (p.dist <= coreR) hits.push(p);
          else remain.push(p);
        }

        if (hits.length) {
          const coreColorIdx = colorIndexRef.current;

          for (const p of hits) {
            if (p.colorIdx === coreColorIdx) {
              scoreRef.current += 14;
              showToast("✅ PERFECT");
              spawnPop("ok");
            } else {
              livesRef.current -= 1;
              showToast("❌ WRONG");
              spawnPop("bad");
              if (livesRef.current <= 0) setGameOver(true);
            }
          }
        }

        pulsesRef.current = remain;

        // survival score
        scoreRef.current += dt * 2.4;
      }

      acc += dt;
      if (acc >= 1 / 30) {
        acc = 0;
        setTick((t) => t + 1);
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [gameOver]);

  // record best
  useEffect(() => {
    if (!gameOver) {
      recordedRef.current = false;
      return;
    }
    if (recordedRef.current) return;
    recordedRef.current = true;

    const final = Math.round(scoreRef.current);
    if (final > best) {
      setBest(final);
      saveBest(final);
    }
  }, [gameOver, best]);

  // render helpers
  const timeLeft = Math.ceil(tLeftRef.current);
  const score = Math.round(scoreRef.current);
  const lives = livesRef.current;
  const dashCd = dashCdRef.current;
  const coreColorIdx = colorIndexRef.current;
  const pulses = pulsesRef.current;

  const dashReady = dashCd <= 0.01;

  const ribbons = useMemo(
    () =>
      Array.from({ length: 3 }).map((_, i) => ({
        id: i,
        top: rand(6, 55),
        left: rand(-10, 60),
        rot: rand(-12, 12),
        op: rand(0.1, 0.2),
        dur: rand(5.5, 9),
      })),
    []
  );

  return (
    <div
      className="relative h-[470px] rounded-3xl border border-emerald-200/40 overflow-hidden select-none"
      style={{
        background:
          "radial-gradient(circle at 30% 20%, rgba(110,231,183,0.12), transparent 45%), radial-gradient(circle at 70% 30%, rgba(216,180,254,0.12), transparent 45%), radial-gradient(circle at 55% 85%, rgba(125,211,252,0.10), transparent 55%), linear-gradient(180deg, #050816, #020617)",
        touchAction: "manipulation",
      }}
    >
      {/* HUD */}
      <div className="absolute top-3 left-3 right-3 z-30 flex justify-between text-sm text-white">
        <div className="flex items-center gap-2">
          ⏱ {timeLeft}s
          <span className="text-white/30">|</span> ✨ امتیاز:{" "}
          <span className="font-bold">{score}</span>
          <span className="text-white/30">|</span> 🏆 رکورد:{" "}
          <span className="font-bold text-emerald-200">{best}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {Array.from({ length: livesStart }).map((_, i) => (
              <span key={i} className={i < lives ? "opacity-100" : "opacity-25"}>
                💠
              </span>
            ))}
          </div>

          <div
            className="text-xs rounded-full px-3 py-1 border"
            style={{
              borderColor: dashReady
                ? "rgba(110,231,183,0.35)"
                : "rgba(255,255,255,0.15)",
              background: dashReady
                ? "rgba(110,231,183,0.08)"
                : "rgba(255,255,255,0.06)",
            }}
          >
            Dash {dashReady ? "Ready" : `${dashCd.toFixed(1)}s`}
          </div>
        </div>
      </div>

      {/* hint */}
      <div className="absolute top-12 left-0 right-0 z-30 text-center text-xs text-white/70">
        لمس/کلیک روی هسته = تغییر رنگ | Space = Dash
      </div>

      {/* ribbons */}
      <div className="absolute inset-0 pointer-events-none">
        {ribbons.map((r) => (
          <motion.div
            key={r.id}
            className="absolute w-[520px] h-[120px] rounded-full blur-2xl"
            style={{
              top: `${r.top}%`,
              left: `${r.left}%`,
              opacity: r.op,
              transform: `rotate(${r.rot}deg)`,
              background:
                "linear-gradient(90deg, rgba(110,231,183,0.0), rgba(110,231,183,0.45), rgba(216,180,254,0.45), rgba(125,211,252,0.45), rgba(125,211,252,0.0))",
            }}
            animate={{ x: [0, 18, 0], opacity: [r.op, r.op + 0.06, r.op] }}
            transition={{ duration: r.dur, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="absolute top-20 left-0 right-0 z-40 text-center font-extrabold"
            style={{
              color: "rgba(253,224,71,0.95)",
              textShadow: "0 0 18px rgba(253,224,71,0.25)",
            }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* core */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.button
          onClick={() => switchColor()}
          className="relative"
          whileTap={{ scale: 0.96 }}
          aria-label="core"
        >
          {/* dash ring */}
          <AnimatePresence>
            {dashAnimRef.current > 0 && (
              <motion.div
                initial={{ opacity: 0.8, scale: 0.6 }}
                animate={{ opacity: 0, scale: 2.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="absolute -inset-16 rounded-full border"
                style={{ borderColor: "rgba(110,231,183,0.35)" }}
              />
            )}
          </AnimatePresence>

          <div
            className="w-20 h-20 rounded-full"
            style={{
              background: COLORS[coreColorIdx].core,
              boxShadow: `0 0 28px ${COLORS[coreColorIdx].glow}`,
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-white/90 text-xs font-bold">
            {COLORS[coreColorIdx].label}
          </div>
        </motion.button>
      </div>

      {/* pulses */}
      <div className="absolute inset-0 pointer-events-none">
        {pulses.map((p) => {
          const x = 50 + Math.cos(p.angle) * (p.dist / 3);
          const y = 50 + Math.sin(p.angle) * (p.dist / 3);
          const c = COLORS[p.colorIdx];
          return (
            <motion.div
              key={p.id}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                className="w-8 h-8 rounded-2xl"
                style={{
                  background: c.pulse,
                  boxShadow: `0 0 18px ${c.glow}`,
                  border: "1px solid rgba(255,255,255,0.12)",
                  transform: "rotate(12deg)",
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* pop FX (این بخش قبلاً pops می‌خواست و خطا می‌داد) */}
      <AnimatePresence>
        {pops.map((p) => (
          <motion.div
            key={p.id}
            className="absolute inset-0 z-40 pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {p.parts.map((pt) => (
                <motion.div
                  key={pt.id}
                  className="absolute rounded-full"
                  style={{
                    width: pt.s,
                    height: pt.s,
                    background:
                      pt.kind === "ok"
                        ? "radial-gradient(circle, rgba(110,231,183,1), rgba(56,189,248,1), rgba(253,224,71,1))"
                        : pt.kind === "dash"
                        ? "radial-gradient(circle, rgba(125,211,252,1), rgba(216,180,254,1), rgba(110,231,183,1))"
                        : "radial-gradient(circle, rgba(248,113,113,1), rgba(216,180,254,1), rgba(56,189,248,1))",
                    boxShadow: "0 0 10px rgba(255,255,255,0.18)",
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
                  animate={{
                    x: pt.dx,
                    y: pt.dy,
                    opacity: 0,
                    rotate: pt.r,
                    scale: 0.6,
                  }}
                  transition={{
                    duration: pt.t / 1000,
                    ease: "easeOut",
                    delay: pt.d,
                  }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* dash button mobile */}
      <div className="absolute bottom-4 right-4 z-40">
        <button
          onClick={doDash}
          className={`px-4 py-3 rounded-2xl text-sm font-bold border transition ${
            dashReady
              ? "bg-emerald-300/15 border-emerald-200/40 text-emerald-100 hover:bg-emerald-300/25"
              : "bg-white/5 border-white/10 text-white/60"
          }`}
        >
          DASH
        </button>
      </div>

      {/* game over */}
      {gameOver && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center text-center text-white px-4"
        >
          <div className="text-3xl mb-2">🌌 پایان!</div>
          <div className="mb-2">
            امتیاز: <span className="font-bold">{score}</span>
          </div>
          <div className="mb-5 text-white/80">
            رکورد: <span className="font-bold text-emerald-200">{best}</span>
          </div>
          <button
            onClick={restart}
            className="px-6 py-3 rounded-2xl bg-emerald-300/20 border border-emerald-200/40 text-emerald-100 font-bold hover:bg-emerald-300/30 transition"
          >
            دوباره
          </button>
        </motion.div>
      )}
    </div>
  );
}
