import useTouch from './useTouch';
import useMouse from './useMouse';
import useNoDrag from './useNoDrag';

const useSwipe = (
  elementRef,
  swipePercentageMin,
  { swipeMove, swipeEndRight, swipeEndLeft, swipeEndDisqualified }
) => {
  const swipeEnd = (swipeDisplacement) => {
    const swipeDistanceMin =
      elementRef.current.clientWidth * swipePercentageMin;
    if (swipeDisplacement >= swipeDistanceMin) swipeEndRight(swipeDisplacement);
    else if (swipeDisplacement <= -swipeDistanceMin)
      swipeEndLeft(swipeDisplacement);
    else swipeEndDisqualified(swipeDisplacement);
  };

  const touchEventHandlers = useTouch({
    swipeMove: swipeMove,
    swipeEnd: swipeEnd
  });
  const mouseEventHandlers = useMouse({
    swipeMove: swipeMove,
    swipeEnd: swipeEnd
  });

  useNoDrag(elementRef); // prevent dragging on FireFox

  return {
    ...touchEventHandlers,
    ...mouseEventHandlers
  };
};

export default useSwipe;
