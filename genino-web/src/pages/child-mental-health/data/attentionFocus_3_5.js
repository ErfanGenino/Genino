export const attentionFocus_3_5 = {
  title: "پایش تمرکز و توجه کودک",
  ageRange: "۳ تا ۵ سال",
  intro: `
در این پایش، ژنینو به شما کمک می‌کند میزان تمرکز، توجه و پایداری ذهنی کودک
را در فعالیت‌های روزمره بهتر بشناسید.

در این سن، تمرکز کودک هنوز در حال شکل‌گیری است و نوسان توجه کاملاً طبیعی محسوب می‌شود.
هدف این پایش، آموزش والدین برای ایجاد محیط و تعامل مناسب جهت تقویت تمرکز کودک است،
نه تشخیص اختلال یا برچسب‌گذاری.
`,

  steps: [
    {
      key: "sustainedAttention",
      title: "ماندن روی یک فعالیت",
      image: "/images/assessments/attention/activity.jpg",
      why:
        "توجه پایدار یکی از اولین مهارت‌های شناختی است که در سنین ۳ تا ۵ سال به‌تدریج رشد می‌کند.",
      example:
        "مثلاً وقتی کودک مشغول پازل، نقاشی یا لگو است.",
      questions: [
        { label: "می‌تواند چند دقیقه بدون قطع شدن ادامه دهد", value: "good" },
        { label: "گاهی فعالیت را رها می‌کند", value: "medium" },
        { label: "خیلی زود کار را رها می‌کند", value: "low" },
      ],
      reactions: {
        good:
          "تمرکز کودک متناسب با سن اوست. ادامهٔ فعالیت‌های کوتاه و جذاب به تقویت این مهارت کمک می‌کند.",
        medium:
          "طبیعی است. بهتر است فعالیت‌ها کوتاه، متنوع و بدون فشار باشند.",
        low:
          "در این سن شایع است. کاهش حواس‌پرتی محیط و همراهی والد می‌تواند مؤثر باشد.",
      },
    },

    {
      key: "distraction",
      title: "حواس‌پرتی محیطی",
      image: "/images/assessments/attention/distraction.jpg",
      why:
        "کودکان خردسال به محرک‌های محیطی بسیار حساس هستند و فیلتر توجه هنوز کامل نشده است.",
      example:
        "مثلاً وقتی صدای تلویزیون، موبایل یا رفت‌وآمد اطراف باعث قطع فعالیت کودک می‌شود.",
      questions: [
        { label: "معمولاً حواسش پرت نمی‌شود", value: "low" },
        { label: "گاهی توجه‌اش منحرف می‌شود", value: "medium" },
        { label: "با کوچک‌ترین محرک تمرکزش از بین می‌رود", value: "high" },
      ],
      reactions: {
        low:
          "محیط کودک به‌خوبی تنظیم شده است. این الگو را حفظ کنید.",
        medium:
          "طبیعی است. حذف محرک‌های اضافی هنگام بازی یا آموزش توصیه می‌شود.",
        high:
          "کاهش صدا، نور و حضور صفحه‌نمایش‌ها به تمرکز کودک کمک می‌کند.",
      },
    },

    {
      key: "instructions",
      title: "پیروی از دستور ساده",
      image: "/images/assessments/attention/instructions.jpg",
      why:
        "پیروی از دستور یک یا دو مرحله‌ای نشانهٔ رشد توجه شنیداری و پردازش ذهنی است.",
      example:
        "مثلاً «اسباب‌بازی‌تو جمع کن و بیار اینجا».",
      questions: [
        { label: "دستور را به‌خوبی انجام می‌دهد", value: "good" },
        { label: "گاهی نیاز به تکرار دارد", value: "medium" },
        { label: "معمولاً دستور را دنبال نمی‌کند", value: "low" },
      ],
      reactions: {
        good:
          "توجه شنیداری کودک در مسیر رشد سالم است.",
        medium:
          "دستورها را کوتاه، واضح و همراه با تماس چشمی بیان کنید.",
        low:
          "تقسیم دستورها به بخش‌های کوچک‌تر می‌تواند کمک‌کننده باشد.",
      },
    },

    {
      key: "taskCompletion",
      title: "تمام کردن کار نیمه‌تمام",
      image: "/images/assessments/attention/completion.jpg",
      why:
        "توانایی به پایان رساندن فعالیت به رشد تمرکز و احساس موفقیت کودک کمک می‌کند.",
      example:
        "مثلاً کامل کردن یک نقاشی یا جمع کردن اسباب‌بازی‌ها.",
      questions: [
        { label: "اغلب کار را تمام می‌کند", value: "good" },
        { label: "گاهی کار را نیمه‌کاره رها می‌کند", value: "medium" },
        { label: "به‌ندرت فعالیت را کامل می‌کند", value: "low" },
      ],
      reactions: {
        good:
          "این نشانهٔ خوبی از پایداری توجه است.",
        medium:
          "تشویق فرایند (نه نتیجه) می‌تواند انگیزهٔ کودک را افزایش دهد.",
        low:
          "فعالیت‌ها را ساده‌تر و کوتاه‌تر انتخاب کنید تا حس موفقیت ایجاد شود.",
      },
    },
  ],

  sources: [
    {
      title: "Harvard Center on the Developing Child – Executive Function",
      link: "https://developingchild.harvard.edu/science/key-concepts/executive-function/",
    },
    {
      title: "CDC – Child Development (Attention & Learning)",
      link: "https://www.cdc.gov/ncbddd/childdevelopment",
    },
    {
      title: "American Academy of Pediatrics – Attention Development",
      link: "https://www.healthychildren.org",
    },
    {
      title: "Russell Barkley – Attention and Self-Regulation in Early Childhood",
      link: "https://www.russellbarkley.org",
    },
  ],
};
