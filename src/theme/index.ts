/**
 * Theme barrel — re-exports all design tokens for easy importing.
 */

export * from "./motion";

// Re-export color tokens as a typed object for JS usage
export const colors = {
  primary: "#FFC629",
  lavender: "#C9B4FF",
  ink: "#0B0B1A",
  "ink-muted": "#6B7280",
  surface: "#FFFFFF",
  "surface-muted": "#F4F5F7",
  border: "#E5E7EB",
  glass: "rgba(255,255,255,0.7)",

  // Proposed new tokens
  "ink-subtle": "#9AA1B4",
  "lavender-soft": "#F3F0FF",
  accent: "#5B3DF5",
  "primary-soft": "#FEF6DC",
  success: "#1A7F50",
  "success-soft": "#E3F4EC",
  danger: "#E03A45",
  "danger-soft": "#FDE4EA",
  "promo-soft": "#FEE9F0",
  info: "#1D3FBF",
  "info-soft": "#EAF0FD",
} as const;

export type ColorToken = keyof typeof colors;