import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * ژلی فراری! — فرار بزرگ از آزمایشگاه ژنینو
 * جایگزین کامل ColorTapGame.jsx
 *
 * ویژگی‌ها:
 * - Mobile First
 * - کنترل Tap / Swipe / Keyboard
 * - پرش و سر خوردن
 * - موانع زمینی، لیزر و دروازه
 * - سکه و Power-up
 * - Shield / Magnet / Giant / Turbo
 * - Combo و Near Miss
 * - ذخیره رکورد در localStorage
 * - بدون نیاز به asset خارجی
 */

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const BEST_KEY = "genino_jelly_escape_best_v1";

const loadBest = () => {
  try {
    const value = Number(localStorage.getItem(BEST_KEY) || 0);
    return Number.isFinite(value) ? value : 0;
  } catch {
    return 0;
  }
};

const saveBest = (value) => {
  try {
    localStorage.setItem(BEST_KEY, String(value));
  } catch {}
};

const POWERUPS = {
  shield: { icon: "🛡️", title: "سپر حبابی", duration: 5000 },
  magnet: { icon: "🧲", title: "آهنربا", duration: 6500 },
  giant: { icon: "🧪", title: "معجون غول", duration: 5000 },
  turbo: { icon: "⚡", title: "توربو", duration: 4200 },
};

function Jelly({ jumping, sliding, giant, shield, turbo, hurt }) {
  return (
    <motion.div
      className="relative"
      animate={{
        y: jumping ? -105 : 0,
        scaleX: sliding ? 1.35 : giant ? 1.32 : 1,
        scaleY: sliding ? 0.62 : giant ? 1.32 : 1,
        rotate: hurt ? [0, -10, 10, -7, 7, 0] : jumping ? [0, -7, 5, 0] : 0,
      }}
      transition={
        hurt
          ? { duration: 0.32 }
          : jumping
          ? { duration: 0.52, ease: [0.25, 0.8, 0.3, 1] }
          : { type: "spring", stiffness: 330, damping: 20 }
      }
    >
      {shield && (
        <motion.div
          className="absolute -inset-4 rounded-full border-2 border-cyan-200/80"
          animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.45, 0.95, 0.45] }}
          transition={{ duration: 0.65, repeat: Infinity }}
          style={{
            background: "radial-gradient(circle, rgba(103,232,249,.10), rgba(34,211,238,.03))",
            boxShadow: "0 0 26px rgba(34,211,238,.45), inset 0 0 18px rgba(255,255,255,.15)",
          }}
        />
      )}

      {turbo && (
        <motion.div
          className="absolute right-[70%] top-1/2 -translate-y-1/2 w-20 h-7 rounded-full"
          animate={{ scaleX: [0.7, 1.25, 0.7], opacity: [0.35, 0.9, 0.35] }}
          transition={{ duration: 0.2, repeat: Infinity }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(250,204,21,.2), rgba(253,224,71,.85))",
            filter: "blur(3px)",
          }}
        />
      )}

      <div
        className="relative w-[66px] h-[62px] rounded-[48%_52%_45%_55%/55%_50%_50%_45%] border-2 border-yellow-100/60"
        style={{
          background:
            "radial-gradient(circle at 35% 25%, #fff7b2 0%, #fde047 24%, #f59e0b 68%, #b45309 100%)",
          boxShadow:
            "inset 0 5px 10px rgba(255,255,255,.45), inset 0 -8px 12px rgba(146,64,14,.18), 0 8px 18px rgba(0,0,0,.25), 0 0 22px rgba(250,204,21,.22)",
        }}
      >
        <motion.div
          className="absolute left-[13px] top-[20px] w-[10px] h-[13px] rounded-full bg-slate-900"
          animate={{ scaleY: [1, 1, 0.15, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, times: [0, 0.46, 0.49, 0.52] }}
        >
          <div className="absolute left-[2px] top-[2px] w-[3px] h-[3px] rounded-full bg-white" />
        </motion.div>

        <motion.div
          className="absolute right-[13px] top-[20px] w-[10px] h-[13px] rounded-full bg-slate-900"
          animate={{ scaleY: [1, 1, 0.15, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, times: [0, 0.46, 0.49, 0.52] }}
        >
          <div className="absolute left-[2px] top-[2px] w-[3px] h-[3px] rounded-full bg-white" />
        </motion.div>

        <div className="absolute left-1/2 -translate-x-1/2 top-[39px] w-[18px] h-[9px] rounded-b-full border-b-[3px] border-slate-800" />
        <div className="absolute left-[5px] top-[35px] w-[9px] h-[5px] rounded-full bg-pink-400/50" />
        <div className="absolute right-[5px] top-[35px] w-[9px] h-[5px] rounded-full bg-pink-400/50" />

        <motion.div
          className="absolute -left-[7px] top-[37px] w-[14px] h-[9px] rounded-full bg-amber-500"
          animate={{ rotate: [-10, 15, -10] }}
          transition={{ duration: 0.45, repeat: Infinity }}
        />
        <motion.div
          className="absolute -right-[7px] top-[37px] w-[14px] h-[9px] rounded-full bg-amber-500"
          animate={{ rotate: [10, -15, 10] }}
          transition={{ duration: 0.45, repeat: Infinity }}
        />
      </div>

      {!jumping && (
        <>
          <motion.div
            className="absolute left-[10px] -bottom-[5px] w-[20px] h-[9px] rounded-full bg-amber-600"
            animate={{ scaleX: [1, 0.75, 1.1, 1] }}
            transition={{ duration: 0.35, repeat: Infinity }}
          />
          <motion.div
            className="absolute right-[10px] -bottom-[5px] w-[20px] h-[9px] rounded-full bg-amber-600"
            animate={{ scaleX: [1.1, 1, 0.75, 1.1] }}
            transition={{ duration: 0.35, repeat: Infinity }}
          />
        </>
      )}
    </motion.div>
  );
}

