// D:\projects\Genino\genino-web\src\pages\ProductCompareResult.jsx

import { useEffect, useMemo, useState } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ProductCompareResult() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // مثال:
  // /shop/compare/products/result?ids=12,18,25
  const productIds = useMemo(() => {
    const idsParam = searchParams.get("ids") || "";

    return idsParam
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean)
      .slice(0, 4);
  }, [searchParams]);

  useEffect(() => {
    async function loadProducts() {
      if (productIds.length < 2) {
        setProducts([]);
        setLoading(false);
        setError(
          "برای مقایسه حداقل دو کالا باید انتخاب شده باشد."
        );
        return;
      }

      try {
        setLoading(true);
        setError("");

        const requests = productIds.map(async (id) => {
          const res = await fetch(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/vendor-products/public/${id}`
          );

          const data = await res.json();

          if (!res.ok || !data?.ok || !data?.product) {
            throw new Error(
              data?.message ||
                "اطلاعات یکی از کالاها دریافت نشد."
            );
          }

          const product = data.product;

          return {
            ...product,

            images:
              typeof product.images === "string"
                ? JSON.parse(product.images)
                : Array.isArray(product.images)
                ? product.images
                : [],

            categoryLinks:
              typeof product.categoryLinks === "string"
                ? JSON.parse(product.categoryLinks)
                : Array.isArray(product.categoryLinks)
                ? product.categoryLinks
                : [],

            inventoryRows:
              typeof product.inventoryRows === "string"
                ? JSON.parse(product.inventoryRows)
                : Array.isArray(product.inventoryRows)
                ? product.inventoryRows
                : [],
          };
        });

        const loadedProducts =
          await Promise.all(requests);

        setProducts(loadedProducts);
      } catch (err) {
        console.error(
          "PRODUCT COMPARE LOAD ERROR:",
          err
        );

        setError(
          err?.message ||
            "خطایی در دریافت اطلاعات کالاها رخ داد."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [productIds]);


  // =====================================================
// ⚖️ ابزارهای مقایسه کالاها
// =====================================================

const showValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (Array.isArray(value)) {
    return value.length > 0
      ? value.filter(Boolean).join("، ")
      : "—";
  }

  if (typeof value === "boolean") {
    return value ? "دارد" : "ندارد";
  }

  return String(value);
};

const getProductImage = (product) => {
  if (
    !Array.isArray(product?.images) ||
    product.images.length === 0
  ) {
    return "";
  }

  const firstImage = product.images[0];

  return typeof firstImage === "string"
    ? firstImage
    : firstImage?.url || "";
};

const getProductCategory = (product) => {
  const link = product?.categoryLinks?.[0];

  return link?.category || "—";
};

const getProductGroup = (product) => {
  const link = product?.categoryLinks?.[0];

  return link?.group || "—";
};

const getProductItem = (product) => {
  const link = product?.categoryLinks?.[0];

  return link?.productItem || "—";
};

const comparisonSections = [
  {
    title: "مشخصات عمومی",
    rows: [
      {
        label: "نام کالا",
        getValue: (product) => product.title,
      },
      {
        label: "برند فارسی",
        getValue: (product) => product.brandFa,
      },
      {
        label: "برند انگلیسی",
        getValue: (product) => product.brandEn,
      },
      {
        label: "کشور سازنده",
        getValue: (product) => product.madeInCountry,
      },
      {
        label: "دسته‌بندی",
        getValue: getProductCategory,
      },
      {
        label: "گروه",
        getValue: getProductGroup,
      },
      {
        label: "نوع کالا",
        getValue: getProductItem,
      },
    ],
  },

  {
    title: "مناسب برای",
    rows: [
      {
        label: "جنسیت",
        getValue: (product) => product.gender,
      },
      {
        label: "فصل",
        getValue: (product) => product.seasons,
      },
      {
        label: "بازه سنی",
        getValue: (product) => product.ageRanges,
      },
    ],
  },

  {
    title: "مشخصات فیزیکی",
    rows: [
      {
        label: "جنس",
        getValue: (product) => product.material,
      },
      {
        label: "وزن",
        getValue: (product) =>
          product.weight
            ? `${product.weight} گرم`
            : null,
      },
      {
        label: "طول",
        getValue: (product) =>
          product.length
            ? `${product.length} سانتی‌متر`
            : null,
      },
      {
        label: "عرض",
        getValue: (product) =>
          product.width
            ? `${product.width} سانتی‌متر`
            : null,
      },
      {
        label: "ارتفاع",
        getValue: (product) =>
          product.height
            ? `${product.height} سانتی‌متر`
            : null,
      },
    ],
  },

  {
  title: "گارانتی، استاندارد و نگهداری",
  rows: [
    {
  label: "گارانتی",
  getValue: (product) =>
    product.hasWarranty === "دارد" ||
    product.hasWarranty === true
      ? "دارد"
      : "ندارد",
},

{
  label: "مدت گارانتی",
  getValue: (product) => {
    const hasWarranty =
      product.hasWarranty === "دارد" ||
      product.hasWarranty === true;

    if (!hasWarranty) {
      return "ندارد";
    }

    if (!product.warrantyPeriod) {
      return "—";
    }

    return `${product.warrantyPeriod} ${
      product.warrantyUnit || ""
    }`.trim();
  },
},

    {
      label: "استانداردها",
      getValue: (product) =>
        product.standards,
    },

    {
      label: "روش نگهداری",
      getValue: (product) =>
        product.careInstructions,
    },

    {
      label: "توضیحات تکمیلی نگهداری",
      getValue: (product) =>
        product.careNote,
    },
  ],
},
];

  if (loading) {
    return (
      <main
        dir="rtl"
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#faf7ef]
          p-6
        "
      >
        <div className="text-center">
          <div
            className="
              mx-auto
              h-10
              w-10
              animate-spin
              rounded-full
              border-4
              border-yellow-100
              border-t-[#b88724]
            "
          />

          <p
            className="
              mt-4
              text-sm
              font-black
              text-[#6f4a18]
            "
          >
            در حال آماده‌سازی مقایسه کالاها...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main
        dir="rtl"
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#faf7ef]
          p-6
        "
      >
        <div
          className="
            w-full
            max-w-md
            rounded-[2rem]
            border
            border-yellow-100
            bg-white
            p-6
            text-center
            shadow-xl
          "
        >
          <h1
            className="
              text-lg
              font-black
              text-[#6f4a18]
            "
          >
            مقایسه کالاها
          </h1>

          <p
            className="
              mt-3
              text-sm
              leading-7
              text-gray-500
            "
          >
            {error}
          </p>

          <button
            type="button"
            onClick={() => navigate("/shop/compare")}
            className="
              mt-5
              rounded-2xl
              bg-gradient-to-r
              from-[#7a5526]
              via-[#b88724]
              to-[#d4af37]
              px-5
              py-2.5
              text-sm
              font-black
              text-white
              shadow
            "
          >
            بازگشت به مقایسه تخصصی
          </button>
        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="
        min-h-screen
        bg-[#faf7ef]
        px-4
        py-6
        sm:px-6
      "
    >
      <div className="mx-auto w-full max-w-7xl">

        {/* هدر */}
        <div
          className="
            mb-6
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <div>
            <h1
              className="
                text-xl
                font-black
                text-[#4b2f17]
                sm:text-2xl
              "
            >
              مقایسه تخصصی کالاها
            </h1>

            <p
              className="
                mt-1
                text-xs
                text-gray-500
              "
            >
              {products.length} کالا برای مقایسه انتخاب شده است.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              flex
              shrink-0
              items-center
              gap-2
              rounded-full
              border
              border-yellow-200
              bg-white
              px-4
              py-2
              text-xs
              font-black
              text-[#7a5526]
              shadow-sm
              transition
              hover:bg-yellow-50
            "
          >
            <ArrowRight className="h-4 w-4" />
            بازگشت
          </button>
        </div>

        {/* ⚖️ جدول مقایسه تخصصی */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
  className="
    overflow-hidden
    rounded-[2rem]
    border
    border-yellow-100
    bg-white
    shadow-[0_18px_55px_rgba(75,47,23,0.10)]
  "
>
  {/* اسکرول افقی برای موبایل */}
  <div className="overflow-x-auto">
    <div
  style={{
    minWidth: `${170 + products.length * 180}px`,
  }}
>
      {/* =========================================
          سربرگ کالاها
      ========================================= */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: `170px repeat(${products.length}, minmax(180px, 1fr))`,
        }}
      >
        {/* ستون مشخصات */}
        <div
          className="
            flex
            items-center
            justify-center
            border-l
            border-yellow-100
            bg-gradient-to-br
            from-[#4b2f17]
            via-[#7a5526]
            to-[#b88724]
            p-4
            text-center
            text-sm
            font-black
            text-white
          "
        >
          مشخصات
        </div>

        {/* کالاها */}
        {products.map((product) => {
          const image = getProductImage(product);

          return (
            <div
              key={`header-${product.id}`}
              className="
                border-l
                border-yellow-100
                bg-[#fffdf8]
                p-4
                text-center
                last:border-l-0
              "
            >
              {/* تصویر */}
              <div
                className="
                  mx-auto
                  flex
                  h-32
                  w-full
                  max-w-[150px]
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-2xl
                  bg-[#faf7ef]
                  p-2
                "
              >
                {image ? (
                  <img
                    src={image}
                    alt={product.title || "کالا"}
                    className="
                      h-full
                      w-full
                      object-contain
                    "
                  />
                ) : (
                  <span className="text-4xl">
                    🛍️
                  </span>
                )}
              </div>

              {/* عنوان */}
              <h2
                className="
                  mt-3
                  line-clamp-2
                  min-h-[40px]
                  text-xs
                  font-black
                  leading-5
                  text-[#4b2f17]
                "
              >
                {product.title || "کالا"}
              </h2>

              {/* فروشنده */}
              <p
                className="
                  mt-2
                  truncate
                  text-[10px]
                  text-gray-400
                "
              >
                {product.vendor?.businessName ||
                  "فروشنده ثبت نشده"}
              </p>

              {/* قیمت */}
              <div
                className="
                  mt-3
                  rounded-xl
                  bg-[#faf7ef]
                  px-2
                  py-2
                  text-xs
                  font-black
                  text-[#b88724]
                "
              >
                {Number(
                  product.price || 0
                ).toLocaleString("fa-IR")}{" "}
                ریال
              </div>

              {/* مشاهده کالا */}
              <button
                type="button"
                onClick={() =>
                  navigate(`/product/${product.id}`)
                }
                className="
                  mt-3
                  w-full
                  rounded-xl
                  bg-gradient-to-r
                  from-[#7a5526]
                  via-[#b88724]
                  to-[#d4af37]
                  px-3
                  py-2
                  text-[10px]
                  font-black
                  text-white
                  shadow-sm
                  transition
                  hover:scale-[1.02]
                "
              >
                مشاهده کالا
              </button>
            </div>
          );
        })}
      </div>

      {/* =========================================
          بخش‌های مقایسه
      ========================================= */}
      {comparisonSections.map((section) => (
        <div key={section.title}>

          {/* عنوان بخش */}
          <div
            className="
              border-y
              border-yellow-200
              bg-gradient-to-r
              from-[#f7ecd0]
              via-[#fff8e8]
              to-[#f7ecd0]
              px-5
              py-3
              text-sm
              font-black
              text-[#6f4a18]
            "
          >
            {section.title}
          </div>

          {/* ردیف‌ها */}
          {section.rows.map((row, rowIndex) => (
            <div
              key={`${section.title}-${row.label}`}
              className={`
                grid
                border-b
                border-yellow-100
                last:border-b-0

                ${
                  rowIndex % 2 === 0
                    ? "bg-white"
                    : "bg-[#fffdf8]"
                }
              `}
              style={{
                gridTemplateColumns: `170px repeat(${products.length}, minmax(180px, 1fr))`,
              }}
            >
              {/* نام مشخصه */}
              <div
                className="
                  flex
                  min-h-[58px]
                  items-center
                  border-l
                  border-yellow-100
                  bg-[#faf7ef]
                  px-4
                  py-3
                  text-xs
                  font-black
                  text-[#6f4a18]
                "
              >
                {row.label}
              </div>

              {/* مقدار هر کالا */}
              {products.map((product) => (
                <div
                  key={`${row.label}-${product.id}`}
                  className="
                    flex
                    min-h-[58px]
                    items-center
                    justify-center
                    border-l
                    border-yellow-100
                    px-4
                    py-3
                    text-center
                    text-xs
                    font-medium
                    leading-6
                    text-gray-600
                    last:border-l-0
                  "
                >
                  {showValue(
                    row.getValue(product)
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>

  {/* توضیح پایین */}
  <div
    className="
      border-t
      border-yellow-100
      bg-[#faf7ef]
      px-5
      py-4
      text-center
      text-[10px]
      leading-6
      text-gray-400
    "
  >
    اطلاعات این جدول بر اساس مشخصات ثبت‌شده
    توسط فروشندگان در ژنینو نمایش داده می‌شود.
  </div>
</motion.div>

      </div>
    </main>
  );
}