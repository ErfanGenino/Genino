import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const makeId = () => `${Date.now()}-${Math.random()}`;

// رکورد
const LS_BEST = "genino_car_race_best_v2";
const loadBest = () => {
  try {
    const v = Number(localStorage.getItem(LS_BEST) || 0);
    return Number.isFinite(v) ? v : 0;
  } catch {
    return 0;
  }
};
const saveBest = (v) => {
  try {
    localStorage.setItem(LS_BEST, String(v));
  } catch {}
};

export default function CarRace3LaneGame({
  stages = 10,
  stageSeconds = 30,
  livesStart = 3,
}) {
  // صحنه
  const stageRef = useRef(null);
  const H = 480;
  const W = 360;

  // لاین‌ها (درصد)
  const lanesX = useMemo(() => [18, 50, 82], []);

  // ماشین بازیکن
  const [lane, setLane] = useState(1);
  const playerY = 395;
  const playerW = 44;
  const playerH = 70;

  // وضعیت بازی
  const [stage, setStage] = useState(1);
  const [timeLeft, setTimeLeft] = useState(stageSeconds);
  const [status, setStatus] = useState("ready"); // ready | playing | stage | lose | win
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => loadBest());

  // جان + شیلد
  const [lives, setLives] = useState(livesStart);
  const [shield, setShield] = useState(false);
  const shieldRef = useRef(false);
  useEffect(() => {
    shieldRef.current = shield;
  }, [shield]);

  // آبجکت‌ها: car | coin
  const [objs, setObjs] = useState([]); // {id,type,lane,y,speed,kind}
  const objsRef = useRef([]);
  useEffect(() => {
    objsRef.current = objs;
  }, [objs]);

  // UI
  const [shake, setShake] = useState(false);
  const [toast, setToast] = useState(null);
  const [stageBanner, setStageBanner] = useState(null);

  // کنترل
  const swipeStart = useRef(null);

  // RAF
  const rafRef = useRef(null);
  const lastT = useRef(performance.now());
  const spawnAcc = useRef(0);
  const coinAcc = useRef(0);

  // تایمر مرحله (با timestamp برای دقت و بدون drift)
  const endAtRef = useRef(null);

  // سختی مرحله
  const stageCfg = useMemo(() => {
    const baseSpeed = 220;
    const speedGain = 28;
    const roadSpeed = baseSpeed + (stage - 1) * speedGain;

    const baseSpawn = 0.85; // cars/sec
    const spawnGain = 0.13;
    const spawnRate = baseSpawn + (stage - 1) * spawnGain;

    const coinRate = clamp(0.20 + (stage - 1) * 0.03, 0.2, 0.55); // coins/sec

    const maxObjs = clamp(7 + stage, 9, 18);

    return { roadSpeed, spawnRate, coinRate, maxObjs };
  }, [stage]);

  const flashShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 220);
  };

  const bestIfNeeded = (v) => {
    setBest((b) => {
      if (v > b) {
        saveBest(v);
        return v;
      }
      return b;
    });
  };

  const hardReset = () => {
    setLane(1);
    setStage(1);
    setTimeLeft(stageSeconds);
    setScore(0);
    setLives(livesStart);
    setShield(false);
    setObjs([]);
    setToast(null);
    setStageBanner(null);
    setStatus("ready");
    swipeStart.current = null;
    endAtRef.current = null;
  };

  const start = () => {
    setLane(1);
    setStage(1);
    setScore(0);
    setLives(livesStart);
    setShield(false);
    setObjs([]);
    setToast("شروع شد! جاخالی بده 🚗💨");
    setTimeout(() => setToast(null), 900);

    setStatus("playing");
    lastT.current = performance.now();

    endAtRef.current = Date.now() + stageSeconds * 1000;
    setTimeLeft(stageSeconds);
  };

  const restart = () => {
    setLane(1);
    setScore(0);
    setLives(livesStart);
    setShield(false);
    setObjs([]);
    setToast("دوباره! این بار رکورد بزن 😄");
    setTimeout(() => setToast(null), 900);

    setStage(1);
    setStatus("playing");
    lastT.current = performance.now();

    endAtRef.current = Date.now() + stageSeconds * 1000;
    setTimeLeft(stageSeconds);
  };

  const showStageBanner = (txt) => {
    setStageBanner(txt);
    setTimeout(() => setStageBanner(null), 1100);
  };

  const nextStage = () => {
    const next = stage + 1;

    if (next > stages) {
      setStatus("win");
      bestIfNeeded(score);
      return;
    }

    setStatus("stage");
    showStageBanner(`مرحله ${next} — سرعت بیشتر شد! ⚡`);

    setTimeout(() => {
      setStage(next);
      setObjs([]);
      setShield(false);

      endAtRef.current = Date.now() + stageSeconds * 1000;
      setTimeLeft(stageSeconds);

      setStatus("playing");
      lastT.current = performance.now();
    }, 1200);
  };

  // تایمر دقیق timeLeft
  useEffect(() => {
    if (status !== "playing") return;

    const t = setInterval(() => {
      const endAt = endAtRef.current;
      if (!endAt) return;

      const ms = endAt - Date.now();
      const s = Math.max(0, Math.ceil(ms / 1000));
      setTimeLeft(s);

      if (ms <= 0) {
        clearInterval(t);
        nextStage();
      }
    }, 200);

    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, stage]);

  // کیبورد
  useEffect(() => {
    const down = (e) => {
      if (status !== "playing") return;
      const k = e.key.toLowerCase();
      if (["arrowleft", "arrowright", "a", "d"].includes(k)) e.preventDefault();

      if (k === "arrowleft" || k === "a") setLane((ln) => clamp(ln - 1, 0, 2));
      if (k === "arrowright" || k === "d") setLane((ln) => clamp(ln + 1, 0, 2));
    };

    window.addEventListener("keydown", down, { passive: false });
    return () => window.removeEventListener("keydown", down);
  }, [status]);

  // سوایپ موبایل
  const onTouchStart = (e) => {
    if (status !== "playing") return;
    const t = e.touches?.[0];
    if (!t) return;
    swipeStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    if (status !== "playing") return;
    const st = swipeStart.current;
    if (!st) return;
    const t = e.changedTouches?.[0];
    if (!t) return;

    const dx = t.clientX - st.x;
    const dy = t.clientY - st.y;
    swipeStart.current = null;

    const ax = Math.abs(dx);
    const ay = Math.abs(dy);
    const TH = 18;
    if (ax < TH && ay < TH) return;

    if (ax > ay) {
      if (dx > 0) setLane((ln) => clamp(ln + 1, 0, 2));
      else setLane((ln) => clamp(ln - 1, 0, 2));
    }
  };

  // اسپاون ماشین رقیب (منصفانه)
  const spawnEnemyCar = () => {
    const existing = objsRef.current.filter((o) => o.type === "car");

    let lanePick = Math.floor(Math.random() * 3);

    // جلوگیری از اسپاون “خیلی نزدیک” توی همان لاین
    const tooCloseSameLane = existing.some((c) => c.lane === lanePick && c.y < 170);
    if (tooCloseSameLane) lanePick = (lanePick + 1) % 3;

    // 1/6 مواقع تو لاین خودت اسپاون نکنه (منصف‌تر)
    if (Math.random() < 0.16 && lanePick === lane) lanePick = (lanePick + 1) % 3;

    const kind =
      Math.random() < 0.18 ? "taxi" : Math.random() < 0.5 ? "neo" : "van";

    return {
      id: makeId(),
      type: "car",
      lane: lanePick,
      y: -90,
      speed: stageCfg.roadSpeed * (0.92 + Math.random() * 0.22),
      kind,
    };
  };

  const spawnCoin = () => {
    return {
      id: makeId(),
      type: "coin",
      lane: Math.floor(Math.random() * 3),
      y: -60,
      speed: stageCfg.roadSpeed * (0.95 + Math.random() * 0.15),
    };
  };

  // برخورد ساده (هم‌لاین + هم‌پوشانی Y)
  const overlapY = (aTop, aH, bTop, bH, pad = 10) => {
    const aB = aTop + aH;
    const bB = bTop + bH;
    return aTop < bB - pad && aB > bTop + pad;
  };

  const checkCarHit = (obj) => {
    if (obj.type !== "car") return false;
    if (obj.lane !== lane) return false;

    const carH = 70;
    return overlapY(playerY, playerH, obj.y, carH, 10);
  };

  const checkCoinPickup = (obj) => {
    if (obj.type !== "coin") return false;
    if (obj.lane !== lane) return false;

    const coinH = 34;
    return overlapY(playerY, playerH, obj.y, coinH, 6);
  };

  const loseGame = () => {
    setStatus("lose");
    flashShake();
    setToast("💥 برخورد کردی! دوباره تلاش کن.");
    bestIfNeeded(score);
  };

  const takeHit = () => {
    if (shieldRef.current) return;

    setLives((lv) => {
      const nn = lv - 1;
      if (nn <= 0) {
        loseGame();
        return 0;
      }
      // شیلد 2 ثانیه
      setShield(true);
      setToast("🛡️ شیلد فعال شد!");
      setTimeout(() => setToast(null), 700);
      setTimeout(() => setShield(false), 2000);
      flashShake();
      return nn;
    });
  };

  // Near miss: اگر ماشین خیلی نزدیک رد شد ولی برخورد نکرد
  const nearMissRef = useRef(new Set()); // ids

  // RAF loop
  useEffect(() => {
    if (status !== "playing") return;

    const loop = (t) => {
      const dt = (t - lastT.current) / 1000;
      lastT.current = t;

      // امتیاز زنده موندن
      setScore((s) => s + Math.round(6 * dt * (1 + (stage - 1) * 0.12)));

      // spawn cars
      spawnAcc.current += dt * stageCfg.spawnRate;
      if (spawnAcc.current >= 1) {
        const n = Math.floor(spawnAcc.current);
        spawnAcc.current -= n;

        setObjs((prev) => {
          const next = [...prev];
          for (let i = 0; i < n; i++) {
            if (next.length < stageCfg.maxObjs) next.push(spawnEnemyCar());
          }
          return next;
        });
      }

      // spawn coins
      coinAcc.current += dt * stageCfg.coinRate;
      if (coinAcc.current >= 1) {
        const n = Math.floor(coinAcc.current);
        coinAcc.current -= n;

        setObjs((prev) => {
          const next = [...prev];
          for (let i = 0; i < n; i++) {
            if (next.length < stageCfg.maxObjs) next.push(spawnCoin());
          }
          return next;
        });
      }

      // move + collision
      setObjs((prev) => {
        let hit = false;
        let gainedCoins = 0;
        let gainedNear = 0;

        const next = prev
          .map((o) => ({ ...o, y: o.y + o.speed * dt }))
          .filter((o) => o.y < H + 140);

        // coin pickup + car hit
        for (const o of next) {
          if (!hit && checkCarHit(o)) {
            hit = true;
          }
        }

        // coin pickup
        const afterCoin = next.filter((o) => {
          if (checkCoinPickup(o)) {
            gainedCoins += 25;
            return false;
          }
          return true;
        });

        // near miss: ماشین در همان لاین با فاصله بسیار کم (اما بدون hit)
        for (const o of afterCoin) {
          if (o.type !== "car") continue;
          if (o.lane !== lane) continue;
          if (nearMissRef.current.has(o.id)) continue;

          // نزدیکِ نزدیک: عبور در فاصله کم از بالای ماشین
          const carH = 70;
          const gap = Math.abs((o.y + carH) - playerY);
          if (gap < 10 && gap > 0) {
            nearMissRef.current.add(o.id);
            gainedNear += 12;
          }
        }

        if (gainedCoins > 0) {
          setScore((s) => s + gainedCoins);
          setToast(`🪙 +${gainedCoins}`);
          setTimeout(() => setToast(null), 450);
        }
        if (gainedNear > 0) {
          setScore((s) => s + gainedNear);
        }

        if (hit) {
          takeHit();
          // حذف ماشین‌های همان لاین نزدیک برای جلوگیری از تکرار
          return afterCoin.filter((o) => !(o.type === "car" && o.lane === lane && Math.abs(o.y - playerY) < 80));
        }

        return afterCoin;
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, stage, stageCfg.spawnRate, stageCfg.coinRate, stageCfg.maxObjs, lane]);

  // visuals
  const laneX = lanesX[lane];

  const CarVisual = ({ kind = "neo" }) => {
    const style =
      kind === "taxi"
        ? {
            bg: "linear-gradient(135deg, rgba(250,204,21,.95), rgba(245,158,11,.85))",
            glow: "0 0 18px rgba(250,204,21,.35)",
          }
        : kind === "van"
        ? {
            bg: "linear-gradient(135deg, rgba(148,163,184,.95), rgba(30,41,59,.95))",
            glow: "0 0 18px rgba(148,163,184,.18)",
          }
        : {
            bg: "linear-gradient(135deg, rgba(34,211,238,.95), rgba(236,72,153,.85))",
            glow: "0 0 18px rgba(34,211,238,.22), 0 0 18px rgba(236,72,153,.15)",
          };

    return (
      <div
        className="relative w-11 h-[70px] rounded-2xl border border-white/15"
        style={{ background: style.bg, boxShadow: style.glow }}
      >
        <div className="absolute left-2 top-3 right-2 h-2 rounded-full bg-white/40" />
        <div className="absolute left-2 bottom-3 right-2 h-2 rounded-full bg-black/25" />
        <div className="absolute -left-2 top-4 w-2 h-3 rounded-md bg-white/30" />
        <div className="absolute -right-2 top-4 w-2 h-3 rounded-md bg-white/30" />
      </div>
    );
  };

  const CoinVisual = () => (
    <div
      className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center"
      style={{
        background: "radial-gradient(circle, rgba(250,204,21,1), rgba(245,158,11,0.9))",
        boxShadow: "0 0 18px rgba(250,204,21,0.35)",
      }}
    >
      <div className="w-3 h-3 rounded-full bg-white/35" />
    </div>
  );

  return (
    <div className="w-full">
      <div
        ref={stageRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ touchAction: "none" }}
        className={[
          "relative rounded-3xl border border-yellow-200 overflow-hidden select-none",
          "bg-gradient-to-b from-[#081026] via-[#050815] to-[#020617]",
          shake ? "animate-[wiggle_0.22s_ease-in-out_1]" : "",
        ].join(" ")}
      >
        <style>{`
          @keyframes wiggle {
            0% { transform: translate(0,0); }
            25% { transform: translate(5px, -2px); }
            50% { transform: translate(-4px, 3px); }
            75% { transform: translate(4px, 2px); }
            100% { transform: translate(0,0); }
          }
        `}</style>

        {/* HUD */}
        <div className="absolute top-3 left-3 right-3 z-30 flex justify-between text-sm text-white">
          <div className="flex flex-wrap items-center gap-2">
            🧩 مرحله: <span className="font-bold text-yellow-300">{stage}/{stages}</span>
            <span className="text-white/30">|</span>
            ⏱ <span className="font-bold">{timeLeft}</span>s
            <span className="text-white/30">|</span>
            🏁 امتیاز: <span className="font-bold">{score}</span>
            <span className="text-white/30">|</span>
            🏆 رکورد: <span className="font-bold text-emerald-200">{best}</span>
          </div>

          <div className="flex items-center gap-2 text-xs bg-white/10 border border-white/15 rounded-full px-3 py-1">
            سرعت: <span className="font-bold text-cyan-200">{Math.round(stageCfg.roadSpeed)}</span>
            <span className="text-white/30">|</span>
            {Array.from({ length: livesStart }).map((_, i) => (
              <span key={i} className={i < lives ? "opacity-100" : "opacity-25"}>
                ❤️
              </span>
            ))}
            {shield && <span className="text-yellow-200 font-bold">Shield</span>}
          </div>
        </div>

        {/* Toast */}
        <AnimatePresence>
          {(toast || stageBanner) && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="absolute top-12 left-0 right-0 z-40 flex justify-center"
            >
              <div className="px-4 py-2 rounded-2xl border border-white/15 bg-black/45 text-white text-xs">
                {stageBanner || toast}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Road */}
        <div className="relative w-full" style={{ height: H, maxWidth: W, margin: "0 auto" }}>
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute -top-24 left-0 right-0 h-72 opacity-70"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(34,211,238,0.20), transparent 55%)," +
                  "radial-gradient(circle at 70% 45%, rgba(236,72,153,0.18), transparent 55%)," +
                  "radial-gradient(circle at 55% 20%, rgba(250,204,21,0.12), transparent 50%)",
              }}
            />
          </div>

          {/* Lane lines */}
          <div className="absolute inset-0 pointer-events-none">
            {[33.33, 66.66].map((x, i) => (
              <motion.div
                key={i}
                className="absolute top-0 bottom-0 w-[2px]"
                style={{
                  left: `${x}%`,
                  background: "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05))",
                }}
                animate={{ opacity: [0.12, 0.35, 0.12] }}
                transition={{ duration: 1.3, repeat: Infinity }}
              />
            ))}
          </div>

          {/* Objects */}
          <AnimatePresence>
            {objs.map((o) => (
              <motion.div
                key={o.id}
                className="absolute z-10"
                style={{
                  left: `${lanesX[o.lane]}%`,
                  top: o.y,
                  transform: "translateX(-50%)",
                }}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                {o.type === "car" ? <CarVisual kind={o.kind} /> : <CoinVisual />}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Player */}
          <motion.div
            className="absolute z-20"
            style={{
              left: `${laneX}%`,
              top: playerY,
              transform: "translateX(-50%)",
              opacity: shield ? 0.85 : 1,
            }}
            transition={{ type: "spring", stiffness: 360, damping: 26 }}
          >
            <div
              className="relative w-11 h-[70px] rounded-2xl border border-white/15"
              style={{
                background:
                  "linear-gradient(135deg, rgba(250,204,21,.95), rgba(16,185,129,.82))",
                boxShadow: shield
                  ? "0 0 26px rgba(250,204,21,.25), 0 0 26px rgba(16,185,129,.22)"
                  : "0 0 22px rgba(250,204,21,.18), 0 0 22px rgba(16,185,129,.14)",
              }}
            >
              <div className="absolute left-2 top-3 right-2 h-2 rounded-full bg-white/50" />
              <div className="absolute left-2 bottom-3 right-2 h-2 rounded-full bg-black/25" />
              <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full"
                animate={{ scale: [0.85, 1.12, 0.85], opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                style={{
                  background:
                    "radial-gradient(circle, rgba(251,191,36,1), rgba(239,68,68,0.85), transparent)",
                }}
              />
              {shield && (
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{ opacity: [0.25, 1, 0.25] }}
                  transition={{ duration: 0.35, repeat: Infinity }}
                  style={{
                    border: "2px solid rgba(250,204,21,0.35)",
                    boxShadow: "0 0 18px rgba(250,204,21,0.22)",
                  }}
                />
              )}
            </div>
          </motion.div>

          {/* Mobile Controls */}
          <div className="absolute bottom-3 left-0 right-0 z-30 flex justify-between px-3">
            <div className="text-[11px] text-white/60 flex items-end">
              کنترل: ← → / A D / سوایپ
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => status === "playing" && setLane((ln) => clamp(ln - 1, 0, 2))}
                className="w-12 h-12 rounded-2xl border border-white/15 bg-white/5 text-white font-extrabold active:bg-white/10"
                aria-label="چپ"
              >
                ◀
              </button>
              <button
                onClick={() => status === "playing" && setLane((ln) => clamp(ln + 1, 0, 2))}
                className="w-12 h-12 rounded-2xl border border-white/15 bg-white/5 text-white font-extrabold active:bg-white/10"
                aria-label="راست"
              >
                ▶
              </button>
            </div>
          </div>
        </div>

        {/* Ready */}
        {status === "ready" && (
          <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center text-center px-5">
            <div className="w-full max-w-md rounded-3xl border border-white/15 bg-white/5 p-6 text-white">
              <div className="text-3xl mb-2">🚗 سبقت‌گیر ژنینو (Pro)</div>
              <div className="text-white/80 text-sm mb-4 leading-6">
                ۳ لاین داری. جاخالی بده + سکه جمع کن 🪙
                <br />
                هر مرحله ۳۰ ثانیه و سرعت بیشتر میشه.
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-white/70 mb-5">
                🏆 رکورد فعلی: <span className="font-bold text-emerald-200">{best}</span>
              </div>

              <div className="flex justify-center gap-2">
                <button
                  onClick={start}
                  className="px-6 py-3 rounded-xl bg-yellow-400 text-black font-extrabold hover:brightness-105 transition"
                >
                  شروع بازی
                </button>
                <button
                  onClick={hardReset}
                  className="px-6 py-3 rounded-xl bg-white/10 text-white font-extrabold border border-white/20 hover:bg-white/15 transition"
                >
                  ریست
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lose */}
        <AnimatePresence>
          {status === "lose" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center text-center px-5"
            >
              <div className="w-full max-w-md rounded-3xl border border-white/15 bg-white/5 p-6 text-white">
                <div className="text-3xl mb-2">💥 برخورد!</div>
                <div className="text-white/80 mb-4">
                  امتیاز: <span className="font-bold">{score}</span>
                  <span className="text-white/30"> | </span>
                  رکورد: <span className="font-bold text-emerald-200">{best}</span>
                </div>

                <div className="flex justify-center gap-2">
                  <button
                    onClick={restart}
                    className="px-6 py-3 rounded-xl bg-yellow-400 text-black font-extrabold hover:brightness-105 transition"
                  >
                    دوباره
                  </button>
                  <button
                    onClick={hardReset}
                    className="px-6 py-3 rounded-xl bg-white/10 text-white font-extrabold border border-white/20 hover:bg-white/15 transition"
                  >
                    خروج
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Win */}
        <AnimatePresence>
          {status === "win" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center text-center px-5"
            >
              <div className="w-full max-w-md rounded-3xl border border-white/15 bg-white/5 p-6 text-white">
                <div className="text-3xl mb-2">🏁 قهرمان!</div>
                <div className="text-white/80 mb-4">
                  ۱۰ مرحله رو تموم کردی 🎉
                  <br />
                  امتیاز نهایی: <span className="font-bold">{score}</span>
                </div>

                <div className="flex justify-center gap-2">
                  <button
                    onClick={restart}
                    className="px-6 py-3 rounded-xl bg-yellow-400 text-black font-extrabold hover:brightness-105 transition"
                  >
                    دوباره از اول
                  </button>
                  <button
                    onClick={hardReset}
                    className="px-6 py-3 rounded-xl bg-white/10 text-white font-extrabold border border-white/20 hover:bg-white/15 transition"
                  >
                    خروج
                  </button>
                </div>
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
              className="absolute inset-0 z-40 bg-black/55 backdrop-blur-[1px] flex items-center justify-center text-center px-5"
            >
              <div className="px-6 py-4 rounded-3xl border border-white/15 bg-white/5 text-white">
                <div className="text-2xl font-extrabold text-yellow-300">
                  {stageBanner || "مرحله بعد..."}
                </div>
                <div className="text-xs text-white/70 mt-2">
                  آماده شو… 🏁
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
