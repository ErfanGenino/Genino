// ============================================================================
// File: src/pages/dashboard/components/VendorDocumentsStepper.jsx
// Description: نمایش تب‌های مراحل تکمیل مدارک و قرارداد فروشنده
// ============================================================================

export default function VendorDocumentsStepper({
  documentsStep,
  setDocumentsStep,
  documentsCompleted,
  isDocumentsLocked,
}) {
  const tabs = ["اطلاعات بانکی", "بارگذاری مدارک", "قرارداد"];

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((title, index) => {
        const nextStep = index + 1;

        return (
          <button
            key={title}
            type="button"
            onClick={() => {
              if (nextStep === 3 && !documentsCompleted && !isDocumentsLocked) {
                alert("ابتدا همه مدارک الزامی را بارگذاری کنید.");
                return;
              }

              setDocumentsStep(nextStep);
            }}
            className={`rounded-2xl px-4 py-2 text-xs font-black ${
              documentsStep === nextStep
                ? "bg-[#d4af37] text-white"
                : "bg-[#fff8e8] text-[#7a5526]"
            }`}
          >
            {nextStep}. {title}
          </button>
        );
      })}
    </div>
  );
}