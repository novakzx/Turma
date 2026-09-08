'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { stagger, viewport, wordReveal } from '@/lib/motion';

export default function SectionHeading({
  eyebrow,
  title,
  sub,
  dark = false,
  align = 'center',
  className,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  dark?: boolean;
  align?: 'center' | 'left';
  className?: string;
}) {
  const reduced = useReducedMotion();
  const words = title.split(' ');

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={cn(
        'max-w-3xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <motion.span variants={wordReveal} className={cn('eyebrow', dark && 'border-white/15 bg-white/5 text-brand-300')}>
          {eyebrow}
        </motion.span>
      )}
      <h2
        className={cn(
          'mt-5 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl',
          dark ? 'text-white' : 'text-slate-900'
        )}
      >
        {reduced ? (
          title
        ) : (
          <motion.span variants={stagger} className="inline">
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
                <motion.span variants={wordReveal} className="inline-block">
                  {w}
                  {i < words.length - 1 ? ' ' : ''}
                </motion.span>
              </span>
            ))}
          </motion.span>
        )}
      </h2>
      {sub && (
        <motion.p
          variants={wordReveal}
          className={cn('mt-5 text-lg leading-relaxed', dark ? 'text-slate-400' : 'text-slate-600')}
        >
          {sub}
        </motion.p>
      )}
    </motion.div>
  );
}
