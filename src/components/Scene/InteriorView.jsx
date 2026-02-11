import React from "react";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

const InteriorView = () => {
  // NOTE: Replace this with your actual interior GLTF load
  const { scene } = useGLTF("/models/interior.glb");

  return (
    <group>
      <primitive raycast={() => null} object={scene} scale={1} dispose={null} />
    </group>
  );
};

export default InteriorView;
