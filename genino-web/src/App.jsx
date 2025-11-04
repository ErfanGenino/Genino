// src/App.jsx
import { Routes, Route } from "react-router-dom";

// اگر این فایل‌ها در ریشه‌ی src هستند (طبق اسکرین‌شات تو):
import Navbar from "./Navbar.jsx";
import AuthStart from "./AuthStart.jsx";
import Login from "./Login.jsx";
import SignupStart from "./SignupStart.jsx";
import SignupUser from "./SignupUser.jsx";
import SignupVendor from "./SignupVendor.jsx";
import Cart from "./pages/Cart.jsx";
import CalorieTracker from "./pages/CalorieTracker.jsx";
import WorldKnowledge from "./pages/WorldKnowledge";
import KnowledgeDetail from "./pages/KnowledgeDetail.jsx";
import MyChild from "./pages/MyChild.jsx";
import Feed from "./pages/social/Feed.jsx";
import Profile from "./pages/social/Profile.jsx";
import CreatePost from "./pages/social/CreatePost.jsx";
import FunAndPlay from "./pages/FunAndPlay.jsx";
import FamilyFinance from "./pages/FamilyFinance";
import MemoryAlbum from "./pages/MemoryAlbum";
import Events from "./pages/Events";
import DashboardSingle from "./pages/dashboard/DashboardSingle";
import DashboardCouple from "./pages/dashboard/DashboardCouple";
import DashboardPregnancy from "./pages/dashboard/DashboardPregnancy";
import DashboardParent from "./pages/dashboard/DashboardParent";
import MyDoctor from "./pages/MyDoctor";
import SingleWorld from "./pages/SingleWorld";
import MyCycle from "./pages/MyCycle";
import MyMenHealth from "./pages/MyMenHealth";
import MyWomenHealthTest from "./pages/MyWomenHealthTest";
import ChatRoom from "./pages/social/ChatRoom.jsx";
import ParentsBehavior from "./pages/knowledge/ParentsBehavior";
import FreePlayArticle from "./pages/articles/FreePlayArticle";
import BodyWomenArticle from "./pages/articles/BodyWomenArticle.jsx";
import BodyMenArticle from "./pages/articles/BodyMenArticle";
import ChildHealthCheck from "./pages/ChildHealthCheck/ChildHealthCheck";
import VisionCheck from "./pages/ChildHealthCheck/VisionCheck";
import HearingCheck from "./pages/ChildHealthCheck/HearingCheck";
import DentalCheck from "./pages/ChildHealthCheck/DentalCheck";
import DigestionCheck from "./pages/ChildHealthCheck/DigestionCheck";
import MovementCheck from "./pages/ChildHealthCheck/MovementCheck";
import EmotionsCheck from "./pages/ChildHealthCheck/EmotionsCheck";
import FocusCheck from "./pages/ChildHealthCheck/FocusCheck";
import SocialCheck from "./pages/ChildHealthCheck/SocialCheck";
import BodyMetricsCheck from "./pages/ChildHealthCheck/BodyMetricsCheck";
import VisionReport from "./pages/ChildHealthCheck/VisionReport";



// 🧭 دو گزینه برای داشبوردها: اگر فایل‌های داشبورد آماده‌اند از این‌ها استفاده کن:
import Shop from "./pages/Shop.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import ChildProfile from "./pages/ChildProfile";


// ✅ اگر هنوز داشبوردها را نساختی، موقتاً می‌تونی از سایدبارها استفاده کنی:
// import SidebarUser from "./components/SidebarUser.jsx";
// import SidebarVendor from "./components/SidebarVendor.jsx";

export default function App() {
  return (
    <>
      {/* نوار ناوبری بالای همه‌ی صفحات */}
      <Navbar />

      {/* مسیرها */}
      <Routes>
        {/* صفحه خانه: همون AuthStart که گفتی نقش Home رو داره */}
        <Route path="/" element={<AuthStart />} />

        {/* احراز هویت و ثبت‌نام */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupStart />} />
        <Route path="/signup-user" element={<SignupUser />} />
        <Route path="/signup-vendor" element={<SignupVendor />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/calorie-tracker" element={<CalorieTracker />} />
        <Route path="/world-knowledge" element={<WorldKnowledge />} />
        <Route path="/knowledge/:slug" element={<KnowledgeDetail />} />
        <Route path="/mychild" element={<MyChild />} />
        <Route path="/social" element={<Feed />} />
        <Route path="/social/profile" element={<Profile />} />
        <Route path="/social/create" element={<CreatePost />} />
        <Route path="/fun" element={<FunAndPlay />} />
        <Route path="/child-profile" element={<ChildProfile />} />
        <Route path="/family-finance" element={<FamilyFinance />} />
        <Route path="/memory-album" element={<MemoryAlbum />} />
        <Route path="/events" element={<Events />} />
        <Route path="/dashboard-single" element={<DashboardSingle />} />
        <Route path="/dashboard-couple" element={<DashboardCouple />} />
        <Route path="/dashboard-pregnancy" element={<DashboardPregnancy />} />
        <Route path="/dashboard-parent" element={<DashboardParent />} />
        <Route path="/my-doctor" element={<MyDoctor />} />
        <Route path="/single-world" element={<SingleWorld />} />
        <Route path="/my-cycle" element={<MyCycle />} />
        <Route path="/my-men-health" element={<MyMenHealth />} />
        <Route path="/my-women-health-test" element={<MyWomenHealthTest />} />
        <Route path="/social/room/:id" element={<ChatRoom />} />
        <Route path="/knowledge/parents-behavior" element={<ParentsBehavior />} />
        <Route path="/articles/freeplay" element={<FreePlayArticle />} />
        <Route path="/articles/body-women" element={<BodyWomenArticle />} />
        <Route path="/articles/body-men" element={<BodyMenArticle />} />
        <Route path="/child-health-check" element={<ChildHealthCheck />} />
        <Route path="/child-health-check/vision" element={<VisionCheck />} />
        <Route path="/child-health-check/hearing" element={<HearingCheck />} />
        <Route path="/child-health-check/dental" element={<DentalCheck />} />
        <Route path="/child-health-check/digestion" element={<DigestionCheck />} />
        <Route path="/child-health-check/movement" element={<MovementCheck />} />
        <Route path="/child-health-check/emotions" element={<EmotionsCheck />} />
        <Route path="/child-health-check/focus" element={<FocusCheck />} />
        <Route path="/child-health-check/social" element={<SocialCheck />} />
        <Route path="/child-health-check/bodymetrics" element={<BodyMetricsCheck />} />
        <Route path="/child-health-check/vision-report" element={<VisionReport />} />
      </Routes>
    </>
  );
}
{/* <Navbar /> */}
// test redeploy
