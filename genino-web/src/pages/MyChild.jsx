import { motion } from "framer-motion";
import { Baby, Brain, Heart, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import FamilyTree from "./FamilyTree";
import AchievementsBar from "@components/Dashboard/AchievementsBar";
import TodayCalendarBox from "@components/Dashboard/TodayCalendarBox";
import GeninoAwarenessBox from "@components/Awareness/GeninoAwarenessBox";
import GeninoConfirmModal from "@components/Shared/GeninoConfirmModal";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import GoldenModal from "@components/Core/GoldenModal";
import { useState, useEffect } from "react";
import GeninoHealthButton from "@components/Assessments/GeninoHealthButton";
import GeninoAssessmentStart from "@components/Assessments/GeninoAssessmentStart";
import { HeartPulse } from "lucide-react";



export default function MyChild() {
  const [activeTab, setActiveTab] = useState("physical");

  const tabs = [
    { id: "physical", title: "رشد فیزیکی", icon: <Activity className="w-5 h-5 mr-2 text-yellow-700" /> },
    { id: "mental", title: "رشد ذهنی", icon: <Brain className="w-5 h-5 mr-2 text-yellow-700" /> },
    { id: "emotional", title: "رشد احساسی", icon: <Heart className="w-5 h-5 mr-2 text-yellow-700" /> },
  ];

  const tabContent = {
    physical: "در این بخش می‌توانید قد، وزن، خواب و فعالیت بدنی کودک خود را ثبت و مشاهده کنید.",
    mental: "در اینجا تمرکز، حافظه، خلاقیت و توانایی حل مسئله‌ی کودک بررسی و پیشنهادهای تقویتی ارائه می‌شود.",
    emotional: "در این بخش احساسات، رفتارها و ارتباطات کودک ردیابی می‌شود تا رشد هیجانی بهتری داشته باشد.",
  };

  const stats = [
    { label: "قد", value: 95, unit: "سانتی‌متر", percent: 80 },
    { label: "وزن", value: 13, unit: "کیلوگرم", percent: 75 },
    { label: "تمرکز ذهنی", value: "عالی", unit: "", percent: 90 },
    { label: "احساس و انرژی", value: "شاد و فعال", unit: "", percent: 95 },
  ];

  const average = stats.reduce((sum, s) => sum + s.percent, 0) / stats.length;
  const [showTestModal, setShowTestModal] = useState(false);
const [testAnswers, setTestAnswers] = useState({});
const [testResult, setTestResult] = useState(null);

  // 🌳 استیت‌های درختواره
  const [showFamilyTree, setShowFamilyTree] = useState(false);
  const [sisters, setSisters] = useState([]);
  const [brothers, setBrothers] = useState([]);
  const [aunts, setAunts] = useState([]);
  const [uncles, setUncles] = useState([]);
  const [khaleha, setKhaleha] = useState([]);
  const [dayiha, setDayiha] = useState([]);
  const [others, setOthers] = useState([]);

  // 👶 اطلاعات کودک از localStorage
  const [childPhoto, setChildPhoto] = useState(localStorage.getItem("childPhoto") || null);
  const [childName, setChildName] = useState(localStorage.getItem("childName") || "حنا");
  const [birthDate, setBirthDate] = useState(localStorage.getItem("birthDate") || "2021-03-12");
  const [gender, setGender] = useState(localStorage.getItem("gender") || "girl");

  // 📆 محاسبه دقیق سن و روز مانده تا تولد
const birth = new Date(birthDate);
const today = new Date();

// محاسبه سن به سال و ماه
let ageYears = today.getFullYear() - birth.getFullYear();
let ageMonths = today.getMonth() - birth.getMonth();
if (today.getDate() < birth.getDate()) ageMonths--;

if (ageMonths < 0) {
  ageYears--;
  ageMonths += 12;
}
const ageText = `${ageYears} سال و ${ageMonths} ماه`;

// محاسبه دقیق روزهای مانده تا تولد بعدی
let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
if (nextBirthday < today) {
  nextBirthday = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
}
const msInDay = 1000 * 60 * 60 * 24;
const daysLeft = Math.ceil((nextBirthday - today) / msInDay);
// 🧮 جدول رشد ذخیره‌شده‌ها
const [growthRecords, setGrowthRecords] = useState(
  JSON.parse(localStorage.getItem("growthRecords") || "[]")
);


// 🧮 تحلیل قد بر اساس سن و جنس
const [height, setHeight] = useState("");
let normalRange = { min: 0, max: 0 };
let status = "";

if (gender === "girl") {
  if (ageYears === 4) normalRange = { min: 92, max: 102 };
  else if (ageYears === 3) normalRange = { min: 88, max: 98 };
  else if (ageYears === 5) normalRange = { min: 99, max: 109 };
} else {
  if (ageYears === 4) normalRange = { min: 94, max: 104 };
  else if (ageYears === 3) normalRange = { min: 89, max: 99 };
  else if (ageYears === 5) normalRange = { min: 101, max: 111 };
}

if (height) {
  const h = parseFloat(height);
  if (h < normalRange.min) status = "کوتاه";
  else if (h > normalRange.max) status = "بلند";
  else status = "نرمال";
}
// ⚖️ تحلیل وزن بر اساس سن و جنس
const [weight, setWeight] = useState("");
let weightRange = { min: 0, max: 0 };
let weightStatus = "";

if (gender === "girl") {
  if (ageYears === 3) weightRange = { min: 11.5, max: 15 };
  else if (ageYears === 4) weightRange = { min: 13, max: 18 };
  else if (ageYears === 5) weightRange = { min: 14, max: 20 };
} else {
  if (ageYears === 3) weightRange = { min: 12, max: 16 };
  else if (ageYears === 4) weightRange = { min: 13.5, max: 18.5 };
  else if (ageYears === 5) weightRange = { min: 15, max: 21 };
}

if (weight) {
  const w = parseFloat(weight);
  if (w < weightRange.min) weightStatus = "پایین‌تر از میانگین";
  else if (w > weightRange.max) weightStatus = "بالاتر از میانگین";
  else weightStatus = "نرمال";
}
// 🧮 محاسبه BMI کودک (وزن / قد²)
let bmi = null;
let bmiStatus = "";

if (height && weight) {
  const h = parseFloat(height) / 100; // تبدیل سانتی‌متر به متر
  const w = parseFloat(weight);
  bmi = (w / (h * h)).toFixed(1);

  // محدوده‌ی تقریبی نرمال BMI برای کودکان 2 تا 10 ساله
  if (bmi < 14) bmiStatus = "کم‌وزن ⚠️";
  else if (bmi >= 14 && bmi <= 18) bmiStatus = "نرمال ✅";
  else bmiStatus = "اضافه‌وزن 🔺";
}
// 🍎 توصیه‌های ژنینو بر اساس BMI و سن
let bmiAdvice = "";

if (bmiStatus.includes("کم‌وزن")) {
  if (ageYears <= 3) {
    bmiAdvice = `وزن ${childName} پایین‌تر از حد نرمال است.  
    در این سن، کودک باید ۵ وعده‌ی سبک و مقوی در روز داشته باشد.  
    استفاده از غذاهای خانگی مثل حریره بادام، فرنی و سوپ‌های مقوی مفید است.  
    از دادن شیرینی و خوراکی‌های بی‌ارزش غذایی پرهیز کنید.  
    اگر این وضعیت تا چند هفته ادامه داشت، حتماً با متخصص کودک مشورت کنید.`;
  } else if (ageYears <= 6) {
    bmiAdvice = `وزن ${childName} کمتر از حد نرمال است.  
    وعده‌های غذایی را به ۴ وعده‌ی اصلی و ۲ میان‌وعده تقسیم کنید.  
    غذاهای پرانرژی مانند برنج، سیب‌زمینی، کره و لبنیات کامل مفیدند.  
    خواب کافی (۱۰ تا ۱۲ ساعت شبانه) و آرامش روحی را در نظر بگیرید.  
    در صورت تداوم کم‌وزنی، مراجعه به پزشک توصیه می‌شود.`;
  } else {
    bmiAdvice = `وزن ${childName} کمتر از حد نرمال است.  
    در این سن نیاز به تعادل بین تغذیه و فعالیت فیزیکی وجود دارد.  
    غذاهای پروتئینی مانند مرغ، ماهی و تخم‌مرغ همراه با میوه و سبزیجات توصیه می‌شود.  
    اگر وزن در چند اندازه‌گیری پایین باقی بماند، ارزیابی پزشکی لازم است.`;
  }
}

else if (bmiStatus.includes("اضافه‌وزن")) {
  if (ageYears <= 3) {
    bmiAdvice = `وزن ${childName} بالاتر از حد نرمال است.  
    کودک زیر سه سال نیازی به رژیم ندارد، ولی باید از خوراکی‌های شیرین و پرچرب پرهیز شود.  
    بازی‌های فعال داخل خانه و خواب کافی به تعادل وزن کمک می‌کند.  
    در صورت افزایش سریع وزن، پزشک باید وضعیت را بررسی کند.`;
  } else if (ageYears <= 6) {
    bmiAdvice = `وزن ${childName} بالاتر از حد نرمال است.  
    وعده‌های غذایی را منظم و با حجم کمتر ولی کیفیت بالا تنظیم کنید.  
    مصرف نوشیدنی‌های شیرین و خوراکی‌های پرکالری را کاهش دهید.  
    روزانه ۳۰ تا ۶۰ دقیقه بازی و تحرک بدنی پیشنهاد می‌شود.  
    در صورت تداوم، مشاوره با پزشک یا کارشناس تغذیه مفید است.`;
  } else {
    bmiAdvice = `وزن ${childName} بالاتر از محدوده‌ی طبیعی است.  
    لازم است رژیم غذایی متعادل همراه با تحرک روزانه تنظیم شود.  
    ورزش‌های گروهی یا شنا برای افزایش سوخت‌وساز بسیار مناسب‌اند.  
    از رژیم‌های سخت خودداری کنید و در صورت نیاز با پزشک مشورت نمایید.`;
  }
}

else if (bmiStatus.includes("نرمال")) {
  if (ageYears <= 3) {
    bmiAdvice = `${childName} در محدوده‌ی سالم قرار دارد 👏  
    تغذیه‌ی متنوع شامل لبنیات، میوه، غلات و سبزیجات را ادامه دهید.  
    از میان‌وعده‌های سالم مانند میوه خردشده یا بیسکویت سبوس‌دار استفاده کنید.`;
  } else if (ageYears <= 6) {
    bmiAdvice = `${childName} در محدوده‌ی سالم وزن و قد است 🌸  
    وعده‌های غذایی متنوع، خواب کافی و فعالیت روزانه برای حفظ رشد طبیعی مهم‌اند.  
    از عادت‌های غذایی نامنظم یا فست‌فود تا حد ممکن پرهیز کنید.`;
  } else {
    bmiAdvice = `${childName} رشد متعادلی دارد 👏  
    حفظ تعادل میان تغذیه، خواب و تحرک بدنی به ادامه‌ی رشد سالم کمک می‌کند.  
    بررسی سالانه‌ی رشد توسط پزشک توصیه می‌شود.`;
  }
}

// 🌙 توصیه خواب بر اساس سن کودک
let sleepAdvice = "";

if (ageYears < 1) {
  sleepAdvice = `در این سن، نوزاد به حدود ۱۴ تا ۱۷ ساعت خواب در شبانه‌روز نیاز دارد 😴  
  از این مقدار، حدود ۸ تا ۹ ساعت در شب و بقیه در چند نوبت روزانه است.  
  بهترین زمان خواب شب بین ۸ تا ۹ شب و بیداری بین ۶ تا ۷ صبح می‌باشد.`;
} 
else if (ageYears === 1 || ageYears === 2) {
  sleepAdvice = `در سن ${ageYears} سال، کودک باید بین ۱۱ تا ۱۴ ساعت در روز بخوابد 🌙  
  حدود ۱۰ تا ۱۱ ساعت در شب و ۱ تا ۲ ساعت خواب روزانه مناسب است.  
  خواب شب بهتر است از ساعت ۹ شب تا حدود ۷ صبح تنظیم شود.`;
} 
else if (ageYears >= 3 && ageYears <= 5) {
  sleepAdvice = `کودکان ${ageYears} ساله به ۱۰ تا ۱۳ ساعت خواب در شبانه‌روز نیاز دارند 💛  
  پیشنهاد می‌شود حدود ۹ تا ۱۰ ساعت خواب شب و ۱ تا ۲ ساعت خواب روزانه داشته باشند.  
  ساعت خواب ایده‌آل بین ۸:۳۰ تا ۹:۳۰ شب و بیداری بین ۶:۳۰ تا ۷:۳۰ صبح است.`;
} 
else if (ageYears >= 6 && ageYears <= 12) {
  sleepAdvice = `در این سن، کودک باید بین ۹ تا ۱۲ ساعت در شبانه‌روز بخوابد 🌤  
  معمولاً خواب شبانه بین ۹ تا ۱۰ ساعت و چرت کوتاه روزانه در صورت نیاز مفید است.  
  بهترین بازه خواب بین ۹ شب تا ۶:۳۰ صبح می‌باشد.`;
} 
else {
  sleepAdvice = `کودک ${ageYears} ساله معمولاً به ۸ تا ۱۰ ساعت خواب در شبانه‌روز نیاز دارد 🌙  
  خواب کافی در این سن باعث تمرکز بهتر و رشد متعادل‌تر می‌شود.  
  ساعت خواب ایده‌آل از ۹:۳۰ شب تا ۶:۳۰ صبح است.`;
}

// 🏃‍♀️ توصیه فعالیت فیزیکی بر اساس سن کودک
let activityAdvice = "";

if (ageYears < 1) {
  activityAdvice = `در این سن، تحرک کودک باید از طریق حرکات طبیعی روزانه مانند غلتیدن، چهار دست و پا رفتن و بازی روی زمین انجام شود 🤱  
  روزانه ۲ تا ۳ نوبت زمان بازی آزاد در محیط ایمن توصیه می‌شود.  
  استفاده از واکر یا محدودکننده‌های حرکتی تا حد امکان کم شود.`;
}
else if (ageYears === 1 || ageYears === 2) {
  activityAdvice = `کودک ${ageYears} ساله باید روزانه حداقل ۱۸۰ دقیقه (۳ ساعت) تحرک داشته باشد 🏃‍♂️  
  بازی‌های آزاد مثل دویدن، بالا رفتن از پله‌ها و توپ بازی بهترین گزینه‌ها هستند.  
  در این سن هیچ نیازی به ورزش رسمی نیست — فقط بازی آزاد و نشاط 💛`;
}
else if (ageYears >= 3 && ageYears <= 5) {
  activityAdvice = `کودکان ${ageYears} ساله باید حداقل ۳ ساعت در روز فعالیت فیزیکی داشته باشند 💪  
  از این زمان، حدود ۱ ساعت آن باید فعالیت با شدت متوسط تا زیاد باشد (مثل دویدن یا دوچرخه‌سواری).  
  بازی آزاد در پارک، پریدن، رقص و دویدن در خانه همه گزینه‌های عالی‌اند 🌈`;
}
else if (ageYears >= 6 && ageYears <= 12) {
  activityAdvice = `برای ${ageYears} سال، حداقل ۶۰ دقیقه فعالیت بدنی با شدت متوسط تا زیاد در روز توصیه می‌شود 🏃‍♀️  
  ورزش‌های گروهی، شنا، دوچرخه‌سواری یا بازی‌های حرکتی بهترین انتخاب‌اند.  
  زمان استفاده از تلویزیون و موبایل به کمتر از ۲ ساعت در روز محدود شود 📵`;
}
else {
  activityAdvice = `کودکان بالای ${ageYears} سال باید روزانه بین ۶۰ تا ۹۰ دقیقه فعالیت فیزیکی داشته باشند ⚽  
  ترکیبی از بازی، ورزش‌های گروهی و تحرک آزاد بهترین تأثیر را بر رشد جسمی و خلق‌وخو دارد.  
  مهم است که فعالیت با لذت و بدون فشار باشد 💛`;
}



// 📦 ذخیره رکورد رشد در localStorage + نمایش فوری
const saveGrowthRecord = () => {
  if (!height || !weight) return;

  const newRecord = {
    date: new Date().toLocaleString("fa-IR"),
    height: parseFloat(height),
    weight: parseFloat(weight),
    bmi: parseFloat(bmi),
    status: bmiStatus,
  };

  // 🆕 رکورد جدید بالا قرار بگیره
  const updated = [newRecord, ...growthRecords];
  setGrowthRecords(updated);
  localStorage.setItem("growthRecords", JSON.stringify(updated));
};

// 🗑 پاک کردن همه رکوردها با تأیید
const clearGrowthRecords = () => {
  if (window.confirm("آیا مطمئن هستید که می‌خواهید تمام رکوردهای رشد کودک را حذف کنید؟")) {
    localStorage.removeItem("growthRecords");
    setGrowthRecords([]);
  }
};
// 🔄 برای حذف تکی
const [recordToDelete, setRecordToDelete] = useState(null);
const [showDeleteModal, setShowDeleteModal] = useState(false);


// 🔄 برای تحلیل تستهای سلامت روحی و عاطفی کودک
const analyzeTest = () => {
  const score = Object.values(testAnswers).reduce((sum, val) => sum + val, 0);
  let result = "", advice = "";

  if (score >= 5) {
    result = "نرمال ✅";
    advice = "کودک از نظر هیجانی در مسیر سالم قرار دارد. گفتگو درباره احساسات را در برنامه روزانه حفظ کنید.";
  } else if (score >= 3) {
    result = "نیاز به حمایت 💛";
    advice = "کودک گاهی در کنترل احساس یا همکاری دچار چالش است. بازی‌های نقش‌آفرینی و گفت‌وگوهای احساسی را تمرین کنید.";
  } else {
    result = "نیاز به بررسی ⚠️";
    advice = "الگوهای اضطراب یا ضعف هیجانی مشاهده شده. توصیه می‌شود با روان‌شناس کودک مشورت شود.";
  }

  setTestResult({ score, result, advice });
  setShowTestModal(false);
};
// 🪶 آکاردئون: کنترل باز و بسته شدن کارت‌های آموزشی
const [openAccordion, setOpenAccordion] = useState(null);

const toggleAccordion = (key) => {
  setOpenAccordion(openAccordion === key ? null : key);
};
// 🎲 مودال آموزشی تصادفی هنگام ورود
const [showWelcomeModal, setShowWelcomeModal] = useState(true);
const [randomLesson, setRandomLesson] = useState(null);

// ✨ لیست آموزش‌ها (فقط خلاصه و الهام‌بخش)
const lessons = [
  {
    title: "🍎 تغذیه متعادل کودک",
    content: "تنوع غذایی کلید رشد است. هر وعده کودک باید شامل پروتئین، لبنیات و سبزیجات تازه باشد. از تنقلات پرنمک و نوشابه پرهیز کنید 💛"
  },
  {
    title: "😴 خواب کافی و آرامش ذهنی",
    content: "هورمون رشد کودک در خواب شب ترشح می‌شود. خواب منظم از ساعت ۹ شب، تمرکز و رشد فکری را افزایش می‌دهد 🌙"
  },
  {
    title: "💬 گفت‌وگوی مهربان با کودک",
    content: "به جای دستور دادن، از کودک نظر بخواهید. این کار حس استقلال و اعتماد‌به‌نفسش را تقویت می‌کند 🤝"
  },
  {
    title: "🌈 تشخیص احساسات کودک",
    content: "وقتی کودک احساساتش را بیان کند، از خشم و ترسش کاسته می‌شود. والد آگاه گوش می‌دهد، نه فقط قضاوت 💛"
  }
];

// 🎲 انتخاب تصادفی یک آموزش هنگام بارگذاری صفحه
useEffect(() => {
  const randomIndex = Math.floor(Math.random() * lessons.length);
  setRandomLesson(lessons[randomIndex]);
}, []);



  return (
    <main
      dir="rtl"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden 
             bg-gradient-to-b from-[#fff5cc] via-[#ffe88a] to-[#ffd95c] text-gray-800 pt-28 sm:pt-10 pb-24"
    >
      {/* ☀️ نور طلایی بالا */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#fff8dc]/90 to-transparent z-[2] blur-2xl pointer-events-none" />

      {/* 🧬 DNA طلایی پراکنده */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fffce6] to-[#ffefb3] overflow-hidden z-[1]">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.svg
            key={i}
            viewBox="0 0 100 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute opacity-30"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              transformOrigin: "center",
            }}
            animate={{ rotate: [0, i % 2 === 0 ? 360 : -360] }}
            transition={{
              duration: 80 + Math.random() * 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <defs>
              <linearGradient id={`dnaGrad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffd700" />
                <stop offset="100%" stopColor="#b8860b" />
              </linearGradient>
            </defs>
            <path
              d="M30,10 C50,30 50,70 30,90 C10,110 10,150 30,170"
              stroke={`url(#dnaGrad-${i})`}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M70,10 C50,30 50,70 70,90 C90,110 90,150 70,170"
              stroke={`url(#dnaGrad-${i})`}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </motion.svg>
        ))}
      </div>

      {/* 🏅 نوار دستاوردهای کودک */}
      <AchievementsBar />

      {/* 📅 باکس تقویم امروز */}
<TodayCalendarBox color="yellow" />


{/* 👶 بخش پروفایل کودک */}
<motion.section
  className="relative z-[5] flex flex-col sm:flex-row items-center justify-center text-center sm:text-right gap-6 mt-6 sm:mt-10 px-6"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  {/* 🔆 پس‌زمینه نوری ملایم */}
  <motion.div
    className="absolute -z-10 top-1/2 left-1/2 w-[320px] h-[320px] rounded-full bg-gradient-to-br from-yellow-200/70 via-yellow-100/50 to-transparent blur-3xl"
    animate={{ scale: [1, 1.04, 1] }}
    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
    style={{ transform: "translate(-50%, -50%)" }}
  />

  {/* 🖼️ تصویر کودک با حلقه طلایی */}
  <motion.div
    animate={{ y: [0, -8, 0] }}
    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
    className="relative flex items-center justify-center"
  >
    <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-[4px] bg-gradient-to-tr from-yellow-500 via-yellow-300 to-yellow-100 shadow-[0_0_25px_rgba(212,175,55,0.5)]">
      <div className="w-full h-full rounded-full bg-white/70 backdrop-blur-md overflow-hidden flex items-center justify-center">
        {childPhoto ? (
          <img
            src={childPhoto}
            alt={childName}
            className="w-full h-full object-cover"
          />
        ) : (
          <Baby className="w-20 h-20 text-yellow-700 drop-shadow-xl" />
        )}
      </div>
    </div>

    {/* ✏️ دکمه ویرایش کوچک روی عکس */}
    <Link
      to="/child-profile"
      className="absolute bottom-2 right-2 bg-yellow-400 text-white p-2 rounded-full shadow-md hover:bg-yellow-500 transition"
      title="ویرایش اطلاعات کودک"
    >
      ✏️
    </Link>
  </motion.div>

  {/* ℹ️ اطلاعات کودک */}
  <div className="sm:max-w-xs mt-6 sm:mt-0">
    <h1 className="text-3xl sm:text-4xl font-extrabold text-yellow-800 mb-2 drop-shadow-[0_0_12px_rgba(255,220,100,0.6)]">
      {childName}
    </h1>
    <p className="text-gray-700 text-sm sm:text-base mb-4">
      {ageText} ({gender === "girl" ? "دختر" : "پسر"})
    </p>

    {/* کارت وضعیت کوتاه */}
    <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl p-4 shadow-md text-[13px] leading-relaxed text-yellow-800 font-medium">
      <p>🎂 {daysLeft} روز مانده تا تولد</p>
      <p>🕓 سن: {ageText}</p>
      <p>🌸 جنسیت: {gender === "girl" ? "دختر" : "پسر"}</p>
    </div>
  </div>
</motion.section>



{/* 🌳 دکمه باز کردن درختواره */}
<motion.div
  className="relative z-[5] mt-10 mb-10 flex justify-center"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.6 }}
>
  <button
    onClick={() => setShowFamilyTree(true)}
    className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white px-8 py-3 rounded-2xl font-semibold shadow-md hover:from-yellow-600 hover:to-yellow-500 transition-all"
  >
    🌳 درختواره کودک من
  </button>
</motion.div>
<FamilyTree show={showFamilyTree} onClose={() => setShowFamilyTree(false)} />

{/* 🖼️ دکمه آلبوم خاطرات */}
<motion.div
  className="relative z-[5] -mt-6 mb-12 flex justify-center"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4, duration: 0.6 }}
>
  <Link
    to="/memory-album"
    className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#facc15] via-[#fbbf24] to-[#f59e0b] 
               text-white px-10 py-3 rounded-2xl font-semibold shadow-[0_0_20px_rgba(251,191,36,0.6)] 
               hover:scale-105 hover:shadow-[0_0_30px_rgba(251,191,36,0.8)] transition-all"
  >
    📸 آلبوم خاطرات
  </Link>
</motion.div>

{/* 🧠 جعبه آگاهی ژنینو */}
<motion.div
  className="relative z-[6] -mt-8 mb-10 w-full max-w-2xl"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <GeninoAwarenessBox
    image="/images/awareness/mychild/1.jpg"
    message="کودکان با هر نگاه، از ما یاد می‌گیرند 💛 آگاهی والد، روشنایی مسیر رشد کودک است."
    buttons={[
      { title: "بازی آزاد", link: "/articles/freeplay" },
      { title: "ژن های طلایی کودکی", link: "/articles/golden-child-genes" },
      { title: "ژن‌های مرتبط با هوش کودکان", link: "/articles/child-intelligence-genes" },
      { title: "محبت بدون شرط", link: "/articles/unconditional-love" },
      { title: "مقاله", link: "/articles/empathy" },
      { title: "مقاله", link: "/articles/empathy" },
    ]}
  />
</motion.div>

{/* 🌕 دکمه سکه‌ای پایش سلامت کودک */}
<motion.div
  className="relative z-[10] mt-6 mb-12 flex justify-center"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <Link to="/child-health-check" className="block">
    <GeninoHealthButton
      title="پایش سلامت کودک"
      icon={HeartPulse}
    />
  </Link>
</motion.div>



{/* 🩺 داشبورد سلامت کودک */}
<motion.section
  className="relative z-[6] mt-12 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 sm:px-8"
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>

  {/* ستون راست - سلامت فیزیکی */}
  <div className="bg-white/85 backdrop-blur-sm border border-yellow-200 rounded-3xl shadow-xl p-6 flex flex-col">
    <h2 className="text-xl sm:text-2xl font-extrabold text-yellow-700 mb-4 flex items-center gap-2">
      <span className="text-2xl">🧍‍♂️</span> سلامت فیزیکی کودک
    </h2>

    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
      بررسی رشد بدنی، تغذیه، خواب و فعالیت روزانه‌ی {childName}.
    </p>

    {/* کارت‌های شاخص رشد */}
<div className="grid grid-cols-2 gap-4 mb-6">

  {/* 📏 کارت قد - هوشمند */}
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-2xl p-4 text-center shadow-sm"
  >
    <p className="text-sm text-gray-500 mb-1">قد</p>

    {/* ورودی قد */}
    <input
      type="number"
      value={height || ""}
      onChange={(e) => setHeight(e.target.value)}
      placeholder="مثلاً 95"
      className="w-20 text-center font-bold text-xl text-yellow-700 bg-transparent border-b border-yellow-300 focus:outline-none focus:border-yellow-500 transition"
    />
    <span className="text-sm text-gray-500 ml-1">سانتی‌متر</span>

    {/* تحلیل */}
    {height && (
      <div className="mt-3 text-[13px] text-gray-700 leading-relaxed">
        <p>
          برای {gender === "girl" ? "دختر" : "پسر"} {ageYears} ساله،
          محدوده‌ی نرمال قد بین{" "}
          <span className="font-semibold text-yellow-700">
            {normalRange.min} تا {normalRange.max}
          </span>{" "}
          سانتی‌متر است.
        </p>
        <p
          className={`mt-1 font-medium ${
            status === "نرمال"
              ? "text-green-600"
              : status === "کوتاه"
              ? "text-red-600"
              : "text-orange-500"
          }`}
        >
          {childName} در محدوده{" "}
          {status === "نرمال"
            ? "نرمال ✅"
            : status === "کوتاه"
            ? "قدی پایین‌تر از میانگین ⚠️"
            : "بلندقدتر از میانگین 🔺"}{" "}
          قرار دارد.
        </p>
      </div>
    )}
  </motion.div>

  {/* ⚖️ کارت وزن - هوشمند */}
<motion.div
  whileHover={{ scale: 1.03 }}
  className="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-2xl p-4 text-center shadow-sm"
>
  <p className="text-sm text-gray-500 mb-1">وزن</p>

  {/* ورودی وزن */}
  <input
    type="number"
    value={weight || ""}
    onChange={(e) => setWeight(e.target.value)}
    placeholder="مثلاً 13"
    className="w-20 text-center font-bold text-xl text-yellow-700 bg-transparent border-b border-yellow-300 focus:outline-none focus:border-yellow-500 transition"
  />
  <span className="text-sm text-gray-500 ml-1">کیلوگرم</span>

  {/* تحلیل وزن */}
  {weight && (
    <div className="mt-3 text-[13px] text-gray-700 leading-relaxed">
      <p>
        برای {gender === "girl" ? "دختر" : "پسر"} {ageYears} ساله، محدوده‌ی نرمال وزن بین{" "}
        <span className="font-semibold text-yellow-700">
          {weightRange.min} تا {weightRange.max}
        </span>{" "}
        کیلوگرم است.
      </p>

      <p
        className={`mt-1 font-medium ${
          weightStatus === "نرمال"
            ? "text-green-600"
            : weightStatus === "پایین‌تر از میانگین"
            ? "text-red-600"
            : "text-orange-500"
        }`}
      >
        {childName} در محدوده{" "}
        {weightStatus === "نرمال"
  ? "نرمال ✅"
  : weightStatus === "پایین‌تر از میانگین"
  ? "پایین‌تر از میانگین ⚠️"
  : "بالاتر از میانگین 🔺"}
{" "}
        قرار دارد.
      </p>
    </div>
  )}
</motion.div>

{/* 🧮 کارت BMI - شاخص توده بدنی */}
<motion.div
  whileHover={{ scale: 1.03 }}
  className="col-span-2 bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-2xl p-4 text-center shadow-sm"
>
  <p className="text-sm text-gray-500 mb-1">شاخص توده بدنی (BMI)</p>

  {bmi ? (
    <>
      <p className="text-xl font-bold text-yellow-700">
        {bmi}{" "}
        <span className="text-sm text-gray-500 font-medium">(kg/m²)</span>
      </p>
      <p
  className={`mt-2 font-medium ${
    bmiStatus.includes("نرمال")
      ? "text-green-600"
      : bmiStatus.includes("کم‌وزن")
      ? "text-red-600"
      : "text-orange-500"
  }`}
>
  وضعیت: {bmiStatus}
</p>

{/* 💡 توصیه ژنینو */}
{bmiAdvice && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="mt-3 text-[13px] text-gray-700 leading-relaxed bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-xl p-3 shadow-inner text-right"
  >
    <p className="whitespace-pre-line">{bmiAdvice}</p>
  </motion.div>
)}
    </>
  ) : (
    <p className="text-gray-400 text-sm mt-2">
      ابتدا قد و وزن را وارد کنید تا BMI محاسبه شود.
    </p>
  )}
