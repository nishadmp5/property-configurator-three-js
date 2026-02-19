import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import GroundMesh from "./GroundModel";
import PropertyBlueprint from "./PropertyBlueprint";

const PropertyModel = () => {
  const { scene } = useGLTF("/models/property.glb");

  const groupRef = useRef();

  return (
    <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <primitive
        raycast={() => null}
        ref={groupRef}
        object={scene}
        scale={0.00125}
        dispose={null}
      />
      <GroundMesh />
      <PropertyBlueprint />
    </group>
  );
};

useGLTF.preload("/models/property.glb");

export default PropertyModel;
