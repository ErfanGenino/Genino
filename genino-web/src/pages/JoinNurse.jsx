import { useEffect, useState } from "react";
import {
  HeartHandshake,
  MapPin,
  Phone,
  User,
  Baby,
  Sparkles,
  ShieldCheck,
} from "lucide-react";


export default function JoinNurse() {


  const [form, setForm] = useState({

    fullName: "",
    age: "",
    city: "",
    district: "",
    phone: "",
    experience: "",
    bio: "",

  });


  const [ages, setAges] = useState([]);
  const [skills, setSkills] = useState([]);
  const [workTypes, setWorkTypes] = useState([]);
  const [documents, setDocuments] = useState({
    nationalId: null,
    birthCertificate: null,
    criminalRecord: null,
    certificates: null,
    education: null,
    experienceDoc: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [existingProfile, setExistingProfile] = useState(null);
  const [checkingProfile, setCheckingProfile] = useState(true);
  const [isResubmitMode, setIsResubmitMode] = useState(false);


  const ageOptions = [
    "نوزاد",
    "۱ تا ۳ سال",
    "۳ تا ۶ سال",
    "بالای ۶ سال",
  ];


  const workOptions = [
  {
    value: "HOURLY",
    label: "پرستاری ساعتی",
  },
  {
    value: "DAILY",
    label: "پرستاری روزانه",
  },
  {
    value: "FIXED",
    label: "پرستاری ثابت",
  },
];


  const skillOptions = [
  "مراقبت از نوزاد",
  "تعویض پوشک و مراقبت‌های بهداشتی کودک",
  "حمام کردن و رسیدگی به نظافت کودک",
  "شیردهی و مراقبت از تغذیه کودک",
  "آماده‌سازی غذای کودک",
  "کمک‌های اولیه کودک",
  "مراقبت هنگام بیماری کودک",
  "مصرف صحیح دارو طبق دستور والدین",
  "اندازه‌گیری تب و مراقبت‌های اولیه پزشکی",
  "خواباندن و تنظیم خواب کودک",
  "بازی و سرگرمی کودک",
  "قصه‌گویی و فعالیت آموزشی",
  "آموزش مهارت‌های اولیه زندگی به کودک",
  "کمک به تکالیف مدرسه",
  "همراهی کودک در انجام فعالیت‌های روزانه",
  "آشنایی با روانشناسی کودک",
  "شناخت رفتار و احساسات کودک",
  "صبوری و ارتباط موثر با کودک",
  "مراقبت از کودک با نیازهای خاص",
  "مراقبت از کودک اوتیسم",
  "مراقبت از کودک کم‌توان یا دارای معلولیت",
  "آشنایی با ایمنی محیط کودک",
  "همراهی کودک در بیرون از منزل",
  "مراقبت از چند کودک همزمان",
];

  const documentOptions = [
  {
    key: "nationalId",
    urlKey: "nationalIdUrl",
    title: "تصویر کارت ملی",
    required: true,
  },
  {
    key: "birthCertificate",
    urlKey: "birthCertificateUrl",
    title: "تصویر شناسنامه",
    required: true,
  },
  {
    key: "criminalRecord",
    urlKey: "criminalRecordUrl",
    title: "گواهی عدم سوءپیشینه",
    required: true,
  },
  {
    key: "certificates",
    urlKey: "certificatesUrl",
    title: "گواهی دوره‌های آموزشی",
    required: false,
  },
  {
    key: "education",
    urlKey: "educationUrl",
    title: "مدارک تحصیلی",
    required: false,
  },
  {
    key: "experienceDoc",
    urlKey: "experienceDocUrl",
    title: "سابقه کاری",
    required: false,
  },
];


useEffect(() => {
  async function loadNurseProfile() {
    const token =
      localStorage.getItem("genino_token");
    if (!token) {
      setCheckingProfile(false);
      return;
    }
    try {
      const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(
        `${API_BASE_URL}/nurses/me`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );
      // یعنی هنوز درخواست پرستاری ندارد
      if (response.status === 404) {
        setExistingProfile(null);
        return;
      }
      const data =
        await response.json();
      if (!response.ok) {
        throw new Error(
          data.message ||
            "خطا در دریافت وضعیت درخواست."
        );
      }
      const profile =
        data.nurseProfile;
      setExistingProfile(profile);
      // اگر درخواست رد شده،
      // اطلاعات قبلی داخل فرم قرار بگیرد
      if (profile.status === "REJECTED") {
        setIsResubmitMode(true);
        setForm({
          fullName:
            profile.fullName || "",
          age:
            profile.age || "",
          city:
            profile.city || "",
          district:
            profile.district || "",
          phone:
            profile.phone || "",
          experience:
            profile.experience || "",
          bio:
            profile.bio || "",
        });
        setAges(
          Array.isArray(profile.ages)
            ? profile.ages
            : []
        );
        setSkills(
          Array.isArray(profile.skills)
            ? profile.skills
            : []
        );
        setWorkTypes(
          Array.isArray(profile.workTypes)
            ? profile.workTypes
            : []
        );
      }
    } catch (error) {
      console.error(
        "LOAD NURSE PROFILE ERROR:",
        error
      );
    } finally {
      setCheckingProfile(false);
    }
  }

  loadNurseProfile();
}, []);



  function handleChange(e){

    setForm({

      ...form,
      [e.target.name]: e.target.value,

    });

  }



  function toggleItem(
    item,
    list,
    setter
  ){

    if(list.includes(item)){

      setter(
        list.filter(
          x=>x!==item
        )
      );

    }else{

      setter([
        ...list,
        item
      ]);

    }

  }

  function handleDocumentChange(e, key){

  const file = e.target.files[0];

  if(!file) return;


  setDocuments({
    ...documents,
    [key]: file,
  });

}

async function uploadNurseDocument(file, documentType, token) {
  if (!file) return null;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fileNameParts = file.name.split(".");
  const ext =
    fileNameParts.length > 1
      ? fileNameParts.pop().toLowerCase()
      : "";

  const presignResponse = await fetch(
    `${API_BASE_URL}/uploads/presign/nurse-document`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        documentType,
        ext,
        contentType: file.type,
        fileName: file.name,
        fileSize: file.size,
      }),
    }
  );

  const presignData =
    await presignResponse.json();

  if (!presignResponse.ok) {
    throw new Error(
      presignData.message ||
        "خطا در آماده‌سازی آپلود مدرک."
    );
  }

  const uploadResponse = await fetch(
    presignData.uploadUrl,
    {
      method: "PUT",

      headers: {
        "Content-Type": file.type,
      },

      body: file,
    }
  );

  if (!uploadResponse.ok) {
    throw new Error(
      "آپلود یکی از مدارک انجام نشد."
    );
  }

  return presignData.publicUrl;
}


  async function handleSubmit(e) {
  e.preventDefault();

  if (submitting) return;

  const token =
    localStorage.getItem("genino_token");

  if (!token) {
    alert(
      "برای ثبت درخواست باید وارد حساب ژنینو شوید."
    );
    return;
  }


  // اطلاعات اصلی
  if (!form.fullName.trim()) {
    alert(
      "نام و نام خانوادگی را وارد کنید."
    );
    return;
  }

  if (!form.age) {
  alert(
    "سن را وارد کنید."
  );
  return;
}

  if (!form.city.trim()) {
    alert(
      "شهر را وارد کنید."
    );
    return;
  }

  if (!form.phone.trim()) {
    alert(
      "شماره تماس را وارد کنید."
    );
    return;
  }


  // مدارک اجباری
  if (
  !isResubmitMode &&
  !documents.nationalId
) {
  alert("تصویر کارت ملی الزامی است.");
  return;
}

if (
  !isResubmitMode &&
  !documents.birthCertificate
) {
  alert("تصویر شناسنامه الزامی است.");
  return;
}

if (
  !isResubmitMode &&
  !documents.criminalRecord
) {
  alert("گواهی عدم سوءپیشینه الزامی است.");
  return;
}


  try {

    setSubmitting(true);

    const API_BASE_URL =
      import.meta.env.VITE_API_BASE_URL;


    // ==========================
    // آپلود مدارک
    // ==========================

    const nationalIdUrl =
  documents.nationalId
    ? await uploadNurseDocument(
        documents.nationalId,
        "nationalId",
        token
      )
    : undefined;


const birthCertificateUrl =
  documents.birthCertificate
    ? await uploadNurseDocument(
        documents.birthCertificate,
        "birthCertificate",
        token
      )
    : undefined;


const criminalRecordUrl =
  documents.criminalRecord
    ? await uploadNurseDocument(
        documents.criminalRecord,
        "criminalRecord",
        token
      )
    : undefined;


    const certificatesUrl =
  documents.certificates
    ? await uploadNurseDocument(
        documents.certificates,
        "certificates",
        token
      )
    : undefined;


const educationUrl =
  documents.education
    ? await uploadNurseDocument(
        documents.education,
        "education",
        token
      )
    : undefined;


const experienceDocUrl =
  documents.experienceDoc
    ? await uploadNurseDocument(
        documents.experienceDoc,
        "experienceDoc",
        token
      )
    : undefined;


    // ==========================
    // ثبت پروفایل
    // ==========================

    const endpoint =
  isResubmitMode
    ? `${API_BASE_URL}/nurses/resubmit`
    : `${API_BASE_URL}/nurses/register`;

const response = await fetch(
  endpoint,
  {
    method:
      isResubmitMode
        ? "PUT"
        : "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify({
          ...form,

          ages,
          skills,
          workTypes,

          nationalIdUrl,
          birthCertificateUrl,
          criminalRecordUrl,

          certificatesUrl,
          educationUrl,
          experienceDocUrl,
        }),
      }
    );


    const data =
      await response.json();


    if (!response.ok) {
      throw new Error(
        data.message ||
          "ثبت درخواست انجام نشد."
      );
    }


   alert(
  isResubmitMode
    ? "اصلاحات شما ثبت شد 🌱\nدرخواست دوباره برای بررسی ژنینو ارسال شد."
    : "درخواست شما با موفقیت ثبت شد 🌱\nپس از بررسی ژنینو، نتیجه اعلام خواهد شد."
);

