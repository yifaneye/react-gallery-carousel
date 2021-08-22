import { useEffect } from 'react';
import useMouse from './useMouse';

const useMouseDrag = (elementRef) => {
  const handleMouseMove = (displacementX, displacementY, deltaX) => {
    const element = elementRef.current;
    if (!element) return;

    // convert drag to scroll
    // displacementX is the cumulative change, whereas deltaX is the individual change
    element.scrollTo({
      top: 0,
      left: element.scrollLeft - deltaX
    });
  };

  const handleMouseUp = (displacementX, displacementY, velocity, event) => {
    // allow a mouseup event after a tiny mouse movement (<= 2px) to propagate
    if (Math.abs(displacementX) <= 2) return;

    // prevent any other mouseup events to propagate
    event.stopPropagation();

    /* set up momentum-based dragging by giving inertia to the element which allows it
       to continue travelling in its direction and gradually slow down by friction,
       like the mouse drag version of "-webkit-overflow-scrolling: touch;" */
    const speed = Math.abs(velocity);
    // neglect dragging with small instantaneous velocity
    if (speed < 0.5) return false;

    const element = elementRef.current;
    const childElement = element && element.childNodes[0];
    const isLeftMost = element && element.scrollLeft === 0;
    const isRightMost =
      element &&
      childElement &&
      element.scrollLeft + element.clientWidth >= childElement.scrollWidth;
    // neglect dragging at the two ends
    if (isLeftMost || isRightMost) return false;

    const CONSTANT = 0.025;
    const totalTime = speed / CONSTANT;
    let initialTime;
    let previousElapsedTime;

    function step(currentTime) {
      // assign value to initialTime for the initial step (run of this function)
      if (initialTime === undefined) initialTime = currentTime;

      // calculate the change in displacement since the last time
      const elapsedTime = currentTime - initialTime;
      const intervalDiff = elapsedTime - previousElapsedTime;
      const intervalSum = elapsedTime + previousElapsedTime;
      const distance =
        speed * intervalDiff - (CONSTANT * intervalDiff * intervalSum) / 2;
      const displacement = velocity < 0 ? -distance : distance;

      // update the UI which shifts the element
      if (!isNaN(displacement)) {
        element.scrollTo({
          top: 0,
          left: element.scrollLeft - displacement
        });
      }

      // check if the elapsedTime is within the totalTime
      if (elapsedTime < totalTime) {
        // record the elapsedTime
        previousElapsedTime = elapsedTime;
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);

    return false;
  };

  useEffect(() => {
    // disable selection on the element to ensure the value of
    // CSS 'cursor' property is not the default 'text' on select on Safari
    if (elementRef.current) elementRef.current.onselectstart = () => false;
  }, [elementRef]);

  return useMouse(elementRef, {
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onTap: () => {}
  });
};

export default useMouseDrag;
