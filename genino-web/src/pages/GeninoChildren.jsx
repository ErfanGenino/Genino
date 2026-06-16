import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, RotateCcw, Sparkles, Trophy, Heart, Star } from "lucide-react";
import {
  getGeninoChildren,
  getFollowedGeninoChildren,
  createChildFollowRequest,
  authFetch,
} from "../services/api";
import logo from "../assets/logo-genino.png";
import childrenHero from "../assets/genino-children-page.jpg";
import { Baby } from "lucide-react";
import { Link } from "react-router-dom";

const sampleChildren = Array.from({ length: 20 }).map((_, index) => ({
  id: index + 1,

  fullName: [
    "حنا",
    "آراد",
    "نیکی",
    "رادین",
    "یلدا",
    "سام",
    "درسا",
    "آترین",
    "رها",
    "بردیا",
    "نیلا",
    "مانی",
    "آوا",
    "کیان",
    "هلیا",
    "آرتین",
    "مهسا",
    "ایلیا",
    "ترمه",
    "دانیال",
  ][index],

  photo: logo,

  followed: index % 3 === 0,
}));

const sampleAchievements = Array.from({ length: 12 }).map((_, index) => ({
  id: index + 1,
  type: [
    "دستاورد هنری",
    "دستاورد ورزشی",
    "دستاورد پرورشی",
    "دستاورد علمی",
    "دستاورد معنوی",
  ][index % 5],
  child: sampleChildren[index % sampleChildren.length],
  issuer: {
    name: [
      "مدرسه رشد",
      "آموزشگاه موسیقی سل",
      "باشگاه ستاره‌ها",
      "مرکز خلاقیت کودک",
    ][index % 4],
    image: logo,
  },
}));


const sampleTopReceivers = Array.from({ length: 100 }).map((_, index) => {
  const art = (index * 2 + 3) % 12;
  const sport = (index * 3 + 2) % 10;
  const nurture = (index * 4 + 1) % 9;
  const science = (index * 5 + 4) % 11;
  const spiritual = (index * 2 + 1) % 8;

  return {
    rank: index + 1,
    child: sampleChildren[index % sampleChildren.length],
    art,
    sport,
    nurture,
    science,
    spiritual,
    total: art + sport + nurture + science + spiritual,
  };
});

const sampleTopIssuers = Array.from({ length: 100 }).map((_, index) => {
  const total = 120 - index;

  return {
    rank: index + 1,
    name: [
      "مدرسه رشد",
      "آموزشگاه موسیقی سل",
      "باشگاه ستاره‌ها",
      "مرکز خلاقیت کودک",
      "معلم خصوصی زبان آوا",
    ][index % 5],
    image: logo,
    activityType: [
      "مدرسه",
      "کلاس هنری",
      "باشگاه ورزشی",
      "مرکز پرورشی",
      "معلم خصوصی زبان",
    ][index % 5],
    description:
      "ارائه خدمات آموزشی و رشد کودک با تمرکز بر استعداد، مهارت و مسیر پیشرفت فردی.",
    issuedTypes: [
      "دستاورد علمی",
      "دستاورد هنری",
      "دستاورد ورزشی",
      "دستاورد پرورشی",
      "دستاورد معنوی",
    ][index % 5],
    total,
  };
});

const dnaStrands = [
  { top: "5%", left: "6%", duration: 70, direction: 360 },
  { top: "12%", left: "78%", duration: 85, direction: -360 },
  { top: "30%", left: "15%", duration: 90, direction: 360 },
  { top: "42%", left: "88%", duration: 75, direction: -360 },
  { top: "58%", left: "8%", duration: 95, direction: 360 },
  { top: "72%", left: "70%", duration: 80, direction: -360 },
  { top: "84%", left: "28%", duration: 88, direction: 360 },
  { top: "92%", left: "86%", duration: 78, direction: -360 },
];
const sectionCard =
  "relative z-20 mx-auto mt-8 max-w-7xl overflow-hidden rounded-[2rem] border border-yellow-200/80 bg-white/70 p-4 shadow-[0_24px_80px_rgba(180,130,30,0.14)] backdrop-blur-xl sm:p-6";

const goldenTitle =
  "bg-gradient-to-l from-yellow-900 via-yellow-700 to-amber-500 bg-clip-text text-transparent";

const softButton =
  "rounded-2xl border border-yellow-200 bg-white/80 px-5 py-3 text-sm font-extrabold text-yellow-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-yellow-50 hover:shadow-md";

const primaryButton =
  "rounded-2xl bg-gradient-to-l from-yellow-500 via-amber-400 to-yellow-300 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-yellow-400/25 transition hover:-translate-y-0.5 hover:shadow-xl";

