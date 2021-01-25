import { useEffect, useRef } from 'react';

const useAnchor = (
  elementRef,
  shouldScrollIntoView,
  options = { behavior: 'smooth', block: 'nearest', inline: 'center' }
) => {
  const optionsRef = useRef(options);

  useEffect(() => {
    const element = elementRef.current;

    if (shouldScrollIntoView) element.scrollIntoView(optionsRef.current);

    const handleClick = () => {
      element.scrollIntoView(optionsRef.current);
    };

    if (element) element.addEventListener('click', handleClick);

    return () => {
      if (element) element.removeEventListener('click', handleClick);
    };
  }, [elementRef, shouldScrollIntoView, optionsRef]);
};

export default useAnchor;
