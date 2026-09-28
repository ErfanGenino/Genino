import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useSearchParams,
} from "react-router-dom";

import {
  getVendorPlayhouseProfile,
} from "../services/api";

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


export default function PlayhouseCompareResult() {
  const [searchParams] =
    useSearchParams();

  const [
    playhouses,
    setPlayhouses,
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
    const loadPlayhouses =
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
              .map((id) =>
                id.trim()
              )
              .filter(Boolean);


          if (
            vendorIds.length < 2
          ) {
            setError(
              "برای مقایسه باید حداقل دو خانه بازی انتخاب شده باشد."
            );

            setPlayhouses([]);

            return;
          }


          const results =
            await Promise.all(
              vendorIds.map(
                (vendorId) =>
                  getVendorPlayhouseProfile(
                    vendorId
                  )
              )
            );


          const loadedPlayhouses =
            results
              .map(
                (
                  result,
                  index
                ) => {
                  let playhouse =
                    null;


                  if (
                    result?.profile
                  ) {
                    playhouse =
                      result.profile;

                  } else if (
                    result?.playhouse
                  ) {
                    playhouse =
                      result.playhouse;

                  } else if (
                    result?.data
                      ?.profile
                  ) {
                    playhouse =
                      result.data
                        .profile;

                  } else if (
                    result?.data
                      ?.playhouse
                  ) {
                    playhouse =
                      result.data
                        .playhouse;

                  } else if (
                    result?.data
                  ) {
                    playhouse =
                      result.data;

                  } else {
                    playhouse =
                      result;
                  }


                  if (
                    !playhouse
                  ) {
                    return null;
                  }


                  return {
                    ...playhouse,

                    vendorId:
                      playhouse
                        .vendorId ||
                      playhouse
                        .vendor?.id ||
                      vendorIds[
                        index
                      ],
                  };
                }
              )
              .filter(Boolean);


          setPlayhouses(
            loadedPlayhouses
          );

        } catch (err) {
          console.error(
            "❌ خطا در دریافت خانه‌های بازی برای مقایسه:",
            err
          );

          setError(
            err?.message ||
              "دریافت اطلاعات خانه‌های بازی برای مقایسه انجام نشد."
          );

          setPlayhouses([]);

        } finally {
          setLoading(false);
        }
      };


    loadPlayhouses();

  }, [searchParams]);


    const formatList = (value) => {
    if (!Array.isArray(value)) {
      return "—";
    }

    const items = value
      .map((item) =>
        String(item || "").trim()
      )
      .filter(Boolean);

    return items.length
      ? items.join("، ")
      : "—";
  };


  const formatBoolean = (value) => {
    return value
      ? "✓ دارد"
      : "—";
  };


  const formatWorkingSchedule = (
    value
  ) => {
    if (
      !Array.isArray(value) ||
      value.length === 0
    ) {
      return "—";
    }

    return value
      .map((item) => {
        const days =
          Array.isArray(item?.days)
            ? item.days
                .filter(Boolean)
                .join("، ")
            : "";

        const openingTime =
          item?.openingTime || "";

        const closingTime =
          item?.closingTime || "";

        const time =
          openingTime &&
          closingTime
            ? `${openingTime} تا ${closingTime}`
            : openingTime ||
              closingTime ||
              "";

        if (days && time) {
          return `${days} | ${time}`;
        }

        return days || time;
      })
      .filter(Boolean)
      .join(" / ");
  };


  const comparisonSections = [
    {
      title: "اطلاعات کلی",

      rows: [
        {
          label: "نام خانه بازی",
          getValue: (playhouse) =>
            playhouse?.playhouseName ||
            "—",
        },
        {
          label: "شعار",
          getValue: (playhouse) =>
            playhouse?.slogan ||
            "—",
        },
        {
          label: "سال تأسیس",
          getValue: (playhouse) =>
            playhouse?.foundedYear ||
            "—",
        },
      ],
    },

    {
      title: "موقعیت خانه بازی",

      rows: [
        {
          label: "شهر",
          getValue: (playhouse) =>
            playhouse?.city ||
            "—",
        },
        {
          label: "منطقه",
          getValue: (playhouse) =>
            playhouse?.district ||
            "—",
        },
        {
          label: "آدرس",
          getValue: (playhouse) =>
            playhouse?.address ||
            "—",
        },
      ],
    },

    {
      title: "پذیرش کودکان",

      rows: [
        {
          label: "گروه‌های سنی",
          getValue: (playhouse) =>
            formatList(
              playhouse?.acceptedAges
            ),
        },
        {
          label: "جنسیت پذیرش",
          getValue: (playhouse) =>
            playhouse?.gender ||
            "—",
        },
        {
          label: "ظرفیت پذیرش",
          getValue: (playhouse) =>
            playhouse?.childCapacity ||
            "—",
        },
      ],
    },

    {
      title: "فضا و ساختمان",

      rows: [
        {
          label: "مساحت",
          getValue: (playhouse) =>
            playhouse?.area
              ? `${playhouse.area} متر مربع`
              : "—",
        },
        {
          label: "تعداد اتاق",
          getValue: (playhouse) =>
            playhouse?.roomCount ||
            "—",
        },
      ],
    },

    {
      title: "روزها و ساعات فعالیت",

      rows: [
        {
          label: "برنامه فعالیت",
          getValue: (playhouse) =>
            formatWorkingSchedule(
              playhouse?.workingSchedule
            ),
        },
      ],
    },

    {
      title: "کادر آموزشی",

      rows: [
        {
          label: "تعداد مربیان",
          getValue: (playhouse) =>
            playhouse?.teacherCount ||
            "—",
        },
        {
          label: "سابقه مربیان",
          getValue: (playhouse) =>
            playhouse?.teacherExperience ||
            "—",
        },
      ],
    },

        {
      title: "امکانات خانه بازی",

      rows: PLAYHOUSE_FEATURES.map(
        (feature) => ({
          label: feature,

          getValue: (playhouse) => {
            const facilities =
              Array.isArray(
                playhouse?.facilities
              )
                ? playhouse.facilities
                : [];

            return facilities.includes(
              feature
            )
              ? "✓ دارد"
              : "✕ ندارد";
          },
        })
      ),
    },

    {
      title: "برنامه‌های آموزشی و بازی",

      rows: PROGRAM_OPTIONS.map(
        (program) => ({
          label: program,

          getValue: (playhouse) => {
            const programs =
              Array.isArray(
                playhouse?.educationalPrograms
              )
                ? playhouse.educationalPrograms
                : [];

            return programs.includes(
              program
            )
              ? "✓ دارد"
              : "✕ ندارد";
          },
        })
      ),
    },

    {
      title: "خدمات",

      rows: [
        {
          label: "برنامه غذایی",
          getValue: (playhouse) =>
            formatBoolean(
              playhouse?.hasMealProgram
            ),
        },
        {
          label: "توضیحات برنامه غذایی",
          getValue: (playhouse) =>
            playhouse?.mealDescription ||
            "—",
        },
        {
          label: "سرویس رفت‌وآمد",
          getValue: (playhouse) =>
            formatBoolean(
              playhouse?.hasTransportation
            ),
        },
        {
          label: "توضیحات سرویس رفت‌وآمد",
          getValue: (playhouse) =>
            playhouse
              ?.transportationDescription ||
            "—",
        },
      ],
    },
  ];


  if (loading) {
    return (
      <main
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
            border
            border-yellow-100
            bg-white
            p-8
            text-center
            shadow-sm
          "
        >
          <p
            className="
              text-sm
              font-black
              text-[#6f4a18]
            "
          >
            در حال دریافت اطلاعات خانه‌های بازی...
          </p>
        </div>
      </main>
    );
  }


  if (
    error ||
    playhouses.length < 2
  ) {
    return (
      <main
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
            border
            border-red-100
            bg-white
            p-8
            text-center
            shadow-sm
          "
        >
          <h1
            className="
              text-lg
              font-black
              text-red-700
            "
          >
            مقایسه خانه‌های بازی
          </h1>

          <p
            className="
              mt-3
              text-sm
              leading-7
              text-gray-500
            "
          >
            {error ||
              "اطلاعات کافی برای مقایسه خانه‌های بازی وجود ندارد."}
          </p>

          <Link
            to="/shop?view=compare-services&service=playhouse"
            className="
              mt-6
              inline-flex
              rounded-2xl
              bg-[#7a5526]
              px-5
              py-3
              text-xs
              font-black
              text-white
            "
          >
            بازگشت به انتخاب خانه‌های بازی
          </Link>
        </div>
      </main>
        );
  }


  const comparisonMinWidth =
    170 + playhouses.length * 180;

  const comparisonGridStyle = {
    gridTemplateColumns:
      `170px repeat(${playhouses.length}, minmax(180px, 1fr))`,
  };


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

        <div
          className="
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
            مقایسه خانه‌های بازی
          </h1>

          <p className="mt-2 text-xs leading-6 text-white/80 sm:text-sm">
            مشخصات خانه‌های بازی انتخاب‌شده را کنار یکدیگر بررسی و مقایسه کنید.
          </p>
        </div>
                {/* جدول مقایسه */}
        <div
          className="
            mt-6
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
                minWidth:
                  `${comparisonMinWidth}px`,
              }}
            >

                            {/* سربرگ خانه‌های بازی */}
              <div
                className="grid"
                style={comparisonGridStyle}
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

                {playhouses.map(
                  (playhouse, index) => {
                    const image =
                      playhouse.image ||
                      (
                        Array.isArray(
                          playhouse.headerImages
                        ) &&
                        playhouse.headerImages.length > 0
                          ? typeof playhouse
                              .headerImages[0] ===
                            "string"
                            ? playhouse
                                .headerImages[0]
                            : playhouse
                                .headerImages[0]
                                ?.url
                          : ""
                      );

                    return (
                      <div
                        key={
                          playhouse.vendorId ||
                          playhouse.id ||
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
                              playhouse.playhouseName ||
                              "خانه بازی"
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
                            🎮
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
                          {playhouse.playhouseName ||
                            `خانه بازی ${index + 1}`}
                        </div>

                        {playhouse.slogan && (
                          <div
                            className="
                              mt-1
                              line-clamp-2
                              text-[10px]
                              leading-5
                              text-gray-500
                            "
                          >
                            {playhouse.slogan}
                          </div>
                        )}

                        {playhouse.vendorId && (
                          <Link
                            to={`/vendor/service/playhouse/${playhouse.vendorId}?view=public`}
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
                            مشاهده خانه بازی
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
    const values = playhouses.map((playhouse) =>
      row.getValue(playhouse)
    );

    const isBooleanRow = values.some(
      (value) =>
        value === "✓ دارد" ||
        value === "✕ ندارد"
    );

    if (!isBooleanRow) {
      return true;
    }

    const allNegative = values.every(
      (value) => value === "✕ ندارد"
    );

    return !allNegative;
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
                          style={comparisonGridStyle}
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

                          {/* مقدار هر خانه بازی */}
                          {playhouses.map(
                            (
                              playhouse,
                              playhouseIndex
                            ) => {
                              const value =
                                row.getValue(
                                  playhouse
                                );

                              return (
                                <div
                                  key={`${ 
                                    playhouse.vendorId ||
                                    playhouse.id ||
                                    playhouseIndex
                                  }-${row.label}`}
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
                      comparisonSections.length -
                        1 && (
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


   