import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Shop() {
  const [flyingItems, setFlyingItems] = useState([]);
  const [isBouncing, setIsBouncing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("همه");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("کالا");
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();

  const itemsPerPage = 30;
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
    image: `https://via.placeholder.com/200x200?text=${encodeURIComponent(
      "🛍️ " + (i + 1)
    )}`,
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

      {/* 🔹 هدر */}
      <header
        dir="rtl"
        className="flex items-center justify-between mb-8 relative z-10"
      >
        <h1 className="text-3xl font-bold text-yellow-600 flex items-center gap-2">
          <ShoppingBag className="text-yellow-500 w-7 h-7" />
          فروشگاه ژنینو
        </h1>

        <motion.button
  ref={cartRef}
  onClick={() => navigate("/cart")}
  animate={
    isBouncing
      ? { scale: [1, 1.2, 0.9, 1], rotate: [0, -10, 10, 0] }
      : {}
  }
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="relative bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600 transition shadow-md"
>
  🛒 سبد خرید
  {cartItems.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
      {cartItems.length}
    </span>
  )}
</motion.button>
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

      {/* 🧭 فیلتر کلی: نوع (کالا / خدمت) و زیر‌دسته‌ها */}
<div dir="rtl" className="relative z-10 mb-10 flex flex-col items-center gap-5">

  {/* 🔸 انتخاب نوع کلی */}
  <div className="flex justify-center gap-4">
    {[{ title: "کالا", icon: "🛍️" }, { title: "خدمت", icon: "💼" }].map((type) => (
      <motion.button
        key={type.title}
        onClick={() => {
          setCategory("همه");
          setCurrentPage(1);
          setSelectedType(type.title);
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={
          selectedType === type.title
            ? { scale: [1, 1.1, 1], boxShadow: "0 0 15px rgba(234,179,8,0.5)" }
            : {}
        }
        transition={{ duration: 0.4 }}
        className={`px-6 py-2.5 flex items-center gap-2 rounded-2xl text-sm font-medium transition-all ${
          selectedType === type.title
            ? "bg-gradient-to-r from-yellow-500 to-yellow-400 text-white shadow-md ring-2 ring-yellow-300/50"
            : "bg-white border border-yellow-200 text-gray-600 hover:bg-yellow-50"
        }`}
      >
        <span className="text-lg">{type.icon}</span>
        <span>{type.title}</span>
      </motion.button>
    ))}
  </div>

  {/* 🔹 زیر‌دسته‌ها بر اساس نوع انتخاب‌شده */}
  <div className="flex flex-wrap justify-center gap-3 mt-2">
    {(selectedType === "کالا"
      ? [
          { title: "همه", icon: "🌟" },
          { title: "آموزشی", icon: "📚" },
          { title: "هنر", icon: "🎨" },
          { title: "اسباب‌بازی", icon: "🧸" },
        ]
      : [
          { title: "همه", icon: "🌟" },
          { title: "آموزش کودک", icon: "🧑‍🏫" },
          { title: "مشاوره و سلامت", icon: "🩺" },
          { title: "رویداد و تولد", icon: "🎉" },
        ]
    ).map((cat) => {
      const isActive = category === cat.title;
      return (
        <motion.button
          key={cat.title}
          onClick={() => {
            setCategory(cat.title);
            setCurrentPage(1);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={
            isActive
              ? { scale: [1, 1.15, 1], boxShadow: "0 0 12px rgba(234,179,8,0.6)" }
              : {}
          }
          transition={{ duration: 0.4 }}
          className={`px-4 py-2 flex items-center gap-2 rounded-2xl text-sm font-medium transition-all ${
            isActive
              ? "bg-gradient-to-r from-yellow-500 to-yellow-400 text-white shadow-md ring-2 ring-yellow-300/50"
              : "bg-white border border-yellow-200 text-gray-600 hover:bg-yellow-50"
          }`}
        >
          <span>{cat.icon}</span>
          <span>{cat.title}</span>
        </motion.button>
      );
    })}
  </div>
</div>

      {/* 🟡 کارت‌های محصول */}
      <motion.section
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
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
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all border border-yellow-100 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-right">
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className="text-gray-500 text-sm mb-2">{item.category}</p>
                <p className="text-yellow-600 font-bold">{item.price}</p>

                {/* دکمه افزودن به سبد */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
  e.preventDefault();
  addToCart(item);
  handleFlyAnimation(e);
}}
                  className="mt-3 w-full bg-yellow-500 text-white py-2 rounded-xl hover:bg-yellow-600 transition"
                >
                  افزودن به سبد
                </motion.button>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.section>
    </main>
  );
}
