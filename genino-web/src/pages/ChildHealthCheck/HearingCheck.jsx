import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GeninoDNABackground from "@components/Core/GeninoDNABackground";
import { Ear, Volume2, Headphones, Bell, Mic2, AlertCircle } from "lucide-react";
import GeninoAssessmentStart from "@components/Assessments/GeninoAssessmentStart";
import html2canvas from "html2canvas";

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

/* 🎧 کارت سؤال */
function QuestionCard({ icon, title, goal, options, value, onChange }) {
  const [showInfo, setShowInfo] = useState(false);
  const base = "bg-sky-50 border-sky-200 text-sky-800 hover:bg-sky-100 hover:border-sky-300 transition-all";
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
        <button onClick={() => setShowInfo((s) => !s)} className="flex items-center gap-1 text-sky-700 text-sm" aria-label="توضیحات سؤال">
          <AlertCircle className="w-5 h-5" />
          <span className="hidden sm:inline">چرا این سؤال؟</span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {showInfo && (
          <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="mt-3 text-gray-600 text-sm leading-relaxed">
            هدف: {goal}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="mt-4 flex flex-wrap gap-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt)}
            className={`px-4 py-2 rounded-full text-sm border ${value?.value === opt.value ? active : base}`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {value && value.advice && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-[13px] leading-relaxed bg-sky-50 border border-sky-200 text-sky-800 rounded-xl p-3">
          <span className="font-semibold">پیشنهاد ژنینو: </span>
          {value.advice}
        </motion.div>
      )}
    </div>
  );
}

/* ——— مرحله ۱ ——— */
function EarStructureStep({ onDone }) {
  const [answers, setAnswers] = useState({});
  const [showWarning, setShowWarning] = useState(false);

  const questions = [
    {
      key: "pain",
      icon: <Ear className="w-5 h-5" />,
      title: "آیا کودک هنگام لمس گوش احساس درد یا حساسیت دارد؟",
      goal: "بررسی التهاب یا تحریک مجرای گوش بیرونی (Otitis Externa).",
      options: [
        { label: "خیر", value: "no", score: 3, advice: "خیلی خوب، نشانه‌ای از التهاب وجود ندارد." },
        { label: "گاهی", value: "sometimes", score: 2, advice: "اگر با قرمزی یا ترشح همراه بود، نیاز به بررسی پزشکی دارد." },
        { label: "بله", value: "yes", score: 1, advice: "احتمال التهاب وجود دارد؛ از گوش‌پاک‌کن استفاده نکنید و با پزشک مشورت کنید." },
      ],
    },
    {
      key: "discharge",
      icon: <Volume2 className="w-5 h-5" />,
      title: "آیا ترشح یا بوی نامطبوع از گوش مشاهده می‌شود؟",
      goal: "بررسی احتمال عفونت گوش میانی یا پارگی پرده گوش.",
      options: [
        { label: "خیر", value: "no", score: 3, advice: "خیلی خوب، وضعیت طبیعی است." },
        { label: "گاهی", value: "sometimes", score: 2, advice: "در صورت تکرار ترشح، بررسی پزشک اطفال یا متخصص گوش ضروری است." },
        { label: "بله", value: "yes", score: 1, advice: "گوش را خشک نگه دارید و به پزشک مراجعه کنید." },
      ],
    },
    {
      key: "wax",
      icon: <Bell className="w-5 h-5" />,
      title: "آیا جرم گوش زیاد است و مسیر را بسته؟",
      goal: "بررسی انسداد کانال گوش و کاهش عبور صدا.",
      options: [
        { label: "نه / کم", value: "no", score: 3, advice: "خیلی خوب، وضعیت طبیعی است." },
        { label: "متوسط", value: "some", score: 2, advice: "در صورت احساس گرفتگی، با محلول نرم‌کننده گوش تمیز شود." },
        { label: "زیاد", value: "many", score: 1, advice: "به هیچ‌وجه گوش‌پاک‌کن استفاده نکنید؛ شستشو فقط توسط پزشک انجام شود." },
      ],
    },
    {
      key: "cold",
      icon: <Mic2 className="w-5 h-5" />,
      title: "آیا پس از سرماخوردگی، گوش گرفته یا صدای خفه می‌شنود؟",
      goal: "بررسی عملکرد شیپور استاش و مایع گوش میانی.",
      options: [
        { label: "خیر", value: "no", score: 3, advice: "خیلی خوب، عملکرد طبیعی است." },
        { label: "گاهی", value: "sometimes", score: 2, advice: "اگر احساس خفگی صدا بیش از چند روز طول کشید، معاینه انجام شود." },
        { label: "بله", value: "yes", score: 1, advice: "در صورت تداوم بیش از ۳–۴ هفته، مراجعه به پزشک ضروری است." },
      ],
    },
    {
      key: "balance",
      icon: <Headphones className="w-5 h-5" />,
      title: "آیا کودک دچار بی‌تعادلی یا زمین‌خوردن بی‌دلیل می‌شود؟",
      goal: "بررسی عملکرد سیستم وستیبولار (گوش داخلی).",
      options: [
        { label: "خیر", value: "no", score: 3, advice: "خیلی خوب، تعادل حرکتی طبیعی است." },
        { label: "گاهی", value: "sometimes", score: 2, advice: "در صورت تکرار، بررسی گوش داخلی یا بینایی توصیه می‌شود." },
        { label: "بله", value: "yes", score: 1, advice: "ممکن است گوش داخلی درگیر باشد؛ مراجعه به پزشک ضروری است." },
      ],
    },
  ];

  const completed = questions.every((q) => !!answers[q.key]);
  const sumScore = useMemo(() => questions.reduce((s, q) => s + (answers[q.key]?.score || 0), 0), [answers]);

  const handleNext = () => {
    if (!completed) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 2500);
      return;
    }
    onDone(sumScore);
  };

  return (
    <section className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <div className="grid gap-5 w-full">
        {questions.map((q) => (
          <QuestionCard key={q.key} {...q} value={answers[q.key]} onChange={(opt) => setAnswers((p) => ({ ...p, [q.key]: opt }))} />
        ))}
      </div>

      <AnimatePresence>
        {showWarning && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.4 }} className="text-red-500 text-sm mt-3 font-medium">
            لطفاً ابتدا به همهٔ سؤالات این مرحله پاسخ دهید.
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mt-6 w-full">
        <p className="text-sm text-gray-500">
          امتیاز مرحله: <span className="font-bold text-sky-700">{sumScore}/15</span>
        </p>
        <Btn onClick={handleNext}>ادامه</Btn>
      </div>
    </section>
  );
}

