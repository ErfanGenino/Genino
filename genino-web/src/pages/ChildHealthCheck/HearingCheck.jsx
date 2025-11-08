import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GeninoDNABackground from "../../components/GeninoDNABackground";
import { Ear, Volume2, Headphones, Bell, Mic2, AlertCircle } from "lucide-react";

/* 🌟 دکمه هماهنگ */
const Btn = ({ children, className = "", ...rest }) => (
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className={`px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-600 shadow-[0_0_20px_rgba(56,189,248,0.35)] ${className}`}
    {...rest}
  >
    {children}
  </motion.button>
);

/* 🎧 کارت سؤال با دکمه ℹ️ و پاسخ */
function QuestionCard({ icon, title, goal, reason, advice, options, value, onChange }) {
  const [showInfo, setShowInfo] = useState(false);
  const base =
    "bg-sky-50 border-sky-200 text-sky-800 hover:bg-sky-100 hover:border-sky-300 transition-all";
  const active = "bg-sky-200 border-sky-400 text-sky-900 font-semibold shadow-inner";

  return (
    <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-200">
            {icon}
          </div>
          <h4 className="font-bold text-sky-800 text-base">{title}</h4>
        </div>
        <button
          onClick={() => setShowInfo((s) => !s)}
          className="flex items-center gap-1 text-sky-700 text-sm"
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
            className="mt-3 text-sm text-gray-700 bg-sky-50 border border-sky-100 rounded-xl p-3 leading-relaxed"
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

/* ————————————————————————————————
   ✅ مرحله ۱: ساختار و علائم گوش
———————————————————————— */
function EarStructureStep({ onDone }) {
  const [answers, setAnswers] = useState({});
  const questions = [
    {
      key: "pain",
      icon: <Ear className="w-5 h-5" />,
      title: "آیا کودک هنگام لمس گوش احساس درد/حساسیت دارد؟",
      goal: "بررسی التهاب مجرا یا گوش بیرونی.",
      reason: "درد لمس می‌تواند نشانهٔ Otitis Externa باشد.",
      advice: "از گوش‌پاک‌کن استفاده نکنید؛ در صورت درد/قرمزی به پزشک مراجعه شود.",
      options: [
        { label: "خیر", value: "no", score: 3 },
        { label: "گاهی", value: "sometimes", score: 2 },
        { label: "بله", value: "yes", score: 1 },
      ],
    },
    {
      key: "discharge",
      icon: <Volume2 className="w-5 h-5" />,
      title: "ترشح گوش (مایع/بوی نامطبوع) دیده می‌شود؟",
      goal: "بررسی عفونت گوش میانی/پارگی پرده.",
      reason: "ترشح مکرر می‌تواند نشانهٔ Otitis Media یا پارگی پرده باشد.",
      advice: "گوش را خشک نگه دارید؛ معاینه تخصصی لازم است.",
      options: [
        { label: "خیر", value: "no", score: 3 },
        { label: "گاهی", value: "sometimes", score: 2 },
        { label: "بله", value: "yes", score: 1 },
      ],
    },
    {
      key: "wax",
      icon: <Bell className="w-5 h-5" />,
      title: "جرم گوش (واکس) زیاد مسیر را بسته؟",
      goal: "بررسی انسداد کانال و کاهش عبور صدا.",
      reason: "انباشته شدن جرم باعث افت شنوایی موقت می‌شود.",
      advice: "خوددرمانی نکنید؛ در صورت نیاز با شستشو/ساکشن توسط پزشک خارج شود.",
      options: [
        { label: "نه/کم", value: "no", score: 3 },
        { label: "متوسط", value: "some", score: 2 },
        { label: "زیاد", value: "many", score: 1 },
      ],
    },
    {
      key: "cold",
      icon: <Mic2 className="w-5 h-5" />,
      title: "بعد از سرماخوردگی، گوش گرفته/صدای خفه می‌شنود؟",
      goal: "بررسی عملکرد شیپور استاش و مایع گوش میانی.",
      reason: "اوتیت سروزی پس از سرماخوردگی می‌تواند افت شنوایی موقت بدهد.",
      advice: "اگر بیش از ۳–۴ هفته ادامه داشت، ارزیابی پزشکی انجام شود.",
      options: [
        { label: "خیر", value: "no", score: 3 },
        { label: "گاهی", value: "sometimes", score: 2 },
        { label: "بله", value: "yes", score: 1 },
      ],
    },
    {
      key: "balance",
      icon: <Headphones className="w-5 h-5" />,
      title: "اختلال تعادل یا زمین‌خوردن بی‌دلیل دارد؟",
      goal: "بررسی گوش داخلی (سیستم وستیبولار).",
      reason: "نارسایی وستیبولار می‌تواند به سرگیجه/بی‌ثباتی منجر شود.",
      advice: "در صورت تکرار، ارزیابی گوش داخلی/نورولوژی توصیه می‌شود.",
      options: [
        { label: "خیر", value: "no", score: 3 },
        { label: "گاهی", value: "sometimes", score: 2 },
        { label: "بله", value: "yes", score: 1 },
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
          <QuestionCard
            key={q.key}
            {...q}
            value={answers[q.key]}
            onChange={(opt) => setAnswers((p) => ({ ...p, [q.key]: opt }))}
          />
        ))}
      </div>
      <div className="flex items-center justify-between mt-6 w-full">
        <p className="text-sm text-gray-500">
          امتیاز مرحله: <span className="font-bold text-sky-700">{sumScore}/15</span>
        </p>
        <Btn disabled={!completed} onClick={() => onDone(sumScore)}>ادامه</Btn>
      </div>
    </section>
  );
}

/* ————————————————————————————————
   ✅ مرحله ۲: واکنش به صدا و گفتار
———————————————————————— */
function HearingResponseStep({ onDone }) {
  const [answers, setAnswers] = useState({});
  const questions = [
    {
      key: "name",
      icon: <Volume2 className="w-5 h-5" />,
      title: "وقتی نام کودک را صدا می‌زنید، سریع واکنش نشان می‌دهد؟",
      goal: "بررسی درک گفتار و توجه شنیداری.",
      reason: "عدم واکنش می‌تواند ناشی از افت شنوایی یا اختلال توجه باشد.",
      advice: "از فاصله و جهت‌های مختلف صدا بزنید و ثبت کنید.",
      options: [
        { label: "همیشه", value: "always", score: 3 },
        { label: "گاهی", value: "sometimes", score: 2 },
        { label: "به‌ندرت", value: "rare", score: 1 },
      ],
    },
    {
      key: "tv",
      icon: <Headphones className="w-5 h-5" />,
      title: "کودک صدای تلویزیون/تبلت را زیاد می‌کند؟",
      goal: "بررسی حساسیت عمومی به صدا.",
      reason: "تمایل به صدای بلند می‌تواند نشانهٔ کم‌شنوایی دوطرفه باشد.",
      advice: "در صورت تکرار، تست ادیومتری انجام شود.",
      options: [
        { label: "خیر", value: "no", score: 3 },
        { label: "گاهی", value: "sometimes", score: 2 },
        { label: "بله", value: "yes", score: 1 },
      ],
    },
    {
      key: "soft",
      icon: <Bell className="w-5 h-5" />,
      title: "صداهای آرام (زنگ ملایم/سکه) را به‌آسانی می‌شنود؟",
      goal: "بررسی حساسیت به فرکانس‌های بالا/شدت کم.",
      reason: "افت شنوایی اولیه معمولاً در تشخیص صداهای ظریف دیده می‌شود.",
      advice: "بازی تشخیص صدای آرام از جهات مختلف انجام دهید.",
      options: [
        { label: "بله", value: "yes", score: 3 },
        { label: "گاهی", value: "sometimes", score: 2 },
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
          <QuestionCard
            key={q.key}
            {...q}
            value={answers[q.key]}
            onChange={(opt) => setAnswers((p) => ({ ...p, [q.key]: opt }))}
          />
        ))}
      </div>
      <div className="flex items-center justify-between mt-6 w-full">
        <p className="text-sm text-gray-500">
          امتیاز مرحله: <span className="font-bold text-sky-700">{sumScore}/9</span>
        </p>
        <Btn disabled={!completed} onClick={() => onDone(sumScore)}>ادامه</Btn>
      </div>
    </section>
  );
}

