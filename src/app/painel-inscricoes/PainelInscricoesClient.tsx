'use client';

import { useCallback, useState } from 'react';
import { Download, KeyRound, Loader2, RefreshCw, Trash2 } from 'lucide-react';
import { cn } from '@/lib/cn';

type Inscricao = {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  criado_em: string;
};

/**
 * Painel separado (fora do login normal, sem link no site público) pra
 * ver quem se inscreveu na lista de acesso antecipado. A senha só fica
 * em memória (estado do componente) -- nunca gravada em disco. Só faz
 * proxy pra rota `/api/inscricoes*`, que por sua vez fala com a Edge
 * Function `inscricoes-lancamento` do Supabase (repositório do app).
 */
export default function PainelInscricoesClient() {
  const [senha, setSenha] = useState('');
  const [senhaAtiva, setSenhaAtiva] = useState<string | null>(null);
  const [inscricoes, setInscricoes] = useState<Inscricao[] | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [apagandoId, setApagandoId] = useState<string | null>(null);
  const [erro, setErro] = useState<string>();

  const carregar = useCallback(async (senhaParaUsar: string) => {
    setCarregando(true);
    setErro(undefined);
    try {
      const resposta = await fetch('/api/inscricoes', {
        headers: { 'x-admin-senha': senhaParaUsar },
      });
      const corpo = await resposta.json().catch(() => ({}));
      if (!resposta.ok) {
        setErro(typeof corpo?.error === 'string' ? corpo.error : 'Senha incorreta.');
        setInscricoes(null);
        setSenhaAtiva(null);
        return;
      }
      setInscricoes(corpo.inscricoes ?? []);
      setSenhaAtiva(senhaParaUsar);
    } catch {
      setErro('Falha de ligação. Tenta de novo.');
      setSenhaAtiva(null);
    } finally {
      setCarregando(false);
    }
  }, []);

  function handleEntrar(e: React.FormEvent) {
    e.preventDefault();
    if (!senha) {
      setErro('Indica a senha.');
      return;
    }
    void carregar(senha);
  }

  async function handleApagar(id: string) {
    if (!senhaAtiva) return;
    setApagandoId(id);
    try {
      const resposta = await fetch(`/api/inscricoes/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-senha': senhaAtiva },
      });
      if (resposta.ok) {
        setInscricoes((atual) => atual?.filter((i) => i.id !== id) ?? null);
      }
    } finally {
      setApagandoId(null);
    }
  }

  function handleExportarCsv() {
    if (!inscricoes || inscricoes.length === 0) return;
    const linhas = [
      'nome,telefone,email,criado_em',
      ...inscricoes.map(
        (i) => `"${i.nome.replace(/"/g, '""')}","${i.telefone}","${i.email}","${i.criado_em}"`,
      ),
    ];
    const blob = new Blob([linhas.join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'inscricoes-turma-mais.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  if (!senhaAtiva || !inscricoes) {
    return (
      <section className="flex min-h-[80vh] items-center justify-center px-4 py-24">
        <form
          onSubmit={handleEntrar}
          className="w-full max-w-sm rounded-2xl border border-white/[0.08] bg-[#0c0d14] p-8"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-500/40 bg-blue-500/10">
              <KeyRound className="h-5 w-5 text-blue-400" />
            </div>
            <h1 className="font-display text-xl font-bold text-white">Painel de inscrições</h1>
          </div>

          <label className="mt-6 flex flex-col gap-1.5">
            <span className="text-xs font-medium text-zinc-400">Senha</span>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="off"
              className="rounded-xl border border-white/[0.08] bg-[#07080d] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-blue-500"
            />
          </label>

          {erro && <p className="mt-2 text-sm text-red-400">{erro}</p>}

          <button
            type="submit"
            disabled={carregando}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-400 disabled:opacity-60"
          >
            {carregando ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            <span>Entrar</span>
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="container-x">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Inscrições</h1>
            <p className="mt-1 text-sm text-zinc-400">
              {inscricoes.length} {inscricoes.length === 1 ? 'pessoa' : 'pessoas'} na lista
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportarCsv}
              disabled={inscricoes.length === 0}
              className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-[#0c0d14] px-3.5 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-white/20 disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              <span>CSV</span>
            </button>
            <button
              onClick={() => void carregar(senhaAtiva)}
              className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-[#0c0d14] px-3.5 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-white/20"
            >
              <RefreshCw className={cn('h-4 w-4', carregando && 'animate-spin')} />
              <span>Atualizar</span>
            </button>
          </div>
        </div>

        {inscricoes.length === 0 ? (
          <p className="mt-10 text-center text-sm text-zinc-400">Ninguém se inscreveu ainda.</p>
        ) : (
          <div className="mt-6 flex flex-col gap-2">
            {inscricoes.map((i) => (
              <div
                key={i.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-[#0c0d14] px-4 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{i.nome}</p>
                  <p className="truncate text-xs text-zinc-400">
                    {i.email} · {i.telefone}
                  </p>
                  <p className="text-xs text-zinc-500">{new Date(i.criado_em).toLocaleString('pt-PT')}</p>
                </div>
                <button
                  onClick={() => void handleApagar(i.id)}
                  aria-label={`Apagar inscrição de ${i.nome}`}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
                >
                  {apagandoId === i.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
