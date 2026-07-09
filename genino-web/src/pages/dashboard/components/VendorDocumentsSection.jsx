// ============================================================================
// File: src/pages/dashboard/components/VendorDocumentsSection.jsx
// Description: بخش بارگذاری، مشاهده و حذف مدارک فروشنده در داشبورد ژنینو
// ============================================================================

import { vendorDocumentLabels } from "../../../constants/vendorDocumentLabels";

function VendorDocumentCard({
  title,
  type,
  accept,
  document,
  uploadingDocument,
  isDocumentsLocked,
  canEditDocument,
  handleVendorDocumentUpload,
  handleDeleteDocument,
}) {
  const isLocked = isDocumentsLocked && !canEditDocument(type);

  return (
    <div className="rounded-2xl border border-yellow-200 bg-white p-4">
      <p className="font-black text-[#6f4a18]">
  {vendorDocumentLabels[type] || title || type}
</p>

      <input
        type="file"
        accept={accept}
        disabled={uploadingDocument || isLocked}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          handleVendorDocumentUpload(type, file);
        }}
        className="mt-3 block w-full text-sm"
      />

      {document && (
        <div className="mt-3 rounded-xl border border-green-200 bg-green-50 p-3">
          <p className="text-sm font-black text-green-700">
            ✅ {vendorDocumentLabels[type] || title || type} بارگذاری شده است
          </p>

          <div className="mt-2 flex items-center gap-4">
            <a
              href={document.url}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-[#6f4a18] underline"
            >
              مشاهده مدرک
            </a>

            <button
              type="button"
              disabled={isLocked}
              onClick={() => handleDeleteDocument(document)}
              className={`text-xs font-black ${
                isLocked
                  ? "cursor-not-allowed text-stone-400"
                  : "text-red-600"
              }`}
            >
              حذف مدرک
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VendorDocumentsSection({
  vendor,
  vendorDocuments,
  setVendorDocuments,
  uploadingDocument,
  isDocumentsLocked,
  needsVendorCorrection,
  documentsCompleted,
  canEditDocument,
  handleVendorDocumentUpload,
  deleteVendorDocument,
  setDocumentsStep,
}) {
  const requiredDocuments = [
  {
    type: "NATIONAL_CARD",
    accept: ".jpg,.jpeg,.png,.webp,.pdf",
  },
  {
    type: "SELFIE_WITH_NATIONAL_CARD",
    accept: ".jpg,.jpeg,.png,.webp",
  },
  ...(vendor?.personType === "legal"
    ? [
        {
          type: "COMPANY_OFFICIAL_NEWSPAPER",
          accept: ".jpg,.jpeg,.png,.webp,.pdf",
        },
        {
          type: "COMPANY_REGISTRATION",
          accept: ".jpg,.jpeg,.png,.webp,.pdf",
        },
      ]
    : []),
];

  const findDocumentByType = (type) =>
    vendorDocuments.find((doc) => doc.type === type);

  const handleDeleteDocument = async (document) => {
    const confirmed = window.confirm("آیا از حذف این مدرک مطمئن هستید؟");

    if (!confirmed) return;

    const res = await deleteVendorDocument(vendor.id, document.id);

    if (!res?.ok) {
      alert(res?.message || "خطا در حذف مدرک");
      return;
    }

    setVendorDocuments((prev) =>
      prev.filter((doc) => doc.id !== document.id)
    );

    alert("مدرک با موفقیت حذف شد.");
  };

  return (
    <div>
      <h3 className="text-lg font-black text-[#6f4a18]">
        بارگذاری مدارک
      </h3>

      <p className="mt-2 text-sm leading-7 text-stone-600">
        مدارک هویتی و کسب‌وکار خود را بارگذاری کنید.
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {requiredDocuments.map((item) => (
          <VendorDocumentCard
            key={item.type}
            title={item.title}
            type={item.type}
            accept={item.accept}
            document={findDocumentByType(item.type)}
            uploadingDocument={uploadingDocument}
            isDocumentsLocked={isDocumentsLocked}
            canEditDocument={canEditDocument}
            handleVendorDocumentUpload={handleVendorDocumentUpload}
            handleDeleteDocument={handleDeleteDocument}
          />
        ))}
      </div>

      <button
        type="button"
        disabled={isDocumentsLocked && !needsVendorCorrection}
        onClick={() => {
          if (isDocumentsLocked && !needsVendorCorrection) return;

          if (!documentsCompleted) {
            alert("لطفاً ابتدا تمام مدارک الزامی را بارگذاری کنید.");
            return;
          }

          setDocumentsStep(3);
        }}
        className={`mt-6 h-12 w-full rounded-2xl text-sm font-black ${
          isDocumentsLocked
            ? "cursor-not-allowed bg-stone-200 text-stone-400"
            : "bg-gradient-to-r from-[#7a5526] via-[#b88724] to-[#d4af37] text-white"
        }`}
      >
        {isDocumentsLocked
          ? "مدارک با موفقیت ثبت شده‌اند"
          : "ذخیره مدارک و ادامه به قرارداد"}
      </button>
    </div>
  );
}