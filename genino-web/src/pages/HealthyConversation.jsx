import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@components/Dashboard/DashboardLayout";
import {
  Users,
  Ear,
  HeartHandshake,
  MessageCircle,
  Smile,
  ShieldCheck,
  Brain,
  Sparkles,
  X,
} from "lucide-react";

const conversationItems = [
  {
    title: "شنیدن واقعی",
    desc: "فقط جواب نده؛ واقعاً گوش کن.",
    icon: Ear,
    content:
      "خیلی وقت‌ها آدم‌ها در رابطه فقط منتظرند نوبت حرف زدن خودشان برسد.\n\nاما شنیدن واقعی یعنی تلاش کنیم احساس، نگرانی و منظور طرف مقابل را بفهمیم؛ حتی اگر کاملاً موافقش نباشیم.\n\nبعضی آدم‌ها بیشتر از راه‌حل، فقط نیاز دارند حس کنند شنیده می‌شوند.",
  },

  {
    title: "بحث بدون تحقیر",
    desc: "اختلاف طبیعی است؛ تخریب نه.",
    icon: ShieldCheck,
    content:
      "زوج‌های سالم هم اختلاف دارند، اما سعی می‌کنند در عصبانیت به شخصیت هم حمله نکنند.\n\nتحقیر، طعنه، تهدید، مسخره کردن یا یادآوری اشتباهات قدیمی، امنیت رابطه را ضعیف می‌کند.\n\nگاهی آرام‌تر حرف زدن از برنده شدن مهم‌تر است.",
  },

  {
    title: "جمله‌هایی که رابطه را زخمی می‌کنند",
    desc: "بعضی جمله‌ها بیشتر از چیزی که فکر می‌کنیم اثر دارند.",
    icon: MessageCircle,
    content:
      "جمله‌هایی مثل «تو هیچ‌وقت...»، «تو همیشه...»، «اصلاً نمی‌فهمی» یا «بیخیال، فایده نداره» می‌توانند طرف مقابل را وارد حالت دفاعی کنند.\n\nوقتی آدم احساس حمله شدن کند، کمتر می‌تواند آرام گوش بدهد یا تغییر کند.",
  },

  {
    title: "گفت‌وگو در زمان مناسب",
    desc: "هر زمانی برای حل مسئله مناسب نیست.",
    icon: Brain,
    content:
      "بعضی بحث‌ها وقتی یکی خسته، عصبانی، گرسنه یا تحت فشار کاری است، فقط بدتر می‌شوند.\n\nگاهی چند دقیقه فاصله گرفتن، آرام شدن و بعد ادامه صحبت، نتیجه خیلی بهتری می‌دهد.",
  },

  {
    title: "همدلی در رابطه",
    desc: "دیدن دنیا از زاویه نگاه طرف مقابل.",
    icon: HeartHandshake,
    content:
      "همدلی یعنی حتی اگر تجربه مشابهی نداشته‌ای، تلاش کنی احساس طرف مقابل را درک کنی.\n\nجمله‌هایی مثل «می‌فهمم چرا ناراحت شدی» یا «حق داری این حس رو داشته باشی» می‌توانند تنش رابطه را خیلی کمتر کنند.",
  },

  {
    title: "قطع نکردن حرف طرف مقابل",
    desc: "گاهی سکوت، احترام است.",
    icon: Users,
    content:
      "پریدن وسط حرف، کامل نکردن جمله‌ها یا زود نتیجه گرفتن باعث می‌شود طرف مقابل احساس کند واقعاً شنیده نمی‌شود.\n\nبعضی آدم‌ها وقتی فرصت کامل حرف زدن پیدا می‌کنند، آرام‌تر و منطقی‌تر می‌شوند.",
  },

  {
    title: "قدرت لحن آرام",
    desc: "همان حرف، با لحن متفاوت اثر دیگری دارد.",
    icon: Smile,
    content:
      "خیلی وقت‌ها مشکل فقط کلمات نیست؛ لحن است.\n\nآدم‌ها معمولاً قبل از معنی جمله، احساس پشت آن را دریافت می‌کنند.\n\nیک لحن آرام و محترمانه می‌تواند حتی گفت‌وگوهای سخت را قابل‌تحمل‌تر کند.",
  },

  {
    title: "هدف گفت‌وگو چیست؟",
    desc: "حل مسئله یا برنده شدن؟",
    icon: Sparkles,
    content:
      "بعضی بحث‌ها فقط تبدیل به رقابت می‌شوند؛ اینکه چه کسی حق دارد یا چه کسی می‌برد.\n\nاما در رابطه سالم، دو نفر باید مقابل مشکل بایستند، نه مقابل همدیگر.\n\nگاهی مهم‌ترین سؤال این است: «الان می‌خواهیم همدیگر را بفهمیم یا فقط ثابت کنیم حق با ماست؟»",
  },
];

export default function HealthyConversation() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <DashboardLayout title="حرف زدن بدون دلخوری">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 border border-pink-200 shadow-inner mb-4">
            <Users className="text-pink-500" size={30} />
          </div>

          <h2 className="text-2xl font-bold text-pink-600 mb-3">
            حرف زدن بدون دلخوری
          </h2>

          <p className="text-gray-600 text-sm leading-7 max-w-2xl mx-auto">
            چند مهارت ساده اما مهم برای گفت‌وگوی آرام‌تر، فهمیدن بهتر و ساختن
            رابطه‌ای امن‌تر.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {conversationItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.button
                key={item.title}
                type="button"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setSelectedItem(item)}
                className="text-right rounded-2xl p-5 bg-gradient-to-b from-pink-50 to-white border border-pink-200 shadow-sm hover:shadow-[0_0_22px_rgba(255,160,200,0.35)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full bg-pink-100 border border-pink-200 flex items-center justify-center shrink-0">
                    <Icon className="text-pink-500" size={22} />
                  </div>

                  <h3 className="font-bold text-pink-700 text-base">
                    {item.title}
                  </h3>
                </div>

                <p className="text-gray-600 text-sm leading-7 mb-4">
                  {item.desc}
                </p>

                <span className="text-xs font-semibold text-pink-600">
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
          💬 بعضی رابطه‌ها با حرف نزدن خراب می‌شوند، بعضی‌ها با بد حرف زدن.
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
              className="w-full max-w-xl rounded-3xl bg-white border border-pink-200 shadow-2xl p-6 text-right"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-xl font-bold text-pink-700 leading-8">
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

              <div className="text-gray-700 text-sm leading-9 space-y-5 whitespace-pre-line">
                {selectedItem.content}
              </div>

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold py-3 shadow-md hover:shadow-lg transition"
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