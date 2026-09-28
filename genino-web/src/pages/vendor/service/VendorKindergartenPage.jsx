// D:\projects\Genino\genino-web\src\pages\vendor\service\VendorKindergartenPage.jsx
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
} from "lucide-react";

import PromoSlider from "../../../components/Social/PromoSlider.jsx";
import ProductCard from "../../../components/Product/ProductCard";
import KindergartenFeatureSection, {
  KINDERGARTEN_FEATURE_SECTIONS,
} from "./components/KindergartenFeatureSection";
import KindergartenChildrenSection
  from "./components/KindergartenChildrenSection";

import {
  getVendorKindergartenProfile,
  saveVendorKindergartenProfile,
  presignVendorKindergartenHeaderUpload,
  presignVendorKindergartenStaffUpload,
  putFileToPresignedUrl,
  createKindergartenAchievement,
  getKindergartenAchievements,
} from "../../../services/api";


const AGE_OPTIONS = [
  "زیر ۱ سال",
  "۱ تا ۲ سال",
  "۲ تا ۳ سال",
  "۳ تا ۴ سال",
  "۴ تا ۵ سال",
  "۵ تا ۶ سال",
  "پیش‌دبستانی",
  "شیرخوار",
  "نوپا",
];

const KINDERGARTEN_TYPE_OPTIONS = [
  "مهدکودک تمام وقت",
  "مهدکودک نیمه وقت",
  "مهدکودک شبانه‌روزی",
  "مهدکودک دو زبانه",
  "مهدکودک هوشمند",
  "مهدکودک تخصصی",
  "مهدکودک روستایی",
  "مهدکودک مذهبی",
  "مهدکودک و پیش‌دبستانی",
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


function formatPersianDate(date) {
  if (!date) return "";

  try {
    return new Intl.DateTimeFormat(
      "fa-IR",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }
    ).format(new Date(date));
  } catch {
    return date;
  }
}

