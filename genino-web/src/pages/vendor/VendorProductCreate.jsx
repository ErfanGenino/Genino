// ============================================================================
// File: src/pages/vendor/VendorProductCreate.jsx
// Description: ساخت محصول جدید برای فروشنده ژنینو (تا 10 تصویر)
// ============================================================================

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { shopCategories } from "../../data/shopCategories";
import { shopGroups } from "../../data/shopGroups";
import { shopItems } from "../../data/shopItems";

export default function VendorProductCreate() {
  const navigate = useNavigate();
  const { productId } = useParams();

  const isEditMode = Boolean(productId);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [categoryLinks, setCategoryLinks] = useState([
  { category: "", group: "", productItem: "" },
  ]);
  const [brandFa, setBrandFa] = useState("");
  const [brandEn, setBrandEn] = useState("");
  const [material, setMaterial] = useState("");
  const [inventoryRows, setInventoryRows] = useState([
  { size: "", colorName: "", colorHex: "", quantity: "", unit: "" },
  ]);
  const [gender, setGender] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [ageRanges, setAgeRanges] = useState([]);
  const [madeInCountry, setMadeInCountry] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [physicalDetailsNote, setPhysicalDetailsNote] = useState("");
  const [hasWarranty, setHasWarranty] = useState("");
  const [warrantyPeriod, setWarrantyPeriod] = useState("");
  const [warrantyUnit, setWarrantyUnit] = useState("ماه");
  const [standards, setStandards] = useState([]);
  const [careInstructions, setCareInstructions] = useState([]);
  const [careNote, setCareNote] = useState("");
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [openGallery, setOpenGallery] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);



  useEffect(() => {
  if (!isEditMode) return;

  async function loadProduct() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/vendor-products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("genino_token")}`,
          },
        }
      );

      const data = await res.json();

      console.log(data);

if (!data.ok || !data.product) {
  alert(data.message || "محصول پیدا نشد");
  return;
}

const p = data.product;

setTitle(p.title || "");
setPrice(formatPrice(String(p.price || "")));
setDescription(p.description || "");

setImages(Array.isArray(p.images) ? p.images : []);
setCategoryLinks(
  Array.isArray(p.categoryLinks) && p.categoryLinks.length > 0
    ? p.categoryLinks
    : [{ category: "", group: "", productItem: "" }]
);

setGender(Array.isArray(p.gender) ? p.gender : []);
setSeasons(Array.isArray(p.seasons) ? p.seasons : []);
setAgeRanges(Array.isArray(p.ageRanges) ? p.ageRanges : []);

setInventoryRows(
  Array.isArray(p.inventoryRows) && p.inventoryRows.length > 0
    ? p.inventoryRows
    : [{ size: "", colorName: "", colorHex: "", quantity: "", unit: "" }]
);

setStandards(Array.isArray(p.standards) ? p.standards : []);
setCareInstructions(Array.isArray(p.careInstructions) ? p.careInstructions : []);
setCareNote(p.careNote || "");

setBrandFa(p.brandFa || "");
setBrandEn(p.brandEn || "");
setMaterial(p.material || "");
setMadeInCountry(p.madeInCountry || "");
setWeight(String(p.weight || ""));
setLength(String(p.length || ""));
setWidth(String(p.width || ""));
setHeight(String(p.height || ""));
setPhysicalDetailsNote(p.physicalDetailsNote || "");
setHasWarranty(p.hasWarranty || "");
setWarrantyPeriod(String(p.warrantyPeriod || ""));
setWarrantyUnit(p.warrantyUnit || "ماه");
setMainImageIndex(p.mainImageIndex || 0);
    } catch (err) {
      console.error(err);
    }
  }

  loadProduct();
}, [isEditMode, productId]);

  const updateCategoryLink = (index, field, value) => {
  setCategoryLinks((prev) =>
    prev.map((item, i) => {
      if (i !== index) return item;

      if (field === "category") {
        return { category: value, group: "", productItem: "" };
      }

      if (field === "group") {
        return { ...item, group: value, productItem: "" };
      }

      return { ...item, [field]: value };
    })
  );
};

const addCategoryLink = () => {
  if (categoryLinks.length >= 3) {
    alert("حداکثر ۳ دسته‌بندی برای هر کالا مجاز است");
    return;
  }

  setCategoryLinks((prev) => [
    ...prev,
    { category: "", group: "", productItem: "" },
  ]);
};

const removeCategoryLink = (index) => {
  setCategoryLinks((prev) => prev.filter((_, i) => i !== index));
};


const productColors = [
  { name: "سفید", hex: "#FFFFFF" },
  { name: "مشکی", hex: "#000000" },
  { name: "طوسی", hex: "#9CA3AF" },
  { name: "نقره‌ای", hex: "#C0C0C0" },
  { name: "طلایی", hex: "#D4AF37" },
  { name: "کرم", hex: "#F5E6C8" },
  { name: "شیری", hex: "#FFF8DC" },
  { name: "بژ", hex: "#E8D3B0" },

  { name: "قرمز", hex: "#EF4444" },
  { name: "زرشکی", hex: "#800020" },
  { name: "شرابی", hex: "#722F37" },
  { name: "صورتی", hex: "#EC4899" },
  { name: "گلبهی", hex: "#FFB6A3" },
  { name: "مرجانی", hex: "#FF7F50" },

  { name: "نارنجی", hex: "#F97316" },
  { name: "هلویی", hex: "#FFDAB9" },
  { name: "زرد", hex: "#FACC15" },
  { name: "خردلی", hex: "#D4A017" },

  { name: "سبز", hex: "#22C55E" },
  { name: "سبز روشن", hex: "#86EFAC" },
  { name: "سبز یشمی", hex: "#0F766E" },
  { name: "سبز زیتونی", hex: "#708238" },
  { name: "سبز فسفری", hex: "#39FF14" },

  { name: "آبی", hex: "#3B82F6" },
  { name: "آبی روشن", hex: "#60A5FA" },
  { name: "آبی نفتی", hex: "#1E3A8A" },
  { name: "سرمه‌ای", hex: "#1E293B" },
  { name: "فیروزه‌ای", hex: "#40E0D0" },

  { name: "بنفش", hex: "#8B5CF6" },
  { name: "یاسی", hex: "#C4B5FD" },
  { name: "ارغوانی", hex: "#7E22CE" },

  { name: "قهوه‌ای", hex: "#92400E" },
  { name: "نسکافه‌ای", hex: "#B08968" },
  { name: "شکلاتی", hex: "#5C4033" },

  { name: "چند رنگ", hex: "#FFFFFF" },
  { name: "بی‌رنگ", hex: "#F8FAFC" },
];

const seasonOptions = [
  "بهار",
  "تابستان",
  "پاییز",
  "زمستان",
  "فصول گرم",
  "فصول سرد",
  "تمام فصول",
];

const ageRangeOptions = [
  "نوزاد",
  "کودک",
  "نوجوان",
  "جوان",
  "بزرگسال",
  "بدون محدودیت سنی",
];

const countryOptions = [
  "ایران",
  "چین",
  "ترکیه",
  "هند",
  "کره جنوبی",
  "ژاپن",
  "آلمان",
  "فرانسه",
  "ایتالیا",
  "اسپانیا",
  "انگلستان",
  "آمریکا",
  "کانادا",
  "امارات",
  "تایلند",
  "ویتنام",
  "مالزی",
  "اندونزی",
  "سایر کشورها",
];

const standardOptions = [
  "CE",
  "ISO",
  "ISO 9001",
  "ISO 14001",
  "استاندارد ملی ایران",
  "FDA",
  "بهداشت",
  "ارگانیک",
  "ضد حساسیت",
  "ضد آب",
  "بدون BPA",
  "دارای تاییدیه پزشکی",
  "مورد تایید وزارت بهداشت",
];

const careOptions = [
  "شستشو با آب سرد",
  "عدم استفاده از سفیدکننده",
  "اتو با دمای پایین",
  "دور از نور مستقیم خورشید",
  "نگهداری در جای خشک",
  "دور از رطوبت",
  "عدم تماس با مواد شیمیایی",
  "شستشو دستی",
  "خشکشویی توصیه می‌شود",
];

const updateInventoryRow = (index, field, value) => {
  setInventoryRows((prev) =>
    prev.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    )
  );
};

const addInventoryRow = () => {
  setInventoryRows((prev) => [
    ...prev,
    { size: "", colorName: "", colorHex: "", quantity: "", unit: "" },
  ]);
};

const removeInventoryRow = (index) => {
  setInventoryRows((prev) => prev.filter((_, i) => i !== index));
};

  

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 10) {
      alert("حداکثر 10 عکس مجاز است");
      return;
    }

    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };


  const uploadImageToArvan = async (file) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/uploads/presign/vendor-product-image`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("genino_token")}`,
      },
      body: JSON.stringify({
        ext: file.name?.includes(".")
          ? file.name.split(".").pop()
          : file.type?.split("/").pop(),

        contentType: file.type,
        fileName: file.name,
        fileSize: file.size,
      }),
    }
  );

  const data = await res.json();

  if (!data.ok) throw new Error("presign failed");

  await fetch(data.uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  return data.publicUrl;
};

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const uploadedImages = [];

for (const item of images) {
  if (typeof item === "string") {
    uploadedImages.push(item);
  } else {
    const url = await uploadImageToArvan(item);
    uploadedImages.push(url);
  }
}
    const hasInvalidCategoryLink = categoryLinks.some(
  (item) =>
    !item.category ||
    !item.group ||
    !item.productItem
);

const hasInvalidInventoryRow = inventoryRows.some(
  (row) =>
    !row.size ||
    !row.colorName ||
    !row.colorHex ||
    !row.quantity ||
    !row.unit
);

if (
  !title ||
  !brandFa ||
  !brandEn ||
  !material ||
  !price ||
  !description ||
  images.length === 0 ||
  gender.length === 0 ||
  seasons.length === 0 ||
  ageRanges.length === 0 ||
  !madeInCountry ||
  !weight ||
  !length ||
  !width ||
  !height ||
  !hasWarranty ||
  (hasWarranty === "دارد" && !warrantyPeriod) ||
  standards.length === 0 ||
  careInstructions.length === 0 ||
  hasInvalidCategoryLink ||
  hasInvalidInventoryRow 
) {
  alert("لطفاً تمام اطلاعات محصول را تکمیل کرده و حداقل یک تصویر انتخاب کنید.");
  setIsSubmitting(false);
  return;
}

    const vendorId = localStorage.getItem("genino_vendor_id");

    if (!vendorId) {
      alert("فروشنده یافت نشد");
      setIsSubmitting(false);
      return;
    }

    const payload = {
  title,
  price: price.replace(/,/g, ""),
  description,

  images: uploadedImages,

  categoryLinks,
  gender,
  seasons,
  ageRanges,
  inventoryRows,
  standards,
  careInstructions,

  brandFa,
  brandEn,
  material,
  madeInCountry,
  weight,
  length,
  width,
  height,
  physicalDetailsNote,
  hasWarranty,
  warrantyPeriod,
  warrantyUnit,
  careNote,
  mainImageIndex: 0,
  vendorId: localStorage.getItem("genino_vendor_id"),
};





    try {
      console.log("vendorId:", vendorId);
      if (!vendorId || vendorId === "undefined") {
  alert("vendorId وجود ندارد - لطفاً دوباره لاگین کنید");
  setIsSubmitting(false);
  return;
}


      const res = await fetch(
  isEditMode
    ? `${import.meta.env.VITE_API_BASE_URL}/vendor-products/${productId}`
    : `${import.meta.env.VITE_API_BASE_URL}/vendor-products/create`,
  {
    method: isEditMode ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("genino_token")}`,
    },
    body: JSON.stringify(payload),
  }
);


      const data = await res.json();

      if (!data.ok) {
        alert(data.message || "خطا در ثبت محصول");
        setIsSubmitting(false);
        return;
      }

      setShowSuccessModal(true);

