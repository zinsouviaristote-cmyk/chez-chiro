"use client";
// motion-primitives — SlidingNumber (github.com/ibelick/motion-primitives).
// Same spring and behaviour. Changes for this site:
// - `m` + LazyMotion(domAnimation) instead of `motion`.
// - Offsets in % of the digit's own height, so no react-use-measure and no
//   layoutId (no layout-animation bundle).
import { LazyMotion, domAnimation, m, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect } from "react";

const TRANSITION = { stiffness: 280, damping: 18, mass: 0.3 };

function Digit({ value, place }: { value: number; place: number }) {
  const valueRoundedToPlace = Math.floor(value / place) % 10;
  const animatedValue = useSpring(valueRoundedToPlace, TRANSITION);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <span className="relative inline-block w-[1ch] overflow-y-clip tabular-nums">
      <span className="invisible">0</span>
      {Array.from({ length: 10 }, (_, i) => (
        <DigitFace key={i} mv={animatedValue} number={i} />
      ))}
    </span>
  );
}

function DigitFace({ mv, number }: { mv: MotionValue<number>; number: number }) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    const memo = offset > 5 ? offset - 10 : offset;
    return `${memo * 100}%`;
  });

  return (
    <m.span style={{ y }} className="absolute inset-0 flex items-center justify-center">
      {number}
    </m.span>
  );
}

export type SlidingNumberProps = {
  value: number;
  padStart?: boolean;
};

export function SlidingNumber({ value, padStart = false }: SlidingNumberProps) {
  const integerValue = Math.floor(Math.abs(value));
  const padded = padStart && integerValue < 10 ? `0${integerValue}` : `${integerValue}`;
  const places = padded.split("").map((_, i) => Math.pow(10, padded.length - i - 1));

  return (
    <LazyMotion features={domAnimation}>
      <span className="inline-flex items-center">
        {places.map((place) => (
          <Digit key={`pos-${place}`} value={integerValue} place={place} />
        ))}
      </span>
    </LazyMotion>
  );
}
