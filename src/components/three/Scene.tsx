'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import type { Mesh } from 'three';

function Blob({
  position,
  color,
  scale,
  opacity = 0.35,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
  opacity?: number;
}) {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.07;
    ref.current.rotation.y += delta * 0.09;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1.0}>
      <mesh ref={ref} position={position} scale={scale}>
        <sphereGeometry args={[1, 48, 48]} />
        <MeshDistortMaterial
          color={color}
          distort={0.32}
          speed={1.4}
          roughness={0.2}
          metalness={0.2}
          transparent
          opacity={opacity}
        />
      </mesh>
    </Float>
  );
}

/** Fundo 3D ambiente — apenas desktop, carregado sob demanda. */
export default function Scene() {
  return (
    <Canvas
      className="!pointer-events-none"
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      camera={{ position: [0, 0, 8], fov: 45 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 8]} intensity={1.2} color="#60a5fa" />
      <Blob position={[-4.5, 1.5, -2]} color="#2563EB" scale={1.5} opacity={0.32} />
      <Blob position={[4.5, -1.8, -3]} color="#0284C7" scale={2.1} opacity={0.25} />
      <Blob position={[1.0, 2.5, -4]} color="#38BDF8" scale={0.7} opacity={0.28} />
    </Canvas>
  );
}
