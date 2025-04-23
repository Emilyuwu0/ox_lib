import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  colorScheme: 'dark',
  primaryColor: 'blue',
  colors: { dark: ['#afafaf', '#111', '#8d8d8d', '#333', '#313131', '#555', '#313131', '#000000c4', '#888', '#000'] },
  fontFamily: 'Poppins',
  fontSizes: { xs: 10, sm: 12, md: 14, lg: 16, xl: 18 },
  shadows: { sm: '1px 1px 3px rgba(0, 0, 0, 0.5)' },

  components: {
    Button: {
      styles: {
        root: {
          border: 'none',
          backgroundColor: '#1a1b1f',
          color: '#fff',
          fontSize: '10px',
          fontWeight: 500,
        },
      },
    },
  },
};
