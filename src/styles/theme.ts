import mixins from './mixins';
import media from './media';

const color = {
  background: {
    white: '#FFFFFF',
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
  },
};

export const theme = {
  color,
  media,
  mixins,
};
export type Theme = typeof theme;
