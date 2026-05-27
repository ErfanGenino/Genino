import { motion, AnimatePresence } from "framer-motion";
import { Baby } from "lucide-react";
import { HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";
import FamilyTree from "./FamilyTree";
import AchievementsBar from "@components/Dashboard/AchievementsBar";
import TodayCalendarBox from "@components/Dashboard/TodayCalendarBox";
import GeninoAwarenessBox from "@components/Awareness/GeninoAwarenessBox";
import GeninoHealthButton from "@components/Assessments/GeninoHealthButton";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../services/api";




export default function MyChild() {

const navigate = useNavigate();


const [isLoading, setIsLoading] = useState(true);
const [confirmDelete, setConfirmDelete] = useState(false);
const [showInviteModal, setShowInviteModal] = useState(false);
const [inviteEmail, setInviteEmail] = useState("");
const [invitePhone, setInvitePhone] = useState("");
const [inviteUsername, setInviteUsername] = useState("");
const [selectedChildForTree, setSelectedChildForTree] = useState(null);
const [isInviting, setIsInviting] = useState(false);
const [childAdmins, setChildAdmins] = useState([]);
const [showWishlistModal, setShowWishlistModal] = useState(false);
const [activeTab, setActiveTab] = useState("mine");
const [selectedFollowedChild, setSelectedFollowedChild] = useState(null);
const [showSpiritualAchievementModal, setShowSpiritualAchievementModal] = useState(false);
const [showFullSpiritualInfo, setShowFullSpiritualInfo] = useState(true);
const [showSpiritualSuccessModal, setShowSpiritualSuccessModal] = useState(false);
const [showMonthlyLimitModal, setShowMonthlyLimitModal] = useState(false);
const [hasGivenSpiritualAchievementThisMonth, setHasGivenSpiritualAchievementThisMonth] =
  useState(false);


const [spiritualAchievementTitle, setSpiritualAchievementTitle] =
  useState("رضایت خانواده به دلیل مهربانی");

const [spiritualAchievementDescription, setSpiritualAchievementDescription] =
  useState("");


const handleOpenSpiritualAchievementModal = async () => {
  try {
    const res = await authFetch(
      `/child-achievements/spiritual/status/${activeChild.id}`
    );

    if (res?.hasGivenThisMonth) {
      setHasGivenSpiritualAchievementThisMonth(true);
      setShowMonthlyLimitModal(true);
      return;
    }

    setHasGivenSpiritualAchievementThisMonth(false);
    setShowSpiritualAchievementModal(true);

  } catch (err) {
    console.error("خطا در بررسی وضعیت دستاورد معنوی:", err);
    alert("بررسی وضعیت دستاورد انجام نشد");
  }
};



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

const getParentCityText = () => {
  const parent = mother || father;

  return (
    parent?.city ||
    parent?.province ||
    "شهر ثبت نشده"
  );
};

const getChildCityText = (child) => {
  return child?.city || child?.province || child?.address || "شهر ثبت نشده";
};


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
const loadChildren = () => {
  const stored = localStorage.getItem("children");
  return stored ? JSON.parse(stored) : [];
};

const [childrenList, setChildrenList] = useState([]);
const [activeChildId, setActiveChildId] = useState(
  childrenList[0]?.id || null
); 

useEffect(() => {
  async function loadChildrenFromApi() {
    try {
      setIsLoading(true);
      setChildAdmins([]);

      const token = localStorage.getItem("genino_token");
      if (!token) throw new Error("no token");

      const endpoint =
        activeTab === "mine" ? "/children" : "/children/followed";

      const res = await authFetch(endpoint);
      const data = Array.isArray(res) ? res : res?.children || [];

      if (!Array.isArray(data)) {
        throw new Error(res?.message || "children invalid");
      }

      setChildrenList(data);

      const validChildren = data.filter((c) => c.birthDate);

if (validChildren.length > 0) {
  const savedActiveChildId = localStorage.getItem(
    activeTab === "mine" ? "activeChildId" : "activeFollowedChildId"
  );

  const exists = validChildren.find(
    (c) => String(c.id) === String(savedActiveChildId)
  );

  setActiveChildId(
    exists ? exists.id : validChildren[0].id
  );
} else {
  setActiveChildId(null);
}
    } catch (e) {
      console.error("خطا در دریافت کودکان:", e);
      setChildrenList([]);
      setActiveChildId(null);
    } finally {
      setIsLoading(false);
    }
  }

  loadChildrenFromApi();
}, [activeTab]);


useEffect(() => {
  if (!activeChildId) return;

  localStorage.setItem(
    activeTab === "mine" ? "activeChildId" : "activeFollowedChildId",
    activeChildId
  );
}, [activeChildId, activeTab]);



useEffect(() => {
  if (!activeChildId) return;

  async function loadChildAdmins() {
    try {
      const res = await authFetch(`/children/${activeChildId}/admins`);
      if (res?.ok) {
        setChildAdmins(res.admins || []);
      }
    } catch (err) {
      console.error("خطا در دریافت والدین کودک:", err);
    }
  }
  loadChildAdmins();
}, [activeChildId]);





const activeChild = childrenList.find(
  (child) => String(child.id) === String(activeChildId)
);
const father = childAdmins.find(
  (a) => a.role === "father" && a.status === "CONNECTED"
);

const mother = childAdmins.find(
  (a) => a.role === "mother" && a.status === "CONNECTED"
);

const pendingFatherInvite = childAdmins.find(
  (a) => a.role === "father" && a.status === "PENDING"
);

const pendingMotherInvite = childAdmins.find(
  (a) => a.role === "mother" && a.status === "PENDING"
);

const currentUser = JSON.parse(localStorage.getItem("genino_user") || "null");

const currentUserAsParent = childAdmins.find(
  (a) =>
    String(a.userId) === String(currentUser?.id) &&
    (a.role === "father" || a.role === "mother") &&
    a.status === "CONNECTED"
);

const canAddChild = Boolean(currentUserAsParent);
const isMineTab = activeTab === "mine";
const isFollowedTab = activeTab === "followed";
const canManageChild = isMineTab && canAddChild;


if (isLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      در حال آماده‌سازی صفحه کودک...
    </div>
  );
}

if (!activeChild) {
  return (
    <main
      dir="rtl"
      className="relative min-h-screen flex flex-col items-center overflow-hidden bg-[#fffaf0] text-gray-800 pt-8 pb-4"
    >
      {/* 🧭 تب‌ها */}
      <div className="relative z-[10] w-full px-4 mb-10">
        <div className="w-full max-w-md mx-auto bg-white/70 backdrop-blur-xl border border-yellow-100 rounded-3xl p-2 shadow-[0_10px_35px_rgba(255,190,0,0.14)] grid grid-cols-2 gap-2">

          <button
            type="button"
            onClick={() => setActiveTab("mine")}
            className={`
              rounded-2xl py-3 text-sm font-extrabold transition-all
              ${
                activeTab === "mine"
                  ? "bg-gradient-to-l from-yellow-400 to-amber-300 text-yellow-950 shadow-md"
                  : "bg-white/60 text-yellow-800 hover:bg-yellow-50"
              }
            `}
          >
            کودک من
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("followed")}
            className={`
              rounded-2xl py-3 text-sm font-extrabold transition-all
              ${
                activeTab === "followed"
                  ? "bg-gradient-to-l from-yellow-400 to-amber-300 text-yellow-950 shadow-md"
                  : "bg-white/60 text-yellow-800 hover:bg-yellow-50"
              }
            `}
          >
            کودکان فالو شده
          </button>
        </div>
      </div>

      {/* 📭 حالت خالی */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">

        <div className="text-7xl mb-5">
          {activeTab === "mine" ? "👶" : "🌱"}
        </div>

        <h2 className="text-2xl font-extrabold text-yellow-900 mb-3">
          {activeTab === "mine"
            ? "هنوز کودکی ثبت نشده"
            : "هنوز کودکی را فالو نکرده‌اید"}
        </h2>

        <p className="text-sm text-gray-500 leading-7 max-w-sm">
          {activeTab === "mine"
            ? "برای شروع، پروفایل کودک خود را در ژنینو ایجاد کنید."
            : "وقتی به درختواره کودکی متصل شوید، در این بخش نمایش داده می‌شود."}
        </p>

        {activeTab === "mine" && (
          <Link
            to="/child-profile"
            className="
              mt-6
              px-6 py-3
              rounded-2xl
              bg-gradient-to-l from-yellow-400 to-amber-300
              text-yellow-950
              font-extrabold
              shadow-[0_10px_25px_rgba(245,158,11,0.25)]
              hover:scale-[1.03]
              transition-all
            "
          >
            افزودن کودک
          </Link>
        )}
      </div>
    </main>
  );
}

if (!activeChild?.birthDate) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      تاریخ تولد کودک ثبت نشده یا نامعتبر است
    </div>
  );
}


  // 📆 محاسبه دقیق سن و روز مانده تا تولد
