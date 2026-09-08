import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Camada de segurança nível empresarial, aplicada a cada resposta.
 *
 * Controles:
 * - CSP restritiva (sem terceiros: fontes self-hosted, zero CDNs de script)
 * - HSTS (max-age 2 anos, includeSubDomains, preload-ready)
 * - nosniff, referrer no-referrer (evita vazamento de URLs/origem)
 * - Permissions-Policy negando todos os recursos sensíveis
 * - COOP / CORP / X-Permitted-Cross-Domain-Policies / DNS-prefetch off
 * - Anti-clickjacking (frame-ancestors 'none' + X-Frame-Options DENY)
 *   ativado automaticamente em deploy de produção (VERCEL_ENV=production),
 *   para não bloquear iframes de preview de desenvolvimento.
 *
 * Nota sobre script-src: o Next.js (App Router, páginas estáticas) emite
 * scripts inline de hidratação sem suporte a nonce — por isso 'unsafe-inline'
 * é mantido como dívida documentada. Não há scripts de terceiros no site,
 * o que elimina o vetor principal que a CSP com nonce mitigaria.
 */

const isProductionDeploy = process.env.VERCEL_ENV === 'production';

function buildCsp(): string {
  const directives = [
    "default-src 'self'",
    // Hidratação do Next.js (scripts inline estáticos) — ver nota acima.
    "script-src 'self' 'unsafe-inline'",
    // Framer Motion / cursor personalizado aplicam style inline via JS.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    'upgrade-insecure-requests',
  ];
  if (isProductionDeploy) {
    directives.push("frame-ancestors 'none'");
  }
  return directives.join('; ');
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const headers: Array<[string, string]> = [
    ['Content-Security-Policy', buildCsp()],
    [
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains; preload',
    ],
    ['X-Content-Type-Options', 'nosniff'],
    ['Referrer-Policy', 'no-referrer'],
    [
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), ' +
        'accelerometer=(), gyroscope=(), magnetometer=(), browsing-topics=(), ' +
        'interest-cohort=()',
    ],
    ['Cross-Origin-Opener-Policy', 'same-origin'],
    ['X-Permitted-Cross-Domain-Policies', 'none'],
    ['X-DNS-Prefetch-Control', 'off'],
    ['Origin-Agent-Cluster', '?1'],
  ];

  if (isProductionDeploy) {
    headers.push(['X-Frame-Options', 'DENY']);
    headers.push(['Cross-Origin-Resource-Policy', 'same-origin']);
  }

  for (const [key, value] of headers) {
    response.headers.set(key, value);
  }

  // Documentos HTML nunca podem ser servidos de cache stale:
  // garante que o browser sempre busque o HTML novo (com os hashes novos).
  // Assets /_next/static continuam com cache longo (nomes com hash).
  const { pathname } = request.nextUrl;
  const isDocument =
    !pathname.startsWith('/_next') && !pathname.includes('.') && pathname !== '/favicon.ico';
  if (isDocument) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }

  return response;
}

export const config = {
  // Aplica a tudo, exceto assets estáticos versionados do Next.
  matcher: ['/((?!_next/static).*)'],
};
