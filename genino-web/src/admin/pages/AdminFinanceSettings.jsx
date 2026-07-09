import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const formatPrice = (value) => {
  if (value === "" || value === null || value === undefined) return "";
  return Number(value).toLocaleString("fa-IR");
};

export default function AdminFinanceSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [ambassadorVendorDiscountAmount, setAmbassadorVendorDiscountAmount] =
    useState(0);

  const [
    ambassadorSubscriptionCommissionPercent,
    setAmbassadorSubscriptionCommissionPercent,
  ] = useState(50);

  const [
    ambassadorSalesCommissionPercent,
    setAmbassadorSalesCommissionPercent,
  ] = useState(1);

  const loadSettings = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/admin/finance-settings`);

      if (data?.ok) {
        setAmbassadorVendorDiscountAmount(
          data.settings?.ambassadorVendorDiscountAmount || 0
        );

        setAmbassadorSubscriptionCommissionPercent(
          data.settings?.ambassadorSubscriptionCommissionPercent ?? 50
        );

        setAmbassadorSalesCommissionPercent(
          data.settings?.ambassadorSalesCommissionPercent ?? 1
        );
      }
    } catch (err) {
      console.error(err);
      alert("خطا در دریافت تنظیمات مالی");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);

      const { data } = await axios.put(`${BASE_URL}/admin/finance-settings`, {
        ambassadorVendorDiscountAmount: Number(
          ambassadorVendorDiscountAmount
        ),
        ambassadorSubscriptionCommissionPercent: Number(
          ambassadorSubscriptionCommissionPercent
        ),
        ambassadorSalesCommissionPercent: Number(
          ambassadorSalesCommissionPercent
        ),
      });

      if (data?.ok) {
        setAmbassadorVendorDiscountAmount(
          data.settings.ambassadorVendorDiscountAmount
        );

        setAmbassadorSubscriptionCommissionPercent(
          data.settings.ambassadorSubscriptionCommissionPercent
        );

        setAmbassadorSalesCommissionPercent(
          data.settings.ambassadorSalesCommissionPercent
        );

        alert("تنظیمات مالی با موفقیت ذخیره شد.");
      }
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "خطا در ذخیره تنظیمات مالی");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-100 p-6 sm:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-800">
            تنظیمات مالی
          </h1>

          <p className="mt-3 text-stone-500">
            مدیریت تنظیمات مالی و مقادیر قابل تغییر ژنینو
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-white p-8 text-center text-stone-500 shadow-sm">
            در حال بارگذاری...
          </div>
        ) : (
          <div className="space-y-5">
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-stone-800">
                تنظیمات تخفیف سفیران
              </h2>

              <p className="mt-2 text-sm leading-7 text-stone-500">
                این مبلغ به‌صورت ثابت، پس از تأیید کد سفیر از قیمت بسته فروشنده
                کسر می‌شود.
              </p>

              <div className="mt-6">
                <label className="text-sm font-bold text-stone-700">
                  مبلغ تخفیف ثابت سفیر برای فروشندگان
                </label>

                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    type="number"
                    min="0"
                    value={ambassadorVendorDiscountAmount}
                    onChange={(e) =>
                      setAmbassadorVendorDiscountAmount(e.target.value)
                    }
                    className="h-12 flex-1 rounded-2xl border border-stone-200 bg-white px-4 text-left text-sm font-bold text-stone-800 outline-none focus:border-amber-500"
                  />

                  <span className="text-sm font-bold text-stone-500">
                    ریال
                  </span>
                </div>

                <div className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-700">
                  مقدار فعلی: {formatPrice(ambassadorVendorDiscountAmount)} ریال
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-stone-800">
                تنظیمات پورسانت سفیران
              </h2>

              <p className="mt-2 text-sm leading-7 text-stone-500">
                پورسانت حق اشتراک سفیر از مبلغ بسته بعد از کسر تخفیف ثابت سفیر
                محاسبه می‌شود.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-bold text-stone-700">
                    درصد پورسانت سفیر از حق اشتراک فروشندگان
                  </label>

                  <div className="mt-2 flex items-center gap-3">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={ambassadorSubscriptionCommissionPercent}
                      onChange={(e) =>
                        setAmbassadorSubscriptionCommissionPercent(
                          e.target.value
                        )
                      }
                      className="h-12 flex-1 rounded-2xl border border-stone-200 bg-white px-4 text-left text-sm font-bold text-stone-800 outline-none focus:border-amber-500"
                    />

                    <span className="text-sm font-bold text-stone-500">
                      درصد
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-stone-700">
                    درصد پورسانت سفیر از فروش فروشندگان
                  </label>

                  <div className="mt-2 flex items-center gap-3">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={ambassadorSalesCommissionPercent}
                      onChange={(e) =>
                        setAmbassadorSalesCommissionPercent(e.target.value)
                      }
                      className="h-12 flex-1 rounded-2xl border border-stone-200 bg-white px-4 text-left text-sm font-bold text-stone-800 outline-none focus:border-amber-500"
                    />

                    <span className="text-sm font-bold text-stone-500">
                      درصد
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="h-12 rounded-2xl bg-amber-500 px-6 text-sm font-bold text-white transition hover:bg-amber-600 disabled:bg-stone-300"
            >
              {saving ? "در حال ذخیره..." : "ذخیره تنظیمات"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}