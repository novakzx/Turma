'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CalendarDays, Users, GraduationCap, ChevronRight, Check } from 'lucide-react';
import PhoneMockup from '@/components/PhoneMockup';
import { site } from '@/config/site';
import { cn } from '@/lib/cn';

const APP_FEATURES = [
  {
    id: 'estudo',
    title: 'Estudo com IA',
    badge: 'Inteligência Artificial',
    icon: Sparkles,
    desc: 'Um assistente dedicado para tirar dúvidas, pedir explicações detalhadas, gerar resumos automáticos e criar planos de estudo para qualquer matéria.',
    bullets: ['Tirar dúvidas e explicações 24/7', 'Resumos automáticos de matérias', 'Planos de estudo personalizados'],
    screenshot: '/screenshots/estudo.png',
    accent: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-400',
    glowColor: 'rgba(59, 130, 246, 0.4)',
  },
  {
    id: 'feriados',
    title: 'Calendário & Feriados',
    badge: 'Ano Letivo 2026/2027',
    icon: CalendarDays,
    desc: 'Organização do ano letivo em Portugal: feriados nacionais e municipais, interrupções letivas (Natal, Carnaval e Páscoa) e contagem decrescente para datas importantes.',
    bullets: ['Calendário escolar oficial de Portugal', 'Férias de Natal, Carnaval e Páscoa', 'Contagem para exames e eventos'],
    screenshot: '/screenshots/feriados.png',
    accent: 'from-blue-600/20 to-indigo-500/10 border-blue-400/30 text-blue-300',
    glowColor: 'rgba(96, 165, 250, 0.4)',
  },
  {
    id: 'feed',
    title: 'Comunidade & Feed',
    badge: 'Rede Social da Turma',
    icon: Users,
    desc: 'Uma experiência social segura e moderada criada para estudantes. Partilha stories, publica fotos com os teus colegas e celebra cada conquista escolar em conjunto.',
    bullets: ['Stories e publicações da turma', 'Reações e comentários em tempo real', 'Ambiente seguro e moderado'],
    screenshot: '/screenshots/feed.png',
    accent: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    glowColor: 'rgba(56, 189, 248, 0.4)',
  },
  {
    id: 'perfil',
    title: 'Perfil do Estudante',
    badge: 'Vida Escolar Centralizada',
    icon: GraduationCap,
    desc: 'A tua identidade académica num único lugar: escola, turma, matérias inscritas e histórico de evolução para manteres toda a tua rotina escolar sob controlo.',
    bullets: ['Escola e turma estruturadas', 'Matérias e acompanhamento escolar', 'Espaço de partilha e conquistas'],
    screenshot: '/screenshots/perfil.png',
    accent: 'from-indigo-500/20 to-blue-600/10 border-indigo-500/30 text-indigo-300',
    glowColor: 'rgba(99, 102, 241, 0.4)',
  },
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState(0);
  const activeFeature = APP_FEATURES[activeTab];

  return (
    <section id="sobre" className="relative overflow-hidden border-t border-blue-500/15 bg-navy-950/80 py-24 sm:py-32">
      {/* Luzes de fundo azuis */}
      <div className="pointer-events-none absolute top-12 left-1/4 h-[450px] w-[600px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-12 right-1/4 h-[450px] w-[600px] translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="container-x relative z-10">
        {/* Cabeçalho da Seção */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300 backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            Ecossistema Educacional
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl"
          >
            Sobre o <span className="text-blue-400">Turma+</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300"
          >
            O Turma+ é a plataforma educacional pensada especificamente para os estudantes em Portugal. Num único ecossistema moderno, reúne inteligência artificial para o teu estudo, acompanhamento do calendário escolar oficial e uma comunidade segura para a tua turma.
          </motion.p>
        </div>

        {/* Grade interativa: Lista de funcionalidades + Preview visual real */}
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Seletor / Cards das 4 Funcionalidades do Projeto */}
          <div className="space-y-4">
            {APP_FEATURES.map((feat, index) => {
              const isSelected = activeTab === index;
              const Icon = feat.icon;

              return (
                <motion.div
                  key={feat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setActiveTab(index)}
                  className={cn(
                    'group relative cursor-pointer overflow-hidden rounded-2xl border p-5 sm:p-6 transition-all duration-300 backdrop-blur-xl',
                    isSelected
                      ? 'border-blue-400/50 bg-gradient-to-r from-blue-950/70 via-navy-900/80 to-blue-950/60 shadow-[0_0_35px_-10px_rgba(59,130,246,0.4)]'
                      : 'border-white/10 bg-navy-900/30 hover:border-blue-500/30 hover:bg-navy-900/50'
                  )}
                >
                  {/* Linha superior de destaque no item ativo */}
                  {isSelected && (
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
                  )}

                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300',
                        isSelected
                          ? 'border-blue-400/40 bg-blue-500/20 text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                          : 'border-white/10 bg-white/5 text-slate-400 group-hover:border-blue-500/20 group-hover:text-blue-400'
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-display text-lg sm:text-xl font-bold text-white transition-colors group-hover:text-blue-200">
                          {feat.title}
                        </h3>
                        <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-300">
                          {feat.badge}
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        {feat.desc}
                      </p>

                      {isSelected && (
                        <div className="mt-4 flex flex-wrap gap-2 pt-2 border-t border-white/5">
                          {feat.bullets.map((b) => (
                            <span
                              key={b}
                              className="inline-flex items-center gap-1.5 text-xs text-blue-200/90"
                            >
                              <Check className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                              {b}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Visual Showcase: Mockup elegante do app mostrando o screenshot real selecionado */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Seletor rápido em mobile */}
            <div className="mb-6 flex flex-wrap items-center justify-center gap-2 lg:hidden">
              {APP_FEATURES.map((feat, index) => (
                <button
                  key={feat.id}
                  onClick={() => setActiveTab(index)}
                  className={cn(
                    'rounded-full px-3 py-1 text-xs font-semibold transition-all',
                    activeTab === index
                      ? 'border border-blue-400 bg-blue-600/30 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                      : 'border border-white/10 bg-white/5 text-slate-400 hover:text-white'
                  )}
                >
                  {feat.title.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Halo de luz com a cor dinâmica da funcionalidade */}
            <div
              className="pointer-events-none absolute h-[380px] w-[380px] rounded-full blur-[100px] transition-colors duration-700"
              style={{ backgroundColor: activeFeature.glowColor }}
            />

            <motion.div
              key={activeFeature.id}
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-[270px] sm:max-w-[300px]"
            >
              <div className="overflow-hidden rounded-[40px] sm:rounded-[44px] border-[5px] border-slate-800 bg-black p-1 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_-5px_rgba(59,130,246,0.3)]">
                {/* Ilha dinâmica / Notch */}
                <div className="relative mx-auto mt-2 h-4 w-24 rounded-full bg-slate-900" />

                {/* Screenshot real do app */}
                <div className="relative mt-2 overflow-hidden rounded-[30px] sm:rounded-[34px] bg-navy-950">
                  <img
                    src={activeFeature.screenshot}
                    alt={`Turma+ — ${activeFeature.title}`}
                    className="h-auto w-full object-cover select-none"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Legenda flutuante sobre a tela */}
              <div className="mt-4 text-center">
                <p className="text-xs font-medium text-slate-400">
                  Interface real de <span className="text-blue-300 font-semibold">{activeFeature.title}</span> no Turma+
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
