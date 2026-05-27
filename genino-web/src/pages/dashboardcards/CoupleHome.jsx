import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@components/Dashboard/DashboardLayout";
import {
  Home,
  Lamp,
  Flower2,
  Sofa,
  Sparkles,
  HeartHandshake,
  Coffee,
  Moon,
  X,
} from "lucide-react";

const homeItems = [
  {
    title: "خانه فقط چهاردیواری نیست",
    desc: "خانه باید جایی باشد که هر دو نفر در آن احساس امنیت کنند.",
    icon: Home,
    content:
      "خانه مشترک فقط محل خوابیدن، غذا خوردن و وسایل چیدن نیست. خانه جایی است که دو نفر بعد از شلوغی بیرون، باید بتوانند در آن آرام‌تر شوند.\n\nاگر فضای خانه پر از تنش، بی‌نظمی شدید، سکوت سرد یا بی‌توجهی باشد، رابطه هم آرام‌آرام خسته می‌شود.\n\nخانه خوب یعنی جایی که هر دو نفر حس کنند دیده می‌شوند، سهم دارند و می‌توانند خودشان باشند.",
  },
  {
    title: "گوشه آرامش دونفره",
    desc: "یک فضای کوچک برای چای، حرف زدن و مکث.",
    icon: Coffee,
    content:
      "لازم نیست خانه بزرگ یا لوکس باشد. حتی یک گوشه کوچک با دو صندلی، نور ملایم، یک گلدان یا میز کوچک می‌تواند تبدیل به فضای آرامش دونفره شود.\n\nاین گوشه می‌تواند جایی باشد برای نوشیدن چای، حرف زدن آخر شب، برنامه‌ریزی هفته یا فقط چند دقیقه کنار هم بودن بدون موبایل.",
  },
  {
    title: "نور خانه روی حال اثر دارد",
    desc: "نور گرم و ملایم می‌تواند فضای خانه را صمیمی‌تر کند.",
    icon: Lamp,
    content:
      "نور خانه بیشتر از چیزی که فکر می‌کنیم روی احساس ما اثر دارد. نور خیلی تند یا سرد می‌تواند فضا را خسته‌کننده کند، اما نور گرم و ملایم حس آرامش بیشتری می‌دهد.\n\nگاهی با یک چراغ کوچک، شمع ایمن، آباژور یا کم کردن نورهای تند، حال فضای خانه کاملاً عوض می‌شود.",
  },
  {
    title: "نظم بدون وسواس",
    desc: "خانه مرتب خوب است، اما خانه باید قابل زندگی هم باشد.",
    icon: Sparkles,
    content:
      "بی‌نظمی زیاد می‌تواند ذهن را خسته کند، اما وسواس بیش‌ازحد روی تمیزی هم می‌تواند خانه را پرتنش کند.\n\nزندگی مشترک یعنی پیدا کردن تعادل؛ خانه‌ای که هم مرتب باشد، هم گرم، زنده و انسانی.\n\nبهتر است کارهای خانه تبدیل به میدان جنگ نشود، بلکه با تقسیم مسئولیت و همکاری سبک‌تر شود.",
  },
  {
    title: "گل و گیاه در خانه",
    desc: "طبیعت کوچک، حال خانه را نرم‌تر می‌کند.",
    icon: Flower2,
    content:
      "وجود چند گیاه ساده می‌تواند حس زندگی، تازگی و آرامش به خانه بدهد.\n\nگیاه‌ها فقط دکور نیستند؛ یادآور مراقبت، رشد و حضور طبیعت در زندگی روزمره‌اند.\n\nحتی اگر وقت زیادی ندارید، می‌توانید از گیاه‌های مقاوم و کم‌دردسر شروع کنید.",
  },
  {
    title: "سلیقه هر دو نفر مهم است",
    desc: "خانه مشترک نباید فقط شبیه یکی از شما باشد.",
    icon: HeartHandshake,
    content:
      "در زندگی دونفره، خانه باید ترکیبی از سلیقه، نیاز و احساس هر دو نفر باشد.\n\nاگر یکی از دو نفر حس کند هیچ اثری از او در خانه نیست، ممکن است ناخودآگاه احساس بی‌اهمیتی کند.\n\nحتی انتخاب چند وسیله کوچک با نظر هر دو نفر، می‌تواند حس تعلق را بیشتر کند.",
  },
  {
    title: "اتاق خواب؛ فضای آرام، نه میدان بحث",
    desc: "محل خواب بهتر است امن‌ترین نقطه خانه باشد.",
    icon: Moon,
    content:
      "اتاق خواب اگر همیشه محل بحث، گلایه یا استفاده طولانی از موبایل باشد، ذهن آن را با تنش گره می‌زند.\n\nبهتر است تا حد ممکن اتاق خواب فضای آرام‌تری باشد؛ جایی برای استراحت، نزدیکی، خواب بهتر و فاصله گرفتن از شلوغی روز.",
  },
  {
    title: "خانه‌ای که رابطه را گرم‌تر می‌کند",
    desc: "فضاهای کوچک می‌توانند رفتارهای صمیمی بسازند.",
    icon: Sofa,
    content:
      "چیدمان خانه می‌تواند روی رفتار زوج‌ها اثر بگذارد. اگر همه چیز فقط حول تلویزیون، موبایل یا کار باشد، گفت‌وگو کمتر می‌شود.\n\nاما اگر خانه فضاهایی برای نشستن کنار هم، غذا خوردن آرام، حرف زدن و استراحت مشترک داشته باشد، رابطه هم فرصت بیشتری برای نفس کشیدن پیدا می‌کند.",
  },
];

export default function CoupleHome() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <DashboardLayout title="خانه و زندگی دونفره">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 border border-pink-200 shadow-inner mb-4">
            <Home className="text-pink-500" size={30} />
          </div>

          <h2 className="text-2xl font-bold text-pink-600 mb-3">
            خانه و زندگی دونفره
          </h2>

          <p className="text-gray-600 text-sm leading-7 max-w-2xl mx-auto">
            ایده‌هایی ساده اما عمیق برای ساختن خانه‌ای آرام‌تر، گرم‌تر و
            صمیمی‌تر؛ جایی که رابطه بتواند در آن نفس بکشد.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {homeItems.map((item, index) => {
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
          🏡 خانه خوب، فقط زیبا نیست؛ آرام و امن است.
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