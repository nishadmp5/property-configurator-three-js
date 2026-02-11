import { useTexture } from "@react-three/drei";
import * as THREE from 'three'

const GroundMesh = () => {
  // 1. Load your textures
  const textures = useTexture({
    map: "/textures/leafy_grass_diff.jpg",
  });

  // Settings for "Infinite" look
  const REPEAT_SCALE = 80; // How many times the grass repeats (higher = smaller grass)
  const PLANE_SIZE = 1000; // A massive plane

  Object.values(textures).forEach((texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(REPEAT_SCALE, REPEAT_SCALE);
  });

  return (
    <mesh 
      raycast={() => null} 
      rotation={[-Math.PI / 2, 0, 0]} 
      receiveShadow
      position={[0, -0.01, 0]} // Slight offset to avoid Z-fighting with other floor elements
    >
      {/* 4. Massive plane geometry */}
      <planeGeometry args={[PLANE_SIZE, PLANE_SIZE]} />
      
      {/* 5. Apply textures */}
      <meshStandardMaterial 
        {...textures} 
        side={THREE.DoubleSide}
        // Optional: reduce the glossy reflection of grass
        roughness={1} 
        metalness={0}
      />
    </mesh>
  );
};

export default GroundMesh;