function Coin() {
  return (
    <motion.div
      className="w-8 h-8 rounded-full border-2 border-yellow-100 flex items-center justify-center text-[11px] font-black text-amber-950"
      animate={{ rotateY: [0, 180, 360], scaleX: [1, 0.35, 1] }}
      transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
      style={{
        background: "radial-gradient(circle at 35% 30%, #fff7ae, #facc15 45%, #d97706)",
        boxShadow: "0 0 15px rgba(250,204,21,.55)",
      }}
    >
      G
    </motion.div>
  );
}

function Powerup({ kind }) {
  const p = POWERUPS[kind];
  return (
    <motion.div
      className="w-11 h-11 rounded-2xl border border-white/35 flex items-center justify-center text-2xl"
      animate={{ y: [-3, 3, -3], rotate: [-3, 3, -3], scale: [1, 1.07, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,.28), rgba(255,255,255,.08))",
        boxShadow: "0 0 18px rgba(255,255,255,.18)",
        backdropFilter: "blur(5px)",
      }}
    >
      {p.icon}
    </motion.div>
  );
}

function Crate() {
  return (
    <div
      className="relative w-14 h-14 rounded-xl border-2 border-orange-300/60 overflow-hidden"
      style={{
        background: "linear-gradient(135deg,#9a3412,#ea580c 48%,#7c2d12)",
        boxShadow: "0 8px 16px rgba(0,0,0,.35)",
      }}
    >
      <div className="absolute inset-x-1 top-1/2 -translate-y-1/2 h-2 bg-orange-200/30 rotate-45" />
      <div className="absolute inset-x-1 top-1/2 -translate-y-1/2 h-2 bg-orange-200/30 -rotate-45" />
      <div className="absolute inset-1 rounded-lg border border-orange-200/30" />
      <div className="absolute left-1/2 -translate-x-1/2 top-2 text-lg">⚠️</div>
    </div>
  );
}

