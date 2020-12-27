import React, { useCallback, useEffect, useRef } from 'react';
import styles from './Carousel.module.css';
import { Image } from '../Image';

export function Carousel(props) {
  const imagesRef = useRef(null);

  // carousel settings
  const transitionDuration = 0.3; // s
  const swipeDistanceMin = 50; // px

  let currentImageIndex = 0;
  const imagesLength = props.images.length;
  let swipeStartX = 0;

  const updateCurrentImageIndex = (change) => {
    if (
      change !== 0 &&
      currentImageIndex + change >= 0 &&
      currentImageIndex + change < imagesLength
    ) {
      currentImageIndex = Math.abs((currentImageIndex + change) % imagesLength);
    }
    imagesRef.current.style.transitionDuration = `${transitionDuration}s`;
    setTimeout(
      () => (imagesRef.current.style.transitionDuration = null),
      transitionDuration * 1000
    );
    imagesRef.current.style.transform = `translateX(calc(-100% * ${currentImageIndex})`;
  };

  const isPinch = (event) => event.scale !== undefined && event.scale !== 1;

  const applySwipe = (swipeDistance) => {
    if (swipeDistance > swipeDistanceMin) {
      updateCurrentImageIndex(-1);
    } else if (swipeDistance < -swipeDistanceMin) {
      updateCurrentImageIndex(+1);
    } else {
      updateCurrentImageIndex(0);
    }
  };

  const showSwipe = (event) => {
    const swipeDistance = event.changedTouches[0].clientX - swipeStartX;
    imagesRef.current.style.transform = `translateX(calc(-100% * ${currentImageIndex} + ${swipeDistance}px)`;
    if (event.type === 'touchend') {
      applySwipe(swipeDistance);
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
