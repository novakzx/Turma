'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Instagram, Youtube, Twitter, Mail } from 'lucide-react';
import Logo from '@/components/Logo';
import { site } from '@/config/site';
import { hrefToId, scrollToId } from '@/lib/scroll';

const PRODUCT_LINKS = [
  { label: 'Funcionalidades', href: '#funcionalidades' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Estudo com IA', href: '#estudo' },
  { label: 'Comunidade', href: '#comunidade' },
];

const COMPANY_LINKS = ['Sobre', 'Privacidade', 'Termos', 'Contato'];

const instagramUrl = `https://www.instagram.com/${site.instagram}`;

const SOCIALS: Array<{
  icon: typeof Instagram;
  label: string;
  href?: string;
}> = [
  { icon: Instagram, label: 'Instagram', href: instagramUrl },
  { icon: Twitter, label: 'X / Twitter' },
  { icon: Youtube, label: 'YouTube' },
  { icon: Mail, label: 'Email', href: `mailto:${site.contactEmail}` },
];

export default function Footer() {
  const [toast, setToast] = useState<string | null>(null);

  const notify = (label: string) => {
    setToast(`${label} — disponível em breve.`);
    window.setTimeout(() => setToast(null), 2400);
  };

  return (
    <footer className="relative overflow-hidden bg-navy-950 pb-10 pt-20 text-slate-400">
      <div className="absolute -top-40 left-1/2 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-brand-600/10 blur-[120px]" />

      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <Logo dark />
            <p className="mt-5 max-w-xs leading-relaxed">
              Estudo com IA, organização, comunidade e perfil do estudante — num só aplicativo.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) =>
                s.href ? (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-brand-400 hover:text-brand-300"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ) : (
                  <button
                    key={s.label}
                    aria-label={s.label}
                    onClick={() => notify(s.label)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-brand-400 hover:text-brand-300"
                  >
                    <s.icon className="h-4 w-4" />
                  </button>
                )
              )}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Produto</p>
            <ul className="mt-5 space-y-3">
              {PRODUCT_LINKS.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => scrollToId(hrefToId(l.href))}
                    className="transition-colors hover:text-brand-300"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Empresa</p>
            <ul className="mt-5 space-y-3">
              {COMPANY_LINKS.map((l) => (
                <li key={l}>
                  <button onClick={() => notify(l)} className="transition-colors hover:text-brand-300">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Navegar</p>
            <ul className="mt-5 space-y-3">
              {site.nav.slice(0, 4).map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => scrollToId(hrefToId(l.href))}
                    className="transition-colors hover:text-brand-300"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* barra inferior + botão do Instagram */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 lg:flex-row">
          <p className="order-2 text-sm lg:order-1">
            © 2026 {site.name}. Todos os direitos reservados.
          </p>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group order-1 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 py-2.5 pl-2.5 pr-6 backdrop-blur transition-all duration-300 hover:border-brand-400 hover:bg-brand-600/20 hover:shadow-glow lg:order-2"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white transition-transform duration-300 group-hover:scale-110">
              <Instagram className="h-5 w-5" />
            </span>
            <span className="text-left">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Segue-nos no Instagram
              </span>
              <span className="block text-sm font-bold text-white transition-colors group-hover:text-brand-300">
                @{site.instagram}
              </span>
            </span>
          </a>

          <p className="order-3 text-sm font-medium text-slate-300">{site.tagline}</p>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 z-[85] -translate-x-1/2 rounded-full border border-white/10 bg-navy-800/95 px-5 py-3 text-sm font-medium text-white shadow-lift backdrop-blur-xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
