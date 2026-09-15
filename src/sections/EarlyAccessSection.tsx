'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Rocket } from 'lucide-react';
import { cn } from '@/lib/cn';
import { fadeUp, stagger, viewport } from '@/lib/motion';

type Erros = { nome?: string; telefone?: string; email?: string; geral?: string };

const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export default function EarlyAccessSection() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [erros, setErros] = useState<Erros>({});
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const novosErros: Erros = {};
    if (nome.trim().length < 2) novosErros.nome = 'Indica o teu nome completo.';
    if (telefone.replace(/\D/g, '').length < 8) novosErros.telefone = 'Indica um número válido.';
    if (!EMAIL_REGEX.test(email.trim())) novosErros.email = 'Indica um e-mail válido.';
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    setEnviando(true);
    try {
      const resposta = await fetch('/api/inscricao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, telefone, email }),
      });
      const corpo = await resposta.json().catch(() => ({}));
      if (!resposta.ok) {
        setErros({
          geral:
            typeof corpo?.error === 'string' ? corpo.error : 'Não foi possível enviar. Tenta de novo.',
        });
        return;
      }
      setEnviado(true);
    } catch {
      setErros({ geral: 'Falha de ligação. Verifica a tua internet e tenta de novo.' });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section
      id="acesso-antecipado"
      className="relative border-t border-white/[0.08] bg-[#07080d] py-24 sm:py-32"
    >
      <div className="container-x relative">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mx-auto max-w-xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-[0.2em] text-blue-500"
          >
            Lista de Espera
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-white"
          >
            Garante o teu acesso antecipado
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-base sm:text-lg leading-relaxed text-zinc-300">
            Deixa os teus dados e sê dos primeiros a entrar quando o Turma+ chegar, a 20 de
            setembro de 2026.
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mx-auto mt-10 max-w-md"
        >
          {enviado ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-blue-500/40 bg-[#0c0d14] px-6 py-10 text-center">
              <CheckCircle2 className="h-10 w-10 text-blue-400" />
              <p className="font-display text-xl font-bold text-white">Inscrição confirmada</p>
              <p className="text-sm text-zinc-300">
                Avisamos-te por e-mail assim que o Turma+ estiver disponível.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <Campo
                label="Nome"
                value={nome}
                onChange={setNome}
                erro={erros.nome}
                placeholder="O teu nome completo"
                autoComplete="name"
              />
              <Campo
                label="Telefone"
                value={telefone}
                onChange={setTelefone}
                erro={erros.telefone}
                placeholder="912 345 678"
                type="tel"
                autoComplete="tel"
              />
              <Campo
                label="E-mail"
                value={email}
                onChange={setEmail}
                erro={erros.email}
                placeholder="tu@email.com"
                type="email"
                autoComplete="email"
              />

              {erros.geral && <p className="text-sm text-red-400">{erros.geral}</p>}

              <button
                type="submit"
                disabled={enviando}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {enviando ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Rocket className="h-4 w-4" />
                )}
                <span>Quero acesso antecipado</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Campo({
  label,
  value,
  onChange,
  erro,
  placeholder,
  type = 'text',
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  erro?: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-left">
      <span className="text-xs font-medium text-zinc-400">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={cn(
          'rounded-xl border bg-[#0c0d14] px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-blue-500',
          erro ? 'border-red-500/60' : 'border-white/[0.08]',
        )}
      />
      {erro && <span className="text-xs text-red-400">{erro}</span>}
    </label>
  );
}
