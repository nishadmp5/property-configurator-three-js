import React, { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

const LoadingScreen = () => {
  const { active, progress } = useProgress();
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    // If loading is done (active is false) and progress is 100
    if (!active && progress === 100) {
      // Add a slight delay to ensure the logic doesn't snap off too quickly
      const timeout = setTimeout(() => {
        setFinished(true);
      }, 500);
      return () => clearTimeout(timeout);
    } else {
        setFinished(false);
    }
  }, [active, progress]);

  // If finished, we render nothing (or keep it in DOM with opacity 0 if you prefer)
  // Rendering null removes it from the DOM completely after the transition
  // But to animate opacity, we need it in the DOM.
  
  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-900 text-white transition-opacity duration-1000 ease-in-out pointer-events-none ${
        finished ? "opacity-0" : "opacity-100 pointer-events-auto"
      }`}
    >
      <div className="w-64 flex flex-col items-center gap-4">
        {/* Title / Logo area */}
        <h1 className="text-2xl font-light tracking-[0.2em] uppercase">
          Property<span className="font-bold">Configurator</span>
        </h1>

        {/* Progress Bar Container */}
        <div className="w-full h-[2px] bg-zinc-800 rounded-full overflow-hidden relative">
          {/* Animated Bar */}
          <div
            className="h-full bg-white transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Text */}
        <p className="text-xs text-zinc-500 font-mono mt-1">
          LOADING ASSETS {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;