export default function GeninoChildren() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChild, setSelectedChild] = useState(null);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [followRole, setFollowRole] = useState("");
  const [achievementTab, setAchievementTab] = useState("1"); 
  const [latestAchievements, setLatestAchievements] = useState([]);
  const [topReceivers, setTopReceivers] = useState([]);   
  const [selectedIssuer, setSelectedIssuer] = useState(null);
  const [showIssuerInfoModal, setShowIssuerInfoModal] = useState(false);
  const [selectedYear, setSelectedYear] = useState("1405");
  const [selectedMonth, setSelectedMonth] = useState("همه ماه‌ها");
  const [achievementListModal, setAchievementListModal] = useState(null);
  const [selectedAchievementDetail, setSelectedAchievementDetail] = useState(null);
  const [issuerYear, setIssuerYear] = useState("1405");
  const [issuerMonth, setIssuerMonth] = useState("همه ماه‌ها");
  const [issuerReceiversModal, setIssuerReceiversModal] = useState(null);
  const [children, setChildren] = useState([]);
  const [followedChildren, setFollowedChildren] = useState([]);
  const [visibleChildren, setVisibleChildren] = useState([]);
  const [shownChildIds, setShownChildIds] = useState([]);
  const [childrenPageIndex, setChildrenPageIndex] = useState(0);
  const [achievementItems, setAchievementItems] = useState([]);
  const [topIssuers, setTopIssuers] = useState([]);
  const isLoggedIn = !!localStorage.getItem("genino_token");


  const getChildAgeText = (child) => {
  if (child?.ageText) return child.ageText;
  if (!child?.birthDate) return "سن ثبت نشده";

  const birth = new Date(child.birthDate);
  const today = new Date();

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();

  if (today.getDate() < birth.getDate()) months--;

  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years} سال و ${months} ماه`;
};

const getChildCityText = (child) => {
  return child?.city || child?.province || child?.address || "شهر ثبت نشده";
};

const getFullChildForModal = (child) => {
  if (!child?.id) return child;

  const fullChild =
    children.find((c) => c.id === child.id) ||
    followedChildren.find((c) => c.id === child.id);

  return {
    ...child,
    ...(fullChild || {}),
  };
};


  const followRoles = [
  { value: "sister", label: "خواهر" },
  { value: "brother", label: "برادر" },
  { value: "khale", label: "خاله" },
  { value: "amme", label: "عمه" },
  { value: "dayi", label: "دایی" },
  { value: "ammo", label: "عمو" },
  { value: "grandfather_paternal", label: "پدربزرگ پدری" },
  { value: "grandmother_paternal", label: "مادربزرگ پدری" },
  { value: "grandfather_maternal", label: "پدربزرگ مادری" },
  { value: "grandmother_maternal", label: "مادربزرگ مادری" },
  { value: "friend", label: "سایر دوستان" },
];
const getIssuerRoleLabel = (role) => {
  const map = {
    father: "پدر",
    mother: "مادر",
    sister: "خواهر",
    brother: "برادر",
    khale: "خاله",
    amme: "عمه",
    dayi: "دایی",
    ammo: "عمو",
    grandfather_paternal: "پدربزرگ پدری",
    grandmother_paternal: "مادربزرگ پدری",
    grandfather_maternal: "پدربزرگ مادری",
    grandmother_maternal: "مادربزرگ مادری",
    friend: "سایر دوستان",
    "عضو درختواره": "عضو درختواره",
  };

  return map[role] || role || "عضو درختواره";
};

  const filteredChildren = useMemo(() => {
  return visibleChildren.filter((child) =>
    (child.fullName || "")
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase())
  );
}, [visibleChildren, searchTerm]);

  useEffect(() => {
  loadChildren();
  loadLatestAchievements();
  loadTopReceivers();
  loadTopIssuers();
}, []);

useEffect(() => {
  loadLatestAchievements();
}, [achievementTab]);

useEffect(() => {
  loadTopReceivers();
}, [selectedYear, selectedMonth]);

useEffect(() => {
  loadTopIssuers();
}, [issuerYear, issuerMonth]);

async function loadChildren() {
  try {
    const [childrenRes, followedRes] = await Promise.all([
      getGeninoChildren(),
      getFollowedGeninoChildren(),
    ]);

    if (childrenRes?.ok) {
  setChildren(childrenRes.children || []);
}

if (Array.isArray(followedRes)) {
  setFollowedChildren(followedRes);
} else if (followedRes?.ok) {
  setFollowedChildren(followedRes.children || []);
}


  } catch (error) {
    console.error("❌ Error loading children:", error);
  }
}

async function loadLatestAchievements() {
  try {
    const res = await authFetch(
  `/child-achievements/latest?days=${achievementTab}`
);

    if (res?.ok) {
      setLatestAchievements(res.achievements || []);
    }
  } catch (error) {
    console.error(
      "❌ Error loading latest achievements:",
      error
    );
  }
}

async function loadTopReceivers() {
  try {
    const params = new URLSearchParams({
      year: selectedYear,
      month: selectedMonth,
    });

    const res = await authFetch(
      `/child-achievements/top-receivers?${params.toString()}`
    );

    if (res?.ok) {
      setTopReceivers(res.receivers || []);
    }
  } catch (error) {
    console.error(
      "❌ Error loading top receivers:",
      error
    );
  }
}

async function loadTopIssuers() {
  try {
    const params = new URLSearchParams({
      year: issuerYear,
      month: issuerMonth,
    });

    const res = await authFetch(
      `/child-achievements/top-issuers?${params.toString()}`
    );

    if (res?.ok) {
      setTopIssuers(res.issuers || []);
    }
  } catch (error) {
    console.error(
      "❌ Error loading top issuers:",
      error
    );
  }
}

function loadNextChildrenPage(customList = null) {
  const baseList =
    customList ||
    (activeTab === "followed" ? followedChildren : children);

  if (!Array.isArray(baseList) || baseList.length === 0) {
    setVisibleChildren([]);
    setShownChildIds([]);
    setChildrenPageIndex(0);
    return;
  }

  const remainingChildren = baseList.filter(
    (child) => !shownChildIds.includes(child.id)
  );

  // اگر همه کودکان قبلاً نمایش داده شده‌اند، از اول با ترتیب رندوم جدید شروع کن
  if (remainingChildren.length === 0) {
    const randomizedList = [...baseList].sort(() => Math.random() - 0.5);
    const nextChildren = randomizedList.slice(0, 30);

    setVisibleChildren(nextChildren);
    setShownChildIds(nextChildren.map((child) => child.id));
    setChildrenPageIndex(1);
    return;
  }

  const nextChildren = remainingChildren.slice(0, 30);

  setVisibleChildren(nextChildren);
  setShownChildIds((prev) => [
    ...prev,
    ...nextChildren.map((child) => child.id),
  ]);
  setChildrenPageIndex((prev) => prev + 1);
}

useEffect(() => {
  const baseList = activeTab === "followed" ? followedChildren : children;

  if (baseList.length > 0) {
    setShownChildIds([]);
    setChildrenPageIndex(0);

    const randomizedList = [...baseList].sort(() => Math.random() - 0.5);
    const firstChildren = randomizedList.slice(0, 30);

    setVisibleChildren(firstChildren);
    setShownChildIds(firstChildren.map((child) => child.id));
    setChildrenPageIndex(1);
  } else {
    setVisibleChildren([]);
  }
}, [activeTab, children, followedChildren]);


  const openAchievementList = async (
  child,
  type,
  count
) => {
  if (!count || count <= 0) return;

  const categoryMap = {
    "دستاورد هنری": "art",
    "دستاورد ورزشی": "sport",
    "دستاورد پرورشی": "nurture",
    "دستاورد علمی": "science",
    "دستاورد معنوی": "spiritual",
  };

  try {
    const category = categoryMap[type];

    const res = await authFetch(
      `/child-achievements/child/${child.id}/list?category=${category}`
    );

    if (!res?.ok) {
      alert(
        res?.message ||
          "دریافت دستاوردها انجام نشد."
      );
      return;
    }

    setAchievementItems(res.achievements || []);

    setAchievementListModal({
      child,
      type,
    });
  } catch (err) {
    console.error(err);

    alert("خطا در دریافت دستاوردها");
  }
};

const openIssuerReceivers = (issuer) => {
  const receivers = Array.from({ length: Math.min(issuer.total, 20) }).map(
    (_, index) => sampleChildren[index % sampleChildren.length]
  );

  setIssuerReceiversModal({
    issuer,
    receivers,
  });
};

const handleUnfollowChild = async () => {
  if (!selectedChild?.id) return;

  const ok = window.confirm(
    `آیا مطمئن هستید که می‌خواهید ${selectedChild.fullName} را آنفالو کنید؟`
  );

  if (!ok) return;

  const res = await authFetch(
    `/child-follow-requests/${selectedChild.id}/unfollow`,
    {
      method: "DELETE",
    }
  );

  if (res?.ok) {
    alert("کودک آنفالو شد");

    setSelectedChild(null);
    await loadChildren();
  } else {
    alert(res?.message || "خطا در آنفالو کودک");
  }
};

if (!isLoggedIn) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,223,120,0.35),transparent_35%),linear-gradient(180deg,#fffdf8,#fff7df,#fffdf8)] px-4 py-8 text-right">
      <section className={`${sectionCard} mt-0 max-w-2xl text-center`}>
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-yellow-100 to-yellow-50 shadow-inner">
          <Sparkles className="h-10 w-10 text-yellow-600" />
        </div>

        <h1 className={`${goldenTitle} text-2xl font-black sm:text-3xl`}>
          ورود به حساب کاربری
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-8 text-gray-600">
          برای مشاهده کودکان ژنینویی، دنبال‌کردن کودکان و دسترسی به دستاوردها، ابتدا وارد حساب کاربری خود شوید.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/login" className={primaryButton}>
            ورود به حساب کاربری
          </Link>

          <Link to="/" className={softButton}>
            بازگشت
          </Link>
        </div>
      </section>
    </main>
  );
}




  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,223,120,0.35),transparent_35%),linear-gradient(180deg,#fffdf8,#fff7df,#fffdf8)] px-4 py-8 text-right">

        {/* بک‌گراند DNA متحرک ژنینو */}
<div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-[#fffdf8] to-[#f7f3e6]">
  {dnaStrands.map((item, i) => (
    <motion.svg
      key={i}
      viewBox="0 0 100 200"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute opacity-25"
      style={{
        top: item.top,
        left: item.left,
        width: "120px",
        height: "240px",
        transformOrigin: "center",
      }}
      animate={{ rotate: [0, item.direction] }}
      transition={{
        duration: item.duration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <defs>
        <linearGradient id={`geninoChildrenDna-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#b88a1a" />
        </linearGradient>
      </defs>

      <path
        d="M30,10 C50,30 50,70 30,90 C10,110 10,150 30,170"
        stroke={`url(#geninoChildrenDna-${i})`}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      <path
        d="M70,10 C50,30 50,70 70,90 C90,110 90,150 70,170"
        stroke={`url(#geninoChildrenDna-${i})`}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {Array.from({ length: 6 }).map((_, j) => (
        <line
          key={j}
          x1="30"
          y1={20 + j * 25}
          x2="70"
          y2={30 + j * 25}
          stroke={`url(#geninoChildrenDna-${i})`}
          strokeWidth="1.5"
          opacity="0.7"
        />
      ))}
    </motion.svg>
  ))}
