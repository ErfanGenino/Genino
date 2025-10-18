import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Feed() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "فرناز 🌸",
      child: "حنا 💛",
      text: "اولین نقاشی حنا رو ببینین 😍 هنوز باورم نمیشه خودش کشیده!",
      image: "https://images.unsplash.com/photo-1587614382346-ac48b0b1f9e7?auto=format&fit=crop&w=600&q=60",
      likes: 12,
      comments: 3,
    },
    {
      id: 2,
      user: "نگین 🌿",
      child: "آراد 💙",
      text: "امروز اولین روز مدرسه‌ش بود... چقدر سریع بزرگ میشن 😢",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=60",
      likes: 8,
      comments: 1,
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
    };
    setPosts([newItem, ...posts]);
    setNewPost("");
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#fffaf0] to-[#fff3d8] text-gray-800 px-4 pt-28 pb-10 flex flex-col items-center"
    >
      {/* ✨ عنوان */}
      <h1 className="text-3xl font-extrabold text-yellow-700 mb-6">شبکه اجتماعی ژنینو 💛</h1>
      <p className="text-gray-600 text-sm mb-8 text-center max-w-md">
        جایی برای اشتراک لحظه‌های طلایی والدین و کودکان 🌿
      </p>

      {/* ✍️ ساخت پست جدید */}
      <motion.div
        className="bg-white/90 backdrop-blur-md shadow-lg border border-yellow-200 rounded-3xl p-5 w-full max-w-xl mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <textarea
          placeholder="یه لحظه خاص از کودک‌ت بنویس 💬"
          className="w-full border border-yellow-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
          rows={3}
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button
          onClick={addPost}
          className="mt-3 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white font-semibold py-2 rounded-xl hover:from-yellow-600 hover:to-yellow-500 transition-all"
        >
          <PlusCircle className="w-5 h-5" />
          ارسال پست
        </button>
      </motion.div>

      {/* 🧩 لیست پست‌ها */}
      <section className="flex flex-col gap-6 w-full max-w-xl">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            className="bg-white/90 border border-yellow-100 rounded-3xl shadow-md p-4 flex flex-col gap-3"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            {/* 👤 اطلاعات کاربر */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-yellow-700">{post.user}</p>
                <p className="text-xs text-gray-500">{post.child}</p>
              </div>
              <span className="text-xs text-gray-400">🕒 لحظاتی پیش</span>
            </div>

            {/* 📝 متن پست */}
            <p className="text-gray-700 text-sm leading-relaxed">{post.text}</p>

            {/* 🖼 تصویر (در صورت وجود) */}
            {post.image && (
              <img
                src={post.image}
                alt="post"
                className="rounded-2xl mt-2 shadow-md"
              />
            )}

            {/* ❤️ لایک و کامنت */}
            <div className="flex justify-around items-center text-yellow-600 border-t pt-2 mt-2 text-sm">
              <button className="flex items-center gap-1 hover:text-yellow-700 transition">
                <Heart className="w-5 h-5" /> {post.likes}
              </button>
              <button className="flex items-center gap-1 hover:text-yellow-700 transition">
                <MessageCircle className="w-5 h-5" /> {post.comments}
              </button>
            </div>
          </motion.div>
        ))}
      </section>

      {/* 👤 لینک به پروفایل */}
      <Link
        to="/social/profile"
        className="mt-12 text-yellow-700 font-medium hover:text-yellow-800 transition"
      >
        مشاهده پروفایل من →
      </Link>
    </main>
  );
}
