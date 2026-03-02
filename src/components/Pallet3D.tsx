"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, PerspectiveCamera, Float } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function PalletModel(props: any) {
  const group = useRef<THREE.Group>(null);
  
  // Rotate slowly over time
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Top Deck Boards */}
      {[...Array(5)].map((_, i) => (
        <mesh key={`top-${i}`} position={[-2 + i * 1, 0.6, 0]}>
          <boxGeometry args={[0.8, 0.1, 5]} />
          <meshStandardMaterial color="#f0e3ce" roughness={0.6} metalness={0.05} />
        </mesh>
      ))}

      {/* Stringer Boards */}
      {[...Array(3)].map((_, i) => (
        <mesh key={`stringer-${i}`} position={[0, 0.2, -2 + i * 2]}>
          <boxGeometry args={[5, 0.7, 0.4]} />
          <meshStandardMaterial color="#e6d4ba" roughness={0.7} metalness={0.05} />
        </mesh>
      ))}

      {/* Bottom Deck Boards */}
      {[...Array(3)].map((_, i) => (
        <mesh key={`bottom-${i}`} position={[-2 + i * 2, -0.2, 0]}>
          <boxGeometry args={[0.8, 0.1, 5]} />
          <meshStandardMaterial color="#ebdcc4" roughness={0.7} metalness={0.05} />
        </mesh>
      ))}
    </group>
  );
}

export default function Pallet3D() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing z-10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[6, 4, 6]} fov={40} />
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
        <spotLight position={[-10, 10, -10]} angle={0.15} penumbra={1} intensity={1} color="#2563eb" />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <Suspense fallback={null}>
            <PalletModel scale={0.75} />
          </Suspense>
        </Float>
        
        <Environment preset="warehouse" />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
