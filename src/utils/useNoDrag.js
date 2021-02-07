import { useEffect } from 'react';

const useNoDrag = (elementRef) => {
  useEffect(() => {
    const element = elementRef.current;
    const handleDrag = (e) => e.preventDefault();

    if (element) element.addEventListener('dragstart', handleDrag);

    return () => {
      if (element) element.removeEventListener('dragstart', handleDrag);
    };
  }, [elementRef]);
};

export default useNoDrag;
