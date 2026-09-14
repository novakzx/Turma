'use client';

import { ArrowUp } from 'lucide-react';
import { InstagramIcon } from '@/components/BrandIcons';
import Logo from '@/components/Logo';
import { site } from '@/config/site';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-blue-500/10 bg-navy-950 py-12 text-slate-400">
      {/* Glow azul sutil de fundo no rodapé */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[200px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[100px]" />

      <div className="container-x relative flex flex-col items-center justify-between gap-8 md:flex-row">
        {/* Identidade do Turma+ */}
        <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
          <Logo dark />
          <p className="text-xs sm:text-sm text-slate-400">
            {site.tagline}
          </p>
        </div>

        {/* Botão Instagram Oficial */}
        <div className="flex flex-col items-center gap-2">
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full border border-blue-500/25 bg-blue-950/40 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_-5px_rgba(59,130,246,0.25)] backdrop-blur-md transition-all duration-300 hover:border-blue-400/50 hover:bg-blue-600/20 hover:shadow-[0_0_35px_-5px_rgba(59,130,246,0.5)]"
          >
            <InstagramIcon className="h-4 w-4 text-blue-400 transition-transform duration-300 group-hover:scale-110" />
            <span>Instagram</span>
          </a>
          <span className="text-[11px] text-slate-400">
            @{site.instagram}
          </span>
        </div>

        {/* Informações de copyright e fuso horário */}
        <div className="flex flex-col items-center gap-2 text-center md:items-end md:text-right">
          <p className="text-xs sm:text-sm text-slate-400">
            © 2026 {site.name}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">
              Portugal (Lisboa · WEST)
            </span>
            <button
              onClick={scrollToTop}
              aria-label="Voltar ao topo"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-blue-500/20 bg-blue-950/40 text-slate-400 transition-colors hover:border-blue-400/40 hover:text-white"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
