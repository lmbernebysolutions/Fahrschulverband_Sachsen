/**
 * Design Tokens – Landesverband Sächsischer Fahrlehrer e.V.
 * Phoenix Redesign | Swiss Trust Style
 * WCAG AAA Compliance (Zielgruppe 60+)
 */

export const colors = {
  primary: {
    50: "#e8f5ea",
    100: "#c8e6c9",
    200: "#a5d6a7",
    300: "#81c784",
    400: "#66bb6a",
    500: "#178d30",
    600: "#148228",
    700: "#0f6b20",
    800: "#0a5518",
    900: "#053f10",
  },
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
  },
  accent: {
    50: "#fffbeb",
    100: "#fef3c7",
    500: "#f59e0b",
    600: "#d97706",
  },
  success: "#16a34a",
  warning: "#f59e0b",
  error: "#dc2626",
  info: "#0284c7",
  white: "#ffffff",
  black: "#171717",

  /** High-Contrast-Varianten für 60+ Admin-UI (WCAG AAA) */
  highContrast: {
    text: "#171717",
    textMuted: "#404040",
    border: "#262626",
  },
} as const;

export const typography = {
  fontFamily: "'Open Sans', system-ui, -apple-system, sans-serif",
  scale: {
    display: { size: "3rem", lineHeight: "1.1", weight: 700, letterSpacing: "-0.02em" },
    h1: { size: "2.25rem", lineHeight: "1.2", weight: 700, letterSpacing: "-0.01em" },
    h2: { size: "1.75rem", lineHeight: "1.3", weight: 700, letterSpacing: "0" },
    h3: { size: "1.375rem", lineHeight: "1.4", weight: 600, letterSpacing: "0" },
    h4: { size: "1.125rem", lineHeight: "1.4", weight: 600, letterSpacing: "0" },
    body: { size: "1.125rem", lineHeight: "1.7", weight: 400, letterSpacing: "0" },
    bodySmall: { size: "1rem", lineHeight: "1.6", weight: 400, letterSpacing: "0" },
    caption: { size: "0.875rem", lineHeight: "1.5", weight: 400, letterSpacing: "0.01em" },
    overline: { size: "0.75rem", lineHeight: "1.5", weight: 600, letterSpacing: "0.08em", textTransform: "uppercase" },
  },
  colors: {
    headline: "#178d30",
    subheadline: "#262626",
    body: "#404040",
    muted: "#737373",
    inverse: "#ffffff",
  },
} as const;

export const spacing = {
  px: "1px",
  0.5: "0.125rem",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",
} as const;

export const effects = {
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    base: "0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.05)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.05)",
    card: "0 2px 8px -2px rgb(0 0 0 / 0.08), 0 0 0 1px rgb(0 0 0 / 0.04)",
    hover: "0 8px 24px -4px rgb(0 0 0 / 0.12), 0 0 0 1px rgb(0 0 0 / 0.04)",
  },
  radii: {
    none: "0",
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    full: "9999px",
  },
  transitions: {
    fast: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
    base: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const;
