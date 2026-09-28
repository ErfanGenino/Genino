import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Baby,
  Check,
  ChevronLeft,
  Gift as GiftIcon,
  Heart,
  Search,
  Sparkles,
  UserRound,
} from "lucide-react";
import {
  searchGeninoUsers,
  getGiftWishlist,
  getPublicChildFavoriteProducts,
  getGiftSelectedUsers,
  addGiftSelectedUser,
  removeGiftSelectedUser,
  getFollowedChildren,
  authFetch,
} from "../services/api";
import { Link } from "react-router-dom";
import ProductCard from "../components/Product/ProductCard";






function Avatar({
  name,
  avatarUrl,
  type = "user",
  className = "",
}) {
  return (
    <div
      className={`
        flex shrink-0 overflow-hidden items-center justify-center
        bg-gradient-to-br from-[#fff8df] to-[#efd899]
        font-black text-[#7a5526]
        ${className}
      `}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name || "avatar"}
          className="h-full w-full object-cover"
        />
      ) : type === "child" ? (
        <Baby className="h-5 w-5" />
      ) : (
        <span>
          {name?.trim()?.charAt(0) || "ژ"}
        </span>
      )}
    </div>
  );
}

function PersonCard({
  person,
  type,
  isChecked,
  isActive,
  onCheck,
  onSelect,
}) {
  return (
    <motion.div
      layout
      whileHover={{ y: -2 }}
      className={`
        group flex items-center gap-3 rounded-2xl border p-2.5
        transition-all duration-200
        ${
          isActive
            ? "border-yellow-400 bg-yellow-50 shadow-[0_10px_25px_rgba(180,130,30,0.13)]"
            : "border-[#eee5d5] bg-white/85 hover:border-yellow-200 hover:bg-yellow-50/60"
        }
      `}
    >
      {type === "user" && (
        <button
          type="button"
          onClick={() => onCheck(person)}
          aria-label={
            isChecked ? "حذف از افراد منتخب" : "افزودن به افراد منتخب"
          }
          className={`
            flex h-6 w-6 shrink-0 items-center justify-center
            rounded-lg border transition
            ${
              isChecked
                ? "border-[#b88724] bg-[#b88724] text-white"
                : "border-gray-300 bg-white text-transparent hover:border-yellow-400"
            }
          `}
        >
          <Check className="h-4 w-4" />
        </button>
      )}

      <button
        type="button"
        onClick={() => onSelect(person, type)}
        className="flex min-w-0 flex-1 items-center gap-3 text-right"
      >
        <Avatar
  name={person.name}
  avatarUrl={person.avatarUrl}
  type={type}
  className="h-11 w-11 rounded-2xl text-sm shadow-sm"
/>

        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-black text-gray-800 sm:text-sm">
            {person.name}
          </p>

          <p className="mt-1 truncate text-[10px] text-gray-400">
  {type === "child"
    ? `${person.isMine ? "فرزند شما" : "کودک دنبال‌شده"} • ${person.age}`
    : person.subtitle}
</p>
        </div>

        <ChevronLeft className="h-4 w-4 shrink-0 text-gray-300 transition group-hover:text-yellow-600" />
      </button>
    </motion.div>
  );
}

