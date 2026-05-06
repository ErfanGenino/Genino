// src/App.jsx
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";



// اگر این فایل‌ها در ریشه‌ی src هستند (طبق اسکرین‌شات تو):
import Navbar from "./Navbar.jsx";
import AuthStart from "./AuthStart.jsx";
import Login from "./Login.jsx";
import SignupStart from "./SignupStart.jsx";
import SignupUser from "./SignupUser.jsx";
import SignupVendor from "./SignupVendor.jsx";
import Cart from "./pages/Cart.jsx";
import Feed from "./pages/social/Feed.jsx";
import Profile from "./pages/social/Profile.jsx";
import CreatePost from "./pages/social/CreatePost.jsx";
import ChatRoom from "./pages/social/ChatRoom.jsx";
import FreePlayArticle from "./pages/articles/FreePlayArticle";
import ChildHealthCheck from "./pages/ChildHealthCheck/ChildHealthCheck";
import MenGenitalSelfCheckArticle from "./pages/articles/MenGenitalSelfCheckArticle.jsx";
import LaserFocusArticle from "./pages/articles/LaserFocusArticle";
import GoldenGenesChildArticle from "./pages/articles/GoldenGenesChildArticle";
import BehavioralEpigeneticsArticle from "./pages/articles/BehavioralEpigeneticsArticle";
import ChildIntelligenceGenesArticle from "./pages/articles/ChildIntelligenceGenesArticle.jsx";
import UnconditionalLoveChildArticle from "./pages/articles/UnconditionalLoveChildArticle.jsx";
import ParentingBehaviorAtHomeArticle from "@pages/articles/ParentingBehaviorAtHomeArticle";
import ChildAnxietyAndFearManagementArticle from "@pages/articles/ChildAnxietyAndFearManagementArticle";
import SmartEncouragementArticle from "@pages/articles/SmartEncouragementArticle";
import MutualRespectArticle from "@pages/articles/MutualRespectArticle";
import FatherEmotionalRoleArticle from "@pages/articles/FatherEmotionalRoleArticle";
import ParentAngerManagementArticle from "@pages/articles/ParentAngerManagementArticle";
import ChildTrustArticle from "@pages/articles/ChildTrustArticle";
import QualityTimeArticle from "@pages/articles/QualityTimeArticle";
import PrePregnancyCheckupsArticle from "@pages/articles/pre-pregnancy/PrePregnancyCheckupsArticle";
import PrePregnancyVitaminsArticle from "@pages/articles/pre-pregnancy/PrePregnancyVitaminsArticle";
import EggSpermQualityArticle from "@pages/articles/pre-pregnancy/EggSpermQualityArticle";
import PrePregnancyEpigeneticsArticle from "@pages/articles/pre-pregnancy/PrePregnancyEpigeneticsArticle";
import PrePregnancyStressManagementArticle from "@pages/articles/pre-pregnancy/PrePregnancyStressManagementArticle";
import PrePregnancyBodyWeightArticle from "@pages/articles/pre-pregnancy/PrePregnancyBodyWeightArticle";
import PrePregnancyToxinsArticle from "@pages/articles/pre-pregnancy/PrePregnancyToxinsArticle";
import PrePregnancyParentalAgeArticle from "@pages/articles/pre-pregnancy/PrePregnancyParentalAgeArticle";
import PrePregnancyOvulationCycleArticle from "@pages/articles/pre-pregnancy/PrePregnancyOvulationCycleArticle";
import PrePregnancyMaleSexualHealthArticle from "@pages/articles/pre-pregnancy/PrePregnancyMaleSexualHealthArticle";
import PrePregnancySleepAndFertilityArticle from "@pages/articles/pre-pregnancy/PrePregnancySleepAndFertilityArticle";
import PrePregnancyMedicationsArticle from "@pages/articles/pre-pregnancy/PrePregnancyMedicationsArticle";
import PositiveGenesArticle from "@pages/articles/genetic-secrets/PositiveGenesArticle";
import GeneEditingFutureArticle from "@pages/articles/genetic-secrets/GeneEditingFutureArticle";
import InheritanceAndGoodnessArticle from "@pages/articles/genetic-secrets/InheritanceAndGoodnessArticle";
import HumanDiversitySecretsArticle from "@pages/articles/genetic-secrets/HumanDiversitySecretsArticle";
import DNAToEmotionArticle from "@pages/articles/genetic-secrets/DNAToEmotionArticle";
import GenesAndBeautyArticle from "@pages/articles/genetic-secrets/GenesAndBeautyArticle";
import GeneticMedicineFutureArticle from "@pages/articles/genetic-secrets/GeneticMedicineFutureArticle";
import DoGenesDefineDestinyArticle from "@pages/articles/genetic-secrets/DoGenesDefineDestinyArticle";
import EmotionalInheritanceArticle from "@pages/articles/genetic-secrets/EmotionalInheritanceArticle";
import ChildNutrition0to2Article from "@pages/articles/child-nutrition/ChildNutrition0to2Article";
import BrainBoostingFoodsArticle from "@pages/articles/child-nutrition/BrainBoostingFoodsArticle";
import ForbiddenFoodsUnder5Article from "@pages/articles/child-nutrition/ForbiddenFoodsUnder5Article";
import EssentialNutrientsForFocusArticle from "@pages/articles/child-nutrition/EssentialNutrientsForFocusArticle";
import ChildImmunityNutritionArticle from "@pages/articles/child-nutrition/ChildImmunityNutritionArticle";
import HealthyPlateForKidsArticle from "@pages/articles/child-nutrition/HealthyPlateForKidsArticle";
import EssentialVitaminsForKidsArticle from "@pages/articles/child-nutrition/EssentialVitaminsForKidsArticle";
import ChildObesityPreventionArticle from "@pages/articles/child-nutrition/ChildObesityPreventionArticle";
import ChildPickyEatingArticle from "@pages/articles/child-nutrition/ChildPickyEatingArticle";
import SleepAndNutritionImpactArticle from "@pages/articles/child-nutrition/SleepAndNutritionImpactArticle";
import ProteinRoleInChildGrowthArticle from "@pages/articles/child-nutrition/ProteinRoleInChildGrowthArticle";
import FiveGoldenRulesNutritionArticle from "@pages/articles/child-nutrition/FiveGoldenRulesNutritionArticle";
import MutualRespectInMarriageArticle from "@pages/articles/family-relations/MutualRespectInMarriageArticle";
import HealthyFamilyCommunicationArticle from "@pages/articles/family-relations/HealthyFamilyCommunicationArticle";
import EmotionalNeedsUnderstandingArticle from "@pages/articles/family-relations/EmotionalNeedsUnderstandingArticle";
import ResolvingMinorConflictsArticle from "@pages/articles/family-relations/ResolvingMinorConflictsArticle";
import RoleOfTrustInEmotionalSecurityArticle from "@pages/articles/family-relations/RoleOfTrustInEmotionalSecurityArticle";
import DailyAffectionAsRelationshipFuelArticle from "@pages/articles/family-relations/DailyAffectionAsRelationshipFuelArticle";
import RolesAndResponsibilitiesInModernFamilyArticle from "@pages/articles/family-relations/RolesAndResponsibilitiesInModernFamilyArticle";
import HowToProvideEmotionalSupportArticle from "@pages/articles/family-relations/HowToProvideEmotionalSupportArticle";
import BehavioralRedFlagsArticle from "@pages/articles/family-relations/BehavioralRedFlagsArticle";
import AngerManagementInRelationshipsArticle from "@pages/articles/family-relations/AngerManagementInRelationshipsArticle";
import HowParentalRelationshipAffectsChildDevelopmentArticle from "@pages/articles/family-relations/HowParentalRelationshipAffectsChildDevelopmentArticle";
import CommonRelationshipMistakesCouplesShouldAvoidArticle from "@pages/articles/family-relations/CommonRelationshipMistakesCouplesShouldAvoidArticle";
import EssentialCareForChildren0To3Article from "@pages/articles/child-care/EssentialCareForChildren0To3Article";
import CognitiveDevelopmentFromBirthToEarlyYearsArticle from "@pages/articles/child-care/CognitiveDevelopmentFromBirthToEarlyYearsArticle";
import PlayTherapyAndChildBrainDevelopmentArticle from "@pages/articles/child-care/PlayTherapyAndChildBrainDevelopmentArticle";
import HealthyIndependenceInChildrenArticle from "@pages/articles/child-care/HealthyIndependenceInChildrenArticle";
import FactorsAffectingChildSenseOfSecurityArticle from "@pages/articles/child-care/FactorsAffectingChildSenseOfSecurityArticle";
import HowToHandleChildCryingArticle from "@pages/articles/child-care/HowToHandleChildCryingArticle";
import RoleOfRuleSettingInHealthyChildDevelopmentArticle from "@pages/articles/child-care/RoleOfRuleSettingInHealthyChildDevelopmentArticle";
import BestGamesForBrainAndCreativityDevelopmentArticle from "@pages/articles/child-care/BestGamesForBrainAndCreativityDevelopmentArticle";
import EyeContactAndEmotionalDevelopmentArticle from "@pages/articles/child-care/EyeContactAndEmotionalDevelopmentArticle";
import SignsOfDevelopmentalDelayInChildrenArticle from "@pages/articles/child-care/SignsOfDevelopmentalDelayInChildrenArticle";
import InfantReflexesAreTheyNormalArticle from "@pages/articles/child-care/InfantReflexesAreTheyNormalArticle";
import EffectiveAndIneffectivePraiseInChildrenArticle from "@pages/articles/child-care/EffectiveAndIneffectivePraiseInChildrenArticle";
import ProtectedRoute from "./components/ProtectedRoute";
import WhatIsMeditationArticle from "./pages/articles/mind-calm/WhatIsMeditationArticle";
import BreathingExercisesForDailyStressArticle from "./pages/articles/mind-calm/BreathingExercisesForDailyStressArticle";
import MeditationForBusyParentsArticle from "./pages/articles/mind-calm/MeditationForBusyParentsArticle";
import CalmingMindBeforeSleepArticle from "./pages/articles/mind-calm/CalmingMindBeforeSleepArticle";
import ParentalMentalCalmImpactOnChildGrowthArticle from "./pages/articles/mind-calm/ParentalMentalCalmImpactOnChildGrowthArticle";
import FiveMinuteHomeMeditationArticle from "./pages/articles/mind-calm/FiveMinuteHomeMeditationArticle";
import MindfulnessInDailyLifeArticle from "./pages/articles/mind-calm/MindfulnessInDailyLifeArticle";
import ReducingAnxietyWithSimpleMentalExercisesArticle from "./pages/articles/mind-calm/ReducingAnxietyWithSimpleMentalExercisesArticle";
import MentalCalmInCrisisArticle from "./pages/articles/mind-calm/MentalCalmInCrisisArticle";
import MeditationImpactOnFocusAndDecisionMakingArticle from "./pages/articles/mind-calm/MeditationImpactOnFocusAndDecisionMakingArticle";
import ManagingNegativeThoughtsWithMentalTrainingArticle from "./pages/articles/mind-calm/ManagingNegativeThoughtsWithMentalTrainingArticle";
import FiveSimpleExercisesForInstantCalmArticle from "./pages/articles/mind-calm/FiveSimpleExercisesForInstantCalmArticle";
import HomeWorkoutWithoutEquipmentArticle from "./pages/articles/home-workout/HomeWorkoutWithoutEquipmentArticle";
import DailySimpleWorkoutsForBusyParentsArticle from "./pages/articles/home-workout/DailySimpleWorkoutsForBusyParentsArticle";
import WorkoutsForRestartingArticle from "./pages/articles/home-workout/WorkoutsForRestartingArticle";
import ExercisesForLowerBackPainArticle from "./pages/articles/home-workout/ExercisesForLowerBackPainArticle";
import StretchingExercisesForMusclePainReliefArticle from "./pages/articles/home-workout/StretchingExercisesForMusclePainReliefArticle";
import FatBurningHomeWorkoutArticle from "./pages/articles/home-workout/FatBurningHomeWorkoutArticle";
import Notifications from "./pages/Notifications";
import AcceptInvite from "./pages/AcceptInvite";
import BalancedDietArticle from "./pages/articles/diets/BalancedDietArticle";
import MediterraneanDietArticle from "./pages/articles/diets/MediterraneanDietArticle";
import DashDietArticle from "./pages/articles/diets/DashDietArticle";
import VegetarianDietArticle from "./pages/articles/diets/VegetarianDietArticle";
import VeganDietArticle from "./pages/articles/diets/VeganDietArticle";
import IntermittentFastingArticle from "./pages/articles/diets/IntermittentFastingArticle";
import WeightLossDietArticle from "./pages/articles/diets/WeightLossDietArticle";
import WeightGainDietArticle from "./pages/articles/diets/WeightGainDietArticle";
import FatLossDietArticle from "./pages/articles/diets/FatLossDietArticle";
import MuscleGainDietArticle from "./pages/articles/diets/MuscleGainDietArticle";
import WeightMaintenanceDietArticle from "./pages/articles/diets/WeightMaintenanceDietArticle";
import EnergyFocusNutritionArticle from "./pages/articles/diets/EnergyFocusNutritionArticle";
import DiabetesDietArticle from "./pages/articles/diets/DiabetesDietArticle";
import HypertensionDietArticle from "./pages/articles/diets/HypertensionDietArticle";
import FattyLiverDietArticle from "./pages/articles/diets/FattyLiverDietArticle";
import LowSaltDietArticle from "./pages/articles/diets/LowSaltDietArticle";
import GlutenFreeDietArticle from "./pages/articles/diets/GlutenFreeDietArticle";
import DigestiveHealthDietArticle from "./pages/articles/diets/DigestiveHealthDietArticle";
import ChildrenDietArticle from "./pages/articles/diets/ChildrenDietArticle";
import TeenagersDietArticle from "./pages/articles/diets/TeenagersDietArticle";
import BreastfeedingDietArticle from "./pages/articles/diets/BreastfeedingDietArticle";
import OlderAdultsDietArticle from "./pages/articles/diets/OlderAdultsDietArticle";
import ProductDetail from "./pages/ProductDetail.jsx";
import MusicPositiveEnergyHub from "./pages/single-world/MusicPositiveEnergyHub";
import MusicCategoryPage from "./pages/single-world/MusicCategoryPage";
import FromZeroToFirstSuccessArticle from "./pages/articles/entrepreneurs/FromZeroToFirstSuccessArticle";
import EntrepreneurMindsetArticle from "./pages/articles/entrepreneurs/EntrepreneurMindsetArticle";
import FailureOrBeginningArticle from "./pages/articles/entrepreneurs/FailureOrBeginningArticle";
import RiskManagementArticle from "./pages/articles/entrepreneurs/RiskManagementArticle";
import DecisionMakingArticle from "./pages/articles/entrepreneurs/DecisionMakingArticle";
import IdeaVsExecutionArticle from "./pages/articles/entrepreneurs/IdeaVsExecutionArticle";
import PersonalDisciplineArticle from "./pages/articles/entrepreneurs/PersonalDisciplineArticle";
import LateStartersArticle from "./pages/articles/entrepreneurs/LateStartersArticle";
import EmployeeToEntrepreneurArticle from "./pages/articles/entrepreneurs/EmployeeToEntrepreneurArticle";
import WorkLifeBalanceArticle from "./pages/articles/entrepreneurs/WorkLifeBalanceArticle";
import CommonMistakesArticle from "./pages/articles/entrepreneurs/CommonMistakesArticle";
import FiveGoldenPrinciplesArticle from "./pages/articles/entrepreneurs/FiveGoldenPrinciplesArticle";
import ScrollToTop from "./components/Core/ScrollToTop.jsx";


