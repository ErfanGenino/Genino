// D:\projects\Genino\genino-web\src\pages\ArtClassCompareResult.jsx

import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getVendorArtClassProfile } from "../services/api";


function formatArray(value) {
  if (!Array.isArray(value) || value.length === 0) {
    return "—";
  }

  return value.join("، ");
}

function formatBoolean(value) {
  if (value === true) return "✓ دارد";
  if (value === false) return "✕ ندارد";

  return "—";
}

function formatWorkingSchedule(schedule) {
  if (!Array.isArray(schedule) || schedule.length === 0) {
    return "—";
  }

  return schedule
    .map((item) => {
      const days =
        Array.isArray(item?.days) && item.days.length > 0
          ? item.days.join("، ")
          : "روز مشخص نشده";

      const openingTime =
        item?.openingTime || "—";

      const closingTime =
        item?.closingTime || "—";

      return `${days}: ${openingTime} تا ${closingTime}`;
    })
    .join(" | ");
}

const ART_FIELDS = [
  "نقاشی",
  "طراحی",
  "سیاه‌قلم",
  "آبرنگ",
  "گواش",
  "رنگ روغن",
  "اکریلیک",
  "طراحی چهره",
  "طراحی شخصیت",
  "تصویرسازی",
  "کاریکاتور",
  "خوشنویسی",
  "نستعلیق",
  "شکسته نستعلیق",
  "تذهیب",
  "نگارگری ایرانی",
  "مینیاتور",
];

const ART_FIELDS2 = [
  "موسیقی کودک",
  "ارف کودک",
  "تئوری موسیقی",
  "نت‌خوانی و سلفژ",
  "آهنگسازی",
  "تنظیم موسیقی",
  "آواز",
  "خوانندگی",
  "پیانو",
  "کیبورد",
  "گیتار",
  "گیتار الکتریک",
  "ویولن",
  "ویولا",
  "ویولنسل",
  "دف",
  "تنبک",
  "سنتور",
  "تار",
  "سه‌تار",
  "نی",
  "کمانچه",
  "عود",
  "قانون",
  "درامز",
  "فلوت",
  "ساکسیفون",
  "کلارینت",
];

const ART_FIELDS3 = [
  "تئاتر کودک",
  "تئاتر نوجوان",
  "بازیگری",
  "بازیگری سینما",
  "بازیگری تئاتر",
  "بداهه‌پردازی",
  "گویندگی",
  "دوبله",
  "فن بیان",
  "سخنوری",
  "مجری‌گری",
  "استندآپ کودک",
  "استندآپ کمدی",
  "نمایش خلاق",
  "قصه‌گویی",
  "نمایش عروسکی",
  "پانتومیم",
  "حرکت و بیان بدن",
  "آمادگی ورود به هنرستان‌های نمایشی",
];

const ART_FIELDS4 = [
  "کاردستی",
  "خلاقیت کودک",
  "اوریگامی",
  "کاغذ و تا",
  "ماکت‌سازی",
  "ساخت عروسک",
  "سفالگری",
  "سرامیک",
  "مجسمه‌سازی",
  "رزین",
  "شمع‌سازی",
  "صابون‌سازی",
  "ساخت زیورآلات",
  "چرم‌دوزی",
  "معرق",
  "منبت‌کاری",
  "کلاژ و حجم‌سازی",
  "بازیافت خلاق",
  "DIY و ساختنی",
];



const COURSE_LEVELS = [
  "مقدماتی",
  "متوسط",
  "پیشرفته",
  "همه سطوح",
];


const FACILITY_OPTIONS = [
  "آتلیه نقاشی",
  "کارگاه هنری",
  "کارگاه سفال",
  "اتاق موسیقی",
  "سالن تمرین",
  "سالن نمایش",
  "استودیو",
  "پیانو",
  "سازهای آموزشی",
  "میز نور",
  "سه‌پایه نقاشی",
  "تجهیزات طراحی",
  "تجهیزات سفالگری",
  "تجهیزات عکاسی",
  "ویدئو پروژکتور",
  "تلویزیون هوشمند",
  "اینترنت",
  "کتابخانه هنری",
  "فضای نمایش آثار",
  "فضای انتظار والدین",
  "سیستم سرمایش و گرمایش",
  "پارکینگ",
  "دوربین نظارتی",
  "آسانسور",
];

