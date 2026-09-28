export const SCHOOL_FEATURE_SECTIONS = {
  آموزشی: [
    {
      key: "smartClass",
      title:
        "آیا مدرسه دارای کلاس هوشمند و تجهیزات آموزش دیجیتال است؟",
    },
    {
      key: "laboratory",
      title:
        "آیا مدرسه دارای آزمایشگاه آموزشی فعال است؟",
    },
    {
      key: "skillTraining",
      title:
        "آیا مدرسه برنامه آموزش مهارت‌های تکمیلی دارد؟",
    },
    {
      key: "library",
      title:
        "آیا مدرسه دارای کتابخانه و فضای مطالعه اختصاصی است؟",
    },
    {
      key: "assessment",
      title:
        "آیا مدرسه سیستم ارزیابی و گزارش پیشرفت دانش‌آموز دارد؟",
    },
  ],

  علمی: [
    {
      key: "research",
      title:
        "آیا مدرسه فعالیت‌های پژوهشی و پروژه‌های علمی برگزار می‌کند؟",
    },
    {
      key: "talent",
      title:
        "آیا مدرسه برنامه شناسایی و پرورش استعدادهای ویژه دارد؟",
    },
    {
      key: "technology",
      title:
        "آیا مدرسه آموزش فناوری‌های نوین ارائه می‌دهد؟",
    },
    {
      key: "innovation",
      title:
        "آیا مدرسه فضای خلاقیت و نوآوری دارد؟",
    },
    {
      key: "competition",
      title:
        "آیا مدرسه در جشنواره‌ها و مسابقات علمی شرکت می‌کند؟",
    },
  ],

  ورزشی: [
    {
      key: "sportsSpace",
      title:
        "آیا مدرسه فضای ورزشی اختصاصی دارد؟",
    },
    {
      key: "coach",
      title:
        "آیا مدرسه مربی تخصصی ورزشی دارد؟",
    },
    {
      key: "sportProgram",
      title:
        "آیا مدرسه برنامه منظم ورزشی و استعدادیابی دارد؟",
    },
    {
      key: "competition",
      title:
        "آیا مدرسه در مسابقات ورزشی شرکت می‌کند؟",
    },
    {
      key: "health",
      title:
        "آیا مدرسه برنامه سلامت و آمادگی جسمانی دانش‌آموزان دارد؟",
    },
  ],

  رفاهی: [
    {
      key: "transport",
      title:
        "آیا مدرسه سرویس رفت‌وآمد دانش‌آموزان دارد؟",
    },
    {
      key: "security",
      title:
        "آیا مدرسه سیستم کنترل ورود و خروج دارد؟",
    },
    {
      key: "healthRoom",
      title:
        "آیا مدرسه اتاق سلامت یا مراقب بهداشت دارد؟",
    },
    {
      key: "food",
      title:
        "آیا مدرسه فضای تغذیه و بوفه استاندارد دارد؟",
    },
    {
      key: "safety",
      title:
        "آیا مدرسه تجهیزات و برنامه ایمنی اضطراری دارد؟",
    },
  ],

  فناوری: [
    {
      key: "parentSystem",
      title:
        "آیا مدرسه سامانه ارتباط آنلاین با والدین دارد؟",
    },
    {
      key: "onlineReport",
      title:
        "آیا والدین گزارش آموزشی آنلاین دریافت می‌کنند؟",
    },
    {
      key: "digitalContent",
      title:
        "آیا مدرسه محتوای آموزشی دیجیتال ارائه می‌دهد؟",
    },
    {
      key: "onlineClass",
      title:
        "آیا مدرسه امکان آموزش آنلاین دارد؟",
    },
    {
      key: "smartManagement",
      title:
        "آیا مدرسه از سیستم مدیریت هوشمند آموزشی استفاده می‌کند؟",
    },
  ],
};


function normalizeFacilities(value) {
  const currentValue =
    value && typeof value === "object"
      ? value
      : {};

  const result = {};

  Object.entries(
    SCHOOL_FEATURE_SECTIONS
  ).forEach(([sectionTitle, items]) => {
    const currentSection =
      currentValue[sectionTitle] &&
      typeof currentValue[sectionTitle] ===
        "object"
        ? currentValue[sectionTitle]
        : {};

    result[sectionTitle] = {
      extra:
        typeof currentSection.extra ===
        "string"
          ? currentSection.extra
          : "",
    };

    items.forEach((item) => {
      const currentItem =
        currentSection[item.key] &&
        typeof currentSection[item.key] ===
          "object"
          ? currentSection[item.key]
          : {};

      result[sectionTitle][item.key] = {
        available:
          typeof currentItem.available ===
          "boolean"
            ? currentItem.available
            : null,

        description:
          typeof currentItem.description ===
          "string"
            ? currentItem.description
            : "",
      };
    });
  });

  return result;
}


