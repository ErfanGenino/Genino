import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const rand = (min, max) => Math.random() * (max - min) + min;
const makeId = () => `${Date.now()}-${Math.random()}`;

function useSize(ref) {
  const [size, setSize] = useState({ w: 640, h: 420 });
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setSize({ w: r.width, h: r.height });
    });
    ro.observe(el);
    const r = el.getBoundingClientRect();
    setSize({ w: r.width, h: r.height });
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

export default function ZenRippleGardenGame({
  duration = 25,
  petalsPerTap = 10,
}) {
  const boxRef = useRef(null);
  const { w, h } = useSize(boxRef);

  const [ripples, setRipples] = useState([]);
  const [petals, setPetals] = useState([]);

  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);

  const [timeLeft, setTimeLeft] = useState(duration);
  const [gameOver, setGameOver] = useState(false);

  const bgDots = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        x: rand(5, 95),
        y: rand(8, 92),
        s: rand(40, 110),
        o: rand(0.10, 0.22),
      })),
    []
  );

  // Timer
  useEffect(() => {
    if (gameOver) return;
    if (timeLeft <= 0) {
      setGameOver(true);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, gameOver]);

  const restart = () => {
    setRipples([]);
    setPetals([]);
    setScore(0);
    setCombo(0);
    setBestCombo(0);
    setTimeLeft(duration);
    setGameOver(false);
  };

  const spawnRipple = (x, y) => {
    const id = makeId();
    setRipples((r) => [...r, { id, x, y }]);
    setTimeout(() => setRipples((r) => r.filter((i) => i.id !== id)), 900);
  };

  const spawnPetals = (x, y) => {
    const now = Date.now();
    const idBase = `${now}-${Math.random()}`;

    const next = Array.from({ length: petalsPerTap }).map((_, i) => {
      const angle = rand(0, Math.PI * 2);
      const dist = rand(40, 140);
      return {
        id: `${idBase}-${i}`,
        x,
        y,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        r: rand(-180, 180),
        s: rand(10, 16),
        o: rand(0.6, 0.95),
        hue: rand(28, 55), // طلایی-صورتی گرم
      };
    });

    setPetals((p) => [...p, ...next]);
    setTimeout(() => {
      setPetals((p) => p.filter((pt) => !next.some((n) => n.id === pt.id)));
    }, 1200);
  };

  const handleTap = (clientX, clientY) => {
    if (gameOver) return;
    if (!boxRef.current) return;

    const rect = boxRef.current.getBoundingClientRect();
    const x = clamp(clientX - rect.left, 0, rect.width);
    const y = clamp(clientY - rect.top, 0, rect.height);

    spawnRipple(x, y);
    spawnPetals(x, y);

    setCombo((c) => {
      const next = c + 1;
      setBestCombo((b) => Math.max(b, next));
      return next;
    });

    setScore((s) => s + 5 + clamp(Math.floor(combo / 5), 0, 10));
  };

  // Combo decay (اگر چند ثانیه دست نزنی کمبو می‌شکنه)
  useEffect(() => {
    if (gameOver) return;
    if (combo <= 0) return;
    const t = setTimeout(() => setCombo(0), 2300);
    return () => clearTimeout(t);
  }, [combo, gameOver]);

  return (
    <div
      ref={boxRef}
      className="relative h-[460px] rounded-3xl border border-yellow-200 overflow-hidden select-none bg-gradient-to-b from-[#fbf7ef] via-[#fffdf8] to-[#f4efe6]"
      style={{ touchAction: "manipulation" }}
      onMouseDown={(e) => handleTap(e.clientX, e.clientY)}
      onTouchStart={(e) => {
        const t = e.touches?.[0];
        if (t) handleTap(t.clientX, t.clientY);
      }}
    >
      {/* soft background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-24 left-0 right-0 h-72 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 25% 30%, rgba(250,204,21,0.20), transparent 60%), radial-gradient(circle at 75% 25%, rgba(236,72,153,0.12), transparent 58%), radial-gradient(circle at 60% 70%, rgba(34,197,94,0.10), transparent 60%)",
          }}
        />
        {bgDots.map((d) => (
          <motion.div
            key={d.id}
            className="absolute rounded-full"
            style={{
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: d.s,
              height: d.s,
              opacity: d.o,
              background: "white",
              filter: "blur(1px)",
            }}
            animate={{ opacity: [d.o, d.o + 0.10, d.o] }}
            transition={{ duration: rand(2.0, 3.8), repeat: Infinity }}
          />
        ))}
      </div>

      {/* HUD */}
      <div className="absolute top-3 left-3 right-3 z-20 flex justify-between text-sm text-gray-700">
        <div className="flex items-center gap-2">
          ⏱ {timeLeft}s
          <span className="text-gray-300">|</span>
          ✨ امتیاز: <span className="font-bold text-yellow-700">{score}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-white/70 border border-yellow-200">
            Combo: <span className="font-bold text-yellow-700">{combo}</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-white/70 border border-yellow-200">
            Best: <span className="font-bold text-yellow-700">{bestCombo}</span>
          </span>
        </div>
      </div>

      {/* instruction */}
      {!gameOver && (
        <div className="absolute bottom-3 left-0 right-0 z-20 text-center text-xs text-gray-600">
          هرجا لمس کنی موج می‌سازی 🌿 — برای کمبو، پشت سر هم لمس کن
        </div>
      )}

      {/* ripples */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: r.x,
              top: r.y,
              width: 18,
              height: 18,
              border: "2px solid rgba(250,204,21,0.55)",
              boxShadow: "0 0 20px rgba(250,204,21,0.18)",
              transform: "translate(-50%, -50%)",
            }}
            initial={{ scale: 0.2, opacity: 0.0 }}
            animate={{ scale: 9.5, opacity: 0.65 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* petals */}
      <AnimatePresence>
        {petals.map((p) => (
          <motion.div
            key={p.id}
            className="absolute pointer-events-none"
            style={{
              left: p.x,
              top: p.y,
              width: p.s,
              height: p.s * 0.7,
              borderRadius: 999,
              transform: "translate(-50%, -50%)",
              background: `linear-gradient(90deg, hsla(${p.hue}, 95%, 68%, ${p.o}), hsla(${p.hue + 10}, 95%, 60%, ${
                p.o
              }))`,
              boxShadow: "0 0 14px rgba(250,204,21,0.16)",
            }}
            initial={{ x: 0, y: 0, rotate: 0, opacity: 0 }}
            animate={{
              x: p.dx,
              y: p.dy,
              rotate: p.r,
              opacity: [0, 1, 0],
              scale: [0.9, 1.05, 0.9],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Game over */}
      {gameOver && (
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 z-30 bg-white/85 backdrop-blur-sm flex flex-col items-center justify-center text-center"
        >
          <div className="text-3xl mb-2">🍃 آرامش!</div>
          <div className="text-gray-700 mb-1">
            امتیاز نهایی: <span className="font-bold">{score}</span>
          </div>
          <div className="text-gray-600 mb-4">
            بهترین کمبو: <span className="font-bold">{bestCombo}</span>
          </div>
          <button
            onClick={restart}
            className="px-6 py-3 rounded-xl bg-yellow-500 text-white font-bold shadow hover:brightness-105 transition"
          >
            دوباره
          </button>
        </motion.div>
      )}

      {/* subtle border */}
      <div className="absolute inset-0 pointer-events-none border border-white/40 rounded-3xl" />
    </div>
  );
}
