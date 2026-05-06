//src/pages/articles/BooksThatChangeLifeArticle.jsx

import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  Lightbulb,
  Target,
  Quote,
  Clock,
  NotebookPen,
} from "lucide-react";
import heroImg from "../../assets/books-that-change-life-pic/hero.jpg";
import brainImg from "../../assets/books-that-change-life-pic/brain.jpg";
import deepReadingImg from "../../assets/books-that-change-life-pic/deep-reading.jpg";
import notesImg from "../../assets/books-that-change-life-pic/notes.jpg";
import timeImg from "../../assets/books-that-change-life-pic/time.jpg";

function SectionTitle({ icon, title, subtitle }) {
  return (
    <div className="mb-10 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8a5a35] text-[#fff4e6] border border-[#c89452] mb-4 shadow-sm">
        {icon}
        <span className="text-sm font-semibold">{title}</span>
      </div>

      {subtitle && (
        <p className="max-w-3xl mx-auto text-sm md:text-base leading-8 text-[#6b442e]">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function ImagePlaceholder({ title }) {
  return (
    <div className="w-full min-h-[250px] rounded-3xl border border-[#c89452]/70 bg-gradient-to-br from-[#6b442e] via-[#8a5a35] to-[#c89452] flex items-center justify-center text-center p-6 shadow-lg shadow-[#4a2f22]/15">
      <div>
        <div className="text-4xl mb-3">📚</div>
        <p className="text-[#fff4e6] font-semibold">{title}</p>
        <p className="text-[#f8ead8]/80 text-sm mt-2">
          اینجا محل مناسب برای قرار دادن تصویر است
        </p>
      </div>
    </div>
  );
}

function ArticleImage({ src, alt }) {
  return (
    <div className="group w-full h-[280px] md:h-[330px] overflow-hidden rounded-3xl border border-[#c89452]/70 shadow-lg shadow-[#4a2f22]/15 bg-[#6b442e]">
      
      {/* Image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="
          w-full h-full object-cover
          transition-all duration-500 ease-out
          group-hover:scale-105
          group-hover:brightness-75
        "
      />

      {/* Overlay */}
      <div className="
        pointer-events-none
        absolute inset-0
        bg-gradient-to-t from-[#4a2f22]/40 to-transparent
        opacity-0 group-hover:opacity-100
        transition duration-500
      " />

    </div>
  );
}

function InfoCard({ title, children }) {
  return (
    <div className="bg-[#fff8ef] rounded-3xl border border-[#d8a866]/70 shadow-sm p-6 hover:shadow-lg hover:shadow-[#8a5a35]/10 transition-all duration-300">
      <h3 className="text-xl font-bold text-[#4a2f22] mb-4">{title}</h3>
      <div className="text-[#6b442e] leading-8 text-sm md:text-base space-y-4">
        {children}
      </div>
    </div>
  );
}

const books = [
  {
    title: "انسان در جستجوی معنا — ویکتور فرانکل",
    text: "این کتاب یکی از عمیق‌ترین آثار روانشناسی قرن بیستم است. ویکتور فرانکل که یک روانپزشک اتریشی و بازمانده اردوگاه‌های کار اجباری نازی‌ها بود، در این کتاب تجربه شخصی خود از آن دوران را روایت می‌کند. او نشان می‌دهد حتی در شرایطی که انسان همه چیز را از دست می‌دهد، هنوز می‌تواند معنایی برای زندگی پیدا کند. پیام اصلی کتاب این است که انسان همیشه آزادی انتخاب نگرش خود را دارد. فرانکل معتقد است کسانی که برای زندگی خود معنا پیدا می‌کنند، حتی در سخت‌ترین شرایط نیز امید و قدرت ادامه دادن دارند. این کتاب ترکیبی از روایت انسانی، فلسفه زندگی و روانشناسی عمیق است و برای بسیاری از خوانندگان یکی از تأثیرگذارترین کتاب‌هایی است که تاکنون خوانده‌اند.",
  },
  {
    title: "عادت‌های اتمی — جیمز کلیر",
    text: "این کتاب یکی از مهم‌ترین آثار در زمینه تغییر عادت‌ها و رشد فردی است. جیمز کلیر در این کتاب توضیح می‌دهد که موفقیت‌های بزرگ معمولاً نتیجه تغییرات کوچک اما مداوم هستند. او مفهوم عادت‌های اتمی را معرفی می‌کند؛ یعنی عادت‌های بسیار کوچک که در طول زمان تأثیرات بزرگ ایجاد می‌کنند. نویسنده نشان می‌دهد چگونه محیط، هویت شخصی و سیستم‌های روزمره می‌توانند رفتار انسان را شکل دهند. این کتاب به جای تمرکز بر اهداف بزرگ، بر ساختن سیستم‌های درست تأکید می‌کند. با استفاده از مثال‌های واقعی و تحقیقات علمی، نویسنده نشان می‌دهد چگونه می‌توان عادت‌های بد را حذف و عادت‌های خوب را جایگزین کرد.",
  },
  {
    title: "تفکر سریع و کند — دنیل کانمن",
    text: "این کتاب یکی از مهم‌ترین آثار در زمینه روانشناسی تصمیم‌گیری است. دنیل کانمن، برنده جایزه نوبل اقتصاد، در این کتاب توضیح می‌دهد که ذهن انسان دو سیستم فکری دارد. سیستم اول سریع، شهودی و احساسی است و سیستم دوم آهسته، منطقی و تحلیلی. بیشتر تصمیم‌های روزمره ما توسط سیستم سریع گرفته می‌شوند، اما این سیستم گاهی دچار خطاهای شناختی می‌شود. کتاب با مثال‌های فراوان نشان می‌دهد چگونه ذهن انسان در قضاوت‌ها و تصمیم‌ها دچار اشتباه می‌شود. مطالعه این کتاب کمک می‌کند انسان آگاه‌تر تصمیم بگیرد و خطاهای ذهنی خود را بهتر بشناسد.",
  },
  {
    title: "اثر مرکب — دارن هاردی",
    text: "این کتاب بر یک اصل ساده اما قدرتمند تأکید می‌کند: موفقیت نتیجه تصمیم‌های کوچک و مداوم است. دارن هاردی توضیح می‌دهد که بسیاری از افراد به دنبال تغییرات بزرگ و سریع هستند، اما در واقع تغییرات کوچک روزانه هستند که در بلندمدت زندگی را متحول می‌کنند. این کتاب نشان می‌دهد چگونه عادت‌های روزانه، انتخاب‌های کوچک و نظم شخصی می‌توانند مسیر زندگی را تغییر دهند. نویسنده با مثال‌های واقعی نشان می‌دهد چگونه افراد موفق از همین اصل ساده برای ساختن موفقیت‌های بزرگ استفاده کرده‌اند.",
  },
  {
    title: "هفت عادت مردمان مؤثر — استیون کاوی",
    text: "این کتاب یکی از مشهورترین آثار در حوزه توسعه فردی و رهبری است. استیون کاوی در این کتاب هفت عادت اساسی را معرفی می‌کند که می‌توانند زندگی فردی و حرفه‌ای انسان را متحول کنند. این عادت‌ها شامل مسئولیت‌پذیری، برنامه‌ریزی هدفمند، اولویت‌بندی درست، تفکر برد-برد، گوش دادن عمیق، همکاری مؤثر و رشد مداوم هستند. نویسنده نشان می‌دهد چگونه تغییر نگرش و رفتار می‌تواند روابط انسانی، کار و زندگی را به شکل قابل توجهی بهبود دهد.",
  },
  {
    title: "کار عمیق — کال نیوپورت",
    text: "در دنیایی که حواس‌پرتی‌های دیجیتال بسیار زیاد شده‌اند، توانایی تمرکز عمیق تبدیل به یک مهارت بسیار ارزشمند شده است. کال نیوپورت در این کتاب توضیح می‌دهد که چگونه تمرکز عمیق می‌تواند بهره‌وری، خلاقیت و کیفیت کار انسان را افزایش دهد. او نشان می‌دهد که بسیاری از افراد موفق زمان‌هایی از روز را به کار عمیق اختصاص می‌دهند؛ زمانی که بدون حواس‌پرتی روی یک کار مهم تمرکز می‌کنند. این کتاب راهکارهای عملی برای ایجاد چنین تمرکزی ارائه می‌دهد.",
  },
  {
    title: "ذهنیت — کارول دوک",
    text: "کارول دوک در این کتاب مفهوم بسیار مهمی به نام ذهنیت رشد را معرفی می‌کند. او نشان می‌دهد که افراد معمولاً دو نوع ذهنیت دارند: ذهنیت ثابت و ذهنیت رشد. کسانی که ذهنیت ثابت دارند فکر می‌کنند توانایی‌هایشان تغییر نمی‌کند، اما کسانی که ذهنیت رشد دارند باور دارند که می‌توانند با تلاش و یادگیری پیشرفت کنند. این تفاوت نگرش تأثیر بزرگی بر موفقیت، یادگیری و زندگی انسان دارد.",
  },
  {
    title: "اصل‌گرایی — گرگ مک‌کیون",
    text: "اصل‌گرایی درباره تمرکز بر مهم‌ترین چیزها در زندگی است. در دنیایی که پر از انتخاب‌ها و درخواست‌های مختلف است، بسیاری از افراد وقت و انرژی خود را صرف کارهایی می‌کنند که واقعاً مهم نیستند. این کتاب نشان می‌دهد چگونه می‌توان با حذف کارهای غیرضروری، تمرکز خود را بر مهم‌ترین اولویت‌ها قرار داد. اصل‌گرایی یعنی انجام کارهای کمتر، اما با کیفیت بیشتر.",
  },
  {
    title: "بیندیشید و ثروتمند شوید — ناپلئون هیل",
    text: "این کتاب یکی از مشهورترین کتاب‌های موفقیت در جهان است. ناپلئون هیل پس از سال‌ها مطالعه زندگی افراد موفق، اصول مشترک موفقیت را در این کتاب جمع‌آوری کرده است. او معتقد است افکار، باورها و نگرش انسان نقش مهمی در شکل‌گیری موفقیت دارند. کتاب درباره قدرت هدف، پشتکار، ایمان به خود و برنامه‌ریزی صحبت می‌کند.",
  },
  {
    title: "قدرت عادت — چارلز دوهیگ",
    text: "این کتاب درباره این است که چگونه عادت‌ها زندگی انسان را شکل می‌دهند. چارلز دوهیگ توضیح می‌دهد که عادت‌ها از سه بخش تشکیل شده‌اند: نشانه، رفتار و پاداش. با شناخت این چرخه می‌توان عادت‌های بد را تغییر داد و عادت‌های جدید ایجاد کرد. این کتاب با مثال‌های واقعی از زندگی افراد و شرکت‌ها نشان می‌دهد که چگونه عادت‌ها می‌توانند زندگی را تغییر دهند.",
  },
];

export default function BooksThatChangeLifeArticle() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#4a2f22] via-[#f3d6ad] to-[#fff8ef] text-[#4a2f22]"
    >
      {/* Hero */}
      <section className="px-6 md:px-12 pt-16 pb-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] bg-[#fff8ef]/95 border border-[#d8a866] p-6 md:p-8 shadow-xl shadow-[#4a2f22]/20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8a5a35] border border-[#c89452] text-[#fff4e6] text-sm font-semibold mb-6">
              <BookOpen className="w-4 h-4" />
              کتاب و یادگیری
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold leading-[1.8] text-[#3b2418]">
              کتاب‌هایی که زندگی انسان را تغییر می‌دهند
            </h1>

            <p className="mt-6 text-sm md:text-lg leading-9 text-[#6b442e] max-w-2xl">
              بعضی کتاب‌ها فقط اطلاعات می‌دهند، اما بعضی کتاب‌ها طرز فکر انسان را تغییر می‌دهند.
              این کتاب‌ها باعث می‌شوند دنیا را متفاوت ببینیم، تصمیم‌های عمیق‌تری بگیریم و مسیر زندگی‌مان را آگاهانه‌تر انتخاب کنیم.
            </p>
          </motion.div>

          <ArticleImage src={heroImg} alt="تصویر کتابخانه یا میز مطالعه" />
        </div>
      </section>

      {/* Brain and reading */}
      <section className="px-6 md:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            icon={<Brain className="w-4 h-4" />}
            title="چرا کتاب خواندن مغز انسان را تغییر می‌دهد"
            subtitle="مطالعه یکی از قدرتمندترین ابزارهای رشد ذهنی و فکری انسان است"
          />

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <InfoCard title="اثر مطالعه بر مغز">
              <p>
                زمانی که کتاب می‌خوانیم، مغز ما در حال انجام فعالیت‌های پیچیده‌ای است.
                بخش‌هایی از مغز که مربوط به زبان، تخیل، حافظه و تحلیل هستند به طور همزمان فعال می‌شوند.
              </p>

              <p>
                تحقیقات نشان می‌دهد مطالعه منظم می‌تواند توانایی تمرکز، قدرت تحلیل و حتی همدلی انسان را افزایش دهد.
              </p>

              <p>
                به همین دلیل بسیاری از متفکران بزرگ تاریخ، مطالعه روزانه را یکی از مهم‌ترین عادت‌های زندگی خود می‌دانستند.
              </p>
            </InfoCard>

            <ArticleImage src={brainImg} alt="تصویر مغز در حال یادگیری" />
          </div>
        </div>
      </section>

      {/* Transformative books */}
      <section className="px-6 md:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            icon={<Lightbulb className="w-4 h-4" />}
            title="کتاب‌هایی که می‌توانند زندگی انسان را تغییر دهند"
            subtitle="بعضی کتاب‌ها فقط خوانده نمی‌شوند؛ در ذهن می‌مانند و در تصمیم‌ها و نگاه انسان اثر می‌گذارند"
          />

          <div className="grid md:grid-cols-2 gap-6">
            {books.map((book) => (
              <InfoCard key={book.title} title={book.title}>
                <p>{book.text}</p>
              </InfoCard>
            ))}
          </div>
        </div>
      </section>

      {/* Reading method */}
      <section className="px-6 md:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            icon={<Target className="w-4 h-4" />}
            title="روش درست کتاب خواندن"
            subtitle="کتاب خواندن فقط تمام کردن صفحات نیست؛ مهم این است که مطالب وارد فکر و زندگی انسان شوند"
          />

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <ArticleImage src={deepReadingImg} alt="مطالعه عمیق" />

            <InfoCard title="چگونه بهتر کتاب بخوانیم؟">
              <p>
                خیلی از افراد کتاب می‌خوانند اما بعد از مدتی بخش زیادی از آن را فراموش می‌کنند.
                دلیلش این است که مطالعه را به‌صورت فعال انجام نمی‌دهند.
                کتاب‌خوانی عمیق یعنی هنگام مطالعه، ذهن درگیر شود، سوال بپرسد، مقایسه کند و به مطالب فکر کند.
              </p>

              <p>
                بهتر است به‌جای این‌که فقط تعداد زیادی کتاب بخوانیم، کتاب‌های مهم‌تر را با کیفیت بیشتری بخوانیم.
                حتی یک کتاب خوب اگر درست خوانده شود، می‌تواند اثرش از ده‌ها کتاب سطحی بیشتر باشد.
              </p>

              <p>برای مطالعه بهتر:</p>

              <ul className="list-disc pr-5 space-y-2">
                <li>با هدف مشخص کتاب بخوان</li>
                <li>بخش‌های مهم را علامت بزن</li>
                <li>بعد از هر فصل کمی مکث کن و فکر کن</li>
                <li>مطالب را با زندگی خودت مقایسه کن</li>
                <li>اگر لازم بود بعضی فصل‌ها را دوباره بخوان</li>
              </ul>
            </InfoCard>
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="px-6 md:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            icon={<NotebookPen className="w-4 h-4" />}
            title="روش یادداشت‌برداری از کتاب"
            subtitle="یادداشت‌برداری باعث می‌شود کتاب فقط خوانده نشود، بلکه در ذهن تثبیت شود"
          />

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <InfoCard title="چرا باید از کتاب یادداشت برداشت؟">
              <p>
                وقتی از کتاب یادداشت برمی‌داری، مغز مجبور می‌شود مطالب را دوباره پردازش کند.
                این کار باعث فهم بهتر، یادآوری بیشتر و استفاده عملی‌تر از آموخته‌ها می‌شود.
              </p>

              <p>لازم نیست همه چیز را بنویسی. فقط نکته‌هایی را ثبت کن که:</p>

              <ul className="list-disc pr-5 space-y-2">
                <li>خیلی مهم هستند</li>
                <li>روی تو اثر گذاشته‌اند</li>
                <li>می‌توانی در زندگی استفاده کنی</li>
                <li>باعث شده‌اند نگاهت تغییر کند</li>
              </ul>

              <p>بهترین مدل یادداشت‌برداری برای بیشتر افراد این است که:</p>

              <ul className="list-disc pr-5 space-y-2">
                <li>نام کتاب و نویسنده را بنویسند</li>
                <li>جملات مهم را ثبت کنند</li>
                <li>برداشت شخصی خودشان را کنار آن بنویسند</li>
                <li>ایده‌های قابل اجرا را جدا کنند</li>
              </ul>
            </InfoCard>

            <ArticleImage src={notesImg} alt="دفترچه یادداشت و کتاب" />
          </div>
        </div>
      </section>

      {/* Quotes */}
      <section className="px-6 md:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            icon={<Quote className="w-4 h-4" />}
            title="نقل قول‌های الهام‌بخش درباره کتاب"
            subtitle="بعضی جمله‌ها خودشان به‌تنهایی می‌توانند انسان را به مطالعه و رشد دعوت کنند"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <InfoCard title="نقل قول ۱">
              <p>
                کسی که کتاب می‌خواند، هزار زندگی را تجربه می‌کند؛
                اما کسی که نمی‌خواند، فقط یک زندگی را می‌شناسد.
              </p>
            </InfoCard>

            <InfoCard title="نقل قول ۲">
              <p>
                کتاب‌ها آرام حرف می‌زنند، اما می‌توانند عمیق‌ترین تغییرات را در ذهن انسان ایجاد کنند.
              </p>
            </InfoCard>

            <InfoCard title="نقل قول ۳">
              <p>
                مطالعه، گفت‌وگوی خاموش انسان با بزرگ‌ترین ذهن‌های تاریخ است.
              </p>
            </InfoCard>

            <InfoCard title="نقل قول ۴">
              <p>
                گاهی یک کتاب، درست در زمان درست، می‌تواند مسیر زندگی انسان را عوض کند.
              </p>
            </InfoCard>
          </div>
        </div>
      </section>

      {/* Best time */}
      <section className="px-6 md:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            icon={<Clock className="w-4 h-4" />}
            title="بهترین زمان برای مطالعه"
            subtitle="زمان درست مطالعه برای هر انسان می‌تواند متفاوت باشد، اما مهم این است که مطالعه به یک عادت منظم تبدیل شود"
          />

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <ArticleImage src={timeImg} alt="زمان مناسب برای مطالعه" />

            <InfoCard title="چه زمانی کتاب بخوانیم؟">
              <p>
                بعضی افراد صبح‌ها بهترین تمرکز را دارند و بعضی شب‌ها.
                مهم‌تر از خود ساعت، این است که مطالعه در زمانی انجام شود که ذهن نسبتاً آرام باشد و مزاحمت کمتری وجود داشته باشد.
              </p>

              <p>برای خیلی از افراد این زمان‌ها مناسب است:</p>

              <ul className="list-disc pr-5 space-y-2">
                <li>صبح زود قبل از شروع کارهای روزانه</li>
                <li>عصر در یک زمان خلوت و آرام</li>
                <li>شب قبل از خواب، به شرطی که کتاب خیلی هیجانی نباشد</li>
              </ul>

              <p>
                اگر هر روز حتی ۲۰ تا ۳۰ دقیقه مطالعه منظم داشته باشی، در طول چند ماه نتیجه شگفت‌انگیزی می‌بینی.
              </p>
            </InfoCard>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="px-6 md:px-12 pt-10 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#4a2f22] via-[#8a5a35] to-[#c89452] text-white p-8 md:p-12 shadow-lg text-center">
            <div className="text-4xl mb-4">📚</div>

            <h2 className="text-2xl md:text-4xl font-extrabold mb-6">
              کتاب فقط مجموعه‌ای از کلمات نیست
            </h2>

            <p className="text-sm md:text-lg leading-9 max-w-3xl mx-auto text-[#fff4e6]">
              بعضی کتاب‌ها به انسان کمک می‌کنند خودش را بهتر بشناسد،
              عمیق‌تر فکر کند، تصمیم‌های بهتری بگیرد و با آگاهی بیشتری زندگی کند.
              برای کسی که اهل رشد است، کتاب فقط سرگرمی نیست؛
              یک راه برای ساختن نسخه‌ای عمیق‌تر، پخته‌تر و روشن‌تر از خویش است.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}