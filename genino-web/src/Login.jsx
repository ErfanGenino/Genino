import { useState } from "react";
import { Link } from "react-router-dom"; // ✅ اضافه کن
import logo from "./assets/logo-genino.png";

export default function Login() {
  // 🎯 مرحله ۲: stateها برای نگهداری مقدار ایمیل، پسورد و پیام
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (email === "" || password === "") {
      setMessage("لطفاً همه فیلدها را پر کنید ❗");
    } else if (email === "test@mail.com" && password === "1234") {
      setMessage("ورود موفقیت‌آمیز بود 🌿 خوش آمدی!");
    } else {
      setMessage("ایمیل یا رمز عبور اشتباه است ❌");
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#f7f2eb] text-gray-800 px-4">
      {/* لوگو و عنوان */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={logo}
          alt="Genino Logo"
          className="w-24 h-24 mb-4 drop-shadow-lg"
        />
        <h1 className="text-3xl font-bold text-yellow-600 tracking-tight">
          ورود به ژنینو
        </h1>
        <p className="text-gray-500 mt-2">دستیار هوشمند والدین 🌱</p>
      </div>

      {/* فرم ورود */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm border border-yellow-100"
      >
        <label className="block mb-4">
          <span className="text-sm text-gray-600">ایمیل</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.com"
            className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:outline-none focus:border-yellow-500"
          />
        </label>

        <label className="block mb-5">
          <span className="text-sm text-gray-600">رمز عبور</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
            className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:outline-none focus:border-yellow-500"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded-xl hover:bg-yellow-600 transition-all shadow-sm"
        >
          ورود
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
  حساب کاربری ندارید؟{" "}
  <Link to="/signup" className="text-yellow-600 hover:underline">
    ثبت‌نام کنید
  </Link>
</p>
      </form>

      {/* پیام وضعیت */}
      {message && (
        <p
          className={`mt-6 text-center text-sm font-medium ${
            message.includes("موفق") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </main>
  );
}
