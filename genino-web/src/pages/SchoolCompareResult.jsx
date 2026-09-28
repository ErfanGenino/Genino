import { useEffect, useMemo, useState } from "react";
import {
  Link,
  useSearchParams,
} from "react-router-dom";
import { getVendorSchoolProfile } from "../services/api";
import {
  SCHOOL_FEATURE_SECTIONS,
} from "./vendor/service/components/SchoolFeatureSection";

export default function SchoolCompareResult() {
  const [searchParams] = useSearchParams();

  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSchools = async () => {
      try {
        setLoading(true);
        setError("");

        const idsParam = searchParams.get("ids") || "";

        const vendorIds = idsParam
          .split(",")
          .map((id) => id.trim())
          .filter(Boolean);

        if (vendorIds.length < 2) {
          setError(
            "برای مقایسه باید حداقل دو مدرسه انتخاب شده باشد."
          );
          setSchools([]);
          return;
        }

        const results = await Promise.all(
          vendorIds.map((vendorId) =>
            getVendorSchoolProfile(vendorId)
          )
        );

        const loadedSchools = results
          .map((result, index) => {
            let school = null;

            if (result?.school) {
              school = result.school;
            } else if (result?.data?.school) {
              school = result.data.school;
            } else if (result?.data) {
              school = result.data;
            } else {
              school = result;
            }

            if (!school) return null;

            return {
              ...school,

              // برای اینکه حتی اگر API vendorId نداد،
              // مسیر مدرسه را از دست ندهیم.
              vendorId:
                school.vendorId ||
                school.vendor?.id ||
                vendorIds[index],
            };
          })
          .filter(Boolean);

        setSchools(loadedSchools);
      } catch (err) {
        console.error(
          "❌ خطا در دریافت مدارس برای مقایسه:",
          err
        );

        setError(
          err?.message ||
            "دریافت اطلاعات مدارس برای مقایسه انجام نشد."
        );

        setSchools([]);
      } finally {
        setLoading(false);
      }
    };

    loadSchools();
  }, [searchParams]);

  const comparisonSections = useMemo(
    () => [
      {
        title: "اطلاعات کلی",
        rows: [
          {
            label: "نام مدرسه",
            getValue: (school) => school.schoolName,
          },
          {
            label: "نوع مدرسه",
            getValue: (school) => school.schoolType,
          },
          {
            label: "جنسیت",
            getValue: (school) => school.gender,
          },
          {
            label: "مقاطع تحصیلی",
            getValue: (school) =>
              Array.isArray(school.educationLevels)
                ? school.educationLevels.join("، ")
                : school.educationLevels,
          },
          {
            label: "سال تأسیس",
            getValue: (school) => school.foundedYear,
          },
        ],
      },

      {
        title: "موقعیت مدرسه",
        rows: [
          {
            label: "شهر",
            getValue: (school) => school.city,
          },
          {
            label: "منطقه",
            getValue: (school) => school.district,
          },
          {
            label: "آدرس",
            getValue: (school) => school.address,
          },
        ],
      },

      {
        title: "فضا و ظرفیت",
        rows: [
          {
            label: "مساحت",
            getValue: (school) =>
              school.area
                ? `${school.area} متر مربع`
                : null,
          },
          {
            label: "تعداد ساختمان",
            getValue: (school) => school.buildingCount,
          },
          {
            label: "تعداد کلاس",
            getValue: (school) => school.classroomCount,
          },
          {
            label: "ظرفیت دانش‌آموز",
            getValue: (school) =>
              school.studentCapacity,
          },
        ],
      },

      {
        title: "کادر آموزشی",
        rows: [
          {
            label: "تعداد معلم",
            getValue: (school) => school.teacherCount,
          },
          {
            label: "سابقه معلمان",
            getValue: (school) =>
              school.teacherExperience,
          },
          {
            label: "سطح علمی",
            getValue: (school) => school.scientificLevel,
          },
        ],
      },
    ],
    []
  );

  if (loading) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-[#faf7ef] px-4 py-10"
      >
        <div className="mx-auto max-w-7xl">
          <div
            className="
              rounded-[2rem]
              border
              border-yellow-100
              bg-white
              p-8
              text-center
              text-sm
              font-bold
              text-[#7a5526]
              shadow-sm
            "
          >
            در حال دریافت اطلاعات مدارس...
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-[#faf7ef] px-4 py-10"
      >
        <div className="mx-auto max-w-7xl">
          <div
            className="
              rounded-[2rem]
              border
              border-red-100
              bg-white
              p-8
              text-center
              text-sm
              font-bold
              text-red-600
              shadow-sm
            "
          >
            {error}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="
        min-h-screen
        bg-[#faf7ef]
        px-3
        py-6
        sm:px-4
        sm:py-10
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* هدر */}
        <div
          className="
            mb-6
            rounded-[2rem]
            bg-gradient-to-l
            from-[#4b2f17]
            via-[#7a5526]
            to-[#b88724]
            px-5
            py-6
            text-white
            shadow-lg
            sm:px-8
            sm:py-8
          "
        >
          <h1 className="text-xl font-black sm:text-2xl">
            مقایسه مدارس
          </h1>

          <p className="mt-2 text-xs leading-6 text-white/80 sm:text-sm">
            مشخصات مدارس انتخاب‌شده را کنار یکدیگر
            بررسی و مقایسه کنید.
          </p>
        </div>

        {/* جدول مقایسه */}
        <div
          className="
            overflow-hidden
            rounded-[2rem]
            border
            border-yellow-100
            bg-white
            shadow-sm
          "
        >
          <div className="overflow-x-auto">
            <div
              style={{
                minWidth: `${
                  170 + schools.length * 180
                }px`,
              }}
            >

              {/* سربرگ مدارس */}
              <div
                className="grid"
                style={{
                  gridTemplateColumns: `170px repeat(${schools.length}, minmax(180px, 1fr))`,
                }}
              >
                <div
  className="
    flex
    items-center
    justify-center
    border-b
    border-l
    border-yellow-100
    bg-gradient-to-br
    from-[#4b2f17]
    via-[#7a5526]
    to-[#b88724]
    p-4
    text-center
    text-sm
    font-black
    text-white
  "
>
  مشخصات
</div>

                {schools.map((school, index) => {
                  const image =
                    school.image ||
                    (Array.isArray(school.headerImages) &&
                    school.headerImages.length > 0
                      ? typeof school.headerImages[0] ===
                        "string"
                        ? school.headerImages[0]
                        : school.headerImages[0]?.url
                      : "");

                  return (
                    <div
                      key={
                        school.vendorId ||
                        school.id ||
                        index
                      }
                      className="
                        border-b
                        border-l
                        border-yellow-100
                        bg-[#fffdf8]
                        p-3
                        text-center
                      "
                    >
                      {image ? (
                        <img
                          src={image}
                          alt={
                            school.schoolName ||
                            "مدرسه"
                          }
                          className="
                            mx-auto
                            h-24
                            w-full
                            max-w-[150px]
                            rounded-2xl
                            object-cover
                          "
                        />
                      ) : (
                        <div
                          className="
                            mx-auto
                            flex
                            h-24
                            w-full
                            max-w-[150px]
                            items-center
                            justify-center
                            rounded-2xl
                            bg-[#faf7ef]
                            text-4xl
                          "
                        >
                          🏫
                        </div>
                      )}

                      <div
                        className="
                          mt-3
                          text-xs
                          font-black
                          leading-6
                          text-[#4b2f17]
                        "
                      >
                        {school.schoolName ||
                          `مدرسه ${index + 1}`}
                      </div>

                      {school.slogan && (
                        <div
                          className="
                            mt-1
                            line-clamp-2
                            text-[10px]
                            leading-5
                            text-gray-500
                          "
                        >
                          {school.slogan}
                        </div>
                      )}

                      {school.vendorId && (
                        <Link
                          to={`/vendor/service/school/${school.vendorId}`}
                          className="
                            mt-3
                            inline-flex
                            rounded-xl
                            bg-gradient-to-r
                            from-[#7a5526]
                            via-[#b88724]
                            to-[#d4af37]
                            px-4
                            py-2
                            text-[10px]
                            font-black
                            text-white
                            transition
                            hover:scale-[1.02]
                          "
                        >
                          مشاهده مدرسه
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* بخش‌های مقایسه */}
              {comparisonSections.map(
                (section, sectionIndex) => (
                  <div key={section.title}>

                    {/* عنوان بخش */}
                    <div
  className="
    border-y
    border-yellow-200
    bg-gradient-to-r
    from-[#f7ecd0]
    via-[#fff8e8]
    to-[#f7ecd0]
    px-5
    py-3
    text-sm
    font-black
    text-[#6f4a18]
  "
>
  {section.title}
</div>

                    {section.rows.map(
                      (row, rowIndex) => (
                        <div
  key={row.label}
  className={`
    grid
    border-b
    border-yellow-100
    last:border-b-0

    ${
      rowIndex % 2 === 0
        ? "bg-white"
        : "bg-[#fffdf8]"
    }
  `}
  style={{
    gridTemplateColumns: `170px repeat(${schools.length}, minmax(180px, 1fr))`,
  }}
>
                          {/* عنوان مشخصه */}
                          <div
                            className={`
                              flex
                              items-center
                              border-l
                              border-yellow-100
                              bg-[#faf7ef]
                              px-4
                              py-4
                              text-[11px]
                              font-black
                              text-[#4b2f17]
                            
                            `}
                          >
                            {row.label}
                          </div>

                          {/* مقدار هر مدرسه */}
                          {schools.map(
                            (school, schoolIndex) => {
                              const value =
                                row.getValue(
                                  school
                                );

                              return (
                                <div
                                  key={`${
                                    school.vendorId ||
                                    school.id ||
                                    schoolIndex
                                  }-${row.label}`}
                                  className={`
                                    flex
                                    items-center
                                    justify-center
                                    border-l
                                    border-yellow-100
                                    px-3
                                    py-4
                                    text-center
                                    text-[11px]
                                    font-bold
                                    leading-6
                                    text-gray-700

                                  `}
                                >
                                  {value !== null &&
                                  value !== undefined &&
                                  value !== ""
                                    ? value
                                    : "—"}
                                </div>
                              );
                            }
                          )}
                        </div>
                      )
                    )}

                    {sectionIndex <
                      comparisonSections.length - 1 && (
                      <div className="h-2 bg-[#faf7ef]" />
                    )}
                  </div>
                )
              )}

              {/* امکانات مدرسه */}
              <SchoolFacilitiesComparison
                schools={schools}
              />

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================================
   امکانات مدارس
========================================= */

function SchoolFacilitiesComparison({ schools }) {
  const getFacilityValue = (
    school,
    sectionTitle,
    itemKey
  ) => {
    const item =
      school?.facilities?.[sectionTitle]?.[itemKey];

    if (!item || typeof item !== "object") {
      return {
        available: null,
        description: "",
      };
    }

    return {
      available:
        typeof item.available === "boolean"
          ? item.available
          : null,

      description:
        typeof item.description === "string"
          ? item.description.trim()
          : "",
    };
  };

  const getStatus = (available) => {
    if (available === true) {
      return {
        text: "✓ بله",
        className: "text-green-600",
      };
    }

    if (available === false) {
      return {
        text: "✕ خیر",
        className: "text-red-500",
      };
    }

    return {
      text: "— بدون پاسخ",
      className: "text-gray-400",
    };
  };

  return (
    <div>
      {Object.entries(
        SCHOOL_FEATURE_SECTIONS
      ).map(([sectionTitle, items]) => (
        <div key={sectionTitle}>

          {/* عنوان گروه امکانات */}
          <div
            className="
              border-y
              border-yellow-200
              bg-gradient-to-r
              from-[#f7ecd0]
              via-[#fff8e8]
              to-[#f7ecd0]
              px-5
              py-3
              text-sm
              font-black
              text-[#6f4a18]
            "
          >
            امکانات {sectionTitle}
          </div>

          {/* امکانات این گروه */}
          {items.map((item, rowIndex) => (
            <div
              key={`${sectionTitle}-${item.key}`}
              className={`
                grid
                border-b
                border-yellow-100
                last:border-b-0

                ${
                  rowIndex % 2 === 0
                    ? "bg-white"
                    : "bg-[#fffdf8]"
                }
              `}
              style={{
                gridTemplateColumns: `170px repeat(${schools.length}, minmax(180px, 1fr))`,
              }}
            >

              {/* نام امکان */}
              <div
                className="
                  flex
                  min-h-[70px]
                  items-center
                  border-l
                  border-yellow-100
                  bg-[#faf7ef]
                  px-4
                  py-3
                  text-[11px]
                  font-black
                  leading-6
                  text-[#4b2f17]
                "
              >
                {item.title.replace(
                  "آیا مدرسه ",
                  ""
                )}
              </div>

              {/* مقدار هر مدرسه */}
              {schools.map(
                (school, schoolIndex) => {
                  const facility =
                    getFacilityValue(
                      school,
                      sectionTitle,
                      item.key
                    );

                  const status = getStatus(
                    facility.available
                  );

                  return (
                    <div
                      key={`facility-${
                        school.vendorId ||
                        school.id ||
                        schoolIndex
                      }-${sectionTitle}-${item.key}`}
                      className="
                        flex
                        min-h-[70px]
                        flex-col
                        items-center
                        justify-center
                        border-l
                        border-yellow-100
                        px-3
                        py-3
                        text-center
                      "
                    >
                      <div
                        className={`
                          text-xs
                          font-black
                          ${status.className}
                        `}
                      >
                        {status.text}
                      </div>

                      {facility.description && (
                        <div
                          className="
                            mt-2
                            max-w-[180px]
                            text-[10px]
                            font-medium
                            leading-5
                            text-gray-500
                          "
                        >
                          {facility.description}
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          ))}

          {/* توضیحات کلی این گروه */}
          <div
            className="
              grid
              border-b
              border-yellow-100
              bg-[#fffdf8]
            "
            style={{
              gridTemplateColumns: `170px repeat(${schools.length}, minmax(180px, 1fr))`,
            }}
          >
            <div
              className="
                flex
                min-h-[58px]
                items-center
                border-l
                border-yellow-100
                bg-[#faf7ef]
                px-4
                py-3
                text-[11px]
                font-black
                text-[#4b2f17]
              "
            >
              توضیحات تکمیلی
            </div>

            {schools.map(
              (school, schoolIndex) => {
                const extra =
                  school?.facilities?.[
                    sectionTitle
                  ]?.extra;

                return (
                  <div
                    key={`extra-${
                      school.vendorId ||
                      school.id ||
                      schoolIndex
                    }-${sectionTitle}`}
                    className="
                      flex
                      min-h-[58px]
                      items-center
                      justify-center
                      border-l
                      border-yellow-100
                      px-3
                      py-3
                      text-center
                      text-[10px]
                      font-medium
                      leading-5
                      text-gray-500
                    "
                  >
                    {typeof extra === "string" &&
                    extra.trim()
                      ? extra
                      : "—"}
                  </div>
                );
              }
            )}
          </div>
        </div>
      ))}
    </div>
  );
}