import mixins from './mixins';
import media from './media';

const color = {
  background: {
    white: '#FFFFFF',
    lightgray: '#F4F4F4',
    darkgray: '#747474',
    gray: '#EFEFEF',
    lightblue: '#5FA5C4',
    red: '#FF375C',
    lightred: '#FFD7DE',
  },

  font: {
    white: '#FFFFFF',
    lightgray: '#EAEAEA',
    darkgray: '#747474',
    black: '#000000',
    gray: '#9FA1A6',
  },
  border: {
    white: '#FFFFFF',
    lightgray: '#EAEAEA',
    darkgray: '#747474',
    gray: '#CDCDCD',
    darkblue: '#4B617A',
    black: '#000000',
    red: '#F55859',
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
