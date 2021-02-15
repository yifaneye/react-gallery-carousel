import useTouch from './useTouch';
import useMouse from './useMouse';
import useNoDrag from './useNoDrag';

const useSwipe = (
  elementRef,
  swipePercentageMin,
  {
    onSwipeMoveX,
    onSwipeMoveDown,
    onSwipeEndRight,
    onSwipeEndLeft,
    onSwipeEndDisqualified,
    onSwipeEndDown,
    onTap
  }
) => {
  const handleSwipeEnd = (displacementX, displacementY = 0) => {
    const { clientWidth: width, clientHeight: height } = elementRef.current;
    const swipeXDistanceMin = width * swipePercentageMin;
    const swipeYDistanceMin = height * swipePercentageMin;
    if (
      displacementX <= -Math.abs(displacementY) &&
      displacementX <= -swipeXDistanceMin
    )
      onSwipeEndLeft(displacementX);
    else if (
      displacementX >= Math.abs(displacementY) &&
      displacementX >= swipeXDistanceMin
    )
      onSwipeEndRight(displacementX);
    else if (
      Math.abs(displacementX) < Math.abs(displacementY) &&
      displacementY >= swipeYDistanceMin
    )
      onSwipeEndDown();
    else onSwipeEndDisqualified(displacementX);
  };

  const handleSwipeMove = (displacementX, displacementY = 0) => {
    if (Math.abs(displacementX) >= Math.abs(displacementY))
      onSwipeMoveX(displacementX);
    else if (Math.abs(displacementX) < displacementY)
      onSwipeMoveDown(displacementX, displacementY);
  };

  // have to use event listeners (active event listeners) to deal with undesired tiny vertical movements
  useTouch(elementRef, {
    onTouchMove: handleSwipeMove,
    onTouchEnd: handleSwipeEnd,
    onTap: onTap
  });

  const mouseEventHandlers = useMouse({
    onMouseMove: handleSwipeMove,
    onMouseUp: handleSwipeEnd,
    onTap: onTap
  });

  useNoDrag(elementRef); // prevent dragging on FireFox

  return mouseEventHandlers;
};

export default useSwipe;
