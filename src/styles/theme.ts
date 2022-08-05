import mixins from './mixins';
import media from './media';

const color = {
  background: {
    white: '#FFFFFF',
    lightred: '#FFD7DE',
    lightgray: '#EBEBEB',
    red: '#FF375C',
    turquoise: '#5FA5C4',
    gray: '#EFEFEF',
    darkgray: '#747474',
  },

  font: {
    white: '#FFFFFF',
    lightgray: '#EAEAEA',
    red: '#FF3B2F',
    gray: '#9FA1A6',
    darkgray: '#747474',
    black: '#000000',
  },
  border: {
    white: '#FFFFFF',
    lightgray: '#EAEAEA',
    red: '#F55859',
    gray: '#CDCDCD',
    darkblue: '#4B617A',
    darkgray: '#747474',
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
