import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  searchVendorChildren,
  getVendorChildren,
  addVendorChild,
  removeVendorChild,
} from "../../../../services/api";

import {
  GraduationCap,
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
      ?.join("، ") || "";

  return {
    ...child,
    parentNames: parents,
  };
}


export default function EducationClassChildrenSection({
  selectedChildren = [],
  onChange,
  onGiveAchievement,
}) {

  const [
    activeTab,
    setActiveTab,
  ] = useState("education");

  const [
    allChildren,
    setAllChildren,
  ] = useState([]);

  const [
    educationChildren,
    setEducationChildren,
  ] = useState(
    selectedChildren
  );

  const [
    query,
    setQuery,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);


  useEffect(() => {
    setEducationChildren(
      selectedChildren
    );
  }, [selectedChildren]);


  // =========================================
  // همه کودکان ژنینویی
  // =========================================

  useEffect(() => {

    if (
      activeTab !== "all"
    ) {
      return;
    }

    async function loadChildren() {
      try {

        setLoading(true);

        const res =
          await searchVendorChildren(
            ""
          );

        if (res?.ok) {
          setAllChildren(
            (res.children || [])
              .map(
                normalizeChild
              )
          );
        }

      } catch (error) {

        console.error(
          "LOAD EDUCATION CLASS ALL CHILDREN ERROR:",
          error
        );

      } finally {

        setLoading(false);

      }
    }

    loadChildren();

  }, [activeTab]);


  // =========================================
  // هنرجویان همین مرکز
  // =========================================

  useEffect(() => {

    async function loadEducationChildren() {
      try {

        const res =
          await getVendorChildren();

        if (res?.ok) {

          const children =
            (res.children || [])
              .filter(
                (item) =>
                  item.relationType ===
                  "EDUCATION_CLASS_CHILD"
              )
              .map(
                (item) =>
                  normalizeChild(
                    item.child
                  )
              );

          setEducationChildren(
            children
          );

          onChange?.(
            children
          );
        }

      } catch (error) {

        console.error(
          "LOAD EDUCATION CLASS CHILDREN ERROR:",
          error
        );

      }
    }

    loadEducationChildren();

  }, []);


  const filteredChildren =
    useMemo(() => {

      if (!query.trim()) {
        return allChildren;
      }

      return allChildren.filter(
        (child) =>
          child.fullName
            ?.includes(
              query
            )
      );

    }, [
      query,
      allChildren,
    ]);


  const displayList =
    activeTab === "education"
      ? educationChildren
      : filteredChildren;


  async function toggleChild(
    child
  ) {

    const exists =
      educationChildren.some(
        (item) =>
          item.id === child.id
      );

    try {

      // حذف هنرجو
      if (exists) {

        const res =
          await removeVendorChild(
            child.id
          );

        if (res?.ok) {

          const updated =
            educationChildren.filter(
              (item) =>
                item.id !==
                child.id
            );

          setEducationChildren(
            updated
          );

          onChange?.(
            updated
          );
        }

        return;
      }


      // افزودن هنرجو
      const res =
        await addVendorChild(
          child.id,
          "EDUCATION_CLASS_CHILD"
        );

      if (res?.ok) {

        const updated = [
          ...educationChildren,
          child,
        ];

        setEducationChildren(
          updated
        );

        onChange?.(
          updated
        );
      }

    } catch (error) {

      console.error(
        "TOGGLE EDUCATION CLASS CHILD ERROR:",
        error
      );

    }
  }


  return (
    <section
      className="
        rounded-3xl
        bg-indigo-50
        p-4
      "
    >

      <div
        className="
          mb-4
          flex
          overflow-hidden
          rounded-2xl
          bg-white
          p-1
          shadow-sm
        "
      >

        <button
          type="button"
          onClick={() =>
            setActiveTab(
              "education"
            )
          }
          className={`
            flex-1
            rounded-xl
            px-3
            py-2.5
            text-xs
            font-black
            transition

            ${
              activeTab ===
              "education"
                ? "bg-[#6d5bb3] text-white"
                : "text-gray-500"
            }
          `}
        >
          هنرجویان این مرکز
        </button>


        <button
          type="button"
          onClick={() =>
            setActiveTab("all")
          }
          className={`
            flex-1
            rounded-xl
            px-3
            py-2.5
            text-xs
            font-black
            transition

            ${
              activeTab === "all"
                ? "bg-[#6d5bb3] text-white"
                : "text-gray-500"
            }
          `}
        >
          همه کودکان ژنینویی
        </button>

      </div>


      {activeTab === "all" && (

        <div
          className="
            mb-4
            flex
            items-center
            gap-2
            rounded-xl
            bg-white
            px-3
          "
        >

          <Search
            size={17}
            className="
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
            placeholder="جستجوی نام کودک..."
            className="
              h-11
              flex-1
              bg-transparent
              text-sm
              outline-none
            "
          />

        </div>

      )}


      {loading ? (

        <p
          className="
            py-8
            text-center
            text-sm
            font-bold
            text-gray-400
          "
        >
          در حال دریافت کودکان...
        </p>

      ) : displayList.length ===
          0 ? (

        <p
          className="
            py-8
            text-center
            text-sm
            text-gray-400
          "
        >
          {activeTab ===
          "education"
            ? "هنوز هنرجویی به این مرکز متصل نشده است."
            : "کودکی پیدا نشد."}
        </p>

      ) : (

        <div
          className="
            space-y-2
          "
        >

          {displayList.map(
            (child) => {

              const exists =
                educationChildren.some(
                  (item) =>
                    item.id ===
                    child.id
                );

              return (

                <div
                  key={child.id}
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                    rounded-2xl
                    bg-white
                    p-3
                    shadow-sm
                  "
                >

                  <div
                    className="
                      flex
                      min-w-0
                      items-center
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
                        overflow-hidden
                        rounded-full
                        bg-indigo-100
                      "
                    >

                      {child.photo ? (

                        <img
                          src={
                            child.photo
                          }
                          alt={
                            child.fullName
                          }
                          className="
                            h-full
                            w-full
                            object-cover
                          "
                        />

                      ) : (

                        <GraduationCap
                          size={20}
                          className="
                            text-indigo-500
                          "
                        />

                      )}

                    </div>


                    <div
                      className="
                        min-w-0
                      "
                    >

                      <p
                        className="
                          truncate
                          text-sm
                          font-black
                          text-gray-700
                        "
                      >
                        {
                          child.fullName
                        }
                      </p>

                      {child.parentNames && (

                        <p
                          className="
                            mt-1
                            truncate
                            text-[10px]
                            text-gray-400
                          "
                        >
                          والدین:
                          {" "}
                          {
                            child.parentNames
                          }
                        </p>

                      )}

                    </div>

                  </div>


                  <div
                    className="
                      flex
                      shrink-0
                      gap-2
                    "
                  >

                    {activeTab ===
                      "education" &&
                      onGiveAchievement && (

                      <button
                        type="button"
                        onClick={() =>
                          onGiveAchievement(
                            child
                          )
                        }
                        className="
                          flex
                          items-center
                          gap-1
                          rounded-xl
                          bg-yellow-100
                          px-3
                          py-2
                          text-[11px]
                          font-black
                          text-[#6f4a18]
                        "
                      >
                        <Award
                          size={14}
                        />
                        دستاورد
                      </button>

                    )}


                    <button
                      type="button"
                      onClick={() =>
                        toggleChild(
                          child
                        )
                      }
                      className={`
                        flex
                        items-center
                        gap-1
                        rounded-xl
                        px-3
                        py-2
                        text-[11px]
                        font-black

                        ${
                          exists
                            ? "bg-red-50 text-red-600"
                            : "bg-green-50 text-green-700"
                        }
                      `}
                    >

                      {exists ? (
                        "حذف"
                      ) : (
                        <>
                          <Check
                            size={14}
                          />
                          افزودن
                        </>
                      )}

                    </button>

                  </div>

                </div>

              );
            }
          )}

        </div>

      )}

    </section>
  );
}