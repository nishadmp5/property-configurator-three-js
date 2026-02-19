import React, { useState } from "react";
import { Edges, Html } from "@react-three/drei";
import { useStore } from "../../strore/useStore";
import { interiorBluePrintData } from "./constants/interiorConstants";

const InteriorBluePrint = () => {
  const { setTargetRoom } = useStore();
  const [hovered, setHovered] = useState(null);

  return (
    <group>
      {interiorBluePrintData.map((room) => {
        const isHovered = hovered === room.id;

        return (
          <group key={room.id} position={room.position}>
            {/* The Clickable Trigger Mesh */}
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                setTargetRoom(room.id);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
                setHovered(room.id);
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "auto";
                setHovered(null);
              }}
            >
              {/* Invisible box for easy clicking, visible outline */}
              <boxGeometry args={room.bounds} />
              <meshBasicMaterial 
                color={isHovered ? "#60a5fa" : "white"} 
                transparent 
                opacity={0.1} 
                depthWrite={false}
              />
              
              {/* Visible Borders to make it look like a blueprint */}
              <Edges
                scale={1}
                threshold={15}
                color={isHovered ? "#60a5fa" : "white"} // Blue on hover, white default
                lineWidth={2}
              />
            </mesh>

            {/* Floating Label */}
            <Html position={[0, 1.2, 0]} center distanceFactor={10}>
              <div className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase transition-all whitespace-nowrap ${
                  isHovered ? "bg-blue-600 text-white" : "bg-black/50 text-white backdrop-blur-sm"
              }`}>
                {room.name}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};

export default InteriorBluePrint;