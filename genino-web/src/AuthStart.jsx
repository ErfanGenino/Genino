import { Link } from "react-router-dom";
import logo from "./assets/logo-genino.png";

export default function AuthStart() {
  return (
    <main className="h-screen flex flex-col items-center justify-center bg-[#f7f2eb] text-gray-800 px-4">
      {/* لوگو و عنوان */}
      <div className="flex flex-col items-center mb-10">
        <img src={logo} alt="Genino Logo" className="w-28 h-28 mb-4" />
        <h1 className="text-4xl font-bold text-yellow-600">ژنینو 🌿</h1>
        <p className="text-gray-500 mt-2 text-sm">دستیار هوشمند والدین</p>
      </div>

      {/* دکمه‌ها */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Link
          to="/login"
          className="text-center bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600 transition shadow-md"
        >
          ورود به حساب
        </Link>

        <Link
          to="/signup"
          className="text-center bg-white text-yellow-600 border border-yellow-400 py-3 rounded-xl hover:bg-yellow-50 transition shadow-sm"
        >
          ثبت‌نام
        </Link>
      </div>
    </main>
  );
}
