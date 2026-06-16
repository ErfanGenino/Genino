import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Link, useNavigate } from "react-router-dom";
import {
  registerAmbassador,
  getMyAmbassador,
  presignAmbassadorDocumentUpload,
  putFileToPresignedUrl,
} from "../../services/api";
import { prepareImage } from "../../utils/image/prepareImage";


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

export default function GeninoAmbassadorRegister() {
  const [form, setForm] = useState({
    fatherName: "",
    birthCertificateNumber: "",
    education: "",
    maritalStatus: "",
    childrenCount: "",
    currentJob: "",
    phone: "",
    address: "",
    postalCode: "",
    familiarWithGenino: "",
    marketingExperience: "",
    dailyVisitAbility: "",
    successReason: "",
    personalPhoto: null,
    nationalCardImage: null,
    birthCertificateImage: null,
    readRules: false,
    acceptedTerms: false,
  });

  
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [documentPreviews, setDocumentPreviews] = useState({
  personalPhoto: "",
  nationalCardImage: "",
  birthCertificateImage: "",
});

const [uploadingDocuments, setUploadingDocuments] = useState(false);
  const [checkingAmbassador, setCheckingAmbassador] = useState(true);

useEffect(() => {
  async function checkAmbassadorStatus() {
    const res = await getMyAmbassador();

    if (res.ok && res.ambassador) {
      navigate("/dashboard-ambassador", { replace: true });
      return;
    }

    setCheckingAmbassador(false);
  }

  checkAmbassadorStatus();
}, [navigate]);

  let user = null;

try {
  const storedUser = localStorage.getItem("genino_user");
  user = storedUser ? JSON.parse(storedUser) : null;
} catch (error) {
  user = null;
}

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setForm((prev) => {
  const updated = {
    ...prev,
    [name]:
      type === "checkbox"
        ? checked
        : type === "file"
        ? files[0]
        : value,
  };

  if (name === "province") {
    updated.city = "";
  }


  if (type === "file" && files?.[0]) {
  setDocumentPreviews((prev) => ({
    ...prev,
    [name]: URL.createObjectURL(files[0]),
  }));
}


  return updated;
});
  };

  function getFileExt(file) {
  const name = (file?.name || "").toLowerCase();
  const parts = name.split(".");
  return parts.length > 1 ? parts.pop() : "";
}

async function uploadAmbassadorDocument(documentType, file) {
  if (!file) {
    return { ok: false, message: "فایل مدرک انتخاب نشده است." };
  }

  let safeFile;

try {
  safeFile = await prepareImage(file, {
    quality: 0.88,
    maxWidthOrHeight: 1800,
    outputFileName: `${documentType}.jpg`,
  });
} catch (err) {
  return {
    ok: false,
    message: err.message || "آماده‌سازی عکس مدرک ناموفق بود.",
  };
}

  const pres = await presignAmbassadorDocumentUpload({
  documentType,
  ext: "jpg",
  contentType: safeFile.type,
  fileName: safeFile.name,
  fileSize: safeFile.size,
});

  if (!pres?.ok) {
    return {
      ok: false,
      message: pres?.message || "خطا در گرفتن لینک آپلود مدرک.",
    };
  }

  const up = await putFileToPresignedUrl(pres.uploadUrl, safeFile);

  if (!up?.ok) {
    return {
      ok: false,
      message: up?.message || "آپلود مدرک ناموفق بود.",
    };
  }

  return {
    ok: true,
    url: pres.publicUrl,
  };
}

function removeDocument(name) {
  setForm((prev) => ({
    ...prev,
    [name]: null,
  }));

  setDocumentPreviews((prev) => ({
    ...prev,
    [name]: "",
  }));
}

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.fatherName.trim()) {
  setMessage("❌ لطفاً نام پدر را وارد کنید.");
  return;
}

if (!form.birthCertificateNumber.trim()) {
  setMessage("❌ لطفاً شماره شناسنامه را وارد کنید.");
  return;
}

if (!form.education) {
  setMessage("❌ لطفاً میزان تحصیلات را انتخاب کنید.");
  return;
}

