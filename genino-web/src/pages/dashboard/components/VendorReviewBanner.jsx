// src/pages/dashboard/components/VendorReviewBanner.jsx
export default function VendorReviewBanner({
  vendor,
  isVendorApproved,
  needsVendorCorrection,
  isVendorRejected,
  isVendorUnderReview,
  vendorReviewReason,
  vendorReviewStatus,
}) {
  if (!vendor) return null;

  return (
    <div
      className={`mt-4 rounded-2xl border px-4 py-3 text-sm font-bold leading-7 ${
        isVendorApproved
          ? "border-green-200 bg-green-50 text-green-700"
          : needsVendorCorrection
          ? "border-yellow-200 bg-yellow-50 text-yellow-800"
          : isVendorRejected
          ? "border-red-200 bg-red-50 text-red-700"
          : isVendorUnderReview
          ? "border-blue-200 bg-blue-50 text-blue-700"
          : "border-yellow-200 bg-yellow-50 text-yellow-800"
      }`}
    >
      {isVendorApproved && (
        <>
          ✅ فروشنده گرامی، مدارک و قرارداد شما تأیید شد و اجازه انتشار در ژنینو برای شما فعال شده است.
        </>
      )}

      {needsVendorCorrection && (
        <>
          ⚠️ درخواست اصلاح مدارک یا اطلاعات برای شما ثبت شده است.

          <div className="mt-2 rounded-xl bg-white/60 p-3 font-black">
            موردی که باید اصلاح شود:{" "}
            {vendorReviewReason || "توضیحی از طرف مدیریت ثبت نشده است."}
          </div>
        </>
      )}

      {isVendorRejected && (
        <>
          ❌ درخواست همکاری شما توسط مدیریت ژنینو رد شده است.

          <div className="mt-2 rounded-xl bg-white/60 p-3 font-black">
            دلیل رد درخواست:{" "}
            {vendorReviewReason || "دلیلی از طرف مدیریت ثبت نشده است."}
          </div>
        </>
      )}

      {isVendorUnderReview && (
        <>
          ⏳ مدارک و قرارداد شما برای بررسی نهایی به مدیریت ژنینو ارسال شده است.
        </>
      )}

      {!isVendorApproved &&
        !needsVendorCorrection &&
        !isVendorRejected &&
        !isVendorUnderReview && (
          <>وضعیت فعلی فروشنده: {vendorReviewStatus || "نامشخص"}</>
        )}
    </div>
  );
}