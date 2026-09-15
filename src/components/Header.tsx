'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from '@/components/BrandIcons';
import Logo from '@/components/Logo';
import { site } from '@/config/site';
import { scrollToId } from '@/lib/scroll';
import { cn } from '@/lib/cn';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-200',
        scrolled
          ? 'border-b border-white/[0.08] bg-[#07080d]/90 py-3 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent py-4 sm:py-5'
      )}
    >
      <div className="container-x flex items-center justify-between">
        {/* Logo Turma+ */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
          aria-label={`${site.name} — início`}
        >
          <Logo dark />
        </button>

        {/* Links do Cabeçalho */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => scrollToId('sobre')}
            className="rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium text-zinc-300 transition-colors hover:text-white"
          >
            Sobre
          </button>

          <button
            onClick={() => scrollToId('acesso-antecipado')}
            className="hidden rounded-lg border border-blue-500/40 bg-blue-500/10 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-blue-300 transition-colors hover:border-blue-500/70 hover:text-white sm:inline-flex"
          >
            Acesso antecipado
          </button>

          {/* Botão de Instagram */}
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram oficial do Turma+"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#0e0f18] px-3.5 py-1.5 text-xs sm:text-sm font-medium text-white transition-colors hover:border-blue-500/50 hover:bg-[#131524]"
          >
            <InstagramIcon className="h-4 w-4 text-blue-400" />
            <span>Instagram</span>
            <ArrowUpRight className="h-3 w-3 text-zinc-400" />
          </a>
        </div>
      </div>
    </header>
  );
}
