import { motion } from "framer-motion";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  Music2,
  Brain,
  Heart,
  MoonStar,
  Sparkles,
  Waves,
  Trees,
  Dumbbell,
  Coffee,
  Car,
  BookOpen,
  Rocket,
  Crown,
  CloudRain,
  Palette,
  Feather,
  BedDouble,
  SunMedium,
  PlayCircle,
  Disc3,
  Headphones,
} from "lucide-react";
import { singleWorldMusicCategories } from "../../data/singleWorldMusicCategories";

const iconMap = {
  sun: SunMedium,
  brain: Brain,
  heart: Heart,
  moon: MoonStar,
  sparkles: Sparkles,
  heartCrack: Heart,
  waves: Waves,
  trees: Trees,
  dumbbell: Dumbbell,
  music: Music2,
  coffee: Coffee,
  car: Car,
  book: BookOpen,
  rocket: Rocket,
  crown: Crown,
  sunset: SunMedium,
  cloudRain: CloudRain,
  palette: Palette,
  feather: Feather,
  bed: BedDouble,
};

export default function MusicCategoryPage() {
  const { slug } = useParams();

  const category = singleWorldMusicCategories.find((item) => item.slug === slug);

  if (!category) {
    return <Navigate to="/single-world/music" replace />;
  }

  const Icon = iconMap[category.icon] || Music2;

  return (
    <main
      dir="rtl"
      className={`min-h-screen bg-gradient-to-b ${category.gradient} text-white`}
    >
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-12 right-8 opacity-20">
          <Disc3 className="w-32 h-32 rotate-12" />
        </div>
        <div className="absolute bottom-10 left-8 opacity-20">
          <Headphones className="w-28 h-28" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-8"
          >
            <Link
              to="/single-world/music"
              className="inline-flex items-center gap-2 rounded-full bg-white/20 hover:bg-white/30 transition px-4 py-2 text-sm font-medium backdrop-blur-md"
            >
              <ArrowRight className="w-4 h-4" />
              بازگشت به لیست موسیقی‌ها
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
            >
              <div className="inline-flex p-4 rounded-3xl bg-white/20 backdrop-blur-md mb-5">
                <Icon className="w-10 h-10" />
              </div>

              <h1 className="text-3xl md:text-5xl font-black leading-relaxed mb-4">
                {category.title}
              </h1>

              <p className="text-base md:text-lg text-white/90 leading-8 mb-5">
                {category.shortDescription}
              </p>

              <div className="inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-md">
                حال‌وهوا: {category.vibe}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              <div className="rounded-[2rem] bg-white/15 backdrop-blur-xl border border-white/20 shadow-2xl p-6 md:p-7">
                <div className="flex items-center gap-3 mb-5">
                  <PlayCircle className="w-7 h-7" />
                  <h2 className="text-xl font-extrabold">بخش پخش موسیقی</h2>
                </div>

                <div className="rounded-3xl border border-dashed border-white/40 bg-white/10 p-6 text-center">
                  <Music2 className="w-12 h-12 mx-auto mb-4 opacity-90" />
                  <p className="text-sm md:text-base leading-8 text-white/90">
                    اینجا جای پخش‌کننده یا لیست موسیقی این دسته است.
                    <br />
                    بعداً می‌توانی فایل موسیقی، لینک استریم، پلی‌لیست یا پلیر دلخواهت
                    را در همین بخش قرار بدهی.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-5">
                  <div className="rounded-2xl bg-white/10 p-4 text-center">
                    <p className="text-sm text-white/70 mb-1">وضعیت</p>
                    <p className="font-bold">آماده برای افزودن موزیک</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4 text-center">
                    <p className="text-sm text-white/70 mb-1">کاربری</p>
                    <p className="font-bold">گوش دادن و حال خوب</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white/95 text-slate-800 rounded-t-[2.5rem] -mt-2 relative z-20">
        <div className="max-w-6xl mx-auto px-6 py-10 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6">
              <Sparkles className="w-7 h-7 text-fuchsia-600 mb-3" />
              <h3 className="font-extrabold text-slate-800 mb-2">
                پیشنهاد کاربرد این صفحه
              </h3>
              <p className="text-sm text-slate-600 leading-7">
                این صفحه می‌تواند مخصوص یک حس خاص باشد تا کاربر با انتخاب حال‌وهوای
                دلخواه، سریع وارد موسیقی مناسب شود.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6">
              <Brain className="w-7 h-7 text-cyan-600 mb-3" />
              <h3 className="font-extrabold text-slate-800 mb-2">
                ایده برای آینده
              </h3>
              <p className="text-sm text-slate-600 leading-7">
                بعداً می‌توانی برای هر دسته، کاور اختصاصی، چند موزیک پیشنهادی،
                توضیح احساسی و حتی دکمه علاقه‌مندی اضافه کنی.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6">
              <Music2 className="w-7 h-7 text-orange-500 mb-3" />
              <h3 className="font-extrabold text-slate-800 mb-2">
                حس ژنینویی
              </h3>
              <p className="text-sm text-slate-600 leading-7">
                طراحی این صفحه طوری چیده شده که هم زنده و احساسی باشد، هم نرم و
                الهام‌بخش، و با دنیای رشد فردی ژنینو هم‌خوانی داشته باشد.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}