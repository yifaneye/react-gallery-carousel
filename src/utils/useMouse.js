const useMouse = ({ onMouseMove, onMouseUp, onTap }) => {
  let isMouseDown = false;
  let isMouseMoved = false;
  let mouseDownX = 0;
  let mouseDownTime = Date.now();

  const handleMouseDown = (event) => {
    if (event.buttons > 0) isMouseDown = true;
    mouseDownX = event.clientX;
    mouseDownTime = Date.now();
  };

  const handleMouseMove = (event) => {
    if (isMouseDown && event.buttons > 0) {
      onMouseMove(event.clientX - mouseDownX);
      isMouseMoved = true;
    }
  };

  const handleMouseUp = (event) => {
    if (isMouseDown) {
      if (isMouseMoved)
        // not passing vertical movements as argument
        onMouseUp(event.clientX - mouseDownX, 0, Date.now() - mouseDownTime);
      else onTap();
    }
    isMouseDown = false; // reset isMouseDown for next series of touch events
    isMouseMoved = false; // reset isMouseMoved for next series of touch events
  };

  return {
    onMouseDown: (event) => handleMouseDown(event),
    onMouseMove: (event) => handleMouseMove(event),
    onMouseUp: (event) => handleMouseUp(event),
    onMouseLeave: (event) => handleMouseUp(event)
  };
};

export default useMouse;
