// ============================================================================
// File: src/pages/dashboard/components/VendorDocumentsHeader.jsx
// Description: هدر بخش مدارک و قرارداد فروشنده در داشبورد ژنینو
// ============================================================================

import { motion } from "framer-motion";

export default function VendorDocumentsHeader({
  documentsAndContractSubmitted,
  packageConfirmed,
  setShowDocumentsStep,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 }}
      className="rounded-[2rem] border border-yellow-200 bg-gradient-to-br from-[#fff8e8] to-white p-5 shadow-xl shadow-amber-900/10"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-black text-[#6f4a18]">
            {documentsAndContractSubmitted
              ? "مدارک و قرارداد ارسال شده"
              : "تکمیل مدارک و قرارداد"}
          </h2>

          <p className="mt-2 text-sm text-stone-600">
            {documentsAndContractSubmitted
              ? "مدارک و قرارداد شما برای بررسی نهایی به ژنینو ارسال شده است."
              : "مدارک و اطلاعات مورد نیاز را برای بررسی و تأیید ارسال کنید."}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowDocumentsStep((prev) => !prev)}
          disabled={!packageConfirmed}
          className={`flex h-12 items-center justify-center gap-2 rounded-2xl px-6 text-sm font-black transition ${
            packageConfirmed
              ? "bg-gradient-to-r from-[#7a5526] via-[#b88724] to-[#d4af37] text-white shadow-lg shadow-yellow-700/20"
              : "border border-yellow-200 bg-white text-stone-400"
          }`}
        >
          {documentsAndContractSubmitted
            ? "مشاهده مدارک و قرارداد"
            : packageConfirmed
            ? "تکمیل مدارک و قرارداد"
            : "پس از انتخاب بسته فعال می‌شود"}
        </button>
      </div>
    </motion.section>
  );
}