// ============================================================================
// File: src/pages/dashboard/components/VendorDashboardMessage.jsx
// Description: نمایش پیام‌های موفقیت و خطا در داشبورد فروشنده
// ============================================================================

export default function VendorDashboardMessage({
  successMessage,
  errorMessage,
}) {
  return (
    <>
      {successMessage && (
        <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
          {errorMessage}
        </div>
      )}
    </>
  );
}