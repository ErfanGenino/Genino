// ============================================================================
// File: src/pages/vendor/VendorShopPage.jsx
// Description: صفحه فروشگاه فروشنده ژنینو (بعد از تأیید ادمین)
// ============================================================================

import { useEffect, useState } from "react";
import { ShoppingBag, Trash2, Pencil } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import PromoSlider from "@components/Social/PromoSlider.jsx";
import ProductCard from "../../components/Product/ProductCard";




function getLoggedInVendorId() {
  const token = localStorage.getItem("genino_token");

  if (!token) return null;

  try {
    const payloadPart = token.split(".")[1];

    if (!payloadPart) return null;

    const normalizedPayload = payloadPart
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const payload = JSON.parse(
      decodeURIComponent(
        atob(normalizedPayload)
          .split("")
          .map(
            (char) =>
              "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2)
          )
          .join("")
      )
    );

    return payload.vendorId || null;
  } catch (error) {
    console.error("خطا در خواندن اطلاعات توکن:", error);
    return null;
  }
}


export default function VendorShopPage() {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const loggedInVendorId = getLoggedInVendorId();
  const isOwner =
  loggedInVendorId !== null &&
  Number(loggedInVendorId) === Number(vendorId);
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

    // 2. دریافت محصولات فروشگاه
try {
  const productsUrl = isOwner
    ? `${API_BASE_URL}/vendor-products/vendor/${vendorId}`
    : `${API_BASE_URL}/vendor-products/public/vendor/${vendorId}`;

  const fetchOptions = isOwner
    ? {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("genino_token")}`,
          Accept: "application/json",
        },
      }
    : {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      };

  const res = await fetch(productsUrl, fetchOptions);

  const data = await res.json();

  if (!res.ok || !data.ok) {
    throw new Error(data.message || "خطا در دریافت محصولات فروشگاه");
  }

  const fixedProducts = (data.products || []).map((product) => ({
    ...product,

    categoryLinks:
      typeof product.categoryLinks === "string"
        ? JSON.parse(product.categoryLinks)
        : product.categoryLinks || [],

    images:
      typeof product.images === "string"
        ? JSON.parse(product.images)
        : product.images || [],
  }));

  setProducts(fixedProducts);
} catch (err) {
  console.error("GET VENDOR SHOP PRODUCTS ERROR:", err);
  setProducts([]);
}
  }

  load();
}, [vendorId, isOwner, API_BASE_URL]);

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

const handleUnpublishProduct = async (productId) => {

  try {

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/vendor-products/${productId}/unpublish`,
      {
        method:"PATCH",
        headers:{
          Authorization:
          `Bearer ${localStorage.getItem("genino_token")}`,
        },
      }
    );


    const data = await res.json();


    if(!data.ok){

      alert(
        data.message ||
        "خطا در عدم انتشار محصول"
      );

      return;

    }


    setProducts((prev)=>
      prev.map((item)=>
        item.id === productId
        ?
        {
          ...item,
          status:"DRAFT"
        }
        :
        item
      )
    );


  } catch(error){

    console.error(error);

    alert(
      "خطا در ارتباط با سرور"
    );

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

      {isOwner && (
        <button
          type="button"
          onClick={() => handleDeleteHeaderImage(activeHeaderIndex)}
          className="absolute left-4 top-4 z-50 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600 shadow"
        >
           حذف تصویر
        </button>
      )}
    </div>
  ) : (
    <div className="mx-auto flex max-w-3xl aspect-[3/2] flex-col items-center justify-center rounded-[1.75rem] border border-yellow-200/70 bg-gradient-to-r from-yellow-100 to-yellow-200 px-4 text-center shadow-[0_18px_45px_rgba(120,90,20,0.12)]">
  <ShoppingBag className="mb-3 h-10 w-10 text-yellow-700" />

  {isOwner ? (
    <>
      <p className="text-sm font-black text-[#6f4a18]">
        تصویر هدر فروشگاه خود را اضافه کنید
      </p>

      <p className="mt-2 max-w-md text-xs leading-6 text-gray-500">
        می‌توانید عکس فروشگاه، برند، ویترین، محیط کار یا تصویر شاخص
        کسب‌وکارتان را قرار دهید.
      </p>

      <p className="mt-1 text-xs font-bold text-yellow-700">
        بهترین سایز پیشنهادی: 1536 × 1024 پیکسل
      </p>
    </>
  ) : (
    <>
      <p className="text-sm font-black text-[#6f4a18]">
        {vendor?.storeName || "فروشگاه ژنینو"}
      </p>

      <p className="mt-2 text-xs text-gray-500">
        فروشگاه فعال در ژنینو
      </p>
    </>
  )}
</div>
  )}
