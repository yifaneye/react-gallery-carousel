import { useEffect } from 'react';

const useKeys = (elementRef, callbacks) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      callbacks[e.key] && callbacks[e.key]();
    };

    const element = elementRef.current;

    element.addEventListener('keydown', handleKeyDown);
    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, [elementRef, callbacks]);
};

export default useKeys;
