import GeninoEmotionAssessment from "@components/Assessments/GeninoEmotionAssessment";
import { socialInteraction_3_5 } from "./data/socialInteraction_3_5";

// بعداً:
// import { socialInteraction_6_9 } from "./data/socialInteraction_6_9";

function getSocialInteractionTestByAge(age) {
  if (age >= 3 && age <= 5) return socialInteraction_3_5;
  // if (age >= 6 && age <= 9) return socialInteraction_6_9;
  return socialInteraction_3_5; // fallback امن
}

export default function SocialInteractionTest() {
  // 👶 دریافت تاریخ تولد کودک (فعلاً از localStorage)
  const birthDate = localStorage.getItem("birthDate");

  const ageYears = (() => {
    if (!birthDate) return 4; // fallback امن
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  })();

  const testConfig = getSocialInteractionTestByAge(ageYears);

  return (
    <GeninoEmotionAssessment
      {...testConfig}
      onFinish={() => {
        // بازگشت به صفحه پایش سلامت کودک
        window.location.href = "/child-health-check";
      }}
    />
  );
}
