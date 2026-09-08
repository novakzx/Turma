'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import Logo from '@/components/Logo';
import Magnetic from '@/components/Magnetic';
import { site } from '@/config/site';
import { cn } from '@/lib/cn';
import { hrefToId, scrollToId } from '@/lib/scroll';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    scrollToId(hrefToId(href));
  };

  return (
    <>
      <motion.header
        initial={reduced ? false : { y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-[70] transition-all duration-500',
          scrolled
            ? 'border-b border-slate-900/5 bg-white/70 shadow-[0_8px_30px_-12px_rgba(17,12,46,0.12)] backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        )}
      >
        <div className="container-x flex h-[72px] items-center justify-between">
          <button
            onClick={() => go('#inicio')}
            className="transition-transform duration-300 hover:scale-[1.03]"
            aria-label={`${site.name} — início`}
          >
            <Logo />
          </button>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
            {site.nav.map((item) => (
              <button
                key={item.href}
                onClick={() => go(item.href)}
                className="group relative rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                {item.label}
                <span className="absolute inset-x-4 -bottom-px h-px origin-left scale-x-0 bg-brand-600 transition-transform duration-300 group-hover:scale-x-100" />
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              onClick={() => go('#cta')}
              className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:text-brand-600"
            >
              Entrar
            </button>
            <Magnetic>
              <button
                onClick={() => go('#cta')}
                className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:bg-brand-500 hover:shadow-[0_0_80px_-12px_rgba(108,86,240,0.8)]"
              >
                Começar agora
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </Magnetic>
          </div>

          <button
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-900/10 bg-white/70 backdrop-blur lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col bg-navy-950/95 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="container-x flex h-[72px] items-center justify-between">
              <Logo dark />
              <button
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white"
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="container-x mt-10 flex flex-col gap-2" aria-label="Menu mobile">
              {site.nav.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => go(item.href)}
                  className="rounded-2xl px-4 py-4 text-left font-display text-3xl font-bold text-white transition-colors hover:text-brand-300"
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
            <motion.div
              className="container-x mt-auto pb-10"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <button
                onClick={() => go('#cta')}
                className="w-full rounded-full bg-brand-600 py-4 text-center text-base font-semibold text-white shadow-glow"
              >
                Começar agora
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