</div>

{isOwner && (
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
)}
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

  {isOwner && (
  <div className="mt-3 inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
    {vendor?.statusText || "فعال"}
  </div>
)}
</div>
      </div>

      {/* ================= آمار ================= */}
{isOwner ? (
  <div className="mt-4 grid grid-cols-2 gap-3">
    <div className="rounded-2xl bg-white p-3 text-center shadow">
      <p className="text-xs text-gray-400">تعداد محصولات</p>

      <p className="text-lg font-black text-yellow-700">
        {products.length}/{vendor?.packageWindowCount}
      </p>
    </div>

    <button
  onClick={() => navigate("/vendor/reports")}
  className="
    rounded-2xl bg-white p-3 shadow
    transition-all duration-200
    hover:shadow-lg hover:-translate-y-0.5
    active:scale-95
    text-center
  "
>
  <p className="text-xs text-gray-400">
    گزارش‌های مهم مدیریتی
  </p>

  <p className="mt-2 text-sm font-bold text-[#7a5526]">
    مشاهده گزارش‌ها
  </p>
</button>
  </div>
) : (
  <div className="mt-4 rounded-2xl bg-white p-4 text-center shadow">
    <p className="text-xs text-gray-400">تعداد محصولات فروشگاه</p>

    <p className="mt-1 text-lg font-black text-yellow-700">
      {filteredProducts.length}
    </p>
  </div>
)}

      {/* ================= دکمه افزودن محصول ================= */}
      {isOwner && canAddProduct && (
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

      {isOwner && !canAddProduct && (
        <div className="mt-4 text-center text-red-500 text-xs font-bold">
          شما به سقف محصولات بسته خود رسیده‌اید
        </div>
      )}

      

      <section
  className="
    relative z-10 mt-6 mx-auto grid max-w-5xl
    grid-cols-2 gap-3
    sm:grid-cols-3 sm:gap-4
    lg:grid-cols-4 lg:gap-6
  "
>

{
filteredProducts.map((p)=>(

  <div
    key={p.id}
    className="flex flex-col gap-2"
  >

    <ProductCard
      product={p}
      source="vendor-shop"
      showFavorite={!isOwner}
    />


    {isOwner && (

  <>

    {/* دکمه‌های مدیریت */}

    <div
      className="
      grid
      grid-cols-2
      gap-2
      "
    >

      {/* ویرایش */}

      <button

        onClick={()=>{
          navigate(
            `/vendor/product/edit/${p.id}`
          );
        }}

        className="
        flex
        items-center
        justify-center
        gap-1
        rounded-xl
        bg-yellow-50
        py-2
        text-xs
        font-bold
        text-yellow-700
        shadow-sm
        transition
        hover:bg-yellow-100
        "

      >

        <Pencil size={14}/>

        ویرایش

      </button>



      {/* حذف */}

      <button

        onClick={()=>{
          handleDeleteProduct(p.id);
        }}

        className="
        flex
        items-center
        justify-center
        gap-1
        rounded-xl
        bg-red-50
        py-2
        text-xs
        font-bold
        text-red-600
        shadow-sm
        transition
        hover:bg-red-100
        "

      >

        <Trash2 size={14}/>

        حذف

      </button>

    </div>



    {/* انتشار */}

    {
      p.status === "PUBLISHED"

      ?

      (

        <button
          onClick={()=>{
            handleUnpublishProduct(p.id);
          }}

          className="
          w-full
          rounded-xl
          bg-orange-50
          py-2
          text-xs
          font-bold
          text-orange-600
          shadow-sm
          transition
          hover:bg-orange-100
          "
        >

          عدم انتشار محصول

        </button>

      )

      :

      (

        <button

          onClick={()=>{
            handlePublishProduct(p.id);
          }}

          className="
          w-full
          rounded-xl
          bg-green-600
          py-2
          text-xs
          font-bold
          text-white
          shadow-sm
          transition
          hover:bg-green-700
          "

        >

          انتشار محصول

        </button>

      )

    }


  </>

)}

  </div>

))
}

</section>

    </main>
  );
}