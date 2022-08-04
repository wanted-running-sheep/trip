import React from 'react';
import styled from 'styled-components';

const SkeletonItem = () => {
  return (
    <Wrapper>
      <ImgWrapper>
        <Shimmer />
      </ImgWrapper>
      <InfoArea>
        <TextWrap>
          <TextConatiner>
            <Shimmer />
          </TextConatiner>

          <TextConatiner>
            <Shimmer />
          </TextConatiner>
          <TextConatiner>
            <Shimmer />
          </TextConatiner>
        </TextWrap>
      </InfoArea>
    </Wrapper>
  );
};

export default SkeletonItem;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  border: 1px solid ${({ theme }) => theme.color.border.lightgray};
  border-radius: 4px;
  display: flex;

  ${({ theme }) => theme.mixins.boxShadow()}
`;

const ImgWrapper = styled.div`
  min-width: 164px;
  height: 215px;
  background-color: #eeeeee;
  overflow: hidden;
`;

const InfoArea = styled.div`
  width: 100%;
  padding: 20px;
  ${({ theme }) => theme.mixins.flexBox('', 'space-between')}
`;

const TextWrap = styled.div`
  width: 200px;
  height: 100%;
`;

const TextConatiner = styled.div`
  width: 100%;
  height: 22px;
  overflow: hidden;
  background-color: #eeeeee;
  margin-bottom: 10px;
`;

const Shimmer = styled.div`
  width: 50%;
  height: 100%;
  background-color: #e0e0e0;
  box-shadow: 0 0 30px 30px #e0e0e0;
  animation: loading 2s infinite;
  @keyframes loading {
    0% {
      transform: translateX(-50%);
    }
    50% {
      transform: translateX(100%);
    }
    100% {
      transform: translate(100%);
    }
  }
`;
