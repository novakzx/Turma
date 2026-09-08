/**
 * Configuração central do site.
 * Para trocar o nome do app, edite APENAS `name` abaixo.
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
  instagram: 'turmamore',
  heroTitle: 'Estudar ficou mais inteligente.',
  heroSubtitle:
    'Uma nova forma de estudar, organizar sua rotina, aprender com IA e fazer parte de uma comunidade.',
  nav: [
    { label: 'Início', href: '#inicio' },
    { label: 'Funcionalidades', href: '#funcionalidades' },
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Estudo', href: '#estudo' },
    { label: 'Comunidade', href: '#comunidade' },
    { label: 'FAQ', href: '#faq' },
  ],
  stats: [
    { value: 100, prefix: '+', suffix: '%', label: 'Organização' },
    { value: 24, suffix: '/7', label: 'Acesso ao estudo' },
    { value: 4, suffix: '+', label: 'Ferramentas educacionais' },
    { value: 1, label: 'Aplicativo completo' },
  ] as Stat[],
  contactEmail: 'ola@estudia.app',
};
