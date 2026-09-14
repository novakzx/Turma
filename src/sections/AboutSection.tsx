'use client';

import { useState } from 'react';
import { Sparkles, CalendarDays, Users, GraduationCap, Check } from 'lucide-react';
import { cn } from '@/lib/cn';

const APP_FEATURES = [
  {
    id: 'estudo',
    index: '01',
    title: 'Estudo com IA',
    subtitle: 'Inteligência Artificial',
    icon: Sparkles,
    desc: 'Assistente para tirar dúvidas a qualquer hora, pedir explicações detalhadas, gerar resumos automáticos de matérias e criar planos de estudo estruturados.',
    details: ['Resolução de dúvidas 24/7', 'Resumos automáticos por disciplina', 'Planos de estudo personalizados'],
    screenshot: '/screenshots/estudo.png',
  },
  {
    id: 'feriados',
    index: '02',
    title: 'Calendário & Feriados',
    subtitle: 'Ano Letivo 2026/2027',
    icon: CalendarDays,
    desc: 'Calendário escolar de Portugal: feriados nacionais e municipais, interrupções letivas (férias de Natal, Carnaval e Páscoa) e contagem decrescente para datas importantes.',
    details: ['Feriados nacionais e municipais', 'Interrupções letivas oficiais', 'Contagem para exames e eventos'],
    screenshot: '/screenshots/feriados.png',
  },
  {
    id: 'feed',
    index: '03',
    title: 'Comunidade & Feed',
    subtitle: 'Rede Social da Turma',
    icon: Users,
    desc: 'Espaço social seguro e moderado desenhado para estudantes. Partilha stories, publica fotos com os teus colegas de turma e acompanha novidades com reações e comentários.',
    details: ['Stories e publicações da turma', 'Reações e comentários em tempo real', 'Ambiente moderado para estudantes'],
    screenshot: '/screenshots/feed.png',
  },
  {
    id: 'perfil',
    index: '04',
    title: 'Perfil do Estudante',
    subtitle: 'Vida Escolar Centralizada',
    icon: GraduationCap,
    desc: 'A tua identidade académica num único lugar: escola, turma, matérias inscritas e acompanhamento da tua evolução ao longo do ano.',
    details: ['Escola e turma estruturadas', 'Matérias organizadas', 'Histórico e espaço de partilha'],
    screenshot: '/screenshots/perfil.png',
  },
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState(0);
  const activeFeature = APP_FEATURES[activeTab];

  return (
    <section id="sobre" className="relative border-t border-white/[0.08] bg-[#07080d] py-24 sm:py-32">
      <div className="container-x relative">
        {/* Cabeçalho da Seção */}
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-500">
            Visão Geral
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Sobre o Turma+
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-zinc-300">
            O Turma+ é uma plataforma educacional desenvolvida para estudantes em Portugal. Reúne inteligência artificial para o teu estudo, acompanhamento do calendário escolar oficial e uma rede social para a tua turma.
          </p>
        </div>

        {/* Grade de Funcionalidades & Telas Reais */}
        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* Lista das 4 Funcionalidades */}
          <div className="space-y-3">
            {APP_FEATURES.map((feat, index) => {
              const isSelected = activeTab === index;
              const Icon = feat.icon;

              return (
                <div
                  key={feat.id}
                  onClick={() => setActiveTab(index)}
                  className={cn(
                    'cursor-pointer rounded-xl border p-5 sm:p-6 transition-colors',
                    isSelected
                      ? 'border-blue-500 bg-[#0e0f18]'
                      : 'border-white/[0.08] bg-[#090a10] hover:border-white/20'
                  )}
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs text-zinc-400">
                      {feat.index}
                    </span>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                          {feat.title}
                        </h3>
                        <span className="font-mono text-[11px] text-zinc-400">
                          {feat.subtitle}
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                        {feat.desc}
                      </p>

                      {isSelected && (
                        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/[0.08] pt-3">
                          {feat.details.map((item) => (
                            <span
                              key={item}
                              className="inline-flex items-center gap-1.5 text-xs text-zinc-300"
                            >
                              <Check className="h-3 w-3 text-blue-400 shrink-0" />
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visual Showcase: Mockup físico limpo sem halos artificiais */}
          <div className="flex flex-col items-center justify-center">
            {/* Seletor rápido em mobile */}
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2 lg:hidden">
              {APP_FEATURES.map((feat, index) => (
                <button
                  key={feat.id}
                  onClick={() => setActiveTab(index)}
                  className={cn(
                    'rounded-md px-3 py-1 font-mono text-xs transition-colors',
                    activeTab === index
                      ? 'border border-blue-500 bg-[#0e0f18] text-white'
                      : 'border border-white/10 bg-[#090a10] text-zinc-400'
                  )}
                >
                  {feat.title}
                </button>
              ))}
            </div>

            <div className="w-full max-w-[270px] sm:max-w-[300px]">
              <div className="overflow-hidden rounded-[38px] border-[4px] border-zinc-800 bg-black p-1 shadow-2xl">
                {/* Entalhe frontal / Dynamic Island */}
                <div className="mx-auto mt-2 h-3.5 w-24 rounded-full bg-zinc-900" />

                {/* Screenshot real do app */}
                <div className="mt-2 overflow-hidden rounded-[28px] bg-black">
                  <img
                    src={activeFeature.screenshot}
                    alt={`Turma+ — ${activeFeature.title}`}
                    className="h-auto w-full object-cover select-none"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="mt-3 text-center">
                <span className="font-mono text-xs text-zinc-400">
                  {activeFeature.title} · App oficial
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
