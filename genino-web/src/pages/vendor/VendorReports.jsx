// D:\projects\Genino\genino-web\src\pages\vendor\VendorReports.jsx

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Box,
  CheckCircle2,
  PackageOpen,
  Store,
  TrendingUp,
} from "lucide-react";
import {
  getVendorPackages,
} from "../../services/api";

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
              `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`
          )
          .join("")
      )
    );
    return payload.vendorId || payload.id || payload.vendor?.id || null;
  } catch (error) {
    console.error("خطا در خواندن اطلاعات فروشنده از توکن:", error);
    return null;
  }
}


function getFinalPrice(product){
  const price = Number(product.price || 0);
  if(product.discountType === "PERCENT"){
    return Math.max(
      price -
      (price * Number(product.discountValue || 0) / 100),
      0
    );
  }
  if(product.discountType === "AMOUNT"){
    return Math.max(
      price -
      Number(product.discountValue || 0),
      0
    );
  }
  return price;
}


function getInventorySummary(product){
  let rows = product.inventoryRows;
  if(typeof rows === "string"){
    try{
      rows = JSON.parse(rows);
    }catch{
      rows=[];
    }
  }
  if(!Array.isArray(rows)){
    return [];
  }
  return rows.flatMap(row =>
    (row.colors || []).map(color => ({
      size: row.size,
      color: color.colorName,
      quantity: color.quantity,
      unit: color.unit || "عدد"
    }))
  );

}

