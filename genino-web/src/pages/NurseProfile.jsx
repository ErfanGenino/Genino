import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserRound,
} from "lucide-react";
import nurseDefaultImage from "../assets/nurse.png";


export default function NurseProfile() {

  const navigate = useNavigate();
  const [profile, setProfile] = useState({

    avatarUrl:"",

    isProfileVisible:true,

    isNurseActive:true,

    fullName:"",
    age:"",
    city:"",
    district:"",
    phone:"",

    experience:"",
    bio:"",

    ages:[],
    skills:[],
    workTypes:[],

    documents:{
  nationalIdUrl:"",
  birthCertificateUrl:"",
  criminalRecordUrl:"",
  certificatesUrl:"",
  educationUrl:"",
  experienceDocUrl:"",
  showNationalId:false,
  showBirthCertificate:false,
},

  });

  const [documentFiles, setDocumentFiles] = useState({});
  const [avatarFile, setAvatarFile] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [tagEditForm, setTagEditForm] = useState([]);

  const ageOptions = [
  "نوزاد",
  "۱ تا ۳ سال",
  "۳ تا ۶ سال",
  "بالای ۶ سال",
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


const workOptions = [
{
value:"HOURLY",
label:"پرستاری ساعتی"
},
{
value:"DAILY",
label:"پرستاری روزانه"
},
{
value:"FIXED",
label:"پرستاری ثابت"
},
];

const workLabelMap = {
  HOURLY:"پرستاری ساعتی",
  DAILY:"پرستاری روزانه",
  FIXED:"پرستاری ثابت",
};



  useEffect(()=>{

    loadProfile();

  },[]);



  async function loadProfile(){

    try{

      const token =
        localStorage.getItem("genino_token");


      const res =
        await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/nurses/profile/me`,
          {
            headers:{
              Authorization:
                `Bearer ${token}`,
            },
          }
        );


      const data =
        await res.json();


      console.log(
  "NURSE AVATAR:",
  data.nurseProfile.avatarUrl
);


      if(data.ok){

        const nurse =
          data.nurseProfile;


        setProfile({

          avatarUrl:
            nurse.avatarUrl || "",

          isProfileVisible:
            nurse.isProfileVisible ?? true,

          isNurseActive:
            nurse.isNurseActive ?? true,

          fullName:
            nurse.fullName || "",

          age:
            nurse.age || "",

          city:
            nurse.city || "",

          district:
            nurse.district || "",

          phone:
            nurse.phone || "",

          experience:
            nurse.experience || "",

          bio:
            nurse.bio || "",

          ages:
            nurse.ages || [],

          skills:
            nurse.skills || [],

          workTypes:
            nurse.workTypes || [],

          documents:{
  nationalIdUrl:
    nurse.nationalIdUrl || "",

  birthCertificateUrl:
    nurse.birthCertificateUrl || "",

  criminalRecordUrl:
    nurse.criminalRecordUrl || "",

  certificatesUrl:
    nurse.certificatesUrl || "",

  educationUrl:
    nurse.educationUrl || "",

  experienceDocUrl:
    nurse.experienceDocUrl || "",


  showNationalId:
    nurse.showNationalId || false,

  showBirthCertificate:
    nurse.showBirthCertificate || false,
},

        });

      }


    }catch(error){

      console.log(
        error
      );

    }

  }

  function startEdit(field, value){
  setEditingField(field);
  setEditForm({
    [field]: value,
  });
}

function startTagEdit(field, value){
  setEditingField(field);
  setTagEditForm(
    [...value]
  );
}

function toggleTagItem(item){
  if(tagEditForm.includes(item)){
    setTagEditForm(
      tagEditForm.filter(
        x=>x!==item
      )
    );
  }else{
    setTagEditForm([
      ...tagEditForm,
      item
    ]);
  }
}

async function saveProfileField(){
  try{
    const token =
      localStorage.getItem("genino_token");
      console.log(
  "EDIT DATA SENT:",
  editForm
);
    const res =
      await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/nurses/profile/me`,
        {
          method:"PUT",
          headers:{
            "Content-Type":"application/json",
            Authorization:
              `Bearer ${token}`,
          },
          body:
            JSON.stringify(editForm),
        }
      );
    const data =
      await res.json();
      console.log(
  "SAVE PROFILE RESPONSE:",
  data
);
    if(!res.ok){
      throw new Error(
        data.message ||
        "ذخیره انجام نشد"
      );
    }
    alert("اطلاعات ذخیره شد");
    setEditingField(null);
    setEditForm({});
    await loadProfile();
  }catch(error){
    console.log(error);
    alert(error.message);
  }
}

async function saveTagField(){
try{
const token =
localStorage.getItem("genino_token");
const body = {
  [editingField]:
  tagEditForm,
};
const res =
await fetch(
`${import.meta.env.VITE_API_BASE_URL}/nurses/profile/me`,
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:
`Bearer ${token}`,
},
body:
JSON.stringify(body),
}
);
const data =
await res.json();
if(!res.ok){
throw new Error(
data.message ||
"ذخیره انجام نشد"
);
}
alert("اطلاعات ذخیره شد");
setEditingField(null);
setTagEditForm([]);
loadProfile();
}catch(error){
console.log(error);
alert(error.message);
}
}

  function handleDocumentChange(e, key){
  const file = e.target.files[0];
  if(!file) return;
  setDocumentFiles(prev => ({
    ...prev,
    [key]: file,
  }));
}

