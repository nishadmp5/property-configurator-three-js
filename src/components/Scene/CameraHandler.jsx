import useViewTransition from "../../hooks/useViewTransition";
import useInteriorCamera from "../../hooks/useInteriorCamera";
import useExteriorCamera from "../../hooks/useExteriorCamera";

const CameraHandler = ({ controlsRef }) => {
  useViewTransition(controlsRef);
  useInteriorCamera(controlsRef);
  useExteriorCamera(controlsRef);

  return null;
};

export default CameraHandler;
