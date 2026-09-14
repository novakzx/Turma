import type { Metadata, Viewport } from 'next';
import './fonts.css';
import './globals.css';
import Providers from '@/components/providers';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Turma+ — Em breve',
  description:
    'O próximo nível da tua turma está chegando. O Turma+ chega em 20 de setembro de 2026 — estudo com inteligência artificial, organização do ano letivo, feed da turma e comunidade. Segue @turmamore no Instagram e fica atento ao lançamento em Portugal.',
  keywords: ['Turma+', 'Turma mais', 'app estudantes Portugal', 'estudo com IA', 'lançamento 2026'],
  authors: [{ name: 'Turma+' }],
  openGraph: {
    title: 'Turma+ — Em breve',
    description:
      'O próximo nível da tua turma está chegando. Lançamento oficial em 20 de setembro de 2026 — Portugal. Estudo com IA, organização e comunidade num só app.',
    type: 'website',
    locale: 'pt_PT',
    siteName: 'Turma+',
    url: 'https://turma.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Turma+ — Em breve',
    description:
      'O próximo nível da tua turma está chegando. 20 de setembro de 2026 — Portugal.',
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://turma.app'),
};

export const viewport: Viewport = {
  themeColor: '#020617',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/icon-180.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
      </head>
      <body className="noise bg-[#020617] text-white antialiased selection:bg-blue-500/30 selection:text-white">
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
