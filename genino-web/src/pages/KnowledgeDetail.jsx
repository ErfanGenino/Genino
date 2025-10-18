import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function KnowledgeDetail() {
  const { slug } = useParams();

  const topics = {
    "pre-pregnancy": {
      title: "دانستنی‌های قبل از بارداری (مردان و زنان)",
      content:
        "آمادگی جسمی، تغذیه، مدیریت استرس و آگاهی از سیکل باروری نقش مهمی در افزایش شانس بارداری سالم دارد.",
    },
    "under-3": {
      title: "مراقبت از کودکان زیر ۳ سال",
      content:
        "در سه سال نخست زندگی، لمس، تماس چشمی و توجه والدین بیش از هر عامل دیگری بر رشد مغز کودک اثر دارد.",
    },
    "children-3-10": {
      title: "مراقبت از کودکان ۳ تا ۱۰ سال",
      content:
        "در این دوران طلایی، کودک نیاز به استقلال، تشویق و فضای تجربه دارد تا خلاقیت و اعتماد به نفسش شکوفا شود.",
    },
    "nutrition": {
      title: "تغذیه کودکان",
      content:
        "رژیم متعادل با پروتئین، فیبر، ویتامین‌ها و چربی‌های مفید، رشد ذهنی و جسمی را پشتیبانی می‌کند.",
    },
    "parents-behavior": {
      title: "رفتار والدین با کودکان",
      content:
        "رفتار آگاهانه، گفتگو و همدلی پایه‌های تربیت مثبت و رابطه سالم میان والدین و کودک را می‌سازد.",
    },
    "family-relations": {
      title: "رفتار متقابل زن و مرد در خانواده",
      content:
        "احترام متقابل، درک نیازهای روانی و حمایت عاطفی میان زن و مرد، تعادل خانواده را پایدار نگه می‌دارد.",
    },
  };

  const topic = topics[slug];

  return (
    <main
      dir="rtl"
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#f7f2eb] to-[#fffdf8] text-gray-800 px-6 text-center"
    >
      {topic ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-sm border border-yellow-100 rounded-3xl shadow-lg p-10 max-w-2xl"
        >
          <h1 className="text-2xl font-bold text-yellow-600 mb-4">{topic.title}</h1>
          <p className="text-gray-600 leading-relaxed mb-8">{topic.content}</p>
          <Link
            to="/world-knowledge"
            className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-xl hover:bg-yellow-600 transition-all"
          >
            بازگشت
          </Link>
        </motion.div>
      ) : (
        <p className="text-gray-500 text-lg">موضوع یافت نشد.</p>
      )}
    </main>
  );
}
