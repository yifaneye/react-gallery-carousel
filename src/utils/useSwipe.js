import useTouch from './useTouch';
import useMouse from './useMouse';
import useNoDrag from './useNoDrag';

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

  useNoDrag(elementRef); // prevent dragging on FireFox

  return {
    ...touchEventHandlers,
    ...mouseEventHandlers
  };
};

export default useSwipe;
