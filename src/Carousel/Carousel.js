import React, { useCallback, useEffect, useRef } from 'react';
import styles from './Carousel.module.css';
import imagesStyles from '../Image/Image.module.css';
import { Image } from '../Image';

export const Carousel = (props) => {
  const imagesRef = useRef(null);
  const timerRef = useRef(-1);

  // carousel settings
  const transitionSpeed = props.speed || 1500; // px/s
  const swipePercentageMin = props.threshold || 0.1; // * 100%
  const autoPlayInterval = props.interval || 5; // s

  const images = props.images || props.children; // make children to the carousel component as a fallback value
  const imagesLength = images.length;
  let imagesTotalLength = imagesLength;
  let currentImageIndex = props.rtl ? imagesTotalLength - 1 : 0;
  if (props.loop) {
    imagesTotalLength = imagesLength + 2; // add 1 image each to head and tail
    currentImageIndex = props.rtl ? imagesTotalLength - 2 : 1; // choose between the second last and the second
  }

  let swipeStartX = 0;

  const updateCurrentImageIndex = (change, swipedDisplacement = 0) => {
    const hasToUpdate =
      change !== 0 &&
      (props.infinite ||
        (currentImageIndex + change >= 0 &&
          currentImageIndex + change < imagesLength));
    if (hasToUpdate) {
      // check for non-swipe updates
      if (props.loop && swipedDisplacement === 0) {
        if (change < 0 && currentImageIndex === 1) {
          currentImageIndex = imagesTotalLength - 1;
        } else if (change > 0 && currentImageIndex === imagesTotalLength - 2) {
          currentImageIndex = 0;
        }
        imagesRef.current.style.transform = `translate3d(calc(-100% * ${currentImageIndex}), 0px, 0px)`;
      }
      currentImageIndex = Math.abs(
        (imagesTotalLength + currentImageIndex + change) % imagesTotalLength
      );
    }

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
    imagesRef.current.style.transform = `translate3d(calc(-100% * ${currentImageIndex}), 0px, 0px)`;
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
      updateCurrentImageIndex(-1, swipeDisplacement);
    } else if (swipeDisplacement < -swipeDistanceMin) {
      updateCurrentImageIndex(+1, swipeDisplacement);
    } else {
      updateCurrentImageIndex(0, swipeDisplacement);
    }
  };

  const showSwipe = (event) => {
    const swipeDisplacement = event.changedTouches[0].clientX - swipeStartX;
    if (props.loop) {
      if (swipeDisplacement > 0 && currentImageIndex === 1) {
        currentImageIndex = imagesTotalLength - 1;
      } else if (
        swipeDisplacement < 0 &&
        currentImageIndex === imagesTotalLength - 2
      ) {
        currentImageIndex = 0;
      }
    }
    imagesRef.current.style.transform = `translate3d(calc(-100% * ${currentImageIndex} + ${swipeDisplacement}px), 0px, 0px)`;
    if (event.type === 'touchend') {
      applySwipe(swipeDisplacement);
    }
  };

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'ArrowLeft') {
      updateCurrentImageIndex(-1);
    } else if (event.key === 'ArrowRight') {
      updateCurrentImageIndex(+1);
    }
  }, []);

  const handleTouchStart = useCallback((event) => {
    if (isOrWasPinch(event)) {
      console.log('🤏 2222222222 pinch zoom start');
      return;
    }
    console.info('👆 touch start');
    swipeStartX = event.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((event) => {
    if (isOrWasPinch(event)) {
      console.log('🤏 2222222222 pinch zoom move');
      return;
    }
    console.info('👆 touch move');
    showSwipe(event);
  }, []);

  const handleTouchEnd = useCallback((event) => {
    if (isOrWasPinch(event)) {
      console.log('🤏 2222222222 pinch zoom end');
      return;
    }
    showSwipe(event);
  }, []);

  useEffect(() => {
    document.body.addEventListener('touchstart', () => {});
    if (props.auto) {
      timerRef.current = setInterval(() => {
        updateCurrentImageIndex(props.rtl ? -1 : +1);
      }, autoPlayInterval * 1000);
    }
    imagesRef.current.style.transform = `translate3d(calc(-100% * ${currentImageIndex}), 0px, 0px)`;

    return () => {
      if (timerRef.current !== -1) {
        clearInterval(timerRef.current);
      }
      document.body.removeEventListener('touchstart', () => {});
    };
  }, []);

  return (
    <div className={styles.imagesWrapper} style={props.style}>
      <div
        className={styles.images}
        ref={imagesRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {!('images' in props) &&
          props.children &&
          props.children.map((slide, index) => (
            <div
              key={index}
              className={
                imagesStyles.imageWrapper + ' ' + imagesStyles.userSelectAuto
              }
            >
              {slide}
            </div>
          ))}
        {props.images && props.loop && props.images.length >= 1 ? (
          <Image
            image={props.images[imagesLength - 1]}
            lazy={props.lazy}
            fit={props.fit}
          />
        ) : null}
        {props.images &&
          props.images.map((image, index) => (
            <Image
              key={index}
              image={image}
              lazy={props.lazy}
              fit={props.fit}
            />
          ))}
        {props.images && props.loop && props.images.length >= 1 ? (
          <Image image={props.images[0]} lazy={props.lazy} fit={props.fit} />
        ) : null}
      </div>
    </div>
  );
};
