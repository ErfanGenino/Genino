import { useState } from "react";
import logo from "./assets/logo-genino.png";

// 🌍 فهرست کامل استان‌ها و شهرهای ایران + گزینه خارج از ایران
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
    city: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // بررسی اولیه
    for (let key in formData) {
      if (!formData[key]) {
        setMessage("لطفاً همه فیلدها را پر کنید ❗");
        return;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("رمز عبور و تکرار آن یکسان نیست ❌");
      return;
    }

    setMessage(`🎉 خوش آمدی ${formData.firstName} 🌿 ثبت‌نام شما با موفقیت انجام شد!`);
    // در آینده: ارسال داده به سرور
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#f7f2eb] text-gray-800 px-4 py-8">
      {/* لوگو و عنوان */}
      <div className="flex flex-col items-center mb-8">
        <img src={logo} alt="Genino Logo" className="w-24 h-24 mb-4 drop-shadow-lg" />
        <h1 className="text-3xl font-bold text-yellow-600 tracking-tight">ثبت‌نام کاربر ژنینو 👨‍👩‍👧</h1>
      </div>

      {/* فرم ثبت‌نام */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md border border-yellow-100"
      >
        <div className="grid grid-cols-2 gap-4">
          <label className="block text-right">
            <span className="text-sm text-gray-600">نام</span>
            <input
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:border-yellow-500 text-right"
            />
          </label>

          <label className="block text-right">
            <span className="text-sm text-gray-600">نام خانوادگی</span>
            <input
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:border-yellow-500 text-right"
            />
          </label>
        </div>

        <label className="block text-right mt-4">
          <span className="text-sm text-gray-600">جنسیت</span>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:border-yellow-500 text-right"
          >
            <option value="">انتخاب کنید</option>
            <option value="female">زن</option>
            <option value="male">مرد</option>
          </select>
        </label>

        <label className="block text-right mt-4">
          <span className="text-sm text-gray-600">تاریخ تولد</span>
          <input
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:border-yellow-500 text-right"
          />
        </label>

        {/* انتخاب استان */}
<label className="block text-right mt-4">
  <span className="text-sm text-gray-600">استان محل سکونت</span>
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

{/* انتخاب شهر */}
<label className="block text-right mt-4">
  <span className="text-sm text-gray-600">شهر محل سکونت</span>
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



        <label className="block mt-4">
          <span className="text-sm text-gray-600">شماره موبایل</span>
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0912..."
            className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:border-yellow-500"
          />
        </label>

        <label className="block mt-4">
          <span className="text-sm text-gray-600">ایمیل</span>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@mail.com"
            className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:border-yellow-500"
          />
        </label>

        <label className="block mt-4">
          <span className="text-sm text-gray-600">نام کاربری</span>
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="مثلاً hana_parent"
            className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:border-yellow-500"
          />
        </label>

        <label className="block mt-4">
          <span className="text-sm text-gray-600">رمز ورود</span>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="******"
            className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:border-yellow-500"
          />
        </label>

        <label className="block mt-4 mb-5">
          <span className="text-sm text-gray-600">تکرار رمز ورود</span>
          <input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="******"
            className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:border-yellow-500"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600 transition-all shadow-sm"
        >
          ثبت‌نام
        </button>
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
