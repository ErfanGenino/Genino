// 📄 src/components/HorizontalScrollGallery.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HorizontalScrollGallery({
  folder = "",
  height = "h-24",
  rounded = "rounded-xl",
}) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!folder) return;

    const tryLoadImages = async () => {
      const found = [];
      // حداکثر 30 تا تست می‌کنیم ولی فقط اونایی که واقعاً هستن می‌مونن
      for (let i = 1; i <= 30; i++) {
        const path = `/images/${folder}/${i}.jpg`;
        const exists = await imageExists(path);
        if (exists) found.push(path);
      }
      setImages(found);
    };

    tryLoadImages();
  }, [folder]);

  // 🧠 تابع بررسی وجود فایل
  const imageExists = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-x-auto flex gap-3 pb-3 px-1 scroll-smooth snap-x scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-pink-100"
    >
      {images.length > 0 ? (
        images.map((src, i) => (
          <div
            key={i}
            className={`flex-shrink-0 w-32 ${height} ${rounded} bg-pink-50 snap-start overflow-hidden shadow-sm hover:scale-[1.03] transition-transform`}
          >
            <img src={src} alt={`تصویر ${i + 1}`} className="w-full h-full object-cover" />
          </div>
        ))
      ) : (
        <div className="text-gray-400 text-sm italic px-4">
          تصویری برای نمایش وجود ندارد
        </div>
      )}
    </motion.div>
  );
}
