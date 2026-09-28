import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Baby,
  Clock3,
  ShieldCheck,
  UserRound,
  CalendarDays,
  HeartHandshake,
  SlidersHorizontal,
  Star,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import nurseDefaultImage from "../assets/nurse.png";

export default function ChildNurses() {
  const navigate = useNavigate();
  const [myNurseProfile, setMyNurseProfile] = useState(null);
  const [nurseStatusLoading, setNurseStatusLoading] = useState(true);
  const [nurses, setNurses] = useState([]);
const [nursesLoading, setNursesLoading] = useState(true);

  const handleNurseRegister = () => {
  const token =
    localStorage.getItem("genino_token");

  if (!token) {
    setShowLoginModal(true);
    return;
  }

  if (myNurseProfile?.status === "REJECTED") {
    navigate("/join/nurse");
    return;
  }

  if (!myNurseProfile) {
    navigate("/join/nurse");
  }
};

  const [search, setSearch] = useState("");
  const [workType, setWorkType] = useState("ALL");
  const [city, setCity] = useState("ALL");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [babyExperienceOnly, setBabyExperienceOnly] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);


  useEffect(() => {
  const loadMyNurseProfile = async () => {
    const token =
      localStorage.getItem("genino_token");
    if (!token) {
      setNurseStatusLoading(false);
      return;
    }
    try {
      const API_BASE =
        import.meta.env.VITE_API_BASE_URL ||
        "";
      const res = await fetch(
       `${API_BASE}/nurses/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 404) {
        setMyNurseProfile(null);
        return;
      }
      const data = await res.json();
      if (res.ok && data.ok) {
        setMyNurseProfile(
          data.nurseProfile
        );
      }
    } catch (error) {
      console.error(
        "LOAD NURSE PROFILE ERROR:",
        error
      );
    } finally {
      setNurseStatusLoading(false);
    }
  };
  loadMyNurseProfile();
}, []);


useEffect(() => {
  const loadNurses = async () => {
    try {
      const API_BASE =
        import.meta.env.VITE_API_BASE_URL || "";
      const res =
        await fetch(
          `${API_BASE}/nurses/public`
        );
      const data =
        await res.json();
      if(data.ok){

  console.log(
    "SETTING NURSES:",
    data.nurses
  );

  setNurses(
    data.nurses
  );
}
      console.log(
  "PUBLIC NURSES:",
  data.nurses
);
    } catch(error){
      console.error(
        "LOAD NURSES ERROR:",
        error
      );
    } finally {
      setNursesLoading(false);
    }
  };
  loadNurses();
},[]);



  const workTypeLabels = {
  HOURLY:"ساعتی",
  DAILY:"روزانه",
  FIXED:"ثابت",
};

  const cities = useMemo(() => {
  return [
    ...new Set(
      nurses.map((item) => item.city)
    ),
  ];
}, [nurses]);

  const filteredNurses = useMemo(() => {
    const q = search.trim().toLowerCase();

    return nurses.filter((nurse) => {
      const matchesSearch =
  !q ||
  (nurse.fullName || "").toLowerCase().includes(q) ||
  (nurse.city || "").toLowerCase().includes(q) ||
  (nurse.district || "").toLowerCase().includes(q);

      const matchesWorkType =
  workType === "ALL" ||
  !Array.isArray(nurse.workTypes) ||
  nurse.workTypes.length === 0 ||
  nurse.workTypes.includes(workType);

      const matchesCity =
  city === "ALL" ||
  !nurse.city ||
  nurse.city === city;

      const matchesVerified = true;

const matchesBabyExperience = true;

      return (
        matchesSearch &&
        matchesWorkType &&
        matchesCity &&
        matchesVerified &&
        matchesBabyExperience
      );
    });
  }, [
  nurses,
  search,
  workType,
  city,
  verifiedOnly,
  babyExperienceOnly,
]);

  const clearFilters = () => {
    setSearch("");
    setWorkType("ALL");
    setCity("ALL");
    setVerifiedOnly(false);
    setBabyExperienceOnly(false);
  };

  return (
    <main
      dir="rtl"
      className="
  relative
  min-h-screen
  overflow-x-hidden
  bg-gradient-to-br
  from-[#fff7e8]
  via-[#fffaf4]
  to-[#eaf8f1]
  px-4
  pb-24
  pt-8
  text-gray-800
  sm:px-6
"
    >
      {/* بک گراند لوکس ژنینو */}

<div
  className="
    pointer-events-none
    absolute
    -right-32
    top-0
    h-96
    w-96
    rounded-full
    bg-[#f6d365]/30
    blur-3xl
  "
/>

<div
  className="
    pointer-events-none
    absolute
    -left-32
    top-[300px]
    h-96
    w-96
    rounded-full
    bg-[#84fab0]/25
    blur-3xl
  "
/>

<div
  className="
    pointer-events-none
    absolute
    right-1/4
    top-[900px]
    h-80
    w-80
    rounded-full
    bg-[#ffd6e0]/30
    blur-3xl
  "
/>

<div
  className="
    pointer-events-none
    absolute
    left-1/3
    top-[1500px]
    h-72
    w-72
    rounded-full
    bg-[#d9c2ff]/20
    blur-3xl
  "
/>

      {/* هدر */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-6xl text-center"
      >
        <div
 className="
 mx-auto
 flex
 flex-col
 items-center
 justify-center
 "
>
  <div
    className="
      h-32
      w-32
      overflow-hidden
      rounded-full
      border-4
      border-white
      bg-white
      shadow-lg
      sm:h-36
      sm:w-36
    "
  >
    <img
      src="/images/nurses/nurse-header.png"
      alt="پرستار کودک"
      className="
        h-full
        w-full
        object-cover
      "
    />
  </div>

  <div
    className="
      mt-3
      flex
      items-center
      gap-2
      rounded-full
      bg-white/80
      px-4
      py-2
      text-xs
      font-bold
      text-emerald-700
      shadow-sm
    "
  >
    <ShieldCheck className="h-4 w-4" />
    مراقبت امن از کودک
  </div>
</div>

        <h1 className="mt-4 text-3xl font-black text-[#725a22] sm:text-4xl">
          پرستار کودک ژنینو
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-8 text-gray-600 sm:text-base">
          همراه مناسب کودک خود را بر اساس تجربه، محل فعالیت و نوع همکاری پیدا کنید.
        </p>

        
        <div
  className="
    mx-auto
    mt-4
    max-w-md
    rounded-3xl
    border
    border-amber-100
    bg-white/80
    p-4
    shadow-sm
    backdrop-blur
  "
>

  {nurseStatusLoading ? (

    <div className="py-3 text-xs font-bold text-gray-400">
      در حال بررسی وضعیت پرستاری...
    </div>

  ) : !myNurseProfile ? (

    <>
      <div className="flex items-center justify-center gap-2">
        <HeartHandshake className="h-5 w-5 text-amber-600" />

        <span className="text-sm font-black text-[#725a22]">
          پرستار کودک هستید؟
        </span>
      </div>

      <p className="mt-2 text-xs leading-6 text-gray-500">
        پروفایل حرفه‌ای خود را در ژنینو بسازید
        و توسط خانواده‌ها دیده شوید.
      </p>

      <button
        type="button"
        onClick={handleNurseRegister}
        className="
          mt-3
          rounded-2xl
          bg-gradient-to-l
          from-[#d4af37]
          via-[#c79d2b]
          to-[#b58a18]
          px-6
          py-2.5
          text-xs
          font-black
          text-white
          shadow-md
          transition
          hover:shadow-lg
          active:scale-95
        "
      >
        ثبت‌نام پرستار
      </button>
    </>

  ) : myNurseProfile.status === "PENDING" ? (

    <>
      <Clock3 className="mx-auto h-6 w-6 text-amber-500" />

      <div className="mt-2 text-sm font-black text-amber-700">
        درخواست شما در حال بررسی است
      </div>

      <p className="mt-2 text-xs leading-6 text-gray-500">
        اطلاعات و مدارک شما برای بررسی به تیم ژنینو
        ارسال شده است.
      </p>
    </>

  ) : myNurseProfile.status === "REJECTED" ? (

    <>
      <ShieldCheck className="mx-auto h-6 w-6 text-red-500" />

      <div className="mt-2 text-sm font-black text-red-600">
        درخواست شما نیاز به اصلاح دارد
      </div>

      {myNurseProfile.rejectionReason && (
        <p className="mt-2 text-xs leading-6 text-red-500">
          {myNurseProfile.rejectionReason}
        </p>
      )}

      <button
        type="button"
        onClick={handleNurseRegister}
        className="
          mt-3
          rounded-2xl
          bg-red-500
          px-6
          py-2.5
          text-xs
          font-black
          text-white
        "
      >
        مشاهده و اصلاح درخواست
      </button>
    </>

  ) : myNurseProfile.status === "APPROVED" ? (

    <>
      <CheckCircle2 className="mx-auto h-7 w-7 text-emerald-600" />

      <div className="mt-2 text-sm font-black text-emerald-700">
        شما به عنوان پرستار کودک در ژنینو پذیرفته شده‌اید
      </div>

      <p className="mt-2 text-xs leading-6 text-gray-500">
        اکنون می‌توانید کارت پرستاری خود را تکمیل کنید
        تا خانواده‌ها اطلاعات حرفه‌ای شما را مشاهده کنند.
      </p>

      <button
        type="button"
        onClick={() =>
          navigate("/nurse/profile")
        }
        className="
          mt-3
          rounded-2xl
          bg-emerald-600
          px-6
          py-2.5
          text-xs
          font-black
          text-white
          shadow-md
          transition
          hover:bg-emerald-700
          active:scale-95
        "
      >
        ساخت و مدیریت کارت پرستار
      </button>
    </>

  ) : myNurseProfile.status === "SUSPENDED" ? (

    <>
      <ShieldCheck className="mx-auto h-6 w-6 text-stone-500" />

      <div className="mt-2 text-sm font-black text-stone-700">
        پروفایل پرستاری شما موقتاً تعلیق شده است
      </div>

      {myNurseProfile.suspensionReason && (
        <p className="mt-2 text-xs leading-6 text-stone-500">
          {myNurseProfile.suspensionReason}
        </p>
      )}
    </>

  ) : null}

</div>
      </motion.section>

      {/* نوع همکاری */}
      <section className="relative z-10 mx-auto mt-6 flex w-full max-w-4xl gap-2 overflow-x-auto rounded-3xl bg-white/70 p-2 shadow-sm sm:grid sm:grid-cols-3">
        <button
          type="button"
          onClick={() =>
            setWorkType(workType === "HOURLY" ? "ALL" : "HOURLY")
          }
          className={`
            rounded-[1.7rem]
            border
            p-4
            transition-all
            ${
              workType === "HOURLY"
                ? "border-amber-300 bg-amber-100 shadow-md"
                : "border-white bg-white/80 hover:border-amber-200"
            }
          `}
        >
          <Clock3 className="mx-auto h-6 w-6 text-amber-600" />

          <h3 className="mt-2 font-black text-gray-800">
            پرستار ساعتی
          </h3>

          <p className="mt-1 text-xs leading-6 text-gray-500">
            برای چند ساعت مراقبت از کودک
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            setWorkType(workType === "DAILY" ? "ALL" : "DAILY")
          }
          className={`
            rounded-[1.7rem]
            border
            p-4
            transition-all
            ${
              workType === "DAILY"
                ? "border-emerald-300 bg-emerald-100 shadow-md"
                : "border-white bg-white/80 hover:border-emerald-200"
            }
          `}
        >
          <CalendarDays className="mx-auto h-6 w-6 text-emerald-600" />

          <h3 className="mt-2 font-black text-gray-800">
            پرستار روزانه
          </h3>

          <p className="mt-1 text-xs leading-6 text-gray-500">
            همکاری منظم در طول روز
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            setWorkType(workType === "FIXED" ? "ALL" : "FIXED")
          }
          className={`
            rounded-[1.7rem]
            border
            p-4
            transition-all
            ${
              workType === "FIXED"
                ? "border-teal-300 bg-teal-100 shadow-md"
                : "border-white bg-white/80 hover:border-teal-200"
            }
          `}
        >
          <UserRound className="mx-auto h-6 w-6 text-teal-600" />

          <h3 className="mt-2 font-black text-gray-800">
            پرستار ثابت
          </h3>

          <p className="mt-1 text-xs leading-6 text-gray-500">
            همکاری بلندمدت با خانواده
          </p>
        </button>
      </section>

      {/* سرچ و فیلتر */}
<section
  className="
    relative
    z-10
    mx-auto
    mt-7
    max-w-6xl
  "
>
  {/* دکمه موبایل */}
  <button
    type="button"
    onClick={() => setShowFilters((prev) => !prev)}
    className="
      flex
      w-full
      items-center
      justify-between
      rounded-2xl
      border
      border-amber-100
      bg-white/90
      px-4
      py-3
      text-sm
      font-black
      text-[#725a22]
      shadow-sm
      md:hidden
    "
  >
    <span className="flex items-center gap-2">
      <SlidersHorizontal className="h-5 w-5" />
      جستجو و فیلتر
    </span>

    <span
      className={`
        text-lg
        transition-transform
        ${showFilters ? "rotate-180" : ""}
      `}
    >
     ⌄
    </span>
  </button>

  {/* باکس فیلتر */}
  <div
    className={`
      rounded-[2rem]
      border
      border-white
      bg-white/80
      p-4
      shadow-[0_10px_35px_rgba(0,0,0,0.05)]
      backdrop-blur-md
      sm:p-5

      ${showFilters ? "mt-2 block" : "hidden"}
      md:block
      md:mt-0
    `}
  >
    <div className="hidden items-center gap-2 text-sm font-black text-[#725a22] md:flex">
      <SlidersHorizontal className="h-5 w-5" />
      جستجو و فیلتر
    </div>

    <div className="grid grid-cols-1 gap-3 md:mt-4 md:grid-cols-4">
      <div
        className="
          flex
          items-center
          gap-2
          rounded-2xl
          border
          border-gray-100
          bg-white
          px-4
          py-3
          md:col-span-2
        "
      >
        <Search className="h-4 w-4 text-amber-600" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="نام پرستار، شهر، محدوده یا تخصص..."
          className="
            w-full
            bg-transparent
            text-sm
            outline-none
            placeholder:text-gray-400
          "
        />
      </div>

      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="
          rounded-2xl
          border
          border-gray-100
          bg-white
          px-4
          py-3
          text-sm
          outline-none
        "
      >
        <option value="ALL">
          همه شهرها
        </option>

        {cities.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={clearFilters}
        className="
          rounded-2xl
          border
          border-gray-100
          bg-[#faf8f1]
          px-4
          py-3
          text-sm
          font-bold
          text-gray-500
          transition
          hover:bg-gray-100
        "
      >
        پاک کردن فیلترها
      </button>
    </div>
  </div>
</section>

      {/* عنوان لیست */}
      <section className="relative z-10 mx-auto mt-8 max-w-6xl">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-[#725a22] sm:text-xl">
              پرستاران کودک
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              افراد متناسب با فیلترهای انتخاب‌شده
            </p>
          </div>

          <span
            className="
              rounded-full
              bg-white
              px-4
              py-2
              text-xs
              font-black
              text-gray-500
              shadow-sm
            "
          >
            {filteredNurses.length} نفر
          </span>
        </div>

        {/* کارت‌ها */}
        {filteredNurses.length > 0 ? (
          <div className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNurses.map((nurse) => (
              <motion.article
                key={nurse.id}
                whileHover={{ y: -5 }}
                transition={{
                  duration: 0.2,
                }}
                className="
  flex
  h-full
  flex-col
  overflow-hidden
  rounded-[2rem]
  border
  border-white
  bg-white/90
  shadow-[0_12px_35px_rgba(0,0,0,0.06)]
  backdrop-blur-md
"
              >
                <div className=" relative aspect-square overflow-hidden bg-[#f5f2e8] ">
                  <img
  src={
    nurse.avatarUrl ||
    nurseDefaultImage
  }
                    alt={nurse.fullName}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />


                </div>

                <div className="flex flex-1 flex-col p-3 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-black text-gray-800 sm:text-lg">
  {nurse.fullName}
  {nurse.age && (
    <span className="text-xs font-bold text-gray-500">
      {" "}
      ({nurse.age} ساله)
    </span>
  )}
</h3>

                      <p className="mt-1 text-xs font-black text-amber-700">
                        پرستار کودک
                      </p>
                    </div>
                  </div>

                 <div className=" mt-3 min-h-[88px] space-y-2 text-[11px] text-gray-500 " >

<div className="flex items-center gap-2">
<MapPin className="h-3 w-3 text-emerald-600" />

<span>
{nurse.city}
</span>
</div>


<div className="flex items-center gap-2">
<MapPin className="h-4 w-4 text-amber-600" />

<span>
{nurse.district || "-"}
</span>
</div>


<div className="flex items-center gap-2">
<UserRound className="h-3 w-3 text-amber-600" />

<span>
{nurse.experience || "-"} سال سابقه
</span>
</div>


<div className="flex items-center gap-2">
<Baby className="h-3 w-3 text-teal-600" />

<span>
{nurse.ages?.join("، ") || "-"}
</span>
</div>


</div>


<div className="my-3 border-t border-gray-100"></div>


                  <div className="mt-3">

  <div className="mb-2 text-[10px] font-black text-gray-400">
    نوع همکاری
  </div>

  <div className=" min-h-[32px] flex flex-wrap gap-1.5 " >
    {nurse.workTypes?.map((type) => (
      <span
        key={type}
        className="
          rounded-full
          bg-[#f6f3e9]
          px-2
          py-1
          text-[10px]
          font-bold
          text-gray-600
        "
      >
        {workTypeLabels[type]}
      </span>
    ))}
  </div>

</div>

                  <div className="my-3 border-t border-gray-100"></div>

                  <div className="mt-3">

  <div className="mb-2 text-[10px] font-black text-gray-400">
    مهارت‌ها
  </div>

  <div className=" min-h-[42px] flex flex-wrap gap-1.5 " >

    {nurse.skills?.slice(0,3).map((skill)=>(
      <span
        key={skill}
        className="
          rounded-full
          bg-yellow-50
          px-2
          py-1
          text-[10px]
          font-bold
          text-gray-600
        "
      >
        {skill}
      </span>
    ))}

  </div>

</div>

                  <button
  type="button"
  onClick={() =>
    navigate(`/child-nurses/${nurse.id}`)
  }
  className="
    mt-auto
    w-full
    rounded-2xl
    rounded-2xl
    bg-gradient-to-l
    from-[#d4af37]
    via-[#c79d2b]
    to-[#b58a18]
    py-2
    sm:py-3
    text-sm
    font-black
    text-white
    shadow-md
    transition-all
    hover:shadow-lg
    active:scale-[0.98]
  "
>
                    مشاهده پروفایل
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div
            className="
              rounded-3xl
              border
              border-gray-100
              bg-white/80
              px-6
              py-14
              text-center
              shadow-sm
            "
          >
            <UserRound className="mx-auto h-10 w-10 text-gray-300" />

            <p className="mt-3 text-sm font-bold text-gray-500">
              پرستاری با این مشخصات پیدا نشد.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-3 text-xs font-black text-amber-700"
            >
              نمایش همه پرستارها
            </button>
          </div>
        )}
      </section>
      {showLoginModal && (
  <div
    className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/30
      px-4
      backdrop-blur-sm
    "
    onClick={() => setShowLoginModal(false)}
  >

    <div
      onClick={(e)=>e.stopPropagation()}
      className="
        w-full
        max-w-sm
        rounded-[2rem]
        border
        border-white
        bg-white
        p-6
        text-center
        shadow-2xl
      "
    >

      <div
        className="
          mx-auto
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-amber-50
          text-2xl
        "
      >
        🌱
      </div>


      <h3 className="
        mt-4
        text-lg
        font-black
        text-[#725a22]
      ">
        ساخت پروفایل پرستار ژنینو
      </h3>


      <p className="
        mt-3
        text-sm
        leading-7
        text-gray-600
      ">
        برای ثبت‌نام به عنوان پرستار کودک،
        ابتدا باید با حساب کاربری ژنینو وارد شوید.
        سپس می‌توانید پروفایل حرفه‌ای خود را بسازید.
      </p>


      <button
        onClick={() =>
          navigate("/login?next=/join/nurse")
        }
        className="
          mt-5
          w-full
          rounded-2xl
          bg-gradient-to-l
          from-[#d4af37]
          to-[#b98522]
          py-3
          text-sm
          font-black
          text-white
        "
      >
        ورود به حساب ژنینو
      </button>


      <button
        onClick={() =>
          navigate("/signup?next=/join/nurse")
        }
        className="
          mt-3
          w-full
          rounded-2xl
          border
          border-amber-200
          bg-amber-50
          py-3
          text-sm
          font-black
          text-[#725a22]
        "
      >
        ساخت حساب جدید
      </button>


      <button
        onClick={() => setShowLoginModal(false)}
        className="
          mt-4
          text-xs
          font-bold
          text-gray-400
        "
      >
        بعداً انجام می‌دهم
      </button>

    </div>

  </div>
)}
    </main>
  );
}