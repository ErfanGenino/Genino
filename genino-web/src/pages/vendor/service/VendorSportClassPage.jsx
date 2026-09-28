// D:\projects\Genino\genino-web\src\pages\vendor\service\VendorSportClassPage.jsx
import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  Save,
  MapPin,
  Clock3,
  UsersRound,
  Upload,
  Trash2,
  Award,
  Dumbbell,
  UserRound,
  Trophy,
  ShieldCheck,
} from "lucide-react";

import PromoSlider from "../../../components/Social/PromoSlider.jsx";
import ProductCard from "../../../components/Product/ProductCard";
import SportClassStudentsSection from "./components/SportClassStudentsSection";

import {
  getVendorSportClassProfile,
  saveVendorSportClassProfile,
  presignVendorKindergartenHeaderUpload,
  presignVendorKindergartenStaffUpload,
  putFileToPresignedUrl,
  getVendorChildren,
  searchVendorChildren,
  addVendorChild,
  removeVendorChild,
  createSportClassAchievement,
  getSportClassAchievements,
} from "../../../services/api";


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


const SPORT_FIELDS = [
  "فوتبال",
    "فوتسال",
    "بسکتبال",
    "والیبال",
    "هندبال",
    "هاکی",
    "کبدی",
    "چوگان",
    "آمادگی جسمانی گروهی",
    "بازی‌های گروهی ورزشی",
];

const SPORT_FIELDS2 = [
  "شنا",
    "تنیس",
    "پدل",
    "تنیس روی میز",
    "بدمینتون",
    "دو و میدانی",
    "دوچرخه‌سواری",
    "اسکیت",
    "صخره‌نوردی",
    "کوهنوردی",
    "اسب‌سواری",
    "تیراندازی",
    "شطرنج",
    "گلف",
    "بولینگ",
    "بیلیارد",
];

const SPORT_FIELDS3 = [
  "کاراته",
    "تکواندو",
    "جودو",
    "کونگ‌فو",
    "ووشو",
    "بوکس",
    "کیک‌بوکسینگ",
    "موی تای",
    "جوجیتسو",
    "هاپکیدو",
    "کشتی",
    "کشتی آزاد",
    "کشتی فرنگی",
    "دفاع شخصی",
    "نینجوتسو",
    "آیکیدو",
];

const SPORT_FIELDS4 = [
  "آمادگی جسمانی",
    "فیتنس",
    "بدنسازی",
    "کراس فیت",
    "فانکشنال ترینینگ",
    "TRX",
    "ایروبیک",
    "پیلاتس",
    "یوگا",
    "زومبا",
    "حرکات اصلاحی",
    "تمرینات کششی",
    "ورزش سالمندان",
    "ورزش بانوان",
    "ورزش پس از زایمان",
];

const SPORT_FIELDS5 = [
  "شنا کودک",
    "ژیمناستیک کودک",
    "فوتبال کودک",
    "بسکتبال کودک",
    "والیبال کودک",
    "تکواندو کودک",
    "کاراته کودک",
    "اسکیت کودک",
    "دوچرخه‌سواری کودک",
    "شطرنج کودک",
    "یوگا کودک",
    "ورزش مادر و کودک",
    "حرکات اصلاحی کودک",
    "بازی‌های حرکتی",
    "استعدادیابی ورزشی",
];


const COURSE_LEVELS = [
  "مبتدی",
  "نیمه‌حرفه‌ای",
  "حرفه‌ای",
  "قهرمانی",
  "همه سطوح",
];


const TEACHING_METHODS = [
  "گروهی",
  "خصوصی",
  "نیمه‌خصوصی",
  "تمرین تخصصی",
  "تمرین آمادگی جسمانی",
  "استعدادیابی",
  "آمادگی مسابقات",
  "تمرین تفریحی",
];


const FACILITY_OPTIONS = [
  "سالن ورزشی",
  "زمین چمن",
  "زمین فوتسال",
  "زمین بسکتبال",
  "زمین والیبال",
  "زمین تنیس",
  "استخر",
  "سالن رزمی",
  "سالن ژیمناستیک",
  "پیست دوومیدانی",
  "فضای تمرین روباز",
  "تجهیزات بدنسازی",
  "تجهیزات تخصصی کودک",
  "تشک ورزشی",
  "رختکن",
  "کمد شخصی",
  "دوش",
  "سرویس بهداشتی",
  "آب‌سردکن",
  "سیستم سرمایش و گرمایش",
  "فضای انتظار والدین",
  "بوفه",
  "پارکینگ",
  "دوربین نظارتی",
  "کمک‌های اولیه",
  "آسانسور",
];


const ACHIEVEMENT_TYPES = [
  {
    value: "SPORT",
    label: "دستاورد ورزشی",
  },
  {
    value: "SKILL",
    label: "پیشرفت مهارتی",
  },
  {
    value: "FITNESS",
    label: "پیشرفت آمادگی جسمانی",
  },
  {
    value: "COMPETITION",
    label: "مسابقه و قهرمانی",
  },
  {
    value: "TEAMWORK",
    label: "کار تیمی",
  },
  {
    value: "DISCIPLINE",
    label: "نظم و پشتکار",
  },
];


// =========================================================
// صفحه اصلی
// =========================================================

export default function VendorSportClassPage() {

  const { vendorId } = useParams();

  const navigate = useNavigate();

  const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

    const loggedVendorId =
    localStorage.getItem(
      "genino_vendor_id"
    );

  const isVendorOwner =
    Boolean(loggedVendorId) &&
    Number(loggedVendorId) ===
      Number(vendorId);

  const searchParams =
    new URLSearchParams(
      window.location.search
    );

  const forcePublicView =
    searchParams.get("view") ===
    "public";

  const isPublicView =
    forcePublicView ||
    !isVendorOwner;


  const [
    activeHeaderIndex,
    setActiveHeaderIndex,
  ] = useState(0);


  const [
    saving,
    setSaving,
  ] = useState(false);

    const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    loadingProducts,
    setLoadingProducts,
  ] = useState(true);


  const [
    loadingServices,
    setLoadingServices,
  ] = useState(true);


  const [
    uploadingHeader,
    setUploadingHeader,
  ] = useState(false);


  const [
    uploadingStaffIndex,
    setUploadingStaffIndex,
  ] = useState(null);


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


  // =========================================================
  // اطلاعات موقت بسته
  // بعداً از API دریافت می‌شوند
  // =========================================================

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
    services,
    setServices,
  ] = useState([]);


  const [
    achievements,
    setAchievements,
  ] = useState([]);


  const [
    sportChildren,
    setSportChildren,
  ] = useState([]);


  // =========================================================
  // اطلاعات مجموعه ورزشی
  // =========================================================

    const [
    sportCenter,
    setSportCenter,
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

    sportFields: [],
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

    hasCompetition: false,
    competitionDescription: "",

    hasCertificate: false,
    certificateDescription: "",

    providesSportEquipment: false,
    sportEquipmentDescription: "",

    hasTransportation: false,
    transportationDescription: "",

    teacherCount: "",
    teacherExperience: "",

    staffMembers: [],

    resume: "",
  });

    // =========================================================
  // دریافت اطلاعات مجموعه ورزشی
  // =========================================================

  useEffect(() => {

    async function loadSportClassProfile() {

      if (!vendorId) {
        setLoading(false);
        return;
      }


      try {

        setLoading(true);


        const res =
          await getVendorSportClassProfile(
            vendorId
          );


        console.log(
          "SPORT CLASS PROFILE RESPONSE:",
          res
        );


        if (
          res?.ok &&
          res?.profile
        ) {

          setSportCenter(
            (prev) => ({
              ...prev,
              ...res.profile,

              headerImages:
                Array.isArray(
                  res.profile.headerImages
                )
                  ? res.profile.headerImages.filter(
                      (item) => {

                        const url =
                          typeof item === "string"
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
                  res.profile.acceptedAges
                )
                  ? res.profile.acceptedAges
                  : [],


              sportFields:
                Array.isArray(
                  res.profile.sportFields
                )
                  ? res.profile.sportFields
                  : [],


              courseLevels:
                Array.isArray(
                  res.profile.courseLevels
                )
                  ? res.profile.courseLevels
                  : [],


              teachingMethods:
                Array.isArray(
                  res.profile.teachingMethods
                )
                  ? res.profile.teachingMethods
                  : [],


              workingSchedule:
                Array.isArray(
                  res.profile.workingSchedule
                )
                  ? res.profile.workingSchedule
                  : [],


              facilities:
                Array.isArray(
                  res.profile.facilities
                )
                  ? res.profile.facilities
                  : [],


              staffMembers:
                Array.isArray(
                  res.profile.staffMembers
                )
                  ? res.profile.staffMembers
                  : [],
            })
          );
        }


      } catch (error) {

        console.error(
          "LOAD SPORT CLASS PROFILE ERROR:",
          error
        );


        alert(
          "خطا در دریافت اطلاعات مجموعه ورزشی"
        );


      } finally {

        setLoading(false);
      }
    }


    loadSportClassProfile();

  }, [vendorId]);

  // =========================================================
// دریافت اطلاعات بسته + محصولات مجموعه ورزشی
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


      const productsUrl =
        isVendorOwner
          ? `${API_BASE_URL}/vendor-products/vendor/${vendorId}`
          : `${API_BASE_URL}/vendor-products/public`;


      const productHeaders =
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


      const [
        vendorRes,
        productsRes,
      ] = await Promise.all([

        fetch(
          `${API_BASE_URL}/vendors/${vendorId}`,
          {
            method: "GET",

            headers: {
              Accept:
                "application/json",
            },
          }
        ),


        fetch(
          productsUrl,
          {
            method: "GET",

            headers:
              productHeaders,
          }
        ),

      ]);


      const vendorData =
        await vendorRes.json();


      const productsData =
        await productsRes.json();


      if (
        !vendorRes.ok ||
        !vendorData?.ok
      ) {

        throw new Error(
          vendorData?.message ||
            "خطا در دریافت اطلاعات بسته مجموعه ورزشی"
        );
      }


      if (
        !productsRes.ok ||
        !productsData?.ok
      ) {

        throw new Error(
          productsData?.message ||
            "خطا در دریافت محصولات مجموعه ورزشی"
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
                : product.images ||
                  [],
          })
        );


      const vendorProducts =
        isVendorOwner
          ? fixedProducts
          : fixedProducts.filter(
              (product) => {

                const productVendorId =
                  product.vendorId ??
                  product.vendor?.id;


                return (
                  Number(
                    productVendorId
                  ) ===
                  Number(
                    vendorId
                  )
                );

              }
            );


      setProducts(
        vendorProducts
      );


    } catch (error) {

      console.error(
        "LOAD SPORT CLASS PACKAGE / PRODUCTS ERROR:",
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
  API_BASE_URL,
  isVendorOwner,
]);


