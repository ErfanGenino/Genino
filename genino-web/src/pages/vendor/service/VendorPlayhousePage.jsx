// D:\projects\Genino\genino-web\src\pages\vendor\service\VendorPlayhousePage.jsx
import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  Baby,
  Save,
  MapPin,
  Clock3,
  UsersRound,
  Upload,
  Trash2,
  Pencil,
  Award,
  Gamepad2,
} from "lucide-react";

import PromoSlider from "../../../components/Social/PromoSlider.jsx";
import ProductCard from "../../../components/Product/ProductCard";
import PlayhouseChildrenSection from "./components/PlayhouseChildrenSection";
import {
  presignVendorKindergartenHeaderUpload,
  presignVendorKindergartenStaffUpload,
  putFileToPresignedUrl,
  createPlayhouseAchievement,
  getPlayhouseAchievements,
} from "../../../services/api";


// =========================================================
// ثابت‌ها
// =========================================================

const AGE_OPTIONS = [
  "۱ تا ۳ سال",
        "۳ تا ۵ سال",
        "۵ تا ۷ سال",
        "۷ تا ۱۰ سال",
        "۱۰ سال به بالا",
        "همه رده‌های سنی",
];


const WEEK_DAYS = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
];


const PLAYHOUSE_FEATURES = [
  "برگزاری جشن تولد",
    "برگزاری رویدادهای کودک",
    "کافی‌شاپ والدین",
    "فضای استراحت والدین",
    "اتاق انتظار",
    "پارکینگ",
    "دوربین نظارتی",
    "مربی کودک",
    "مربی تخصصی بازی",
    "عکاسی و فیلمبرداری",
    "پذیرایی جشن",
    "تم و دکور جشن",
    "اتاق مادر و کودک",
    "بوفه و فروش تنقلات",
    "سیستم تهویه مناسب",
    "سرویس بهداشتی کودک",
    "امکانات ایمنی استاندارد",
    "بیمه کودکان",
    "رزرو آنلاین",
];


const PROGRAM_OPTIONS = [
  "بازی‌های فکری",
    "بازی‌های حرکتی",
    "بازی‌های آموزشی",
    "بازی‌های خلاقیت",
    "بازی‌های گروهی",
    "بازی‌های نقش‌آفرینی",
    "بازی‌های تعاملی",
    "بازی‌های حسی",
    "بازی‌های علمی و کشف",
    "بازی‌های ساختنی",
    "بازی‌های دیجیتال کودک",
    "بازی‌های ماجراجویی",
    "اتاق شن و ماسه",
    "استخر توپ",
    "ترامپولین کودک",
    "شهربازی سرپوشیده",
    "خانه مشاغل کودک",
];

const getAuthToken = () =>
  localStorage.getItem("genino_token");

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

const buildApiUrl = (path) => {
  const base = String(API_BASE_URL || "").replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (!base) {
    throw new Error(
      "VITE_API_BASE_URL تنظیم نشده است. مقدار آن باید مثل http://localhost:80/api باشد."
    );
  }

  return `${base}${normalizedPath}`;
};

async function parseJsonResponse(response) {
  const contentType =
    response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    const text = await response.text();

    throw new Error(
      `پاسخ سرور JSON نیست (${response.status}). ` +
      `آدرس درخواست یا تنظیمات API را بررسی کنید. ` +
      `${text.slice(0, 80)}`
    );
  }

  return response.json();
}


