import { useGLTF, useTexture } from "@react-three/drei";

export const preloadAssets = () => {
  useGLTF.preload("/models/property.glb");
  useGLTF.preload("/models/interior.glb");
  useTexture.preload("/textures/leafy_grass_diff.jpg");
};