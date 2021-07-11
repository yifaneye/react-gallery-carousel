import { useEffect, useState } from 'react';
import isSSR from './isSSR';

const useIntersectionObserver = (
  elementRef,
  rootRef,
  rootMargin = '0px 0px 0px 0px'
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    // fallback for browsers those do not support IntersectionObserver (i.e. IE)
    if (!('IntersectionObserver' in window)) {
      return () => {};
    }

    const root = rootRef?.current ? rootRef.current : null;

    // eslint-disable-next-line no-undef
    const observer = new IntersectionObserver(
      ([entry], observer) => {
        if (!isIntersecting && entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      // increase the size of the viewport using rootMargin to preload images
      { root: root, rootMargin: rootMargin, threshold: 0 }
    );
    if (elementRef.current) observer.observe(elementRef.current);

    return () => {
      if (observer) observer.disconnect();
    };
  }, [rootRef, rootMargin, elementRef, isIntersecting]);

  // fallback for SSR
  if (isSSR) {
    return false;
  }

  // fallback for browsers those do not support IntersectionObserver (i.e. IE)
  if (!('IntersectionObserver' in window)) {
    return true;
  }

  return isIntersecting;
};

export default useIntersectionObserver;