const TEACHING_METHODS = [
  "حضوری",
  "آنلاین",
  "خصوصی",
  "گروهی",
  "کارگاهی",
  "پروژه‌محور",
  "بازی‌محور",
  "تمرین عملی",
];

export default function ArtClassCompareResult() {
  const [searchParams] = useSearchParams();

  const [artClasses, setArtClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const ids = useMemo(() => {
    return (searchParams.get("ids") || "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);
  }, [searchParams]);

  useEffect(() => {
    if (ids.length < 2) {
  setError(
    "برای مقایسه تخصصی، حداقل دو کلاس هنری باید انتخاب شود."
  );
  setLoading(false);
  return;
}

    let cancelled = false;

async function loadArtClasses() {
  try {
    setLoading(true);
    setError("");

    const results = await Promise.all(
  ids.map((vendorId) =>
    getVendorArtClassProfile(vendorId)
  )
);

    if (cancelled) return;

    const normalized = results.map(
      (result, index) => {
        const profile =
  result?.profile ||
  result?.artClass ||
  result?.data?.profile ||
  result?.data?.artClass ||
  result?.data ||
  result;

        return {
          ...(profile || {}),
          vendorId:
            profile?.vendorId ||
            result?.vendorId ||
            ids[index],
        };
      }
    );

    setArtClasses(normalized);
  } catch (err) {
    console.error(
  "LOAD ART CLASS COMPARE ERROR:",
  err
);

if (!cancelled) {
  setError(
    "دریافت اطلاعات کلاس‌های هنری برای مقایسه انجام نشد."
  );
}
  } finally {
    if (!cancelled) {
      setLoading(false);
    }
  }
}

loadArtClasses();

return () => {
  cancelled = true;
};
  }, [ids]);


    const comparisonSections = [
    {
      title: "اطلاعات کلی",
      rows: [
        {
          label: "نام مجموعه هنری",
          getValue: (item) =>
            item?.centerName || "—",
        },
        {
          label: "شعار",
          getValue: (item) =>
            item?.slogan || "—",
        },
        {
          label: "شهر",
          getValue: (item) =>
            item?.city || "—",
        },
        {
          label: "منطقه",
          getValue: (item) =>
            item?.district || "—",
        },
        {
          label: "آدرس",
          getValue: (item) =>
            item?.address || "—",
        },
        {
          label: "سال تأسیس",
          getValue: (item) =>
            item?.foundedYear || "—",
        },
      ],
    },

    {
  title: "هنرهای تجسمی",
  rows: ART_FIELDS.map((field) => ({
    label: field,
    getValue: (item) =>
      Array.isArray(item?.artFields) &&
      item.artFields.includes(field)
        ? "✓ دارد"
        : "✕ ندارد",
  })),
},

    {
  title: "موسیقی",
  rows: ART_FIELDS2.map((field) => ({
    label: field,
    getValue: (item) =>
      Array.isArray(item?.artFields) &&
      item.artFields.includes(field)
        ? "✓ دارد"
        : "✕ ندارد",
  })),
},

    {
  title: "هنرهای نمایشی",
  rows: ART_FIELDS3.map((field) => ({
    label: field,
    getValue: (item) =>
      Array.isArray(item?.artFields) &&
      item.artFields.includes(field)
        ? "✓ دارد"
        : "✕ ندارد",
  })),
},

    {
  title: "هنر دستی و خلاقیت",
  rows: ART_FIELDS4.map((field) => ({
    label: field,
    getValue: (item) =>
      Array.isArray(item?.artFields) &&
      item.artFields.includes(field)
        ? "✓ دارد"
        : "✕ ندارد",
  })),
},


    {
      title: "سطح دوره‌ها",
      rows: COURSE_LEVELS.map((level) => ({
        label: level,
        getValue: (item) =>
          Array.isArray(item?.courseLevels) &&
          item.courseLevels.includes(level)
            ? "✓ دارد"
            : "✕ ندارد",
      })),
    },

    {
      title: "شیوه‌های تدریس",
      rows: TEACHING_METHODS.map((method) => ({
        label: method,
        getValue: (item) =>
          Array.isArray(item?.teachingMethods) &&
          item.teachingMethods.includes(method)
            ? "✓ دارد"
            : "✕ ندارد",
      })),
    },

    {
      title: "روزها و ساعات فعالیت",
      rows: [
        {
          label: "برنامه فعالیت",
          getValue: (item) =>
            formatWorkingSchedule(
              item?.workingSchedule
            ),
        },
      ],
    },

    {
      title: "فضا و ظرفیت",
      rows: [
        {
          label: "ظرفیت هنرجویان",
          getValue: (item) =>
            item?.studentCapacity || "—",
        },
        {
          label: "مساحت",
          getValue: (item) =>
            item?.area
              ? `${item.area} متر مربع`
              : "—",
        },
        {
          label: "تعداد کلاس‌ها",
          getValue: (item) =>
            item?.classroomCount || "—",
        },
      ],
    },

    {
      title: "امکانات مجموعه هنری",
      rows: FACILITY_OPTIONS.map((facility) => ({
        label: facility,
        getValue: (item) =>
          Array.isArray(item?.facilities) &&
          item.facilities.includes(facility)
            ? "✓ دارد"
            : "✕ ندارد",
      })),
    },

    {
      title: "کلاس آنلاین",
      rows: [
        {
          label: "برگزاری کلاس آنلاین",
          getValue: (item) =>
            formatBoolean(item?.hasOnlineClasses),
        },
        {
          label: "توضیحات کلاس آنلاین",
          getValue: (item) =>
            item?.onlineDescription || "—",
        },
      ],
    },

    {
  title: "نمایشگاه آثار",
  rows: [
    {
      label: "برگزاری نمایشگاه آثار",
      getValue: (item) =>
        formatBoolean(item?.hasExhibition),
    },
    {
      label: "توضیحات نمایشگاه",
      getValue: (item) =>
        item?.exhibitionDescription || "—",
    },
  ],
},

    {
      title: "گواهی پایان دوره",
      rows: [
        {
          label: "صدور گواهی",
          getValue: (item) =>
            formatBoolean(item?.hasCertificate),
        },
        {
          label: "توضیحات گواهی",
          getValue: (item) =>
            item?.certificateDescription || "—",
        },
      ],
    },

    {
  title: "لوازم و مواد هنری",
  rows: [
    {
      label: "تأمین لوازم و مواد هنری",
      getValue: (item) =>
        formatBoolean(item?.providesArtMaterials),
    },
    {
      label: "توضیحات لوازم و مواد هنری",
      getValue: (item) =>
        item?.artMaterialsDescription || "—",
    },
  ],
},

    {
      title: "سرویس رفت‌وآمد",
      rows: [
        {
          label: "سرویس رفت‌وآمد",
          getValue: (item) =>
            formatBoolean(item?.hasTransportation),
        },
        {
          label: "توضیحات سرویس",
          getValue: (item) =>
            item?.transportationDescription || "—",
        },
      ],
    },

    {
      title: "کادر آموزشی",
      rows: [
        {
          label: "تعداد مدرس‌ها",
          getValue: (item) =>
            item?.teacherCount || "—",
        },
        {
          label: "سابقه مدرس‌ها",
          getValue: (item) =>
            item?.teacherExperience || "—",
        },
      ],
    },
  ];


  if (loading) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-[#faf7ef] px-3 py-6 sm:px-4 sm:py-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-yellow-200 bg-white p-8 text-center shadow-sm">
            <div className="text-sm font-black text-[#6f4a18]">
              در حال آماده‌سازی مقایسه تخصصی...
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-[#faf7ef] px-3 py-6 sm:px-4 sm:py-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <div className="text-sm font-black text-red-600">
              {error}
            </div>

            <Link
              to="/shop?view=compare-services&service=art-class"
              className="
                mt-5 inline-flex items-center justify-center
                rounded-xl
                bg-gradient-to-r
                from-[#7a5526]
                via-[#b88724]
                to-[#d4af37]
                px-5 py-2.5
                text-xs font-black text-white
                transition
                hover:scale-[1.02]
              "
            >
             بازگشت به انتخاب کلاس‌های هنری
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#faf7ef] px-3 py-6 sm:px-4 sm:py-10"
    >
      <div className="mx-auto max-w-7xl">

        {/* هدر صفحه */}
        <section
          className="
            mb-6
            overflow-hidden
            rounded-3xl
            bg-gradient-to-r
            from-[#4b2f17]
            via-[#7a5526]
            to-[#b88724]
            px-5 py-7
            text-white
            shadow-lg
            sm:px-8
          "
        >
          <div className="text-xs font-bold text-yellow-100">
  مقایسه خدمات هنری ژنینو
</div>

<h1 className="mt-2 text-xl font-black sm:text-2xl">
  مقایسه تخصصی کلاس‌های هنری
</h1>

<p className="mt-2 max-w-3xl text-xs leading-6 text-yellow-50 sm:text-sm">
  کلاس‌های هنری انتخاب‌شده را از نظر رشته‌های هنری،
  سطح دوره‌ها، شیوه تدریس، امکانات، برنامه فعالیت و خدمات
  جانبی با یکدیگر مقایسه کنید.
</p>
        </section>

               {/* جدول مقایسه */}
        <div
          className="
            overflow-hidden
            rounded-3xl
            border
            border-yellow-200
            bg-white
            shadow-sm
          "
        >
          <div className="overflow-x-auto">
            <div
              style={{
                minWidth: `${
                  170 +
                  artClasses.length * 180
                }px`,
              }}
            >
              {/* سربرگ کلاس‌های هنری */}
              <div
                className="grid"
                style={{
                  gridTemplateColumns: `170px repeat(${artClasses.length}, minmax(180px, 1fr))`,
                }}
              >
                <div
                  className="
                    flex
                    min-h-[210px]
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

                {artClasses.map((item) => {
                  const firstImage =
                    Array.isArray(item?.headerImages) &&
                    item.headerImages.length > 0
                      ? item.headerImages[0]
                      : null;

                  const imageUrl =
                    typeof firstImage === "string"
                      ? firstImage
                      : firstImage?.url || "";

                  return (
                    <div
                      key={item.vendorId}
                      className="
                        min-h-[210px]
                        border-b
                        border-l
                        border-yellow-100
                        bg-[#fffdf8]
                        p-3
                        text-center
                      "
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={
                            item?.centerName ||
                            "مجموعه هنری"
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
                          🎨
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
                        {item?.centerName ||
                          "مجموعه هنری"}
                      </div>

                      {item?.slogan && (
                        <div
                          className="
                            mt-1
                            line-clamp-2
                            text-[10px]
                            leading-5
                            text-gray-500
                          "
                        >
                          {item.slogan}
                        </div>
                      )}

                      <Link
                        to={`/vendor/service/art-class/${item.vendorId}?view=public`}
                        className="
                          mt-3
                          inline-flex
                          items-center
                          justify-center
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
                        مشاهده مجموعه
                      </Link>
                    </div>
                  );
                })}
              </div>
                            {/* بخش‌های مقایسه */}
              {comparisonSections.map(
                (section, sectionIndex) => (
                  <div
                    key={section.title}
                  >
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

                    {/* ردیف‌های بخش */}
                    {section.rows
  .filter((row) => {
    const values = artClasses.map((item) =>
      row.getValue(item)
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
                          key={`${section.title}-${row.label}`}
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
                            gridTemplateColumns: `170px repeat(${artClasses.length}, minmax(180px, 1fr))`,
                          }}
                        >
                          {/* عنوان مشخصه */}
                          <div
                            className="
                              border-l
                              border-yellow-100
                              px-4
                              py-4
                              text-[11px]
                              font-black
                              leading-6
                              text-[#4b2f17]
                            "
                          >
                            {row.label}
                          </div>

                          {/* مقدار هر مجموعه */}
                          {artClasses.map(
                            (item, itemIndex) => {
                              const value =
                                row.getValue(item);

                              const isPositive =
                                value === "✓ دارد";

                              const isNegative =
                                value === "✕ ندارد";

                              return (
                                <div
                                  key={`${item.vendorId}-${row.label}-${itemIndex}`}
                                  className="
                                    border-l
                                    border-yellow-100
                                    px-3
                                    py-4
                                    text-[11px]
                                    font-bold
                                    leading-6
                                    text-gray-700
                                    last:border-l-0
                                  "
                                >
                                  <span
                                    className={
                                      isPositive
                                        ? "font-black text-emerald-600"
                                        : isNegative
                                        ? "font-black text-red-500"
                                        : ""
                                    }
                                  >
                                    {value ?? "—"}
                                  </span>
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