const birth = new Date(activeChild.birthDate);
const today = new Date();

// محاسبه دقیق روزهای مانده تا تولد بعدی
let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
if (nextBirthday < today) {
  nextBirthday = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
}
const msInDay = 1000 * 60 * 60 * 24;
const daysLeft = Math.ceil((nextBirthday - today) / msInDay);


// محاسبه سن به سال و ماه
let ageYears = today.getFullYear() - birth.getFullYear();
let ageMonths = today.getMonth() - birth.getMonth();
if (today.getDate() < birth.getDate()) ageMonths--;

if (ageMonths < 0) {
  ageYears--;
  ageMonths += 12;
}
const ageText = `${ageYears} سال و ${ageMonths} ماه`;



// امکان حذف کودک از نوار کودک من
const handleDeleteChild = async (childId) => {
  try {
    const token = localStorage.getItem("genino_token");
    if (!token) {
      alert("لطفاً دوباره وارد شوید");
      return;
    }

    await authFetch(`/children/${childId}`, { method: "DELETE" });

    // 🔄 بعد از حذف، لیست جدید کودکان
    const updatedChildren = await authFetch("/children");


    localStorage.setItem("children", JSON.stringify(updatedChildren));

    if (updatedChildren.length === 0) {
      navigate("/child-profile?mode=createFirst", { replace: true });
    } else {
      setChildrenList(updatedChildren);
      setActiveChildId(updatedChildren[0].id);
    }
  } catch (err) {
    console.error(err);
    alert("حذف کودک انجام نشد");
  }
};

const handleSendInvitation = async () => {
  if (!inviteEmail && !invitePhone && !inviteUsername) {
    alert("ایمیل، شماره موبایل یا نام کاربری را وارد کنید");
    return;
  }

  try {
    setIsInviting(true);

    const missingRole = !father ? "father" : "mother";

await authFetch("/invitations", {
  method: "POST",
  body: JSON.stringify({
    childId: activeChild.id,
    email: inviteEmail || undefined,
    phone: invitePhone || undefined,
    username: inviteUsername || undefined,

    relationType: missingRole,
    slot: 0,
    roleLabel: missingRole === "mother" ? "مادر" : "پدر",
  }),
});

    alert("دعوت با موفقیت ارسال شد");

    const adminsRes = await authFetch(`/children/${activeChild.id}/admins`);
if (adminsRes?.ok) {
  setChildAdmins(adminsRes.admins || []);
}

    setShowInviteModal(false);
    setInviteEmail("");
    setInvitePhone("");
    setInviteUsername("");
  } catch (err) {
    console.error(err);
    alert("ارسال دعوت انجام نشد");
  } finally {
    setIsInviting(false);
  }
};

const handleCancelParentInvite = async (invitationId) => {
  if (!invitationId) return;

  const ok = window.confirm("دعوت لغو شود؟");
  if (!ok) return;

  try {
    await authFetch(`/invitations/${invitationId}`, {
      method: "DELETE",
    });

    const adminsRes = await authFetch(
      `/children/${activeChild.id}/admins`
    );

    if (adminsRes?.ok) {
      setChildAdmins(adminsRes.admins || []);
    }
  } catch (err) {
    console.error(err);
    alert("لغو دعوت انجام نشد");
  }
};

