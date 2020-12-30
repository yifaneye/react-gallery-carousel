import React, { useEffect, useRef } from 'react';
import styles from './Carousel.module.css';
import imagesStyles from '../Image/Image.module.css';
import { Image } from '../Image';
import { useKeys } from '../utils/useKeys';
import { useTimer } from '../utils/useTimer';
import { useTouches } from '../utils/useTouches';

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

  const getSlidesIndices = (slides, { rtl, loop }) => {
    const slidesLength = slides.length;
    if (slidesLength <= 1) {
      return 0;
    }
    const bufferLength = loop ? 1 : 0;
    const slidesHeadIndex = rtl
      ? slidesLength - 1 - bufferLength
      : bufferLength;
    const slidesTailIndex = rtl
      ? bufferLength
      : slidesLength - 1 - bufferLength;
    return {
      slidesCurrentIndex: slidesHeadIndex,
      slidesMinIndex:
        slidesHeadIndex < slidesTailIndex ? slidesHeadIndex : slidesTailIndex,
      slidesMaxIndex:
        slidesHeadIndex < slidesTailIndex ? slidesTailIndex : slidesHeadIndex
    };
  };

  let slides = props.images || props.children; // make children to the carousel component as a fallback value
  slides = generateSlides(slides, props);
  const {
    slidesCurrentIndex,
    slidesMinIndex,
    slidesMaxIndex
  } = getSlidesIndices(slides, props);
  let currentSlideIndex = slidesCurrentIndex;
  const slideTotalLength = slides.length;

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
    if (currentSlideIndex === slidesMinIndex && change < 0) {
      currentSlideIndex = slidesMaxIndex + 1;
    } else if (currentSlideIndex === slidesMaxIndex && change > 0) {
      currentSlideIndex = slidesMinIndex - 1;
    }
    applyTransition(-change);
  };

  const updateCurrentImageIndex = (change, swipedDisplacement = 0) => {
    const hasToUpdate =
      change !== 0 &&
      (props.infinite ||
        (currentSlideIndex + change >= slidesMinIndex &&
          currentSlideIndex + change <= slidesMaxIndex));
    if (hasToUpdate) {
      // check for non-swipe updates
      if (swipedDisplacement === 0) {
        calibrateCurrentSlideIndex(change);
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

  useKeys(imagesRef, {
    ArrowLeft: () => updateCarouselImageIndex(-1),
    ArrowRight: () => updateCarouselImageIndex(+1)
  });

  useTouches(imagesRef, swipePercentageMin, {
    swipeMove: (swipeDisplacement) =>
      calibrateCurrentSlideIndex(-swipeDisplacement),
    swipeEndRight: (swipeDisplacement) =>
      updateCarouselImageIndex(-1, swipeDisplacement),
    swipeEndLeft: (swipeDisplacement) =>
      updateCarouselImageIndex(+1, swipeDisplacement),
    swipeEndDisqualified: (swipeDisplacement) =>
      updateCarouselImageIndex(0, swipeDisplacement)
  });

  useEffect(() => {
    applyTransition();
  }, []);

  return (
    <div className={styles.imagesWrapper} style={props.style}>
      <div className={styles.images} ref={imagesRef} tabIndex={0}>
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
