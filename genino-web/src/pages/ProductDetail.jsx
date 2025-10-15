import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowRight, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import logo from "../assets/logo-genino.png";
import { useState, useRef, useMemo, useEffect } from "react";

export default function ProductDetail() {
  // ✈️ انیمیشن پرواز
  const [flyingItems, setFlyingItems] = useState([]);
  const [isBouncing, setIsBouncing] = useState(false);
  const cartRef = useRef(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
const smartRef = useRef(null);

// 🕐 اسکرول خودکار هر 6 ثانیه برای هر دو بخش
useEffect(() => {
  const interval = setInterval(() => {
    if (relatedRef.current) relatedRef.current.scrollBy({ left: 300, behavior: "smooth" });
    if (smartRef.current) smartRef.current.scrollBy({ left: 300, behavior: "smooth" });
  }, 6000);
  return () => clearInterval(interval);
}, []);


  // 🔸 داده نمونه محصول + دسته
  const categories = ["آموزشی", "هنر", "اسباب‌بازی"];
  const productCategory = categories[Number(id) % categories.length];

  const product = {
    id,
    name: `محصول شماره ${id}`,
    price: `${(Math.floor(Math.random() * 300) + 100) * 1000} تومان`,
    image: logo,
    category: productCategory,
    desc: "این محصول برای رشد خلاقیت، آموزش مهارت و لذت بردن کودک طراحی شده است. شامل جزئیات کامل از ویژگی‌ها و مزایا می‌باشد.",
  };

  // 🔹 مشابه‌ها (صرفاً نمونه)
  const baseList = Array.from({ length: 12 }).map((_, i) => ({
    id: Number(id) + i + 1,
    name: `محصول مشابه ${i + 1}`,
    price: `${(Math.floor(Math.random() * 300) + 100) * 1000} تومان`,
    image: logo,
    category: categories[(Number(id) + i + 1) % categories.length],
  }));
  const relatedProducts = baseList.slice(0, 12);

  // 🤖 پیشنهاد هوشمند (ماک): اولویت با دسته‌ی خود محصول، بعد بقیه
  const recommendedProducts = useMemo(() => {
    const same = baseList.filter(p => p.category === product.category).slice(0, 6);
    const others = baseList.filter(p => p.category !== product.category).slice(0, 6);
    return [...same, ...others].slice(0, 8);
  }, [id]);

  // ✈️ تابع پرواز
  function handleFlyAnimation(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const cartRect = cartRef.current.getBoundingClientRect();

    const newItem = {
      id: Date.now(),
      startX: rect.left + rect.width / 2,
      startY: rect.top + rect.height / 2,
      endX: cartRect.left + cartRect.width / 2,
      endY: cartRect.top + cartRect.height / 2,
    };

    setFlyingItems(prev => [...prev, newItem]);

    setTimeout(() => {
      setFlyingItems(prev => prev.filter(item => item.id !== newItem.id));
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 600);
    }, 1000);
  }

  // ⭐️ نظرات و امتیازدهی (لوکال)
  const [reviews, setReviews] = useState([
    { id: 1, name: "کاربر ژنینو", rating: 5, text: "کیفیت عالی و بسته‌بندی مرتب 👌" },
    { id: 2, name: "مادر حنا", rating: 4, text: "برای هدیه تولد عالی بود. ممنون ژنینو 🌿" },
  ]);
  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;
    return (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  }, [reviews]);

  const [myRating, setMyRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [myName, setMyName] = useState("");
  const [myText, setMyText] = useState("");

  function submitReview(e) {
    e.preventDefault();
    if (!myRating || !myText.trim()) return;
    setReviews(prev => [
      { id: Date.now(), name: myName || "کاربر", rating: myRating, text: myText.trim() },
      ...prev,
    ]);
    setMyRating(0);
    setHoverRating(0);
    setMyName("");
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

  return (
    <>
      {/* ✈️ آیکون‌های پرواز */}
      <AnimatePresence>
        {flyingItems.map(item => (
          <motion.div
            key={item.id}
            initial={{
              x: item.startX, y: item.startY, scale: 1, opacity: 1, position: "fixed",
            }}
            animate={{ x: item.endX, y: item.endY, scale: 0.3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="text-yellow-500 z-50 pointer-events-none"
          >
            <ShoppingBag className="w-8 h-8" />
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
  {cartItems.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
      {cartItems.length}
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
            بازگشت به فروشگاه
          </button>

        
        </div>

        {/* 🟡 باکس محصول */}
        <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-6 max-w-md text-right mb-12">
          <img
            src={product.image}
            alt={product.name}
            className="w-32 h-32 mx-auto mb-4 object-contain transition-transform duration-500 hover:scale-110 hover:brightness-110"
          />
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-yellow-600">{product.name}</h1>
            <span className="text-xs text-gray-500 bg-yellow-50 border border-yellow-100 rounded-lg px-2 py-1">{product.category}</span>
          </div>
          <p className="text-gray-600 mb-3 leading-relaxed">{product.desc}</p>
          <p className="text-yellow-600 font-bold text-lg mb-4">{product.price}</p>

          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={(e) => { addToCart(product); handleFlyAnimation(e); }}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-white py-3 rounded-xl hover:from-yellow-600 hover:to-yellow-500 transition flex items-center justify-center gap-2 font-medium shadow-md"
          >
            <ShoppingBag className="w-5 h-5" />
            افزودن به سبد خرید
          </motion.button>
        </div>

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
        <motion.div
          key={item.id}
          whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(212,175,55,0.15)" }}
          transition={{ duration: 0.3 }}
          onClick={() => navigate(`/product/${item.id}`)}
          className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all border border-yellow-100 cursor-pointer snap-start"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 mx-auto mt-4 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
          />
          <div className="p-3 text-center">
            <h3 className="text-sm font-semibold text-gray-700 mb-1 line-clamp-1">
              {item.name}
            </h3>
            <p className="text-yellow-600 text-sm font-bold">{item.price}</p>
          </div>
        </motion.div>
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
          <form onSubmit={submitReview} dir="rtl" className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
            <input
              type="text"
              placeholder="نام (اختیاری)"
              value={myName}
              onChange={(e) => setMyName(e.target.value)}
              className="sm:col-span-1 px-3 py-2 rounded-xl border border-yellow-200 text-sm outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <textarea
              placeholder="نظر شما..."
              value={myText}
              onChange={(e) => setMyText(e.target.value)}
              className="sm:col-span-3 px-3 py-2 rounded-xl border border-yellow-200 text-sm min-h-[44px] outline-none focus:ring-2 focus:ring-yellow-300"
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
          <div className="space-y-3">
  {reviews.map(r => (
    <div
      key={r.id}
      dir="rtl"
      className="bg-white rounded-xl border border-yellow-100 p-3 text-right"
    >
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm font-semibold text-gray-700">{r.name}</div>
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
        <motion.div
          key={item.id}
          whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(212,175,55,0.15)" }}
          transition={{ duration: 0.3 }}
          onClick={() => navigate(`/product/${item.id}`)}
          className="group bg-white/90 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all border border-yellow-100 cursor-pointer snap-start"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 mx-auto mt-4 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
          />
          <div className="p-3 text-center">
            <div className="text-[11px] text-gray-500 mb-1">{item.category}</div>
            <h3 className="text-sm font-semibold text-gray-700 mb-1 line-clamp-1">
              {item.name}
            </h3>
            <p className="text-yellow-600 text-sm font-bold">{item.price}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
      </main>
    </>
  );
}
