// 📄 src/pages/ChildHealthCheck/MovementCheck.jsx
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GeninoDNABackground from "@components/Core/GeninoDNABackground";
import GeninoAssessmentStart from "@components/Assessments/GeninoAssessmentStart";
import GeninoReportBox from "@components/Reports/GeninoReportBox";
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

/* 🧩 کارت سؤال ژنینو */
function QuestionCard({ icon, title, goal, reason, advice, options, value, onChange }) {
  const [showInfo, setShowInfo] = useState(false);
  const base =
    "bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100 hover:border-emerald-300 transition-all";
  const active =
    "bg-emerald-200 border-emerald-400 text-emerald-900 font-semibold shadow-inner";

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

      {value && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-[13px] leading-relaxed bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3"
        >
          <span className="font-semibold">پیشنهاد ژنینو: </span>
          {value?.advice || "خوب پیش می‌روید!"}
        </motion.div>
      )}
    </div>
  );
}

/* ——— مرحله ۱ ——— */
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
  const sumScore = useMemo(
    () => questions.reduce((s, q) => s + (answers[q.key]?.score || 0), 0),
    [answers]
  );

  return (
    <section className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <div className="grid gap-5 w-full">
        {questions.map((q) => (
          <QuestionCard key={q.key} {...q} value={answers[q.key]} onChange={(opt) => setAnswers((p) => ({ ...p, [q.key]: opt }))} />
        ))}
      </div>
      <div className="flex items-center justify-between mt-6 w-full">
        <p className="text-sm text-gray-500">
          امتیاز مرحله:{" "}
          <span className="font-bold text-emerald-700">{sumScore}/9</span>
        </p>
        <Btn disabled={!completed} onClick={() => onDone(sumScore)}>
          ادامه
        </Btn>
      </div>
    </section>
  );
}

/* ——— مرحله ۲ ——— */
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
  const sumScore = useMemo(
    () => questions.reduce((s, q) => s + (answers[q.key]?.score || 0), 0),
    [answers]
  );

  return (
    <section className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <div className="grid gap-5 w-full">
        {questions.map((q) => (
          <QuestionCard key={q.key} {...q} value={answers[q.key]} onChange={(opt) => setAnswers((p) => ({ ...p, [q.key]: opt }))} />
        ))}
      </div>
      <div className="flex items-center justify-between mt-6 w-full">
        <p className="text-sm text-gray-500">
          امتیاز مرحله:{" "}
          <span className="font-bold text-emerald-700">{sumScore}/9</span>
        </p>
        <Btn disabled={!completed} onClick={() => onDone(sumScore)}>
          ادامه
        </Btn>
      </div>
    </section>
  );
}

/* ——— مرحله ۳ ——— */
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
  const sumScore = useMemo(
    () => questions.reduce((s, q) => s + (answers[q.key]?.score || 0), 0),
    [answers]
  );

  return (
    <section className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <div className="grid gap-5 w-full">
        {questions.map((q) => (
          <QuestionCard key={q.key} {...q} value={answers[q.key]} onChange={(opt) => setAnswers((p) => ({ ...p, [q.key]: opt }))} />
        ))}
      </div>
      <div className="flex items-center justify-between mt-6 w-full">
        <p className="text-sm text-gray-500">
          امتیاز مرحله:{" "}
          <span className="font-bold text-emerald-700">{sumScore}/9</span>
        </p>
        <Btn disabled={!completed} onClick={() => onDone(sumScore)}>
          مشاهده نتیجه
        </Btn>
      </div>
    </section>
  );
}