export default function SchoolFeatureSection({
  value,
  onChange,
}) {
  const normalizedValue =
    normalizeFacilities(value);

  const updateAvailability = (
    sectionTitle,
    itemKey,
    available
  ) => {
    onChange({
      ...normalizedValue,

      [sectionTitle]: {
        ...normalizedValue[sectionTitle],

        [itemKey]: {
          ...normalizedValue[sectionTitle][
            itemKey
          ],

          /*
           سه وضعیت معتبر:
           true  = بله
           false = خیر
           null  = بدون پاسخ
          */
          available,
        },
      },
    });
  };


  const updateDescription = (
    sectionTitle,
    itemKey,
    description
  ) => {
    onChange({
      ...normalizedValue,

      [sectionTitle]: {
        ...normalizedValue[sectionTitle],

        [itemKey]: {
          ...normalizedValue[sectionTitle][
            itemKey
          ],

          description,
        },
      },
    });
  };


  const updateExtra = (
    sectionTitle,
    extra
  ) => {
    onChange({
      ...normalizedValue,

      [sectionTitle]: {
        ...normalizedValue[sectionTitle],
        extra,
      },
    });
  };


  return (
    <div className="space-y-4">
      {Object.entries(
        SCHOOL_FEATURE_SECTIONS
      ).map(([sectionTitle, items]) => (
        <section
          key={sectionTitle}
          className="
            rounded-2xl
            border
            border-yellow-100
            bg-white
            p-4
            shadow-sm
          "
        >
          <h3
            className="
              mb-3
              text-sm
              font-black
              text-[#6f4a18]
            "
          >
            امکانات {sectionTitle}
          </h3>

          <div className="space-y-2">
            {items.map((item) => {
              const itemValue =
                normalizedValue[
                  sectionTitle
                ][item.key];

              const isAnswered =
                typeof itemValue.available ===
                "boolean";

              return (
                <div
                  key={item.key}
                  className={`
                    rounded-xl
                    border
                    px-3
                    py-3
                    transition
                    ${
  isAnswered
    ? "border-yellow-200 bg-yellow-50/40"
    : "border-gray-200 bg-stone-50"
}
                  `}
                >
                  <div
                    className="
                      flex
                      flex-col
                      gap-3
                      sm:flex-row
                      sm:items-center
                    "
                  >
                    <p
                      className="
                        flex-1
                        text-xs
                        font-bold
                        leading-6
                        text-stone-700
                      "
                    >
                      {item.title.replace(
                        "آیا مدرسه ",
                        ""
                      )}
                    </p>

                    <div
  className="
    flex
    shrink-0
    flex-wrap
    items-center
    gap-2
    text-xs
  "
>
  {/* بله */}

  <label
    className={`
      flex
      cursor-pointer
      items-center
      gap-1.5
      rounded-lg
      border
      px-3
      py-2
      transition
      ${
        itemValue.available === true
          ? "border-green-400 bg-green-50 text-green-700"
          : "border-gray-200 bg-white text-gray-500"
      }
    `}
  >
    <input
      type="radio"
      name={`${sectionTitle}-${item.key}`}
      checked={
        itemValue.available === true
      }
      onChange={() =>
        updateAvailability(
          sectionTitle,
          item.key,
          true
        )
      }
    />

    بله
  </label>


  {/* خیر */}

  <label
    className={`
      flex
      cursor-pointer
      items-center
      gap-1.5
      rounded-lg
      border
      px-3
      py-2
      transition
      ${
        itemValue.available === false
          ? "border-red-300 bg-red-50 text-red-600"
          : "border-gray-200 bg-white text-gray-500"
      }
    `}
  >
    <input
      type="radio"
      name={`${sectionTitle}-${item.key}`}
      checked={
        itemValue.available === false
      }
      onChange={() =>
        updateAvailability(
          sectionTitle,
          item.key,
          false
        )
      }
    />

    خیر
  </label>


  {/* بدون پاسخ */}

  <label
    className={`
      flex
      cursor-pointer
      items-center
      gap-1.5
      rounded-lg
      border
      px-3
      py-2
      transition
      ${
        itemValue.available === null
          ? "border-gray-400 bg-gray-100 text-gray-700"
          : "border-gray-200 bg-white text-gray-500"
      }
    `}
  >
    <input
      type="radio"
      name={`${sectionTitle}-${item.key}`}
      checked={
        itemValue.available === null
      }
      onChange={() =>
        updateAvailability(
          sectionTitle,
          item.key,
          null
        )
      }
    />

    بدون پاسخ
  </label>
</div>
                  </div>

                  <input
                    placeholder="توضیحات تکمیلی این مورد"
                    value={
                      itemValue.description
                    }
                    onChange={(event) =>
                      updateDescription(
                        sectionTitle,
                        item.key,
                        event.target.value
                      )
                    }
                    className="
                      mt-3
                      h-9
                      w-full
                      rounded-lg
                      border
                      border-gray-200
                      bg-white
                      px-3
                      text-xs
                      outline-none
                      focus:border-yellow-400
                    "
                  />

                  
                </div>
              );
            })}
          </div>

          <textarea
            placeholder={`توضیحات کلی امکانات ${sectionTitle}`}
            value={
              normalizedValue[sectionTitle]
                .extra
            }
            onChange={(event) =>
              updateExtra(
                sectionTitle,
                event.target.value
              )
            }
            className="
              mt-3
              min-h-16
              w-full
              rounded-xl
              border
              border-gray-200
              p-3
              text-xs
              outline-none
              focus:border-yellow-400
            "
          />
        </section>
      ))}
    </div>
  );
}