export default function VendorReports() {
  const navigate = useNavigate();

  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [vendorPackages, setVendorPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const vendorId = getLoggedInVendorId();

  useEffect(() => {
    async function loadReports() {
      if (!vendorId) {
        setErrorMessage("اطلاعات ورود فروشنده پیدا نشد.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setErrorMessage("");

        const token = localStorage.getItem("genino_token");

        const [vendorResponse, productsResponse, packagesResponse] =
  await Promise.all([
    fetch(`${API_BASE_URL}/vendors/${vendorId}`, {
      headers: {
        Accept: "application/json",
      },
    }),

    fetch(`${API_BASE_URL}/vendor-products/vendor/${vendorId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }),

    getVendorPackages(),
  ]);;

        const vendorData = await vendorResponse.json();
        const productsData = await productsResponse.json();
        const packagesData = packagesResponse;

        if (!vendorResponse.ok || !vendorData.ok) {
          throw new Error(
            vendorData.message || "خطا در دریافت اطلاعات فروشگاه"
          );
        }

        if (!productsResponse.ok || !productsData.ok) {
          throw new Error(
            productsData.message || "خطا در دریافت محصولات فروشگاه"
          );
        }

        setVendor(vendorData.vendor);
        setVendorPackages(
  packagesData?.packages || []
);
        setProducts(
          Array.isArray(productsData.products)
            ? productsData.products
            : []
        );
      } catch (error) {
        console.error("VENDOR REPORTS ERROR:", error);

        setErrorMessage(
          error.message || "خطا در دریافت گزارش‌های مدیریتی"
        );
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, [API_BASE_URL, vendorId]);

  const reports = useMemo(() => {
    const totalProducts = products.length;

    const publishedProducts = products.filter(
      (product) => product.status === "PUBLISHED"
    ).length;

    const draftProducts = products.filter(
      (product) => product.status !== "PUBLISHED"
    ).length;

    const selectedPackage =
  vendorPackages.find(
    (pkg) =>
      pkg.id === vendor?.selectedPackageId
  );

const packageLimit =
  Number(selectedPackage?.windowCount) || 0;

    const remainingCapacity =
      packageLimit > 0
        ? Math.max(packageLimit - totalProducts, 0)
        : 0;

    const usagePercentage =
      packageLimit > 0
        ? Math.min(
            Math.round((totalProducts / packageLimit) * 100),
            100
          )
        : 0;

    return {
      totalProducts,
      publishedProducts,
      draftProducts,
      packageLimit,
      remainingCapacity,
      usagePercentage,
    };
  }, [products, vendor, vendorPackages]);
  

  const recentProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();

        return dateB - dateA;
      })
      .slice(0, 5);
  }, [products]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf7ef] p-4">
        <div className="rounded-3xl bg-white px-8 py-6 text-center shadow">
          <BarChart3 className="mx-auto h-10 w-10 animate-pulse text-yellow-700" />

          <p className="mt-3 text-sm font-bold text-[#6f4a18]">
            در حال آماده‌سازی گزارش‌های مدیریتی...
          </p>
        </div>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className="min-h-screen bg-[#faf7ef] p-4 text-right">
        <div className="mx-auto max-w-3xl rounded-3xl border border-red-100 bg-white p-6 shadow">
          <p className="font-bold text-red-600">
            {errorMessage}
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-4 rounded-2xl bg-[#7a5526] px-5 py-2 text-sm font-bold text-white"
          >
            بازگشت
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf7ef] p-4 text-right">
      <div className="mx-auto max-w-6xl">
        {/* هدر صفحه */}
        <section className="overflow-hidden rounded-3xl border border-yellow-100 bg-white shadow-[0_16px_45px_rgba(120,90,20,0.08)]">
          <div className="bg-gradient-to-l from-[#7a5526] via-[#b88724] to-[#d4af37] p-5 text-white sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-7 w-7" />

                  <h1 className="text-xl font-black sm:text-2xl">
                    گزارش‌های مهم مدیریتی
                  </h1>
                </div>

                <p className="mt-2 text-xs leading-6 text-white/85 sm:text-sm">
                  نمای کلی عملکرد فروشگاه و وضعیت محصولات شما در ژنینو
                </p>

                <p className="mt-3 text-sm font-bold">
                  {vendor?.businessName || "فروشگاه ژنینو"}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(`/vendor/shop/${vendorId}`)
                }
                className="flex shrink-0 items-center gap-1 rounded-2xl bg-white/15 px-3 py-2 text-xs font-bold backdrop-blur transition hover:bg-white/25"
              >
                <ArrowRight size={16} />
                بازگشت
              </button>
            </div>
          </div>
        </section>

        {/* آمار فشرده محصولات */}
<section className="mt-3 grid grid-cols-4 gap-1.5 sm:gap-2">
  <ReportCard
    title="کل محصولات"
    value={reports.totalProducts}
    icon={<Box size={15} />}
  />

  <ReportCard
    title="منتشر شده"
    value={reports.publishedProducts}
    icon={<CheckCircle2 size={15} />}
    valueClassName="text-green-600"
  />



  <ReportCard
    title="ظرفیت باقی‌مانده"
    value={
      reports.packageLimit > 0
        ? reports.remainingCapacity
        : "—"
    }
    icon={<PackageOpen size={15} />}
  />
</section>

    

        {/* گزارش‌های آینده */}
        <section className="mt-5 grid gap-4 lg:grid-cols-3">
          <FutureReportCard
            title="فروش و درآمد"
            description="مبلغ فروش، کارمزد ژنینو و مبلغ قابل تسویه"
          />

          <FutureReportCard
            title="سفارش‌ها"
            description="سفارش‌های جدید، در حال پردازش و تحویل‌شده"
          />

          <FutureReportCard
            title="محصولات پربازدید"
            description="مقایسه بازدید، فروش و نرخ تبدیل محصولات"
          />
        </section>

        {/* آخرین محصولات */}
        <section className="mt-5 rounded-3xl border border-white/80 bg-white p-5 shadow-[0_14px_38px_rgba(120,90,20,0.07)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-yellow-700" />

                <h2 className="font-black text-[#6f4a18]">
                  آخرین محصولات ثبت‌شده
                </h2>
              </div>

              <p className="mt-1 text-xs text-gray-400">
                پنج محصولی که اخیراً به فروشگاه اضافه شده‌اند
              </p>
            </div>
          </div>

          {recentProducts.length > 0 ? (
            <div className="mt-4 space-y-3">
              {recentProducts.map((product) => (
  <button
    key={product.id}
    type="button"
    onClick={() =>
      navigate(`/product/${product.id}`)
    }
    className="
      flex w-full items-center gap-3
      rounded-2xl border border-gray-100
      bg-[#fffdf8] p-3 text-right
      transition hover:border-yellow-200
      hover:bg-yellow-50/40
    "
  >

    {/* تصویر */}
    <div className="
      h-16 w-16 shrink-0
      overflow-hidden rounded-2xl
      bg-yellow-50
    ">
      {product.images?.[0] ? (
        <img
          src={
            Array.isArray(product.images)
              ? product.images[0]
              : JSON.parse(product.images)[0]
          }
          alt={product.title}
          className="
            h-full w-full
            object-cover
          "
        />
      ) : (
        <PackageOpen
          className="
            mx-auto mt-4
            h-8 w-8 text-yellow-300
          "
        />
      )}
    </div>


    {/* اطلاعات */}
    <div className="min-w-0 flex-1">

      <p className="
        line-clamp-1
        text-sm font-black text-gray-800
      ">
        {product.title || "محصول بدون نام"}
      </p>


      <div className="
        mt-2 flex flex-wrap gap-3
        text-[11px] font-bold
      ">

        <span className="
          rounded-full
          bg-blue-50
          px-2 py-1
          text-blue-600
        ">
          👁
          {" "}
          {Number(product.viewsCount || 0)
            .toLocaleString("fa-IR")}
          {" "}
          بازدید
        </span>


        <span className="
          rounded-full
          bg-green-50
          px-2 py-1
          text-green-700
        ">
          🛒
          {" "}
          {Number(product.salesCount || 0)
            .toLocaleString("fa-IR")}
          {" "}
          فروش
        </span>

      </div>


      <div className="mt-2 text-xs">
  {
    getFinalPrice(product) !== Number(product.price || 0)
    &&
    (
      <p className="text-gray-400 line-through">
        {Number(product.price || 0)
          .toLocaleString("fa-IR")}
        {" "}
        ریال
      </p>
    )
  }
  <p className="font-black text-yellow-700">
    💰
    {getFinalPrice(product)
      .toLocaleString("fa-IR")}
    {" "}
    ریال
  </p>
</div>

<div
className="
mt-2
rounded-xl
bg-[#faf7ef]
p-2
text-[10px]
font-bold
text-gray-600
"
>
<p className="mb-1 text-yellow-700">
📦 موجودی کالا
</p>
{
getInventorySummary(product)
.map((item,index)=>(
<div key={index}>
{item.size}
{" - "}
{item.color}
:
{" "}
{item.quantity}
{" "}
{item.unit}
</div>
))
}
</div>

    </div>


    {/* وضعیت */}
    <span
      className={`
        shrink-0
        rounded-full
        px-3 py-1
        text-[10px]
        font-bold
        ${
          product.status === "PUBLISHED"
          ?
          "bg-green-50 text-green-700"
          :
          "bg-orange-50 text-orange-600"
        }
      `}
    >
      {
        product.status === "PUBLISHED"
        ?
        "منتشر شده"
        :
        "منتشر نشده"
      }
    </span>


  </button>
))}
            </div>
          ) : (
            <div className="mt-4 rounded-2xl bg-gray-50 p-5 text-center">
              <PackageOpen className="mx-auto h-9 w-9 text-gray-300" />

              <p className="mt-2 text-sm font-bold text-gray-400">
                هنوز محصولی ثبت نشده است
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function ReportCard({
  title,
  value,
  icon,
  valueClassName = "text-yellow-700",
}) {
  return (
    <div
      className="
        min-w-0 rounded-xl border border-yellow-100
        bg-white px-1 py-2 text-center
        shadow-[0_5px_14px_rgba(120,90,20,0.05)]
        sm:px-2
      "
    >
      <div
        className="
          mx-auto flex h-6 w-6 items-center justify-center
          rounded-lg bg-yellow-50 text-yellow-700
        "
      >
        {icon}
      </div>

      <p
        className="
          mt-1 truncate text-[8px] font-bold text-gray-400
          sm:text-[10px]
        "
      >
        {title}
      </p>

      <p
        className={`
          mt-0.5 text-sm font-black sm:text-base
          ${valueClassName}
        `}
      >
        {Number.isFinite(value)
          ? Number(value).toLocaleString("fa-IR")
          : value}
      </p>
    </div>
  );
}

function FutureReportCard({ title, description }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-yellow-100 bg-white p-5 shadow-[0_14px_38px_rgba(120,90,20,0.06)]">
      <div className="absolute left-3 top-3 rounded-full bg-yellow-50 px-2 py-1 text-[10px] font-bold text-yellow-700">
        به‌زودی
      </div>

      <BarChart3 className="h-8 w-8 text-yellow-700" />

      <h3 className="mt-3 font-black text-[#6f4a18]">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-6 text-gray-400">
        {description}
      </p>
    </div>
  );
}