</motion.div>




  {/* 🏋️ سایر کارت‌ها */}
  {[
  ].map((item, i) => (
    <motion.div
      key={i}
      whileHover={{ scale: 1.03 }}
      className="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-2xl p-4 text-center shadow-sm"
    >
      <p className="text-sm text-gray-500">{item.label}</p>
      <p className="text-xl font-bold text-yellow-700">
        {item.value}{" "}
        <span className="text-sm font-medium">{item.unit}</span>
      </p>
    </motion.div>
  ))}
</div>


   
{/* 📘 آموزش سلامت فیزیکی کودک */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="mt-8 bg-white/90 backdrop-blur-sm border border-yellow-200 
             rounded-3xl shadow-lg p-6 text-right leading-relaxed"
>
  <h2 className="text-xl sm:text-2xl font-extrabold text-yellow-700 mb-5 flex items-center gap-2">
    🧩 آموزش سلامت فیزیکی کودک
  </h2>

  <p className="text-gray-600 text-sm mb-8 leading-relaxed">
    این بخش بر پایه یافته‌های علمی رشد جسمی، تغذیه، خواب و تحرک طراحی شده است.  
    رعایت این اصول باعث افزایش انرژی، رشد متعادل و تقویت سیستم ایمنی کودک می‌شود.
  </p>

  {/* 🍎 تغذیه متعادل و رشد سالم */}
<div
  onClick={() => toggleAccordion("nutrition")}
  className="cursor-pointer mb-4 bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 
             rounded-3xl p-5 shadow-sm hover:shadow-md transition"
>
  <h3 className="text-lg font-bold text-yellow-700 flex items-center justify-between">
    🍎 تغذیه متعادل و رشد سالم
    <span>{openAccordion === "nutrition" ? "−" : "+"}</span>
  </h3>

  {openAccordion === "nutrition" && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.4 }}
      className="mt-3 text-sm text-gray-700 leading-relaxed"
    >
      <p>
        بدن کودک برای رشد نیاز به تنوع غذایی دارد: پروتئین، لبنیات، میوه، سبزی و غلات کامل.  
        کمبود ویتامین D و آهن، از دلایل شایع تأخیر رشد است.
      </p>
      <ul className="list-disc pr-5 mt-2 text-[13px] text-gray-700 space-y-1">
        <li>✅ صبحانه شامل تخم‌مرغ، پنیر، میوه و نان سبوس‌دار باشد.</li>
        <li>✅ نوشیدنی اصلی، آب یا شیر است — نه نوشابه و آبمیوه صنعتی.</li>
        <li>❌ از تنقلات شور و پفک پرهیز شود.</li>
      </ul>
    </motion.div>
  )}
