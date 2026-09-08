import type { Metadata, Viewport } from 'next';
import './fonts.css';
import './globals.css';
import Providers from '@/components/providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: `${site.name} — Estudar ficou mais inteligente.`,
  description: site.heroSubtitle,
  openGraph: {
    title: `${site.name} — Estudar ficou mais inteligente.`,
    description: site.heroSubtitle,
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#F7F8FC',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/icon-180.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
      </head>
      <body className="noise">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
