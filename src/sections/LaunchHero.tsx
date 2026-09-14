'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { InstagramIcon } from '@/components/BrandIcons';
import Countdown from '@/components/Countdown';
import ParticlesBackground from '@/components/ParticlesBackground';
import { site } from '@/config/site';
import { scrollToId } from '@/lib/scroll';

const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false });

export default function LaunchHero() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-16 text-center sm:px-6 sm:pt-28 sm:pb-20"
    >
      {/* 1. Grade de fundo futurista */}
      <div className="bg-grid-futuristic mask-radial-hero absolute inset-0 pointer-events-none" />

      {/* 2. Partículas luminosas azuis discretas no background */}
      <ParticlesBackground />

      {/* 3. Efeitos de luz azul e glows suaves atrás do conteúdo */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[900px] max-w-full rounded-full bg-blue-600/15 blur-[150px] animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[340px] w-[560px] max-w-full rounded-full bg-cyan-500/10 blur-[130px]"
        aria-hidden="true"
      />

      {/* 4. Cena 3D ambiente sutil (apenas em desktop e quando o movimento não for reduzido) */}
      {mounted && !reduced && (
        <div className="pointer-events-none absolute inset-0 hidden lg:block opacity-45">
          <Scene />
        </div>
      )}

      {/* 5. Conteúdo centralizado */}
      <div className="container-x relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto">
        {/* Eyebrow de lançamento */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300 shadow-[0_0_20px_-3px_rgba(59,130,246,0.3)] backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
          </span>
          <span>Lançamento Oficial · 20 de Setembro · Portugal</span>
        </motion.div>

        {/* Nome principal: Turma+ com tipografia premium e glow azul */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 sm:mt-8 select-none"
        >
          <h1 className="font-display text-6xl font-black tracking-tight sm:text-8xl md:text-9xl lg:text-[10rem] leading-none">
            <span className="bg-gradient-to-b from-white via-slate-100 to-blue-200 bg-clip-text text-transparent drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
              Turma
            </span>
            <span className="relative inline-block text-blue-500 drop-shadow-[0_0_40px_rgba(59,130,246,0.9)]">
              +
              <span className="pointer-events-none absolute -inset-2 rounded-full bg-blue-500/20 blur-xl" />
            </span>
          </h1>
        </motion.div>

        {/* Frase de expectativa */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-xl text-lg font-medium text-slate-300 sm:text-2xl sm:leading-relaxed"
        >
          {site.heroPhrase}
        </motion.p>

        {/* Grande Contagem Regressiva */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 sm:mt-12 w-full max-w-3xl"
        >
          <Countdown />
        </motion.div>

        {/* Botão de Instagram em destaque sutil */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 rounded-full border border-blue-400/35 bg-gradient-to-r from-blue-950/70 via-navy-900/80 to-blue-950/70 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_25px_-5px_rgba(59,130,246,0.4)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:border-blue-400 hover:bg-blue-600/20 hover:shadow-[0_0_40px_-5px_rgba(59,130,246,0.7)]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-sm transition-transform duration-300 group-hover:scale-110">
              <InstagramIcon className="h-4 w-4" />
            </span>
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-wider text-blue-300/80">Segue o lançamento</span>
              <span className="font-bold text-white">Instagram @{site.instagram}</span>
            </div>
          </a>

          <button
            onClick={() => scrollToId('sobre')}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-300 backdrop-blur-md transition-all duration-300 hover:border-blue-500/30 hover:bg-blue-950/30 hover:text-white"
          >
            <span>Conhecer o aplicativo</span>
            <ChevronDown className="h-4 w-4 text-blue-400 animate-bounce-soft" />
          </button>
        </motion.div>
      </div>

      {/* Indicador de rolagem inferior */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        onClick={() => scrollToId('sobre')}
        aria-label="Rolar para a seção Sobre"
        className="group absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-xs text-slate-400 transition-colors hover:text-blue-300"
      >
        <span className="text-[10px] uppercase tracking-widest text-slate-400 group-hover:text-blue-400 transition-colors">
          Sobre o app
        </span>
        <div className="flex h-7 w-4 items-start justify-center rounded-full border border-white/20 p-1">
          <div className="h-1.5 w-1 rounded-full bg-blue-400 animate-bounce" />
        </div>
      </motion.button>
    </section>
  );
}