</div>

 {/* 😴 اهمیت خواب کافی */}
<div
  onClick={() => toggleAccordion("sleep")}
  className="cursor-pointer mb-4 bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 
             rounded-3xl p-5 shadow-sm hover:shadow-md transition"
>
  <h3 className="text-lg font-bold text-yellow-700 flex items-center justify-between">
    😴 اهمیت خواب کافی
    <span>{openAccordion === "sleep" ? "−" : "+"}</span>
  </h3>

  {openAccordion === "sleep" && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.4 }}
      className="mt-3 text-sm text-gray-700 leading-relaxed"
    >
      <p>
      رشد جسمی عمدتاً در خواب شبانه اتفاق می‌افتد، زیرا در آن زمان هورمون رشد ترشح می‌شود.  
      بی‌خوابی، مستقیماً باعث ضعف تمرکز و کاهش رشد می‌شود.
      </p>
    <ul className="text-[13px] text-gray-700 space-y-2 list-disc pr-5">
      <li>✅ کودک ۳ تا ۵ ساله: ۱۰ تا ۱۳ ساعت خواب در شبانه‌روز.</li>
      <li>✅ کودک ۶ تا ۱۲ ساله: ۹ تا ۱۲ ساعت خواب.</li>
      <li>❌ وسایل دیجیتال حداقل یک ساعت قبل از خواب کنار گذاشته شوند.</li>
      </ul>
          <p className="mt-4 text-[12px] text-yellow-800 font-medium border-t border-yellow-100 pt-3">
      🌙 هر ساعت خواب شب، یعنی یک قدم بلندتر شدن بدن کودک.
    </p>
    </motion.div>
  )}
