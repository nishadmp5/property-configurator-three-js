export const cameraConfig = {
  defaults: {
    exterior: { position: [0, 5, 10], target: [0, 0, 0] },
    interior: { position: [0, 1.6, 4], target: [0, 1.2, 0] },
    initial: { position: [0, 2, 5], fov: 50 },
  },

  exterior: {
    dollyDistance: 6,
    polarAngle: Math.PI / 2.5,
  },

  transition: {
    approachOffsetZ: 1.5,
    fadeDurationMs: 750,
  },

  controls: {
    smoothTime: 1.0,
    exterior: { dollySpeed: 1, minDistance: 4, maxDistance: 5 },
    interior: { dollySpeed: 0, minDistance: 0.1, maxDistance: 20 },
  },
};
