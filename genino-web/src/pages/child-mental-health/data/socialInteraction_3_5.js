export const socialInteraction_3_5 = {
  title: "پایش تعامل اجتماعی کودک",
  ageRange: "۳ تا ۵ سال",
  intro: `
در این پایش، ژنینو به شما کمک می‌کند نحوهٔ تعامل اجتماعی کودک خود را
در موقعیت‌های روزمره بهتر مشاهده و درک کنید.

در این سن، مهارت‌های اجتماعی به‌تدریج و از طریق تجربه، الگوگیری و
تعامل با بزرگسالان و همسالان شکل می‌گیرند.
این پایش ابزاری آموزشی برای والدین است و جنبهٔ تشخیصی ندارد.
`,

  steps: [
    {
      key: "eyeContact",
      title: "تماس چشمی و توجه مشترک",
      image: "/images/assessments/social/eye-contact.jpg",
      why:
        "تماس چشمی و توجه مشترک پایهٔ تعامل اجتماعی و ارتباط مؤثر در کودکان خردسال است.",
      example:
        "مثلاً وقتی کودک به چیزی اشاره می‌کند و همزمان به چهرهٔ والد نگاه می‌کند.",
      questions: [
        { label: "به‌طور طبیعی تماس چشمی برقرار می‌کند", value: "good" },
        { label: "گاهی تماس چشمی دارد", value: "medium" },
        { label: "به‌ندرت تماس چشمی برقرار می‌کند", value: "low" },
      ],
      reactions: {
        good:
          "این نشانهٔ خوبی از شکل‌گیری تعامل اجتماعی سالم است.",
        medium:
          "طبیعی است. بازی‌های رو‌در‌رو و گفت‌وگوهای کوتاه می‌توانند کمک‌کننده باشند.",
        low:
          "کاهش حواس‌پرتی محیط و بازی‌های تعاملی ساده توصیه می‌شود.",
      },
    },

    {
      key: "parallelPlay",
      title: "بازی موازی و تعاملی",
      image: "/images/assessments/social/parallel-play.jpg",
      why:
        "در سنین ۳ تا ۵ سال، کودکان از بازی موازی به‌تدریج به بازی تعاملی حرکت می‌کنند.",
      example:
        "مثلاً دو کودک کنار هم بازی می‌کنند و کم‌کم با هم صحبت یا تعامل می‌کنند.",
      questions: [
        { label: "با دیگر کودکان تعامل دارد", value: "good" },
        { label: "بیشتر بازی موازی انجام می‌دهد", value: "medium" },
        { label: "ترجیح می‌دهد تنها بازی کند", value: "low" },
      ],
      reactions: {
        good:
          "این رفتار متناسب با رشد اجتماعی کودک است.",
        medium:
          "طبیعی است. فراهم کردن فرصت‌های بازی گروهی کوتاه مفید است.",
        low:
          "شروع تعامل با همراهی والد می‌تواند به کودک احساس امنیت بدهد.",
      },
    },

    {
      key: "turnTaking",
      title: "نوبت‌گیری در بازی",
      image: "/images/assessments/social/turn-taking.jpg",
      why:
        "نوبت‌گیری مهارتی کلیدی در تعامل اجتماعی و یادگیری قوانین ارتباطی است.",
      example:
        "مثلاً منتظر ماندن برای نوبت در یک بازی ساده.",
      questions: [
        { label: "معمولاً نوبت را رعایت می‌کند", value: "good" },
        { label: "گاهی نوبت را رعایت می‌کند", value: "medium" },
        { label: "به‌سختی نوبت را می‌پذیرد", value: "low" },
      ],
      reactions: {
        good:
          "این مهارت نشانهٔ رشد اجتماعی مناسب است.",
        medium:
          "تمرین نوبت‌گیری در بازی‌های کوتاه می‌تواند کمک‌کننده باشد.",
        low:
          "در این سن طبیعی است. استفاده از بازی‌های نوبتی ساده توصیه می‌شود.",
      },
    },

    {
      key: "empathy",
      title: "واکنش به احساسات دیگران",
      image: "/images/assessments/social/empathy.jpg",
      why:
        "درک احساسات دیگران پایهٔ همدلی و تعامل اجتماعی سالم است.",
      example:
        "مثلاً وقتی کودک متوجه ناراحتی دوستش می‌شود.",
      questions: [
        { label: "به احساسات دیگران واکنش نشان می‌دهد", value: "good" },
        { label: "گاهی واکنش نشان می‌دهد", value: "medium" },
        { label: "معمولاً متوجه احساسات دیگران نمی‌شود", value: "low" },
      ],
      reactions: {
        good:
          "این نشانهٔ خوبی از رشد همدلی در کودک است.",
        medium:
          "نام‌گذاری احساسات دیگران توسط والد می‌تواند کمک‌کننده باشد.",
        low:
          "همدلی مهارتی اکتسابی است و با الگوگیری تقویت می‌شود.",
      },
    },
  ],

  sources: [
    {
      title: "CDC – Social and Emotional Development",
      link: "https://www.cdc.gov/ncbddd/childdevelopment",
    },
    {
      title: "American Academy of Pediatrics – Social Skills",
      link: "https://www.healthychildren.org",
    },
    {
      title: "Harvard Center on the Developing Child – Serve and Return",
      link: "https://developingchild.harvard.edu/science/key-concepts/serve-and-return/",
    },
    {
      title: "Zero to Three – Social Development in Early Childhood",
      link: "https://www.zerotothree.org",
    },
  ],
};