const Shop = lazy(() => import("./pages/Shop.jsx"));
const WorldKnowledge = lazy(() => import("./pages/WorldKnowledge"));
const KnowledgeDetail = lazy(() => import("./pages/KnowledgeDetail.jsx"));
const MyDoctor = lazy(() => import("./pages/MyDoctor"));
const FunAndPlay = lazy(() => import("./pages/FunAndPlay.jsx"));
const Events = lazy(() => import("./pages/Events"));
const MyMenHealth = lazy(() => import("./pages/MyMenHealth"));
const FamilyFinance = lazy(() => import("./pages/FamilyFinance"));
const MyCycle = lazy(() => import("./pages/MyCycle"));
const MyChild = lazy(() => import("./pages/MyChild.jsx"));
const CalorieTracker = lazy(() => import("./pages/CalorieTracker.jsx"));
const Inspiration = lazy(() => import("./pages/Inspiration.jsx"));
const MemoryAlbum = lazy(() => import("./pages/MemoryAlbum"));
const DashboardSingle = lazy(() => import("./pages/dashboard/DashboardSingle"));
const DashboardCouple = lazy(() => import("./pages/dashboard/DashboardCouple"));
const DashboardPregnancy = lazy(() => import("./pages/dashboard/DashboardPregnancy"));
const DashboardParent = lazy(() => import("./pages/dashboard/DashboardParent"));
const MyWomenHealthTest = lazy(() => import("./pages/MyWomenHealthTest"));
const DashboardUser = lazy(() => import("./pages/dashboard/DashboardUser"));
const SingleWorld = lazy(() => import("./pages/SingleWorld"));
const CoffeeBreakArticle = lazy(() => import("./pages/articles/CoffeeBreakArticle"));
const BooksThatChangeLifeArticle = lazy(() => import("./pages/articles/BooksThatChangeLifeArticle"));
const PersonalGrowthMasteryArticle = lazy(() => import("./pages/articles/PersonalGrowthMasteryArticle"));
const ChildProfile = lazy(() => import("./pages/ChildProfile"));
const BodyWomenArticle = lazy(() => import("./pages/articles/BodyWomenArticle.jsx"));
const BodyMenArticle = lazy(() => import("./pages/articles/BodyMenArticle"));
const WhatIsGene = lazy(() => import("./pages/articles/WhatIsGene.jsx"));
const WomenDietArticle = lazy(() => import("./pages/articles/diets/WomenDietArticle"));
const MenDietArticle = lazy(() => import("./pages/articles/diets/MenDietArticle"));
const PregnancyDietArticle = lazy(() => import("./pages/articles/diets/PregnancyDietArticle"));
const ParentsBehavior = lazy(() => import("./pages/knowledge/ParentsBehavior"));
const GeneticSecrets = lazy(() => import("./pages/knowledge/GeneticSecrets.jsx"));
const PrePregnancyKnowledge = lazy(() => import("./pages/knowledge/PrePregnancyKnowledge"));
const ChildNutritionKnowledge = lazy(() => import("./pages/knowledge/ChildNutritionKnowledge"));
const ChildCareKnowledge = lazy(() => import("./pages/knowledge/ChildCareKnowledge"));
const FamilyRelationsKnowledge = lazy(() => import("./pages/knowledge/FamilyRelationsKnowledge"));
const Terms = lazy(() => import("./pages/Terms"));
const MindCalmKnowledge = lazy(() => import("./pages/knowledge/MindCalmKnowledge"));
const HomeWorkoutKnowledge = lazy(() => import("./pages/knowledge/HomeWorkoutKnowledge"));
const SuccessfulEntrepreneursKnowledge = lazy(() => import("./pages/knowledge/SuccessfulEntrepreneursKnowledge"));
const VisionCheck = lazy(() => import("./pages/ChildHealthCheck/VisionCheck"));
const HearingCheck = lazy(() => import("./pages/ChildHealthCheck/HearingCheck"));
const DentalCheck = lazy(() => import("./pages/ChildHealthCheck/DentalCheck"));
const DigestionCheck = lazy(() => import("./pages/ChildHealthCheck/DigestionCheck"));
const MovementCheck = lazy(() => import("./pages/ChildHealthCheck/MovementCheck"));
const EmotionsCheck = lazy(() => import("./pages/ChildHealthCheck/EmotionsCheck"));
const FocusCheck = lazy(() => import("./pages/ChildHealthCheck/FocusCheck"));
const SocialCheck = lazy(() => import("./pages/ChildHealthCheck/SocialCheck"));
const BodyMetricsCheck = lazy(() => import("./pages/ChildHealthCheck/BodyMetricsCheck"));
const VisionReport = lazy(() => import("./pages/ChildHealthCheck/VisionReport"));
const EmotionRegulationTest = lazy(() => import("./pages/child-mental-health/EmotionRegulationTest"));
const AttentionFocusTest = lazy(() => import("./pages/child-mental-health/AttentionFocusTest"));
const SocialInteractionTest = lazy(() => import("./pages/child-mental-health/SocialInteractionTest"));
const GeneralReportsDashboard = lazy(() => import("./pages/Reports/GeneralReportsDashboard"));
const ChildHealthReports = lazy(() => import("./pages/Reports/ChildHealthReports"));
const FamilyHealthReports = lazy(() => import("./pages/Reports/FamilyHealthReports"));
const MenHealthReports = lazy(() => import("./pages/Reports/MenHealthReports"));
const WomenHealthReports = lazy(() => import("./pages/Reports/WomenHealthReports"));
const DailyInspirationArticle = lazy(() => import("./pages/articles/DailyInspirationArticle"));
const FitnessForSingleWorldArticle = lazy(() => import("./pages/articles/FitnessForSingleWorldArticle"));



