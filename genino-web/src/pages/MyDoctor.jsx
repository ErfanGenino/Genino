import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  FileHeart,
  UploadCloud,
  Search,
} from "lucide-react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import GoldenModal from "@components/Core/GoldenModal";
import "../App.css"; // اگه هنوز این خط نیست
import { useEffect } from "react";




export default function MyDoctor() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    title: "",
    doctor: "",
    category: "",
    date: "",
    desc: "",
    files: [], // ← اینجا اصلاح شد
  });
  const [filters, setFilters] = useState({
    title: "",
    category: "",
    from: "",
    to: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  // 🟢 افزودن گزارش جدید
const handleSubmit = (e) => {
  e.preventDefault();
  if (!form.title || !form.date || !form.category)
    return alert("لطفاً عنوان، تاریخ و دسته درمانی را وارد کنید");

  let dateObj;
  if (typeof form.date === "object" && form.date.year) {
    dateObj = form.date;
  } else if (typeof form.date === "string") {
    const [y, m, d] = form.date.split("-").map((n) =>
      parseInt(n.replace(/[۰-۹]/g, (t) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(t)]))
    );
    dateObj = { year: y, month: m, day: d };
  } else {
    alert("تاریخ معتبر نیست");
    return;
  }

  const gregorian = new DateObject({
    date: dateObj,
    calendar: persian,
    locale: persian_fa,
  }).convert();

  const timestamp = gregorian.toDate().getTime();

  if (isEditing && editingId) {
    // ✏️ حالت ویرایش
    setRecords((prev) =>
      prev.map((r) =>
        r.id === editingId
          ? { ...form, id: editingId, timestamp, date: `${dateObj.year}-${String(dateObj.month).padStart(2, "0")}-${String(dateObj.day).padStart(2, "0")}` }
          : r
      )
    );
    setIsEditing(false);
    setEditingId(null);
  } else {
    // ➕ حالت افزودن
    const newRecord = {
      ...form,
      id: Date.now(),
      timestamp,
      date: `${dateObj.year}-${String(dateObj.month).padStart(2, "0")}-${String(dateObj.day).padStart(2, "0")}`,
      files: form.files || [],
    };
    setRecords([newRecord, ...records]);
  }

  setForm({
    title: "",
    doctor: "",
    category: "",
    date: "",
    desc: "",
    files: [],
  });
};

  // 🟡 تبدیل عدد فارسی به انگلیسی
  const toEnglishNumber = (str = "") =>
    str.replace(/[۰-۹]/g, (d) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)]);

  // 🟡 فیلتر گزارش‌ها
  const filteredRecords = records.filter((r) => {
    const recordDate = r.timestamp || 0;

    const fromTimestamp = filters.from
      ? new DateObject({
          date:
            typeof filters.from === "object"
              ? filters.from
              : toEnglishNumber(filters.from),
          calendar: persian,
          locale: persian_fa,
        })
          .convert()
          .toDate()
          .getTime()
      : 0;

    const toTimestamp = filters.to
      ? new DateObject({
          date:
            typeof filters.to === "object"
              ? filters.to
              : toEnglishNumber(filters.to),
          calendar: persian,
          locale: persian_fa,
        })
          .convert()
          .toDate()
          .getTime()
      : Infinity;

    const inDateRange =
      recordDate >= fromTimestamp && recordDate <= toTimestamp;
    const inCategory = !filters.category || r.category === filters.category;
    const inTitle = !filters.title || r.title === filters.title;

    return inDateRange && inCategory && inTitle;
  });

  // 🟢 مرتب‌سازی دقیق بر اساس timestamp
  const sortedRecords = [...filteredRecords].sort(
    (a, b) => (b.timestamp || 0) - (a.timestamp || 0)
  );

  // صفحه‌بندی
  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRecords = sortedRecords.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  // 🟡 وقتی صفحه بارگذاری میشه، داده‌ها از localStorage خونده میشن
useEffect(() => {
  const savedRecords = localStorage.getItem("doctorRecords");
  if (savedRecords) {
    setRecords(JSON.parse(savedRecords));
  }
}, []);

