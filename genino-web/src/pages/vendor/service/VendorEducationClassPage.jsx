// D:\projects\Genino\genino-web\src\pages\vendor\service\VendorEducationClassPage.jsx
import {
  useEffect,
  useState,
} from "react";
import {
  useParams,
  useNavigate,
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
  GraduationCap,
  BookOpen,
  UserRound,
} from "lucide-react";
import PromoSlider from "../../../components/Social/PromoSlider.jsx";
import ProductCard from "../../../components/Product/ProductCard";
import EducationClassChildrenSection
  from "./components/EducationClassChildrenSection";
import {
  presignVendorKindergartenHeaderUpload,
  presignVendorKindergartenStaffUpload,
  putFileToPresignedUrl,
} from "../../../services/api";


const getAuthToken = () =>
  localStorage.getItem("genino_token");

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

const buildApiUrl = (path) => {
  const base = String(
    API_BASE_URL || ""
  ).replace(/\/$/, "");

  const normalizedPath =
    path.startsWith("/")
      ? path
      : `/${path}`;

  if (!base) {
    throw new Error(
      "VITE_API_BASE_URL تنظیم نشده است. مقدار آن باید مثل http://localhost:80/api باشد."
    );
  }

  return `${base}${normalizedPath}`;
};

async function parseJsonResponse(
  response
) {
  const contentType =
    response.headers.get(
      "content-type"
    ) || "";

  if (
    !contentType.includes(
      "application/json"
    )
  ) {
    const text =
      await response.text();

    throw new Error(
      `پاسخ سرور JSON نیست (${response.status}). ` +
        `آدرس درخواست یا تنظیمات API را بررسی کنید. ` +
        `${text.slice(0, 80)}`
    );
  }

  return response.json();
}


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


const EDUCATION_FIELDS = [
  "زبان انگلیسی",
    "زبان آلمانی",
    "زبان فرانسه",
    "زبان ترکی استانبولی",
    "زبان عربی",
    "زبان اسپانیایی",
    "زبان ایتالیایی",
    "زبان روسی",
    "زبان چینی",
    "زبان کره‌ای",
    "زبان ژاپنی",
    "مکالمه زبان",
    "آمادگی آزمون آیلتس",
    "آمادگی آزمون تافل",
];

const EDUCATION_FIELDS2 = [
  "زبان کردی",
    "زبان لری",
    "زبان ترکی آذری",
    "زبان گیلکی",
    "زبان مازندرانی",
    "زبان بلوچی",
    "زبان عربی خوزستان",
    "زبان تالشی",
    "زبان ترکمنی",
    "زبان بختیاری",
    "زبان قشقایی",
];

const EDUCATION_FIELDS3 = [
  "ریاضی",
    "فیزیک",
    "شیمی",
    "زیست شناسی",
    "ادبیات",
    "تاریخ",
    "جغرافیا",
    "آمار و احتمال",
    "حسابداری",
];

const EDUCATION_FIELDS4 = [
  "برنامه‌نویسی کودکان",
    "برنامه‌نویسی نوجوانان",
    "طراحی بازی",
    "ساخت اپلیکیشن",
    "طراحی سایت",
    "رباتیک",
    "هوش مصنوعی",
    "الکترونیک کودک",
    "ساخت اختراع و پروژه",
    "چاپ سه‌بعدی",
    "طراحی گرافیک",
    "انیمیشن‌سازی",
    "تولید محتوا",
    "کامپیوتر کودک",
    "مهارت‌های ICDL",
    "نرم‌افزارهای اداری",
    "امنیت سایبری",
    "علوم داده",
    "اینترنت و سواد دیجیتال",
];

const EDUCATION_FIELDS5 = [
  "فن بیان و سخنوری",
    "اعتماد به نفس",
    "تمرکز و تقویت حافظه",
    "مهارت‌های زندگی",
    "خلاقیت و نوآوری",
    "هوش هیجانی",
    "مهارت‌های ارتباطی",
    "آداب معاشرت",
    "کار تیمی",
    "رهبری کودکان و نوجوانان",
    "حل مسئله",
    "تصمیم‌گیری",
    "مدیریت زمان",
    "تفکر خلاق",
    "تفکر انتقادی",
    "کنترل خشم و هیجانات",
    "خودشناسی",
    "مسئولیت‌پذیری",
    "مهارت نه گفتن",
    "آمادگی حضور در اجتماع",
];


const COURSE_LEVELS = [
  "مقدماتی",
  "متوسط",
  "پیشرفته",
  "همه سطوح",
];


const FACILITY_OPTIONS = [
  "کلاس مجهز",
  "ویدئو پروژکتور",
  "تلویزیون هوشمند",
  "برد هوشمند",
  "کامپیوتر",
  "لپ‌تاپ",
  "اینترنت",
  "آزمایشگاه",
  "کارگاه آموزشی",
  "کلاس آنلاین",
  "کتابخانه",
  "فضای مطالعه",
  "سیستم سرمایش و گرمایش",
  "فضای انتظار والدین",
  "کافی‌شاپ",
  "پارکینگ",
  "دوربین نظارتی",
  "آسانسور",
];


const TEACHING_METHODS = [
  "آموزش حضوری",
  "آموزش آنلاین",
  "آموزش خصوصی",
  "آموزش گروهی",
  "آموزش پروژه‌محور",
  "بازی‌محور",
  "تمرین و حل مسئله",
  "کارگاهی",
];

const ACHIEVEMENT_CATEGORY_LABELS = {
  ART: "دستاورد هنری",
  SPORT: "دستاورد ورزشی",
  RESEARCH: "دستاورد پرورشی",
  SCIENCE: "دستاورد علمی",
  MORAL: "دستاورد معنوی",
};



// =========================================================
// صفحه اصلی
// =========================================================

export default function VendorEducationClassPage() {

  const { vendorId } = useParams();

  const navigate = useNavigate();

const [searchParams] =
  useSearchParams();

const isPublicView =
  searchParams.get("view") ===
  "public";

const loggedVendorId =
  localStorage.getItem(
    "genino_vendor_id"
  );

const isVendorOwner =
  !isPublicView &&
  Boolean(loggedVendorId) &&
  Number(loggedVendorId) ===
    Number(vendorId);


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
  showAchievementHistory,
  setShowAchievementHistory,
] = useState(false);

const [
  educationAchievements,
  setEducationAchievements,
] = useState([]);

const [
  loadingAchievements,
  setLoadingAchievements,
] = useState(false);

const [
  creatingAchievement,
  setCreatingAchievement,
] = useState(false);


  const [
  loading,
  setLoading,
] = useState(true);

const [
  packageWindowCount,
  setPackageWindowCount,
] = useState(0);

const [
  packageAchievementLimit,
  setPackageAchievementLimit,
] = useState(0);

const [
  achievementUsedCount,
  setAchievementUsedCount,
] = useState(0);

const [
  products,
  setProducts,
] = useState([]);

const [
  loadingProducts,
  setLoadingProducts,
] = useState(true);

const [
  services,
  setServices,
] = useState([]);

const [
  loadingServices,
  setLoadingServices,
] = useState(true);


  // =========================================================
  // اطلاعات مجموعه آموزشی
  // =========================================================

  const [
    educationCenter,
    setEducationCenter,
  ] = useState({

    headerImages: [],

    centerName: "",
    slogan: "",
    description: "",

    city: "",
    district: "",
    address: "",
    phone: "",
    email: "",

    acceptedAges: [],
    gender: "",

    educationFields: [],
    courseLevels: [],
    teachingMethods: [],

    workingSchedule: [],

    studentCapacity: "",

    foundedYear: "",
    area: "",
    classroomCount: "",

    facilities: [],

    hasOnlineClasses: false,
    onlineDescription: "",

    hasPlacementTest: false,
    placementTestDescription: "",

    hasCertificate: false,
    certificateDescription: "",

    hasTransportation: false,
    transportationDescription: "",

    teacherCount: "",
    teacherExperience: "",

    staffMembers: [],

    children: [],

    resume: "",
  });


  // =========================================================
// دریافت پروفایل مجموعه آموزشی
// =========================================================

useEffect(() => {
  const loadEducationClassProfile =
    async () => {
      if (!vendorId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response =
          await fetch(
            buildApiUrl(
              `/vendor-education-class/${vendorId}`
            ),
            {
              method: "GET",
              headers: {
                Accept:
                  "application/json",
              },
              cache: "no-store",
            }
          );

        const data =
          await parseJsonResponse(
            response
          );

        if (
          !response.ok ||
          !data.ok
        ) {
          throw new Error(
            data.message ||
              "خطا در دریافت اطلاعات مجموعه آموزشی"
          );
        }

        if (!data.profile) {
          return;
        }

        const profile =
          data.profile;

        setEducationCenter(
          (prev) => ({
            ...prev,
            ...profile,

            headerImages:
              Array.isArray(
                profile.headerImages
              )
                ? profile.headerImages.filter(
                    (item) => {
                      const url =
                        typeof item ===
                        "string"
                          ? item
                          : item?.url;

                      return (
                        url &&
                        !String(
                          url
                        ).startsWith(
                          "blob:"
                        )
                      );
                    }
                  )
                : [],

            acceptedAges:
              Array.isArray(
                profile.acceptedAges
              )
                ? profile.acceptedAges
                : [],

            educationFields:
              Array.isArray(
                profile.educationFields
              )
                ? profile.educationFields
                : [],

            courseLevels:
              Array.isArray(
                profile.courseLevels
              )
                ? profile.courseLevels
                : [],

            teachingMethods:
              Array.isArray(
                profile.teachingMethods
              )
                ? profile.teachingMethods
                : [],

            workingSchedule:
              Array.isArray(
                profile.workingSchedule
              )
                ? profile.workingSchedule
                : [],

            facilities:
              Array.isArray(
                profile.facilities
              )
                ? profile.facilities
                : [],

            staffMembers:
              Array.isArray(
                profile.staffMembers
              )
                ? profile.staffMembers
                : [],

            children:
              prev.children,
          })
        );
      } catch (error) {
        console.error(
          "LOAD EDUCATION CLASS PROFILE ERROR:",
          error
        );

        alert(
          error.message ||
            "خطا در دریافت اطلاعات مجموعه آموزشی"
        );
      } finally {
        setLoading(false);
      }
    };

  loadEducationClassProfile();
}, [vendorId]);


// =========================================================
// دریافت بسته + محصولات مرکز آموزشی
// =========================================================

useEffect(() => {
  async function loadVendorPackageAndProducts() {
    if (!vendorId) {
      setLoadingProducts(false);
      return;
    }

    try {
      setLoadingProducts(true);

      const token =
        localStorage.getItem(
          "genino_token"
        );

      // =========================================
      // حالت عمومی
      // =========================================
      if (!isVendorOwner) {
        const productsRes =
          await fetch(
            buildApiUrl(
              "/vendor-products/public"
            ),
            {
              method: "GET",
              headers: {
                Accept:
                  "application/json",
              },
            }
          );

        const productsData =
          await parseJsonResponse(
            productsRes
          );

        if (
          !productsRes.ok ||
          !productsData?.ok
        ) {
          throw new Error(
            productsData?.message ||
              "خطا در دریافت محصولات مرکز آموزشی"
          );
        }

        const receivedProducts =
          Array.isArray(
            productsData.products
          )
            ? productsData.products
            : [];

        const fixedProducts =
          receivedProducts.map(
            (product) => ({
              ...product,

              categoryLinks:
                typeof product.categoryLinks ===
                "string"
                  ? JSON.parse(
                      product.categoryLinks
                    )
                  : product.categoryLinks ||
                    [],

              images:
                typeof product.images ===
                "string"
                  ? JSON.parse(
                      product.images
                    )
                  : product.images || [],
            })
          );

        const vendorProducts =
          fixedProducts.filter(
            (product) => {
              const productVendorId =
                product.vendorId ??
                product.vendor?.id;

              return (
                Number(
                  productVendorId
                ) ===
                Number(vendorId)
              );
            }
          );

        setProducts(
          vendorProducts
        );

        // اطلاعات بسته در حالت عمومی
        // اصلاً لازم نیست
        setPackageWindowCount(0);
        setPackageAchievementLimit(0);
        setAchievementUsedCount(0);

        return;
      }

      // =========================================
      // حالت مدیریتی Vendor
      // =========================================

      const [
        vendorRes,
        productsRes,
      ] = await Promise.all([
        fetch(
          buildApiUrl(
            `/vendors/${vendorId}`
          ),
          {
            method: "GET",
            headers: {
              Accept:
                "application/json",
            },
          }
        ),

        fetch(
          buildApiUrl(
            `/vendor-products/vendor/${vendorId}`
          ),
          {
            method: "GET",
            headers: {
              Authorization:
                `Bearer ${token}`,
              Accept:
                "application/json",
            },
          }
        ),
      ]);

      const vendorData =
        await parseJsonResponse(
          vendorRes
        );

      const productsData =
        await parseJsonResponse(
          productsRes
        );

      if (
        !vendorRes.ok ||
        !vendorData?.ok
      ) {
        throw new Error(
          vendorData?.message ||
            "خطا در دریافت اطلاعات بسته مرکز آموزشی"
        );
      }

      if (
        !productsRes.ok ||
        !productsData?.ok
      ) {
        throw new Error(
          productsData?.message ||
            "خطا در دریافت محصولات مرکز آموزشی"
        );
      }

      const vendor =
        vendorData.vendor;

      setPackageWindowCount(
        Number(
          vendor
            ?.selectedPackageWindowCount ??
            0
        )
      );

      setPackageAchievementLimit(
        Number(
          vendor
            ?.selectedPackageAchievementLimit ??
            0
        )
      );

      setAchievementUsedCount(
        Number(
          vendor
            ?.achievementUsedCount ??
            0
        )
      );

      const receivedProducts =
        Array.isArray(
          productsData.products
        )
          ? productsData.products
          : [];

      const fixedProducts =
        receivedProducts.map(
          (product) => ({
            ...product,

            categoryLinks:
              typeof product.categoryLinks ===
              "string"
                ? JSON.parse(
                    product.categoryLinks
                  )
                : product.categoryLinks ||
                  [],

            images:
              typeof product.images ===
              "string"
                ? JSON.parse(
                    product.images
                  )
                : product.images || [],
          })
        );

      setProducts(
        fixedProducts
      );

    } catch (error) {
      console.error(
        "LOAD EDUCATION CLASS PACKAGE / PRODUCTS ERROR:",
        error
      );

      setProducts([]);

    } finally {
      setLoadingProducts(false);
    }
  }

  loadVendorPackageAndProducts();

}, [
  vendorId,
  isVendorOwner,
]);




