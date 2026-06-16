import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Users,
  Wallet,
  Star,
  Trophy,
  UserRound,
  Store,
  Bell,
  Copy,
} from "lucide-react";
import { getMyAmbassador } from "../../services/api";


const quickActions = [
  { icon: GraduationCap, title: "آکادمی", desc: "آموزش‌های سفیران" },
  { icon: Store, title: "مشتریان من", desc: "کسب‌وکارهای جذب‌شده" },
  { icon: Wallet, title: "مالی", desc: "پورسانت و تسویه" },
  { icon: Star, title: "امتیازات", desc: "بازخوردها و اخطارها" },
  { icon: Trophy, title: "رتبه‌بندی", desc: "سفیران برتر" },
  { icon: UserRound, title: "پروفایل", desc: "ویرایش اطلاعات" },
];

const academy = [
  "معرفی حرفه‌ای ژنینو",
  "برخورد با فروشگاه‌ها",
  "برخورد با مدارس",
  "برخورد با مهدکودک‌ها",
  "اصول مذاکره",
  "سوالات متداول مشتریان",
];

const customers = [
  {
    name: "فروشگاه نی‌نی طلایی",
    type: "فروشگاه کودک",
    sales: "۱۲,۴۰۰,۰۰۰ تومان",
    subscription: "۲۶ روز باقی‌مانده",
  },
  {
    name: "مدرسه مهر آینده",
    type: "مدرسه",
    sales: "۸,۹۰۰,۰۰۰ تومان",
    subscription: "۹ روز باقی‌مانده",
  },
  {
    name: "خانه بازی رنگین‌کمان",
    type: "خانه بازی",
    sales: "۵,۳۰۰,۰۰۰ تومان",
    subscription: "۴۵ روز باقی‌مانده",
  },
];


const leaderboard = [
  { rank: 1, name: "سارا احمدی", customers: 58, city: "تهران" },
  { rank: 2, name: "امیر رضایی", customers: 46, city: "اصفهان" },
  { rank: 3, name: "مریم کریمی", customers: 39, city: "شیراز" },
];

export default function DashboardAmbassador() {
  const [ambassador, setAmbassador] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

const dashboardStats = [
  {
    icon: Users,
    title: "مشتریان",
    value: ambassador?.customersCount || 0,
    desc: "جذب‌شده",
  },
  {
    icon: UserRound,
    title: "کاربران",
    value: ambassador?.invitedUsersCount || 0,
    desc: "معرفی‌شده",
  },
  {
    icon: Star,
    title: "امتیاز",
    value: ambassador?.score || 0,
    desc: "از ۵",
  },
  {
  icon: Wallet,
  title: "پورسانت",
  value: `${(ambassador?.payableCommission || 0).toLocaleString("fa-IR")} تومان`,
  desc: "قابل دریافت",
  featured: true,
},
];


const financeStats = [
  {
    title: "کل پورسانت",
    value: `${(ambassador?.totalCommission || 0).toLocaleString("fa-IR")} تومان`,
  },
  {
    title: "تسویه‌شده",
    value: `${(ambassador?.paidCommission || 0).toLocaleString("fa-IR")} تومان`,
  },
  {
    title: "قابل دریافت",
    value: `${(ambassador?.payableCommission || 0).toLocaleString("fa-IR")} تومان`,
  },
];


useEffect(() => {
  async function loadAmbassador() {
    const res = await getMyAmbassador();

    if (!res.ok || !res.ambassador) {
      setError("اطلاعات سفیر پیدا نشد.");
      setLoading(false);
      return;
    }

    setAmbassador(res.ambassador);
    setLoading(false);
  }

  loadAmbassador();
}, []);

if (loading) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#fffdf8] px-4">
      <div className="rounded-3xl border border-yellow-200 bg-white p-6 text-center font-bold text-[#7a5217] shadow-xl">
        در حال بارگذاری داشبورد سفیر...
      </div>
    </main>
  );
}

