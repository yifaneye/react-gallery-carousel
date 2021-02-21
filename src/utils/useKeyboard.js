import { useEffect } from 'react';
// import styles from '../components/Carousel/Carousel.module.css';

const useKeyboard = (elementRef) => {
  useEffect(() => {
    const element = elementRef.current;

    const handleMouseDown = () => {
      // no need to check elementRef.current here,
      // because event listener is added on element
      if (!element) return;
      element.setAttribute('data-is-not-keyboard-user', 'true');
      // cannot use classList due to classList will get changed
      // element.classList.add(styles.isNotKeyboardUser);
    };

    const handleKeyDown = () => {
      if (!element) return;
      element.setAttribute('data-is-not-keyboard-user', 'false');
      // cannot use classList due to classList will get changed
      // element.classList.remove(styles.isNotKeyboardUser);
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
