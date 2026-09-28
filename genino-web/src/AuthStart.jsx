// D:\projects\Genino\genino-web\src\AuthStart.jsx
import { motion, AnimatePresence } from "framer-motion";
import logo from "./assets/logo-genino.png";
import { Brain, Gift, ShoppingBag, Bot, ChevronLeft, ChevronRight, Scale, Scale3D, Apple, BookCheck, Baby, DollarSign, PartyPopper, Play, LetterText, FileHeart } from "lucide-react";
import Footer from "./Footer.jsx";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbXboxY } from "react-icons/tb";
import { Smile, Flower2, UsersRound, Puzzle, Sparkles, HeartHandshake, Mail, Phone, UserRound, X, Send } from "lucide-react";
import PromoSlider from "@components/Social/PromoSlider";
import ScrollProduct from "./components/Core/ScrollProduct";
import TodayCalendarBox from "./components/Dashboard/TodayCalendarBox";
import { getConversations } from "./services/api";
import shopBg from "./assets/optimized/outhstart-cards/shop-bg.webp";
import womenHealthBg from "./assets/optimized/outhstart-cards/women-health-bg.webp";
import menHealthBg from "./assets/optimized/outhstart-cards/men-health-bg.webp";
import myDoctorBg from "./assets/optimized/outhstart-cards/my-doctor-bg.webp";
import calorieTrackerBg from "./assets/optimized/outhstart-cards/calorie-tracker-bg.webp";
import magazineBg from "./assets/optimized/outhstart-cards/magazine-bg.webp";
import socialBg from "./assets/optimized/outhstart-cards/social-bg.webp";
import funBg from "./assets/optimized/outhstart-cards/fun-bg.webp";
import eventsBg from "./assets/optimized/outhstart-cards/events-bg.webp";
import singleWorldBg from "./assets/optimized/outhstart-cards/single-world-bg.webp";
import babysitterBg from "./assets/optimized/outhstart-cards/babysitter-bg.webp";
import myChildBg from "./assets/optimized/outhstart-cards/mychild-bg.webp";
import AuthFeatureCircleSlider from "./components/AuthStart/AuthFeatureCircleSlider";
import ProductCategoryCircleSlider from "./components/AuthStart/ProductCategoryCircleSlider";
import myChildIcon from "./assets/authstart-icons/mychild.png";
import shopIcon from "./assets/authstart-icons/shop.png";
import womenHealthIcon from "./assets/authstart-icons/women-health.png";
import menHealthIcon from "./assets/authstart-icons/men-health.png";
import myDoctorIcon from "./assets/authstart-icons/my-doctor.png";
import calorieIcon from "./assets/authstart-icons/calorie.png";
import magazineIcon from "./assets/authstart-icons/magazine.png";
import socialIcon from "./assets/authstart-icons/social.png";
import funIcon from "./assets/authstart-icons/fun.png";
import eventsIcon from "./assets/authstart-icons/events.png";
import singleWorldIcon from "./assets/authstart-icons/single-world.png";
import babysitterIcon from "./assets/authstart-icons/babysitter.png";
import normalizeProduct from "./utils/normalizeProduct";
import { getHomeProducts } from "./services/homeProductsService";
import EventCard from "./components/Events/EventCard";
import EducationCard from "./components/Classes/EducationCard";



export default function AuthStart() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const [socialUnreadCount, setSocialUnreadCount] = useState(0);
  const navigate = useNavigate();
  const [showChildChoiceModal, setShowChildChoiceModal] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);
  const [showLifeCompanionModal, setShowLifeCompanionModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitePhone, setInvitePhone] = useState("");
  const [inviteUsername, setInviteUsername] = useState("");
  const [isSendingLifeInvite, setIsSendingLifeInvite] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [canInstallPwa, setCanInstallPwa] = useState(false);
  const [latestShopProducts, setLatestShopProducts] = useState([]);
  const [sismooniProducts, setSismooniProducts] = useState([]);
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [featuredServices, setFeaturedServices] = useState([]);
  const [eventServices, setEventServices] = useState([]);
  const [educationServices, setEducationServices] = useState([]);
  const [featuredServicesLoading, setFeaturedServicesLoading] = useState(true);
  const [latestProductsLoading, setLatestProductsLoading] = useState(true);
  const [kindergartens, setKindergartens,] = useState([]);
  const [kindergartensLoading, setKindergartensLoading,] = useState(true);
  const [schools, setSchools,] = useState([]);
  const [schoolsLoading, setSchoolsLoading,] = useState(true);
  const [playhouses, setPlayhouses] = useState([]);
  const [playhousesLoading, setPlayhousesLoading] = useState(true);
  const [educationCenters, setEducationCenters,] = useState([]);
  const [educationCentersLoading, setEducationCentersLoading,] = useState(true);
  const [artCenters, setArtCenters] = useState([]);
  const [artCentersLoading, setArtCentersLoading] = useState(true);
  const [sportCenters, setSportCenters] = useState([]);
  const [sportCentersLoading, setSportCentersLoading] = useState(true);
  const [privateTeachers, setPrivateTeachers] = useState([]);
  const [privateTeachersLoading, setPrivateTeachersLoading] = useState(true);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:80/api";

  useEffect(() => {
  let isMounted = true;

  async function loadLatestShopProducts() {
  try {
    const data = await getHomeProducts(API_BASE_URL);

    if (isMounted) {
      setLatestShopProducts(data.latestProducts);
      setSismooniProducts(data.sismooniProducts);
      setDiscountedProducts(data.discountedProducts);
      

    const serviceRes = await fetch(
  `${API_BASE_URL}/vendor-services/public/home-list`
);

const serviceData =
  await serviceRes.json();


if(isMounted && serviceData.ok){

  const services =
    serviceData.services || [];


  setFeaturedServices(
    services
  );

const classRes = await fetch(
  `${API_BASE_URL}/vendor-services/public/home-classes`
);


const classData =
  await classRes.json();


if(
  isMounted &&
  classData.ok
){

  setEducationServices(
    classData.services || []
  );

}

  const eventRes = await fetch(
  `${API_BASE_URL}/vendor-services/public/home-events`
);


const eventData =
  await eventRes.json();


if(
  isMounted &&
  eventData.ok
){

  setEventServices(
    eventData.services || []
  );

}

}
    }

  } catch (error) {
    console.error(
      "خطا در دریافت محصولات صفحه اصلی:",
      error
    );

    if (isMounted) {
      setLatestShopProducts([]);
      setSismooniProducts([]);
      setDiscountedProducts([]);
    }

  } finally {
    if (isMounted) {
      setLatestProductsLoading(false);
    }
  }
}

  // دریافت فوری هنگام ورود به صفحه
  loadLatestShopProducts();

  // دریافت مجدد هر ۱۵ دقیقه
  const intervalId = setInterval(
    loadLatestShopProducts,
    15 * 60 * 1000
  );

  return () => {
    isMounted = false;
    clearInterval(intervalId);
  };
}, [API_BASE_URL]);

useEffect(() => {
  let isMounted = true;

  async function loadKindergartens() {
    try {
      setKindergartensLoading(true);

      const res = await fetch(
        `${API_BASE_URL}/vendor-kindergarten/public/list`
      );

      const data = await res.json();

      console.log(
  "AUTHSTART KINDERGARTENS:",
  data
);

      if (!isMounted) return;

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
        "LOAD AUTHSTART KINDERGARTENS ERROR:",
        error
      );

      if (isMounted) {
        setKindergartens([]);
      }

    } finally {

      if (isMounted) {
        setKindergartensLoading(false);
      }
    }
  }

  loadKindergartens();

  return () => {
    isMounted = false;
  };

}, [API_BASE_URL]);

useEffect(() => {
  let isMounted = true;

  async function loadPlayhouses() {
    try {

      setPlayhousesLoading(true);

      const res = await fetch(
        `${API_BASE_URL}/vendor-playhouse/public/list`
      );

      const data = await res.json();

      console.log(
        "AUTHSTART PLAYHOUSES:",
        data
      );

      if (!isMounted) return;

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
        "LOAD AUTHSTART PLAYHOUSES ERROR:",
        error
      );

      if (isMounted) {
        setPlayhouses([]);
      }

    } finally {

      if (isMounted) {
        setPlayhousesLoading(false);
      }
    }
  }

  loadPlayhouses();

  return () => {
    isMounted = false;
  };

}, [API_BASE_URL]);


useEffect(() => {
  let isMounted = true;

  async function loadEducationCenters() {
    try {
      setEducationCentersLoading(true);

      const res = await fetch(
        `${API_BASE_URL}/vendor-education-class/public/list`
      );

      const data = await res.json();

      console.log(
        "AUTHSTART EDUCATION CENTERS:",
        data
      );

      if (!isMounted) return;

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
        "LOAD AUTHSTART EDUCATION CENTERS ERROR:",
        error
      );

      if (isMounted) {
        setEducationCenters([]);
      }
    } finally {
      if (isMounted) {
        setEducationCentersLoading(false);
      }
    }
  }

  loadEducationCenters();

  return () => {
    isMounted = false;
  };
}, [API_BASE_URL]);

useEffect(() => {
  let isMounted = true;

  async function loadArtCenters() {
    try {
      setArtCentersLoading(true);

      const res = await fetch(
        `${API_BASE_URL}/vendor-art-class/public/list`
      );

      const data = await res.json();

      console.log(
        "AUTHSTART ART CENTERS:",
        data
      );

      if (!isMounted) return;

      if (!res.ok || !data?.ok) {
        setArtCenters([]);
        return;
      }

      setArtCenters(
        Array.isArray(data.artClasses)
          ? data.artClasses
          : []
      );

    } catch (error) {

      console.error(
        "LOAD AUTHSTART ART CENTERS ERROR:",
        error
      );

      if (isMounted) {
        setArtCenters([]);
      }

    } finally {

      if (isMounted) {
        setArtCentersLoading(false);
      }
    }
  }

  loadArtCenters();

  return () => {
    isMounted = false;
  };

}, [API_BASE_URL]);

useEffect(() => {
  let isMounted = true;

  async function loadSportCenters() {
    try {
      setSportCentersLoading(true);

      const res = await fetch(
        `${API_BASE_URL}/vendor-sport-class/public/list`
      );

      const data = await res.json();

      console.log(
        "AUTHSTART SPORT CENTERS:",
        data
      );

      if (!isMounted) return;

      if (!res.ok || !data?.ok) {
        setSportCenters([]);
        return;
      }

      setSportCenters(
        Array.isArray(data.sportClasses)
          ? data.sportClasses
          : []
      );

    } catch (error) {

      console.error(
        "LOAD AUTHSTART SPORT CENTERS ERROR:",
        error
      );

      if (isMounted) {
        setSportCenters([]);
      }

    } finally {

      if (isMounted) {
        setSportCentersLoading(false);
      }
    }
  }

  loadSportCenters();

  return () => {
    isMounted = false;
  };

}, [API_BASE_URL]);


