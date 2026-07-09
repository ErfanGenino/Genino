// ============================================================================
// File: src/pages/dashboard/components/VendorFinalContractModal.jsx
// Description: مودال تأیید نهایی ارسال مدارک و قرارداد فروشنده
// ============================================================================

export default function VendorFinalContractModal({
  show,
  onClose,
  onConfirm,
  loading = false,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-5 text-right shadow-2xl">
        <h3 className="text-lg font-black text-[#6f4a18]">
          تأیید نهایی ارسال مدارک و قرارداد
        </h3>

        <p className="mt-4 text-sm leading-7 text-stone-600">
          با تأیید نهایی، مدارک و قرارداد شما برای بررسی به ژنینو ارسال می‌شود.
          تا زمان بررسی و اعلام پاسخ از طرف ژنینو، امکان حذف یا ویرایش مدارک و
          اطلاعات وجود نخواهد داشت.
        </p>

        <p className="mt-3 text-sm font-black text-red-600">
          آیا از ارسال نهایی مطمئن هستید؟
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="h-11 rounded-2xl border border-stone-200 bg-white text-sm font-black text-stone-600"
          >
            انصراف
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="h-11 rounded-2xl bg-gradient-to-r from-[#7a5526] via-[#b88724] to-[#d4af37] text-sm font-black text-white disabled:opacity-60"
          >
            {loading ? "در حال ارسال..." : "بله، ارسال نهایی"}
          </button>
        </div>
      </div>
    </div>
  );
}