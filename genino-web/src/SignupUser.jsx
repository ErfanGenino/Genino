import { useState } from "react";
import logo from "./assets/logo-genino.png";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useNavigate } from "react-router-dom";


// 🌍 فهرست استان‌ها و شهرها
const iranProvinces = {
  "خارج از ایران": ["خارج از ایران"],
  "آذربایجان شرقی": ["تبریز", "مراغه", "مرند", "اهر", "شبستر"],
  "آذربایجان غربی": ["ارومیه", "خوی", "بوکان", "مهاباد", "سلماس"],
  "اردبیل": ["اردبیل", "پارس‌آباد", "مشگین‌شهر", "خلخال"],
  "اصفهان": ["اصفهان", "کاشان", "نجف‌آباد", "فلاورجان", "خمینی‌شهر"],
  "البرز": ["کرج", "نظرآباد", "فردیس", "ماهدشت"],
  "ایلام": ["ایلام", "دهلران", "مهران", "آبدانان"],
  "بوشهر": ["بوشهر", "برازجان", "کنگان", "گناوه"],
  "تهران": ["تهران", "اسلامشهر", "قدس", "ورامین", "ملارد", "ری"],
  "چهارمحال و بختیاری": ["شهرکرد", "فارسان", "بروجن", "لردگان"],
  "خراسان رضوی": ["مشهد", "نیشابور", "سبزوار", "تربت‌حیدریه"],
  "خراسان شمالی": ["بجنورد", "شیروان", "آشخانه"],
  "خراسان جنوبی": ["بیرجند", "قائن", "نهبندان"],
  "خوزستان": ["اهواز", "دزفول", "آبادان", "ماهشهر", "خرمشهر"],
  "زنجان": ["زنجان", "ابهر", "خدابنده", "طارم"],
  "سمنان": ["سمنان", "شاهرود", "دامغان", "گرمسار"],
  "سیستان و بلوچستان": ["زاهدان", "چابهار", "ایرانشهر", "سراوان"],
  "فارس": ["شیراز", "کازرون", "مرودشت", "لار", "جهرم"],
  "قزوین": ["قزوین", "تاکستان", "بوئین‌زهرا"],
  "قم": ["قم"],
  "کردستان": ["سنندج", "سقز", "بانه", "مریوان"],
  "کرمان": ["کرمان", "رفسنجان", "جیرفت", "بم"],
  "کرمانشاه": ["کرمانشاه", "اسلام‌آباد غرب", "پاوه", "سنقر"],
  "کهگیلویه و بویراحمد": ["یاسوج", "دهدشت", "گچساران"],
  "گلستان": ["گرگان", "گنبدکاووس", "علی‌آباد", "آزادشهر"],
  "گیلان": ["رشت", "انزلی", "لاهیجان", "آستانه اشرفیه"],
  "لرستان": ["خرم‌آباد", "بروجرد", "دورود", "الیگودرز"],
  "مازندران": ["ساری", "آمل", "بابل", "نوشهر", "بابلسر"],
  "مرکزی": ["اراک", "ساوه", "خمین", "محلات"],
  "هرمزگان": ["بندرعباس", "میناب", "قشم", "بستک"],
  "همدان": ["همدان", "ملایر", "نهاوند", "تویسرکان"],
  "یزد": ["یزد", "میبد", "اردکان", "ابرکوه"],
};

export default function SignupUser() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    province: "",
    city: "",
    phone: "",
    email: "",
    username: "",
    nationalCode: "", 
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [message, setMessage] = useState("");
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showLifeStage, setShowLifeStage] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
    const navigate = useNavigate();

  // ✳️ تغییرات فرم + اعتبارسنجی لحظه‌ای
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const next = { ...formData, [name]: type === "checkbox" ? checked : value };
    if (name === "province") next.city = ""; // ریست شهر هنگام تغییر استان
    setFormData(next);

    const msg = validateField(name, type === "checkbox" ? checked : value, next);
    setErrors((prev) => ({ ...prev, [name]: msg }));
    setTouched((prev) => ({ ...prev, [name]: true }));

    // چک مجدد تکرار رمز هنگام تغییر رمز
    if (name === "password" && touched.confirmPassword) {
      const cpMsg = validateField("confirmPassword", next.confirmPassword, next);
      setErrors((p) => ({ ...p, confirmPassword: cpMsg }));
    }
  }

  // ✳️ وقتی فیلد از فوکوس خارج میشه
  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const msg = validateField(name, formData[name], formData);
    setErrors((prev) => ({ ...prev, [name]: msg }));
  }
