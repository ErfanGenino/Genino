import { Link } from "react-router-dom";
import {
  Package,
  BadgePercent,
  HandCoins,
  Award,
  Settings,
} from "lucide-react";

export default function AdminFinance() {
  const cards = [
    {
      title: "بسته‌های همکاری",
      desc: "تعریف بسته‌های فروشندگان کالا و ارائه‌دهندگان خدمات",
      path: "/admin/finance/packages",
      icon: Package,
    },
    {
      title: "کدهای تخفیف",
      desc: "تعریف و مدیریت کدهای تخفیف ژنینو",
      path: "/admin/finance/discount-codes",
      icon: BadgePercent,
    },
    {
      title: "پورسانت سفیران",
      desc: "مدیریت درصد پورسانت اشتراک و فروش سفیران",
      path: "/admin/finance/commissions",
      icon: HandCoins,
    },
    {
      title: "تعرفه دستاوردها",
      desc: "مدیریت قیمت مجوزهای دستاورد برای ارائه‌دهندگان",
      path: "/admin/finance/achievement-pricing",
      icon: Award,
    },
    {
      title: "تنظیمات مالی",
      desc: "تنظیمات کلی مالی، تسویه‌ها و قوانین پرداخت",
      path: "/admin/finance/settings",
      icon: Settings,
    },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-slate-100 p-6 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-800">
            مدیریت مالی و تعرفه‌ها
          </h1>

          <p className="mt-3 text-stone-500">
            مدیریت بسته‌های همکاری، کدهای تخفیف، پورسانت‌ها و تنظیمات مالی ژنینو
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.path}
                to={card.path}
                className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                  <Icon className="h-6 w-6" />
                </div>

                <h2 className="text-lg font-bold text-stone-800 group-hover:text-amber-600">
                  {card.title}
                </h2>

                <p className="mt-3 min-h-12 text-sm leading-6 text-stone-500">
                  {card.desc}
                </p>

                <div className="mt-5 text-sm font-medium text-amber-600">
                  ورود به بخش ←
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}