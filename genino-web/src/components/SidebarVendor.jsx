import { Link } from "react-router-dom";

export default function SidebarVendor() {
  return (
    <aside className="w-60 bg-white border-l border-yellow-100 shadow-md p-5 h-screen fixed right-0 top-0">
      <h2 className="text-yellow-600 font-bold text-xl mb-6 text-center">
        پنل فروشنده ژنینو 🛍️
      </h2>
      <nav className="flex flex-col gap-4 text-right">
        <Link to="/dashboard-vendor" className="hover:text-yellow-600">
          🏠 صفحه اصلی
        </Link>
        <Link to="/dashboard-vendor/products" className="hover:text-yellow-600">
          📦 محصولات من
        </Link>
        <Link to="/dashboard-vendor/orders" className="hover:text-yellow-600">
          📑 سفارش‌ها
        </Link>
        <Link to="/dashboard-vendor/stats" className="hover:text-yellow-600">
          📊 گزارش فروش
        </Link>
        <Link to="/dashboard-vendor/settings" className="hover:text-yellow-600">
          ⚙️ تنظیمات
        </Link>
      </nav>
    </aside>
  );
}