useEffect(() => {
  let isMounted = true;

  async function loadPrivateTeachers() {
    try {
      setPrivateTeachersLoading(true);

      const res = await fetch(
        `${API_BASE_URL}/vendor-private-teacher/public/list`
      );

      const data = await res.json();

      console.log(
        "AUTHSTART PRIVATE TEACHERS:",
        data
      );

      if (!isMounted) return;

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
        "LOAD AUTHSTART PRIVATE TEACHERS ERROR:",
        error
      );

      if (isMounted) {
        setPrivateTeachers([]);
      }

    } finally {

      if (isMounted) {
        setPrivateTeachersLoading(false);
      }
    }
  }

  loadPrivateTeachers();

  return () => {
    isMounted = false;
  };

}, [API_BASE_URL]);



useEffect(() => {
  let isMounted = true;

  async function loadSchools() {
    try {
      setSchoolsLoading(true);

      const res = await fetch(
        `${API_BASE_URL}/vendor-school/public/list`
      );

      const data = await res.json();

      if (!isMounted) return;

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
        "LOAD AUTHSTART SCHOOLS ERROR:",
        error
      );

      if (isMounted) {
        setSchools([]);
      }

    } finally {

      if (isMounted) {
        setSchoolsLoading(false);
      }

    }
  }

  loadSchools();

  return () => {
    isMounted = false;
  };

}, [API_BASE_URL]);

  const features = [
  {
    title: "کودک من و کودکان ژنینویی",
    desc: "پیگیری رشد ذهنی، عاطفی و فیزیکی کودک با ابزارهای هوشمند ژنینو.",
    link: "/mychild",
    image: myChildBg,
    icon: myChildIcon,
  },
  {
    title: "فروشگاه تخصصی",
    desc: "دسترسی به محصولات و خدمات منتخب ویژه‌ی والدین و فرزندان.",
    link: "/shop",
    image: shopBg,
    icon: shopIcon,
  },
  {
    title: "رویدادها و جشن‌ها",
    desc: "معرفی رویدادهای آموزشی و تفریحی ویژه‌ی کودکان در شهر شما",
    link: "/events",
    image: eventsBg,
    icon: eventsIcon,
  },
  {
    title: "پرستار کودک",
    desc: "یافتن و آشنایی با پرستاران کودک ثبت‌شده در ژنینو.",
    link: "/child-nurses",
    image: babysitterBg,
    icon: babysitterIcon,
  },
  {
    title: "سلامت بانوان",
    desc: "پیگیری چرخه قاعدگی، شناخت بدن و دریافت پیشنهادهای آرام‌بخش روزانه",
    link: "/my-cycle",
    image: womenHealthBg,
    icon: womenHealthIcon,
  },
  {
    title: "سلامت آقایان",
    desc: "بررسی علمی وضعیت جسمی، ذهنی و هورمونی آقایان با تست‌های تخصصی و شخصی‌سازی‌شده",
    link: "/my-men-health",
    image: menHealthBg,
    icon: menHealthIcon,
  },
  {
    title: "پزشک من",
    desc: "بایگانی پرونده‌های پزشکی، نسخه‌ها و آزمایش‌های شما در ژنینو.",
    link: "/my-doctor",
    image: myDoctorBg,
    icon: myDoctorIcon,
  },
  {
    title: "کالری شمار",
    desc: "تغذیه سالم و به اندازه، ضامن سلامت شماست.",
    link: "/calorie-tracker",
    image: calorieTrackerBg,
    icon: calorieIcon,
  },
  {
    title: "مجله ژنینو",
    desc: "مرجع علمی رشد، آگاهی و والدگری مدرن — DNA طلایی ذهن شما.",
    link: "/world-knowledge",
    image: magazineBg,
    icon: magazineIcon,
  },
  {
    title: "بازی و سرگرمی",
    desc: "کودک شما با بازی‌های آموزشی و کارتون‌های هدفمند رشد می‌کند.",
    link: "/fun",
    image: funBg,
    icon: funIcon,
  },
  {
    title: "جهان مجردها",
    desc: "ویژه افراد مجرد — محتوای آموزشی، سرگرمی و رشد فردی در ژنینو.",
    link: "/single-world",
    image: singleWorldBg,
    icon: singleWorldIcon,
  },
  {
    title: "شبکه اجتماعی ژنینو",
    desc: "در ژنینو با والدین دیگر در ارتباط باشید، تجربه‌ها را به اشتراک بگذارید و از لحظات طلایی کودکی الهام بگیرید 💬✨",
    link: "/social",
    image: socialBg,
    icon: socialIcon,
  },
  
];

// ✅ تقسیم کارت‌ها به دسته‌های ۴تایی
const chunk = (arr, size) => {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};


const productCategoryItems = [
  {
    title: "سیسمونی تخصصی",
    image: "/images/shop/categories/sismooni.webp",
    link: "/shop/sismooni",
  },
  {
    title: "نوزاد، کودک و نوجوان",
    image: "/images/shop/categories/kids.webp",
    link: "/shop/kids",
  },
  {
    title: "مد و پوشاک",
    image: "/images/shop/categories/fashion.webp",
    link: "/shop/fashion",
  },
  {
    title: "کالای خواب و حمام",
    image: "/images/shop/categories/bed-bath.webp",
    link: "/shop/bed-bath",
  },
  {
    title: "ساعت و زیورآلات",
    image: "/images/shop/categories/watch-jewelry.webp",
    link: "/shop/watch-jewelry",
  },
  {
    title: "کالای ورزشی",
    image: "/images/shop/categories/sport.webp",
    link: "/shop/sport",
  },
  {
    title: "سلامت و پزشکی",
    image: "/images/shop/categories/medical.webp",
    link: "/shop/medical",
  },
  {
    title: "آرایشی و بهداشتی",
    image: "/images/shop/categories/beauty.webp",
    link: "/shop/beauty",
  },
  {
    title: "عطر و ادکلن",
    image: "/images/shop/categories/perfume.webp",
    link: "/shop/perfume",
  },
  {
    title: "صنایع دستی",
    image: "/images/shop/categories/handmade.webp",
    link: "/shop/handmade",
  },
];



const featuresChunks = chunk(features, 4);

  const [highlight, setHighlight] = useState(false);

useEffect(() => {
  const interval = setInterval(() => {
    setHighlight(true);
    setTimeout(() => setHighlight(false), 2000); // طول زمان درخشش
  }, 5000); // هر ۷ ثانیه یک‌بار تکرار شود
  return () => clearInterval(interval);
}, []);
const [pulse, setPulse] = useState(false);

useEffect(() => {
  const interval = setInterval(() => {
    setPulse(true);
    setTimeout(() => setPulse(false), 1500); // مدت پالس ۱.۵ ثانیه
  }, 6000); // هر ۶ ثانیه یک‌بار
  return () => clearInterval(interval);
}, []);

const cardColors = {
  default: "bg-[#f8fafc] border-[#e2e8f0] text-gray-700", // خاکستری آبی روشن
  blue: "bg-[#e0f2fe] border-[#bae6fd] text-[#075985]",   // آبی ملایم
  green: "bg-[#dcfce7] border-[#bbf7d0] text-[#166534]",  // سبز ملایم
  pink: "bg-[#ffe4e6] border-[#fecdd3] text-[#9d174d]",   // صورتی
  yellow: "bg-[#fef9c3] border-[#fef08a] text-[#92400e]", // زرد ملایم
};

// شمارش پیام های خوانده نشده بر روی کارت شبکه اجتماعی
useEffect(() => {
  let isMounted = true;

  const loadUnreadCount = async () => {
    const token = localStorage.getItem("genino_token");

    const vendorId = localStorage.getItem("genino_vendor_id");

if (vendorId) {
  if (isMounted) setSocialUnreadCount(0);
  return;
}

    if (!token) {
      if (isMounted) setSocialUnreadCount(0);
      return;
    }

    const res = await getConversations();

    if (!isMounted) return;

    if (!res?.ok) {
      setSocialUnreadCount(0);
      return;
    }

    const totalUnread = (res.items || []).reduce((sum, item) => {
      return sum + (Number(item.unreadCount) || 0);
    }, 0);

    setSocialUnreadCount(totalUnread);
  };

  loadUnreadCount();

  const intervalId = setInterval(() => {
    loadUnreadCount();
  }, 5000);

  const handleTokenChange = () => {
    loadUnreadCount();
  };

  window.addEventListener("genino_token_changed", handleTokenChange);

  return () => {
    isMounted = false;
    clearInterval(intervalId);
    window.removeEventListener("genino_token_changed", handleTokenChange);
  };
}, []);


const CrystalDust = () => {
  const particles = [
    { top: "18%", left: "12%", size: 1.5 },
    { top: "28%", left: "28%", size: 1 },
    { top: "20%", left: "48%", size: 1.2 },
    { top: "34%", left: "70%", size: 1.4 },
    { top: "52%", left: "18%", size: 1 },
    { top: "62%", left: "38%", size: 1.3 },
    { top: "55%", left: "58%", size: 1 },
    { top: "72%", left: "78%", size: 1.5 },
    { top: "42%", left: "88%", size: 1 },
    { top: "78%", left: "52%", size: 1.2 },
  ];

  

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      animate={{ opacity: [0.35, 0.9, 0.35] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            boxShadow:
              "0 0 5px rgba(255,255,255,0.95), 0 0 12px rgba(255,232,150,0.75)",
          }}
        />
      ))}
    </motion.div>
  );
};

