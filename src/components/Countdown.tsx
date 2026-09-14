'use client';

import { useEffect, useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// Número limpo com transição vertical discreta e sem gradientes de texto
const AnimatedDigit = memo(function AnimatedDigit({ value }: { value: string }) {
  return (
    <div className="relative inline-flex h-[1.1em] items-center justify-center overflow-hidden font-mono font-bold tabular-nums">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: '25%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-25%', opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="text-white select-none"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
});

// Bloco individual da contagem: design estrutural, minimalista e sólido
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
      className="flex min-w-[62px] sm:min-w-[92px] md:min-w-[115px] lg:min-w-[135px] flex-col items-center justify-center rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#0c0d14] px-2 py-3 sm:px-4 sm:py-5 md:p-6 transition-colors hover:border-blue-500/40"
    >
      {/* Dígitos nítidos e sólidos */}
      <div className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none">
        <AnimatedDigit value={value} />
      </div>

      {/* Rótulo limpo em fonte mono com espaçamento elegante */}
      <span className="mt-2 sm:mt-3 font-mono text-[8px] sm:text-[11px] md:text-xs font-medium tracking-[0.16em] sm:tracking-[0.2em] text-zinc-400">
        {label}
      </span>
    </div>
  );
}

// Separador simples e direto
function ColonSeparator() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 px-0.5 text-zinc-600 select-none"
      aria-hidden="true"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
      <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeRemaining);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto my-6 max-w-xl rounded-2xl border border-blue-500/40 bg-[#0c0d14] p-8 sm:p-12 text-center"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-blue-400">
          ● Lançamento Oficial
        </span>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white">
          {site.launch.finishedMessage}
        </h2>
        <p className="mt-3 text-base text-zinc-300">
          O próximo nível da tua turma já está disponível em Portugal.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      {/* Contêiner principal da contagem */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-3 md:gap-4 lg:gap-5">
        <CountdownUnit value={timeLeft.days} label="DIAS" testId="countdown-days" />
        <ColonSeparator />
        <CountdownUnit value={timeLeft.hours} label="HORAS" testId="countdown-hours" />
        <ColonSeparator />
        <CountdownUnit value={timeLeft.minutes} label="MINUTOS" testId="countdown-minutes" />
        <ColonSeparator />
        <CountdownUnit value={timeLeft.seconds} label="SEGUNDOS" testId="countdown-seconds" />
      </div>

      {/* Metadados limpos e técnicos de data e fuso horário */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-mono text-xs text-zinc-400">
        <span className="rounded-md border border-white/[0.08] bg-[#0c0d14] px-3 py-1">
          {site.launch.displayDate}
        </span>
        <span className="rounded-md border border-white/[0.08] bg-[#0c0d14] px-3 py-1 text-zinc-400">
          Fuso horário de Lisboa · WEST (UTC+1)
        </span>
      </div>
    </div>
  );
}
