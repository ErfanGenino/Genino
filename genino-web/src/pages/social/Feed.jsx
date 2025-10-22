import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Feed() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "فرناز 🌸",
      child: "حنا 💛",
      text: "اولین نقاشی حنا رو ببینین 😍 هنوز باورم نمیشه خودش کشیده!",
      image:
        "https://images.unsplash.com/photo-1587614382346-ac48b0b1f9e7?auto=format&fit=crop&w=600&q=60",
      likes: 12,
      comments: 3,
      liked: false,
    },
    {
      id: 2,
      user: "نگین 🌿",
      child: "آراد 💙",
      text: "امروز اولین روز مدرسه‌ش بود... چقدر سریع بزرگ میشن 😢",
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=60",
      likes: 8,
      comments: 1,
      liked: false,
    },
  ]);

  const [newPost, setNewPost] = useState("");

  const addPost = () => {
    if (!newPost.trim()) return;
    const newItem = {
      id: posts.length + 1,
      user: "کاربر ژنینو 👩‍👧",
      child: "کودک من 🌼",
      text: newPost,
      image: "",
      likes: 0,
      comments: 0,
      liked: false,
    };
    setPosts([newItem, ...posts]);
    setNewPost("");
  };

  const toggleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            }
          : p
      )
    );
  };

  return (
    <main
      dir="rtl"
      className="relative min-h-screen bg-gradient-to-b from-[#fffaf0] via-[#fff5dc] to-[#fff0cc] text-gray-800 px-4 pt-28 pb-24 flex flex-col items-center overflow-x-hidden"
    >
      {/* ☀️ هاله طلایی بالا */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#fff8dc]/90 to-transparent blur-3xl"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />

      {/* 🌟 عنوان */}
      <motion.div
        className="text-center mb-10 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-700 mb-3 drop-shadow-[0_0_12px_rgba(255,230,120,0.6)]">
          شبکه اجتماعی ژنینو 
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          جایی برای اشتراک لحظه‌های طلایی والدین و کودکان 
        </p>
      </motion.div>

      {/* 🖋 ساخت پست جدید */}
      <motion.div
        className="bg-white/95 backdrop-blur-lg border border-yellow-200 rounded-3xl shadow-[0_0_25px_rgba(212,175,55,0.15)] p-6 w-full max-w-xl mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <textarea
          placeholder="یه لحظه خاص از کودک‌ت بنویس 💬"
          className="w-full border border-yellow-200 rounded-2xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none shadow-inner"
          rows={3}
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <motion.button
          onClick={addPost}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white font-semibold py-2.5 rounded-xl shadow-md hover:from-yellow-600 hover:to-yellow-500 transition-all"
        >
          <PlusCircle className="w-5 h-5" />
          ارسال پست
        </motion.button>
      </motion.div>

      {/* 📜 لیست پست‌ها */}
      <section className="flex flex-col gap-8 w-full max-w-xl z-10">
        <AnimatePresence>
          {posts.map((post) => (
            <motion.div
              key={post.id}
              className="bg-white/95 border border-yellow-100 rounded-3xl shadow-lg p-5 flex flex-col gap-3 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* 👤 اطلاعات کاربر */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-yellow-700">{post.user}</p>
                  <p className="text-xs text-gray-500">{post.child}</p>
                </div>
                <span className="text-xs text-gray-400">🕒 لحظاتی پیش</span>
              </div>

              {/* ✍️ متن پست */}
              <p className="text-gray-700 text-[15px] leading-relaxed">{post.text}</p>

              {/* 🖼 تصویر پست */}
              {post.image && (
                <motion.img
                  src={post.image}
                  alt="post"
                  className="rounded-2xl mt-2 shadow-md"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* ❤️ لایک و 💬 کامنت */}
              <div className="flex justify-around items-center border-t border-yellow-100 pt-3 mt-2 text-sm">
                {/* ❤️ دکمه لایک */}
                <motion.button
                  whileTap={{ scale: 1.3 }}
                  onClick={() => toggleLike(post.id)}
                  className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700 transition"
                >
                  <motion.span
                    animate={{
                      scale: post.liked ? [1, 1.5, 1] : 1,
                      color: post.liked ? "#facc15" : "#ca8a04",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        post.liked
                          ? "fill-yellow-400 text-yellow-500 drop-shadow-[0_0_8px_rgba(255,215,0,0.7)]"
                          : ""
                      }`}
                    />
                  </motion.span>
                  <motion.span
                    key={post.likes}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {post.likes}
                  </motion.span>
                </motion.button>

                {/* 💬 کامنت */}
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700 transition"
                >
                  <MessageCircle className="w-5 h-5" /> {post.comments}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      {/* 🔗 لینک پروفایل */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          to="/social/profile"
          className="inline-block text-yellow-700 font-semibold hover:text-yellow-800 transition underline underline-offset-4"
        >
          مشاهده پروفایل من →
        </Link>
      </motion.div>

      {/* ✨ ذرات طلایی آرام */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(255,215,0,0.6)]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 4 + Math.random() * 3,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </main>
  );
}
