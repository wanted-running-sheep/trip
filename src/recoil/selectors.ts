import { selector } from 'recoil';
import { searchFilterState } from './atoms';

export const formattedSearchFilter = selector({
  key: 'formattedSearchFilter',
  get: ({ get }) => {
    const searchFilter = get(searchFilterState);
    const { keyword, adults, children } = searchFilter;
    return {
      keyword,
      guests: adults + children,
    };
  },
});
