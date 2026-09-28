export const KINDERGARTEN_FEATURE_SECTIONS = [
  {
    key: "languages",
    title: "آموزش زبان",
    description:
      "زبان‌هایی که در برنامه آموزشی مهدکودک ارائه می‌شوند.",
    items: [
  "انگلیسی",
  "فرانسه",
  "آلمانی",
  "عربی",
  "ترکی",
  "اسپانیایی",
  // گزینه‌های هماهنگ با فیلتر فروشگاه
  "آموزش زبان انگلیسی",
  "آموزش زبان دوم",
],
  },

  {
    key: "arts",
    title: "هنر و خلاقیت",
    description:
      "فعالیت‌های هنری و خلاقانه ویژه کودکان.",
    items: [
  "نقاشی",
  "موسیقی",
  "سفالگری",
  "کاردستی و خلاقیت",
  "نمایش و تئاتر کودک",
  "حرکات ریتمیک",
  // گزینه‌های هماهنگ با فیلتر فروشگاه
  "موسیقی کودک",
  "نقاشی و رنگ‌آمیزی",
],
  },

  {
    key: "sports",
    title: "ورزش و فعالیت بدنی",
    description:
      "برنامه‌های ورزشی و حرکتی متناسب با سن کودکان.",
    items: [
  "یوگای کودک",
  "بازی‌های حرکتی",
  "فوتبال کودک",
  "شنا",
  "حرکات اصلاحی کودک",
  // گزینه‌های هماهنگ با فیلتر فروشگاه
  "ژیمناستیک کودک",
  "ورزش کودک",
],
  },

  {
    key: "development",
    title: "آموزش و رشد کودک",
    description:
      "برنامه‌های آموزشی و مهارتی مهدکودک.",
    items: [
  "قصه‌گویی",
  "مهارت‌های زندگی",
  "مونته‌سوری",
  "بازی‌های فکری",
  "علوم و آزمایش کودک",
  "آمادگی پیش‌دبستانی",
  "پرورش خلاقیت",
  "آموزش مهارت‌های اجتماعی",
  // گزینه‌های هماهنگ با فیلتر فروشگاه
  "قصه‌گویی و کتابخوانی",
  "آمادگی ورود به دبستان",
  "مهارت‌های اجتماعی",
  "آموزش مفاهیم علمی",
  "آشپزی کودک",
],
  },

  {
  key: "spaces",
  title: "فضاها و امکانات تخصصی",
  description:
    "فضاها و امکاناتی که برای فعالیت و نگهداری کودکان در اختیار مهد قرار دارد.",
  items: [
    "حیاط و فضای باز",
    "اتاق بازی",
    "سالن فعالیت بدنی",
    "اتاق خواب و استراحت",
    "کتابخانه کودک",
    "اتاق هنر و خلاقیت",

    // گزینه‌های هماهنگ با فیلتر فروشگاه
    "حیاط اختصاصی",
    "فضای بازی سرپوشیده",
    "فضای بازی روباز",
    "اتاق خواب کودک",
    "کلاس‌های مجهز",
  ],
},

  {
  key: "safety",
  title: "ایمنی، مراقبت و خدمات",
  description:
    "امکانات مرتبط با ایمنی، سلامت و مراقبت از کودکان.",
  items: [
    "دوربین مداربسته",
    "سیستم اعلام حریق",
    "جعبه کمک‌های اولیه",
    "سرویس بهداشتی مخصوص کودک",
    "سیستم تهویه مناسب",
    "فضای بازی ایمن‌سازی‌شده",

    // گزینه‌های هماهنگ با فیلتر فروشگاه
    "دوربین آنلاین",
    "میان‌وعده سالم",
    "سیستم گرمایش و سرمایش استاندارد",
    "مشاوره و روانشناس کودک",
    "پرستار کودک",
    "مربی و کمک‌مربی متخصص",
    "سرویس بهداشتی کودک",
    "امکانات ایمنی استاندارد",
    "بیمه کودکان",
  ],
},
];


export default function KindergartenFeatureSection({
  value,
  onChange,
}) {

  const safeValue =
    value &&
    typeof value === "object"
      ? value
      : {};


  const toggleItem = (
    sectionKey,
    item
  ) => {

    const currentSection =
      safeValue[sectionKey] || {};

    const currentItems =
      Array.isArray(
        currentSection.items
      )
        ? currentSection.items
        : [];


    const exists =
      currentItems.includes(item);


    const nextItems =
      exists
        ? currentItems.filter(
            (value) =>
              value !== item
          )
        : [
            ...currentItems,
            item,
          ];


    onChange({
      ...safeValue,

      [sectionKey]: {
        ...currentSection,
        items: nextItems,
      },
    });
  };


  const updateOther = (
    sectionKey,
    text
  ) => {

    const currentSection =
      safeValue[sectionKey] || {};


    onChange({
      ...safeValue,

      [sectionKey]: {
        ...currentSection,
        other: text,
      },
    });
  };


  return (

    <div
      className="
        space-y-4
        sm:col-span-2
      "
    >

      {KINDERGARTEN_FEATURE_SECTIONS.map(
        (section) => {

          const sectionValue =
            safeValue[
              section.key
            ] || {};


          const selectedItems =
            Array.isArray(
              sectionValue.items
            )
              ? sectionValue.items
              : [];


          return (

            <div
              key={
                section.key
              }
              className="
                rounded-2xl
                border
                border-yellow-100
                bg-[#faf7ef]
                p-4
              "
            >

              <div>

                <h3
                  className="
                    text-sm
                    font-black
                    text-[#6f4a18]
                  "
                >
                  {
                    section.title
                  }
                </h3>


                <p
                  className="
                    mt-1
                    text-xs
                    leading-6
                    text-gray-400
                  "
                >
                  {
                    section.description
                  }
                </p>

              </div>


              <div
                className="
                  mt-4
                  flex
                  flex-wrap
                  gap-2
                "
              >

                {section.items.map(
                  (item) => {

                    const selected =
                      selectedItems.includes(
                        item
                      );


                    return (

                      <button
                        key={item}
                        type="button"
                        onClick={() =>
                          toggleItem(
                            section.key,
                            item
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
                              ? `
                                border-yellow-500
                                bg-yellow-100
                                text-[#6f4a18]
                                shadow-sm
                              `
                              : `
                                border-gray-200
                                bg-white
                                text-gray-500
                                hover:border-yellow-300
                              `
                          }
                        `}
                      >
                        {selected
                          ? "✓ "
                          : ""
                        }

                        {item}
                      </button>

                    );

                  }
                )}

              </div>


              <div
                className="
                  mt-4
                "
              >

                <label
                  className="
                    text-[11px]
                    font-bold
                    text-gray-400
                  "
                >
                  مورد دیگری هم دارید؟
                </label>


                <input
                  value={
                    sectionValue.other ||
                    ""
                  }
                  onChange={(e) =>
                    updateOther(
                      section.key,
                      e.target.value
                    )
                  }
                  placeholder={
                    section.key ===
                    "languages"
                      ? "مثلاً: ایتالیایی، روسی و ..."
                      : "سایر موارد را وارد کنید"
                  }
                  className="
                    mt-2
                    h-10
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    px-3
                    text-xs
                    outline-none
                    transition
                    focus:border-yellow-400
                  "
                />

              </div>

            </div>

          );

        }
      )}

    </div>

  );
}