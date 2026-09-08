'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { CalendarDays, Sparkles, MessageCircle } from 'lucide-react';
import PhoneMockup from '@/components/PhoneMockup';
import { cn } from '@/lib/cn';

gsap.registerPlugin(ScrollTrigger);

const SCREENS = [
  { src: '/screenshots/feriados.png', alt: 'Tela Feriados do aplicativo' },
  { src: '/screenshots/estudo.png', alt: 'Tela Estudo com IA do aplicativo' },
  { src: '/screenshots/feed.png', alt: 'Tela Feed do aplicativo' },
  { src: '/screenshots/perfil.png', alt: 'Tela Perfil do aplicativo' },
];

export default function HeroPhone() {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 140, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 140, damping: 20 });

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        scrollRef.current,
        { rotateY: -16, rotateX: 8, y: 30, scale: 0.98, transformPerspective: 1400 },
        {
          rotateY: 10,
          rotateX: 2,
          y: -70,
          scale: 1.03,
          transformPerspective: 1400,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
        }
      );
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top top',
        end: '+=1800',
        scrub: 0.5,
        onUpdate: (self) =>
          setActive(Math.min(SCREENS.length - 1, Math.floor(self.progress * SCREENS.length))),
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={rootRef} className="relative flex items-center justify-center lg:justify-end">
      {/* halo */}
      <div className="absolute h-[420px] w-[420px] rounded-full bg-brand-500/25 blur-[110px]" />
      <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-accent/15 blur-[90px]" />

      <div ref={scrollRef}>
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 1400 }}
        >
          <div className="animate-float">
            <PhoneMockup>
              {SCREENS.map((s, i) => (
                <img
                  key={s.src}
                  src={s.src}
                  alt={s.alt}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className={cn(
                    'absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700',
                    i === active ? 'opacity-100' : 'opacity-0'
                  )}
                />
              ))}
            </PhoneMockup>
          </div>
        </motion.div>
      </div>

      {/* sombra no chão */}
      <div className="absolute -bottom-14 h-10 w-64 rounded-full bg-slate-900/30 blur-2xl" />

      {/* chips flutuantes */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.1, duration: 0.7 }}
        className="absolute -left-4 top-16 hidden animate-float-sm items-center gap-2.5 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-lift backdrop-blur-xl md:flex"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
          <Sparkles className="h-4 w-4" />
        </span>
        <div>
          <p className="text-xs font-semibold text-slate-900">IA a responder…</p>
          <p className="text-[11px] text-slate-500">“O que come uma arara?”</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.35, duration: 0.7 }}
        className="absolute -right-2 bottom-24 hidden animate-float-slow items-center gap-2.5 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-lift backdrop-blur-xl md:flex"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent">
          <CalendarDays className="h-4 w-4" />
        </span>
        <div>
          <p className="text-xs font-semibold text-slate-900">Próximo: Início das aulas</p>
          <p className="text-[11px] text-slate-500">11 de setembro · faltam 8 dias</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.6, duration: 0.6 }}
        className="absolute left-6 bottom-6 hidden items-center gap-2 rounded-full border border-white/60 bg-white/80 px-3.5 py-2 shadow-card backdrop-blur-xl lg:flex"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-brand-500" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-600" />
        </span>
        <MessageCircle className="h-3.5 w-3.5 text-slate-500" />
        <p className="text-[11px] font-semibold text-slate-700">A tua turma está online</p>
      </motion.div>
    </div>
  );
}
