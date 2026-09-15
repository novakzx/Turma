import { NextResponse } from 'next/server';
import { supabaseConfig } from '@/lib/supabaseServer';

/**
 * Proxy same-origin pra Edge Function `inscricoes-lancamento` do projeto
 * Supabase (repositório do app) -- o navegador nunca fala com o Supabase
 * direto (CSP `connect-src 'self'`), só com esta rota. A senha do
 * painel só é conferida lá (`ADMIN_LANCAMENTO_SENHA`); aqui só repassa
 * o header recebido.
 */
export async function GET(request: Request) {
  const senha = request.headers.get('x-admin-senha');
  if (!senha) {
    return NextResponse.json({ error: 'Senha obrigatória.' }, { status: 401 });
  }

  const { url, anonKey } = supabaseConfig();
  const resposta = await fetch(`${url}/functions/v1/inscricoes-lancamento`, {
    method: 'GET',
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      'x-admin-senha': senha,
    },
    cache: 'no-store',
  });

  const corpo = await resposta.json().catch(() => ({ error: 'Resposta inválida do servidor.' }));
  return NextResponse.json(corpo, { status: resposta.status });
}
