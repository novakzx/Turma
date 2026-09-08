'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import type { Mesh } from 'three';

function Blob({
  position,
  color,
  scale,
  opacity = 0.4,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
  opacity?: number;
}) {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.08;
    ref.current.rotation.y += delta * 0.11;
  });
  return (
    <Float speed={1.3} rotationIntensity={0.4} floatIntensity={1.1}>
      <mesh ref={ref} position={position} scale={scale}>
        <sphereGeometry args={[1, 48, 48]} />
        <MeshDistortMaterial
          color={color}
          distort={0.34}
          speed={1.6}
          roughness={0.25}
          metalness={0.15}
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
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 6, 8]} intensity={1.1} color="#8b7cfb" />
      <Blob position={[-4.6, 1.6, -2]} color="#6C56F0" scale={1.5} />
      <Blob position={[4.6, -1.6, -3]} color="#4C36C7" scale={2} opacity={0.32} />
      <Blob position={[1.2, 2.8, -4]} color="#F59E0B" scale={0.55} opacity={0.35} />
    </Canvas>
  );
}
