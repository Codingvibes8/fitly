/**
 * Motion tokens — shared across the app.
 * Durations in milliseconds.
 */

export const motion = {
  /** 150 ms — press feedback, toggle flip */
  fast: 150,
  /** 250 ms — standard enter/exit transitions */
  base: 250,
  /** 400 ms — sheet/modal animations */
  slow: 400,

  /** Shared spring config for expressive motion */
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
} as const;

export type MotionDuration = keyof typeof motion;