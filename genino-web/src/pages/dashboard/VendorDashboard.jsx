import { motion } from "framer-motion";
import {
  Store,
  Package,
  FileText,
  Wallet,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Eye,
  CreditCard,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  getVendorById,
  getVendorPackages,
  validateDiscountCode,
  validateAmbassadorCode,
  useDiscountCode,
  getFinanceSettings,
  confirmVendorPackage,
  updateVendorBankingInfo,
  presignVendorDocumentUpload,
  addVendorDocument,
  listVendorDocuments,
  deleteVendorDocument,
  putFileToPresignedUrl,
  acceptVendorContract,
} from "../../services/api";
import { prepareImage } from "../../utils/image/prepareImage";
import { VENDOR_REVIEW_STATUS } from "../../utils/vendorReviewStatus";
import VendorReviewBanner from "./components/VendorReviewBanner";
import VendorStatusStepper from "./components/VendorStatusStepper";
import VendorDashboardMessage from "./components/VendorDashboardMessage";
import VendorPackageSection from "./components/VendorPackageSection";
import VendorSelectedPackageSummary from "./components/VendorSelectedPackageSummary";
import VendorDocumentsHeader from "./components/VendorDocumentsHeader";
import VendorFinalContractModal from "./components/VendorFinalContractModal";
import VendorDocumentsStepper from "./components/VendorDocumentsStepper";
import VendorBankSection from "./components/VendorBankSection";
import VendorDocumentsSection from "./components/VendorDocumentsSection";
import { vendorContractItems } from "../../constants/vendorContractItems";
import VendorContractSection from "./components/VendorContractSection";
import { useNavigate } from "react-router-dom";




const statusCards = [
  { title: "وضعیت فروشگاه", value: "در انتظار فعال‌سازی", icon: Store },
  { title: "مدارک و قرارداد", value: "تکمیل نشده", icon: FileText },
  { title: "محصولات / خدمات", value: "۰ مورد", icon: Package },
  { title: "مالی و تسویه", value: "۰ ریال", icon: Wallet },
];



const quickActions = [
  {
    title: "انتخاب بسته همکاری",
    desc: "اولین قدم برای فعال شدن فروشگاه شما",
    icon: CreditCard,
    primary: true,
  },
  {
    title: "تکمیل مدارک و قرارداد",
    desc: "بعد از انتخاب بسته انجام می‌شود",
    icon: FileText,
  },
  {
    title: "مدیریت محصولات و خدمات",
    desc: "پس از تأیید نهایی فعال خواهد شد",
    icon: Package,
  },
  {
    title: "مشاهده صفحه فروشگاه",
    desc: "پیش‌نمایش صفحه اختصاصی شما",
    icon: Eye,
  },
];

