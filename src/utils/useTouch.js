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

const useTouch = (elementRef, { onTouchMove, onTouchEnd, onTap }) => {
  const touchDistinguisher = getTouchDistinguisher();
  let touchStartX = 0;
  let touchStartY = 0;
  let isTouchMoved = false;

  const handleVerticalMovement = (event, displacementX, displacementY) => {
    if (Math.abs(displacementX) > Math.abs(displacementY) && event.cancelable)
      event.preventDefault();
  };

  const isPinch = (event) =>
    ('visualViewport' in window && window.visualViewport.scale > 1) ||
    touchDistinguisher.isPinch(event);

  const handleTouchStart = (event) => {
    event.stopPropagation();
    if (isPinch(event)) return;
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
  };

  const handleTouchMove = (event) => {
    event.stopPropagation();
    if (isPinch(event)) return;
    const displacementX = event.changedTouches[0].clientX - touchStartX;
    const displacementY = event.changedTouches[0].clientY - touchStartY;
    handleVerticalMovement(event, displacementX, displacementY);
    onTouchMove(displacementX, displacementY);
    isTouchMoved = true;
  };

  const handleTouchEnd = (event) => {
    event.stopPropagation();
    if (isPinch(event)) {
      onTouchEnd(0, 0);
      return;
    }
    const displacementX = event.changedTouches[0].clientX - touchStartX;
    const displacementY = event.changedTouches[0].clientY - touchStartY;
    handleVerticalMovement(event, displacementX, displacementY);
    if (isTouchMoved) onTouchEnd(displacementX, displacementY);
    else onTap();
    isTouchMoved = false; // reset isTouchMoved for next series of touch events
  };

  const events = [
    { event: 'touchstart', callback: handleTouchStart },
    { event: 'touchmove', callback: handleTouchMove },
    { event: 'touchend', callback: handleTouchEnd },
    { event: 'touchcancel', callback: handleTouchEnd }
  ];
  const eventsRef = useRef(events);

  useEffect(() => {
    const el = elementRef.current;
    const events = eventsRef.current;
    if (el)
      // use active event listeners to have event.cancelable === true, for later use to in calling event.preventDefault()
      events.forEach(({ event, callback }) =>
        el.addEventListener(event, callback, { passive: false })
      );

    return () => {
      if (el)
        events.forEach(({ event, callback }) =>
          el.removeEventListener(event, callback)
        );
    };
  }, [elementRef, eventsRef]);
};

export default useTouch;
