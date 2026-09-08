'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { site } from '@/config/site';
import { stagger, fadeUp, viewport } from '@/lib/motion';

function Counter({
  value,
  prefix = '',
  suffix = '',
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduced) {
      el.textContent = `${prefix}${value}${suffix}`;
      return;
    }
    const start = performance.now();
    const dur = 1500;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = `${prefix}${Math.round(eased * value)}${suffix}`;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, prefix, suffix, reduced]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 lg:py-28">
      <div className="bg-grid-dark mask-radial absolute inset-0" />
      <div className="absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-brand-600/20 blur-[120px]" />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="container-x relative grid gap-12 text-center sm:grid-cols-2 lg:grid-cols-4"
      >
        {site.stats.map((s) => (
          <motion.div key={s.label} variants={fadeUp}>
            <p className="font-display text-5xl font-bold text-white lg:text-6xl">
              <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
            </p>
            <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-slate-400">
              {s.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
