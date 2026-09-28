// 📄 src/components/Core/ScrollProduct.jsx

import {
  motion,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import {
  useRef,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useFavoriteProducts } from "../../context/FavoriteProductsContext";
import ProductCard from "../Product/ProductCard";
import normalizeProduct from "../../utils/normalizeProduct";


/**
 * 🌟 ScrollProduct
 * ----------------------------------------------------
 * اسکرول افقی محصولات ژنینو
 *
 * props:
 * - title
 * - items
 * - autoScroll
 * - interval
 * - color
 * - variant: "default" | "shop" | "service"
 */
export default function ScrollProduct({
  title = "لیست محصولات",
  titleLink = "",
  items = [],
  autoScroll = true,
  interval = 6000,
  color = "yellow",
  variant = "default",
}) {
  const navigate = useNavigate();

  const {
  isFavorite,
  toggleFavorite,
  isPending,
  canUseFavorites,
} = useFavoriteProducts();

  const trackRef = useRef(null);
  const oneSetWidthRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const x = useMotionValue(0);

  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  

  useEffect(() => {
  const mediaQuery = window.matchMedia("(max-width: 639px)");

  const updateDeviceType = () => {
    setIsMobile(mediaQuery.matches);
  };

  updateDeviceType();

  mediaQuery.addEventListener("change", updateDeviceType);

  return () => {
    mediaQuery.removeEventListener("change", updateDeviceType);
  };
}, []);

  const canLoop = isMobile
  ? items.length >= 2
  : items.length >= 5;

  const normalizedItems = useMemo(() => {
  if (variant === "service") {
    return items.map((item) => {
      const images = Array.isArray(item.images)
        ? item.images
        : [];

      const headerImages = Array.isArray(item.headerImages)
        ? item.headerImages
        : [];

      const firstImage =
        item.image ||
        item.imageUrl ||
        item.thumbnailUrl ||
        item.coverImage ||
        (
          typeof images[0] === "string"
            ? images[0]
            : images[0]?.url
        ) ||
        (
          typeof headerImages[0] === "string"
            ? headerImages[0]
            : headerImages[0]?.url
        ) ||
        "";

      return {
        ...item,

        id: item.id,

        name:
          item.name ||
          item.title ||
          item.kindergartenName ||
          item.schoolName ||
          "خدمت ژنینو",

        image: firstImage,
      };
    });
  }

  return items
    .map((item) => normalizeProduct(item))
    .filter(Boolean);

}, [items, variant]);

const loopItems = useMemo(() => {
  if (!normalizedItems.length) return [];

  if (!canLoop) {
    return normalizedItems;
  }

  return [
  ...normalizedItems,
  ...normalizedItems,
  ...normalizedItems
];
}, [items, canLoop]);

  const normalizeX = () => {
    const oneSetWidth = oneSetWidthRef.current;

    if (!oneSetWidth) return;

    const currentX = x.get();

    if (currentX >= 0) {
      x.set(currentX - oneSetWidth);
    }

    if (currentX <= -oneSetWidth * 2) {
      x.set(currentX + oneSetWidth);
    }
  };

  useEffect(() => {
  const calculateWidth = () => {
    if (!trackRef.current) return;

    if (!canLoop) {
      oneSetWidthRef.current = 0;
      x.set(0);
      return;
    }

    const oneSetWidth = trackRef.current.scrollWidth / 3;

    oneSetWidthRef.current = oneSetWidth;
    x.set(-oneSetWidth);
  };

  const timer = setTimeout(calculateWidth, 150);

  window.addEventListener("resize", calculateWidth);

  return () => {
    clearTimeout(timer);
    window.removeEventListener("resize", calculateWidth);
  };
}, [items.length, canLoop, x]);

  useAnimationFrame((_, delta) => {
  if (
    !autoScroll ||
    !canLoop ||
    isDragging ||
    !items.length
  ) {
    return;
  }

  const speed = Math.max(10, 132000 / interval);

  x.set(x.get() + speed * (delta / 1000));

  normalizeX();
});

  const colorClasses =
    color === "pink"
      ? "text-pink-600 border-pink-100"
      : color === "emerald"
      ? "text-emerald-600 border-emerald-100"
      : color === "blue"
      ? "text-blue-600 border-blue-100"
      : color === "amber"
      ? "text-amber-600 border-amber-100"
      : "text-yellow-600 border-yellow-100";

  const handleProductClick = (item) => {
    if (hasDraggedRef.current) return;

    navigate(item.link || `/product/${item.id}`);
  };

  



  return (
    <section
      dir="rtl"
      className="
        relative z-10
        mx-auto mb-14 mt-10
        w-full max-w-5xl
        text-center
      "
    >
      {/* عنوان */}
<div className="relative mb-6 flex items-center justify-center">
  {titleLink ? (
    <Link
      to={titleLink}
      className={`
        text-lg font-bold sm:text-xl
        transition-colors duration-200
        hover:opacity-80
        ${colorClasses.split(" ")[0]}
      `}
    >
      {title}
    </Link>
  ) : (
    <h2
      className={`text-lg font-bold sm:text-xl ${
        colorClasses.split(" ")[0]
      }`}
    >
      {title}
    </h2>
  )}
</div>

      {/* لیست محصولات */}
      <div
        dir="ltr"
        className="
          relative w-full
          touch-pan-y overflow-hidden
          py-3
        "
      >
        <motion.div
          ref={trackRef}
          className={`
  flex items-stretch gap-3 px-2 sm:gap-4
  ${
    canLoop
      ? "w-max"
      : "w-full justify-center"
  }
  ${
    canLoop
  ? "cursor-grab active:cursor-grabbing"
  : "cursor-default"
  }
`}
          style={{ x }}
          drag={canLoop ? "x" : false}
          dragMomentum={false}
          dragElastic={0}
          onDragStart={() => {
            hasDraggedRef.current = true;
            setIsDragging(true);
          }}
          onDrag={canLoop ? normalizeX : undefined}
          onDragEnd={() => {
  if (canLoop) {
    normalizeX();
  }

  setIsDragging(false);

  setTimeout(() => {
    hasDraggedRef.current = false;
  }, 100);
}}
        >
          {loopItems.map((item,index)=>

variant === "service" ? (

<div
key={`${item.id}-${index}`}
className="
shrink-0
w-[210px]
sm:w-[220px]
md:w-[240px]
"
>

<motion.div
whileHover={{y:-4}}
className="
overflow-hidden
rounded-[1.4rem]
border
border-yellow-100
bg-white
shadow-md
cursor-pointer
"
onClick={() => {

  const type =
    String(item.serviceType || "")
      .toLowerCase();

  if (
    type.includes("kindergarten") ||
    type.includes("مهد")
  ) {
    navigate(
      `/vendor/service/kindergarten/${item.vendorId}`
    );
    return;
  }

  navigate(
    `/vendor/service/school/${item.vendorId}`
  );

}}
>

<div className="
relative
h-28
overflow-hidden
bg-[#faf7ef]
">

{item.image ? (
  <img
    src={item.image}
    alt={item.name || "خدمت ژنینو"}
    className="
      h-full
      w-full
      object-cover
    "
    onError={(e) => {
      e.currentTarget.style.display = "none";
    }}
  />
) : (
  <div
    className="
      flex
      h-full
      w-full
      items-center
      justify-center
      text-4xl
    "
  >
    🏫
  </div>
)}


<span className="
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
">

{item.serviceType}

</span>

</div>


<div className="p-3 text-right">

<h3 className="
text-sm
font-black
text-[#4b2f17]
truncate
">
{item.name}
</h3>


<div
className="
mt-2
flex
flex-wrap
gap-1
"
>

{item.gender && (
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
{item.gender}
</span>
)}


{item.city && (
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
{item.city}
</span>
)}


{item.district && (
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
منطقه {item.district}
</span>
)}

</div>


<button
className="
mt-3
w-full
rounded-xl
bg-gradient-to-r
from-[#7a5526]
to-[#d4af37]
py-2
text-[11px]
font-black
text-white
"
>
مشاهده
</button>


</div>


</motion.div>

</div>


) : variant === "shop" ? (

    <div
  key={`${item.id}-${index}`}
  className="
    shrink-0
    w-[210px]
    sm:w-[220px]
    md:w-[240px]
  "
>
  <ProductCard
  product={item}
  variant="shop"
  source="shop"
/>
</div>

  ) : (
    <motion.div
      key={`${item.id}-${index}`}
      whileHover={{ y: -3 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      onClick={() => handleProductClick(item)}
      className="
        group relative flex h-[285px] shrink-0 flex-col
        w-[46vw]
        cursor-pointer select-none
        overflow-hidden rounded-3xl
        border border-white/80
        bg-white/90 p-2.5
      "
    >
      <img
        src={item.image}
        alt={item.name}
        className="
          mx-auto mt-4
          h-20 w-20
          object-contain
        "
      />

      <div
        dir="rtl"
        className="p-3 text-center"
      >
        <h3 className="text-sm font-bold">
          {item.name}
        </h3>

        <p className="text-yellow-600 font-bold">
  {
    Number.isFinite(Number(item.price))
    ?
    item.price
    :
    "قیمت نامشخص"
  }
</p>
      </div>

    </motion.div>
  )
)}
              
                
        </motion.div>
      </div>
    </section>
  );
}