'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { CalendarRange, Flag, School, Star } from 'lucide-react';
import PhoneMockup from '@/components/PhoneMockup';
import SectionHeading from '@/components/SectionHeading';
import { fadeUp, stagger, viewport } from '@/lib/motion';
import { cn } from '@/lib/cn';

const TIMELINE = [
  {
    icon: School,
    title: 'Início do ano letivo',
    desc: '11 de setembro de 2026 — tudo marcado desde o primeiro dia.',
    tint: 'bg-brand-600 text-white',
  },
  {
    icon: Flag,
    title: 'Feriados',
    desc: 'Nacionais e municipais, sempre à vista.',
    tint: 'bg-brand-100 text-brand-600',
  },
  {
    icon: CalendarRange,
    title: 'Interrupções letivas',
    desc: 'Natal, Carnaval e Páscoa sem surpresas.',
    tint: 'bg-accent/15 text-accent',
  },
  {
    icon: Star,
    title: 'Datas importantes',
    desc: 'O que vem pela frente, com contagem de dias.',
    tint: 'bg-brand-100 text-brand-600',
  },
];

export default function Organization() {
  const lineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start 0.75', 'end 0.55'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="organizacao" className="relative overflow-hidden bg-white py-28 lg:py-36">
      <div className="absolute -left-32 top-10 h-[380px] w-[380px] rounded-full bg-brand-100/70 blur-[110px]" />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Organização"
          title="Tudo importante, em um só lugar."
          sub="Calendário do ano letivo, feriados e interrupções com contagem regressiva. Nunca mais seres apanhado de surpresa."
        />

        <div className="mt-16 grid items-center gap-16 lg:mt-20 lg:grid-cols-2 lg:gap-10">
          {/* timeline */}
          <div ref={lineRef} className="relative mx-auto max-w-md lg:mx-0">
            <div className="absolute bottom-4 left-[22px] top-4 w-px bg-slate-200" />
            <motion.div
              style={reduced ? undefined : { scaleY }}
              className="absolute bottom-4 left-[22px] top-4 w-px origin-top bg-gradient-to-b from-brand-500 to-accent"
            />
            <motion.ul variants={stagger} initial="hidden" whileInView="show" viewport={viewport} className="space-y-10">
              {TIMELINE.map((t, i) => (
                <motion.li key={t.title} variants={fadeUp} className="relative flex gap-5">
                  <span
                    className={cn(
                      'z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl shadow-card',
                      t.tint
                    )}
                  >
                    <t.icon className="h-5 w-5" />
                  </span>
                  <div className="pt-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      0{i + 1}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-bold text-slate-900">{t.title}</h3>
                    <p className="mt-1 text-slate-600">{t.desc}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* phone + cards */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={stagger}
            className="relative flex justify-center"
          >
            <motion.div variants={fadeUp} className="relative -rotate-2">
              <div className="animate-float">
                <PhoneMockup width="w-[270px] sm:w-[300px]">
                  <img
                    src="/screenshots/feriados.png"
                    alt="Tela Feriados com calendário do ano letivo"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                </PhoneMockup>
              </div>
            </motion.div>

            {/* card "próximo" replicado */}
            <motion.div
              variants={fadeUp}
              className="absolute -right-4 top-10 hidden w-56 animate-float-sm rounded-2xl bg-brand-600 p-4 text-white shadow-glow sm:block"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-200">
                Próximo — faltam 8 dias
              </p>
              <p className="mt-1.5 font-display text-base font-bold">Início do ano letivo</p>
              <p className="mt-0.5 text-xs text-brand-100">11 de setembro de 2026</p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="absolute -left-4 bottom-12 hidden w-52 animate-float-slow rounded-2xl border border-white/60 bg-white/90 p-4 shadow-lift backdrop-blur-xl sm:block"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
                Interrupção letiva
              </p>
              <p className="mt-1.5 font-display text-sm font-bold text-slate-900">
                Interrupção letiva do Natal
              </p>
              <p className="mt-0.5 text-xs text-slate-500">dezembro de 2026</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