/* ——— مرحله ۲ ——— */
function HearingResponseStep({ onDone }) {
  const [answers, setAnswers] = useState({});
  const [showWarning, setShowWarning] = useState(false);

  const questions = [
    {
      key: "name",
      icon: <Volume2 className="w-5 h-5" />,
      title: "وقتی نام کودک را صدا می‌زنید، سریع واکنش نشان می‌دهد؟",
      goal: "بررسی درک گفتار و توجه شنیداری.",
      options: [
        { label: "همیشه", value: "always", score: 3, advice: "خیلی خوب، حساسیت شنیداری کودک طبیعی است." },
        { label: "گاهی", value: "sometimes", score: 2, advice: "در فضاهای آرام‌تر تمرین کنید و واکنش‌ها را ثبت کنید." },
        { label: "به‌ندرت", value: "rare", score: 1, advice: "ممکن است افت شنوایی یا اختلال توجه وجود داشته باشد؛ تست ادیومتری توصیه می‌شود." },
      ],
    },
    {
      key: "tv",
      icon: <Headphones className="w-5 h-5" />,
      title: "آیا کودک صدای تلویزیون یا تبلت را زیاد می‌کند؟",
      goal: "بررسی حساسیت عمومی به صدا.",
      options: [
        { label: "خیر", value: "no", score: 3, advice: "خیلی خوب، حساسیت شنوایی طبیعی است." },
        { label: "گاهی", value: "sometimes", score: 2, advice: "اگر در محیط شلوغ اتفاق می‌افتد، طبیعی است؛ در حالت عادی تکرار نشود." },
        { label: "بله", value: "yes", score: 1, advice: "اگر به‌صورت مداوم اتفاق می‌افتد، احتمال افت شنوایی دوطرفه وجود دارد." },
      ],
    },
    {
      key: "soft",
      icon: <Bell className="w-5 h-5" />,
      title: "آیا صداهای آرام (مثلاً زنگ ملایم یا سکه) را به‌آسانی می‌شنود؟",
      goal: "بررسی حساسیت به صداهای با شدت کم.",
      options: [
        { label: "بله", value: "yes", score: 3, advice: "خیلی خوب، حساسیت شنوایی کامل است." },
        { label: "گاهی", value: "sometimes", score: 2, advice: "تمرین بازی تشخیص صدای آرام از جهات مختلف مفید است." },
        { label: "خیر", value: "no", score: 1, advice: "ممکن است افت شنوایی اولیه باشد؛ ارزیابی ادیومتری توصیه می‌شود." },
      ],
    },
  ];

  const completed = questions.every((q) => !!answers[q.key]);
  const sumScore = useMemo(() => questions.reduce((s, q) => s + (answers[q.key]?.score || 0), 0), [answers]);

  const handleNext = () => {
    if (!completed) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 2500);
      return;
    }
    onDone(sumScore);
  };

  return (
    <section className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <div className="grid gap-5 w-full">
        {questions.map((q) => (
          <QuestionCard key={q.key} {...q} value={answers[q.key]} onChange={(opt) => setAnswers((p) => ({ ...p, [q.key]: opt }))} />
        ))}
      </div>

      <AnimatePresence>
        {showWarning && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.4 }} className="text-red-500 text-sm mt-3 font-medium">
            لطفاً ابتدا به همهٔ سؤالات این مرحله پاسخ دهید.
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mt-6 w-full">
        <p className="text-sm text-gray-500">
          امتیاز مرحله: <span className="font-bold text-sky-700">{sumScore}/15</span>
        </p>
        <Btn onClick={handleNext}>ادامه</Btn>
      </div>
    </section>
  );
}

