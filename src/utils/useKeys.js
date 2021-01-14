import { useCallback, useEffect } from 'react';

const useKeys = (elementRef, callbacks) => {
  const handleKeyDown = useCallback(
    (e) => callbacks[e.key] && callbacks[e.key](),
    [callbacks]
  );

  useEffect(() => {
    const element = elementRef.current;

    element.addEventListener('keydown', handleKeyDown);
    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, [elementRef, handleKeyDown]);
};

export default useKeys;
