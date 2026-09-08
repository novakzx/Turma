'use client';

import { useEffect, useState } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import Preloader from '@/components/Preloader';
import Cursor from '@/components/Cursor';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      <Preloader />
      {ready && <Cursor />}
      <SmoothScroll>{children}</SmoothScroll>
    </>
  );
}
