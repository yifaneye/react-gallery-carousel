import { useEffect } from 'react';

const useAnchor = (elementRef, shouldScrollToElement) => {
  useEffect(() => {
    const element = elementRef.current;

    const scrollToCenter = () => {
      if (!element) return;
      const container = element.parentNode;

      // Can not use element.scrollIntoView(element, { behavior: 'smooth', block: 'nearest', inline: 'center' });
      // because it will also cause unwanted vertical movement when the element is not vertically in the viewport
      // (e.g. the element is somewhere down the page)
      element.parentNode.scrollTo({
        top: 0,
        left:
          element.offsetLeft -
          container.clientWidth / 2 +
          element.clientWidth / 2,
        behavior: 'smooth'
      });
    };

    if (shouldScrollToElement) scrollToCenter(element);

    const handleClick = () => scrollToCenter(element);

    if (element) element.addEventListener('click', handleClick);

    return () => {
      if (element) element.removeEventListener('click', handleClick);
    };
  }, [elementRef, shouldScrollToElement]);
};

export default useAnchor;
