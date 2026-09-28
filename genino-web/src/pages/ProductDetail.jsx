// D:\projects\Genino\genino-web\src\pages\ProductDetail.jsx

import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  ArrowRight,
  Star,
  ChevronLeft,
  ChevronRight,
  Search,
  ShieldCheck,
  Ruler,
  Sparkles,
  BadgeCheck,
} from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import logo from "../assets/logo-genino.png";
import { useState, useRef, useMemo, useEffect } from "react";
import { shopGroups } from "../data/shopGroups";
import DiscountCountdown from "../components/Core/DiscountCountdown";
import ProductCard from "../components/Product/ProductCard";
import normalizeProduct from "../utils/normalizeProduct";
import { getRecommendedProducts } from "../services/recommendationService";



export default function ProductDetail() {
  // ✈️ انیمیشن پرواز
  const [flyingItems, setFlyingItems] = useState([]);
  const [isBouncing, setIsBouncing] = useState(false);
  const cartRef = useRef(null);
  const { id } = useParams();

  const [searchParams] = useSearchParams();
  const mode =
  searchParams.get("mode") || "shop";
  const giftChildId =
  searchParams.get("childId");
  const giftChildName =
  searchParams.get("childName");
  const [product, setProduct] = useState({
    images: [],
    categoryLinks: [],
    inventoryRows: [],
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [openingVendorPage, setOpeningVendorPage] =
  useState(false);

  const [showLoginModal, setShowLoginModal] =
  useState(false);

  const [addingToCart, setAddingToCart] =
  useState(false);

const [addingToGiftCart, setAddingToGiftCart] =
  useState(false);


const getVendorPagePath = (vendor) => {
  if (!vendor?.id) return null;

  if (vendor.activityType === "product") {
    return `/vendor/shop/${vendor.id}`;
  }

  if (vendor.activityType === "service") {
    switch (vendor.mainActivityField) {
      case "مدارس":
        return `/vendor/service/school/${vendor.id}`;

      case "مهدکودک‌ها":
        return `/vendor/service/kindergarten/${vendor.id}`;

      case "خانه‌های بازی":
        return `/vendor/service/playhouse/${vendor.id}`;

      case "کلاس‌های آموزشی":
        return `/vendor/service/education-class/${vendor.id}`;

      case "کلاس‌های هنری":
        return `/vendor/service/art-class/${vendor.id}`;

      case "کلاس‌های ورزشی":
        return `/vendor/service/sport-class/${vendor.id}`;

      case "معلمان خصوصی":
      case "معلم خصوصی":
        return `/vendor/service/private-teacher/${vendor.id}`;

      default:
        return `/vendor/service/${vendor.id}`;
    }
  }

  if (vendor.activityType === "both") {
    return `/vendor/shop/${vendor.id}`;
  }

  return `/vendor/shop/${vendor.id}`;
};

const handleOpenVendorPage = async () => {
  const productVendorId = product.vendor?.id;

  if (!productVendorId || openingVendorPage) {
    return;
  }

  try {
    setOpeningVendorPage(true);

    /*
      ممکن است اطلاعات داخل product.vendor فقط شامل
      id و businessName باشد؛ بنابراین اطلاعات کامل
      وندور را از API دریافت می‌کنیم.
    */
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/vendors/${productVendorId}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const data = await res.json();

    if (!res.ok || !data?.ok || !data?.vendor) {
      throw new Error(
        data?.message ||
          "اطلاعات ارائه‌دهنده دریافت نشد."
      );
    }

    const targetPath =
      getVendorPagePath(data.vendor);

    if (!targetPath) {
      throw new Error(
        "صفحه ارائه‌دهنده مشخص نیست."
      );
    }

    navigate(targetPath);
  } catch (error) {
    console.error(
      "OPEN PRODUCT VENDOR PAGE ERROR:",
      error
    );

    alert(
      error?.message ||
        "خطا در ورود به صفحه ارائه‌دهنده"
    );
  } finally {
    setOpeningVendorPage(false);
  }
};

  const isVendor = !!localStorage.getItem("genino_vendor_id");
  const {
 addToCart,
 addToGiftCart,
 cartCount,
 giftCartCount
} = useCart();
  const smartRef = useRef(null);
  const [zoomPosition, setZoomPosition] = useState({
  x: "50%",
  y: "50%",
  });
  const [isZooming, setIsZooming] = useState(false);

  

  useEffect(() => {
  async function loadProduct() {
    try {

      // 👁 ثبت بازدید محصول
await fetch(
  `${import.meta.env.VITE_API_BASE_URL}/vendor-products/public/${id}/view`,
  {
    method:"POST",
  }
);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/vendor-products/public/${id}`
      );

      const data = await res.json();

      if (data.ok) {
        setProduct({
          ...data.product,

          images:
            typeof data.product.images === "string"
              ? JSON.parse(data.product.images)
              : data.product.images || [],

          categoryLinks:
            typeof data.product.categoryLinks === "string"
              ? JSON.parse(data.product.categoryLinks)
              : data.product.categoryLinks || [],

          inventoryRows:
            typeof data.product.inventoryRows === "string"
              ? JSON.parse(data.product.inventoryRows)
              : data.product.inventoryRows || [],
        });
      }
      const reviewRes = await fetch(
  `${import.meta.env.VITE_API_BASE_URL}/vendor-products/public/${id}/reviews`
);

const reviewData = await reviewRes.json();

if (reviewData.ok) {
  setReviews(reviewData.reviews);
}
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  loadProduct();
}, [id]);

// 🕐 اسکرول خودکار هر 6 ثانیه برای هر دو بخش
useEffect(() => {
  const interval = setInterval(() => {
    if (relatedRef.current) relatedRef.current.scrollBy({ left: 300, behavior: "smooth" });
    if (smartRef.current) smartRef.current.scrollBy({ left: 300, behavior: "smooth" });
  }, 6000);
  return () => clearInterval(interval);
}, []);

  const categories = ["آموزشی", "هنر", "اسباب‌بازی"];

  const [specSearch, setSpecSearch] = useState("");
  const [activeSpecTab, setActiveSpecTab] = useState("همه");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColorName, setSelectedColorName] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const inventoryOptions = Array.isArray(product.inventoryRows)
    ? product.inventoryRows
    : [];

  const groupTitle =
  shopGroups
    .flatMap((section) => section.groups)
    .find((g) => g.key === product.categoryLinks?.[0]?.group)?.title ||
  "ثبت نشده";

const availableSizes = [
  ...new Set(
    inventoryOptions.map((item) => item.size)
  ),
];


const selectedSizeRow = inventoryOptions.find(
  (item) => item.size === selectedSize
);


const availableColorsForSelectedSize =
  selectedSizeRow?.colors || [];

const allAvailableColors = [
  ...new Map(
    inventoryOptions
      .flatMap((item) => item.colors || [])
      .map((color) => [
        color.colorName,
        color,
      ])
  ).values(),
];


const activeColorsForSelectedSize =
  selectedSizeRow?.colors?.map(
    (color) => color.colorName
  ) || [];

const selectedInventory = selectedSizeRow?.colors?.find(
  (color) =>
    color.colorName === selectedColorName
);

const maxQuantity =
  Number(selectedInventory?.quantity || 0);

function getStockText(quantity, unit = "عدد") {
  const count = Number(quantity || 0);

  if (count <= 0) {
    return "ناموجود";
  }

  if (count <= 5) {
    return `تنها ${count} ${unit} باقی مانده`;
  }

  if (count <= 10) {
    return `${count} ${unit} موجود`;
  }

  return "موجود است";
}


const activeDiscount = useMemo(() => {

  if (!product.discountType || product.discountType === "NONE") {
    return null;
  }


  const now = new Date();


  if (product.discountStartAt) {
    const start = new Date(product.discountStartAt);

    if (now < start) {
      return null;
    }
  }


  if (product.discountEndAt) {
    const end = new Date(product.discountEndAt);

    if (now > end) {
      return null;
    }
  }


  const price = Number(product.price || 0);

  let finalPrice = price;


  if (product.discountType === "PERCENT") {

    finalPrice =
      price -
      (price * Number(product.discountValue || 0)) / 100;

  }


  if (product.discountType === "AMOUNT") {

    finalPrice =
      price -
      Number(product.discountValue || 0);

  }


  if (finalPrice < 0) {
    finalPrice = 0;
  }


  return {
    oldPrice: price,
    finalPrice,
    type: product.discountType,
    value: product.discountValue,
  };


}, [product]);

const cartProduct = {
  id: product.id,
  name: product.title,
  title: product.title,
  price:
    activeDiscount?.finalPrice ??
    Number(product.price || 0),
  originalPrice: Number(product.price || 0),
  discountType: activeDiscount?.type || "NONE",
  discountValue: activeDiscount?.value || null,
  image: product.images?.[0] || logo,
  images: product.images || [],
  category: product.categoryLinks?.[0]?.productItem || "محصول",
  selectedSize,
  selectedColorName: selectedInventory?.colorName,
  selectedColorHex: selectedInventory?.colorHex,
  selectedUnit: selectedInventory?.unit,
  quantity: selectedQuantity,
};



const productSpecs = [
  {
    group: "معرفی کالا",
    icon: <Sparkles className="h-4 w-4" />,
    items: [
      ["برند فارسی", product.brandFa || "ژنینو"],
      ["برند انگلیسی", product.brandEn || "Genino"],
      ["کشور سازنده", product.madeInCountry || "ثبت نشده"],
      ["جنس کالا", product.material || "پارچه ضد حساسیت"],
      ["دسته‌بندی کالا", product.categoryLinks?.[0]?.category || product.category || "ثبت نشده"],
      ["گروه کالا", groupTitle],
      ["عنوان کالا", product.categoryLinks?.[0]?.productItem || "ثبت نشده"],
    ],
  },
  {
  group: "مناسب برای",
  icon: <BadgeCheck className="h-4 w-4" />,
  items: [
    [
      "جنسیت",
      Array.isArray(product.gender) && product.gender.length
        ? product.gender.join("، ")
        : "ثبت نشده",
    ],
    [
      "فصل",
      Array.isArray(product.seasons) && product.seasons.length
        ? product.seasons.join("، ")
        : "ثبت نشده",
    ],
    [
      "بازه سنی",
      Array.isArray(product.ageRanges) && product.ageRanges.length
        ? product.ageRanges.join("، ")
        : "ثبت نشده",
    ],
  ],
},
  {
  group: "مشخصات فیزیکی",
  icon: <Ruler className="h-4 w-4" />,
  items: [
    [
  "وزن",
  product.weight
    ? `${product.weight} کیلوگرم`
    : "ثبت نشده",
],
[
  "طول",
  product.length
    ? `${product.length} سانتی‌متر`
    : "ثبت نشده",
],
[
  "عرض",
  product.width
    ? `${product.width} سانتی‌متر`
    : "ثبت نشده",
],
[
  "ارتفاع",
  product.height
    ? `${product.height} سانتی‌متر`
    : "ثبت نشده",
],
    [
      "سایر مشخصات فیزیکی",
      product.physicalDetailsNote || "ثبت نشده",
    ],
  ],
},
  {
  group: "گارانتی، استاندارد و نگهداری",
  icon: <ShieldCheck className="h-4 w-4" />,
  items: [
    [
  "گارانتی",
  product.hasWarranty === "دارد" ||
  product.hasWarranty === true
    ? "دارد"
    : "ندارد",
],
[
  "مدت گارانتی",
  product.hasWarranty === "دارد" ||
  product.hasWarranty === true
    ? `${product.warrantyPeriod || ""} ${
        product.warrantyUnit || ""
      }`.trim() || "ثبت نشده"
    : "ندارد",
],
    [
      "استانداردها",
      Array.isArray(product.standards) && product.standards.length
        ? product.standards.join("، ")
        : "ثبت نشده",
    ],
    [
      "روش نگهداری",
      Array.isArray(product.careInstructions) &&
      product.careInstructions.length
        ? product.careInstructions.join("، ")
        : "ثبت نشده",
    ],
    [
      "توضیحات تکمیلی نگهداری",
      product.careNote || "ثبت نشده",
    ],
  ],
},
];

const specTabs = ["همه", ...productSpecs.map((s) => s.group)];

const filteredSpecs = productSpecs
  .filter((section) => activeSpecTab === "همه" || section.group === activeSpecTab)
  .map((section) => ({
    ...section,
    items: section.items.filter(([label, value]) =>
      `${label} ${value}`.toLowerCase().includes(specSearch.toLowerCase())
    ),
  }))
  .filter((section) => section.items.length > 0);

  // محصولات مشابه
  const [relatedProducts,setRelatedProducts] = useState([]);
useEffect(()=>{
async function loadRelatedProducts(){
try{
const res = await fetch(
`${import.meta.env.VITE_API_BASE_URL}/vendor-products/public/${id}/related`
);
const data = await res.json();
if(data.ok){
setRelatedProducts(
data.products.map(normalizeProduct)
);
}
}catch(err){
console.error(
"RELATED PRODUCTS ERROR",
err
);
}
}
if(id){
loadRelatedProducts();
}
},[id]);

  // 🤖 پیشنهاد هوشمند ژنینو
const [
  recommendedProducts,
  setRecommendedProducts
] = useState([]);
useEffect(()=>{
async function loadRecommended(){
try{
const products =
await getRecommendedProducts(
  id,
  giftChildId
);
setRecommendedProducts(
 products.map(normalizeProduct)
);
}catch(error){
console.error(
"SMART RECOMMENDATION ERROR",
error
);
}
}
if(id){
loadRecommended();
}
},[id,giftChildId]);

async function handleAddToCart(e) {

  const sourceRect =
    e.currentTarget.getBoundingClientRect();

  if (addingToCart) {
    return;
  }

  if (!selectedInventory) {
    alert(
      "لطفاً ابتدا سایز و رنگ محصول را انتخاب کنید."
    );
    return;
  }

  if (selectedQuantity > maxQuantity) {
    alert(
      "تعداد انتخابی بیشتر از موجودی کالا است."
    );
    return;
  }

  try {

    setAddingToCart(true);

    const result = await addToCart({
      productId: product.id,

      quantity: selectedQuantity,

      variant: {
        size: selectedSize,
        color: selectedInventory?.colorName,
      },
    });


    // 👤 مهمان است
    if (result?.loginRequired) {
      setShowLoginModal(true);
      return;
    }


    // ❌ خطای API
    if (!result?.ok) {
      alert(
        result?.message ||
        "افزودن کالا به سبد خرید انجام نشد."
      );
      return;
    }


    // ✅ فقط بعد از ثبت موفق در دیتابیس
    handleFlyAnimation(sourceRect);

  } catch (error) {

    console.error(
      "ADD PRODUCT TO CART ERROR:",
      error
    );

    alert(
      "خطایی در افزودن کالا به سبد خرید رخ داد."
    );

  } finally {

    setAddingToCart(false);

  }
}


async function handleAddToGiftCart(e) {

  const sourceRect =
    e.currentTarget.getBoundingClientRect();

  if (addingToGiftCart) {
    return;
  }

  // مدل محصول انتخاب نشده
  if (!selectedInventory) {
    alert(
      "لطفاً ابتدا سایز و رنگ محصول را انتخاب کنید."
    );
    return;
  }

  // تعداد بیشتر از موجودی
  if (selectedQuantity > maxQuantity) {
    alert(
      "تعداد انتخابی بیشتر از موجودی کالا است."
    );
    return;
  }

  // گیرنده هدیه مشخص نیست
  if (!giftChildId) {
    alert(
      "گیرنده هدیه مشخص نیست."
    );
    return;
  }


  try {

    setAddingToGiftCart(true);


    const result =
      await addToGiftCart({
        productId:
          product.id,

        quantity:
          selectedQuantity,

        giftTarget: {
          id:
            giftChildId,

          name:
            giftChildName,

          type:
            "child",
        },

        variant: {
          size:
            selectedSize,

          color:
            selectedInventory?.colorName,
        },
      });


    // 👤 کاربر وارد نشده
    if (result?.loginRequired) {

      setShowLoginModal(true);

      return;
    }


    // ❌ خطای Backend
    if (!result?.ok) {

      alert(
        result?.message ||
        "افزودن کالا به سبد هدیه انجام نشد."
      );

      return;
    }


    // ✅ فقط بعد از ثبت واقعی در دیتابیس
handleFlyAnimation(sourceRect);

setTimeout(() => {

  alert(
    `هدیه برای ${
      giftChildName || "کودک"
    } به سبد هدیه اضافه شد 🎁`
  );

}, 1200);


  } catch (error) {

    console.error(
      "ADD PRODUCT TO GIFT CART ERROR:",
      error
    );

    alert(
      "خطایی در افزودن کالا به سبد هدیه رخ داد."
    );

  } finally {

    setAddingToGiftCart(false);

  }
}


  // ✈️ تابع پرواز
  function handleFlyAnimation(sourceRect) {

  if (!sourceRect || !cartRef.current) {
    return;
  }

  const cartRect =
    cartRef.current.getBoundingClientRect();

  const newItem = {
  id:
    `${Date.now()}-${Math.random()}`,

    startX:
      sourceRect.left +
      sourceRect.width / 2,

    startY:
      sourceRect.top +
      sourceRect.height / 2,

    endX:
      cartRect.left +
      cartRect.width / 2,

    endY:
      cartRect.top +
      cartRect.height / 2,
  };

  setFlyingItems((prev) => [
    ...prev,
    newItem
  ]);

  setTimeout(() => {

    setFlyingItems((prev) =>
      prev.filter(
        (item) =>
          item.id !== newItem.id
      )
    );

    setIsBouncing(true);

    setTimeout(
      () => setIsBouncing(false),
      600
    );

  }, 1000);
}

  // ⭐️ نظرات و امتیازدهی (لوکال)
  const [reviews, setReviews] = useState([]);
  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;
    return (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  }, [reviews]);

  const [myRating, setMyRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0); 
  const [myText, setMyText] = useState("");

  async function submitReview(e) {
  e.preventDefault();

  if (!myRating || !myText.trim()) return;

  const token = localStorage.getItem("genino_token");

  if (!token) {
    alert("برای ثبت نظر باید وارد حساب کاربری شوید.");
    navigate("/login");
    return;
  }

  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/vendor-products/${id}/reviews`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        rating: myRating,
        text: myText.trim(),
      }),
    }
  );

  const data = await res.json();

  if (!data.ok) {
    alert(data.message || "خطا در ثبت نظر");
    return;
  }

  const reviewRes = await fetch(
  `${import.meta.env.VITE_API_BASE_URL}/vendor-products/public/${id}/reviews`
);

const reviewData = await reviewRes.json();

if (reviewData.ok) {
  setReviews(reviewData.reviews);
}

  setMyRating(0);
  setHoverRating(0);
  setMyText("");
}

  // 🧿 اسلایدر «محصولات مشابه»
  const relatedRef = useRef(null);
  const scrollRelated = (dir = 1) => {
    const el = relatedRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.9; // تقریباً یک «صفحه»
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  if (loading) {
  return (
    <div className="min-h-screen bg-[#faf7ef] p-6 text-center font-bold text-[#6f4a18]">
      در حال بارگذاری محصول...
    </div>
  );
}





  return (
    <>
    <AnimatePresence>
  {showLoginModal && (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}

      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/40
        p-4
        backdrop-blur-sm
      "

      onClick={() =>
        setShowLoginModal(false)
      }
    >

      <motion.div
        dir="rtl"

        initial={{
          opacity: 0,
          scale: 0.92,
          y: 20,
        }}

        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}

        exit={{
          opacity: 0,
          scale: 0.92,
          y: 20,
        }}

        onClick={(e) =>
          e.stopPropagation()
        }

        className="
          w-full
          max-w-sm
          rounded-[2rem]
          border
          border-yellow-100
          bg-white
          p-6
          text-center
          shadow-2xl
        "
      >

        <div
          className="
            mx-auto
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-yellow-50
          "
        >
          <ShoppingBag
            className="
              h-7
              w-7
              text-[#b88724]
            "
          />
        </div>


        <h3
          className="
            mt-4
            text-lg
            font-black
            text-[#6f4a18]
          "
        >
          ورود به ژنینو
        </h3>


        <p
          className="
            mt-2
            text-sm
            leading-7
            text-gray-500
          "
        >
          برای افزودن کالا به سبد خرید،
          ابتدا وارد حساب کاربری ژنینو شوید.
        </p>


        <div
          className="
            mt-6
            grid
            grid-cols-2
            gap-3
          "
        >

          <button
            type="button"

            onClick={() =>
              setShowLoginModal(false)
            }

            className="
              rounded-2xl
              border
              border-gray-200
              py-2.5
              text-sm
              font-bold
              text-gray-500
            "
          >
            انصراف
          </button>


          <button
            type="button"

            onClick={() => {

              setShowLoginModal(false);

              navigate(
                `/login?redirect=${encodeURIComponent(
                  window.location.pathname +
                  window.location.search
                )}`
              );

            }}

            className="
              rounded-2xl
              bg-gradient-to-r
              from-[#8a641a]
              to-[#d4af37]
              py-2.5
              text-sm
              font-black
              text-white
              shadow
            "
          >
            ورود / ثبت‌نام
          </button>

        </div>

      </motion.div>

    </motion.div>

  )}
</AnimatePresence>
      {/* ✈️ آیکون پرواز به سبد خرید */}
<AnimatePresence>
  {flyingItems.map((item) => (

    <motion.div
      key={item.id}

      initial={{
        x: 0,
        y: 0,
        scale: 1.2,
        opacity: 1,
      }}

      animate={{
        x:
          item.endX -
          item.startX,

        y:
          item.endY -
          item.startY,

        scale: 0.25,
        opacity: 0.2,
      }}

      exit={{
        opacity: 0,
      }}

      transition={{
        duration: 0.9,
        ease: "easeInOut",
      }}

      style={{
        position: "fixed",

        left:
          item.startX,

        top:
          item.startY,

        transform:
          "translate(-50%, -50%)",

        zIndex: 9999,
      }}

      className="
        pointer-events-none
        text-yellow-500
      "
    >

      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-yellow-400
          text-white
          shadow-xl
        "
      >
        <ShoppingBag
          className="
            h-6
            w-6
          "
        />
      </div>

    </motion.div>

  ))}
</AnimatePresence>

      {/* 🛒 دکمه سبد خرید شناور (بالا سمت چپ) */}
<motion.button
  ref={cartRef}
  onClick={() => navigate("/cart")}
  animate={
    isBouncing
      ? { scale: [1, 1.15, 0.95, 1], rotate: [0, -8, 8, 0] }
      : {}
  }
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="fixed top-24 left-6 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white px-5 py-2.5 rounded-full shadow-[0_4px_18px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_25px_rgba(212,175,55,0.45)] transition-all duration-300 flex items-center gap-2 z-50"
>
  <ShoppingBag className="w-5 h-5" />
  <span className="font-medium text-sm sm:text-base">سبد خرید</span>
  {(cartCount + giftCartCount) > 0 && (
  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
    {cartCount + giftCartCount}
  </span>
)}
</motion.button>

      <main className="relative min-h-screen bg-gradient-to-br from-[#fffdf8] to-[#f7f3e6] text-gray-800 p-6 overflow-hidden flex flex-col items-center">
        {/* 🌿 بک‌گراند دکوراتیو */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.svg
              key={`dna-${i}`}
              viewBox="0 0 100 200"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute opacity-25"
              style={{ top: `${Math.random() * 90}%`, left: `${Math.random() * 90}%`, transformOrigin: "center" }}
              animate={{ rotate: [0, i % 2 === 0 ? 360 : -360] }}
              transition={{ duration: 80 + Math.random() * 30, repeat: Infinity, ease: "linear" }}
            >
              <defs>
                <linearGradient id={`gold-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#b88a1a" />
                </linearGradient>
              </defs>
              <path d="M30,10 C50,30 50,70 30,90 C10,110 10,150 30,170" stroke={`url(#gold-${i})`} strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M70,10 C50,30 50,70 70,90 C90,110 90,150 70,170" stroke={`url(#gold-${i})`} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </motion.svg>
          ))}
        </div>

        {/* 🔹 هدر بالایی */}
        <div dir="rtl" className="relative z-10 w-full flex items-center justify-between mb-10 px-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-yellow-600 font-medium hover:text-yellow-700 transition">
            <ArrowRight className="w-5 h-5" />
            بازگشت 
          </button>

        
        </div>

        {/* 🟡 باکس حرفه‌ای محصول */}
<section
  dir="rtl"
  className="relative z-10 mb-12 w-full max-w-6xl overflow-hidden rounded-[2rem] border border-yellow-100 bg-white/90 p-4 shadow-[0_18px_55px_rgba(120,90,20,0.12)] backdrop-blur-xl sm:p-6"
>
  <div className="grid gap-6 lg:grid-cols-2">
    
    {/* گالری تصاویر محصول */}

<div className="rounded-[1.75rem] bg-gradient-to-br from-[#fff8e8] to-[#f7efd9] p-5">

  {/* تصویر اصلی */}
  <div
  className="
    relative
    mx-auto
    h-72
    w-full
    overflow-hidden
    rounded-2xl
    bg-white
    cursor-zoom-in
  "
  onMouseMove={(e)=>{
    const rect =
      e.currentTarget.getBoundingClientRect();
    const x =
      ((e.clientX - rect.left) / rect.width) * 100;
    const y =
      ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({
      x:`${x}%`,
      y:`${y}%`,
    });
    setIsZooming(true);
  }}
  onMouseLeave={()=>{
    setIsZooming(false);
  }}
  onTouchMove={(e)=>{
    const touch = e.touches[0];
    const rect =
      e.currentTarget.getBoundingClientRect();
    const x =
      ((touch.clientX - rect.left) / rect.width) * 100;
    const y =
      ((touch.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({
      x:`${x}%`,
      y:`${y}%`,
    });
    setIsZooming(true);
  }}
  onTouchEnd={()=>{
    setIsZooming(false);
  }}
>
<img
  src={product.images[selectedImage]}
  alt={product.title}

  className="
    h-full
    w-full
    object-contain
    transition-transform
    duration-200
  "
  style={{
    transform:
      isZooming
      ?
      "scale(2)"
      :
      "scale(1)",

    transformOrigin:
      `${zoomPosition.x} ${zoomPosition.y}`
  }}
/>
</div>


  {/* تصاویر کوچک */}

  <div
    className="
      mt-5
      flex
      gap-3
      overflow-x-auto
      pb-2
      no-scrollbar
    "
  >
    {product.images.map((image, index) => (

      <button
        key={index}
        onClick={() => setSelectedImage(index)}
        className={`
          shrink-0
          rounded-2xl
          border-2
          transition
          ${
            selectedImage === index
              ? "border-[#d4af37]"
              : "border-transparent"
          }
        `}
      >

        <img
          src={image}
          alt=""
          className="h-20 w-20 rounded-xl object-cover"
        />

      </button>

    ))}
  </div>

</div>

    {/* اطلاعات اصلی */}
    <div className="flex flex-col">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-bold text-yellow-700">
          {product.category}
        </span>
        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
          موجود
        </span>
      </div>

      <h1 className="text-2xl font-black text-[#6f4a18] sm:text-3xl">
        {product.title}
      </h1>

      <p className="mt-2 text-sm text-gray-600">
  ارائه‌دهنده{" "}

  <button
    type="button"
    disabled={
      !product.vendor?.id ||
      openingVendorPage
    }
    onClick={handleOpenVendorPage}
    className="
      font-black
      text-[#b88724]
      transition
      hover:text-[#8a641a]
      hover:underline
      disabled:cursor-wait
      disabled:opacity-60
    "
  >
    {openingVendorPage
      ? "در حال ورود..."
      : product.vendor?.businessName ||
        "ثبت نشده"}
  </button>
</p>

      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600">
        {product.description || product.desc || "توضیحاتی برای این کالا ثبت نشده است."}
      </p>

      <div className="mt-5 rounded-2xl border border-yellow-100 bg-yellow-50/70 p-4">

<p className="text-xs font-bold text-gray-500">
قیمت محصول
</p>


{activeDiscount ? (
  <div>
    <div className="mt-2 flex items-center justify-between gap-3">
      <p className="text-sm font-bold text-gray-400 line-through">
        {activeDiscount.oldPrice.toLocaleString("fa-IR")} ریال
      </p>

      <span
        className="
          shrink-0 rounded-full
          bg-red-500
          px-3 py-1
          text-xs font-black
          text-white
        "
      >
        {activeDiscount.type === "PERCENT"
          ? `${activeDiscount.value}٪ تخفیف`
          : `${Number(activeDiscount.value).toLocaleString("fa-IR")} ریال تخفیف`}
      </span>
    </div>

    <p className="mt-2 text-2xl font-black text-yellow-700">
      {activeDiscount.finalPrice.toLocaleString("fa-IR")} ریال
    </p>
    {product.discountEndAt && (
  <DiscountCountdown
    endDate={product.discountEndAt}
    className="mt-2 text-[11px]"
  />
)}
  </div>

) : (

<p className="mt-1 text-2xl font-black text-yellow-700">
{Number(product.price || 0).toLocaleString("fa-IR")} ریال
</p>

)}

</div>

      {/* انتخاب مدل محصول */}
<div className="mt-5 rounded-[1.5rem] border border-yellow-200 bg-[#fffaf0] p-4">
  <div className="mb-4 flex items-center justify-between gap-3">
    <div>
      <h3 className="text-sm font-black text-[#6f4a18]">
        انتخاب مدل محصول
      </h3>

      <p className="mt-1 text-[11px] font-medium text-gray-500">
       رنگ‌های موجود محصول را مشاهده کنید.
با انتخاب سایز، رنگ‌های قابل سفارش مشخص می‌شوند.
      </p>
    </div>

    {selectedInventory ? (
      <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-green-700 shadow-sm">
        {getStockText(
          selectedInventory.quantity,
          selectedInventory.unit
        )}
      </span>
    ) : (
      <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-gray-400 shadow-sm">
        انتخاب نشده
      </span>
    )}
  </div>

  {/* مرحله ۱: انتخاب سایز */}
  <div>
    <p className="mb-2 text-xs font-black text-[#6f4a18]">
      ۱. انتخاب سایز
    </p>

    <div className="flex flex-wrap gap-2">
      {availableSizes.map((size) => (
        <button
          key={size}
          type="button"
          onClick={() => {
            setSelectedSize(size);
            setSelectedColorName("");
            setSelectedQuantity(1);
          }}
          className={`rounded-2xl border px-4 py-2 text-xs font-black transition ${
            selectedSize === size
              ? "border-[#d4af37] bg-[#d4af37] text-white shadow"
              : "border-yellow-200 bg-white text-[#6f4a18] hover:bg-yellow-50"
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  </div>

  {/* مرحله ۲: انتخاب رنگ */}
  <div className="mt-5">
    <p className="mb-2 text-xs font-black text-[#6f4a18]">
      ۲. انتخاب رنگ
    </p>

    <div className="grid grid-cols-4 gap-2 sm:grid-cols-3">

{allAvailableColors.map((item)=>{

const isAvailable =
  activeColorsForSelectedSize.includes(
    item.colorName
  );


return (

<button
key={item.colorName}
type="button"

disabled={
 selectedSize && !isAvailable
}

onClick={()=>{

 if(!isAvailable) return;

 setSelectedColorName(item.colorName);
 setSelectedQuantity(1);

}}

className={`
flex items-center justify-center
rounded-2xl border px-2 py-2
transition

${
selectedColorName === item.colorName
?
"border-[#d4af37] bg-white shadow ring-2 ring-yellow-100"
:
"border-yellow-100 bg-white/70"
}

${
selectedSize && !isAvailable
?
"opacity-30 grayscale cursor-not-allowed"
:
"hover:bg-white"
}

`}
>

<div className="flex items-center gap-1">

<span
className="
h-5 w-5 rounded-full
border border-gray-200
shadow-sm
"
style={{
backgroundColor:item.colorHex
}}
/>


<span className="text-[10px] font-black text-gray-700">
{item.colorName}
</span>

</div>


</button>

);

})}

</div>
  </div>

  {/* خلاصه انتخاب */}
  <div className="mt-4 rounded-2xl bg-white px-3 py-3 text-xs font-bold text-gray-500">
    {selectedInventory ? (
  <span>
    انتخاب شما: سایز {selectedSize}، رنگ {selectedInventory.colorName}
  </span>
) : (
      <span>
        برای افزودن به سبد خرید، سایز و رنگ را انتخاب کنید.
      </span>
    )}
  </div>
</div>

<div className="mt-4 flex items-center justify-center gap-4">

<button
type="button"
disabled={selectedQuantity <= 1}
onClick={() =>
  setSelectedQuantity((q)=>q-1)
}
className="
h-9 w-9 rounded-full
bg-yellow-100
font-black text-[#6f4a18]
disabled:opacity-40
"
>
-
</button>


<span className="min-w-8 text-center text-lg font-black">
{selectedQuantity}
</span>


<button
type="button"
disabled={
 selectedQuantity >= maxQuantity
}
onClick={() =>
 setSelectedQuantity((q)=>q+1)
}
className="
h-9 w-9 rounded-full
bg-yellow-100
font-black text-[#6f4a18]
disabled:opacity-40
"
>
+
</button>

</div>

      <div
  className="
  mt-5
  grid
  grid-cols-1
  sm:grid-cols-2
  gap-3
  "
>


{/* خرید شخصی */}
{mode === "shop" && !isVendor && (
<motion.button
whileHover={{
  scale: addingToCart ? 1 : 1.02
}}
whileTap={{
  scale: addingToCart ? 1 : 0.97
}}

onClick={handleAddToCart}
disabled={addingToCart}

className="
flex
items-center
justify-center
gap-2
rounded-2xl
bg-gradient-to-r
from-[#7a5526]
via-[#b88724]
to-[#d4af37]
py-3
font-black
text-white
shadow-lg
transition
disabled:cursor-wait
disabled:opacity-60
"
>
<ShoppingBag
className="
h-5
w-5
"
/>
{addingToCart
  ? "در حال افزودن..."
  : "افزودن برای خودم"}
</motion.button>
)}

{/* پیام مخصوص فروشنده */}
{mode === "shop" && isVendor && (
<div
className="
rounded-2xl
border
border-yellow-200
bg-yellow-50
p-4
text-center
text-sm
font-bold
leading-7
text-[#7a5217]
"
>
🛍️ برای خرید از فروشگاه ژنینو،  
لطفاً با حساب کاربری ژنینو وارد شوید.
<br />
اگر قصد خرید دارید، از حساب فروشنده خارج شوید
و با حساب مشتری وارد شوید.
</div>
)}

{/* 🎁 هدیه بازی */}
{mode === "gift" && (
  <motion.button

    whileHover={{
      scale:
        addingToGiftCart
          ? 1
          : 1.02,
    }}

    whileTap={{
      scale:
        addingToGiftCart
          ? 1
          : 0.97,
    }}

    onClick={handleAddToGiftCart}

    disabled={addingToGiftCart}

    className="
      flex
      items-center
      justify-center
      gap-2
      rounded-2xl
      border
      border-yellow-300
      bg-yellow-50
      py-3
      font-black
      text-[#8a641a]
      shadow-sm
      transition
      hover:bg-yellow-100
      disabled:cursor-wait
      disabled:opacity-60
    "
  >

    <span>🎁</span>

    {addingToGiftCart
      ? "در حال افزودن هدیه..."
      : `افزودن هدیه برای ${
          giftChildName || "کودک"
        }`
    }

  </motion.button>
)}

</div>
    </div>
  </div>

  {/* سرچ و فیلتر مشخصات */}
  <div className="mt-7 border-t border-yellow-100 pt-5">
    <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <h2 className="text-lg font-black text-[#6f4a18]">
        مشخصات کامل کالا
      </h2>

      <div className="relative w-full lg:w-80">
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-yellow-700" />
        <input
          value={specSearch}
          onChange={(e) => setSpecSearch(e.target.value)}
          placeholder="جستجو در مشخصات کالا..."
          className="w-full rounded-2xl border border-yellow-200 bg-white py-3 pr-10 pl-4 text-sm outline-none focus:border-[#d4af37] focus:ring-4 focus:ring-yellow-100"
        />
      </div>
    </div>

    <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
      {specTabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveSpecTab(tab)}
          className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
            activeSpecTab === tab
              ? "bg-[#d4af37] text-white shadow"
              : "border border-yellow-200 bg-white text-[#6f4a18]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      {filteredSpecs.map((section) => (
        <div
          key={section.group}
          className="rounded-[1.5rem] border border-yellow-100 bg-white p-4 shadow-sm"
        >
          <div className="mb-4 flex items-center gap-2 text-[#6f4a18]">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-yellow-50 text-yellow-700">
              {section.icon}
            </div>
            <h3 className="font-black">{section.group}</h3>
          </div>

          <div className="space-y-3">
            {section.items.map(([label, value]) => {

  const isLongText =
  label === "سایر مشخصات فیزیکی" ||
  label === "توضیحات تکمیلی نگهداری";

  return (
    <div
      key={label}
      className={
        isLongText
          ? "rounded-2xl bg-[#faf7ef] p-4"
          : "flex items-start justify-between gap-4 rounded-2xl bg-[#faf7ef] px-3 py-2"
      }
    >
      {isLongText ? (
        <>
          <p className="mb-2 text-xs font-bold text-gray-500">
            {label}
          </p>

          <p className="whitespace-pre-line text-sm leading-7 text-gray-700">
            {value}
          </p>
        </>
      ) : (
        <>
          <span className="text-xs font-bold text-gray-500">
            {label}
          </span>

          <span className="text-left text-sm font-black text-gray-800">
            {value}
          </span>
        </>
      )}
    </div>
  );

})}
          </div>
        </div>
      ))}
    </div>

    {filteredSpecs.length === 0 && (
      <div className="rounded-2xl bg-gray-50 p-5 text-center text-sm font-bold text-gray-400">
        موردی مطابق جستجوی شما پیدا نشد.
      </div>
    )}
  </div>
</section>

        {/* 🎁 محصولات مشابه — اسلایدر با تیتر وسط و اسکرول خودکار */}
<section className="relative z-10 w-full max-w-5xl text-center mb-14">
  <div className="relative flex items-center justify-center mb-6">
    <button
      onClick={() => relatedRef.current.scrollBy({ left: -300, behavior: "smooth" })}
      className="absolute right-0 sm:right-8 p-2 rounded-full bg-white border border-yellow-100 text-yellow-600 hover:bg-yellow-50 transition shadow-sm"
    >
      <ChevronRight className="w-5 h-5" />
    </button>

    <h2 className="text-xl font-bold text-yellow-600">🎯 محصولات مشابه</h2>

    <button
      onClick={() => relatedRef.current.scrollBy({ left: 300, behavior: "smooth" })}
      className="absolute left-0 sm:left-8 p-2 rounded-full bg-white border border-yellow-100 text-yellow-600 hover:bg-yellow-50 transition shadow-sm"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
  </div>

  <div
    ref={relatedRef}
    className="overflow-x-auto snap-x snap-mandatory no-scrollbar touch-pan-x"
  >
    <div className="grid grid-flow-col auto-cols-[70%] sm:auto-cols-[45%] md:auto-cols-[30%] lg:auto-cols-[22%] gap-5 px-2">
      {relatedProducts.map((item) => (

<div
key={item.id}
className="
shrink-0
w-[210px]
sm:w-[220px]
md:w-[240px]
"
>

<ProductCard
product={item}
variant="shop"
source="shop"
/>

</div>

))}
    </div>
  </div>
</section>

        {/* ⭐️ امتیازدهی و نظرات */}
        <section className="relative z-10 w-full max-w-3xl bg-white/90 border border-yellow-100 rounded-2xl p-5 mb-14">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-yellow-700">⭐️ امتیاز و نظرات</h2>
            <div className="text-sm text-gray-600">
              میانگین: <span className="text-yellow-600 font-bold">{avgRating}</span> از {reviews.length} نظر
            </div>
          </div>

          {/* امتیازدهی */}
          <div dir="rtl" className="flex items-center gap-2 mb-4">
            {[1,2,3,4,5].map(st => (
              <button
                key={st}
                onMouseEnter={() => setHoverRating(st)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setMyRating(st)}
                className="p-1"
                aria-label={`give ${st} stars`}
              >
                <Star
                  className={`w-6 h-6 ${ (hoverRating || myRating) >= st ? "text-yellow-500 fill-yellow-500" : "text-gray-300" }`}
                />
              </button>
            ))}
            <span className="text-xs text-gray-500 mr-2">{myRating ? `${myRating} از 5` : "به این محصول امتیاز بده"}</span>
          </div>

          {/* فرم نظر */}
          <form onSubmit={submitReview} dir="rtl" className="grid grid-cols-1 gap-3 mb-6">
            <textarea
              placeholder="نظر شما..."
              value={myText}
              onChange={(e) => setMyText(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-yellow-200 text-sm min-h-[44px] outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              type="submit"
              className="sm:col-span-4 w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-white py-2.5 rounded-xl hover:from-yellow-600 hover:to-yellow-500 transition font-medium"
              disabled={!myRating || !myText.trim()}
            >
              ثبت نظر
            </motion.button>
          </form>

          {/* لیست نظرات */}
<div className="flex gap-3 overflow-x-auto pb-3">
  {reviews.map(r => (
    <div
      key={r.id}
      dir="rtl"
      className="min-w-[260px] max-w-[260px] bg-white rounded-xl border border-yellow-100 p-3 text-right"
    >
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm font-semibold text-gray-700">{r.userName}</div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < r.rating
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{r.text}</p>
    </div>
  ))}
            {!reviews.length && (
              <div className="text-sm text-gray-500 text-center py-4">هنوز نظری ثبت نشده است.</div>
            )}
          </div>
        </section>

        {/* 🤖 پیشنهاد هوشمند ژنینو — اسلایدر جدا با فلش و اسکرول خودکار */}
<section className="relative z-10 w-full max-w-5xl text-center mb-10">
  <div className="relative flex items-center justify-center mb-6">
    <button
      onClick={() => smartRef.current.scrollBy({ left: -300, behavior: "smooth" })}
      className="absolute right-0 sm:right-8 p-2 rounded-full bg-white border border-yellow-100 text-yellow-600 hover:bg-yellow-50 transition shadow-sm"
    >
      <ChevronRight className="w-5 h-5" />
    </button>

    <h2 className="text-xl font-bold text-yellow-600">
      🤖 پیشنهاد هوشمند ژنینو
    </h2>

    <button
      onClick={() => smartRef.current.scrollBy({ left: 300, behavior: "smooth" })}
      className="absolute left-0 sm:left-8 p-2 rounded-full bg-white border border-yellow-100 text-yellow-600 hover:bg-yellow-50 transition shadow-sm"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
  </div>

  <div
    ref={smartRef}
    className="overflow-x-auto snap-x snap-mandatory no-scrollbar touch-pan-x"
  >
    <div className="grid grid-flow-col auto-cols-[70%] sm:auto-cols-[45%] md:auto-cols-[30%] lg:auto-cols-[22%] gap-5 px-2">
      {recommendedProducts.map((item) => (

<div
key={item.id}
className="
shrink-0
w-[210px]
sm:w-[220px]
md:w-[240px]
"
>

<ProductCard
product={item}
variant="shop"
source="shop"
/>

</div>

))}
    </div>
  </div>
</section>
      </main>
    </>
  );
}
