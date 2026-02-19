import React, { Suspense, useRef } from "react";
import { Environment, CameraControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import PropertyModel from "./PropertyModel";
import InteriorView from "./InteriorView";
import CameraHandler from "./CameraHandler";
import { useStore } from "../../store/useStore";

const PropertyScene = () => {
  const controlsRef = useRef();
  const { viewMode } = useStore();

  return (
    <div className="w-full h-full bg-gray-100">
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        
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
          // 1. DISABLE ZOOM in Interior Mode
          dollySpeed={viewMode === 'interior' ? 0 : 1} 
          
          // 2. Adjust Distances (Optional safety lock)
          minDistance={viewMode === 'interior' ? 0.1 : 4} 
          maxDistance={viewMode === 'interior' ? 20 : 15}
          
          // 3. Smoothness settings
          smoothTime={1.0}
        />

      </Canvas>
    </div>
  );
};

export default PropertyScene;