setExistingProfile((prev) => ({
  ...(prev || {}),
  ...data.nurseProfile,
  status: "PENDING",
}));

setIsResubmitMode(false);


  } catch (error) {

    console.error(
      "NURSE REGISTER ERROR:",
      error
    );

    alert(
      error.message ||
        "خطایی در ثبت درخواست رخ داد."
    );

  } finally {

    setSubmitting(false);

  }
}



function getStatusBox() {

  if (!existingProfile) return null;


  if (existingProfile.status === "PENDING") {

    return (
      <div
        className="
        mb-5
        rounded-3xl
        bg-yellow-50
        border
        border-yellow-200
        p-4
        text-right
        text-sm
        font-bold
        text-yellow-700
        "
      >
        ⏳ درخواست شما در انتظار بررسی ژنینو است.
      </div>
    );
  }



  if (existingProfile.status === "APPROVED") {
    return (
      <div
        className="
        mb-5
        rounded-3xl
        bg-emerald-50
        border
        border-emerald-200
        p-4
        text-right
        text-sm
        font-bold
        text-emerald-700
        "
      >
        ✅ درخواست شما تایید شده است و پروفایل شما در بخش پرستاران نمایش داده می‌شود.
      </div>
    );
  }



  if (existingProfile.status === "REJECTED") {
    return (
      <div
        className="
        mb-5
        rounded-3xl
        bg-red-50
        border
        border-red-200
        p-4
        text-right
        text-sm
        font-bold
        text-red-700
        "
      >
        <div>
          ❌ درخواست شما تایید نشد.
        </div>


        {
          existingProfile.rejectionReason && (
            <div
              className="
              mt-2
              text-xs
              leading-6
              "
            >
              دلیل:
              {" "}
              {existingProfile.rejectionReason}
            </div>
          )
        }
      </div>
    );
  }



  if (existingProfile.status === "SUSPENDED") {
    return (
      <div
        className="
        mb-5
        rounded-3xl
        bg-orange-50
        border
        border-orange-200
        p-4
        text-right
        text-sm
        font-bold
        text-orange-700
        "
      >
        ⚠️ پروفایل پرستاری شما موقتاً تعلیق شده است.
      </div>
    );
  }
}






