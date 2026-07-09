// ============================================================================
// File: src/pages/vendor/VendorShopPage.jsx
// Description: صفحه فروشگاه فروشنده ژنینو (بعد از تأیید ادمین)
// ============================================================================

import { useEffect, useState } from "react";
import { ShoppingBag, Trash2, Pencil } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import PromoSlider from "@components/Social/PromoSlider.jsx";




export default function VendorShopPage() {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [headerImages, setHeaderImages] = useState([]);
  const [activeHeaderIndex, setActiveHeaderIndex] = useState(0);
  const [uploadingHeader, setUploadingHeader] = useState(false);


  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const FILE_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, "");

  // 🔹 شبیه‌سازی دریافت اطلاعات فروشنده
  useEffect(() => {
  async function load() {
    // 1. فروشنده 
    // دریافت اطلاعات واقعی فروشنده
try {
  const vendorRes = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/vendors/${vendorId}`
  );

  const vendorData = await vendorRes.json();

  if (vendorData.ok) {
  const v = vendorData.vendor;


  setVendor({
    ...v,

    storeName: v.businessName || "فروشگاه ژنینو",

    storeSlogan: v.mainActivityField || "ارائه‌دهنده ژنینو",

    storeAddress: [v.province, v.city].filter(Boolean).join("، "),

    packageWindowCount: v.selectedPackageWindowCount || 20,

    statusText:
      v.publishStatus === "ALLOWED"
        ? "فعال و قابل انتشار"
        : v.reviewStatus === "UNDER_REVIEW"
        ? "در حال بررسی"
        : v.reviewStatus === "NEEDS_CORRECTION"
        ? "نیازمند اصلاح"
        : "فعال",

    shopHeaderImages: Array.isArray(v.shopHeaderImages)
  ? v.shopHeaderImages
  : [],
  });
  setHeaderImages(Array.isArray(v.shopHeaderImages) ? v.shopHeaderImages : []);
}
} catch (err) {
  console.error(err);
}

    // 2. محصولات واقعی
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/vendor-products/vendor/${vendorId}`
      );

      const data = await res.json();

      const fixedProducts = (data.products || []).map((p) => ({
  ...p,

  categoryLinks:
    typeof p.categoryLinks === "string"
      ? JSON.parse(p.categoryLinks)
      : p.categoryLinks,

  images:
    typeof p.images === "string"
      ? JSON.parse(p.images)
      : p.images || [],
}));

setProducts(fixedProducts);
    } catch (err) {
      console.error(err);
    }
  }

  load();
}, [vendorId]);

  const canAddProduct =
    vendor && vendor.packageWindowCount && products.length < vendor.packageWindowCount;
    const allowedCategories = (
  vendor?.mainActivityField
    ? [vendor.mainActivityField, ...(vendor.extraActivityFields || [])]
    : []
).filter(Boolean);

const filteredProducts = products;

const handleDeleteProduct = async (productId) => {
  const ok = window.confirm("آیا از حذف این محصول مطمئن هستید؟");

  if (!ok) return;

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/vendor-products/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("genino_token")}`,
        },
      }
    );

    const data = await res.json();

    if (!data.ok) {
      alert(data.message || "خطا در حذف محصول");
      return;
    }

    setProducts((prev) => prev.filter((item) => item.id !== productId));
  } catch (err) {
    console.error(err);
    alert("خطا در ارتباط با سرور");
  }
};

const handlePublishProduct = async (productId) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/vendor-products/${productId}/publish`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("genino_token")}`,
        },
      }
    );

    const data = await res.json();

    if (!data.ok) {
      alert(data.message || "خطا در انتشار محصول");
      return;
    }

    setProducts((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, status: "PUBLISHED" }
          : item
      )
    );

    alert("محصول با موفقیت منتشر شد.");
  } catch (err) {
    console.error(err);
    alert("خطا در ارتباط با سرور");
  }
};

const handleHeaderImageUpload = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  if (headerImages.length >= 3) {
    alert("حداکثر ۳ تصویر برای هدر فروشگاه مجاز است.");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    setUploadingHeader(true);

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/vendor-shop-header/${vendorId}/header-images`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("genino_token")}`,
        },
        body: formData,
      }
    );

    const data = await res.json();

    if (!data.ok) {
      alert(data.message || "خطا در آپلود تصویر هدر");
      return;
    }

    setHeaderImages(data.images || []);
    setActiveHeaderIndex(0);
  } catch (err) {
    console.error(err);
    alert("خطا در ارتباط با سرور");
  } finally {
    setUploadingHeader(false);
    e.target.value = "";
  }
};

const handleDeleteHeaderImage = async (index) => {
  const ok = window.confirm("آیا از حذف این تصویر هدر مطمئن هستید؟");
  if (!ok) return;

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/vendor-shop-header/${vendorId}/header-images/${index}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("genino_token")}`,
        },
      }
    );

    const data = await res.json();

    if (!data.ok) {
      alert(data.message || "خطا در حذف تصویر هدر");
      return;
    }

    setHeaderImages(data.images || []);
    setActiveHeaderIndex(0);
  } catch (err) {
    console.error(err);
    alert("خطا در ارتباط با سرور");
  }
};

