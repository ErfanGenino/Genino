// D:\projects\Genino\genino-web\src\pages\vendor\service\VendorPrivateTeacherPage.jsx
import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import {
  Save,
  MapPin,
  Clock3,
  UsersRound,
  Upload,
  Trash2,
  Pencil,
  Award,
  UserRound,
  BookOpen,
  GraduationCap,
  Laptop,
  ShieldCheck,
} from "lucide-react";

import PromoSlider from "../../../components/Social/PromoSlider.jsx";
import ProductCard from "../../../components/Product/ProductCard";
import PrivateTeacherStudentsSection
  from "./components/PrivateTeacherStudentsSection.jsx";

import {
  getVendorPrivateTeacherProfile,
  saveVendorPrivateTeacherProfile,
  presignVendorKindergartenHeaderUpload,
  putFileToPresignedUrl,
  createPrivateTeacherAchievement,
} from "../../../services/api.js";


// =========================================================
// ثابت‌ها
// =========================================================

const AGE_OPTIONS = [
  "۳ تا ۵ سال",
  "۶ تا ۸ سال",
  "۹ تا ۱۱ سال",
  "۱۲ تا ۱۴ سال",
  "۱۵ تا ۱۷ سال",
  "۱۸ سال به بالا",
];


const WEEK_DAYS = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
];


const TEACHING_FIELDS = [
  "ریاضی",
    "علوم",
    "فیزیک",
    "شیمی",
    "زیست‌شناسی",
    "ادبیات فارسی",
    "نگارش",
    "عربی",
    "دین و زندگی",
    "تاریخ",
    "جغرافیا",
    "مطالعات اجتماعی",
    "فلسفه و منطق",
    "اقتصاد",
    "حسابداری",
    "آمار و احتمال",
    "آمادگی کنکور",
    "تقویتی و رفع اشکال",
];

const TEACHING_FIELDS2 = [
  "زبان انگلیسی",
    "زبان آلمانی",
    "زبان فرانسه",
    "زبان عربی",
    "زبان ترکی استانبولی",
    "زبان اسپانیایی",
    "زبان ایتالیایی",
    "زبان روسی",
    "زبان چینی",
    "زبان کره‌ای",
    "زبان ژاپنی",
    "آیلتس",
    "تافل",
    "مکالمه زبان",
    "زبان‌ها و گویش‌های بومی ایران",
];

const TEACHING_FIELDS3 = [
  "نقاشی",
    "طراحی",
    "سیاه‌قلم",
    "خوشنویسی",
    "نگارگری",
    "موسیقی",
    "پیانو",
    "گیتار",
    "ویولن",
    "آواز",
    "بازیگری",
    "گویندگی",
    "دوبله",
    "فن بیان هنری",
    "عکاسی",
    "فیلم‌سازی",
];

const TEACHING_FIELDS4 = [
  "شنا",
    "فوتبال",
    "فوتسال",
    "بسکتبال",
    "والیبال",
    "تنیس",
    "پدل",
    "بدمینتون",
    "تنیس روی میز",
    "ژیمناستیک",
    "دو و میدانی",
    "شطرنج",
    "بدنسازی",
    "فیتنس",
    "یوگا",
    "پیلاتس",
    "کاراته",
    "تکواندو",
    "جودو",
];

const TEACHING_FIELDS5 = [
  "برنامه‌نویسی",
    "طراحی سایت",
    "ساخت اپلیکیشن",
    "طراحی بازی",
    "رباتیک",
    "هوش مصنوعی",
    "علوم داده",
    "امنیت سایبری",
    "ICDL",
    "نرم‌افزارهای اداری",
    "اکسل",
    "فتوشاپ",
    "طراحی گرافیک",
    "تولید محتوا",
    "دیجیتال مارکتینگ",
    "فن بیان",
    "مهارت‌های زندگی",
    "مدیریت زمان",
];


const TEACHING_FIELDS6 = [
  "کنکور",
    "تیزهوشان",
    "نمونه دولتی",
    "آیلتس",
    "تافل",
    "آزمون‌های بین‌المللی",
    "آمادگی مصاحبه",
];


const EDUCATION_LEVELS = [
  "پیش‌دبستانی",
  "ابتدایی",
  "متوسطه اول",
  "متوسطه دوم",
  "کنکور",
  "دانشگاهی",
];


const TEACHING_METHODS = [
  "حضوری در محل معلم",
  "حضوری در منزل هنرجو",
  "آنلاین",
  "خصوصی",
  "نیمه‌خصوصی",
  "گروهی",
  "حل تمرین",
  "رفع اشکال",
  "آموزش مفهومی",
  "آمادگی آزمون",
];


const EXPERIENCE_OPTIONS = [
  "کمتر از ۱ سال",
  "۱ تا ۳ سال",
  "۳ تا ۵ سال",
  "۵ تا ۱۰ سال",
  "بیشتر از ۱۰ سال",
];


const ACHIEVEMENT_TYPES = [
  {
    value: "LEARNING",
    label: "پیشرفت آموزشی",
  },
  {
    value: "EXAM",
    label: "موفقیت در آزمون",
  },
  {
    value: "HOMEWORK",
    label: "انجام تمرین‌ها",
  },
  {
    value: "CREATIVITY",
    label: "خلاقیت و حل مسئله",
  },
  {
    value: "DISCIPLINE",
    label: "نظم و پشتکار",
  },
  {
    value: "SKILL",
    label: "یادگیری مهارت جدید",
  },
];


// =========================================================
// صفحه اصلی
// =========================================================

export default function VendorPrivateTeacherPage() {

  const { vendorId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL;

  const loggedVendorId =
    localStorage.getItem("genino_vendor_id");

  const isPublicView =
    searchParams.get("view") === "public";

  const isVendorOwner =
    !isPublicView &&
    Boolean(loggedVendorId) &&
    Number(loggedVendorId) === Number(vendorId);


  const [
    activeHeaderIndex,
    setActiveHeaderIndex,
  ] = useState(0);


  const [
    saving,
    setSaving,
  ] = useState(false);


  const [
    validationErrors,
    setValidationErrors,
  ] = useState({});


  const [
    selectedAchievementChild,
    setSelectedAchievementChild,
  ] = useState(null);


  const [
    achievementForm,
    setAchievementForm,
  ] = useState({
    category: "",
    title: "",
    description: "",
  });

  const [
  customTeachingField,
  setCustomTeachingField,
] = useState("");

const [customLanguageField, setCustomLanguageField] = useState("");
const [customArtField, setCustomArtField] = useState("");
const [customSportField, setCustomSportField] = useState("");
const [customSkillField, setCustomSkillField] = useState("");
const [customExamField, setCustomExamField] = useState("");
const [customSchoolOptions, setCustomSchoolOptions] = useState([]);
const [customLanguageOptions, setCustomLanguageOptions] = useState([]);
const [customArtOptions, setCustomArtOptions] = useState([]);
const [customSportOptions, setCustomSportOptions] = useState([]);
const [customSkillOptions, setCustomSkillOptions] = useState([]);
const [customExamOptions, setCustomExamOptions] = useState([]);


const [
  customEducationLevel,
  setCustomEducationLevel,
] = useState("");


const [
  customTeachingMethod,
  setCustomTeachingMethod,
] = useState("");


  // =========================================================
  // اطلاعات موقت بسته
  // بعداً از API دریافت می‌شوند
  // =========================================================

  const [vendor, setVendor] =
  useState(null);

const [products, setProducts] =
  useState([]);

const [services, setServices] =
  useState([]);

const [loadingProducts, setLoadingProducts] =
  useState(true);

const [loadingServices, setLoadingServices] =
  useState(true);


  // =========================================================
  // اطلاعات معلم خصوصی
  // =========================================================

  const [
    teacher,
    setTeacher,
  ] = useState({

    headerImages: [],

    fullName: "",
    slogan: "",
    description: "",

    city: "",
    district: "",
    address: "",
    phone: "",
    email: "",

    acceptedAges: [],
    gender: "",

    teachingFields: [],

customTeachingFields: {
  school: [],
  languages: [],
  arts: [],
  sports: [],
  skills: [],
  exams: [],
},

educationLevels: [],
teachingMethods: [],

    workingSchedule: [],

    studentCapacity: "",

    education: "",
    university: "",
    specialty: "",
    teachingExperience: "",

    hasOnlineTeaching: false,
    onlineDescription: "",

    hasHomeTeaching: false,
    homeTeachingDescription: "",

    hasPlacementTest: false,
    placementTestDescription: "",

    hasTrialSession: false,
    trialSessionDescription: "",

    hasEducationalMaterials: false,
    educationalMaterialsDescription: "",

    hasCertificate: false,
    certificateDescription: "",

    achievementsAndLicenses: [],

    children: [],

    resume: "",
  });


  useEffect(() => {
  if (!vendorId) return;

  const loadProfile = async () => {
    try {
      const res =
        await getVendorPrivateTeacherProfile(
          vendorId
        );

      if (res?.ok && res.profile) {
        const profile = res.profile;

        const customFields =
  profile.customTeachingFields &&
  typeof profile.customTeachingFields === "object" &&
  !Array.isArray(profile.customTeachingFields)
    ? profile.customTeachingFields
    : {};

setCustomSchoolOptions(
  Array.isArray(customFields.school)
    ? customFields.school
    : []
);

setCustomLanguageOptions(
  Array.isArray(customFields.languages)
    ? customFields.languages
    : []
);

setCustomArtOptions(
  Array.isArray(customFields.arts)
    ? customFields.arts
    : []
);

setCustomSportOptions(
  Array.isArray(customFields.sports)
    ? customFields.sports
    : []
);

setCustomSkillOptions(
  Array.isArray(customFields.skills)
    ? customFields.skills
    : []
);

setCustomExamOptions(
  Array.isArray(customFields.exams)
    ? customFields.exams
    : []
);

        setTeacher((prev) => ({
          ...prev,

          headerImages:
            Array.isArray(profile.headerImages)
              ? profile.headerImages
              : [],

          fullName:
            profile.teacherName || "",

          slogan:
            profile.slogan || "",

          description:
            profile.description || "",

          city:
            profile.city || "",

          district:
            profile.district || "",

          address:
            profile.address || "",

          phone:
            profile.phone || "",

          email:
            profile.email || "",

          acceptedAges:
            Array.isArray(profile.acceptedAges)
              ? profile.acceptedAges
              : [],

          gender:
            profile.gender || "",

          teachingFields:
  Array.isArray(profile.teachingFields)
    ? profile.teachingFields
    : [],

customTeachingFields: {
  school: Array.isArray(profile.customTeachingFields?.school)
    ? profile.customTeachingFields.school
    : [],

  languages: Array.isArray(profile.customTeachingFields?.languages)
    ? profile.customTeachingFields.languages
    : [],

  arts: Array.isArray(profile.customTeachingFields?.arts)
    ? profile.customTeachingFields.arts
    : [],

  sports: Array.isArray(profile.customTeachingFields?.sports)
    ? profile.customTeachingFields.sports
    : [],

  skills: Array.isArray(profile.customTeachingFields?.skills)
    ? profile.customTeachingFields.skills
    : [],

  exams: Array.isArray(profile.customTeachingFields?.exams)
    ? profile.customTeachingFields.exams
    : [],
},

educationLevels:
            Array.isArray(profile.educationLevels)
              ? profile.educationLevels
              : [],

          teachingMethods:
            Array.isArray(profile.teachingMethods)
              ? profile.teachingMethods
              : [],

          workingSchedule:
            Array.isArray(profile.workingSchedule)
              ? profile.workingSchedule
              : [],

          studentCapacity:
  profile.studentCapacity || "",

education:
  profile.education || "",

university:
  profile.university || "",

specialty:
  profile.specialty || "",

teachingExperience:
  profile.teachingExperience || "",

hasOnlineTeaching:
  Boolean(profile.hasOnlineClasses),

onlineDescription:
  profile.onlineDescription || "",

hasHomeTeaching:
  Boolean(profile.hasInPersonClasses),

homeTeachingDescription:
  profile.inPersonDescription || "",

hasPlacementTest:
  Boolean(profile.hasPlacementTest),

placementTestDescription:
  profile.placementTestDescription || "",

hasTrialSession:
  Boolean(profile.hasTrialSession),

trialSessionDescription:
  profile.trialSessionDescription || "",

hasEducationalMaterials:
  Boolean(profile.hasEducationalMaterials),

educationalMaterialsDescription:
  profile.educationalMaterialsDescription || "",

hasCertificate:
  Boolean(profile.hasCertificate),

certificateDescription:
  profile.certificateDescription || "",

achievementsAndLicenses:
  Array.isArray(profile.achievementsAndLicenses)
    ? profile.achievementsAndLicenses
    : [],

resume:
  profile.resume || "",


        }));
      }
    } catch (err) {
      console.error(
        "LOAD PRIVATE TEACHER PROFILE ERROR:",
        err
      );
    }
  };

  loadProfile();
}, [vendorId, isVendorOwner]);



// =========================================================
// مدیریت محصولات معلم خصوصی
// =========================================================

const handleDeleteProduct = async (productId) => {
  const ok = window.confirm(
    "آیا از حذف این محصول مطمئن هستید؟"
  );

  if (!ok) return;

  try {
    const res = await fetch(
      `${API_BASE_URL}/vendor-products/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("genino_token")}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok || !data?.ok) {
      alert(
        data?.message ||
        "خطا در حذف محصول"
      );
      return;
    }

    setProducts((prev) =>
      prev.filter(
        (item) => item.id !== productId
      )
    );

  } catch (error) {
    console.error(
      "DELETE PRIVATE TEACHER PRODUCT ERROR:",
      error
    );

    alert("خطا در ارتباط با سرور");
  }
};


const handlePublishProduct = async (productId) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/vendor-products/${productId}/publish`,
      {
        method: "PATCH",
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("genino_token")}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok || !data?.ok) {
      alert(
        data?.message ||
        "خطا در انتشار محصول"
      );
      return;
    }

    setProducts((prev) =>
      prev.map((item) =>
        item.id === productId
          ? {
              ...item,
              status: "PUBLISHED",
            }
          : item
      )
    );

    alert(
      "محصول با موفقیت منتشر شد."
    );

  } catch (error) {
    console.error(
      "PUBLISH PRIVATE TEACHER PRODUCT ERROR:",
      error
    );

    alert("خطا در ارتباط با سرور");
  }
};


const handleUnpublishProduct = async (productId) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/vendor-products/${productId}/unpublish`,
      {
        method: "PATCH",
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("genino_token")}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok || !data?.ok) {
      alert(
        data?.message ||
        "خطا در عدم انتشار محصول"
      );
      return;
    }

    setProducts((prev) =>
      prev.map((item) =>
        item.id === productId
          ? {
              ...item,
              status: "DRAFT",
            }
          : item
      )
    );

  } catch (error) {
    console.error(
      "UNPUBLISH PRIVATE TEACHER PRODUCT ERROR:",
      error
    );

    alert("خطا در ارتباط با سرور");
  }
};


const handleDeleteService = async (serviceId) => {
  const ok = window.confirm(
    "آیا از حذف این خدمت مطمئن هستید؟"
  );

  if (!ok) return;

  try {
    const res = await fetch(
      `${API_BASE_URL}/vendor-services/${serviceId}`,
      {
        method: "DELETE",
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("genino_token")}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok || !data?.ok) {
      alert(
        data?.message ||
        "خطا در حذف خدمت"
      );
      return;
    }

    setServices((prev) =>
      prev.filter(
        (item) =>
          item.id !== serviceId
      )
    );

    alert(
      "خدمت با موفقیت حذف شد."
    );

  } catch (error) {
    console.error(
      "DELETE PRIVATE TEACHER SERVICE ERROR:",
      error
    );

    alert(
      "خطا در ارتباط با سرور"
    );
  }
};


const handlePublishService = async (serviceId) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/vendor-services/${serviceId}/publish`,
      {
        method: "PATCH",
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("genino_token")}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok || !data?.ok) {
      alert(
        data?.message ||
        "خطا در انتشار خدمت"
      );
      return;
    }

    setServices((prev) =>
      prev.map((item) =>
        item.id === serviceId
          ? {
              ...item,
              status: "PUBLISHED",
            }
          : item
      )
    );

    alert(
      "خدمت با موفقیت منتشر شد."
    );

  } catch (error) {
    console.error(
      "PUBLISH PRIVATE TEACHER SERVICE ERROR:",
      error
    );

    alert(
      "خطا در ارتباط با سرور"
    );
  }
};