</div>

  {/* 🏃‍♀️ تحرک روزانه و بازی فعال */}
<div
  onClick={() => toggleAccordion("activity")}
  className="cursor-pointer mb-4 bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 
             rounded-3xl p-5 shadow-sm hover:shadow-md transition"
>
  <h3 className="text-lg font-bold text-yellow-700 flex items-center justify-between">
    🏃‍♀️ تحرک روزانه و بازی فعال 
    <span>{openAccordion === "activity" ? "−" : "+"}</span>
  </h3>

  {openAccordion === "activity" && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.4 }}
      className="mt-3 text-sm text-gray-700 leading-relaxed"
    >
      <p>
      بازی، نه تنها عضلات را تقویت می‌کند، بلکه به رشد مغز و تنظیم احساسات هم کمک می‌کند.  
      طبق توصیه سازمان جهانی بهداشت، کودکان باید روزانه حداقل یک ساعت بازی فعال داشته باشند.
      </p>
    <ul className="text-[13px] text-gray-700 space-y-2 list-disc pr-5">
      <li>✅ بازی‌های آزاد مثل دویدن، پریدن و رقص بهترین ورزش‌اند.</li>
      <li>✅ اجازه دهید کودک خودش نوع بازی را انتخاب کند.</li>
      <li>❌ محدود کردن بیش از حد تحرک، رشد طبیعی را کند می‌کند.</li>
    </ul>
    <p className="mt-4 text-[12px] text-yellow-800 font-medium border-t border-yellow-100 pt-3">
      🌈 حرکت، زبان رشد کودکان است.
    </p>
    </motion.div>
  )}
