'use client';

import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.body.classList.add('custom-cursor');

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const target = (e.target as HTMLElement).closest(
        'a, button, [role="button"], summary, [data-cursor]'
      );
      ring.classList.toggle('is-hover', Boolean(target));
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      dot.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;
      const rs = ring.classList.contains('is-hover') ? 28 : 18;
      ring.style.transform = `translate3d(${rx - rs}px, ${ry - rs}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove('custom-cursor');
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}
