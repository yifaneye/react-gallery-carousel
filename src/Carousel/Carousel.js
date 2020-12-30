import React, { useEffect, useRef } from 'react';
import styles from './Carousel.module.css';
import imagesStyles from '../Image/Image.module.css';
import { Image } from '../Image';
import { useKeys } from '../utils/useKeys';
import { useTimer } from '../utils/useTimer';

export const Carousel = (props) => {
  const imagesRef = useRef(null);

  // carousel settings
  const transitionSpeed = props.speed || 1500; // px/s
  const swipePercentageMin = props.threshold || 0.1; // * 100%
  const autoPlayInterval = (props.interval || 5) * 1000; // ms // convert 1sec to 1000ms

  const generateSlides = (items, { rtl, loop }) => {
    let slides = items;
    const slidesLength = slides.length;
    if (!slidesLength) {
      return [];
    }
    if (rtl) {
      slides.reverse();
    }
    if (loop) {
      slides = [slides[slidesLength - 1], ...slides, slides[0]];
    }
    return slides;
  };

  const getSlidesCurrentIndex = (slides, { rtl, loop }) => {
    const slidesLength = slides.length;
    if (slidesLength <= 1) {
      return slidesLength;
    }
    const bufferLength = loop ? 1 : 0;
    return rtl ? slidesLength - 1 - bufferLength : bufferLength;
  };

  let slides = props.images || props.children; // make children to the carousel component as a fallback value
  const slidesLength = slides.length;
  slides = generateSlides(slides, props);
  let currentSlideIndex = getSlidesCurrentIndex(slides, props);
  const slideTotalLength = slides.length;

  let swipeStartX = 0;

  const applyTransitionDuration = (swipedDisplacement, hasToUpdate) => {
    const swipedDistance = Math.abs(swipedDisplacement);
    const transitionDistance = hasToUpdate
      ? Math.abs(imagesRef.current.clientWidth - swipedDistance)
      : swipedDistance;
    let transitionDuration = transitionDistance / transitionSpeed;

    // make transitionDuration slightly smaller (faster) than autoPlayInterval
    if (props.auto && transitionDuration > autoPlayInterval) {
      transitionDuration = autoPlayInterval * 0.99;
    }

    imagesRef.current.style.transitionDuration = `${transitionDuration}s`;
    setTimeout(
      () => (imagesRef.current.style.transitionDuration = null),
      transitionDuration * 1000
    );
  };

  const applyTransition = (swipeDisplacement = 0) => {
    imagesRef.current.style.transform = `translate3d(calc(-100% * ${currentSlideIndex} + ${swipeDisplacement}px), 0px, 0px)`;
  };

  const calibrateCurrentSlideIndex = (change) => {
    if (!props.loop) return;
    if (currentSlideIndex === 1 && change < 0) {
      currentSlideIndex = slideTotalLength - 1;
    } else if (currentSlideIndex === slideTotalLength - 2 && change > 0) {
      currentSlideIndex = 0;
    }
    applyTransition(-change);
  };

  const updateCurrentImageIndex = (change, swipedDisplacement = 0) => {
    const hasToUpdate =
      change !== 0 &&
      (props.infinite ||
        (currentSlideIndex + change >= 0 &&
          currentSlideIndex + change < slidesLength));
    if (hasToUpdate) {
      // check for non-swipe updates
      if (swipedDisplacement === 0) {
        calibrateCurrentSlideIndex();
      }
      currentSlideIndex = Math.abs(
        (slideTotalLength + currentSlideIndex + change) % slideTotalLength
      );
    }

    applyTransitionDuration(swipedDisplacement, hasToUpdate);
    applyTransition();
  };

  const timer = useTimer(props.auto ? autoPlayInterval : null, () =>
    updateCurrentImageIndex(props.rtl ? -1 : +1)
  );

  const updateCarouselImageIndex = (change, swipedDisplacement = 0) => {
    timer && timer.restart();
    updateCurrentImageIndex(change, swipedDisplacement);
  };

  const pinchTouchIdentifiers = new Set(); // record all pinch touch identifiers

  const recordPinchTouchIdentifiers = (event) => {
    for (const touch of event.touches) {
      pinchTouchIdentifiers.add(touch.identifier);
    }
  };

  const isPinch = (event) => {
    return (
      (event.touches !== undefined && event.touches.length > 1) ||
      (event.scale !== undefined && event.scale !== 1)
    );
  };

  const wasPinch = (event) => {
    // only check one changedTouch because touchEnd event only has one changedTouch
    return (
      event.changedTouches &&
      pinchTouchIdentifiers.has(event.changedTouches[0].identifier)
    );
  };

  const isOrWasPinch = (event) => {
    if (isPinch(event)) {
      recordPinchTouchIdentifiers(event);
      return true;
    }
    return wasPinch(event);
  };

  const applySwipe = (swipeDisplacement) => {
    const swipeDistanceMin = imagesRef.current.clientWidth * swipePercentageMin;
    if (swipeDisplacement > swipeDistanceMin) {
      updateCarouselImageIndex(-1, swipeDisplacement);
    } else if (swipeDisplacement < -swipeDistanceMin) {
      updateCarouselImageIndex(+1, swipeDisplacement);
    } else {
      updateCarouselImageIndex(0, swipeDisplacement);
    }
  };

  const showSwipe = (event) => {
    const swipeDisplacement = event.changedTouches[0].clientX - swipeStartX;
    calibrateCurrentSlideIndex(-swipeDisplacement);
    if (event.type === 'touchend') {
      applySwipe(swipeDisplacement);
    }
  };

  useKeys(imagesRef, {
    ArrowLeft: () => updateCarouselImageIndex(-1),
    ArrowRight: () => updateCarouselImageIndex(+1)
  });

  const handleTouchStart = (event) => {
    if (isOrWasPinch(event)) {
      return;
    }
    swipeStartX = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    if (isOrWasPinch(event)) {
      return;
    }
    showSwipe(event);
  };

  const handleTouchEnd = (event) => {
    if (isOrWasPinch(event)) {
      return;
    }
    showSwipe(event);
  };

  useEffect(() => {
    applyTransition();
  }, []);

  return (
    <div className={styles.imagesWrapper} style={props.style}>
      <div
        className={styles.images}
        ref={imagesRef}
        tabIndex={0}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {!('images' in props) &&
          props.children &&
          slides.map((slide, index) => (
            <div
              key={index}
              className={
                imagesStyles.imageWrapper + ' ' + imagesStyles.userSelectAuto
              }
            >
              {slide}
            </div>
          ))}
        {'images' in props &&
          slides.map((slide, index) => (
            <Image
              key={index}
              image={slide}
              lazy={props.lazy}
              fit={props.fit}
            />
          ))}
      </div>
    </div>
  );
};