const headerSlides = headerImages.map((img, index) => ({
  id: index + 1,
  image: `${FILE_BASE_URL}${img.url}`,
}));


    

  return (
    <main className="min-h-screen bg-[#faf7ef] p-4 text-right">

      {/* ================= HEADER فروشگاه ================= */}
      <div className="rounded-3xl bg-white shadow border overflow-hidden">

        {/* کاور هوشمند فروشگاه */}
<div className="relative overflow-hidden bg-gradient-to-r from-yellow-100 to-yellow-200">
  <div className="p-3">
  {headerSlides.length > 0 ? (
    <div className="relative">
      <PromoSlider
        variant="golden"
        interval={7}
        height="h-40 sm:h-44 md:h-48 lg:h-52"
        className="relative z-[40] max-w-3xl mx-auto overflow-hidden rounded-[1.75rem] border border-yellow-200/70 bg-white/70 shadow-[0_18px_45px_rgba(120,90,20,0.12)] backdrop-blur-xl"
        slides={headerSlides}
        onIndexChange={setActiveHeaderIndex}
      />

      <button
        type="button"
        onClick={() => handleDeleteHeaderImage(activeHeaderIndex)}
        className="absolute left-4 top-4 z-50 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600 shadow"
      >
        حذف تصویر
      </button>
    </div>
  ) : (
    <div className="mx-auto flex max-w-3xl aspect-[3/2] flex-col items-center justify-center rounded-[1.75rem] border border-yellow-200/70 bg-gradient-to-r from-yellow-100 to-yellow-200 px-4 text-center shadow-[0_18px_45px_rgba(120,90,20,0.12)]">
      <ShoppingBag className="mb-3 h-10 w-10 text-yellow-700" />

      <p className="text-sm font-black text-[#6f4a18]">
        تصویر هدر فروشگاه خود را اضافه کنید
      </p>

      <p className="mt-2 max-w-md text-xs leading-6 text-gray-500">
        می‌توانید عکس فروشگاه، برند، ویترین، محیط کار یا تصویر شاخص کسب‌وکارتان را قرار دهید.
      </p>

      <p className="mt-1 text-xs font-bold text-yellow-700">
        بهترین سایز پیشنهادی: 1536 × 1024 پیکسل
      </p>
    </div>
  )}
</div>

  <div className="border-t border-yellow-100 bg-white/90 p-3">
    <label className="block">
      <input
        type="file"
        accept="image/png,image/jpeg,image/webp"
        disabled={uploadingHeader || headerImages.length >= 3}
        onChange={handleHeaderImageUpload}
        className="hidden"
      />

      <div
        className={`cursor-pointer rounded-2xl border border-dashed px-4 py-3 text-center text-xs font-bold transition ${
          headerImages.length >= 3
            ? "border-gray-200 bg-gray-50 text-gray-400"
            : "border-yellow-300 bg-yellow-50 text-[#7a5526] hover:bg-yellow-100"
        }`}
      >
        {uploadingHeader
          ? "در حال آپلود تصویر..."
          : headerImages.length >= 3
          ? "سقف ۳ تصویر هدر تکمیل شده است"
          : `+ افزودن تصویر هدر (${headerImages.length}/3)`}
      </div>
    </label>

    <p className="mt-2 text-center text-[11px] leading-5 text-gray-500">
      پیشنهاد ژنینو: تصویر فروشگاه، برند، ویترین یا محصولات شاخص خود را آپلود کنید.
      بهترین سایز: 1536 × 1024 پیکسل.
    </p>
  </div>
</div>

        {/* اطلاعات */}
<div className="p-4">
  <h1 className="text-xl font-black text-[#6f4a18]">
    {vendor?.storeName || "نام فروشگاه"}
  </h1>

  <p className="mt-1 text-sm font-bold text-yellow-700">
    {vendor?.storeSlogan || "زمینه فعالیت ثبت نشده"}
  </p>


  <p className="mt-2 text-xs text-gray-400">
    📍 {vendor?.storeAddress || "موقعیت ثبت نشده"}
  </p>

  <div className="mt-3 inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
    {vendor?.statusText || "فعال"}
  </div>
</div>
      </div>

      {/* ================= آمار ================= */}
      <div className="grid grid-cols-2 gap-3 mt-4">

        <div className="bg-white p-3 rounded-2xl shadow text-center">
          <p className="text-xs text-gray-400">تعداد محصولات</p>
          <p className="text-lg font-black text-yellow-700">
            {products.length}/{vendor?.packageWindowCount}
          </p>
        </div>

        <div className="bg-white p-3 rounded-2xl shadow text-center">
          <p className="text-xs text-gray-400">وضعیت</p>
          <p className="text-sm font-bold text-green-600">
            {vendor?.statusText || "فعال"}
          </p>
        </div>

      </div>

      {/* ================= دکمه افزودن محصول ================= */}
      {canAddProduct && (
        <button
  onClick={() => navigate("/vendor/product/create")}
  className="
    mt-4 w-full py-3 rounded-2xl
    bg-gradient-to-r from-[#7a5526] via-[#b88724] to-[#d4af37]
    text-white font-bold shadow-lg
  "
>
  + افزودن محصول جدید
</button>
      )}

      {!canAddProduct && (
        <div className="mt-4 text-center text-red-500 text-xs font-bold">
          شما به سقف محصولات بسته خود رسیده‌اید
        </div>
      )}

      

      {/* ================= لیست محصولات ================= */}
<section
  className="
    relative z-10 mt-6 mx-auto grid max-w-5xl
    grid-cols-2 gap-3
    sm:grid-cols-3 sm:gap-4
    lg:grid-cols-4 lg:gap-6
  "
>
  {filteredProducts.map((p) => {
    const raw = p.images?.[0];

    const imageName =
      typeof raw === "string"
        ? raw
        : raw?.filename;

    return (
      <div
        key={p.id}
        onClick={() => navigate(`/product/${p.id}`)}
        className="group relative h-full overflow-hidden rounded-3xl border border-white/80 bg-white/85 p-2.5 shadow-[0_14px_38px_rgba(120,90,20,0.08)] backdrop-blur-md transition duration-300 hover:border-yellow-200 hover:shadow-[0_18px_45px_rgba(120,90,20,0.13)]"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/vendor/product/edit/${p.id}`);
          }}
          className="
            absolute left-12 top-3 z-20
            flex h-8 w-8 items-center justify-center
            rounded-full bg-yellow-50 text-yellow-700
            shadow-sm transition hover:bg-yellow-100
          "
          title="ویرایش محصول"
        >
          <Pencil size={16} />
        </button>


        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteProduct(p.id);
          }}
          className="
            absolute left-3 top-3 z-20
            flex h-8 w-8 items-center justify-center
            rounded-full bg-red-50 text-red-600
            shadow-sm transition hover:bg-red-100
          "
          title="حذف محصول"
        >
          <Trash2 size={16} />
        </button>

        <div className="absolute right-3 top-3 z-10 rounded-full bg-yellow-50 px-2 py-1 text-[10px] font-bold text-yellow-700 shadow-sm">
          {p.categoryLinks?.[0]?.productItem || "محصول"}
        </div>

        <div className="flex h-32 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#fffaf0] to-[#f7efd9] sm:h-36">
          {imageName ? (
            <img
              src={imageName}
              alt={p.title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <ShoppingBag className="h-12 w-12 text-yellow-600" />
          )}
        </div>

        <div className="px-1 pt-3 text-right">
          <h3 className="line-clamp-1 text-xs font-extrabold text-gray-800 sm:text-sm">
            {p.title}
          </h3>

          <p className="mt-1 line-clamp-1 text-[10px] text-gray-400 sm:text-xs">
            {p.categoryLinks?.map((c) => c.productItem).join(" / ") ||
              "بدون دسته‌بندی"}
          </p>

          <div className="mt-3 flex items-center justify-between gap-2">
            <p className="text-[11px] font-black text-yellow-700 sm:text-sm">
              {Number(p.price).toLocaleString("fa-IR")} ریال
            </p>
          </div>
          {p.status !== "PUBLISHED" ? (
  <button
    onClick={(e) => {
      e.stopPropagation();
      handlePublishProduct(p.id);
    }}
    className="
      mt-3 w-full rounded-xl
      bg-green-600 py-2
      text-xs font-bold text-white
      transition hover:bg-green-700
    "
  >
    انتشار محصول
  </button>
) : (
  <div
    className="
      mt-3 w-full rounded-xl
      bg-green-100 py-2
      text-center text-xs font-bold text-green-700
    "
  >
    ✅ منتشر شده
  </div>
)}
        </div>
      </div>
    );
  })}
</section>

    </main>
  );
}