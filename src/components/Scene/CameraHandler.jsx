import { useEffect } from "react";
import * as THREE from "three";
import { useStore } from "../../strore/useStore";
import { bluePrintData } from "./constants/propertyBluePrintContants";

const CameraHandler = ({ controlsRef }) => {
  const { selectedProperty, viewMode, setViewMode, setIsFading } = useStore();

  useEffect(() => {
    if (!controlsRef.current) return;

    const performTransition = async () => {
      // --- TRANSITION INTO INTERIOR ---
      if (viewMode === 'zooming_in' && selectedProperty) {
        const targetUnit = bluePrintData.find((u) => u.id === selectedProperty);
        
        if (targetUnit) {
          const [x, y, z] = targetUnit.position;

          // 1. Zoom closer to the door/window (Fly animation)
          await controlsRef.current.setLookAt(
            x, y, z + 1.5, // Stop just in front of unit
            x, y, z,       // Look at center
            true           // Animate (default ~1s based on smoothTime)
          );

          // 2. Start Fading to Black
          setIsFading(true);

          // 3. Wait for the CSS fade-out to complete (e.g., 700ms)
          // We use a small timeout to let the screen go fully black
          await new Promise((resolve) => setTimeout(resolve, 750));

          // 4. BEHIND THE CURTAIN: Switch the Scene
          setViewMode('interior');

          // 5. BEHIND THE CURTAIN: Teleport Camera to Interior Start Position
          // Note: The third argument 'false' means NO animation, instant cut
          await controlsRef.current.setLookAt(
            0, 1.6, 4, // Interior spawn point (x,y,z)
            0, 1.2, 0, // Look at center of room
            false 
          );

          // 6. Reveal the new scene
          setIsFading(false);
        }
      }

      // --- TRANSITION BACK TO EXTERIOR ---
      // Optional: Add fading when going back out too
      if (viewMode === 'exterior' && !selectedProperty) {
         // If we were just inside, we might want to fade out/in as well
         // Logic can be added here similar to above if desired
         controlsRef.current.setLookAt(0, 5, 10, 0, 0, 0, true);
      }
    };

    performTransition();

  }, [selectedProperty, viewMode, controlsRef, setViewMode, setIsFading]);

  // Standard Orbit Logic (Only when browsing exterior)
  useEffect(() => {
     if (viewMode === 'exterior' && selectedProperty && controlsRef.current) {
        const targetUnit = bluePrintData.find((u) => u.id === selectedProperty);
        if (targetUnit) {
            // ... (Your existing orbit logic here) ...
             const unitX = targetUnit.position[0];
             const unitZ = targetUnit.position[2];
             const currentAzimuth = controlsRef.current.azimuthAngle;
             const targetAzimuth = Math.atan2(unitX, unitZ);

             let diff = targetAzimuth - currentAzimuth;
             while (diff > Math.PI) diff -= 2 * Math.PI;
             while (diff < -Math.PI) diff += 2 * Math.PI;
             
             controlsRef.current.rotateTo(currentAzimuth + diff, Math.PI / 2.5, true);
             controlsRef.current.dollyTo(6, true);
        }
     }
  }, [selectedProperty, viewMode]);

  return null;
};

export default CameraHandler;