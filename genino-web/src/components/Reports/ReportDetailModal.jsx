// 📄 src/components/Reports/ReportDetailModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Ear,
  Volume2,
  Headphones,
  Eye,
  Shapes,
  ArrowUp,
  Palette,
  HeartPulse,
  Activity,
  Scale,
  Smile, // ✅ جایگزین Tooth
} from "lucide-react";

/* 🧩 تنظیمات تمام چک‌ها (افزودنی و قابل گسترش) */
const CHECK_CONFIG = {
  hearing: {
    color: "sky",
    icon: "🎧",
    title: "گزارش شنوایی ژنینو",
    summaryKey: "total",
    summaryMax: 30,
    fields: [
      { icon: <Ear className="w-5 h-5" />, title: "ساختار گوش", key: "ear", max: 15, thresholds: [12, 9], labels: ["طبیعی ✅", "نسبتاً طبیعی ⚠️", "نیاز به بررسی 🚨"] },
      { icon: <Volume2 className="w-5 h-5" />, title: "واکنش به صدا", key: "sound", max: 9, thresholds: [7, 5], labels: ["طبیعی ✅", "نسبتاً طبیعی ⚠️", "نیاز به بررسی 🚨"] },
      { icon: <Headphones className="w-5 h-5" />, title: "عادات محیطی", key: "env", max: 6, thresholds: [5, 4], labels: ["ایمن ✅", "قابل بهبود ⚠️", "در معرض خطر 🚨"] },
    ],
    summaryText: (data) =>
      `مجموع امتیاز ${data.total}/30 است که نشانگر وضعیت ${data.level} می‌باشد.`,
  },

  vision: {
    color: "amber",
    icon: "👁️",
    title: "گزارش بینایی ژنینو",
    summaryKey: "score",
    summaryMax: 100,
    fields: [
      { icon: <Palette className="w-5 h-5" />, title: "تشخیص رنگ‌ها", key: "colors", max: 3, thresholds: [3, 2], labels: ["طبیعی ✅", "قابل بهبود ⚠️", "نیاز به بررسی 🚨"] },
      { icon: <Shapes className="w-5 h-5" />, title: "تشخیص اشکال", key: "shapes", max: 3, thresholds: [3, 2], labels: ["طبیعی ✅", "قابل بهبود ⚠️", "نیاز به بررسی 🚨"] },
      { icon: <ArrowUp className="w-5 h-5" />, title: "تشخیص جهت‌ها", key: "direction.score5", max: 5, thresholds: [4, 2], labels: ["طبیعی ✅", "قابل بهبود ⚠️", "نیاز به بررسی 🚨"] },
    ],
    summaryText: (data) =>
      `امتیاز کل بینایی ${data.score}/100 است که وضعیت ${data.level} را نشان می‌دهد.`,
  },

  dental: {
  color: "rose",
  icon: "🦷",
  title: "گزارش سلامت دهان و دندان ژنینو",
  summaryKey: "total",
  summaryMax: 100,
  fields: [
    {
      icon: <Smile className="w-5 h-5" />,
      title: "رشد و رویش دندان‌ها",
      key: "growth",
      max: 3,
      thresholds: [3, 2],
      labels: ["طبیعی ✅", "قابل‌قبول ⚠️", "نیازمند بررسی 🚨"],
    },
    {
      icon: <HeartPulse className="w-5 h-5" />,
      title: "سلامت ظاهری دندان‌ها",
      key: "condition",
      max: 3,
      thresholds: [3, 2],
      labels: ["سالم ✅", "قابل‌قبول ⚠️", "نیازمند توجه 🚨"],
    },
    {
      icon: <Activity className="w-5 h-5" />,
      title: "عادات بهداشتی دهان",
      key: "hygiene",
      max: 12,
      thresholds: [10, 7],
      labels: ["عالی ✅", "قابل‌قبول ⚠️", "نیازمند بهبود 🚨"],
    },
  ],
  summaryText: (data) =>
    `مجموع امتیاز ${data.total}/100 است که وضعیت ${
      data.level
    } را نشان می‌دهد.`,
},


  // مثال برای بعداً:
  movement: {
    color: "green",
    icon: "🏃‍♂️",
    title: "گزارش تحرک و تعادل ژنینو",
    summaryKey: "score",
    summaryMax: 100,
    fields: [
      { icon: <Activity className="w-5 h-5" />, title: "تعادل بدن", key: "balance", max: 10, thresholds: [8, 5], labels: ["خوب ✅", "متوسط ⚠️", "ضعیف 🚨"] },
      { icon: <Scale className="w-5 h-5" />, title: "قدرت عضلانی", key: "strength", max: 10, thresholds: [8, 5], labels: ["خوب ✅", "متوسط ⚠️", "ضعیف 🚨"] },
    ],
    summaryText: (data) =>
      `مجموع امتیاز تحرک ${data.score}/100 است و وضعیت ${data.level} را نشان می‌دهد.`,
  },
};

