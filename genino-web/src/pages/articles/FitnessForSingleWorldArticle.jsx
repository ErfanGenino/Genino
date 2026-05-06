// src/pages/articles/FitnessForSingleWorldArticle.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dumbbell,
  HeartPulse,
  Leaf,
  Image as ImageIcon,
  Flame,
  Shield,
  Sparkles,
  Trees,
  MoonStar,
} from "lucide-react";

const exerciseImages = import.meta.glob(
  "../../assets/fitness-for-single-world-pic/**/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    import: "default",
  }
);

function getExerciseImage(path) {
  return exerciseImages[
    `../../assets/fitness-for-single-world-pic/${path}`
  ];
}

const calorieNote =
  "کالری‌ها تقریبی هستند و برای فردی حدود ۷۰ کیلوگرم، در اجرای استاندارد هر حرکت (معمولاً ۳ ست یا حدود ۵ تا ۱۰ دقیقه فعالیت پیوسته) نوشته شده‌اند. با شدت، وزن، سن و آمادگی بدنی تغییر می‌کنند.";

/**
 * پالت‌های رنگی سبک و هماهنگ برای بخش‌های مختلف مقاله
 * هدف: ایجاد تنوع بصری بدون سنگین شدن ساختار فایل
 */
const sectionThemes = [
  {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    card: "bg-white/85 border-emerald-100",
    softBox: "bg-emerald-50/80 border-emerald-100",
    note: "bg-teal-50 border-teal-100",
    title: "text-emerald-900",
    subtitle: "text-slate-600",
    textStrong: "text-emerald-800",
    text: "text-slate-600",
    exerciseBorder: "border-emerald-100",
    caloriePill: "bg-amber-50 text-amber-700 border-amber-200",
    placeholder:
      "border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50",
    placeholderIcon: "text-emerald-500",
  },
  {
    badge: "bg-sky-50 text-sky-700 border-sky-200",
    card: "bg-white/85 border-sky-100",
    softBox: "bg-sky-50/80 border-sky-100",
    note: "bg-cyan-50 border-cyan-100",
    title: "text-slate-900",
    subtitle: "text-slate-600",
    textStrong: "text-sky-800",
    text: "text-slate-600",
    exerciseBorder: "border-sky-100",
    caloriePill: "bg-orange-50 text-orange-700 border-orange-200",
    placeholder:
      "border-sky-200 bg-gradient-to-br from-sky-50 via-white to-cyan-50",
    placeholderIcon: "text-sky-500",
  },
  {
    badge: "bg-violet-50 text-violet-700 border-violet-200",
    card: "bg-white/85 border-violet-100",
    softBox: "bg-violet-50/80 border-violet-100",
    note: "bg-fuchsia-50 border-fuchsia-100",
    title: "text-slate-900",
    subtitle: "text-slate-600",
    textStrong: "text-violet-800",
    text: "text-slate-600",
    exerciseBorder: "border-violet-100",
    caloriePill: "bg-rose-50 text-rose-700 border-rose-200",
    placeholder:
      "border-violet-200 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50",
    placeholderIcon: "text-violet-500",
  },
  {
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    card: "bg-white/85 border-amber-100",
    softBox: "bg-amber-50/80 border-amber-100",
    note: "bg-yellow-50 border-yellow-100",
    title: "text-slate-900",
    subtitle: "text-slate-600",
    textStrong: "text-amber-800",
    text: "text-slate-600",
    exerciseBorder: "border-amber-100",
    caloriePill: "bg-emerald-50 text-emerald-700 border-emerald-200",
    placeholder:
      "border-amber-200 bg-gradient-to-br from-amber-50 via-white to-yellow-50",
    placeholderIcon: "text-amber-500",
  },
  {
    badge: "bg-rose-50 text-rose-700 border-rose-200",
    card: "bg-white/85 border-rose-100",
    softBox: "bg-rose-50/80 border-rose-100",
    note: "bg-pink-50 border-pink-100",
    title: "text-slate-900",
    subtitle: "text-slate-600",
    textStrong: "text-rose-800",
    text: "text-slate-600",
    exerciseBorder: "border-rose-100",
    caloriePill: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
    placeholder:
      "border-rose-200 bg-gradient-to-br from-rose-50 via-white to-pink-50",
    placeholderIcon: "text-rose-500",
  },
];

function getTheme(id) {
  return sectionThemes[(id - 1) % sectionThemes.length];
}

