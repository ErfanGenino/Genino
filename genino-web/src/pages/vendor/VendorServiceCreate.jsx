// ============================================================================
// File: src/pages/vendor/VendorServiceCreate.jsx
// Description: ساخت و ویرایش خدمت جدید برای فروشنده ژنینو
// ============================================================================

import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  Plus,
  Trash2,
  UsersRound,
  Package,
} from "lucide-react";
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";


export default function VendorServiceCreate() {

  const navigate = useNavigate();

  const { serviceId } = useParams();

  const [searchParams] =
    useSearchParams();


  const isEditMode =
    Boolean(serviceId);


  const pageSource =
    searchParams.get("source");

  const sourceVendorId =
    searchParams.get("vendorId");

  const editMode =
  searchParams.get("mode");


  const isSchoolSource =
  pageSource === "school" &&
  Boolean(sourceVendorId);

const isKindergartenSource =
  pageSource === "kindergarten" &&
  Boolean(sourceVendorId);

  const isPlayhouseSource =
  pageSource === "playhouse" &&
  Boolean(sourceVendorId);

  const isEducationClassSource =
  pageSource === "education-class" &&
  Boolean(sourceVendorId);

  const isSportClassSource =
  pageSource === "sport-class" &&
  Boolean(sourceVendorId);

  const isArtClassSource =
  pageSource === "art-class" &&
  Boolean(sourceVendorId);

  const isPrivateTeacherSource =
  pageSource === "private-teacher" &&
  Boolean(sourceVendorId);




/*
|--------------------------------------------------------------------------
| مسیر بازگشت
|--------------------------------------------------------------------------
*/

const getReturnPath = (
  currentVendorId
) => {

  if (isSchoolSource) {
    return `/vendor/service/school/${
      sourceVendorId ||
      currentVendorId
    }`;
  }

  if (isKindergartenSource) {
    return `/vendor/service/kindergarten/${
      sourceVendorId ||
      currentVendorId
    }`;
  }

  if (isPlayhouseSource) {
    return `/vendor/service/playhouse/${
      sourceVendorId ||
      currentVendorId
    }`;
  }

  if (isEducationClassSource) {
  return `/vendor/service/education-class/${
    sourceVendorId ||
    currentVendorId
  }`;
}

  if (isSportClassSource) {
  return `/vendor/service/sport-class/${
    sourceVendorId ||
    currentVendorId
  }`;
}

  if (isArtClassSource) {
  return `/vendor/service/art-class/${
    sourceVendorId ||
    currentVendorId
  }`;
}

  if (isPrivateTeacherSource) {
  return `/vendor/service/private-teacher/${
    sourceVendorId ||
    currentVendorId
  }`;
}

  return `/vendor/shop/${currentVendorId}`;
};


  /*
  |--------------------------------------------------------------------------
  | State
  |--------------------------------------------------------------------------
  */

  const [title, setTitle] =
    useState("");

  const [
    serviceType,
    setServiceType,
  ] = useState("EVENT");

  const [
  scheduleMode,
  setScheduleMode,
] = useState("SESSION");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
  packageInfo,
  setPackageInfo,
] = useState({

  title: "",

  startDate: "",

  totalSessions: "",

  weekdays: [],

  startTime: "",

  endTime: "",

  capacity: "",

});


  const createEmptySession = () => ({
  id: crypto.randomUUID(),

  dbId: null,

  startTime: "",
  endTime: "",
  capacity: "",
});


const createEmptyDay = () => ({
  id: crypto.randomUUID(),
  date: "",
  sessions: [
    createEmptySession(),
  ],
});


const [
  scheduleDays,
  setScheduleDays,
] = useState([
  createEmptyDay(),
]);

  // مهلت رزرو
  const [
    deadlineDate,
    setDeadlineDate,
  ] = useState("");

  const [
    deadlineTime,
    setDeadlineTime,
  ] = useState("");


  


  // سن
  const [
    minAge,
    setMinAge,
  ] = useState("");

  const [
    maxAge,
    setMaxAge,
  ] = useState("");


  // هزینه
  const [
    isFree,
    setIsFree,
  ] = useState(true);

  const [
    price,
    setPrice,
  ] = useState("");


  // محل
  const [
    locationName,
    setLocationName,
  ] = useState("");

  const [
    address,
    setAddress,
  ] = useState("");

  const [
    contactPhone,
    setContactPhone,
  ] = useState("");


  // قوانین
  const [
    rules,
    setRules,
  ] = useState("");


  // تصاویر
  const [
    images,
    setImages,
  ] = useState([]);

  const [
    mainImageIndex,
    setMainImageIndex,
  ] = useState(0);


  const [
    openGallery,
    setOpenGallery,
  ] = useState(false);

  const [
    activeImageIndex,
    setActiveImageIndex,
  ] = useState(0);


  // وضعیت فرم
  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    showSuccessModal,
    setShowSuccessModal,
  ] = useState(false);

  const [
    validationErrors,
    setValidationErrors,
  ] = useState([]);

  const [
    hasReservations,
    setHasReservations,
  ] = useState(false);


  /*
  |--------------------------------------------------------------------------
  | انواع خدمت
  |--------------------------------------------------------------------------
  */

  const serviceTypeOptions = [

    {
      value: "EVENT",
      label: "جشن و رویداد",
      description:
        "جشن کودک، جشن مناسبتی، مسابقه و برنامه‌های ویژه",
    },

    {
      value: "CLASS",
      label: "کلاس",
      description:
        "کلاس آموزشی، هنری، ورزشی و دوره‌های مختلف",
    },

    {
      value: "WORKSHOP",
      label: "کارگاه",
      description:
        "کارگاه‌های آموزشی، خلاقیت، مادر و کودک و مشابه",
    },

    {
      value: "CAMP",
      label: "اردو",
      description:
        "اردو، بازدید علمی، گردش و برنامه خارج از مجموعه",
    },

    {
      value: "CONSULTATION",
      label: "مشاوره",
      description:
        "جلسه مشاوره یا خدمات تخصصی قابل رزرو",
    },

    {
      value: "OTHER",
      label: "سایر خدمات",
      description:
        "هر خدمت قابل رزروی که در دسته‌های بالا قرار نمی‌گیرد",
    },

  ];


  /*
  |--------------------------------------------------------------------------
  | ابزارهای تاریخ
  |--------------------------------------------------------------------------
  */

  const toEnglishNumber = (
    value = ""
  ) =>
    String(value).replace(
      /[۰-۹]/g,
      (digit) => {
        return "0123456789"[
          "۰۱۲۳۴۵۶۷۸۹".indexOf(
            digit
          )
        ];
      }
    );


  const gregorianToPersianDate = (
    value
  ) => {

    if (!value) return "";

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "";
    }

    return new DateObject({
      date,
      calendar:
        "gregorian",
    })
      .convert(
        persian,
        persian_fa
      )
      .format(
        "YYYY-MM-DD"
      );

  };


  const getTimeFromDate = (
    value
  ) => {

    if (!value) return "";

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "";
    }

    const hours =
      String(
        date.getHours()
      ).padStart(2, "0");

    const minutes =
      String(
        date.getMinutes()
      ).padStart(2, "0");

    return `${hours}:${minutes}`;

  };


  /*
|--------------------------------------------------------------------------
| مدیریت روزها و سانس‌ها
|--------------------------------------------------------------------------
*/

const updateDayDate = (
  dayId,
  date
) => {

  setScheduleDays(
    (prev) =>
      prev.map(
        (day) =>
          day.id === dayId
            ? {
                ...day,
                date,
              }
            : day
      )
  );

};


const addDay = () => {

  setScheduleDays(
    (prev) => [
      ...prev,
      createEmptyDay(),
    ]
  );

};


const removeDay = (
  dayId
) => {

  setScheduleDays(
    (prev) => {

      if (
        prev.length <= 1
      ) {
        return prev;
      }

      return prev.filter(
        (day) =>
          day.id !== dayId
      );

    }
  );

};


