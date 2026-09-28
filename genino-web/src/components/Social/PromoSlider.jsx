import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function PromoSlider({
  slides = [],
  variant = "neutral",
  interval = 5,
  height = "h-64",
  className = "",
  onIndexChange,
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [desktopPosition, setDesktopPosition] = useState(
  slides.length * 2 - 1
);
  const [desktopInstant, setDesktopInstant] =
    useState(false);
  const timeoutRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const navigate = useNavigate();

const handleSlideClick = () => {
  const currentSlide = slides[index];

  if (currentSlide?.link) {
    navigate(currentSlide.link);
  }
};

  useEffect(() => {
    if (!slides.length) return;
    scheduleNext();
    return () => clearTimeout(timeoutRef.current);
  }, [index, slides.length]);

  useEffect(() => {
    if (typeof onIndexChange === "function") {
    onIndexChange(index);
    }
  }, [index, onIndexChange]);

  useEffect(() => {
  if (!slides.length) return;

  setDesktopInstant(true);
  setDesktopPosition(slides.length * 2 - 1);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setDesktopInstant(false);
    });
  });
}, [slides.length]);

  const scheduleNext = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, interval * 1000);
  };

  const nextSlide = () => {
  if (!slides.length) return;

  setDirection(1);

  setIndex(
    (prev) =>
      (prev + 1) % slides.length
  );

  setDesktopPosition(
    (prev) => prev - 1
  );
};


const prevSlide = () => {
  if (!slides.length) return;

  setDirection(-1);

  setIndex(
    (prev) =>
      (prev - 1 + slides.length) %
      slides.length
  );

  setDesktopPosition(
    (prev) => prev + 1
  );
};

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const distance = touchEndX.current - touchStartX.current;
    if (Math.abs(distance) > 50) {
  if (distance > 0) nextSlide();
  else prevSlide();
}
  };

  const variants = {
  enter: (dir) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 1,
  }),

  center: {
    x: 0,
    opacity: 1,
  },

  exit: (dir) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 1,
  }),
};

  if (!slides.length) return null;

  const reversedSlides = [...slides].reverse();

const desktopSlides = [
  ...reversedSlides,
  ...reversedSlides,
  ...reversedSlides,
];

const DESKTOP_SLIDE_WIDTH = 640;
const DESKTOP_GAP = 4;

const DESKTOP_STEP =
  DESKTOP_SLIDE_WIDTH + DESKTOP_GAP;

