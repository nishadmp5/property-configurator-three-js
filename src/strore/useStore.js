import { create } from 'zustand';

export const useStore = create((set) => ({
  selectedProperty: null,
  hoveredProperty: null,
  cursorPos: { x: 0, y: 0 }, // New state for cursor tracking

  setSelectedProperty: (id) => set({ selectedProperty: id }),
  setHoveredProperty: (id) => set({ hoveredProperty: id }),
  setCursorPos: (pos) => set({ cursorPos: pos }),
}));