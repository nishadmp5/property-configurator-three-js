import React, { useState } from "react";
import { Edges } from "@react-three/drei"; // <--- Import Edges
import { propertyDetails } from "../../data/properties";
import { bluePrintData } from "./constants/propertyBluePrintContants";
import { useStore } from "../../strore/useStore";

const PropertyBlueprint = () => {
  const [debugMode, setDebugMode] = useState(false);
  const {
    setHoveredProperty,
    setSelectedProperty,
    setCursorPos,
    hoveredProperty,
    selectedProperty,
  } = useStore();

  return (
    <group>
      {/* Debug Toggle */}
      <mesh position={[0, 0, 5]} onClick={() => setDebugMode(!debugMode)}>
        <boxGeometry args={[0.5, 0.2, 0.5]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {bluePrintData.map((unit) => {
        const details = propertyDetails.find((p) => p.id === unit.id);
        if (!details) return null;

        const isHovered = hoveredProperty === unit.id;
        const isSelected = selectedProperty === unit.id;

        const statusColor = details.isAvailable ? "#4ade80" : "#ef4444";

        // Adjust opacity logic slightly:
        // If hovered/selected -> higher opacity
        // Debug mode -> low opacity
        const opacity = isHovered || isSelected ? 0.4 : debugMode ? 0.2 : 0;

        return (
          <mesh
            key={unit.id}
            position={unit.position}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProperty(unit.id);
            }}
            onPointerMove={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
              setCursorPos({ x: e.clientX, y: e.clientY });

              if (hoveredProperty !== unit.id) {
                setHoveredProperty(unit.id);
              }
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "auto";
              setHoveredProperty(null);
            }}
          >
            <boxGeometry args={unit.bounds} />

            <meshBasicMaterial
              color={statusColor}
              transparent
              opacity={opacity}
              depthWrite={false}
              toneMapped={false} // Makes colors pop more
            />

            {/* WHITE BORDER LOGIC */}
            {(isHovered || isSelected) && (
              <Edges
                scale={1}
                threshold={15} // Only show sharp edges
                color="white"
                lineWidth={2} // Thickness of the border
              />
            )}
          </mesh>
        );
      })}
    </group>
  );
};

export default PropertyBlueprint;
