import { useCallback, useEffect } from 'react';
import useEventListener from './useEventListener';

const useAnchor = (elementRef, options) => {
  const scrollToCenter = useCallback(() => {
    if (!options.isCurrent) return;
    const element = elementRef.current;
    if (!element) return;
    const container = element.parentNode;

    // Can not use element.scrollIntoView(element, { behavior: 'smooth', block: 'nearest', inline: 'center' });
    // because it will also cause unwanted vertical movement when the element is not vertically in the viewport
    // (e.g. the element is somewhere down the page)
    container.scrollTo({
      top: 0,
      left:
        element.offsetLeft - container.clientWidth / 2 + element.clientWidth / 2
    });
  }, [elementRef, options]);

  useEffect(() => scrollToCenter(), [scrollToCenter, options]);

  // both are only for centering the current element that should be scrolled to
  useEventListener(elementRef.current, 'click', scrollToCenter);
  useEventListener(window, 'resize', scrollToCenter);
};

export default useAnchor;
