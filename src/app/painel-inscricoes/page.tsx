import type { Metadata } from 'next';
import PainelInscricoesClient from './PainelInscricoesClient';

// Sem link nenhum no site público e fora de qualquer índice de busca --
// não é uma página de marketing.
export const metadata: Metadata = {
  title: 'Painel de inscrições',
  robots: { index: false, follow: false },
};

export default function PainelInscricoesPage() {
  return <PainelInscricoesClient />;
}
