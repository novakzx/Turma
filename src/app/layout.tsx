import type { Metadata, Viewport } from 'next';
import './fonts.css';
import './globals.css';
import Providers from '@/components/providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: `${site.name} — Em breve`,
  description: `O lançamento oficial do ${site.name} está a chegar em 20 de setembro de 2026 em Portugal. Estudo com inteligência artificial, calendário escolar e uma comunidade segura para a tua turma.`,
  keywords: [
    'Turma+',
    'aplicativo estudantes Portugal',
    'estudo com IA',
    'calendário escolar Portugal 2026 2027',
    'lançamento Turma+',
    'organização escolar',
  ],
  authors: [{ name: 'Turma+' }],
  creator: 'Turma+',
  openGraph: {
    title: `${site.name} — Em breve`,
    description: `O próximo nível da tua turma está chegando em 20 de setembro de 2026 em Portugal. Estudo com IA, organização do calendário escolar e comunidade num só app.`,
    url: 'https://turma.app',
    siteName: site.name,
    locale: 'pt_PT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Em breve`,
    description: `O próximo nível da tua turma está chegando em 20 de setembro de 2026 em Portugal.`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#030712',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/icon-180.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
      </head>
      <body className="bg-navy-950 text-slate-100 noise antialiased selection:bg-blue-600 selection:text-white">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
