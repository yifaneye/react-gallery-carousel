import { useCallback, useEffect } from 'react';
import useEventListener from './useEventListener';

const useAnchor = (elementRef, options) => {
  const scrollToCenter = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;
    const container = element.parentNode.parentNode;

    // Can not use element.scrollIntoView(element, { behavior: 'smooth', block: 'nearest', inline: 'center' });
    // because it will also cause unwanted vertical movement when the element is not vertically in the viewport
    // (e.g. the element is somewhere down the page)
    container.scrollTo({
      top: 0,
      left:
        element.offsetLeft - container.clientWidth / 2 + element.clientWidth / 2
    });
  }, [elementRef]);

  // center the current element on init, on maximize and on minimize
  useEffect(() => scrollToCenter(), [scrollToCenter, options]);

  // center the current element on click
  useEventListener(elementRef.current, 'click', scrollToCenter);

  // center the current element on resize (including orientationchange)
  useEventListener(window, 'resize', scrollToCenter);
};

export default useAnchor;
