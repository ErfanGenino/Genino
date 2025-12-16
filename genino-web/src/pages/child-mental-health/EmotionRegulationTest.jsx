import GeninoEmotionAssessment from "@components/Assessments/GeninoEmotionAssessment";
import { emotionRegulation_3_5 } from "./data/emotionRegulation_3_5";

// بعداً:
// import { emotionRegulation_6_9 } from "@data/assessments/emotionRegulation_6_9";
// import { emotionRegulation_10_12 } from "@data/assessments/emotionRegulation_10_12";

function getEmotionRegulationTestByAge(age) {
  if (age >= 3 && age <= 5) return emotionRegulation_3_5;
  // if (age >= 6 && age <= 9) return emotionRegulation_6_9;
  // if (age >= 10 && age <= 12) return emotionRegulation_10_12;
  return emotionRegulation_3_5; // fallback امن
}

export default function EmotionRegulationTest() {
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

  const testConfig = getEmotionRegulationTestByAge(ageYears);

  return <GeninoEmotionAssessment {...testConfig} />;
}
