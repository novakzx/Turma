import { site } from '@/config/site';
import { cn } from '@/lib/cn';

/**
 * Logo do Turma+ — squircle azul sólido com cruz branca e ponto de notificação
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn('h-8 w-8', className)} aria-hidden="true">
      <rect x="2" y="2" width="44" height="44" rx="12" fill="#1877F2" />
      <path
        d="M24 14v20M14 24h20"
        stroke="#ffffff"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <circle cx="35" cy="13" r="3.5" fill="#ffffff" />
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
          dark ? 'text-white' : 'text-zinc-900'
        )}
      >
        {base}
        {hasPlus && <span className="text-blue-500">+</span>}
      </span>
    </span>
  );
}
