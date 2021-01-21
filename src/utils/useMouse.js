const useMouse = ({ swipeMove, swipeEnd }) => {
  let isMouseDown = false;
  let isMouseMoved = false;
  let swipeStartX = 0;

  const handleMouseDown = (event) => {
    if (event.buttons > 0) isMouseDown = true;
    swipeStartX = event.clientX;
  };

  const handleMouseMove = (event) => {
    if (isMouseDown && event.buttons > 0) {
      const swipeDisplacement = event.clientX - swipeStartX;
      swipeMove(swipeDisplacement);
      isMouseMoved = true;
    }
  };

  const handleMouseUp = (event) => {
    if (isMouseDown && isMouseMoved) {
      const swipeDisplacement = event.clientX - swipeStartX;
      swipeEnd(swipeDisplacement);
    }
    isMouseDown = false; // reset isMouseMoved for next series of touch events
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
