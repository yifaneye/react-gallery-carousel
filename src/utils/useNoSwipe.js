import { useEffect } from 'react';

const useNoSwipe = (elementRef) => {
  useEffect(() => {
    const element = elementRef.current;
    const handleSwipe = (e) => e.stopPropagation();

    if (element) {
      element.addEventListener('mousedown', handleSwipe);
      element.addEventListener('mousemove', handleSwipe);
      element.addEventListener('mouseup', handleSwipe);
      element.addEventListener('touchstart', handleSwipe);
      element.addEventListener('touchmove', handleSwipe);
      element.addEventListener('touchend', handleSwipe);
      element.addEventListener('touchcancel', handleSwipe);
    }
    return () => {
      if (element) {
        element.removeEventListener('mousedown', handleSwipe);
        element.removeEventListener('mousemove', handleSwipe);
        element.removeEventListener('mouseup', handleSwipe);
        element.removeEventListener('touchstart', handleSwipe);
        element.removeEventListener('touchmove', handleSwipe);
        element.removeEventListener('touchend', handleSwipe);
        element.removeEventListener('touchcancel', handleSwipe);
      }
    };
  }, [elementRef]);
};

export default useNoSwipe;
