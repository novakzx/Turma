'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { UserPlus, Users, Sparkles, Share2 } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { fadeUp, stagger, viewport } from '@/lib/motion';

const STEPS = [
  {
    icon: UserPlus,
    n: '01',
    title: 'Crie seu perfil',
    desc: 'Escolhe o teu nome, a tua escola e entra em segundos. O teu espaço fica pronto na hora.',
  },
  {
    icon: Users,
    n: '02',
    title: 'Entre na sua turma',
    desc: 'Liga-te à tua turma para veres colegas, matérias e publicações num só feed.',
  },
  {
    icon: Sparkles,
    n: '03',
    title: 'Estude com ferramentas inteligentes',
    desc: 'IA para tirar dúvidas, explicar conceitos, gerar resumos e criar planos de estudo.',
  },
  {
    icon: Share2,
    n: '04',
    title: 'Compartilhe e evolua',
    desc: 'Publica, comenta, acompanha o calendário e cresce com a tua comunidade.',
  },
];

export default function HowItWorks() {
  const reduced = useReducedMotion();

  return (
    <section id="como-funciona" className="relative bg-white py-28 lg:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="Como funciona"
          title="Do zero ao estudo inteligente em 4 passos."
        />

        <div className="relative mt-16 lg:mt-24">
          {/* linha conectora */}
          <div className="absolute left-0 right-0 top-[28px] hidden h-px bg-gradient-to-r from-transparent via-brand-300 to-transparent lg:block" />

          <motion.ol
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          >
            {STEPS.map((s) => (
              <motion.li key={s.n} variants={fadeUp} className="group relative">
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-200 bg-white shadow-card transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-brand-600 group-hover:text-white group-hover:shadow-glow">
                  <s.icon className="h-5 w-5 text-brand-600 transition-colors duration-500 group-hover:text-white" />
                </div>
                <p className="mt-6 font-display text-sm font-bold tracking-[0.2em] text-brand-400">
                  {s.n}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2.5 leading-relaxed text-slate-600">{s.desc}</p>
                {!reduced && (
                  <span className="pointer-events-none absolute -right-2 -top-8 select-none font-display text-7xl font-bold text-slate-900/[0.045]">
                    {s.n}
                  </span>
                )}
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
