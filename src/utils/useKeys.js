import { useEffect, useRef } from 'react';

const useKeys = (elementRef, callbacks) => {
  const callbackRef = useRef(null);
  callbackRef.current = callbacks;

  useEffect(() => {
    const handleKeyDown = (e) => {
      callbackRef.current[e.key] && callbackRef.current[e.key]();
    };

    const element = elementRef.current;
    element.addEventListener('keydown', handleKeyDown);
    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, [elementRef, callbackRef]);
};

export default useKeys;
