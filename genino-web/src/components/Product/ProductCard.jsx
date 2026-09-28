// src/components/Product/ProductCard.jsx

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductFavoriteButton from "./ProductFavoriteButton";
import DiscountCountdown from "../Core/DiscountCountdown";
import {
  getActiveDiscount,
  formatPrice,
} from "../../utils/productDiscount";



export default function ProductCard({
  product,
  variant = "shop",
  showFavorite = true,
  source = "shop",
  giftTarget = null,

  // مقایسه
  compareMode = false,
  isSelectedForCompare = false,
  onToggleCompare = null,
}) {

  const navigate = useNavigate();



  if (!product) return null;


  const handleClick = () => {

let url =
`/product/${product.id}?mode=${source}`;
if(source==="gift" && giftTarget){
url +=
`&childId=${giftTarget.id}&childName=${encodeURIComponent(
  giftTarget.fullName || giftTarget.name || "کودک"
)}`;
}
navigate(url);
};



  const image =
    product.images?.[0] || null;


  const category =
    product.categoryLinks?.[0]?.productItem ||
    "محصول";


  const brand =
  product.brandFa ||
  product.brandEn ||
  "بدون برند";


const vendorName =
  product.vendor?.businessName ||
  product.vendor?.storeName ||
  product.vendor?.name ||
  product.vendor?.title ||
  "";


const vendorCity =
  product.vendor?.city ||
  "";


const discount =
  getActiveDiscount(product);



  return (
    <>

    <motion.div

      whileHover={{
        y:-3,
      }}

      transition={{
        duration:0.3,
        ease:"easeOut",
      }}

      onClick={(e) => {
  if (e.target.closest("button")) {
    return;
  }

  if (compareMode) {
    onToggleCompare?.(product);
    return;
  }

  handleClick();
}}

      className={`
  group relative flex
${compareMode ? "h-[355px]" : "h-[315px]"}
  w-full
  cursor-pointer
  select-none
  flex-col
  overflow-hidden
  rounded-3xl
  border
  bg-white/90
  p-2.5
  text-right
  backdrop-blur-md
  transition
  duration-300

  ${
    compareMode && isSelectedForCompare
      ? `
        border-[#d4af37]
        ring-2
        ring-[#d4af37]/30
        shadow-[0_18px_45px_rgba(212,175,55,0.20)]
      `
      : `
        border-white/80
        shadow-[0_14px_38px_rgba(120,90,20,0.08)]
        hover:border-yellow-200
        hover:shadow-[0_18px_45px_rgba(120,90,20,0.13)]
      `
  }
`}

    >



      {/* دسته محصول */}

      <div
        className="
        absolute
        right-3
        top-3
        z-10
        max-w-[75%]
        truncate
        rounded-full
        bg-yellow-50
        px-2
        py-1
        text-[10px]
        font-bold
        text-yellow-700
        shadow-sm
        "
      >
        {category}
      </div>

      {showFavorite &&
  !compareMode &&
  !localStorage.getItem("genino_vendor_id") && (
    <ProductFavoriteButton
      productId={product.id}
    />
)}




      {/* تصویر */}

      <div
        className="
        flex
        h-36
        items-center
        justify-center
        overflow-hidden
        rounded-2xl
        bg-gradient-to-br
        from-[#fffaf0]
        to-[#f7efd9]
        "
      >

        {
          image ?

          (

          <img
  src={image}
  alt={product.title}
  draggable="false"
  className="
  h-32
  w-32
  object-contain
  transition
  duration-300
  group-hover:scale-105
  "
/>

          )

          :

          (

          <ShoppingBag
            className="
            h-12
            w-12
            text-yellow-600
            "
          />

          )

        }


      </div>




      {/* اطلاعات محصول */}

      <div
        dir="rtl"
        className="
        flex
        flex-1
        flex-col
        px-1
        pt-3
        text-right
        "
      >


        <h3
          className="
          line-clamp-1
          text-sm
          font-extrabold
          text-gray-800
          "
        >

          {product.title || "محصول ژنینو"}

        </h3>



        <div className="mt-1 space-y-0.5">

  <p
    className="
    line-clamp-1
    text-xs
    text-gray-400
    "
  >
    برند: {brand}
  </p>


  {vendorName && (
    <p
      className="
      line-clamp-1
      text-xs
      text-gray-400
      "
    >
      فروشنده: {vendorName}
    </p>
  )}


  {vendorCity && (
    <p
      className="
      line-clamp-1
      text-xs
      text-gray-400
      "
    >
      شهر: {vendorCity}
    </p>
  )}

</div>





        {/* قیمت */}

        <div
          className="
          mt-3
          min-h-[65px]
          "
        >


          {
            discount ?

            (

            <>

              <div
                className="
                flex
                items-center
                justify-between
                gap-2
                "
              >

                <p
                  className="
                  text-[10px]
                  text-gray-400
                  line-through
                  "
                >

                  {formatPrice(discount.oldPrice)}

                </p>



                <span
                  className="
                  rounded-full
                  bg-red-500
                  px-2
                  py-0.5
                  text-[9px]
                  font-bold
                  text-white
                  "
                >

                  {
                    discount.type === "PERCENT"
                    ?
                    `${discount.value}٪ تخفیف`
                    :
                    "تخفیف ویژه"
                  }

                </span>


              </div>




              <p
                className="
                mt-1
                text-sm
                font-black
                text-yellow-700
                "
              >

                {formatPrice(discount.finalPrice)}

              </p>




              {
                product.discountEndAt &&

                <DiscountCountdown
                  endDate={product.discountEndAt}
                />

              }


            </>

            )


            :


            (

            <p
              className="
              mt-5
              text-sm
              font-black
              text-yellow-700
              "
            >

              {formatPrice(product.price)}

            </p>

            )


          }


        </div>



      </div>


      {compareMode && (
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      onToggleCompare?.(product);
    }}
    className={`
      absolute
      bottom-2.5
      left-2.5
      right-2.5
      z-20
      rounded-xl
      py-2
      text-[10px]
      font-black
      transition
      sm:text-[11px]

      ${
        isSelectedForCompare
          ? `
            bg-[#4b2f17]
            text-white
            shadow-md
          `
          : `
            bg-gradient-to-r
            from-[#7a5526]
            via-[#b88724]
            to-[#d4af37]
            text-white
            shadow-sm
          `
      }
    `}
  >
    {isSelectedForCompare
      ? "✓ انتخاب شده"
      : "+ افزودن به مقایسه"}
  </button>
)}


        </motion.div>




    </>

  );
}