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
    }, 1100);
    const t2 = window.setTimeout(() => setPhase('gone'), 1800);
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
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          {/* Luz azul de fundo no preloader */}
          <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-blue-600/20 blur-[90px]" />

          <motion.div
            initial={{ scale: 0.7, rotate: -45, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <LogoMark className="h-16 w-16 drop-shadow-[0_0_35px_rgba(59,130,246,0.8)]" />
          </motion.div>

          <div className="mt-6 flex overflow-hidden">
            {site.name.split('').map((ch, i) => (
              <motion.span
                key={i}
                className="font-display text-2xl font-extrabold text-white"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ delay: 0.25 + i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {ch}
              </motion.span>
            ))}
          </div>

          <div className="mt-8 h-1 w-44 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-blue-500 shadow-[0_0_12px_#3b82f6]"
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 1.0, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
