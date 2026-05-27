import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@components/Dashboard/DashboardLayout";
import {
  Brain,
  Moon,
  HeartHandshake,
  Droplets,
  Users,
  ShieldAlert,
  X,
} from "lucide-react";

const awarenessItems = [
  {
    title: "خواب کم تصمیم‌گیری را ضعیف می‌کند",
    desc: "کمبود خواب فقط خستگی نیست؛ روی مغز و رفتار اثر دارد.",
    icon: Moon,
    content:
      "وقتی خواب کافی نداریم، مغز سخت‌تر تمرکز می‌کند و احتمال تصمیم‌های احساسی یا عجولانه بیشتر می‌شود. حتی صبر و کنترل احساسات هم کاهش پیدا می‌کند.",
  },
  {
    title: "کودک بیشتر از رفتار یاد می‌گیرد تا حرف",
    desc: "رفتار والدین اثر عمیق‌تری از نصیحت‌ها دارد.",
    icon: Brain,
    content:
      "کودکان دائماً در حال مشاهده هستند. اگر آرامش، احترام و صداقت را در رفتار ببینند، بیشتر از هر آموزشی آن را یاد می‌گیرند.",
  },
  {
    title: "کم‌آبی روی خلق‌وخو اثر می‌گذارد",
    desc: "بدن و ذهن بیشتر از چیزی که فکر می‌کنیم به آب وابسته‌اند.",
    icon: Droplets,
    content:
      "حتی کم‌آبی خفیف می‌تواند باعث خستگی، بی‌حوصلگی، سردرد و کاهش تمرکز شود. نوشیدن آب کافی روی آرامش ذهن و انرژی روزانه اثر زیادی دارد.",
  },
  {
    title: "همه روابط سالم نیستند",
    desc: "بعضی ارتباط‌ها آرامش ذهن را فرسوده می‌کنند.",
    icon: HeartHandshake,
    content:
      "اگر رابطه‌ای دائماً باعث اضطراب، احساس بی‌ارزشی یا خستگی ذهنی می‌شود، شاید لازم باشد مرزهای سالم‌تری ایجاد شود.",
  },
  {
    title: "استرس طولانی‌مدت فقط ذهن را خسته نمی‌کند",
    desc: "بدن هم تحت تأثیر استرس مزمن قرار می‌گیرد.",
    icon: ShieldAlert,
    content:
      "استرس طولانی می‌تواند روی خواب، تمرکز، سیستم ایمنی، قلب و حتی روابط خانوادگی اثر منفی بگذارد. آرام‌سازی ذهن فقط یک حس خوب نیست؛ بخشی از سلامت واقعی است.",
  },
  {
    title: "شنیده شدن یک نیاز انسانی است",
    desc: "بیشتر آدم‌ها قبل از راه‌حل، نیاز به شنیده شدن دارند.",
    icon: Users,
    content:
      "گاهی بهترین کاری که می‌توانیم برای کسی انجام دهیم این است که بدون قضاوت به حرف‌هایش گوش بدهیم. شنیده شدن احساس امنیت و آرامش ایجاد می‌کند.",
  },
];

export default function AwarenessCenter() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <DashboardLayout title="آگاهی‌های ژنینویی">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 border border-yellow-200 shadow-inner mb-4">
            <Brain className="text-yellow-600" size={30} />
          </div>

          <h2 className="text-2xl font-bold text-yellow-700 mb-3">
            آگاهی‌های ژنینویی
          </h2>

          <p className="text-gray-600 text-sm leading-7 max-w-2xl mx-auto">
            نکته‌ها و آگاهی‌های کوتاه اما مهمی که می‌توانند نگاه ما به زندگی،
            خانواده، ذهن و روابط را عمیق‌تر و آگاهانه‌تر کنند.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {awarenessItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.button
                key={item.title}
                type="button"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setSelectedItem(item)}
                className="text-right rounded-2xl p-5 bg-gradient-to-b from-yellow-50 to-white border border-yellow-200 shadow-sm hover:shadow-[0_0_22px_rgba(255,220,100,0.35)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full bg-yellow-100 border border-yellow-200 flex items-center justify-center shrink-0">
                    <Icon className="text-yellow-600" size={22} />
                  </div>

                  <h3 className="font-bold text-yellow-700 text-base">
                    {item.title}
                  </h3>
                </div>

                <p className="text-gray-600 text-sm leading-7 mb-4">
                  {item.desc}
                </p>

                <span className="text-xs font-semibold text-yellow-700">
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
          ✨ آگاهی‌های کوچک، گاهی مسیر زندگی را تغییر می‌دهند.
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
              className="w-full max-w-xl rounded-3xl bg-white border border-yellow-200 shadow-2xl p-6 text-right"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-xl font-bold text-yellow-700 leading-8">
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
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold py-3 shadow-md hover:shadow-lg transition"
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