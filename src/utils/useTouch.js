import { useEffect } from 'react';

const getTouchDistinguisher = () => {
  const pinchTouchIdentifiers = new Set(); // record all pinch touch identifiers

  function _recordPinchTouchIdentifiers(event) {
    for (const touch of event.touches) {
      pinchTouchIdentifiers.add(touch.identifier);
    }
  }

  function _isPinch(event) {
    return event.touches !== undefined && event.touches.length > 1;
  }

  function _wasPinch(event) {
    // check for the one finger that was part of a multi-finger pinch zoom
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
  let isTouchStarted = false;
  let isTouchMoved = false;
  let previousX = 0;
  let previousTime = Date.now();
  let instantaneousVelocity = 0;

  const handleVerticalMovement = (event, displacementX, displacementY) => {
    if (Math.abs(displacementX) > Math.abs(displacementY) && event.cancelable)
      event.preventDefault();
  };

  const shouldOmitEvent = (event, displacementX = 0) => {
    if (
      // touchDistinguisher only works for iOS from my investigation
      navigator.platform.match(/iPhone|iPad|iPod|MacIntel/) &&
      touchDistinguisher.isPinch(event)
    )
      return true;

    // window.visualViewport is not yet supported on IE
    if (!('visualViewport' in window)) return false;

    const { scale, offsetLeft, width } = window.visualViewport;
    if (scale <= 1.1) return false;
    // pan right at or beyond the left edge
    if (offsetLeft <= 0 && displacementX > 0) return false;
    // pan left at or beyond the right edge
    // noinspection RedundantIfStatementJS
    if (offsetLeft + width >= width * scale && displacementX < 0) return false;
    return true;
  };

  const handleTouchStart = (event) => {
    event.stopPropagation();
    isTouchStarted = true;
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
    previousX = touchStartX;
    previousTime = Date.now();
  };

  const handleTouchMove = (event) => {
    event.stopPropagation();
    if (!isTouchStarted) return;
    const displacementX = event.changedTouches[0].clientX - touchStartX;
    if (shouldOmitEvent(event, displacementX)) return;
    const displacementY = event.changedTouches[0].clientY - touchStartY;
    handleVerticalMovement(event, displacementX, displacementY);
    onTouchMove(displacementX, displacementY);
    isTouchMoved = true;
    instantaneousVelocity =
      (event.changedTouches[0].clientX - previousX) /
      (Date.now() - previousTime);
    previousX = event.changedTouches[0].clientX;
    previousTime = Date.now();
  };

  const handleTouchEnd = (event) => {
    // prevent the event from being recognized additionally as a mouse event on simulated mobile devices (e.g. Toggle Device Toolbar on Chrome).
    event.preventDefault();
    event.stopPropagation();
    if (!isTouchStarted) return;
    const displacementX = event.changedTouches[0].clientX - touchStartX;
    if (shouldOmitEvent(event, displacementX)) {
      onTouchEnd(0, 0, 0);
      return;
    }
    const displacementY = event.changedTouches[0].clientY - touchStartY;
    handleVerticalMovement(event, displacementX, displacementY);
    if (isTouchMoved)
      // can not calculate velocity here since event.clientX === previousX;
      onTouchEnd(displacementX, displacementY, instantaneousVelocity);
    else onTap();
    isTouchStarted = false; // reset isTouchStarted for next series of touch events
    isTouchMoved = false; // reset isTouchMoved for next series of touch events
  };

  // to fix the dependency, I needed to wrapping pretty much everything in this
  // file in useCallback or useMemo, so I disable exhaustive-deps check for now
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const events = [
    { event: 'touchstart', callback: handleTouchStart },
    { event: 'touchmove', callback: handleTouchMove },
    { event: 'touchend', callback: handleTouchEnd },
    { event: 'touchcancel', callback: handleTouchEnd }
  ];

  useEffect(() => {
    const el = elementRef.current;
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
  }, [elementRef, events]);
};

export default useTouch;
