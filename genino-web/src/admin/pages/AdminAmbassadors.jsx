import { useEffect, useState } from "react";



const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AdminAmbassadors() {
  const [filters, setFilters] = useState({
    code: "",
    firstName: "",
    lastName: "",
    nationalCode: "",
    city: "",
    mobile: "",
  });

  const [ambassadors, setAmbassadors] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
  const fetchAmbassadors = async () => {
    try {
      setLoading(true);
      setError("");

     const response = await fetch(
  `${BASE_URL}/ambassadors/admin/list`
);

      const data = await response.json();

      if (!data.ok) {
        throw new Error(data.message || "خطا در دریافت لیست سفیران");
      }

      setAmbassadors(data.ambassadors || []);
    } catch (err) {
      console.error("FETCH_ADMIN_AMBASSADORS_ERROR:", err);
      setError("خطا در دریافت اطلاعات سفیران");
    } finally {
      setLoading(false);
    }
  };

  fetchAmbassadors();
}, []);

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredAmbassadors = ambassadors.filter((item) =>
    Object.keys(filters).every((key) =>
      String(item[key]).includes(filters[key])
    )
  );

  return (
    <div className="min-h-screen bg-stone-100 px-4 py-8 text-right" dir="rtl">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-stone-800">
            مدیریت سفیران ژنینو
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            مشاهده، جستجو و مدیریت اطلاعات سفیران ثبت‌شده در ژنینو
          </p>
        </div>

        {loading && (
  <div className="mb-4 rounded-xl bg-white p-4 text-sm text-stone-500">
    در حال دریافت اطلاعات سفیران...
  </div>
)}

{error && (
  <div className="mb-4 rounded-xl bg-red-50 p-4 text-sm text-red-600">
    {error}
  </div>
)}

        <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-stone-50 text-stone-700">
              <tr>
                <th className="px-4 py-3">کد سفیر</th>
                <th className="px-4 py-3">نام سفیر</th>
                <th className="px-4 py-3">نام خانوادگی</th>
                <th className="px-4 py-3">کد ملی</th>
                <th className="px-4 py-3">شهر</th>
                <th className="px-4 py-3">شماره موبایل</th>
              </tr>

              <tr className="border-t border-stone-200 bg-white">
                {[
                  ["code", "فیلتر کد"],
                  ["firstName", "فیلتر نام"],
                  ["lastName", "فیلتر نام خانوادگی"],
                  ["nationalCode", "فیلتر کد ملی"],
                  ["city", "فیلتر شهر"],
                  ["mobile", "فیلتر موبایل"],
                ].map(([key, placeholder]) => (
                  <th key={key} className="px-3 py-3">
                    <input
                      value={filters[key]}
                      onChange={(e) => handleChange(key, e.target.value)}
                      placeholder={placeholder}
                      className="w-full rounded-xl border border-stone-200 px-3 py-2 text-xs outline-none focus:border-amber-500"
                    />
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredAmbassadors.map((ambassador) => (
                <tr
                  key={ambassador.code}
                  className="border-t border-stone-100 hover:bg-amber-50/40"
                >
                  <td className="px-4 py-4 font-medium text-stone-700">
                    {ambassador.code}
                  </td>
                  <td className="px-4 py-4">{ambassador.firstName}</td>
                  <td className="px-4 py-4">{ambassador.lastName}</td>
                  <td className="px-4 py-4">{ambassador.nationalCode}</td>
                  <td className="px-4 py-4">{ambassador.city}</td>
                  <td className="px-4 py-4">{ambassador.mobile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}