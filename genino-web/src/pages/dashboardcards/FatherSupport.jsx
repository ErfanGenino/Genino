import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@components/Dashboard/DashboardLayout";
import {
  HandHeart,
  Heart,
  MessageCircle,
  Baby,
  ShieldCheck,
  Brain,
  Home,
  CalendarHeart,
  X,
} from "lucide-react";

const fatherSupportItems = [
  {
    title: "پدر شدن از قبل تولد شروع می‌شود",
    desc: "نقش پدر فقط بعد از تولد کودک آغاز نمی‌شود.",
    icon: Baby,
    content:
      "خیلی‌ها فکر می‌کنند پدر شدن از روز تولد نوزاد شروع می‌شود، اما واقعیت این است که پدر از دوران بارداری وارد این مسیر می‌شود.\n\nحضور، توجه، آرامش و همراهی مرد در این دوران می‌تواند به مادر احساس امنیت بیشتری بدهد.\n\nکودک هنوز متولد نشده، اما خانواده از همین حالا در حال شکل گرفتن است.",
  },
  {
    title: "مادر فقط به کمک عملی نیاز ندارد",
    desc: "حمایت عاطفی گاهی از هر کاری مهم‌تر است.",
    icon: Heart,
    content:
      "در دوران بارداری، مادر ممکن است از نظر جسمی، ذهنی و احساسی تغییرات زیادی تجربه کند.\n\nکمک کردن در کارهای خانه مهم است، اما کافی نیست. گاهی مادر بیشتر از راه‌حل، نیاز دارد شنیده شود، درک شود و احساس کند تنها نیست.\n\nیک جمله آرام، یک توجه کوچک یا چند دقیقه گوش دادن واقعی می‌تواند اثر زیادی داشته باشد.",
  },
  {
    title: "مردها هم ممکن است نگران شوند",
    desc: "اضطراب پدر آینده هم واقعی است.",
    icon: Brain,
    content:
      "خیلی از مردها در دوران بارداری همسرشان نگرانی‌هایی دارند؛ درباره هزینه‌ها، مسئولیت پدر بودن، سلامت مادر و کودک یا تغییرات آینده زندگی.\n\nاما چون از مردها انتظار می‌رود همیشه قوی باشند، ممکن است این نگرانی‌ها را کمتر بیان کنند.\n\nپدر آینده هم انسان است؛ او هم نیاز به آگاهی، گفت‌وگو و آرامش دارد.",
  },
  {
    title: "شنیدن بدون عجله برای جواب دادن",
    desc: "گاهی فقط شنیده شدن کافی است.",
    icon: MessageCircle,
    content:
      "وقتی مادر از خستگی، ترس یا نگرانی حرف می‌زند، همیشه دنبال راه‌حل فوری نیست.\n\nگاهی فقط می‌خواهد احساسش دیده شود. جملاتی مثل «می‌فهمم خسته‌ای» یا «کنارت هستم» می‌توانند بیشتر از نصیحت اثر داشته باشند.\n\nحمایت عاطفی یعنی قبل از حل مسئله، احساس طرف مقابل را جدی بگیریم.",
  },
  {
    title: "خانه امن برای مادر",
    desc: "آرامش خانه بخشی از مراقبت بارداری است.",
    icon: Home,
    content:
      "فضای خانه در دوران بارداری اهمیت زیادی دارد. تنش زیاد، دعوای مداوم یا بی‌توجهی می‌تواند فشار ذهنی مادر را بیشتر کند.\n\nنقش پدر فقط تأمین مالی نیست؛ او می‌تواند با آرام‌تر کردن فضا، همکاری در کارها و مراقبت از لحن رابطه، خانه را امن‌تر کند.\n\nخانه آرام، هدیه‌ای بزرگ برای مادر و کودک آینده است.",
  },
  {
    title: "همراهی در ویزیت‌ها و تصمیم‌ها",
    desc: "حضور پدر یعنی مادر تنها تصمیم نمی‌گیرد.",
    icon: CalendarHeart,
    content:
      "اگر امکانش باشد، همراهی در ویزیت‌ها، پرسیدن سؤال‌ها و پیگیری توصیه‌های پزشک می‌تواند به مادر حس حمایت بیشتری بدهد.\n\nاین کار نشان می‌دهد بارداری فقط مسئولیت مادر نیست؛ مسیر مشترک خانواده است.\n\nحتی اگر پدر همیشه نتواند حضور فیزیکی داشته باشد، پیگیری و توجه او اهمیت دارد.",
  },
  {
    title: "آمادگی برای روز زایمان",
    desc: "پدر آرام، همراه مطمئن‌تری است.",
    icon: ShieldCheck,
    content:
      "روز زایمان ممکن است پر از هیجان، نگرانی و تصمیم‌های سریع باشد.\n\nپدر اگر از قبل بداند مدارک، وسایل، مسیر بیمارستان و نیازهای مادر چیست، می‌تواند آرام‌تر و مؤثرتر همراهی کند.\n\nگاهی نقش مهم پدر در آن روز، فقط این است که حضورش مطمئن، آرام و بدون اضطراب منتقل‌شده باشد.",
  },
  {
    title: "بعد از تولد، مادر را فراموش نکن",
    desc: "همه توجه‌ها نباید فقط به نوزاد برود.",
    icon: HandHeart,
    content:
      "بعد از تولد نوزاد، معمولاً همه توجه‌ها به کودک جلب می‌شود؛ اما مادر همچنان نیاز به مراقبت، استراحت، محبت و حمایت دارد.\n\nخواب کم، تغییرات جسمی، شیردهی و فشارهای احساسی می‌توانند برای مادر سخت باشند.\n\nپدر می‌تواند با حضور واقعی، تقسیم کار و توجه عاطفی، این مرحله را برای مادر امن‌تر کند.",
  },
];

export default function FatherSupport() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <DashboardLayout title="همراهی پدر در بارداری">
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
            همراهی پدر در بارداری
          </h2>

          <p className="text-gray-600 text-sm leading-7 max-w-2xl mx-auto">
            نقش پدر فقط بعد از تولد شروع نمی‌شود؛ حضور، حمایت و آرامش او از
            دوران بارداری بخشی از امنیت مادر و کودک آینده است.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {fatherSupportItems.map((item, index) => {
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
          💚 پدر آرام و همراه، بخشی از امنیت مادر و آغاز آرام کودک است.
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