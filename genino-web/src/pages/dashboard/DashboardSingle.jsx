import DashboardLayout from "../../components/DashboardLayout";

export default function DashboardSingle() {
  const user = { gender: "male" }; // در آینده از دیتابیس

  return (
    <DashboardLayout title="داشبورد: مجرد">
      {user.gender === "male" ? (
        <div>
          <h3 className="text-lg font-semibold text-yellow-700 mb-4">
            مسیر رشد فردی آقایان 👨
          </h3>
          <ul className="list-disc pr-6 text-sm space-y-2">
            <li>مراقبت از بدن و سلامت پروستات</li>
            <li>مدیریت استرس و انگیزه شغلی</li>
            <li>مطالب هیجان‌انگیز دنیای خودروها 🚗</li>
          </ul>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold text-yellow-700 mb-4">
            مسیر رشد فردی بانوان 👩
          </h3>
          <ul className="list-disc pr-6 text-sm space-y-2">
            <li>مراقبت از پوست و بدن</li>
            <li>سلامت و عادت ماهانه</li>
            <li>زیبایی، مدل مو و سبک زندگی 💄</li>
          </ul>
        </div>
      )}
    </DashboardLayout>
  );
}