const handleUnpublishService = async (serviceId) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/vendor-services/${serviceId}/unpublish`,
      {
        method: "PATCH",
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("genino_token")}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok || !data?.ok) {
      alert(
        data?.message ||
        "خطا در عدم انتشار خدمت"
      );
      return;
    }

    setServices((prev) =>
      prev.map((item) =>
        item.id === serviceId
          ? {
              ...item,
              status: "DRAFT",
            }
          : item
      )
    );

  } catch (error) {
    console.error(
      "UNPUBLISH PRIVATE TEACHER SERVICE ERROR:",
      error
    );

    alert(
      "خطا در ارتباط با سرور"
    );
  }
};

  // =========================================================
  // تغییر فیلد
  // =========================================================

  const updateField = (
    key,
    value
  ) => {

    setTeacher(
      (prev) => ({
        ...prev,
        [key]: value,
      })
    );


    setValidationErrors(
      (prev) => ({
        ...prev,
        [key]: "",
      })
    );
  };


  // =========================================================
// بسته فروشنده
// =========================================================

useEffect(() => {
  if (!vendorId || !isVendorOwner) return;

  const loadVendorPackage = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/vendors/${vendorId}`,
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("genino_token")}`,
            Accept: "application/json",
          },
        }
      );

      const data = await res.json();

      if (res.ok && data?.ok) {
  const v = data.vendor || {};

  setVendor({
    ...v,

    packageWindowCount:
      v.selectedPackageWindowCount ?? 0,

    packageAchievementLimit:
      v.selectedPackageAchievementLimit ?? 0,

    achievementUsedCount:
      v.achievementUsedCount ?? 0,
  });
}
    } catch (error) {
      console.error(
        "LOAD PRIVATE TEACHER VENDOR ERROR:",
        error
      );
    }
  };

  loadVendorPackage();
}, [vendorId, API_BASE_URL, isVendorOwner]);


// =========================================================
// محصولات معلم خصوصی
// =========================================================




useEffect(() => {
  if (!vendorId) return;

  const loadProducts = async () => {
    try {
      setLoadingProducts(true);

      const url = isVendorOwner
        ? `${API_BASE_URL}/vendor-products/vendor/${vendorId}`
        : `${API_BASE_URL}/vendor-products/public`;

      const headers = isVendorOwner
        ? {
            Authorization:
              `Bearer ${localStorage.getItem("genino_token")}`,
            Accept: "application/json",
          }
        : {
            Accept: "application/json",
          };

      const res = await fetch(url, {
        method: "GET",
        headers,
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        throw new Error(
          data?.message ||
            "خطا در دریافت محصولات"
        );
      }

      const receivedProducts =
        Array.isArray(data.products)
          ? data.products
          : [];

      const vendorProducts =
        isVendorOwner
          ? receivedProducts
          : receivedProducts.filter(
              (product) =>
                Number(
                  product.vendorId ??
                    product.vendor?.id
                ) === Number(vendorId)
            );

      setProducts(
        vendorProducts.map((product) => ({
          ...product,

          categoryLinks:
            typeof product.categoryLinks ===
            "string"
              ? JSON.parse(
                  product.categoryLinks
                )
              : product.categoryLinks || [],

          images:
            typeof product.images ===
            "string"
              ? JSON.parse(product.images)
              : product.images || [],
        }))
      );
    } catch (error) {
      console.error(
        "LOAD PRIVATE TEACHER PRODUCTS ERROR:",
        error
      );

      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  };

  loadProducts();
}, [
  vendorId,
  API_BASE_URL,
  isVendorOwner,
]);


// =========================================================
// خدمات معلم خصوصی
// =========================================================

useEffect(() => {
  if (!vendorId) return;

  const loadServices = async () => {
    try {
      setLoadingServices(true);

      const url = isVendorOwner
        ? `${API_BASE_URL}/vendor-services/vendor/${vendorId}`
        : `${API_BASE_URL}/vendor-services/public/vendor/${vendorId}`;

      const headers = isVendorOwner
        ? {
            Authorization:
              `Bearer ${localStorage.getItem("genino_token")}`,
            Accept: "application/json",
          }
        : {
            Accept: "application/json",
          };

      const res = await fetch(url, {
        method: "GET",
        headers,
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        throw new Error(
          data?.message ||
            "خطا در دریافت خدمات"
        );
      }

      setServices(
        Array.isArray(data.services)
          ? data.services
          : []
      );
    } catch (error) {
      console.error(
        "LOAD PRIVATE TEACHER SERVICES ERROR:",
        error
      );

      setServices([]);
    } finally {
      setLoadingServices(false);
    }
  };

  loadServices();
}, [
  vendorId,
  API_BASE_URL,
  isVendorOwner,
]);


  // =========================================================
  // کالا و خدمات
  // =========================================================

  const packageWindowCount =
  Number(
    vendor?.packageWindowCount || 0
  );

const packageAchievementLimit =
  Number(
    vendor?.packageAchievementLimit || 0
  );

const achievementUsedCount =
  Number(
    vendor?.achievementUsedCount || 0
  );

  const courseServices =
    services.filter(
      (service) =>
        service.package ||
        service.scheduleMode === "PACKAGE"
    );


  const eventServices =
    services.filter(
      (service) =>
        !service.package &&
        service.scheduleMode !== "PACKAGE"
    );


  const usedWindowCount =
    products.length +
    services.length;


  const remainingWindowCount =
    Math.max(
      packageWindowCount -
        usedWindowCount,
      0
    );


  const canAddWindow =
    packageWindowCount > 0 &&
    usedWindowCount <
      packageWindowCount;


  const remainingAchievementCount =
    Math.max(
      packageAchievementLimit -
        achievementUsedCount,
      0
    );


  // =========================================================
  // تصاویر
  // =========================================================

  const addHeaderImage = async (file) => {
  if (!file) return;

  if (teacher.headerImages.length >= 10) {
    alert("حداکثر ۱۰ تصویر می‌توانید ثبت کنید.");
    return;
  }

  try {
    const ext =
      file.name.split(".").pop();

    const presign =
      await presignVendorKindergartenHeaderUpload({
        ext,
        contentType: file.type,
        fileName: file.name,
        fileSize: file.size,
      });

    if (!presign?.ok) {
      throw new Error(
        presign?.message ||
          "خطا در آماده‌سازی آپلود تصویر"
      );
    }

    const upload =
      await putFileToPresignedUrl(
        presign.uploadUrl,
        file
      );

    if (!upload?.ok) {
      throw new Error(
        "خطا در آپلود تصویر"
      );
    }

    setTeacher((prev) => ({
      ...prev,
      headerImages: [
        ...prev.headerImages,
        {
          url: presign.publicUrl,
          description: "",
        },
      ],
    }));
  } catch (error) {
    console.error(
      "PRIVATE TEACHER HEADER UPLOAD ERROR:",
      error
    );

    alert(
      error?.message ||
        "خطا در آپلود تصویر"
    );
  }
};


  const updateHeaderDescription = (
    index,
    value
  ) => {

    setTeacher(
      (prev) => ({
        ...prev,

        headerImages:
          prev.headerImages.map(
            (item, i) =>
              i === index
                ? {
                    ...item,
                    description: value,
                  }
                : item
          ),
      })
    );
  };


  const removeHeaderImage = (
    index
  ) => {

    setTeacher(
      (prev) => ({
        ...prev,

        headerImages:
          prev.headerImages.filter(
            (_, i) =>
              i !== index
          ),
      })
    );


    setActiveHeaderIndex(
      (prev) =>
        Math.max(
          prev - 1,
          0
        )
    );
  };


  // =========================================================
  // انتخاب چندگانه
  // =========================================================

  const toggleArrayField = (
    field,
    value
  ) => {

    setTeacher(
      (prev) => {

        const current =
          Array.isArray(
            prev[field]
          )
            ? prev[field]
            : [];


        const exists =
          current.includes(
            value
          );


        return {
          ...prev,

          [field]:
            exists
              ? current.filter(
                  (item) =>
                    item !== value
                )
              : [
                  ...current,
                  value,
                ],
        };
      }
    );


    setValidationErrors(
      (prev) => ({
        ...prev,
        [field]: "",
      })
    );
  };

  const addCustomOption = (
  field,
  value,
  setValue
) => {

  const cleanValue =
    String(value || "").trim();


  if (!cleanValue) {
    return;
  }


  setTeacher(
    (prev) => {

      const current =
        Array.isArray(
          prev[field]
        )
          ? prev[field]
          : [];


      if (
        current.includes(
          cleanValue
        )
      ) {
        return prev;
      }


      return {
        ...prev,

        [field]: [
          ...current,
          cleanValue,
        ],
      };
    }
  );


  setValidationErrors(
    (prev) => ({
      ...prev,
      [field]: "",
    })
  );


  setValue("");
};


const addCustomTeachingField = (
  value,
  setValue,
  setCustomOptions,
  category
) => {
  const cleanValue = String(value || "").trim();

  if (!cleanValue) return;

  setTeacher((prev) => {
    const currentTeachingFields = Array.isArray(prev?.teachingFields)
      ? prev.teachingFields
      : [];

    const currentCustomTeachingFields =
      prev?.customTeachingFields || {};

    const currentCategoryValues = Array.isArray(
      currentCustomTeachingFields?.[category]
    )
      ? currentCustomTeachingFields[category]
      : [];

    return {
      ...prev,

      teachingFields: currentTeachingFields.includes(cleanValue)
        ? currentTeachingFields
        : [...currentTeachingFields, cleanValue],

      customTeachingFields: {
        ...currentCustomTeachingFields,

        [category]: currentCategoryValues.includes(cleanValue)
          ? currentCategoryValues
          : [...currentCategoryValues, cleanValue],
      },
    };
  });

  setCustomOptions((prev) => {
    const currentOptions = Array.isArray(prev) ? prev : [];

    return currentOptions.includes(cleanValue)
      ? currentOptions
      : [...currentOptions, cleanValue];
  });

  setValidationErrors((prev) => ({
    ...prev,
    teachingFields: "",
  }));

  setValue("");
};


  // =========================================================
  // زمان‌بندی
  // =========================================================

  const addWorkingSchedule =
    () => {

      setTeacher(
        (prev) => ({
          ...prev,

          workingSchedule: [
            ...prev.workingSchedule,

            {
              days: [],
              openingTime: "",
              closingTime: "",
            },
          ],
        })
      );


      setValidationErrors(
        (prev) => ({
          ...prev,
          workingSchedule: "",
        })
      );
    };


  const removeWorkingSchedule = (
    index
  ) => {

    setTeacher(
      (prev) => ({
        ...prev,

        workingSchedule:
          prev.workingSchedule.filter(
            (_, i) =>
              i !== index
          ),
      })
    );
  };


  const toggleScheduleDay = (
    scheduleIndex,
    day
  ) => {

    setTeacher(
      (prev) => ({
        ...prev,

        workingSchedule:
          prev.workingSchedule.map(
            (
              schedule,
              index
            ) => {

              if (
                index !==
                scheduleIndex
              ) {
                return schedule;
              }


              const days =
                Array.isArray(
                  schedule.days
                )
                  ? schedule.days
                  : [];


              const exists =
                days.includes(
                  day
                );


              return {
                ...schedule,

                days:
                  exists
                    ? days.filter(
                        (item) =>
                          item !== day
                      )
                    : [
                        ...days,
                        day,
                      ],
              };
            }
          ),
      })
    );


    setValidationErrors(
      (prev) => ({
        ...prev,
        workingSchedule: "",
      })
    );
  };


  const updateScheduleTime = (
    index,
    field,
    value
  ) => {

    setTeacher(
      (prev) => ({
        ...prev,

        workingSchedule:
          prev.workingSchedule.map(
            (
              schedule,
              i
            ) =>
              i === index
                ? {
                    ...schedule,
                    [field]: value,
                  }
                : schedule
          ),
      })
    );


    setValidationErrors(
      (prev) => ({
        ...prev,
        workingSchedule: "",
      })
    );
  };


  // =========================================================
  // مدارک و افتخارات
  // =========================================================

  const addAchievementOrLicense =
    () => {

      setTeacher(
        (prev) => ({
          ...prev,

          achievementsAndLicenses: [
            ...prev.achievementsAndLicenses,

            {
              id: Date.now(),
              title: "",
              description: "",
            },
          ],
        })
      );
    };


  const updateAchievementOrLicense = (
    id,
    field,
    value
  ) => {

    setTeacher(
      (prev) => ({
        ...prev,

        achievementsAndLicenses:
          prev.achievementsAndLicenses.map(
            (item) =>
              item.id === id
                ? {
                    ...item,
                    [field]: value,
                  }
                : item
          ),
      })
    );
  };


  const removeAchievementOrLicense = (
    id
  ) => {

    setTeacher(
      (prev) => ({
        ...prev,

        achievementsAndLicenses:
          prev.achievementsAndLicenses.filter(
            (item) =>
              item.id !== id
          ),
      })
    );
  };


  // =========================================================
// صدور دستاورد برای دانش‌آموز
// =========================================================

const handleCreateAchievement =
  async () => {

    if (
      !selectedAchievementChild?.id
    ) {
      alert(
        "ابتدا دانش‌آموز را انتخاب کنید."
      );
      return;
    }

    if (
      !achievementForm.category
    ) {
      alert(
        "نوع دستاورد را انتخاب کنید."
      );
      return;
    }

    if (
      !achievementForm.title.trim()
    ) {
      alert(
        "عنوان دستاورد را وارد کنید."
      );
      return;
    }

    if (
      remainingAchievementCount <= 0
    ) {
      alert(
        "مجوز باقی‌مانده برای صدور دستاورد ندارید."
      );
      return;
    }

    try {
      const res =
        await createPrivateTeacherAchievement(
          vendorId,
          {
            childId:
              selectedAchievementChild.id,

            category:
              achievementForm.category,

            title:
              achievementForm.title.trim(),

            description:
              achievementForm.description.trim(),
          }
        );

      if (!res?.ok) {
        alert(
          res?.message ||
            "صدور دستاورد انجام نشد."
        );
        return;
      }

      setVendor(
        (prev) => ({
          ...prev,

          achievementUsedCount:
            Number(
              prev?.achievementUsedCount ||
                0
            ) + 1,
        })
      );

      setAchievementForm({
        category: "",
        title: "",
        description: "",
      });

      setSelectedAchievementChild(
        null
      );

      alert(
        "دستاورد با موفقیت برای دانش‌آموز صادر شد 🌟"
      );

    } catch (error) {
      console.error(
        "CREATE PRIVATE TEACHER ACHIEVEMENT ERROR:",
        error
      );

      alert(
        error?.message ||
          "خطا در صدور دستاورد."
      );
    }
  };


  // =========================================================
  // اعتبارسنجی
  // =========================================================

  const validateFields =
    () => {

      const errors = {};


      if (
        !String(
          teacher.fullName ||
            ""
        ).trim()
      ) {
        errors.fullName =
          "نام و نام خانوادگی معلم الزامی است";
      }


      if (
        !String(
          teacher.slogan ||
            ""
        ).trim()
      ) {
        errors.slogan =
          "شعار یا معرفی کوتاه الزامی است";
      }


      if (
        !String(
          teacher.city ||
            ""
        ).trim()
      ) {
        errors.city =
          "شهر محل فعالیت الزامی است";
      }


      if (
        !String(
          teacher.district ||
            ""
        ).trim()
      ) {
        errors.district =
          "منطقه فعالیت الزامی است";
      }


      if (
        !String(
          teacher.phone ||
            ""
        ).trim()
      ) {
        errors.phone =
          "شماره تماس الزامی است";
      }


      if (
        !String(
          teacher.email ||
            ""
        ).trim()
      ) {

        errors.email =
          "ایمیل الزامی است";

      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          String(
            teacher.email
          ).trim()
        )
      ) {

        errors.email =
          "فرمت ایمیل صحیح نیست";
      }


      if (
        !teacher.gender
      ) {
        errors.gender =
          "جنسیت دانش‌آموزان قابل پذیرش را مشخص کنید";
      }


      if (
        teacher
          .acceptedAges.length ===
        0
      ) {
        errors.acceptedAges =
          "حداقل یک گروه سنی انتخاب کنید";
      }


      if (
        teacher
          .teachingFields.length ===
        0
      ) {
        errors.teachingFields =
          "حداقل یک درس یا حوزه آموزشی انتخاب کنید";
      }


      if (
        teacher
          .educationLevels.length ===
        0
      ) {
        errors.educationLevels =
          "حداقل یک مقطع تحصیلی انتخاب کنید";
      }


      const schedule =
        teacher.workingSchedule;


      if (
        schedule.length === 0
      ) {

        errors.workingSchedule =
          "حداقل یک برنامه تدریس ثبت کنید";

      } else {

        const invalidSchedule =
          schedule.some(
            (item) =>
              !item.days?.length ||
              !item.openingTime ||
              !item.closingTime
          );


        if (
          invalidSchedule
        ) {

          errors.workingSchedule =
            "روزها و ساعت شروع و پایان همه برنامه‌ها را کامل کنید";
        }


       


        const invalidTime =
          schedule.some(
            (item) =>
              item.openingTime &&
              item.closingTime &&
              item.openingTime >=
                item.closingTime
          );


        if (
          invalidTime
        ) {

          errors.workingSchedule =
            "ساعت پایان باید بعد از ساعت شروع باشد";
        }
      }


      setValidationErrors(
        errors
      );


      return (
        Object.keys(errors)
          .length === 0
      );
    };


  // =========================================================
  // ذخیره موقت
  // =========================================================
const handleSave = async () => {
  if (!validateFields()) {
    alert(
      "لطفاً اطلاعات ضروری معلم خصوصی را کامل کنید."
    );
    return;
  }

  try {
    setSaving(true);

    const payload = {
      headerImages:
        teacher.headerImages,

      teacherName:
        teacher.fullName.trim(),

      slogan:
        teacher.slogan.trim(),

      description:
        teacher.description.trim(),

      city:
        teacher.city.trim(),

      district:
        teacher.district.trim(),

      address:
        teacher.address.trim(),

      phone:
        teacher.phone.trim(),

      email:
        teacher.email.trim(),

      acceptedAges:
        teacher.acceptedAges,

      gender:
        teacher.gender,

      teachingFields:
  teacher.teachingFields,

customTeachingFields:
  teacher.customTeachingFields,

educationLevels:
  teacher.educationLevels,

      teachingMethods:
        teacher.teachingMethods,

      workingSchedule:
        teacher.workingSchedule,

      studentCapacity:
  teacher.studentCapacity.trim(),

education:
  teacher.education.trim(),

university:
  teacher.university.trim(),

specialty:
  teacher.specialty.trim(),

teachingExperience:
  teacher.teachingExperience.trim(),

hasOnlineClasses:
  teacher.hasOnlineTeaching,

onlineDescription:
  teacher.onlineDescription.trim(),

hasInPersonClasses:
  teacher.hasHomeTeaching,

inPersonDescription:
  teacher.homeTeachingDescription.trim(),

hasPlacementTest:
  teacher.hasPlacementTest,

placementTestDescription:
  teacher.placementTestDescription.trim(),

hasTrialSession:
  teacher.hasTrialSession,

trialSessionDescription:
  teacher.trialSessionDescription.trim(),

hasEducationalMaterials:
  teacher.hasEducationalMaterials,

educationalMaterialsDescription:
  teacher.educationalMaterialsDescription.trim(),

hasCertificate:
  teacher.hasCertificate,

certificateDescription:
  teacher.certificateDescription.trim(),

achievementsAndLicenses:
  teacher.achievementsAndLicenses,

resume:
  teacher.resume.trim(),
    };

    const res =
      await saveVendorPrivateTeacherProfile(
        vendorId,
        payload
      );

    if (!res?.ok) {
      throw new Error(
        res?.message ||
          "خطا در ذخیره اطلاعات معلم خصوصی"
      );
    }

    alert(
      "اطلاعات معلم خصوصی با موفقیت ذخیره شد 💛"
    );
  } catch (err) {
    console.error(
      "SAVE PRIVATE TEACHER PROFILE ERROR:",
      err
    );

    alert(
      err?.message ||
        "خطا در ذخیره اطلاعات معلم خصوصی"
    );
  } finally {
    setSaving(false);
  }
};


  // =========================================================
  // Render
  // =========================================================

  // =========================================================
// Public View
// =========================================================

if (!isVendorOwner) {
  return (
    <PublicPrivateTeacherView
      teacher={teacher}
      products={products.filter(
        (product) =>
          product.status === "PUBLISHED" ||
          product.publishStatus === "PUBLISHED"
      )}
      services={services.filter(
        (service) =>
          service.status === "PUBLISHED" ||
          service.publishStatus === "PUBLISHED"
      )}
      loadingProducts={loadingProducts}
      loadingServices={loadingServices}
    />
  );
}

  return (

    <main
      dir="rtl"
      className="
        min-h-screen
        bg-[#faf7ef]
        p-4
      "
    >

      <div
        className="
          mx-auto
          max-w-6xl
          space-y-5
        "
      >


        {/* =====================================================
            تصاویر
        ===================================================== */}

        <section
          className="
            rounded-3xl
            bg-white
            p-5
            shadow
          "
        >

          <div
            className="
              mx-auto
              w-full
              max-w-3xl
              overflow-hidden
              rounded-3xl
            "
          >

            {teacher
              .headerImages
              .length > 0 ? (

              <div>

                <PromoSlider
                  variant="golden"
                  interval={7000}
                  height="h-44 sm:h-52 md:h-60 lg:h-64"
                  slides={
                    teacher
                      .headerImages
                      .map(
                        (
                          item,
                          index
                        ) => ({
                          id: index,
                          image:
                            item.url,
                          title: "",
                        })
                      )
                  }
                  onIndexChange={(
                    index
                  ) =>
                    setActiveHeaderIndex(
                      index
                    )
                  }
                />

{isVendorOwner && (
                <button
                  type="button"
                  onClick={() =>
                    removeHeaderImage(
                      activeHeaderIndex
                    )
                  }
                  className="
                    mt-3
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-red-200
                    bg-red-50
                    py-2
                    text-sm
                    font-bold
                    text-red-600
                  "
                >

                  <Trash2
                    size={16}
                  />

                  حذف تصویر فعلی

                </button>
)}

{isVendorOwner && (
                <div
                  className="
                    mt-3
                    rounded-xl
                    bg-yellow-50
                    p-4
                  "
                >

                  <input
                    value={
                      teacher
                        .headerImages[
                        activeHeaderIndex
                      ]?.description ||
                      ""
                    }
                    onChange={(
                      e
                    ) =>
                      updateHeaderDescription(
                        activeHeaderIndex,
                        e.target.value
                      )
                    }
                    placeholder="مثلاً: کلاس خصوصی ریاضی و آموزش مفهومی"
                    className="
                      w-full
                      rounded-xl
                      border
                      bg-white
                      px-3
                      py-2
                      text-center
                      text-sm
                    "
                  />

                </div>
                )}

              </div>

            ) : (

              <div
                className="
                  flex
                  h-52
                  items-center
                  justify-center
                  rounded-3xl
                  bg-gradient-to-r
                  from-yellow-100
                  to-yellow-200
                "
              >

                <UserRound
                  className="
                    h-14
                    w-14
                    text-yellow-700
                  "
                />

              </div>

            )}

{isVendorOwner && (
            <label
              className="
                mt-4
                flex
                cursor-pointer
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#6f4a18]
                px-5
                py-3
                font-bold
                text-white
              "
            >

              <Upload
                size={18}
              />

              افزودن تصویر

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(
                  e
                ) => {

                  addHeaderImage(
                    e.target
                      .files?.[0]
                  );

                  e.target.value =
                    "";
                }}
              />

            </label>
)}

            {isVendorOwner && (
  <p
    className="
      mt-2
      text-center
      text-xs
      text-gray-500
    "
  >
    حداکثر ۱۰ تصویر - تصویر حرفه‌ای معلم، محیط تدریس، کلاس، تجهیزات و نمونه فعالیت‌های آموزشی
  </p>
)}

          </div>

        </section>



        {/* =====================================================
            پنجره‌ها
        ===================================================== */}
{isVendorOwner && (
        <section
          className="
            rounded-3xl
            bg-white
            p-5
            shadow
          "
        >

          <h2
            className="
              font-black
              text-[#6f4a18]
            "
          >
            پنجره‌های ارائه کالا و خدمت
          </h2>


          <p
            className="
              mt-2
              text-xs
              leading-6
              text-gray-500
            "
          >
            در این بخش می‌توانید محصولات آموزشی، جلسات خصوصی، کلاس‌ها و دوره‌های خود را مدیریت کنید.
          </p>


          <div
            className="
              mt-4
              grid
              grid-cols-3
              gap-2
            "
          >

            <CounterBox
              title="پنجره‌های خریداری‌شده"
              value={
                packageWindowCount
              }
            />

            <CounterBox
              title="استفاده‌شده"
              value={
                usedWindowCount
              }
            />

            <CounterBox
              title="باقی‌مانده"
              value={
                remainingWindowCount
              }
              green={
                remainingWindowCount >
                0
              }
            />

          </div>


          <button
            type="button"
            onClick={() =>
              navigate(
                "/vendor/reports"
              )
            }
            className="
              mt-3
              w-full
              rounded-2xl
              bg-[#faf7ef]
              p-3
              text-center
              shadow-sm
            "
          >

            <p
              className="
                text-xs
                text-gray-400
              "
            >
              گزارش‌های مهم مدیریتی
            </p>

            <p
              className="
                mt-1
                text-sm
                font-bold
                text-[#7a5526]
              "
            >
              مشاهده گزارش‌ها
            </p>

          </button>


          {canAddWindow ? (

            <div
              className="
                mt-4
                grid
                gap-2
                sm:grid-cols-2
              "
            >

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/vendor/product/create?source=private-teacher&vendorId=${vendorId}`
                  )
                }
                className="
                  rounded-2xl
                  bg-gradient-to-r
                  from-[#7a5526]
                  via-[#b88724]
                  to-[#d4af37]
                  py-3
                  font-bold
                  text-white
                "
              >
                + افزودن محصول آموزشی
              </button>


              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/vendor/service/create?source=private-teacher&vendorId=${vendorId}`
                  )
                }
                className="
                  rounded-2xl
                  border
                  border-[#d4af37]
                  bg-yellow-50
                  py-3
                  font-bold
                  text-[#7a5526]
                "
              >
                + افزودن کلاس یا خدمت
              </button>

            </div>

          ) : (

            <div
              className="
                mt-4
                text-center
                text-xs
                font-bold
                text-red-500
              "
            >
              برای بسته معلم خصوصی هنوز پنجره کالا و خدمت ثبت نشده است
            </div>

          )}

        </section>
        )}


        {/* کالاهای معلم خصوصی */}
<section
  className="
    rounded-3xl
    bg-white
    p-5
    shadow
  "
>
  <div
    className="
      mb-4
      flex
      items-center
      justify-between
    "
  >
    <div>
      <h3
        className="
          font-black
          text-[#6f4a18]
        "
      >
        کالاهای معلم خصوصی
      </h3>

      <p
        className="
          mt-1
          text-xs
          text-gray-400
        "
      >
        محصولات و کالاهای ارائه‌شده توسط معلم خصوصی
      </p>
    </div>

    <span
      className="
        rounded-full
        bg-yellow-50
        px-3
        py-1
        text-xs
        font-bold
        text-yellow-700
      "
    >
      {products.length} کالا
    </span>
  </div>

  <div
    className="
      relative
      z-10
      mx-auto
      mt-6
      grid
      max-w-5xl
      grid-cols-2
      gap-3
      sm:grid-cols-3
      sm:gap-4
      lg:grid-cols-4
      lg:gap-6
    "
  >
    {products.map((product) => (
      <div
        key={product.id}
        className="flex flex-col gap-2"
      >
        <ProductCard
          product={product}
          source="vendor-shop"
          showFavorite={false}
        />

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() =>
              navigate(
                `/vendor/product/edit/${product.id}?source=private-teacher&vendorId=${vendorId}`
              )
            }
            className="
              flex
              items-center
              justify-center
              gap-1
              rounded-xl
              bg-yellow-50
              py-2
              text-xs
              font-bold
              text-yellow-700
              shadow-sm
              transition
              hover:bg-yellow-100
            "
          >
            <Pencil size={14} />
            ویرایش
          </button>

          <button
            type="button"
            onClick={() =>
              handleDeleteProduct(product.id)
            }
            className="
              flex
              items-center
              justify-center
              gap-1
              rounded-xl
              bg-red-50
              py-2
              text-xs
              font-bold
              text-red-600
              shadow-sm
              transition
              hover:bg-red-100
            "
          >
            <Trash2 size={14} />
            حذف
          </button>
        </div>

        {product.status === "PUBLISHED" ? (
          <button
            type="button"
            onClick={() =>
              handleUnpublishProduct(product.id)
            }
            className="
              w-full
              rounded-xl
              bg-orange-50
              py-2
              text-xs
              font-bold
              text-orange-600
              shadow-sm
              transition
              hover:bg-orange-100
            "
          >
            عدم انتشار محصول
          </button>
        ) : (
          <button
            type="button"
            onClick={() =>
              handlePublishProduct(product.id)
            }
            className="
              w-full
              rounded-xl
              bg-green-600
              py-2
              text-xs
              font-bold
              text-white
              shadow-sm
              transition
              hover:bg-green-700
            "
          >
            انتشار محصول
          </button>
        )}
      </div>
    ))}
  </div>
</section>

{/* =====================================================
    جلسات و خدمات آموزشی
===================================================== */}

<section
  className="
    rounded-3xl
    bg-white
    p-5
    shadow
  "
>
  <div
    className="
      mb-4
      flex
      items-center
      justify-between
    "
  >
    <div>
      <h3
        className="
          font-black
          text-[#6f4a18]
        "
      >
        جلسات و خدمات آموزشی
      </h3>

      <p
        className="
          mt-1
          text-xs
          text-gray-400
        "
      >
        جلسه رفع اشکال، مشاوره تحصیلی، آزمون و خدمات تک‌جلسه‌ای
      </p>
    </div>

    <span
      className="
        rounded-full
        bg-yellow-50
        px-3
        py-1
        text-xs
        font-bold
        text-yellow-700
      "
    >
      {eventServices.length} خدمت
    </span>
  </div>


  {loadingServices ? (

    <div
      className="
        rounded-2xl
        bg-[#faf7ef]
        py-10
        text-center
        text-sm
        font-bold
        text-gray-400
      "
    >
      در حال دریافت خدمات...
    </div>

  ) : eventServices.length === 0 ? (

    <div
      className="
        rounded-2xl
        border
        border-dashed
        border-yellow-200
        bg-yellow-50/40
        py-10
        text-center
        text-sm
        text-gray-400
      "
    >
      هنوز خدمتی ثبت نشده است.
    </div>

  ) : (

    <div
      className="
        grid
        grid-cols-2
        gap-3
        sm:grid-cols-3
        sm:gap-4
        lg:grid-cols-4
        lg:gap-6
      "
    >
      {eventServices.map((service) => {

        const typeLabels = {
          EVENT: "جشن و رویداد",
          CLASS: "کلاس",
          WORKSHOP: "کارگاه",
          CAMP: "اردو",
          CONSULTATION: "مشاوره",
          OTHER: "سایر خدمات",
        };

        const serviceImages =
          Array.isArray(service.images)
            ? service.images
            : [];

        const mainImage =
          serviceImages[
            Number(service.mainImageIndex || 0)
          ] ||
          serviceImages[0] ||
          "";

        const startDateText =
          service.startAt
            ? new Date(service.startAt).toLocaleString(
                "fa-IR",
                {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )
            : "زمان ثبت نشده";

        return (
          <div
            key={service.id}
            className="flex flex-col gap-2"
          >

            {/* خود کارت */}
            <div
              className="
                overflow-hidden
                rounded-3xl
                border
                border-yellow-100
                bg-white
                shadow-sm
                transition
                hover:shadow-md
              "
            >

              {/* تصویر */}
              <div
                className="
                  relative
                  h-40
                  bg-yellow-50
                "
              >
                {mainImage ? (
                  <img
                    src={mainImage}
                    alt={
                      service.title ||
                      "خدمت معلم خصوصی"
                    }
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-full
                      items-center
                      justify-center
                      text-4xl
                    "
                  >
                    🎓
                  </div>
                )}

                {/* نوع خدمت */}
                <span
                  className="
                    absolute
                    right-3
                    top-3
                    rounded-full
                    bg-white/90
                    px-3
                    py-1
                    text-[10px]
                    font-black
                    text-[#7a5526]
                    shadow
                  "
                >
                  {typeLabels[
                    service.serviceType
                  ] || "خدمت"}
                </span>

                {/* وضعیت انتشار */}
                <span
                  className={`
                    absolute
                    left-3
                    top-3
                    rounded-full
                    px-3
                    py-1
                    text-[10px]
                    font-black
                    shadow

                    ${
                      service.status === "PUBLISHED"
                        ? "bg-green-600 text-white"
                        : "bg-gray-700 text-white"
                    }
                  `}
                >
                  {service.status === "PUBLISHED"
                    ? "منتشرشده"
                    : "پیش‌نویس"}
                </span>
              </div>


              {/* اطلاعات کارت */}
              <div className="p-4">

                <h4
                  className="
                    line-clamp-1
                    font-black
                    text-[#5f3e16]
                  "
                >
                  {service.title}
                </h4>

                <p
                  className="
                    mt-1
                    line-clamp-1
                    text-[11px]
                    font-bold
                    text-[#a77725]
                  "
                >
                  برگزارکننده:{" "}
                  {teacher.fullName ||
                    "معلم خصوصی"}
                </p>

                <p
                  className="
                    mt-2
                    text-xs
                    text-gray-400
                  "
                >
                  {startDateText}
                </p>

                <div
                  className="
                    mt-3
                    flex
                    items-center
                    justify-between
                    gap-2
                  "
                >
                  <span
                    className="
                      text-xs
                      font-bold
                      text-gray-500
                    "
                  >
                    ظرفیت:{" "}
                    {service.capacity || 0} نفر
                  </span>

                  <span
                    className="
                      text-xs
                      font-black
                      text-[#7a5526]
                    "
                  >
                    {service.isFree
                      ? "رایگان"
                      : `${Number(
                          service.price || 0
                        ).toLocaleString(
                          "fa-IR"
                        )} ریال`}
                  </span>
                </div>

                {service.locationName && (
                  <p
                    className="
                      mt-2
                      line-clamp-1
                      text-xs
                      text-gray-400
                    "
                  >
                    محل:{" "}
                    {service.locationName}
                  </p>
                )}

              </div>
            </div>


            {/* ویرایش + حذف */}
            <div className="grid grid-cols-2 gap-2">

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/vendor/service/edit/${service.id}?source=private-teacher&vendorId=${vendorId}&mode=${service.scheduleMode}`
                  )
                }
                className="
                  flex
                  items-center
                  justify-center
                  gap-1
                  rounded-xl
                  bg-yellow-50
                  py-2
                  text-xs
                  font-bold
                  text-yellow-700
                  shadow-sm
                  transition
                  hover:bg-yellow-100
                "
              >
                <Pencil size={14}/>
                ویرایش
              </button>

              <button
                type="button"
                onClick={() =>
                  handleDeleteService(
                    service.id
                  )
                }
                className="
                  flex
                  items-center
                  justify-center
                  gap-1
                  rounded-xl
                  bg-red-50
                  py-2
                  text-xs
                  font-bold
                  text-red-600
                  shadow-sm
                  transition
                  hover:bg-red-100
                "
              >
                <Trash2 size={14}/>
                حذف
              </button>

            </div>


            {/* انتشار / عدم انتشار */}
            {service.status === "PUBLISHED" ? (

              <button
                type="button"
                onClick={() =>
                  handleUnpublishService(
                    service.id
                  )
                }
                className="
                  w-full
                  rounded-xl
                  bg-orange-50
                  py-2
                  text-xs
                  font-bold
                  text-orange-600
                  shadow-sm
                  transition
                  hover:bg-orange-100
                "
              >
                عدم انتشار خدمت
              </button>

            ) : (

              <button
                type="button"
                onClick={() =>
                  handlePublishService(
                    service.id
                  )
                }
                className="
                  w-full
                  rounded-xl
                  bg-green-600
                  py-2
                  text-xs
                  font-bold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-green-700
                "
              >
                انتشار خدمت
              </button>

            )}

          </div>
        );
      })}
    </div>
  )}
