// ============================================================================
// File: src/pages/dashboard/components/VendorPackageSection.jsx
// Description: انتخاب بسته همکاری فروشنده در داشبورد ژنینو
// ============================================================================

import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function VendorPackageSection({
  vendor,
  packageConfirmed,
  showPackages,
  setShowPackages,
  filteredVendorPackages,
  selectedPackage,
  setSelectedPackage,
  hasAmbassador,
  setHasAmbassador,
  ambassadorCode,
  setAmbassadorCode,
  ambassadorInfo,
  setAmbassadorInfo,
  ambassadorConfirmed,
  setAmbassadorConfirmed,
  ambassadorDiscountAmount,
  hasDiscountCode,
  setHasDiscountCode,
  discountCode,
  setDiscountCode,
  discountInfo,
  setDiscountInfo,
  finalPrice,
  setFinalPrice,
  packagePrice,
  ambassadorDiscount,
  remainingAfterAmbassador,
  discountAmount,
  validateAmbassadorCode,
  validateDiscountCode,
  handlePackageContinue,
}) {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-[2rem] border border-yellow-200 bg-gradient-to-br from-[#fff8e8] to-white p-5 shadow-xl shadow-amber-900/10"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-black text-[#6f4a18]">
              انتخاب بسته همکاری
            </h2>

            <p className="mt-2 text-sm text-stone-600">
              بسته همکاری مناسب کسب‌وکار خود را انتخاب کنید.
            </p>
          </div>

          {packageConfirmed ? (
            <div className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-green-200 bg-green-50 px-6 text-sm font-black text-green-700">
              <CheckCircle2 className="h-5 w-5" />
              بسته انتخاب شده
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowPackages((prev) => !prev)}
              className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#7a5526] via-[#b88724] to-[#d4af37] px-6 text-sm font-black text-white shadow-lg shadow-yellow-700/20 transition hover:-translate-y-0.5"
            >
              انتخاب بسته همکاری
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
        </div>
      </motion.section>

      {showPackages && !packageConfirmed && (
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-yellow-200 bg-white p-5 shadow-xl shadow-amber-900/10"
        >
          <h3 className="text-lg font-black text-[#6f4a18]">
            بسته همکاری خود را انتخاب کنید
          </h3>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {filteredVendorPackages.map((pkg) => (
              <button
                key={pkg.id}
                type="button"
                onClick={() => {
                  setSelectedPackage(pkg);
                  setHasAmbassador(null);
                  setAmbassadorCode("");
                  setAmbassadorInfo(null);
                  setAmbassadorConfirmed(false);
                }}
                className={`min-h-[220px] rounded-2xl border p-3 text-center transition ${
                  selectedPackage?.id === pkg.id
                    ? "border-[#d4af37] bg-yellow-50"
                    : "border-yellow-100 bg-[#fffaf0]"
                }`}
              >
                <p className="text-[11px] font-black leading-5 text-[#6f4a18]">
                  {pkg.title}
                </p>

                <div className="mt-3 space-y-2 text-[10px] text-stone-600">
                  <div>
                    صفحه اختصاصی:
                    <span className="font-black text-[#6f4a18]">
                      {pkg.hasDedicatedPage ? " دارد" : " ندارد"}
                    </span>
                  </div>

                  {pkg.targetType === "SHOP" ? (
                    <div>
                      تعداد پنجره:
                      <span className="font-black text-[#6f4a18]">
                        {" "}
                        {pkg.windowCount ?? "نامحدود"}
                      </span>
                    </div>
                  ) : (
                    <>
                      <div>
                        مجوز دستاورد:
                        <span className="font-black text-[#6f4a18]">
                          {" "}
                          {pkg.achievementLimit ?? "ندارد"}
                        </span>
                      </div>

                      <div>
                        تعداد کاربران:
                        <span className="font-black text-[#6f4a18]">
                          {" "}
                          {pkg.allowedUserCount ?? "نامحدود"}
                        </span>
                      </div>
                    </>
                  )}

                  <div>
                    اعتبار:
                    <span className="font-black text-[#6f4a18]">
                      {" "}
                      {pkg.durationMonths} ماه
                    </span>
                  </div>
                </div>

                <p className="mt-5 border-t border-yellow-100 pt-3 text-xs font-black text-[#7a5526]">
                  {pkg.price.toLocaleString("fa-IR")} ریال
                </p>

                {pkg.description && (
                  <p className="mt-3 text-[10px] leading-5 text-stone-500">
                    {pkg.description}
                  </p>
                )}
              </button>
            ))}
          </div>

          {selectedPackage && (
            <div className="mt-5 border-t border-yellow-100 pt-5">
              <p className="text-xs font-bold text-stone-700">
                آیا ژنینو از طریق یکی از سفیران ما به شما معرفی شده است؟
              </p>

              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setHasAmbassador(true);
                    setAmbassadorInfo(null);
                    setAmbassadorConfirmed(false);
                  }}
                  className={`flex-1 h-9 rounded-xl px-5 text-xs font-black ${
                    hasAmbassador === true
                      ? "bg-[#d4af37] text-white"
                      : "bg-[#fff8e8] text-[#7a5526]"
                  }`}
                >
                  بله، کد سفیر دارم
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setHasAmbassador(false);
                    setAmbassadorCode("");
                    setAmbassadorInfo(null);
                    setAmbassadorConfirmed(false);
                  }}
                  className={`flex-1 h-9 rounded-xl px-5 text-xs font-black ${
                    hasAmbassador === false
                      ? "bg-[#d4af37] text-white"
                      : "bg-[#fff8e8] text-[#7a5526]"
                  }`}
                >
                  خیر، کد سفیر ندارم
                </button>
              </div>

              {hasAmbassador === true && (
                <div className="mt-4">
                  <label className="text-xs font-bold text-stone-600">
                    کد سفیر ژنینو
                  </label>

                  <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                    <input
                      value={ambassadorCode}
                      onChange={(e) => {
                        setAmbassadorCode(e.target.value);
                        setAmbassadorInfo(null);
                        setAmbassadorConfirmed(false);
                      }}
                      placeholder="کد سفیر را وارد کنید"
                      className="h-12 flex-1 rounded-2xl border border-yellow-200 bg-white px-4 text-xs outline-none focus:border-[#d4af37]"
                    />

                    <button
                      type="button"
                      disabled={!ambassadorCode.trim()}
                      onClick={async () => {
                        try {
                          const res = await validateAmbassadorCode(
                            ambassadorCode,
                            vendor.id
                          );

                          if (!res?.ok) {
                            alert(res?.message || "کد سفیر معتبر نیست.");
                            return;
                          }

                          setAmbassadorInfo(res.ambassador);
                          setAmbassadorConfirmed(false);
                        } catch (err) {
                          console.error(err);
                          alert("خطا در بررسی کد سفیر");
                        }
                      }}
                      className="h-12 rounded-2xl bg-[#6f4a18] px-6 text-xs font-black text-white disabled:cursor-not-allowed disabled:bg-stone-300"
                    >
                      بررسی کد سفیر
                    </button>
                  </div>
                </div>
              )}

              {ambassadorInfo && (
                <div className="mt-4 rounded-2xl border border-green-100 bg-green-50 p-4">
                  <p className="text-xs font-black text-green-700">
                    سفیر ژنینو با این کد پیدا شد
                  </p>

                  <p className="mt-2 text-xs text-stone-700">
                    {ambassadorInfo.name} - {ambassadorInfo.city}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setAmbassadorConfirmed(true);

                      const priceAfterAmbassadorDiscount = Math.max(
                        selectedPackage.price - ambassadorDiscountAmount,
                        0
                      );

                      setFinalPrice(priceAfterAmbassadorDiscount);
                    }}
                    className="mt-4 h-9 rounded-xl bg-green-600 px-5 text-xs font-black text-white"
                  >
                    تأیید سفیر
                  </button>
                </div>
              )}

              {ambassadorConfirmed && (
                <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 p-4">
                  <p className="font-black text-green-700">
                    کد سفیر با موفقیت تأیید شد
                  </p>

                  <p className="mt-2 text-sm text-stone-700">
                    مبلغ{" "}
                    <span className="font-black text-green-700">
                      {ambassadorDiscountAmount.toLocaleString("fa-IR")} ریال
                    </span>{" "}
                    تخفیف ویژه سفیر ژنینو برای شما اعمال شد.
                  </p>
                </div>
              )}

              {(hasAmbassador === false || ambassadorConfirmed) && (
                <div className="mt-5 border-t border-yellow-100 pt-5">
                  <p className="text-xs font-bold text-stone-700">
                    آیا کد تخفیف ویژه ژنینو دارید؟
                  </p>

                  <div className="mt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setHasDiscountCode(true);
                        setDiscountInfo(null);
                      }}
                      className={`flex-1 h-9 rounded-xl px-5 text-xs font-black ${
                        hasDiscountCode === true
                          ? "bg-[#d4af37] text-white"
                          : "bg-[#fff8e8] text-[#7a5526]"
                      }`}
                    >
                      بله
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setHasDiscountCode(false);
                        setDiscountInfo(null);
                        setFinalPrice(selectedPackage.price);
                      }}
                      className={`flex-1 h-9 rounded-xl px-5 text-xs font-black ${
                        hasDiscountCode === false
                          ? "bg-[#d4af37] text-white"
                          : "bg-[#fff8e8] text-[#7a5526]"
                      }`}
                    >
                      خیر
                    </button>
                  </div>

                  {hasDiscountCode === true && (
                    <div className="mt-4">
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                          placeholder="کد تخفیف ژنینو"
                          className="h-12 flex-1 rounded-2xl border border-yellow-200 px-4"
                        />

                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              const res = await validateDiscountCode(
                                discountCode
                              );

                              if (!res?.ok) {
                                alert(
                                  res?.message || "کد تخفیف معتبر نیست."
                                );
                                return;
                              }

                              const percent = res.discountCode.percent;

                              const basePrice = ambassadorConfirmed
                                ? Math.max(
                                    selectedPackage.price -
                                      ambassadorDiscountAmount,
                                    0
                                  )
                                : selectedPackage.price;

                              setDiscountInfo({
                                code: res.discountCode.code,
                                percent,
                              });

                              setFinalPrice(
                                Math.round(
                                  basePrice * ((100 - percent) / 100)
                                )
                              );
                            } catch (err) {
                              console.error(err);
                              alert("خطا در بررسی کد تخفیف");
                            }
                          }}
                          className="h-12 rounded-2xl bg-[#6f4a18] px-6 text-sm font-black text-white"
                        >
                          بررسی کد
                        </button>
                      </div>
                    </div>
                  )}

                  {discountInfo && (
                    <div className="mt-4 rounded-xl border border-green-100 bg-green-50 px-3 py-2">
                      <p className="font-black text-green-700">
                        کد تخفیف تأیید شد
                      </p>

                      <p className="mt-2 text-sm text-stone-700">
                        {discountInfo.percent}٪ تخفیف روی این خرید اعمال شد.
                      </p>
                    </div>
                  )}

                  {finalPrice !== null && (
                    <div className="mt-5 rounded-2xl border border-yellow-200 bg-[#fffaf0] p-5">
                      <div className="space-y-3 text-sm">
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
                                - {ambassadorDiscount.toLocaleString("fa-IR")}{" "}
                                ریال
                              </span>
                            </div>

                            <div className="flex justify-between">
                              <span>باقیمانده:</span>

                              <span className="font-black">
                                {remainingAfterAmbassador.toLocaleString(
                                  "fa-IR"
                                )}{" "}
                                ریال
                              </span>
                            </div>
                          </>
                        )}

                        {discountInfo && (
                          <div className="flex justify-between text-green-700">
                            <span>
                              تخفیف کد تخفیف ({discountInfo.percent}٪):
                            </span>

                            <span className="font-black">
                              - {discountAmount.toLocaleString("fa-IR")} ریال
                            </span>
                          </div>
                        )}

                        <div className="my-2 border-t border-yellow-200" />

                        <div className="flex justify-between text-lg font-black text-[#6f4a18]">
                          <span>باقیمانده قابل پرداخت:</span>

                          <span>
                            {finalPrice.toLocaleString("fa-IR")} ریال
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handlePackageContinue}
                        className="mt-5 h-12 w-full rounded-2xl bg-gradient-to-r from-[#7a5526] via-[#b88724] to-[#d4af37] text-sm font-black text-white shadow-lg shadow-yellow-700/20"
                      >
                        {discountInfo?.percent === 100
                          ? "تأیید و ادامه"
                          : "پرداخت و ادامه"}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </motion.section>
      )}
    </>
  );
}