import React from "react";
import { useStore } from "../../strore/useStore";

const TransitionOverlay = () => {
  const { isFading } = useStore();

  return (
    <div
      className={`absolute inset-0 z-50 pointer-events-none bg-black transition-opacity duration-700 ease-in-out ${
        isFading ? "opacity-100" : "opacity-0"
      }`}
    />
  );
};

export default TransitionOverlay;