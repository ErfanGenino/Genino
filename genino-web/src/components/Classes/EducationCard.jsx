// D:\projects\Genino\genino-web\src\components\Classes\EducationCard.jsx

import { motion } from "framer-motion";
import {
  CalendarDays,
  UsersRound,
  Clock3,
  MapPin,
  GraduationCap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function EducationCard({
  service,
  className = "",
}) {

  const navigate = useNavigate();



  const getMainImage = () => {

    const images =
      Array.isArray(service.images)
        ? service.images
        : [];

    return (
      images[
        Number(
          service.mainImageIndex || 0
        )
      ]
      ||
      images[0]
      ||
      ""
    );

  };



  const getOrganizerName = () => {

    return (
      service.vendor
        ?.schoolProfile
        ?.schoolName
      ||
      service.vendor
        ?.businessName
      ||
      "برگزارکننده ژنینویی"
    );

  };



  const getPackageInfo = () => {

    return (
      service.package
      ||
      {}
    );

  };



  const packageInfo =
    getPackageInfo();



  const totalSessions =
    packageInfo.totalSessions
    ||
    service.totalSessions
    ||
    0;



  const startDate =
    packageInfo.startDate
    ?
    new Date(
      packageInfo.startDate
    ).toLocaleDateString(
      "fa-IR"
    )
    :
    "تاریخ شروع ثبت نشده";



  const capacity =
    packageInfo.capacity
    ||
    service.capacity
    ||
    0;



  const mainImage =
    getMainImage();


  const organizerName =
    getOrganizerName();

  const city =
  service?.vendor?.city ||
  service?.city ||
  "";



  const ageText =
    service.minAge !== null &&
    service.minAge !== undefined
    ?
    `${service.minAge} تا ${service.maxAge} سال`
    :
    "تمام سنین";




  return (

    <motion.article

      initial={{
        opacity:0,
        y:15,
      }}

      whileInView={{
        opacity:1,
        y:0,
      }}

      viewport={{
        once:true,
      }}

      whileHover={{
        y:-6,
      }}

      transition={{
        duration:.25,
      }}

      className={`
        group
        overflow-hidden
        rounded-[1.6rem]
        border
        border-white
        bg-white/90
        shadow-[0_12px_35px_rgba(22,101,52,0.10)]
        transition
        hover:shadow-[0_20px_50px_rgba(22,101,52,0.18)]

        ${className}
      `}

    >


      {/* تصویر */}

      <div
        className="
          relative
          h-36
          overflow-hidden
          bg-[#eef8ef]
        "
      >

        {
          mainImage
          ?

          <img
            src={mainImage}
            alt={service.title}
            className="
              h-full
              w-full
              object-cover
              transition
              duration-500
              group-hover:scale-105
            "
          />

          :

          <div
            className="
              flex
              h-full
              items-center
              justify-center
              bg-gradient-to-br
              from-[#dcfce7]
              to-[#86efac]
              text-4xl
            "
          >
            📚
          </div>

        }



        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/25
            via-transparent
            to-transparent
          "
        />



        <span
          className="
            absolute
            right-2
            top-2
            rounded-full
            border
            border-white/80
            bg-white/90
            px-2.5
            py-1
            text-[9px]
            font-black
            text-green-700
            shadow
          "
        >
          دوره آموزشی
        </span>



        <span
          className="
            absolute
            bottom-2
            left-2
            rounded-full
            bg-black/55
            px-2.5
            py-1
            text-[10px]
            font-black
            text-white
            backdrop-blur
          "
        >

        {
          service.isFree
          ?
          "رایگان"
          :
          `${Number(
            service.price || 0
          ).toLocaleString(
            "fa-IR"
          )} ریال`
        }

        </span>


      </div>




      {/* اطلاعات */}

      <div
        className="
          p-3
        "
      >


        <h3
          className="
            line-clamp-1
            text-sm
            font-black
            text-[#14532d]
          "
        >
          {service.title}
        </h3>



        <p
          className="
            mt-1
            line-clamp-1
            text-[10px]
            font-bold
            text-green-700
          "
        >
          برگزارکننده:
          {" "}
          {organizerName}
        </p>




        <div
  className="
    mt-3
    flex
    flex-wrap
    items-center
    justify-center
    gap-1.5
  "
>

  <div
    className="
      inline-flex
      items-center
      gap-1
      rounded-full
      bg-green-50
      px-2
      py-1
      text-[9px]
      font-black
      text-green-700
    "
  >

    <GraduationCap
      size={12}
    />

    {
      service.serviceType === "WORKSHOP"
      ?
      "کارگاه"
      :
      "کلاس"
    }

  </div>


  {city && (

    <div
      className="
        inline-flex
        items-center
        gap-1
        rounded-full
        bg-emerald-50
        px-2
        py-1
        text-[9px]
        font-black
        text-emerald-700
      "
    >

      <MapPin
        size={12}
      />

      {city}

    </div>

  )}

</div>





        <div
          className="
            mt-3
            space-y-2
            text-[10px]
            text-stone-500
          "
        >


          <div
            className="
              flex
              items-center
              gap-1.5
            "
          >

            <CalendarDays
              size={14}
              className="
                text-green-600
              "
            />

            شروع دوره:
            {" "}
            {startDate}

          </div>




          <div
            className="
              flex
              items-center
              gap-1.5
            "
          >

            <Clock3
              size={14}
              className="
                text-green-600
              "
            />

            {Number(
              totalSessions
            ).toLocaleString(
              "fa-IR"
            )}

            {" "}
            جلسه آموزشی

          </div>




          <div
            className="
              flex
              items-center
              gap-1.5
            "
          >

            <UsersRound
              size={14}
              className="
                text-green-600
              "
            />

            ظرفیت:
            {" "}
            {Number(
              capacity
            ).toLocaleString(
              "fa-IR"
            )}

            {" "}
            نفر

          </div>




          <div
            className="
              flex
              items-center
              gap-1.5
            "
          >

            🎯

            رده سنی:
            {" "}
            {ageText}

          </div>



          {
            service.locationName &&

            <div
              className="
                flex
                items-center
                gap-1.5
              "
            >

              <MapPin
                size={14}
                className="
                  text-green-600
                "
              />

              <span
                className="
                  line-clamp-1
                "
              >
                {service.locationName}
              </span>

            </div>

          }


        </div>





        <div
          className="
            mt-3
            flex
            items-center
            justify-end
            border-t
            border-green-100
            pt-3
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
    rounded-lg
    bg-gradient-to-r
    from-green-700
    via-emerald-600
    to-green-500
    px-4
    py-1.5
    text-[10px]
    font-black
    text-white
    shadow-sm
    transition
    hover:shadow-md
  "
>
  مشاهده دوره
</button>


        </div>


      </div>



    </motion.article>

  );

}