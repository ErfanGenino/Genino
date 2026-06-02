import { motion } from "framer-motion";
import {
  HeartHandshake,
  Sparkles,
  CalendarDays,
  ShoppingCart,
  HeartPulse,
  Bell,
  Clock,
  MessageCircleHeart,
  Activity,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:80/api";

export default function LifeCompanion() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [myUser, setMyUser] = useState(null);
  const [partnerUser, setPartnerUser] = useState(null);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [latestRelationshipAssessment, setLatestRelationshipAssessment] = useState(null);
  const [shoppingListCounts, setShoppingListCounts] = useState({
  open: 0,
  closed: 0,
});
  const [lifeEventCounts, setLifeEventCounts] = useState({
  open: 0,
  closed: 0,
});


  const [todayItems, setTodayItems] = useState([]);

  const actions = [
  {
    title: "رویدادها و قرارها",
    desc: `باز: ${lifeEventCounts.open} | بسته: ${lifeEventCounts.closed}`,
    icon: Bell,
    path: "/life-companion/events",
  },
  {
    title: "لیست خرید",
    desc: `باز: ${shoppingListCounts.open} | بسته: ${shoppingListCounts.closed}`,
    icon: ShoppingCart,
    path: "/life-companion/shopping-lists",
  },

];

  const timeline = [
    "فرناز یک قرار دکتر برای هفته آینده ثبت کرد",
    "عرفان تست سلامت را انجام داد",
    "لیست خرید خانه به‌روزرسانی شد",
  ];

  useEffect(() => {
  loadCompanion();
  loadLatestRelationshipAssessment();
  loadShoppingListCounts();
  loadLifeEventCounts();
}, []);

useEffect(() => {
  if (myUser && partnerUser) {
    loadTodayItems();
  }
}, [myUser, partnerUser]);

const loadCompanion = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("genino_token");

    const res = await fetch(
      `${API_BASE_URL}/life-companion/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!data?.hasCompanion) {
      setLoading(false);
      return;
    }

    const currentUser = JSON.parse(
      localStorage.getItem("genino_user") || "{}"
    );

    const isUser1 =
      data.companion.user1.id === currentUser.id;

    const me = isUser1
      ? data.companion.user1
      : data.companion.user2;

    const partner = isUser1
      ? data.companion.user2
      : data.companion.user1;

    setMyUser(me);
    setPartnerUser(partner);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

const loadLatestRelationshipAssessment = async () => {
  try {
    const token = localStorage.getItem("genino_token");

    const res = await fetch(`${API_BASE_URL}/relationship-assessments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data?.ok && Array.isArray(data.assessments) && data.assessments.length > 0) {
      setLatestRelationshipAssessment(data.assessments[0]);
    }
  } catch (err) {
    console.error("LOAD LATEST RELATIONSHIP ASSESSMENT ERROR:", err);
  }
};

