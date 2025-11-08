import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FolderPlus, Heart, Trash2, ImagePlus } from "lucide-react";
import GoldenModal from "@components/Core/GoldenModal";
import GoldenDivider from "@components/Core/GoldenDivider";
import GeninoDNABackground from "@components/Core/GeninoDNABackground"; // 🌟 اضافه شد

export default function MemoryAlbum() {
  const [albums, setAlbums] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newAlbum, setNewAlbum] = useState({ title: "", desc: "" });
  const [confirmDelete, setConfirmDelete] = useState({
    show: false,
    albumId: null,
    photoIndex: null,
  });
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // 📦 بارگذاری از localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("albums") || "[]");
    setAlbums(saved);
  }, []);

  // 💾 ذخیره در localStorage
  const saveAlbums = (updated) => {
    setAlbums(updated);
    localStorage.setItem("albums", JSON.stringify(updated));
  };

  // 🎞 ساخت آلبوم جدید
  const handleCreateAlbum = () => {
    if (!newAlbum.title.trim()) return;
    const newOne = {
      id: Date.now(),
      title: newAlbum.title.trim(),
      desc: newAlbum.desc.trim(),
      folder: newAlbum.title.replace(/\s+/g, "_"),
      likes: 0,
      comments: [],
      photos: [],
    };
    const updated = [newOne, ...albums];
    saveAlbums(updated);
    setNewAlbum({ title: "", desc: "" });
    setShowModal(false);
  };

  // ❤️ افزایش لایک
  const handleLike = (id) => {
    const updated = albums.map((a) =>
      a.id === id ? { ...a, likes: (a.likes || 0) + 1 } : a
    );
    saveAlbums(updated);
  };

  // 💬 افزودن کامنت
  const handleAddComment = (id, comment) => {
    if (!comment.trim()) return;
    const updated = albums.map((a) =>
      a.id === id
        ? { ...a, comments: [...(a.comments || []), comment.trim()] }
        : a
    );
    saveAlbums(updated);
  };

  // 📸 افزودن عکس جدید
  const handleAddPhoto = (albumId, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      const updated = albums.map((a) => {
        if (a.id === albumId) {
          if ((a.photos?.length || 0) >= 30) {
            alert("حداکثر ۳۰ عکس برای هر آلبوم مجاز است.");
            return a;
          }
          return { ...a, photos: [...(a.photos || []), base64] };
        }
        return a;
      });
      saveAlbums(updated);
    };
    reader.readAsDataURL(file);
  };

  // 🗑 حذف عکس
  const handleDeletePhoto = () => {
    const { albumId, photoIndex } = confirmDelete;
    const updated = albums.map((a) => {
      if (a.id === albumId) {
        const newPhotos = [...(a.photos || [])];
        newPhotos.splice(photoIndex, 1);
        return { ...a, photos: newPhotos };
      }
      return a;
    });
    saveAlbums(updated);
    setConfirmDelete({ show: false, albumId: null, photoIndex: null });
  };

  return (
    <GeninoDNABackground> {/* 🧬 پس‌زمینه طلایی ژنینو */}
      <main
        dir="rtl"
        className="relative min-h-screen flex flex-col items-center text-gray-800 overflow-hidden pt-28 pb-24"
      >
        {/* ✨ تیتر و دکمه بالا */}
        <div className="z-10 flex flex-col items-center gap-4 mb-10">
          <h1 className="text-4xl font-extrabold text-yellow-800 drop-shadow-[0_0_12px_rgba(255,220,100,0.7)]">
            آلبوم خاطرات ژنینو
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-400 
                       text-white px-6 py-2 rounded-xl font-semibold shadow hover:from-yellow-600 hover:to-yellow-500 transition-all"
          >
            <FolderPlus className="w-5 h-5" />
            ایجاد آلبوم جدید
          </button>
        </div>

        {/* 📸 مودال ایجاد آلبوم */}
        <GoldenModal
          show={showModal}
          title="🎞 ایجاد آلبوم جدید"
          description="نام و توضیح کوتاهی برای آلبوم بنویسید"
          confirmLabel="ثبت"
          cancelLabel="انصراف"
          onCancel={() => setShowModal(false)}
          onConfirm={handleCreateAlbum}
        >
          <div className="space-y-4 text-right">
            <input
              type="text"
              placeholder="نام آلبوم..."
              value={newAlbum.title}
              onChange={(e) =>
                setNewAlbum({ ...newAlbum, title: e.target.value })
              }
              className="w-full border-b border-yellow-400 bg-transparent py-2 text-gray-700 focus:outline-none focus:border-yellow-600 transition"
            />
            <textarea
              placeholder="توضیح کوتاه درباره آلبوم..."
              value={newAlbum.desc}
              onChange={(e) =>
                setNewAlbum({ ...newAlbum, desc: e.target.value })
              }
              className="w-full border-b border-yellow-300 bg-transparent py-2 text-gray-700 focus:outline-none focus:border-yellow-600 transition"
            />
          </div>
        </GoldenModal>

        {/* 🗑 مودال تأیید حذف عکس */}
        <GoldenModal
          show={confirmDelete.show}
          title="❌ حذف عکس"
          description="آیا از حذف این عکس مطمئن هستید؟ این عمل قابل بازگشت نیست."
          confirmLabel="بله، حذف شود"
          confirmColor="red"
          onConfirm={handleDeletePhoto}
          onCancel={() =>
            setConfirmDelete({ show: false, albumId: null, photoIndex: null })
          }
        />

        {/* 🎞 نمایش آلبوم‌ها */}
        <div className="w-full max-w-5xl px-6">
          {albums.length === 0 && (
            <p className="text-gray-600 text-sm text-center mt-8">
              هنوز هیچ آلبومی ساخته نشده 💛
            </p>
          )}

          {albums.map((album, index) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="px-6 py-10 mb-6"
            >
              {/* 🏷 عنوان آلبوم */}
              <h2 className="text-2xl font-bold text-yellow-800 text-center mb-5 drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
                {album.title}
              </h2>

              {/* ➕ دکمه افزودن عکس */}
              <div className="flex justify-center mb-4">
                <label className="flex items-center gap-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-2 rounded-full shadow-sm cursor-pointer transition">
                  <ImagePlus className="w-5 h-5" /> افزودن عکس
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      handleAddPhoto(album.id, e.target.files[0])
                    }
                  />
                </label>
              </div>

              {/* 🖼 گالری عکس‌ها */}
              <div className="flex overflow-x-auto gap-3 pb-3 px-1 justify-center">
                {album.photos?.length > 0 ? (
                  album.photos.map((src, i) => (
                    <div
                      key={i}
                      className="relative flex-shrink-0 w-32 h-24 rounded-xl overflow-hidden border border-yellow-300 shadow-sm group"
                    >
                      <img
                        src={src}
                        alt={`photo-${i}`}
                        className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                        onClick={() =>
                          setSelectedPhoto({ src, albumId: album.id })
                        }
                      />
                      <button
                        onClick={() =>
                          setConfirmDelete({
                            show: true,
                            albumId: album.id,
                            photoIndex: i,
                          })
                        }
                        className="absolute top-1 left-1 bg-red-500/80 hover:bg-red-600 text-white rounded-full p-1 shadow transition"
                        title="حذف عکس"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-sm italic px-4">
                    هیچ عکسی برای نمایش وجود ندارد 💛
                  </p>
                )}
              </div>

              {/* 📝 توضیح آلبوم */}
              {album.desc && (
                <p className="text-gray-800 text-sm text-center mt-4 leading-relaxed">
                  {album.desc}
                </p>
              )}

              {/* ❤️ لایک و 💬 کامنت */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
                <button
                  onClick={() => handleLike(album.id)}
                  className="flex items-center gap-1 text-yellow-800 bg-yellow-100 px-4 py-2 rounded-full hover:bg-yellow-200 transition"
                >
                  <Heart className="w-4 h-4" /> <span>{album.likes}</span>
                </button>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const comment = e.target.comment.value;
                    handleAddComment(album.id, comment);
                    e.target.reset();
                  }}
                  className="flex items-center bg-yellow-50 border border-yellow-200 rounded-full px-4 py-2 shadow-sm w-full max-w-sm"
                >
                  <input
                    name="comment"
                    placeholder="نظر خود را بنویسید..."
                    className="bg-transparent flex-1 text-sm focus:outline-none text-gray-700"
                  />
                  <button
                    type="submit"
                    className="text-yellow-700 font-semibold hover:text-yellow-800 transition"
                  >
                    ارسال
                  </button>
                </form>
              </div>

              {/* 💬 لیست کامنت‌ها */}
              {album.comments?.length > 0 && (
                <div className="mt-4 bg-yellow-50/60 border border-yellow-100 rounded-xl p-3 text-sm text-gray-700 leading-relaxed max-h-40 overflow-y-auto">
                  {album.comments.map((c, i) => (
                    <p
                      key={i}
                      className="border-b border-yellow-100 pb-2 mb-2 last:border-none"
                    >
                      💬 {c}
                    </p>
                  ))}
                </div>
              )}

              {/* ✨ جداکننده طلایی بین آلبوم‌ها */}
              <GoldenDivider />
            </motion.div>
          ))}
        </div>

        {/* 🔍 مودال نمایش عکس بزرگ */}
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-2xl border-4 border-yellow-300 shadow-[0_0_25px_rgba(212,175,55,0.5)] pointer-events-none"></div>

              <img
                src={selectedPhoto.src}
                alt="نمایش بزرگ"
                className="max-w-[90vw] max-h-[85vh] rounded-2xl shadow-2xl border border-yellow-200"
              />

              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-6 right-0 text-white text-3xl font-bold hover:text-yellow-300 transition"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </main>
    </GeninoDNABackground>
  );
}