function PublicKindergartenView({
  kindergarten,
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
    Array.isArray(kindergarten?.headerImages)
      ? kindergarten.headerImages
      : [];

  const acceptedAges =
    Array.isArray(kindergarten?.acceptedAges)
      ? kindergarten.acceptedAges
      : [];

  const kindergartenTypes =
    Array.isArray(kindergarten?.kindergartenTypes)
      ? kindergarten.kindergartenTypes
      : [];

  const facilities =
  kindergarten?.facilities &&
  typeof kindergarten.facilities === "object"
    ? kindergarten.facilities
    : {};

const publicFacilitySections =
  KINDERGARTEN_FEATURE_SECTIONS.map(
    (section) => {
      const sectionValue =
        facilities[section.key] || {};

      const selectedItems =
        Array.isArray(sectionValue.items)
          ? sectionValue.items
          : [];

      const other =
        typeof sectionValue.other === "string"
          ? sectionValue.other.trim()
          : "";

      return {
        ...section,
        selectedItems,
        other,
      };
    }
  ).filter(
    (section) =>
      section.selectedItems.length > 0 ||
      section.other
  );

  const workingSchedule =
    Array.isArray(kindergarten?.workingSchedule)
      ? kindergarten.workingSchedule
      : [];

  const staffMembers =
    Array.isArray(kindergarten?.staffMembers)
      ? kindergarten.staffMembers.filter(
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
        service.scheduleMode !== "PACKAGE"
    );

  const courseServices =
    services.filter(
      (service) =>
        service.package ||
        service.scheduleMode === "PACKAGE"
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
      <div className="mx-auto max-w-6xl space-y-5">

        {/* =====================================
            تصاویر و معرفی مهدکودک
        ===================================== */}

        <section
          className="
            rounded-3xl
            border
            border-yellow-100
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
                  slides={headerImages.map(
                    (item, index) => ({
                      id: index,

                      image:
                        typeof item === "string"
                          ? item
                          : item?.url || "",

                      title: "",
                    })
                  )}
                  onIndexChange={(index) => {
                    setPublicActiveHeaderIndex(
                      index
                    );
                  }}
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
                        bg-yellow-50
                        px-4
                        py-3
                        text-center
                        text-sm
                        font-bold
                        leading-7
                        text-[#6f4a18]
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
                  from-yellow-100
                  to-yellow-200
                "
              >
                <Baby
                  className="
                    h-14
                    w-14
                    text-yellow-700
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
                text-[#5f3e16]
                sm:text-2xl
              "
            >
              {kindergarten?.kindergartenName ||
                "مهدکودک ژنینو"}
            </h1>


            {kindergarten?.slogan && (
              <p
                className="
                  mt-2
                  text-sm
                  font-bold
                  text-[#a77725]
                "
              >
                {kindergarten.slogan}
              </p>
            )}


            {kindergarten?.description && (
              <p
                className="
                  mt-4
                  whitespace-pre-line
                  text-sm
                  leading-7
                  text-gray-600
                "
              >
                {kindergarten.description}
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

              {kindergarten?.gender && (
                <PublicKindergartenBadge>
                  {kindergarten.gender}
                </PublicKindergartenBadge>
              )}


              {acceptedAges.map((age) => (
                <PublicKindergartenBadge
                  key={age}
                >
                  {age}
                </PublicKindergartenBadge>
              ))}

            </div>

          </div>
        </section>


        {/* =====================================
            محصولات مهدکودک
        ===================================== */}

        <section
          className="
            rounded-[2rem]
            border
            border-yellow-100
            bg-white
            p-5
            shadow-md
          "
        >
          <h2 className="font-black text-[#6f4a18]">
            محصولات مهدکودک
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
              {products.map((product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                  source="kindergarten-public"
                  showFavorite={true}
                />

              ))}
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
              هنوز محصولی از این مهدکودک منتشر نشده است.
            </p>

          )}
        </section>


        {/* =====================================
            رویدادها و خدمات
        ===================================== */}

        <PublicKindergartenServicesSection
          title="رویدادها و خدمات مهدکودک"
          description="جشن‌ها، کلاس‌ها، کارگاه‌ها، اردوها و سایر خدمات قابل رزرو مهدکودک"
          services={eventServices}
          loading={loadingServices}
          navigate={navigate}
        />


        {/* =====================================
            دوره‌ها و کلاس‌ها
        ===================================== */}

        {courseServices.length > 0 && (

          <PublicKindergartenServicesSection
            title="دوره‌ها و کلاس‌های آموزشی"
            description="دوره‌ها و برنامه‌های آموزشی مهدکودک"
            services={courseServices}
            loading={loadingServices}
            navigate={navigate}
          />

        )}


        {/* =====================================
            اطلاعات تماس
        ===================================== */}

        <PublicKindergartenInfoSection
          title="اطلاعات تماس و آدرس"
        >

          <PublicKindergartenInfoItem
            label="شهر"
            value={kindergarten?.city}
          />

          <PublicKindergartenInfoItem
            label="منطقه"
            value={kindergarten?.district}
          />

          <PublicKindergartenInfoItem
            label="شماره تماس"
            value={kindergarten?.phone}
          />

          <PublicKindergartenInfoItem
            label="ایمیل"
            value={kindergarten?.email}
          />

          <PublicKindergartenInfoItem
            label="آدرس دقیق"
            value={kindergarten?.address}
            fullWidth
          />

        </PublicKindergartenInfoSection>


        {/* =====================================
            اطلاعات پذیرش
        ===================================== */}

        <PublicKindergartenInfoSection
          title="اطلاعات پذیرش کودکان"
        >

          <PublicKindergartenInfoItem
            label="جنسیت پذیرش"
            value={kindergarten?.gender}
          />

          <PublicKindergartenInfoItem
            label="ظرفیت پذیرش"
            value={
              kindergarten?.childCapacity
            }
          />

          <PublicKindergartenInfoItem
            label="گروه‌های سنی"
            value={acceptedAges.join("، ")}
            fullWidth
          />

          <PublicKindergartenInfoItem
            label="نوع مهدکودک"
            value={kindergartenTypes.join("، ")}
            fullWidth
          />

        </PublicKindergartenInfoSection>


        {/* =====================================
            برنامه فعالیت
        ===================================== */}

        {workingSchedule.length > 0 && (

          <section
            className="
              rounded-[2rem]
              border
              border-yellow-100
              bg-white
              p-5
              shadow-md
            "
          >

            <h2
              className="
                mb-5
                font-black
                text-[#6f4a18]
              "
            >
              روزها و ساعات فعالیت
            </h2>


            <div className="space-y-3">

              {workingSchedule.map(
                (schedule, index) => (

                  <div
                    key={index}
                    className="
                      rounded-2xl
                      bg-[#faf7ef]
                      p-4
                    "
                  >

                    <p
                      className="
                        text-sm
                        font-black
                        text-[#5f3e16]
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
            ظرفیت و فضای مهد
        ===================================== */}

        <PublicKindergartenInfoSection
          title="ظرفیت و فضای مهدکودک"
        >

          <PublicKindergartenInfoItem
            label="سال تأسیس"
            value={kindergarten?.foundedYear}
          />

          <PublicKindergartenInfoItem
            label="ظرفیت پذیرش کودک"
            value={kindergarten?.childCapacity}
          />

          <PublicKindergartenInfoItem
            label="وسعت مهدکودک"
            value={kindergarten?.area}
          />

          <PublicKindergartenInfoItem
            label="تعداد اتاق‌ها"
            value={kindergarten?.roomCount}
          />

        </PublicKindergartenInfoSection>


                {/* =====================================
            امکانات و برنامه‌های تخصصی
        ===================================== */}

        {publicFacilitySections.length > 0 && (
          <section
            className="
              rounded-[2rem]
              border
              border-yellow-100
              bg-white
              p-5
              shadow-md
            "
          >
            <h2
              className="
                font-black
                text-[#6f4a18]
              "
            >
              امکانات و برنامه‌های تخصصی مهدکودک
            </h2>

            <p
              className="
                mt-2
                text-xs
                leading-6
                text-gray-400
              "
            >
              برنامه‌های آموزشی، هنری، ورزشی و امکاناتی که این مهدکودک ارائه می‌دهد.
            </p>

            <div
              className="
                mt-5
                grid
                gap-4
                md:grid-cols-2
              "
            >
              {publicFacilitySections.map(
                (section) => (
                  <div
                    key={section.key}
                    className="
                      rounded-2xl
                      border
                      border-yellow-100
                      bg-[#faf7ef]
                      p-4
                    "
                  >
                    <h3
                      className="
                        text-sm
                        font-black
                        text-[#6f4a18]
                      "
                    >
                      {section.title}
                    </h3>

                    {section.description && (
                      <p
                        className="
                          mt-1
                          text-xs
                          leading-6
                          text-gray-400
                        "
                      >
                        {section.description}
                      </p>
                    )}

                    {section.selectedItems.length > 0 && (
                      <div
                        className="
                          mt-4
                          flex
                          flex-wrap
                          gap-2
                        "
                      >
                        {section.selectedItems.map(
                          (item) => (
                            <span
                              key={item}
                              className="
                                rounded-full
                                border
                                border-yellow-200
                                bg-white
                                px-3
                                py-2
                                text-xs
                                font-bold
                                text-[#6f4a18]
                              "
                            >
                              ✓ {item}
                            </span>
                          )
                        )}
                      </div>
                    )}

                    {section.other && (
                      <div
                        className="
                          mt-4
                          rounded-xl
                          bg-white
                          px-3
                          py-3
                          text-xs
                          leading-6
                          text-gray-600
                        "
                      >
                        <span
                          className="
                            ml-1
                            font-black
                            text-[#6f4a18]
                          "
                        >
                          سایر موارد:
                        </span>

                        {section.other}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </section>
        )}


        {/* =====================================
            برنامه غذایی
        ===================================== */}

        <PublicKindergartenYesNoSection
          title="برنامه غذایی کودکان"
          enabled={
            kindergarten?.hasMealProgram
          }
          yesText="این مهدکودک دارای برنامه غذایی است."
          noText="برنامه غذایی ارائه نمی‌شود."
          description={
            kindergarten?.mealDescription
          }
        />


        {/* =====================================
            سرویس رفت‌وآمد
        ===================================== */}

        <PublicKindergartenYesNoSection
          title="سرویس رفت‌وآمد کودکان"
          enabled={
            kindergarten?.hasTransportation
          }
          yesText="این مهدکودک دارای سرویس رفت‌وآمد است."
          noText="سرویس رفت‌وآمد ارائه نمی‌شود."
          description={
            kindergarten
              ?.transportationDescription
          }
        />


        {/* =====================================
            اطلاعات مربیان
        ===================================== */}

        <PublicKindergartenInfoSection
          title="کادر آموزشی"
        >

          <PublicKindergartenInfoItem
            label="تعداد مربیان"
            value={kindergarten?.teacherCount}
          />

          <PublicKindergartenInfoItem
            label="میانگین سابقه مربیان"
            value={
              kindergarten?.teacherExperience
            }
          />

        </PublicKindergartenInfoSection>


        {/* =====================================
            اعضای مدیریتی و آموزشی
        ===================================== */}

        {staffMembers.length > 0 && (

          <section
            className="
              rounded-[2rem]
              border
              border-yellow-100
              bg-white
              p-5
              shadow-md
            "
          >

            <h2
              className="
                mb-4
                font-black
                text-[#6f4a18]
              "
            >
              اعضای مدیریتی و آموزشی
            </h2>


            <div className="space-y-3">

              {staffMembers.map(
                (member, index) => (

                  <div
                    key={index}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      bg-[#faf7ef]
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
                        bg-yellow-100
                        text-xs
                        text-gray-400
                      "
                    >

                      {member.image ? (

                        <img
                          src={member.image}
                          alt={
                            member.name || ""
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

                      <PublicKindergartenStaffValue
                        label="نام"
                        value={member.name}
                      />

                      <PublicKindergartenStaffValue
                        label="سمت"
                        value={member.position}
                      />

                      <PublicKindergartenStaffValue
                        label="تحصیلات"
                        value={member.education}
                      />

                      <PublicKindergartenStaffValue
                        label="سابقه آموزشی"
                        value={member.experience}
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

        {kindergarten?.resume && (

          <section
            className="
              rounded-[2rem]
              border
              border-yellow-100
              bg-white
              p-5
              shadow-md
            "
          >

            <h2
              className="
                font-black
                text-[#6f4a18]
              "
            >
              معرفی و رزومه مهدکودک
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
              {kindergarten.resume}
            </p>

          </section>

        )}

      </div>
    </main>
  );
}

function PublicKindergartenBadge({
  children,
}) {
  return (
    <span
      className="
        rounded-full
        border
        border-yellow-200
        bg-yellow-50
        px-3
        py-1.5
        text-xs
        font-bold
        text-[#7a5526]
      "
    >
      {children}
    </span>
  );
}


function PublicKindergartenInfoSection({
  title,
  children,
}) {
  return (
    <section
      className="
        rounded-[2rem]
        border
        border-yellow-100
        bg-white
        p-5
        shadow-md
      "
    >
      <h2
        className="
          mb-5
          font-black
          text-[#6f4a18]
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


function PublicKindergartenInfoItem({
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
        bg-[#faf7ef]
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
          text-[#5f3e16]
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
          text-[#5f3e16]
        "
      >
        {normalizedValue}
      </span>
    </div>
  );
}


function PublicKindergartenStaffValue({
  label,
  value,
}) {
  return (
    <div>
      <p className="text-[10px] text-gray-400">
        {label}
      </p>

      <p
        className="
          mt-1
          break-words
          font-bold
          text-[#5f3e16]
        "
      >
        {value || "ثبت نشده"}
      </p>
    </div>
  );
}


function PublicKindergartenYesNoSection({
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
        border-yellow-100
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
            text-[#6f4a18]
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
          {enabled ? "دارد" : "ندارد"}
        </span>
      </div>

      <p
        className="
          mt-3
          text-xs
          leading-6
          text-gray-500
        "
      >
        {enabled ? yesText : noText}
      </p>

      {enabled &&
        String(description || "").trim() && (

          <div
            className="
              mt-4
              rounded-xl
              bg-[#faf7ef]
              p-3
              text-xs
              leading-7
              text-gray-600
            "
          >
            {description}
          </div>

        )}
    </section>
  );
}

function PublicKindergartenServicesSection({
  title,
  description,
  services,
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

  return (
    <section
      className="
        rounded-[2rem]
        border
        border-yellow-100
        bg-white
        p-5
        shadow-md
      "
    >
      <h2 className="font-black text-[#6f4a18]">
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

      {loading ? (

        <p
          className="
            py-8
            text-center
            text-sm
            font-bold
            text-gray-400
          "
        >
          در حال دریافت خدمات...
        </p>

      ) : services.length > 0 ? (

        <div
          className="
            mt-5
            grid
            grid-cols-2
            gap-3
            sm:grid-cols-3
            lg:grid-cols-4
          "
        >

          {services.map((service) => {

            const serviceImages =
              Array.isArray(service.images)
                ? service.images
                : [];

            const mainImage =
              serviceImages[
                Number(
                  service.mainImageIndex || 0
                )
              ] ||
              serviceImages[0] ||
              "";

            return (

              <div
                key={service.id}
                className="
                  overflow-hidden
                  rounded-3xl
                  border
                  border-yellow-100
                  bg-white
                  shadow-sm
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
                        "خدمت مهدکودک"
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
                </div>


                <div className="p-4">

                  <h3
                    className="
                      line-clamp-1
                      font-black
                      text-[#5f3e16]
                    "
                  >
                    {service.title}
                  </h3>


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
                          )} ریال`}
                    </span>

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
                      rounded-xl
                      bg-gradient-to-r
                      from-[#7a5526]
                      via-[#b88724]
                      to-[#d4af37]
                      py-2.5
                      text-xs
                      font-black
                      text-white
                    "
                  >
                    مشاهده و رزرو
                  </button>

                </div>

              </div>

            );

          })}

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


export default function VendorKindergartenPage() {

  const { vendorId } = useParams();

const navigate = useNavigate();

const [searchParams] = useSearchParams();

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

  const loggedVendorId =
  localStorage.getItem(
    "genino_vendor_id"
  );

const isPublicView =
  searchParams.get("view") === "public";

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
  vendor,
  setVendor,
] = useState(null);

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
    loading,
    setLoading,
  ] = useState(true);


  const [
    saving,
    setSaving,
  ] = useState(false);


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
  kindergartenAchievements,
  setKindergartenAchievements,
] = useState([]);


const [
  loadingAchievements,
  setLoadingAchievements,
] = useState(false);


  const [
    kindergarten,
    setKindergarten,
  ] = useState({

    headerImages: [],

    kindergartenName: "",
    slogan: "",
    description: "",

    city: "",
    district: "",
    address: "",
    phone: "",
    email: "",

    acceptedAges: [],
    gender: "",

    kindergartenTypes: [],

    workingDays: [],
    openingTime: "",
    closingTime: "",

    workingSchedule: [],

    childCapacity: "",

    foundedYear: "",
    area: "",
    roomCount: "",

    facilities: {},

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


  const updateField = (
    key,
    value
  ) => {

    setKindergarten(
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
  // دریافت اطلاعات مهدکودک
  // =========================================================

  useEffect(() => {

    async function loadKindergarten() {

      try {

        setLoading(true);


        const res =
          await getVendorKindergartenProfile(
            vendorId
          );


        console.log(
          "KINDERGARTEN PROFILE RESPONSE:",
          res
        );


        if (
          res?.ok &&
          res?.profile
        ) {

          setKindergarten(
            (prev) => ({

              ...prev,
              ...res.profile,

              headerImages:
                Array.isArray(
                  res.profile.headerImages
                )
                  ? res.profile.headerImages
                  : [],


              acceptedAges:
  Array.isArray(
    res.profile.acceptedAges
  )
    ? res.profile.acceptedAges
    : [],


kindergartenTypes:
  Array.isArray(
    res.profile.kindergartenTypes
  )
    ? res.profile.kindergartenTypes
    : [],


workingDays:
                Array.isArray(
                  res.profile.workingDays
                )
                  ? res.profile.workingDays
                  : [],

              workingSchedule:
                Array.isArray(
                  res.profile.workingSchedule
                )
                  ? res.profile.workingSchedule
                  : [],


              facilities:
                res.profile.facilities &&
                typeof res.profile
                  .facilities ===
                  "object"
                  ? res.profile.facilities
                  : {},


              educationalPrograms:
                Array.isArray(
                  res.profile
                    .educationalPrograms
                )
                  ? res.profile
                      .educationalPrograms
                  : [],


              staffMembers:
                Array.isArray(
                  res.profile.staffMembers
                )
                  ? res.profile.staffMembers
                  : [],

            })
          );
        }

      } catch (error) {

        console.error(
          "LOAD KINDERGARTEN ERROR:",
          error
        );

      } finally {

        setLoading(false);

      }
    }


    if (vendorId) {
      loadKindergarten();
    }

  }, [vendorId]);


  // =========================================================
// دریافت کالاهای مهدکودک + اطلاعات بسته
// =========================================================

useEffect(() => {

  async function loadVendorProducts() {

    try {

      setLoadingProducts(true);

      const productsUrl =
        isVendorOwner
          ? `${API_BASE_URL}/vendor-products/vendor/${vendorId}`
          : `${API_BASE_URL}/vendor-products/public`;

      const productHeaders =
        isVendorOwner
          ? {
              Authorization:
                `Bearer ${localStorage.getItem(
                  "genino_token"
                )}`,
              Accept:
                "application/json",
            }
          : {
              Accept:
                "application/json",
            };


      const [
        vendorRes,
        productsRes,
      ] = await Promise.all([

        fetch(
          `${API_BASE_URL}/vendors/${vendorId}`
        ),

        fetch(
          productsUrl,
          {
            method: "GET",
            headers:
              productHeaders,
          }
        ),

      ]);


      const vendorData =
        await vendorRes.json();

      const productsData =
        await productsRes.json();


      if (
        !vendorRes.ok ||
        !vendorData?.ok
      ) {
        throw new Error(
          vendorData?.message ||
          "خطا در دریافت اطلاعات بسته مهدکودک"
        );
      }


      if (
        !productsRes.ok ||
        !productsData?.ok
      ) {
        throw new Error(
          productsData?.message ||
          "خطا در دریافت محصولات مهدکودک"
        );
      }


      const v =
        vendorData.vendor;


      setVendor({
        ...v,

        packageWindowCount:
          v.selectedPackageWindowCount ??
          0,

        packageAchievementLimit:
          v.selectedPackageAchievementLimit ??
          0,

        achievementUsedCount:
          v.achievementUsedCount ??
          0,
      });


      const receivedProducts =
        Array.isArray(
          productsData.products
        )
          ? productsData.products
          : [];


      const vendorProducts =
        isVendorOwner
          ? receivedProducts
          : receivedProducts.filter(
              (product) => {

                const productVendorId =
                  product.vendorId ??
                  product.vendor?.id;

                return (
                  Number(
                    productVendorId
                  ) ===
                  Number(
                    vendorId
                  )
                );
              }
            );


      const fixedProducts =
        vendorProducts.map(
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


      setProducts(
        fixedProducts
      );

    } catch (error) {

      console.error(
        "LOAD KINDERGARTEN PRODUCTS ERROR:",
        error
      );

      setProducts([]);

    } finally {

      setLoadingProducts(
        false
      );
    }
  }


  if (vendorId) {
    loadVendorProducts();
  }

}, [
  vendorId,
  API_BASE_URL,
  isVendorOwner,
]);


// =========================================================
// دریافت خدمات مهدکودک
// =========================================================

useEffect(() => {

  async function loadVendorServices() {

    try {

      setLoadingServices(true);


      const servicesUrl =
        isVendorOwner
          ? `${API_BASE_URL}/vendor-services/vendor/${vendorId}`
          : `${API_BASE_URL}/vendor-services/public/vendor/${vendorId}`;


      const headers =
        isVendorOwner
          ? {
              Authorization:
                `Bearer ${localStorage.getItem(
                  "genino_token"
                )}`,
              Accept:
                "application/json",
            }
          : {
              Accept:
                "application/json",
            };


      const res =
        await fetch(
          servicesUrl,
          {
            method: "GET",
            headers,
          }
        );


      const data =
        await res.json();


      if (
        !res.ok ||
        !data?.ok
      ) {
        throw new Error(
          data?.message ||
          "خطا در دریافت خدمات مهدکودک"
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
        "LOAD KINDERGARTEN SERVICES ERROR:",
        error
      );

      setServices([]);

    } finally {

      setLoadingServices(
        false
      );
    }
  }


  if (vendorId) {
    loadVendorServices();
  }

}, [
  vendorId,
  API_BASE_URL,
  isVendorOwner,
]);


const packageWindowCount =
  Number(
    vendor?.packageWindowCount ||
    0
  );

const packageAchievementLimit =
  Number(
    vendor?.packageAchievementLimit ||
    0
  );


const achievementUsedCount =
  Number(
    vendor?.achievementUsedCount ||
    0
  );


const remainingAchievementCount =
  Math.max(
    packageAchievementLimit -
      achievementUsedCount,
    0
  );

const loadingWindows =
  loadingProducts ||
  loadingServices;


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
            method:
              "DELETE",

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
        "DELETE KINDERGARTEN PRODUCT ERROR:",
        error
      );

      alert(
        "خطا در ارتباط با سرور"
      );
    }
  };


const handlePublishProduct =
  async (productId) => {

    try {

      const res =
        await fetch(
          `${API_BASE_URL}/vendor-products/${productId}/publish`,
          {
            method:
              "PATCH",

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
              item.id ===
              productId
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
        "PUBLISH KINDERGARTEN PRODUCT ERROR:",
        error
      );

      alert(
        "خطا در ارتباط با سرور"
      );
    }
  };


const handleUnpublishProduct =
  async (productId) => {

    try {

      const res =
        await fetch(
          `${API_BASE_URL}/vendor-products/${productId}/unpublish`,
          {
            method:
              "PATCH",

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
              item.id ===
              productId
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
        "UNPUBLISH KINDERGARTEN PRODUCT ERROR:",
        error
      );

      alert(
        "خطا در ارتباط با سرور"
      );
    }
  };

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
            method:
              "DELETE",

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
              item.id !==
              serviceId
          )
      );


      alert(
        "خدمت با موفقیت حذف شد."
      );

    } catch (error) {

      console.error(
        "DELETE KINDERGARTEN SERVICE ERROR:",
        error
      );

      alert(
        "خطا در ارتباط با سرور"
      );
    }
  };


const handlePublishService =
  async (serviceId) => {

    try {

      const res =
        await fetch(
          `${API_BASE_URL}/vendor-services/${serviceId}/publish`,
          {
            method:
              "PATCH",

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
              item.id ===
              serviceId
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
        "PUBLISH KINDERGARTEN SERVICE ERROR:",
        error
      );

      alert(
        "خطا در ارتباط با سرور"
      );
    }
  };


const handleUnpublishService =
  async (serviceId) => {

    try {

      const res =
        await fetch(
          `${API_BASE_URL}/vendor-services/${serviceId}/unpublish`,
          {
            method:
              "PATCH",

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
              item.id ===
              serviceId
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
        "UNPUBLISH KINDERGARTEN SERVICE ERROR:",
        error
      );

      alert(
        "خطا در ارتباط با سرور"
      );
    }
  };

  // =========================================================
// تصاویر هدر مهدکودک
// =========================================================

const addHeaderImage = async (file) => {
  if (!file) return;

  try {
    const ext =
      file.name.split(".").pop();

    const presign =
      await presignVendorKindergartenHeaderUpload({
        ext,
        contentType: file.type,
        fileName: file.name,
        fileSize: file.size,
      });

    if (!presign?.ok) {
      alert(
        presign?.message ||
        "خطا در آماده‌سازی تصویر"
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
        "آپلود تصویر انجام نشد"
      );

      return;
    }

    setKindergarten((prev) => ({
      ...prev,

      headerImages: [
        ...prev.headerImages,

        {
          url: presign.publicUrl,
          description: "",
        },
      ],
    }));

  } catch (error) {
    console.error(
      "UPLOAD KINDERGARTEN HEADER ERROR:",
      error
    );

    alert(
      "خطا در آپلود تصویر"
    );
  }
};


const updateHeaderDescription = (
  index,
  value
) => {

  setKindergarten((prev) => ({
    ...prev,

    headerImages:
      prev.headerImages.map(
        (item, i) =>
          i === index
            ? {
                ...item,
                description: value,
              }
            : item
      ),
  }));

};


const removeHeaderImage = (
  index
) => {

  setKindergarten((prev) => ({
    ...prev,

    headerImages:
      prev.headerImages.filter(
        (_, i) =>
          i !== index
      ),
  }));


  setActiveHeaderIndex(
    (prev) =>
      Math.max(
        prev - 1,
        0
      )
  );
};

// =========================================================
// اعضای مدیریتی و آموزشی مهدکودک
// =========================================================

const addStaffMember = () => {

  setKindergarten((prev) => ({
    ...prev,

    staffMembers: [
      ...(Array.isArray(prev.staffMembers)
        ? prev.staffMembers
        : []),

      {
        name: "",
        position: "",
        education: "",
        experience: "",
        image: "",
      },
    ],
  }));

};


const updateStaffMember = (
  index,
  field,
  value
) => {

  setKindergarten((prev) => ({
    ...prev,

    staffMembers:
      prev.staffMembers.map(
        (member, i) =>
          i === index
            ? {
                ...member,
                [field]: value,
              }
            : member
      ),
  }));

};


const removeStaffMember = (
  index
) => {

  setKindergarten((prev) => ({
    ...prev,

    staffMembers:
      prev.staffMembers.filter(
        (_, i) =>
          i !== index
      ),
  }));

};


const uploadStaffMemberImage =
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
          "خطا در آماده‌سازی تصویر عضو مهدکودک"
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
          "آپلود تصویر عضو مهدکودک انجام نشد"
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
        "UPLOAD KINDERGARTEN STAFF IMAGE ERROR:",
        error
      );


      alert(
        "خطا در آپلود تصویر عضو مهدکودک"
      );

    }

};


// =========================================================
// نوع مهدکودک
// =========================================================

const toggleKindergartenType = (type) => {

  setKindergarten(
    (prev) => {

      const currentTypes =
        Array.isArray(prev.kindergartenTypes)
          ? prev.kindergartenTypes
          : [];

      const exists =
        currentTypes.includes(type);

      return {
        ...prev,

        kindergartenTypes:
          exists
            ? currentTypes.filter(
                (item) => item !== type
              )
            : [
                ...currentTypes,
                type,
              ],
      };
    }
  );


  setValidationErrors(
    (prev) => ({
      ...prev,
      kindergartenTypes: "",
    })
  );
};


  // =========================================================
  // گروه سنی
  // =========================================================

  const toggleAge = (age) => {

    setKindergarten(
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
// برنامه روزها و ساعات فعالیت
// =========================================================

const addWorkingSchedule = () => {

  setKindergarten((prev) => ({
    ...prev,

    workingSchedule: [
      ...(Array.isArray(
        prev.workingSchedule
      )
        ? prev.workingSchedule
        : []),

      {
        days: [],
        openingTime: "",
        closingTime: "",
      },
    ],
  }));


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

  setKindergarten((prev) => ({
    ...prev,

    workingSchedule:
      prev.workingSchedule.filter(
        (_, i) =>
          i !== index
      ),
  }));

};


const toggleScheduleDay = (
  scheduleIndex,
  day
) => {

  setKindergarten((prev) => {

    const nextSchedule =
      prev.workingSchedule.map(
        (schedule, index) => {

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
      );


    return {
      ...prev,
      workingSchedule:
        nextSchedule,
    };

  });


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

  setKindergarten((prev) => ({
    ...prev,

    workingSchedule:
      prev.workingSchedule.map(
        (schedule, i) =>
          i === index
            ? {
                ...schedule,
                [field]: value,
              }
            : schedule
      ),
  }));


  setValidationErrors(
    (prev) => ({
      ...prev,
      workingSchedule: "",
    })
  );
};


// =========================================================
// دستاوردهای مهدکودک
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
        await getKindergartenAchievements(
          vendorId
        );


      if (res?.ok) {

        setKindergartenAchievements(
          res.achievements ||
          []
        );

      } else {

        setKindergartenAchievements(
          []
        );


        alert(
          res?.message ||
          "خطا در دریافت دستاوردها"
        );

      }

    } catch (error) {

      console.error(
        "LOAD KINDERGARTEN ACHIEVEMENTS ERROR:",
        error
      );


      setKindergartenAchievements(
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
        await createKindergartenAchievement(
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

        setVendor(
          (prev) => ({
            ...prev,

            achievementUsedCount:
              Number(
                prev?.achievementUsedCount ||
                0
              ) + 1,
          })
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
        "CREATE KINDERGARTEN ACHIEVEMENT ERROR:",
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

  const validateFields = () => {

    const errors = {};


    if (
      !String(
        kindergarten.kindergartenName ||
          ""
      ).trim()
    ) {
      errors.kindergartenName =
        "نام مهدکودک الزامی است";
    }


    if (
      !String(
        kindergarten.slogan || ""
      ).trim()
    ) {
      errors.slogan =
        "شعار مهدکودک الزامی است";
    }


    if (
      !String(
        kindergarten.city || ""
      ).trim()
    ) {
      errors.city =
        "شهر محل فعالیت الزامی است";
    }


    if (
      !String(
        kindergarten.district || ""
      ).trim()
    ) {
      errors.district =
        "منطقه الزامی است";
    }


    if (
      !String(
        kindergarten.address || ""
      ).trim()
    ) {
      errors.address =
        "آدرس دقیق الزامی است";
    }


    if (
      !String(
        kindergarten.phone || ""
      ).trim()
    ) {
      errors.phone =
        "شماره تماس الزامی است";
    }


    if (
      !String(
        kindergarten.email || ""
      ).trim()
    ) {
      errors.email =
        "ایمیل الزامی است";

    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        String(
          kindergarten.email
        ).trim()
      )
    ) {
      errors.email =
        "فرمت ایمیل صحیح نیست";
    }


    if (
      !kindergarten.gender
    ) {
      errors.gender =
        "جنسیت پذیرش را مشخص کنید";
    }


    if (
      !Array.isArray(
        kindergarten.acceptedAges
      ) ||
      kindergarten.acceptedAges
        .length === 0
    ) {
      errors.acceptedAges =
        "حداقل یک گروه سنی انتخاب کنید";
    }

    if (
  !Array.isArray(
    kindergarten.kindergartenTypes
  ) ||
  kindergarten.kindergartenTypes
    .length === 0
) {
  errors.kindergartenTypes =
    "حداقل یک نوع مهدکودک انتخاب کنید";
}


    const schedule =
  Array.isArray(
    kindergarten.workingSchedule
  )
    ? kindergarten.workingSchedule
    : [];


if (schedule.length === 0) {

  errors.workingSchedule =
    "حداقل یک برنامه فعالیت ثبت کنید";

} else {

  const invalidSchedule =
    schedule.some(
      (item) =>
        !Array.isArray(
          item.days
        ) ||
        item.days.length === 0 ||
        !item.openingTime ||
        !item.closingTime
    );


  if (invalidSchedule) {

    errors.workingSchedule =
      "روزها و ساعت شروع و پایان همه برنامه‌های فعالیت را کامل کنید";

  }


  


  const hasInvalidTime =
    schedule.some(
      (item) =>
        item.openingTime &&
        item.closingTime &&
        item.openingTime >=
          item.closingTime
    );


  if (hasInvalidTime) {

    errors.workingSchedule =
      "ساعت پایان باید بعد از ساعت شروع باشد";

  }

}


    setValidationErrors(
      errors
    );


    return (
      Object.keys(errors).length ===
      0
    );
  };


  // =========================================================
  // ذخیره
  // =========================================================

  const handleSave = async () => {

    const valid =
      validateFields();


    if (!valid) {

      alert(
        "لطفاً اطلاعات ضروری مهدکودک را کامل کنید."
      );

      return;
    }


    try {

      setSaving(true);


      const {
  id,
  vendorId:
    savedVendorId,
  createdAt,
  updatedAt,
  children,
  ...payload
} = kindergarten;


      const res =
        await saveVendorKindergartenProfile(
          vendorId,
          payload
        );


      console.log(
        "SAVE KINDERGARTEN RESPONSE:",
        res
      );


      if (res?.ok) {

        if (res.profile) {

          setKindergarten(
            (prev) => ({
              ...prev,
              ...res.profile,
            })
          );

        }


        setValidationErrors(
          {}
        );


        alert(
          "اطلاعات مهدکودک با موفقیت ذخیره شد 💛"
        );

        return;
      }


      alert(
        res?.message ||
          "ذخیره اطلاعات مهدکودک انجام نشد."
      );

    } catch (error) {

      console.error(
        "SAVE KINDERGARTEN ERROR:",
        error
      );


      alert(
        "خطا در ذخیره اطلاعات مهدکودک."
      );

    } finally {

      setSaving(false);

    }

  };


  // =========================================================
  // Loading
  // =========================================================

  if (loading) {

    return (

      <main
        dir="rtl"
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#faf7ef]
          p-4
        "
      >

        <p
          className="
            text-sm
            font-bold
            text-gray-500
          "
        >
          در حال دریافت اطلاعات مهدکودک...
        </p>

      </main>

    );
  }


  // =========================================================
// نمای عمومی مهدکودک برای کاربران و بازدیدکنندگان
// =========================================================

if (!isVendorOwner) {
  return (
    <PublicKindergartenView
      kindergarten={kindergarten}

      products={products.filter(
        (product) =>
          product.status === "PUBLISHED"
      )}

      services={services.filter(
        (service) =>
          service.status === "PUBLISHED"
      )}

      loadingProducts={loadingProducts}
      loadingServices={loadingServices}
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


        {/* =============================================
          Header
        ============================================= */}

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
      rounded-3xl
      overflow-hidden
    "
  >

    {
      kindergarten.headerImages.length > 0
        ? (

          <div>

            <PromoSlider
              variant="golden"
              interval={7000}
              height="h-44 sm:h-52 md:h-60 lg:h-64"
              slides={
                kindergarten.headerImages.map(
                  (item, index) => ({
                    id: index,
                    image: item.url,
                    title: "",
                  })
                )
              }
              onIndexChange={(index) => {
                setActiveHeaderIndex(
                  index
                );
              }}
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
                items-center
                justify-center
                gap-2
                w-full
                rounded-xl
                bg-red-50
                border
                border-red-200
                py-2
                text-sm
                font-bold
                text-red-600
                hover:bg-red-100
                transition
              "
            >
              <Trash2 size={16} />
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
                  kindergarten
                    .headerImages[
                      activeHeaderIndex
                    ]?.description ||
                  ""
                }
                onChange={(e) =>
                  updateHeaderDescription(
                    activeHeaderIndex,
                    e.target.value
                  )
                }
                placeholder="مثلا: فضای بازی و آموزش مهدکودک"
                className="
                  mt-3
                  w-full
                  rounded-xl
                  border
                  bg-white
                  px-3
                  py-2
                  text-sm
                  text-center
                "
              />

            </div>

          </div>

        )
        : (

          <div
            className="
              h-52
              flex
              items-center
              justify-center
              rounded-3xl
              bg-gradient-to-r
              from-yellow-100
              to-yellow-200
            "
          >
            <Baby
              className="
                h-14
                w-14
                text-yellow-700
              "
            />
          </div>

        )
    }


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
        text-white
        font-bold
      "
    >
      <Upload size={18} />

      افزودن تصویر فضای مهدکودک

      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {

          addHeaderImage(
            e.target.files?.[0]
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
      حداکثر ۱۰ تصویر - فضای بازی، کلاس‌ها، حیاط، اتاق خواب، فضای آموزشی و ...
    </p>

  </div>

</section>


{/* =============================================
    پنجره‌های ارائه کالا و خدمت
============================================= */}

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
    در این بخش می‌توانید کالاها و خدمات مهدکودک را مدیریت کنید. هر کالا یا خدمت، یک پنجره از ظرفیت بسته همکاری شما را استفاده می‌کند.
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

    <div
      className="
        rounded-2xl
        bg-[#faf7ef]
        p-3
        text-center
        shadow-sm
      "
    >
      <p
        className="
          text-[11px]
          text-gray-400
          sm:text-xs
        "
      >
        پنجره‌های خریداری‌شده
      </p>

      <p
        className="
          mt-1
          text-lg
          font-black
          text-yellow-700
        "
      >
        {loadingWindows
          ? "..."
          : packageWindowCount}
      </p>
    </div>


    <div
      className="
        rounded-2xl
        bg-[#faf7ef]
        p-3
        text-center
        shadow-sm
      "
    >
      <p
        className="
          text-[11px]
          text-gray-400
          sm:text-xs
        "
      >
        استفاده‌شده
      </p>

      <p
        className="
          mt-1
          text-lg
          font-black
          text-[#7a5526]
        "
      >
        {loadingWindows
          ? "..."
          : usedWindowCount}
      </p>
    </div>


    <div
      className="
        rounded-2xl
        bg-[#faf7ef]
        p-3
        text-center
        shadow-sm
      "
    >
      <p
        className="
          text-[11px]
          text-gray-400
          sm:text-xs
        "
      >
        باقی‌مانده
      </p>

      <p
        className={`
          mt-1
          text-lg
          font-black
          ${
            remainingWindowCount > 0
              ? "text-green-600"
              : "text-red-500"
          }
        `}
      >
        {loadingWindows
          ? "..."
          : remainingWindowCount}
      </p>
    </div>

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
      transition-all
      duration-200
      hover:-translate-y-0.5
      hover:shadow-lg
      active:scale-95
    "
  >
    <p className="text-xs text-gray-400">
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


  {!loadingWindows &&
    canAddWindow && (

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
            `/vendor/product/create?source=kindergarten&vendorId=${vendorId}`
          )
        }
        className="
          w-full
          rounded-2xl
          bg-gradient-to-r
          from-[#7a5526]
          via-[#b88724]
          to-[#d4af37]
          py-3
          font-bold
          text-white
          shadow-lg
          transition
          hover:shadow-xl
        "
      >
        + افزودن محصول جدید
      </button>


      <button
        type="button"
        onClick={() =>
          navigate(
            `/vendor/service/create?source=kindergarten&vendorId=${vendorId}`
          )
        }
        className="
          w-full
          rounded-2xl
          border
          border-[#d4af37]
          bg-yellow-50
          py-3
          font-bold
          text-[#7a5526]
          shadow-sm
          transition
          hover:bg-yellow-100
          hover:shadow-md
        "
      >
        + افزودن خدمت جدید
      </button>

    </div>

  )}


  {!loadingWindows &&
    !canAddWindow && (

    <div
      className="
        mt-4
        text-center
        text-xs
        font-bold
        text-red-500
      "
    >
      {packageWindowCount <= 0
        ? "برای بسته مهدکودک پنجره کالا و خدمت ثبت نشده است"
        : "تمام پنجره‌های کالا و خدمت بسته شما استفاده شده است"
      }
    </div>

  )}

</section>

{/* =============================================
    کالاهای مهدکودک
============================================= */}

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
        کالاهای مهدکودک
      </h3>

      <p
        className="
          mt-1
          text-xs
          text-gray-400
        "
      >
        محصولات و کالاهای ارائه‌شده توسط مهدکودک
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
                  `/vendor/product/edit/${product.id}?source=kindergarten&vendorId=${vendorId}`
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

</section>

{/* =============================================
    رویدادها و خدمات مهدکودک
============================================= */}

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
        رویدادها و خدمات مهدکودک
      </h3>

      <p
        className="
          mt-1
          text-xs
          text-gray-400
        "
      >
        جشن‌ها، کارگاه‌ها، اردوها و خدمات قابل رزرو مهدکودک
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
          Array.isArray(service.images)
            ? service.images
            : [];


        const mainImage =
          serviceImages[
            Number(
              service.mainImageIndex || 0
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
                      "خدمت مهدکودک"
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
                  {
                    kindergarten.kindergartenName ||
                    "مهدکودک"
                  }
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
                    {service.capacity}
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
                    `/vendor/service/edit/${service.id}?source=kindergarten&vendorId=${vendorId}&mode=${service.scheduleMode}`
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

{/* =============================================
    دوره‌ها و کلاس‌های آموزشی
============================================= */}

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
        کلاس‌ها و دوره‌های چندجلسه‌ای مهدکودک
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


  {courseServices.length === 0 ? (

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
            service.scheduleMode ===
              "PACKAGE" &&
            service.package
              ? `شروع دوره: ${
                  formatPersianDate(
                    service.package
                      .startDate
                  ) ||
                  "ثبت نشده"
                } | ${
                  service.package
                    .totalSessions ||
                  0
                } جلسه`
              : service.startAt
              ? new Date(
                  service.startAt
                ).toLocaleString(
                  "fa-IR",
                  {
                    year:
                      "numeric",
                    month:
                      "2-digit",
                    day:
                      "2-digit",
                    hour:
                      "2-digit",
                    minute:
                      "2-digit",
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
                        "دوره مهدکودک"
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
                    {
                      kindergarten.kindergartenName ||
                      "مهدکودک"
                    }
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
                      {service.capacity}
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
                      {
                        service.locationName
                      }
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
                      `/vendor/service/edit/${service.id}?source=kindergarten&vendorId=${vendorId}&mode=${service.scheduleMode}`
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


        {/* =============================================
            معرفی مهد
        ============================================= */}

        <FormCard
          title="معرفی مهدکودک"
        >

          <SimpleInput
            label="نام مهدکودک"
            value={
              kindergarten
                .kindergartenName
            }
            onChange={(value) =>
              updateField(
                "kindergartenName",
                value
              )
            }
            error={
              validationErrors
                .kindergartenName
            }
          />


          <SimpleInput
            label="شعار مهدکودک"
            value={
              kindergarten.slogan
            }
            onChange={(value) =>
              updateField(
                "slogan",
                value
              )
            }
            error={
              validationErrors.slogan
            }
          />


          <SimpleTextArea
            label="معرفی کوتاه مهدکودک"
            value={
              kindergarten.description
            }
            onChange={(value) =>
              updateField(
                "description",
                value
              )
            }
          />

        </FormCard>


        {/* =============================================
            آدرس و تماس
        ============================================= */}

        <FormCard
          title="اطلاعات تماس و آدرس"
          icon={
            <MapPin size={19} />
          }
        >

          <SimpleInput
            label="شهر محل فعالیت"
            value={
              kindergarten.city
            }
            onChange={(value) =>
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
              kindergarten.district
            }
            onChange={(value) =>
              updateField(
                "district",
                value
              )
            }
            error={
              validationErrors.district
            }
          />


          <SimpleTextArea
            label="آدرس دقیق"
            value={
              kindergarten.address
            }
            onChange={(value) =>
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
              kindergarten.phone
            }
            onChange={(value) =>
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
              kindergarten.email
            }
            onChange={(value) =>
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


        {/* =============================================
            شرایط پذیرش
        ============================================= */}

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
              kindergarten.gender
            }
            options={[
              "دختر",
              "پسر",
              "مختلط",
            ]}
            onChange={(value) =>
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


            <div
              className={`
                mt-3
                flex
                flex-wrap
                gap-2
                rounded-2xl
                p-2
                ${
                  validationErrors
                    .acceptedAges
                    ? "border border-red-300 bg-red-50"
                    : ""
                }
              `}
            >

              {AGE_OPTIONS.map(
                (age) => {

                  const selected =
                    kindergarten
                      .acceptedAges
                      .includes(age);


                  return (

                    <button
                      key={age}
                      type="button"
                      onClick={() =>
                        toggleAge(age)
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
                          selected
                            ? "border-yellow-500 bg-yellow-100 text-[#6f4a18]"
                            : "border-gray-200 bg-white text-gray-500"
                        }
                      `}
                    >
                      {age}
                    </button>

                  );

                }
              )}

            </div>


            {validationErrors
              .acceptedAges && (

              <p
                className="
                  mt-2
                  text-xs
                  font-bold
                  text-red-500
                "
              >
                {
                  validationErrors
                    .acceptedAges
                }
              </p>

            )}

                    </div>


          <div className="sm:col-span-2">

            <p
              className="
                text-sm
                font-bold
                text-gray-700
              "
            >
              نوع مهدکودک
            </p>

            <p className="mt-1 text-xs text-gray-500">
              یک یا چند نوع فعالیت مهدکودک را انتخاب کنید.
            </p>


            <div
              className={`
                mt-3
                flex
                flex-wrap
                gap-2
                rounded-2xl
                p-2
                ${
                  validationErrors.kindergartenTypes
                    ? "border border-red-300 bg-red-50"
                    : ""
                }
              `}
            >

              {KINDERGARTEN_TYPE_OPTIONS.map(
                (type) => {

                  const selected =
                    Array.isArray(
                      kindergarten.kindergartenTypes
                    ) &&
                    kindergarten.kindergartenTypes.includes(
                      type
                    );

                  return (

                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        toggleKindergartenType(type)
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
                          selected
                            ? "border-yellow-500 bg-yellow-100 text-[#6f4a18]"
                            : "border-gray-200 bg-white text-gray-500"
                        }
                      `}
                    >
                      {type}
                    </button>

                  );
                }
              )}

            </div>


            {validationErrors.kindergartenTypes && (

              <p
                className="
                  mt-2
                  text-xs
                  font-bold
                  text-red-500
                "
              >
                {validationErrors.kindergartenTypes}
              </p>

            )}

          </div>


        </FormCard>


        {/* =============================================
    روزها و ساعات فعالیت
============================================= */}

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
        می‌توانید برای روزهای مختلف هفته، ساعات کاری متفاوت تعیین کنید.
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
        shadow-sm
        transition
        hover:bg-green-700
      "
    >
      + افزودن برنامه
    </button>

  </div>


  {kindergarten
    .workingSchedule
    .length === 0 ? (

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
      "
    >

      <p
        className="
          text-sm
          font-bold
          text-gray-500
        "
      >
        هنوز برنامه فعالیتی ثبت نشده است.
      </p>


      <p
        className="
          mt-2
          text-xs
          leading-6
          text-gray-400
        "
      >
        برای مثال می‌توانید شنبه تا سه‌شنبه را از ساعت ۸ تا ۲۰ و روزهای دیگر را با ساعات متفاوت ثبت کنید.
      </p>

    </div>

  ) : (

    <div
      className="
        mt-5
        space-y-4
      "
    >

      {kindergarten
        .workingSchedule
        .map(
          (
            schedule,
            index
          ) => (

          <div
            key={index}
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
                gap-2
              "
            >

              <p
                className="
                  text-sm
                  font-black
                  text-[#6f4a18]
                "
              >
                برنامه فعالیت
                {" "}
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
                  transition
                  hover:bg-red-100
                "
              >
                <Trash2
                  size={14}
                />

                حذف
              </button>

            </div>


            {/* روزهای هفته */}

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
                  (day) => {

                    const selected =
                      Array.isArray(
                        schedule.days
                      ) &&
                      schedule.days
                        .includes(
                          day
                        );


                   


                    return (

                      <button
                        key={day}
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
                          transition

                          ${
  selected
    ? "border-yellow-500 bg-yellow-100 text-[#6f4a18]"
    : "border-gray-200 bg-white text-gray-500 hover:border-yellow-300"
}
                        `}
                      >
                        {day}
                      </button>

                    );

                  }
                )}

              </div>

            </div>


            {/* ساعات */}

            <div
              className="
                mt-4
                grid
                grid-cols-2
                gap-3
              "
            >

              <div>

                <label
                  className="
                    text-xs
                    font-bold
                    text-gray-500
                  "
                >
                  ساعت شروع
                </label>


                <input
                  type="time"
                  value={
                    schedule
                      .openingTime ||
                    ""
                  }
                  onChange={(e) =>
                    updateScheduleTime(
                      index,
                      "openingTime",
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


              <div>

                <label
                  className="
                    text-xs
                    font-bold
                    text-gray-500
                  "
                >
                  ساعت پایان
                </label>


                <input
                  type="time"
                  value={
                    schedule
                      .closingTime ||
                    ""
                  }
                  onChange={(e) =>
                    updateScheduleTime(
                      index,
                      "closingTime",
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

            </div>


            {/* خلاصه برنامه */}

            {Array.isArray(
              schedule.days
            ) &&
              schedule.days
                .length > 0 &&
              schedule.openingTime &&
              schedule.closingTime && (

              <div
                className="
                  mt-4
                  rounded-xl
                  bg-white
                  px-3
                  py-2
                  text-center
                  text-xs
                  font-bold
                  text-[#7a5526]
                "
              >
                {
                  schedule.days.join(
                    "، "
                  )
                }

                {" — "}

                {
                  schedule.openingTime
                }

                {" تا "}

                {
                  schedule.closingTime
                }
              </div>

            )}

          </div>

        ))}

    </div>

  )}


  {validationErrors
    .workingSchedule && (

    <p
      className="
        mt-3
        rounded-xl
        bg-red-50
        px-3
        py-2
        text-xs
        font-bold
        text-red-500
      "
    >
      {
        validationErrors
          .workingSchedule
      }
    </p>

  )}

</section>


        {/* =============================================
            ظرفیت و فضای مهد
        ============================================= */}

        <FormCard
          title="ظرفیت و فضای مهدکودک"
        >

          <SimpleInput
            label="ظرفیت پذیرش کودک"
            value={
              kindergarten
                .childCapacity
            }
            onChange={(value) =>
              updateField(
                "childCapacity",
                value
              )
            }
          />


          <SimpleInput
            label="سال تأسیس"
            value={
              kindergarten.foundedYear
            }
            onChange={(value) =>
              updateField(
                "foundedYear",
                value
              )
            }
          />


          <SimpleInput
            label="وسعت مهدکودک"
            value={
              kindergarten.area
            }
            onChange={(value) =>
              updateField(
                "area",
                value
              )
            }
          />


          <SimpleInput
            label="تعداد اتاق‌ها"
            value={
              kindergarten.roomCount
            }
            onChange={(value) =>
              updateField(
                "roomCount",
                value
              )
            }
          />

        </FormCard>

        {/* =============================================
    امکانات تخصصی مهدکودک
============================================= */}

<FormCard
  title="امکانات و برنامه‌های تخصصی مهدکودک"
>
  <div className="sm:col-span-2">
    <p className="mb-4 text-xs leading-6 text-gray-500">
      برنامه‌های آموزشی، هنری، ورزشی و امکانات ویژه‌ای را که مهدکودک ارائه می‌دهد انتخاب کنید.
    </p>
  </div>

  <KindergartenFeatureSection
    value={kindergarten.facilities}
    onChange={(value) =>
      updateField(
        "facilities",
        value
      )
    }
  />
</FormCard>


        {/* =============================================
    برنامه غذایی مهدکودک
============================================= */}

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
        برنامه غذایی کودکان
      </h2>

      <p
        className="
          mt-2
          text-xs
          leading-6
          text-gray-500
        "
      >
        اگر مهدکودک برای کودکان صبحانه، میان‌وعده، ناهار یا سایر وعده‌های غذایی ارائه می‌کند، این بخش را فعال کنید.
      </p>

    </div>


    <button
      type="button"
      onClick={() =>
        updateField(
          "hasMealProgram",
          !kindergarten.hasMealProgram
        )
      }
      className={`
        relative
        h-7
        w-14
        shrink-0
        rounded-full
        transition
        ${
          kindergarten.hasMealProgram
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
            kindergarten.hasMealProgram
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
      transition

      ${
        kindergarten.hasMealProgram
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

      <div>

        <p
          className="
            text-sm
            font-black
            text-gray-700
          "
        >
          ارائه برنامه غذایی
        </p>

        <p
          className="
            mt-1
            text-xs
            text-gray-400
          "
        >
          {kindergarten.hasMealProgram
            ? "مهدکودک دارای برنامه غذایی است."
            : "برنامه غذایی ارائه نمی‌شود."
          }
        </p>

      </div>


      <span
        className={`
          rounded-full
          px-3
          py-1
          text-xs
          font-black

          ${
            kindergarten.hasMealProgram
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-500"
          }
        `}
      >
        {kindergarten.hasMealProgram
          ? "دارد"
          : "ندارد"
        }
      </span>

    </div>


    {kindergarten.hasMealProgram && (

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
          توضیحات برنامه غذایی
        </label>


        <textarea
          value={
            kindergarten.mealDescription ||
            ""
          }
          onChange={(e) =>
            updateField(
              "mealDescription",
              e.target.value
            )
          }
          placeholder="مثلاً: صبحانه، میان‌وعده صبح، ناهار و عصرانه بر اساس برنامه هفتگی ارائه می‌شود. امکان اعلام حساسیت غذایی کودک نیز وجود دارد."
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
            transition
            focus:border-yellow-400
          "
        />

      </div>

    )}

  </div>

</section>


{/* =============================================
    سرویس رفت‌وآمد
============================================= */}

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
        سرویس رفت‌وآمد کودکان
      </h2>

      <p
        className="
          mt-2
          text-xs
          leading-6
          text-gray-500
        "
      >
        اگر مهدکودک برای رفت‌وآمد کودکان سرویس ارائه می‌کند، این بخش را فعال کرده و محدوده و شرایط آن را توضیح دهید.
      </p>

    </div>


    <button
      type="button"
      onClick={() =>
        updateField(
          "hasTransportation",
          !kindergarten.hasTransportation
        )
      }
      className={`
        relative
        h-7
        w-14
        shrink-0
        rounded-full
        transition

        ${
          kindergarten.hasTransportation
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
            kindergarten.hasTransportation
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
      transition

      ${
        kindergarten.hasTransportation
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

      <div>

        <p
          className="
            text-sm
            font-black
            text-gray-700
          "
        >
          ارائه سرویس رفت‌وآمد
        </p>

        <p
          className="
            mt-1
            text-xs
            text-gray-400
          "
        >
          {kindergarten.hasTransportation
            ? "مهدکودک دارای سرویس رفت‌وآمد است."
            : "سرویس رفت‌وآمد ارائه نمی‌شود."
          }
        </p>

      </div>


      <span
        className={`
          rounded-full
          px-3
          py-1
          text-xs
          font-black

          ${
            kindergarten.hasTransportation
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-500"
          }
        `}
      >
        {kindergarten.hasTransportation
          ? "دارد"
          : "ندارد"
        }
      </span>

    </div>


    {kindergarten.hasTransportation && (

      <div className="mt-4">

        <label
          className="
            text-xs
            font-bold
            text-gray-600
          "
        >
          توضیحات سرویس رفت‌وآمد
        </label>


        <textarea
          value={
            kindergarten
              .transportationDescription ||
            ""
          }
          onChange={(e) =>
            updateField(
              "transportationDescription",
              e.target.value
            )
          }
          placeholder="مثلاً: سرویس رفت‌وبرگشت در محدوده سعادت‌آباد، شهرک غرب و پونک ارائه می‌شود. هزینه سرویس بر اساس مسیر تعیین می‌شود."
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
            transition
            focus:border-yellow-400
          "
        />

      </div>

    )}

  </div>

</section>




{/* =============================================
    کادر آموزشی مهدکودک
============================================= */}

<FormCard
  title="کادر آموزشی مهدکودک"
>

  <SimpleInput
    label="تعداد مربیان"
    value={
      kindergarten.teacherCount
    }
    onChange={(value) =>
      updateField(
        "teacherCount",
        value
      )
    }
  />


  <SimpleInput
    label="میانگین سابقه مربیان"
    value={
      kindergarten.teacherExperience
    }
    onChange={(value) =>
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
          اعضای مدیریتی و آموزشی مهدکودک
        </h3>


        <p
          className="
            mt-1
            text-xs
            leading-6
            text-gray-400
          "
        >
          مدیر، مربیان و سایر اعضای آموزشی مهدکودک را معرفی کنید.
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
          transition
          hover:bg-green-700
        "
      >
        + افزودن عضو جدید
      </button>

    </div>


    {kindergarten.staffMembers.length === 0 ? (

      <div
        className="
          rounded-2xl
          border
          border-dashed
          border-yellow-200
          bg-yellow-50/40
          py-8
          text-center
        "
      >

        <p
          className="
            text-sm
            font-bold
            text-gray-500
          "
        >
          هنوز عضوی ثبت نشده است.
        </p>


        <p
          className="
            mt-2
            text-xs
            text-gray-400
          "
        >
          با دکمه «افزودن عضو جدید» می‌توانید مدیر و مربیان مهدکودک را معرفی کنید.
        </p>

      </div>

    ) : (

      <div className="space-y-2">

        {kindergarten.staffMembers.map(
          (
            member,
            index
          ) => (

          <div
            key={index}
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

            {/* عکس عضو */}

            <div
              className="
                flex
                w-16
                shrink-0
                flex-col
                items-center
                gap-1
              "
            >

              <label
                className="
                  relative
                  flex
                  h-12
                  w-12
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
                title={
                  member.image
                    ? "تعویض عکس"
                    : "افزودن عکس"
                }
              >

                {member.image ? (

                  <img
                    src={
                      member.image
                    }
                    alt={
                      member.name ||
                      "عضو مهدکودک"
                    }
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
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={async (
                    event
                  ) => {

                    const file =
                      event
                        .target
                        .files?.[0];


                    await uploadStaffMemberImage(
                      index,
                      file
                    );


                    event.target.value =
                      "";

                  }}
                />

              </label>


              {member.image && (

                <button
                  type="button"
                  onClick={() =>
                    updateStaffMember(
                      index,
                      "image",
                      ""
                    )
                  }
                  className="
                    text-[10px]
                    font-bold
                    text-red-500
                    hover:text-red-600
                  "
                >
                  حذف عکس
                </button>

              )}

            </div>


            {/* اطلاعات عضو */}

            <div
              className="
                grid
                flex-1
                grid-cols-2
                gap-2
                sm:grid-cols-4
              "
            >

              <input
                placeholder="نام"
                value={
                  member.name ||
                  ""
                }
                onChange={(e) =>
                  updateStaffMember(
                    index,
                    "name",
                    e.target.value
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


              <input
                placeholder="سمت"
                value={
                  member.position ||
                  ""
                }
                onChange={(e) =>
                  updateStaffMember(
                    index,
                    "position",
                    e.target.value
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


              <input
                placeholder="تحصیلات"
                value={
                  member.education ||
                  ""
                }
                onChange={(e) =>
                  updateStaffMember(
                    index,
                    "education",
                    e.target.value
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


              <input
                placeholder="سابقه آموزشی"
                value={
                  member.experience ||
                  ""
                }
                onChange={(e) =>
                  updateStaffMember(
                    index,
                    "experience",
                    e.target.value
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

            </div>


            {/* حذف عضو */}

            <button
              type="button"
              onClick={() =>
                removeStaffMember(
                  index
                )
              }
              className="
                shrink-0
                rounded-lg
                bg-red-50
                px-3
                py-2
                text-xs
                font-bold
                text-red-600
                transition
                hover:bg-red-100
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


{/* =============================================
    رزومه مهدکودک
============================================= */}

<FormCard
  title="معرفی و رزومه مهدکودک"
>

  <div className="sm:col-span-2">

    <p
      className="
        mb-4
        text-xs
        leading-6
        text-gray-500
      "
    >
      درباره سابقه فعالیت، رویکرد آموزشی، افتخارات، مجوزها و ویژگی‌های شاخص مهدکودک توضیح دهید.
    </p>

  </div>


  <SimpleTextArea
    label="معرفی و رزومه"
    value={
      kindergarten.resume
    }
    onChange={(value) =>
      updateField(
        "resume",
        value
      )
    }
  />

</FormCard>


{/* =============================================
    دستاوردهای مهدکودک
============================================= */}

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
      className="text-yellow-700"
    />

    <h2
      className="
        font-black
        text-[#6f4a18]
      "
    >
      دستاوردهای مهدکودک
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
    از این بخش می‌توانید برای کودکان مهدکودک دستاورد صادر کنید.
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

    <div
      className="
        rounded-2xl
        bg-[#faf7ef]
        p-3
        text-center
        shadow-sm
      "
    >
      <p className="text-[11px] text-gray-400 sm:text-xs">
        مجوز خریداری‌شده
      </p>

      <p className="mt-1 text-lg font-black text-yellow-700">
        {loadingProducts
          ? "..."
          : packageAchievementLimit}
      </p>
    </div>


    <button
      type="button"
      onClick={
        handleOpenAchievementHistory
      }
      disabled={
        loadingProducts ||
        achievementUsedCount <= 0
      }
      className="
        rounded-2xl
        bg-[#faf7ef]
        p-3
        text-center
        shadow-sm
        transition
        hover:-translate-y-0.5
        hover:bg-yellow-50
        hover:shadow-md
        disabled:cursor-default
      "
    >
      <p className="text-[11px] text-gray-400 sm:text-xs">
        استفاده‌شده
      </p>

      <p className="mt-1 text-lg font-black text-[#7a5526]">
        {loadingProducts
          ? "..."
          : achievementUsedCount}
      </p>

      {achievementUsedCount > 0 && (
        <p
          className="
            mt-1
            text-[10px]
            font-bold
            text-yellow-700
          "
        >
          مشاهده جزئیات
        </p>
      )}
    </button>


    <div
      className="
        rounded-2xl
        bg-[#faf7ef]
        p-3
        text-center
        shadow-sm
      "
    >
      <p className="text-[11px] text-gray-400 sm:text-xs">
        باقی‌مانده
      </p>

      <p
        className={`
          mt-1
          text-lg
          font-black
          ${
            remainingAchievementCount > 0
              ? "text-green-600"
              : "text-red-500"
          }
        `}
      >
        {loadingProducts
          ? "..."
          : remainingAchievementCount}
      </p>
    </div>

  </div>


  {packageAchievementLimit <= 0 &&
    !loadingProducts && (

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
      در بسته مهدکودک مجوز صدور دستاورد ثبت نشده است
    </div>

  )}


  <div className="mt-5">

    <KindergartenChildrenSection
      selectedChildren={
        kindergarten.children
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
        اهدای دستاورد برای:
        {" "}
        {
          selectedAchievementChild.fullName
        }
      </h3>


      <select
        value={
          achievementForm.category
        }
        onChange={(e) =>
          setAchievementForm(
            (prev) => ({
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
        onChange={(e) =>
          setAchievementForm(
            (prev) => ({
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
        onChange={(e) =>
          setAchievementForm(
            (prev) => ({
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


        {/* =============================================
            ذخیره
        ============================================= */}

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
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >

          <Save size={18} />


          {saving
            ? "در حال ذخیره..."
            : "ذخیره اطلاعات مهدکودک"
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
        value={value || ""}
        onChange={(e) =>
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

        <p
          className="
            mt-1
            text-xs
            font-bold
            text-red-500
          "
        >
          {error}
        </p>

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
        value={value || ""}
        onChange={(e) =>
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

        <p
          className="
            mt-1
            text-xs
            font-bold
            text-red-500
          "
        >
          {error}
        </p>

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
        value={value || ""}
        onChange={(e) =>
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
          (option) => (

            <option
              key={option}
              value={option}
            >
              {option}
            </option>

          )
        )}

      </select>


      {error && (

        <p
          className="
            mt-1
            text-xs
            font-bold
            text-red-500
          "
        >
          {error}
        </p>

      )}

    </div>

  );

}


function TimeInput({
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
        type="time"
        value={value || ""}
        onChange={(e) =>
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
      />


      {error && (

        <p
          className="
            mt-1
            text-xs
            font-bold
            text-red-500
          "
        >
          {error}
        </p>

      )}

    </div>

  );

}