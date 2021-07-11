import { useEffect, useState } from 'react';

const useFixedPosition = (initialState, elementToFocusRef) => {
  const [isFixed, setIsFixed] = useState(initialState);

  useEffect(() => {
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    const bodyElement = document.querySelector('body');
    const overflowValue = bodyElement.style.overflow;

    if (isFixed) {
      bodyElement.style.overflow = 'hidden';
      if (elementToFocusRef.current) elementToFocusRef.current.focus();
    }

    return () => {
      if (isFixed) {
        window.scrollTo(scrollX, scrollY);
        bodyElement.style.overflow = overflowValue;
      }
    };
  }, [isFixed, elementToFocusRef]);

  return [isFixed, setIsFixed];
};

export default useFixedPosition;
