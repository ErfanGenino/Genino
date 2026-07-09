import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const discountPercents = [
  5, 10, 15, 20, 25,
  30, 35, 40, 45, 50,
  55, 60, 65, 70, 75,
  80, 85, 90, 95, 100,
];

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("fa-IR");
};

const getVendorDisplayName = (vendor) => {
  if (!vendor) return "-";

  if (vendor.personType === "legal") {
    return vendor.legalCompanyName || vendor.businessName || "فروشگاه حقوقی";
  }

  return (
    `${vendor.firstName || ""} ${vendor.lastName || ""}`.trim() ||
    vendor.businessName ||
    "فروشگاه حقیقی"
  );
};



export default function AdminDiscountCodes() {
  const [discountCodes, setDiscountCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creatingPercent, setCreatingPercent] = useState(null);

  useEffect(() => {
    loadDiscountCodes();
  }, []);

  const loadDiscountCodes = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/admin/discount-codes`);

      if (data?.ok) {
        setDiscountCodes(data.discountCodes || []);
      }
    } catch (err) {
      console.error(err);
      alert("خطا در دریافت کدهای تخفیف");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDiscountCode = async (percent) => {
    try {
      setCreatingPercent(percent);

      const code = `GD-${percent}-${Date.now().toString().slice(-6)}`;

      const { data } = await axios.post(`${BASE_URL}/admin/discount-codes`, {
        code,
        percent,
        title: `${percent} درصد تخفیف`,
        description: `کد تخفیف ${percent} درصدی ژنینو`,
        isActive: true,
      });

      if (data?.ok) {
        await loadDiscountCodes();
      }
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "خطا در ایجاد کد تخفیف");
    } finally {
      setCreatingPercent(null);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-100 p-6 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-800">
            مدیریت کدهای تخفیف
          </h1>

          <p className="mt-3 text-stone-500">
            ایجاد و مدیریت کدهای تخفیف ژنینو
          </p>

          <div className="mt-5 grid grid-cols-4 gap-2 sm:grid-cols-5">
            {discountPercents.map((percent) => (
              <button
                key={percent}
                type="button"
                onClick={() => handleCreateDiscountCode(percent)}
                disabled={creatingPercent === percent}
                className="rounded-xl bg-amber-500 px-4 py-3 text-sm font-bold text-white hover:bg-amber-600 disabled:bg-stone-300"
              >
                {creatingPercent === percent
                  ? "در حال ساخت..."
                  : `${percent}٪`}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center text-stone-500">
            در حال بارگذاری...
          </div>
        ) : discountCodes.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center text-stone-400 shadow-sm">
            هنوز کد تخفیفی تعریف نشده است.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {discountCodes.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-stone-800">{item.code}</h3>

                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      item.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.isActive ? "فعال" : "استفاده‌شده / غیرفعال"}
                  </span>
                </div>

                <p className="mt-4 text-sm text-stone-600">
                  درصد تخفیف:{" "}
                  <span className="font-bold text-stone-800">
                    {item.percent}٪
                  </span>
                </p>

                {item.title && (
                  <p className="mt-3 text-sm font-bold text-stone-700">
                    {item.title}
                  </p>
                )}

                {item.description && (
                  <p className="mt-2 text-sm text-stone-500">
                    {item.description}
                  </p>
                )}

                <div className="mt-3 text-xs text-stone-400">
  تاریخ ایجاد: {formatDate(item.createdAt)}
</div>

{item.usedAt && (
  <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-3 text-xs leading-6 text-red-700">
    <p className="font-bold">
      استفاده شده توسط: {getVendorDisplayName(item.usedByVendor)}
    </p>

    <p>
      نام کسب‌وکار: {item.usedByVendor?.businessName || "-"}
    </p>

    <p>
      تلفن: {item.usedByVendor?.phone || "-"}
    </p>

    <p>
      تاریخ استفاده: {formatDate(item.usedAt)}
    </p>
  </div>
)}



              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}