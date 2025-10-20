import DashboardLayout from "../../components/DashboardLayout";

export default function DashboardCouple() {
  const user = { gender: "female" };

  return (
    <DashboardLayout title="داشبورد: متأهل بدون فرزند">
      {user.gender === "male" ? (
        <div>
          <h3 className="text-lg font-semibold text-yellow-700 mb-4">
            ارتباط و رشد مشترک برای آقایان 💬
          </h3>
          <ul className="list-disc pr-6 text-sm space-y-2">
            <li>تقویت ارتباط با همسر</li>
            <li>درک احساسات و گفت‌وگو آگاهانه</li>
            <li>برنامه‌ریزی آینده مشترک 💑</li>
          </ul>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold text-yellow-700 mb-4">
            ارتباط و رشد مشترک برای بانوان 💞
          </h3>
          <ul className="list-disc pr-6 text-sm space-y-2">
            <li>ارتباط مؤثر با همسر و حل تعارض</li>
            <li>سلامت روان، عشق و خودآگاهی</li>
            <li>مدیریت عاطفه و توازن زندگی شخصی</li>
          </ul>
        </div>
      )}
    </DashboardLayout>
  );
}
