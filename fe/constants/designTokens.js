// designTokens.js – central place for UI constants (colors, spacing, font sizes, etc.)

// Color palette (company‑standard, using HSL for easier theming)
export const COLORS = {
  // Primary button
  primary: "#FF6636",
  primaryLight: "#FFDDD1",

  // Category background variants (matching the six design tokens you provided)
  category: [
    "#E1F7E3",
    "#EBEBFF",
    "#FFF2E5",
    "#FFF0F0",
    "#E9EAF0",
    "#E9EAF0",
  ],

  // Neutral shades
  darkgreen: "#23BD33",
  darkmagenta: "#B63636",
  darkblue: "#453FCA",
  lightgreen: "#E1F7E3",
  lightpurple: "#EBEBFF",
  lightgrey: "#F5F7FA",
  white: "#FFFFFF",
  black: "#000000",
  footer: "#1D2026",
  gray100: "#f5f7fa",
  gray200: "#e9eaf0",
  gray300: "#d1d5db",
  gray400: "#6e7485",
};

// Typography tokens
export const FONT = {
  family: "'Inter', system-ui, sans-serif",
  weightRegular: 400,
  weightMedium: 500,
  weightBold: 700,
  sizeBase: "1rem", // 16px
  sizeSm: "0.875rem",
  sizeLg: "1.125rem",
  sizeXl: "1.5rem",
  size2xl: "2rem",
  size3xl: "2.5rem",
};

// Spacing scale (8‑point grid)
export const SPACING = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  xxl: "48px",
};

// Z‑index layers
export const Z_INDEX = {
  dropdown: 1000,
  modal: 1100,
  tooltip: 1200,
  navbar: 1300,
  hero: 0,
};

// Export a helper to get a category colour by index (cyclic)
export const getCategoryColor = (index) =>
  COLORS.category[index % COLORS.category.length];

// Example usage in a component:
// const bg = getCategoryColor(idx);
// const style = { backgroundColor: bg };
