import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const LS_BEST = "genino_car_race_best_v2";

const loadBest = () => {
  try {
    const value = Number(localStorage.getItem(LS_BEST) || 0);
    return Number.isFinite(value) ? value : 0;
  } catch {
    return 0;
  }
};

const saveBest = (value) => {
  try {
    localStorage.setItem(LS_BEST, String(value));
  } catch {}
};

const CAR_PALETTES = {
  player: ["#fbbf24", "#f59e0b", "#16a34a"],
  cyan: ["#22d3ee", "#0284c7", "#0f172a"],
  red: ["#fb7185", "#dc2626", "#450a0a"],
  violet: ["#c084fc", "#7c3aed", "#2e1065"],
  silver: ["#cbd5e1", "#64748b", "#0f172a"],
  taxi: ["#fde047", "#f59e0b", "#713f12"],
};

function CarSprite({ kind = "cyan", player = false, shield = false }) {
  const palette = player
    ? CAR_PALETTES.player
    : CAR_PALETTES[kind] || CAR_PALETTES.cyan;

  return (
    <div className="relative w-[46px] h-[78px] sm:w-[50px] sm:h-[84px]">
      {shield && (
        <motion.div
          className="absolute -inset-3 rounded-[45%] border-2 border-yellow-300/70"
          animate={{ scale: [0.94, 1.08, 0.94], opacity: [0.45, 0.95, 0.45] }}
          transition={{ duration: 0.55, repeat: Infinity }}
          style={{ boxShadow: "0 0 22px rgba(250,204,21,.45)" }}
        />
      )}

      <div
        className="absolute inset-x-[6px] top-[4px] bottom-[4px] rounded-[16px] border border-white/25 overflow-hidden"
        style={{
          background: `linear-gradient(150deg, ${palette[0]} 0%, ${palette[1]} 55%, ${palette[2]} 100%)`,
          boxShadow: player
            ? "0 8px 18px rgba(0,0,0,.35), 0 0 18px rgba(250,204,21,.25)"
            : "0 7px 16px rgba(0,0,0,.35)",
        }}
      >
        <div className="absolute top-[13px] left-[7px] right-[7px] h-[18px] rounded-[7px] bg-sky-100/75 border border-white/30">
          <div className="absolute inset-[3px] rounded-[4px] bg-gradient-to-b from-sky-300/80 to-slate-800/80" />
        </div>
        <div className="absolute bottom-[14px] left-[8px] right-[8px] h-[13px] rounded-[5px] bg-slate-950/65" />
        <div className="absolute top-[7px] left-[7px] w-[7px] h-[5px] rounded-full bg-yellow-100 shadow-[0_0_7px_rgba(254,240,138,.8)]" />
        <div className="absolute top-[7px] right-[7px] w-[7px] h-[5px] rounded-full bg-yellow-100 shadow-[0_0_7px_rgba(254,240,138,.8)]" />
        <div className="absolute bottom-[6px] left-[7px] w-[7px] h-[5px] rounded-full bg-red-400 shadow-[0_0_7px_rgba(248,113,113,.8)]" />
        <div className="absolute bottom-[6px] right-[7px] w-[7px] h-[5px] rounded-full bg-red-400 shadow-[0_0_7px_rgba(248,113,113,.8)]" />
        {kind === "taxi" && !player && (
          <div className="absolute top-[1px] left-1/2 -translate-x-1/2 px-1.5 py-[1px] rounded-sm bg-yellow-200 text-[6px] font-black text-black">
            TAXI
          </div>
        )}
      </div>

      <div className="absolute left-0 top-[16px] w-[7px] h-[17px] rounded-l-md bg-black" />
      <div className="absolute right-0 top-[16px] w-[7px] h-[17px] rounded-r-md bg-black" />
      <div className="absolute left-0 bottom-[14px] w-[7px] h-[17px] rounded-l-md bg-black" />
      <div className="absolute right-0 bottom-[14px] w-[7px] h-[17px] rounded-r-md bg-black" />

      {player && (
        <motion.div
          className="absolute -bottom-9 left-1/2 -translate-x-1/2 w-8 h-12 rounded-full pointer-events-none"
          animate={{ scaleY: [0.75, 1.2, 0.75], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 0.22, repeat: Infinity }}
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(253,224,71,.95), rgba(249,115,22,.7) 35%, rgba(239,68,68,.2) 65%, transparent 72%)",
            filter: "blur(2px)",
          }}
        />
      )}
    </div>
  );
}

