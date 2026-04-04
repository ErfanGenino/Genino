import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquarePlus, Image as ImageIcon } from "lucide-react";

export default function CreateRoomModal({ isOpen, onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const resetForm = () => {
    setTitle("");
    setDesc("");
    setImagePreview("");
  };

  const handleSubmit = () => {
    if (!title.trim()) return;

    onCreate({
      id: Date.now().toString(),
      title: title.trim(),
      desc: desc.trim() || "اتاق ساخته‌شده توسط کاربر",
      color: "bg-gray-50",
      image: imagePreview || "",
    });

    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[60]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 22, stiffness: 220 }}
          className="w-[92%] max-w-md bg-white rounded-3xl border border-yellow-200 shadow-xl p-5"
          dir="rtl"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-yellow-700 flex items-center gap-2">
              <MessageSquarePlus size={20} />
              ساخت اتاق جدید
            </h2>

            <button
              onClick={handleClose}
              className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-700 transition"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-4">
            <label className="flex flex-col gap-1">
              <span className="text-xs text-gray-600">نام اتاق</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثلاً اتاق گفت‌وگوی والدین"
                className="w-full rounded-xl border border-yellow-200 bg-white px-3 py-2 text-sm outline-none focus:border-yellow-400"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-xs text-gray-600">توضیح کوتاه</span>
              <textarea
                rows={3}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="موضوع این اتاق چیست؟"
                className="w-full rounded-xl border border-yellow-200 bg-white px-3 py-2 text-sm outline-none focus:border-yellow-400"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs text-gray-600">عکس اتاق</span>

              <label className="inline-flex items-center gap-2 w-fit cursor-pointer rounded-xl border border-yellow-200 bg-white px-3 py-2 text-sm text-yellow-700 hover:bg-yellow-50">
                <ImageIcon size={16} />
                انتخاب عکس
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="preview"
                  className="w-full h-40 object-cover rounded-2xl border border-yellow-200"
                />
              )}
            </label>

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-white font-semibold py-2.5 rounded-xl shadow-md hover:from-yellow-600 hover:to-yellow-500 transition-all"
            >
              ساخت اتاق
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}