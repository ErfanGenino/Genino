import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const formatNumber = (value) => {
  if (value === null || value === undefined || value === "") return "";
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("fa-IR");
};

const onlyDigits = (value) => {
  return String(value).replace(/\D/g, "");
};

export default function AdminVendorPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPackage, setEditingPackage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [creatingPackage, setCreatingPackage] = useState(false);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/admin/vendor-packages`
      );

      if (data?.ok) {
        setPackages(data.packages);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const shopPackages = packages.filter(
    (pkg) => pkg.targetType === "SHOP"
  );

  const servicePackages = packages.filter(
    (pkg) => pkg.targetType === "SERVICE"
  );

  const handleSavePackage = async () => {
  if (!editingPackage) return;

  try {
    setSaving(true);

    const payload = {
      targetType: editingPackage.targetType,
      title: editingPackage.title,
      description: editingPackage.description,
      price: Number(editingPackage.price),
      durationMonths: Number(editingPackage.durationMonths),
      hasDedicatedPage: !!editingPackage.hasDedicatedPage,
      windowCount: editingPackage.windowCount,
      achievementLimit: editingPackage.achievementLimit,
      allowedUserCount: editingPackage.allowedUserCount,
      isActive: editingPackage.isActive,
      sortOrder: Number(editingPackage.sortOrder || 0),
    };

    const { data } = editingPackage.isNew
      ? await axios.post(`${BASE_URL}/admin/vendor-packages`, payload)
      : await axios.put(
          `${BASE_URL}/admin/vendor-packages/${editingPackage.id}`,
          payload
        );

    if (data?.ok) {
      await loadPackages();
      setEditingPackage(null);
    }
  } catch (err) {
    console.error(err);
    alert("خطا در ذخیره تغییرات بسته همکاری");
  } finally {
    setSaving(false);
  }
};

const handleTogglePackage = async (packageId) => {
  try {
    const { data } = await axios.patch(
      `${BASE_URL}/admin/vendor-packages/${packageId}/toggle`
    );

    if (data?.ok) {
      await loadPackages();
    }
  } catch (err) {
    console.error(err);
    alert("خطا در تغییر وضعیت بسته");
  }
};





  return (
    <div
      dir="rtl"
      className="min-h-screen bg-slate-100 p-6 sm:p-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-800">
            مدیریت بسته‌های همکاری
          </h1>

          <p className="mt-3 text-stone-500">
            مدیریت بسته‌های فروشندگان کالا و ارائه‌دهندگان خدمات
          </p>

          <div className="mt-5">
  <button
    type="button"
    onClick={() => {
      setEditingPackage({
        isNew: true,
        targetType: "SHOP",
        title: "",
        description: "",
        price: 0,
        durationMonths: 12,
        hasDedicatedPage: true,
        windowCount: 0,
        achievementLimit: null,
        allowedUserCount: null,
        isActive: true,
        sortOrder: 0,
      });
    }}
    className="rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white hover:bg-green-700"
  >
    + ایجاد بسته جدید
  </button>
</div>
        </div>

        {loading ? (
          <div className="text-center text-stone-500">
            در حال بارگذاری...
          </div>
        ) : (
          <>
            {/* فروشگاه‌ها */}
            <section className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-stone-800">
                بسته‌های فروشندگان کالا
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {shopPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="rounded-2xl bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold text-stone-800">
                        {pkg.title}
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          pkg.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {pkg.isActive ? "فعال" : "غیرفعال"}
                      </span>
                    </div>

                    

                    <div className="mt-4 space-y-2 text-sm text-stone-600">
  <div>
    صفحه اختصاصی:
    <span className="font-bold text-stone-800">
      {" "}
      {pkg.hasDedicatedPage ? "دارد" : "ندارد"}
    </span>
  </div>

  <div>
    تعداد پنجره:
    <span className="font-bold text-stone-800">
      {" "}
      {pkg.windowCount ?? "نامحدود"}
    </span>
  </div>

  <div>
    مدت اعتبار:
    <span className="font-bold text-stone-800">
      {" "}
      {pkg.durationMonths} ماه
    </span>
  </div>

  <div>
    قیمت:
    <span className="font-bold text-stone-800">
      {" "}
      {formatNumber(pkg.price)} ریال
    </span>
  </div>
</div>
<p className="mt-3 text-sm text-stone-500">
                      {pkg.description}
                    </p>
                    <div className="mt-3 space-y-1 text-xs text-stone-400">
  <div>
    تاریخ ایجاد: {formatDate(pkg.createdAt)}
  </div>

  <div>
    آخرین ویرایش: {formatDate(pkg.updatedAt)}
  </div>
</div>

                    <div className="mt-5 flex gap-2">
                      <button
  onClick={() => setEditingPackage(pkg)}
  className="rounded-xl bg-amber-500 px-4 py-2 text-sm text-white"
>
  ویرایش
</button>

                      <button
  type="button"
  onClick={() => handleTogglePackage(pkg.id)}
  className={`rounded-xl px-4 py-2 text-sm text-white ${
    pkg.isActive ? "bg-red-500" : "bg-green-600"
  }`}
>
  {pkg.isActive ? "غیرفعال‌سازی" : "فعال‌سازی"}
</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* خدمات */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-stone-800">
                بسته‌های ارائه‌دهندگان خدمات
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {servicePackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="rounded-2xl bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold text-stone-800">
                        {pkg.title}
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          pkg.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {pkg.isActive ? "فعال" : "غیرفعال"}
                      </span>
                    </div>

                    

                    <div className="mt-4 space-y-2 text-sm text-stone-600">
  <div>
    صفحه اختصاصی:
    <span className="font-bold text-stone-800">
      {" "}
      {pkg.hasDedicatedPage ? "دارد" : "ندارد"}
    </span>
  </div>

  <div>
    مدت اعتبار:
    <span className="font-bold text-stone-800">
      {" "}
      {pkg.durationMonths} ماه
    </span>
  </div>

  <div>
    مجوز دستاورد:
    <span className="font-bold text-stone-800">
      {" "}
      {pkg.achievementLimit ?? 0}
    </span>
  </div>

  <div>
    تعداد کاربران:
    <span className="font-bold text-stone-800">
      {" "}
      {pkg.allowedUserCount ?? 0}
    </span>
  </div>

  <div>
    قیمت:
    <span className="font-bold text-stone-800">
      {" "}
      {formatNumber(pkg.price)} ریال
    </span>
  </div>
</div>

<p className="mt-3 text-sm text-stone-500">
                      {pkg.description}
                    </p>
                    <div className="mt-3 space-y-1 text-xs text-stone-400">
  <div>
    تاریخ ایجاد: {formatDate(pkg.createdAt)}
  </div>

  <div>
    آخرین ویرایش: {formatDate(pkg.updatedAt)}
  </div>
</div>

                    <div className="mt-5 flex gap-2">
                      <button
  onClick={() => setEditingPackage(pkg)}
  className="rounded-xl bg-amber-500 px-4 py-2 text-sm text-white"
>
  ویرایش
</button>

                      <button
  type="button"
  onClick={() => handleTogglePackage(pkg.id)}
  className={`rounded-xl px-4 py-2 text-sm text-white ${
    pkg.isActive ? "bg-red-500" : "bg-green-600"
  }`}
>
  {pkg.isActive ? "غیرفعال‌سازی" : "فعال‌سازی"}
</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      {editingPackage && (
  <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-3 sm:items-center sm:p-4">
    <div className="my-4 max-h-[calc(100vh-32px)] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-4 shadow-xl sm:my-0 sm:p-6">
      <h2 className="text-xl font-bold text-stone-800">
        ویرایش بسته همکاری
      </h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
  <label className="text-sm font-bold text-stone-600">
    این بسته مربوط به چیست؟
  </label>

  <div className="mt-3 grid grid-cols-2 gap-3">
    <button
      type="button"
      onClick={() =>
        setEditingPackage({
          ...editingPackage,
          targetType: "SHOP",
          windowCount: editingPackage.windowCount ?? 0,
          achievementLimit: null,
          allowedUserCount: null,
        })
      }
      className={`rounded-xl border px-4 py-3 text-sm font-bold ${
        editingPackage.targetType === "SHOP"
          ? "border-amber-400 bg-amber-50 text-amber-700"
          : "border-stone-200 bg-white text-stone-600"
      }`}
    >
      فروشنده کالا
    </button>

    <button
      type="button"
      onClick={() =>
        setEditingPackage({
          ...editingPackage,
          targetType: "SERVICE",
          windowCount: null,
          achievementLimit: editingPackage.achievementLimit ?? 0,
          allowedUserCount: editingPackage.allowedUserCount ?? 1,
        })
      }
      className={`rounded-xl border px-4 py-3 text-sm font-bold ${
        editingPackage.targetType === "SERVICE"
          ? "border-amber-400 bg-amber-50 text-amber-700"
          : "border-stone-200 bg-white text-stone-600"
      }`}
    >
      ارائه‌دهنده خدمات
    </button>
  </div>
</div>
        <div>
          <label className="text-sm font-bold text-stone-600">
            عنوان بسته
          </label>
          <input
            value={editingPackage.title || ""}
            onChange={(e) =>
              setEditingPackage({
                ...editingPackage,
                title: e.target.value,
              })
            }
            className="mt-2 w-full rounded-xl border border-stone-200 p-3 text-sm"
          />
        </div>

        <div>
  <label className="text-sm font-bold text-stone-600">
    صفحه اختصاصی
  </label>

  <div className="mt-2 grid grid-cols-2 gap-2">
    <button
      type="button"
      onClick={() =>
        setEditingPackage({
          ...editingPackage,
          hasDedicatedPage: true,
        })
      }
      className={`rounded-xl border px-4 py-3 text-sm font-bold ${
        editingPackage.hasDedicatedPage
          ? "border-green-400 bg-green-50 text-green-700"
          : "border-stone-200 bg-white text-stone-600"
      }`}
    >
      دارد
    </button>

    <button
      type="button"
      onClick={() =>
        setEditingPackage({
          ...editingPackage,
          hasDedicatedPage: false,
        })
      }
      className={`rounded-xl border px-4 py-3 text-sm font-bold ${
        !editingPackage.hasDedicatedPage
          ? "border-red-400 bg-red-50 text-red-700"
          : "border-stone-200 bg-white text-stone-600"
      }`}
    >
      ندارد
    </button>
  </div>
</div>

        

        {editingPackage.targetType === "SHOP" ? (
  <div>
    <label className="text-sm font-bold text-stone-600">
      تعداد پنجره
    </label>

    <input
      type="number"
      value={editingPackage.windowCount || ""}
      onChange={(e) =>
        setEditingPackage({
          ...editingPackage,
          windowCount: e.target.value
            ? Number(e.target.value)
            : null,
        })
      }
      className="mt-2 w-full rounded-xl border border-stone-200 p-3 text-sm"
    />
  </div>
) : (
  <>
    <div>
      <label className="text-sm font-bold text-stone-600">
        تعداد مجوز دستاورد
      </label>

      <input
        type="number"
        value={editingPackage.achievementLimit || ""}
        onChange={(e) =>
          setEditingPackage({
            ...editingPackage,
            achievementLimit: e.target.value
              ? Number(e.target.value)
              : null,
          })
        }
        className="mt-2 w-full rounded-xl border border-stone-200 p-3 text-sm"
      />
    </div>

    <div>
      <label className="text-sm font-bold text-stone-600">
        تعداد مجوز کاربران
      </label>

      <input
        type="number"
        value={editingPackage.allowedUserCount || ""}
        onChange={(e) =>
          setEditingPackage({
            ...editingPackage,
            allowedUserCount: e.target.value
              ? Number(e.target.value)
              : null,
          })
        }
        className="mt-2 w-full rounded-xl border border-stone-200 p-3 text-sm"
      />
    </div>
  </>
)}

 <div>
          <label className="text-sm font-bold text-stone-600">
            مدت اعتبار به ماه
          </label>
          <input
            type="number"
            value={editingPackage.durationMonths || 0}
            onChange={(e) =>
              setEditingPackage({
                ...editingPackage,
                durationMonths: Number(e.target.value),
              })
            }
            className="mt-2 w-full rounded-xl border border-stone-200 p-3 text-sm"
          />
        </div>

<div>
          <label className="text-sm font-bold text-stone-600">
            قیمت (ریال)
          </label>
          <input
  type="text"
  value={formatNumber(editingPackage.price)}
  onChange={(e) => {
    const rawValue = onlyDigits(e.target.value);

    setEditingPackage({
      ...editingPackage,
      price: rawValue ? Number(rawValue) : 0,
    });
  }}
            className="mt-2 w-full rounded-xl border border-stone-200 p-3 text-sm"
          />
        </div>

        

        <div className="sm:col-span-2">
          <label className="text-sm font-bold text-stone-600">
            توضیحات
          </label>
          <textarea
            value={editingPackage.description || ""}
            onChange={(e) =>
              setEditingPackage({
                ...editingPackage,
                description: e.target.value,
              })
            }
            className="mt-2 min-h-24 w-full rounded-xl border border-stone-200 p-3 text-sm"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => setEditingPackage(null)}
          className="rounded-xl border border-stone-200 px-5 py-2 text-sm"
        >
          انصراف
        </button>

        <button
          onClick={handleSavePackage}
          disabled={saving}
          className="rounded-xl bg-amber-500 px-5 py-2 text-sm text-white disabled:bg-stone-300"
        >
          {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}