function CoinSprite() {
  return (
    <motion.div
      className="relative w-9 h-9 rounded-full border-2 border-yellow-100 flex items-center justify-center font-black text-yellow-950 text-sm"
      animate={{ rotateY: [0, 180, 360], scale: [1, 0.72, 1] }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
      style={{
        background: "radial-gradient(circle at 35% 30%, #fef08a, #facc15 45%, #ca8a04 80%)",
        boxShadow: "0 0 18px rgba(250,204,21,.55)",
      }}
    >
      G
    </motion.div>
  );
}

function RoadsideLights({ offset }) {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => {
        const y = ((i * 92 + offset) % 736) - 80;
        return (
          <React.Fragment key={i}>
            <div className="absolute left-[3%] w-[3px] h-12 bg-slate-500/60" style={{ top: y }}>
              <div className="absolute -left-[5px] -top-1 w-3 h-3 rounded-full bg-cyan-200 shadow-[0_0_14px_rgba(103,232,249,.9)]" />
            </div>
            <div className="absolute right-[3%] w-[3px] h-12 bg-slate-500/60" style={{ top: y }}>
              <div className="absolute -left-[5px] -top-1 w-3 h-3 rounded-full bg-fuchsia-200 shadow-[0_0_14px_rgba(244,114,182,.8)]" />
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
}

export default function GeninoCarRaceGame({
  stages = 10,
  stageSeconds = 30,
  livesStart = 3,
}) {
  const stageRef = useRef(null);
  const rafRef = useRef(null);
  const lastT = useRef(performance.now());
  const spawnAcc = useRef(0);
  const coinAcc = useRef(0);
  const swipeStart = useRef(null);
  const tapStartRef = useRef(null);
  const endAtRef = useRef(null);
  const pausedLeftMsRef = useRef(null);
  const nearMissRef = useRef(new Set());
  const objsRef = useRef([]);
  const shieldRef = useRef(false);

  const H = 620;
  const lanesX = useMemo(() => [20, 50, 80], []);
  const playerY = 500;
  const playerH = 84;

  const [lane, setLane] = useState(1);
  const [stage, setStage] = useState(1);
  const [timeLeft, setTimeLeft] = useState(stageSeconds);
  const [status, setStatus] = useState("ready");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => loadBest());
  const [lives, setLives] = useState(livesStart);
  const [shield, setShield] = useState(false);
  const [objs, setObjs] = useState([]);
  const [roadOffset, setRoadOffset] = useState(0);
  const [shake, setShake] = useState(false);
  const [toast, setToast] = useState(null);
  const [stageBanner, setStageBanner] = useState(null);
  const [combo, setCombo] = useState(0);

  useEffect(() => {
    objsRef.current = objs;
  }, [objs]);

  useEffect(() => {
    shieldRef.current = shield;
  }, [shield]);

  const stageCfg = useMemo(() => {
    const roadSpeed = 225 + (stage - 1) * 27;
    const spawnRate = 0.72 + (stage - 1) * 0.115;
    const coinRate = clamp(0.22 + (stage - 1) * 0.025, 0.22, 0.46);
    const maxObjs = clamp(7 + stage, 8, 17);
    return { roadSpeed, spawnRate, coinRate, maxObjs };
  }, [stage]);

  const speedLabel =
    stage <= 2 ? "آرام" : stage <= 5 ? "سریع" : stage <= 8 ? "خیلی سریع" : "توربو";

  const updateBest = (value) => {
    setBest((old) => {
      if (value > old) {
        saveBest(value);
        return value;
      }
      return old;
    });
  };

  const showToast = (message, duration = 650) => {
    setToast(message);
    window.setTimeout(() => setToast(null), duration);
  };

  const flashShake = () => {
    setShake(true);
    window.setTimeout(() => setShake(false), 260);
  };

  const resetRuntime = () => {
    spawnAcc.current = 0;
    coinAcc.current = 0;
    nearMissRef.current = new Set();
    pausedLeftMsRef.current = null;
    swipeStart.current = null;
    tapStartRef.current = null;
  };

  const hardReset = () => {
    resetRuntime();
    setLane(1);
    setStage(1);
    setTimeLeft(stageSeconds);
    setScore(0);
    setLives(livesStart);
    setShield(false);
    setObjs([]);
    setCombo(0);
    setToast(null);
    setStageBanner(null);
    setStatus("ready");
    endAtRef.current = null;
  };

  const start = () => {
    resetRuntime();
    setLane(1);
    setStage(1);
    setScore(0);
    setLives(livesStart);
    setShield(false);
    setObjs([]);
    setCombo(0);
    setStatus("playing");
    lastT.current = performance.now();
    endAtRef.current = Date.now() + stageSeconds * 1000;
    setTimeLeft(stageSeconds);
    showToast("🏁 حرکت!");
  };

  const restart = start;

  const pauseGame = () => {
    if (status !== "playing" || !endAtRef.current) return;
    pausedLeftMsRef.current = Math.max(0, endAtRef.current - Date.now());
    setStatus("paused");
  };

  const resumeGame = () => {
    if (status !== "paused") return;
    const left = pausedLeftMsRef.current ?? timeLeft * 1000;
    endAtRef.current = Date.now() + left;
    lastT.current = performance.now();
    setStatus("playing");
    showToast("▶ ادامه بده!");
  };

  const nextStage = () => {
    const next = stage + 1;

    if (next > stages) {
      setStatus("win");
      updateBest(score);
      return;
    }

    setStatus("stage");
    setStageBanner(`مرحله ${next}`);
    window.setTimeout(() => {
      setStage(next);
      setObjs([]);
      setShield(false);
      setCombo(0);
      spawnAcc.current = 0;
      coinAcc.current = 0;
      endAtRef.current = Date.now() + stageSeconds * 1000;
      setTimeLeft(stageSeconds);
      setStatus("playing");
      setStageBanner(null);
      lastT.current = performance.now();
    }, 1150);
  };

  useEffect(() => {
    if (status !== "playing") return;

    const timer = window.setInterval(() => {
      if (!endAtRef.current) return;
      const ms = endAtRef.current - Date.now();
      setTimeLeft(Math.max(0, Math.ceil(ms / 1000)));
      if (ms <= 0) {
        window.clearInterval(timer);
        nextStage();
      }
    }, 180);

    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, stage]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (status !== "playing") return;
      const key = e.key.toLowerCase();
      if (["arrowleft", "arrowright", "a", "d"].includes(key)) e.preventDefault();

      if (key === "arrowleft" || key === "a") {
        setLane((value) => clamp(value - 1, 0, 2));
      }
      if (key === "arrowright" || key === "d") {
        setLane((value) => clamp(value + 1, 0, 2));
      }
    };

    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [status]);

  const moveLeft = () => {
    if (status === "playing") setLane((value) => clamp(value - 1, 0, 2));
  };

  const moveRight = () => {
    if (status === "playing") setLane((value) => clamp(value + 1, 0, 2));
  };

  const onTouchStart = (e) => {
    if (status !== "playing") return;
    const touch = e.touches?.[0];
    if (touch) swipeStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (e) => {
    if (status !== "playing" || !swipeStart.current) return;
    const touch = e.changedTouches?.[0];
    if (!touch) return;

    const dx = touch.clientX - swipeStart.current.x;
    const dy = touch.clientY - swipeStart.current.y;
    swipeStart.current = null;

    if (Math.abs(dx) > 24 && Math.abs(dx) > Math.abs(dy)) {
      dx > 0 ? moveRight() : moveLeft();
    }
  };

  const onPointerDownRoad = (e) => {
    if (status !== "playing" || e.target?.closest?.("button")) return;
    tapStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUpRoad = (e) => {
    if (status !== "playing" || e.target?.closest?.("button")) return;
    const startPoint = tapStartRef.current;
    tapStartRef.current = null;
    if (!startPoint) return;

    const dx = Math.abs(e.clientX - startPoint.x);
    const dy = Math.abs(e.clientY - startPoint.y);
    if (dx > 14 || dy > 14) return;

    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    e.clientX < rect.left + rect.width / 2 ? moveLeft() : moveRight();
  };

  const spawnEnemyCar = () => {
    const existingCars = objsRef.current.filter((o) => o.type === "car");
    let lanePick = Math.floor(Math.random() * 3);

    if (existingCars.some((c) => c.lane === lanePick && c.y < 155)) {
      lanePick = (lanePick + 1) % 3;
    }

    const kinds = ["cyan", "red", "violet", "silver", "taxi"];
    return {
      id: makeId(),
      type: "car",
      lane: lanePick,
      y: -100,
      speed: stageCfg.roadSpeed * (0.9 + Math.random() * 0.22),
      kind: kinds[Math.floor(Math.random() * kinds.length)],
    };
  };

  const spawnCoin = () => ({
    id: makeId(),
    type: "coin",
    lane: Math.floor(Math.random() * 3),
    y: -55,
    speed: stageCfg.roadSpeed * (0.96 + Math.random() * 0.12),
  });

  const overlapY = (aTop, aH, bTop, bH, pad = 9) =>
    aTop < bTop + bH - pad && aTop + aH > bTop + pad;

  const checkCarHit = (obj) =>
    obj.type === "car" &&
    obj.lane === lane &&
    overlapY(playerY, playerH, obj.y, 84, 12);

  const checkCoinPickup = (obj) =>
    obj.type === "coin" &&
    obj.lane === lane &&
    overlapY(playerY, playerH, obj.y, 36, 5);

  const loseGame = () => {
    setStatus("lose");
    flashShake();
    updateBest(score);
  };

  const takeHit = () => {
    if (shieldRef.current) return;

    setCombo(0);
    setLives((current) => {
      const next = current - 1;
      flashShake();

      if (next <= 0) {
        loseGame();
        return 0;
      }

      setShield(true);
      showToast("🛡️ مراقب باش!");
      window.setTimeout(() => setShield(false), 1800);
      return next;
    });
  };

  useEffect(() => {
    if (status !== "playing") return;

    const loop = (time) => {
      const dt = Math.min((time - lastT.current) / 1000, 0.04);
      lastT.current = time;

      setRoadOffset((value) => (value + stageCfg.roadSpeed * dt) % 120);
      setScore((value) => value + Math.max(1, Math.round(5 * dt * (1 + stage * 0.1))));

      spawnAcc.current += dt * stageCfg.spawnRate;
      if (spawnAcc.current >= 1) {
        const count = Math.floor(spawnAcc.current);
        spawnAcc.current -= count;
        setObjs((previous) => {
          const next = [...previous];
          for (let i = 0; i < count; i += 1) {
            if (next.length < stageCfg.maxObjs) next.push(spawnEnemyCar());
          }
          return next;
        });
      }

      coinAcc.current += dt * stageCfg.coinRate;
      if (coinAcc.current >= 1) {
        coinAcc.current -= Math.floor(coinAcc.current);
        setObjs((previous) =>
          previous.length < stageCfg.maxObjs ? [...previous, spawnCoin()] : previous
        );
      }

      setObjs((previous) => {
        let hit = false;
        let coinPoints = 0;
        let nearPoints = 0;

        const moved = previous
          .map((o) => ({ ...o, y: o.y + o.speed * dt }))
          .filter((o) => o.y < H + 120);

        for (const obj of moved) {
          if (!hit && checkCarHit(obj)) hit = true;
        }

        const afterCoins = moved.filter((obj) => {
          if (checkCoinPickup(obj)) {
            coinPoints += 30;
            return false;
          }
          return true;
        });

        for (const obj of afterCoins) {
          if (obj.type !== "car" || obj.lane !== lane || nearMissRef.current.has(obj.id)) {
            continue;
          }

          const gap = Math.abs(obj.y + 84 - playerY);
          if (gap < 14 && gap > 2 && !checkCarHit(obj)) {
            nearMissRef.current.add(obj.id);
            nearPoints += 15;
          }
        }

        if (coinPoints) {
          setScore((value) => value + coinPoints);
          setCombo((value) => value + 1);
          showToast(`🪙 +${coinPoints}`, 380);
        }

        if (nearPoints) {
          setScore((value) => value + nearPoints);
          setCombo((value) => value + 1);
          showToast(`⚡ سبقت نزدیک +${nearPoints}`, 420);
        }

        if (hit) {
          takeHit();
          return afterCoins.filter(
            (obj) =>
              !(
                obj.type === "car" &&
                obj.lane === lane &&
                Math.abs(obj.y - playerY) < 105
              )
          );
        }

        return afterCoins;
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    lastT.current = performance.now();
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, stage, lane, stageCfg.roadSpeed, stageCfg.spawnRate, stageCfg.coinRate, stageCfg.maxObjs]);

  const laneX = lanesX[lane];
  const progress = clamp(((stageSeconds - timeLeft) / stageSeconds) * 100, 0, 100);

  return (
    <div className="w-full flex justify-center">
      <motion.div
        ref={stageRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onPointerDown={onPointerDownRoad}
        onPointerUp={onPointerUpRoad}
        animate={shake ? { x: [0, 8, -7, 5, -3, 0] } : { x: 0 }}
        transition={{ duration: 0.25 }}
        style={{ touchAction: "none", height: "min(74dvh, 680px)" }}
        className="relative w-full max-w-[430px] min-h-[560px] overflow-hidden rounded-[28px] border border-white/15 bg-[#07101d] shadow-[0_25px_70px_rgba(2,6,23,.55)] select-none"
      >
        {/* Sky / city */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#071426] via-[#0b1724] to-[#020617]" />
        <div
          className="absolute inset-x-0 top-0 h-[38%] opacity-80"
          style={{
            background:
              "radial-gradient(circle at 50% 20%, rgba(14,165,233,.18), transparent 42%), radial-gradient(circle at 20% 30%, rgba(168,85,247,.14), transparent 34%)",
          }}
        />

        <div className="absolute top-[15%] left-0 right-0 h-[18%] opacity-60 pointer-events-none">
          {Array.from({ length: 13 }).map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 bg-slate-950 border-t border-slate-700/40"
              style={{
                left: `${i * 8 - 2}%`,
                width: `${7 + (i % 3) * 2}%`,
                height: `${28 + (i % 5) * 11}%`,
              }}
            >
              <div className="absolute inset-2 opacity-60 bg-[radial-gradient(circle,#fde68a_1px,transparent_1.5px)] bg-[length:9px_11px]" />
            </div>
          ))}
        </div>

        {/* Road */}
        <div
          className="absolute left-[7%] right-[7%] top-[19%] bottom-0 overflow-hidden"
          style={{
            clipPath: "polygon(34% 0, 66% 0, 100% 100%, 0 100%)",
            background:
              "linear-gradient(90deg,#111827 0%,#202938 12%,#29313d 50%,#202938 88%,#111827 100%)",
            boxShadow: "inset 0 0 35px rgba(0,0,0,.65)",
          }}
        >
          <div className="absolute inset-y-0 left-[1.5%] w-[1.5%] bg-yellow-300/80" />
          <div className="absolute inset-y-0 right-[1.5%] w-[1.5%] bg-yellow-300/80" />

          {[33.333, 66.666].map((x) => (
            <div key={x} className="absolute inset-y-0 w-[3px]" style={{ left: `${x}%` }}>
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full rounded-full bg-white/75"
                  style={{
                    height: 44,
                    top: `${i * 86 + (roadOffset % 86) - 86}px`,
                    boxShadow: "0 0 5px rgba(255,255,255,.25)",
                  }}
                />
              ))}
            </div>
          ))}

          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent 0 22px, rgba(255,255,255,.3) 23px 24px)",
              backgroundPositionY: `${roadOffset}px`,
            }}
          />
        </div>

        <RoadsideLights offset={roadOffset * 1.45} />

        {/* Speed streaks */}
        {stage >= 6 && status === "playing" && (
          <div className="absolute inset-0 pointer-events-none opacity-50">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-[2px] h-16 bg-gradient-to-b from-transparent via-cyan-100/50 to-transparent"
                style={{ left: `${5 + ((i * 17) % 90)}%`, top: `${(i * 73) % 90}%` }}
                animate={{ y: [0, 180], opacity: [0, 0.7, 0] }}
                transition={{ duration: 0.45 + (i % 3) * 0.08, repeat: Infinity, ease: "linear" }}
              />
            ))}
          </div>
        )}

        {/* HUD */}
        <div className="absolute top-3 left-3 right-3 z-40">
          <div className="rounded-2xl border border-white/10 bg-slate-950/65 backdrop-blur-md px-3 py-2.5 shadow-lg">
            <div className="flex items-center justify-between gap-2 text-white">
              <div className="min-w-0">
                <div className="text-[10px] text-white/55">امتیاز</div>
                <div className="font-black text-base leading-none">{score}</div>
              </div>

              <div className="text-center">
                <div className="text-[10px] text-white/55">مرحله</div>
                <div className="font-black text-yellow-300 leading-none">
                  {stage}/{stages}
                </div>
              </div>

              <div className="text-center">
                <div className="text-[10px] text-white/55">زمان</div>
                <div className={`font-black leading-none ${timeLeft <= 5 ? "text-red-300" : ""}`}>
                  {timeLeft}
                </div>
              </div>

              <div className="flex items-center gap-1">
                {Array.from({ length: livesStart }).map((_, i) => (
                  <span key={i} className={`text-sm ${i < lives ? "" : "grayscale opacity-20"}`}>
                    ❤️
                  </span>
                ))}
              </div>

              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() =>
                  status === "playing"
                    ? pauseGame()
                    : status === "paused"
                    ? resumeGame()
                    : null
                }
                className="w-9 h-9 rounded-xl border border-white/10 bg-white/10 flex items-center justify-center active:scale-95"
                aria-label={status === "paused" ? "ادامه بازی" : "توقف بازی"}
              >
                {status === "paused" ? "▶" : "Ⅱ"}
              </button>
            </div>

            <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500"
                animate={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mt-2 flex justify-between items-center px-1 text-[10px] text-white/60">
            <span>🏆 {best}</span>
            <span>{combo >= 2 ? `🔥 کمبو ×${combo}` : `سرعت: ${speedLabel}`}</span>
          </div>
        </div>

        {/* Game objects */}
        <div className="absolute left-[7%] right-[7%] top-[19%] bottom-0 z-20">
          <AnimatePresence>
            {objs.map((obj) => (
              <motion.div
                key={obj.id}
                className="absolute"
                style={{
                  left: `${lanesX[obj.lane]}%`,
                  top: `${(obj.y / H) * 100}%`,
                  transform: "translateX(-50%)",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.25 }}
              >
                {obj.type === "car" ? <CarSprite kind={obj.kind} /> : <CoinSprite />}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Player */}
          <motion.div
            className="absolute z-30"
            animate={{ left: `${laneX}%` }}
            style={{
              top: `${(playerY / H) * 100}%`,
              transform: "translateX(-50%)",
            }}
            transition={{ type: "spring", stiffness: 430, damping: 29, mass: 0.65 }}
          >
            <CarSprite player shield={shield} />
          </motion.div>
        </div>

        {/* Toast */}
        <AnimatePresence>
          {(toast || stageBanner) && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              className="absolute top-[22%] left-0 right-0 z-50 flex justify-center pointer-events-none"
            >
              <div className="rounded-full border border-white/15 bg-black/65 backdrop-blur-md px-4 py-2 text-xs font-bold text-white shadow-xl">
                {stageBanner || toast}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls */}
        <div className="absolute bottom-4 left-4 right-4 z-40 flex justify-between items-end pointer-events-none">
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={moveLeft}
            className="pointer-events-auto w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-[22px] border border-white/15 bg-slate-950/55 backdrop-blur-md text-white text-2xl font-black shadow-xl active:scale-90 active:bg-white/20 transition"
            aria-label="حرکت به چپ"
          >
            ◀
          </button>

          <div className="mb-1 rounded-full bg-black/35 backdrop-blur px-3 py-1.5 text-[9px] text-white/55">
            لمس • سوایپ
          </div>

          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={moveRight}
            className="pointer-events-auto w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-[22px] border border-white/15 bg-slate-950/55 backdrop-blur-md text-white text-2xl font-black shadow-xl active:scale-90 active:bg-white/20 transition"
            aria-label="حرکت به راست"
          >
            ▶
          </button>
        </div>

        {/* Ready */}
        <AnimatePresence>
          {status === "ready" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[60] flex items-center justify-center bg-slate-950/72 backdrop-blur-[3px] p-5"
            >
              <motion.div
                initial={{ y: 18, opacity: 0, scale: 0.96 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                className="w-full max-w-sm rounded-[28px] border border-white/15 bg-slate-900/80 p-6 text-center text-white shadow-2xl"
              >
                <div className="mx-auto mb-4 w-20 h-20 flex items-center justify-center">
                  <CarSprite player />
                </div>
                <div className="text-2xl font-black">سبقت‌گیر ژنینو</div>
                <div className="mt-1 text-xs font-bold text-yellow-300 tracking-wider">
                  GENINO STREET RACE
                </div>
                <p className="mt-4 text-sm leading-7 text-white/70">
                  بین ماشین‌ها جاخالی بده، سکه جمع کن و تا مرحله آخر رکورد بزن.
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2 text-[10px]">
                  <div className="rounded-xl bg-white/5 border border-white/10 p-2">🏁 {stages} مرحله</div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-2">❤️ {livesStart} جان</div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-2">🏆 {best}</div>
                </div>

                <button
                  type="button"
                  onClick={start}
                  className="mt-5 w-full rounded-2xl bg-gradient-to-r from-yellow-300 to-amber-500 py-3.5 font-black text-slate-950 shadow-[0_10px_30px_rgba(245,158,11,.25)] active:scale-[.98] transition"
                >
                  شروع مسابقه
                </button>
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
              className="absolute inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-5"
            >
              <div className="w-full max-w-xs rounded-[26px] border border-white/15 bg-slate-900/90 p-6 text-center text-white">
                <div className="text-4xl">⏸️</div>
                <div className="mt-3 text-xl font-black">مسابقه متوقف شد</div>
                <button
                  type="button"
                  onClick={resumeGame}
                  className="mt-5 w-full rounded-2xl bg-yellow-400 py-3 font-black text-slate-950"
                >
                  ادامه مسابقه
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage transition */}
        <AnimatePresence>
          {status === "stage" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[60] flex items-center justify-center bg-black/55 backdrop-blur-[2px]"
            >
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: [0.7, 1.08, 1], opacity: 1 }}
                className="text-center text-white"
              >
                <div className="text-sm text-yellow-300 font-bold">آماده باش</div>
                <div className="mt-1 text-4xl font-black">{stageBanner}</div>
                <div className="mt-2 text-sm text-white/65">سرعت بیشتر می‌شود ⚡</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lose */}
        <AnimatePresence>
          {status === "lose" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-[70] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-5"
            >
              <motion.div
                initial={{ y: 20, scale: 0.94 }}
                animate={{ y: 0, scale: 1 }}
                className="w-full max-w-sm rounded-[28px] border border-red-300/15 bg-slate-900/90 p-6 text-center text-white"
              >
                <div className="text-5xl">💥</div>
                <div className="mt-2 text-2xl font-black">مسابقه تمام شد</div>
                <div className="mt-4 flex justify-center gap-6">
                  <div>
                    <div className="text-[10px] text-white/50">امتیاز</div>
                    <div className="font-black text-xl">{score}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-white/50">رکورد</div>
                    <div className="font-black text-xl text-yellow-300">{Math.max(best, score)}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={restart}
                  className="mt-5 w-full rounded-2xl bg-yellow-400 py-3 font-black text-slate-950"
                >
                  دوباره مسابقه بده
                </button>
                <button
                  type="button"
                  onClick={hardReset}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 py-3 font-bold text-white/75"
                >
                  بازگشت به شروع
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Win */}
        <AnimatePresence>
          {status === "win" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-[70] flex items-center justify-center bg-slate-950/82 backdrop-blur-sm p-5"
            >
              <motion.div
                initial={{ y: 20, scale: 0.94 }}
                animate={{ y: 0, scale: 1 }}
                className="w-full max-w-sm rounded-[28px] border border-yellow-300/20 bg-slate-900/90 p-6 text-center text-white"
              >
                <motion.div
                  className="text-6xl"
                  animate={{ rotate: [-5, 5, -5], scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.1, repeat: Infinity }}
                >
                  🏆
                </motion.div>
                <div className="mt-2 text-2xl font-black text-yellow-300">قهرمان ژنینو!</div>
                <p className="mt-2 text-sm text-white/65">
                  هر {stages} مرحله را با موفقیت تمام کردی.
                </p>
                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-[10px] text-white/50">امتیاز نهایی</div>
                  <div className="text-3xl font-black">{score}</div>
                </div>
                <button
                  type="button"
                  onClick={restart}
                  className="mt-5 w-full rounded-2xl bg-gradient-to-r from-yellow-300 to-amber-500 py-3 font-black text-slate-950"
                >
                  مسابقه دوباره
                </button>
                <button
                  type="button"
                  onClick={hardReset}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 py-3 font-bold text-white/75"
                >
                  بازگشت به شروع
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
