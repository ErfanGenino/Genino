import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Calendar, LogOut, Save, Camera } from "lucide-react";
import { getUserProfile, updateUserProfile, authFetch } from "../../services/api";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import { useRef } from "react";



// نگاشت مرحله زندگی برای UI
const LIFE_STAGE_OPTIONS = [
  { value: "user", label: "کاربر عادی" },
  { value: "single", label: "مجرد" },
  { value: "couple", label: "زوج" },
  { value: "pregnancy", label: "در آستانه فرزندآوری" },
  { value: "parent", label: "والدین" },
];

const DEFAULT_AVATARS = {
  male: Array.from({ length: 19 }, (_, i) => `/avatars/${101 + i}.png`),
  female: Array.from({ length: 20 }, (_, i) => `/avatars/${201 + i}.png`),
};


function toLatinDigits(input) {
  if (!input) return input;
  return String(input)
    .replace(/[۰-۹]/g, (d) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)])
    .replace(/[٠-٩]/g, (d) => "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)]);
}



function toPersianDate(dateValue) {
  if (!dateValue) return "—";
  try {
    const d = new Date(dateValue);
    if (Number.isNaN(d.getTime())) return "—";
    return new Intl.DateTimeFormat("fa-IR").format(d);
  } catch {
    return "—";
  }
}

async function uploadAvatarToArvan(file) {
  // 1) گرفتن presign از بک‌اند
  const ext = (file.name.split(".").pop() || "png").toLowerCase();
  const contentType = file.type || "image/png";

  const presign = await authFetch("/uploads/presign/avatar", {
    method: "POST",
    body: JSON.stringify({ ext, contentType }),
  });

  if (!presign?.ok) {
    return { ok: false, message: presign?.message || "خطا در گرفتن لینک آپلود." };
  }

  // 2) آپلود مستقیم به Arvan (PUT)
  const putRes = await fetch(presign.uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": contentType,
    },
    body: file,
  });

  if (!putRes.ok) {
    return { ok: false, message: `آپلود عکس ناموفق بود (${putRes.status})` };
  }

  // 3) لینک عمومی
  return { ok: true, publicUrl: presign.publicUrl, key: presign.key };
}

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showAvatars, setShowAvatars] = useState(false);
  const [localPreview, setLocalPreview] = useState("");
  const [serverUser, setServerUser] = useState(null);
  const birthRef = useRef(null);



    // ✅ جلوگیری از Memory Leak برای preview
  useEffect(() => {
    return () => {
      if (localPreview) URL.revokeObjectURL(localPreview);
    };
  }, [localPreview]);

  

  // فرم قابل ویرایش
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
    gender: "",
    birthDate: "", 
    province: "",
    city: "",
    lifeStage: "user",
    avatarUrl: "",
    nationalCode: "",
    addresses: [],
  });

  const fullName = useMemo(() => {
    const a = (form.firstName || "").trim();
    const b = (form.lastName || "").trim();
    const combined = `${a} ${b}`.trim();
    return combined || serverUser?.fullName || "کاربر ژنینو";
  }, [form.firstName, form.lastName, serverUser?.fullName]);

  const joinDate = useMemo(() => toPersianDate(serverUser?.createdAt), [serverUser?.createdAt]);

  const avatarToShow = useMemo(() => {
  return (
    localPreview ||
    form.avatarUrl ||
    serverUser?.avatarUrl ||
    "/avatars/101.png"
  );
}, [localPreview, form.avatarUrl, serverUser?.avatarUrl]);


  // بارگذاری پروفایل
  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      const res = await getUserProfile();

      if (!alive) return;

      if (!res?.ok) {
        setLoading(false);
        alert(res?.message || "خطا در دریافت پروفایل");
        return;
      }

      const u = res.user;
      setServerUser(u);

      setForm({
        firstName: u.firstName || "",
        lastName: u.lastName || "",
        username: u.username || "",
        phone: u.phone || "",
        gender: u.gender || "",
        birthDate: u.birthDate ? new Date(u.birthDate).toISOString().slice(0, 10) : "",
        province: u.province || "",
        city: u.city || "",
        lifeStage: u.lifeStage || "user",
        avatarUrl: u.avatarUrl || "",
        nationalCode: u.nationalCode || "",
        addresses: (() => {
        const list = Array.isArray(u.addresses) ? u.addresses : [];
        if (list.length === 0) return [];
        const hasDefault = list.some((x) => !!x.isDefault);
        if (hasDefault) return list;
        // اگر هیچ پیش‌فرضی نبود، اولی را پیش‌فرض کن
        return list.map((x, i) => ({ ...x, isDefault: i === 0 }));
        })(),
      });

      setLoading(false);
    })();

    return () => {
      alive = false;
    };
  }, []);

  function setField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // ====================