const loadShoppingListCounts = async () => {
  try {
    const token = localStorage.getItem("genino_token");

    const res = await fetch(`${API_BASE_URL}/life-companion/shopping-lists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok || !Array.isArray(data.shoppingLists)) {
      return;
    }

    const open = data.shoppingLists.filter((list) => !list.completed).length;
    const closed = data.shoppingLists.filter((list) => list.completed).length;

    setShoppingListCounts({
      open,
      closed,
    });
  } catch (err) {
    console.error("LOAD SHOPPING LIST COUNTS ERROR:", err);
  }
};

const loadLifeEventCounts = async () => {
  try {
    const token = localStorage.getItem("genino_token");

    const res = await fetch(
      `${API_BASE_URL}/life-companion/life-events`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok || !Array.isArray(data.lifeEvents)) {
      return;
    }

    const open = data.lifeEvents.filter(
      (event) => !event.completed
    ).length;

    const closed = data.lifeEvents.filter(
      (event) => event.completed
    ).length;

    setLifeEventCounts({
      open,
      closed,
    });
  } catch (err) {
    console.error("LOAD LIFE EVENT COUNTS ERROR:", err);
  }
};

const loadTodayItems = async () => {
  try {
    const token = localStorage.getItem("genino_token");

    const items = [];
    const isToday = (dateValue) => {
  if (!dateValue) return false;

  const itemDate = new Date(dateValue);
  const today = new Date();

  return (
    itemDate.getFullYear() === today.getFullYear() &&
    itemDate.getMonth() === today.getMonth() &&
    itemDate.getDate() === today.getDate()
  );
};

    const shoppingRes = await fetch(`${API_BASE_URL}/life-companion/shopping-lists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const shoppingData = await shoppingRes.json();

    if (shoppingRes.ok && Array.isArray(shoppingData.shoppingLists)) {
      shoppingData.shoppingLists.forEach((list) => {
        const itemDate = list.createdAt || list.updatedAt;

          if (!isToday(itemDate)) return;
        const creatorName =
          list.creator?.fullName ||
          list.createdByUser?.fullName ||
          list.user?.fullName ||
          list.createdByName ||
          "یکی از شما";

        items.push({
          id: `shopping-${list.id}`,
          text: `امروز ${creatorName} یک لیست خرید ثبت کرد.`,
          date: itemDate,
        });
      });
    }

    const eventRes = await fetch(`${API_BASE_URL}/life-companion/life-events`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const eventData = await eventRes.json();

if (eventRes.ok && Array.isArray(eventData.lifeEvents)) {
  eventData.lifeEvents.forEach((event) => {
    const itemDate = event.createdAt || event.updatedAt;

    if (!isToday(itemDate)) return;

    const creatorName =
      event.creator?.fullName ||
      event.createdByUser?.fullName ||
      event.user?.fullName ||
      event.createdByName ||
      "یکی از شما";

    items.push({
      id: `life-event-${event.id}`,
      text: `امروز ${creatorName} یک رویداد یا قرار ثبت کرد.`,
      date: itemDate,
    });
  });
}

    const assessmentRes = await fetch(`${API_BASE_URL}/relationship-assessments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const assessmentData = await assessmentRes.json();

    if (assessmentData?.ok && Array.isArray(assessmentData.assessments)) {
      assessmentData.assessments.forEach((assessment) => {
        const itemDate = assessment.createdAt || assessment.updatedAt;

if (!isToday(itemDate)) return;
        const getPersonName = (person) =>
  person?.fullName ||
  `${person?.firstName || ""} ${person?.lastName || ""}`.trim() ||
  person?.username ||
  "یکی از شما";

const creatorName =
  String(assessment.userId) === String(myUser?.id)
    ? getPersonName(myUser)
    : String(assessment.userId) === String(partnerUser?.id)
    ? getPersonName(partnerUser)
    : "یکی از شما";

        items.push({
          id: `assessment-${assessment.id}`,
          text: `امروز ${creatorName} یک مراقبت انجام داد و آن را ثبت کرد.`,
          date: itemDate,
        });
      });
    }

    const sortedItems = items.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    setTodayItems(sortedItems);
  } catch (err) {
    console.error("LOAD TODAY ITEMS ERROR:", err);
    setTodayItems([]);
  }
};

const handleDisconnect = async () => {
  try {
    const token = localStorage.getItem("genino_token");

    const res = await fetch(
      `${API_BASE_URL}/life-companion/disconnect`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "قطع ارتباط انجام نشد");
      return;
    }

    alert("همراهی پایان یافت");

    setShowDisconnectModal(false);

    setMyUser(null);
    setPartnerUser(null);

    window.location.reload();
  } catch (err) {
    console.error(err);

    alert("خطا در قطع ارتباط");
  }
};

const handleOpenPartnerChat = (person) => {
  if (!person?.id) {
    alert("اطلاعات کاربر برای چت کامل نیست.");
    return;
  }

  navigate("/social", {
    state: {
      openPrivateChatUser: {
        id: Number(person.id),
        name:
          person.fullName ||
          `${person.firstName || ""} ${person.lastName || ""}`.trim() ||
          "کاربر ژنینو",
        avatarUrl: person.avatarUrl || null,
        username: person.username || "",
      },
    },
  });
};

const relationshipScore =
  latestRelationshipAssessment?.overallScore ?? null;

const relationshipGrowth =
  latestRelationshipAssessment?.growthCategory ?? null;

const relationshipStatus =
  relationshipScore === null
    ? "هنوز ارزیابی نشده"
    : relationshipScore >= 80
    ? "گرم و پایدار"
    : relationshipScore >= 60
    ? "خوب و قابل رشد"
    : relationshipScore >= 40
    ? "نیازمند توجه"
    : "نیازمند مراقبت";



  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-rose-50 via-white to-amber-50 px-4 py-8 text-gray-800"
    >
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-rose-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-amber-200/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/3 h-96 w-96 rounded-full bg-pink-100/60 blur-3xl" />

      <section className="relative z-10 mx-auto w-full max-w-6xl">
        {/* هدر */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-8 text-center"
        >
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-rose-400 via-pink-400 to-amber-300 text-white shadow-[0_16px_45px_rgba(244,114,182,0.35)]">
            <HeartHandshake size={38} />
          </div>

          <h1 className="text-2xl font-black text-rose-800 sm:text-3xl">
            همراه زندگی من
          </h1>

          <p className="mt-3 text-sm leading-7 text-gray-600">
            فضای دونفره، آرام و شخصی شما برای برنامه‌ها، مراقبت‌ها و لحظه‌های مشترک.
          </p>
        </motion.div>

        {/* کارت دو نفر */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="relative mb-6 overflow-hidden rounded-[2rem] border border-rose-100 bg-white/75 p-5 shadow-[0_20px_70px_rgba(244,114,182,0.18)] backdrop-blur-xl sm:p-8"
        >
          <div className="absolute inset-x-10 top-1/2 hidden h-[2px] bg-gradient-to-l from-rose-200 via-amber-300 to-rose-200 sm:block" />

          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {myUser && (
  <PersonCard
    person={myUser}
    onOpenChat={handleOpenPartnerChat}
  />
)}

{partnerUser && (
  <PersonCard
    person={partnerUser}
    onOpenChat={handleOpenPartnerChat}
  />
)}
          </div>

          <div className="relative z-10 mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border border-amber-100 bg-amber-50/80 px-4 py-2 text-xs font-bold text-amber-700">
            <Sparkles size={15} />
            این صفحه مخصوص زندگی مشترک شماست
          </div>
          <div className="mt-5 flex justify-center">
  <button
  type="button"
  onClick={() => setShowDisconnectModal(true)}
    className="rounded-2xl border border-rose-200 bg-white/80 px-5 py-3 text-sm font-bold text-rose-600 shadow-sm transition hover:bg-rose-50"
  >
    پایان همراهی
  </button>
</div>
        </motion.div>

        

        {/* کارت نبض رابطه */}
<motion.button
  type="button"
  onClick={() => navigate("/life-companion/relationship-care")}
  initial={{ opacity: 0, y: 26 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.55, delay: 0.22 }}
  className="group relative mb-6 w-full overflow-hidden rounded-[2rem] border border-rose-100 bg-gradient-to-br from-white via-rose-50 to-amber-50 p-5 text-right shadow-[0_20px_70px_rgba(244,114,182,0.16)] backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(244,114,182,0.22)] sm:p-6"
>
  <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-rose-200/50 blur-3xl" />
  <div className="absolute -right-16 bottom-0 h-44 w-44 rounded-full bg-amber-200/50 blur-3xl" />

  <div className="relative z-10 grid grid-cols-[0.9fr_1.1fr] items-center gap-3 sm:gap-5">
    <div className="flex items-center gap-4">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-rose-500 via-pink-500 to-amber-400 text-white shadow-[0_14px_35px_rgba(244,114,182,0.35)] transition group-hover:scale-105">
        <HeartPulse size={32} />
      </div>

      <div>
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-100 bg-white/70 px-3 py-1 text-[11px] font-black text-amber-700">
          <Sparkles size={13} />
          مراقبت از رابطه
        </div>

        <h2 className="text-xl font-black text-rose-800">
          نبض رابطه
        </h2>

        <p className="mt-2 text-xs leading-6 text-gray-500">
          وضعیت گفت‌وگو، صمیمیت، آرامش و همکاری شما در زندگی مشترک.
        </p>
      </div>
    </div>

    <div className="rounded-[1.5rem] border border-white/80 bg-white/70 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-bold text-gray-500">
          وضعیت این هفته
        </span>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
  {relationshipStatus}
</span>
      </div>

      <div className="flex items-end gap-2">
        <span className="text-4xl font-black text-rose-700">
  {relationshipScore ?? "--"}
</span>
        <span className="mb-1 text-xs font-bold text-gray-500">از 100</span>
      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-rose-100">
        <div
  className="h-full rounded-full bg-gradient-to-l from-rose-500 to-amber-300"
  style={{
    width: `${relationshipScore ?? 0}%`,
  }}
/>
      </div>

      <p className="mt-3 text-xs font-bold leading-6 text-gray-500">
       {relationshipGrowth
  ? `فرصت رشد این هفته: ${relationshipGrowth}`
  : "هنوز ارزیابی رابطه انجام نشده است"}
      </p>
    </div>
  </div>
</motion.button>

{/* اکشن‌های اصلی */}
<div className="mb-8 grid grid-cols-2 gap-3 sm:gap-4">
  {actions.map((item, index) => {
    const Icon = item.icon;

    return (
      <motion.button
        key={item.title}
        type="button"
        onClick={() => item.path && navigate(item.path)}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.3 + index * 0.08 }}
        className="group rounded-[1.7rem] border border-rose-100 bg-white/80 p-5 text-right shadow-[0_12px_38px_rgba(244,114,182,0.1)] backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(244,114,182,0.18)]"
      >
        <div className="mb-4 flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-amber-300 text-white shadow-md transition group-hover:scale-105">
          <Icon size={24} />
        </div>

        <h3 className="text-base font-black text-rose-800">
          {item.title}
        </h3>

        {item.title.trim() === "لیست خرید" ||
 item.title.trim() === "رویدادها و قرارها" ? (
  <div className="mt-3 flex flex-wrap gap-2">
    <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-black text-emerald-700">
  باز: {
    item.title.trim() === "لیست خرید"
      ? shoppingListCounts.open
      : lifeEventCounts.open
  }
</span>

<span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[11px] font-black text-gray-600">
  بسته: {
    item.title.trim() === "لیست خرید"
      ? shoppingListCounts.closed
      : lifeEventCounts.closed
  }
</span>
  </div>
) : (
  <p className="mt-2 text-xs leading-6 text-gray-500">
    {item.desc}
  </p>
)}
      </motion.button>
    );
  })}
</div>

{/* امروز شما */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mb-6 rounded-[2rem] border border-rose-100 bg-white/80 p-5 shadow-[0_16px_50px_rgba(244,114,182,0.12)] backdrop-blur-xl sm:p-6"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-amber-300 text-white shadow-md">
              <Clock size={24} />
            </div>

            <div>
              <h2 className="text-lg font-black text-rose-800">
                امروز شما
              </h2>
              <p className="text-xs text-gray-500">
                خلاصه‌ای از اتفاقات مهم زندگی مشترک
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
  {todayItems.length === 0 ? (
    <div className="rounded-2xl border border-dashed border-rose-200 bg-rose-50/40 px-4 py-6 text-center text-sm font-bold text-gray-500">
      هنوز داده‌ای برای نمایش ثبت نشده است.
    </div>
  ) : (
    todayItems.map((item, index) => (
      <div
        key={index}
        className="rounded-xl border border-rose-50 bg-gradient-to-l from-rose-50/80 to-white px-3 py-1.5 text-[11px] font-medium leading-4 text-gray-700"
      >
        {item.text}
      </div>
    ))
  )}
</div>
        </motion.div>

        
      </section>

      {showDisconnectModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
    <div className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-2xl">
      <h3 className="text-xl font-black text-rose-700 text-center">
        پایان همراهی
      </h3>

      <p className="mt-4 text-sm leading-8 text-center text-gray-600">
        آیا مطمئن هستید؟
        <br />
        بعد از پایان همراهی، اطلاعات مشترک دیگر نمایش داده نمی‌شود.
      </p>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => setShowDisconnectModal(false)}
          className="flex-1 rounded-2xl border border-gray-200 bg-white py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
        >
          انصراف
        </button>

        <button
          onClick={handleDisconnect}
          className="flex-1 rounded-2xl bg-gradient-to-l from-rose-500 to-red-400 py-3 text-sm font-bold text-white transition hover:opacity-90"
        >
          پایان همراهی
        </button>
      </div>
    </div>
  </div>
)}

    </main>
  );
}

function PersonCard({ person, onOpenChat }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className="relative z-10 overflow-hidden rounded-[1.3rem] border border-white/80 bg-white/85 p-3 text-center shadow-[0_14px_40px_rgba(0,0,0,0.06)] sm:rounded-[1.7rem] sm:p-5"
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-rose-100 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-amber-100 blur-3xl" />

      <div className="relative mx-auto mb-4 h-28 w-28 rounded-[2rem] bg-gradient-to-br from-rose-300 via-pink-300 to-amber-300 p-[4px] shadow-[0_12px_35px_rgba(244,114,182,0.25)]">
        <div className="h-full w-full overflow-hidden rounded-[1.7rem] bg-white">
          <img
            src={
  person.avatarUrl ||
"/avatars/101.png"
}
            alt={person.fullName || `${person.firstName || ""} ${person.lastName || ""}`.trim() || "کاربر ژنینو"}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="relative flex items-center justify-center gap-2">
  <h2 className="text-lg font-black text-rose-800">
    {person.fullName || `${person.firstName || ""} ${person.lastName || ""}`.trim() || "کاربر ژنینو"}
  </h2>

</div>

      <button
  type="button"
  onClick={() => onOpenChat(person)}
  className="
    relative mt-1
    inline-flex items-center gap-1
    rounded-full
    border border-blue-100
    bg-blue-50
    px-3 py-1
    text-xs font-bold
    text-blue-600
    transition
    hover:bg-blue-100
  "
>
  <MessageCircle size={14} />
  چت
</button>
    </motion.div>
  );
}