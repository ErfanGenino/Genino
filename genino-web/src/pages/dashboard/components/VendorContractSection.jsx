// ============================================================================
// File: src/pages/dashboard/components/VendorContractSection.jsx
// Description: بخش قرارداد همکاری فروشنده در داشبورد ژنینو
// ============================================================================

export default function VendorContractSection({
  vendorContractItems,
  contractChecks,
  setContractChecks,
  isDocumentsLocked,
  needsVendorCorrection,
  allContractsAccepted,
  contractAccepted,
  setShowFinalContractConfirm,
}) {
  return (
    <div>
      <h3 className="text-lg font-black text-[#6f4a18]">
        قرارداد همکاری ژنینو
      </h3>

      <p className="mt-2 text-sm leading-7 text-stone-600">
        بندهای قرارداد را مطالعه و تأیید کنید.
      </p>

      <div className="mt-5 space-y-4">
        {vendorContractItems.map((item) => (
          <div
            key={item.key}
            className="rounded-xl border border-yellow-100 bg-white p-3"
          >
            <h4 className="text-sm font-black text-[#6f4a18]">
              {item.title}
            </h4>

            <p className="mt-1 text-xs leading-6 text-stone-600">
              {item.text}
            </p>

            <label className="mt-2 flex items-center gap-2 text-xs font-bold text-stone-700">
              <input
                type="checkbox"
                disabled={isDocumentsLocked}
                checked={!!contractChecks[item.key]}
                onChange={(e) =>
                  setContractChecks((prev) => ({
                    ...prev,
                    [item.key]: e.target.checked,
                  }))
                }
              />

              <span>خواندم و قبول دارم</span>
            </label>
          </div>
        ))}
      </div>

      <button
        type="button"
        disabled={
          !allContractsAccepted ||
          (isDocumentsLocked && !needsVendorCorrection)
        }
        onClick={() => {
          if (
            !allContractsAccepted ||
            (isDocumentsLocked && !needsVendorCorrection)
          ) {
            return;
          }

          setShowFinalContractConfirm(true);
        }}
        className={`mt-6 h-12 w-full rounded-2xl text-sm font-black shadow-lg transition ${
          allContractsAccepted && (!isDocumentsLocked || needsVendorCorrection)
            ? "bg-gradient-to-r from-[#7a5526] via-[#b88724] to-[#d4af37] text-white"
            : "cursor-not-allowed bg-stone-200 text-stone-400"
        }`}
      >
        {needsVendorCorrection
          ? "ارسال مجدد اصلاحات برای بررسی ژنینو"
          : contractAccepted || isDocumentsLocked
          ? "قرارداد ارسال شده و در انتظار بررسی ژنینو"
          : "پذیرش نهایی قرارداد"}
      </button>
    </div>
  );
}