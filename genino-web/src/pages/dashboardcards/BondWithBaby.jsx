import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@components/Dashboard/DashboardLayout";
import {
  HandHeart,
  Heart,
  Music,
  MessageCircle,
  Baby,
  Home,
  Sparkles,
  Users,
  X,
} from "lucide-react";

const bondItems = [
  {
    title: "رابطه قبل از تولد شروع می‌شود",
    desc: "پیوند عاطفی فقط بعد از تولد شکل نمی‌گیرد.",
    icon: Baby,
    content:
      "خیلی از والدین فکر می‌کنند رابطه واقعی با کودک از لحظه تولد شروع می‌شود، اما ارتباط عاطفی می‌تواند از دوران بارداری آرام‌آرام شکل بگیرد.\n\nحرف زدن، لمس آرام شکم، توجه به حرکت‌های جنین و لحظه‌های سکوت مادرانه می‌توانند حس نزدیکی بیشتری ایجاد کنند.\n\nاین ارتباط قرار نیست پیچیده باشد؛ گاهی چند دقیقه توجه آرام کافی است.",
  },
  {
    title: "حرف زدن با جنین",
    desc: "صدای مادر و پدر می‌تواند بخشی از تجربه آرام کودک باشد.",
    icon: MessageCircle,
    content:
      "حرف زدن با جنین می‌تواند برای مادر و پدر تجربه‌ای احساسی و آرامش‌بخش باشد.\n\nلازم نیست حرف‌های خاص یا زیادی گفته شود. چند جمله ساده، سلام کردن، تعریف کردن حس روزانه یا گفتن اینکه منتظرش هستید، می‌تواند برای والدین حس نزدیکی ایجاد کند.\n\nمهم‌تر از کلمات، آرامش و توجهی است که در آن لحظه وجود دارد.",
  },
  {
    title: "لمس آرام شکم",
    desc: "یک راه ساده برای حضور و توجه.",
    icon: HandHeart,
    content:
      "لمس آرام شکم می‌تواند به مادر کمک کند حضور جنین را بیشتر حس کند و چند لحظه از شلوغی ذهن فاصله بگیرد.\n\nگاهی مادر یا پدر می‌توانند دستشان را آرام روی شکم بگذارند، نفس عمیق بکشند و چند لحظه فقط به این زندگی کوچک توجه کنند.\n\nاین کار ساده می‌تواند حس مراقبت، عشق و آرامش ایجاد کند.",
  },
  {
    title: "موسیقی ملایم",
    desc: "صداهای آرام می‌توانند فضای احساسی خوبی بسازند.",
    icon: Music,
    content:
      "موسیقی ملایم می‌تواند به آرام‌تر شدن مادر کمک کند و لحظه‌ای خاص برای ارتباط با جنین بسازد.\n\nبهتر است صداها آرام، با حجم مناسب و بدون فشار باشند. هدف این نیست که کودک را با موسیقی خاصی تربیت کنیم؛ هدف ساختن فضایی امن، آرام و احساسی برای مادر و خانواده است.",
  },
  {
    title: "نقش پدر در پیوند عاطفی",
    desc: "پدر هم می‌تواند از قبل تولد وارد رابطه شود.",
    icon: Users,
    content:
      "پدر می‌تواند با حرف زدن با جنین، لمس آرام شکم مادر، همراهی در ویزیت‌ها و توجه به حال مادر، از دوران بارداری رابطه عاطفی خود را شروع کند.\n\nاین همراهی فقط برای کودک نیست؛ برای مادر هم پیام مهمی دارد: «در این مسیر تنها نیستی.»\n\nپدر شدن از قبل تولد آغاز می‌شود.",
  },
  {
    title: "احساسات مادر مهم‌اند",
    desc: "حال مادر بخشی از فضای عاطفی بارداری است.",
    icon: Heart,
    content:
      "مادر در دوران بارداری احساسات زیادی را تجربه می‌کند؛ عشق، نگرانی، حساسیت، خستگی و امید.\n\nپیوند عاطفی سالم یعنی مادر اجازه داشته باشد همه این احساسات را تجربه کند، بدون اینکه خودش را قضاوت کند.\n\nهر روز قرار نیست رؤیایی و کامل باشد. رابطه با جنین در دل زندگی واقعی شکل می‌گیرد.",
  },
  {
    title: "خانه آرام، پیوند آرام‌تر",
    desc: "فضای خانه روی تجربه مادر اثر دارد.",
    icon: Home,
    content:
      "وقتی فضای خانه آرام‌تر، محترمانه‌تر و امن‌تر باشد، مادر راحت‌تر می‌تواند با خودش و جنین ارتباط برقرار کند.\n\nتنش زیاد، دعوا، اضطراب و بی‌توجهی می‌تواند ذهن مادر را خسته کند.\n\nآرامش خانه فقط برای مادر نیست؛ بخشی از آماده‌سازی خانواده برای ورود کودک است.",
  },
  {
    title: "پیوند عاطفی بدون فشار",
    desc: "هیچ مادری قرار نیست همیشه حس کامل و شاعرانه داشته باشد.",
    icon: Sparkles,
    content:
      "بعضی مادرها از همان ابتدا ارتباط عاطفی قوی با جنین حس می‌کنند، بعضی‌ها دیرتر. هر دو طبیعی است.\n\nنباید مادر را مجبور کرد همیشه حس خاصی داشته باشد یا اگر خسته و مضطرب است، خودش را مقصر بداند.\n\nپیوند عاطفی یک مسیر آرام است، نه یک وظیفه سخت.",
  },
];

export default function BondWithBaby() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <DashboardLayout title="پیوند عاطفی با جنین">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 border border-green-200 shadow-inner mb-4">
            <HandHeart className="text-green-600" size={30} />
          </div>

          <h2 className="text-2xl font-bold text-green-700 mb-3">
            پیوند عاطفی با جنین
          </h2>

          <p className="text-gray-600 text-sm leading-7 max-w-2xl mx-auto">
            ارتباطی آرام، انسانی و احساسی با نوزاد از قبل تولد؛ از طریق صدا،
            لمس، حضور، آرامش و توجه.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {bondItems.map((item, index) => {
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
          💚 گاهی یک لمس آرام، شروع یک رابطه عمیق است.
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