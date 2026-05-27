import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@components/Dashboard/DashboardLayout";
import {
  Sparkles,
  Cloud,
  Compass,
  Brain,
  Heart,
  Waves,
  Leaf,
  Mountain,
  X,
} from "lucide-react";

const letGoItems = [
  {
    title: "همه‌چیز قرار نیست دست من باشد",
    desc: "آرامش از جایی شروع می‌شود که کنترل افراطی کمتر شود.",
    icon: Cloud,
    content:
      "در زندگی مجردی، خیلی وقت‌ها آدم فکر می‌کند باید همه‌چیز را خودش کنترل کند؛ آینده، شغل، پول، رابطه، موفقیت و حتی نظر دیگران.\n\nاما واقعیت این است که بخشی از زندگی همیشه خارج از کنترل ماست.\n\nپذیرش این موضوع یعنی من تلاش خودم را می‌کنم، اما قرار نیست هر اتفاقی را با فشار ذهنی مدیریت کنم.",
  },
  {
    title: "توکل یعنی دست کشیدن از تلاش نیست",
    desc: "توکل سالم، بعد از تلاش معنا پیدا می‌کند.",
    icon: Compass,
    content:
      "توکل یعنی من مسئول قدم‌های خودم هستم، اما نتیجه همه چیز را به زور نمی‌کشم.\n\nآدم می‌تواند تلاش کند، یاد بگیرد، برنامه‌ریزی کند و در مسیر رشد باشد؛ اما همزمان بپذیرد که بعضی چیزها زمان، مسیر و حکمت خودش را دارند.\n\nتوکل، انفعال نیست؛ آرام‌تر ادامه دادن است.",
  },
  {
    title: "مقایسه، آرامش را می‌دزدد",
    desc: "مسیر تو قرار نیست شبیه مسیر بقیه باشد.",
    icon: Mountain,
    content:
      "در دوران مجردی، مقایسه خیلی راحت اتفاق می‌افتد؛ یکی ازدواج کرده، یکی مهاجرت کرده، یکی پول بیشتری دارد، یکی زودتر موفق شده.\n\nاما هر آدمی زمان، شرایط، ترس‌ها، فرصت‌ها و مسیر خودش را دارد.\n\nرها کردن مقایسه یعنی به جای جنگیدن با مسیر دیگران، انرژی‌ات را برگردانی به مسیر خودت.",
  },
  {
    title: "آرامش در ندانستن",
    desc: "لازم نیست همه جواب‌ها همین امروز روشن باشند.",
    icon: Brain,
    content:
      "ذهن دوست دارد همه چیز را بداند؛ آینده چه می‌شود؟ آیا موفق می‌شوم؟ آیا تنها می‌مانم؟ آیا انتخابم درست است؟\n\nاما بخشی از زندگی در ابهام جلو می‌رود.\n\nگاهی رشد واقعی یعنی بتوانی بدون داشتن همه جواب‌ها، باز هم قدم بعدی را برداری.",
  },
  {
    title: "رها کردن آدم‌هایی که نمی‌مانند",
    desc: "همه قرار نیست تا آخر مسیر همراه ما باشند.",
    icon: Heart,
    content:
      "بعضی آدم‌ها وارد زندگی می‌شوند، چیزی یادمان می‌دهند و بعد می‌روند.\n\nچسبیدن به آدم‌هایی که دیگر همراه مسیر ما نیستند، گاهی فقط درد را طولانی‌تر می‌کند.\n\nرها کردن یعنی ارزش خودت را به ماندن یا رفتن دیگران گره نزنی.",
  },
  {
    title: "ذهن خسته از سناریوسازی",
    desc: "گاهی فکر زیاد، حل مسئله نیست؛ فرسودگی است.",
    icon: Waves,
    content:
      "وقتی ذهن مدام آینده را شبیه‌سازی می‌کند، بدن هم خسته می‌شود.\n\nاگر این شد چه؟ اگر نشد چه؟ اگر دیر شود چه؟ اگر شکست بخورم چه؟\n\nگاهی لازم است به خودت بگویی: الان فقط یک قدم واقعی از دست من برمی‌آید. همان را انجام می‌دهم.",
  },
  {
    title: "پذیرش شکست‌های کوچک",
    desc: "شکست همیشه پایان نیست؛ گاهی اصلاح مسیر است.",
    icon: Leaf,
    content:
      "در مسیر رشد، شکست‌های کوچک طبیعی‌اند؛ یک تصمیم اشتباه، یک رابطه ناموفق، یک کار نیمه‌تمام یا یک فرصت از دست‌رفته.\n\nپذیرش یعنی از شکست هویت نسازی.\n\nتو شکست نخوردی؛ فقط در یک مرحله چیزی را تجربه کردی که می‌تواند مسیر بعدی را آگاهانه‌تر کند.",
  },
  {
    title: "رها، اما رو به جلو",
    desc: "آرامش یعنی ایستادن نیست؛ ادامه دادن سبک‌تر است.",
    icon: Sparkles,
    content:
      "رها کردن به معنی بی‌خیال شدن زندگی نیست.\n\nیعنی بار اضافه کنترل، ترس، مقایسه و وسواس ذهنی را زمین بگذاری تا سبک‌تر حرکت کنی.\n\nتو می‌توانی هم اهل تلاش باشی، هم اهل توکل؛ هم هدف داشته باشی، هم آرام‌تر نفس بکشی.",
  },
];

export default function LetGoAndGrow() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <DashboardLayout title="رها و رو به جلو">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 border border-blue-200 shadow-inner mb-4">
            <Sparkles className="text-sky-600" size={30} />
          </div>

          <h2 className="text-2xl font-bold text-sky-700 mb-3">
            رها و رو به جلو
          </h2>

          <p className="text-gray-600 text-sm leading-7 max-w-2xl mx-auto">
            یاد گرفتن پذیرش، توکل و سبک‌تر ادامه دادن؛ برای روزهایی که ذهن
            می‌خواهد همه چیز را کنترل کند.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {letGoItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.button
                key={item.title}
                type="button"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setSelectedItem(item)}
                className="text-right rounded-2xl p-5 bg-gradient-to-b from-blue-50 to-white border border-blue-200 shadow-sm hover:shadow-[0_0_22px_rgba(125,200,255,0.35)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0">
                    <Icon className="text-sky-600" size={22} />
                  </div>

                  <h3 className="font-bold text-sky-700 text-base">
                    {item.title}
                  </h3>
                </div>

                <p className="text-gray-600 text-sm leading-7 mb-4">
                  {item.desc}
                </p>

                <span className="text-xs font-semibold text-sky-700">
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
          🌌 گاهی سبک‌تر شدن، یعنی همه چیز را به زور نگه نداریم.
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
              className="w-full max-w-xl rounded-3xl bg-white border border-blue-200 shadow-2xl p-6 text-right"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-xl font-bold text-sky-700 leading-8">
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
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-sky-400 to-blue-500 text-white font-bold py-3 shadow-md hover:shadow-lg transition"
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