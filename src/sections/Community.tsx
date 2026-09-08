'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Heart, MessageCircle, Bell, Camera, Plus, Flag } from 'lucide-react';
import PhoneMockup from '@/components/PhoneMockup';
import SectionHeading from '@/components/SectionHeading';
import { fadeUp, stagger, viewport } from '@/lib/motion';

export default function Community() {
  const reduced = useReducedMotion();

  return (
    <section id="comunidade" className="relative overflow-hidden py-28 lg:py-36">
      <div className="absolute right-0 top-24 h-[420px] w-[420px] rounded-full bg-brand-200/50 blur-[120px]" />

      <div className="container-x relative grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
        {/* copy */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="Comunidade"
            title="Aprender também é compartilhar."
            sub="O Turma+ não é só uma ferramenta de estudos — é uma experiência social para estudantes. Publica fotos, acompanha stories, comenta, gosta e celebra cada conquista com a tua turma."
          />

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={stagger}
            className="mt-10 grid max-w-md gap-4"
          >
            {[
              'Stories e publicações com a tua turma',
              'Curtidas e comentários em tempo real',
              'Notificações do que importa',
              'Um espaço seguro, moderado e feito para estudantes',
            ].map((t) => (
              <motion.li key={t} variants={fadeUp} className="flex items-center gap-3 text-slate-700">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                  <Heart className="h-3.5 w-3.5" />
                </span>
                {t}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* mockup + floating UI */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger}
          className="relative flex justify-center"
        >
          <motion.div variants={fadeUp} className="relative rotate-2">
            <div className="animate-float-slow">
              <PhoneMockup width="w-[270px] sm:w-[300px]">
                <img
                  src="/screenshots/feed.png"
                  alt="Tela Feed com stories e publicações"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </PhoneMockup>
            </div>
          </motion.div>

          {/* like card */}
          <motion.div
            variants={fadeUp}
            className="absolute -left-2 top-16 hidden items-center gap-3 rounded-2xl border border-white/60 bg-white/85 px-4 py-3 shadow-lift backdrop-blur-xl sm:flex"
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-500">
              <Heart className="h-5 w-5 fill-rose-500" />
              {!reduced && (
                <motion.span
                  className="absolute -right-1 -top-1 text-xs font-bold text-rose-500"
                  animate={{ y: [0, -10], opacity: [1, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.6 }}
                >
                  +1
                </motion.span>
              )}
            </span>
            <div>
              <p className="text-xs font-semibold text-slate-900">A tua publicação</p>
              <p className="text-[11px] text-slate-500">recebeu uma curtida</p>
            </div>
          </motion.div>

          {/* comment card */}
          <motion.div
            variants={fadeUp}
            className="absolute -right-2 top-1/2 hidden items-center gap-3 rounded-2xl border border-white/60 bg-white/85 px-4 py-3 shadow-lift backdrop-blur-xl sm:flex"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-600">
              <MessageCircle className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold text-slate-900">“Que fixe! 🔥”</p>
              <p className="text-[11px] text-slate-500">novo comentário</p>
            </div>
          </motion.div>

          {/* notification toast */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: -24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute -top-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-lift backdrop-blur-xl"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <Bell className="h-4 w-4" />
            </span>
            <p className="text-xs font-semibold text-slate-800">A tua turma publicou algo novo</p>
          </motion.div>

          {/* story ring */}
          <motion.div
            variants={fadeUp}
            className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/60 bg-white/90 py-2.5 pl-3 pr-5 shadow-lift backdrop-blur-xl"
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-brand-500 to-accent p-[2.5px]">
              <span className="flex h-full w-full items-center justify-center rounded-full bg-white">
                <Camera className="h-4 w-4 text-brand-600" />
              </span>
              {!reduced && (
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-400/60" />
              )}
            </span>
            <div className="flex items-center gap-1.5">
              <Plus className="h-4 w-4 text-brand-600" />
              <p className="text-xs font-semibold text-slate-800">Cria a tua story</p>
            </div>
            <Flag className="ml-2 h-3.5 w-3.5 text-slate-300" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
