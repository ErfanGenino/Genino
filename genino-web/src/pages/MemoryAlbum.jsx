import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderPlus,
  Heart,
  Trash2,
  ImagePlus,
  Sparkles,
  MessageCircle,
  Camera,
} from "lucide-react";
import GoldenModal from "@components/Core/GoldenModal";
import GoldenDivider from "@components/Core/GoldenDivider";
import GeninoDNABackground from "@components/Core/GeninoDNABackground";
import {
  getChildMemoryAlbums,
  createMemoryAlbum,
  presignMemoryAlbumPhotoUpload,
  putFileToPresignedUrl,
  addMemoryAlbumPhoto,
  deleteMemoryAlbumPhoto,
  deleteMemoryAlbum,
  toggleMemoryAlbumLike,
  addMemoryAlbumComment,
  deleteMemoryAlbumComment,
} from "../services/api";
import { useSearchParams } from "react-router-dom";
import { prepareImage } from "../utils/image/prepareImage";


export default function MemoryAlbum() {
  const [albums, setAlbums] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newAlbum, setNewAlbum] = useState({ title: "", desc: "" });
  const [confirmDelete, setConfirmDelete] = useState({
    show: false,
    albumId: null,
    photoId: null,
  });
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [searchParams] = useSearchParams();
  const childId = Number(searchParams.get("childId"));
  const isViewMode = searchParams.get("mode") === "view";
  const [loading, setLoading] = useState(false);
  const [canManageAlbums, setCanManageAlbums] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [uploadingPhotoAlbumId, setUploadingPhotoAlbumId] = useState(null);

  useEffect(() => {
  if (childId) {
    loadAlbums();
  }
}, [childId]);

const loadAlbums = async () => {
  setLoading(true);

  const res = await getChildMemoryAlbums(childId);

  if (res.ok) {
  setAlbums(res.albums || []);
  setCanManageAlbums(!!res.canManageAlbums);
  setCurrentUserId(res.currentUserId || null);
} else {
    alert(res.message || "خطا در دریافت آلبوم‌ها");
  }

  setLoading(false);
};


  const handleCreateAlbum = async () => {
  if (!newAlbum.title.trim()) return;

  const res = await createMemoryAlbum(childId, {
    title: newAlbum.title.trim(),
    description: newAlbum.desc.trim(),
  });

  if (!res.ok) {
    alert(res.message || "خطا در ساخت آلبوم");
    return;
  }

  setNewAlbum({ title: "", desc: "" });
  setShowModal(false);
  await loadAlbums();
};

  const handleLike = async (albumId) => {
  const res = await toggleMemoryAlbumLike(albumId);

  if (!res.ok) {
    alert(res.message || "خطا در ثبت لایک");
    return;
  }

  await loadAlbums();
};

const handleAddComment = async (albumId, comment) => {
  if (!comment.trim()) return;

  const res = await addMemoryAlbumComment(albumId, comment.trim());

  if (!res.ok) {
    alert(res.message || "خطا در ثبت نظر");
    return;
  }

  await loadAlbums();
};

