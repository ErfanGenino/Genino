import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GeninoDNABackground from "@components/Core/GeninoDNABackground";
import { Activity, Scale, Ruler, Baby } from "lucide-react";

/* 💛 دکمه ژنینویی */
const Btn = ({ children, className = "", ...rest }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`px-8 py-3 rounded-full font-bold text-white 
                bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 
                shadow-[0_0_20px_rgba(255,215,0,0.4)] ${className}`}
    {...rest}
  >
    {children}
  </motion.button>
);

export default function BodyMetricsCheck() {
  const navigate = useNavigate();
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [finalMessages, setFinalMessages] = useState([]);
  const [showReportBtn, setShowReportBtn] = useState(false);

  const handleAnalyze = () => {
    if (!height || !weight) return;

    const h = height / 100;
    const bmi = (weight / (h * h)).toFixed(1);

    let status = "";
    if (age < 2) status = "نامعتبر برای زیر دو سال";
    else if (bmi < 14) status = "کم‌وزن";
    else if (bmi <= 17) status = "طبیعی";
    else if (bmi <= 19) status = "کمی اضافه وزن";
    else status = "اضافه وزن / چاقی";

    // 💬 ساخت دنباله پیام‌ها
    const seq = [
      {
        icon: <Activity className="w-7 h-7 text-yellow-600" />,
        text: `📏 شاخص توده بدنی (BMI) کودک شما ${bmi} است و در دسته‌ی «${status}» قرار دارد.`,
      },
    ];

    if (status === "کم‌وزن") {
      seq.push({
        icon: <Scale className="w-7 h-7 text-yellow-600" />,
        text: "🔍 وزن کودک پایین‌تر از میانگین سنی است. این می‌تواند به دلیل تغذیه ناکافی باشد.",
      });
      seq.push({
        icon: <Baby className="w-7 h-7 text-yellow-600" />,
        text: "🍲 وعده‌های کوچک اما پرکالری (تخم‌مرغ، برنج، عدس، کره بادام‌زمینی) توصیه می‌شود.",
      });
      seq.push({
        icon: <Ruler className="w-7 h-7 text-yellow-600" />,
        text: "🌱 رشد قدی ممکن است کند باشد. خواب کافی و لبنیات می‌توانند به رشد کمک کنند.",
      });
    } else if (status.includes("اضافه")) {
      seq.push({
        icon: <Scale className="w-7 h-7 text-yellow-600" />,
        text: "⚠️ وزن کودک کمی بالاتر از محدوده طبیعی است. بهتر است تحرک روزانه‌اش بررسی شود.",
      });
      seq.push({
        icon: <Baby className="w-7 h-7 text-yellow-600" />,
        text: "🏃‍♀️ بازی و فعالیت فیزیکی روزانه (دویدن، توپ‌بازی، رقص کودکانه) عالی است.",
      });
      seq.push({
        icon: <Ruler className="w-7 h-7 text-yellow-600" />,
        text: "📏 رشد قدی طبیعی است ولی باید وزن کنترل شود تا تعادل بدن حفظ گردد.",
      });
    } else if (status === "طبیعی") {
      seq.push({
        icon: <Scale className="w-7 h-7 text-yellow-600" />,
        text: "🎉 وزن کودک متناسب با سن اوست. رشد بدنی‌اش در مسیر درست قرار دارد.",
      });
      seq.push({
        icon: <Baby className="w-7 h-7 text-yellow-600" />,
        text: "👶 تغذیه‌ی متنوع و خواب کافی به حفظ این تعادل کمک می‌کند.",
      });
      seq.push({
        icon: <Ruler className="w-7 h-7 text-yellow-600" />,
        text: "💪 رشد قدی کودک نیز در محدوده‌ی طبیعی و سالم است. عالی عمل کردید!",
      });
    }

    seq.push({
      icon: <Activity className="w-7 h-7 text-yellow-600" />,
      text: "✨ تحلیل ژنینو کامل شد. حالا می‌توانید گزارش رسمی رشد بدنی کودک را ببینید.",
    });

    setFinalMessages(seq);
    setDisplayedMessages([]);
    setShowReportBtn(false);
  };

  // ⏱️ نمایش تدریجی پیام‌ها یکی‌یکی
  useEffect(() => {
    if (finalMessages.length === 0) return;
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedMessages((prev) => [...prev, finalMessages[index]]);
      index++;
      if (index === finalMessages.length) {
        clearInterval(interval);
        setTimeout(() => setShowReportBtn(true), 1500);
      }
    }, 1800);

    return () => clearInterval(interval);
  }, [finalMessages]);

  return (
    <GeninoDNABackground strands={10} opacity={0.25} duration={90}>
      <main
        dir="rtl"
        className="relative z-10 flex flex-col items-center px-6 py-16 text-gray-800"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-extrabold text-yellow-700 mb-10 text-center drop-shadow-[0_0_12px_rgba(255,220,80,0.5)]"
        >
          پایش گفت‌وگویی رشد بدنی کودک 💬
        </motion.h1>

        {/* 🧮 فرم اولیه */}
        {displayedMessages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-yellow-50 via-white to-amber-50 
                       p-8 rounded-3xl shadow-[0_0_25px_rgba(255,215,0,0.3)] 
                       max-w-md w-full border border-yellow-200 text-center"
          >
            <p className="text-gray-700 mb-6 leading-relaxed">
              لطفاً اطلاعات زیر را وارد کنید تا ژنینو به‌صورت گفت‌وگویی رشد بدنی کودک را تحلیل کند 👇
            </p>
            <div className="flex flex-col gap-4 mb-6 text-right">
              <label className="font-semibold text-gray-700">
                سن کودک (سال):
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full mt-1 p-2 rounded-xl border border-yellow-300 focus:ring-2 focus:ring-yellow-400 outline-none"
                />
              </label>
              <label className="font-semibold text-gray-700">
                قد (سانتی‌متر):
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full mt-1 p-2 rounded-xl border border-yellow-300 focus:ring-2 focus:ring-yellow-400 outline-none"
                />
              </label>
              <label className="font-semibold text-gray-700">
                وزن (کیلوگرم):
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full mt-1 p-2 rounded-xl border border-yellow-300 focus:ring-2 focus:ring-yellow-400 outline-none"
                />
              </label>
            </div>
            <Btn onClick={handleAnalyze}>شروع تحلیل ژنینو 🧠</Btn>
          </motion.div>
        )}

        {/* 💬 پیام‌های گفت‌وگویی ژنینو */}
        <div className="max-w-2xl w-full flex flex-col gap-4">
          <AnimatePresence>
            {displayedMessages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="flex items-start gap-3 bg-gradient-to-br from-white to-yellow-50 
                           border border-yellow-200 rounded-2xl p-4 shadow-sm"
              >
                <div className="flex-shrink-0">{msg.icon}</div>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{msg.text}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 📄 دکمه گزارش رسمی */}
        {showReportBtn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <Btn
              onClick={() =>
                navigate("/child-health-check/body-report", {
                  state: {
                    report: {
                      name: "حنا سمواتی",
                      date: new Date().toLocaleDateString("fa-IR"),
                      type: "bodymetrics",
                      label: "پایش رشد بدنی و تغذیه",
                      data: { messages: displayedMessages },
                    },
                  },
                })
              }
            >
              مشاهده گزارش رسمی ژنینو 🧾
            </Btn>
          </motion.div>
        )}
      </main>
    </GeninoDNABackground>
  );
}
