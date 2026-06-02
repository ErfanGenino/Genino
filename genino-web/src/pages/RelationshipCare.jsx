import { motion } from "framer-motion";
import {
  HeartPulse,
  Sparkles,
  MessageCircleHeart,
  TrendingUp,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  createRelationshipAssessment,
  getRelationshipAssessments,
} from "../services/api";
import { relationshipCareSuggestions } from "../data/relationshipCareSuggestions";

export default function RelationshipCare() {
  const navigate = useNavigate();
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [currentCategory, setCurrentCategory] = useState(0);
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [lastAssessmentDate, setLastAssessmentDate] = useState(null);
  const [hasChild, setHasChild] = useState(false);
  const [careSuggestionsMessage, setCareSuggestionsMessage] = useState("");


  const [selectedHistoryIndex, setSelectedHistoryIndex] = useState(0);

const [relationshipHistory, setRelationshipHistory] = useState([
  {
    label: "نمونه",
    date: "بعد از اولین ارزیابی فعال می‌شود",
    score: 0,
    strongest: "هنوز مشخص نیست",
    growth: "هنوز مشخص نیست",
  },
]);

const selectedHistory = relationshipHistory[selectedHistoryIndex];
const previousHistory = relationshipHistory[selectedHistoryIndex + 1];
const scoreDiff = previousHistory
  ? selectedHistory.score - previousHistory.score
  : 0;
const selectedCategoryScores = selectedHistory.categoryScores || [];
const careCategoryScores =
  selectedCategoryScores.length > 0
    ? selectedCategoryScores
    : assessmentResult?.categoryScores || [];


  const assessmentCategories = [
  {
    key: "communication",
    title: "ارتباط و گفت‌وگو",
    subtitle: "دیدن اینکه چقدر حرف‌ها شنیده می‌شوند و گفت‌وگو امن است.",
    questions: [
  "این هفته احساس کردم حرف‌هایم توسط همسرم شنیده می‌شود.",
  "این هفته تلاش کردم حرف‌های همسرم را با دقت و بدون قضاوت گوش کنم.",
  "گفتگوهای ما محترمانه و سازنده بود.",
],
  },
  {
    key: "emotional",
    title: "صمیمیت عاطفی",
    subtitle: "دیدن میزان توجه، محبت و نزدیکی عاطفی در رابطه.",
    questions: [
  "این هفته احساس کردم برای همسرم مهم هستم.",
  "این هفته محبت و توجه خودم را به همسرم نشان دادم.",
  "بین ما احساس نزدیکی عاطفی وجود داشت.",
],
  },
  {
    key: "support",
    title: "حمایت و همکاری",
    subtitle: "دیدن اینکه چقدر در زندگی مشترک کنار هم هستید.",
    questions: [
  "در این هفته احساس کردم در مشکلات تنها نیستم.",
  "من نیز تلاش کردم حامی همسرم باشم.",
  "همکاری خوبی بین ما در مسئولیت‌های زندگی وجود داشت.",
],
  },
  {
    key: "qualityTime",
    title: "زمان باکیفیت",
    subtitle: "دیدن اینکه چقدر زمان آرام و واقعی برای هم داشتید.",
    questions: [
  "همسرم زمان قابل توجهی را به من اختصاص داد",
  "برای بودن در کنار همسرم زمان اختصاص دادم.",
  "در این هفته لحظات خوش و باکیفیتی با هم داشتیم.",
],
  },
  {
    key: "safety",
    title: "آرامش و امنیت رابطه",
    subtitle: "دیدن اینکه رابطه چقدر امن، آرام و بدون تنش شدید بوده است.",
    questions: [
  "در کنار همسرم احساس آرامش و امنیت داشتم.",
  "تلاش کردم از سرزنش، تحقیر یا واکنش‌های تند دوری کنم.",
  "فضای رابطه ما آرام و محترمانه بود.",
],
  },
  {
    key: "parenting",
    title: "فرزندپروری مشترک",
    subtitle: "دیدن هماهنگی و همکاری شما در مراقبت از فرزند.",
    questions: [
  "احساس کردم در تربیت و مراقبت از فرزند تنها نیستم.",
  "در مراقبت و تربیت فرزند نقش فعالی داشتم.",
  "در تصمیم‌های مربوط به فرزند هماهنگی خوبی داشتیم.",
],
  },
];

const activeAssessmentCategories = hasChild
  ? assessmentCategories
  : assessmentCategories.filter((category) => category.key !== "parenting");

function mapAssessmentToHistory(item, index) {
  return {
    label: index === 0 ? "آخرین مراقبت" : `مراقبت ${index + 1}`,
    date: new Date(item.completedAt).toLocaleDateString("fa-IR"),
    score: item.overallScore,
    strongest: item.strongestCategory || "ثبت نشده",
    growth: item.growthCategory || "ثبت نشده",
    categoryScores: item.categoryScores || [],
  };
}

const currentAssessment = activeAssessmentCategories[currentCategory];
const isLastCategory = currentCategory === activeAssessmentCategories.length - 1;
const currentQuestionsAnswered =
  currentAssessment.questions.every((_, index) => {
    const key = `${currentAssessment.key}-${index}`;
    return answers[key] !== undefined;
  });

const calculateAssessmentResult = async () => {
  const categoryScores = activeAssessmentCategories.map((category) => {
    const total = category.questions.reduce((sum, _, index) => {
      return sum + (answers[`${category.key}-${index}`] || 0);
    }, 0);

    return {
      key: category.key,
      title: category.title,
      score: Math.round((total / (category.questions.length * 5)) * 100),
    };
  });

  const overallScore = Math.round(
    categoryScores.reduce((sum, item) => sum + item.score, 0) /
      categoryScores.length
  );

  const strongest = categoryScores.reduce((best, item) =>
    item.score > best.score ? item : best
  );

  const growth = categoryScores.reduce((lowest, item) =>
    item.score < lowest.score ? item : lowest
  );

  const newResult = {
  overallScore,
  strongest,
  growth,
  categoryScores,
};


const saveResult = await createRelationshipAssessment({
  overallScore: newResult.overallScore,
  strongestCategory: newResult.strongest.title,
  growthCategory: newResult.growth.title,
  hasChild,
  answers,
  categoryScores: newResult.categoryScores,
});

if (!saveResult?.ok) {
  console.error("SAVE RELATIONSHIP ASSESSMENT ERROR:", saveResult);
}


setAssessmentResult(newResult);

const historyRes = await getRelationshipAssessments();

if (historyRes?.ok && Array.isArray(historyRes.assessments)) {
  const mapped = historyRes.assessments.map(mapAssessmentToHistory);

  setRelationshipHistory(mapped);
  setSelectedHistoryIndex(0);
}

setSelectedHistoryIndex(0);
setLastAssessmentDate(new Date());
setAssessmentStarted(false);
setShowAssessment(false);
setCurrentCategory(0);
setTimeout(() => {
  document
    .getElementById("relationship-latest-status")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}, 100);
};

const today = new Date();

const nextAssessmentDate = lastAssessmentDate
  ? new Date(lastAssessmentDate.getTime() + 7 * 24 * 60 * 60 * 1000)
  : null;

const canStartAssessment =
  !lastAssessmentDate || today >= nextAssessmentDate;

const daysUntilNextAssessment = nextAssessmentDate
  ? Math.max(
      0,
      Math.ceil((nextAssessmentDate - today) / (24 * 60 * 60 * 1000))
    )
  : 0;

  useEffect(() => {
  let isMounted = true;

  async function loadHistory() {
    const res = await getRelationshipAssessments();

    if (!isMounted) return;

    if (res?.ok && Array.isArray(res.assessments)) {
      const mapped = res.assessments.map(mapAssessmentToHistory);

      if (mapped.length > 0) {
        setRelationshipHistory(mapped);
        setSelectedHistoryIndex(0);
        setLastAssessmentDate(new Date(res.assessments[0].completedAt));
        setAssessmentResult({
          overallScore: res.assessments[0].overallScore,
          strongest: { title: res.assessments[0].strongestCategory || "ثبت نشده" },
          growth: { title: res.assessments[0].growthCategory || "ثبت نشده" },
          categoryScores: res.assessments[0].categoryScores || [],
        });
      }
    }
  }

  loadHistory();

  return () => {
    isMounted = false;
  };
}, []);


function getCareLevel(score) {
  if (score <= 20) return "level1";
  if (score <= 40) return "level2";
  if (score <= 60) return "level3";
  if (score <= 80) return "level4";
  return "level5";
}

function getLevelInfo(score) {
  if (score <= 20)
    return {
      title: "نیازمند توجه فوری",
      color:
        "border-rose-200 bg-rose-50 text-rose-700",
    };

  if (score <= 40)
    return {
      title: "نیازمند توجه",
      color:
        "border-orange-200 bg-orange-50 text-orange-700",
    };

  if (score <= 60)
    return {
      title: "قابل بهبود",
      color:
        "border-yellow-200 bg-yellow-50 text-yellow-700",
    };

  if (score <= 80)
    return {
      title: "وضعیت خوب",
      color:
        "border-emerald-200 bg-emerald-50 text-emerald-700",
    };

  return {
    title: "وضعیت عالی",
    color:
      "border-green-200 bg-green-50 text-green-700",
  };
}

function getCareSuggestions(item) {
  const level = getCareLevel(item.score);
  return relationshipCareSuggestions[item.key]?.[level] || [];
}

  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-rose-50 via-white to-amber-50 px-4 py-8 text-gray-800"
    >
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-rose-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 top-44 h-96 w-96 rounded-full bg-amber-200/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/3 h-96 w-96 rounded-full bg-pink-100/70 blur-3xl" />

      <section className="relative z-10 mx-auto w-full max-w-6xl">
        <button
          type="button"
          onClick={() => navigate("/life-companion")}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white/80 px-4 py-2 text-xs font-bold text-rose-700 shadow-sm transition hover:bg-rose-50"
        >
          <ArrowRight size={16} />
          بازگشت به همراه زندگی
        </button>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-7 grid grid-cols-1 items-center gap-6 overflow-hidden rounded-[2.2rem] border border-rose-100 bg-white/75 p-5 shadow-[0_24px_80px_rgba(244,114,182,0.18)] backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr] lg:p-8"
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50 px-4 py-2 text-xs font-black text-amber-700">
              <Sparkles size={15} />
              فضای آرام مراقبت از رابطه
            </div>

            <h1 className="text-3xl font-black leading-[1.6] text-rose-800 sm:text-4xl">
              نبض رابطه شما
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-8 text-gray-600">
              رابطه خوب اتفاقی نیست. با چند دقیقه توجه در هفته، می‌توان گفت‌وگو،
              صمیمیت، آرامش و همکاری را بهتر دید و قدم‌به‌قدم مراقبت کرد.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
  type="button"
  disabled={!canStartAssessment}
  onClick={() => {
  if (!canStartAssessment) return;

  setShowAssessment(true);

  setTimeout(() => {
    document
      .getElementById("relationship-assessment-box")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 100);
}}
                className={`rounded-2xl px-6 py-3 text-sm font-black shadow-[0_14px_35px_rgba(244,114,182,0.35)] transition ${
  canStartAssessment
    ? "bg-gradient-to-l from-rose-500 via-pink-500 to-amber-400 text-white hover:-translate-y-0.5"
    : "cursor-not-allowed bg-gray-100 text-gray-400"
}`}
              >
               {canStartAssessment
  ? "شروع مراقبت هفتگی رابطه"
  : `${daysUntilNextAssessment} روز تا مراقبت بعدی`}
              </button>

              <button
  type="button"
  onClick={() => {
    if (careCategoryScores.length > 0) {
      setCareSuggestionsMessage("");

      setTimeout(() => {
        document
          .getElementById("relationship-care-suggestions")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);

      return;
    }

    setCareSuggestionsMessage(
      "ابتدا مراقبت هفتگی رابطه را انجام دهید تا پیشنهادهای مراقبتی متناسب با وضعیت رابطه شما ارائه گردد."
    );
  }}
  className="rounded-2xl border border-rose-100 bg-white/80 px-6 py-3 text-sm font-black text-rose-700 transition hover:bg-rose-50"
>
  مشاهده پیشنهادهای مراقبتی
</button>
            </div>

            {careSuggestionsMessage && (
  <p className="mt-3 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs font-bold leading-6 text-amber-700">
    {careSuggestionsMessage}
  </p>
)}

          </div>

          <div className="relative min-h-[260px] overflow-hidden rounded-[2rem]">
  <img
    src="/images/life-companion/relationship-care-hero.webp"
    alt="نبض رابطه"
    className="h-full min-h-[260px] w-full object-cover"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
</div>
</motion.div>

        {showAssessment && (
  <div
    id="relationship-assessment-box"
    className="mb-6 rounded-[2rem] border border-rose-100 bg-white/80 p-6 shadow-[0_18px_60px_rgba(244,114,182,0.13)] backdrop-blur-xl"
  >
    <h2 className="text-lg font-black text-rose-800">
  ارزیابی هفتگی رابطه
</h2>
<p className="mt-2 text-xs leading-6 text-gray-500">
  {hasChild
    ? "۶ بخش کوتاه • ۱۸ سؤال • حدود ۳ دقیقه زمان"
    : "۵ بخش کوتاه • ۱۵ سؤال • حدود ۲ دقیقه زمان"}
</p>

<div className="mt-5 rounded-2xl border border-rose-100 bg-rose-50/60 p-4">
  <label className="flex cursor-pointer items-center gap-3">
    <input
      type="checkbox"
      checked={hasChild}
      onChange={(e) => setHasChild(e.target.checked)}
      className="h-5 w-5 rounded border-rose-300 text-rose-500"
    />

    <div>
      <p className="text-sm font-black text-rose-800">
        ما فرزند داریم
      </p>

      <p className="text-[11px] text-gray-500">
        در صورت فعال بودن، بخش فرزندپروری مشترک نیز در ارزیابی محاسبه می‌شود.
      </p>
    </div>
  </label>
</div>


    <div className="mt-4 flex flex-wrap gap-2">
  {activeAssessmentCategories.map((category) => (
    <div
      key={category.key}
      className="rounded-full border border-rose-100 bg-rose-50/60 px-3 py-1.5 text-xs font-bold text-rose-700"
    >
      {category.title}
    </div>
  ))}
</div>



<div className="mt-6">
  <button
  type="button"
  onClick={() => setAssessmentStarted(true)}
  className="w-full rounded-2xl bg-gradient-to-l from-rose-500 via-pink-500 to-amber-400 py-3 text-sm font-black text-white shadow-[0_12px_30px_rgba(244,114,182,0.28)] transition hover:-translate-y-0.5"
>
  شروع پاسخگویی
</button>
</div>
{assessmentStarted && (
  <div className="mt-6 overflow-hidden rounded-[2rem] border border-rose-100 bg-gradient-to-br from-white via-rose-50/70 to-amber-50/80 p-5 shadow-[0_18px_55px_rgba(244,114,182,0.12)]">
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white/80 px-3 py-1 text-[11px] font-black text-rose-700">
          مرحله {currentCategory + 1} از {activeAssessmentCategories.length}
        </div>

        <h3 className="text-xl font-black text-rose-800">
          {currentAssessment.title}
        </h3>

        <p className="mt-2 text-xs leading-6 text-gray-500">
          {currentAssessment.subtitle}
        </p>
      </div>

      <div className="rounded-2xl border border-amber-100 bg-white/80 px-4 py-3 text-center">
        <p className="text-[11px] font-bold text-gray-500">پیشرفت</p>
        <p className="mt-1 text-sm font-black text-amber-700">{currentAssessment.questions.length} سؤال</p>
      </div>
    </div>

    <div className="space-y-4">
      {currentAssessment.questions.map((question, index) => (
        <div
          key={question}
          className="rounded-[1.5rem] border border-white/80 bg-white/85 p-4 shadow-sm"
        >
          <p className="text-sm font-black leading-7 text-gray-700">
            {index + 1}. {question}
          </p>

          <div className="mt-4 grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((value) => {
              const key = `${currentAssessment.key}-${index}`;
              const isSelected = answers[key] === value;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      [key]: value,
                    }))
                  }
                  className={`rounded-2xl border py-3 text-sm font-black transition ${
                    isSelected
                      ? "border-rose-400 bg-gradient-to-br from-rose-500 to-amber-400 text-white shadow-md"
                      : "border-rose-100 bg-white text-rose-700 hover:bg-rose-50"
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>

          <div className="mt-2 flex justify-between px-1 text-[10px] font-bold text-gray-400">
            <span>اصلاً</span>
            <span>خیلی زیاد</span>
          </div>
        </div>
      ))}
    </div>

    <button
  type="button"
  disabled={!currentQuestionsAnswered}
  onClick={() => {
    if (!currentQuestionsAnswered) return;

    if (!isLastCategory) {
      setCurrentCategory((prev) => prev + 1);
      return;
    }

    calculateAssessmentResult();
  }}
  className={`mt-6 w-full rounded-2xl py-3 text-sm font-black shadow-[0_12px_30px_rgba(245,158,11,0.25)] transition ${
    currentQuestionsAnswered
      ? "bg-gradient-to-l from-amber-400 to-rose-400 text-white hover:-translate-y-0.5"
      : "cursor-not-allowed bg-gray-100 text-gray-400"
  }`}
>
  {isLastCategory ? "پایان ارزیابی" : "ادامه"}
</button>

{assessmentResult && (
  <div className="mt-6 rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-5">
    <h3 className="text-xl font-black text-emerald-800">
      نتیجه ارزیابی این هفته
    </h3>

    <div className="mt-4 flex items-end gap-2">
      <span className="text-5xl font-black text-emerald-700">
        {assessmentResult.overallScore}
      </span>
      <span className="mb-2 text-sm font-bold text-gray-500">
        از 100
      </span>
    </div>

    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
      <InfoBox title="نقطه قوت" value={assessmentResult.strongest.title} />
      <InfoBox title="فرصت رشد" value={assessmentResult.growth.title} />
    </div>


    <p className="mt-4 text-sm font-bold leading-8 text-gray-600">
      این نتیجه برای قضاوت نیست؛ فقط یک تصویر آرام از حال رابطه شماست تا قدم بعدی را آگاهانه‌تر بردارید.
    </p>
  </div>
)}

  </div>
)}
  </div>
)}
    

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          <motion.div
          id="relationship-latest-status"
  initial={{ opacity: 0, y: 26 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.55, delay: 0.42 }}
  className="rounded-[2rem] border border-amber-100 bg-white/80 p-5 shadow-[0_16px_50px_rgba(245,158,11,0.11)] backdrop-blur-xl"
>
  <div className="mb-4 flex items-center gap-3">
    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
      <TrendingUp size={22} />
    </div>

    <div>
      <h2 className="text-lg font-black text-amber-800">
        آخرین وضعیت رابطه
      </h2>
      <p className="text-xs text-gray-500">
        مرور نتیجه‌های ثبت‌شده در هفته‌های مختلف
      </p>
    </div>
  </div>

  <div className="rounded-[1.6rem] border border-amber-100 bg-gradient-to-br from-amber-50 via-white to-rose-50 p-4">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-bold text-gray-500">
          {selectedHistory.label}
        </p>

        <div className="mt-2 flex items-end gap-2">
          <span className="text-5xl font-black text-amber-700">
            {selectedHistory.score}
          </span>
          <span className="mb-2 text-sm font-bold text-gray-500">
            از 100
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-white/80 bg-white/75 px-4 py-3 text-center">
        <p className="text-[11px] font-bold text-gray-500">
          تغییر نسبت به هفته قبل
        </p>

        <p
          className={`mt-1 text-sm font-black ${
            scoreDiff >= 0 ? "text-emerald-700" : "text-rose-700"
          }`}
        >
          {scoreDiff > 0 ? `+${scoreDiff}` : scoreDiff}
        </p>
      </div>
    </div>

    <p className="mt-3 text-xs font-bold leading-6 text-gray-500">
      {selectedHistory.date}
    </p>

    <div className="mt-4 h-3 overflow-hidden rounded-full bg-amber-100">
      <div
        className="h-full rounded-full bg-gradient-to-l from-amber-400 to-rose-400"
        style={{ width: `${selectedHistory.score}%` }}
      />
    </div>

    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
      <InfoBox title="نقطه قوت" value={selectedHistory.strongest} />
      <InfoBox title="فرصت رشد" value={selectedHistory.growth} />
    </div>

    {careCategoryScores.length > 0 && (
  <div className="mt-5">
    <p className="mb-3 text-xs font-black text-gray-500">
  جزئیات {careCategoryScores.length} بخش رابطه
</p>

    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {careCategoryScores.map((item) => (
        <div
          key={item.key}
          className="rounded-2xl border border-amber-100 bg-white/75 p-3"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-black text-gray-600">
              {item.title}
            </span>

            <span className="text-sm font-black text-amber-700">
              {item.score}
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-amber-100">
            <div
              className="h-full rounded-full bg-gradient-to-l from-amber-400 to-rose-400"
              style={{ width: `${item.score}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
)}


  </div>

  <div className="mt-5">
    <p className="mb-3 text-xs font-black text-gray-500">
     مراقبت‌های ثبت‌شده 
    </p>

    <div className="flex flex-wrap gap-2">
      {relationshipHistory.map((item, index) => (
        <button
          key={`${item.label}-${index}`}
          type="button"
          onClick={() => setSelectedHistoryIndex(index)}
          className={`rounded-full border px-4 py-2 text-xs font-black transition ${
            selectedHistoryIndex === index
              ? "border-amber-300 bg-amber-100 text-amber-800"
              : "border-amber-100 bg-white/70 text-gray-500 hover:bg-amber-50"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  </div>

  {!assessmentResult && (
    <p className="mt-4 rounded-2xl border border-amber-100 bg-amber-50/70 px-4 py-3 text-xs font-bold leading-6 text-amber-700">
      بعد از اولین ارزیابی، نتیجه واقعی این هفته اینجا نمایش داده می‌شود.
    </p>
  )}
</motion.div>

{careCategoryScores.length > 0 && (
  <motion.div
    id="relationship-care-suggestions"
    initial={{ opacity: 0, y: 26 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, delay: 0.5 }}
    className="lg:col-span-2 rounded-[1.8rem] border border-rose-100 bg-white/80 p-4 shadow-[0_14px_40px_rgba(244,114,182,0.09)] backdrop-blur-xl"
  >
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
        <MessageCircleHeart size={20} />
      </div>

      <div>
        <h2 className="text-base font-black text-rose-800">
          پیشنهادهای مراقبتی این هفته
        </h2>
        <p className="text-[11px] text-gray-500">
          متناسب با امتیاز هر بخش در مراقبت انتخاب‌شده
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
      {careCategoryScores.map((item) => {
        const levelInfo = getLevelInfo(item.score);
        const suggestions = getCareSuggestions(item);

        return (
          <div
            key={item.key}
            className={`rounded-[1.3rem] border p-3 ${levelInfo.color}`}
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="text-xs font-black">
                {item.title}
              </h3>

              <span className="rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-black">
                {item.score}
              </span>
            </div>

            <p className="mb-3 inline-flex rounded-full bg-white/65 px-2.5 py-1 text-[10px] font-black">
              {levelInfo.title}
            </p>

            <div className="space-y-2">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion}
                  className="rounded-2xl bg-white/70 px-3 py-2 text-[11px] font-bold leading-6 text-gray-700"
                >
                  {suggestion}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  </motion.div>
)}

        </div>
      </section>
    </main>
  );
}

function InfoBox({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/80 bg-white/75 p-4">
      <p className="text-xs font-bold text-gray-500">{title}</p>
      <p className="mt-1 text-sm font-black text-rose-700">{value}</p>
    </div>
  );
}

function CareItem({ text }) {
  return (
    <div className="rounded-2xl border border-rose-50 bg-gradient-to-l from-rose-50/80 to-white px-4 py-3">
      {text}
    </div>
  );
}

function HistoryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-amber-50 bg-gradient-to-l from-amber-50/80 to-white px-4 py-3">
      <span className="text-sm font-bold text-gray-600">{label}</span>
      <span className="text-lg font-black text-amber-700">{value}</span>
    </div>
  );
}