const sections = [
  {
    id: 1,
    icon: <Dumbbell className="w-5 h-5" />,
    title: "تمرین‌های خانگی برای کل بدن",
    subtitle:
      "برای کسانی که می‌خواهند در خانه، بدون تجهیزات حرفه‌ای، کل بدن را قوی‌تر و خوش‌فرم‌تر کنند.",
    image: getExerciseImage("part-one/part-one-cover.jpg"),
    suitableFor:
      "مبتدی‌ها، افراد پرمشغله، کسانی که باشگاه نمی‌روند، افرادی که می‌خواهند از خانه شروع کنند.",
    benefits:
      "تقویت پا، باسن، شکم، سینه، بازو، افزایش استقامت عمومی و فرم بهتر بدن.",
    imagePosition: "right",
    imagePlaceholder:
      "عکس پیشنهادی: فضای خانه با مت یوگا، بطری آب، نور طبیعی و حس سالم و آرام.",
    exercises: [
      {
  name: "راه رفتن درجا",
  image: getExerciseImage("part-one/walk-in-place.jpg"),
  target: "گرم‌کردن بدن و بالا بردن ضربان قلب",
  how: "۱ تا ۲ دقیقه درجا راه برو و دست‌ها را هم‌زمان حرکت بده.",
  calories: "8–18 kcal",
  goodFor: "همه، مخصوصاً قبل از شروع تمرین",
},
      {
        name: "جامپینگ جک سبک",
        image: getExerciseImage("part-one/light-jumping-jack.jpg"),
        target: "قلب، ریه، پاها",
        how: "پاها را باز و بسته کن و هم‌زمان دست‌ها را بالای سر ببر.",
        calories: "12–25 kcal",
        goodFor: "افراد سالم با زانوهای بدون درد",
      },
      {
        name: "اسکوات معمولی",
        image: getExerciseImage("part-one/squat.jpg"),
        target: "ران، باسن، عضلات مرکزی",
        how: "باسن را عقب بده و زانوها را با کنترل خم کن، سپس بالا بیا.",
        calories: "12–22 kcal",
        goodFor: "تقویت پایین‌تنه و فرم باسن",
      },
      {
        name: "اسکوات به صندلی",
        image: getExerciseImage("part-one/chair-squat.jpg"),
        target: "ران و باسن",
        how: "آرام روی صندلی نزدیک شو و قبل از نشستن کامل بلند شو.",
        calories: "10–18 kcal",
        goodFor: "مبتدی‌ها و افراد سنگین‌وزن",
      },
      {
        name: "لانج عقب",
        image: getExerciseImage("part-one/reverse-lunge.jpg"),
        target: "ران جلو، باسن، تعادل",
        how: "یک پا را عقب ببر، هر دو زانو را خم کن و برگرد.",
        calories: "12–22 kcal",
        goodFor: "فرم پا و باسن",
      },
      {
        name: "پل باسن",
        image: getExerciseImage("part-one/glute-bridge.jpg"),
        target: "باسن، پشت ران، کمر پایین",
        how: "به پشت بخواب، زانو خم، لگن را بالا بده و مکث کن.",
        calories: "8–16 kcal",
        goodFor: "افراد کم‌تحرک و تقویت باسن",
      },
      {
        name: "شنا روی دیوار",
        image: getExerciseImage("part-one/wall-pushup.jpg"),
        target: "سینه، بازو، سرشانه",
        how: "کف دست روی دیوار، بدن صاف، آرنج‌ها را خم و صاف کن.",
        calories: "6–14 kcal",
        goodFor: "مبتدی‌ها و کسانی که هنوز شنا کامل نمی‌زنند",
      },
      {
        name: "شنا روی زانو",
        image: getExerciseImage("part-one/knee-pushup.jpg"),
        target: "سینه، پشت بازو، شانه",
        how: "بدن را صاف نگه دار، سینه را پایین ببر و بالا بیا.",
        calories: "8–18 kcal",
        goodFor: "تقویت بالاتنه در خانه",
      },
      {
        name: "پلانک",
        image: getExerciseImage("part-one/plank.jpg"),
        target: "شکم، کمر، core",
        how: "ساعدها روی زمین، بدن کاملاً صاف، شکم را جمع نگه دار.",
        calories: "6–14 kcal",
        goodFor: "تقویت مرکز بدن",
      },
      {
        name: "ددباگ",
        image: getExerciseImage("part-one/dead-bug.jpg"),
        target: "شکم عمیق، تعادل تنه",
        how: "دست و پای مخالف را آرام باز کن و برگردان.",
        calories: "6–12 kcal",
        goodFor: "کمرهای حساس و اصلاحی",
      },
      {
        name: "بردداگ",
        image: getExerciseImage("part-one/bird-dog.jpg"),
        target: "کمر، باسن، تعادل",
        how: "در حالت چهار دست‌وپا، دست و پای مخالف را دراز کن.",
        calories: "6–12 kcal",
        goodFor: "افراد پشت‌میزنشین",
      },
      {
        name: "کوهنورد آهسته",
        image: getExerciseImage("part-one/slow-mountain-climber.jpg"),
        target: "شکم، شانه، قلب",
        how: "در حالت شنا، زانوها را یکی‌یکی به سمت سینه بیاور.",
        calories: "12–24 kcal",
        goodFor: "چربی‌سوزی خانگی",
      },
      {
        name: "استپ‌آپ روی پله",
        image: getExerciseImage("part-one/step-up.jpg"),
        target: "ران، باسن، تعادل",
        how: "روی پله یا سطح کوتاه بالا برو و پایین بیا.",
        calories: "10–20 kcal",
        goodFor: "تقویت پا و کالری‌سوزی",
      },
      {
        name: "دیپ پشت بازو با صندلی",
        image: getExerciseImage("part-one/chair-triceps-dip.jpg"),
        target: "پشت بازو",
        how: "دست‌ها روی صندلی، آرنج را خم و صاف کن.",
        calories: "6–14 kcal",
        goodFor: "فرم بازو",
      },
      {
        name: "بالا آوردن ساق",
        image: getExerciseImage("part-one/calf-raise.jpg"),
        target: "ساق پا، مچ",
        how: "روی پنجه برو و آرام پایین بیا.",
        calories: "5–10 kcal",
        goodFor: "استحکام ساق و گردش خون",
      },
      {
        name: "سوپرمن",
        image: getExerciseImage("part-one/superman.jpg"),
        target: "پشت، کمر، باسن",
        how: "روی شکم بخواب و دست و پا را کمی بالا بیاور.",
        calories: "5–10 kcal",
        goodFor: "اصلاح ضعف پشت",
      },
      {
        name: "کرانچ سبک",
        image: getExerciseImage("part-one/light-crunch.jpg"),
        target: "شکم سطحی",
        how: "شانه‌ها را کمی از زمین جدا کن و آرام برگرد.",
        calories: "6–12 kcal",
        goodFor: "تقویت مقدماتی شکم",
      },
      {
        name: "نشستن دیواری",
        image: getExerciseImage("part-one/wall-sit.jpg"),
        target: "ران، باسن، استقامت",
        how: "به دیوار تکیه بده و زانوها را تا حد راحتی خم کن.",
        calories: "8–16 kcal",
        goodFor: "استقامت پایین‌تنه",
      },
      {
        name: "کشش همسترینگ",
        image: getExerciseImage("part-one/hamstring-stretch.jpg"),
        target: "پشت ران و کمر پایین",
        how: "یک پا جلو، لگن را کمی به جلو خم کن.",
        calories: "3–8 kcal",
        goodFor: "افراد با خشکی پشت ران",
      },
      {
        name: "کشش سینه و شانه",
        image: getExerciseImage("part-one/chest-shoulder-stretch.jpg"),
        target: "سینه، شانه، اصلاح فرم",
        how: "پشت دست‌ها را باز کن و قفسه سینه را باز نگه دار.",
        calories: "3–8 kcal",
        goodFor: "پشت‌میزنشین‌ها",
      },
    ],
  },

  {
    id: 2,
    icon: <Trees className="w-5 h-5" />,
    title: "تمرین‌های پارک، طبیعت و فضای باز",
    subtitle:
      "برای کسانی که انرژی‌شان با هوای آزاد و حرکت در محیط باز بیشتر می‌شود.",
    image: getExerciseImage("part-two/part-two-cover.jpg"),
    suitableFor:
      "افراد علاقه‌مند به پیاده‌روی، دویدن سبک، تمرین در پارک و طبیعت.",
    benefits:
      "چربی‌سوزی، تقویت قلب و ریه، روحیه بهتر، پاهای قوی‌تر و کاهش استرس.",
    imagePosition: "left",
    imagePlaceholder:
      "عکس پیشنهادی: پارک سرسبز، نیمکت، مسیر پیاده‌روی، لباس ورزشی ساده و حس طبیعت.",
    exercises: [
      {
        name: "پیاده‌روی آرام",
        image: getExerciseImage("part-two/slow-walk.jpg"),
        target: "قلب، مفاصل، شروع فعالیت",
        how: "۱۰ تا ۲۰ دقیقه با ریتم راحت راه برو.",
        calories: "20–45 kcal",
        goodFor: "همه، مخصوصاً افراد کم‌تحرک",
      },
      {
        name: "پیاده‌روی تند",
        image: getExerciseImage("part-two/brisk-walk.jpg"),
        target: "قلب، پاها، چربی‌سوزی",
        how: "گام‌ها را بلندتر و سرعت را بیشتر کن.",
        calories: "35–70 kcal",
        goodFor: "کاهش وزن و استقامت",
      },
      {
        name: "دویدن آرام",
        image: getExerciseImage("part-two/easy-jog.jpg"),
        target: "قلب، ریه، پاها",
        how: "با سرعتی بدو که هنوز بتوانی کوتاه حرف بزنی.",
        calories: "50–95 kcal",
        goodFor: "استقامت و کالری‌سوزی بیشتر",
      },
      {
        name: "دویدن تناوبی",
        image: getExerciseImage("part-two/interval-running.jpg"),
        target: "قلب، چربی‌سوزی، پاها",
        how: "۳۰ ثانیه تند، ۶۰ ثانیه آرام، چند دور تکرار کن.",
        calories: "55–100 kcal",
        goodFor: "افراد با آمادگی متوسط",
      },
      {
        name: "بالا رفتن از پله",
        image: getExerciseImage("part-two/stair-climb.jpg"),
        target: "ران، باسن، قلب",
        how: "پله‌ها را با کنترل بالا برو و پایین بیا.",
        calories: "40–85 kcal",
        goodFor: "فرم پا و باسن",
      },
      {
        name: "استپ روی نیمکت",
        image: getExerciseImage("part-two/bench-step-up.jpg"),
        target: "ران و تعادل",
        how: "یک پا را روی نیمکت بگذار و بالا برو، بعد پایین بیا.",
        calories: "25–50 kcal",
        goodFor: "پایین‌تنه قوی‌تر",
      },
      {
        name: "اسکوات کنار نیمکت",
        image: getExerciseImage("part-two/bench-squat.jpg"),
        target: "باسن و ران",
        how: "کنار نیمکت اسکوات بزن و ارتفاع را با نیمکت کنترل کن.",
        calories: "12–22 kcal",
        goodFor: "تقویت پایین‌تنه",
      },
      {
        name: "لانج راه‌رفتنی",
        image: getExerciseImage("part-two/walking-lunge.jpg"),
        target: "ران، باسن، تعادل",
        how: "قدم بلند بردار و هر بار زانو را خم کن.",
        calories: "15–28 kcal",
        goodFor: "فرم پا",
      },
      {
        name: "شنا روی نیمکت",
        image: getExerciseImage("part-two/bench-pushup.jpg"),
        target: "سینه، شانه، بازو",
        how: "دست‌ها روی نیمکت، بدن صاف، پایین و بالا برو.",
        calories: "8–18 kcal",
        goodFor: "بالاتنه در فضای باز",
      },
      {
        name: "دیپ با نیمکت",
        image: getExerciseImage("part-two/bench-dip.jpg"),
        target: "پشت بازو",
        how: "دست‌ها روی لبه نیمکت، بدن را پایین و بالا ببر.",
        calories: "6–14 kcal",
        goodFor: "فرم بازو",
      },
      {
        name: "بالا آوردن زانو در مسیر",
        image: getExerciseImage("part-two/high-knees-walk.jpg"),
        target: "شکم، پا، قلب",
        how: "در حال راه‌رفتن، زانوها را بالاتر بیاور.",
        calories: "15–30 kcal",
        goodFor: "گرم‌کردن پویا",
      },
      {
        name: "طناب فرضی",
        image: getExerciseImage("part-two/imaginary-jump-rope.jpg"),
        target: "قلب، ساق، هماهنگی",
        how: "بدون طناب، حرکت طناب‌زدن را شبیه‌سازی کن.",
        calories: "35–70 kcal",
        goodFor: "چربی‌سوزی سریع",
      },
      {
        name: "پرش پهلو به پهلو",
        image: getExerciseImage("part-two/side-to-side-jump.jpg"),
        target: "تعادل، پاها، قلب",
        how: "به آرامی از یک سمت به سمت دیگر بپر.",
        calories: "18–35 kcal",
        goodFor: "افراد با مفاصل سالم",
      },
      {
        name: "پلانک روی چمن",
        image: getExerciseImage("part-two/grass-plank.jpg"),
        target: "شکم و کمر",
        how: "ساعدها روی چمن، بدن صاف و محکم.",
        calories: "6–14 kcal",
        goodFor: "تقویت core",
      },
      {
        name: "خرس‌راه‌رفتن کوتاه",
        image: getExerciseImage("part-two/bear-crawl-short.jpg"),
        target: "شانه، شکم، پا",
        how: "روی دست و پاها با زانوهای نزدیک زمین حرکت کن.",
        calories: "18–30 kcal",
        goodFor: "هماهنگی و قدرت کل بدن",
      },
      {
        name: "کشش ساق پا روی لبه",
        image: getExerciseImage("part-two/edge-calf-stretch.jpg"),
        target: "ساق و مچ",
        how: "پاشنه را پایین بده و کشش را نگه دار.",
        calories: "3–8 kcal",
        goodFor: "دوند‌ه‌ها و پیاده‌روها",
      },
      {
        name: "کشش ران جلو",
        image: getExerciseImage("part-two/quad-stretch.jpg"),
        target: "ران جلو",
        how: "پاشنه را به سمت باسن بکش.",
        calories: "3–8 kcal",
        goodFor: "بعد از پیاده‌روی و دویدن",
      },
      {
        name: "کشش پهلو ایستاده",
        image: getExerciseImage("part-two/standing-side-stretch.jpg"),
        target: "پهلو و ستون فقرات",
        how: "یک دست بالا و بدن را کمی به طرف مقابل خم کن.",
        calories: "3–7 kcal",
        goodFor: "آزادسازی تنه",
      },
      {
        name: "راه رفتن در سربالایی",
        image: getExerciseImage("part-two/uphill-walk.jpg"),
        target: "باسن، قلب، استقامت",
        how: "مسیر شیب‌دار را با گام منظم بالا برو.",
        calories: "40–85 kcal",
        goodFor: "کالری‌سوزی بالا",
      },
      {
        name: "تنفس عمیق در پایان تمرین",
        image: getExerciseImage("part-two/deep-breathing-cooldown.jpg"),
        target: "ریکاوری و آرامش",
        how: "۴ ثانیه دم، ۴ ثانیه نگه‌داشتن، ۶ ثانیه بازدم.",
        calories: "2–5 kcal",
        goodFor: "همه",
      },
    ],
  },

  {
    id: 3,
    icon: <Shield className="w-5 h-5" />,
    title: "تمرین‌های ضد آسیب برای پشت میزنشینها و دانش‌آموزها ",
    subtitle:
      "برای کم‌کردن آسیب‌های ناشی از نشستن طولانی، مطالعه زیاد، نیمکت مدرسه و میز تحریر.",
    image: getExerciseImage("part-three/part-three-cover.jpg"),
    suitableFor:
      "دانش‌آموزها، داوطلبان امتحان، برنامه‌نویس‌ها، پشت‌میزنشین‌ها، نوجوان‌ها.",
    benefits:
      "کاهش درد گردن، شانه، کمر، بهبود فرم نشستن، انعطاف بهتر و کمتر شدن خشکی بدن.",
    imagePosition: "bottom",
    imagePlaceholder:
      "عکس پیشنهادی: میز تحریر مرتب، صندلی درست، نور ملایم سبز، دفتر و لپ‌تاپ.",
    exercises: [
      {
        name: "چین تاک",
        image: getExerciseImage("part-three/chin-tuck.jpg"),
        target: "گردن و اصلاح سر به جلو",
        how: "چانه را آرام به عقب ببر بدون اینکه سر پایین بیاید.",
        calories: "2–5 kcal",
        goodFor: "کسانی که زیاد موبایل یا لپ‌تاپ نگاه می‌کنند",
      },
      {
        name: "جمع کردن کتف‌ها",
        image: getExerciseImage("part-three/shoulder-blade-squeeze.jpg"),
        target: "پشت بالا و شانه",
        how: "کتف‌ها را به عقب و پایین بکش و ۳ ثانیه نگه دار.",
        calories: "2–5 kcal",
        goodFor: "اصلاح قوز",
      },
      {
        name: "وال آنجل",
        image: getExerciseImage("part-three/wall-angel.jpg"),
        target: "شانه و ستون سینه‌ای",
        how: "پشت به دیوار، دست‌ها را بالا و پایین ببر.",
        calories: "4–8 kcal",
        goodFor: "باز کردن قفسه سینه",
      },
      {
        name: "کشش سینه پشت در",
        image: getExerciseImage("part-three/doorway-chest-stretch.jpg"),
        target: "سینه و شانه جلو",
        how: "ساعد را روی چارچوب در بگذار و کمی جلو برو.",
        calories: "3–6 kcal",
        goodFor: "افراد قوزدار",
      },
      {
        name: "چرخش آرام گردن",
        image: getExerciseImage("part-three/neck-rotation.jpg"),
        target: "گردن",
        how: "خیلی آرام و بدون فشار به چپ و راست بچرخان.",
        calories: "2–4 kcal",
        goodFor: "خشکی گردن",
      },
      {
        name: "کشش گردن طرفی",
        image: getExerciseImage("part-three/side-neck-stretch.jpg"),
        target: "کناره گردن",
        how: "سر را به یک سمت خم کن و نگه دار.",
        calories: "2–4 kcal",
        goodFor: "بعد از مطالعه طولانی",
      },
      {
        name: "گربه-گاو",
        image: getExerciseImage("part-three/cat-cow.jpg"),
        target: "ستون فقرات",
        how: "در چهار دست‌وپا، یک‌بار کمر را گرد و یک‌بار گود کن.",
        calories: "4–8 kcal",
        goodFor: "خشکی کمر",
      },
      {
        name: "حرکت کودک",
        image: getExerciseImage("part-three/child-pose.jpg"),
        target: "کمر، لگن، آرامش",
        how: "زانوها خم، باسن روی پاشنه، دست‌ها جلو.",
        calories: "3–6 kcal",
        goodFor: "آرام‌کردن کمر",
      },
      {
        name: "پل باسن",
        image: getExerciseImage("part-three/glute-bridge.jpg"),
        target: "باسن و کمر پایین",
        how: "به پشت بخواب و لگن را بالا بده.",
        calories: "8–16 kcal",
        goodFor: "ضعف ناشی از نشستن زیاد",
      },
      {
        name: "بردداگ",
        image: getExerciseImage("part-three/bird-dog.jpg"),
        target: "کمر و تعادل",
        how: "دست و پای مخالف را دراز کن و برگردان.",
        calories: "6–12 kcal",
        goodFor: "محافظت از کمر",
      },
      {
        name: "ددباگ",
        image: getExerciseImage("part-three/dead-bug.jpg"),
        target: "شکم عمیق",
        how: "دست و پای مخالف را آرام باز کن.",
        calories: "6–12 kcal",
        goodFor: "ثبات مرکز بدن",
      },
      {
        name: "نشستن و بلند شدن از صندلی",
        image: getExerciseImage("part-three/chair-sit-to-stand.jpg"),
        target: "ران و باسن",
        how: "از صندلی بلند شو و آرام دوباره بنشین.",
        calories: "8–15 kcal",
        goodFor: "کسانی که تحرک کم دارند",
      },
      {
        name: "شنا روی دیوار",
        image: getExerciseImage("part-three/wall-pushup.jpg"),
        target: "سینه و شانه",
        how: "با دست روی دیوار شنا بزن.",
        calories: "6–12 kcal",
        goodFor: "تقویت بالاتنه سبک",
      },
      {
        name: "کشش همسترینگ نشسته",
        image: getExerciseImage("part-three/seated-hamstring-stretch.jpg"),
        target: "پشت ران",
        how: "یک پا را جلو دراز کن و کمی به جلو خم شو.",
        calories: "3–7 kcal",
        goodFor: "کسانی که زیاد می‌نشینند",
      },
      {
        name: "کشش مچ و ساعد",
        image: getExerciseImage("part-three/wrist-forearm-stretch.jpg"),
        target: "مچ و ساعد",
        how: "کف دست را با دست دیگر آرام عقب بکش.",
        calories: "2–5 kcal",
        goodFor: "نوشتن زیاد و کار با موس",
      },
      {
        name: "چرخش ستون سینه‌ای",
        image: getExerciseImage("part-three/thoracic-rotation.jpg"),
        target: "پشت میانی",
        how: "به پهلو یا چهار دست‌وپا، قفسه سینه را بچرخان.",
        calories: "3–7 kcal",
        goodFor: "کاهش خشکی پشت",
      },
      {
        name: "بالا آوردن ساق",
        image: getExerciseImage("part-three/calf-raise.jpg"),
        target: "ساق و گردش خون",
        how: "روی پنجه برو و پایین بیا.",
        calories: "4–8 kcal",
        goodFor: "نشستن طولانی",
      },
      {
        name: "راه‌رفتن کوتاه بین درس",
        image: getExerciseImage("part-three/short-walk-study-break.jpg"),
        target: "گردش خون و ذهن",
        how: "هر ۴۵ دقیقه، ۲ تا ۳ دقیقه راه برو.",
        calories: "8–18 kcal",
        goodFor: "دانش‌آموزها و پشت‌میزنشین‌ها",
      },
      {
        name: "کشش پهلو در حالت نشسته",
        image: getExerciseImage("part-three/seated-side-stretch.jpg"),
        target: "پهلو و کمر",
        how: "یک دست بالا و بدن را به طرف مخالف خم کن.",
        calories: "2–5 kcal",
        goodFor: "آزادسازی ستون فقرات",
      },
      {
        name: "تنفس دیافراگمی",
        image: getExerciseImage("part-three/diaphragmatic-breathing.jpg"),
        target: "استرس و تنش عضلانی",
        how: "دست روی شکم، آرام و عمیق نفس بکش.",
        calories: "2–4 kcal",
        goodFor: "قبل و بعد از مطالعه",
      },
    ],
  },

  {
    id: 4,
    icon: <Leaf className="w-5 h-5" />,
    title: "تمرین‌های کششی و انعطاف برای بدن سبک‌تر",
    subtitle:
      "برای کسانی که بدن خشک، کم‌تحرک یا پرتنش دارند و می‌خواهند نرم‌تر و آزادتر حرکت کنند.",
    image: getExerciseImage("part-four/part-four-cover.jpg"),
    suitableFor:
      "همه، مخصوصاً افراد کم‌تحرک، کسانی که صبح‌ها خشکی بدن دارند، یا بعد از تمرین نیاز به ریکاوری دارند.",
    benefits:
      "افزایش انعطاف، کمتر شدن خشکی عضله، کاهش تنش عصبی و حس سبکی بدن.",
    imagePosition: "right",
    imagePlaceholder:
      "عکس پیشنهادی: مت یوگا، نور صبح، گیاه سبز، فضای آرام و سالم.",
    exercises: [
      {
        name: "کشش گربه-گاو",
        image: getExerciseImage("part-four/cat-cow-stretch.jpg"),
        target: "ستون فقرات",
        how: "در چهار دست‌وپا، کمر را گرد و گود کن.",
        calories: "4–8 kcal",
        goodFor: "خشکی ستون فقرات",
      },
      {
        name: "حرکت کودک",
        image: getExerciseImage("part-four/child-pose.jpg"),
        target: "کمر و آرامش",
        how: "باسن را روی پاشنه ببر و دست‌ها را جلو بکش.",
        calories: "3–6 kcal",
        goodFor: "همه",
      },
      {
        name: "کشش همسترینگ خوابیده",
        image: getExerciseImage("part-four/lying-hamstring-stretch.jpg"),
        target: "پشت ران",
        how: "پا را بالا بیاور و با دست یا بند نگه دار.",
        calories: "3–7 kcal",
        goodFor: "کم‌تحرک‌ها",
      },
      {
        name: "کشش ران جلو",
        image: getExerciseImage("part-four/quad-stretch.jpg"),
        target: "ران جلو",
        how: "پاشنه را به سمت باسن بکش.",
        calories: "3–7 kcal",
        goodFor: "بعد از راه‌رفتن یا دویدن",
      },
      {
        name: "کشش پروانه",
        image: getExerciseImage("part-four/butterfly-stretch.jpg"),
        target: "داخل ران و لگن",
        how: "کف پاها را به هم بچسبان و زانوها را پایین بده.",
        calories: "3–7 kcal",
        goodFor: "خشکی لگن",
      },
      {
        name: "کشش فلکسور لگن",
        image: getExerciseImage("part-four/hip-flexor-stretch.jpg"),
        target: "جلوی لگن",
        how: "در حالت لانج، لگن را کمی جلو بده.",
        calories: "3–7 kcal",
        goodFor: "نشستن طولانی",
      },
      {
        name: "کشش پهلو ایستاده",
        image: getExerciseImage("part-four/standing-side-stretch.jpg"),
        target: "پهلو",
        how: "یک دست بالا و بدن به سمت دیگر خم شود.",
        calories: "2–5 kcal",
        goodFor: "آزادسازی تنه",
      },
      {
        name: "کشش سینه",
        image: getExerciseImage("part-four/chest-stretch.jpg"),
        target: "سینه و شانه",
        how: "دست‌ها را پشت بدن ببند و سینه را باز کن.",
        calories: "2–5 kcal",
        goodFor: "قوز و فرم بد شانه",
      },
      {
        name: "کشش شانه عرضی",
        image: getExerciseImage("part-four/cross-body-shoulder-stretch.jpg"),
        target: "پشت شانه",
        how: "یک دست را جلوی بدن ببر و با دست دیگر بکش.",
        calories: "2–5 kcal",
        goodFor: "دانش‌آموزها و کارمندان",
      },
      {
        name: "چرخش ستون فقرات خوابیده",
        image: getExerciseImage("part-four/supine-spinal-twist.jpg"),
        target: "کمر و پشت",
        how: "به پشت بخواب و زانوها را به یک سمت بچرخان.",
        calories: "3–6 kcal",
        goodFor: "آزادسازی کمر",
      },
      {
        name: "کبرا",
        image: getExerciseImage("part-four/cobra.jpg"),
        target: "جلوی تنه و شکم",
        how: "روی شکم، سینه را آرام بالا بیاور.",
        calories: "3–6 kcal",
        goodFor: "بعد از نشستن طولانی",
      },
      {
        name: "داگ رو به پایین",
        image: getExerciseImage("part-four/downward-dog.jpg"),
        target: "ساق، پشت ران، شانه",
        how: "باسن را بالا ببر و بدن را شبیه هرم کن.",
        calories: "5–10 kcal",
        goodFor: "کل بدن",
      },
      {
        name: "کشش ساق پا",
        image: getExerciseImage("part-four/calf-stretch.jpg"),
        target: "ساق و مچ",
        how: "به دیوار تکیه بده و پاشنه را پایین نگه دار.",
        calories: "2–5 kcal",
        goodFor: "پیاده‌روی و دویدن",
      },
      {
        name: "کشش مچ پا",
        image: getExerciseImage("part-four/ankle-mobility.jpg"),
        target: "مچ",
        how: "مچ را به جلو و عقب و دورانی حرکت بده.",
        calories: "2–4 kcal",
        goodFor: "قبل از پیاده‌روی و ورزش",
      },
      {
        name: "حرکت ۹۰/۹۰ لگن",
        image: getExerciseImage("part-four/ninety-ninety-hip.jpg"),
        target: "چرخش لگن",
        how: "روی زمین بنشین و پاها را در دو زاویه ۹۰ درجه قرار بده.",
        calories: "4–8 kcal",
        goodFor: "خشکی لگن",
      },
      {
        name: "کشش گردن جلو",
        image: getExerciseImage("part-four/front-neck-stretch.jpg"),
        target: "پشت گردن",
        how: "چانه را به‌آرامی به سمت سینه نزدیک کن.",
        calories: "2–4 kcal",
        goodFor: "کار با موبایل",
      },
      {
        name: "کشش عضله پیریفورمیس",
        image: getExerciseImage("part-four/piriformis-stretch.jpg"),
        target: "باسن و لگن",
        how: "در حالت خوابیده، یک پا را روی پای دیگر بینداز و بکش.",
        calories: "3–7 kcal",
        goodFor: "نشستن زیاد",
      },
      {
        name: "کشش قفسه سینه کنار دیوار",
        image: getExerciseImage("part-four/wall-chest-stretch.jpg"),
        target: "سینه",
        how: "بازو را به دیوار بچسبان و بدن را بچرخان.",
        calories: "2–5 kcal",
        goodFor: "اصلاح فرم بدن",
      },
      {
        name: "تنفس بازکننده قفسه سینه",
        image: getExerciseImage("part-four/chest-opening-breathing.jpg"),
        target: "تنفس و آرامش",
        how: "دم عمیق با باز کردن سینه و بازدم آرام.",
        calories: "2–4 kcal",
        goodFor: "کاهش تنش",
      },
      {
        name: "ریلکسیشن خوابیده",
        image: getExerciseImage("part-four/lying-relaxation.jpg"),
        target: "آرامش بدن",
        how: "روی زمین دراز بکش و عضلات را شل کن.",
        calories: "1–3 kcal",
        goodFor: "پایان تمرین",
      },
    ],
  },

  {
    id: 5,
    icon: <MoonStar className="w-5 h-5" />,
    title: "برنامه دخترها در روزهای پریود",
    subtitle:
      "برای روزهایی که بدن حساس‌تر است و باید هوشمندانه‌تر و مهربان‌تر با آن رفتار کرد.",
    image: getExerciseImage("part-five/part-five-cover.jpg"),
    suitableFor:
      "دخترها و خانم‌هایی که در روزهای قاعدگی درد، نفخ، بی‌حالی یا کلافگی دارند.",
    benefits:
      "کمک به کاهش درد، آرام‌تر شدن عضلات، بهبود خلق، گردش خون بهتر و حس سبکی بیشتر.",
    imagePosition: "left",
    imagePlaceholder:
      "عکس پیشنهادی: فضای بسیار آرام، مت نرم، بطری آب، شال یا پتوی سبک با حس مراقبت و آرامش.",
    exercises: [
      {
        name: "پیاده‌روی آرام",
        image: getExerciseImage("part-five/slow-walk.jpg"),
        target: "گردش خون و کاهش گرفتگی",
        how: "۱۰ تا ۲۰ دقیقه با سرعت راحت راه برو.",
        calories: "20–40 kcal",
        goodFor: "بیشتر افراد در روزهای پریود",
      },
      {
        name: "پیاده‌روی متوسط",
        image: getExerciseImage("part-five/moderate-walk.jpg"),
        target: "قلب و خلق بهتر",
        how: "اگر درد کم است، کمی سریع‌تر راه برو.",
        calories: "30–55 kcal",
        goodFor: "روزهای سبک‌تر پریود",
      },
      {
        name: "دوچرخه ثابت بسیار سبک",
        image: getExerciseImage("part-five/very-light-stationary-bike.jpg"),
        target: "گردش خون",
        how: "بدون فشار، ۵ تا ۱۰ دقیقه رکاب بزن.",
        calories: "20–45 kcal",
        goodFor: "وقتی بی‌حال اما متحرک هستی",
      },
      {
        name: "تنفس دیافراگمی",
        image: getExerciseImage("part-five/diaphragmatic-breathing.jpg"),
        target: "آرام‌سازی شکم و لگن",
        how: "دست روی شکم، نفس آهسته و عمیق بکش.",
        calories: "2–4 kcal",
        goodFor: "گرفتگی و اضطراب",
      },
      {
        name: "گربه-گاو ملایم",
        image: getExerciseImage("part-five/gentle-cat-cow.jpg"),
        target: "کمر و شکم",
        how: "خیلی آرام ستون فقرات را حرکت بده.",
        calories: "3–6 kcal",
        goodFor: "کمر درد پریود",
      },
      {
        name: "حرکت کودک",
        image: getExerciseImage("part-five/child-pose.jpg"),
        target: "کمر و آرامش",
        how: "باسن را روی پاشنه ببر و استراحت کن.",
        calories: "2–5 kcal",
        goodFor: "درد و خستگی",
      },
      {
        name: "کشش پروانه",
        image: getExerciseImage("part-five/butterfly-stretch.jpg"),
        target: "لگن",
        how: "کف پاها را به هم بچسبان و زانوها را شل نگه دار.",
        calories: "3–6 kcal",
        goodFor: "گرفتگی لگن",
      },
      {
        name: "چرخش آرام لگن",
        image: getExerciseImage("part-five/gentle-hip-circles.jpg"),
        target: "لگن و کمر پایین",
        how: "ایستاده یا خوابیده، لگن را نرم بچرخان.",
        calories: "3–6 kcal",
        goodFor: "نفخ و گرفتگی",
      },
      {
        name: "کشش زانو به سینه",
        image: getExerciseImage("part-five/knee-to-chest-stretch.jpg"),
        target: "کمر پایین",
        how: "به پشت بخواب و یک یا هر دو زانو را به سینه نزدیک کن.",
        calories: "3–6 kcal",
        goodFor: "کمر درد",
      },
      {
        name: "پل باسن خیلی سبک",
        image: getExerciseImage("part-five/very-light-glute-bridge.jpg"),
        target: "باسن و کمر",
        how: "بدون فشار زیاد، لگن را کمی بالا بده.",
        calories: "6–12 kcal",
        goodFor: "وقتی درد شدید نداری",
      },
      {
        name: "ددباگ سبک",
        image: getExerciseImage("part-five/light-dead-bug.jpg"),
        target: "شکم عمیق",
        how: "حرکت را آهسته و کوتاه اجرا کن.",
        calories: "4–8 kcal",
        goodFor: "ثبات کمر",
      },
      {
        name: "کشش همسترینگ",
        image: getExerciseImage("part-five/hamstring-stretch.jpg"),
        target: "پشت ران",
        how: "پا را دراز و ملایم بکش.",
        calories: "3–6 kcal",
        goodFor: "خشکی بدن",
      },
      {
        name: "کشش پهلو",
        image: getExerciseImage("part-five/side-stretch.jpg"),
        target: "پهلو و شکم",
        how: "یک دست بالا و بدن کمی خم شود.",
        calories: "2–5 kcal",
        goodFor: "سفتی شکم و پهلو",
      },
      {
        name: "یوگای ملایم نشسته",
        image: getExerciseImage("part-five/gentle-seated-yoga.jpg"),
        target: "آرامش عمومی",
        how: "حرکت‌های نشسته و کششی آرام انجام بده.",
        calories: "5–12 kcal",
        goodFor: "روزهای حساس",
      },
      {
        name: "راه رفتن در خانه",
        image: getExerciseImage("part-five/indoor-walking.jpg"),
        target: "فعالیت سبک",
        how: "هر چند ساعت چند دقیقه راه برو.",
        calories: "8–18 kcal",
        goodFor: "وقتی بیرون رفتن سخت است",
      },
      {
        name: "کشش ساق پا",
        image: getExerciseImage("part-five/calf-stretch.jpg"),
        target: "ساق و گردش خون",
        how: "روی دیوار یا لبه، ساق را بکش.",
        calories: "2–5 kcal",
        goodFor: "ورم یا سنگینی پا",
      },
      {
        name: "چرخش شانه",
        image: getExerciseImage("part-five/shoulder-rolls.jpg"),
        target: "تنش بالاتنه",
        how: "شانه‌ها را آرام به عقب و جلو بچرخان.",
        calories: "2–4 kcal",
        goodFor: "تنش ناشی از درد",
      },
      {
        name: "ریلکسیشن خوابیده",
        image: getExerciseImage("part-five/lying-relaxation.jpg"),
        target: "سیستم عصبی",
        how: "دراز بکش و عضلات را شل کن.",
        calories: "1–3 kcal",
        goodFor: "پایان تمرین",
      },
      {
        name: "مدیتیشن کوتاه",
        image: getExerciseImage("part-five/short-meditation.jpg"),
        target: "خلق و درد",
        how: "۵ دقیقه روی نفس کشیدن تمرکز کن.",
        calories: "1–3 kcal",
        goodFor: "استرس و کلافگی",
      },
      {
        name: "کشش قفسه سینه",
        image: getExerciseImage("part-five/chest-stretch.jpg"),
        target: "تنفس و باز شدن بدن",
        how: "دست‌ها را باز کن و سینه را کش بده.",
        calories: "2–4 kcal",
        goodFor: "سبک شدن بدن",
      },
    ],
    note:
      "در روزهای درد شدید، سراغ تمرین‌های خیلی پرفشار، پرپرش و طولانی نرو. در این روزها ورزش باید کمک‌کننده باشد، نه رقابتی.",
  },

  {
    id: 6,
    icon: <HeartPulse className="w-5 h-5" />,
    title: "ورزش‌هایی برای سلامت جنسی و کف لگن دخترها",
    subtitle:
      "برای بهبود آگاهی بدنی، تقویت کف لگن، کنترل بهتر عضلات و حس سلامت بیشتر.",
    image: getExerciseImage("part-six/part-six-cover.jpg"),
    suitableFor:
      "خانم‌هایی که می‌خواهند عضلات لگن و مرکز بدن قوی‌تری داشته باشند و ارتباط بهتری با بدن خود بگیرند.",
    benefits:
      "تقویت کف لگن، افزایش پایداری core، کمک به وضعیت بدن، آگاهی بدنی بهتر و آرامش لگن.",
    imagePosition: "right",
    imagePlaceholder:
      "عکس پیشنهادی: محیط زنانه، آرام و سالم با رنگ سبز، مت، نور لطیف و حس قدرت نرم.",
    exercises: [
      {
        name: "کگل پایه",
        image: getExerciseImage("part-six/basic-kegel.jpg"),
        target: "عضلات کف لگن",
        how: "عضلات کف لگن را ۳ ثانیه منقبض و ۳ ثانیه رها کن.",
        calories: "1–3 kcal",
        goodFor: "تقویت پایه کف لگن",
      },
      {
        name: "کگل سریع",
        image: getExerciseImage("part-six/quick-kegel.jpg"),
        target: "کف لگن",
        how: "انقباض و رهاسازی‌های کوتاه انجام بده.",
        calories: "1–3 kcal",
        goodFor: "کنترل عضلانی",
      },
      {
        name: "کگل نگه‌دار",
        image: getExerciseImage("part-six/hold-kegel.jpg"),
        target: "استقامت کف لگن",
        how: "انقباض را ۵ تا ۸ ثانیه نگه دار و رها کن.",
        calories: "1–3 kcal",
        goodFor: "استقامت عضلات لگنی",
      },
      {
        name: "تنفس با رهاسازی کف لگن",
        image: getExerciseImage("part-six/pelvic-floor-breathing.jpg"),
        target: "لگن و آرامش",
        how: "در دم عضلات را شل و در بازدم کمی فعال کن.",
        calories: "1–3 kcal",
        goodFor: "افراد پرتنش",
      },
      {
        name: "پل باسن",
        image: getExerciseImage("part-six/glute-bridge.jpg"),
        target: "باسن و کف لگن",
        how: "به پشت بخواب و لگن را بالا بده.",
        calories: "8–16 kcal",
        goodFor: "ثبات لگن",
      },
      {
        name: "پل باسن با مکث",
        image: getExerciseImage("part-six/glute-bridge-hold.jpg"),
        target: "باسن و مرکز بدن",
        how: "بالا که رفتی ۳ ثانیه مکث کن.",
        calories: "8–16 kcal",
        goodFor: "تقویت عمیق‌تر",
      },
      {
        name: "اسکوات کنترل‌شده",
        image: getExerciseImage("part-six/controlled-squat.jpg"),
        target: "ران، باسن، لگن",
        how: "آرام پایین برو و با کنترل بالا بیا.",
        calories: "12–22 kcal",
        goodFor: "قوت پایین‌تنه",
      },
      {
        name: "اسکوات دیواری",
        image: getExerciseImage("part-six/wall-squat.jpg"),
        target: "ران و لگن",
        how: "به دیوار تکیه بده و زانو را تا حد راحتی خم کن.",
        calories: "8–16 kcal",
        goodFor: "افراد مبتدی",
      },
      {
        name: "کلم‌شل",
        image: getExerciseImage("part-six/clamshell.jpg"),
        target: "باسن کناری و لگن",
        how: "به پهلو بخواب و زانوی بالا را باز و بسته کن.",
        calories: "5–10 kcal",
        goodFor: "پایداری لگن",
      },
      {
        name: "بالا آوردن پای کناری",
        image: getExerciseImage("part-six/side-leg-raise.jpg"),
        target: "باسن میانی",
        how: "به پهلو، پا را بالا و پایین کن.",
        calories: "5–10 kcal",
        goodFor: "فرم لگن و باسن",
      },
      {
        name: "ددباگ",
        image: getExerciseImage("part-six/dead-bug.jpg"),
        target: "شکم عمیق",
        how: "دست و پای مخالف را آرام باز کن.",
        calories: "6–12 kcal",
        goodFor: "ثبات core",
      },
      {
        name: "بردداگ",
        image: getExerciseImage("part-six/bird-dog.jpg"),
        target: "کمر و لگن",
        how: "در چهار دست‌وپا دست و پای مخالف را دراز کن.",
        calories: "6–12 kcal",
        goodFor: "پایداری لگنی",
      },
      {
        name: "پلانک کوتاه",
        image: getExerciseImage("part-six/short-plank.jpg"),
        target: "شکم و لگن",
        how: "۲۰ تا ۳۰ ثانیه بدن را صاف نگه دار.",
        calories: "6–12 kcal",
        goodFor: "افراد با پایه متوسط",
      },
      {
        name: "حرکت پروانه",
        image: getExerciseImage("part-six/butterfly-stretch.jpg"),
        target: "داخل ران و لگن",
        how: "کف پاها را به هم بچسبان و کشش بده.",
        calories: "3–6 kcal",
        goodFor: "آزادسازی لگن",
      },
      {
        name: "Happy Baby",
        image: getExerciseImage("part-six/happy-baby.jpg"),
        target: "لگن و کمر پایین",
        how: "به پشت بخواب و پاها را بگیر و آرام بکش.",
        calories: "3–6 kcal",
        goodFor: "آرامش لگن",
      },
      {
        name: "Hip opener",
        image: getExerciseImage("part-six/hip-opener.jpg"),
        target: "لگن",
        how: "حرکت‌های بازکننده لگن را آرام انجام بده.",
        calories: "4–8 kcal",
        goodFor: "خشکی لگن",
      },
      {
        name: "پیاده‌روی تند",
        image: getExerciseImage("part-six/brisk-walk.jpg"),
        target: "قلب و گردش خون",
        how: "۱۵ دقیقه با سرعت متوسط تا خوب راه برو.",
        calories: "35–70 kcal",
        goodFor: "سلامت عمومی و خلق بهتر",
      },
      {
        name: "یوگای ملایم",
        image: getExerciseImage("part-six/gentle-yoga.jpg"),
        target: "آرامش و بدن",
        how: "حرکت‌های روان و بدون فشار اجرا کن.",
        calories: "10–25 kcal",
        goodFor: "بدن و ذهن",
      },
      {
        name: "کشش فلکسور لگن",
        image: getExerciseImage("part-six/hip-flexor-stretch.jpg"),
        target: "جلوی لگن",
        how: "در حالت لانج، لگن را کمی جلو بده.",
        calories: "3–7 kcal",
        goodFor: "نشستن زیاد",
      },
      {
        name: "ریلکس نهایی",
        image: getExerciseImage("part-six/final-relaxation.jpg"),
        target: "سیستم عصبی",
        how: "در پایان ۲ دقیقه بدن را شل کن.",
        calories: "1–3 kcal",
        goodFor: "همه",
      },
    ],
    note:
      "اگر کسی درد لگن، درد هنگام رابطه، یا تنش زیاد کف لگن دارد، فقط تقویت کافی نیست؛ گاهی رهاسازی و ارزیابی تخصصی مهم‌تر است.",
  },

  {
    id: 7,
    icon: <Flame className="w-5 h-5" />,
    title: "ورزش‌هایی برای سلامت جنسی و کیفیت عملکرد پسرها",
    subtitle:
      "برای پسرها و آقایانی که می‌خواهند استقامت، خون‌رسانی، قدرت لگن و آمادگی عمومی بهتری داشته باشند.",
    image: getExerciseImage("part-seven/part-seven-cover.jpg"),
    suitableFor:
      "آقایان بزرگسال، جوان‌ها، افراد کم‌تحرک و کسانی که می‌خواهند از نظر جسمی و جنسی سالم‌تر باشند.",
    benefits:
      "کمک به آمادگی قلبی‌عروقی، تقویت کف لگن، کنترل بهتر عضلات، استقامت بیشتر و فرم بدنی بهتر.",
    imagePosition: "left",
    imagePlaceholder:
      "عکس پیشنهادی: فضای مردانه سالم، تمرین در پارک یا خانه، نور طبیعی و حس قدرت تمیز.",
    exercises: [
      {
        name: "پیاده‌روی تند",
        image: getExerciseImage("part-seven/brisk-walk.jpg"),
        target: "قلب و گردش خون",
        how: "۱۵ تا ۳۰ دقیقه با سرعت خوب راه برو.",
        calories: "35–75 kcal",
        goodFor: "همه آقایان",
      },
      {
        name: "دویدن آرام",
        image: getExerciseImage("part-seven/easy-jog.jpg"),
        target: "استقامت و قلب",
        how: "با ریتم یکنواخت بدو.",
        calories: "50–95 kcal",
        goodFor: "افراد با آمادگی متوسط",
      },
      {
        name: "دوچرخه سبک",
        image: getExerciseImage("part-seven/light-cycling.jpg"),
        target: "پا و استقامت",
        how: "۱۰ تا ۲۰ دقیقه رکاب بزن.",
        calories: "35–75 kcal",
        goodFor: "کسانی که دویدن دوست ندارند",
      },
      {
        name: "کگل پایه مردان",
        image: getExerciseImage("part-seven/basic-men-kegel.jpg"),
        target: "کف لگن",
        how: "عضلاتی که جریان ادرار را نگه می‌دارند، برای چند ثانیه منقبض کن.",
        calories: "1–3 kcal",
        goodFor: "کنترل بهتر عضلات لگنی",
      },
      {
        name: "کگل سریع",
        image: getExerciseImage("part-seven/quick-kegel.jpg"),
        target: "کف لگن",
        how: "انقباض و رهاسازی‌های سریع و کوتاه انجام بده.",
        calories: "1–3 kcal",
        goodFor: "پاسخ‌دهی عضلانی",
      },
      {
        name: "کگل نگه‌دار",
        image: getExerciseImage("part-seven/hold-kegel.jpg"),
        target: "استقامت کف لگن",
        how: "۵ ثانیه نگه دار و رها کن.",
        calories: "1–3 kcal",
        goodFor: "استقامت لگنی",
      },
      {
        name: "پل باسن",
        image: getExerciseImage("part-seven/glute-bridge.jpg"),
        target: "باسن، لگن، کمر پایین",
        how: "لگن را بالا بده و باسن را منقبض کن.",
        calories: "8–16 kcal",
        goodFor: "قدرت لگن",
      },
      {
        name: "هیپ تراست با مبل",
        image: getExerciseImage("part-seven/sofa-hip-thrust.jpg"),
        target: "باسن و لگن",
        how: "پشت بالایی را به مبل تکیه بده و لگن را بالا ببر.",
        calories: "12–22 kcal",
        goodFor: "قدرت پایین‌تنه",
      },
      {
        name: "اسکوات",
        image: getExerciseImage("part-seven/squat.jpg"),
        target: "پا، باسن، core",
        how: "باسن عقب، سینه بالا، سپس بالا بیا.",
        calories: "12–22 kcal",
        goodFor: "قدرت و تستوسترون طبیعی از مسیر تمرین کلی بدن",
      },
      {
        name: "لانج",
        image: getExerciseImage("part-seven/lunge.jpg"),
        target: "ران و باسن",
        how: "قدم بلند و زانوها خم، سپس برگرد.",
        calories: "12–22 kcal",
        goodFor: "پایداری و تعادل",
      },
      {
        name: "ددباگ",
        image: getExerciseImage("part-seven/dead-bug.jpg"),
        target: "شکم عمیق",
        how: "دست و پای مخالف را باز کن.",
        calories: "6–12 kcal",
        goodFor: "کنترل مرکز بدن",
      },
      {
        name: "پلانک",
        image: getExerciseImage("part-seven/plank.jpg"),
        target: "شکم و کمر",
        how: "بدن را صاف نگه دار و شکم را فعال کن.",
        calories: "6–14 kcal",
        goodFor: "core قوی‌تر",
      },
      {
        name: "ساید پلانک",
        image: getExerciseImage("part-seven/side-plank.jpg"),
        target: "پهلو و لگن",
        how: "روی یک ساعد و کنار پاها تعادل بگیر.",
        calories: "6–12 kcal",
        goodFor: "تعادل و پایداری",
      },
      {
        name: "بردداگ",
        image: getExerciseImage("part-seven/bird-dog.jpg"),
        target: "کمر و باسن",
        how: "در چهار دست‌وپا دست و پای مخالف را بکش.",
        calories: "6–12 kcal",
        goodFor: "کمرهای حساس",
      },
      {
        name: "شنا",
        image: getExerciseImage("part-seven/pushup.jpg"),
        target: "سینه، شانه، بازو",
        how: "بدن صاف و با کنترل پایین و بالا برو.",
        calories: "8–18 kcal",
        goodFor: "قدرت عمومی مردانه",
      },
      {
        name: "استپ‌آپ",
        image: getExerciseImage("part-seven/step-up.jpg"),
        target: "ران، باسن",
        how: "روی پله بالا برو و پایین بیا.",
        calories: "10–20 kcal",
        goodFor: "قدرت پا",
      },
      {
        name: "کشش فلکسور لگن",
        image: getExerciseImage("part-seven/hip-flexor-stretch.jpg"),
        target: "جلوی لگن",
        how: "در حالت لانج، لگن را جلو بده.",
        calories: "3–7 kcal",
        goodFor: "نشستن طولانی",
      },
      {
        name: "کشش همسترینگ",
        image: getExerciseImage("part-seven/hamstring-stretch.jpg"),
        target: "پشت ران",
        how: "آرام پشت ران را بکش.",
        calories: "3–7 kcal",
        goodFor: "انعطاف بهتر",
      },
      {
        name: "تنفس آرام",
        image: getExerciseImage("part-seven/calm-breathing.jpg"),
        target: "کنترل تنش و استرس",
        how: "دم عمیق و بازدم طولانی.",
        calories: "2–4 kcal",
        goodFor: "پایان تمرین و کاهش استرس",
      },
      {
        name: "راه رفتن ریکاوری",
        image: getExerciseImage("part-seven/recovery-walk.jpg"),
        target: "گردش خون",
        how: "بعد از تمرین ۳ تا ۵ دقیقه آرام راه برو.",
        calories: "8–15 kcal",
        goodFor: "ریکاوری",
      },
    ],
    note:
      "برای آقایان، ورزش فقط ظاهر بدن نیست؛ سلامت قلب و عروق، پایین آمدن چربی شکمی و تقویت عضلات لگنی می‌تواند به عملکرد کلی بدن و کیفیت رابطه هم کمک کند.",
  },

  {
    id: 8,
    icon: <Dumbbell className="w-5 h-5" />,
    title: "تمرین‌های قدرتی خانه با کوله، کش یا دمبل سبک",
    subtitle:
      "برای وقتی که خانه هستی اما می‌خواهی تمرینت از سطح مبتدی فراتر برود و عضله‌سازی بهتری داشته باشی.",
    image: getExerciseImage("part-eight/part-eight-cover.jpg"),
    suitableFor:
      "افراد متوسط، کسانی که کش یا کوله‌پشتی یا دمبل سبک دارند، کسانی که خانه تمرین می‌کنند.",
    benefits:
      "قدرت بیشتر، فرم بهتر بدن، عضله‌سازی اولیه، کالری‌سوزی و تنوع تمرین.",
    imagePosition: "right",
    imagePlaceholder:
      "عکس پیشنهادی: کوله‌پشتی ورزشی، کش تمرینی، دمبل سبک، فضای خانگی مینیمال.",
    exercises: [
      {
        name: "اسکوات با کوله",
        image: getExerciseImage("part-eight/backpack-squat.jpg"),
        target: "پا و باسن",
        how: "کوله را در بغل بگیر و اسکوات بزن.",
        calories: "14–26 kcal",
        goodFor: "قدرت پایین‌تنه",
      },
      {
        name: "لانج با کوله",
        image: getExerciseImage("part-eight/backpack-lunge.jpg"),
        target: "ران و باسن",
        how: "کوله را نگه دار و لانج عقب یا جلو اجرا کن.",
        calories: "14–26 kcal",
        goodFor: "تعادل و پا",
      },
      {
        name: "ددلیفت رومانیایی با کوله",
        image: getExerciseImage("part-eight/backpack-romanian-deadlift.jpg"),
        target: "پشت ران و باسن",
        how: "کوله را جلوی بدن بگیر و از لگن خم شو.",
        calories: "12–22 kcal",
        goodFor: "زنجیره خلفی",
      },
      {
        name: "پل باسن با وزنه",
        image: getExerciseImage("part-eight/weighted-glute-bridge.jpg"),
        target: "باسن",
        how: "کوله یا دمبل را روی لگن بگذار و پل بزن.",
        calories: "10–20 kcal",
        goodFor: "فرم باسن",
      },
      {
        name: "هیپ تراست با کوله",
        image: getExerciseImage("part-eight/backpack-hip-thrust.jpg"),
        target: "باسن و پشت ران",
        how: "به مبل تکیه بده و لگن را با وزنه بالا بده.",
        calories: "12–22 kcal",
        goodFor: "باسن قوی‌تر",
      },
      {
        name: "روئینگ با کوله",
        image: getExerciseImage("part-eight/backpack-row.jpg"),
        target: "پشت و بازو",
        how: "کمی خم شو و کوله را به سمت شکم بکش.",
        calories: "10–18 kcal",
        goodFor: "پشت قوی",
      },
      {
        name: "پرس سرشانه با دمبل سبک",
        image: getExerciseImage("part-eight/light-dumbbell-shoulder-press.jpg"),
        target: "سرشانه",
        how: "وزنه‌ها را از کنار شانه به بالا پرس کن.",
        calories: "8–16 kcal",
        goodFor: "فرم شانه",
      },
      {
        name: "نشر جانب",
        image: getExerciseImage("part-eight/lateral-raise.jpg"),
        target: "سرشانه میانی",
        how: "دست‌ها را تا کنار شانه بالا بیاور.",
        calories: "6–12 kcal",
        goodFor: "زیباتر شدن شانه",
      },
      {
        name: "جلوبازو با کش",
        image: getExerciseImage("part-eight/resistance-band-biceps-curl.jpg"),
        target: "جلوبازو",
        how: "روی کش بایست و دست‌ها را بالا خم کن.",
        calories: "6–12 kcal",
        goodFor: "بازوها",
      },
      {
        name: "پشت بازو با کش",
        image: getExerciseImage("part-eight/resistance-band-triceps-extension.jpg"),
        target: "پشت بازو",
        how: "کش را بالای سر نگه دار و آرنج را صاف کن.",
        calories: "6–12 kcal",
        goodFor: "فرم بازو",
      },
      {
        name: "شنا",
        image: getExerciseImage("part-eight/pushup.jpg"),
        target: "سینه و بازو",
        how: "شنا را با فرم درست اجرا کن.",
        calories: "8–18 kcal",
        goodFor: "قدرت بالاتنه",
      },
      {
        name: "پرس سینه خوابیده با دمبل",
        image: getExerciseImage("part-eight/floor-dumbbell-chest-press.jpg"),
        target: "سینه",
        how: "روی زمین بخواب و دمبل‌ها را بالا و پایین ببر.",
        calories: "8–16 kcal",
        goodFor: "خانه بدون نیمکت",
      },
      {
        name: "پول‌اور با دمبل سبک",
        image: getExerciseImage("part-eight/light-dumbbell-pullover.jpg"),
        target: "سینه و پشت",
        how: "در حالت خوابیده وزنه را از پشت سر به بالا بیاور.",
        calories: "6–12 kcal",
        goodFor: "باز شدن بالاتنه",
      },
      {
        name: "استپ‌آپ با وزنه",
        image: getExerciseImage("part-eight/weighted-step-up.jpg"),
        target: "پا و باسن",
        how: "روی پله با وزنه بالا و پایین برو.",
        calories: "12–24 kcal",
        goodFor: "قدرت پا",
      },
      {
        name: "ساق پا با وزنه",
        image: getExerciseImage("part-eight/weighted-calf-raise.jpg"),
        target: "ساق",
        how: "با کوله یا دمبل روی پنجه برو.",
        calories: "6–12 kcal",
        goodFor: "ساق و مچ",
      },
      {
        name: "پلانک با کش",
        image: getExerciseImage("part-eight/resistance-band-plank.jpg"),
        target: "شکم و شانه",
        how: "در پلانک، کش را با یک دست کمی بکش.",
        calories: "8–14 kcal",
        goodFor: "چالش بیشتر core",
      },
      {
        name: "ددباگ با کش",
        image: getExerciseImage("part-eight/resistance-band-dead-bug.jpg"),
        target: "شکم عمیق",
        how: "با مقاومت سبک کش اجرا کن.",
        calories: "6–12 kcal",
        goodFor: "ثبات و کنترل",
      },
      {
        name: "اسپلیت اسکوات بلغاری",
        image: getExerciseImage("part-eight/bulgarian-split-squat.jpg"),
        target: "ران و باسن",
        how: "یک پا روی مبل یا صندلی پشت سر باشد.",
        calories: "14–26 kcal",
        goodFor: "قدرت و فرم باسن",
      },
      {
        name: "وال‌سیت با وزنه سبک",
        image: getExerciseImage("part-eight/weighted-wall-sit.jpg"),
        target: "ران",
        how: "به دیوار تکیه بده و وزنه را نگه دار.",
        calories: "8–16 kcal",
        goodFor: "استقامت پا",
      },
      {
        name: "کشش پایان تمرین",
        image: getExerciseImage("part-eight/cooldown-stretch.jpg"),
        target: "ریکاوری",
        how: "۵ دقیقه عضلات اصلی را بکش.",
        calories: "3–7 kcal",
        goodFor: "همه",
      },
    ],
  },

  {
    id: 9,
    icon: <Sparkles className="w-5 h-5" />,
    title: "برنامه باشگاه برای پسرها",
    subtitle:
      "برای آقایانی که می‌خواهند در باشگاه عضله، قدرت و فرم بدنی مردانه‌تر و کامل‌تری بسازند.",
    image: getExerciseImage("part-nine/part-nine-cover.jpg"),
    suitableFor:
      "پسرها و آقایان سالمی که به باشگاه دسترسی دارند و می‌خواهند حرفه‌ای‌تر تمرین کنند.",
    benefits:
      "عضله‌سازی، قدرت، فرم بهتر شانه و سینه، پاهای قوی‌تر، چربی‌سوزی و اعتماد به نفس بیشتر.",
    imagePosition: "left",
    imagePlaceholder:
      "عکس پیشنهادی: باشگاه با نور سبز تیره، هالتر، دمبل و فضای تمیز و قدرتمند.",
    exercises: [
      {
        name: "تردمیل گرم‌کردن",
        image: getExerciseImage("part-nine/treadmill-warmup.jpg"),
        target: "قلب و آماده‌سازی بدن",
        how: "۵ تا ۸ دقیقه راه برو یا آرام بدو.",
        calories: "25–55 kcal",
        goodFor: "شروع تمرین",
      },
      {
        name: "اسکوات با هالتر",
        image: getExerciseImage("part-nine/barbell-squat.jpg"),
        target: "پا و باسن",
        how: "هالتر روی پشت، لگن عقب، با کنترل پایین و بالا.",
        calories: "18–35 kcal",
        goodFor: "قدرت کلی بدن",
      },
      {
        name: "پرس پا",
        image: getExerciseImage("part-nine/leg-press.jpg"),
        target: "ران و باسن",
        how: "پاها روی صفحه، با کنترل فشار بده.",
        calories: "14–28 kcal",
        goodFor: "قدرت پایین‌تنه",
      },
      {
        name: "ددلیفت رومانیایی",
        image: getExerciseImage("part-nine/romanian-deadlift.jpg"),
        target: "پشت ران و باسن",
        how: "از لگن خم شو، کمر صاف بماند.",
        calories: "16–30 kcal",
        goodFor: "پشت پا و باسن",
      },
      {
        name: "لانج با دمبل",
        image: getExerciseImage("part-nine/dumbbell-lunge.jpg"),
        target: "ران و تعادل",
        how: "دمبل در دست و لانج کنترل‌شده اجرا کن.",
        calories: "14–28 kcal",
        goodFor: "تعادل و پا",
      },
      {
        name: "ساق پا دستگاه",
        image: getExerciseImage("part-nine/machine-calf-raise.jpg"),
        target: "ساق",
        how: "پاشنه را بالا ببر و پایین بیا.",
        calories: "8–14 kcal",
        goodFor: "ساق پا",
      },
      {
        name: "پرس سینه",
        image: getExerciseImage("part-nine/chest-press.jpg"),
        target: "سینه، شانه، پشت بازو",
        how: "هالتر یا دستگاه را با کنترل پایین و بالا بده.",
        calories: "14–26 kcal",
        goodFor: "فرم سینه",
      },
      {
        name: "پرس بالا سینه",
        image: getExerciseImage("part-nine/incline-chest-press.jpg"),
        target: "بالای سینه",
        how: "روی نیمکت شیب‌دار پرس کن.",
        calories: "12–24 kcal",
        goodFor: "بالاسینه خوش‌فرم",
      },
      {
        name: "فلای سینه",
        image: getExerciseImage("part-nine/chest-fly.jpg"),
        target: "سینه",
        how: "دمبل‌ها را باز و بسته کن.",
        calories: "8–16 kcal",
        goodFor: "کشش و فرم سینه",
      },
      {
        name: "لت‌پول‌داون",
        image: getExerciseImage("part-nine/lat-pulldown.jpg"),
        target: "پشت و زیر بغل",
        how: "میله را به سمت بالای سینه بکش.",
        calories: "10–20 kcal",
        goodFor: "پهن‌تر شدن پشت",
      },
      {
        name: "روئینگ نشسته",
        image: getExerciseImage("part-nine/seated-row.jpg"),
        target: "پشت میانی",
        how: "دسته را به شکم نزدیک کن.",
        calories: "10–20 kcal",
        goodFor: "اصلاح فرم شانه",
      },
      {
        name: "بارفیکس یا کمک‌بارفیکس",
        image: getExerciseImage("part-nine/pull-up-assisted-pull-up.jpg"),
        target: "زیر بغل و بازو",
        how: "بدن را بالا بکش و پایین بیا.",
        calories: "12–22 kcal",
        goodFor: "قدرت واقعی بالاتنه",
      },
      {
        name: "پرس سرشانه",
        image: getExerciseImage("part-nine/shoulder-press.jpg"),
        target: "سرشانه",
        how: "وزنه را از کنار شانه به بالا پرس کن.",
        calories: "10–18 kcal",
        goodFor: "شانه‌های برجسته‌تر",
      },
      {
        name: "نشر جانب",
        image: getExerciseImage("part-nine/lateral-raise.jpg"),
        target: "سرشانه میانی",
        how: "دمبل‌ها را تا کنار شانه بالا بیاور.",
        calories: "6–12 kcal",
        goodFor: "پهن‌تر دیده شدن شانه",
      },
      {
        name: "فیس‌پول",
        image: getExerciseImage("part-nine/face-pull.jpg"),
        target: "پشت شانه و اصلاح فرم",
        how: "طناب را به سمت صورت بکش.",
        calories: "6–12 kcal",
        goodFor: "سلامت شانه",
      },
      {
        name: "جلوبازو هالتر",
        image: getExerciseImage("part-nine/barbell-biceps-curl.jpg"),
        target: "جلوبازو",
        how: "هالتر را با کنترل بالا ببر و پایین بیاور.",
        calories: "6–12 kcal",
        goodFor: "بازو",
      },
      {
        name: "پشت بازو سیم‌کش",
        image: getExerciseImage("part-nine/cable-triceps-pushdown.jpg"),
        target: "پشت بازو",
        how: "میله را به سمت پایین فشار بده.",
        calories: "6–12 kcal",
        goodFor: "فرم بازو",
      },
      {
        name: "پلانک",
        image: getExerciseImage("part-nine/plank.jpg"),
        target: "شکم و کمر",
        how: "۳۰ تا ۴۵ ثانیه صاف بمان.",
        calories: "6–12 kcal",
        goodFor: "core",
      },
      {
        name: "کرانچ کابل",
        image: getExerciseImage("part-nine/cable-crunch.jpg"),
        target: "شکم",
        how: "با کنترل شکم را جمع کن.",
        calories: "8–14 kcal",
        goodFor: "شکم قوی‌تر",
      },
      {
        name: "هوازی پایان تمرین",
        image: getExerciseImage("part-nine/cardio-cooldown.jpg"),
        target: "چربی‌سوزی و ریکاوری",
        how: "۱۰ دقیقه راه‌رفتن تند یا الپتیکال.",
        calories: "40–85 kcal",
        goodFor: "پایان جلسه",
      },
    ],
    note:
      "برای پسرها در باشگاه، فرم درست حرکات از وزن بیشتر مهم‌تر است. اول تکنیک، بعد پیشرفت وزنه.",
  },

  {
    id: 10,
    icon: <Sparkles className="w-5 h-5" />,
    title: "برنامه باشگاه برای دخترها",
    subtitle:
      "برای دخترها و خانم‌هایی که می‌خواهند بدن قوی، خوش‌فرم، سالم و متعادل‌تری بسازند.",
    image: getExerciseImage("part-ten/part-ten-cover.jpg"),
    suitableFor:
      "خانم‌هایی که باشگاه می‌روند و به دنبال فرم بهتر باسن، پا، پشت، شانه و مرکز بدن هستند.",
    benefits:
      "فرم بهتر پایین‌تنه، قدرت بیشتر، سلامت استخوان، استقامت و اعتماد به نفس بالاتر.",
    imagePosition: "right",
    imagePlaceholder:
      "عکس پیشنهادی: باشگاه شیک با رنگ سبز سدری، دمبل، کش و فضای زنانه و قدرتمند.",
    exercises: [
      {
  name: "الپتیکال گرم‌کردن",
  image: getExerciseImage("part-ten/elliptical-warmup.jpg"),
  target: "قلب و پاها",
  how: "۵ تا ۸ دقیقه با شدت متوسط.",
  calories: "30–60 kcal",
  goodFor: "شروع نرم تمرین",
},
{
  name: "اسکوات جام",
  image: getExerciseImage("part-ten/goblet-squat.jpg"),
  target: "ران و باسن",
  how: "دمبل را جلوی سینه نگه دار و اسکوات بزن.",
  calories: "14–26 kcal",
  goodFor: "فرم پایین‌تنه",
},
{
  name: "هیپ تراست",
  image: getExerciseImage("part-ten/hip-thrust.jpg"),
  target: "باسن",
  how: "پشت را به نیمکت تکیه بده و لگن را بالا ببر.",
  calories: "14–28 kcal",
  goodFor: "باسن برجسته‌تر و قوی‌تر",
},
{
  name: "ددلیفت رومانیایی",
  image: getExerciseImage("part-ten/romanian-deadlift.jpg"),
  target: "پشت ران و باسن",
  how: "با دمبل یا هالتر از لگن خم شو.",
  calories: "14–26 kcal",
  goodFor: "پشت پا و باسن",
},
{
  name: "لانج راه‌رفتنی",
  image: getExerciseImage("part-ten/walking-lunge.jpg"),
  target: "ران، باسن، تعادل",
  how: "دمبل در دست، قدم‌های بلند و کنترل‌شده بردار.",
  calories: "14–28 kcal",
  goodFor: "پای قوی و خوش‌فرم",
},
{
  name: "پرس پا",
  image: getExerciseImage("part-ten/leg-press.jpg"),
  target: "ران و باسن",
  how: "با کنترل فشار بده و زانو را قفل نکن.",
  calories: "14–26 kcal",
  goodFor: "قدرت پایین‌تنه",
},
{
  name: "پشت پا دستگاه",
  image: getExerciseImage("part-ten/leg-curl-machine.jpg"),
  target: "پشت ران",
  how: "پاها را خم کن و آرام برگردان.",
  calories: "8–16 kcal",
  goodFor: "تعادل عضلات پا",
},
{
  name: "جلو پا دستگاه",
  image: getExerciseImage("part-ten/leg-extension-machine.jpg"),
  target: "ران جلو",
  how: "با مکث کوتاه پا را صاف کن.",
  calories: "8–16 kcal",
  goodFor: "قدرت ران",
},
{
  name: "ساق پا",
  image: getExerciseImage("part-ten/calf-raise.jpg"),
  target: "ساق",
  how: "روی پنجه برو و پایین بیا.",
  calories: "6–12 kcal",
  goodFor: "پای خوش‌فرم",
},
{
  name: "لت‌پول‌داون",
  image: getExerciseImage("part-ten/lat-pulldown.jpg"),
  target: "پشت و زیر بغل",
  how: "میله را به سمت سینه بکش.",
  calories: "10–20 kcal",
  goodFor: "پشت زیباتر",
},
{
  name: "روئینگ نشسته",
  image: getExerciseImage("part-ten/seated-row.jpg"),
  target: "پشت میانی",
  how: "دسته را تا نزدیک شکم بکش.",
  calories: "10–18 kcal",
  goodFor: "فرم بهتر شانه‌ها",
},
{
  name: "پرس سرشانه دمبل",
  image: getExerciseImage("part-ten/dumbbell-shoulder-press.jpg"),
  target: "سرشانه",
  how: "دمبل‌ها را از کنار شانه به بالا ببر.",
  calories: "8–16 kcal",
  goodFor: "شانه خوش‌فرم",
},
{
  name: "نشر جانب",
  image: getExerciseImage("part-ten/lateral-raise.jpg"),
  target: "سرشانه میانی",
  how: "دست‌ها را تا کنار شانه بالا بیاور.",
  calories: "6–12 kcal",
  goodFor: "فرم بالاتنه",
},
{
  name: "پرس سینه دستگاه",
  image: getExerciseImage("part-ten/machine-chest-press.jpg"),
  target: "سینه و بازو",
  how: "به‌آرامی دستگاه را جلو ببر و برگردان.",
  calories: "8–16 kcal",
  goodFor: "قدرت بالاتنه",
},
{
  name: "پول‌ترو کابل",
  image: getExerciseImage("part-ten/cable-pull-through.jpg"),
  target: "باسن و پشت ران",
  how: "طناب را از بین پاها عبور بده و لگن را جلو بیاور.",
  calories: "10–18 kcal",
  goodFor: "باسن",
},
{
  name: "پل باسن تک پا",
  image: getExerciseImage("part-ten/single-leg-glute-bridge.jpg"),
  target: "باسن و ثبات لگن",
  how: "یک پا بالا و با پای دیگر پل بزن.",
  calories: "8–16 kcal",
  goodFor: "کنترل لگن",
},
{
  name: "ددباگ",
  image: getExerciseImage("part-ten/dead-bug.jpg"),
  target: "شکم عمیق",
  how: "آرام و کنترل‌شده اجرا کن.",
  calories: "6–12 kcal",
  goodFor: "core قوی",
},
{
  name: "ساید پلانک",
  image: getExerciseImage("part-ten/side-plank.jpg"),
  target: "پهلو و لگن",
  how: "۲۰ تا ۳۰ ثانیه روی یک سمت بمان.",
  calories: "6–12 kcal",
  goodFor: "شکم و فرم کمر",
},
{
  name: "راه‌رفتن روی تردمیل در شیب",
  image: getExerciseImage("part-ten/incline-treadmill-walk.jpg"),
  target: "باسن و چربی‌سوزی",
  how: "۸ تا ۱۰ دقیقه با شیب متوسط.",
  calories: "40–85 kcal",
  goodFor: "پایان تمرین",
},
{
  name: "کشش نهایی",
  image: getExerciseImage("part-ten/final-stretch.jpg"),
  target: "ریکاوری",
  how: "پشت ران، باسن، لگن و شانه را بکش.",
  calories: "3–7 kcal",
  goodFor: "پایان جلسه",
},
    ],
    note:
      "باشگاه برای دخترها فقط لاغری نیست؛ ساختن بدن قوی، سالم، خوش‌فرم و مقاوم هدف اصلی و باارزش‌تر است.",
  },
];