function handleAvatarChange(e){
  const file = e.target.files[0];
  if(!file) return;
  setAvatarFile(file);
}

async function uploadNurseAvatar(file, token){

  if(!file) return null;


  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL;


  const fileNameParts =
    file.name.split(".");


  const ext =
    fileNameParts.length > 1
      ? fileNameParts.pop().toLowerCase()
      : "";


  const presignResponse =
    await fetch(
      `${API_BASE_URL}/uploads/presign/nurse-avatar`,
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json",

          Authorization:
            `Bearer ${token}`,
        },


        body:JSON.stringify({

          ext,

          contentType:file.type,

          fileName:file.name,

          fileSize:file.size,

        }),

      }
    );


  const presignData =
    await presignResponse.json();


  if(!presignResponse.ok){

    throw new Error(
      presignData.message ||
      "خطا در آماده سازی عکس"
    );

  }


  const uploadResponse =
    await fetch(
      presignData.uploadUrl,
      {
        method:"PUT",

        headers:{
          "Content-Type":file.type,
        },

        body:file,
      }
    );


  if(!uploadResponse.ok){

    throw new Error(
      "آپلود عکس انجام نشد"
    );

  }


  return presignData.publicUrl;

}


async function uploadNurseDocument(file, documentType, token) {

  if (!file) return null;


  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL;


  const fileNameParts =
    file.name.split(".");


  const ext =
    fileNameParts.length > 1
      ? fileNameParts.pop().toLowerCase()
      : "";


  const presignResponse =
    await fetch(
      `${API_BASE_URL}/uploads/presign/nurse-document`,
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json",

          Authorization:
            `Bearer ${token}`,
        },


        body:JSON.stringify({

          documentType,

          ext,

          contentType:file.type,

          fileName:file.name,

          fileSize:file.size,

        }),

      }
    );


  const presignData =
    await presignResponse.json();


  if(!presignResponse.ok){

    throw new Error(
      presignData.message ||
      "خطا در آماده‌سازی آپلود مدرک."
    );

  }


  const uploadResponse =
    await fetch(
      presignData.uploadUrl,
      {
        method:"PUT",

        headers:{
          "Content-Type":file.type,
        },

        body:file,
      }
    );


  if(!uploadResponse.ok){

    throw new Error(
      "آپلود مدرک انجام نشد."
    );

  }


  return presignData.publicUrl;

}


