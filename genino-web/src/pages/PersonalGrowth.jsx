import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@components/Dashboard/DashboardLayout";
import {
  Sparkles,
  Target,
  Brain,
  Flame,
  ShieldCheck,
  Compass,
  X,
} from "lucide-react";

const growthItems = [
  {
    title: "نسخه بهتر من یعنی چی؟",
    desc: "رشد شخصی یعنی هر روز کمی آگاه‌تر و قوی‌تر شدن.",
    icon: Sparkles,
    content:
      "نسخه بهتر من یعنی قرار نیست کامل باشم؛ فقط قرار است قدم‌به‌قدم بهتر شوم. رشد شخصی یعنی شناخت بهتر خود، ساختن عادت‌های سالم، مدیریت احساسات و حرکت به سمت آینده‌ای که بیشتر دوستش دارم.",
  },
  {
    title: "هدف‌های کوچک، تغییرهای بزرگ",
    desc: "هدف‌های بزرگ با قدم‌های کوچک ساخته می‌شوند.",
    icon: Target,
    content:
      "اگر هدف خیلی بزرگ باشد، ممکن است ذهن ما بترسد و عقب بکشد. اما وقتی هدف را به قدم‌های کوچک روزانه تقسیم می‌کنیم، حرکت آسان‌تر می‌شود و اعتمادبه‌نفس بیشتر شکل می‌گیرد.",
  },
  {
    title: "شناخت استعدادهای من",
    desc: "هر آدمی ترکیبی خاص از توانایی‌ها و علاقه‌ها دارد.",
    icon: Brain,
    content:
      "برای شناخت استعدادها، لازم نیست منتظر یک کشف عجیب باشیم. کافی است ببینیم چه کارهایی به ما انرژی می‌دهد، در چه چیزهایی بهتر یاد می‌گیریم و دیگران معمولاً در چه زمینه‌ای از ما کمک می‌خواهند.",
  },
  {
    title: "عادت‌های کوچک روزانه",
    desc: "موفقیت بیشتر از انگیزه، به عادت وابسته است.",
    icon: Flame,
    content:
      "انگیزه همیشه ثابت نمی‌ماند، اما عادت‌ها می‌توانند ما را جلو ببرند. حتی روزی ده دقیقه مطالعه، پیاده‌روی یا یادگیری یک مهارت، اگر ادامه‌دار باشد، اثر بزرگی می‌گذارد.",
  },
  {
    title: "اعتمادبه‌نفس واقعی",
    desc: "اعتمادبه‌نفس یعنی باور به توانایی رشد، نه بی‌نقص بودن.",
    icon: ShieldCheck,
    content:
      "اعتمادبه‌نفس واقعی از انجام دادن، تجربه کردن و ادامه دادن ساخته می‌شود. لازم نیست همیشه عالی باشیم؛ کافی است بدانیم می‌توانیم یاد بگیریم، اصلاح کنیم و دوباره تلاش کنیم.",
  },
  {
    title: "مسیر من، نه مسیر دیگران",
    desc: "زندگی بهتر وقتی شروع می‌شود که کمتر خودمان را مقایسه کنیم.",
    icon: Compass,
    content:
      "مقایسه مداوم با دیگران انرژی ما را کم می‌کند. هر کسی زمان، شرایط و مسیر خودش را دارد. رشد واقعی یعنی مسیر خودمان را پیدا کنیم و با آرامش در آن حرکت کنیم.",
  },
];

export default function PersonalGrowth() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <DashboardLayout title="نسخه بهتر من">
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
            مسیر رشد شخصی من
          </h2>

          <p className="text-gray-600 text-sm leading-7 max-w-2xl mx-auto">
            چند نوشته کوتاه و کاربردی برای شناخت بهتر خودت، ساختن عادت‌های خوب،
            افزایش اعتمادبه‌نفس و حرکت به‌سمت آینده‌ای که دوست داری.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {growthItems.map((item, index) => {
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
          💙 آینده‌ای که دوست داری، با قدم‌های کوچک امروز ساخته می‌شود.
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

              <p className="text-gray-700 text-sm leading-8">
                {selectedItem.content}
              </p>

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