import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { ShoppingBag, Gift } from "lucide-react";
import logo from "../assets/logo-genino.png";
import { useCart } from "../context/CartContext.jsx";
import PromoSlider from "@components/Social/PromoSlider.jsx";
import shopHeader from "../assets/shop/shop-header.webp";
import { shopCategories } from "../data/shopCategories";
import { shopGroups } from "../data/shopGroups";
import {
  getActiveDiscount,
  formatPrice,
} from "../utils/productDiscount";
import DiscountCountdown from "../components/Core/DiscountCountdown";
import ProductCard from "../components/Product/ProductCard";


export default function Shop() {
  const [flyingItems, setFlyingItems] = useState([]);
  const [isBouncing, setIsBouncing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [servicePage, setServicePage] = useState(1);
  const [category, setCategory] = useState("همه");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sortType, setSortType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [advancedFilters, setAdvancedFilters] = useState([
  {
    field:"",
    value:""
  },
  {
    field:"",
    value:""
  },
  {
    field:"",
    value:""
  }
]);
  const [appliedAdvancedFilters, setAppliedAdvancedFilters] = useState([]);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const {cartCount,giftCartCount} = useCart();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";
  const selectedGroup = searchParams.get("group") || "";
  const selectedProductItem = searchParams.get("item") || "";
  const selectedDiscount = searchParams.get("discount") || "";
  const selectedService = searchParams.get("service") || "";

// 🏫 فیلترهای مدرسه
const selectedSchoolLevel = searchParams.get("schoolLevel") || "";
const selectedSchoolType = searchParams.get("schoolType") || "";

// 👶 فیلترهای مهدکودک
const selectedKindergartenAge =
  searchParams.get("kindergartenAge") || "";

const selectedKindergartenType =
  searchParams.get("kindergartenType") || "";

const selectedKindergartenActivity =
  searchParams.get("kindergartenActivity") || "";

const selectedKindergartenFacility =
  searchParams.get("kindergartenFacility") || "";

// 📚 فیلترهای کلاس‌های آموزشی
const selectedEducationField =
  searchParams.get("educationField") || "";

// 🎨 فیلترهای کلاس‌های هنری
const selectedArtField =
  searchParams.get("artField") || "";

// 🏃 فیلترهای کلاس‌های ورزشی
const selectedSportField =
  searchParams.get("sportField") || "";

// 👨‍🏫 فیلترهای معلمان خصوصی
const selectedTeacherField =
  searchParams.get("teacherField") || "";


// 🎮 فیلترهای خانه بازی

const selectedPlayhouseAge =
  searchParams.get("playhouseAge") || "";

const selectedPlayhouseGame =
  searchParams.get("playhouseGame") || "";

const selectedPlayhouseFacility =
  searchParams.get("playhouseFacility") || "";


const shopView = searchParams.get("view") || "";

const isProductCompareMode =
  shopView === "compare-products";

const isServiceCompareMode =
  shopView === "compare-services";

  useEffect(() => {
  setCurrentPage(1);
}, [
  selectedCategory,
  selectedGroup,
  selectedProductItem,
  selectedDiscount,
]);

useEffect(() => {
  setServicePage(1);
}, [
  selectedService,
  selectedSchoolLevel,
  selectedSchoolType,
  selectedKindergartenAge,
  selectedKindergartenType,
  selectedKindergartenActivity,
  selectedKindergartenFacility,
  selectedEducationField,
  selectedArtField,
  selectedSportField,
  selectedTeacherField,
]);



  const [products, setProducts] = useState([]);

  // ⚖️ کالاهای انتخاب‌شده برای مقایسه
const [compareProducts, setCompareProducts] = useState([]);

const MAX_COMPARE_PRODUCTS = 4;

const toggleCompareProduct = (product) => {
  if (!product?.id) return;

  setCompareProducts((prev) => {
    const alreadySelected = prev.some(
      (item) => item.id === product.id
    );

    // اگر قبلاً انتخاب شده، حذفش کن
    if (alreadySelected) {
      return prev.filter(
        (item) => item.id !== product.id
      );
    }

    // حداکثر ۴ کالا
    if (prev.length >= MAX_COMPARE_PRODUCTS) {
      return prev;
    }

    // اضافه کردن کالا
    return [...prev, product];
  });
};

// ⚖️ خدمات انتخاب‌شده برای مقایسه
const [compareServices, setCompareServices] = useState([]);

const MAX_COMPARE_SERVICES = 4;

const toggleCompareService = (service) => {
  if (!service?.id) return;

  setCompareServices((prev) => {
    const alreadySelected = prev.some(
      (item) =>
        item.id === service.id &&
        item.serviceType === service.serviceType
    );

    // اگر قبلاً انتخاب شده، حذفش کن
    if (alreadySelected) {
      return prev.filter(
        (item) =>
          !(
            item.id === service.id &&
            item.serviceType === service.serviceType
          )
      );
    }

    // حداکثر ۴ خدمت
    if (prev.length >= MAX_COMPARE_SERVICES) {
      return prev;
    }

    // اضافه کردن خدمت
    return [...prev, service];
  });
};


  const [schools, setSchools] = useState([]);
  const [loadingSchools, setLoadingSchools] =
  useState(true);
  const [
  kindergartens,
  setKindergartens,
] = useState([]);

const [
  loadingKindergartens,
  setLoadingKindergartens,
] = useState(true);

const [
  playhouses,
  setPlayhouses,
] = useState([]);

const [
  loadingPlayhouses,
  setLoadingPlayhouses,
] = useState(true);

const [
  educationCenters,
  setEducationCenters,
] = useState([]);

const [
  loadingEducationCenters,
  setLoadingEducationCenters,
] = useState(true);

const [
  artClasses,
  setArtClasses,
] = useState([]);

const [
  loadingArtClasses,
  setLoadingArtClasses,
] = useState(true);

const [
  sportClasses,
  setSportClasses,
] = useState([]);

const [
  loadingSportClasses,
  setLoadingSportClasses,
] = useState(true);

const [
  privateTeachers,
  setPrivateTeachers,
] = useState([]);

const [
  loadingPrivateTeachers,
  setLoadingPrivateTeachers,
] = useState(true);
  

  const itemsPerPage = 12;
  const cartRef = useRef(null);
  const goodsMenuRef = useRef(null);
  const servicesMenuRef = useRef(null);


  

  // ✈️ افکت پرواز آیتم
  function handleFlyAnimation(e) {
    const rect = e.target.getBoundingClientRect();
    const cartRect = cartRef.current.getBoundingClientRect();

    const newItem = {
      id: Date.now(),
      startX: rect.left + rect.width / 2,
      startY: rect.top + rect.height / 2,
      endX: cartRect.left + cartRect.width / 2,
      endY: cartRect.top + cartRect.height / 2,
    };

    setFlyingItems((prev) => [...prev, newItem]);

    setTimeout(() => {
      setFlyingItems((prev) => prev.filter((item) => item.id !== newItem.id));
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 600);
    }, 1000);
  }

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      goodsMenuRef.current &&
      !goodsMenuRef.current.contains(event.target)
    ) {
      if (selectedType === "کالا") {
        setSelectedType("");
      }
    }

    if (
      servicesMenuRef.current &&
      !servicesMenuRef.current.contains(event.target)
    ) {
      if (selectedType === "خدمات") {
        setSelectedType("");
      }
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [selectedType]);

useEffect(() => {
  async function loadProducts() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/vendor-products/public`
      );

      const data = await res.json();

      if (!data.ok) return;

      console.log(
  "FIRST PRODUCT:",
  data.products?.[0]
);

console.log(
  "FIRST PRODUCT VENDOR:",
  data.products?.[0]?.vendor
);

      const fixedProducts = (data.products || []).map((product) => ({
  ...product,

  categoryLinks:
    typeof product.categoryLinks === "string"
      ? JSON.parse(product.categoryLinks)
      : Array.isArray(product.categoryLinks)
      ? product.categoryLinks
      : [],

  images:
    typeof product.images === "string"
      ? JSON.parse(product.images)
      : Array.isArray(product.images)
      ? product.images
      : [],
}));

setProducts(fixedProducts);
    } catch (err) {
      console.error(err);
    }
  }

  loadProducts();
}, []);


useEffect(() => {
  let alive = true;

  async function loadSchools() {
    try {
      setLoadingSchools(true);

      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/vendor-school/public/list`
      );

      const data = await res.json();

      if (!alive) return;

      if (!res.ok || !data?.ok) {
        setSchools([]);
        return;
      }

      setSchools(
        Array.isArray(data.schools)
          ? data.schools
          : []
      );
    } catch (error) {
      console.error(
        "LOAD PUBLIC SCHOOLS ERROR:",
        error
      );

      if (alive) {
        setSchools([]);
      }
    } finally {
      if (alive) {
        setLoadingSchools(false);
      }
    }
  }

  loadSchools();

  return () => {
    alive = false;
  };
}, []);


