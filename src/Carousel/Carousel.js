import React, { useCallback, useEffect, useRef } from 'react';
import styles from './Carousel.module.css';
import { Image } from '../Image';

export function Carousel(props) {
  const imagesRef = useRef(null);

  // carousel settings
  const transitionSpeed = 1500; // px/s
  const swipePercentageMin = 0.25; // * 100%

  let currentImageIndex = 0;
  const imagesLength = props.images.length;
  let swipeStartX = 0;

  const updateCurrentImageIndex = (change, swipedDisplacement = 0) => {
    const hasToUpdate =
      change !== 0 &&
      currentImageIndex + change >= 0 &&
      currentImageIndex + change < imagesLength;
    if (hasToUpdate) {
      currentImageIndex = Math.abs((currentImageIndex + change) % imagesLength);
    }

    const swipedDistance = Math.abs(swipedDisplacement);
    const transitionDistance = hasToUpdate
      ? Math.abs(imagesRef.current.clientWidth - swipedDistance)
      : swipedDistance;
    const transitionDuration = transitionDistance / transitionSpeed;
    imagesRef.current.style.transitionDuration = `${transitionDuration}s`;
    setTimeout(
      () => (imagesRef.current.style.transitionDuration = null),
      transitionDuration * 1000
    );
    imagesRef.current.style.transform = `translate3d(calc(-100% * ${currentImageIndex}), 0px, 0px)`;
  };

  const isPinch = (event) => event.scale !== undefined && event.scale !== 1;

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
    if (isPinch(event)) {
      return;
    }
    swipeStartX = event.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((event) => {
    if (isPinch(event)) {
      return;
    }
    showSwipe(event);
  }, []);

  const handleTouchEnd = useCallback((event) => {
    if (isPinch(event)) {
      return;
    }
    showSwipe(event);
  }, []);

  useEffect(() => {
    document.body.addEventListener('touchstart', () => {});

    return () => {
      document.body.removeEventListener('touchstart', () => {});
    };
  }, [handleKeyDown]);

  return (
    <div className={styles.imagesWrapper}>
      <div
        className={styles.images}
        ref={imagesRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {props.images.map((image, index) => (
          <Image key={index} image={image} />
        ))}
      </div>
    </div>
  );
}
