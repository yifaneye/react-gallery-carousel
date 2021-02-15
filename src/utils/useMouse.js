const useMouse = ({ onMouseMove, onMouseUp, onTap }) => {
  let isMouseDown = false;
  let isMouseMoved = false;
  let touchDownX = 0;

  const handleMouseDown = (event) => {
    if (event.buttons > 0) isMouseDown = true;
    touchDownX = event.clientX;
  };

  const handleMouseMove = (event) => {
    if (isMouseDown && event.buttons > 0) {
      onMouseMove(event.clientX - touchDownX);
      isMouseMoved = true;
    }
  };

  const handleMouseUp = (event) => {
    if (isMouseDown) {
      if (isMouseMoved) onMouseUp(event.clientX - touchDownX);
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
