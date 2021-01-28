const useNoOverScroll = (elementRef) => {
  return (event) => {
    if (Math.abs(event.deltaX) < Math.abs(event.deltaY)) return;
    const { scrollLeft, scrollWidth, offsetWidth } = elementRef.current;
    if (
      scrollLeft + event.deltaX < 0 ||
      scrollLeft + event.deltaX > scrollWidth - offsetWidth
    )
      event.preventDefault();
  };
};

export default useNoOverScroll;
