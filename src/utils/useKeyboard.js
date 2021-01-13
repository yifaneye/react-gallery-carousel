import { useEffect } from 'react';

const useKeyboard = (elementRef) => {
  useEffect(() => {
    const handleMouseDown = () => {
      elementRef.current.setAttribute('data-is-keyboard-user', 'false');
    };

    const handleKeyDown = () => {
      elementRef.current.setAttribute('data-is-keyboard-user', 'true');
    };

    elementRef.current.addEventListener('mousedown', handleMouseDown);
    elementRef.current.addEventListener('keydown', handleKeyDown);

    return () => {
      elementRef.current.removeEventListener('mousedown', handleMouseDown);
      elementRef.current.removeEventListener('keydown', handleKeyDown);
    };
  }, [elementRef]);
};

export default useKeyboard;