if (!form.maritalStatus) {
  setMessage("❌ لطفاً وضعیت تأهل را انتخاب کنید.");
  return;
}

if (!form.currentJob.trim()) {
  setMessage("❌ لطفاً شغل فعلی را وارد کنید.");
  return;
}

if (!form.postalCode.trim()) {
  setMessage("❌ لطفاً کد پستی را وارد کنید.");
  return;
}

if (!form.address.trim()) {
  setMessage("❌ لطفاً آدرس کامل را وارد کنید.");
  return;
}

if (!form.familiarWithGenino) {
  setMessage("❌ لطفاً مشخص کنید چگونه با ژنینو آشنا شده‌اید.");
  return;
}

if (!form.marketingExperience) {
  setMessage("❌ لطفاً سابقه فروش یا بازاریابی را مشخص کنید.");
  return;
}

if (!form.dailyVisitAbility) {
  setMessage("❌ لطفاً وضعیت امکان مراجعه حضوری را مشخص کنید.");
  return;
}

if (!form.successReason.trim()) {
  setMessage("❌ لطفاً توضیح دهید چرا سفیر موفقی خواهید بود.");
  return;
}

if (!form.personalPhoto) {
  setMessage("❌ لطفاً عکس پرسنلی را بارگذاری کنید.");
  return;
}

if (!form.nationalCardImage) {
  setMessage("❌ لطفاً تصویر کارت ملی را بارگذاری کنید.");
  return;
}

if (!form.birthCertificateImage) {
  setMessage("❌ لطفاً تصویر شناسنامه را بارگذاری کنید.");
  return;
}

if (!form.readRules) {
  setMessage("❌ لطفاً قوانین سفیران ژنینو را مطالعه و تأیید کنید.");
  return;
}

if (!form.acceptedTerms) {
  setMessage("❌ لطفاً صحت اطلاعات و شرایط همکاری را تأیید کنید.");
  return;
}

  setMessage("⏳ در حال ثبت‌نام سفیر...");

  setUploadingDocuments(true);

const personalPhotoUpload = await uploadAmbassadorDocument(
  "personalPhoto",
  form.personalPhoto
);

if (!personalPhotoUpload.ok) {
  setUploadingDocuments(false);
  setMessage(`❌ ${personalPhotoUpload.message}`);
  return;
}

const nationalCardUpload = await uploadAmbassadorDocument(
  "nationalCardImage",
  form.nationalCardImage
);

if (!nationalCardUpload.ok) {
  setUploadingDocuments(false);
  setMessage(`❌ ${nationalCardUpload.message}`);
  return;
}

const birthCertificateUpload = await uploadAmbassadorDocument(
  "birthCertificateImage",
  form.birthCertificateImage
);

if (!birthCertificateUpload.ok) {
  setUploadingDocuments(false);
  setMessage(`❌ ${birthCertificateUpload.message}`);
  return;
}

  const payload = {
    fatherName: form.fatherName,
    birthCertificateNumber: form.birthCertificateNumber,
    education: form.education,
    maritalStatus: form.maritalStatus,
    childrenCount: form.childrenCount,
    currentJob: form.currentJob,
    phone: form.phone,
    address: form.address,
    postalCode: form.postalCode,
    familiarWithGenino: form.familiarWithGenino,
    marketingExperience: form.marketingExperience,
    dailyVisitAbility: form.dailyVisitAbility,
    successReason: form.successReason,

    // فعلاً تا وقتی آپلود واقعی فایل را وصل نکردیم
    personalPhotoUrl: personalPhotoUpload.url,
    nationalCardImageUrl: nationalCardUpload.url,
    birthCertificateImageUrl: birthCertificateUpload.url,
  };

  const res = await registerAmbassador(payload);

  if (!res.ok) {
  setUploadingDocuments(false);
  setMessage(`❌ ${res.message || "خطا در ثبت‌نام سفیر"}`);
  return;
}

  setMessage("✅ ثبت‌نام سفیر با موفقیت انجام شد.");
  navigate("/dashboard-ambassador");
};

