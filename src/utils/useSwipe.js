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
  let isInitialSwipeDown;

  const handleSwipeEnd = (displacementX, displacementY = 0, velocity = 0) => {
    const { clientWidth: width, clientHeight: height } = elementRef.current;
    const distanceXMin = width * swipePercentageMin;
    const distanceYMin = height * swipePercentageMin;
    const speed = Math.abs(velocity);
    if (
      !isInitialSwipeDown &&
      // displacementX <= -Math.abs(displacementY) &&
      displacementX <= -distanceXMin
    )
      onSwipeEndLeft(displacementX, speed);
    else if (
      !isInitialSwipeDown &&
      // displacementX >= Math.abs(displacementY) &&
      displacementX >= distanceXMin
    )
      onSwipeEndRight(displacementX, speed);
    else if (
      isInitialSwipeDown &&
      // Math.abs(displacementX) < displacementY &&
      displacementY >= distanceYMin
    )
      onSwipeEndDown();
    else onSwipeEndDisqualified(displacementX, speed);
    isInitialSwipeDown = undefined;
  };

  const handleSwipeMove = (displacementX, displacementY = 0) => {
    if (isInitialSwipeDown === false) onSwipeMoveX(displacementX);
    else if (isInitialSwipeDown) onSwipeMoveDown(displacementX, displacementY);
    else {
      // when isInitialSwipeDown is undefined
      if (Math.abs(displacementX) >= displacementY) isInitialSwipeDown = false;
      else if (Math.abs(displacementX) < displacementY)
        isInitialSwipeDown = true;
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
