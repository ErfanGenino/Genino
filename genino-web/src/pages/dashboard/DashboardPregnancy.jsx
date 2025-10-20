import DashboardLayout from "../../components/DashboardLayout";

export default function DashboardPregnancy() {
  const user = { gender: "female" };

  return (
    <DashboardLayout title="داشبورد: در آستانه فرزندآوری">
      {user.gender === "male" ? (
        <div>
          <h3 className="text-lg font-semibold text-yellow-700 mb-4">
            آمادگی پدر شدن 👨‍🍼
          </h3>
          <ul className="list-disc pr-6 text-sm space-y-2">
            <li>چگونه همسر خود را در دوران بارداری حمایت کنیم</li>
            <li>درک تغییرات جسمی و روحی همسر</li>
            <li>آمادگی ذهنی برای ورود به پدری 🌿</li>
          </ul>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold text-yellow-700 mb-4">
            مراقبت از خود در دوران بارداری 🤰
          </h3>
          <ul className="list-disc pr-6 text-sm space-y-2">
            <li>مراقبت از بدن و تغذیه دوران بارداری</li>
            <li>آرام‌سازی ذهن و تمرینات تنفسی</li>
            <li>آمادگی برای زایمان و والدگری 💛</li>
          </ul>
        </div>
      )}
    </DashboardLayout>
  );
}
