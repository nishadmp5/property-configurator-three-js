import { useEffect } from "react";
import { useStore } from "../store/useStore";
import { bluePrintData } from "../constants/propertyBlueprintConstants";
import { cameraConfig } from "../constants/cameraConfig";

const useExteriorCamera = (controlsRef) => {
  const { selectedProperty, viewMode } = useStore();

  useEffect(() => {
    if (viewMode === "exterior" && selectedProperty && controlsRef.current) {
      const targetUnit = bluePrintData.find((u) => u.id === selectedProperty);

      if (targetUnit) {
        const unitX = targetUnit.position[0];
        const unitZ = targetUnit.position[2];
        const { dollyDistance, polarAngle } = cameraConfig.exterior;

        const currentAzimuth = controlsRef.current.azimuthAngle;
        const targetAzimuth = Math.atan2(unitX, unitZ);

        // Shortest path rotation
        let diff = targetAzimuth - currentAzimuth;
        while (diff > Math.PI) diff -= 2 * Math.PI;
        while (diff < -Math.PI) diff += 2 * Math.PI;

        controlsRef.current.rotateTo(currentAzimuth + diff, polarAngle, true);
        controlsRef.current.dollyTo(dollyDistance, true);
      }
    }
  }, [selectedProperty, viewMode, controlsRef]);
};

export default useExteriorCamera;
