import { useEffect, useState } from "react";

function calculateRemainingTime(endDate) {
  if (!endDate) return null;

  const endTime = new Date(endDate).getTime();
  const now = Date.now();
  const difference = endTime - now;

  if (
    Number.isNaN(endTime) ||
    difference <= 0
  ) {
    return null;
  }

  const totalSeconds = Math.floor(difference / 1000);

  const days = Math.floor(totalSeconds / 86400);

  const hours = Math.floor(
    (totalSeconds % 86400) / 3600
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

function padNumber(value) {
  return String(value).padStart(2, "0");
}

export default function DiscountCountdown({
  endDate,
  className = "",
}) {
  const [remainingTime, setRemainingTime] = useState(() =>
    calculateRemainingTime(endDate)
  );

  useEffect(() => {
    setRemainingTime(
      calculateRemainingTime(endDate)
    );

    if (!endDate) return;

    const intervalId = setInterval(() => {
      setRemainingTime(
        calculateRemainingTime(endDate)
      );
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [endDate]);

  if (!remainingTime) {
    return null;
  }

  const {
    days,
    hours,
    minutes,
    seconds,
  } = remainingTime;

  return (
    <div
  dir="rtl"
  className={`
    mt-1 flex items-center gap-1
    text-[9px] font-black
    tabular-nums text-red-500
    ${className}
  `}
>
  {days > 0 && (
    <>
      <span>
        {days} روز
      </span>

      <span>
        و
      </span>
    </>
  )}

  <span dir="ltr">
    {padNumber(hours)}
    :
    {padNumber(minutes)}
    :
    {padNumber(seconds)}
  </span>
</div>
  );
}