/* ——— صفحه اصلی پایش رشد حرکتی ——— */
export default function MovementCheck() {
  const navigate = useNavigate();
  const [step, setStep] = useState(-1);
  const [gross, setGross] = useState(null);
  const [fine, setFine] = useState(null);
  const [balance, setBalance] = useState(null);
  const total = (gross || 0) + (fine || 0) + (balance || 0);
  const level =
    total >= 24 ? "طبیعی" : total >= 18 ? "نسبتاً مطلوب" : "نیازمند بررسی";

  return (
    <GeninoDNABackground strands={10} opacity={0.25} duration={90}>
      <main dir="rtl" className="relative z-10 flex flex-col items-center justify-center px-6 py-16 text-gray-800">
        <AnimatePresence mode="wait">
          <GeninoAssessmentStart
            step={step}
            setStep={setStep}
            title="پایش رشد حرکتی و تعادل"
            description={`این پایش به شما کمک می‌کند وضعیت رشد، تعادل و کنترل حرکتی کودک را بشناسید.
روی هر سؤال، دکمهٔ ℹ️ «چرا این سؤال؟» را بزنید تا هدف، دلیل علمی و راهکار ژنینو را ببینید.`}
            color="emerald"
            buttonLabel="شروع پایش رشد حرکتی و تعادل"
          />

          {step === 0 && <GrossMotorStep onDone={(r) => { setGross(r); setStep(1); }} />}
          {step === 1 && <FineMotorStep onDone={(r) => { setFine(r); setStep(2); }} />}
          {step === 2 && <BalanceStep onDone={(r) => { setBalance(r); setStep(3); }} />}

          {step === 3 && (
            <motion.div key="result" className="w-full flex flex-col items-center">
              <GeninoReportBox
                title="رشد حرکتی و تعادل کودک"
                color="emerald"
                sections={[
                  {
                    title: "🏃‍♀️ حرکت درشت",
                    score: gross,
                    max: 9,
                    status: gross >= 7 ? "طبیعی" : gross >= 5 ? "نسبتاً مطلوب" : "نیازمند توجه",
                    desc: "ارزیابی مهارت‌های پا، تنه و دویدن برای سنجش کنترل کلی بدن.",
                  },
                  {
                    title: "✋ حرکت ظریف",
                    score: fine,
                    max: 9,
                    status: fine >= 7 ? "طبیعی" : fine >= 5 ? "نسبتاً مطلوب" : "نیازمند توجه",
                    desc: "بررسی هماهنگی چشم و دست در کارهای ظریف مثل نقاشی یا بستن دکمه.",
                  },
                  {
                    title: "⚖️ تعادل بدن",
                    score: balance,
                    max: 9,
                    status: balance >= 7 ? "خوب" : balance >= 5 ? "قابل بهبود" : "ضعیف",
                    desc: "ارزیابی توانایی حفظ تعادل و کنترل وضعیت بدن.",
                  },
                ]}
                summary={`مجموع امتیاز ${total}/27 است و وضعیت کلی کودک "${level}" ارزیابی می‌شود.`}
                tips={[
                  ...(gross < 7 ? ["تمرین‌های حرکتی درشت مثل دویدن و بالا رفتن از پله انجام شود."] : []),
                  ...(fine < 7 ? ["بازی‌های ظریف دستی مانند پازل و خمیر بازی انجام شود."] : []),
                  ...(balance < 7 ? ["تمرین تعادل روی خط یا توپ پیشنهاد می‌شود."] : []),
                ]}
                reportDate={new Date()}
                onSnapshot={() => {
                  const newReport = {
                    id: crypto.randomUUID(),
                    type: "movement",
                    label: `رشد حرکتی ${new Date().toLocaleDateString("fa-IR")}`,
                    date: new Date().toISOString(),
                    data: { gross, fine, balance, total, level },
                  };
                  const prev = JSON.parse(localStorage.getItem("childReports") || "[]");
                  localStorage.setItem("childReports", JSON.stringify([newReport, ...prev]));
                  console.log("✅ گزارش رشد حرکتی ذخیره شد:", newReport);
                }}
              />

              <Btn className="mt-6" onClick={() => navigate("/reports/child-health")}>
                رفتن به بایگانی گزارش‌های کودک 📁
              </Btn>
            </motion.div>
          )}
        </AnimatePresence>

        {step >= 0 && step <= 2 && (
          <motion.button whileHover={{ scale: 1.03 }} className="mt-8 text-sm text-emerald-700 underline" onClick={() => setStep((s) => Math.max(-1, s - 1))}>
            بازگشت به مرحله قبل
          </motion.button>
        )}
      </main>
    </GeninoDNABackground>
  );
}