const handleDeleteComment = async (commentId) => {
  const ok = window.confirm("نظر حذف شود؟");
  if (!ok) return;

  const res = await deleteMemoryAlbumComment(commentId);

  if (!res.ok) {
    alert(res.message || "خطا در حذف نظر");
    return;
  }

  await loadAlbums();
};

  const handleAddPhoto = async (albumId, file) => {
  if (!file) return;

  setUploadingPhotoAlbumId(albumId);

  let preparedFile;

try {
  preparedFile = await prepareImage(file, {
  maxSizeMB: 1.2,
  maxWidthOrHeight: 1800,
  quality: 0.88,
  outputFileName: "memory-photo.jpg",
});
} catch (err) {
  console.error("PREPARE MEMORY PHOTO ERROR:", err);
  alert("آماده‌سازی عکس انجام نشد");
  return;
}

  try {
    // 1️⃣ گرفتن presigned url
    const presignRes = await presignMemoryAlbumPhotoUpload({
      albumId,
      ext: preparedFile.name?.includes(".")
  ? preparedFile.name.split(".").pop()
  : preparedFile.type?.split("/").pop(),

contentType: preparedFile.type,
fileName: preparedFile.name,
fileSize: preparedFile.size,
    });

    if (!presignRes.ok) {
      alert(presignRes.message || "خطا در آماده‌سازی آپلود");
      return;
    }

    // 2️⃣ آپلود واقعی به S3
    const uploadRes = await putFileToPresignedUrl(
      presignRes.uploadUrl,
      preparedFile
    );

    if (!uploadRes.ok) {
      alert(uploadRes.message || "خطا در آپلود عکس");
      return;
    }

    // 3️⃣ ثبت در دیتابیس
    const saveRes = await addMemoryAlbumPhoto(albumId, {
      url: presignRes.publicUrl,
      fileName: preparedFile.name,
      mimeType: preparedFile.type,
      fileSize: preparedFile.size,
    });

    if (!saveRes.ok) {
      alert(saveRes.message || "خطا در ثبت عکس");
      return;
    }

    // 4️⃣ رفرش آلبوم‌ها
    await loadAlbums();
  } catch (err) {
    console.error("ADD PHOTO ERROR:", err);
    alert("خطا در افزودن عکس");
  } finally {
  setUploadingPhotoAlbumId(null);
}
};

  const handleDeletePhoto = async () => {
  const { photoId } = confirmDelete;

  if (!photoId) return;

  const res = await deleteMemoryAlbumPhoto(photoId);

  if (!res.ok) {
    alert(res.message || "خطا در حذف عکس");
    return;
  }

  setConfirmDelete({ show: false, albumId: null, photoId: null });
  await loadAlbums();
};

