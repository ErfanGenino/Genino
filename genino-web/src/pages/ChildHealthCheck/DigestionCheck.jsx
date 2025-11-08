import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GeninoDNABackground from "@components/Core/GeninoDNABackground";
import { Utensils, Salad, CupSoda, Apple, Info, Smile } from "lucide-react";

/** ✅ یک باتن استاندارد (سایز/رنگ هماهنگ) */
const Btn = ({ children, className = "", ...rest }) => (
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className={
      "px-5 py-3 rounded-full font-bold text-white " +
      "bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 " +
      "shadow-[0_0_18px_rgba(16,185,129,0.35)] " +
      className
    }
    {...rest}
  >
    {children}
  </motion.button>
);

/** ✅ کارت سؤال با دکمه اطلاعات ℹ️ و گزینه‌ها */
function QuestionCard({
  icon,
  title,
  info,
  options,
  value,
  onChange,
  color = "emerald",
}) {
  const [showInfo, setShowInfo] = useState(false);

  // رنگ‌ها
  const base = `bg-${color}-50 border-${color}-200 text-${color}-800`;
  const active = `bg-${color}-200 border-${color}-400 text-${color}-900 font-semibold shadow-inner`;
  const hover = `hover:bg-${color}-100 hover:border-${color}-300`;

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
          className="flex items-center gap-2 text-emerald-700 text-sm"
          aria-label="توضیحات سؤال"
        >
          <Info className="w-5 h-5" />
          <span className="hidden sm:inline">چرا این سؤال؟</span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {showInfo && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-3 text-gray-600 text-sm leading-relaxed"
          >
            {info}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="mt-4 flex flex-wrap gap-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt)}
            className={`px-4 py-2 rounded-full text-sm border transition-all ${value?.value === opt.value ? active : `${base} ${hover}`}`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* نمایش توصیه اختصاصی بعد از انتخاب */}
      {value && value.advice && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-[13px] leading-relaxed bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3"
        >
          <span className="font-semibold">پیشنهاد ژنینو: </span>
          {value.advice}
        </motion.div>
      )}
    </div>
  );
}

