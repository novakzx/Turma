'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { LogoMark } from '@/components/Logo';
import { site } from '@/config/site';

export default function Preloader() {
  const [phase, setPhase] = useState<'loading' | 'exit' | 'gone'>('loading');
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setPhase('gone');
      return;
    }
    document.body.style.overflow = 'hidden';
    const t1 = window.setTimeout(() => {
      setPhase('exit');
      document.body.style.overflow = '';
    }, 1500);
    const t2 = window.setTimeout(() => setPhase('gone'), 2400);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.body.style.overflow = '';
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {phase !== 'gone' && (
        <motion.div
          className="fixed inset-0 z-[95] flex flex-col items-center justify-center bg-navy-950"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <motion.div
            initial={{ scale: 0.6, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <LogoMark className="h-16 w-16 drop-shadow-[0_0_30px_rgba(108,86,240,0.6)]" />
          </motion.div>
          <div className="mt-6 flex overflow-hidden">
            {site.name.split('').map((ch, i) => (
              <motion.span
                key={i}
                className="font-display text-2xl font-bold text-white"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ delay: 0.35 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {ch}
              </motion.span>
            ))}
          </div>
          <div className="mt-8 h-px w-40 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-brand-400"
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 1.3, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
