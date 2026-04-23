import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquarePlus, Image as ImageIcon } from "lucide-react";
import { presignChatRoomImageUpload, putFileToPresignedUrl } from "../../services/api";

export default function CreateRoomModal({ isOpen, onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  if (file.size > 15 * 1024 * 1024) {
    alert("حجم عکس خیلی زیاد است");
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  reader.onload = (event) => {
    img.src = event.target.result;
  };

  img.onload = () => {
    const canvas = document.createElement("canvas");

    const MAX_WIDTH = 1280;
    const scale = Math.min(1, MAX_WIDTH / img.width);

    canvas.width = img.width * scale;
    canvas.height = img.height * scale;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        const url = URL.createObjectURL(blob);

        setImagePreview({
          url,
          blob,
          contentType: "image/jpeg",
          ext: "jpg",
          fileSize: blob.size,
        });
      },
      "image/jpeg",
      0.8
    );
  };

  reader.readAsDataURL(file);
};

  const resetForm = () => {
  setTitle("");
  setDesc("");
  setImagePreview(null);
};

  const handleSubmit = async () => {
  if (!title.trim()) return;

  let uploadedImageUrl = "";

  if (imagePreview?.blob) {
    const presignRes = await presignChatRoomImageUpload({
      ext: imagePreview.ext,
      contentType: imagePreview.contentType,
      fileSize: imagePreview.fileSize,
    });

    if (!presignRes?.ok || !presignRes.uploadUrl || !presignRes.publicUrl) {
      alert(presignRes?.message || "آماده‌سازی آپلود عکس اتاق انجام نشد.");
      return;
    }

    const uploadRes = await putFileToPresignedUrl(
      presignRes.uploadUrl,
      new File([imagePreview.blob], `chat-room-image.${imagePreview.ext}`, {
        type: imagePreview.contentType,
      })
    );

    if (!uploadRes?.ok) {
      alert(uploadRes?.message || "آپلود عکس اتاق انجام نشد.");
      return;
    }

    uploadedImageUrl = presignRes.publicUrl;
  }

  await onCreate({
    title: title.trim(),
    desc: desc.trim() || "اتاق ساخته‌شده توسط کاربر",
    imageUrl: uploadedImageUrl || "",
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

              {imagePreview?.url && (
  <img
    src={imagePreview.url}
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