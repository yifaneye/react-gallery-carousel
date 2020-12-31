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

  const getSlides = (items, { rtl, loop }) => {
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

  const getIndices = (slides, { rtl, loop }) => {
    const slidesLength = slides.length;
    if (slidesLength <= 1) {
      return 0;
    }
    const bufferLength = loop ? 1 : 0;
    const headIndex = rtl ? slidesLength - 1 - bufferLength : bufferLength;
    const tailIndex = rtl ? bufferLength : slidesLength - 1 - bufferLength;
    return {
      curIndex: headIndex,
      minIndex: headIndex < tailIndex ? headIndex : tailIndex,
      maxIndex: headIndex < tailIndex ? tailIndex : headIndex
    };
  };

  const hasToUpdateIndex = (change) => {
    return (
      change !== 0 &&
      (props.infinite ||
        (currentIndex + change >= minIndex &&
          currentIndex + change <= maxIndex))
    );
  };

  const roundIndex = (change) => {
    if (!props.loop) return;
    if (currentIndex === minIndex && change < 0) {
      currentIndex = maxIndex + 1;
    } else if (currentIndex === maxIndex && change > 0) {
      currentIndex = minIndex - 1;
    }
  };

  let slides = props.images || props.children; // make children to the carousel component as a fallback value
  slides = getSlides(slides, props);
  const { curIndex, minIndex, maxIndex } = getIndices(slides, props);
  let currentIndex = curIndex;
  const slidesLength = slides.length;

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
    imagesRef.current.style.transform = `translate3d(calc(-100% * ${currentIndex} + ${swipeDisplacement}px), 0px, 0px)`;
  };

  const calibrateIndex = (change, swipeDisplacement = 0) => {
    timer && timer.restart();
    if (swipeDisplacement) {
      change = -swipeDisplacement;
    }
    roundIndex(change);
    applyTransition(swipeDisplacement);
  };

  const updateIndex = (change, swipedDisplacement = 0) => {
    timer && timer.restart();
    const hasToUpdate = hasToUpdateIndex(change);
    if (hasToUpdate) {
      if (!swipedDisplacement) {
        calibrateIndex(change);
      }
      currentIndex = Math.abs(
        (slidesLength + currentIndex + change) % slidesLength
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
