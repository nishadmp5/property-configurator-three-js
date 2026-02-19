import Sidebar from "./UI/Sidebar";
import PropertyScene from "./Scene/PropertyScene";
import Tooltip from "./UI/Tooltip";
import TransitionOverlay from "./UI/TransitionOverlay";
import LoadingScreen from "./UI/LoadingScreen";

export const Layout = () => {
  return (
    <div className="relative w-full h-screen flex bg-gray-400 overflow-hidden">
      {/* Loading Screen - z-100, on top of everything */}
      <LoadingScreen />

      {/* Transition Overlay - z-90, covers sidebar + scene during fade */}
      <TransitionOverlay />

      {/* Tooltip - z-50 */}
      <Tooltip />

      {/* Sidebar - z-20 */}
      <div className="h-full w-[25%] relative z-20">
        <Sidebar />
      </div>

      {/* Scene - z-10 */}
      <div className="flex-1 relative z-10">
        <PropertyScene />
      </div>
    </div>
  );
};