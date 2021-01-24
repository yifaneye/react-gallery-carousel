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

    element.addEventListener('click', handleClick);
    return () => {
      element.removeEventListener('click', handleClick);
    };
  }, [elementRef, optionsRef]);
};

export default useAnchor;
