import { Canvas } from "@react-three/fiber";
import Sidebar from "./UI/Sidebar";
import PropertyScene from "./Scene/PropertyScene";
import Tooltip from "./UI/Tooltip";
import TransitionOverlay from "./UI/TransitionOverlay";
import LoadingScreen from "./UI/LoadingScreen"; // <--- Import

export const Layout = () => {
  return (
    <div className="relative w-full h-screen flex bg-gray-400 overflow-hidden">
      
      {/* 1. The Loading Screen sits on top of EVERYTHING (z-index 100) */}
      <LoadingScreen />

      {/* 2. Tooltip & Transition Overlay */}
      <Tooltip />

      {/* 3. Sidebar */}
      <div className="h-full w-[25%] relative z-20"> 
        <Sidebar />
      </div>
      
      {/* 4. Scene */}
      <div className="flex-1 relative z-10">
              <TransitionOverlay /> 
        <PropertyScene />
      </div>
    </div>
  );
};