const addSession = (
  dayId
) => {

  setScheduleDays(
    (prev) =>
      prev.map(
        (day) =>
          day.id === dayId

            ? {
                ...day,

                sessions: [
                  ...day.sessions,
                  createEmptySession(),
                ],
              }

            : day
      )
  );

};


const updateSession = (
  dayId,
  sessionId,
  field,
  value
) => {

  setScheduleDays(
    (prev) =>
      prev.map(
        (day) =>
          day.id === dayId

            ? {
                ...day,

                sessions:
                  day.sessions.map(
                    (session) =>
                      session.id ===
                      sessionId

                        ? {
                            ...session,
                            [field]:
                              value,
                          }

                        : session
                  ),
              }

            : day
      )
  );

};


const removeSession = (
  dayId,
  sessionId
) => {

  setScheduleDays(
    (prev) =>
      prev.map(
        (day) => {

          if (
            day.id !== dayId
          ) {
            return day;
          }


          if (
            day.sessions.length <=
            1
          ) {
            return day;
          }


          return {
            ...day,

            sessions:
              day.sessions.filter(
                (session) =>
                  session.id !==
                  sessionId
              ),
          };

        }
      )
  );

};


  /*
  |--------------------------------------------------------------------------
  | تبدیل تاریخ شمسی + ساعت به ISO
  |--------------------------------------------------------------------------
  */

  const persianDateTimeToIso = (
    dateValue,
    timeValue = "00:00"
  ) => {

    if (!dateValue) {
      return null;
    }

    try {

      const normalizedDate =
        typeof dateValue ===
          "object" &&
        dateValue?.format
          ? dateValue.format(
              "YYYY-MM-DD"
            )
          : toEnglishNumber(
              String(
                dateValue
              )
            ).replace(
              /\//g,
              "-"
            );


      const persianDate =
        new DateObject({

          date:
            normalizedDate,

          format:
            "YYYY-MM-DD",

          calendar:
            persian,

          locale:
            persian_fa,

        });


      const gregorianDate =
        persianDate
          .convert(
            "gregorian"
          )
          .toDate();


      if (
        !(
          gregorianDate
          instanceof Date
        ) ||
        Number.isNaN(
          gregorianDate.getTime()
        )
      ) {

        return null;

      }


      const [
        hour,
        minute,
      ] =
        String(
          timeValue ||
          "00:00"
        )
          .split(":")
          .map(Number);


      gregorianDate.setHours(
        hour || 0,
        minute || 0,
        0,
        0
      );


      return gregorianDate
        .toISOString();

    } catch (error) {

      console.error(
        "SERVICE DATE CONVERSION ERROR:",
        error
      );

      return null;

    }

  };


  /*
  |--------------------------------------------------------------------------
  | قیمت
  |--------------------------------------------------------------------------
  */

  const formatPrice = (
    value
  ) => {

    const numbers =
      String(
        value || ""
      ).replace(
        /\D/g,
        ""
      );

    return numbers.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    );

  };


  const handlePriceChange = (
    e
  ) => {

    setPrice(
      formatPrice(
        e.target.value
      )
    );

  };


  /*
  |--------------------------------------------------------------------------
  | تشخیص خطای فیلد
  |--------------------------------------------------------------------------
  */

  const hasError = (
    name
  ) => {

    return validationErrors
      .includes(name);

  };


  /*
  |--------------------------------------------------------------------------
  | بارگذاری خدمت در حالت ویرایش
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    if (!isEditMode) {
      return;
    }


    async function loadService() {

      try {

        const res =
          await fetch(

            `${
              import.meta.env
                .VITE_API_BASE_URL
            }/vendor-services/${serviceId}`,

            {

              headers: {

                Authorization:
                  `Bearer ${
                    localStorage
                      .getItem(
                        "genino_token"
                      )
                  }`,

              },

            }

          );


        const data =
          await res.json();


        if (
          !data.ok ||
          !data.service
        ) {

          alert(
            data.message ||
            "خدمت پیدا نشد"
          );

          return;

        }


        const service =
          data.service;

          setHasReservations(
  Boolean(
    service.hasReservations
  )
);

        if (
  service.scheduleMode
) {

  setScheduleMode(
    service.scheduleMode
  );

}


        setTitle(
          service.title ||
          ""
        );

        setServiceType(
          service.serviceType ||
          "EVENT"
        );

        setDescription(
          service.description ||
          ""
        );

        if (
  service.scheduleMode === "PACKAGE" &&
  service.package
) {

  setScheduleMode("PACKAGE");

  setPackageInfo({

    title:
      service.package.title || "",

    startDate:
      gregorianToPersianDate(
        service.package.startDate
      ),

    totalSessions:
      String(
        service.package.totalSessions || ""
      ),

    weekdays:
      service.package.weekdays || [],

    startTime:
      service.package.startTime || "",

    endTime:
      service.package.endTime || "",

    capacity:
      String(
        service.package.capacity || ""
      ),

  });

}


        setDeadlineDate(
          gregorianToPersianDate(
            service.reservationDeadline
          )
        );

        setDeadlineTime(
          getTimeFromDate(
            service.reservationDeadline
          )
        );

        if (
  Array.isArray(
    service.sessions
  ) &&
  service.sessions.length > 0
) {

  const grouped = {};


  service.sessions.forEach(
    (session) => {

      const date =
        gregorianToPersianDate(
          session.startAt
        );


      if (!grouped[date]) {

        grouped[date] = {
          id:
            crypto.randomUUID(),

          date,

          sessions: [],
        };

      }


      grouped[
  date
].sessions.push({

  id:
    String(
      session.id ||
      crypto.randomUUID()
    ),

  dbId:
    session.id,

  startTime:
    getTimeFromDate(
      session.startAt
    ),

  endTime:
    getTimeFromDate(
      session.endAt
    ),

  capacity:
    String(
      session.capacity ||
      ""
    ),

});

    }
  );


  setScheduleDays(
    Object.values(grouped)
  );

}


        setMinAge(
          service.minAge ===
            null ||
          service.minAge ===
            undefined
            ? ""
            : String(
                service.minAge
              )
        );


        setMaxAge(
          service.maxAge ===
            null ||
          service.maxAge ===
            undefined
            ? ""
            : String(
                service.maxAge
              )
        );


        setIsFree(
          Boolean(
            service.isFree
          )
        );


        setPrice(
          service.price
            ? formatPrice(
                service.price
              )
            : ""
        );


        setLocationName(
          service.locationName ||
          ""
        );

        setAddress(
          service.address ||
          ""
        );

        setContactPhone(
          service.contactPhone ||
          ""
        );

        setRules(
          service.rules ||
          ""
        );


        setImages(
          Array.isArray(
            service.images
          )
            ? service.images
            : []
        );


        setMainImageIndex(
          service.mainImageIndex ||
          0
        );


      } catch (error) {

        console.error(
          "LOAD SERVICE ERROR:",
          error
        );

        alert(
          "خطا در دریافت اطلاعات خدمت."
        );

      }

    }


    loadService();

  }, [
    isEditMode,
    serviceId,
  ]);


  /*
  |--------------------------------------------------------------------------
  | تصاویر
  |--------------------------------------------------------------------------
  */

  const handleImageChange = (
    e
  ) => {

    const files =
      Array.from(
        e.target.files ||
        []
      );


    if (
      files.length +
        images.length >
      10
    ) {

      alert(
        "حداکثر ۱۰ تصویر برای هر خدمت مجاز است."
      );

      return;

    }


    setImages(
      (prev) => [
        ...prev,
        ...files,
      ]
    );

  };


  const removeImage = (
    index
  ) => {

    setImages(
      (prev) =>
        prev.filter(
          (_, i) =>
            i !== index
        )
    );


    setMainImageIndex(
      (prev) => {

        if (
          prev === index
        ) {
          return 0;
        }

        if (
          index < prev
        ) {
          return prev - 1;
        }

        return prev;

      }
    );

  };


  const moveImage = (
    fromIndex,
    toIndex
  ) => {

    if (
      toIndex < 0 ||
      toIndex >=
        images.length
    ) {
      return;
    }


    const updated =
      [...images];


    [
      updated[fromIndex],
      updated[toIndex],
    ] = [
      updated[toIndex],
      updated[fromIndex],
    ];


    setImages(updated);


    if (
      mainImageIndex ===
      fromIndex
    ) {

      setMainImageIndex(
        toIndex
      );

    } else if (
      mainImageIndex ===
      toIndex
    ) {

      setMainImageIndex(
        fromIndex
      );

    }

  };


  const nextImage = () => {

    setActiveImageIndex(
      (prev) =>
        prev ===
        images.length - 1
          ? 0
          : prev + 1
    );

  };


  const prevImage = () => {

    setActiveImageIndex(
      (prev) =>
        prev === 0
          ? images.length - 1
          : prev - 1
    );

  };


  /*
  |--------------------------------------------------------------------------
  | آپلود تصویر خدمت روی آروان
  |--------------------------------------------------------------------------
  */

  const uploadImageToArvan =
    async (file) => {

      const token =
        localStorage.getItem(
          "genino_token"
        );


      const res =
        await fetch(

          `${
            import.meta.env
              .VITE_API_BASE_URL
          }/uploads/presign/vendor-service-image`,

          {

            method:
              "POST",

            headers: {

              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,

            },

            body:
              JSON.stringify({

                ext:
                  file.name
                    ?.includes(".")
                    ? file.name
                        .split(".")
                        .pop()
                    : file.type
                        ?.split("/")
                        .pop(),

                contentType:
                  file.type,

                fileName:
                  file.name,

                fileSize:
                  file.size,

              }),

          }

        );


      const data =
        await res.json();


      if (!data.ok) {

        throw new Error(
          data.message ||
          "آماده‌سازی آپلود تصویر انجام نشد."
        );

      }


      const uploadRes =
        await fetch(
          data.uploadUrl,
          {

            method: "PUT",

            headers: {
              "Content-Type":
                file.type,
            },

            body: file,

          }
        );


      if (!uploadRes.ok) {

        throw new Error(
          "آپلود تصویر انجام نشد."
        );

      }


      return data.publicUrl;

    };

  



  /*
  |--------------------------------------------------------------------------
  | ثبت فرم
  |--------------------------------------------------------------------------
  */

  const handleSubmit =
    async () => {

      if (isSubmitting) {
        return;
      }


      const token =
        localStorage.getItem(
          "genino_token"
        );

      const vendorId =
        localStorage.getItem(
          "genino_vendor_id"
        );


      if (
        !token ||
        !vendorId ||
        vendorId ===
          "undefined"
      ) {

        alert(
          "نشست فروشنده منقضی شده است. لطفاً دوباره وارد حساب فروشنده شوید."
        );


        localStorage.removeItem(
          "genino_token"
        );

        localStorage.removeItem(
          "genino_refresh_token"
        );

        localStorage.removeItem(
          "genino_vendor_id"
        );


        navigate(
          "/",
          {
            replace: true,
          }
        );

        return;

      }


      /*
      |--------------------------------------------------------------------------
      | اعتبارسنجی
      |--------------------------------------------------------------------------
      */

      const missingFields =
        [];


      if (
        !title.trim()
      ) {
        missingFields.push(
          "عنوان خدمت"
        );
      }


      if (!serviceType) {
        missingFields.push(
          "نوع خدمت"
        );
      }


      if (
        !description.trim()
      ) {
        missingFields.push(
          "توضیحات خدمت"
        );
      }



      if (
        !isFree &&
        !String(
          price
        ).replace(
          /,/g,
          ""
        )
      ) {

        missingFields.push(
          "قیمت"
        );

      }


      if (
        minAge &&
        Number(minAge) < 0
      ) {

        missingFields.push(
          "حداقل سن"
        );

      }


      if (
        maxAge &&
        Number(maxAge) < 0
      ) {

        missingFields.push(
          "حداکثر سن"
        );

      }


      if (
        minAge !== "" &&
        maxAge !== "" &&
        Number(maxAge) <
          Number(minAge)
      ) {

        missingFields.push(
          "بازه سنی معتبر"
        );

      }


      if (
        images.length === 0
      ) {

        missingFields.push(
          "تصاویر خدمت"
        );

      }


      /*
      |--------------------------------------------------------------------------
      | تبدیل تاریخ‌ها
      |--------------------------------------------------------------------------
      */


      const reservationDeadline =
        deadlineDate &&
        deadlineTime
          ? persianDateTimeToIso(
              deadlineDate,
              deadlineTime
            )
          : null;

      if (
        deadlineDate &&
        !deadlineTime
      ) {

        missingFields.push(
          "ساعت مهلت رزرو"
        );

      }


      if (
        deadlineTime &&
        !deadlineDate
      ) {

        missingFields.push(
          "تاریخ مهلت رزرو"
        );

      }

      /*
|--------------------------------------------------------------------------
| اعتبارسنجی روزها و سانس‌ها
|--------------------------------------------------------------------------
*/

const serviceSessions = [];


if (
  scheduleMode === "SESSION"
) {


scheduleDays.forEach(
  (
    day,
    dayIndex
  ) => {

    if (!day.date) {

      missingFields.push(
        `تاریخ روز ${
          dayIndex + 1
        }`
      );

      return;
    }


    day.sessions.forEach(
      (
        session,
        sessionIndex
      ) => {

        if (
          !session.startTime
        ) {

          missingFields.push(
            `ساعت شروع سانس ${
              sessionIndex + 1
            } روز ${
              dayIndex + 1
            }`
          );

        }


        if (
          !session.endTime
        ) {

          missingFields.push(
            `ساعت پایان سانس ${
              sessionIndex + 1
            } روز ${
              dayIndex + 1
            }`
          );

        }


        if (
          !session.capacity ||
          Number(
            session.capacity
          ) < 1
        ) {

          missingFields.push(
            `ظرفیت سانس ${
              sessionIndex + 1
            } روز ${
              dayIndex + 1
            }`
          );

        }


        if (
          session.startTime &&
          session.endTime &&
          session.endTime <=
            session.startTime
        ) {

          missingFields.push(
            `زمان سانس ${
              sessionIndex + 1
            } روز ${
              dayIndex + 1
            }`
          );

        }


        const startAt =
          persianDateTimeToIso(
            day.date,
            session.startTime
          );


        const endAt =
          persianDateTimeToIso(
            day.date,
            session.endTime
          );


        if (
          startAt &&
          endAt
        ) {

          serviceSessions.push({

  id:
    session.dbId ||
    null,

  startAt,

  endAt,

  capacity:
    Number(
      session.capacity
    ),

});

        }

      }
    );

  }
);
}


const sortedServiceSessions =
  [...serviceSessions].sort(
    (a, b) =>
      new Date(a.startAt) -
      new Date(b.startAt)
  );


if (
  reservationDeadline &&
  sortedServiceSessions.length >
    0 &&
  new Date(
    reservationDeadline
  ) >
    new Date(
      sortedServiceSessions[0]
        .startAt
    )
) {

  missingFields.push(
    "مهلت رزرو باید قبل از شروع اولین سانس باشد"
  );

}


const now =
  new Date();


const hasPastSession =
  sortedServiceSessions.some(
    (session) =>
      new Date(
        session.startAt
      ) <= now
  );


if (
  !isEditMode &&
  hasPastSession
) {

  missingFields.push(
    "زمان شروع سانس‌ها باید در آینده باشد"
  );

}

     


      if (
        missingFields.length >
        0
      ) {

        setValidationErrors(
          [
            ...new Set(
              missingFields
            ),
          ]
        );


        window.scrollTo({
          top: 0,
          behavior:
            "smooth",
        });


        return;

      }


      setValidationErrors([]);

      setIsSubmitting(true);


      try {

        /*
        |--------------------------------------------------------------------------
        | آپلود تصاویر
        |--------------------------------------------------------------------------
        */

        const uploadedImages =
          [];


        for (
          const item
          of images
        ) {

          if (
            typeof item ===
            "string"
          ) {

            uploadedImages
              .push(item);

          } else {

            const url =
              await uploadImageToArvan(
                item
              );

            uploadedImages
              .push(url);

          }

        }


        /*
        |--------------------------------------------------------------------------
        | Payload
        |--------------------------------------------------------------------------
        */

        const payload = {

  title:
    title.trim(),

  serviceType,
  scheduleMode,

  description:
    description.trim(),

  images:
    uploadedImages,

  mainImageIndex:
    Number(
      mainImageIndex ||
      0
    ),

  sessions:
    serviceSessions,

  packageInfo:
scheduleMode === "PACKAGE"
 ? {
     ...packageInfo,
     startDate:
       persianDateTimeToIso(
         packageInfo.startDate,
         "00:00"
       )
   }
 : null,

  reservationDeadline,

  locationName:
    locationName.trim() ||
    null,

  address:
    address.trim() ||
    null,

  minAge:
    minAge === ""
      ? null
      : Number(minAge),

  maxAge:
    maxAge === ""
      ? null
      : Number(maxAge),

  isFree,

  price:
    isFree
      ? null
      : Number(
          price.replace(
            /,/g,
            ""
          )
        ),

  rules:
    rules.trim() ||
    null,

  contactPhone:
    contactPhone.trim() ||
    null,

};


        /*
        |--------------------------------------------------------------------------
        | API
        |--------------------------------------------------------------------------
        */

        const res =
          await fetch(

            isEditMode

              ? `${
                  import.meta.env
                    .VITE_API_BASE_URL
                }/vendor-services/${serviceId}`

              : `${
                  import.meta.env
                    .VITE_API_BASE_URL
                }/vendor-services/create`,

            {

              method:
                isEditMode
                  ? "PUT"
                  : "POST",

              headers: {

                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,

              },

              body:
                JSON.stringify(
                  payload
                ),

            }

          );


        const data =
          await res.json();


        if (!data.ok) {

          throw new Error(
            data.message ||
            "ثبت خدمت انجام نشد."
          );

        }


        setShowSuccessModal(
          true
        );


        setTimeout(() => {

          navigate(
            getReturnPath(
              vendorId
            ),
            {
              replace: true,
            }
          );

        }, 1600);


      } catch (error) {

        console.error(
          "VENDOR SERVICE SUBMIT ERROR:",
          error
        );


        alert(
          error.message ||
          "ثبت خدمت انجام نشد. لطفاً دوباره تلاش کنید."
        );


      } finally {

        setIsSubmitting(
          false
        );

      }

    };


  /*
  |--------------------------------------------------------------------------
  | کلاس مشترک input
  |--------------------------------------------------------------------------
  */

  const inputClass = (
    errorName
  ) => `
    w-full rounded-2xl
    bg-white
    px-4 py-3
    shadow-sm
    outline-none
    transition
    focus:ring-4
    focus:ring-yellow-100
    ${
      hasError(
        errorName
      )
        ? "border border-red-400 ring-2 ring-red-100"
        : "border border-yellow-200 focus:border-[#d4af37]"
    }
  `;

