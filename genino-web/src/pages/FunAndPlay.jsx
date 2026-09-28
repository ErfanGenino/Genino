import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Film, Puzzle, Brain, Languages, Smile, X, Car, BookOpen } from "lucide-react";
import { stories } from "../components/fun/Story/storiesData";

import MemoryMatchGame from "../components/fun/games/MemoryMatchGame";
import ColorTapGame from "../components/fun/games/ColorTapGame";
import OddOneOutGame from "../components/fun/games/OddOneOutGame";
import ShapeMatchGame from "../components/fun/games/ShapeMatchGame";
import BalloonPopGame from "../components/fun/games/BalloonPopGame";
import MeteorDodgeGame from "../components/fun/games/MeteorDodgeGame";
import NeonAimShooterGame from "../components/fun/games/NeonAimShooterGame";
import NeonRhythmTapGame from "../components/fun/games/NeonRhythmTapGame";
import LaserMirrorGame from "../components/fun/games/LaserMirrorGame";
import GeninoCarRaceGame from "../components/fun/games/GeninoCarRaceGame";
import funHero from "../assets/fun/fun-hero.webp";
import PinocchioStory from "../components/fun/Story/PinocchioStory";


/** ✅ جلوگیری از صفحه سفید اگر یک بازی کرش کرد */
class GameErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorText: "" };
  }
  static getDerivedStateFromError(err) {
    return { hasError: true, errorText: err?.message || "Unknown error" };
  }
  componentDidCatch(err) {
    // کمک برای دیباگ: در کنسول نمایش بده
    console.error("Game crashed:", err);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
          <div className="font-extrabold mb-1">❌ خطا در اجرای بازی</div>
          <div className="text-sm leading-6">
            این بازی یک خطای داخلی داده و باعث می‌شد صفحه سفید شود.
          </div>
          <div className="mt-2 text-xs bg-white/70 border border-red-200 rounded-xl p-2 text-red-800">
            {this.state.errorText}
          </div>
          <button
            className="mt-3 px-4 py-2 rounded-xl bg-red-600 text-white font-bold hover:brightness-105 transition"
            onClick={() => this.setState({ hasError: false, errorText: "" })}
          >
            تلاش دوباره
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const GAME_THEMES = {
  memory: {
    ring: "ring-1 ring-emerald-200",
    border: "border-emerald-200",
    bg: "bg-gradient-to-br from-emerald-50 to-white",
    iconWrap: "bg-emerald-100/70",
    icon: "text-emerald-600",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  color: {
    ring: "ring-1 ring-pink-200",
    border: "border-pink-200",
    bg: "bg-gradient-to-br from-pink-50 to-white",
    iconWrap: "bg-pink-100/70",
    icon: "text-pink-600",
    badge: "bg-pink-50 text-pink-700 border-pink-200",
  },
  odd: {
    ring: "ring-1 ring-sky-200",
    border: "border-sky-200",
    bg: "bg-gradient-to-br from-sky-50 to-white",
    iconWrap: "bg-sky-100/70",
    icon: "text-sky-600",
    badge: "bg-sky-50 text-sky-700 border-sky-200",
  },
  numbers: {
    ring: "ring-1 ring-violet-200",
    border: "border-violet-200",
    bg: "bg-gradient-to-br from-violet-50 to-white",
    iconWrap: "bg-violet-100/70",
    icon: "text-violet-600",
    badge: "bg-violet-50 text-violet-700 border-violet-200",
  },
  shape: {
    ring: "ring-1 ring-amber-200",
    border: "border-amber-200",
    bg: "bg-gradient-to-br from-amber-50 to-white",
    iconWrap: "bg-amber-100/70",
    icon: "text-amber-600",
    badge: "bg-amber-50 text-amber-800 border-amber-200",
  },
  balloon: {
    ring: "ring-1 ring-rose-200",
    border: "border-rose-200",
    bg: "bg-gradient-to-br from-rose-50 to-white",
    iconWrap: "bg-rose-100/70",
    icon: "text-rose-600",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
  },
  firefly: {
    ring: "ring-1 ring-yellow-200",
    border: "border-yellow-200",
    bg: "bg-gradient-to-br from-yellow-50 to-white",
    iconWrap: "bg-yellow-100/70",
    icon: "text-yellow-700",
    badge: "bg-yellow-50 text-yellow-800 border-yellow-200",
  },
  meteor: {
    ring: "ring-1 ring-slate-200",
    border: "border-slate-200",
    bg: "bg-gradient-to-br from-slate-50 to-white",
    iconWrap: "bg-slate-100/70",
    icon: "text-slate-700",
    badge: "bg-slate-50 text-slate-700 border-slate-200",
  },
  runner: {
    ring: "ring-1 ring-cyan-200",
    border: "border-cyan-200",
    bg: "bg-gradient-to-br from-cyan-50 to-white",
    iconWrap: "bg-cyan-100/70",
    icon: "text-cyan-700",
    badge: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  aim: {
    ring: "ring-1 ring-indigo-200",
    border: "border-indigo-200",
    bg: "bg-gradient-to-br from-indigo-50 to-white",
    iconWrap: "bg-indigo-100/70",
    icon: "text-indigo-700",
    badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  rhythm: {
    ring: "ring-1 ring-fuchsia-200",
    border: "border-fuchsia-200",
    bg: "bg-gradient-to-br from-fuchsia-50 to-white",
    iconWrap: "bg-fuchsia-100/70",
    icon: "text-fuchsia-700",
    badge: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
  },
  zen: {
    ring: "ring-1 ring-lime-200",
    border: "border-lime-200",
    bg: "bg-gradient-to-br from-lime-50 to-white",
    iconWrap: "bg-lime-100/70",
    icon: "text-lime-700",
    badge: "bg-lime-50 text-lime-700 border-lime-200",
  },
  laser: {
    ring: "ring-1 ring-orange-200",
    border: "border-orange-200",
    bg: "bg-gradient-to-br from-orange-50 to-white",
    iconWrap: "bg-orange-100/70",
    icon: "text-orange-700",
    badge: "bg-orange-50 text-orange-800 border-orange-200",
  },
  bomb: {
    ring: "ring-1 ring-red-200",
    border: "border-red-200",
    bg: "bg-gradient-to-br from-red-50 to-white",
    iconWrap: "bg-red-100/70",
    icon: "text-red-700",
    badge: "bg-red-50 text-red-700 border-red-200",
  },
  maze: {
    ring: "ring-1 ring-stone-200",
    border: "border-stone-200",
    bg: "bg-gradient-to-br from-stone-50 to-white",
    iconWrap: "bg-stone-100/70",
    icon: "text-stone-700",
    badge: "bg-stone-50 text-stone-700 border-stone-200",
  },
  car: {
  ring: "ring-1 ring-sky-200",
  border: "border-sky-200",
  bg: "bg-gradient-to-br from-sky-50 via-white to-yellow-50",
  iconWrap: "bg-sky-100/70",
  icon: "text-sky-700",
  badge: "bg-sky-50 text-sky-700 border-sky-200",
},
};

const getGameTheme = (type) =>
  GAME_THEMES[type] || {
    ring: "ring-1 ring-yellow-200",
    border: "border-yellow-200",
    bg: "bg-gradient-to-br from-yellow-50 to-white",
    iconWrap: "bg-yellow-100/70",
    icon: "text-yellow-700",
    badge: "bg-yellow-50 text-yellow-800 border-yellow-200",
  };

const GAME_REGISTRY = [
  {
    id: "memory-match",
    type: "memory",
    title: "بازی حافظه (Memory Match)",
    category: "تقویت تمرکز و حافظه",
    hint: "دو کارت مشابه را پیدا کن. 🌿",
    icon: Brain,
    Component: MemoryMatchGame,
    props: { pairs: 6 },
  },
  {
    id: "color-tap",
    type: "color",
    title: "ژلی فراری!",
category: "سرعت + واکنش + هیجان",
hint: "از آزمایشگاه فرار کن؛ بپر، سر بخور و قدرت جمع کن! 👾💨",
    icon: Puzzle,
    Component: ColorTapGame,
    props: { optionsCount: 4 },
  },
  {
    id: "odd-one-out",
    type: "odd",
    title: "یکی فرق داره",
    category: "دقت و الگو",
    hint: "اون یکی که فرق داره رو پیدا کن 👀",
    icon: Smile,
    Component: OddOneOutGame,
    props: { grid: 6 },
  },
  {
    id: "shape-match",
    type: "shape",
    title: "شکل مشابه را پیدا کن",
    category: "دقت و شکل‌ها",
    hint: "شکل مشابه را پیدا کن ⭐️",
    icon: Puzzle,
    Component: ShapeMatchGame,
    props: { rounds: 5 },
  },
  {
    id: "balloon-pop",
    type: "balloon",
    title: "بادکنک‌ها رو بترکون",
    category: "واکنش و سرعت",
    hint: "قبل از تموم شدن زمان، بادکنک‌ها رو کلیک کن 🎈💥",
    icon: Smile,
    Component: BalloonPopGame,
    props: { duration: 20 },
  },
  {
    id: "meteor-dodge",
    type: "meteor",
    title: "فرار از شهاب‌سنگ‌ها",
    category: "سرعت عمل و هیجان",
    hint: "سفینه رو حرکت بده و فرار کن ☄️",
    icon: Gamepad2,
    Component: MeteorDodgeGame,
    props: { duration: 25 },
  },

  {
    id: "neon-aim-shooter",
    type: "aim",
    title: "نئون ایم شوتر",
    category: "هدف‌گیری سریع + کمبو",
    hint: "روی هدف‌های نئونی بزن 🎯",
    icon: Brain,
    Component: NeonAimShooterGame,
    props: { duration: 25, maxTargets: 3, spawnEveryMs: 650, missPenalty: 2 },
  },
  {
    id: "neon-rhythm-tap",
    type: "rhythm",
    title: "ریتم نئونی",
    category: "ریتم + تمرکز + کمبو",
    hint: "وقتی نوت رسید بزن 🎵",
    icon: Gamepad2,
    Component: NeonRhythmTapGame,
    props: { duration: 35, bpm: 108, speed: 260, lanes: 4 },
  },
  {
    id: "laser-mirror",
    type: "laser",
    title: "لیزر و آینه‌ها",
    category: "منطق + حل مسئله",
    hint: "مسیر لیزر رو تنظیم کن ✨",
    icon: Brain,
    Component: LaserMirrorGame,
    props: { levelIndex: 0 },
  },
  {
  id: "car-race",
  type: "car",
  title: "سبقت‌گیر ژنینو (Car Race)",
  category: "سرعت + عکس‌العمل",
  hint: "با ◀ ▶ یا سوایپ جاخالی بده؛ رکوردتو بشکن! 🏁",
  icon: Car,
  Component: GeninoCarRaceGame,
  props: { stages: 10, stageSeconds: 30, livesStart: 3 },
},
];

export default function FunAndPlay() {
  const [activeTab, setActiveTab] = useState("videos");

  const [isGameOpen, setIsGameOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isLearningOpen, setIsLearningOpen] = useState(false);
  const [selectedLearning, setSelectedLearning] = useState(null);
  const [previewLesson, setPreviewLesson] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
  const hasModalOpen =
    isLearningOpen ||
    isGameOpen ||
    previewLesson ||
    selectedStory;

  if (!hasModalOpen) return;

  window.history.pushState({ modal: true }, "");

  const handlePopState = () => {
    if (previewLesson) {
      setPreviewLesson(null);
      return;
    }

    if (selectedStory) {
      setSelectedStory(null);
      return;
    }

    if (isLearningOpen) {
      closeLearning();
      return;
    }

    if (isGameOpen) {
      closeGame();
    }
  };

  window.addEventListener("popstate", handlePopState);

  return () => {
    window.removeEventListener("popstate", handlePopState);
  };
}, [
  isLearningOpen,
  isGameOpen,
  previewLesson,
  selectedStory,
]);

  const games = GAME_REGISTRY;

  const origamiLessons = [
  {
    id: 1,
    title: "اوریگامی هواپیما",
    subtitle: "آموزش ساخت هواپیما",
    image: "/images/origami/origami-1.webp",
  },
  {
    id: 2,
    title: "اوریگامی قایق",
    subtitle: "آموزش ساخت قایق",
    image: "/images/origami/origami-2.webp",
  },
  {
    id: 3,
    title: "اوریگامی پروانه",
    subtitle: "آموزش ساخت پروانه",
    image: "/images/origami/origami-3.webp",
  },
  {
    id: 4,
    title: "اوریگامی قورباغه",
    subtitle: "آموزش ساخت قورباغه",
    image: "/images/origami/origami-4.webp",
  },
  {
    id: 5,
    title: "اوریگامی جعبه هدیه",
    subtitle: "آموزش ساخت جعبه هدیه",
    image: "/images/origami/origami-5.webp",
  },
  {
    id: 6,
    title: "اوریگامی ماهی",
    subtitle: "آموزش ساخت ماهی",
    image: "/images/origami/origami-6.webp",
  },
  {
    id: 7,
    title: "اوریگامی پنگوئن",
    subtitle: "آموزش ساخت پنگوئن",
    image: "/images/origami/origami-7.webp",
  },
  {
    id: 8,
    title: "اوریگامی ماشین",
    subtitle: "آموزش ساخت ماشین",
    image: "/images/origami/origami-8.webp",
  },
  {
    id: 9,
    title: "اوریگامی فیل",
    subtitle: "آموزش ساخت فیل",
    image: "/images/origami/origami-9.webp",
  },
];

  const learningLessons = [
  {
    id: 1,
    title: "درس اول",
    subtitle: "حیوانات",
    image: "/images/learning/lesson-1.webp",
  },
  {
    id: 2,
    title: "درس دوم",
    subtitle: "حشرات",
    image: "/images/learning/lesson-2.webp",
  },
  {
    id: 3,
    title: "درس سوم",
    subtitle: "اعضای بدن",
    image: "/images/learning/lesson-3.webp",
  },
  {
    id: 4,
    title: "درس چهارم",
    subtitle: "میوه ها",
    image: "/images/learning/lesson-4.webp",
  },
  {
    id: 5,
    title: "درس پنجم",
    subtitle: "لباس ها",
    image: "/images/learning/lesson-5.webp",
  },
  {
    id: 6,
    title: "درس ششم",
    subtitle: "وسائل نقلیه",
    image: "/images/learning/lesson-6.webp",
  },
  {
    id: 7,
    title: "درس هفتم",
    subtitle: "طبیعت",
    image: "/images/learning/lesson-7.webp",
  },
  {
    id: 8,
    title: "درس هشتم",
    subtitle: "وسائل خانه",
    image: "/images/learning/lesson-8.webp",
  },
  {
    id: 9,
    title: "درس نهم",
    subtitle: "رنگ ها",
    image: "/images/learning/lesson-9.webp",
  },
  {
    id: 10,
    title: "درس دهم",
    subtitle: "شغل ها",
    image: "/images/learning/lesson-10.webp",
  },
  {
    id: 11,
    title: "درس یازدهم",
    subtitle: "مدرسه و کلاس",
    image: "/images/learning/lesson-11.webp",
  },
  {
    id: 12,
    title: "درس دوازدهم",
    subtitle: "احساسات",
    image: "/images/learning/lesson-12.webp",
  },
  {
    id: 13,
    title: "درس سیزدهم",
    subtitle: "مکالمه های ساده کودکانه",
    image: "/images/learning/lesson-13.webp",
  },
  {
    id: 14,
    title: "درس چهاردهم",
    subtitle: "ادامه مکالمه های ساده کودکانه",
    image: "/images/learning/lesson-14.webp",
  },
  {
    id: 15,
    title: "درس پانزدهم",
    subtitle: "اعضای خانواده",
    image: "/images/learning/lesson-15.webp",
  },

];


  const videos = [
  {
    id: "v1",
    title: "آموزش زبان انگلیسی",
    category: "یادگیری زبان",
    icon: <Languages className="w-16 h-16 text-yellow-500" />,
  },
  {
  id: "v2",
  title: "آموزش اوریگامی",
  category: "خلاقیت و کاردستی",
  icon: <Puzzle className="w-16 h-16 text-yellow-500" />,
},
   {
  id: "v3",
  title: "داستان‌های کودکان",
  category: "قصه و خیال‌پردازی",
  icon: <BookOpen className="w-16 h-16 text-yellow-500" />,
  Component: PinocchioStory,
},
];

  const openGame = (game) => {
    setSelectedGame(game);
    setIsGameOpen(true);
  };

  const closeGame = () => {
    setIsGameOpen(false);
    setSelectedGame(null);
  };

  const openLearning = (item) => {
  setSelectedLearning(item);
  setIsLearningOpen(true);
};

const closeLearning = () => {
  setIsLearningOpen(false);
  setSelectedLearning(null);
};

  const GameComponent = selectedGame?.Component;
  const gameProps = selectedGame?.props || {};

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#f7f2eb] to-[#fffdf8] text-gray-800 flex flex-col items-center pt-12 sm:pt-20 px-4 sm:px-6 pb-32 relative overflow-hidden"
    >
      {/* بک‌گراند DNA */}
      <div className="absolute inset-0 opacity-25 z-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.svg
            key={i}
            viewBox="0 0 100 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              transformOrigin: "center",
            }}
            animate={{ rotate: [0, i % 2 === 0 ? 360 : -360] }}
            transition={{ duration: 100 + i * 10, repeat: Infinity, ease: "linear" }}
          >
            <defs>
              <linearGradient id={`grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e2b744" />
                <stop offset="100%" stopColor="#c69a2c" />
              </linearGradient>
            </defs>
            <path d="M30,10 C50,30 50,70 30,90 C10,110 10,150 30,170" stroke={`url(#grad-${i})`} strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M70,10 C50,30 50,70 70,90 C90,110 90,150 70,170" stroke={`url(#grad-${i})`} strokeWidth="2" fill="none" strokeLinecap="round" />
          </motion.svg>
        ))}
      </div>

      <motion.section
  className="