const handleDeleteAlbum = async (albumId) => {
  const ok = window.confirm(
    "آیا از حذف کامل این آلبوم مطمئن هستید؟"
  );

  if (!ok) return;

  const res = await deleteMemoryAlbum(albumId);

  if (!res.ok) {
    alert(res.message || "خطا در حذف آلبوم");
    return;
  }

  await loadAlbums();
};

  return (
    <GeninoDNABackground>
      <main
  dir="rtl"
  className="relative min-h-screen overflow-hidden pt-4 md:pt-24 pb-24 text-gray-800"
>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,236,170,0.45),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,250,235,0.78),rgba(255,255,255,0.96))]" />

        <section className="relative z-10 mx-auto w-full max-w-6xl px-5">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-4 rounded-3xl border border-yellow-200/70 bg-white/65 px-4 py-3 text-center backdrop-blur-xl"
          >
            

            <h1 className="bg-gradient-to-l from-yellow-900 via-yellow-700 to-amber-500 bg-clip-text text-xl md:text-3xl font-black text-transparent drop-shadow-sm md:text-5xl">
              آلبوم خاطرات ژنینو
            </h1>

            {canManageAlbums && !isViewMode && (
  <button
    onClick={() => setShowModal(true)}
    className="mx-auto mt-7 flex items-center gap-2 rounded-2xl bg-gradient-to-l from-yellow-500 via-amber-400 to-yellow-300 px-7 py-3 font-bold text-white shadow-lg shadow-yellow-400/30 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-yellow-500/35"
  >
    <FolderPlus className="h-5 w-5" />
    ایجاد آلبوم جدید
  </button>
)}
          </motion.div>

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
                className="w-full rounded-2xl border border-yellow-200 bg-white/70 px-4 py-3 text-gray-700 outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100"
              />

              <textarea
                placeholder="توضیح کوتاه درباره آلبوم..."
                value={newAlbum.desc}
                onChange={(e) =>
                  setNewAlbum({ ...newAlbum, desc: e.target.value })
                }
                className="min-h-28 w-full rounded-2xl border border-yellow-200 bg-white/70 px-4 py-3 text-gray-700 outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100"
              />
            </div>
          </GoldenModal>

          <GoldenModal
            show={confirmDelete.show}
            title="❌ حذف عکس"
            description="آیا از حذف این عکس مطمئن هستید؟ این عمل قابل بازگشت نیست."
            confirmLabel="بله، حذف شود"
            confirmColor="red"
            onConfirm={handleDeletePhoto}
            onCancel={() =>
              setConfirmDelete({ show: false, albumId: null, photoId: null })
            }
          />

          {albums.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mt-8 max-w-xl rounded-[2rem] border border-yellow-200 bg-white/65 p-8 text-center shadow-xl backdrop-blur-xl"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-700">
                <ImagePlus className="h-7 w-7" />
              </div>
              <p className="font-bold text-yellow-800">
                هنوز هیچ آلبومی ساخته نشده 💛
              </p>
              <p className="mt-2 text-sm text-gray-500">
                اولین آلبوم خاطرات ژنینویی را بسازید.
              </p>
            </motion.div>
          )}

          <div className="space-y-8">
            {albums.map((album, index) => (
              <motion.article
                key={album.id}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="relative overflow-hidden rounded-[2rem] border border-yellow-200/80 bg-white/70 p-5 shadow-[0_22px_70px_rgba(160,120,30,0.13)] backdrop-blur-xl md:p-7"
              >
                <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-yellow-300/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-amber-300/20 blur-3xl" />

                <div className="relative z-10">
                  <div className="mb-5 flex flex-col items-center justify-between gap-4 md:flex-row">
  <div className="text-center md:text-right">
    <h2 className="text-2xl font-black text-yellow-900">
      {album.title}
    </h2>

    {album.description && (
  <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-600">
    {album.description}
  </p>
)}
  </div>

  {canManageAlbums && !isViewMode && (
  <div className="flex flex-wrap items-center justify-center gap-3">
    <label className="flex cursor-pointer items-center gap-2 rounded-2xl bg-gradient-to-l from-yellow-500 to-amber-400 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-yellow-400/25 transition hover:-translate-y-0.5 hover:shadow-xl">
      <ImagePlus className="h-5 w-5" />
      افزودن عکس
      <input
        type="file"
        accept="image/*,.heic,.heif,.gif"
        hidden
        onClick={(e) => {
          e.target.value = "";
        }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleAddPhoto(album.id, file);
          }
        }}
      />
    </label>

    <button
      type="button"
      onClick={() => handleDeleteAlbum(album.id)}
      className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-red-500 border border-red-100 shadow-sm transition hover:bg-red-50 hover:border-red-200"
    >
      <Trash2 className="h-5 w-5" />
      حذف آلبوم
    </button>
  </div>
  )}
</div>

                  <div className="flex gap-4 overflow-x-auto rounded-3xl border border-yellow-100 bg-gradient-to-l from-yellow-50/80 to-white/70 p-4">
                  {uploadingPhotoAlbumId === album.id && (
  <div className="mb-4 flex w-full flex-col items-center justify-center rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-5 text-center">
    <div className="mb-2 text-lg">⏳</div>

    <p className="font-bold text-yellow-800">
      در حال آماده‌سازی و ارسال عکس...
    </p>

    <p className="mt-1 text-xs text-gray-500">
      لطفاً چند لحظه صبر کنید
    </p>
  </div>
)}
                    {album.photos?.length > 0 ? (
                      album.photos.map((photo, i) => (
                        <motion.div
                          key={photo.id || i}
                          whileHover={{ y: -4 }}
                          className="group relative h-36 w-44 flex-shrink-0 overflow-hidden rounded-3xl border border-white bg-white shadow-lg shadow-yellow-900/10"
                        >
                          <img
                            src={photo.url}
                            alt={`photo-${i}`}
                            className="h-full w-full cursor-pointer object-cover transition duration-500 group-hover:scale-110"
                            onClick={() =>
                              setSelectedPhoto({ src: photo.url, albumId: album.id })
                            }
                          />

                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                          {canManageAlbums && !isViewMode && (
                          <button
                            onClick={() =>
                              setConfirmDelete({
                                show: true,
                                albumId: album.id,
                                photoId: photo.id,
                              })
                            }
                            className="absolute left-2 top-2 rounded-full bg-red-500/90 p-2 text-white shadow transition hover:bg-red-600 md:opacity-0 md:group-hover:opacity-100"
                            title="حذف عکس"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          )}
                        </motion.div>
                      ))
                    ) : (
                      <div className="flex min-h-36 w-full flex-col items-center justify-center rounded-3xl border border-dashed border-yellow-300 bg-white/60 p-6 text-center">
                        <ImagePlus className="mb-2 h-8 w-8 text-yellow-600" />
                        <p className="text-sm font-semibold text-yellow-800">
                          هنوز عکسی در این آلبوم نیست
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {isViewMode
                          ? "هنوز تصویری در این آلبوم ثبت نشده است."
                          : "اولین تصویر خاطره‌انگیز را اضافه کنید."}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex flex-col gap-4">
  <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between">
    <button
      onClick={() => handleLike(album.id)}
      className={`flex items-center gap-2 rounded-full border px-5 py-2.5 font-bold shadow-sm transition ${
        album.likes?.some((l) => Number(l.userId) === Number(currentUserId))
          ? "border-rose-200 bg-rose-100 text-rose-600"
          : "border-rose-100 bg-rose-50 text-rose-500 hover:bg-rose-100"
      }`}
    >
      <Heart className="h-5 w-5 fill-current" />
      <span>{album.likes?.length || 0}</span>
    </button>

    {album.likes?.length > 0 && (
      <p className="text-xs text-gray-500">
        پسندیده شده توسط:{" "}
        {album.likes
          .map((l) => l.user?.fullName || "کاربر ژنینو")
          .join("، ")}
      </p>
    )}

    <form
      onSubmit={(e) => {
        e.preventDefault();
        const comment = e.target.comment.value;
        handleAddComment(album.id, comment);
        e.target.reset();
      }}
      className="flex w-full max-w-md items-center gap-2 rounded-full border border-yellow-200 bg-white/80 px-4 py-2 shadow-sm"
    >
      <MessageCircle className="h-5 w-5 text-yellow-600" />

      <input
        name="comment"
        placeholder="نظر خود را بنویسید..."
        className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
      />

      <button
        type="submit"
        className="rounded-full bg-yellow-500 px-4 py-1.5 text-sm font-bold text-white transition hover:bg-yellow-600"
      >
        ارسال
      </button>
    </form>
  </div>

  {album.comments?.length > 0 && (
    <div className="max-h-52 overflow-y-auto rounded-3xl border border-yellow-100 bg-white/65 p-4 text-sm text-gray-700 shadow-inner">
      {album.comments.map((c) => {
        const canDeleteComment =
          canManageAlbums || Number(c.userId) === Number(currentUserId);

        return (
          <div
            key={c.id}
            className="mb-2 rounded-xl bg-yellow-50/80 px-3 py-2 leading-6 last:mb-0 border border-yellow-100"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-yellow-900">
                  {c.user?.fullName || "کاربر ژنینو"}
                </p>
                <p className="mt-0.5 text-sm text-gray-700">💬 {c.text}</p>
              </div>

              {canDeleteComment && (
                <button
                  type="button"
                  onClick={() => handleDeleteComment(c.id)}
                  className="rounded-full bg-white px-3 py-1 text-xs font-bold text-red-500 border border-red-100 hover:bg-red-50 transition"
                >
                  حذف
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  )}
</div>

                  <div className="mt-8">
                    <GoldenDivider />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              className="fixed inset-0 z-[999] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-l from-yellow-400 via-amber-300 to-yellow-600 opacity-70 blur" />

                <img
                  src={selectedPhoto.src}
                  alt="نمایش بزرگ"
                  className="relative max-h-[75vh] max-w-[82vw] rounded-[2rem] border border-yellow-200 object-contain shadow-2xl"
                />

                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute -top-5 -right-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl font-black text-yellow-800 shadow-lg transition hover:bg-yellow-100"
                >
                  ×
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </GeninoDNABackground>
  );
}