</div>

 {/* ⚖️ پایش رشد با آرامش */}
<div
  onClick={() => toggleAccordion("growth")}
  className="cursor-pointer mb-4 bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 
             rounded-3xl p-5 shadow-sm hover:shadow-md transition"
>
  <h3 className="text-lg font-bold text-yellow-700 flex items-center justify-between">
    ⚖️ پایش رشد با آرامش 
    <span>{openAccordion === "growth" ? "−" : "+"}</span>
  </h3>

  {openAccordion === "growth" && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.4 }}
      className="mt-3 text-sm text-gray-700 leading-relaxed"
    >
      <p>
      وزن و قد، تنها شاخص‌های سلامت نیستند.  
      نشاط، اشتها، خواب و انرژی روزانه، نشانه‌های واقعی سلامت‌اند.
      </p>
    <ul className="text-[13px] text-gray-700 space-y-2 list-disc pr-5">
      <li>✅ اندازه‌گیری رشد ماهی یک‌بار کافی است.</li>
      <li>✅ به‌جای مقایسه با دیگران، تغییرات خود کودک را دنبال کنید.</li>
      <li>❌ هرگز کودک را بابت وزنش سرزنش نکنید.</li>
    </ul>
    <p className="mt-4 text-[12px] text-yellow-800 font-medium border-t border-yellow-100 pt-3">
      🌱 عدد ترازو، ارزش کودک را تعیین نمی‌کند.
    </p>
    </motion.div>
  )}
