import { AxiosResponse } from 'axios';

const getTotalPage = (response: AxiosResponse) => {
  const headersLink = response.headers.link;
  const endIndex = response.headers.link.lastIndexOf('>');
  const startIndex = response.headers.link.lastIndexOf('_page=') + 6;
  const totalPage = headersLink.slice(startIndex, endIndex);
  return Number(totalPage);
};

export default getTotalPage;
