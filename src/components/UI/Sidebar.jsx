import React from "react";
import { propertyDetails } from "../../data/properties";
import { useStore } from "../../store/useStore";

const propertyDetailsMap = new Map(propertyDetails.map((p) => [p.id, p]));

const Sidebar = () => {
  const { selectedProperty, setSelectedProperty, viewMode, setViewMode } =
    useStore();

  const activeUnit = propertyDetailsMap.get(selectedProperty);

  const handleBack = () => {
    if (viewMode === 'interior') {
      setViewMode('exterior');
      setSelectedProperty(null);
    } else {
      setSelectedProperty(null);
    }
  };

  const handleViewSwitching = () => {
    if (viewMode === 'interior') {
      setViewMode('exterior');
    } else {
      setViewMode('zooming_in');
    }
  }

  return (
    <div className="h-full w-full bg-white border-r border-gray-200 shadow-xl flex flex-col font-sans text-gray-800 relative z-10">
      {/* --- HEADER SECTION --- */}
      <div className="p-6 border-b border-gray-100 bg-gray-50">
        {activeUnit ? (
          // Header for Details View
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="p-2 -ml-2 rounded-full hover:bg-gray-200 text-gray-600 transition-colors"
              title="Back to list"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-gray-900">
               {viewMode === 'interior' ? 'Interior View' : 'Unit Details'}
            </h1>
          </div>
        ) : (
          // Header for List View
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Property List</h1>
            <p className="text-sm text-gray-500 mt-1">
              Select a unit from the list or the 3D model
            </p>
          </div>
        )}
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="flex-1 overflow-y-auto">
        {activeUnit ? (
          /* ==================== 
             DETAIL VIEW 
             ==================== */
          <div className="p-6 flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Main Info Card */}
            <div
              className={`p-5 rounded-xl border ${
                activeUnit.isAvailable
                  ? "bg-green-50 border-green-100"
                  : "bg-red-50 border-red-100"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {activeUnit.type} Unit
                  </h2>
                  <span className="text-sm text-gray-500 font-medium">
                    ID: {activeUnit.id}
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                    activeUnit.isAvailable
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {activeUnit.isAvailable ? "Available" : "Sold"}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200/50 flex justify-between items-end">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">
                    Price
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {activeUnit.price}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase font-semibold">
                    Area
                  </p>
                  <p className="text-lg font-bold text-gray-700">
                    {activeUnit.sqft}{" "}
                    <span className="text-sm font-normal">sqft</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase mb-2">
                Overview
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {activeUnit.description}
              </p>
            </div>

            {/* Features Grid */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase mb-3">
                Key Features
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Bathrooms</p>
                  <p className="font-semibold text-gray-800">
                    {activeUnit.bathrooms}
                  </p>
                </div>
                {activeUnit.features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-3 rounded-lg border border-gray-100"
                  >
                    <p className="text-xs text-gray-400 mb-1">Feature</p>
                    <p className="font-semibold text-gray-800 text-xs">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-auto pt-6">
              <button
                onClick={handleViewSwitching}
                disabled={!activeUnit.isAvailable}
                className={`w-full py-3 rounded-lg font-bold transition-all shadow-md ${
                  activeUnit.isAvailable
                    ? "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {activeUnit.isAvailable ? (viewMode === "interior" ? "Return to Exterior" : "Explore Interior") : "Unavailable"}
              </button>
            </div>
          </div>
        ) : (
          /* ==================== 
             LIST VIEW 
             ==================== */
          <div className="flex flex-col">
            {propertyDetails.map((unit) => (
              <div
                key={unit.id}
                onClick={() => setSelectedProperty(unit.id)}
                className="p-5 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors group"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {unit.type} - {unit.id}
                  </h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      unit.isAvailable
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {unit.isAvailable ? "Available" : "Sold"}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{unit.sqft} sqft</span>
                  <span className="font-semibold text-gray-700">
                    {unit.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