/* ————————————————————————————————————————————————
   ✅ مرحله ۱: ارزیابی بلع و جویدن
———————————————————————————————————————————————— */
function SwallowingStep({ onDone }) {
  const [answers, setAnswers] = useState({}); // key -> selected option

  const questions = [
    {
      key: "cough",
      icon: <CupSoda className="w-5 h-5" />,
      title: "هنگام خوردن یا بلع، کودک سرفه یا حالت خفگی دارد؟",
      info:
        "هدف: بررسی سلامت مسیر بلع و هماهنگی عضلات گلو. سرفه‌های مکرر هنگام بلع می‌تواند نشانهٔ اختلال بلع (Dysphagia) باشد.",
      options: [
        {
          label: "خیر",
          value: "no",
          score: 3,
          advice: "عالیه! نشانه‌ای از اختلال بلع دیده نمی‌شود.",
        },
        {
          label: "گاهی",
          value: "sometimes",
          score: 2,
          advice:
            "غذا را آرام‌تر و لقمه‌ها را کوچک‌تر کنید. قوام غذا را کمی نرم‌تر نگه دارید و وضعیت نشستن مناسب باشد.",
        },
        {
          label: "بله، اغلب",
          value: "yes",
          score: 1,
          advice:
            "قوام غذا را نرم کنید (پوره/سوپ)، لقمه‌های کوچک، و در صورت تداوم با گفتاردرمانگر یا پزشک اطفال مشورت کنید.",
        },
      ],
    },
    {
      key: "solids",
      icon: <Utensils className="w-5 h-5" />,
      title: "در خوردن غذاهای جامد مشکل دارد؟",
      info:
        "هدف: ارزیابی قدرت جویدن و تحمل بافت‌های مختلف. مشکل پایدار می‌تواند ناشی از ضعف عضلات دهانی یا اضطراب تغذیه باشد.",
      options: [
        { label: "خیر", value: "no", score: 3, advice: "روند طبیعی جویدن." },
        {
          label: "کمی مشکل",
          value: "mild",
          score: 2,
          advice:
            "از نیمه‌جامد به جامد حرکت تدریجی داشته باشید؛ بافت را مرحله‌به‌مرحله سفت‌تر کنید.",
        },
        {
          label: "بله، واضح",
          value: "yes",
          score: 1,
          advice:
            "تمرین‌های جویدن با خوراکی‌های نرم ولی بافت‌دار (مثل موز، سیب پخته) و ارزیابی تخصصی در صورت تداوم.",
        },
      ],
    },
    {
      key: "pocketing",
      icon: <Apple className="w-5 h-5" />,
      title: "غذا را طولانی در دهان نگه می‌دارد (پشت لپ‌ها/روی زبان)؟",
      info:
        "هدف: بررسی کنترل دهانی و هماهنگی زبان. نگه‌داشتن طولانی می‌تواند نشانه ضعف عضلات زبان یا اضطراب از بلع باشد.",
      options: [
        {
          label: "خیر",
          value: "no",
          score: 3,
          advice: "عالی! کنترل دهانی مناسب است.",
        },
        {
          label: "گاهی",
          value: "sometimes",
          score: 2,
          advice:
            "از بافت‌های ساده‌تر شروع کنید و با بازی/تشویق زمان جویدن را کوتاه کنید.",
        },
        {
          label: "بله، زیاد",
          value: "yes",
          score: 1,
          advice:
            "تمرین‌های تقویت زبان (فوت در نی، لیسیدن ماست با نوک زبان) و توجه به اضطراب تغذیه.",
        },
      ],
    },
    {
      key: "drooling",
      icon: <Smile className="w-5 h-5" />,
      title: "بزاق از دهان بیرون می‌ریزد یا ترشح زیاد است؟",
      info:
        "هدف: بررسی کنترل دهانی و هماهنگی عصبی. ترشح زیاد بزاق می‌تواند نشانهٔ ضعف کنترل بلع باشد.",
      options: [
        {
          label: "خیر",
          value: "no",
          score: 3,
          advice: "نرمال و مطلوب.",
        },
        {
          label: "گاهی",
          value: "sometimes",
          score: 2,
          advice:
            "تمرین بلع خشک (یادآوری قورت‌دادن بزاق) و وضعیت نشستن صحیح هنگام غذا.",
        },
        {
          label: "بله، زیاد",
          value: "yes",
          score: 1,
          advice:
            "ارزیابی تخصصی در صورت تداوم. در خانه تمرین‌های دهانی و یادآوری بلع را ادامه دهید.",
        },
      ],
    },
  ];

  const completed = questions.every((q) => !!answers[q.key]);

  const sumScore = useMemo(
    () => questions.reduce((s, q) => s + (answers[q.key]?.score || 0), 0),
    [answers]
  );

  const collectAdvice = () =>
    questions
      .map((q) => answers[q.key]?.advice)
      .filter(Boolean)
      .slice(0, 6); // سقف توصیه‌ها

  return (
    <section className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <div className="grid gap-5">
        {questions.map((q) => (
          <QuestionCard
            key={q.key}
            icon={q.icon}
            title={q.title}
            info={q.info}
            options={q.options}
            value={answers[q.key]}
            onChange={(opt) =>
              setAnswers((prev) => ({ ...prev, [q.key]: opt }))
            }
            color="emerald"
          />
        ))}
      </div>

      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-500">
          امتیاز مرحله: <span className="font-bold text-emerald-700">{sumScore}/12</span>
        </p>
        <Btn disabled={!completed} onClick={() => onDone({ sumScore, advice: collectAdvice() })}>
          ادامه
        </Btn>
      </div>
    </section>
  );
}

