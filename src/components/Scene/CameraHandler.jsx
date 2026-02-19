import { useEffect } from "react";
import { useStore } from "../../store/useStore";
import { bluePrintData } from "../../constants/propertyBlueprintConstants";
import { interiorBluePrintData } from "../../constants/interiorConstants";

const CameraHandler = ({ controlsRef }) => {
  const { 
    selectedProperty, 
    viewMode, 
    setViewMode, 
    setIsFading, 
    targetRoom, 
    setTargetRoom 
  } = useStore();

  // ---------------------------------------------------------
  // 1. TRANSITION LOGIC (Exterior -> Interior) & RESET
  // ---------------------------------------------------------
  useEffect(() => {
    if (!controlsRef.current) return;
    let cancelled = false;

    const performTransition = async () => {
      // --- TRANSITION INTO INTERIOR ---
      if (viewMode === 'zooming_in' && selectedProperty) {
        const targetUnit = bluePrintData.find((u) => u.id === selectedProperty);

        if (targetUnit) {
          const [x, y, z] = targetUnit.position;

          await controlsRef.current.setLookAt(
            x, y, z + 1.5,
            x, y, z,
            true
          );
          if (cancelled) return;

          setIsFading(true);

          await new Promise((resolve) => setTimeout(resolve, 750));
          if (cancelled) return;

          setViewMode('interior');
          setTargetRoom(null);

          await controlsRef.current.setLookAt(
            0, 1.6, 4,
            0, 1.2, 0,
            false
          );
          if (cancelled) return;

          setIsFading(false);
        }
      }

      // --- TRANSITION BACK TO EXTERIOR (RESET) ---
      if (viewMode === 'exterior' && !selectedProperty) {
         controlsRef.current.setLookAt(0, 5, 10, 0, 0, 0, true);
      }
    };

    performTransition();

    return () => { cancelled = true; };
  }, [selectedProperty, viewMode, controlsRef, setViewMode, setIsFading, setTargetRoom]);


  // ---------------------------------------------------------
  // 2. INTERIOR ROOM NAVIGATION (Clicking Doors)
  // ---------------------------------------------------------
  useEffect(() => {
    if (viewMode === 'interior' && targetRoom && controlsRef.current) {
      
      const target = interiorBluePrintData.find(r => r.id === targetRoom);
      
      if (target) {
        // Smoothly move camera to the specific room's coordinates
        controlsRef.current.setLookAt(
            ...target.camPos,    // Move Camera To [x, y, z]
            ...target.camTarget, // Look At [x, y, z]
            true                 // Enable smooth transition
        );
      }
    }
  }, [targetRoom, viewMode, controlsRef]);


  // ---------------------------------------------------------
  // 3. EXTERIOR ORBIT LOGIC (Selecting Units from Outside)
  // ---------------------------------------------------------
  useEffect(() => {
     if (viewMode === 'exterior' && selectedProperty && controlsRef.current) {
        const targetUnit = bluePrintData.find((u) => u.id === selectedProperty);
        
        if (targetUnit) {
             const unitX = targetUnit.position[0];
             const unitZ = targetUnit.position[2];
             
             // Calculate angle to look at the unit from the front
             const currentAzimuth = controlsRef.current.azimuthAngle;
             const targetAzimuth = Math.atan2(unitX, unitZ);

             // Shortest path logic for rotation
             let diff = targetAzimuth - currentAzimuth;
             while (diff > Math.PI) diff -= 2 * Math.PI;
             while (diff < -Math.PI) diff += 2 * Math.PI;
             
             // Rotate to face the unit
             controlsRef.current.rotateTo(currentAzimuth + diff, Math.PI / 2.5, true);
             // Zoom in slightly to focus on it
             controlsRef.current.dollyTo(6, true);
        }
     }
  }, [selectedProperty, viewMode, controlsRef]); // Added controlsRef to dependency

  return null;
};

export default CameraHandler;