function PublicPlayhouseView({
  playhouse,
  products = [],
  services = [],
  loadingProducts,
  loadingServices,
}) {

  const navigate = useNavigate();

  const [
    publicActiveHeaderIndex,
    setPublicActiveHeaderIndex,
  ] = useState(0);


  const headerImages =
    Array.isArray(
      playhouse?.headerImages
    )
      ? playhouse.headerImages
      : [];


  const acceptedAges =
    Array.isArray(
      playhouse?.acceptedAges
    )
      ? playhouse.acceptedAges
      : [];


  const workingSchedule =
    Array.isArray(
      playhouse?.workingSchedule
    )
      ? playhouse.workingSchedule
      : [];


  const facilities =
    Array.isArray(
      playhouse?.facilities
    )
      ? playhouse.facilities
      : [];


  const educationalPrograms =
    Array.isArray(
      playhouse?.educationalPrograms
    )
      ? playhouse.educationalPrograms
      : [];


  const staffMembers =
    Array.isArray(
      playhouse?.staffMembers
    )
      ? playhouse.staffMembers.filter(
          (member) =>
            member?.name ||
            member?.position ||
            member?.education ||
            member?.experience ||
            member?.image
        )
      : [];


  const eventServices =
    services.filter(
      (service) =>
        !service.package &&
        service.scheduleMode !==
          "PACKAGE"
    );


  const courseServices =
    services.filter(
      (service) =>
        service.package ||
        service.scheduleMode ===
          "PACKAGE"
    );


  return (

    <main
      dir="rtl"
      className="
        min-h-screen
        bg-[#faf7ef]
        px-3
        py-5
        text-gray-800
        sm:px-5
      "
    >

      <div
        className="
          mx-auto
          max-w-6xl
          space-y-5
        "
      >

        {/* =====================================
            تصاویر و معرفی خانه بازی
        ===================================== */}

        <section
          className="
            rounded-3xl
            border
            border-green-100
            bg-white
            p-5
            shadow
          "
        >

          <div
            className="
              mx-auto
              w-full
              max-w-3xl
              overflow-hidden
              rounded-3xl
            "
          >

            {headerImages.length > 0 ? (

              <div>

                <PromoSlider
                  variant="golden"
                  interval={7000}
                  height="h-44 sm:h-52 md:h-60 lg:h-64"
                  slides={
                    headerImages.map(
                      (item, index) => ({
                        id: index,

                        image:
                          typeof item ===
                          "string"
                            ? item
                            : item?.url ||
                              "",

                        title: "",
                      })
                    )
                  }
                  onIndexChange={(
                    index
                  ) =>
                    setPublicActiveHeaderIndex(
                      index
                    )
                  }
                />


                {typeof headerImages[
                  publicActiveHeaderIndex
                ] !== "string" &&
                  headerImages[
                    publicActiveHeaderIndex
                  ]?.description && (

                    <div
                      className="
                        mt-3
                        rounded-xl
                        bg-green-50
                        px-4
                        py-3
                        text-center
                        text-sm
                        font-bold
                        leading-7
                        text-[#276749]
                      "
                    >
                      {
                        headerImages[
                          publicActiveHeaderIndex
                        ].description
                      }
                    </div>

                  )}

              </div>

            ) : (

              <div
                className="
                  flex
                  h-52
                  items-center
                  justify-center
                  rounded-3xl
                  bg-gradient-to-r
                  from-green-100
                  to-emerald-100
                "
              >
                <Gamepad2
                  className="
                    h-14
                    w-14
                    text-green-700
                  "
                />
              </div>

            )}

          </div>


          <div
            className="
              mx-auto
              max-w-3xl
              px-2
              pb-2
              pt-5
              text-center
            "
          >

            <h1
              className="
                text-xl
                font-black
                text-[#1f5138]
                sm:text-2xl
              "
            >
              {playhouse?.playhouseName ||
                "خانه بازی ژنینو"}
            </h1>


            {playhouse?.slogan && (

              <p
                className="
                  mt-2
                  text-sm
                  font-bold
                  text-[#3f9b6d]
                "
              >
                {playhouse.slogan}
              </p>

            )}


            {playhouse?.description && (

              <p
                className="
                  mt-4
                  whitespace-pre-line
                  text-sm
                  leading-7
                  text-gray-600
                "
              >
                {playhouse.description}
              </p>

            )}


            <div
              className="
                mt-4
                flex
                flex-wrap
                justify-center
                gap-2
              "
            >

              {playhouse?.gender && (

                <PublicPlayhouseBadge>
                  {playhouse.gender}
                </PublicPlayhouseBadge>

              )}


              {acceptedAges.map(
                (age) => (

                  <PublicPlayhouseBadge
                    key={age}
                  >
                    {age}
                  </PublicPlayhouseBadge>

                )
              )}

            </div>

          </div>

        </section>


        {/* =====================================
            محصولات
        ===================================== */}

        <section
          className="
            rounded-[2rem]
            border
            border-green-100
            bg-white
            p-5
            shadow-md
          "
        >

          <h2
            className="
              font-black
              text-[#276749]
            "
          >
            محصولات خانه بازی
          </h2>


          {loadingProducts ? (

            <p
              className="
                py-8
                text-center
                text-sm
                font-bold
                text-gray-400
              "
            >
              در حال دریافت محصولات...
            </p>

          ) : products.length > 0 ? (

            <div
              className="
                mt-5
                grid
                grid-cols-2
                gap-3
                sm:grid-cols-3
                sm:gap-4
                lg:grid-cols-4
                lg:gap-6
              "
            >

              {products.map(
                (product) => (

                  <ProductCard
                    key={product.id}
                    product={product}
                    source="playhouse-public"
                    showFavorite={true}
                  />

                )
              )}

            </div>

          ) : (

            <p
              className="
                py-8
                text-center
                text-sm
                text-gray-400
              "
            >
              هنوز محصولی از این خانه بازی منتشر نشده است.
            </p>

          )}

        </section>


        {/* =====================================
            رویدادها و خدمات
        ===================================== */}

        <PublicPlayhouseServicesSection
          title="رویدادها و خدمات خانه بازی"
          description="جشن‌ها، کارگاه‌ها، برنامه‌های تفریحی و سایر خدمات قابل رزرو خانه بازی"
          services={eventServices}
          loading={loadingServices}
          navigate={navigate}
        />


        {/* =====================================
            دوره‌ها و کلاس‌ها
        ===================================== */}

        {courseServices.length > 0 && (

          <PublicPlayhouseServicesSection
            title="دوره‌ها و کلاس‌های آموزشی"
            description="دوره‌ها و برنامه‌های چندجلسه‌ای خانه بازی"
            services={courseServices}
            loading={loadingServices}
            navigate={navigate}
          />

        )}


        {/* =====================================
            اطلاعات تماس
        ===================================== */}

        <PublicPlayhouseInfoSection
          title="اطلاعات تماس و آدرس"
        >

          <PublicPlayhouseInfoItem
            label="شهر"
            value={playhouse?.city}
          />

          <PublicPlayhouseInfoItem
            label="منطقه"
            value={playhouse?.district}
          />

          <PublicPlayhouseInfoItem
            label="شماره تماس"
            value={playhouse?.phone}
          />

          <PublicPlayhouseInfoItem
            label="ایمیل"
            value={playhouse?.email}
          />

          <PublicPlayhouseInfoItem
            label="آدرس دقیق"
            value={playhouse?.address}
            fullWidth
          />

        </PublicPlayhouseInfoSection>


        {/* =====================================
            اطلاعات پذیرش
        ===================================== */}

        <PublicPlayhouseInfoSection
          title="اطلاعات پذیرش کودکان"
        >

          <PublicPlayhouseInfoItem
            label="جنسیت پذیرش"
            value={playhouse?.gender}
          />

          <PublicPlayhouseInfoItem
            label="ظرفیت پذیرش"
            value={
              playhouse?.childCapacity
            }
          />

          <PublicPlayhouseInfoItem
            label="گروه‌های سنی"
            value={
              acceptedAges.join("، ")
            }
            fullWidth
          />

        </PublicPlayhouseInfoSection>


        {/* =====================================
            ساعات فعالیت
        ===================================== */}

        {workingSchedule.length > 0 && (

          <section
            className="
              rounded-[2rem]
              border
              border-green-100
              bg-white
              p-5
              shadow-md
            "
          >

            <h2
              className="
                mb-5
                font-black
                text-[#276749]
              "
            >
              روزها و ساعات فعالیت
            </h2>


            <div className="space-y-3">

              {workingSchedule.map(
                (
                  schedule,
                  index
                ) => (

                  <div
                    key={index}
                    className="
                      rounded-2xl
                      bg-green-50
                      p-4
                    "
                  >

                    <p
                      className="
                        text-sm
                        font-black
                        text-[#1f5138]
                      "
                    >
                      {Array.isArray(
                        schedule.days
                      )
                        ? schedule.days.join(
                            "، "
                          )
                        : ""}
                    </p>


                    {(schedule.openingTime ||
                      schedule.closingTime) && (

                      <p
                        className="
                          mt-2
                          text-xs
                          font-bold
                          text-gray-500
                        "
                      >
                        ساعت فعالیت:
                        {" "}
                        {schedule.openingTime ||
                          "—"}
                        {" تا "}
                        {schedule.closingTime ||
                          "—"}
                      </p>

                    )}

                  </div>

                )
              )}

            </div>

          </section>

        )}


        {/* =====================================
            مشخصات مجموعه
        ===================================== */}

        <PublicPlayhouseInfoSection
          title="مشخصات خانه بازی"
        >

          <PublicPlayhouseInfoItem
            label="سال تأسیس"
            value={
              playhouse?.foundedYear
            }
          />

          <PublicPlayhouseInfoItem
            label="ظرفیت پذیرش کودک"
            value={
              playhouse?.childCapacity
            }
          />

          <PublicPlayhouseInfoItem
            label="وسعت مجموعه"
            value={
              playhouse?.area
            }
          />

          <PublicPlayhouseInfoItem
            label="تعداد اتاق‌ها"
            value={
              playhouse?.roomCount
            }
          />

        </PublicPlayhouseInfoSection>


        {/* =====================================
            امکانات
        ===================================== */}

        {facilities.length > 0 && (

          <section
            className="
              rounded-[2rem]
              border
              border-green-100
              bg-white
              p-5
              shadow-md
            "
          >

            <h2
              className="
                mb-4
                font-black
                text-[#276749]
              "
            >
              امکانات خانه بازی
            </h2>


            <div
              className="
                flex
                flex-wrap
                gap-2
              "
            >

              {facilities.map(
                (item) => (

                  <PublicPlayhouseBadge
                    key={item}
                  >
                    {item}
                  </PublicPlayhouseBadge>

                )
              )}

            </div>

          </section>

        )}


        {/* =====================================
            برنامه‌ها و فعالیت‌ها
        ===================================== */}

        {educationalPrograms.length >
          0 && (

          <section
            className="
              rounded-[2rem]
              border
              border-green-100
              bg-white
              p-5
              shadow-md
            "
          >

            <h2
              className="
                mb-4
                font-black
                text-[#276749]
              "
            >
              برنامه‌ها و فعالیت‌های خانه بازی
            </h2>


            <div
              className="
                flex
                flex-wrap
                gap-2
              "
            >

              {educationalPrograms.map(
                (item) => (

                  <PublicPlayhouseBadge
                    key={item}
                  >
                    {item}
                  </PublicPlayhouseBadge>

                )
              )}

            </div>

          </section>

        )}


        {/* =====================================
            برنامه غذایی
        ===================================== */}

        <PublicPlayhouseYesNoSection
          title="برنامه غذایی کودکان"
          enabled={
            playhouse?.hasMealProgram
          }
          yesText="این خانه بازی دارای برنامه غذایی است."
          noText="برنامه غذایی ارائه نمی‌شود."
          description={
            playhouse?.mealDescription
          }
        />


        {/* =====================================
            سرویس رفت‌وآمد
        ===================================== */}

        <PublicPlayhouseYesNoSection
          title="سرویس رفت‌وآمد کودکان"
          enabled={
            playhouse?.hasTransportation
          }
          yesText="این خانه بازی دارای سرویس رفت‌وآمد است."
          noText="سرویس رفت‌وآمد ارائه نمی‌شود."
          description={
            playhouse
              ?.transportationDescription
          }
        />


        {/* =====================================
            مربیان
        ===================================== */}

        <PublicPlayhouseInfoSection
          title="کادر آموزشی و مربیان"
        >

          <PublicPlayhouseInfoItem
            label="تعداد مربیان"
            value={
              playhouse?.teacherCount
            }
          />

          <PublicPlayhouseInfoItem
            label="میانگین سابقه مربیان"
            value={
              playhouse?.teacherExperience
            }
          />

        </PublicPlayhouseInfoSection>


        {/* =====================================
            اعضای مجموعه
        ===================================== */}

        {staffMembers.length > 0 && (

          <section
            className="
              rounded-[2rem]
              border
              border-green-100
              bg-white
              p-5
              shadow-md
            "
          >

            <h2
              className="
                mb-4
                font-black
                text-[#276749]
              "
            >
              اعضای خانه بازی
            </h2>


            <div className="space-y-3">

              {staffMembers.map(
                (
                  member,
                  index
                ) => (

                  <div
                    key={index}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      bg-green-50
                      p-3
                    "
                  >

                    <div
                      className="
                        flex
                        h-14
                        w-14
                        shrink-0
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-full
                        bg-green-100
                        text-xs
                        text-gray-400
                      "
                    >

                      {member.image ? (

                        <img
                          src={
                            member.image
                          }
                          alt={
                            member.name ||
                            ""
                          }
                          className="
                            h-full
                            w-full
                            object-cover
                          "
                        />

                      ) : (
                        "عکس"
                      )}

                    </div>


                    <div
                      className="
                        grid
                        flex-1
                        grid-cols-2
                        gap-2
                        text-xs
                        sm:grid-cols-4
                      "
                    >

                      <PublicPlayhouseStaffValue
                        label="نام"
                        value={
                          member.name
                        }
                      />

                      <PublicPlayhouseStaffValue
                        label="سمت"
                        value={
                          member.position
                        }
                      />

                      <PublicPlayhouseStaffValue
                        label="تحصیلات"
                        value={
                          member.education
                        }
                      />

                      <PublicPlayhouseStaffValue
                        label="سابقه"
                        value={
                          member.experience
                        }
                      />

                    </div>

                  </div>

                )
              )}

            </div>

          </section>

        )}


        {/* =====================================
            رزومه
        ===================================== */}

        {playhouse?.resume && (

          <section
            className="
              rounded-[2rem]
              border
              border-green-100
              bg-white
              p-5
              shadow-md
            "
          >

            <h2
              className="
                font-black
                text-[#276749]
              "
            >
              معرفی و رزومه خانه بازی
            </h2>

            <p
              className="
                mt-4
                whitespace-pre-line
                text-sm
                leading-8
                text-gray-600
              "
            >
              {playhouse.resume}
            </p>

          </section>

        )}

      </div>

    </main>

  );
}


function PublicPlayhouseBadge({
  children,
}) {

  return (
    <span
      className="
        rounded-full
        border
        border-green-200
        bg-green-50
        px-3
        py-1.5
        text-xs
        font-bold
        text-[#276749]
      "
    >
      {children}
    </span>
  );
}


function PublicPlayhouseInfoSection({
  title,
  children,
}) {

  return (
    <section
      className="
        rounded-[2rem]
        border
        border-green-100
        bg-white
        p-5
        shadow-md
      "
    >

      <h2
        className="
          mb-5
          font-black
          text-[#276749]
        "
      >
        {title}
      </h2>


      <div
        className="
          grid
          grid-cols-1
          gap-3
          sm:grid-cols-2
        "
      >
        {children}
      </div>

    </section>
  );
}


function PublicPlayhouseInfoItem({
  label,
  value,
  fullWidth = false,
}) {

  const normalizedValue =
    value === null ||
    value === undefined
      ? ""
      : String(value).trim();


  if (!normalizedValue) {
    return null;
  }


  return (
    <div
      className={`
        flex
        items-center
        gap-2
        rounded-xl
        bg-green-50
        px-3
        py-2

        ${
          fullWidth
            ? "sm:col-span-2"
            : ""
        }
      `}
    >

      <span
        className="
          shrink-0
          text-[11px]
          font-bold
          text-gray-400
        "
      >
        {label}
      </span>


      <span
        className="
          text-xs
          font-black
          text-[#276749]
        "
      >
        |
      </span>


      <span
        className="
          min-w-0
          break-words
          text-xs
          font-bold
          text-[#1f5138]
        "
      >
        {normalizedValue}
      </span>

    </div>
  );
}


function PublicPlayhouseStaffValue({
  label,
  value,
}) {

  return (
    <div>

      <p
        className="
          text-[10px]
          text-gray-400
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          break-words
          font-bold
          text-[#1f5138]
        "
      >
        {value || "ثبت نشده"}
      </p>

    </div>
  );
}


function PublicPlayhouseYesNoSection({
  title,
  enabled,
  yesText,
  noText,
  description,
}) {

  return (
    <section
      className="
        rounded-[2rem]
        border
        border-green-100
        bg-white
        p-5
        shadow-md
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

        <h2
          className="
            font-black
            text-[#276749]
          "
        >
          {title}
        </h2>


        <span
          className={`
            rounded-full
            px-3
            py-1
            text-xs
            font-black

            ${
              enabled
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-500"
            }
          `}
        >
          {enabled
            ? "دارد"
            : "ندارد"}
        </span>

      </div>


      <p
        className="
          mt-4
          text-sm
          font-bold
          text-gray-600
        "
      >
        {enabled
          ? yesText
          : noText}
      </p>


      {enabled &&
        description && (

          <p
            className="
              mt-3
              whitespace-pre-line
              text-sm
              leading-7
              text-gray-500
            "
          >
            {description}
          </p>

        )}

    </section>
  );
}

function PublicPlayhouseServicesSection({
  title,
  description,
  services = [],
  loading,
  navigate,
}) {

  const typeLabels = {
    EVENT: "جشن و رویداد",
    CLASS: "کلاس",
    WORKSHOP: "کارگاه",
    CAMP: "اردو",
    CONSULTATION: "مشاوره",
    OTHER: "سایر خدمات",
  };


  const getServiceImage = (service) => {

    if (
      Array.isArray(service?.images) &&
      service.images.length > 0
    ) {

      const firstImage =
        service.images[0];

      if (
        typeof firstImage === "string"
      ) {
        return firstImage;
      }

      return (
        firstImage?.url ||
        firstImage?.imageUrl ||
        ""
      );
    }


    if (
      typeof service?.images ===
      "string"
    ) {

      try {

        const parsed =
          JSON.parse(
            service.images
          );

        if (
          Array.isArray(parsed) &&
          parsed.length > 0
        ) {

          const firstImage =
            parsed[0];

          return typeof firstImage ===
            "string"
            ? firstImage
            : firstImage?.url ||
                firstImage?.imageUrl ||
                "";
        }

      } catch {
        return "";
      }
    }


    return (
      service?.image ||
      service?.imageUrl ||
      ""
    );
  };


  const getServicePrice = (
    service
  ) => {

    if (
      service?.isFree === true ||
      Number(service?.price) === 0
    ) {
      return "رایگان";
    }


    const price =
      Number(service?.price || 0);


    if (!price) {
      return "قیمت ثبت نشده";
    }


    return `${price.toLocaleString(
      "fa-IR"
    )} تومان`;
  };


  if (loading) {

    return (
      <section
        className="
          rounded-[2rem]
          border
          border-green-100
          bg-white
          p-5
          shadow-md
        "
      >

        <h2
          className="
            font-black
            text-[#276749]
          "
        >
          {title}
        </h2>


        {description && (

          <p
            className="
              mt-2
              text-xs
              leading-6
              text-gray-500
            "
          >
            {description}
          </p>

        )}


        <p
          className="
            py-10
            text-center
            text-sm
            font-bold
            text-gray-400
          "
        >
          در حال دریافت خدمات...
        </p>

      </section>
    );
  }


  return (

    <section
      className="
        rounded-[2rem]
        border
        border-green-100
        bg-white
        p-5
        shadow-md
      "
    >

      <h2
        className="
          font-black
          text-[#276749]
        "
      >
        {title}
      </h2>


      {description && (

        <p
          className="
            mt-2
            text-xs
            leading-6
            text-gray-500
          "
        >
          {description}
        </p>

      )}


      {services.length > 0 ? (

        <div
  className="
    mt-5
    grid
    grid-cols-2
    gap-3
    sm:grid-cols-3
    sm:gap-4
    lg:grid-cols-4
    lg:gap-6
  "
>

          {services.map(
            (service) => {

              const image =
                getServiceImage(
                  service
                );


              return (

                <article
                  key={service.id}
                  className="
                    overflow-hidden
                    rounded-3xl
                    border
                    border-green-100
                    bg-white
                    shadow-sm
                    transition
                    hover:-translate-y-1
                    hover:shadow-md
                  "
                >

                  {/* تصویر */}

                  <div
                    className="
                      relative
                      h-40
                      overflow-hidden
                      bg-green-50
                    "
                  >

                    {image ? (

                      <img
                        src={image}
                        alt={
                          service.title ||
                          "خدمت خانه بازی"
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
                          items-center
                          justify-center
                        "
                      >

                        <Gamepad2
                          className="
                            h-12
                            w-12
                            text-green-300
                          "
                        />

                      </div>

                    )}


                    <span
                      className="
                        absolute
                        right-3
                        top-3
                        rounded-full
                        bg-white/95
                        px-3
                        py-1
                        text-[11px]
                        font-black
                        text-[#276749]
                        shadow
                      "
                    >
                      {typeLabels[
                        service.serviceType
                      ] ||
                        "خدمت"}
                    </span>

                  </div>


                  {/* اطلاعات */}

                  <div className="p-4">

                    <h3
                      className="
                        line-clamp-2
                        min-h-[3rem]
                        text-sm
                        font-black
                        leading-6
                        text-[#1f5138]
                      "
                    >
                      {service.title ||
                        "خدمت خانه بازی"}
                    </h3>


                    {service.description && (

                      <p
                        className="
                          mt-2
                          line-clamp-2
                          text-xs
                          leading-6
                          text-gray-500
                        "
                      >
                        {
                          service.description
                        }
                      </p>

                    )}


                    <div
                      className="
                        mt-4
                        flex
                        items-center
                        justify-between
                        gap-2
                      "
                    >

                      <span
                        className="
                          text-sm
                          font-black
                          text-[#276749]
                        "
                      >
                        {getServicePrice(
                          service
                        )}
                      </span>


                      {service.capacity && (

                        <span
                          className="
                            text-[11px]
                            font-bold
                            text-gray-400
                          "
                        >
                          ظرفیت:
                          {" "}
                          {
                            service.capacity
                          }
                        </span>

                      )}

                    </div>


                    <button
  type="button"
  onClick={() => {
    const isCourse =
      service.package ||
      service.scheduleMode === "PACKAGE";

    navigate(
      isCourse
        ? `/course/${service.id}`
        : `/service/${service.id}`
    );
  }}
                      className="
                        mt-4
                        w-full
                        rounded-2xl
                        bg-green-600
                        px-4
                        py-2.5
                        text-sm
                        font-black
                        text-white
                        transition
                        hover:bg-green-700
                      "
                    >
                      مشاهده و رزرو
                    </button>

                  </div>

                </article>

              );

            }
          )}

        </div>

      ) : (

        <p
          className="
            py-8
            text-center
            text-sm
            text-gray-400
          "
        >
          هنوز موردی منتشر نشده است.
        </p>

      )}

    </section>

  );
}

// =========================================================
// صفحه اصلی
// =========================================================

export default function VendorPlayhousePage() {

  const { vendorId } =
    useParams();

  const navigate =
    useNavigate();

  const [searchParams] =
  useSearchParams();

const loggedVendorId =
  localStorage.getItem(
    "genino_vendor_id"
  );

const isPublicView =
  searchParams.get("view") ===
  "public";

const isVendorOwner =
  !isPublicView &&
  Boolean(loggedVendorId) &&
  Number(loggedVendorId) ===
    Number(vendorId);


  const [
    activeHeaderIndex,
    setActiveHeaderIndex,
  ] = useState(0);


  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
  loading,
  setLoading,
] = useState(true);


  const [
    validationErrors,
    setValidationErrors,
  ] = useState({});


  const [
    selectedAchievementChild,
    setSelectedAchievementChild,
  ] = useState(null);


  const [
    achievementForm,
    setAchievementForm,
  ] = useState({
    category: "",
    title: "",
    description: "",
  });

  const [
  showAchievementHistory,
  setShowAchievementHistory,
] = useState(false);


const [
  playhouseAchievements,
  setPlayhouseAchievements,
] = useState([]);


const [
  loadingAchievements,
  setLoadingAchievements,
] = useState(false);


  // =========================================================
  // داده‌های موقت صفحه
  // بعداً به API متصل می‌شوند
  // =========================================================

  const [
  packageWindowCount,
  setPackageWindowCount,
] = useState(0);


const [
  packageAchievementLimit,
  setPackageAchievementLimit,
] = useState(0);


const [
  achievementUsedCount,
  setAchievementUsedCount,
] = useState(0);


  const [
    products,
    setProducts,
  ] = useState([]);

  const [
  loadingProducts,
  setLoadingProducts,
] = useState(true);


  const [
    services,
    setServices,
  ] = useState([]);

  const [
  loadingServices,
  setLoadingServices,
] = useState(true);


  const [
    playhouse,
    setPlayhouse,
  ] = useState({

    headerImages: [],

    playhouseName: "",
    slogan: "",
    description: "",

    city: "",
    district: "",
    address: "",
    phone: "",
    email: "",

    acceptedAges: [],
    gender: "",

    workingSchedule: [],

    childCapacity: "",

    foundedYear: "",
    area: "",
    roomCount: "",

    facilities: [],
    educationalPrograms: [],

    hasMealProgram: false,
    mealDescription: "",

    hasTransportation: false,
    transportationDescription: "",

    teacherCount: "",
    teacherExperience: "",

    staffMembers: [],

    children: [],

    resume: "",
  });

  useEffect(() => {

  const loadPlayhouseProfile =
    async () => {

      if (!vendorId) {
        setLoading(false);
        return;
      }

      try {

        setLoading(true);

        const response =
          await fetch(
            buildApiUrl(
              `/vendor-playhouse/${vendorId}`
            ),
            {
              method: "GET",
              headers: {
                Accept: "application/json",
              },
              cache: "no-store",
            }
          );

        const data =
          await parseJsonResponse(
            response
          );

        if (!response.ok || !data.ok) {
          throw new Error(
            data.message ||
              "خطا در دریافت اطلاعات خانه بازی"
          );
        }

        if (!data.profile) {
          return;
        }

        const profile =
          data.profile;

        setPlayhouse(
          (prev) => ({
            ...prev,

            ...profile,

            headerImages:
  Array.isArray(
    profile.headerImages
  )
    ? profile.headerImages.filter(
        (item) => {
          const url =
            typeof item === "string"
              ? item
              : item?.url;

          return (
            url &&
            !String(url).startsWith(
              "blob:"
            )
          );
        }
      )
    : [],

            acceptedAges:
              Array.isArray(
                profile.acceptedAges
              )
                ? profile.acceptedAges
                : [],

            workingSchedule:
              Array.isArray(
                profile.workingSchedule
              )
                ? profile.workingSchedule
                : [],

            facilities:
              Array.isArray(
                profile.facilities
              )
                ? profile.facilities
                : [],

            educationalPrograms:
              Array.isArray(
                profile.educationalPrograms
              )
                ? profile.educationalPrograms
                : [],

            staffMembers:
              Array.isArray(
                profile.staffMembers
              )
                ? profile.staffMembers
                : [],

            children:
              prev.children,
          })
        );

      } catch (error) {

        console.error(
          "LOAD PLAYHOUSE PROFILE ERROR:",
          error
        );

        alert(
          error.message ||
            "خطا در دریافت اطلاعات خانه بازی"
        );

      } finally {

        setLoading(false);

      }
    };


  loadPlayhouseProfile();

}, [vendorId]);


// =========================================================
// دریافت اطلاعات بسته + محصولات خانه بازی
// =========================================================

useEffect(() => {

  async function loadVendorPackageAndProducts() {

    if (!vendorId) {
      setLoadingProducts(false);
      return;
    }


    try {

      setLoadingProducts(true);


      const token =
        localStorage.getItem(
          "genino_token"
        );


      const [
        vendorRes,
        productsRes,
      ] = await Promise.all([

        fetch(
          buildApiUrl(
            `/vendors/${vendorId}`
          ),
          {
            method: "GET",
            headers: {
              Accept:
                "application/json",
            },
          }
        ),


        fetch(
  isVendorOwner
    ? buildApiUrl(
        `/vendor-products/vendor/${vendorId}`
      )
    : buildApiUrl(
        `/vendor-products/public`
      ),
  {
    method: "GET",

    headers: isVendorOwner
      ? {
          Authorization:
            `Bearer ${token}`,
          Accept:
            "application/json",
        }
      : {
          Accept:
            "application/json",
        },
  }
),

      ]);


      const vendorData =
        await parseJsonResponse(
          vendorRes
        );


      const productsData =
        await parseJsonResponse(
          productsRes
        );


      if (
        !vendorRes.ok ||
        !vendorData?.ok
      ) {

        throw new Error(
          vendorData?.message ||
            "خطا در دریافت اطلاعات بسته خانه بازی"
        );
      }


      if (
        !productsRes.ok ||
        !productsData?.ok
      ) {

        throw new Error(
          productsData?.message ||
            "خطا در دریافت محصولات خانه بازی"
        );
      }


      const vendor =
        vendorData.vendor;


      // -----------------------------
      // اطلاعات بسته همکاری
      // -----------------------------

      setPackageWindowCount(
        Number(
          vendor
            ?.selectedPackageWindowCount ??
            0
        )
      );


      setPackageAchievementLimit(
        Number(
          vendor
            ?.selectedPackageAchievementLimit ??
            0
        )
      );


      setAchievementUsedCount(
        Number(
          vendor
            ?.achievementUsedCount ??
            0
        )
      );


      // -----------------------------
      // محصولات Vendor
      // -----------------------------

      const receivedProducts =
        Array.isArray(
          productsData.products
        )
          ? productsData.products
          : [];


      const fixedProducts =
        receivedProducts.map(
          (product) => ({

            ...product,

            categoryLinks:
              typeof product.categoryLinks ===
              "string"
                ? JSON.parse(
                    product.categoryLinks
                  )
                : product.categoryLinks ||
                  [],

            images:
              typeof product.images ===
              "string"
                ? JSON.parse(
                    product.images
                  )
                : product.images ||
                  [],
          })
        );


      const vendorProducts =
  isVendorOwner
    ? fixedProducts
    : fixedProducts.filter(
        (product) => {

          const productVendorId =
            product.vendorId ??
            product.vendor?.id;

          return (
            Number(productVendorId) ===
            Number(vendorId)
          );

        }
      );


setProducts(
  vendorProducts
);


    } catch (error) {

      console.error(
        "LOAD PLAYHOUSE PACKAGE / PRODUCTS ERROR:",
        error
      );


      setProducts([]);


    } finally {

      setLoadingProducts(false);

    }
  }


  loadVendorPackageAndProducts();

}, [
  vendorId,
  isVendorOwner,
]);


// =========================================================
// دریافت خدمات خانه بازی
// =========================================================

useEffect(() => {

  async function loadVendorServices() {

    if (!vendorId) {
      setLoadingServices(false);
      return;
    }


    try {

      setLoadingServices(true);


      const token =
        localStorage.getItem(
          "genino_token"
        );


      const servicesUrl =
  isVendorOwner
    ? buildApiUrl(
        `/vendor-services/vendor/${vendorId}`
      )
    : buildApiUrl(
        `/vendor-services/public/vendor/${vendorId}`
      );


const headers =
  isVendorOwner
    ? {
        Authorization:
          `Bearer ${token}`,
        Accept:
          "application/json",
      }
    : {
        Accept:
          "application/json",
      };


const response =
  await fetch(
    servicesUrl,
    {
      method: "GET",
      headers,
    }
  );


      const data =
        await parseJsonResponse(
          response
        );


      if (
        !response.ok ||
        !data?.ok
      ) {

        throw new Error(
          data?.message ||
            "خطا در دریافت خدمات خانه بازی"
        );
      }


      const loadedServices =
        Array.isArray(
          data.services
        )
          ? data.services
          : [];


      setServices(
        loadedServices
      );


    } catch (error) {

      console.error(
        "LOAD PLAYHOUSE SERVICES ERROR:",
        error
      );


      setServices([]);


    } finally {

      setLoadingServices(false);

    }
  }


  loadVendorServices();

}, [
  vendorId,
  isVendorOwner,
]);


  // =========================================================
  // عمومی
  // =========================================================

  const updateField = (
    key,
    value
  ) => {

    setPlayhouse(
      (prev) => ({
        ...prev,
        [key]: value,
      })
    );


    setValidationErrors(
      (prev) => ({
        ...prev,
        [key]: "",
      })
    );
  };


  // =========================================================
  // کالا و خدمت
  // =========================================================

  const courseServices =
    services.filter(
      (service) =>
        service.package ||
        service.scheduleMode ===
          "PACKAGE"
    );


  const eventServices =
    services.filter(
      (service) =>
        !service.package &&
        service.scheduleMode !==
          "PACKAGE"
    );


  const usedWindowCount =
    products.length +
    services.length;


  const remainingWindowCount =
    Math.max(
      packageWindowCount -
        usedWindowCount,
      0
    );


  const canAddWindow =
    packageWindowCount > 0 &&
    usedWindowCount <
      packageWindowCount;

  const loadingWindows =
  loadingProducts ||
  loadingServices;

  // =========================================================
// حذف محصول خانه بازی
// =========================================================

const handleDeleteProduct =
  async (productId) => {

    const ok =
      window.confirm(
        "آیا از حذف این محصول مطمئن هستید؟"
      );

    if (!ok) return;


    try {

      const res =
        await fetch(
          `${API_BASE_URL}/vendor-products/${productId}`,
          {
            method: "DELETE",

            headers: {
              Authorization:
                `Bearer ${localStorage.getItem(
                  "genino_token"
                )}`,
            },
          }
        );


      const data =
        await res.json();


      if (
        !res.ok ||
        !data?.ok
      ) {

        alert(
          data?.message ||
            "خطا در حذف محصول"
        );

        return;
      }


      setProducts(
        (prev) =>
          prev.filter(
            (item) =>
              item.id !==
              productId
          )
      );


    } catch (error) {

      console.error(
        "DELETE PLAYHOUSE PRODUCT ERROR:",
        error
      );

      alert(
        "خطا در ارتباط با سرور"
      );
    }
  };


// =========================================================
// انتشار محصول خانه بازی
// =========================================================

const handlePublishProduct =
  async (productId) => {

    try {

      const res =
        await fetch(
          `${API_BASE_URL}/vendor-products/${productId}/publish`,
          {
            method: "PATCH",

            headers: {
              Authorization:
                `Bearer ${localStorage.getItem(
                  "genino_token"
                )}`,
            },
          }
        );


      const data =
        await res.json();


      if (
        !res.ok ||
        !data?.ok
      ) {

        alert(
          data?.message ||
            "خطا در انتشار محصول"
        );

        return;
      }


      setProducts(
        (prev) =>
          prev.map(
            (item) =>
              item.id === productId
                ? {
                    ...item,
                    status:
                      "PUBLISHED",
                  }
                : item
          )
      );


      alert(
        "محصول با موفقیت منتشر شد."
      );


    } catch (error) {

      console.error(
        "PUBLISH PLAYHOUSE PRODUCT ERROR:",
        error
      );

      alert(
        "خطا در ارتباط با سرور"
      );
    }
  };


// =========================================================
// عدم انتشار محصول خانه بازی
// =========================================================

const handleUnpublishProduct =
  async (productId) => {

    try {

      const res =
        await fetch(
          `${API_BASE_URL}/vendor-products/${productId}/unpublish`,
          {
            method: "PATCH",

            headers: {
              Authorization:
                `Bearer ${localStorage.getItem(
                  "genino_token"
                )}`,
            },
          }
        );


      const data =
        await res.json();


      if (
        !res.ok ||
        !data?.ok
      ) {

        alert(
          data?.message ||
            "خطا در عدم انتشار محصول"
        );

        return;
      }


      setProducts(
        (prev) =>
          prev.map(
            (item) =>
              item.id === productId
                ? {
                    ...item,
                    status:
                      "DRAFT",
                  }
                : item
          )
      );


    } catch (error) {

      console.error(
        "UNPUBLISH PLAYHOUSE PRODUCT ERROR:",
        error
      );

      alert(
        "خطا در ارتباط با سرور"
      );
    }
  };

  // =========================================================
// حذف خدمت خانه بازی
// =========================================================

const handleDeleteService =
  async (serviceId) => {

    const ok =
      window.confirm(
        "آیا از حذف این خدمت مطمئن هستید؟"
      );

    if (!ok) return;


    try {

      const res =
        await fetch(
          `${API_BASE_URL}/vendor-services/${serviceId}`,
          {
            method: "DELETE",

            headers: {
              Authorization:
                `Bearer ${localStorage.getItem(
                  "genino_token"
                )}`,
            },
          }
        );


      const data =
        await res.json();


      if (
        !res.ok ||
        !data?.ok
      ) {

        alert(
          data?.message ||
            "خطا در حذف خدمت"
        );

        return;
      }


      setServices(
        (prev) =>
          prev.filter(
            (item) =>
              item.id !== serviceId
          )
      );


    } catch (error) {

      console.error(
        "DELETE PLAYHOUSE SERVICE ERROR:",
        error
      );

      alert(
        "خطا در ارتباط با سرور"
      );
    }
  };


// =========================================================
// انتشار خدمت خانه بازی
// =========================================================

const handlePublishService =
  async (serviceId) => {

    try {

      const res =
        await fetch(
          `${API_BASE_URL}/vendor-services/${serviceId}/publish`,
          {
            method: "PATCH",

            headers: {
              Authorization:
                `Bearer ${localStorage.getItem(
                  "genino_token"
                )}`,
            },
          }
        );


      const data =
        await res.json();


      if (
        !res.ok ||
        !data?.ok
      ) {

        alert(
          data?.message ||
            "خطا در انتشار خدمت"
        );

        return;
      }


      setServices(
        (prev) =>
          prev.map(
            (item) =>
              item.id === serviceId
                ? {
                    ...item,
                    status:
                      "PUBLISHED",
                  }
                : item
          )
      );


      alert(
        "خدمت با موفقیت منتشر شد."
      );


    } catch (error) {

      console.error(
        "PUBLISH PLAYHOUSE SERVICE ERROR:",
        error
      );

      alert(
        "خطا در ارتباط با سرور"
      );
    }
  };


// =========================================================
// عدم انتشار خدمت خانه بازی
// =========================================================

const handleUnpublishService =
  async (serviceId) => {

    try {

      const res =
        await fetch(
          `${API_BASE_URL}/vendor-services/${serviceId}/unpublish`,
          {
            method: "PATCH",

            headers: {
              Authorization:
                `Bearer ${localStorage.getItem(
                  "genino_token"
                )}`,
            },
          }
        );


      const data =
        await res.json();


      if (
        !res.ok ||
        !data?.ok
      ) {

        alert(
          data?.message ||
            "خطا در عدم انتشار خدمت"
        );

        return;
      }


      setServices(
        (prev) =>
          prev.map(
            (item) =>
              item.id === serviceId
                ? {
                    ...item,
                    status:
                      "DRAFT",
                  }
                : item
          )
      );


    } catch (error) {

      console.error(
        "UNPUBLISH PLAYHOUSE SERVICE ERROR:",
        error
      );

      alert(
        "خطا در ارتباط با سرور"
      );
    }
  };


  const remainingAchievementCount =
    Math.max(
      packageAchievementLimit -
        achievementUsedCount,
      0
    );


  // =========================================================
  // تصاویر هدر
  // =========================================================

  const addHeaderImage = async (file) => {

  if (!file) return;

  try {

    if (
      playhouse.headerImages.length >= 10
    ) {
      alert(
        "حداکثر ۱۰ تصویر می‌توانید برای خانه بازی ثبت کنید."
      );

      return;
    }


    const ext =
      file.name
        .split(".")
        .pop();


    const presign =
      await presignVendorKindergartenHeaderUpload({
        ext,
        contentType:
          file.type,

        fileName:
          file.name,

        fileSize:
          file.size,
      });


    if (!presign?.ok) {

      alert(
        presign?.message ||
          "خطا در آماده‌سازی تصویر خانه بازی"
      );

      return;
    }


    const upload =
      await putFileToPresignedUrl(
        presign.uploadUrl,
        file
      );


    if (!upload?.ok) {

      alert(
        upload?.message ||
          "آپلود تصویر خانه بازی انجام نشد"
      );

      return;
    }


    setPlayhouse(
      (prev) => ({
        ...prev,

        headerImages: [
          ...prev.headerImages,

          {
            url:
              presign.publicUrl,

            description:
              "",
          },
        ],
      })
    );


  } catch (error) {

    console.error(
      "UPLOAD PLAYHOUSE HEADER ERROR:",
      error
    );


    alert(
      "خطا در آپلود تصویر خانه بازی"
    );

  }
};


  const updateHeaderDescription = (
    index,
    value
  ) => {

    setPlayhouse(
      (prev) => ({
        ...prev,

        headerImages:
          prev.headerImages.map(
            (item, i) =>
              i === index
                ? {
                    ...item,
                    description:
                      value,
                  }
                : item
          ),
      })
    );
  };


  const removeHeaderImage = (
    index
  ) => {

    setPlayhouse(
      (prev) => ({
        ...prev,

        headerImages:
          prev.headerImages.filter(
            (_, i) =>
              i !== index
          ),
      })
    );


    setActiveHeaderIndex(
      (prev) =>
        Math.max(
          prev - 1,
          0
        )
    );
  };


  // =========================================================
  // گروه سنی
  // =========================================================

  const toggleAge = (
    age
  ) => {

    setPlayhouse(
      (prev) => {

        const exists =
          prev.acceptedAges.includes(
            age
          );


        return {
          ...prev,

          acceptedAges:
            exists
              ? prev.acceptedAges.filter(
                  (item) =>
                    item !== age
                )
              : [
                  ...prev.acceptedAges,
                  age,
                ],
        };
      }
    );


    setValidationErrors(
      (prev) => ({
        ...prev,
        acceptedAges: "",
      })
    );
  };


  // =========================================================
  // امکانات
  // =========================================================

  const toggleFeature = (
    feature
  ) => {

    setPlayhouse(
      (prev) => {

        const exists =
          prev.facilities.includes(
            feature
          );


        return {
          ...prev,

          facilities:
            exists
              ? prev.facilities.filter(
                  (item) =>
                    item !== feature
                )
              : [
                  ...prev.facilities,
                  feature,
                ],
        };
      }
    );
  };


  const toggleProgram = (
    program
  ) => {

    setPlayhouse(
      (prev) => {

        const exists =
          prev.educationalPrograms.includes(
            program
          );


        return {
          ...prev,

          educationalPrograms:
            exists
              ? prev.educationalPrograms.filter(
                  (item) =>
                    item !== program
                )
              : [
                  ...prev.educationalPrograms,
                  program,
                ],
        };
      }
    );
  };


  // =========================================================
  // برنامه فعالیت
  // =========================================================

  const addWorkingSchedule =
    () => {

      setPlayhouse(
        (prev) => ({
          ...prev,

          workingSchedule: [
            ...prev.workingSchedule,

            {
              days: [],
              openingTime: "",
              closingTime: "",
            },
          ],
        })
      );


      setValidationErrors(
        (prev) => ({
          ...prev,
          workingSchedule: "",
        })
      );
    };


  const removeWorkingSchedule = (
    index
  ) => {

    setPlayhouse(
      (prev) => ({
        ...prev,

        workingSchedule:
          prev.workingSchedule.filter(
            (_, i) =>
              i !== index
          ),
      })
    );
  };


  const toggleScheduleDay = (
    scheduleIndex,
    day
  ) => {

    setPlayhouse(
      (prev) => ({

        ...prev,

        workingSchedule:
          prev.workingSchedule.map(
            (
              schedule,
              index
            ) => {

              if (
                index !==
                scheduleIndex
              ) {
                return schedule;
              }


              const days =
                Array.isArray(
                  schedule.days
                )
                  ? schedule.days
                  : [];


              const exists =
                days.includes(day);


              return {
                ...schedule,

                days:
                  exists
                    ? days.filter(
                        (item) =>
                          item !== day
                      )
                    : [
                        ...days,
                        day,
                      ],
              };
            }
          ),
      })
    );


    setValidationErrors(
      (prev) => ({
        ...prev,
        workingSchedule: "",
      })
    );
  };


  const updateScheduleTime = (
    index,
    field,
    value
  ) => {

    setPlayhouse(
      (prev) => ({
        ...prev,

        workingSchedule:
          prev.workingSchedule.map(
            (
              schedule,
              i
            ) =>
              i === index
                ? {
                    ...schedule,
                    [field]:
                      value,
                  }
                : schedule
          ),
      })
    );
  };


  // =========================================================
  // اعضای خانه بازی
  // =========================================================

  const addStaffMember =
    () => {

      setPlayhouse(
        (prev) => ({
          ...prev,

          staffMembers: [
            ...prev.staffMembers,

            {
              name: "",
              position: "",
              education: "",
              experience: "",
              image: "",
            },
          ],
        })
      );
    };


  const updateStaffMember = (
    index,
    field,
    value
  ) => {

    setPlayhouse(
      (prev) => ({
        ...prev,

        staffMembers:
          prev.staffMembers.map(
            (
              member,
              i
            ) =>
              i === index
                ? {
                    ...member,
                    [field]:
                      value,
                  }
                : member
          ),
      })
    );
  };


  const removeStaffMember = (
    index
  ) => {

    setPlayhouse(
      (prev) => ({
        ...prev,

        staffMembers:
          prev.staffMembers.filter(
            (_, i) =>
              i !== index
          ),
      })
    );
  };


  const uploadStaffImage =
  async (
    index,
    file
  ) => {

    if (!file) return;


    try {

      const ext =
        file.name
          .split(".")
          .pop();


      const presign =
        await presignVendorKindergartenStaffUpload({
          ext,

          contentType:
            file.type,

          fileName:
            file.name,

          fileSize:
            file.size,
        });


      if (!presign?.ok) {

        alert(
          presign?.message ||
            "خطا در آماده‌سازی تصویر عضو خانه بازی"
        );

        return;
      }


      const upload =
        await putFileToPresignedUrl(
          presign.uploadUrl,
          file
        );


      if (!upload?.ok) {

        alert(
          upload?.message ||
            "آپلود تصویر عضو خانه بازی انجام نشد"
        );

        return;
      }


      updateStaffMember(
        index,
        "image",
        presign.publicUrl
      );


    } catch (error) {

      console.error(
        "UPLOAD PLAYHOUSE STAFF IMAGE ERROR:",
        error
      );


      alert(
        "خطا در آپلود تصویر عضو خانه بازی"
      );

    }
  };


  // =========================================================
// دستاوردهای خانه بازی
// =========================================================

const handleOpenAchievement = (
  child
) => {

  setSelectedAchievementChild(
    child
  );

};


const handleOpenAchievementHistory =
  async () => {

    try {

      setShowAchievementHistory(
        true
      );

      setLoadingAchievements(
        true
      );


      const res =
        await getPlayhouseAchievements(
          vendorId
        );


      if (res?.ok) {

        setPlayhouseAchievements(
          res.achievements ||
          []
        );

      } else {

        setPlayhouseAchievements(
          []
        );

        alert(
          res?.message ||
            "خطا در دریافت دستاوردها"
        );

      }

    } catch (error) {

      console.error(
        "LOAD PLAYHOUSE ACHIEVEMENTS ERROR:",
        error
      );

      setPlayhouseAchievements(
        []
      );

    } finally {

      setLoadingAchievements(
        false
      );

    }

  };


const handleCreateAchievement =
  async () => {

    if (
      !achievementForm.category
    ) {

      alert(
        "لطفاً نوع دستاورد را انتخاب کنید."
      );

      return;
    }


    if (
      !achievementForm.title.trim()
    ) {

      alert(
        "لطفاً عنوان دستاورد را وارد کنید."
      );

      return;
    }


    if (
      !selectedAchievementChild
    ) {
      return;
    }


    try {

      const res =
        await createPlayhouseAchievement(
          vendorId,
          {
            childId:
              selectedAchievementChild.id,

            category:
              achievementForm.category,

            title:
              achievementForm.title,

            description:
              achievementForm.description,
          }
        );


      if (res?.ok) {

        setAchievementUsedCount(
          (prev) =>
            Number(prev || 0) + 1
        );


        alert(
          "دستاورد با موفقیت صادر شد 💛"
        );


        setSelectedAchievementChild(
          null
        );


        setAchievementForm({
          category: "",
          title: "",
          description: "",
        });


      } else {

        alert(
          res?.message ||
            "خطا در صدور دستاورد"
        );

      }


    } catch (error) {

      console.error(
        "CREATE PLAYHOUSE ACHIEVEMENT ERROR:",
        error
      );


      alert(
        "خطا در ارتباط با سرور"
      );

    }

  };


  // =========================================================
  // اعتبارسنجی
  // =========================================================

  const validateFields =
    () => {

      const errors = {};


      if (
        !String(
          playhouse.playhouseName ||
            ""
        ).trim()
      ) {
        errors.playhouseName =
          "نام خانه بازی الزامی است";
      }


      if (
        !String(
          playhouse.slogan ||
            ""
        ).trim()
      ) {
        errors.slogan =
          "شعار خانه بازی الزامی است";
      }


      if (
        !String(
          playhouse.city ||
            ""
        ).trim()
      ) {
        errors.city =
          "شهر محل فعالیت الزامی است";
      }


      if (
        !String(
          playhouse.district ||
            ""
        ).trim()
      ) {
        errors.district =
          "منطقه الزامی است";
      }


      if (
        !String(
          playhouse.address ||
            ""
        ).trim()
      ) {
        errors.address =
          "آدرس دقیق الزامی است";
      }


      if (
        !String(
          playhouse.phone ||
            ""
        ).trim()
      ) {
        errors.phone =
          "شماره تماس الزامی است";
      }


      if (
        !String(
          playhouse.email ||
            ""
        ).trim()
      ) {

        errors.email =
          "ایمیل الزامی است";

      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          String(
            playhouse.email
          ).trim()
        )
      ) {

        errors.email =
          "فرمت ایمیل صحیح نیست";
      }


      if (
        !playhouse.gender
      ) {
        errors.gender =
          "جنسیت پذیرش را مشخص کنید";
      }


      if (
        playhouse.acceptedAges
          .length === 0
      ) {
        errors.acceptedAges =
          "حداقل یک گروه سنی انتخاب کنید";
      }


      const schedule =
        playhouse.workingSchedule;


      if (
        schedule.length === 0
      ) {

        errors.workingSchedule =
          "حداقل یک برنامه فعالیت ثبت کنید";

      } else {

        const invalidSchedule =
          schedule.some(
            (item) =>
              !item.days?.length ||
              !item.openingTime ||
              !item.closingTime
          );


        if (
          invalidSchedule
        ) {
          errors.workingSchedule =
            "روزها و ساعت شروع و پایان همه برنامه‌ها را کامل کنید";
        }


       


        const invalidTime =
          schedule.some(
            (item) =>
              item.openingTime &&
              item.closingTime &&
              item.openingTime >=
                item.closingTime
          );


        if (
          invalidTime
        ) {
          errors.workingSchedule =
            "ساعت پایان باید بعد از ساعت شروع باشد";
        }
      }


      setValidationErrors(
        errors
      );


      return (
        Object.keys(errors)
          .length === 0
      );
    };


  // =========================================================
// ذخیره واقعی اطلاعات خانه بازی
// =========================================================

const handleSave =
  async () => {

    const valid =
      validateFields();

    if (!valid) {

      alert(
        "لطفاً اطلاعات ضروری خانه بازی را کامل کنید."
      );

      return;
    }


    try {

      setSaving(true);


      const token =
        getAuthToken();

      if (!token) {
        alert(
          "برای ذخیره اطلاعات ابتدا وارد حساب فروشنده شوید."
        );

        return;
      }


      const payload = {

        headerImages:
          playhouse.headerImages,

        playhouseName:
          playhouse.playhouseName,

        slogan:
          playhouse.slogan,

        description:
          playhouse.description,

        city:
          playhouse.city,

        district:
          playhouse.district,

        address:
          playhouse.address,

        phone:
          playhouse.phone,

        email:
          playhouse.email,

        acceptedAges:
          playhouse.acceptedAges,

        gender:
          playhouse.gender,

        workingSchedule:
          playhouse.workingSchedule,

        childCapacity:
          playhouse.childCapacity,

        foundedYear:
          playhouse.foundedYear,

        area:
          playhouse.area,

        roomCount:
          playhouse.roomCount,

        facilities:
          playhouse.facilities,

        educationalPrograms:
          playhouse.educationalPrograms,

        hasMealProgram:
          playhouse.hasMealProgram,

        mealDescription:
          playhouse.mealDescription,

        hasTransportation:
          playhouse.hasTransportation,

        transportationDescription:
          playhouse.transportationDescription,

        teacherCount:
          playhouse.teacherCount,

        teacherExperience:
          playhouse.teacherExperience,

        staffMembers:
          playhouse.staffMembers,

        resume:
          playhouse.resume,
      };


      const response =
        await fetch(
          buildApiUrl(
            `/vendor-playhouse/${vendorId}`
          ),
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body:
              JSON.stringify(
                payload
              ),
          }
        );


      const data =
        await parseJsonResponse(
          response
        );


      if (
        !response.ok ||
        !data.ok
      ) {

        throw new Error(
          data.message ||
            "خطا در ذخیره اطلاعات خانه بازی"
        );
      }


      if (data.profile) {

        setPlayhouse(
          (prev) => ({
            ...prev,
            ...data.profile,

            children:
              prev.children,
          })
        );

      }


      alert(
        "اطلاعات خانه بازی با موفقیت ذخیره شد ✅"
      );

    } catch (error) {

      console.error(
        "SAVE PLAYHOUSE PROFILE ERROR:",
        error
      );

      alert(
        error.message ||
          "خطا در ذخیره اطلاعات خانه بازی"
      );

    } finally {

      setSaving(false);

    }
  };

  // =========================================================
// نمای عمومی خانه بازی برای کاربران
// =========================================================

if (!isVendorOwner) {

  return (

    <PublicPlayhouseView
  playhouse={playhouse}

  products={
    products.filter(
      (product) =>
        product.status ===
        "PUBLISHED"
    )
  }

  services={
    services.filter(
      (service) =>
        service.status ===
        "PUBLISHED"
    )
  }

  loadingProducts={
    loadingProducts
  }

  loadingServices={
    loadingServices
  }
/>

  );
}



  


  return (

    <main
      dir="rtl"
      className="
        min-h-screen
        bg-[#faf7ef]
        p-4
      "
    >

      <div
        className="
          mx-auto
          max-w-6xl
          space-y-5
        "
      >


        {/* =====================================================
            تصاویر هدر
        ===================================================== */}

        <section
          className="
            rounded-3xl
            bg-white
            p-5
            shadow
          "
        >

          <div
            className="
              mx-auto
              w-full
              max-w-3xl
              overflow-hidden
              rounded-3xl
            "
          >

            {playhouse.headerImages
              .length > 0 ? (

              <div>

                <PromoSlider
                  variant="golden"
                  interval={7000}
                  height="h-44 sm:h-52 md:h-60 lg:h-64"
                  slides={
                    playhouse.headerImages.map(
                      (
                        item,
                        index
                      ) => ({
                        id:
                          index,
                        image:
                          item.url,
                        title:
                          "",
                      })
                    )
                  }
                  onIndexChange={(
                    index
                  ) =>
                    setActiveHeaderIndex(
                      index
                    )
                  }
                />


                <button
                  type="button"
                  onClick={() =>
                    removeHeaderImage(
                      activeHeaderIndex
                    )
                  }
                  className="
                    mt-3
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-red-200
                    bg-red-50
                    py-2
                    text-sm
                    font-bold
                    text-red-600
                  "
                >
                  <Trash2
                    size={16}
                  />

                  حذف تصویر فعلی
                </button>


                <div
                  className="
                    mt-3
                    rounded-xl
                    bg-yellow-50
                    p-4
                  "
                >

                  <input
                    value={
                      playhouse
                        .headerImages[
                        activeHeaderIndex
                      ]?.description ||
                      ""
                    }
                    onChange={(
                      e
                    ) =>
                      updateHeaderDescription(
                        activeHeaderIndex,
                        e.target.value
                      )
                    }
                    placeholder="مثلاً: فضای بازی و سرگرمی خانه بازی"
                    className="
                      w-full
                      rounded-xl
                      border
                      bg-white
                      px-3
                      py-2
                      text-center
                      text-sm
                    "
                  />

                </div>

              </div>

            ) : (

              <div
                className="
                  flex
                  h-52
                  items-center
                  justify-center
                  rounded-3xl
                  bg-gradient-to-r
                  from-yellow-100
                  to-yellow-200
                "
              >

                <Gamepad2
                  className="
                    h-14
                    w-14
                    text-yellow-700
                  "
                />

              </div>

            )}


            <label
              className="
                mt-4
                flex
                cursor-pointer
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#6f4a18]
                px-5
                py-3
                font-bold
                text-white
              "
            >

              <Upload
                size={18}
              />

              افزودن تصویر فضای خانه بازی

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(
                  e
                ) => {

                  addHeaderImage(
                    e.target
                      .files?.[0]
                  );

                  e.target.value =
                    "";
                }}
              />

            </label>


            <p
              className="
                mt-2
                text-center
                text-xs
                text-gray-500
              "
            >
              حداکثر ۱۰ تصویر - فضای بازی، وسایل بازی، سالن، اتاق‌ها، جشن‌ها و برنامه‌های خانه بازی
            </p>

          </div>

        </section>


        {/* =====================================================
            پنجره کالا و خدمت
        ===================================================== */}

        <section
          className="
            rounded-3xl
            bg-white
            p-5
            shadow
          "
        >

          <h2
            className="
              font-black
              text-[#6f4a18]
            "
          >
            پنجره‌های ارائه کالا و خدمت
          </h2>


          <p
            className="
              mt-2
              text-xs
              leading-6
              text-gray-500
            "
          >
            در این بخش می‌توانید کالاها و خدمات خانه بازی را مدیریت کنید. هر کالا یا خدمت یک پنجره از ظرفیت بسته همکاری شما را استفاده می‌کند.
          </p>


          <div
            className="
              mt-4
              grid
              grid-cols-3
              gap-2
              sm:gap-3
            "
          >

            <CounterBox
              title="پنجره‌های خریداری‌شده"
              value={
                packageWindowCount
              }
            />

            <CounterBox
  title="استفاده‌شده"
  value={
    achievementUsedCount
  }
  onClick={
    achievementUsedCount > 0
      ? handleOpenAchievementHistory
      : undefined
  }
  hint={
    achievementUsedCount > 0
      ? "مشاهده جزئیات"
      : ""
  }
/>

            <CounterBox
              title="باقی‌مانده"
              value={
                remainingWindowCount
              }
              green={
                remainingWindowCount >
                0
              }
            />

          </div>


          <button
            type="button"
            onClick={() =>
              navigate(
                "/vendor/reports"
              )
            }
            className="
              mt-3
              w-full
              rounded-2xl
              bg-[#faf7ef]
              p-3
              text-center
              shadow-sm
            "
          >

            <p
              className="
                text-xs
                text-gray-400
              "
            >
              گزارش‌های مهم مدیریتی
            </p>

            <p
              className="
                mt-1
                text-sm
                font-bold
                text-[#7a5526]
              "
            >
              مشاهده گزارش‌ها
            </p>

          </button>



          {loadingWindows ? (

  <div
    className="
      mt-4
      text-center
      text-xs
      font-bold
      text-gray-400
    "
  >
    در حال دریافت اطلاعات بسته همکاری...
  </div>

) : canAddWindow ? (

            <div
              className="
                mt-4
                grid
                grid-cols-1
                gap-2
                sm:grid-cols-2
              "
            >

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/vendor/product/create?source=playhouse&vendorId=${vendorId}`
                  )
                }
                className="
                  rounded-2xl
                  bg-gradient-to-r
                  from-[#7a5526]
                  via-[#b88724]
                  to-[#d4af37]
                  py-3
                  font-bold
                  text-white
                  shadow-lg
                "
              >
                + افزودن محصول جدید
              </button>


              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/vendor/service/create?source=playhouse&vendorId=${vendorId}`
                  )
                }
                className="
                  rounded-2xl
                  border
                  border-[#d4af37]
                  bg-yellow-50
                  py-3
                  font-bold
                  text-[#7a5526]
                "
              >
                + افزودن خدمت جدید
              </button>

            </div>

          ) : (

            <div
              className="
                mt-4
                text-center
                text-xs
                font-bold
                text-red-500
              "
            >
              برای بسته خانه بازی هنوز پنجره کالا و خدمت ثبت نشده است
            </div>

          )}

        </section>


        {/* =====================================================
            کالاها
        ===================================================== */}

        {/* =====================================================
    کالاهای خانه بازی
===================================================== */}

<section
  className="
    rounded-3xl
    bg-white
    p-5
    shadow
  "
>

  <div
    className="
      mb-4
      flex
      items-center
      justify-between
    "
  >

    <div>

      <h3
        className="
          font-black
          text-[#6f4a18]
        "
      >
        کالاهای خانه بازی
      </h3>

      <p
        className="
          mt-1
          text-xs
          text-gray-400
        "
      >
        محصولات و کالاهای ارائه‌شده توسط خانه بازی
      </p>

    </div>


    <span
      className="
        rounded-full
        bg-yellow-50
        px-3
        py-1
        text-xs
        font-bold
        text-yellow-700
      "
    >
      {products.length}
      {" "}
      کالا
    </span>

  </div>


  {loadingProducts ? (

    <p
      className="
        py-8
        text-center
        text-sm
        font-bold
        text-gray-400
      "
    >
      در حال دریافت محصولات...
    </p>

  ) : products.length > 0 ? (

    <div
      className="
        relative
        z-10
        mx-auto
        mt-6
        grid
        max-w-5xl
        grid-cols-2
        gap-3
        sm:grid-cols-3
        sm:gap-4
        lg:grid-cols-4
        lg:gap-6
      "
    >

      {products.map(
        (product) => (

          <div
            key={product.id}
            className="
              flex
              flex-col
              gap-2
            "
          >

            <ProductCard
              product={product}
              source="vendor-shop"
              showFavorite={false}
            />


            <div
              className="
                grid
                grid-cols-2
                gap-2
              "
            >

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/vendor/product/edit/${product.id}?source=playhouse&vendorId=${vendorId}`
                  )
                }
                className="
                  flex
                  items-center
                  justify-center
                  gap-1
                  rounded-xl
                  bg-yellow-50
                  py-2
                  text-xs
                  font-bold
                  text-yellow-700
                  shadow-sm
                  transition
                  hover:bg-yellow-100
                "
              >
                <Pencil size={14} />
                ویرایش
              </button>


              <button
                type="button"
                onClick={() =>
                  handleDeleteProduct(
                    product.id
                  )
                }
                className="
                  flex
                  items-center
                  justify-center
                  gap-1
                  rounded-xl
                  bg-red-50
                  py-2
                  text-xs
                  font-bold
                  text-red-600
                  shadow-sm
                  transition
                  hover:bg-red-100
                "
              >
                <Trash2 size={14} />
                حذف
              </button>

            </div>


            {product.status ===
            "PUBLISHED" ? (

              <button
                type="button"
                onClick={() =>
                  handleUnpublishProduct(
                    product.id
                  )
                }
                className="
                  w-full
                  rounded-xl
                  bg-orange-50
                  py-2
                  text-xs
                  font-bold
                  text-orange-600
                  shadow-sm
                  transition
                  hover:bg-orange-100
                "
              >
                عدم انتشار محصول
              </button>

            ) : (

              <button
                type="button"
                onClick={() =>
                  handlePublishProduct(
                    product.id
                  )
                }
                className="
                  w-full
                  rounded-xl
                  bg-green-600
                  py-2
                  text-xs
                  font-bold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-green-700
                "
              >
                انتشار محصول
              </button>

            )}

          </div>

        )
      )}

    </div>

  ) : (

    <div
      className="
        rounded-2xl
        bg-[#faf7ef]
        py-8
        text-center
        text-sm
        text-gray-400
      "
    >
      هنوز کالایی ثبت نشده است.
    </div>

  )}

</section>


        {/* =====================================================
    رویدادها و خدمات خانه بازی
===================================================== */}

<section
  className="
    rounded-3xl
    bg-white
    p-5
    shadow
  "
>

  <div
    className="
      mb-4
      flex
      items-center
      justify-between
    "
  >

    <div>

      <h3
        className="
          font-black
          text-[#6f4a18]
        "
      >
        رویدادها و خدمات خانه بازی
      </h3>

      <p
        className="
          mt-1
          text-xs
          text-gray-400
        "
      >
        جشن‌ها، کارگاه‌ها، برنامه‌های تفریحی و خدمات قابل رزرو خانه بازی
      </p>

    </div>


    <span
      className="
        rounded-full
        bg-yellow-50
        px-3
        py-1
        text-xs
        font-bold
        text-yellow-700
      "
    >
      {eventServices.length}
      {" "}
      خدمت
    </span>

  </div>


  {loadingServices ? (

    <div
      className="
        rounded-2xl
        bg-[#faf7ef]
        py-10
        text-center
        text-sm
        font-bold
        text-gray-400
      "
    >
      در حال دریافت خدمات...
    </div>

  ) : eventServices.length === 0 ? (

    <div
      className="
        rounded-2xl
        border
        border-dashed
        border-yellow-200
        bg-yellow-50/40
        py-10
        text-center
        text-sm
        text-gray-400
      "
    >
      هنوز خدمتی ثبت نشده است.
    </div>

  ) : (

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

      {eventServices.map((service) => {

        const typeLabels = {
          EVENT: "جشن و رویداد",
          CLASS: "کلاس",
          WORKSHOP: "کارگاه",
          CAMP: "اردو",
          CONSULTATION: "مشاوره",
          OTHER: "سایر خدمات",
        };


        const serviceImages =
          Array.isArray(
            service.images
          )
            ? service.images
            : [];


        const mainImage =
          serviceImages[
            Number(
              service.mainImageIndex ||
              0
            )
          ] ||
          serviceImages[0] ||
          "";


        const startDateText =
          service.startAt
            ? new Date(
                service.startAt
              ).toLocaleString(
                "fa-IR",
                {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )
            : "زمان ثبت نشده";


        return (

          <div
            key={service.id}
            className="
              flex
              flex-col
              gap-2
            "
          >

            <div
              className="
                overflow-hidden
                rounded-3xl
                border
                border-yellow-100
                bg-white
                shadow-sm
                transition
                hover:shadow-md
              "
            >

              <div
                className="
                  relative
                  h-40
                  bg-yellow-50
                "
              >

                {mainImage ? (

                  <img
                    src={mainImage}
                    alt={
                      service.title ||
                      "خدمت خانه بازی"
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
                      items-center
                      justify-center
                      text-4xl
                    "
                  >
                    🎉
                  </div>

                )}


                <span
                  className="
                    absolute
                    right-3
                    top-3
                    rounded-full
                    bg-white/90
                    px-3
                    py-1
                    text-[10px]
                    font-black
                    text-[#7a5526]
                    shadow
                  "
                >
                  {typeLabels[
                    service.serviceType
                  ] || "خدمت"}
                </span>


                <span
                  className={`
                    absolute
                    left-3
                    top-3
                    rounded-full
                    px-3
                    py-1
                    text-[10px]
                    font-black
                    shadow
                    ${
                      service.status ===
                      "PUBLISHED"
                        ? "bg-green-600 text-white"
                        : "bg-gray-700 text-white"
                    }
                  `}
                >
                  {service.status ===
                  "PUBLISHED"
                    ? "منتشرشده"
                    : "پیش‌نویس"}
                </span>

              </div>


              <div className="p-4">

                <h4
                  className="
                    line-clamp-1
                    font-black
                    text-[#5f3e16]
                  "
                >
                  {service.title}
                </h4>


                <p
                  className="
                    mt-1
                    line-clamp-1
                    text-[11px]
                    font-bold
                    text-[#a77725]
                  "
                >
                  برگزارکننده:
                  {" "}
                  {playhouse.playhouseName ||
                    "خانه بازی"}
                </p>


                <p
                  className="
                    mt-2
                    text-xs
                    text-gray-400
                  "
                >
                  {startDateText}
                </p>


                <div
                  className="
                    mt-3
                    flex
                    items-center
                    justify-between
                    gap-2
                  "
                >

                  <span
                    className="
                      text-xs
                      font-bold
                      text-gray-500
                    "
                  >
                    ظرفیت:
                    {" "}
                    {service.capacity || "—"}
                    {" "}
                    نفر
                  </span>


                  <span
                    className="
                      text-xs
                      font-black
                      text-[#7a5526]
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


                {service.locationName && (

                  <p
                    className="
                      mt-2
                      line-clamp-1
                      text-xs
                      text-gray-400
                    "
                  >
                    محل:
                    {" "}
                    {service.locationName}
                  </p>

                )}

              </div>

            </div>


            <div
              className="
                grid
                grid-cols-2
                gap-2
              "
            >

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/vendor/service/edit/${service.id}?source=playhouse&vendorId=${vendorId}&mode=${service.scheduleMode}`
                  )
                }
                className="
                  flex
                  items-center
                  justify-center
                  gap-1
                  rounded-xl
                  bg-yellow-50
                  py-2
                  text-xs
                  font-bold
                  text-yellow-700
                  shadow-sm
                  transition
                  hover:bg-yellow-100
                "
              >
                <Pencil size={14}/>
                ویرایش
              </button>


              <button
                type="button"
                onClick={() =>
                  handleDeleteService(
                    service.id
                  )
                }
                className="
                  flex
                  items-center
                  justify-center
                  gap-1
                  rounded-xl
                  bg-red-50
                  py-2
                  text-xs
                  font-bold
                  text-red-600
                  shadow-sm
                  transition
                  hover:bg-red-100
                "
              >
                <Trash2 size={14}/>
                حذف
              </button>

            </div>


            {service.status ===
            "PUBLISHED" ? (

              <button
                type="button"
                onClick={() =>
                  handleUnpublishService(
                    service.id
                  )
                }
                className="
                  w-full
                  rounded-xl
                  bg-orange-50
                  py-2
                  text-xs
                  font-bold
                  text-orange-600
                  shadow-sm
                  transition
                  hover:bg-orange-100
                "
              >
                عدم انتشار خدمت
              </button>

            ) : (

              <button
                type="button"
                onClick={() =>
                  handlePublishService(
                    service.id
                  )
                }
                className="
                  w-full
                  rounded-xl
                  bg-green-600
                  py-2
                  text-xs
                  font-bold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-green-700
                "
              >
                انتشار خدمت
              </button>

            )}

          </div>

        );

      })}

    </div>

  )}

</section>


        {/* =====================================================
    دوره‌ها و کلاس‌های آموزشی
===================================================== */}

<section
  className="
    rounded-3xl
    bg-white
    p-5
    shadow
  "
>

  <div
    className="
      mb-4
      flex
      items-center
      justify-between
    "
  >

    <div>

      <h3
        className="
          font-black
          text-[#6f4a18]
        "
      >
        دوره‌ها و کلاس‌های آموزشی
      </h3>

      <p
        className="
          mt-1
          text-xs
          text-gray-400
        "
      >
        کلاس‌ها و دوره‌های چندجلسه‌ای خانه بازی
      </p>

    </div>


    <span
      className="
        rounded-full
        bg-yellow-50
        px-3
        py-1
        text-xs
        font-bold
        text-yellow-700
      "
    >
      {courseServices.length}
      {" "}
      دوره
    </span>

  </div>


  {loadingServices ? (

    <div
      className="
        rounded-2xl
        bg-[#faf7ef]
        py-10
        text-center
        text-sm
        font-bold
        text-gray-400
      "
    >
      در حال دریافت دوره‌ها...
    </div>

  ) : courseServices.length === 0 ? (

    <div
      className="
        rounded-2xl
        border
        border-dashed
        border-yellow-200
        bg-yellow-50/40
        py-10
        text-center
        text-sm
        text-gray-400
      "
    >
      هنوز دوره آموزشی ثبت نشده است.
    </div>

  ) : (

    <div
      className="
        grid
        grid-cols-2
        gap-3
        sm:grid-cols-3
        lg:grid-cols-4
      "
    >

      {courseServices.map(
        (service) => {

          const typeLabels = {
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


          const serviceImages =
            Array.isArray(
              service.images
            )
              ? service.images
              : [];


          const mainImage =
            serviceImages[
              Number(
                service.mainImageIndex ||
                0
              )
            ] ||
            serviceImages[0] ||
            "";


          const startDateText =
            service.scheduleMode ===
              "PACKAGE" &&
            service.package
              ? `شروع دوره: ${
                  service.package
                    .startDate
                    ? new Date(
                        service.package
                          .startDate
                      ).toLocaleDateString(
                        "fa-IR"
                      )
                    : "ثبت نشده"
                } | ${
                  service.package
                    .totalSessions ||
                  0
                } جلسه`
              : "زمان ثبت نشده";


          return (

            <div
              key={service.id}
              className="
                flex
                flex-col
                gap-2
              "
            >

              <div
                className="
                  overflow-hidden
                  rounded-3xl
                  border
                  border-yellow-100
                  bg-white
                  shadow-sm
                  transition
                  hover:shadow-md
                "
              >

                <div
                  className="
                    relative
                    h-40
                    bg-yellow-50
                  "
                >

                  {mainImage ? (

                    <img
                      src={mainImage}
                      alt={
                        service.title ||
                        "دوره خانه بازی"
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
                        items-center
                        justify-center
                        text-4xl
                      "
                    >
                      🎓
                    </div>

                  )}


                  <span
                    className="
                      absolute
                      right-3
                      top-3
                      rounded-full
                      bg-white/90
                      px-3
                      py-1
                      text-[10px]
                      font-black
                      text-[#7a5526]
                      shadow
                    "
                  >
                    {typeLabels[
                      service.serviceType
                    ] || "دوره"}
                  </span>


                  <span
                    className={`
                      absolute
                      left-3
                      top-3
                      rounded-full
                      px-3
                      py-1
                      text-[10px]
                      font-black
                      shadow
                      ${
                        service.status ===
                        "PUBLISHED"
                          ? "bg-green-600 text-white"
                          : "bg-gray-700 text-white"
                      }
                    `}
                  >
                    {service.status ===
                    "PUBLISHED"
                      ? "منتشرشده"
                      : "پیش‌نویس"}
                  </span>

                </div>


                <div className="p-4">

                  <h4
                    className="
                      line-clamp-1
                      font-black
                      text-[#5f3e16]
                    "
                  >
                    {service.title}
                  </h4>


                  <p
                    className="
                      mt-1
                      line-clamp-1
                      text-[11px]
                      font-bold
                      text-[#a77725]
                    "
                  >
                    برگزارکننده:
                    {" "}
                    {playhouse.playhouseName ||
                      "خانه بازی"}
                  </p>


                  <p
                    className="
                      mt-2
                      text-xs
                      text-gray-400
                    "
                  >
                    {startDateText}
                  </p>


                  <div
                    className="
                      mt-3
                      flex
                      items-center
                      justify-between
                      gap-2
                    "
                  >

                    <span
                      className="
                        text-xs
                        font-bold
                        text-gray-500
                      "
                    >
                      ظرفیت:
                      {" "}
                      {service.capacity || "—"}
                      {" "}
                      نفر
                    </span>


                    <span
                      className="
                        text-xs
                        font-black
                        text-[#7a5526]
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
                    </span>

                  </div>

                </div>

              </div>


              <div
                className="
                  grid
                  grid-cols-2
                  gap-2
                "
              >

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/vendor/service/edit/${service.id}?source=playhouse&vendorId=${vendorId}&mode=${service.scheduleMode}`
                    )
                  }
                  className="
                    flex
                    items-center
                    justify-center
                    gap-1
                    rounded-xl
                    bg-yellow-50
                    py-2
                    text-xs
                    font-bold
                    text-yellow-700
                    shadow-sm
                    transition
                    hover:bg-yellow-100
                  "
                >
                  <Pencil size={14}/>
                  ویرایش
                </button>


                <button
                  type="button"
                  onClick={() =>
                    handleDeleteService(
                      service.id
                    )
                  }
                  className="
                    flex
                    items-center
                    justify-center
                    gap-1
                    rounded-xl
                    bg-red-50
                    py-2
                    text-xs
                    font-bold
                    text-red-600
                    shadow-sm
                    transition
                    hover:bg-red-100
                  "
                >
                  <Trash2 size={14}/>
                  حذف
                </button>

              </div>


              {service.status ===
              "PUBLISHED" ? (

                <button
                  type="button"
                  onClick={() =>
                    handleUnpublishService(
                      service.id
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    bg-orange-50
                    py-2
                    text-xs
                    font-bold
                    text-orange-600
                    shadow-sm
                    transition
                    hover:bg-orange-100
                  "
                >
                  عدم انتشار خدمت
                </button>

              ) : (

                <button
                  type="button"
                  onClick={() =>
                    handlePublishService(
                      service.id
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    bg-green-600
                    py-2
                    text-xs
                    font-bold
                    text-white
                    shadow-sm
                    transition
                    hover:bg-green-700
                  "
                >
                  انتشار خدمت
                </button>

              )}

            </div>

          );
        }
      )}

    </div>

  )}

</section>


        {/* =====================================================
            معرفی
        ===================================================== */}

        <FormCard
          title="معرفی خانه بازی"
        >

          <SimpleInput
            label="نام خانه بازی"
            value={
              playhouse.playhouseName
            }
            onChange={(
              value
            ) =>
              updateField(
                "playhouseName",
                value
              )
            }
            error={
              validationErrors
                .playhouseName
            }
          />


          <SimpleInput
            label="شعار خانه بازی"
            value={
              playhouse.slogan
            }
            onChange={(
              value
            ) =>
              updateField(
                "slogan",
                value
              )
            }
            error={
              validationErrors
                .slogan
            }
          />


          <SimpleTextArea
            label="معرفی کوتاه خانه بازی"
            value={
              playhouse.description
            }
            onChange={(
              value
            ) =>
              updateField(
                "description",
                value
              )
            }
          />

        </FormCard>


        {/* =====================================================
            تماس
        ===================================================== */}

        <FormCard
          title="اطلاعات تماس و آدرس"
          icon={
            <MapPin
              size={19}
            />
          }
        >

          <SimpleInput
            label="شهر محل فعالیت"
            value={
              playhouse.city
            }
            onChange={(
              value
            ) =>
              updateField(
                "city",
                value
              )
            }
            error={
              validationErrors.city
            }
          />


          <SimpleInput
            label="منطقه"
            value={
              playhouse.district
            }
            onChange={(
              value
            ) =>
              updateField(
                "district",
                value
              )
            }
            error={
              validationErrors
                .district
            }
          />


          <SimpleTextArea
            label="آدرس دقیق"
            value={
              playhouse.address
            }
            onChange={(
              value
            ) =>
              updateField(
                "address",
                value
              )
            }
            error={
              validationErrors.address
            }
          />


          <SimpleInput
            label="شماره تماس"
            value={
              playhouse.phone
            }
            onChange={(
              value
            ) =>
              updateField(
                "phone",
                value
              )
            }
            error={
              validationErrors.phone
            }
          />


          <SimpleInput
            label="ایمیل"
            value={
              playhouse.email
            }
            onChange={(
              value
            ) =>
              updateField(
                "email",
                value
              )
            }
            error={
              validationErrors.email
            }
          />

        </FormCard>


        {/* =====================================================
            پذیرش
        ===================================================== */}

        <FormCard
          title="شرایط پذیرش کودکان"
          icon={
            <UsersRound
              size={19}
            />
          }
        >

          <SimpleSelect
            label="جنسیت پذیرش"
            value={
              playhouse.gender
            }
            options={[
              "دختر",
              "پسر",
              "مختلط",
            ]}
            onChange={(
              value
            ) =>
              updateField(
                "gender",
                value
              )
            }
            error={
              validationErrors.gender
            }
          />


          <div
            className="
              sm:col-span-2
            "
          >

            <p
              className="
                text-sm
                font-bold
                text-gray-700
              "
            >
              گروه‌های سنی قابل پذیرش
            </p>


            <ChipSelector
              options={
                AGE_OPTIONS
              }
              selected={
                playhouse.acceptedAges
              }
              onToggle={
                toggleAge
              }
            />


            {validationErrors
              .acceptedAges && (

              <ErrorText>
                {
                  validationErrors
                    .acceptedAges
                }
              </ErrorText>

            )}

          </div>

        </FormCard>


        {/* =====================================================
            ساعت فعالیت
        ===================================================== */}

        <section
          className={`
            rounded-3xl
            bg-white
            p-5
            shadow

            ${
              validationErrors
                .workingSchedule
                ? "border-2 border-red-300"
                : ""
            }
          `}
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

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <Clock3
                  size={19}
                  className="
                    text-[#6f4a18]
                  "
                />

                <h2
                  className="
                    font-black
                    text-[#6f4a18]
                  "
                >
                  روزها و ساعات فعالیت
                </h2>

              </div>


              <p
                className="
                  mt-2
                  text-xs
                  leading-6
                  text-gray-500
                "
              >
                می‌توانید برای روزهای مختلف هفته ساعات فعالیت متفاوت تعیین کنید.
              </p>

            </div>


            <button
              type="button"
              onClick={
                addWorkingSchedule
              }
              className="
                shrink-0
                rounded-xl
                bg-green-600
                px-3
                py-2
                text-xs
                font-bold
                text-white
              "
            >
              + افزودن برنامه
            </button>

          </div>


          {playhouse
            .workingSchedule
            .length === 0 ? (

            <EmptyBox
              text="هنوز برنامه فعالیتی ثبت نشده است."
            />

          ) : (

            <div
              className="
                mt-5
                space-y-4
              "
            >

              {playhouse
                .workingSchedule
                .map(
                  (
                    schedule,
                    index
                  ) => (

                  <div
                    key={
                      index
                    }
                    className="
                      rounded-2xl
                      border
                      border-yellow-100
                      bg-[#faf7ef]
                      p-4
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                      "
                    >

                      <p
                        className="
                          font-black
                          text-[#6f4a18]
                        "
                      >
                        برنامه فعالیت{" "}
                        {index + 1}
                      </p>


                      <button
                        type="button"
                        onClick={() =>
                          removeWorkingSchedule(
                            index
                          )
                        }
                        className="
                          flex
                          items-center
                          gap-1
                          rounded-lg
                          bg-red-50
                          px-3
                          py-1.5
                          text-xs
                          font-bold
                          text-red-600
                        "
                      >
                        <Trash2
                          size={14}
                        />
                        حذف
                      </button>

                    </div>


                    <div
                      className="
                        mt-4
                      "
                    >

                      <p
                        className="
                          text-xs
                          font-bold
                          text-gray-500
                        "
                      >
                        روزهای این برنامه
                      </p>


                      <div
                        className="
                          mt-2
                          flex
                          flex-wrap
                          gap-2
                        "
                      >

                        {WEEK_DAYS.map(
                          (
                            day
                          ) => {

                            const selected =
                              schedule.days.includes(
                                day
                              );

                            return (

                              <button
                                key={
                                  day
                                }
                                type="button"
                                
                                onClick={() =>
                                  toggleScheduleDay(
                                    index,
                                    day
                                  )
                                }
                                className={`
                                  rounded-full
                                  border
                                  px-3
                                  py-2
                                  text-xs
                                  font-bold

                                  ${
  selected
    ? "border-yellow-500 bg-yellow-100 text-[#6f4a18]"
    : "bg-white text-gray-500"
}
                                `}
                              >
                                {
                                  day
                                }
                              </button>

                            );
                          }
                        )}

                      </div>

                    </div>


                    <div
                      className="
                        mt-4
                        grid
                        grid-cols-2
                        gap-3
                      "
                    >

                      <TimeInput
                        label="ساعت شروع"
                        value={
                          schedule.openingTime
                        }
                        onChange={(
                          value
                        ) =>
                          updateScheduleTime(
                            index,
                            "openingTime",
                            value
                          )
                        }
                      />


                      <TimeInput
                        label="ساعت پایان"
                        value={
                          schedule.closingTime
                        }
                        onChange={(
                          value
                        ) =>
                          updateScheduleTime(
                            index,
                            "closingTime",
                            value
                          )
                        }
                      />

                    </div>

                  </div>

                ))}

            </div>

          )}


          {validationErrors
            .workingSchedule && (

            <ErrorText>
              {
                validationErrors
                  .workingSchedule
              }
            </ErrorText>

          )}

        </section>


        {/* =====================================================
            ظرفیت
        ===================================================== */}

        <FormCard
          title="ظرفیت و فضای خانه بازی"
        >

          <SimpleInput
            label="ظرفیت پذیرش کودک"
            value={
              playhouse.childCapacity
            }
            onChange={(
              value
            ) =>
              updateField(
                "childCapacity",
                value
              )
            }
          />


          <SimpleInput
            label="سال تأسیس"
            value={
              playhouse.foundedYear
            }
            onChange={(
              value
            ) =>
              updateField(
                "foundedYear",
                value
              )
            }
          />


          <SimpleInput
            label="وسعت خانه بازی"
            value={
              playhouse.area
            }
            onChange={(
              value
            ) =>
              updateField(
                "area",
                value
              )
            }
          />


          <SimpleInput
            label="تعداد سالن یا اتاق‌ها"
            value={
              playhouse.roomCount
            }
            onChange={(
              value
            ) =>
              updateField(
                "roomCount",
                value
              )
            }
          />

        </FormCard>


        {/* =====================================================
            امکانات
        ===================================================== */}

        <FormCard
          title="امکانات و برنامه‌های تخصصی خانه بازی"
        >

          <div
            className="
              sm:col-span-2
            "
          >

            <p
              className="
                mb-3
                text-xs
                leading-6
                text-gray-500
              "
            >
              امکانات، تجهیزات و فضاهای موجود در خانه بازی را انتخاب کنید.
            </p>


            <ChipSelector
              options={
                PLAYHOUSE_FEATURES
              }
              selected={
                playhouse.facilities
              }
              onToggle={
                toggleFeature
              }
            />

          </div>


          <div
            className="
              mt-2
              sm:col-span-2
            "
          >

            <p
              className="
                mb-3
                text-sm
                font-black
                text-[#6f4a18]
              "
            >
              برنامه‌ها و فعالیت‌های خانه بازی
            </p>


            <ChipSelector
              options={
                PROGRAM_OPTIONS
              }
              selected={
                playhouse
                  .educationalPrograms
              }
              onToggle={
                toggleProgram
              }
            />

          </div>

        </FormCard>


        {/* =====================================================
            غذا
        ===================================================== */}

        <ToggleDescriptionSection
          title="برنامه غذایی کودکان"
          description="اگر خانه بازی برای کودکان صبحانه، میان‌وعده، ناهار یا سایر وعده‌های غذایی ارائه می‌کند، این بخش را فعال کنید."
          enabled={
            playhouse.hasMealProgram
          }
          onToggle={() =>
            updateField(
              "hasMealProgram",
              !playhouse.hasMealProgram
            )
          }
          enabledText="خانه بازی دارای برنامه غذایی است."
          disabledText="برنامه غذایی ارائه نمی‌شود."
          textareaLabel="توضیحات برنامه غذایی"
          value={
            playhouse.mealDescription
          }
          onChange={(
            value
          ) =>
            updateField(
              "mealDescription",
              value
            )
          }
          placeholder="مثلاً: میان‌وعده و وعده‌های غذایی بر اساس برنامه مشخص ارائه می‌شود."
        />


        {/* =====================================================
            رفت‌وآمد
        ===================================================== */}

        <ToggleDescriptionSection
          title="سرویس رفت‌وآمد کودکان"
          description="اگر خانه بازی برای رفت‌وآمد کودکان سرویس ارائه می‌کند، محدوده و شرایط آن را ثبت کنید."
          enabled={
            playhouse
              .hasTransportation
          }
          onToggle={() =>
            updateField(
              "hasTransportation",
              !playhouse.hasTransportation
            )
          }
          enabledText="خانه بازی دارای سرویس رفت‌وآمد است."
          disabledText="سرویس رفت‌وآمد ارائه نمی‌شود."
          textareaLabel="توضیحات سرویس رفت‌وآمد"
          value={
            playhouse
              .transportationDescription
          }
          onChange={(
            value
          ) =>
            updateField(
              "transportationDescription",
              value
            )
          }
          placeholder="مثلاً: سرویس در محدوده مشخصی از شهر ارائه می‌شود."
        />


        {/* =====================================================
            کادر
        ===================================================== */}

        <FormCard
          title="کادر و مربیان خانه بازی"
        >

          <SimpleInput
            label="تعداد مربیان"
            value={
              playhouse.teacherCount
            }
            onChange={(
              value
            ) =>
              updateField(
                "teacherCount",
                value
              )
            }
          />


          <SimpleInput
            label="میانگین سابقه مربیان"
            value={
              playhouse
                .teacherExperience
            }
            onChange={(
              value
            ) =>
              updateField(
                "teacherExperience",
                value
              )
            }
          />


          <div
            className="
              sm:col-span-2
            "
          >

            <div
              className="
                mb-4
                flex
                items-center
                justify-between
                gap-3
              "
            >

              <div>

                <h3
                  className="
                    font-black
                    text-[#6f4a18]
                  "
                >
                  اعضای مدیریتی و مربیان خانه بازی
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    text-gray-400
                  "
                >
                  مدیر، مربیان و سایر اعضای مجموعه را معرفی کنید.
                </p>

              </div>


              <button
                type="button"
                onClick={
                  addStaffMember
                }
                className="
                  shrink-0
                  rounded-lg
                  bg-green-600
                  px-3
                  py-2
                  text-xs
                  font-bold
                  text-white
                "
              >
                + افزودن عضو جدید
              </button>

            </div>


            {playhouse
              .staffMembers
              .length === 0 ? (

              <EmptyBox
                text="هنوز عضوی ثبت نشده است."
              />

            ) : (

              <div
                className="
                  space-y-2
                "
              >

                {playhouse
                  .staffMembers
                  .map(
                    (
                      member,
                      index
                    ) => (

                    <div
                      key={
                        index
                      }
                      className="
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-yellow-100
                        bg-yellow-50/40
                        p-2
                      "
                    >

                      <label
                        className="
                          flex
                          h-14
                          w-14
                          shrink-0
                          cursor-pointer
                          items-center
                          justify-center
                          overflow-hidden
                          rounded-full
                          border
                          border-yellow-200
                          bg-yellow-100
                          text-center
                          text-[9px]
                          font-bold
                          text-stone-500
                        "
                      >

                        {member.image ? (

                          <img
                            src={
                              member.image
                            }
                            alt=""
                            className="
                              h-full
                              w-full
                              object-cover
                            "
                          />

                        ) : (

                          <span>
                            افزودن
                            <br />
                            عکس
                          </span>

                        )}


                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(
                            e
                          ) => {

                            uploadStaffImage(
                              index,
                              e.target
                                .files?.[0]
                            );

                            e.target.value =
                              "";
                          }}
                        />

                      </label>


                      <div
                        className="
                          grid
                          flex-1
                          grid-cols-2
                          gap-2
                          sm:grid-cols-4
                        "
                      >

                        {[
                          [
                            "name",
                            "نام",
                          ],
                          [
                            "position",
                            "سمت",
                          ],
                          [
                            "education",
                            "تحصیلات",
                          ],
                          [
                            "experience",
                            "سابقه",
                          ],
                        ].map(
                          ([
                            field,
                            placeholder,
                          ]) => (

                            <input
                              key={
                                field
                              }
                              placeholder={
                                placeholder
                              }
                              value={
                                member[
                                  field
                                ] ||
                                ""
                              }
                              onChange={(
                                e
                              ) =>
                                updateStaffMember(
                                  index,
                                  field,
                                  e.target
                                    .value
                                )
                              }
                              className="
                                h-9
                                rounded-lg
                                border
                                border-gray-200
                                bg-white
                                px-2
                                text-xs
                                outline-none
                                focus:border-yellow-400
                              "
                            />

                          )
                        )}

                      </div>


                      <button
                        type="button"
                        onClick={() =>
                          removeStaffMember(
                            index
                          )
                        }
                        className="
                          rounded-lg
                          bg-red-50
                          px-3
                          py-2
                          font-bold
                          text-red-600
                        "
                      >
                        ×
                      </button>

                    </div>

                  ))}

              </div>

            )}

          </div>

        </FormCard>


        {/* =====================================================
            رزومه
        ===================================================== */}

        <FormCard
          title="معرفی و رزومه خانه بازی"
        >

          <div
            className="
              sm:col-span-2
            "
          >

            <p
              className="
                mb-4
                text-xs
                leading-6
                text-gray-500
              "
            >
              درباره سابقه فعالیت، رویکرد مجموعه، مجوزها، افتخارات، جشن‌ها و ویژگی‌های شاخص خانه بازی توضیح دهید.
            </p>

          </div>


          <SimpleTextArea
            label="معرفی و رزومه"
            value={
              playhouse.resume
            }
            onChange={(
              value
            ) =>
              updateField(
                "resume",
                value
              )
            }
          />

        </FormCard>


        {/* =====================================================
            دستاورد
        ===================================================== */}

        <section
          className="
            rounded-3xl
            bg-white
            p-5
            shadow
          "
        >

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <Award
              size={21}
              className="
                text-yellow-700
              "
            />

            <h2
              className="
                font-black
                text-[#6f4a18]
              "
            >
              دستاوردهای خانه بازی
            </h2>

          </div>


          <p
            className="
              mt-2
              text-xs
              leading-6
              text-gray-500
            "
          >
            از این بخش می‌توانید برای کودکان عضو خانه بازی دستاورد صادر کنید.
          </p>


          <div
            className="
              mt-4
              grid
              grid-cols-3
              gap-2
            "
          >

            <CounterBox
              title="مجوز خریداری‌شده"
              value={
                packageAchievementLimit
              }
            />

            <CounterBox
              title="استفاده‌شده"
              value={
                achievementUsedCount
              }
            />

            <CounterBox
              title="باقی‌مانده"
              value={
                remainingAchievementCount
              }
              green={
                remainingAchievementCount >
                0
              }
            />

          </div>


          {packageAchievementLimit <=
            0 && (

            <div
              className="
                mt-3
                rounded-xl
                bg-red-50
                px-3
                py-2
                text-center
                text-xs
                font-bold
                text-red-500
              "
            >
              در بسته خانه بازی مجوز صدور دستاورد ثبت نشده است
            </div>

          )}


          <div
            className="
              mt-5
              rounded-2xl
              border
              border-yellow-100
              bg-[#faf7ef]
              p-4
            "
          >

            <div className="mt-5">

  <PlayhouseChildrenSection

    selectedChildren={
      playhouse.children
    }

    onChange={(value) =>
      updateField(
        "children",
        value
      )
    }

    onGiveAchievement={
      handleOpenAchievement
    }

  />

</div>


            

          </div>


          {selectedAchievementChild && (

            <div
              className="
                mt-4
                rounded-2xl
                border
                border-yellow-200
                bg-yellow-50
                p-5
              "
            >

              <h3
                className="
                  text-center
                  font-black
                  text-[#6f4a18]
                "
              >
                اهدای دستاورد برای:{" "}
                {
                  selectedAchievementChild.fullName
                }
              </h3>


              <select
                value={
                  achievementForm.category
                }
                onChange={(
                  e
                ) =>
                  setAchievementForm(
                    (
                      prev
                    ) => ({
                      ...prev,
                      category:
                        e.target.value,
                    })
                  )
                }
                className="
                  mt-4
                  h-11
                  w-full
                  rounded-xl
                  border
                  bg-white
                  px-3
                  text-sm
                "
              >

                <option value="">
  انتخاب نوع دستاورد
</option>

<option value="ART">
  دستاورد هنری
</option>

<option value="SPORT">
  دستاورد ورزشی
</option>

<option value="RESEARCH">
  دستاورد پرورشی
</option>

<option value="SCIENCE">
  دستاورد علمی
</option>

<option value="MORAL">
  دستاورد معنوی
</option>

              </select>


              <input
                value={
                  achievementForm.title
                }
                onChange={(
                  e
                ) =>
                  setAchievementForm(
                    (
                      prev
                    ) => ({
                      ...prev,
                      title:
                        e.target.value,
                    })
                  )
                }
                placeholder="عنوان دستاورد"
                className="
                  mt-4
                  h-11
                  w-full
                  rounded-xl
                  border
                  bg-white
                  px-3
                  text-sm
                "
              />


              <textarea
                value={
                  achievementForm.description
                }
                onChange={(
                  e
                ) =>
                  setAchievementForm(
                    (
                      prev
                    ) => ({
                      ...prev,
                      description:
                        e.target.value,
                    })
                  )
                }
                placeholder="توضیحات دستاورد"
                className="
                  mt-3
                  min-h-24
                  w-full
                  rounded-xl
                  border
                  bg-white
                  p-3
                  text-sm
                "
              />


              <div
                className="
                  mt-4
                  flex
                  gap-2
                "
              >

                <button
  type="button"
  onClick={
    handleCreateAchievement
  }
  className="
    flex-1
    rounded-xl
    bg-green-600
    py-3
    font-bold
    text-white
  "
>
  صدور دستاورد
</button>


                <button
                  type="button"
                  onClick={() =>
                    setSelectedAchievementChild(
                      null
                    )
                  }
                  className="
                    rounded-xl
                    bg-white
                    px-4
                    font-bold
                    text-gray-500
                  "
                >
                  انصراف
                </button>

              </div>

            </div>

          )}

        </section>


        {/* =====================================================
            ذخیره
        ===================================================== */}

        <button
          type="button"
          onClick={
            handleSave
          }
          disabled={
            saving
          }
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-green-600
            py-4
            font-black
            text-white
            shadow
            transition
            hover:bg-green-700
            disabled:opacity-60
          "
        >

          <Save
            size={18}
          />

          {saving
            ? "در حال ذخیره..."
            : "ذخیره اطلاعات خانه بازی"
          }

        </button>


      </div>

    </main>

  );
}


// =========================================================
// Components
// =========================================================

function FormCard({
  title,
  icon,
  children,
}) {

  return (

    <section
      className="
        rounded-3xl
        bg-white
        p-5
        shadow
      "
    >

      <div
        className="
          mb-5
          flex
          items-center
          gap-2
          font-black
          text-[#6f4a18]
        "
      >

        {icon}

        <h2>
          {title}
        </h2>

      </div>


      <div
        className="
          grid
          gap-4
          sm:grid-cols-2
        "
      >
        {children}
      </div>

    </section>

  );
}


function SimpleInput({
  label,
  value,
  onChange,
  error = "",
}) {

  return (

    <div>

      <label
        className="
          text-sm
          font-bold
          text-gray-700
        "
      >
        {label}
      </label>


      <input
        value={
          value || ""
        }
        onChange={(
          e
        ) =>
          onChange(
            e.target.value
          )
        }
        className={`
          mt-2
          h-11
          w-full
          rounded-xl
          border
          bg-white
          px-3
          text-sm
          outline-none
          transition

          ${
            error
              ? "border-red-400 bg-red-50"
              : "border-gray-200 focus:border-yellow-400"
          }
        `}
      />


      {error && (
        <ErrorText>
          {error}
        </ErrorText>
      )}

    </div>

  );
}


function SimpleTextArea({
  label,
  value,
  onChange,
  error = "",
}) {

  return (

    <div
      className="
        sm:col-span-2
      "
    >

      <label
        className="
          text-sm
          font-bold
          text-gray-700
        "
      >
        {label}
      </label>


      <textarea
        value={
          value || ""
        }
        onChange={(
          e
        ) =>
          onChange(
            e.target.value
          )
        }
        className={`
          mt-2
          min-h-24
          w-full
          rounded-xl
          border
          p-3
          text-sm
          outline-none

          ${
            error
              ? "border-red-400 bg-red-50"
              : "border-gray-200 focus:border-yellow-400"
          }
        `}
      />


      {error && (
        <ErrorText>
          {error}
        </ErrorText>
      )}

    </div>

  );
}


function SimpleSelect({
  label,
  value,
  options,
  onChange,
  error = "",
}) {

  return (

    <div>

      <label
        className="
          text-sm
          font-bold
          text-gray-700
        "
      >
        {label}
      </label>


      <select
        value={
          value || ""
        }
        onChange={(
          e
        ) =>
          onChange(
            e.target.value
          )
        }
        className={`
          mt-2
          h-11
          w-full
          rounded-xl
          border
          bg-white
          px-3
          text-sm
          outline-none

          ${
            error
              ? "border-red-400 bg-red-50"
              : "border-gray-200 focus:border-yellow-400"
          }
        `}
      >

        <option value="">
          انتخاب کنید
        </option>


        {options.map(
          (
            option
          ) => (

            <option
              key={
                option
              }
              value={
                option
              }
            >
              {
                option
              }
            </option>

          )
        )}

      </select>


      {error && (
        <ErrorText>
          {error}
        </ErrorText>
      )}

    </div>

  );
}


function TimeInput({
  label,
  value,
  onChange,
}) {

  return (

    <div>

      <label
        className="
          text-xs
          font-bold
          text-gray-500
        "
      >
        {label}
      </label>


      <input
        type="time"
        value={
          value || ""
        }
        onChange={(
          e
        ) =>
          onChange(
            e.target.value
          )
        }
        className="
          mt-2
          h-11
          w-full
          rounded-xl
          border
          border-gray-200
          bg-white
          px-3
          text-sm
          outline-none
          focus:border-yellow-400
        "
      />

    </div>

  );
}


function ChipSelector({
  options,
  selected,
  onToggle,
}) {

  return (

    <div
      className="
        mt-3
        flex
        flex-wrap
        gap-2
      "
    >

      {options.map(
        (
          item
        ) => {

          const active =
            selected.includes(
              item
            );


          return (

            <button
              key={
                item
              }
              type="button"
              onClick={() =>
                onToggle(
                  item
                )
              }
              className={`
                rounded-full
                border
                px-4
                py-2
                text-xs
                font-bold
                transition

                ${
                  active
                    ? "border-yellow-500 bg-yellow-100 text-[#6f4a18]"
                    : "border-gray-200 bg-white text-gray-500 hover:border-yellow-300"
                }
              `}
            >
              {
                item
              }
            </button>

          );
        }
      )}

    </div>

  );
}


function CounterBox({
  title,
  value,
  green = false,
  onClick,
  hint,
}) {

  const content = (
    <>
      <p
        className="
          text-[11px]
          text-gray-400
          sm:text-xs
        "
      >
        {title}
      </p>

      <p
        className={`
          mt-1
          text-lg
          font-black

          ${
            green
              ? "text-green-600"
              : "text-[#7a5526]"
          }
        `}
      >
        {value}
      </p>

      {hint && (
        <p
          className="
            mt-1
            text-[10px]
            font-bold
            text-yellow-700
          "
        >
          {hint}
        </p>
      )}
    </>
  );


  if (onClick) {

    return (
      <button
        type="button"
        onClick={onClick}
        className="
          w-full
          rounded-2xl
          bg-[#faf7ef]
          p-3
          text-center
          shadow-sm
          transition
          hover:-translate-y-0.5
          hover:shadow-md
        "
      >
        {content}
      </button>
    );
  }


  return (
    <div
      className="
        rounded-2xl
        bg-[#faf7ef]
        p-3
        text-center
        shadow-sm
      "
    >
      {content}
    </div>
  );
}


function EmptyBox({
  text,
}) {

  return (

    <div
      className="
        mt-5
        rounded-2xl
        border
        border-dashed
        border-yellow-200
        bg-yellow-50/40
        px-4
        py-8
        text-center
        text-sm
        text-gray-400
      "
    >
      {text}
    </div>

  );
}


function EmptyManagementSection({
  title,
  description,
  count,
  unit,
  emptyText,
}) {

  return (

    <section
      className="
        rounded-3xl
        bg-white
        p-5
        shadow
      "
    >

      <div
        className="
          mb-4
          flex
          items-center
          justify-between
        "
      >

        <div>

          <h3
            className="
              font-black
              text-[#6f4a18]
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-1
              text-xs
              text-gray-400
            "
          >
            {description}
          </p>

        </div>


        <span
          className="
            rounded-full
            bg-yellow-50
            px-3
            py-1
            text-xs
            font-bold
            text-yellow-700
          "
        >
          {count} {unit}
        </span>

      </div>


      {count === 0 && (

        <EmptyBox
          text={
            emptyText
          }
        />

      )}

    </section>

  );
}


function ToggleDescriptionSection({
  title,
  description,
  enabled,
  onToggle,
  enabledText,
  disabledText,
  textareaLabel,
  value,
  onChange,
  placeholder,
}) {

  return (

    <section
      className="
        rounded-3xl
        bg-white
        p-5
        shadow
      "
    >

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >

        <div>

          <h2
            className="
              font-black
              text-[#6f4a18]
            "
          >
            {title}
          </h2>

          <p
            className="
              mt-2
              text-xs
              leading-6
              text-gray-500
            "
          >
            {description}
          </p>

        </div>


        <button
          type="button"
          onClick={
            onToggle
          }
          className={`
            relative
            h-7
            w-14
            shrink-0
            rounded-full
            transition

            ${
              enabled
                ? "bg-green-600"
                : "bg-gray-200"
            }
          `}
        >

          <span
            className={`
              absolute
              top-1
              h-5
              w-5
              rounded-full
              bg-white
              shadow
              transition-all

              ${
                enabled
                  ? "left-1"
                  : "left-8"
              }
            `}
          />

        </button>

      </div>


      <div
        className={`
          mt-5
          rounded-2xl
          border
          p-4

          ${
            enabled
              ? "border-green-100 bg-green-50/40"
              : "border-gray-100 bg-gray-50"
          }
        `}
      >

        <div
          className="
            flex
            items-center
            justify-between
            gap-3
          "
        >

          <p
            className="
              text-xs
              text-gray-500
            "
          >
            {enabled
              ? enabledText
              : disabledText
            }
          </p>


          <span
            className={`
              rounded-full
              px-3
              py-1
              text-xs
              font-black

              ${
                enabled
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-500"
              }
            `}
          >
            {enabled
              ? "دارد"
              : "ندارد"
            }
          </span>

        </div>


        {enabled && (

          <div
            className="
              mt-4
            "
          >

            <label
              className="
                text-xs
                font-bold
                text-gray-600
              "
            >
              {textareaLabel}
            </label>


            <textarea
              value={
                value || ""
              }
              onChange={(
                e
              ) =>
                onChange(
                  e.target.value
                )
              }
              placeholder={
                placeholder
              }
              className="
                mt-2
                min-h-28
                w-full
                rounded-xl
                border
                border-gray-200
                bg-white
                p-3
                text-sm
                leading-7
                outline-none
                focus:border-yellow-400
              "
            />

          </div>

        )}

      </div>

    </section>

  );
}


function ErrorText({
  children,
}) {

  return (

    <p
      className="
        mt-2
        text-xs
        font-bold
        text-red-500
      "
    >
      {children}
    </p>

  );
}