/* ————————————————————————————————————————————————
   ✅ مرحله ۲: وضعیت گوارش عمومی
———————————————————————————————————————————————— */
function BowelStep({ onDone }) {
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      key: "frequency",
      icon: <Salad className="w-5 h-5" />,
      title: "تناوب اجابت مزاج کودک چقدر است؟",
      info:
        "هدف: بررسی نظم گوارش و سلامت روده. کمتر از ۳ بار در هفته معمولاً نشانهٔ یبوست است.",
      options: [
        { label: "روزانه یا یک‌روزدرمیان", value: "normal", score: 3, advice: "عالی—نظم خوب روده‌ها." },
        { label: "۲-۳ بار در هفته", value: "low", score: 2, advice: "آب و فیبر را بیشتر کنید، تحرک روزانه مهم است." },
        { label: "۱ بار یا کمتر در هفته", value: "constipation", score: 1, advice: "احتمال یبوست—میوه‌های آب‌دار (آلو، گلابی)، آب کافی و در صورت تداوم ارزیابی پزشکی." },
      ],
    },
    {
      key: "stool",
      icon: <Apple className="w-5 h-5" />,
      title: "قوام مدفوع معمولاً چگونه است؟",
      info:
        "هدف: بررسی وضعیت آب بدن و فیبر. سفت و ساچمه‌ای → کم‌آبی/کمبود فیبر. خیلی شل → احتمال حساسیت یا عفونت.",
      options: [
        { label: "نرم و شکل‌دار", value: "soft", score: 3, advice: "نرمال." },
        { label: "سفت/ساچمه‌ای", value: "hard", score: 1, advice: "افزایش مایعات و فیبر؛ بررسی رژیم غذایی." },
        { label: "خیلی شل", value: "loose", score: 2, advice: "محرک‌های غذایی را ردیابی کنید؛ در صورت تداوم، پزشک." },
      ],
    },
    {
      key: "pain",
      icon: <CupSoda className="w-5 h-5" />,
      title: "دل‌درد یا نفخ مکرر دارد؟",
      info:
        "هدف: بررسی سوءهاضمه/حساسیت غذایی. نفخ مکرر ممکن است ناشی از عدم تحمل لاکتوز یا محرک‌های غذایی باشد.",
      options: [
        { label: "خیر", value: "no", score: 3, advice: "نرمال." },
        { label: "گاهی", value: "sometimes", score: 2, advice: "دفترچه غذایی بنویسید و محرک‌ها را پیدا کنید." },
        { label: "بله، مکرر", value: "yes", score: 1, advice: "بررسی عدم‌تحمل‌ها (مثلاً لاکتوز/گلوتن) و مشاوره پزشکی در صورت تداوم." },
      ],
    },
    {
      key: "vomit",
      icon: <Utensils className="w-5 h-5" />,
      title: "تهوع یا استفراغ بیش از ۲ بار در هفته دارد؟",
      info:
        "هدف: بررسی ریفلاکس/حساسیت گوارشی. نیاز به بررسی پزشکی در صورت تداوم.",
      options: [
        { label: "خیر", value: "no", score: 3, advice: "نرمال." },
        { label: "گاهی", value: "sometimes", score: 2, advice: "وعده‌های کوچک‌تر، پرهیز از درازکشیدن تا ۹۰ دقیقه پس از غذا." },
        { label: "بله", value: "yes", score: 1, advice: "بررسی پزشکی توصیه می‌شود." },
      ],
    },
  ];

  const completed = questions.every((q) => !!answers[q.key]);
  const sumScore = useMemo(
    () => questions.reduce((s, q) => s + (answers[q.key]?.score || 0), 0),
    [answers]
  );
  const collectAdvice = () =>
    questions.map((q) => answers[q.key]?.advice).filter(Boolean).slice(0, 6);

  return (
    <section className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <div className="grid gap-5">
        {questions.map((q) => (
          <QuestionCard
            key={q.key}
            icon={q.icon}
            title={q.title}
            info={q.info}
            options={q.options}
            value={answers[q.key]}
            onChange={(opt) =>
              setAnswers((prev) => ({ ...prev, [q.key]: opt }))
            }
            color="emerald"
          />
        ))}
      </div>

      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-500">
          امتیاز مرحله: <span className="font-bold text-emerald-700">{sumScore}/12</span>
        </p>
        <Btn disabled={!completed} onClick={() => onDone({ sumScore, advice: collectAdvice() })}>
          ادامه
        </Btn>
      </div>
    </section>
  );
}

