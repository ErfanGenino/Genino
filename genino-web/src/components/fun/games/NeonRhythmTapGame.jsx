import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const rand = (min, max) => Math.random() * (max - min) + min;
const makeId = () => `${Date.now()}-${Math.random()}`;

const LANES = [
  { key: "A", label: "A", glow: "rgba(34,211,238,0.45)", ring: "rgba(34,211,238,0.8)" }, // cyan
  { key: "S", label: "S", glow: "rgba(236,72,153,0.40)", ring: "rgba(236,72,153,0.8)" }, // pink
  { key: "D", label: "D", glow: "rgba(250,204,21,0.30)", ring: "rgba(250,204,21,0.85)" }, // gold
  { key: "F", label: "F", glow: "rgba(167,139,250,0.35)", ring: "rgba(167,139,250,0.85)" }, // violet
];

const JUDGE = { perfect: 18, good: 36 };

function loadBest(key) {
  try {
    const v = Number(localStorage.getItem(key) || "0");
    return Number.isFinite(v) ? v : 0;
  } catch {
    return 0;
  }
}
function saveBest(key, v) {
  try {
    localStorage.setItem(key, String(v));
  } catch {}
}

export default function NeonRhythmTapGame({
  duration = 35,
  bpm = 108,
  speed = 260,
  lanes = 4,
}) {
  const BEST_KEY = "genino_neonRhythm_best_v2";

  const rafRef = useRef(null);
  const lastTRef = useRef(0);

  const [notes, setNotes] = useState([]);
  const notesRef = useRef([]);
  useEffect(() => {
    notesRef.current = notes;
  }, [notes]);

  const [bursts, setBursts] = useState([]);
  const [floatText, setFloatText] = useState([]);

  const [score, setScore] = useState(0);
  const [best, setBest] = useState(loadBest(BEST_KEY));
  const [combo, setCombo] = useState(0);

  // ✅ Level / Streak
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);

  const [timeLeft, setTimeLeft] = useState(duration);
  const [gameOver, setGameOver] = useState(false);

  const [laneFlash, setLaneFlash] = useState({});
  const [shake, setShake] = useState(false);

  // 🔊 Sound
  const audioRef = useRef(null);
  const [soundOn, setSoundOn] = useState(true);
  const unlockAudio = async () => {
    if (audioRef.current) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      if (ctx.state === "suspended") await ctx.resume();
      audioRef.current = ctx;
    } catch {}
  };
  const playBeep = (type) => {
    if (!soundOn) return;
    const ctx = audioRef.current;
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const cfg =
      type === "perfect"
        ? { f1: 820, f2: 980, t: 0.10, vol: 0.07 }
        : type === "good"
        ? { f1: 620, f2: 740, t: 0.10, vol: 0.065 }
        : type === "gold"
        ? { f1: 980, f2: 1250, t: 0.12, vol: 0.075 }
        : type === "power"
        ? { f1: 520, f2: 780, t: 0.14, vol: 0.07 }
        : { f1: 220, f2: 160, t: 0.14, vol: 0.09 };

    osc.type = type === "miss" ? "sawtooth" : "sine";
    osc.frequency.setValueAtTime(cfg.f1, now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(60, cfg.f2), now + cfg.t);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(cfg.vol, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + cfg.t);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + cfg.t + 0.02);
  };

  // ✅ Power-up: Slow Motion
  const [slowUntil, setSlowUntil] = useState(0);
  const slowActive = slowUntil > Date.now();
  const slowFactor = slowActive ? 0.62 : 1;

  // ✅ Visual pulse when level up
  const [pulse, setPulse] = useState(false);

  const targetY = 380;
  const spawnY = -40;

  const laneCount = clamp(lanes, 2, 4);
  const activeLanes = useMemo(() => LANES.slice(0, laneCount), [laneCount]);

  // ✅ Level affects bpm/speed a bit (but kept safe)
  const bpmNow = Math.round(bpm * (1 + (level - 1) * 0.06));
  const secondsPerBeat = 60 / bpmNow;
  const spawnEvery = secondsPerBeat * 1000;

  const baseSpeedNow = speed * (1 + (level - 1) * 0.07);
  const speedNow = baseSpeedNow * slowFactor;

  // ✅ Golden note chance grows slightly with level
  const goldChance = clamp(0.10 + (level - 1) * 0.02, 0.10, 0.20);
  // ✅ Power-up chance (slow) small
  const powerChance = clamp(0.06 + (level - 1) * 0.01, 0.06, 0.12);

  const sparks = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        top: rand(6, 92),
        left: rand(0, 100),
        size: rand(2, 5),
        dur: rand(1.9, 3.8),
        op: rand(0.12, 0.55),
      })),
    []
  );

  const registerScore = (delta) => {
    setScore((s) => {
      const next = s + delta;
      if (next > best) {
        setBest(next);
        saveBest(BEST_KEY, next);
      }
      return next;
    });
  };

  const restart = () => {
    setNotes([]);
    setBursts([]);
    setFloatText([]);
    setScore(0);
    setCombo(0);
    setStreak(0);
    setLevel(1);
    setTimeLeft(duration);
    setGameOver(false);
    setLaneFlash({});
    setShake(false);
    setPulse(false);
    setSlowUntil(0);
    lastTRef.current = 0;
  };

  // timer
  useEffect(() => {
    if (gameOver) return;
    if (timeLeft <= 0) {
      setGameOver(true);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, gameOver]);

  // spawn notes (with golden + power)
  useEffect(() => {
    if (gameOver) return;

    const i = setInterval(() => {
      const r = Math.random();
      const isGold = r < goldChance;
      const isPower = !isGold && r < goldChance + powerChance; // power distinct

      setNotes((prev) => [
        ...prev,
        {
          id: makeId(),
          lane: Math.floor(rand(0, activeLanes.length)),
          y: spawnY,
          kind: isGold ? "gold" : isPower ? "power" : "normal",
        },
      ]);
    }, spawnEvery);

    return () => clearInterval(i);
  }, [gameOver, spawnEvery, activeLanes.length, goldChance, powerChance]);

  // animation loop
  useEffect(() => {
    if (gameOver) return;

    const tick = (t) => {
      if (!lastTRef.current) lastTRef.current = t;
      const dt = (t - lastTRef.current) / 1000;
      lastTRef.current = t;

      setNotes((prev) => {
        if (!prev.length) return prev;
        const moved = prev.map((n) => ({ ...n, y: n.y + speedNow * dt }));
        const still = moved.filter((n) => n.y < targetY + 120);

        if (still.length !== moved.length) {
          // miss by time
          setCombo(0);
          setStreak(0);
          setShake(true);
          setTimeout(() => setShake(false), 160);
          playBeep("miss");
        }
        return still;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver, speedNow, targetY]);

  const addBurst = (laneIndex, ring, isGold = false) => {
    const id = makeId();
    setBursts((b) => [...b, { id, laneIndex, ring, isGold }]);
    setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 560);
  };

  const addFloat = (laneIndex, text, ring) => {
    const id = makeId();
    setFloatText((p) => [...p, { id, laneIndex, text, ring }]);
    setTimeout(() => setFloatText((p) => p.filter((x) => x.id !== id)), 720);
  };

  const flashLane = (laneIndex, ok = true) => {
    setLaneFlash((p) => ({ ...p, [laneIndex]: ok ? "ok" : "bad" }));
    setTimeout(() => setLaneFlash((p) => ({ ...p, [laneIndex]: null })), 140);
  };

  const levelFromStreak = (s) => clamp(1 + Math.floor(s / 12), 1, 7);

  const maybeLevelUp = (nextStreak) => {
    const nextLevel = levelFromStreak(nextStreak);
    setLevel((cur) => {
      if (nextLevel > cur) {
        setPulse(true);
        setTimeout(() => setPulse(false), 260);
      }
      return nextLevel;
    });
  };

  const triggerSlow = () => {
    const until = Date.now() + 5000; // 5s
    setSlowUntil(until);
    playBeep("power");
  };

  const hitLane = (laneIndex) => {
    if (gameOver) return;

    const list = notesRef.current.filter((n) => n.lane === laneIndex);
    if (!list.length) {
      setCombo(0);
      setStreak(0);
      flashLane(laneIndex, false);
      registerScore(-2);
      playBeep("miss");
      return;
    }

    let bestNote = list[0];
    let bestDist = Math.abs(list[0].y - targetY);
    for (let i = 1; i < list.length; i++) {
      const d = Math.abs(list[i].y - targetY);
      if (d < bestDist) {
        bestDist = d;
        bestNote = list[i];
      }
    }

    if (bestDist <= JUDGE.good) {
      setNotes((prev) => prev.filter((n) => n.id !== bestNote.id));

      const lane = activeLanes[laneIndex];
      const ring = lane.ring;

      const isPerfect = bestDist <= JUDGE.perfect;
      const kind = bestNote.kind;

      // combo + streak
      setCombo((c) => c + 1);
      setStreak((s) => {
        const next = s + 1;
        maybeLevelUp(next);
        return next;
      });

      // score
      const base = isPerfect ? 10 : 6;
      const comboBonus = clamp(Math.floor((combo + 1) / 5), 0, 8);

      if (kind === "gold") {
        registerScore(base + comboBonus + 10);
        addBurst(laneIndex, "rgba(250,204,21,0.95)", true);
        addFloat(laneIndex, isPerfect ? "GOLD PERFECT" : "GOLD", "rgba(250,204,21,0.95)");
        flashLane(laneIndex, true);
        playBeep("gold");
        return;
      }

      if (kind === "power") {
        registerScore(base + comboBonus + 4);
        addBurst(laneIndex, "rgba(34,211,238,0.95)", false);
        addFloat(laneIndex, "SLOW x5s", "rgba(34,211,238,0.95)");
        flashLane(laneIndex, true);
        triggerSlow();
        return;
      }

      registerScore(base + comboBonus);
      addBurst(laneIndex, ring, false);
      addFloat(laneIndex, isPerfect ? "PERFECT" : "GOOD", ring);
      flashLane(laneIndex, true);
      playBeep(isPerfect ? "perfect" : "good");
    } else {
      setCombo(0);
      setStreak(0);
      flashLane(laneIndex, false);
      registerScore(-2);
      playBeep("miss");
    }
  };

  // keyboard: e.code stable
  useEffect(() => {
    const onKey = async (e) => {
      await unlockAudio();
      const map = { KeyA: 0, KeyS: 1, KeyD: 2, KeyF: 3 };
      const idx = map[e.code];
      if (idx !== undefined && idx < activeLanes.length) {
        e.preventDefault();
        hitLane(idx);
      }
    };
    window.addEventListener("keydown", onKey, { passive: false });
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLanes.length, gameOver, combo]);

  // confetti for game over (simple)
  const confetti = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: rand(5, 95),
        size: rand(6, 12),
        dur: rand(1.0, 1.8),
        delay: rand(0, 0.2),
        rot: rand(-180, 180),
      })),
    []
  );

  return (
    <div
      dir="ltr"
      className={`relative h-[470px] rounded-3xl border border-yellow-200 overflow-hidden select-none
        bg-gradient-to-b from-[#070a1a] via-[#050815] to-[#020617]
        ${shake ? "animate-[wiggle_0.16s_ease-in-out_1]" : ""}`}
      style={{ touchAction: "manipulation" }}
      onMouseDown={unlockAudio}
      onTouchStart={unlockAudio}
    >
      <style>{`
        @keyframes wiggle {
          0% { transform: translate(0,0); }
          25% { transform: translate(3px, -2px); }
          50% { transform: translate(-2px, 2px); }
          75% { transform: translate(2px, 1px); }
          100% { transform: translate(0,0); }
        }
      `}</style>

      {/* vignette + pulse */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06), rgba(0,0,0,0.75) 70%)",
          }}
        />
        <AnimatePresence>
          {pulse && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              exit={{ opacity: 0 }}
              style={{
                background:
                  "radial-gradient(circle at 50% 55%, rgba(250,204,21,0.30), transparent 65%)",
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* HUD */}
      <div className="absolute top-3 left-3 right-3 z-30 flex justify-between text-sm text-white">
        <div className="flex items-center gap-2">
          ⏱ {timeLeft}s
          <span className="text-white/35">|</span>
          🎯 <span className="font-bold text-yellow-200">{score}</span>
          <span className="text-white/35">|</span>
          🏆 <span className="font-bold">{best}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-xs bg-white/10 border border-white/15 rounded-full px-3 py-1">
            Lv <span className="font-bold text-yellow-300">{level}</span>
          </div>
          <div className="text-xs bg-white/10 border border-white/15 rounded-full px-3 py-1">
            Streak <span className="font-bold text-yellow-300">{streak}</span>
          </div>
          <div className="text-xs bg-white/10 border border-white/15 rounded-full px-3 py-1">
            Combo <span className="font-bold text-yellow-300">{combo}</span>
          </div>

          <button
            onClick={() => setSoundOn((s) => !s)}
            className="text-xs bg-white/10 border border-white/15 rounded-full px-3 py-1 hover:bg-white/15 transition"
            title="Sound"
          >
            {soundOn ? "🔊" : "🔇"}
          </button>
        </div>
      </div>

      {/* slow indicator */}
      <AnimatePresence>
        {slowActive && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute top-12 left-1/2 -translate-x-1/2 z-30 text-xs font-bold px-3 py-1 rounded-full"
            style={{
              color: "white",
              background: "rgba(34,211,238,0.18)",
              border: "1px solid rgba(34,211,238,0.25)",
              boxShadow: "0 0 18px rgba(34,211,238,0.28)",
            }}
          >
            🧊 Slow Motion فعال!
          </motion.div>
        )}
      </AnimatePresence>

      {/* background sparks */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-24 left-0 right-0 h-72 opacity-75"
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

      {/* lanes */}
      <div className="absolute inset-0 z-10 grid" style={{ gridTemplateColumns: `repeat(${activeLanes.length}, 1fr)` }}>
        {activeLanes.map((lane, idx) => {
          const flash = laneFlash[idx];
          return (
            <div key={lane.key} className="relative">
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, rgba(255,255,255,0.02), rgba(255,255,255,0.0))",
                  borderRight: idx !== activeLanes.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              />

              <AnimatePresence>
                {flash && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: flash === "ok" ? 0.20 : 0.18 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                    style={{ background: flash === "ok" ? lane.glow : "rgba(248,113,113,0.22)" }}
                  />
                )}
              </AnimatePresence>

              {/* notes */}
              {notes
                .filter((n) => n.lane === idx)
                .map((n) => {
                  const isGold = n.kind === "gold";
                  const isPower = n.kind === "power";
                  const ring = isGold
                    ? "rgba(250,204,21,0.98)"
                    : isPower
                    ? "rgba(34,211,238,0.95)"
                    : lane.ring;

                  const glow = isGold
                    ? "rgba(250,204,21,0.45)"
                    : isPower
                    ? "rgba(34,211,238,0.40)"
                    : lane.glow;

                  return (
                    <motion.div
                      key={n.id}
                      className="absolute left-1/2 -translate-x-1/2 rounded-full"
                      style={{
                        top: n.y,
                        width: 46,
                        height: 46,
                        background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), ${ring} 45%, rgba(2,6,23,0) 100%)`,
                        border: "1px solid rgba(255,255,255,0.14)",
                        boxShadow: `0 0 22px ${glow}`,
                      }}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: [1, isGold ? 1.06 : 1.02, 1], opacity: 1 }}
                      exit={{ scale: 1.25, opacity: 0 }}
                      transition={{ duration: 0.45 }}
                    />
                  );
                })}

              {/* bursts */}
              <AnimatePresence>
                {bursts
                  .filter((b) => b.laneIndex === idx)
                  .map((b) => (
                    <motion.div
                      key={b.id}
                      className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                      style={{ top: targetY }}
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        className="rounded-full border-2"
                        style={{
                          width: 10,
                          height: 10,
                          borderColor: b.ring,
                          boxShadow: `0 0 22px ${b.ring}`,
                        }}
                        initial={{ scale: 0.2, opacity: 0.95 }}
                        animate={{ scale: b.isGold ? 5.0 : 4.2, opacity: 0 }}
                        transition={{ duration: 0.48, ease: "easeOut" }}
                      />
                    </motion.div>
                  ))}
              </AnimatePresence>

              {/* float text */}
              <AnimatePresence>
                {floatText
                  .filter((f) => f.laneIndex === idx)
                  .map((f) => (
                    <motion.div
                      key={f.id}
                      className="absolute left-1/2 -translate-x-1/2 text-xs font-extrabold tracking-wider pointer-events-none"
                      style={{ top: targetY - 42, color: "white", textShadow: `0 0 14px ${f.ring}` }}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: -10, scale: 1 }}
                      exit={{ opacity: 0, y: -22, scale: 1.05 }}
                      transition={{ duration: 0.38 }}
                    >
                      {f.text}
                    </motion.div>
                  ))}
              </AnimatePresence>

              {/* tap button */}
              <button
                onClick={async () => {
                  await unlockAudio();
                  hitLane(idx);
                }}
                className="absolute left-1/2 -translate-x-1/2 bottom-6 w-[86%] h-14 rounded-2xl border text-white font-extrabold"
                style={{
                  borderColor: "rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.06)",
                  boxShadow: `0 0 22px ${lane.glow}`,
                }}
              >
                {lane.label}
              </button>

              {/* target line */}
              <div
                className="absolute left-1/2 -translate-x-1/2 w-[86%] h-[3px] rounded-full"
                style={{
                  top: targetY,
                  background: `linear-gradient(90deg, transparent, ${lane.ring}, transparent)`,
                  boxShadow: `0 0 16px ${lane.glow}`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* hint */}
      <div className="absolute bottom-3 left-0 right-0 z-30 text-center text-xs text-slate-300">
        نوت طلایی = امتیاز بیشتر ✨ | نوت آبی = Slow Motion 🧊 | کلیدهای A S D F 🎵
      </div>

      {/* game over */}
      {gameOver && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-center text-white"
        >
          {/* confetti */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {confetti.map((c) => (
              <motion.div
                key={c.id}
                className="absolute rounded-sm"
                style={{
                  left: `${c.left}%`,
                  width: c.size,
                  height: c.size * 0.7,
                  background: "rgba(250,204,21,0.85)",
                  boxShadow: "0 0 12px rgba(250,204,21,0.35)",
                }}
                initial={{ y: -30, rotate: c.rot, opacity: 0 }}
                animate={{ y: 520, rotate: c.rot + 260, opacity: [0, 1, 1, 0] }}
                transition={{ duration: c.dur, delay: c.delay, ease: "easeOut" }}
              />
            ))}
          </div>

          <div className="text-3xl mb-2">🏁 پایان!</div>
          <div className="mb-1">
            امتیاز نهایی: <span className="font-bold">{score}</span>
          </div>
          <div className="mb-1 text-sm text-white/80">
            Level: <span className="font-bold">{level}</span> | Best: <span className="font-bold">{best}</span>
          </div>
          <button
            onClick={restart}
            className="mt-3 px-6 py-3 rounded-xl bg-yellow-400 text-black font-bold hover:brightness-105 transition"
          >
            دوباره بازی کن
          </button>
        </motion.div>
      )}
    </div>
  );
}
