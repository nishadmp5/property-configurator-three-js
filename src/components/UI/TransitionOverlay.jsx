import React from "react";
import { useStore } from "../../store/useStore";

const TransitionOverlay = () => {
  const { isFading } = useStore();

  return (
    <div
      className={`fixed inset-0 z-90 pointer-events-none bg-black transition-opacity duration-700 ease-in-out ${
        isFading ? "opacity-100" : "opacity-0"
      }`}
    />
  );
};

export default TransitionOverlay;