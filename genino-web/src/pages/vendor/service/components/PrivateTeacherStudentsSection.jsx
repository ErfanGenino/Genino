import { useEffect, useMemo, useState } from "react";

import {
  searchVendorChildren,
  getVendorChildren,
  addVendorChild,
  removeVendorChild,
} from "../../../../services/api";

import {
  Baby,
  Check,
  Search,
  Award,
} from "lucide-react";


function normalizeChild(child) {
  const parents =
    child.admins
      ?.filter(
        (a) =>
          a.role === "father" ||
          a.role === "mother"
      )
      ?.map(
        (a) =>
          `${a.user.firstName} ${a.user.lastName}`
      )
      .join("، ") || "";

  return {
    ...child,
    parentNames: parents,
  };
}


export default function PrivateTeacherStudentsSection({
  selectedStudents = [],
  onChange,
  onGiveAchievement,
}) {
  const [activeTab, setActiveTab] =
    useState("privateTeacher");

  const [allChildren, setAllChildren] =
    useState([]);

  const [privateStudents, setPrivateStudents] =
    useState(selectedStudents);

  const [query, setQuery] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  useEffect(() => {
    setPrivateStudents(selectedStudents);
  }, [selectedStudents]);


  // همه کودکان ژنینویی
  useEffect(() => {
    if (activeTab !== "all") {
      return;
    }

    async function loadChildren() {
      try {
        setLoading(true);

        const res =
          await searchVendorChildren("");

        if (res?.ok) {
          setAllChildren(
            (res.children || [])
              .map(normalizeChild)
          );
        }
      } catch (error) {
        console.error(
          "LOAD GENINO CHILDREN ERROR",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadChildren();
  }, [activeTab]);


  // دانش‌آموزان این معلم
  useEffect(() => {
    async function loadPrivateStudents() {
      try {
        const res =
          await getVendorChildren();

        if (res?.ok) {
          const students =
            (res.children || [])
              .filter(
                (item) =>
                  item.relationType ===
                  "PRIVATE_STUDENT"
              )
              .map(
                (item) =>
                  normalizeChild(
                    item.child
                  )
              );

          setPrivateStudents(
            students
          );

          onChange?.(
            students
          );
        }
      } catch (error) {
        console.error(
          "LOAD PRIVATE TEACHER STUDENTS ERROR",
          error
        );
      }
    }

    loadPrivateStudents();
  }, []);


  const filteredChildren =
    useMemo(() => {
      if (!query.trim()) {
        return allChildren;
      }

      return allChildren.filter(
        (child) =>
          child.fullName
            ?.includes(query)
      );
    }, [
      query,
      allChildren,
    ]);


  const displayList =
    activeTab === "privateTeacher"
      ? privateStudents
      : filteredChildren;


  async function toggleChild(child) {
    const exists =
      privateStudents.some(
        (item) =>
          item.id === child.id
      );

    try {
      // حذف دانش‌آموز
      if (exists) {
        const res =
          await removeVendorChild(
            child.id
          );

        if (res?.ok) {
          const updated =
            privateStudents.filter(
              (item) =>
                item.id !== child.id
            );

          setPrivateStudents(
            updated
          );

          onChange?.(
            updated
          );
        }

        return;
      }

      // افزودن دانش‌آموز
      const res =
        await addVendorChild(
          child.id,
          "PRIVATE_STUDENT"
        );

      if (res?.ok) {
        const updated = [
          ...privateStudents,
          child,
        ];

        setPrivateStudents(
          updated
        );

        onChange?.(
          updated
        );
      }
    } catch (error) {
      console.error(
        "TOGGLE PRIVATE TEACHER STUDENT ERROR",
        error
      );
    }
  }


  return (
    <section
      className="
        rounded-3xl
        bg-yellow-50
        p-4
      "
    >
      <h3
        className="
          mb-4
          font-black
          text-[#6f4a18]
        "
      >
        انتخاب دانش‌آموزان معلم خصوصی
      </h3>


      <div
        className="
          mb-4
          grid
          grid-cols-2
          gap-2
          rounded-2xl
          bg-white
          p-1
        "
      >
        <button
          type="button"
          onClick={() =>
            setActiveTab(
              "privateTeacher"
            )
          }
          className={`
            rounded-xl
            py-2
            text-xs
            font-black

            ${
              activeTab ===
              "privateTeacher"
                ? "bg-yellow-100 text-yellow-800"
                : "text-gray-400"
            }
          `}
        >
          دانش‌آموزان این معلم
        </button>


        <button
          type="button"
          onClick={() =>
            setActiveTab("all")
          }
          className={`
            rounded-xl
            py-2
            text-xs
            font-black

            ${
              activeTab === "all"
                ? "bg-yellow-100 text-yellow-800"
                : "text-gray-400"
            }
          `}
        >
          همه کودکان ژنینویی
        </button>
      </div>


      <div
        className="
          relative
          mb-4
        "
      >
        <Search
          className="
            absolute
            right-3
            top-1/2
            h-4
            w-4
            -translate-y-1/2
            text-gray-400
          "
        />

        <input
          value={query}
          onChange={(e) =>
            setQuery(
              e.target.value
            )
          }
          placeholder="جستجوی کودک ژنینویی"
          className="
            h-10
            w-full
            rounded-xl
            border
            bg-white
            px-3
            pr-10
            text-sm
          "
        />
      </div>


      {loading && (
        <p
          className="
            text-center
            text-xs
            text-gray-400
          "
        >
          در حال دریافت اطلاعات...
        </p>
      )}


      <div
        className="
          max-h-[450px]
          space-y-2
          overflow-y-auto
        "
      >
        {displayList.map(
          (child) => {
            const checked =
              privateStudents.some(
                (item) =>
                  item.id === child.id
              );

            return (
              <div
                key={child.id}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-2xl
                  border
                  border-yellow-100
                  bg-white
                  p-3
                  shadow-sm
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    toggleChild(
                      child
                    )
                  }
                  className={`
                    flex
                    h-6
                    w-6
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    border

                    ${
                      checked
                        ? "border-green-600 bg-green-600 text-white"
                        : "border-gray-300 bg-white"
                    }
                  `}
                >
                  {checked && (
                    <Check className="h-4 w-4" />
                  )}
                </button>


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
                    border
                    border-yellow-100
                    bg-yellow-100
                  "
                >
                  {child.photo ? (
                    <img
                      src={child.photo}
                      alt={
                        child.fullName ||
                        "دانش‌آموز"
                      }
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />
                  ) : (
                    <Baby
                      className="
                        h-6
                        w-6
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
                    {child.fullName}
                  </p>

                  <p
                    className="
                      mt-1
                      line-clamp-2
                      text-[10px]
                      leading-5
                      text-gray-500
                      sm:text-[11px]
                    "
                  >
                    والدین:{" "}
                    {child.parentNames ||
                      "ثبت نشده"}
                  </p>
                </div>


                {activeTab ===
                  "privateTeacher" && (
                  <button
                    type="button"
                    onClick={() =>
                      onGiveAchievement?.(
                        child
                      )
                    }
                    className="
                      flex
                      shrink-0
                      items-center
                      gap-1
                      rounded-xl
                      border
                      border-[#d4af37]
                      bg-gradient-to-l
                      from-[#fff3bd]
                      via-[#f1d36b]
                      to-[#d4af37]
                      px-2
                      py-2.5
                      text-[9px]
                      font-black
                      text-[#6f4a18]
                      shadow
                      sm:px-4
                      sm:text-xs
                    "
                  >
                    <Award className="h-4 w-4" />

                    اهدای دستاورد
                  </button>
                )}
              </div>
            );
          }
        )}
      </div>


      <div
        className="
          mt-4
          rounded-xl
          bg-white
          p-3
          text-center
          text-xs
          font-bold
          text-yellow-800
        "
      >
        تعداد دانش‌آموزان این معلم:{" "}
        {privateStudents.length} نفر
      </div>
    </section>
  );
}