async function saveDocument(key){
  try{
    const token =
      localStorage.getItem("genino_token");
    const file =
      documentFiles[key];
    if(!file){
      alert("ابتدا فایل را انتخاب کنید.");
      return;
    }
    const url =
      await uploadNurseDocument(
        file,
        key,
        token
      );
    const body = {
      [`${key}Url`]: url,
    };
    const res =
      await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/nurses/documents`,
        {
          method:"PUT",
          headers:{
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${token}`,
          },
          body:
            JSON.stringify(body),
        }
      );
    const data =
      await res.json();
    if(!res.ok){
      throw new Error(
        data.message ||
        "ذخیره مدرک انجام نشد."
      );
    }
    alert(
  "مدرک با موفقیت ذخیره شد."
);
setDocumentFiles(prev => ({
  ...prev,
  [key]: null,
}));
loadProfile();
  }catch(error){
    console.log(error);
    alert(
      error.message ||
      "خطا در ذخیره مدرک"
    );
  }
}


async function deleteDocument(key){
  try{
    const token =
      localStorage.getItem("genino_token");
    const res =
      await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/nurses/documents`,
        {
          method:"PUT",
          headers:{
            "Content-Type":"application/json",
            Authorization:
              `Bearer ${token}`,
          },
          body:
            JSON.stringify({
              [`${key}Url`]: null
            }),
        }
      );
    const data =
      await res.json();
    if(!res.ok){
      throw new Error(
        data.message ||
        "حذف مدرک انجام نشد"
      );
    }
    alert("مدرک حذف شد");
    loadProfile();
  }catch(error){
    console.log(error);
    alert(error.message);
  }
}



async function saveAvatar(){

try{

const token =
localStorage.getItem("genino_token");


const url =
await uploadNurseAvatar(
avatarFile,
token
);


const res =
await fetch(
`${import.meta.env.VITE_API_BASE_URL}/nurses/profile/me`,
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:
`Bearer ${token}`,
},
body:JSON.stringify({
avatarUrl:url
}),
}
);


const data =
await res.json();
if(!res.ok){
throw new Error(
data.message ||
"ذخیره عکس انجام نشد"
);
}

alert("عکس پروفایل ذخیره شد");
setAvatarFile(null);
loadProfile();
}catch(error){
console.log(error);
alert(error.message);
}
}


async function toggleDocumentVisibility(field,value){
try{
const token =
localStorage.getItem("genino_token");
const res =
await fetch(
`${import.meta.env.VITE_API_BASE_URL}/nurses/profile/me`,
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:
`Bearer ${token}`,
},
body:JSON.stringify({
[field]:value
})
}
);
const data =
await res.json();
if(!res.ok){
throw new Error(
data.message ||
"ذخیره انجام نشد"
);
}
loadProfile();
}catch(error){
console.log(error);
alert(error.message);
}
}


async function toggleProfileVisibility(){
if(
  !profile.age ||
  Number(profile.age) <= 0
){
  alert(
    "لطفاً ابتدا سن خود را وارد کنید."
  );
  return;
}
try{
const token =
localStorage.getItem("genino_token");
const res =
await fetch(
`${import.meta.env.VITE_API_BASE_URL}/nurses/profile/me`,
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:
`Bearer ${token}`,
},
body:JSON.stringify({

isProfileVisible:
!profile.isProfileVisible,

isNurseActive:true

})
}
);
const data =
await res.json();
if(!res.ok){
throw new Error(
data.message ||
"خطا در تغییر وضعیت"
);
}
loadProfile();
}catch(error){
console.log(error);
alert(error.message);
}
}


async function endNurseActivity(){
  const confirmEnd =
    window.confirm(
      "آیا مطمئن هستید؟ با پایان فعالیت، پروفایل شما دیگر به عنوان پرستار نمایش داده نمی‌شود."
    );
  if(!confirmEnd) return;
  try{
    const token =
      localStorage.getItem("genino_token");
    const res =
      await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/nurses/profile/me`,
        {
          method:"PUT",
          headers:{
            "Content-Type":"application/json",
            Authorization:
              `Bearer ${token}`,
          },
          body:
  JSON.stringify({

    isNurseActive:false,

    isProfileVisible:false

  }),
        }
      );
    const data =
      await res.json();
    if(!res.ok){
      throw new Error(
        data.message ||
        "خطا در پایان فعالیت"
      );
    }
    alert(
      "فعالیت پرستاری شما پایان یافت."
    );
    loadProfile();
  }catch(error){
    console.log(error);
    alert(error.message);
  }
}