</div>


{/* 📚 منابع علمی ژنینو */}
<div
  onClick={() => toggleAccordion("sources")}
  className="cursor-pointer mb-4 bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 
             rounded-3xl p-5 shadow-sm hover:shadow-md transition"
>
  <h3 className="text-lg font-bold text-yellow-700 flex items-center justify-between">
    📚 منابع علمی ژنینو 
    <span>{openAccordion === "sources" ? "−" : "+"}</span>
  </h3>

  {openAccordion === "sources" && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.4 }}
      className="mt-3 text-sm text-gray-700 leading-relaxed"
    >
    <ul className="text-[13px] text-gray-700 space-y-2 list-disc pr-5">
      <li><strong>WHO</strong> – Child Growth Standards (2021)</li>
      <li><strong>American Academy of Pediatrics</strong> – Nutrition & Growth Guidelines (2020)</li>
      <li><strong>Sleep Foundation</strong> – Recommended Sleep for Children (2022)</li>
      <li><strong>CDC</strong> – Physical Activity Guidelines for Children (2020)</li>
      <li><strong>Harvard School of Public Health</strong> – Healthy Eating for Kids (2023)</li>
    </ul>
    <p className="mt-3 text-yellow-700 font-medium text-[11px]">
      این بخش بر اساس استانداردهای جهانی رشد، خواب و تغذیه‌ی کودک تنظیم شده است.
    </p>
    </motion.div>
  )}
