import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import styles from './Carousel.module.css';
import useKeys from '../../utils/useKeys';
import useTimer from '../../utils/useTimer';
import useSlides from '../../utils/useSlides';
import Slides from '../Slides';
import PropTypes from 'prop-types';
import {
  fallbackProps,
  numberBetween,
  positiveNumber
} from '../../utils/validators';
import {
  ArrowButtons,
  MediaButtons,
  SizeButtons,
  IndicatorButtons
} from '../Buttons';
import useMediaQuery from '../../utils/useMediaQuery';
import useKeyboard from '../../utils/useKeyboard';
import useSwipe from '../../utils/useSwipe';
import useFixedPosition from '../../utils/useFixedPosition';

export const Carousel = (props) => {
  const carouselRef = useRef(null);
  const slidesRef = useRef(null);
  const rawSlides = Array.isArray(props.children)
    ? props.children
    : [props.children];
  const [slides, slidesElements] = useSlides(props.images || rawSlides, props);
  const [curIndex, setCurIndex] = useState(slides.curIndex);
  const indexStep = props.rtl ? -1 : +1;
  const [isPlaying, setIsPlaying] = useTimer(props.auto && props.interval, () =>
    updateIndexByAutoPlay(indexStep)
  );

  const applyTransitionDuration = useCallback(
    (swipedDisplacement = 0, hasToUpdate = true) => {
      const swipedDistance = Math.abs(swipedDisplacement);
      const transitionDistance = hasToUpdate
        ? Math.abs(slidesRef.current.clientWidth - swipedDistance)
        : swipedDistance;
      let transitionDuration = transitionDistance / props.speed;

      // make transitionDuration slightly smaller (faster) than props.interval
      if (isPlaying && transitionDuration > props.interval) {
        transitionDuration = props.interval * 0.999;
      }

      if (transitionDuration < props.transitionMin)
        transitionDuration = props.transitionMin;

      slidesRef.current.style.transitionDuration = `${transitionDuration}ms`;
      setTimeout(
        () => (slidesRef.current.style.transitionDuration = null),
        transitionDuration
      );
    },
    [props.speed, isPlaying, props.interval, props.transitionMin]
  );

  const applyTransition = useCallback(
    (swipeDisplacement = 0) => {
      slidesRef.current.style.transform = `translate3d(calc(-100% * ${slides.curIndex} + ${swipeDisplacement}px), 0px, 0px)`;
    },
    [slides.curIndex]
  );

  const calibrateIndexBySwipe = (swipeDisplacement) => {
    setIsPlaying(false);
    slides.calibrateIndex(-swipeDisplacement);
    applyTransition(swipeDisplacement);
  };

  const goToIndex = (index) => {
    slides.goToIndex(index);
    applyTransitionDuration();
    applyTransition();
    setCurIndex(slides.curIndex);
  };

  const updateIndexBySwipe = useCallback(
    (change, swipedDisplacement = 0) => {
      slides.updateIndex(change);
      applyTransitionDuration(swipedDisplacement, change !== 0);
      applyTransition();
      if (change !== 0) setCurIndex(slides.curIndex);
    },
    [slides, applyTransitionDuration, applyTransition, setCurIndex]
  );

  const updateIndexByAutoPlay = useCallback(
    (change) => {
      slides.calibrateIndex(change);
      applyTransition();
      updateIndexBySwipe(change);
    },
    [slides, applyTransition, updateIndexBySwipe]
  );

  const updateIndexByButtonOrKey = useCallback(
    (change) => {
      setIsPlaying(false);
      updateIndexByAutoPlay(change);
    },
    [setIsPlaying, updateIndexByAutoPlay]
  );

  const isReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  useEffect(() => {
    if (isReducedMotion) setIsPlaying(false);
  }, [isReducedMotion, setIsPlaying]);
  useEffect(() => {
    if (props.paused) setIsPlaying(false);
  }, [props.paused, setIsPlaying]);

  const handleMediaButtonClick = useCallback(() => {
    setIsPlaying((isPlaying) => !isPlaying);
  }, [setIsPlaying]);

  useKeyboard(carouselRef);

  useKeys(
    slidesRef,
    useMemo(
      () => ({
        ArrowLeft: () => updateIndexByButtonOrKey(-1),
        ArrowRight: () => updateIndexByButtonOrKey(+1)
      }),
      [updateIndexByButtonOrKey]
    )
  );

  const swipeEventHandlers = useSwipe(carouselRef, props.threshold, {
    swipeMove: (displacement) => calibrateIndexBySwipe(displacement),
    swipeEndRight: (displacement) => updateIndexBySwipe(-1, displacement),
    swipeEndLeft: (displacement) => updateIndexBySwipe(+1, displacement),
    swipeEndDisqualified: (displacement) => updateIndexBySwipe(0, displacement)
  });

  useEffect(() => {
    applyTransition();
  }, [applyTransition]);

  const indices = slides.allIndices;
  const goToIndexCallbacks = indices.map((index) => () => goToIndex(index));
  const indicatorsCallbacks = indices.reduce(
    (obj, key, index) => ({ ...obj, [key]: goToIndexCallbacks[index] }),
    {}
  );

  const [isMaximized, setIsMaximized] = useFixedPosition(false, carouselRef);

  const handleSizeButtonClick = () =>
    setIsMaximized((isMaximized) => !isMaximized);

  useKeys(carouselRef, { Escape: () => setIsMaximized(() => false) });

  const carouselWrapperClassName = isMaximized
    ? styles.carouselWrapperMaximized
    : styles.carouselWrapper;

  const carouselPlaceholder = isMaximized && (
    <div className={styles.carouselWrapper} style={props.style} />
  );

  const carouselMaximizedBackground = isMaximized && (
    <div className={styles.carouselWrapperMaximized} />
  );

  const slidesClassName = `${styles.carousel}${
    'images' in props ? ' ' + styles.galleryCarousel : ''
  }`;

  return (
    <>
      {carouselPlaceholder}
      {carouselMaximizedBackground}
      <div
        className={carouselWrapperClassName}
        style={isMaximized ? {} : props.style}
        ref={carouselRef}
        data-is-keyboard-user='true'
        {...swipeEventHandlers}
      >
        <MediaButtons
          disabled={!props.auto}
          isPlaying={isPlaying}
          clickCallback={handleMediaButtonClick}
        />
        <SizeButtons
          disabled={false}
          isMaximized={isMaximized}
          clickCallback={handleSizeButtonClick}
        />
        <ArrowButtons
          disabled={props.controls === false}
          rtl={props.rtl}
          isLeftDisabled={!slides.canUpdateIndex(-1)}
          isRightDisabled={!slides.canUpdateIndex(+1)}
          onClickLeft={useCallback(() => updateIndexByButtonOrKey(-1), [
            updateIndexByButtonOrKey
          ])}
          onClickRight={useCallback(() => updateIndexByButtonOrKey(+1), [
            updateIndexByButtonOrKey
          ])}
        />
        <IndicatorButtons
          disabled={props.controls === false}
          curIndex={curIndex}
          callbacks={indicatorsCallbacks}
        />
        <div className={slidesClassName}>
          <Slides reference={slidesRef} slides={slidesElements} {...props} />
        </div>
      </div>
    </>
  );
};

Carousel.propTypes = {
  images: PropTypes.array && fallbackProps(['children']),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  fit: PropTypes.string,
  lazy: PropTypes.bool,
  loop: PropTypes.bool,
  rtl: PropTypes.bool,
  auto: PropTypes.bool,
  paused: PropTypes.bool,
  interval: positiveNumber(),
  speed: positiveNumber(),
  threshold: numberBetween(0, 1),
  transitionMin: positiveNumber(),
  style: PropTypes.object
};

Carousel.defaultProps = {
  children: undefined,
  fit: undefined,
  lazy: false,
  loop: false,
  rtl: false,
  auto: false,
  paused: false,
  interval: 5000, // ms
  speed: 1.5, // px/ms
  threshold: 0.1, // %
  transitionMin: 200, // ms
  style: {}
};
