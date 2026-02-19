import { create } from 'zustand';

export const useStore = create((set) => ({
  selectedProperty: null,
  hoveredProperty: null,
  cursorPos: { x: 0, y: 0 },
  viewMode: 'exterior', 
  isFading: false, 
  
  // New: Track which room inside the house is active
  targetRoom: null, 

  setSelectedProperty: (id) => set({ selectedProperty: id }),
  setHoveredProperty: (id) => set({ hoveredProperty: id }),
  setCursorPos: (pos) => set({ cursorPos: pos }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setIsFading: (state) => set({ isFading: state }),
  
  // New Action
  setTargetRoom: (roomId) => set({ targetRoom: roomId }),
}));