// ✅ اگر هنوز داشبوردها را نساختی، موقتاً می‌تونی از سایدبارها استفاده کنی:
// import SidebarUser from "./components/SidebarUser.jsx";
// import SidebarVendor from "./components/SidebarVendor.jsx";

export default function App() {

console.log("APP ROUTES LOADED");
  return (
    <>
      {/* نوار ناوبری بالای همه‌ی صفحات */}
      <Navbar />

      <ScrollToTop />

      {/* مسیرها */}
      <Suspense fallback={<div className="p-4 text-right">در حال بارگذاری...</div>}>
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
        <Route path="/mychild" element={<ProtectedRoute> <MyChild /> </ProtectedRoute>} />
        <Route path="/social" element={<Feed />} />
        <Route path="/social/profile" element={<Profile />} />
        <Route path="/social/create" element={<CreatePost />} />
        <Route path="/fun" element={<FunAndPlay />} />
        <Route path="/child-profile" element={<ChildProfile />} />
        <Route path="/family-finance" element={<FamilyFinance />} />
        <Route path="/memory-album" element={<MemoryAlbum />} />
        <Route path="/events" element={<Events />} />
        <Route path="/dashboard-single" element={<ProtectedRoute> <DashboardSingle /> </ProtectedRoute>} />
        <Route path="/dashboard-couple" element={<ProtectedRoute> <DashboardCouple /> </ProtectedRoute>} />
        <Route path="/dashboard-pregnancy" element={<ProtectedRoute> <DashboardPregnancy /> </ProtectedRoute>} />
        <Route path="/dashboard-parent" element={<ProtectedRoute> <DashboardParent /> </ProtectedRoute>} />
        <Route path="/my-doctor" element={<MyDoctor />} />
        <Route path="/single-world" element={<SingleWorld />} />
        <Route path="/articles/coffee-break" element={<CoffeeBreakArticle />} />
        <Route path="/articles/books-that-change-life" element={<BooksThatChangeLifeArticle />} />
        <Route path="/articles/personal-growth-mastery" element={<PersonalGrowthMasteryArticle />} />
        <Route path="/articles/daily-inspiration" element={<DailyInspirationArticle />} />
        <Route path="/my-cycle" element={<ProtectedRoute><MyCycle /></ProtectedRoute>} />
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
        <Route path="/reports" element={<GeneralReportsDashboard />} />
        <Route path="/reports/child-health" element={<ChildHealthReports />} />
        <Route path="/reports/family-health" element={<FamilyHealthReports />} />
        <Route path="/reports/men-health" element={<MenHealthReports />} />
        <Route path="/reports/women-health" element={<WomenHealthReports />} />
        <Route path="/knowledge/genetic-secrets" element={<GeneticSecrets />} />
        <Route path="/articles/what-is-gene" element={<WhatIsGene />} />
        <Route path="/articles/men-genital-self-check" element={<MenGenitalSelfCheckArticle />} />
        <Route path="/articles/laser-focus" element={<LaserFocusArticle />} />
        <Route path="/articles/golden-child-genes" element={<GoldenGenesChildArticle />} />
        <Route path="/articles/behavioral-epigenetics" element={<BehavioralEpigeneticsArticle />} />
        <Route path="/articles/child-intelligence-genes" element={<ChildIntelligenceGenesArticle />} />
        <Route path="/articles/unconditional-love" element={<UnconditionalLoveChildArticle />} />
        <Route path="/articles/parenting-behavior-at-home" element={<ParentingBehaviorAtHomeArticle />} />
        <Route path="/articles/child-anxiety-and-fear-management" element={<ChildAnxietyAndFearManagementArticle />} />
        <Route path="/articles/smart-encouragement" element={<SmartEncouragementArticle />} />
        <Route path="/articles/mutual-respect" element={<MutualRespectArticle />} />
        <Route path="/articles/father-emotional-role" element={<FatherEmotionalRoleArticle />} />
        <Route path="/articles/parent-anger-management" element={<ParentAngerManagementArticle />} />
        <Route path="/articles/child-trust" element={<ChildTrustArticle />} />
        <Route path="/articles/quality-time" element={<QualityTimeArticle />} />
        <Route path="/knowledge/pre-pregnancy" element={<PrePregnancyKnowledge />} />
        <Route path="/articles/pre-pregnancy/checkups" element={<PrePregnancyCheckupsArticle />} />
        <Route path="/articles/pre-pregnancy/vitamins" element={<PrePregnancyVitaminsArticle />} />
        <Route path="/articles/pre-pregnancy/egg-sperm-quality" element={<EggSpermQualityArticle />} />
        <Route path="/articles/pre-pregnancy/epigenetics" element={<PrePregnancyEpigeneticsArticle />} />
        <Route path="/articles/pre-pregnancy/stress-management" element={<PrePregnancyStressManagementArticle />}/>
        <Route path="/articles/pre-pregnancy/body-weight" element={<PrePregnancyBodyWeightArticle />} />
        <Route path="/articles/pre-pregnancy/toxins" element={<PrePregnancyToxinsArticle />} />
        <Route path="/articles/pre-pregnancy/parental-age" element={<PrePregnancyParentalAgeArticle />} />
        <Route path="/articles/pre-pregnancy/ovulation-cycle" element={<PrePregnancyOvulationCycleArticle />} />
        <Route path="/articles/pre-pregnancy/male-sexual-health" element={<PrePregnancyMaleSexualHealthArticle />} />
        <Route path="/articles/pre-pregnancy/sleep-and-fertility" element={<PrePregnancySleepAndFertilityArticle />} />
        <Route path="/articles/pre-pregnancy/medications" element={<PrePregnancyMedicationsArticle />} />
        <Route path="/articles/genetic-secrets/positive-genes" element={<PositiveGenesArticle />} />
        <Route path="/articles/genetic-secrets/gene-editing-future" element={<GeneEditingFutureArticle />} />
        <Route path="/articles/genetic-secrets/inheritance-and-goodness" element={<InheritanceAndGoodnessArticle />} />
        <Route path="/articles/genetic-secrets/human-diversity-secrets" element={<HumanDiversitySecretsArticle />} />
        <Route path="/articles/genetic-secrets/dna-to-emotion" element={<DNAToEmotionArticle />} />
        <Route path="/articles/genetic-secrets/genes-and-beauty" element={<GenesAndBeautyArticle />} />
        <Route path="/articles/genetic-secrets/genetic-medicine-future" element={<GeneticMedicineFutureArticle />} />
        <Route path="/articles/genetic-secrets/do-genes-define-destiny" element={<DoGenesDefineDestinyArticle />} />
        <Route path="/articles/genetic-secrets/emotional-inheritance" element={<EmotionalInheritanceArticle />} />
        <Route path="/knowledge/child-nutrition" element={<ChildNutritionKnowledge />} />
        <Route path="/knowledge/child-care" element={<ChildCareKnowledge />} />
        <Route path="/knowledge/family-relations" element={<FamilyRelationsKnowledge />} />
        <Route path="/articles/child-nutrition/0-2" element={<ChildNutrition0to2Article />} />
        <Route path="/articles/child-nutrition/brain-boosting-foods" element={<BrainBoostingFoodsArticle />} />
        <Route path="/articles/child-nutrition/forbidden-under-5" element={<ForbiddenFoodsUnder5Article />} />
        <Route path="/articles/child-nutrition/essential-nutrients-for-focus" element={<EssentialNutrientsForFocusArticle />} />
        <Route path="/articles/child-nutrition/immunity" element={<ChildImmunityNutritionArticle />} />
        <Route path="/articles/child-nutrition/healthy-plate" element={<HealthyPlateForKidsArticle />} />
        <Route path="/articles/child-nutrition/essential-vitamins" element={<EssentialVitaminsForKidsArticle />} />
        <Route path="/articles/child-nutrition/child-obesity-prevention" element={<ChildObesityPreventionArticle />} />
        <Route path="/articles/child-nutrition/picky-eating" element={<ChildPickyEatingArticle />} />
        <Route path="/articles/child-nutrition/sleep-and-nutrition-impact" element={<SleepAndNutritionImpactArticle />} />
        <Route path="/articles/child-nutrition/protein-role-in-child-growth" element={<ProteinRoleInChildGrowthArticle />} />
        <Route path="/articles/child-nutrition/five-golden-rules" element={<FiveGoldenRulesNutritionArticle />} />
        <Route path="/articles/family-relations/mutual-respect-in-marriage" element={<MutualRespectInMarriageArticle />} />
        <Route path="/articles/family-relations/healthy-family-communication" element={<HealthyFamilyCommunicationArticle />} />
        <Route path="/articles/family-relations/emotional-needs-of-spouse" element={<EmotionalNeedsUnderstandingArticle />} />
        <Route path="/articles/family-relations/resolve-minor-conflicts" element={<ResolvingMinorConflictsArticle />} />
        <Route path="/articles/family-relations/role-of-trust-in-emotional-security" element={<RoleOfTrustInEmotionalSecurityArticle />} />
        <Route path="/articles/family-relations/daily-affection-as-relationship-fuel" element={<DailyAffectionAsRelationshipFuelArticle />} />
        <Route path="/articles/family-relations/roles-and-responsibilities-in-modern-family" element={<RolesAndResponsibilitiesInModernFamilyArticle />} />
        <Route path="/articles/family-relations/how-to-provide-emotional-support" element={<HowToProvideEmotionalSupportArticle />} />
        <Route path="/articles/family-relations/behavioral-red-flags" element={<BehavioralRedFlagsArticle />} />
        <Route path="/articles/family-relations/anger-management-in-relationships" element={<AngerManagementInRelationshipsArticle />} />
        <Route path="/articles/family-relations/how-parental-relationship-affects-child-development" element={<HowParentalRelationshipAffectsChildDevelopmentArticle />} />
        <Route path="/articles/family-relations/common-relationship-mistakes-couples-should-avoid" element={<CommonRelationshipMistakesCouplesShouldAvoidArticle />} />
        <Route path="/articles/child-care/essential-care-for-children-0-to-3" element={<EssentialCareForChildren0To3Article />} />
        <Route path="/articles/child-care/cognitive-development-from-birth-to-early-years" element={<CognitiveDevelopmentFromBirthToEarlyYearsArticle />} />
        <Route path="/articles/child-care/play-therapy-and-child-brain-development" element={<PlayTherapyAndChildBrainDevelopmentArticle />} />
        <Route path="/articles/child-care/healthy-independence-in-children" element={<HealthyIndependenceInChildrenArticle />} />
        <Route path="/articles/child-care/factors-affecting-child-sense-of-security" element={<FactorsAffectingChildSenseOfSecurityArticle />} />
        <Route path="/articles/child-care/how-to-handle-child-crying" element={<HowToHandleChildCryingArticle />} />
        <Route path="/articles/child-care/role-of-rule-setting-in-healthy-child-development" element={<RoleOfRuleSettingInHealthyChildDevelopmentArticle />} />
        <Route path="/articles/child-care/best-games-for-brain-and-creativity-development" element={<BestGamesForBrainAndCreativityDevelopmentArticle />} />
        <Route path="/articles/child-care/eye-contact-and-emotional-development" element={<EyeContactAndEmotionalDevelopmentArticle />} />
        <Route path="/articles/child-care/signs-of-developmental-delay-in-children" element={<SignsOfDevelopmentalDelayInChildrenArticle />} />
        <Route path="/articles/child-care/infant-reflexes-are-they-normal" element={<InfantReflexesAreTheyNormalArticle />} />
        <Route path="/articles/child-care/effective-and-ineffective-praise-in-children" element={<EffectiveAndIneffectivePraiseInChildrenArticle />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/dashboard-user" element={<ProtectedRoute> <DashboardUser /> </ProtectedRoute>} />
        <Route path="/knowledge/mind-calm" element={<MindCalmKnowledge />} />
        <Route path="/knowledge/home-workout" element={<HomeWorkoutKnowledge />} />
        <Route path="/knowledge/successful-entrepreneurs" element={<SuccessfulEntrepreneursKnowledge />} />
        <Route path="/articles/mind-calm/what-is-meditation" element={<WhatIsMeditationArticle />} />
        <Route path="/articles/mind-calm/breathing-exercises" element={<BreathingExercisesForDailyStressArticle />} />
        <Route path="/articles/mind-calm/meditation-for-busy-parents" element={<MeditationForBusyParentsArticle />} />
        <Route path="/articles/mind-calm/calming-before-sleep" element={<CalmingMindBeforeSleepArticle />} />
        <Route path="/articles/mind-calm/parental-calm-child-growth" element={<ParentalMentalCalmImpactOnChildGrowthArticle />} />
        <Route path="/articles/mind-calm/5-minute-meditation" element={<FiveMinuteHomeMeditationArticle />} />
        <Route path="/articles/mind-calm/mindfulness-daily-life" element={<MindfulnessInDailyLifeArticle />} />
        <Route path="/articles/mind-calm/reducing-anxiety" element={<ReducingAnxietyWithSimpleMentalExercisesArticle />} />
        <Route path="/articles/mind-calm/mental-calm-in-crisis" element={<MentalCalmInCrisisArticle />} />
        <Route path="/articles/mind-calm/meditation-focus-decision" element={<MeditationImpactOnFocusAndDecisionMakingArticle />} />
        <Route path="/articles/mind-calm/managing-negative-thoughts" element={<ManagingNegativeThoughtsWithMentalTrainingArticle />} />
        <Route path="/articles/mind-calm/instant-calm-exercises" element={<FiveSimpleExercisesForInstantCalmArticle />} />
        <Route path="/articles/home-workout/no-equipment" element={<HomeWorkoutWithoutEquipmentArticle />} />
        <Route path="/articles/home-workout/daily-workouts-for-busy-parents" element={<DailySimpleWorkoutsForBusyParentsArticle />} />
        <Route path="/articles/home-workout/restarting" element={<WorkoutsForRestartingArticle />} />
        <Route path="/articles/home-workout/back-pain" element={<ExercisesForLowerBackPainArticle />} />
        <Route path="/articles/home-workout/stretching-for-muscle-pain" element={<StretchingExercisesForMusclePainReliefArticle />} />
        <Route path="/articles/home-workout/fat-burning" element={<FatBurningHomeWorkoutArticle />} />
        <Route path="/child-mental-health/emotion-regulation" element={<EmotionRegulationTest />} />
        <Route path="/child-mental-health/attention-focus" element={<AttentionFocusTest />} />
        <Route path="/child-mental-health/social-interaction" element={<SocialInteractionTest />} />
        <Route path="/notifications" element={ <ProtectedRoute>  <Notifications /> </ProtectedRoute>} />
        <Route path="/invite/:token" element={<AcceptInvite />} />
        <Route path="/inspiration" element={<ProtectedRoute><Inspiration /></ProtectedRoute>} />
        <Route path="/diets/balanced-diet" element={<BalancedDietArticle />} />
        <Route path="/diets/mediterranean-diet" element={<MediterraneanDietArticle />} />
        <Route path="/diets/dash-diet" element={<DashDietArticle />} />
        <Route path="/diets/vegetarian-diet" element={<VegetarianDietArticle />} />
        <Route path="/diets/vegan-diet" element={<VeganDietArticle />} />
        <Route path="/diets/intermittent-fasting" element={<IntermittentFastingArticle />} />
        <Route path="/diets/weight-loss-diet" element={<WeightLossDietArticle />} />
        <Route path="/diets/weight-gain-diet" element={<WeightGainDietArticle />} />
        <Route path="/diets/fat-loss-diet" element={<FatLossDietArticle />} />
        <Route path="/diets/muscle-gain-diet" element={<MuscleGainDietArticle />} />
        <Route path="/diets/weight-maintenance-diet" element={<WeightMaintenanceDietArticle />} />
        <Route path="/diets/energy-focus-nutrition" element={<EnergyFocusNutritionArticle />} />
        <Route path="/diets/diabetes-diet" element={<DiabetesDietArticle />} />
        <Route path="/diets/hypertension-diet" element={<HypertensionDietArticle />} />
        <Route path="/diets/fatty-liver-diet" element={<FattyLiverDietArticle />} />
        <Route path="/diets/low-salt-diet" element={<LowSaltDietArticle />} />
        <Route path="/diets/gluten-free-diet" element={<GlutenFreeDietArticle />} />
        <Route path="/diets/digestive-health-diet" element={<DigestiveHealthDietArticle />} />
        <Route path="/diets/children-diet" element={<ChildrenDietArticle />} />
        <Route path="/diets/teenagers-diet" element={<TeenagersDietArticle />} />
        <Route path="/diets/women-diet" element={<WomenDietArticle />} />
        <Route path="/diets/men-diet" element={<MenDietArticle />} />
        <Route path="/diets/pregnancy-diet" element={<PregnancyDietArticle />} />
        <Route path="/diets/breastfeeding-diet" element={<BreastfeedingDietArticle />} />
        <Route path="/diets/older-adults-diet" element={<OlderAdultsDietArticle />} />
        <Route path="/articles/fitness-for-single-world" element={<FitnessForSingleWorldArticle />} />
        <Route path="/single-world/music" element={<MusicPositiveEnergyHub />} />
        <Route path="/single-world/music/:slug" element={<MusicCategoryPage />} />
        <Route path="/articles/entrepreneurs/from-zero-to-first-success" element={<FromZeroToFirstSuccessArticle />} />
        <Route path="/articles/entrepreneurs/entrepreneur-mindset" element={<EntrepreneurMindsetArticle />} />
        <Route path="/articles/entrepreneurs/failure-or-beginning" element={<FailureOrBeginningArticle />} />
        <Route path="/articles/entrepreneurs/risk-management" element={<RiskManagementArticle />} />
        <Route path="/articles/entrepreneurs/decision-making" element={<DecisionMakingArticle />} />
        <Route path="/articles/entrepreneurs/idea-vs-execution" element={<IdeaVsExecutionArticle />} />
        <Route path="/articles/entrepreneurs/personal-discipline" element={<PersonalDisciplineArticle />} />
        <Route path="/articles/entrepreneurs/late-starters" element={<LateStartersArticle />} />
        <Route path="/articles/entrepreneurs/employee-to-entrepreneur" element={<EmployeeToEntrepreneurArticle />} />
        <Route path="/articles/entrepreneurs/work-life-balance" element={<WorkLifeBalanceArticle />} />
        <Route path="/articles/entrepreneurs/common-mistakes" element={<CommonMistakesArticle />} />
        <Route path="/articles/entrepreneurs/five-golden-principles" element={<FiveGoldenPrinciplesArticle />} />


        </Routes>
      </Suspense>
    </>
  );
}
{/* <Navbar /> */}
// test redeploy →  ←  ↑  ↓  «   »  …
