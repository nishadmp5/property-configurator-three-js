import { Canvas } from "@react-three/fiber";
import Sidebar from "./UI/Sidebar";
import PropertyScene from "./Scene/PropertyScene";
import Tooltip from "./UI/Tooltip";
import TransitionOverlay from "./UI/TransitionOverlay"; // Import here

export const Layout = () => {
  return (
    <div className="relative w-full h-screen flex bg-gray-400 overflow-hidden">
      <Tooltip />
      
      <div className="h-full w-[25%] relative z-20"> {/* Sidebar stays under overlay but above scene */}
        <Sidebar />
      </div>
      
      <div className="flex-1 relative z-10">
              <TransitionOverlay /> 

        <PropertyScene />
      </div>
    </div>
  );
};