const handleOpenLifeCompanion = async () => {
  try {
    const token = localStorage.getItem("genino_token");

    const res = await fetch(`${API_BASE_URL}/life-companion/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data?.hasCompanion) {
      navigate("/life-companion");
      return;
    }

    setShowLifeCompanionModal(true);
  } catch (err) {
    console.error(err);
    setShowLifeCompanionModal(true);
  }
};


const resetLifeInviteForm = () => {
  setInviteEmail("");
  setInvitePhone("");
  setInviteUsername("");
};

const closeLifeCompanionModal = () => {
  setShowLifeCompanionModal(false);
  resetLifeInviteForm();
};

const handleSendInvite = async () => {
  try {
    const value =
      inviteUsername.trim() ||
      inviteEmail.trim() ||
      invitePhone.trim();

    if (!value) {
      alert("نام کاربری، ایمیل یا شماره موبایل را وارد کنید");
      return;
    }

    setIsSendingLifeInvite(true);

    const token = localStorage.getItem("genino_token");

    const res = await fetch(`${API_BASE_URL}/life-companion/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ value }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "ارسال دعوت انجام نشد");
      return;
    }

    alert("دعوت همراه زندگی ارسال شد");

    closeLifeCompanionModal();
    navigate("/life-companion");
  } catch (err) {
    console.error(err);
    alert("خطا در ارتباط با سرور");
  } finally {
    setIsSendingLifeInvite(false);
  }
};

useEffect(() => {
  const handleBeforeInstallPrompt = (e) => {
    e.preventDefault();
    setDeferredPrompt(e);
    setCanInstallPwa(true);
  };

  window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

  return () => {
    window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  };
}, []);

const handleInstallPwa = async () => {
  if (!deferredPrompt) {
    alert("اگر گزینه نصب نمایش داده نشد، از منوی مرورگر گزینه Add to Home Screen یا نصب برنامه را انتخاب کنید.");
    return;
  }

  deferredPrompt.prompt();

  const choiceResult = await deferredPrompt.userChoice;

  if (choiceResult.outcome === "accepted") {
    setDeferredPrompt(null);
    setCanInstallPwa(false);
  }
};








  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-[#f7f2eb] to-[#fffdf8] text-gray-800 px-6 pt-3 sm:pt-6 lg:pt-8 pb-[6rem] sm:pb-0 text-center overflow-x-hidden overflow-y-auto">

      
  {/* 🔹 دکمه دریافت اپ */}
<motion.div
  className="
fixed bottom-0 left-0 right-0
sm:bottom-8 sm:left-8 sm:right-auto
sm:translate-x-0
z-50
flex justify-center sm:justify-start
"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  <button
    type="button"
    onClick={() => setShowAppModal(true)}
    className="
w-full sm:w-52
rounded-none sm:rounded-xl
bg-gradient-to-r from-yellow-500 to-yellow-400
text-white
px-5 py-4
text-sm font-bold
shadow-2xl
hover:shadow-xl hover:scale-105 active:scale-95
transition-all
"
  >
    📱 دریافت اپ ژنینو
  </button>
</motion.div>


      {/* 🔹 بک‌گراند DNA چرخان */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fffdf8] to-[#f7f3e6] overflow-hidden z-[1]">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.svg
            key={i}
            viewBox="0 0 100 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute opacity-30"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              transformOrigin: "center",
            }}
            animate={{ rotate: [0, i % 2 === 0 ? 360 : -360] }}
            transition={{
              duration: 60 + Math.random() * 40,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <defs>
              <linearGradient id={`dnaGrad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#b88a1a" />
              </linearGradient>
            </defs>
            <path d="M30,10 C50,30 50,70 30,90 C10,110 10,150 30,170" stroke={`url(#dnaGrad-${i})`} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M70,10 C50,30 50,70 70,90 C90,110 90,150 70,170" stroke={`url(#dnaGrad-${i})`} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {Array.from({ length: 6 }).map((_, j) => (
              <line key={j} x1="30" y1={20 + j * 25} x2="70" y2={30 + j * 25} stroke={`url(#dnaGrad-${i})`} strokeWidth="1.5" opacity="0.7" />
            ))}
          </motion.svg>
        ))}
      </div>

<div
  className="
    relative
    z-20

    w-[calc(100%+3rem)]
    -mx-6

    mt-2
  "
>
  <TodayCalendarBox />
</div>

{/* اسلایدر اصلی صفحه */}
<motion.div
  className="
    relative
    z-20

    w-[calc(100%+3rem)]
    -mx-6
    max-w-none

    mt-2
    mb-2

    rounded-none
    overflow-hidden

    sm:w-[calc(100%+3rem)]
    sm:-mx-6
    sm:max-w-none
    sm:mt-4
    sm:mb-8
    sm:rounded-3xl
  "
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  <PromoSlider
    variant="golden"
    interval={6}
    height="h-52 sm:h-60 md:h-64 lg:h-72"
    className="
  rounded-none
  sm:rounded-3xl
  overflow-hidden
  shadow-none
  sm:shadow-[0_10px_25px_rgba(212,175,55,0.25)]
"
    slides={[
      { id: 1, image: "/images/slides/authstart/1.jpg", link: "/shop" },
      { id: 2, image: "/images/slides/authstart/5.jpg", link: "/gift" },
      { id: 3, image: "/images/slides/authstart/6.jpg", link: "/genino-health" },
      { id: 4, image: "/images/slides/authstart/8.jpg", link: "/events" },
      { id: 5, image: "/images/slides/authstart/2.jpg", link: "/shop" },
      { id: 6, image: "/images/slides/authstart/3.jpg", link: "/shop" },
      { id: 7, image: "/images/slides/authstart/4.jpg", link: "/shop" },
      { id: 8, image: "/images/slides/authstart/9.jpg", link: "/social" },
      { id: 9, image: "/images/slides/authstart/7.jpg", link: "/shop" },
    ]}
  />
</motion.div>


