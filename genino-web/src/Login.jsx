// D:\projects\Genino\genino-web\src\login.jsx
import { useState } from "react";
import logo from "./assets/logo-genino.png";
import { loginUser, getUserProfile } from "./services/api";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (identifier.trim() === "" || password === "") {
      setMessage("لطفاً همه فیلدها را پر کنید ❗");
      return;
    }

    try {
      setMessage("⏳ در حال ورود...");

      // مرحله ۱: ارسال اطلاعات ورود
      const data = await loginUser({ identifier, password });

      if (!data.ok) {
        setMessage(`❌ ${data.message}`);
        return;
      }

      // مرحله ۲: ذخیره دائم اطلاعات (بدون Remember Me)
      localStorage.setItem("genino_token", data.token);

      // مرحله ۳: دریافت پروفایل
      const profile = await getUserProfile();

      if (profile.ok) {
        localStorage.setItem("genino_user", JSON.stringify(profile.user));
        window.dispatchEvent(new Event("genino_user_changed"));

        const stage = profile.user.lifeStage || "parent";
        localStorage.setItem("lifeStage", stage);
      } else {
        localStorage.setItem("lifeStage", "parent");
      }

      setMessage("🌿 ورود موفقیت‌آمیز بود! خوش آمدی به ژنینو");

      // مرحله ۴: هدایت به داشبورد
      setTimeout(() => {
      // ✅ اگر از لینک دعوت آمده، اولویت با next است
        const params = new URLSearchParams(location.search);
        const next = params.get("next");

        if (next) {
        navigate(next, { replace: true });
        return;
      }

      // ✅ در غیر اینصورت مثل قبل برو داشبورد
      const lifeStage = localStorage.getItem("lifeStage");

        if (lifeStage === "single") navigate("/dashboard-single");
        else if (lifeStage === "couple") navigate("/dashboard-couple");
        else if (lifeStage === "pregnancy") navigate("/dashboard-pregnancy");
        else if (lifeStage === "parent") navigate("/dashboard-parent");
        else if (lifeStage === "user") navigate("/dashboard-user");
        else navigate("/signup-user");
      }, 1200);

    } catch (err) {
      console.error("Login error:", err);
      setMessage("❌ خطای سرور یا اینترنت. لطفاً دوباره تلاش کنید.");
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#f7f2eb] text-gray-800 px-4">
      {/* لوگو */}
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
        <label className="block mb-4 text-right">
          <span className="text-sm text-gray-600">
            ایمیل، شماره موبایل یا نام کاربری
          </span>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="ایمیل، موبایل یا نام کاربری"
            className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:border-yellow-500 text-right"
          />
        </label>

        <label className="block mb-5 text-right">
          <span className="text-sm text-gray-600">رمز عبور</span>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
              className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:border-yellow-500 text-right pl-10"
            />

            {/* نمایش / مخفی */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-3 cursor-pointer text-gray-500 text-xl select-none"
              title={showPassword ? "مخفی کردن رمز" : "نمایش رمز"}
            >
              {showPassword ? "●" : "○"}
            </span>
          </div>
        </label>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded-xl hover:bg-yellow-600 transition-all shadow-sm"
        >
          ورود
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          حساب کاربری ندارید؟{" "}
          <Link to="/signup-user" className="text-yellow-600 hover:underline">
            ثبت‌نام کنید
          </Link>
        </p>
      </form>

      {message && (
        <p
          className={`mt-6 text-center text-sm font-medium ${
            message.includes("موفق")
              ? "text-green-600 bg-green-50 border border-green-200 py-2 px-4 rounded-xl"
              : "text-red-500 bg-red-50 border border-red-200 py-2 px-4 rounded-xl"
          }`}
        >
          {message}
        </p>
      )}
      <div className="text-left mt-2">
  <button
    type="button"
    disabled
    className="text-xs text-gray-400 cursor-not-allowed"
    title="این قابلیت به‌زودی فعال می‌شود"
  >
    رمز عبور را فراموش کرده‌اید؟
  </button>
</div>

    </main>
  );
}
