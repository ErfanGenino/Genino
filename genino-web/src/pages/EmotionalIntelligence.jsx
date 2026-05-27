import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@components/Dashboard/DashboardLayout";
import {
  Heart,
  Brain,
  Smile,
  Flame,
  Wind,
  Users,
  X,
  BookOpen,
} from "lucide-react";

const articles = [
  {
    title: "هوش عاطفی یعنی چی؟",
    desc: "آشنایی ساده با توانایی شناخت، درک و مدیریت احساسات.",
    icon: Brain,
    content:
      "هوش عاطفی یعنی بتوانیم احساسات خودمان را بهتر بشناسیم، بفهمیم چرا ناراحت، عصبانی، مضطرب یا خوشحال هستیم و بعد واکنش آگاهانه‌تری نشان بدهیم. کسی که هوش عاطفی بهتری دارد، معمولاً آرام‌تر تصمیم می‌گیرد، بهتر با دیگران ارتباط برقرار می‌کند و کمتر اسیر واکنش‌های لحظه‌ای می‌شود.",
  },
  {
    title: "چطور احساساتم را بهتر بشناسم؟",
    desc: "چند قدم ساده برای نام‌گذاری و فهمیدن احساسات روزمره.",
    icon: Smile,
    content:
      "اولین قدم این است که احساسمان را قضاوت نکنیم. فقط اسمش را پیدا کنیم: ناراحتی، خشم، نگرانی، خستگی، دلخوری یا شادی. وقتی بتوانیم احساسمان را نام‌گذاری کنیم، بهتر می‌توانیم دلیلش را بفهمیم و تصمیم بگیریم چه واکنشی مناسب‌تر است.",
  },
  {
    title: "وقتی عصبانی می‌شوم چه کار کنم؟",
    desc: "تمرین‌های کوتاه برای کنترل خشم قبل از واکنش.",
    icon: Flame,
    content:
      "وقتی عصبانی می‌شویم، بهتر است چند ثانیه بین احساس و واکنش فاصله بیندازیم. یک نفس عمیق بکشیم، تا ده بشماریم و بعد حرف بزنیم. هدف این نیست که خشم را انکار کنیم؛ هدف این است که اجازه ندهیم خشم به جای ما تصمیم بگیرد.",
  },
  {
    title: "مدیریت اضطراب در زندگی روزمره",
    desc: "راهکارهای سبک برای آرام‌تر شدن ذهن.",
    icon: Wind,
    content:
      "اضطراب معمولاً وقتی زیاد می‌شود که ذهن ما درگیر آینده و اتفاقات نامعلوم است. یک تمرین ساده این است که چند نفس آرام بکشیم و توجه‌مان را به همین لحظه برگردانیم. از خودمان بپرسیم: الان دقیقاً چه کاری از دست من برمی‌آید؟",
  },
  {
    title: "ارتباط بهتر با اطرافیان",
    desc: "چطور با همسر، خانواده و دیگران آرام‌تر صحبت کنیم.",
    icon: Users,
    content:
      "ارتباط خوب یعنی فقط حرف زدن نیست؛ شنیدن هم هست. وقتی با کسی اختلاف داریم، بهتر است اول احساس خودمان را بگوییم، نه اینکه طرف مقابل را متهم کنیم. مثلاً به جای «تو همیشه بی‌توجهی»، بگوییم «من وقتی این اتفاق می‌افتد احساس تنهایی می‌کنم».",
  },
  {
    title: "تمرین کوتاه روزانه",
    desc: "یک تمرین ساده برای رشد آرام و پیوسته.",
    icon: BookOpen,
    content:
      "هر روز فقط سه دقیقه وقت بگذار و از خودت بپرس: امروز بیشتر چه احساسی داشتم؟ دلیلش چه بود؟ آیا واکنشم مناسب بود؟ همین تمرین ساده، کم‌کم آگاهی عاطفی تو را بیشتر می‌کند.",
  },
];

export default function EmotionalIntelligence() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <DashboardLayout title="هوش عاطفی">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 border border-yellow-200 shadow-inner mb-4">
            <Heart className="text-yellow-600" size={30} />
          </div>

          <h2 className="text-2xl font-bold text-yellow-700 mb-3">
            مرکز آرامش و هوش عاطفی ژنینو
          </h2>

          <p className="text-gray-600 text-sm leading-7 max-w-2xl mx-auto">
            اینجا قرار نیست پیچیده حرف بزنیم؛ فقط چند نوشته ساده و کاربردی
            برای شناخت بهتر احساسات، آرام‌تر شدن و ارتباط بهتر با خود و دیگران.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article, index) => {
            const Icon = article.icon;

            return (
              <motion.button
                key={article.title}
                type="button"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setSelectedArticle(article)}
                className="text-right rounded-2xl p-5 bg-gradient-to-b from-yellow-50 to-white border border-yellow-200 shadow-sm hover:shadow-[0_0_22px_rgba(255,220,100,0.35)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full bg-yellow-100 border border-yellow-200 flex items-center justify-center shrink-0">
                    <Icon className="text-yellow-600" size={22} />
                  </div>

                  <h3 className="font-bold text-yellow-700 text-base">
                    {article.title}
                  </h3>
                </div>

                <p className="text-gray-600 text-sm leading-7 mb-4">
                  {article.desc}
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
          ✨ گاهی فقط شناختن احساس، اولین قدم آرام‌تر شدن است.
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArticle(null)}
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
                  {selectedArticle.title}
                </h3>

                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                >
                  <X size={18} className="text-gray-600" />
                </button>
              </div>

              <p className="text-gray-700 text-sm leading-8">
                {selectedArticle.content}
              </p>

              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
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