relative z-10 w-full max-w-5xl
rounded-[2.2rem]
border border-white/60
bg-white/70 backdrop-blur-2xl
shadow-[0_20px_60px_rgba(212,175,55,0.16)]
px-4 sm:px-10
py-5 sm:py-8
mb-6 sm:mb-8
overflow-hidden
"
  initial={{ opacity: 0, y: 18 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-yellow-300/20 blur-3xl" />
  <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-amber-400/20 blur-3xl" />

  <div className="relative flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-10">

  {/* متن */}
  <div className="flex-1 text-center lg:text-right">

    <div className="
w-14 h-14 sm:w-16 sm:h-16
rounded-[1.6rem]
bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600
text-white
flex items-center justify-center
shadow-[0_10px_30px_rgba(212,175,55,0.35)]
mb-3 sm:mb-4
mx-auto lg:mx-0
border border-yellow-200/50
">
      <Gamepad2 className="w-8 h-8" />
    </div>

    <h1 className="
text-[1.7rem] sm:text-4xl
font-black
leading-[2.4rem] sm:leading-relaxed
bg-gradient-to-r from-yellow-700 via-amber-600 to-yellow-500
bg-clip-text text-transparent
">
      دنیای بازی، یادگیری و سرگرمی ژنینو
    </h1>
  </div>

  {/* عکس */}
  <div className="flex-1 flex justify-center">
    <img
      src={funHero}
      alt="Genino Fun"
      className="
        w-full max-w-[430px]
        object-contain
        drop-shadow-[0_12px_30px_rgba(212,175,55,0.18)]
        pointer-events-none
        select-none
      "
      loading="lazy"
    />
  </div>

</div>
</motion.section>

      {/* تب‌ها */}
      <div className="flex justify-center gap-4 mb-10 z-10">
        
        <button
  onClick={() => setActiveTab("videos")}
  className={`flex items-center gap-2 px-6 py-2 rounded-xl font-semibold transition-all ${
    activeTab === "videos"
      ? "bg-yellow-500 text-white shadow-lg"
      : "bg-white border border-yellow-300 text-yellow-700 hover:bg-yellow-50"
  }`}
>
  <Film className="w-5 h-5" />
  آموزش و یادگیری
</button>

<button
          onClick={() => setActiveTab("games")}
          className={`flex items-center gap-2 px-6 py-2 rounded-xl font-semibold transition-all ${
            activeTab === "games"
              ? "bg-yellow-500 text-white shadow-lg"
              : "bg-white border border-yellow-300 text-yellow-700 hover:bg-yellow-50"
          }`}
        >
          <Gamepad2 className="w-5 h-5" />
          بازی‌ها
        </button>
      </div>

      {/* کارت‌ها */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl z-10"
      >
        {(activeTab === "games" ? games : videos).map((item) => {
          const Icon = activeTab === "games" ? item.icon : null;
          const theme = activeTab === "games" ? getGameTheme(item.type) : null;

          return (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
  if (activeTab === "games") {
    openGame(item);
  } else {
    openLearning(item);
  }
}}
              className={[
                "rounded-3xl shadow-lg overflow-hidden cursor-pointer transition-all",
                "flex flex-col items-center justify-center py-10 relative",
                activeTab === "games"
                  ? `${theme.bg} ${theme.border} ${theme.ring} hover:shadow-xl`
                  : "bg-white border border-yellow-200 hover:shadow-xl",
              ].join(" ")}
            >
              <div
                className={[
                  "absolute top-4 right-4 text-xs px-3 py-1 rounded-full border",
                  activeTab === "games" ? theme.badge : "bg-yellow-50 text-yellow-700 border-yellow-200",
                ].join(" ")}
              >
                {item.category}
              </div>

              <div
                className={[
                  "mb-4 w-20 h-20 rounded-2xl flex items-center justify-center border",
                  activeTab === "games" ? `${theme.iconWrap} ${theme.border}` : "bg-yellow-50 border-yellow-200",
                ].join(" ")}
              >
                {activeTab === "games" ? <Icon className={["w-10 h-10", theme.icon].join(" ")} /> : item.icon}
              </div>

              <h3 className="font-extrabold text-gray-800">{item.title}</h3>

              {activeTab === "games" && (
                <p className="text-xs text-gray-500 mt-2 text-center px-6 leading-6">
                  {item.hint}
                </p>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      

      <AnimatePresence>
  {isLearningOpen && (
    <motion.div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={closeLearning}
    >
      <motion.div
        className="w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white rounded-[2rem] border border-yellow-200 shadow-2xl p-6 relative"
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeLearning}
          className="absolute left-4 top-4 w-10 h-10 rounded-xl bg-yellow-50 border border-yellow-200 flex items-center justify-center hover:bg-yellow-100"
        >
          <X className="w-5 h-5 text-yellow-700" />
        </button>

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-black text-yellow-700">
            {selectedLearning?.title}
          </h2>

          <p className="text-gray-500 mt-2">
            {selectedLearning?.id === "v3"
              ? "داستان‌های شیرین و آموزنده برای کودکان"
              : selectedLearning?.id === "v2"
              ? "آموزش‌های تصویری اوریگامی ژنینو"
              : "درس‌های تصویری و جذاب ژنینو"}
          </p>
        </div>

        {selectedLearning?.id === "v3" ? (
          selectedStory ? (
            <>
              <button
                onClick={() => setSelectedStory(null)}
                className="mb-6 rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-2 text-sm font-bold text-yellow-700 hover:bg-yellow-100"
              >
                بازگشت به لیست داستان‌ها
              </button>

              <selectedStory.Component />
            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story) => (
                <button
                  key={story.id}
                  onClick={() => setSelectedStory(story)}
                  className="text-right bg-white border border-yellow-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                >
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full aspect-[3/2] object-contain bg-yellow-50"
                    loading="lazy"
                  />

                  <div className="p-4">
                    <h3 className="text-lg font-black text-yellow-700">
                      {story.title}
                    </h3>

                    <p className="text-sm text-gray-600 mt-2 leading-7">
                      {story.description}
                    </p>

                    <div className="mt-4 text-center rounded-xl bg-yellow-500 text-white py-2 font-bold">
                      مشاهده داستان
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(
              selectedLearning?.id === "v2"
                ? origamiLessons
                : learningLessons
            ).map((lesson) => (
              <motion.div
                key={lesson.id}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white border border-yellow-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <button
                  type="button"
                  onClick={() => setPreviewLesson(lesson)}
                  className="w-full bg-gradient-to-br from-yellow-50 to-white p-3"
                >
                  <img
                    src={lesson.image}
                    alt={lesson.subtitle}
                    className="w-full aspect-[3/2] object-contain rounded-2xl"
                    loading="lazy"
                  />
                </button>

                <div className="p-4 text-center">
                  <h3 className="text-lg font-black text-yellow-700">
                    {lesson.title}
                  </h3>

                  <p className="text-gray-600 mt-1 font-semibold">
                    {lesson.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

<AnimatePresence>
  {previewLesson && (
    <motion.div
      className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setPreviewLesson(null)}
    >
      <motion.div
        className="relative w-full max-w-6xl bg-white rounded-3xl border border-yellow-200 shadow-2xl p-3 sm:p-5"
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setPreviewLesson(null)}
          className="absolute left-3 top-3 z-10 w-10 h-10 rounded-xl bg-white/90 border border-yellow-200 flex items-center justify-center hover:bg-yellow-50"
          aria-label="بستن تصویر"
        >
          <X className="w-5 h-5 text-yellow-700" />
        </button>

        <div className="text-center mb-3 pt-10 sm:pt-2">
          <h3 className="text-xl sm:text-2xl font-black text-yellow-700">
            {previewLesson.title}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 font-semibold mt-1">
            {previewLesson.subtitle}
          </p>
        </div>

        <img
          src={previewLesson.image}
          alt={previewLesson.subtitle}
          className="w-full max-h-[72vh] object-contain rounded-2xl bg-yellow-50"
        />
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      {/* مودال بازی */}
      <AnimatePresence>
        {isGameOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGame}
          >
            <motion.div
              className="w-full max-w-2xl bg-white rounded-3xl border border-yellow-200 shadow-2xl p-6 relative"
              initial={{ scale: 0.95, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeGame}
                className="absolute left-4 top-4 w-10 h-10 rounded-xl bg-yellow-50 border border-yellow-200 flex items-center justify-center hover:bg-yellow-100"
                aria-label="بستن"
              >
                <X className="w-5 h-5 text-yellow-700" />
              </button>

              <h2 className="text-2xl font-extrabold text-yellow-700 mb-2">
                {selectedGame?.title}
              </h2>

              {GameComponent && (
                <>
                  <p className="text-gray-600 mb-6">{selectedGame?.hint}</p>

                  {/* ✅ این باعث می‌شود اگر بازی خطا داد کل صفحه سفید نشود */}
                  <GameErrorBoundary>
                    <GameComponent {...gameProps} />
                  </GameErrorBoundary>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