const desktopX =
  -(
    desktopPosition * DESKTOP_STEP +
    DESKTOP_SLIDE_WIDTH / 2
  );



  return (
  <div
    className={`
      relative
      w-full
      select-none
      ${className}
    `}
    onTouchStart={handleTouchStart}
    onTouchEnd={handleTouchEnd}
  >
    {/* ================= MOBILE ================= */}
    <div
      className="
        relative
        w-full
        overflow-hidden

        sm:hidden
      "
      style={{
        aspectRatio: '3 / 2',
        background: 'transparent',
        boxShadow: 'none',
      }}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={`mobile-slide-${index}-${slides[index]?.id || index}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 1.1,
            ease: 'easeInOut',
          }}
          onClick={handleSlideClick}
          className="absolute inset-0 cursor-pointer"
          style={{
            backgroundImage: slides[index].image
              ? `url(${slides[index].image})`
              : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-black/10 via-transparent to-yellow-900/10" />
        </motion.div>
      </AnimatePresence>

      <div
        className="
          absolute
          inset-y-0
          left-0
          right-0
          z-20

          flex
          items-center
          justify-between

          px-2

          pointer-events-none
        "
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="
            pointer-events-auto

            flex
            h-5
            w-5
            items-center
            justify-center

            rounded-full
            bg-black/20
            text-sm
            font-bold
            text-white

            backdrop-blur-sm
          "
        >
          ‹
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="
            pointer-events-auto

            flex
            h-5
            w-5
            items-center
            justify-center

            rounded-full
            bg-black/20
            text-sm
            font-bold
            text-white

            backdrop-blur-sm
          "
        >
          ›
        </button>
      </div>

      <div className="absolute bottom-3 z-20 flex w-full justify-center gap-2">
        {slides.map((_, i) => (
          <motion.div
            key={`mobile-dot-${i}`}
            animate={{
              scale: i === index ? [1, 1.3, 1] : 1,
              opacity: i === index ? 1 : 0.4,
            }}
            transition={{ duration: 0.6 }}
            className={`
              h-2.5
              w-2.5
              rounded-full
              ${
                i === index
                  ? 'bg-yellow-400'
                  : 'bg-white/40'
              }
            `}
          />
        ))}
      </div>
    </div>


  {/* ================= DESKTOP ================= */}
<div
  className="
    relative
    hidden
    sm:block

    w-full

    overflow-hidden
  "
  style={{
    height: "427px",
  }}
>

  {/* =========================================
      نوار واقعی و پیوسته تصاویر
  ========================================= */}
  <motion.div
  dir="ltr"
  className="
    absolute
    left-1/2
    top-0

    flex
    items-stretch

    gap-1

    w-max
  "

    animate={{
      x: desktopX,
    }}

    transition={{
      duration: desktopInstant
        ? 0
        : 1.15,

      ease: [0.65, 0, 0.35, 1],
    }}

    onAnimationComplete={() => {

      /*
        پایان مجموعه دوم:
        بدون اینکه کاربر متوجه شود
        به عکس مشابه در مجموعه وسط برمی‌گردیم.
      */

      if (
        desktopPosition >=
        slides.length * 2
      ) {
        setDesktopInstant(true);

        setDesktopPosition(
          slides.length
        );

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setDesktopInstant(false);
          });
        });

        return;
      }


      /*
        حرکت به عقب از ابتدای مجموعه وسط
      */

      if (
        desktopPosition <
        slides.length
      ) {
        setDesktopInstant(true);

        setDesktopPosition(
          slides.length * 2 - 1
        );

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setDesktopInstant(false);
          });
        });
      }
    }}
  >

    {desktopSlides.map(
      (slide, slideIndex) => {

        return (
          <div
            key={`desktop-real-slide-${slideIndex}`}

            className="
              relative

              w-[640px]
              shrink-0

              overflow-hidden

              cursor-pointer
            "

            style={{
              aspectRatio: "3 / 2",

              backgroundImage:
                slide?.image
                  ? `url(${slide.image})`
                  : "none",

              backgroundSize: "cover",

              backgroundPosition:
                "center",

              backgroundRepeat:
                "no-repeat",
            }}

            onClick={() => {
              if (slide?.link) {
                navigate(slide.link);
              }
            }}
          >
            <div
              className="
                absolute
                inset-0

                bg-gradient-to-l

                from-black/10
                via-transparent
                to-yellow-900/10
              "
            />
          </div>
        );
      }
    )}

  </motion.div>


  {/* =========================================
      کنترل‌های ثابت روی عکس اصلی وسط
  ========================================= */}
  <div
    className="
      pointer-events-none

      absolute
      left-1/2
      top-0

      z-30

      h-[427px]
      w-[640px]

      -translate-x-1/2
    "
  >

    {/* فلش چپ */}
    <button
      type="button"

      onClick={(e) => {
  e.stopPropagation();
  prevSlide();
}}

      className="
        pointer-events-auto

        absolute
        right-3
        top-1/2

        flex
        h-9
        w-9

        -translate-y-1/2

        items-center
        justify-center

        rounded-full

        bg-black/30

        text-2xl
        font-bold
        text-white

        backdrop-blur-md

        transition

        hover:bg-black/50
      "
    >
      ‹
    </button>


    {/* فلش راست */}
    <button
      type="button"

      onClick={(e) => {
  e.stopPropagation();
  nextSlide();
}}

      className="
        pointer-events-auto

        absolute
        left-3
        top-1/2

        flex
        h-9
        w-9

        -translate-y-1/2

        items-center
        justify-center

        rounded-full

        bg-black/30

        text-2xl
        font-bold
        text-white

        backdrop-blur-md

        transition

        hover:bg-black/50
      "
    >
      ›
    </button>


    {/* نقاط */}
    <div
      className="
        absolute
        bottom-3

        flex
        w-full
        justify-center

        gap-2
      "
    >
      {slides.map((_, i) => (
        <motion.div
          key={`desktop-dot-${i}`}

          animate={{
            scale:
              i === index
                ? [1, 1.3, 1]
                : 1,

            opacity:
              i === index
                ? 1
                : 0.4,
          }}

          transition={{
            duration: 0.6,
          }}

          className={`
            h-2.5
            w-2.5

            rounded-full

            ${
              i === index
                ? "bg-yellow-400"
                : "bg-white/40"
            }
          `}
        />
      ))}
    </div>

  </div>

</div>

  </div>
);
}