if (checkingAmbassador) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#fffdf8] px-4">
      <div className="rounded-3xl border border-yellow-200 bg-white p-6 text-center font-bold text-[#7a5217] shadow-xl">
        در حال بررسی وضعیت سفیر ژنینو...
      </div>
    </main>
  );
}


 

  return (
    <main className="min-h-screen bg-white px-4 py-8 text-stone-800">
      <section className="mx-auto max-w-5xl">
        <motion.div
          className="mb-6 rounded-[2rem] border border-yellow-200 bg-gradient-to-br from-white via-yellow-50/70 to-white p-6 shadow-xl shadow-yellow-900/5 sm:p-8"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <h1 className="mb-3 text-2xl font-extrabold text-[#7a5217]">
            ثبت‌نام سفیر ژنینو
          </h1>

          <p className="leading-8 text-stone-600">
            لطفاً اطلاعات خود را با دقت وارد کنید. پس از ثبت‌نام، داشبورد سفیران
            ژنینو و کد اختصاصی سفیر برای شما فعال خواهد شد.
          </p>
        </motion.div>

        <div className="mb-6 rounded-[2rem] border border-yellow-200 bg-yellow-50/40 p-5 shadow-lg">
  <h2 className="mb-4 text-lg font-black text-[#7a5217]">
    اطلاعات حساب ژنینو شما
  </h2>

  <div className="grid gap-3 sm:grid-cols-2">
    <InfoRow
  label="نام و نام خانوادگی"
  value={user?.fullName || `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "ثبت نشده"}
/>

<InfoRow
  label="کد ملی"
  value={user?.nationalCode || "ثبت نشده"}
/>

<InfoRow
  label="موبایل"
  value={user?.phone || "ثبت نشده"}
/>

<InfoRow
  label="ایمیل"
  value={user?.email || "ثبت نشده"}
/>

<InfoRow
  label="استان و شهر"
  value={`${user?.province || ""} ${user?.city || ""}`.trim() || "ثبت نشده"}
/>
  </div>

  <p className="mt-4 text-xs text-stone-500">
    این اطلاعات از حساب کاربری ژنینو شما دریافت می‌شود.
  </p>
</div>

        <form
  noValidate
  onSubmit={handleSubmit}
  className="rounded-[2rem] border border-yellow-200 bg-white p-5 shadow-xl shadow-yellow-900/5 sm:p-7"
>
          

          <SectionTitle title="اطلاعات فردی و شغلی" />

          <div className="grid gap-4 md:grid-cols-2">
            <Input
  label="نام پدر"
  name="fatherName"
  value={form.fatherName}
  onChange={handleChange}
  required
/>

<Input
  label="شماره شناسنامه"
  name="birthCertificateNumber"
  value={form.birthCertificateNumber}
  onChange={handleChange}
  required
/>
            <Select label="میزان تحصیلات" name="education" value={form.education} onChange={handleChange} required>
              <option value="">انتخاب کنید</option>
              <option value="زیر دیپلم">زیر دیپلم</option>
              <option value="دیپلم">دیپلم</option>
              <option value="فوق دیپلم">فوق دیپلم</option>
              <option value="کارشناسی">کارشناسی</option>
              <option value="کارشناسی ارشد">کارشناسی ارشد</option>
              <option value="دکتری و بالاتر">دکتری و بالاتر</option>
            </Select>

            <Select label="وضعیت تأهل" name="maritalStatus" value={form.maritalStatus} onChange={handleChange} required>
              <option value="">انتخاب کنید</option>
              <option value="مجرد">مجرد</option>
              <option value="متأهل">متأهل</option>
            </Select>

            <Input label="تعداد فرزندان" name="childrenCount" value={form.childrenCount} onChange={handleChange} type="number" min="0" placeholder="مثلاً ۰" />
            <Input label="شغل فعلی" name="currentJob" value={form.currentJob} onChange={handleChange} required placeholder="مثلاً دانشجو، خانه‌دار، فروشنده، آزاد..." />
          </div>

          <SectionTitle title="اطلاعات تماس و محل سکونت" />

          <div className="grid gap-4 md:grid-cols-2">

            <Input label="شماره تلفن ثابت" name="phone" value={form.phone} onChange={handleChange} placeholder="مثلاً 021xxxxxxxx" />
            
            <Input label="کد پستی" name="postalCode" value={form.postalCode} onChange={handleChange} required placeholder="۱۰ رقم" maxLength="10" />
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-extrabold text-[#7a5217]">
              آدرس کامل
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              rows="3"
              className="w-full rounded-2xl border border-yellow-200 bg-yellow-50/30 px-4 py-3 text-sm outline-none transition focus:border-yellow-400 focus:bg-white"
              placeholder="آدرس دقیق محل سکونت را وارد کنید..."
            />
          </div>

          <SectionTitle title="شناخت، تجربه و انگیزه همکاری" />

          <div className="grid gap-4 md:grid-cols-2">
            <Select label="چگونه با ژنینو آشنا شدید؟" name="familiarWithGenino" value={form.familiarWithGenino} onChange={handleChange} required>
              <option value="">انتخاب کنید</option>
              <option value="اینستاگرام">اینستاگرام</option>
              <option value="دوستان و آشنایان">دوستان و آشنایان</option>
              <option value="گوگل">گوگل</option>
              <option value="تبلیغات">تبلیغات</option>
              <option value="سفیر ژنینو">سفیر ژنینو</option>
              <option value="سایر">سایر</option>
            </Select>

            <Select label="آیا سابقه فروش یا بازاریابی دارید؟" name="marketingExperience" value={form.marketingExperience} onChange={handleChange} required>
              <option value="">انتخاب کنید</option>
              <option value="بله">بله</option>
              <option value="خیر">خیر</option>
              <option value="تا حدودی">تا حدودی</option>
            </Select>

            <Select label="آیا امکان مراجعه حضوری روزانه دارید؟" name="dailyVisitAbility" value={form.dailyVisitAbility} onChange={handleChange} required>
              <option value="">انتخاب کنید</option>
              <option value="بله">بله</option>
              <option value="خیر">خیر</option>
              <option value="بعضی روزها">بعضی روزها</option>
            </Select>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-extrabold text-[#7a5217]">
              چرا فکر می‌کنید سفیر موفقی خواهید بود؟
            </label>
            <textarea
              name="successReason"
              value={form.successReason}
              onChange={handleChange}
              required
              rows="5"
              className="w-full rounded-2xl border border-yellow-200 bg-yellow-50/30 px-4 py-3 text-sm outline-none transition focus:border-yellow-400 focus:bg-white"
              placeholder="درباره توانایی ارتباطی، انگیزه، شهر فعالیت، تجربه یا برنامه خود بنویسید..."
            />
          </div>

          <SectionTitle title="بارگذاری مدارک" />

          <div className="grid gap-4 md:grid-cols-3">
            <div>
  <FileInput
    label="آپلود عکس پرسنلی"
    name="personalPhoto"
    onChange={handleChange}
    required
  />

  {documentPreviews.personalPhoto && (
  <div className="relative mt-3 overflow-hidden rounded-2xl border border-yellow-200">
    <img
      src={documentPreviews.personalPhoto}
      alt="پیش نمایش عکس پرسنلی"
      className="h-40 w-full object-cover"
    />

    <button
      type="button"
      onClick={() => removeDocument("personalPhoto")}
      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-sm font-black text-red-600 shadow-md transition hover:bg-red-500 hover:text-white"
      title="حذف عکس"
    >
      ×
    </button>
  </div>
)}
</div>
            <div>
  <FileInput
    label="تصویر کارت ملی"
    name="nationalCardImage"
    onChange={handleChange}
    required
  />

  {documentPreviews.nationalCardImage && (
  <div className="relative mt-3 overflow-hidden rounded-2xl border border-yellow-200">
    <img
      src={documentPreviews.nationalCardImage}
      alt="پیش نمایش کارت ملی"
      className="h-40 w-full object-cover"
    />

    <button
      type="button"
      onClick={() => removeDocument("nationalCardImage")}
      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-sm font-black text-red-600 shadow-md transition hover:bg-red-500 hover:text-white"
      title="حذف عکس"
    >
      ×
    </button>
  </div>
)}
</div>

<div>
  <FileInput
    label="تصویر صفحه اول شناسنامه"
    name="birthCertificateImage"
    onChange={handleChange}
    required
  />

  {documentPreviews.birthCertificateImage && (
  <div className="relative mt-3 overflow-hidden rounded-2xl border border-yellow-200">
    <img
      src={documentPreviews.birthCertificateImage}
      alt="پیش نمایش شناسنامه"
      className="h-40 w-full object-cover"
    />

    <button
      type="button"
      onClick={() => removeDocument("birthCertificateImage")}
      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-sm font-black text-red-600 shadow-md transition hover:bg-red-500 hover:text-white"
      title="حذف عکس"
    >
      ×
    </button>
  </div>
)}
</div>
          </div>

          <div className="mt-6 space-y-4 rounded-2xl border border-yellow-200 bg-yellow-50/40 p-5">
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-7 text-stone-600">
              <input
                type="checkbox"
                name="readRules"
                checked={form.readRules}
                onChange={handleChange}
                required
                className="mt-2"
              />
              <span>
  <Link
    to="/genino-ambassadors/rules"
    className="font-extrabold text-[#7a5217] underline"
  >
    قوانین سفیران ژنینو
  </Link>{" "}
  را مطالعه کرده‌ام.
</span>
            </label>

            <label className="flex cursor-pointer items-start gap-3 text-sm leading-7 text-stone-600">
              <input
                type="checkbox"
                name="acceptedTerms"
                checked={form.acceptedTerms}
                onChange={handleChange}
                required
                className="mt-2"
              />
              <span>
                می‌پذیرم اطلاعات واردشده صحیح است و ژنینو می‌تواند در صورت
                تخلف، دریافت امتیاز پایین یا شکایت معتبر، کد سفیر من را محدود
                یا غیرفعال کند.
              </span>
            </label>
          </div>

          {message && (
  <p className="mt-5 rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-center text-sm font-bold text-[#7a5217]">
    {message}
  </p>
)}

          <button
  type="submit"
  disabled={uploadingDocuments}
  className={`mt-7 w-full rounded-2xl bg-gradient-to-l from-[#d4af37] to-[#b98522] px-7 py-4 font-extrabold text-white shadow-lg shadow-yellow-500/25 transition ${
    uploadingDocuments
      ? "cursor-not-allowed opacity-60"
      : "hover:-translate-y-1 hover:shadow-xl"
  }`}
>
  {uploadingDocuments
    ? "در حال آپلود مدارک و ثبت‌نام..."
    : "ثبت‌نام و دریافت کد سفیر ژنینو"}
</button>
        </form>
      </section>
    </main>
  );
}

function SectionTitle({ title }) {
  return (
    <div className="my-6 rounded-2xl bg-gradient-to-l from-[#d4af37]/10 to-[#b98522]/10 p-4">
      <h2 className="font-extrabold text-[#7a5217]">{title}</h2>
    </div>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  min,
  maxLength,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-extrabold text-[#7a5217]">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        maxLength={maxLength}
        className="w-full rounded-2xl border border-yellow-200 bg-yellow-50/30 px-4 py-3 text-sm outline-none transition focus:border-yellow-400 focus:bg-white"
      />
    </div>
  );
}

function Select({ label, name, value, onChange, required = false, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-extrabold text-[#7a5217]">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-2xl border border-yellow-200 bg-yellow-50/30 px-4 py-3 text-sm outline-none transition focus:border-yellow-400 focus:bg-white"
      >
        {children}
      </select>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="rounded-2xl border border-yellow-100 bg-white px-4 py-3">
      <div className="text-xs text-stone-500">{label}</div>
      <div className="mt-1 font-bold text-[#7a5217]">{value}</div>
    </div>
  );
}

function FileInput({ label, name, onChange, required = false }) {
  return (
    <div className="rounded-2xl border border-dashed border-yellow-300 bg-yellow-50/40 p-5">
      <label className="mb-2 block text-sm font-extrabold text-[#7a5217]">
        {label}
      </label>

      <input
        type="file"
        name={name}
        accept="image/*,.heic,.heif"
        onChange={onChange}
        required={required}
        className="w-full cursor-pointer rounded-xl border border-yellow-200 bg-white px-3 py-3 text-sm"
      />
    </div>
  );
}