export default function ReportDetailModal({ report, onClose }) {
  if (!report) return null;

  const { type, data, label, date } = report;
  const config = CHECK_CONFIG[type] || CHECK_CONFIG.vision; // پیش‌فرض بینایی برای تست
  const theme = config.color;
  const formattedDate = new Date(date).toLocaleDateString("fa-IR");

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          key="modal"
          initial={{ scale: 0.9, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className={`relative bg-gradient-to-br from-white to-${theme}-50 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-${theme}-100`}
        >
          {/* ✖️ دکمه بستن */}
          <button
            onClick={onClose}
            className={`absolute top-4 left-4 text-gray-500 hover:text-${theme}-600 transition`}
          >
            <X className="w-6 h-6" />
          </button>

          <div className="p-8 text-right">
            {/* 🧠 تیتر */}
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-extrabold text-${theme}-700`}>
                {config.icon} {config.title}
              </h2>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </div>
            </div>

            {/* 📊 توضیح خلاصه */}
            <p className="text-gray-700 leading-relaxed mb-6 text-sm sm:text-base">
              وضعیت کلی کودک در سطح{" "}
              <strong className={`text-${theme}-700`}>{data.level}</strong>{" "}
              ارزیابی شده است.
            </p>

            {/* 📋 کارت‌های امتیاز */}
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {config.fields.map((f, i) => (
                <ScoreBox
                  key={i}
                  color={theme}
                  icon={f.icon}
                  title={f.title}
                  value={resolvePath(data, f.key)}
                  max={f.max}
                  thresholds={f.thresholds}
                  labels={f.labels}
                />
              ))}
            </div>

            {/* 🔍 تفسیر نهایی */}
            <div className={`bg-white border border-${theme}-100 rounded-2xl shadow-sm p-5 mb-6`}>
              <h4 className={`text-${theme}-700 font-bold mb-2`}>🔍 تفسیر نهایی:</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                {config.summaryText(data)}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* 🔢 تابع باکس امتیاز */
function ScoreBox({ color, icon, title, value = 0, max, thresholds, labels }) {
  let labelText = labels[2];
  if (value >= thresholds[0]) labelText = labels[0];
  else if (value >= thresholds[1]) labelText = labels[1];

  return (
    <div className={`bg-white border border-${color}-100 rounded-2xl shadow-sm p-4`}>
      <div className={`flex items-center gap-2 mb-2 text-${color}-700 font-bold`}>
        {icon} {title}
      </div>
      <p className="text-gray-700 text-sm">
        امتیاز: {value}/{max} <br />
        {labelText}
      </p>
    </div>
  );
}

/* 🧠 تابع کمکی برای خواندن کلیدهای تو در تو مثل direction.score5 */
function resolvePath(obj, path) {
  try {
    return path.split(".").reduce((acc, key) => acc?.[key], obj) ?? 0;
  } catch {
    return 0;
  }
}
