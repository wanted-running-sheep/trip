import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import useFetchHotel from '@/hooks/useFetchHotel';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

import { SearchQueryWithoutCurrentPageType } from 'request';
import { Spinner, HotelCard, Skeleton } from '@/components';

interface HotelListProps {
  searchQuery?: SearchQueryWithoutCurrentPageType;
}

const initFilterValue = {
  keyword: '',
  guests: 2,
};

const HotelList = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const { isIntersecting, getObserver } = useInfiniteScroll(loaderRef);
  const { hotelList, isLoading } = useFetchHotel(isIntersecting);

  const observeTrigger = (isLoading: boolean) => {
    if (isLoading) {
      loaderRef.current && getObserver().unobserve(loaderRef.current);
    } else {
      loaderRef.current && getObserver().observe(loaderRef.current);
    }
  };

  useEffect(() => {
    observeTrigger(isLoading);
  }, [isLoading]);

  return (
    <Wrapper>
      <ul>
        {isLoading && !hotelList.length ? (
          <Skeleton />
        ) : (
          hotelList.map(({ hotel_name, occupancy }) => (
            <Li key={hotel_name}>
              <HotelCard
                hotelName={hotel_name}
                minGuest={occupancy.base}
                maxGuest={occupancy.max}
              />
            </Li>
          ))
        )}
      </ul>
      {!hotelList.length && (
        <ResutMessageWrapper>
          <h3>검색 결과가 없습니다</h3>
        </ResutMessageWrapper>
      )}
      {isLoading && <Spinner />}
      <div ref={loaderRef}></div>
    </Wrapper>
  );
};

export default HotelList;

const Wrapper = styled.div`
  overflow: auto;
  ${({ theme }) => theme.mixins.noScrollBar()}
`;

const Li = styled.li`
  list-style: none;
  width: 100%;
`;

const ResutMessageWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 20px;
`;
