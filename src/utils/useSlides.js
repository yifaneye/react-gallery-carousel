import Slides from './slides';
import { useMemo, useRef } from 'react';

const useSlides = (items, options) => {
  const itemsRef = useRef(items);
  const optionsRef = useRef(options);
  return useMemo(() => {
    const slides = new Slides(itemsRef.current, optionsRef.current);
    const slidesElements = slides.slides;
    return [slides, slidesElements];
  }, [itemsRef, optionsRef]);
};

export default useSlides;
