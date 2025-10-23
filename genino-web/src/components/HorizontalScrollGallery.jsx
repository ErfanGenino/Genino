// 📄 src/components/HorizontalScrollGallery.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HorizontalScrollGallery({
  folder = "", // مسیر فولدر مثل: "women/skin"
  height = "h-24",
  rounded = "rounded-xl",
}) {
  const [images, setImages] = useState([]);

  // 🧠 خواندن فایل‌ها از فولدر public به‌صورت پویا
  useEffect(() => {
    if (!folder) return;
    const count = 12; // حداکثر تعداد عکس‌هایی که انتظار داری
    const found = [];

    for (let i = 1; i <= count; i++) {
      const path = `/images/${folder}/${i}.jpg`;
      found.push(path);
    }

    setImages(found);
  }, [folder]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-x-auto flex gap-3 pb-3 px-1 scroll-smooth snap-x scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-pink-100"
    >
      {images.map((src, i) => (
        <div
          key={i}
          className={`flex-shrink-0 w-32 ${height} ${rounded} bg-pink-50 snap-start overflow-hidden shadow-sm hover:scale-[1.03] transition-transform`}
        >
          <img
            src={src}
            alt={`تصویر ${i + 1}`}
            onError={(e) => (e.target.style.display = "none")} // اگه عکسی نبود، پنهانش کن
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </motion.div>
  );
}
