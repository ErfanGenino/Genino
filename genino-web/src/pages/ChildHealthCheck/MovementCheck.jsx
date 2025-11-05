import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GeninoDNABackground from "../../components/GeninoDNABackground";
import { Footprints, Hand, Move, Scale, Dumbbell, AlertCircle } from "lucide-react";

/* 🎨 دکمه استاندارد ژنینو */
const Btn = ({ children, className = "", ...rest }) => (
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className={`px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-teal-500 via-emerald-600 to-green-600 shadow-[0_0_20px_rgba(13,148,136,0.35)] ${className}`}
    {...rest}
  >
    {children}
  </motion.button>
);

/* 🧩 کارت سؤال با توضیحات هدف و دلیل علمی */
function QuestionCard({ icon, title, goal, reason, advice, options, value, onChange }) {
  const [showInfo, setShowInfo] = useState(false);
  const base = "bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100 hover:border-emerald-300 transition-all";
  const active = "bg-emerald-200 border-emerald-400 text-emerald-900 font-semibold shadow-inner";

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
            {icon}
          </div>
          <h4 className="font-bold text-emerald-800 text-base">{title}</h4>
        </div>
        <button
          onClick={() => setShowInfo((s) => !s)}
          className="flex items-center gap-1 text-emerald-700 text-sm"
          aria-label="توضیحات سؤال"
        >
          <AlertCircle className="w-5 h-5" />
          <span className="hidden sm:inline">چرا این سؤال؟</span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="mt-3 text-sm text-gray-700 bg-emerald-50 border border-emerald-100 rounded-xl p-3 leading-relaxed"
          >
            <p><strong>🎯 هدف:</strong> {goal}</p>
            <p className="mt-1"><strong>🧬 دلیل علمی:</strong> {reason}</p>
            <p className="mt-1"><strong>💡 راهکار ژنینو:</strong> {advice}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 flex flex-wrap gap-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt)}
            className={`px-4 py-2 rounded-full text-sm border ${
              value?.value === opt.value ? active : base
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ✅ نوار پیشرفت ژنینو */
function ProgressBar({ step }) {
  const progress = ((step + 1) / 3) * 100;
  const labels = ["حرکت درشت", "حرکت ظریف", "تعادل بدن"];

  return (
    <div className="w-full max-w-3xl mx-auto mb-8 text-center">
      <div className="flex justify-between text-xs sm:text-sm text-emerald-700 font-semibold mb-1 px-2">
        {labels.map((label, i) => (
          <span key={i} className={i <= step ? "text-emerald-800" : "text-emerald-400"}>
            {`مرحله ${i + 1}`} — {label}
          </span>
        ))}
      </div>
      <div className="relative w-full h-3 bg-emerald-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6 }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-400 via-emerald-500 to-green-500 shadow-[0_0_10px_rgba(13,148,136,0.4)] rounded-full"
        ></motion.div>
      </div>
      <p className="text-xs text-emerald-600 mt-2">
        {step === -1 ? "شروع نشده" : step === 3 ? "تکمیل شده ✅" : `در حال انجام: ${Math.round(progress)}٪`}
      </p>
    </div>
  );
}

/* ——————————————————————————————————
   ✅ مرحله ۱: مهارت‌های حرکتی درشت
—————————————————————————————————— */
function GrossMotorStep({ onDone }) {
  const [answers, setAnswers] = useState({});
  const questions = [
    {
      key: "balance",
      icon: <Footprints className="w-5 h-5" />,
      title: "آیا کودک می‌تواند برای چند ثانیه روی یک پا بایستد؟",
      goal: "ارزیابی تعادل و کنترل عضلات پا.",
      reason: "تعادل پایه‌ای‌ترین مهارت حرکتی درشت است.",
      advice: "تمرین بازی «روی خط راه برو» یا ایستادن روی یک پا مقابل آینه.",
      options: [
        { label: "بله، به‌راحتی", value: "yes", score: 3 },
        { label: "با کمک", value: "assist", score: 2 },
        { label: "خیر", value: "no", score: 1 },
      ],
    },
    {
      key: "stairs",
      icon: <Move className="w-5 h-5" />,
      title: "آیا بدون کمک از پله بالا و پایین می‌رود؟",
      goal: "بررسی هماهنگی و قدرت پاها.",
      reason: "حرکت روی پله‌ها به کنترل تنه و حس عمقی نیاز دارد.",
      advice: "تمرین بالا رفتن از پله با بازی و حمایت تدریجی.",
      options: [
        { label: "بله", value: "yes", score: 3 },
        { label: "نیمه", value: "half", score: 2 },
        { label: "خیر", value: "no", score: 1 },
      ],
    },
    {
      key: "run",
      icon: <Dumbbell className="w-5 h-5" />,
      title: "آیا هنگام دویدن تعادل خود را حفظ می‌کند؟",
      goal: "بررسی ثبات مرکزی بدن.",
      reason: "دویدن نیاز به کنترل تنه و عضلات لگن دارد.",
      advice: "بازی‌های دویدن با مانع یا مسیر زیگزاگ پیشنهاد می‌شود.",
      options: [
        { label: "بله، عالی", value: "good", score: 3 },
        { label: "گاهی می‌افتد", value: "sometimes", score: 2 },
        { label: "اغلب می‌افتد", value: "often", score: 1 },
      ],
    },
  ];

  const completed = questions.every((q) => !!answers[q.key]);
  const sumScore = useMemo(() => questions.reduce((s, q) => s + (answers[q.key]?.score || 0), 0), [answers]);

  return (
    <section className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <div className="grid gap-5 w-full">
        {questions.map((q) => (
          <QuestionCard key={q.key} {...q} value={answers[q.key]} onChange={(opt) => setAnswers((p) => ({ ...p, [q.key]: opt }))} />
        ))}
      </div>
      <div className="flex items-center justify-between mt-6 w-full">
        <p className="text-sm text-gray-500">امتیاز مرحله: <span className="font-bold text-emerald-700">{sumScore}/9</span></p>
        <Btn disabled={!completed} onClick={() => onDone(sumScore)}>ادامه</Btn>
      </div>
    </section>
  );
}

/* ——————————————————————————————————
   ✅ مرحله ۲: مهارت‌های حرکتی ظریف
—————————————————————————————————— */
function FineMotorStep({ onDone }) {
  const [answers, setAnswers] = useState({});
  const questions = [
    {
      key: "draw",
      icon: <Hand className="w-5 h-5" />,
      title: "آیا کودک می‌تواند نقاشی یا خط ساده بکشد؟",
      goal: "بررسی هماهنگی چشم و دست.",
      reason: "نوشتن و نقاشی پایه‌ی مهارت‌های شناختی و حرکتی‌اند.",
      advice: "تمرین نقاشی و رنگ‌آمیزی روزانه انجام شود.",
      options: [
        { label: "بله", value: "yes", score: 3 },
        { label: "کمی سخت", value: "some", score: 2 },
        { label: "خیر", value: "no", score: 1 },
      ],
    },
    {
      key: "lego",
      icon: <Dumbbell className="w-5 h-5" />,
      title: "آیا قطعات لگو را دقیق روی هم می‌گذارد؟",
      goal: "بررسی کنترل انگشتان و هماهنگی ظریف.",
      reason: "دقت در حرکات کوچک نشانه‌ی بلوغ حرکتی ظریف است.",
      advice: "بازی‌های ساختنی، پازل و مهره‌ریزی تقویت‌کننده‌اند.",
      options: [
        { label: "بله", value: "yes", score: 3 },
        { label: "نیمه", value: "mid", score: 2 },
        { label: "خیر", value: "no", score: 1 },
      ],
    },
    {
      key: "clothes",
      icon: <Move className="w-5 h-5" />,
      title: "آیا می‌تواند دکمه ببندد یا زیپ بکشد؟",
      goal: "ارزیابی استقلال عملکرد دست‌ها.",
      reason: "بستن دکمه و زیپ نشانه‌ی رشد مهارت کنترل دقیق است.",
      advice: "تمرین لباس‌پوشیدن با دکمه‌های بزرگ‌تر شروع شود.",
      options: [
        { label: "بله", value: "yes", score: 3 },
        { label: "کمی سخت", value: "some", score: 2 },
        { label: "خیر", value: "no", score: 1 },
      ],
    },
  ];

  const completed = questions.every((q) => !!answers[q.key]);
  const sumScore = useMemo(() => questions.reduce((s, q) => s + (answers[q.key]?.score || 0), 0), [answers]);

  return (
    <section className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <div className="grid gap-5 w-full">
        {questions.map((q) => (
          <QuestionCard key={q.key} {...q} value={answers[q.key]} onChange={(opt) => setAnswers((p) => ({ ...p, [q.key]: opt }))} />
        ))}
      </div>
      <div className="flex items-center justify-between mt-6 w-full">
        <p className="text-sm text-gray-500">امتیاز مرحله: <span className="font-bold text-emerald-700">{sumScore}/9</span></p>
        <Btn disabled={!completed} onClick={() => onDone(sumScore)}>ادامه</Btn>
      </div>
    </section>
  );
}

/* ——————————————————————————————————
   ✅ مرحله ۳: تعادل و هماهنگی بدن
—————————————————————————————————— */
function BalanceStep({ onDone }) {
  const [answers, setAnswers] = useState({});
  const questions = [
    {
      key: "line",
      icon: <Scale className="w-5 h-5" />,
      title: "آیا می‌تواند روی خط مستقیم بدون افتادن راه برود؟",
      goal: "بررسی سیستم تعادلی و تمرکز حرکتی.",
      reason: "راه رفتن روی خط نشان‌دهنده‌ی عملکرد صحیح حس عمقی است.",
      advice: "تمرین روی فرش یا طناب نرم انجام شود.",
      options: [
        { label: "بله، عالی", value: "good", score: 3 },
        { label: "گاهی", value: "some", score: 2 },
        { label: "خیر", value: "no", score: 1 },
      ],
    },
    {
      key: "jump",
      icon: <Footprints className="w-5 h-5" />,
      title: "آیا می‌تواند همزمان با هر دو پا بپرد؟",
      goal: "ارزیابی قدرت و هماهنگی پاها.",
      reason: "پرش با دو پا نیاز به هماهنگی حرکتی مغز و عضلات دارد.",
      advice: "بازی‌های پرشی روزانه انجام شود (مثلاً طناب بازی).",
      options: [
        { label: "بله", value: "yes", score: 3 },
        { label: "با سختی", value: "some", score: 2 },
        { label: "خیر", value: "no", score: 1 },
      ],
    },
    {
      key: "closeEyes",
      icon: <Scale className="w-5 h-5" />,
      title: "آیا با چشمان بسته می‌تواند چند ثانیه بایستد؟",
      goal: "بررسی حس تعادل در نبود ورودی بینایی.",
      reason: "در این حالت تعادل وابسته به گوش داخلی و حس عمقی است.",
      advice: "در صورت لرزش یا افتادن زیاد، تمرین تعادل با کمک انجام شود.",
      options: [
        { label: "بله", value: "yes", score: 3 },
        { label: "کمی سخت", value: "some", score: 2 },
        { label: "خیر", value: "no", score: 1 },
      ],
    },
  ];

  const completed = questions.every((q) => !!answers[q.key]);
  const sumScore = useMemo(() => questions.reduce((s, q) => s + (answers[q.key]?.score || 0), 0), [answers]);

  return (
    <section className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <div className="grid gap-5 w-full">
        {questions.map((q) => (
          <QuestionCard key={q.key} {...q} value={answers[q.key]} onChange={(opt) => setAnswers((p) => ({ ...p, [q.key]: opt }))} />
        ))}
      </div>
      <div className="flex items-center justify-between mt-6 w-full">
        <p className="text-sm text-gray-500">امتیاز مرحله: <span className="font-bold text-emerald-700">{sumScore}/9</span></p>
        <Btn disabled={!completed} onClick={() => onDone(sumScore)}>مشاهده نتیجه</Btn>
      </div>
    </section>
  );
}

/* ——————————————————————————————————
   ✅ صفحه اصلی پایش حرکتی و تعادل
—————————————————————————————————— */
export default function MovementCheck() {
  const navigate = useNavigate();
  const [step, setStep] = useState(-1);
  const [gross, setGross] = useState(null);
  const [fine, setFine] = useState(null);
  const [balance, setBalance] = useState(null);

  const total = (gross || 0) + (fine || 0) + (balance || 0); // از 27
  const level = total >= 24 ? "طبیعی" : total >= 18 ? "نسبتاً مطلوب" : "نیازمند بررسی";

  return (
    <GeninoDNABackground strands={10} opacity={0.25} duration={90}>
      <main dir="rtl" className="relative z-10 flex flex-col items-center px-6 py-16 text-gray-800">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-extrabold text-emerald-700 mb-10 text-center drop-shadow-[0_0_15px_rgba(13,148,136,0.3)]"
        >
          پایش رشد حرکتی و تعادل ⚖️
        </motion.h1>

        {step >= 0 && step <= 2 && <ProgressBar step={step} />}

        <AnimatePresence mode="wait">
          {/* آموزش مقدماتی */}
          {step === -1 && (
            <motion.section
              key="edu"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl text-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-3xl shadow-[0_0_25px_rgba(13,148,136,0.2)] p-8 border border-emerald-100"
            >
              <p className="text-gray-700 leading-relaxed mb-6">
                این پایش به شما کمک می‌کند وضعیت رشد، تعادل و کنترل حرکتی کودک را بشناسید.  
                روی هر سؤال، دکمهٔ <strong>ℹ️ چرا این سؤال؟</strong> را بزنید تا هدف، دلیل علمی و راهکار ژنینو را ببینید.
              </p>
              <Btn onClick={() => setStep(0)}>شروع پایش</Btn>
            </motion.section>
          )}

          {/* مرحله‌ها */}
          {step === 0 && <GrossMotorStep onDone={(r) => { setGross(r); setStep(1); }} />}
          {step === 1 && <FineMotorStep onDone={(r) => { setFine(r); setStep(2); }} />}
          {step === 2 && <BalanceStep onDone={(r) => { setBalance(r); setStep(3); }} />}

          {/* نتیجه نهایی */}
          {step === 3 && (
            <motion.section
              key="result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-3xl shadow-[0_0_40px_rgba(13,148,136,0.2)] p-10 mx-4 max-w-3xl border border-emerald-100"
            >
              <Move className="w-16 h-16 mb-4 text-emerald-600 drop-shadow-[0_0_10px_rgba(13,148,136,0.35)]" />
              <h2 className="text-3xl font-extrabold text-emerald-700 mb-2">
                گزارش هوشمند رشد حرکتی و تعادل ژنینو ⚖️
              </h2>

              <p className="text-gray-700 mb-6 leading-relaxed">
                مجموع امتیاز شما: <span className="font-bold text-emerald-700">{total}/27</span> — وضعیت کلی:{" "}
                <span className="font-bold text-emerald-700">{level}</span>
              </p>

              <div className="grid sm:grid-cols-3 gap-6 w-full mb-8 text-right">
                <div className="bg-white rounded-2xl shadow-md p-5 border border-emerald-100">
                  <h3 className="text-emerald-700 font-bold mb-2">🏃‍♀️ حرکت درشت</h3>
                  <p className="text-gray-700 text-sm">امتیاز: {gross}/9</p>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-5 border border-emerald-100">
                  <h3 className="text-emerald-700 font-bold mb-2">✋ حرکت ظریف</h3>
                  <p className="text-gray-700 text-sm">امتیاز: {fine}/9</p>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-5 border border-emerald-100">
                  <h3 className="text-emerald-700 font-bold mb-2">⚖️ تعادل</h3>
                  <p className="text-gray-700 text-sm">امتیاز: {balance}/9</p>
                </div>
              </div>

              <AdviceBox gross={gross} fine={fine} balance={balance} />

              <Btn
                onClick={() =>
                  navigate("/child-health-check/motor-report", {
                    state: {
                      report: {
                        name: "حنا سمواتی",
                        date: new Date().toLocaleDateString("fa-IR"),
                        scores: { gross, fine, balance, total },
                        level,
                      },
                    },
                  })
                }
                className="mt-2"
              >
                مشاهده گزارش رسمی ژنینو 🧾
              </Btn>
            </motion.section>
          )}
        </AnimatePresence>

        {step >= 0 && step <= 2 && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="mt-8 text-sm text-emerald-700 underline"
            onClick={() => setStep((s) => Math.max(-1, s - 1))}
          >
            بازگشت به مرحله قبل
          </motion.button>
        )}
      </main>
    </GeninoDNABackground>
  );
}

/* 🎯 توصیه‌های اختصاصی ژنینو */
function AdviceBox({ gross, fine, balance }) {
  const tips = [];
  if (gross < 7) tips.push("تمرین‌های روزانه برای تقویت پاها و هماهنگی حرکات درشت انجام دهید.");
  if (fine < 7) tips.push("خمیر بازی، پازل و فعالیت‌های دستی برای تقویت مهارت‌های ظریف توصیه می‌شود.");
  if (balance < 7) tips.push("بازی‌های تعادلی مانند ایستادن روی خط یا توپ‌ بازی انجام شود.");

  if (!tips.length) return null;

  return (
    <div className="w-full text-right bg-white rounded-2xl border border-emerald-100 shadow-sm p-5 mb-8">
      <h4 className="text-emerald-700 font-bold mb-3">پیشنهادهای اختصاصی ژنینو:</h4>
      <ul className="list-disc pr-5 space-y-2 text-gray-700 text-sm leading-relaxed">
        {tips.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
