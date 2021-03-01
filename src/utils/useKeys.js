import { useEffect, useRef } from 'react';

const useKeys = (elementRef, callbacks) => {
  const callbackRef = useRef(null);
  callbackRef.current = callbacks;

  useEffect(() => {
    const handleKeyDown = (event) => {
      callbackRef.current[event.key] && callbackRef.current[event.key](event);
    };

    const element = elementRef.current;
    if (element) element.addEventListener('keydown', handleKeyDown);

    return () => {
      if (element) element.removeEventListener('keydown', handleKeyDown);
    };
  }, [elementRef, callbackRef]);
};

export default useKeys;
