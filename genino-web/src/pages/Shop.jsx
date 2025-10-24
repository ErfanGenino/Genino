import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import logo from "../assets/logo-genino.png";
import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import PromoSlider from "../components/PromoSlider.jsx";

export default function Shop() {
  const [flyingItems, setFlyingItems] = useState([]);
  const [isBouncing, setIsBouncing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("همه");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();

  const itemsPerPage = 15;
  const cartRef = useRef(null);

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

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#fffdf8] to-[#f7f3e6] text-gray-800 p-6 overflow-hidden">
      {/* 🌿 پس‌زمینه متحرک */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.svg
            key={`dna-${i}`}
            viewBox="0 0 100 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute opacity-25"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              transformOrigin: "center",
            }}
            animate={{ rotate: [0, i % 2 === 0 ? 360 : -360] }}
            transition={{
              duration: 80 + Math.random() * 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <defs>
              <linearGradient
                id={`gold-${i}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#b88a1a" />
              </linearGradient>
            </defs>
            <path
              d="M30,10 C50,30 50,70 30,90 C10,110 10,150 30,170"
              stroke={`url(#gold-${i})`}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M70,10 C50,30 50,70 70,90 C90,110 90,150 70,170"
              stroke={`url(#gold-${i})`}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </motion.svg>
        ))}

        {/* سبد خریدهای شناور */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`bag-${i}`}
            className="absolute text-yellow-500/40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ShoppingBag className="w-10 h-10" />
          </motion.div>
        ))}
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
          className="text-yellow-500 z-50 pointer-events-none"
        >
          <ShoppingBag className="w-8 h-8" />
        </motion.div>
      ))}

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
  {cartItems.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
      {cartItems.length}
    </span>
  )}
</motion.button>

      {/* 🔹 هدر */}
      <header
        dir="rtl"
        className="flex items-center justify-between mb-8 relative z-10"
      >
        <h1 className="text-3xl font-bold text-yellow-600 flex items-center gap-2">
          <ShoppingBag className="text-yellow-500 w-7 h-7" />
          فروشگاه ژنینو
        </h1>

      
      </header>

      {/* 🔍 نوار جستجو */}
      <div dir="rtl" className="relative flex justify-center mb-6 z-10">
        <input
          type="text"
          placeholder="جستجوی محصول..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full max-w-md px-10 py-2.5 rounded-2xl border border-yellow-200 bg-white/90 shadow-sm text-right text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all"
        />
        <span className="absolute left-[calc(50%-180px)] top-2.5 text-yellow-500 text-lg pointer-events-none">
          🔍
        </span>
      </div>

{/* 🧭 فیلتر ساده و هماهنگ با رنگ برند ژنینو */}
<div dir="rtl" className="relative z-30 flex flex-col items-center gap-6 mb-10">

  {/* 🔹 دکمه بدون فیلتر (عرض برابر دو دکمه زیرش) */}
  <motion.button
    onClick={() => {
      setCategory("همه");
      setSelectedType("");
      setCurrentPage(1);
    }}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className="w-[90%] sm:w-[66%] md:w-[55%] py-4 rounded-2xl font-medium text-lg flex justify-center items-center gap-2 shadow-lg bg-gradient-to-r from-yellow-500 to-yellow-400 text-white hover:from-yellow-600 hover:to-yellow-500 transition-all"
  >
    🌟 بدون فیلتر (نمایش همه محصولات)
  </motion.button>

  {/* 🔹 دکمه‌های کالا و خدمات */}
  <div className="flex flex-col sm:flex-row justify-center items-center gap-5 w-[90%] sm:w-[66%] md:w-[55%]">

    {/* 🔸 کالا */}
    <div className="relative w-full sm:w-1/2">
      <motion.button
        onClick={() =>
          setSelectedType(selectedType === "کالا" ? "" : "کالا")
        }
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`w-full py-4 rounded-2xl font-medium text-lg flex justify-center items-center gap-2 shadow-lg transition-all ${
          selectedType === "کالا"
            ? "bg-gradient-to-r from-yellow-500 to-yellow-400 text-white ring-2 ring-yellow-300/70"
            : "bg-gradient-to-r from-yellow-400 to-yellow-300 text-white hover:from-yellow-500 hover:to-yellow-400"
        }`}
      >
        🛍️ کالا
      </motion.button>

      {/* 🌿 منوی آبشاری کالا */}
      {selectedType === "کالا" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute top-full left-0 right-0 bg-white border border-yellow-100 shadow-2xl rounded-2xl mt-2 overflow-hidden z-50"
        >
          {["آموزشی", "هنر", "اسباب‌بازی", "کتاب و دفتر"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setSelectedType(""); // منو بسته می‌شود
                setCurrentPage(1);
              }}
              className="w-full text-right px-5 py-3 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-all"
            >
              {cat}
            </button>
          ))}

          {/* 🔙 دکمه بستن منو */}
          <button
            onClick={() => setSelectedType("")}
            className="w-full text-center py-3 text-sm font-medium text-yellow-600 bg-yellow-50 hover:bg-yellow-100 border-t border-yellow-100 transition-all"
          >
            🔙 بستن منو
          </button>
        </motion.div>
      )}
    </div>

    {/* 🔸 خدمات */}
    <div className="relative w-full sm:w-1/2">
      <motion.button
        onClick={() =>
          setSelectedType(selectedType === "خدمات" ? "" : "خدمات")
        }
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`w-full py-4 rounded-2xl font-medium text-lg flex justify-center items-center gap-2 shadow-lg transition-all ${
          selectedType === "خدمات"
            ? "bg-gradient-to-r from-yellow-500 to-yellow-400 text-white ring-2 ring-yellow-300/70"
            : "bg-gradient-to-r from-yellow-400 to-yellow-300 text-white hover:from-yellow-500 hover:to-yellow-400"
        }`}
      >
        💼 خدمات
      </motion.button>

      {/* 🌿 منوی آبشاری خدمات */}
      {selectedType === "خدمات" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute top-full left-0 right-0 bg-white border border-yellow-100 shadow-2xl rounded-2xl mt-2 overflow-hidden z-50"
        >
          {["آموزش کودک", "مشاوره و سلامت", "رویداد و تولد", "ورزش و مهارت"].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setSelectedType(""); // منو بسته می‌شود
                  setCurrentPage(1);
                }}
                className="w-full text-right px-5 py-3 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-all"
              >
                {cat}
              </button>
            )
          )}

          {/* 🔙 دکمه بستن منو */}
          <button
            onClick={() => setSelectedType("")}
            className="w-full text-center py-3 text-sm font-medium text-yellow-600 bg-yellow-50 hover:bg-yellow-100 border-t border-yellow-100 transition-all"
          >
            🔙 بستن منو
          </button>
        </motion.div>
      )}
    </div>
  </div>