export default function VendorDashboard() {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [vendorPackages, setVendorPackages] = useState([]);
  const [showPackages, setShowPackages] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [hasAmbassador, setHasAmbassador] = useState(null);
  const [ambassadorCode, setAmbassadorCode] = useState("");
  const [ambassadorInfo, setAmbassadorInfo] = useState(null);
  const [ambassadorConfirmed, setAmbassadorConfirmed] = useState(false);
  const [hasDiscountCode, setHasDiscountCode] = useState(null);
  const [discountCode, setDiscountCode] = useState("");
  const [discountInfo, setDiscountInfo] = useState(null);
  const [finalPrice, setFinalPrice] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [packageConfirmed, setPackageConfirmed] = useState(false);
  const [financeSettings, setFinanceSettings] = useState(null);
  const [showDocumentsStep, setShowDocumentsStep] = useState(false);
  const [documentsStep, setDocumentsStep] = useState(1);

  const [bankForm, setBankForm] = useState({
    bankName: "",
    accountNumber: "",
    cardNumber: "",
    shebaNumber: "",
  });

  const [bankInfoConfirmed, setBankInfoConfirmed] = useState(false);

  const [vendorDocuments, setVendorDocuments] = useState([]);
  const [documentUploads, setDocumentUploads] = useState({});
  const [uploadingDocument, setUploadingDocument] = useState(false);

  const [contractChecks, setContractChecks] = useState({});
  const [contractAccepted, setContractAccepted] = useState(false);

  const [showFinalContractConfirm, setShowFinalContractConfirm] =
  useState(false);


  
  useEffect(() => {
  const loadVendor = async () => {
    const params = new URLSearchParams(window.location.search);
const vendorId =
  localStorage.getItem("genino_vendor_id") || params.get("vendorId");

if (!vendorId) return;

localStorage.setItem("genino_vendor_id", String(vendorId));

    const res = await getVendorById(vendorId);

    if (res?.ok) {
  setVendor(res.vendor);
  setBankForm({
  bankName: res.vendor.bankName || "",
  accountNumber: res.vendor.accountNumber || "",
  cardNumber: res.vendor.cardNumber || "",
  shebaNumber: (res.vendor.shebaNumber || "").replace(/^IR/i, ""),
});

setBankInfoConfirmed(!!res.vendor.bankInfoConfirmed);
  
  if (
  res.vendor.contractAccepted ||
  res.vendor.accountStatus === "CONTRACT_AND_DOCUMENTS_SUBMITTED"
) {
  setContractAccepted(true);

  setContractChecks({
  identity: true,
  banking: true,
  products: true,
  content: true,
  rules: true,
  commission: true,
  settlement: true,
  shipping: true,
  taxes: true,
  restrictedProducts: true,
  pricingChanges: true,
  complaints: true,
  termination: true,
  brandProtection: true,
  ambassador: true,
  activation: true,
  suspension: true,
  final: true,
});
}

  const docsRes = await listVendorDocuments(vendorId);

if (docsRes?.ok) {
  setVendorDocuments(docsRes.items || []);
}

  const isPackageSelected =
    res.vendor.packageStatus === "SELECTED" ||
    res.vendor.paymentStatus === "PAID" ||
    res.vendor.accountStatus === "PAID" ||
    res.vendor.accountStatus === "PACKAGE_SELECTED";

  setPackageConfirmed(isPackageSelected);
  if (res.vendor.selectedPackageId) {
  setFinalPrice(
    res.vendor.selectedPackageFinalPrice
  );
}
}
  };

  const loadPackages = async () => {
  const res = await getVendorPackages();

  console.log("VENDOR PACKAGES RESPONSE:", res);

  if (res?.ok) {
    setVendorPackages(res.packages || []);
  }
};

const loadFinanceSettings = async () => {
  const res = await getFinanceSettings();

  if (res?.ok) {
    setFinanceSettings(res.settings);
  }
};

  loadVendor();
  loadPackages();
  loadFinanceSettings();
}, []);

useEffect(() => {
  if (!vendor?.selectedPackageId || vendorPackages.length === 0) return;

  const fullPackage = vendorPackages.find(
    (pkg) => pkg.id === vendor.selectedPackageId
  );

  console.log("SELECTED PACKAGE FROM DB:", vendor.selectedPackageId);
console.log("ALL PACKAGES:", vendorPackages);
console.log("FULL PACKAGE FOUND:", fullPackage);

  if (!fullPackage) return;

  setSelectedPackage({
    ...fullPackage,
    title: vendor.selectedPackageTitle || fullPackage.title,
    price: vendor.selectedPackagePrice ?? fullPackage.price,
  });

  setFinalPrice(vendor.selectedPackageFinalPrice);
  if (vendor.selectedAmbassadorCode) {
  setAmbassadorConfirmed(true);

  setAmbassadorInfo({
    name: vendor.selectedAmbassadorName,
    phone: vendor.selectedAmbassadorPhone,
  });

  setAmbassadorCode(
    vendor.selectedAmbassadorCode
  );
}

if (vendor.selectedDiscountCode) {
  setDiscountInfo({
    code: vendor.selectedDiscountCode,
    percent:
      vendor.selectedDiscountPercent,
  });
}
}, [vendor, vendorPackages]);


const welcomeText = vendor
  ? vendor.personType === "legal"
    ? `${vendor.managerName || "نماینده محترم"} نماینده ${vendor.legalCompanyName || vendor.businessName} خوش آمدید`
    : `${vendor.firstName || ""} ${vendor.lastName || ""} عزیز، خوش آمدید`
  : "به داشبورد ارائه‌دهندگان ژنینو خوش آمدید";

const getVendorPageTitle = () => {
  if (!vendor) {
    return "ورود به صفحه من";
  }
  // فروش کالا
  if (vendor.activityType === "product") {
    return "ورود به فروشگاه من";
  }
  // خدمات
  if (vendor.activityType === "service") {
    switch (vendor.mainActivityField) {
      case "مدارس":
        return "ورود به صفحه مدرسه من";
      case "مهدکودک‌ها":
        return "ورود به صفحه مهدکودک من";
      case "خانه‌های بازی":
        return "ورود به صفحه خانه بازی من";
      case "کلاس‌های آموزشی":
        return "ورود به صفحه کلاس آموزشی من";
      case "کلاس‌های هنری":
        return "ورود به صفحه کلاس هنری من";
      case "کلاس‌های ورزشی":
        return "ورود به صفحه کلاس ورزشی من";
      case "معلمان خصوصی":
        return "ورود به صفحه معلم خصوصی من";
      default:
        return "ورود به صفحه خدمات من";
    }
  }
  // کالا و خدمات
  if (vendor.activityType === "both") {
    return "ورود به صفحه اختصاصی من";
  }
  return "ورود به صفحه من";
};


const getVendorPagePath = () => {
  if (!vendor?.id) return "/";
  if (vendor.activityType === "product") {
    return `/vendor/shop/${vendor.id}`;
  }
  if (vendor.activityType === "service") {
    switch (vendor.mainActivityField) {
      case "مدارس":
        return `/vendor/service/school/${vendor.id}`;
      case "مهدکودک‌ها":
        return `/vendor/service/kindergarten/${vendor.id}`;
      case "خانه‌های بازی":
        return `/vendor/service/playhouse/${vendor.id}`;
      case "کلاس‌های آموزشی":
        return `/vendor/service/education-class/${vendor.id}`;
      case "کلاس‌های هنری":
        return `/vendor/service/art-class/${vendor.id}`;
      case "کلاس‌های ورزشی":
        return `/vendor/service/sport-class/${vendor.id}`;
      case "معلمان خصوصی":
        return `/vendor/service/private-teacher/${vendor.id}`;
      default:
        return `/vendor/service/${vendor.id}`;
    }
  }
  if (vendor.activityType === "both") {
    return `/vendor/shop/${vendor.id}`;
  }
  return "/";
};


 
const vendorPackageTargetType =
  vendor?.activityType === "product"
    ? "SHOP"
    : vendor?.activityType === "service"
    ? "SERVICE"
    : vendor?.activityType === "both"
    ? "BOTH"
    : null;


// =========================================================
// تبدیل زمینه فعالیت Vendor به code ثابت دسته خدمت
// =========================================================

const SERVICE_CATEGORY_CODE_MAP = {
  "مدارس": "SCHOOL",
  "مهدکودک‌ها": "KINDERGARTEN",
  "خانه‌های بازی": "PLAYHOUSE",
  "کلاس‌های آموزشی": "EDUCATION_CLASS",
  "کلاس‌های هنری": "ART_CLASS",
  "کلاس‌های ورزشی": "SPORT_CLASS",
  "معلمان خصوصی": "PRIVATE_TEACHER",
};


const vendorServiceCategoryCode =
  SERVICE_CATEGORY_CODE_MAP[
    vendor?.mainActivityField
  ] || null;

  console.log(
  "===== VENDOR PACKAGE DEBUG ====="
);

console.log(
  "VENDOR ID:",
  vendor?.id
);

console.log(
  "VENDOR mainActivityField:",
  vendor?.mainActivityField
);

console.log(
  "EXPECTED CATEGORY CODE:",
  vendorServiceCategoryCode
);

console.log(
  "ALL SERVICE PACKAGES:",
  vendorPackages
    .filter(
      (pkg) =>
        pkg.targetType === "SERVICE"
    )
    .map((pkg) => ({
      id: pkg.id,
      title: pkg.title,
      categoryId:
        pkg.serviceCategoryId,
      categoryTitle:
        pkg.serviceCategory?.title,
      categoryCode:
        pkg.serviceCategory?.code,
    }))
);


// =========================================================
// بسته‌های قابل نمایش برای Vendor
// =========================================================

const filteredVendorPackages =
  vendorPackageTargetType
    ? vendorPackages.filter(
        (pkg) => {

          if (!pkg.isActive) {
            return false;
          }


          // -----------------------------
          // فروشنده کالا
          // -----------------------------

          if (
            vendorPackageTargetType ===
            "SHOP"
          ) {

            return (
              pkg.targetType ===
                "SHOP" ||
              pkg.targetType ===
                "BOTH"
            );
          }


          // -----------------------------
          // ارائه‌دهنده خدمات
          // -----------------------------

          if (
            vendorPackageTargetType ===
            "SERVICE"
          ) {

            if (
              pkg.targetType !==
              "SERVICE"
            ) {
              return false;
            }


            // روش اصلی:
            // مقایسه code پایدار دسته
            if (
              vendorServiceCategoryCode &&
              pkg.serviceCategory?.code
            ) {

              return (
                pkg.serviceCategory.code ===
                vendorServiceCategoryCode
              );
            }


            // fallback برای داده‌های قدیمی
            return (
              pkg.serviceCategory?.title ===
              vendor.mainActivityField
            );
          }


          // -----------------------------
          // کالا + خدمات
          // -----------------------------

          return (
            pkg.targetType === "BOTH"
          );
        }
      )
    : [];
  
const ambassadorDiscountAmount =
  financeSettings?.ambassadorVendorDiscountAmount || 0;

  const packagePrice = selectedPackage?.price || 0;

const ambassadorDiscount = ambassadorConfirmed
  ? ambassadorDiscountAmount
  : 0;

const remainingAfterAmbassador = Math.max(
  packagePrice - ambassadorDiscount,
  0
);

const discountAmount =
  discountInfo && finalPrice !== null
    ? remainingAfterAmbassador - finalPrice
    : 0;

const nationalCardDocument = vendorDocuments.find(
  (doc) => doc.type === "NATIONAL_CARD"
);

const selfieWithNationalCardDocument = vendorDocuments.find(
  (doc) => doc.type === "SELFIE_WITH_NATIONAL_CARD"
);

const companyOfficialNewspaperDocument =
  vendorDocuments.find(
    (doc) =>
      doc.type === "COMPANY_OFFICIAL_NEWSPAPER"
  );

const companyRegistrationDocument =
  vendorDocuments.find(
    (doc) =>
      doc.type === "COMPANY_REGISTRATION"
  );

const documentsCompleted =
  vendor?.personType === "legal"
    ? !!(
        nationalCardDocument &&
        selfieWithNationalCardDocument &&
        companyOfficialNewspaperDocument &&
        companyRegistrationDocument
      )
    : !!(
        nationalCardDocument &&
        selfieWithNationalCardDocument
      );

const documentsAndContractSubmitted =
  !!vendor?.contractAccepted ||
  vendor?.accountStatus === "CONTRACT_AND_DOCUMENTS_SUBMITTED" ||
  vendor?.documentsStatus === "SUBMITTED";

const vendorReviewStatus =
  vendor?.reviewStatus || vendor?.accountStatus;

const isVendorApproved =
  vendor?.reviewStatus ===
    VENDOR_REVIEW_STATUS.APPROVED ||
  vendor?.accountStatus === "APPROVED" ||
  vendor?.accountStatus === "ACTIVE";

const isVendorRejected =
  vendor?.reviewStatus ===
    VENDOR_REVIEW_STATUS.REJECTED ||
  vendor?.accountStatus === "REJECTED";

const needsVendorCorrection =
  vendor?.reviewStatus ===
    VENDOR_REVIEW_STATUS.NEEDS_CORRECTION ||
  vendor?.accountStatus === "NEEDS_CORRECTION";

const isVendorUnderReview =
  vendor?.reviewStatus ===
    VENDOR_REVIEW_STATUS.UNDER_REVIEW ||
  vendor?.accountStatus === "UNDER_REVIEW" ||
  vendor?.accountStatus ===
    "CONTRACT_AND_DOCUMENTS_SUBMITTED";

const vendorReviewReason =
  vendor?.correctionReason ||
  vendor?.rejectionReason ||
  vendor?.adminNote ||
  "";

const isDocumentsLocked = documentsAndContractSubmitted;

const correctionFields = vendor?.correctionFields || [];

const canEditBankInfo =
  needsVendorCorrection &&
  correctionFields.includes("BANK_INFO");

const canEditDocument = (type) =>
  needsVendorCorrection &&
  correctionFields.includes(type);

const steps = [
  { title: "ثبت‌نام اولیه", done: true },
  { title: "انتخاب بسته همکاری", done: packageConfirmed },
  {
    title: "تکمیل مدارک و قرارداد",
    done: contractAccepted,
    active: packageConfirmed,
  },
  { title: "اجازه انتشار", done: isVendorApproved },
];

  

const allContractsAccepted =
  vendorContractItems.every(
    (item) => contractChecks[item.key]
  );

  const showDashboardMessage = (type, message) => {
  if (type === "success") {
    setSuccessMessage(message);
    setErrorMessage("");
  } else {
    setErrorMessage(message);
    setSuccessMessage("");
  }
};

  const handlePackageContinue = async () => {
  try {
    // فقط برای کدهای 100 درصدی
    if (discountInfo?.percent === 100) {
  

  

  const confirmRes = await confirmVendorPackage({
    vendorId: vendor.id,
    packageId: selectedPackage.id,
    ambassadorCode: ambassadorConfirmed
      ? ambassadorCode
      : null,
    discountCode: discountInfo?.code || null,
    finalPrice,
  });

  if (!confirmRes?.ok) {
  const message =
    confirmRes?.message || "خطا در ثبت بسته همکاری";

  showDashboardMessage("error", message);
  alert(message);

  return;
}

  if (discountInfo?.code) {
  const discountRes = await useDiscountCode(
    discountInfo.code,
    vendor.id
  );

  if (!discountRes?.ok) {
    showDashboardMessage(
      "error",
      discountRes?.message || "خطا در مصرف کد تخفیف"
    );
    return;
  }
}

  showDashboardMessage(
    "success",
    "بسته همکاری با موفقیت فعال شد و می‌توانید مرحله تکمیل مدارک را ادامه دهید."
  );

  setPackageConfirmed(true);
  setShowPackages(false);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  return;
}

    // فعلاً تا زمان اتصال درگاه
    alert("انتقال به صفحه پرداخت");
  } catch (err) {
    console.error(err);

    alert(
      "خطا در ادامه فرایند"
    );
  }
};

const handleVendorDocumentUpload = async (documentType, file) => {
  try {
    if (!vendor?.id || !file) return;

    setUploadingDocument(true);

    const isImage = file.type?.startsWith("image/");
    const uploadFile = isImage
      ? await prepareImage(file, {
          quality: 0.88,
          maxWidthOrHeight: 1800,
          outputFileName: `${documentType}.jpg`,
        })
      : file;

    const ext =
      uploadFile.name?.split(".").pop()?.toLowerCase() ||
      (uploadFile.type === "application/pdf" ? "pdf" : "jpg");

    const presignRes = await presignVendorDocumentUpload({
      vendorId: vendor.id,
      documentType,
      ext,
      contentType: uploadFile.type,
      fileName: uploadFile.name,
      fileSize: uploadFile.size,
    });

    if (!presignRes?.ok) {
      alert(presignRes?.message || "خطا در آماده‌سازی آپلود مدرک");
      return;
    }

    const uploadRes = await putFileToPresignedUrl(
      presignRes.uploadUrl,
      uploadFile
    );

    if (!uploadRes?.ok) {
      alert(uploadRes?.message || "خطا در آپلود فایل");
      return;
    }

    const saveRes = await addVendorDocument(vendor.id, {
      type: documentType,
      fileName: uploadFile.name,
      mimeType: uploadFile.type,
      fileSize: uploadFile.size,
      url: presignRes.publicUrl,
    });

    if (!saveRes?.ok) {
      alert(saveRes?.message || "خطا در ثبت مدرک فروشنده");
      return;
    }

    setVendorDocuments((prev) => [saveRes.item, ...prev]);

    alert("مدرک با موفقیت بارگذاری شد.");
  } catch (err) {
    console.error("VENDOR DOCUMENT UPLOAD ERROR:", err);
    alert(err?.message || "خطا در بارگذاری مدرک فروشنده");
  } finally {
    setUploadingDocument(false);
  }
};






  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f8f1e7] px-4 py-5 text-[#3f2f1f] sm:px-6 lg:px-8"
    >
      <section className="mx-auto max-w-7xl space-y-5">
        <motion.section
  initial={{ opacity: 0, y: 18 }}
  animate={{ opacity: 1, y: 0 }}
  className="overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-xl shadow-amber-900/10"
>
  <div className="bg-gradient-to-br from-[#fff8e8] via-white to-[#f8f1e7] p-5 sm:p-7">
    <span className="inline-flex rounded-full border border-yellow-300 bg-yellow-50 px-4 py-2 text-xs font-black text-yellow-800">
      داشبورد ارائه‌دهندگان ژنینو
    </span>

    <h1 className="mt-4 text-2xl font-black leading-10 text-[#6f4a18] sm:text-3xl">
      {welcomeText}
    </h1>

    <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">
      مسیر فعال‌سازی فروشگاه شما در ژنینو مرحله‌به‌مرحله نمایش داده می‌شود.
    </p>

    <VendorDashboardMessage
  successMessage={successMessage}
  errorMessage={errorMessage}
/>

<VendorReviewBanner
  vendor={vendor}
  isVendorApproved={isVendorApproved}
  needsVendorCorrection={needsVendorCorrection}
  isVendorRejected={isVendorRejected}
  isVendorUnderReview={isVendorUnderReview}
  vendorReviewReason={vendorReviewReason}
  vendorReviewStatus={vendorReviewStatus}
/>

    <VendorStatusStepper
  steps={steps}
  isVendorApproved={isVendorApproved}
  contractAccepted={contractAccepted}
  packageConfirmed={packageConfirmed}
/>

{packageConfirmed && isVendorApproved && (
  <div className="mt-4 rounded-2xl border border-yellow-200 bg-white p-4 shadow">
    
    <h3 className="text-sm font-black text-[#6f4a18]">
      فروشگاه شما
    </h3>

    <p className="text-xs text-gray-500 mt-1">
      صفحه اختصاصی فروشگاه شما بعد از فعال‌سازی قابل استفاده است
    </p>

    <button
      onClick={() => {
  navigate(getVendorPagePath());
}}
      className="
        mt-3 w-full rounded-xl
        bg-gradient-to-r from-[#7a5526] via-[#b88724] to-[#d4af37]
        text-white font-bold py-3
      "
    >
     {getVendorPageTitle()} 
    </button>

  </div>
)}

  </div>
</motion.section>

        <VendorPackageSection
  vendor={vendor}
  packageConfirmed={packageConfirmed}
  showPackages={showPackages}
  setShowPackages={setShowPackages}
  filteredVendorPackages={filteredVendorPackages}
  selectedPackage={selectedPackage}
  setSelectedPackage={setSelectedPackage}
  hasAmbassador={hasAmbassador}
  setHasAmbassador={setHasAmbassador}
  ambassadorCode={ambassadorCode}
  setAmbassadorCode={setAmbassadorCode}
  ambassadorInfo={ambassadorInfo}
  setAmbassadorInfo={setAmbassadorInfo}
  ambassadorConfirmed={ambassadorConfirmed}
  setAmbassadorConfirmed={setAmbassadorConfirmed}
  ambassadorDiscountAmount={ambassadorDiscountAmount}
  hasDiscountCode={hasDiscountCode}
  setHasDiscountCode={setHasDiscountCode}
  discountCode={discountCode}
  setDiscountCode={setDiscountCode}
  discountInfo={discountInfo}
  setDiscountInfo={setDiscountInfo}
  finalPrice={finalPrice}
  setFinalPrice={setFinalPrice}
  packagePrice={packagePrice}
  ambassadorDiscount={ambassadorDiscount}
  remainingAfterAmbassador={remainingAfterAmbassador}
  discountAmount={discountAmount}
  validateAmbassadorCode={validateAmbassadorCode}
  validateDiscountCode={validateDiscountCode}
  handlePackageContinue={handlePackageContinue}
/>

        <VendorSelectedPackageSummary
  vendor={vendor}
  packageConfirmed={packageConfirmed}
  selectedPackage={selectedPackage}
  packagePrice={packagePrice}
  ambassadorConfirmed={ambassadorConfirmed}
  ambassadorDiscount={ambassadorDiscount}
  remainingAfterAmbassador={remainingAfterAmbassador}
  discountInfo={discountInfo}
  discountAmount={discountAmount}
  finalPrice={finalPrice}
  ambassadorInfo={ambassadorInfo}
  ambassadorCode={ambassadorCode}
/>



    <VendorDocumentsHeader
  documentsAndContractSubmitted={documentsAndContractSubmitted}
  packageConfirmed={packageConfirmed}
  setShowDocumentsStep={setShowDocumentsStep}
/>


{showDocumentsStep && packageConfirmed && (
  <motion.section
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    className="rounded-[2rem] border border-yellow-200 bg-white p-5 shadow-xl shadow-amber-900/10"
  >
    <VendorDocumentsStepper
  documentsStep={documentsStep}
  setDocumentsStep={setDocumentsStep}
  documentsCompleted={documentsCompleted}
  isDocumentsLocked={isDocumentsLocked}
/>

    <div className="mt-5 rounded-2xl border border-yellow-100 bg-[#fffaf0] p-4">
      {documentsStep === 1 && (
  <VendorBankSection
    vendor={vendor}
    bankForm={bankForm}
    setBankForm={setBankForm}
    bankInfoConfirmed={bankInfoConfirmed}
    setBankInfoConfirmed={setBankInfoConfirmed}
    isDocumentsLocked={isDocumentsLocked}
    canEditBankInfo={canEditBankInfo}
    updateVendorBankingInfo={updateVendorBankingInfo}
    setVendor={setVendor}
    setDocumentsStep={setDocumentsStep}
  />
)}

      

      {documentsStep === 2 && (
  <VendorDocumentsSection
    vendor={vendor}
    vendorDocuments={vendorDocuments}
    setVendorDocuments={setVendorDocuments}
    uploadingDocument={uploadingDocument}
    isDocumentsLocked={isDocumentsLocked}
    needsVendorCorrection={needsVendorCorrection}
    documentsCompleted={documentsCompleted}
    canEditDocument={canEditDocument}
    handleVendorDocumentUpload={handleVendorDocumentUpload}
    deleteVendorDocument={deleteVendorDocument}
    setDocumentsStep={setDocumentsStep}
  />
)}


{documentsStep === 3 && (
  <VendorContractSection
    vendorContractItems={vendorContractItems}
    contractChecks={contractChecks}
    setContractChecks={setContractChecks}
    isDocumentsLocked={isDocumentsLocked}
    needsVendorCorrection={needsVendorCorrection}
    allContractsAccepted={allContractsAccepted}
    contractAccepted={contractAccepted}
    setShowFinalContractConfirm={setShowFinalContractConfirm}
  />
)}


      
    </div>
  </motion.section>
)}


  

        <section className="rounded-[2rem] border border-yellow-200 bg-[#fff8e8] p-4 text-xs font-bold leading-6 text-[#7a5526]">
          نکته: تا زمانی که بسته همکاری انتخاب نشود و مدارک و قرارداد تأیید
          نشود، امکان انتشار محصولات یا خدمات در ژنینو فعال نخواهد شد.
        </section>
      </section>
      <VendorFinalContractModal
  show={showFinalContractConfirm}
  onClose={() => setShowFinalContractConfirm(false)}
  onConfirm={async () => {
    const res = await acceptVendorContract(vendor.id);

    if (!res?.ok) {
      alert(res?.message || "خطا در ثبت پذیرش قرارداد");
      return;
    }

    setVendor(res.vendor);
    setContractAccepted(true);
    setShowFinalContractConfirm(false);
    setShowDocumentsStep(false);

    showDashboardMessage(
      "success",
      "مدارک و قرارداد با موفقیت تکمیل شد و برای بررسی نهایی ارسال گردید."
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }}
/>
    </main>
  );
}