async function removeAvatar(){
  try{
    const token =
      localStorage.getItem("genino_token");
    const res =
      await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/nurses/profile/me`,
        {
          method:"PUT",

          headers:{
            "Content-Type":"application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body:JSON.stringify({
            avatarUrl:null
          }),
        }
      );
    const data =
      await res.json();
    if(!res.ok){
      throw new Error(
        data.message ||
        "حذف عکس انجام نشد"
      );
    }
    alert("عکس پروفایل حذف شد");
    setAvatarFile(null);
    loadProfile();
  }catch(error){
    console.log(error);
    alert(error.message);
  }
}

const avatarPreview =
  avatarFile
  ?
  URL.createObjectURL(avatarFile)
  :
  profile.avatarUrl || nurseDefaultImage;






  return (

    <main
      className="
      min-h-screen
      bg-[#fffaf4]
      px-4
      py-8
      text-right
      "
      dir="rtl"
    >


      <section
        className="
        mx-auto
        max-w-xl
        "
      >


        <div
          className="
          rounded-3xl
          bg-white
          p-6
          shadow
          "
        >


          <div
className="
relative
mx-auto
aspect-square
w-full
overflow-hidden
rounded-3xl
bg-yellow-50
"
>

<img
src={avatarPreview}
alt="پرستار کودک ژنینو"
className="
h-full
w-full
object-contain
"
/>

<label
className="
absolute
bottom-4
right-4
cursor-pointer
flex
items-center
gap-2
rounded-2xl
bg-[#d4af37]
px-5
py-3
text-sm
font-black
text-white
shadow-lg
hover:bg-[#b99620]
transition
"
>
<span>
📷
</span>
<span>
{
profile.avatarUrl
?
"تغییر عکس"
:
"انتخاب عکس"
}
</span>
<input
type="file"
accept="image/*"
hidden
onChange={handleAvatarChange}
/>
</label>

{
profile.avatarUrl && (
<button
type="button"
onClick={removeAvatar}
className="
absolute
bottom-4
right-40
rounded-2xl
bg-red-600
px-4
py-3
text-sm
font-bold
text-white
shadow-lg
"
>
🗑 حذف عکس
</button>
)
}

{
avatarFile && (

<button
type="button"
onClick={saveAvatar}
className="
absolute
bottom-4
left-4
rounded-2xl
bg-green-600
px-5
py-3
text-sm
font-bold
text-white
shadow
"
>
ذخیره عکس
</button>

)
}


</div>



          <h1
            className="
            mt-4
            text-center
            text-xl
            font-black
            text-[#725a22]
            "
          >
            پروفایل پرستار کودک ژنینو
          </h1>

          <p
            className="
            mt-2
            text-center
            text-sm
            text-gray-500
            "
          >
            اطلاعات ثبت شده شما در ژنینو
          </p>

          <button
type="button"
onClick={() => navigate("/child-nurses")}
className="
mt-4
mx-auto
flex
items-center
justify-center
rounded-full
border
border-amber-200
bg-amber-50
px-5
py-2
text-xs
font-black
text-[#725a22]
transition
hover:bg-amber-100
"
>
👩‍🍼 مشاهده صفحه پرستاران کودک ژنینو
</button>

          <div
className="
mt-6
space-y-3
"
>
<button
onClick={toggleProfileVisibility}
className={`
w-full
rounded-2xl
py-3
font-bold
text-white
${
profile.isProfileVisible
?
"bg-green-600"
:
"bg-gray-500"
}
`}
>
{
profile.isProfileVisible
?
"✅ پروفایل منتشر شده است (عدم انتشار)"
:
"⚪ پروفایل منتشر نیست (انتشار)"
}
</button>


<button
onClick={endNurseActivity}
className="
w-full
rounded-2xl
py-3
font-bold
text-white
bg-red-600
"
>
❌ پایان فعالیت به عنوان پرستار
</button>

</div>




          <div
            className="
            mt-6
            space-y-4
            "
          >



            <InfoBox
              title="نام و نام خانوادگی"
              value={profile.fullName}
            />


            <InfoBox
  title="سن"
  value={profile.age}
  field="age"
  editable={true}
  editingField={editingField}
  editForm={editForm}
  setEditForm={setEditForm}
  startEdit={startEdit}
  saveProfileField={saveProfileField}
/>



            <InfoBox
 title="شهر"
 value={profile.city}
 field="city"
 editable={true}
 editingField={editingField}
 editForm={editForm}
 setEditForm={setEditForm}
 startEdit={startEdit}
 saveProfileField={saveProfileField}
/>



            <InfoBox
 title="منطقه"
 value={profile.district}
 field="district"
 editable={true}
 editingField={editingField}
 editForm={editForm}
 setEditForm={setEditForm}
 startEdit={startEdit}
 saveProfileField={saveProfileField}
/>



            <InfoBox
 title="شماره تماس"
 value={profile.phone}
 field="phone"
 editable={true}
 editingField={editingField}
 editForm={editForm}
 setEditForm={setEditForm}
 startEdit={startEdit}
 saveProfileField={saveProfileField}
/>



            <InfoBox
              title="تجربه کاری"
              value={profile.experience}
              field="experience"
              editable={true}
              editingField={editingField}
 editForm={editForm}
 setEditForm={setEditForm}
 startEdit={startEdit}
 saveProfileField={saveProfileField}
            />



            <InfoBox
              title="درباره تجربه و علاقه"
              value={profile.bio}
              field="bio"
              editable={true}
              editingField={editingField}
 editForm={editForm}
 setEditForm={setEditForm}
 startEdit={startEdit}
 saveProfileField={saveProfileField}
            />





            <TagBox
 title="تجربه با کودکان"
 field="ages"
 items={profile.ages}
 options={ageOptions}
 toggleTagItem={toggleTagItem}
 editable={true}
 editingField={editingField}
 tagEditForm={tagEditForm}
 setTagEditForm={setTagEditForm}
 startTagEdit={startTagEdit}
 saveTagField={saveTagField}
/>



            <TagBox
 title="مهارت‌ها"
 field="skills"
 items={profile.skills}
 options={skillOptions}
 toggleTagItem={toggleTagItem}
 editable={true}
 editingField={editingField}
 tagEditForm={tagEditForm}
 setTagEditForm={setTagEditForm}
 startTagEdit={startTagEdit}
 saveTagField={saveTagField}
/>



            <TagBox
 title="نوع همکاری"
 field="workTypes"
 items={profile.workTypes}
 options={workOptions}
 labelMap={workLabelMap}
 toggleTagItem={toggleTagItem}
 editable={true}
 editingField={editingField}
 tagEditForm={tagEditForm}
 setTagEditForm={setTagEditForm}
 startTagEdit={startTagEdit}
 saveTagField={saveTagField}
/>

            <DocumentBox
 documents={profile.documents}
 documentFiles={documentFiles}
 handleDocumentChange={handleDocumentChange}
 saveDocument={saveDocument}
 deleteDocument={deleteDocument}
 toggleDocumentVisibility={toggleDocumentVisibility}
/>




          </div>



        </div>


      </section>


    </main>

  );

}



function InfoBox({
  title,
  value,
  field="",
  editable=false,
  editingField,
  editForm,
  setEditForm,
  startEdit,
  saveProfileField
}){

return (

<div
className="
rounded-2xl
bg-yellow-50
p-4
text-sm
"
>

<div
className="
flex
items-center
justify-between
font-bold
text-[#725a22]
"
>

<span>
{title}
</span>


{
editable && (

<button
onClick={()=>
  startEdit(field,value)
}
className="
text-xs
text-blue-600
"
>
ویرایش
</button>

)
}


</div>


{
editingField === field

?

<div className="mt-3">

<input
type={field==="age" ? "number" : "text"}
value={editForm?.[field] || ""}
onChange={(e)=>
setEditForm({
...editForm,
[field]:e.target.value
})
}
className="
w-full
rounded-xl
border
p-2
"
/>


<button
onClick={saveProfileField}
className="
mt-2
rounded-xl
bg-green-600
px-3
py-2
text-white
"
>
ذخیره
</button>


</div>

:

<div
className="
mt-2
leading-7
text-gray-600
"
>
{value || "-"}
</div>

}


</div>

)

}



function TagBox({
title,
field,
items=[],
options=[],
labelMap={},
editable=false,
editingField,
tagEditForm,
setTagEditForm,
startTagEdit,
saveTagField,
toggleTagItem
}){
return (
<div
className="
rounded-2xl
bg-yellow-50
p-4
text-sm
"
>
<div
className="
flex
items-center
justify-between
font-bold
text-[#725a22]
"
>
<span>
{title}
</span>
{
editable && (
<button
onClick={()=>
startTagEdit(
field,
items
)
}
className="
text-xs
text-blue-600
"
>
ویرایش
</button>
)
}
</div>
{
editingField === field
?
<div className="mt-3">
<div
className="
grid
grid-cols-2
gap-3
mt-3
"
>

{
options.map(item=>(

<button
type="button"
key={item.value || item}
onClick={()=>toggleTagItem(
item.value || item
)}
className={`
rounded-2xl
border
p-3
text-xs
font-bold

${
tagEditForm.includes(item.value || item)

?
"border-[#d4af37] bg-yellow-100 text-[#725a22]"

:

"border-gray-100 bg-white text-gray-500"

}

`}
>

{item.label || item}

</button>

))

}

</div>
<button
onClick={saveTagField}
className="
mt-2
rounded-xl
bg-green-600
px-3
py-2
text-white
"
>
ذخیره
</button>
</div>
:
<div
className="
mt-3
flex
flex-wrap
gap-2
"
>
{
items.map(item=>(
<span
key={item}
className="
rounded-full
border
border-yellow-200
bg-white
px-3
py-1
text-xs
text-gray-600
"
>
{
labelMap[item] || item
}
</span>
))
}

</div>
}
</div>
)
}


function DocumentBox({
  documents,
  documentFiles,
  handleDocumentChange,
  saveDocument,
  deleteDocument,
  toggleDocumentVisibility
}){


const requiredDocuments = [
{
title:"کارت ملی",
url:documents.nationalIdUrl,
type:"nationalId",
visible:documents.showNationalId
},
{
title:"شناسنامه",
url:documents.birthCertificateUrl,
type:"birthCertificate",
visible:documents.showBirthCertificate
},
{
title:"گواهی عدم سوءپیشینه",
url:documents.criminalRecordUrl,
alwaysVisible:true
},
];


const optionalDocuments = [

{
title:"گواهی دوره‌های آموزشی",
key:"certificates",
url:documents.certificatesUrl
},

{
title:"مدارک تحصیلی",
key:"education",
url:documents.educationUrl
},

{
title:"سابقه کاری",
key:"experienceDoc",
url:documents.experienceDocUrl
},

];



function DocumentItem({
item,
optional=false,
handleDocumentChange,
documentFiles,
saveDocument,
deleteDocument,
toggleDocumentVisibility
}){


return (

<div
className="
rounded-xl
border
border-yellow-200
bg-white
p-3
text-xs
"
>


<div
className="
font-bold
text-gray-700
mb-2
"
>
{item.title}
</div>



{
item.url

?

<div
className="
flex
gap-2
"
>

<a
href={item.url}
target="_blank"
rel="noreferrer"
className="
inline-flex
rounded-xl
bg-blue-50
px-3
py-2
text-blue-600
font-bold
"
>
مشاهده فایل
</a>

{
item.type && (
<label
className="
mt-3
flex
items-center
gap-2
cursor-pointer
text-sm
font-bold
"
>
<input
type="checkbox"
checked={item.visible}
onChange={(e)=>
toggleDocumentVisibility(
  item.type === "nationalId"
  ?
  "showNationalId"
  :
  "showBirthCertificate",
  e.target.checked
)
}
className="
h-5
w-5
accent-green-600
"
/>
<span
className={
item.visible
?
"text-green-600"
:
"text-gray-500"
}
>
نمایش برای عموم
</span>
</label>
)
}


{
optional && (

<div>

<label
className="
cursor-pointer
inline-flex
rounded-xl
bg-yellow-100
px-3
py-2
text-yellow-700
font-bold
"
>
ویرایش


<input
type="file"
accept="image/*,.pdf"
hidden
onChange={(e)=>
  handleDocumentChange(
    e,
    item.key
  )
}
/>
</label>


{
optional && (
<button
type="button"
onClick={()=>deleteDocument(item.key)}
className="
rounded-xl
bg-red-100
px-3
py-2
text-red-700
font-bold
"
>
حذف
</button>
)
}



{
documentFiles?.[item.key] && (

<button
type="button"
onClick={()=>saveDocument(item.key)}
className="
mr-2
rounded-xl
bg-green-600
px-3
py-2
text-white
font-bold
"
>
ذخیره تغییرات
</button>

)

}

</div>

)
}


</div>


:

<div
className="
flex
items-center
justify-between
"
>


<span
className="
text-gray-400
"
>
هنوز مدرکی ارسال نشده است
</span>


{
optional && (

<div>

<label
className="
cursor-pointer
inline-flex
rounded-xl
bg-emerald-50
px-3
py-2
text-emerald-700
font-bold
"
>

بارگذاری مدرک


<input
type="file"
accept="image/*,.pdf"
hidden
onChange={(e)=>
  handleDocumentChange(
    e,
    item.key
  )
}
/>


</label>


{
documentFiles?.[item.key] && (

<div
className="
mt-2
text-emerald-600
font-bold
"
>
✅ فایل انتخاب شد:
{" "}
{documentFiles[item.key].name}
</div>

)
}

{
documentFiles?.[item.key] && (

<button
type="button"
onClick={()=>saveDocument(item.key)}
className="
mt-2
rounded-xl
bg-green-600
px-3
py-2
text-white
font-bold
"
>
ذخیره مدرک
</button>

)
}

</div>

)
}


</div>

}



</div>

)

}



return (

<div
className="
rounded-2xl
bg-yellow-50
p-4
text-sm
"
>


<div
className="
font-bold
text-[#725a22]
"
>
مدارک ارسالی
</div>




{/* مدارک اجباری */}

<div
className="
mt-4
font-bold
text-gray-700
"
>
مدارک اجباری
</div>


<div
className="
mt-3
space-y-2
"
>

{
requiredDocuments.map(item=>(

<DocumentItem
key={item.title}
item={item}
toggleDocumentVisibility={toggleDocumentVisibility}
/>

))
}

</div>





{/* مدارک اختیاری */}

<div
className="
mt-6
font-bold
text-gray-700
"
>
مدارک اختیاری
</div>


<div
className="
mt-3
space-y-2
"
>

{
optionalDocuments.map(item=>(

<DocumentItem
key={item.title}
item={item}
optional={true}
handleDocumentChange={handleDocumentChange}
documentFiles={documentFiles}
saveDocument={saveDocument}
deleteDocument={deleteDocument}
toggleDocumentVisibility={toggleDocumentVisibility}
/>

))
}

</div>



</div>

)

}