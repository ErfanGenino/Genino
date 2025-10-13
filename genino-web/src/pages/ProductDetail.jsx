import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 🔸 داده نمونه محصول
  const product = {
    id,
    name: `محصول شماره ${id}`,
    price: `${(Math.floor(Math.random() * 300) + 100) * 1000} تومان`,
    image: `https://via.placeholder.com/400x400?text=${encodeURIComponent(
      "🛍️ " + id
    )}`,
    desc: "این محصول برای رشد خلاقیت، آموزش مهارت و لذت بردن کودک طراحی شده است. شامل جزئیات کامل از ویژگی‌ها و مزایا می‌باشد.",
  };

  // 🔹 محصولات مشابه (نمونه‌ای ساده)
  const relatedProducts = Array.from({ length: 4 }).map((_, i) => ({
    id: Number(id) + i + 1,
    name: `محصول مشابه ${i + 1}`,
    price: `${(Math.floor(Math.random() * 300) + 100) * 1000} تومان`,
    image: `https://via.placeholder.com/200x200?text=${encodeURIComponent(
      "🎁 مشابه " + (i + 1)
    )}`,
  }));

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#fffdf8] to-[#f7f3e6] text-gray-800 p-6 overflow-hidden flex flex-col items-center">
      {/* 🌿 بک‌گراند DNA طلایی و سبد خریدهای شناور */}
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
              <linearGradient id={`gold-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
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

        {/* 🛒 سبد خریدهای طلایی شناور */}
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

      {/* 🔹 نوار بالا: بازگشت + سبد خرید */}
<div
  dir="rtl"
  className="relative z-10 w-full flex items-center justify-between mb-10 px-6"
>
  {/* 🔸 دکمه بازگشت سمت راست */}
  <button
    onClick={() => navigate(-1)}
    className="flex items-center gap-2 text-yellow-600 font-medium hover:text-yellow-700 transition"
  >
    <ArrowRight className="w-5 h-5" />
    بازگشت به فروشگاه
  </button>

  {/* 🔸 دکمه سبد خرید سمت چپ */}
  <button className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600 transition flex items-center gap-2 shadow-sm">
    🛒 سبد خرید
  </button>
</div>

      {/* 🟡 محتوای اصلی محصول */}
      <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-6 max-w-md text-right mb-12">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-2xl mb-4"
        />
        <h1 className="text-2xl font-bold text-yellow-600 mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-3 leading-relaxed">{product.desc}</p>
        <p className="text-yellow-600 font-bold text-lg mb-4">{product.price}</p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-white py-3 rounded-xl hover:from-yellow-600 hover:to-yellow-500 transition flex items-center justify-center gap-2 font-medium shadow-md"
        >
          <ShoppingBag className="w-5 h-5" />
          افزودن به سبد خرید
        </motion.button>
      </div>

      {/* 🎁 محصولات مشابه */}
      <section className="relative z-10 w-full max-w-4xl text-right">
        <h2 className="text-xl font-bold text-yellow-600 mb-6 pr-2">
          🎯 محصولات مشابه
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => navigate(`/product/${item.id}`)}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all border border-yellow-100 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-700 mb-1">{item.name}</h3>
                <p className="text-yellow-600 text-sm font-bold">{item.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
