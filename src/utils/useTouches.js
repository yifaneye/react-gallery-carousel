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

const useTouches = (elementRef, swipePercentageMin, callbacks) => {
  let swipeStartX = 0;

  const applySwipe = (swipeDisplacement) => {
    const swipeDistanceMin =
      elementRef.current.clientWidth * swipePercentageMin;
    if (swipeDisplacement >= swipeDistanceMin) {
      callbacks.swipeEndRight(swipeDisplacement);
    } else if (swipeDisplacement <= -swipeDistanceMin) {
      callbacks.swipeEndLeft(swipeDisplacement);
    } else {
      callbacks.swipeEndDisqualified(swipeDisplacement);
    }
  };

  const showSwipe = (event) => {
    const swipeDisplacement = event.changedTouches[0].clientX - swipeStartX;
    callbacks.swipeMove(swipeDisplacement);
    if (event.type === 'touchend') {
      applySwipe(swipeDisplacement);
    }
  };

  const touchDistinguisher = getTouchDistinguisher();

  const handleTouchStart = (event) => {
    if (touchDistinguisher.isPinch(event)) {
      return;
    }
    swipeStartX = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    if (touchDistinguisher.isPinch(event)) {
      return;
    }
    showSwipe(event);
  };

  const handleTouchEnd = (event) => {
    if (touchDistinguisher.isPinch(event)) {
      return;
    }
    showSwipe(event);
  };

  return {
    onTouchStart: (event) => handleTouchStart(event),
    onTouchMove: (event) => handleTouchMove(event),
    onTouchEnd: (event) => handleTouchEnd(event)
  };
};

export default useTouches;
