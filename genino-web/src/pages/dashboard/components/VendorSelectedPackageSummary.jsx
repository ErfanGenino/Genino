// ============================================================================
// File: src/pages/dashboard/components/VendorSelectedPackageSummary.jsx
// Description: نمایش خلاصه بسته همکاری انتخاب‌شده فروشنده
// ============================================================================

import { motion } from "framer-motion";

export default function VendorSelectedPackageSummary({
  vendor,
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

  /*
 * تشخیص مقاوم نوع فعالیت
 * ممکن است نوع فعالیت از بک‌اند به شکل‌های زیر برسد:
 * product / service / both
 * SHOP / SERVICE / BOTH
 */
const normalizedVendorActivityType = String(
  vendor?.activityType || ""
)
  .trim()
  .toUpperCase();

const normalizedPackageTargetType = String(
  selectedPackage?.targetType || ""
)
  .trim()
  .toUpperCase();

/*
 * ابتدا نوع فعالیت خود وندور ملاک است.
 * اگر خالی بود، از نوع بسته استفاده می‌کنیم.
 */
const resolvedActivityType =
  normalizedVendorActivityType || normalizedPackageTargetType;

const isProductProvider =
  resolvedActivityType === "PRODUCT" ||
  resolvedActivityType === "SHOP";

const isServiceProvider =
  resolvedActivityType === "SERVICE";

const isBothProvider =
  resolvedActivityType === "BOTH";

const hasProductActivity =
  isProductProvider || isBothProvider;

const hasServiceActivity =
  isServiceProvider || isBothProvider;

/*
 * تعداد ماه‌های اعتبار بسته
 * چند نام احتمالی را پوشش می‌دهیم تا اطلاعات واقعی بسته نمایش داده شود.
 */
const rawDurationMonths =
  selectedPackage?.durationMonths ??
  selectedPackage?.validityMonths ??
  selectedPackage?.duration ??
  selectedPackage?.months ??
  vendor?.selectedPackageDurationMonths ??
  0;

const durationMonths = Number(rawDurationMonths) || 0;

/*
 * قانون ژنینو:
 * ارائه‌دهنده کالا و ارائه‌دهنده هر دو، همیشه صفحه اختصاصی دارند.
 * ارائه‌دهنده صرفاً خدمات، بر اساس مشخصات بسته بررسی می‌شود.
 */
const servicePackageHasDedicatedPage =
  selectedPackage?.hasDedicatedPage === true ||
  selectedPackage?.hasDedicatedPage === 1 ||
  selectedPackage?.hasDedicatedPage === "true";

const hasDedicatedPage = hasProductActivity
  ? true
  : servicePackageHasDedicatedPage;



    const calculatedDiscountPercent =
  discountInfo &&
  remainingAfterAmbassador > 0
    ? Math.round(
        (discountAmount / remainingAfterAmbassador) * 100
      )
    : 0;

const displayedDiscountPercent =
  Number(discountInfo?.percent) > 0
    ? Number(discountInfo.percent)
    : calculatedDiscountPercent;





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
              <span className="font-black">
                {" "}
                {selectedPackage.title}
              </span>
            </p>

            {selectedPackage?.serviceCategory && (
  <p>
    نوع خدمت:
    <span className="font-black text-amber-700">
      {" "}
      {selectedPackage.serviceCategory.title}
    </span>
  </p>
)}

            <p>
              اعتبار:
              <span className="font-black">
                {" "}
                {durationMonths
                  ? `${durationMonths.toLocaleString("fa-IR")} ماه`
                  : "ثبت نشده"}
              </span>
            </p>

            <p>
              صفحه اختصاصی:
              <span
                className={
                  hasDedicatedPage
                    ? "font-black text-green-700"
                    : "font-black text-stone-500"
                }
              >
                {" "}
                {hasDedicatedPage ? "دارد" : "ندارد"}
              </span>
            </p>

            {/* اطلاعات مربوط به فروش کالا */}
            <p>
  تعداد پنجره فروش:
  <span className="font-black">
    {" "}
    {selectedPackage?.windowCount !== null &&
    selectedPackage?.windowCount !== undefined
      ? Number(selectedPackage.windowCount).toLocaleString("fa-IR")
      : "ثبت نشده"}
  </span>
</p>

            {/* اطلاعات مربوط به ارائه خدمات */}
            {hasServiceActivity && (
              <>
                <p>
  مجوز دستاورد:
  <span className="font-black">
    {" "}
    {selectedPackage?.achievementLimit !== null &&
    selectedPackage?.achievementLimit !== undefined
      ? Number(selectedPackage.achievementLimit).toLocaleString("fa-IR")
      : "ثبت نشده"}
  </span>
</p>

                <p>
                  کاربران مجاز:
                  <span className="font-black">
                    {" "}
                    {selectedPackage.allowedUserCount !== null &&
                    selectedPackage.allowedUserCount !== undefined
                      ? selectedPackage.allowedUserCount.toLocaleString("fa-IR")
                      : "نامحدود"}
                  </span>
                </p>
              </>
            )}
          </div>

          {selectedPackage.description && (
            <p className="mt-3 text-sm leading-7 text-stone-600">
              {selectedPackage.description}
            </p>
          )}
        </div>

        <div className="mt-4 space-y-3 text-sm text-stone-700">
          <div className="flex justify-between gap-3">
            <span>مبلغ بسته:</span>

            <span className="font-black">
              {(packagePrice || 0).toLocaleString("fa-IR")} ریال
            </span>
          </div>

          {ambassadorConfirmed && (
            <>
              <div className="flex justify-between gap-3 text-green-700">
                <span>تخفیف سفیر:</span>

                <span className="font-black">
                  - {(ambassadorDiscount || 0).toLocaleString("fa-IR")} ریال
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span>باقیمانده پس از تخفیف سفیر:</span>

                <span className="font-black">
                  {(remainingAfterAmbassador || 0).toLocaleString("fa-IR")} ریال
                </span>
              </div>
            </>
          )}

          {discountInfo && (
  <div className="rounded-xl border border-green-100 bg-green-50/60 p-3">
    <div className="flex justify-between gap-3 text-green-700">
      <span>
        کد تخفیف{" "}
        <span className="font-black">
          {discountInfo.code || ""}
        </span>
        :
      </span>

      <span className="font-black">
        {displayedDiscountPercent.toLocaleString("fa-IR")}٪
      </span>
    </div>

    <div className="mt-2 flex justify-between gap-3 text-green-700">
      <span>مبلغ تخفیف:</span>

      <span className="font-black">
        - {(discountAmount || 0).toLocaleString("fa-IR")} ریال
      </span>
    </div>
  </div>
)}

          <div className="flex justify-between gap-3 border-t border-green-100 pt-3 text-lg font-black text-[#6f4a18]">
            <span>مبلغ پرداخت‌شده / قابل پرداخت:</span>

            <span>
              {(finalPrice || 0).toLocaleString("fa-IR")} ریال
            </span>
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
                  {ambassadorInfo.phone ||
                    ambassadorInfo.mobile ||
                    "-"}
                </span>
              </p>
            </div>
          </div>
        )}

        <p className="mt-4 text-sm leading-7 text-stone-600">
          مرحله انتخاب بسته همکاری تکمیل شد. اکنون وارد مرحله تکمیل مدارک و
          قرارداد شده‌اید.
        </p>
      </div>
    </motion.section>
  );
}