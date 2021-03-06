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
    return false;
  };

  return useMouse(elementRef, {
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onTap: () => {}
  });
};

export default useMouseDrag;
