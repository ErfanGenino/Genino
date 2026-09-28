// D:\projects\Genino\genino-web\src\pages\vendor\service\VendorArtClassPage.jsx
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
  Pencil,
  Award,
  Palette,
  UserRound,
  Image,
} from "lucide-react";

import PromoSlider from "../../../components/Social/PromoSlider.jsx";
import ProductCard from "../../../components/Product/ProductCard";
import ArtClassStudentsSection from "./components/ArtClassStudentsSection";
import {
  getVendorArtClassProfile,
  saveVendorArtClassProfile,
  presignVendorKindergartenHeaderUpload,
  presignVendorKindergartenStaffUpload,
  putFileToPresignedUrl,
  getVendorChildren,
  searchVendorChildren,
  addVendorChild,
  removeVendorChild,
  createArtClassAchievement,
  getArtClassAchievements,
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


const ART_FIELDS = [
  "نقاشی",
    "طراحی",
    "سیاه‌قلم",
    "آبرنگ",
    "گواش",
    "رنگ روغن",
    "اکریلیک",
    "طراحی چهره",
    "طراحی شخصیت",
    "تصویرسازی",
    "کاریکاتور",
    "خوشنویسی",
    "نستعلیق",
    "شکسته نستعلیق",
    "تذهیب",
    "نگارگری ایرانی",
    "مینیاتور",
];

const ART_FIELDS2 = [
  "موسیقی کودک",
    "ارف کودک",
    "تئوری موسیقی",
    "نت‌خوانی و سلفژ",
    "آهنگسازی",
    "تنظیم موسیقی",
    "آواز",
    "خوانندگی",
    "پیانو",
    "کیبورد",
    "گیتار",
    "گیتار الکتریک",
    "ویولن",
    "ویولا",
    "ویولنسل",
    "دف",
    "تنبک",
    "سنتور",
    "تار",
    "سه‌تار",
    "نی",
    "کمانچه",
    "عود",
    "قانون",
    "درامز",
    "فلوت",
    "ساکسیفون",
    "کلارینت",
];

const ART_FIELDS3 = [
  "تئاتر کودک",
    "تئاتر نوجوان",
    "بازیگری",
    "بازیگری سینما",
    "بازیگری تئاتر",
    "بداهه‌پردازی",
    "گویندگی",
    "دوبله",
    "فن بیان",
    "سخنوری",
    "مجری‌گری",
    "استندآپ کودک",
    "استندآپ کمدی",
    "نمایش خلاق",
    "قصه‌گویی",
    "نمایش عروسکی",
    "پانتومیم",
    "حرکت و بیان بدن",
    "آمادگی ورود به هنرستان‌های نمایشی",
];

const ART_FIELDS4 = [
  "کاردستی",
    "خلاقیت کودک",
    "اوریگامی",
    "کاغذ و تا",
    "ماکت‌سازی",
    "ساخت عروسک",
    "سفالگری",
    "سرامیک",
    "مجسمه‌سازی",
    "رزین",
    "شمع‌سازی",
    "صابون‌سازی",
    "ساخت زیورآلات",
    "چرم‌دوزی",
    "معرق",
    "منبت‌کاری",
    "کلاژ و حجم‌سازی",
    "بازیافت خلاق",
    "DIY و ساختنی",
];


const COURSE_LEVELS = [
  "مقدماتی",
  "متوسط",
  "پیشرفته",
  "همه سطوح",
];


const TEACHING_METHODS = [
  "حضوری",
  "آنلاین",
  "خصوصی",
  "گروهی",
  "کارگاهی",
  "پروژه‌محور",
  "بازی‌محور",
  "تمرین عملی",
];


const FACILITY_OPTIONS = [
  "آتلیه نقاشی",
  "کارگاه هنری",
  "کارگاه سفال",
  "اتاق موسیقی",
  "سالن تمرین",
  "سالن نمایش",
  "استودیو",
  "پیانو",
  "سازهای آموزشی",
  "میز نور",
  "سه‌پایه نقاشی",
  "تجهیزات طراحی",
  "تجهیزات سفالگری",
  "تجهیزات عکاسی",
  "ویدئو پروژکتور",
  "تلویزیون هوشمند",
  "اینترنت",
  "کتابخانه هنری",
  "فضای نمایش آثار",
  "فضای انتظار والدین",
  "سیستم سرمایش و گرمایش",
  "پارکینگ",
  "دوربین نظارتی",
  "آسانسور",
];


// =========================================================
// صفحه اصلی
// =========================================================

export default function VendorArtClassPage() {

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
    validationErrors,
    setValidationErrors,
  ] = useState({});


  const [
    selectedAchievementChild,
    setSelectedAchievementChild,
  ] = useState(null);

  const [
  loadingChildren,
  setLoadingChildren,
] = useState(true);


const [
  childSearch,
  setChildSearch,
] = useState("");


const [
  childSearchResults,
  setChildSearchResults,
] = useState([]);


const [
  searchingChildren,
  setSearchingChildren,
] = useState(false);


const [
  addingChildId,
  setAddingChildId,
] = useState(null);


const [
  removingChildId,
  setRemovingChildId,
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
  artClassAchievements,
  setArtClassAchievements,
] = useState([]);


const [
  loadingAchievements,
  setLoadingAchievements,
] = useState(false);


  // =========================================================
// اطلاعات بسته، محصولات و خدمات
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
  // اطلاعات مجموعه هنری
  // =========================================================

  const [
    artCenter,
    setArtCenter,
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

    artFields: [],
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

    hasExhibition: false,
    exhibitionDescription: "",

    hasCertificate: false,
    certificateDescription: "",

    providesArtMaterials: false,
    artMaterialsDescription: "",

    hasTransportation: false,
    transportationDescription: "",

    teacherCount: "",
    teacherExperience: "",

    staffMembers: [],

    children: [],

    resume: "",
  });


  // =========================================================
// دریافت اطلاعات مجموعه هنری
// =========================================================

useEffect(() => {

  async function loadArtClassProfile() {

    if (!vendorId) {
      setLoading(false);
      return;
    }


    try {

      setLoading(true);


      const res =
        await getVendorArtClassProfile(
          vendorId
        );


      console.log(
        "ART CLASS PROFILE RESPONSE:",
        res
      );


      if (
        res?.ok &&
        res?.profile
      ) {

        setArtCenter(
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
                        !String(url).startsWith(
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


            artFields:
              Array.isArray(
                res.profile.artFields
              )
                ? res.profile.artFields
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


            children:
              prev.children,
          })
        );

      }


    } catch (error) {

      console.error(
        "LOAD ART CLASS PROFILE ERROR:",
        error
      );


      alert(
        "خطا در دریافت اطلاعات مجموعه هنری"
      );


    } finally {

      setLoading(false);

    }

  }


  loadArtClassProfile();

}, [vendorId]);