if (error) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#fffdf8] px-4">
      <div className="max-w-md rounded-3xl border border-red-200 bg-white p-6 text-center shadow-xl">
        <h1 className="text-xl font-black text-red-600">دسترسی به داشبورد سفیر</h1>
        <p className="mt-3 text-sm leading-7 text-stone-600">{error}</p>
      </div>
    </main>
  );
}



  return (
    <main className="min-h-screen bg-[#fffdf8] px-3 py-6 text-stone-800 sm:px-4 sm:py-8">
      <section className="mx-auto max-w-7xl space-y-5 sm:space-y-6">
        <motion.div
          className="relative overflow-hidden rounded-[2.2rem] border border-yellow-200 bg-gradient-to-br from-[#fffaf0] via-white to-[#f6e7b4] p-5 shadow-2xl shadow-yellow-900/10 sm:p-7"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#d4af37]/20 blur-3xl" />
<div className="pointer-events-none absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-[#b98522]/15 blur-3xl" />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white bg-white shadow-2xl shadow-yellow-500/20 sm:h-28 sm:w-28">
  {ambassador?.personalPhotoUrl ? (
    <img
      src={ambassador.personalPhotoUrl}
      alt="عکس پرسنلی سفیر ژنینو"
      className="h-full w-full object-cover"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center text-4xl">
      👤
    </div>
  )}

  </div>


              <div>
                <p className="mb-2 inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-black text-[#b98522]">
  داشبورد سفیر ژنینو
</p>

                <h1 className="text-xl font-black text-[#7a5217] sm:text-3xl">
  {ambassador?.user?.fullName ||
   `${ambassador?.user?.firstName || ""} ${ambassador?.user?.lastName || ""}`.trim() ||
   "سفیر ژنینو"}
</h1>

                <p className="mt-2 text-xs leading-6 text-stone-600 sm:text-sm">
                  مدیریت مشتریان، آموزش‌ها، پورسانت‌ها و عملکرد سفیر
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.8rem] border border-[#d4af37]/50 bg-gradient-to-br from-[#fff7dc] via-white to-[#f6e7b4] p-5 shadow-2xl shadow-yellow-500/10">
  <div className="pointer-events-none absolute -left-10 -top-10 h-28 w-28 rounded-full bg-[#d4af37]/20 blur-2xl" />

  <div className="relative">
    <div className="mb-2 text-xs font-black text-[#b98522]">
      کد اختصاصی سفیر
    </div>

    <div className="rounded-2xl border border-yellow-200 bg-white/80 px-4 py-3 text-center text-2xl font-black tracking-wider text-[#7a5217] shadow-inner">
      {ambassador?.ambassadorCode || "ثبت نشده"}
    </div>

    <p className="mt-3 max-w-xs text-xs leading-6 text-stone-600">
      با اشتراک این کد، کاربران و کسب‌وکارها را به ژنینو دعوت کنید.
    </p>

    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(ambassador?.ambassadorCode || "");
        alert("کد سفیر کپی شد 💛");
      }}
      className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-[#d4af37] to-[#b98522] px-4 py-3 text-sm font-black text-white shadow-lg shadow-yellow-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
    >
      <Copy size={18} />
      کپی کد سفیر
    </button>
  </div>
</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {dashboardStats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`group relative overflow-hidden rounded-[1.7rem] p-4 transition-all duration-300 sm:p-5 ${
  item.featured
    ? "border border-[#d4af37] bg-gradient-to-br from-[#fff7dc] via-[#fffaf0] to-[#f6e7b4] shadow-2xl shadow-yellow-500/15 hover:-translate-y-1"
    : "border border-yellow-200 bg-gradient-to-br from-white via-white to-yellow-50 shadow-xl shadow-yellow-900/5 hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-900/10"
}`}
              >
                <div className="pointer-events-none absolute -left-8 -top-8 h-20 w-20 rounded-full bg-[#d4af37]/10 blur-2xl transition group-hover:bg-[#d4af37]/20" />
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-yellow-50 to-yellow-100 text-[#b98522] shadow-md">
  <Icon size={28} />
</div>

                <p className="text-xs font-black uppercase tracking-wide text-stone-500 sm:text-sm">
                  {item.title}
                </p>

                <p className="mt-3 text-2xl font-black tracking-tight text-[#7a5217] sm:text-4xl">
  {item.value}
</p>

                <p className="mt-1 text-[11px] text-stone-400 sm:text-xs">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      

        <div className="grid gap-4 lg:grid-cols-3">
          <DashboardCard title="🎓 آکادمی سفیران ژنینو">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {academy.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-yellow-100 bg-yellow-50/50 px-4 py-3 text-xs font-bold text-[#7a5217] sm:text-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard title="⭐ امتیازات و اخطارها">
            <div className="rounded-2xl bg-gradient-to-l from-[#d4af37] to-[#b98522] p-5 text-center text-white">
              <div className="text-xs opacity-90 sm:text-sm">میانگین امتیاز</div>
              <div className="mt-2 text-3xl font-black sm:text-4xl">
                {ambassador?.score || 0} از ۵
              </div>
              <div className="mt-2 text-xs opacity-90 sm:text-sm">
                وضعیت: {ambassador?.status || "ثبت نشده"}
              </div>
            </div>

            <div className="mt-4 space-y-3 text-xs sm:text-sm">
              <Notice text="🏅 تشویق: جذب ۲۰ مشتری فعال" />
              <Notice text="🏅 تشویق: امتیاز بالای ۴.۵" />
              <Notice text="⚠️ اخطاری ثبت نشده است" />
            </div>
          </DashboardCard>

          <DashboardCard title="👤 پروفایل سفیر">
            <div className="space-y-3 text-xs leading-7 text-stone-600 sm:text-sm">
              <Info label="نام سفیر" value={ambassador?.user?.fullName || "سفیر ژنینو"} />
              <Info label="شهر فعالیت" value={ambassador?.user?.city || "ثبت نشده"} />
              <Info label="وضعیت حساب" value={ambassador?.status || "ثبت نشده"} />
              <Info label="سطح سفیر" value={ambassador?.level || "ثبت نشده"} />
            </div>

            <button className="mt-5 w-full rounded-2xl border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm font-extrabold text-[#7a5217] transition hover:bg-yellow-100">
              ویرایش پروفایل
            </button>
          </DashboardCard>
        </div>

        <DashboardCard title="🏪 مشتریان جذب‌شده و وضعیت اشتراک">
          <div className="grid gap-3 md:hidden">
            {customers.map((customer) => (
              <div
                key={customer.name}
                className="rounded-2xl border border-yellow-100 bg-yellow-50/60 p-4"
              >
                <div className="font-black text-[#7a5217]">{customer.name}</div>
                <div className="mt-1 text-xs text-stone-500">
                  {customer.type}
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <Info label="فروش" value={customer.sales} />
                  <Info label="اشتراک" value={customer.subscription} />
                </div>
              </div>
            ))}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[700px] border-separate border-spacing-y-3 text-right text-sm">
              <thead>
                <tr className="text-stone-500">
                  <th className="px-4">نام مشتری</th>
                  <th className="px-4">نوع</th>
                  <th className="px-4">فروش</th>
                  <th className="px-4">مانده اشتراک</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.name} className="bg-yellow-50/60">
                    <td className="rounded-r-2xl px-4 py-4 font-extrabold text-[#7a5217]">
                      {customer.name}
                    </td>
                    <td className="px-4 py-4">{customer.type}</td>
                    <td className="px-4 py-4">{customer.sales}</td>
                    <td className="rounded-l-2xl px-4 py-4 font-bold text-[#b98522]">
                      {customer.subscription}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>

        <div className="grid gap-4 lg:grid-cols-2">
          <DashboardCard title="💰 صفحه مالی سفیر">
            <div className="space-y-3">
              {financeStats.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-2xl border border-yellow-100 bg-yellow-50/50 px-4 py-4"
                >
                  <span className="text-xs font-bold text-stone-600 sm:text-sm">
                    {item.title}
                  </span>
                  <span className="text-xs font-black text-[#7a5217] sm:text-base">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard title="🏆 جدول سفیران برتر">
            <div className="mb-4 flex gap-2">
              <button className="rounded-xl bg-gradient-to-l from-[#d4af37] to-[#b98522] px-4 py-2 text-xs font-bold text-white sm:text-sm">
                ماه
              </button>
              <button className="rounded-xl border border-yellow-300 bg-white px-4 py-2 text-xs font-bold text-[#7a5217] sm:text-sm">
                سال
              </button>
            </div>

            <div className="space-y-3">
              {leaderboard.map((item) => (
                <div
                  key={item.rank}
                  className="flex items-center justify-between rounded-2xl border border-yellow-100 bg-yellow-50/50 px-4 py-3"
                >
                  <div>
                    <div className="text-sm font-black text-[#7a5217]">
                      رتبه {item.rank} - {item.name}
                    </div>
                    <div className="text-xs text-stone-500">{item.city}</div>
                  </div>

                  <div className="text-xs font-bold text-[#b98522] sm:text-sm">
                    {item.customers} مشتری
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
      </section>
    </main>
  );
}

function DashboardCard({ title, children }) {
  return (
    <section className="rounded-[2rem] border border-yellow-200 bg-white p-4 shadow-xl shadow-yellow-900/5 sm:p-5">
      <h2 className="mb-5 text-base font-black text-[#7a5217] sm:text-xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Notice({ text }) {
  return (
    <div className="rounded-2xl border border-yellow-100 bg-yellow-50/60 px-4 py-3 font-bold text-stone-600">
      {text}
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-yellow-50/50 px-3 py-3">
      <span className="text-stone-500">{label}</span>
      <span className="font-extrabold text-[#7a5217]">{value}</span>
    </div>
  );
}