/* ——— مرحله ۳ ——— */
function EnvironmentStep({ onDone }) {
  const [answers, setAnswers] = useState({});
  const [showWarning, setShowWarning] = useState(false);

  const questions = [
    {
      key: "headphone",
      icon: <Headphones className="w-5 h-5" />,
      title: "آیا کودک از هدفون یا هندزفری استفاده می‌کند؟",
      goal: "بررسی میزان مواجهه با صدای بلند.",
      options: [
        { label: "خیلی کم", value: "rare", score: 3, advice: "خیلی خوب، گوش کودک در معرض صدای زیاد قرار ندارد." },
        { label: "گاه‌به‌گاه", value: "sometimes", score: 2, advice: "در صورت استفاده، زمان گوش دادن کمتر از ۶۰ دقیقه و صدا زیر ۶۰٪ باشد." },
        { label: "زیاد", value: "often", score: 1, advice: "حتماً از هدفون با محدودکنندهٔ ۸۵dB و قانون ۶۰/۶۰ استفاده کنید." },
      ],
    },
    {
      key: "noise",
      icon: <Volume2 className="w-5 h-5" />,
      title: "آیا کودک زیاد در محیط‌های پر سر و صدا (مراسم، خیابان شلوغ) حضور دارد؟",
      goal: "بررسی اثر نویز محیطی بر سلامت شنوایی.",
      options: [
        { label: "نه / کم", value: "no", score: 3, advice: "خیلی خوب، مواجهه با نویز زیاد نیست." },
        { label: "گاه‌به‌گاه", value: "sometimes", score: 2, advice: "در محیط‌های پر سر و صدا، گوش‌گیر کودک استفاده شود." },
        { label: "زیاد", value: "often", score: 1, advice: "استفاده از گوش‌گیر و فاصله‌گرفتن از منبع صدا ضروری است." },
      ],
    },
  ];

  const completed = questions.every((q) => !!answers[q.key]);
  const sumScore = useMemo(() => questions.reduce((s, q) => s + (answers[q.key]?.score || 0), 0), [answers]);

  const handleNext = () => {
    if (!completed) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 2500);
      return;
    }
    onDone(sumScore);
  };

  return (
    <section className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <div className="grid gap-5 w-full">
        {questions.map((q) => (
          <QuestionCard key={q.key} {...q} value={answers[q.key]} onChange={(opt) => setAnswers((p) => ({ ...p, [q.key]: opt }))} />
        ))}
      </div>

      <AnimatePresence>
        {showWarning && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.4 }} className="text-red-500 text-sm mt-3 font-medium">
            لطفاً ابتدا به همهٔ سؤالات این مرحله پاسخ دهید.
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mt-6 w-full">
        <p className="text-sm text-gray-500">
          امتیاز مرحله: <span className="font-bold text-sky-700">{sumScore}/15</span>
        </p>
        <Btn onClick={handleNext}>ادامه</Btn>
      </div>
    </section>
  );
}

