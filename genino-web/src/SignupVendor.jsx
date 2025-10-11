import { useState } from "react";
import logo from "./assets/logo-genino.png";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useNavigate } from "react-router-dom";

const iranProvinces = {
  "خارج از ایران": ["خارج از ایران"],
  "تهران": ["تهران", "اسلامشهر", "قدس", "ورامین", "ملارد", "ری"],
  "البرز": ["کرج", "نظرآباد", "فردیس"],
  "فارس": ["شیراز", "مرودشت", "لار", "جهرم"],
  "اصفهان": ["اصفهان", "کاشان", "نجف‌آباد"],
  "خراسان رضوی": ["مشهد", "نیشابور", "تربت‌حیدریه"],
  "مازندران": ["ساری", "آمل", "بابل", "نوشهر"],
  "کرمانشاه": ["کرمانشاه", "اسلام‌آباد غرب", "پاوه"],
  "هرمزگان": ["بندرعباس", "قشم", "میناب"],
  "گیلان": ["رشت", "انزلی", "لاهیجان"],
};

export default function SignupVendor() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    activityType: "",
    companyName: "",
    province: "",
    city: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const next = { ...formData, [name]: type === "checkbox" ? checked : value };
    if (name === "province") next.city = "";
    setFormData(next);

    const msg = validateField(name, value, next);
    setErrors((p) => ({ ...p, [name]: msg }));
    setTouched((p) => ({ ...p, [name]: true }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    const msg = validateField(name, formData[name], formData);
    setErrors((p) => ({ ...p, [name]: msg }));
  };

  const validateField = (name, value, data = formData) => {
    const v = typeof value === "string" ? value.trim() : value;
    const d = data;

    switch (name) {
      case "firstName":
        if (!v) return "نام الزامی است";
        return "";
      case "lastName":
        if (!v) return "نام خانوادگی الزامی است";
        return "";
      case "email":
        if (!v) return "ایمیل الزامی است";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "فرمت ایمیل معتبر نیست";
        return "";
      case "phone":
        if (!v) return "شماره موبایل الزامی است";
        if (!/^09\d{9}$/.test(v)) return "شماره موبایل باید با 09 شروع شود و ۱۱ رقم باشد";
        return "";
      case "birthDate":
        if (!v) return "تاریخ تولد الزامی است";
        return "";
      case "activityType":
        if (!v) return "نوع فعالیت را انتخاب کنید";
        return "";
      case "companyName":
        if (!v) return "نام برند یا فروشگاه الزامی است";
        return "";
      case "province":
        if (!v) return "استان محل فعالیت را انتخاب کنید";
        return "";
      case "city":
        if (!d.province) return "ابتدا استان را انتخاب کنید";
        if (!v) return "شهر محل فعالیت را انتخاب کنید";
        return "";
      case "password":
        if (!v) return "رمز عبور الزامی است";
        if (v.length < 6) return "رمز عبور باید حداقل ۶ کاراکتر باشد";
        return "";
      case "confirmPassword":
        if (v !== d.password) return "تکرار رمز باید با رمز یکسان باشد";
        return "";
      case "terms":
        if (!d.terms) return "پذیرش قوانین الزامی است";
        return "";
      default:
        return "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fields = Object.keys(formData);
    let newErrors = {};
    let hasError = false;

    fields.forEach((f) => {
      const msg = validateField(f, formData[f]);
      newErrors[f] = msg;
      if (msg) hasError = true;
    });

    setErrors(newErrors);
    setTouched(
      fields.reduce((a, c) => {
        a[c] = true;
        return a;
      }, {})
    );

    if (hasError) {
      setMessage("⚠️ لطفاً خطاهای مشخص‌شده را برطرف کنید.");
      return;
    }

    setMessage(`🎉 خوش آمدید ${formData.firstName} 🌿 ثبت‌نام شما با موفقیت انجام شد!`);

    setTimeout(() => {
      navigate("/dashboard-vendor");
    }, 2000);
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen flex flex-col items-center justify-center bg-[#f7f2eb] text-gray-800 px-4 py-8"
    >
      {/* لوگو و عنوان */}
      <div className="flex flex-col items-center mb-8">
        <img src={logo} alt="Genino Logo" className="w-24 h-24 mb-4 drop-shadow-lg" />
        <h1 className="text-3xl font-bold text-yellow-600 tracking-tight">
          ثبت‌نام ارائه‌دهنده کالا یا خدمت ژنینو 🛍️
        </h1>
      </div>

      {/* فرم */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md border border-yellow-100"
      >
        {/* نام و نام خانوادگی */}
       <div className="grid grid-cols-2 gap-4">
  <label className="block text-right">
    <span className="text-sm text-gray-600">نام</span>
    {touched.firstName && errors.firstName && (
      <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>
    )}
    <input
      name="firstName"
      type="text"
      value={formData.firstName}
      onChange={handleChange}
      onBlur={handleBlur}
      className={`w-full border p-2 rounded-lg mt-1 text-right ${
        touched.firstName && errors.firstName
          ? "border-red-400"
          : "border-gray-300 focus:border-yellow-500"
      }`}
    />
  </label>

  <label className="block text-right">
    <span className="text-sm text-gray-600">نام خانوادگی</span>
    {touched.lastName && errors.lastName && (
      <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>
    )}
    <input
      name="lastName"
      type="text"
      value={formData.lastName}
      onChange={handleChange}
      onBlur={handleBlur}
      className={`w-full border p-2 rounded-lg mt-1 text-right ${
        touched.lastName && errors.lastName
          ? "border-red-400"
          : "border-gray-300 focus:border-yellow-500"
      }`}
    />
  </label>
</div>

        {/* ایمیل */}
        <label className="block text-right mt-4">
          <span className="text-sm text-gray-600">ایمیل</span>
          {touched.email && errors.email && (
            <p className="text-xs text-red-600 mt-1">{errors.email}</p>
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

        {/* موبایل */}
        <label className="block text-right mt-4">
          <span className="text-sm text-gray-600">شماره موبایل</span>
          {touched.phone && errors.phone && (
            <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
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

        {/* تاریخ تولد */}
        <label className="block text-right mt-4">
          <span className="text-sm text-gray-600">تاریخ تولد</span>
          {touched.birthDate && errors.birthDate && (
            <p className="text-xs text-red-600 mt-1">{errors.birthDate}</p>
          )}
          <DatePicker
            value={formData.birthDate || ""}
            calendar={persian}
            locale={persian_fa}
            onChange={(date) => {
              const formatted = date?.format?.("YYYY/MM/DD") || "";
              setFormData({ ...formData, birthDate: formatted });
              const msg = validateField("birthDate", formatted);
              setErrors((p) => ({ ...p, birthDate: msg }));
              setTouched((p) => ({ ...p, birthDate: true }));
            }}
            inputClass="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:border-yellow-500 text-right"
          />
        </label>

        {/* نوع فعالیت */}
        <label className="block text-right mt-4">
          <span className="text-sm text-gray-600">نوع فعالیت</span>
          {touched.activityType && errors.activityType && (
            <p className="text-xs text-red-600 mt-1">{errors.activityType}</p>
          )}
          <select
            name="activityType"
            value={formData.activityType}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:border-yellow-500 text-right"
          >
            <option value="">انتخاب کنید</option>
            <option value="product">فروش کالا</option>
            <option value="service">ارائه خدمت</option>
          </select>
        </label>

        {/* نام برند یا فروشگاه */}
        <label className="block text-right mt-4">
          <span className="text-sm text-gray-600">نام برند / فروشگاه</span>
          {touched.companyName && errors.companyName && (
            <p className="text-xs text-red-600 mt-1">{errors.companyName}</p>
          )}
          <input
            name="companyName"
            type="text"
            value={formData.companyName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="مثلاً فروشگاه ژنینو"
            className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:border-yellow-500"
          />
        </label>

        {/* استان و شهر */}
        <label className="block text-right mt-4">
          <span className="text-sm text-gray-600">استان محل فعالیت</span>
          {touched.province && errors.province && (
            <p className="text-xs text-red-600 mt-1">{errors.province}</p>
          )}
          <select
            name="province"
            value={formData.province}
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
          <span className="text-sm text-gray-600">شهر محل فعالیت</span>
          {touched.city && errors.city && (
            <p className="text-xs text-red-600 mt-1">{errors.city}</p>
          )}
          <select
            name="city"
            value={formData.city}
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

        {/* رمز عبور */}
        <label className="block text-right mt-4">
          <span className="text-sm text-gray-600">رمز عبور</span>
          {touched.password && errors.password && (
            <p className="text-xs text-red-600 mt-1">{errors.password}</p>
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

        {/* تکرار رمز */}
        <label className="block text-right mt-4 mb-5">
          <span className="text-sm text-gray-600">تکرار رمز عبور</span>
          {touched.confirmPassword && errors.confirmPassword && (
            <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>
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

        {/* پذیرش قوانین */}
        <label className="flex items-center gap-2 mt-4 text-sm">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-4 h-4 accent-yellow-500"
          />
          <span className="text-gray-700">شرایط و قوانین ژنینو را می‌پذیرم</span>
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
    </main>
  );
}
