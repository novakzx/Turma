import { cn } from '@/lib/cn';

/**
 * Mockup premium de iPhone em CSS puro — leve, nítdo e sem GLB externo.
 * O conteúdo (screenshots reais) é passado como children e preench a tela.
 */
export default function PhoneMockup({
  children,
  className,
  width = 'w-[280px] sm:w-[310px]',
}: {
  children?: React.ReactNode;
  className?: string;
  width?: string;
}) {
  return (
    <div className={cn('relative', width, className)}>
      {/* moldura de titânio */}
      <div className="relative rounded-[3rem] bg-gradient-to-b from-[#4a5065] via-[#151824] to-[#3c4156] p-[3px] shadow-phone">
        {/* botões laterais */}
        <div className="absolute -left-[2px] top-[18%] h-8 w-[3px] rounded-l bg-[#2b3040]" />
        <div className="absolute -left-[2px] top-[30%] h-12 w-[3px] rounded-l bg-[#2b3040]" />
        <div className="absolute -left-[2px] top-[44%] h-12 w-[3px] rounded-l bg-[#2b3040]" />
        <div className="absolute -right-[2px] top-[26%] h-16 w-[3px] rounded-r bg-[#2b3040]" />

        <div className="relative overflow-hidden rounded-[2.85rem] bg-black p-[9px]">
          <div className="relative aspect-[9/19] overflow-hidden rounded-[2.3rem] bg-white">
            {/* dynamic island */}
            <div className="absolute left-1/2 top-[10px] z-20 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-black" />
            {children}
            {/* reflexo de vidro */}
            <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-tr from-transparent via-white/[0.06] to-white/[0.14]" />
            <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-1/3 overflow-hidden">
              <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/[0.10] to-transparent animate-shine" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