/* ——— صفحه اصلی پایش شنوایی ——— */
export default function HearingCheck() {
  const navigate = useNavigate();
  const [step, setStep] = useState(-1); // -1 آموزش، 0..2 مراحل، 3 نتیجه
  const [ear, setEar] = useState(null);
  const [sound, setSound] = useState(null);
  const [env, setEnv] = useState(null);

  // برای ذخیره تصویر گزارش
  const reportRef = useRef(null);
  const [savedOnce, setSavedOnce] = useState(false);

  const total = (ear || 0) + (sound || 0) + (env || 0);
  const level = total >= 25 ? "طبیعی" : total >= 18 ? "نسبتاً مطلوب" : "نیازمند بررسی";


// ✅ ذخیره تصویر گزارش با تاخیر ایمن بعد از رندر
useEffect(() => {
  if (step !== 3 || savedOnce) return; // فقط وقتی به مرحله ۳ رسیدیم

  const timer = setTimeout(async () => {
    try {
      const target = reportRef.current;
      if (!target) return; // اگه هنوز رندر نشده بود، خروج

      console.log("📸 شروع گرفتن عکس گزارش...");

      // 🧩 حذف موقت DNA و افکت‌های شفاف برای جلوگیری از سیاهی
      const dnaLayers = document.querySelectorAll(".genino-dna");
      dnaLayers.forEach((el) => (el.style.display = "none"));

      const oldFilter = target.style.backdropFilter;
      const oldOpacity = target.style.opacity;
      target.style.backdropFilter = "none";
      target.style.opacity = "1";
      target.style.backgroundColor = "#ffffff";

      // 📏 وضوح کنترل‌شده برای موبایل و لپ‌تاپ
      const scale = window.devicePixelRatio > 2 ? 2.5 : 2;
      const canvas = await html2canvas(target, {
        scale,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        scrollX: 0,
        scrollY: 0,
      });

      // ♻️ برگرداندن حالت قبلی صفحه
      dnaLayers.forEach((el) => (el.style.display = ""));
      target.style.backdropFilter = oldFilter;
      target.style.opacity = oldOpacity;

      // ✂️ حذف حاشیه‌های سفید
      const trimmed = trimWhite(canvas);
      const image = trimmed.toDataURL("image/jpeg", 0.95);

      // 🧠 ذخیره در localStorage
      const label = `شنوایی ${new Date().toLocaleDateString("fa-IR")}`;
      const newReport = {
        id: crypto.randomUUID(), // 👈 شناسه یکتا
        label,
        image,
        date: new Date().toISOString(),
        meta: { ear, sound, env, total, level },
      };

      const prev = JSON.parse(localStorage.getItem("hearingReports") || "[]");
      localStorage.setItem("hearingReports", JSON.stringify([newReport, ...prev]));

      setSavedOnce(true);
      console.log("✅ گزارش ذخیره شد:", newReport);
    } catch (e) {
      console.error("🚨 خطا در ذخیره گزارش:", e);
    }
  }, 1500);

  return () => clearTimeout(timer);
}, [step, savedOnce, ear, sound, env, total, level]);



  return (
    <GeninoDNABackground strands={10} opacity={0.25} duration={90}>
      <main dir="rtl" className="relative z-10 flex flex-col items-center justify-center px-6 py-16 text-gray-800">
        <AnimatePresence mode="wait">
          <GeninoAssessmentStart
            step={step}
            setStep={setStep}
            title="پایش شنوایی کودک"
            description={`این پایش کمک می‌کند بدانید گوش‌ها، مسیر شنوایی و واکنش‌های کودک طبیعی هستند یا نیاز به بررسی تخصصی دارند.
روی هر سؤال، دکمهٔ ℹ️ «چرا این سؤال؟» را بزنید تا هدف، دلیل علمی و راهکار را ببینید.`}
            color="sky"
            buttonLabel="شروع پایش شنوایی"
          />

          {step === 0 && (
            <motion.section key="s1" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.6 }} className="w-full">
              <div className="max-w-3xl mx-auto mb-5 text-center">
                <h3 className="text-sky-800 font-extrabold mb-2">مرحله ۱ — ساختار و علائم گوش</h3>
                <p className="text-gray-600 text-sm">درد لمس، ترشح، جرم، تأثیر سرماخوردگی و تعادل بررسی می‌شود.</p>
              </div>
              <EarStructureStep onDone={(score) => { setEar(score); setStep(1); }} />
            </motion.section>
          )}

          {step === 1 && (
            <motion.section key="s2" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.6 }} className="w-full">
              <div className="max-w-3xl mx-auto mb-5 text-center">
                <h3 className="text-sky-800 font-extrabold mb-2">مرحله ۲ — واکنش به صدا و گفتار</h3>
                <p className="text-gray-600 text-sm">واکنش به نام، تمایل به صدای بلند و تشخیص صداهای آرام.</p>
              </div>
              <HearingResponseStep onDone={(score) => { setSound(score); setStep(2); }} />
            </motion.section>
          )}

          {step === 2 && (
            <motion.section key="s3" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.6 }} className="w-full">
              <div className="max-w-3xl mx-auto mb-5 text-center">
                <h3 className="text-sky-800 font-extrabold mb-2">مرحله ۳ — عادات محیطی و محافظت شنوایی</h3>
                <p className="text-gray-600 text-sm">استفاده از هدفون و حضور در محیط‌های پر سر و صدا.</p>
              </div>
              <EnvironmentStep onDone={(score) => { setEnv(score); setStep(3); }} />
            </motion.section>
          )}

          {step === 3 && (
            <motion.section
              ref={reportRef}
              key="result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center bg-gradient-to-br from-sky-50 via-white to-indigo-50 rounded-3xl shadow-[0_0_40px_rgba(56,189,248,0.2)] p-10 mx-4 max-w-3xl border border-sky-100"
            >
              <Ear className="w-16 h-16 mb-4 text-sky-600 drop-shadow-[0_0_10px_rgba(56,189,248,0.35)]" />
              <h2 className="text-3xl font-extrabold text-sky-700 mb-4">گزارش هوشمند شنوایی ژنینو 🎧</h2>

              <p className="text-gray-700 mb-6 leading-relaxed text-justify">
                در این پایش سه مرحله‌ای، وضعیت شنوایی کودک بر اساس <strong>ساختار گوش، واکنش به صدا و عادات محیطی</strong> بررسی شد.
                هدف این تست، شناسایی زودهنگام مشکلات احتمالی گوش میانی یا کاهش حساسیت به صداست.
                <br />
                نتایج زیر بر اساس پاسخ‌های شما تحلیل شده است:
              </p>

              <div className="grid sm:grid-cols-3 gap-6 w-full mb-8 text-right">
                <div className="bg-white rounded-2xl shadow-md p-5 border border-sky-100">
                  <h3 className="text-sky-700 font-bold mb-2">👂 ساختار گوش</h3>
                  <p className="text-gray-700 text-sm">
                    امتیاز: {ear}/15 —{" "}
                    {ear >= 12 ? <span className="text-green-600 font-semibold">طبیعی</span> : ear >= 9 ? <span className="text-yellow-600 font-semibold">نسبتاً طبیعی</span> : <span className="text-red-600 font-semibold">نیاز به بررسی</span>}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    این مرحله سلامت فیزیکی گوش (مانند التهاب، ترشح، جرم و تعادل) را ارزیابی می‌کند. امتیاز پایین در این بخش معمولاً نشانگر
                    التهاب گوش بیرونی یا عملکرد نامناسب شیپور استاش است.
                    <br />
                    <em className="text-gray-400">(شیپور استاش: مجرایی که فشار گوش میانی را با محیط تنظیم می‌کند.)</em>
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-5 border border-sky-100">
                  <h3 className="text-sky-700 font-bold mb-2">🔊 واکنش به صدا و گفتار</h3>
                  <p className="text-gray-700 text-sm">
                    امتیاز: {sound}/9 —{" "}
                    {sound >= 7 ? <span className="text-green-600 font-semibold">طبیعی</span> : sound >= 5 ? <span className="text-yellow-600 font-semibold">نسبتاً طبیعی</span> : <span className="text-red-600 font-semibold">نیاز به بررسی</span>}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    این بخش توانایی تشخیص و تمرکز کودک بر صداهای محیطی را می‌سنجد؛ از واکنش به صداهای معمول تا حساسیت به صداهای آرام.
                    امتیاز پایین ممکن است نشانگر کاهش حساسیت دوطرفهٔ شنوایی باشد.
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-5 border border-sky-100">
                  <h3 className="text-sky-700 font-bold mb-2">🛡️ عادات و محیط شنوایی</h3>
                  <p className="text-gray-700 text-sm">
                    امتیاز: {env}/6 —{" "}
                    {env >= 5 ? <span className="text-green-600 font-semibold">ایمن</span> : env >= 4 ? <span className="text-yellow-600 font-semibold">قابل بهبود</span> : <span className="text-red-600 font-semibold">در معرض خطر</span>}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    این مرحله، عادات صوتی کودک (مثل استفاده از هدفون یا حضور در محیط‌های پر سروصدا) را بررسی می‌کند. مواجههٔ مداوم با صداهای بالای ۸۵ دسی‌بل
                    می‌تواند باعث آسیب سلول‌های مویی گوش داخلی شود.
                    <br />
                    <em className="text-gray-400">(dB: واحد شدت صدا؛ خیابان شلوغ ≈ ۸۵dB)</em>
                  </p>
                </div>
              </div>

              <div className="w-full text-right bg-white rounded-2xl border border-sky-100 shadow-sm p-6 mb-8">
                <h4 className="text-sky-700 font-bold mb-3">🔍 تفسیر نهایی وضعیت شنوایی کودک:</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  مجموع امتیاز این پایش <strong>{total}/30</strong> است که بیانگر وضعیت{" "}
                  <strong className="text-sky-700">{level}</strong> می‌باشد.
                  {level === "طبیعی" && <> شنوایی کودک در محدودهٔ سالم است و عملکرد گوش داخلی و میانی مناسب است.</>}
                  {level === "نسبتاً مطلوب" && <> بعضی از شاخص‌ها نیاز به توجه بیشتر دارند. بهتر است طی دو ماه آینده دوباره بررسی شود.</>}
                  {level === "نیازمند بررسی" && <> توصیه می‌شود جهت بررسی تخصصی‌تر، تست ادیومتری (Audiometry) انجام شود تا حساسیت فرکانسی گوش کودک ارزیابی گردد.</>}
                </p>
              </div>

              <AdviceBox ear={ear} sound={sound} env={env} />

              <Btn className="mt-2" onClick={() => navigate("/reports/child-health")}>
                رفتن به بایگانی گزارش‌های کودک 📁
              </Btn>
            </motion.section>
          )}
        </AnimatePresence>

        {step >= 0 && step <= 2 && (
          <motion.button whileHover={{ scale: 1.03 }} className="mt-8 text-sm text-sky-700 underline" onClick={() => setStep((s) => Math.max(-1, s - 1))}>
            بازگشت به مرحله قبل
          </motion.button>
        )}
      </main>
    </GeninoDNABackground>
  );
}