</div>
</motion.div>

  </div>


  {/* ستون چپ - سلامت روحی */}
  <div className="bg-white/85 backdrop-blur-sm border border-yellow-200 rounded-3xl shadow-xl p-6 flex flex-col">
    <h2 className="text-xl sm:text-2xl font-extrabold text-yellow-700 mb-4 flex items-center gap-2">
      <span className="text-2xl">🧠</span> سلامت روحی و عاطفی کودک
    </h2>

    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
      پیگیری احساسات، تمرکز و ارتباطات اجتماعی {childName}.
    </p>

    {/* کارت‌های وضعیت احساسی */}
    <div className="grid grid-cols-2 gap-4 mb-6">
      {[
      ].map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.03 }}
          className="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-2xl p-4 text-center shadow-sm"
        >
          <p className="text-sm text-gray-500">{item.label}</p>
          <p className="text-lg font-bold text-yellow-700">{item.value}</p>
        </motion.div>
      ))}
    </div>
    {/* 🧠 کارت تست ژنینو */}
<motion.div
  whileHover={{ scale: 1.03 }}
  onClick={() => setShowTestModal(true)}
  className="cursor-pointer bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-2xl p-5 text-center shadow-md hover:shadow-lg transition"
>
  <p className="text-lg font-bold text-yellow-700 mb-1">🧠 تست ژنینو</p>
  <p className="text-sm text-gray-600">ارزیابی سلامت عاطفی و اجتماعی کودک</p>
</motion.div>


    {testResult && (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-6 bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-2xl p-5 shadow-inner"
  >
    <h3 className="font-bold text-yellow-700 mb-2">🔍 نتیجه تست ژنینو</h3>
    <p className="text-sm text-gray-800 mb-1">
      وضعیت کلی: <span className="font-semibold">{testResult.result}</span>
    </p>
    <p className="text-[13px] text-gray-700 leading-relaxed whitespace-pre-line">
      {testResult.advice}
    </p>
  </motion.div>
)}

{/* 📘 آموزش والد آگاه */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="mt-8 bg-white/90 backdrop-blur-sm border border-yellow-200 
             rounded-3xl shadow-lg p-6 text-right leading-relaxed"
>
  <h2 className="text-xl sm:text-2xl font-extrabold text-yellow-700 mb-5 flex items-center gap-2">
    📘 آموزش والد آگاه
  </h2>

  <p className="text-gray-600 text-sm mb-8 leading-relaxed">
    این بخش بر پایه‌ی یافته‌های علمی روان‌شناسی رشد و ارتباط والدـ‌کودک طراحی شده است.  
    با رعایت این اصول، والدین می‌توانند رشد هیجانی، اعتماد‌به‌نفس و آرامش درونی کودک را تقویت کنند.
  </p>


  {/* 💛 اصل طلایی والد آگاه */}
<div
  onClick={() => toggleAccordion("calm")}
  className="cursor-pointer mb-4 bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 
             rounded-3xl p-5 shadow-sm hover:shadow-md transition"
>
  <h3 className="text-lg font-bold text-yellow-700 flex items-center justify-between">
    💛 اصل طلایی والد آگاه 
    <span>{openAccordion === "calm" ? "−" : "+"}</span>
  </h3>

  {openAccordion === "calm" && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.4 }}
      className="mt-3 text-sm text-gray-700 leading-relaxed"
    >
      <p>
      هرگز با تندی یا پرخاش با کودک خود سخن نگویید. مغز کودک در این حالت هورمون استرس آزاد می‌کند  
      و احساس امنیت و تمرکز او کاهش می‌یابد. در لحظه‌ی خشم، مکث کنید و لحن خود را نرم کنید.
      </p>
    <ul className="text-[13px] text-gray-700 space-y-2 list-disc pr-5">
      <li>❌ «چرا همیشه این کار رو می‌کنی؟» → ✅ «الان ناراحتم، بیا با هم درستش کنیم.»</li>
      <li>❌ «گفتم زود بخواب!» → ✅ «می‌خوای با هم کتاب بخونیم بعد بخوابی؟»</li>
    </ul>
    <p className="mt-4 text-[12px] text-yellow-800 font-medium border-t border-yellow-100 pt-3">
      🌱 والد آرام، کودک آرام می‌سازد. صدای مهربانی والد، زبان امنیت مغز کودک است.
    </p>
    </motion.div>
  )}
</div>

 {/* 💬 قانون گفت‌وگو در خانواده */}
<div
  onClick={() => toggleAccordion("talk")}
  className="cursor-pointer mb-4 bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 
             rounded-3xl p-5 shadow-sm hover:shadow-md transition"
>
  <h3 className="text-lg font-bold text-yellow-700 flex items-center justify-between">
    💬 قانون گفت‌وگو در خانواده 
    <span>{openAccordion === "talk" ? "−" : "+"}</span>
  </h3>

  {openAccordion === "talk" && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.4 }}
      className="mt-3 text-sm text-gray-700 leading-relaxed"
    >
      <p>
      گفت‌وگوی واقعی یعنی شنیدن احساس کودک، نه فقط پاسخ دادن به حرفش.  
      وقتی والد گوش می‌دهد بدون قضاوت، همکاری و احترام در رفتار کودک تقویت می‌شود.
      </p>
    <ul className="text-[13px] text-gray-700 space-y-2 list-disc pr-5">
      <li>❌ «وسایلتو جمع کن!» → ✅ «می‌خوای الان جمعش کنیم یا بعد از شام؟»</li>
      <li>✅ «می‌بینم ناراحتی چون بازی‌ت تموم شده.»</li>
    </ul>
    <p className="mt-4 text-[12px] text-yellow-800 font-medium border-t border-yellow-100 pt-3">
      🌱 کودک شنیده‌شده، کودک همکار است.
    </p>
    </motion.div>
  )}