useEffect(() => {
  let alive = true;

  async function loadKindergartens() {
    try {
      setLoadingKindergartens(true);

      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/vendor-kindergarten/public/list`
      );

      const data = await res.json();

      if (!alive) return;

      if (!res.ok || !data?.ok) {
        setKindergartens([]);
        return;
      }

      setKindergartens(
        Array.isArray(data.kindergartens)
          ? data.kindergartens
          : []
      );

    } catch (error) {

      console.error(
        "LOAD PUBLIC KINDERGARTENS ERROR:",
        error
      );

      if (alive) {
        setKindergartens([]);
      }

    } finally {

      if (alive) {
        setLoadingKindergartens(false);
      }
    }
  }

  loadKindergartens();

  return () => {
    alive = false;
  };

}, []);

useEffect(() => {
  let alive = true;

  async function loadPlayhouses() {
    try {
      setLoadingPlayhouses(true);

      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/vendor-playhouse/public/list`
      );

      const data = await res.json();

      if (!alive) return;

      if (!res.ok || !data?.ok) {
        setPlayhouses([]);
        return;
      }

      setPlayhouses(
        Array.isArray(data.playhouses)
          ? data.playhouses
          : []
      );

    } catch (error) {

      console.error(
        "LOAD PUBLIC PLAYHOUSES ERROR:",
        error
      );

      if (alive) {
        setPlayhouses([]);
      }

    } finally {

      if (alive) {
        setLoadingPlayhouses(false);
      }
    }
  }

  loadPlayhouses();

  return () => {
    alive = false;
  };

}, []);

useEffect(() => {
  let alive = true;

  async function loadEducationCenters() {
    try {
      setLoadingEducationCenters(true);

      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/vendor-education-class/public/list`
      );

      const data = await res.json();

      if (!alive) return;

      if (!res.ok || !data?.ok) {
        setEducationCenters([]);
        return;
      }

      setEducationCenters(
        Array.isArray(data.educationClasses)
          ? data.educationClasses
          : []
      );

    } catch (error) {

      console.error(
        "LOAD PUBLIC EDUCATION CENTERS ERROR:",
        error
      );

      if (alive) {
        setEducationCenters([]);
      }

    } finally {

      if (alive) {
        setLoadingEducationCenters(false);
      }
    }
  }

  loadEducationCenters();

  return () => {
    alive = false;
  };

}, []);


useEffect(() => {
  let alive = true;

  async function loadArtClasses() {
    try {
      setLoadingArtClasses(true);

      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/vendor-art-class/public/list`
      );

      const data = await res.json();

      if (!alive) return;

      if (!res.ok || !data?.ok) {
        setArtClasses([]);
        return;
      }

      setArtClasses(
        Array.isArray(data.artClasses)
          ? data.artClasses
          : []
      );

    } catch (error) {

      console.error(
        "LOAD PUBLIC ART CLASSES ERROR:",
        error
      );

      if (alive) {
        setArtClasses([]);
      }

    } finally {

      if (alive) {
        setLoadingArtClasses(false);
      }
    }
  }

  loadArtClasses();

  return () => {
    alive = false;
  };

}, []);

useEffect(() => {
  let alive = true;

  async function loadSportClasses() {
    try {
      setLoadingSportClasses(true);

      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/vendor-sport-class/public/list`
      );

      const data = await res.json();

      if (!alive) return;

      if (!res.ok || !data?.ok) {
        setSportClasses([]);
        return;
      }

      setSportClasses(
        Array.isArray(data.sportClasses)
          ? data.sportClasses
          : []
      );

    } catch (error) {

      console.error(
        "LOAD PUBLIC SPORT CLASSES ERROR:",
        error
      );

      if (alive) {
        setSportClasses([]);
      }

    } finally {

      if (alive) {
        setLoadingSportClasses(false);
      }
    }
  }

  loadSportClasses();

  return () => {
    alive = false;
  };

}, []);


useEffect(() => {
  let alive = true;

  async function loadPrivateTeachers() {
    try {
      setLoadingPrivateTeachers(true);

      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/vendor-private-teacher/public/list`
      );

      const data = await res.json();

      if (!alive) return;

      if (!res.ok || !data?.ok) {
        setPrivateTeachers([]);
        return;
      }

      setPrivateTeachers(
        Array.isArray(data.privateTeachers)
          ? data.privateTeachers
          : []
      );
    } catch (error) {
      console.error(
        "LOAD PUBLIC PRIVATE TEACHERS ERROR:",
        error
      );

      if (alive) {
        setPrivateTeachers([]);
      }
    } finally {
      if (alive) {
        setLoadingPrivateTeachers(false);
      }
    }
  }

  loadPrivateTeachers();

  return () => {
    alive = false;
  };
}, []);



function formatInputPrice(value){
  if(!value) return ""; 
  return Number(
    value.replace(/,/g,"")
  ).toLocaleString("en-US");
}
function cleanPrice(value){
  return Number(
    value.replace(/,/g,"")
  );
}


const advancedFilterFields = [
  {
    label:"شهر",
    key:"city"
  },
  {
    label:"برند فارسی",
    key:"brandFa"
  },
  {
    label:"برند انگلیسی",
    key:"brandEn"
  },
  {
    label:"کشور سازنده",
    key:"madeInCountry"
  },
  {
    label:"جنسیت",
    key:"gender"
  },
  {
    label:"فصل",
    key:"seasons"
  },
  {
    label:"بازه سنی",
    key:"ageRanges"
  }
];




function getAdvancedFilterOptions(field){
  if(!field) return [];
  const values = products.flatMap(product=>{
    let value;
    switch(field){
      case "city":
        value = product.vendor?.city;
        break;
      case "brandFa":
        value = product.brandFa;
        break;
      case "brandEn":
        value = product.brandEn;
        break;
      case "madeInCountry":
        value = product.madeInCountry;
        break;
      case "gender":
        value = product.gender;
        break;
      case "seasons":
        value = product.seasons;
        break;
      case "ageRanges":
        value = product.ageRanges;
        break;
      default:
        value = null;
    }
    if(Array.isArray(value)){
      return value;
    }
    return value ? [value] : [];
  });
  return [
    ...new Set(
      values.filter(Boolean)
    )
  ];
}


// 🧭 تیتر هوشمند کالاهای ژنینو
const getProductsTitle = () => {
  const parts = ["کالاهای ژنینو"];

  // دسته اصلی
  if (selectedCategory) {
    parts.push(selectedCategory);
  }

  // پیدا کردن key دسته اصلی
  const currentCategory = shopCategories.find(
    (cat) =>
      cat.title === selectedCategory ||
      cat.key === selectedCategory
  );

  // پیدا کردن مجموعه گروه‌های مربوط به این دسته
  const currentGroupCollection = shopGroups.find(
    (item) =>
      item.categoryKey === currentCategory?.key
  );

  // پیدا کردن گروه انتخاب‌شده
  const currentGroup = currentGroupCollection?.groups?.find(
    (group) =>
      group.key === selectedGroup ||
      group.title === selectedGroup
  );

  // عنوان فارسی گروه
  if (selectedGroup) {
    parts.push(
      currentGroup?.title || selectedGroup
    );
  }

  // زیرگروه / آیتم نهایی
  if (selectedProductItem) {
    parts.push(selectedProductItem);
  }

  // تخفیف
  if (selectedDiscount === "active") {
    parts.push("تخفیف‌دار");
  }

  return parts.join(" - ");
};

const productsTitle = getProductsTitle();


// 🧭 تشخیص نوع نمایش فروشگاه
const hasProductFilter =
  shopView === "products" ||
  shopView === "compare-products" ||
  Boolean(selectedCategory) ||
  Boolean(selectedGroup) ||
  Boolean(selectedProductItem) ||
  selectedDiscount === "active";

const hasServiceFilter =
  shopView === "services" ||
  shopView === "compare-services" ||
  Boolean(selectedService);

// 🎯 آیا کاربر وارد یک نمای فیلترشده شده؟
const isFilteredView =
  hasProductFilter ||
  hasServiceFilter;

  // 🧩 فیلتر واقعی محصولات براساس اطلاعات ثبت‌شده توسط فروشنده
const filteredProducts = products.filter((product) => {
  const categoryLinks = Array.isArray(product.categoryLinks)
    ? product.categoryLinks
    : [];

  const normalizedSearch = searchQuery.trim().toLowerCase();

  const matchSearch =
    normalizedSearch === "" ||
    String(product.title || "")
      .toLowerCase()
      .includes(normalizedSearch) ||
    String(product.brandFa || "")
      .toLowerCase()
      .includes(normalizedSearch) ||
    String(product.brandEn || "")
      .toLowerCase()
      .includes(normalizedSearch) ||
    categoryLinks.some((link) =>
      String(link.productItem || "")
        .toLowerCase()
        .includes(normalizedSearch)
    );

  const matchCategory =
    !selectedCategory ||
    categoryLinks.some(
      (link) => link.category === selectedCategory
    );

  const matchGroup =
    !selectedGroup ||
    categoryLinks.some(
      (link) =>
        link.category === selectedCategory &&
        link.group === selectedGroup
    );

  const matchProductItem =
    !selectedProductItem ||
    categoryLinks.some(
      (link) =>
        link.category === selectedCategory &&
        link.group === selectedGroup &&
        link.productItem === selectedProductItem
    );

  const matchDiscount =
  selectedDiscount !== "active" ||
  Boolean(getActiveDiscount(product));

  const discount = getActiveDiscount(product);
  const finalPrice =
    discount?.finalPrice ?? product.price;
  const matchPrice =
  (!minPrice || finalPrice >= cleanPrice(minPrice)) &&
  (!maxPrice || finalPrice <= cleanPrice(maxPrice));

  const matchAdvancedFilters =
  appliedAdvancedFilters.every((filter)=>{
    if(!filter.field || !filter.value)
      return true;
    let productValue;
    switch(filter.field){
      case "city":
        productValue = product.vendor?.city;
        break;
      case "brandFa":
        productValue = product.brandFa;
        break;
      case "brandEn":
        productValue = product.brandEn;
        break;
      case "madeInCountry":
        productValue = product.madeInCountry;
        break;
      case "gender":
        productValue = product.gender;
        break;
      case "seasons":
        productValue = product.seasons;
        break;
      case "ageRanges":
        productValue = product.ageRanges;
        break;
      default:
        productValue = null;
    }
    if(Array.isArray(productValue)){
      return productValue.includes(filter.value);
    }
    return productValue === filter.value;
});

  return (
  matchSearch &&
  matchCategory &&
  matchGroup &&
  matchProductItem &&
  matchDiscount &&
  matchPrice &&
  matchAdvancedFilters
);
});

