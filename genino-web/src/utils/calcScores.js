export function calculateScores(answers, questions) {
  const categories = {};
  const counts = {};

  answers.forEach((ans) => {
    const q = questions.find((q) => q.id === ans.id);
    if (!q) return;

    if (!categories[q.category]) {
      categories[q.category] = 0;
      counts[q.category] = 0;
    }

    categories[q.category] += q.weights[ans.option];
    counts[q.category]++;
  });

  Object.keys(categories).forEach((cat) => {
    categories[cat] = (categories[cat] / counts[cat]).toFixed(2);
  });

  return categories;
}
