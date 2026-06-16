import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import signupHero from "./assets/signup-hero.webp";
import signupHeroMobile from "./assets/signup-hero-mobile.webp";

const signupOptions = [
  {
    title: "ثبت‌نام به عنوان کاربر ژنینو",
    desc: "برای والدین، خانواده و دوستداران کودک",
    icon: "👨‍👩‍👧",
    to: "/signup-user",
    primary: true,
  },
  {
    title: "ثبت‌نام به عنوان ارائه‌دهنده کالا و خدمت",
    desc: "برای فروشندگان، مراکز آموزشی و خدمات کودک",
    icon: "🛍️",
    to: "/signup-vendor",
  },
  {
    title: "ثبت‌نام به عنوان سفیر ژنینو",
    desc: "محلی برای درآمدزایی شما",
    icon: "💛",
    to: "/genino-ambassadors",
  },
];

const particles = [
  { top: "12%", left: "8%" },
  { top: "24%", left: "86%" },
  { top: "38%", left: "14%" },
  { top: "58%", left: "92%" },
  { top: "74%", left: "10%" },
  { top: "84%", left: "78%" },
];

export default function SignupStart() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f8f1e7] text-[#3f2f1f]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.35),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(120,72,32,0.18),transparent_35%)]" />


      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute z-0 h-2 w-2 rounded-full bg-yellow-400/70 shadow-[0_0_18px_rgba(212,175,55,0.8)]"
          style={p}
          animate={{ y: [0, -14, 0], opacity: [0.25, 1, 0.25] }}
          transition={{
            duration: 3 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          
          {/* تصویر ثبت‌نام */}
<motion.div
  className="relative order-1 mx-auto w-full max-w-2xl lg:order-2 lg:max-w-md"
  initial={{ opacity: 0, x: 40, scale: 0.96 }}
  animate={{ opacity: 1, x: 0, scale: 1 }}
  transition={{ duration: 0.9 }}
>
  <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-yellow-300/40 via-white/40 to-amber-900/20 blur-2xl" />

  <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/40 p-2 shadow-2xl shadow-amber-900/20 backdrop-blur-xl">
    {/* موبایل: عکس افقی */}
    <img
      src={signupHeroMobile}
      alt="ثبت‌نام در ژنینو"
      className="aspect-[3/2] h-auto w-full rounded-[1.6rem] object-cover lg:hidden"
    />

    {/* دسکتاپ: عکس عمودی */}
    <img
      src={signupHero}
      alt="ثبت‌نام در ژنینو"
      className="hidden aspect-[2/3] h-auto w-full rounded-[1.6rem] object-cover lg:block"
    />
  </div>
</motion.div>

          {/* کارت ثبت‌نام */}
          <motion.div
            className="order-2 mx-auto w-full max-w-xl lg:order-1"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="rounded-[1.5rem] border border-white/70 bg-white/55 p-3 shadow-2xl shadow-amber-900/10 backdrop-blur-2xl sm:rounded-[2.2rem] sm:p-8">
              <div className="mb-8 text-center">
                <span className="mb-4 inline-flex rounded-full border border-yellow-300/60 bg-yellow-50/80 px-4 py-2 text-xs font-bold text-yellow-800 shadow-sm">
                  به دنیای طلایی ژنینو خوش آمدید
                </span>

                <h1 className="mb-3 text-2xl font-extrabold tracking-tight text-[#6f4a18] sm:text-4xl">
                انتخاب مسیر شما در ژنینو
                </h1>

                <p className="mx-auto max-w-md text-sm leading-7 text-stone-600 sm:text-base">
                  نوع ثبت‌نام خود را انتخاب کنید تا مسیر مناسب شما در ژنینو آغاز شود.
                </p>
              </div>

              <div className="space-y-4">
                {signupOptions.map((item, index) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + index * 0.12 }}
                  >
                    <Link
                      to={item.to}
                      className={`group flex items-center justify-between gap-4 rounded-3xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                        item.primary
                          ? "border-yellow-300 bg-gradient-to-l from-[#d4af37] to-[#b98522] text-white shadow-lg shadow-yellow-500/25"
                          : "border-yellow-200/70 bg-white/75 text-[#6f4a18] hover:border-yellow-400 hover:bg-yellow-50"
                      }`}
                    >
                      <div className="flex items-center gap-4 text-right">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl shadow-sm ${
                            item.primary
                              ? "bg-white/20"
                              : "bg-gradient-to-br from-yellow-100 to-white"
                          }`}
                        >
                          {item.icon}
                        </div>

                        <div>
                          <h2 className="text-sm font-extrabold sm:text-base">
                            {item.title}
                          </h2>
                          <p
                            className={`mt-1 text-xs leading-6 ${
                              item.primary ? "text-white/85" : "text-stone-500"
                            }`}
                          >
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition group-hover:-translate-x-1 ${
                          item.primary
                            ? "bg-white/20 text-white"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        ←
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <p className="mt-7 text-center text-xs leading-6 text-stone-500">
                با ثبت‌نام در ژنینو، وارد یک اکوسیستم هوشمند، خانوادگی و درآمدزا می‌شوید.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}