</div>


        {/* باکس کودکان ژنینویی */} 
      <section className={`${sectionCard} mt-0`}>
        <div className="mb-5 text-center">
          <div className="mx-auto mb-4 w-full max-w-md overflow-hidden rounded-3xl border-2 border-[#d4af37] bg-white p-1 shadow-[0_10px_25px_rgba(212,175,55,0.22)]">
  <div className="overflow-hidden rounded-2xl bg-yellow-50">
    <img
      src={childrenHero}
      alt="کودکان ژنینویی"
      className="h-36 w-full object-cover sm:h-44"
    />
  </div>
</div>

          <div className="mb-3 flex items-center justify-center gap-2 text-sm font-bold text-yellow-700">
  <Sparkles className="h-4 w-4" />
  دنیای طلایی رشد و استعداد کودکان
</div>

<h1 className={`${goldenTitle} text-3xl font-black drop-shadow-sm sm:text-4xl`}>
  کودکان ژنینویی
</h1>

<p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-600">
  اینجا می‌توانید کودکان ژنینویی را ببینید، دنبال کنید و مسیر رشد و دستاوردهایشان را مشاهده کنید.
</p>
        </div>

        <div className="mx-auto mb-5 grid max-w-md grid-cols-2 gap-2 rounded-2xl bg-yellow-50 p-1 border-2 border-[#d4af37] shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`rounded-xl py-2 text-sm font-bold transition ${
              activeTab === "all"
                ? "bg-white text-yellow-700 shadow-sm"
                : "text-gray-500"
            }`}
          >
            تمام کودکان ژنینویی
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("followed")}
            className={`rounded-xl py-2 text-sm font-bold transition ${
              activeTab === "followed"
                ? "bg-white text-yellow-700 shadow-sm"
                : "text-gray-500"
            }`}
          >
            کودکان فالو شده
          </button>
        </div>

        <div className="relative mx-auto mb-6 max-w-lg">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-yellow-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجوی نام کودک..."
            className="w-full rounded-2xl border border-yellow-200 bg-white py-3 pr-4 pl-11 text-sm text-gray-700 outline-none transition focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredChildren.slice(0, 30).map((child, index) => (
            <motion.div
              key={child.id}
              onClick={() => setSelectedChild(child)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.02 }}
              className="group cursor-pointer rounded-[1.5rem] border border-yellow-200/80 bg-white/80 p-3 shadow-[0_10px_30px_rgba(180,130,30,0.10)] transition hover:-translate-y-1 hover:border-yellow-300 hover:shadow-[0_18px_45px_rgba(180,130,30,0.20)]"
            >
              <div className="mb-3 flex h-32 items-center justify-center overflow-hidden rounded-2xl border border-yellow-100 bg-gradient-to-br from-yellow-50 to-white">
                {child.photo ? (
  <img
    src={child.photo}
    alt={child.fullName}
    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
  />
) : (
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-yellow-50 to-pink-50">
    <Baby className="h-16 w-16 text-yellow-500" />
  </div>
)}
              </div>

              <p className="text-center text-sm font-extrabold text-gray-700">
                {child.fullName}
              </p>
            </motion.div>
          ))}
        </div>

        {filteredChildren.length === 0 && (
          <p className="mt-6 text-center text-sm text-gray-400">
            کودکی با این نام پیدا نشد.
          </p>
        )}

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
  to="/mychild"
  className={`w-full sm:w-auto inline-flex items-center justify-center ${primaryButton}`}
>
  کودک خود را ژنینویی کنید
</Link>

          <button
  type="button"
  onClick={() => {
  setSearchTerm("");
  loadNextChildrenPage();
}}
  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 ${softButton}`}
