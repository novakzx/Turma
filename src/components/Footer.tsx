'use client';

import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from '@/components/BrandIcons';
import Logo from '@/components/Logo';
import { site } from '@/config/site';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#07080d] py-12 text-zinc-400">
      <div className="container-x flex flex-col items-center justify-between gap-8 md:flex-row">
        {/* Identidade */}
        <div className="flex flex-col items-center gap-1.5 text-center md:items-start md:text-left">
          <Logo dark />
          <p className="text-xs text-zinc-400">
            {site.tagline}
          </p>
        </div>

        {/* Botão Instagram Oficial */}
        <div className="flex flex-col items-center gap-2">
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-lg border border-white/15 bg-[#0e0f18] px-4 py-2 text-sm font-medium text-white transition-colors hover:border-blue-500/50 hover:bg-[#131524]"
          >
            <InstagramIcon className="h-4 w-4 text-blue-400" />
            <span>Instagram</span>
            <span className="font-mono text-xs text-zinc-400">@{site.instagram}</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" />
          </a>
        </div>

        {/* Copyright e fuso horário */}
        <div className="flex flex-col items-center gap-1.5 text-center md:items-end md:text-right">
          <p className="text-xs text-zinc-400">
            © 2026 {site.name}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-zinc-400">
              Portugal (WEST · UTC+1)
            </span>
            <button
              onClick={scrollToTop}
              aria-label="Voltar ao topo"
              className="flex h-6 w-6 items-center justify-center rounded border border-white/10 text-zinc-400 transition-colors hover:border-white/30 hover:text-white"
            >
              <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