const handleOpenParentChat = (parent) => {
  if (!parent?.userId) {
    alert("اطلاعات کاربر برای چت کامل نیست.");
    return;
  }

  navigate("/social", {
    state: {
      openPrivateChatUser: {
        id: Number(parent.userId),
        name: parent.fullName || "کاربر ژنینو",
        avatarUrl: parent.avatarUrl || null,
        username: parent.username || "",
      },
    },
  });
};

const handleSubmitSpiritualAchievement = async () => {
  try {
    if (!spiritualAchievementDescription.trim()) {
      alert("لطفاً متن دستاورد را وارد کنید");
      return;
    }

    const res = await authFetch("/child-achievements/spiritual", {
  method: "POST",
  body: JSON.stringify({
    childId: activeChild.id,
    title: spiritualAchievementTitle,
    description: spiritualAchievementDescription,
  }),
});

console.log("SPIRITUAL RES:", res);

if (!res.ok) {
  if (res.code === "MONTHLY_LIMIT_REACHED" || res.status === 409) {
    setShowSpiritualAchievementModal(false);
    setShowMonthlyLimitModal(true);
    return;
  }

  alert(res.message || "ثبت دستاورد انجام نشد");
  return;
}


    setShowSpiritualAchievementModal(false);

    setSpiritualAchievementDescription("");

    setHasGivenSpiritualAchievementThisMonth(true);

    setShowSpiritualSuccessModal(true);

  } catch (err) {
    console.error(err);

const errorData = err?.response || err;

if (
  errorData?.code === "MONTHLY_LIMIT_REACHED" ||
  errorData?.status === 409
) {
  setShowSpiritualAchievementModal(false);
  setShowMonthlyLimitModal(true);
  return;
}

alert(
  err?.message ||
  "ثبت دستاورد انجام نشد"
);
  }
};