const sortedProducts = [...filteredProducts].sort((a, b) => {

  // 🕒 حالت پیش‌فرض:
  // آخرین محصول ساخته‌شده یا ویرایش‌شده بالاتر نمایش داده شود
  if (!sortType) {
    const dateA = new Date(
      a.updatedAt || a.createdAt || 0
    ).getTime();

    const dateB = new Date(
      b.updatedAt || b.createdAt || 0
    ).getTime();

    return dateB - dateA;
  }

  const discountA = getActiveDiscount(a);
  const discountB = getActiveDiscount(b);

  const priceA =
    discountA?.finalPrice ?? a.price;

  const priceB =
    discountB?.finalPrice ?? b.price;

  if (sortType === "cheap") {
    return priceA - priceB;
  }

  if (sortType === "expensive") {
    return priceB - priceA;
  }

  return 0;
});

  // 📄 صفحه‌بندی
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const serviceCategories = [
  {
    title: "مدارس",
    image: "/images/shop/services/schools.webp",
    route: "/shop/services/schools",
  },
  {
    title: "مهدکودک‌ها",
    image: "/images/shop/services/kindergartens.webp",
    route: "/shop/services/kindergartens",
  },
  {
    title: "خانه‌های بازی",
    image: "/images/shop/services/playhouses.webp",
    route: "/shop/services/playhouses",
  },
  {
    title: "کلاس‌های آموزشی",
    image: "/images/shop/services/education-classes.webp",
    route: "/shop/services/education-classes",
  },
  {
    title: "کلاس‌های هنری",
    image: "/images/shop/services/art-classes.webp",
    route: "/shop/services/art-classes",
  },
  {
    title: "کلاس‌های ورزشی",
    image: "/images/shop/services/sport-classes.webp",
    route: "/shop/services/sport-classes",
  },
  {
    title: "معلمان خصوصی",
    image: "/images/shop/services/private-teachers.webp",
    route: "/shop/services/private-teachers",
  },
  {
    title: "نمایش همه خدمات",
    image: "/images/shop/services/all-services.webp",
  },
];

  const categoryImageMap = {
  sismooni: "sismooni",
  kids: "kids",
  fashion: "fashion",
  bedBath: "bed-bath",
  watchJewelry: "watch-jewelry",
  sport: "sport",
  medical: "medical",
  beauty: "beauty",
  perfume: "perfume",
  handmade: "handmade",
};

const goodsCategories = [
  ...shopCategories.map((cat) => ({
    title: cat.title,
    key: cat.key,
    image: `/images/shop/categories/${categoryImageMap[cat.key]}.webp`,
    route: `/shop/${categoryImageMap[cat.key]}`,
  })),
  {
    title: "نمایش همه کالاها",
    key: "all-products",
    image: "/images/shop/categories/all-products.webp",
  },
];

const combinedServices = [

  ...schools.map((school) => ({
    ...school,

    serviceType: "مدرسه",

    displayName:
      school.schoolName,

    route:
      `/vendor/service/school/${school.vendorId}`,
  })),

  ...kindergartens.map((kindergarten) => ({
    ...kindergarten,

    serviceType: "مهدکودک",

    displayName:
      kindergarten.kindergartenName,

    route:
      `/vendor/service/kindergarten/${kindergarten.vendorId}?view=public`,
  })),

  ...playhouses.map((playhouse) => ({
    ...playhouse,

    serviceType: "خانه بازی",

    displayName:
      playhouse.playhouseName,

    route:
      `/vendor/service/playhouse/${playhouse.vendorId}?view=public`,
  })),

  ...educationCenters.map((center) => ({
  ...center,

  serviceType: "مرکز آموزشی",

  displayName:
    center.educationClassName ||
    center.centerName ||
    center.businessName ||
    "مرکز آموزشی ژنینو",

  route:
    `/vendor/service/education-class/${center.vendorId}?view=public`,
})),


...artClasses.map((artClass) => ({
  ...artClass,

  serviceType: "کلاس هنری",

  displayName:
    artClass.centerName ||
    artClass.businessName ||
    "کلاس هنری ژنینو",

  route:
    `/vendor/service/art-class/${artClass.vendorId}?view=public`,
})),


...sportClasses.map((sportClass) => ({
  ...sportClass,

  serviceType: "کلاس ورزشی",

  displayName:
    sportClass.centerName ||
    sportClass.businessName ||
    "کلاس ورزشی ژنینو",

  route:
    `/vendor/service/sport-class/${sportClass.vendorId}?view=public`,
})),

...privateTeachers.map((privateTeacher) => ({
  ...privateTeacher,

  serviceType: "معلم خصوصی",

  displayName:
    privateTeacher.teacherName ||
    privateTeacher.businessName ||
    "معلم خصوصی ژنینو",

  route:
    `/vendor/service/private-teacher/${privateTeacher.vendorId}?view=public`,
})),

].sort((a, b) => {

  // 🕒 آخرین خدمت ساخته‌شده یا ویرایش‌شده بالاتر نمایش داده شود
  const dateA = new Date(
    a.updatedAt || a.createdAt || 0
  ).getTime();

  const dateB = new Date(
    b.updatedAt || b.createdAt || 0
  ).getTime();

  return dateB - dateA;
});

const normalizeFaText = (value = "") =>
  String(value)
    .replace(/\u200c/g, "")   // حذف نیم‌فاصله
    .replace(/\s+/g, "")      // حذف فاصله‌ها
    .replace(/ي/g, "ی")       // ی عربی → ی فارسی
    .replace(/ك/g, "ک")       // ک عربی → ک فارسی
    .trim();

    // 🧭 تیتر هوشمند خدمات ژنینو
const getServicesTitle = () => {
  const parts = ["خدمات ژنینو"];

  // 🏫 مدارس
  if (selectedService === "school") {
    parts.push("مدارس");

    if (selectedSchoolLevel) {
      parts.push("مقطع تحصیلی");
      parts.push(selectedSchoolLevel);
    }

    if (selectedSchoolType) {
      parts.push("نوع مدرسه");
      parts.push(selectedSchoolType);
    }
  }

  // 👨‍🏫 معلمان خصوصی
  if (selectedService === "private-teacher") {
    parts.push("معلمان خصوصی");

    if (selectedTeacherField) {
      parts.push(selectedTeacherField);
    }
  }

  return parts.join(" - ");
};

const servicesTitle = getServicesTitle();

