"use client";

import { Children, useRef, useState, type ReactNode } from "react";
import styles from "./carousel.module.css";

type CarouselProps = {
  label: string;
  itemLabel: string;
  hint?: ReactNode;
  className?: string;
  children: ReactNode;
};

const gap = 12;

export function Carousel({ label, itemLabel, hint, className, children }: CarouselProps) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const slides = Children.toArray(children);

  function step(element: HTMLUListElement) {
    const first = element.firstElementChild as HTMLElement | null;
    return first ? first.offsetWidth + gap : element.clientWidth;
  }

  function updateActive() {
    const element = track.current;
    if (!element) return;
    const atEnd = element.scrollLeft >= element.scrollWidth - element.clientWidth - 2;
    const index = atEnd ? slides.length - 1 : Math.round(element.scrollLeft / step(element));
    setActive(Math.min(slides.length - 1, Math.max(0, index)));
  }

  function goTo(index: number) {
    const element = track.current;
    if (!element) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollTo({ left: index * step(element), behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <div className={className}>
      <ul ref={track} className={styles.track} aria-label={label} onScroll={updateActive}>
        {slides.map((slide, index) => (
          <li key={index} className={styles.slide} aria-label={`${itemLabel} ${index + 1} af ${slides.length}`}>
            {slide}
          </li>
        ))}
      </ul>
      {hint}
      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={styles.dot}
            aria-label={`Vis ${itemLabel.toLowerCase()} ${index + 1}`}
            aria-current={index === active ? "true" : undefined}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