</div>

{/* 🖼️ اسلایدر تبلیغاتی */}
<PromoSlider
  variant="golden"
  interval={7}
  slides={[
    {
      id: 1,
      text: "خریدی هوشمند و لذت‌بخش 🌿",
      sub: "محصولات منتخب والدین در فروشگاه ژنینو",
      image: "/images/slides/shop/1.jpg",
    },
    {
      id: 2,
      text: "هدیه‌ای خاص برای کودک خاص شما 🎁",
      sub: "کالاها و خدمات ویژه برای رشد و شادی کودکان",
      image: "/images/slides/shop/2.jpg",
    },
    {
      id: 3,
      text: "تجربه خرید آسان، مطمئن و طلایی ✨",
      sub: "از آموزش تا بازی، همه در ژنینو",
      image: "/images/slides/shop/3.jpg",
    },
  ]}
/>


      {/* 🟡 کارت‌های محصول */}
<motion.section
  className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 mt-12 px-2 sm:px-0"
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }}
>
  {currentProducts.map((item) => (
    <Link to={`/product/${item.id}`} key={item.id} className="block">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{
          y: -4,
          boxShadow: "0 10px 25px rgba(212,175,55,0.25)",
        }}
        className="bg-white/85 backdrop-blur-sm rounded-2xl overflow-hidden border border-yellow-100 cursor-pointer transition-all duration-300 hover:bg-gradient-to-b hover:from-[#fffaf0] hover:to-[#fff7e0]"
      >
        {/* 🖼 تصویر محصول */}
        <img
          src={item.image}
          alt={item.name}
          className="w-28 h-28 sm:w-24 sm:h-24 mx-auto mt-6 mb-2 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
        />

        {/* 📄 اطلاعات محصول */}
        <div className="p-4 sm:p-5 text-right">
          <h2 className="font-semibold text-base sm:text-lg mb-1 line-clamp-1">
            {item.name}
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mb-1">
            {item.category}
          </p>
          <p className="text-yellow-600 font-bold text-sm sm:text-base">
            {item.price}
          </p>

          {/* 🛒 دکمه افزودن به سبد */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              addToCart(item);
              handleFlyAnimation(e);
            }}
            className="mt-3 w-full bg-yellow-500 text-white py-2 sm:py-2.5 rounded-xl text-sm sm:text-base hover:bg-yellow-600 transition"
          >
            افزودن به سبد
          </motion.button>
        </div>
      </motion.div>
    </Link>
  ))}
</motion.section>
            {/* 📄 صفحه‌بندی */}
      <div className="relative z-10 flex justify-center items-center mt-12 gap-3">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
            currentPage === 1
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "text-yellow-600 border-yellow-300 hover:bg-yellow-50"
          }`}
        >
          قبلی
        </button>

        <span className="text-gray-600 text-sm">
          صفحه {currentPage} از {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
            currentPage === totalPages
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "text-yellow-600 border-yellow-300 hover:bg-yellow-50"
          }`}
        >
          بعدی
        </button>
      </div>
    </main>
  );
}