>
  <RotateCcw className="h-4 w-4" />
  بارگذاری مجدد
</button>
        </div>
      </section>


{/* باکس آخرین دستاوردهای صادر شده */}
      <section className={`${sectionCard} bg-gradient-to-br from-sky-50/90 via-white/80 to-yellow-50/80`}>

  <div className="mb-5 text-center">
    <div className="mb-3 flex items-center justify-center gap-2 text-sm font-bold text-sky-700">
  <Trophy className="h-4 w-4" />
  جریان زنده افتخارهای ژنینویی
</div>

<h2 className={`${goldenTitle} text-2xl font-black sm:text-3xl`}>
  آخرین دستاوردهای صادر شده
</h2>
  </div>

  <div className="mx-auto mb-5 grid max-w-lg grid-cols-3 gap-2 rounded-2xl bg-yellow-50 p-1 border-2 border-[#d4af37] shadow-sm">
    {["1", "7", "30"].map((day) => (
      <button
        key={day}
        type="button"
        onClick={() => setAchievementTab(day)}
        className={`rounded-xl py-2 text-xs sm:text-sm font-bold transition ${
          achievementTab === day
            ? "bg-white text-yellow-700 shadow-sm"
            : "text-gray-500"
        }`}
      >
        {day} روز گذشته
      </button>
    ))}
  </div>

  <p className="mb-6 text-center text-sm font-medium text-gray-600">
    تمام دستاوردهای صادر شده در {achievementTab} روز گذشته
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {latestAchievements.map((item, index) => (
      <div
        key={item.id}
        className="rounded-[1.5rem] border border-sky-100 bg-white/85 p-4 shadow-[0_12px_35px_rgba(56,189,248,0.12)] transition hover:-translate-y-1 hover:border-yellow-200 hover:shadow-[0_20px_45px_rgba(180,130,30,0.18)]"
      >
        <h3 className="mb-4 flex h-[56px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-yellow-50 to-sky-50 px-3 py-2 text-center text-sm font-extrabold leading-5 text-yellow-800">
  <Star className="h-4 w-4 text-yellow-500" />
  {item.title || "دستاورد ژنینویی"}
</h3>

        <div className="grid grid-cols-2 gap-3 items-stretch">
          <div>
            <p className="mb-2 text-center text-xs font-bold text-gray-500">
              دریافت کننده
            </p>

            <div
              onClick={() => setSelectedChild(getFullChildForModal(item.child))}
              className="flex h-[150px] cursor-pointer flex-col rounded-2xl border-2 border-[#d4af37] bg-white p-2 overflow-hidden hover:shadow-[0_0_14px_rgba(212,175,55,0.28)] transition"
            >
              <div className="flex h-[92px] flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-yellow-50">
                {item.child?.photo ? (
  <img
    src={item.child.photo}
    alt={item.child.fullName}
    className="h-full w-full object-cover"
  />
) : (
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-yellow-50 to-pink-50">
    <Baby className="h-10 w-10 text-yellow-500" />
  </div>
)}
              </div>

              <p className="flex h-[42px] items-center justify-center text-center text-xs font-extrabold text-gray-700 leading-5 line-clamp-2">
                {item.child?.fullName}
              </p>
            </div>
          </div>

          <div>
            <p className="mb-2 text-center text-xs font-bold text-gray-500">
              صادر کننده
            </p>

            <div
              onClick={() =>
  setSelectedIssuer({
    name:
      item.issuerUser?.fullName ||
      "صادرکننده ژنینویی",

    image:
      item.issuerUser?.avatarUrl || logo,

    role: item.issuerRole,
    description: item.description,
    achievementTitle: item.title,
    city:
  item.issuerUser?.city ||
  "شهر ثبت نشده",

specialty:
  [
    "father",
    "mother",
    "sister",
    "brother",
    "khale",
    "amme",
    "dayi",
    "ammo",
    "grandfather_paternal",
    "grandmother_paternal",
    "grandfather_maternal",
    "grandmother_maternal",
    "عضو درختواره",
  ].includes(item.issuerRole)
    ? getIssuerRoleLabel(item.issuerRole)
: "همراهی تخصصی با رشد کودک",
    isFamily:
      [
        "father",
        "mother",
        "sister",
        "brother",
        "khale",
        "amme",
        "dayi",
        "ammo",
        "grandfather_paternal",
        "grandmother_paternal",
        "grandfather_maternal",
        "grandmother_maternal",
        "عضو درختواره",
      ].includes(item.issuerRole),
  })
}
              className="flex h-[150px] cursor-pointer flex-col rounded-2xl border-2 border-[#d4af37] bg-white p-2 overflow-hidden hover:shadow-[0_0_14px_rgba(212,175,55,0.28)] transition"
            >
              <div className="flex h-[92px] flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-yellow-50">
                {item.issuerUser?.avatarUrl ? (
  <img
    src={item.issuerUser.avatarUrl}
    alt={item.issuerUser.fullName}
    className="h-full w-full object-cover"
  />
) : (
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-50 to-yellow-50">
    <Trophy className="h-10 w-10 text-yellow-500" />
  </div>
)}
              </div>

              <p className="flex h-[42px] items-center justify-center text-center text-xs font-extrabold text-gray-700 leading-5 line-clamp-2">
                {item.issuerUser?.fullName || "صادرکننده ژنینویی"}
              </p>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>


{/* باکس برترین دریافت کنندگان دستاورد */}
<section className={`${sectionCard} bg-gradient-to-br from-rose-50/90 via-white/80 to-yellow-50/80`}>
  <div className="mb-5 text-center">
    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
  <h2 className={`${goldenTitle} text-xl font-black sm:text-2xl`}>
  برترین دریافت‌کنندگان دستاورد
</h2>

  <div className="flex items-center gap-2">
    <span className="text-sm font-bold text-gray-700">
      در سال
    </span>

    <select
      value={selectedYear}
      onChange={(e) => setSelectedYear(e.target.value)}
      className="rounded-xl border-2 border-[#d4af37] bg-white px-3 py-2 text-sm font-bold text-gray-700 outline-none"
    >
      <option value="1405">1405</option>
      <option value="1404">1404</option>
      <option value="1403">1403</option>
    </select>

    <span className="text-sm font-bold text-gray-700">
      ماه
    </span>

    <select
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(e.target.value)}
      className="rounded-xl border-2 border-[#d4af37] bg-white px-3 py-2 text-sm font-bold text-gray-700 outline-none"
    >
      <option>همه ماه‌ها</option>
      <option>فروردین</option>
      <option>اردیبهشت</option>
      <option>خرداد</option>
      <option>تیر</option>
      <option>مرداد</option>
      <option>شهریور</option>
      <option>مهر</option>
      <option>آبان</option>
      <option>آذر</option>
      <option>دی</option>
      <option>بهمن</option>
      <option>اسفند</option>
    </select>
  </div>
</div>
  </div>

  <div
  style={{ height: "500px" }}
  className="overflow-y-auto overflow-x-auto rounded-[1.5rem] border border-rose-100 bg-white/90 shadow-inner"
>
      <table className="w-full min-w-[900px] table-fixed border-collapse text-center text-sm">
        <thead className="text-yellow-800">
          <tr>
            <th
  style={{
    backgroundColor: "#fff4cc",
    backgroundImage: "none",
    opacity: 1,
    backdropFilter: "none",
    WebkitBackdropFilter: "none",
  }}
  className="sticky top-0 z-50 border-b border-yellow-200 bg-yellow-50 px-3 py-3 font-extrabold shadow-sm"
>
              رتبه
            </th>
            <th
  style={{
    backgroundColor: "#fff4cc",
    backgroundImage: "none",
    opacity: 1,
    backdropFilter: "none",
    WebkitBackdropFilter: "none",
  }}
  className="sticky top-0 z-50 border-b border-yellow-200 bg-yellow-50 px-3 py-3 font-extrabold shadow-sm"
>
              نام
            </th>
            <th
  style={{
    backgroundColor: "#fff4cc",
    backgroundImage: "none",
    opacity: 1,
    backdropFilter: "none",
    WebkitBackdropFilter: "none",
  }}
  className="sticky top-0 z-50 border-b border-yellow-200 bg-yellow-50 px-3 py-3 font-extrabold shadow-sm"
>
              دستاورد هنری
            </th>
            <th
  style={{
    backgroundColor: "#fff4cc",
    backgroundImage: "none",
    opacity: 1,
    backdropFilter: "none",
    WebkitBackdropFilter: "none",
  }}
  className="sticky top-0 z-50 border-b border-yellow-200 bg-yellow-50 px-3 py-3 font-extrabold shadow-sm"
>
              دستاورد ورزشی
            </th>
            <th
  style={{
    backgroundColor: "#fff4cc",
    backgroundImage: "none",
    opacity: 1,
    backdropFilter: "none",
    WebkitBackdropFilter: "none",
  }}
  className="sticky top-0 z-50 border-b border-yellow-200 bg-yellow-50 px-3 py-3 font-extrabold shadow-sm"
>
              دستاورد پرورشی
            </th>
            <th
  style={{
    backgroundColor: "#fff4cc",
    backgroundImage: "none",
    opacity: 1,
    backdropFilter: "none",
    WebkitBackdropFilter: "none",
  }}
  className="sticky top-0 z-50 border-b border-yellow-200 bg-yellow-50 px-3 py-3 font-extrabold shadow-sm"
>
              دستاورد علمی
            </th>
            <th
  style={{
    backgroundColor: "#fff4cc",
    backgroundImage: "none",
    opacity: 1,
    backdropFilter: "none",
    WebkitBackdropFilter: "none",
  }}
  className="sticky top-0 z-50 border-b border-yellow-200 bg-yellow-50 px-3 py-3 font-extrabold shadow-sm"
>
              دستاورد معنوی
            </th>
            <th
  style={{
    backgroundColor: "#fff4cc",
    backgroundImage: "none",
    opacity: 1,
    backdropFilter: "none",
    WebkitBackdropFilter: "none",
  }}
  className="sticky top-0 z-50 border-b border-yellow-200 bg-yellow-50 px-3 py-3 font-extrabold shadow-sm"
>
              مجموع دستاوردها
            </th>
          </tr>
        </thead>

        <tbody>
          {topReceivers.map((item) => (
            <tr key={item.rank} className="odd:bg-white even:bg-rose-50/70">
              <td className="border-b border-rose-100 px-3 py-3 font-extrabold text-yellow-700">
                {item.rank}
              </td>

              <td className="border-b border-rose-100 px-2 py-2">
                <div
  onClick={() => setSelectedChild(getFullChildForModal(item.child))}
  style={{ width: "82px", height: "96px" }}
  className="mx-auto flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-yellow-200 bg-white p-1.5 shadow-sm transition hover:-translate-y-0.5 hover:border-yellow-300 hover:shadow-[0_10px_25px_rgba(180,130,30,0.18)]"
>
  <div
    style={{ height: "60px" }}
    className="flex flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-yellow-50"
  >
    {item.child?.photo ? (
  <img
    src={item.child.photo}
    alt={item.child.fullName}
    className="h-full w-full object-cover"
  />
) : (
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-yellow-50 to-pink-50">
    <Baby className="h-10 w-10 text-yellow-500" />
  </div>
)}
  </div>

  <p
    style={{ height: "26px" }}
    className="flex items-center justify-center text-center text-[11px] font-extrabold text-gray-700 leading-4 line-clamp-1"
  >
    {item.child.fullName}
  </p>
</div>
              </td>

              <td
  onClick={() => openAchievementList(item.child, "دستاورد هنری", item.art)}
  className="cursor-pointer border-b border-rose-100 px-3 py-3 font-bold text-gray-700 hover:bg-yellow-50"
>
                {item.art}
              </td>
              <td
  onClick={() => openAchievementList(item.child, "دستاورد ورزشی", item.sport)}
  className="cursor-pointer border-b border-rose-100 px-3 py-3 font-bold text-gray-700 hover:bg-yellow-50"
>
                {item.sport}
              </td>
              <td
  onClick={() => openAchievementList(item.child, "دستاورد پرورشی", item.nurture)}
  className="cursor-pointer border-b border-rose-100 px-3 py-3 font-bold text-gray-700 hover:bg-yellow-50"
>
                {item.nurture}
              </td>
              <td
  onClick={() => openAchievementList(item.child, "دستاورد علمی", item.science)}
  className="cursor-pointer border-b border-rose-100 px-3 py-3 font-bold text-gray-700 hover:bg-yellow-50"
>
                {item.science}
              </td>
              <td
  onClick={() => openAchievementList(item.child, "دستاورد معنوی", item.spiritual)}
  className="cursor-pointer border-b border-rose-100 px-3 py-3 font-bold text-gray-700 hover:bg-yellow-50"
>
                {item.spiritual}
              </td>
              <td className="border-b border-rose-100 px-3 py-3 text-base font-extrabold text-rose-600">
                {item.total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
</section>


{/* باکس برترین صادرکنندگان دستاورد */}
<section className={`${sectionCard} bg-gradient-to-br from-lime-50/90 via-white/80 to-yellow-50/80`}>
  <div className="mb-5 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
    <h2 className={`${goldenTitle} text-xl font-black sm:text-2xl`}>
  برترین صادرکنندگان دستاورد
</h2>

    <div className="flex flex-wrap items-center justify-center gap-2">
      <span className="text-sm font-bold text-gray-700">سال</span>

      <select
        value={issuerYear}
        onChange={(e) => setIssuerYear(e.target.value)}
        className="rounded-xl border-2 border-[#d4af37] bg-white px-3 py-2 text-sm font-bold text-gray-700 outline-none"
      >
        <option value="1405">1405</option>
        <option value="1404">1404</option>
        <option value="1403">1403</option>
      </select>

      <span className="text-sm font-bold text-gray-700">ماه</span>

      <select
        value={issuerMonth}
        onChange={(e) => setIssuerMonth(e.target.value)}
        className="rounded-xl border-2 border-[#d4af37] bg-white px-3 py-2 text-sm font-bold text-gray-700 outline-none"
      >
        <option>همه ماه‌ها</option>
        <option>فروردین</option>
        <option>اردیبهشت</option>
        <option>خرداد</option>
        <option>تیر</option>
        <option>مرداد</option>
        <option>شهریور</option>
        <option>مهر</option>
        <option>آبان</option>
        <option>آذر</option>
        <option>دی</option>
        <option>بهمن</option>
        <option>اسفند</option>
      </select>
    </div>
  </div>

  <div
    style={{ height: "500px" }}
    className="overflow-y-auto overflow-x-auto rounded-[1.5rem] border border-lime-100 bg-white/90 shadow-inner"
  >
    <table className="w-full min-w-[1000px] table-fixed border-collapse text-center text-sm">
      <thead className="text-yellow-800">
        <tr>
          {[
            "رتبه",
            "نام",
            "نوع فعالیت",
            "شرح فعالیت",
            "نوع دستاوردهای صادره",
            "مجموع دستاوردهای صادره",
          ].map((title) => (
            <th
              key={title}
              style={{
                backgroundColor: "#fff4cc",
                backgroundImage: "none",
                opacity: 1,
              }}
              className={`sticky top-0 z-50 border-b border-yellow-200 bg-yellow-50 px-3 py-3 font-extrabold shadow-sm ${
                title === "شرح فعالیت" ? "w-[280px]" : ""
              }`}
            >
              {title}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {topIssuers.map((item) => (
          <tr key={item.rank} className="odd:bg-white even:bg-lime-50/70">
            <td className="border-b border-lime-100 px-3 py-3 font-extrabold text-yellow-700">
              {item.rank}
            </td>

            <td className="border-b border-lime-100 px-2 py-2">
              <div
                onClick={() =>
                  setSelectedIssuer({
  name:
    item.issuer?.fullName ||
    "صادرکننده ژنینویی",

  image:
    item.issuer?.avatarUrl || logo,

  city:
    item.issuer?.city ||
    "شهر ثبت نشده",

  specialty:
    item.activityType ||
    "ارائه‌دهنده خدمات کودک",

  description:
    item.description ||
    "همراهی تخصصی با رشد و پیشرفت کودک",

  isFamily: false,
})
                }
                style={{ width: "82px", height: "96px" }}
                className="mx-auto flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-yellow-200 bg-white p-1.5 shadow-sm transition hover:-translate-y-0.5 hover:border-yellow-300 hover:shadow-[0_10px_25px_rgba(180,130,30,0.18)]"
              >
                <div
                  style={{ height: "60px" }}
                  className="flex flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-yellow-50 to-white"
                >
                  {item.issuer?.avatarUrl ? (
  <img
    src={item.issuer.avatarUrl}
    alt={item.issuer.fullName}
    className="h-full w-full object-cover"
  />
) : (
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-yellow-50 to-lime-50">
    <Trophy className="h-10 w-10 text-yellow-500" />
  </div>
)}
                </div>

                <p
                  style={{ height: "26px" }}
                  className="flex items-center justify-center text-center text-[11px] font-extrabold text-gray-700 leading-4 line-clamp-1"
                >
                  {item.issuer?.fullName || "صادرکننده ژنینویی"}
                </p>
              </div>
            </td>

            <td className="border-b border-lime-100 px-3 py-3 font-bold text-gray-700">
              {item.activityType}
            </td>

            <td className="border-b border-lime-100 px-4 py-3 text-xs font-medium leading-7 text-gray-600">
              {item.description}
            </td>

            <td className="border-b border-lime-100 px-3 py-3 font-bold text-gray-700">
              {item.issuedTypes}
            </td>

            <td
                onClick={() => openIssuerReceivers(item)}
                className="cursor-pointer border-b border-lime-100 px-3 py-3 text-base font-extrabold text-green-700 hover:bg-yellow-50"
            >
                {item.total}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>


{/* مودال کارت کودکان ژنینویی */} 
    <AnimatePresence>
  {selectedChild && (
    <motion.div
      className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/40 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSelectedChild(null)}
    >
      <motion.div
        className="w-full max-w-sm rounded-3xl border-2 border-[#d4af37] bg-gradient-to-b from-yellow-50 to-[#fff4cc] p-5 text-center shadow-2xl"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex h-48 items-center justify-center overflow-hidden rounded-2xl border-2 border-[#d4af37] bg-white">
          {selectedChild.photo ? (
  <img
    src={selectedChild.photo}
    alt={selectedChild.fullName}
    className="h-full w-full object-cover"
  />
) : (
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-yellow-50 to-pink-50">
    <Baby className="h-24 w-24 text-yellow-500" />
  </div>
)}
        </div>

        <h2 className="text-xl font-extrabold text-yellow-800">
          {selectedChild.fullName}
        </h2>

        <div className="mt-4 space-y-2 text-sm font-medium text-gray-700">
  <p>
    {getChildAgeText(selectedChild)}
  </p>

  <p>
    {getChildCityText(selectedChild) !== "شهر ثبت نشده"
  ? `از ${getChildCityText(selectedChild)}`
  : "شهر ثبت نشده"}
  </p>

  {selectedChild.interests ? (
  <p>
    <span className="font-extrabold text-yellow-800">
      عاشق:
    </span>{" "}
    {selectedChild.interests}
  </p>
) : (
  <p className="text-xs text-gray-400">
    <span className="font-extrabold text-yellow-700">
      عاشق:
    </span>{" "}
    این بخش هنوز توسط والدین کودک تکمیل نشده است
  </p>
)}
</div>

        <div className="mt-6 flex flex-col gap-3">
          <button
  type="button"
  onClick={() => {
  if (
  activeTab === "followed" ||
  selectedChild.followStatus === "APPROVED" ||
  selectedChild.followStatus === "APPROVED_WITH_CHANGED_ROLE"
) {
    handleUnfollowChild();
    return;
  }

  setFollowRole("");
  setShowFollowModal(true);
}}
  className="w-full rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-400 px-6 py-3 text-sm font-extrabold text-white shadow-md hover:from-yellow-600 hover:to-yellow-500 transition"
>
  {selectedChild.followStatus === "PENDING_PARENT"
  ? "در انتظار تأیید"
  : activeTab === "followed" ||
selectedChild.followStatus === "APPROVED" ||
selectedChild.followStatus === "APPROVED_WITH_CHANGED_ROLE"
  ? "آنفالو"
  : "فالو کردن"}
</button>

          <button
            type="button"
            className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 px-6 py-3 text-sm font-extrabold text-white shadow-md hover:from-pink-600 hover:to-rose-500 transition"
          >
           ارسال هدیه
          </button>

          <button
            type="button"
            onClick={() => setSelectedChild(null)}
            className="w-full rounded-2xl border border-yellow-300 bg-white px-6 py-3 text-sm font-extrabold text-yellow-700 hover:bg-yellow-50 transition"
          >
            بستن 
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


{/* مودال ثبت فالو */}
<AnimatePresence>
  {showFollowModal && selectedChild && (
    <motion.div
      className="fixed inset-0 z-[100001] flex items-center justify-center bg-black/50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowFollowModal(false)}
    >
      <motion.div
        className="w-full max-w-sm rounded-3xl border-2 border-[#d4af37] bg-white p-5 text-right shadow-2xl"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-extrabold text-yellow-800 text-center">
          فالو کردن {selectedChild.fullName}
        </h3>

        <p className="mt-3 text-sm text-gray-600 text-center leading-7">
          شما در چه نقشی می‌خواهید {selectedChild.fullName} را فالو کنید؟
        </p>

        <select
          value={followRole}
          onChange={(e) => setFollowRole(e.target.value)}
          className="mt-5 w-full rounded-2xl border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm font-bold text-gray-700 outline-none focus:ring-4 focus:ring-yellow-100"
        >
          <option value="">انتخاب نقش</option>
          {followRoles.map((role) => (
            <option key={role.value} value={role.value}>
              {role.label}
            </option>
          ))}
        </select>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => setShowFollowModal(false)}
            className="flex-1 rounded-2xl border border-yellow-300 bg-white px-4 py-3 text-sm font-extrabold text-yellow-700"
          >
            انصراف
          </button>

          <button
  type="button"
  disabled={!followRole}
  onClick={async () => {
    const res = await createChildFollowRequest({
      childId: selectedChild.id,
      requestedRole: followRole,
    });

    if (res?.ok) {
      alert("درخواست فالو ارسال شد ✨");

      setShowFollowModal(false);
      setFollowRole("");
    } else {
      alert(
        res?.message ||
          "خطا در ثبت درخواست فالو."
      );
    }
  }}
  className={`flex-1 rounded-2xl px-4 py-3 text-sm font-extrabold text-white ${
    followRole
      ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
      : "bg-gray-300"
  }`}
>
  ثبت فالو
</button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

{/* مودال صادر کننده دستاورد */}
<AnimatePresence>
  {selectedIssuer && (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSelectedIssuer(null)}
    >
      <motion.div
        style={{ backgroundColor: "#9fddff" }}
        className="w-full max-w-sm rounded-3xl border-2 border-[#d4af37] p-5 text-center shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex h-48 items-center justify-center overflow-hidden rounded-2xl border-2 border-[#d4af37] bg-white">
          <img
            src={selectedIssuer.image}
            alt={selectedIssuer.name}
            className="h-full w-full object-contain p-6"
          />
        </div>

        <h2 className="text-xl font-extrabold text-yellow-800">
          {selectedIssuer.name}
        </h2>

        <div className="mt-4 space-y-2 text-sm font-medium text-gray-700">
  <p>{selectedIssuer.city}</p>

  <p>
    ویژگی بارز: {selectedIssuer.specialty}
  </p>

  <p className="rounded-2xl border border-yellow-200 bg-white/80 p-3 leading-7 text-gray-700">
    <span className="font-extrabold text-yellow-800">
      شرح دستاورد:
    </span>{" "}
    {selectedIssuer.description ||
      "این دستاورد به پاس تلاش، رشد و عملکرد ارزشمند کودک صادر شده است."}
  </p>
</div>

        <div className="mt-6 flex flex-col gap-3">
          <button
  type="button"
  onClick={() => {
    if (selectedIssuer.isFamily) {
      setShowIssuerInfoModal(true);
      return;
    }

    alert(
      "صفحه اختصاصی این ارائه‌دهنده خدمات به‌زودی در ژنینو فعال خواهد شد ✨"
    );
  }}
  className="w-full rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-400 px-6 py-3 text-sm font-extrabold text-white shadow-md hover:from-yellow-600 hover:to-yellow-500 transition"
>
  از صفحه ما دیدن فرمائید
</button>

          <button
            type="button"
            onClick={() => setSelectedIssuer(null)}
            className="w-full rounded-2xl border border-yellow-300 bg-white px-6 py-3 text-sm font-extrabold text-yellow-700 hover:bg-yellow-50 transition"
          >
            بستن
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

{/* مودال توضیح صادرکننده خانوادگی */}
<AnimatePresence>
  {showIssuerInfoModal && (
    <motion.div
      className="fixed inset-0 z-[100002] flex items-center justify-center bg-black/50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowIssuerInfoModal(false)}
    >
      <motion.div
        className="w-full max-w-sm rounded-3xl border-2 border-[#d4af37] bg-white p-6 text-center shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-100 to-yellow-50 shadow-inner">
            <Heart className="h-10 w-10 text-yellow-600" />
          </div>
        </div>

        <h3 className="text-xl font-extrabold text-yellow-800">
          صادرکننده خانوادگی
        </h3>

        <p className="mt-4 text-sm leading-8 text-gray-700">
          این دستاورد توسط یکی از اعضای خانواده یا نزدیکان کودک
          ثبت شده است.
        </p>

        <p className="mt-2 text-sm leading-8 text-gray-600">
          در حال حاضر فقط ارائه‌دهندگان خدمات تخصصی کودک
          مانند مدارس، آموزشگاه‌ها، مربیان و مراکز رشد،
          دارای صفحه اختصاصی در ژنینو هستند.
        </p>

        <button
          type="button"
          onClick={() => setShowIssuerInfoModal(false)}
          className="mt-6 w-full rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-400 px-6 py-3 text-sm font-extrabold text-white shadow-md hover:from-yellow-600 hover:to-yellow-500 transition"
        >
          متوجه شدم
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

{/* مودال لیست دستاوردهای یک عدد */}
<AnimatePresence>
  {achievementListModal && (
    <motion.div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setAchievementListModal(null)}
    >
      <motion.div
        className="w-full max-w-3xl rounded-3xl border-2 border-[#d4af37] bg-white/95 p-5 shadow-2xl"
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-4 text-center text-xl font-extrabold text-yellow-800">
          {achievementListModal.type} - {achievementListModal.child.fullName}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {achievementItems.map((ach) => (
            <button
              key={ach.id}
              type="button"
              onClick={() => setSelectedAchievementDetail(ach)}
              className="rounded-2xl border-2 border-[#d4af37] bg-[#fffaf0] p-3 text-center shadow-sm hover:shadow-[0_0_14px_rgba(212,175,55,0.28)] transition"
            >
              <div className="mb-2 flex h-20 items-center justify-center overflow-hidden rounded-xl bg-white">
                {ach.issuerUser?.avatarUrl ? (
                  <img
                    src={ach.issuerUser.avatarUrl}
                    alt={ach.issuerUser.fullName || "صادرکننده ژنینویی"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-50 to-yellow-50">
                    <Trophy className="h-10 w-10 text-yellow-500" />
                  </div>
                )}
              </div>

              <p className="text-xs font-extrabold text-yellow-800">
  {ach.title || achievementListModal?.type}
</p>

              <p className="mt-1 text-[11px] font-bold text-gray-500">
                {ach.issuerUser?.fullName || "صادرکننده ژنینویی"}
              </p>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setAchievementListModal(null)}
          className="mt-5 w-full rounded-2xl border border-yellow-300 bg-white px-6 py-3 text-sm font-extrabold text-yellow-700 hover:bg-yellow-50 transition"
        >
          بستن
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

{/* مودال بزرگ جزئیات دستاورد */}
<AnimatePresence>
  {selectedAchievementDetail && (
    <motion.div
      className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSelectedAchievementDetail(null)}
    >
      <motion.div
  style={{
    backgroundColor: "#d9f1ff",
    backgroundImage: "none",
    opacity: 1,
    backdropFilter: "none",
    WebkitBackdropFilter: "none",
  }}
  className="w-full max-w-sm rounded-3xl border-2 border-[#d4af37] p-5 text-center shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex h-40 items-center justify-center overflow-hidden rounded-2xl border-2 border-[#d4af37] bg-white">
  {selectedAchievementDetail?.issuerUser?.avatarUrl ? (
    <img
      src={selectedAchievementDetail.issuerUser.avatarUrl}
      alt={
        selectedAchievementDetail.issuerUser.fullName ||
        "صادرکننده ژنینویی"
      }
      className="h-full w-full object-contain p-2"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-50 to-yellow-50">
      <Trophy className="h-16 w-16 text-yellow-500" />
    </div>
  )}
</div>

        <h2 className="text-xl font-extrabold text-yellow-800">
  {selectedAchievementDetail.title || achievementListModal?.type}
</h2>

        <div className="mt-4 space-y-2 text-sm font-medium text-gray-700">
          <p>دریافت‌کننده: {selectedAchievementDetail.child.fullName}</p>
          <p>
  صادرکننده:{" "}
  {selectedAchievementDetail.issuerUser?.fullName ||
    "صادرکننده ژنینویی"}
</p>
          <p className="rounded-2xl border border-yellow-200 bg-white p-3 leading-7">
            <span className="font-extrabold text-yellow-800">شرح دستاورد: </span>
            {selectedAchievementDetail.description}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3">
        <button
  type="button"
  onClick={() => {
    if (
      [
        "father",
        "mother",
        "sister",
        "brother",
        "khale",
        "amme",
        "dayi",
        "ammo",
        "grandfather_paternal",
        "grandmother_paternal",
        "grandfather_maternal",
        "grandmother_maternal",
        "عضو درختواره",
      ].includes(selectedAchievementDetail?.issuerRole)
    ) {
      setShowIssuerInfoModal(true);
      return;
    }

    alert(
      "صفحه اختصاصی این ارائه‌دهنده خدمات به‌زودی در ژنینو فعال خواهد شد ✨"
    );
  }}
  className="w-full rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-400 px-6 py-3 text-sm font-extrabold text-white shadow-md hover:from-yellow-600 hover:to-yellow-500 transition"
>
  از صفحه ما دیدن فرمائید
</button>

        <button
          type="button"
          onClick={() => setSelectedAchievementDetail(null)}
          className="w-full rounded-2xl border border-yellow-300 bg-white px-6 py-3 text-sm font-extrabold text-yellow-700 hover:bg-yellow-50 transition"
        >
          بستن
        </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

{/* مودال لیست دریافت‌کنندگان دستاورد از صادرکننده */}
<AnimatePresence>
  {issuerReceiversModal && (
    <motion.div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setIssuerReceiversModal(null)}
    >
      <motion.div
        className="w-full max-w-3xl rounded-3xl border-2 border-[#d4af37] bg-white p-5 shadow-2xl"
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-4 text-center text-xl font-extrabold text-yellow-800">
          دریافت‌کنندگان دستاورد از {issuerReceiversModal.issuer.name}
        </h3>

        <div className="max-h-[60vh] overflow-y-auto rounded-2xl border border-yellow-200 bg-white/70 p-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {issuerReceiversModal.receivers.map((child, index) => (
            <button
              key={`${child.id}-${index}`}
              type="button"
              onClick={() => setSelectedChild(child)}
              className="rounded-2xl border-2 border-[#d4af37] bg-[#fffaf0] p-2 text-center shadow-sm hover:shadow-[0_0_14px_rgba(212,175,55,0.28)] transition"
            >
              <div className="mb-2 flex h-20 items-center justify-center overflow-hidden rounded-xl bg-white">
  {child.photo ? (
    <img
      src={child.photo}
      alt={child.fullName}
      className="h-full w-full object-cover"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-yellow-50 to-pink-50">
      <Baby className="h-10 w-10 text-yellow-500" />
    </div>
  )}
</div>

              <p className="text-xs font-extrabold text-gray-700">
                {child.fullName}
              </p>
            </button>
          ))}
        </div>
        </div>

        <button
          type="button"
          onClick={() => setIssuerReceiversModal(null)}
          className="mt-5 w-full rounded-2xl border border-yellow-300 bg-white px-6 py-3 text-sm font-extrabold text-yellow-700 hover:bg-yellow-50 transition"
        >
          بستن
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </main>
  );
}