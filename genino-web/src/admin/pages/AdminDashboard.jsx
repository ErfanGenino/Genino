import { Link, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  const cards = [
    {
      title: "مدیریت کارمندان و دسترسی‌ها",
      desc: "معرفی کارمند، تعیین نقش و تنظیم سطح دسترسی",
      path: "/admin/staff",
    },
    {
      title: "کارمند مالی",
      desc: "مدیریت قیمت‌ها، پورسانت‌ها، پرداخت‌ها و تسویه‌ها",
      path: "/admin/finance",
    },
    {
      title: "کارمند پشتیبانی",
      desc: "مشاهده پیام‌های کاربران و پاسخ‌گویی به درخواست‌ها",
      path: "/admin/support",
    },
    {
      title: "کارمند محتوا",
      desc: "مدیریت مقالات، تصاویر، اسلایدرها و محتوای ژنینو",
      path: "/admin/content",
    },
    {
      title: "کارمند فروشندگان",
      desc: "بررسی ثبت‌نام فروشندگان، تأیید، رد یا تعلیق آن‌ها",
      path: "/admin/vendors",
    },
    {
      title: "کارمند سفیران",
      desc: "مدیریت سفیران، امتیازها، اخطارها و پورسانت‌ها",
      path: "/admin/ambassadors",
    },
    {
  title: "کارمند پرستاران کودک",
  desc: "بررسی مدارک پرستاران، تأیید، رد یا تعلیق پروفایل‌ها",
  path: "/admin/nurses",
},
  ];

  return (
    <div className="min-h-screen bg-stone-100 text-right" dir="rtl">
      <header className="bg-white border-b border-stone-200">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-stone-800">
              پنل مدیریت ژنینو
            </h1>
            <p className="text-sm text-stone-500 mt-1">
              خوش آمدید، {adminUser.fullName || "مدیر ژنینو"}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
          >
            خروج
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-stone-800">
            داشبورد مدیریت
          </h2>
          <p className="mt-2 text-stone-500">
            از این بخش می‌توانید قسمت‌های اصلی مدیریت ژنینو را کنترل کنید.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.path}
              to={card.path}
              className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-stone-800 group-hover:text-amber-600">
                {card.title}
              </h3>

              <p className="mt-3 min-h-12 text-sm leading-6 text-stone-500">
                {card.desc}
              </p>

              <div className="mt-5 text-sm font-medium text-amber-600">
                ورود به بخش ←
              </div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}