import useTouch from './useTouch';
import useMouse from './useMouse';
import useNoDrag from './useNoDrag';

const useSwipe = (
  elementRef,
  swipePercentageMin,
  {
    swipeMove: swipeMoveX,
    swipeMoveDown,
    swipeEndRight,
    swipeEndLeft,
    swipeEndDown,
    swipeEndDisqualified,
    click
  }
) => {
  const swipeEnd = (swipeXDisplacement, swipeYDisplacement = 0) => {
    const { clientWidth: width, clientHeight: height } = elementRef.current;
    const swipeXDistanceMin = width * swipePercentageMin;
    const swipeYDistanceMin = height * swipePercentageMin;
    if (
      swipeXDisplacement < -Math.abs(swipeYDisplacement) &&
      swipeXDisplacement <= -swipeXDistanceMin
    )
      swipeEndLeft(swipeXDisplacement);
    else if (
      swipeXDisplacement > Math.abs(swipeYDisplacement) &&
      swipeXDisplacement >= swipeXDistanceMin
    )
      swipeEndRight(swipeXDisplacement);
    else if (
      Math.abs(swipeXDisplacement) < Math.abs(swipeYDisplacement) &&
      swipeYDisplacement >= swipeYDistanceMin
    )
      swipeEndDown();
    else swipeEndDisqualified(swipeXDisplacement);
  };

  const swipeMove = (swipeXDisplacement, swipeYDisplacement = 0) => {
    if (Math.abs(swipeXDisplacement) > Math.abs(swipeYDisplacement))
      swipeMoveX(swipeXDisplacement);
    else if (Math.abs(swipeXDisplacement) < swipeYDisplacement)
      swipeMoveDown(swipeXDisplacement, swipeYDisplacement);
  };

  // have to use event listeners (active event listeners) to deal with undesired tiny vertical movements
  useTouch(elementRef, {
    swipeMove: swipeMove,
    swipeEnd: swipeEnd,
    click: click
  });

  const mouseEventHandlers = useMouse({
    swipeMove: swipeMove,
    swipeEnd: swipeEnd,
    click: click
  });

  useNoDrag(elementRef); // prevent dragging on FireFox

  return mouseEventHandlers;
};

export default useSwipe;
