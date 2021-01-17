import useTouch from './useTouch';
import useMouse from './useMouse';

const useSwipe = (elementRef, swipePercentageMin, callbacks) => {
  const touchEventHandlers = useTouch(
    elementRef,
    swipePercentageMin,
    callbacks
  );
  const mouseEventHandlers = useMouse(
    elementRef,
    swipePercentageMin,
    callbacks
  );

  return {
    ...touchEventHandlers,
    ...mouseEventHandlers
  };
};

export default useSwipe;
