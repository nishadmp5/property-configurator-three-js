import { useEffect } from "react";
import { useStore } from "../store/useStore";
import { bluePrintData } from "../constants/propertyBlueprintConstants";
import { cameraConfig } from "../constants/cameraConfig";

const useViewTransition = (controlsRef) => {
  const {
    selectedProperty,
    viewMode,
    setViewMode,
    setIsFading,
    setTargetRoom,
  } = useStore();

  useEffect(() => {
    if (!controlsRef.current) return;
    let cancelled = false;

    const performTransition = async () => {
      // --- TRANSITION INTO INTERIOR ---
      if (viewMode === "zooming_in" && selectedProperty) {
        const targetUnit = bluePrintData.find((u) => u.id === selectedProperty);

        if (targetUnit) {
          const [x, y, z] = targetUnit.position;
          const { approachOffsetZ, fadeDurationMs } = cameraConfig.transition;
          const { interior } = cameraConfig.defaults;

          await controlsRef.current.setLookAt(
            x, y, z + approachOffsetZ,
            x, y, z,
            true
          );
          if (cancelled) return;

          setIsFading(true);

          await new Promise((resolve) => setTimeout(resolve, fadeDurationMs));
          if (cancelled) return;

          setViewMode("interior");
          setTargetRoom(null);

          await controlsRef.current.setLookAt(
            ...interior.position,
            ...interior.target,
            false
          );
          if (cancelled) return;

          setIsFading(false);
        }
      }

      // --- TRANSITION BACK TO EXTERIOR (RESET) ---
      if (viewMode === "exterior" && !selectedProperty) {
        const { exterior } = cameraConfig.defaults;
        controlsRef.current.setLookAt(
          ...exterior.position,
          ...exterior.target,
          true
        );
      }
    };

    performTransition();

    return () => { cancelled = true; };
  }, [selectedProperty, viewMode, controlsRef, setViewMode, setIsFading, setTargetRoom]);
};

export default useViewTransition;
