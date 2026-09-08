'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { fadeUp, stagger, viewport } from '@/lib/motion';
import { cn } from '@/lib/cn';

const FAQS = [
  {
    q: 'O que é o Turma+?',
    a: 'Um aplicativo educacional que junta estudo com IA, organização do ano letivo, feed da turma e perfil do estudante — tudo num só lugar.',
  },
  {
    q: 'Como funciona o estudo com IA?',
    a: 'Escolhes a matéria (Ciências, Geografia, Inglês, Matemática ou Português), fazes a tua pergunta e a IA tira dúvidas, explica conceitos, gera resumos e cria planos de estudo.',
  },
  {
    q: 'Que informações encontro em Feriados?',
    a: 'O calendário completo do ano letivo: início das aulas, feriados nacionais e interrupções letivas, com contagem de dias para o próximo evento.',
  },
  {
    q: 'Preciso de criar perfil para começar?',
    a: 'Sim — o teu perfil liga-te à tua escola e à tua turma, e é onde ficam as tuas publicações, matérias e seguidores.',
  },
  {
    q: 'Quando posso começar a usar?',
    a: 'O lançamento está alinhado com o ano letivo 2026/2027. Toca em “Começar agora” para garantires o teu lugar.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative py-28 lg:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="Perguntas frequentes."
            sub="Tudo o que precisas de saber antes de entrar."
          />
        </div>

        <motion.ul variants={stagger} initial="hidden" whileInView="show" viewport={viewport} className="space-y-4">
          {FAQS.map((f, i) => (
            <motion.li
              key={f.q}
              variants={fadeUp}
              className={cn(
                'overflow-hidden rounded-3xl border transition-colors duration-300',
                open === i ? 'border-brand-200 bg-white shadow-card' : 'border-slate-900/5 bg-white/60'
              )}
            >
              <button
                className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                <span className="font-display text-base font-bold text-slate-900 sm:text-lg">
                  {f.q}
                </span>
                <span
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600 transition-transform duration-300',
                    open === i && 'rotate-180 bg-brand-600 text-white'
                  )}
                >
                  <ChevronDown className="h-4 w-4" />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="px-7 pb-6 leading-relaxed text-slate-600">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
