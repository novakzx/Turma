import { NextResponse } from 'next/server';
import { supabaseConfig } from '@/lib/supabaseServer';

const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(request: Request) {
  let body: { nome?: unknown; telefone?: unknown; email?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 });
  }

  const nome = typeof body.nome === 'string' ? body.nome.trim() : '';
  const telefone = typeof body.telefone === 'string' ? body.telefone.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

  if (nome.length < 2 || telefone.replace(/\D/g, '').length < 8 || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: 'Preenche nome, telefone e e-mail válidos.' },
      { status: 400 },
    );
  }

  const { url, anonKey } = supabaseConfig();

  // Insere direto via PostgREST com a chave anônima -- RLS na tabela
  // `inscricoes_lancamento` já permite `insert` público (ver migration
  // no repositório do app), sem policy nenhuma de select/update/delete.
  const resposta = await fetch(`${url}/rest/v1/inscricoes_lancamento`, {
    method: 'POST',
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({ nome, telefone, email }),
  });

  if (resposta.status === 409) {
    return NextResponse.json(
      { error: 'Esse e-mail já está na lista de acesso antecipado.' },
      { status: 409 },
    );
  }
  if (!resposta.ok) {
    return NextResponse.json(
      { error: 'Não foi possível gravar a tua inscrição. Tenta de novo.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
