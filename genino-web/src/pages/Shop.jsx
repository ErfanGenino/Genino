import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag, Gift } from "lucide-react";
import logo from "../assets/logo-genino.png";
import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import PromoSlider from "@components/Social/PromoSlider.jsx";
import shopHeader from "../assets/shop/shop-header.webp";

export default function Shop() {
  const [flyingItems, setFlyingItems] = useState([]);
  const [isBouncing, setIsBouncing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("همه");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();

  const itemsPerPage = 12;
  const cartRef = useRef(null);
  const goodsMenuRef = useRef(null);
  const servicesMenuRef = useRef(null);

  // ✈️ افکت پرواز آیتم
  function handleFlyAnimation(e) {
    const rect = e.target.getBoundingClientRect();
    const cartRect = cartRef.current.getBoundingClientRect();

    const newItem = {
      id: Date.now(),
      startX: rect.left + rect.width / 2,
      startY: rect.top + rect.height / 2,
      endX: cartRect.left + cartRect.width / 2,
      endY: cartRect.top + cartRect.height / 2,
    };

    setFlyingItems((prev) => [...prev, newItem]);

    setTimeout(() => {
      setFlyingItems((prev) => prev.filter((item) => item.id !== newItem.id));
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 600);
    }, 1000);
  }

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      goodsMenuRef.current &&
      !goodsMenuRef.current.contains(event.target)
    ) {
      if (selectedType === "کالا") {
        setSelectedType("");
      }
    }

    if (
      servicesMenuRef.current &&
      !servicesMenuRef.current.contains(event.target)
    ) {
      if (selectedType === "خدمات") {
        setSelectedType("");
      }
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [selectedType]);

  // 🛍️ محصولات نمونه
  const products = Array.from({ length: 90 }).map((_, i) => ({
    id: i + 1,
    name: `محصول شماره ${i + 1}`,
    price: `${(Math.floor(Math.random() * 300) + 100) * 1000} تومان`,
    image: logo,
    category: ["آموزشی", "هنر", "اسباب‌بازی"][i % 3],
  }));

  // 🧩 فیلترها
  const filteredProducts = products.filter((item) => {
    const matchCategory = category === "همه" || item.category === category;
    const matchSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // 📄 صفحه‌بندی
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const serviceCategories = [
  {
    title: "مدارس",
    image: "/images/shop/services/schools.webp",
    route: "/shop/services/schools",
  },
  {
    title: "مهدکودک‌ها",
    image: "/images/shop/services/kindergartens.webp",
    route: "/shop/services/kindergartens",
  },
  {
    title: "خانه‌های بازی",
    image: "/images/shop/services/playhouses.webp",
    route: "/shop/services/playhouses",
  },
  {
    title: "کلاس‌های آموزشی",
    image: "/images/shop/services/education-classes.webp",
    route: "/shop/services/education-classes",
  },
  {
    title: "کلاس‌های هنری",
    image: "/images/shop/services/art-classes.webp",
    route: "/shop/services/art-classes",
  },
  {
    title: "کلاس‌های ورزشی",
    image: "/images/shop/services/sport-classes.webp",
    route: "/shop/services/sport-classes",
  },
  {
    title: "معلمان خصوصی",
    image: "/images/shop/services/private-teachers.webp",
    route: "/shop/services/private-teachers",
  },
  {
    title: "نمایش همه خدمات",
    image: "/images/shop/services/all-services.webp",
  },
];

  const goodsCategories = [
  {
    title: "سیسمونی تخصصی",
    image: "/images/shop/categories/sismooni.webp",
    route: "/shop/sismooni",
  },
  {
    title: "نوزاد، کودک و نوجوان",
    image: "/images/shop/categories/kids.webp",
    route: "/shop/kids",
  },
  {
    title: "مد و پوشاک",
    image: "/images/shop/categories/fashion.webp",
    route: "/shop/fashion",
  },
  {
    title: "کالای خواب و حمام",
    image: "/images/shop/categories/bed-bath.webp",
    route: "/shop/bed-bath",
  },
  {
    title: "ساعت و زیور‌آلات",
    image: "/images/shop/categories/watch-jewelry.webp",
    route: "/shop/watch-jewelry",
  },
  {
    title: "کالای ورزشی",
    image: "/images/shop/categories/sport.webp",
    route: "/shop/sport",
  },
  {
    title: "سلامت و پزشکی",
    image: "/images/shop/categories/medical.webp",
    route: "/shop/medical",
  },
  {
    title: "آرایشی و بهداشتی",
    image: "/images/shop/categories/beauty.webp",
    route: "/shop/beauty",
  },
  {
    title: "عطر و ادکلن",
    image: "/images/shop/categories/perfume.webp",
    route: "/shop/perfume",
  },
  {
    title: "هنر دست زنان و مردان قدرتمند سرزمین من",
    image: "/images/shop/categories/handmade.webp",
    route: "/shop/handmade",
  },
  {
    title: "نمایش همه کالاها",
    image: "/images/shop/categories/all-products.webp",
  },
];

  return (
  <main className="relative min-h-screen overflow-hidden bg-[#faf7ef] text-gray-800 px-3 sm:px-5 lg:px-8 py-5 pb-20 sm:pb-7">
    {/* بک‌گراند نرم و لوکس */}
    <div className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute -top-28 -right-24 h-72 w-72 rounded-full bg-yellow-200/35 blur-3xl" />
      <div className="absolute top-52 -left-28 h-80 w-80 rounded-full bg-amber-100/60 blur-3xl" />
      <div className="absolute bottom-20 right-1/4 h-64 w-64 rounded-full bg-white/70 blur-3xl" />
    </div>

    {/* ✈️ آیکون‌های پرواز */}
    {flyingItems.map((item) => (
      <motion.div
        key={item.id}
        initial={{
          x: item.startX,
          y: item.startY,
          scale: 1,
          opacity: 1,
          position: "fixed",
        }}
        animate={{
          x: item.endX,
          y: item.endY,
          scale: 0.3,
          opacity: 0,
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="pointer-events-none z-50 text-yellow-500"
      >
        <ShoppingBag className="h-7 w-7" />
      </motion.div>
    ))}

    {/* نوار حرفه‌ای سبد خرید */}
<motion.button
  ref={cartRef}
  onClick={() => navigate("/cart")}
  animate={
    isBouncing
      ? { scale: [1, 1.04, 0.98, 1], rotate: [0, -2, 2, 0] }
      : {}
  }
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="
    fixed bottom-0 left-0 right-0 z-50
    flex h-14 w-full items-center justify-between
    bg-gradient-to-r from-[#7a5526] via-[#b88724] to-[#d4af37]
    px-4 text-white shadow-[0_-8px_28px_rgba(120,85,38,0.28)]
    transition-all

    sm:bottom-auto sm:left-6 sm:right-auto sm:top-24
    sm:h-24 sm:w-20 sm:flex-col sm:justify-center sm:gap-2
    sm:rounded-3xl sm:px-0
    sm:shadow-[0_0_25px_rgba(212,175,55,0.45)]
    sm:hover:scale-105
  "
>
  <div className="flex items-center gap-2 sm:flex-col sm:gap-1">
    <ShoppingBag className="h-5 w-5 text-white drop-shadow-sm sm:h-8 sm:w-8" />

    <span className="text-xs font-extrabold sm:hidden">
      سبد خرید ژنینو
    </span>
  </div>

  <div className="flex items-center gap-2 sm:flex-col sm:gap-1">
    <span className="hidden text-[10px] font-bold text-white/90 sm:block">
      سبد خرید
    </span>

    <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-red-500 px-2 text-xs font-black text-white shadow-md">
      {cartItems.length}
    </span>

    <span className="text-[11px] font-bold text-white/90 sm:hidden">
      کالا
    </span>
  </div>
</motion.button>

    <section dir="rtl" className="relative z-10 mx-auto max-w-7xl">
      
      {/* هدر مینیمال فروشگاه */}
<header className="mb-5 max-w-3xl mx-auto overflow-visible rounded-[2rem] bg-gradient-to-br from-[#4b2f17] via-[#7a5526] to-[#b88724] p-3 shadow-[0_18px_55px_rgba(75,47,23,0.22)] sm:p-4">
  {/* جای عکس بالای هدر */}
  <div className="mb-3 overflow-hidden rounded-[1.5rem] border border-yellow-200/30">
    <img
  src={shopHeader}
  alt="فروشگاه ژنینو"
  className="
  h-32
  sm:h-44
  lg:h-48
  w-full
  object-cover
"
/>
  </div>

  {/* نوار سرچ */}
  <div className="relative mb-3">
    <input
      type="text"
      placeholder="جستجوی محصول یا خدمت..."
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
      }}
      className="h-9 w-full rounded-2xl border border-yellow-200/30 bg-white/95 px-3 pr-9 text-right text-[11px] text-gray-700 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-yellow-300 focus:ring-4 focus:ring-yellow-100 sm:h-10 sm:text-xs"
    />
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-yellow-700">
      🔍
    </span>
  </div>

  {/* دکمه‌ها */}
  <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
    <button
      onClick={() => {
        setCategory("همه");
        setSelectedType("");
        setCurrentPage(1);
      }}
      className="h-8 rounded-xl bg-white/90 px-1 text-[10px] font-bold text-[#7a5526] shadow-sm transition hover:bg-yellow-50 sm:text-xs"
    >
      نمایش همه
    </button>

    <div
  ref={goodsMenuRef}
  className="relative"
>
      <button
        onClick={() => setSelectedType(selectedType === "کالا" ? "" : "کالا")}
        className="h-8 w-full rounded-xl bg-white/90 px-1 text-[10px] font-bold text-[#7a5526] shadow-sm transition hover:bg-yellow-50 sm:text-xs"
      >
        کالاها
      </button>

      {selectedType === "کالا" && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="
  absolute top-full z-50 mt-2
  right-0 w-[38vw] max-w-[180px]
  overflow-hidden rounded-2xl
  border border-yellow-100 bg-[#fff8e8] shadow-2xl

  sm:w-56
  md:w-64
"
        >
          {goodsCategories.map((cat) => (
  <button
    key={cat.title}
    onClick={() => {
      if (cat.route) {
  navigate(cat.route);
  return;
}

if (cat.title === "نمایش همه کالاها") {
  setCategory("همه");
} else {
  setCategory(cat.title);
}

      setSelectedType("");
      setCurrentPage(1);
    }}
    className="
      flex h-14 w-full items-center justify-start
      border-b-2 border-[#d6b86d]
      px-3 text-right text-[11px] font-bold text-gray-700
      transition hover:bg-[#f3e3bd] hover:text-[#7a5526]
      last:border-b-0
    "
  >
    <div className="ml-3 h-8 w-8 shrink-0 overflow-hidden rounded-md border border-[#c9a44a] bg-white">
      <img
        src={cat.image}
        alt={cat.title}
        className="h-full w-full object-cover"
      />
    </div>

    <span className="line-clamp-2 text-right leading-4">
      {cat.title}
    </span>
  </button>
))}
        </motion.div>
      )}
    </div>

    <div
  ref={servicesMenuRef}
  className="relative"
>
      <button
        onClick={() => setSelectedType(selectedType === "خدمات" ? "" : "خدمات")}
        className="h-8 w-full rounded-xl bg-white/90 px-1 text-[10px] font-bold text-[#7a5526] shadow-sm transition hover:bg-yellow-50 sm:text-xs"
      >
        خدمات
      </button>

      {selectedType === "خدمات" && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="
  absolute top-full z-50 mt-2
  right-0 w-[38vw] max-w-[180px]
  overflow-hidden rounded-2xl
  border border-yellow-100 bg-[#fff8e8] shadow-2xl

  sm:w-56
  md:w-64
"
        >
          {serviceCategories.map((cat) => (
  <button
    key={cat.title}
    onClick={() => {
      if (cat.route) {
  navigate(cat.route);
  return;
}

setCategory(cat.title);
setSelectedType("");
setCurrentPage(1);
    }}
    className="
      flex h-14 w-full items-center justify-start
      border-b-2 border-[#d6b86d]
      px-3 text-right text-[11px] font-bold text-gray-700
      transition hover:bg-[#f3e3bd] hover:text-[#7a5526]
      last:border-b-0
    "
  >
    <div className="ml-3 h-8 w-8 shrink-0 overflow-hidden rounded-md border border-[#c9a44a] bg-white">
      <img
        src={cat.image}
        alt={cat.title}
        className="h-full w-full object-cover"
      />
    </div>

    <span className="line-clamp-2 text-right leading-4">
      {cat.title}
    </span>
  </button>
))}
        </motion.div>
      )}
    </div>

    <button
      onClick={() => setSelectedType("")}
      className="h-8 rounded-xl bg-white/90 px-1 text-[9px] font-bold text-[#7a5526] shadow-sm transition hover:bg-yellow-50 sm:text-xs"
    >
      مقایسه تخصصی
    </button>
  </div>
</header>

{/* 🖼️ اسلایدر تبلیغاتی */}
<PromoSlider
  variant="golden"
  interval={7}
  height="h-40 sm:h-44 md:h-48 lg:h-52"
  className="relative z-[40] my-6 max-w-3xl mx-auto overflow-hidden rounded-[1.75rem] border border-yellow-200/70 bg-white/70 shadow-[0_18px_45px_rgba(120,90,20,0.12)] backdrop-blur-xl"
  slides={[
    {
      id: 1,
      image: "/images/slides/shop/1.webp",
    },
    {
      id: 2,
      image: "/images/slides/shop/2.webp",
    },
    {
      id: 3,
      image: "/images/slides/shop/3.webp",
    },
    {
      id: 4,
      image: "/images/slides/shop/4.webp",
    },
    {
      id: 5,
      image: "/images/slides/shop/5.webp",
    },
    {
      id: 6,
      image: "/images/slides/shop/6.webp",
    },
    {
      id: 7,
      image: "/images/slides/shop/7.webp",
    },
    {
      id: 8,
      image: "/images/slides/shop/8.webp",
    },
  ]}
/>

{/* 🎁 دکمه هدیه‌بازی */}
<motion.button
  whileHover={{ y: -3, scale: 1.01 }}
  whileTap={{ scale: 0.98 }}
  onClick={() => navigate("/gift-game")}
  className="
    relative z-10 mx-auto mt-4 flex w-full max-w-3xl items-center justify-between gap-3
    overflow-hidden rounded-[1.75rem]
    border border-yellow-200/70
    bg-gradient-to-r from-[#4b2f17] via-[#8a6228] to-[#d4af37]
    px-4 py-3 text-right text-white
    shadow-[0_18px_45px_rgba(120,85,38,0.22)]
    transition
    sm:px-5 sm:py-4
  "
>
  <div className="absolute inset-0 bg-white/10" />

  <div className="relative flex items-center gap-3">
    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 shadow-inner">
      <Gift className="h-6 w-6 text-yellow-100" />
    </div>

    <div>
      <h2 className="text-sm font-black sm:text-base">
        هدیه‌بازی
      </h2>
      <p className="mt-1 text-[10px] font-medium text-white/85 sm:text-xs">
        فرصتی مناسب برای ارسال هدیه به عزیزانتان
      </p>
    </div>
  </div>

  <span className="relative rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold text-yellow-50 sm:text-xs">
    شروع کنیم
  </span>
</motion.button>



      {/* 🟡 کارت‌های محصول */}
<motion.section
  className="
  relative z-10 mt-8 mx-auto grid max-w-5xl
  grid-cols-2 gap-3
  sm:grid-cols-3 sm:gap-4
  lg:grid-cols-4 lg:gap-6
"
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  }}
>
  {currentProducts.map((item) => (
    <Link to={`/product/${item.id}`} key={item.id} className="group block">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 18 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        whileHover={{ y: -3 }}
        className="relative h-full overflow-hidden rounded-3xl border border-white/80 bg-white/85 p-2.5 shadow-[0_14px_38px_rgba(120,90,20,0.08)] backdrop-blur-md transition duration-300 hover:border-yellow-200 hover:shadow-[0_18px_45px_rgba(120,90,20,0.13)]"
      >
        <div className="absolute right-3 top-3 z-10 rounded-full bg-yellow-50 px-2 py-1 text-[10px] font-bold text-yellow-700 shadow-sm">
          {item.category}
        </div>

        <div className="flex h-32 items-center justify-center rounded-2xl bg-gradient-to-br from-[#fffaf0] to-[#f7efd9] sm:h-36">
          <img
            src={item.image}
            alt={item.name}
            className="h-20 w-20 object-contain transition duration-300 group-hover:scale-105 sm:h-24 sm:w-24"
          />
        </div>

        <div className="px-1 pt-3 text-right">
          <h2 className="line-clamp-1 text-xs font-extrabold text-gray-800 sm:text-sm">
            {item.name}
          </h2>

          <p className="mt-1 line-clamp-1 text-[10px] text-gray-400 sm:text-xs">
            مناسب خانواده‌های ژنینویی
          </p>

          <div className="mt-3 flex items-center justify-between gap-2">
            <p className="text-[11px] font-black text-yellow-700 sm:text-sm">
              {item.price}
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={(e) => {
              e.preventDefault();
              addToCart(item);
              handleFlyAnimation(e);
            }}
            className="mt-3 flex h-9 w-full items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-[#b88724] via-[#d4af37] to-[#f1d477] text-[11px] font-bold text-white shadow-[0_10px_24px_rgba(184,135,36,0.25)] transition hover:from-[#a8791f] hover:via-[#c49d2f] hover:to-[#e5c867] sm:text-xs"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            افزودن
          </motion.button>
        </div>
      </motion.div>
    </Link>
  ))}
</motion.section>

{/* 📄 صفحه‌بندی */}
<div className="relative z-10 mt-9 flex items-center justify-center gap-2">
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((p) => p - 1)}
    className={`h-9 rounded-full px-4 text-xs font-bold transition ${
      currentPage === 1
        ? "cursor-not-allowed bg-white/50 text-gray-300"
        : "bg-white text-yellow-700 shadow-sm hover:bg-yellow-50"
    }`}
  >
    قبلی
  </button>

  <span className="rounded-full bg-white/70 px-4 py-2 text-[11px] font-medium text-gray-500 shadow-sm">
    صفحه {currentPage} از {totalPages}
  </span>

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage((p) => p + 1)}
    className={`h-9 rounded-full px-4 text-xs font-bold transition ${
      currentPage === totalPages
        ? "cursor-not-allowed bg-white/50 text-gray-300"
        : "bg-white text-yellow-700 shadow-sm hover:bg-yellow-50"
    }`}
  >
    بعدی
  </button>
</div>
     </section>
    </main>
  );
}