return (

<main
className="
relative
min-h-screen
overflow-hidden
bg-gradient-to-br
from-[#fff7e8]
via-[#fffaf4]
to-[#eaf8f1]
px-4
py-8
text-gray-800
"
>


<div
className="
absolute
-right-32
top-10
h-80
w-80
rounded-full
bg-yellow-200/40
blur-3xl
"
/>


<div
className="
absolute
-left-32
bottom-20
h-80
w-80
rounded-full
bg-emerald-200/30
blur-3xl
"
/>



<section
className="
relative
mx-auto
max-w-xl
"
>



{/* Header */}

<div
className="
rounded-[2.5rem]
border
border-white
bg-white/85
p-6
text-center
shadow-xl
backdrop-blur
"
>


<div
className="
mx-auto
flex
h-16
w-16
items-center
justify-center
rounded-full
bg-gradient-to-br
from-[#f5d86f]
to-[#b98522]
text-white
shadow-lg
"
>

<HeartHandshake size={32}/>

</div>



<h1
className="
mt-4
text-2xl
font-black
text-[#725a22]
"
>

ثبت‌نام پرستار کودک ژنینو

</h1>


<p
className="
mt-3
text-sm
leading-7
text-stone-500
"
>

پروفایل خود را بسازید و توسط خانواده‌های
ژنینو دیده شوید.

</p>


<div
className="
mt-4
flex
items-center
justify-center
gap-2
rounded-2xl
bg-emerald-50
px-4
py-3
text-xs
font-bold
text-emerald-700
"
>

<ShieldCheck size={16}/>

اطلاعات شما پس از بررسی نمایش داده می‌شود

</div>


</div>


{getStatusBox()}


{!checkingProfile &&
  (
    !existingProfile ||
    existingProfile.status === "REJECTED"
  ) && (

<form
onSubmit={handleSubmit}
className="
mt-5
space-y-5
"
>



<Card title="اطلاعات شخصی">


<Input
icon={<User size={18}/>}
name="fullName"
placeholder="نام و نام خانوادگی"
value={form.fullName}
onChange={handleChange}
/>


<Input
icon={<User size={18}/>}
name="age"
placeholder="سن (مثلاً 40)"
value={form.age}
onChange={handleChange}
/>


<Input
icon={<MapPin size={18}/>}
name="city"
placeholder="شهر"
value={form.city}
onChange={handleChange}
/>


<Input
icon={<MapPin size={18}/>}
name="district"
placeholder="مناطقی که می توانید فعالیت کنید"
value={form.district}
onChange={handleChange}
/>


<Input
icon={<Phone size={18}/>}
name="phone"
placeholder="شماره تماس"
value={form.phone}
onChange={handleChange}
/>


</Card>






<Card title="تجربه کاری">


<Input
icon={<Sparkles size={18}/>}
name="experience"
placeholder="مثلاً ۵ سال سابقه مراقبت از کودک"
value={form.experience}
onChange={handleChange}
/>



<textarea
name="bio"
value={form.bio}
onChange={handleChange}
placeholder="درباره تجربه و علاقه خود بنویسید..."
className="
mt-3
h-28
w-full
rounded-2xl
border
border-yellow-100
bg-yellow-50/50
p-4
text-right
text-sm
outline-none
"
/>


</Card>





<Card title="تجربه با چه کودکانی دارید؟">


<div
className="
grid
grid-cols-2
gap-3
"
>

{ageOptions.map(item=>(

<button
type="button"
key={item}
onClick={()=>toggleItem(item,ages,setAges)}
className={`
rounded-2xl
border
p-3
text-xs
font-bold
transition

${
ages.includes(item)

?
"border-[#d4af37] bg-yellow-100 text-[#725a22]"

:
"border-gray-100 bg-white text-gray-500"

}

`}
>

<Baby
size={16}
className="mx-auto mb-1"
/>

{item}

</button>


))}


</div>


</Card>


<Card title="مهارت‌های شما">


<div
className="
grid
grid-cols-2
gap-3
"
>

{skillOptions.map(item=>(

<button
type="button"
key={item}
onClick={() =>
  toggleItem(
    item,
    skills,
    setSkills
  )
}
className={`

rounded-2xl
border
p-3
text-xs
font-bold
transition

${
skills.includes(item)

?

"border-[#d4af37] bg-yellow-100 text-[#725a22]"

:

"border-gray-100 bg-white text-gray-500"

}

`}
>

<Sparkles
size={16}
className="
mx-auto
mb-1
"
/>

{item}

</button>

))}

</div>


</Card>



<Card title="نوع همکاری">


<div
className="
grid
grid-cols-3
gap-2
"
>


{workOptions.map((item) => (

  <button
    type="button"
    key={item.value}
    onClick={() =>
      toggleItem(
        item.value,
        workTypes,
        setWorkTypes
      )
    }
    className={`
      rounded-2xl
      p-3
      text-xs
      font-bold
      border

      ${
        workTypes.includes(item.value)
          ? "border-[#d4af37] bg-yellow-100 text-[#725a22]"
          : "border-gray-100 bg-white text-gray-500"
      }
    `}
  >
    {item.label}
  </button>

))}


</div>


</Card>


<Card title="مدارک مورد نیاز">


<p
className="
mb-4
rounded-2xl
bg-emerald-50
p-3
text-right
text-xs
leading-6
font-bold
text-emerald-700
"
>
مدارک شما فقط توسط تیم ژنینو بررسی می‌شود
و برای افزایش اعتماد خانواده‌ها استفاده خواهد شد.
</p>


<div
className="
space-y-3
"
>

{documentOptions.map(doc=>(

<div
key={doc.key}
className="
rounded-2xl
border
border-gray-100
bg-white
p-3
"
>

<div
className="
mb-2
flex
items-center
justify-between
text-xs
font-bold
"
>

<span>
{doc.title}
</span>


<span
className={
doc.required
?
"text-red-500"
:
"text-gray-400"
}
>
{
doc.required
?
"الزامی"
:
"اختیاری"
}
</span>

</div>


<input
type="file"
accept="image/*,.pdf"
onChange={(e)=>
handleDocumentChange(
e,
doc.key
)
}
className="
w-full
text-xs
"
/>


{existingProfile?.[doc.urlKey] && (
  <div className="mt-3">
    <a
      href={existingProfile[doc.urlKey]}
      target="_blank"
      rel="noreferrer"
      className="
        inline-flex
        items-center
        rounded-xl
        bg-blue-50
        px-3
        py-2
        text-xs
        font-bold
        text-blue-600
        transition
        hover:bg-blue-100
      "
    >
      مشاهده فایل بارگذاری‌شده
    </a>
  </div>
)}


{documents[doc.key] && (
  <div className="
    mt-2
    text-xs
    text-emerald-600
    font-bold
  ">
    ✅ فایل جدید برای جایگزینی انتخاب شد
  </div>
)}


</div>

))}

</div>


</Card>


<button
  type="submit"
  disabled={submitting}
  className="
    w-full
    rounded-2xl
    bg-gradient-to-l
    from-[#d4af37]
    to-[#b98522]
    py-3.5
    text-sm
    font-black
    text-white
    shadow-lg
    transition
    active:scale-95
    disabled:cursor-not-allowed
    disabled:opacity-60
  "
>
  {submitting
  ? (
      isResubmitMode
        ? "در حال ارسال مجدد درخواست..."
        : "در حال ارسال مدارک و ثبت درخواست..."
    )
  : (
      isResubmitMode
        ? "ثبت اصلاحات و ارسال مجدد برای بررسی"
        : "ثبت اطلاعات و ارسال برای بررسی"
    )}
</button>


</form>

)}

</section>


</main>

);

}





function Card({
title,
children
}){


return (

<div
className="
rounded-[2.3rem]
border
border-white
bg-white/90
p-5
shadow-lg
backdrop-blur
"
>

<h2
className="
mb-4
text-right
text-lg
font-black
text-[#725a22]
"
>

{title}

</h2>

{children}

</div>

)

}




function Input({
icon,
name,
placeholder,
value,
onChange
}){


return (

<div
className="
flex
items-center
gap-3
rounded-2xl
border
border-yellow-100
bg-yellow-50/50
px-4
"
>

<span className="text-[#b98522]">
{icon}
</span>


<input

type={name === "age" ? "number" : "text"}

name={name}
value={value}
onChange={onChange}
placeholder={placeholder}

className="
w-full
bg-transparent
py-3
text-right
text-sm
outline-none
"

/>


</div>

)

}