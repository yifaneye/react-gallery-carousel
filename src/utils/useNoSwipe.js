import { useEffect } from 'react';

const useNoSwipe = (elementRef) => {
  useEffect(() => {
    const el = elementRef.current;
    const handleSwipe = (e) => e.stopPropagation();

    if (el) {
      el.addEventListener('mousedown', handleSwipe);
      el.addEventListener('mousemove', handleSwipe);
      el.addEventListener('mouseup', handleSwipe);
      el.addEventListener('touchstart', handleSwipe, { passive: true });
      el.addEventListener('touchmove', handleSwipe, { passive: true });
      el.addEventListener('touchend', handleSwipe, { passive: true });
      el.addEventListener('touchcancel', handleSwipe, { passive: true });
    }

    return () => {
      if (!el) {
        el.removeEventListener('mousedown', handleSwipe);
        el.removeEventListener('mousemove', handleSwipe);
        el.removeEventListener('mouseup', handleSwipe);
        el.removeEventListener('touchstart', handleSwipe, { passive: true });
        el.removeEventListener('touchmove', handleSwipe, { passive: true });
        el.removeEventListener('touchend', handleSwipe, { passive: true });
        el.removeEventListener('touchcancel', handleSwipe, { passive: true });
      }
    };
  }, [elementRef]);
};

export default useNoSwipe;
