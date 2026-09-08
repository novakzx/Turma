'use client';

import { motion } from 'framer-motion';
import { School, Users, BookOpen, Image as ImageIcon, GraduationCap } from 'lucide-react';
import PhoneMockup from '@/components/PhoneMockup';
import SectionHeading from '@/components/SectionHeading';
import { fadeUp, stagger, viewport } from '@/lib/motion';

const CHIPS = [
  { icon: School, label: 'Escola', value: 'A.E. Emídio Navarro, Almada' },
  { icon: GraduationCap, label: 'Turma', value: '8º ano · Turma Única' },
  { icon: BookOpen, label: 'Matérias', value: 'Ciências, Matemática, Português…' },
  { icon: Users, label: 'Seguidores', value: 'A tua rede, a crescer' },
  { icon: ImageIcon, label: 'Publicações', value: 'O teu espaço de partilha' },
];

export default function ProfileSection() {
  return (
    <section id="perfil" className="relative overflow-hidden py-28 lg:py-36">
      <div className="absolute -right-40 top-1/4 h-[460px] w-[460px] rounded-full bg-brand-200/50 blur-[130px]" />

      <div className="container-x relative grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
        {/* mockup com camadas de profundidade */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger}
          className="relative order-2 flex justify-center lg:order-1"
        >
          <motion.div variants={fadeUp} className="relative">
            {/* camadas atrás */}
            <div className="absolute -left-8 top-8 h-full w-full -rotate-6 rounded-[3rem] bg-brand-100/80" />
            <div className="absolute -right-8 top-4 h-full w-full rotate-6 rounded-[3rem] bg-brand-200/60" />

            <motion.div variants={fadeUp} whileHover={{ rotate: 2, scale: 1.02 }} className="relative rotate-3">
              <div className="animate-float-slow">
                <PhoneMockup width="w-[270px] sm:w-[300px]">
                  <img
                    src="/screenshots/perfil.png"
                    alt="Tela Perfil com escola, turma e estatísticas"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                </PhoneMockup>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="absolute -left-2 top-24 hidden animate-float-sm items-center gap-2.5 rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-lift backdrop-blur-xl md:flex"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <School className="h-4 w-4" />
            </span>
            <p className="text-xs font-semibold text-slate-800">8º ano · Turma Única</p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="absolute -right-2 bottom-24 hidden animate-float-slow items-center gap-2.5 rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-lift backdrop-blur-xl md:flex"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
              <BookOpen className="h-4 w-4" />
            </span>
            <p className="text-xs font-semibold text-slate-800">Matérias da turma</p>
          </motion.div>
        </motion.div>

        {/* copy */}
        <div className="order-1 lg:order-2">
          <SectionHeading
            align="left"
            eyebrow="Perfil"
            title="Seu espaço. Sua jornada."
            sub="O teu perfil reúne tudo o que te define enquanto estudante: escola, turma, matérias, publicações e seguidores — organizado e sempre contigo."
          />

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={stagger}
            className="mt-10 grid max-w-md gap-3"
          >
            {CHIPS.map((c) => (
              <motion.li
                key={c.label}
                variants={fadeUp}
                className="flex items-center gap-4 rounded-2xl border border-slate-900/5 bg-white px-5 py-4 shadow-card transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                  <c.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    {c.label}
                  </p>
                  <p className="text-sm font-semibold text-slate-800">{c.value}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
