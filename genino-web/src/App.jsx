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
import GeneralReportsDashboard from "./pages/Reports/GeneralReportsDashboard";
import ChildHealthReports from "./pages/Reports/ChildHealthReports";
import FamilyHealthReports from "./pages/Reports/FamilyHealthReports";
import MenHealthReports from "./pages/Reports/MenHealthReports";
import WomenHealthReports from "./pages/Reports/WomenHealthReports";
import GeneticSecrets from "./pages/knowledge/GeneticSecrets.jsx";
import WhatIsGene from "./pages/articles/WhatIsGene.jsx";
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
import PrePregnancyKnowledge from "./pages/knowledge/PrePregnancyKnowledge";
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
import ChildNutritionKnowledge from "./pages/knowledge/ChildNutritionKnowledge";
import ChildCareKnowledge from "./pages/knowledge/ChildCareKnowledge";
import FamilyRelationsKnowledge from "./pages/knowledge/FamilyRelationsKnowledge";
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
import Terms from "./pages/Terms";
import DashboardUser from "./pages/dashboard/DashboardUser";
import ProtectedRoute from "./components/ProtectedRoute";
import MindCalmKnowledge from "./pages/knowledge/MindCalmKnowledge";
import HomeWorkoutKnowledge from "./pages/knowledge/HomeWorkoutKnowledge";
import SuccessfulEntrepreneursKnowledge from "./pages/knowledge/SuccessfulEntrepreneursKnowledge";
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
        <Route path="/dashboard-single" element={<ProtectedRoute> <DashboardSingle /> </ProtectedRoute>} />
        <Route path="/dashboard-couple" element={<ProtectedRoute> <DashboardCouple /> </ProtectedRoute>} />
        <Route path="/dashboard-pregnancy" element={<ProtectedRoute> <DashboardPregnancy /> </ProtectedRoute>} />
        <Route path="/dashboard-parent" element={<ProtectedRoute> <DashboardParent /> </ProtectedRoute>} />
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


      </Routes>
    </>
  );
}
{/* <Navbar /> */}
// test redeploy →  ←  ↑  ↓  «   »  …
