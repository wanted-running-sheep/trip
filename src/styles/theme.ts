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
  },
  border: {
    white: '#FFFFFF',
    lightgray: '#EAEAEA',
    darkgray: '#747474',
    darkblue: '#4B617A',
    black: '#000000',
    red: '#F55859',
  },
  button: {
    white: '#FFFFFF',
    gray: '#B4B4B4',
    darkgray: '#959595',
    blue: '#4375D1',
  },
};

export const theme = {
  color,
  media,
  mixins,
};
export type Theme = typeof theme;
