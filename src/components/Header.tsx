'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
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
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-blue-500/15 bg-navy-950/75 py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent py-4 sm:py-5'
      )}
    >
      <div className="container-x flex items-center justify-between">
        {/* Logo Turma+ */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex items-center gap-2.5 transition-transform duration-300 hover:scale-[1.02]"
          aria-label={`${site.name} — início`}
        >
          <Logo dark />
        </button>

        {/* Links sutis da landing page */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <button
            onClick={() => scrollToId('sobre')}
            className="rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-white hover:bg-white/5"
          >
            Sobre o Turma+
          </button>

          {/* Botão de Instagram */}
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram oficial do Turma+"
            className="group relative inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/40 px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-[0_0_20px_-5px_rgba(59,130,246,0.35)] backdrop-blur-md transition-all duration-300 hover:border-blue-400 hover:bg-blue-600/20 hover:shadow-[0_0_30px_-3px_rgba(59,130,246,0.6)]"
          >
            <InstagramIcon className="h-4 w-4 text-blue-400 transition-transform duration-300 group-hover:scale-110" />
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
