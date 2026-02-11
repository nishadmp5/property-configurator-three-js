import { Canvas } from "@react-three/fiber";
import Sidebar from "./UI/Sidebar";
import PropertyScene from "./Scene/PropertyScene";
import Tooltip from "./UI/Tooltip";

export const Layout = () => {
  return (
    <div className="relative w-full h-screen flex bg-gray-400">
      <Tooltip />
      <div className="h-full w-[25%]">
        <Sidebar />
      </div>
      <PropertyScene />
    </div>
  );
};
