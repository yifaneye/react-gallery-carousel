import { useEffect, useRef } from 'react';

const useEventListener = (element, event, callback) => {
  const callbackRef = useRef(null);
  callbackRef.current = callback;

  useEffect(() => {
    const callback = callbackRef.current;
    if (element) element.addEventListener(event, callback);
    return () => {
      if (element) element.removeEventListener(event, callback);
    };
  }, [element, event, callback]);
};

export default useEventListener;
