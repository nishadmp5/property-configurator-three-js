import { useEffect } from "react";
import { useStore } from "../store/useStore";
import { interiorBluePrintData } from "../constants/interiorConstants";

const useInteriorCamera = (controlsRef) => {
  const { targetRoom, viewMode } = useStore();

  useEffect(() => {
    if (viewMode === "interior" && targetRoom && controlsRef.current) {
      const target = interiorBluePrintData.find((r) => r.id === targetRoom);

      if (target) {
        controlsRef.current.setLookAt(
          ...target.camPos,
          ...target.camTarget,
          true
        );
      }
    }
  }, [targetRoom, viewMode, controlsRef]);
};

export default useInteriorCamera;
