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
    }, 700);
    const t2 = window.setTimeout(() => setPhase('gone'), 1100);
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
          className="fixed inset-0 z-[95] flex flex-col items-center justify-center bg-[#07080d]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          aria-hidden="true"
        >
          <LogoMark className="h-12 w-12" />

          <div className="mt-4">
            <span className="font-display text-xl font-bold text-white">
              {site.name}
            </span>
          </div>

          <div className="mt-6 h-0.5 w-32 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-blue-500"
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 0.65, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