console.log("CHILD ADMINS:", childAdmins);
console.log("FATHER:", father);
console.log("MOTHER:", mother);


  return (
    <main
       dir="rtl"
       className="relative min-h-screen flex flex-col items-center overflow-hidden bg-[#fffaf0] text-gray-800 pt-8 pb-4"
    >
    
    {/* 🌟 بک‌گراند لطیف کودک من */}
<div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
  <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-yellow-200/60 blur-3xl" />
  <div className="absolute top-40 -left-24 w-80 h-80 rounded-full bg-amber-300/30 blur-3xl" />
  <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] rounded-full bg-orange-100/80 blur-3xl" />

  <div className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(circle_at_1px_1px,#facc15_1px,transparent_0)] [background-size:28px_28px]" />

  <motion.div
    className="absolute top-24 right-[12%] text-5xl opacity-20"
    animate={{ y: [0, -16, 0], rotate: [0, 8, 0] }}
    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
  >
    👶
  </motion.div>

  <motion.div
    className="absolute top-72 left-[10%] text-5xl opacity-20"
    animate={{ y: [0, 18, 0], rotate: [0, -8, 0] }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
  >
    ✨
  </motion.div>

  <motion.div
    className="absolute bottom-40 right-[18%] text-5xl opacity-20"
    animate={{ y: [0, -14, 0], scale: [1, 1.08, 1] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  >
    💛
  </motion.div>
</div>

{/* 📅 باکس تقویم امروز */}
<TodayCalendarBox color="yellow" className="mt-2 mb-4" />

{/* 🧭 تب‌های کودک من و کودکان فالو شده */}
<div className="relative z-[10] w-full px-4 mb-4">
  <div className="w-full max-w-md mx-auto bg-white/70 backdrop-blur-xl border border-yellow-100 rounded-3xl p-2 shadow-[0_10px_35px_rgba(255,190,0,0.14)] grid grid-cols-2 gap-2">
    <button
      type="button"
      onClick={() => setActiveTab("mine")}
      className={`
        rounded-2xl py-3 text-sm font-extrabold transition-all
        ${
          activeTab === "mine"
            ? "bg-gradient-to-l from-yellow-400 to-amber-300 text-yellow-950 shadow-md"
            : "bg-white/60 text-yellow-800 hover:bg-yellow-50"
        }
      `}
    >
      کودک من
    </button>

    <button
      type="button"
      onClick={() => setActiveTab("followed")}
      className={`
        rounded-2xl py-3 text-sm font-extrabold transition-all
        ${
          activeTab === "followed"
            ? "bg-gradient-to-l from-yellow-400 to-amber-300 text-yellow-950 shadow-md"
            : "bg-white/60 text-yellow-800 hover:bg-yellow-50"
        }
      `}
    >
      کودکان فالو شده
    </button>
  </div>
</div>



      
{/* 👨‍👩‍👧 نوار انتخاب فرزند */}
<div className="relative z-[10] w-full px-4 mb-6">
  <div
    className="
      w-full max-w-4xl mx-auto
      overflow-x-auto overflow-y-hidden whitespace-nowrap
      rounded-3xl
      bg-white/70 backdrop-blur-xl
      border border-white/70
      shadow-[0_12px_45px_rgba(255,190,0,0.16)]
      px-4 py-4
      scrollbar-thin scrollbar-thumb-yellow-300 scrollbar-track-transparent
    "
  >
    <div className="grid grid-cols-4 sm:flex sm:items-center sm:justify-center gap-2 sm:gap-4">
      {childrenList
  .filter((child) => child.birthDate)
  .map((child) => (
        <motion.button
          key={child.id}
          type="button"
          whileHover={{ y: -3, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setActiveChildId(child.id)}
          className={`
            flex flex-col sm:flex-row items-center justify-center
            gap-1 sm:gap-3
            rounded-xl sm:rounded-2xl
            px-1 py-2 sm:px-3 sm:py-2
            text-center
            transition-all duration-300
            ${
              String(activeChildId) === String(child.id)
                ? "bg-gradient-to-l from-yellow-300 to-amber-200 shadow-[0_8px_24px_rgba(245,158,11,0.28)]"
                : "bg-white/80 hover:bg-yellow-50 border border-yellow-100"
            }
          `}
        >
          <div
            className={`
              w-10 h-10 sm:w-14 sm:h-14 rounded-full p-[3px]
              ${
                String(activeChildId) === String(child.id)
                  ? "bg-gradient-to-br from-yellow-500 via-yellow-300 to-amber-500"
                  : "bg-gradient-to-br from-yellow-200 to-amber-100"
              }
            `}
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
              {child.photo ? (
                <img
                  src={child.photo}
                  alt={child.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xl">👶</span>
              )}
            </div>
          </div>

          <div className="text-right">
            <p className="text-[10px] sm:text-sm font-extrabold text-yellow-900 leading-5">
              {child.fullName}
            </p>
            <p className="text-[11px] text-yellow-700/70">
              پروفایل کودک
            </p>
          </div>
        </motion.button>
      ))}
 
{canManageChild && (
      <Link
  to="/child-profile"
  className="
    flex flex-col sm:flex-row items-center justify-center
    gap-1 sm:gap-3
    rounded-2xl px-4 py-3
    bg-white/60 backdrop-blur-md
    border border-yellow-100
    hover:border-yellow-300
    hover:bg-white/90
    transition-all duration-300
  "
>
  <div
    className="
      w-9 h-9 sm:w-11 sm:h-11 rounded-full
      bg-gradient-to-br from-yellow-100 to-amber-100
      flex items-center justify-center
      text-xl text-yellow-700
    "
  >
    +
  </div>

  <div className="text-right">
    <p className="text-sm font-bold text-yellow-900">
      افزودن فرزند
    </p>

    <p className="text-[11px] text-yellow-700/60">
      پروفایل جدید
    </p>
  </div>
</Link>
)}
    </div>
  </div>
</div>


      {/* 🏅 نوار دستاوردهای کودک */}
      <AchievementsBar childId={activeChild?.id} />




{/* 👶 باکس پروفایل کودک فعال */}
<motion.div
  className="relative z-[6] mt-8 mb-10 w-full max-w-2xl px-4"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <div
  className={`
    relative overflow-hidden
    ${
      activeChild?.gender === "girl"
  ? "bg-pink-100/80"
  : "bg-blue-100/80"
    }
    backdrop-blur-xl
    border border-white/60
    rounded-[2rem]
    shadow-[0_20px_80px_rgba(255,200,0,0.18)]
    p-6 sm:p-8
    text-center
  `}
>
  {/* ✨ نور داخلی کارت */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-200/40 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-100/50 rounded-full blur-2xl" />
  </div>

    {/* 🧒 تصویر کودک */}
<div className="relative flex justify-center mt-2 mb-5">

  {/* 🌟 هاله نور */}
  <div className="absolute w-52 h-52 rounded-[2rem] bg-yellow-200/35 blur-3xl" />

  {/* قاب مربعی تصویر */}
  <div
    className="
      relative z-10
      w-40 h-40 sm:w-44 sm:h-44
      rounded-[2rem]
      p-[5px]
      bg-gradient-to-br from-[#fff7b2] via-[#ffd54d] to-[#ffb300]
      shadow-[0_12px_45px_rgba(255,200,0,0.38)]
    "
  >
    <div
  onClick={() => {
    if (isFollowedTab) setSelectedFollowedChild(activeChild);
  }}
  className={`
    w-full h-full rounded-[1.7rem] overflow-hidden bg-white flex items-center justify-center
    ${isFollowedTab ? "cursor-pointer" : ""}
  `}
>
      {activeChild?.photo ? (
        <img
  src={activeChild.photo}
  alt={activeChild.name}
  className={`
    w-full h-full object-cover
    ${isFollowedTab ? "cursor-pointer hover:scale-105 transition duration-300" : ""}
  `}
/>
      ) : (
        <Baby className="w-20 h-20 text-yellow-700" />
      )}
    </div>

    {/* ✨ درخشش گوشه قاب */}
    <motion.div
      className="absolute top-4 left-5 text-2xl"
      animate={{ scale: [1, 1.25, 1], rotate: [0, 12, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    >
      ✨
    </motion.div>
  </div>
</div>

    {/* 📝 نام کودک */}
    <h2 className="text-2xl font-extrabold text-yellow-800 mb-1">
      {activeChild?.fullName || "نام کودک"}
    </h2>

    {/* 🎂 سن و جنسیت */}
    <p className="text-sm text-gray-600 mb-4">
      {ageText} (
      {activeChild?.gender === "girl" ? "دختر" : "پسر"}
      )
    </p>

    {activeChild?.interests && (
  <>
    <p className="text-xs font-bold text-yellow-700 mb-2">
      علایق کودک
    </p>

    <div className="flex flex-wrap justify-center gap-2 mb-5">
    {activeChild.interests
      .split("،")
      .map((item, index) => (
        <span
          key={index}
          className="
            px-3 py-1.5
            rounded-full
            text-xs font-bold
            bg-gradient-to-l from-yellow-100 to-amber-50
            border border-yellow-200
            text-yellow-800
            shadow-sm
          "
        >
          ✨ {item.trim()}
        </span>
      ))}
    </div>
  </>
)}
    
    {/* 👨‍👩‍👧 والدین کودک */}
<div className="relative z-10 mt-6 mb-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
  <div className="rounded-2xl bg-white/75 border border-yellow-100 shadow-sm px-4 py-3">
  <p className="text-xs text-gray-500 mb-1">پدر</p>

  <div className="flex flex-col items-center justify-center gap-2 text-center">
    <p className="font-extrabold text-gray-800 text-center flex items-center justify-center gap-2">
  {father && (
    <img
      src={father.avatarUrl || "/avatars/101.png"}
      alt={father.fullName || "پدر"}
      className="w-8 h-8 rounded-full object-cover border border-yellow-300 bg-white"
    />
  )}
  <span>{father ? father.fullName : "ثبت نشده"}</span>

  {father && (
  <button
    type="button"
    onClick={() => handleOpenParentChat(father)}
    className="text-[10px] px-2 py-[2px] rounded-full bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 transition"
  >
    چت
  </button>
)}

</p>

    {canManageChild && !father && !pendingFatherInvite && (
      <button
        onClick={() => setShowInviteModal(true)}
        className="text-xs px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200 hover:bg-yellow-200 transition"
      >
        دعوت
      </button>
    )}
    {canManageChild && !father && pendingFatherInvite && (
  <div className="flex items-center gap-2">
    <span className="text-xs px-3 py-1.5 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
      دعوت ارسال شده
    </span>

    <button
      onClick={() => handleCancelParentInvite(pendingFatherInvite.invitationId)}
      className="text-xs px-3 py-1.5 rounded-full bg-white text-red-500 border border-red-200 hover:bg-red-50 transition"
    >
      لغو دعوت
    </button>
  </div>
)}
  </div>
</div>

  <div className="rounded-2xl bg-white/75 border border-yellow-100 shadow-sm px-4 py-3">
    <p className="text-xs text-gray-500 mb-1">مادر</p>

    <div className="flex flex-col items-center justify-center gap-2 text-center">
      <p className="font-extrabold text-gray-800 text-center flex items-center justify-center gap-2">
  {mother && (
    <img
      src={mother.avatarUrl || "/avatars/101.png"}
      alt={mother.fullName || "مادر"}
      className="w-8 h-8 rounded-full object-cover border border-yellow-300 bg-white"
    />
  )}
  <span>{mother ? mother.fullName : "ثبت نشده"}</span>

  {mother && (
  <button
    type="button"
    onClick={() => handleOpenParentChat(mother)}
    className="text-[10px] px-2 py-[2px] rounded-full bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 transition"
  >
    چت
  </button>
)}

</p>

      {canManageChild && !mother && !pendingMotherInvite && (
        <button
          onClick={() => setShowInviteModal(true)}
          className="text-xs px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200 hover:bg-yellow-200 transition"
        >
          دعوت
        </button>
      )}
      {canManageChild && !mother && pendingMotherInvite && (
  <div className="flex items-center gap-2">
    <span className="text-xs px-3 py-1.5 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
      دعوت ارسال شده
    </span>

    <button
      onClick={() => handleCancelParentInvite(pendingMotherInvite.invitationId)}
      className="text-xs px-3 py-1.5 rounded-full bg-white text-red-500 border border-red-200 hover:bg-red-50 transition"
    >
      لغو دعوت
    </button>
  </div>
)}
    </div>
  </div>
</div>


    {/* 📊 اطلاعات خلاصه */}
<div className="relative z-10 grid grid-cols-2 gap-3 text-sm mb-6">
  <div className="rounded-2xl bg-gradient-to-br from-yellow-50 to-white border border-yellow-100 shadow-sm p-4">
  <p className="text-xl mb-1">🎂</p>

  <p className="text-[10px] text-gray-400">
    تاریخ تولد
  </p>

  <p className="text-sm font-bold text-yellow-800 mt-0.5">
    {birth.toLocaleDateString("fa-IR")}
  </p>

  <div className="my-2 border-t border-yellow-100/70" />

  <p className="text-[10px] text-gray-400">
    تا تولد بعدی
  </p>

  <p className="text-sm font-bold text-yellow-800 mt-0.5">
    {daysLeft} روز
  </p>
</div>

  <div className="rounded-2xl bg-gradient-to-br from-yellow-50 to-white border border-yellow-100 shadow-sm p-4">
    <p className="text-2xl mb-1">
      {activeChild?.gender === "girl" ? "🌸" : "🧸"}
    </p>
    <p className="text-xs text-gray-500">جنسیت کودک</p>
    <p className="font-extrabold text-yellow-800 mt-1">
      {activeChild?.gender === "girl" ? "دختر" : "پسر"}
    </p>
    <button
  type="button"
  onClick={() => setShowWishlistModal(true)}
  className={`
  mt-3
  text-[11px]
  px-4 py-2
  rounded-full
  text-white
  font-bold
  hover:scale-[1.03]
  active:scale-[0.98]
  transition-all
  ${
    activeChild?.gender === "girl"
      ? "bg-gradient-to-l from-pink-500 to-rose-400 shadow-[0_8px_20px_rgba(244,63,94,0.28)] hover:shadow-[0_10px_28px_rgba(244,63,94,0.38)]"
      : "bg-gradient-to-l from-blue-500 to-cyan-400 shadow-[0_8px_20px_rgba(59,130,246,0.28)] hover:shadow-[0_10px_28px_rgba(59,130,246,0.38)]"
  }
`}
>
  مشاهده کالاهای مورد علاقه {activeChild?.fullName || "کودک"}
</button>
  </div>
</div>

{canManageChild && (
  <div className="relative z-10 mt-5 space-y-3">

    <button
      type="button"
      onClick={handleOpenSpiritualAchievementModal}
      className="
        w-full inline-flex items-center justify-center gap-2
        bg-gradient-to-l from-amber-400 via-yellow-300 to-yellow-500
        text-yellow-950 py-3 rounded-2xl font-extrabold
        shadow-[0_10px_25px_rgba(245,158,11,0.25)]
        hover:scale-[1.02] active:scale-[0.98]
        transition-all
      "
    >
      ✨ اهدای دستاورد معنوی به {activeChild?.fullName || "فرزندم"}
    </button>

    <div className="flex gap-3">
      <Link
        to={`/child-profile?mode=edit&id=${activeChild.id}`}
        className="
          flex-1 inline-flex items-center justify-center gap-2
          bg-gradient-to-l from-yellow-400 to-amber-300
          text-yellow-950 py-3 rounded-2xl font-extrabold
          shadow-[0_10px_25px_rgba(245,158,11,0.25)]
          hover:scale-[1.02] active:scale-[0.98]
          transition-all
        "
      >
        ✏️ ویرایش پروفایل
      </Link>

      {!confirmDelete ? (
        <button
          onClick={() => setConfirmDelete(true)}
          className="
            flex-1 inline-flex items-center justify-center gap-2
            bg-white/80 border border-red-100 text-red-500
            py-3 rounded-2xl font-extrabold
            hover:bg-red-50 hover:border-red-200
            hover:scale-[1.02] active:scale-[0.98]
            transition-all
          "
        >
          🗑️ حذف
        </button>
      ) : (
        <button
          onClick={() => {
            setConfirmDelete(false);
            handleDeleteChild(activeChild.id);
          }}
          className="
            flex-1 inline-flex items-center justify-center gap-2
            bg-red-500 text-white
            py-3 rounded-2xl font-extrabold
            shadow-[0_10px_25px_rgba(239,68,68,0.25)]
            hover:bg-red-600 active:scale-[0.98]
            transition-all
          "
        >
          حذف قطعی؟
        </button>
      )}
    </div>
  </div>
)}


  </div>
</motion.div>



{/* 🧩 دسترسی‌های کودک */}
<motion.div
  className="relative z-[6] mt-6 mb-12 w-full max-w-3xl px-4"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

    <button
      onClick={() => {
        if (!activeChild) return;
        setSelectedChildForTree(activeChild);
        setShowFamilyTree(true);
      }}
      disabled={!activeChild}
      className={`
        group relative overflow-hidden
        min-h-[120px] rounded-[2rem]
        bg-white/80 backdrop-blur-xl
        border border-white/70
        shadow-[0_16px_45px_rgba(255,190,0,0.16)]
        p-5 text-right
        hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(255,190,0,0.24)]
        transition-all duration-300
        ${!activeChild ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-yellow-200/50 blur-2xl" />

      <div className="relative z-10 flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-300 to-amber-400 flex items-center justify-center text-3xl shadow-lg">
          🌳
        </div>

        <div>
          <h3 className="font-extrabold text-yellow-900 text-lg">
            درختواره کودک
          </h3>
          <p className="text-xs text-gray-500 mt-1 leading-6">
            مشاهده ارتباط کودک با اعضای خانواده
          </p>
        </div>
      </div>
    </button>

    <Link
      to={`/memory-album?childId=${activeChild?.id}${isFollowedTab ? "&mode=view" : ""}`}
      className="
        group relative overflow-hidden
        min-h-[120px] rounded-[2rem]
        bg-white/80 backdrop-blur-xl
        border border-white/70
        shadow-[0_16px_45px_rgba(255,190,0,0.16)]
        p-5 text-right
        hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(255,190,0,0.24)]
        transition-all duration-300
      "
    >
      <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-amber-200/50 blur-2xl" />

      <div className="relative z-10 flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-300 to-yellow-500 flex items-center justify-center text-3xl shadow-lg">
          📸
        </div>

        <div>
          <h3 className="font-extrabold text-yellow-900 text-lg">
            آلبوم خاطرات
          </h3>
          <p className="text-xs text-gray-500 mt-1 leading-6">
            ثبت لحظه‌های شیرین رشد کودک
          </p>
        </div>
      </div>
    </Link>

  </div>
</motion.div>

{/* 🌳 مودال درختواره کودک */}
<FamilyTree
  show={showFamilyTree}
  onClose={() => {
    setShowFamilyTree(false);
    setSelectedChildForTree(null);
  }}
  child={selectedChildForTree}   // یا activeChild (فعلاً همین که داری خوبه)
  father={father}
  mother={mother}
/>





{/* 🧠 جعبه آگاهی ژنینو */}
<motion.div
  className="relative z-[6] mt-0 mb-8 w-full max-w-3xl px-4"  
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
      { title: "الگوی رفتاری والدین در خانه", link: "/articles/parenting-behavior-at-home" },
      { title: "کنار آمدن با ترس‌ها و اضطراب کودک", link: "/articles/child-anxiety-and-fear-management" },
    ]}
  />
</motion.div>


{/* 🌕 دکمه سکه‌ای پایش سلامت کودک */}
{isMineTab && (
<motion.div
  className="relative z-[10] mt-0 mb-12 flex justify-center px-4"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <Link
  to={`/child-health-check?childId=${activeChild?.id}`}
  className={`block ${!activeChild ? "pointer-events-none opacity-50" : ""}`}
>
  <GeninoHealthButton
    title="پایش سلامت کودک"
    icon={HeartPulse}
  />
</Link>

</motion.div>
)}

{showInviteModal && (
  <div
    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    onClick={() => {
      setShowInviteModal(false);
      setInviteEmail("");
      setInvitePhone("");
      setInviteUsername("");
    }}
  >
    <div
      className="bg-white rounded-2xl p-6 w-full max-w-md mx-4"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-lg font-extrabold text-gray-800 mb-4">
        دعوت والد دوم برای {activeChild?.fullName}
      </h2>

      <label className="text-sm text-gray-600">ایمیل والد</label>
      <input
        value={inviteEmail}
        onChange={(e) => setInviteEmail(e.target.value)}
        type="email"
        placeholder="مثلاً test@gmail.com"
        className="w-full border rounded-xl px-3 py-2 mt-1 mb-4"
      />

      <label className="text-sm text-gray-600">یا شماره موبایل</label>
      <input
        value={invitePhone}
        onChange={(e) => setInvitePhone(e.target.value)}
        type="text"
        placeholder="مثلاً 0912..."
        className="w-full border rounded-xl px-3 py-2 mt-1 mb-5"
      />

      <label className="text-sm text-gray-600">یا نام کاربری</label>
      <input
        value={inviteUsername}
        onChange={(e) => setInviteUsername(e.target.value)}
        type="text"
        placeholder="مثلاً Test-Test"
        className="w-full border rounded-xl px-3 py-2 mt-1 mb-5"
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            setShowInviteModal(false);
            setInviteEmail("");
            setInvitePhone("");
            setInviteUsername("");
          }}
          className="px-4 py-2 rounded-xl border"
        >
          بستن
        </button>

        <button
  onClick={handleSendInvitation}
  disabled={isInviting}
  className={`px-4 py-2 rounded-xl font-semibold transition
    ${
      isInviting
        ? "bg-gray-300 text-gray-600"
        : "bg-yellow-500 text-white hover:bg-yellow-600"
    }
  `}
>
  {isInviting ? "در حال ارسال..." : "ارسال دعوت"}
</button>
      </div>
    </div>
  </div>
)}

{showWishlistModal && (
  <div
    className="fixed inset-0 z-[120] bg-black/40 flex items-center justify-center px-4"
    onClick={() => setShowWishlistModal(false)}
  >
    <div
      className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >

      {/* هدر */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-yellow-100">
        <h3 className="text-lg font-extrabold text-yellow-900">
          کالاهای مورد علاقه {activeChild?.fullName}
        </h3>

        <button
          onClick={() => setShowWishlistModal(false)}
          className="text-gray-400 hover:text-gray-700 transition"
        >
          ✕
        </button>
      </div>

      {/* لیست نمونه کالاها */}
      <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">

        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-2xl border border-yellow-100 bg-yellow-50/40 p-3"
          >
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white border border-yellow-100 flex items-center justify-center text-3xl">
              🧸
            </div>

            <div className="flex-1 text-right">
              <p className="font-bold text-gray-800">
                اسباب بازی کودک
              </p>

              <p className="text-sm text-yellow-700 mt-1">
                ۱٬۲۵۰٬۰۰۰ تومان
              </p>
            </div>

            <button
              className="
                px-3 py-2
                rounded-xl
                bg-gradient-to-l from-yellow-400 via-amber-300 to-yellow-500
                hover:from-yellow-500 hover:to-amber-400
                text-yellow-950
                text-xs
                font-extrabold
                shadow-[0_8px_22px_rgba(245,158,11,0.30)]
                hover:shadow-[0_10px_28px_rgba(245,158,11,0.42)]
                transition-all
              "
            >
              ارسال هدیه
            </button>
          </div>
        ))}

      </div>
    </div>
  </div>
)}


{showSpiritualAchievementModal && (
  <div
    className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50 px-4"
    onClick={() => setShowSpiritualAchievementModal(false)}
  >
    <div
      className="w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-[2rem] border-2 border-[#d4af37] bg-gradient-to-b from-yellow-50 to-white p-5 shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-200 to-amber-400 text-4xl shadow-lg">
          ✨
        </div>

        <h2 className="text-xl font-extrabold text-yellow-900">
          اهدای دستاورد معنوی به {activeChild?.fullName || "کودک"}
        </h2>

        <div className="mt-4 rounded-3xl border border-yellow-100 bg-white/80 p-4 text-right text-xs leading-7 text-gray-600">
  <p>
    کاربر ژنینویی عزیز، اهدای دستاورد معنوی به {activeChild?.fullName || "کودک"}
    می‌تواند او را در مسیر رشد، انگیزه، مهربانی و تعالی همراهی کند.
  </p>

  {showFullSpiritualInfo && (
    <p className="mt-2">
      هر ۱۰ دستاورد معنوی، یک امتیاز برای شرکت {activeChild?.fullName || "کودک"}
      در قرعه‌کشی جوایز ژنینویی محسوب می‌شود. همچنین به پاس مهربانی شما،
      اگر {activeChild?.fullName || "کودک"} در قرعه‌کشی ژنینو برنده شود،
      شما نیز به عنوان یکی از صادرکنندگان دستاورد برای او، وارد قرعه‌کشی ویژه صادرکنندگان خواهید شد.
      هر دستاورد صادرشده توسط شما، یک امتیاز برای این قرعه‌کشی دارد.
    </p>
  )}

  <button
    type="button"
    onClick={() => setShowFullSpiritualInfo((prev) => !prev)}
    className="mt-2 text-xs font-extrabold text-yellow-700"
  >
    {showFullSpiritualInfo ? "نمایش کمتر" : "بیشتر بخوانید"}
  </button>

  <span className="mt-2 block font-extrabold text-yellow-800">
    توجه: هر کاربر فقط ماهی یک‌بار می‌تواند به {activeChild?.fullName || "کودک"} دستاورد معنوی اهدا کند.
  </span>
</div>
      </div>

      <div className="mt-5 space-y-4 text-right">
        <div>
          <label className="mb-1 block text-xs font-extrabold text-yellow-800">
            عنوان دستاورد
          </label>

          <select
  value={spiritualAchievementTitle}
  onChange={(e) => setSpiritualAchievementTitle(e.target.value)}
  className="w-full rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm font-bold text-gray-700 outline-none focus:ring-4 focus:ring-yellow-100">
  <option>رضایت خانواده به دلیل مهربانی</option>
  <option>رضایت خانواده به دلیل تلاش درسی</option>
  <option>رضایت خانواده به دلیل کمک در خانه</option>
  <option>رضایت خانواده به دلیل صداقت</option>
  <option>رضایت خانواده به دلیل مسئولیت‌پذیری</option>
  <option>رضایت خانواده به دلیل احترام به بزرگ‌ترها</option>
  <option>رضایت خانواده به دلیل نظم شخصی</option>
  <option>رضایت خانواده به دلیل صبر و آرامش</option>
  <option>رضایت خانواده به دلیل همکاری با اعضای خانواده</option>
  <option>رضایت خانواده به دلیل مراقبت از خواهر یا برادر</option>
  <option>رضایت خانواده به دلیل شجاعت</option>
  <option>رضایت خانواده به دلیل پشتکار</option>
  <option>رضایت خانواده به دلیل قدرشناسی</option>
  <option>رضایت خانواده به دلیل کمک به دیگران</option>
  <option>رضایت خانواده به دلیل رفتار محترمانه</option>
  <option>رضایت خانواده به دلیل پیشرفت اخلاقی</option>
</select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-extrabold text-yellow-800">
            متن دستاورد
          </label>

          <textarea
  rows={3}
  value={spiritualAchievementDescription}
  onChange={(e) =>
    setSpiritualAchievementDescription(e.target.value)
  }
  placeholder="متن اهدای دستاورد را به دلخواه خود وارد کنید"
  className="w-full resize-none rounded-2xl border border-yellow-200 bg-white px-4 py-3 text-sm leading-7 text-gray-700 outline-none placeholder:text-gray-400 focus:ring-4 focus:ring-yellow-100"
/>
        </div>

        <div className="rounded-2xl border border-yellow-100 bg-white/80 p-4 text-xs leading-7 text-gray-600">
          <p>
            <span className="font-extrabold text-yellow-800">صادرکننده:</span>{" "}
            عضو خانواده / درختواره {activeChild?.fullName || "کودک"}
          </p>

          <p>
            <span className="font-extrabold text-yellow-800">تاریخ صدور:</span>{" "}
            {new Date().toLocaleDateString("fa-IR")}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button
  type="button"
  onClick={handleSubmitSpiritualAchievement}
  className="w-full rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-400 px-6 py-3 text-sm font-extrabold text-white shadow-md"
>
  ثبت و اهدای دستاورد
</button>

        <button
          type="button"
          onClick={() => setShowSpiritualAchievementModal(false)}
          className="w-full rounded-2xl border border-yellow-300 bg-white px-6 py-3 text-sm font-extrabold text-yellow-700"
        >
          بستن
        </button>
      </div>
    </div>
  </div>
)}

<AnimatePresence>
  {showMonthlyLimitModal && (
    <motion.div
      className="fixed inset-0 z-[100001] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowMonthlyLimitModal(false)}
    >
      <motion.div
        className="relative w-full max-w-sm overflow-hidden rounded-[2rem] border-2 border-[#d4af37] bg-gradient-to-b from-yellow-50 to-white p-6 text-center shadow-2xl"
        initial={{ scale: 0.85, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.85, y: 24, opacity: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-yellow-300/35 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-amber-300/25 blur-3xl" />

        <motion.div
          className="relative z-10 mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full border-[4px] border-[#f8e47a] bg-gradient-to-br from-[#fff8c7] via-[#ffd84d] to-[#d6a700] text-5xl shadow-[0_0_35px_rgba(212,175,55,0.7)]"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          💛
        </motion.div>

        <motion.h2
          className="relative z-10 text-xl font-black text-yellow-900"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          سپاس از مهربانی شما
        </motion.h2>

        <motion.p
          className="relative z-10 mt-4 text-sm leading-8 text-gray-600"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          شما در ماه جاری، گواهی دستاورد معنوی خود را به{" "}
          {activeChild?.fullName || "این کودک"} اهدا کرده‌اید.
          <br />
          در ماه آینده دوباره می‌توانید برای{" "}
          {activeChild?.fullName || "این کودک"} گواهی دستاورد معنوی اهدا کنید.
        </motion.p>

        <button
          type="button"
          onClick={() => setShowMonthlyLimitModal(false)}
          className="relative z-10 mt-6 w-full rounded-2xl border border-yellow-300 bg-white px-6 py-3 text-sm font-extrabold text-yellow-700 transition hover:bg-yellow-50"
        >
          متوجه شدم
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

<AnimatePresence>
  {showSpiritualSuccessModal && (
    <motion.div
      className="fixed inset-0 z-[100001] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowSpiritualSuccessModal(false)}
    >
      <motion.div
        className="relative w-full max-w-sm overflow-hidden rounded-[2rem] border-2 border-[#d4af37] bg-gradient-to-b from-yellow-50 to-white p-6 text-center shadow-2xl"
        initial={{ scale: 0.85, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.85, y: 24, opacity: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-yellow-300/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-amber-300/30 blur-3xl" />

        <motion.div
          className="relative z-10 mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full border-[4px] border-[#f8e47a] bg-gradient-to-br from-[#fff8c7] via-[#ffd84d] to-[#d6a700] text-5xl shadow-[0_0_35px_rgba(212,175,55,0.75)]"
          animate={{ scale: [1, 1.08, 1], rotate: [0, 4, -4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          ✨
        </motion.div>

        <motion.h2
          className="relative z-10 text-xl font-black text-yellow-900"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          دستاورد معنوی شما با موفقیت به {activeChild?.fullName || "کودک"} اهدا شد.
        </motion.h2>

        <motion.p
          className="relative z-10 mt-4 text-sm leading-8 text-gray-600"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          «مهربانی و توجه شما،<br />
          بخشی از خاطرات طلایی کودکی او خواهد شد.»
        </motion.p>

        <button
          type="button"
          onClick={() => setShowSpiritualSuccessModal(false)}
          className="relative z-10 mt-6 w-full rounded-2xl border border-yellow-300 bg-white px-6 py-3 text-sm font-extrabold text-yellow-700 transition hover:bg-yellow-50"
        >
          بازگشت
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

<AnimatePresence>
  {selectedFollowedChild && (
    <motion.div
      className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/40 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSelectedFollowedChild(null)}
    >
      <motion.div
        className="w-full max-w-sm rounded-3xl border-2 border-[#d4af37] bg-gradient-to-b from-yellow-50 to-[#fff4cc] p-5 text-center shadow-2xl"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex h-48 items-center justify-center overflow-hidden rounded-2xl border-2 border-[#d4af37] bg-white">
          {selectedFollowedChild.photo ? (
            <img
              src={selectedFollowedChild.photo}
              alt={selectedFollowedChild.fullName}
              className="h-full w-full object-cover"
            />
          ) : (
            <Baby className="h-24 w-24 text-yellow-500" />
          )}
        </div>

        <h2 className="text-xl font-extrabold text-yellow-800">
          {selectedFollowedChild.fullName}
        </h2>

        <div className="mt-4 space-y-2 text-sm font-medium text-gray-700">
          <p>{getChildAgeText(selectedFollowedChild)}</p>

          <p>
  {getParentCityText() !== "شهر ثبت نشده"
  ? `از ${getParentCityText()}`
  : "شهر ثبت نشده"}
</p>

          {selectedFollowedChild.interests ? (
            <p>
              <span className="font-extrabold text-yellow-800">عاشق: </span>
              {selectedFollowedChild.interests}
            </p>
          ) : (
            <p className="text-xs text-gray-400">
              این بخش هنوز توسط والدین کودک تکمیل نشده است
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            className="w-full rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-400 px-6 py-3 text-sm font-extrabold text-white shadow-md"
          >
            آنفالو
          </button>

          <button
            type="button"
            className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 px-6 py-3 text-sm font-extrabold text-white shadow-md"
          >
            ارسال هدیه
          </button>

          <button
            type="button"
            onClick={() => setSelectedFollowedChild(null)}
            className="w-full rounded-2xl border border-yellow-300 bg-white px-6 py-3 text-sm font-extrabold text-yellow-700"
          >
            بستن
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


</main>
);
}
