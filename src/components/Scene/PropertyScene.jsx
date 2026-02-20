import React, { Suspense, useRef } from "react";
import { Environment, CameraControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import PropertyModel from "./PropertyModel";
import InteriorView from "./InteriorView";
import CameraHandler from "./CameraHandler";
import { useStore } from "../../store/useStore";
import { cameraConfig } from "../../constants/cameraConfig";

const PropertyScene = () => {
  const controlsRef = useRef();
  const { viewMode } = useStore();

  const controlsCfg = viewMode === 'interior'
    ? cameraConfig.controls.interior
    : cameraConfig.controls.exterior;

  return (
    <div className="w-full h-full bg-gray-100">
      <Canvas shadows camera={{ position: cameraConfig.defaults.initial.position, fov: cameraConfig.defaults.initial.fov }}>

        <CameraHandler controlsRef={controlsRef} />

        <ambientLight intensity={0.5} />

        {(viewMode === 'exterior' || viewMode === 'zooming_in') && (
          <group>
             <Sky sunPosition={[100, 20, 100]} />
             <Environment preset="city" />
             <Suspense fallback={null}>
               <PropertyModel />
             </Suspense>
          </group>
        )}

        {viewMode === 'interior' && (
          <group>
            <Environment preset="apartment" />
            <Suspense fallback={null}>
               <InteriorView />
            </Suspense>
          </group>
        )}

        <CameraControls
          ref={controlsRef}
          makeDefault
          dollySpeed={controlsCfg.dollySpeed}
          minDistance={controlsCfg.minDistance}
          maxDistance={controlsCfg.maxDistance}
          smoothTime={cameraConfig.controls.smoothTime}
        />

      </Canvas>
    </div>
  );
};

export default PropertyScene;