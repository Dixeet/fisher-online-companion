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
    variations: {
      colors: ['primary', 'secondary'],
      lighten: 2,
      darken: 2,
    },
    themes: {
      dark: {
        colors: {
          primary: '#b0d442',
          'primary-container': '#3c4d00',
          secondary: '#c3caa9',
          'secondary-container': '#434930',
          tertiary: '#a1d0c6',
          'tertiary-container': '#204e47',
          background: '#1b1c17',
          surface: '#232619',
          'surface-variant': '#272b1a',
          'surface-bright': '#2b301b',
          error: '#CF6679',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
          'on-primary': '#283500',
          'on-primary-container': '#cbf15c',
          'on-secondary': '#2d331c',
          'on-secondary-container': '#dfe6c4',
          'on-tertiary': '#033731',
          'on-tertiary-container': '#bcece2',
          'on-background': '#e4e3db',
          'on-surface': '#e4e3db',
          'on-surface-variant': '#e4e3db',
          'on-surface-bright': '#e4e3db',
        },
        variables: {
          'border-color': '#FFFFFF',
          'border-opacity': 0.12,
          'high-emphasis-opacity': 1,
          'medium-emphasis-opacity': 0.7,
          'disabled-opacity': 0.5,
          'idle-opacity': 0.1,
          'hover-opacity': 0.04,
          'focus-opacity': 0.12,
          'selected-opacity': 0.08,
          'activated-opacity': 0.12,
          'pressed-opacity': 0.16,
          'dragged-opacity': 0.08,
          'theme-kbd': '#212529',
          'theme-on-kbd': '#FFFFFF',
          'theme-code': '#343434',
          'theme-on-code': '#CCCCCC',
        },
      },
    },
  },
});