function ExerciseCard({ item, index, theme, onImageClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.28, delay: index * 0.01 }}
      className={`rounded-3xl border ${theme.exerciseBorder} bg-white/90 backdrop-blur-sm p-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all`}
    >
      <div className="grid grid-cols-2 gap-3 items-center">
        {/* متن سمت راست */}
        <div className="min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex flex-col gap-2">
              <h4 className={`text-[13px] md:text-sm font-bold ${theme.title} leading-6`}>
                {item.name}
              </h4>

              <span
                className={`w-fit inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold border ${theme.caloriePill}`}
              >
                <Flame className="w-3 h-3" />
                {item.calories}
              </span>
            </div>

            <div className="mt-2 space-y-1 text-[11px] md:text-xs leading-6">
              <p className={theme.text}>
                <span className={`font-semibold ${theme.textStrong}`}>برای تقویت:</span>{" "}
                {item.target}
              </p>
              <p className={theme.text}>
                <span className={`font-semibold ${theme.textStrong}`}>روش انجام:</span>{" "}
                {item.how}
              </p>
              <p className={theme.text}>
                <span className={`font-semibold ${theme.textStrong}`}>مناسب برای:</span>{" "}
                {item.goodFor}
              </p>
            </div>
          </div>
        </div>

        {/* جای عکس سمت چپ */}
        {/* عکس سمت چپ */}
