import React, { Suspense, useRef } from "react";
import { Environment, CameraControls, Sky } from "@react-three/drei"; // <--- Change Import
import { Canvas } from "@react-three/fiber";
import PropertyModel from "./PropertyModel";
import CameraHandler from "./CameraHandler";

const PropertyScene = () => {
  // Create a reference to the controls so we can pass it to our handler
  const controlsRef = useRef();

  return (
    <div className="w-full h-full">
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        
        {/* Pass the ref to the handler */}
        <CameraHandler controlsRef={controlsRef} />

        <Sky 
          sunPosition={[100, 20, 100]} 
          inclination={0.6}           
          azimuth={0.1}               
          turbidity={10}              
          rayleigh={0.5}              
        />

        <ambientLight intensity={0.5} />
        <Environment preset="city" />

        {/* REPLACED ORBIT CONTROLS WITH CAMERA CONTROLS */}
        <CameraControls 
          ref={controlsRef}
          makeDefault
          minPolarAngle={Math.PI / 3} 
          maxPolarAngle={Math.PI / 2.1} 
          minDistance={4}   
          maxDistance={6}
          smoothTime={1.0} // Control the speed of the "LookAt" animation (1.0 = 1 second)
          draggingSmoothTime={0.6} // Smoothness when user drags manually
        />
        
        <Suspense fallback={null}>
          <PropertyModel />
        </Suspense>

      </Canvas>
    </div>
  );
};

export default PropertyScene;