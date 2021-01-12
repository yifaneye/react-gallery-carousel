import Slides from './slides';
import { useMemo } from 'react';

const useSlides = (items, props) => {
  return useMemo(() => {
    const slides = new Slides(items, props);
    const slidesElements = slides.slides;
    return [slides, slidesElements];
  }, [items, props]);
};

export default useSlides;
