import useTouch from './useTouch';
import useMouse from './useMouse';
import useNoDrag from './useNoDrag';

const useSwipe = (
  elementRef,
  swipePercentageMin,
  {
    onSwipeMoveX,
    onSwipeMoveY,
    onSwipeEndRight,
    onSwipeEndLeft,
    onSwipeEndDisqualified,
    onSwipeEndDown,
    onTap
  }
) => {
  let isInitialSwipeVertical;

  const handleSwipeEnd = (displacementX, displacementY = 0, velocity = 0) => {
    const { clientWidth: width, clientHeight: height } = elementRef.current;
    const distanceXMin = width * swipePercentageMin;
    const distanceYMin = height * swipePercentageMin;
    const speed = Math.abs(velocity);
    if (
      !isInitialSwipeVertical &&
      // displacementX <= -Math.abs(displacementY) &&
      displacementX <= -distanceXMin
    )
      onSwipeEndLeft(displacementX, speed);
    else if (
      !isInitialSwipeVertical &&
      // displacementX >= Math.abs(displacementY) &&
      displacementX >= distanceXMin
    )
      onSwipeEndRight(displacementX, speed);
    else if (
      isInitialSwipeVertical &&
      // Math.abs(displacementX) < displacementY &&
      displacementY >= distanceYMin
    )
      onSwipeEndDown();
    else onSwipeEndDisqualified(displacementX, speed);
    isInitialSwipeVertical = undefined;
  };

  const handleSwipeMove = (displacementX, displacementY = 0) => {
    if (isInitialSwipeVertical === false) onSwipeMoveX(displacementX);
    else if (isInitialSwipeVertical) onSwipeMoveY(displacementX, displacementY);
    else {
      // when isInitialVerticalSwipe is undefined
      isInitialSwipeVertical =
        displacementY !== 0 &&
        Math.abs(displacementX) < Math.abs(displacementY);
      handleSwipeMove(displacementX, displacementY);
    }
  };

  // have to use event listeners (active event listeners) to deal with undesired tiny vertical movements
  useTouch(elementRef, {
    onTouchMove: handleSwipeMove,
    onTouchEnd: handleSwipeEnd,
    onTap: onTap
  });

  const mouseEventHandlers = useMouse(elementRef, {
    onMouseMove: handleSwipeMove,
    onMouseUp: handleSwipeEnd,
    onTap: onTap
  });

  useNoDrag(elementRef); // prevent dragging on FireFox

  return mouseEventHandlers;
};

export default useSwipe;
