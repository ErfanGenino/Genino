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
import ChildHealthCheck from "./pages/ChildHealthCheck/ChildHealthCheck";
import ProtectedRoute from "./components/ProtectedRoute";
import AcceptInvite from "./pages/AcceptInvite";
import ProductDetail from "./pages/ProductDetail.jsx";
import MusicPositiveEnergyHub from "./pages/single-world/MusicPositiveEnergyHub";
import MusicCategoryPage from "./pages/single-world/MusicCategoryPage";
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
const GeninoChildren = lazy(() => import("./pages/GeninoChildren.jsx"));
const Inspiration = lazy(() => import("./pages/Inspiration.jsx"));
const MemoryAlbum = lazy(() => import("./pages/MemoryAlbum"));
const AwarenessCenter = lazy(() => import("./pages/AwarenessCenter"));
const EmotionalIntelligence = lazy(() => import("./pages/EmotionalIntelligence"));
const DashboardSingle = lazy(() => import("./pages/dashboard/DashboardSingle"));
const DashboardCouple = lazy(() => import("./pages/dashboard/DashboardCouple"));
const DashboardPregnancy = lazy(() => import("./pages/dashboard/DashboardPregnancy"));
const DashboardParent = lazy(() => import("./pages/dashboard/DashboardParent"));
const MyWomenHealthTest = lazy(() => import("./pages/MyWomenHealthTest"));
const DashboardUser = lazy(() => import("./pages/dashboard/DashboardUser"));
const SingleWorld = lazy(() => import("./pages/SingleWorld"));
const CoffeeBreakArticle = lazy(() => import("./pages/articles/CoffeeBreakArticle"));
const TravelExperience = lazy(() => import("./pages/TravelExperience"));
const BooksPositiveEnergy = lazy(() => import("./pages/BooksPositiveEnergy"));
const PersonalGrowth = lazy(() => import("./pages/PersonalGrowth"));
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
const MusicAndMind = lazy(() => import("./pages/MusicAndMind"));
const LoveRelationship = lazy(() => import("./pages/LoveRelationship"));
const CoupleDates = lazy(() => import("./pages/CoupleDates"));
const HealthyConversation = lazy(() => import("./pages/HealthyConversation"));
const MindPeace = lazy(() => import("./pages/dashboardcards/MindPeace"));
const CoupleNutrition = lazy(() => import("./pages/dashboardcards/CoupleNutrition"));
const FutureParenting = lazy(() => import("./pages/dashboardcards/FutureParenting"));
const CoupleHome = lazy(() => import("./pages/dashboardcards/CoupleHome"));
const SuccessfulCouples = lazy(() => import("./pages/dashboardcards/SuccessfulCouples"));
const PeacefulMarriage = lazy(() => import("./pages/dashboardcards/PeacefulMarriage"));
const AcceptanceAndTrust = lazy(() => import("./pages/dashboardcards/AcceptanceAndTrust"));
const PregnancyWeeklyGrowth = lazy(() => import("./pages/dashboardcards/PregnancyWeeklyGrowth"));
const MotherHealth = lazy(() => import("./pages/dashboardcards/MotherHealth"));
const PregnancyNutrition = lazy(() => import("./pages/dashboardcards/PregnancyNutrition"));
const PregnancyBreathing = lazy(() => import("./pages/dashboardcards/PregnancyBreathing"));
const BirthPreparation = lazy(() => import("./pages/dashboardcards/BirthPreparation"));
const FatherSupport = lazy(() => import("./pages/dashboardcards/FatherSupport"));
const BondWithBaby = lazy(() => import("./pages/dashboardcards/BondWithBaby"));
const LetGoAndGrow = lazy(() => import("./pages/dashboardcards/LetGoAndGrow"));
const MoneyAndFuture = lazy(() => import("./pages/dashboardcards/MoneyAndFuture"));
const PregnancyTrust = lazy(() => import("./pages/dashboardcards/PregnancyTrust"));
const FreePlayArticle = lazy(() => import("./pages/articles/FreePlayArticle"));
const BalancedDietArticle = lazy(() => import("./pages/articles/diets/BalancedDietArticle"));
const MediterraneanDietArticle = lazy(() => import("./pages/articles/diets/MediterraneanDietArticle"));
const DashDietArticle = lazy(() => import("./pages/articles/diets/DashDietArticle"));
const VegetarianDietArticle = lazy(() => import("./pages/articles/diets/VegetarianDietArticle"));
const VeganDietArticle = lazy(() => import("./pages/articles/diets/VeganDietArticle"));
const IntermittentFastingArticle = lazy(() => import("./pages/articles/diets/IntermittentFastingArticle"));
const WeightLossDietArticle = lazy(() => import("./pages/articles/diets/WeightLossDietArticle"));
const WeightGainDietArticle = lazy(() => import("./pages/articles/diets/WeightGainDietArticle"));
const FatLossDietArticle = lazy(() => import("./pages/articles/diets/FatLossDietArticle"));
const MuscleGainDietArticle = lazy(() => import("./pages/articles/diets/MuscleGainDietArticle"));
const WeightMaintenanceDietArticle = lazy(() => import("./pages/articles/diets/WeightMaintenanceDietArticle"));
const EnergyFocusNutritionArticle = lazy(() => import("./pages/articles/diets/EnergyFocusNutritionArticle"));
const DiabetesDietArticle = lazy(() => import("./pages/articles/diets/DiabetesDietArticle"));
const HypertensionDietArticle = lazy(() => import("./pages/articles/diets/HypertensionDietArticle"));
const FattyLiverDietArticle = lazy(() => import("./pages/articles/diets/FattyLiverDietArticle"));
const LowSaltDietArticle = lazy(() => import("./pages/articles/diets/LowSaltDietArticle"));
const GlutenFreeDietArticle = lazy(() => import("./pages/articles/diets/GlutenFreeDietArticle"));
const DigestiveHealthDietArticle = lazy(() => import("./pages/articles/diets/DigestiveHealthDietArticle"));
const ChildrenDietArticle = lazy(() => import("./pages/articles/diets/ChildrenDietArticle"));
const TeenagersDietArticle = lazy(() => import("./pages/articles/diets/TeenagersDietArticle"));
const BreastfeedingDietArticle = lazy(() => import("./pages/articles/diets/BreastfeedingDietArticle"));
const OlderAdultsDietArticle = lazy(() => import("./pages/articles/diets/OlderAdultsDietArticle"));
const MenGenitalSelfCheckArticle = lazy(() => import("./pages/articles/MenGenitalSelfCheckArticle.jsx"));
const LaserFocusArticle = lazy(() => import("./pages/articles/LaserFocusArticle"));
const GoldenGenesChildArticle = lazy(() => import("./pages/articles/GoldenGenesChildArticle"));
const BehavioralEpigeneticsArticle = lazy(() => import("./pages/articles/BehavioralEpigeneticsArticle"));
const ChildIntelligenceGenesArticle = lazy(() => import("./pages/articles/ChildIntelligenceGenesArticle.jsx"));
const UnconditionalLoveChildArticle = lazy(() => import("./pages/articles/UnconditionalLoveChildArticle.jsx"));
const ParentingBehaviorAtHomeArticle = lazy(() => import("@pages/articles/ParentingBehaviorAtHomeArticle"));
const ChildAnxietyAndFearManagementArticle = lazy(() => import("@pages/articles/ChildAnxietyAndFearManagementArticle"));
const SmartEncouragementArticle = lazy(() => import("@pages/articles/SmartEncouragementArticle"));
const MutualRespectArticle = lazy(() => import("@pages/articles/MutualRespectArticle"));
const FatherEmotionalRoleArticle = lazy(() => import("@pages/articles/FatherEmotionalRoleArticle"));
const ParentAngerManagementArticle = lazy(() => import("@pages/articles/ParentAngerManagementArticle"));
const ChildTrustArticle = lazy(() => import("@pages/articles/ChildTrustArticle"));
const QualityTimeArticle = lazy(() => import("@pages/articles/QualityTimeArticle"));
const PrePregnancyCheckupsArticle = lazy(() => import("@pages/articles/pre-pregnancy/PrePregnancyCheckupsArticle"));
const PrePregnancyVitaminsArticle = lazy(() => import("@pages/articles/pre-pregnancy/PrePregnancyVitaminsArticle"));
const EggSpermQualityArticle = lazy(() => import("@pages/articles/pre-pregnancy/EggSpermQualityArticle"));
const PrePregnancyEpigeneticsArticle = lazy(() => import("@pages/articles/pre-pregnancy/PrePregnancyEpigeneticsArticle"));
const PrePregnancyStressManagementArticle = lazy(() => import("@pages/articles/pre-pregnancy/PrePregnancyStressManagementArticle"));
const PrePregnancyBodyWeightArticle = lazy(() => import("@pages/articles/pre-pregnancy/PrePregnancyBodyWeightArticle"));
const PrePregnancyToxinsArticle = lazy(() => import("@pages/articles/pre-pregnancy/PrePregnancyToxinsArticle"));
const PrePregnancyParentalAgeArticle = lazy(() => import("@pages/articles/pre-pregnancy/PrePregnancyParentalAgeArticle"));
const PrePregnancyOvulationCycleArticle = lazy(() => import("@pages/articles/pre-pregnancy/PrePregnancyOvulationCycleArticle"));
const PrePregnancyMaleSexualHealthArticle = lazy(() => import("@pages/articles/pre-pregnancy/PrePregnancyMaleSexualHealthArticle"));
const PrePregnancySleepAndFertilityArticle = lazy(() => import("@pages/articles/pre-pregnancy/PrePregnancySleepAndFertilityArticle"));
const PrePregnancyMedicationsArticle = lazy(() => import("@pages/articles/pre-pregnancy/PrePregnancyMedicationsArticle"));
const PositiveGenesArticle = lazy(() => import("@pages/articles/genetic-secrets/PositiveGenesArticle"));
const GeneEditingFutureArticle = lazy(() => import("@pages/articles/genetic-secrets/GeneEditingFutureArticle"));
const InheritanceAndGoodnessArticle = lazy(() => import("@pages/articles/genetic-secrets/InheritanceAndGoodnessArticle"));
const HumanDiversitySecretsArticle = lazy(() => import("@pages/articles/genetic-secrets/HumanDiversitySecretsArticle"));
const DNAToEmotionArticle = lazy(() => import("@pages/articles/genetic-secrets/DNAToEmotionArticle"));
const GenesAndBeautyArticle = lazy(() => import("@pages/articles/genetic-secrets/GenesAndBeautyArticle"));
const GeneticMedicineFutureArticle = lazy(() => import("@pages/articles/genetic-secrets/GeneticMedicineFutureArticle"));
const DoGenesDefineDestinyArticle = lazy(() => import("@pages/articles/genetic-secrets/DoGenesDefineDestinyArticle"));
const EmotionalInheritanceArticle = lazy(() => import("@pages/articles/genetic-secrets/EmotionalInheritanceArticle"));
const ChildNutrition0to2Article = lazy(() => import("@pages/articles/child-nutrition/ChildNutrition0to2Article"));
const BrainBoostingFoodsArticle = lazy(() => import("@pages/articles/child-nutrition/BrainBoostingFoodsArticle"));
const ForbiddenFoodsUnder5Article = lazy(() => import("@pages/articles/child-nutrition/ForbiddenFoodsUnder5Article"));
const EssentialNutrientsForFocusArticle = lazy(() => import("@pages/articles/child-nutrition/EssentialNutrientsForFocusArticle"));
const ChildImmunityNutritionArticle = lazy(() => import("@pages/articles/child-nutrition/ChildImmunityNutritionArticle"));
const HealthyPlateForKidsArticle = lazy(() => import("@pages/articles/child-nutrition/HealthyPlateForKidsArticle"));
const EssentialVitaminsForKidsArticle = lazy(() => import("@pages/articles/child-nutrition/EssentialVitaminsForKidsArticle"));
const ChildObesityPreventionArticle = lazy(() => import("@pages/articles/child-nutrition/ChildObesityPreventionArticle"));
const ChildPickyEatingArticle = lazy(() => import("@pages/articles/child-nutrition/ChildPickyEatingArticle"));
const SleepAndNutritionImpactArticle = lazy(() => import("@pages/articles/child-nutrition/SleepAndNutritionImpactArticle"));
const ProteinRoleInChildGrowthArticle = lazy(() => import("@pages/articles/child-nutrition/ProteinRoleInChildGrowthArticle"));
const FiveGoldenRulesNutritionArticle = lazy(() => import("@pages/articles/child-nutrition/FiveGoldenRulesNutritionArticle"));
const MutualRespectInMarriageArticle = lazy(() => import("@pages/articles/family-relations/MutualRespectInMarriageArticle"));
const HealthyFamilyCommunicationArticle = lazy(() => import("@pages/articles/family-relations/HealthyFamilyCommunicationArticle"));
const EmotionalNeedsUnderstandingArticle = lazy(() => import("@pages/articles/family-relations/EmotionalNeedsUnderstandingArticle"));
const ResolvingMinorConflictsArticle = lazy(() => import("@pages/articles/family-relations/ResolvingMinorConflictsArticle"));
const RoleOfTrustInEmotionalSecurityArticle = lazy(() => import("@pages/articles/family-relations/RoleOfTrustInEmotionalSecurityArticle"));
const DailyAffectionAsRelationshipFuelArticle = lazy(() => import("@pages/articles/family-relations/DailyAffectionAsRelationshipFuelArticle"));
const RolesAndResponsibilitiesInModernFamilyArticle = lazy(() => import("@pages/articles/family-relations/RolesAndResponsibilitiesInModernFamilyArticle"));
const HowToProvideEmotionalSupportArticle = lazy(() => import("@pages/articles/family-relations/HowToProvideEmotionalSupportArticle"));
const BehavioralRedFlagsArticle = lazy(() => import("@pages/articles/family-relations/BehavioralRedFlagsArticle"));
const AngerManagementInRelationshipsArticle = lazy(() => import("@pages/articles/family-relations/AngerManagementInRelationshipsArticle"));
const HowParentalRelationshipAffectsChildDevelopmentArticle = lazy(() => import("@pages/articles/family-relations/HowParentalRelationshipAffectsChildDevelopmentArticle"));
const CommonRelationshipMistakesCouplesShouldAvoidArticle = lazy(() => import("@pages/articles/family-relations/CommonRelationshipMistakesCouplesShouldAvoidArticle"));
const EssentialCareForChildren0To3Article = lazy(() => import("@pages/articles/child-care/EssentialCareForChildren0To3Article"));
const CognitiveDevelopmentFromBirthToEarlyYearsArticle = lazy(() => import("@pages/articles/child-care/CognitiveDevelopmentFromBirthToEarlyYearsArticle"));
const PlayTherapyAndChildBrainDevelopmentArticle = lazy(() => import("@pages/articles/child-care/PlayTherapyAndChildBrainDevelopmentArticle"));
const HealthyIndependenceInChildrenArticle = lazy(() => import("@pages/articles/child-care/HealthyIndependenceInChildrenArticle"));
const FactorsAffectingChildSenseOfSecurityArticle = lazy(() => import("@pages/articles/child-care/FactorsAffectingChildSenseOfSecurityArticle"));
const HowToHandleChildCryingArticle = lazy(() => import("@pages/articles/child-care/HowToHandleChildCryingArticle"));
const RoleOfRuleSettingInHealthyChildDevelopmentArticle = lazy(() => import("@pages/articles/child-care/RoleOfRuleSettingInHealthyChildDevelopmentArticle"));
const BestGamesForBrainAndCreativityDevelopmentArticle = lazy(() => import("@pages/articles/child-care/BestGamesForBrainAndCreativityDevelopmentArticle"));
const EyeContactAndEmotionalDevelopmentArticle = lazy(() => import("@pages/articles/child-care/EyeContactAndEmotionalDevelopmentArticle"));
const SignsOfDevelopmentalDelayInChildrenArticle = lazy(() => import("@pages/articles/child-care/SignsOfDevelopmentalDelayInChildrenArticle"));
const InfantReflexesAreTheyNormalArticle = lazy(() => import("@pages/articles/child-care/InfantReflexesAreTheyNormalArticle"));
const EffectiveAndIneffectivePraiseInChildrenArticle = lazy(() => import("@pages/articles/child-care/EffectiveAndIneffectivePraiseInChildrenArticle"));
const WhatIsMeditationArticle = lazy(() => import("./pages/articles/mind-calm/WhatIsMeditationArticle"));
const BreathingExercisesForDailyStressArticle = lazy(() => import("./pages/articles/mind-calm/BreathingExercisesForDailyStressArticle"));
const MeditationForBusyParentsArticle = lazy(() => import("./pages/articles/mind-calm/MeditationForBusyParentsArticle"));
const CalmingMindBeforeSleepArticle = lazy(() => import("./pages/articles/mind-calm/CalmingMindBeforeSleepArticle"));
const ParentalMentalCalmImpactOnChildGrowthArticle = lazy(() => import("./pages/articles/mind-calm/ParentalMentalCalmImpactOnChildGrowthArticle"));
const FiveMinuteHomeMeditationArticle = lazy(() => import("./pages/articles/mind-calm/FiveMinuteHomeMeditationArticle"));
const MindfulnessInDailyLifeArticle = lazy(() => import("./pages/articles/mind-calm/MindfulnessInDailyLifeArticle"));
const ReducingAnxietyWithSimpleMentalExercisesArticle = lazy(() => import("./pages/articles/mind-calm/ReducingAnxietyWithSimpleMentalExercisesArticle"));
const MentalCalmInCrisisArticle = lazy(() => import("./pages/articles/mind-calm/MentalCalmInCrisisArticle"));
const MeditationImpactOnFocusAndDecisionMakingArticle = lazy(() => import("./pages/articles/mind-calm/MeditationImpactOnFocusAndDecisionMakingArticle"));
const ManagingNegativeThoughtsWithMentalTrainingArticle = lazy(() => import("./pages/articles/mind-calm/ManagingNegativeThoughtsWithMentalTrainingArticle"));
const FiveSimpleExercisesForInstantCalmArticle = lazy(() => import("./pages/articles/mind-calm/FiveSimpleExercisesForInstantCalmArticle"));
const HomeWorkoutWithoutEquipmentArticle = lazy(() => import("./pages/articles/home-workout/HomeWorkoutWithoutEquipmentArticle"));
const DailySimpleWorkoutsForBusyParentsArticle = lazy(() => import("./pages/articles/home-workout/DailySimpleWorkoutsForBusyParentsArticle"));
const WorkoutsForRestartingArticle = lazy(() => import("./pages/articles/home-workout/WorkoutsForRestartingArticle"));
const ExercisesForLowerBackPainArticle = lazy(() => import("./pages/articles/home-workout/ExercisesForLowerBackPainArticle"));
const StretchingExercisesForMusclePainReliefArticle = lazy(() => import("./pages/articles/home-workout/StretchingExercisesForMusclePainReliefArticle"));
const FatBurningHomeWorkoutArticle = lazy(() => import("./pages/articles/home-workout/FatBurningHomeWorkoutArticle"));
const FromZeroToFirstSuccessArticle = lazy(() => import("./pages/articles/entrepreneurs/FromZeroToFirstSuccessArticle"));
const EntrepreneurMindsetArticle = lazy(() => import("./pages/articles/entrepreneurs/EntrepreneurMindsetArticle"));
const FailureOrBeginningArticle = lazy(() => import("./pages/articles/entrepreneurs/FailureOrBeginningArticle"));
const RiskManagementArticle = lazy(() => import("./pages/articles/entrepreneurs/RiskManagementArticle"));
const DecisionMakingArticle = lazy(() => import("./pages/articles/entrepreneurs/DecisionMakingArticle"));
const IdeaVsExecutionArticle = lazy(() => import("./pages/articles/entrepreneurs/IdeaVsExecutionArticle"));
const PersonalDisciplineArticle = lazy(() => import("./pages/articles/entrepreneurs/PersonalDisciplineArticle"));
const LateStartersArticle = lazy(() => import("./pages/articles/entrepreneurs/LateStartersArticle"));
const EmployeeToEntrepreneurArticle = lazy(() => import("./pages/articles/entrepreneurs/EmployeeToEntrepreneurArticle"));
const WorkLifeBalanceArticle = lazy(() => import("./pages/articles/entrepreneurs/WorkLifeBalanceArticle"));
const CommonMistakesArticle = lazy(() => import("./pages/articles/entrepreneurs/CommonMistakesArticle"));
const FiveGoldenPrinciplesArticle = lazy(() => import("./pages/articles/entrepreneurs/FiveGoldenPrinciplesArticle"));
const Feed = lazy(() => import("./pages/social/Feed.jsx"));
const Profile = lazy(() => import("./pages/social/Profile.jsx"));
const CreatePost = lazy(() => import("./pages/social/CreatePost.jsx"));
const ChatRoom = lazy(() => import("./pages/social/ChatRoom.jsx"));
const Notifications = lazy(() => import("./pages/Notifications"));



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
        <Route path="/genino-children" element={<GeninoChildren />} />
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
        <Route path="/personal-growth" element={<ProtectedRoute><PersonalGrowth /></ProtectedRoute>} />
        <Route path="/books-positive-energy" element={<ProtectedRoute><BooksPositiveEnergy /></ProtectedRoute>} />
        <Route path="/travel-experience" element={<ProtectedRoute><TravelExperience /></ProtectedRoute>} />
        <Route path="/emotional-intelligence" element={<ProtectedRoute><EmotionalIntelligence /></ProtectedRoute>} />
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
        <Route path="/awareness-center" element={<ProtectedRoute><AwarenessCenter /></ProtectedRoute>} />
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
        <Route path="/music-and-mind" element={<ProtectedRoute><MusicAndMind /></ProtectedRoute>} />
        <Route path="/love-relationship" element={<ProtectedRoute><LoveRelationship /></ProtectedRoute>} />
        <Route path="/couple-dates" element={<ProtectedRoute><CoupleDates /></ProtectedRoute>} />
        <Route path="/healthy-conversation" element={<ProtectedRoute><HealthyConversation /></ProtectedRoute>} />
        <Route path="/mind-peace" element={<ProtectedRoute><MindPeace /></ProtectedRoute>} />
        <Route path="/couple-nutrition" element={<ProtectedRoute><CoupleNutrition /></ProtectedRoute>} />
        <Route path="/future-parenting" element={<ProtectedRoute><FutureParenting /></ProtectedRoute>} />
        <Route path="/couple-home" element={<ProtectedRoute><CoupleHome /></ProtectedRoute>} />
        <Route path="/successful-couples" element={<ProtectedRoute><SuccessfulCouples /></ProtectedRoute>} />
        <Route path="/peaceful-marriage" element={<ProtectedRoute><PeacefulMarriage /></ProtectedRoute>} />
        <Route path="/acceptance-and-trust" element={<ProtectedRoute><AcceptanceAndTrust /></ProtectedRoute>} />
        <Route path="/pregnancy-weekly-growth" element={<ProtectedRoute><PregnancyWeeklyGrowth /></ProtectedRoute>} />
        <Route path="/mother-health" element={<ProtectedRoute><MotherHealth /></ProtectedRoute>} />
        <Route path="/pregnancy-nutrition" element={<ProtectedRoute><PregnancyNutrition /></ProtectedRoute>} />
        <Route path="/pregnancy-breathing" element={<ProtectedRoute><PregnancyBreathing /></ProtectedRoute>} />
        <Route path="/birth-preparation" element={<ProtectedRoute><BirthPreparation /></ProtectedRoute>} />
        <Route path="/father-support" element={<ProtectedRoute><FatherSupport /></ProtectedRoute>} />
        <Route path="/bond-with-baby" element={<ProtectedRoute><BondWithBaby /></ProtectedRoute>} />
        <Route path="/let-go-and-grow" element={<ProtectedRoute><LetGoAndGrow /></ProtectedRoute>} />
        <Route path="/money-and-future" element={<ProtectedRoute><MoneyAndFuture /></ProtectedRoute>} />
        <Route path="/pregnancy-trust" element={<ProtectedRoute><PregnancyTrust /></ProtectedRoute>} />



        </Routes>
      </Suspense>
    </>
  );
}
{/* <Navbar /> */}
// test redeploy →  ←  ↑  ↓  «   »  …