function Laser() {
  return (
    <div className="relative w-[14px] h-28">
      <div className="absolute left-1/2 -translate-x-1/2 inset-y-0 w-[5px] bg-red-200 rounded-full shadow-[0_0_8px_#ef4444,0_0_18px_#ef4444,0_0_30px_#dc2626]" />
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 inset-y-0 w-[11px] bg-red-500/25 rounded-full blur-sm"
        animate={{ opacity: [0.3, 0.9, 0.3] }}
        transition={{ duration: 0.25, repeat: Infinity }}
      />
    </div>
  );
}

function Drone() {
  return (
    <motion.div
      className="relative w-16 h-9"
      animate={{ y: [-2, 2, -2] }}
      transition={{ duration: 0.5, repeat: Infinity }}
    >
      <div className="absolute left-1/2 -translate-x-1/2 top-1 w-10 h-7 rounded-xl bg-slate-600 border border-slate-300/40 shadow-lg">
        <div className="absolute left-1/2 -translate-x-1/2 top-2 w-3 h-3 rounded-full bg-red-400 shadow-[0_0_10px_#f87171]" />
      </div>
      <motion.div
        className="absolute left-0 top-0 w-6 h-[3px] rounded-full bg-slate-300"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.16, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute right-0 top-0 w-6 h-[3px] rounded-full bg-slate-300"
        animate={{ rotate: -360 }}
        transition={{ duration: 0.16, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}

function LabBackground({ speed, chaos }) {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-[#071426] via-[#0b1930] to-[#020617]" />

      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 15% 20%, rgba(34,211,238,.12), transparent 25%), radial-gradient(circle at 85% 35%, rgba(168,85,247,.13), transparent 25%), radial-gradient(circle at 50% 80%, rgba(250,204,21,.08), transparent 25%)",
        }}
      />

      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`pipe-${i}`}
          className="absolute h-[5px] rounded-full bg-slate-600/40 border-t border-slate-400/20"
          style={{
            width: `${85 + (i % 3) * 35}px`,
            top: `${12 + i * 14}%`,
            left: i % 2 === 0 ? "-20px" : "auto",
            right: i % 2 ? "-20px" : "auto",
          }}
          animate={{ x: i % 2 === 0 ? [0, -20, 0] : [0, 20, 0] }}
          transition={{ duration: 2.4 + i * 0.2, repeat: Infinity }}
        />
      ))}

      <div className="absolute left-3 top-[17%] bottom-[18%] w-10 opacity-60">
        {Array.from({ length: 7 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-0 w-7 h-12 rounded-lg border border-cyan-300/20 bg-cyan-950/30"
            style={{ top: `${i * 15}%` }}
            animate={{ opacity: [0.35, 0.8, 0.35] }}
            transition={{ duration: 1.4 + i * 0.1, repeat: Infinity }}
          >
            <div className="absolute left-2 top-2 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_9px_#67e8f9]" />
          </motion.div>
        ))}
      </div>

      <div className="absolute right-3 top-[12%] bottom-[18%] w-10 opacity-60">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute right-0 w-8 h-14 rounded-xl border border-purple-300/20 bg-purple-950/25"
            style={{ top: `${i * 17}%` }}
            animate={{ opacity: [0.4, 0.85, 0.4] }}
            transition={{ duration: 1.2 + i * 0.13, repeat: Infinity }}
          >
            <div className="absolute right-2 top-2 w-2 h-2 rounded-full bg-purple-300 shadow-[0_0_9px_#d8b4fe]" />
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-[13%] left-0 right-0 h-[3px] bg-cyan-300/20 shadow-[0_0_12px_rgba(34,211,238,.25)]" />

      {Array.from({ length: chaos ? 14 : 8 }).map((_, i) => (
        <motion.div
          key={`streak-${i}`}
          className="absolute h-[2px] rounded-full bg-cyan-100/30"
          style={{
            width: `${20 + (i % 4) * 12}px`,
            top: `${15 + ((i * 11) % 65)}%`,
            left: `${15 + ((i * 19) % 70)}%`,
          }}
          animate={{ x: [120, -420], opacity: [0, 0.65, 0] }}
          transition={{
            duration: Math.max(0.45, 1.35 - speed * 0.0015 + (i % 3) * 0.12),
            repeat: Infinity,
            ease: "linear",
            delay: (i % 5) * 0.13,
          }}
        />
      ))}
    </>
  );
}

