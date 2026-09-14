'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Sparkles,
  ArrowDown,
  CalendarDays,
  Users,
  BookOpen,
  MessageCircleHeart,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react';
import { InstagramIcon } from '@/components/BrandIcons';
import { site } from '@/config/site';
import { scrollToId } from '@/lib/scroll';

// Data alvo: 20 de setembro de 2026 — 00:00:00 no horário de Portugal (Europe/Lisbon)
// Em setembro Portugal está em horário de verão (WEST, UTC+1), por isso +01:00.
const TARGET_ISO = '2026-09-20T00:00:00+01:00';
const TARGET_MS = Date.parse(TARGET_ISO);

const instagramUrl = `https://www.instagram.com/${site.instagram}`;

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
};

function useCountdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const timeLeft: TimeLeft | null = useMemo(() => {
    if (now === null) return null;
    const diff = TARGET_MS - now;
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: diff };
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds, total: diff };
  }, [now]);

  const isExpired = timeLeft !== null && timeLeft.total <= 0;
  const isReady = timeLeft !== null;

  return { timeLeft, isExpired, isReady };
}

function CountdownCard({
  value,
  label,
  delay = 0,
}: {
  value: string;
  label: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 28, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, delay: 0.6 + delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-1 flex-col items-center"
    >
      {/* glow behind */}
      <div className="absolute -inset-2 -z-10 rounded-[1.6rem] bg-blue-500/0 blur-xl transition-colors duration-500 group-hover:bg-blue-500/10" />
      <div className="relative flex w-full flex-col items-center overflow-hidden rounded-[1.4rem] border border-white/[0.08] bg-white/[0.055] px-2 py-5 backdrop-blur-[22px] transition-all duration-500 hover:border-white/15 hover:bg-white/[0.08] sm:rounded-[1.8rem] sm:px-4 sm:py-7 lg:px-6 lg:py-8">
        {/* top highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60" />
        {/* inner light */}
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/[0.07] to-transparent" />

        <div className="relative flex h-[2.6rem] items-center justify-center overflow-hidden sm:h-[3.5rem] lg:h-[5rem]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={value}
              initial={
                reduced
                  ? false
                  : { y: 18, opacity: 0, filter: 'blur(6px)', scale: 0.96 }
              }
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)', scale: 1 }}
              exit={
                reduced
                  ? { opacity: 0 }
                  : { y: -18, opacity: 0, filter: 'blur(6px)', scale: 0.96 }
              }
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="font-display block tabular-nums text-[2rem] font-bold leading-none tracking-[-0.04em] text-white sm:text-[2.8rem] lg:text-[4.2rem] xl:text-[5rem]"
            >
              {value}
            </motion.span>
          </AnimatePresence>
        </div>

        <span className="relative mt-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/45 sm:mt-4 sm:text-[10px] lg:text-[11px]">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

function Separator() {
  const reduced = useReducedMotion();
  return (
    <motion.span
      initial={reduced ? false : { opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="hidden shrink-0 select-none pb-8 font-display text-xl font-light leading-none text-white/20 sm:block sm:text-2xl lg:pb-10 lg:text-3xl"
      aria-hidden="true"
    >
      :
    </motion.span>
  );
}

// partículas extremamente discretas
function Particles() {
  const reduced = useReducedMotion();
  if (reduced) return null;
  const dots = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${6 + (i * 53) % 88}%`,
        top: `${8 + (i * 37) % 82}%`,
        size: i % 3 === 0 ? 2 : 1.5,
        delay: (i * 0.7) % 4,
        duration: 8 + (i % 4) * 2,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full bg-white"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            opacity: 0.28,
            boxShadow: `0 0 8px rgba(56,189,248,0.9), 0 0 14px rgba(59,130,246,0.5)`,
          }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.18, 0.45, 0.18],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export default function Page() {
  const { timeLeft, isExpired, isReady } = useCountdown();
  const reduced = useReducedMotion();

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#020617]">
      {/* ========== FUNDO PREMIUM ========== */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* base */}
        <div className="absolute inset-0 bg-[#020617]" />
        {/* gradiente radial azul suave no topo */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_900px_600px_at_50%_-8%,rgba(37,99,235,0.18),transparent_65%)]" />
        {/* glow lateral esquerdo */}
        <div className="absolute left-[-10%] top-[18%] h-[520px] w-[620px] rounded-full bg-[#0EA5E9]/[0.09] blur-[120px]" />
        {/* glow inferior direito */}
        <div className="absolute bottom-[-8%] right-[-8%] h-[640px] w-[720px] rounded-full bg-[#2563EB]/[0.12] blur-[130px]" />
        {/* vinheta */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(2,6,23,0.85)_88%)]" />
        {/* grid sutil */}
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_15%,black_30%,transparent_72%)]" />
        {/* linha horizonte sutil */}
        <div className="absolute inset-x-0 top-[58%] h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
      </div>

      <Particles />

      {/* brilho central atrás do conteúdo */}
      <div className="pointer-events-none absolute left-1/2 top-[34%] z-0 h-[520px] w-[980px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[90px]" />

      {/* ========== HEADER MINIMAL ========== */}
      <motion.header
        initial={reduced ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20"
      >
        <div className="mx-auto flex h-[64px] w-full max-w-[1280px] items-center justify-between px-5 sm:h-[72px] sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-[#020617] shadow-[0_8px_24px_-12px_rgba(59,130,246,0.6)] sm:h-9 sm:w-9">
              <span className="font-display text-[13px] font-extrabold tracking-tight">T+</span>
            </span>
            <span className="font-display text-[15px] font-semibold tracking-tight text-white">
              Turma<span className="font-light text-sky-300">+</span>
            </span>
            <span className="ml-2 hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60 backdrop-blur sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              Em breve
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden text-[11px] font-medium tracking-[0.14em] text-white/35 sm:inline">
              20 — 09 — 2026
            </span>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-semibold text-white/85 backdrop-blur transition-all hover:border-white/20 hover:bg-white/10 hover:text-white sm:px-4 sm:py-2.5"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#515BD4] text-white">
                <InstagramIcon className="h-3.5 w-3.5" />
              </span>
              <span className="hidden sm:inline">Instagram</span>
              <span className="sm:hidden">IG</span>
            </a>
          </div>
        </div>
      </motion.header>

      {/* ========== HERO ========== */}
      <section className="relative z-10 flex min-h-[calc(100svh-64px)] flex-col items-center justify-center px-5 pb-10 pt-6 sm:min-h-[calc(100svh-72px)] sm:px-8 sm:pb-16 sm:pt-8">
        <div className="flex w-full max-w-[1080px] flex-col items-center text-center">
          {/* badge */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.06] px-3.5 py-2 backdrop-blur-xl sm:px-4"
          >
            <span className="relative flex h-2 w-2">
              {!reduced && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-60" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75 sm:text-xs">
              Lançamento oficial
            </span>
            <span className="hidden h-3 w-px bg-white/15 sm:block" />
            <span className="hidden text-xs font-medium text-white/55 sm:inline">
              20 de setembro de 2026 · Portugal
            </span>
            <span className="text-xs font-medium text-white/55 sm:hidden">20.09.2026 · PT</span>
          </motion.div>

          {/* título Turma+ */}
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 28, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-7 font-display text-[3.4rem] font-[800] leading-[0.9] tracking-[-0.05em] text-white sm:mt-8 sm:text-[5rem] lg:text-[6.5rem] xl:text-[7.8rem]"
          >
            <span className="relative inline-block">
              Turma
              <span className="bg-gradient-to-tr from-sky-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                +
              </span>
              {/* glow atrás do + */}
              <span className="pointer-events-none absolute left-[62%] top-1/2 -z-10 h-[1.1em] w-[1.4em] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[32px]" />
            </span>
          </motion.h1>

          {/* sublinhado sutil */}
          <motion.div
            initial={reduced ? false : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 h-px w-[92%] max-w-[560px] origin-center bg-gradient-to-r from-transparent via-blue-400/30 to-transparent sm:w-[560px]"
          />

          {/* tagline */}
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-[560px] text-balance text-[15px] font-light leading-relaxed text-white/60 sm:text-lg sm:leading-relaxed"
          >
            O próximo nível da tua turma está chegando.
          </motion.p>

          {/* countdown */}
          <div className="mt-10 w-full sm:mt-12">
            <AnimatePresence mode="wait">
              {!isReady ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center"
                >
                  <div className="grid w-full max-w-[820px] grid-cols-4 gap-2 sm:gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-[86px] animate-pulse rounded-[1.4rem] border border-white/[0.06] bg-white/[0.04] backdrop-blur sm:h-[118px] lg:h-[146px]"
                      />
                    ))}
                  </div>
                </motion.div>
              ) : isExpired ? (
                <motion.div
                  key="arrived"
                  initial={reduced ? { opacity: 0, y: 12 } : { opacity: 0, y: 24, filter: 'blur(10px)', scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="mx-auto max-w-[760px]"
                >
                  <div className="relative overflow-hidden rounded-[2rem] border border-sky-400/20 bg-gradient-to-b from-white/[0.08] to-white/[0.03] px-8 py-10 backdrop-blur-2xl sm:rounded-[2.5rem] sm:px-12 sm:py-14">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_600px_300px_at_50%_0%,rgba(56,189,248,0.18),transparent_70%)]" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/40 to-transparent" />
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 text-white shadow-[0_0_30px_rgba(56,189,248,0.6)]"
                    >
                      <Sparkles className="h-6 w-6" />
                    </motion.div>
                    <h2 className="relative mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                      O Turma<span className="text-sky-300">+</span> chegou.
                    </h2>
                    <p className="relative mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
                      Bem-vindo ao próximo nível da tua turma. O futuro do estudo já está aqui.
                    </p>
                    <div className="relative mt-8 flex justify-center">
                      <a
                        href={instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#020617] transition-transform hover:scale-[1.02]"
                      >
                        Segue no Instagram
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#020617] text-white transition-transform group-hover:translate-x-0.5">
                          <InstagramIcon className="h-3.5 w-3.5" />
                        </span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="countdown"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mx-auto w-full max-w-[860px]"
                >
                  {/* Mobile: grid, Desktop: flex com : separadores */}
                  <div className="flex items-center justify-center gap-1.5 sm:gap-3">
                    <CountdownCard value={pad2(timeLeft!.days)} label="DIAS" delay={0} />
                    <Separator />
                    <CountdownCard value={pad2(timeLeft!.hours)} label="HORAS" delay={0.08} />
                    <Separator />
                    <CountdownCard value={pad2(timeLeft!.minutes)} label="MINUTOS" delay={0.14} />
                    <Separator />
                    <CountdownCard value={pad2(timeLeft!.seconds)} label="SEGUNDOS" delay={0.2} />
                  </div>

                  <motion.p
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-6 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-white/35 sm:text-[11px]"
                  >
                    20 de setembro de 2026 — 00:00 · horário de Portugal{' '}
                    <span className="text-white/20">(Europe/Lisbon)</span>
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* cta scroll para sobre */}
          <motion.button
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => scrollToId('sobre')}
            className="group mt-10 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-medium text-white/70 backdrop-blur transition-all hover:border-white/20 hover:bg-white/10 hover:text-white sm:mt-12"
            aria-label="Ir para Sobre o Turma+"
          >
            <span>Conhece o Turma+</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#020617] transition-transform group-hover:translate-y-0.5">
              <ArrowDown className="h-3.5 w-3.5" />
            </span>
          </motion.button>
        </div>

        {/* indicador de scroll sutil na borda */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
          aria-hidden="true"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">Scroll</span>
          <div className="h-10 w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </section>

      {/* ========== SOBRE ========== */}
      <section
        id="sobre"
        className="relative z-10 mx-auto w-full max-w-[1080px] px-5 pb-12 sm:px-8 sm:pb-20 lg:px-10"
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[1.9rem] border border-white/[0.08] bg-white/[0.04] backdrop-blur-2xl sm:rounded-[2.4rem]"
        >
          {/* hlights */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="absolute -left-20 top-0 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[80px]" />
            <div className="absolute -bottom-24 -right-20 h-[460px] w-[560px] rounded-full bg-sky-500/10 blur-[90px]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_700px_400px_at_50%_0%,rgba(56,189,248,0.08),transparent_70%)]" />
          </div>

          <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:p-12">
            {/* copy */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-sky-300" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-200">
                  Sobre o Turma+
                </span>
              </div>

              <h2 className="mt-5 font-display text-[1.7rem] font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-[2rem]">
                Feito para estudantes.
                <br />
                <span className="bg-gradient-to-r from-sky-300 to-blue-400 bg-clip-text text-transparent">
                  Construído para o futuro.
                </span>
              </h2>

              <p className="mt-4 max-w-[520px] text-[15px] leading-relaxed text-white/65 sm:text-[15.5px]">
                O <span className="font-semibold text-white">Turma+</span> reúne num só aplicativo tudo o que
                importa no dia a dia de estudante em Portugal —{' '}
                <span className="text-white/85">estudo com inteligência artificial</span>, organização do ano
                letivo, feed da turma e o teu perfil. Uma nova forma de estudar, organizar a rotina, aprender
                com IA e fazer parte de uma comunidade.
              </p>

              <p className="mt-3 hidden max-w-[520px] text-sm leading-relaxed text-white/45 sm:block">
                Ano letivo 2026/2027 · Feriados nacionais, interrupções letivas, stories e publicações, tirar
                dúvidas, pedir explicações, gerar resumos e criar planos de estudo — com a tua escola e a tua
                turma sempre contigo.
              </p>

              {/* pills */}
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  { icon: CalendarDays, label: 'Feriados' },
                  { icon: MessageCircleHeart, label: 'Feed' },
                  { icon: Sparkles, label: 'Estudo com IA' },
                  { icon: GraduationCap, label: 'Perfil' },
                  { icon: Users, label: 'Comunidade' },
                  { icon: BookOpen, label: 'Organização' },
                ].map((p) => (
                  <span
                    key={p.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur"
                  >
                    <p.icon className="h-3.5 w-3.5 text-sky-300" />
                    {p.label}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#020617] shadow-[0_8px_32px_-12px_rgba(255,255,255,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_12px_40px_-12px_rgba(255,255,255,0.5)]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#515BD4] text-white">
                    <InstagramIcon className="h-3.5 w-3.5" />
                  </span>
                  Segue @{site.instagram}
                </a>
                <span className="hidden items-center gap-2 text-xs text-white/40 sm:inline-flex">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Lançamento oficial em Portugal
                </span>
              </div>
            </div>

            {/* visual / cards */}
            <div className="relative flex flex-col gap-3">
              {/* card principal */}
              <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-5 backdrop-blur-xl sm:rounded-[1.8rem] sm:p-6">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_300px_180px_at_80%_0%,rgba(59,130,246,0.18),transparent_70%)]" />
                <div className="relative flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-[0_8px_24px_-12px_rgba(37,99,235,0.6)]">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">IA por matéria</p>
                    <p className="text-xs text-white/50">Ciências · Matemática · Português · Inglês · Geografia</p>
                  </div>
                </div>
                <div className="relative mt-4 rounded-xl border border-white/10 bg-[#020617]/60 p-3">
                  <p className="text-xs font-medium text-white/70">“Cria um resumo de Ciências sobre a arara.”</p>
                  <div className="mt-2.5 flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-500 text-white">
                      <Sparkles className="h-3 w-3" />
                    </span>
                    <p className="text-xs leading-relaxed text-white/60">
                      Resumo criado ✓ — herbívora/frugívora, bico forte para partir cascas…
                    </p>
                  </div>
                </div>
                <div className="relative mt-4 flex items-center justify-between text-[11px]">
                  <span className="font-medium uppercase tracking-[0.14em] text-white/35">Tirar dúvidas · Resumos</span>
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                    ● online
                  </span>
                </div>
              </div>

              {/* two small cards row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-sky-300">
                    <CalendarDays className="h-4 w-4" />
                  </span>
                  <p className="mt-3 text-xs font-semibold text-white">11 de setembro</p>
                  <p className="text-[11px] leading-relaxed text-white/50">Início do ano letivo 2026/2027</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white">
                    <Users className="h-4 w-4" />
                  </span>
                  <p className="mt-3 text-xs font-semibold text-white">A tua turma</p>
                  <p className="text-[11px] leading-relaxed text-white/50">Stories · Likes · Comentários</p>
                </div>
              </div>

              <p className="px-1 text-center text-[11px] leading-relaxed text-white/30 sm:text-left">
                Tudo num só lugar, com a mesma identidade. Sem dispersão, sem complicação.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ========== FOOTER MINIMALISTA ========== */}
      <footer className="relative z-10 border-t border-white/[0.06]">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center justify-between gap-5 px-5 py-7 sm:flex-row sm:px-8 sm:py-8 lg:px-10">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <span className="font-display text-sm font-semibold tracking-tight text-white">
              Turma<span className="font-light text-sky-300">+</span>
              <span className="ml-2 text-xs font-normal text-white/35">© 2026 · Todos os direitos reservados</span>
            </span>
            <span className="text-xs text-white/30">{site.tagline}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-white/25 sm:inline">Lançamento · 20.09.2026 · Portugal</span>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2.5 text-xs font-semibold text-white/80 backdrop-blur transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              <InstagramIcon className="h-4 w-4" />
              Instagram
              <span className="hidden text-white/40 sm:inline">· @{site.instagram}</span>
            </a>
          </div>
        </div>

        {/* linha de luz inferior */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      </footer>

      {/* efeito vinheta inferior */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[280px] bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
}
