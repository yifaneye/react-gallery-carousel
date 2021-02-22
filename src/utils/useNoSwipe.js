import { useEffect } from 'react';

const useNoSwipe = (elementRef) => {
  useEffect(() => {
    const el = elementRef.current;
    const handleSwipe = (e) => e.stopPropagation();

    if (el) {
      el.addEventListener('mousedown', handleSwipe);
      el.addEventListener('touchstart', handleSwipe, { passive: true });
    }

    return () => {
      if (!el) {
        el.removeEventListener('mousedown', handleSwipe);
        el.removeEventListener('touchstart', handleSwipe, { passive: true });
      }
    };
  }, [elementRef]);
};

export default useNoSwipe;
