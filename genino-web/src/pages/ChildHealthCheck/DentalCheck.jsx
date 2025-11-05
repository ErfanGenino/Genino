// 📄 src/pages/ChildHealthCheck/DentalCheck.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SmilePlus as Tooth } from "lucide-react";
import GeninoDNABackground from "../../components/GeninoDNABackground";

/* 🦷 مرحله ۱ - بررسی رشد و رویش دندان‌ها */
function ToothGrowthTest({ onComplete }) {
  const [selected, setSelected] = useState(null);
  const options = [
    {
      id: 1,
      title: "همه دندان‌های شیری درآمده ولی هنوز نیفتاده‌اند",
      desc: "کودک در بازه طبیعی رشد دندانی قرار دارد.",
      score: 3,
    },
    {
      id: 2,
      title: "چند دندان شیری افتاده و دندان دائمی در حال رشد است",
      desc: "مرحله انتقال طبیعی بین دندان‌های شیری و دائمی.",
      score: 3,
    },
    {
      id: 3,
      title: "دندان دائمی زیر دندان شیری در حال بیرون زدن است",
      desc: "احتمال نیاز به بررسی دندان‌پزشک برای افتادن به‌موقع.",
      score: 2,
    },
    {
      id: 4,
      title: "چند دندان هنوز نیامده یا خیلی دیر درآمده‌اند",
      desc: "ممکن است رشد دندانی تأخیر داشته باشد.",
      score: 1,
    },
  ];

  const handleSelect = (opt) => {
    setSelected(opt);
    setTimeout(() => onComplete(opt), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center text-center"
    >
      <p className="text-gray-700 mb-6 max-w-md leading-relaxed">
        در این بخش وضعیت رویش دندان‌های کودک بررسی می‌شود.  
        لطفاً گزینه‌ای که بیشترین شباهت به وضعیت فعلی کودک دارد را انتخاب کنید 👇
      </p>
      <div className="flex flex-col gap-4 w-full max-w-xl">
        {options.map((opt) => (
          <motion.button
            key={opt.id}
            onClick={() => handleSelect(opt)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`p-4 rounded-2xl border text-sm sm:text-base transition-all ${
  selected?.id === opt.id
    ? "bg-blue-100 border-blue-400 text-blue-900 font-semibold"
    : "bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100"
}`}
          >
            {opt.title}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

/* 🍭 مرحله ۲ - سلامت ظاهری دندان‌ها */
function ToothConditionTest({ onComplete }) {
  const [selected, setSelected] = useState(null);
  const options = [
    {
      id: 1,
      label: "سالم و سفید (بدون لک یا پوسیدگی)",
      score: 3,
    },
    {
      id: 2,
      label: "کمی زرد یا لک‌های جزئی دارد",
      score: 2,
    },
    {
      id: 3,
      label: "لک سفید یا قهوه‌ای در سطح دندان دیده می‌شود",
      score: 1,
    },
    {
      id: 4,
      label: "دارای سوراخ یا شکستگی (پوسیدگی واضح)",
      score: 0,
    },
  ];

  const handleSelect = (opt) => {
    setSelected(opt);
    setTimeout(() => onComplete(opt), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center text-center"
    >
      <p className="text-gray-700 mb-6 max-w-md leading-relaxed">
        به دندان‌های کودک نگاه کنید و گزینه‌ای که بیشترین شباهت دارد را انتخاب کنید 👇
      </p>
      <div className="flex flex-col gap-4 w-full max-w-xl">
        {options.map((opt) => (
          <motion.button
            key={opt.id}
            onClick={() => handleSelect(opt)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`p-4 rounded-2xl border text-sm sm:text-base transition-all ${
              selected?.id === opt.id
                ? "bg-blue-100 border-blue-400 text-blue-800 font-semibold"
                : "bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100"

            }`}
          >
            {opt.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

/* 🪥 مرحله ۳ - عادات بهداشتی دهان */
function OralHygieneTest({ onComplete }) {
  const [answers, setAnswers] = useState({
    brush: null,
    fluoride: null,
    sweets: null,
    dentist: null,
  });

  const allAnswered = Object.values(answers).every((v) => v !== null);

  useEffect(() => {
    if (allAnswered) {
      const score =
        answers.brush + answers.fluoride + answers.sweets + answers.dentist;
      setTimeout(() => onComplete(score), 800);
    }
  }, [answers]);

  const handle = (field, value) => setAnswers({ ...answers, [field]: value });

  // 🎨 استایل عمومی دکمه‌ها
  const buttonStyle =
    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center text-center max-w-xl"
    >
      <p className="text-gray-700 mb-6 leading-relaxed">
        لطفاً به چند سؤال ساده پاسخ دهید 👇
      </p>

      {/* 🪥 مسواک */}
      <div className="mb-4">
        <p className="font-semibold mb-2">کودک روزی چند بار مسواک می‌زند؟</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {[
            { label: "۲ بار یا بیشتر", value: 3 },
            { label: "۱ بار", value: 2 },
            { label: "به‌ندرت", value: 1 },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => handle("brush", opt.value)}
              className={`${buttonStyle} ${
                answers.brush === opt.value
                  ? "bg-blue-200 border-blue-400 text-blue-900 font-semibold shadow-inner"
                  : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 🧴 فلوراید */}
      <div className="mb-4">
        <p className="font-semibold mb-2">آیا از خمیردندان حاوی فلوراید استفاده می‌کند؟</p>
        <div className="flex gap-3 justify-center flex-wrap">
          {[
            { label: "بله", value: 3 },
            { label: "نه", value: 1 },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => handle("fluoride", opt.value)}
              className={`${buttonStyle} ${
                answers.fluoride === opt.value
                  ? "bg-blue-200 border-blue-400 text-blue-900 font-semibold shadow-inner"
                  : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 🍬 شیرینی */}
      <div className="mb-4">
        <p className="font-semibold mb-2">خوراکی شیرین بین وعده‌ها می‌خورد؟</p>
        <div className="flex gap-3 justify-center flex-wrap">
          {[
            { label: "نه یا خیلی کم", value: 3 },
            { label: "بله، زیاد", value: 1 },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => handle("sweets", opt.value)}
              className={`${buttonStyle} ${
                answers.sweets === opt.value
                  ? "bg-blue-200 border-blue-400 text-blue-900 font-semibold shadow-inner"
                  : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 🩺 دندان‌پزشک */}
      <div className="mb-4">
        <p className="font-semibold mb-2">آخرین مراجعه به دندان‌پزشک کی بوده؟</p>
        <div className="flex gap-3 justify-center flex-wrap">
          {[
            { label: "در ۶ ماه اخیر", value: 3 },
            { label: "حدود ۱ سال پیش", value: 2 },
            { label: "بیش از ۲ سال پیش", value: 1 },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => handle("dentist", opt.value)}
              className={`${buttonStyle} ${
                answers.dentist === opt.value
                  ? "bg-blue-200 border-blue-400 text-blue-900 font-semibold shadow-inner"
                  : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}


/* 📋 صفحه اصلی پایش سلامت دهان و دندان */
export default function DentalCheck() {
  const navigate = useNavigate();
  const [step, setStep] = useState(-1);
  const [growth, setGrowth] = useState(null);
  const [condition, setCondition] = useState(null);
  const [hygiene, setHygiene] = useState(null);

  const nextStep = () => setStep((s) => s + 1);

  const totalScore =
    (growth?.score || 0) * 10 +
    (condition?.score || 0) * 10 +
    (hygiene || 0) * 4; // از 100

  const report =
    totalScore >= 85
      ? "سلامت دهان و دندان کودک عالی است و الگوی مراقبت او طبیعی است."
      : totalScore >= 60
      ? "سلامت کلی قابل‌قبول است اما نیاز به توجه بیشتر در عادات روزانه دارد."
      : "احتمال پوسیدگی یا تأخیر در رشد وجود دارد. مراجعه به دندان‌پزشک توصیه می‌شود.";

  return (
    <GeninoDNABackground strands={10} opacity={0.25} duration={90}>
      <main
        dir="rtl"
        className="relative z-10 flex flex-col items-center px-6 py-16 text-gray-800"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-10 text-center drop-shadow-[0_0_12px_rgba(80,150,255,0.4)]"
        >
          پایش سلامت دهان و دندان کودک 🦷
        </motion.h1>

        <AnimatePresence mode="wait">
          {step === -1 && (
  <motion.section
    key="education"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.6 }}
    className="max-w-3xl text-center bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-3xl shadow-[0_0_25px_rgba(100,180,255,0.2)] p-10 border border-blue-200"
  >
    <h2 className="text-2xl font-bold text-blue-700 mb-4">
       آگاهی پیش از پایش دندان کودک
    </h2>

    <p className="text-gray-700 leading-relaxed mb-6 text-sm sm:text-base">
      رشد دندان‌ها از حدود <strong>۶ ماهگی</strong> آغاز می‌شود و تا حدود <strong>۱۲ سالگی</strong> ادامه دارد.  
      آگاهی از این روند به شما کمک می‌کند بدانید آیا رشد دندانی کودک در مسیر طبیعی قرار دارد یا نه.
    </p>

    <div className="text-right bg-white rounded-2xl shadow-md p-5 border border-blue-100 mb-6">
      <ul className="text-gray-700 leading-relaxed text-sm sm:text-base list-disc pr-5 space-y-2">
        <li>👶 <strong>۶ تا ۱۰ ماهگی:</strong> شروع رویش دندان‌های جلویی پایین. 🔹 تعداد دندان‌ها:

بین ۲ تا ۴ عدد (بسته به سرعت رشد کودک)

🔹 محل رویش:

در پایین فک، وسط دهان

🔹 نام دندان‌ها:

دندان‌های پیشین مرکزی پایین
(به انگلیسی: Lower Central Incisors)</li>
        <li>🍼 <strong>۸ تا ۱۲ ماهگی:</strong> رویش دندان‌های جلویی بالا. 🔹 تعداد دندان‌های جدید:

معمولاً ۲ تا ۴ عدد دیگر

🔹 محل رویش:

در فک بالا، جلوی دهان

🔹 نام دندان‌ها:

دندان‌های پیشین مرکزی بالا
(به انگلیسی: Upper Central Incisors)</li>
        <li>🍎 <strong>۱۲ تا ۲۰ ماهگی:</strong> دندان‌های کناری و آسیاب‌های اول در می‌آیند. 🔹 تعداد دندان‌های جدید:

در این دوره معمولاً ۴ تا ۸ دندان دیگر درمی‌آید
(بسته به سرعت رشد و ژنتیک)

🔹 محل رویش:

پیشین‌های کناری بالا و پایین (در طرفین دندان‌های جلویی)

آسیای اول بالا و پایین (پشت دندان‌های کناری)

🔹 نام دندان‌ها:

پیشین کناری بالا (Upper Lateral Incisors)

پیشین کناری پایین (Lower Lateral Incisors)

آسیای اول بالا (Upper First Molars)

آسیای اول پایین (Lower First Molars)</li>
        <li>🌼 <strong>۲ تا ۳ سالگی:</strong> کودک معمولاً <strong>۲۰ دندان شیری</strong> کامل دارد. 🔹 تعداد دندان‌های جدید:

در این بازه معمولاً ۴ دندان جدید درمی‌آید
(آخرین دندان‌های شیری کودک)

🔹 محل رویش:

در انتهای دهان — آخرین قسمت فک بالا و پایین

🔹 نام دندان‌ها:

دندان‌های آسیای دوم بالا و پایین
(به انگلیسی: Upper & Lower Second Molars) تا پایان ۳ سالگی، کودک معمولاً ۲۰ دندان شیری کامل دارد:

۸ دندان جلویی (پیشین مرکزی و کناری در بالا و پایین)

۸ دندان آسیای اول و دوم (در دو طرف فک بالا و پایین)

۴ دندان نیش (دو تا بالا، دو تا پایین)</li>
        <li>🎯 <strong>۵ تا ۷ سالگی:</strong> شروع افتادن دندان‌های جلویی و رویش دندان‌های دائمی.</li>
        <li>💪 <strong>۷ تا ۱۲ سالگی:</strong> جایگزینی کامل دندان‌های دائمی.</li>
        <li>🌟 <strong>بیش از ۱۲ سال:</strong> دندان‌ها تقریباً کامل‌اند (به‌جز دندان عقل).</li>
      </ul>
    </div>

    <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-8">
      ⚠️ رشد دندان‌ها در هر کودک کمی متفاوت است.  
      تأخیر جزئی معمولاً طبیعی است، اما اگر رشد خیلی کند یا نامتقارن بود،  
      بهتر است با دندان‌پزشک مشورت شود.
    </p>

    <motion.button
      onClick={() => setStep(0)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-10 py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white 
                 font-bold rounded-full shadow-[0_0_25px_rgba(100,180,255,0.4)]"
    >
      متوجه شدم، بریم سراغ پایش 🧾
    </motion.button>
  </motion.section>
)}
          {step === 0 && (
            <motion.section
              key="intro"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl text-center"
            >
              <p className="text-gray-700 leading-relaxed mb-8">
                در این پایش، ژنینو وضعیت رشد، سلامت ظاهری و عادات بهداشت دهان کودک را بررسی می‌کند.  
                این تست جایگزین معاینه تخصصی نیست اما می‌تواند وضعیت عمومی را دقیق ارزیابی کند.
              </p>
              <motion.button
                onClick={nextStep}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white 
                           font-bold rounded-full shadow-[0_0_25px_rgba(100,180,255,0.6)]"
              >
                شروع پایش سلامت دهان
              </motion.button>
            </motion.section>
          )}

          {step === 1 && (
            <ToothGrowthTest onComplete={(r) => { setGrowth(r); nextStep(); }} />
          )}

          {step === 2 && (
            <ToothConditionTest onComplete={(r) => { setCondition(r); nextStep(); }} />
          )}

          {step === 3 && (
            <OralHygieneTest onComplete={(r) => { setHygiene(r); nextStep(); }} />
          )}

          {step === 4 && (
            <motion.section
              key="report"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center bg-gradient-to-br from-blue-50 via-white to-blue-100 
                         rounded-3xl shadow-[0_0_40px_rgba(100,180,255,0.3)] p-10 mx-4 max-w-3xl border border-blue-200"
            >
              <Tooth className="w-16 h-16 mb-4 text-blue-600 drop-shadow-[0_0_12px_rgba(100,180,255,0.5)]" />
              <h2 className="text-3xl font-extrabold text-blue-700 mb-4">
                گزارش هوشمند سلامت دهان و دندان ژنینو 🦷
              </h2>

              <div className="grid sm:grid-cols-3 gap-6 w-full mb-8 text-center">
                <div className="bg-white rounded-2xl shadow-md p-5 border border-blue-100">
                  <h3 className="text-blue-700 font-bold mb-2">🦷 رشد دندان‌ها</h3>
                  <p className="text-gray-700 text-sm mb-2">{growth?.desc}</p>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-5 border border-blue-100">
                  <h3 className="text-blue-700 font-bold mb-2">🍭 سلامت ظاهری</h3>
                  <p className="text-gray-700 text-sm mb-2">{condition?.label}</p>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-5 border border-blue-100">
                  <h3 className="text-blue-700 font-bold mb-2">🪥 عادات بهداشتی</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    امتیاز عادت‌های بهداشتی: {hygiene}/12
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 px-8 py-4 rounded-full border border-blue-200 shadow-inner mb-8">
                <span className="text-lg font-bold text-blue-800">
                  🌟 امتیاز سلامت دهان کودک: {totalScore}/100
                </span>
              </div>

              <p className="text-gray-700 text-base leading-relaxed mb-8 max-w-2xl">
                {report}
              </p>

              <motion.button
                onClick={() =>
                  navigate("/child-health-check/dental-report", {
                    state: {
                      report: {
                        name: "حنا سمواتی",
                        date: new Date().toLocaleDateString("fa-IR"),
                        score: totalScore,
                        analysis: report,
                      },
                    },
                  })
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                           text-white font-bold rounded-full shadow-[0_0_25px_rgba(100,180,255,0.6)] mt-4"
              >
                مشاهده گزارش رسمی ژنینو 🧾
              </motion.button>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </GeninoDNABackground>
  );
}