// =========================================================
// دریافت خدمات مجموعه ورزشی
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
          ? `${API_BASE_URL}/vendor-services/vendor/${vendorId}`
          : `${API_BASE_URL}/vendor-services/public/vendor/${vendorId}`;


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


      const res =
        await fetch(
          servicesUrl,
          {
            method: "GET",
            headers,
          }
        );


      const data =
        await res.json();


      if (
        !res.ok ||
        !data?.ok
      ) {

        throw new Error(
          data?.message ||
            "خطا در دریافت خدمات مجموعه ورزشی"
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
        "LOAD SPORT CLASS SERVICES ERROR:",
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
  API_BASE_URL,
  isVendorOwner,
]);


// =========================================================
// دریافت تاریخچه دستاوردهای مجموعه ورزشی
// =========================================================

useEffect(() => {

  async function loadSportClassAchievements() {

    if (
      !vendorId ||
      !isVendorOwner
    ) {
      return;
    }


    try {

      const res =
        await getSportClassAchievements(
          vendorId
        );


      console.log(
        "SPORT CLASS ACHIEVEMENTS RESPONSE:",
        res
      );


      if (!res?.ok) {

        throw new Error(
          res?.error ||
          res?.message ||
          "خطا در دریافت تاریخچه دستاوردها"
        );
      }


      setAchievements(
        Array.isArray(
          res?.achievements
        )
          ? res.achievements
          : []
      );


    } catch (error) {

      console.error(
        "LOAD SPORT CLASS ACHIEVEMENTS ERROR:",
        error
      );


      setAchievements([]);
    }
  }


  loadSportClassAchievements();

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

    setSportCenter(
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

  const loadingWindows =
  loadingProducts ||
  loadingServices;


  const remainingAchievementCount =
    Math.max(
      packageAchievementLimit -
        achievementUsedCount,
      0
    );


    // =========================================================
// مدیریت کالاهای مجموعه ورزشی
// =========================================================

const handleDeleteProduct =
  async (productId) => {

    const confirmed =
      window.confirm(
        "آیا از حذف این محصول مطمئن هستید؟"
      );

    if (!confirmed) {
      return;
    }


    try {

      const token =
        localStorage.getItem(
          "genino_token"
        );


      const res =
        await fetch(
          `${API_BASE_URL}/vendor-products/${productId}`,
          {
            method: "DELETE",

            headers: {
              Authorization:
                `Bearer ${token}`,

              Accept:
                "application/json",
            },
          }
        );


      const data =
        await res.json();


      if (
        !res.ok ||
        !data?.ok
      ) {

        throw new Error(
          data?.message ||
          "خطا در حذف محصول"
        );
      }


      setProducts(
        (prev) =>
          prev.filter(
            (product) =>
              Number(product.id) !==
              Number(productId)
          )
      );


      alert(
        "محصول با موفقیت حذف شد."
      );


    } catch (error) {

      console.error(
        "DELETE SPORT PRODUCT ERROR:",
        error
      );


      alert(
        error?.message ||
        "خطا در حذف محصول"
      );
    }
  };


// =========================================================
// انتشار محصول
// =========================================================

const handlePublishProduct =
  async (productId) => {

    try {

      const token =
        localStorage.getItem(
          "genino_token"
        );


      const res =
        await fetch(
          `${API_BASE_URL}/vendor-products/${productId}/publish`,
          {
            method: "PATCH",

            headers: {
              Authorization:
                `Bearer ${token}`,

              Accept:
                "application/json",
            },
          }
        );


      const data =
        await res.json();


      if (
        !res.ok ||
        !data?.ok
      ) {

        throw new Error(
          data?.message ||
          "خطا در انتشار محصول"
        );
      }


      setProducts(
        (prev) =>
          prev.map(
            (product) =>
              Number(product.id) ===
              Number(productId)
                ? {
                    ...product,
                    status:
                      "PUBLISHED",
                  }
                : product
          )
      );


      alert(
        "محصول با موفقیت منتشر شد."
      );


    } catch (error) {

      console.error(
        "PUBLISH SPORT PRODUCT ERROR:",
        error
      );


      alert(
        error?.message ||
        "خطا در انتشار محصول"
      );
    }
  };


// =========================================================
// لغو انتشار محصول
// =========================================================

const handleUnpublishProduct =
  async (productId) => {

    try {

      const token =
        localStorage.getItem(
          "genino_token"
        );


      const res =
        await fetch(
          `${API_BASE_URL}/vendor-products/${productId}/unpublish`,
          {
            method: "PATCH",

            headers: {
              Authorization:
                `Bearer ${token}`,

              Accept:
                "application/json",
            },
          }
        );


      const data =
        await res.json();


      if (
        !res.ok ||
        !data?.ok
      ) {

        throw new Error(
          data?.message ||
          "خطا در لغو انتشار محصول"
        );
      }


      setProducts(
        (prev) =>
          prev.map(
            (product) =>
              Number(product.id) ===
              Number(productId)
                ? {
                    ...product,
                    status:
                      "DRAFT",
                  }
                : product
          )
      );


      alert(
        "محصول از حالت انتشار خارج شد."
      );


    } catch (error) {

      console.error(
        "UNPUBLISH SPORT PRODUCT ERROR:",
        error
      );


      alert(
        error?.message ||
        "خطا در لغو انتشار محصول"
      );
    }
  };


  // =========================================================
// مدیریت خدمات و دوره‌های مجموعه ورزشی
// =========================================================

const handleDeleteService =
  async (serviceId) => {

    const confirmed =
      window.confirm(
        "آیا از حذف این خدمت یا دوره مطمئن هستید؟"
      );

    if (!confirmed) {
      return;
    }


    try {

      const token =
        localStorage.getItem(
          "genino_token"
        );


      const res =
        await fetch(
          `${API_BASE_URL}/vendor-services/${serviceId}`,
          {
            method: "DELETE",

            headers: {
              Authorization:
                `Bearer ${token}`,

              Accept:
                "application/json",
            },
          }
        );


      const data =
        await res.json();


      if (
        !res.ok ||
        !data?.ok
      ) {

        throw new Error(
          data?.message ||
          "خطا در حذف خدمت یا دوره"
        );
      }


      setServices(
        (prev) =>
          prev.filter(
            (service) =>
              Number(service.id) !==
              Number(serviceId)
          )
      );


      alert(
        "خدمت یا دوره با موفقیت حذف شد."
      );


    } catch (error) {

      console.error(
        "DELETE SPORT SERVICE ERROR:",
        error
      );


      alert(
        error?.message ||
        "خطا در حذف خدمت یا دوره"
      );
    }
  };


// =========================================================
// انتشار خدمت یا دوره
// =========================================================

const handlePublishService =
  async (serviceId) => {

    try {

      const token =
        localStorage.getItem(
          "genino_token"
        );


      const res =
        await fetch(
          `${API_BASE_URL}/vendor-services/${serviceId}/publish`,
          {
            method: "PATCH",

            headers: {
              Authorization:
                `Bearer ${token}`,

              Accept:
                "application/json",
            },
          }
        );


      const data =
        await res.json();


      if (
        !res.ok ||
        !data?.ok
      ) {

        throw new Error(
          data?.message ||
          "خطا در انتشار خدمت یا دوره"
        );
      }


      setServices(
        (prev) =>
          prev.map(
            (service) =>
              Number(service.id) ===
              Number(serviceId)
                ? {
                    ...service,
                    status:
                      "PUBLISHED",
                  }
                : service
          )
      );


      alert(
        "خدمت یا دوره با موفقیت منتشر شد."
      );


    } catch (error) {

      console.error(
        "PUBLISH SPORT SERVICE ERROR:",
        error
      );


      alert(
        error?.message ||
        "خطا در انتشار خدمت یا دوره"
      );
    }
  };


// =========================================================
// لغو انتشار خدمت یا دوره
// =========================================================

const handleUnpublishService =
  async (serviceId) => {

    try {

      const token =
        localStorage.getItem(
          "genino_token"
        );


      const res =
        await fetch(
          `${API_BASE_URL}/vendor-services/${serviceId}/unpublish`,
          {
            method: "PATCH",

            headers: {
              Authorization:
                `Bearer ${token}`,

              Accept:
                "application/json",
            },
          }
        );


      const data =
        await res.json();


      if (
        !res.ok ||
        !data?.ok
      ) {

        throw new Error(
          data?.message ||
          "خطا در لغو انتشار خدمت یا دوره"
        );
      }


      setServices(
        (prev) =>
          prev.map(
            (service) =>
              Number(service.id) ===
              Number(serviceId)
                ? {
                    ...service,
                    status:
                      "DRAFT",
                  }
                : service
          )
      );


      alert(
        "خدمت یا دوره از حالت انتشار خارج شد."
      );


    } catch (error) {

      console.error(
        "UNPUBLISH SPORT SERVICE ERROR:",
        error
      );


      alert(
        error?.message ||
        "خطا در لغو انتشار خدمت یا دوره"
      );
    }
  };


  // =========================================================
  // تصاویر هدر
  // =========================================================

  const addHeaderImage =
  async (file) => {

    if (!file) return;


    if (
      sportCenter.headerImages.length >= 10
    ) {

      alert(
        "حداکثر ۱۰ تصویر برای مجموعه ورزشی قابل ثبت است."
      );

      return;
    }


    try {

      setUploadingHeader(true);


      const ext =
  file.name
    .split(".")
    .pop();


const presignRes =
  await presignVendorKindergartenHeaderUpload({
    ext,
    contentType:
      file.type,
    fileName:
      file.name,
    fileSize:
      file.size,
  });


      console.log(
        "SPORT HEADER PRESIGN RESPONSE:",
        presignRes
      );


      if (
        !presignRes?.ok ||
        !presignRes?.uploadUrl ||
        !presignRes?.publicUrl
      ) {

        throw new Error(
          presignRes?.message ||
            "خطا در آماده‌سازی آپلود تصویر"
        );
      }


      const uploadRes =
  await putFileToPresignedUrl(
    presignRes.uploadUrl,
    file
  );


if (!uploadRes?.ok) {

  throw new Error(
    uploadRes?.message ||
      "خطا در آپلود تصویر مجموعه ورزشی"
  );
}


      setSportCenter(
        (prev) => ({
          ...prev,

          headerImages: [
            ...prev.headerImages,

            {
              url: presignRes.publicUrl,
              description: "",
            },
          ],
        })
      );


    } catch (error) {

      console.error(
        "SPORT HEADER UPLOAD ERROR:",
        error
      );


      alert(
        error?.message ||
          "خطا در آپلود تصویر مجموعه ورزشی"
      );


    } finally {

      setUploadingHeader(false);
    }
  };


  const updateHeaderDescription = (
    index,
    value
  ) => {

    setSportCenter(
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

    setSportCenter(
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
  // فیلدهای چندانتخابی
  // =========================================================

  const toggleArrayField = (
    field,
    value
  ) => {

    setSportCenter(
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
  // برنامه فعالیت
  // =========================================================

  const addWorkingSchedule =
    () => {

      setSportCenter(
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

    setSportCenter(
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

    setSportCenter(
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

    setSportCenter(
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
  // مربیان
  // =========================================================

  const addStaffMember =
    () => {

      setSportCenter(
        (prev) => ({
          ...prev,

          staffMembers: [
            ...prev.staffMembers,

            {
              name: "",
              position: "",
              specialty: "",
              education: "",
              experience: "",
              certificate: "",
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

    setSportCenter(
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
                    [field]: value,
                  }
                : member
          ),
      })
    );
  };


  const removeStaffMember = (
    index
  ) => {

    setSportCenter(
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

      setUploadingStaffIndex(
        index
      );


      const ext =
  file.name
    .split(".")
    .pop();


const presignRes =
  await presignVendorKindergartenStaffUpload({
    ext,
    contentType:
      file.type,
    fileName:
      file.name,
    fileSize:
      file.size,
  });


      console.log(
        "SPORT STAFF PRESIGN RESPONSE:",
        presignRes
      );


      if (
        !presignRes?.ok ||
        !presignRes?.uploadUrl ||
        !presignRes?.publicUrl
      ) {

        throw new Error(
          presignRes?.message ||
            "خطا در آماده‌سازی آپلود تصویر مربی"
        );
      }


      const uploadRes =
  await putFileToPresignedUrl(
    presignRes.uploadUrl,
    file
  );


if (!uploadRes?.ok) {

  throw new Error(
    uploadRes?.message ||
      "خطا در آپلود تصویر مربی"
  );
}


      updateStaffMember(
        index,
        "image",
        presignRes.publicUrl
      );


    } catch (error) {

      console.error(
        "SPORT STAFF IMAGE UPLOAD ERROR:",
        error
      );


      alert(
        error?.message ||
          "خطا در آپلود تصویر مربی"
      );


    } finally {

      setUploadingStaffIndex(
        null
      );
    }
  };




  // =========================================================
// صدور دستاورد ورزشی
// =========================================================

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
      !String(
        achievementForm.title ||
          ""
      ).trim()
    ) {

      alert(
        "لطفاً عنوان دستاورد را وارد کنید."
      );

      return;
    }


    if (
      remainingAchievementCount <=
      0
    ) {

      alert(
        "مجوز کافی برای صدور دستاورد ندارید."
      );

      return;
    }


    try {

      const res =
        await createSportClassAchievement(
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


      console.log(
        "CREATE SPORT ACHIEVEMENT RESPONSE:",
        res
      );


      if (!res?.ok) {

        throw new Error(
          res?.error ||
          res?.message ||
          "خطا در صدور دستاورد"
        );
      }


      // تعداد دستاورد استفاده‌شده
      // اگر بک‌اند مقدار جدید را فرستاد همان را استفاده می‌کنیم
      // در غیر این صورت یک واحد اضافه می‌کنیم

      setAchievementUsedCount(
        (prev) =>
          Number(
            res?.achievementUsedCount ??
            prev + 1
          )
      );


      // افزودن دستاورد جدید به لیست محلی
      if (res?.achievement) {

        setAchievements(
          (prev) => [
            res.achievement,
            ...prev,
          ]
        );
      }


      setSelectedAchievementChild(
        null
      );


      setAchievementForm({
        category: "",
        title: "",
        description: "",
      });


      alert(
        "دستاورد ورزشی با موفقیت صادر شد."
      );


    } catch (error) {

      console.error(
        "CREATE SPORT ACHIEVEMENT ERROR:",
        error
      );


      alert(
        error?.message ||
          "خطا در صدور دستاورد ورزشی"
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
          sportCenter.centerName ||
            ""
        ).trim()
      ) {
        errors.centerName =
          "نام مجموعه ورزشی الزامی است";
      }


      if (
        !String(
          sportCenter.slogan ||
            ""
        ).trim()
      ) {
        errors.slogan =
          "شعار مجموعه ورزشی الزامی است";
      }


      if (
        !String(
          sportCenter.city ||
            ""
        ).trim()
      ) {
        errors.city =
          "شهر محل فعالیت الزامی است";
      }


      if (
        !String(
          sportCenter.district ||
            ""
        ).trim()
      ) {
        errors.district =
          "منطقه الزامی است";
      }


      if (
        !String(
          sportCenter.address ||
            ""
        ).trim()
      ) {
        errors.address =
          "آدرس دقیق الزامی است";
      }


      if (
        !String(
          sportCenter.phone ||
            ""
        ).trim()
      ) {
        errors.phone =
          "شماره تماس الزامی است";
      }


      if (
        !String(
          sportCenter.email ||
            ""
        ).trim()
      ) {

        errors.email =
          "ایمیل الزامی است";

      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          String(
            sportCenter.email
          ).trim()
        )
      ) {

        errors.email =
          "فرمت ایمیل صحیح نیست";
      }


      if (
        !sportCenter.gender
      ) {
        errors.gender =
          "جنسیت پذیرش را مشخص کنید";
      }


      if (
        sportCenter
          .acceptedAges.length ===
        0
      ) {
        errors.acceptedAges =
          "حداقل یک گروه سنی انتخاب کنید";
      }


      if (
        sportCenter
          .sportFields.length ===
        0
      ) {
        errors.sportFields =
          "حداقل یک رشته ورزشی انتخاب کنید";
      }


      const schedule =
        sportCenter
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


        const allDays =
          schedule.flatMap(
            (item) =>
              item.days || []
          );


        if (
          new Set(
            allDays
          ).size !==
          allDays.length
        ) {

          errors.workingSchedule =
            "هر روز هفته فقط می‌تواند در یکی از برنامه‌های فعالیت باشد";
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
  // ذخیره اطلاعات مجموعه ورزشی
  // =========================================================

  const handleSave =
    async () => {

      const valid =
        validateFields();


      if (!valid) {

        alert(
          "لطفاً اطلاعات ضروری مجموعه ورزشی را کامل کنید."
        );

        return;
      }


      try {

        setSaving(true);


        const payload = {

          headerImages:
            sportCenter.headerImages,

          centerName:
            sportCenter.centerName,

          slogan:
            sportCenter.slogan,

          description:
            sportCenter.description,

          city:
            sportCenter.city,

          district:
            sportCenter.district,

          address:
            sportCenter.address,

          phone:
            sportCenter.phone,

          email:
            sportCenter.email,

          acceptedAges:
            sportCenter.acceptedAges,

          gender:
            sportCenter.gender,

          sportFields:
            sportCenter.sportFields,

          courseLevels:
            sportCenter.courseLevels,

          teachingMethods:
            sportCenter.teachingMethods,

          workingSchedule:
            sportCenter.workingSchedule,

          studentCapacity:
            sportCenter.studentCapacity,

          foundedYear:
            sportCenter.foundedYear,

          area:
            sportCenter.area,

          classroomCount:
            sportCenter.classroomCount,

          facilities:
            sportCenter.facilities,

          hasOnlineClasses:
            sportCenter.hasOnlineClasses,

          onlineDescription:
            sportCenter.onlineDescription,

          hasCompetition:
            sportCenter.hasCompetition,

          competitionDescription:
            sportCenter.competitionDescription,

          hasCertificate:
            sportCenter.hasCertificate,

          certificateDescription:
            sportCenter.certificateDescription,

          providesSportEquipment:
            sportCenter.providesSportEquipment,

          sportEquipmentDescription:
            sportCenter.sportEquipmentDescription,

          hasTransportation:
            sportCenter.hasTransportation,

          transportationDescription:
            sportCenter.transportationDescription,

          teacherCount:
            sportCenter.teacherCount,

          teacherExperience:
            sportCenter.teacherExperience,

          staffMembers:
            sportCenter.staffMembers,

          resume:
            sportCenter.resume,
        };


        const res =
          await saveVendorSportClassProfile(
            vendorId,
            payload
          );


        console.log(
          "SAVE SPORT CLASS RESPONSE:",
          res
        );


        if (!res?.ok) {

          throw new Error(
            res?.message ||
              "خطا در ذخیره اطلاعات مجموعه ورزشی"
          );
        }


        if (res?.profile) {

          setSportCenter(
            (prev) => ({
              ...prev,
              ...res.profile,
            })
          );
        }


        alert(
          "اطلاعات مجموعه ورزشی با موفقیت ذخیره شد."
        );


      } catch (error) {

        console.error(
          "SAVE SPORT CLASS ERROR:",
          error
        );


        alert(
          error?.message ||
            "خطا در ذخیره اطلاعات مجموعه ورزشی"
        );


      } finally {

        setSaving(false);
      }
    };


      // =========================================================
  // نمایش عمومی مجموعه ورزشی
  // =========================================================

  if (isPublicView) {

    return (

      <PublicSportClassView
  sportCenter={sportCenter}
  products={products}
  services={services}
  loadingProducts={loadingProducts}
  loadingServices={loadingServices}
  vendorId={vendorId}
  navigate={navigate}
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

            {sportCenter
              .headerImages
              .length > 0 ? (

              <div>

                <PromoSlider
                  variant="golden"
                  interval={7000}
                  height="h-44 sm:h-52 md:h-60 lg:h-64"
                  slides={
                    sportCenter
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
                      sportCenter
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
                    placeholder="مثلاً: سالن تمرین و فضای ورزشی مجموعه"
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

                <Dumbbell
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

{uploadingHeader
  ? "در حال آپلود تصویر..."
  : "افزودن تصویر مجموعه ورزشی"
}

              <input
                type="file"
                accept="image/*"
                disabled={uploadingHeader}
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
              حداکثر ۱۰ تصویر - سالن‌ها، زمین‌ها، تجهیزات، کلاس‌ها، مربیان و فضای مجموعه
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
            در این بخش می‌توانید کالاها، خدمات و دوره‌های ورزشی مجموعه را مدیریت کنید. هر کالا یا خدمت یک پنجره از ظرفیت بسته همکاری شما را استفاده می‌کند.
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
                grid-cols-1
                gap-2
                sm:grid-cols-2
              "
            >

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/vendor/product/create?source=sport-class&vendorId=${vendorId}`
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
                    `/vendor/service/create?source=sport-class&vendorId=${vendorId}`
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
              برای بسته مجموعه ورزشی هنوز پنجره کالا و خدمت ثبت نشده است
            </div>

          )}

        </section>


        {/* =====================================================
    کالاها
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
        کالاهای مجموعه ورزشی
      </h3>


      <p
        className="
          mt-1
          text-xs
          text-gray-400
        "
      >
        لباس، تجهیزات، لوازم ورزشی و سایر محصولات ارائه‌شده توسط مجموعه
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
      {products.length} کالا
    </span>

  </div>


  {loadingProducts ? (

    <div
      className="
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
      در حال دریافت کالاهای مجموعه...
    </div>

  ) : products.length === 0 ? (

    <EmptyBox
      text="هنوز کالایی ثبت نشده است."
    />

  ) : (

    <div
      className="
        grid
        grid-cols-2
        gap-3
        md:grid-cols-3
        lg:grid-cols-4
      "
    >

      {products.map(
        (product) => (

          <div
            key={product.id}
            className="
              relative
            "
          >

            <ProductCard
              product={product}
            />


            {isVendorOwner && (

  <div
    className="
      mt-2
      space-y-2
    "
  >

    {/* وضعیت انتشار */}

    <div
      className="
        flex
        items-center
        justify-between
        rounded-xl
        bg-[#faf7ef]
        px-3
        py-2
      "
    >

      <span
        className="
          text-[11px]
          font-bold
          text-gray-500
        "
      >
        وضعیت
      </span>


      <span
        className={`
          rounded-full
          px-3
          py-1
          text-[10px]
          font-black

          ${
            product.status ===
            "PUBLISHED"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }
        `}
      >

        {product.status ===
        "PUBLISHED"
          ? "منتشر شده"
          : "پیش‌نویس"
        }

      </span>

    </div>


    {/* ویرایش */}

    <button
      type="button"
      onClick={() =>
        navigate(
          `/vendor/product/edit/${product.id}?source=sport-class&vendorId=${vendorId}`
        )
      }
      className="
        w-full
        rounded-xl
        border
        border-yellow-300
        bg-yellow-50
        py-2
        text-xs
        font-bold
        text-[#7a5526]
      "
    >
      ویرایش محصول
    </button>


    {/* انتشار / لغو انتشار */}

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
          border
          border-gray-200
          bg-gray-50
          py-2
          text-xs
          font-bold
          text-gray-600
        "
      >
        لغو انتشار
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


    {/* حذف */}

    <button
      type="button"
      onClick={() =>
        handleDeleteProduct(
          product.id
        )
      }
      className="
        flex
        w-full
        items-center
        justify-center
        gap-1
        rounded-xl
        border
        border-red-200
        bg-red-50
        py-2
        text-xs
        font-bold
        text-red-600
      "
    >

      <Trash2 size={14} />

      حذف محصول

    </button>

  </div>

)}

          </div>

        )
      )}

    </div>

  )}

</section>


        {/* =====================================================
    رویدادها و خدمات ورزشی
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
        رویدادها و خدمات ورزشی
      </h3>

      <p
        className="
          mt-1
          text-xs
          text-gray-400
        "
      >
        مسابقات، اردوها، استعدادیابی، جلسات تمرینی و سایر خدمات قابل رزرو
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
      {eventServices.length} خدمت
    </span>

  </div>


  {loadingServices ? (

    <div
      className="
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
      در حال دریافت خدمات مجموعه...
    </div>

  ) : eventServices.length === 0 ? (

    <EmptyBox
      text="هنوز خدمتی ثبت نشده است."
    />

  ) : (

    <div
      className="
        grid
        gap-3
        sm:grid-cols-2
        lg:grid-cols-3
      "
    >

      {eventServices.map(
        (service) => (

          <div
            key={service.id}
            className="
              rounded-2xl
              border
              border-yellow-100
              bg-[#faf7ef]
              p-4
            "
          >

            {(() => {
  const serviceImage =
    Array.isArray(service.images) && service.images.length > 0
      ? (
          typeof service.images[0] === "string"
            ? service.images[0]
            : service.images[0]?.url
        )
      : service.image ||
        service.imageUrl ||
        service.coverImage ||
        "";

  return serviceImage ? (
    <div className="mb-4 overflow-hidden rounded-xl bg-white">
      <img
        src={serviceImage}
        alt={service.title || service.name || "خدمت ورزشی"}
        className="h-40 w-full object-cover"
      />
    </div>
  ) : null;
})()}

            <div
              className="
                flex
                items-start
                justify-between
                gap-3
              "
            >

              <div>

                <h4
                  className="
                    font-black
                    text-[#6f4a18]
                  "
                >
                  {service.title ||
                    service.name ||
                    "خدمت ورزشی"}
                </h4>

                {service.description && (

                  <p
                    className="
                      mt-2
                      line-clamp-2
                      text-xs
                      leading-6
                      text-gray-500
                    "
                  >
                    {service.description}
                  </p>

                )}

              </div>


              <span
                className="
                  shrink-0
                  rounded-full
                  bg-white
                  px-2
                  py-1
                  text-[10px]
                  font-bold
                  text-[#7a5526]
                "
              >
                خدمت
              </span>

            </div>


            {service.price !==
              undefined &&
              service.price !==
                null && (

              <div
                className="
                  mt-4
                  text-sm
                  font-black
                  text-green-700
                "
              >

                {Number(
                  service.price
                ) === 0
                  ? "رایگان"
                  : `${Number(
                      service.price
                    ).toLocaleString(
                      "fa-IR"
                    )} تومان`
                }

              </div>

            )}


            {/* =========================================
    وضعیت انتشار
========================================= */}

{isVendorOwner && (

  <div
    className="
      mt-4
      flex
      items-center
      justify-between
      rounded-xl
      bg-white
      px-3
      py-2
    "
  >

    <span
      className="
        text-[11px]
        font-bold
        text-gray-500
      "
    >
      وضعیت
    </span>


    <span
      className={`
        rounded-full
        px-3
        py-1
        text-[10px]
        font-black

        ${
          service.status ===
          "PUBLISHED"
            ? "bg-green-100 text-green-700"
            : "bg-gray-200 text-gray-600"
        }
      `}
    >

      {service.status ===
      "PUBLISHED"
        ? "منتشر شده"
        : "پیش‌نویس"
      }

    </span>

  </div>

)}


{/* =========================================
    مشاهده و ویرایش
========================================= */}

<div
  className="
    mt-3
    flex
    gap-2
  "
>

  <button
    type="button"
    onClick={() =>
      navigate(
        `/service/${service.id}`
      )
    }
    className="
      flex-1
      rounded-xl
      bg-white
      py-2
      text-xs
      font-bold
      text-[#7a5526]
    "
  >
    مشاهده
  </button>


  {isVendorOwner && (

    <button
      type="button"
      onClick={() =>
        navigate(
          `/vendor/service/edit/${service.id}?source=sport-class&vendorId=${vendorId}`
        )
      }
      className="
        flex-1
        rounded-xl
        border
        border-yellow-300
        bg-yellow-50
        py-2
        text-xs
        font-bold
        text-[#7a5526]
      "
    >
      ویرایش
    </button>

  )}

</div>


{/* =========================================
    انتشار / لغو انتشار
========================================= */}

{isVendorOwner && (

  <div
    className="
      mt-2
      space-y-2
    "
  >

    {service.status ===
    "PUBLISHED" ? (

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
          border
          border-gray-200
          bg-gray-50
          py-2
          text-xs
          font-bold
          text-gray-600
        "
      >
        لغو انتشار
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
        "
      >
        انتشار خدمت
      </button>

    )}


    <button
      type="button"
      onClick={() =>
        handleDeleteService(
          service.id
        )
      }
      className="
        flex
        w-full
        items-center
        justify-center
        gap-1
        rounded-xl
        border
        border-red-200
        bg-red-50
        py-2
        text-xs
        font-bold
        text-red-600
      "
    >

      <Trash2 size={14} />

      حذف خدمت

    </button>

  </div>

)}

          </div>

        )
      )}

    </div>

  )}

</section>


        {/* =====================================================
    دوره‌ها و کلاس‌های ورزشی
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
        دوره‌ها و کلاس‌های ورزشی
      </h3>

      <p
        className="
          mt-1
          text-xs
          text-gray-400
        "
      >
        کلاس‌ها و دوره‌های چندجلسه‌ای ورزشی مجموعه
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
      {courseServices.length} دوره
    </span>

  </div>


  {loadingServices ? (

    <div
      className="
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
      در حال دریافت دوره‌های ورزشی...
    </div>

  ) : courseServices.length === 0 ? (

    <EmptyBox
      text="هنوز دوره ورزشی ثبت نشده است."
    />

  ) : (

    <div
      className="
        grid
        gap-3
        sm:grid-cols-2
        lg:grid-cols-3
      "
    >

      {courseServices.map(
        (service) => {

          const packageInfo =
            service.package ||
            service.packageInfo ||
            {};

      const serviceImage =
  Array.isArray(service.images) && service.images.length > 0
    ? (
        typeof service.images[0] === "string"
          ? service.images[0]
          : service.images[0]?.url
      )
    : service.image ||
      service.imageUrl ||
      service.coverImage ||
      "";


          return (

            <div
              key={service.id}
              className="
                rounded-2xl
                border
                border-yellow-100
                bg-[#faf7ef]
                p-4
              "
            >

              {serviceImage && (
  <div className="mb-4 overflow-hidden rounded-xl bg-white">
    <img
      src={serviceImage}
      alt={
        packageInfo.title ||
        service.title ||
        service.name ||
        "دوره ورزشی"
      }
      className="h-40 w-full object-cover"
    />
  </div>
)}

              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-3
                "
              >

                <div>

                  <h4
                    className="
                      font-black
                      text-[#6f4a18]
                    "
                  >
                    {packageInfo.title ||
                      service.title ||
                      service.name ||
                      "دوره ورزشی"}
                  </h4>


                  {service.description && (

                    <p
                      className="
                        mt-2
                        line-clamp-2
                        text-xs
                        leading-6
                        text-gray-500
                      "
                    >
                      {service.description}
                    </p>

                  )}

                </div>


                <span
                  className="
                    shrink-0
                    rounded-full
                    bg-yellow-100
                    px-2
                    py-1
                    text-[10px]
                    font-bold
                    text-[#7a5526]
                  "
                >
                  دوره
                </span>

              </div>


              <div
                className="
                  mt-4
                  space-y-2
                  rounded-xl
                  bg-white
                  p-3
                  text-xs
                  text-gray-500
                "
              >

                {packageInfo.totalSessions && (

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-2
                    "
                  >
                    <span>
                      تعداد جلسات
                    </span>

                    <span
                      className="
                        font-bold
                        text-[#6f4a18]
                      "
                    >
                      {packageInfo.totalSessions} جلسه
                    </span>
                  </div>

                )}


                {Array.isArray(
                  packageInfo.weekdays
                ) &&
                  packageInfo.weekdays.length >
                    0 && (

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-2
                    "
                  >
                    <span>
                      روزهای برگزاری
                    </span>

                    <span
                      className="
                        text-left
                        font-bold
                        text-[#6f4a18]
                      "
                    >
                      {packageInfo.weekdays.join(
                        "، "
                      )}
                    </span>
                  </div>

                )}


                {packageInfo.startTime &&
                  packageInfo.endTime && (

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-2
                    "
                  >
                    <span>
                      ساعت
                    </span>

                    <span
                      className="
                        font-bold
                        text-[#6f4a18]
                      "
                    >
                      {packageInfo.startTime}
                      {" تا "}
                      {packageInfo.endTime}
                    </span>
                  </div>

                )}

              </div>


              {service.price !==
                undefined &&
                service.price !==
                  null && (

                <div
                  className="
                    mt-4
                    text-sm
                    font-black
                    text-green-700
                  "
                >

                  {Number(
                    service.price
                  ) === 0
                    ? "رایگان"
                    : `${Number(
                        service.price
                      ).toLocaleString(
                        "fa-IR"
                      )} تومان`
                  }

                </div>

              )}


              {/* وضعیت انتشار */}

{isVendorOwner && (

  <div
    className="
      mt-4
      flex
      items-center
      justify-between
      rounded-xl
      bg-white
      px-3
      py-2
    "
  >

    <span
      className="
        text-[11px]
        font-bold
        text-gray-500
      "
    >
      وضعیت
    </span>

    <span
      className={`
        rounded-full
        px-3
        py-1
        text-[10px]
        font-black
        ${
          service.status === "PUBLISHED"
            ? "bg-green-100 text-green-700"
            : "bg-gray-200 text-gray-600"
        }
      `}
    >
      {service.status === "PUBLISHED"
        ? "منتشر شده"
        : "پیش‌نویس"}
    </span>

  </div>

)}


{/* مشاهده و ویرایش */}

<div
  className="
    mt-3
    flex
    gap-2
  "
>

  <button
    type="button"
    onClick={() =>
      navigate(
        `/course/${service.id}`
      )
    }
    className="
      flex-1
      rounded-xl
      bg-white
      py-2
      text-xs
      font-bold
      text-[#7a5526]
    "
  >
    مشاهده
  </button>


  {isVendorOwner && (

    <button
      type="button"
      onClick={() =>
        navigate(
          `/vendor/service/edit/${service.id}?source=sport-class&vendorId=${vendorId}`
        )
      }
      className="
        flex-1
        rounded-xl
        border
        border-yellow-300
        bg-yellow-50
        py-2
        text-xs
        font-bold
        text-[#7a5526]
      "
    >
      ویرایش
    </button>

  )}

</div>


{/* انتشار / لغو انتشار + حذف */}

{isVendorOwner && (

  <div
    className="
      mt-2
      space-y-2
    "
  >

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
          border
          border-gray-200
          bg-gray-50
          py-2
          text-xs
          font-bold
          text-gray-600
        "
      >
        لغو انتشار
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
        "
      >
        انتشار دوره
      </button>

    )}


    <button
      type="button"
      onClick={() =>
        handleDeleteService(
          service.id
        )
      }
      className="
        flex
        w-full
        items-center
        justify-center
        gap-1
        rounded-xl
        border
        border-red-200
        bg-red-50
        py-2
        text-xs
        font-bold
        text-red-600
      "
    >

      <Trash2 size={14} />

      حذف دوره

    </button>

  </div>

)}

            </div>

          );
        }
      )}

    </div>

  )}

</section>


        {/* =====================================================
            معرفی
        ===================================================== */}

        <FormCard
          title="معرفی مجموعه ورزشی"
          icon={
            <Dumbbell
              size={19}
            />
          }
        >

          <SimpleInput
            label="نام مجموعه ورزشی"
            value={
              sportCenter.centerName
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
            label="شعار مجموعه ورزشی"
            value={
              sportCenter.slogan
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
            label="معرفی کوتاه مجموعه ورزشی"
            value={
              sportCenter.description
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
              sportCenter.city
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
              sportCenter.district
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
              sportCenter.address
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
              sportCenter.phone
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
              sportCenter.email
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
            پذیرش ورزشکاران
        ===================================================== */}

        <FormCard
          title="شرایط پذیرش ورزشکاران"
          icon={
            <UsersRound
              size={19}
            />
          }
        >

          <SimpleSelect
            label="جنسیت پذیرش"
            value={
              sportCenter.gender
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
              validationErrors.gender
            }
          />


          <div className="sm:col-span-2">

            <p
              className="
                text-sm
                font-bold
                text-gray-700
              "
            >
              گروه‌های سنی قابل پذیرش
            </p>


            <ChipSelector
              options={
                AGE_OPTIONS
              }
              selected={
                sportCenter.acceptedAges
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
            رشته‌های ورزشی
        ===================================================== */}

        <FormCard
          title="رشته‌ها و حوزه‌های ورزشی"
          icon={
            <Trophy
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
              ورزش‌های تیمی
            </p>


            <ChipSelector
              options={
                SPORT_FIELDS
              }
              selected={
                sportCenter.sportFields
              }
              onToggle={(
                value
              ) =>
                toggleArrayField(
                  "sportFields",
                  value
                )
              }
            />


            {validationErrors
              .sportFields && (

              <ErrorText>
                {
                  validationErrors
                    .sportFields
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
              ورزش‌های انفرادی
            </p>


            <ChipSelector
  options={
    SPORT_FIELDS2
  }
  selected={
    sportCenter.sportFields
  }
  onToggle={(
    value
  ) =>
    toggleArrayField(
      "sportFields",
      value
    )
  }
/>

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
               ورزش‌های رزمی
            </p>


            <ChipSelector
  options={SPORT_FIELDS3}
  selected={sportCenter.sportFields}
  onToggle={(value) =>
    toggleArrayField("sportFields", value)
  }
/>

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
               تناسب اندام
            </p>


            <ChipSelector
  options={
    SPORT_FIELDS4
  }
  selected={
    sportCenter.sportFields
  }
  onToggle={(
    value
  ) =>
    toggleArrayField(
      "sportFields",
      value
    )
  }
/>

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
              ورزش‌های کودک و نوجوان
            </p>


            <ChipSelector
  options={
    SPORT_FIELDS5
  }
  selected={
    sportCenter.sportFields
  }
  onToggle={(
    value
  ) =>
    toggleArrayField(
      "sportFields",
      value
    )
  }
/>

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
              سطح کلاس‌ها
            </p>


            <ChipSelector
              options={
                COURSE_LEVELS
              }
              selected={
                sportCenter.courseLevels
              }
              onToggle={(
                value
              ) =>
                toggleArrayField(
                  "courseLevels",
                  value
                )
              }
            />

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
              شیوه برگزاری تمرین‌ها
            </p>


            <ChipSelector
              options={
                TEACHING_METHODS
              }
              selected={
                sportCenter.teachingMethods
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
            ساعات فعالیت
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
                می‌توانید برای روزهای مختلف هفته ساعات فعالیت متفاوت تعیین کنید.
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


          {sportCenter
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

              {sportCenter
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
          title="ظرفیت و فضای مجموعه ورزشی"
        >

          <SimpleInput
            label="ظرفیت پذیرش ورزشکار"
            value={
              sportCenter.studentCapacity
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
              sportCenter.foundedYear
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
              sportCenter.area
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
  label="تعداد سالن یا فضای تمرین"
  value={
    sportCenter.classroomCount
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
          title="امکانات تخصصی مجموعه ورزشی"
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
              امکانات، تجهیزات و فضاهای ورزشی مجموعه را انتخاب کنید.
            </p>


            <ChipSelector
              options={
                FACILITY_OPTIONS
              }
              selected={
                sportCenter.facilities
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
  title="کلاس‌ها و تمرین‌های آنلاین"
  description="اگر مجموعه کلاس، آموزش یا تمرین آنلاین برای ورزشکاران ارائه می‌کند این بخش را فعال کنید."
  enabled={
    sportCenter.hasOnlineClasses
  }
  onToggle={() =>
    updateField(
      "hasOnlineClasses",
      !sportCenter.hasOnlineClasses
    )
  }
  enabledText="مجموعه دارای کلاس یا تمرین آنلاین است."
  disabledText="کلاس یا تمرین آنلاین ارائه نمی‌شود."
  textareaLabel="توضیحات کلاس‌های آنلاین"
  value={
    sportCenter.onlineDescription
  }
  onChange={(
    value
  ) =>
    updateField(
      "onlineDescription",
      value
    )
  }
  placeholder="مثلاً: جلسات آنلاین آمادگی جسمانی و تمرین‌های تکمیلی در طول هفته برگزار می‌شود."
/>


        {/* =====================================================
    مسابقات
===================================================== */}

<ToggleDescriptionSection
  title="مسابقات و فعالیت قهرمانی"
  description="اگر مجموعه مسابقات، اردو یا مسیر آموزش حرفه‌ای و قهرمانی دارد این بخش را فعال کنید."
  enabled={
    sportCenter.hasCompetition
  }
  onToggle={() =>
    updateField(
      "hasCompetition",
      !sportCenter.hasCompetition
    )
  }
  enabledText="مجموعه دارای مسابقات یا فعالیت قهرمانی است."
  disabledText="فعالیت مسابقاتی یا قهرمانی ندارد."
  textareaLabel="توضیحات مسابقات و فعالیت قهرمانی"
  value={
    sportCenter.competitionDescription
  }
  onChange={(
    value
  ) =>
    updateField(
      "competitionDescription",
      value
    )
  }
  placeholder="مثلاً: ورزشکاران برتر پس از ارزیابی برای شرکت در مسابقات و اردوهای تخصصی انتخاب می‌شوند."
/>


        {/* =====================================================
            گواهی
        ===================================================== */}

        <ToggleDescriptionSection
          title="گواهی پایان دوره"
          description="اگر پس از پایان دوره برای ورزشکاران گواهی یا مدرک صادر می‌کنید این بخش را فعال کنید."
          enabled={
            sportCenter.hasCertificate
          }
          onToggle={() =>
            updateField(
              "hasCertificate",
              !sportCenter.hasCertificate
            )
          }
          enabledText="برای دوره‌ها گواهی صادر می‌شود."
          disabledText="گواهی پایان دوره صادر نمی‌شود."
          textareaLabel="توضیحات گواهی"
          value={
            sportCenter
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
          placeholder="مثلاً: پس از تکمیل دوره و ارزیابی نهایی، گواهی مجموعه صادر می‌شود."
        />


      


        {/* =====================================================
    تجهیزات
===================================================== */}

<ToggleDescriptionSection
  title="تأمین تجهیزات ورزشی"
  description="اگر تجهیزات موردنیاز تمرین توسط مجموعه در اختیار ورزشکار قرار می‌گیرد این بخش را فعال کنید."
  enabled={
    sportCenter.providesSportEquipment
  }
  onToggle={() =>
    updateField(
      "providesSportEquipment",
      !sportCenter.providesSportEquipment
    )
  }
  enabledText="تجهیزات تمرین توسط مجموعه تأمین می‌شود."
  disabledText="ورزشکار باید تجهیزات شخصی موردنیاز را تهیه کند."
  textareaLabel="توضیحات تجهیزات"
  value={
    sportCenter.sportEquipmentDescription
  }
  onChange={(
    value
  ) =>
    updateField(
      "sportEquipmentDescription",
      value
    )
  }
  placeholder="مثلاً: توپ و تجهیزات تمرین عمومی توسط مجموعه تأمین می‌شود ولی لباس ورزشی شخصی است."
/>


        {/* =====================================================
            سرویس
        ===================================================== */}

        <ToggleDescriptionSection
          title="سرویس رفت‌وآمد ورزشکاران"
          description="اگر مجموعه برای رفت‌وآمد کودکان و نوجوانان سرویس ارائه می‌کند این بخش را فعال کنید."
          enabled={
            sportCenter
              .hasTransportation
          }
          onToggle={() =>
            updateField(
              "hasTransportation",
              !sportCenter
                .hasTransportation
            )
          }
          enabledText="مجموعه دارای سرویس رفت‌وآمد است."
          disabledText="سرویس رفت‌وآمد ارائه نمی‌شود."
          textareaLabel="توضیحات سرویس رفت‌وآمد"
          value={
            sportCenter
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
            مربیان
        ===================================================== */}

        <FormCard
          title="مربیان و کادر ورزشی"
          icon={
            <UserRound
              size={19}
            />
          }
        >

          <SimpleInput
            label="تعداد مربیان"
            value={
  sportCenter.teacherCount
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
            label="میانگین سابقه مربیان"
            value={
              sportCenter.teacherExperience
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


          <div className="sm:col-span-2">

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
                  اعضای مدیریتی و مربیان مجموعه
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    leading-6
                    text-gray-400
                  "
                >
                  مدیر، سرمربی، مربیان و سایر اعضای تخصصی مجموعه را معرفی کنید.
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


            {sportCenter
              .staffMembers
              .length === 0 ? (

              <EmptyBox
                text="هنوز عضوی ثبت نشده است."
              />

            ) : (

              <div className="space-y-2">

                {sportCenter
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

                            {uploadingStaffIndex ===
index ? (

  <span>
    در حال
    <br />
    آپلود...
  </span>

) : member.image ? (

  <img
    src={
      member.image
    }
    alt={
      member.name ||
      "مربی"
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
                              disabled={
                                uploadingStaffIndex !== null
                              }
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
                            lg:grid-cols-3
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
                            placeholder="رشته تخصصی"
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
                            placeholder="سابقه مربیگری"
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


                          <StaffInput
                            placeholder="مدرک مربیگری"
                            value={
                              member.certificate
                            }
                            onChange={(
                              value
                            ) =>
                              updateStaffMember(
                                index,
                                "certificate",
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
          title="معرفی و رزومه مجموعه ورزشی"
          icon={
            <ShieldCheck
              size={19}
            />
          }
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
              درباره سابقه فعالیت، مجوزها، افتخارات، مسابقات، قهرمانان مجموعه، روش تمرین و ویژگی‌های شاخص مجموعه توضیح دهید.
            </p>

          </div>


          <SimpleTextArea
            label="معرفی و رزومه"
            value={
              sportCenter.resume
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
              دستاوردهای ورزشی
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
            از این بخش می‌توانید برای کودکان و نوجوانان عضو مجموعه دستاورد ورزشی صادر کنید.
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
              در بسته مجموعه ورزشی مجوز صدور دستاورد ثبت نشده است
            </div>

          )}


          <SportClassStudentsSection
  vendorId={vendorId}
  onAward={(child) => {
    setSelectedAchievementChild(child);

    setAchievementForm({
      category: "",
      title: "",
      description: "",
    });
  }}
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
                value={
                  achievementForm.category
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
                        e.target.value,
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


                {ACHIEVEMENT_TYPES.map(
                  (
                    item
                  ) => (

                    <option
                      key={
                        item.value
                      }
                      value={
                        item.value
                      }
                    >
                      {
                        item.label
                      }
                    </option>

                  )
                )}

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

          {/* =====================================================
    تاریخچه دستاوردهای صادرشده
===================================================== */}

<div
  className="
    mt-6
    border-t
    border-yellow-100
    pt-5
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

    <h3
      className="
        font-black
        text-[#6f4a18]
      "
    >
      تاریخچه دستاوردهای صادرشده
    </h3>


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
      {achievements.length} دستاورد
    </span>

  </div>


  {achievements.length === 0 ? (

    <EmptyBox
      text="هنوز دستاوردی توسط این مجموعه صادر نشده است."
    />

  ) : (

    <div
      className="
        mt-4
        space-y-3
      "
    >

      {achievements.map(
        (achievement) => {

          const type =
            ACHIEVEMENT_TYPES.find(
              (item) =>
                item.value ===
                achievement.category
            );


          return (

            <div
              key={
                achievement.id
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
                  items-start
                  justify-between
                  gap-3
                "
              >

                <div>

                  <p
                    className="
                      font-black
                      text-[#6f4a18]
                    "
                  >
                    {achievement.title}
                  </p>


                  {achievement.child?.fullName && (

                    <p
                      className="
                        mt-1
                        text-xs
                        font-bold
                        text-gray-500
                      "
                    >
                      ورزشکار:{" "}
                      {
                        achievement.child
                          .fullName
                      }
                    </p>

                  )}

                </div>


                <span
                  className="
                    shrink-0
                    rounded-full
                    bg-yellow-100
                    px-3
                    py-1
                    text-[10px]
                    font-bold
                    text-[#7a5526]
                  "
                >
                  {type?.label ||
                    achievement.category}
                </span>

              </div>


              {achievement.description && (

                <p
                  className="
                    mt-3
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


              {achievement.issuedAt && (

                <p
                  className="
                    mt-3
                    text-[11px]
                    text-gray-400
                  "
                >
                  تاریخ صدور:{" "}
                  {new Date(
                    achievement.issuedAt
                  ).toLocaleDateString(
                    "fa-IR"
                  )}
                </p>

              )}

            </div>

          );
        }
      )}

    </div>

  )}

</div>

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
            disabled:opacity-60
          "
        >

          <Save
            size={18}
          />

          {saving
            ? "در حال ذخیره..."
            : "ذخیره اطلاعات مجموعه ورزشی"
          }

        </button>

      </div>

    </main>

  );
}


// =========================================================
// نمایش عمومی مجموعه ورزشی
// =========================================================

function PublicSportClassView({
  sportCenter,
  products,
  services,
  loadingProducts,
  loadingServices,
  navigate,
}) {

  const [
    activePublicImage,
    setActivePublicImage,
  ] = useState(0);


  const publishedProducts =
    products.filter(
      (item) =>
        item.status === "PUBLISHED"
    );


  const publishedServices =
    services.filter(
      (item) =>
        item.status === "PUBLISHED"
    );


  const publicCourses =
    publishedServices.filter(
      (service) =>
        service.package ||
        service.scheduleMode ===
          "PACKAGE"
    );


  const publicEvents =
    publishedServices.filter(
      (service) =>
        !service.package &&
        service.scheduleMode !==
          "PACKAGE"
    );


  const genderText =
    sportCenter.gender ||
    "ثبت نشده";


  return (

    <main
      dir="rtl"
      className="
        min-h-screen
        bg-[#faf7ef]
        px-3
        py-4
        sm:p-5
      "
    >

      <div
        className="
          mx-auto
          max-w-6xl
          space-y-5
        "
      >


        {/* =========================================
            تصاویر مجموعه
        ========================================= */}

        <section
          className="
            overflow-hidden
            rounded-3xl
            bg-white
            shadow
          "
        >

          {sportCenter.headerImages?.length > 0 ? (

            <>

              <PromoSlider
                variant="golden"
                interval={7000}
                height="h-52 sm:h-72 md:h-80 lg:h-96"
                slides={
                  sportCenter.headerImages.map(
                    (item, index) => ({
                      id: index,

                      image:
                        typeof item === "string"
                          ? item
                          : item?.url,

                      title: "",
                    })
                  )
                }
                onIndexChange={
                  setActivePublicImage
                }
              />


              {sportCenter.headerImages[
                activePublicImage
              ]?.description && (

                <div
                  className="
                    px-5
                    py-3
                    text-center
                    text-sm
                    font-bold
                    text-gray-500
                  "
                >
                  {
                    sportCenter.headerImages[
                      activePublicImage
                    ].description
                  }
                </div>

              )}

            </>

          ) : (

            <div
              className="
                flex
                h-56
                items-center
                justify-center
                bg-gradient-to-br
                from-yellow-50
                to-yellow-100
              "
            >

              <Dumbbell
                size={64}
                className="
                  text-yellow-700
                "
              />

            </div>

          )}

        </section>


        {/* =========================================
            معرفی اصلی
        ========================================= */}

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
              gap-3
            "
          >

            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-yellow-100
                text-[#6f4a18]
              "
            >

              <Dumbbell
                size={24}
              />

            </div>


            <div className="min-w-0">

              <h1
                className="
                  text-xl
                  font-black
                  text-[#6f4a18]
                  sm:text-2xl
                "
              >
                {sportCenter.centerName ||
                  "مجموعه ورزشی"}
              </h1>


              {sportCenter.slogan && (

                <p
                  className="
                    mt-1
                    text-sm
                    font-bold
                    text-yellow-700
                  "
                >
                  {sportCenter.slogan}
                </p>

              )}


              {(sportCenter.city ||
                sportCenter.district) && (

                <div
                  className="
                    mt-3
                    flex
                    items-center
                    gap-1
                    text-xs
                    text-gray-500
                  "
                >

                  <MapPin
                    size={14}
                  />

                  <span>
                    {[
                      sportCenter.city,
                      sportCenter.district,
                    ]
                      .filter(Boolean)
                      .join("، ")}
                  </span>

                </div>

              )}

            </div>

          </div>


          {sportCenter.description && (

            <p
              className="
                mt-5
                whitespace-pre-line
                text-sm
                leading-8
                text-gray-600
              "
            >
              {sportCenter.description}
            </p>

          )}

        </section>


        {/* =========================================
            اطلاعات سریع
        ========================================= */}

        <section
          className="
            grid
            grid-cols-2
            gap-3
            sm:grid-cols-4
          "
        >

          <PublicInfoBox
            title="پذیرش"
            value={genderText}
          />


          <PublicInfoBox
            title="ظرفیت ورزشکار"
            value={
              sportCenter.studentCapacity ||
              "ثبت نشده"
            }
          />


          <PublicInfoBox
            title="تعداد مربیان"
            value={
              sportCenter.teacherCount ||
              "ثبت نشده"
            }
          />


          <PublicInfoBox
            title="سال تأسیس"
            value={
              sportCenter.foundedYear ||
              "ثبت نشده"
            }
          />

        </section>


        {/* =========================================
            گروه‌های سنی
        ========================================= */}

        {sportCenter.acceptedAges?.length >
          0 && (

          <PublicChipSection
            title="گروه‌های سنی قابل پذیرش"
            items={
              sportCenter.acceptedAges
            }
          />

        )}


        {/* =========================================
            رشته‌های ورزشی
        ========================================= */}

        {sportCenter.sportFields?.length > 0 && (

  <PublicSection title="رشته‌ها و حوزه‌های ورزشی">

    <div className="grid gap-4 sm:grid-cols-2">

      <PublicChipGroup
        title="ورزش‌های تیمی"
        items={
          sportCenter.sportFields.filter(
            (item) => SPORT_FIELDS.includes(item)
          )
        }
      />

      <PublicChipGroup
        title="ورزش‌های انفرادی"
        items={
          sportCenter.sportFields.filter(
            (item) => SPORT_FIELDS2.includes(item)
          )
        }
      />

      <PublicChipGroup
        title="ورزش‌های رزمی"
        items={
          sportCenter.sportFields.filter(
            (item) => SPORT_FIELDS3.includes(item)
          )
        }
      />

      <PublicChipGroup
        title="تناسب اندام"
        items={
          sportCenter.sportFields.filter(
            (item) => SPORT_FIELDS4.includes(item)
          )
        }
      />

      <PublicChipGroup
        title="ورزش‌های کودک و نوجوان"
        items={
          sportCenter.sportFields.filter(
            (item) => SPORT_FIELDS5.includes(item)
          )
        }
      />

    </div>

  </PublicSection>

)}


        {/* =========================================
            سطح و شیوه تمرین
        ========================================= */}

        {(sportCenter.courseLevels?.length >
          0 ||
          sportCenter.teachingMethods?.length >
            0) && (

          <PublicSection
            title="سطح و شیوه برگزاری کلاس‌ها"
          >

            <div
              className="
                grid
                gap-4
                sm:grid-cols-2
              "
            >

              <PublicChipGroup
                title="سطح کلاس‌ها"
                items={
                  sportCenter.courseLevels
                }
              />


              <PublicChipGroup
                title="شیوه برگزاری تمرین‌ها"
                items={
                  sportCenter.teachingMethods
                }
              />

            </div>

          </PublicSection>

        )}

        {/* =========================================
    دوره‌ها و کلاس‌های ورزشی
========================================= */}

<PublicSection
  title="دوره‌ها و کلاس‌های ورزشی"
>

  {loadingServices ? (

    <div
      className="
        py-8
        text-center
        text-sm
        text-gray-400
      "
    >
      در حال دریافت دوره‌های ورزشی...
    </div>

  ) : publicCourses.length === 0 ? (

    <EmptyBox
      text="در حال حاضر دوره ورزشی فعالی ثبت نشده است."
    />

  ) : (

    <div
      className="
        grid
        gap-3
        sm:grid-cols-2
        lg:grid-cols-3
      "
    >

      {publicCourses.map(
        (service) => {

          const packageInfo =
            service.package ||
            service.packageInfo ||
            {};

          const serviceImage =
            Array.isArray(service.images) &&
            service.images.length > 0
              ? (
                  typeof service.images[0] === "string"
                    ? service.images[0]
                    : service.images[0]?.url
                )
              : service.image ||
                service.imageUrl ||
                service.coverImage ||
                "";

          return (

            <div
              key={service.id}
              className="
                rounded-2xl
                border
                border-yellow-100
                bg-[#faf7ef]
                p-4
              "
            >

              {/* تصویر دوره */}
              {serviceImage && (
                <div
                  className="
                    mb-4
                    overflow-hidden
                    rounded-xl
                    bg-white
                  "
                >
                  <img
                    src={serviceImage}
                    alt={
                      packageInfo.title ||
                      service.title ||
                      service.name ||
                      "دوره ورزشی"
                    }
                    className="
                      h-40
                      w-full
                      object-cover
                    "
                  />
                </div>
              )}

              <h3
                className="
                  font-black
                  text-[#6f4a18]
                "
              >
                {packageInfo.title ||
                  service.title ||
                  service.name ||
                  "دوره ورزشی"}
              </h3>


              {service.description && (

                <p
                  className="
                    mt-2
                    line-clamp-3
                    text-xs
                    leading-6
                    text-gray-500
                  "
                >
                  {service.description}
                </p>

              )}


              <div
                className="
                  mt-4
                  space-y-2
                  text-xs
                  text-gray-500
                "
              >

                {packageInfo.totalSessions && (

                  <p>
                    تعداد جلسات:{" "}
                    <strong
                      className="
                        text-[#6f4a18]
                      "
                    >
                      {packageInfo.totalSessions} جلسه
                    </strong>
                  </p>

                )}


                {Array.isArray(
                  packageInfo.weekdays
                ) &&
                  packageInfo.weekdays.length > 0 && (

                  <p>
                    روزهای برگزاری:{" "}
                    <strong
                      className="
                        text-[#6f4a18]
                      "
                    >
                      {packageInfo.weekdays.join(
                        "، "
                      )}
                    </strong>
                  </p>

                )}


                {packageInfo.startTime &&
                  packageInfo.endTime && (

                  <p>
                    ساعت:{" "}
                    <strong
                      className="
                        text-[#6f4a18]
                      "
                    >
                      {packageInfo.startTime}
                      {" تا "}
                      {packageInfo.endTime}
                    </strong>
                  </p>

                )}

              </div>


              {service.price !== undefined &&
                service.price !== null && (

                <p
                  className="
                    mt-4
                    font-black
                    text-green-700
                  "
                >
                  {Number(service.price) === 0
                    ? "رایگان"
                    : `${Number(
                        service.price
                      ).toLocaleString(
                        "fa-IR"
                      )} تومان`
                  }
                </p>

              )}


              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/course/${service.id}`
                  )
                }
                className="
                  mt-4
                  w-full
                  rounded-xl
                  bg-[#6f4a18]
                  py-2.5
                  text-xs
                  font-bold
                  text-white
                "
              >
                مشاهده دوره
              </button>

            </div>

          );
        }
      )}

    </div>

  )}

</PublicSection>


{/* =========================================
    رویدادها و خدمات ورزشی
========================================= */}

<PublicSection
  title="رویدادها و خدمات ورزشی"
>

  {loadingServices ? (

    <div
      className="
        py-8
        text-center
        text-sm
        text-gray-400
      "
    >
      در حال دریافت خدمات ورزشی...
    </div>

  ) : publicEvents.length === 0 ? (

    <EmptyBox
      text="در حال حاضر رویداد یا خدمت ورزشی فعالی ثبت نشده است."
    />

  ) : (

    <div
      className="
        grid
        gap-3
        sm:grid-cols-2
        lg:grid-cols-3
      "
    >

      {publicEvents.map(
        (service) => {

          const serviceImage =
            Array.isArray(service.images) &&
            service.images.length > 0
              ? (
                  typeof service.images[0] === "string"
                    ? service.images[0]
                    : service.images[0]?.url
                )
              : service.image ||
                service.imageUrl ||
                service.coverImage ||
                "";

          return (

            <div
              key={service.id}
              className="
                rounded-2xl
                border
                border-yellow-100
                bg-[#faf7ef]
                p-4
              "
            >

              {/* تصویر رویداد یا خدمت */}
              {serviceImage && (
                <div
                  className="
                    mb-4
                    overflow-hidden
                    rounded-xl
                    bg-white
                  "
                >
                  <img
                    src={serviceImage}
                    alt={
                      service.title ||
                      service.name ||
                      "خدمت ورزشی"
                    }
                    className="
                      h-40
                      w-full
                      object-cover
                    "
                  />
                </div>
              )}

              <h3
                className="
                  font-black
                  text-[#6f4a18]
                "
              >
                {service.title ||
                  service.name ||
                  "خدمت ورزشی"}
              </h3>


              {service.description && (

                <p
                  className="
                    mt-2
                    line-clamp-3
                    text-xs
                    leading-6
                    text-gray-500
                  "
                >
                  {service.description}
                </p>

              )}


              {service.price !== undefined &&
                service.price !== null && (

                <p
                  className="
                    mt-4
                    font-black
                    text-green-700
                  "
                >
                  {Number(service.price) === 0
                    ? "رایگان"
                    : `${Number(
                        service.price
                      ).toLocaleString(
                        "fa-IR"
                      )} تومان`
                  }
                </p>

              )}


              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/service/${service.id}`
                  )
                }
                className="
                  mt-4
                  w-full
                  rounded-xl
                  bg-[#6f4a18]
                  py-2.5
                  text-xs
                  font-bold
                  text-white
                "
              >
                مشاهده جزئیات
              </button>

            </div>

          );
        }
      )}

    </div>

  )}

</PublicSection>



{/* =========================================
    محصولات مجموعه ورزشی
========================================= */}

<PublicSection
  title="محصولات مجموعه ورزشی"
>

  {loadingProducts ? (

    <div
      className="
        py-8
        text-center
        text-sm
        text-gray-400
      "
    >
      در حال دریافت محصولات مجموعه...
    </div>

  ) : publishedProducts.length === 0 ? (

    <EmptyBox
      text="در حال حاضر محصول فعالی توسط این مجموعه ارائه نشده است."
    />

  ) : (

    <div
      className="
        grid
        grid-cols-2
        gap-3
        md:grid-cols-3
        lg:grid-cols-4
      "
    >

      {publishedProducts.map(
        (product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        )
      )}

    </div>

  )}

</PublicSection>

{/* =========================================
    ظرفیت و فضای مجموعه
========================================= */}

<PublicSection
  title="فضا و ظرفیت مجموعه"
>

  <div
    className="
      grid
      grid-cols-2
      gap-3
      sm:grid-cols-3
    "
  >

    <PublicInfoBox
      title="ظرفیت پذیرش"
      value={
        sportCenter.studentCapacity ||
        "ثبت نشده"
      }
    />


    <PublicInfoBox
      title="وسعت مجموعه"
      value={
        sportCenter.area ||
        "ثبت نشده"
      }
    />


    <PublicInfoBox
      title="تعداد سالن یا فضای تمرین"
      value={
        sportCenter.classroomCount ||
        "ثبت نشده"
      }
    />

  </div>

</PublicSection>


{/* =========================================
    امکانات مجموعه
========================================= */}

{sportCenter.facilities?.length > 0 && (

  <PublicChipSection
    title="امکانات و تجهیزات مجموعه"
    items={
      sportCenter.facilities
    }
  />

)}


{/* =========================================
    ویژگی‌های مجموعه
========================================= */}

<PublicSection
  title="ویژگی‌ها و خدمات مجموعه"
>

  <div
    className="
      grid
      gap-3
      sm:grid-cols-2
    "
  >

    <PublicFeature
      title="کلاس‌ها و تمرین‌های آنلاین"
      enabled={
        sportCenter.hasOnlineClasses
      }
      description={
        sportCenter.onlineDescription
      }
    />


    <PublicFeature
      title="مسابقات و فعالیت قهرمانی"
      enabled={
        sportCenter.hasCompetition
      }
      description={
        sportCenter.competitionDescription
      }
    />


    <PublicFeature
      title="گواهی پایان دوره"
      enabled={
        sportCenter.hasCertificate
      }
      description={
        sportCenter.certificateDescription
      }
    />


    <PublicFeature
      title="تأمین تجهیزات ورزشی"
      enabled={
        sportCenter.providesSportEquipment
      }
      description={
        sportCenter.sportEquipmentDescription
      }
    />


    <PublicFeature
      title="سرویس رفت‌وآمد"
      enabled={
        sportCenter.hasTransportation
      }
      description={
        sportCenter.transportationDescription
      }
    />

  </div>

</PublicSection>

{/* =========================================
    مربیان و کادر مجموعه
========================================= */}

{sportCenter.staffMembers?.length > 0 && (

  <PublicSection
    title="مربیان و کادر مجموعه"
  >

    <div
      className="
        grid
        gap-3
        sm:grid-cols-2
        lg:grid-cols-3
      "
    >

      {sportCenter.staffMembers.map(
        (member, index) => (

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
                items-center
                gap-3
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
                  bg-yellow-100
                "
              >

                {member.image ? (

                  <img
                    src={member.image}
                    alt={
                      member.name ||
                      "مربی مجموعه"
                    }
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />

                ) : (

                  <UserRound
                    size={28}
                    className="
                      text-yellow-700
                    "
                  />

                )}

              </div>


              <div className="min-w-0">

                <p
                  className="
                    font-black
                    text-[#6f4a18]
                  "
                >
                  {member.name ||
                    "عضو مجموعه"}
                </p>


                {member.position && (

                  <p
                    className="
                      mt-1
                      text-xs
                      font-bold
                      text-yellow-700
                    "
                  >
                    {member.position}
                  </p>

                )}


                {member.specialty && (

                  <p
                    className="
                      mt-1
                      text-xs
                      text-gray-500
                    "
                  >
                    {member.specialty}
                  </p>

                )}

              </div>

            </div>


            {(member.education ||
              member.experience ||
              member.certificate) && (

              <div
                className="
                  mt-4
                  space-y-2
                  border-t
                  border-yellow-100
                  pt-3
                  text-xs
                  leading-6
                  text-gray-500
                "
              >

                {member.education && (
                  <p>
                    تحصیلات:{" "}
                    <strong
                      className="
                        text-gray-700
                      "
                    >
                      {member.education}
                    </strong>
                  </p>
                )}


                {member.experience && (
                  <p>
                    سابقه:{" "}
                    <strong
                      className="
                        text-gray-700
                      "
                    >
                      {member.experience}
                    </strong>
                  </p>
                )}


                {member.certificate && (
                  <p>
                    مدرک مربیگری:{" "}
                    <strong
                      className="
                        text-gray-700
                      "
                    >
                      {member.certificate}
                    </strong>
                  </p>
                )}

              </div>

            )}

          </div>

        )
      )}

    </div>

  </PublicSection>

)}


{/* =========================================
    رزومه مجموعه
========================================= */}

{sportCenter.resume && (

  <PublicSection
    title="معرفی و رزومه مجموعه"
  >

    <p
      className="
        whitespace-pre-line
        text-sm
        leading-8
        text-gray-600
      "
    >
      {sportCenter.resume}
    </p>

  </PublicSection>

)}


{/* =========================================
    روزها و ساعات فعالیت
========================================= */}

{sportCenter.workingSchedule?.length > 0 && (

  <PublicSection
    title="روزها و ساعات فعالیت"
  >

    <div
      className="
        grid
        gap-3
        sm:grid-cols-2
      "
    >

      {sportCenter.workingSchedule.map(
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
                items-center
                gap-2
              "
            >

              <Clock3
                size={17}
                className="
                  text-yellow-700
                "
              />

              <p
                className="
                  text-sm
                  font-black
                  text-[#6f4a18]
                "
              >
                {Array.isArray(
                  schedule.days
                ) &&
                schedule.days.length > 0
                  ? schedule.days.join("، ")
                  : "روزهای فعالیت"
                }
              </p>

            </div>


            {(schedule.openingTime ||
              schedule.closingTime) && (

              <p
                className="
                  mt-3
                  text-xs
                  font-bold
                  text-gray-500
                "
              >
                ساعت فعالیت:{" "}

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

  </PublicSection>

)}


{/* =========================================
    اطلاعات تماس
========================================= */}

<PublicSection
  title="اطلاعات تماس و آدرس"
>

  <div
    className="
      grid
      gap-3
      sm:grid-cols-2
    "
  >

    <PublicContactBox
      title="آدرس"
      value={
        [
          sportCenter.city,
          sportCenter.district,
          sportCenter.address,
        ]
          .filter(Boolean)
          .join("، ") ||
        "ثبت نشده"
      }
    />


    <PublicContactBox
      title="شماره تماس"
      value={
        sportCenter.phone ||
        "ثبت نشده"
      }
    />


    <PublicContactBox
      title="ایمیل"
      value={
        sportCenter.email ||
        "ثبت نشده"
      }
    />


    <PublicContactBox
      title="سابقه مربیان"
      value={
        sportCenter.teacherExperience ||
        "ثبت نشده"
      }
    />

  </div>

</PublicSection>

      </div>

    </main>

  );
}


// =========================================================
// Components
// =========================================================

// =========================================================
// کامپوننت‌های نمایش عمومی
// =========================================================

function PublicSection({
  title,
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

      <h2
        className="
          mb-4
          text-lg
          font-black
          text-[#6f4a18]
        "
      >
        {title}
      </h2>

      {children}

    </section>

  );
}


function PublicInfoBox({
  title,
  value,
}) {

  return (

    <div
      className="
        rounded-2xl
        bg-white
        p-4
        text-center
        shadow
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
          font-black
          text-[#6f4a18]
        "
      >
        {value}
      </p>

    </div>

  );
}


function PublicChipSection({
  title,
  items = [],
}) {

  if (
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return null;
  }


  return (

    <PublicSection
      title={title}
    >

      <div
        className="
          flex
          flex-wrap
          gap-2
        "
      >

        {items.map(
          (item, index) => (

            <span
              key={`${item}-${index}`}
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

          )
        )}

      </div>

    </PublicSection>

  );
}


function PublicChipGroup({
  title,
  items = [],
}) {

  if (
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return null;
  }


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
          mb-3
          text-sm
          font-black
          text-[#6f4a18]
        "
      >
        {title}
      </p>


      <div
        className="
          flex
          flex-wrap
          gap-2
        "
      >

        {items.map(
          (item, index) => (

            <span
              key={`${item}-${index}`}
              className="
                rounded-full
                bg-white
                px-3
                py-2
                text-xs
                font-bold
                text-gray-600
                shadow-sm
              "
            >
              {item}
            </span>

          )
        )}

      </div>

    </div>

  );
}


function PublicFeature({
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
            text-[#6f4a18]
          "
        >
          {title}
        </p>


        <span
          className={`
            shrink-0
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


      {enabled &&
        description && (

        <p
          className="
            mt-3
            whitespace-pre-line
            text-xs
            leading-6
            text-gray-500
          "
        >
          {description}
        </p>

      )}

    </div>

  );
}


function PublicContactBox({
  title,
  value,
}) {

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
          text-xs
          font-bold
          text-gray-400
        "
      >
        {title}
      </p>


      <p
        className="
          mt-2
          break-words
          text-sm
          font-black
          leading-7
          text-[#6f4a18]
        "
      >
        {value}
      </p>

    </div>

  );
}


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