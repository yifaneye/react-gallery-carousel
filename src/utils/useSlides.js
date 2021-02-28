import SlidesFactory from './SlidesFactory';
import { useMemo, useRef } from 'react';

const useSlides = (items, { index, isLoop }) => {
  const itemsRef = useRef(items);
  return useMemo(() => {
    const slidesFactory = new SlidesFactory();
    const slides = slidesFactory.CreateSlides(itemsRef.current, {
      index: index,
      isLoop: isLoop
    });
    const slidesElements = slides.slides;
    return [slides, slidesElements];
  }, [itemsRef, index, isLoop]);
};

export default useSlides;
