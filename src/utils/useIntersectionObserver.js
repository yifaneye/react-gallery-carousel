import { useEffect, useState } from 'react';

const useIntersectionObserver = (elementRef) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: '0px', threshold: 0 }
    );
    if (elementRef.current) observer.observe(elementRef.current);

    return () => {
      if (observer) observer.disconnect();
    };
  }, [elementRef, isIntersecting]);

  return isIntersecting;
};

export default useIntersectionObserver;