// مدیریت آدرس‌ها
// ====================

function addAddress() {
  setForm((prev) => {
    const list = Array.isArray(prev.addresses) ? prev.addresses : [];
    if (list.length >= 5) {
      alert("حداکثر ۵ آدرس می‌تونی ثبت کنی.");
      return prev;
    }

    const next = [
      ...list,
      {
        id: null,
        label: "",
        address: "",
        postalCode: "",
        isDefault: list.length === 0,
      },
    ];

    return { ...prev, addresses: next };
  });
}

function updateAddress(index, field, value) {
  setForm((prev) => {
    const list = Array.isArray(prev.addresses) ? [...prev.addresses] : [];
    if (!list[index]) return prev;

    list[index] = {
      ...list[index],
      [field]: field === "postalCode" ? toLatinDigits(value) : value,
    };

    return { ...prev, addresses: list };
  });
}

function removeAddress(index) {
  setForm((prev) => {
    let list = Array.isArray(prev.addresses) ? [...prev.addresses] : [];
    if (!list[index]) return prev;

    const wasDefault = !!list[index].isDefault;
    list.splice(index, 1);

    if (wasDefault && list.length > 0) {
      list = list.map((a, i) => ({ ...a, isDefault: i === 0 }));
    }

    return { ...prev, addresses: list };
  });
}

