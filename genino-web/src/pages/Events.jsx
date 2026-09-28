// 📄 src/pages/Events.jsx

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  PartyPopper,
  Search,
  X,
  Ticket,
} from "lucide-react";
import {
  useNavigate
} from "react-router-dom";
import TodayCalendarBox from "@components/Dashboard/TodayCalendarBox";
import EventCard from "../components/Events/EventCard";


export default function Events() {

  const navigate =
    useNavigate();

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL;


  const [services, setServices] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [searchText, setSearchText] =
  useState("");


  /*
  |--------------------------------------------------------------------------
  | دریافت خدمات منتشرشده
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    async function loadServices() {

      try {

        setLoading(true);
        setError("");


        const res = await fetch(
          `${API_BASE_URL}/vendor-services/public/events`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );


        const data = await res.json();


        if (!res.ok || !data?.ok) {

          throw new Error(
            data?.message ||
            "خطا در دریافت خدمات"
          );

        }


        setServices(
  Array.isArray(data.services)
    ? [...data.services].sort(
        (a,b)=>
          new Date(b.createdAt)
          -
          new Date(a.createdAt)
      )
    : []
);


      } catch (error) {

        console.error(
          "LOAD EVENTS SERVICES ERROR:",
          error
        );

        setError(
          "دریافت رویدادها انجام نشد."
        );

        setServices([]);

      } finally {

        setLoading(false);

      }

    }


    loadServices();

  }, [API_BASE_URL]);


  const getServiceTypeLabel = (
  serviceType
) => {

  const labels = {
    EVENT: "جشن و رویداد",
    CLASS: "کلاس",
    WORKSHOP: "کارگاه",
    CAMP: "اردو",
    CONSULTATION: "مشاوره",
    OTHER: "سایر خدمات",
  };

  return (
    labels[serviceType] ||
    "خدمت"
  );

};


  /*
  |--------------------------------------------------------------------------
  | فقط خدمات منتشرشده
  |--------------------------------------------------------------------------
  */

  const publishedServices =
  useMemo(() => {

    const query =
      searchText
        .trim()
        .toLowerCase();

    return services.filter(
      (service) => {

        if (
          service.status !==
          "PUBLISHED"
        ) {
          return false;
        }

        if (!query) {
          return true;
        }

        const searchableText = [
          service.title,
          service.description,
          service.locationName,

          service.vendor
            ?.schoolProfile
            ?.schoolName,

          service.vendor
            ?.businessName,

          service.schoolName,
          service.organizerName,

          getServiceTypeLabel(
            service.serviceType
          ),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(
          query
        );

      }
    );

  }, [services, searchText]);






 



  return (
  <main
    dir="rtl"
    className="
  relative
  min-h-screen
  overflow-hidden
  bg-gradient-to-br
  from-[#faf8ff]
  via-[#f1eafd]
  to-[#e7dcf8]
  pb-24
  pt-20
"
  >

    {/* تزئینات بسیار محو پس‌زمینه */}

<div
  className="
    pointer-events-none
    absolute
    -right-40
    -top-40
    h-[34rem]
    w-[34rem]
    rounded-full
    bg-[#b99ae8]/20
    blur-[110px]
  "
/>

<div
  className="
    pointer-events-none
    absolute
    -left-40
    top-[32rem]
    h-[32rem]
    w-[32rem]
    rounded-full
    bg-[#d8c4f3]/30
    blur-[120px]
  "
/>

<div
  className="
    pointer-events-none
    absolute
    bottom-0
    right-1/3
    h-[30rem]
    w-[30rem]
    rounded-full
    bg-[#f0d98c]/15
    blur-[130px]
  "
/>


{/* بادکنک‌های محو سمت راست */}

<div
  className="
    pointer-events-none
    absolute
    right-[3%]
    top-[19rem]
    hidden
    opacity-[0.10]
    lg:block
  "
>
  <div
    className="
      h-24
      w-20
      rotate-[-8deg]
      rounded-[50%]
      border-2
      border-[#7445a5]
      bg-[#b99ae8]/30
    "
  />

  <div
    className="
      mr-10
      h-28
      w-px
      rotate-[8deg]
      bg-[#7445a5]
    "
  />
</div>


{/* بادکنک‌های محو سمت چپ */}

<div
  className="
    pointer-events-none
    absolute
    left-[4%]
    top-[42rem]
    hidden
    opacity-[0.08]
    lg:block
  "
>
  <div
    className="
      h-20
      w-16
      rotate-[10deg]
      rounded-[50%]
      border-2
      border-[#9b70c7]
      bg-[#d8c4f3]/40
    "
  />

  <div
    className="
      ml-8
      h-24
      w-px
      -rotate-[10deg]
      bg-[#9b70c7]
    "
  />
</div>


{/* نقاط جشن بسیار ظریف */}

<div
  className="
    pointer-events-none
    absolute
    left-[15%]
    top-[15rem]
    h-2
    w-2
    rounded-full
    bg-[#b88724]/20
  "
/>

<div
  className="
    pointer-events-none
    absolute
    right-[18%]
    top-[35rem]
    h-3
    w-3
    rounded-full
    bg-[#8b5bb5]/15
  "
/>

<div
  className="
    pointer-events-none
    absolute
    left-[25%]
    top-[55rem]
    h-2
    w-2
    rounded-full
    bg-[#d4af37]/20
  "
/>

<div
  className="
    relative
    z-10
    mx-auto
    w-full
    max-w-7xl
    px-4
    sm:px-6
  "
>

      {/* هدر لوکس */}

      <motion.section
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="
          relative
          overflow-hidden
          rounded-[2.5rem]
          border
          border-white/80
          bg-white/75
          px-5
          py-8
          text-center
          shadow-[0_25px_70px_rgba(103,72,25,0.12)]
          backdrop-blur-xl
          sm:px-10
          sm:py-12
        "
      >

        {/* خط تزئینی */}

        <div
          className="
            absolute
            left-1/2
            top-0
            h-1
            w-40
            -translate-x-1/2
            rounded-b-full
            bg-gradient-to-r
            from-transparent
            via-[#d4af37]
            to-transparent
          "
        />


        <div
          className="
            mx-auto
            mb-4
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-[#f7e7ac]
            via-[#e6c75f]
            to-[#b88724]
            text-white
            shadow-lg
          "
        >
          <PartyPopper
            className="
              h-7
              w-7
            "
          />
        </div>


        <p
          className="
            mb-2
            text-xs
            font-black
            tracking-[0.25em]
            text-[#b88724]
          "
        >
          GENINO EVENTS
        </p>


        <h1
          className="
            text-3xl
            font-black
            text-[#5f3e16]
            sm:text-5xl
          "
        >
          رویدادها و جشن‌های ژنینو
        </h1>


        <p
          className="
            mx-auto
            mt-4
            max-w-2xl
            text-sm
            font-medium
            leading-7
            text-stone-500
            sm:text-base
          "
        >
          مجموعه‌ای از جشن‌ها، کلاس‌ها، کارگاه‌ها، اردوها
          و تجربه‌های جذاب برای کودکان و خانواده‌ها
        </p>


        <div
          className="
            mx-auto
            mt-5
            h-px
            w-32
            bg-gradient-to-r
            from-transparent
            via-[#d4af37]
            to-transparent
          "
        />

      </motion.section>


      {/* تقویم امروز */}

      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          delay: 0.1,
        }}
        className="
          mx-auto
          mt-6
          max-w-xl
        "
      >
        <div
          className="
            rounded-[2rem]
            border
            border-white
            bg-white/70
            p-3
            shadow-[0_15px_50px_rgba(103,72,25,0.08)]
            backdrop-blur-xl
          "
        >
          <TodayCalendarBox
            color="yellow"
          />
        </div>
      </motion.div>


      {/* سرچ رویدادها */}

<motion.div
  initial={{
    opacity: 0,
    y: 10,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 0.45,
    delay: 0.2,
  }}
  className="
    mx-auto
    mt-5
    w-full
    max-w-md
  "
>

  <div
    className="
      flex
      items-center
      gap-2
      rounded-2xl
      border
      border-purple-200/70
      bg-white/60
      px-3
      py-2
      shadow-[0_15px_40px_rgba(31,18,56,0.20)]
      backdrop-blur-xl
      transition
      focus-within:border-white/50
      focus-within:bg-white/20
    "
  >

    <Search
      className="
        h-4
        w-4
        shrink-0
        text-[#8b68ad]
      "
    />

    <input
      type="text"
      value={searchText}
      onChange={(e) =>
        setSearchText(
          e.target.value
        )
      }
      placeholder="جستجوی رویداد، برگزارکننده یا محل..."
      className="
        min-w-0
        flex-1
        bg-transparent
        py-1.5
        text-xs
        font-medium
        text-[#4d3268]
        outline-none
        placeholder:text-[#9a83ae]
        sm:text-sm
      "
    />

    {searchText && (

      <button
        type="button"
        onClick={() =>
          setSearchText("")
        }
        className="
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-white/15
          text-white/80
          transition
          hover:bg-white/25
          hover:text-white
        "
        title="پاک کردن جستجو"
      >
        <X
          className="
            h-3.5
            w-3.5
          "
        />
      </button>

    )}

  </div>

</motion.div>


{/* رزروهای من */}

<motion.div
  initial={{
    opacity: 0,
    y: 10,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 0.45,
    delay: 0.25,
  }}
  className="
    mx-auto
    mt-5
    w-full
    max-w-md
  "
>

  <button
    type="button"
    onClick={() =>
      navigate("/my-reservations")
    }
    className="
      flex
      w-full
      items-center
      justify-center
      gap-2
      rounded-2xl
      border
      border-purple-200
      bg-white/70
      px-5
      py-3
      text-sm
      font-black
      text-[#76529a]
      shadow-[0_15px_40px_rgba(31,18,56,0.10)]
      backdrop-blur-xl
      transition
      hover:-translate-y-1
      hover:shadow-lg
    "
  >

    <Ticket
      className="
        h-5
        w-5
      "
    />

    مشاهده رزروهای من

  </button>

</motion.div>


      {/* عنوان لیست */}

      <div
        className="
          mb-5
          mt-12
          flex
          items-end
          justify-between
          gap-3
        "
      >

        <div>
         <p
  className="
    text-xs
    font-black
    text-[#8e68b5]
  "
>
  انتخاب تجربه بعدی
</p>

<h2
  className="
    mt-1
    text-2xl
    font-black
    text-[#4d3268]
    sm:text-3xl
  "
>
  رویدادها و خدمات
</h2>
        </div>


        {!loading && (
          <span
            className="
  rounded-full
  border
  border-purple-200/70
  bg-white/60
  px-4
  py-2
  text-xs
  font-black
  text-[#725092]
  shadow-sm
  backdrop-blur-xl
"
          >
            {publishedServices.length}
            {" "}
            رویداد
          </span>
        )}

      </div>


      {/* Loading */}

      {loading ? (

        <div
          className="
            rounded-[2rem]
            border
            border-white
            bg-white/70
            py-20
            text-center
            text-sm
            font-bold
            text-[#8a651e]
            shadow-xl
            backdrop-blur-xl
          "
        >
          در حال دریافت رویدادهای ژنینو...
        </div>

      ) : error ? (

        <div
          className="
            rounded-[2rem]
            border
            border-red-100
            bg-red-50/90
            py-14
            text-center
            text-sm
            font-bold
            text-red-500
          "
        >
          {error}
        </div>

      ) : publishedServices.length === 0 ? (

        <div
          className="
            rounded-[2rem]
            border
            border-white
            bg-white/70
            py-20
            text-center
            text-sm
            text-stone-500
            shadow-xl
            backdrop-blur-xl
          "
        >
         {searchText
  ? "نتیجه‌ای برای جستجوی شما پیدا نشد."
  : "هنوز رویداد یا خدمت منتشرشده‌ای وجود ندارد."
} 
        </div>

      ) : (

        <div
  className="
    grid
    grid-cols-2
    gap-3
    sm:grid-cols-3
    sm:gap-5
    md:grid-cols-4
    lg:grid-cols-5
  "
>

  {publishedServices.map(
    (service) => (

      <EventCard
        key={service.id}
        service={service}
      />

    )
  )}

</div>

      )}

    </div>

  </main>
);

}