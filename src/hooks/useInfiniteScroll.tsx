import React, { RefObject, useEffect, useRef, useState } from 'react';

const useInfiniteScroll = (loaderRef: RefObject<HTMLDivElement>) => {
  const observerRef = useRef<IntersectionObserver>();
  const [isIntersecting, setIsIntersecting] = useState(false);

  const getObserver = () => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        setIsIntersecting(entries.some((entry) => entry.isIntersecting));
      });
    }
    return observerRef.current;
  };

  useEffect(() => {
    if (loaderRef.current) {
      getObserver().observe(loaderRef.current);
    }
  }, [loaderRef.current]);

  return { isIntersecting, getObserver };
};

export default useInfiniteScroll;
