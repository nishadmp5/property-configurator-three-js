import { create } from 'zustand';

export const useStore = create((set) => ({
  selectedProperty: null,
  hoveredProperty: null,
  cursorPos: { x: 0, y: 0 },
  viewMode: 'exterior', 
  
  // New: Controls the black overlay
  isFading: false, 

  setSelectedProperty: (id) => set({ selectedProperty: id }),
  setHoveredProperty: (id) => set({ hoveredProperty: id }),
  setCursorPos: (pos) => set({ cursorPos: pos }),
  setViewMode: (mode) => set({ viewMode: mode }),
  
  // New action
  setIsFading: (state) => set({ isFading: state }),
}));