'use client';

import { useEffect, useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Clock } from 'lucide-react';
import { site } from '@/config/site';

interface TimeLeft {
  total: number;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isFinished: boolean;
}

// 2026-09-20 00:00:00 em Portugal (WEST / UTC+1)
const TARGET_TIMESTAMP = site.launch.targetTimestamp;

function getTimeRemaining(): TimeLeft {
  const now = Date.now();
  const diff = TARGET_TIMESTAMP - now;

  if (diff <= 0) {
    return {
      total: 0,
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
      isFinished: true,
    };
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    total: diff,
    days: String(d).padStart(2, '0'),
    hours: String(h).padStart(2, '0'),
    minutes: String(m).padStart(2, '0'),
    seconds: String(s).padStart(2, '0'),
    isFinished: false,
  };
}

// Componente para animar a transição suave de cada dígito/número
const AnimatedNumber = memo(function AnimatedNumber({ value }: { value: string }) {
  return (
    <div className="relative inline-flex h-[1.15em] items-center justify-center overflow-hidden font-display font-extrabold tabular-nums tracking-tight">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: '35%', opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-35%', opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
          className="bg-gradient-to-b from-white via-slate-100 to-blue-200 bg-clip-text text-transparent drop-shadow-[0_2px_18px_rgba(59,130,246,0.5)]"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
});

// Bloco individual da contagem com glassmorphism e iluminação azul
function CountdownUnit({
  value,
  label,
  testId,
}: {
  value: string;
  label: string;
  testId?: string;
}) {
  return (
    <div
      data-testid={testId}
      className="group relative flex min-w-[64px] sm:min-w-[88px] md:min-w-[110px] lg:min-w-[130px] flex-col items-center justify-center rounded-xl sm:rounded-2xl md:rounded-3xl border border-blue-500/20 bg-gradient-to-b from-blue-950/40 via-navy-900/60 to-navy-950/80 px-2 py-3 sm:px-4 sm:py-5 md:p-6 lg:p-7 shadow-[0_8px_32px_-8px_rgba(30,58,138,0.35)] backdrop-blur-xl transition-all duration-300 hover:border-blue-400/40 hover:shadow-[0_0_40px_-5px_rgba(59,130,246,0.35)]"
    >
      {/* Linha de reflexo specular superior */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] rounded-t-xl sm:rounded-t-2xl md:rounded-t-3xl bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

      {/* Luz ambiente interna suave */}
      <div className="pointer-events-none absolute -inset-px rounded-xl sm:rounded-2xl md:rounded-3xl bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Número com tamanho adaptativo e tipografia premium */}
      <div className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl leading-none">
        <AnimatedNumber value={value} />
      </div>

      {/* Label descritivo */}
      <span className="mt-1.5 sm:mt-2.5 text-[9px] sm:text-xs md:text-sm font-semibold tracking-[0.14em] sm:tracking-[0.16em] uppercase text-blue-300/80">
        {label}
      </span>
    </div>
  );
}

// Separador com pontos piscantes sutis
function Separator() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-1.5 sm:gap-2.5 px-0.5 sm:px-1 text-blue-400/60"
      aria-hidden="true"
    >
      <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)] animate-pulse" />
      <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)] animate-pulse" />
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeRemaining);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Atualiza imediatamente na montagem
    setTimeLeft(getTimeRemaining());

    const interval = window.setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  // Quando o lançamento tiver chegado (20 de setembro de 2026 em Portugal)
  if (mounted && timeLeft.isFinished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto my-6 max-w-xl overflow-hidden rounded-3xl border border-blue-400/40 bg-gradient-to-b from-blue-950/60 via-navy-900/80 to-navy-950/90 p-8 sm:p-12 text-center shadow-[0_0_60px_-10px_rgba(59,130,246,0.5)] backdrop-blur-2xl"
      >
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-blue-500/30 blur-3xl" />
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-300">
          <Sparkles className="h-3.5 w-3.5 text-blue-400" />
          Lançamento Oficial
        </div>
        <h2 className="mt-6 font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          {site.launch.finishedMessage}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300">
          O próximo nível da tua turma já está disponível em Portugal.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      {/* Contêiner principal da contagem com grid/flex responsivo */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-3 md:gap-4 lg:gap-5">
        <CountdownUnit value={timeLeft.days} label="DIAS" testId="countdown-days" />
        <Separator />
        <CountdownUnit value={timeLeft.hours} label="HORAS" testId="countdown-hours" />
        <Separator />
        <CountdownUnit value={timeLeft.minutes} label="MINUTOS" testId="countdown-minutes" />
        <Separator />
        <CountdownUnit value={timeLeft.seconds} label="SEGUNDOS" testId="countdown-seconds" />
      </div>

      {/* Detalhe sutil de data e fuso horário oficial de Portugal */}
      <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-400">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/15 bg-blue-950/40 px-3 py-1 backdrop-blur-md">
          <Calendar className="h-3.5 w-3.5 text-blue-400" />
          <span className="font-medium text-slate-300">{site.launch.displayDate}</span>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/15 bg-blue-950/40 px-3 py-1 backdrop-blur-md">
          <Clock className="h-3.5 w-3.5 text-blue-400" />
          <span className="text-slate-400">Horário de Portugal (Lisboa · WEST / UTC+1)</span>
        </span>
      </div>
    </div>
  );
}