function handleSubmit(e) {
  e.preventDefault();

  const fields = [
    "firstName", "lastName", "gender", "birthDate",
    "province", "city", "phone", "email", "username",
    "password", "confirmPassword", "terms"
  ];

  let newErrors = {};
  let touchedAll = {};
  let hasError = false;

  // اجرای اعتبارسنجی تمام فیلدها
  fields.forEach((f) => {
    const msg = validateField(f, formData[f], formData);
    newErrors[f] = msg;
    touchedAll[f] = true;
    if (msg && msg.trim() !== "") hasError = true;
  });

  // به‌روزرسانی State
  setErrors(newErrors);
  setTouched(touchedAll);

  // توقف موقت برای اطمینان از نمایش پیام‌ها
  setTimeout(() => {
  if (hasError) {
    setMessage("⚠️ لطفاً خطاهای مشخص‌شده را برطرف کنید.");
  } else {
    setMessage(`🎉 خوش آمدی ${formData.firstName} 🌿 ثبت‌نام شما با موفقیت انجام شد!`);
    setShowTypeModal(true); // ✳️ نمایش پاپ‌آپ انتخاب نوع کاربر
  }
}, 50);


}

  // ✅ تابع اعتبارسنجی فیلدها
  function validateField(name, value, data) {
    const d = data || formData;
const v = typeof value === "string" ? value.trim() : value;


    switch (name) {
      case "firstName":
        if (!v) return "نام الزامی است";
        return "";
      case "lastName":
        if (!v) return "نام خانوادگی الزامی است";
        return "";
      case "gender":
        if (!v) return "لطفاً جنسیت را انتخاب کنید";
        return "";
      case "birthDate":
        if (!v) return "تاریخ تولد الزامی است";
        return "";
      case "province":
        if (!v) return "استان محل سکونت را انتخاب کنید";
        return "";
      case "city":
        if (!d.province) return "ابتدا استان را انتخاب کنید";
        if (!v) return "شهر محل سکونت را انتخاب کنید";
        return "";
      case "phone":
        if (!/^(09\d{9})$/.test(v)) return "شماره موبایل باید با 09 شروع شود و ۱۱ رقم باشد";
        return "";
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "فرمت ایمیل معتبر نیست";
        return "";
      case "username":
        if (!/^[a-zA-Z0-9._-]{4,}$/.test(v)) return "نام کاربری حداقل ۴ کاراکتر باشد";
        return "";
      case "password":
        if (v.length < 6) return "رمز عبور باید حداقل ۶ کاراکتر باشد";
        return "";
      case "confirmPassword":
        if (v !== d.password) return "تکرار رمز باید با رمز یکسان باشد";
        return "";
      case "terms":
        if (!d.terms) return "پذیرش قوانین برای ادامه الزامی است";
        return "";
      default:
        return "";
        case "nationalCode":
  if (!v) return "کد ملی الزامی است";
  if (!/^\d{10}$/.test(v)) return "کد ملی باید ۱۰ رقم باشد";

  // جلوگیری از کدهای اشتباه مثل 0000000000
  if ([
    "0000000000",
    "1111111111",
    "2222222222",
    "3333333333",
    "4444444444",
    "5555555555",
    "6666666666",
    "7777777777",
    "8888888888",
    "9999999999",
  ].includes(v)) {
    return "کد ملی معتبر نیست";
  }

  // الگوریتم رسمی ثبت احوال
  const check = parseInt(v[9]);
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(v[i]) * (10 - i);
  }
  const remainder = sum % 11;

  if (!((remainder < 2 && check === remainder) || (remainder >= 2 && check === (11 - remainder)))) {
    return "کد ملی معتبر نیست";
  }

  return "";
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#f7f2eb] text-gray-800 px-4 py-8">
      {/* لوگو */}
      <div className="flex flex-col items-center mb-8">
        <img src={logo} alt="Genino Logo" className="w-24 h-24 mb-4 drop-shadow-lg" />
        <h1 className="text-3xl font-bold text-yellow-600 tracking-tight">ثبت‌نام کاربر ژنینو 👨‍👩‍👧</h1>
      </div>

      {/* فرم ثبت‌نام */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md border border-yellow-100"
      >
        {/* نام و نام خانوادگی */}
        <div className="grid grid-cols-2 gap-4">
          <label className="block text-right">
            <span className="text-sm text-gray-600">نام خانوادگی</span>
            {touched.lastName && errors.lastName && (
              <p className="text-xs text-red-600 mt-1 mb-1">{errors.lastName}</p>
            )}
            <input
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full border p-2 rounded-lg mt-1 text-right ${
                touched.lastName && errors.lastName
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-300 focus:border-yellow-500"
              }`}
            />
          </label>

          <label className="block text-right">
            <span className="text-sm text-gray-600">نام</span>
            {touched.firstName && errors.firstName && (
              <p className="text-xs text-red-600 mt-1 mb-1">{errors.firstName}</p>
            )}
            <input
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full border p-2 rounded-lg mt-1 text-right ${
                touched.firstName && errors.firstName
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-300 focus:border-yellow-500"
              }`}
            />
          </label>
        </div>

        {/* سایر فیلدها */}
        {/* جنسیت */}
        <label className="block text-right mt-4">
          <span className="text-sm text-gray-600">جنسیت</span>
          {touched.gender && errors.gender && (
            <p className="text-xs text-red-600 mt-1 mb-1">{errors.gender}</p>
          )}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:border-yellow-500 text-right"
          >
            <option value="">انتخاب کنید</option>
            <option value="female">زن</option>
            <option value="male">مرد</option>
          </select>
        </label>

        {/* تاریخ تولد */}
        <label className="block text-right mt-4">
          <span className="text-sm text-gray-600">تاریخ تولد</span>
          {touched.birthDate && errors.birthDate && (
            <p className="text-xs text-red-600 mt-1 mb-1">{errors.birthDate}</p>
          )}
          <DatePicker
  value={formData.birthDate || ""}
  calendar={persian}
  locale={persian_fa}
  onChange={(date) => {
    const formatted = date?.format?.("YYYY/MM/DD") || "";
    setFormData({ ...formData, birthDate: formatted });
    const msg = validateField("birthDate", formatted, { ...formData, birthDate: formatted });
    setErrors((prev) => ({ ...prev, birthDate: msg }));
    setTouched((prev) => ({ ...prev, birthDate: true }));
  }}
  inputClass="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:border-yellow-500 text-right"
/>
        </label>

        {/* استان و شهر */}
        <label className="block text-right mt-4">
          <span className="text-sm text-gray-600">استان محل سکونت</span>
          {touched.province && errors.province && (
            <p className="text-xs text-red-600 mt-1 mb-1">{errors.province}</p>
          )}
          <select
            name="province"
            value={formData.province || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:border-yellow-500 text-right"
          >
            <option value="">انتخاب کنید</option>
            {Object.keys(iranProvinces).map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-right mt-4">
          <span className="text-sm text-gray-600">شهر محل سکونت</span>
          {touched.city && errors.city && (
            <p className="text-xs text-red-600 mt-1 mb-1">{errors.city}</p>
          )}
          <select
            name="city"
            value={formData.city || ""}
            onChange={handleChange}
            disabled={!formData.province}
            className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:border-yellow-500 text-right disabled:bg-gray-100"
          >
            <option value="">
              {formData.province ? "انتخاب کنید" : "ابتدا استان را انتخاب کنید"}
            </option>
            {formData.province &&
              iranProvinces[formData.province].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
        </label>

        {/* موبایل */}
        <label className="block mt-4">
          <span className="text-sm text-gray-600">شماره موبایل</span>
          {touched.phone && errors.phone && (
            <p className="text-xs text-red-600 mt-1 mb-1">{errors.phone}</p>
          )}
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="0912..."
            className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:border-yellow-500"
          />
        </label>

        {/* ایمیل */}
        <label className="block mt-4">
          <span className="text-sm text-gray-600">ایمیل</span>
          {touched.email && errors.email && (
            <p className="text-xs text-red-600 mt-1 mb-1">{errors.email}</p>
          )}
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="example@mail.com"
            className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:border-yellow-500"
          />
        </label>

        {/* نام کاربری */}
        <label className="block mt-4">
          <span className="text-sm text-gray-600">نام کاربری</span>
          {touched.username && errors.username && (
            <p className="text-xs text-red-600 mt-1 mb-1">{errors.username}</p>
          )}
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="مثلاً hana_parent"
            className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:border-yellow-500"
          />
        </label>

        {/* کد ملی */}
        <label className="block mt-4">
          <span className="text-sm text-gray-600">کد ملی</span>
          {touched.nationalCode && errors.nationalCode && (
            <p className="text-xs text-red-600 mt-1 mb-1">{errors.nationalCode}</p>
          )}
          <input
            name="nationalCode"
            type="text"
            value={formData.nationalCode}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="مثلاً 1234567890"
            maxLength={10}
            className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:border-yellow-500"
          />
        </label>


        {/* رمز عبور */}
        <label className="block mt-4">
          <span className="text-sm text-gray-600">رمز عبور</span>
          {touched.password && errors.password && (
            <p className="text-xs text-red-600 mt-1 mb-1">{errors.password}</p>
          )}
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="******"
            className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:border-yellow-500"
          />
        </label>

        {/* تکرار رمز عبور */}
        <label className="block mt-4 mb-5">
          <span className="text-sm text-gray-600">تکرار رمز عبور</span>
          {touched.confirmPassword && errors.confirmPassword && (
            <p className="text-xs text-red-600 mt-1 mb-1">{errors.confirmPassword}</p>
          )}
          <input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="******"
            className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:border-yellow-500"
          />
        </label>

        {/* شرایط و قوانین */}
        <label className="flex items-center gap-2 mt-4 text-sm">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-4 h-4 accent-yellow-500"
          />
          <span className="text-gray-700">
           شرایط و قوانین{" "}
           <a
           href="/terms"
           target="_blank"
           rel="noopener noreferrer"
           className="text-yellow-600 underline hover:text-yellow-700">
           ژنینو
           </a>{" "}
           را می‌پذیرم
           </span>
        </label>
        {touched.terms && errors.terms && (
          <p className="text-xs text-red-600 mt-1 mb-1 text-right">{errors.terms}</p>
        )}

        {/* دکمه ثبت‌نام */}
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600 transition-all shadow-sm mt-8"
        >
          ثبت‌نام
        </button>
      </form>

{message && (
  <p
    className={`mt-6 text-center text-sm font-medium ${
      message.includes("🌿")
        ? "text-green-600 bg-green-50 border border-green-200 py-2 px-4 rounded-xl"
        : "text-red-500 bg-red-50 border border-red-200 py-2 px-4 rounded-xl"
    }`}
  >
    {message}
  </p>
)}


{/* 🌿 پاپ‌آپ انتخاب نوع کاربر */}
{showTypeModal && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-gradient-to-b from-[#fffef9] to-[#f7f3eb] rounded-3xl shadow-2xl p-7 w-[90%] max-w-md text-center border border-yellow-100 animate-fadeIn">
      <img
        src={logo}
        alt="Genino Logo"
        className="w-16 h-16 mx-auto mb-4 drop-shadow-md"
      />
      <h2 className="text-2xl font-bold text-yellow-600 mb-2">
        خوش اومدی به ژنینو 🌿
      </h2>
      <p className="text-gray-600 text-sm mb-6 leading-relaxed">
        حالا انتخاب کن که چطور می‌خوای مسیرت رو در ژنینو شروع کنی
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* کاربر عادی */}
        <button
          onClick={() => navigate("/dashboard-user")}
          className="bg-white border-2 border-yellow-400 rounded-2xl py-4 hover:shadow-xl transition-all text-yellow-700 font-semibold hover:scale-105"
        >
          👤 کاربر عادی
          <p className="text-xs text-gray-500 mt-1 font-normal">
            فقط استفاده از محتوای عمومی
          </p>
        </button>

        {/* کاربر ژنینویی */}
        <button
  onClick={() => {
    setShowTypeModal(false);
    setShowLifeStage(true);
  }}
  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-white py-2.5 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all"
>
  🌿 کاربر ژنینویی
</button>
      </div>

      <button
        onClick={() => setShowTypeModal(false)}
        className="text-xs text-gray-400 hover:text-gray-500 transition"
      >
        بستن
      </button>
    </div>
  </div>
)}


{/* 🌼 پاپ‌آپ انتخاب مرحله‌ی زندگی کاربر ژنینویی */}
{/* 🌼 پاپ‌آپ انتخاب مرحله‌ی زندگی کاربر ژنینویی */}
{showLifeStage && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-gradient-to-b from-[#fffef9] to-[#f7f3eb] rounded-3xl shadow-2xl p-7 w-[90%] max-w-md text-center border border-yellow-100 animate-fadeIn">
      <img
        src={logo}
        alt="Genino Logo"
        className="w-16 h-16 mx-auto mb-3 drop-shadow-md"
      />
      <h2 className="text-2xl font-bold text-yellow-600 mb-2">
        مسیر ژنینویی تو از کجاست؟ 🌿
      </h2>
      <p className="text-gray-600 text-sm mb-6 leading-relaxed">
        لطفاً مرحله‌ی فعلی زندگی‌ت رو انتخاب کن تا محتوای ژنینو بر اساس اون تنظیم بشه 💛
      </p>

      <div
        dir="rtl"
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-right"
      >
        {/* مجرد */}
        <button
          onClick={() => navigate("/dashboard-single")}
          className="bg-white border-2 border-yellow-400 rounded-2xl py-4 px-3 hover:shadow-lg transition-all text-yellow-700 hover:scale-105"
        >
          💍 <span className="font-semibold">مجردم و قصد ازدواج دارم</span>
          <p className="text-xs text-gray-500 mt-1 font-normal">
            آمادگی برای زندگی مشترک
          </p>
        </button>

        {/* متأهل بدون فرزند */}
        <button
          onClick={() => navigate("/dashboard-couple")}
          className="bg-white border-2 border-yellow-400 rounded-2xl py-4 px-3 hover:shadow-lg transition-all text-yellow-700 hover:scale-105"
        >
          💑 <span className="font-semibold">متأهلم و فرزند ندارم</span>
          <p className="text-xs text-gray-500 mt-1 font-normal">
            تحکیم رابطه و آمادگی فرزندآوری
          </p>
        </button>

        {/* در آستانه فرزند */}
        <button
          onClick={() => navigate("/dashboard-pregnancy")}
          className="bg-white border-2 border-yellow-400 rounded-2xl py-4 px-3 hover:shadow-lg transition-all text-yellow-700 hover:scale-105"
        >
          👶 <span className="font-semibold">در آستانه فرزندآوری</span>
          <p className="text-xs text-gray-500 mt-1 font-normal">
            مراقبت بارداری و آماده‌سازی والدگری
          </p>
        </button>

        {/* والد دارای فرزند */}
        <button
          onClick={() => navigate("/dashboard-parent")}
          className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white rounded-2xl py-4 px-3 hover:shadow-xl transition-all font-semibold hover:scale-105"
        >
          🧒 <span>فرزند دارم</span>
          <p className="text-xs mt-1 font-normal opacity-80">
            ساخت پروفایل کودک و مسیر رشد
          </p>
        </button>
      </div>

      <button
        onClick={() => setShowLifeStage(false)}
        className="text-xs text-gray-400 hover:text-gray-500 transition"
      >
        بستن
      </button>
    </div>
  </div>
)}

    </main>
  );
}
