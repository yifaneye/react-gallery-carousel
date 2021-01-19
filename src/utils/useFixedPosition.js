import { useEffect, useState } from 'react';

const useFixedPosition = (initialState, elementRef) => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    const bodyElement = document.querySelector('body');
    const overflowValue = bodyElement.style.overflow;

    if (isFixed) {
      bodyElement.style.overflow = 'hidden';
      elementRef.current.focus();
    }

    return () => {
      if (isFixed) {
        window.scrollTo(scrollX, scrollY);
        bodyElement.style.overflow = overflowValue;
      }
    };
  }, [isFixed, elementRef]);

  return [isFixed, setIsFixed];
};

export default useFixedPosition;