/* ————————————————————————————————————————————————
   ✅ مرحله ۳: عادات تغذیه و رفتار خوردن
———————————————————————————————————————————————— */
function HabitsStep({ onDone }) {
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      key: "schedule",
      icon: <Utensils className="w-5 h-5" />,
      title: "وعده‌های غذایی منظم هستند؟",
      info:
        "هدف: نظم متابولیک و جلوگیری از پرخوری. وعده‌های ثابت به سیری آگاهانه کمک می‌کنند.",
      options: [
        { label: "بله، منظم", value: "yes", score: 3, advice: "عالی—نظم وعده‌ها را حفظ کنید." },
        { label: "نیمه‌منظم", value: "semi", score: 2, advice: "برنامه وعده‌ها را ثابت‌تر کنید." },
        { label: "بی‌نظم", value: "no", score: 1, advice: "سه وعده اصلی و یک تا دو میان‌وعده سبک تنظیم کنید." },
      ],
    },
    {
      key: "screens",
      icon: <CupSoda className="w-5 h-5" />,
      title: "کودک هنگام غذا تلویزیون/موبایل تماشا می‌کند؟",
      info:
        "هدف: تمرکز بر نشانه‌های سیری و جلوگیری از پرخوری. صفحه‌نمایش حواس را پرت می‌کند.",
      options: [
        { label: "خیر", value: "no", score: 3, advice: "عالی—کیفیت خوردن بالاتر می‌رود." },
        { label: "گاهی", value: "sometimes", score: 2, advice: "تعداد دفعات را کم کنید؛ گفت‌وگوی خانوادگی جایگزین شود." },
        { label: "بله، اغلب", value: "yes", score: 1, advice: "قانون «بدون صفحه» هنگام غذا را اجرا کنید." },
      ],
    },
    {
      key: "fruits",
      icon: <Apple className="w-5 h-5" />,
      title: "مصرف روزانه میوه و سبزی دارد؟",
      info:
        "هدف: دریافت فیبر/ویتامین؛ برای پیشگیری از یبوست و بهبود ایمنی بدن مهم است.",
      options: [
        { label: "بله، روزانه", value: "daily", score: 3, advice: "عالی—ادامه دهید." },
        { label: "نه همیشه", value: "some", score: 2, advice: "سبزی خردشده در غذا یا اسموتی میوه اضافه کنید." },
        { label: "کم یا اصلاً", value: "low", score: 1, advice: "برنامهٔ تنوع میوه و سبزی تدوین کنید." },
      ],
    },
    {
      key: "water",
      icon: <Salad className="w-5 h-5" />,
      title: "نوشیدن آب کافی در روز؟",
      info:
        "هدف: هیدراتاسیون؛ کم‌آبی باعث یبوست و خستگی می‌شود.",
      options: [
        { label: "کافی", value: "ok", score: 3, advice: "عالی—روال فعلی را حفظ کنید." },
        { label: "متوسط", value: "mid", score: 2, advice: "بطری آب شخصی/بازی شمارش لیوان‌ها کمک می‌کند." },
        { label: "کم", value: "low", score: 1, advice: "یادآور آب و نوشیدنی‌های سالم (آب رقیق‌شده میوه/دوغ کم‌نمک)." },
      ],
    },
  ];

  const completed = questions.every((q) => !!answers[q.key]);
  const sumScore = useMemo(
    () => questions.reduce((s, q) => s + (answers[q.key]?.score || 0), 0),
    [answers]
  );
  const collectAdvice = () =>
    questions.map((q) => answers[q.key]?.advice).filter(Boolean).slice(0, 6);

  return (
    <section className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <div className="grid gap-5">
        {questions.map((q) => (
          <QuestionCard
            key={q.key}
            icon={q.icon}
            title={q.title}
            info={q.info}
            options={q.options}
            value={answers[q.key]}
            onChange={(opt) =>
              setAnswers((prev) => ({ ...prev, [q.key]: opt }))
            }
            color="emerald"
          />
        ))}
      </div>

      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-500">
          امتیاز مرحله: <span className="font-bold text-emerald-700">{sumScore}/12</span>
        </p>
        <Btn disabled={!completed} onClick={() => onDone({ sumScore, advice: collectAdvice() })}>
          مشاهده نتیجه
        </Btn>
      </div>
    </section>
  );
}

