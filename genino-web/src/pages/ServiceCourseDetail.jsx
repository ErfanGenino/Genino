// ============================================================================
// File: src/pages/ServiceCourseDetail.jsx
// Description: صفحه جزئیات دوره‌ها و بسته‌های آموزشی ژنینو
// ============================================================================

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
  UsersRound,
  MapPin,
  Phone,
  ShieldCheck,
  GraduationCap,
  CalendarRange,
  BookOpen,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Building2,
} from "lucide-react";


export default function ServiceCourseDetail() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();


  const API_BASE_URL =
    import.meta.env
      .VITE_API_BASE_URL;


  /*
  |--------------------------------------------------------------------------
  | State
  |--------------------------------------------------------------------------
  */

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
    openingVendorPage,
    setOpeningVendorPage,
  ] = useState(false);


  /*
  |--------------------------------------------------------------------------
  | دریافت اطلاعات دوره
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    async function loadCourse() {

      try {

        setLoading(true);
        setError("");


        const res =
          await fetch(

            `${API_BASE_URL}/vendor-services/public/service/${id}`,

            {
              method: "GET",

              headers: {
                Accept:
                  "application/json",
              },
            }

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
            "دوره پیدا نشد."
          );

        }


        /*
        |--------------------------------------------------------------------------
        | محافظت از مسیر
        |--------------------------------------------------------------------------
        |
        | این صفحه فقط برای PACKAGE است.
        |
        */

        const isCourse =
  Boolean(data.service.package) ||
  data.service.scheduleMode === "PACKAGE";

