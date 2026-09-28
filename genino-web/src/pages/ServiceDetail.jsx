// 📄 src/pages/ServiceDetail.jsx

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  UsersRound,
  BadgeCheck,
  Phone,
  ShieldCheck,
} from "lucide-react";


export default function ServiceDetail() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const isVendor =
  !!localStorage.getItem(
    "genino_vendor_id"
  );


  const API_BASE_URL =
    import.meta.env
      .VITE_API_BASE_URL;


  const [
    service,
    setService,
  ] = useState(null);


  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    error,
    setError,
  ] = useState("");


  const [
    selectedImage,
    setSelectedImage,
  ] = useState(0);

  const [
  selectedSessionId,
  setSelectedSessionId,
] = useState(null);


const [
  quantity,
  setQuantity,
] = useState(1);


  const [
    openingVendorPage,
    setOpeningVendorPage,
  ] = useState(false);


  const [
  bookingLoading,
  setBookingLoading,
] = useState(false);

  const [
  freeReservationRemaining,
  setFreeReservationRemaining,
] = useState(null);

  const [
  reservationSuccess,
  setReservationSuccess,
] = useState(null);


  /*
  |--------------------------------------------------------------------------
  | دریافت خدمت
  |--------------------------------------------------------------------------
  */


    useEffect(() => {

    async function loadService() {

      try {

        setLoading(true);
        setError("");


        const res =
          await fetch(
            `${API_BASE_URL}/vendor-services/public/service/${id}`
          );


        const data =
          await res.json();


        if (
          !res.ok ||
          !data?.ok ||
          !data?.service
        ) {

          throw new Error(
            data?.message ||
            "اطلاعات خدمت دریافت نشد."
          );

        }


        setService(
          data.service
        );


      } catch (error) {

        console.error(
          "LOAD SERVICE ERROR:",
          error
        );


        setError(
          error.message ||
          "خطا در دریافت اطلاعات خدمت"
        );


      } finally {

        setLoading(false);

      }

    }


    if (id) {
      loadService();
    }


  }, [
    id,
    API_BASE_URL
  ]);


  useEffect(() => {

  async function loadFreeLimit() {

    if (!service?.id) return;

    if (!service.isFree) return;

    if (!selectedSessionId) {

      setFreeReservationRemaining(null);
      return;

    }


    const token =
      localStorage.getItem(
        "genino_token"
      );


    if (!token) return;


    try {

      const res =
        await fetch(
          `${API_BASE_URL}/service-reservations/free-limit/${service.id}/${selectedSessionId}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );


      const data =
        await res.json();


      if (data.ok) {

        setFreeReservationRemaining(
          data.remaining
        );

      }


    } catch (error) {

      console.error(
        "FREE LIMIT ERROR",
        error
      );

    }

  }


  loadFreeLimit();


}, [
  service?.id,
  service?.isFree,
  selectedSessionId,
  API_BASE_URL
]);




  /*
  |--------------------------------------------------------------------------
  | تصاویر
  |--------------------------------------------------------------------------
  */

  const images =
    useMemo(() => {

      return Array.isArray(
        service?.images
      )
        ? service.images
        : [];

    }, [service]);


  /*
  |--------------------------------------------------------------------------
  | سانس‌ها
  |--------------------------------------------------------------------------
  */

  const sessions =
    useMemo(() => {

      const items =
        Array.isArray(
          service?.sessions
        )
          ? service.sessions
          : [];


      return [...items].sort(
        (a, b) =>
          new Date(
            a.startAt
          ) -
          new Date(
            b.startAt
          )
      );

    }, [service]);


  
    /*
|--------------------------------------------------------------------------
| سانس انتخاب‌شده
|--------------------------------------------------------------------------
*/

const selectedSession =
  useMemo(() => {

    return (
      sessions.find(
        (session) =>
          Number(session.id) ===
          Number(selectedSessionId)
      ) || null
    );

  }, [
    sessions,
    selectedSessionId,
  ]);


/*
|--------------------------------------------------------------------------
| ظرفیت قابل استفاده سانس انتخاب‌شده
|--------------------------------------------------------------------------
*/

const selectedRemainingCapacity =
  selectedSession
    ? Number(
        selectedSession.remainingCapacity ??
        selectedSession.capacity ??
        0
      )
    : 0;

  const isSessionDisabled = (session) => {

  const expired =
    new Date(session.endAt) <= new Date();

  const full =
  Number(
    session.remainingCapacity ??
    session.capacity ??
    0
  ) <= 0;

  return expired || full;
};

const maxSelectableQuantity =
  service?.isFree &&
  freeReservationRemaining !== null

    ? Math.min(
        selectedRemainingCapacity,
        freeReservationRemaining
      )

    : selectedRemainingCapacity;


  /*
  |--------------------------------------------------------------------------
  | گروه‌بندی سانس‌ها بر اساس روز
  |--------------------------------------------------------------------------
  */

  const sessionDays =
    useMemo(() => {

      const grouped =
        new Map();


      sessions.forEach(
        (session) => {

          const dateKey =
            new Date(
              session.startAt
            )
              .toLocaleDateString(
                "fa-IR"
              );


          if (
            !grouped.has(
              dateKey
            )
          ) {

            grouped.set(
              dateKey,
              []
            );

          }


          grouped
            .get(dateKey)
            .push(session);

        }
      );


      return Array.from(
        grouped.entries()
      ).map(
        (
          [
            date,
            daySessions,
          ]
        ) => ({
          date,
          sessions:
            daySessions,
        })
      );

    }, [sessions]);


  /*
  |--------------------------------------------------------------------------
  | نوع خدمت
  |--------------------------------------------------------------------------
  */

  const getServiceTypeLabel = (
    value
  ) => {

    const labels = {

      EVENT:
        "جشن و رویداد",

      CLASS:
        "کلاس",

      WORKSHOP:
        "کارگاه",

      CAMP:
        "اردو",

      CONSULTATION:
        "مشاوره",

      OTHER:
        "سایر خدمات",

    };


    return (
      labels[value] ||
      "خدمت"
    );

  };


  /*
  |--------------------------------------------------------------------------
  | ساعت
  |--------------------------------------------------------------------------
  */

  const formatTime = (
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
        hour:
          "2-digit",
        minute:
          "2-digit",
        hour12:
          false,
      }
    );

  };


  /*
  |--------------------------------------------------------------------------
  | تاریخ
  |--------------------------------------------------------------------------
  */

  const formatDate = (
    value
  ) => {

    if (!value) {
      return "";
    }


    return new Date(
      value
    ).toLocaleDateString(
      "fa-IR",
      {
        year:
          "numeric",
        month:
          "long",
        day:
          "numeric",
      }
    );

  };


  /*
  |--------------------------------------------------------------------------
  | نام برگزارکننده
  |--------------------------------------------------------------------------
  */

  const organizerName =
    service?.vendor
      ?.businessName ||
    "برگزارکننده ژنینویی";


  /*
  |--------------------------------------------------------------------------
  | مسیر صفحه وندور
  |--------------------------------------------------------------------------
  */

  const getVendorPagePath = (
    vendor
  ) => {

    if (!vendor?.id) {
      return null;
    }


    switch (
      vendor.mainActivityField
    ) {

      case "مدارس":
        return `/vendor/service/school/${vendor.id}`;

      case "مهدکودک‌ها":
        return `/vendor/service/kindergarten/${vendor.id}`;

      case "خانه‌های بازی":
        return `/vendor/service/playhouse/${vendor.id}`;

      case "کلاس‌های آموزشی":
        return `/vendor/service/education-class/${vendor.id}`;

      case "کلاس‌های هنری":
        return `/vendor/service/art-class/${vendor.id}`;

      case "کلاس‌های ورزشی":
        return `/vendor/service/sport-class/${vendor.id}`;

      case "معلمان خصوصی":
      case "معلم خصوصی":
        return `/vendor/service/private-teacher/${vendor.id}`;

      default:
        return `/vendor/service/${vendor.id}`;

    }

  };


  /*
  |--------------------------------------------------------------------------
  | ورود به صفحه برگزارکننده
  |--------------------------------------------------------------------------
  */

  const handleOpenVendorPage =
    async () => {

      const vendorId =
        service?.vendor?.id;


      if (
        !vendorId ||
        openingVendorPage
      ) {
        return;
      }


      try {

        setOpeningVendorPage(
          true
        );


        const res =
          await fetch(
            `${API_BASE_URL}/vendors/${vendorId}`
          );


        const data =
          await res.json();


        if (
          !res.ok ||
          !data?.ok ||
          !data?.vendor
        ) {

          throw new Error(
            data?.message ||
            "اطلاعات برگزارکننده دریافت نشد."
          );

        }


        const path =
          getVendorPagePath(
            data.vendor
          );


        if (!path) {

          throw new Error(
            "صفحه برگزارکننده مشخص نیست."
          );

        }


        navigate(path);


      } catch (error) {

        console.error(
          "OPEN SERVICE VENDOR ERROR:",
          error
        );


        alert(
          error.message ||
          "خطا در ورود به صفحه برگزارکننده"
        );


      } finally {

        setOpeningVendorPage(
          false
        );

      }

    };

    const handleReservation = async () => {

    if(isVendor){

  alert(
    "برای رزرو خدمات باید با حساب کاربری ژنینو وارد شوید."
  );

  return;

}

  if (!selectedSession) {
    alert("لطفاً ابتدا سانس را انتخاب کنید.");
    return;
  }

  if (
  isSessionDisabled(selectedSession)
) {

  alert(
    "این سانس قابل رزرو نیست."
  );

  return;

}

  if (!service.isFree) {

  alert(
     "درگاه پرداخت ژنینو هنوز فعال نشده است. پس از فعال شدن پرداخت، رزرو شما بعد از پرداخت نهایی خواهد شد."
  );

  return;

}


  try {

    setBookingLoading(true);


    const token =
      localStorage.getItem(
        "genino_token"
      );


    const res =
      await fetch(
        `${API_BASE_URL}/service-reservations/create`,
        {
          method:"POST",

          headers:{
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },


          body: JSON.stringify({

            serviceId:
              service.id,


            sessionId:
              selectedSession.id,


            quantity:
              quantity,

          })

        }
      );


    const data =
      await res.json();



    if(!res.ok || !data.ok){

      throw new Error(
        data.message ||
        "رزرو انجام نشد."
      );

    }

if(service.isFree){

  setReservationSuccess(
    data.reservation
  );

}


    console.log(
      "RESERVATION:",
      data
    );


  } catch(error){


    console.error(
      "RESERVATION ERROR:",
      error
    );


    alert(
      error.message
    );


  } finally {

    setBookingLoading(false);

  }

};


  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (loading) {

    return (

      <main
        dir="rtl"
        className="
          min-h-screen
          bg-[#f4effa]
          p-8
          text-center
          text-sm
          font-bold
          text-[#694788]
        "
      >

        در حال دریافت اطلاعات خدمت...

      </main>

    );

  }


  /*
  |--------------------------------------------------------------------------
  | Error
  |--------------------------------------------------------------------------
  */

  if (
    error ||
    !service
  ) {

    return (

      <main
        dir="rtl"
        className="
          min-h-screen
          bg-[#f4effa]
          p-8
        "
      >

        <div
          className="
            mx-auto
            max-w-lg
            rounded-3xl
            bg-white
            p-8
            text-center
            shadow-xl
          "
        >

          <p
            className="
              font-bold
              text-red-500
            "
          >
            {error ||
              "خدمت پیدا نشد."}
          </p>


          <button
            type="button"
            onClick={() =>
              navigate(-1)
            }
            className="
              mt-5
              rounded-xl
              bg-[#76529a]
              px-5
              py-2
              text-sm
              font-black
              text-white
            "
          >
            بازگشت
          </button>

        </div>

      </main>

    );

  }


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
        px-4
        pb-24
        pt-20
      "
    >

      {/* نورهای محو */}

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          -top-40
          h-[32rem]
          w-[32rem]
          rounded-full
          bg-purple-300/20
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          bottom-20
          h-[30rem]
          w-[30rem]
          rounded-full
          bg-yellow-200/20
          blur-[120px]
        "
      />


      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-6xl
        "
      >

        {/* بازگشت */}

        <button
          type="button"
          onClick={() =>
            navigate(-1)
          }
          className="
            mb-5
            flex
            items-center
            gap-2
            text-sm
            font-black
            text-[#76529a]
          "
        >

          <ArrowRight
            className="
              h-4
              w-4
            "
          />

          بازگشت

        </button>


        {/* باکس اصلی */}

        <section
          className="
            overflow-hidden
            rounded-[2rem]
            border
            border-white
            bg-white/90
            p-4
            shadow-[0_20px_60px_rgba(70,40,100,0.12)]
            backdrop-blur-xl
            sm:p-6
          "
        >

          <div
            className="
              grid
              gap-6
              lg:grid-cols-2
            "
          >

            {/* گالری */}

            <div
              className="
                rounded-[1.75rem]
                bg-gradient-to-br
                from-[#f6f0fc]
                to-[#eee4f8]
                p-4
              "
            >

              <div
                className="
                  flex
                  h-80
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-2xl
                  bg-white
                "
              >

                {images.length >
                0 ? (

                  <img
                    src={
                      images[
                        selectedImage
                      ]
                    }
                    alt={
                      service.title
                    }
                    className="
                      h-full
                      w-full
                      object-contain
                    "
                  />

                ) : (

                  <div
                    className="
                      text-6xl
                    "
                  >
                    🎉
                  </div>

                )}

              </div>


              {images.length >
                1 && (

                <div
                  className="
                    mt-4
                    flex
                    gap-2
                    overflow-x-auto
                    pb-2
                  "
                >

                  {images.map(
                    (
                      image,
                      index
                    ) => (

                      <button
                        key={
                          index
                        }
                        type="button"
                        onClick={() =>
                          setSelectedImage(
                            index
                          )
                        }
                        className={`
                          shrink-0
                          overflow-hidden
                          rounded-xl
                          border-2

                          ${
                            selectedImage ===
                            index
                              ? "border-[#8b68ad]"
                              : "border-transparent"
                          }
                        `}
                      >

                        <img
                          src={image}
                          alt=""
                          className="
                            h-16
                            w-16
                            object-cover
                          "
                        />

                      </button>

                    )
                  )}

                </div>

              )}

            </div>


            {/* اطلاعات اصلی */}

            <div
              className="
                flex
                flex-col
              "
            >

              <div
                className="
                  mb-3
                  flex
                  flex-wrap
                  gap-2
                "
              >

                <span
                  className="
                    rounded-full
                    bg-purple-50
                    px-3
                    py-1
                    text-xs
                    font-black
                    text-[#76529a]
                  "
                >
                  {getServiceTypeLabel(
                    service.serviceType
                  )}
                </span>


                <span
                  className="
                    rounded-full
                    bg-green-50
                    px-3
                    py-1
                    text-xs
                    font-black
                    text-green-700
                  "
                >
                  فعال
                </span>

              </div>


              <h1
                className="
                  text-2xl
                  font-black
                  text-[#4d3268]
                  sm:text-3xl
                "
              >
                {service.title}
              </h1>


              <p
                className="
                  mt-2
                  text-sm
                  text-stone-500
                "
              >

                برگزارکننده:{" "}

                <button
                  type="button"
                  disabled={
                    !service.vendor?.id ||
                    openingVendorPage
                  }
                  onClick={
                    handleOpenVendorPage
                  }
                  className="
                    font-black
                    text-[#a57a29]
                    transition
                    hover:underline
                    disabled:opacity-60
                  "
                >

                  {openingVendorPage
                    ? "در حال ورود..."
                    : organizerName
                  }

                </button>

              </p>


              <p
                className="
                  mt-4
                  whitespace-pre-line
                  text-sm
                  leading-7
                  text-stone-600
                "
              >

                {service.description ||
                  "توضیحاتی برای این خدمت ثبت نشده است."}

              </p>

              {
service.rules && (

<div
className="
mt-5
rounded-2xl
border
border-yellow-100
bg-yellow-50/60
p-4
"
>

<div
className="
flex
items-center
gap-2
text-sm
font-black
text-[#76529a]
"
>

<ShieldCheck
className="
h-5
w-5
"
/>

شرایط و قوانین خدمت

</div>


<p
className="
mt-3
whitespace-pre-line
text-sm
leading-7
text-stone-600
"
>
{service.rules}
</p>


</div>

)
}


              {/* قیمت */}

              <div
                className="
                  mt-5
                  rounded-2xl
                  border
                  border-purple-100
                  bg-purple-50/60
                  p-4
                "
              >

                <p
                  className="
                    text-xs
                    font-bold
                    text-stone-500
                  "
                >
                  هزینه هر رزرو
                </p>


                <p
                  className="
                    mt-1
                    text-2xl
                    font-black
                    text-[#76529a]
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

                </p>

              </div>


              {/* مشخصات سریع */}

              <div
                className="
                  mt-4
                  grid
                  grid-cols-1
                  gap-2
                  sm:grid-cols-2
                "
              >

                {service.locationName && (

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-purple-100
                      bg-white
                      p-3
                      text-xs
                      text-stone-600
                    "
                  >

                    <MapPin
                      className="
                        h-4
                        w-4
                        text-[#8b68ad]
                      "
                    />

                    {service.locationName}

                  </div>

                )}


                {service.contactPhone && (

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-purple-100
                      bg-white
                      p-3
                      text-xs
                      text-stone-600
                    "
                  >

                    <Phone
                      className="
                        h-4
                        w-4
                        text-[#8b68ad]
                      "
                    />

                    {service.contactPhone}

                  </div>

                )}

                {(
  service.minAge !== null &&
  service.minAge !== undefined
) ||
(
  service.maxAge !== null &&
  service.maxAge !== undefined
) ? (

<div
className="
flex
items-center
gap-2
rounded-xl
border
border-purple-100
bg-white
p-3
text-xs
text-stone-600
"
>
<span>
👶
</span>

<span>
سن مجاز:

{" "}

{
service.minAge !== null &&
service.maxAge !== null

?

`${service.minAge} تا ${service.maxAge} سال`

:

service.minAge !== null

?

`از ${service.minAge} سال`

:

`تا ${service.maxAge} سال`

}

</span>

</div>

) : null}

              </div>

            </div>

          </div>


          {/* سانس‌ها */}

          <div
            className="
              mt-7
              border-t
              border-purple-100
              pt-6
            "
          >

            <div
              className="
                mb-4
                flex
                items-center
                gap-2
              "
            >

              <CalendarDays
                className="
                  h-5
                  w-5
                  text-[#8b68ad]
                "
              />

              <h2
                className="
                  text-lg
                  font-black
                  text-[#4d3268]
                "
              >
                روزها و سانس‌های برگزاری
              </h2>

            </div>


            <div
              className="
                space-y-3
              "
            >

              {sessionDays.map(
                (
                  day,
                  dayIndex
                ) => (

                  <div
                    key={
                      day.date
                    }
                    className="
                      rounded-2xl
                      border
                      border-purple-100
                      bg-[#fcfaff]
                      p-3
                    "
                  >

                    <div
                      className="
                        mb-3
                        flex
                        items-center
                        gap-2
                      "
                    >

                      <span
                        className="
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-lg
                          bg-purple-100
                          text-[10px]
                          font-black
                          text-[#76529a]
                        "
                      >
                        {dayIndex + 1}
                      </span>


                      <span
                        className="
                          text-xs
                          font-black
                          text-[#4d3268]
                        "
                      >
                        {formatDate(
                          day.sessions[
                            0
                          ]?.startAt
                        )}
                      </span>

                    </div>


                    <div
                      className="
                        grid
                        gap-2
                        sm:grid-cols-2
                        lg:grid-cols-3
                      "
                    >

                      {day.sessions.map(
                        (
                          session,
                          index
                        ) => (

                          <button
  key={session.id}
  type="button"
  onClick={() => {

  if (isSessionDisabled(session)) {
    return;
  }

  setSelectedSessionId(session.id);
  setQuantity(1);

}}
  className={`
w-full
rounded-xl
border
p-3
text-right
transition

${
  isSessionDisabled(session)

  ? `
    cursor-not-allowed
    border-gray-200
    bg-gray-100
    opacity-50
    grayscale
  `

  :

  Number(selectedSessionId) === Number(session.id)

  ? `
    border-[#8b68ad]
    bg-purple-50
    shadow-sm
    ring-2
    ring-purple-100
  `

  :

  `
    border-purple-100
    bg-white
    hover:border-purple-300
    hover:bg-purple-50/40
  `
}

`}
>

                            <div
                              className="
                                flex
                                items-center
                                justify-between
                                gap-2
                              "
                            >

                              <span
                                className="
                                  text-[10px]
                                  font-black
                                  text-[#76529a]
                                "
                              >
                                سانس{" "}
                                {index + 1}
                              </span>

                              {
!isSessionDisabled(session) &&
Number(selectedSessionId) === Number(session.id)
? (

  <span
    className="
      rounded-full
      bg-[#76529a]
      px-2
      py-0.5
      text-[9px]
      font-black
      text-white
    "
  >
    انتخاب شد
  </span>

) : (

  <Clock3
    className="
      h-3.5
      w-3.5
      text-stone-400
    "
  />

)
}


                            </div>


                            <p
                              className="
                                mt-2
                                text-xs
                                font-black
                                text-stone-700
                              "
                            >
                              {formatTime(
                                session.startAt
                              )}

                              {" تا "}

                              {formatTime(
                                session.endAt
                              )}
                            </p>


                            <div
                              className="
                                mt-2
                                flex
                                items-center
                                gap-1.5
                                text-[10px]
                                text-stone-500
                              "
                            >

                              <UsersRound
                                className="
                                  h-3.5
                                  w-3.5
                                  text-[#8b68ad]
                                "
                              />

                             ظرفیت باقی‌مانده:
                              {" "}

                              <span
                                className="
                                  font-black
                                  text-[#654184]
                                "
                              >
                                {session.remainingCapacity}
                              </span>

                              {" "}
                              نفر

                            </div>

                          </button>

                        )
                      )}

                    </div>

                  </div>

                )
              )}

            </div>

          </div>


          {/* انتخاب و رزرو */}

<div
  className="
    mt-6
    rounded-[1.5rem]
    border
    border-purple-200
    bg-gradient-to-br
    from-white
    to-purple-50/60
    p-4
    shadow-sm
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

    <div>

      <h3
        className="
          text-sm
          font-black
          text-[#4d3268]
        "
      >
        رزرو این خدمت
      </h3>


      <p
        className="
          mt-1
          text-[10px]
          text-stone-400
        "
      >
        سانس و تعداد نفرات را انتخاب کنید.
      </p>

    </div>


    <UsersRound
      className="
        h-5
        w-5
        text-[#8b68ad]
      "
    />

  </div>


  {!selectedSession ? (

    <div
      className="
        mt-4
        rounded-xl
        border
        border-dashed
        border-purple-200
        bg-white/70
        px-4
        py-4
        text-center
        text-xs
        font-bold
        text-stone-400
      "
    >
      ابتدا یکی از سانس‌های بالا را انتخاب کنید.
    </div>

  ) : (

    <>

      {/* سانس انتخاب‌شده */}

      <div
        className="
          mt-4
          rounded-xl
          border
          border-purple-100
          bg-white
          p-3
        "
      >

        <p
          className="
            text-[10px]
            font-bold
            text-stone-400
          "
        >
          سانس انتخاب‌شده
        </p>


        <p
          className="
            mt-1
            text-xs
            font-black
            text-[#4d3268]
          "
        >

          {formatDate(
            selectedSession.startAt
          )}

          {" — "}

          {formatTime(
            selectedSession.startAt
          )}

          {" تا "}

          {formatTime(
            selectedSession.endAt
          )}

        </p>

      </div>


      {/* انتخاب تعداد */}

      <div
        className="
          mt-4
          flex
          flex-col
          gap-3
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        <div>

          <p
            className="
              text-xs
              font-black
              text-[#4d3268]
            "
          >
            تعداد نفرات
          </p>


          <p
            className="
              mt-1
              text-[10px]
              text-stone-400
            "
          >

            ظرفیت این سانس:

            {" "}

            <span
              className="
                font-black
                text-[#76529a]
              "
            >
              {selectedRemainingCapacity
                .toLocaleString(
                  "fa-IR"
                )}
            </span>

            {" "}
            نفر

          </p>

          {
 service.isFree &&
 freeReservationRemaining !== null && (

<p
className="
mt-1
text-[10px]
font-bold
text-[#76529a]
"
>
سهمیه شما برای این سانس رایگان:
{" "}
{freeReservationRemaining.toLocaleString("fa-IR")}
{" "}
نفر باقی مانده
</p>

)
}

        </div>


        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          {/* کم کردن */}

          <button
            type="button"
            disabled={
              quantity <= 1
            }
            onClick={() =>
              setQuantity(
                (prev) =>
                  Math.max(
                    1,
                    prev - 1
                  )
              )
            }
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-purple-200
              bg-white
              text-lg
              font-black
              text-[#76529a]
              transition
              hover:bg-purple-50
              disabled:cursor-not-allowed
              disabled:opacity-30
            "
          >
            −
          </button>


          {/* تعداد */}

          <span
            className="
              min-w-10
              text-center
              text-lg
              font-black
              text-[#4d3268]
            "
          >
            {quantity.toLocaleString(
              "fa-IR"
            )}
          </span>


          {/* زیاد کردن */}

          <button
            type="button"
            disabled={
  quantity >=
  maxSelectableQuantity
}
            onClick={() =>
              setQuantity(
                (prev) =>
                  Math.min(
  maxSelectableQuantity,
  prev + 1
)
              )
            }
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-purple-200
              bg-white
              text-lg
              font-black
              text-[#76529a]
              transition
              hover:bg-purple-50
              disabled:cursor-not-allowed
              disabled:opacity-30
            "
          >
            +
          </button>

        </div>

      </div>


      {/* جمع مبلغ */}

      <div
        className="
          mt-4
          flex
          items-center
          justify-between
          gap-3
          rounded-xl
          bg-[#faf8fc]
          px-3
          py-3
        "
      >

        <span
          className="
            text-xs
            font-bold
            text-stone-500
          "
        >
          مبلغ نهایی
        </span>


        <span
          className="
            text-sm
            font-black
            text-[#76529a]
          "
        >

          {service.isFree

            ? "رایگان"

            : `${(
                Number(
                  service.price ||
                  0
                ) *
                quantity
              ).toLocaleString(
                "fa-IR"
              )} ریال`
          }

        </span>

      </div>


      {/* ادامه */}

      <button
        type="button"
  onClick={
    handleReservation
  }
  disabled={
  bookingLoading || isVendor
}
        className="
          mt-4
          w-full
          rounded-xl
          bg-gradient-to-r
          from-[#654184]
          via-[#8058a5]
          to-[#9a72ba]
          py-3
          text-sm
          font-black
          text-white
          shadow-lg
          transition
          hover:-translate-y-0.5
          hover:shadow-xl
        "
      >

        {
bookingLoading
?
"در حال ثبت..."

:

isVendor
?
"ورود با حساب کاربری ژنینو"

:

service.isFree
?
"ثبت رزرو"

:

"ادامه و پرداخت"
}

      </button>

    </>

  )}

</div>


          {/* مشخصات تکمیلی */}

          <div
            className="
              mt-7
              grid
              gap-4
              border-t
              border-purple-100
              pt-6
              md:grid-cols-2
            "
          >

            {/* مناسب برای */}

            <div
              className="
                rounded-2xl
                border
                border-purple-100
                bg-white
                p-4
              "
            >

              <div
                className="
                  mb-4
                  flex
                  items-center
                  gap-2
                "
              >

                <BadgeCheck
                  className="
                    h-4
                    w-4
                    text-[#8b68ad]
                  "
                />

                <h3
                  className="
                    text-sm
                    font-black
                    text-[#4d3268]
                  "
                >
                  مناسب برای
                </h3>

              </div>


              <div
                className="
                  space-y-2
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    bg-[#faf8fc]
                    px-3
                    py-2
                    text-xs
                  "
                >

                  <span
                    className="
                      text-stone-500
                    "
                  >
                    حداقل سن
                  </span>

                  <span
                    className="
                      font-black
                    "
                  >
                    {service.minAge ??
                      "بدون محدودیت"}
                  </span>

                </div>


                <div
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    bg-[#faf8fc]
                    px-3
                    py-2
                    text-xs
                  "
                >

                  <span
                    className="
                      text-stone-500
                    "
                  >
                    حداکثر سن
                  </span>

                  <span
                    className="
                      font-black
                    "
                  >
                    {service.maxAge ??
                      "بدون محدودیت"}
                  </span>

                </div>

              </div>

            </div>


            {/* محل و قوانین */}

            <div
              className="
                rounded-2xl
                border
                border-purple-100
                bg-white
                p-4
              "
            >

              <div
                className="
                  mb-4
                  flex
                  items-center
                  gap-2
                "
              >

                <ShieldCheck
                  className="
                    h-4
                    w-4
                    text-[#8b68ad]
                  "
                />

                <h3
                  className="
                    text-sm
                    font-black
                    text-[#4d3268]
                  "
                >
                  اطلاعات تکمیلی
                </h3>

              </div>


              {service.address && (

                <div
                  className="
                    mb-3
                    rounded-xl
                    bg-[#faf8fc]
                    p-3
                  "
                >

                  <p
                    className="
                      mb-1
                      text-[10px]
                      font-bold
                      text-stone-400
                    "
                  >
                    آدرس
                  </p>

                  <p
                    className="
                      whitespace-pre-line
                      text-xs
                      leading-6
                      text-stone-700
                    "
                  >
                    {service.address}
                  </p>

                </div>

              )}


              {service.rules && (

                <div
                  className="
                    rounded-xl
                    bg-[#faf8fc]
                    p-3
                  "
                >

                  <p
                    className="
                      mb-1
                      text-[10px]
                      font-bold
                      text-stone-400
                    "
                  >
                    شرایط و قوانین
                  </p>

                  <p
                    className="
                      whitespace-pre-line
                      text-xs
                      leading-6
                      text-stone-700
                    "
                  >
                    {service.rules}
                  </p>

                </div>

              )}

            </div>

          </div>

        </section>

      </div>

      {
  reservationSuccess && (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        px-4
        backdrop-blur-sm
      "
    >

      <div
        className="
          w-full
          max-w-sm
          rounded-[2rem]
          bg-white
          p-6
          text-center
          shadow-2xl
        "
      >

        <div
          className="
            text-5xl
          "
        >
          🎉
        </div>


        <h3
          className="
            mt-4
            text-xl
            font-black
            text-[#4d3268]
          "
        >
          رزرو شما ثبت شد
        </h3>


        <p
          className="
            mt-3
            text-sm
            text-stone-500
          "
        >
          کد رزرو خود را هنگام مراجعه همراه داشته باشید.
        </p>


        <div
          className="
            mt-5
            rounded-2xl
            bg-purple-50
            p-4
          "
        >

          <p
            className="
              text-xs
              font-bold
              text-stone-400
            "
          >
            کد رزرو
          </p>


          <p
            className="
              mt-2
              text-lg
              font-black
              tracking-widest
              text-[#76529a]
            "
          >
            {
              reservationSuccess.reservationCode
            }
          </p>

        </div>


        <button
          type="button"
          onClick={() =>
            setReservationSuccess(null)
          }
          className="
            mt-5
            w-full
            rounded-xl
            bg-[#76529a]
            py-3
            text-sm
            font-black
            text-white
          "
        >
          متوجه شدم
        </button>


      </div>

    </div>

  )
}

    </main>

  );

}