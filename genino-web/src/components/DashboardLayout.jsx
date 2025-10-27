import { Link } from "react-router-dom";
import logo from "../assets/logo-genino.png";
import ReminderBar from "../components/ReminderBar"; // ✅ اضافه شد

export default function DashboardLayout({ title, children }) {
  return (
    <main className="min-h-screen bg-[#f7f2eb] text-gray-800 flex flex-col">
      {/* 🔹 نوار بالا */}
      <header className="bg-white border-b border-yellow-100 shadow-sm flex items-center justify-between px-6 py-3 sticky top-0 z-20">
        {/* لوگو */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Genino Logo"
            className="w-10 h-10 drop-shadow-md"
          />
          <h1 className="font-bold text-yellow-600 text-lg tracking-tight">
            ژنینو
          </h1>
        </div>

        {/* عنوان صفحه */}
        <h2 className="text-sm md:text-base font-medium text-yellow-700">
          {title}
        </h2>

        {/* لینک بازگشت به خانه */}
        <Link
          to="/"
          className="text-xs md:text-sm text-gray-500 hover:text-yellow-600 transition"
        >
          🏠 خانه
        </Link>
      </header>

      {/* 🔸 بخش محتوای اصلی */}
      <section className="flex-1 p-6 md:p-10">
        {/* ✅ نوار یادآوری */}
        <div className="mb-6">
          <ReminderBar />
        </div>

        {/* 🔶 محتوای داشبورد */}
        <div className="bg-white rounded-3xl shadow-lg border border-yellow-100 p-6 md:p-8 min-h-[70vh] transition-all duration-300 hover:shadow-xl">
          {children}
        </div>
      </section>

      {/* 🔻 نوار پایین */}
      <footer className="text-center py-4 text-xs text-gray-400 border-t border-yellow-100">
        © {new Date().getFullYear()} ژنینو | هر کودک، یک دنیا نوآوری 🌿
      </footer>
    </main>
  );
}
