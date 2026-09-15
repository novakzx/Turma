/**
 * Só é importado por Route Handlers (`src/app/api/**`), nunca por um
 * componente `'use client'` -- mantém a URL/chave anônima do Supabase
 * fora do bundle do navegador, além da CSP (`connect-src 'self'` em
 * `middleware.ts`) já impedir o cliente de falar direto com terceiros.
 */
function env(nome: string): string {
  const valor = process.env[nome];
  if (!valor) throw new Error(`Variável de ambiente ${nome} não configurada.`);
  return valor;
}

export function supabaseConfig() {
  return {
    url: env('SUPABASE_URL'),
    anonKey: env('SUPABASE_ANON_KEY'),
  };
}
