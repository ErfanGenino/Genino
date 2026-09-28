// ============================================================================
// File: src/pages/vendor/service/VendorSchoolPage.jsx
// Description: تکمیل پروفایل مدرسه توسط وندور - نسخه اولیه
// ============================================================================

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Upload, GraduationCap, Award, Trash2, Pencil } from "lucide-react";
import SchoolFeatureSection, {
  SCHOOL_FEATURE_SECTIONS,
} from "./components/SchoolFeatureSection";
import SchoolStudentsSection from "./components/SchoolStudentsSection";
import PromoSlider from "../../../components/Social/PromoSlider.jsx";
import ProductCard from "../../../components/Product/ProductCard";
import {
  getVendorSchoolProfile,
  saveVendorSchoolProfile,
  presignVendorSchoolHeaderUpload,
  presignVendorSchoolStaffUpload,
  putFileToPresignedUrl,
  createSchoolAchievement,
  getSchoolAchievements
} from "../../../services/api";


function formatPersianDate(date) {
  if (!date) return "";

  try {
    return new Intl.DateTimeFormat(
      "fa-IR",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }
    ).format(new Date(date));

  } catch {
    return date;
  }
}



export default function VendorSchoolPage(){

  const { vendorId } = useParams();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const loggedVendorId =
  localStorage.getItem("genino_vendor_id");

  const isVendorOwner =
  Boolean(loggedVendorId) &&
  Number(loggedVendorId) === Number(vendorId);
  const [activeHeaderIndex,setActiveHeaderIndex] = useState(0);
  const [loadingSchool,setLoadingSchool] = useState(true);
  const [schoolId,setSchoolId]=useState(null);
  const [vendor,setVendor]=useState(null);
  const [products,setProducts]=useState([]);
  const [loadingProducts,setLoadingProducts]=useState(true);
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [schoolValidationErrors, setSchoolValidationErrors] =
  useState({});
  const [
  selectedAchievementChild,
  setSelectedAchievementChild
  ] = useState(null);


  const [
achievementForm,
setAchievementForm
] = useState({
  category:"",
  title:"",
  description:""
});


const [
  showAchievementHistory,
  setShowAchievementHistory
] = useState(false);

const [
  schoolAchievements,
  setSchoolAchievements
] = useState([]);

const [
  loadingAchievements,
  setLoadingAchievements
] = useState(false);



  const [school,setSchool] = useState({

    headerImages:[],

    schoolName:"",
    slogan:"",

    city:"",
    district:"",
    address:"",
    phone:"",
    email:"",

    gender:"",
    educationLevels:[],
    schoolType:"",

    foundedYear:"",

    area:"",
    buildingCount:"",
    classroomCount:"",
    studentCapacity:"",

    facilities:{
  آموزشی:{},
  علمی:{},
  ورزشی:{},
  رفاهی:{},
  فناوری:{},
},

    teacherCount:"",
    teacherExperience:"",
    scientificLevel:"",

    staffMembers:[],
    students:[],
    resume:"",

  });


  const updateField = (key,value)=>{
    setSchool(prev=>({
      ...prev,
      [key]:value
    }));
  };


  useEffect(()=>{
async function loadSchool(){
try{
const res =
await getVendorSchoolProfile(vendorId);
if(res?.ok && res.school){
setSchoolId(res.school.id);
setSchool(prev=>({
...prev,
...res.school,
headerImages:
res.school.headerImages || [],
educationLevels:
res.school.educationLevels || [],
staffMembers:
res.school.staffMembers || [],
students:
res.school.students || [],
facilities:
  res.school.facilities ??
  {
    آموزشی:{},
    علمی:{},
    ورزشی:{},
    رفاهی:{},
    فناوری:{},
  }
}));
}
}catch(error){
console.error(
"LOAD SCHOOL PROFILE ERROR",
error
);}
finally{
setLoadingSchool(false);
}}
if(vendorId){
loadSchool();
}
},[vendorId]);


  useEffect(()=>{
    async function loadVendorProducts(){
      try{
        setLoadingProducts(true);

        const productsUrl = isVendorOwner
  ? `${API_BASE_URL}/vendor-products/vendor/${vendorId}`
  : `${API_BASE_URL}/vendor-products/public`;

const productHeaders = isVendorOwner
  ? {
      Authorization:
        `Bearer ${localStorage.getItem("genino_token")}`,
      Accept: "application/json",
    }
  : {
      Accept: "application/json",
    };

const [vendorRes, productsRes] =
  await Promise.all([
    fetch(
      `${API_BASE_URL}/vendors/${vendorId}`
    ),

    fetch(productsUrl, {
      method: "GET",
      headers: productHeaders,
    }),
  ]);

        const vendorData = await vendorRes.json();
        const productsData = await productsRes.json();

        if(!vendorRes.ok || !vendorData?.ok){
          throw new Error(
            vendorData?.message ||
            "خطا در دریافت اطلاعات بسته مدرسه"
          );
        }

        if(!productsRes.ok || !productsData?.ok){
          throw new Error(
            productsData?.message ||
            "خطا در دریافت محصولات مدرسه"
          );
        }

        const v = vendorData.vendor;

        setVendor({
  ...v,

  packageWindowCount:
    v.selectedPackageWindowCount ?? 0,

  packageAchievementLimit:
    v.selectedPackageAchievementLimit ?? 0,

  achievementUsedCount:
    v.achievementUsedCount ?? 0,
});

        const receivedProducts =
  Array.isArray(productsData.products)
    ? productsData.products
    : [];

const vendorProducts = isVendorOwner
  ? receivedProducts
  : receivedProducts.filter((product) => {
      const productVendorId =
        product.vendorId ??
        product.vendor?.id;

      return (
        Number(productVendorId) ===
        Number(vendorId)
      );
    });

const fixedProducts =
  vendorProducts.map((product) => ({
    ...product,

    categoryLinks:
      typeof product.categoryLinks === "string"
        ? JSON.parse(product.categoryLinks)
        : product.categoryLinks || [],

    images:
      typeof product.images === "string"
        ? JSON.parse(product.images)
        : product.images || [],
  }));

        setProducts(fixedProducts);
      }catch(error){
        console.error(
          "LOAD SCHOOL PRODUCTS ERROR:",
          error
        );
        setProducts([]);
      }finally{
        setLoadingProducts(false);
      }
    }

    if(vendorId){
      loadVendorProducts();
    }
  }, [
  vendorId,
  API_BASE_URL,
  isVendorOwner,
]);


useEffect(() => {
  async function loadVendorServices() {
    try {
      setLoadingServices(true);

      const servicesUrl = isVendorOwner
        ? `${API_BASE_URL}/vendor-services/vendor/${vendorId}`
        : `${API_BASE_URL}/vendor-services/public/vendor/${vendorId}`;

      const headers = isVendorOwner
        ? {
            Authorization:
              `Bearer ${localStorage.getItem("genino_token")}`,
            Accept: "application/json",
          }
        : {
            Accept: "application/json",
          };

      const res = await fetch(servicesUrl, {
        method: "GET",
        headers,
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        throw new Error(
          data?.message ||
          "خطا در دریافت خدمات مدرسه"
        );
      }

      const loadedServices =
  Array.isArray(data.services)
    ? data.services
    : [];

setServices(loadedServices);

console.table(
  loadedServices.map(s => ({
    id: s.id,
    title: s.title,
    serviceType: s.serviceType,
    scheduleMode: s.scheduleMode,
    package: s.package
  }))
);
    } catch (error) {
      console.error(
        "LOAD SCHOOL SERVICES ERROR:",
        error
      );

      setServices([]);
    } finally {
      setLoadingServices(false);
    }
  }

  if (vendorId) {
    loadVendorServices();
  }
}, [
  vendorId,
  API_BASE_URL,
  isVendorOwner,
]);


  const packageWindowCount =
    Number(vendor?.packageWindowCount || 0);

  const packageAchievementLimit =
    Number(vendor?.packageAchievementLimit || 0);

  const achievementUsedCount =
  Number(vendor?.achievementUsedCount || 0);

const remainingAchievementCount =
  Math.max(
    packageAchievementLimit -
      achievementUsedCount,
    0
  );

const loadingWindows =
  loadingProducts || loadingServices;

const courseServices =
  services.filter(
    service =>
      service.package ||
      service.scheduleMode === "PACKAGE"
  );


const eventServices =
  services.filter(
    service =>
      !service.package &&
      service.scheduleMode !== "PACKAGE"
  );

  const usedWindowCount =
  products.length + services.length;


const remainingWindowCount = Math.max(
  packageWindowCount - usedWindowCount,
  0
);

const canAddWindow =
  packageWindowCount > 0 &&
  usedWindowCount < packageWindowCount;



  const handleDeleteProduct = async(productId)=>{
    const ok = window.confirm(
      "آیا از حذف این محصول مطمئن هستید؟"
    );

    if(!ok) return;

    try{
      const res = await fetch(
        `${API_BASE_URL}/vendor-products/${productId}`,
        {
          method:"DELETE",
          headers:{
            Authorization:
              `Bearer ${localStorage.getItem("genino_token")}`,
          },
        }
      );

      const data = await res.json();

      if(!res.ok || !data?.ok){
        alert(
          data?.message ||
          "خطا در حذف محصول"
        );
        return;
      }

      setProducts(prev=>
        prev.filter(item=>item.id !== productId)
      );
    }catch(error){
      console.error(
        "DELETE SCHOOL PRODUCT ERROR:",
        error
      );
      alert("خطا در ارتباط با سرور");
    }
  };


  const handlePublishProduct = async(productId)=>{
    try{
      const res = await fetch(
        `${API_BASE_URL}/vendor-products/${productId}/publish`,
        {
          method:"PATCH",
          headers:{
            Authorization:
              `Bearer ${localStorage.getItem("genino_token")}`,
          },
        }
      );

      const data = await res.json();

      if(!res.ok || !data?.ok){
        alert(
          data?.message ||
          "خطا در انتشار محصول"
        );
        return;
      }

      setProducts(prev=>
        prev.map(item=>
          item.id === productId
          ? {...item,status:"PUBLISHED"}
          : item
        )
      );

      alert("محصول با موفقیت منتشر شد.");
    }catch(error){
      console.error(
        "PUBLISH SCHOOL PRODUCT ERROR:",
        error
      );
      alert("خطا در ارتباط با سرور");
    }
  };


  const handleUnpublishProduct = async(productId)=>{
    try{
      const res = await fetch(
        `${API_BASE_URL}/vendor-products/${productId}/unpublish`,
        {
          method:"PATCH",
          headers:{
            Authorization:
              `Bearer ${localStorage.getItem("genino_token")}`,
          },
        }
      );

      const data = await res.json();

      if(!res.ok || !data?.ok){
        alert(
          data?.message ||
          "خطا در عدم انتشار محصول"
        );
        return;
      }

      setProducts(prev=>
        prev.map(item=>
          item.id === productId
          ? {...item,status:"DRAFT"}
          : item
        )
      );
    }catch(error){
      console.error(
        "UNPUBLISH SCHOOL PRODUCT ERROR:",
        error
      );
      alert("خطا در ارتباط با سرور");
    }
  };

const handleDeleteService = async (serviceId) => {
  const ok = window.confirm(
    "آیا از حذف این خدمت مطمئن هستید؟"
  );

  if (!ok) return;

  try {
    const res = await fetch(
      `${API_BASE_URL}/vendor-services/${serviceId}`,
      {
        method: "DELETE",
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("genino_token")}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok || !data?.ok) {
      alert(
        data?.message ||
        "خطا در حذف خدمت"
      );
      return;
    }

    setServices((prev) =>
      prev.filter(
        (item) =>
          item.id !== serviceId
      )
    );

    alert(
      "خدمت با موفقیت حذف شد."
    );

  } catch (error) {
    console.error(
      "DELETE SCHOOL SERVICE ERROR:",
      error
    );

    alert(
      "خطا در ارتباط با سرور"
    );
  }
};


const handlePublishService = async (serviceId) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/vendor-services/${serviceId}/publish`,
      {
        method: "PATCH",
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("genino_token")}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok || !data?.ok) {
      alert(
        data?.message ||
        "خطا در انتشار خدمت"
      );
      return;
    }

    setServices((prev) =>
      prev.map((item) =>
        item.id === serviceId
          ? {
              ...item,
              status:
                "PUBLISHED",
            }
          : item
      )
    );

    alert(
      "خدمت با موفقیت منتشر شد."
    );

  } catch (error) {
    console.error(
      "PUBLISH SCHOOL SERVICE ERROR:",
      error
    );

    alert(
      "خطا در ارتباط با سرور"
    );
  }
};


const handleUnpublishService = async (serviceId) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/vendor-services/${serviceId}/unpublish`,
      {
        method: "PATCH",
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("genino_token")}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok || !data?.ok) {
      alert(
        data?.message ||
        "خطا در عدم انتشار خدمت"
      );
      return;
    }

    setServices((prev) =>
      prev.map((item) =>
        item.id === serviceId
          ? {
              ...item,
              status:
                "DRAFT",
            }
          : item
      )
    );

  } catch (error) {
    console.error(
      "UNPUBLISH SCHOOL SERVICE ERROR:",
      error
    );

    alert(
      "خطا در ارتباط با سرور"
    );
  }
};


  const addHeaderImage = async(file)=>{
if(!file) return;
try{
const ext =
file.name.split(".").pop();
const presign =
await presignVendorSchoolHeaderUpload({
ext,
contentType:file.type,
fileName:file.name,
fileSize:file.size
});
if(!presign?.ok){
alert(
presign?.message ||
"خطا در آماده سازی تصویر"
);
return;
}
const upload =
await putFileToPresignedUrl(
presign.uploadUrl,
file
);
if(!upload.ok){
alert(
"آپلود تصویر انجام نشد"
);
return;
}
setSchool(prev=>({
...prev,
headerImages:[
...prev.headerImages,
{
url:presign.publicUrl,
description:""
}
]
}));
}catch(error){
console.error(
"UPLOAD SCHOOL HEADER ERROR",
error
);
alert(
"خطا در آپلود تصویر"
);
}};