/* 📦 پیشنهادهای اختصاصی ژنینو */
function AdviceBox({ ear, sound, env }) {
  const tips = [];
  if (ear < 12) tips.push("گوش کودک را از نظر جرم زیاد یا ترشح بررسی کنید. اگر درد، قرمزی یا ترشح مداوم مشاهده شد، مراجعه به پزشک متخصص گوش توصیه می‌شود.");
  if (sound < 7) tips.push("واکنش کودک به صداهای آرام و مکالمات روزمره را زیر نظر بگیرید. اگر پاسخ‌دهی کاهش یافت، ادیومتری برای بررسی آستانهٔ شنوایی انجام شود.");
  if (env < 5) tips.push("قرارگیری طولانی در محیط‌های پر سر و صدا یا استفاده از هدفون بلند می‌تواند آسیب‌زا باشد. قانون ۶۰/۶۰ (حداکثر ۶۰ دقیقه با صدای زیر ۶۰٪) را رعایت کنید.");

  if (!tips.length)
    return (
      <div className="w-full text-right bg-white rounded-2xl border border-green-100 shadow-sm p-5 mb-6">
        <h4 className="text-green-700 font-bold mb-2">💚 تبریک!</h4>
        <p className="text-gray-700 text-sm leading-relaxed">نتایج شنوایی کودک کاملاً طبیعی است. هر شش ماه یک‌بار پایش دوره‌ای انجام شود.</p>
      </div>
    );

  return (
    <div className="w-full text-right bg-white rounded-2xl border border-sky-100 shadow-sm p-5 mb-6">
      <h4 className="text-sky-700 font-bold mb-3">🎯 پیشنهادهای اختصاصی ژنینو برای بهبود شنوایی کودک:</h4>
      <ul className="list-disc pr-5 space-y-2 text-gray-700 text-sm leading-relaxed">
        {tips.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
// ✂️ تابع حذف حاشیه‌های سفید از تصویر
function trimWhite(canvas) {
  const ctx = canvas.getContext("2d");
  const { width, height } = canvas;
  const pixels = ctx.getImageData(0, 0, width, height).data;

  let top = 0, left = 0, right = width, bottom = height;
  const isWhite = (i) =>
    pixels[i] > 245 && pixels[i + 1] > 245 && pixels[i + 2] > 245 && pixels[i + 3] > 0;

  // بالا
  outer: for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!isWhite((y * width + x) * 4)) break outer;
    }
    top++;
  }

  // پایین
  outer: for (let y = height - 1; y >= 0; y--) {
    for (let x = 0; x < width; x++) {
      if (!isWhite((y * width + x) * 4)) break outer;
    }
    bottom--;
  }

  // چپ
  outer: for (let x = 0; x < width; x++) {
    for (let y = top; y < bottom; y++) {
      if (!isWhite((y * width + x) * 4)) break outer;
    }
    left++;
  }

  // راست
  outer: for (let x = width - 1; x >= 0; x--) {
    for (let y = top; y < bottom; y++) {
      if (!isWhite((y * width + x) * 4)) break outer;
    }
    right--;
  }

  const w = Math.max(1, right - left);
  const h = Math.max(1, bottom - top);
  const out = document.createElement("canvas");
  out.width = w;
  out.height = h;
  out.getContext("2d").drawImage(canvas, left, top, w, h, 0, 0, w, h);
  return out;
}


