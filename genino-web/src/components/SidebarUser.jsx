import { Link } from "react-router-dom";

export default function SidebarUser() {
  return (
    <aside className="w-60 bg-white border-l border-yellow-100 shadow-md p-5 h-screen fixed right-0 top-0">
      <h2 className="text-yellow-600 font-bold text-xl mb-6 text-center">
        ژنینو 👨‍👩‍👧
      </h2>
      <nav className="flex flex-col gap-4 text-right">
        <Link to="/dashboard-user" className="hover:text-yellow-600">
          🏠 خانه
        </Link>
        <Link to="/dashboard-user/children" className="hover:text-yellow-600">
          👶 رشد کودک
        </Link>
        <Link to="/dashboard-user/market" className="hover:text-yellow-600">
          🛍️ خرید و هدایا
        </Link>
        <Link to="/dashboard-user/settings" className="hover:text-yellow-600">
          ⚙️ تنظیمات
        </Link>
      </nav>
    </aside>
  );
}
