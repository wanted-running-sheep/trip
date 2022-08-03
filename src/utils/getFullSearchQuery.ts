import { searchQueryInterface } from 'request';

const getFullSearchQuery = ({
  keyword,
  guests,
  currentPage,
}: searchQueryInterface) => {
  return `?hotel_name_like=${keyword}&occupancy.base_lte=${guests}&occupancy.max_gte=${guests}&_page=${currentPage}`;
};

export default getFullSearchQuery;
