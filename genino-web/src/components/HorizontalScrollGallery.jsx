// 📄 src/components/HorizontalScrollGalleryNeutral.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HorizontalScrollGalleryNeutral({
  folder = "",
  height = "h-24",
  rounded = "rounded-xl",
}) {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);

  // 📸 لود تصاویر از فولدر مربوطه
  useEffect(() => {
    if (!folder) return;

    const tryLoadImages = async () => {
      const found = [];
      for (let i = 1; i <= 30; i++) {
        const path = `/images/${folder}/${i}.jpg`;
        const exists = await imageExists(path);
        if (exists) found.push(path);
      }
      setImages(found);
    };

    tryLoadImages();
  }, [folder]);

  // 🧠 بررسی وجود عکس
  const imageExists = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  return (
    <>
      {/* 🔹 نوار گالری اسکرولی */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex gap-3 pb-3 px-1 overflow-x-auto scroll-smooth snap-x scrollbar-thin 
                   scrollbar-thumb-yellow-300 scrollbar-track-yellow-100 w-full"
      >
        {images.length > 0 ? (
          images.map((src, i) => (
            <motion.div
              key={i}
              onClick={() => setSelected(src)}
              whileHover={{ scale: 1.05 }}
              className={`flex-shrink-0 w-32 ${height} ${rounded} bg-white/90 snap-start 
                         overflow-hidden shadow-sm cursor-pointer hover:shadow-md border border-yellow-100 transition`}
            >
              <img
                src={src}
                alt={`تصویر ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))
        ) : (
          <div className="text-gray-400 text-sm italic px-4">
            تصویری برای نمایش وجود ندارد
          </div>
        )}
      </motion.div>

      {/* ✨ مودال بزرگ‌نمایی عکس */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[80]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative"
            >
              {/* قاب طلایی ژنینو */}
              <div className="absolute inset-0 rounded-2xl border-4 border-yellow-300 
                              shadow-[0_0_25px_rgba(212,175,55,0.5)] pointer-events-none"></div>

              <img
                src={selected}
                alt="بزرگ‌شده"
                className="max-w-[90vw] max-h-[85vh] rounded-2xl shadow-2xl border border-yellow-200"
              />

              {/* دکمه بستن */}
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-6 right-0 text-white text-3xl font-bold 
                           hover:text-yellow-300 transition"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
