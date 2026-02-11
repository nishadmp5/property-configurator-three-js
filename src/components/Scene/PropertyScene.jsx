import React, { Suspense, useRef } from "react";
import { Environment, CameraControls, Sky, ContactShadows, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import PropertyModel from "./PropertyModel";
import InteriorView from "./InteriorView"; // Import new component
import CameraHandler from "./CameraHandler";
import { useStore } from "../../strore/useStore";

const PropertyScene = () => {
  const controlsRef = useRef();
  const { viewMode } = useStore();

  return (
    <div className="w-full h-full bg-gray-100">
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        
        <CameraHandler controlsRef={controlsRef} />

        {/* --- LIGHTING (Common) --- */}
        <ambientLight intensity={0.5} />
        
        {/* --- EXTERIOR SCENE --- */}
        {(viewMode === 'exterior' || viewMode === 'zooming_in') && (
          <group>
             <Sky sunPosition={[100, 20, 100]} />
             <Environment preset="city" />
             <Suspense fallback={null}>
               <PropertyModel />
             </Suspense>
          </group>
        )}

        {/* --- INTERIOR SCENE --- */}
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
          // Adjust controls based on mode
          minDistance={viewMode === 'interior' ? 0.1 : 4} 
          maxDistance={viewMode === 'interior' ? 10 : 15}
        />

      </Canvas>
    </div>
  );
};

export default PropertyScene;