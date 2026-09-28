import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  Baby,
  BookOpen,
  GraduationCap,
  Home,
  Palette,
  Search,
  Sparkles,
  Trophy,
  UserRound,
} from "lucide-react";
import { authFetch } from "../services/api";

const serviceSections = [
  {
    key: "schools",
    title: "مدرسه",
    description: "مدارسی که کودک در آن‌ها تحصیل می‌کند.",
    emptyText: "هنوز مدرسه‌ای برای این کودک ثبت نشده است.",
    buttonTitle: "یافتن مدرسه",
    link: "/shop/services/schools",
    icon: GraduationCap,
    iconBackground: "from-amber-300 to-yellow-500",
    glowBackground: "bg-yellow-200/50",
  },

  {
    key: "kindergartens",
    title: "مهدکودک",
    description: "مهدکودک‌هایی که کودک در آن‌ها حضور دارد.",
    emptyText: "هنوز مهدکودکی برای این کودک ثبت نشده است.",
    buttonTitle: "یافتن مهدکودک",
    link: "/shop/services/kindergartens",
    icon: Baby,
    iconBackground: "from-pink-300 to-rose-400",
    glowBackground: "bg-pink-200/40",
  },

  {
    key: "playhouses",
    title: "خانه بازی",
    description: "خانه‌های بازی و فضاهای سرگرمی کودک.",
    emptyText: "هنوز خانه بازی‌ای برای این کودک ثبت نشده است.",
    buttonTitle: "یافتن خانه بازی",
    link: "/shop/services/playhouses",
    icon: Home,
    iconBackground: "from-orange-300 to-amber-500",
    glowBackground: "bg-orange-200/40",
  },

  {
    key: "educationClasses",
    title: "کلاس‌های آموزشی",
    description: "کلاس‌های علمی، مهارتی و آموزشی کودک.",
    emptyText: "هنوز کلاس آموزشی‌ای برای این کودک ثبت نشده است.",
    buttonTitle: "یافتن کلاس آموزشی",
    link: "/shop/services/education-classes",
    icon: BookOpen,
    iconBackground: "from-blue-300 to-cyan-500",
    glowBackground: "bg-blue-200/40",
  },

  {
    key: "artClasses",
    title: "کلاس‌های هنری",
    description: "موسیقی، نقاشی، تئاتر و دیگر فعالیت‌های هنری.",
    emptyText: "هنوز کلاس هنری‌ای برای این کودک ثبت نشده است.",
    buttonTitle: "یافتن کلاس هنری",
    link: "/shop/services/art-classes",
    icon: Palette,
    iconBackground: "from-purple-300 to-fuchsia-500",
    glowBackground: "bg-purple-200/40",
  },

  {
    key: "sportClasses",
    title: "کلاس‌های ورزشی",
    description: "ورزش‌ها، باشگاه‌ها و فعالیت‌های بدنی کودک.",
    emptyText: "هنوز کلاس ورزشی‌ای برای این کودک ثبت نشده است.",
    buttonTitle: "یافتن کلاس ورزشی",
    link: "/shop/services/sport-classes",
    icon: Trophy,
    iconBackground: "from-green-300 to-emerald-500",
    glowBackground: "bg-green-200/40",
  },

  {
    key: "privateTeachers",
    title: "معلمان خصوصی",
    description: "معلمان و مربیان خصوصی کودک.",
    emptyText: "هنوز معلم خصوصی‌ای برای این کودک ثبت نشده است.",
    buttonTitle: "یافتن معلم خصوصی",
    link: "/shop/services/private-teachers",
    icon: UserRound,
    iconBackground: "from-stone-300 to-amber-500",
    glowBackground: "bg-stone-200/40",
  },
];

export default function ChildWorld() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [schools, setSchools] = useState([]);
  const [loadingSchools, setLoadingSchools] =
  useState(true);
  const [schoolsError, setSchoolsError] =
  useState("");

  const [
  selectedSchools,
  setSelectedSchools,
] = useState([]);

const [
  loadingSelectedSchools,
  setLoadingSelectedSchools,
] = useState(true);

const [
  showSchoolPicker,
  setShowSchoolPicker,
] = useState(false);

