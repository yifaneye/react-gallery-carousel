import { useCallback, useEffect } from 'react';
import useEventListener from './useEventListener';
import useMediaQuery from './useMediaQuery';
import isSSR from './isSSR';

const useAnchor = (elementRef, isMaximized) => {
  const element = elementRef && elementRef.current;
  const container = element && element.parentNode.parentNode;

  // the word 'was' is used to denote the condition before React has updated the DOM,
  // that is in contrast with the condition after React has updated the DOM in useEffect().
  const wasInitialRender = !(element && container);
  const wasLeftMost = element && element.offsetLeft <= 0;
  const wasRightMost =
    element &&
    container &&
    element.offsetLeft + element.clientWidth >= container.clientWidth;

  // get reduced motion setting for determining the need to smooth scrolling for later
  const isReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  // center the element in the container without smoothness
  const centerElement = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;
    const container = element.parentNode.parentNode;

    // cannot use element.scrollIntoView(element, { behavior: 'smooth', block: 'nearest', inline: 'center' });
    // because it will also cause unwanted vertical movement when the element is not vertically in the viewport
    // (e.g. the element is somewhere down the page)
    container.scrollTo({
      top: 0,
      left:
        element.offsetLeft - container.clientWidth / 2 + element.clientWidth / 2
    });
  }, [elementRef]);

  // center the element in the container with smoothness under certain conditions
  const centerElementSmoothly = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;
    const container = element.parentNode.parentNode;

    const isLeftMost = element && element.offsetLeft === 0;
    const isRightMost =
      element &&
      container &&
      element.offsetLeft + element.clientWidth >= container.clientWidth;

    // cannot use CSS scroll-behavior: smooth; due to the necessity of dynamically determining the need to smooth scrolling;
    // the need to smooth scrolling is determined dynamically because:
    // 1. smooth scrolling for the initial render with the current index not on the left-most thumbnail will traverse intermediate thumbnails, thus it will download unnecessary thumbnails;
    // 2. smooth scrolling for moving between the left-most thumbnail and the right-most thumbnail will traverse intermediate slides (essentially all the thumbnails), thus it will download unnecessary thumbnails;
    // 3. smooth scrolling should not be applied for users with reduce motion setting turned on
    const options =
      wasInitialRender ||
      (wasLeftMost && isRightMost) ||
      (wasRightMost && isLeftMost) ||
      isReducedMotion
        ? {}
        : { behavior: 'smooth' };

    container.scrollTo({
      top: 0,
      left:
        element.offsetLeft -
        container.clientWidth / 2 +
        element.clientWidth / 2,
      ...options
    });
    // smooth scrolling on Element.scrollTo(), currently does not work on Safari and IE, unlike Window.scrollTo();
    // in the future, a polyfill is therefore needed here for smooth scrolling to work across browsers
  }, [
    elementRef,
    wasInitialRender,
    wasLeftMost,
    wasRightMost,
    isReducedMotion
  ]);

  // center the current element without smoothness on init, on maximize and on minimize
  useEffect(() => centerElement(), [centerElement, isMaximized]);

  // center the current element with smoothness on index update
  useEffect(() => centerElementSmoothly());

  // center the current element on click
  useEventListener(elementRef.current, 'click', centerElement);

  // center the current element on resize (including orientationchange)
  useEventListener(isSSR ? undefined : window, 'resize', centerElement);
};

export default useAnchor;
