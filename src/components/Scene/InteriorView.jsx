import React from "react";
import { useGLTF } from "@react-three/drei";
import InteriorBlueprint from "./InteriorBlueprint";

const InteriorView = () => {
  const { scene } = useGLTF("/models/interior.glb");

  return (
    <group>
      <primitive raycast={() => null} object={scene} scale={5} dispose={null} />
        <InteriorBlueprint />
    </group>
  );
};

export default InteriorView;
