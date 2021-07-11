const useMouse = (elementRef, { onMouseMove, onMouseUp, onTap }) => {
  let isMouseDown = false;
  let isMouseMoved = false;
  let mouseDownX = 0;
  let previousX = 0;
  let previousTime = Date.now();
  let instantaneousVelocity = 0;

  const handleMouseDown = (event) => {
    if (elementRef.current) elementRef.current.classList.add('isGrabbing');
    if (elementRef.current) elementRef.current.classList.add('isInMotion');
    if (event.buttons > 0) isMouseDown = true;
    mouseDownX = event.clientX;
    previousX = event.clientX;
    previousTime = Date.now();
  };

  const handleMouseMove = (event) => {
    if (isMouseDown && event.buttons > 0) {
      onMouseMove(event.clientX - mouseDownX, 0, event.clientX - previousX);
      isMouseMoved = true;
      instantaneousVelocity =
        (event.clientX - previousX) / (Date.now() - previousTime);
      previousX = event.clientX;
      previousTime = Date.now();
    }
  };

  const handleMouseUp = (event) => {
    if (elementRef.current) elementRef.current.classList.remove('isGrabbing');
    if (isMouseDown) {
      if (isMouseMoved) {
        // can not calculate velocity here since event.clientX === previousX;
        // ignore vertical displacement by not passing it as argument
        onMouseUp(event.clientX - mouseDownX, 0, instantaneousVelocity, event);
      } else onTap();
    }
    isMouseDown = false; // reset isMouseDown for next series of mouse events
    isMouseMoved = false; // reset isMouseMoved for next series of mouse events
  };

  return {
    onMouseDown: (event) => handleMouseDown(event),
    onMouseMove: (event) => handleMouseMove(event),
    onMouseUpCapture: (event) => handleMouseUp(event),
    onMouseLeave: (event) => handleMouseUp(event)
  };
};

export default useMouse;
