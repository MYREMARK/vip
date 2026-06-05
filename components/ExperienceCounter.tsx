"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number | null;
};

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export default function ExperienceCounter({ value }: Props) {
  const [displayValue, setDisplayValue] = useState(0);
  const frameRef = useRef<number | null>(null);
  const previousValueRef = useRef(0);

  useEffect(() => {
    if (value === null) return;

    const startValue = previousValueRef.current;
    const endValue = value;
    const duration = 1800;
    const startTime = performance.now();

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.round(startValue + (endValue - startValue) * easedProgress);

      setDisplayValue(nextValue);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        previousValueRef.current = endValue;
        setDisplayValue(endValue);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [value]);

  if (value === null) {
    return <span className="experienceCounter experienceCounterLoading">XXX</span>;
  }

  const characters = new Intl.NumberFormat("en-US").format(displayValue).split("");

  return (
    <span className="experienceCounter" aria-label={`${value} years`}>
      {characters.map((character, index) => {
        if (character === ",") {
          return <span className="counterComma" key={`${character}-${index}`}>,</span>;
        }

        const digit = Number(character);

        return (
          <span className="counterDigit" key={`${character}-${index}`}>
            <span className="counterDigitTrack" style={{ transform: `translateY(-${digit * 10}%)` }}>
              {digits.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
