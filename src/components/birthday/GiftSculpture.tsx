import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import type { Group, Mesh } from "three";

export function GiftSculpture({ dolly = 0 }: { dolly?: number }) {
  const group = useRef<Group>(null);
  const bow = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.position.y = Math.sin(t * 0.8) * 0.08 - dolly * 0.3;
      group.current.rotation.y = Math.sin(t * 0.4) * 0.35 + dolly * 0.6;
      group.current.rotation.x = Math.cos(t * 0.3) * 0.05;
      const s = 1 + dolly * 0.4;
      group.current.scale.set(s, s, s);
    }
    if (bow.current) {
      bow.current.rotation.z = Math.sin(t * 0.6) * 0.05;
    }
  });

  return (
    <group ref={group}>
      {/* main box */}
      <RoundedBox args={[1.6, 1.4, 1.6]} radius={0.08} smoothness={6} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#1a0e1f"
          metalness={0.4}
          roughness={0.25}
          clearcoat={1}
          clearcoatRoughness={0.15}
          sheen={1}
          sheenColor="#d4af6a"
          sheenRoughness={0.4}
        />
      </RoundedBox>

      {/* gold ribbon vertical */}
      <mesh position={[0, 0, 0.001]}>
        <boxGeometry args={[0.22, 1.42, 1.62]} />
        <meshPhysicalMaterial color="#e6c178" metalness={0.95} roughness={0.18} clearcoat={1} />
      </mesh>
      {/* gold ribbon horizontal */}
      <mesh position={[0, 0, 0.001]}>
        <boxGeometry args={[1.62, 0.22, 1.62]} />
        <meshPhysicalMaterial color="#e6c178" metalness={0.95} roughness={0.18} clearcoat={1} />
      </mesh>

      {/* bow */}
      <group ref={bow} position={[0, 0.78, 0]}>
        <mesh position={[-0.28, 0, 0]} rotation={[0, 0, 0.35]}>
          <torusGeometry args={[0.26, 0.07, 16, 32]} />
          <meshPhysicalMaterial color="#f0d089" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.28, 0, 0]} rotation={[0, 0, -0.35]}>
          <torusGeometry args={[0.26, 0.07, 16, 32]} />
          <meshPhysicalMaterial color="#f0d089" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.12, 24, 24]} />
          <meshPhysicalMaterial color="#f5dca0" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>

      {/* faint crystal halo */}
      <mesh position={[0, 0, 0]} scale={1.05}>
        <sphereGeometry args={[1.4, 32, 32]} />
        <MeshTransmissionMaterial
          backside
          thickness={0.2}
          chromaticAberration={0.02}
          anisotropy={0.3}
          transmission={1}
          roughness={0.4}
          ior={1.2}
          color="#ffd9a8"
          opacity={0.05}
          transparent
        />
      </mesh>
    </group>
  );
}
