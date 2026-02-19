export const interiorBluePrintData = [
  {
    id: "living-room",
    name: "Living Room",
    // Where the clickable trigger box is located (e.g., at the entrance)
    position: [0, 1, 3], 
    bounds: [1, 2, 1], // Size of the trigger box
    // Where the camera moves to
    camPos: [0, 1.6, 0], 
    // Where the camera looks at
    camTarget: [0, 1.4, -5],
  },
  {
    id: "kitchen",
    name: "Kitchen",
    position: [-2.5, 1, 0],
    bounds: [1, 2, 1], 
    camPos: [-3, 1.6, 0],
    camTarget: [-5, 1.4, 0],
  },
  {
    id: "bedroom",
    name: "Master Bedroom",
    position: [2.5, 1, 0],
    bounds: [1, 2, 1],
    camPos: [3, 1.6, 0],
    camTarget: [5, 1.4, 0],
  },
  {
    id: "bathroom",
    name: "Bathroom",
    position: [0, 1, -3],
    bounds: [1, 2, 1],
    camPos: [0, 1.6, -3.5],
    camTarget: [0, 1.4, -5],
  }
];