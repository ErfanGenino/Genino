import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useSearchParams,
} from "react-router-dom";

import {
  getVendorKindergartenProfile,
} from "../services/api";

import {
  KINDERGARTEN_FEATURE_SECTIONS,
} from "./vendor/service/components/KindergartenFeatureSection";


export default function KindergartenCompareResult() {

  const [searchParams] =
    useSearchParams();

  const [
    kindergartens,
    setKindergartens,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");


  useEffect(() => {

    const loadKindergartens =
      async () => {

        try {

          setLoading(true);
          setError("");


          const idsParam =
            searchParams.get("ids") ||
            "";


          const vendorIds =
            idsParam
              .split(",")
              .map(
                (id) =>
                  id.trim()
              )
              .filter(Boolean);


          if (
            vendorIds.length < 2
          ) {

            setError(
              "برای مقایسه باید حداقل دو مهدکودک انتخاب شده باشد."
            );

            setKindergartens([]);

            return;
          }


          const results =
            await Promise.all(
              vendorIds.map(
                (vendorId) =>
                  getVendorKindergartenProfile(
                    vendorId
                  )
              )
            );


          const loadedKindergartens =
            results
              .map(
                (
                  result,
                  index
                ) => {

                  let kindergarten =
                    null;


                  if (
                    result?.profile
                  ) {

                    kindergarten =
                      result.profile;

                  } else if (
                    result?.kindergarten
                  ) {

                    kindergarten =
                      result.kindergarten;

                  } else if (
                    result?.data
                      ?.profile
                  ) {

                    kindergarten =
                      result.data
                        .profile;

                  } else if (
                    result?.data
                      ?.kindergarten
                  ) {

                    kindergarten =
                      result.data
                        .kindergarten;

                  } else if (
                    result?.data
                  ) {

                    kindergarten =
                      result.data;

                  } else {

                    kindergarten =
                      result;

                  }


                  if (
                    !kindergarten
                  ) {
                    return null;
                  }


                  return {
                    ...kindergarten,

                    vendorId:
                      kindergarten
                        .vendorId ||
                      kindergarten
                        .vendor?.id ||
                      vendorIds[
                        index
                      ],
                  };
                }
              )
              .filter(Boolean);


          setKindergartens(
            loadedKindergartens
          );

        } catch (err) {

          console.error(
            "❌ خطا در دریافت مهدکودک‌ها برای مقایسه:",
            err
          );


          setError(
            err?.message ||
              "دریافت اطلاعات مهدکودک‌ها برای مقایسه انجام نشد."
          );


          setKindergartens([]);

        } finally {

          setLoading(false);

        }
      };


    loadKindergartens();

  }, [searchParams]);

    const comparisonSections = useMemo(
    () => [
      {
        title: "اطلاعات کلی",
        rows: [
          {
            label: "نام مهدکودک",
            getValue: (kindergarten) =>
              kindergarten.kindergartenName ||
              "—",
          },
          {
            label: "شعار",
            getValue: (kindergarten) =>
              kindergarten.slogan ||
              "—",
          },
          {
            label: "شهر",
            getValue: (kindergarten) =>
              kindergarten.city ||
              "—",
          },
          {
            label: "منطقه",
            getValue: (kindergarten) =>
              kindergarten.district ||
              "—",
          },
          {
            label: "آدرس",
            getValue: (kindergarten) =>
              kindergarten.address ||
              "—",
          },
          {
            label: "سال تأسیس",
            getValue: (kindergarten) =>
              kindergarten.foundedYear ||
              "—",
          },
        ],
      },

      {
        title: "پذیرش کودکان",
        rows: [
          {
            label: "گروه‌های سنی پذیرش",
            getValue: (kindergarten) =>
              Array.isArray(
                kindergarten.acceptedAges
              ) &&
              kindergarten.acceptedAges
                .length > 0
                ? kindergarten.acceptedAges.join(
                    "، "
                  )
                : "—",
          },
          {
            label: "جنسیت پذیرش",
            getValue: (kindergarten) =>
              kindergarten.gender ||
              "—",
          },
          {
            label: "نوع مهدکودک",
            getValue: (kindergarten) =>
              Array.isArray(
                kindergarten.kindergartenTypes
              ) &&
              kindergarten.kindergartenTypes
                .length > 0
                ? kindergarten.kindergartenTypes.join(
                    "، "
                  )
                : "—",
          },
          {
            label: "ظرفیت پذیرش",
            getValue: (kindergarten) =>
              kindergarten.childCapacity
                ? `${kindergarten.childCapacity} کودک`
                : "—",
          },
        ],
      },

      {
        title: "فضا و ساختمان",
        rows: [
          {
            label: "مساحت",
            getValue: (kindergarten) =>
              kindergarten.area
                ? `${kindergarten.area} متر مربع`
                : "—",
          },
          {
            label: "تعداد اتاق",
            getValue: (kindergarten) =>
              kindergarten.roomCount ||
              "—",
          },
        ],
      },

      {
  title: "روزها و ساعات فعالیت",
  rows: [
    {
      label: "برنامه فعالیت",
      getValue: (kindergarten) => {
        const schedules =
          Array.isArray(kindergarten.workingSchedule)
            ? kindergarten.workingSchedule
            : [];

        if (schedules.length === 0) {
          return "—";
        }

        return (
          <div className="space-y-2">
            {schedules.map((schedule, index) => {
              const days =
                Array.isArray(schedule.days) &&
                schedule.days.length > 0
                  ? schedule.days.join("، ")
                  : "—";

              const openingTime =
                schedule.openingTime || "—";

              const closingTime =
                schedule.closingTime || "—";

              return (
                <div
                  key={index}
                  className="
                    rounded-xl
                    bg-[#faf7ef]
                    px-3
                    py-2
                    text-center
                  "
                >
                  <div
                    className="
                      text-[11px]
                      font-black
                      leading-6
                      text-[#6f4a18]
                    "
                  >
                    {days}
                  </div>

                  <div
                    className="
                      mt-1
                      text-[10px]
                      font-bold
                      text-gray-500
                    "
                  >
                    {openingTime} تا {closingTime}
                  </div>
                </div>
              );
            })}
          </div>
        );
      },
    },
  ],
},

      {
        title: "کادر آموزشی",
        rows: [
          {
            label: "تعداد مربیان",
            getValue: (kindergarten) =>
              kindergarten.teacherCount ||
              "—",
          },
          {
            label: "سابقه مربیان",
            getValue: (kindergarten) =>
              kindergarten.teacherExperience ||
              "—",
          },
        ],
      },

      {
        title: "خدمات",
        rows: [
          {
            label: "برنامه غذایی",
            getValue: (kindergarten) =>
              kindergarten.hasMealProgram
                ? "دارد"
                : "ندارد",
          },
          {
            label: "توضیحات برنامه غذایی",
            getValue: (kindergarten) =>
              kindergarten.hasMealProgram
                ? kindergarten.mealDescription ||
                  "—"
                : "—",
          },
          {
            label: "سرویس رفت‌وآمد",
            getValue: (kindergarten) =>
              kindergarten.hasTransportation
                ? "دارد"
                : "ندارد",
          },
          {
            label: "توضیحات سرویس رفت‌وآمد",
            getValue: (kindergarten) =>
              kindergarten.hasTransportation
                ? kindergarten.transportationDescription ||
                  "—"
                : "—",
          },
        ],
      },
      ...KINDERGARTEN_FEATURE_SECTIONS.map(
  (featureSection) => ({
    title: featureSection.title,

    rows: [
      ...featureSection.items.map(
        (featureItem) => ({
          label: featureItem,

          getValue: (kindergarten) => {
            const facilities =
              kindergarten?.facilities &&
              typeof kindergarten.facilities ===
                "object"
                ? kindergarten.facilities
                : {};

            const sectionValue =
              facilities[featureSection.key] || {};

            const selectedItems =
              Array.isArray(sectionValue.items)
                ? sectionValue.items
                : [];

            const isSelected =
              selectedItems.includes(featureItem);

            return isSelected ? "✓ دارد" : "—";
          },
        })
      ),

      {
        label: "سایر موارد",

        getValue: (kindergarten) => {
          const facilities =
            kindergarten?.facilities &&
            typeof kindergarten.facilities ===
              "object"
              ? kindergarten.facilities
              : {};

          const sectionValue =
            facilities[featureSection.key] || {};

          const other =
            typeof sectionValue.other === "string"
              ? sectionValue.other.trim()
              : "";

          return other || "—";
        },
      },
    ],
  })
),
    ],
    []
  );


  if (loading) {

    return (
      <div
        dir="rtl"
        className="
          min-h-screen
          bg-[#faf7ef]
          px-4
          py-10
        "
      >
        <div
          className="
            mx-auto
            max-w-7xl
            rounded-3xl
            bg-white
            p-8
            text-center
            font-bold
            text-gray-500
            shadow-sm
          "
        >
          در حال دریافت اطلاعات مهدکودک‌ها...
        </div>
      </div>
    );
  }


  if (error) {
    return (
      <div
        dir="rtl"
        className="
          min-h-screen
          bg-[#faf7ef]
          px-4
          py-10
        "
      >
        <div
          className="
            mx-auto
            max-w-3xl
            rounded-3xl
            bg-white
            p-8
            text-center
            shadow-sm
          "
        >
          <p
            className="
              font-bold
              text-red-500
            "
          >
            {error}
          </p>

          <Link
            to="/shop"
            className="
              mt-5
              inline-flex
              rounded-xl
              bg-[#6f4a18]
              px-5
              py-3
              text-sm
              font-black
              text-white
            "
          >
            بازگشت به فروشگاه
          </Link>
        </div>
      </div>
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
            مقایسه مهدکودک‌ها
          </h1>

          <p className="mt-2 text-xs leading-6 text-white/80 sm:text-sm">
            مشخصات مهدکودک‌های انتخاب‌شده را کنار یکدیگر
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
                  170 + kindergartens.length * 180
                }px`,
              }}
            >

              {/* سربرگ مهدکودک‌ها */}
              <div
                className="grid"
                style={{
                  gridTemplateColumns: `170px repeat(${kindergartens.length}, minmax(180px, 1fr))`,
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

                {kindergartens.map(
                  (kindergarten, index) => {
                    const image =
                      kindergarten.image ||
                      (
                        Array.isArray(
                          kindergarten.headerImages
                        ) &&
                        kindergarten.headerImages.length > 0
                          ? typeof kindergarten.headerImages[0] ===
                            "string"
                            ? kindergarten.headerImages[0]
                            : kindergarten.headerImages[0]?.url
                          : ""
                      );

                    return (
                      <div
                        key={
                          kindergarten.vendorId ||
                          kindergarten.id ||
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
                              kindergarten.kindergartenName ||
                              "مهدکودک"
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
                            🧸
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
                          {kindergarten.kindergartenName ||
                            `مهدکودک ${index + 1}`}
                        </div>

                        {kindergarten.slogan && (
                          <div
                            className="
                              mt-1
                              line-clamp-2
                              text-[10px]
                              leading-5
                              text-gray-500
                            "
                          >
                            {kindergarten.slogan}
                          </div>
                        )}

                        {kindergarten.vendorId && (
                          <Link
                            to={`/vendor/service/kindergarten/${kindergarten.vendorId}`}
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
                            مشاهده مهدکودک
                          </Link>
                        )}
                      </div>
                    );
                  }
                )}
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


                    {section.rows
  .filter((row) => {
    const values = kindergartens.map((kindergarten) =>
      row.getValue(kindergarten)
    );

    const hasPositive = values.some(
      (value) =>
        value === "✓ دارد" ||
        value === "دارد"
    );

    const isBooleanRow = values.every(
      (value) =>
        value === "✓ دارد" ||
        value === "✕ ندارد" ||
        value === "دارد" ||
        value === "ندارد" ||
        value === "—"
    );

    if (!isBooleanRow) {
      return true;
    }

    return hasPositive;
  })
  .map(
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
                            gridTemplateColumns: `170px repeat(${kindergartens.length}, minmax(180px, 1fr))`,
                          }}
                        >
                          {/* عنوان مشخصه */}
                          <div
                            className="
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
                            "
                          >
                            {row.label}
                          </div>


                          {/* مقدار هر مهدکودک */}
                          {kindergartens.map(
                            (
                              kindergarten,
                              kindergartenIndex
                            ) => {
                              const value =
                                row.getValue(
                                  kindergarten
                                );

                              return (
                                <div
                                  key={`${kindergarten.vendorId ||
                                    kindergarten.id ||
                                    kindergartenIndex}-${row.label}`}
                                  className="
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
                                  "
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

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}