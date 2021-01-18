import { useEffect } from 'react';

const useNoDrag = (elementRef) => {
  useEffect(() => {
    const element = elementRef.current;
    const handleDrag = (e) => e.preventDefault();

    element.addEventListener('dragstart', handleDrag);
    return () => {
      element.removeEventListener('dragstart', handleDrag);
    };
  }, [elementRef]);
};

export default useNoDrag;
