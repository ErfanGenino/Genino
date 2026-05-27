import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@components/Dashboard/DashboardLayout";
import {
  CalendarDays,
  Heart,
  Hospital,
  Baby,
  Backpack,
  MessageCircle,
  Brain,
  ShieldCheck,
  X,
} from "lucide-react";

const birthItems = [
  {
    title: "آمادگی برای زایمان یعنی چی؟",
    desc: "آمادگی فقط آماده کردن وسایل نیست.",
    icon: CalendarDays,
    content:
      "آمادگی برای زایمان یعنی مادر و همراهش کم‌کم با روزهای نزدیک تولد آشنا شوند؛ از نظر ذهنی، احساسی، جسمی و عملی.\n\nقرار نیست همه چیز را کامل کنترل کنید. هدف این است که ابهام کمتر شود، ترس‌ها قابل‌گفت‌وگو شوند و مادر احساس کند تنها نیست.",
  },
  {
    title: "شناخت علائم شروع زایمان",
    desc: "آگاهی باعث آرامش بیشتر می‌شود.",
    icon: ShieldCheck,
    content:
      "نزدیک زمان زایمان، بدن ممکن است نشانه‌هایی نشان دهد؛ مثل انقباض‌های منظم، تغییرات ترشحات، دردهای پایین شکم یا کمر، یا پاره شدن کیسه آب.\n\nاما تشخیص دقیق وضعیت باید با پزشک یا مرکز درمانی باشد.\n\nبهتر است از قبل با پزشک درباره علائمی که نیاز به مراجعه فوری دارند صحبت شود.",
  },
  {
    title: "کیف بیمارستان",
    desc: "آماده بودن وسایل، ذهن را سبک‌تر می‌کند.",
    icon: Backpack,
    content:
      "آماده کردن کیف بیمارستان چند هفته قبل از تاریخ احتمالی زایمان می‌تواند اضطراب روزهای آخر را کمتر کند.\n\nوسایل شناسایی، مدارک پزشکی، لباس راحت برای مادر، وسایل بهداشتی، لباس نوزاد، شارژر، خوراکی سبک مجاز و وسایل ضروری همراه معمولاً باید بررسی شوند.\n\nلیست دقیق بهتر است با توجه به بیمارستان و نظر پزشک تنظیم شود.",
  },
  {
    title: "نقش همراه در روز زایمان",
    desc: "حضور آرام همراه، برای مادر بسیار مهم است.",
    icon: Heart,
    content:
      "همراه مادر فقط برای انجام کارهای اداری یا حمل وسایل نیست؛ حضور آرام، حمایت کلامی، گوش دادن و کمک به کاهش اضطراب مادر اهمیت زیادی دارد.\n\nگاهی یک جمله آرام، گرفتن دست، یادآوری نفس کشیدن یا فقط حضور مطمئن می‌تواند برای مادر بسیار ارزشمند باشد.",
  },
  {
    title: "ترس از زایمان طبیعی است",
    desc: "ترس داشتن یعنی انسان بودن، نه ضعیف بودن.",
    icon: Brain,
    content:
      "بسیاری از مادرها قبل از زایمان ترس، نگرانی یا سؤال‌های زیادی دارند.\n\nترس از درد، سلامت نوزاد، تجربه بیمارستان یا تغییر زندگی بعد از تولد طبیعی است.\n\nبهتر است این ترس‌ها سرکوب نشوند؛ صحبت با پزشک، همسر یا فرد مطمئن می‌تواند ذهن را سبک‌تر کند.",
  },
  {
    title: "انتخاب محل زایمان",
    desc: "شناخت محیط، اضطراب را کمتر می‌کند.",
    icon: Hospital,
    content:
      "اگر امکانش وجود دارد، بهتر است مادر قبل از روز زایمان درباره بیمارستان، مسیر رفت‌وآمد، مدارک لازم، قوانین همراه و مراحل پذیرش اطلاعات داشته باشد.\n\nوقتی محیط و روند کلی آشنا باشد، ذهن در روز اصلی کمتر غافلگیر می‌شود.",
  },
  {
    title: "گفت‌وگو با پزشک",
    desc: "سؤال پرسیدن بخشی از آمادگی است.",
    icon: MessageCircle,
    content:
      "در ویزیت‌های آخر، خوب است مادر سؤال‌های مهمش را یادداشت کند؛ درباره علائم مراجعه، نوع زایمان، شرایط اورژانسی، مراقبت بعد از زایمان و شیردهی اولیه.\n\nهیچ سؤال ساده یا خجالت‌آوری وجود ندارد. آگاهی بیشتر معمولاً آرامش بیشتری می‌آورد.",
  },
  {
    title: "بعد از تولد هم مهم است",
    desc: "زایمان پایان مسیر نیست؛ آغاز مرحله تازه است.",
    icon: Baby,
    content:
      "بعد از تولد نوزاد، بدن مادر نیاز به استراحت، مراقبت و حمایت دارد.\n\nخواب کم، تغییرات احساسی، شروع شیردهی و مسئولیت‌های جدید می‌توانند چالش‌برانگیز باشند.\n\nآمادگی واقعی یعنی فقط به روز زایمان فکر نکنیم؛ به روزهای بعد از تولد هم توجه کنیم.",
  },
];

export default function BirthPreparation() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <DashboardLayout title="آمادگی برای زایمان">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 border border-green-200 shadow-inner mb-4">
            <CalendarDays className="text-green-600" size={30} />
          </div>

          <h2 className="text-2xl font-bold text-green-700 mb-3">
            آمادگی برای زایمان
          </h2>

          <p className="text-gray-600 text-sm leading-7 max-w-2xl mx-auto">
            آشنایی آرام و واقعی با روزهای نزدیک تولد نوزاد؛ برای کمتر شدن ابهام،
            افزایش آرامش و آماده‌تر شدن مادر و همراهش.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {birthItems.map((item, index) => {
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
          🌿 آمادگی یعنی ترس کمتر، آگاهی بیشتر و همراهی آرام‌تر.
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