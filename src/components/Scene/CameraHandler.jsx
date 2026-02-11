import { useEffect } from "react";
import * as THREE from "three";
import { useStore } from "../../strore/useStore";
import { bluePrintData } from "./constants/propertyBluePrintContants";

const CameraHandler = ({ controlsRef }) => {
  const { selectedProperty } = useStore();

  useEffect(() => {
    if (selectedProperty && controlsRef.current) {
      const targetUnit = bluePrintData.find((u) => u.id === selectedProperty);

      if (targetUnit) {
        // 1. Get current position data
        const currentAzimuth = controlsRef.current.azimuthAngle;
        
        // 2. Calculate the target Angle (Azimuth)
        // atan2(x, z) gives us the angle on the horizontal plane
        const unitX = targetUnit.position[0];
        const unitZ = targetUnit.position[2];
        const targetAzimuth = Math.atan2(unitX, unitZ);

        // 3. SHORTEST PATH LOGIC
        // We calculate the difference and normalize it to be between -PI and +PI
        let diff = targetAzimuth - currentAzimuth;

        // If diff is greater than 180 deg (PI), subtract 360 (2PI) to go the other way
        while (diff > Math.PI) diff -= 2 * Math.PI;
        // If diff is less than -180 deg (-PI), add 360 (2PI)
        while (diff < -Math.PI) diff += 2 * Math.PI;

        // The optimal angle is simply current + optimized difference
        const finalAzimuth = currentAzimuth + diff;

        // 4. Configuration for the view
        const DISTANCE = 6;      // Distance from center
        const POLAR_ANGLE = Math.PI / 2.5; // ~72 degrees (Looking slightly down)

        // 5. Execute Moves
        // We use 'rotateTo' for the angle and 'dollyTo' for the distance
        // This ensures the camera orbits instead of moving linearly
        controlsRef.current.rotateTo(finalAzimuth, POLAR_ANGLE, true);
        controlsRef.current.dollyTo(DISTANCE, true);
      }
    }
  }, [selectedProperty, controlsRef]);

  return null;
};

export default CameraHandler;