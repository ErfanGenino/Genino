import { useRef, useState } from "react";
import { motion } from "framer-motion";
import logo from "./assets/logo-genino.png";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useNavigate } from "react-router-dom";

const iranProvinces = {
  "خارج از ایران": ["خارج از ایران"],
  تهران: ["تهران", "اسلامشهر", "قدس", "ورامین", "ملارد", "ری"],
  البرز: ["کرج", "نظرآباد", "فردیس"],
  فارس: ["شیراز", "مرودشت", "لار", "جهرم"],
  اصفهان: ["اصفهان", "کاشان", "نجف‌آباد"],
  "خراسان رضوی": ["مشهد", "نیشابور", "تربت‌حیدریه"],
  مازندران: ["ساری", "آمل", "بابل", "نوشهر"],
  کرمانشاه: ["کرمانشاه", "اسلام‌آباد غرب", "پاوه"],
  هرمزگان: ["بندرعباس", "قشم", "میناب"],
  گیلان: ["رشت", "انزلی", "لاهیجان"],
};

const steps = [
  "ثبت‌نام اولیه",
  "انتخاب بسته و پرداخت",
  "استفاده محدود از امکانات",
  "تکمیل مدارک و قرارداد",
  "اجازه انتشار",
];

const goodsActivityOptions = [
  "سیسمونی تخصصی",
  "نوزاد، کودک و نوجوان",
  "مد و پوشاک",
  "کالای خواب و حمام",
  "ساعت و زیور‌آلات",
  "کالای ورزشی",
  "سلامت و پزشکی",
  "آرایشی و بهداشتی",
  "عطر و ادکلن",
  "هنر دست زنان و مردان قدرتمند سرزمین من",
];

const serviceActivityOptions = [
  "مدارس",
  "مهدکودک‌ها",
  "خانه‌های بازی",
  "کلاس‌های آموزشی",
  "کلاس‌های هنری",
  "کلاس‌های ورزشی",
  "معلمان خصوصی",
];

