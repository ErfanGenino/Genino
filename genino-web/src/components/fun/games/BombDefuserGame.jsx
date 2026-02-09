import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[rand(0, arr.length - 1)];
const uid = () => `${Date.now()}-${Math.random()}`;

const WIRE_POOL = [
  { id: "red", label: "قرمز", glow: "rgba(248,113,113,.85)", chip: "bg-red-500" },
  { id: "blue", label: "آبی", glow: "rgba(96,165,250,.85)", chip: "bg-blue-500" },
  { id: "green", label: "سبز", glow: "rgba(74,222,128,.85)", chip: "bg-green-500" },
  { id: "yellow", label: "زرد", glow: "rgba(250,204,21,.9)", chip: "bg-yellow-400" },
  { id: "pink", label: "صورتی", glow: "rgba(236,72,153,.85)", chip: "bg-pink-500" },
  { id: "purple", label: "بنفش", glow: "rgba(168,85,247,.85)", chip: "bg-purple-500" },
];

const RULES = [
  {
    id: "parity",
    title: "قانون زوج/فرد",
    desc: "اگر رقم آخر کد زوج است: سیم آبی را قطع کن، وگرنه سیم قرمز را.",
    solve: ({ code, wires }) => {
      const last = Number(String(code).slice(-1));
      const want = last % 2 === 0 ? "blue" : "red";
      if (wires.some((w) => w.id === want)) return want;
      return wires.some((w) => w.id === "yellow") ? "yellow" : wires[0].id;
    },
  },
  {
    id: "unique",
    title: "قانون رنگ خاص",
    desc: "اگر دقیقاً یک سیم گرم (قرمز/صورتی/زرد) داری: همان را قطع کن. وگرنه سیم سبز.",
    solve: ({ wires }) => {
      const warm = ["red", "pink", "yellow"];
      const warmWires = wires.filter((w) => warm.includes(w.id));
      if (warmWires.length === 1) return warmWires[0].id;
      if (wires.some((w) => w.id === "green")) return "green";
      return wires[wires.length - 1].id;
    },
  },
  {
    id: "position",
    title: "قانون جایگاه",
    desc: "اگر سیم بنفش وجود دارد: سومین سیم را قطع کن. وگرنه آخرین سیم.",
    solve: ({ wires }) => {
      if (wires.some((w) => w.id === "purple")) return wires[Math.min(2, wires.length - 1)].id;
      return wires[wires.length - 1].id;
    },
  },
  {
    id: "sum",
    title: "قانون جمع رقم‌ها",
    desc: "اگر جمع رقم‌های کد > 20 است: سیم زرد را قطع کن. وگرنه سیم آبی.",
    solve: ({ code, wires }) => {
      const s = String(code).split("").reduce((a, c) => a + Number(c), 0);
      const want = s > 20 ? "yellow" : "blue";
      if (wires.some((w) => w.id === want)) return want;
      return wires[0].id;
    },
  },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = rand(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function usePulse(flag, ms = 380) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!flag) return;
    setOn(true);
    const t = setTimeout(() => setOn(false), ms);
    return () => clearTimeout(t);
  }, [flag, ms]);
  return on;
}

const LS_BEST = "genino_bomb_best_score";

