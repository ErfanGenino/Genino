import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Music2,
  Disc3,
  Headphones,
  Waves,
  Sparkles,
  Radio,
  AudioLines,
  Brain,
  Heart,
  MoonStar,
  SunMedium,
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

export default function MusicPositiveEnergyHub() {
  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-fuchsia-100 via-pink-50 to-yellow-50 text-slate-800"
    >
      {/* پس‌زمینه دکوراتیو */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-12 -right-12 w-72 h-72 rounded-full bg-fuchsia-300/30 blur-3xl" />
        <div className="absolute top-32 -left-10 w-72 h-72 rounded-full bg-cyan-300/30 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-yellow-300/20 blur-3xl" />

        <Music2 className="absolute top-16 left-10 w-10 h-10 text-fuchsia-300/50 rotate-12" />
        <Disc3 className="absolute top-28 right-20 w-14 h-14 text-pink-300/50 -rotate-12" />
        <Headphones className="absolute bottom-24 left-12 w-12 h-12 text-cyan-300/50" />
        <Radio className="absolute bottom-10 right-10 w-12 h-12 text-yellow-400/50" />
        <AudioLines className="absolute top-1/2 left-1/3 w-14 h-14 text-violet-300/40" />
      </div>

      <section className="relative z-10 px-6 py-12 md:px-10 lg:px-16">
        {/* هدر */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-white/60 shadow-sm mb-5">
            <Music2 className="w-5 h-5 text-fuchsia-600" />
            <span className="text-sm font-medium text-fuchsia-700">
              دنیای مجردها • موسیقی و انرژی مثبت
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black leading-relaxed text-transparent bg-clip-text bg-gradient-to-l from-fuchsia-600 via-pink-600 to-orange-500 mb-4">
            با موسیقی، حال دلت را
            <br />
            روشن‌تر کن ✨
          </h1>

          <p className="max-w-3xl mx-auto text-sm md:text-base text-slate-600 leading-8">
            اینجا مجموعه‌ای متنوع از حال‌وهواهای موسیقی برای دنیای مجردها قرار
            گرفته؛ از آرامش و تمرکز تا انرژی، امید، رقص، خلوت شبانه و خواب آرام.
            روی هر بخش کلیک کن تا وارد صفحه مخصوص خودش بشوی و بعداً موسیقی‌های
            همان فضا را آنجا قرار بدهی.
          </p>
        </motion.div>

        {/* کارت معرفی */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="max-w-6xl mx-auto mb-10"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/60 backdrop-blur-xl shadow-xl p-6 md:p-8">
            <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500/10 via-pink-500/10 to-yellow-400/10" />
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5 text-center">
              <div className="rounded-2xl bg-white/70 p-5 shadow-sm">
                <Sparkles className="w-7 h-7 mx-auto mb-3 text-pink-600" />
                <h3 className="font-bold text-pink-700 mb-2">حال خوب روزانه</h3>
                <p className="text-sm text-slate-600 leading-7">
                  برای لحظه‌هایی که نیاز به انرژی، امید و لبخند داری.
                </p>
              </div>

              <div className="rounded-2xl bg-white/70 p-5 shadow-sm">
                <Waves className="w-7 h-7 mx-auto mb-3 text-cyan-600" />
                <h3 className="font-bold text-cyan-700 mb-2">آرامش ذهن و قلب</h3>
                <p className="text-sm text-slate-600 leading-7">
                  موسیقی برای تنفس، مدیتیشن، خلوت و سبک شدن ذهن.
                </p>
              </div>

              <div className="rounded-2xl bg-white/70 p-5 shadow-sm">
                <Disc3 className="w-7 h-7 mx-auto mb-3 text-orange-500" />
                <h3 className="font-bold text-orange-600 mb-2">ریتم زندگی</h3>
                <p className="text-sm text-slate-600 leading-7">
                  از تمرکز و کار تا ورزش، سفر، کافه و لحظه‌های شبانه.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* دسته‌ها */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {singleWorldMusicCategories.map((item, index) => {
            const Icon = iconMap[item.icon] || Music2;

            return (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
              >
                <Link
                  to={`/single-world/music/${item.slug}`}
                  className={`group relative block overflow-hidden rounded-[2rem] p-[1px] bg-gradient-to-l ${item.gradient} shadow-lg ${item.glow} hover:-translate-y-1.5 transition-all duration-300`}
                >
                  <div className="h-full rounded-[2rem] bg-white/90 backdrop-blur-xl p-6">
                    <div
                      className={`mb-5 inline-flex p-4 rounded-2xl bg-gradient-to-l ${item.gradient} text-white shadow-lg`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    <h2 className="text-xl font-extrabold text-slate-800 mb-2">
                      {item.title}
                    </h2>

                    <p className="text-sm text-slate-600 leading-7 mb-4 min-h-[56px]">
                      {item.shortDescription}
                    </p>

                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        {item.vibe}
                      </span>

                      <span className="text-sm font-bold text-fuchsia-600 group-hover:text-pink-600 transition">
                        ورود به صفحه ←
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* جمله پایانی */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="max-w-3xl mx-auto mt-14 text-center text-slate-600 leading-8"
        >
          موسیقی فقط صدا نیست؛
          <span className="font-bold text-fuchsia-700"> ریتمی است که حالِ درون </span>
          را با زندگی بیرون هماهنگ می‌کند. 🎵
        </motion.p>
      </section>
    </main>
  );
}