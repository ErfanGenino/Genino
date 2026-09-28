// src/pages/MyReservations.jsx

import {
  useEffect,
  useState,
} from "react";

import {
  Ticket,
  CalendarDays,
  Clock3,
  UsersRound,
  Building2,
  Hash,
} from "lucide-react";


export default function MyReservations() {

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL;


  const [
    reservations,
    setReservations
  ] = useState([]);


  const [
    loading,
    setLoading
  ] = useState(true);

  const [
  activeTab,
  setActiveTab
] = useState("upcoming");

  const loadReservations = async () => {

    try {

      const token =
        localStorage.getItem(
          "genino_token"
        );


      const res =
        await fetch(
          `${API_BASE_URL}/service-reservations/my`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );


      const data =
        await res.json();


      if (data.ok) {
        setReservations(
          data.reservations
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadReservations();
  }, []);

  const now = new Date();
const upcomingReservations =
  reservations.filter((item) => {
    if (!item.session?.startAt) {
      return true;
    }

    return (
      new Date(item.session.startAt) >= now
    );
  });

const pastReservations =
  reservations.filter((item) => {

    if (!item.session?.startAt) {
      return false;
    }
    return (
      new Date(item.session.startAt) < now
    );
  });

const displayedReservations =
  activeTab === "upcoming"
    ? upcomingReservations
    : activeTab === "past"
      ? pastReservations
      : reservations;



  if (loading) {

    return (

      <main
        dir="rtl"
        className="
          min-h-screen
          bg-[#f8f6fb]
          flex
          items-center
          justify-center
        "
      >

        <div
          className="
            rounded-2xl
            bg-white
            px-7
            py-5
            shadow-sm
            border
            border-purple-100
            font-bold
            text-[#76529a]
          "
        >
          در حال دریافت رزروها...
        </div>

      </main>

    );

  }



  return (

    <main
      dir="rtl"
      className="
        min-h-screen
        bg-[#f8f6fb]
        px-4
        py-16
        sm:px-6
      "
    >


      <div
        className="
          mx-auto
          max-w-5xl
        "
      >


        {/* PAGE HEADER */}

        <div
          className="
            mb-8
            text-center
          "
        >

          <div
            className="
              mx-auto
              mb-3
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-[#76529a]/10
            "
          >

            <Ticket
              className="
                h-6
                w-6
                text-[#76529a]
              "
            />

          </div>


          <h1
            className="
              text-2xl
              sm:text-3xl
              font-black
              text-[#3f2a54]
            "
          >
            رزروهای من
          </h1>


          <p
            className="
              mt-2
              text-sm
              font-medium
              text-stone-400
            "
          >
            فهرست رویدادها، کلاس‌ها و خدمات رزروشده
          </p>

          <div
  className="
    mt-6
    mx-auto
    flex
    w-fit
    max-w-full
    items-center
    gap-1
    rounded-2xl
    bg-white
    p-1.5
    border
    border-purple-100
    shadow-sm
  "
>

  <button
    type="button"
    onClick={() =>
      setActiveTab("upcoming")
    }
    className={`
      rounded-xl
      px-4
      py-2.5
      text-xs
      sm:text-sm
      font-black
      transition
      ${
        activeTab === "upcoming"
          ? `
            bg-[#76529a]
            text-white
            shadow-sm
          `
          : `
            text-stone-500
            hover:bg-purple-50
          `
      }
    `}
  >
    پیش رو

    <span
      className="
        mr-1.5
        opacity-70
      "
    >
      ({upcomingReservations.length})
    </span>

  </button>


  <button
    type="button"
    onClick={() =>
      setActiveTab("past")
    }
    className={`
      rounded-xl
      px-4
      py-2.5
      text-xs
      sm:text-sm
      font-black
      transition
      ${
        activeTab === "past"
          ? `
            bg-[#76529a]
            text-white
            shadow-sm
          `
          : `
            text-stone-500
            hover:bg-purple-50
          `
      }
    `}
  >
    گذشته

    <span
      className="
        mr-1.5
        opacity-70
      "
    >
      ({pastReservations.length})
    </span>

  </button>


  <button
    type="button"
    onClick={() =>
      setActiveTab("all")
    }
    className={`
      rounded-xl
      px-4
      py-2.5
      text-xs
      sm:text-sm
      font-black
      transition
      ${
        activeTab === "all"
          ? `
            bg-[#76529a]
            text-white
            shadow-sm
          `
          : `
            text-stone-500
            hover:bg-purple-50
          `
      }
    `}
  >
    همه

    <span
      className="
        mr-1.5
        opacity-70
      "
    >
      ({reservations.length})
    </span>

  </button>

</div>

        </div>



        {
          displayedReservations.length === 0 ? (

            <div
              className="
                mx-auto
                max-w-xl
                rounded-[28px]
                bg-white
                p-10
                text-center
                shadow-sm
                border
                border-purple-100
              "
            >

              <Ticket
                className="
                  mx-auto
                  mb-4
                  h-10
                  w-10
                  text-purple-200
                "
              />


              <p
  className="
    font-black
    text-stone-600
  "
>
  {
    activeTab === "upcoming"
      ? "رزرو پیش رویی ندارید."
      : activeTab === "past"
        ? "هنوز رزرو گذشته‌ای ندارید."
        : "هنوز رزروی ثبت نکرده‌اید."
  }
</p>


              <p
                className="
                  mt-2
                  text-sm
                  text-stone-400
                "
              >
                رزروهای شما پس از ثبت در این بخش نمایش داده می‌شوند.
              </p>

            </div>

          ) : (


            <div
              className="
                grid
                gap-4
                md:grid-cols-2
              "
            >

              {
                displayedReservations.map(
  (item) => {

    const isPast =
      item.session?.startAt &&
      new Date(item.session.startAt) < new Date();


      const getRemainingLabel = () => {

  if (!item.session?.startAt) {
    return null;
  }

  const today = new Date();
  const eventDate =
    new Date(item.session.startAt);

  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);

  const diffTime =
    eventDate.getTime() - today.getTime();

  const diffDays =
    Math.round(
      diffTime / (1000 * 60 * 60 * 24)
    );

  if (diffDays < 0) {
    return null;
  }

  if (diffDays === 0) {
    return "امروز";
  }

  if (diffDays === 1) {
    return "فردا";
  }
  return `${diffDays.toLocaleString("fa-IR")} روز مانده`;
};

const remainingLabel =
  getRemainingLabel();



    return (

      <div
                      key={item.id}
                      className={`
  group
  overflow-hidden
  rounded-[26px]
  bg-white
  border
  shadow-sm
  transition
  duration-300

  ${
    isPast
      ? `
        border-stone-200
        opacity-75
      `
      : `
        border-purple-100
        hover:-translate-y-1
        hover:shadow-lg
      `
  }
`}
                    >


                      {/* TOP */}

                      <div
                        className="
                          border-b
                          border-purple-50
                          px-5
                          py-4
                        "
                      >

                        <div
                          className="
                            flex
                            items-start
                            gap-3
                          "
                        >

                          <div
                            className="
                              flex
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              bg-[#76529a]/10
                            "
                          >

                            <Ticket
                              className="
                                h-5
                                w-5
                                text-[#76529a]
                              "
                            />

                          </div>


                          <div
                            className="
                              min-w-0
                              flex-1
                            "
                          >

                            <h2
                              className="
                                text-base
                                font-black
                                leading-7
                                text-[#3f2a54]
                              "
                            >
                              {item.service?.title}
                            </h2>


                            <div
                              className="
                                mt-1
                                flex
                                items-center
                                gap-1.5
                                text-xs
                                text-stone-400
                              "
                            >

                              <Building2
                                className="
                                  h-3.5
                                  w-3.5
                                "
                              />

                              <span>
                                {
                                  item.service
                                    ?.vendor
                                    ?.businessName
                                }
                              </span>

                            </div>

                          </div>

                          {isPast && (

  <span
    className="
      shrink-0
      rounded-full
      bg-stone-100
      px-2.5
      py-1
      text-[10px]
      font-black
      text-stone-500
    "
  >
    برگزار شده
  </span>

)}

{!isPast && remainingLabel && (

  <span
    className="
      shrink-0
      rounded-full
      bg-emerald-50
      px-2.5
      py-1
      text-[10px]
      font-black
      text-emerald-600
    "
  >
    {remainingLabel}
  </span>

)}

                        </div>

                      </div>



                      {/* INFO */}

                      <div
                        className="
                          grid
                          grid-cols-3
                          divide-x
                          divide-x-reverse
                          divide-purple-100
                          px-3
                          py-5
                        "
                      >


                        {/* DATE */}

                        <div
                          className="
                            flex
                            flex-col
                            items-center
                            gap-2
                            px-2
                            text-center
                          "
                        >

                          <CalendarDays
                            className="
                              h-5
                              w-5
                              text-[#76529a]
                            "
                          />

                          <span
                            className="
                              text-[11px]
                              text-stone-400
                            "
                          >
                            تاریخ
                          </span>

                          <strong
                            className="
                              text-xs
                              sm:text-sm
                              text-stone-700
                            "
                          >
                            {
                              new Date(
                                item.session?.startAt
                              )
                                .toLocaleDateString(
                                  "fa-IR"
                                )
                            }
                          </strong>

                        </div>



                        {/* TIME */}

                        <div
                          className="
                            flex
                            flex-col
                            items-center
                            gap-2
                            px-2
                            text-center
                          "
                        >

                          <Clock3
                            className="
                              h-5
                              w-5
                              text-[#76529a]
                            "
                          />

                          <span
                            className="
                              text-[11px]
                              text-stone-400
                            "
                          >
                            ساعت
                          </span>

                          <strong
                            className="
                              text-xs
                              sm:text-sm
                              text-stone-700
                            "
                          >
                            {
                              new Date(
                                item.session?.startAt
                              )
                                .toLocaleTimeString(
                                  "fa-IR",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                  }
                                )
                            }
                          </strong>

                        </div>



                        {/* QUANTITY */}

                        <div
                          className="
                            flex
                            flex-col
                            items-center
                            gap-2
                            px-2
                            text-center
                          "
                        >

                          <UsersRound
                            className="
                              h-5
                              w-5
                              text-[#76529a]
                            "
                          />

                          <span
                            className="
                              text-[11px]
                              text-stone-400
                            "
                          >
                            تعداد
                          </span>

                          <strong
                            className="
                              text-xs
                              sm:text-sm
                              text-stone-700
                            "
                          >
                            {item.quantity} نفر
                          </strong>

                        </div>


                      </div>



                      {/* RESERVATION CODE */}

                      <div
                        className="
                          mx-4
                          mb-4
                          flex
                          items-center
                          justify-between
                          gap-3
                          rounded-2xl
                          bg-[#f7f2fc]
                          px-4
                          py-3
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                            text-xs
                            font-bold
                            text-stone-500
                          "
                        >

                          <Hash
                            className="
                              h-4
                              w-4
                              text-[#76529a]
                            "
                          />

                          کد رزرو

                        </div>


                        <span
                          className="
                            font-black
                            tracking-widest
                            text-[#76529a]
                          "
                        >
                          {item.reservationCode}
                        </span>

                      </div>


                    </div>

                  )})
              }

            </div>

          )
        }


      </div>

    </main>

  );

}