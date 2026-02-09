import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------- Utils ----------
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const makeId = () => `${Date.now()}-${Math.random()}`;

const CELL = 64; // سایز هر خانه
const GRID = 5;  // 5x5 (ساده و تمیز)
const W = CELL * GRID;
const H = CELL * GRID;

const DIRS = {
  R: { dx: 1, dy: 0 },
  L: { dx: -1, dy: 0 },
  U: { dx: 0, dy: -1 },
  D: { dx: 0, dy: 1 },
};

function centerOf(x, y) {
  return { cx: x * CELL + CELL / 2, cy: y * CELL + CELL / 2 };
}

// برخورد لیزر به آینه:
// "/" : R->U, L->D, U->R, D->L
// "\" : R->D, L->U, U->L, D->R
function reflect(dir, type) {
  if (type === "/") {
    if (dir === "R") return "U";
    if (dir === "L") return "D";
    if (dir === "U") return "R";
    if (dir === "D") return "L";
  }
  if (type === "\\") {
    if (dir === "R") return "D";
    if (dir === "L") return "U";
    if (dir === "U") return "L";
    if (dir === "D") return "R";
  }
  return dir;
}

function toSvgPath(points) {
  if (!points.length) return "";
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
}

function computeBeamPath({ start, target, blocks, mirrors }) {
  const stepsLimit = 80;
  const mirrorMap = new Map(mirrors.map((m) => [`${m.x},${m.y}`, m.type]));
  const blockSet = new Set(blocks.map((b) => `${b.x},${b.y}`));

  let x = start.x;
  let y = start.y;
  let dir = start.dir;

  const pts = [];
  let hitTarget = false;
  let stopped = false;

  const { cx: sCx, cy: sCy } = centerOf(x, y);
  pts.push({ x: sCx, y: sCy });

  for (let i = 0; i < stepsLimit; i++) {
    const d = DIRS[dir];
    const nx = x + d.dx;
    const ny = y + d.dy;

    // خارج از صفحه
    if (nx < 0 || nx >= GRID || ny < 0 || ny >= GRID) {
      const { cx, cy } = centerOf(x, y);
      pts.push({ x: cx + d.dx * (CELL / 2), y: cy + d.dy * (CELL / 2) });
      stopped = true;
      break;
    }

    // برخورد به دیوار
    if (blockSet.has(`${nx},${ny}`)) {
      const { cx, cy } = centerOf(x, y);
      pts.push({ x: cx + d.dx * (CELL / 2), y: cy + d.dy * (CELL / 2) });
      stopped = true;
      break;
    }

    x = nx;
    y = ny;

    const { cx, cy } = centerOf(x, y);
    pts.push({ x: cx, y: cy });

    // رسیدن به هدف
    if (x === target.x && y === target.y) {
      hitTarget = true;
      stopped = true;
      break;
    }

    // برخورد به آینه
    const mt = mirrorMap.get(`${x},${y}`);
    if (mt) dir = reflect(dir, mt);
  }

  return { pts, hitTarget, stopped };
}

