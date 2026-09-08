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
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect x='2' y='2' width='44' height='44' rx='15' fill='%236C56F0'/%3E%3Cpath d='M24 14.5v19M14.5 24h19' stroke='white' stroke-width='5.2' stroke-linecap='round'/%3E%3Ccircle cx='35.5' cy='12.5' r='4.2' fill='%23FDBA2C'/%3E%3C/svg%3E"
        />
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