export default function BombDefuserGame({
  duration = 18,
  wiresCount = 4,
  difficulty = 2,       // 1..3
  roundsToWin = 5,      // چند راند پشت سر هم برای برد بزرگ
}) {
  // سیستم راندها (هر راند یک بمب)
  const [seed, setSeed] = useState(uid());
  const [status, setStatus] = useState("playing"); // playing | win | lose
  const [cutId, setCutId] = useState(null);

  // تایمر هر راند
  const [timeLeft, setTimeLeft] = useState(duration);

  // امتیاز و کمبو و سطح
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [round, setRound] = useState(1);
  const [level, setLevel] = useState(difficulty); // خودکار بالا میره (تا 3)

  const [best, setBest] = useState(() => Number(localStorage.getItem(LS_BEST) || 0));

  // افکت‌های تصویری
  const [sparkAt, setSparkAt] = useState(null); // {x,y,color}
  const [screenFlash, setScreenFlash] = useState(false);
  const [shake, setShake] = useState(false);
  const [particles, setParticles] = useState([]);

  const flashOn = usePulse(screenFlash, 220);
  const shakeOn = usePulse(shake, 420);

  // تولید بمب این راند
  const { code, wires, rule, answerId } = useMemo(() => {
    const digits = level >= 3 ? 5 : level === 2 ? 4 : 3;

    const code = rand(10 ** (digits - 1), 10 ** digits - 1);

    const extra = level >= 2 ? 1 : 0; // سخت‌تر = سیم بیشتر
    const count = clamp(wiresCount + extra, 3, 6);
    const wires = shuffle(WIRE_POOL).slice(0, count);

    const rule = pick(RULES);
    const answerId = rule.solve({ code, wires });

    return { code, wires, rule, answerId };
  }, [seed, wiresCount, level]);

  // urgency برای بک‌گراند و اسکن‌لاین
  const urgency = Math.max(0, 1 - timeLeft / duration);

  // تایمر
  useEffect(() => {
    if (status !== "playing") return;
    if (timeLeft <= 0) {
      boom();
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, status]);

  // صدا اختیاری: فعلا خاموش (اگر فایل داشتی خودت فعال کن)
  const winRef = useRef(null);
  const loseRef = useRef(null);
  useEffect(() => {
    // winRef.current = new Audio("/sounds/win.mp3");
    // loseRef.current = new Audio("/sounds/boom.mp3");
  }, []);

  // ذرات (Spark burst)
  const spawnParticles = (color = "rgba(250,204,21,.9)") => {
    const id = uid();
    const burst = Array.from({ length: 10 }).map((_, i) => ({
      id: `${id}-${i}`,
      ang: (Math.PI * 2 * i) / 10 + Math.random() * 0.3,
      dist: rand(20, 48),
      size: rand(4, 8),
      dur: rand(420, 620),
      color,
    }));
    setParticles((p) => [...p, { id, burst }]);
    setTimeout(() => {
      setParticles((p) => p.filter((x) => x.id !== id));
    }, 700);
  };

  const boom = () => {
    setStatus("lose");
    setShake(true);
    setScreenFlash(true);
    setCombo(0);
    spawnParticles("rgba(248,113,113,.95)");
    if (loseRef.current) { try { loseRef.current.currentTime = 0; loseRef.current.play(); } catch {} }
  };

  const nextBomb = () => {
    setSeed(uid());
    setStatus("playing");
    setCutId(null);
    setTimeLeft(duration);

    // سطح‌بندی خودکار: هر 2 راند موفق، یک level بالاتر تا 3
    if (round % 2 === 0) setLevel((lv) => clamp(lv + 1, 1, 3));
  };

  const restartAll = () => {
    setScore(0);
    setCombo(0);
    setRound(1);
    setLevel(difficulty);
    setSeed(uid());
    setStatus("playing");
    setCutId(null);
    setTimeLeft(duration);
  };

  const cutWire = (wireId, rect, glow) => {
    if (status !== "playing") return;
    if (cutId) return;

    setCutId(wireId);

    // spark location
    if (rect) {
      setSparkAt({
        x: rect.left + rect.width * 0.25,
        y: rect.top + rect.height * 0.5,
        color: glow || "rgba(250,204,21,.9)",
      });
      spawnParticles(glow || "rgba(250,204,21,.9)");
      setTimeout(() => setSparkAt(null), 240);
    }

    const ok = wireId === answerId;

    if (ok) {
      setScreenFlash(true);

      const timeBonus = Math.round(timeLeft * 3);     // هر ثانیه باقی‌مانده امتیاز
      const comboBonus = combo * 15;
      const base = 60;

      const gained = base + timeBonus + comboBonus + level * 10;
      setScore((s) => s + gained);
      setCombo((c) => c + 1);

      setTimeout(() => {
        // برد بزرگ؟
        const newRound = round + 1;
        setRound(newRound);

        if (newRound > roundsToWin) {
          setStatus("win");
          if (winRef.current) { try { winRef.current.currentTime = 0; winRef.current.play(); } catch {} }
          return;
        }

        nextBomb();
      }, 520);
    } else {
      boom();
    }
  };

  // ذخیره رکورد
  useEffect(() => {
    if (score > best) {
      setBest(score);
      localStorage.setItem(LS_BEST, String(score));
    }
  }, [score, best]);

  return (
    <div className="w-full">
      <motion.div
        className="relative rounded-3xl border border-yellow-200 overflow-hidden"
        animate={shakeOn ? { x: [0, -8, 8, -6, 6, 0] } : {}}
        transition={{ duration: 0.42 }}
        style={{
          background: "linear-gradient(180deg, rgba(2,6,23,0.98), rgba(9,9,11,0.98))",
        }}
      >
        {/* Screen flash */}
        <AnimatePresence>
          {flashOn && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.18 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 40%, rgba(250,204,21,0.9), transparent 60%)",
              }}
            />
          )}
        </AnimatePresence>

        {/* Glows + scanline */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-28 left-0 right-0 h-80 opacity-90"
            style={{
              background: `radial-gradient(circle at 30% 25%, rgba(250,204,21,${0.12 + urgency * 0.14}), transparent 60%),
                           radial-gradient(circle at 78% 35%, rgba(236,72,153,${0.10 + urgency * 0.18}), transparent 60%),
                           radial-gradient(circle at 55% 78%, rgba(34,211,238,${0.08 + urgency * 0.16}), transparent 60%)`,
            }}
          />
          <motion.div
            className="absolute left-0 right-0 h-10 opacity-20"
            animate={{ top: ["-10%", "110%"] }}
            transition={{
              duration: 3.8 - urgency * 2.0,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.12), transparent)",
            }}
          />
        </div>

        {/* Header */}
        <div className="relative z-10 px-5 pt-5 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="text-yellow-300 font-extrabold text-lg">
              💣 Bomb Defuser
              <span className="text-xs text-white/60 font-normal mr-2">
                (Round {round}/{roundsToWin})
              </span>
            </div>
            <div className="text-xs text-white/70 mt-1">
              قانون را بخوان و <span className="text-yellow-200 font-bold">فقط یک سیم</span> را قطع کن.
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-sm">
              ⏱ <span className="font-extrabold">{timeLeft}</span>s
            </div>

            <div className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-sm" title="کد دستگاه">
              🔢 <span className="font-extrabold">{code}</span>
            </div>

            <div className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-sm" title="سطح">
              🧩 Lv <span className="font-extrabold">{level}</span>
            </div>
          </div>
        </div>

        {/* Score row */}
        <div className="relative z-10 px-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80 text-sm">
              🎯 امتیاز: <span className="text-white font-extrabold">{score}</span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80 text-sm">
              🔥 کمبو: <span className="text-white font-extrabold">{combo}</span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80 text-sm">
              🏆 رکورد: <span className="text-white font-extrabold">{best}</span>
            </div>
          </div>
        </div>

        {/* Rule box */}
        <div className="relative z-10 px-5 mt-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-white/60 mb-1">قانون این راند:</div>
            <div className="text-white font-bold">{rule.title}</div>
            <div className="text-sm text-white/75 mt-1 leading-relaxed">{rule.desc}</div>
          </div>
        </div>

        {/* Wires */}
        <div className="relative z-10 px-5 py-5">
          <div className="grid gap-3">
            {wires.map((w, idx) => {
              const isCut = cutId === w.id;
              const disabled = status !== "playing" || !!cutId;

              return (
                <button
                  key={w.id}
                  disabled={disabled}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    cutWire(w.id, rect, w.glow);
                  }}
                  className={`group relative rounded-2xl border transition text-right
                    ${disabled ? "cursor-not-allowed opacity-90" : "hover:brightness-110"}
                    ${isCut ? "border-yellow-300" : "border-white/10"}
                  `}
                  aria-label={`سیم ${w.label}`}
                >
                  <div className="flex items-center justify-between px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${w.chip}`} />
                      <div className="text-white font-bold">{w.label}</div>
                      <div className="text-xs text-white/50">Wire #{idx + 1}</div>
                    </div>

                    <div className="text-xs text-white/60">
                      {isCut ? "✂️ قطع شد" : "برای قطع کلیک کن"}
                    </div>
                  </div>

                  {/* wire line */}
                  <div className="absolute inset-x-4 bottom-3 h-[6px] rounded-full overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-75"
                      style={{
                        background: `linear-gradient(90deg, rgba(255,255,255,0.08), ${w.glow}, rgba(255,255,255,0.06))`,
                        boxShadow: `0 0 18px ${w.glow}`,
                      }}
                    />

                    <AnimatePresence>
                      {isCut && (
                        <motion.div
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 origin-left"
                          style={{ background: "rgba(0,0,0,0.75)" }}
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  {/* hover mini glow */}
                  {!disabled && (
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none"
                      style={{
                        boxShadow: `0 0 22px ${w.glow}`,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-4 text-xs text-white/60">
            فقط یک سیم رو می‌تونی قطع کنی. امتیازت با زمان باقی‌مانده و کمبو بیشتر میشه 😈
          </div>
        </div>

        {/* spark (absolute in viewport, but visually OK) */}
        <AnimatePresence>
          {sparkAt && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="fixed z-[9999] pointer-events-none"
              style={{ left: sparkAt.x - 40, top: sparkAt.y - 40 }}
            >
              <div
                className="w-20 h-20 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${sparkAt.color}, transparent 70%)`,
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* particles */}
        {particles.length > 0 && (
          <div className="fixed inset-0 pointer-events-none z-[9998]">
            {particles.map((p) =>
              p.burst.map((b) => (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  animate={{
                    opacity: 0,
                    x: Math.cos(b.ang) * b.dist,
                    y: Math.sin(b.ang) * b.dist,
                    scale: 0.6,
                  }}
                  transition={{ duration: b.dur / 1000, ease: "easeOut" }}
                  className="fixed"
                  style={{
                    left: sparkAt ? sparkAt.x : 0,
                    top: sparkAt ? sparkAt.y : 0,
                    width: b.size,
                    height: b.size,
                    borderRadius: 999,
                    background: b.color,
                    boxShadow: `0 0 16px ${b.color}`,
                  }}
                />
              ))
            )}
          </div>
        )}

        {/* Overlay Win/Lose */}
        <AnimatePresence>
          {status !== "playing" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
            >
              <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
                {status === "win" ? (
                  <>
                    <div className="text-3xl mb-2">🏁 ماموریت کامل شد!</div>
                    <div className="text-white/80 mb-4">
                      همه بمب‌ها رو خنثی کردی ✨
                      <div className="mt-2 text-sm">
                        امتیاز نهایی: <span className="font-extrabold text-white">{score}</span>
                      </div>
                    </div>
                    <button
                      onClick={restartAll}
                      className="px-6 py-3 rounded-xl bg-yellow-400 text-black font-extrabold hover:brightness-105 transition"
                    >
                      بازی دوباره
                    </button>
                  </>
                ) : (
                  <>
                    <div className="text-3xl mb-2">💥 BOOM!</div>
                    <div className="text-white/80 mb-4">
                      سیم اشتباه بود یا زمان تموم شد…
                      <div className="mt-2 text-sm">
                        امتیاز: <span className="font-extrabold text-white">{score}</span>{" "}
                        <span className="text-white/40">|</span>{" "}
                        کمبو: <span className="font-extrabold text-white">{combo}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={restartAll}
                        className="px-5 py-3 rounded-xl bg-yellow-400 text-black font-extrabold hover:brightness-105 transition"
                      >
                        از اول
                      </button>
                      <button
                        onClick={() => {
                          // یک راند جدید با همان تنظیمات
                          setScore((s) => Math.max(0, s - 25)); // کمی جریمه
                          setCombo(0);
                          setCutId(null);
                          setStatus("playing");
                          setTimeLeft(duration);
                          setSeed(uid());
                        }}
                        className="px-5 py-3 rounded-xl bg-white/10 text-white font-extrabold border border-white/20 hover:bg-white/15 transition"
                      >
                        ادامه
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer strip */}
        <div className="relative z-10 px-5 pb-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 flex items-center justify-between text-xs text-white/70">
            <span>🎛️ Genino Lab</span>
            <span>⚡ فشار: {Math.round(urgency * 100)}%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
