import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const uid = () => `${Date.now()}-${Math.random()}`;

// 0 = خالی, 1 = دیوار
const LEVELS = [
  {
    id: "mz1",
    size: 9,
    grid: [
      "111111111",
      "100000001",
      "101111101",
      "101000101",
      "101011101",
      "101000001",
      "101111101",
      "100000001",
      "111111111",
    ],
    start: { x: 1, y: 1 },
    goal: { x: 7, y: 7 },
  },
  {
    id: "mz2",
    size: 11,
    grid: [
      "11111111111",
      "10000000001",
      "10111111101",
      "10100000101",
      "10101110101",
      "10101000101",
      "10101111101",
      "10100000001",
      "10111111101",
      "10000000001",
      "11111111111",
    ],
    start: { x: 1, y: 1 },
    goal: { x: 9, y: 9 },
  },
];

function parseGrid(lines) {
  return lines.map((row) => row.split("").map((c) => (c === "1" ? 1 : 0)));
}
function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

export default function StealthMazeGame({
  duration = 35,
  moveCooldownMs = 70,
  lightOnMinMs = 900,
  lightOnMaxMs = 1600,
  darkMinMs = 900,
  darkMaxMs = 1700,
}) {
  const [seed, setSeed] = useState(uid());
  const [levelIndex, setLevelIndex] = useState(0);

  const [timeLeft, setTimeLeft] = useState(duration);
  const [status, setStatus] = useState("playing"); // playing | win | lose
  const [msg, setMsg] = useState("");

  const [lightOn, setLightOn] = useState(false); // چراغ روشن = حرکت ممنوع
  const [strike, setStrike] = useState(0);

  const level = LEVELS[levelIndex % LEVELS.length];
  const grid = useMemo(() => parseGrid(level.grid), [level.id]);
  const N = level.size;

  const [pos, setPos] = useState(level.start);
  const [steps, setSteps] = useState(0);

  const keysDown = useRef(new Set());
  const lastMoveAt = useRef(0);
  const loopRef = useRef(null);
  const phaseTimer = useRef(null);

  // ✅ touch / swipe
  const touchStartRef = useRef(null); // {x,y}
  const swipeDirRef = useRef(null); // "up" | "down" | "left" | "right" | null

  // ✅ D-Pad hold direction
  const dpadDirRef = useRef(null); // "up" | "down" | "left" | "right" | null

  // نور: روشن/خاموش با مدت تصادفی
  useEffect(() => {
    if (status !== "playing") return;

    const schedule = () => {
      const isOn = Math.random() < 0.5;
      setLightOn(isOn);

      const d = isOn
        ? rand(lightOnMinMs, lightOnMaxMs)
        : rand(darkMinMs, darkMaxMs);
      phaseTimer.current = setTimeout(schedule, d);
    };

    schedule();
    return () => {
      if (phaseTimer.current) clearTimeout(phaseTimer.current);
    };
  }, [status, seed, lightOnMinMs, lightOnMaxMs, darkMinMs, darkMaxMs]);

  // تایمر کلی
  useEffect(() => {
    if (status !== "playing") return;
    if (timeLeft <= 0) {
      setStatus("lose");
      setMsg("زمان تموم شد 😵");
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, status]);

  // ریست سطح
  useEffect(() => {
    setPos(level.start);
    setSteps(0);
    setStrike(0);
    setTimeLeft(duration);
    setStatus("playing");
    setMsg("در تاریکی حرکت کن… وقتی روشن شد فریز شو! 🌑⚡");

    // پاکسازی کنترل‌ها
    keysDown.current = new Set();
    swipeDirRef.current = null;
    dpadDirRef.current = null;
    touchStartRef.current = null;
    lastMoveAt.current = 0;
  }, [level.id, seed, duration]);

  // کنترل کیبورد
  useEffect(() => {
    const down = (e) => {
      const k = e.key.toLowerCase();
      if (
        ["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].includes(k)
      ) {
        e.preventDefault();
      }
      keysDown.current.add(k);
    };
    const up = (e) => keysDown.current.delete(e.key.toLowerCase());

    window.addEventListener("keydown", down, { passive: false });
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // ✅ Swipe handlers
  const onTouchStart = (e) => {
    const t = e.touches?.[0];
    if (!t) return;
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e) => {
    const start = touchStartRef.current;
    if (!start) return;

    const t = e.changedTouches?.[0];
    if (!t) return;

    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;

    const ax = Math.abs(dx);
    const ay = Math.abs(dy);

    const TH = 18;
    if (ax < TH && ay < TH) return;

    if (ax > ay) swipeDirRef.current = dx > 0 ? "right" : "left";
    else swipeDirRef.current = dy > 0 ? "down" : "up";

    touchStartRef.current = null;
  };

  const canMoveTo = (nx, ny) => {
    if (nx < 0 || ny < 0 || nx >= N || ny >= N) return false;
    return grid[ny][nx] === 0;
  };

  const loseByMoveOnLight = () => {
    setStrike((s) => s + 1);
    setStatus("lose");
    setMsg("چراغ روشن بود! باید فریز می‌شدی 😬");
  };

  // حلقه حرکت (hold key + hold D-pad + swipe single move)
  useEffect(() => {
    if (status !== "playing") return;

    const tick = () => {
      const now = Date.now();
      if (now - lastMoveAt.current < moveCooldownMs) {
        loopRef.current = requestAnimationFrame(tick);
        return;
      }

      let dx = 0,
        dy = 0;

      const swipe = swipeDirRef.current;
      const dpad = dpadDirRef.current;
      const kd = keysDown.current;

      // اولویت: swipe (یک بار) → dpad (hold) → keyboard (hold)
      if (swipe) {
        if (swipe === "up") dy = -1;
        else if (swipe === "down") dy = 1;
        else if (swipe === "left") dx = -1;
        else if (swipe === "right") dx = 1;
        swipeDirRef.current = null; // فقط یک حرکت برای سوایپ
      } else if (dpad) {
        if (dpad === "up") dy = -1;
        else if (dpad === "down") dy = 1;
        else if (dpad === "left") dx = -1;
        else if (dpad === "right") dx = 1;
      } else {
        if (kd.has("arrowup") || kd.has("w")) dy = -1;
        else if (kd.has("arrowdown") || kd.has("s")) dy = 1;
        else if (kd.has("arrowleft") || kd.has("a")) dx = -1;
        else if (kd.has("arrowright") || kd.has("d")) dx = 1;
      }

      if (dx !== 0 || dy !== 0) {
        // اگر چراغ روشن بود و حرکت کردی => باخت
        if (lightOn) {
          loseByMoveOnLight();
          return;
        }

        setPos((p) => {
          const nx = p.x + dx;
          const ny = p.y + dy;
          if (!canMoveTo(nx, ny)) return p;

          lastMoveAt.current = now;
          setSteps((s) => s + 1);

          if (nx === level.goal.x && ny === level.goal.y) {
            setStatus("win");
            setMsg("آفرین! رسیدی به هدف ✨");
          }
          return { x: nx, y: ny };
        });
      }

      loopRef.current = requestAnimationFrame(tick);
    };

    loopRef.current = requestAnimationFrame(tick);
    return () => {
      if (loopRef.current) cancelAnimationFrame(loopRef.current);
    };
  }, [status, lightOn, moveCooldownMs, level.goal.x, level.goal.y, N, grid]);

  const restart = () => setSeed(uid());

  const nextLevel = () => {
    setLevelIndex((i) => i + 1);
    setSeed(uid());
  };

  const cell = 28;

  // D-pad helpers
  const setDpadDir = (dir) => {
    if (status !== "playing") return;
    dpadDirRef.current = dir;
  };
  const clearDpadDir = () => {
    dpadDirRef.current = null;
  };

  return (
    <div className="w-full">
      <div
        className="relative rounded-3xl border border-yellow-200 bg-gradient-to-b from-slate-950 to-zinc-950 overflow-hidden p-4"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ touchAction: "none" }}
      >
        {/* Glow layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-24 left-0 right-0 h-64 opacity-80"
            style={{
              background:
                "radial-gradient(circle at 25% 35%, rgba(250,204,21,0.12), transparent 60%)," +
                "radial-gradient(circle at 75% 35%, rgba(34,211,238,0.10), transparent 60%)," +
                "radial-gradient(circle at 55% 85%, rgba(236,72,153,0.10), transparent 60%)",
            }}
          />
        </div>

        {/* Header */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <div className="text-yellow-300 font-extrabold text-lg">🕶️ Stealth Maze</div>
            <div className="text-xs text-white/70 mt-1">
              فقط در <span className="text-white font-bold">تاریکی</span> حرکت کن.
              وقتی <span className="text-yellow-200 font-bold">چراغ روشن</span> شد، فریز شو!
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-sm">
              ⏱ <span className="font-extrabold">{timeLeft}</span>s
            </div>
            <div className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-sm">
              👣 <span className="font-extrabold">{steps}</span>
            </div>
            <div className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-sm">
              🧩 Lv <span className="font-extrabold">{levelIndex + 1}</span>
            </div>
          </div>
        </div>

        {/* Light indicator */}
        <div className="relative z-10 mb-4">
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="text-sm text-white/80">{msg}</div>
            <div className="flex items-center gap-2">
              <motion.div
                animate={lightOn ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                transition={{ duration: 0.6, repeat: lightOn ? Infinity : 0 }}
                className={`w-3 h-3 rounded-full ${lightOn ? "bg-yellow-300" : "bg-slate-600"}`}
                style={{
                  boxShadow: lightOn ? "0 0 18px rgba(250,204,21,.75)" : "none",
                }}
              />
              <div className="text-xs text-white/70">
                {lightOn ? "چراغ روشن (حرکت ممنوع)" : "تاریکی (حرکت آزاد)"}
              </div>
            </div>
          </div>
        </div>

        {/* Maze board */}
        <div className="relative z-10 flex justify-center">
          <div
            className="relative rounded-2xl border border-white/10 bg-black/40 p-3"
            style={{ width: N * cell + 24, maxWidth: "100%" }}
          >
            {/* spotlight overlay */}
            <AnimatePresence>
              {lightOn && status === "playing" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.55 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 35%, rgba(250,204,21,0.55), rgba(0,0,0,0.85) 60%)",
                  }}
                />
              )}
            </AnimatePresence>

            {/* grid */}
            <div
              className="relative"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${N}, ${cell}px)`,
                gridTemplateRows: `repeat(${N}, ${cell}px)`,
                gap: 2,
              }}
            >
              {grid.flatMap((row, y) =>
                row.map((v, x) => {
                  const isWall = v === 1;
                  const isGoal = x === level.goal.x && y === level.goal.y;
                  const isStart = x === level.start.x && y === level.start.y;
                  return (
                    <div
                      key={`${x}-${y}`}
                      className={`rounded-lg relative overflow-hidden ${
                        isWall
                          ? "bg-white/10 border border-white/10"
                          : "bg-white/5 border border-white/10"
                      }`}
                      style={{ width: cell, height: cell }}
                    >
                      {isGoal && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div
                            className="w-3 h-3 rounded-full bg-emerald-300"
                            style={{ boxShadow: "0 0 18px rgba(52,211,153,.85)" }}
                            title="هدف"
                          />
                        </div>
                      )}
                      {isStart && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-sky-300 opacity-80" />
                        </div>
                      )}
                    </div>
                  );
                })
              )}

              {/* player */}
              <motion.div
                className="absolute rounded-xl"
                style={{
                  width: cell - 2,
                  height: cell - 2,
                  left: pos.x * (cell + 2) + 1,
                  top: pos.y * (cell + 2) + 1,
                  background:
                    "linear-gradient(135deg, rgba(34,211,238,0.85), rgba(236,72,153,0.75))",
                  boxShadow: "0 0 18px rgba(34,211,238,0.55)",
                }}
                animate={status === "playing" ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                transition={{ duration: 0.9, repeat: status === "playing" ? Infinity : 0 }}
              />
            </div>
          </div>
        </div>

        {/* ✅ D-Pad for mobile */}
        <div className="relative z-10 mt-5 flex items-center justify-between gap-3">
          <div className="text-xs text-white/60">
            موبایل: سوایپ کن یا از D-Pad استفاده کن
          </div>

          <div className="select-none">
            <div className="grid grid-cols-3 gap-2">
              <div />
              <button
                onMouseDown={() => setDpadDir("up")}
                onMouseUp={clearDpadDir}
                onMouseLeave={clearDpadDir}
                onTouchStart={(e) => {
                  e.preventDefault();
                  setDpadDir("up");
                }}
                onTouchEnd={clearDpadDir}
                className="w-12 h-12 rounded-2xl border border-white/15 bg-white/5 text-white font-extrabold active:bg-white/10"
                aria-label="بالا"
              >
                ▲
              </button>
              <div />

              <button
                onMouseDown={() => setDpadDir("right")}
                onMouseUp={clearDpadDir}
                onMouseLeave={clearDpadDir}
                onTouchStart={(e) => {
                  e.preventDefault();
                  setDpadDir("left");
                }}
                onTouchEnd={clearDpadDir}
                className="w-12 h-12 rounded-2xl border border-white/15 bg-white/5 text-white font-extrabold active:bg-white/10"
                aria-label="چپ"
              >
                ▶
              </button>

              <button
                onClick={() => {
                  // مرکز: توقف
                  clearDpadDir();
                }}
                className="w-12 h-12 rounded-2xl border border-white/10 bg-white/5 text-white/70 font-bold active:bg-white/10"
                aria-label="توقف"
                title="توقف"
              >
                ■
              </button>

              <button
                onMouseDown={() => setDpadDir("left")}
                onMouseUp={clearDpadDir}
                onMouseLeave={clearDpadDir}
                onTouchStart={(e) => {
                  e.preventDefault();
                  setDpadDir("right");
                }}
                onTouchEnd={clearDpadDir}
                className="w-12 h-12 rounded-2xl border border-white/15 bg-white/5 text-white font-extrabold active:bg-white/10"
                aria-label="راست"
              >
                ◀
              </button>

              <div />
              <button
                onMouseDown={() => setDpadDir("down")}
                onMouseUp={clearDpadDir}
                onMouseLeave={clearDpadDir}
                onTouchStart={(e) => {
                  e.preventDefault();
                  setDpadDir("down");
                }}
                onTouchEnd={clearDpadDir}
                className="w-12 h-12 rounded-2xl border border-white/15 bg-white/5 text-white font-extrabold active:bg-white/10"
                aria-label="پایین"
              >
                ▼
              </button>
              <div />
            </div>
          </div>
        </div>

        {/* Controls hint (desktop) */}
        <div className="relative z-10 mt-3 text-xs text-white/60">
          دسکتاپ: WASD یا Arrow Keys — قانون: وقتی چراغ روشن شد حتی یک قدم هم برندار 😄
        </div>

        {/* Overlays */}
        <AnimatePresence>
          {status !== "playing" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
            >
              <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
                {status === "win" ? (
                  <>
                    <div className="text-3xl mb-2">✅ موفق شدی!</div>
                    <div className="text-white/80 mb-4">
                      مرحله رو تموم کردی. می‌خوای بری مرحله بعد؟
                    </div>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={nextLevel}
                        className="px-6 py-3 rounded-xl bg-yellow-400 text-black font-extrabold hover:brightness-105 transition"
                      >
                        مرحله بعد
                      </button>
                      <button
                        onClick={restart}
                        className="px-6 py-3 rounded-xl bg-white/10 text-white font-extrabold border border-white/20 hover:bg-white/15 transition"
                      >
                        دوباره همین مرحله
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-3xl mb-2">❌ باختی!</div>
                    <div className="text-white/80 mb-4">
                      یا زمان تموم شد، یا وقتی چراغ روشن بود حرکت کردی.
                    </div>
                    <button
                      onClick={restart}
                      className="px-6 py-3 rounded-xl bg-yellow-400 text-black font-extrabold hover:brightness-105 transition"
                    >
                      تلاش دوباره
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
