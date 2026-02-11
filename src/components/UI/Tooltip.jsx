import React from "react";
import { propertyDetails } from "../../data/properties";
import { useStore } from "../../strore/useStore";

const Tooltip = () => {
  const { hoveredProperty, cursorPos } = useStore();

  // If nothing is hovered, don't render anything
  if (!hoveredProperty) return null;

  const details = propertyDetails.find((p) => p.id === hoveredProperty);
  if (!details) return null;

  return (
    <div
      className="fixed z-50 pointer-events-none flex flex-col items-center text-center bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-xl border border-gray-200 min-w-[150px] transition-opacity duration-150"
      style={{
        left: cursorPos.x,
        top: cursorPos.y,
        // Offset the tooltip slightly so it doesn't appear under the mouse directly
        transform: "translate(-50%, -130%)", 
      }}
    >
      <h3 className="font-bold text-gray-800 text-sm">
        {details.type} - {details.name || details.id}
      </h3>

      <p className="text-gray-600 text-xs font-semibold mt-1">
        {details.price}
      </p>

      <span
        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full mt-2 ${
          details.isAvailable
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {details.isAvailable ? "Available" : "Sold / Reserved"}
      </span>

      <span className="text-[9px] text-gray-400 mt-2">Click for details</span>
      
      {/* Little arrow at the bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white/95 filter drop-shadow-sm"></div>
    </div>
  );
};

export default Tooltip;