import React, { useEffect, useRef } from 'react';
import styles from './Carousel.module.css';
import imagesStyles from '../Image/Image.module.css';
import { Image } from '../Image';
import { useKeys } from '../utils/useKeys';
import { useTimer } from '../utils/useTimer';
import { useTouches } from '../utils/useTouches';
import { useSlides } from '../utils/useSlides';

export const Carousel = (props) => {
  const imagesRef = useRef(null);
  const slides = useSlides(props.images || props.children, props);
  const transitionSpeed = props.speed || 1500; // px/s
  const swipePercentageMin = props.threshold || 0.1; // * 100%
  const autoPlayInterval = (props.interval || 5) * 1000; // ms // convert 1sec to 1000ms

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
    imagesRef.current.style.transform = `translate3d(calc(-100% * ${slides.curIndex} + ${swipeDisplacement}px), 0px, 0px)`;
  };

  const calibrateIndex = (change, swipeDisplacement = 0) => {
    timer && timer.restart();
    if (swipeDisplacement) {
      change = -swipeDisplacement;
    }
    slides.calibrateIndex(change);
    applyTransition(swipeDisplacement);
  };

  const updateIndex = (change, swipedDisplacement = 0) => {
    timer && timer.restart();
    const hasToUpdate = slides.hasToUpdateIndex(change);
    if (hasToUpdate) {
      if (!swipedDisplacement) {
        calibrateIndex(change);
      }
      slides.updateIndex(change);
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
          slides.getSlides().map((slide, index) => (
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
          slides
            .getSlides()
            .map((slide, index) => (
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