/* ————————————————————————————————
   ✅ مرحله ۳: عادات محیطی و محافظت شنوایی
———————————————————————— */
function EnvironmentStep({ onDone }) {
  const [answers, setAnswers] = useState({});
  const questions = [
    {
      key: "headphone",
      icon: <Headphones className="w-5 h-5" />,
      title: "کودک از هدفون/هندزفری استفاده می‌کند؟",
      goal: "بررسی مواجهه با صدای بلند.",
      reason: "شدت بالای ۸۵ dB می‌تواند سلول‌های مویی حلزون را آسیب بزند.",
      advice: "هدفون کودک با محدودکنندهٔ ۸۵dB و زمان‌بندی استفاده (قانون ۶۰/۶۰).",
      options: [
        { label: "خیلی کم", value: "rare", score: 3 },
        { label: "گاه‌به‌گاه", value: "sometimes", score: 2 },
        { label: "زیاد", value: "often", score: 1 },
      ],
    },
    {
      key: "noise",
      icon: <Volume2 className="w-5 h-5" />,
      title: "حضور مکرر در محیط‌های پر سر و صدا (مراسم/خیابان شلوغ)؟",
      goal: "بررسی تأثیر نویز محیطی بر خستگی شنیداری.",
      reason: "نویز مزمن تمرکز را کم و حساسیت شنوایی را کاهش می‌دهد.",
      advice: "از گوش‌گیر مخصوص کودک استفاده کنید و استراحت شنیداری بدهید.",
      options: [
        { label: "نه/کم", value: "no", score: 3 },
        { label: "گاه‌به‌گاه", value: "sometimes", score: 2 },
        { label: "زیاد", value: "often", score: 1 },
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
          <QuestionCard
            key={q.key}
            {...q}
            value={answers[q.key]}
            onChange={(opt) => setAnswers((p) => ({ ...p, [q.key]: opt }))}
          />
        ))}
      </div>
      <div className="flex items-center justify-between mt-6 w-full">
        <p className="text-sm text-gray-500">
          امتیاز مرحله: <span className="font-bold text-sky-700">{sumScore}/6</span>
        </p>
        <Btn disabled={!completed} onClick={() => onDone(sumScore)}>مشاهده نتیجه</Btn>
      </div>
    </section>
  );
}

