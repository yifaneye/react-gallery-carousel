import Slides from './slides';

const useSlides = (items, props) => {
  const slides = new Slides(items, props);
  const slidesElements = slides.slides;
  return [slides, slidesElements];
};

export default useSlides;
