import 'vuetify/styles';
import '~/assets/styles/main.scss';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        colors: {
          primary: '#1867c0',
          secondary: '#5CBBF6',
          tertiary: '#E57373',
          accent: '#005CAF',
          quarternary: '#B0D1E8',
          'surface-bright': '#fafafa',
        },
      },
      dark: {
        colors: {
          primary: '#2196F3',
          secondary: '#424242',
          tertiary: '#E57373',
          accent: '#FF4081',
          quarternary: '#B0D1E8',
          'surface-bright': '#474747',
        },
      },
    },
  },
});
