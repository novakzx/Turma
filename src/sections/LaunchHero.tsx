'use client';

import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from '@/components/BrandIcons';
import Countdown from '@/components/Countdown';
import { site } from '@/config/site';
import { scrollToId } from '@/lib/scroll';

export default function LaunchHero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center px-4 pt-24 pb-16 text-center sm:px-6 sm:pt-28 sm:pb-20 bg-[#07080d]"
    >
      {/* Grade estrutural sutil (linhas finas, sem manchas coloridas de gradiente) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="container-x relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto">
        {/* Tag monospaçada e minimalista */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0e0f18] px-3.5 py-1 text-xs font-mono text-zinc-300">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          <span>Lançamento · 20 de Setembro de 2026</span>
        </div>

        {/* Título: Turma+ sem gradiente de texto, tipografia nítida e sólida */}
        <div className="mt-8 select-none">
          <h1 className="font-display text-7xl font-extrabold tracking-tight sm:text-8xl md:text-9xl lg:text-[10rem] leading-none text-white">
            Turma<span className="text-blue-500">+</span>
          </h1>
        </div>

        {/* Frase direta de expectativa */}
        <p className="mt-6 max-w-xl text-lg font-normal text-zinc-300 sm:text-xl">
          {site.heroPhrase}
        </p>

        {/* Contagem Regressiva Principal */}
        <div className="mt-10 sm:mt-14 w-full max-w-3xl">
          <Countdown />
        </div>

        {/* Ação principal: acesso antecipado */}
        <div className="mt-10 sm:mt-12">
          <button
            onClick={() => scrollToId('acesso-antecipado')}
            className="inline-flex items-center gap-2.5 rounded-xl bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-400"
          >
            <span>Quero acesso antecipado</span>
            <ArrowDown className="h-4 w-4" />
          </button>
        </div>

        {/* Ações secundárias: Instagram oficial e atalho para a seção Sobre */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-xl border border-white/15 bg-[#0e0f18] px-5 py-3 text-sm font-medium text-white transition-all hover:border-blue-500/50 hover:bg-[#131524]"
          >
            <InstagramIcon className="h-4 w-4 text-blue-400" />
            <span>Instagram</span>
            <span className="font-mono text-xs text-zinc-400">@{site.instagram}</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          <button
            onClick={() => scrollToId('sobre')}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-transparent px-5 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
          >
            <span>Sobre o Turma+</span>
            <ArrowDown className="h-3.5 w-3.5 text-zinc-400" />
          </button>
        </div>
      </div>
    </section>
  );
}
