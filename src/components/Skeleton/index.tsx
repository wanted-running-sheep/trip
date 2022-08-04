import React from 'react';
import createArray from '@/utils/createArray';
import styled from 'styled-components';
import SkeletonItem from './SkeletonItem';

const Skeleton = () => {
  return (
    <Wrapper>
      {createArray(10).map((v) => (
        <SkeletonItem key={v} />
      ))}
    </Wrapper>
  );
};

export default Skeleton;

const Wrapper = styled.div``;
