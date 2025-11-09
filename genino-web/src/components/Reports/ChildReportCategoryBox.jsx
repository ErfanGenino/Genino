import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Share2, X } from "lucide-react";
import { createPortal } from "react-dom";

export default function ChildReportCategoryBox({ title, reports = [], storageKey }) {
  const [selected, setSelected] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [localReports, setLocalReports] = useState(reports); // ← فقط نگهدار محلی برای رندر مجدد

  // ✅ حذف گزارش از localStorage (بدون از بین رفتن کل دیتا)
  const handleDelete = (label) => {
    const updated = localReports.filter((r) => r.label !== label);
    setLocalReports(updated);

    try {
      // فقط اگر storageKey داده شده بود، توی localStorage هم بروزرسانی کن
      if (storageKey) {
        const existing = JSON.parse(localStorage.getItem(storageKey) || "[]");
        const filtered = existing.filter((r) => r.label !== label);
        localStorage.setItem(storageKey, JSON.stringify(filtered));
      }
    } catch (err) {
      console.warn("⚠️ خطا در حذف از localStorage:", err);
    }

    setConfirmDelete(null);
  };

  return (
    <section className="w-full max-w-6xl mb-12">
      {/* 🎗️ تیتر دسته */}
      <h2 className="text-xl sm:text-2xl font-extrabold text-yellow-700 mb-5 drop-shadow-[0_0_10px_rgba(255,220,80,0.4)]">
        {title}
      </h2>

      {/* 🖼️ گالری افقی */}
      <div className="flex overflow-x-auto gap-5 pb-4 scrollbar-thin scrollbar-thumb-yellow-400/80 scrollbar-track-yellow-100/50">
        {localReports.length === 0 && (
          <p className="text-gray-500 text-sm italic">
            هنوز گزارشی برای این بخش ثبت نشده است.
          </p>
        )}

        {localReports.map((r, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="relative flex-shrink-0 w-56 h-44 sm:w-64 sm:h-52 rounded-3xl overflow-hidden border border-yellow-200/80 shadow-[0_0_15px_rgba(255,215,0,0.15)] bg-white cursor-pointer transition"
            onClick={() => setSelected(r)}
          >
            <img
              src={r.image}
              alt={r.label}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />

            {/* 🎛️ دکمه‌های اشتراک و حذف */}
            <div className="absolute bottom-2 right-2 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`اشتراک‌گذاری ${r.label}`);
                }}
                className="bg-white/80 backdrop-blur-md rounded-full p-2 shadow-sm hover:bg-yellow-50 transition"
              >
                <Share2 className="w-4 h-4 text-yellow-700" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmDelete(r);
                }}
                className="bg-white/80 backdrop-blur-md rounded-full p-2 shadow-sm hover:bg-red-50 transition"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>

            <p className="absolute top-2 right-2 bg-white/70 text-xs font-semibold px-2 py-1 rounded-full text-yellow-800 shadow-sm">
              {r.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* 🔍 مودال نمایش بزرگ تصویر */}
      {createPortal(
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999]"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="relative bg-white/85 rounded-3xl shadow-2xl max-w-5xl w-[95vw] p-1"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-3 left-3 text-gray-600 hover:text-black bg-white/90 rounded-full p-1.5 shadow-md"
                  onClick={() => setSelected(null)}
                >
                  <X className="w-5 h-5" />
                </button>

                <img
                  src={selected.image}
                  alt={selected.label}
                  className="rounded-xl w-full h-auto max-h-[88vh] object-contain mb-1"
                />
                <p className="text-center text-gray-700 text-sm font-medium">
                  {selected.label}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* 🗑️ دیالوگ تأیید حذف */}
      {createPortal(
        <AnimatePresence>
          {confirmDelete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[10000]"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-yellow-50 to-white rounded-3xl border border-yellow-200 shadow-2xl p-6 max-w-sm w-[90%] text-center"
              >
                <h3 className="text-lg font-bold text-yellow-800 mb-3">
                  حذف گزارش؟
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  مطمئنی می‌خوای گزارش{" "}
                  <span className="font-semibold text-yellow-700">
                    {confirmDelete.label}
                  </span>{" "}
                  رو حذف کنی؟
                </p>

                <div className="flex justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(confirmDelete.label)}
                    className="bg-gradient-to-r from-red-500 to-red-400 text-white px-5 py-2 rounded-xl shadow-md font-semibold hover:from-red-600 hover:to-red-500"
                  >
                    بله، حذف کن
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setConfirmDelete(null)}
                    className="bg-gray-200 text-gray-700 px-5 py-2 rounded-xl hover:bg-gray-300 font-semibold"
                  >
                    انصراف
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
