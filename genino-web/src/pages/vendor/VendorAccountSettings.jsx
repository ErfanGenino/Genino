import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Camera,
  Loader2,
  LockKeyhole,
  Mail,
  Phone,
  Save,
  ShieldCheck,
  Trash2,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getVendorProfile,
  updateVendorProfile,
  presignVendorAvatarUpload,
  putFileToPresignedUrl,
} from "../../services/api";

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

function getActivityLabel(activityType) {
  if (activityType === "product") return "ارائه‌دهنده کالا";
  if (activityType === "service") return "ارائه‌دهنده خدمات";
  if (activityType === "both") return "ارائه‌دهنده کالا و خدمات";
  return "ارائه‌دهنده ژنینو";
}

export default function VendorAccountSettings() {
  const navigate = useNavigate();

  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    avatarUrl:"",
    managerName: "",
    businessName: "",
    email: "",
    phone: "",
    province: "",
    city: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    let alive = true;

    async function loadProfile() {
      const token = localStorage.getItem("genino_token");
      const vendorId = localStorage.getItem("genino_vendor_id");

      if (!token || !vendorId) {
        navigate("/login", { replace: true });
        return;
      }

      setLoading(true);

      const res = await getVendorProfile();

      if (!alive) return;

      if (!res?.ok || !res.vendor) {
        setMessageType("error");
        setMessage(res?.message || "دریافت اطلاعات حساب انجام نشد.");
        setLoading(false);
        return;
      }

      const item = res.vendor;

      setVendor(item);

      setForm({
        firstName: item.firstName || "",
        lastName: item.lastName || "",
        avatarUrl: item.avatarUrl || "",
        managerName: item.managerName || "",
        businessName: item.businessName || "",
        email: item.email || "",
        phone: item.phone || "",
        province: item.province || "",
        city: item.city || "",
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });

      setLoading(false);
    }

    loadProfile();

    return () => {
      alive = false;
    };
  }, [navigate]);

  const cities = useMemo(() => {
    return iranProvinces[form.province] || [];
  }, [form.province]);

  function setField(name, value) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
  if (!message) return;
  const timer = setTimeout(() => {
    setMessage("");
    setMessageType("");
  }, 4000);
  return () => clearTimeout(timer);
}, [message]);


  async function handleAvatarChange(event) {
  const input = event.target;
  const file = input.files?.[0];

  if (!file) return;

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (!allowedTypes.includes(file.type)) {
    setMessageType("error");
    setMessage("فقط تصاویر JPG، PNG و WEBP مجاز هستند.");
    input.value = "";
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    setMessageType("error");
    setMessage("حداکثر حجم عکس ۵ مگابایت است.");
    input.value = "";
    return;
  }

  try {
    setUploadingAvatar(true);
    setMessage("");
    setMessageType("");

    const ext =
  file.type === "image/png"
    ? "png"
    : file.type === "image/webp"
      ? "webp"
      : "jpg";

    const presign = await presignVendorAvatarUpload({
      ext,
      contentType: file.type,
      fileName: file.name,
      fileSize: file.size,
    });

    if (!presign?.ok || !presign?.uploadUrl || !presign?.publicUrl) {
      setMessageType("error");
      setMessage(
        presign?.message || "لینک آپلود عکس دریافت نشد."
      );
      return;
    }

    const uploadResult = await putFileToPresignedUrl(
      presign.uploadUrl,
      file
    );

    if (!uploadResult?.ok) {
      setMessageType("error");
      setMessage(
        uploadResult?.message || "آپلود عکس روی فضای ذخیره‌سازی انجام نشد."
      );
      return;
    }

    setForm((prev) => ({
      ...prev,
      avatarUrl: presign.publicUrl,
    }));

    setMessageType("success");
    setMessage(
      "عکس بارگذاری شد. برای ثبت نهایی، دکمه ذخیره تنظیمات حساب را بزنید."
    );
  } catch (err) {
    console.error("VENDOR AVATAR UPLOAD ERROR:", err);

    setMessageType("error");
    setMessage("آپلود عکس انجام نشد.");
  } finally {
    setUploadingAvatar(false);
    input.value = "";
  }
}


 async function handleSave() {
  setMessage("");
  setMessageType("");

  if (!form.businessName.trim()) {
    setMessageType("error");
    setMessage("نام کسب‌وکار الزامی است.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    setMessageType("error");
    setMessage("فرمت ایمیل معتبر نیست.");
    return;
  }

  if (!/^09\d{9}$/.test(form.phone.trim())) {
    setMessageType("error");
    setMessage("شماره موبایل باید با 09 شروع شود و ۱۱ رقم باشد.");
    return;
  }

  if (!form.province || !form.city) {
    setMessageType("error");
    setMessage("استان و شهر را انتخاب کنید.");
    return;
  }

  if (
    vendor?.personType === "real" &&
    (!form.firstName.trim() || !form.lastName.trim())
  ) {
    setMessageType("error");
    setMessage("نام و نام خانوادگی الزامی است.");
    return;
  }

  if (
    vendor?.personType === "legal" &&
    !form.managerName.trim()
  ) {
    setMessageType("error");
    setMessage("نام مدیر یا مسئول مجموعه الزامی است.");
    return;
  }

  if (form.newPassword) {
    if (!form.currentPassword) {
      setMessageType("error");
      setMessage("برای تغییر رمز، رمز عبور فعلی را وارد کنید.");
      return;
    }

    if (form.newPassword !== form.confirmNewPassword) {
      setMessageType("error");
      setMessage("تکرار رمز جدید با رمز جدید یکسان نیست.");
      return;
    }

    if (form.newPassword.length < 8) {
      setMessageType("error");
      setMessage("رمز عبور جدید باید حداقل ۸ کاراکتر باشد.");
      return;
    }
  }

  setSaving(true);

  try {
    const res = await updateVendorProfile({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      managerName: form.managerName.trim(),
      businessName: form.businessName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      province: form.province,
      city: form.city,
      avatarUrl: form.avatarUrl,
      currentPassword: form.currentPassword || null,
      newPassword: form.newPassword || null,
    });

    if (!res?.ok) {
      setMessageType("error");
      setMessage(
        res?.message || "ذخیره تنظیمات حساب انجام نشد."
      );
      return;
    }

    setVendor(res.vendor);

    setForm((prev) => ({
      ...prev,
      avatarUrl: res.vendor?.avatarUrl || "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    }));

    window.dispatchEvent(
      new Event("genino_vendor_changed")
    );

    setMessageType("success");
    setMessage(
      res?.message || "تنظیمات حساب با موفقیت ذخیره شد."
    );
  } catch (err) {
    console.error("SAVE VENDOR SETTINGS ERROR:", err);

    setMessageType("error");
    setMessage("خطایی در ذخیره تنظیمات حساب رخ داد.");
  } finally {
    setSaving(false);
  }
}
  

  if (loading) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-[#f8f1e7] flex items-center justify-center"
      >
        <p className="text-sm font-bold text-stone-600">
          در حال دریافت تنظیمات حساب...
        </p>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f8f1e7] px-4 py-8 text-[#3f2f1f]"
    >

      {message && (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="fixed inset-x-4 top-5 z-[1000] mx-auto max-w-md"
  >
    <div
      className={`w-full break-words rounded-2xl border px-4 py-3 text-center text-sm font-bold leading-6 shadow-xl ${
        messageType === "success"
          ? "border-green-300 bg-green-50 text-green-700"
          : "border-red-300 bg-red-50 text-red-700"
      }`}
    >
      {message}
    </div>
  </motion.div>
)}

      <section className="mx-auto max-w-3xl space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-yellow-200 bg-gradient-to-br from-[#fff8e8] via-white to-[#f8f1e7] p-6 shadow-xl"
        >
          <div className="flex flex-col items-center text-center">
            <div className="relative">
  <label
    className={
      uploadingAvatar
        ? "cursor-not-allowed"
        : "cursor-pointer"
    }
  >
    <input
      hidden
      type="file"
      accept="image/jpeg,image/png,image/webp"
      disabled={uploadingAvatar}
      onChange={handleAvatarChange}
    />

    <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-yellow-300 bg-yellow-50 shadow">
      {form.avatarUrl ? (
        <img
          src={form.avatarUrl}
          alt={`تصویر ${form.businessName || "کسب‌وکار"}`}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="text-3xl font-black text-[#8b6326]">
          {form.businessName?.trim()?.charAt(0) || (
            <Building2 size={40} />
          )}
        </span>
      )}

      {uploadingAvatar && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/45 text-white">
          <Loader2 size={25} className="animate-spin" />
        </div>
      )}
    </div>

    {!uploadingAvatar && (
      <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#b88724] text-white shadow">
        <Camera size={15} />
      </span>
    )}
  </label>
</div>

<p className="mt-3 text-xs text-stone-500">
  {uploadingAvatar
    ? "در حال بارگذاری عکس..."
    : "برای انتخاب یا تغییر عکس، روی تصویر بزنید."}
</p>

{form.avatarUrl && !uploadingAvatar && (
  <button
    type="button"
    onClick={() => {
      setForm((prev) => ({
        ...prev,
        avatarUrl: "",
      }));

      setMessageType("success");
      setMessage(
        "عکس حذف شد. برای ثبت نهایی، دکمه ذخیره تنظیمات حساب را بزنید."
      );
    }}
    className="mt-3 inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100"
  >
    <Trash2 size={14} />
    حذف عکس
  </button>
)}

            <h1 className="mt-4 text-2xl font-black text-[#6f4a18]">
              تنظیمات حساب ارائه‌دهنده
            </h1>

            <p className="mt-2 text-sm font-bold text-stone-700">
              {vendor?.businessName || "کسب‌وکار ژنینو"}
            </p>

            <p className="mt-1 text-xs text-stone-500">
              {getActivityLabel(vendor?.activityType)}
              {vendor?.mainActivityField
                ? ` | ${vendor.mainActivityField}`
                : ""}
            </p>
          </div>
        </motion.div>

        

        <SettingsCard
          icon={<UserRound size={19} />}
          title="اطلاعات مسئول حساب"
        >
          {vendor?.personType === "real" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="نام"
                value={form.firstName}
                onChange={(value) => setField("firstName", value)}
              />

              <Field
                label="نام خانوادگی"
                value={form.lastName}
                onChange={(value) => setField("lastName", value)}
              />
            </div>
          ) : (
            <Field
              label="نام مدیر یا مسئول مجموعه"
              value={form.managerName}
              onChange={(value) => setField("managerName", value)}
            />
          )}
        </SettingsCard>

        <SettingsCard
          icon={<Building2 size={19} />}
          title="اطلاعات پایه کسب‌وکار"
        >
          <Field
            label="نام کسب‌وکار"
            value={form.businessName}
            onChange={(value) => setField("businessName", value)}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="استان محل فعالیت"
              value={form.province}
              onChange={(value) => {
                setForm((prev) => ({
                  ...prev,
                  province: value,
                  city: "",
                }));
              }}
              options={Object.keys(iranProvinces)}
            />

            <SelectField
              label="شهر محل فعالیت"
              value={form.city}
              onChange={(value) => setField("city", value)}
              options={cities}
              disabled={!form.province}
            />
          </div>

          <div className="rounded-2xl border border-yellow-100 bg-yellow-50/60 p-4 text-xs leading-6 text-stone-600">
            نوع شخص، نوع فعالیت، زمینه فعالیت اصلی و اطلاعات هویتی از این
            صفحه قابل تغییر نیستند. برای اصلاح این موارد با پشتیبانی ژنینو
            تماس بگیرید.
          </div>
        </SettingsCard>

        <SettingsCard
          icon={<Phone size={19} />}
          title="اطلاعات ورود و تماس"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="ایمیل حساب"
              type="email"
              icon={<Mail size={15} />}
              value={form.email}
              onChange={(value) => setField("email", value)}
            />

            <Field
              label="شماره موبایل مسئول حساب"
              type="tel"
              icon={<Phone size={15} />}
              value={form.phone}
              onChange={(value) => setField("phone", value)}
            />
          </div>
        </SettingsCard>

        <SettingsCard
          icon={<LockKeyhole size={19} />}
          title="تغییر رمز عبور"
        >
          <p className="text-xs leading-6 text-stone-500">
            فقط در صورتی که قصد تغییر رمز را داری، این بخش را تکمیل کن.
          </p>

          <Field
            label="رمز عبور فعلی"
            type="password"
            value={form.currentPassword}
            onChange={(value) => setField("currentPassword", value)}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="رمز عبور جدید"
              type="password"
              value={form.newPassword}
              onChange={(value) => setField("newPassword", value)}
            />

            <Field
              label="تکرار رمز عبور جدید"
              type="password"
              value={form.confirmNewPassword}
              onChange={(value) =>
                setField("confirmNewPassword", value)
              }
            />
          </div>

          <p className="text-[11px] leading-6 text-stone-500">
            رمز جدید باید حداقل ۸ کاراکتر و شامل حرف بزرگ، حرف کوچک انگلیسی و
            عدد باشد.
          </p>
        </SettingsCard>

        <button
          type="button"
          disabled={saving || uploadingAvatar}
          onClick={handleSave}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#7a5526] via-[#b88724] to-[#d4af37] py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={18} />
          {uploadingAvatar
  ? "در حال بارگذاری عکس..."
  : saving
    ? "در حال ذخیره..."
    : "ذخیره تنظیمات حساب"}
        </button>

        <div className="flex items-center justify-center gap-2 text-xs text-stone-500">
          <ShieldCheck size={16} className="text-green-600" />
          اطلاعات حساب شما به‌صورت امن نگهداری می‌شود.
        </div>
      </section>
    </main>
  );
}

function SettingsCard({ icon, title, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[2rem] border border-yellow-200 bg-white p-5 shadow-lg"
    >
      <div className="mb-5 flex items-center gap-2 text-[#6f4a18]">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-50">
          {icon}
        </span>

        <h2 className="font-black">{title}</h2>
      </div>

      <div className="space-y-4">{children}</div>
    </motion.section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  icon = null,
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-stone-600">{label}</span>

      <div className="relative mt-1">
        {icon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400">
            {icon}
          </span>
        )}

        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`h-11 w-full rounded-2xl border border-yellow-200 bg-white text-sm outline-none transition focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 ${
            icon ? "pr-10 pl-3" : "px-3"
          }`}
        />
      </div>
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  disabled = false,
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-stone-600">{label}</span>

      <select
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 h-11 w-full rounded-2xl border border-yellow-200 bg-white px-3 text-sm outline-none transition focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 disabled:bg-stone-100 disabled:text-stone-400"
      >
        <option value="">
          {disabled ? "ابتدا استان را انتخاب کنید" : "انتخاب کنید"}
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}