'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PhoneMockup from '@/components/PhoneMockup';
import Magnetic from '@/components/Magnetic';
import { scrollToId } from '@/lib/scroll';
import { fadeUp, stagger, viewport } from '@/lib/motion';

export default function FinalCTA() {
  const reduced = useReducedMotion();

  return (
    <section id="cta" className="relative overflow-hidden bg-navy-950 py-32 lg:py-44">
      <div className="bg-grid-dark mask-radial absolute inset-0" />
      <div className="absolute left-1/2 top-1/2 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/25 blur-[140px]" />
      <div className="absolute right-10 top-10 h-56 w-56 rounded-full bg-accent/10 blur-[90px]" />

      <div className="container-x relative grid items-center gap-20 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewport}>
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-300"
          >
            Pronto para começar?
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Seu jeito de estudar está prestes a{' '}
            <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-accent bg-clip-text text-transparent">
              mudar.
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-7 max-w-xl text-lg leading-relaxed text-slate-400">
            Tenha estudo, organização, comunidade e inteligência artificial em um só lugar.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <button
                onClick={() => scrollToId('inicio')}
                className="group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-base font-semibold text-navy-950 transition-transform duration-300 hover:scale-[1.03]"
              >
                Começar agora
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => scrollToId('funcionalidades')}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur transition-colors hover:border-brand-400 hover:text-brand-300"
              >
                Conhecer o aplicativo
              </button>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* phone flutuante */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 80, rotate: 8 }}
          whileInView={{ opacity: 1, y: 0, rotate: 6 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center"
        >
          <div className="absolute top-1/2 h-[380px] w-[380px] -translate-y-1/2 rounded-full bg-brand-500/30 blur-[100px]" />
          <div className="animate-float">
            <PhoneMockup width="w-[260px] sm:w-[290px]">
              <img
                src="/screenshots/perfil.png"
                alt="Tela Perfil do aplicativo"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </PhoneMockup>
          </div>
          <div className="absolute -bottom-10 h-10 w-60 rounded-full bg-black/50 blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