// ---------- Levels (هر چقدر خواستی اضافه کن) ----------
const LEVELS = [
  // نکته: همه‌ی آینه‌ها rotatable هستند (با کلیک / و \ عوض میشه)

  {
    id: "lv1",
    title: "مرحله ۱ (گرم‌کردن)",
    start: { x: 0, y: 2, dir: "R" },
    target: { x: 4, y: 0 },
    blocks: [],
    mirrors: [
      { x: 2, y: 2, type: "\\" },  // باید روی / باشه تا بره بالا
      { x: 2, y: 0, type: "\\" },  // باید / باشه تا از بالا بره راست
    ],
  },

  {
    id: "lv2",
    title: "مرحله ۲ (دو پیچ)",
    start: { x: 0, y: 4, dir: "R" },
    target: { x: 4, y: 4 },
    blocks: [{ x: 2, y: 4 }],
    mirrors: [
      { x: 1, y: 4, type: "/" },  // برو بالا
      { x: 1, y: 2, type: "\\" }, // برو راست
      { x: 3, y: 2, type: "\\" }, // برو پایین
      { x: 3, y: 4, type: "/" },  // برو راست به هدف
    ],
  },

  {
    id: "lv3",
    title: "مرحله ۳ (بالا-راست)",
    start: { x: 0, y: 1, dir: "R" },
    target: { x: 4, y: 1 },
    blocks: [{ x: 2, y: 1 }],
    mirrors: [
      { x: 1, y: 1, type: "\\" },   // بالا
      { x: 1, y: 0, type: "\\" },   // راست
      { x: 3, y: 0, type: "\\" },  // پایین
      { x: 3, y: 1, type: "/" },   // راست به هدف
    ],
  },

  {
    id: "lv4",
    title: "مرحله ۴ (موانع وسط)",
    start: { x: 0, y: 2, dir: "R" },
    target: { x: 4, y: 2 },
    blocks: [{ x: 2, y: 2 }, { x: 2, y: 0 }, { x: 2, y: 3 }],
    mirrors: [
      { x: 1, y: 2, type: "\\" },   // بالا
      { x: 1, y: 0, type: "/" },   // راست
      { x: 3, y: 1, type: "/" },  // پایین
      { x: 3, y: 2, type: "/" },   // راست به هدف
      { x: 0, y: 0, type: "/" },
      { x: 0, y: 1, type: "/" }
    ],
  },

  {
    id: "lv5",
    title: "مرحله ۵ (چهار گوشه)",
    start: { x: 0, y: 0, dir: "R" },
    target: { x: 4, y: 4 },
    blocks: [{ x: 3, y: 4 }],
    mirrors: [
      { x: 2, y: 0, type: "/" },  // پایین
      { x: 2, y: 4, type: "/" },   // راست به هدف
      { x: 0, y: 4, type: "/" },
      { x: 0, y: 2, type: "/" },
      { x: 4, y: 2, type: "/" },
    ],
  },

  {
    id: "lv6",
    title: "مرحله ۶ (زیگزاگ کوتاه)",
    start: { x: 0, y: 3, dir: "R" },
    target: { x: 4, y: 1 },
    blocks: [{ x: 2, y: 3 }],
    mirrors: [
      { x: 1, y: 3, type: "/" },   // بالا
      { x: 1, y: 1, type: "\\" },   // راست
      { x: 3, y: 1, type: "/" },   // راست به هدف (اگر / باشه مسیر می‌ره بالا؛ باید با تنظیمات درست حلش کنی)
      { x: 3, y: 0, type: "\\" },  // پایین برگردون
      { x: 4, y: 0, type: "\\" },
    ],
  },

  {
    id: "lv7",
    title: "مرحله ۷ (راه باریک)",
    start: { x: 0, y: 2, dir: "R" },
    target: { x: 4, y: 4 },
    blocks: [ { x: 2, y: 4 }, { x: 3, y: 2 }],
    mirrors: [
      { x: 1, y: 2, type: "\\" }, // (نزدیک شروع) پایین
      { x: 1, y: 0, type: "\\" },
      { x: 1, y: 4, type: "/" },  // راست
      { x: 4, y: 0, type: "/" }
    ],
  },

  {
    id: "lv8",
    title: "مرحله ۸ (بالا پایین)",
    start: { x: 0, y: 4, dir: "R" },
    target: { x: 4, y: 0 },
    blocks: [{ x: 2, y: 4 }],
    mirrors: [
      { x: 1, y: 4, type: "\\" },  // بالا
      { x: 1, y: 0, type: "\\" },  // راست به هدف
      { x: 1, y: 2, type: "/" },
      { x: 3, y: 2, type: "\\" },
      { x: 3, y: 3, type: "\\" },
      { x: 2, y: 3, type: "\\" },
      { x: 2, y: 1, type: "\\" },
      { x: 1, y: 1, type: "/" },
    ],
  },

  {
    id: "lv9",
    title: "مرحله 9 (بالا پایین)",
    start: { x: 0, y: 4, dir: "R" },
    target: { x: 4, y: 0 },
    blocks: [{ x: 2, y: 3 }, { x: 2, y: 0 }],
    mirrors: [
      { x: 1, y: 4, type: "\\" },  // بالا
      { x: 1, y: 0, type: "/" },  // راست به هدف
      { x: 0, y: 0, type: "/" },
      { x: 0, y: 2, type: "/" },
      { x: 4, y: 2, type: "\\" },
    ],
  },

  {
    id: "lv10",
    title: "مرحله ۱۰ (سه پیچ)",
    start: { x: 0, y: 0, dir: "R" },
    target: { x: 4, y: 2 },
    blocks: [{ x: 3, y: 2 }],
    mirrors: [
      { x: 1, y: 0, type: "/" }, // پایین
      { x: 1, y: 2, type: "\\" },  // راست
      { x: 0, y: 2, type: "\\" },
      { x: 0, y: 4, type: "/" },
      { x: 4, y: 4, type: "/" },
    ],
  },

  {
    id: "lv11",
    title: "مرحله ۱۱ (تونل وسط)",
    start: { x: 0, y: 2, dir: "R" },
    target: { x: 4, y: 2 },
    blocks: [{ x: 2, y: 2 }, { x: 2, y: 1 }],
    mirrors: [
      { x: 1, y: 2, type: "/" },  // بالا
      { x: 1, y: 1, type: "\\" }, // راست
      { x: 3, y: 1, type: "\\" }, // پایین
      { x: 4, y: 1, type: "/" },  // راست به هدف
      { x: 0, y: 1, type: "\\" },
      { x: 0, y: 4, type: "/" },
      { x: 3, y: 4, type: "/" },
    ],
  },

  {
    id: "lv12",
    title: "مرحله ۱۲ (دور زدن)",
    start: { x: 0, y: 3, dir: "R" },
    target: { x: 4, y: 3 },
    blocks: [{ x: 3, y: 2 }],
    mirrors: [
      { x: 1, y: 3, type: "/" },  // بالا
      { x: 1, y: 0, type: "/" },  // راست
      { x: 3, y: 0, type: "\\" }, // پایین
      { x: 3, y: 3, type: "/" },  // راست به هدف
      { x: 0, y: 0, type: "/" },
      { x: 0, y: 4, type: "/" },
      { x: 2, y: 4, type: "/" },
      { x: 2, y: 1, type: "\\" },
      { x: 4, y: 1, type: "/" },
    ],
  },

  {
    id: "lv13",
    title: "مرحله ۱۳ (L شکل)",
    start: { x: 0, y: 4, dir: "R" },
    target: { x: 4, y: 1 },
    blocks: [{ x: 3, y: 1 }],
    mirrors: [
      { x: 2, y: 4, type: "\\" },  // بالا
      { x: 2, y: 1, type: "/" },  // راست به هدف
      { x: 0, y: 1, type: "\\" },
      { x: 0, y: 3, type: "/" },
      { x: 3, y: 3, type: "/" },
      { x: 3, y: 2, type: "/" },
      { x: 1, y: 2, type: "/" },
      { x: 1, y: 0, type: "/" },
      { x: 4, y: 0, type: "/" },
      { x: 0, y: 0, type: "/" },
    ],
  },

  {
    id: "lv14",
    title: "مرحله ۱۴ (ضربدر)",
    start: { x: 0, y: 2, dir: "R" },
    target: { x: 4, y: 4 },
    blocks: [{ x: 2, y: 2 }],
    mirrors: [
      { x: 1, y: 2, type: "\\" },  // بالا
      { x: 1, y: 0, type: "/" },  // راست
      { x: 3, y: 0, type: "/" }, // پایین
      { x: 1, y: 4, type: "/" },  // راست به هدف
      { x: 3, y: 4, type: "/" },
    ],
  },

  {
    id: "lv15",
    title: "مرحله ۱۵ (چالش کوچیک)",
    start: { x: 0, y: 1, dir: "R" },
    target: { x: 4, y: 4 },
    blocks: [{ x: 2, y: 1 }, { x: 2, y: 2 }],
    mirrors: [
      { x: 1, y: 1, type: "/" },  // بالا
      { x: 1, y: 0, type: "\\" }, // پایین
      { x: 3, y: 0, type: "\\" }, // پایین
      { x: 3, y: 4, type: "/" },  // راست به هدف
    ],
  },
];

