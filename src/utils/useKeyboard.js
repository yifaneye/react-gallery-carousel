import { useEffect } from 'react';

const useKeyboard = (elementRef) => {
  useEffect(() => {
    const element = elementRef.current;

    const handleMouseDown = () => {
      if (!element) return;
      element.setAttribute('data-is-keyboard-user', 'false');
    };

    const handleKeyDown = () => {
      if (!element) return;
      element.setAttribute('data-is-keyboard-user', 'true');
    };

    if (element) {
      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousedown', handleMouseDown);
        element.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [elementRef]);
};

export default useKeyboard;
