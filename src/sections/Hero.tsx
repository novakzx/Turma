'use client';

import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles, Users, CalendarCheck2, GraduationCap } from 'lucide-react';
import Magnetic from '@/components/Magnetic';
import HeroPhone from '@/components/HeroPhone';
import { site } from '@/config/site';
import { scrollToId } from '@/lib/scroll';
import { stagger, fadeUp, viewport } from '@/lib/motion';

const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false });

const TRUST = [
  { icon: Sparkles, label: 'Estudo com IA' },
  { icon: Users, label: 'Comunidade' },
  { icon: CalendarCheck2, label: 'Organização' },
  { icon: GraduationCap, label: '100% pensado para estudantes' },
];

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="inicio" className="relative overflow-hidden pt-[72px]">
      {/* fundo */}
      <div className="bg-grid mask-radial absolute inset-0" />
      <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand-200/40 blur-[130px]" />
      {!reduced && (
        <div className="absolute inset-0 hidden lg:block">
          <Scene />
        </div>
      )}

      <div className="container-x relative grid min-h-[calc(100vh-72px)] items-center gap-16 py-16 supports-[height:100svh]:min-h-[calc(100svh-72px)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-10">
        {/* copy */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-2xl">
          <motion.span variants={fadeUp} className="eyebrow" style={{ transitionDelay: '1.7s' }}>
            <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
            Novo · Ano letivo 2026/2027
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display text-5xl font-bold leading-[1.04] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
          >
            Estudar ficou{' '}
            <span className="relative inline-block text-brand-600">
              mais inteligente.
              <svg
                viewBox="0 0 320 14"
                className="absolute -bottom-2 left-0 w-full text-brand-300"
                aria-hidden="true"
              >
                <path
                  d="M4 10C60 4 140 3 316 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-7 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            {site.heroSubtitle}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <button
                onClick={() => scrollToId('cta')}
                className="group inline-flex items-center gap-2.5 rounded-full bg-brand-600 px-7 py-4 text-base font-semibold text-white shadow-glow transition-colors hover:bg-brand-500"
              >
                Começar agora
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => scrollToId('funcionalidades')}
                className="inline-flex items-center gap-2.5 rounded-full border border-slate-900/10 bg-white/70 px-7 py-4 text-base font-semibold text-slate-800 backdrop-blur transition-all hover:border-brand-300 hover:text-brand-700"
              >
                Conhecer o app
              </button>
            </Magnetic>
          </motion.div>

          <motion.ul variants={fadeUp} className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {TRUST.map((t) => (
              <li key={t.label} className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <t.icon className="h-4 w-4 text-brand-500" />
                {t.label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* phone */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <HeroPhone />
        </motion.div>
      </div>

      {/* indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        aria-hidden="true"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          Scroll
        </span>
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-slate-300 p-1.5">
          <div className="h-2 w-1 animate-bounce-soft rounded-full bg-brand-500" />
        </div>
      </motion.div>
    </section>
  );
}
