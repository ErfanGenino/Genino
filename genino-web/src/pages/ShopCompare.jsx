import { motion } from "framer-motion";
import { ShoppingBag, Building2, ArrowLeft, Scale } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ShopCompare() {
  const navigate = useNavigate();

  const productCategories = [
  {
    title: "سیسمونی تخصصی",
    slug: "sismooni",
  },
  {
    title: "نوزاد، کودک و نوجوان",
    slug: "kids",
  },
  {
    title: "مد و پوشاک",
    slug: "fashion",
  },
  {
    title: "کالای خواب و حمام",
    slug: "bed-bath",
  },
  {
    title: "ساعت و زیورآلات",
    slug: "watch-jewelry",
  },
  {
    title: "کالای ورزشی",
    slug: "sport",
  },
  {
    title: "سلامت و پزشکی",
    slug: "medical",
  },
  {
    title: "آرایشی و بهداشتی",
    slug: "beauty",
  },
  {
    title: "عطر و ادکلن",
    slug: "perfume",
  },
  {
    title: "صنایع دستی",
    slug: "handmade",
  },
];

const serviceCategories = [
  {
    title: "مدارس",
    slug: "schools",
  },
  {
    title: "مهدکودک‌ها",
    slug: "kindergartens",
  },
  {
    title: "خانه‌های بازی",
    slug: "playhouses",
  },
  {
    title: "کلاس‌های آموزشی",
    slug: "education-classes",
  },
  {
    title: "کلاس‌های هنری",
    slug: "art-classes",
  },
  {
    title: "کلاس‌های ورزشی",
    slug: "sport-classes",
  },
  {
    title: "معلمان خصوصی",
    slug: "private-teachers",
  },
];


 

  return (
    <main
      dir="rtl"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#faf7ef]
        px-4
        py-8
        text-gray-800
        sm:px-6
        lg:px-8
      "
    >
      {/* بک‌گراند نرم */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yellow-200/30 blur-3xl" />

        <div className="absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-amber-100/60 blur-3xl" />

        <div className="absolute bottom-0 right-1/3 h-64 w-64 rounded-full bg-white/80 blur-3xl" />
      </div>

      <section className="relative z-10 mx-auto max-w-5xl">
        {/* دکمه بازگشت */}
        <div className="mb-5 flex justify-start">
          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-yellow-200
              bg-white/80
              px-4
              py-2
              text-xs
              font-bold
              text-[#7a5526]
              shadow-sm
              backdrop-blur
              transition
              hover:bg-yellow-50
            "
          >
            <ArrowLeft className="h-4 w-4 rotate-180" />

            بازگشت به فروشگاه
          </button>
        </div>

        {/* هدر جمع‌وجور */}
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.35 }}
  className="
    mx-auto
    max-w-3xl
    rounded-2xl
    border
    border-yellow-200/60
    bg-white/80
    px-3
    py-3
    shadow-sm
    backdrop-blur-xl
    sm:px-4
    sm:py-3
  "
>
  <div className="flex items-center gap-3">
    {/* آیکون */}
    <div
      className="
        flex
        h-9
        w-9
        shrink-0
        items-center
        justify-center
        rounded-xl
        bg-gradient-to-br
        from-[#7a5526]
        via-[#b88724]
        to-[#d4af37]
        shadow-sm
      "
    >
      <Scale className="h-4 w-4 text-white" />
    </div>

    {/* متن */}
    <div className="min-w-0 text-right">
      <h1 className="text-sm font-black text-[#4b2f17] sm:text-base">
        مقایسه تخصصی ژنینو
      </h1>

      <p className="mt-0.5 text-[10px] leading-5 text-gray-500 sm:text-xs">
        انتخاب آگاهانه‌تر با مقایسه دقیق کالاها و خدمات
      </p>
    </div>
  </div>
</motion.div>

        {/* انتخاب نوع مقایسه */}
<div className="mx-auto mt-4 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">

  {/* =========================
      مقایسه کالاها
  ========================== */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.1 }}
    className="
      relative
      overflow-hidden
      rounded-[1.8rem]
      border
      border-yellow-200/70
      bg-white
      p-5
      shadow-[0_12px_35px_rgba(120,90,20,0.08)]
      sm:p-6
    "
  >
    {/* نور داخلی */}
    <div className="pointer-events-none absolute -left-12 -top-12 h-32 w-32 rounded-full bg-yellow-100/60 blur-2xl" />

    <div className="relative">

      {/* عنوان کارت */}
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#faf7ef]
            text-[#a97822]
            shadow-inner
          "
        >
          <ShoppingBag className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-sm font-black text-[#4b2f17] sm:text-base">
            مقایسه کالاها
          </h2>

          <p className="mt-1 text-[10px] text-gray-500 sm:text-[11px]">
            ابتدا دسته کالای موردنظر را انتخاب کنید
          </p>
        </div>
      </div>

      {/* دسته‌بندی کالاها */}
      <div className="mt-5 grid grid-cols-2 gap-2">
        {productCategories.map((category) => (
          <motion.button
            key={category.slug}
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() =>
  navigate(
    `/shop?view=compare-products&category=${encodeURIComponent(
      category.title
    )}`
  )
}
            className="
              group
              flex
              min-h-[46px]
              items-center
              justify-between
              gap-2
              rounded-xl
              border
              border-yellow-100
              bg-[#faf7ef]
              px-3
              py-2
              text-right
              transition
              hover:border-[#d4af37]/50
              hover:bg-[#fff8e7]
              hover:shadow-sm
            "
          >
            <span
              className="
                text-[10px]
                font-bold
                leading-5
                text-[#5f4529]
                sm:text-[11px]
              "
            >
              {category.title}
            </span>

            <ArrowLeft
              className="
                h-3.5
                w-3.5
                shrink-0
                text-[#c49a3a]
                transition-transform
                group-hover:-translate-x-1
              "
            />
          </motion.button>
        ))}
      </div>
    </div>
  </motion.div>


  {/* =========================
    مقایسه خدمات
========================== */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0.18 }}
  className="
    relative
    overflow-hidden
    rounded-[1.8rem]
    border
    border-yellow-200/70
    bg-white
    p-5
    shadow-[0_12px_35px_rgba(120,90,20,0.08)]
    sm:p-6
  "
>
  {/* نور داخلی */}
  <div className="pointer-events-none absolute -left-12 -top-12 h-32 w-32 rounded-full bg-yellow-100/60 blur-2xl" />

  <div className="relative">

    {/* عنوان کارت */}
    <div className="flex items-center gap-3">
      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-[#faf7ef]
          text-[#a97822]
          shadow-inner
        "
      >
        <Building2 className="h-5 w-5" />
      </div>

      <div>
        <h2 className="text-sm font-black text-[#4b2f17] sm:text-base">
          مقایسه خدمات
        </h2>

        <p className="mt-1 text-[10px] text-gray-500 sm:text-[11px]">
          ابتدا نوع خدمت موردنظر را انتخاب کنید
        </p>
      </div>
    </div>

    {/* دسته‌بندی خدمات */}
    <div className="mt-5 grid grid-cols-2 gap-2">
      {serviceCategories.map((category) => (
        <motion.button
          key={category.slug}
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => {
  const serviceMap = {
    schools: "school",
    kindergartens: "kindergarten",
    playhouses: "playhouse",
    "education-classes": "education-class",
    "art-classes": "art-class",
    "sport-classes": "sport-class",
    "private-teachers": "private-teacher",
  };

  const service = serviceMap[category.slug];

  if (!service) return;

  navigate(
    `/shop?view=compare-services&service=${service}`
  );
}}
          className="
            group
            flex
            min-h-[46px]
            items-center
            justify-between
            gap-2
            rounded-xl
            border
            border-yellow-100
            bg-[#faf7ef]
            px-3
            py-2
            text-right
            transition
            hover:border-[#d4af37]/50
            hover:bg-[#fff8e7]
            hover:shadow-sm
          "
        >
          <span
            className="
              text-[10px]
              font-bold
              leading-5
              text-[#5f4529]
              sm:text-[11px]
            "
          >
            {category.title}
          </span>

          <ArrowLeft
            className="
              h-3.5
              w-3.5
              shrink-0
              text-[#c49a3a]
              transition-transform
              group-hover:-translate-x-1
            "
          />
        </motion.button>
      ))}
    </div>

  </div>
</motion.div>

</div>

        {/* توضیح پایین */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="
            mx-auto
            mt-8
            max-w-3xl
            rounded-2xl
            border
            border-yellow-100
            bg-white/60
            px-5
            py-4
            text-center
            shadow-sm
            backdrop-blur
          "
        >
          <p className="text-[11px] leading-6 text-gray-500 sm:text-xs">
            در مقایسه تخصصی ژنینو می‌توانید گزینه‌های هم‌گروه را انتخاب
            کرده و مشخصات مهم آن‌ها را به‌صورت کنارهم بررسی کنید.
          </p>
        </motion.div>
      </section>
    </main>
  );
}