// =========================================================
// دریافت اطلاعات بسته + محصولات مجموعه هنری
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
            method:
              "GET",

            headers: {
              Accept:
                "application/json",
            },
          }
        ),


        fetch(
          productsUrl,
          {
            method:
              "GET",

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
            "خطا در دریافت اطلاعات بسته مجموعه هنری"
        );
      }


      if (
        !productsRes.ok ||
        !productsData?.ok
      ) {

        throw new Error(
          productsData?.message ||
            "خطا در دریافت محصولات مجموعه هنری"
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
        "LOAD ART CLASS PACKAGE / PRODUCTS ERROR:",
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
// دریافت خدمات مجموعه هنری
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
            method:
              "GET",

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
            "خطا در دریافت خدمات مجموعه هنری"
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
        "LOAD ART CLASS SERVICES ERROR:",
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
// دریافت هنرجویان مجموعه هنری
// =========================================================

useEffect(() => {

  async function loadArtClassChildren() {

    if (
      !vendorId ||
      !isVendorOwner
    ) {

      setLoadingChildren(false);

      return;
    }


    try {

      setLoadingChildren(true);


      const res =
        await getVendorChildren();


      console.log(
        "ART CLASS CHILDREN RESPONSE:",
        res
      );


      if (!res?.ok) {

        throw new Error(
          res?.message ||
            "خطا در دریافت هنرجویان"
        );
      }


      const receivedChildren =
        Array.isArray(
          res.children
        )
          ? res.children
          : [];


      const artClassChildren =
        receivedChildren.filter(
          (item) =>
            item.relationType ===
            "TRAINEE"
        );


      setArtCenter(
        (prev) => ({
          ...prev,

          children:
            artClassChildren.map(
              (item) =>
                item.child
                  ? {
                      ...item.child,
                      relationType:
                        item.relationType,
                    }
                  : item
            ),
        })
      );


    } catch (error) {

      console.error(
        "LOAD ART CLASS CHILDREN ERROR:",
        error
      );


      setArtCenter(
        (prev) => ({
          ...prev,
          children: [],
        })
      );


    } finally {

      setLoadingChildren(false);

    }

  }


  loadArtClassChildren();

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

    setArtCenter(
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
// حذف محصول مجموعه هنری
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
            method:
              "DELETE",

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
        "DELETE ART CLASS PRODUCT ERROR:",
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
            method:
              "PATCH",

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
              item.id ===
              productId
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
        "PUBLISH ART CLASS PRODUCT ERROR:",
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
            method:
              "PATCH",

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
              item.id ===
              productId
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
        "UNPUBLISH ART CLASS PRODUCT ERROR:",
        error
      );


      alert(
        "خطا در ارتباط با سرور"
      );

    }

  };

  // =========================================================
// حذف خدمت مجموعه هنری
// =========================================================

const handleDeleteService =
  async (serviceId) => {

    const ok =
      window.confirm(
        "آیا از حذف این خدمت مطمئن هستید؟"
      );


    if (!ok) return;


    try {

      const res =
        await fetch(
          `${API_BASE_URL}/vendor-services/${serviceId}`,
          {
            method:
              "DELETE",

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
        "DELETE ART CLASS SERVICE ERROR:",
        error
      );


      alert(
        "خطا در ارتباط با سرور"
      );

    }

  };


// =========================================================
// انتشار خدمت
// =========================================================

const handlePublishService =
  async (serviceId) => {

    try {

      const res =
        await fetch(
          `${API_BASE_URL}/vendor-services/${serviceId}/publish`,
          {
            method:
              "PATCH",

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
              item.id ===
              serviceId
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
        "PUBLISH ART CLASS SERVICE ERROR:",
        error
      );


      alert(
        "خطا در ارتباط با سرور"
      );

    }

  };


// =========================================================
// عدم انتشار خدمت
// =========================================================

const handleUnpublishService =
  async (serviceId) => {

    try {

      const res =
        await fetch(
          `${API_BASE_URL}/vendor-services/${serviceId}/unpublish`,
          {
            method:
              "PATCH",

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
              item.id ===
              serviceId
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
        "UNPUBLISH ART CLASS SERVICE ERROR:",
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
        artCenter.headerImages.length >= 10
      ) {

        alert(
          "حداکثر ۱۰ تصویر می‌توانید برای مجموعه هنری ثبت کنید."
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
            "خطا در آماده‌سازی تصویر مجموعه هنری"
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
            "آپلود تصویر مجموعه هنری انجام نشد"
        );

        return;
      }


      setArtCenter(
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
        "UPLOAD ART CLASS HEADER ERROR:",
        error
      );


      alert(
        "خطا در آپلود تصویر مجموعه هنری"
      );

    }

  };


  const updateHeaderDescription = (
    index,
    value
  ) => {

    setArtCenter(
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

    setArtCenter(
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
  // انتخاب چند گزینه‌ای
  // =========================================================

  const toggleArrayField = (
    field,
    value
  ) => {

    setArtCenter(
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
  // روزها و ساعات فعالیت
  // =========================================================

  const addWorkingSchedule =
    () => {

      setArtCenter(
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

    setArtCenter(
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

    setArtCenter(
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

    setArtCenter(
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
  // مربیان و اعضا
  // =========================================================

  const addStaffMember =
    () => {

      setArtCenter(
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

    setArtCenter(
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

    setArtCenter(
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
            "خطا در آماده‌سازی تصویر مربی"
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
            "آپلود تصویر مربی انجام نشد"
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
        "UPLOAD ART CLASS STAFF IMAGE ERROR:",
        error
      );


      alert(
        "خطا در آپلود تصویر مربی"
      );

    }

  };


  // =========================================================
// جستجوی کودکان ژنینویی
// =========================================================

const handleSearchChildren =
  async () => {

    const q =
      childSearch.trim();


    if (!q) {

      setChildSearchResults([]);

      return;
    }


    try {

      setSearchingChildren(true);


      const res =
        await searchVendorChildren(
          q
        );


      if (!res?.ok) {

        alert(
          res?.message ||
            "خطا در جستجوی کودکان"
        );

        return;
      }


      const results =
        Array.isArray(
          res.children
        )
          ? res.children
          : [];


      setChildSearchResults(
        results
      );


    } catch (error) {

      console.error(
        "SEARCH ART CLASS CHILDREN ERROR:",
        error
      );


      alert(
        "خطا در جستجوی کودکان ژنینویی"
      );


    } finally {

      setSearchingChildren(false);

    }

  };


// =========================================================
// افزودن هنرجو
// =========================================================

const handleAddChild =
  async (child) => {

    if (!child?.id) return;


    const alreadyAdded =
      artCenter.children.some(
        (item) =>
          Number(item.id) ===
          Number(child.id)
      );


    if (alreadyAdded) {

      alert(
        "این کودک قبلاً به هنرجویان مجموعه اضافه شده است."
      );

      return;
    }


    try {

      setAddingChildId(
        child.id
      );


      const res =
        await addVendorChild(
          child.id,
          "TRAINEE"
        );


      if (!res?.ok) {

        alert(
          res?.message ||
            "افزودن هنرجو انجام نشد."
        );

        return;
      }


      setArtCenter(
        (prev) => ({
          ...prev,

          children: [
            ...prev.children,
            {
              ...child,
              relationType:
                "TRAINEE",
            },
          ],
        })
      );


      setChildSearchResults(
        (prev) =>
          prev.filter(
            (item) =>
              Number(item.id) !==
              Number(child.id)
          )
      );


      alert(
        "هنرجو با موفقیت به مجموعه اضافه شد."
      );


    } catch (error) {

      console.error(
        "ADD ART CLASS CHILD ERROR:",
        error
      );


      alert(
        "خطا در افزودن هنرجو"
      );


    } finally {

      setAddingChildId(
        null
      );

    }

  };


// =========================================================
// حذف هنرجو
// =========================================================

const handleRemoveChild =
  async (child) => {

    if (!child?.id) return;


    const ok =
      window.confirm(
        `آیا از حذف «${child.fullName}» از هنرجویان مجموعه مطمئن هستید؟`
      );


    if (!ok) return;


    try {

      setRemovingChildId(
        child.id
      );


      const res =
        await removeVendorChild(
          child.id
        );


      if (!res?.ok) {

        alert(
          res?.message ||
            "حذف هنرجو انجام نشد."
        );

        return;
      }


      setArtCenter(
        (prev) => ({
          ...prev,

          children:
            prev.children.filter(
              (item) =>
                Number(item.id) !==
                Number(child.id)
            ),
        })
      );


      if (
        Number(
          selectedAchievementChild?.id
        ) ===
        Number(child.id)
      ) {

        setSelectedAchievementChild(
          null
        );
      }


    } catch (error) {

      console.error(
        "REMOVE ART CLASS CHILD ERROR:",
        error
      );


      alert(
        "خطا در حذف هنرجو"
      );


    } finally {

      setRemovingChildId(
        null
      );

    }

  };


  // =========================================================
// صدور دستاورد برای هنرجو
// =========================================================

const handleCreateAchievement =
  async () => {

    if (!selectedAchievementChild?.id) {
      alert("ابتدا هنرجو را انتخاب کنید.");
      return;
    }

    if (!achievementForm.category) {
      alert("نوع دستاورد را انتخاب کنید.");
      return;
    }

    if (!achievementForm.title.trim()) {
      alert("عنوان دستاورد را وارد کنید.");
      return;
    }

    if (remainingAchievementCount <= 0) {
      alert("مجوز باقی‌مانده برای صدور دستاورد ندارید.");
      return;
    }

    try {

      const res =
        await createArtClassAchievement(
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
        "CREATE ART CLASS ACHIEVEMENT:",
        res
      );


      if (!res?.ok) {

        alert(
          res?.message ||
          "صدور دستاورد انجام نشد."
        );

        return;
      }


      setAchievementUsedCount(
        (prev) => prev + 1
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
        "دستاورد با موفقیت برای هنرجو صادر شد 🌟"
      );


    } catch (error) {

      console.error(
        "CREATE ART CLASS ACHIEVEMENT ERROR:",
        error
      );

      alert(
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
          artCenter.centerName ||
            ""
        ).trim()
      ) {
        errors.centerName =
          "نام مجموعه هنری الزامی است";
      }


      if (
        !String(
          artCenter.slogan ||
            ""
        ).trim()
      ) {
        errors.slogan =
          "شعار مجموعه هنری الزامی است";
      }


      if (
        !String(
          artCenter.city ||
            ""
        ).trim()
      ) {
        errors.city =
          "شهر محل فعالیت الزامی است";
      }


      if (
        !String(
          artCenter.district ||
            ""
        ).trim()
      ) {
        errors.district =
          "منطقه الزامی است";
      }


      if (
        !String(
          artCenter.address ||
            ""
        ).trim()
      ) {
        errors.address =
          "آدرس دقیق الزامی است";
      }


      if (
        !String(
          artCenter.phone ||
            ""
        ).trim()
      ) {
        errors.phone =
          "شماره تماس الزامی است";
      }


      if (
        !String(
          artCenter.email ||
            ""
        ).trim()
      ) {

        errors.email =
          "ایمیل الزامی است";

      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          String(
            artCenter.email
          ).trim()
        )
      ) {

        errors.email =
          "فرمت ایمیل صحیح نیست";
      }


      if (
        !artCenter.gender
      ) {
        errors.gender =
          "جنسیت پذیرش را مشخص کنید";
      }


      if (
        artCenter
          .acceptedAges.length ===
        0
      ) {
        errors.acceptedAges =
          "حداقل یک گروه سنی انتخاب کنید";
      }


      if (
        artCenter
          .artFields.length ===
        0
      ) {
        errors.artFields =
          "حداقل یک رشته هنری انتخاب کنید";
      }


      const schedule =
        artCenter
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
// ذخیره واقعی اطلاعات مجموعه هنری
// =========================================================

const handleSave =
  async () => {

    const valid =
      validateFields();


    if (!valid) {

      alert(
        "لطفاً اطلاعات ضروری مجموعه هنری را کامل کنید."
      );

      return;
    }


    try {

      setSaving(true);


      const {
        id,
        vendorId:
          savedVendorId,
        createdAt,
        updatedAt,
        children,
        ...payload
      } = artCenter;


      const res =
        await saveVendorArtClassProfile(
          vendorId,
          payload
        );


      console.log(
        "SAVE ART CLASS RESPONSE:",
        res
      );


      if (res?.ok) {

        if (res.profile) {

          setArtCenter(
            (prev) => ({
              ...prev,
              ...res.profile,

              children:
                prev.children,
            })
          );

        }


        setValidationErrors(
          {}
        );


        alert(
          "اطلاعات مجموعه هنری با موفقیت ذخیره شد 💛"
        );


        return;
      }


      alert(
        res?.message ||
          "ذخیره اطلاعات مجموعه هنری انجام نشد."
      );


    } catch (error) {

      console.error(
        "SAVE ART CLASS ERROR:",
        error
      );


      alert(
        "خطا در ذخیره اطلاعات مجموعه هنری."
      );


    } finally {

      setSaving(false);

    }

  };

  if (loading) {

  return (

    <main
      dir="rtl"
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-[#faf7ef]
        p-4
      "
    >

      <p
        className="
          text-sm
          font-bold
          text-gray-500
        "
      >
        در حال دریافت اطلاعات مجموعه هنری...
      </p>

    </main>

  );
}



if (isPublicView) {

  return (
    <PublicArtClassView
      artCenter={artCenter}
      products={products}
      services={services}
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
            هدر و تصاویر
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

            {artCenter
              .headerImages
              .length > 0 ? (

              <div>

                <PromoSlider
                  variant="golden"
                  interval={7000}
                  height="h-44 sm:h-52 md:h-60 lg:h-64"
                  slides={
                    artCenter
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
                    transition
                    hover:bg-red-100
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
                      artCenter
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
                    placeholder="مثلاً: آتلیه نقاشی و فضای آموزشی مجموعه"
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

                <Palette
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

              افزودن تصویر مجموعه هنری

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
              حداکثر ۱۰ تصویر - آتلیه، کلاس‌ها، کارگاه‌ها، تجهیزات، آثار هنرجویان و فضای مجموعه
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
            در این بخش می‌توانید کالاها، خدمات و دوره‌های هنری مجموعه را مدیریت کنید. هر کالا یا خدمت یک پنجره از ظرفیت بسته همکاری شما را استفاده می‌کند.
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
    loadingWindows
      ? "..."
      : packageWindowCount
  }
/>


            <CounterBox
  title="استفاده‌شده"
  value={
    loadingWindows
      ? "..."
      : usedWindowCount
  }
/>


            <CounterBox
  title="باقی‌مانده"
  value={
    loadingWindows
      ? "..."
      : remainingWindowCount
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


          {!loadingWindows && canAddWindow && (

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
          `/vendor/product/create?source=art-class&vendorId=${vendorId}`
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
          `/vendor/service/create?source=art-class&vendorId=${vendorId}`
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

)}


{!loadingWindows && !canAddWindow && (

  <div
    className="
      mt-4
      text-center
      text-xs
      font-bold
      text-red-500
    "
  >

    {packageWindowCount <= 0
      ? "برای بسته مجموعه هنری پنجره کالا و خدمت ثبت نشده است"
      : "تمام پنجره‌های کالا و خدمت بسته شما استفاده شده است"
    }

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
        کالاهای مجموعه هنری
      </h3>


      <p
        className="
          mt-1
          text-xs
          text-gray-400
        "
      >
        ابزارها، لوازم هنری، کتاب‌ها و محصولات ارائه‌شده توسط مجموعه
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

    <EmptyBox
      text="در حال دریافت محصولات..."
    />

  ) : products.length === 0 ? (

    <EmptyBox
      text="هنوز کالایی ثبت نشده است."
    />

  ) : (

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
            key={
              product.id
            }
            className="
              flex
              flex-col
              gap-2
            "
          >

            <ProductCard
              product={
                product
              }
              source="vendor-shop"
              showFavorite={
                false
              }
            />


            <div
              className="
                grid
                grid-cols-2
                gap-2
              "
            >

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/vendor/product/edit/${product.id}?source=art-class&vendorId=${vendorId}`
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

                <Pencil
                  size={14}
                />

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

                <Trash2
                  size={14}
                />

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

  )}

</section>


        {/* =====================================================
            خدمات و رویدادها
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
        رویدادها و خدمات هنری
      </h3>


      <p
        className="
          mt-1
          text-xs
          text-gray-400
        "
      >
        نمایشگاه‌ها، جشن‌ها، کارگاه‌ها و سایر خدمات قابل رزرو مجموعه هنری
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

    <EmptyBox
      text="در حال دریافت خدمات..."
    />

  ) : eventServices.length === 0 ? (

    <EmptyBox
      text="هنوز خدمتی ثبت نشده است."
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
        lg:gap-6
      "
    >

      {eventServices.map(
        (service) => {

          const typeLabels = {
            EVENT: "جشن و رویداد",
            CLASS: "کلاس",
            WORKSHOP: "کارگاه",
            CAMP: "اردو",
            CONSULTATION: "مشاوره",
            OTHER: "سایر خدمات",
          };


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


          const startDateText =
            service.startAt
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
              key={
                service.id
              }
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
                      src={
                        typeof mainImage ===
                        "string"
                          ? mainImage
                          : mainImage?.url ||
                            ""
                      }
                      alt={
                        service.title ||
                        "خدمت هنری"
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
                      <Palette
                        className="
                          h-12
                          w-12
                          text-yellow-300
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
                      shadow

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
                    {artCenter.centerName ||
                      "مجموعه هنری"}
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
                      {service.capacity ||
                        "—"}{" "}
                      نفر
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
                            service.price ||
                              0
                          ).toLocaleString(
                            "fa-IR"
                          )} ریال`
                      }
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
                      {
                        service.locationName
                      }
                    </p>

                  )}

                </div>

              </div>


              <div
                className="
                  grid
                  grid-cols-2
                  gap-2
                "
              >

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/vendor/service/edit/${service.id}?source=art-class&vendorId=${vendorId}&mode=${service.scheduleMode}`
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
                  <Pencil
                    size={14}
                  />
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
                  "
                >
                  <Trash2
                    size={14}
                  />
                  حذف
                </button>

              </div>


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
                    bg-orange-50
                    py-2
                    text-xs
                    font-bold
                    text-orange-600
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
                  "
                >
                  انتشار خدمت
                </button>

              )}

            </div>

          );

        }
      )}

    </div>

  )}

</section>


        {/* =====================================================
            دوره‌ها
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
        دوره‌ها و کلاس‌های هنری
      </h3>


      <p
        className="
          mt-1
          text-xs
          text-gray-400
        "
      >
        کلاس‌ها و دوره‌های چندجلسه‌ای هنری مجموعه
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

    <EmptyBox
      text="در حال دریافت دوره‌ها..."
    />

  ) : courseServices.length === 0 ? (

    <EmptyBox
      text="هنوز دوره هنری ثبت نشده است."
    />

  ) : (

    <div
      className="
        grid
        grid-cols-2
        gap-3
        sm:grid-cols-3
        lg:grid-cols-4
      "
    >

      {courseServices.map(
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


          const startDateText =
            service.package
              ?.startDate
              ? new Intl.DateTimeFormat(
                  "fa-IR",
                  {
                    year:
                      "numeric",
                    month:
                      "2-digit",
                    day:
                      "2-digit",
                  }
                ).format(
                  new Date(
                    service.package
                      .startDate
                  )
                )
              : "ثبت نشده";


          return (

            <div
              key={
                service.id
              }
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
                      src={
                        typeof mainImage ===
                        "string"
                          ? mainImage
                          : mainImage?.url ||
                            ""
                      }
                      alt={
                        service.title ||
                        "دوره هنری"
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
                      <Palette
                        className="
                          h-12
                          w-12
                          text-yellow-300
                        "
                      />
                    </div>

                  )}


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
                    {artCenter.centerName ||
                      "مجموعه هنری"}
                  </p>


                  <p
                    className="
                      mt-2
                      text-xs
                      text-gray-400
                    "
                  >
                    شروع دوره:{" "}
                    {startDateText}
                  </p>


                  <p
                    className="
                      mt-1
                      text-xs
                      text-gray-400
                    "
                  >
                    تعداد جلسات:{" "}
                    {service.package
                      ?.totalSessions ||
                      0}
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
                      {service.capacity ||
                        "—"}{" "}
                      نفر
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
                            service.price ||
                              0
                          ).toLocaleString(
                            "fa-IR"
                          )} ریال`
                      }
                    </span>

                  </div>

                </div>

              </div>


              <div
                className="
                  grid
                  grid-cols-2
                  gap-2
                "
              >

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/vendor/service/edit/${service.id}?source=art-class&vendorId=${vendorId}&mode=${service.scheduleMode}`
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
                  <Pencil
                    size={14}
                  />
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
                  "
                >
                  <Trash2
                    size={14}
                  />
                  حذف
                </button>

              </div>


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
                    bg-orange-50
                    py-2
                    text-xs
                    font-bold
                    text-orange-600
                  "
                >
                  عدم انتشار دوره
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
          title="معرفی مجموعه هنری"
          icon={
            <Palette
              size={19}
            />
          }
        >

          <SimpleInput
            label="نام مجموعه هنری"
            value={
              artCenter
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
            label="شعار مجموعه هنری"
            value={
              artCenter.slogan
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
            label="معرفی کوتاه مجموعه هنری"
            value={
              artCenter
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
              artCenter.city
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
              artCenter.district
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
              artCenter.address
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
              artCenter.phone
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
              artCenter.email
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
            پذیرش هنرجویان
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
              artCenter.gender
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
                artCenter
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
            رشته‌های هنری
        ===================================================== */}

        <FormCard
          title="رشته‌ها و حوزه‌های هنری"
          icon={
            <Image
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
               هنرهای تجسمی
            </p>


            <ChipSelector
  options={
    ART_FIELDS
  }
  selected={
    artCenter
      .artFields
  }
  onToggle={(
    value
  ) =>
    toggleArrayField(
      "artFields",
      value
    )
  }
/>


            {validationErrors
              .artFields && (

              <ErrorText>
                {
                  validationErrors
                    .artFields
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
               موسیقی
            </p>


            <ChipSelector
  options={
    ART_FIELDS2
  }
  selected={
    artCenter
      .artFields
  }
  onToggle={(
    value
  ) =>
    toggleArrayField(
      "artFields",
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
                هنرهای نمایشی
            </p>


            <ChipSelector
  options={
    ART_FIELDS3
  }
  selected={
    artCenter
      .artFields
  }
  onToggle={(
    value
  ) =>
    toggleArrayField(
      "artFields",
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
                هنر دستی و خلاقیت
            </p>


            <ChipSelector
  options={
    ART_FIELDS4
  }
  selected={
    artCenter
      .artFields
  }
  onToggle={(
    value
  ) =>
    toggleArrayField(
      "artFields",
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
                artCenter
                  .courseLevels
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
              شیوه برگزاری کلاس‌ها
            </p>


            <ChipSelector
              options={
                TEACHING_METHODS
              }
              selected={
                artCenter
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


          {artCenter
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

              {artCenter
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


                    <div
                      className="
                        mt-4
                      "
                    >

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
                              schedule
                                .days
                                .includes(
                                  day
                                );


                            const disabled =
                              artCenter
                                .workingSchedule
                                .some(
                                  (
                                    other,
                                    otherIndex
                                  ) =>
                                    otherIndex !==
                                      index &&
                                    other.days.includes(
                                      day
                                    )
                                );


                            return (

                              <button
                                key={
                                  day
                                }
                                type="button"
                                disabled={
                                  disabled
                                }
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
                                      : disabled
                                      ? "cursor-not-allowed border-gray-100 bg-gray-100 text-gray-300"
                                      : "border-gray-200 bg-white text-gray-500 hover:border-yellow-300"
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
          title="ظرفیت و فضای مجموعه هنری"
        >

          <SimpleInput
            label="ظرفیت پذیرش هنرجو"
            value={
              artCenter
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
              artCenter
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
              artCenter.area
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
            label="تعداد کلاس یا کارگاه"
            value={
              artCenter
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
          title="امکانات تخصصی مجموعه هنری"
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
              امکانات، فضاها و تجهیزات تخصصی مجموعه هنری را انتخاب کنید.
            </p>


            <ChipSelector
              options={
                FACILITY_OPTIONS
              }
              selected={
                artCenter.facilities
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
          description="اگر مجموعه علاوه بر کلاس‌های حضوری، آموزش هنری آنلاین نیز ارائه می‌کند این بخش را فعال کنید."
          enabled={
            artCenter
              .hasOnlineClasses
          }
          onToggle={() =>
            updateField(
              "hasOnlineClasses",
              !artCenter
                .hasOnlineClasses
            )
          }
          enabledText="مجموعه دارای کلاس آنلاین است."
          disabledText="کلاس آنلاین ارائه نمی‌شود."
          textareaLabel="توضیحات کلاس آنلاین"
          value={
            artCenter
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
          placeholder="مثلاً: کلاس‌های طراحی و نقاشی به‌صورت آنلاین و زنده نیز برگزار می‌شوند."
        />


        {/* =====================================================
            نمایشگاه آثار
        ===================================================== */}

        <ToggleDescriptionSection
          title="نمایشگاه و ارائه آثار هنرجویان"
          description="اگر مجموعه نمایشگاه، اجرای هنری یا برنامه‌ای برای نمایش آثار هنرجویان برگزار می‌کند این بخش را فعال کنید."
          enabled={
            artCenter
              .hasExhibition
          }
          onToggle={() =>
            updateField(
              "hasExhibition",
              !artCenter
                .hasExhibition
            )
          }
          enabledText="مجموعه برنامه نمایش و ارائه آثار هنرجویان دارد."
          disabledText="برنامه نمایش آثار برگزار نمی‌شود."
          textareaLabel="توضیحات نمایشگاه و ارائه آثار"
          value={
            artCenter
              .exhibitionDescription
          }
          onChange={(
            value
          ) =>
            updateField(
              "exhibitionDescription",
              value
            )
          }
          placeholder="مثلاً: هر فصل نمایشگاه آثار هنرجویان برگزار و آثار برگزیده معرفی می‌شوند."
        />


        {/* =====================================================
            گواهی
        ===================================================== */}

        <ToggleDescriptionSection
          title="گواهی پایان دوره"
          description="اگر پس از پایان دوره برای هنرجویان گواهی یا مدرک صادر می‌شود این بخش را فعال کنید."
          enabled={
            artCenter
              .hasCertificate
          }
          onToggle={() =>
            updateField(
              "hasCertificate",
              !artCenter
                .hasCertificate
            )
          }
          enabledText="برای دوره‌ها گواهی صادر می‌شود."
          disabledText="گواهی پایان دوره صادر نمی‌شود."
          textareaLabel="توضیحات گواهی"
          value={
            artCenter
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
          placeholder="مثلاً: پس از تکمیل دوره و پروژه پایانی، گواهی مجموعه به هنرجو ارائه می‌شود."
        />


        {/* =====================================================
            ابزار و مواد مصرفی
        ===================================================== */}

        <ToggleDescriptionSection
          title="تأمین ابزار و مواد هنری"
          description="اگر بخشی از ابزار، مواد مصرفی یا تجهیزات موردنیاز کلاس توسط مجموعه در اختیار هنرجو قرار می‌گیرد این بخش را فعال کنید."
          enabled={
            artCenter
              .providesArtMaterials
          }
          onToggle={() =>
            updateField(
              "providesArtMaterials",
              !artCenter
                .providesArtMaterials
            )
          }
          enabledText="ابزار یا مواد هنری توسط مجموعه تأمین می‌شود."
          disabledText="هنرجو باید ابزار موردنیاز را شخصاً تهیه کند."
          textareaLabel="توضیحات ابزار و مواد مصرفی"
          value={
            artCenter
              .artMaterialsDescription
          }
          onChange={(
            value
          ) =>
            updateField(
              "artMaterialsDescription",
              value
            )
          }
          placeholder="مثلاً: رنگ، کاغذ و برخی ابزار مصرفی در شهریه دوره محاسبه شده است."
        />


        {/* =====================================================
            رفت و آمد
        ===================================================== */}

        <ToggleDescriptionSection
          title="سرویس رفت‌وآمد هنرجویان"
          description="اگر مجموعه برای رفت‌وآمد کودکان و نوجوانان سرویس ارائه می‌کند این بخش را فعال کنید."
          enabled={
            artCenter
              .hasTransportation
          }
          onToggle={() =>
            updateField(
              "hasTransportation",
              !artCenter
                .hasTransportation
            )
          }
          enabledText="مجموعه دارای سرویس رفت‌وآمد است."
          disabledText="سرویس رفت‌وآمد ارائه نمی‌شود."
          textareaLabel="توضیحات سرویس رفت‌وآمد"
          value={
            artCenter
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
          placeholder="مثلاً: سرویس رفت‌وبرگشت برای برخی مناطق شهر ارائه می‌شود."
        />


        {/* =====================================================
            مربیان
        ===================================================== */}

        <FormCard
          title="مربیان و کادر هنری"
          icon={
            <UserRound
              size={19}
            />
          }
        >

          <SimpleInput
            label="تعداد مربیان"
            value={
              artCenter
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
            label="میانگین سابقه مربیان"
            value={
              artCenter
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
                  مدیر، استادان، مربیان و سایر اعضای هنری مجموعه را معرفی کنید.
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


            {artCenter
              .staffMembers
              .length === 0 ? (

              <EmptyBox
                text="هنوز عضوی ثبت نشده است."
              />

            ) : (

              <div
                className="
                  space-y-2
                "
              >

                {artCenter
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
                                  "مربی هنری"
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
                            placeholder="تخصص هنری"
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
                            placeholder="سابقه آموزش"
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
          title="معرفی و رزومه مجموعه هنری"
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
              درباره سابقه فعالیت، سبک و روش آموزش، مجوزها، افتخارات، نمایشگاه‌ها، اجراها و ویژگی‌های شاخص مجموعه توضیح دهید.
            </p>

          </div>


          <SimpleTextArea
            label="معرفی و رزومه"
            value={
              artCenter.resume
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
              دستاوردهای هنری
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
            از این بخش می‌توانید برای هنرجویان مجموعه دستاورد هنری صادر کنید.
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
              در بسته مجموعه هنری مجوز صدور دستاورد ثبت نشده است
            </div>

          )}


          <ArtClassStudentsSection
  selectedStudents={artCenter.children}
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
            : "ذخیره اطلاعات مجموعه هنری"
          }

        </button>

      </div>

    </main>

  );
}


// =========================================================
// نمایش عمومی مجموعه هنری
// =========================================================

function PublicArtClassView({
  artCenter,
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
        service.scheduleMode === "PACKAGE"
    );


  const publicEvents =
    publishedServices.filter(
      (service) =>
        !service.package &&
        service.scheduleMode !== "PACKAGE"
    );


  const genderText =
    artCenter.gender ||
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

          {artCenter.headerImages?.length > 0 ? (

            <>

              <PromoSlider
                variant="golden"
                interval={7000}
                height="h-52 sm:h-72 md:h-80 lg:h-96"
                slides={
                  artCenter.headerImages.map(
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


              {artCenter.headerImages[
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
                    artCenter.headerImages[
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
                to-yellow-200
                sm:h-72
              "
            >

              <Palette
                size={70}
                className="
                  text-yellow-600
                "
              />

            </div>

          )}


          {/* نام مجموعه */}

          <div
            className="
              px-5
              py-6
              text-center
            "
          >

            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-yellow-100
                text-[#7a5526]
              "
            >
              <Palette size={27} />
            </div>


            <h1
              className="
                mt-3
                text-xl
                font-black
                text-[#5f3e16]
                sm:text-2xl
              "
            >
              {artCenter.centerName ||
                "مجموعه هنری"}
            </h1>


            {artCenter.slogan && (

              <p
                className="
                  mt-2
                  font-bold
                  text-[#b88724]
                "
              >
                {artCenter.slogan}
              </p>

            )}


            {(artCenter.city ||
              artCenter.district) && (

              <div
                className="
                  mt-4
                  flex
                  items-center
                  justify-center
                  gap-1
                  text-sm
                  text-gray-500
                "
              >

                <MapPin size={16} />

                {[
                  artCenter.city,
                  artCenter.district,
                ]
                  .filter(Boolean)
                  .join("، ")}

              </div>

            )}

          </div>

        </section>


        {/* =========================================
            معرفی
        ========================================= */}

        {(artCenter.description ||
          artCenter.resume) && (

          <PublicSection
            title="درباره مجموعه هنری"
            icon={
              <Palette size={19} />
            }
          >

            {artCenter.description && (

              <p
                className="
                  whitespace-pre-line
                  text-sm
                  leading-8
                  text-gray-600
                "
              >
                {artCenter.description}
              </p>

            )}


            {artCenter.resume && (

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
                  معرفی و رزومه
                </p>

                <p
                  className="
                    whitespace-pre-line
                    text-sm
                    leading-8
                    text-gray-600
                  "
                >
                  {artCenter.resume}
                </p>

              </div>

            )}

          </PublicSection>

        )}


        {/* =========================================
            اطلاعات سریع
        ========================================= */}

        <PublicSection
          title="اطلاعات مجموعه"
          icon={
            <UsersRound size={19} />
          }
        >

          <div
            className="
              grid
              grid-cols-2
              gap-3
              sm:grid-cols-3
              lg:grid-cols-6
            "
          >

            <PublicInfoBox
              title="پذیرش"
              value={genderText}
            />

            <PublicInfoBox
              title="ظرفیت هنرجو"
              value={
                artCenter.studentCapacity ||
                "—"
              }
            />

            <PublicInfoBox
              title="سال تأسیس"
              value={
                artCenter.foundedYear ||
                "—"
              }
            />

            <PublicInfoBox
              title="وسعت مجموعه"
              value={
                artCenter.area ||
                "—"
              }
            />

            <PublicInfoBox
              title="کلاس / کارگاه"
              value={
                artCenter.classroomCount ||
                "—"
              }
            />

            <PublicInfoBox
              title="تعداد مربیان"
              value={
                artCenter.teacherCount ||
                "—"
              }
            />

          </div>

        </PublicSection>


        {/* =========================================
            گروه‌های سنی
        ========================================= */}

        {artCenter.acceptedAges?.length >
          0 && (

          <PublicChipSection
            title="گروه‌های سنی قابل پذیرش"
            items={
              artCenter.acceptedAges
            }
          />

        )}


        {/* =========================================
    رشته‌ها و حوزه‌های هنری
========================================= */}

{artCenter.artFields?.length > 0 && (

  <PublicSection
    title="رشته‌ها و حوزه‌های هنری"
  >

    {artCenter.artFields.some(
      (item) => ART_FIELDS.includes(item)
    ) && (

      <PublicChipGroup
        title="نقاشی، طراحی و هنرهای تجسمی"
        items={
          artCenter.artFields.filter(
            (item) =>
              ART_FIELDS.includes(item)
          )
        }
      />

    )}


    {artCenter.artFields.some(
      (item) => ART_FIELDS2.includes(item)
    ) && (

      <PublicChipGroup
        title="موسیقی"
        items={
          artCenter.artFields.filter(
            (item) =>
              ART_FIELDS2.includes(item)
          )
        }
      />

    )}


    {artCenter.artFields.some(
      (item) => ART_FIELDS3.includes(item)
    ) && (

      <PublicChipGroup
        title="تئاتر، نمایش و هنرهای اجرایی"
        items={
          artCenter.artFields.filter(
            (item) =>
              ART_FIELDS3.includes(item)
          )
        }
      />

    )}


    {artCenter.artFields.some(
      (item) => ART_FIELDS4.includes(item)
    ) && (

      <PublicChipGroup
        title="هنرهای دستی و خلاقیت"
        items={
          artCenter.artFields.filter(
            (item) =>
              ART_FIELDS4.includes(item)
          )
        }
      />

    )}

  </PublicSection>

)}


        {/* =========================================
            سطح و روش آموزش
        ========================================= */}

        {(artCenter.courseLevels?.length >
          0 ||
          artCenter.teachingMethods?.length >
            0) && (

          <PublicSection
            title="شیوه آموزش"
          >

            {artCenter.courseLevels?.length >
              0 && (

              <PublicChipGroup
                title="سطح دوره‌ها"
                items={
                  artCenter.courseLevels
                }
              />

            )}


            {artCenter.teachingMethods
              ?.length > 0 && (

              <PublicChipGroup
                title="شیوه برگزاری کلاس‌ها"
                items={
                  artCenter.teachingMethods
                }
              />

            )}

          </PublicSection>

        )}


        {/* =========================================
            دوره‌های هنری
        ========================================= */}

        <PublicSection
          title="دوره‌ها و کلاس‌های هنری"
        >

          {loadingServices ? (

            <EmptyBox
              text="در حال دریافت دوره‌ها..."
            />

          ) : publicCourses.length === 0 ? (

            <EmptyBox
              text="در حال حاضر دوره‌ای برای نمایش وجود ندارد."
            />

          ) : (

            <div
              className="
                grid
                grid-cols-2
                gap-3
                sm:grid-cols-3
                lg:grid-cols-4
              "
            >

              {publicCourses.map(
                (service) => (

                  <PublicServiceCard
                    key={service.id}
                    service={service}
                    centerName={
                      artCenter.centerName
                    }
                    navigate={navigate}
                  />

                )
              )}

            </div>

          )}

        </PublicSection>


        {/* =========================================
            رویدادها و خدمات
        ========================================= */}

        <PublicSection
          title="رویدادها و خدمات هنری"
        >

          {loadingServices ? (

            <EmptyBox
              text="در حال دریافت خدمات..."
            />

          ) : publicEvents.length === 0 ? (

            <EmptyBox
              text="در حال حاضر رویداد یا خدمتی برای نمایش وجود ندارد."
            />

          ) : (

            <div
              className="
                grid
                grid-cols-2
                gap-3
                sm:grid-cols-3
                lg:grid-cols-4
              "
            >

              {publicEvents.map(
                (service) => (

                  <PublicServiceCard
                    key={service.id}
                    service={service}
                    centerName={
                      artCenter.centerName
                    }
                    navigate={navigate}
                  />

                )
              )}

            </div>

          )}

        </PublicSection>


        {/* =========================================
            محصولات
        ========================================= */}

        <PublicSection
          title="محصولات مجموعه هنری"
        >

          {loadingProducts ? (

            <EmptyBox
              text="در حال دریافت محصولات..."
            />

          ) : publishedProducts.length ===
            0 ? (

            <EmptyBox
              text="در حال حاضر محصولی برای نمایش وجود ندارد."
            />

          ) : (

            <div
              className="
                grid
                grid-cols-2
                gap-3
                sm:grid-cols-3
                lg:grid-cols-4
              "
            >

              {publishedProducts.map(
                (product) => (

                  <ProductCard
                    key={product.id}
                    product={product}
                    source="vendor-shop"
                  />

                )
              )}

            </div>

          )}

        </PublicSection>


        {/* =========================================
            امکانات
        ========================================= */}

        {artCenter.facilities?.length >
          0 && (

          <PublicChipSection
            title="امکانات و تجهیزات مجموعه"
            items={
              artCenter.facilities
            }
          />

        )}


        {/* =========================================
            خدمات ویژه
        ========================================= */}

        <PublicSection
          title="خدمات و ویژگی‌های مجموعه"
        >

          <div
            className="
              grid
              gap-3
              sm:grid-cols-2
            "
          >

            <PublicFeature
              title="کلاس آنلاین"
              enabled={
                artCenter.hasOnlineClasses
              }
              description={
                artCenter.onlineDescription
              }
            />

            <PublicFeature
              title="نمایشگاه آثار هنرجویان"
              enabled={
                artCenter.hasExhibition
              }
              description={
                artCenter.exhibitionDescription
              }
            />

            <PublicFeature
              title="گواهی پایان دوره"
              enabled={
                artCenter.hasCertificate
              }
              description={
                artCenter.certificateDescription
              }
            />

            <PublicFeature
              title="تأمین ابزار و مواد هنری"
              enabled={
                artCenter.providesArtMaterials
              }
              description={
                artCenter.artMaterialsDescription
              }
            />

            <PublicFeature
              title="سرویس رفت‌وآمد"
              enabled={
                artCenter.hasTransportation
              }
              description={
                artCenter.transportationDescription
              }
            />

          </div>

        </PublicSection>


        {/* =========================================
            مربیان
        ========================================= */}

        {artCenter.staffMembers?.length >
          0 && (

          <PublicSection
            title="مربیان و کادر هنری"
            icon={
              <UserRound size={19} />
            }
          >

            {artCenter.teacherExperience && (

              <p
                className="
                  mb-4
                  text-sm
                  text-gray-500
                "
              >
                میانگین سابقه مربیان:{" "}
                <span
                  className="
                    font-black
                    text-[#7a5526]
                  "
                >
                  {
                    artCenter.teacherExperience
                  }
                </span>
              </p>

            )}


            <div
              className="
                grid
                grid-cols-2
                gap-3
                sm:grid-cols-3
                lg:grid-cols-4
              "
            >

              {artCenter.staffMembers.map(
                (member, index) => (

                  <div
                    key={index}
                    className="
                      rounded-2xl
                      border
                      border-yellow-100
                      bg-[#faf7ef]
                      p-4
                      text-center
                    "
                  >

                    <div
                      className="
                        mx-auto
                        flex
                        h-20
                        w-20
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
                            "مربی"
                          }
                          className="
                            h-full
                            w-full
                            object-cover
                          "
                        />

                      ) : (

                        <UserRound
                          size={32}
                          className="
                            text-yellow-700
                          "
                        />

                      )}

                    </div>


                    <p
                      className="
                        mt-3
                        font-black
                        text-[#5f3e16]
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
                          text-[#b88724]
                        "
                      >
                        {member.position}
                      </p>

                    )}


                    {member.specialty && (

                      <p
                        className="
                          mt-2
                          text-xs
                          text-gray-500
                        "
                      >
                        تخصص:{" "}
                        {member.specialty}
                      </p>

                    )}


                    {member.education && (

                      <p
                        className="
                          mt-1
                          text-xs
                          text-gray-500
                        "
                      >
                        تحصیلات:{" "}
                        {member.education}
                      </p>

                    )}


                    {member.experience && (

                      <p
                        className="
                          mt-1
                          text-xs
                          text-gray-500
                        "
                      >
                        سابقه:{" "}
                        {member.experience}
                      </p>

                    )}

                  </div>

                )
              )}

            </div>

          </PublicSection>

        )}


        {/* =========================================
            ساعات فعالیت
        ========================================= */}

        {artCenter.workingSchedule?.length >
          0 && (

          <PublicSection
            title="روزها و ساعات فعالیت"
            icon={
              <Clock3 size={19} />
            }
          >

            <div
              className="
                space-y-2
              "
            >

              {artCenter.workingSchedule.map(
                (schedule, index) => (

                  <div
                    key={index}
                    className="
                      flex
                      flex-col
                      gap-2
                      rounded-2xl
                      bg-[#faf7ef]
                      px-4
                      py-3
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >

                    <p
                      className="
                        text-sm
                        font-bold
                        text-gray-600
                      "
                    >
                      {schedule.days?.join(
                        "، "
                      )}
                    </p>


                    <p
                      className="
                        text-sm
                        font-black
                        text-[#7a5526]
                      "
                    >
                      {schedule.openingTime}
                      {" تا "}
                      {schedule.closingTime}
                    </p>

                  </div>

                )
              )}

            </div>

          </PublicSection>

        )}


        {/* =========================================
            تماس
        ========================================= */}

        <PublicSection
          title="اطلاعات تماس و آدرس"
          icon={
            <MapPin size={19} />
          }
        >

          <div
            className="
              grid
              gap-3
              sm:grid-cols-2
            "
          >

            {artCenter.phone && (

              <PublicContactBox
                title="شماره تماس"
                value={
                  artCenter.phone
                }
              />

            )}


            {artCenter.email && (

              <PublicContactBox
                title="ایمیل"
                value={
                  artCenter.email
                }
              />

            )}


            {artCenter.city && (

              <PublicContactBox
                title="شهر"
                value={
                  artCenter.city
                }
              />

            )}


            {artCenter.district && (

              <PublicContactBox
                title="منطقه"
                value={
                  artCenter.district
                }
              />

            )}


            {artCenter.address && (

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
                    font-bold
                    leading-7
                    text-gray-700
                  "
                >
                  {artCenter.address}
                </p>

              </div>

            )}

          </div>

        </PublicSection>


      </div>

    </main>

  );
}


// =========================================================
// اجزای نمایش عمومی
// =========================================================

function PublicSection({
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
          mb-4
          flex
          items-center
          gap-2
          text-[#6f4a18]
        "
      >

        {icon}

        <h2
          className="
            font-black
          "
        >
          {title}
        </h2>

      </div>

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
        bg-[#faf7ef]
        p-3
        text-center
      "
    >

      <p
        className="
          text-[11px]
          text-gray-400
        "
      >
        {title}
      </p>

      <p
        className="
          mt-1
          text-sm
          font-black
          text-[#7a5526]
        "
      >
        {value}
      </p>

    </div>

  );
}


function PublicChipSection({
  title,
  items,
}) {

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
          (item) => (

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
                text-[#7a5526]
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
  items,
}) {

  return (

    <div
      className="
        mb-5
        last:mb-0
      "
    >

      <p
        className="
          mb-3
          text-sm
          font-black
          text-gray-700
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
          (item) => (

            <span
              key={item}
              className="
                rounded-full
                bg-[#faf7ef]
                px-4
                py-2
                text-xs
                font-bold
                text-[#7a5526]
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
            text-[11px]
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
            : "ندارد"}
        </span>

      </div>


      {enabled &&
        description && (

        <p
          className="
            mt-3
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
          break-words
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


function PublicServiceCard({
  service,
  centerName,
  navigate,
}) {

  const images =
    Array.isArray(service.images)
      ? service.images
      : [];


  const mainImage =
    images[
      Number(
        service.mainImageIndex || 0
      )
    ] ||
    images[0] ||
    "";


  const imageUrl =
    typeof mainImage === "string"
      ? mainImage
      : mainImage?.url || "";


  return (

    <button
      type="button"
      onClick={() => {

        if (
          service.scheduleMode ===
            "PACKAGE" ||
          service.package
        ) {

          navigate(
            `/classes/${service.id}`
          );

        } else {

          navigate(
            `/events/${service.id}`
          );

        }

      }}
      className="
        overflow-hidden
        rounded-2xl
        border
        border-yellow-100
        bg-white
        text-right
        shadow-sm
        transition
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >

      <div
        className="
          flex
          h-36
          items-center
          justify-center
          overflow-hidden
          bg-yellow-50
          sm:h-40
        "
      >

        {imageUrl ? (

          <img
            src={imageUrl}
            alt={
              service.title ||
              "خدمت هنری"
            }
            className="
              h-full
              w-full
              object-cover
            "
          />

        ) : (

          <Palette
            size={40}
            className="
              text-yellow-300
            "
          />

        )}

      </div>


      <div className="p-3">

        <p
          className="
            line-clamp-2
            text-sm
            font-black
            text-[#5f3e16]
          "
        >
          {service.title}
        </p>


        <p
          className="
            mt-1
            line-clamp-1
            text-[10px]
            font-bold
            text-[#b88724]
          "
        >
          {centerName ||
            "مجموعه هنری"}
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
              text-[11px]
              text-gray-400
            "
          >
            ظرفیت:{" "}
            {service.capacity ||
              "—"}
          </span>


          <span
            className="
              text-[11px]
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

      </div>

    </button>

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
          transition

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

          <div
            className="
              mt-4
            "
          >

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