function setDefaultAddress(index) {
  setForm((prev) => {
    const list = Array.isArray(prev.addresses) ? prev.addresses : [];
    const next = list.map((a, i) => ({ ...a, isDefault: i === index }));
    return { ...prev, addresses: next };
  });
}

  async function onPickAvatar(e) {
  const file = e.target.files?.[0];
  if (!file) return;

  console.log("picked file:", file?.name, file?.type, file?.size);

  // ✅ اول چک‌ها
  if (!file.type.startsWith("image/")) {
    alert("فقط فایل تصویر قابل قبول است.");
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    alert("حجم عکس باید کمتر از 5 مگابایت باشد.");
    return;
  }

  // ✅ بعدش preview
  const previewUrl = URL.createObjectURL(file);
  console.log("previewUrl:", previewUrl);
  setLocalPreview(previewUrl);

  setUploading(true);
  const up = await uploadAvatarToArvan(file);
  setUploading(false);

  if (!up.ok) {
    alert(up.message || "آپلود ناموفق بود.");
    return;
  }

  setField("avatarUrl", up.publicUrl);
  setShowAvatars(false);
 // setLocalPreview(""); // (فعلاً اینو نگه دار)
}


  async function onSave() {
    setSaving(true);

    // ====================
// Validation (قبل از ارسال به سرور)
// ====================

// 1) کد ملی: اگر وارد شده باید 10 رقم باشد
const nc = toLatinDigits(String(form.nationalCode || "").trim());
if (nc && !/^\d{10}$/.test(nc)) {
  alert("کد ملی باید دقیقاً ۱۰ رقم باشد.");
  setSaving(false);
  return;
}

// 2) آدرس‌ها: اگر وجود دارند، باید معتبر باشند
const list = Array.isArray(form.addresses) ? form.addresses : [];
if (list.length > 0) {
  // اگر هیچ پیش‌فرضی نبود، اولی را پیش‌فرض کن
  const hasDefault = list.some((x) => !!x.isDefault);
  if (!hasDefault) {
  // سبک‌تر: بدون setForm و بدون نیاز به ذخیره دوباره
  alert("هیچ آدرس پیش‌فرضی انتخاب نشده بود؛ آدرس اول به عنوان پیش‌فرض ارسال می‌شود.");
}

  // چک خالی نبودن عنوان و متن آدرس
  for (let i = 0; i < list.length; i++) {
    const a = list[i] || {};
    const label = String(a.label || "").trim();
    const address = String(a.address || "").trim();

    if (!label) {
      alert(`عنوان آدرس ${i + 1} را وارد کن (مثلاً خانه).`);
      setSaving(false);
      return;
    }
    if (!address) {
      alert(`متن آدرس ${i + 1} را وارد کن.`);
      setSaving(false);
      return;
    }
    // ✅ کد پستی (اگر وارد شده باشد باید ۱۰ رقم باشد)
const pc = toLatinDigits(String(a.postalCode || "").trim());
if (pc && !/^\d{10}$/.test(pc)) {
  alert(`کد پستی آدرس ${i + 1} باید دقیقاً ۱۰ رقم باشد.`);
  setSaving(false);
  return;
}
  }
}


    // payload مینیمال و تمیز
    const payload = {
  firstName: form.firstName?.trim() || null,
  lastName: form.lastName?.trim() || null,
  username: form.username?.trim() || null,
  phone: form.phone?.trim() || null,
  gender: form.gender || null,
  birthDate: form.birthDate ? toLatinDigits(form.birthDate) : null,
  province: form.province?.trim() || null,
  city: form.city?.trim() || null,
  lifeStage: form.lifeStage || "user",
  avatarUrl: form.avatarUrl || null,

  nationalCode: form.nationalCode ? toLatinDigits(form.nationalCode.trim()) : null,
  addresses: Array.isArray(form.addresses)
  ? (() => {
      const list = form.addresses;
      const hasDefault = list.some((x) => !!x.isDefault);
      const normalized = hasDefault
        ? list
        : list.map((x, i) => ({ ...x, isDefault: i === 0 }));

      return normalized.map((a) => ({
        id: a?.id ?? null,
        label: (a?.label || "").trim(),
        address: (a?.address || "").trim(),
        postalCode: a?.postalCode ? toLatinDigits(String(a.postalCode).trim()) : null,
        isDefault: !!a?.isDefault,
      }));
    })()
  : [],
};

    const res = await updateUserProfile(payload);
    setSaving(false);

    if (!res?.ok) {
      alert(res?.message || "ذخیره پروفایل ناموفق بود.");
      return;
    }

    // بعد از ذخیره، دوباره پروفایل را از سرور بگیر تا همیشه sync باشیم
    const fresh = await getUserProfile();
if (fresh?.ok) {
  setServerUser(fresh.user);

  setForm((prev) => ({
  ...prev,

  // ✅ فیلدهایی که از سرور “حقیقت نهایی” هستند
  avatarUrl: fresh.user.avatarUrl || "",
  lifeStage: fresh.user.lifeStage || "user",
  nationalCode: fresh.user.nationalCode || "",
  addresses: (() => {
  const list = Array.isArray(fresh.user.addresses) ? fresh.user.addresses : [];
  if (list.length === 0) return [];
  const hasDefault = list.some((x) => !!x.isDefault);
  if (hasDefault) return list;
  return list.map((x, i) => ({ ...x, isDefault: i === 0 }));
})(),

  // ✅ بقیه را دست نمی‌زنیم تا اگر کاربر هنوز در حال تایپ بود، بهم نریزد
}));

  // ✅ Navbar را هم بلافاصله Sync کن
  try {
    localStorage.setItem("genino_user", JSON.stringify(fresh.user));
    window.dispatchEvent(new Event("genino_user_changed"));
    // 🔄 اگر مرحله زندگی تغییر کرده، به داشبورد جدید برو
if (fresh.user.lifeStage) {
  window.location.href = `/dashboard-${fresh.user.lifeStage}`;
}
  } catch {}
}


    alert("✅ پروفایل با موفقیت ذخیره شد.");
  }

  function onLogout() {
    // ساده و مستقیم
    localStorage.removeItem("genino_token");
    window.location.href = "/login";
  }

  const avatarList = useMemo(() => {
  if (form.gender === "male") return DEFAULT_AVATARS.male;
  if (form.gender === "female") return DEFAULT_AVATARS.female;
  return [...DEFAULT_AVATARS.male, ...DEFAULT_AVATARS.female];
}, [form.gender]);

