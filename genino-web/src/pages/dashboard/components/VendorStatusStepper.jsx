// ============================================================================
// File: src/pages/dashboard/components/VendorStatusStepper.jsx
// Description: نمایش نوار مراحل فعال‌سازی فروشنده
// ============================================================================

export default function VendorStatusStepper({
  steps,
  isVendorApproved,
  contractAccepted,
  packageConfirmed,
}) {
  return (
    <div className="mt-7">
      <div className="relative h-2 rounded-full bg-yellow-100">
        <div
          className={`absolute right-0 top-0 h-2 rounded-full bg-gradient-to-l from-[#d4af37] to-[#9a6a20] transition-all duration-500 ${
            isVendorApproved
              ? "w-full"
              : contractAccepted
              ? "w-3/4"
              : packageConfirmed
              ? "w-2/4"
              : "w-1/4"
          }`}
        />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 text-center">
        {steps.map((step, index) => (
          <div key={step.title} className="flex flex-col items-center gap-2">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-black shadow-sm ${
                step.done
                  ? "bg-gradient-to-br from-[#b88724] to-[#d4af37] text-white"
                  : step.active
                  ? "border-2 border-[#d4af37] bg-white text-[#9a6a20]"
                  : "bg-white text-stone-400"
              }`}
            >
              {index + 1}
            </div>

            <p
              className={`text-[11px] font-black leading-5 sm:text-xs ${
                step.done || index === 1
                  ? "text-[#6f4a18]"
                  : "text-stone-400"
              }`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}