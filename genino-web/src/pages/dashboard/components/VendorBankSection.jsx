// ============================================================================
// File: src/pages/dashboard/components/VendorBankSection.jsx
// Description: فرم اطلاعات بانکی و تسویه وجوه فروشنده در داشبورد ژنینو
// ============================================================================

export default function VendorBankSection({
  vendor,
  bankForm,
  setBankForm,
  bankInfoConfirmed,
  setBankInfoConfirmed,
  isDocumentsLocked,
  canEditBankInfo,
  updateVendorBankingInfo,
  setVendor,
  setDocumentsStep,
}) {
  const isBankSubmitDisabled =
    !bankForm.bankName.trim() ||
    !bankForm.accountNumber.trim() ||
    !bankForm.cardNumber.trim() ||
    !bankForm.shebaNumber.trim() ||
    !bankInfoConfirmed ||
    (isDocumentsLocked && !canEditBankInfo);

  const isBankLocked = isDocumentsLocked && !canEditBankInfo;

  const handleSubmitBankInfo = async () => {
    const res = await updateVendorBankingInfo(vendor.id, bankForm);

    if (!res?.ok) {
      alert(res?.message || "خطا در ذخیره اطلاعات بانکی");
      return;
    }

    setVendor(res.vendor);
    setDocumentsStep(2);
    alert("اطلاعات بانکی با موفقیت ذخیره شد.");
  };

  return (
    <div>
      <h3 className="text-lg font-black text-[#6f4a18]">
        اطلاعات حساب بانکی و تسویه وجوه
      </h3>

      <p className="mt-2 text-sm leading-7 text-stone-600">
        اطلاعات بانکی برای واریز سهم فروشنده از فروش‌ها استفاده می‌شود.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <input
          value={bankForm.bankName}
          disabled={isBankLocked}
          onChange={(e) =>
            setBankForm((prev) => ({
              ...prev,
              bankName: e.target.value,
            }))
          }
          placeholder="نام بانک *"
          className="h-12 rounded-2xl border border-yellow-200 bg-white px-4"
        />

        <input
          value={bankForm.accountNumber}
          disabled={isBankLocked}
          onChange={(e) =>
            setBankForm((prev) => ({
              ...prev,
              accountNumber: e.target.value,
            }))
          }
          placeholder="شماره حساب *"
          className="h-12 rounded-2xl border border-yellow-200 bg-white px-4"
        />

        <input
          value={bankForm.cardNumber}
          disabled={isBankLocked}
          onChange={(e) =>
            setBankForm((prev) => ({
              ...prev,
              cardNumber: e.target.value,
            }))
          }
          placeholder="شماره کارت *"
          className="h-12 rounded-2xl border border-yellow-200 bg-white px-4"
        />

        <div className="flex h-12 overflow-hidden rounded-2xl border border-yellow-200 bg-white">
          <input
            value={bankForm.shebaNumber}
            disabled={isBankLocked}
            maxLength={24}
            onChange={(e) =>
              setBankForm((prev) => ({
                ...prev,
                shebaNumber: e.target.value.replace(/\D/g, ""),
              }))
            }
            placeholder="شماره شبا بدون IR"
            className="flex-1 px-4 outline-none"
          />

          <div className="flex w-16 items-center justify-center border-r border-yellow-200 bg-[#fff8e8] font-black text-[#6f4a18]">
            IR
          </div>
        </div>
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm text-stone-700">
        <input
          type="checkbox"
          disabled={isBankLocked}
          checked={bankInfoConfirmed}
          onChange={(e) => setBankInfoConfirmed(e.target.checked)}
          className="mt-1"
        />

        <span>
          مسئولیت صحت اطلاعات بانکی واردشده بر عهده اینجانب است و وجوه تسویه
          به این حساب واریز خواهد شد.
        </span>
      </label>

      <button
        type="button"
        disabled={isBankSubmitDisabled}
        onClick={handleSubmitBankInfo}
        className={`mt-5 h-12 w-full rounded-2xl text-sm font-black ${
          isBankLocked
            ? "cursor-not-allowed bg-stone-200 text-stone-400"
            : "bg-gradient-to-r from-[#7a5526] via-[#b88724] to-[#d4af37] text-white"
        }`}
      >
        {isBankLocked ? "اطلاعات بانکی ثبت شده است" : "ذخیره اطلاعات بانکی و ادامه"}
      </button>
    </div>
  );
}