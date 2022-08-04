import mixins from './mixins';
import media from './media';

const color = {
  background: {
    white: '#FFFFFF',
    lightgray: '#EBEBEB',
  },
  font: {
    white: '#FFFFFF',
    gray: '#9FA1A6',
    black: '#000000',
  },
  border: {
    white: '#FFFFFF',
    lightgray: '#CDCDCD',
    black: '#000000',
  },
  button: {
    white: '#FFFFFF',
    red: '#D95763',
  },
  spinner: {
    gray: '#C3C3C399',
    darkgray: '#636767',
  },
};

export const theme = {
  color,
  media,
  mixins,
};

export type Theme = typeof theme;