if (loading) {
  return (
    <main dir="rtl" className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600">در حال دریافت پروفایل...</p>
    </main>
  );
}






  return (
    <main
      dir="rtl"
      className="relative min-h-screen bg-gradient-to-b from-[#fffaf0] via-[#fff3d8] to-[#fff0c4] text-gray-800 flex flex-col items-center pt-28 px-4 overflow-hidden"
    >
      {/* ☀️ افکت نور طلایی بالا */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#fff8dc]/90 to-transparent blur-3xl"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />

      {/* 🧑‍🎨 هدر پروفایل */}
      <motion.div
        className="flex flex-col items-center mb-10 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="relative w-32 h-32 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-[0_0_50px_rgba(212,175,55,0.4)] border-4 border-yellow-200 overflow-hidden flex items-center justify-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <img src={avatarToShow} alt="avatar" className="w-full h-full object-cover" onError={(e) => {console.log("❌ avatar img error:", avatarToShow); 
          e.currentTarget.src = "/avatars/101.png"; // fallback
          }}
          />
        </motion.div>

  {/* دکمه انتخب عکس پروفایل */}      
<motion.button
  type="button"
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.98 }}
  onClick={() => setShowAvatars(true)}
  className="mt-3 inline-flex items-center justify-center text-[11px] px-2 py-1 rounded-lg bg-white/90 text-yellow-700 border border-yellow-200 shadow-sm hover:bg-yellow-50"
>
  انتخاب عکس
