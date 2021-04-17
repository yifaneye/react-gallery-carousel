const useNoOverScroll = (elementRef) => {
  // Prevent the default behaviour of "scroll chaining" where parent element
  // gets scrolled when the child element is over scrolled,
  // in order to prevent going to the previous or the next page.
  // This code is for Safari only, while other browsers are taken care by CSS
  return (event) => {
    if (Math.abs(event.deltaX) < Math.abs(event.deltaY)) return;
    const { scrollLeft, scrollWidth, offsetWidth } = elementRef.current;
    if (
      (scrollLeft + event.deltaX < 0 ||
        scrollLeft + event.deltaX > scrollWidth - offsetWidth) &&
      event.cancelable
    )
      event.preventDefault();
  };
};

export default useNoOverScroll;
