// D:\projects\Genino\genino-web\src\login.jsx
import { useState } from "react";
import logo from "./assets/logo-genino.png";
import { loginUser, getUserProfile, loginVendor } from "./services/api";
import { Link, useNavigate, useLocation } from "react-router-dom";


export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState("user");

  async function handleSubmit(e) {
    e.preventDefault();

    if (identifier.trim() === "" || password === "") {
      setMessage("لطفاً همه فیلدها را پر کنید ❗");
      return;
    }

    try {
      setMessage("⏳ در حال ورود...");

      if (loginType === "vendor") {
  const data = await loginVendor({
    identifier,
    password,
  });

  if (!data.ok) {
    setMessage(`❌ ${data.message}`);
    return;
  }

  localStorage.setItem("genino_token", data.token);
  window.dispatchEvent(new Event("genino_token_changed"));

  localStorage.setItem(
  "genino_vendor_id",
  String(data.vendor.id)
);

  window.dispatchEvent(new Event("genino_vendor_changed"));

  setMessage("🌿 ورود فروشنده با موفقیت انجام شد");

  setTimeout(() => {
    navigate(`/dashboard-vendor?vendorId=${data.vendor.id}`);
  }, 1200);

  return;
}

      const data = await loginUser({ identifier, password });

      if (!data.ok) {
        setMessage(`❌ ${data.message}`);
        return;
      }

      localStorage.setItem("genino_token", data.token);
      window.dispatchEvent(new Event("genino_token_changed"));

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

      setTimeout(() => {
        const params = new URLSearchParams(location.search);
        const next = params.get("next");

        if (next) {
          navigate(next, { replace: true });
          return;
        }

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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f2eb] px-4 py-10 text-gray-800">
      <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-yellow-200/40 blur-3xl" />
      <div className="absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-[#d4af37]/25 blur-3xl" />

      <section className="relative w-full max-w-md">
        <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-2xl shadow-yellow-900/10 backdrop-blur-xl sm:p-8">
          <div className="mb-7 flex flex-col items-center text-center">
            <div className="mb-5 rounded-[1.5rem] bg-gradient-to-br from-[#f5d86f] via-[#d4af37] to-[#b98522] p-[2px] shadow-xl shadow-yellow-900/20">
  <div className="rounded-[1.4rem] bg-white p-4">
    <img
      src={logo}
      alt="Genino Logo"
      className="h-24 w-24 object-contain"
    />
  </div>
</div>

            <h1 className="text-3xl font-black tracking-tight text-[#7a5217]">
              ورود به ژنینو
            </h1>

            <p className="mt-2 text-sm font-medium text-stone-500">
              خوش آمدی به دنیای هوشمند کودک و خانواده 🌱
            </p>
            <div className="mt-5 grid w-full grid-cols-2 rounded-2xl border border-yellow-200 bg-yellow-50/50 p-1">
  <button
    type="button"
    onClick={() => setLoginType("user")}
    className={`rounded-xl px-3 py-2 text-xs font-black transition ${
      loginType === "user"
        ? "bg-white text-[#7a5217] shadow-sm"
        : "text-stone-500"
    }`}
  >
    ورود کاربر ژنینو
  </button>

  <button
    type="button"
    onClick={() => setLoginType("vendor")}
    className={`rounded-xl px-3 py-2 text-xs font-black transition ${
      loginType === "vendor"
        ? "bg-white text-[#7a5217] shadow-sm"
        : "text-stone-500"
    }`}
  >
    ورود فروشنده
  </button>
</div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block text-right">
              <span className="mb-2 block text-sm font-bold text-stone-600">
                ایمیل، شماره موبایل یا نام کاربری
              </span>

              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="مثلاً 0912... یا user"
                className="w-full rounded-2xl border border-yellow-200 bg-yellow-50/40 px-4 py-3 text-right text-sm outline-none transition-all placeholder:text-stone-400 focus:border-[#d4af37] focus:bg-white focus:ring-4 focus:ring-yellow-200/50"
              />
            </label>

            <label className="block text-right">
              <span className="mb-2 block text-sm font-bold text-stone-600">
                رمز عبور
              </span>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="رمز عبور خود را وارد کنید"
                  className="w-full rounded-2xl border border-yellow-200 bg-yellow-50/40 px-4 py-3 pl-12 text-right text-sm outline-none transition-all placeholder:text-stone-400 focus:border-[#d4af37] focus:bg-white focus:ring-4 focus:ring-yellow-200/50"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-sm font-bold text-[#7a5217] shadow-sm transition hover:bg-yellow-100"
                  title={showPassword ? "مخفی کردن رمز" : "نمایش رمز"}
                >
                  {showPassword ? "●" : "○"}
                </button>
              </div>
            </label>

            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-l from-[#d4af37] to-[#b98522] px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-yellow-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
            >
             {loginType === "vendor" ? "ورود به پنل فروشندگان" : "ورود به حساب کاربری"} 
            </button>
          </form>

          <div className="mt-5 flex items-center justify-between gap-3 text-xs">
            <button
              type="button"
              disabled
              className="cursor-not-allowed text-stone-400"
              title="این قابلیت به‌زودی فعال می‌شود"
            >
              رمز عبور را فراموش کرده‌اید؟
            </button>

            <p className="text-stone-500">
              حساب ندارید؟{" "}
              <Link
                to="/signup"
                className="font-extrabold text-[#b98522] transition hover:text-[#7a5217]"
              >
                ثبت‌نام کنید
              </Link>
            </p>
            </div>


          </div>
          <div className="mt-4 flex items-center justify-between gap-2">
 
</div>
        

        {message && (
          <p
            className={`mt-5 rounded-2xl border px-4 py-3 text-center text-sm font-bold shadow-sm ${
              message.includes("موفق")
                ? "border-green-200 bg-green-50 text-green-700"
                : message.includes("در حال ورود")
                ? "border-yellow-200 bg-yellow-50 text-[#7a5217]"
                : "border-red-200 bg-red-50 text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </section>
    </main>
  );
}