// ✅ لود داده‌ها فقط یک بار و با پاکسازی ایمن فایل‌ها
useEffect(() => {
  const savedRecords = localStorage.getItem("doctorRecords");
  if (savedRecords) {
    try {
      const parsed = JSON.parse(savedRecords);
      // اطمینان از اینکه فایل‌ها همیشه type داشته باشن
      const cleaned = parsed.map((r) => ({
        ...r,
        files: (r.files || []).map((f) => ({
          ...f,
          type: f.type || "",
        })),
      }));
      setRecords(cleaned);
    } catch (err) {
      console.error("خطا در خواندن localStorage:", err);
      setRecords([]); // اگر داده خراب بود، خالی بشه
    }
  }
}, []);
// ✅ هر بار که لیست گزارش‌ها تغییر می‌کند، در localStorage ذخیره می‌شود
useEffect(() => {
  localStorage.setItem("doctorRecords", JSON.stringify(records));
}, [records]);

const [deleteTarget, setDeleteTarget] = useState(null);
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deleteLoading, setDeleteLoading] = useState(false);
const [showShareModal, setShowShareModal] = useState(false);
const [shareTarget, setShareTarget] = useState(null);
const [showFilters, setShowFilters] = useState(true);

  return (
    <main
      dir="rtl"
      className="relative z-0 min-h-screen bg-gradient-to-b from-[#fffdf8] to-[#f7f3e6] px-6 py-10 text-gray-800"
    >
      {/* 🔹 عنوان صفحه */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <FileHeart className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
        <h1 className="text-3xl font-bold text-yellow-700 mb-2">
          پزشک من 🩺
        </h1>
        <p className="text-gray-600 text-sm">
          بایگانی پرونده‌های پزشکی، نسخه‌ها و آزمایش‌های شما در ژنینو 
        </p>
      </motion.div>

     {/* 🔍 فیلتر بالا با حالت باز و بسته شونده */}
<div className="max-w-6xl mx-auto mb-6 sm:mb-10">
  {/* دکمه‌ی باز و بسته کردن فیلتر */}
  <div className="flex justify-center sm:justify-end mb-3">
    <button
      onClick={() => setShowFilters(!showFilters)}
      className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium py-2 px-4 rounded-xl shadow-md transition sm:hidden"
    >
      {showFilters ? "بستن فیلترها ▲" : "نمایش فیلترها ▼"}
    </button>
  </div>

  {/* باکس فیلتر */}
  <AnimatePresence>
    {(showFilters || window.innerWidth >= 640) && (
      <motion.div
        key="filters-box"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="overflow-hidden bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl shadow-md border border-yellow-100"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 text-right items-end">
          {/* 🔸 عنوان */}
          <div className="col-span-1">
            <label className="block text-xs sm:text-sm text-gray-700 mb-1">عنوان</label>
            <select
              value={filters.title}
              onChange={(e) => setFilters({ ...filters, title: e.target.value })}
              className="w-full border border-yellow-200 rounded-xl p-2 sm:p-2.5 
                         text-sm focus:ring-2 focus:ring-yellow-300 outline-none"
            >
              <option value="">همه</option>
              <option value="چکاپ عمومی">چکاپ عمومی</option>
              <option value="چکاپ تخصصی">چکاپ تخصصی</option>
              <option value="آزمایش و بررسی‌های تخصصی پزشکی">آزمایش‌ها</option>
              <option value="بستری و جراحی">بستری و جراحی</option>
              <option value="سایر">سایر</option>
            </select>
          </div>

          {/* 🔸 دسته */}
          <div className="col-span-1">
            <label className="block text-xs sm:text-sm text-gray-700 mb-1">دسته</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full border border-yellow-200 rounded-xl p-2 sm:p-2.5 
                         text-sm focus:ring-2 focus:ring-yellow-300 outline-none"
            >
              <option value="">همه</option>
              <option value="عمومی">عمومی</option>
              <option value="قلب و عروق">قلب و عروق</option>
              <option value="مغز و اعصاب">مغز و اعصاب</option>
              <option value="زنان">زنان</option>
              <option value="دندانپزشکی">دندانپزشکی</option>
              <option value="چشم‌پزشکی">چشم‌پزشکی</option>
              <option value="پوست و مو">پوست و مو</option>
            </select>
          </div>

          {/* 🔸 از تاریخ */}
          <div className="col-span-1">
            <label className="block text-xs sm:text-sm text-gray-700 mb-1">از تاریخ</label>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={filters.from}
              onChange={(date) =>
                setFilters({ ...filters, from: date?.format("YYYY-MM-DD") })
              }
              portal
              containerStyle={{ zIndex: 2000 }}
              inputClass="w-full border border-yellow-200 rounded-xl p-2 sm:p-2.5 
                          text-sm focus:ring-2 focus:ring-yellow-300 outline-none text-right"
            />
          </div>

          {/* 🔸 تا تاریخ */}
          <div className="col-span-1">
            <label className="block text-xs sm:text-sm text-gray-700 mb-1">تا تاریخ</label>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={filters.to}
              onChange={(date) =>
                setFilters({ ...filters, to: date?.format("YYYY-MM-DD") })
              }
              portal
              containerStyle={{ zIndex: 2000 }}
              inputClass="w-full border border-yellow-200 rounded-xl p-2 sm:p-2.5 
                          text-sm focus:ring-2 focus:ring-yellow-300 outline-none text-right"
            />
          </div>

          {/* 🔘 دکمه‌ها */}
          <div className="col-span-2 sm:col-span-2 flex items-center justify-center sm:justify-start gap-2 mt-1">
            <button
              onClick={() => setCurrentPage(1)}
              className="flex-1 sm:flex-none bg-yellow-500 text-white py-2 px-3 rounded-xl hover:bg-yellow-600 transition text-sm font-medium shadow-sm"
            >
              اعمال فیلتر
            </button>

            <button
              onClick={() => setFilters({ title: "", category: "", from: "", to: "" })}
              className="flex-1 sm:flex-none bg-gray-200 text-gray-700 py-2 px-3 rounded-xl hover:bg-gray-300 transition text-sm"
            >
              حذف فیلترها
            </button>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>


      {/* 📋 باکس گزارش‌های من */}
<motion.section
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
  className="relative z-20 max-w-6xl mx-auto bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-yellow-100 mb-10"
>
  {/* 🔹 هدر باکس */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 border-b pb-3">
    <div>
      <h2 className="text-xl font-semibold text-yellow-700">گزارش‌های من 📋</h2>
      <p className="text-sm text-gray-500 mt-1">
        صاحب پروفایل:{" "}
        <span className="font-medium text-gray-700">عرفان سمواتی</span>
      </p>
    </div>
    <p className="text-sm text-gray-600 mt-2 sm:mt-0">
      مجموع گزارش‌های ثبت‌شده:{" "}
      <span className="font-semibold text-yellow-700">{filteredRecords.length}</span>
    </p>
  </div>

  {/* 🟡 مرتب‌سازی و صفحه‌بندی */}
  {filteredRecords.length === 0 ? (
    <p className="text-center text-gray-500 py-6">
      هنوز گزارشی ثبت نکرده‌اید 
    </p>
  ) : (
    <>
      {/* مرتب‌سازی بر اساس تاریخ */}
      {(() => {
        const sortedRecords = [...filteredRecords].sort((a, b) => {
          const dateA = a.date ? new Date(a.date).getTime() : 0;
          const dateB = b.date ? new Date(b.date).getTime() : 0;
          return dateB - dateA;
        });

        // صفحه‌بندی
        const itemsPerPage = 10;
        const totalPages = Math.ceil(sortedRecords.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const currentRecords = sortedRecords.slice(
          startIndex,
          startIndex + itemsPerPage
        );

        return (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm text-right">
                <thead>
                  <tr className="bg-yellow-100 text-yellow-800">
                    <th className="p-3 border-b border-yellow-200">تاریخ</th>
                    <th className="p-3 border-b border-yellow-200">عنوان گزارش</th>
                    <th className="p-3 border-b border-yellow-200">پزشک معالج</th>
                    <th className="p-3 border-b border-yellow-200">دسته درمانی</th>
                    <th className="p-3 border-b border-yellow-200 text-center">
                      عملیات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((rec) => (
                    <tr
                      key={rec.id}
                      className="hover:bg-yellow-50 transition border-b border-gray-100"
                    >
                      <td className="p-3 text-gray-600">{rec.date || "—"}</td>
                      <td className="p-3 text-gray-700 font-medium">
                        {rec.title || "—"}
                      </td>
                      <td className="p-3 text-gray-600">
                        {rec.doctor || "نامشخص"}
                      </td>
                      <td className="p-3 text-gray-600">
                        {rec.category || "—"}
                      </td>
                      <td className="p-3 text-center flex justify-center gap-2">
                        <button
  onClick={() => setSelectedRecord(rec)}
  className="px-3 py-1 rounded-lg text-xs bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
>
  نمایش
</button>

                        <button
  onClick={() => {
    setForm({
      title: rec.title,
      doctor: rec.doctor,
      category: rec.category,
      date: rec.date,
      desc: rec.desc,
      files: rec.files || [],
    });
    setEditingId(rec.id);
    setIsEditing(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }); // اسکرول نرم به فرم پایین
  }}
  className="px-3 py-1 rounded-lg text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
>
  ویرایش
</button>

     <button
  onClick={() => {
    setDeleteTarget(rec);
    setShowDeleteModal(true);
  }}
  className="px-3 py-1 rounded-lg text-xs bg-red-100 text-red-700 hover:bg-red-200 transition"
>
  حذف
</button>

<button
  onClick={() => {
    setShareTarget(rec);
    setShowShareModal(true);
  }}
  className="px-3 py-1 rounded-lg text-xs bg-green-100 text-green-700 hover:bg-green-200 transition"
>
  اشتراک
</button>


                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 🔸 صفحه‌بندی دکمه‌ها */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-xl text-sm transition ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-yellow-500 text-white hover:bg-yellow-600"
                  }`}
                >
                  قبلی
                </button>

                <span className="text-sm text-gray-600">
                  صفحه {currentPage} از {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-xl text-sm transition ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-yellow-500 text-white hover:bg-yellow-600"
                  }`}
                >
                  بعدی
                </button>
              </div>
            )}
          </>
        );
      })()}
    </>
  )}

  {/* 🖼 پاپ آپ اول نمایش گزارش ثبت شده */}
  <GoldenModal
  show={!!selectedRecord}
  title="جزئیات گزارش پزشکی"
  description="اطلاعات کامل این گزارش را در ادامه مشاهده می‌کنید."
  confirmLabel="بستن"
  onConfirm={() => setSelectedRecord(null)}
>
  {selectedRecord && (
  <div className="text-right text-gray-700 leading-relaxed space-y-3">
    <p><span className="font-semibold text-yellow-700">📅 تاریخ:</span> {selectedRecord.date}</p>
    <p><span className="font-semibold text-yellow-700">🧾 عنوان گزارش:</span> {selectedRecord.title}</p>
    <p><span className="font-semibold text-yellow-700">👨‍⚕️ پزشک معالج:</span> {selectedRecord.doctor || "—"}</p>
    <p><span className="font-semibold text-yellow-700">🏷 دسته درمانی:</span> {selectedRecord.category}</p>
    {selectedRecord.desc && (
      <p><span className="font-semibold text-yellow-700">📝 توضیحات:</span> {selectedRecord.desc}</p>
    )}

    {/* 🖼 نمایش فایل‌ها */}
    {selectedRecord.files?.length > 0 && (
      <div>
        <p className="font-semibold text-yellow-700 mb-2">📎 فایل‌های پیوست‌شده:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {selectedRecord.files.map((file, index) => (
            <div
              key={index}
              onClick={() => file?.type?.startsWith("image/") && setPreviewImage(URL.createObjectURL(file))}
              className="relative border border-yellow-200 rounded-xl overflow-hidden bg-white/60 
                         hover:shadow-lg hover:scale-[1.03] transition cursor-pointer"
            >
              {file?.type?.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
    alt={`file-${index}`}
    className="w-full h-24 object-cover"
  />
) : (
  <div className="flex items-center justify-center bg-yellow-50 h-24 text-yellow-700 text-xs font-medium">
    📄 {file?.name || "فایل نامشخص"}
  </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
)}
</GoldenModal>

{/* 🖼 پاپ آپ دوم نمایش عکس درون گزارش ثبت شده */}
<AnimatePresence>
  {previewImage && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setPreviewImage(null)}
      className="fixed inset-0 z-[100000] bg-black/70 flex items-center justify-center p-6 cursor-zoom-out"
    >
      <motion.img
        src={previewImage}
        alt="Preview"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.5)]"
      />
    </motion.div>
  )}
</AnimatePresence>

{/* 🔴 مودال تأیید حذف گزارش */}
<GoldenModal
  show={showDeleteModal}
  title="تأیید حذف گزارش"
  description="آیا از حذف این گزارش مطمئن هستید؟ این عمل قابل بازگشت نیست."
  confirmLabel={deleteLoading ? "در حال حذف..." : "بله، حذف شود"}
  cancelLabel="انصراف"
  onConfirm={() => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    setTimeout(() => {
      setRecords(records.filter((r) => r.id !== deleteTarget.id));
      setShowDeleteModal(false);
      setDeleteLoading(false);
      setDeleteTarget(null);
      setCurrentPage(1);
    }, 600); // یه تاخیر کوچیک برای حس نرم‌تر
  }}
  onCancel={() => {
    setShowDeleteModal(false);
    setDeleteTarget(null);
  }}
  confirmColor="red"
>
  {deleteTarget && (
    <div className="text-right text-gray-700 leading-relaxed">
      <p>
        گزارش با عنوان{" "}
        <span className="font-semibold text-yellow-700">
          “{deleteTarget.title || "بدون عنوان"}”
        </span>{" "}
        حذف خواهد شد.
      </p>
    </div>
  )}
</GoldenModal>

{/* 🟢 مودال اشتراک گزارش */}
<GoldenModal
  show={showShareModal}
  title="اشتراک‌گذاری گزارش"
  description="می‌توانید گزارش خود را برای افراد مورد اعتماد ارسال کنید "
  confirmLabel="باشه"
  onConfirm={() => setShowShareModal(false)}
>
  {shareTarget && (
    <div className="text-right text-gray-700 space-y-3 leading-relaxed">
      <p>
        گزارش با عنوان{" "}
        <span className="font-semibold text-yellow-700">
          “{shareTarget.title || "بدون عنوان"}”
        </span>{" "}
        انتخاب شده است.
      </p>

      <p className="text-gray-600 text-sm">
        این قابلیت در حال آماده‌سازی است و به‌زودی می‌توانید گزارش خود را از
        طریق لینک اختصاصی، ایمیل یا واتساپ به اشتراک بگذارید 
      </p>
    </div>
  )}
</GoldenModal>

</motion.section>


      {/* 🩺 فرم افزودن گزارش */}
      <motion.form
        onSubmit={handleSubmit}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: isEditing ? -10 : 0, scale: isEditing ? 1.03 : 1 }}
  transition={{ duration: 0.5, type: "spring" }}
  className={`relative z-10 max-w-lg mx-auto p-6 rounded-2xl shadow-md border ${
    isEditing ? "border-blue-300 bg-blue-50/70" : "border-yellow-100 bg-white/80"
  } backdrop-blur-sm mb-10`}
>
  <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
    isEditing ? "text-blue-700" : "text-yellow-700"
  }`}>
    <PlusCircle className={`w-5 h-5 ${isEditing ? "text-blue-600" : "text-yellow-600"}`} />
    {isEditing ? "ویرایش گزارش پزشکی" : "افزودن گزارش پزشکی جدید"}
  </h2>

        <div className="grid gap-4 text-right">
          {/* 🔸 عنوان گزارش (منوی بازشونده) */}
          <select
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border border-yellow-200 rounded-xl p-3 focus:ring-2 focus:ring-yellow-300 outline-none"
          >
            <option value="">انتخاب عنوان گزارش</option>
            <option value="چکاپ عمومی">چکاپ عمومی</option>
            <option value="چکاپ تخصصی">چکاپ تخصصی</option>
            <option value="آزمایش و بررسی‌های تخصصی پزشکی">
              آزمایش و بررسی‌های تخصصی پزشکی
            </option>
            <option value="بستری و جراحی">بستری و جراحی</option>
            <option value="سایر">سایر</option>
          </select>

          <input
            type="text"
            placeholder="نام پزشک معالج"
            value={form.doctor}
            onChange={(e) => setForm({ ...form, doctor: e.target.value })}
            className="border border-yellow-200 rounded-xl p-3 focus:ring-2 focus:ring-yellow-300 outline-none"
          />

          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="border border-yellow-200 rounded-xl p-3 focus:ring-2 focus:ring-yellow-300 outline-none"
          >
            <option value="">انتخاب دسته درمانی</option>
            <option value="عمومی">عمومی</option>
            <option value="قلب و عروق">قلب و عروق</option>
            <option value="مغز و اعصاب">مغز و اعصاب</option>
            <option value="زنان">زنان</option>
            <option value="دندانپزشکی">دندانپزشکی</option>
            <option value="چشم‌پزشکی">چشم‌پزشکی</option>
            <option value="ارتوپدی">ارتوپدی</option>
            <option value="پوست و مو">پوست و مو</option>
            <option value="سایر">سایر</option>
          </select>

          <div>
            <label className="block text-sm text-gray-700 mb-1">تاریخ ثبت گزارش</label>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={form.date}
              onChange={(date) =>
                setForm({ ...form, date: date?.format("YYYY-MM-DD") })
              }
              portal
              containerStyle={{ zIndex: 2000 }}
              inputClass="border border-yellow-200 rounded-xl p-2 w-full focus:ring-2 focus:ring-yellow-300 outline-none text-right"
            />
          </div>

          <textarea
            placeholder="توضیح کوتاه (اختیاری)"
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            className="border border-yellow-200 rounded-xl p-3 focus:ring-2 focus:ring-yellow-300 outline-none min-h-[80px]"
          />

          {/* 🟢 آپلود چندفایلی با Tooltip و پیش‌نمایش داخل باکس */}
<div className="relative group">
  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-yellow-300 rounded-xl cursor-pointer hover:bg-yellow-50 transition text-center min-h-[120px]">
    {/* 🟡 اگر فایل انتخاب نشده */}
    {!form.files?.length && (
      <>
        <UploadCloud className="w-6 h-6 text-yellow-600 mb-1" />
        <span className="text-sm text-gray-600">
          آپلود تصویر یا فایل آزمایش / نسخه
        </span>
      </>
    )}

    {/* 🖼 اگر فایل‌ها انتخاب شده‌اند */}
    {form.files?.length > 0 && (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
        {form.files.map((file, index) => (
          <div
            key={index}
            className="relative border border-yellow-200 rounded-lg overflow-hidden bg-white/60"
          >
            {file?.type?.startsWith("image/") ? (
  <img
    src={URL.createObjectURL(file)}
    alt={`file-${index}`}
    className="w-full h-20 object-cover"
  />
) : (
  <div className="flex items-center justify-center bg-yellow-50 h-20 text-yellow-700 text-xs font-medium">
    📄 {file?.name || "فایل غیر تصویری"}
  </div>
)}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setForm({
                  ...form,
                  files: form.files.filter((_, i) => i !== index),
                });
              }}
              className="absolute top-1 right-1 bg-white/90 hover:bg-red-500 hover:text-white text-gray-600 w-5 h-5 rounded-full flex items-center justify-center text-xs shadow-md transition"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    )}

    {/* 🟢 ورودی فایل */}
    <input
      type="file"
      multiple
      accept="image/*,.pdf,.doc,.docx"
      className="hidden"
      onChange={(e) => {
        const selectedFiles = Array.from(e.target.files || []);
        if (selectedFiles.length + (form.files?.length || 0) > 4) {
          alert("حداکثر ۴ فایل می‌توانید بارگذاری کنید");
          return;
        }
        setForm({
          ...form,
          files: [...(form.files || []), ...selectedFiles],
        });
      }}
    />
  </label>

  {/* 🔸 Tooltip توضیحی */}
  <motion.div
    initial={{ opacity: 0, y: 5 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="absolute hidden group-hover:block bg-yellow-50 border border-yellow-200 shadow-lg text-gray-700 text-sm rounded-xl p-3 w-80 right-0 top-[110%] z-50 leading-relaxed"
  >
    در این بخش می‌توانید حداکثر{" "}
    <span className="font-semibold text-yellow-700">۴ تصویر یا فایل</span>{" "}
    بارگذاری کنید؛ شامل مواردی مانند:
    <ul className="list-disc pr-4 mt-1">
      <li>تصویر آزمایش‌ها</li>
      <li>عکس رادیولوژی یا گزارش تصویربرداری</li>
      <li>عکس از محل جراحت یا زخم</li>
      <li>سایر مدارک پزشکی</li>
    </ul>
  </motion.div>
</div>


          <button
    type="submit"
    className={`${
      isEditing
        ? "bg-blue-500 hover:bg-blue-600"
        : "bg-yellow-500 hover:bg-yellow-600"
    } text-white py-3 rounded-xl transition font-medium`}
  >
    {isEditing ? "ثبت تغییرات" : "ذخیره گزارش"}
  </button>

  {/* 🔵 دکمه لغو ویرایش */}
{isEditing && (
  <motion.button
    type="button"
    onClick={() => {
      setIsEditing(false);
      setEditingId(null);
      setForm({
        title: "",
        doctor: "",
        category: "",
        date: "",
        desc: "",
        files: [],
      });
    }}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{ duration: 0.4 }}
    className="mt-3 w-full py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-sm transition"
  >
    لغو ویرایش ✖️
  </motion.button>
)}
        </div>
      </motion.form>

    </main>
  );
}