const dayHasExistingSession = (
  day
) => {

  return day.sessions.some(
    (session) =>
      Boolean(
        session.dbId
      )
  );

};








  return (

    <main
      dir="rtl"
      className="
        min-h-screen
        bg-[#f8f1e7]
        p-4
        text-right
      "
    >

      <div
        className="
          mx-auto
          max-w-4xl
        "
      >

        {/* عنوان صفحه */}

        <div
          className="
            mb-5
            rounded-[2rem]
            border
            border-yellow-200
            bg-white
            p-5
            shadow-sm
          "
        >

          <h1
            className="
              text-xl
              font-black
              text-[#6f4a18]
            "
          >

            {isEditMode
              ? "ویرایش خدمت"
              : "افزودن خدمت جدید"}

          </h1>


          <p
            className="
              mt-2
              text-sm
              leading-6
              text-gray-500
            "
          >

            اطلاعات خدمت را با دقت وارد کنید.
            هر خدمت یک پنجره از ظرفیت بسته همکاری شما را استفاده می‌کند.

          </p>

        </div>


        {/* خطاهای فرم */}

        {validationErrors.length >
          0 && (

          <div
            className="
              mb-5
              rounded-2xl
              border
              border-red-200
              bg-red-50
              p-4
              text-sm
              leading-7
              text-red-600
            "
          >

            <p className="font-black">

              لطفاً موارد زیر را تکمیل یا اصلاح کنید:

            </p>

            <p className="mt-1">

              {validationErrors.join(
                "، "
              )}

            </p>

          </div>

        )}


        {/* اطلاعات اصلی */}

        <section
          className="
            mb-5
            rounded-[2rem]
            border
            border-yellow-200
            bg-white
            p-5
            shadow-sm
          "
        >

          <h2
            className="
              mb-5
              text-lg
              font-black
              text-[#6f4a18]
            "
          >

            اطلاعات اصلی خدمت

          </h2>


          {/* عنوان */}

          <div className="mb-5">

            <label
              className="
                mb-2
                block
                text-sm
                font-bold
                text-[#6f4a18]
              "
            >

              عنوان خدمت

            </label>


            <input
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              placeholder="مثلاً جشن تابستانی کودکان"
              className={inputClass(
                "عنوان خدمت"
              )}
            />

          </div>


          {/* نوع خدمت */}

          <label
            className="
              mb-3
              block
              text-sm
              font-bold
              text-[#6f4a18]
            "
          >

            نوع خدمت

          </label>


          <div
            className="
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >

            {serviceTypeOptions.map(
              (item) => (

                <button
                  key={
                    item.value
                  }
                  type="button"
                  onClick={() =>
                    setServiceType(
                      item.value
                    )
                  }
                  className={`
                    rounded-2xl
                    border
                    p-4
                    text-right
                    transition

                    ${
                      serviceType ===
                      item.value

                        ? `
                          border-[#d4af37]
                          bg-yellow-50
                          ring-2
                          ring-yellow-100
                        `

                        : `
                          border-yellow-100
                          bg-white
                          hover:border-yellow-300
                        `
                    }
                  `}
                >

                  <p
                    className="
                      font-black
                      text-[#6f4a18]
                    "
                  >

                    {item.label}

                  </p>


                  <p
                    className="
                      mt-1
                      text-xs
                      leading-5
                      text-gray-500
                    "
                  >

                    {item.description}

                  </p>

                </button>

              )
            )}

          </div>


          {/* توضیحات */}

          <div className="mt-5">

            <label
              className="
                mb-2
                block
                text-sm
                font-bold
                text-[#6f4a18]
              "
            >

              توضیحات خدمت

            </label>


            <textarea
              value={
                description
              }
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              rows={5}
              placeholder="خدمت، برنامه، امکانات و جزئیات مهم آن را برای خانواده‌ها توضیح دهید..."
              className={`
                ${inputClass(
                  "توضیحات خدمت"
                )}
                resize-none
              `}
            />

          </div>

        </section>


        {/* انتخاب نحوه برگزاری خدمت */}

<div
  className="
    mb-5
    rounded-[2rem]
    border
    border-yellow-200
    bg-white
    p-4
    shadow-sm
  "
>

  <h2
    className="
      mb-2
      text-base
      font-black
      text-[#6f4a18]
    "
  >
    نحوه برگزاری خدمت
  </h2>


  <p
    className="
      mb-4
      text-xs
      leading-6
      text-gray-500
    "
  >
    مشخص کنید خانواده‌ها چگونه این خدمت را رزرو می‌کنند.
    اگر انتخاب زمان مشخص لازم است از سانس‌ها استفاده کنید،
    و اگر خدمت یک دوره چندجلسه‌ای است بسته آموزشی بسازید.
  </p>


  <div
    className="
      grid
      grid-cols-1
      gap-3
      sm:grid-cols-2
    "
  >


    {/* سانس‌ها */}

    <button
  type="button"
  disabled={
    hasReservations
  }
  onClick={() =>
    setScheduleMode("SESSION")
  }
      className={`
        rounded-2xl
        border
        p-4
        text-right
        transition
        disabled:cursor-not-allowed
        disabled:opacity-60

        ${
          scheduleMode === "SESSION"

          ?

          `
          border-[#d4af37]
          bg-yellow-50
          ring-2
          ring-yellow-100
          `

          :

          `
          border-yellow-100
          bg-white
          hover:border-yellow-300
          `
        }
      `}
    >

      <div
        className="
          mb-2
          text-lg
        "
      >
        📅
      </div>


      <h3
        className="
          font-black
          text-[#6f4a18]
        "
      >
        سانس‌ها و زمان‌های آزاد
      </h3>


      <p
        className="
          mt-2
          text-xs
          leading-5
          text-gray-500
        "
      >
        مناسب جشن، کارگاه، کلاس‌های تک‌ (یا چند) جلسه‌ای
        یا خدماتی که کاربر یک زمان مشخص را انتخاب می‌کند.
      </p>


    </button>



    {/* بسته‌ها */}

    <button
  type="button"
  disabled={
    hasReservations
  }
  onClick={() =>
    setScheduleMode("PACKAGE")
  }
      className={`
        rounded-2xl
        border
        p-4
        text-right
        transition
        disabled:cursor-not-allowed
        disabled:opacity-60

        ${
          scheduleMode === "PACKAGE"

          ?

          `
          border-[#d4af37]
          bg-yellow-50
          ring-2
          ring-yellow-100
          `

          :

          `
          border-yellow-100
          bg-white
          hover:border-yellow-300
          `
        }
      `}
    >

      <div
        className="
          mb-2
          text-lg
        "
      >
        📦
      </div>


      <h3
        className="
          font-black
          text-[#6f4a18]
        "
      >
        دوره‌ها و بسته‌های آموزشی
      </h3>


      <p
        className="
          mt-2
          text-xs
          leading-5
          text-gray-500
        "
      >
        مناسب کلاس زبان، موسیقی، کنکور،
        ورزش و دوره‌های چندجلسه‌ای.
      </p>


    </button>


  </div>


</div>

{scheduleMode === "SESSION" && (

<section
  className="
    mb-5
    rounded-[1.75rem]
    border
    border-[#ead9b5]
    bg-white
    p-4
    shadow-[0_8px_30px_rgba(120,86,30,0.05)]
  "
>

  {hasReservations && (

  <div
    className="
      mb-4
      rounded-xl
      border
      border-amber-200
      bg-amber-50
      px-3
      py-2
      text-xs
      font-bold
      leading-6
      text-amber-700
    "
  >
   این خدمت دارای رزرو است؛
سانس‌های قبلی قابل تغییر نیستند،
اما می‌توانید روز یا سانس جدید برای آینده اضافه کنید.
  </div>

)}

  {/* عنوان */}

  <div
    className="
      mb-4
      flex
      items-start
      justify-between
      gap-3
    "
  >

    <div>

      <div
        className="
          flex
          items-center
          gap-2
        "
      >

        <CalendarDays
          className="
            h-4
            w-4
            text-[#b3872f]
          "
        />

        <h2
          className="
            text-sm
            font-black
            text-[#6f4a18]
          "
        >
          زمان‌بندی برگزاری
        </h2>

      </div>


      <p
        className="
          mt-1
          text-[11px]
          leading-5
          text-stone-400
        "
      >
        روزهای برگزاری و سانس‌های هر روز را مشخص کنید.
      </p>

    </div>


  <button
    type="button"
    onClick={addDay}
    className="
      flex
      shrink-0
      items-center
      gap-1
      rounded-xl
      border
      border-[#e1c98d]
      bg-[#fffaf0]
      px-3
      py-2
      text-[11px]
      font-black
      text-[#8a6422]
      transition
      hover:bg-[#fff4d6]
    "
  >

    <Plus
      className="
        h-3.5
        w-3.5
      "
    />

    افزودن روز

  </button>



  </div>


  {/* روزها */}

  <div
    className="
      space-y-3
    "
  >

    {scheduleDays.map(
      (
        day,
        dayIndex
      ) => (

        <div
          key={day.id}
          className="
            rounded-2xl
            border
            border-[#eee3ce]
            bg-[#fdfbf7]
            p-3
          "
        >

          {/* هدر روز */}

          <div
            className="
              mb-3
              flex
              items-center
              gap-2
            "
          >

            <span
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-[#efe3c8]
                text-[11px]
                font-black
                text-[#7a5721]
              "
            >

              {dayIndex + 1}

            </span>


            <div
              className="
                min-w-0
                flex-1
              "
            >

              <DatePicker
  disabled={
  hasReservations &&
  dayHasExistingSession(
    day
  )
}
  calendar={
    persian
  }
                locale={
                  persian_fa
                }
                value={
                  day.date
                }
                onChange={(
                  date
                ) =>
                  updateDayDate(
                    day.id,
                    date
                      ? date.format(
                          "YYYY-MM-DD"
                        )
                      : ""
                  )
                }
                format="YYYY/MM/DD"
                portal
                containerStyle={{
                  width:
                    "100%",
                  zIndex:
                    3000,
                }}
                inputClass="
                  w-full
                  rounded-xl
                  border
                  border-[#eadcc0]
                  bg-white
                  px-3
                  py-2
                  text-xs
                  font-bold
                  text-stone-700
                  outline-none
                  transition
                  focus:border-[#c9a44c]
                  focus:ring-2
                  focus:ring-[#f4e9cf]
                "
                placeholder="تاریخ برگزاری"
              />

            </div>


            {scheduleDays.length > 1 &&
  (
    !hasReservations ||
    !dayHasExistingSession(
      day
    )
  ) && (

              <button
                type="button"
                onClick={() =>
                  removeDay(
                    day.id
                  )
                }
                title="حذف این روز"
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  text-stone-300
                  transition
                  hover:bg-red-50
                  hover:text-red-400
                "
              >

                <Trash2
                  className="
                    h-3.5
                    w-3.5
                  "
                />

              </button>

            )}

          </div>


          {/* سانس‌ها */}

          <div
            className="
              space-y-2
            "
          >

            {day.sessions.map(
              (
                session,
                sessionIndex
              ) => (

                <div
                  key={
                    session.id
                  }
                  className="
                    rounded-xl
                    border
                    border-[#eee7da]
                    bg-white
                    p-2.5
                  "
                >

                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      justify-between
                      gap-2
                    "
                  >

                    <span
                      className="
                        rounded-md
                        bg-[#faf5ea]
                        px-2
                        py-1
                        text-[10px]
                        font-black
                        text-[#8a6422]
                      "
                    >

                      سانس{" "}
                      {sessionIndex +
                        1}

                    </span>


                    {day.sessions.length > 1 &&
  (
    !hasReservations ||
    !session.dbId
  ) && (

                      <button
                        type="button"
                        onClick={() =>
                          removeSession(
                            day.id,
                            session.id
                          )
                        }
                        title="حذف سانس"
                        className="
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-lg
                          text-stone-300
                          transition
                          hover:bg-red-50
                          hover:text-red-400
                        "
                      >

                        <Trash2
                          className="
                            h-3.5
                            w-3.5
                          "
                        />

                      </button>

                    )}

                  </div>


                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-2
                      sm:grid-cols-3
                    "
                  >

                    {/* شروع */}

                    <div>

                      <label
                        className="
                          mb-1
                          flex
                          items-center
                          gap-1
                          text-[9px]
                          font-bold
                          text-stone-400
                        "
                      >

                        <Clock3
                          className="
                            h-3
                            w-3
                          "
                        />

                        شروع

                      </label>


                      <input
  type="time"
  disabled={
  hasReservations &&
  Boolean(
    session.dbId
  )
}
  value={
    session.startTime
  }
                        onChange={(e) =>
                          updateSession(
                            day.id,
                            session.id,
                            "startTime",
                            e.target
                              .value
                          )
                        }
                        className="
                          w-full
                          rounded-lg
                          border
                          border-[#eadfcb]
                          bg-[#fffefa]
                          px-2
                          py-2
                          text-xs
                          outline-none
                          transition
                          focus:border-[#c9a44c]
                          focus:ring-2
                          focus:ring-[#f6ecd7]
                          disabled:cursor-not-allowed
                          disabled:bg-stone-100
                          disabled:text-stone-500
                        "
                      />

                    </div>


                    {/* پایان */}

                    <div>

                      <label
                        className="
                          mb-1
                          flex
                          items-center
                          gap-1
                          text-[9px]
                          font-bold
                          text-stone-400
                        "
                      >

                        <Clock3
                          className="
                            h-3
                            w-3
                          "
                        />

                        پایان

                      </label>


                      <input
  type="time"
  disabled={
  hasReservations &&
  Boolean(
    session.dbId
  )
}
  value={
    session.endTime
  }
                        onChange={(e) =>
                          updateSession(
                            day.id,
                            session.id,
                            "endTime",
                            e.target
                              .value
                          )
                        }
                        className="
                          w-full
                          rounded-lg
                          border
                          border-[#eadfcb]
                          bg-[#fffefa]
                          px-2
                          py-2
                          text-xs
                          outline-none
                          transition
                          focus:border-[#c9a44c]
                          focus:ring-2
                          focus:ring-[#f6ecd7]
                          disabled:cursor-not-allowed
                          disabled:bg-stone-100
                          disabled:text-stone-500
                        "
                      />

                    </div>


                    {/* ظرفیت */}

                    <div>

                      <label
                        className="
                          mb-1
                          flex
                          items-center
                          gap-1
                          text-[9px]
                          font-bold
                          text-stone-400
                        "
                      >

                        <UsersRound
                          className="
                            h-3
                            w-3
                          "
                        />

                        ظرفیت

                      </label>


                      <input
  disabled={
  hasReservations &&
  Boolean(
    session.dbId
  )
}
  value={
    session.capacity
  }
                        onChange={(e) =>
                          updateSession(
                            day.id,
                            session.id,
                            "capacity",
                            e.target.value
                              .replace(
                                /\D/g,
                                ""
                              )
                          )
                        }
                        inputMode="numeric"
                        placeholder="مثلاً ۳۰"
                        className="
                          w-full
                          rounded-lg
                          border
                          border-[#eadfcb]
                          bg-[#fffefa]
                          px-2
                          py-2
                          text-center
                          text-xs
                          outline-none
                          transition
                          focus:border-[#c9a44c]
                          focus:ring-2
                          focus:ring-[#f6ecd7]
                          disabled:cursor-not-allowed
                          disabled:bg-stone-100
                          disabled:text-stone-500
                        "
                      />

                    </div>

                  </div>

                </div>

              )
            )}

          </div>


          {/* افزودن سانس */}


  <button
    type="button"
    onClick={() =>
      addSession(
        day.id
      )
    }
    className="
      mt-2
      flex
      items-center
      gap-1
      rounded-lg
      px-2
      py-1.5
      text-[10px]
      font-black
      text-[#a57a29]
      transition
      hover:bg-[#fff7e7]
    "
  >

    <Plus
      className="
        h-3
        w-3
      "
    />

    افزودن سانس

  </button>



        </div>

      )
    )}

  </div>


  {/* مهلت رزرو */}

  <div
    className="
      mt-4
      border-t
      border-[#eee3ce]
      pt-4
    "
  >

    <p
      className="
        mb-2
        text-[11px]
        font-black
        text-[#7a5721]
      "
    >

      آخرین مهلت رزرو

      <span
        className="
          mr-1
          font-normal
          text-stone-400
        "
      >
        اختیاری
      </span>

    </p>


    <div
      className="
        grid
        grid-cols-1
        gap-2
        sm:grid-cols-2
      "
    >

      <DatePicker
  disabled={
    hasReservations
  }
  calendar={
    persian
  }
        locale={
          persian_fa
        }
        value={
          deadlineDate
        }
        onChange={(
          date
        ) =>
          setDeadlineDate(
            date
              ? date.format(
                  "YYYY-MM-DD"
                )
              : ""
          )
        }
        format="YYYY/MM/DD"
        portal
        containerStyle={{
          width:
            "100%",
          zIndex:
            3000,
        }}
        inputClass="
          w-full
          rounded-xl
          border
          border-[#eadfcb]
          bg-[#fffefa]
          px-3
          py-2
          text-xs
          outline-none
          transition
          focus:border-[#c9a44c]
          focus:ring-2
          focus:ring-[#f6ecd7]
        "
        placeholder="تاریخ مهلت"
      />


      <input
  type="time"
  disabled={
    hasReservations
  }
  value={
    deadlineTime
  }
        onChange={(e) =>
          setDeadlineTime(
            e.target.value
          )
        }
        className="
          w-full
          rounded-xl
          border
          border-[#eadfcb]
          bg-[#fffefa]
          px-3
          py-2
          text-xs
          outline-none
          transition
          focus:border-[#c9a44c]
          focus:ring-2
          focus:ring-[#f6ecd7]
          disabled:cursor-not-allowed
          disabled:bg-stone-100
          disabled:text-stone-500
        "
      />

    </div>


    <p
      className="
        mt-2
        text-[10px]
        leading-5
        text-stone-400
      "
    >
      در صورت خالی بودن، محدودیت زمانی جداگانه‌ای برای رزرو ثبت نمی‌شود.
    </p>

  </div>

</section>

)}


{scheduleMode === "PACKAGE" && (

<section
  className="
    mb-5
    rounded-[1.75rem]
    border
    border-[#ead9b5]
    bg-white
    p-4
    shadow-[0_8px_30px_rgba(120,86,30,0.05)]
  "
>
  {hasReservations && (

  <div
    className="
      mb-4
      rounded-xl
      border
      border-amber-200
      bg-amber-50
      px-3
      py-2
      text-xs
      font-bold
      leading-6
      text-amber-700
    "
  >
    این دوره دارای رزرو است؛
    زمان‌بندی و ساختار دوره قابل ویرایش نیست.
    سایر اطلاعات خدمت قابل ویرایش است.
  </div>

)}

<fieldset
  disabled={
    hasReservations
  }
  className={
    hasReservations
      ? "opacity-60"
      : ""
  }
>

  <div
    className="
      mb-4
      flex
      items-center
      gap-2
    "
  >

    <Package
      className="
        h-4
        w-4
        text-[#b3872f]
      "
    />

    <h2
      className="
        text-sm
        font-black
        text-[#6f4a18]
      "
    >
      اطلاعات بسته آموزشی
    </h2>

  </div>


  <input
    value={packageInfo.title}
    onChange={(e)=>
      setPackageInfo({
        ...packageInfo,
        title:e.target.value
      })
    }
    placeholder="مثلاً کلاس زبان کودکان"
    className={inputClass("")}
  />

  <div
  className="
    mt-4
    grid
    grid-cols-1
    gap-3
    sm:grid-cols-2
  "
>


<div>

<label
className="
mb-2
block
text-sm
font-bold
text-[#6f4a18]
"
>
تاریخ شروع بسته
</label>


<DatePicker
calendar={persian}
locale={persian_fa}
value={packageInfo.startDate}
onChange={(date)=>
setPackageInfo({
...packageInfo,
startDate:
date
? date.format("YYYY-MM-DD")
: ""
})
}
format="YYYY/MM/DD"
portal
inputClass="
w-full
rounded-xl
border
border-[#eadcc0]
bg-white
px-3
py-3
text-sm
"
/>

</div>


<div>

<label
className="
mb-2
block
text-sm
font-bold
text-[#6f4a18]
"
>
تعداد جلسات
</label>


<input

value={
packageInfo.totalSessions
}

onChange={(e)=>
setPackageInfo({
...packageInfo,
totalSessions:
e.target.value.replace(/\D/g,"")
})
}

placeholder="مثلاً 20"
className={inputClass("")}

/>

</div>


</div>

<div className="mt-5">

<label
className="
mb-2
block
text-sm
font-bold
text-[#6f4a18]
"
>
روزهای برگزاری
</label>


<div
className="
flex
flex-wrap
gap-2
"
>

{
[
"شنبه",
"یکشنبه",
"دوشنبه",
"سه‌شنبه",
"چهارشنبه",
"پنجشنبه",
"جمعه",
].map((day)=>{


const selected =
packageInfo.weekdays.includes(day);


return (

<button
key={day}
type="button"

onClick={()=>{

setPackageInfo({

...packageInfo,

weekdays:
selected

?
packageInfo.weekdays.filter(
(item)=>item!==day
)

:

[
...packageInfo.weekdays,
day
]

});

}}

className={`
rounded-xl
px-4
py-2
text-sm
font-bold
transition

${
selected

?
"bg-[#d4af37] text-white"

:

"border border-yellow-200 bg-white text-[#6f4a18]"
}

`}
>

{day}

</button>

)

})
}

</div>
</div>

<div
  className="
    mt-5
    grid
    grid-cols-1
    gap-3
    sm:grid-cols-2
  "
>

<div>

<label
className="
mb-2
block
text-sm
font-bold
text-[#6f4a18]
"
>
ساعت شروع جلسه
</label>


<input
type="time"

value={
packageInfo.startTime
}

onChange={(e)=>
setPackageInfo({

...packageInfo,

startTime:
e.target.value

})
}

className="
w-full
rounded-xl
border
border-[#eadcc0]
bg-white
px-3
py-3
text-sm
"
/>

</div>



<div>

<label
className="
mb-2
block
text-sm
font-bold
text-[#6f4a18]
"
>
ساعت پایان جلسه
</label>


<input
type="time"

value={
packageInfo.endTime
}

onChange={(e)=>
setPackageInfo({

...packageInfo,

endTime:
e.target.value

})
}

className="
w-full
rounded-xl
border
border-[#eadcc0]
bg-white
px-3
py-3
text-sm
"
/>

</div>
</div>

<div
  className="
    mt-5
  "
>

<label
className="
mb-2
block
text-sm
font-bold
text-[#6f4a18]
"
>
ظرفیت دوره
</label>


<div
className="
flex
items-center
gap-2
"
>

<input

value={
packageInfo.capacity
}

onChange={(e)=>
setPackageInfo({

...packageInfo,

capacity:
e.target.value.replace(
 /\D/g,
 ""
)

})
}

inputMode="numeric"

placeholder="مثلاً 15 کودک"

className="
w-full
rounded-xl
border
border-[#eadcc0]
bg-white
px-3
py-3
text-sm
"

/>


<span
className="
text-sm
text-stone-400
"
>
نفر
</span>
</div>
</div>

</fieldset>

</section>

)}


        {/* گروه سنی */}

<section
  className="
    mb-5
    rounded-[2rem]
    border
    border-yellow-200
    bg-white
    p-5
    shadow-sm
  "
>

  <h2
    className="
      mb-5
      text-lg
      font-black
      text-[#6f4a18]
    "
  >
    گروه سنی پیشنهادی
  </h2>


  <div
    className="
      grid
      grid-cols-1
      gap-4
      sm:grid-cols-2
    "
  >

    <div>

      <label
        className="
          mb-2
          block
          text-sm
          font-bold
          text-[#6f4a18]
        "
      >
        حداقل سن
      </label>


      <input
        value={
          minAge
        }
        onChange={(e) =>
          setMinAge(
            e.target.value
              .replace(
                /\D/g,
                ""
              )
          )
        }
        inputMode="numeric"
        placeholder="مثلاً ۳"
        className={inputClass(
          "حداقل سن"
        )}
      />

    </div>


    <div>

      <label
        className="
          mb-2
          block
          text-sm
          font-bold
          text-[#6f4a18]
        "
      >
        حداکثر سن
      </label>


      <input
        value={
          maxAge
        }
        onChange={(e) =>
          setMaxAge(
            e.target.value
              .replace(
                /\D/g,
                ""
              )
          )
        }
        inputMode="numeric"
        placeholder="مثلاً ۱۲"
        className={inputClass(
          "حداکثر سن"
        )}
      />

    </div>

  </div>


  <p
    className="
      mt-3
      text-xs
      text-gray-500
    "
  >
    اگر خدمت محدودیت سنی ندارد، هر دو فیلد را خالی بگذارید.
  </p>

</section>


        {/* قیمت */}

        <section
          className="
            mb-5
            rounded-[2rem]
            border
            border-yellow-200
            bg-white
            p-5
            shadow-sm
          "
        >

          <h2
            className="
              mb-5
              text-lg
              font-black
              text-[#6f4a18]
            "
          >

            هزینه خدمت

          </h2>


          <div
            className="
              flex
              flex-wrap
              gap-3
            "
          >

            <button
              type="button"
              onClick={() => {

                setIsFree(true);

                setPrice("");

              }}
              className={`
                rounded-xl
                px-5
                py-2.5
                font-bold
                transition

                ${
                  isFree
                    ? "bg-[#d4af37] text-white"
                    : "border border-yellow-200 bg-white text-[#6f4a18]"
                }
              `}
            >

              رایگان

            </button>


            <button
              type="button"
              onClick={() =>
                setIsFree(
                  false
                )
              }
              className={`
                rounded-xl
                px-5
                py-2.5
                font-bold
                transition

                ${
                  !isFree
                    ? "bg-[#d4af37] text-white"
                    : "border border-yellow-200 bg-white text-[#6f4a18]"
                }
              `}
            >

              دارای هزینه

            </button>

          </div>


          {!isFree && (

            <div className="mt-5">

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-bold
                  text-[#6f4a18]
                "
              >

                قیمت هر رزرو

              </label>


              <div className="relative">

                <input
                  value={
                    price
                  }
                  onChange={
                    handlePriceChange
                  }
                  inputMode="numeric"
                  placeholder="قیمت را وارد کنید"
                  className={inputClass(
                    "قیمت"
                  )}
                />


                <span
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-sm
                    font-bold
                    text-stone-500
                  "
                >

                  ریال

                </span>

              </div>

            </div>

          )}

        </section>


        {/* محل */}

        <section
          className="
            mb-5
            rounded-[2rem]
            border
            border-yellow-200
            bg-white
            p-5
            shadow-sm
          "
        >

          <h2
            className="
              mb-5
              text-lg
              font-black
              text-[#6f4a18]
            "
          >

            محل برگزاری و ارتباط

          </h2>


          <div className="mb-4">

            <label
              className="
                mb-2
                block
                text-sm
                font-bold
                text-[#6f4a18]
              "
            >

              نام محل برگزاری

            </label>


            <input
              value={
                locationName
              }
              onChange={(e) =>
                setLocationName(
                  e.target.value
                )
              }
              placeholder="مثلاً سالن اجتماعات مدرسه ژنینو"
              className={inputClass(
                ""
              )}
            />

          </div>


          <div className="mb-4">

            <label
              className="
                mb-2
                block
                text-sm
                font-bold
                text-[#6f4a18]
              "
            >

              آدرس

            </label>


            <textarea
              value={
                address
              }
              onChange={(e) =>
                setAddress(
                  e.target.value
                )
              }
              rows={3}
              placeholder="آدرس کامل محل برگزاری"
              className={`
                ${inputClass(
                  ""
                )}
                resize-none
              `}
            />

          </div>


          <div>

            <label
              className="
                mb-2
                block
                text-sm
                font-bold
                text-[#6f4a18]
              "
            >

              شماره تماس مرتبط با این خدمت

            </label>


            <input
              value={
                contactPhone
              }
              onChange={(e) =>
                setContactPhone(
                  e.target.value
                )
              }
              placeholder="مثلاً ۰۹۱۲..."
              className={inputClass(
                ""
              )}
            />

          </div>

        </section>


        {/* تصاویر */}

        <section
          className="
            mb-5
            rounded-[2rem]
            border
            border-yellow-200
            bg-white
            p-5
            shadow-sm
          "
        >

          <h2
            className="
              mb-2
              text-lg
              font-black
              text-[#6f4a18]
            "
          >

            تصاویر خدمت

          </h2>


          <p
            className="
              mb-4
              text-xs
              leading-5
              text-gray-500
            "
          >

            حداقل یک و حداکثر ۱۰ تصویر انتخاب کنید. با کلیک روی «تصویر اصلی» مشخص می‌کنید کدام عکس روی کارت خدمت نمایش داده شود.

          </p>


          <div
            className={`
              rounded-3xl
              border-2
              border-dashed
              bg-white
              p-4

              ${
                hasError(
                  "تصاویر خدمت"
                )
                  ? "border-red-300"
                  : "border-yellow-300"
              }
            `}
          >

            <input
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              onChange={
                handleImageChange
              }
              className="
                mb-4
                w-full
                text-sm
              "
            />


            {images.length >
              0 && (

              <div
                className="
                  grid
                  grid-cols-2
                  gap-3
                  md:grid-cols-5
                "
              >

                {images.map(
                  (
                    img,
                    index
                  ) => {

                    const src =
                      typeof img ===
                      "string"
                        ? img
                        : URL.createObjectURL(
                            img
                          );


                    return (

                      <div
                        key={
                          index
                        }
                        className={`
                          relative
                          overflow-hidden
                          rounded-2xl
                          border
                          shadow-sm

                          ${
                            mainImageIndex ===
                            index
                              ? "ring-4 ring-[#d4af37]"
                              : ""
                          }
                        `}
                      >

                        <img
                          src={src}
                          alt=""
                          onClick={() => {

                            setActiveImageIndex(
                              index
                            );

                            setOpenGallery(
                              true
                            );

                          }}
                          className="
                            h-32
                            w-full
                            cursor-pointer
                            object-cover
                          "
                        />


                        {/* حذف */}

                        <button
                          type="button"
                          onClick={() =>
                            removeImage(
                              index
                            )
                          }
                          className="
                            absolute
                            left-1
                            top-1
                            rounded
                            bg-red-500
                            px-2
                            text-xs
                            text-white
                          "
                        >

                          ×

                        </button>


                        {/* جابه‌جایی */}

                        <div
                          className="
                            absolute
                            bottom-8
                            left-1
                            right-1
                            flex
                            justify-between
                            gap-1
                          "
                        >

                          <button
                            type="button"
                            onClick={() =>
                              moveImage(
                                index,
                                index - 1
                              )
                            }
                            className="
                              rounded
                              bg-black/60
                              px-2
                              py-1
                              text-[10px]
                              text-white
                            "
                          >

                            ↑

                          </button>


                          <button
                            type="button"
                            onClick={() =>
                              moveImage(
                                index,
                                index + 1
                              )
                            }
                            className="
                              rounded
                              bg-black/60
                              px-2
                              py-1
                              text-[10px]
                              text-white
                            "
                          >

                            ↓

                          </button>

                        </div>


                        {/* تصویر اصلی */}

                        <button
                          type="button"
                          onClick={() =>
                            setMainImageIndex(
                              index
                            )
                          }
                          className={`
                            absolute
                            bottom-0
                            left-0
                            right-0
                            py-1.5
                            text-center
                            text-[10px]
                            font-bold

                            ${
                              mainImageIndex ===
                              index
                                ? "bg-[#d4af37] text-white"
                                : "bg-black/60 text-white"
                            }
                          `}
                        >

                          {mainImageIndex ===
                          index
                            ? "✓ تصویر اصلی"
                            : "انتخاب به عنوان تصویر اصلی"}

                        </button>

                      </div>

                    );

                  }
                )}

              </div>

            )}

          </div>


        </section>


        {/* قوانین */}

        <section
          className="
            mb-5
            rounded-[2rem]
            border
            border-yellow-200
            bg-white
            p-5
            shadow-sm
          "
        >

          <h2
            className="
              mb-4
              text-lg
              font-black
              text-[#6f4a18]
            "
          >

            شرایط و قوانین خدمت

          </h2>


          <textarea
            value={rules}
            onChange={(e) =>
              setRules(
                e.target.value
              )
            }
            rows={5}
            placeholder="مثلاً حضور والدین الزامی است، همراه داشتن کارت شناسایی، شرایط لغو رزرو و سایر نکات..."
            className={`
              ${inputClass(
                ""
              )}
              resize-none
            `}
          />

        </section>


        {/* دکمه ثبت */}

        <button
          type="button"
          onClick={
            handleSubmit
          }
          disabled={
            isSubmitting
          }
          className={`
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-gradient-to-r
            from-[#7a5526]
            via-[#b88724]
            to-[#d4af37]
            py-4
            font-black
            text-white
            shadow-lg
            transition

            ${
              isSubmitting
                ? "cursor-not-allowed opacity-80"
                : "hover:scale-[1.01]"
            }
          `}
        >

          {isSubmitting && (

            <span
              className="
                h-5
                w-5
                animate-spin
                rounded-full
                border-2
                border-white/40
                border-t-white
              "
            />

          )}


          {isSubmitting
            ? isEditMode
              ? "در حال ذخیره تغییرات..."
              : "در حال ثبت خدمت..."
            : isEditMode
              ? "ذخیره تغییرات خدمت"
              : "ثبت خدمت"}

        </button>


        {/* مودال موفقیت */}

        {showSuccessModal && (

          <div
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/45
              px-4
              backdrop-blur-sm
            "
          >

            <div
              className="
                w-full
                max-w-sm
                rounded-[2rem]
                border
                border-yellow-200
                bg-white
                p-6
                text-center
                shadow-2xl
              "
            >

              <div
                className="
                  mx-auto
                  mb-4
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-green-50
                  text-3xl
                "
              >

                ✅

              </div>


              <h2
                className="
                  text-lg
                  font-black
                  text-[#6f4a18]
                "
              >

                {isEditMode
                  ? "تغییرات خدمت ذخیره شد"
                  : "خدمت با موفقیت ثبت شد"}

              </h2>


              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-gray-500
                "
              >

                {isSchoolSource

                  ? "تا چند لحظه دیگر به صفحه مدرسه منتقل می‌شوید."

                  : "تا چند لحظه دیگر به صفحه فروشنده منتقل می‌شوید."}

              </p>


              <div
                className="
                  mx-auto
                  mt-5
                  h-1.5
                  w-32
                  overflow-hidden
                  rounded-full
                  bg-yellow-100
                "
              >

                <div
                  className="
                    h-full
                    w-full
                    animate-pulse
                    rounded-full
                    bg-[#d4af37]
                  "
                />

              </div>

            </div>

          </div>

        )}


        {/* گالری */}

        {openGallery &&
          images.length >
            0 && (

          <div
            className="
              fixed
              inset-0
              z-[60]
              flex
              items-center
              justify-center
              bg-black/90
            "
          >

            <button
              type="button"
              onClick={() =>
                setOpenGallery(
                  false
                )
              }
              className="
                absolute
                left-5
                top-5
                text-2xl
                text-white
              "
            >

              ✕

            </button>


            <button
              type="button"
              onClick={
                prevImage
              }
              className="
                absolute
                left-5
                text-4xl
                font-black
                text-white
              "
            >

              ›

            </button>


            <img
              src={
                typeof images[
                  activeImageIndex
                ] === "string"

                  ? images[
                      activeImageIndex
                    ]

                  : URL.createObjectURL(
                      images[
                        activeImageIndex
                      ]
                    )
              }
              alt=""
              className="
                max-h-[80vh]
                max-w-[90vw]
                rounded-2xl
                shadow-2xl
              "
            />


            <button
              type="button"
              onClick={
                nextImage
              }
              className="
                absolute
                right-5
                text-4xl
                font-black
                text-white
              "
            >

              ‹

            </button>


            <div
              className="
                absolute
                bottom-5
                text-sm
                text-white
              "
            >

              {activeImageIndex +
                1}{" "}
              /{" "}
              {images.length}

            </div>

          </div>

        )}

      </div>

    </main>

  );

}