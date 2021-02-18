import { useCallback } from 'react';
import useEventListener from './useEventListener';

const useAnchor = (elementRef, shouldScrollToElement) => {
  const element = elementRef.current;

  const scrollToCenter = useCallback(() => {
    if (!element) return;
    if (!shouldScrollToElement) return;
    const container = element.parentNode;

    // Can not use element.scrollIntoView(element, { behavior: 'smooth', block: 'nearest', inline: 'center' });
    // because it will also cause unwanted vertical movement when the element is not vertically in the viewport
    // (e.g. the element is somewhere down the page)
    container.scrollTo({
      top: 0,
      left:
        element.offsetLeft - container.clientWidth / 2 + element.clientWidth / 2
    });
  }, [element, shouldScrollToElement]);

  if (shouldScrollToElement) scrollToCenter();

  // both are only for centering the element that should be scrolled to
  useEventListener(element, 'click', scrollToCenter);
  useEventListener(window, 'resize', scrollToCenter);
};

export default useAnchor;
