import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@components/Dashboard/DashboardLayout";
import {
  Sparkles,
  Heart,
  Brain,
  Cloud,
  Baby,
  HandHeart,
  Home,
  Leaf,
  X,
} from "lucide-react";

const trustItems = [
  {
    title: "همه‌چیز قابل کنترل نیست",
    desc: "بارداری مسیری انسانی و واقعی است، نه کاملاً قابل پیش‌بینی.",
    icon: Cloud,
    content:
      "در دوران بارداری، پدر و مادر ممکن است مدام نگران آینده باشند؛ سلامت کودک، زایمان، هزینه‌ها، مسئولیت‌ها و اتفاقات پیش‌رو.\n\nاما واقعیت این است که زندگی همیشه دقیقاً مطابق برنامه جلو نمی‌رود.\n\nاعتماد به مسیر زندگی یعنی در کنار مراقبت و مسئولیت‌پذیری، بپذیریم که همه چیز تحت کنترل کامل ما نیست.",
  },
  {
    title: "توکل یعنی کنار گذاشتن تلاش نیست",
    desc: "آرامش بعد از انجام مسئولیت‌ها معنا پیدا می‌کند.",
    icon: HandHeart,
    content:
      "پدر و مادر می‌توانند آگاه باشند، مراقبت کنند، سؤال بپرسند، یاد بگیرند و بهترین تلاششان را انجام دهند.\n\nاما بعد از آن، بخشی از مسیر نیاز به آرامش و اعتماد دارد.\n\nتوکل یعنی بعد از انجام وظیفه، ذهن را کمتر وارد جنگ دائمی با آینده کنیم.",
  },
  {
    title: "اضطراب والدین طبیعی است",
    desc: "نگرانی همیشه نشانه ضعف نیست.",
    icon: Brain,
    content:
      "خیلی از والدین در دوران بارداری ترس‌هایی دارند؛ ترس از آینده، پدر یا مادر خوبی نبودن، مسئولیت‌های جدید یا اتفاقات پیش‌بینی‌نشده.\n\nاین نگرانی‌ها طبیعی‌اند.\n\nمهم این است که اضطراب، تمام فضای خانه و رابطه را نگیرد و والدین بتوانند درباره احساساتشان حرف بزنند.",
  },
  {
    title: "خانه آرام، ذهن آرام‌تر",
    desc: "فضای خانه روی حال پدر، مادر و کودک اثر دارد.",
    icon: Home,
    content:
      "وقتی خانه پر از تنش، دعوا یا نگرانی دائمی باشد، ذهن هم آرامش کمتری دارد.\n\nدر دوران بارداری، آرام‌تر کردن فضای خانه، مهربانی بیشتر و کمتر کردن فشارهای غیرضروری می‌تواند برای همه اعضای خانواده مفید باشد.\n\nآرامش خانه، بخشی از آماده شدن برای ورود کودک است.",
  },
  {
    title: "کامل نبودن طبیعی است",
    desc: "هیچ پدر و مادری همه چیز را کامل بلد نیست.",
    icon: Heart,
    content:
      "خیلی از والدین فکر می‌کنند باید همه چیز را از قبل بدانند یا هیچ اشتباهی نکنند.\n\nاما پدر و مادر شدن مسیری یادگرفتنی است.\n\nقرار نیست کامل باشید؛ قرار است همراه، مسئولیت‌پذیر و در حال رشد باشید.",
  },
  {
    title: "زندگی همیشه طبق برنامه جلو نمی‌رود",
    desc: "گاهی مسیرها تغییر می‌کنند و این بخشی از زندگی است.",
    icon: Leaf,
    content:
      "ممکن است بعضی برنامه‌ها تغییر کنند؛ زمان زایمان، شرایط کاری، احساسات یا حتی تصمیم‌هایی که قبلاً قطعی به نظر می‌رسیدند.\n\nانعطاف داشتن و پذیرفتن تغییرات، فشار ذهنی را کمتر می‌کند.\n\nزندگی واقعی همیشه کاملاً قابل پیش‌بینی نیست.",
  },
  {
    title: "اعتماد به رشد کودک",
    desc: "کودک هم مسیر طبیعی رشد خودش را دارد.",
    icon: Baby,
    content:
      "گاهی والدین آن‌قدر نگران آینده کودک می‌شوند که از لحظه حال فاصله می‌گیرند.\n\nدر حالی که رشد کودک یک روند تدریجی و طبیعی است.\n\nآرامش، مراقبت و حضور آگاهانه والدین می‌تواند فضای سالم‌تری برای این رشد بسازد.",
  },
  {
    title: "آرام‌تر ادامه دادن",
    desc: "اعتماد به مسیر یعنی سبک‌تر نفس کشیدن در دل مسئولیت‌ها.",
    icon: Sparkles,
    content:
      "پدر و مادر شدن مسئولیت بزرگی است، اما قرار نیست این مسیر فقط با ترس و فشار ذهنی همراه باشد.\n\nگاهی لازم است چند نفس عمیق بکشیم، کمی آرام‌تر شویم و یادمان بیاید که زندگی فقط کنترل کردن نیست.\n\nاعتماد به مسیر زندگی یعنی در کنار تلاش، اجازه بدهیم امید و آرامش هم در خانه حضور داشته باشند.",
  },
];

export default function PregnancyTrust() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <DashboardLayout title="اعتماد به مسیر زندگی">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 border border-green-200 shadow-inner mb-4">
            <Sparkles className="text-green-600" size={30} />
          </div>

          <h2 className="text-2xl font-bold text-green-700 mb-3">
            اعتماد به مسیر زندگی
          </h2>

          <p className="text-gray-600 text-sm leading-7 max-w-2xl mx-auto">
            آرام‌تر عبور کردن از نگرانی‌ها، پذیرش ندانستن‌ها و ساختن فضایی امن‌تر
            برای پدر، مادر و کودک آینده.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trustItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.button
                key={item.title}
                type="button"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setSelectedItem(item)}
                className="text-right rounded-2xl p-5 bg-gradient-to-b from-green-50 to-white border border-green-200 shadow-sm hover:shadow-[0_0_22px_rgba(110,231,183,0.35)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full bg-green-100 border border-green-200 flex items-center justify-center shrink-0">
                    <Icon className="text-green-600" size={22} />
                  </div>

                  <h3 className="font-bold text-green-700 text-base">
                    {item.title}
                  </h3>
                </div>

                <p className="text-gray-600 text-sm leading-7 mb-4">
                  {item.desc}
                </p>

                <span className="text-xs font-semibold text-green-700">
                  مطالعه کوتاه ←
                </span>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center text-gray-500 text-sm italic"
        >
          🌿 بعضی آرامش‌ها از جایی شروع می‌شوند که خانواده کمتر با آینده می‌جنگد.
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl rounded-3xl bg-white border border-green-200 shadow-2xl p-6 text-right"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-xl font-bold text-green-700 leading-8">
                  {selectedItem.title}
                </h3>

                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                >
                  <X size={18} className="text-gray-600" />
                </button>
              </div>

              <div className="text-gray-700 text-sm leading-9 whitespace-pre-line">
                {selectedItem.content}
              </div>

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold py-3 shadow-md hover:shadow-lg transition"
              >
                متوجه شدم
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}