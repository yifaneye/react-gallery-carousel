import { useEffect, useRef } from 'react';

const useEventListener = (element, eventName, callback) => {
  const callbackRef = useRef(null);
  callbackRef.current = callback;

  useEffect(() => {
    const callback = callbackRef.current;
    window.addEventListener(eventName, callback);
    return () => {
      window.removeEventListener(eventName, callback);
    };
  }, [element, eventName, callback]);
};

export default useEventListener;