const filteredServices = combinedServices.filter((service) => {

  // =====================================================
  // 🏫 مدارس
  // =====================================================

  if (selectedService === "school") {

    if (service.serviceType !== "مدرسه") {
      return false;
    }

    // 🎓 مقطع تحصیلی
    if (selectedSchoolLevel) {
      const educationLevels =
        Array.isArray(service.educationLevels)
          ? service.educationLevels
          : [];

      const normalizedSelectedLevel =
        normalizeFaText(selectedSchoolLevel);

      const hasLevel = educationLevels.some(
        (level) =>
          normalizeFaText(level) ===
          normalizedSelectedLevel
      );

      if (!hasLevel) {
        return false;
      }
    }

    // 🏫 نوع مدرسه
    if (selectedSchoolType) {
      if (
        normalizeFaText(service.schoolType) !==
        normalizeFaText(selectedSchoolType)
      ) {
        return false;
      }
    }

    return true;
  }


  // =====================================================
  // 👶 مهدکودک‌ها
  // =====================================================

  if (selectedService === "kindergarten") {

    // فقط مهدکودک‌ها
    if (service.serviceType !== "مهدکودک") {
      return false;
    }

    // 👶 رده سنی
    if (selectedKindergartenAge) {
      const acceptedAges =
        Array.isArray(service.acceptedAges)
          ? service.acceptedAges
          : [];

      const hasAge = acceptedAges.some(
        (age) =>
          normalizeFaText(age) ===
          normalizeFaText(selectedKindergartenAge)
      );

      if (!hasAge) {
        return false;
      }
    }


    // 🎨 فعالیت‌های مهدکودک
if (selectedKindergartenActivity) {
  const facilities =
    service.facilities &&
    typeof service.facilities === "object"
      ? service.facilities
      : {};

  const activitySectionKeys = [
    "languages",
    "arts",
    "sports",
    "development",
  ];

  const normalizedSelectedActivity =
    normalizeFaText(selectedKindergartenActivity);

  const hasActivity =
    activitySectionKeys.some((sectionKey) => {
      const section = facilities[sectionKey];

      const items =
        Array.isArray(section?.items)
          ? section.items
          : [];

      return items.some(
        (item) =>
          normalizeFaText(item) ===
          normalizedSelectedActivity
      );
    });

  if (!hasActivity) {
    return false;
  }
}


    // 🏫 امکانات
    if (selectedKindergartenFacility) {

      // 🚌 سرویس رفت‌وآمد
      if (
        selectedKindergartenFacility ===
        "سرویس رفت‌وآمد"
      ) {
        if (!service.hasTransportation) {
          return false;
        }
      }

      // 🍽 وعده غذایی
      else if (
        selectedKindergartenFacility ===
        "وعده غذایی"
      ) {
        if (!service.hasMealProgram) {
          return false;
        }
      }

      // سایر امکانات
      else {
        const facilities =
          service.facilities &&
          typeof service.facilities === "object"
            ? service.facilities
            : {};

        const hasFacility =
          Object.entries(facilities).some(
            ([key, value]) =>
              Boolean(value) &&
              normalizeFaText(key) ===
                normalizeFaText(
                  selectedKindergartenFacility
                )
          );

        if (!hasFacility) {
          return false;
        }
      }
    }


    // ⚠️ نوع مهد را فعلاً اینجا فیلتر نمی‌کنیم
    // چون هنوز فیلد مشخصی برای آن در دیتای عمومی نداریم.

    return true;
  }


    // =====================================================
  // 🎮 خانه‌های بازی
  // =====================================================

  if (selectedService === "playhouse") {

    // فقط خانه‌های بازی
    if (service.serviceType !== "خانه بازی") {
      return false;
    }


    // 👶 رده سنی
    if (selectedPlayhouseAge) {

      const acceptedAges =
        Array.isArray(service.acceptedAges)
          ? service.acceptedAges
          : [];

      const normalizedSelectedAge =
        normalizeFaText(selectedPlayhouseAge);

      const hasAge = acceptedAges.some(
        (age) =>
          normalizeFaText(age) ===
          normalizedSelectedAge
      );

      if (!hasAge) {
        return false;
      }
    }


    // 🎮 نوع بازی
    if (selectedPlayhouseGame) {

      const educationalPrograms =
        Array.isArray(service.educationalPrograms)
          ? service.educationalPrograms
          : [];

      const normalizedSelectedGame =
        normalizeFaText(selectedPlayhouseGame);

      const hasGame =
        educationalPrograms.some(
          (game) =>
            normalizeFaText(game) ===
            normalizedSelectedGame
        );

      if (!hasGame) {
        return false;
      }
    }


    // 🏠 امکانات خانه بازی
    if (selectedPlayhouseFacility) {

      const facilities =
        Array.isArray(service.facilities)
          ? service.facilities
          : [];

      const normalizedSelectedFacility =
        normalizeFaText(selectedPlayhouseFacility);

      const hasFacility =
        facilities.some(
          (facility) =>
            normalizeFaText(facility) ===
            normalizedSelectedFacility
        );

      if (!hasFacility) {
        return false;
      }
    }


    return true;
  }


    // =====================================================
  // 📚 کلاس‌های آموزشی
  // =====================================================

  if (selectedService === "education-class") {

    // فقط مراکز آموزشی
    if (service.serviceType !== "مرکز آموزشی") {
      return false;
    }

    // 📚 حوزه آموزشی
    if (selectedEducationField) {

      const educationFields =
        Array.isArray(service.educationFields)
          ? service.educationFields
          : [];

      const normalizedSelectedField =
        normalizeFaText(selectedEducationField);

      const hasEducationField =
        educationFields.some(
          (field) =>
            normalizeFaText(field) ===
            normalizedSelectedField
        );

      if (!hasEducationField) {
        return false;
      }
    }

    return true;
  }

    // =====================================================
  // 🎨 کلاس‌های هنری
  // =====================================================

  if (selectedService === "art-class") {

    // فقط کلاس‌های هنری
    if (service.serviceType !== "کلاس هنری") {
      return false;
    }

    // 🎨 رشته / حوزه هنری
    if (selectedArtField) {

      const artFields =
        Array.isArray(service.artFields)
          ? service.artFields
          : [];

      const normalizedSelectedField =
        normalizeFaText(selectedArtField);

      const hasArtField =
        artFields.some(
          (field) =>
            normalizeFaText(field) ===
            normalizedSelectedField
        );

      if (!hasArtField) {
        return false;
      }
    }

       return true;
  }


  // =====================================================
  // 🏃 کلاس‌های ورزشی
  // =====================================================

  if (selectedService === "sport-class") {

    // فقط کلاس‌های ورزشی
    if (service.serviceType !== "کلاس ورزشی") {
      return false;
    }

    // 🏃 رشته / حوزه ورزشی
    if (selectedSportField) {

      const sportFields =
        Array.isArray(service.sportFields)
          ? service.sportFields
          : [];

      const normalizedSelectedField =
        normalizeFaText(selectedSportField);

      const hasSportField =
        sportFields.some(
          (field) =>
            normalizeFaText(field) ===
            normalizedSelectedField
        );

      if (!hasSportField) {
        return false;
      }
    }

    return true;
  }


  // =====================================================
// 👨‍🏫 معلمان خصوصی
// =====================================================

if (selectedService === "private-teacher") {

  // فقط معلمان خصوصی
  if (service.serviceType !== "معلم خصوصی") {
    return false;
  }

  // 📚 درس / حوزه تدریس
  if (selectedTeacherField) {

    const teachingFields =
      Array.isArray(service.teachingFields)
        ? service.teachingFields
        : [];

    const normalizedSelectedField =
      normalizeFaText(selectedTeacherField);

    const hasTeachingField =
      teachingFields.some(
        (field) =>
          normalizeFaText(field) ===
          normalizedSelectedField
      );

    if (!hasTeachingField) {
      return false;
    }
  }

  return true;
}


  // =====================================================
  // بدون فیلتر خدمات
  // =====================================================

  return true;
});

// 📄 صفحه‌بندی خدمات
const servicesPerPage = 12;

const totalServicePages = Math.ceil(
  filteredServices.length / servicesPerPage
);

const serviceStartIndex =
  (servicePage - 1) * servicesPerPage;

