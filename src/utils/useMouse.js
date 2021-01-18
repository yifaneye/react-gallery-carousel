const useMouse = ({ swipeMove, swipeEnd }) => {
  let isMouseDown = false;
  let swipeStartX = 0;

  const handleMouseDown = (event) => {
    if (event.buttons > 0) isMouseDown = true;
    swipeStartX = event.clientX;
  };

  const handleMouseMove = (event) => {
    if (isMouseDown && event.buttons > 0) {
      const swipeDisplacement = event.clientX - swipeStartX;
      swipeMove(swipeDisplacement);
    }
  };

  const handleMouseUp = (event) => {
    if (isMouseDown) {
      const swipeDisplacement = event.clientX - swipeStartX;
      swipeMove(swipeDisplacement);
      swipeEnd(swipeDisplacement);
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
