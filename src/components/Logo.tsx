import { site } from '@/config/site';
import { cn } from '@/lib/cn';

/**
 * Logo do Turma+ — squircle com gradiente violeta, "+" branco
 * e ponto laranja de "comunidade/notificação".
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn('h-8 w-8', className)} aria-hidden="true">
      <defs>
        <linearGradient id="tma-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B7BFB" />
          <stop offset="55%" stopColor="#6C56F0" />
          <stop offset="100%" stopColor="#4C36C7" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="15" fill="url(#tma-g)" />
      <path
        d="M24 14.5v19M14.5 24h19"
        stroke="#fff"
        strokeWidth="5.2"
        strokeLinecap="round"
      />
      <circle cx="35.5" cy="12.5" r="4.2" fill="#FDBA2C" />
    </svg>
  );
}

export default function Logo({
  dark = false,
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
        {hasPlus && <span className={dark ? 'text-brand-400' : 'text-brand-600'}>+</span>}
      </span>
    </span>
  );
}