const updateHeaderDescription = (
 index,
 value
)=>{
 setSchool(prev=>({
   ...prev,
   headerImages:
   prev.headerImages.map(
    (item,i)=>
      i===index
      ?
      {
        ...item,
        description:value
      }
      :
      item
   )
 }));
};

const removeHeaderImage = (index)=>{
 setSchool(prev=>({
  ...prev,
  headerImages:
  prev.headerImages.filter(
    (_,i)=>i!==index
  )
 }));
};


  const toggleEducationLevel = (level)=>{
  setSchool(prev=>{
    const exists =
      prev.educationLevels.includes(level);
    return {
      ...prev,
      educationLevels: exists
        ? prev.educationLevels.filter(
            item=>item !== level
          )
        : [
            ...prev.educationLevels,
            level
          ]
    };
  });
};


const addStaffMember = ()=>{
  setSchool(prev=>({
    ...prev,
    staffMembers:[
      ...prev.staffMembers,
      {
        name:"",
        position:"",
        education:"",
        experience:"",
        image:""
      }
    ]
  }));
};


const updateStaffMember = (
index,
field,
value
)=>{
setSchool(prev=>({
...prev,
staffMembers:
prev.staffMembers.map(
(item,i)=>
i===index
?
{
...item,
[field]:value
}
:
item
)
}));
};


const uploadStaffMemberImage = async (
  index,
  file
) => {
  if (!file) return;

  try {
    const ext =
      file.name.split(".").pop();

    const presign =
      await presignVendorSchoolStaffUpload({
        ext,
        contentType: file.type,
        fileName: file.name,
        fileSize: file.size,
      });

    if (!presign?.ok) {
      alert(
        presign?.message ||
        "خطا در آماده‌سازی تصویر عضو مدرسه"
      );
      return;
    }

    const upload =
      await putFileToPresignedUrl(
        presign.uploadUrl,
        file
      );

    if (!upload?.ok) {
      alert(
        upload?.message ||
        "آپلود تصویر عضو مدرسه انجام نشد"
      );
      return;
    }

    updateStaffMember(
      index,
      "image",
      presign.publicUrl
    );
  } catch (error) {
    console.error(
      "UPLOAD SCHOOL STAFF IMAGE ERROR:",
      error
    );

    alert(
      "خطا در آپلود تصویر عضو مدرسه"
    );
  }
};


const removeStaffMember = (index)=>{
setSchool(prev=>({
...prev,
staffMembers:
prev.staffMembers.filter(
(_,i)=>i!==index
)
}));
};



const validateRequiredSchoolFields = () => {
  const errors = {};

  // اطلاعات معرفی مدرسه
  if (!String(school.schoolName || "").trim()) {
    errors.schoolName = "نام مدرسه الزامی است";
  }

  if (!String(school.slogan || "").trim()) {
    errors.slogan = "شعار مدرسه الزامی است";
  }


  // اطلاعات تماس و آدرس
  if (!String(school.city || "").trim()) {
    errors.city = "شهر محل فعالیت مشخص نشده است";
  }

  if (!String(school.district || "").trim()) {
    errors.district = "منطقه الزامی است";
  }

  if (!String(school.address || "").trim()) {
    errors.address = "آدرس دقیق پستی الزامی است";
  }

  if (!String(school.phone || "").trim()) {
    errors.phone = "شماره تلفن الزامی است";
  }

  if (!String(school.email || "").trim()) {
    errors.email = "ایمیل الزامی است";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      String(school.email).trim()
    )
  ) {
    errors.email = "فرمت ایمیل صحیح نیست";
  }


  // اطلاعات آموزشی
  if (!String(school.gender || "").trim()) {
    errors.gender = "جنسیت مدرسه الزامی است";
  }

  if (
    !Array.isArray(school.educationLevels) ||
    school.educationLevels.length === 0
  ) {
    errors.educationLevels =
      "حداقل یک مقطع تحصیلی انتخاب کنید";
  }

  if (!String(school.schoolType || "").trim()) {
    errors.schoolType = "نوع مدرسه الزامی است";
  }

  if (!String(school.foundedYear || "").trim()) {
    errors.foundedYear = "سال تأسیس الزامی است";
  }

  setSchoolValidationErrors(errors);

  const firstErrorKey = Object.keys(errors)[0];

  if (firstErrorKey) {
    const sectionMap = {
      schoolName: "school-intro-section",
      slogan: "school-intro-section",

      city: "school-contact-section",
      district: "school-contact-section",
      address: "school-contact-section",
      phone: "school-contact-section",
      email: "school-contact-section",

      gender: "school-education-section",
      educationLevels: "school-education-section",
      schoolType: "school-education-section",
      foundedYear: "school-education-section",
    };

    document
      .getElementById(sectionMap[firstErrorKey])
      ?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  }

  return Object.keys(errors).length === 0;
};



const handleSaveSchool = async () => {
  const isValid =
    validateRequiredSchoolFields();

  if (!isValid) {
    alert(
      "لطفاً بخش‌های اطلاعات معرفی مدرسه، اطلاعات تماس و آدرس و اطلاعات آموزشی را کامل کنید."
    );

    return;
  }

  try {
    const {
      id,
      vendorId: savedVendorId,
      createdAt,
      updatedAt,
      students,
      achievements,
      province,
      ...schoolProfileData
    } = school;

    const res = await saveVendorSchoolProfile(
      vendorId,
      schoolProfileData
    );

    if (res?.ok) {
      setSchoolValidationErrors({});

      alert(
        "اطلاعات مدرسه با موفقیت ذخیره شد 💛"
      );
    } else {
      alert(
        res?.message ||
        "ذخیره اطلاعات انجام نشد"
      );
    }
  } catch (error) {
    console.error(
      "SAVE SCHOOL ERROR:",
      error
    );

    alert(
      error?.message ||
      "خطا در ذخیره اطلاعات مدرسه"
    );
  }
};

const handleOpenAchievement = (child) => {
  setSelectedAchievementChild(child);
};

const handleOpenAchievementHistory =
async () => {

  try {

    setShowAchievementHistory(true);
    setLoadingAchievements(true);

    const res =
      await getSchoolAchievements(
        vendorId
      );

    if(res?.ok){

      setSchoolAchievements(
        res.achievements || []
      );

    }else{

      setSchoolAchievements([]);

      alert(
        res?.message ||
        "خطا در دریافت دستاوردها"
      );

    }

  }catch(error){

    console.error(
      "LOAD SCHOOL ACHIEVEMENTS ERROR",
      error
    );

    setSchoolAchievements([]);

  }finally{

    setLoadingAchievements(false);

  }

};

const handleCreateAchievement = async()=>{

if(!achievementForm.category){
 alert(
 "لطفاً نوع دستاورد را انتخاب کنید."
 );
 return;
}

if(!achievementForm.title.trim()){
 alert(
 "لطفاً عنوان دستاورد را وارد کنید."
 );
 return;
}

if(!selectedAchievementChild)
return;

try{
const res =
await createSchoolAchievement(
  vendorId,
  {
 childId:selectedAchievementChild.id,
 category:
 achievementForm.category,
 title:
 achievementForm.title,
 description:
 achievementForm.description
}
);
if(res?.ok){

  setVendor(prev => ({
    ...prev,
    achievementUsedCount:
      Number(
        prev?.achievementUsedCount || 0
      ) + 1
  }));

  alert(
    "دستاورد با موفقیت صادر شد 💛"
  );

  setSelectedAchievementChild(null);

  setAchievementForm({
    category:"",
    title:"",
    description:""
  });
}else{
alert(
res?.message ||
"خطا در صدور دستاورد"
);
}
}catch(error){
console.error(
"CREATE ACHIEVEMENT ERROR",
error
);
alert(
"خطا در ارتباط با سرور"
);
}
};



