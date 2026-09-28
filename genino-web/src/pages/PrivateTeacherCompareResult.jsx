// D:\projects\Genino\genino-web\src\pages\PrivateTeacherCompareResult.jsx

import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getVendorPrivateTeacherProfile } from "../services/api";


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

const TEACHING_FIELDS = [
  "ریاضی",
  "علوم",
  "فیزیک",
  "شیمی",
  "زیست‌شناسی",
  "ادبیات فارسی",
  "نگارش",
  "عربی",
  "دین و زندگی",
  "تاریخ",
  "جغرافیا",
  "مطالعات اجتماعی",
  "فلسفه و منطق",
  "اقتصاد",
  "حسابداری",
  "آمار و احتمال",
  "آمادگی کنکور",
  "تقویتی و رفع اشکال",
];

const TEACHING_FIELDS2 = [
  "زبان انگلیسی",
  "زبان آلمانی",
  "زبان فرانسه",
  "زبان عربی",
  "زبان ترکی استانبولی",
  "زبان اسپانیایی",
  "زبان ایتالیایی",
  "زبان روسی",
  "زبان چینی",
  "زبان کره‌ای",
  "زبان ژاپنی",
  "آیلتس",
  "تافل",
  "مکالمه زبان",
  "زبان‌ها و گویش‌های بومی ایران",
];

const TEACHING_FIELDS3 = [
  "نقاشی",
  "طراحی",
  "سیاه‌قلم",
  "خوشنویسی",
  "نگارگری",
  "موسیقی",
  "پیانو",
  "گیتار",
  "ویولن",
  "آواز",
  "بازیگری",
  "گویندگی",
  "دوبله",
  "فن بیان هنری",
  "عکاسی",
  "فیلم‌سازی",
];

const TEACHING_FIELDS4 = [
  "شنا",
  "فوتبال",
  "فوتسال",
  "بسکتبال",
  "والیبال",
  "تنیس",
  "پدل",
  "بدمینتون",
  "تنیس روی میز",
  "ژیمناستیک",
  "دو و میدانی",
  "شطرنج",
  "بدنسازی",
  "فیتنس",
  "یوگا",
  "پیلاتس",
  "کاراته",
  "تکواندو",
  "جودو",
];

const TEACHING_FIELDS5 = [
  "برنامه‌نویسی",
  "طراحی سایت",
  "ساخت اپلیکیشن",
  "طراحی بازی",
  "رباتیک",
  "هوش مصنوعی",
  "علوم داده",
  "امنیت سایبری",
  "ICDL",
  "نرم‌افزارهای اداری",
  "اکسل",
  "فتوشاپ",
  "طراحی گرافیک",
  "تولید محتوا",
  "دیجیتال مارکتینگ",
  "فن بیان",
  "مهارت‌های زندگی",
  "مدیریت زمان",
];

const TEACHING_FIELDS6 = [
  "کنکور",
  "تیزهوشان",
  "نمونه دولتی",
  "آیلتس",
  "تافل",
  "آزمون‌های بین‌المللی",
  "آمادگی مصاحبه",
];

const EDUCATION_LEVELS = [
  "پیش‌دبستانی",
  "ابتدایی",
  "متوسطه اول",
  "متوسطه دوم",
  "کنکور",
  "دانشگاهی",
];

const TEACHING_METHODS = [
  "حضوری در محل معلم",
  "حضوری در منزل هنرجو",
  "آنلاین",
  "خصوصی",
  "نیمه‌خصوصی",
  "گروهی",
  "حل تمرین",
  "رفع اشکال",
  "آموزش مفهومی",
  "آمادگی آزمون",
];

export default function PrivateTeacherCompareResult() {
  const [searchParams] = useSearchParams();

  const [privateTeachers, setPrivateTeachers] = useState([]);
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
    "برای مقایسه تخصصی، حداقل دو معلم خصوصی باید انتخاب شود."
  );
  setLoading(false);
  return;
}

    let cancelled = false;