if (!isCourse) {

  throw new Error(
    "این خدمت یک دوره آموزشی نیست."
  );

}


        setService(
          data.service
        );


      } catch (error) {

        console.error(
          "LOAD COURSE DETAIL ERROR:",
          error
        );


        setError(
          error.message ||
          "خطا در دریافت اطلاعات دوره."
        );


      } finally {

        setLoading(false);

      }

    }


    if (id) {
      loadCourse();
    }

  }, [
    API_BASE_URL,
    id,
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
  | اطلاعات Package
  |--------------------------------------------------------------------------
  */

  const packageInfo =
    service?.package || {};


  /*
  |--------------------------------------------------------------------------
  | نام برگزارکننده
  |--------------------------------------------------------------------------
  */

  const organizerName =
    service?.vendor
      ?.schoolProfile
      ?.schoolName
    ||
    service?.vendor
      ?.businessName
    ||
    "برگزارکننده ژنینویی";


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
        "کلاس آموزشی",

      WORKSHOP:
        "کارگاه آموزشی",

      CAMP:
        "اردو",

      CONSULTATION:
        "مشاوره",

      OTHER:
        "سایر خدمات",

    };


    return (
      labels[value] ||
      "دوره آموزشی"
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
      return "ثبت نشده";
    }


    try {

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

    } catch {

      return "ثبت نشده";

    }

  };


  /*
  |--------------------------------------------------------------------------
  | ساعت
  |--------------------------------------------------------------------------
  */

  const formatClock = (
    value
  ) => {

    if (!value) {
      return "ثبت نشده";
    }


    return String(value)
      .slice(0, 5);

  };


  /*
  |--------------------------------------------------------------------------
  | سن
  |--------------------------------------------------------------------------
  */

  const ageText = (() => {

    const min =
      service?.minAge;

    const max =
      service?.maxAge;


    if (
      min !== null &&
      min !== undefined &&
      max !== null &&
      max !== undefined
    ) {

      return `${min} تا ${max} سال`;

    }


    if (
      min !== null &&
      min !== undefined
    ) {

      return `از ${min} سال`;

    }


    if (
      max !== null &&
      max !== undefined
    ) {

      return `تا ${max} سال`;

    }


    return "بدون محدودیت سنی";

  })();


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
          "OPEN COURSE VENDOR ERROR:",
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


  /*
  |--------------------------------------------------------------------------
  | تصاویر قبلی / بعدی
  |--------------------------------------------------------------------------
  */

  const nextImage = () => {

    if (
      images.length <= 1
    ) {
      return;
    }


    setSelectedImage(
      (prev) =>
        prev ===
        images.length - 1
          ? 0
          : prev + 1
    );

  };


  const prevImage = () => {

    if (
      images.length <= 1
    ) {
      return;
    }


    setSelectedImage(
      (prev) =>
        prev === 0
          ? images.length - 1
          : prev - 1
    );

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
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#f3faf4]
          px-4
          pt-20
        "
      >

        <div
          className="
            rounded-3xl
            border
            border-green-100
            bg-white
            px-8
            py-7
            text-center
            shadow-lg
          "
        >

          <div
            className="
              mx-auto
              h-8
              w-8
              animate-spin
              rounded-full
              border-4
              border-green-100
              border-t-green-600
            "
          />


          <p
            className="
              mt-4
              text-sm
              font-bold
              text-green-800
            "
          >
            در حال دریافت اطلاعات دوره...
          </p>

        </div>

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
          bg-[#f3faf4]
          px-4
          pb-20
          pt-24
        "
      >

        <div
          className="
            mx-auto
            max-w-lg
            rounded-[2rem]
            border
            border-red-100
            bg-white
            p-7
            text-center
            shadow-xl
          "
        >

          <p
            className="
              text-sm
              font-bold
              text-red-500
            "
          >
            {error ||
              "دوره پیدا نشد."}
          </p>


          <button
            type="button"
            onClick={() =>
              navigate(-1)
            }
            className="
              mt-5
              rounded-xl
              bg-green-700
              px-5
              py-2.5
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


  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (

    <main
      dir="rtl"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-gradient-to-br
        from-[#f7fff8]
        via-[#f1faf3]
        to-[#e9f6ec]
        px-3
        pb-24
        pt-20
        sm:px-5
      "
    >

      {/* نورهای پس‌زمینه */}

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          -top-40
          h-[32rem]
          w-[32rem]
          rounded-full
          bg-green-200/30
          blur-[120px]
        "
      />


      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-[35rem]
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
            text-green-800
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


        {/* ========================================
            بخش اصلی
        ======================================== */}

        <section
          className="
            overflow-hidden
            rounded-[2rem]
            border
            border-white
            bg-white/90
            p-4
            shadow-[0_20px_60px_rgba(22,101,52,0.10)]
            backdrop-blur-xl
            sm:p-6
          "
        >

          <div
            className="
              grid
              gap-7
              lg:grid-cols-2
            "
          >

            {/* ========================================
                گالری تصاویر
            ======================================== */}

            <div
              className="
                rounded-[1.75rem]
                bg-gradient-to-br
                from-[#effaf1]
                to-[#e4f4e8]
                p-3
                sm:p-4
              "
            >

              <div
                className="
                  relative
                  flex
                  h-72
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-2xl
                  bg-white
                  sm:h-96
                "
              >

                {images.length > 0 ? (

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
                      flex
                      flex-col
                      items-center
                      gap-2
                      text-green-700
                    "
                  >

                    <BookOpen
                      className="
                        h-16
                        w-16
                      "
                    />

                    <span
                      className="
                        text-xs
                        font-bold
                        text-stone-400
                      "
                    >
                      تصویری ثبت نشده
                    </span>

                  </div>

                )}


                {/* فلش تصاویر */}

                {images.length > 1 && (

                  <>

                    <button
                      type="button"
                      onClick={
                        nextImage
                      }
                      className="
                        absolute
                        left-3
                        top-1/2
                        flex
                        h-9
                        w-9
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-full
                        bg-black/40
                        text-white
                        backdrop-blur
                        transition
                        hover:bg-black/60
                      "
                    >
                      <ChevronLeft
                        size={20}
                      />
                    </button>


                    <button
                      type="button"
                      onClick={
                        prevImage
                      }
                      className="
                        absolute
                        right-3
                        top-1/2
                        flex
                        h-9
                        w-9
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-full
                        bg-black/40
                        text-white
                        backdrop-blur
                        transition
                        hover:bg-black/60
                      "
                    >
                      <ChevronRight
                        size={20}
                      />
                    </button>

                  </>

                )}


                {/* شمارنده */}

                {images.length > 1 && (

                  <span
                    className="
                      absolute
                      bottom-3
                      left-3
                      rounded-full
                      bg-black/50
                      px-3
                      py-1
                      text-[10px]
                      font-bold
                      text-white
                      backdrop-blur
                    "
                  >
                    {(
                      selectedImage + 1
                    ).toLocaleString(
                      "fa-IR"
                    )}
                    {" / "}
                    {images.length.toLocaleString(
                      "fa-IR"
                    )}
                  </span>

                )}

              </div>


              {/* تصاویر کوچک */}

              {images.length > 1 && (

                <div
                  className="
                    mt-3
                    flex
                    gap-2
                    overflow-x-auto
                    pb-1
                  "
                >

                  {images.map(
                    (
                      image,
                      index
                    ) => (

                      <button
                        key={index}
                        type="button"
                        onClick={() =>
                          setSelectedImage(
                            index
                          )
                        }
                        className={`
                          h-16
                          w-16
                          shrink-0
                          overflow-hidden
                          rounded-xl
                          border-2
                          bg-white
                          transition

                          ${
                            selectedImage ===
                            index

                              ? `
                                border-green-600
                                ring-2
                                ring-green-100
                              `

                              : `
                                border-white
                                opacity-70
                              `
                          }
                        `}
                      >

                        <img
                          src={image}
                          alt=""
                          className="
                            h-full
                            w-full
                            object-cover
                          "
                        />

                      </button>

                    )
                  )}

                </div>

              )}

            </div>


            {/* ========================================
                اطلاعات اصلی
            ======================================== */}

            <div
              className="
                flex
                min-w-0
                flex-col
              "
            >

              {/* Badge ها */}

              <div
                className="
                  flex
                  flex-wrap
                  gap-2
                "
              >

                <span
                  className="
                    inline-flex
                    items-center
                    gap-1
                    rounded-full
                    bg-green-100
                    px-3
                    py-1.5
                    text-[10px]
                    font-black
                    text-green-800
                  "
                >

                  <GraduationCap
                    size={13}
                  />

                  دوره آموزشی

                </span>


                <span
                  className="
                    rounded-full
                    border
                    border-green-100
                    bg-white
                    px-3
                    py-1.5
                    text-[10px]
                    font-black
                    text-green-700
                  "
                >
                  {getServiceTypeLabel(
                    service.serviceType
                  )}
                </span>


                <span
                  className="
                    rounded-full
                    bg-emerald-50
                    px-3
                    py-1.5
                    text-[10px]
                    font-black
                    text-emerald-700
                  "
                >
                  منتشرشده
                </span>

              </div>


              {/* عنوان اصلی */}

              <h1
                className="
                  mt-4
                  text-2xl
                  font-black
                  leading-10
                  text-[#14532d]
                  sm:text-3xl
                "
              >
                {service.title}
              </h1>


              {/* عنوان بسته */}

              {packageInfo.title &&
                packageInfo.title !==
                  service.title && (

                <p
                  className="
                    mt-1
                    text-sm
                    font-black
                    text-green-700
                  "
                >
                  {packageInfo.title}
                </p>

              )}


              {/* برگزارکننده */}

              <div
                className="
                  mt-4
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-stone-500
                "
              >

                <Building2
                  className="
                    h-4
                    w-4
                    text-green-600
                  "
                />

                <span>
                  برگزارکننده:
                </span>


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
                    text-green-700
                    transition
                    hover:underline
                    disabled:opacity-50
                  "
                >

                  {openingVendorPage
                    ? "در حال ورود..."
                    : organizerName
                  }

                </button>

              </div>


              {/* توضیحات */}

              <p
                className="
                  mt-5
                  whitespace-pre-line
                  text-sm
                  leading-8
                  text-stone-600
                "
              >
                {service.description ||
                  "توضیحاتی برای این دوره ثبت نشده است."}
              </p>


              {/* قیمت */}

              <div
                className="
                  mt-5
                  rounded-2xl
                  border
                  border-green-100
                  bg-gradient-to-l
                  from-green-50
                  to-white
                  p-4
                "
              >

                <p
                  className="
                    text-[10px]
                    font-bold
                    text-stone-400
                  "
                >
                  هزینه ثبت‌نام در دوره
                </p>


                <p
                  className="
                    mt-1
                    text-2xl
                    font-black
                    text-green-800
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
                  grid-cols-2
                  gap-2
                "
              >

                <QuickInfo
                  icon={
                    <CalendarDays
                      size={17}
                    />
                  }
                  label="شروع دوره"
                  value={
                    formatDate(
                      packageInfo.startDate
                    )
                  }
                />


                <QuickInfo
                  icon={
                    <BookOpen
                      size={17}
                    />
                  }
                  label="تعداد جلسات"
                  value={
                    `${Number(
                      packageInfo.totalSessions ||
                      0
                    ).toLocaleString(
                      "fa-IR"
                    )} جلسه`
                  }
                />


                <QuickInfo
                  icon={
                    <Clock3
                      size={17}
                    />
                  }
                  label="ساعت برگزاری"
                  value={
                    `${formatClock(
                      packageInfo.startTime
                    )} تا ${formatClock(
                      packageInfo.endTime
                    )}`
                  }
                />


                <QuickInfo
                  icon={
                    <UsersRound
                      size={17}
                    />
                  }
                  label="ظرفیت دوره"
                  value={
                    `${Number(
                      packageInfo.capacity ||
                      0
                    ).toLocaleString(
                      "fa-IR"
                    )} نفر`
                  }
                />

              </div>

            </div>

          </div>


          {/* ========================================
              برنامه دوره
          ======================================== */}

          <section
            className="
              mt-7
              border-t
              border-green-100
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

              <CalendarRange
                className="
                  h-5
                  w-5
                  text-green-600
                "
              />

              <h2
                className="
                  text-lg
                  font-black
                  text-[#14532d]
                "
              >
                برنامه برگزاری دوره
              </h2>

            </div>


            <div
              className="
                grid
                gap-3
                sm:grid-cols-2
                lg:grid-cols-4
              "
            >

              <CourseInfoCard
                title="تاریخ شروع"
                value={
                  formatDate(
                    packageInfo.startDate
                  )
                }
              />


              <CourseInfoCard
                title="تعداد جلسات"
                value={
                  `${Number(
                    packageInfo.totalSessions ||
                    0
                  ).toLocaleString(
                    "fa-IR"
                  )} جلسه`
                }
              />


              <CourseInfoCard
                title="ساعت هر جلسه"
                value={
                  `${formatClock(
                    packageInfo.startTime
                  )} تا ${formatClock(
                    packageInfo.endTime
                  )}`
                }
              />


              <CourseInfoCard
                title="ظرفیت کل دوره"
                value={
                  `${Number(
                    packageInfo.capacity ||
                    0
                  ).toLocaleString(
                    "fa-IR"
                  )} نفر`
                }
              />

            </div>


            {/* روزهای هفته */}

            <div
              className="
                mt-4
                rounded-2xl
                border
                border-green-100
                bg-[#f8fdf9]
                p-4
              "
            >

              <p
                className="
                  text-xs
                  font-black
                  text-green-800
                "
              >
                روزهای برگزاری
              </p>


              {Array.isArray(
                packageInfo.weekdays
              ) &&
              packageInfo.weekdays.length >
                0 ? (

                <div
                  className="
                    mt-3
                    flex
                    flex-wrap
                    gap-2
                  "
                >

                  {packageInfo.weekdays.map(
                    (day) => (

                      <span
                        key={day}
                        className="
                          rounded-xl
                          border
                          border-green-200
                          bg-white
                          px-3
                          py-2
                          text-xs
                          font-black
                          text-green-700
                          shadow-sm
                        "
                      >
                        {day}
                      </span>

                    )
                  )}

                </div>

              ) : (

                <p
                  className="
                    mt-2
                    text-xs
                    text-stone-400
                  "
                >
                  روزهای برگزاری ثبت نشده است.
                </p>

              )}

            </div>

          </section>


          {/* ========================================
              گروه سنی + محل
          ======================================== */}

          <div
            className="
              mt-7
              grid
              gap-4
              border-t
              border-green-100
              pt-6
              md:grid-cols-2
            "
          >

            {/* گروه سنی */}

            <section
              className="
                rounded-2xl
                border
                border-green-100
                bg-white
                p-4
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <BadgeCheck
                  className="
                    h-5
                    w-5
                    text-green-600
                  "
                />

                <h2
                  className="
                    text-sm
                    font-black
                    text-[#14532d]
                  "
                >
                  گروه سنی پیشنهادی
                </h2>

              </div>


              <div
                className="
                  mt-4
                  rounded-xl
                  bg-green-50
                  px-4
                  py-3
                "
              >

                <p
                  className="
                    text-[10px]
                    font-bold
                    text-stone-400
                  "
                >
                  رده سنی مناسب
                </p>


                <p
                  className="
                    mt-1
                    text-sm
                    font-black
                    text-green-800
                  "
                >
                  {ageText}
                </p>

              </div>


              {(service.minAge !==
                null &&
                service.minAge !==
                  undefined) && (

                <InfoRow
                  label="حداقل سن"
                  value={`${service.minAge} سال`}
                />

              )}


              {(service.maxAge !==
                null &&
                service.maxAge !==
                  undefined) && (

                <InfoRow
                  label="حداکثر سن"
                  value={`${service.maxAge} سال`}
                />

              )}

            </section>


            {/* محل */}

            <section
              className="
                rounded-2xl
                border
                border-green-100
                bg-white
                p-4
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <MapPin
                  className="
                    h-5
                    w-5
                    text-green-600
                  "
                />

                <h2
                  className="
                    text-sm
                    font-black
                    text-[#14532d]
                  "
                >
                  محل برگزاری و ارتباط
                </h2>

              </div>


              <div
                className="
                  mt-4
                  space-y-2
                "
              >

                {service.locationName && (

                  <InfoBox
                    icon={
                      <MapPin
                        size={15}
                      />
                    }
                    label="محل برگزاری"
                    value={
                      service.locationName
                    }
                  />

                )}


                {service.contactPhone && (

                  <InfoBox
                    icon={
                      <Phone
                        size={15}
                      />
                    }
                    label="شماره تماس"
                    value={
                      service.contactPhone
                    }
                  />

                )}

              </div>

            </section>

          </div>


          {/* ========================================
              آدرس
          ======================================== */}

          {service.address && (

            <section
              className="
                mt-4
                rounded-2xl
                border
                border-green-100
                bg-white
                p-4
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <MapPin
                  size={18}
                  className="
                    text-green-600
                  "
                />

                <h2
                  className="
                    text-sm
                    font-black
                    text-[#14532d]
                  "
                >
                  آدرس کامل
                </h2>

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
                {service.address}
              </p>

            </section>

          )}


          {/* ========================================
              قوانین
          ======================================== */}

          {service.rules && (

            <section
              className="
                mt-4
                rounded-2xl
                border
                border-amber-100
                bg-amber-50/60
                p-4
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <ShieldCheck
                  className="
                    h-5
                    w-5
                    text-amber-600
                  "
                />

                <h2
                  className="
                    text-sm
                    font-black
                    text-[#14532d]
                  "
                >
                  شرایط و قوانین دوره
                </h2>

              </div>


              <p
                className="
                  mt-3
                  whitespace-pre-line
                  text-sm
                  leading-8
                  text-stone-600
                "
              >
                {service.rules}
              </p>

            </section>

          )}


          {/* ========================================
              ثبت نام
          ======================================== */}

          <section
            className="
              mt-7
              rounded-[1.75rem]
              border
              border-green-200
              bg-gradient-to-l
              from-green-50
              via-white
              to-emerald-50
              p-4
              sm:p-5
            "
          >

            <div
              className="
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >

              <div>

                <p
                  className="
                    text-sm
                    font-black
                    text-[#14532d]
                  "
                >
                  ثبت‌نام در این دوره
                </p>


                <p
                  className="
                    mt-1
                    text-xs
                    leading-6
                    text-stone-500
                  "
                >
                  با ثبت‌نام، کل دوره و برنامه جلسات آن برای شما رزرو خواهد شد.
                </p>

              </div>


              <div
                className="
                  text-right
                  sm:text-left
                "
              >

                <p
                  className="
                    text-[10px]
                    font-bold
                    text-stone-400
                  "
                >
                  هزینه دوره
                </p>


                <p
                  className="
                    mt-1
                    text-lg
                    font-black
                    text-green-800
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

            </div>


            <button
              type="button"
              onClick={() => {

                alert(
                  "بخش ثبت‌نام دوره در مرحله بعد به سیستم رزرو ژنینو متصل می‌شود."
                );

              }}
              className="
                mt-4
                w-full
                rounded-xl
                bg-gradient-to-r
                from-green-800
                via-emerald-700
                to-green-600
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
              {service.isFree
                ? "ثبت‌نام در دوره"
                : "ادامه و ثبت‌نام"
              }
            </button>

          </section>

        </section>

      </div>

    </main>

  );

}


/*
|--------------------------------------------------------------------------
| QuickInfo
|--------------------------------------------------------------------------
*/

function QuickInfo({
  icon,
  label,
  value,
}) {

  return (

    <div
      className="
        rounded-xl
        border
        border-green-100
        bg-white
        p-3
      "
    >

      <div
        className="
          flex
          items-center
          gap-1.5
          text-green-600
        "
      >
        {icon}

        <span
          className="
            text-[9px]
            font-bold
            text-stone-400
          "
        >
          {label}
        </span>
      </div>


      <p
        className="
          mt-2
          text-xs
          font-black
          leading-5
          text-[#14532d]
        "
      >
        {value}
      </p>

    </div>

  );

}


/*
|--------------------------------------------------------------------------
| CourseInfoCard
|--------------------------------------------------------------------------
*/

function CourseInfoCard({
  title,
  value,
}) {

  return (

    <div
      className="
        rounded-2xl
        border
        border-green-100
        bg-[#f8fdf9]
        p-4
      "
    >

      <p
        className="
          text-[10px]
          font-bold
          text-stone-400
        "
      >
        {title}
      </p>


      <p
        className="
          mt-2
          text-sm
          font-black
          text-green-800
        "
      >
        {value}
      </p>

    </div>

  );

}


/*
|--------------------------------------------------------------------------
| InfoRow
|--------------------------------------------------------------------------
*/

function InfoRow({
  label,
  value,
}) {

  return (

    <div
      className="
        mt-2
        flex
        items-center
        justify-between
        rounded-xl
        bg-[#f8fdf9]
        px-3
        py-2.5
        text-xs
      "
    >

      <span
        className="
          text-stone-500
        "
      >
        {label}
      </span>


      <span
        className="
          font-black
          text-green-800
        "
      >
        {value}
      </span>

    </div>

  );

}


/*
|--------------------------------------------------------------------------
| InfoBox
|--------------------------------------------------------------------------
*/

function InfoBox({
  icon,
  label,
  value,
}) {

  return (

    <div
      className="
        flex
        items-start
        gap-2
        rounded-xl
        bg-[#f8fdf9]
        px-3
        py-3
      "
    >

      <span
        className="
          mt-0.5
          shrink-0
          text-green-600
        "
      >
        {icon}
      </span>


      <div
        className="
          min-w-0
        "
      >

        <p
          className="
            text-[9px]
            font-bold
            text-stone-400
          "
        >
          {label}
        </p>


        <p
          className="
            mt-1
            break-words
            text-xs
            font-black
            leading-5
            text-green-800
          "
        >
          {value}
        </p>

      </div>

    </div>

  );

}