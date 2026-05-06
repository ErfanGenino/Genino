const foodData = {
 صبحانه: [
  { name: "پنیر سفید", unit: "1 قوطی کبریت", grams: 30, calories: 80 },
  { name: "پنیر کم‌چرب", unit: "1 قوطی کبریت", grams: 30, calories: 55 },
  { name: "پنیر کم‌نمک", unit: "1 قوطی کبریت", grams: 30, calories: 75 },
  { name: "پنیر خامه‌ای", unit: "1 قوطی کبریت", grams: 30, calories: 105 },
  { name: "پنیر تبریز", unit: "1 قوطی کبریت", grams: 30, calories: 90 },
  { name: "پنیر لاکتیکی", unit: "1 قوطی کبریت", grams: 30, calories: 85 },

  { name: "کره", unit: "1 قوطی کبریت کوچک", grams: 15, calories: 110 },
  { name: "کره", unit: "1 قاشق چای‌خوری", grams: 5, calories: 35 },
  { name: "کره بادام‌زمینی", unit: "1 قاشق غذاخوری", grams: 15, calories: 90 },

  { name: "تخم‌مرغ آب‌پز", unit: "1 عدد", grams: 50, calories: 78 },
  { name: "نیمرو", unit: "1 عدد", grams: 60, calories: 120 },
  { name: "املت گوجه", unit: "1 قاشق غذاخوری", grams: 40, calories: 45 },
  { name: "املت قارچ", unit: "1 قاشق غذاخوری", grams: 40, calories: 50 },
  { name: "املت سبزیجات", unit: "1 قاشق غذاخوری", grams: 40, calories: 40 },
  { name: "خاگینه ساده", unit: "1 تکه متوسط", grams: 80, calories: 180 },

  { name: "نان سنگک", unit: "1 کف دست", grams: 30, calories: 75 },
  { name: "نان بربری", unit: "1 کف دست", grams: 30, calories: 80 },
  { name: "نان تافتون", unit: "1 کف دست", grams: 30, calories: 75 },
  { name: "نان لواش", unit: "1 کف دست", grams: 20, calories: 55 },
  { name: "نان تست", unit: "1 برش", grams: 25, calories: 70 },
  { name: "نان جو", unit: "1 کف دست", grams: 30, calories: 70 },

  { name: "عسل", unit: "1 قاشق مرباخوری", grams: 10, calories: 30 },
  { name: "مربای هویج", unit: "1 قاشق مرباخوری", grams: 15, calories: 40 },
  { name: "مربای آلبالو", unit: "1 قاشق مرباخوری", grams: 15, calories: 38 },
  { name: "مربای توت‌فرنگی", unit: "1 قاشق مرباخوری", grams: 15, calories: 40 },
  { name: "شیره انگور", unit: "1 قاشق مرباخوری", grams: 12, calories: 35 },
  { name: "ارده", unit: "1 قاشق غذاخوری", grams: 15, calories: 90 },
  { name: "ارده و شیره", unit: "1 قاشق غذاخوری", grams: 20, calories: 95 },

  { name: "گردو", unit: "1 عدد", grams: 8, calories: 50 },
  { name: "بادام", unit: "5 عدد", grams: 6, calories: 35 },
  { name: "پسته", unit: "10 عدد", grams: 10, calories: 55 },
  { name: "خرما", unit: "1 عدد", grams: 10, calories: 25 },

  { name: "شیر کم‌چرب", unit: "1 لیوان", grams: 240, calories: 110 },
  { name: "شیر پرچرب", unit: "1 لیوان", grams: 240, calories: 150 },
  { name: "ماست ساده", unit: "1 پیاله کوچک", grams: 150, calories: 90 },
  { name: "ماست یونانی", unit: "1 پیاله کوچک", grams: 150, calories: 130 },

  { name: "چای بدون قند", unit: "1 لیوان", grams: 200, calories: 0 },
  { name: "چای شیرین", unit: "1 لیوان", grams: 200, calories: 45 },
  { name: "قهوه ساده", unit: "1 فنجان", grams: 150, calories: 5 },
  { name: "نسکافه با شیر", unit: "1 لیوان", grams: 240, calories: 120 },
  { name: "آب پرتقال طبیعی", unit: "1 لیوان", grams: 240, calories: 110 },

  { name: "خیار", unit: "1 عدد متوسط", grams: 100, calories: 15 },
  { name: "گوجه‌فرنگی", unit: "1 عدد متوسط", grams: 100, calories: 18 },
  { name: "زیتون", unit: "5 عدد", grams: 20, calories: 30 },
],

 ناهار: [
  // 🍚 برنج ساده و پایه
  { name: "برنج سفید پخته", unit: "1 قاشق غذاخوری", grams: 25, calories: 32 },
  { name: "برنج کته", unit: "1 قاشق غذاخوری", grams: 25, calories: 34 },
  { name: "برنج آبکش", unit: "1 قاشق غذاخوری", grams: 25, calories: 33 },
  { name: "برنج قهوه‌ای", unit: "1 قاشق غذاخوری", grams: 25, calories: 28 },
  { name: "برنج زعفرانی", unit: "1 قاشق غذاخوری", grams: 25, calories: 35 },

  // 🍛 پلوهای ایرانی
  { name: "عدس‌پلو", unit: "1 قاشق غذاخوری", grams: 30, calories: 45 },
  { name: "لوبیاپلو", unit: "1 قاشق غذاخوری", grams: 30, calories: 48 },
  { name: "باقالی‌پلو", unit: "1 قاشق غذاخوری", grams: 30, calories: 42 },
  { name: "زرشک‌پلو", unit: "1 قاشق غذاخوری", grams: 30, calories: 50 },
  { name: "سبزی‌پلو", unit: "1 قاشق غذاخوری", grams: 30, calories: 40 },
  { name: "شویدپلو", unit: "1 قاشق غذاخوری", grams: 30, calories: 42 },
  { name: "رشته‌پلو", unit: "1 قاشق غذاخوری", grams: 30, calories: 55 },
  { name: "کلم‌پلو", unit: "1 قاشق غذاخوری", grams: 30, calories: 48 },
  { name: "هویج‌پلو", unit: "1 قاشق غذاخوری", grams: 30, calories: 52 },
  { name: "آلبالوپلو", unit: "1 قاشق غذاخوری", grams: 30, calories: 55 },
  { name: "مرصع‌پلو", unit: "1 قاشق غذاخوری", grams: 30, calories: 60 },
  { name: "ته‌چین", unit: "1 قاشق غذاخوری", grams: 35, calories: 75 },

  // 🧈 ته‌دیگ
  { name: "ته‌دیگ نان", unit: "1 تکه کوچک", grams: 20, calories: 90 },
  { name: "ته‌دیگ سیب‌زمینی", unit: "1 تکه کوچک", grams: 25, calories: 110 },
  { name: "ته‌دیگ برنج", unit: "1 تکه کوچک", grams: 25, calories: 120 },

  // 🥘 خورش‌ها
  { name: "خورش قورمه‌سبزی", unit: "1 قاشق غذاخوری", grams: 25, calories: 38 },
  { name: "خورش قیمه", unit: "1 قاشق غذاخوری", grams: 25, calories: 42 },
  { name: "خورش قیمه بادمجان", unit: "1 قاشق غذاخوری", grams: 25, calories: 45 },
  { name: "خورش فسنجان", unit: "1 قاشق غذاخوری", grams: 25, calories: 65 },
  { name: "خورش کرفس", unit: "1 قاشق غذاخوری", grams: 25, calories: 32 },
  { name: "خورش بادمجان", unit: "1 قاشق غذاخوری", grams: 25, calories: 40 },
  { name: "خورش آلو اسفناج", unit: "1 قاشق غذاخوری", grams: 25, calories: 38 },
  { name: "خورش مرغ", unit: "1 قاشق غذاخوری", grams: 30, calories: 45 },

  // 🍢 کباب و پروتئین
  { name: "کباب کوبیده", unit: "1 تکه کوچک", grams: 40, calories: 110 },
  { name: "کباب برگ", unit: "1 تکه", grams: 40, calories: 85 },
  { name: "جوجه‌کباب", unit: "1 تکه", grams: 35, calories: 65 },
  { name: "کباب بختیاری", unit: "1 تکه", grams: 40, calories: 80 },
  { name: "کباب تابه‌ای", unit: "1 تکه", grams: 50, calories: 120 },
  { name: "مرغ پخته", unit: "1 تکه متوسط", grams: 80, calories: 150 },
  { name: "مرغ گریل", unit: "1 تکه متوسط", grams: 80, calories: 135 },
  { name: "ماهی سرخ‌شده", unit: "1 تکه متوسط", grams: 100, calories: 220 },
  { name: "ماهی گریل", unit: "1 تکه متوسط", grams: 100, calories: 160 },
  { name: "گوشت پخته", unit: "1 تکه متوسط", grams: 80, calories: 200 },

  // 🏠 غذاهای خانگی
  { name: "کتلت", unit: "1 عدد متوسط", grams: 80, calories: 200 },
  { name: "کوکو سبزی", unit: "1 برش متوسط", grams: 80, calories: 180 },
  { name: "کوکو سیب‌زمینی", unit: "1 عدد متوسط", grams: 80, calories: 190 },
  { name: "دلمه برگ مو", unit: "1 عدد", grams: 50, calories: 90 },
  { name: "دلمه فلفل", unit: "1 عدد متوسط", grams: 150, calories: 220 },
  { name: "ماکارونی ایرانی", unit: "1 قاشق غذاخوری", grams: 30, calories: 45 },
  { name: "سالاد الویه", unit: "1 قاشق غذاخوری", grams: 30, calories: 55 },
  { name: "کشک بادمجان", unit: "1 قاشق غذاخوری", grams: 30, calories: 50 },
  { name: "میرزاقاسمی", unit: "1 قاشق غذاخوری", grams: 30, calories: 42 },

  // 🍞 نان‌ها
  { name: "نان سنگک", unit: "1 کف دست", grams: 30, calories: 75 },
  { name: "نان بربری", unit: "1 کف دست", grams: 30, calories: 80 },
  { name: "نان تافتون", unit: "1 کف دست", grams: 30, calories: 75 },
  { name: "نان لواش", unit: "1 کف دست", grams: 20, calories: 55 },
  { name: "نان جو", unit: "1 کف دست", grams: 30, calories: 70 },

  // 🥗 سالاد، پیش‌غذا و کنار غذا
  { name: "سالاد شیرازی", unit: "1 پیاله کوچک", grams: 150, calories: 60 },
  { name: "سالاد فصل بدون سس", unit: "1 بشقاب کوچک", grams: 150, calories: 70 },
  { name: "سالاد فصل با سس", unit: "1 بشقاب کوچک", grams: 180, calories: 180 },
  { name: "سالاد کاهو", unit: "1 بشقاب کوچک", grams: 150, calories: 45 },
  { name: "ماست ساده", unit: "1 پیاله کوچک", grams: 150, calories: 90 },
  { name: "ماست و خیار", unit: "1 پیاله کوچک", grams: 150, calories: 100 },
  { name: "ماست موسیر", unit: "1 پیاله کوچک", grams: 150, calories: 120 },
  { name: "زیتون", unit: "5 عدد", grams: 20, calories: 30 },
  { name: "زیتون پرورده", unit: "1 قاشق غذاخوری", grams: 25, calories: 70 },
  { name: "ترشی", unit: "1 قاشق غذاخوری", grams: 20, calories: 10 },
  { name: "سوپ جو", unit: "1 کاسه", grams: 250, calories: 180 },
  { name: "سوپ سبزیجات", unit: "1 کاسه", grams: 250, calories: 120 },

  // 🍕 فست‌فود
  { name: "پیتزا مخلوط", unit: "1 برش", grams: 120, calories: 300 },
  { name: "پیتزا پپرونی", unit: "1 برش", grams: 120, calories: 340 },
  { name: "پیتزا مرغ و قارچ", unit: "1 برش", grams: 120, calories: 310 },
  { name: "همبرگر", unit: "1 عدد", grams: 220, calories: 550 },
  { name: "چیزبرگر", unit: "1 عدد", grams: 240, calories: 650 },
  { name: "دوبل برگر", unit: "1 عدد", grams: 300, calories: 850 },
  { name: "ساندویچ مرغ", unit: "1 عدد", grams: 220, calories: 450 },
  { name: "ساندویچ بندری", unit: "1 عدد", grams: 220, calories: 520 },
  { name: "ساندویچ فلافل", unit: "1 عدد", grams: 220, calories: 500 },
  { name: "هات‌داگ", unit: "1 عدد", grams: 200, calories: 480 },
  { name: "سیب‌زمینی سرخ‌کرده", unit: "1 بسته متوسط", grams: 150, calories: 450 },
  { name: "ناگت مرغ", unit: "6 عدد", grams: 120, calories: 320 },

  // 🍝 غذاهای فرنگی
  { name: "پاستا آلفردو", unit: "1 بشقاب متوسط", grams: 350, calories: 750 },
  { name: "پاستا بلونز", unit: "1 بشقاب متوسط", grams: 350, calories: 650 },
  { name: "لازانیا", unit: "1 تکه متوسط", grams: 250, calories: 520 },
  { name: "استیک گوشت", unit: "1 وعده متوسط", grams: 250, calories: 600 },
  { name: "استیک مرغ", unit: "1 وعده متوسط", grams: 250, calories: 420 },
  { name: "سالاد سزار با مرغ", unit: "1 بشقاب", grams: 300, calories: 450 },
  { name: "سوشی", unit: "6 عدد", grams: 180, calories: 300 },

  // 🍗 سوخاری و شنیسل
  { name: "مرغ سوخاری", unit: "1 تکه متوسط", grams: 120, calories: 320 },
  { name: "فیله مرغ سوخاری", unit: "1 عدد", grams: 80, calories: 210 },
  { name: "بال سوخاری", unit: "1 عدد", grams: 50, calories: 150 },
  { name: "کتف سوخاری", unit: "1 عدد", grams: 60, calories: 170 },
  { name: "شنیسل مرغ", unit: "1 تکه متوسط", grams: 150, calories: 360 },
  { name: "شنیسل گوشت", unit: "1 تکه متوسط", grams: 150, calories: 420 },
  { name: "ماهی سوخاری", unit: "1 تکه متوسط", grams: 120, calories: 300 },

  // 🦐 غذاهای دریایی
  { name: "میگو پخته", unit: "5 عدد متوسط", grams: 80, calories: 90 },
  { name: "میگو گریل", unit: "5 عدد متوسط", grams: 80, calories: 110 },
  { name: "میگو سوخاری", unit: "5 عدد متوسط", grams: 100, calories: 250 },
  { name: "قلیه ماهی", unit: "1 قاشق غذاخوری", grams: 30, calories: 45 },
  { name: "ماهی قزل‌آلا گریل", unit: "1 تکه متوسط", grams: 120, calories: 220 },
  { name: "ماهی قزل‌آلا سرخ‌شده", unit: "1 تکه متوسط", grams: 120, calories: 300 },
  { name: "ماهی تن", unit: "1 قاشق غذاخوری", grams: 25, calories: 45 },
  { name: "تن ماهی", unit: "1 قاشق غذاخوری", grams: 25, calories: 55 },
  { name: "ماهی سالمون گریل", unit: "1 تکه متوسط", grams: 120, calories: 250 },
  { name: "ماهی شیر", unit: "1 تکه متوسط", grams: 120, calories: 210 },
  { name: "کباب ماهی", unit: "1 سیخ", grams: 150, calories: 260 },

  // 🥤 نوشیدنی‌ها
  { name: "دوغ", unit: "1 لیوان", grams: 240, calories: 80 },
  { name: "دوغ کم‌نمک", unit: "1 لیوان", grams: 240, calories: 60 },
  { name: "نوشابه معمولی", unit: "1 لیوان", grams: 240, calories: 100 },
  { name: "نوشابه رژیمی", unit: "1 لیوان", grams: 240, calories: 0 },
  { name: "آبمیوه صنعتی", unit: "1 لیوان", grams: 240, calories: 120 },
  { name: "آب", unit: "1 لیوان", grams: 240, calories: 0 },

  // 🍮 دسرها
  { name: "ژله", unit: "1 پیاله کوچک", grams: 120, calories: 90 },
  { name: "بستنی", unit: "1 اسکوپ", grams: 60, calories: 140 },
  { name: "فرنی", unit: "1 پیاله کوچک", grams: 150, calories: 180 },
  { name: "شله‌زرد", unit: "1 پیاله کوچک", grams: 150, calories: 220 },
  { name: "کیک ساده", unit: "1 برش کوچک", grams: 60, calories: 220 },

  // 🍽 غذاهای کامل پرسی برای انتخاب سریع
  { name: "چلوکباب کوبیده", unit: "1 پرس متوسط", grams: 350, calories: 850 },
  { name: "چلوکباب برگ", unit: "1 پرس متوسط", grams: 350, calories: 780 },
  { name: "جوجه‌کباب با برنج", unit: "1 پرس متوسط", grams: 350, calories: 700 },
  { name: "زرشک‌پلو با مرغ", unit: "1 پرس متوسط", grams: 400, calories: 750 },
  { name: "قورمه‌سبزی با برنج", unit: "1 پرس متوسط", grams: 400, calories: 680 },
  { name: "قیمه با برنج", unit: "1 پرس متوسط", grams: 400, calories: 720 },
  { name: "فسنجان با برنج", unit: "1 پرس متوسط", grams: 400, calories: 850 },
  { name: "باقالی‌پلو با گوشت", unit: "1 پرس متوسط", grams: 420, calories: 900 },
],

    شام: [],
  "میان‌وعده": [
  // 🍎 میوه‌ها
  { name: "سیب", unit: "1 عدد متوسط", grams: 150, calories: 80 },
  { name: "موز", unit: "1 عدد متوسط", grams: 120, calories: 105 },
  { name: "پرتقال", unit: "1 عدد متوسط", grams: 130, calories: 65 },
  { name: "نارنگی", unit: "1 عدد", grams: 100, calories: 50 },
  { name: "هندوانه", unit: "1 برش", grams: 250, calories: 75 },
  { name: "خربزه", unit: "1 برش", grams: 200, calories: 70 },
  { name: "انگور", unit: "1 خوشه کوچک", grams: 100, calories: 70 },
  { name: "هلو", unit: "1 عدد", grams: 120, calories: 60 },
  { name: "گلابی", unit: "1 عدد", grams: 140, calories: 85 },
  { name: "کیوی", unit: "1 عدد", grams: 75, calories: 45 },
  { name: "انار", unit: "1 پیاله", grams: 150, calories: 90 },
  { name: "آناناس", unit: "1 برش", grams: 100, calories: 50 },

  // 🍰 شیرینی و کیک
  { name: "کیک ساده", unit: "1 برش", grams: 60, calories: 220 },
  { name: "کیک شکلاتی", unit: "1 برش", grams: 70, calories: 280 },
  { name: "کیک خامه‌ای", unit: "1 برش", grams: 90, calories: 350 },
  { name: "شیرینی تر", unit: "1 عدد", grams: 50, calories: 180 },
  { name: "شیرینی خشک", unit: "1 عدد", grams: 20, calories: 90 },
  { name: "دانمارکی", unit: "1 عدد", grams: 80, calories: 300 },
  { name: "کلوچه", unit: "1 عدد", grams: 60, calories: 240 },

  // 🍟 تنقلات
  { name: "چیپس", unit: "1 بسته کوچک", grams: 50, calories: 270 },
  { name: "پفک", unit: "1 بسته کوچک", grams: 50, calories: 260 },
  { name: "پاپ‌کورن ساده", unit: "1 لیوان", grams: 30, calories: 120 },
  { name: "پاپ‌کورن کره‌ای", unit: "1 لیوان", grams: 40, calories: 180 },
  { name: "شکلات", unit: "1 تکه", grams: 25, calories: 140 },
  { name: "شکلات تلخ", unit: "1 تکه", grams: 25, calories: 120 },
  { name: "بیسکویت ساده", unit: "2 عدد", grams: 30, calories: 150 },
  { name: "بیسکویت کرمدار", unit: "2 عدد", grams: 40, calories: 200 },

  // 🍦 بستنی و شیک
  { name: "بستنی وانیلی", unit: "1 اسکوپ", grams: 60, calories: 140 },
  { name: "بستنی شکلاتی", unit: "1 اسکوپ", grams: 60, calories: 160 },
  { name: "بستنی سنتی", unit: "1 اسکوپ", grams: 70, calories: 180 },
  { name: "بستنی قیفی", unit: "1 عدد", grams: 100, calories: 250 },
  { name: "میلک‌شیک شکلاتی", unit: "1 لیوان", grams: 300, calories: 400 },
  { name: "میلک‌شیک وانیلی", unit: "1 لیوان", grams: 300, calories: 350 },
  { name: "اسموتی میوه‌ای", unit: "1 لیوان", grams: 250, calories: 180 },

  // 🥤 نوشیدنی‌ها
  { name: "چای بدون قند", unit: "1 لیوان", grams: 200, calories: 0 },
  { name: "چای شیرین", unit: "1 لیوان", grams: 200, calories: 45 },
  { name: "قهوه ساده", unit: "1 فنجان", grams: 150, calories: 5 },
  { name: "قهوه با شیر", unit: "1 فنجان", grams: 200, calories: 90 },
  { name: "نسکافه", unit: "1 لیوان", grams: 200, calories: 80 },
  { name: "آبمیوه طبیعی", unit: "1 لیوان", grams: 240, calories: 110 },
  { name: "آبمیوه صنعتی", unit: "1 لیوان", grams: 240, calories: 120 },
  { name: "نوشابه", unit: "1 لیوان", grams: 240, calories: 100 },
  { name: "نوشابه رژیمی", unit: "1 لیوان", grams: 240, calories: 0 },

  // 🥜 آجیل‌ها
  { name: "بادام", unit: "10 عدد", grams: 12, calories: 70 },
  { name: "گردو", unit: "2 عدد", grams: 16, calories: 100 },
  { name: "پسته", unit: "15 عدد", grams: 15, calories: 90 },
  { name: "فندق", unit: "10 عدد", grams: 12, calories: 80 },
  { name: "بادام‌زمینی", unit: "1 مشت کوچک", grams: 30, calories: 170 },
  { name: "آجیل مخلوط", unit: "1 مشت", grams: 30, calories: 180 },

  // 🍔 اسنک و فینگر فود
  { name: "ساندویچ کوچک خانگی", unit: "1 عدد", grams: 120, calories: 250 },
  { name: "ساندویچ پنیر", unit: "1 عدد", grams: 100, calories: 220 },
  { name: "اسنک ژامبون", unit: "1 عدد", grams: 120, calories: 300 },
  { name: "اسنک مرغ", unit: "1 عدد", grams: 120, calories: 280 },
  { name: "نان و پنیر", unit: "1 وعده کوچک", grams: 100, calories: 200 },
  { name: "خرما و گردو", unit: "2 عدد خرما + 1 گردو", grams: 40, calories: 120 },
]
};

foodData.شام = foodData.ناهار;

export default foodData;