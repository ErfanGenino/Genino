import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag, Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

export default function Cart() {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart, totalPrice } = useCart();

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#fffdf8] to-[#f7f3e6] text-gray-800 p-6 overflow-hidden">
      {/* 🌿 بک‌گراند طلایی DNA، سبدها و دلارها */}
      <div className="absolute inset-0 overflow-hidden z-0">

        {/* 🧬 DNA های طلایی */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.svg
            key={`dna-${i}`}
            viewBox="0 0 100 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute opacity-20"
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

        {/* 🛍️ سبدهای طلایی شناور */}
        {Array.from({ length: 5 }).map((_, i) => (
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

        {/* 💲 دلارهای طلایی شناور */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`dollar-${i}`}
            className="absolute text-yellow-400/40 text-3xl font-bold select-none"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 20, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            $
          </motion.div>
        ))}
      </div>

      {/* 🔹 هدر */}
      <header dir="rtl" className="flex items-center justify-between mb-10 relative z-10">
        <Link
          to="/shop"
          className="text-yellow-600 font-semibold flex items-center gap-2 hover:text-yellow-700 transition"
        >
          ← بازگشت به فروشگاه
        </Link>

        <h1 className="text-3xl font-bold text-yellow-600 flex items-center gap-2">
          <ShoppingBag className="text-yellow-500 w-7 h-7" />
          سبد خرید شما
        </h1>

        <button
          onClick={clearCart}
          className="text-sm text-red-500 border border-red-300 px-3 py-1.5 rounded-xl hover:bg-red-50 transition"
        >
          🧹 خالی کردن سبد
        </button>
      </header>

      {/* 🟡 محتوای سبد */}
      <section dir="rtl" className="relative z-10 max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-md p-6 border border-yellow-100">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 py-10">سبد خرید شما خالی است 🛒</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-yellow-50 hover:shadow-md transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* تصویر و مشخصات */}
                <div className="flex items-center gap-4 mb-3 sm:mb-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl border border-yellow-100"
                  />
                  <div className="text-right">
                    <h2 className="font-semibold text-lg text-gray-800">{item.name}</h2>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <p className="text-yellow-600 font-bold mt-1">{item.price}</p>
                  </div>
                </div>

                {/* کنترل تعداد و حذف */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-yellow-100 text-yellow-600 w-8 h-8 rounded-full flex items-center justify-center hover:bg-yellow-200 transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-semibold text-gray-700 w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-yellow-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-yellow-600 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-red-500 hover:text-red-600 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* 💰 جمع کل و دکمه پرداخت */}
      {cartItems.length > 0 && (
        <div className="relative z-10 max-w-4xl mx-auto mt-10 flex flex-col sm:flex-row items-center justify-between bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-yellow-100">
          <p className="text-lg text-gray-800 font-semibold">
            جمع کل:{" "}
            <span className="text-yellow-600 font-bold">
              {totalPrice.toLocaleString()} تومان
            </span>
          </p>
          <button className="mt-4 sm:mt-0 bg-yellow-500 text-white px-6 py-3 rounded-xl hover:bg-yellow-600 transition shadow-md">
            ادامه به پرداخت 💳
          </button>
        </div>
      )}
    </main>
  );
}