const [
  savingSchoolId,
  setSavingSchoolId,
] = useState(null);

  const childId = searchParams.get("childId");
  const childName = searchParams.get("childName") || "کودک";
  const isViewMode = searchParams.get("mode") === "view";
  useEffect(() => {
  let alive = true;

  async function loadSchools() {
    try {
      setLoadingSchools(true);
      setSchoolsError("");

      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/vendor-school/public/list`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!alive) return;

      if (!response.ok || !data?.ok) {
        setSchools([]);
        setSchoolsError(
          data?.message ||
            "دریافت مدارس انجام نشد."
        );
        return;
      }

      setSchools(
        Array.isArray(data.schools)
          ? data.schools
          : []
      );
    } catch (error) {
      console.error(
        "LOAD CHILD WORLD SCHOOLS ERROR:",
        error
      );

      if (alive) {
        setSchools([]);
        setSchoolsError(
          "ارتباط با فهرست مدارس برقرار نشد."
        );
      }
    } finally {
      if (alive) {
        setLoadingSchools(false);
      }
    }
  }

  loadSchools();

  return () => {
    alive = false;
  };
}, []);

const loadSelectedSchools = async () => {
  if (!childId) {
    setSelectedSchools([]);
    setLoadingSelectedSchools(false);
    return;
  }

  try {
    setLoadingSelectedSchools(true);

    const res = await authFetch(
      `/children/${childId}/schools`
    );

    if (!res?.ok) {
      setSelectedSchools([]);
      return;
    }

    setSelectedSchools(
      Array.isArray(res.schools)
        ? res.schools
        : []
    );
  } catch (error) {
    console.error(
      "LOAD SELECTED CHILD SCHOOLS ERROR:",
      error
    );

    setSelectedSchools([]);
  } finally {
    setLoadingSelectedSchools(false);
  }
};


useEffect(() => {
  loadSelectedSchools();
}, [childId]);


const handleSelectSchool = async (
  school
) => {
  if (
    !school?.id ||
    !childId ||
    isViewMode
  ) {
    return;
  }

  const alreadySelected =
    selectedSchools.some(
      (item) =>
        Number(item.id) ===
        Number(school.id)
    );

  if (alreadySelected) {
    return;
  }

  try {
    setSavingSchoolId(school.id);

    const res = await authFetch(
      `/children/${childId}/schools`,
      {
        method: "POST",
        body: JSON.stringify({
          schoolId: school.id,
        }),
      }
    );

    if (!res?.ok) {
      alert(
        res?.message ||
          "انتخاب مدرسه انجام نشد."
      );
      return;
    }

    await loadSelectedSchools();

    setShowSchoolPicker(false);

    alert(
      `${school.schoolName} برای ${childName} انتخاب شد 💛`
    );
  } catch (error) {
    console.error(
      "SELECT CHILD SCHOOL ERROR:",
      error
    );

    alert(
      error?.message ||
        "انتخاب مدرسه انجام نشد."
    );
  } finally {
    setSavingSchoolId(null);
  }
};


const handleRemoveSchool = async (
  school
) => {
  if (
    !school?.id ||
    !childId ||
    isViewMode
  ) {
    return;
  }

  const confirmed = window.confirm(
    `مدرسه «${school.schoolName}» از دنیای ${childName} حذف شود؟`
  );

  if (!confirmed) return;

  try {
    const res = await authFetch(
      `/children/${childId}/schools/${school.id}`,
      {
        method: "DELETE",
      }
    );

    if (!res?.ok) {
      alert(
        res?.message ||
          "حذف مدرسه انجام نشد."
      );
      return;
    }

    setSelectedSchools((previous) =>
      previous.filter(
        (item) =>
          Number(item.id) !==
          Number(school.id)
      )
    );
  } catch (error) {
    console.error(
      "REMOVE CHILD SCHOOL ERROR:",
      error
    );

    alert(
      error?.message ||
        "حذف مدرسه انجام نشد."
    );
  }
};



  /*
    بعداً اطلاعات واقعی خدمات کودک از API در این object قرار می‌گیرد.

    ساختار پیشنهادی:

    {
      schools: [],
      kindergartens: [],
      playhouses: [],
      educationClasses: [],
      artClasses: [],
      sportClasses: [],
      privateTeachers: [],
    }
  */
  const childServices = {
    schools: [],
    kindergartens: [],
    playhouses: [],
    educationClasses: [],
    artClasses: [],
    sportClasses: [],
    privateTeachers: [],
  };

  if (!childId) {
    return (
      <main
        dir="rtl"
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#fffaf0]
          px-4
        "
      >
        <div
          className="
            w-full
            max-w-md
            rounded-[2rem]
            border
            border-yellow-200
            bg-white
            p-7
            text-center
            shadow-xl
          "
        >
          <div
            className="
              mx-auto
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-3xl
              bg-yellow-100
            "
          >
            <Baby className="h-10 w-10 text-yellow-700" />
          </div>

          <h1 className="mt-5 text-xl font-black text-yellow-900">
            کودک مشخص نشده است
          </h1>

          <p className="mt-3 text-sm leading-7 text-gray-500">
            برای مشاهده دنیای کودک، ابتدا از صفحه «کودک من» یک کودک را انتخاب
            کنید.
          </p>

          <button
            type="button"
            onClick={() => navigate("/mychild")}
            className="
              mt-6
              w-full
              rounded-2xl
              bg-gradient-to-l
              from-yellow-400
              to-amber-300
              px-5
              py-3
              font-black
              text-yellow-950
            "
          >
            بازگشت به کودک من
          </button>
        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#fffaf0]
        px-4
        pb-16
        pt-8
      "
    >
      {/* پس‌زمینه */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-yellow-200/55 blur-3xl" />
        <div className="absolute left-[-100px] top-64 h-72 w-72 rounded-full bg-orange-200/35 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 h-80 w-80 rounded-full bg-amber-100/80 blur-3xl" />

        <div
          className="
            absolute
            inset-0
            opacity-[0.25]
            bg-[radial-gradient(circle_at_1px_1px,#facc15_1px,transparent_0)]
            [background-size:28px_28px]
          "
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* هدر */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="
            relative
            overflow-hidden
            rounded-[2.2rem]
            border
            border-white/80
            bg-white/80
            p-5
            shadow-[0_18px_60px_rgba(212,175,55,0.16)]
            backdrop-blur-xl
            sm:p-7
          "
        >
          <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-yellow-200/50 blur-3xl" />

          <div className="relative z-10">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-yellow-100
                bg-white
                px-3
                py-2
                text-xs
                font-black
                text-yellow-800
                shadow-sm
                transition
                hover:bg-yellow-50
              "
            >
              <ArrowRight className="h-4 w-4" />
              بازگشت
            </button>

            <div className="mt-5 flex items-center gap-4">
              <div
                className="
                  flex
                  h-16
                  w-16
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-orange-300
                  to-amber-500
                  text-white
                  shadow-[0_12px_30px_rgba(245,158,11,0.28)]
                "
              >
                <GraduationCap className="h-8 w-8" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-yellow-900 sm:text-3xl">
                    دنیای {childName}
                  </h1>

                  <Sparkles className="h-5 w-5 text-yellow-500" />
                </div>

                <p className="mt-2 text-xs leading-6 text-gray-500 sm:text-sm">
                  مدارس، کلاس‌ها، مربیان و فعالیت‌های رشد {childName}
                </p>
              </div>
            </div>

            {isViewMode && (
              <div
                className="
                  mt-5
                  rounded-2xl
                  border
                  border-blue-100
                  bg-blue-50/80
                  px-4
                  py-3
                  text-xs
                  leading-6
                  text-blue-700
                "
              >
                شما در حال مشاهده دنیای {childName} هستید. افزودن یا تغییر
                مراکز فقط توسط والدین کودک انجام می‌شود.
              </div>
            )}
          </div>
        </motion.section>

        {/* باکس‌ها */}
        <section className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {serviceSections.map((section, index) => {
            const Icon = section.icon;
            const services = childServices[section.key] || [];

            return (
              <motion.article
                key={section.key}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                }}
                className={`
                  group
                  relative
                  flex
                  min-h-[270px]
                  flex-col
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-white/80
                  bg-white/85
                  p-5
                  shadow-[0_14px_45px_rgba(111,74,24,0.10)]
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_22px_60px_rgba(212,175,55,0.18)]
                  ${
  section.key === "schools" ||
  index === serviceSections.length - 1
    ? "md:col-span-2"
    : ""
}
                `}
              >
                <div
                  className={`
                    pointer-events-none
                    absolute
                    -left-16
                    -top-16
                    h-44
                    w-44
                    rounded-full
                    blur-3xl
                    ${section.glowBackground}
                  `}
                />

                {/* عنوان باکس */}
                <div className="relative z-10 flex items-start gap-4">
                  <div
                    className={`
                      flex
                      h-14
                      w-14
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      text-white
                      shadow-lg
                      transition-transform
                      duration-300
                      group-hover:scale-105
                      ${section.iconBackground}
                    `}
                  >
                    <Icon className="h-7 w-7" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-black text-yellow-900">
                      {section.title} {childName}
                    </h2>

                    <p className="mt-1 text-xs leading-6 text-gray-500">
                      {section.description}
                    </p>
                  </div>
                </div>

                {/* فهرست مراکز */}

<div className="relative z-10 mt-5 flex-1">
  {section.key === "schools" ? (
  loadingSelectedSchools ? (
    <div
      className="
        flex
        min-h-[120px]
        items-center
        justify-center
        rounded-2xl
        border
        border-yellow-100
        bg-yellow-50/40
      "
    >
      <p className="text-xs font-bold text-gray-400">
        در حال دریافت مدرسه‌های {childName}...
      </p>
    </div>
  ) : selectedSchools.length > 0 ? (
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
      {selectedSchools.map((school) => (
        <ChildWorldSchoolCard
          key={school.id}
          school={school}
          selected
          canRemove={!isViewMode}
          onRemove={() =>
            handleRemoveSchool(school)
          }
          onOpen={() =>
            navigate(
              `/vendor/service/school/${school.vendorId}`
            )
          }
        />
      ))}
    </div>
  ) : (
    <div
      className="
        flex
        min-h-[120px]
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-yellow-200
        bg-yellow-50/40
        px-4
        text-center
      "
    >
      <p className="text-xs leading-6 text-gray-400">
        هنوز مدرسه‌ای برای {childName} انتخاب نشده است.
      </p>
    </div>
  )
) : services.length > 0 ? (
    <div className="space-y-3">
      {services.map((service) => (
        <Link
          key={service.id}
          to={service.pageLink || "#"}
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-yellow-100
            bg-yellow-50/60
            p-3
            transition
            hover:border-yellow-300
            hover:bg-yellow-50
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-xl
              bg-white
            "
          >
            {service.image ? (
              <img
                src={service.image}
                alt={service.title}
                className="
                  h-full
                  w-full
                  object-cover
                "
              />
            ) : (
              <Icon
                className="
                  h-6
                  w-6
                  text-yellow-700
                "
              />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p
              className="
                truncate
                text-sm
                font-black
                text-gray-800
              "
            >
              {service.title}
            </p>

            <p
              className="
                mt-1
                truncate
                text-[11px]
                text-gray-500
              "
            >
              {service.city ||
                "مشاهده صفحه ارائه‌دهنده"}
            </p>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <div
      className="
        flex
        min-h-[88px]
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-yellow-200
        bg-yellow-50/40
        px-4
        text-center
      "
    >
      <p className="text-xs leading-6 text-gray-400">
        {section.emptyText.replace(
          "این کودک",
          childName
        )}
      </p>
    </div>
  )}
</div>

                {/* دکمه یافتن */}

{!isViewMode && (
  section.key === "schools" ? (
    <button
      type="button"
      onClick={() =>
        setShowSchoolPicker(true)
      }
      className="
        relative
        z-10
        mt-5
        inline-flex
        w-full
        items-center
        justify-center
        gap-2
        rounded-2xl
        border
        border-[#d4af37]
        bg-gradient-to-l
        from-[#fff3bd]
        via-[#f2d36f]
        to-[#d4af37]
        px-4
        py-3
        text-xs
        font-black
        text-[#6f4a18]
        shadow-[0_9px_24px_rgba(212,175,55,0.23)]
        transition-all
        hover:-translate-y-0.5
        hover:shadow-[0_13px_30px_rgba(212,175,55,0.35)]
        active:scale-[0.98]
      "
    >
      <Search className="h-4 w-4" />

      یافتن مدرسه {childName}
    </button>
  ) : (
    <Link
      to={`${section.link}?childId=${encodeURIComponent(
        childId
      )}&childName=${encodeURIComponent(
        childName
      )}`}
      className="
        relative
        z-10
        mt-5
        inline-flex
        w-full
        items-center
        justify-center
        gap-2
        rounded-2xl
        border
        border-[#d4af37]
        bg-gradient-to-l
        from-[#fff3bd]
        via-[#f2d36f]
        to-[#d4af37]
        px-4
        py-3
        text-xs
        font-black
        text-[#6f4a18]
        shadow-[0_9px_24px_rgba(212,175,55,0.23)]
        transition-all
        hover:-translate-y-0.5
        active:scale-[0.98]
      "
    >
      <Search className="h-4 w-4" />

      {section.buttonTitle} {childName}
    </Link>
  )
)}
              </motion.article>
            );
          })}
                </section>


        {/* پنجره انتخاب مدرسه */}

        {showSchoolPicker &&
          !isViewMode && (
            <div
              className="
                fixed
                inset-0
                z-[100000]
                flex
                items-center
                justify-center
                bg-black/50
                px-3
                py-5
                backdrop-blur-sm
              "
              onClick={() =>
                setShowSchoolPicker(false)
              }
            >
              <div
                dir="rtl"
                className="
                  max-h-[90vh]
                  w-full
                  max-w-6xl
                  overflow-y-auto
                  rounded-[2rem]
                  bg-[#fffaf0]
                  p-4
                  shadow-2xl
                  sm:p-6
                "
                onClick={(event) =>
                  event.stopPropagation()
                }
              >
                {/* هدر پنجره */}

                <div
                  className="
                    mb-5
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >
                  <div>
                    <h2
                      className="
                        text-lg
                        font-black
                        text-yellow-900
                      "
                    >
                      انتخاب مدرسه برای{" "}
                      {childName}
                    </h2>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-gray-500
                      "
                    >
                      مدرسه موردنظر را از میان
                      مدارس ژنینو انتخاب کنید.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setShowSchoolPicker(false)
                    }
                    className="
                      shrink-0
                      rounded-xl
                      border
                      border-yellow-200
                      bg-white
                      px-4
                      py-2
                      text-xs
                      font-black
                      text-yellow-800
                    "
                  >
                    بستن
                  </button>
                </div>


                {/* محتوای پنجره */}

                {loadingSchools ? (
                  <p
                    className="
                      py-12
                      text-center
                      text-sm
                      font-bold
                      text-gray-400
                    "
                  >
                    در حال دریافت مدارس
                    ژنینو...
                  </p>
                ) : schoolsError ? (
                  <p
                    className="
                      py-12
                      text-center
                      text-sm
                      font-bold
                      text-red-500
                    "
                  >
                    {schoolsError}
                  </p>
                ) : schools.length > 0 ? (
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
                    {schools.map(
                      (school) => {
                        const isSelected =
                          selectedSchools.some(
                            (
                              selectedSchool
                            ) =>
                              Number(
                                selectedSchool.id
                              ) ===
                              Number(
                                school.id
                              )
                          );

                        return (
                          <ChildWorldSchoolCard
                            key={school.id}
                            school={school}
                            selected={
                              isSelected
                            }
                            selecting={
                              Number(
                                savingSchoolId
                              ) ===
                              Number(
                                school.id
                              )
                            }
                            onSelect={
                              isSelected
                                ? undefined
                                : () =>
                                    handleSelectSchool(
                                      school
                                    )
                            }
                            onOpen={() =>
                              navigate(
                                `/vendor/service/school/${school.vendorId}`
                              )
                            }
                          />
                        );
                      }
                    )}
                  </div>
                ) : (
                  <p
                    className="
                      py-12
                      text-center
                      text-sm
                      text-gray-400
                    "
                  >
                    هنوز مدرسه‌ای در ژنینو
                    ثبت نشده است.
                  </p>
                )}
              </div>
            </div>
          )}
      </div>
    </main>
  );
}

function ChildWorldSchoolCard({
  school,
  onOpen,
  onSelect,
  onRemove,
  selected = false,
  selecting = false,
  canRemove = false,
}) {

  return (
    <motion.article
      whileHover={{ y: -4 }}
      className={`
        group
        cursor-pointer
        overflow-hidden
        rounded-[1.4rem]
        border
        bg-white
        shadow-[0_8px_25px_rgba(120,90,20,0.08)]
        transition
        hover:shadow-[0_15px_35px_rgba(120,90,20,0.15)]
        ${
          selected
          ? "border-green-300"
          : "border-yellow-100"
        }
      `}
    >

      {/* تصویر مثل کارت فروشگاه */}
      <button
        type="button"
        onClick={onOpen}
        className="
          relative
          h-28
          w-full
          overflow-hidden
          bg-[#faf7ef]
        "
      >

        {school.image ? (
          <img
            src={school.image}
            alt={school.schoolName}
            className="
              h-full
              w-full
              object-cover
              transition
              duration-500
              group-hover:scale-105
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
            🏫
          </div>
        )}


        <span
          className="
            absolute
            right-2
            top-2
            rounded-full
            bg-white/90
            px-2
            py-1
            text-[9px]
            font-black
            text-[#7a5526]
            shadow-sm
          "
        >
          مدرسه
        </span>


        {selected && (
          <span
            className="
              absolute
              left-2
              top-2
              rounded-full
              bg-green-500
              px-2
              py-1
              text-[9px]
              font-black
              text-white
            "
          >
            انتخاب شده
          </span>
        )}

      </button>


      {/* اطلاعات */}
      <div className="p-3">


        <h3
          className="
            truncate
            text-sm
            font-black
            text-[#4b2f17]
          "
        >
          {school.schoolName}
        </h3>


        <div
          className="
            mt-2
            flex
            flex-wrap
            gap-1
          "
        >

          <span
            className="
              rounded-full
              bg-[#faf7ef]
              px-2
              py-1
              text-[10px]
              font-bold
              text-gray-500
            "
          >
            {school.gender || "نامشخص"}
          </span>


          <span
            className="
              rounded-full
              bg-[#faf7ef]
              px-2
              py-1
              text-[10px]
              font-bold
              text-gray-500
            "
          >
            {school.city || "نامشخص"}
          </span>


          {school.district && (
            <span
              className="
                rounded-full
                bg-[#faf7ef]
                px-2
                py-1
                text-[10px]
                font-bold
                text-gray-500
              "
            >
              منطقه {school.district}
            </span>
          )}

        </div>



        <button
          type="button"
          onClick={onOpen}
          className="
            mt-3
            w-full
            rounded-xl
            border
            border-yellow-200
            bg-yellow-50
            py-2
            text-[11px]
            font-black
            text-[#6f4a18]
          "
        >
          مشاهده مدرسه
        </button>



        {onSelect && (
          <button
            disabled={selecting}
            onClick={onSelect}
            className="
              mt-2
              w-full
              rounded-xl
              bg-gradient-to-r
              from-[#7a5526]
              via-[#b88724]
              to-[#d4af37]
              py-2
              text-[11px]
              font-black
              text-white
            "
          >
            {
              selecting
              ? "در حال انتخاب..."
              : "انتخاب برای کودک"
            }
          </button>
        )}



        {canRemove && onRemove && (
          <button
            onClick={onRemove}
            className="
              mt-2
              w-full
              rounded-xl
              border
              border-red-200
              bg-red-50
              py-2
              text-[11px]
              font-black
              text-red-500
            "
          >
            حذف از مدرسه‌های کودک
          </button>
        )}


      </div>

    </motion.article>
  );
}


function SchoolCardInfo({
  label,
  value,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-2
        rounded-xl
        bg-[#faf7ef]
        px-2.5
        py-2
      "
    >
      <span>
        {label}
      </span>

      <span
        className="
          truncate
          text-[#6f4a18]
        "
      >
        {value || "ثبت نشده"}
      </span>
    </div>
  );
}