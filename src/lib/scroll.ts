import type Lenis from 'lenis';

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

/** Rola suavemente até uma seção pelo id (sem o '#'). */
export function scrollToId(id: string) {
  if (typeof document === 'undefined') return;
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -76, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function hrefToId(href: string): string {
  return href.replace('#', '');
}
