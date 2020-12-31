import { Slides } from './slides';

export const useSlides = (items, props) => {
  return new Slides(items, props);
};
