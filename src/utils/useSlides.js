import SlidesFactory from './SlidesFactory';
import { useMemo } from 'react';

const useSlides = (items, { index, isLoop }) => {
  return useMemo(() => {
    const slidesFactory = new SlidesFactory();
    const slides = slidesFactory.CreateSlides(items, {
      index: index,
      isLoop: isLoop
    });
    const slidesElements = slides.slides;
    return [slides, slidesElements];
  }, [items, index, isLoop]);
};

export default useSlides;