</div>

{/* 🌈 تشخیص احساسات کودک */}
<div
  onClick={() => toggleAccordion("emotion")}
  className="cursor-pointer mb-4 bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 
             rounded-3xl p-5 shadow-sm hover:shadow-md transition"
>
  <h3 className="text-lg font-bold text-yellow-700 flex items-center justify-between">
    🌈 تشخیص احساسات کودک 
    <span>{openAccordion === "emotion" ? "−" : "+"}</span>
  </h3>

  {openAccordion === "emotion" && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.4 }}
      className="mt-3 text-sm text-gray-700 leading-relaxed"
    >
      <p>
      هر رفتار، زبان احساسات کودک است. گاهی پشت فریاد، ترس یا خستگی پنهان شده.  
      والد آگاه احساس را می‌بیند و از آن برای رشد هیجانی کودک استفاده می‌کند.
      </p>
    <ul className="text-[13px] text-gray-700 space-y-2 list-disc pr-5">
      <li>✅ «می‌فهمم عصبانی شدی، ولی نمی‌تونیم داد بزنیم. بیا بگو چی اذیتت کرده.»</li>
      <li>✅ «می‌دونم غصه‌داری. من کنارتم.»</li>
    </ul>
    <p className="mt-4 text-[12px] text-yellow-800 font-medium border-t border-yellow-100 pt-3">
      🌱 کودکی که احساسش فهمیده می‌شود، آرام می‌شود.
    </p>
    </motion.div>
  )}
</div>
  

  {/* 📚 منابع علمی ژنینو */}
<div
  onClick={() => toggleAccordion("mindSources")}
  className="cursor-pointer mb-4 bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 
             rounded-3xl p-5 shadow-sm hover:shadow-md transition"
>
  <h3 className="text-lg font-bold text-yellow-700 flex items-center justify-between">
    📚 منابع علمی ژنینو 
    <span>{openAccordion === "mindSources" ? "−" : "+"}</span>
  </h3>

  {openAccordion === "mindSources" && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.4 }}
      className="mt-3 text-sm text-gray-700 leading-relaxed"
    >
    <ul className="text-[13px] text-gray-700 space-y-2 list-disc pr-5">
      <li><strong>Harvard Center on the Developing Child</strong> – Serve & Return Communication (2020)</li>
      <li><strong>John Gottman</strong> – Raising an Emotionally Intelligent Child (1998)</li>
      <li><strong>Daniel J. Siegel</strong> – The Whole-Brain Child (2012)</li>
      <li><strong>Parent-Child Interaction Therapy</strong> (PCIT, 2020)</li>
      <li><strong>American Psychological Association</strong> – Early Emotional Development (2021)</li>
    </ul>
    <p className="mt-3 text-yellow-700 font-medium text-[11px]">
      این بخش با الهام از یافته‌های روان‌شناسی رشد، علوم مغز کودک و پژوهش‌های دانشگاهی تنظیم شده است.
    </p>
    </motion.div>
  )}
</div>

</motion.div>
  </div>
</motion.section>

{/* مودال حذف جدول رشد حذف شده */}
<GeninoConfirmModal
  show={showDeleteModal}
  title="آیا مطمئن هستید؟"
  message={`آیا می‌خواهید این رکورد رشد ${childName} را حذف کنید؟ حذف این داده قابل بازگردانی نیست.`}
  confirmText="بله، حذف کن"
  cancelText="انصراف"
  onConfirm={() => {
    const updated = growthRecords.filter((_, idx) => idx !== recordToDelete);
    setGrowthRecords(updated);
    localStorage.setItem("growthRecords", JSON.stringify(updated));
    setShowDeleteModal(false);
    setRecordToDelete(null);
  }}
  onCancel={() => {
    setShowDeleteModal(false);
    setRecordToDelete(null);
  }}
/>

{/* 🧩 مودال تست ژنینو */}
<GoldenModal
  show={showTestModal}
  title="🧠 تست سلامت عاطفی ژنینو"
  description={`این پرسش‌ها با توجه به سن ${childName} (${ageYears} ساله) طراحی شده‌اند. پاسخ به آن‌ها در تحلیل رشد احساسی و اجتماعی کودک شما مؤثر است.`}
  onConfirm={analyzeTest}
  onCancel={() => setShowTestModal(false)}
  confirmLabel="تحلیل نتایج"
  cancelLabel="انصراف"
>
  <div className="space-y-5 text-sm text-gray-700 leading-relaxed">
    {[
      {
        id: 1,
        q: "وقتی ناراحت یا عصبانی می‌شود، آیا کودک می‌تواند بدون گریه یا فریاد خودش را آرام کند؟",
      },
      {
        id: 2,
        q: "آیا کودک هنگام بازی با هم‌سالانش، نوبت را رعایت می‌کند یا همکاری دارد؟",
      },
      {
        id: 3,
        q: "وقتی کسی ناراحت است، آیا کودک متوجه می‌شود و واکنش همدلانه نشان می‌دهد؟",
      },
    ].map((item) => (
      <div key={item.id}>
        <p className="font-medium text-yellow-700 mb-2">{item.id}. {item.q}</p>
        <div className="flex gap-2">
          {[
            { label: "🟢 بله، معمولاً می‌تواند", val: 2 },
            { label: "🟡 گاهی نیاز به کمک دارد", val: 1 },
            { label: "🔴 خیر، معمولاً نمی‌تواند", val: 0 },
          ].map((opt) => (
            <label
              key={opt.val}
              className={`flex-1 border rounded-xl px-3 py-2 text-center cursor-pointer transition 
                ${testAnswers[item.id] === opt.val
                  ? "bg-yellow-100 border-yellow-400"
                  : "bg-white hover:bg-yellow-50 border-gray-200"}`}
            >
              <input
                type="radio"
                name={`q${item.id}`}
                value={opt.val}
                className="hidden"
                onChange={() =>
                  setTestAnswers((prev) => ({ ...prev, [item.id]: opt.val }))
                }
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>
    ))}
  </div>
</GoldenModal>

{/* مودال نکته روزانه */}
<GoldenModal
  show={showWelcomeModal}
  title={randomLesson?.title}
  description="🌟 نکته امروز ژنینو برای رشد سالم و آگاهانه کودک شما"
  onConfirm={() => setShowWelcomeModal(false)}
  confirmLabel="متوجه شدم"
>
  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
    {randomLesson?.content}
  </p>
</GoldenModal>


</main>
);
}