setTimeout(() => {
  navigate(`/vendor/shop/${vendorId}`);
}, 1600);
    } catch (err) {
      console.error(err);
      alert("خطا در ارتباط با سرور");
      setIsSubmitting(false);
    }

    
  };

  const formatPrice = (value) => {
  const numbers = value.replace(/\D/g, "");
  return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const handlePriceChange = (e) => {
  setPrice(formatPrice(e.target.value));
};

const toggleSeason = (value) => {
  setSeasons((prev) => {
    const allSeasons = ["بهار", "تابستان", "پاییز", "زمستان", "فصول گرم","فصول سرد",];

    const isAllSelected = allSeasons.every((s) =>
      prev.includes(s)
    );

    // اگر "تمام فصول" کلیک شد
    if (value === "تمام فصول") {
      if (isAllSelected) {
        return []; // خاموش کن
      }
      return [...allSeasons, "تمام فصول"]; // روشن کن همه را
    }

    // اگر یکی از فصل‌ها کلیک شد
    if (prev.includes(value)) {
      return prev.filter((s) => s !== value);
    }

    return [...prev, value];
  });
};

const toggleAgeRange = (value) => {
  setAgeRanges((prev) => {
    const allAges = [
      "نوزاد",
      "کودک",
      "نوجوان",
      "جوان",
      "بزرگسال",
    ];

    const isAllSelected = allAges.every((a) =>
      prev.includes(a)
    );

    // اگر "بدون محدودیت سنی" کلیک شد
    if (value === "بدون محدودیت سنی") {
      if (isAllSelected) {
        return []; // خاموش کن همه
      }
      return [...allAges, "بدون محدودیت سنی"]; // روشن کن همه
    }

    // اگر روی یکی از سن‌ها کلیک شد
    if (prev.includes(value)) {
      return prev.filter((a) => a !== value);
    }

    return [...prev, value];
  });
};

const toggleStandard = (item) => {
  setStandards((prev) =>
    prev.includes(item)
      ? prev.filter((s) => s !== item)
      : [...prev, item]
  );
};

const toggleCare = (item) => {
  setCareInstructions((prev) =>
    prev.includes(item)
      ? prev.filter((c) => c !== item)
      : [...prev, item]
  );
};

const nextImage = () => {
  setActiveImageIndex((prev) =>
    prev === images.length - 1 ? 0 : prev + 1
  );
};

const prevImage = () => {
  setActiveImageIndex((prev) =>
    prev === 0 ? images.length - 1 : prev - 1
  );
};

const moveImage = (fromIndex, toIndex) => {
  if (toIndex < 0 || toIndex >= images.length) return;

  const updated = [...images];
  const temp = updated[fromIndex];

  updated[fromIndex] = updated[toIndex];
  updated[toIndex] = temp;

  setImages(updated);
};

const toggleGender = (value) => {
  setGender((prev) => {
    const isGirl = prev.includes("دخترانه");
    const isBoy = prev.includes("پسرانه");

    // اگر روی "دختر و پسر" کلیک شد
    if (value === "دختر و پسر") {
      // اگر هر دو فعال هستند → خاموش کن
      if (isGirl && isBoy) {
        return [];
      }

      // در غیر اینصورت → هر سه را فعال کن
      return ["دخترانه", "پسرانه", "دختر و پسر"];
    }

    // حالت دخترانه / پسرانه
    if (prev.includes(value)) {
      return prev.filter((g) => g !== value);
    }

    return [...prev, value];
  });
};




  return (
    <main className="min-h-screen bg-[#f8f1e7] p-4 text-right">

      <h1 className="text-xl font-black text-[#6f4a18] mb-4">
        {isEditMode ? "ویرایش محصول" : "افزودن محصول جدید"}
      </h1>

      {/* عنوان */}
      <div className="mb-4">
  <label className="mb-2 block text-sm font-bold text-[#6f4a18]">
    نام کالا
  </label>

  <input
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="نام کالا را وارد کنید"
    className="
      w-full rounded-2xl
      border border-yellow-200
      bg-white
      px-4 py-3
      shadow-sm
      transition
      focus:border-[#d4af37]
      focus:ring-4
      focus:ring-yellow-100
      outline-none
    "
  />
</div>

{/* برند فارسی */}
<div className="mb-4">
  <label className="mb-2 block text-sm font-bold text-[#6f4a18]">
    برند (فارسی)
  </label>

  <input
    value={brandFa}
    onChange={(e) => setBrandFa(e.target.value)}
    placeholder="برند کالا را به فارسی وارد کنید"
    className="w-full rounded-2xl border border-yellow-200 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-[#d4af37] focus:ring-4 focus:ring-yellow-100"
  />
</div>

{/* برند انگلیسی */}
<div className="mb-4">
  <label className="mb-2 block text-sm font-bold text-[#6f4a18]">
    برند (English)
  </label>

  <input
    value={brandEn}
    onChange={(e) => setBrandEn(e.target.value)}
    placeholder="برند کالا را به انگلیسی وارد کنید"
    className="w-full rounded-2xl border border-yellow-200 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-[#d4af37] focus:ring-4 focus:ring-yellow-100"
  />
</div>

{/* کشور سازنده */}
<label className="mb-3 mt-5 block text-sm font-bold text-[#6f4a18]">
  کشور سازنده کالا
</label>

<select
  value={madeInCountry}
  onChange={(e) => setMadeInCountry(e.target.value)}
  className="w-full rounded-2xl border border-yellow-200 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-[#d4af37] focus:ring-4 focus:ring-yellow-100"
>
  <option value="">کشور سازنده را انتخاب کنید</option>

  {countryOptions.map((country) => (
    <option key={country} value={country}>
      {country}
    </option>
  ))}
</select>

{/* جنس کالا */}
<div className="mb-4">
  <label className="mb-2 block text-sm font-bold text-[#6f4a18]">
    جنس کالا
  </label>

  <input
    value={material}
    onChange={(e) => setMaterial(e.target.value)}
    placeholder="جنس کالا را وارد کنید"
    className="w-full rounded-2xl border border-yellow-200 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-[#d4af37] focus:ring-4 focus:ring-yellow-100"
  />
</div>

      {/* قیمت */}
      <div className="mb-4">
  <label className="mb-2 block text-sm font-bold text-[#6f4a18]">
    قیمت
  </label>

  <div className="relative">
    <input
      value={price}
      onChange={handlePriceChange}
      inputMode="numeric"
      placeholder="قیمت کالا را وارد کنید"
      className="
        w-full rounded-2xl
        border border-yellow-200
        bg-white
        py-3 pr-4 pl-16
        shadow-sm
        transition
        outline-none
        focus:border-[#d4af37]
        focus:ring-4
        focus:ring-yellow-100
      "
    />

    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-stone-500">
      ریال
    </span>
  </div>
</div>

   
{/* دسته‌بندی */  /* گروه کالا */  /* عنوان کالا */}
<div className="mb-4">
  <label className="mb-2 block text-sm font-bold text-[#6f4a18]">
    اتصال کالا به دسته‌بندی‌ها
  </label>

  <div className="space-y-4">
    {categoryLinks.map((link, index) => {
      const selectedCategoryKey =
        shopCategories.find((cat) => cat.title === link.category)?.key || "";

      const categoryGroups =
        shopGroups.find((cat) => cat.categoryKey === selectedCategoryKey)
          ?.groups || [];

      const groupItems =
        shopItems.find((itemGroup) => itemGroup.groupKey === link.group)
          ?.items || [];

      return (
        <div
          key={index}
          className="rounded-2xl border border-yellow-200 bg-white p-4 shadow-sm"
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-black text-[#6f4a18]">
              دسته‌بندی شماره {index + 1}
            </p>

            {categoryLinks.length > 1 && (
              <button
                type="button"
                onClick={() => removeCategoryLink(index)}
                className="text-xs font-bold text-red-500"
              >
                حذف
              </button>
            )}
          </div>

          <select
            value={link.category}
            onChange={(e) =>
              updateCategoryLink(index, "category", e.target.value)
            }
            className="mb-3 w-full rounded-2xl border border-yellow-200 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-[#d4af37] focus:ring-4 focus:ring-yellow-100"
          >
            <option value="">دسته‌بندی کالا را انتخاب کنید</option>

            {shopCategories.map((cat) => (
              <option key={cat.key} value={cat.title}>
                {cat.title}
              </option>
            ))}
          </select>

          {link.category && (
            <select
              value={link.group}
              onChange={(e) =>
                updateCategoryLink(index, "group", e.target.value)
              }
              className="mb-3 w-full rounded-2xl border border-yellow-200 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-[#d4af37] focus:ring-4 focus:ring-yellow-100"
            >
              <option value="">گروه کالا را انتخاب کنید</option>

              {categoryGroups.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.title}
                </option>
              ))}
            </select>
          )}

          {link.group && (
            <select
              value={link.productItem}
              onChange={(e) =>
                updateCategoryLink(index, "productItem", e.target.value)
              }
              className="w-full rounded-2xl border border-yellow-200 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-[#d4af37] focus:ring-4 focus:ring-yellow-100"
            >
              <option value="">عنوان کالا را انتخاب کنید</option>

              {groupItems.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          )}
        </div>
      );
    })}
  </div>

  {categoryLinks.length < 3 && (
    <button
      type="button"
      onClick={addCategoryLink}
      className="mt-3 w-full rounded-2xl border border-yellow-300 bg-yellow-50 py-3 text-sm font-black text-[#7a5526]"
    >
      + افزودن دسته‌بندی دیگر
    </button>
  )}
</div>



{/* موجودی کالا */}
<div className="mb-4">
  <label className="mb-2 block text-sm font-bold text-[#6f4a18]">
    موجودی کالا
  </label>

  <div className="space-y-4">
    {inventoryRows.map((row, index) => (
      <div
        key={index}
        className="rounded-2xl border border-yellow-200 bg-white p-4 shadow-sm"
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-black text-[#6f4a18]">
            ردیف {index + 1}
          </p>

          {inventoryRows.length > 1 && (
            <button
              type="button"
              onClick={() => removeInventoryRow(index)}
              className="text-xs font-bold text-red-500"
            >
              حذف
            </button>
          )}
        </div>

        <input
          value={row.size}
          onChange={(e) =>
            updateInventoryRow(index, "size", e.target.value)
          }
          placeholder="سایز کالا؛ مثلا ۱ تا ۲ سال"
          className="mb-3 w-full rounded-2xl border border-yellow-200 bg-white px-4 py-3 shadow-sm outline-none focus:border-[#d4af37] focus:ring-4 focus:ring-yellow-100"
        />

        <select
          value={row.colorName}
          onChange={(e) => {
            const selected = productColors.find(
              (color) => color.name === e.target.value
            );

            updateInventoryRow(index, "colorName", selected?.name || "");
            updateInventoryRow(index, "colorHex", selected?.hex || "");
          }}
          className="mb-3 w-full rounded-2xl border border-yellow-200 bg-white px-4 py-3 shadow-sm outline-none focus:border-[#d4af37] focus:ring-4 focus:ring-yellow-100"
        >
          <option value="">رنگ کالا را انتخاب کنید</option>

          {productColors.map((color) => (
            <option key={color.name} value={color.name}>
              {color.name}
            </option>
          ))}
        </select>

        {row.colorHex && (
          <div className="mb-3 flex items-center gap-2 text-xs font-bold text-stone-500">
            <span
              className="h-5 w-5 rounded-full border border-stone-300"
              style={{ backgroundColor: row.colorHex }}
            />
            {row.colorName}
          </div>
        )}

        <input
          value={row.quantity}
          onChange={(e) =>
            updateInventoryRow(index, "quantity", e.target.value)
          }
          placeholder="میزان موجودی"
          className="mb-3 w-full rounded-2xl border border-yellow-200 bg-white px-4 py-3 shadow-sm outline-none focus:border-[#d4af37] focus:ring-4 focus:ring-yellow-100"
        />

        <select
          value={row.unit}
          onChange={(e) =>
            updateInventoryRow(index, "unit", e.target.value)
          }
          className="w-full rounded-2xl border border-yellow-200 bg-white px-4 py-3 shadow-sm outline-none focus:border-[#d4af37] focus:ring-4 focus:ring-yellow-100"
        >
          <option value="">واحد شمارش را انتخاب کنید</option>
          <option value="عدد">عدد</option>
          <option value="جفت">جفت</option>
          <option value="بسته">بسته</option>
          <option value="ست">ست</option>
        </select>
      </div>
    ))}
  </div>

  <button
    type="button"
    onClick={addInventoryRow}
    className="mt-3 w-full rounded-2xl border border-yellow-300 bg-yellow-50 py-3 text-sm font-black text-[#7a5526]"
  >
    + افزودن ردیف موجودی
  </button>
</div>


{/* مشخصات تکمیلی کالا */}
<div className="mb-5 rounded-3xl border border-yellow-200 bg-white p-5 shadow-sm">

  <h2 className="mb-5 text-lg font-black text-[#6f4a18]">
    مشخصات تکمیلی کالا
  </h2>

  <div className="mb-5 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-[#6f4a18] leading-6">
  <p className="font-black mb-2">راهنمای تکمیل مشخصات کالا</p>

  <p>
    هرچقدر اطلاعات این بخش را دقیق‌تر وارد کنید، کالا راحت‌تر در جستجوی ژنینو پیدا می‌شود
    و شانس فروش شما افزایش پیدا می‌کند.
  </p>

  <p className="mt-2">
    این اطلاعات برای فیلترهای هوشمند، پیشنهاد به کاربران و نمایش بهتر کالا استفاده می‌شود.
  </p>

</div>

  {/* جنسیت */}
  <label className="mb-3 block text-sm font-bold text-[#6f4a18]">
    مناسب برای چه جنسیتی؟
  </label>

  <div className="mb-5 flex flex-wrap gap-3">

    {[
      "دخترانه",
      "پسرانه",
      "دختر و پسر",
    ].map((item) => (

      <button
        key={item}
        type="button"
        onClick={() => toggleGender(item)}
        className={`rounded-xl px-5 py-2 font-bold transition

        ${
          gender.includes(item)
            ? "bg-[#d4af37] text-white"
            : "border border-yellow-200 bg-white text-[#6f4a18]"
        }`}
      >
        {item}
      </button>

    ))}

  </div>

  {/* فصل */}
  <label className="mb-3 block text-sm font-bold text-[#6f4a18]">
    مناسب برای چه فصلی؟
  </label>

  <div className="flex flex-wrap gap-3">

    {seasonOptions.map((season) => (

      <button
        key={season}
        type="button"
        onClick={() => toggleSeason(season)}
        className={`rounded-xl px-4 py-2 font-bold transition

        ${
          seasons.includes(season)
            ? "bg-[#d4af37] text-white"
            : "border border-yellow-200 bg-white text-[#6f4a18]"
        }`}
      >
        {season}
      </button>

    ))}

  </div>

{/* بازه سنی */}
  <label className="mb-3 mt-5 block text-sm font-bold text-[#6f4a18]">
  مناسب برای چه بازه سنی؟
</label>

<div className="flex flex-wrap gap-3">
  {ageRangeOptions.map((item) => (
    <button
      key={item}
      type="button"
      onClick={() => toggleAgeRange(item)}
      className={`rounded-xl px-4 py-2 font-bold transition ${
        ageRanges.includes(item)
          ? "bg-[#d4af37] text-white"
          : "border border-yellow-200 bg-white text-[#6f4a18]"
      }`}
    >
      {item}
    </button>
  ))}
</div>



{/* مشخصات فیزیکی کالا */}
<div className="mt-5 rounded-3xl border border-yellow-200 bg-white p-5 shadow-sm">
  <h2 className="mb-5 text-lg font-black text-[#6f4a18]">
    مشخصات فیزیکی کالا
  </h2>

  <div className="grid grid-cols-4 gap-2">
    {[
      { label: "وزن", unit: "کیلوگرم", value: weight, setValue: setWeight },
      { label: "طول", unit: "سانتی‌متر", value: length, setValue: setLength },
      { label: "عرض", unit: "سانتی‌متر", value: width, setValue: setWidth },
      { label: "ارتفاع", unit: "سانتی‌متر", value: height, setValue: setHeight },
    ].map((item) => (
      <div key={item.label}>
        <label className="mb-2 block text-xs font-bold text-[#6f4a18]">
          {item.label}
        </label>

        <input
          value={item.value}
          onChange={(e) => item.setValue(e.target.value.replace(/\D/g, ""))}
          placeholder={item.unit}
          className="w-full rounded-xl border border-yellow-200 bg-white px-2 py-3 text-center text-sm shadow-sm outline-none focus:border-[#d4af37] focus:ring-4 focus:ring-yellow-100"
        />
      </div>
    ))}
  </div>
  <div className="mt-4">
  <label className="mb-2 block text-sm font-bold text-[#6f4a18]">
    اطلاعات تکمیلی مشخصات فیزیکی
  </label>

  <textarea
    value={physicalDetailsNote}
    onChange={(e) => setPhysicalDetailsNote(e.target.value)}
    placeholder="مثلاً: بدنه از چوب راش ساخته شده، قابلیت تاشو دارد، تحمل وزن تا ۵۰ کیلوگرم، دارای ضربه‌گیر سیلیکونی..."
    rows={4}
    className="
      w-full resize-none rounded-2xl
      border border-yellow-200 bg-white
      px-4 py-3 text-sm
      shadow-sm outline-none
      transition
      focus:border-[#d4af37]
      focus:ring-4 focus:ring-yellow-100
    "
  />
</div>
</div>

{/* گارانتی */}
<div className="mt-5">
  <label className="mb-3 block text-sm font-bold text-[#6f4a18]">
    گارانتی کالا
  </label>

  <div className="flex gap-3 mb-3">
    {["دارد", "ندارد"].map((item) => (
      <button
        key={item}
        type="button"
        onClick={() => setHasWarranty(item)}
        className={`rounded-xl px-5 py-2 font-bold transition ${
          hasWarranty === item
            ? "bg-[#d4af37] text-white"
            : "border border-yellow-200 bg-white text-[#6f4a18]"
        }`}
      >
        {item}
      </button>
    ))}
  </div>

  {hasWarranty === "دارد" && (
    <div className="flex gap-2">
      <input
        value={warrantyPeriod}
        onChange={(e) =>
          setWarrantyPeriod(e.target.value.replace(/\D/g, ""))
        }
        placeholder="مدت"
        className="w-1/2 rounded-xl border border-yellow-200 bg-white px-3 py-2 text-center"
      />

      <select
        value={warrantyUnit}
        onChange={(e) => setWarrantyUnit(e.target.value)}
        className="w-1/2 rounded-xl border border-yellow-200 bg-white px-3 py-2"
      >
        <option value="ماه">ماه</option>
        <option value="سال">سال</option>
      </select>
    </div>
  )}
</div>

{/* استانداردها */}
<div className="mt-5">
  <label className="mb-3 block text-sm font-bold text-[#6f4a18]">
    استانداردها و مجوزهای کالا
  </label>

  <div className="flex flex-wrap gap-3">
    {standardOptions.map((item) => (
      <button
        key={item}
        type="button"
        onClick={() => toggleStandard(item)}
        className={`rounded-xl px-4 py-2 font-bold transition ${
          standards.includes(item)
            ? "bg-[#d4af37] text-white"
            : "border border-yellow-200 bg-white text-[#6f4a18]"
        }`}
      >
        {item}
      </button>
    ))}
  </div>
</div>

{/* شرایط و نگهداری */}
<div className="mt-5">
  <label className="mb-3 block text-sm font-bold text-[#6f4a18]">
    شرایط و روش نگهداری کالا
  </label>

  <div className="flex flex-wrap gap-3">
    {careOptions.map((item) => (
      <button
        key={item}
        type="button"
        onClick={() => toggleCare(item)}
        className={`rounded-xl px-4 py-2 font-bold transition ${
          careInstructions.includes(item)
            ? "bg-[#d4af37] text-white"
            : "border border-yellow-200 bg-white text-[#6f4a18]"
        }`}
      >
        {item}
      </button>
    ))}
  </div>

  {/* توضیح آزاد */}
  <textarea
    value={careNote}
    onChange={(e) => setCareNote(e.target.value)}
    placeholder="توضیحات تکمیلی نگهداری (اختیاری)"
    className="
      mt-4 w-full rounded-2xl
      border border-yellow-200 bg-white
      px-4 py-3 shadow-sm
      outline-none focus:border-[#d4af37]
      focus:ring-4 focus:ring-yellow-100
      resize-none
    "
    rows={3}
  />
</div>

</div>

      

      {/* توضیحات کالا */}
<div className="mb-4">
  <label className="mb-2 block text-sm font-bold text-[#6f4a18]">
    توضیحات کالا
  </label>

  <textarea
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    placeholder="توضیحات کامل کالا را وارد کنید"
    rows={5}
    className="
      w-full rounded-2xl
      border border-yellow-200
      bg-white
      px-4 py-3
      shadow-sm
      transition
      focus:border-[#d4af37]
      focus:ring-4
      focus:ring-yellow-100
      outline-none
      resize-none
    "
  />
</div>

      {/* آپلود تصاویر حرفه‌ای */}
<div className="mb-5">
  <label className="mb-2 block text-sm font-bold text-[#6f4a18]">
    تصاویر کالا
  </label>

  <div className="rounded-3xl border-2 border-dashed border-yellow-300 bg-white p-4">

    {/* input */}
    <input
      type="file"
      multiple
      accept="image/*"
      onChange={handleImageChange}
      className="mb-4 w-full text-sm"
    />

    <p className="mb-3 text-xs text-stone-500">
      تصاویر را انتخاب کنید یا Drag & Drop انجام دهید (حداکثر ۱۰ تصویر)
    </p>

    {/* preview grid */}
    {images.length > 0 && (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {images.map((img, i) => (
          <div
            key={i}
            className={`relative rounded-2xl overflow-hidden border shadow-sm cursor-pointer
              ${mainImageIndex === i ? "ring-4 ring-[#d4af37]" : ""}
            `}
            onClick={() => {
              setActiveImageIndex(i);
              setOpenGallery(true);
            }}
          >
            <img
              src={typeof img === "string" ? img : URL.createObjectURL(img)}
              className="h-28 w-full object-cover"
            />

            {/* دکمه‌های جابجایی */}
<div className="absolute bottom-1 left-1 right-1 flex justify-between px-1">

  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      moveImage(i, i - 1);
    }}
    className="bg-black/60 text-white text-[10px] px-2 rounded"
  >
    ↑
  </button>

  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      moveImage(i, i + 1);
    }}
    className="bg-black/60 text-white text-[10px] px-2 rounded"
  >
    ↓
  </button>

</div>

            {/* حذف */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeImage(i);
                if (mainImageIndex === i) setMainImageIndex(0);
              }}
              className="absolute top-1 left-1 bg-red-500 text-white text-xs px-2 rounded"
            >
              ×
            </button>

            {/* اصلی */}
            {mainImageIndex === i && (
              <div className="absolute bottom-0 w-full bg-black/60 text-white text-[10px] text-center py-1">
                تصویر اصلی
              </div>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
</div>

{/* LIGHTBOX GALLERY */}
{openGallery && images.length > 0 && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">

    {/* Close */}
    <button
      onClick={() => setOpenGallery(false)}
      className="absolute top-5 left-5 text-white text-2xl"
    >
      ✕
    </button>

    {/* Prev */}
    <button
      onClick={prevImage}
      className="absolute left-5 text-white text-4xl font-black"
    >
      ›
    </button>

    {/* Image */}
    <img
  src={
    typeof images[activeImageIndex] === "string"
      ? images[activeImageIndex]
      : URL.createObjectURL(images[activeImageIndex])
  }
  className="max-h-[80vh] max-w-[90vw] rounded-2xl shadow-2xl"
/>

    {/* Next */}
    <button
      onClick={nextImage}
      className="absolute right-5 text-white text-4xl font-black"
    >
      ‹
    </button>

    {/* counter */}
    <div className="absolute bottom-5 text-white text-sm">
      {activeImageIndex + 1} / {images.length}
    </div>

  </div>
)}


   {showSuccessModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm">
    <div className="w-full max-w-sm rounded-[2rem] border border-yellow-200 bg-white p-6 text-center shadow-2xl">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-3xl">
        ✅
      </div>

      <h2 className="text-lg font-black text-[#6f4a18]">
        {isEditMode ? "تغییرات محصول ذخیره شد" : "محصول با موفقیت ثبت شد"}  
      </h2>

      <p className="mt-2 text-sm leading-6 text-gray-500">
       {isEditMode
  ? "تغییرات محصول با موفقیت ذخیره شد و تا چند لحظه دیگر به فروشگاه منتقل می‌شوید."
  : "محصول شما در فروشگاه ثبت شد و تا چند لحظه دیگر به صفحه فروشگاه منتقل می‌شوید."}
      </p>

      <div className="mx-auto mt-5 h-1.5 w-32 overflow-hidden rounded-full bg-yellow-100">
        <div className="h-full w-full animate-pulse rounded-full bg-[#d4af37]" />
      </div>
    </div>
  </div>
)}   

      {/* دکمه ثبت */}
      <button
  onClick={handleSubmit}
  disabled={isSubmitting}
  className={`
    flex w-full items-center justify-center gap-2
    rounded-xl py-3 font-bold text-white
    bg-gradient-to-r from-[#7a5526] via-[#b88724] to-[#d4af37]
    shadow-lg transition
    ${isSubmitting ? "cursor-not-allowed opacity-80" : "hover:scale-[1.01]"}
  `}
>
  {isSubmitting && (
    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
  )}

  {isSubmitting
  ? isEditMode
    ? "در حال ذخیره تغییرات..."
    : "در حال ثبت محصول..."
  : isEditMode
    ? "ذخیره تغییرات"
    : "ثبت محصول"}
</button>

    </main>
  );
}