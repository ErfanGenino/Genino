import { motion } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  UsersRound,
  Clock3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function EventCard({
  service,
  className = "",
}) {

  const navigate =
    useNavigate();


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


  const getMainImage = () => {

    const images =
      Array.isArray(
        service.images
      )
        ? service.images
        : [];

    return (
      images[
        Number(
          service.mainImageIndex ||
          0
        )
      ] ||
      images[0] ||
      ""
    );

  };


  const getServiceSessions = () => {

    const sessions =
      Array.isArray(
        service.sessions
      )
        ? service.sessions
        : [];

    return [...sessions].sort(
      (a, b) =>
        new Date(a.startAt) -
        new Date(b.startAt)
    );

  };


  const getFutureSessions = () => {

    const now =
      new Date();

    return getServiceSessions()
      .filter(
        (session) =>
          new Date(
            session.endAt
          ) > now
      );

  };


  const getTotalRemainingCapacity =
    () => {

      return getFutureSessions()
        .reduce(
          (sum, session) =>
            sum +
            Number(
              session
                .remainingCapacity ??
              session.capacity ??
              0
            ),
          0
        );

    };


  const getServiceDaysCount =
    () => {

      const days =
        new Set(
          getFutureSessions()
            .map(
              (session) =>
                new Date(
                  session.startAt
                ).toLocaleDateString(
                  "fa-IR"
                )
            )
        );

      return days.size;

    };


  const formatSessionTime = (
    value
  ) => {

    if (!value) {
      return "";
    }

    return new Date(
      value
    ).toLocaleTimeString(
      "fa-IR",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }
    );

  };


  const getOrganizerName = () => {

    return (
      service.vendor
        ?.schoolProfile
        ?.schoolName ||

      service.vendor
        ?.businessName ||

      service.schoolName ||

      service.organizerName ||

      "برگزارکننده ژنینویی"
    );

  };


  const futureSessions =
    getFutureSessions();

  const nextSession =
    futureSessions[0] ||
    null;

  const sessionsCount =
    futureSessions.length;

  const daysCount =
    getServiceDaysCount();

  const remainingCapacity =
    getTotalRemainingCapacity();

  const disabled =
    futureSessions.length === 0 ||
    remainingCapacity <= 0;

  const mainImage =
    getMainImage();

  const organizerName =
    getOrganizerName();

  const city =
  service?.vendor?.city ||
  service?.city ||
  "";


  return (

    <motion.article
      initial={{
        opacity: 0,
        y: 15,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      whileHover={
        disabled
          ? {}
          : {
              y: -6,
            }
      }
      transition={{
        duration: 0.25,
      }}
      className={`
        group
        overflow-hidden
        rounded-[1.6rem]
        border
        transition

        ${
          disabled
            ? `
              border-gray-200
              bg-gray-100
              opacity-60
              grayscale
            `
            : `
              border-white
              bg-white/85
              shadow-[0_12px_35px_rgba(92,61,18,0.10)]
              hover:shadow-[0_20px_50px_rgba(92,61,18,0.18)]
            `
        }

        ${className}
      `}
    >

      {/* تصویر */}

      <div
        className="
          relative
          h-36
          overflow-hidden
          bg-[#f3eadc]
        "
      >

        {mainImage ? (

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

        ) : (

          <div
            className="
              flex
              h-full
              items-center
              justify-center
              bg-gradient-to-br
              from-[#f9ebbd]
              to-[#e8c95e]
              text-4xl
            "
          >
            🎉
          </div>

        )}


        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/30
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
            text-[#7a5526]
            shadow
            backdrop-blur
          "
        >
          {getServiceTypeLabel(
            service.serviceType
          )}
        </span>


        {disabled && (

          <span
            className="
              absolute
              left-2
              top-2
              rounded-full
              bg-gray-700/80
              px-3
              py-1
              text-[9px]
              font-black
              text-white
            "
          >
            تکمیل شده
          </span>

        )}


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
          {service.isFree
            ? "رایگان"
            : `${Number(
                service.price || 0
              ).toLocaleString(
                "fa-IR"
              )} ریال`
          }
        </span>

      </div>


      {/* اطلاعات */}

      <div className="p-3">

        <h3
          className="
            line-clamp-1
            text-sm
            font-black
            text-[#4f3518]
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
            text-[#b07d22]
          "
        >
          برگزارکننده:{" "}
          {organizerName}
        </p>


        <div
  className="
    mt-2
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
      rounded-full
      bg-purple-50
      px-2
      py-1
      text-[9px]
      font-black
      text-[#755397]
    "
  >

    {sessionsCount === 1
      ? "تک سانس"
      : `${sessionsCount.toLocaleString(
          "fa-IR"
        )} سانس`
    }

  </div>


  {city && (

    <div
      className="
        inline-flex
        items-center
        gap-1
        rounded-full
        bg-yellow-50
        px-2
        py-1
        text-[9px]
        font-black
        text-[#8a661f]
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
            flex
            items-start
            gap-1.5
            text-[10px]
            leading-5
            text-stone-500
          "
        >

          <CalendarDays
            className="
              mt-0.5
              h-3.5
              w-3.5
              shrink-0
              text-[#c3932f]
            "
          />

          <span>

            {nextSession
              ? new Date(
                  nextSession.startAt
                ).toLocaleDateString(
                  "fa-IR",
                  {
                    year:
                      "numeric",
                    month:
                      "2-digit",
                    day:
                      "2-digit",
                  }
                )
              : "سانس آینده‌ای ندارد"
            }


            {daysCount > 1 && (

              <span
                className="
                  mr-1
                  text-[#8b68ad]
                "
              >
                + {daysCount - 1}
                {" "}
                روز دیگر
              </span>

            )}

          </span>

        </div>


        {nextSession && (

          <div
            className="
              mt-1
              flex
              items-center
              gap-1.5
              text-[10px]
              text-stone-500
            "
          >

            <Clock3
              className="
                h-3.5
                w-3.5
                shrink-0
                text-[#8b68ad]
              "
            />

            <span>

              نزدیک‌ترین سانس:{" "}

              {formatSessionTime(
                nextSession.startAt
              )}

              {" تا "}

              {formatSessionTime(
                nextSession.endAt
              )}

            </span>

          </div>

        )}


        {service.locationName && (

          <div
            className="
              mt-1.5
              flex
              items-center
              gap-1.5
              text-[10px]
              text-stone-500
            "
          >

            <MapPin
              className="
                h-3.5
                w-3.5
                shrink-0
                text-[#c3932f]
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

        )}


        <div
          className="
            mt-3
            flex
            items-center
            justify-between
            gap-2
            border-t
            border-yellow-100
            pt-3
          "
        >

          <div
            className="
              flex
              items-center
              gap-1.5
              text-[10px]
              font-bold
              text-stone-500
            "
          >

            <UsersRound
              className="
                h-3.5
                w-3.5
                shrink-0
                text-[#8b68ad]
              "
            />

            {nextSession ? (

              <span>
                ظرفیت باقی‌مانده:{" "}

                <span
                  className="
                    font-black
                    text-[#654184]
                  "
                >
                  {remainingCapacity
                    .toLocaleString(
                      "fa-IR"
                    )}
                </span>

                {" "}
                نفر
              </span>

            ) : (

              <span
                className="
                  text-stone-400
                "
              >
                بدون سانس آینده
              </span>

            )}

          </div>


          <button
            type="button"
            onClick={() =>
              navigate(
                `/service/${service.id}`
              )
            }
            className="
              rounded-lg
              bg-gradient-to-r
              from-[#6f4a18]
              via-[#9b7026]
              to-[#c79d3b]
              px-3
              py-1.5
              text-[10px]
              font-black
              text-white
              shadow-sm
              transition
              hover:shadow-md
            "
          >
            مشاهده
          </button>

        </div>

      </div>

    </motion.article>

  );

}