/* ————————————————————————————————
   ✅ صفحه اصلی پایش شنوایی
———————————————————————— */
export default function HearingCheck() {
  const navigate = useNavigate();
  const [step, setStep] = useState(-1); // -1 آموزش، 0..2 مراحل، 3 نتیجه
  const [ear, setEar] = useState(null);
  const [sound, setSound] = useState(null);
  const [env, setEnv] = useState(null);

  const total = (ear || 0) + (sound || 0) + (env || 0); // از 30
  const level = total >= 25 ? "طبیعی" : total >= 18 ? "نسبتاً مطلوب" : "نیازمند بررسی";

  return (
    <GeninoDNABackground strands={10} opacity={0.25} duration={90}>
      <main
        dir="rtl"
        className="relative z-10 flex flex-col items-center justify-center px-6 py-16 text-gray-800"
      >
        {/* تیتر کاملاً وسط */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-extrabold text-sky-700 mb-20 text-center drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]"
        >
          پایش شنوایی کودک 
        </motion.h1>

        <AnimatePresence mode="wait">
          {/* آموزش مقدماتی – وسط‌چین */}
          {step === -1 && (
            <motion.section
              key="edu"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl text-center"
            >
              <p className="text-gray-700 leading-relaxed mb-20">
                این پایش کمک می‌کند بدانید <strong>گوش‌ها، مسیر شنوایی و واکنش‌های کودک</strong> طبیعی هستند یا نیاز به بررسی تخصصی دارند.  
                روی هر سؤال، دکمهٔ <strong>ℹ️ چرا این سؤال؟</strong> را بزنید تا هدف، دلیل علمی و راهکار را ببینید.
              </p>
              <Btn onClick={() => setStep(0)}>شروع پایش شنوایی</Btn>
            </motion.section>
          )}

          {/* مرحله ۱ */}
          {step === 0 && (
            <motion.section
              key="s1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <div className="max-w-3xl mx-auto mb-5 text-center">
                <h3 className="text-sky-800 font-extrabold mb-2">
                  مرحله ۱ — ساختار و علائم گوش
                </h3>
                <p className="text-gray-600 text-sm">
                  درد لمس، ترشح، جرم، تأثیر سرماخوردگی و تعادل بررسی می‌شود.
                </p>
              </div>
              <EarStructureStep onDone={(score) => { setEar(score); setStep(1); }} />
            </motion.section>
          )}

          {/* مرحله ۲ */}
          {step === 1 && (
            <motion.section
              key="s2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <div className="max-w-3xl mx-auto mb-5 text-center">
                <h3 className="text-sky-800 font-extrabold mb-2">
                  مرحله ۲ — واکنش به صدا و گفتار
                </h3>
                <p className="text-gray-600 text-sm">
                  واکنش به نام، تمایل به صدای بلند و تشخیص صداهای آرام.
                </p>
              </div>
              <HearingResponseStep onDone={(score) => { setSound(score); setStep(2); }} />
            </motion.section>
          )}

          {/* مرحله ۳ */}
          {step === 2 && (
            <motion.section
              key="s3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <div className="max-w-3xl mx-auto mb-5 text-center">
                <h3 className="text-sky-800 font-extrabold mb-2">
                  مرحله ۳ — عادات محیطی و محافظت شنوایی
                </h3>
                <p className="text-gray-600 text-sm">
                  استفاده از هدفون و حضور در محیط‌های پر سر و صدا.
                </p>
              </div>
              <EnvironmentStep onDone={(score) => { setEnv(score); setStep(3); }} />
            </motion.section>
          )}

          {/* نتیجه نهایی – وسط‌چین کامل */}
          {step === 3 && (
            <motion.section
              key="result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center bg-gradient-to-br from-sky-50 via-white to-indigo-50 
                         rounded-3xl shadow-[0_0_40px_rgba(56,189,248,0.2)] p-10 mx-4 max-w-3xl border border-sky-100"
            >
              <Ear className="w-16 h-16 mb-4 text-sky-600 drop-shadow-[0_0_10px_rgba(56,189,248,0.35)]" />
              <h2 className="text-3xl font-extrabold text-sky-700 mb-2">
                گزارش هوشمند شنوایی ژنینو 🎧
              </h2>

              <p className="text-gray-700 mb-6 leading-relaxed">
                مجموع امتیاز شما: <span className="font-bold text-sky-700">{total}/30</span> — وضعیت کلی:{" "}
                <span className="font-bold text-sky-700">{level}</span>
              </p>

              <div className="grid sm:grid-cols-3 gap-6 w-full mb-8 text-right">
                <div className="bg-white rounded-2xl shadow-md p-5 border border-sky-100">
                  <h3 className="text-sky-700 font-bold mb-2">👂 ساختار گوش</h3>
                  <p className="text-gray-700 text-sm">امتیاز: {ear}/15</p>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-5 border border-sky-100">
                  <h3 className="text-sky-700 font-bold mb-2">🔊 واکنش به صدا</h3>
                  <p className="text-gray-700 text-sm">امتیاز: {sound}/9</p>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-5 border border-sky-100">
                  <h3 className="text-sky-700 font-bold mb-2">🛡️ محافظت شنوایی</h3>
                  <p className="text-gray-700 text-sm">امتیاز: {env}/6</p>
                </div>
              </div>

              {/* توصیه‌های تجمیع‌شده بر اساس نقاط ضعف */}
              <AdviceBox ear={ear} sound={sound} env={env} />

              <Btn
                onClick={() =>
                  navigate("/child-health-check/hearing-report", {
                    state: {
                      report: {
                        name: "حنا سمواتی",
                        date: new Date().toLocaleDateString("fa-IR"),
                        scores: { ear, sound, env, total },
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

        {/* دکمه بازگشت — وسط زیر مراحل ۰..۲ */}
        {step >= 0 && step <= 2 && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="mt-8 text-sm text-sky-700 underline"
            onClick={() => setStep((s) => Math.max(-1, s - 1))}
          >
            بازگشت به مرحله قبل
          </motion.button>
        )}
      </main>
    </GeninoDNABackground>
  );
}

/* 📦 جعبه توصیه‌های پویا بر اساس امتیازها */
function AdviceBox({ ear, sound, env }) {
  const tips = [];

  if (ear < 12)
    tips.push(
      "اگر درد لمس، ترشح یا گرفتگی پس از سرماخوردگی تکرار می‌شود، معاینهٔ گوش میانی/بیرونی انجام شود."
    );
  if (sound < 7)
    tips.push(
      "بازی‌های تشخیص صدای آرام از جهت‌های مختلف انجام دهید و در صورت تداوم مشکل، ادیومتری انجام شود."
    );
  if (env < 5)
    tips.push(
      "از هدفون با محدودکنندهٔ ۸۵dB استفاده کنید و زمان استفاده را کوتاه (قانون ۶۰/۶۰) نگه دارید."
    );

  if (!tips.length) return null;

  return (
    <div className="w-full text-right bg-white rounded-2xl border border-sky-100 shadow-sm p-5 mb-8">
      <h4 className="text-sky-700 font-bold mb-3">پیشنهادهای اختصاصی ژنینو:</h4>
      <ul className="list-disc pr-5 space-y-2 text-gray-700 text-sm leading-relaxed">
        {tips.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
