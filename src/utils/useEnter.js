import useKeys from './useKeys';

// for keyboard navigation on non-tabbable element
const useEnter = (elementRef) => {
  const handleEnter = (event) => {
    event.currentTarget.click();
  };

  useKeys(elementRef, {
    Enter: handleEnter
  });
};

export default useEnter;