{/* نوار سه‌دکمه‌ای */}
<motion.div
  className="
    relative
    z-20

    w-[calc(100%+3rem)]
    -mx-6

    mt-0
    mb-2

    sm:w-full
    sm:mx-0
    sm:max-w-3xl
  "
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.55, ease: "easeOut" }}
>
  <div
    className="
      grid
      grid-cols-3

      w-full

      rounded-none
      sm:rounded-2xl

      overflow-hidden

      border-y
      sm:border

      border-yellow-200

      bg-gradient-to-l
      from-[#fffaf0]
      via-[#fff4cf]
      to-[#f6df9b]

      shadow-[0_5px_18px_rgba(120,85,38,0.10)]
    "
  >

    {/* کودک من */}
    <motion.button
      type="button"
      onClick={() => navigate("/mychild")}
      whileTap={{ scale: 0.97 }}
      className="
        flex
        min-w-0
        items-center
        justify-center
        gap-1.5

        border-l
        border-yellow-200/80

        px-2
        py-3

        text-[11px]
        font-black
        text-[#4b2f17]

        transition
        hover:bg-white/30
      "
    >
      <span
        className="
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          rounded-lg

          bg-gradient-to-br
          from-[#4b2f17]
          via-[#9b6a26]
          to-[#d4af37]

          text-white
          shadow-sm
        "
      >
        <Baby className="h-3.5 w-3.5" />
      </span>

      <span className="whitespace-nowrap">
        کودک من
      </span>
    </motion.button>


    {/* کودکان ژنینویی */}
    <motion.button
      type="button"
      onClick={() => navigate("/genino-children")}
      whileTap={{ scale: 0.97 }}
      className="
        flex
        min-w-0
        items-center
        justify-center
        gap-1.5

        border-l
        border-yellow-200/80

        px-2
        py-3

        text-[11px]
        font-black
        text-[#4b2f17]

        transition
        hover:bg-white/30
      "
    >
      <span
        className="
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          rounded-lg

          bg-gradient-to-br
          from-[#4b2f17]
          via-[#9b6a26]
          to-[#d4af37]

          text-white
          shadow-sm
        "
      >
        <Sparkles className="h-3.5 w-3.5" />
      </span>

      <span className="whitespace-nowrap">
        کودکان ژنینویی
      </span>
    </motion.button>


    {/* همراه زندگی */}
    <motion.button
      type="button"
      onClick={handleOpenLifeCompanion}
      whileTap={{ scale: 0.97 }}
      className="
        flex
        min-w-0
        items-center
        justify-center
        gap-1.5

        px-2
        py-3

        text-[11px]
        font-black
        text-[#4b2f17]

        transition
        hover:bg-white/30
      "
    >
      <span
        className="
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          rounded-lg

          bg-gradient-to-br
          from-[#4b2f17]
          via-[#9b6a26]
          to-[#d4af37]

          text-white
          shadow-sm
        "
      >
        <HeartHandshake className="h-3.5 w-3.5" />
      </span>

      <span className="whitespace-nowrap">
        همراه زندگی
      </span>
    </motion.button>

  </div>
</motion.div>


{/* اسلایدر بار بی‌نهایت */}
<div
  className="
    relative
    z-20

    w-[calc(100%+3rem)]
    -mx-6

    mt-2
    mb-2

    sm:w-full
    sm:mx-0
  "
>
  <AuthFeatureCircleSlider items={features} />
</div>




{/* 🛍️ آخرین محصولات فروشگاه ژنینو */}
{latestProductsLoading ? (
  <div className="relative z-20 my-5 w-full text-center">
    <div className="mx-auto max-w-6xl rounded-3xl border border-yellow-100 bg-white/80 px-4 py-8 text-sm font-bold text-yellow-700 shadow-sm">
      در حال دریافت آخرین محصولات فروشگاه...
    </div>
  </div>
) : latestShopProducts.length > 0 ? (
  <div
  className="
    relative
    z-20

    w-[calc(100%+3rem)]
    -mx-6

    sm:w-full
    sm:mx-0
  "
>
  <ScrollProduct
    title="آخرین محصولات فروشگاه ژنینو"
    titleLink="/shop"
    color="yellow"
    items={latestShopProducts}
    variant="shop"
    autoScroll={true}
    interval={6000}
  />
</div>
) : (
  <div className="relative z-20 my-5 w-full text-center">
    <div className="mx-auto max-w-6xl rounded-3xl border border-yellow-100 bg-white/80 px-4 py-8 text-sm text-gray-500 shadow-sm">
      هنوز محصول منتشرشده‌ای در فروشگاه وجود ندارد.
    </div>
  </div>
)}


{/* ✅ کارت‌ها ۴تایی + اسلایدر زیر هر ۴ کارت */}
{/* 1) کارت‌ها داخل max-w */}
<div className="w-full mt-4 z-20">

  {/* 🔸 بلاک اول: ۴ کارت اول */}
  <div className="w-full max-w-6xl mx-auto">
    <motion.section
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, duration: 0.35 } },
      }}
    >
      {featuresChunks?.[0]?.map((item, i) => (
        <Link
  key={`f0-${i}`}
  to={item.title === "کودک من و کودکان ژنینویی" ? "#" : item.link || "#"}
  onClick={(e) => {
    if (item.title === "کودک من و کودکان ژنینویی") {
      e.preventDefault();
      setShowChildChoiceModal(true);
    }
  }}
  className="group"
>
          {/* کارت خودت (بدون تغییر) */}
          <motion.div
  whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(212,175,55,0.4)" }}
  transition={{ type: "spring", stiffness: 200, damping: 15 }}
  className="flex flex-row sm:flex-col items-stretch sm:items-center justify-start sm:justify-between bg-[#fff8e6]/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-md border-2 border-[#d4af37] h-[180px] sm:h-[300px] md:h-[280px] lg:h-[290px] cursor-pointer hover:shadow-lg p-0 sm:p-3 gap-0 sm:gap-4"
>
  {/* عکس کارت */}
  <div className="w-1/2 h-full sm:w-[70%] sm:h-auto sm:aspect-square md:w-[65%] lg:w-[85%] overflow-hidden flex-shrink-0 rounded-none sm:rounded-2xl bg-[#fff8e6] flex items-center justify-center">
  <img
    src={item.image || logo}
    alt={item.title}
    className="w-full h-full object-cover sm:object-contain hover:scale-105 transition-transform duration-500"
  />
</div>

  {/* متن کارت */}
  <div className="w-1/2 h-full sm:w-full flex flex-col justify-center sm:justify-center px-4 text-center">
  <h3 className="text-[15px] font-extrabold text-yellow-700 leading-6 sm:text-sm md:text-base">
    {item.title}
  </h3>

  <p className="mt-2 text-[12px] leading-5 text-gray-600 sm:hidden">
    {item.desc}
  </p>
</div>
</motion.div>
        </Link>
      ))}
    </motion.section>
  </div>

  {/* 🛍️ جدیدترین محصولات سیسمونی تخصصی */}
{latestProductsLoading ? (
  <div className="relative z-20 my-5 w-full text-center">
    <div className="mx-auto max-w-6xl rounded-3xl border border-yellow-100 bg-white/80 px-4 py-8 text-sm font-bold text-yellow-700 shadow-sm">
      در حال دریافت محصولات سیسمونی تخصصی...
    </div>
  </div>
) : sismooniProducts.length > 0 ? (
  <div
  className="
    relative
    z-20

    w-[calc(100%+3rem)]
    -mx-6

    sm:w-full
    sm:mx-0
  "
>
  <ScrollProduct
    title="سیسمونی تخصصی ژنینو"
    titleLink={`/shop?category=${encodeURIComponent("سیسمونی تخصصی")}`}
    color="yellow"
    items={sismooniProducts}
    variant="shop"
    autoScroll={true}
    interval={6000}
  />
</div>
) : (
  <div className="relative z-20 my-5 w-full text-center">
    <div className="mx-auto max-w-6xl rounded-3xl border border-yellow-100 bg-white/80 px-4 py-8 text-sm text-gray-500 shadow-sm">
      هنوز محصول منتشرشده‌ای در بخش سیسمونی تخصصی وجود ندارد.
    </div>
  </div>
)}

  {/* 🔸 بلاک دوم: ۴ کارت دوم */}
  <div className="w-full max-w-6xl mx-auto">
    <motion.section
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mt-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, duration: 0.35 } },
      }}
    >
      {featuresChunks?.[1]?.map((item, i) => (
  <Link key={`f1-${i}`} to={item.link || "#"} className="group">
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(212,175,55,0.4)" }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative flex flex-row sm:flex-col items-stretch sm:items-center justify-start sm:justify-between bg-[#fff8e6]/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-md border-2 border-[#d4af37] h-[180px] sm:h-[300px] md:h-[280px] lg:h-[290px] cursor-pointer hover:shadow-lg p-0 sm:p-3 gap-0 sm:gap-4"
    >
      {item.title === "شبکه اجتماعی ژنینو" && socialUnreadCount > 0 && (
        <div className="absolute top-3 left-3 z-20">
          <span className="min-w-[28px] h-[28px] px-2 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center shadow-md">
            {socialUnreadCount > 99 ? "99+" : socialUnreadCount}
          </span>
        </div>
      )}

      <div className="w-1/2 h-full sm:w-[70%] sm:h-auto sm:aspect-square md:w-[65%] lg:w-[85%] overflow-hidden flex-shrink-0 rounded-none sm:rounded-2xl bg-[#fff8e6] flex items-center justify-center">
  <img
    src={item.image || logo}
    alt={item.title}
    className="w-full h-full object-cover sm:object-contain hover:scale-105 transition-transform duration-500"
  />
</div>

      <div className="w-1/2 h-full sm:w-full flex flex-col justify-center sm:justify-center px-4 text-center">
  <h3 className="text-[15px] font-extrabold text-yellow-700 leading-6 sm:text-sm md:text-base">
    {item.title}
  </h3>

  <p className="mt-2 text-[12px] leading-5 text-gray-600 sm:hidden">
    {item.desc}
  </p>
</div>
    </motion.div>
  </Link>
))}
    </motion.section>
  </div>



{/* 🔥 محصولات تخفیف‌خورده */}
{latestProductsLoading ? (
  <div className="relative z-20 my-5 w-full text-center">
    <div className="mx-auto max-w-6xl rounded-3xl border border-amber-100 bg-white/80 px-4 py-8 text-sm font-bold text-amber-700 shadow-sm">
      در حال دریافت محصولات تخفیف‌خورده...
    </div>
  </div>
) : discountedProducts.length > 0 ? (
  <ScrollProduct
    title="محصولات تخفیف‌خورده"
    titleLink="/shop?discount=active"
    color="amber"
    items={discountedProducts}
    variant="shop"
    autoScroll={true}
    interval={6000}
  />
) : (
  <div className="relative z-20 my-5 w-full text-center">
    <div className="mx-auto max-w-6xl rounded-3xl border border-amber-100 bg-white/80 px-4 py-8 text-sm text-gray-500 shadow-sm">
      در حال حاضر محصول تخفیف‌خورده‌ای وجود ندارد.
    </div>
  </div>
)}

  {/* 🔸 باقی کارت‌ها */}
  <div className="w-full max-w-6xl mx-auto">
    <motion.section
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mt-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, duration: 0.35 } },
      }}
    >
      {featuresChunks?.slice(2).flat().map((item, i) => (
  <Link key={`rest-${i}`} to={item.link || "#"} className="group">
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(212,175,55,0.4)" }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative flex flex-row sm:flex-col items-stretch sm:items-center justify-start sm:justify-between bg-[#fff8e6]/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-md border-2 border-[#d4af37] h-[180px] sm:h-[300px] md:h-[280px] lg:h-[290px] cursor-pointer hover:shadow-lg p-0 sm:p-3 gap-0 sm:gap-4"
    >
    {item.title === "شبکه اجتماعی ژنینو" && socialUnreadCount > 0 && (
  <div className="absolute top-3 left-3 z-20">
    <span className="min-w-[28px] h-[28px] px-2 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center shadow-md">
      {socialUnreadCount > 99 ? "99+" : socialUnreadCount}
    </span>
  </div>
)}
      <div className="w-1/2 h-full sm:w-[70%] sm:h-auto sm:aspect-square md:w-[65%] lg:w-[85%] overflow-hidden flex-shrink-0 rounded-none sm:rounded-2xl bg-[#fff8e6] flex items-center justify-center">
  <img
    src={item.image || logo}
    alt={item.title}
    className="w-full h-full object-cover sm:object-contain hover:scale-105 transition-transform duration-500"
  />
</div>

      <div className="w-1/2 h-full sm:w-full flex flex-col justify-center sm:justify-center px-4 text-center">
  <h3 className="text-[15px] font-extrabold text-yellow-700 leading-6 sm:text-sm md:text-base">
    {item.title}
  </h3>

  <p className="mt-2 text-[12px] leading-5 text-gray-600 sm:hidden">
    {item.desc}
  </p>
</div>
    </motion.div>
  </Link>
))}
    </motion.section>
  </div>

</div>


{/* 🛍️ دسته‌بندی کالاهای ژنینو */}
<div
  className="
    relative
    z-20
    w-[calc(100%+3rem)]
    -mx-6
    mt-14
    mb-2
    sm:w-full
    sm:mx-0
  "
>
  <h2 className="text-base sm:text-lg font-extrabold text-yellow-700 text-center mb-6">
    دسته‌بندی کالاهای ژنینو
  </h2>

  <ProductCategoryCircleSlider items={productCategoryItems} />
</div>



{/* 🏫 مدارس ژنینو */}
{schoolsLoading ? (

  <div
    className="
      relative
      z-20
      my-6
      w-full
      text-center
    "
  >
    <div
      className="
        mx-auto
        max-w-6xl
        rounded-3xl
        border
        border-blue-100
        bg-white/80
        px-4
        py-8
        text-sm
        font-bold
        text-blue-700
        shadow-sm
      "
    >
      در حال دریافت مدارس...
    </div>
  </div>

) : schools.length > 0 ? (

  <section
    dir="rtl"
    className="
      relative
      z-20
      my-6

      w-[calc(100%+3rem)]
      sm:w-full

      rounded-none
      sm:rounded-[2rem]

      border
      border-blue-100

      bg-gradient-to-br
      from-blue-50
      via-sky-50
      to-white

      p-4
      sm:p-6

      shadow-sm
    "
  >

    {/* عنوان */}
    <div
      className="
        mx-auto
        mb-4
        flex
        w-full
        max-w-6xl
        items-center
        justify-between
      "
    >

      <h2
        className="
          text-lg
          font-black
          text-[#1e4f7a]
          sm:text-xl
        "
      >
        مدارس ژنینو
      </h2>

      <button
        type="button"
        onClick={() =>
          navigate("/shop/services/schools")
        }
        className="
          text-xs
          font-black
          text-[#3b82b8]
          hover:text-[#1e4f7a]
        "
      >
        مشاهده همه
      </button>

    </div>


    {/* کارت‌ها */}
    <div
      className="
        mx-auto
        flex
        w-full
        max-w-6xl
        gap-4
        overflow-x-auto
        px-3
        pb-4
        snap-x
        snap-mandatory
      "
    >

      {schools.map((school) => {

        const schoolImage =
          school.image?.trim()
            ? school.image
            : null;

        return (

          <motion.div
            key={school.id}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              navigate(
                `/vendor/service/school/${school.vendorId}`
              )
            }
            className="
              group
              w-[230px]
              min-w-[230px]
              flex-none
              cursor-pointer
              snap-start
              overflow-hidden
              rounded-3xl
              border
              border-blue-200
              bg-white
              text-right
              shadow-md
            "
          >

            {/* عکس مدرسه */}
            <div
              className="
                relative
                h-[145px]
                w-full
                overflow-hidden
                bg-blue-50
              "
            >

              {schoolImage ? (

                <img
                  src={schoolImage}
                  alt={
                    school.schoolName ||
                    "مدرسه"
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
                    w-full
                    items-center
                    justify-center
                    text-5xl
                  "
                >
                  🏫
                </div>

              )}


              <div
                className="
                  absolute
                  right-2
                  top-2
                  rounded-full
                  bg-white/95
                  px-3
                  py-1
                  text-[10px]
                  font-black
                  text-[#1e4f7a]
                  shadow
                "
              >
                مدرسه
              </div>

            </div>


            {/* اطلاعات مدرسه */}
            <div className="p-4">

              <h3
                className="
                  truncate
                  text-sm
                  font-black
                  text-[#17324d]
                "
              >
                {school.schoolName ||
                  "مدرسه ژنینو"}
              </h3>


              {school.slogan && (

                <p
                  className="
                    mt-1
                    line-clamp-2
                    text-[11px]
                    leading-5
                    text-gray-500
                  "
                >
                  {school.slogan}
                </p>

              )}


              <div
                className="
                  mt-3
                  flex
                  flex-wrap
                  gap-1.5
                "
              >

                {school.city && (

                  <span
                    className="
                      rounded-full
                      bg-blue-50
                      px-2
                      py-1
                      text-[10px]
                      font-bold
                      text-[#1e4f7a]
                    "
                  >
                    📍 {school.city}
                  </span>

                )}


                {school.district && (

                  <span
                    className="
                      rounded-full
                      bg-blue-50
                      px-2
                      py-1
                      text-[10px]
                      font-bold
                      text-[#1e4f7a]
                    "
                  >
                    منطقه {school.district}
                  </span>

                )}


                {school.gender && (

                  <span
                    className="
                      rounded-full
                      bg-blue-50
                      px-2
                      py-1
                      text-[10px]
                      font-bold
                      text-[#1e4f7a]
                    "
                  >
                    {school.gender}
                  </span>

                )}

              </div>


              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();

                  navigate(
                    `/vendor/service/school/${school.vendorId}`
                  );
                }}
                className="
                  mt-4
                  w-full
                  rounded-xl
                  bg-gradient-to-r
                  from-[#1e4f7a]
                  via-[#3b82b8]
                  to-[#62b6e8]
                  py-2
                  text-[11px]
                  font-black
                  text-white
                "
              >
                مشاهده مدرسه
              </button>

            </div>

          </motion.div>

        );

      })}

    </div>

  </section>

) : null}


{/* 🧸 مهدکودک‌های ژنینو */}
{kindergartensLoading ? (

  <div
    className="
      relative
      z-20
      my-6
      w-full
      text-center
    "
  >
    <div
      className="
        mx-auto
        max-w-6xl
        rounded-3xl
        border
        border-yellow-100
        bg-white/80
        px-4
        py-8
        text-sm
        font-bold
        text-yellow-700
        shadow-sm
      "
    >
      در حال دریافت مهدکودک‌ها...
    </div>
  </div>

) : kindergartens.length > 0 ? (

  <section
    dir="rtl"
    className="
      relative
      z-20
      my-6

      w-[calc(100%+3rem)]
      sm:w-full

      rounded-none
      sm:rounded-[2rem]

      border
      border-yellow-100

      bg-gradient-to-br
      from-yellow-50
      via-amber-50
      to-white

      p-4
      sm:p-6

      shadow-sm
    "
  >

    <div
      className="
        mx-auto
        mb-4
        flex
        w-full
        max-w-6xl
        items-center
        justify-between
      "
    >

      <h2
        className="
          text-lg
          font-black
          text-[#7a5526]
          sm:text-xl
        "
      >
        مهدکودک‌های ژنینو
      </h2>

      <button
        type="button"
        onClick={() =>
          navigate("/shop/services/kindergartens")
        }
        className="
          text-xs
          font-black
          text-[#b88724]
          hover:text-[#7a5526]
        "
      >
        مشاهده همه
      </button>

    </div>


    <div
      className="
        mx-auto
        flex
        w-full
        max-w-6xl
        gap-4
        overflow-x-auto
        px-3
        pb-4
        snap-x
        snap-mandatory
      "
    >

      {kindergartens.map((kindergarten) => {

  const kindergartenImage =
    kindergarten.image?.trim()
      ? kindergarten.image
      : null;

  return (
    <motion.div
      key={kindergarten.id}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() =>
        navigate(
          `/vendor/service/kindergarten/${kindergarten.vendorId}?view=public`
        )
      }
      className="
        group
        w-[230px]
        min-w-[230px]
        flex-none
        cursor-pointer
        overflow-hidden
        rounded-3xl
        border
        border-yellow-200
        bg-white
        text-right
        shadow-md
      "
    >

      {/* عکس مهدکودک */}
      <div
        className="
          relative
          h-[145px]
          w-full
          overflow-hidden
          bg-yellow-50
        "
      >

        {kindergartenImage ? (
          <img
            src={kindergartenImage}
            alt={
              kindergarten.kindergartenName ||
              "مهدکودک"
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
              w-full
              items-center
              justify-center
              text-5xl
            "
          >
            🧸
          </div>
        )}

        <div
          className="
            absolute
            right-2
            top-2
            rounded-full
            bg-white/95
            px-3
            py-1
            text-[10px]
            font-black
            text-[#7a5526]
            shadow
          "
        >
          مهدکودک
        </div>

      </div>


      {/* اطلاعات */}
      <div className="p-4">

        <h3
          className="
            text-sm
            font-black
            text-[#4b2f17]
          "
        >
          {kindergarten.kindergartenName ||
            "مهدکودک ژنینو"}
        </h3>


        {kindergarten.slogan && (
          <p
            className="
              mt-1
              line-clamp-2
              text-[11px]
              leading-5
              text-gray-500
            "
          >
            {kindergarten.slogan}
          </p>
        )}


        <div
          className="
            mt-3
            flex
            flex-wrap
            gap-1.5
          "
        >

          {kindergarten.city && (
            <span
              className="
                rounded-full
                bg-yellow-50
                px-2
                py-1
                text-[10px]
                font-bold
                text-[#7a5526]
              "
            >
              📍 {kindergarten.city}
            </span>
          )}


          {kindergarten.district && (
            <span
              className="
                rounded-full
                bg-yellow-50
                px-2
                py-1
                text-[10px]
                font-bold
                text-[#7a5526]
              "
            >
              منطقه {kindergarten.district}
            </span>
          )}


          {kindergarten.gender && (
            <span
              className="
                rounded-full
                bg-yellow-50
                px-2
                py-1
                text-[10px]
                font-bold
                text-[#7a5526]
              "
            >
              {kindergarten.gender}
            </span>
          )}

        </div>


        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();

            navigate(
              `/vendor/service/kindergarten/${kindergarten.vendorId}?view=public`
            );
          }}
          className="
            mt-4
            w-full
            rounded-xl
            bg-gradient-to-r
            from-[#7a5526]
            via-[#b88724]
            to-[#d4af37]
            py-2
            text-[11px]
            font-black
            text-white
          "
        >
          مشاهده مهدکودک
        </button>

      </div>

    </motion.div>
  );
})}

    </div>

  </section>

) : null}

{/* 🎮 خانه‌های بازی ژنینو */}
{playhousesLoading ? (

  <div
    className="
      relative
      z-20
      my-6
      w-full
      text-center
    "
  >
    <div
      className="
        mx-auto
        max-w-6xl
        rounded-3xl
        border
        border-green-100
        bg-white/80
        px-4
        py-8
        text-sm
        font-bold
        text-green-700
        shadow-sm
      "
    >
      در حال دریافت خانه‌های بازی...
    </div>
  </div>

) : playhouses.length > 0 ? (

  <section
    dir="rtl"
    className="
      relative
      z-20
      my-6

      w-[calc(100%+3rem)]
      sm:w-full

      rounded-none
      sm:rounded-[2rem]

      border
      border-green-100

      bg-gradient-to-br
      from-green-50
      via-emerald-50
      to-white

      p-4
      sm:p-6

      shadow-sm
    "
  >

    {/* عنوان */}
    <div
      className="
        mx-auto
        mb-4
        flex
        w-full
        max-w-6xl
        items-center
        justify-between
      "
    >

      <h2
        className="
          text-lg
          font-black
          text-[#276749]
          sm:text-xl
        "
      >
        خانه‌های بازی ژنینو
      </h2>


      <button
        type="button"
        onClick={() =>
          navigate(
            "/shop/services/playhouses"
          )
        }
        className="
          text-xs
          font-black
          text-[#3f9b6d]
          hover:text-[#276749]
        "
      >
        مشاهده همه
      </button>

    </div>


    {/* کارت‌ها */}
    <div
      className="
        mx-auto
        flex
        w-full
        max-w-6xl
        gap-4
        overflow-x-auto
        px-3
        pb-4
        snap-x
        snap-mandatory
      "
    >

      {playhouses.map((playhouse) => {

        const playhouseImage =
          playhouse.image?.trim()
            ? playhouse.image
            : null;


        return (

          <motion.div
            key={playhouse.id}
            whileHover={{
              y: -4,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={() =>
              navigate(
                `/vendor/service/playhouse/${playhouse.vendorId}?view=public`
              )
            }
            className="
              group
              w-[230px]
              min-w-[230px]
              flex-none
              cursor-pointer
              snap-start
              overflow-hidden
              rounded-3xl
              border
              border-green-200
              bg-white
              text-right
              shadow-md
            "
          >

            {/* عکس خانه بازی */}
            <div
              className="
                relative
                h-[145px]
                w-full
                overflow-hidden
                bg-green-50
              "
            >

              {playhouseImage ? (

                <img
                  src={playhouseImage}
                  alt={
                    playhouse.playhouseName ||
                    "خانه بازی"
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
                    w-full
                    items-center
                    justify-center
                    text-5xl
                  "
                >
                  🎮
                </div>

              )}


              <div
                className="
                  absolute
                  right-2
                  top-2
                  rounded-full
                  bg-white/95
                  px-3
                  py-1
                  text-[10px]
                  font-black
                  text-[#276749]
                  shadow
                "
              >
                خانه بازی
              </div>

            </div>


            {/* اطلاعات */}
            <div className="p-4">

              <h3
                className="
                  text-sm
                  font-black
                  text-[#1f5138]
                "
              >
                {playhouse.playhouseName ||
                  "خانه بازی ژنینو"}
              </h3>


              {playhouse.slogan && (

                <p
                  className="
                    mt-1
                    line-clamp-2
                    text-[11px]
                    leading-5
                    text-gray-500
                  "
                >
                  {playhouse.slogan}
                </p>

              )}


              <div
                className="
                  mt-3
                  flex
                  flex-wrap
                  gap-1.5
                "
              >

                {playhouse.city && (

                  <span
                    className="
                      rounded-full
                      bg-green-50
                      px-2
                      py-1
                      text-[10px]
                      font-bold
                      text-[#276749]
                    "
                  >
                    📍 {playhouse.city}
                  </span>

                )}


                {playhouse.district && (

                  <span
                    className="
                      rounded-full
                      bg-green-50
                      px-2
                      py-1
                      text-[10px]
                      font-bold
                      text-[#276749]
                    "
                  >
                    منطقه {playhouse.district}
                  </span>

                )}


                {playhouse.gender && (

                  <span
                    className="
                      rounded-full
                      bg-green-50
                      px-2
                      py-1
                      text-[10px]
                      font-bold
                      text-[#276749]
                    "
                  >
                    {playhouse.gender}
                  </span>

                )}

              </div>


              <button
                type="button"
                onClick={(e) => {

                  e.stopPropagation();

                  navigate(
                    `/vendor/service/playhouse/${playhouse.vendorId}?view=public`
                  );

                }}
                className="
                  mt-4
                  w-full
                  rounded-xl
                  bg-gradient-to-r
                  from-[#276749]
                  via-[#3f9b6d]
                  to-[#70c99a]
                  py-2
                  text-[11px]
                  font-black
                  text-white
                "
              >
                مشاهده خانه بازی
              </button>

            </div>

          </motion.div>

        );

      })}

    </div>

  </section>

) : null}

{/* 📚 مراکز آموزشی ژنینو */}
{educationCentersLoading ? (

  <div
    className="
      relative
      z-20
      my-6
      w-full
      text-center
    "
  >
    <div
      className="
        mx-auto
        max-w-6xl
        rounded-3xl
        border
        border-indigo-100
        bg-white/80
        px-4
        py-8
        text-sm
        font-bold
        text-indigo-700
        shadow-sm
      "
    >
      در حال دریافت مراکز آموزشی...
    </div>
  </div>

) : educationCenters.length > 0 ? (

  <section
    dir="rtl"
    className="
      relative
      z-20
      my-6

      w-[calc(100%+3rem)]
      sm:w-full

      rounded-none
      sm:rounded-[2rem]

      border
      border-indigo-100

      bg-gradient-to-br
      from-indigo-50
      via-violet-50
      to-white

      p-4
      sm:p-6

      shadow-sm
    "
  >

    {/* عنوان */}
    <div
      className="
        mx-auto
        mb-4
        flex
        w-full
        max-w-6xl
        items-center
        justify-between
      "
    >

      <h2
        className="
          text-lg
          font-black
          text-[#4c3f91]
          sm:text-xl
        "
      >
        مراکز آموزشی ژنینو
      </h2>

      <button
        type="button"
        onClick={() =>
          navigate(
            "/shop/services/education-classes"
          )
        }
        className="
          text-xs
          font-black
          text-[#6d5bb3]
          hover:text-[#4c3f91]
        "
      >
        مشاهده همه
      </button>

    </div>


    {/* کارت‌ها */}
    <div
      className="
        mx-auto
        flex
        w-full
        max-w-6xl
        gap-4
        overflow-x-auto
        px-3
        pb-4
        snap-x
        snap-mandatory
      "
    >

      {educationCenters.map(
        (educationCenter) => {

          const centerImage =
            educationCenter.image?.trim()
              ? educationCenter.image
              : null;

          return (

            <motion.div
              key={educationCenter.id}
              whileHover={{
                y: -4,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() =>
                navigate(
                  `/vendor/service/education-class/${educationCenter.vendorId}?view=public`
                )
              }
              className="
                group
                w-[230px]
                min-w-[230px]
                flex-none
                cursor-pointer
                snap-start
                overflow-hidden
                rounded-3xl
                border
                border-indigo-200
                bg-white
                text-right
                shadow-md
              "
            >

              {/* تصویر */}
              <div
                className="
                  relative
                  h-[145px]
                  w-full
                  overflow-hidden
                  bg-indigo-50
                "
              >

                {centerImage ? (

                  <img
                    src={centerImage}
                    alt={
                      educationCenter.centerName ||
                      "مرکز آموزشی"
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
                      w-full
                      items-center
                      justify-center
                      text-5xl
                    "
                  >
                    📚
                  </div>

                )}


                <div
                  className="
                    absolute
                    right-2
                    top-2
                    rounded-full
                    bg-white/95
                    px-3
                    py-1
                    text-[10px]
                    font-black
                    text-[#4c3f91]
                    shadow
                  "
                >
                  مرکز آموزشی
                </div>

              </div>


              {/* اطلاعات */}
              <div className="p-4">

                <h3
                  className="
                    truncate
                    text-sm
                    font-black
                    text-[#372f6b]
                  "
                >
                  {educationCenter.centerName ||
                    "مرکز آموزشی ژنینو"}
                </h3>


                {educationCenter.slogan && (

                  <p
                    className="
                      mt-1
                      line-clamp-2
                      text-[11px]
                      leading-5
                      text-gray-500
                    "
                  >
                    {educationCenter.slogan}
                  </p>

                )}


                <div
                  className="
                    mt-3
                    flex
                    flex-wrap
                    gap-1.5
                  "
                >

                  {educationCenter.city && (

                    <span
                      className="
                        rounded-full
                        bg-indigo-50
                        px-2
                        py-1
                        text-[10px]
                        font-bold
                        text-[#4c3f91]
                      "
                    >
                      📍 {educationCenter.city}
                    </span>

                  )}


                  {educationCenter.district && (

                    <span
                      className="
                        rounded-full
                        bg-indigo-50
                        px-2
                        py-1
                        text-[10px]
                        font-bold
                        text-[#4c3f91]
                      "
                    >
                      منطقه {educationCenter.district}
                    </span>

                  )}


                  {educationCenter.gender && (

                    <span
                      className="
                        rounded-full
                        bg-indigo-50
                        px-2
                        py-1
                        text-[10px]
                        font-bold
                        text-[#4c3f91]
                      "
                    >
                      {educationCenter.gender}
                    </span>

                  )}

                </div>


                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();

                    navigate(
                      `/vendor/service/education-class/${educationCenter.vendorId}?view=public`
                    );
                  }}
                  className="
                    mt-4
                    w-full
                    rounded-xl
                    bg-gradient-to-r
                    from-[#4c3f91]
                    via-[#6d5bb3]
                    to-[#9687d5]
                    py-2
                    text-[11px]
                    font-black
                    text-white
                  "
                >
                  مشاهده مرکز آموزشی
                </button>

              </div>

            </motion.div>

          );
        }
      )}

    </div>

  </section>

) : null}


{/* 🎨 مراکز هنری ژنینو */}
{artCentersLoading ? (

  <div
    className="
      relative
      z-20
      my-6
      w-full
      text-center
    "
  >
    <div
      className="
        mx-auto
        max-w-6xl
        rounded-3xl
        border
        border-rose-100
        bg-white/80
        px-4
        py-8
        text-sm
        font-bold
        text-rose-700
        shadow-sm
      "
    >
      در حال دریافت مراکز هنری...
    </div>
  </div>

) : artCenters.length > 0 ? (

  <section
    dir="rtl"
    className="
      relative
      z-20
      my-6

      w-[calc(100%+3rem)]
      sm:w-full

      rounded-none
      sm:rounded-[2rem]

      border
      border-rose-100

      bg-gradient-to-br
      from-rose-50
      via-pink-50
      to-white

      p-4
      sm:p-6

      shadow-sm
    "
  >

    {/* عنوان */}
    <div
      className="
        mx-auto
        mb-4
        flex
        w-full
        max-w-6xl
        items-center
        justify-between
      "
    >

      <h2
        className="
          text-lg
          font-black
          text-[#9f3657]
          sm:text-xl
        "
      >
        مراکز هنری ژنینو
      </h2>

      <button
        type="button"
        onClick={() =>
          navigate(
            "/shop/services/art-classes"
          )
        }
        className="
          text-xs
          font-black
          text-[#c65378]
          hover:text-[#9f3657]
        "
      >
        مشاهده همه
      </button>

    </div>


    {/* کارت‌ها */}
    <div
      className="
        mx-auto
        flex
        w-full
        max-w-6xl
        gap-4
        overflow-x-auto
        px-3
        pb-4
        snap-x
        snap-mandatory
      "
    >

      {artCenters.map((artCenter) => {

        const centerImage =
          artCenter.image?.trim()
            ? artCenter.image
            : null;

        return (

          <motion.div
            key={artCenter.id}
            whileHover={{
              y: -4,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={() =>
              navigate(
                `/vendor/service/art-class/${artCenter.vendorId}?view=public`
              )
            }
            className="
              group
              w-[230px]
              min-w-[230px]
              flex-none
              cursor-pointer
              snap-start
              overflow-hidden
              rounded-3xl
              border
              border-rose-200
              bg-white
              text-right
              shadow-md
            "
          >

            {/* تصویر مرکز هنری */}
            <div
              className="
                relative
                h-[145px]
                w-full
                overflow-hidden
                bg-rose-50
              "
            >

              {centerImage ? (

                <img
                  src={centerImage}
                  alt={
                    artCenter.centerName ||
                    "مرکز هنری"
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
                    w-full
                    items-center
                    justify-center
                    text-5xl
                  "
                >
                  🎨
                </div>

              )}


              <div
                className="
                  absolute
                  right-2
                  top-2
                  rounded-full
                  bg-white/95
                  px-3
                  py-1
                  text-[10px]
                  font-black
                  text-[#9f3657]
                  shadow
                "
              >
                مرکز هنری
              </div>

            </div>


            {/* اطلاعات */}
            <div className="p-4">

              <h3
                className="
                  truncate
                  text-sm
                  font-black
                  text-[#7d2945]
                "
              >
                {artCenter.centerName ||
                  "مرکز هنری ژنینو"}
              </h3>


              {artCenter.slogan && (

                <p
                  className="
                    mt-1
                    line-clamp-2
                    text-[11px]
                    leading-5
                    text-gray-500
                  "
                >
                  {artCenter.slogan}
                </p>

              )}


              <div
                className="
                  mt-3
                  flex
                  flex-wrap
                  gap-1.5
                "
              >

                {artCenter.city && (

                  <span
                    className="
                      rounded-full
                      bg-rose-50
                      px-2
                      py-1
                      text-[10px]
                      font-bold
                      text-[#9f3657]
                    "
                  >
                    📍 {artCenter.city}
                  </span>

                )}


                {artCenter.district && (

                  <span
                    className="
                      rounded-full
                      bg-rose-50
                      px-2
                      py-1
                      text-[10px]
                      font-bold
                      text-[#9f3657]
                    "
                  >
                    منطقه {artCenter.district}
                  </span>

                )}


                {artCenter.gender && (

                  <span
                    className="
                      rounded-full
                      bg-rose-50
                      px-2
                      py-1
                      text-[10px]
                      font-bold
                      text-[#9f3657]
                    "
                  >
                    {artCenter.gender}
                  </span>

                )}

              </div>


              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();

                  navigate(
                    `/vendor/service/art-class/${artCenter.vendorId}?view=public`
                  );
                }}
                className="
                  mt-4
                  w-full
                  rounded-xl
                  bg-gradient-to-r
                  from-[#9f3657]
                  via-[#c65378]
                  to-[#e88fa9]
                  py-2
                  text-[11px]
                  font-black
                  text-white
                "
              >
                مشاهده مرکز هنری
              </button>

            </div>

          </motion.div>

        );

      })}

    </div>

  </section>

) : null}


{/* 🏅 مراکز ورزشی ژنینو */}
{sportCentersLoading ? (

  <div
    className="
      relative
      z-20
      my-6
      w-full
      text-center
    "
  >
    <div
      className="
        mx-auto
        max-w-6xl
        rounded-3xl
        border
        border-orange-100
        bg-white/80
        px-4
        py-8
        text-sm
        font-bold
        text-orange-700
        shadow-sm
      "
    >
      در حال دریافت مراکز ورزشی...
    </div>
  </div>

) : sportCenters.length > 0 ? (

  <section
    dir="rtl"
    className="
      relative
      z-20
      my-6

      w-[calc(100%+3rem)]
      sm:w-full

      rounded-none
      sm:rounded-[2rem]

      border
      border-orange-100

      bg-gradient-to-br
      from-orange-50
      via-amber-50
      to-white

      p-4
      sm:p-6

      shadow-sm
    "
  >

    <div
      className="
        mx-auto
        mb-4
        flex
        w-full
        max-w-6xl
        items-center
        justify-between
      "
    >

      <h2
        className="
          text-lg
          font-black
          text-[#9a4d13]
          sm:text-xl
        "
      >
        مراکز ورزشی ژنینو
      </h2>

      <button
        type="button"
        onClick={() =>
          navigate(
            "/shop/services/sport-classes"
          )
        }
        className="
          text-xs
          font-black
          text-[#d97706]
          hover:text-[#9a4d13]
        "
      >
        مشاهده همه
      </button>

    </div>


    <div
      className="
        mx-auto
        flex
        w-full
        max-w-6xl
        gap-4
        overflow-x-auto
        px-3
        pb-4
        snap-x
        snap-mandatory
      "
    >

      {sportCenters.map((sportCenter) => {

        const centerImage =
          sportCenter.image?.trim()
            ? sportCenter.image
            : null;

        return (

          <motion.div
            key={sportCenter.id}
            whileHover={{
              y: -4,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={() =>
              navigate(
                `/vendor/service/sport-class/${sportCenter.vendorId}?view=public`
              )
            }
            className="
              group
              w-[230px]
              min-w-[230px]
              flex-none
              cursor-pointer
              snap-start
              overflow-hidden
              rounded-3xl
              border
              border-orange-200
              bg-white
              text-right
              shadow-md
            "
          >

            <div
              className="
                relative
                h-[145px]
                w-full
                overflow-hidden
                bg-orange-50
              "
            >

              {centerImage ? (

                <img
                  src={centerImage}
                  alt={
                    sportCenter.centerName ||
                    "مرکز ورزشی"
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
                    w-full
                    items-center
                    justify-center
                    text-5xl
                  "
                >
                  🏅
                </div>

              )}

              <div
                className="
                  absolute
                  right-2
                  top-2
                  rounded-full
                  bg-white/95
                  px-3
                  py-1
                  text-[10px]
                  font-black
                  text-[#9a4d13]
                  shadow
                "
              >
                مرکز ورزشی
              </div>

            </div>


            <div className="p-4">

              <h3
                className="
                  truncate
                  text-sm
                  font-black
                  text-[#78350f]
                "
              >
                {sportCenter.centerName ||
                  "مرکز ورزشی ژنینو"}
              </h3>


              {sportCenter.slogan && (

                <p
                  className="
                    mt-1
                    line-clamp-2
                    text-[11px]
                    leading-5
                    text-gray-500
                  "
                >
                  {sportCenter.slogan}
                </p>

              )}


              <div
                className="
                  mt-3
                  flex
                  flex-wrap
                  gap-1.5
                "
              >

                {sportCenter.city && (

                  <span
                    className="
                      rounded-full
                      bg-orange-50
                      px-2
                      py-1
                      text-[10px]
                      font-bold
                      text-[#9a4d13]
                    "
                  >
                    📍 {sportCenter.city}
                  </span>

                )}


                {sportCenter.district && (

                  <span
                    className="
                      rounded-full
                      bg-orange-50
                      px-2
                      py-1
                      text-[10px]
                      font-bold
                      text-[#9a4d13]
                    "
                  >
                    منطقه {sportCenter.district}
                  </span>

                )}


                {sportCenter.gender && (

                  <span
                    className="
                      rounded-full
                      bg-orange-50
                      px-2
                      py-1
                      text-[10px]
                      font-bold
                      text-[#9a4d13]
                    "
                  >
                    {sportCenter.gender}
                  </span>

                )}

              </div>


              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();

                  navigate(
                    `/vendor/service/sport-class/${sportCenter.vendorId}?view=public`
                  );
                }}
                className="
                  mt-4
                  w-full
                  rounded-xl
                  bg-gradient-to-r
                  from-[#9a4d13]
                  via-[#d97706]
                  to-[#f59e0b]
                  py-2
                  text-[11px]
                  font-black
                  text-white
                "
              >
                مشاهده مرکز ورزشی
              </button>

            </div>

          </motion.div>

        );

      })}

    </div>

  </section>

) : null}


{/* 👨‍🏫 معلمان خصوصی ژنینو */}
{privateTeachersLoading ? (

  <div
    className="
      relative
      z-20
      my-6
      w-full
      text-center
    "
  >
    <div
      className="
        mx-auto
        max-w-6xl
        rounded-3xl
        border
        border-emerald-100
        bg-white/80
        px-4
        py-8
        text-sm
        font-bold
        text-emerald-700
        shadow-sm
      "
    >
      در حال دریافت معلمان خصوصی...
    </div>
  </div>

) : privateTeachers.length > 0 ? (

  <section
    dir="rtl"
    className="
      relative
      z-20
      my-6

      w-[calc(100%+3rem)]
      sm:w-full

      rounded-none
      sm:rounded-[2rem]

      border
      border-emerald-100

      bg-gradient-to-br
      from-emerald-50
      via-green-50
      to-white

      p-4
      sm:p-6

      shadow-sm
    "
  >

    <div
      className="
        mx-auto
        mb-4
        flex
        w-full
        max-w-6xl
        items-center
        justify-between
      "
    >

      <h2
        className="
          text-lg
          font-black
          text-[#166534]
          sm:text-xl
        "
      >
        معلمان خصوصی ژنینو
      </h2>

      <button
        type="button"
        onClick={() =>
          navigate(
            "/shop/services/private-teachers"
          )
        }
        className="
          text-xs
          font-black
          text-[#16a34a]
          hover:text-[#166534]
        "
      >
        مشاهده همه
      </button>

    </div>


    <div
      className="
        mx-auto
        flex
        w-full
        max-w-6xl
        gap-4
        overflow-x-auto
        px-3
        pb-4
        snap-x
        snap-mandatory
      "
    >

      {privateTeachers.map((teacher) => {

        const teacherImage =
          teacher.image?.trim()
            ? teacher.image
            : null;

        return (

          <motion.div
            key={teacher.id}
            whileHover={{
              y: -4,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={() =>
              navigate(
                `/vendor/service/private-teacher/${teacher.vendorId}?view=public`
              )
            }
            className="
              group
              w-[230px]
              min-w-[230px]
              flex-none
              cursor-pointer
              snap-start
              overflow-hidden
              rounded-3xl
              border
              border-emerald-200
              bg-white
              text-right
              shadow-md
            "
          >

            <div
              className="
                relative
                h-[145px]
                w-full
                overflow-hidden
                bg-emerald-50
              "
            >

              {teacherImage ? (

                <img
                  src={teacherImage}
                  alt={
                    teacher.teacherName ||
                    "معلم خصوصی"
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
                    w-full
                    items-center
                    justify-center
                    text-5xl
                  "
                >
                  👨‍🏫
                </div>

              )}

              <div
                className="
                  absolute
                  right-2
                  top-2
                  rounded-full
                  bg-white/95
                  px-3
                  py-1
                  text-[10px]
                  font-black
                  text-[#166534]
                  shadow
                "
              >
                معلم خصوصی
              </div>

            </div>


            <div className="p-4">

              <h3
                className="
                  truncate
                  text-sm
                  font-black
                  text-[#14532d]
                "
              >
                {teacher.teacherName ||
                  "معلم خصوصی ژنینو"}
              </h3>


              {teacher.slogan && (

                <p
                  className="
                    mt-1
                    line-clamp-2
                    text-[11px]
                    leading-5
                    text-gray-500
                  "
                >
                  {teacher.slogan}
                </p>

              )}


              <div
                className="
                  mt-3
                  flex
                  flex-wrap
                  gap-1.5
                "
              >

                {teacher.city && (

                  <span
                    className="
                      rounded-full
                      bg-emerald-50
                      px-2
                      py-1
                      text-[10px]
                      font-bold
                      text-[#166534]
                    "
                  >
                    📍 {teacher.city}
                  </span>

                )}


                {teacher.district && (

                  <span
                    className="
                      rounded-full
                      bg-emerald-50
                      px-2
                      py-1
                      text-[10px]
                      font-bold
                      text-[#166534]
                    "
                  >
                    منطقه {teacher.district}
                  </span>

                )}


                {teacher.gender && (

                  <span
                    className="
                      rounded-full
                      bg-emerald-50
                      px-2
                      py-1
                      text-[10px]
                      font-bold
                      text-[#166534]
                    "
                  >
                    {teacher.gender}
                  </span>

                )}

              </div>


              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();

                  navigate(
                    `/vendor/service/private-teacher/${teacher.vendorId}?view=public`
                  );
                }}
                className="
                  mt-4
                  w-full
                  rounded-xl
                  bg-gradient-to-r
                  from-[#166534]
                  via-[#16a34a]
                  to-[#4ade80]
                  py-2
                  text-[11px]
                  font-black
                  text-white
                "
              >
                مشاهده معلم خصوصی
              </button>

            </div>

          </motion.div>

        );
      })}

    </div>

  </section>

) : null}



{/* 🎉 رویدادها و جشن‌ها */}
{eventServices.length > 0 && (
<section
  dir="rtl"
  className="
    relative
    z-20
    my-6
    w-[calc(100%+3rem)]
    sm:w-full
    rounded-none
    sm:rounded-[2rem]
    bg-gradient-to-br
    from-purple-50
    via-purple-100/60
    to-white
    border
    border-purple-100
    p-4
    sm:p-6
    shadow-sm
  "
>

  <div
    className="
      mx-auto
      mb-4
      flex
      w-full
      max-w-6xl
      items-center
      justify-between
    "
  >

    <h2
      className="
        text-lg
        font-black
        text-[#654184]
        sm:text-xl
      "
    >
      رویدادها و جشن‌ها
    </h2>


    <button
      type="button"
      onClick={() =>
        navigate("/events")
      }
      className="
        text-xs
        font-black
        text-[#8b68ad]
        hover:text-[#654184]
      "
    >
      مشاهده همه
    </button>

  </div>


  <div
className="
mx-auto
flex
w-full
max-w-6xl
gap-4
overflow-x-auto
pb-4
px-3
snap-x
snap-mandatory
scrollbar-thin
"
>

    {eventServices.map(
      (service) => (

        <div
          key={service.id}
          className="
            w-[220px]
            min-w-[220px]
            flex-none
          "
        >
          <EventCard
            service={service}
          />
        </div>

      )
    )}

  </div>

</section>
)}


{/* 📚 کلاس‌های آموزشی و دوره‌ها */}
{educationServices.length > 0 && (
<section
  dir="rtl"
  className="
    relative
    z-20
    my-6

    w-[calc(100%+3rem)]
    sm:w-full

    rounded-none
    sm:rounded-[2rem]

    bg-gradient-to-br
    from-green-50
    via-emerald-50
    to-white
    border
    border-green-100
    p-4
    sm:p-6
    shadow-sm
  "
>

  <div
    className="
      mx-auto
      mb-4
      flex
      w-full
      max-w-6xl
      items-center
      justify-between
    "
  >

    <h2
      className="
        text-lg
        font-black
        text-[#166534]
        sm:text-xl
      "
    >
      کلاس‌های آموزشی و دوره‌ها
    </h2>


    <button
      type="button"
      onClick={() =>
        navigate("/classes")
      }
      className="
        text-xs
        font-black
        text-[#22c55e]
        hover:text-[#166534]
      "
    >
      مشاهده همه
    </button>

  </div>


  <div
className="
mx-auto
flex
w-full
max-w-6xl
gap-4
overflow-x-auto
pb-4
px-3
snap-x
snap-mandatory
"
>

    {educationServices.map(
      (service) => (

        <div
          key={service.id}
          className="
            w-[220px]
            min-w-[220px]
            flex-none
          "
        >

          <EducationCard
 service={service}
/>

        </div>

      )
    )}

  </div>

</section>
)}
      


<AnimatePresence>
  {showChildChoiceModal && (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowChildChoiceModal(false)}
    >
      <motion.div
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-yellow-200 text-center"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Baby className="w-12 h-12 text-yellow-600 mx-auto mb-3" />

        <h3 className="text-lg font-extrabold text-yellow-800 mb-2">
          کدام مسیر را انتخاب می‌کنید؟
        </h3>

        <p className="text-sm text-gray-500 mb-5">
         یکی از مسیرهای زیر را انتخاب کنید. 
        </p>

        <div className="grid grid-cols-1 gap-3">

  <button
    type="button"
    onClick={() => {
      setShowChildChoiceModal(false);
      navigate("/mychild");
    }}
    className="
      group w-full
      rounded-2xl
      bg-gradient-to-l from-yellow-400 via-amber-300 to-yellow-500
      hover:from-yellow-500 hover:to-amber-400
      text-yellow-950
      py-4
      font-extrabold
      shadow-[0_10px_25px_rgba(245,158,11,0.22)]
      hover:shadow-[0_14px_35px_rgba(245,158,11,0.34)]
      transition-all duration-300
      hover:-translate-y-1
    "
  >
    <div className="flex items-center justify-center gap-2">
      👶
     کودک من و کودکان فالو شده
    </div>
  </button>


  <button
    type="button"
    onClick={() => {
      setShowChildChoiceModal(false);
      navigate("/genino-children");
    }}
    className="
      group w-full
      rounded-2xl
      bg-gradient-to-l from-yellow-400 via-amber-300 to-yellow-500
      hover:from-yellow-500 hover:to-amber-400
      text-yellow-950
      py-4
      font-extrabold
      shadow-[0_10px_25px_rgba(245,158,11,0.22)]
      hover:shadow-[0_14px_35px_rgba(245,158,11,0.34)]
      transition-all duration-300
      hover:-translate-y-1
    "
  >
    <div className="flex items-center justify-center gap-2">
      ✨
      کودکان ژنینویی
    </div>
  </button>

  <button
    type="button"
    onClick={() => setShowChildChoiceModal(false)}
    className="
      w-full rounded-2xl
      py-2 text-sm text-gray-400
      hover:text-gray-600 transition
    "
  >
    انصراف
  </button>

</div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


<AnimatePresence>
  {showLifeCompanionModal && (
    <motion.div
      className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={closeLifeCompanionModal}
    >
      <motion.div
        className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-rose-200 bg-gradient-to-b from-white via-rose-50/70 to-amber-50 p-5 shadow-2xl"
        initial={{ opacity: 0, y: 26, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 26, scale: 0.92 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-rose-300/35 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-amber-300/35 blur-3xl" />

        <button
          type="button"
          onClick={closeLifeCompanionModal}
          className="absolute left-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-gray-500 shadow-sm transition hover:bg-white hover:text-rose-600"
        >
          <X size={18} />
        </button>

        <div className="relative z-10 text-center">
          <motion.div
            className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-rose-400 via-pink-400 to-amber-300 text-white shadow-[0_14px_40px_rgba(244,114,182,0.35)]"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <HeartHandshake size={38} />
          </motion.div>

          <h2 className="text-xl font-black text-rose-800">
            همراه زندگی من
          </h2>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-8 text-gray-600">
            اینجا فضای دونفره و شخصی شماست؛ جایی برای برنامه‌های مشترک،
            قرارها، لیست‌ها، مراقبت از همدیگر و لحظه‌های مهم زندگی.
          </p>

          <div className="mt-4 rounded-3xl border border-rose-100 bg-white/75 p-4 text-sm font-bold leading-7 text-rose-700 shadow-sm">
            همسر یا شریک زندگی خود را به این صفحه دو نفره شخصی دعوت کنید.
          </div>
        </div>

        <div className="relative z-10 mt-6 space-y-4 text-right">
          <div>
            <label className="mb-1.5 flex items-center gap-2 text-xs font-extrabold text-rose-700">
              <Mail size={15} />
              ایمیل
            </label>
            <input
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              type="email"
              placeholder="مثلاً name@gmail.com"
              className="w-full rounded-2xl border border-rose-100 bg-white/85 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
            />
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-2 text-xs font-extrabold text-rose-700">
              <Phone size={15} />
              یا شماره موبایل
            </label>
            <input
              value={invitePhone}
              onChange={(e) => setInvitePhone(e.target.value)}
              type="text"
              placeholder="مثلاً 0912..."
              className="w-full rounded-2xl border border-rose-100 bg-white/85 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
            />
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-2 text-xs font-extrabold text-rose-700">
              <UserRound size={15} />
              یا نام کاربری
            </label>
            <input
              value={inviteUsername}
              onChange={(e) => setInviteUsername(e.target.value)}
              type="text"
              placeholder="مثلاً user-genino"
              className="w-full rounded-2xl border border-rose-100 bg-white/85 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
            />
          </div>
        </div>

        <div className="relative z-10 mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleSendInvite}
            disabled={isSendingLifeInvite}
            className={`flex-1 rounded-2xl px-5 py-3 text-sm font-extrabold text-white shadow-lg transition-all ${
              isSendingLifeInvite
                ? "bg-gray-300"
                : "bg-gradient-to-l from-rose-500 via-pink-500 to-amber-400 hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            <span className="inline-flex items-center justify-center gap-2">
              <Send size={17} />
              {isSendingLifeInvite ? "در حال ارسال..." : "ارسال دعوت"}
            </span>
          </button>

          <button
            type="button"
            onClick={closeLifeCompanionModal}
            className="rounded-2xl border border-rose-200 bg-white/80 px-5 py-3 text-sm font-extrabold text-rose-700 transition hover:bg-rose-50 sm:w-32"
          >
            بستن
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>



<AnimatePresence>
  {showAppModal && (
    <motion.div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/45 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowAppModal(false)}
    >
      <motion.div
        className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-yellow-200 text-center"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-4xl mb-3">📱</div>

        <p className="text-sm sm:text-base text-gray-600 leading-8 font-bold">
  اپلیکیشن رسمی ژنینو
  <br />
 نوروز ۱۴۰۶ افتتاح می‌شود ✨
  <br />
  اما همین حالا می‌توانید وب‌اپلیکیشن ژنینو را روی گوشی نصب کنید.
</p>

        <button
  type="button"
  onClick={handleInstallPwa}
  className="mt-5 w-full rounded-2xl bg-gradient-to-r from-amber-600 to-yellow-500 py-3 text-white font-bold shadow-md hover:shadow-lg transition"
>
  🌐 دریافت وب‌اپلیکیشن ژنینو
</button>

        <button
          type="button"
          onClick={() => setShowAppModal(false)}
          className="mt-6 w-full rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-400 py-3 text-white font-bold shadow-md hover:shadow-lg transition"
        >
          متوجه شدم
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

            <Footer className="relative z-[2]" />
    </main>
  );
}