export default function ColorTapGame() {
  const GAME_H = 560;
  const PLAYER_X = 74;
  const GROUND_Y = 438;

  const stageRef = useRef(null);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(performance.now());
  const spawnRef = useRef(0);
  const coinSpawnRef = useRef(0);
  const powerSpawnRef = useRef(0);
  const swipeRef = useRef(null);
  const objectsRef = useRef([]);
  const actionRef = useRef({ jumping: false, sliding: false });
  const activePowerRef = useRef({});
  const invincibleRef = useRef(false);

  const [status, setStatus] = useState("ready"); // ready playing paused gameover
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => loadBest());
  const [distance, setDistance] = useState(0);
  const [lives, setLives] = useState(3);
  const [objects, setObjects] = useState([]);
  const [jumping, setJumping] = useState(false);
  const [sliding, setSliding] = useState(false);
  const [hurt, setHurt] = useState(false);
  const [activePower, setActivePower] = useState({});
  const [toast, setToast] = useState(null);
  const [combo, setCombo] = useState(0);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    objectsRef.current = objects;
  }, [objects]);

  useEffect(() => {
    actionRef.current = { jumping, sliding };
  }, [jumping, sliding]);

  useEffect(() => {
    activePowerRef.current = activePower;
  }, [activePower]);

  const level = Math.min(10, Math.floor(distance / 500) + 1);

  const speed = useMemo(() => {
    const base = 235 + (level - 1) * 17;
    return activePower.turbo ? base * 1.23 : base;
  }, [level, activePower.turbo]);

  const showToast = (text, duration = 650) => {
    setToast(text);
    window.setTimeout(() => setToast(null), duration);
  };

  const updateBest = (value) => {
    setBest((current) => {
      if (value > current) {
        saveBest(value);
        return value;
      }
      return current;
    });
  };

  const resetRefs = () => {
    spawnRef.current = 0;
    coinSpawnRef.current = 0;
    powerSpawnRef.current = 0;
    objectsRef.current = [];
    actionRef.current = { jumping: false, sliding: false };
    activePowerRef.current = {};
    invincibleRef.current = false;
  };

  const start = () => {
    resetRefs();
    setScore(0);
    setDistance(0);
    setLives(3);
    setObjects([]);
    setJumping(false);
    setSliding(false);
    setHurt(false);
    setActivePower({});
    setCombo(0);
    setStatus("playing");
    lastTimeRef.current = performance.now();
    showToast("🚨 فرار شروع شد!");
  };

  const restart = start;

  const jump = () => {
    if (status !== "playing" || jumping || sliding) return;
    setJumping(true);
    window.setTimeout(() => setJumping(false), 650);
  };

  const slide = () => {
    if (status !== "playing" || sliding || jumping) return;
    setSliding(true);
    window.setTimeout(() => setSliding(false), 620);
  };

  const pause = () => {
    if (status === "playing") setStatus("paused");
  };

  const resume = () => {
    if (status !== "paused") return;
    lastTimeRef.current = performance.now();
    setStatus("playing");
  };

  useEffect(() => {
    const onKey = (e) => {
      if (status !== "playing") return;

      if (["arrowup", "w", " "].includes(e.key.toLowerCase())) {
        e.preventDefault();
        jump();
      }

      if (["arrowdown", "s"].includes(e.key.toLowerCase())) {
        e.preventDefault();
        slide();
      }
    };

    window.addEventListener("keydown", onKey, { passive: false });
    return () => window.removeEventListener("keydown", onKey);
  }, [status, jumping, sliding]);

  const onTouchStart = (e) => {
    if (status !== "playing") return;
    const t = e.touches?.[0];
    if (t) swipeRef.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e) => {
    if (status !== "playing" || !swipeRef.current) return;

    const t = e.changedTouches?.[0];
    if (!t) return;

    const dx = t.clientX - swipeRef.current.x;
    const dy = t.clientY - swipeRef.current.y;
    swipeRef.current = null;

    if (Math.abs(dy) > 28 && Math.abs(dy) > Math.abs(dx)) {
      dy < 0 ? jump() : slide();
      return;
    }

    if (Math.abs(dx) < 18 && Math.abs(dy) < 18) jump();
  };

  const spawnObstacle = () => {
    const roll = Math.random();
    const type = roll < 0.48 ? "crate" : roll < 0.76 ? "drone" : "laser";

    return {
      id: uid(),
      category: "obstacle",
      type,
      x: 460,
      passed: false,
    };
  };

  const spawnCoinLine = () => {
    const count = 3 + Math.floor(Math.random() * 3);
    const high = Math.random() < 0.35;

    return Array.from({ length: count }).map((_, i) => ({
      id: uid(),
      category: "coin",
      x: 455 + i * 48,
      yMode: high ? "high" : "low",
    }));
  };

  const spawnPowerup = () => {
    const keys = Object.keys(POWERUPS);
    return {
      id: uid(),
      category: "power",
      type: keys[Math.floor(Math.random() * keys.length)],
      x: 475,
    };
  };

  const activatePower = (kind) => {
    const config = POWERUPS[kind];

    setActivePower((prev) => ({ ...prev, [kind]: true }));
    showToast(`${config.icon} ${config.title}!`, 900);

    window.setTimeout(() => {
      setActivePower((prev) => ({ ...prev, [kind]: false }));
    }, config.duration);
  };

  const isObstacleHit = (obj) => {
    if (obj.category !== "obstacle") return false;

    const action = actionRef.current;
    const powers = activePowerRef.current;

    const withinX = obj.x < 120 && obj.x > 45;
    if (!withinX) return false;

    if (powers.giant) {
      return false;
    }

    if (obj.type === "crate") {
      return !action.jumping;
    }

    if (obj.type === "drone") {
      return !action.sliding;
    }

    if (obj.type === "laser") {
      return !action.jumping;
    }

    return false;
  };

  const coinCanCollect = (obj) => {
    if (obj.category !== "coin") return false;

    const powers = activePowerRef.current;

    if (powers.magnet && obj.x < 245) return true;
    if (obj.x > 118 || obj.x < 40) return false;

    if (obj.yMode === "high") return actionRef.current.jumping;
    return !actionRef.current.jumping || obj.x < 90;
  };

  const powerCanCollect = (obj) =>
    obj.category === "power" && obj.x < 118 && obj.x > 42;

  const takeHit = () => {
    if (invincibleRef.current) return;

    if (activePowerRef.current.shield) {
      setActivePower((prev) => ({ ...prev, shield: false }));
      showToast("🛡️ سپر نجاتت داد!");
      invincibleRef.current = true;
      window.setTimeout(() => {
        invincibleRef.current = false;
      }, 650);
      return;
    }

    invincibleRef.current = true;
    setHurt(true);
    setShake(true);
    setCombo(0);

    window.setTimeout(() => setHurt(false), 350);
    window.setTimeout(() => setShake(false), 300);
    window.setTimeout(() => {
      invincibleRef.current = false;
    }, 1150);

    setLives((current) => {
      const next = current - 1;

      if (next <= 0) {
        setStatus("gameover");
        updateBest(score);
        return 0;
      }

      showToast("💥 اوه! مراقب باش");
      return next;
    });
  };

  useEffect(() => {
    if (status !== "playing") return;

    const loop = (now) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.045);
      lastTimeRef.current = now;

      const speedMultiplier = activePowerRef.current.turbo ? 1.23 : 1;
      const currentLevel = Math.min(10, Math.floor(distance / 500) + 1);
      const currentSpeed = (235 + (currentLevel - 1) * 17) * speedMultiplier;

      setDistance((d) => d + currentSpeed * dt * 0.16);
      setScore((s) => s + Math.max(1, Math.round(dt * 8 * (1 + currentLevel * 0.08))));

      spawnRef.current += dt;
      coinSpawnRef.current += dt;
      powerSpawnRef.current += dt;

      const obstacleEvery = Math.max(0.78, 1.48 - currentLevel * 0.055);

      if (spawnRef.current >= obstacleEvery) {
        spawnRef.current = 0;
        setObjects((prev) => [...prev, spawnObstacle()]);
      }

      if (coinSpawnRef.current >= 1.65) {
        coinSpawnRef.current = 0;
        setObjects((prev) => [...prev, ...spawnCoinLine()]);
      }

      if (powerSpawnRef.current >= 9.5 + Math.random() * 4) {
        powerSpawnRef.current = 0;
        setObjects((prev) => [...prev, spawnPowerup()]);
      }

      setObjects((prev) => {
        let hit = false;
        let coins = 0;
        const collectedPowers = [];
        let near = 0;

        const moved = prev
          .map((obj) => ({ ...obj, x: obj.x - currentSpeed * dt }))
          .filter((obj) => obj.x > -100);

        const survivors = [];

        for (const obj of moved) {
          if (obj.category === "coin" && coinCanCollect(obj)) {
            coins += 1;
            continue;
          }

          if (obj.category === "power" && powerCanCollect(obj)) {
            collectedPowers.push(obj.type);
            continue;
          }

          if (obj.category === "obstacle") {
            if (isObstacleHit(obj)) {
              hit = true;
              continue;
            }

            if (!obj.passed && obj.x < 35) {
              obj.passed = true;
              near += 1;
            }
          }

          survivors.push(obj);
        }

        if (coins > 0) {
          const bonus = coins * 25;
          setScore((s) => s + bonus);
          setCombo((c) => c + coins);
          if (coins >= 2) showToast(`🪙 +${bonus}`, 400);
        }

        if (near > 0) {
          setScore((s) => s + near * 12);
          setCombo((c) => c + near);
        }

        collectedPowers.forEach(activatePower);

        if (hit) takeHit();

        return survivors;
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    lastTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, distance]);

  const progressToNext = ((distance % 500) / 500) * 100;

  return (
    <div className="w-full flex justify-center">
      <motion.div
        ref={stageRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        animate={shake ? { x: [0, 8, -7, 6, -4, 0] } : { x: 0 }}
        transition={{ duration: 0.28 }}
        style={{ touchAction: "none", height: "min(74dvh, 650px)" }}
        className="relative w-full max-w-[430px] min-h-[560px] overflow-hidden rounded-[30px] border border-cyan-200/15 bg-slate-950 shadow-[0_25px_70px_rgba(2,6,23,.6)] select-none"
      >
        <LabBackground speed={speed} chaos={level >= 6 || !!activePower.turbo} />

        {/* HUD */}
        <div className="absolute top-3 left-3 right-3 z-50">
          <div className="rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur-md px-3 py-2.5 shadow-xl">
            <div className="flex items-center justify-between gap-2 text-white">
              <div>
                <div className="text-[9px] text-white/45">امتیاز</div>
                <div className="text-base font-black leading-none">{score}</div>
              </div>

              <div className="text-center">
                <div className="text-[9px] text-white/45">بخش</div>
                <div className="font-black text-cyan-200 leading-none">{level}</div>
              </div>

              <div className="flex gap-0.5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span key={i} className={i < lives ? "" : "grayscale opacity-20"}>
                    ❤️
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={status === "playing" ? pause : status === "paused" ? resume : undefined}
                className="w-9 h-9 rounded-xl border border-white/10 bg-white/10 text-white active:scale-95"
              >
                {status === "paused" ? "▶" : "Ⅱ"}
              </button>
            </div>

            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-yellow-300 to-orange-400"
                animate={{ width: `${progressToNext}%` }}
              />
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between px-1 text-[10px] text-white/55">
            <span>🏆 {best}</span>
            <span>{combo >= 3 ? `🔥 کمبو ×${combo}` : `فرار: ${Math.floor(distance)}m`}</span>
          </div>
        </div>

        {/* Active powers */}
        <div className="absolute top-[92px] right-3 z-40 flex flex-col gap-1">
          {Object.entries(activePower)
            .filter(([, enabled]) => enabled)
            .map(([kind]) => (
              <motion.div
                key={kind}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-9 h-9 rounded-xl border border-white/15 bg-black/45 backdrop-blur flex items-center justify-center text-lg"
              >
                {POWERUPS[kind]?.icon}
              </motion.div>
            ))}
        </div>

        {/* Floor */}
        <div
          className="absolute left-0 right-0 bottom-[12%] h-[16%]"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,23,42,.2), #111827 25%, #030712 100%)",
            borderTop: "2px solid rgba(103,232,249,.22)",
          }}
        >
          <motion.div
            className="absolute inset-0 opacity-25"
            animate={{ backgroundPositionX: ["0px", "-120px"] }}
            transition={{ duration: Math.max(0.35, 0.85 - level * 0.04), repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent 0 55px, rgba(103,232,249,.3) 56px 58px)",
              backgroundSize: "120px 100%",
            }}
          />
        </div>

        {/* Exit signs */}
        <motion.div
          className="absolute top-[25%] right-[-20px] px-5 py-2 rounded-l-xl border border-emerald-300/30 bg-emerald-950/45 text-emerald-200 text-[10px] font-black"
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 1.1, repeat: Infinity }}
        >
          ← خروج اضطراری
        </motion.div>

        {/* Objects */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <AnimatePresence>
            {objects.map((obj) => {
              let top;

              if (obj.category === "obstacle") {
                top =
                  obj.type === "drone"
                    ? GROUND_Y - 68
                    : obj.type === "laser"
                    ? GROUND_Y - 78
                    : GROUND_Y - 48;
              } else if (obj.category === "coin") {
                top = obj.yMode === "high" ? GROUND_Y - 120 : GROUND_Y - 35;
              } else {
                top = GROUND_Y - 65;
              }

              return (
                <motion.div
                  key={obj.id}
                  className="absolute"
                  style={{ left: obj.x, top }}
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.35 }}
                >
                  {obj.category === "coin" && <Coin />}
                  {obj.category === "power" && <Powerup kind={obj.type} />}
                  {obj.category === "obstacle" && obj.type === "crate" && <Crate />}
                  {obj.category === "obstacle" && obj.type === "laser" && <Laser />}
                  {obj.category === "obstacle" && obj.type === "drone" && <Drone />}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Jelly */}
        <div
          className="absolute z-30"
          style={{
            left: PLAYER_X,
            top: GROUND_Y - 50,
            transform: "translateX(-50%)",
          }}
        >
          <Jelly
            jumping={jumping}
            sliding={sliding}
            giant={!!activePower.giant}
            shield={!!activePower.shield}
            turbo={!!activePower.turbo}
            hurt={hurt}
          />
        </div>

        {/* Dust */}
        {status === "playing" && !jumping && (
          <div className="absolute z-20" style={{ left: 18, top: GROUND_Y + 2 }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-cyan-100/25"
                animate={{ x: [30, -25 - i * 8], y: [0, -5 + i * 2], scale: [0.8, 1.5, 0], opacity: [0, 0.6, 0] }}
                transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.11 }}
              />
            ))}
          </div>
        )}

        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute top-[25%] left-0 right-0 z-[60] flex justify-center pointer-events-none"
            >
              <div className="rounded-full border border-white/15 bg-black/65 px-4 py-2 text-xs font-black text-white backdrop-blur-md shadow-xl">
                {toast}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile controls */}
        <div className="absolute bottom-3 left-3 right-3 z-50 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={jump}
            className="h-16 rounded-[22px] border border-cyan-200/20 bg-slate-950/65 backdrop-blur-md text-white shadow-xl active:scale-95 active:bg-cyan-950/70 transition"
          >
            <div className="text-xl">⬆️</div>
            <div className="text-[10px] font-black">بپر!</div>
          </button>

          <button
            type="button"
            onClick={slide}
            className="h-16 rounded-[22px] border border-purple-200/20 bg-slate-950/65 backdrop-blur-md text-white shadow-xl active:scale-95 active:bg-purple-950/70 transition"
          >
            <div className="text-xl">⬇️</div>
            <div className="text-[10px] font-black">سر بخور!</div>
          </button>
        </div>

        {/* Ready */}
        <AnimatePresence>
          {status === "ready" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[80] flex items-center justify-center bg-slate-950/78 backdrop-blur-[4px] p-5"
            >
              <motion.div
                initial={{ y: 18, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                className="w-full max-w-sm rounded-[30px] border border-yellow-200/15 bg-slate-900/90 p-6 text-center text-white shadow-2xl"
              >
                <div className="mx-auto mb-5 w-24 h-20 flex items-center justify-center">
                  <Jelly />
                </div>

                <div className="text-3xl font-black text-yellow-300">ژلی فراری!</div>
                <div className="mt-1 text-[11px] font-bold tracking-wide text-cyan-200">
                  فرار بزرگ از آزمایشگاه ژنینو
                </div>

                <p className="mt-4 text-sm leading-7 text-white/70">
                  ژلی کوچولو از آزمایشگاه فرار کرده! بپر، سر بخور، از لیزرها رد شو و قدرت‌های عجیب جمع کن.
                </p>

                <div className="mt-4 grid grid-cols-4 gap-1.5 text-[9px]">
                  <div className="rounded-xl border border-white/10 bg-white/5 py-2">🛡️ سپر</div>
                  <div className="rounded-xl border border-white/10 bg-white/5 py-2">🧲 آهنربا</div>
                  <div className="rounded-xl border border-white/10 bg-white/5 py-2">🧪 غول</div>
                  <div className="rounded-xl border border-white/10 bg-white/5 py-2">⚡ توربو</div>
                </div>

                <div className="mt-4 text-xs text-white/45">
                  روی موبایل: سوایپ بالا / پایین
                </div>

                <button
                  type="button"
                  onClick={start}
                  className="mt-5 w-full rounded-2xl bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 py-3.5 font-black text-slate-950 shadow-[0_12px_32px_rgba(245,158,11,.25)] active:scale-[.98] transition"
                >
                  🚨 فرار کن!
                </button>

                <div className="mt-3 text-[10px] text-white/45">
                  🏆 رکورد: {best}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pause */}
        <AnimatePresence>
          {status === "paused" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[80] flex items-center justify-center bg-black/75 backdrop-blur-sm p-5"
            >
              <div className="w-full max-w-xs rounded-[28px] border border-white/15 bg-slate-900/95 p-6 text-center text-white">
                <div className="text-5xl">🧪</div>
                <div className="mt-3 text-xl font-black">ژلی یه نفس گرفت!</div>
                <button
                  type="button"
                  onClick={resume}
                  className="mt-5 w-full rounded-2xl bg-yellow-400 py-3 font-black text-slate-950"
                >
                  ادامه فرار
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game over */}
        <AnimatePresence>
          {status === "gameover" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-[90] flex items-center justify-center bg-slate-950/82 backdrop-blur-md p-5"
            >
              <motion.div
                initial={{ y: 20, scale: 0.94 }}
                animate={{ y: 0, scale: 1 }}
                className="w-full max-w-sm rounded-[30px] border border-red-300/15 bg-slate-900/95 p-6 text-center text-white shadow-2xl"
              >
                <div className="text-5xl">😵‍💫</div>
                <div className="mt-2 text-2xl font-black">گرفتنش!</div>
                <p className="mt-2 text-sm text-white/60">
                  نگهبان‌های آزمایشگاه بالاخره ژلی رو گرفتن.
                </p>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <div className="text-[9px] text-white/45">امتیاز</div>
                    <div className="font-black">{score}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <div className="text-[9px] text-white/45">مسافت</div>
                    <div className="font-black">{Math.floor(distance)}m</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <div className="text-[9px] text-white/45">رکورد</div>
                    <div className="font-black text-yellow-300">{Math.max(best, score)}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={restart}
                  className="mt-5 w-full rounded-2xl bg-gradient-to-r from-yellow-300 to-orange-400 py-3.5 font-black text-slate-950"
                >
                  دوباره فرار کن
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
