import GeninoEmotionAssessment from "@components/Assessments/GeninoEmotionAssessment";
import { attentionFocus_3_5 } from "./data/attentionFocus_3_5";

function getAttentionTestByAge(age) {
  if (age >= 3 && age <= 5) return attentionFocus_3_5;
  return attentionFocus_3_5; // fallback امن
}

export default function AttentionFocusTest() {
  const birthDate = localStorage.getItem("birthDate");

  const ageYears = (() => {
    if (!birthDate) return 4;
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  })();

  const testConfig = getAttentionTestByAge(ageYears);

  return (
    <GeninoEmotionAssessment
      {...testConfig}
      onFinish={() => {
        window.location.href = "/child-health-check";
      }}
    />
  );
}
