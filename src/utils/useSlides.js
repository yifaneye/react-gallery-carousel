import SlidesFactory from './SlidesFactory';
import { useMemo, useRef } from 'react';

const useSlides = (items, { index, isLoop, isRTL }) => {
  const itemsRef = useRef(items);
  return useMemo(() => {
    const slidesFactory = new SlidesFactory();
    const slides = slidesFactory.CreateSlides(itemsRef.current, {
      index: index,
      isLoop: isLoop,
      isRTL: isRTL
    });
    const slidesElements = slides.slides;
    return [slides, slidesElements];
  }, [itemsRef, index, isLoop, isRTL]);
};

export default useSlides;
