"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type AnimatedCounterProps = {
  value: string;
  label: string;
};

const parseCounterValue = (value: string) => {
  const numericPart = value.replace(/[^\d]/g, "");
  const parsedNumber = Number.parseInt(numericPart, 10);

  if (Number.isNaN(parsedNumber)) {
    return {
      number: null,
      prefix: "",
      suffix: "",
    };
  }

  const prefix = value.match(/^[^\d]*/)?.[0] ?? "";
  const suffix = value.match(/[^\d]*$/)?.[0] ?? "";

  return {
    number: parsedNumber,
    prefix,
    suffix,
  };
};

export const AnimatedCounter = ({ value, label }: AnimatedCounterProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const hasStarted = useRef(false);

  const parsed = useMemo(() => parseCounterValue(value), [value]);
  const [displayValue, setDisplayValue] = useState(parsed.number === null ? value : "0");

  useEffect(() => {
    if (!ref.current || parsed.number === null || hasStarted.current) {
      return;
    }

    const element = ref.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (!entry?.isIntersecting || hasStarted.current) {
          return;
        }

        hasStarted.current = true;

        const duration = 1400;
        const start = performance.now();

        const step = (timestamp: number) => {
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(parsed.number * eased);

          setDisplayValue(
            `${parsed.prefix}${current.toLocaleString("fr-FR")}${parsed.suffix}`,
          );

          if (progress < 1) {
            requestAnimationFrame(step);
          }
        };

        requestAnimationFrame(step);
        observer.disconnect();
      },
      { threshold: 0.3 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [parsed.number, parsed.prefix, parsed.suffix]);

  return (
    <div ref={ref} className="group text-center">
      <p className="text-4xl font-extrabold text-primary md:text-5xl tabular-nums">
        {displayValue}
      </p>
      <div className="mx-auto mt-2 h-1 w-8 rounded-full bg-accent transition-all duration-300 group-hover:w-12" />
      <p className="mt-3 text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  );
};
