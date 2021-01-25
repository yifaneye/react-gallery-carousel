import { useEffect, useRef } from 'react';

const getTouchDistinguisher = () => {
  const pinchTouchIdentifiers = new Set(); // record all pinch touch identifiers

  function _recordPinchTouchIdentifiers(event) {
    for (const touch of event.touches) {
      pinchTouchIdentifiers.add(touch.identifier);
    }
  }

  function _isPinch(event) {
    return (
      (event.touches !== undefined && event.touches.length > 1) ||
      (event.scale !== undefined && event.scale !== 1)
    );
  }

  function _wasPinch(event) {
    // only check one changedTouch because touchEnd event that would be recognized as swiping only has one changedTouch
    return (
      event.changedTouches &&
      pinchTouchIdentifiers.has(event.changedTouches[0].identifier)
    );
  }

  function isPinch(event) {
    if (_isPinch(event)) {
      _recordPinchTouchIdentifiers(event);
      return true;
    }
    return _wasPinch(event);
  }

  return { isPinch };
};

const useTouch = (elementRef, { swipeMove, swipeEnd }) => {
  const touchDistinguisher = getTouchDistinguisher();
  let swipeStartX = 0;
  let swipeStartY = 0;
  let isTouchMoved = false;

  const handleVerticalMovement = (event) => {
    if (
      Math.abs(event.changedTouches[0].clientX - swipeStartX) >
      Math.abs(event.changedTouches[0].clientY - swipeStartY)
    ) {
      if (event.cancelable) event.preventDefault();
    }
  };

  const handleTouchStart = (event) => {
    if (touchDistinguisher.isPinch(event)) return;
    swipeStartX = event.touches[0].clientX;
    swipeStartY = event.touches[0].clientY;
  };

  const handleTouchMove = (event) => {
    if (touchDistinguisher.isPinch(event)) return;
    handleVerticalMovement(event);
    const swipeDisplacement = event.changedTouches[0].clientX - swipeStartX;
    isTouchMoved = true;
    swipeMove(swipeDisplacement);
  };

  const handleTouchEnd = (event) => {
    if (touchDistinguisher.isPinch(event)) return;
    handleVerticalMovement(event);
    const swipeDisplacement = event.changedTouches[0].clientX - swipeStartX;
    if (isTouchMoved) swipeEnd(swipeDisplacement);
    isTouchMoved = false; // reset isTouchMoved for next series of touch events
  };

  const touchStartCallback = useRef(null);
  touchStartCallback.current = handleTouchStart;

  const touchMoveCallback = useRef(null);
  touchMoveCallback.current = handleTouchMove;

  const touchEndCallback = useRef(null);
  touchEndCallback.current = handleTouchEnd;

  useEffect(() => {
    const el = elementRef.current;
    // use active event listeners to have event.cancelable === true, for later use to in calling event.preventDefault()
    if (el) {
      el.addEventListener('touchstart', touchStartCallback.current, {
        passive: false
      });
      el.addEventListener('touchmove', touchMoveCallback.current, {
        passive: false
      });
      el.addEventListener('touchend', touchEndCallback.current, {
        passive: false
      });
    }

    return () => {
      if (el) {
        el.removeEventListener('touchstart', touchStartCallback.current);
        el.removeEventListener('touchmove', touchMoveCallback.current);
        el.removeEventListener('touchend', touchEndCallback.current);
      }
    };
  }, [elementRef, touchStartCallback, touchMoveCallback, touchEndCallback]);
};

export default useTouch;