const currentServices = filteredServices.slice(
  serviceStartIndex,
  serviceStartIndex + servicesPerPage
);







  return (
  <main className="relative min-h-screen overflow-hidden bg-[#faf7ef] text-gray-800 px-3 sm:px-5 lg:px-8 py-5 pb-20 sm:pb-7">
    {/* بک‌گراند نرم و لوکس */}
    <div className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute -top-28 -right-24 h-72 w-72 rounded-full bg-yellow-200/35 blur-3xl" />
      <div className="absolute top-52 -left-28 h-80 w-80 rounded-full bg-amber-100/60 blur-3xl" />
      <div className="absolute bottom-20 right-1/4 h-64 w-64 rounded-full bg-white/70 blur-3xl" />
    </div>

    {/* ✈️ آیکون‌های پرواز */}
    {flyingItems.map((item) => (
      <motion.div
        key={item.id}
        initial={{
          x: item.startX,
          y: item.startY,
          scale: 1,
          opacity: 1,
          position: "fixed",
        }}
        animate={{
          x: item.endX,
          y: item.endY,
          scale: 0.3,
          opacity: 0,
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="pointer-events-none z-50 text-yellow-500"
      >
        <ShoppingBag className="h-7 w-7" />
      </motion.div>
    ))}

    {/* نوار حرفه‌ای سبد خرید */}
<motion.button
  ref={cartRef}
  onClick={() => navigate("/cart")}
  animate={
    isBouncing
      ? { scale: [1, 1.04, 0.98, 1], rotate: [0, -2, 2, 0] }
      : {}
  }
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="
    fixed bottom-0 left-0 right-0 z-50
    flex h-14 w-full items-center justify-between
    bg-gradient-to-r from-[#7a5526] via-[#b88724] to-[#d4af37]
    px-4 text-white shadow-[0_-8px_28px_rgba(120,85,38,0.28)]
    transition-all

    sm:bottom-auto sm:left-6 sm:right-auto sm:top-24
    sm:h-24 sm:w-20 sm:flex-col sm:justify-center sm:gap-2
    sm:rounded-3xl sm:px-0
    sm:shadow-[0_0_25px_rgba(212,175,55,0.45)]
    sm:hover:scale-105
  "
>
  <div className="flex items-center gap-2 sm:flex-col sm:gap-1">
    <ShoppingBag className="h-5 w-5 text-white drop-shadow-sm sm:h-8 sm:w-8" />

    <span className="text-xs font-extrabold sm:hidden">
      سبد خرید ژنینو
    </span>
  </div>

  <div className="flex items-center gap-2 sm:flex-col sm:gap-1">
    <span className="hidden text-[10px] font-bold text-white/90 sm:block">
      سبد خرید
    </span>

    <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-red-500 px-2 text-xs font-black text-white shadow-md">
      {cartCount + giftCartCount}
    </span>

    <span className="text-[11px] font-bold text-white/90 sm:hidden">
      کالا
    </span>
  </div>
</motion.button>

    <section dir="rtl" className="relative z-10 mx-auto max-w-7xl">
      
      {/* هدر مینیمال فروشگاه */}
<header className="mb-5 max-w-3xl mx-auto overflow-visible rounded-[2rem] bg-gradient-to-br from-[#4b2f17] via-[#7a5526] to-[#b88724] p-3 shadow-[0_18px_55px_rgba(75,47,23,0.22)] sm:p-4">
  {/* جای عکس بالای هدر */}
  <div className="mb-3 overflow-hidden rounded-[1.5rem] border border-yellow-200/30">
    <img
  src={shopHeader}
  alt="فروشگاه ژنینو"
  className="
  h-32
  sm:h-44
  lg:h-48
  w-full
  object-cover
"
/>
  </div>

  {/* نوار سرچ */}
  <div className="relative mb-3">
    <input
      type="text"
      placeholder="جستجوی محصول یا خدمت..."
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
      }}
      className="h-9 w-full rounded-2xl border border-yellow-200/30 bg-white/95 px-3 pr-9 text-right text-[11px] text-gray-700 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-yellow-300 focus:ring-4 focus:ring-yellow-100 sm:h-10 sm:text-xs"
    />
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-yellow-700">
      🔍
    </span>
  </div>

  {/* دکمه‌ها */}
  <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
    <button
      onClick={() => {
      setCategory("همه");
      setSelectedType("");
      setCurrentPage(1);
      setSearchParams({});
    }}
      className="h-8 rounded-xl bg-white/90 px-1 text-[10px] font-bold text-[#7a5526] shadow-sm transition hover:bg-yellow-50 sm:text-xs"
    >
      نمایش همه
    </button>

    <div
  ref={goodsMenuRef}
  className="relative"
>
      <button
        onClick={() => setSelectedType(selectedType === "کالا" ? "" : "کالا")}
        className="h-8 w-full rounded-xl bg-white/90 px-1 text-[10px] font-bold text-[#7a5526] shadow-sm transition hover:bg-yellow-50 sm:text-xs"
      >
        کالاها
      </button>

      {selectedType === "کالا" && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="
  absolute top-full z-50 mt-2
  right-0 w-[38vw] max-w-[180px]

  max-h-[50vh]
  overflow-x-hidden
  overflow-y-auto
  overscroll-contain

  rounded-2xl
  border border-yellow-100
  bg-[#fff8e8]
  shadow-2xl

  sm:w-56
  md:w-64

  [scrollbar-width:thin]
"
        >
          {goodsCategories.map((cat) => (
  <button
    key={cat.title}
    onClick={() => {
      if (cat.route) {
  navigate(cat.route);
  return;
}

if (cat.title === "نمایش همه کالاها") {
  setCategory("همه");
  setSearchParams({
    view: "products",
  });
} else {
  setCategory(cat.title);
}

      setSelectedType("");
      setCurrentPage(1);
    }}
    className="
      flex h-14 w-full items-center justify-start
      border-b-2 border-[#d6b86d]
      px-3 text-right text-[11px] font-bold text-gray-700
      transition hover:bg-[#f3e3bd] hover:text-[#7a5526]
      last:border-b-0
    "
  >
    <div className="ml-3 h-8 w-8 shrink-0 overflow-hidden rounded-md border border-[#c9a44a] bg-white">
      <img
        src={cat.image}
        alt={cat.title}
        className="h-full w-full object-cover"
      />
    </div>

    <span className="line-clamp-2 text-right leading-4">
      {cat.title}
    </span>
  </button>
))}
        </motion.div>
      )}
    </div>

    <div
  ref={servicesMenuRef}
  className="relative"
>
      <button
        onClick={() => setSelectedType(selectedType === "خدمات" ? "" : "خدمات")}
        className="h-8 w-full rounded-xl bg-white/90 px-1 text-[10px] font-bold text-[#7a5526] shadow-sm transition hover:bg-yellow-50 sm:text-xs"
      >
        خدمات
      </button>

      {selectedType === "خدمات" && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="
  absolute top-full z-50 mt-2
  right-0 w-[38vw] max-w-[180px]

  max-h-[50vh]
  overflow-x-hidden
  overflow-y-auto
  overscroll-contain

  rounded-2xl
  border border-yellow-100
  bg-[#fff8e8]
  shadow-2xl

  sm:w-56
  md:w-64

  [scrollbar-width:thin]
"
        >
          {serviceCategories.map((cat) => (
  <button
    key={cat.title}
    onClick={() => {
  if (cat.route) {
    navigate(cat.route);
    return;
  }

  if (cat.title === "نمایش همه خدمات") {
    setCategory("همه");

    setSearchParams({
      view: "services",
    });

    setSelectedType("");
    setServicePage(1);
    return;
  }

  setCategory(cat.title);
  setSelectedType("");
  setCurrentPage(1);
}}
    className="
      flex h-14 w-full items-center justify-start
      border-b-2 border-[#d6b86d]
      px-3 text-right text-[11px] font-bold text-gray-700
      transition hover:bg-[#f3e3bd] hover:text-[#7a5526]
      last:border-b-0
    "
  >
    <div className="ml-3 h-8 w-8 shrink-0 overflow-hidden rounded-md border border-[#c9a44a] bg-white">
      <img
        src={cat.image}
        alt={cat.title}
        className="h-full w-full object-cover"
      />
    </div>

    <span className="line-clamp-2 text-right leading-4">
      {cat.title}
    </span>
  </button>
))}
        </motion.div>
      )}
    </div>

    <button
  onClick={() => navigate("/shop/compare")}
  className="h-8 rounded-xl bg-white/90 px-1 text-[9px] font-bold text-[#7a5526] shadow-sm transition hover:bg-yellow-50 sm:text-xs"
>
  مقایسه تخصصی
</button>
  </div>
</header>


{!isFilteredView && (
  <>
{/* 🖼️ اسلایدر تبلیغاتی */}
<PromoSlider
  variant="golden"
  interval={7}
  height="h-40 sm:h-44 md:h-48 lg:h-52"
  className="relative z-[40] my-6 max-w-3xl mx-auto overflow-hidden rounded-[1.75rem] border border-yellow-200/70 bg-white/70 shadow-[0_18px_45px_rgba(120,90,20,0.12)] backdrop-blur-xl"
  slides={[
    {
      id: 1,
      image: "/images/slides/shop/1.webp",
    },
    {
      id: 2,
      image: "/images/slides/shop/2.webp",
    },
    {
      id: 3,
      image: "/images/slides/shop/3.webp",
    },
    {
      id: 4,
      image: "/images/slides/shop/4.webp",
    },
    {
      id: 5,
      image: "/images/slides/shop/5.webp",
    },
    {
      id: 6,
      image: "/images/slides/shop/6.webp",
    },
    {
      id: 7,
      image: "/images/slides/shop/7.webp",
    },
    {
      id: 8,
      image: "/images/slides/shop/8.webp",
    },
  ]}
/>

{/* 🎁 دکمه هدیه‌بازی */}
<motion.button
  whileHover={{ y: -3, scale: 1.01 }}
  whileTap={{ scale: 0.98 }}
  onClick={() => navigate("/gift")}
  className="
    relative z-10 mx-auto mt-4 flex w-full max-w-3xl items-center justify-between gap-3
    overflow-hidden rounded-[1.75rem]
    border border-yellow-200/70
    bg-gradient-to-r from-[#4b2f17] via-[#8a6228] to-[#d4af37]
    px-4 py-3 text-right text-white
    shadow-[0_18px_45px_rgba(120,85,38,0.22)]
    transition
    sm:px-5 sm:py-4
  "
>
  <div className="absolute inset-0 bg-white/10" />

  <div className="relative flex items-center gap-3">
    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 shadow-inner">
      <Gift className="h-6 w-6 text-yellow-100" />
    </div>

    <div>
      <h2 className="text-sm font-black sm:text-base">
        هدیه‌بازی
      </h2>
      <p className="mt-1 text-[10px] font-medium text-white/85 sm:text-xs">
        فرصتی مناسب برای ارسال هدیه به عزیزانتان
      </p>
    </div>
  </div>

  <span className="relative rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold text-yellow-50 sm:text-xs">
    شروع کنیم
  </span>
</motion.button>
  </>
)}


{!isFilteredView && (
  <>
{/*  فیلتر گرانترین، ارزانترین */}
<div className="
relative z-10
mx-auto mt-6
flex max-w-5xl
justify-start
">
<select
value={sortType}
onChange={(e)=>{
  setSortType(e.target.value);
  setCurrentPage(1);
}}
className="
rounded-xl
border
border-yellow-200
bg-white
px-4
py-2
text-xs
font-bold
text-[#7a5526]
shadow-sm
outline-none
"
>
<option value="">
مرتب‌سازی
</option>
<option value="cheap">
ارزان‌ترین
</option>
<option value="expensive">
گران‌ترین
</option>
</select>
</div>

{/* بازه قیمت */}
<div className="
relative z-10
mx-auto mt-3
flex max-w-5xl
justify-start
gap-2
">

<input
type="text"
inputMode="numeric"
placeholder="از قیمت (ریال)"
value={minPrice}
onChange={(e)=>{
  setMinPrice(
    formatInputPrice(e.target.value)
  );
  setCurrentPage(1);
}}
className="
w-32
rounded-xl
border
border-yellow-200
bg-white
px-3
py-2
text-xs
text-right
shadow-sm
outline-none
"
/>

<input
type="text"
inputMode="numeric"
placeholder="تا قیمت (ریال)"
value={maxPrice}
onChange={(e)=>{
  setMaxPrice(
    formatInputPrice(e.target.value)
  );
  setCurrentPage(1);
}}
className="
w-32
rounded-xl
border
border-yellow-200
bg-white
px-3
py-2
text-xs
text-right
shadow-sm
outline-none
"
/>
</div>


{/* فیلتر پیشرفته */}

<div className="
relative z-10
mx-auto mt-4
max-w-5xl
rounded-2xl
bg-white
p-4
shadow-sm
border border-yellow-100
">


<button
type="button"
onClick={()=>setShowAdvancedFilter(!showAdvancedFilter)}
className="
w-full
flex
items-center
justify-between
mb-3
text-right
"
>

<h3 className="
text-xs
font-black
text-[#7a5526]
">
فیلتر پیشرفته
</h3>


<span
className="
flex
h-6
w-6
items-center
justify-center
rounded-full
bg-yellow-100
text-[#7a5526]
text-xs
font-black
"
>
{showAdvancedFilter ? "▲" : "▼"}
</span>

</button>


{
showAdvancedFilter && (
advancedFilters.map((filter,index)=>(

<div
key={index}
className="
mb-3
flex
gap-2
"
>


<select
value={filter.field}
onChange={(e)=>{

const copy=[...advancedFilters];

copy[index].field=e.target.value;
copy[index].value="";

setAdvancedFilters(copy);

}}

className="
flex-1
rounded-xl
border
border-yellow-200
px-3
py-2
text-xs
"
>

<option value="">
شرط {index+1}
</option>


{
advancedFilterFields
.filter((item)=>{
  const usedFields =
    advancedFilters
      .filter((_,i)=> i !== index)
      .map(x=>x.field)
      .filter(Boolean);
  return !usedFields.includes(item.key);
})
.map(item=>(
<option
key={item.key}
value={item.key}
>
{item.label}
</option>
))

}

</select>



<select
disabled={!filter.field}
value={filter.value}
onChange={(e)=>{

const copy=[...advancedFilters];

copy[index].value=e.target.value;

setAdvancedFilters(copy);

}}

className="
flex-1
rounded-xl
border
border-yellow-200
px-3
py-2
text-xs
"
>

<option value="">
انتخاب مقدار
</option>

{
 getAdvancedFilterOptions(filter.field)
 .map(option=>(

<option
key={option}
value={option}
>
{option}
</option>

 ))
}

</select>


</div>


)))
}


<div className="
flex
gap-2
">

<button
onClick={()=>{

 setAppliedAdvancedFilters(
   advancedFilters.filter(
     item =>
     item.field &&
     item.value
   )
 );

 setCurrentPage(1);

}}
className="
flex-1
rounded-xl
bg-gradient-to-r
from-[#7a5526]
to-[#d4af37]
py-2
text-xs
font-bold
text-white
"
>
اعمال فیلتر
</button>


<button
onClick={()=>{

 setAdvancedFilters([
  {
    field:"",
    value:""
  },
  {
    field:"",
    value:""
  },
  {
    field:"",
    value:""
  }
 ]);


 setAppliedAdvancedFilters([]);

 setCurrentPage(1);

}}
className="
flex-1
rounded-xl
bg-gray-100
py-2
text-xs
font-bold
text-[#7a5526]
border
border-yellow-200
"
>
حذف فیلتر
</button>


</div>
</div>


  </>
)}


{!hasServiceFilter && (
  <motion.div
  key={`products-${searchParams.toString()}`}
  initial={{ opacity: 0, y: 18 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
>

<div
  className="
    relative
    z-10
    mx-auto
    mt-8
    max-w-5xl
  "
>
  <h2
  className="
    mb-4
    text-base
    font-black
    text-[#6f4a18]
    sm:text-lg
  "
>
  {isProductCompareMode
  ? `انتخاب کالا برای مقایسه${
      selectedCategory
        ? ` - ${selectedCategory}`
        : ""
    }`
  : productsTitle}
</h2>
{isProductCompareMode && (
  <p className="mb-4 text-[11px] leading-6 text-gray-500 sm:text-xs">
    کالاهایی را که می‌خواهید با یکدیگر مقایسه کنید انتخاب کنید.
  </p>
)}
</div>

      {/* 🟡 کارت‌های محصول */}
<motion.section
  className="
  relative z-10 mt-8 mx-auto grid max-w-5xl
  grid-cols-2 gap-3
  sm:grid-cols-3 sm:gap-4
  lg:grid-cols-4 lg:gap-6
"
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  }}
>
  {currentProducts.map((item) => {
  const isSelectedForCompare =
    compareProducts.some(
      (product) => product.id === item.id
    );

  return (
    <ProductCard
      key={item.id}
      product={item}
      compareMode={isProductCompareMode}
      isSelectedForCompare={isSelectedForCompare}
      onToggleCompare={toggleCompareProduct}
    />
  );
})}
</motion.section>

{/* 📄 صفحه‌بندی */}
<div className="relative z-10 mt-9 flex items-center justify-center gap-2">
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((p) => p - 1)}
    className={`h-9 rounded-full px-4 text-xs font-bold transition ${
      currentPage === 1
        ? "cursor-not-allowed bg-white/50 text-gray-300"
        : "bg-white text-yellow-700 shadow-sm hover:bg-yellow-50"
    }`}
  >
    قبلی
  </button>

  <span className="rounded-full bg-white/70 px-4 py-2 text-[11px] font-medium text-gray-500 shadow-sm">
    صفحه {currentPage} از {totalPages}
  </span>

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage((p) => p + 1)}
    className={`h-9 rounded-full px-4 text-xs font-bold transition ${
      currentPage === totalPages
        ? "cursor-not-allowed bg-white/50 text-gray-300"
        : "bg-white text-yellow-700 shadow-sm hover:bg-yellow-50"
    }`}
  >
    بعدی
  </button>
</div>

  </motion.div>
)}

{/* =========================================
    خدمات ژنینو: مدارس + مهدکودک‌ها
========================================= */}

{!hasProductFilter && (
<motion.section
  key={`services-${searchParams.toString()}`}
  dir="rtl"
  initial={{ opacity: 0, y: 18 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
  className="
    relative
    z-10
    mx-auto
    mt-8
    max-w-5xl
  "
>

  {loadingSchools ||
loadingKindergartens ||
loadingPlayhouses ||
loadingEducationCenters ||
loadingArtClasses ||
loadingSportClasses ||
loadingPrivateTeachers ? (

    <div
      className="
        rounded-2xl
        bg-white
        p-5
        text-center
        text-sm
        font-bold
        text-gray-400
        shadow-sm
      "
    >
      در حال دریافت خدمات ژنینو...
    </div>

  ) : (
    schools.length > 0 ||
kindergartens.length > 0 ||
playhouses.length > 0 ||
educationCenters.length > 0 ||
artClasses.length > 0 ||
sportClasses.length > 0 ||
privateTeachers.length > 0
  ) ? (

    <>

      <h2
  className="
    mb-4
    text-base
    font-black
    text-[#6f4a18]
    sm:text-lg
  "
>
  {isServiceCompareMode
  ? selectedService === "school"
    ? "انتخاب مدارس برای مقایسه"
    : selectedService === "kindergarten"
    ? "انتخاب مهدکودک‌ها برای مقایسه"
    : selectedService === "playhouse"
    ? "انتخاب خانه‌های بازی برای مقایسه"
    : selectedService === "education-class"
    ? "انتخاب کلاس‌های آموزشی برای مقایسه"
    : selectedService === "art-class"
    ? "انتخاب کلاس‌های هنری برای مقایسه"
    : selectedService === "sport-class"
    ? "انتخاب کلاس‌های ورزشی برای مقایسه"
    : selectedService === "private-teacher"
    ? "انتخاب معلمان خصوصی برای مقایسه"
    : "انتخاب خدمات برای مقایسه"
  : servicesTitle}
</h2>

{isServiceCompareMode && (
  <p className="mb-4 text-[11px] leading-6 text-gray-500 sm:text-xs">
    {selectedService === "school"
      ? "مدارسی را که می‌خواهید با یکدیگر مقایسه کنید انتخاب کنید."
      : selectedService === "kindergarten"
      ? "مهدکودک‌هایی را که می‌خواهید با یکدیگر مقایسه کنید انتخاب کنید."
      : selectedService === "playhouse"
      ? "خانه‌های بازی را که می‌خواهید با یکدیگر مقایسه کنید انتخاب کنید."
      : selectedService === "education-class"
      ? "کلاس‌های آموزشی را که می‌خواهید با یکدیگر مقایسه کنید انتخاب کنید."
      : selectedService === "art-class"
      ? "کلاس‌های هنری را که می‌خواهید با یکدیگر مقایسه کنید انتخاب کنید."
      : selectedService === "sport-class"
      ? "کلاس‌های ورزشی را که می‌خواهید با یکدیگر مقایسه کنید انتخاب کنید."
      : selectedService === "private-teacher"
      ? "معلمان خصوصی را که می‌خواهید با یکدیگر مقایسه کنید انتخاب کنید."
      : "خدماتی را که می‌خواهید با یکدیگر مقایسه کنید انتخاب کنید."}
  </p>
)}


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

       {currentServices.map((service) => {
  const isSelectedForCompare =
    compareServices.some(
      (item) =>
        item.id === service.id &&
        item.serviceType === service.serviceType
    );

  return (
    <SchoolShopCard
      key={`${service.serviceType}-${service.id}`}

      school={{
        ...service,
        schoolName: service.displayName,
      }}

      serviceType={service.serviceType}

      compareMode={isServiceCompareMode}

      isSelectedForCompare={
        isSelectedForCompare
      }

      onToggleCompare={() =>
        toggleCompareService(service)
      }

      onOpen={() =>
        navigate(service.route)
      }
    />
  );
})}

            </div>

      {/* 📄 صفحه‌بندی خدمات */}
      {totalServicePages > 1 && (
        <div className="relative z-10 mt-9 flex items-center justify-center gap-2">

          <button
            disabled={servicePage === 1}
            onClick={() =>
              setServicePage((p) =>
                Math.max(1, p - 1)
              )
            }
            className={`h-9 rounded-full px-4 text-xs font-bold transition ${
              servicePage === 1
                ? "cursor-not-allowed bg-white/50 text-gray-300"
                : "bg-white text-yellow-700 shadow-sm hover:bg-yellow-50"
            }`}
          >
            قبلی
          </button>

          <span
            className="
              rounded-full
              bg-white/70
              px-4
              py-2
              text-[11px]
              font-medium
              text-gray-500
              shadow-sm
            "
          >
            صفحه {servicePage} از {totalServicePages}
          </span>

          <button
            disabled={
              servicePage === totalServicePages
            }
            onClick={() =>
              setServicePage((p) =>
                Math.min(
                  totalServicePages,
                  p + 1
                )
              )
            }
            className={`h-9 rounded-full px-4 text-xs font-bold transition ${
              servicePage === totalServicePages
                ? "cursor-not-allowed bg-white/50 text-gray-300"
                : "bg-white text-yellow-700 shadow-sm hover:bg-yellow-50"
            }`}
          >
            بعدی
          </button>

        </div>
      )}

    </>

  ) : null}

</motion.section>

)}

     </section>

     {/* ⚖️ نوار شناور مقایسه کالاها */}
{isProductCompareMode && compareProducts.length > 0 && (
  <motion.div
    dir="rtl"
    initial={{ opacity: 0, y: 80 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 80 }}
    transition={{
      duration: 0.35,
      ease: "easeOut",
    }}
    className="
  fixed
  bottom-16
  left-3
  right-3
  z-[70]
  mx-auto
  w-auto
  max-w-3xl
  rounded-[1.5rem]
  border
  border-yellow-300/70
  bg-white/95
  p-3
  shadow-[0_18px_55px_rgba(75,47,23,0.25)]
  backdrop-blur-xl

  sm:bottom-5
  sm:left-5
  sm:right-5
  sm:p-4
"
  >
    {/* عنوان و شمارنده */}
    <div className="mb-3 flex items-center justify-between gap-3">
      <div>
        <h3 className="text-xs font-black text-[#4b2f17] sm:text-sm">
          مقایسه کالاها
        </h3>

        <p className="mt-1 text-[10px] text-gray-500 sm:text-[11px]">
          {compareProducts.length} از {MAX_COMPARE_PRODUCTS} کالا انتخاب شده
        </p>
      </div>

      <button
        type="button"
        onClick={() => setCompareProducts([])}
        className="
          rounded-full
          bg-[#faf7ef]
          px-3
          py-1.5
          text-[10px]
          font-bold
          text-[#7a5526]
          transition
          hover:bg-yellow-100
        "
      >
        حذف همه
      </button>
    </div>

    <div
  className="
    flex
    flex-row
    items-center
    gap-1.5
    sm:gap-2
  "
>

      {/* جایگاه کالاها */}
      <div className="grid flex-1 grid-cols-4 gap-1.5 sm:gap-2">

        {Array.from({
          length: MAX_COMPARE_PRODUCTS,
        }).map((_, index) => {

          const product = compareProducts[index];

          if (!product) {
            return (
              <div
                key={`empty-${index}`}
                className="
                  flex
                  h-14
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-dashed
                  border-yellow-200
                  bg-[#faf7ef]
                  text-[9px]
                  font-bold
                  text-gray-400

                  sm:h-16
                  sm:text-[10px]
                "
              >
                + کالا
              </div>
            );
          }

          const image =
            Array.isArray(product.images) &&
            product.images.length > 0
              ? typeof product.images[0] === "string"
                ? product.images[0]
                : product.images[0]?.url
              : "";

          return (
            <div
              key={product.id}
              className="
                relative
                flex
                h-14
                items-center
                gap-1.5
                overflow-hidden
                rounded-xl
                border
                border-yellow-200
                bg-[#faf7ef]
                p-1.5

                sm:h-16
              "
            >
              {/* حذف همین کالا */}
              <button
                type="button"
                onClick={() =>
                  toggleCompareProduct(product)
                }
                className="
                  absolute
                  left-1
                  top-1
                  z-10
                  flex
                  h-4
                  w-4
                  items-center
                  justify-center
                  rounded-full
                  bg-[#4b2f17]
                  text-[9px]
                  font-black
                  text-white
                  shadow
                "
              >
                ×
              </button>

              {image ? (
                <img
                  src={image}
                  alt={product.title || "کالا"}
                  className="
                    h-10
                    w-10
                    shrink-0
                    rounded-lg
                    object-cover

                    sm:h-12
                    sm:w-12
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-white
                    text-lg

                    sm:h-12
                    sm:w-12
                  "
                >
                  🛍️
                </div>
              )}

              <span
                className="
                  hidden
                  min-w-0
                  flex-1
                  truncate
                  pl-4
                  text-[9px]
                  font-bold
                  text-[#4b2f17]

                  sm:block
                  sm:text-[10px]
                "
              >
                {product.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* دکمه مقایسه */}
      <button
  type="button"
  disabled={compareProducts.length < 2}
  onClick={() => {
    if (compareProducts.length < 2) return;

    const ids = compareProducts
      .map((product) => product.id)
      .join(",");

    navigate(
      `/shop/compare/products/result?ids=${encodeURIComponent(ids)}`
    );
  }}
  className={`
          h-14
w-[68px]
shrink-0
rounded-xl
px-2
text-[10px]
font-black
transition

sm:h-16
sm:w-auto
sm:min-w-[90px]
sm:px-5
sm:text-xs

          ${
            compareProducts.length >= 2
              ? `
                bg-gradient-to-r
                from-[#7a5526]
                via-[#b88724]
                to-[#d4af37]
                text-white
                shadow-md
                hover:scale-[1.02]
              `
              : `
                cursor-not-allowed
                bg-gray-100
                text-gray-400
              `
          }
        `}
      >
        مقایسه
      </button>

    </div>
  </motion.div>
)}


{/* ⚖️ نوار شناور مقایسه خدمات */}
{isServiceCompareMode && compareServices.length > 0 && (
  <motion.div
    dir="rtl"
    initial={{ opacity: 0, y: 80 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 80 }}
    transition={{
      duration: 0.35,
      ease: "easeOut",
    }}
    className="
      fixed
      bottom-16
      left-3
      right-3
      z-[70]
      mx-auto
      w-auto
      max-w-3xl
      rounded-[1.5rem]
      border
      border-yellow-300/70
      bg-white/95
      p-3
      shadow-[0_18px_55px_rgba(75,47,23,0.25)]
      backdrop-blur-xl

      sm:bottom-5
      sm:left-5
      sm:right-5
      sm:p-4
    "
  >
    {/* عنوان و شمارنده */}
    <div className="mb-3 flex items-center justify-between gap-3">
      <div>
        <h3 className="text-xs font-black text-[#4b2f17] sm:text-sm">
  {selectedService === "school"
    ? "مقایسه مدارس"
    : selectedService === "kindergarten"
    ? "مقایسه مهدکودک‌ها"
    : selectedService === "playhouse"
    ? "مقایسه خانه‌های بازی"
    : selectedService === "education-class"
    ? "مقایسه کلاس‌های آموزشی"
    : selectedService === "art-class"
    ? "مقایسه کلاس‌های هنری"
    : selectedService === "sport-class"
    ? "مقایسه کلاس‌های ورزشی"
    : selectedService === "private-teacher"
    ? "مقایسه معلمان خصوصی"
    : "مقایسه خدمات"}
</h3>

<p className="mt-1 text-[10px] text-gray-500 sm:text-[11px]">
  {compareServices.length} از {MAX_COMPARE_SERVICES}{" "}
  {selectedService === "school"
    ? "مدرسه"
    : selectedService === "kindergarten"
    ? "مهدکودک"
    : selectedService === "playhouse"
    ? "خانه بازی"
    : selectedService === "education-class"
    ? "کلاس آموزشی"
    : selectedService === "art-class"
    ? "کلاس هنری"
    : selectedService === "sport-class"
    ? "کلاس ورزشی"
    : selectedService === "private-teacher"
    ? "معلم خصوصی"
    : "خدمت"}{" "}
  انتخاب شده
</p>
      </div>

      <button
        type="button"
        onClick={() => setCompareServices([])}
        className="
          rounded-full
          bg-[#faf7ef]
          px-3
          py-1.5
          text-[10px]
          font-bold
          text-[#7a5526]
          transition
          hover:bg-yellow-100
        "
      >
        حذف همه
      </button>
    </div>

    <div
      className="
        flex
        flex-row
        items-center
        gap-1.5
        sm:gap-2
      "
    >
      {/* جایگاه مدارس */}
      <div className="grid flex-1 grid-cols-4 gap-1.5 sm:gap-2">
        {Array.from({
          length: MAX_COMPARE_SERVICES,
        }).map((_, index) => {
          const service = compareServices[index];

          if (!service) {
            return (
              <div
                key={`empty-service-${index}`}
                className="
                  flex
                  h-14
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-dashed
                  border-yellow-200
                  bg-[#faf7ef]
                  text-[9px]
                  font-bold
                  text-gray-400

                  sm:h-16
                  sm:text-[10px]
                "
              >
                {selectedService === "school"
  ? "+ مدرسه"
  : selectedService === "kindergarten"
  ? "+ مهدکودک"
  : selectedService === "playhouse"
  ? "+ خانه بازی"
  : selectedService === "education-class"
  ? "+ کلاس آموزشی"
  : selectedService === "art-class"
  ? "+ کلاس هنری"
  : selectedService === "sport-class"
  ? "+ کلاس ورزشی"
  : selectedService === "private-teacher"
  ? "+ معلم خصوصی"
  : "+ خدمت"}
              </div>
            );
          }

          const image =
            service.image ||
            (Array.isArray(service.headerImages) &&
            service.headerImages.length > 0
              ? typeof service.headerImages[0] === "string"
                ? service.headerImages[0]
                : service.headerImages[0]?.url
              : "");

          return (
            <div
              key={`${service.serviceType}-${service.id}`}
              className="
                relative
                flex
                h-14
                items-center
                gap-1.5
                overflow-hidden
                rounded-xl
                border
                border-yellow-200
                bg-[#faf7ef]
                p-1.5

                sm:h-16
              "
            >
              <button
                type="button"
                onClick={() =>
                  toggleCompareService(service)
                }
                className="
                  absolute
                  left-1
                  top-1
                  z-10
                  flex
                  h-4
                  w-4
                  items-center
                  justify-center
                  rounded-full
                  bg-[#4b2f17]
                  text-[9px]
                  font-black
                  text-white
                  shadow
                "
              >
                ×
              </button>

              {image ? (
  <img
    src={image}
    alt={service.displayName || "خدمت ژنینو"}
    className="
      h-10
      w-10
      shrink-0
      rounded-lg
      object-cover

      sm:h-12
      sm:w-12
    "
  />
) : (
  <div
    className="
      flex
      h-10
      w-10
      shrink-0
      items-center
      justify-center
      rounded-lg
      bg-white
      text-lg

      sm:h-12
      sm:w-12
    "
  >
    {selectedService === "school"
      ? "🏫"
      : selectedService === "kindergarten"
      ? "👶"
      : selectedService === "playhouse"
      ? "🎮"
      : selectedService === "education-class"
      ? "📚"
      : selectedService === "art-class"
      ? "🎨"
      : selectedService === "sport-class"
      ? "🏃"
      : selectedService === "private-teacher"
      ? "👨‍🏫"
      : "✨"}
  </div>
)}

              <span
                className="
                  hidden
                  min-w-0
                  flex-1
                  truncate
                  pl-4
                  text-[9px]
                  font-bold
                  text-[#4b2f17]

                  sm:block
                  sm:text-[10px]
                "
              >
                {service.displayName}
              </span>
            </div>
          );
        })}
      </div>

      {/* دکمه مقایسه */}
      <button
        type="button"
        disabled={compareServices.length < 2}
        onClick={() => {
  if (compareServices.length < 2) return;

  const ids = compareServices
    .map((service) => service.vendorId)
    .filter(Boolean)
    .join(",");

  const resultRouteMap = {
    school: "schools",
    kindergarten: "kindergartens",
    playhouse: "playhouses",
    "education-class": "education-classes",
    "art-class": "art-classes",
    "sport-class": "sport-classes",
    "private-teacher": "private-teachers",
  };

  const resultRoute = resultRouteMap[selectedService];

  if (!resultRoute) return;

  navigate(
    `/shop/compare/services/${resultRoute}/result?ids=${encodeURIComponent(
      ids
    )}`
  );
}}
        className={`
          h-14
          w-[68px]
          shrink-0
          rounded-xl
          px-2
          text-[10px]
          font-black
          transition

          sm:h-16
          sm:w-auto
          sm:min-w-[90px]
          sm:px-5
          sm:text-xs

          ${
            compareServices.length >= 2
              ? `
                  bg-gradient-to-r
                  from-[#7a5526]
                  via-[#b88724]
                  to-[#d4af37]
                  text-white
                  shadow-md
                  hover:scale-[1.02]
                `
              : `
                  cursor-not-allowed
                  bg-gray-100
                  text-gray-400
                `
          }
        `}
      >
        مقایسه
      </button>
    </div>
  </motion.div>
)}

    </main>
  );
}


function SchoolShopCard({
  school,
  serviceType,
  onOpen,
  compareMode = false,
  isSelectedForCompare = false,
  onToggleCompare = null,
}) {
  const cardImage =
  school.image ||
  (Array.isArray(school.headerImages) &&
  school.headerImages.length > 0
    ? typeof school.headerImages[0] === "string"
      ? school.headerImages[0]
      : school.headerImages[0]?.url
    : "");
  return (
    <motion.article
  whileHover={{ y: -4 }}
  onClick={() => {
    if (compareMode) {
      onToggleCompare?.();
      return;
    }

    onOpen();
  }}
  className="
    group
    h-full
    flex
    flex-col
    cursor-pointer
    overflow-hidden
    rounded-[1.4rem]
    border
    border-yellow-100
    bg-white
    shadow-[0_8px_25px_rgba(120,90,20,0.08)]
    transition
    hover:shadow-[0_15px_35px_rgba(120,90,20,0.15)]
  "
>

      {/* تصویر */}
      <div
        className="
        relative
        h-28
        overflow-hidden
        bg-[#faf7ef]
        "
      >

        {cardImage ? (
          <img
            src={cardImage}
            alt={school.schoolName}
            className="
            h-full
            w-full
            object-cover
            transition
            duration-500
            group-hover:scale-105
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
            🏫
          </div>
        )}


        {/* برچسب خدمات */}
        <span
          className="
          absolute
          right-2
          top-2
          rounded-full
          bg-white/90
          px-2
          py-1
          text-[9px]
          font-black
          text-[#7a5526]
          shadow-sm
          "
        >
         {serviceType || "خدمت ژنینو"}
        </span>

      </div>



      {/* اطلاعات */}
      <div
  className="
    flex
    flex-1
    flex-col
    p-3
  "
>

        <h3
          className="
          truncate
          text-sm
          font-black
          text-[#4b2f17]
          "
        >
          {school.schoolName}
        </h3>


        <div
          className="
          mt-2
          flex
          flex-wrap
          gap-1
          "
        >

          <span
            className="
            rounded-full
            bg-[#faf7ef]
            px-2
            py-1
            text-[10px]
            font-bold
            text-gray-500
            "
          >
            {school.gender || "نامشخص"}
          </span>


          <span
            className="
            rounded-full
            bg-[#faf7ef]
            px-2
            py-1
            text-[10px]
            font-bold
            text-gray-500
            "
          >
            {school.city || "نامشخص"}
          </span>


          {school.district && (
            <span
              className="
              rounded-full
              bg-[#faf7ef]
              px-2
              py-1
              text-[10px]
              font-bold
              text-gray-500
              "
            >
              منطقه {school.district}
            </span>
          )}

        </div>



        <button
  onClick={(e) => {
    e.stopPropagation();

    if (compareMode) {
      onToggleCompare?.();
      return;
    }

    onOpen();
  }}
  className={`
    mt-auto
    w-full
    rounded-xl
    py-2
    text-[11px]
    font-black
    transition

    ${
      compareMode && isSelectedForCompare
        ? `
            border
            border-yellow-400
            bg-yellow-50
            text-[#7a5526]
          `
        : `
            bg-gradient-to-r
            from-[#7a5526]
            via-[#b88724]
            to-[#d4af37]
            text-white
          `
    }
  `}
>
  {compareMode
    ? isSelectedForCompare
      ? "✓ انتخاب شده"
      : "+ افزودن به مقایسه"
    : serviceType === "مهدکودک"
    ? "مشاهده مهدکودک"
    : serviceType === "خانه بازی"
    ? "مشاهده خانه بازی"
    : serviceType === "مرکز آموزشی"
    ? "مشاهده مرکز آموزشی"
    : serviceType === "کلاس هنری"
    ? "مشاهده کلاس هنری"
    : serviceType === "کلاس ورزشی"
    ? "مشاهده کلاس ورزشی"
    : serviceType === "معلم خصوصی"
    ? "مشاهده معلم خصوصی"
    : "مشاهده مدرسه"}
</button>


      </div>

    </motion.article>
  );
}