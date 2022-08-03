import React, { useEffect, useRef } from 'react';

import useFetchHotel from '@/hooks/useFetchHotel';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

import { searchQueryWithoutCurrentPage } from 'request';

import Spinner from '@/components/Spinner';
import HotelCard from '@/components/HotelCard';

import styled from 'styled-components';

interface HotelListProps {
  searchQuery?: searchQueryWithoutCurrentPage;
}

const initFilterValue = {
  keyword: '',
  guests: 2,
};

const HotelList = ({ searchQuery = initFilterValue }: HotelListProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const { isIntersecting, getObserver } = useInfiniteScroll(loaderRef);
  const { hotelList, isLoading } = useFetchHotel(isIntersecting, searchQuery);

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
        {hotelList.map(({ hotel_name, occupancy }) => (
          <Li key={hotel_name}>
            <HotelCard
              hotelName={hotel_name}
              minGuest={occupancy.base}
              maxGuest={occupancy.max}
            />
          </Li>
        ))}
      </ul>
      {isLoading && <Spinner />}
      <div ref={loaderRef}></div>
    </Wrapper>
  );
};

export default HotelList;

const Wrapper = styled.div`
  overflow: auto;
`;

const Li = styled.li`
  list-style: none;
`;