/* ————————————————————————————————————————————————
   ✅ صفحه اصلی پایش گوارش و بلع
———————————————————————————————————————————————— */
export default function DigestionCheck() {
  const navigate = useNavigate();
  const [step, setStep] = useState(-1); // -1: آموزش، 0..2 مراحل، 3 نتیجه
  const [swallowing, setSwallowing] = useState(null);
  const [bowel, setBowel] = useState(null);
  const [habits, setHabits] = useState(null);

  const totalScore =
    (swallowing?.sumScore || 0) + (bowel?.sumScore || 0) + (habits?.sumScore || 0); // از 36

  const level =
    totalScore >= 30 ? "طبیعی" : totalScore >= 24 ? "نسبتاً مطلوب" : "نیازمند توجه";

  const mergedAdvice = useMemo(() => {
    const all = [
      ...(swallowing?.advice || []),
      ...(bowel?.advice || []),
      ...(habits?.advice || []),
    ];
    // حذف توصیه‌های تکراری
    return Array.from(new Set(all)).slice(0, 8);
  }, [swallowing, bowel, habits]);

  return (
    <GeninoDNABackground strands={10} opacity={0.25} duration={90}>
      <main dir="rtl" className="relative z-10 flex flex-col items-center justify-center px-6 py-16 text-gray-800">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-extrabold text-emerald-700 mb-20 text-center drop-shadow-[0_0_12px_rgba(16,185,129,0.35)]"
        >
          پایش گوارش و بلع کودک
        </motion.h1>

        <AnimatePresence mode="wait">
          {/* آموزش مقدماتی */}
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
                این پایش به شما کمک می‌کند بدانید آیا کودک <strong>غذا را درست می‌جود و می‌بلعد</strong>،
                <strong> الگوی دفع و گوارش</strong> طبیعی دارد یا خیر، و <strong>عادات تغذیه‌ای</strong> او سالم است یا نه.  
                روی هر سؤال، دکمهٔ <strong>ℹ️ چرا این سؤال؟</strong> را بزنید تا هدف و معنای پاسخ‌ها را ببینید.
              </p>
              <Btn onClick={() => setStep(0)}>شروع پایش گوارش و بلع</Btn>
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
  <h3 className="text-emerald-800 font-extrabold mb-2 text-center">
    مرحله ۱ — ارزیابی بلع و جویدن
  </h3>
  <p className="text-gray-600 text-sm text-center">
    لطفاً به سؤالات زیر پاسخ دهید. بعد از هر انتخاب، پیشنهاد ژنینو نمایش داده می‌شود.
  </p>
</div>

              <SwallowingStep
                onDone={(r) => {
                  setSwallowing(r);
                  setStep(1);
                }}
              />
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
  <h3 className="text-emerald-800 font-extrabold mb-2 text-center">
    مرحله ۲ — وضعیت گوارش عمومی
  </h3>
  <p className="text-gray-600 text-sm text-center">
    قوام و تناوب اجابت مزاج، دل‌درد و تهوع بررسی می‌شود.
  </p>
</div>

              <BowelStep
                onDone={(r) => {
                  setBowel(r);
                  setStep(2);
                }}
              />
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
  <h3 className="text-emerald-800 font-extrabold mb-2 text-center">
    مرحله ۳ — عادات تغذیه و رفتار خوردن
  </h3>
  <p className="text-gray-600 text-sm text-center">
    نظم وعده‌ها، حضور صفحه‌نمایش، میوه/سبزی و آب روزانه ارزیابی می‌شود.
  </p>
</div>

              <HabitsStep
                onDone={(r) => {
                  setHabits(r);
                  setStep(3);
                }}
              />
            </motion.section>
          )}

          {/* نتیجه نهایی */}
          {step === 3 && (
            <motion.section
              key="result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 
                         rounded-3xl shadow-[0_0_40px_rgba(16,185,129,0.2)] p-10 mx-4 max-w-3xl border border-emerald-100"
            >
              <Utensils className="w-16 h-16 mb-4 text-emerald-600 drop-shadow-[0_0_10px_rgba(16,185,129,0.35)]" />
              <h2 className="text-3xl font-extrabold text-emerald-700 mb-2">
                گزارش هوشمند گوارش و بلع ژنینو 🌿
              </h2>

              <p className="text-gray-700 mb-6 leading-relaxed">
                مجموع امتیاز شما: <span className="font-bold text-emerald-700">{totalScore}/36</span> — وضعیت کلی:{" "}
                <span className="font-bold text-emerald-700">{level}</span>
              </p>

              <div className="grid sm:grid-cols-3 gap-6 w-full mb-8 text-right">
                <div className="bg-white rounded-2xl shadow-md p-5 border border-emerald-100">
                  <h3 className="text-emerald-700 font-bold mb-2">🍽️ بلع و جویدن</h3>
                  <p className="text-gray-700 text-sm">امتیاز: {swallowing?.sumScore}/12</p>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-5 border border-emerald-100">
                  <h3 className="text-emerald-700 font-bold mb-2">🌱 گوارش عمومی</h3>
                  <p className="text-gray-700 text-sm">امتیاز: {bowel?.sumScore}/12</p>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-5 border border-emerald-100">
                  <h3 className="text-emerald-700 font-bold mb-2">🧠 عادات تغذیه</h3>
                  <p className="text-gray-700 text-sm">امتیاز: {habits?.sumScore}/12</p>
                </div>
              </div>

              {!!mergedAdvice.length && (
                <div className="w-full text-right bg-white rounded-2xl border border-emerald-100 shadow-sm p-5 mb-8">
                  <h4 className="text-emerald-700 font-bold mb-3">پیشنهادهای اختصاصی ژنینو:</h4>
                  <ul className="list-disc pr-5 space-y-2 text-gray-700 text-sm leading-relaxed">
                    {mergedAdvice.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              )}

              <Btn
                onClick={() =>
                  navigate("/child-health-check/digestion-report", {
                    state: {
                      report: {
                        name: "حنا سمواتی",
                        date: new Date().toLocaleDateString("fa-IR"),
                        scores: {
                          swallowing: swallowing?.sumScore,
                          bowel: bowel?.sumScore,
                          habits: habits?.sumScore,
                          total: totalScore,
                        },
                        level,
                        advice: mergedAdvice,
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

        {/* ناوبری ساده به عقب در مراحل ۰..۲ */}
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
