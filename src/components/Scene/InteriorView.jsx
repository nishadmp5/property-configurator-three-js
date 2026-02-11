import React from "react";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

const InteriorView = () => {
  const { scene } = useGLTF("/models/interior.glb");

  return (
    <group>
      <primitive raycast={() => null} object={scene} scale={5} dispose={null} />
    </group>
  );
};

export default InteriorView;
