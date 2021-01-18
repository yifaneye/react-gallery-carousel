const useMouse = (elementRef, swipePercentageMin, callbacks) => {
  let isMouseDown = false;
  let swipeStartX = 0;

  const applySwipe = (swipeDisplacement = 0) => {
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

  const handleMouseDown = (event) => {
    if (event.buttons > 0) isMouseDown = true;
    swipeStartX = event.clientX;
  };

  const handleMouseMove = (event) => {
    if (isMouseDown && event.buttons > 0) {
      const swipeDisplacement = event.clientX - swipeStartX;
      callbacks.swipeMove(swipeDisplacement);
    }
  };

  const handleMouseUp = (event) => {
    if (isMouseDown) {
      const swipeDisplacement = event.clientX - swipeStartX;
      callbacks.swipeMove(swipeDisplacement);
      applySwipe(swipeDisplacement);
    }
    isMouseDown = false;
  };

  return {
    onMouseDown: (event) => handleMouseDown(event),
    onMouseMove: (event) => handleMouseMove(event),
    onMouseUp: (event) => handleMouseUp(event),
    onMouseLeave: (event) => handleMouseUp(event)
  };
};

export default useMouse;
