import { useEffect } from 'react';

const useKeyboard = (elementRef) => {
  useEffect(() => {
    const handleMouseDown = () => {
      elementRef.current.setAttribute('data-is-keyboard-user', 'false');
    };

    const handleKeyDown = () => {
      elementRef.current.setAttribute('data-is-keyboard-user', 'true');
    };

    const element = elementRef.current;
    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('keydown', handleKeyDown);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, [elementRef]);
};

export default useKeyboard;
