'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { CalendarDays, Newspaper, Sparkles, UserRound } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { stagger, fadeUp, viewport } from '@/lib/motion';
import { cn } from '@/lib/cn';

const MODULES = [
  {
    icon: CalendarDays,
    title: 'Feriados',
    desc: 'Saiba exatamente o que vem pela frente.',
    img: '/screenshots/feriados.png',
    chips: ['Feriados nacionais', 'Interrupções letivas'],
    tint: 'bg-brand-100 text-brand-600',
  },
  {
    icon: Newspaper,
    title: 'Feed',
    desc: 'Compartilhe, descubra e interaja.',
    img: '/screenshots/feed.png',
    chips: ['Stories', 'Publicações'],
    tint: 'bg-accent/15 text-accent',
  },
  {
    icon: Sparkles,
    title: 'Estudo',
    desc: 'Tenha uma IA para ajudar nos seus estudos.',
    img: '/screenshots/estudo.png',
    chips: ['Tirar dúvidas', 'Resumos'],
    tint: 'bg-brand-100 text-brand-600',
  },
  {
    icon: UserRound,
    title: 'Perfil',
    desc: 'Tenha sua vida escolar organizada em um só lugar.',
    img: '/screenshots/perfil.png',
    chips: ['Turma & escola', 'Matérias'],
    tint: 'bg-accent/15 text-accent',
  },
];

export default function Modules() {
  const reduced = useReducedMotion();

  return (
    <section id="funcionalidades" className="relative py-28 lg:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="Funcionalidades"
          title="Um app. Várias possibilidades."
          sub="Tudo o que um estudante precisa no dia a dia — dentro do mesmo lugar, com a mesma identidade."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:gap-8"
        >
          {MODULES.map((m, i) => (
            <motion.article
              key={m.title}
              variants={fadeUp}
              whileHover={reduced ? undefined : { y: -10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'group relative overflow-hidden rounded-[2rem] border border-slate-900/5 bg-white shadow-card',
                'transition-shadow duration-500 hover:shadow-lift',
                i % 2 === 1 && 'lg:translate-y-10'
              )}
            >
              {/* screen */}
              <div className="relative h-[380px] overflow-hidden bg-surface sm:h-[420px]">
                <img
                  src={m.img}
                  alt={`Tela ${m.title} do aplicativo`}
                  loading="lazy"
                  className="absolute left-1/2 top-0 h-[560px] w-auto -translate-x-1/2 object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent" />
                {/* chips que aparecem no hover */}
                <div className="absolute left-5 top-5 flex flex-col gap-2">
                  {m.chips.map((c, ci) => (
                    <span
                      key={c}
                      style={{ transitionDelay: `${ci * 70}ms` }}
                      className="translate-y-3 rounded-full border border-white/60 bg-white/85 px-3.5 py-1.5 text-xs font-semibold text-slate-700 opacity-0 shadow-card backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* copy */}
              <div className="relative flex items-start justify-between gap-4 px-7 pb-8 pt-2 transition-transform duration-500 group-hover:-translate-y-1">
                <div>
                  <h3 className="font-display text-2xl font-bold text-slate-900">{m.title}</h3>
                  <p className="mt-1.5 text-slate-600">{m.desc}</p>
                </div>
                <span
                  className={cn(
                    'mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6',
                    m.tint
                  )}
                >
                  <m.icon className="h-5 w-5" />
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
