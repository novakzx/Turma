'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Sparkles, Send, BookOpen, FileText, Map, ListChecks, HelpCircle } from 'lucide-react';
import PhoneMockup from '@/components/PhoneMockup';
import SectionHeading from '@/components/SectionHeading';
import { fadeUp, stagger, viewport } from '@/lib/motion';
import { cn } from '@/lib/cn';

const CAPS = [
  { icon: HelpCircle, label: 'Tirar dúvidas' },
  { icon: BookOpen, label: 'Pedir explicações' },
  { icon: FileText, label: 'Gerar resumos' },
  { icon: ListChecks, label: 'Criar planos de estudo' },
  { icon: Map, label: 'Estudar várias matérias' },
];

const CONVO = [
  { role: 'user' as const, text: 'O que come uma arara?' },
  {
    role: 'ai' as const,
    text: 'A arara é sobretudo frugívora: sementes, frutos secos e bagas. De vez em quando, pequenos insetos para uma dose extra de proteína. 🦜',
  },
  { role: 'user' as const, text: 'Cria um resumo de Ciências sobre isto.' },
  { role: 'ai' as const, text: 'Resumo criado ✓ — “Alimentação da arara: herbívora/frugívora, bico forte para partir cascas…”' },
];

function ChatDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });
  const reduced = useReducedMotion();
  const [step, setStep] = useState(reduced ? CONVO.length : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setStep(CONVO.length);
      return;
    }
    const timers: number[] = [];
    CONVO.forEach((_, i) => {
      timers.push(window.setTimeout(() => setStep(i + 1), 700 + i * 1400));
    });
    return () => timers.forEach(clearTimeout);
  }, [inView, reduced]);

  return (
    <div
      ref={ref}
      className="relative mt-10 max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
    >
      <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
          <Sparkles className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-semibold text-white">IA de Ciências</p>
          <p className="text-[11px] text-emerald-400">● online agora</p>
        </div>
      </div>

      <div className="mt-4 flex min-h-[260px] flex-col gap-3">
        {CONVO.slice(0, step).map((m, i) => (
          <motion.div
            key={i}
            initial={reduced ? false : { opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
              m.role === 'user'
                ? 'self-end rounded-br-md bg-brand-600 text-white'
                : 'self-start rounded-bl-md bg-white/10 text-slate-200'
            )}
          >
            {m.text}
          </motion.div>
        ))}
        {step < CONVO.length && inView && !reduced && (
          <div className="flex items-center gap-1.5 self-start rounded-2xl rounded-bl-md bg-white/10 px-4 py-3">
            {[0, 1, 2].map((d) => (
              <span
                key={d}
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300"
                style={{ animationDelay: `${d * 140}ms` }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-2 pl-4 pr-2">
        <span className="flex-1 text-sm text-slate-500">Escreve a tua pergunta…</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white">
          <Send className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}

export default function AIStudy() {
  return (
    <section id="estudo" className="relative overflow-hidden bg-navy-950 py-28 lg:py-36">
      <div className="bg-grid-dark mask-radial absolute inset-0" />
      <div className="absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-brand-600/20 blur-[130px]" />
      <div className="absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-accent/10 blur-[110px]" />

      <div className="container-x relative grid items-center gap-16 lg:grid-cols-2 lg:gap-10">
        {/* device */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger}
          className="relative order-2 flex justify-center lg:order-1"
        >
          <motion.div variants={fadeUp} className="relative">
            <div className="absolute -inset-10 rounded-full bg-brand-600/25 blur-[90px]" />
            <motion.div
              variants={fadeUp}
              whileHover={{ rotate: -2, scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="relative -rotate-3"
            >
              <div className="animate-float-slow">
                <PhoneMockup width="w-[270px] sm:w-[300px]">
                  <img
                    src="/screenshots/estudo.png"
                    alt="Tela Estudo com conversa de IA"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                </PhoneMockup>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* copy */}
        <div className="order-1 lg:order-2">
          <SectionHeading
            dark
            align="left"
            eyebrow="Estudo com IA"
            title="Seu novo parceiro de estudos."
          />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={stagger}
            className="mt-8"
          >
            <motion.p
              variants={fadeUp}
              className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl"
            >
              Pergunte.
              <br />
              Entenda.
              <br />
              <span className="bg-gradient-to-r from-brand-300 to-brand-500 bg-clip-text text-transparent">
                Aprenda.
              </span>
            </motion.p>

            <motion.ul variants={fadeUp} className="mt-8 grid max-w-md gap-3">
              {CAPS.map((c) => (
                <li key={c.label} className="flex items-center gap-3 text-slate-300">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand-300">
                    <c.icon className="h-4 w-4" />
                  </span>
                  {c.label}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <ChatDemo />
        </div>
      </div>
    </section>
  );
}
