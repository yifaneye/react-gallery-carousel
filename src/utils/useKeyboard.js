import { useEffect } from 'react';

const useKeyboard = (elementRef) => {
  useEffect(() => {
    const element = elementRef.current;

    const handleMouseDown = () => {
      element.setAttribute('data-is-keyboard-user', 'false');
    };

    const handleKeyDown = () => {
      element.setAttribute('data-is-keyboard-user', 'true');
    };

    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('keydown', handleKeyDown);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, [elementRef]);
};

export default useKeyboard;
