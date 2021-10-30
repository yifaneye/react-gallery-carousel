import { useEffect } from 'react';

const useWheel = (elementRef, { onWheel, onWheelEnd }) => {
  let displacementX = 0;
  let timeout;
  let previousTime = Date.now();

  const handleWheel = (event) => {
    if (event.cancelable) event.preventDefault();
    clearTimeout(timeout);
    onWheel(event.deltaX + displacementX, 0);
    displacementX -= event.deltaX;
    timeout = setTimeout(
      () => handleWheelStop(event, Date.now() - previousTime),
      40
    );
    previousTime = Date.now();
  };

  const handleWheelStop = (event, deltaTime) => {
    if (event.cancelable) event.preventDefault();
    onWheelEnd(displacementX, event.deltaX / deltaTime, 0, event);
    displacementX = 0;
    clearTimeout(timeout);
  };

  // to fix the dependency, I needed to wrapping pretty much everything in this
  // file in useCallback or useMemo, so I disable exhaustive-deps check for now
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const events = [{ event: 'wheel', callback: handleWheel }];

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

export default useWheel;
