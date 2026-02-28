'use client';

import { createTheme, ThemeOptions } from '@mui/material/styles';

export const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: { main: '#D32F2F' }, // rojo “metal”
          secondary: { main: '#FF6F00' },
          background: { default: '#fafafa', paper: '#ffffff' },
        }
      : {
          primary: { main: '#EF5350' },
          secondary: { main: '#FFA726' },
          background: { default: '#0e0e10', paper: '#151517' },
        }),
  },
  typography: {
    fontFamily: ['var(--font-playfair-display)', 'Playfair Display', 'system-ui', 'Arial'].join(','),
    h1: { fontFamily: ['var(--font-cormorant)', 'Cormorant', 'system-ui', 'Arial'].join(','), fontWeight: 600, letterSpacing: -0.5 },
    h2: { fontFamily: ['var(--font-cormorant)', 'Cormorant', 'system-ui', 'Arial'].join(','), fontWeight: 600 },
    h3: { fontFamily: ['var(--font-cormorant)', 'Cormorant', 'system-ui', 'Arial'].join(','), fontWeight: 600 },
    h4: { fontFamily: ['var(--font-cormorant)', 'Cormorant', 'system-ui', 'Arial'].join(','), fontWeight: 600 },
    h5: { fontFamily: ['var(--font-cormorant)', 'Cormorant', 'system-ui', 'Arial'].join(','), fontWeight: 600 },
    h6: { fontFamily: ['var(--font-cormorant)', 'Cormorant', 'system-ui', 'Arial'].join(','), fontWeight: 600 },
    button: { textTransform: 'none' },
  },
  shape: { borderRadius: 10 },
});

export const makeTheme = (mode: 'light' | 'dark') => createTheme(getDesignTokens(mode));
