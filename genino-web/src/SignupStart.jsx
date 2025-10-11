import { Link } from "react-router-dom";
import logo from "./assets/logo-genino.png";

export default function SignupStart() {
  return (
    <main className="h-screen flex flex-col items-center justify-center bg-[#f7f2eb] text-gray-800 px-4">
      {/* لوگو و عنوان */}
      <div className="flex flex-col items-center mb-10">
        <img src={logo} alt="Genino Logo" className="w-28 h-28 mb-4" />
        <h1 className="text-3xl font-bold text-yellow-600 mb-2">
          ثبت‌نام در ژنینو 🌿
        </h1>
        <p className="text-gray-500 text-sm text-center">
          لطفاً نوع ثبت‌نام خود را انتخاب کنید
        </p>
      </div>

      {/* گزینه‌های ثبت‌نام */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Link
          to="/signup-user"
          className="text-center bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600 transition shadow-md"
        >
          ثبت‌نام به عنوان کاربر ژنینو 👨‍👩‍👧
        </Link>

        <Link
          to="/signup-vendor"
          className="text-center bg-white text-yellow-600 border border-yellow-400 py-3 rounded-xl hover:bg-yellow-50 transition shadow-sm"
        >
          ثبت‌نام به عنوان ارائه‌دهنده کالا یا خدمت 🛍️
        </Link>
      </div>
    </main>
  );
}