</section>


{/* =====================================================
    دوره‌ها و کلاس‌های خصوصی
===================================================== */}

<section
  className="
    rounded-3xl
    bg-white
    p-5
    shadow
  "
>
  <div
    className="
      mb-4
      flex
      items-center
      justify-between
    "
  >
    <div>
      <h3
        className="
          font-black
          text-[#6f4a18]
        "
      >
        دوره‌ها و کلاس‌های خصوصی
      </h3>

      <p
        className="
          mt-1
          text-xs
          text-gray-400
        "
      >
        دوره‌های آموزشی چندجلسه‌ای و کلاس‌های خصوصی
      </p>
    </div>

    <span
      className="
        rounded-full
        bg-yellow-50
        px-3
        py-1
        text-xs
        font-bold
        text-yellow-700
      "
    >
      {courseServices.length} دوره
    </span>
  </div>


  {loadingServices ? (

    <div
      className="
        rounded-2xl
        bg-[#faf7ef]
        py-10
        text-center
        text-sm
        font-bold
        text-gray-400
      "
    >
      در حال دریافت دوره‌ها...
    </div>

  ) : courseServices.length === 0 ? (

    <div
      className="
        rounded-2xl
        border
        border-dashed
        border-yellow-200
        bg-yellow-50/40
        py-10
        text-center
        text-sm
        text-gray-400
      "
    >
      هنوز دوره‌ای ثبت نشده است.
    </div>

  ) : (

    <div
      className="
        grid
        grid-cols-2
        gap-3
        sm:grid-cols-3
        sm:gap-4
        lg:grid-cols-4
        lg:gap-6
      "
    >
      {courseServices.map((service) => {

        const typeLabels = {
          EVENT: "جشن و رویداد",
          CLASS: "کلاس",
          WORKSHOP: "کارگاه",
          CAMP: "اردو",
          CONSULTATION: "مشاوره",
          OTHER: "سایر خدمات",
        };

        const serviceImages =
          Array.isArray(service.images)
            ? service.images
            : [];

        const mainImage =
          serviceImages[
            Number(service.mainImageIndex || 0)
          ] ||
          serviceImages[0] ||
          "";

        const packageStartDate =
          service.package?.startDate
            ? new Date(
                service.package.startDate
              ).toLocaleDateString(
                "fa-IR",
                {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }
              )
            : "ثبت نشده";

        const startDateText =
          service.scheduleMode === "PACKAGE"
            ? `شروع دوره: ${packageStartDate} | ${
                service.package?.totalSessions ||
                0
              } جلسه`
            : service.startAt
              ? new Date(
                  service.startAt
                ).toLocaleString(
                  "fa-IR",
                  {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )
              : "زمان ثبت نشده";

        return (
          <div
            key={service.id}
            className="flex flex-col gap-2"
          >

            {/* خود کارت */}
            <div
              className="
                overflow-hidden
                rounded-3xl
                border
                border-yellow-100
                bg-white
                shadow-sm
                transition
                hover:shadow-md
              "
            >

              {/* تصویر */}
              <div
                className="
                  relative
                  h-40
                  bg-yellow-50
                "
              >
                {mainImage ? (
                  <img
                    src={mainImage}
                    alt={
                      service.title ||
                      "دوره معلم خصوصی"
                    }
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-full
                      items-center
                      justify-center
                      text-4xl
                    "
                  >
                    📚
                  </div>
                )}

                {/* نوع */}
                <span
                  className="
                    absolute
                    right-3
                    top-3
                    rounded-full
                    bg-white/90
                    px-3
                    py-1
                    text-[10px]
                    font-black
                    text-[#7a5526]
                    shadow
                  "
                >
                  {typeLabels[
                    service.serviceType
                  ] || "دوره"}
                </span>

                {/* وضعیت انتشار */}
                <span
                  className={`
                    absolute
                    left-3
                    top-3
                    rounded-full
                    px-3
                    py-1
                    text-[10px]
                    font-black
                    shadow

                    ${
                      service.status === "PUBLISHED"
                        ? "bg-green-600 text-white"
                        : "bg-gray-700 text-white"
                    }
                  `}
                >
                  {service.status === "PUBLISHED"
                    ? "منتشرشده"
                    : "پیش‌نویس"}
                </span>
              </div>


              {/* اطلاعات */}
              <div className="p-4">

                <h4
                  className="
                    line-clamp-1
                    font-black
                    text-[#5f3e16]
                  "
                >
                  {service.title}
                </h4>

                <p
                  className="
                    mt-1
                    line-clamp-1
                    text-[11px]
                    font-bold
                    text-[#a77725]
                  "
                >
                  برگزارکننده:{" "}
                  {teacher.fullName ||
                    "معلم خصوصی"}
                </p>

                <p
                  className="
                    mt-2
                    text-xs
                    text-gray-400
                  "
                >
                  {startDateText}
                </p>

                <div
                  className="
                    mt-3
                    flex
                    items-center
                    justify-between
                    gap-2
                  "
                >
                  <span
                    className="
                      text-xs
                      font-bold
                      text-gray-500
                    "
                  >
                    ظرفیت:{" "}
                    {service.capacity || 0} نفر
                  </span>

                  <span
                    className="
                      text-xs
                      font-black
                      text-[#7a5526]
                    "
                  >
                    {service.isFree
                      ? "رایگان"
                      : `${Number(
                          service.price || 0
                        ).toLocaleString(
                          "fa-IR"
                        )} ریال`}
                  </span>
                </div>

                {service.locationName && (
                  <p
                    className="
                      mt-2
                      line-clamp-1
                      text-xs
                      text-gray-400
                    "
                  >
                    محل:{" "}
                    {service.locationName}
                  </p>
                )}

              </div>
            </div>


            {/* ویرایش + حذف */}
            <div className="grid grid-cols-2 gap-2">

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/vendor/service/edit/${service.id}?source=private-teacher&vendorId=${vendorId}&mode=${service.scheduleMode}`
                  )
                }
                className="
                  flex
                  items-center
                  justify-center
                  gap-1
                  rounded-xl
                  bg-yellow-50
                  py-2
                  text-xs
                  font-bold
                  text-yellow-700
                  shadow-sm
                  transition
                  hover:bg-yellow-100
                "
              >
                <Pencil size={14}/>
                ویرایش
              </button>

              <button
                type="button"
                onClick={() =>
                  handleDeleteService(
                    service.id
                  )
                }
                className="
                  flex
                  items-center
                  justify-center
                  gap-1
                  rounded-xl
                  bg-red-50
                  py-2
                  text-xs
                  font-bold
                  text-red-600
                  shadow-sm
                  transition
                  hover:bg-red-100
                "
              >
                <Trash2 size={14}/>
                حذف
              </button>

            </div>


            {/* انتشار / عدم انتشار */}
            {service.status === "PUBLISHED" ? (

              <button
                type="button"
                onClick={() =>
                  handleUnpublishService(
                    service.id
                  )
                }
                className="
                  w-full
                  rounded-xl
                  bg-orange-50
                  py-2
                  text-xs
                  font-bold
                  text-orange-600
                  shadow-sm
                  transition
                  hover:bg-orange-100
                "
              >
                عدم انتشار خدمت
              </button>

            ) : (

              <button
                type="button"
                onClick={() =>
                  handlePublishService(
                    service.id
                  )
                }
                className="
                  w-full
                  rounded-xl
                  bg-green-600
                  py-2
                  text-xs
                  font-bold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-green-700
                "
              >
                انتشار خدمت
              </button>

            )}

          </div>
        );
      })}
    </div>
  )}
</section>


        {/* =====================================================
            معرفی
        ===================================================== */}

        <FormCard
          title="معرفی معلم خصوصی"
          icon={
            <UserRound
              size={19}
            />
          }
        >

          <SimpleInput
            label="نام و نام خانوادگی"
            value={
              teacher.fullName
            }
            onChange={(
              value
            ) =>
              updateField(
                "fullName",
                value
              )
            }
            error={
              validationErrors
                .fullName
            }
            readOnly={!isVendorOwner}
          />


          <SimpleInput
  label="شعار یا معرفی کوتاه"
  value={teacher.slogan}
  onChange={(value) =>
    updateField("slogan", value)
  }
  error={validationErrors.slogan}
  readOnly={!isVendorOwner}
/>


          <SimpleTextArea
  label="درباره من"
  value={teacher.description}
  onChange={(value) =>
    updateField("description", value)
  }
  readOnly={!isVendorOwner}
/>

        </FormCard>


        {/* =====================================================
            تماس و محدوده
        ===================================================== */}

        <FormCard
          title="اطلاعات تماس و محدوده فعالیت"
          icon={
            <MapPin
              size={19}
            />
          }
        >

          <SimpleInput
  label="شهر محل فعالیت"
  value={teacher.city}
  onChange={(value) =>
    updateField("city", value)
  }
  error={validationErrors.city}
  readOnly={!isVendorOwner}
/>


          <SimpleInput
  label="منطقه فعالیت"
  value={teacher.district}
  onChange={(value) =>
    updateField("district", value)
  }
  error={validationErrors.district}
  readOnly={!isVendorOwner}
/>


          <SimpleTextArea
  label="آدرس محل تدریس - در صورت وجود"
  value={teacher.address}
  onChange={(value) =>
    updateField("address", value)
  }
  readOnly={!isVendorOwner}
/>


          <SimpleInput
  label="شماره تماس"
  value={teacher.phone}
  onChange={(value) =>
    updateField("phone", value)
  }
  error={validationErrors.phone}
  readOnly={!isVendorOwner}
/>


          <SimpleInput
  label="ایمیل"
  value={teacher.email}
  onChange={(value) =>
    updateField("email", value)
  }
  error={validationErrors.email}
  readOnly={!isVendorOwner}
/>

        </FormCard>


        {/* =====================================================
            دانش‌آموزان
        ===================================================== */}

        <FormCard
          title="شرایط پذیرش دانش‌آموز"
          icon={
            <UsersRound
              size={19}
            />
          }
        >

          <SimpleSelect
  label="جنسیت قابل پذیرش"
  value={teacher.gender}
  options={[
    "دختر",
    "پسر",
    "دختر و پسر",
  ]}
  onChange={(value) =>
    updateField(
      "gender",
      value
    )
  }
  error={validationErrors.gender}
  readOnly={!isVendorOwner}
/>


          <div className="sm:col-span-2">

            <p className="text-sm font-bold text-gray-700">
              گروه‌های سنی
            </p>

            <ChipSelector
  options={AGE_OPTIONS}
  selected={teacher.acceptedAges}
  onToggle={(value) =>
    toggleArrayField(
      "acceptedAges",
      value
    )
  }
  readOnly={!isVendorOwner}
/>


            {validationErrors
              .acceptedAges && (

              <ErrorText>
                {
                  validationErrors
                    .acceptedAges
                }
              </ErrorText>

            )}

          </div>

        </FormCard>


        {/* =====================================================
            درس‌ها و مقاطع
        ===================================================== */}

        <FormCard
          title="دروس و حوزه‌های تدریس"
          icon={
            <BookOpen
              size={19}
            />
          }
        >

          <div className="sm:col-span-2">

            <p
              className="
                mt-3
                text-sm
                font-black
                text-[#6f4a18]
              "
            >
              دروس مدرسه
            </p>


           
<ChipSelector
  options={[
  ...TEACHING_FIELDS,
  ...customSchoolOptions,
]}
  selected={teacher.teachingFields}
  onToggle={(value) =>
    toggleArrayField("teachingFields", value)
  }
  readOnly={!isVendorOwner}
/>

            {isVendorOwner && (
  <ManualOptionInput
    value={customTeachingField}
    onChange={setCustomTeachingField}
    placeholder="مثلاً: فلسفه برای کودک"
    buttonText="افزودن درس"
    onAdd={() =>
  addCustomTeachingField(
    customTeachingField,
    setCustomTeachingField,
    setCustomSchoolOptions,
    "school"
  )
}
  />
)}


            {validationErrors
              .teachingFields && (

              <ErrorText>
                {
                  validationErrors
                    .teachingFields
                }
              </ErrorText>

            )}

          </div>

          <div className="sm:col-span-2">

            <p
              className="
                mt-3
                text-sm
                font-black
                text-[#6f4a18]
              "
            >
              زبان‌ها
            </p>


         
<ChipSelector
  options={[
  ...TEACHING_FIELDS2,
  ...customLanguageOptions,
]}
  selected={teacher.teachingFields}
  onToggle={(value) =>
    toggleArrayField("teachingFields", value)
  }
  readOnly={!isVendorOwner}
/>

 {isVendorOwner && (
  <ManualOptionInput
    value={customLanguageField}
    onChange={setCustomLanguageField}
    placeholder="مثلاً: زبان سوئدی"
    buttonText="افزودن زبان"
    onAdd={() =>
  addCustomTeachingField(
    customLanguageField,
    setCustomLanguageField,
    setCustomLanguageOptions,
    "languages"
  )
}
  />
)}         


            {validationErrors
              .educationLevels && (

              <ErrorText>
                {
                  validationErrors
                    .educationLevels
                }
              </ErrorText>

            )}

          </div>




          <div className="sm:col-span-2">

            <p
              className="
                mt-3
                text-sm
                font-black
                text-[#6f4a18]
              "
            >
              هنر
            </p>


  
<ChipSelector

options={[
  ...TEACHING_FIELDS3,
  ...customArtOptions,
]}
  selected={teacher.teachingFields}
  onToggle={(value) =>
    toggleArrayField("teachingFields", value)
  }
  readOnly={!isVendorOwner}
/>
{isVendorOwner && (
  <ManualOptionInput
    value={customArtField}
    onChange={setCustomArtField}
    placeholder="مثلاً: طراحی دیجیتال"
    buttonText="افزودن رشته هنری"
   onAdd={() =>
  addCustomTeachingField(
    customArtField,
    setCustomArtField,
    setCustomArtOptions,
    "arts"
  )
}
  />
)}


            {validationErrors
              .educationLevels && (

              <ErrorText>
                {
                  validationErrors
                    .educationLevels
                }
              </ErrorText>

            )}

          </div>




          <div className="sm:col-span-2">

            <p
              className="
                mt-3
                text-sm
                font-black
                text-[#6f4a18]
              "
            >
              ورزش
            </p>


  
<ChipSelector
  options={[
  ...TEACHING_FIELDS4,
  ...customSportOptions,
]}
  selected={teacher.teachingFields}
  onToggle={(value) =>
    toggleArrayField("teachingFields", value)
  }
  readOnly={!isVendorOwner}
/>
{isVendorOwner && (
  <ManualOptionInput
    value={customSportField}
    onChange={setCustomSportField}
    placeholder="مثلاً: پارکور"
    buttonText="افزودن رشته ورزشی"
    onAdd={() =>
  addCustomTeachingField(
    customSportField,
    setCustomSportField,
    setCustomSportOptions,
    "sports"
  )
}
  />
)}
            


            {validationErrors
              .educationLevels && (

              <ErrorText>
                {
                  validationErrors
                    .educationLevels
                }
              </ErrorText>

            )}

          </div>





          <div className="sm:col-span-2">

            <p
              className="
                mt-3
                text-sm
                font-black
                text-[#6f4a18]
              "
            >
              مهارت‌های تخصصی
            </p>


  
<ChipSelector
  options={[
  ...TEACHING_FIELDS5,
  ...customSkillOptions,
]}
  selected={teacher.teachingFields}
  onToggle={(value) =>
    toggleArrayField("teachingFields", value)
  }
  readOnly={!isVendorOwner}
/>
{isVendorOwner && (
  <ManualOptionInput
    value={customSkillField}
    onChange={setCustomSkillField}
    placeholder="مثلاً: طراحی سه‌بعدی"
    buttonText="افزودن مهارت"
    onAdd={() =>
  addCustomTeachingField(
    customSkillField,
    setCustomSkillField,
    setCustomSkillOptions,
    "skills"
  )
}
  />
)}
            


            {validationErrors
              .educationLevels && (

              <ErrorText>
                {
                  validationErrors
                    .educationLevels
                }
              </ErrorText>

            )}

          </div>




          <div className="sm:col-span-2">

            <p
              className="
                mt-3
                text-sm
                font-black
                text-[#6f4a18]
              "
            >
              آزمون‌ها و مهاجرت
            </p>


     
<ChipSelector
  options={[
  ...TEACHING_FIELDS6,
  ...customExamOptions,
]}
  selected={teacher.teachingFields}
  onToggle={(value) =>
    toggleArrayField("teachingFields", value)
  }
  readOnly={!isVendorOwner}
/>
{isVendorOwner && (
  <ManualOptionInput
    value={customExamField}
    onChange={setCustomExamField}
    placeholder="مثلاً: آزمون دولینگو"
    buttonText="افزودن آزمون"
    onAdd={() =>
  addCustomTeachingField(
    customExamField,
    setCustomExamField,
    setCustomExamOptions,
    "exams"
  )
}
  />
)}
            


            {validationErrors
              .educationLevels && (

              <ErrorText>
                {
                  validationErrors
                    .educationLevels
                }
              </ErrorText>

            )}

          </div>





          <div className="sm:col-span-2">

            <p
              className="
                mt-3
                text-sm
                font-black
                text-[#6f4a18]
              "
            >
              مقاطع تحصیلی
            </p>


            <ChipSelector
              options={[
  ...new Set([
    ...EDUCATION_LEVELS,
    ...teacher.educationLevels,
  ]),
]}
              selected={
                teacher.educationLevels
              }
              onToggle={(
                value
              ) =>
                toggleArrayField(
                  "educationLevels",
                  value
                )
              }
              readOnly={!isVendorOwner}
            />

            {isVendorOwner && (
            <ManualOptionInput
  value={
    customEducationLevel
  }
  onChange={
    setCustomEducationLevel
  }
  placeholder="مثلاً: المپیاد یا دوره تخصصی"
  buttonText="افزودن مقطع"
  onAdd={() =>
    addCustomOption(
      "educationLevels",
      customEducationLevel,
      setCustomEducationLevel
    )
  }
/>
)}


            {validationErrors
              .educationLevels && (

              <ErrorText>
                {
                  validationErrors
                    .educationLevels
                }
              </ErrorText>

            )}

          </div>


          <div className="sm:col-span-2">

            <p
              className="
                mt-3
                text-sm
                font-black
                text-[#6f4a18]
              "
            >
              شیوه‌های تدریس
            </p>


            <ChipSelector
              options={[
  ...new Set([
    ...TEACHING_METHODS,
    ...teacher.teachingMethods,
  ]),
]}
              selected={
                teacher.teachingMethods
              }
              onToggle={(
                value
              ) =>
                toggleArrayField(
                  "teachingMethods",
                  value
                )
              }
              readOnly={!isVendorOwner}
            />

            {isVendorOwner && (
            <ManualOptionInput
  value={
    customTeachingMethod
  }
  onChange={
    setCustomTeachingMethod
  }
  placeholder="مثلاً: پروژه‌محور"
  buttonText="افزودن شیوه"
  onAdd={() =>
    addCustomOption(
      "teachingMethods",
      customTeachingMethod,
      setCustomTeachingMethod
    )
  }
/>
)}

          </div>

        </FormCard>


        {/* =====================================================
            تحصیلات و سابقه
        ===================================================== */}

        <FormCard
          title="تحصیلات و سوابق حرفه‌ای"
          icon={
            <GraduationCap
              size={19}
            />
          }
        >

          <SimpleInput
  label="مدرک تحصیلی"
  value={teacher.education}
  onChange={(value) =>
    updateField("education", value)
  }
  readOnly={!isVendorOwner}
/>

<SimpleInput
  label="دانشگاه"
  value={teacher.university}
  onChange={(value) =>
    updateField("university", value)
  }
  readOnly={!isVendorOwner}
/>

<SimpleInput
  label="رشته و تخصص"
  value={teacher.specialty}
  onChange={(value) =>
    updateField("specialty", value)
  }
  readOnly={!isVendorOwner}
/>

<SimpleSelect
  label="سابقه تدریس"
  value={teacher.teachingExperience}
  options={EXPERIENCE_OPTIONS}
  onChange={(value) =>
    updateField("teachingExperience", value)
  }
  readOnly={!isVendorOwner}
/>

        </FormCard>


        {/* =====================================================
            روزها و ساعت‌ها
        ===================================================== */}

        <section
          className={`
            rounded-3xl
            bg-white
            p-5
            shadow

            ${
              validationErrors
                .workingSchedule
                ? "border-2 border-red-300"
                : ""
            }
          `}
        >

          <div
            className="
              flex
              items-center
              justify-between
              gap-3
            "
          >

            <div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <Clock3
                  size={19}
                  className="text-[#6f4a18]"
                />

                <h2
                  className="
                    font-black
                    text-[#6f4a18]
                  "
                >
                  روزها و ساعات تدریس
                </h2>

              </div>


              <p
                className="
                  mt-2
                  text-xs
                  leading-6
                  text-gray-500
                "
              >
                زمان‌های معمولی که امکان برگزاری کلاس دارید مشخص کنید.
              </p>

            </div>


            {isVendorOwner && (
  <button
    type="button"
    onClick={addWorkingSchedule}
    className="
      shrink-0
      rounded-xl
      bg-green-600
      px-3
      py-2
      text-xs
      font-bold
      text-white
    "
  >
    + افزودن برنامه
  </button>
)}

          </div>


          {teacher
            .workingSchedule
            .length === 0 ? (

            <EmptyBox
              text="هنوز برنامه تدریسی ثبت نشده است."
            />

          ) : (

            <div
              className="
                mt-5
                space-y-4
              "
            >

              {teacher
                .workingSchedule
                .map(
                  (
                    schedule,
                    index
                  ) => (

                  <div
                    key={
                      index
                    }
                    className="
                      rounded-2xl
                      border
                      border-yellow-100
                      bg-[#faf7ef]
                      p-4
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                      "
                    >

                      <p
                        className="
                          text-sm
                          font-black
                          text-[#6f4a18]
                        "
                      >
                        برنامه تدریس{" "}
                        {index + 1}
                      </p>


                      {isVendorOwner && (
  <button
    type="button"
    onClick={() =>
      removeWorkingSchedule(index)
    }
    className="
      flex
      items-center
      gap-1
      rounded-lg
      bg-red-50
      px-3
      py-1.5
      text-xs
      font-bold
      text-red-600
    "
  >
    <Trash2 size={14} />
    حذف
  </button>
)}

                    </div>


                    <div className="mt-4">

                      <p
                        className="
                          text-xs
                          font-bold
                          text-gray-500
                        "
                      >
                        روزهای این برنامه
                      </p>


                      <div
                        className="
                          mt-2
                          flex
                          flex-wrap
                          gap-2
                        "
                      >

                        {WEEK_DAYS.map(
                          (
                            day
                          ) => {

                            const selected =
                              schedule.days.includes(
                                day
                              );



                            return (

                              <button
                                key={
                                  day
                                }
                                type="button"
                               
                                onClick={() =>
                                  toggleScheduleDay(
                                    index,
                                    day
                                  )
                                }
                                className={`
                                  rounded-full
                                  border
                                  px-3
                                  py-2
                                  text-xs
                                  font-bold

                                  ${
  selected
    ? "border-yellow-500 bg-yellow-100 text-[#6f4a18]"
    : "bg-white text-gray-500"
}
                                `}
                              >
                                {day}
                              </button>

                            );
                          }
                        )}

                      </div>

                    </div>


                    <div
                      className="
                        mt-4
                        grid
                        grid-cols-2
                        gap-3
                      "
                    >

                      <TimeInput
                        label="ساعت شروع"
                        value={
                          schedule.openingTime
                        }
                        onChange={(
                          value
                        ) =>
                          updateScheduleTime(
                            index,
                            "openingTime",
                            value
                          )
                        }
                        readOnly={!isVendorOwner}
                      />


                      <TimeInput
                        label="ساعت پایان"
                        value={
                          schedule.closingTime
                        }
                        onChange={(
                          value
                        ) =>
                          updateScheduleTime(
                            index,
                            "closingTime",
                            value
                          )
                        }
                        readOnly={!isVendorOwner}
                      />

                    </div>


                    {schedule.days
                      .length > 0 &&
                      schedule.openingTime &&
                      schedule.closingTime && (

                      <div
                        className="
                          mt-4
                          rounded-xl
                          bg-white
                          px-3
                          py-2
                          text-center
                          text-xs
                          font-bold
                          text-[#7a5526]
                        "
                      >

                        {schedule.days.join(
                          "، "
                        )}

                        {" — "}

                        {
                          schedule.openingTime
                        }

                        {" تا "}

                        {
                          schedule.closingTime
                        }

                      </div>

                    )}

                  </div>

                ))}

            </div>

          )}


          {validationErrors
            .workingSchedule && (

            <ErrorText>
              {
                validationErrors
                  .workingSchedule
              }
            </ErrorText>

          )}

        </section>


        {/* =====================================================
            ظرفیت
        ===================================================== */}

        <FormCard
          title="ظرفیت پذیرش"
        >

          <SimpleInput
            label="حداکثر تعداد دانش‌آموز فعال"
            value={
              teacher.studentCapacity
            }
            onChange={(
              value
            ) =>
              updateField(
                "studentCapacity",
                value
              )
            }
            readOnly={!isVendorOwner}
          />

        </FormCard>


        {/* =====================================================
            آنلاین
        ===================================================== */}

        <ToggleDescriptionSection
          title="تدریس آنلاین"
          description="اگر امکان برگزاری کلاس آنلاین دارید این بخش را فعال کنید."
          enabled={
            teacher.hasOnlineTeaching
          }
          onToggle={() =>
            updateField(
              "hasOnlineTeaching",
              !teacher.hasOnlineTeaching
            )
          }
          enabledText="تدریس آنلاین انجام می‌شود."
          disabledText="تدریس آنلاین ارائه نمی‌شود."
          textareaLabel="توضیحات تدریس آنلاین"
          value={
            teacher.onlineDescription
          }
          onChange={(
            value
          ) =>
            updateField(
              "onlineDescription",
              value
            )
          }
          placeholder="مثلاً: کلاس‌های آنلاین به صورت تصویری و زنده برگزار می‌شوند."
          icon={
            <Laptop size={19} />
          }
          readOnly={!isVendorOwner}
        />


        {/* =====================================================
            منزل
        ===================================================== */}

        <ToggleDescriptionSection
          title="تدریس در منزل دانش‌آموز"
          description="اگر امکان حضور در منزل دانش‌آموز را دارید، محدوده و شرایط آن را مشخص کنید."
          enabled={
            teacher.hasHomeTeaching
          }
          onToggle={() =>
            updateField(
              "hasHomeTeaching",
              !teacher.hasHomeTeaching
            )
          }
          enabledText="امکان تدریس در منزل دانش‌آموز وجود دارد."
          disabledText="تدریس در منزل ارائه نمی‌شود."
          textareaLabel="محدوده و شرایط تدریس در منزل"
          value={
            teacher
              .homeTeachingDescription
          }
          onChange={(
            value
          ) =>
            updateField(
              "homeTeachingDescription",
              value
            )
          }
          placeholder="مثلاً: امکان تدریس در مناطق ۱، ۲، ۳ و ۵ تهران وجود دارد."
          readOnly={!isVendorOwner}
        />


        {/* =====================================================
            تعیین سطح
        ===================================================== */}

        <ToggleDescriptionSection
          title="ارزیابی و تعیین سطح"
          description="اگر قبل از شروع کلاس، سطح علمی دانش‌آموز را بررسی می‌کنید این بخش را فعال کنید."
          enabled={
            teacher.hasPlacementTest
          }
          onToggle={() =>
            updateField(
              "hasPlacementTest",
              !teacher.hasPlacementTest
            )
          }
          enabledText="ارزیابی یا تعیین سطح انجام می‌شود."
          disabledText="تعیین سطح اولیه انجام نمی‌شود."
          textareaLabel="توضیحات تعیین سطح"
          value={
            teacher
              .placementTestDescription
          }
          onChange={(
            value
          ) =>
            updateField(
              "placementTestDescription",
              value
            )
          }
          placeholder="مثلاً: قبل از شروع دوره یک جلسه کوتاه برای سنجش سطح دانش‌آموز برگزار می‌شود."
          readOnly={!isVendorOwner}
        />


        {/* =====================================================
            جلسه آزمایشی
        ===================================================== */}

        <ToggleDescriptionSection
          title="جلسه آزمایشی"
          description="اگر امکان جلسه آزمایشی یا جلسه آشنایی قبل از شروع همکاری وجود دارد این بخش را فعال کنید."
          enabled={
            teacher.hasTrialSession
          }
          onToggle={() =>
            updateField(
              "hasTrialSession",
              !teacher.hasTrialSession
            )
          }
          enabledText="جلسه آزمایشی یا آشنایی ارائه می‌شود."
          disabledText="جلسه آزمایشی ارائه نمی‌شود."
          textareaLabel="توضیحات جلسه آزمایشی"
          value={
            teacher
              .trialSessionDescription
          }
          onChange={(
            value
          ) =>
            updateField(
              "trialSessionDescription",
              value
            )
          }
          placeholder="مثلاً: جلسه اول ۳۰ دقیقه‌ای برای آشنایی با روش تدریس برگزار می‌شود."
          readOnly={!isVendorOwner}
        />


        {/* =====================================================
            منابع
        ===================================================== */}

        <ToggleDescriptionSection
          title="جزوه و منابع آموزشی"
          description="اگر جزوه، تمرین، نمونه سؤال یا منابع اختصاصی در اختیار دانش‌آموز قرار می‌دهید این بخش را فعال کنید."
          enabled={
            teacher
              .hasEducationalMaterials
          }
          onToggle={() =>
            updateField(
              "hasEducationalMaterials",
              !teacher
                .hasEducationalMaterials
            )
          }
          enabledText="منابع آموزشی اختصاصی ارائه می‌شود."
          disabledText="منبع آموزشی اختصاصی ثبت نشده است."
          textareaLabel="توضیحات منابع آموزشی"
          value={
            teacher
              .educationalMaterialsDescription
          }
          onChange={(
            value
          ) =>
            updateField(
              "educationalMaterialsDescription",
              value
            )
          }
          placeholder="مثلاً: جزوه اختصاصی، تمرین هفتگی و نمونه سؤالات امتحانی ارائه می‌شود."
          readOnly={!isVendorOwner}
        />


        {/* =====================================================
            گواهی
        ===================================================== */}

        <ToggleDescriptionSection
          title="گواهی پایان دوره"
          description="اگر برای بعضی دوره‌های آموزشی گواهی صادر می‌کنید این بخش را فعال کنید."
          enabled={
            teacher.hasCertificate
          }
          onToggle={() =>
            updateField(
              "hasCertificate",
              !teacher.hasCertificate
            )
          }
          enabledText="برای برخی دوره‌ها گواهی صادر می‌شود."
          disabledText="گواهی پایان دوره صادر نمی‌شود."
          textareaLabel="توضیحات گواهی"
          value={
            teacher
              .certificateDescription
          }
          onChange={(
            value
          ) =>
            updateField(
              "certificateDescription",
              value
            )
          }
          placeholder="شرایط صدور گواهی را توضیح دهید."
          readOnly={!isVendorOwner}
        />


        {/* =====================================================
            مدارک و افتخارات
        ===================================================== */}

        <section
          className="
            rounded-3xl
            bg-white
            p-5
            shadow
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
              gap-3
            "
          >

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <ShieldCheck
                size={19}
                className="text-[#6f4a18]"
              />

              <h2
                className="
                  font-black
                  text-[#6f4a18]
                "
              >
                مدارک، افتخارات و سوابق
              </h2>

            </div>


            {isVendorOwner && (
  <button
    type="button"
    onClick={addAchievementOrLicense}
    className="
      rounded-xl
      bg-green-600
      px-3
      py-2
      text-xs
      font-bold
      text-white
    "
  >
    + افزودن مورد
  </button>
)}

          </div>


          {teacher
            .achievementsAndLicenses
            .length === 0 ? (

            <EmptyBox
              text="هنوز مدرک یا افتخاری ثبت نشده است."
            />

          ) : (

            <div
              className="
                mt-5
                space-y-3
              "
            >

              {teacher
                .achievementsAndLicenses
                .map(
                  (
                    item
                  ) => (

                  <div
                    key={
                      item.id
                    }
                    className="
                      rounded-2xl
                      border
                      border-yellow-100
                      bg-[#faf7ef]
                      p-4
                    "
                  >

                    <div
                      className="
                        flex
                        gap-2
                      "
                    >

                      <input
                        value={
                          item.title
                        }
                        readOnly={!isVendorOwner}
                        onChange={(
                          e
                        ) =>
                          updateAchievementOrLicense(
                            item.id,
                            "title",
                            e.target.value
                          )
                        }
                        placeholder="عنوان مدرک یا افتخار"
                        className="
                          h-11
                          flex-1
                          rounded-xl
                          border
                          bg-white
                          px-3
                          text-sm
                        "
                      />


                      {isVendorOwner && (
  <button
    type="button"
    onClick={() =>
      removeAchievementOrLicense(
        item.id
      )
    }
    className="
      rounded-xl
      bg-red-50
      px-3
      text-red-600
    "
  >
    <Trash2 size={16} />
  </button>
)}

                    </div>


                    <textarea
                      value={
                        item.description
                      }
                      readOnly={!isVendorOwner}
                      onChange={(
                        e
                      ) =>
                        updateAchievementOrLicense(
                          item.id,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="توضیحات"
                      className="
                        mt-3
                        min-h-20
                        w-full
                        rounded-xl
                        border
                        bg-white
                        p-3
                        text-sm
                      "
                    />

                  </div>

                ))}

            </div>

          )}

        </section>


        {/* =====================================================
            رزومه
        ===================================================== */}

        <FormCard
          title="معرفی و رزومه حرفه‌ای"
        >

          <div className="sm:col-span-2">

            <p
              className="
                mb-4
                text-xs
                leading-6
                text-gray-500
              "
            >
              درباره تجربه تدریس، روش آموزشی، نتایج دانش‌آموزان، سوابق علمی، دوره‌های تخصصی و نقاط قوت خود توضیح دهید.
            </p>

          </div>


          <SimpleTextArea
  label="رزومه"
  value={teacher.resume}
  onChange={(value) =>
    updateField(
      "resume",
      value
    )
  }
  readOnly={!isVendorOwner}
/>

        </FormCard>


        {/* =====================================================
            دستاورد دانش‌آموزان
        ===================================================== */}
{isVendorOwner && (
        <section
          className="
            rounded-3xl
            bg-white
            p-5
            shadow
          "
        >

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <Award
              size={21}
              className="text-yellow-700"
            />

            <h2
              className="
                font-black
                text-[#6f4a18]
              "
            >
              دستاوردهای دانش‌آموزان
            </h2>

          </div>


          <p
            className="
              mt-2
              text-xs
              leading-6
              text-gray-500
            "
          >
            می‌توانید برای دانش‌آموزان ژنینویی که با شما آموزش می‌بینند دستاورد صادر کنید.
          </p>


          <div
            className="
              mt-4
              grid
              grid-cols-3
              gap-2
            "
          >

            <CounterBox
              title="مجوز خریداری‌شده"
              value={
                packageAchievementLimit
              }
            />

            <CounterBox
              title="استفاده‌شده"
              value={
                achievementUsedCount
              }
            />

            <CounterBox
              title="باقی‌مانده"
              value={
                remainingAchievementCount
              }
              green={
                remainingAchievementCount >
                0
              }
            />

          </div>


          {packageAchievementLimit <=
            0 && (

            <div
              className="
                mt-3
                rounded-xl
                bg-red-50
                px-3
                py-2
                text-center
                text-xs
                font-bold
                text-red-500
              "
            >
              در بسته معلم خصوصی مجوز صدور دستاورد ثبت نشده است
            </div>

          )}


          <PrivateTeacherStudentsSection
  selectedStudents={
    teacher.children
  }
  onChange={(value) =>
    updateField(
      "children",
      value
    )
  }
  onGiveAchievement={(child) =>
    setSelectedAchievementChild(
      child
    )
  }
/>


          {selectedAchievementChild && (

            <div
              className="
                mt-4
                rounded-2xl
                border
                border-yellow-200
                bg-yellow-50
                p-5
              "
            >

              <h3
                className="
                  text-center
                  font-black
                  text-[#6f4a18]
                "
              >
                اهدای دستاورد برای:{" "}
                {
                  selectedAchievementChild
                    .fullName
                }
              </h3>


              <select
  value={achievementForm.category}
  onChange={(e) =>
    setAchievementForm((prev) => ({
      ...prev,
      category: e.target.value,
    }))
  }
  className="
    mt-4
    h-11
    w-full
    rounded-xl
    border
    bg-white
    px-3
    text-sm
  "
>
  <option value="">
    انتخاب نوع دستاورد
  </option>

  <option value="ART">
    دستاورد هنری
  </option>

  <option value="SPORT">
    دستاورد ورزشی
  </option>

  <option value="RESEARCH">
    دستاورد پرورشی
  </option>

  <option value="SCIENCE">
    دستاورد علمی
  </option>

  <option value="MORAL">
    دستاورد معنوی
  </option>
</select>


              <input
                value={
                  achievementForm.title
                }
                onChange={(
                  e
                ) =>
                  setAchievementForm(
                    (
                      prev
                    ) => ({
                      ...prev,

                      title:
                        e.target.value,
                    })
                  )
                }
                placeholder="عنوان دستاورد"
                className="
                  mt-4
                  h-11
                  w-full
                  rounded-xl
                  border
                  bg-white
                  px-3
                  text-sm
                "
              />


              <textarea
                value={
                  achievementForm.description
                }
                onChange={(
                  e
                ) =>
                  setAchievementForm(
                    (
                      prev
                    ) => ({
                      ...prev,

                      description:
                        e.target.value,
                    })
                  )
                }
                placeholder="توضیحات دستاورد"
                className="
                  mt-3
                  min-h-24
                  w-full
                  rounded-xl
                  border
                  bg-white
                  p-3
                  text-sm
                "
              />


              <div
                className="
                  mt-4
                  flex
                  gap-2
                "
              >

                <button
  type="button"
  onClick={
    handleCreateAchievement
  }
                  className="
                    flex-1
                    rounded-xl
                    bg-green-600
                    py-3
                    font-bold
                    text-white
                  "
                >
                  صدور دستاورد
                </button>


                <button
                  type="button"
                  onClick={() =>
                    setSelectedAchievementChild(
                      null
                    )
                  }
                  className="
                    rounded-xl
                    bg-white
                    px-4
                    font-bold
                    text-gray-500
                  "
                >
                  انصراف
                </button>

              </div>

            </div>

          )}

        </section>
        )}


        {/* =====================================================
            ذخیره
        ===================================================== */}

        {isVendorOwner && (
  <button
    type="button"
    onClick={handleSave}
    disabled={saving}
    className="
      flex
      w-full
      items-center
      justify-center
      gap-2
      rounded-2xl
      bg-green-600
      py-4
      font-black
      text-white
      shadow
      transition
      hover:bg-green-700
      disabled:opacity-60
    "
  >
    <Save size={18} />

    {saving
      ? "در حال ذخیره..."
      : "ذخیره اطلاعات معلم خصوصی"}
  </button>
)}

      </div>

    </main>

  );
}


// =========================================================
// کامپوننت‌ها
// =========================================================

function FormCard({
  title,
  icon,
  children,
}) {

  return (

    <section
      className="
        rounded-3xl
        bg-white
        p-5
        shadow
      "
    >

      <div
        className="
          mb-5
          flex
          items-center
          gap-2
          font-black
          text-[#6f4a18]
        "
      >

        {icon}

        <h2>
          {title}
        </h2>

      </div>


      <div
        className="
          grid
          gap-4
          sm:grid-cols-2
        "
      >
        {children}
      </div>

    </section>

  );
}


function SimpleInput({
  label,
  value,
  onChange,
  error = "",
  readOnly = false,
}) {

  return (

    <div>

      <label
        className="
          text-sm
          font-bold
          text-gray-700
        "
      >
        {label}
      </label>


      <input
        value={
          value || ""
        }
        readOnly={readOnly}
        onChange={(
          e
        ) =>
          onChange(
            e.target.value
          )
        }
        className={`
          mt-2
          h-11
          w-full
          rounded-xl
          border
          bg-white
          px-3
          text-sm
          outline-none

          ${
            error
              ? "border-red-400 bg-red-50"
              : "border-gray-200 focus:border-yellow-400"
          }
        `}
      />


      {error && (

        <ErrorText>
          {error}
        </ErrorText>

      )}

    </div>

  );
}


function SimpleTextArea({
  label,
  value,
  onChange,
  error = "",
  readOnly = false,
}) {

  return (

    <div className="sm:col-span-2">

      <label
        className="
          text-sm
          font-bold
          text-gray-700
        "
      >
        {label}
      </label>


      <textarea
        value={
          value || ""
        }
        readOnly={readOnly}
        onChange={(
          e
        ) =>
          onChange(
            e.target.value
          )
        }
        className={`
          mt-2
          min-h-24
          w-full
          rounded-xl
          border
          p-3
          text-sm
          outline-none

          ${
            error
              ? "border-red-400 bg-red-50"
              : "border-gray-200 focus:border-yellow-400"
          }
        `}
      />


      {error && (

        <ErrorText>
          {error}
        </ErrorText>

      )}

    </div>

  );
}


function SimpleSelect({
  label,
  value,
  options,
  onChange,
  error = "",
  readOnly = false,
}) {

  return (

    <div>

      <label
        className="
          text-sm
          font-bold
          text-gray-700
        "
      >
        {label}
      </label>


      <select
        value={
          value || ""
        }
        disabled={readOnly}
        onChange={(
          e
        ) =>
          onChange(
            e.target.value
          )
        }
        className={`
          mt-2
          h-11
          w-full
          rounded-xl
          border
          bg-white
          px-3
          text-sm
          outline-none

          ${
            error
              ? "border-red-400 bg-red-50"
              : "border-gray-200 focus:border-yellow-400"
          }
        `}
      >

        <option value="">
          انتخاب کنید
        </option>


        {options.map(
          (
            option
          ) => (

            <option
              key={
                option
              }
              value={
                option
              }
            >
              {option}
            </option>

          )
        )}

      </select>


      {error && (

        <ErrorText>
          {error}
        </ErrorText>

      )}

    </div>

  );
}


function TimeInput({
  label,
  value,
  onChange,
  readOnly = false,
}) {

  return (

    <div>

      <label
        className="
          text-xs
          font-bold
          text-gray-500
        "
      >
        {label}
      </label>


      <input
        type="time"
        disabled={readOnly}
        value={
          value || ""
        }
        onChange={(
          e
        ) =>
          onChange(
            e.target.value
          )
        }
        className="
          mt-2
          h-11
          w-full
          rounded-xl
          border
          border-gray-200
          bg-white
          px-3
          text-sm
          outline-none
          focus:border-yellow-400
        "
      />

    </div>

  );
}


function ChipSelector({
  options,
  selected,
  onToggle,
  readOnly = false,
}) {

  return (

    <div
      className="
        mt-3
        flex
        flex-wrap
        gap-2
      "
    >

      {options.map(
        (
          item
        ) => {

          const active =
            selected.includes(
              item
            );


          return (

            <button
  key={item}
  type="button"
  disabled={readOnly}
  onClick={() => {
    if (!readOnly) {
      onToggle(item);
    }
  }}
              className={`
                rounded-full
                border
                px-4
                py-2
                text-xs
                font-bold
                transition

                ${
                  active
                    ? "border-yellow-500 bg-yellow-100 text-[#6f4a18]"
                    : "border-gray-200 bg-white text-gray-500 hover:border-yellow-300"
                }
              `}
            >
              {item}
            </button>

          );
        }
      )}

    </div>

  );
}


function PublicTeachingFieldGroup({
  title,
  items = [],
}) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <div
      className="
        rounded-2xl
        border
        border-yellow-100
        bg-[#faf7ef]
        p-4
      "
    >
      <p
        className="
          mb-3
          text-sm
          font-black
          text-[#6f4a18]
        "
      >
        {title}
      </p>

      <PublicTeacherChips items={items} />
    </div>
  );
}


function ManualOptionInput({
  value,
  onChange,
  onAdd,
  placeholder,
  buttonText = "افزودن",
}) {

  const handleKeyDown = (
    e
  ) => {

    if (
      e.key === "Enter"
    ) {

      e.preventDefault();

      onAdd();
    }
  };


  return (

    <div
      className="
        mt-4
        flex
        flex-col
        gap-2
        sm:flex-row
      "
    >

      <input
        type="text"
        value={
          value
        }
        onChange={(
          e
        ) =>
          onChange(
            e.target.value
          )
        }
        onKeyDown={
          handleKeyDown
        }
        placeholder={
          placeholder
        }
        className="
          h-11
          flex-1
          rounded-xl
          border
          border-gray-200
          bg-white
          px-3
          text-sm
          outline-none
          transition
          focus:border-yellow-400
        "
      />


      <button
        type="button"
        onClick={
          onAdd
        }
        disabled={
          !String(
            value || ""
          ).trim()
        }
        className="
          h-11
          shrink-0
          rounded-xl
          bg-[#6f4a18]
          px-5
          text-sm
          font-bold
          text-white
          transition
          hover:bg-[#5d3d14]
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        + {buttonText}
      </button>

    </div>

  );
}


function CounterBox({
  title,
  value,
  green = false,
}) {

  return (

    <div
      className="
        rounded-2xl
        bg-[#faf7ef]
        p-3
        text-center
        shadow-sm
      "
    >

      <p
        className="
          text-[11px]
          text-gray-400
          sm:text-xs
        "
      >
        {title}
      </p>


      <p
        className={`
          mt-1
          text-lg
          font-black

          ${
            green
              ? "text-green-600"
              : "text-[#7a5526]"
          }
        `}
      >
        {value}
      </p>

    </div>

  );
}


function EmptyBox({
  text,
}) {

  return (

    <div
      className="
        mt-5
        rounded-2xl
        border
        border-dashed
        border-yellow-200
        bg-yellow-50/40
        px-4
        py-8
        text-center
        text-sm
        text-gray-400
      "
    >
      {text}
    </div>

  );
}


function ManagementSection({
  title,
  description,
  items = [],
  unit,
  emptyText,
  loading = false,
  type,
  navigate,
  isVendorOwner = false,
}) {
  return (
    <section
      className="
        rounded-3xl
        bg-white
        p-5
        shadow
      "
    >
      <div
        className="
          mb-4
          flex
          items-center
          justify-between
          gap-3
        "
      >
        <div>
          <h3
            className="
              font-black
              text-[#6f4a18]
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-1
              text-xs
              text-gray-400
            "
          >
            {description}
          </p>
        </div>

        <span
          className="
            rounded-full
            bg-yellow-50
            px-3
            py-1
            text-xs
            font-bold
            text-yellow-700
          "
        >
          {items.length} {unit}
        </span>
      </div>

      {loading ? (
        <div
          className="
            rounded-2xl
            bg-[#faf7ef]
            px-4
            py-8
            text-center
            text-sm
            text-gray-400
          "
        >
          در حال دریافت اطلاعات...
        </div>
      ) : items.length === 0 ? (
        <EmptyBox text={emptyText} />
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const image =
              item.images?.[0]?.url ||
              item.images?.[0] ||
              item.image ||
              item.coverImage ||
              "";

            const title =
              item.title ||
              item.name ||
              item.productName ||
              item.serviceName ||
              "بدون عنوان";

            const status =
              item.publishStatus ||
              item.status ||
              "";

            return (
              <div
                key={item.id}
                className="
                  flex
                  flex-col
                  gap-3
                  rounded-2xl
                  border
                  border-yellow-100
                  bg-[#faf7ef]
                  p-3
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-3
                  "
                >
                  {image ? (
                    <img
                      src={image}
                      alt={title}
                      className="
                        h-16
                        w-16
                        shrink-0
                        rounded-xl
                        object-cover
                      "
                    />
                  ) : (
                    <div
                      className="
                        flex
                        h-16
                        w-16
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-yellow-100
                        text-[#7a5526]
                      "
                    >
                      {type === "product" ? (
                        <BookOpen size={22} />
                      ) : (
                        <GraduationCap size={22} />
                      )}
                    </div>
                  )}

                  <div className="min-w-0">
                    <p
                      className="
                        truncate
                        text-sm
                        font-black
                        text-gray-700
                      "
                    >
                      {title}
                    </p>

                    {status && (
                      <p
                        className="
                          mt-1
                          text-xs
                          text-gray-400
                        "
                      >
                        وضعیت: {status}
                      </p>
                    )}

                    {item.price !== undefined &&
                      item.price !== null && (
                        <p
                          className="
                            mt-1
                            text-xs
                            font-bold
                            text-[#7a5526]
                          "
                        >
                          {Number(
                            item.price
                          ).toLocaleString(
                            "fa-IR"
                          )}{" "}
                          تومان
                        </p>
                      )}
                  </div>
                </div>

                <div
                  className="
                    flex
                    shrink-0
                    gap-2
                  "
                >
                  {isVendorOwner && (
  <button
    type="button"
    onClick={() => {
      if (type === "product") {
        navigate(
          `/vendor/product/edit/${item.id}`
        );
      } else {
        navigate(
          `/vendor/service/edit/${item.id}`
        );
      }
    }}
    className="
      flex-1
      rounded-xl
      bg-[#6f4a18]
      px-4
      py-2
      text-xs
      font-bold
      text-white
      sm:flex-none
    "
  >
    ویرایش
  </button>
)}

                  <button
                    type="button"
                    onClick={() => {
                      if (type === "product") {
                        navigate(
                          `/product/${item.id}`
                        );
                      } else if (
                        item.package ||
                        item.scheduleMode ===
                          "PACKAGE"
                      ) {
                        navigate(
                          `/course/${item.id}`
                        );
                      } else {
                        navigate(
                          `/service/${item.id}`
                        );
                      }
                    }}
                    className="
                      flex-1
                      rounded-xl
                      border
                      border-[#d4af37]
                      bg-white
                      px-4
                      py-2
                      text-xs
                      font-bold
                      text-[#7a5526]
                      sm:flex-none
                    "
                  >
                    مشاهده
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}


function ToggleDescriptionSection({
  title,
  description,
  enabled,
  onToggle,
  enabledText,
  disabledText,
  textareaLabel,
  value,
  onChange,
  placeholder,
  icon,
  readOnly = false,
}) {

  return (

    <section
      className="
        rounded-3xl
        bg-white
        p-5
        shadow
      "
    >

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >

        <div>

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            {icon}

            <h2
              className="
                font-black
                text-[#6f4a18]
              "
            >
              {title}
            </h2>

          </div>


          <p
            className="
              mt-2
              text-xs
              leading-6
              text-gray-500
            "
          >
            {description}
          </p>

        </div>


        <button
          type="button"
  onClick={onToggle}
  disabled={readOnly}
          className={`
            relative
            h-7
            w-14
            shrink-0
            rounded-full
            transition

            ${
              enabled
                ? "bg-green-600"
                : "bg-gray-200"
            }
          `}
        >

          <span
            className={`
              absolute
              top-1
              h-5
              w-5
              rounded-full
              bg-white
              shadow
              transition-all

              ${
                enabled
                  ? "left-1"
                  : "left-8"
              }
            `}
          />

        </button>

      </div>


      <div
        className={`
          mt-5
          rounded-2xl
          border
          p-4

          ${
            enabled
              ? "border-green-100 bg-green-50/40"
              : "border-gray-100 bg-gray-50"
          }
        `}
      >

        <div
          className="
            flex
            items-center
            justify-between
            gap-3
          "
        >

          <p
            className="
              text-xs
              text-gray-500
            "
          >
            {enabled
              ? enabledText
              : disabledText
            }
          </p>


          <span
            className={`
              rounded-full
              px-3
              py-1
              text-xs
              font-black

              ${
                enabled
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-500"
              }
            `}
          >
            {enabled
              ? "دارد"
              : "ندارد"
            }
          </span>

        </div>


        {enabled && (

          <div className="mt-4">

            <label
              className="
                text-xs
                font-bold
                text-gray-600
              "
            >
              {textareaLabel}
            </label>


            <textarea
              value={
                value || ""
              }
              readOnly={readOnly}
              onChange={(
                e
              ) =>
                onChange(
                  e.target.value
                )
              }
              placeholder={
                placeholder
              }
              className="
                mt-2
                min-h-28
                w-full
                rounded-xl
                border
                border-gray-200
                bg-white
                p-3
                text-sm
                leading-7
                outline-none
                focus:border-yellow-400
              "
            />

          </div>

        )}

      </div>

    </section>

  );
}


function ErrorText({
  children,
}) {

  return (

    <p
      className="
        mt-2
        rounded-xl
        bg-red-50
        px-3
        py-2
        text-xs
        font-bold
        text-red-500
      "
    >
      {children}
    </p>

  );
}

// =========================================================
// Public Private Teacher View
// =========================================================

function PublicPrivateTeacherView({
  teacher,
  products = [],
  services = [],
  loadingProducts = false,
  loadingServices = false,
}) {
  const navigate = useNavigate();

  const [activeImageIndex, setActiveImageIndex] =
    useState(0);

  const courseServices = services.filter(
    (service) =>
      service.package ||
      service.scheduleMode === "PACKAGE"
  );

  const eventServices = services.filter(
    (service) =>
      !service.package &&
      service.scheduleMode !== "PACKAGE"
  );

  const headerImages =
    Array.isArray(teacher?.headerImages)
      ? teacher.headerImages
      : [];

  return (
    <main
      dir="rtl"
      className="
        min-h-screen
        bg-[#faf7ef]
        px-3
        py-5
        sm:px-5
      "
    >
      <div
        className="
          mx-auto
          max-w-6xl
          space-y-5
        "
      >

        {/* =====================================================
            هدر و تصاویر
        ===================================================== */}

        <section
          className="
            overflow-hidden
            rounded-3xl
            bg-white
            p-4
            shadow
            sm:p-5
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-3xl
              overflow-hidden
              rounded-3xl
            "
          >
            {headerImages.length > 0 ? (
              <>
                <PromoSlider
                  variant="golden"
                  interval={7000}
                  height="h-44 sm:h-52 md:h-60 lg:h-64"
                  slides={headerImages.map(
                    (item, index) => ({
                      id: index,
                      image:
                        typeof item === "string"
                          ? item
                          : item?.url,
                      title: "",
                    })
                  )}
                  onIndexChange={setActiveImageIndex}
                />

                {headerImages[
                  activeImageIndex
                ]?.description && (
                  <div
                    className="
                      mt-3
                      rounded-2xl
                      bg-[#faf7ef]
                      px-4
                      py-3
                      text-center
                      text-sm
                      leading-7
                      text-gray-600
                    "
                  >
                    {
                      headerImages[
                        activeImageIndex
                      ].description
                    }
                  </div>
                )}
              </>
            ) : (
              <div
                className="
                  flex
                  h-52
                  items-center
                  justify-center
                  bg-gradient-to-r
                  from-yellow-100
                  to-yellow-200
                "
              >
                <UserRound
                  className="
                    h-16
                    w-16
                    text-yellow-700
                  "
                />
              </div>
            )}
          </div>

          {/* نام و معرفی کوتاه */}

          <div className="mt-5 text-center">

            <h1
              className="
                text-xl
                font-black
                text-[#6f4a18]
                sm:text-2xl
              "
            >
              {teacher?.fullName ||
                "معلم خصوصی"}
            </h1>

            {teacher?.slogan && (
              <p
                className="
                  mx-auto
                  mt-2
                  max-w-2xl
                  text-sm
                  leading-7
                  text-gray-500
                "
              >
                {teacher.slogan}
              </p>
            )}

            <div
              className="
                mt-4
                flex
                flex-wrap
                justify-center
                gap-2
              "
            >
              {teacher?.city && (
                <PublicTeacherBadge>
                  <MapPin size={14} />
                  {teacher.city}
                </PublicTeacherBadge>
              )}

              {teacher?.district && (
                <PublicTeacherBadge>
                  {teacher.district}
                </PublicTeacherBadge>
              )}

              {teacher?.teachingExperience && (
                <PublicTeacherBadge>
                  <GraduationCap size={14} />
                  {teacher.teachingExperience} سابقه تدریس
                </PublicTeacherBadge>
              )}
            </div>

          </div>
        </section>


        {/* =====================================================
            معرفی معلم
        ===================================================== */}

        {(teacher?.description ||
          teacher?.resume) && (
          <PublicTeacherSection
            title="درباره معلم"
            icon={<UserRound size={20} />}
          >
            {teacher.description && (
              <p
                className="
                  whitespace-pre-line
                  text-sm
                  leading-8
                  text-gray-600
                "
              >
                {teacher.description}
              </p>
            )}

            {teacher.resume && (
              <div
                className="
                  mt-4
                  rounded-2xl
                  bg-[#faf7ef]
                  p-4
                "
              >
                <p
                  className="
                    mb-2
                    text-sm
                    font-black
                    text-[#6f4a18]
                  "
                >
                  رزومه حرفه‌ای
                </p>

                <p
                  className="
                    whitespace-pre-line
                    text-sm
                    leading-8
                    text-gray-600
                  "
                >
                  {teacher.resume}
                </p>
              </div>
            )}
          </PublicTeacherSection>
        )}


        {/* =====================================================
            دروس و حوزه‌های تدریس
        ===================================================== */}

        {teacher?.teachingFields?.length > 0 && (
  <PublicTeacherSection
    title="دروس و حوزه‌های تدریس"
    icon={<BookOpen size={20} />}
  >
    <div className="grid gap-5 sm:grid-cols-2">

      <PublicTeachingFieldGroup
        title="دروس مدرسه"
        items={[
  ...teacher.teachingFields.filter((item) =>
    TEACHING_FIELDS.includes(item)
  ),
  ...(teacher.customTeachingFields?.school || []),
]}
      />

      <PublicTeachingFieldGroup
        title="زبان‌ها"
        items={[
  ...teacher.teachingFields.filter((item) =>
    TEACHING_FIELDS2.includes(item)
  ),
  ...(teacher.customTeachingFields?.languages || []),
]}
      />

      <PublicTeachingFieldGroup
        title="هنر"
        items={[
  ...teacher.teachingFields.filter((item) =>
    TEACHING_FIELDS3.includes(item)
  ),
  ...(teacher.customTeachingFields?.arts || []),
]}
      />

      <PublicTeachingFieldGroup
        title="ورزش"
        items={[
  ...teacher.teachingFields.filter((item) =>
    TEACHING_FIELDS4.includes(item)
  ),
  ...(teacher.customTeachingFields?.sports || []),
]}
      />

      <PublicTeachingFieldGroup
        title="مهارت‌های تخصصی"
        items={[
  ...teacher.teachingFields.filter((item) =>
    TEACHING_FIELDS5.includes(item)
  ),
  ...(teacher.customTeachingFields?.skills || []),
]}
      />

      <PublicTeachingFieldGroup
        title="آزمون‌ها و مهاجرت"
        items={[
  ...teacher.teachingFields.filter((item) =>
    TEACHING_FIELDS6.includes(item)
  ),
  ...(teacher.customTeachingFields?.exams || []),
]}
      />

      <PublicTeachingFieldGroup
        title="سایر حوزه‌های تدریس"
        items={teacher.teachingFields.filter(
  (item) =>
    !TEACHING_FIELDS.includes(item) &&
    !TEACHING_FIELDS2.includes(item) &&
    !TEACHING_FIELDS3.includes(item) &&
    !TEACHING_FIELDS4.includes(item) &&
    !TEACHING_FIELDS5.includes(item) &&
    !TEACHING_FIELDS6.includes(item) &&
    !Object.values(
      teacher.customTeachingFields || {}
    )
      .flat()
      .includes(item)
)}
      />

    </div>
  </PublicTeacherSection>
)}


        {/* =====================================================
            مقاطع و شیوه تدریس
        ===================================================== */}

        {(teacher?.educationLevels?.length >
          0 ||
          teacher?.teachingMethods?.length >
            0) && (
          <PublicTeacherSection
            title="مقاطع و شیوه‌های تدریس"
            icon={
              <GraduationCap size={20} />
            }
          >
            {teacher?.educationLevels
              ?.length > 0 && (
              <div>
                <p
                  className="
                    mb-3
                    text-sm
                    font-bold
                    text-gray-700
                  "
                >
                  مقاطع تحصیلی
                </p>

                <PublicTeacherChips
                  items={
                    teacher.educationLevels
                  }
                />
              </div>
            )}

            {teacher?.teachingMethods
              ?.length > 0 && (
              <div className="mt-5">
                <p
                  className="
                    mb-3
                    text-sm
                    font-bold
                    text-gray-700
                  "
                >
                  شیوه‌های تدریس
                </p>

                <PublicTeacherChips
                  items={
                    teacher.teachingMethods
                  }
                />
              </div>
            )}
          </PublicTeacherSection>
        )}


        {/* =====================================================
            شرایط پذیرش
        ===================================================== */}

        {(teacher?.gender ||
          teacher?.acceptedAges?.length >
            0 ||
          teacher?.studentCapacity) && (
          <PublicTeacherSection
            title="شرایط پذیرش دانش‌آموز"
            icon={<UsersRound size={20} />}
          >
            <div
              className="
                grid
                gap-3
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              {teacher.gender && (
                <PublicTeacherInfoBox
                  title="جنسیت قابل پذیرش"
                  value={teacher.gender}
                />
              )}

              {teacher.studentCapacity && (
                <PublicTeacherInfoBox
                  title="ظرفیت پذیرش"
                  value={
                    teacher.studentCapacity
                  }
                />
              )}

              {teacher.acceptedAges
                ?.length > 0 && (
                <div
                  className="
                    rounded-2xl
                    bg-[#faf7ef]
                    p-4
                    sm:col-span-2
                    lg:col-span-1
                  "
                >
                  <p
                    className="
                      text-xs
                      text-gray-400
                    "
                  >
                    گروه‌های سنی
                  </p>

                  <div
                    className="
                      mt-2
                      flex
                      flex-wrap
                      gap-2
                    "
                  >
                    {teacher.acceptedAges.map(
                      (age) => (
                        <span
                          key={age}
                          className="
                            rounded-full
                            bg-yellow-100
                            px-3
                            py-1.5
                            text-xs
                            font-bold
                            text-[#6f4a18]
                          "
                        >
                          {age}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </PublicTeacherSection>
        )}


        {/* =====================================================
            تحصیلات و سوابق
        ===================================================== */}

        {(teacher?.education ||
          teacher?.university ||
          teacher?.specialty ||
          teacher?.teachingExperience) && (
          <PublicTeacherSection
            title="تحصیلات و سوابق حرفه‌ای"
            icon={
              <GraduationCap size={20} />
            }
          >
            <div
              className="
                grid
                gap-3
                sm:grid-cols-2
              "
            >
              {teacher.education && (
                <PublicTeacherInfoBox
                  title="مدرک تحصیلی"
                  value={teacher.education}
                />
              )}

              {teacher.university && (
                <PublicTeacherInfoBox
                  title="دانشگاه"
                  value={teacher.university}
                />
              )}

              {teacher.specialty && (
                <PublicTeacherInfoBox
                  title="رشته و تخصص"
                  value={teacher.specialty}
                />
              )}

              {teacher.teachingExperience && (
                <PublicTeacherInfoBox
                  title="سابقه تدریس"
                  value={
                    teacher.teachingExperience
                  }
                />
              )}
            </div>
          </PublicTeacherSection>
        )}


        {/* =====================================================
            زمان‌های تدریس
        ===================================================== */}

        {teacher?.workingSchedule?.length >
          0 && (
          <PublicTeacherSection
            title="روزها و ساعات تدریس"
            icon={<Clock3 size={20} />}
          >
            <div
              className="
                grid
                gap-3
                md:grid-cols-2
              "
            >
              {teacher.workingSchedule.map(
                (schedule, index) => (
                  <div
                    key={index}
                    className="
                      rounded-2xl
                      border
                      border-yellow-100
                      bg-[#faf7ef]
                      p-4
                    "
                  >
                    <div
                      className="
                        flex
                        flex-wrap
                        gap-2
                      "
                    >
                      {schedule.days?.map(
                        (day) => (
                          <span
                            key={day}
                            className="
                              rounded-full
                              bg-white
                              px-3
                              py-1.5
                              text-xs
                              font-bold
                              text-[#6f4a18]
                              shadow-sm
                            "
                          >
                            {day}
                          </span>
                        )
                      )}
                    </div>

                    {(schedule.openingTime ||
                      schedule.closingTime) && (
                      <p
                        className="
                          mt-3
                          text-sm
                          font-bold
                          text-gray-600
                        "
                      >
                        ساعت{" "}
                        {schedule.openingTime ||
                          "—"}
                        {" تا "}
                        {schedule.closingTime ||
                          "—"}
                      </p>
                    )}
                  </div>
                )
              )}
            </div>
          </PublicTeacherSection>
        )}


        {/* =====================================================
            امکانات آموزشی
        ===================================================== */}

        <PublicTeacherSection
          title="امکانات و خدمات آموزشی"
          icon={<ShieldCheck size={20} />}
        >
          <div
            className="
              grid
              gap-3
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >

            <PublicTeacherFeature
              title="تدریس آنلاین"
              enabled={
                teacher?.hasOnlineTeaching
              }
              description={
                teacher?.onlineDescription
              }
            />

            <PublicTeacherFeature
              title="تدریس در منزل"
              enabled={
                teacher?.hasHomeTeaching
              }
              description={
                teacher?.homeTeachingDescription
              }
            />

            <PublicTeacherFeature
              title="ارزیابی و تعیین سطح"
              enabled={
                teacher?.hasPlacementTest
              }
              description={
                teacher?.placementTestDescription
              }
            />

            <PublicTeacherFeature
              title="جلسه آزمایشی"
              enabled={
                teacher?.hasTrialSession
              }
              description={
                teacher?.trialSessionDescription
              }
            />

            <PublicTeacherFeature
              title="جزوه و منابع آموزشی"
              enabled={
                teacher?.hasEducationalMaterials
              }
              description={
                teacher?.educationalMaterialsDescription
              }
            />

            <PublicTeacherFeature
              title="گواهی پایان دوره"
              enabled={
                teacher?.hasCertificate
              }
              description={
                teacher?.certificateDescription
              }
            />

          </div>
        </PublicTeacherSection>


        {/* =====================================================
            مدارک و افتخارات
        ===================================================== */}

        {teacher
          ?.achievementsAndLicenses
          ?.length > 0 && (
          <PublicTeacherSection
            title="مدارک و افتخارات"
            icon={<Award size={20} />}
          >
            <div
              className="
                grid
                gap-3
                md:grid-cols-2
              "
            >
              {teacher.achievementsAndLicenses.map(
                (item, index) => (
                  <div
                    key={item.id || index}
                    className="
                      rounded-2xl
                      border
                      border-yellow-100
                      bg-[#faf7ef]
                      p-4
                    "
                  >
                    <p
                      className="
                        font-black
                        text-[#6f4a18]
                      "
                    >
                      {item.title ||
                        "مدرک یا افتخار"}
                    </p>

                    {item.description && (
                      <p
                        className="
                          mt-2
                          text-sm
                          leading-7
                          text-gray-500
                        "
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                )
              )}
            </div>
          </PublicTeacherSection>
        )}


        {/* =====================================================
            دوره‌ها
        ===================================================== */}

        <PublicTeacherItemsSection
          title="دوره‌ها و کلاس‌های خصوصی"
          description="دوره‌های آموزشی و کلاس‌های چندجلسه‌ای"
          items={courseServices}
          loading={loadingServices}
          type="course"
          navigate={navigate}
        />


        {/* =====================================================
            خدمات
        ===================================================== */}

        <PublicTeacherItemsSection
          title="جلسات و خدمات آموزشی"
          description="جلسات آموزشی، رفع اشکال و سایر خدمات معلم"
          items={eventServices}
          loading={loadingServices}
          type="service"
          navigate={navigate}
        />


        {/* =====================================================
            محصولات
        ===================================================== */}

        <PublicTeacherItemsSection
          title="محصولات آموزشی"
          description="محصولات و منابع آموزشی ارائه‌شده توسط معلم"
          items={products}
          loading={loadingProducts}
          type="product"
          navigate={navigate}
        />


        {/* =====================================================
            تماس
        ===================================================== */}

        {(teacher?.city ||
          teacher?.district ||
          teacher?.address ||
          teacher?.phone ||
          teacher?.email) && (
          <PublicTeacherSection
            title="اطلاعات تماس و محدوده فعالیت"
            icon={<MapPin size={20} />}
          >
            <div
              className="
                grid
                gap-3
                sm:grid-cols-2
              "
            >
              {teacher.city && (
                <PublicTeacherInfoBox
                  title="شهر"
                  value={teacher.city}
                />
              )}

              {teacher.district && (
                <PublicTeacherInfoBox
                  title="منطقه فعالیت"
                  value={teacher.district}
                />
              )}

              {teacher.phone && (
                <PublicTeacherInfoBox
                  title="شماره تماس"
                  value={teacher.phone}
                />
              )}

              {teacher.email && (
                <PublicTeacherInfoBox
                  title="ایمیل"
                  value={teacher.email}
                />
              )}

              {teacher.address && (
                <div
                  className="
                    rounded-2xl
                    bg-[#faf7ef]
                    p-4
                    sm:col-span-2
                  "
                >
                  <p
                    className="
                      text-xs
                      text-gray-400
                    "
                  >
                    آدرس
                  </p>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-7
                      text-gray-700
                    "
                  >
                    {teacher.address}
                  </p>
                </div>
              )}
            </div>
          </PublicTeacherSection>
        )}

      </div>
    </main>
  );
}


// =========================================================
// Public Helper Components
// =========================================================

function PublicTeacherSection({
  title,
  icon,
  children,
}) {
  return (
    <section
      className="
        rounded-3xl
        bg-white
        p-5
        shadow
      "
    >
      <div
        className="
          mb-5
          flex
          items-center
          gap-2
          text-[#6f4a18]
        "
      >
        {icon}

        <h2 className="font-black">
          {title}
        </h2>
      </div>

      {children}
    </section>
  );
}


function PublicTeacherBadge({
  children,
}) {
  return (
    <span
      className="
        flex
        items-center
        gap-1.5
        rounded-full
        border
        border-yellow-200
        bg-yellow-50
        px-3
        py-1.5
        text-xs
        font-bold
        text-[#7a5526]
      "
    >
      {children}
    </span>
  );
}


function PublicTeacherChips({
  items = [],
}) {
  return (
    <div
      className="
        flex
        flex-wrap
        gap-2
      "
    >
      {items.map((item) => (
        <span
          key={item}
          className="
            rounded-full
            border
            border-yellow-200
            bg-yellow-50
            px-4
            py-2
            text-xs
            font-bold
            text-[#6f4a18]
          "
        >
          {item}
        </span>
      ))}
    </div>
  );
}


function PublicTeacherInfoBox({
  title,
  value,
}) {
  return (
    <div
      className="
        rounded-2xl
        bg-[#faf7ef]
        p-4
      "
    >
      <p
        className="
          text-xs
          text-gray-400
        "
      >
        {title}
      </p>

      <p
        className="
          mt-2
          text-sm
          font-bold
          text-gray-700
        "
      >
        {value}
      </p>
    </div>
  );
}


function PublicTeacherFeature({
  title,
  enabled,
  description,
}) {
  return (
    <div
      className={`
        rounded-2xl
        border
        p-4

        ${
          enabled
            ? "border-green-100 bg-green-50/50"
            : "border-gray-100 bg-gray-50"
        }
      `}
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-3
        "
      >
        <p
          className="
            text-sm
            font-black
            text-gray-700
          "
        >
          {title}
        </p>

        <span
          className={`
            rounded-full
            px-3
            py-1
            text-xs
            font-black

            ${
              enabled
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-500"
            }
          `}
        >
          {enabled ? "دارد" : "ندارد"}
        </span>
      </div>

      {enabled && description && (
        <p
          className="
            mt-3
            text-xs
            leading-7
            text-gray-500
          "
        >
          {description}
        </p>
      )}
    </div>
  );
}


function PublicTeacherItemsSection({
  title,
  description,
  items = [],
  loading = false,
  type,
  navigate,
}) {
  return (
    <section
      className="
        rounded-3xl
        bg-white
        p-5
        shadow
      "
    >
      <div
        className="
          mb-4
          flex
          items-center
          justify-between
          gap-3
        "
      >
        <div>
          <h2
            className="
              font-black
              text-[#6f4a18]
            "
          >
            {title}
          </h2>

          <p
            className="
              mt-1
              text-xs
              text-gray-400
            "
          >
            {description}
          </p>
        </div>

        <span
          className="
            rounded-full
            bg-yellow-50
            px-3
            py-1
            text-xs
            font-bold
            text-yellow-700
          "
        >
          {items.length}
        </span>
      </div>

      {loading ? (
        <div
          className="
            rounded-2xl
            bg-[#faf7ef]
            py-8
            text-center
            text-sm
            text-gray-400
          "
        >
          در حال دریافت اطلاعات...
        </div>
      ) : items.length === 0 ? (
        <div
          className="
            rounded-2xl
            border
            border-dashed
            border-yellow-200
            bg-yellow-50/30
            py-8
            text-center
            text-sm
            text-gray-400
          "
        >
          موردی برای نمایش وجود ندارد.
        </div>
      ) : (
        <div
          className="
            grid
            gap-4
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {items.map((item) => {

            const image =
              item.images?.[0]?.url ||
              item.images?.[0] ||
              item.image ||
              item.imageUrl ||
              item.coverImage ||
              "";

            const itemTitle =
              item.title ||
              item.name ||
              item.productName ||
              item.serviceName ||
              "بدون عنوان";

            const target =
              type === "product"
                ? `/product/${item.id}`
                : type === "course"
                ? `/course/${item.id}`
                : `/service/${item.id}`;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  navigate(target)
                }
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-yellow-100
                  bg-[#faf7ef]
                  text-right
                  transition
                  hover:-translate-y-1
                  hover:shadow-md
                "
              >
                {image ? (
                  <img
                    src={image}
                    alt={itemTitle}
                    className="
                      h-40
                      w-full
                      object-cover
                    "
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-40
                      items-center
                      justify-center
                      bg-yellow-100
                      text-[#7a5526]
                    "
                  >
                    {type === "product" ? (
                      <BookOpen size={34} />
                    ) : (
                      <GraduationCap
                        size={34}
                      />
                    )}
                  </div>
                )}

                <div className="p-4">

                  <p
                    className="
                      line-clamp-2
                      text-sm
                      font-black
                      text-gray-700
                    "
                  >
                    {itemTitle}
                  </p>

                  {item.price !== undefined &&
                    item.price !== null && (
                      <p
                        className="
                          mt-3
                          text-sm
                          font-black
                          text-[#7a5526]
                        "
                      >
                        {Number(
                          item.price
                        ).toLocaleString(
                          "fa-IR"
                        )}{" "}
                        تومان
                      </p>
                    )}

                  <div
                    className="
                      mt-4
                      rounded-xl
                      border
                      border-[#d4af37]
                      bg-white
                      py-2
                      text-center
                      text-xs
                      font-bold
                      text-[#7a5526]
                    "
                  >
                    مشاهده
                  </div>

                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}