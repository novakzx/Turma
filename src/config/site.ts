/**
 * Configuração central do site.
 */

export interface Stat {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export const site = {
  name: 'Turma+',
  tagline: 'Feito para estudantes. Construído para o futuro.',
  heroPhrase: 'O próximo nível da tua turma está chegando.',
  instagram: 'turmamore',
  instagramUrl: 'https://www.instagram.com/turmamore',
  launch: {
    displayDate: '20 de setembro de 2026',
    country: 'Portugal',
    timezone: 'Europe/Lisbon',
    timezoneOffset: '+01:00', // WEST (Western European Summer Time)
    // 2026-09-20 00:00:00 em Portugal (WEST / UTC+1) corresponde a 2026-09-19 23:00:00 UTC:
    targetIso: '2026-09-19T23:00:00.000Z',
    targetTimestamp: 1789858800000,
    finishedMessage: 'O Turma+ chegou.',
  },
  heroTitle: 'Estudar ficou mais inteligente.',
  heroSubtitle:
    'Uma nova forma de estudar, organizar a tua rotina, aprender com IA e fazer parte de uma comunidade.',
  nav: [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre o Turma+', href: '#sobre' },
  ],
  stats: [
    { value: 100, prefix: '+', suffix: '%', label: 'Organização' },
    { value: 24, suffix: '/7', label: 'Acesso ao estudo' },
    { value: 4, suffix: '+', label: 'Ferramentas educacionais' },
    { value: 1, label: 'Aplicativo completo' },
  ] as Stat[],
  contactEmail: 'ola@estudia.app',
};