async function loadPrivateTeachers() {
  try {
    setLoading(true);
    setError("");

    const results = await Promise.all(
  ids.map((vendorId) =>
    getVendorPrivateTeacherProfile(vendorId)
  )
);

    if (cancelled) return;

    const normalized = results.map(
      (result, index) => {
       const profile =
  result?.profile ||
  result?.privateTeacher ||
  result?.data?.profile ||
  result?.data?.privateTeacher ||
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

    setPrivateTeachers(normalized);
  } catch (err) {
   console.error(
  "LOAD PRIVATE TEACHER COMPARE ERROR:",
  err
);

if (!cancelled) {
  setError(
    "دریافت اطلاعات معلمان خصوصی برای مقایسه انجام نشد."
  );
}
  } finally {
    if (!cancelled) {
      setLoading(false);
    }
  }
}

loadPrivateTeachers();

return () => {
  cancelled = true;
};
  }, [ids]);


    const comparisonSections = [
  {
    title: "اطلاعات کلی",
    rows: [
      {
        label: "نام معلم",
        getValue: (item) =>
          item?.fullName || "—",
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
        label: "گروه سنی",
        getValue: (item) =>
          formatArray(item?.acceptedAges),
      },
      {
        label: "جنسیت",
        getValue: (item) =>
          item?.gender || "—",
      },
    ],
  },

  {
    title: "دروس مدرسه",
    rows: TEACHING_FIELDS.map((field) => ({
      label: field,
      getValue: (item) =>
        Array.isArray(item?.teachingFields) &&
        item.teachingFields.includes(field)
          ? "✓ دارد"
          : "✕ ندارد",
    })),
  },

  {
    title: "زبان‌ها",
    rows: TEACHING_FIELDS2.map((field) => ({
      label: field,
      getValue: (item) =>
        Array.isArray(item?.teachingFields) &&
        item.teachingFields.includes(field)
          ? "✓ دارد"
          : "✕ ندارد",
    })),
  },

  {
    title: "هنر",
    rows: TEACHING_FIELDS3.map((field) => ({
      label: field,
      getValue: (item) =>
        Array.isArray(item?.teachingFields) &&
        item.teachingFields.includes(field)
          ? "✓ دارد"
          : "✕ ندارد",
    })),
  },

  {
    title: "ورزش",
    rows: TEACHING_FIELDS4.map((field) => ({
      label: field,
      getValue: (item) =>
        Array.isArray(item?.teachingFields) &&
        item.teachingFields.includes(field)
          ? "✓ دارد"
          : "✕ ندارد",
    })),
  },

  {
    title: "مهارت‌های تخصصی",
    rows: TEACHING_FIELDS5.map((field) => ({
      label: field,
      getValue: (item) =>
        Array.isArray(item?.teachingFields) &&
        item.teachingFields.includes(field)
          ? "✓ دارد"
          : "✕ ندارد",
    })),
  },

  {
    title: "آزمون‌ها و مهاجرت",
    rows: TEACHING_FIELDS6.map((field) => ({
      label: field,
      getValue: (item) =>
        Array.isArray(item?.teachingFields) &&
        item.teachingFields.includes(field)
          ? "✓ دارد"
          : "✕ ندارد",
    })),
  },

  {
    title: "سایر حوزه‌های تدریس",
    rows: [
      {
        label: "موارد افزوده‌شده توسط معلم",
        getValue: (item) => {
          const customFields = Array.isArray(
            item?.teachingFields
          )
            ? item.teachingFields.filter(
                (field) =>
                  !TEACHING_FIELDS.includes(field) &&
                  !TEACHING_FIELDS2.includes(field) &&
                  !TEACHING_FIELDS3.includes(field) &&
                  !TEACHING_FIELDS4.includes(field) &&
                  !TEACHING_FIELDS5.includes(field) &&
                  !TEACHING_FIELDS6.includes(field)
              )
            : [];

          return formatArray(customFields);
        },
      },
    ],
  },

  {
    title: "مقاطع تحصیلی",
    rows: [
      ...EDUCATION_LEVELS.map((level) => ({
        label: level,
        getValue: (item) =>
          Array.isArray(item?.educationLevels) &&
          item.educationLevels.includes(level)
            ? "✓ دارد"
            : "✕ ندارد",
      })),
      {
        label: "سایر مقاطع",
        getValue: (item) => {
          const customLevels = Array.isArray(
            item?.educationLevels
          )
            ? item.educationLevels.filter(
                (level) =>
                  !EDUCATION_LEVELS.includes(level)
              )
            : [];

          return formatArray(customLevels);
        },
      },
    ],
  },

  {
    title: "شیوه‌های تدریس",
    rows: [
      ...TEACHING_METHODS.map((method) => ({
        label: method,
        getValue: (item) =>
          Array.isArray(item?.teachingMethods) &&
          item.teachingMethods.includes(method)
            ? "✓ دارد"
            : "✕ ندارد",
      })),
      {
        label: "سایر شیوه‌های تدریس",
        getValue: (item) => {
          const customMethods = Array.isArray(
            item?.teachingMethods
          )
            ? item.teachingMethods.filter(
                (method) =>
                  !TEACHING_METHODS.includes(method)
              )
            : [];

          return formatArray(customMethods);
        },
      },
    ],
  },

  {
    title: "روزها و ساعات تدریس",
    rows: [
      {
        label: "برنامه تدریس",
        getValue: (item) =>
          formatWorkingSchedule(
            item?.workingSchedule
          ),
      },
    ],
  },

  {
    title: "ظرفیت پذیرش",
    rows: [
      {
        label: "ظرفیت هنرجو / دانش‌آموز",
        getValue: (item) =>
          item?.studentCapacity || "—",
      },
    ],
  },

  {
    title: "تحصیلات و تخصص",
    rows: [
      {
        label: "تحصیلات",
        getValue: (item) =>
          item?.education || "—",
      },
      {
        label: "دانشگاه",
        getValue: (item) =>
          item?.university || "—",
      },
      {
        label: "تخصص",
        getValue: (item) =>
          item?.specialty || "—",
      },
      {
        label: "سابقه تدریس",
        getValue: (item) =>
          item?.teachingExperience || "—",
      },
    ],
  },

  {
    title: "تدریس آنلاین",
    rows: [
      {
        label: "امکان تدریس آنلاین",
        getValue: (item) =>
          formatBoolean(
            item?.hasOnlineTeaching
          ),
      },
      {
        label: "توضیحات تدریس آنلاین",
        getValue: (item) =>
          item?.onlineDescription || "—",
      },
    ],
  },

  {
    title: "تدریس در منزل",
    rows: [
      {
        label: "امکان تدریس در منزل",
        getValue: (item) =>
          formatBoolean(
            item?.hasHomeTeaching
          ),
      },
      {
        label: "توضیحات تدریس در منزل",
        getValue: (item) =>
          item?.homeTeachingDescription || "—",
      },
    ],
  },

  {
    title: "تعیین سطح",
    rows: [
      {
        label: "امکان تعیین سطح",
        getValue: (item) =>
          formatBoolean(
            item?.hasPlacementTest
          ),
      },
      {
        label: "توضیحات تعیین سطح",
        getValue: (item) =>
          item?.placementTestDescription || "—",
      },
    ],
  },

  {
    title: "جلسه آزمایشی",
    rows: [
      {
        label: "امکان جلسه آزمایشی",
        getValue: (item) =>
          formatBoolean(
            item?.hasTrialSession
          ),
      },
      {
        label: "توضیحات جلسه آزمایشی",
        getValue: (item) =>
          item?.trialSessionDescription || "—",
      },
    ],
  },

  {
    title: "منابع و محتوای آموزشی",
    rows: [
      {
        label: "ارائه منابع آموزشی",
        getValue: (item) =>
          formatBoolean(
            item?.hasEducationalMaterials
          ),
      },
      {
        label: "توضیحات منابع آموزشی",
        getValue: (item) =>
          item?.educationalMaterialsDescription ||
          "—",
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
              to="/shop?view=compare-services&service=private-teacher"
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
           بازگشت به انتخاب معلمان خصوصی
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
  مقایسه معلمان خصوصی ژنینو
</div>

<h1 className="mt-2 text-xl font-black sm:text-2xl">
  مقایسه تخصصی معلمان خصوصی
</h1>

<p className="mt-2 max-w-3xl text-xs leading-6 text-yellow-50 sm:text-sm">
  معلمان خصوصی انتخاب‌شده را از نظر حوزه‌های تدریس،
  مقاطع تحصیلی، شیوه‌های تدریس، سوابق آموزشی و خدمات
  آموزشی با یکدیگر مقایسه کنید.
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
                  privateTeachers.length * 180
                }px`,
              }}
            >
              {/* سربرگ کلاس‌های هنری */}
              <div
                className="grid"
                style={{
                  gridTemplateColumns: `170px repeat(${privateTeachers.length}, minmax(180px, 1fr))`,
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

                {privateTeachers.map((item) => {
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
                             item?.fullName ||
                             "معلم خصوصی"
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
                          👨‍🏫
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
                        {item?.fullName ||
                         "معلم خصوصی"}
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
                        to={`/vendor/service/private-teacher/${item.vendorId}?view=public`}
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
                       مشاهده معلم
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
    const values = privateTeachers.map((item) =>
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
                            gridTemplateColumns: `170px repeat(${privateTeachers.length}, minmax(180px, 1fr))`,
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
                          {privateTeachers.map(
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