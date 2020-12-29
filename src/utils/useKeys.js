import { useEffect, useRef } from 'react';

export const useKeys = (elementRef, callbacks) => {
  const callbackRef = useRef(null);
  callbackRef.current = callbacks;

  useEffect(() => {
    const handleKeyDown = (e) => {
      callbacks[e.key] && callbacks[e.key]();
    };

    elementRef.current.addEventListener('keydown', handleKeyDown);
    return () => {
      elementRef.current.removeEventListener('keydown', handleKeyDown);
    };
  }, [elementRef, callbackRef]);
};