export default function Gift() {
  const [userSearch, setUserSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [activePerson, setActivePerson] = useState(null);
  const [userTab, setUserTab] = useState("selected");
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [children, setChildren] = useState([]);
  const [childrenLoading, setChildrenLoading] = useState(true);
  const wishlistSectionRef = useRef(null);

  

  

  const filteredUsers = useMemo(() => {
  const query = userSearch.trim().toLowerCase();

  if (!query) return users;

  return users.filter((user) =>
    user.fullName
      ?.toLowerCase()
      .includes(query)
  );
}, [userSearch, users]);

  const [activeWishlist, setActiveWishlist] = useState([]);

  useEffect(() => {
  loadUsers();
  loadSelectedUsers();
  loadFollowedChildren();
}, []);

useEffect(() => {
  if (!activePerson) return;

  const timer = setTimeout(() => {
    wishlistSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 150);

  return () => clearTimeout(timer);
}, [activePerson]);


async function loadUsers() {
  try {
    setUsersLoading(true);

    const res = await searchGeninoUsers();

    if (res?.ok) {
      setUsers(
  (res.items || []).map((user) => ({
    ...user,
    name: user.fullName,
    subtitle: "عضو ژنینو",
  }))
);
    }

  } catch (error) {
    console.error(
      "LOAD GIFT USERS ERROR:",
      error
    );
  } finally {
    setUsersLoading(false);
  }
}

async function loadFollowedChildren() {
  try {
    setChildrenLoading(true);

    const myChildrenRes = await authFetch("/children");
const followedChildrenRes = await getFollowedChildren();


const myChildren = Array.isArray(myChildrenRes)
  ? myChildrenRes
  : myChildrenRes?.children || [];


const followedChildren = Array.isArray(followedChildrenRes)
  ? followedChildrenRes
  : [];


const normalizeChild = (child, isMine = false) => ({
  ...child,
  name: child.fullName,
  age: child.birthDate
    ? new Date().getFullYear() -
      new Date(child.birthDate).getFullYear() +
      " ساله"
    : "",
  avatarUrl: child.photo,
  isMine,
});


const mergedChildren = [
  ...myChildren
    .filter((child) => child?.fullName)
    .map((child) =>
      normalizeChild(child, true)
    ),

  ...followedChildren
    .filter(
      (child) =>
        child?.fullName &&
        !myChildren.some(
          (mine) => mine.id === child.id
        )
    )
    .map((child) =>
      normalizeChild(child, false)
    ),
];


setChildren(mergedChildren);

  } catch (error) {
    console.error(
      "LOAD FOLLOWED CHILDREN ERROR:",
      error
    );
  } finally {
    setChildrenLoading(false);
  }
}


async function loadSelectedUsers() {
  try {
    const res = await getGiftSelectedUsers();
    if (res?.ok) {
      setSelectedUsers(
        (res.users || []).map((user) => ({
          ...user,
          name: user.fullName,
          subtitle: "عضو ژنینو",
        }))
      );
    }
    else if(res?.message){
      alert(res.message);
    }
  } catch (error) {
    console.error(
      "LOAD SELECTED USERS ERROR:",
      error
    );
  }
}



async function loadWishlist(userId) {
  try {
    const res = await getGiftWishlist(userId);

    if (res?.ok) {
      setActiveWishlist(res.products || []);
    } else {
      setActiveWishlist([]);
    }

  } catch (error) {
    console.error(
      "LOAD GIFT WISHLIST ERROR:",
      error
    );

    setActiveWishlist([]);
  }
}

  async function toggleSelectedUser(user) {
  const exists = selectedUsers.some(
    (selectedUser) => selectedUser.id === user.id
  );


  try {

  

    if (exists) {

      const res = await removeGiftSelectedUser(user.id);

    

      if (res?.ok) {
        setSelectedUsers((prev) =>
          prev.filter(
            (item) => item.id !== user.id
          )
        );
      }

    } else {

      const res = await addGiftSelectedUser(user.id);


      if (res?.ok) {

        
        setSelectedUsers((prev) => [
  ...prev,
  {
    ...user,
    name: user.fullName || user.name,
  },
]);
      }

      else {

  alert(
    res?.message ||
    "امکان انجام این عملیات وجود ندارد."
  );

}

    }

  } catch(error){

    console.error(
      "TOGGLE GIFT USER ERROR:",
      error
    );

  }
}

  async function handlePersonSelect(person, type) {
  const selectedPerson = {
    ...person,
    personType:type,
  };
  setActivePerson(selectedPerson);
  try {
    if(type === "user"){
      await loadWishlist(person.id);
    }
    if(type === "child"){
      const res =
        await getPublicChildFavoriteProducts(
          person.id
        );
      if(res?.ok){
        setActiveWishlist(
          res.products || []
        );
      }else{
        setActiveWishlist([]);
      }
    }



  }catch(error){


    console.error(
      "LOAD PERSON WISHLIST ERROR:",
      error
    );


    setActiveWishlist([]);


  }

}

  return (
    <main
      dir="rtl"
      className="
        relative min-h-screen overflow-hidden
        bg-[#faf7ef] px-3 py-5 text-gray-800
        sm:px-5 lg:px-8
      "
    >
      {/* نورهای پس‌زمینه */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-yellow-200/30 blur-3xl" />
        <div className="absolute left-0 top-1/3 h-80 w-80 rounded-full bg-amber-100/60 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 h-72 w-72 rounded-full bg-white/80 blur-3xl" />
      </div>

      <section className="relative z-10 mx-auto max-w-7xl">
        {/* هدر */}
        <motion.header
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            relative mb-5 overflow-hidden rounded-[2rem]
            bg-gradient-to-br from-[#4b2f17] via-[#855d27] to-[#d4af37]
            px-4 py-5 text-white
            shadow-[0_20px_55px_rgba(90,60,20,0.22)]
            sm:px-6 sm:py-6
          "
        >
          <div className="absolute inset-0 bg-white/5" />

          <div className="absolute -left-10 -top-14 h-40 w-40 rounded-full border border-white/10 bg-white/5" />

          <div className="relative flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 shadow-inner backdrop-blur-sm">
              <GiftIcon className="h-8 w-8 text-yellow-100" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black sm:text-2xl">
                  هدیه‌بازی ژنینو
                </h1>

                <Sparkles className="h-5 w-5 text-yellow-200" />
              </div>

              <p className="mt-2 max-w-2xl text-[11px] leading-6 text-white/80 sm:text-sm">
                عزیزانتان را پیدا کنید و از میان کالاهای مورد
                علاقه‌شان، هدیه‌ای مناسب بودجه خود انتخاب و برایشان ارسال کنید.
              </p>
            </div>
          </div>
        </motion.header>

       

        {/* بخش اصلی */}
        <div className="flex flex-col gap-5 lg:flex-row">
          {/* سمت راست: کودکان */}
          <aside className="w-full lg:w-[38%]">
            <div className="rounded-[1.8rem] border border-white bg-white/75 p-3 shadow-[0_16px_45px_rgba(120,90,20,0.08)] backdrop-blur-xl sm:p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-100 text-yellow-700">
                    <Baby className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-sm font-black">
                     کودکانی که دنبال می‌کنید
                    </h2>
                    <p className="mt-0.5 text-[9px] text-gray-400">
                     برای ارسال هدیه، یکی از کودکانی که دنبال می‌کنید را انتخاب کنید
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-yellow-50 px-2.5 py-1 text-[9px] font-bold text-yellow-700">
                  {children.length} کودک
                </span>
              </div>


              <div className="max-h-[330px] space-y-2 overflow-y-auto pl-1">
                {children.map((child) => (
                  <PersonCard
                    key={child.id}
                    person={child}
                    type="child"
                    isActive={
                      activePerson?.personType === "child" &&
                      activePerson?.id === child.id
                    }
                    onSelect={handlePersonSelect}
                  />
                ))}
              </div>

              <div
  className="
    mt-4 rounded-2xl border border-yellow-100
    bg-yellow-50/70 p-3 text-center
  "
>
  <p className="text-[10px] leading-6 text-gray-600">
    اگر می‌خواهید برای کودکی که در فهرست دنبال‌شده‌های شما نیست
    هدیه ارسال کنید، ابتدا به صفحه{" "}
    
    <Link
  to="/genino-children"
  className="font-black text-yellow-700 hover:underline"
>
  کودکان ژنینویی
</Link>{" "}
    
    بروید و کودک موردنظر را دنبال کنید.
    پس از دنبال کردن، می‌توانید برای او هدیه ارسال کنید.
  </p>
</div>

              
            </div>
          </aside>

          {/* سمت چپ: کاربران */}
          <section className="min-w-0 flex-1">
            <div className="rounded-[1.8rem] border border-white bg-white/75 p-3 shadow-[0_16px_45px_rgba(120,90,20,0.08)] backdrop-blur-xl sm:p-4">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f4ead3] text-[#8a6228]">
                    <UserRound className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-sm font-black">
                      کاربران ژنینو
                    </h2>

                    <p className="mt-0.5 text-[9px] text-gray-400">
                      افراد آشنای خود را تیک بزنید
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-[#f7f0df] px-2.5 py-1 text-[9px] font-bold text-[#8a6228]">
                  {selectedUsers.length} نفر منتخب
                </span>

                <div
  className="
    mb-4 grid grid-cols-2 gap-2
    rounded-2xl bg-[#f8f1df] p-1
  "
>
  <button
    type="button"
    onClick={() => setUserTab("selected")}
    className={`
      rounded-xl py-2 text-[10px] font-black transition
      ${
        userTab === "selected"
          ? "bg-white text-[#8a6228] shadow-sm"
          : "text-gray-400"
      }
    `}
  >
    عزیزان منتخب من
  </button>


  <button
    type="button"
    onClick={() => setUserTab("all")}
    className={`
      rounded-xl py-2 text-[10px] font-black transition
      ${
        userTab === "all"
          ? "bg-white text-[#8a6228] shadow-sm"
          : "text-gray-400"
      }
    `}
  >
    همه کاربران
  </button>

</div>

              </div>

              <div className="relative mb-4">
                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  value={userSearch}
                  onChange={(event) =>
                    setUserSearch(event.target.value)
                  }
                  placeholder="جستجوی کاربران ژنینو..."
                  className="
                    h-10 w-full rounded-2xl border border-[#eee4d2]
                    bg-[#fffdf8] pr-10 pl-3 text-[11px]
                    outline-none transition
                    placeholder:text-gray-400
                    focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100
                  "
                />
              </div>

              <div className="grid max-h-[445px] grid-cols-1 gap-2 overflow-y-auto pl-1 sm:grid-cols-2">
                {(
  userTab === "selected"
    ? selectedUsers
    : filteredUsers
).map((user) => {
                  const isChecked = selectedUsers.some(
                    (selectedUser) =>
                      selectedUser.id === user.id
                  );

                  return (
                    <PersonCard
                      key={user.id}
                      person={user}
                      type="user"
                      isChecked={isChecked}
                      isActive={
                        activePerson?.personType === "user" &&
                        activePerson?.id === user.id
                      }
                      onCheck={toggleSelectedUser}
                      onSelect={handlePersonSelect}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        

        {/* علاقه‌مندی‌های شخص انتخاب‌شده */}
        <AnimatePresence mode="wait">
          {activePerson && (
            <motion.section
              ref={wishlistSectionRef}
              key={`${activePerson.personType}-${activePerson.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="
                mt-5 rounded-[1.8rem]
                border border-yellow-200/70
                bg-gradient-to-br from-white/90 to-[#fff9e8]/90
                p-4 shadow-[0_18px_50px_rgba(120,90,20,0.1)]
                backdrop-blur-xl sm:p-5
              "
            >
              <div className="mb-5 flex items-center gap-3">
                <Avatar
                  name={activePerson.name}
                  avatarUrl={activePerson.avatarUrl}
                  type={activePerson.personType}
                  className="h-12 w-12 rounded-2xl"
                />

                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-sm font-black sm:text-base">
                    علاقه‌مندی‌های عمومی {activePerson.name}
                  </h2>

                  <p className="mt-1 text-[9px] text-gray-400 sm:text-[11px]">
                    کالاهایی که این کاربر اجازه نمایش عمومی آن‌ها
                    را داده است
                  </p>
                </div>

                <Heart className="h-6 w-6 fill-red-400 text-red-400" />
              </div>

              {activeWishlist.length === 0 ? (
                <div className="flex min-h-32 flex-col items-center justify-center rounded-2xl border border-dashed border-[#decfae] bg-white/60 text-center">
                  <Heart className="h-7 w-7 text-gray-300" />

                  <p className="mt-3 text-[10px] font-bold text-gray-400">
                    علاقه‌مندی عمومی برای این شخص ثبت نشده است
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {activeWishlist.map((product) => (
  <ProductCard
    key={product.id}
    product={product}
    showFavorite={false}
    source="gift"
    giftTarget={activePerson}
  />
))}
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>

        {!activePerson && (
          <div className="mt-5 rounded-[1.8rem] border border-dashed border-[#dacaa9] bg-white/55 px-4 py-8 text-center backdrop-blur-sm">
            <GiftIcon className="mx-auto h-8 w-8 text-[#c5a45f]" />

            <p className="mt-3 text-xs font-black text-gray-600">
              یک کودک یا کاربر را انتخاب کنید
            </p>

            <p className="mt-2 text-[10px] text-gray-400">
              علاقه‌مندی‌های عمومی او در این قسمت نمایش داده می‌شود
            </p>
          </div>
        )}
      </section>
    </main>
  );
}