<button
  type="button"
  onClick={() => item.image && onImageClick(item)}
  className="min-w-0 aspect-square rounded-2xl border border-slate-100 bg-slate-50 overflow-hidden flex items-center justify-center cursor-pointer group"
>
  {item.image ? (
    <img
      src={item.image}
      alt={item.name}
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      loading="lazy"
    />
  ) : (
    <ImageIcon className="w-8 h-8 text-slate-300" />
  )}
</button>
      </div>
    </motion.div>
  );
}

function ImagePlaceholder({ text, position, theme, image, title }) {
  if (image) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
        className="h-full min-h-[260px] overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-sm"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>
    );
  }

  return (
    <div
      className={`rounded-[28px] border-2 border-dashed min-h-[240px] p-6 flex flex-col items-center justify-center text-center ${theme.placeholder}`}
    >
      <ImageIcon className={`w-11 h-11 mb-3 ${theme.placeholderIcon}`} />
      <p className={`text-sm font-bold ${theme.textStrong} mb-2`}>
        جای تصویر ({position})
      </p>
      <p className={`text-sm leading-7 ${theme.text} max-w-md`}>{text}</p>
    </div>
  );
}

function SectionCard({ section, onImageClick }) {
  const theme = getTheme(section.id);

  const imageBlock = (
    <div className="lg:col-span-4">
      <ImagePlaceholder
  text={section.imagePlaceholder}
  position={section.imagePosition}
  theme={theme}
  image={section.image}
  title={section.title}
/>
    </div>
  );

  const contentBlock = (
    <div className="lg:col-span-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4 }}
        className={`rounded-[32px] p-6 md:p-8 shadow-sm border ${theme.card}`}
      >
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold border ${theme.badge}`}
          >
            {section.icon}
            بخش {section.id}
          </span>
        </div>

        <h2 className={`text-2xl md:text-3xl font-extrabold leading-[1.8] ${theme.title}`}>
          {section.title}
        </h2>
        <p className={`mt-3 leading-8 text-sm md:text-base ${theme.subtitle}`}>
          {section.subtitle}
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`rounded-2xl border p-4 ${theme.softBox}`}>
            <p className={`text-sm font-bold mb-2 ${theme.textStrong}`}>
              این بخش برای چه کسانی خوب است؟
            </p>
            <p className={`text-sm leading-7 ${theme.text}`}>{section.suitableFor}</p>
          </div>

          <div className={`rounded-2xl border p-4 ${theme.softBox}`}>
            <p className={`text-sm font-bold mb-2 ${theme.textStrong}`}>
              اثر اصلی این بخش
            </p>
            <p className={`text-sm leading-7 ${theme.text}`}>{section.benefits}</p>
          </div>
        </div>

        {section.note && (
          <div className={`mt-5 rounded-2xl border p-4 ${theme.note}`}>
            <p className={`text-sm font-bold mb-1 ${theme.textStrong}`}>نکته مهم</p>
            <p className={`text-sm leading-7 ${theme.text}`}>{section.note}</p>
          </div>
        )}

        <div className="mt-6">
          <h3 className={`text-lg md:text-xl font-bold mb-4 ${theme.title}`}>
            ۲۰ تمرین این بخش
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.exercises.map((item, index) => (
              <ExerciseCard
               key={`${section.id}-${item.name}-${index}`}
               item={item}
               index={index}
               theme={theme}
               onImageClick={onImageClick}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );

  if (section.imagePosition === "bottom") {
    return (
      <div className="space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">{contentBlock}</div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-12">{imageBlock}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {section.imagePosition === "right" ? (
        <>
          {contentBlock}
          {imageBlock}
        </>
      ) : (
        <>
          {imageBlock}
          {contentBlock}
        </>
      )}
    </div>
  );
}

function ImageModal({ selectedImage, onClose }) {
  if (!selectedImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.2 }}
        className="relative max-w-4xl w-full rounded-[32px] bg-white p-3 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 shadow-md flex items-center justify-center text-xl font-bold"
        >
          ×
        </button>

        <img
          src={selectedImage.image}
          alt={selectedImage.name}
          className="w-full max-h-[75vh] object-contain rounded-[24px] bg-slate-50"
        />

        <p className="mt-3 text-center text-sm font-bold text-slate-700">
          {selectedImage.name}
        </p>
      </motion.div>
    </div>
  );
}

export default function FitnessForSingleWorldArticle() {
  const [selectedImage, setSelectedImage] = useState(null);
  const heroStats = [
    {
      label: "۱۰ بخش کامل",
      cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      label: "۲۰۰ تمرین کاربردی",
      cls: "bg-sky-50 text-sky-700 border-sky-200",
    },
    {
      label: "خانه + طبیعت + باشگاه",
      cls: "bg-violet-50 text-violet-700 border-violet-200",
    },
    {
      label: "ویژه دخترها و پسرها",
      cls: "bg-rose-50 text-rose-700 border-rose-200",
    },
    {
      label: "تمرین‌های ضد آسیب",
      cls: "bg-amber-50 text-amber-700 border-amber-200",
    },
  ];

  return (
    <main
  dir="rtl"
  className="min-h-screen text-slate-800 relative overflow-hidden bg-[#243b34]"
  style={{
    backgroundImage: `
      radial-gradient(circle at 20% 10%, rgba(214, 184, 120, 0.18), transparent 28%),
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.08), transparent 26%),
      radial-gradient(circle at 50% 90%, rgba(12, 35, 29, 0.55), transparent 38%),
      linear-gradient(135deg, #1f342e 0%, #2f4b43 45%, #183029 100%)
    `,
  }}
>
  <div className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay"
  style={{
    backgroundImage: `
      repeating-linear-gradient(
        45deg,
        rgba(255,255,255,0.03) 0px,
        rgba(255,255,255,0.03) 2px,
        transparent 2px,
        transparent 6px
      )
    `,
  }}
/>
      {/* Hero */}
<section className="max-w-7xl mx-auto px-6 pt-14 pb-10">
  <motion.div
    initial={{ opacity: 0, y: -18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55 }}
    className="relative overflow-hidden rounded-[42px] border border-white/80 bg-gradient-to-br from-white via-emerald-50 to-sky-50 p-8 md:p-12 shadow-[0_20px_70px_rgba(15,23,42,0.10)]"
  >
    {/* دایره‌های تزئینی پس‌زمینه */}
    <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-200/35 blur-3xl" />
    <div className="absolute -bottom-28 -left-24 w-80 h-80 rounded-full bg-sky-200/40 blur-3xl" />
    <div className="absolute top-1/3 left-1/3 w-44 h-44 rounded-full bg-amber-100/60 blur-3xl" />

    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* متن اصلی */}
      <div className="lg:col-span-8">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-emerald-200 text-emerald-700 text-sm font-bold shadow-sm">
            <Dumbbell className="w-4 h-4" />
            تناسب اندام برای دنیای مجردها و همه دوستداران ورزش
          </span>

          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50/90 border border-amber-200 text-amber-700 text-sm font-bold shadow-sm">
            <Sparkles className="w-4 h-4" />
            ۲۰۰ تمرین کاربردی
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.9] md:leading-[1.75]">
          ۱۰ برنامه ورزشی کاربردی
          <span className="block mt-1 bg-gradient-to-r from-emerald-700 via-teal-600 to-sky-700 bg-clip-text text-transparent">
            برای خانه، طبیعت، باشگاه و سلامت بلندمدت بدن
          </span>
        </h1>

        <p className="mt-5 max-w-3xl text-sm md:text-base leading-8 text-slate-600">
          یک راهنمای کامل، ساده و قابل اجرا برای شروع ورزش، افزایش انرژی،
          کاهش آسیب، مراقبت از بدن در روزهای حساس و ساختن سبک زندگی سالم‌تر.
        </p>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-3">
          {heroStats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className={`rounded-2xl border px-3 py-4 text-center text-xs md:text-sm font-bold shadow-sm bg-white/70 backdrop-blur ${item.cls}`}
            >
              {item.label}
            </motion.div>
          ))}
        </div>
      </div>

      {/* باکس تصویری/آیکونی سمت چپ */}
      <div className="lg:col-span-4">
        <div className="relative rounded-[34px] border border-white/90 bg-white/70 backdrop-blur-md p-6 shadow-[0_16px_45px_rgba(15,23,42,0.08)]">
          <div className="absolute -top-4 -right-4 w-14 h-14 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center rotate-6">
            <HeartPulse className="w-7 h-7 text-emerald-600" />
          </div>

          <div className="h-56 rounded-[28px] bg-gradient-to-br from-emerald-100 via-white to-sky-100 border border-white flex flex-col items-center justify-center text-center px-5">
            <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
              <Dumbbell className="w-10 h-10 text-emerald-600" />
            </div>

            <p className="text-lg font-black text-slate-900">
              حرکت، آرامش، قدرت
            </p>

            <p className="mt-2 text-xs leading-6 text-slate-500">
              تمرین‌هایی برای بدن سالم‌تر، ذهن آرام‌تر و انرژی بیشتر
            </p>
          </div>

          <div className="mt-4 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 border border-amber-100 p-4">
            <p className="text-sm font-bold text-amber-800 mb-1">
              نکته درباره کالری‌سوزی
            </p>
            <p className="text-xs leading-6 text-slate-600">{calorieNote}</p>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
</section>

      {/* Sections */}
      <section className="max-w-7xl mx-auto px-6 pb-16 space-y-10">
        {sections.map((section) => (
          <SectionCard
  key={section.id}
  section={section}
  onImageClick={setSelectedImage}
/>
        ))}
      </section>

      {/* Footer */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-white via-emerald-50/50 to-sky-50/60 p-8 text-center shadow-sm"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            بدن تو فقط برای دیده شدن نیست...
          </h3>
          <p className="text-slate-600 leading-8 max-w-3xl mx-auto">
            بدن تو خانه‌ی زندگی توست. با حرکت، کشش، قدرت، استقامت و احترام به
            روزهای حساس بدن، می‌توانی هم ظاهر بهتری داشته باشی و هم آرامش، انرژی،
            سلامت و کیفیت زندگی بالاتری تجربه کنی.
          </p>
        </motion.div>
      </section>
      <ImageModal
  selectedImage={selectedImage}
  onClose={() => setSelectedImage(null)}
/>
    </main>
  );
}