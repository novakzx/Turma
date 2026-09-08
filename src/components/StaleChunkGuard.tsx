'use client';

import { useEffect } from 'react';

/**
 * Self-heal contra deploys novos + abas antigas:
 * se um chunk antigo (hash que não existe mais) falhar ao carregar,
 * recarrega a página uma única vez para buscar o bundle atual.
 */
export default function StaleChunkGuard() {
  useEffect(() => {
    const KEY = 'turma-plus-chunk-reload';

    const onError = (event: Event) => {
      const target = event.target as HTMLScriptElement | null;
      if (!target || target.tagName !== 'SCRIPT') return;
      const src = target.src || '';
      if (!src.includes('/_next/static/chunks/')) return;

      if (!sessionStorage.getItem(KEY)) {
        sessionStorage.setItem(KEY, '1');
        window.location.reload();
      }
    };

    const onLoad = () => sessionStorage.removeItem(KEY);

    window.addEventListener('error', onError, true);
    window.addEventListener('load', onLoad);
    return () => {
      window.removeEventListener('error', onError, true);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  return null;
}