</motion.button>


        {showAvatars && (
  <div className="mt-4 w-full max-w-xl bg-white/80 backdrop-blur rounded-2xl border border-yellow-200 p-4 z-10 space-y-4">
    {/* بخش بالا: آواتار آماده */}
    <div>
      <p className="text-sm text-gray-700 mb-3">یک آواتار آماده انتخاب کن:</p>

      <div className="grid grid-cols-6 gap-3">
        {avatarList.map((url) => (
          <button
            key={url}
            type="button"
            onClick={() => {
              setField("avatarUrl", url);
              setShowAvatars(false);
            }}
            className="rounded-full overflow-hidden border border-yellow-200 hover:border-yellow-400 transition"
            title="انتخاب آواتار"
          >
            <img src={url} alt="avatar" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>

    <div className="h-px bg-yellow-100" />

    {/* بخش پایین: انتخاب از گالری */}
    <div>
      <p className="text-sm text-gray-700 mb-2">یا عکس دلخواهت را از دستگاه انتخاب کن:</p>

      <label
  className={`inline-flex items-center gap-2 text-xs border border-yellow-200 px-3 py-2 rounded-xl shadow-sm transition
    ${uploading ? "opacity-60 cursor-not-allowed bg-gray-50 text-gray-500" : "cursor-pointer bg-white text-yellow-700 hover:bg-yellow-50"}
  `}
>
  <Camera className="w-4 h-4" />
  {uploading ? "در حال آپلود..." : "انتخاب عکس از گالری"}
  <input
    type="file"
    accept="image/*"
    className="hidden"
    onChange={onPickAvatar}
    disabled={uploading}
  />
</label>
{uploading && (
  <p className="mt-2 text-[11px] text-gray-600">
    لطفاً چند لحظه صبر کن… تصویر در حال آپلود است.
  </p>
)}
    <p className="mt-2 text-[11px] text-gray-500">
        (فرمت تصویر و حجم کمتر از ۵ مگابایت)
      </p>
    </div>
  </div>
)}


        <h1 className="mt-5 text-3xl font-extrabold text-yellow-700 drop-shadow-[0_0_10px_rgba(255,220,120,0.7)]">
          {fullName}
        </h1>
        <p className="text-sm text-gray-500 mt-1">عضو خانواده ژنینو 💛</p>
      </motion.div>

      {/* 🧾 کارت اطلاعات + فرم */}
      <motion.div
        className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-[0_0_25px_rgba(212,175,55,0.1)] border border-yellow-200 w-full max-w-xl p-6 sm:p-8 text-right space-y-6 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* نمایش اطلاعات ثابت */}
        <div className="space-y-3">
          <InfoRow icon={<Mail />} label="ایمیل" value={serverUser?.email || "—"} />
          <InfoRow icon={<User />} label="نام کاربری" value={serverUser?.username || "—"} />
          <InfoRow icon={<Calendar />} label="تاریخ عضویت" value={joinDate} />
        </div>

        <div className="h-px bg-yellow-100" />

        {/* فرم ویرایش */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="نام" value={form.firstName} onChange={(v) => setField("firstName", v)} />
          <Field label="نام خانوادگی" value={form.lastName} onChange={(v) => setField("lastName", v)} />

          <Field label="نام کاربری" value={form.username} onChange={(v) => setField("username", v)} />
          <Field label="موبایل" value={form.phone} onChange={(v) => setField("phone", v)} />

          <Field label="استان" value={form.province} onChange={(v) => setField("province", v)} />
          <Field label="شهر" value={form.city} onChange={(v) => setField("city", v)} />
          <Field label="کد ملی" value={form.nationalCode} onChange={(v) => setField("nationalCode", toLatinDigits(v))} />

          <Select
            label="جنسیت"
            value={form.gender}
            onChange={(v) => setField("gender", v)}
            options={[
              { value: "", label: "—" },
              { value: "male", label: "مرد" },
              { value: "female", label: "زن" },
            ]}
          />

          {/* تاریخ تولد */}
        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-600">تاریخ تولد</span>
          <DatePicker
  ref={birthRef}
  calendar={persian}
  locale={persian_fa}
  format="YYYY/MM/DD"
  editable={false}
  value={
    form.birthDate
      ? new DateObject({
          date: form.birthDate,
          format: "YYYY-MM-DD",
          calendar: gregorian,
          locale: persian_fa,
        }).convert(persian)
      : null
  }
  onChange={(date) => {
    const iso = date ? date.convert(gregorian).format("YYYY-MM-DD", "en") : "";
    setField("birthDate", toLatinDigits(iso));
    setTimeout(() => birthRef.current?.closeCalendar(), 0);
  }}
  inputClass="w-full rounded-xl border border-yellow-200 bg-white px-3 py-2 text-sm outline-none focus:border-yellow-400"
  placeholder="انتخاب تاریخ"
/>
        </label>

          <Select
            label="مرحله زندگی"
            value={form.lifeStage}
            onChange={(v) => setField("lifeStage", v)}
            options={LIFE_STAGE_OPTIONS}
          />
        </div>

        {/* 📍 آدرس‌ها */}
<div className="mt-6 space-y-3">
  <div className="flex items-center justify-between">
    <p className="text-sm font-semibold text-gray-700">آدرس‌ها</p>

    <button
  type="button"
  onClick={addAddress}
  disabled={(form.addresses?.length || 0) >= 5}
  className="text-xs px-3 py-2 rounded-xl border border-yellow-200 bg-white text-yellow-700 hover:bg-yellow-50 disabled:opacity-60"
>
  + افزودن آدرس
</button>
  </div>

  <p className="text-[11px] text-gray-500">
    حداکثر ۵ آدرس. یکی از آدرس‌ها باید «پیش‌فرض» باشد.
  </p>

  {(!form.addresses || form.addresses.length === 0) ? (
    <div className="rounded-2xl border border-yellow-100 bg-yellow-50/40 p-4 text-sm text-gray-600">
      هنوز آدرسی ثبت نکرده‌ای.
    </div>
  ) : (
    <div className="space-y-3">
      {form.addresses.map((a, idx) => (
        <div
          key={a?.id ?? `new-${idx}`}
          className="rounded-2xl border border-yellow-200 bg-white p-4 space-y-3"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-gray-500">آدرس {idx + 1}</p>

            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-600 flex items-center gap-2">
                <input
                  type="radio"
                  name="defaultAddress"
                  checked={!!a.isDefault}
                  onChange={() => setDefaultAddress(idx)}
                />
                پیش‌فرض
              </label>

              <button
                type="button"
                onClick={() => removeAddress(idx)}
                className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
              >
                حذف
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-xs text-gray-600">عنوان (مثلاً خانه)</span>
              <input
                value={a.label || ""}
                onChange={(e) => updateAddress(idx, "label", e.target.value)}
                className="w-full rounded-xl border border-yellow-200 bg-white px-3 py-2 text-sm outline-none focus:border-yellow-400"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-xs text-gray-600">کد پستی</span>
              <input
                value={a.postalCode || ""}
                onChange={(e) => updateAddress(idx, "postalCode", e.target.value)}
                className="w-full rounded-xl border border-yellow-200 bg-white px-3 py-2 text-sm outline-none focus:border-yellow-400"
              />
            </label>

            <label className="flex flex-col gap-1 sm:col-span-2">
              <span className="text-xs text-gray-600">متن آدرس</span>
              <textarea
                rows={2}
                value={a.address || ""}
                onChange={(e) => updateAddress(idx, "address", e.target.value)}
                className="w-full rounded-xl border border-yellow-200 bg-white px-3 py-2 text-sm outline-none focus:border-yellow-400"
              />
            </label>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

        {/* 🔘 دکمه‌ها */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            disabled={saving || uploading}
            onClick={onSave}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md hover:from-yellow-600 hover:to-yellow-500 transition disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLogout}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-yellow-700 border border-yellow-300 font-semibold px-6 py-2.5 rounded-xl shadow-sm hover:bg-yellow-50 transition"
          >
            <LogOut className="w-4 h-4" />
            خروج از حساب
          </motion.button>
        </div>

        <p className="text-xs text-gray-500 leading-6">
          نکته: با تغییر «مرحله زندگی»، دسترسی به داشبوردهای مختلف هم تغییر می‌کند.
        </p>
      </motion.div>

      {/* ✨ ذرات طلایی */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(255,215,0,0.6)]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 4 + Math.random() * 3,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </main>
  );
}

/* 💎 نمایش اطلاعات */
function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-yellow-100 pb-2">
      <div className="flex items-center gap-2 text-yellow-700">
        <span className="p-1 bg-yellow-100 rounded-lg">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <p className="text-gray-700 text-sm">{value}</p>
    </div>
  );
}

/* 🧾 فیلد */
function Field({ label, value, onChange }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs text-gray-600">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-yellow-200 bg-white px-3 py-2 text-sm outline-none focus:border-yellow-400"
      />
    </label>
  );
}

/* 🔽 سلکت */
function Select({ label, value, onChange, options }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs text-gray-600">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-yellow-200 bg-white px-3 py-2 text-sm outline-none focus:border-yellow-400"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
