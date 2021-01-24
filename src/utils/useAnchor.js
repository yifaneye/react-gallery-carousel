import { useEffect, useRef } from 'react';

const useAnchor = (
  elementRef,
  options = {
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center'
  }
) => {
  const optionsRef = useRef(options);

  useEffect(() => {
    const element = elementRef.current;
    const handleClick = () => {
      element.scrollIntoView(optionsRef.current);
    };

    if (element) element.addEventListener('click', handleClick);

    return () => {
      if (element) element.removeEventListener('click', handleClick);
    };
  }, [elementRef, optionsRef]);
};

export default useAnchor;
