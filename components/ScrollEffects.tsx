"use client";

import { useEffect } from "react";

/**
 * Progressive-enhancement effects for server-rendered sections:
 * - .reveal elements fade/slide in when they enter the viewport
 * - .num[data-count] elements count up from 0
 * Content is fully present in the HTML either way, so nothing here affects
 * crawlability; without JS the CSS keeps everything visible.
 */
export default function ScrollEffects() {
  useEffect(() => {
    const reducedMotion = matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    const nio = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          nio.unobserve(e.target);
          const el = e.target as HTMLElement;
          const end = parseFloat(el.dataset.count ?? "0");
          // Optional start value so stats like a star rating don't count up
          // through unflattering numbers on their way to the real one.
          const start = parseFloat(el.dataset.start ?? "0");
          const dec = Number(el.dataset.decimals ?? 0);
          const pre = el.dataset.prefix ?? "";
          const suf = el.dataset.suffix ?? "";
          const fmt = (v: number) =>
            pre +
            v.toLocaleString("en-AU", {
              minimumFractionDigits: dec,
              maximumFractionDigits: dec,
            }) +
            suf;
          if (reducedMotion) {
            el.textContent = fmt(end);
            continue;
          }
          const t0 = performance.now();
          const dur = 1400;
          const tick = (t: number) => {
            const k = Math.min(1, (t - t0) / dur);
            const eased = 1 - Math.pow(1 - k, 3);
            el.textContent = fmt(start + (end - start) * eased);
            if (k < 1) requestAnimationFrame(tick);
          };
          tick(t0);
        }
      },
      { threshold: 0.4 }
    );
    document
      .querySelectorAll(".num[data-count]")
      .forEach((el) => nio.observe(el));

    return () => {
      io.disconnect();
      nio.disconnect();
    };
  }, []);

  return null;
}