const LS_KEY = "genino_laser_mirror_level";

// ---------- Main ----------
export default function LaserMirrorGame({ levelIndex = 0, enableSound = false }) {
  // سطح شروع: اگر قبلا ذخیره شده باشد از localStorage
  const initLevel = () => {
    const saved = Number(localStorage.getItem(LS_KEY));
    if (!Number.isNaN(saved)) return clamp(saved, 0, LEVELS.length - 1);
    return clamp(levelIndex, 0, LEVELS.length - 1);
  };

  const [lvl, setLvl] = useState(initLevel);
  const level = LEVELS[lvl];

  const [mirrors, setMirrors] = useState(level.mirrors);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const popAudioRef = useRef(null);
  const winAudioRef = useRef(null);

  useEffect(() => {
    // صدا اختیاری: اگر enableSound=true شد، می‌تونی فایل mp3 بدی
    if (!enableSound) return;
    // اگر فایل نداری، همین بخش بی‌اثر می‌مونه
    // نمونه: popAudioRef.current = new Audio("/sounds/zap.mp3");
  }, [enableSound]);

  // هر بار تغییر مرحله
  useEffect(() => {
    localStorage.setItem(LS_KEY, String(lvl));
    setMirrors(level.mirrors);
    setMoves(0);
    setWon(false);
  }, [lvl, level.id]);

  const { pts, hitTarget } = useMemo(() => {
    return computeBeamPath({
      start: level.start,
      target: level.target,
      blocks: level.blocks,
      mirrors,
    });
  }, [level, mirrors]);

  useEffect(() => {
    if (hitTarget && !won) {
      setWon(true);
      if (enableSound && winAudioRef.current) {
        try { winAudioRef.current.currentTime = 0; winAudioRef.current.play(); } catch {}
      }
    }
  }, [hitTarget, won, enableSound]);

  const onRotateMirror = (x, y) => {
    setMirrors((prev) =>
      prev.map((m) => (m.x === x && m.y === y ? { ...m, type: m.type === "/" ? "\\" : "/" } : m))
    );
    setMoves((m) => m + 1);

    if (enableSound && popAudioRef.current) {
      try { popAudioRef.current.currentTime = 0; popAudioRef.current.play(); } catch {}
    }
  };

  const reset = () => {
    setMirrors(level.mirrors);
    setMoves(0);
    setWon(false);
  };

  const nextLevel = () => setLvl((x) => clamp(x + 1, 0, LEVELS.length - 1));
  const prevLevel = () => setLvl((x) => clamp(x - 1, 0, LEVELS.length - 1));

  const beamPath = toSvgPath(pts);
  const canPrev = lvl > 0;
  const canNext = lvl < LEVELS.length - 1;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4">
        <div className="text-sm text-gray-600">
          <div className="font-extrabold text-yellow-700">
            {level.title} — Laser Mirror
            <span className="text-xs font-normal text-gray-500 mr-2">
              ( {lvl + 1} / {LEVELS.length} )
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            آینه‌ها را لمس کن تا بچرخند و لیزر به هدف طلایی برسد.
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="text-xs px-3 py-1 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-800">
            حرکت‌ها: <span className="font-bold">{moves}</span>
          </div>

          <button
            onClick={prevLevel}
            disabled={!canPrev}
            className={`text-xs px-4 py-2 rounded-xl font-bold border transition
              ${canPrev ? "bg-white border-yellow-200 text-yellow-800 hover:bg-yellow-50" : "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed"}
            `}
          >
            قبلی
          </button>

          <button
            onClick={nextLevel}
            disabled={!canNext}
            className={`text-xs px-4 py-2 rounded-xl font-bold border transition
              ${canNext ? "bg-white border-yellow-200 text-yellow-800 hover:bg-yellow-50" : "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed"}
            `}
          >
            بعدی
          </button>

          <button
            onClick={reset}
            className="text-xs px-4 py-2 rounded-xl bg-yellow-500 text-white font-bold shadow hover:brightness-105 transition"
          >
            شروع دوباره
          </button>

          {/* انتخاب مرحله */}
          <select
            value={lvl}
            onChange={(e) => setLvl(Number(e.target.value))}
            className="text-xs px-3 py-2 rounded-xl border border-yellow-200 bg-white text-gray-700"
            aria-label="انتخاب مرحله"
          >
            {LEVELS.map((lv, idx) => (
              <option key={lv.id} value={idx}>
                {idx + 1} - {lv.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Board */}
      <div className="relative rounded-3xl border border-yellow-200 overflow-hidden bg-gradient-to-b from-[#0b1022] via-[#060a16] to-[#020617]">
        {/* subtle glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-24 left-0 right-0 h-72 opacity-70"
            style={{
              background:
                "radial-gradient(circle at 25% 30%, rgba(34,211,238,0.30), transparent 60%), radial-gradient(circle at 75% 25%, rgba(236,72,153,0.22), transparent 55%), radial-gradient(circle at 55% 70%, rgba(250,204,21,0.18), transparent 60%)",
            }}
          />
        </div>

        <div className="relative mx-auto" style={{ width: W, height: H }}>
          {/* Grid */}
          <div
            className="absolute inset-0"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${GRID}, 1fr)`,
              gridTemplateRows: `repeat(${GRID}, 1fr)`,
            }}
          >
            {Array.from({ length: GRID * GRID }).map((_, i) => (
              <div
                key={i}
                className="border border-white/5"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(255,255,255,0.03), rgba(255,255,255,0.0))",
                }}
              />
            ))}
          </div>

          {/* Beam (SVG) */}
          <svg className="absolute inset-0" width={W} height={H}>
            {/* outer glow */}
            <path
              d={beamPath}
              stroke="rgba(34,211,238,0.25)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* core beam */}
            <path
              d={beamPath}
              stroke="rgba(255,255,255,0.92)"
              strokeWidth="3.2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* golden highlight */}
            <path
              d={beamPath}
              stroke="rgba(250,204,21,0.45)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Start emitter */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              width: CELL,
              height: CELL,
              left: level.start.x * CELL,
              top: level.start.y * CELL,
            }}
          >
            <motion.div
              className="w-10 h-10 rounded-2xl"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(34,211,238,0.55) 50%, rgba(2,6,23,0) 100%)",
                boxShadow: "0 0 22px rgba(34,211,238,0.45)",
                border: "1px solid rgba(255,255,255,0.14)",
              }}
              title="Laser"
            />
          </div>

          {/* Target */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              width: CELL,
              height: CELL,
              left: level.target.x * CELL,
              top: level.target.y * CELL,
            }}
          >
            <motion.div
              className="w-11 h-11 rounded-2xl"
              animate={{ scale: [1, 1.06, 1], opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.98), rgba(250,204,21,0.70) 55%, rgba(2,6,23,0) 100%)",
                boxShadow: "0 0 26px rgba(250,204,21,0.42)",
                border: "1px solid rgba(255,255,255,0.14)",
              }}
              title="Target"
            />
          </div>

          {/* Blocks */}
          {level.blocks.map((b) => (
            <div
              key={`${b.x},${b.y}`}
              className="absolute flex items-center justify-center"
              style={{
                width: CELL,
                height: CELL,
                left: b.x * CELL,
                top: b.y * CELL,
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow: "0 0 18px rgba(0,0,0,0.25)",
                }}
                title="Block"
              />
            </div>
          ))}

          {/* Mirrors */}
          {mirrors.map((m) => (
            <button
              key={`${m.x},${m.y}`}
              onClick={() => onRotateMirror(m.x, m.y)}
              className="absolute flex items-center justify-center"
              style={{
                width: CELL,
                height: CELL,
                left: m.x * CELL,
                top: m.y * CELL,
              }}
              aria-label="Mirror"
              title="Rotate mirror"
            >
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(250,204,21,0.18)",
                  boxShadow: "0 0 18px rgba(250,204,21,0.12)",
                }}
              >
                <div
                  className="w-8 h-1 rounded-full"
                  style={{
                    background: "rgba(250,204,21,0.85)",
                    boxShadow: "0 0 14px rgba(250,204,21,0.35)",
                    transform: `rotate(${m.type === "/" ? -45 : 45}deg)`,
                  }}
                />
              </motion.div>
            </button>
          ))}
        </div>

        {/* Win overlay */}
        <AnimatePresence>
          {won && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/65 backdrop-blur-sm flex flex-col items-center justify-center text-center z-20 px-4"
            >
              <div className="text-3xl mb-2 text-white">✨ آفرین!</div>
              <div className="text-white/85 mb-4 text-sm">
                لیزر به هدف رسید. حرکت‌ها: <span className="font-bold">{moves}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={reset}
                  className="px-5 py-3 rounded-xl bg-yellow-400 text-black font-extrabold hover:brightness-105 transition"
                >
                  دوباره حل کن
                </button>

                <button
                  onClick={() => (lvl < LEVELS.length - 1 ? nextLevel() : reset())}
                  className="px-5 py-3 rounded-xl bg-white/10 text-white font-extrabold border border-white/20 hover:bg-white/15 transition"
                >
                  {lvl < LEVELS.length - 1 ? "مرحله بعد" : "تکرار"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="mt-3 text-xs text-gray-600">
        نکته: با چرخاندن آینه‌ها <span className="font-bold">/</span> و{" "}
        <span className="font-bold">\</span> مسیر لیزر عوض می‌شود.
      </div>
    </div>
  );
}
