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

// 🧭 دو گزینه برای داشبوردها: اگر فایل‌های داشبورد آماده‌اند از این‌ها استفاده کن:
import UserDashboard from "./pages/dashboard/UserDashboard.jsx";
import VendorDashboard from "./pages/dashboard/VendorDashboard.jsx";
import Shop from "./pages/Shop.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import ChildAssessment from "./pages/ChildAssessment";


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
        {/* صفحات جزئیات دانستنی‌ها */}
        <Route path="/knowledge/:slug" element={<KnowledgeDetail />} />
        <Route path="/my-child" element={<MyChild />} />
        <Route path="/child-assessment" element={<ChildAssessment />} />
        <Route path="/social" element={<Feed />} />
        <Route path="/social/profile" element={<Profile />} />
        <Route path="/social/create" element={<CreatePost />} />
        <Route path="/fun" element={<FunAndPlay />} />


        {/* داشبوردها */}
        <Route path="/dashboard-user" element={<UserDashboard /* یا <SidebarUser /> */ />} />
        <Route path="/dashboard-vendor" element={<VendorDashboard /* یا <SidebarVendor /> */ />} />
      </Routes>
    </>
  );
}
