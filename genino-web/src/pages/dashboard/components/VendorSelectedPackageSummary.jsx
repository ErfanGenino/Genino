// ============================================================================
// File: src/pages/dashboard/components/VendorSelectedPackageSummary.jsx
// Description: نمایش خلاصه بسته همکاری انتخاب‌شده فروشنده
// ============================================================================

import { motion } from "framer-motion";

export default function VendorSelectedPackageSummary({
  packageConfirmed,
  selectedPackage,
  packagePrice,
  ambassadorConfirmed,
  ambassadorDiscount,
  remainingAfterAmbassador,
  discountInfo,
  discountAmount,
  finalPrice,
  ambassadorInfo,
  ambassadorCode,
}) {
  if (!packageConfirmed || !selectedPackage) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[2rem] border border-green-200 bg-green-50 p-5 shadow-sm"
    >
      <p className="text-sm font-black text-green-700">
        انتخاب بسته همکاری با موفقیت انجام شد.
      </p>

      <div className="mt-4 rounded-2xl border border-green-200 bg-white p-4">
        <h3 className="text-xl font-black text-[#6f4a18]">
          {selectedPackage.title}
        </h3>

        <div className="mt-4 rounded-2xl border border-amber-100 bg-[#fffaf0] p-4">
          <p className="font-black text-[#6f4a18]">
            مشخصات بسته همکاری
          </p>

          <div className="mt-3 grid gap-3 text-sm text-stone-700 sm:grid-cols-2 lg:grid-cols-4">
            <p>
              نام بسته:
              <span className="font-black"> {selectedPackage.title}</span>
            </p>

            <p>
              اعتبار:
              <span className="font-black">
                {" "}
                {selectedPackage.durationMonths} ماه
              </span>
            </p>

            <p>
              صفحه اختصاصی:
              <span className="font-black">
                {" "}
                {selectedPackage.hasDedicatedPage ? "دارد" : "ندارد"}
              </span>
            </p>

            {selectedPackage.targetType === "SHOP" ? (
              <p>
                تعداد پنجره:
                <span className="font-black">
                  {" "}
                  {selectedPackage.windowCount ?? "نامحدود"}
                </span>
              </p>
            ) : (
              <>
                <p>
                  مجوز دستاورد:
                  <span className="font-black">
                    {" "}
                    {selectedPackage.achievementLimit ?? "ندارد"}
                  </span>
                </p>

                <p>
                  کاربران مجاز:
                  <span className="font-black">
                    {" "}
                    {selectedPackage.allowedUserCount ?? "نامحدود"}
                  </span>
                </p>
              </>
            )}
          </div>

          {selectedPackage.description && (
            <p className="mt-3 text-sm text-stone-600">
              {selectedPackage.description}
            </p>
          )}
        </div>

        <div className="mt-4 space-y-3 text-sm text-stone-700">
          <div className="flex justify-between">
            <span>مبلغ بسته:</span>
            <span className="font-black">
              {packagePrice.toLocaleString("fa-IR")} ریال
            </span>
          </div>

          {ambassadorConfirmed && (
            <>
              <div className="flex justify-between text-green-700">
                <span>تخفیف سفیر:</span>
                <span className="font-black">
                  - {ambassadorDiscount.toLocaleString("fa-IR")} ریال
                </span>
              </div>

              <div className="flex justify-between">
                <span>باقیمانده پس از تخفیف سفیر:</span>
                <span className="font-black">
                  {remainingAfterAmbassador.toLocaleString("fa-IR")} ریال
                </span>
              </div>
            </>
          )}

          {discountInfo && (
            <div className="flex justify-between text-green-700">
              <span>تخفیف کد تخفیف ({discountInfo.percent}٪):</span>
              <span className="font-black">
                - {discountAmount.toLocaleString("fa-IR")} ریال
              </span>
            </div>
          )}

          <div className="border-t border-green-100 pt-3 flex justify-between text-lg font-black text-[#6f4a18]">
            <span>مبلغ پرداخت‌شده / قابل پرداخت:</span>
            <span>{finalPrice.toLocaleString("fa-IR")} ریال</span>
          </div>
        </div>

        {ambassadorConfirmed && ambassadorInfo && (
          <div className="mt-5 rounded-2xl border border-yellow-100 bg-[#fffaf0] p-4">
            <p className="font-black text-[#6f4a18]">
              اطلاعات سفیر معرفی‌کننده
            </p>

            <div className="mt-3 grid gap-3 text-sm text-stone-700 sm:grid-cols-3">
              <p>
                کد سفیر:{" "}
                <span className="font-black">
                  {ambassadorCode || "-"}
                </span>
              </p>

              <p>
                نام سفیر:{" "}
                <span className="font-black">
                  {ambassadorInfo.name || "-"}
                </span>
              </p>

              <p>
                شماره تماس:{" "}
                <span className="font-black">
                  {ambassadorInfo.phone || ambassadorInfo.mobile || "-"}
                </span>
              </p>
            </div>
          </div>
        )}

        <p className="mt-4 text-sm leading-7 text-stone-600">
          مرحله انتخاب بسته همکاری تکمیل شد. اکنون وارد مرحله تکمیل مدارک و قرارداد شده‌اید.
        </p>
      </div>
    </motion.section>
  );
}