// =========================================================
// دریافت خدمات مرکز آموزشی
// =========================================================

useEffect(() => {
  async function loadVendorServices() {
    if (!vendorId) {
      setLoadingServices(false);
      return;
    }

    try {
      setLoadingServices(true);

      const token =
        localStorage.getItem(
          "genino_token"
        );

      const servicesUrl =
        isVendorOwner
          ? buildApiUrl(
              `/vendor-services/vendor/${vendorId}`
            )
          : buildApiUrl(
              `/vendor-services/public/vendor/${vendorId}`
            );

      const headers =
        isVendorOwner
          ? {
              Authorization:
                `Bearer ${token}`,
              Accept:
                "application/json",
            }
          : {
              Accept:
                "application/json",
            };

      const response =
        await fetch(
          servicesUrl,
          {
            method: "GET",
            headers,
          }
        );

      const data =
        await parseJsonResponse(
          response
        );

      if (
        !response.ok ||
        !data?.ok
      ) {
        throw new Error(
          data?.message ||
            "خطا در دریافت خدمات مرکز آموزشی"
        );
      }

      const loadedServices =
        Array.isArray(
          data.services
        )
          ? data.services
          : [];

      setServices(
        loadedServices
      );

    } catch (error) {
      console.error(
        "LOAD EDUCATION CLASS SERVICES ERROR:",
        error
      );

      setServices([]);

    } finally {
      setLoadingServices(false);
    }
  }

  loadVendorServices();

}, [
  vendorId,
  isVendorOwner,
]);


  // =========================================================
  // تغییر فیلد
  // =========================================================

  const updateField = (
    key,
    value
  ) => {

    setEducationCenter(
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
  // کالا و خدمات
  // =========================================================

  const courseServices =
    services.filter(
      (service) =>
        service.package ||
        service.scheduleMode ===
          "PACKAGE"
    );


  const eventServices =
    services.filter(
      (service) =>
        !service.package &&
        service.scheduleMode !==
          "PACKAGE"
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
// حذف محصول مجموعه آموزشی
// =========================================================

const handleDeleteProduct =
  async (productId) => {

    const ok =
      window.confirm(
        "آیا از حذف این محصول مطمئن هستید؟"
      );

    if (!ok) return;

    try {

      const res =
        await fetch(
          `${API_BASE_URL}/vendor-products/${productId}`,
          {
            method: "DELETE",

            headers: {
              Authorization:
                `Bearer ${localStorage.getItem(
                  "genino_token"
                )}`,
            },
          }
        );

      const data =
        await res.json();

      if (
        !res.ok ||
        !data?.ok
      ) {

        alert(
          data?.message ||
            "خطا در حذف محصول"
        );

        return;
      }

      setProducts(
        (prev) =>
          prev.filter(
            (item) =>
              item.id !==
              productId
          )
      );

    } catch (error) {

      console.error(
        "DELETE EDUCATION CLASS PRODUCT ERROR:",
        error
      );

      alert(
        "خطا در ارتباط با سرور"
      );
    }
  };


// =========================================================
// انتشار محصول
// =========================================================

const handlePublishProduct =
  async (productId) => {

    try {

      const res =
        await fetch(
          `${API_BASE_URL}/vendor-products/${productId}/publish`,
          {
            method: "PATCH",

            headers: {
              Authorization:
                `Bearer ${localStorage.getItem(
                  "genino_token"
                )}`,
            },
          }
        );

      const data =
        await res.json();

      if (
        !res.ok ||
        !data?.ok
      ) {

        alert(
          data?.message ||
            "خطا در انتشار محصول"
        );

        return;
      }

      setProducts(
        (prev) =>
          prev.map(
            (item) =>
              item.id === productId
                ? {
                    ...item,
                    status:
                      "PUBLISHED",
                  }
                : item
          )
      );

      alert(
        "محصول با موفقیت منتشر شد."
      );

    } catch (error) {

      console.error(
        "PUBLISH EDUCATION CLASS PRODUCT ERROR:",
        error
      );

      alert(
        "خطا در ارتباط با سرور"
      );
    }
  };


// =========================================================
// عدم انتشار محصول
// =========================================================

const handleUnpublishProduct =
  async (productId) => {

    try {

      const res =
        await fetch(
          `${API_BASE_URL}/vendor-products/${productId}/unpublish`,
          {
            method: "PATCH",

            headers: {
              Authorization:
                `Bearer ${localStorage.getItem(
                  "genino_token"
                )}`,
            },
          }
        );

      const data =
        await res.json();

      if (
        !res.ok ||
        !data?.ok
      ) {

        alert(
          data?.message ||
            "خطا در عدم انتشار محصول"
        );

        return;
      }

      setProducts(
        (prev) =>
          prev.map(
            (item) =>
              item.id === productId
                ? {
                    ...item,
                    status:
                      "DRAFT",
                  }
                : item
          )
      );

    } catch (error) {

      console.error(
        "UNPUBLISH EDUCATION CLASS PRODUCT ERROR:",
        error
      );

      alert(
        "خطا در ارتباط با سرور"
      );
    }
  };


// =========================================================
// حذف خدمت / دوره
// =========================================================

const handleDeleteService =
  async (serviceId) => {

    const ok =
      window.confirm(
        "آیا از حذف این خدمت یا دوره مطمئن هستید؟"
      );

    if (!ok) return;

    try {

      const res =
        await fetch(
          `${API_BASE_URL}/vendor-services/${serviceId}`,
          {
            method: "DELETE",

            headers: {
              Authorization:
                `Bearer ${localStorage.getItem(
                  "genino_token"
                )}`,
            },
          }
        );

      const data =
        await res.json();

      if (
        !res.ok ||
        !data?.ok
      ) {

        alert(
          data?.message ||
            "خطا در حذف خدمت"
        );

        return;
      }

      setServices(
        (prev) =>
          prev.filter(
            (item) =>
              item.id !==
              serviceId
          )
      );

    } catch (error) {

      console.error(
        "DELETE EDUCATION CLASS SERVICE ERROR:",
        error
      );

      alert(
        "خطا در ارتباط با سرور"
      );
    }
  };


// =========================================================
// انتشار خدمت / دوره
// =========================================================

const handlePublishService =
  async (serviceId) => {

    try {

      const res =
        await fetch(
          `${API_BASE_URL}/vendor-services/${serviceId}/publish`,
          {
            method: "PATCH",

            headers: {
              Authorization:
                `Bearer ${localStorage.getItem(
                  "genino_token"
                )}`,
            },
          }
        );

      const data =
        await res.json();

      if (
        !res.ok ||
        !data?.ok
      ) {

        alert(
          data?.message ||
            "خطا در انتشار خدمت"
        );

        return;
      }

      setServices(
        (prev) =>
          prev.map(
            (item) =>
              item.id === serviceId
                ? {
                    ...item,
                    status:
                      "PUBLISHED",
                  }
                : item
          )
      );

      alert(
        "خدمت با موفقیت منتشر شد."
      );

    } catch (error) {

      console.error(
        "PUBLISH EDUCATION CLASS SERVICE ERROR:",
        error
      );

      alert(
        "خطا در ارتباط با سرور"
      );
    }
  };


// =========================================================
// عدم انتشار خدمت / دوره
// =========================================================

const handleUnpublishService =
  async (serviceId) => {

    try {

      const res =
        await fetch(
          `${API_BASE_URL}/vendor-services/${serviceId}/unpublish`,
          {
            method: "PATCH",

            headers: {
              Authorization:
                `Bearer ${localStorage.getItem(
                  "genino_token"
                )}`,
            },
          }
        );

      const data =
        await res.json();

      if (
        !res.ok ||
        !data?.ok
      ) {

        alert(
          data?.message ||
            "خطا در عدم انتشار خدمت"
        );

        return;
      }

      setServices(
        (prev) =>
          prev.map(
            (item) =>
              item.id === serviceId
                ? {
                    ...item,
                    status:
                      "DRAFT",
                  }
                : item
          )
      );

    } catch (error) {

      console.error(
        "UNPUBLISH EDUCATION CLASS SERVICE ERROR:",
        error
      );

      alert(
        "خطا در ارتباط با سرور"
      );
    }
  };


  // =========================================================
  // تصاویر هدر
  // =========================================================

  const addHeaderImage =
  async (file) => {

    if (!file) return;

    try {

      if (
        educationCenter
          .headerImages.length >= 10
      ) {

        alert(
          "حداکثر ۱۰ تصویر می‌توانید برای مجموعه آموزشی ثبت کنید."
        );

        return;
      }


      const ext =
        file.name
          .split(".")
          .pop();


      const presign =
        await presignVendorKindergartenHeaderUpload({
          ext,

          contentType:
            file.type,

          fileName:
            file.name,

          fileSize:
            file.size,
        });


      if (!presign?.ok) {

        alert(
          presign?.message ||
            "خطا در آماده‌سازی تصویر مجموعه آموزشی"
        );

        return;
      }


      const upload =
        await putFileToPresignedUrl(
          presign.uploadUrl,
          file
        );


      if (!upload?.ok) {

        alert(
          upload?.message ||
            "آپلود تصویر مجموعه آموزشی انجام نشد"
        );

        return;
      }


      setEducationCenter(
        (prev) => ({
          ...prev,

          headerImages: [
            ...prev.headerImages,

            {
              url:
                presign.publicUrl,

              description:
                "",
            },
          ],
        })
      );

    } catch (error) {

      console.error(
        "UPLOAD EDUCATION CLASS HEADER ERROR:",
        error
      );


      alert(
        "خطا در آپلود تصویر مجموعه آموزشی"
      );
    }
  };


  const updateHeaderDescription = (
    index,
    value
  ) => {

    setEducationCenter(
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

    setEducationCenter(
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
  // انتخاب چندگزینه‌ای
  // =========================================================

  const toggleArrayField = (
    field,
    value
  ) => {

    setEducationCenter(
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


  // =========================================================
  // برنامه روزها و ساعت‌ها
  // =========================================================

  const addWorkingSchedule =
    () => {

      setEducationCenter(
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

    setEducationCenter(
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

    setEducationCenter(
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

    setEducationCenter(
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
                    [field]:
                      value,
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
  // مدرسین و اعضای مجموعه
  // =========================================================

  const addStaffMember =
    () => {

      setEducationCenter(
        (prev) => ({
          ...prev,

          staffMembers: [
            ...prev.staffMembers,

            {
              name: "",
              position: "",
              education: "",
              experience: "",
              specialty: "",
              image: "",
            },
          ],
        })
      );
    };


  const updateStaffMember = (
    index,
    field,
    value
  ) => {

    setEducationCenter(
      (prev) => ({
        ...prev,

        staffMembers:
          prev.staffMembers.map(
            (
              member,
              i
            ) =>
              i === index
                ? {
                    ...member,
                    [field]:
                      value,
                  }
                : member
          ),
      })
    );
  };


  const removeStaffMember = (
    index
  ) => {

    setEducationCenter(
      (prev) => ({
        ...prev,

        staffMembers:
          prev.staffMembers.filter(
            (_, i) =>
              i !== index
          ),
      })
    );
  };


  const uploadStaffImage =
  async (
    index,
    file
  ) => {

    if (!file) return;


    try {

      const ext =
        file.name
          .split(".")
          .pop();


      const presign =
        await presignVendorKindergartenStaffUpload({
          ext,

          contentType:
            file.type,

          fileName:
            file.name,

          fileSize:
            file.size,
        });


      if (!presign?.ok) {

        alert(
          presign?.message ||
            "خطا در آماده‌سازی تصویر مدرس"
        );

        return;
      }


      const upload =
        await putFileToPresignedUrl(
          presign.uploadUrl,
          file
        );


      if (!upload?.ok) {

        alert(
          upload?.message ||
            "آپلود تصویر مدرس انجام نشد"
        );

        return;
      }


      updateStaffMember(
        index,
        "image",
        presign.publicUrl
      );

    } catch (error) {

      console.error(
        "UPLOAD EDUCATION CLASS STAFF IMAGE ERROR:",
        error
      );


      alert(
        "خطا در آپلود تصویر مدرس"
      );
    }
  };


  // =========================================================
// دستاوردهای مرکز آموزشی
// =========================================================

const handleOpenAchievement = (
  child
) => {

  if (
    remainingAchievementCount <= 0
  ) {

    alert(
      "سهمیه صدور دستاورد مرکز آموزشی تمام شده است."
    );

    return;
  }

  setSelectedAchievementChild(
    child
  );

  setAchievementForm({
    category: "",
    title: "",
    description: "",
  });
};


const handleOpenAchievementHistory =
  async () => {

    try {

      setShowAchievementHistory(
        true
      );

      setLoadingAchievements(
        true
      );

      const token =
        getAuthToken();

      if (!token) {
        alert(
          "برای مشاهده دستاوردها ابتدا وارد حساب فروشنده شوید."
        );
        return;
      }

      const response =
        await fetch(
          buildApiUrl(
            `/vendor-education-class/${vendorId}/achievements`
          ),
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${token}`,

              Accept:
                "application/json",
            },
          }
        );

      const data =
        await parseJsonResponse(
          response
        );

      if (
        !response.ok ||
        !data?.ok
      ) {

        setEducationAchievements(
          []
        );

        alert(
          data?.message ||
            "خطا در دریافت دستاوردها"
        );

        return;
      }

      setEducationAchievements(
        Array.isArray(
          data.achievements
        )
          ? data.achievements
          : []
      );

    } catch (error) {

      console.error(
        "LOAD EDUCATION CLASS ACHIEVEMENTS ERROR:",
        error
      );

      setEducationAchievements(
        []
      );

      alert(
        "خطا در ارتباط با سرور"
      );

    } finally {

      setLoadingAchievements(
        false
      );

    }
  };


const handleCreateAchievement =
  async () => {

    if (
      !selectedAchievementChild
    ) {
      return;
    }


    if (
      !achievementForm.category
    ) {

      alert(
        "لطفاً نوع دستاورد را انتخاب کنید."
      );

      return;
    }


    if (
      !achievementForm.title.trim()
    ) {

      alert(
        "لطفاً عنوان دستاورد را وارد کنید."
      );

      return;
    }


    if (
      remainingAchievementCount <= 0
    ) {

      alert(
        "سهمیه صدور دستاورد مرکز آموزشی تمام شده است."
      );

      return;
    }


    try {

      setCreatingAchievement(
        true
      );

      const token =
        getAuthToken();

      if (!token) {

        alert(
          "برای صدور دستاورد ابتدا وارد حساب فروشنده شوید."
        );

        return;
      }


      const response =
        await fetch(
          buildApiUrl(
            `/vendor-education-class/${vendorId}/achievement`
          ),
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body:
              JSON.stringify({
                childId:
                  selectedAchievementChild.id,

                category:
                  achievementForm.category,

                title:
                  achievementForm.title.trim(),

                description:
                  achievementForm.description.trim(),
              }),
          }
        );

      const data =
        await parseJsonResponse(
          response
        );

      if (
        !response.ok ||
        !data?.ok
      ) {

        alert(
          data?.message ||
            "خطا در صدور دستاورد"
        );

        return;
      }


      setAchievementUsedCount(
        (prev) =>
          Number(prev || 0) + 1
      );


      alert(
        "دستاورد با موفقیت صادر شد 🏆"
      );


      setSelectedAchievementChild(
        null
      );


      setAchievementForm({
        category: "",
        title: "",
        description: "",
      });

      if (showAchievementHistory) {
  await handleOpenAchievementHistory();
}

    } catch (error) {

      console.error(
        "CREATE EDUCATION CLASS ACHIEVEMENT ERROR:",
        error
      );

      alert(
        "خطا در ارتباط با سرور"
      );

    } finally {

      setCreatingAchievement(
        false
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
          educationCenter.centerName ||
            ""
        ).trim()
      ) {
        errors.centerName =
          "نام مجموعه آموزشی الزامی است";
      }


      if (
        !String(
          educationCenter.slogan ||
            ""
        ).trim()
      ) {
        errors.slogan =
          "شعار مجموعه آموزشی الزامی است";
      }


      if (
        !String(
          educationCenter.city ||
            ""
        ).trim()
      ) {
        errors.city =
          "شهر محل فعالیت الزامی است";
      }


      if (
        !String(
          educationCenter.district ||
            ""
        ).trim()
      ) {
        errors.district =
          "منطقه الزامی است";
      }


      if (
        !String(
          educationCenter.address ||
            ""
        ).trim()
      ) {
        errors.address =
          "آدرس دقیق الزامی است";
      }


      if (
        !String(
          educationCenter.phone ||
            ""
        ).trim()
      ) {
        errors.phone =
          "شماره تماس الزامی است";
      }


      if (
        !String(
          educationCenter.email ||
            ""
        ).trim()
      ) {

        errors.email =
          "ایمیل الزامی است";

      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          String(
            educationCenter.email
          ).trim()
        )
      ) {

        errors.email =
          "فرمت ایمیل صحیح نیست";
      }


      if (
        !educationCenter.gender
      ) {
        errors.gender =
          "جنسیت پذیرش را مشخص کنید";
      }


      if (
        educationCenter
          .acceptedAges.length ===
        0
      ) {
        errors.acceptedAges =
          "حداقل یک گروه سنی انتخاب کنید";
      }


      if (
        educationCenter
          .educationFields.length ===
        0
      ) {
        errors.educationFields =
          "حداقل یک حوزه آموزشی انتخاب کنید";
      }


      const schedule =
        educationCenter
          .workingSchedule;


      if (
        schedule.length === 0
      ) {

        errors.workingSchedule =
          "حداقل یک برنامه فعالیت ثبت کنید";

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
// ذخیره واقعی اطلاعات مجموعه آموزشی
// =========================================================

const handleSave =
  async () => {
    const valid =
      validateFields();

    if (!valid) {
      alert(
        "لطفاً اطلاعات ضروری مجموعه آموزشی را کامل کنید."
      );

      return;
    }

    try {
      setSaving(true);

      const token =
        getAuthToken();

      if (!token) {
        alert(
          "برای ذخیره اطلاعات ابتدا وارد حساب فروشنده شوید."
        );

        return;
      }

      const payload = {
        headerImages:
          educationCenter.headerImages,

        centerName:
          educationCenter.centerName,

        slogan:
          educationCenter.slogan,

        description:
          educationCenter.description,

        city:
          educationCenter.city,

        district:
          educationCenter.district,

        address:
          educationCenter.address,

        phone:
          educationCenter.phone,

        email:
          educationCenter.email,

        acceptedAges:
          educationCenter.acceptedAges,

        gender:
          educationCenter.gender,

        educationFields:
          educationCenter.educationFields,

        courseLevels:
          educationCenter.courseLevels,

        teachingMethods:
          educationCenter.teachingMethods,

        workingSchedule:
          educationCenter.workingSchedule,

        studentCapacity:
          educationCenter.studentCapacity,

        foundedYear:
          educationCenter.foundedYear,

        area:
          educationCenter.area,

        classroomCount:
          educationCenter.classroomCount,

        facilities:
          educationCenter.facilities,

        hasOnlineClasses:
          educationCenter.hasOnlineClasses,

        onlineDescription:
          educationCenter.onlineDescription,

        hasPlacementTest:
          educationCenter.hasPlacementTest,

        placementTestDescription:
          educationCenter
            .placementTestDescription,

        hasCertificate:
          educationCenter.hasCertificate,

        certificateDescription:
          educationCenter
            .certificateDescription,

        hasTransportation:
          educationCenter
            .hasTransportation,

        transportationDescription:
          educationCenter
            .transportationDescription,

        teacherCount:
          educationCenter.teacherCount,

        teacherExperience:
          educationCenter
            .teacherExperience,

        staffMembers:
          educationCenter.staffMembers,

        resume:
          educationCenter.resume,
      };

      const response =
        await fetch(
          buildApiUrl(
            `/vendor-education-class/${vendorId}`
          ),
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body:
              JSON.stringify(
                payload
              ),
          }
        );

      const data =
        await parseJsonResponse(
          response
        );

      if (
        !response.ok ||
        !data.ok
      ) {
        throw new Error(
          data.message ||
            "خطا در ذخیره اطلاعات مجموعه آموزشی"
        );
      }

      if (data.profile) {
        setEducationCenter(
          (prev) => ({
            ...prev,
            ...data.profile,

            children:
              prev.children,
          })
        );
      }

      alert(
        "اطلاعات مجموعه آموزشی با موفقیت ذخیره شد ✅"
      );
    } catch (error) {
      console.error(
        "SAVE EDUCATION CLASS PROFILE ERROR:",
        error
      );

      alert(
        error.message ||
          "خطا در ذخیره اطلاعات مجموعه آموزشی"
      );
    } finally {
      setSaving(false);
    }
  };

  if (isPublicView) {
  return (
    <EducationClassPublicView
      educationCenter={educationCenter}
      products={products}
      services={services}
      loading={loading}
      loadingProducts={loadingProducts}
      loadingServices={loadingServices}
      vendorId={vendorId}
      navigate={navigate}
    />
  );
}






  // =========================================================
  // Render
  // =========================================================

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
            تصاویر هدر
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

            {educationCenter
              .headerImages.length >
            0 ? (

              <div>

                <PromoSlider
                  variant="golden"
                  interval={7000}
                  height="h-44 sm:h-52 md:h-60 lg:h-64"
                  slides={
                    educationCenter
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
                      educationCenter
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
                    placeholder="مثلاً: فضای کلاس‌های آموزشی مجموعه"
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

                <GraduationCap
                  className="
                    h-14
                    w-14
                    text-yellow-700
                  "
                />

              </div>

            )}


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

              افزودن تصویر مجموعه آموزشی

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


            <p
              className="
                mt-2
                text-center
                text-xs
                text-gray-500
              "
            >
              حداکثر ۱۰ تصویر - کلاس‌ها، فضای آموزشی، کارگاه‌ها، تجهیزات، مدرسین و محیط مجموعه
            </p>

          </div>

        </section>


        {/* =====================================================
            پنجره کالا و خدمت
        ===================================================== */}

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
            در این بخش می‌توانید کالاها، خدمات و دوره‌های مجموعه آموزشی را مدیریت کنید. هر کالا یا خدمت یک پنجره از ظرفیت بسته همکاری شما را استفاده می‌کند.
          </p>


          <div
            className="
              mt-4
              grid
              grid-cols-3
              gap-2
              sm:gap-3
            "
          >

            <CounterBox
              title="پنجره‌های خریداری‌شده"
              value={
                packageWindowCount
              }
            />


            <button
  type="button"
  onClick={
    handleOpenAchievementHistory
  }
  disabled={
    loadingProducts ||
    loadingAchievements ||
    achievementUsedCount <= 0
  }
  className="
    rounded-2xl
    bg-[#faf7ef]
    p-3
    text-center
    shadow-sm
    transition
    hover:-translate-y-0.5
    hover:bg-yellow-50
    hover:shadow-md
    disabled:cursor-default
    disabled:opacity-60
  "
>
  <p
    className="
      text-[11px]
      text-gray-400
      sm:text-xs
    "
  >
    استفاده‌شده
  </p>

  <p
    className="
      mt-1
      text-lg
      font-black
      text-[#7a5526]
    "
  >
    {loadingProducts
      ? "..."
      : achievementUsedCount}
  </p>

  {achievementUsedCount > 0 && (
    <p
      className="
        mt-1
        text-[10px]
        font-bold
        text-yellow-700
      "
    >
      مشاهده جزئیات
    </p>
  )}
</button>


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
              transition
              hover:shadow-md
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
                grid-cols-1
                gap-2
                sm:grid-cols-2
              "
            >

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/vendor/product/create?source=education-class&vendorId=${vendorId}`
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
                  shadow-lg
                "
              >
                + افزودن محصول جدید
              </button>


              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/vendor/service/create?source=education-class&vendorId=${vendorId}`
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
                + افزودن خدمت یا دوره جدید
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
              برای بسته مجموعه آموزشی هنوز پنجره کالا و خدمت ثبت نشده است
            </div>

          )}

        </section>


        {/* =====================================================
            کالا
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
      <h3 className="font-black text-[#6f4a18]">
        کالاهای مجموعه آموزشی
      </h3>

      <p className="mt-1 text-xs text-gray-400">
        کتاب‌ها، جزوات، تجهیزات و محصولات آموزشی ارائه‌شده توسط مجموعه
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

  {loadingProducts ? (

    <p className="py-8 text-center text-sm font-bold text-gray-400">
      در حال دریافت محصولات...
    </p>

  ) : products.length > 0 ? (

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
      {products.map(
        (product) => (

          <div
            key={product.id}
            className="
              flex
              flex-col
              gap-2
            "
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
                    `/vendor/product/edit/${product.id}?source=education-class&vendorId=${vendorId}`
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
                "
              >
                <Pencil size={14} />
                ویرایش
              </button>

              <button
                type="button"
                onClick={() =>
                  handleDeleteProduct(
                    product.id
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
                "
              >
                <Trash2 size={14} />
                حذف
              </button>

            </div>

            {product.status ===
            "PUBLISHED" ? (

              <button
                type="button"
                onClick={() =>
                  handleUnpublishProduct(
                    product.id
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
                "
              >
                عدم انتشار محصول
              </button>

            ) : (

              <button
                type="button"
                onClick={() =>
                  handlePublishProduct(
                    product.id
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
                "
              >
                انتشار محصول
              </button>

            )}

          </div>

        )
      )}
    </div>

  ) : (

    <EmptyBox
      text="هنوز کالایی ثبت نشده است."
    />

  )}

</section>


        {/* =====================================================
    خدمات
===================================================== */}

<EducationServiceManagementSection
  title="رویدادها و خدمات آموزشی"
  description="کارگاه‌ها، آزمون‌ها، جلسات مشاوره و سایر خدمات قابل رزرو مجموعه"
  services={eventServices}
  loading={loadingServices}
  vendorId={vendorId}
  centerName={
    educationCenter.centerName
  }
  navigate={navigate}
  onDelete={
    handleDeleteService
  }
  onPublish={
    handlePublishService
  }
  onUnpublish={
    handleUnpublishService
  }
/>


{/* =====================================================
    دوره
===================================================== */}

<EducationServiceManagementSection
  title="دوره‌ها و کلاس‌های آموزشی"
  description="کلاس‌ها و دوره‌های چندجلسه‌ای مجموعه آموزشی"
  services={courseServices}
  loading={loadingServices}
  vendorId={vendorId}
  centerName={
    educationCenter.centerName
  }
  navigate={navigate}
  onDelete={
    handleDeleteService
  }
  onPublish={
    handlePublishService
  }
  onUnpublish={
    handleUnpublishService
  }
/>


        {/* =====================================================
            معرفی مجموعه
        ===================================================== */}

        <FormCard
          title="معرفی مجموعه آموزشی"
          icon={
            <BookOpen
              size={19}
            />
          }
        >

          <SimpleInput
            label="نام مجموعه آموزشی"
            value={
              educationCenter
                .centerName
            }
            onChange={(
              value
            ) =>
              updateField(
                "centerName",
                value
              )
            }
            error={
              validationErrors
                .centerName
            }
          />


          <SimpleInput
            label="شعار مجموعه آموزشی"
            value={
              educationCenter
                .slogan
            }
            onChange={(
              value
            ) =>
              updateField(
                "slogan",
                value
              )
            }
            error={
              validationErrors
                .slogan
            }
          />


          <SimpleTextArea
            label="معرفی کوتاه مجموعه آموزشی"
            value={
              educationCenter
                .description
            }
            onChange={(
              value
            ) =>
              updateField(
                "description",
                value
              )
            }
          />

        </FormCard>


        {/* =====================================================
            تماس
        ===================================================== */}

        <FormCard
          title="اطلاعات تماس و آدرس"
          icon={
            <MapPin
              size={19}
            />
          }
        >

          <SimpleInput
            label="شهر محل فعالیت"
            value={
              educationCenter.city
            }
            onChange={(
              value
            ) =>
              updateField(
                "city",
                value
              )
            }
            error={
              validationErrors.city
            }
          />


          <SimpleInput
            label="منطقه"
            value={
              educationCenter
                .district
            }
            onChange={(
              value
            ) =>
              updateField(
                "district",
                value
              )
            }
            error={
              validationErrors
                .district
            }
          />


          <SimpleTextArea
            label="آدرس دقیق"
            value={
              educationCenter
                .address
            }
            onChange={(
              value
            ) =>
              updateField(
                "address",
                value
              )
            }
            error={
              validationErrors
                .address
            }
          />


          <SimpleInput
            label="شماره تماس"
            value={
              educationCenter.phone
            }
            onChange={(
              value
            ) =>
              updateField(
                "phone",
                value
              )
            }
            error={
              validationErrors.phone
            }
          />


          <SimpleInput
            label="ایمیل"
            value={
              educationCenter.email
            }
            onChange={(
              value
            ) =>
              updateField(
                "email",
                value
              )
            }
            error={
              validationErrors.email
            }
          />

        </FormCard>


        {/* =====================================================
            شرایط پذیرش
        ===================================================== */}

        <FormCard
          title="شرایط پذیرش هنرجویان"
          icon={
            <UsersRound
              size={19}
            />
          }
        >

          <SimpleSelect
            label="جنسیت پذیرش"
            value={
              educationCenter
                .gender
            }
            options={[
              "دختر",
              "پسر",
              "مختلط",
            ]}
            onChange={(
              value
            ) =>
              updateField(
                "gender",
                value
              )
            }
            error={
              validationErrors
                .gender
            }
          />


          <div
            className="
              sm:col-span-2
            "
          >

            <p className="text-sm font-bold text-gray-700">
              گروه‌های سنی قابل پذیرش
            </p>


            <ChipSelector
              options={
                AGE_OPTIONS
              }
              selected={
                educationCenter
                  .acceptedAges
              }
              onToggle={(
                value
              ) =>
                toggleArrayField(
                  "acceptedAges",
                  value
                )
              }
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
            حوزه‌های آموزشی
        ===================================================== */}

        <FormCard
          title="حوزه‌ها و رشته‌های آموزشی"
          icon={
            <GraduationCap
              size={19}
            />
          }
        >

          <div
            className="
              sm:col-span-2
            "
          >

            <p
              className="
                mt-3
                text-sm
                font-black
                text-[#6f4a18]
              "
            >
              زبان‌های خارجی
            </p>


            <ChipSelector
              options={
                EDUCATION_FIELDS
              }
              selected={
                educationCenter
                  .educationFields
              }
              onToggle={(
                value
              ) =>
                toggleArrayField(
                  "educationFields",
                  value
                )
              }
            />


            {validationErrors
              .educationFields && (

              <ErrorText>
                {
                  validationErrors
                    .educationFields
                }
              </ErrorText>

            )}

          </div>


          <div
            className="
              sm:col-span-2
            "
          >

            <p
              className="
                mt-3
                text-sm
                font-black
                text-[#6f4a18]
              "
            >
             زبان‌ها و گویش‌های ایرانی
            </p>


            <ChipSelector
              options={
                EDUCATION_FIELDS2
              }
              selected={
  educationCenter
    .educationFields
}
onToggle={(value) =>
  toggleArrayField(
    "educationFields",
    value
  )
}
            />

          </div>


          <div
            className="
              sm:col-span-2
            "
          >

            <p
              className="
                mt-3
                text-sm
                font-black
                text-[#6f4a18]
              "
            >
              دروس تخصصی مدارس ایران
            </p>


            <ChipSelector
              options={
                EDUCATION_FIELDS3
              }
              selected={
  educationCenter
    .educationFields
}
onToggle={(value) =>
  toggleArrayField(
    "educationFields",
    value
  )
}
            />

          </div>

          <div
            className="
              sm:col-span-2
            "
          >

            <p
              className="
                mt-3
                text-sm
                font-black
                text-[#6f4a18]
              "
            >
              فناوری
            </p>


            <ChipSelector
              options={
                EDUCATION_FIELDS4
              }
              selected={
  educationCenter
    .educationFields
}
onToggle={(value) =>
  toggleArrayField(
    "educationFields",
    value
  )
}
            />

          </div>

          <div
            className="
              sm:col-span-2
            "
          >

            <p
              className="
                mt-3
                text-sm
                font-black
                text-[#6f4a18]
              "
            >
              مهارت‌های فردی
            </p>


            <ChipSelector
              options={
                EDUCATION_FIELDS5
              }
              selected={
  educationCenter
    .educationFields
}
onToggle={(value) =>
  toggleArrayField(
    "educationFields",
    value
  )
}
            />

          </div>


          <div
            className="
              sm:col-span-2
            "
          >

            <p
              className="
                mt-3
                text-sm
                font-black
                text-[#6f4a18]
              "
            >
              سطح دوره‌ها
            </p>


            <ChipSelector
  options={
    COURSE_LEVELS
  }
  selected={
    educationCenter
      .courseLevels
  }
  onToggle={(value) =>
    toggleArrayField(
      "courseLevels",
      value
    )
  }
/>

          </div>


          <div
            className="
              sm:col-span-2
            "
          >

            <p
              className="
                mt-3
                text-sm
                font-black
                text-[#6f4a18]
              "
            >
              شیوه‌های آموزشی
            </p>


            <ChipSelector
              options={
                TEACHING_METHODS
              }
              selected={
                educationCenter
                  .teachingMethods
              }
              onToggle={(
                value
              ) =>
                toggleArrayField(
                  "teachingMethods",
                  value
                )
              }
            />

          </div>

        </FormCard>


        {/* =====================================================
            روزها و ساعات فعالیت
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
                  className="
                    text-[#6f4a18]
                  "
                />

                <h2
                  className="
                    font-black
                    text-[#6f4a18]
                  "
                >
                  روزها و ساعات فعالیت
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
                می‌توانید برای روزهای مختلف هفته ساعات کاری متفاوت تعیین کنید.
              </p>

            </div>


            <button
              type="button"
              onClick={
                addWorkingSchedule
              }
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

          </div>


          {educationCenter
            .workingSchedule
            .length === 0 ? (

            <EmptyBox
              text="هنوز برنامه فعالیتی ثبت نشده است."
            />

          ) : (

            <div
              className="
                mt-5
                space-y-4
              "
            >

              {educationCenter
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
                        برنامه فعالیت{" "}
                        {index + 1}
                      </p>


                      <button
                        type="button"
                        onClick={() =>
                          removeWorkingSchedule(
                            index
                          )
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
                        <Trash2
                          size={14}
                        />
                        حذف
                      </button>

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
                                  transition

                                  ${
  selected
    ? "border-yellow-500 bg-yellow-100 text-[#6f4a18]"
    : "border-gray-200 bg-white text-gray-500"
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
                          schedule
                            .openingTime
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
                      />


                      <TimeInput
                        label="ساعت پایان"
                        value={
                          schedule
                            .closingTime
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
            ظرفیت و فضا
        ===================================================== */}

        <FormCard
          title="ظرفیت و فضای مجموعه آموزشی"
        >

          <SimpleInput
            label="ظرفیت پذیرش هنرجو"
            value={
              educationCenter
                .studentCapacity
            }
            onChange={(
              value
            ) =>
              updateField(
                "studentCapacity",
                value
              )
            }
          />


          <SimpleInput
            label="سال تأسیس"
            value={
              educationCenter
                .foundedYear
            }
            onChange={(
              value
            ) =>
              updateField(
                "foundedYear",
                value
              )
            }
          />


          <SimpleInput
            label="وسعت مجموعه"
            value={
              educationCenter.area
            }
            onChange={(
              value
            ) =>
              updateField(
                "area",
                value
              )
            }
          />


          <SimpleInput
            label="تعداد کلاس‌ها"
            value={
              educationCenter
                .classroomCount
            }
            onChange={(
              value
            ) =>
              updateField(
                "classroomCount",
                value
              )
            }
          />

        </FormCard>


        {/* =====================================================
            امکانات
        ===================================================== */}

        <FormCard
          title="امکانات تخصصی مجموعه آموزشی"
        >

          <div
            className="
              sm:col-span-2
            "
          >

            <p
              className="
                mb-4
                text-xs
                leading-6
                text-gray-500
              "
            >
              امکانات آموزشی و رفاهی مجموعه را انتخاب کنید.
            </p>


            <ChipSelector
              options={
                FACILITY_OPTIONS
              }
              selected={
                educationCenter
                  .facilities
              }
              onToggle={(
                value
              ) =>
                toggleArrayField(
                  "facilities",
                  value
                )
              }
            />

          </div>

        </FormCard>


        {/* =====================================================
            کلاس آنلاین
        ===================================================== */}

        <ToggleDescriptionSection
          title="کلاس‌های آنلاین"
          description="اگر مجموعه علاوه بر کلاس حضوری، آموزش آنلاین نیز ارائه می‌کند این بخش را فعال کنید."
          enabled={
            educationCenter
              .hasOnlineClasses
          }
          onToggle={() =>
            updateField(
              "hasOnlineClasses",
              !educationCenter
                .hasOnlineClasses
            )
          }
          enabledText="مجموعه دارای کلاس آنلاین است."
          disabledText="کلاس آنلاین ارائه نمی‌شود."
          textareaLabel="توضیحات کلاس‌های آنلاین"
          value={
            educationCenter
              .onlineDescription
          }
          onChange={(
            value
          ) =>
            updateField(
              "onlineDescription",
              value
            )
          }
          placeholder="مثلاً: کلاس‌های آنلاین از طریق پلتفرم اختصاصی و به‌صورت زنده برگزار می‌شوند."
        />


        {/* =====================================================
            تعیین سطح
        ===================================================== */}

        <ToggleDescriptionSection
          title="آزمون تعیین سطح"
          description="اگر برای ثبت‌نام هنرجویان آزمون، مصاحبه یا ارزیابی تعیین سطح دارید، این بخش را فعال کنید."
          enabled={
            educationCenter
              .hasPlacementTest
          }
          onToggle={() =>
            updateField(
              "hasPlacementTest",
              !educationCenter
                .hasPlacementTest
            )
          }
          enabledText="مجموعه دارای تعیین سطح است."
          disabledText="تعیین سطح انجام نمی‌شود."
          textareaLabel="توضیحات تعیین سطح"
          value={
            educationCenter
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
          placeholder="مثلاً: قبل از ثبت‌نام، آزمون تعیین سطح رایگان برگزار می‌شود."
        />


        {/* =====================================================
            مدرک
        ===================================================== */}

        <ToggleDescriptionSection
          title="گواهی پایان دوره"
          description="اگر پس از پایان دوره برای هنرجویان گواهی یا مدرک صادر می‌کنید این بخش را فعال کنید."
          enabled={
            educationCenter
              .hasCertificate
          }
          onToggle={() =>
            updateField(
              "hasCertificate",
              !educationCenter
                .hasCertificate
            )
          }
          enabledText="برای دوره‌ها گواهی صادر می‌شود."
          disabledText="گواهی پایان دوره صادر نمی‌شود."
          textareaLabel="توضیحات گواهی"
          value={
            educationCenter
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
          placeholder="مثلاً: پس از پایان موفق دوره، گواهی رسمی مجموعه صادر می‌شود."
        />


        {/* =====================================================
            سرویس رفت و آمد
        ===================================================== */}

        <ToggleDescriptionSection
          title="سرویس رفت‌وآمد هنرجویان"
          description="اگر مجموعه برای رفت‌وآمد کودکان و نوجوانان سرویس ارائه می‌کند این بخش را فعال کنید."
          enabled={
            educationCenter
              .hasTransportation
          }
          onToggle={() =>
            updateField(
              "hasTransportation",
              !educationCenter
                .hasTransportation
            )
          }
          enabledText="مجموعه دارای سرویس رفت‌وآمد است."
          disabledText="سرویس رفت‌وآمد ارائه نمی‌شود."
          textareaLabel="توضیحات سرویس رفت‌وآمد"
          value={
            educationCenter
              .transportationDescription
          }
          onChange={(
            value
          ) =>
            updateField(
              "transportationDescription",
              value
            )
          }
          placeholder="مثلاً: سرویس رفت‌وبرگشت در محدوده مشخصی از شهر ارائه می‌شود."
        />


        {/* =====================================================
            مدرسین
        ===================================================== */}

        <FormCard
          title="مدرسین و کادر آموزشی"
          icon={
            <UserRound
              size={19}
            />
          }
        >

          <SimpleInput
            label="تعداد مدرسین"
            value={
              educationCenter
                .teacherCount
            }
            onChange={(
              value
            ) =>
              updateField(
                "teacherCount",
                value
              )
            }
          />


          <SimpleInput
            label="میانگین سابقه مدرسین"
            value={
              educationCenter
                .teacherExperience
            }
            onChange={(
              value
            ) =>
              updateField(
                "teacherExperience",
                value
              )
            }
          />


          <div
            className="
              sm:col-span-2
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
                  اعضای مدیریتی و مدرسین مجموعه
                </h3>


                <p
                  className="
                    mt-1
                    text-xs
                    leading-6
                    text-gray-400
                  "
                >
                  مدیر، مدرسین و سایر اعضای آموزشی مجموعه را معرفی کنید.
                </p>

              </div>


              <button
                type="button"
                onClick={
                  addStaffMember
                }
                className="
                  shrink-0
                  rounded-lg
                  bg-green-600
                  px-3
                  py-2
                  text-xs
                  font-bold
                  text-white
                "
              >
                + افزودن عضو جدید
              </button>

            </div>


            {educationCenter
              .staffMembers
              .length === 0 ? (

              <EmptyBox
                text="هنوز عضوی ثبت نشده است."
              />

            ) : (

              <div className="space-y-2">

                {educationCenter
                  .staffMembers
                  .map(
                    (
                      member,
                      index
                    ) => (

                    <div
                      key={
                        index
                      }
                      className="
                        rounded-xl
                        border
                        border-yellow-100
                        bg-yellow-50/40
                        p-3
                      "
                    >

                      <div
                        className="
                          flex
                          items-start
                          gap-3
                        "
                      >

                        <div
                          className="
                            flex
                            w-16
                            shrink-0
                            flex-col
                            items-center
                            gap-1
                          "
                        >

                          <label
                            className="
                              flex
                              h-14
                              w-14
                              cursor-pointer
                              items-center
                              justify-center
                              overflow-hidden
                              rounded-full
                              border
                              border-yellow-200
                              bg-yellow-100
                              text-center
                              text-[9px]
                              font-bold
                              text-stone-500
                            "
                          >

                            {member.image ? (

                              <img
                                src={
                                  member.image
                                }
                                alt={
                                  member.name ||
                                  "مدرس"
                                }
                                className="
                                  h-full
                                  w-full
                                  object-cover
                                "
                              />

                            ) : (

                              <span>
                                افزودن
                                <br />
                                عکس
                              </span>

                            )}


                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(
                                e
                              ) => {

                                uploadStaffImage(
                                  index,
                                  e.target
                                    .files?.[0]
                                );

                                e.target.value =
                                  "";
                              }}
                            />

                          </label>


                          {member.image && (

                            <button
                              type="button"
                              onClick={() =>
                                updateStaffMember(
                                  index,
                                  "image",
                                  ""
                                )
                              }
                              className="
                                text-[10px]
                                font-bold
                                text-red-500
                              "
                            >
                              حذف عکس
                            </button>

                          )}

                        </div>


                        <div
                          className="
                            grid
                            flex-1
                            grid-cols-2
                            gap-2
                            lg:grid-cols-5
                          "
                        >

                          <StaffInput
                            placeholder="نام"
                            value={
                              member.name
                            }
                            onChange={(
                              value
                            ) =>
                              updateStaffMember(
                                index,
                                "name",
                                value
                              )
                            }
                          />


                          <StaffInput
                            placeholder="سمت"
                            value={
                              member.position
                            }
                            onChange={(
                              value
                            ) =>
                              updateStaffMember(
                                index,
                                "position",
                                value
                              )
                            }
                          />


                          <StaffInput
                            placeholder="تخصص"
                            value={
                              member.specialty
                            }
                            onChange={(
                              value
                            ) =>
                              updateStaffMember(
                                index,
                                "specialty",
                                value
                              )
                            }
                          />


                          <StaffInput
                            placeholder="تحصیلات"
                            value={
                              member.education
                            }
                            onChange={(
                              value
                            ) =>
                              updateStaffMember(
                                index,
                                "education",
                                value
                              )
                            }
                          />


                          <StaffInput
                            placeholder="سابقه تدریس"
                            value={
                              member.experience
                            }
                            onChange={(
                              value
                            ) =>
                              updateStaffMember(
                                index,
                                "experience",
                                value
                              )
                            }
                          />

                        </div>


                        <button
                          type="button"
                          onClick={() =>
                            removeStaffMember(
                              index
                            )
                          }
                          className="
                            shrink-0
                            rounded-lg
                            bg-red-50
                            px-3
                            py-2
                            text-xs
                            font-bold
                            text-red-600
                          "
                        >
                          ×
                        </button>

                      </div>

                    </div>

                  ))}

              </div>

            )}

          </div>

        </FormCard>


        {/* =====================================================
            رزومه
        ===================================================== */}

        <FormCard
          title="معرفی و رزومه مجموعه آموزشی"
        >

          <div
            className="
              sm:col-span-2
            "
          >

            <p
              className="
                mb-4
                text-xs
                leading-6
                text-gray-500
              "
            >
              درباره سابقه فعالیت، متد آموزشی، مجوزها، افتخارات، نتایج هنرجویان و ویژگی‌های شاخص مجموعه توضیح دهید.
            </p>

          </div>


          <SimpleTextArea
            label="معرفی و رزومه"
            value={
              educationCenter.resume
            }
            onChange={(
              value
            ) =>
              updateField(
                "resume",
                value
              )
            }
          />

        </FormCard>


        {/* =====================================================
            دستاوردها
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
              gap-2
            "
          >

            <Award
              size={21}
              className="
                text-yellow-700
              "
            />

            <h2
              className="
                font-black
                text-[#6f4a18]
              "
            >
              دستاوردهای آموزشی
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
            از این بخش می‌توانید برای هنرجویان مجموعه دستاورد صادر کنید.
          </p>


          <div
            className="
              mt-4
              grid
              grid-cols-3
              gap-2
              sm:gap-3
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
              در بسته مجموعه آموزشی مجوز صدور دستاورد ثبت نشده است
            </div>

          )}


          <div className="mt-5">

  <EducationClassChildrenSection
    selectedChildren={
      educationCenter.children
    }

    onChange={(value) =>
      updateField(
        "children",
        value
      )
    }

    onGiveAchievement={
      handleOpenAchievement
    }
  />

</div>


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
                value={
                  achievementForm
                    .category
                }
                onChange={(
                  e
                ) =>
                  setAchievementForm(
                    (
                      prev
                    ) => ({
                      ...prev,

                      category:
                        e.target
                          .value,
                    })
                  )
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
                  achievementForm
                    .title
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
                        e.target
                          .value,
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
                  achievementForm
                    .description
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
                        e.target
                          .value,
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
  disabled={
    creatingAchievement ||
    remainingAchievementCount <= 0
  }
                  className="
  flex-1
  rounded-xl
  bg-green-600
  py-3
  font-bold
  text-white
  transition
  hover:bg-green-700
  disabled:cursor-not-allowed
  disabled:opacity-50
"
                >
                 {creatingAchievement
  ? "در حال صدور..."
  : "صدور دستاورد"}
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

          {showAchievementHistory && (

  <div
    className="
      mt-5
      rounded-2xl
      border
      border-yellow-200
      bg-[#faf7ef]
      p-4
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

      <div>

        <h3
          className="
            font-black
            text-[#6f4a18]
          "
        >
          تاریخچه دستاوردهای صادرشده
        </h3>

        <p
          className="
            mt-1
            text-xs
            text-gray-400
          "
        >
          دستاوردهایی که این مرکز آموزشی برای هنرجویان صادر کرده است.
        </p>

      </div>


      <button
        type="button"
        onClick={() =>
          setShowAchievementHistory(
            false
          )
        }
        className="
          shrink-0
          rounded-xl
          bg-white
          px-3
          py-2
          text-xs
          font-bold
          text-gray-500
          shadow-sm
        "
      >
        بستن
      </button>

    </div>


    {loadingAchievements ? (

      <div
        className="
          py-10
          text-center
          text-sm
          font-bold
          text-gray-400
        "
      >
        در حال دریافت دستاوردها...
      </div>

    ) : educationAchievements.length === 0 ? (

      <div
        className="
          mt-4
          rounded-2xl
          bg-white
          px-4
          py-8
          text-center
          text-sm
          text-gray-400
        "
      >
        هنوز دستاوردی توسط این مرکز آموزشی صادر نشده است.
      </div>

    ) : (

      <div
        className="
          mt-4
          space-y-3
        "
      >

        {educationAchievements.map(
          (achievement) => (

            <div
              key={
                achievement.id
              }
              className="
                rounded-2xl
                bg-white
                p-4
                shadow-sm
              "
            >

              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-3
                "
              >

                <div
                  className="
                    min-w-0
                    flex-1
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
                      size={17}
                      className="
                        shrink-0
                        text-yellow-600
                      "
                    />

                    <h4
                      className="
                        font-black
                        text-[#6f4a18]
                      "
                    >
                      {
                        achievement.title
                      }
                    </h4>

                  </div>


                  <p
                    className="
                      mt-2
                      text-xs
                      font-bold
                      text-gray-600
                    "
                  >
                    هنرجو:
                    {" "}
                    {
                      achievement
                        .child
                        ?.fullName ||
                      "نامشخص"
                    }
                  </p>

                </div>


                <span
                  className="
                    shrink-0
                    rounded-full
                    bg-yellow-50
                    px-3
                    py-1.5
                    text-[10px]
                    font-black
                    text-yellow-700
                  "
                >
                  {
                    ACHIEVEMENT_CATEGORY_LABELS[
                      achievement.category
                    ] ||
                    achievement.category
                  }
                </span>

              </div>


              {achievement.description && (

                <p
                  className="
                    mt-3
                    whitespace-pre-line
                    rounded-xl
                    bg-[#faf7ef]
                    p-3
                    text-xs
                    leading-6
                    text-gray-500
                  "
                >
                  {
                    achievement.description
                  }
                </p>

              )}


              <div
                className="
                  mt-3
                  border-t
                  border-gray-100
                  pt-3
                  text-[10px]
                  text-gray-400
                "
              >

                تاریخ صدور:
                {" "}

                {achievement.issuedAt
                  ? new Intl.DateTimeFormat(
                      "fa-IR-u-ca-persian",
                      {
                        year:
                          "numeric",
                        month:
                          "long",
                        day:
                          "numeric",
                      }
                    ).format(
                      new Date(
                        achievement.issuedAt
                      )
                    )
                  : "ثبت نشده"}

              </div>

            </div>

          )
        )}

      </div>

    )}

  </div>

)}

        </section>


        {/* =====================================================
            ذخیره
        ===================================================== */}

        <button
          type="button"
          onClick={
            handleSave
          }
          disabled={
            saving
          }
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
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >

          <Save
            size={18}
          />


          {saving
            ? "در حال ذخیره..."
            : "ذخیره اطلاعات مجموعه آموزشی"
          }

        </button>

      </div>

    </main>

  );
}


// =========================================================
// Components
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
          transition

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
}) {

  return (

    <div
      className="
        sm:col-span-2
      "
    >

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


function StaffInput({
  placeholder,
  value,
  onChange,
}) {

  return (

    <input
      placeholder={
        placeholder
      }
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
        h-9
        rounded-lg
        border
        border-gray-200
        bg-white
        px-2
        text-xs
        outline-none
        focus:border-yellow-400
      "
    />

  );
}


function ChipSelector({
  options,
  selected,
  onToggle,
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
              key={
                item
              }
              type="button"
              onClick={() =>
                onToggle(
                  item
                )
              }
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


// =========================================================
// نمای عمومی مرکز آموزشی
// =========================================================

function EducationClassPublicView({
  educationCenter,
  products = [],
  services = [],
  loading,
  loadingProducts,
  loadingServices,
  navigate,
}) {

  const [
    publicActiveHeaderIndex,
    setPublicActiveHeaderIndex,
  ] = useState(0);

  if (loading) {
    return (
      <main
        dir="rtl"
        className="
          min-h-screen
          bg-[#faf7ef]
          px-4
          py-10
        "
      >
        <div
          className="
            mx-auto
            max-w-6xl
            rounded-3xl
            bg-white
            p-10
            text-center
            font-bold
            text-gray-400
            shadow
          "
        >
          در حال دریافت اطلاعات مرکز آموزشی...
        </div>
      </main>
    );
  }


  const headerImages =
    Array.isArray(
      educationCenter?.headerImages
    )
      ? educationCenter.headerImages
      : [];


  const acceptedAges =
    Array.isArray(
      educationCenter?.acceptedAges
    )
      ? educationCenter.acceptedAges
      : [];


  const educationFields =
    Array.isArray(
      educationCenter?.educationFields
    )
      ? educationCenter.educationFields
      : [];


  const courseLevels =
    Array.isArray(
      educationCenter?.courseLevels
    )
      ? educationCenter.courseLevels
      : [];


  const teachingMethods =
    Array.isArray(
      educationCenter?.teachingMethods
    )
      ? educationCenter.teachingMethods
      : [];


  const facilities =
    Array.isArray(
      educationCenter?.facilities
    )
      ? educationCenter.facilities
      : [];


  const workingSchedule =
    Array.isArray(
      educationCenter?.workingSchedule
    )
      ? educationCenter.workingSchedule
      : [];


  const staffMembers =
    Array.isArray(
      educationCenter?.staffMembers
    )
      ? educationCenter.staffMembers.filter(
          (member) =>
            member?.name ||
            member?.position ||
            member?.education ||
            member?.experience ||
            member?.specialty ||
            member?.image
        )
      : [];


  const publishedProducts =
    products.filter(
      (product) =>
        !product?.status ||
        product.status ===
          "PUBLISHED"
    );


  const publishedServices =
    services.filter(
      (service) =>
        !service?.status ||
        service.status ===
          "PUBLISHED"
    );


  const eventServices =
    publishedServices.filter(
      (service) =>
        !service.package &&
        service.scheduleMode !==
          "PACKAGE"
    );


  const courseServices =
    publishedServices.filter(
      (service) =>
        service.package ||
        service.scheduleMode ===
          "PACKAGE"
    );


  return (
    <main
      dir="rtl"
      className="
        min-h-screen
        bg-[#faf7ef]
        px-3
        py-5
        text-gray-800
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

        {/* =================================
            هدر + معرفی
        ================================= */}

        <section
          className="
            rounded-3xl
            border
            border-indigo-100
            bg-white
            p-5
            shadow-md
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

              <div>

                <PromoSlider
                  variant="golden"
                  interval={7000}
                  height="h-44 sm:h-52 md:h-60 lg:h-64"
                  slides={
                    headerImages.map(
                      (
                        item,
                        index
                      ) => ({
                        id: index,

                        image:
                          typeof item ===
                          "string"
                            ? item
                            : item?.url ||
                              "",

                        title: "",
                      })
                    )
                  }
                  onIndexChange={(
                    index
                  ) =>
                    setPublicActiveHeaderIndex(
                      index
                    )
                  }
                />


                {typeof headerImages[
                  publicActiveHeaderIndex
                ] !== "string" &&
                  headerImages[
                    publicActiveHeaderIndex
                  ]?.description && (

                    <div
                      className="
                        mt-3
                        rounded-xl
                        bg-indigo-50
                        px-4
                        py-3
                        text-center
                        text-sm
                        font-bold
                        leading-7
                        text-[#4c3f91]
                      "
                    >
                      {
                        headerImages[
                          publicActiveHeaderIndex
                        ].description
                      }
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
                  from-indigo-100
                  to-violet-100
                "
              >
                <GraduationCap
                  className="
                    h-16
                    w-16
                    text-indigo-500
                  "
                />
              </div>

            )}

          </div>


          <div
            className="
              mx-auto
              max-w-3xl
              px-2
              pb-2
              pt-5
              text-center
            "
          >

            <h1
              className="
                text-xl
                font-black
                text-[#372f6b]
                sm:text-2xl
              "
            >
              {educationCenter
                ?.centerName ||
                "مرکز آموزشی ژنینو"}
            </h1>


            {educationCenter
              ?.slogan && (

              <p
                className="
                  mt-2
                  text-sm
                  font-bold
                  text-[#6d5bb3]
                "
              >
                {
                  educationCenter
                    .slogan
                }
              </p>

            )}


            {educationCenter
              ?.description && (

              <p
                className="
                  mt-4
                  whitespace-pre-line
                  text-sm
                  leading-7
                  text-gray-600
                "
              >
                {
                  educationCenter
                    .description
                }
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

              {educationCenter
                ?.gender && (

                <EducationPublicBadge>
                  {
                    educationCenter
                      .gender
                  }
                </EducationPublicBadge>

              )}


              {acceptedAges.map(
                (age) => (

                  <EducationPublicBadge
                    key={age}
                  >
                    {age}
                  </EducationPublicBadge>

                )
              )}

            </div>

          </div>

        </section>


        {/* =================================
    حوزه‌ها و رشته‌های آموزشی
================================= */}

{[
  {
    title: "زبان‌های خارجی",
    options: EDUCATION_FIELDS,
  },
  {
    title: "زبان‌ها و گویش‌های ایرانی",
    options: EDUCATION_FIELDS2,
  },
  {
    title: "دروس تخصصی مدارس ایران",
    options: EDUCATION_FIELDS3,
  },
  {
    title: "فناوری",
    options: EDUCATION_FIELDS4,
  },
  {
    title: "مهارت‌های فردی",
    options: EDUCATION_FIELDS5,
  },
]
  .map((group) => ({
    ...group,

    items: group.options.filter(
      (item) =>
        educationFields.includes(item)
    ),
  }))
  .filter(
    (group) =>
      group.items.length > 0
  )
  .map((group) => (
    <EducationPublicTagSection
      key={group.title}
      title={group.title}
      items={group.items}
    />
  ))}


        {/* =================================
            سطوح آموزشی
        ================================= */}

        {courseLevels.filter((item) =>
  COURSE_LEVELS.includes(item)
).length > 0 && (

  <EducationPublicTagSection
    title="سطوح دوره‌ها"
    items={
      courseLevels.filter((item) =>
        COURSE_LEVELS.includes(item)
      )
    }
  />

)}


        {/* =================================
            روش تدریس
        ================================= */}

        {teachingMethods.length >
          0 && (

          <EducationPublicTagSection
            title="شیوه‌های تدریس"
            items={
              teachingMethods
            }
          />

        )}


        {/* =================================
            محصولات
        ================================= */}

        <section
          className="
            rounded-[2rem]
            border
            border-indigo-100
            bg-white
            p-5
            shadow-md
          "
        >

          <h2
            className="
              font-black
              text-[#4c3f91]
            "
          >
            محصولات مرکز آموزشی
          </h2>

          <p
            className="
              mt-2
              text-xs
              leading-6
              text-gray-500
            "
          >
            کتاب‌ها، جزوه‌ها،
            ابزارها و محصولات آموزشی
            این مرکز
          </p>


          {loadingProducts ? (

            <p
              className="
                py-8
                text-center
                text-sm
                font-bold
                text-gray-400
              "
            >
              در حال دریافت محصولات...
            </p>

          ) : publishedProducts
              .length > 0 ? (

            <div
              className="
                mt-5
                grid
                grid-cols-2
                gap-3
                sm:grid-cols-3
                sm:gap-4
                lg:grid-cols-4
                lg:gap-6
              "
            >

              {publishedProducts.map(
                (product) => (

                  <ProductCard
                    key={
                      product.id
                    }
                    product={
                      product
                    }
                    source="education-class-public"
                    showFavorite={
                      true
                    }
                  />

                )
              )}

            </div>

          ) : (

            <p
              className="
                py-8
                text-center
                text-sm
                text-gray-400
              "
            >
              هنوز محصول منتشرشده‌ای
              از این مرکز وجود ندارد.
            </p>

          )}

        </section>


        {/* =================================
            خدمات و رویدادها
        ================================= */}

        <EducationPublicServicesSection
          title="رویدادها و خدمات آموزشی"
          description="کارگاه‌ها، آزمون‌ها، جلسات مشاوره و سایر خدمات قابل رزرو مرکز"
          services={
            eventServices
          }
          loading={
            loadingServices
          }
          navigate={
            navigate
          }
        />


        {/* =================================
            دوره‌ها و کلاس‌ها
        ================================= */}

        <EducationPublicServicesSection
          title="دوره‌ها و کلاس‌های آموزشی"
          description="دوره‌ها و کلاس‌های چندجلسه‌ای مرکز آموزشی"
          services={
            courseServices
          }
          loading={
            loadingServices
          }
          navigate={
            navigate
          }
        />


        {/* =================================
            اطلاعات تماس
        ================================= */}

        <EducationPublicInfoSection
          title="اطلاعات تماس و آدرس"
        >

          <EducationPublicInfoItem
            label="شهر"
            value={
              educationCenter
                ?.city
            }
          />

          <EducationPublicInfoItem
            label="منطقه"
            value={
              educationCenter
                ?.district
            }
          />

          <EducationPublicInfoItem
            label="شماره تماس"
            value={
              educationCenter
                ?.phone
            }
          />

          <EducationPublicInfoItem
            label="ایمیل"
            value={
              educationCenter
                ?.email
            }
          />

          <EducationPublicInfoItem
            label="آدرس دقیق"
            value={
              educationCenter
                ?.address
            }
            fullWidth
          />

        </EducationPublicInfoSection>


        {/* =================================
            پذیرش
        ================================= */}

        <EducationPublicInfoSection
          title="اطلاعات پذیرش"
        >

          <EducationPublicInfoItem
            label="جنسیت پذیرش"
            value={
              educationCenter
                ?.gender
            }
          />

          <EducationPublicInfoItem
            label="ظرفیت هنرجو"
            value={
              educationCenter
                ?.studentCapacity
            }
          />

          <EducationPublicInfoItem
            label="گروه‌های سنی"
            value={
              acceptedAges.join(
                "، "
              )
            }
            fullWidth
          />

        </EducationPublicInfoSection>


        {/* =================================
            ساعات فعالیت
        ================================= */}

        {workingSchedule.length >
          0 && (

          <section
            className="
              rounded-[2rem]
              border
              border-indigo-100
              bg-white
              p-5
              shadow-md
            "
          >

            <h2
              className="
                mb-5
                font-black
                text-[#4c3f91]
              "
            >
              روزها و ساعات فعالیت
            </h2>


            <div
              className="
                space-y-3
              "
            >

              {workingSchedule.map(
                (
                  schedule,
                  index
                ) => (

                  <div
                    key={index}
                    className="
                      rounded-2xl
                      bg-indigo-50
                      p-4
                    "
                  >

                    <p
                      className="
                        text-sm
                        font-black
                        text-[#372f6b]
                      "
                    >
                      {Array.isArray(
                        schedule.days
                      )
                        ? schedule.days.join(
                            "، "
                          )
                        : ""}
                    </p>


                    {(schedule.openingTime ||
                      schedule.closingTime) && (

                      <p
                        className="
                          mt-2
                          text-xs
                          font-bold
                          text-gray-500
                        "
                      >
                        ساعت فعالیت:
                        {" "}
                        {
                          schedule
                            .openingTime ||
                          "—"
                        }
                        {" تا "}
                        {
                          schedule
                            .closingTime ||
                          "—"
                        }
                      </p>

                    )}

                  </div>

                )
              )}

            </div>

          </section>

        )}


        {/* =================================
            مشخصات مجموعه
        ================================= */}

        <EducationPublicInfoSection
          title="مشخصات مرکز آموزشی"
        >

          <EducationPublicInfoItem
            label="سال تأسیس"
            value={
              educationCenter
                ?.foundedYear
            }
          />

          <EducationPublicInfoItem
            label="ظرفیت هنرجو"
            value={
              educationCenter
                ?.studentCapacity
            }
          />

          <EducationPublicInfoItem
            label="وسعت مجموعه"
            value={
              educationCenter
                ?.area
            }
          />

          <EducationPublicInfoItem
            label="تعداد کلاس‌ها"
            value={
              educationCenter
                ?.classroomCount
            }
          />

        </EducationPublicInfoSection>


        {/* =================================
            امکانات
        ================================= */}

        {facilities.length > 0 && (

          <EducationPublicTagSection
            title="امکانات مرکز آموزشی"
            items={
              facilities
            }
          />

        )}


        {/* =================================
            ویژگی‌های آموزشی
        ================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-4
            md:grid-cols-2
          "
        >

          <EducationPublicYesNoSection
            title="کلاس آنلاین"
            enabled={
              educationCenter
                ?.hasOnlineClasses
            }
            yesText="این مرکز کلاس آنلاین ارائه می‌کند."
            noText="کلاس آنلاین ارائه نمی‌شود."
            description={
              educationCenter
                ?.onlineDescription
            }
          />


          <EducationPublicYesNoSection
            title="آزمون تعیین سطح"
            enabled={
              educationCenter
                ?.hasPlacementTest
            }
            yesText="این مرکز آزمون تعیین سطح برگزار می‌کند."
            noText="آزمون تعیین سطح ارائه نمی‌شود."
            description={
              educationCenter
                ?.placementTestDescription
            }
          />


          <EducationPublicYesNoSection
            title="صدور گواهی"
            enabled={
              educationCenter
                ?.hasCertificate
            }
            yesText="برای دوره‌های این مرکز امکان صدور گواهی وجود دارد."
            noText="صدور گواهی ارائه نمی‌شود."
            description={
              educationCenter
                ?.certificateDescription
            }
          />


          <EducationPublicYesNoSection
            title="سرویس رفت‌وآمد"
            enabled={
              educationCenter
                ?.hasTransportation
            }
            yesText="این مرکز دارای سرویس رفت‌وآمد است."
            noText="سرویس رفت‌وآمد ارائه نمی‌شود."
            description={
              educationCenter
                ?.transportationDescription
            }
          />

        </div>


        {/* =================================
            مدرسین
        ================================= */}

        <EducationPublicInfoSection
          title="مدرسین و کادر آموزشی"
        >

          <EducationPublicInfoItem
            label="تعداد مدرس"
            value={
              educationCenter
                ?.teacherCount
            }
          />

          <EducationPublicInfoItem
            label="میانگین سابقه"
            value={
              educationCenter
                ?.teacherExperience
            }
          />

        </EducationPublicInfoSection>


        {/* =================================
            اعضای مجموعه
        ================================= */}

        {staffMembers.length > 0 && (

          <section
            className="
              rounded-[2rem]
              border
              border-indigo-100
              bg-white
              p-5
              shadow-md
            "
          >

            <h2
              className="
                mb-4
                font-black
                text-[#4c3f91]
              "
            >
              مدرسین و اعضای مرکز
            </h2>


            <div
              className="
                space-y-3
              "
            >

              {staffMembers.map(
                (
                  member,
                  index
                ) => (

                  <div
                    key={index}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      bg-indigo-50
                      p-3
                    "
                  >

                    <div
                      className="
                        flex
                        h-16
                        w-16
                        shrink-0
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-full
                        bg-indigo-100
                        text-xs
                        text-gray-400
                      "
                    >

                      {member.image ? (

                        <img
                          src={
                            member.image
                          }
                          alt={
                            member.name ||
                            ""
                          }
                          className="
                            h-full
                            w-full
                            object-cover
                          "
                        />

                      ) : (

                        <UserRound
                          size={26}
                        />

                      )}

                    </div>


                    <div
                      className="
                        grid
                        flex-1
                        grid-cols-2
                        gap-2
                        text-xs
                        sm:grid-cols-3
                        lg:grid-cols-5
                      "
                    >

                      <EducationPublicStaffValue
                        label="نام"
                        value={
                          member.name
                        }
                      />

                      <EducationPublicStaffValue
                        label="سمت"
                        value={
                          member.position
                        }
                      />

                      <EducationPublicStaffValue
                        label="تحصیلات"
                        value={
                          member.education
                        }
                      />

                      <EducationPublicStaffValue
                        label="سابقه"
                        value={
                          member.experience
                        }
                      />

                      <EducationPublicStaffValue
                        label="تخصص"
                        value={
                          member.specialty
                        }
                      />

                    </div>

                  </div>

                )
              )}

            </div>

          </section>

        )}


        {/* =================================
            رزومه
        ================================= */}

        {educationCenter?.resume && (

          <section
            className="
              rounded-[2rem]
              border
              border-indigo-100
              bg-white
              p-5
              shadow-md
            "
          >

            <h2
              className="
                font-black
                text-[#4c3f91]
              "
            >
              معرفی و رزومه مرکز آموزشی
            </h2>

            <p
              className="
                mt-4
                whitespace-pre-line
                text-sm
                leading-8
                text-gray-600
              "
            >
              {
                educationCenter
                  .resume
              }
            </p>

          </section>

        )}

      </div>

    </main>
  );
}


// =========================================================
// Badge
// =========================================================

function EducationPublicBadge({
  children,
}) {

  return (
    <span
      className="
        rounded-full
        border
        border-indigo-200
        bg-indigo-50
        px-3
        py-1.5
        text-xs
        font-bold
        text-[#4c3f91]
      "
    >
      {children}
    </span>
  );
}


// =========================================================
// Tag section
// =========================================================

function EducationPublicTagSection({
  title,
  items = [],
}) {

  return (
    <section
      className="
        rounded-[2rem]
        border
        border-indigo-100
        bg-white
        p-5
        shadow-md
      "
    >

      <h2
        className="
          mb-4
          font-black
          text-[#4c3f91]
        "
      >
        {title}
      </h2>

      <div
        className="
          flex
          flex-wrap
          gap-2
        "
      >
        {items.map(
          (item) => (

            <EducationPublicBadge
              key={item}
            >
              {item}
            </EducationPublicBadge>

          )
        )}
      </div>

    </section>
  );
}


// =========================================================
// Info section
// =========================================================

function EducationPublicInfoSection({
  title,
  children,
}) {

  return (
    <section
      className="
        rounded-[2rem]
        border
        border-indigo-100
        bg-white
        p-5
        shadow-md
      "
    >

      <h2
        className="
          mb-5
          font-black
          text-[#4c3f91]
        "
      >
        {title}
      </h2>

      <div
        className="
          grid
          grid-cols-1
          gap-3
          sm:grid-cols-2
        "
      >
        {children}
      </div>

    </section>
  );
}


// =========================================================
// Info item
// =========================================================

function EducationPublicInfoItem({
  label,
  value,
  fullWidth = false,
}) {

  const normalizedValue =
    value === null ||
    value === undefined
      ? ""
      : String(value).trim();

  if (!normalizedValue) {
    return null;
  }

  return (
    <div
      className={`
        flex
        items-center
        gap-2
        rounded-xl
        bg-indigo-50
        px-3
        py-2

        ${
          fullWidth
            ? "sm:col-span-2"
            : ""
        }
      `}
    >

      <span
        className="
          shrink-0
          text-[11px]
          font-bold
          text-gray-400
        "
      >
        {label}
      </span>

      <span
        className="
          text-xs
          font-black
          text-[#6d5bb3]
        "
      >
        |
      </span>

      <span
        className="
          min-w-0
          break-words
          text-xs
          font-bold
          text-[#372f6b]
        "
      >
        {normalizedValue}
      </span>

    </div>
  );
}


// =========================================================
// Staff value
// =========================================================

function EducationPublicStaffValue({
  label,
  value,
}) {

  return (
    <div>

      <p
        className="
          text-[10px]
          text-gray-400
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          break-words
          font-bold
          text-[#372f6b]
        "
      >
        {value || "ثبت نشده"}
      </p>

    </div>
  );
}


// =========================================================
// Yes / No
// =========================================================

function EducationPublicYesNoSection({
  title,
  enabled,
  yesText,
  noText,
  description,
}) {

  return (
    <section
      className="
        rounded-[2rem]
        border
        border-indigo-100
        bg-white
        p-5
        shadow-md
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

        <h2
          className="
            font-black
            text-[#4c3f91]
          "
        >
          {title}
        </h2>

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
                : "bg-gray-100 text-gray-500"
            }
          `}
        >
          {enabled
            ? "دارد"
            : "ندارد"}
        </span>

      </div>


      <p
        className="
          mt-4
          text-sm
          font-bold
          text-gray-600
        "
      >
        {enabled
          ? yesText
          : noText}
      </p>


      {enabled &&
        description && (

        <p
          className="
            mt-3
            whitespace-pre-line
            text-sm
            leading-7
            text-gray-500
          "
        >
          {description}
        </p>

      )}

    </section>
  );
}


// =========================================================
// Services
// =========================================================

function EducationPublicServicesSection({
  title,
  description,
  services = [],
  loading,
  navigate,
}) {

  const typeLabels = {
    EVENT:
      "رویداد",
    CLASS:
      "کلاس",
    WORKSHOP:
      "کارگاه",
    CAMP:
      "اردو",
    CONSULTATION:
      "مشاوره",
    OTHER:
      "سایر خدمات",
  };


  const getServiceImage = (
    service
  ) => {

    if (
      Array.isArray(
        service?.images
      ) &&
      service.images.length > 0
    ) {

      const firstImage =
        service.images[0];

      return typeof firstImage ===
        "string"
        ? firstImage
        : firstImage?.url ||
            firstImage?.imageUrl ||
            "";
    }


    if (
      typeof service?.images ===
      "string"
    ) {

      try {

        const parsed =
          JSON.parse(
            service.images
          );

        const firstImage =
          Array.isArray(parsed)
            ? parsed[0]
            : null;

        return typeof firstImage ===
          "string"
          ? firstImage
          : firstImage?.url ||
              firstImage?.imageUrl ||
              "";

      } catch {
        return "";
      }
    }


    return (
      service?.image ||
      service?.imageUrl ||
      ""
    );
  };


  const getServicePrice = (
    service
  ) => {

    if (
      service?.isFree === true ||
      Number(
        service?.price
      ) === 0
    ) {
      return "رایگان";
    }

    const price =
      Number(
        service?.price || 0
      );

    if (!price) {
      return "قیمت ثبت نشده";
    }

    return `${price.toLocaleString(
      "fa-IR"
    )} تومان`;
  };


  const isServiceExpired = (
    service
  ) => {

    const sessions =
      Array.isArray(
        service?.sessions
      )
        ? service.sessions
        : [];

    const now =
      new Date();

    if (
      sessions.length > 0
    ) {

      const futureSessions =
        sessions.filter(
          (session) => {

            if (
              !session?.endAt
            ) {
              return false;
            }

            return (
              new Date(
                session.endAt
              ) > now
            );
          }
        );

      return (
        futureSessions.length ===
        0
      );
    }

    if (service?.endAt) {
      return (
        new Date(
          service.endAt
        ) <= now
      );
    }

    return false;
  };


  if (loading) {
    return (
      <section
        className="
          rounded-[2rem]
          border
          border-indigo-100
          bg-white
          p-5
          shadow-md
        "
      >

        <h2
          className="
            font-black
            text-[#4c3f91]
          "
        >
          {title}
        </h2>

        <p
          className="
            py-10
            text-center
            text-sm
            font-bold
            text-gray-400
          "
        >
          در حال دریافت خدمات...
        </p>

      </section>
    );
  }


  return (
    <section
      className="
        rounded-[2rem]
        border
        border-indigo-100
        bg-white
        p-5
        shadow-md
      "
    >

      <h2
        className="
          font-black
          text-[#4c3f91]
        "
      >
        {title}
      </h2>


      {description && (

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

      )}


      {services.length > 0 ? (

        <div
          className="
            mt-5
            grid
            grid-cols-2
            gap-3
            sm:grid-cols-3
            sm:gap-4
            lg:grid-cols-4
            lg:gap-6
          "
        >

          {services.map(
            (service) => {

              const image =
                getServiceImage(
                  service
                );

              const isCourse =
                Boolean(
                  service.package
                ) ||
                service.scheduleMode ===
                  "PACKAGE";

              const expired =
                isServiceExpired(
                  service
                );

              return (

                <article
                  key={
                    service.id
                  }
                  className={`
                    overflow-hidden
                    rounded-3xl
                    border
                    bg-white
                    shadow-sm
                    transition
                    hover:-translate-y-1
                    hover:shadow-md

                    ${
                      expired
                        ? "border-gray-200 opacity-80"
                        : "border-indigo-100"
                    }
                  `}
                >

                  <div
                    className="
                      relative
                      h-40
                      overflow-hidden
                      bg-indigo-50
                    "
                  >

                    {image ? (

                      <img
                        src={image}
                        alt={
                          service.title ||
                          "خدمت آموزشی"
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
                        "
                      >
                        <GraduationCap
                          className="
                            h-12
                            w-12
                            text-indigo-300
                          "
                        />
                      </div>

                    )}


                    <span
                      className="
                        absolute
                        right-3
                        top-3
                        rounded-full
                        bg-white/95
                        px-3
                        py-1
                        text-[11px]
                        font-black
                        text-[#4c3f91]
                        shadow
                      "
                    >
                      {isCourse
                        ? "دوره آموزشی"
                        : typeLabels[
                            service
                              .serviceType
                          ] ||
                          "خدمت"}
                    </span>


                    {expired && (

                      <span
                        className="
                          absolute
                          left-3
                          top-3
                          rounded-full
                          bg-gray-800/90
                          px-3
                          py-1
                          text-[10px]
                          font-black
                          text-white
                        "
                      >
                        پایان یافته
                      </span>

                    )}

                  </div>


                  <div className="p-4">

                    <h3
                      className="
                        line-clamp-2
                        min-h-[3rem]
                        text-sm
                        font-black
                        leading-6
                        text-[#372f6b]
                      "
                    >
                      {service.title ||
                        "خدمت آموزشی"}
                    </h3>


                    {service
                      .description && (

                      <p
                        className="
                          mt-2
                          line-clamp-2
                          text-xs
                          leading-6
                          text-gray-500
                        "
                      >
                        {
                          service
                            .description
                        }
                      </p>

                    )}


                    <div
                      className="
                        mt-4
                        flex
                        items-center
                        justify-between
                        gap-2
                      "
                    >

                      <span
                        className="
                          text-sm
                          font-black
                          text-[#4c3f91]
                        "
                      >
                        {getServicePrice(
                          service
                        )}
                      </span>


                      {service
                        .capacity && (

                        <span
                          className="
                            text-[11px]
                            font-bold
                            text-gray-400
                          "
                        >
                          ظرفیت:
                          {" "}
                          {
                            service
                              .capacity
                          }
                        </span>

                      )}

                    </div>


                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          isCourse
                            ? `/course/${service.id}`
                            : `/service/${service.id}`
                        )
                      }
                      className={`
                        mt-4
                        w-full
                        rounded-2xl
                        px-4
                        py-2.5
                        text-sm
                        font-black
                        text-white
                        transition

                        ${
                          expired
                            ? "bg-gray-500 hover:bg-gray-600"
                            : "bg-[#6d5bb3] hover:bg-[#4c3f91]"
                        }
                      `}
                    >
                      {expired
                        ? "پایان یافته — مشاهده جزئیات"
                        : isCourse
                          ? "مشاهده دوره"
                          : "مشاهده و رزرو"}
                    </button>

                  </div>

                </article>

              );
            }
          )}

        </div>

      ) : (

        <p
          className="
            py-8
            text-center
            text-sm
            text-gray-400
          "
        >
          هنوز موردی منتشر نشده است.
        </p>

      )}

    </section>
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

function EducationServiceManagementSection({
  title,
  description,
  services = [],
  loading,
  vendorId,
  centerName,
  navigate,
  onDelete,
  onPublish,
  onUnpublish,
}) {

  const typeLabels = {
    EVENT: "جشن و رویداد",
    CLASS: "کلاس",
    WORKSHOP: "کارگاه",
    CAMP: "اردو",
    CONSULTATION: "مشاوره",
    OTHER: "سایر خدمات",
  };


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
        "
      >

        <div>

          <h3 className="font-black text-[#6f4a18]">
            {title}
          </h3>

          <p className="mt-1 text-xs text-gray-400">
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
          {services.length}
        </span>

      </div>


      {loading ? (

        <div className="py-10 text-center text-sm font-bold text-gray-400">
          در حال دریافت اطلاعات...
        </div>

      ) : services.length === 0 ? (

        <EmptyBox
          text="هنوز موردی ثبت نشده است."
        />

      ) : (

        <div
          className="
            grid
            grid-cols-2
            gap-3
            sm:grid-cols-3
            sm:gap-4
            lg:grid-cols-4
          "
        >

          {services.map(
            (service) => {

              const serviceImages =
                Array.isArray(
                  service.images
                )
                  ? service.images
                  : [];

              const mainImage =
                serviceImages[
                  Number(
                    service.mainImageIndex ||
                    0
                  )
                ] ||
                serviceImages[0] ||
                "";


              const isCourse =
                service.package ||
                service.scheduleMode ===
                  "PACKAGE";


              const startText =
                isCourse &&
                service.package

                  ? `شروع دوره: ${
                      service.package
                        .startDate
                        ? new Date(
                            service.package
                              .startDate
                          ).toLocaleDateString(
                            "fa-IR"
                          )
                        : "ثبت نشده"
                    } | ${
                      service.package
                        .totalSessions ||
                      0
                    } جلسه`

                  : service.startAt
                  ? new Date(
                      service.startAt
                    ).toLocaleString(
                      "fa-IR",
                      {
                        year:
                          "numeric",
                        month:
                          "2-digit",
                        day:
                          "2-digit",
                        hour:
                          "2-digit",
                        minute:
                          "2-digit",
                      }
                    )

                  : "زمان ثبت نشده";


              return (

                <div
                  key={service.id}
                  className="
                    flex
                    flex-col
                    gap-2
                  "
                >

                  <div
                    className="
                      overflow-hidden
                      rounded-3xl
                      border
                      border-yellow-100
                      bg-white
                      shadow-sm
                    "
                  >

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
                            "خدمت آموزشی"
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
                          {isCourse
                            ? "🎓"
                            : "📚"}
                        </div>

                      )}


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
                        "
                      >
                        {
                          typeLabels[
                            service.serviceType
                          ] ||
                          (isCourse
                            ? "دوره"
                            : "خدمت")
                        }
                      </span>


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
                          text-white

                          ${
                            service.status ===
                            "PUBLISHED"
                              ? "bg-green-600"
                              : "bg-gray-700"
                          }
                        `}
                      >
                        {service.status ===
                        "PUBLISHED"
                          ? "منتشرشده"
                          : "پیش‌نویس"}
                      </span>

                    </div>


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
                        {centerName ||
                          "مجموعه آموزشی"}
                      </p>


                      <p className="mt-2 text-xs text-gray-400">
                        {startText}
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

                        <span className="text-xs font-bold text-gray-500">
                          ظرفیت:{" "}
                          {service.capacity ||
                            "—"}{" "}
                          نفر
                        </span>


                        <span className="text-xs font-black text-[#7a5526]">
                          {service.isFree
                            ? "رایگان"
                            : `${Number(
                                service.price ||
                                  0
                              ).toLocaleString(
                                "fa-IR"
                              )} ریال`}
                        </span>

                      </div>

                    </div>

                  </div>


                  <div className="grid grid-cols-2 gap-2">

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/vendor/service/edit/${service.id}?source=education-class&vendorId=${vendorId}&mode=${service.scheduleMode}`
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
                      "
                    >
                      <Pencil size={14} />
                      ویرایش
                    </button>


                    <button
                      type="button"
                      onClick={() =>
                        onDelete(
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
                      "
                    >
                      <Trash2 size={14} />
                      حذف
                    </button>

                  </div>


                  {service.status ===
                  "PUBLISHED" ? (

                    <button
                      type="button"
                      onClick={() =>
                        onUnpublish(
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
                      "
                    >
                      عدم انتشار
                    </button>

                  ) : (

                    <button
                      type="button"
                      onClick={() =>
                        onPublish(
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
                      "
                    >
                      انتشار
                    </button>

                  )}

                </div>

              );
            }
          )}

        </div>

      )}

    </section>

  );
}




function EmptyManagementSection({
  title,
  description,
  count,
  unit,
  emptyText,
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
            shrink-0
            rounded-full
            bg-yellow-50
            px-3
            py-1
            text-xs
            font-bold
            text-yellow-700
          "
        >
          {count} {unit}
        </span>

      </div>


      {count === 0 && (

        <EmptyBox
          text={
            emptyText
          }
        />

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
          onClick={
            onToggle
          }
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