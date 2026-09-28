import { useEffect, useMemo, useState } from "react";
import {
  UserRound,
  MapPin,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  Clock3,
  RefreshCw,
  History,
} from "lucide-react";

export default function AdminNurses() {
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost";

  const [nurses, setNurses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] =
    useState(null);

  const [filter, setFilter] =
    useState("PENDING");

  const [selectedNurse, setSelectedNurse] =
    useState(null);

  const [reason, setReason] =
    useState("");

  const adminToken =
    localStorage.getItem("adminToken");


  const fetchNurses = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/admin/nurses`,
        {
          headers: {
            Authorization:
              `Bearer ${adminToken}`,
          },
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "خطا در دریافت پرستاران"
        );
      }

      setNurses(
        Array.isArray(data.nurses)
          ? data.nurses
          : []
      );

    } catch (error) {
      console.error(
        "ADMIN NURSES FETCH ERROR:",
        error
      );

      alert(
        error.message ||
          "خطا در دریافت درخواست‌های پرستاران."
      );

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchNurses();
  }, []);


  const filteredNurses =
    useMemo(() => {

      if (filter === "ALL") {
        return nurses;
      }

      return nurses.filter(
        (nurse) =>
          nurse.status === filter
      );

    }, [nurses, filter]);


  const changeStatus = async (
    nurse,
    status
  ) => {

    try {

      if (
        status === "REJECTED" &&
        !reason.trim()
      ) {
        alert(
          "لطفاً علت رد درخواست را وارد کنید."
        );
        return;
      }

      if (
        status === "SUSPENDED" &&
        !reason.trim()
      ) {
        alert(
          "لطفاً علت تعلیق را وارد کنید."
        );
        return;
      }


      setActionLoading(
        `${nurse.id}-${status}`
      );


      const response = await fetch(
        `${API_BASE_URL}/admin/nurses/${nurse.id}/status`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${adminToken}`,
          },

          body: JSON.stringify({
            status,
            reason:
              reason.trim() || null,
          }),
        }
      );


      const data =
        await response.json();


      if (!response.ok) {
        throw new Error(
          data.message ||
            "خطا در تغییر وضعیت"
        );
      }


      setNurses((prev) =>
        prev.map((item) =>
          item.id === nurse.id
            ? data.nurse
            : item
        )
      );


      setSelectedNurse(
        data.nurse
      );

      setReason("");


      alert(
        data.message ||
          "وضعیت با موفقیت تغییر کرد."
      );

    } catch (error) {

      console.error(
        "NURSE STATUS ERROR:",
        error
      );

      alert(
        error.message ||
          "خطا در تغییر وضعیت پرستار."
      );

    } finally {

      setActionLoading(null);

    }
  };


  const statusLabels = {
    PENDING: "در انتظار بررسی",
    APPROVED: "تأیید شده",
    REJECTED: "رد شده",
    SUSPENDED: "تعلیق شده",
  };


  const statusClasses = {
    PENDING:
      "bg-amber-50 text-amber-700",

    APPROVED:
      "bg-emerald-50 text-emerald-700",

    REJECTED:
      "bg-red-50 text-red-600",

    SUSPENDED:
      "bg-stone-200 text-stone-700",
  };


  const documentsList =
    selectedNurse
      ? [
          {
            title: "کارت ملی",
            url:
              selectedNurse.nationalIdUrl,
            required: true,
          },
          {
            title: "شناسنامه",
            url:
              selectedNurse.birthCertificateUrl,
            required: true,
          },
          {
            title:
              "گواهی عدم سوءپیشینه",
            url:
              selectedNurse.criminalRecordUrl,
            required: true,
          },
          {
            title:
              "گواهی دوره‌های آموزشی",
            url:
              selectedNurse.certificatesUrl,
          },
          {
            title: "مدارک تحصیلی",
            url:
              selectedNurse.educationUrl,
          },
          {
            title: "سابقه کاری",
            url:
              selectedNurse.experienceDocUrl,
          },
        ]
      : [];


  return (
    <main
      dir="rtl"
      className="
        min-h-screen
        bg-stone-100
        px-4
        py-6
        text-stone-800
      "
    >

      <div
        className="
          mx-auto
          max-w-7xl
        "
      >

        <div
          className="
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <div>

            <h1
              className="
                text-2xl
                font-black
                text-stone-800
              "
            >
              مدیریت پرستاران کودک
            </h1>

            <p
              className="
                mt-2
                text-sm
                text-stone-500
              "
            >
              بررسی اطلاعات، مدارک و وضعیت
              درخواست‌های پرستاران ژنینو
            </p>

          </div>


          <button
            type="button"
            onClick={fetchNurses}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-stone-200
              bg-white
              px-4
              py-2.5
              text-sm
              font-bold
              text-stone-600
              shadow-sm
            "
          >
            <RefreshCw size={16} />

            بروزرسانی
          </button>

        </div>


        {/* فیلتر وضعیت */}

        <div
          className="
            mt-6
            flex
            gap-2
            overflow-x-auto
            rounded-2xl
            bg-white
            p-2
            shadow-sm
          "
        >

          {[
            ["PENDING", "در انتظار"],
            ["APPROVED", "تأیید شده"],
            ["REJECTED", "رد شده"],
            ["SUSPENDED", "تعلیق"],
            ["ALL", "همه"],
          ].map(([key, title]) => (

            <button
              type="button"
              key={key}
              onClick={() =>
                setFilter(key)
              }
              className={`
                whitespace-nowrap
                rounded-xl
                px-4
                py-2
                text-xs
                font-black
                transition

                ${
                  filter === key
                    ? "bg-amber-100 text-amber-800"
                    : "text-stone-500 hover:bg-stone-50"
                }
              `}
            >
              {title}
            </button>

          ))}

        </div>


        {loading ? (

          <div
            className="
              mt-8
              rounded-2xl
              bg-white
              p-10
              text-center
              text-sm
              text-stone-500
            "
          >
            در حال دریافت درخواست‌ها...
          </div>

        ) : filteredNurses.length === 0 ? (

          <div
            className="
              mt-8
              rounded-2xl
              bg-white
              p-10
              text-center
              shadow-sm
            "
          >

            <UserRound
              className="
                mx-auto
                text-stone-300
              "
              size={40}
            />

            <p
              className="
                mt-3
                text-sm
                font-bold
                text-stone-500
              "
            >
              درخواستی در این بخش وجود ندارد.
            </p>

          </div>

        ) : (

          <div
            className="
              mt-6
              grid
              gap-4
              lg:grid-cols-2
            "
          >

            {filteredNurses.map(
              (nurse) => (

                <article
                  key={nurse.id}
                  className="
                    rounded-2xl
                    border
                    border-stone-200
                    bg-white
                    p-5
                    shadow-sm
                  "
                >

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-3
                    "
                  >

                    <div>

                      <h2
                        className="
                          text-lg
                          font-black
                          text-stone-800
                        "
                      >
                        {nurse.fullName}
                      </h2>

                      <p
                        className="
                          mt-1
                          text-xs
                          text-stone-400
                        "
                      >
                        شناسه درخواست:
                        {" "}
                        {nurse.id}
                      </p>

                    </div>


                    <span
                      className={`
                        rounded-full
                        px-3
                        py-1.5
                        text-xs
                        font-black

                        ${
                          statusClasses[
                            nurse.status
                          ]
                        }
                      `}
                    >
                      {
                        statusLabels[
                          nurse.status
                        ]
                      }
                    </span>

                  </div>


                  <div
                    className="
                      mt-4
                      space-y-2
                      text-sm
                      text-stone-600
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <MapPin
                        size={16}
                        className="
                          text-amber-600
                        "
                      />

                      {nurse.city}

                      {nurse.district &&
                        `، ${nurse.district}`}
                    </div>


                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <Phone
                        size={16}
                        className="
                          text-emerald-600
                        "
                      />

                      {nurse.phone}
                    </div>


                    {nurse.user?.email && (

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >
                        <Mail
                          size={16}
                          className="
                            text-sky-600
                          "
                        />

                        {nurse.user.email}
                      </div>

                    )}

                  </div>


                  <button
                    type="button"
                    onClick={() => {
                      setSelectedNurse(
                        nurse
                      );

                      setReason("");
                    }}
                    className="
                      mt-5
                      w-full
                      rounded-xl
                      bg-stone-800
                      py-2.5
                      text-sm
                      font-black
                      text-white
                    "
                  >
                    مشاهده و بررسی درخواست
                  </button>

                </article>

              )
            )}

          </div>

        )}

      </div>


      {/* مودال جزئیات */}

      {selectedNurse && (

        <div
          className="
            fixed
            inset-0
            z-50
            overflow-y-auto
            bg-black/40
            px-4
            py-8
            backdrop-blur-sm
          "
          onClick={() =>
            setSelectedNurse(null)
          }
        >

          <div
            className="
              mx-auto
              max-w-3xl
              rounded-3xl
              bg-white
              p-5
              shadow-2xl
              sm:p-7
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div
              className="
                flex
                items-start
                justify-between
                gap-4
              "
            >

              <div>

                <h2
                  className="
                    text-xl
                    font-black
                  "
                >
                  {selectedNurse.fullName}
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-stone-400
                  "
                >
                  بررسی درخواست پرستاری
                </p>

              </div>


              <button
                type="button"
                onClick={() =>
                  setSelectedNurse(null)
                }
                className="
                  rounded-xl
                  bg-stone-100
                  px-3
                  py-2
                  text-sm
                  font-bold
                  text-stone-500
                "
              >
                بستن
              </button>

            </div>


            {/* اطلاعات */}

            <div
              className="
                mt-6
                grid
                gap-3
                sm:grid-cols-2
              "
            >

              <Info
                title="شهر"
                value={
                  selectedNurse.city
                }
              />

              <Info
                title="منطقه"
                value={
                  selectedNurse.district ||
                  "ثبت نشده"
                }
              />

              <Info
                title="شماره تماس"
                value={
                  selectedNurse.phone
                }
              />

              <Info
                title="سابقه"
                value={
                  selectedNurse.experience ||
                  "ثبت نشده"
                }
              />

            </div>


            {selectedNurse.bio && (

              <div
                className="
                  mt-4
                  rounded-2xl
                  bg-stone-50
                  p-4
                "
              >

                <div
                  className="
                    text-xs
                    font-black
                    text-stone-500
                  "
                >
                  معرفی پرستار
                </div>

                <p
                  className="
                    mt-2
                    whitespace-pre-wrap
                    text-sm
                    leading-7
                    text-stone-700
                  "
                >
                  {selectedNurse.bio}
                </p>

              </div>

            )}


            <Tags
              title="گروه‌های سنی"
              items={selectedNurse.ages}
            />

            <Tags
              title="مهارت‌ها"
              items={selectedNurse.skills}
            />

            <Tags
              title="نوع همکاری"
              items={selectedNurse.workTypes}
            />

            {/* تاریخچه بررسی پرونده */}

<div className="mt-6">

  <h3
    className="
      flex
      items-center
      gap-2
      text-base
      font-black
      text-stone-800
    "
  >
    <History size={18} />

    تاریخچه بررسی پرونده
  </h3>


  <div
    className="
      mt-3
      space-y-3
    "
  >

    {/* ثبت اولیه */}

    <div
      className="
        rounded-2xl
        border
        border-stone-200
        bg-stone-50
        p-4
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
          gap-3
        "
      >

        <span
          className="
            text-sm
            font-black
            text-stone-700
          "
        >
          ثبت درخواست پرستاری
        </span>

        <span
          className="
            text-xs
            text-stone-400
          "
        >
          {selectedNurse.createdAt
            ? new Date(
                selectedNurse.createdAt
              ).toLocaleString("fa-IR")
            : ""}
        </span>

      </div>

      <p
        className="
          mt-2
          text-xs
          leading-6
          text-stone-500
        "
      >
        درخواست اولیه توسط کاربر برای بررسی
        ژنینو ارسال شد.
      </p>

    </div>


    {/* عملیات ادمین */}

    {Array.isArray(
      selectedNurse.reviewHistories
    ) &&
    selectedNurse.reviewHistories.length > 0 ? (

      selectedNurse.reviewHistories.map(
        (history) => {

          const actionLabels = {
            APPROVED: "تأیید درخواست",
            REJECTED: "رد درخواست",
            SUSPENDED: "تعلیق پرستار",
            CORRECTION_REQUESTED:
              "درخواست اصلاح",
            RESUBMITTED:
              "ارسال مجدد توسط کاربر",
          };


          const actionClasses = {
            APPROVED:
              "bg-emerald-50 border-emerald-200",

            REJECTED:
              "bg-red-50 border-red-200",

            SUSPENDED:
              "bg-stone-100 border-stone-300",

            CORRECTION_REQUESTED:
              "bg-amber-50 border-amber-200",

            RESUBMITTED:
              "bg-sky-50 border-sky-200",
          };


          return (

            <div
              key={history.id}
              className={`
                rounded-2xl
                border
                p-4

                ${
                  actionClasses[
                    history.action
                  ] ||
                  "bg-white border-stone-200"
                }
              `}
            >

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  justify-between
                  gap-2
                "
              >

                <span
                  className="
                    text-sm
                    font-black
                    text-stone-800
                  "
                >
                  {actionLabels[
                    history.action
                  ] || history.action}
                </span>


                <span
                  className="
                    text-xs
                    text-stone-400
                  "
                >
                  {history.createdAt
                    ? new Date(
                        history.createdAt
                      ).toLocaleString(
                        "fa-IR"
                      )
                    : ""}
                </span>

              </div>


              {history.message && (

                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-stone-600
                  "
                >
                  {history.message}
                </p>

              )}


              {history.admin && (

                <div
                  className="
                    mt-2
                    text-xs
                    font-bold
                    text-stone-400
                  "
                >
                  انجام‌دهنده:{" "}

                  {history.admin.fullName ||
                    history.admin.username ||
                    "مدیر ژنینو"}
                </div>

              )}

            </div>

          );

        }
      )

    ) : (

      <div
        className="
          rounded-2xl
          border
          border-dashed
          border-stone-200
          p-4
          text-center
          text-xs
          text-stone-400
        "
      >
        هنوز سابقه دیگری برای این پرونده
        ثبت نشده است.
      </div>

    )}

  </div>
</div>


            {/* مدارک */}

            <div className="mt-6">

              <h3
                className="
                  flex
                  items-center
                  gap-2
                  text-base
                  font-black
                "
              >
                <FileText size={18} />

                مدارک ارسالی
              </h3>


              <div
                className="
                  mt-3
                  grid
                  gap-3
                  sm:grid-cols-2
                "
              >

                {documentsList.map(
                  (doc) => (

                    <div
                      key={doc.title}
                      className="
                        rounded-2xl
                        border
                        border-stone-200
                        p-4
                      "
                    >

                      <div
                        className="
                          text-sm
                          font-bold
                        "
                      >
                        {doc.title}
                      </div>


                      {doc.url ? (

                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noreferrer"
                          className="
                            mt-3
                            inline-block
                            text-xs
                            font-black
                            text-blue-600
                          "
                        >
                          مشاهده مدرک
                        </a>

                      ) : (

                        <div
                          className="
                            mt-3
                            text-xs
                            text-stone-400
                          "
                        >
                          فایل ارسال نشده
                        </div>

                      )}

                    </div>

                  )
                )}

              </div>

            </div>


            {/* دلیل رد یا تعلیق */}

            <div className="mt-6">

              <label
                className="
                  text-sm
                  font-black
                  text-stone-700
                "
              >
                توضیح ادمین
              </label>

              <textarea
                value={reason}
                onChange={(e) =>
                  setReason(
                    e.target.value
                  )
                }
                placeholder="
                  در صورت رد یا تعلیق،
                  علت را بنویسید...
                "
                className="
                  mt-2
                  h-24
                  w-full
                  rounded-2xl
                  border
                  border-stone-200
                  p-3
                  text-sm
                  outline-none
                  focus:border-amber-300
                "
              />

            </div>


            {/* اکشن‌ها */}

            <div
              className="
                mt-6
                grid
                gap-2
                sm:grid-cols-3
              "
            >

              <button
                type="button"
                disabled={
                  actionLoading !== null
                }
                onClick={() =>
                  changeStatus(
                    selectedNurse,
                    "APPROVED"
                  )
                }
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-emerald-600
                  px-4
                  py-3
                  text-sm
                  font-black
                  text-white
                  disabled:opacity-50
                "
              >
                <CheckCircle2 size={18} />

                تأیید
              </button>


              <button
                type="button"
                disabled={
                  actionLoading !== null
                }
                onClick={() =>
                  changeStatus(
                    selectedNurse,
                    "REJECTED"
                  )
                }
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-red-600
                  px-4
                  py-3
                  text-sm
                  font-black
                  text-white
                  disabled:opacity-50
                "
              >
                <XCircle size={18} />

                رد درخواست
              </button>


              <button
                type="button"
                disabled={
                  actionLoading !== null
                }
                onClick={() =>
                  changeStatus(
                    selectedNurse,
                    "SUSPENDED"
                  )
                }
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-stone-700
                  px-4
                  py-3
                  text-sm
                  font-black
                  text-white
                  disabled:opacity-50
                "
              >
                <ShieldAlert size={18} />

                تعلیق
              </button>

            </div>


            {selectedNurse.status ===
              "PENDING" && (

              <div
                className="
                  mt-4
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-amber-50
                  p-3
                  text-xs
                  font-bold
                  text-amber-700
                "
              >
                <Clock3 size={16} />

                این درخواست هنوز توسط ژنینو
                بررسی نشده است.
              </div>

            )}

          </div>

        </div>

      )}

    </main>
  );
}


function Info({
  title,
  value,
}) {

  return (
    <div
      className="
        rounded-xl
        bg-stone-50
        px-4
        py-3
      "
    >

      <div
        className="
          text-xs
          text-stone-400
        "
      >
        {title}
      </div>

      <div
        className="
          mt-1
          text-sm
          font-bold
          text-stone-700
        "
      >
        {value}
      </div>

    </div>
  );
}


function Tags({
  title,
  items,
}) {

  if (
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return null;
  }

  return (
    <div className="mt-5">

      <div
        className="
          text-sm
          font-black
          text-stone-700
        "
      >
        {title}
      </div>


      <div
        className="
          mt-2
          flex
          flex-wrap
          gap-2
        "
      >

        {items.map((item) => (

          <span
            key={item}
            className="
              rounded-full
              bg-amber-50
              px-3
              py-1.5
              text-xs
              font-bold
              text-amber-800
            "
          >
            {item}
          </span>

        ))}

      </div>

    </div>
  );
}