export default function SignupVendor() {
  const navigate = useNavigate();

  const birthDatePickerRef = useRef(null);


  const [formData, setFormData] = useState({
    personType: "",
    activityType: "",
    mainActivityField: "",
    extraActivityFields: [],
    firstName: "",
    lastName: "",
    nationalCode: "",
    birthDate: "",
    companyName: "",
    legalCompanyName: "",
    companyType: "",
    managerName: "",
    registrationNumber: "",
    registrationDate: "",
    nationalId: "",
    economicCode: "",
    email: "",
    phone: "",
    province: "",
    city: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [message, setMessage] = useState("");
  const [showDetailsForm, setShowDetailsForm] = useState(false);

const canContinue =
  formData.personType.trim() !== "" && formData.activityType.trim() !== "";

  const validateField = (name, value, data = formData) => {
    const v = typeof value === "string" ? value.trim() : value;

    switch (name) {
      case "personType":
        return v ? "" : "نوع شخص را انتخاب کنید";

      case "activityType":
        return v ? "" : "نوع فعالیت را انتخاب کنید";

      case "mainActivityField":
        return v ? "" : "زمینه فعالیت اصلی را انتخاب کنید";

      case "firstName":
        if (data.personType === "legal") return "";
        return v ? "" : "نام الزامی است";

      case "lastName":
        if (data.personType === "legal") return "";
        return v ? "" : "نام خانوادگی الزامی است";

      case "nationalCode":
        if (data.personType !== "real") return "";
        if (!v) return "کد ملی الزامی است";
        if (!/^\d{10}$/.test(v)) return "کد ملی باید ۱۰ رقم باشد";
        return "";

      case "birthDate":
        if (data.personType !== "real") return "";
        return v ? "" : "تاریخ تولد الزامی است";

      case "registrationNumber":
        if (data.personType !== "legal") return "";
        return v ? "" : "شماره ثبت الزامی است";

      case "registrationDate":
        if (data.personType !== "legal") return "";
        return v ? "" : "تاریخ ثبت الزامی است";

      case "nationalId":
        if (data.personType !== "legal") return "";
        if (!v) return "شناسه ملی الزامی است";
        if (!/^\d{11}$/.test(v)) return "شناسه ملی باید ۱۱ رقم باشد";
        return "";

      case "economicCode":
        if (data.personType !== "legal") return "";
        return v ? "" : "کد اقتصادی الزامی است";

      case "companyName":
        return v ? "" : "نام کسب‌وکار الزامی است";

      case "managerName":
        if (data.personType !== "legal") return "";
        return v ? "" : "نام مدیر یا مسئول مجموعه الزامی است";

      case "legalCompanyName":
        if (data.personType !== "legal") return "";
        return v ? "" : "نام شرکت الزامی است";

      case "companyType":
        if (data.personType !== "legal") return "";
        return v ? "" : "نوع شرکت را انتخاب کنید";

      case "email":
        if (!v) return "ایمیل الزامی است";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
          return "فرمت ایمیل معتبر نیست";
        return "";

      case "phone":
        if (!v) return "شماره موبایل الزامی است";
        if (!/^09\d{9}$/.test(v))
          return "شماره موبایل باید با 09 شروع شود و ۱۱ رقم باشد";
        return "";

      case "province":
        return v ? "" : "استان محل فعالیت را انتخاب کنید";

      case "city":
        if (!data.province) return "ابتدا استان را انتخاب کنید";
        return v ? "" : "شهر محل فعالیت را انتخاب کنید";

      case "password":
        if (!v) return "رمز عبور الزامی است";
        if (v.length < 8) return "رمز عبور باید حداقل ۸ کاراکتر باشد";
        if (!/[A-Z]/.test(v))
          return "رمز عبور باید حداقل یک حرف بزرگ انگلیسی داشته باشد";
        if (!/[a-z]/.test(v))
          return "رمز عبور باید حداقل یک حرف کوچک انگلیسی داشته باشد";
        if (!/[0-9]/.test(v))
          return "رمز عبور باید حداقل یک عدد داشته باشد";
        return "";

      case "confirmPassword":
        if (!v) return "تکرار رمز عبور الزامی است";
        return v === data.password ? "" : "تکرار رمز باید با رمز یکسان باشد";

      case "terms":
        return data.terms ? "" : "پذیرش شرایط اولیه الزامی است";

      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const next = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };

    if (name === "province") next.city = "";

    if (name === "activityType") {
  next.mainActivityField = "";
  next.extraActivityFields = [];
}

    if (name === "personType") {
      next.firstName = "";
      next.lastName = "";
      next.nationalCode = "";
      next.birthDate = "";
      next.legalCompanyName = "";
      next.companyType = "";
      next.managerName = "";
      next.registrationNumber = "";
      next.registrationDate = "";
      next.nationalId = "";
      next.economicCode = "";
    }

    setFormData(next);
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, next[name], next),
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, formData[name], formData),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fields = Object.keys(formData);
    const nextErrors = {};
    let hasError = false;

    fields.forEach((field) => {
      const error = validateField(field, formData[field], formData);
      nextErrors[field] = error;
      if (error) hasError = true;
    });

    setErrors(nextErrors);
    setTouched(fields.reduce((acc, field) => ({ ...acc, [field]: true }), {}));

    if (hasError) {
      setMessage("لطفاً خطاهای مشخص‌شده را برطرف کنید.");
      return;
    }

    setMessage(
      "ثبت‌نام اولیه با موفقیت انجام شد. در حال ورود به داشبورد ارائه‌دهندگان..."
    );

    setTimeout(() => {
      navigate("/dashboard-vendor");
    }, 1200);
  };

  const inputClass = (name) =>
    `mt-1 h-11 w-full rounded-2xl border bg-white/90 px-3 text-right text-sm outline-none transition ${
      touched[name] && errors[name]
        ? "border-red-300 focus:ring-4 focus:ring-red-100"
        : "border-yellow-200 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
    }`;

  const ErrorText = ({ name }) =>
    touched[name] && errors[name] ? (
      <p className="mt-1 text-right text-[11px] font-bold text-red-500">
        {errors[name]}
      </p>
    ) : null;

  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[#f8f1e7] px-4 py-8 text-[#3f2f1f]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yellow-300/30 blur-3xl" />
        <div className="absolute -left-28 top-72 h-80 w-80 rounded-full bg-amber-100/80 blur-3xl" />
        <div className="absolute bottom-10 right-1/3 h-64 w-64 rounded-full bg-white/70 blur-3xl" />
      </div>

      <section className="relative z-10 mx-auto grid min-h-screen max-w-6xl items-center gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.aside
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="rounded-[2rem] border border-white/70 bg-white/55 p-5 text-center shadow-2xl shadow-amber-900/10 backdrop-blur-xl lg:text-right"
        >
          <img
            src={logo}
            alt="Genino Logo"
            className="mx-auto mb-4 h-20 w-20 drop-shadow-lg lg:mx-0"
          />

          <span className="inline-flex rounded-full border border-yellow-300/60 bg-yellow-50 px-4 py-2 text-xs font-black text-yellow-800">
            ثبت‌نام ارائه‌دهندگان ژنینو
          </span>

          <h1 className="mt-4 text-2xl font-black leading-10 text-[#6f4a18] sm:text-4xl">
            شروع همکاری با اکوسیستم تجاری ژنینو
          </h1>

          <p className="mt-4 text-sm leading-8 text-stone-600">
            ابتدا ثبت‌نام اولیه انجام می‌شود و وارد داشبورد اختصاصی
            ارائه‌دهندگان می‌شوید. سپس بسته مناسب را انتخاب و پرداخت می‌کنید.
            بعد از تکمیل مدارک و پذیرش قرارداد، امکان انتشار محصولات یا خدمات
            شما در ژنینو فعال می‌شود.
          </p>

          <div className="mt-6 space-y-3">
            {steps.map((step, index) => (
              <div
                key={step}
                className="flex items-center gap-3 rounded-2xl border border-yellow-200 bg-[#fff8e8] p-3 text-right"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#b88724] to-[#d4af37] text-xs font-black text-white">
                  {index + 1}
                </span>
                <span className="text-xs font-black text-[#7a5526]">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </motion.aside>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="rounded-[2rem] border border-white/70 bg-white/75 p-5 shadow-2xl shadow-amber-900/10 backdrop-blur-xl sm:p-7"
        >
          <div className="mb-6 text-center">
            <h2 className="text-xl font-black text-[#6f4a18] sm:text-2xl">
              ثبت‌نام اولیه ارائه‌دهنده
            </h2>
            <p className="mt-2 text-xs leading-6 text-stone-500">
              این فرم فقط برای ساخت حساب اولیه است. مدارک، قرارداد و بسته‌ها در
              داشبورد تکمیل می‌شوند.
            </p>
          </div>

                    {!showDetailsForm ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <label>
                  <span className="text-xs font-bold text-stone-600">
                    نوع شخص
                  </span>
                  <select
                    name="personType"
                    value={formData.personType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass("personType")}
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="real">شخص حقیقی</option>
                    <option value="legal">شخص حقوقی</option>
                  </select>
                  <ErrorText name="personType" />
                </label>

                <label>
                  <span className="text-xs font-bold text-stone-600">
                    نوع فعالیت
                  </span>
                  <select
                    name="activityType"
                    value={formData.activityType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass("activityType")}
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="product">ارائه‌دهنده کالا</option>
                    <option value="service">ارائه‌دهنده خدمات</option>
                    <option value="both">کالا و خدمات</option>
                  </select>
                  <ErrorText name="activityType" />
                </label>
              </div>

              <button
                type="button"
                disabled={!canContinue}
                onClick={() => setShowDetailsForm(true)}
                className={`mt-6 h-12 w-full rounded-2xl text-sm font-black shadow-lg transition ${
                  canContinue
                    ? "bg-gradient-to-r from-[#7a5526] via-[#b88724] to-[#d4af37] text-white shadow-yellow-600/20 hover:-translate-y-0.5"
                    : "cursor-not-allowed bg-stone-200 text-stone-400 shadow-none"
                }`}
              >
                ادامه ثبت‌نام
              </button>
            </>
          ) : (
            <>
              <div className="mb-5 rounded-2xl border border-yellow-200 bg-[#fff8e8] p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-right">
                    <p className="text-xs font-bold text-stone-500">
                      انتخاب اولیه شما
                    </p>

                    <p className="mt-2 text-sm font-black text-[#7a5526]">
                      {formData.personType === "real"
                        ? "شخص حقیقی"
                        : "شخص حقوقی"}{" "}
                      /{" "}
                      {formData.activityType === "product"
                        ? "ارائه‌دهنده کالا"
                        : formData.activityType === "service"
                        ? "ارائه‌دهنده خدمات"
                        : "کالا و خدمات"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setShowDetailsForm(false);
                      setMessage("");
                    }}
                    className="h-10 rounded-2xl border border-yellow-300 bg-white px-4 text-xs font-black text-[#7a5526] transition hover:bg-yellow-50"
                  >
                    مرحله قبل و تغییر انتخاب
                  </button>
                </div>
              </div>

              {formData.personType === "real" && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className="text-xs font-bold text-stone-600">
                      نام
                    </span>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={inputClass("firstName")}
                    />
                    <ErrorText name="firstName" />
                  </label>

                  <label>
                    <span className="text-xs font-bold text-stone-600">
                      نام خانوادگی
                    </span>
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={inputClass("lastName")}
                    />
                    <ErrorText name="lastName" />
                  </label>

                  <label>
                    <span className="text-xs font-bold text-stone-600">
                      کد ملی
                    </span>
                    <input
                      name="nationalCode"
                      value={formData.nationalCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="۱۰ رقم"
                      className={inputClass("nationalCode")}
                    />
                    <ErrorText name="nationalCode" />
                  </label>

                  <label>
                    <span className="text-xs font-bold text-stone-600">
                      تاریخ تولد
                    </span>
                    <DatePicker
  value={formData.birthDate || ""}
  calendar={persian}
  locale={persian_fa}
  onChange={(date) => {
    const formatted = date?.format?.("YYYY/MM/DD") || "";
    const next = { ...formData, birthDate: formatted };

    setFormData(next);
    setTouched((prev) => ({ ...prev, birthDate: true }));
    setErrors((prev) => ({
      ...prev,
      birthDate: validateField("birthDate", formatted, next),
    }));
  }}
  portal
  containerStyle={{ zIndex: 2000 }}
  inputClass={inputClass("birthDate")}
/>
                    <ErrorText name="birthDate" />
                  </label>
                </div>
              )}

              {formData.personType === "legal" && (
  <div className="mt-4 grid gap-4 sm:grid-cols-2">

    <label>
  <span className="text-xs font-bold text-stone-600">
    نام شرکت
  </span>
  <input
    name="legalCompanyName"
    value={formData.legalCompanyName}
    onChange={handleChange}
    onBlur={handleBlur}
    className={inputClass("legalCompanyName")}
  />
  <ErrorText name="legalCompanyName" />
</label>

<label>
  <span className="text-xs font-bold text-stone-600">
    نوع شرکت
  </span>
  <select
    name="companyType"
    value={formData.companyType}
    onChange={handleChange}
    onBlur={handleBlur}
    className={inputClass("companyType")}
  >
    <option value="">انتخاب کنید</option>
    <option value="private-jsc">سهامی خاص</option>
    <option value="public-jsc">سهامی عام</option>
    <option value="llc">مسئولیت محدود</option>
    <option value="cooperative">تعاونی</option>
    <option value="non-commercial">مؤسسه غیرتجاری</option>
    <option value="knowledge-based">دانش‌بنیان</option>
    <option value="other">سایر</option>
  </select>
  <ErrorText name="companyType" />
</label>

<label className="sm:col-span-2">
  <span className="text-xs font-bold text-stone-600">
    نام مدیرعامل یا مسئول مجموعه
  </span>
  <input
    name="managerName"
    value={formData.managerName}
    onChange={handleChange}
    onBlur={handleBlur}
    className={inputClass("managerName")}
  />
  <ErrorText name="managerName" />
</label>

    <label>
      <span className="text-xs font-bold text-stone-600">
        شماره ثبت
      </span>
      <input
        name="registrationNumber"
        value={formData.registrationNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="شماره ثبت شرکت"
        className={inputClass("registrationNumber")}
      />
      <ErrorText name="registrationNumber" />
    </label>

    <label>
  <span className="text-xs font-bold text-stone-600">
    تاریخ ثبت
  </span>

  <DatePicker
  value={formData.registrationDate || ""}
  calendar={persian}
  locale={persian_fa}
  onChange={(date) => {
    const formatted = date?.format?.("YYYY/MM/DD") || "";
    const next = {
      ...formData,
      registrationDate: formatted,
    };

    setFormData(next);

    setTouched((prev) => ({
      ...prev,
      registrationDate: true,
    }));

    setErrors((prev) => ({
      ...prev,
      registrationDate: validateField(
        "registrationDate",
        formatted,
        next
      ),
    }));
  }}
  portal
  containerStyle={{ zIndex: 2000 }}
  inputClass={inputClass("registrationDate")}
/>

  <ErrorText name="registrationDate" />
</label>

    <label>
      <span className="text-xs font-bold text-stone-600">
        شناسه ملی
      </span>
      <input
        name="nationalId"
        value={formData.nationalId}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="۱۱ رقم"
        className={inputClass("nationalId")}
      />
      <ErrorText name="nationalId" />
    </label>

    <label className="sm:col-span-2">
      <span className="text-xs font-bold text-stone-600">
        کد اقتصادی
      </span>
      <input
        name="economicCode"
        value={formData.economicCode}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="کد اقتصادی شرکت"
        className={inputClass("economicCode")}
      />
      <ErrorText name="economicCode" />
    </label>

  </div>
)}

<div className="mt-4 grid gap-4">

  <label>
    <span className="text-xs font-bold text-stone-600">
      زمینه فعالیت اصلی
    </span>

    <select
      name="mainActivityField"
      value={formData.mainActivityField}
      onChange={handleChange}
      onBlur={handleBlur}
      className={inputClass("mainActivityField")}
    >
      <option value="">انتخاب کنید</option>

      {(formData.activityType === "product"
        ? goodsActivityOptions
        : formData.activityType === "service"
        ? serviceActivityOptions
        : [...goodsActivityOptions, ...serviceActivityOptions]
      ).map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>

    <ErrorText name="mainActivityField" />
  </label>

</div>
<label>
  <span className="text-xs font-bold text-stone-600">
    افزودن فعالیت تکمیلی (اختیاری)
  </span>

  <select
    onChange={(e) => {
      const value = e.target.value;

      if (
        !value ||
        value === formData.mainActivityField ||
        formData.extraActivityFields.includes(value) ||
        formData.extraActivityFields.length >= 5
      ) {
        return;
      }

      setFormData((prev) => ({
        ...prev,
        extraActivityFields: [...prev.extraActivityFields, value],
      }));
    }}
    className="mt-1 h-11 w-full rounded-2xl border border-yellow-200 bg-white px-3 text-sm"
  >
    <option value="">انتخاب فعالیت تکمیلی</option>

    {(formData.activityType === "product"
      ? goodsActivityOptions
      : formData.activityType === "service"
      ? serviceActivityOptions
      : [...goodsActivityOptions, ...serviceActivityOptions]
    ).map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ))}
  </select>
</label>

{formData.extraActivityFields.length > 0 && (
  <div className="flex flex-wrap gap-2">

    {formData.extraActivityFields.map((item) => (
      <button
        key={item}
        type="button"
        onClick={() =>
          setFormData((prev) => ({
            ...prev,
            extraActivityFields: prev.extraActivityFields.filter(
              (x) => x !== item
            ),
          }))
        }
        className="rounded-full border border-yellow-300 bg-yellow-50 px-3 py-1 text-xs font-bold text-[#7a5526]"
      >
        ✕ {item}
      </button>
    ))}

  </div>
)}

              <label className="mt-4 block">
                <span className="text-xs font-bold text-stone-600">
  نام کسب‌وکار
</span>

<p className="mt-1 text-[11px] leading-5 text-stone-500">
  نام فروشگاه، مدرسه، مهدکودک، خانه بازی، مرکز آموزشی، برند یا کسب‌وکار شما
</p>
                <input
                  name="companyName"
                  placeholder="مثلاً فروشگاه کودک "
                  value={formData.companyName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass("companyName")}
                />
                <ErrorText name="companyName" />
              </label>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label>
                  <span className="text-xs font-bold text-stone-600">
                    ایمیل
                  </span>
                  <input
                    name="email"
                    type="email"
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass("email")}
                  />
                  <ErrorText name="email" />
                </label>

                <label>
                  <span className="text-xs font-bold text-stone-600">
                    شماره موبایل مسئول حساب
                  </span>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="0912..."
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass("phone")}
                  />
                  <ErrorText name="phone" />
                </label>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label>
                  <span className="text-xs font-bold text-stone-600">
                    استان محل فعالیت
                  </span>
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass("province")}
                  >
                    <option value="">انتخاب کنید</option>
                    {Object.keys(iranProvinces).map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                  <ErrorText name="province" />
                </label>

                <label>
                  <span className="text-xs font-bold text-stone-600">
                    شهر محل فعالیت
                  </span>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={!formData.province}
                    className={`${inputClass(
                      "city"
                    )} disabled:bg-stone-100 disabled:text-stone-400`}
                  >
                    <option value="">
                      {formData.province
                        ? "انتخاب کنید"
                        : "ابتدا استان را انتخاب کنید"}
                    </option>

                    {formData.province &&
                      iranProvinces[formData.province].map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                  </select>
                  <ErrorText name="city" />
                </label>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label>
                  <span className="text-xs font-bold text-stone-600">
                    رمز عبور
                  </span>
                  <input
                    name="password"
                    type="password"
                    placeholder="مثال: Genino2026"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass("password")}
                  />
                  <ErrorText name="password" />
                </label>

                <label>
                  <span className="text-xs font-bold text-stone-600">
                    تکرار رمز عبور
                  </span>
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="تکرار رمز عبور"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass("confirmPassword")}
                  />
                  <ErrorText name="confirmPassword" />
                </label>
              </div>

              <p className="mt-3 rounded-2xl border border-yellow-200 bg-yellow-50/80 px-4 py-3 text-[11px] font-bold leading-6 text-[#7a5526]">
                رمز عبور باید حداقل ۸ کاراکتر، شامل یک حرف بزرگ انگلیسی، یک حرف
                کوچک انگلیسی و یک عدد باشد.
              </p>

              <label className="mt-5 flex items-start gap-2 rounded-2xl border border-yellow-200 bg-[#fff8e8] p-3 text-sm">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 h-4 w-4 accent-yellow-500"
                />

                <span className="text-xs font-bold leading-6 text-stone-600">
                  می‌پذیرم که این ثبت‌نام، مرحله اولیه همکاری با ژنینو است و
                  فعال شدن انتشار محصولات یا خدمات، منوط به انتخاب بسته، پرداخت،
                  تکمیل مدارک و پذیرش قرارداد خواهد بود.
                </span>
              </label>
              <ErrorText name="terms" />

              <button
                type="submit"
                className="mt-6 h-12 w-full rounded-2xl bg-gradient-to-r from-[#7a5526] via-[#b88724] to-[#d4af37] text-sm font-black text-white shadow-lg shadow-yellow-600/20 transition hover:-translate-y-0.5"
              >
                ثبت‌نام اولیه و ورود به داشبورد ارائه‌دهندگان
              </button>
            </>
          )}

          {message && (
            <p
              className={`mt-4 rounded-2xl border px-4 py-3 text-center text-xs font-bold leading-6 ${
                message.includes("موفقیت")
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </motion.form>
      </section>
    </main>
  );
}