if (loadingSchool) {
  return (
    <main
      dir="rtl"
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-[#faf7ef]
        p-4
      "
    >
      <p className="text-sm font-bold text-gray-500">
        در حال دریافت اطلاعات مدرسه...
      </p>
    </main>
  );
}


/*
  نمای عمومی برای یوزرها و بازدیدکنندگان
*/
if (!isVendorOwner) {
  return (
    <PublicSchoolView
      school={school}

      products={products.filter(
        (product) =>
          product.status === "PUBLISHED"
      )}

      services={services.filter(
        (service) =>
          service.status === "PUBLISHED"
      )}

      loadingProducts={loadingProducts}
      loadingServices={loadingServices}
    />
  );
}












return (

<main
dir="rtl"
className="
min-h-screen
bg-[#faf7ef]
p-4
"
>


<div className="
mx-auto
max-w-6xl
space-y-5
">



{/* Header */}

<section
className="
rounded-3xl
bg-white
p-5
shadow
"
>

<div
className="
mx-auto
w-full
max-w-3xl
rounded-3xl
overflow-hidden
"
>

{
school.headerImages.length > 0
?

<div>

<PromoSlider
variant="golden"
interval={7000}
height="h-44 sm:h-52 md:h-60 lg:h-64"
slides={
 school.headerImages.map(
  (item,index)=>({
    id:index,
    image:item.url,
    title:""
  })
 )
}
onIndexChange={(index)=>{
 setActiveHeaderIndex(index);
}}
/>

<button
type="button"
onClick={() =>
 removeHeaderImage(activeHeaderIndex)
}
className="
mt-3
flex
items-center
justify-center
gap-2
w-full
rounded-xl
bg-red-50
border
border-red-200
py-2
text-sm
font-bold
text-red-600
hover:bg-red-100
transition
"
>
<Trash2 size={16}/>
حذف تصویر فعلی
</button>


<div
className="
mt-3
rounded-xl
bg-yellow-50
p-4
"
>



<input
value={
 school.headerImages[
  activeHeaderIndex
 ]?.description || ""
}
onChange={(e)=>
 updateHeaderDescription(
  activeHeaderIndex,
  e.target.value
 )
}
placeholder="مثلا: آزمایشگاه مجهز علوم مدرسه"
className="
mt-3
w-full
rounded-xl
border
bg-white
px-3
py-2
text-sm
text-center
"
/>


</div>

</div>
:
<div
className="
h-52
flex
items-center
justify-center
rounded-3xl
bg-gradient-to-r
from-yellow-100
to-yellow-200
"
>
<GraduationCap
className="
h-14
w-14
text-yellow-700
"
/>
</div>
}
<label
className="
mt-4
flex
cursor-pointer
items-center
justify-center
gap-2
rounded-xl
bg-[#6f4a18]
px-5
py-3
text-white
font-bold
"
>
<Upload size={18}/>
 افزودن تصویر فضای مدرسه
<input
type="file"
accept="image/*"
className="hidden"
onChange={(e)=>{
 addHeaderImage(e.target.files[0]);
 e.target.value="";
}}
/>
</label>
<p className="
mt-2
text-center
text-xs
text-gray-500
">
حداکثر ۱۰ تصویر - آزمایشگاه، حیاط، زمین ورزش، کتابخانه و ...
</p>
</div>
</section>





{/* پنجره‌های ارائه محصول مدرسه */}

<section
className="
rounded-3xl
bg-white
p-5
shadow
"
>

<h2
className="
font-black
text-[#6f4a18]
"
>
پنجره‌های ارائه کالا و خدمت
</h2>

<p
className="
mt-2
text-xs
leading-6
text-gray-500
"
>
در این بخش می‌توانید کالاها و خدمات مدرسه را مدیریت کنید. هر کالا یا خدمت، یک پنجره از ظرفیت بسته همکاری شما را استفاده می‌کند.
</p>


<div
  className="
    mt-4
    grid
    grid-cols-3
    gap-2
    sm:gap-3
  "
>
  {/* کل پنجره‌های بسته */}

  <div
    className="
      rounded-2xl
      bg-[#faf7ef]
      p-3
      text-center
      shadow-sm
    "
  >
    <p className="text-[11px] text-gray-400 sm:text-xs">
      پنجره‌های خریداری‌شده
    </p>

    <p className="mt-1 text-lg font-black text-yellow-700">
      {loadingWindows
        ? "..."
        : packageWindowCount}
    </p>
  </div>


  {/* پنجره‌های استفاده‌شده */}

  <div
    className="
      rounded-2xl
      bg-[#faf7ef]
      p-3
      text-center
      shadow-sm
    "
  >
    <p className="text-[11px] text-gray-400 sm:text-xs">
      استفاده‌شده
    </p>

    <p className="mt-1 text-lg font-black text-[#7a5526]">
      {loadingWindows
        ? "..."
        : usedWindowCount}
    </p>
  </div>


  {/* پنجره‌های باقی‌مانده */}

  <div
    className="
      rounded-2xl
      bg-[#faf7ef]
      p-3
      text-center
      shadow-sm
    "
  >
    <p className="text-[11px] text-gray-400 sm:text-xs">
      باقی‌مانده
    </p>

    <p
      className={`
        mt-1
        text-lg
        font-black
        ${
          remainingWindowCount > 0
            ? "text-green-600"
            : "text-red-500"
        }
      `}
    >
      {loadingWindows
        ? "..."
        : remainingWindowCount}
    </p>
  </div>
</div>


<button
  type="button"
  onClick={() => navigate("/vendor/reports")}
  className="
    mt-3
    w-full
    rounded-2xl
    bg-[#faf7ef]
    p-3
    text-center
    shadow-sm
    transition-all
    duration-200
    hover:-translate-y-0.5
    hover:shadow-lg
    active:scale-95
  "
>
  <p className="text-xs text-gray-400">
    گزارش‌های مهم مدیریتی
  </p>

  <p className="mt-1 text-sm font-bold text-[#7a5526]">
    مشاهده گزارش‌ها
  </p>
</button>


{!loadingWindows && canAddWindow && (
  <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">

    <button
      type="button"
      onClick={() =>
        navigate(
          `/vendor/product/create?source=school&vendorId=${vendorId}`
        )
      }
      className="
        w-full
        rounded-2xl
        bg-gradient-to-r
        from-[#7a5526]
        via-[#b88724]
        to-[#d4af37]
        py-3
        font-bold
        text-white
        shadow-lg
        transition
        hover:shadow-xl
      "
    >
      + افزودن محصول جدید
    </button>

    <button
      type="button"
      onClick={() =>
        navigate(
          `/vendor/service/create?source=school&vendorId=${vendorId}`
        )
      }
      className="
        w-full
        rounded-2xl
        border
        border-[#d4af37]
        bg-yellow-50
        py-3
        font-bold
        text-[#7a5526]
        shadow-sm
        transition
        hover:bg-yellow-100
        hover:shadow-md
      "
    >
      + افزودن خدمت جدید
    </button>

  </div>
)}


{!loadingWindows && !canAddWindow && (
  <div className="mt-4 text-center text-xs font-bold text-red-500">
    {packageWindowCount <= 0
      ? "برای بسته مدرسه پنجره کالا و خدمت ثبت نشده است"
      : "تمام پنجره‌های کالا و خدمت بسته شما استفاده شده است"
    }
  </div>
)}  


</section>


{/* کالاهای مدرسه */}
<section
className="
rounded-3xl
bg-white
p-5
shadow
"
>

<div
className="
mb-4
flex
items-center
justify-between
"
>

<div>

<h3
className="
font-black
text-[#6f4a18]
"
>
کالاهای مدرسه
</h3>


<p
className="
mt-1
text-xs
text-gray-400
"
>
محصولات و کالاهای ارائه‌شده توسط مدرسه
</p>

</div>


<span
className="
rounded-full
bg-yellow-50
px-3
py-1
text-xs
font-bold
text-yellow-700
"
>
{
products.length
}
کالا
</span>


</div>

<div
className="
relative
z-10
mx-auto
mt-6
grid
max-w-5xl
grid-cols-2
gap-3
sm:grid-cols-3
sm:gap-4
lg:grid-cols-4
lg:gap-6
"
>

{products.map(product=>(

<div
 key={product.id}
 className="flex flex-col gap-2"
>

<ProductCard
 product={product}
 source="vendor-shop"
 showFavorite={false}
/>


<div className="grid grid-cols-2 gap-2">

<button
 type="button"
 onClick={() =>
  navigate(
    `/vendor/product/edit/${product.id}?source=school&vendorId=${vendorId}`
  )
}
 className="
 flex
 items-center
 justify-center
 gap-1
 rounded-xl
 bg-yellow-50
 py-2
 text-xs
 font-bold
 text-yellow-700
 shadow-sm
 transition
 hover:bg-yellow-100
 "
>
<Pencil size={14}/>
ویرایش
</button>

<button
 type="button"
 onClick={()=>handleDeleteProduct(product.id)}
 className="
 flex
 items-center
 justify-center
 gap-1
 rounded-xl
 bg-red-50
 py-2
 text-xs
 font-bold
 text-red-600
 shadow-sm
 transition
 hover:bg-red-100
 "
>
<Trash2 size={14}/>
حذف
</button>

</div>


{product.status === "PUBLISHED"
?
<button
 type="button"
 onClick={()=>handleUnpublishProduct(product.id)}
 className="
 w-full
 rounded-xl
 bg-orange-50
 py-2
 text-xs
 font-bold
 text-orange-600
 shadow-sm
 transition
 hover:bg-orange-100
 "
>
عدم انتشار محصول
</button>
:
<button
 type="button"
 onClick={()=>handlePublishProduct(product.id)}
 className="
 w-full
 rounded-xl
 bg-green-600
 py-2
 text-xs
 font-bold
 text-white
 shadow-sm
 transition
 hover:bg-green-700
 "
>
انتشار محصول
</button>
}

</div>

))}

</div>


</section>


{/* خدمات مدرسه */}

<section
className="
rounded-3xl
bg-white
p-5
shadow
"
>

<div
className="
mb-4
flex
items-center
justify-between
"
>

<div>

<h3
className="
font-black
text-[#6f4a18]
"
>
رویدادها و خدمات مدرسه
</h3>


<p
className="
mt-1
text-xs
text-gray-400
"
>
جشن‌ها، کلاس‌ها، کارگاه‌ها، اردوها و خدمات مدرسه
</p>

</div>


<span
className="
rounded-full
bg-yellow-50
px-3
py-1
text-xs
font-bold
text-yellow-700
"
>
{
eventServices.length
}
خدمت
</span>


</div>


  {loadingServices ? (

    <div
      className="
        rounded-2xl
        bg-[#faf7ef]
        py-10
        text-center
        text-sm
        font-bold
        text-gray-400
      "
    >
      در حال دریافت خدمات...
    </div>

  ) : eventServices.length === 0 ? (

    <div
      className="
        rounded-2xl
        border
        border-dashed
        border-yellow-200
        bg-yellow-50/40
        py-10
        text-center
        text-sm
        text-gray-400
      "
    >
      هنوز خدمتی ثبت نشده است.
    </div>

  ) : (

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

      {eventServices.map((service) => {

        const typeLabels = {
          EVENT: "جشن و رویداد",
          CLASS: "کلاس",
          WORKSHOP: "کارگاه",
          CAMP: "اردو",
          CONSULTATION: "مشاوره",
          OTHER: "سایر خدمات",
        };


        const serviceImages =
          Array.isArray(service.images)
            ? service.images
            : [];


        const mainImage =
          serviceImages[
            Number(
              service.mainImageIndex || 0
            )
          ] ||
          serviceImages[0] ||
          "";


        const startDateText =
          service.startAt
            ? new Date(
                service.startAt
              ).toLocaleString(
                "fa-IR",
                {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )
            : "زمان ثبت نشده";

            const sessions =
  Array.isArray(service.sessions)
    ? service.sessions
    : [];

const now = new Date();

const futureSessions =
  sessions.filter((session) => {
    if (!session?.endAt) return false;

    return (
      new Date(session.endAt) > now
    );
  });

const isExpired =
  sessions.length > 0
    ? futureSessions.length === 0
    : service.endAt
      ? new Date(service.endAt) <= now
      : false;




       return (

  <div
    key={service.id}
    className="flex flex-col gap-2"
  >

    {/* =========================
        خود کارت خدمت
    ========================= */}

    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-yellow-100
        bg-white
        shadow-sm
        transition
        hover:shadow-md
      "
    >

      {/* تصویر خدمت */}

      <div
        className="
          relative
          h-40
          bg-yellow-50
        "
      >

        {mainImage ? (

          <img
            src={mainImage}
            alt={
              service.title ||
              "خدمت مدرسه"
            }
            className="
              h-full
              w-full
              object-cover
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
            🎉
          </div>

        )}


        {/* نوع خدمت */}

        <span
          className="
            absolute
            right-3
            top-3
            rounded-full
            bg-white/90
            px-3
            py-1
            text-[10px]
            font-black
            text-[#7a5526]
            shadow
          "
        >
          {typeLabels[
            service.serviceType
          ] || "خدمت"}
        </span>


        {/* وضعیت انتشار */}

        <span
          className={`
            absolute
            left-3
            top-3
            rounded-full
            px-3
            py-1
            text-[10px]
            font-black
            shadow

            ${
              service.status ===
              "PUBLISHED"
                ? "bg-green-600 text-white"
                : "bg-gray-700 text-white"
            }
          `}
        >
          {service.status ===
          "PUBLISHED"
            ? "منتشرشده"
            : "پیش‌نویس"}
        </span>

      </div>


      {/* اطلاعات داخل کارت */}

      <div className="p-4">

        <h4
          className="
            line-clamp-1
            font-black
            text-[#5f3e16]
          "
        >
          {service.title}
        </h4>

        <p
  className="
    mt-1
    line-clamp-1
    text-[11px]
    font-bold
    text-[#a77725]
  "
>
  برگزارکننده:
  {" "}
  {school.schoolName || "مدرسه"}
</p>


        <p
          className="
            mt-2
            text-xs
            text-gray-400
          "
        >
          {startDateText}
        </p>


        <div
          className="
            mt-3
            flex
            items-center
            justify-between
            gap-2
          "
        >

          <span
            className="
              text-xs
              font-bold
              text-gray-500
            "
          >
            ظرفیت:
            {" "}
            {service.capacity}
            {" "}
            نفر
          </span>


          <span
            className="
              text-xs
              font-black
              text-[#7a5526]
            "
          >
            {service.isFree
              ? "رایگان"
              : `${Number(
                  service.price || 0
                ).toLocaleString(
                  "fa-IR"
                )} ریال`
            }
          </span>

        </div>


        {service.locationName && (

          <p
            className="
              mt-2
              line-clamp-1
              text-xs
              text-gray-400
            "
          >
            محل:
            {" "}
            {service.locationName}
          </p>

        )}

      </div>

    </div>


    {/* =========================
        دکمه‌های بیرون کارت
    ========================= */}

    <div className="grid grid-cols-2 gap-2">

      {/* ویرایش */}

      <button
        type="button"
        onClick={() =>
          navigate(
            `/vendor/service/edit/${service.id}?source=school&vendorId=${vendorId}&mode=${service.scheduleMode}`
          )
        }
        className="
          flex
          items-center
          justify-center
          gap-1
          rounded-xl
          bg-yellow-50
          py-2
          text-xs
          font-bold
          text-yellow-700
          shadow-sm
          transition
          hover:bg-yellow-100
        "
      >
        <Pencil size={14}/>
        ویرایش
      </button>


      {/* حذف */}

      <button
        type="button"
        onClick={() =>
          handleDeleteService(
            service.id
          )
        }
        className="
          flex
          items-center
          justify-center
          gap-1
          rounded-xl
          bg-red-50
          py-2
          text-xs
          font-bold
          text-red-600
          shadow-sm
          transition
          hover:bg-red-100
        "
      >
        <Trash2 size={14}/>
        حذف
      </button>

    </div>


    {/* انتشار / عدم انتشار */}

    {service.status ===
    "PUBLISHED" ? (

      <button
        type="button"
        onClick={() =>
          handleUnpublishService(
            service.id
          )
        }
        className="
          w-full
          rounded-xl
          bg-orange-50
          py-2
          text-xs
          font-bold
          text-orange-600
          shadow-sm
          transition
          hover:bg-orange-100
        "
      >
        عدم انتشار خدمت
      </button>

    ) : (

      <button
        type="button"
        onClick={() =>
          handlePublishService(
            service.id
          )
        }
        className="
          w-full
          rounded-xl
          bg-green-600
          py-2
          text-xs
          font-bold
          text-white
          shadow-sm
          transition
          hover:bg-green-700
        "
      >
        انتشار خدمت
      </button>

    )}

  </div>

);

      })}

    </div>

  )}


</section>


{/* دوره‌ها و کلاس‌های آموزشی */}

<section
className="
rounded-3xl
bg-white
p-5
shadow
" 
>

<div
className="
mb-4
flex
items-center
justify-between
"
>

<div>

<h3
className="
font-black
text-[#6f4a18]
"
>
دوره‌ها و کلاس‌های آموزشی
</h3>


<p
className="
mt-1
text-xs
text-gray-400
"
>
کلاس‌ها و دوره‌های چندجلسه‌ای مدرسه
</p>

</div>


<span
className="
rounded-full
bg-yellow-50
px-3
py-1
text-xs
font-bold
text-yellow-700
"
>
{
courseServices.length
}
دوره
</span>


</div>



{
courseServices.length === 0 ? (

<div
className="
rounded-2xl
border
border-dashed
border-yellow-200
bg-yellow-50/40
py-10
text-center
text-sm
text-gray-400
"
>
هنوز دوره آموزشی ثبت نشده است.
</div>


) : (

<div
className="
grid
grid-cols-2
gap-3
sm:grid-cols-3
lg:grid-cols-4
"
>


{courseServices.map((service) => {

        const typeLabels = {
          EVENT: "جشن و رویداد",
          CLASS: "کلاس",
          WORKSHOP: "کارگاه",
          CAMP: "اردو",
          CONSULTATION: "مشاوره",
          OTHER: "سایر خدمات",
        };


        const serviceImages =
          Array.isArray(service.images)
            ? service.images
            : [];


        const mainImage =
          serviceImages[
            Number(
              service.mainImageIndex || 0
            )
          ] ||
          serviceImages[0] ||
          "";

console.log(
  "PACKAGE DATE DEBUG",
  service.package?.startDate
);


        const startDateText =
  service.scheduleMode === "PACKAGE" &&
  service.package
    ? `شروع دوره: ${
    formatPersianDate(
      service.package.startDate
    ) || "ثبت نشده"
  } | ${
    service.package.totalSessions || 0
  } جلسه`
    :
  service.startAt
    ? new Date(
        service.startAt
      ).toLocaleString(
        "fa-IR",
        {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }
      )
    : "زمان ثبت نشده";

    const sessions =
  Array.isArray(service.sessions)
    ? service.sessions
    : [];

const now = new Date();

const futureSessions =
  sessions.filter((session) => {
    if (!session?.endAt) return false;

    return (
      new Date(session.endAt) > now
    );
  });

const isExpired =
  sessions.length > 0
    ? futureSessions.length === 0
    : service.endAt
      ? new Date(service.endAt) <= now
      : false;


       return (

  <div
    key={service.id}
    className="flex flex-col gap-2"
  >

    {/* =========================
        خود کارت خدمت
    ========================= */}

    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-yellow-100
        bg-white
        shadow-sm
        transition
        hover:shadow-md
      "
    >

      {/* تصویر خدمت */}

      <div
        className="
          relative
          h-40
          bg-yellow-50
        "
      >

        {mainImage ? (

          <img
            src={mainImage}
            alt={
              service.title ||
              "خدمت مدرسه"
            }
            className="
              h-full
              w-full
              object-cover
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
            🎉
          </div>

        )}


        {/* نوع خدمت */}

        <span
          className="
            absolute
            right-3
            top-3
            rounded-full
            bg-white/90
            px-3
            py-1
            text-[10px]
            font-black
            text-[#7a5526]
            shadow
          "
        >
          {typeLabels[
            service.serviceType
          ] || "خدمت"}
        </span>


        {/* وضعیت انتشار */}

        <span
          className={`
            absolute
            left-3
            top-3
            rounded-full
            px-3
            py-1
            text-[10px]
            font-black
            shadow

            ${
              service.status ===
              "PUBLISHED"
                ? "bg-green-600 text-white"
                : "bg-gray-700 text-white"
            }
          `}
        >
          {service.status ===
          "PUBLISHED"
            ? "منتشرشده"
            : "پیش‌نویس"}
        </span>

      </div>


      {/* اطلاعات داخل کارت */}

      <div className="p-4">

        <h4
          className="
            line-clamp-1
            font-black
            text-[#5f3e16]
          "
        >
          {service.title}
        </h4>

        <p
  className="
    mt-1
    line-clamp-1
    text-[11px]
    font-bold
    text-[#a77725]
  "
>
  برگزارکننده:
  {" "}
  {school.schoolName || "مدرسه"}
</p>


        <p
          className="
            mt-2
            text-xs
            text-gray-400
          "
        >
          {startDateText}
        </p>


        <div
          className="
            mt-3
            flex
            items-center
            justify-between
            gap-2
          "
        >

          <span
            className="
              text-xs
              font-bold
              text-gray-500
            "
          >
            ظرفیت:
            {" "}
            {service.capacity}
            {" "}
            نفر
          </span>


          <span
            className="
              text-xs
              font-black
              text-[#7a5526]
            "
          >
            {service.isFree
              ? "رایگان"
              : `${Number(
                  service.price || 0
                ).toLocaleString(
                  "fa-IR"
                )} ریال`
            }
          </span>

        </div>


        {service.locationName && (

          <p
            className="
              mt-2
              line-clamp-1
              text-xs
              text-gray-400
            "
          >
            محل:
            {" "}
            {service.locationName}
          </p>

        )}

      </div>

    </div>


    {/* =========================
        دکمه‌های بیرون کارت
    ========================= */}

    <div className="grid grid-cols-2 gap-2">

      {/* ویرایش */}

      <button
        type="button"
        onClick={() =>
          navigate(
            `/vendor/service/edit/${service.id}?source=school&vendorId=${vendorId}&mode=${service.scheduleMode}`
          )
        }
        className="
          flex
          items-center
          justify-center
          gap-1
          rounded-xl
          bg-yellow-50
          py-2
          text-xs
          font-bold
          text-yellow-700
          shadow-sm
          transition
          hover:bg-yellow-100
        "
      >
        <Pencil size={14}/>
        ویرایش
      </button>


      {/* حذف */}

      <button
        type="button"
        onClick={() =>
          handleDeleteService(
            service.id
          )
        }
        className="
          flex
          items-center
          justify-center
          gap-1
          rounded-xl
          bg-red-50
          py-2
          text-xs
          font-bold
          text-red-600
          shadow-sm
          transition
          hover:bg-red-100
        "
      >
        <Trash2 size={14}/>
        حذف
      </button>

    </div>


    {/* انتشار / عدم انتشار */}

    {service.status ===
    "PUBLISHED" ? (

      <button
        type="button"
        onClick={() =>
          handleUnpublishService(
            service.id
          )
        }
        className="
          w-full
          rounded-xl
          bg-orange-50
          py-2
          text-xs
          font-bold
          text-orange-600
          shadow-sm
          transition
          hover:bg-orange-100
        "
      >
        عدم انتشار خدمت
      </button>

    ) : (

      <button
        type="button"
        onClick={() =>
          handlePublishService(
            service.id
          )
        }
        className="
          w-full
          rounded-xl
          bg-green-600
          py-2
          text-xs
          font-bold
          text-white
          shadow-sm
          transition
          hover:bg-green-700
        "
      >
        انتشار خدمت
      </button>

    )}

  </div>

);

      })}



</div>

)
}


</section>





{/* معرفی مدرسه */}

<FormCard
  id="school-intro-section"
  title="اطلاعات معرفی مدرسه"
  hasError={
    !!schoolValidationErrors.schoolName ||
    !!schoolValidationErrors.slogan
  }
>


<Input
  label="نام مدرسه"
  value={school.schoolName}
  onChange={(v) => {
    updateField("schoolName", v);

    setSchoolValidationErrors((prev) => ({
      ...prev,
      schoolName: "",
    }));
  }}
  error={schoolValidationErrors.schoolName}
/>

<Input
  label="شعار مدرسه"
  value={school.slogan}
  onChange={(v) => {
    updateField("slogan", v);

    setSchoolValidationErrors((prev) => ({
      ...prev,
      slogan: "",
    }));
  }}
  error={schoolValidationErrors.slogan}
/>


</FormCard>







{/* آدرس */}

<FormCard
  id="school-contact-section"
  title="اطلاعات تماس و آدرس"
  hasError={
    !!schoolValidationErrors.city ||
    !!schoolValidationErrors.district ||
    !!schoolValidationErrors.address ||
    !!schoolValidationErrors.phone ||
    !!schoolValidationErrors.email
  }
>


<div>
  <label className="text-sm font-bold">
    شهر محل فعالیت
  </label>

  <input
    value={school.city || ""}
    readOnly
    className={`
      mt-1
      h-10
      w-full
      rounded-lg
      border
      bg-gray-100
      px-3
      text-sm
      ${
        schoolValidationErrors.city
          ? "border-red-400 ring-2 ring-red-100"
          : "border-gray-200"
      }
    `}
  />

  {schoolValidationErrors.city && (
    <p className="mt-1 text-xs font-bold text-red-500">
      {schoolValidationErrors.city}
    </p>
  )}
</div>


<Input
  label="منطقه"
  value={school.district}
  onChange={(v) => {
    updateField("district", v);

    setSchoolValidationErrors((prev) => ({
      ...prev,
      district: "",
    }));
  }}
  error={schoolValidationErrors.district}
/>

<TextArea
  label="آدرس دقیق پستی"
  value={school.address}
  onChange={(v) => {
    updateField("address", v);

    setSchoolValidationErrors((prev) => ({
      ...prev,
      address: "",
    }));
  }}
  error={schoolValidationErrors.address}
/>

<Input
  label="شماره تلفن"
  value={school.phone}
  onChange={(v) => {
    updateField("phone", v);

    setSchoolValidationErrors((prev) => ({
      ...prev,
      phone: "",
    }));
  }}
  error={schoolValidationErrors.phone}
/>

<Input
  label="ایمیل"
  value={school.email}
  onChange={(v) => {
    updateField("email", v);

    setSchoolValidationErrors((prev) => ({
      ...prev,
      email: "",
    }));
  }}
  error={schoolValidationErrors.email}
/>



</FormCard>






{/* اطلاعات آموزشی */}

<FormCard
  id="school-education-section"
  title="اطلاعات آموزشی"
  hasError={
    !!schoolValidationErrors.gender ||
    !!schoolValidationErrors.educationLevels ||
    !!schoolValidationErrors.schoolType ||
    !!schoolValidationErrors.foundedYear
  }
>


<Select
  label="جنسیت مدرسه"
  options={[
    "دخترانه",
    "پسرانه",
    "مختلط",
  ]}
  value={school.gender}
  onChange={(v) => {
    updateField("gender", v);

    setSchoolValidationErrors((prev) => ({
      ...prev,
      gender: "",
    }));
  }}
  error={schoolValidationErrors.gender}
/>



<div>
  <label className="text-sm font-bold">
    مقطع تحصیلی
  </label>

  <div
    className={`
      mt-3
      flex
      flex-nowrap
      gap-2
      overflow-x-auto
      rounded-xl
      p-2
      ${
        schoolValidationErrors.educationLevels
          ? "border border-red-400 bg-red-50 ring-2 ring-red-100"
          : ""
      }
    `}
  >
    {[
      "پیش دبستانی",
      "دبستان",
      "متوسطه اول",
      "متوسطه دوم",
      "هنرستان",
    ].map((level) => (
      <label
        key={level}
        className="
          flex
          shrink-0
          cursor-pointer
          items-center
          gap-2
          rounded-lg
          border
          bg-white
          px-3
          py-2
          text-xs
        "
      >
        <input
          type="checkbox"
          checked={
            school.educationLevels.includes(level)
          }
          onChange={() => {
            toggleEducationLevel(level);

            setSchoolValidationErrors((prev) => ({
              ...prev,
              educationLevels: "",
            }));
          }}
          className="h-4 w-4"
        />

        <span className="text-sm font-bold">
          {level}
        </span>
      </label>
    ))}
  </div>

  {schoolValidationErrors.educationLevels && (
    <p className="mt-1 text-xs font-bold text-red-500">
      {schoolValidationErrors.educationLevels}
    </p>
  )}
</div>



<Select
  label="نوع مدرسه"
  options={[
    "مدرسه دولتی",
    "مدرسه غیر انتفاعی",
    "مدرسه نمونه دولتی",
    "مدرسه تیزهوشان",
    "مدرسه تطبیقی",
    "مدرسه ایرانی خارج از کشور",
    "مدرسه هیئت امنائی",
    "مدرسه اقلیت های دینی",
  ]}
  value={school.schoolType}
  onChange={(v) => {
    updateField("schoolType", v);

    setSchoolValidationErrors((prev) => ({
      ...prev,
      schoolType: "",
    }));
  }}
  error={schoolValidationErrors.schoolType}
/>


<Input
  label="سال تاسیس"
  value={school.foundedYear}
  onChange={(v) => {
    updateField("foundedYear", v);

    setSchoolValidationErrors((prev) => ({
      ...prev,
      foundedYear: "",
    }));
  }}
  error={schoolValidationErrors.foundedYear}
/>



</FormCard>





{/* ظرفیت */}

<section
className="
rounded-3xl
bg-white
p-5
shadow
"
>

<div className="
mx-auto
max-w-4xl
">

<h2
className="
mb-5
font-black
text-[#6f4a18]
"
>
ظرفیت و فضای مدرسه
</h2>

<div
className="
grid
grid-cols-2
gap-3
"
>

<Input
label="وسعت مدرسه"
value={school.area}
onChange={v=>updateField("area",v)}
/>

<Input
label="تعداد ساختمان‌ها"
value={school.buildingCount}
onChange={v=>updateField("buildingCount",v)}
/>

<Input
label="تعداد کلاس‌ها"
value={school.classroomCount}
onChange={v=>updateField("classroomCount",v)}
/>

<Input
label="ظرفیت دانش‌آموزان"
value={school.studentCapacity}
onChange={v=>updateField("studentCapacity",v)}
/>

</div>
</div>
</section>



{/* امکانات */}

<FormCard title="امکانات تخصصی مدرسه">
<SchoolFeatureSection
value={school.facilities}
onChange={(value)=>
updateField(
"facilities",
value
)
}
/>
</FormCard>



{/* کادر آموزشی */}

<FormCard title="کادر آموزشی">


<Input
label="تعداد آموزگاران"
value={school.teacherCount}
onChange={v=>updateField("teacherCount",v)}
/>


<Input
label="میانگین سابقه آموزگاران"
value={school.teacherExperience}
onChange={v=>updateField("teacherExperience",v)}
/>


<TextArea
label="سطح علمی مدرسه و آموزگاران"
value={school.scientificLevel}
onChange={v=>updateField("scientificLevel",v)}
/>


<div className="md:col-span-2">
<div className="
flex
items-center
justify-between
mb-4
">
<h3 className="
font-black
text-[#6f4a18]
">
اعضای مدیریتی و آموزشی مدرسه
</h3>
<button
type="button"
onClick={addStaffMember}
className="
rounded-lg
bg-green-600
px-3
py-1
text-xs
font-bold
text-white
"
>
+ افزودن عضو جدید
</button>
</div>
<div className="space-y-2">

{
school.staffMembers.map(
(member,index)=>(

<div
key={index}
className="
flex
items-center
gap-2
rounded-xl
border
bg-yellow-50/40
p-2
"
>


{/* عکس */}

<div
  className="
    flex
    w-16
    shrink-0
    flex-col
    items-center
    gap-1
  "
>
  <label
    className="
      relative
      flex
      h-12
      w-12
      cursor-pointer
      items-center
      justify-center
      overflow-hidden
      rounded-full
      border
      border-yellow-200
      bg-yellow-100
      text-[10px]
      font-bold
      text-stone-500
    "
    title={
      member.image
        ? "تعویض عکس"
        : "افزودن عکس"
    }
  >
    {member.image ? (
      <img
        src={member.image}
        alt={member.name || "عضو مدرسه"}
        className="
          h-full
          w-full
          object-cover
        "
      />
    ) : (
      "افزودن عکس"
    )}

    <input
      type="file"
      accept="image/jpeg,image/png,image/webp"
      className="hidden"
      onChange={async (event) => {
        const file =
          event.target.files?.[0];

        await uploadStaffMemberImage(
          index,
          file
        );

        event.target.value = "";
      }}
    />
  </label>

  {member.image && (
    <button
      type="button"
      onClick={() =>
        updateStaffMember(
          index,
          "image",
          ""
        )
      }
      className="
        text-[10px]
        font-bold
        text-red-500
        hover:text-red-600
      "
    >
      حذف عکس
    </button>
  )}
</div>



<div className="
grid
flex-1
grid-cols-2
gap-2
sm:grid-cols-4
"
>


<input
placeholder="نام"
value={member.name}
onChange={(e)=>
updateStaffMember(
index,
"name",
e.target.value
)
}
className="
h-9
rounded-lg
border
px-2
text-xs
"
/>



<input
placeholder="سمت"
value={member.position}
onChange={(e)=>
updateStaffMember(
index,
"position",
e.target.value
)
}
className="
h-9
rounded-lg
border
px-2
text-xs
"
/>



<input
placeholder="تحصیلات"
value={member.education}
onChange={(e)=>
updateStaffMember(
index,
"education",
e.target.value
)
}
className="
h-9
rounded-lg
border
px-2
text-xs
"
/>



<input
placeholder="سابقه آموزشی"
value={member.experience}
onChange={(e)=>
updateStaffMember(
index,
"experience",
e.target.value
)
}
className="
h-9
rounded-lg
border
px-2
text-xs
"
/>



</div>




<button
type="button"
onClick={()=>
removeStaffMember(index)
}
className="
rounded-lg
bg-red-50
px-3
py-2
text-xs
font-bold
text-red-600
"
>
×
</button>


</div>


)
)
}

</div>
</div>


</FormCard>







{/* رزومه */}

<FormCard title="رزومه مدرسه">


<TextArea
label="معرفی و رزومه"
value={school.resume}
onChange={v=>updateField("resume",v)}
/>
</FormCard>





{/* مدیریت دستاوردهای مدرسه */}

<section
  className="
    rounded-3xl
    bg-white
    p-5
    shadow
  "
>
  <div
    className="
      flex
      items-center
      gap-2
    "
  >
    <Award
      size={21}
      className="text-yellow-700"
    />

    <h2
      className="
        font-black
        text-[#6f4a18]
      "
    >
      دستاوردهای مدرسه
    </h2>
  </div>


  <p
    className="
      mt-2
      text-xs
      leading-6
      text-gray-500
    "
  >
    از این بخش می‌توانید برای دانش‌آموزان مدرسه دستاورد صادر کنید.
  </p>


  {/* وضعیت مجوزهای صدور دستاورد */}
<div
  className="
    mt-4
    grid
    grid-cols-3
    gap-2
    sm:gap-3
  "
>
  {/* خریداری‌شده */}
  <div
    className="
      rounded-2xl
      bg-[#faf7ef]
      p-3
      text-center
      shadow-sm
    "
  >
    <p className="text-[11px] text-gray-400 sm:text-xs">
      مجوز خریداری‌شده
    </p>
    <p className="mt-1 text-lg font-black text-yellow-700">
      {loadingProducts
        ? "..."
        : packageAchievementLimit}
    </p>
  </div>
  {/* استفاده‌شده - قابل کلیک */}

<button
  type="button"
  onClick={handleOpenAchievementHistory}
  disabled={
    loadingProducts ||
    achievementUsedCount <= 0
  }
  className="
    rounded-2xl
    bg-[#faf7ef]
    p-3
    text-center
    shadow-sm
    transition-all
    duration-200
    hover:-translate-y-0.5
    hover:bg-yellow-50
    hover:shadow-md
    active:scale-[0.98]
    disabled:cursor-default
    disabled:hover:translate-y-0
    disabled:hover:bg-[#faf7ef]
    disabled:hover:shadow-sm
  "
>
  <p className="text-[11px] text-gray-400 sm:text-xs">
    استفاده‌شده
  </p>

  <p className="mt-1 text-lg font-black text-[#7a5526]">
    {loadingProducts
      ? "..."
      : achievementUsedCount}
  </p>

  {achievementUsedCount > 0 && (
    <p
      className="
        mt-1
        text-[10px]
        font-bold
        text-yellow-700
      "
    >
      مشاهده جزئیات
    </p>
  )}
</button>
  {/* باقی‌مانده */}
  <div
    className="
      rounded-2xl
      bg-[#faf7ef]
      p-3
      text-center
      shadow-sm
    "
  >
    <p className="text-[11px] text-gray-400 sm:text-xs">
      باقی‌مانده
    </p>
    <p
      className={`
        mt-1
        text-lg
        font-black
        ${
          remainingAchievementCount > 0
            ? "text-green-600"
            : "text-red-500"
        }
      `}
    >
      {loadingProducts
        ? "..."
        : remainingAchievementCount}
    </p>
  </div>
</div>


  {packageAchievementLimit <= 0 && !loadingProducts && (
    <div
      className="
        mt-3
        rounded-xl
        bg-red-50
        px-3
        py-2
        text-center
        text-xs
        font-bold
        text-red-500
      "
    >
      در بسته مدرسه مجوز صدور دستاورد ثبت نشده است
    </div>
  )}


  <div className="mt-5">
    <SchoolStudentsSection
      selectedStudents={school.students}
      onChange={(value) =>
        updateField(
          "students",
          value
        )
      }
      onGiveAchievement={
        handleOpenAchievement
      }
    />
  </div>


  {selectedAchievementChild && (
<div
className="
mt-4
rounded-2xl
border
border-yellow-200
bg-yellow-50
p-5
"
>
<h3
className="
font-black
text-[#6f4a18]
text-center
"
>
اهدای دستاورد برای:
{" "}
{selectedAchievementChild.fullName}
</h3>
<select
value={achievementForm.category}
onChange={(e)=>
setAchievementForm(prev=>({
 ...prev,
 category:e.target.value
}))
}
className="
mt-4
h-11
w-full
rounded-xl
border
bg-white
px-3
text-sm
"
>
<option value="">
انتخاب نوع دستاورد
</option>
<option value="ART">
دستاورد هنری
</option>
<option value="SPORT">
دستاورد ورزشی
</option>
<option value="RESEARCH">
دستاورد پرورشی
</option>
<option value="SCIENCE">
دستاورد علمی
</option>
<option value="MORAL">
دستاورد معنوی
</option>
</select>
<input
value={achievementForm.title}
onChange={(e)=>
setAchievementForm(prev=>({
...prev,
title:e.target.value
}))
}
placeholder="عنوان دستاورد"
className="
mt-4
h-11
w-full
rounded-xl
border
bg-white
px-3
text-sm
"
/>
<textarea
value={achievementForm.description}
onChange={(e)=>
setAchievementForm(prev=>({
...prev,
description:e.target.value
}))
}
placeholder="توضیحات دستاورد"
className="
mt-3
min-h-24
w-full
rounded-xl
border
bg-white
p-3
text-sm
"
/>

<div
className="
mt-4
flex
gap-2
"
>
<button
type="button"
onClick={handleCreateAchievement}
className="
flex-1
rounded-xl
bg-green-600
py-3
font-bold
text-white
"
>
صدور دستاورد
</button>
<button
type="button"
onClick={()=>
setSelectedAchievementChild(null)
}
className="
rounded-xl
bg-white
px-4
font-bold
text-gray-500
"
>
انصراف
</button>
</div>
</div>
)}


</section>





<button
type="button"
onClick={handleSaveSchool}
className="
w-full
rounded-2xl
bg-green-600
py-4
font-black
text-white
"
>

ذخیره اطلاعات مدرسه

</button>



{/* مودال تاریخچه دستاوردهای صادرشده */}

{showAchievementHistory && (

  <div
    className="
      fixed
      inset-0
      z-[100]
      flex
      items-center
      justify-center
      bg-black/50
      p-3
      sm:p-4
    "
    onClick={() =>
      setShowAchievementHistory(false)
    }
  >

    <div
      onClick={(e) =>
        e.stopPropagation()
      }
      className="
        flex
        max-h-[85vh]
        w-full
        max-w-2xl
        flex-col
        overflow-hidden
        rounded-3xl
        bg-white
        shadow-2xl
      "
    >

      {/* هدر مودال */}

      <div
        className="
          flex
          shrink-0
          items-center
          justify-between
          border-b
          border-yellow-100
          px-4
          py-4
          sm:px-5
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
            <Award
              size={20}
              className="text-yellow-700"
            />

            <h3
              className="
                font-black
                text-[#6f4a18]
              "
            >
              دستاوردهای صادرشده
            </h3>
          </div>

          <p
            className="
              mt-1
              text-[11px]
              text-gray-400
            "
          >
            تعداد کل:
            {" "}
            {schoolAchievements.length}
          </p>

        </div>


        <button
          type="button"
          onClick={() =>
            setShowAchievementHistory(false)
          }
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-gray-100
            text-xl
            font-black
            text-gray-500
            transition
            hover:bg-red-50
            hover:text-red-500
          "
        >
          ×
        </button>

      </div>


      {/* محتوای مودال */}

      <div
        className="
          flex-1
          overflow-y-auto
          p-4
          sm:p-5
        "
      >

        {loadingAchievements ? (

          <p
            className="
              py-12
              text-center
              text-sm
              font-bold
              text-gray-400
            "
          >
            در حال دریافت دستاوردها...
          </p>

        ) : schoolAchievements.length === 0 ? (

          <p
            className="
              py-12
              text-center
              text-sm
              text-gray-400
            "
          >
            هنوز دستاوردی توسط این مدرسه صادر نشده است.
          </p>

        ) : (

          <div className="space-y-3">

            {schoolAchievements.map(
              (item) => {

                const categoryLabels = {
                  ART: "دستاورد هنری",
                  SPORT: "دستاورد ورزشی",
                  RESEARCH: "دستاورد پرورشی",
                  SCIENCE: "دستاورد علمی",
                  MORAL: "دستاورد معنوی",
                };

                const issuedDate =
                  item.issuedAt
                    ? new Date(
                        item.issuedAt
                      ).toLocaleString(
                        "fa-IR",
                        {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )
                    : "تاریخ ثبت نشده";

                return (

                  <div
                    key={item.id}
                    className="
                      rounded-2xl
                      border
                      border-yellow-100
                      bg-[#faf7ef]
                      p-4
                    "
                  >

                    {/* کودک + نوع + تاریخ */}

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >

                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          overflow-hidden
                          rounded-full
                          bg-yellow-100
                        "
                      >

                        {item.child?.photo ? (

                          <img
                            src={item.child.photo}
                            alt={
                              item.child?.fullName ||
                              "دانش‌آموز"
                            }
                            className="
                              h-full
                              w-full
                              object-cover
                            "
                          />

                        ) : (

                          <Award
                            size={19}
                            className="
                              text-yellow-700
                            "
                          />

                        )}

                      </div>


                      <div
                        className="
                          min-w-0
                          flex-1
                        "
                      >

                        <p
                          className="
                            truncate
                            text-sm
                            font-black
                            text-stone-900
                          "
                        >
                          {item.child?.fullName ||
                            "دانش‌آموز"}
                        </p>

                        <p
                          className="
                            mt-1
                            text-[10px]
                            text-gray-400
                            sm:text-[11px]
                          "
                        >
                          {issuedDate}
                        </p>

                      </div>


                      <span
                        className="
                          shrink-0
                          rounded-full
                          border
                          border-yellow-200
                          bg-yellow-100
                          px-2
                          py-1
                          text-[9px]
                          font-black
                          text-yellow-800
                          sm:px-3
                          sm:text-[10px]
                        "
                      >
                        {
                          categoryLabels[
                            item.category
                          ] ||
                          item.category
                        }
                      </span>

                    </div>


                    {/* عنوان */}

                    <p
                      className="
                        mt-3
                        text-sm
                        font-black
                        text-[#6f4a18]
                      "
                    >
                      {item.title}
                    </p>


                    {/* توضیح */}

                    {item.description && (

                      <p
                        className="
                          mt-2
                          whitespace-pre-line
                          text-xs
                          leading-6
                          text-gray-500
                        "
                      >
                        {item.description}
                      </p>

                    )}

                  </div>

                );
              }
            )}

          </div>

        )}

      </div>

    </div>

  </div>

)}



</div>


</main>

);

}








function FormCard({
  id,
  title,
  children,
  hasError = false,
}) {
  return (
    <section
      id={id}
      className={`
        rounded-3xl
        bg-white
        p-5
        shadow
        transition
        ${
          hasError
            ? "border-2 border-red-300 ring-4 ring-red-50"
            : ""
        }
      `}
    >
      <h2
        className={`
          mb-5
          font-black
          ${
            hasError
              ? "text-red-600"
              : "text-[#6f4a18]"
          }
        `}
      >
        {title}

        {hasError && (
          <span className="mr-2 text-xs">
            — لطفاً تکمیل شود
          </span>
        )}
      </h2>

      <div className="grid gap-3">
        {children}
      </div>
    </section>
  );
}





function Input({
  label,
  value,
  onChange,
  error = "",
}) {
  return (
    <div>
      <label className="text-sm font-bold">
        {label}
      </label>

      <input
        value={value || ""}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className={`
          mt-1
          h-10
          w-full
          rounded-lg
          border
          px-3
          text-sm
          outline-none
          ${
            error
              ? "border-red-400 bg-red-50 ring-2 ring-red-100"
              : "border-gray-200 focus:border-yellow-400"
          }
        `}
      />

      {error && (
        <p className="mt-1 text-xs font-bold text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}





function TextArea({
  label,
  value,
  onChange,
  error = "",
}) {
  return (
    <div className="md:col-span-2">
      <label className="text-sm font-bold">
        {label}
      </label>

      <textarea
        value={value || ""}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className={`
          mt-2
          min-h-20
          w-full
          rounded-xl
          border
          p-4
          outline-none
          ${
            error
              ? "border-red-400 bg-red-50 ring-2 ring-red-100"
              : "border-gray-200 focus:border-yellow-400"
          }
        `}
      />

      {error && (
        <p className="mt-1 text-xs font-bold text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}


function Select({
  label,
  options,
  value,
  onChange,
  error = "",
}) {
  return (
    <div>
      <label className="text-sm font-bold">
        {label}
      </label>

      <select
        value={value || ""}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className={`
          mt-2
          h-12
          w-full
          rounded-xl
          border
          px-3
          outline-none
          ${
            error
              ? "border-red-400 bg-red-50 ring-2 ring-red-100"
              : "border-gray-200 focus:border-yellow-400"
          }
        `}
      >
        <option value="">
          انتخاب کنید
        </option>

        {options.map((item) => (
          <option
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-1 text-xs font-bold text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}



function PublicSchoolView({
  school,
  products,
  services,
  loadingProducts,
  loadingServices,
}) {

  const navigate = useNavigate();

  const [
    publicActiveHeaderIndex,
    setPublicActiveHeaderIndex,
    ] = useState(0);

  const headerImages =
    Array.isArray(school.headerImages)
      ? school.headerImages
      : [];

  const educationLevels =
    Array.isArray(school.educationLevels)
      ? school.educationLevels
      : [];

  const staffMembers =
    Array.isArray(school.staffMembers)
      ? school.staffMembers.filter(
          (member) =>
            member?.name ||
            member?.position ||
            member?.education ||
            member?.experience ||
            member?.image
        )
      : [];

    const eventServices =
  services.filter(
    service =>
      !service.package &&
      service.scheduleMode !== "PACKAGE"
  );


const courseServices =
  services.filter(
    service =>
      service.package ||
      service.scheduleMode === "PACKAGE"
  );

  return (
    <main
      dir="rtl"
      className="
        min-h-screen
        bg-[#faf7ef]
        px-3
        py-5
        text-gray-800
        sm:px-5
      "
    >
      <div className="mx-auto max-w-6xl space-y-5">

        {/* تصاویر و معرفی مدرسه */}

<section
  className="
    rounded-3xl
    border
    border-yellow-100
    bg-white
    p-5
    shadow
  "
>
  {/* دقیقاً هم‌اندازه حالت وندور مدرسه */}

  <div
    className="
      mx-auto
      w-full
      max-w-3xl
      overflow-hidden
      rounded-3xl
    "
  >
    {headerImages.length > 0 ? (
      <div>
        <PromoSlider
          variant="golden"
          interval={7000}
          height="h-44 sm:h-52 md:h-60 lg:h-64"
          slides={headerImages.map(
            (item, index) => ({
              id: index,

              image:
                typeof item === "string"
                  ? item
                  : item?.url || "",

              /*
                متن را اینجا خالی می‌گذاریم؛
                پایین اسلایدر نمایش داده می‌شود.
              */
              title: "",
            })
          )}
          onIndexChange={(index) => {
            setPublicActiveHeaderIndex(index);
          }}
        />

        {/* توضیح همان عکس فعال */}

        {typeof headerImages[
          publicActiveHeaderIndex
        ] !== "string" &&
          headerImages[
            publicActiveHeaderIndex
          ]?.description && (
            <div
              className="
                mt-3
                rounded-xl
                bg-yellow-50
                px-4
                py-3
                text-center
                text-sm
                font-bold
                leading-7
                text-[#6f4a18]
              "
            >
              {
                headerImages[
                  publicActiveHeaderIndex
                ].description
              }
            </div>
          )}
      </div>
    ) : (
      <div
        className="
          flex
          h-52
          items-center
          justify-center
          rounded-3xl
          bg-gradient-to-r
          from-yellow-100
          to-yellow-200
        "
      >
        <GraduationCap
          className="
            h-14
            w-14
            text-yellow-700
          "
        />
      </div>
    )}
  </div>


  {/* نام و معرفی مدرسه */}

  <div
    className="
      mx-auto
      max-w-3xl
      px-2
      pb-2
      pt-5
      text-center
    "
  >
    <h1
      className="
        text-xl
        font-black
        text-[#5f3e16]
        sm:text-2xl
      "
    >
      {school.schoolName ||
        "مدرسه ژنینو"}
    </h1>

    {school.slogan && (
      <p
        className="
          mt-2
          text-sm
          font-bold
          text-[#a77725]
        "
      >
        {school.slogan}
      </p>
    )}

    <div
      className="
        mt-4
        flex
        flex-wrap
        justify-center
        gap-2
      "
    >
      {school.gender && (
        <PublicBadge>
          {school.gender}
        </PublicBadge>
      )}

      {school.schoolType && (
        <PublicBadge>
          {school.schoolType}
        </PublicBadge>
      )}

      {educationLevels.map(
        (level) => (
          <PublicBadge key={level}>
            {level}
          </PublicBadge>
        )
      )}
    </div>
  </div>
</section>


{/* محصولات منتشرشده مدرسه */}

        <section
          className="
            rounded-[2rem]
            border
            border-yellow-100
            bg-white
            p-5
            shadow-md
          "
        >
          <h2
            className="
              font-black
              text-[#6f4a18]
            "
          >
            محصولات مدرسه
          </h2>

          {loadingProducts ? (
            <p
              className="
                py-8
                text-center
                text-sm
                font-bold
                text-gray-400
              "
            >
              در حال دریافت محصولات...
            </p>
          ) : products.length > 0 ? (
            <div
              className="
                mt-5
                grid
                grid-cols-2
                gap-3
                sm:grid-cols-3
                sm:gap-4
                lg:grid-cols-4
                lg:gap-6
              "
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  source="school-public"
                  showFavorite={true}
                />
              ))}
            </div>
          ) : (
            <p
              className="
                py-8
                text-center
                text-sm
                text-gray-400
              "
            >
              هنوز محصولی از این مدرسه منتشر نشده است.
            </p>
          )}
        </section>

        {/* خدمات منتشرشده مدرسه */}

<section
  className="
    rounded-[2rem]
    border
    border-yellow-100
    bg-white
    p-5
    shadow-md
  "
>
  <h2
    className="
      font-black
      text-[#6f4a18]
    "
  >
   رویدادها و خدمات مدرسه
  </h2>

  <p
    className="
      mt-2
      text-xs
      leading-6
      text-gray-500
    "
  >
    جشن‌ها، کلاس‌ها، کارگاه‌ها، اردوها و سایر خدمات قابل رزرو مدرسه
  </p>


  {loadingServices ? (

    <p
      className="
        py-8
        text-center
        text-sm
        font-bold
        text-gray-400
      "
    >
      در حال دریافت خدمات...
    </p>

  ) : eventServices.length > 0 ? (

    <div
      className="
        mt-5
        grid
        grid-cols-2
        gap-3
        sm:grid-cols-3
        sm:gap-4
        lg:grid-cols-4
        lg:gap-6
      "
    >

      {eventServices.map((service) => {

        const typeLabels = {
          EVENT: "جشن و رویداد",
          CLASS: "کلاس",
          WORKSHOP: "کارگاه",
          CAMP: "اردو",
          CONSULTATION: "مشاوره",
          OTHER: "سایر خدمات",
        };


        const serviceImages =
          Array.isArray(service.images)
            ? service.images
            : [];


        const mainImage =
          serviceImages[
            Number(
              service.mainImageIndex || 0
            )
          ] ||
          serviceImages[0] ||
          "";


        const startDateText =
          service.startAt
            ? new Date(
                service.startAt
              ).toLocaleString(
                "fa-IR",
                {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )
            : "زمان ثبت نشده";

            const sessions =
  Array.isArray(service.sessions)
    ? service.sessions
    : [];

const now = new Date();

const futureSessions =
  sessions.filter((session) => {
    if (!session?.endAt) return false;

    return (
      new Date(session.endAt) > now
    );
  });

const isExpired =
  sessions.length > 0
    ? futureSessions.length === 0
    : service.endAt
      ? new Date(service.endAt) <= now
      : false;


        return (

          <div
  key={service.id}
  onClick={() =>
    navigate(
      `/service/${service.id}`
    )
  }
  className={`
    overflow-hidden
    rounded-3xl
    border
    transition
    cursor-pointer

    ${
      isExpired
        ? `
          border-gray-200
          bg-gray-100
          opacity-60
          grayscale
        `
        : `
          border-yellow-100
          bg-white
          shadow-sm
          hover:shadow-md
        `
    }
  `}
>

            {/* تصویر */}

            <div
              className="
                relative
                h-40
                bg-yellow-50
              "
            >

              {mainImage ? (

                <img
                  src={mainImage}
                  alt={
                    service.title ||
                    "خدمت مدرسه"
                  }
                  className="
                    h-full
                    w-full
                    object-cover
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
                  🎉
                </div>

              )}


              <span
                className="
                  absolute
                  right-3
                  top-3
                  rounded-full
                  bg-white/90
                  px-3
                  py-1
                  text-[10px]
                  font-black
                  text-[#7a5526]
                  shadow
                "
              >
                {typeLabels[
                  service.serviceType
                ] || "خدمت"}
              </span>

              {isExpired && (
  <span
    className="
      absolute
      left-3
      top-3
      rounded-full
      bg-gray-700/90
      px-3
      py-1
      text-[10px]
      font-black
      text-white
      shadow
    "
  >
    پایان یافته
  </span>
)}

            </div>


            {/* اطلاعات */}

            <div className="p-4">

              <h3
                className="
                  line-clamp-1
                  font-black
                  text-[#5f3e16]
                "
              >
                {service.title}
              </h3>


              <p
                className="
                  mt-2
                  text-xs
                  text-gray-400
                "
              >
                {startDateText}
              </p>


              <div
                className="
                  mt-3
                  flex
                  items-center
                  justify-between
                  gap-2
                "
              >

                <span
                  className="
                    text-xs
                    font-bold
                    text-gray-500
                  "
                >
                  ظرفیت:
                  {" "}
                  {service.capacity}
                  {" "}
                  نفر
                </span>


                <span
                  className="
                    text-xs
                    font-black
                    text-[#7a5526]
                  "
                >
                  {service.isFree
                    ? "رایگان"
                    : `${Number(
                        service.price || 0
                      ).toLocaleString(
                        "fa-IR"
                      )} ریال`
                  }
                </span>

              </div>


              {service.locationName && (

                <p
                  className="
                    mt-2
                    line-clamp-1
                    text-xs
                    text-gray-400
                  "
                >
                  محل:
                  {" "}
                  {service.locationName}
                </p>

              )}


              <button
  type="button"
  onClick={(e) => {
    e.stopPropagation();

    navigate(
      `/service/${service.id}`
    );
  }}
  className={`
    mt-4
    w-full
    rounded-xl
    py-2.5
    text-xs
    font-black
    text-white
    shadow-sm
    transition

    ${
      isExpired
        ? `
          bg-gray-600
          hover:bg-gray-700
        `
        : `
          bg-gradient-to-r
          from-[#7a5526]
          via-[#b88724]
          to-[#d4af37]
          hover:shadow-md
        `
    }
  `}
>
  {isExpired
    ? "پایان یافته — مشاهده جزئیات"
    : "مشاهده و رزرو"}
</button>

            </div>

          </div>

        );

      })}

    </div>

  ) : (

    <p
      className="
        py-8
        text-center
        text-sm
        text-gray-400
      "
    >
      هنوز خدمتی از این مدرسه منتشر نشده است.
    </p>

  )}

</section>


{/* دوره‌ها و کلاس‌های آموزشی */}

<section
className="
rounded-[2rem]
border
border-yellow-100
bg-white
p-5
shadow-md
"
>

<h2
className="
font-black
text-[#6f4a18]
"
>
دوره‌ها و کلاس‌های آموزشی
</h2>


<div
className="
mt-5
grid
grid-cols-2
gap-3
sm:grid-cols-3
lg:grid-cols-4
"
>

{
courseServices.map((service)=>{


        const typeLabels = {
          EVENT: "جشن و رویداد",
          CLASS: "کلاس",
          WORKSHOP: "کارگاه",
          CAMP: "اردو",
          CONSULTATION: "مشاوره",
          OTHER: "سایر خدمات",
        };


        const serviceImages =
          Array.isArray(service.images)
            ? service.images
            : [];


        const mainImage =
          serviceImages[
            Number(
              service.mainImageIndex || 0
            )
          ] ||
          serviceImages[0] ||
          "";


        const startDateText =
          service.startAt
            ? new Date(
                service.startAt
              ).toLocaleString(
                "fa-IR",
                {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )
            : "زمان ثبت نشده";

            const sessions =
  Array.isArray(service.sessions)
    ? service.sessions
    : [];

const now = new Date();

const futureSessions =
  sessions.filter((session) => {
    if (!session?.endAt) return false;

    return (
      new Date(session.endAt) > now
    );
  });

const isExpired =
  sessions.length > 0
    ? futureSessions.length === 0
    : service.endAt
      ? new Date(service.endAt) <= now
      : false;


        return (

          <div
  key={service.id}
  onClick={() =>
    navigate(
      `/course/${service.id}`
    )
  }
  className={`
    overflow-hidden
    rounded-3xl
    border
    transition
    cursor-pointer

    ${
      isExpired
        ? `
          border-gray-200
          bg-gray-100
          opacity-60
          grayscale
        `
        : `
          border-yellow-100
          bg-white
          shadow-sm
          hover:shadow-md
        `
    }
  `}
>

            {/* تصویر */}

            <div
              className="
                relative
                h-40
                bg-yellow-50
              "
            >

              {mainImage ? (

                <img
                  src={mainImage}
                  alt={
                    service.title ||
                    "خدمت مدرسه"
                  }
                  className="
                    h-full
                    w-full
                    object-cover
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
                  🎉
                </div>

              )}


              <span
                className="
                  absolute
                  right-3
                  top-3
                  rounded-full
                  bg-white/90
                  px-3
                  py-1
                  text-[10px]
                  font-black
                  text-[#7a5526]
                  shadow
                "
              >
                {typeLabels[
                  service.serviceType
                ] || "خدمت"}
              </span>

              {isExpired && (
  <span
    className="
      absolute
      left-3
      top-3
      rounded-full
      bg-gray-700/90
      px-3
      py-1
      text-[10px]
      font-black
      text-white
      shadow
    "
  >
    پایان یافته
  </span>
)}

            </div>


            {/* اطلاعات */}

            <div className="p-4">

              <h3
                className="
                  line-clamp-1
                  font-black
                  text-[#5f3e16]
                "
              >
                {service.title}
              </h3>


              <p
                className="
                  mt-2
                  text-xs
                  text-gray-400
                "
              >
                {startDateText}
              </p>


              <div
                className="
                  mt-3
                  flex
                  items-center
                  justify-between
                  gap-2
                "
              >

                <span
                  className="
                    text-xs
                    font-bold
                    text-gray-500
                  "
                >
                  ظرفیت:
                  {" "}
                  {service.capacity}
                  {" "}
                  نفر
                </span>


                <span
                  className="
                    text-xs
                    font-black
                    text-[#7a5526]
                  "
                >
                  {service.isFree
                    ? "رایگان"
                    : `${Number(
                        service.price || 0
                      ).toLocaleString(
                        "fa-IR"
                      )} ریال`
                  }
                </span>

              </div>


              {service.locationName && (

                <p
                  className="
                    mt-2
                    line-clamp-1
                    text-xs
                    text-gray-400
                  "
                >
                  محل:
                  {" "}
                  {service.locationName}
                </p>

              )}


              <button
  type="button"
  onClick={(e) => {
    e.stopPropagation();

    navigate(
      `/course/${service.id}`
    );
  }}
  className={`
    mt-4
    w-full
    rounded-xl
    py-2.5
    text-xs
    font-black
    text-white
    shadow-sm
    transition

    ${
      isExpired
        ? `
          bg-gray-600
          hover:bg-gray-700
        `
        : `
          bg-gradient-to-r
          from-[#7a5526]
          via-[#b88724]
          to-[#d4af37]
          hover:shadow-md
        `
    }
  `}
>
  {isExpired
    ? "پایان یافته — مشاهده جزئیات"
    : "مشاهده و رزرو"}
</button>

            </div>

          </div>

               );

})
}

</div>

</section>


        {/* اطلاعات تماس و آدرس */}

        <PublicInfoSection title="اطلاعات تماس و آدرس">
          <PublicInfoItem
            label="شهر"
            value={school.city}
          />

          <PublicInfoItem
            label="منطقه"
            value={school.district}
          />

          <PublicInfoItem
            label="شماره تماس"
            value={school.phone}
          />

          <PublicInfoItem
            label="ایمیل"
            value={school.email}
          />

          <PublicInfoItem
            label="آدرس دقیق"
            value={school.address}
            fullWidth
          />
        </PublicInfoSection>


        {/* اطلاعات آموزشی */}

        <PublicInfoSection title="اطلاعات آموزشی">
          <PublicInfoItem
            label="جنسیت مدرسه"
            value={school.gender}
          />

          <PublicInfoItem
            label="نوع مدرسه"
            value={school.schoolType}
          />

          <PublicInfoItem
            label="سال تأسیس"
            value={school.foundedYear}
          />

          <PublicInfoItem
            label="مقاطع تحصیلی"
            value={educationLevels.join("، ")}
          />
        </PublicInfoSection>


        {/* ظرفیت و فضای مدرسه */}

        <PublicInfoSection title="ظرفیت و فضای مدرسه">
          <PublicInfoItem
            label="وسعت مدرسه"
            value={school.area}
          />

          <PublicInfoItem
            label="تعداد ساختمان‌ها"
            value={school.buildingCount}
          />

          <PublicInfoItem
            label="تعداد کلاس‌ها"
            value={school.classroomCount}
          />

          <PublicInfoItem
            label="ظرفیت دانش‌آموزان"
            value={school.studentCapacity}
          />
        </PublicInfoSection>

        {/* امکانات تخصصی مدرسه */}

        <PublicSchoolFacilities
         facilities={school.facilities}
        />


        {/* اطلاعات کادر آموزشی */}

        <PublicInfoSection title="کادر آموزشی">
          <PublicInfoItem
            label="تعداد آموزگاران"
            value={school.teacherCount}
          />

          <PublicInfoItem
            label="میانگین سابقه آموزگاران"
            value={school.teacherExperience}
          />

          <PublicInfoItem
            label="سطح علمی مدرسه و آموزگاران"
            value={school.scientificLevel}
            fullWidth
          />
        </PublicInfoSection>


        {/* اعضای مدیریتی و آموزشی */}

        {staffMembers.length > 0 && (
          <section
            className="
              rounded-[2rem]
              border
              border-yellow-100
              bg-white
              p-5
              shadow-md
            "
          >
            <h2
              className="
                mb-4
                font-black
                text-[#6f4a18]
              "
            >
              اعضای مدیریتی و آموزشی
            </h2>

            <div className="space-y-3">
              {staffMembers.map(
                (member, index) => (
                  <div
                    key={index}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      bg-[#faf7ef]
                      p-3
                    "
                  >
                    <div
                      className="
                        flex
                        h-14
                        w-14
                        shrink-0
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-full
                        bg-yellow-100
                        text-xs
                        text-gray-400
                      "
                    >
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name || ""}
                          className="
                            h-full
                            w-full
                            object-cover
                          "
                        />
                      ) : (
                        "عکس"
                      )}
                    </div>

                    <div
                      className="
                        grid
                        flex-1
                        grid-cols-2
                        gap-2
                        text-xs
                        sm:grid-cols-4
                      "
                    >
                      <PublicStaffValue
                        label="نام"
                        value={member.name}
                      />

                      <PublicStaffValue
                        label="سمت"
                        value={member.position}
                      />

                      <PublicStaffValue
                        label="تحصیلات"
                        value={member.education}
                      />

                      <PublicStaffValue
                        label="سابقه آموزشی"
                        value={member.experience}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </section>
        )}


        {/* رزومه مدرسه */}

        {school.resume && (
          <section
            className="
              rounded-[2rem]
              border
              border-yellow-100
              bg-white
              p-5
              shadow-md
            "
          >
            <h2
              className="
                font-black
                text-[#6f4a18]
              "
            >
              معرفی و رزومه مدرسه
            </h2>

            <p
              className="
                mt-4
                whitespace-pre-line
                text-sm
                leading-8
                text-gray-600
              "
            >
              {school.resume}
            </p>
          </section>
        )}


        

        

      </div>
    </main>
  );
}


function PublicBadge({
  children,
}) {
  return (
    <span
      className="
        rounded-full
        border
        border-yellow-200
        bg-yellow-50
        px-3
        py-1.5
        text-xs
        font-bold
        text-[#7a5526]
      "
    >
      {children}
    </span>
  );
}


function PublicInfoSection({
  title,
  children,
}) {
  return (
    <section
      className="
        rounded-[2rem]
        border
        border-yellow-100
        bg-white
        p-5
        shadow-md
      "
    >
      <h2
        className="
          mb-5
          font-black
          text-[#6f4a18]
        "
      >
        {title}
      </h2>

      <div
        className="
          grid
          grid-cols-1
          gap-3
          sm:grid-cols-2
        "
      >
        {children}
      </div>
    </section>
  );
}


function PublicInfoItem({
  label,
  value,
  fullWidth = false,
}) {
  const normalizedValue =
    value === null ||
    value === undefined
      ? ""
      : String(value).trim();

  if (!normalizedValue) {
    return null;
  }

  return (
    <div
      className={`
        flex
        items-center
        gap-2
        rounded-xl
        bg-[#faf7ef]
        px-3
        py-2
        ${
          fullWidth
            ? "sm:col-span-2"
            : ""
        }
      `}
    >

      <span
        className="
          shrink-0
          text-[11px]
          font-bold
          text-gray-400
        "
      >
        {label}
      </span>


      <span
        className="
          text-xs
          font-black
          text-[#5f3e16]
        "
      >
        |
      </span>


      <span
        className="
          min-w-0
          break-words
          text-xs
          font-bold
          text-[#5f3e16]
        "
      >
        {normalizedValue}
      </span>

    </div>
  );
}


function PublicStaffValue({
  label,
  value,
}) {
  return (
    <div>
      <p className="text-[10px] text-gray-400">
        {label}
      </p>

      <p
        className="
          mt-1
          break-words
          font-bold
          text-[#5f3e16]
        "
      >
        {value || "ثبت نشده"}
      </p>
    </div>
  );
}

function PublicSchoolFacilities({
  facilities,
}) {
  const safeFacilities =
    facilities &&
    typeof facilities === "object"
      ? facilities
      : {};

  return (
    <section
      className="
        rounded-[2rem]
        border
        border-yellow-100
        bg-white
        p-5
        shadow-md
      "
    >
      <h2
        className="
          mb-5
          font-black
          text-[#6f4a18]
        "
      >
        امکانات تخصصی مدرسه
      </h2>

      <div className="space-y-4">
        {Object.entries(
          SCHOOL_FEATURE_SECTIONS
        ).map(([sectionTitle, items]) => {
          const sectionValue =
            safeFacilities?.[
              sectionTitle
            ] || {};

          return (
            <div
              key={sectionTitle}
              className="
                rounded-2xl
                bg-[#faf7ef]
                p-4
              "
            >
              <h3
                className="
                  mb-3
                  text-sm
                  font-black
                  text-[#7a5526]
                "
              >
                امکانات {sectionTitle}
              </h3>

              <div className="space-y-2">
                {items.map((item) => {
                  const itemValue =
                    sectionValue?.[
                      item.key
                    ] || {};

                  const available =
                    itemValue.available;

                  let statusText =
                    "بدون پاسخ";

                  let statusClass =
                    "border-gray-200 bg-gray-100 text-gray-600";

                  if (available === true) {
                    statusText = "بله";

                    statusClass =
                      "border-green-200 bg-green-50 text-green-700";
                  } else if (
                    available === false
                  ) {
                    statusText = "خیر";

                    statusClass =
                      "border-red-200 bg-red-50 text-red-600";
                  }

                  return (
                    <div
                      key={item.key}
                      className="
                        rounded-xl
                        border
                        border-yellow-50
                        bg-white
                        p-3
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
                        <p
                          className="
                            flex-1
                            text-xs
                            font-bold
                            leading-6
                            text-gray-700
                          "
                        >
                          {item.title.replace(
                            "آیا مدرسه ",
                            ""
                          )}
                        </p>

                        <span
                          className={`
                            shrink-0
                            rounded-full
                            border
                            px-2.5
                            py-1
                            text-[10px]
                            font-black
                            ${statusClass}
                          `}
                        >
                          {statusText}
                        </span>
                      </div>

                      {String(
                        itemValue.description ||
                          ""
                      ).trim() && (
                        <p
                          className="
                            mt-2
                            rounded-lg
                            bg-[#faf7ef]
                            px-3
                            py-2
                            text-xs
                            leading-6
                            text-gray-500
                          "
                        >
                          {
                            itemValue.description
                          }
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {String(
                sectionValue.extra || ""
              ).trim() && (
                <div
                  className="
                    mt-3
                    rounded-xl
                    border
                    border-yellow-100
                    bg-white
                    p-3
                  "
                >
                  <p
                    className="
                      text-[10px]
                      font-bold
                      text-gray-400
                    "
                  >
                    توضیحات کلی
                  </p>

                  <p
                    className="
                      mt-1
                      whitespace-pre-line
                      text-xs
                      leading-6
                      text-gray-600
                    "
                  >
                    {sectionValue.extra}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}