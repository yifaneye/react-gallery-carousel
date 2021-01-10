import React, { useEffect, useRef } from 'react';
import styles from './Carousel.module.css';
import useKeys from '../utils/useKeys';
import useTimer from '../utils/useTimer';
import useTouches from '../utils/useTouches';
import useSlides from '../utils/useSlides';
import { Slides } from '../Slides/Slides';
import PropTypes from 'prop-types';
import {
  FallbackProps,
  numberBetween,
  positiveNumber
} from '../utils/validators';
import { ArrowButtons, MediaButtons } from '../Buttons';
import useMediaQuery from '../utils/useMediaQuery';

export const Carousel = (props) => {
  const slidesRef = useRef(null);
  const [slides, slidesElements] = useSlides(
    props.images || props.children,
    props
  );

  const transitionSpeed = props.speed || 1500; // px/s
  const swipePercentageMin = props.threshold || 0.1; // * 100%
  const autoPlayInterval = props.auto ? (props.interval || 5) * 1000 : null; // ms
  const indexStep = props.rtl ? -1 : +1;

  const applyTransitionDuration = (swipedDisplacement, hasToUpdate) => {
    const swipedDistance = Math.abs(swipedDisplacement);
    const transitionDistance = hasToUpdate
      ? Math.abs(slidesRef.current.clientWidth - swipedDistance)
      : swipedDistance;
    let transitionDuration = transitionDistance / transitionSpeed;

    // make transitionDuration slightly smaller (faster) than autoPlayInterval
    if (props.auto && transitionDuration > autoPlayInterval) {
      transitionDuration = autoPlayInterval * 0.999;
    }

    slidesRef.current.style.transitionDuration = `${transitionDuration}s`;
    setTimeout(
      () => (slidesRef.current.style.transitionDuration = null),
      transitionDuration * 1000
    );
  };

  const applyTransition = (swipeDisplacement = 0) => {
    slidesRef.current.style.transform = `translate3d(calc(-100% * ${slides.curIndex} + ${swipeDisplacement}px), 0px, 0px)`;
  };

  const calibrateIndex = (change) => {
    slides.calibrateIndex(change);
    applyTransition();
  };

  const updateIndex = (change) => {
    setIsPlaying(false);
    calibrateIndex(change);
    applyTransitionDuration(0, slides.updateIndex(change));
    applyTransition();
  };

  const calibrateIndexBySwipe = (swipeDisplacement) => {
    setIsPlaying(false);
    slides.calibrateIndex(-swipeDisplacement);
    applyTransition(swipeDisplacement);
  };

  const updateIndexBySwipe = (change, swipedDisplacement) => {
    setIsPlaying(false);
    applyTransitionDuration(swipedDisplacement, slides.updateIndex(change));
    applyTransition();
  };

  const updateIndexByAutoPlay = (change) => {
    calibrateIndex(change);
    applyTransitionDuration(0, slides.updateIndex(change));
    applyTransition();
  };

  const [isPlaying, setIsPlaying] = useTimer(
    props.auto && autoPlayInterval,
    () => updateIndexByAutoPlay(indexStep)
  );

  const isReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  useEffect(() => {
    if (isReducedMotion) setIsPlaying(false);
  }, [isReducedMotion]);

  const handleMediaButtonClick = () => {
    setIsPlaying((isPlaying) => !isPlaying);
  };

  useKeys(slidesRef, {
    ArrowLeft: () => updateIndex(-1),
    ArrowRight: () => updateIndex(+1)
  });

  const touchEventHandlers = useTouches(slidesRef, swipePercentageMin, {
    swipeMove: (displacement) => calibrateIndexBySwipe(displacement),
    swipeEndRight: (displacement) => updateIndexBySwipe(-1, displacement),
    swipeEndLeft: (displacement) => updateIndexBySwipe(+1, displacement),
    swipeEndDisqualified: (displacement) => updateIndexBySwipe(0, displacement)
  });

  useEffect(() => {
    applyTransition();
  }, []);

  const carouselClassName = `${styles.carousel}${
    'images' in props ? ' ' + styles.galleryCarousel : ''
  }`;

  return (
    <div className={styles.carouselWrapper} style={props.style}>
      <div className={carouselClassName}>
        <ul
          className={styles.slides}
          ref={slidesRef}
          {...touchEventHandlers}
          tabIndex={0}
        >
          <Slides slides={slidesElements} {...props} />
        </ul>
      </div>
      <ArrowButtons
        disabled={props.controls === false}
        onClickLeft={() => updateIndex(-1)}
        onClickRight={() => updateIndex(+1)}
      />
      <MediaButtons
        disabled={!props.auto}
        isPlaying={isPlaying}
        clickCallback={handleMediaButtonClick}
      />
    </div>
  );
};

Carousel.propTypes = {
  images: PropTypes.array && FallbackProps(['children']),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  fit: PropTypes.string,
  lazy: PropTypes.bool,
  loop: PropTypes.bool,
  rtl: PropTypes.bool,
  auto: PropTypes.bool,
  interval: positiveNumber(),
  speed: positiveNumber(),
  threshold: numberBetween(0, 1),
  style: PropTypes.object
};
