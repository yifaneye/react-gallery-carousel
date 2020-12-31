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

  const hasToUpdateSlides = (change) => {
    return (
      change !== 0 &&
      (props.infinite ||
        (currentSlideIndex + change >= slidesMinIndex &&
          currentSlideIndex + change <= slidesMaxIndex))
    );
  };

  let slides = props.images || props.children; // make children to the carousel component as a fallback value
  slides = generateSlides(slides, props);
  const {
    slidesCurrentIndex,
    slidesMinIndex,
    slidesMaxIndex
  } = getSlidesIndices(slides, props);
  let currentSlideIndex = slidesCurrentIndex;
  const slidesTotalLength = slides.length;

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

  const calibrateIndex = (change, swipeDisplacement = 0) => {
    timer && timer.restart();
    if (swipeDisplacement) {
      change = -swipeDisplacement;
    }
    if (props.loop) {
      if (currentSlideIndex === slidesMinIndex && change < 0) {
        currentSlideIndex = slidesMaxIndex + 1;
      } else if (currentSlideIndex === slidesMaxIndex && change > 0) {
        currentSlideIndex = slidesMinIndex - 1;
      }
    }
    applyTransition(swipeDisplacement);
  };

  const updateIndex = (change, swipedDisplacement = 0) => {
    timer && timer.restart();
    const hasToUpdate = hasToUpdateSlides(change);
    if (hasToUpdate) {
      if (!swipedDisplacement) {
        calibrateIndex(change);
      }
      currentSlideIndex = Math.abs(
        (slidesTotalLength + currentSlideIndex + change) % slidesTotalLength
      );
    }

    applyTransitionDuration(swipedDisplacement, hasToUpdate);
    applyTransition();
  };

  const timer = useTimer(props.auto ? autoPlayInterval : null, () =>
    updateIndex(props.rtl ? -1 : +1)
  );

  useKeys(imagesRef, {
    ArrowLeft: () => updateIndex(-1),
    ArrowRight: () => updateIndex(+1)
  });

  useTouches(imagesRef, swipePercentageMin, {
    swipeMove: (displacement) => calibrateIndex(0, displacement),
    swipeEndRight: (displacement) => updateIndex(-1, displacement),
    swipeEndLeft: (displacement) => updateIndex(+1, displacement),
    swipeEndDisqualified: (displacement) => updateIndex(0, displacement)
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
