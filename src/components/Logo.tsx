import { site } from '@/config/site';
import { cn } from '@/lib/cn';

/**
 * Logo do Turma+ — squircle com gradiente azul futurista, "+" branco
 * e ponto ciano/elétrico.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn('h-8 w-8', className)} aria-hidden="true">
      <defs>
        <linearGradient id="tma-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="45%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="14" fill="url(#tma-g)" />
      <path
        d="M24 14.5v19M14.5 24h19"
        stroke="#fff"
        strokeWidth="5.2"
        strokeLinecap="round"
      />
      <circle cx="35.5" cy="12.5" r="4" fill="#38BDF8" />
    </svg>
  );
}

export default function Logo({
  dark = true,
  className,
}: {
  dark?: boolean;
  className?: string;
}) {
  const base = site.name.replace('+', '');
  const hasPlus = site.name.includes('+');

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      <span
        className={cn(
          'font-display text-xl font-bold tracking-tight',
          dark ? 'text-white' : 'text-slate-900'
        )}
      >
        {base}
        {hasPlus && <span className="text-blue-500 drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]">+</span>}
      </span>
    </span>
  );
}
