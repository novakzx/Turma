import { NextResponse } from 'next/server';
import { supabaseConfig } from '@/lib/supabaseServer';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const senha = request.headers.get('x-admin-senha');
  if (!senha) {
    return NextResponse.json({ error: 'Senha obrigatória.' }, { status: 401 });
  }

  const { url, anonKey } = supabaseConfig();
  const resposta = await fetch(
    `${url}/functions/v1/inscricoes-lancamento?id=${encodeURIComponent(id)}`,
    {
      method: 'DELETE',
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
        'x-admin-senha': senha,
      },
    },
  );

  const corpo = await resposta.json().catch(() => ({ error: 'Resposta inválida do servidor.' }));
  return NextResponse.json(corpo, { status: resposta.status });
}
