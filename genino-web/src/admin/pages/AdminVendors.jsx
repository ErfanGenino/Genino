import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Clock, Store, Search } from "lucide-react";
import {
  getAdminVendors,
  getVendorReviewHistory,
  approveAdminVendor,
  requestCorrectionAdminVendor,
  rejectAdminVendor,
} from "../../services/api";
import {
  vendorDocumentLabels,
  vendorCorrectionFields,
} from "../../constants/vendorDocumentLabels";



const sampleVendors = [];

export default function AdminVendors() {
  const [vendors, setVendors] = useState(sampleVendors);
  const [filter, setFilter] = useState("pending");
  const [search, setSearch] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [correctionFields, setCorrectionFields] = useState([]);
  const [reviewHistory, setReviewHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const getVendorUiStatus = (vendor) => {
  if (
  vendor.accountStatus === "NEEDS_CORRECTION" ||
  vendor.reviewStatus === "NEEDS_CORRECTION"
) {
  return "correction";
}

if (
  vendor.accountStatus === "CONTRACT_AND_DOCUMENTS_SUBMITTED" ||
  vendor.accountStatus === "UNDER_REVIEW" ||
  vendor.reviewStatus === "UNDER_REVIEW"
) {
  return "pending";
}

  if (
  vendor.accountStatus === "APPROVED" ||
  vendor.accountStatus === "ACTIVE" ||
  vendor.reviewStatus === "APPROVED"
) {
  return "approved";
}

  if (
    vendor.accountStatus === "REJECTED" ||
    vendor.reviewStatus === "REJECTED"
  ) {
    return "rejected";
  }

  if (vendor.accountStatus === "SUSPENDED") {
    return "suspended";
  }

  return "pending";
};

  const filteredVendors = vendors.filter((vendor) => {
    const matchesFilter =
  filter === "all" || getVendorUiStatus(vendor) === filter;

    const text = `${vendor.businessName || ""} ${vendor.managerName || ""} ${
      vendor.phone || ""
    }`;

    return matchesFilter && text.includes(search);
  });


  const pendingCount = vendors.filter(
  (vendor) => getVendorUiStatus(vendor) === "pending"
).length;

const approvedCount = vendors.filter(
  (vendor) => getVendorUiStatus(vendor) === "approved"
).length;

const rejectedCount = vendors.filter(
  (vendor) => getVendorUiStatus(vendor) === "rejected"
).length;

const correctionCount = vendors.filter(
  (vendor) => getVendorUiStatus(vendor) === "correction"
).length;
  

  useEffect(() => {
  loadVendors();
}, []);

async function loadVendors() {
  try {
    const res = await getAdminVendors();

    if (res.ok) {
      setVendors(res.vendors || []);
    }
  } catch (err) {
    console.error(err);
  }
}

async function openVendorModal(vendor) {
  setSelectedVendor(vendor);

  try {
    setHistoryLoading(true);

    const res = await getVendorReviewHistory(vendor.id);

    if (res.ok) {
      setReviewHistory(res.history || []);
    } else {
      setReviewHistory([]);
    }
  } catch (err) {
    console.error(err);
    setReviewHistory([]);
  } finally {
    setHistoryLoading(false);
  }
}

async function handleApproveVendor() {
  if (!selectedVendor?.id) return;

  const confirmed = window.confirm(
    "آیا از تأیید نهایی این فروشنده مطمئن هستید؟ بعد از تأیید، اجازه انتشار برای فروشنده فعال می‌شود."
  );

  if (!confirmed) return;

  try {
    setActionLoading(true);

    const res = await approveAdminVendor(selectedVendor.id);

    if (!res.ok) {
      alert(res.message || "خطا در تأیید فروشنده");
      return;
    }

    await loadVendors();

    setSelectedVendor(null);
    setCorrectionFields([]);
    setReviewHistory([]);
    alert("فروشنده با موفقیت تأیید شد.");
  } catch (err) {
    console.error(err);
    alert("خطا در تأیید فروشنده");
  } finally {
    setActionLoading(false);
  }
}

async function handleRequestCorrection() {
  if (!selectedVendor?.id) return;

  if (correctionFields.length === 0) {
    alert("لطفاً حداقل یک بخش را برای اصلاح انتخاب کنید.");
    return;
  }

  const reason = window.prompt(
    "توضیح درخواست اصلاح را وارد کنید:"
  );

  if (!reason || !reason.trim()) return;

  try {
    setActionLoading(true);

    const res = await requestCorrectionAdminVendor(
      selectedVendor.id,
      reason,
      correctionFields
    );

    if (!res.ok) {
      alert(res.message || "خطا در ثبت درخواست اصلاح");
      return;
    }

    await loadVendors();

setSelectedVendor(null);
setCorrectionFields([]);
setReviewHistory([]);

alert("درخواست اصلاح برای فروشنده ثبت شد.");
  } catch (err) {
    console.error(err);
    alert("خطا در ثبت درخواست اصلاح");
  } finally {
    setActionLoading(false);
  }
}

async function handleRejectVendor() {
  if (!selectedVendor?.id) return;

  const reason = window.prompt(
    "علت رد فروشنده را وارد کنید:"
  );

  if (!reason || !reason.trim()) return;

  const confirmed = window.confirm(
    "آیا از رد این فروشنده مطمئن هستید؟"
  );

  if (!confirmed) return;

  try {
    setActionLoading(true);

    const res = await rejectAdminVendor(
      selectedVendor.id,
      reason
    );

    if (!res.ok) {
      alert(res.message || "خطا در رد فروشنده");
      return;
    }

    await loadVendors();

setSelectedVendor(null);
setCorrectionFields([]);
setReviewHistory([]);

    alert("فروشنده رد شد.");
  } catch (err) {
    console.error(err);
    alert("خطا در رد فروشنده");
  } finally {
    setActionLoading(false);
  }
}




  return (
    <div className="min-h-screen bg-[#f8f1e7] px-4 py-6 text-right text-stone-800" dir="rtl">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-xl shadow-amber-900/10">
          <div className="bg-gradient-to-br from-[#fff8e8] via-white to-[#f8f1e7] p-6">
            <span className="inline-flex rounded-full border border-yellow-300 bg-yellow-50 px-4 py-2 text-xs font-black text-yellow-800">
              مدیریت فروشندگان ژنینو
            </span>

            <h1 className="mt-4 text-2xl font-black text-[#6f4a18]">
              بررسی مدارک، قرارداد و وضعیت فروشندگان
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600">
              در این بخش فروشندگانی که مدارک و قرارداد خود را ارسال کرده‌اند
              نمایش داده می‌شوند و ادمین می‌تواند پس از بررسی، آن‌ها را تأیید کند، درخواست اصلاح بدهد یا رد کند.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-[1.5rem] border border-yellow-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-stone-500">در انتظار بررسی</p>
                <p className="mt-2 text-2xl font-black text-[#6f4a18]">{pendingCount.toLocaleString("fa-IR")}</p>
              </div>
              <Clock className="h-9 w-9 text-amber-500" />
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-green-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-stone-500">تأیید شده</p>
                <p className="mt-2 text-2xl font-black text-green-700">{approvedCount.toLocaleString("fa-IR")}</p>
              </div>
              <CheckCircle2 className="h-9 w-9 text-green-600" />
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-yellow-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-stone-500">
                  درخواست اصلاح
                </p>

                <p className="mt-2 text-2xl font-black text-yellow-600">
                  {correctionCount.toLocaleString("fa-IR")}
                </p>
              </div>

            <Clock className="h-9 w-9 text-yellow-500" />
          </div>
        </div>

          <div className="rounded-[1.5rem] border border-red-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-stone-500">رد شده</p>
                <p className="mt-2 text-2xl font-black text-red-600">{rejectedCount.toLocaleString("fa-IR")}</p>
              </div>
              <XCircle className="h-9 w-9 text-red-500" />
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-yellow-100 bg-white p-5 shadow-xl shadow-amber-900/10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {[
                { key: "pending", label: "در انتظار بررسی" },
                { key: "approved", label: "تأیید شده" },
                { key: "correction", label: "درخواست اصلاح" },
                { key: "rejected", label: "رد شده" },
                { key: "all", label: "همه فروشندگان" },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setFilter(item.key)}
                  className={`rounded-2xl px-4 py-2 text-xs font-black transition ${
                    filter === item.key
                      ? "bg-[#d4af37] text-white"
                      : "bg-[#fff8e8] text-[#7a5526]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="جستجو نام فروشگاه، مدیر یا موبایل..."
                className="h-11 w-full rounded-2xl border border-yellow-100 bg-[#fffaf0] pr-10 pl-4 text-sm outline-none focus:border-[#d4af37] lg:w-80"
              />
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-yellow-100">
            {filteredVendors.length === 0 ? (
              <div className="flex min-h-[220px] flex-col items-center justify-center bg-[#fffaf0] p-6 text-center">
                <Store className="h-12 w-12 text-amber-400" />
                <p className="mt-4 text-sm font-black text-[#6f4a18]">
                  هنوز فروشنده‌ای در این وضعیت وجود ندارد.
                </p>
                <p className="mt-2 text-xs text-stone-500">
                  پس از ارسال مدارک و قرارداد توسط فروشنده، اطلاعات او در این بخش نمایش داده می‌شود.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-yellow-100">
                {filteredVendors.map((vendor) => {
  const uiStatus = getVendorUiStatus(vendor);

  return (
    <div
      key={vendor.id}
      className="bg-white p-5 transition hover:bg-[#fffaf0]"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-black text-[#6f4a18]">
              {vendor.businessName}
            </h3>

            <span
              className={`rounded-full px-3 py-1 text-[11px] font-black ${
                uiStatus === "pending"
                  ? "bg-yellow-50 text-yellow-700"
                  : uiStatus === "approved"
                  ? "bg-green-100 text-green-700"
                  : uiStatus === "correction"
                  ? "bg-yellow-50 text-yellow-700"
                  : uiStatus === "rejected"
                  ? "bg-red-50 text-red-700"
                  : "bg-stone-100 text-stone-600"
              }`}
            >
              {uiStatus === "pending"
                ? "در انتظار بررسی"
                : uiStatus === "approved"
                ? "تأیید شده"
                : uiStatus === "correction"
                ? "درخواست اصلاح"
                : uiStatus === "rejected"
                ? "رد شده"
                : "تعلیق شده"}
            </span>
          </div>

          <div className="mt-3 grid gap-2 text-xs text-stone-600 sm:grid-cols-2 lg:grid-cols-4">
            <p>
              مدیر/نماینده:{" "}
              <span className="font-black text-stone-800">
                {vendor.managerName ||
                  `${vendor.firstName || ""} ${vendor.lastName || ""}`.trim() ||
                  "-"}
              </span>
            </p>

            <p>
              شهر:{" "}
              <span className="font-black text-stone-800">
                {vendor.province || "-"} / {vendor.city || "-"}
              </span>
            </p>

            <p>
              نوع فعالیت:{" "}
              <span className="font-black text-stone-800">
                {vendor.activityType === "product"
                  ? "فروش کالا"
                  : vendor.activityType === "service"
                  ? "ارائه خدمات"
                  : "کالا و خدمات"}
              </span>
            </p>

            <p>
              بسته:{" "}
              <span className="font-black text-stone-800">
                {vendor.selectedPackageTitle || "-"}
              </span>
            </p>
          </div>

          <div className="mt-3 grid gap-2 text-xs text-stone-600 sm:grid-cols-2 lg:grid-cols-4">
            <p>
              سفیر:{" "}
              <span className="font-black text-stone-800">
                {vendor.selectedAmbassadorName || "-"}
              </span>
            </p>

            <p>
              موبایل:{" "}
              <span className="font-black text-stone-800">
                {vendor.phone || "-"}
              </span>
            </p>

            <p>
              وضعیت مدارک:{" "}
              <span className="font-black text-stone-800">
                {vendor.documentsStatus || "-"}
              </span>
            </p>

            <p>
              تعداد مدارک:{" "}
              <span className="font-black text-stone-800">
                {(vendor.documents || []).length.toLocaleString("fa-IR")}
              </span>
            </p>
          </div>
        </div>

        <button
  type="button"
  onClick={() => openVendorModal(vendor)}
  className="h-11 rounded-2xl border border-yellow-200 bg-[#fff8e8] px-5 text-xs font-black text-[#7a5526] transition hover:bg-yellow-100"
>
  مشاهده و بررسی
</button>
      </div>
    </div>
  );
})}
              </div>
            )}
          </div>
        </section>

        {selectedVendor && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
    <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-yellow-100 p-6">
        <div>
          <h2 className="text-xl font-black text-[#6f4a18]">
            بررسی فروشنده
          </h2>

          <p className="mt-1 text-sm text-stone-500">
            {selectedVendor.businessName}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setSelectedVendor(null);
            setCorrectionFields([]);
            setReviewHistory([]);
          }}
          className="rounded-xl bg-red-50 px-4 py-2 text-sm font-black text-red-600 hover:bg-red-100"
        >
          بستن
        </button>
      </div>

      <div className="space-y-5 p-6">
  <section className="rounded-2xl border border-yellow-100 bg-[#fffaf0] p-4">
    <h3 className="mb-4 text-sm font-black text-[#6f4a18]">
      اطلاعات فروشنده
    </h3>

    <div className="grid gap-3 text-sm text-stone-700 md:grid-cols-2 lg:grid-cols-3">
      <p>نام کسب‌وکار: <span className="font-black">{selectedVendor.businessName || "-"}</span></p>
      <p>نوع شخص: <span className="font-black">{selectedVendor.personType === "legal" ? "حقوقی" : "حقیقی"}</span></p>
      <p>مدیر/نماینده: <span className="font-black">{selectedVendor.managerName || `${selectedVendor.firstName || ""} ${selectedVendor.lastName || ""}`.trim() || "-"}</span></p>
      <p>موبایل: <span className="font-black">{selectedVendor.phone || "-"}</span></p>
      <p>ایمیل: <span className="font-black">{selectedVendor.email || "-"}</span></p>
      <p>شهر: <span className="font-black">{selectedVendor.province || "-"} / {selectedVendor.city || "-"}</span></p>
    </div>
  </section>

  <section className="rounded-2xl border border-green-100 bg-green-50 p-4">
    <h3 className="mb-4 text-sm font-black text-green-700">
      بسته همکاری
    </h3>

    <div className="grid gap-3 text-sm text-stone-700 md:grid-cols-2 lg:grid-cols-3">
      <p>نام بسته: <span className="font-black">{selectedVendor.selectedPackageTitle || "-"}</span></p>
      <p>مبلغ اصلی: <span className="font-black">{(selectedVendor.selectedPackagePrice || 0).toLocaleString("fa-IR")} ریال</span></p>
      <p>مبلغ نهایی: <span className="font-black">{(selectedVendor.selectedPackageFinalPrice || 0).toLocaleString("fa-IR")} ریال</span></p>
    </div>
  </section>

  <section className="rounded-2xl border border-yellow-100 bg-white p-4">
    <h3 className="mb-4 text-sm font-black text-[#6f4a18]">
      اطلاعات بانکی
    </h3>

    <div className="grid gap-3 text-sm text-stone-700 md:grid-cols-2">
      <p>نام بانک: <span className="font-black">{selectedVendor.bankName || "-"}</span></p>
      <p>شماره حساب: <span className="font-black">{selectedVendor.accountNumber || "-"}</span></p>
      <p>شماره کارت: <span className="font-black">{selectedVendor.cardNumber || "-"}</span></p>
      <p>شماره شبا: <span className="font-black">{selectedVendor.shebaNumber || "-"}</span></p>
    </div>
  </section>

  <section className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
    <h3 className="mb-4 text-sm font-black text-blue-700">
      سفیر معرفی‌کننده
    </h3>

    <div className="grid gap-3 text-sm text-stone-700 md:grid-cols-3">
      <p>کد سفیر: <span className="font-black">{selectedVendor.selectedAmbassadorCode || "-"}</span></p>
      <p>نام سفیر: <span className="font-black">{selectedVendor.selectedAmbassadorName || "-"}</span></p>
      <p>موبایل سفیر: <span className="font-black">{selectedVendor.selectedAmbassadorPhone || "-"}</span></p>
    </div>
  </section>

  <section className="rounded-2xl border border-stone-100 bg-stone-50 p-4">
    <h3 className="mb-4 text-sm font-black text-stone-700">
      مدارک بارگذاری‌شده
    </h3>

    <div className="grid gap-3 md:grid-cols-2">
      {(selectedVendor.documents || []).length === 0 ? (
        <p className="text-sm text-stone-500">مدرکی ثبت نشده است.</p>
      ) : (
        selectedVendor.documents.map((doc) => (
          <a
            key={doc.id}
            href={doc.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-stone-200 bg-white p-3 text-sm font-black text-[#6f4a18] underline"
          >
           مشاهده مدرک: {vendorDocumentLabels[doc.type] || doc.type}
          </a>
        ))
      )}
    </div>
  </section>
  <section className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
  <h3 className="mb-4 text-sm font-black text-indigo-700">
    تاریخچه بررسی‌ها
  </h3>

  {historyLoading ? (
    <p className="text-sm text-stone-500">
      در حال دریافت تاریخچه...
    </p>
  ) : reviewHistory.length === 0 ? (
    <p className="text-sm text-stone-500">
      هنوز سابقه‌ای ثبت نشده است.
    </p>
  ) : (
    <div className="space-y-4">
      {reviewHistory.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border border-indigo-100 bg-white p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-black ${
                item.action === "APPROVED"
                  ? "bg-green-100 text-green-700"
                  : item.action === "REJECTED"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {item.action === "APPROVED"
                ? "تأیید شد"
                : item.action === "REJECTED"
                ? "رد شد"
                : "درخواست اصلاح"}
            </span>

            <span className="text-xs text-stone-500">
              {new Date(item.createdAt).toLocaleString("fa-IR")}
            </span>
          </div>

          <p className="mt-3 text-sm leading-7 text-stone-700">
            {item.message}
          </p>

          {item.correctionFields?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {item.correctionFields.map((field) => (
                <span
                  key={field}
                  className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-bold text-yellow-700"
                >
                  {vendorDocumentLabels[field] || field}
                </span>
              ))}
            </div>
          )}

          <div className="mt-3 text-xs text-stone-500">
            مدیر:
            <span className="font-black mr-1">
              {item.admin?.fullName ||
                item.admin?.username ||
                "سیستم"}
            </span>
          </div>
        </div>
      ))}
    </div>
  )}
</section>
  <section className="rounded-2xl border border-green-100 bg-green-50 p-4">
  <h3 className="mb-3 text-sm font-black text-green-700">
    نتیجه بررسی
  </h3>

  <p className="mb-4 text-sm leading-7 text-stone-600">
    در صورت تأیید، فروشنده اجازه انتشار محصولات یا خدمات خود را در ژنینو دریافت می‌کند.
  </p>

  <div className="mb-4 rounded-2xl border border-yellow-200 bg-yellow-50 p-4">
  <p className="mb-3 text-sm font-black text-yellow-800">
    مشخص کنید کدام بخش باید اصلاح شود:
  </p>

  <div className="flex flex-wrap gap-3">
  {vendorCorrectionFields.map((key) => (
    <label
      key={key}
      className="inline-flex items-center gap-2 text-sm font-bold text-stone-700"
    >
      <input
        type="checkbox"
        checked={correctionFields.includes(key)}
        onChange={(e) => {
          setCorrectionFields((prev) =>
            e.target.checked
              ? [...prev, key]
              : prev.filter((x) => x !== key)
          );
        }}
      />

      {vendorDocumentLabels[key] || key}
    </label>
  ))}
</div>
  
</div>

  <div className="grid gap-3 md:grid-cols-3">
  <button
    type="button"
    disabled={actionLoading}
    onClick={handleApproveVendor}
    className="h-12 rounded-2xl bg-green-600 text-sm font-black text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-stone-300"
  >
    {actionLoading ? "در حال ثبت..." : "تأیید فروشنده"}
  </button>

  <button
    type="button"
    disabled={actionLoading}
    onClick={handleRequestCorrection}
    className="h-12 rounded-2xl bg-yellow-500 text-sm font-black text-white transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:bg-stone-300"
  >
    درخواست اصلاح
  </button>

  <button
  type="button"
  disabled={actionLoading}
  onClick={handleRejectVendor}
  className="h-12 rounded-2xl bg-red-600 text-sm font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-stone-300"
>
  رد فروشنده
</button>
</div>
</section>
</div>
    </div>
  </div>
)}

      </div>
    </div>
  );
}