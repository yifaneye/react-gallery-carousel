import React, {
  Fragment,
  useCallback,
  useEffect,
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
  compareToProp,
  fallbackProps,
  numberBetween,
  positiveNumber
} from '../../utils/validators';
import {
  ArrowButtons,
  MediaButtons,
  SizeButtons,
  IndicatorButtons,
  IndexBoard
} from '../Widgets';
import Thumbnails from '../Thumbnails';
import useMediaQuery from '../../utils/useMediaQuery';
import useKeyboard from '../../utils/useKeyboard';
import useSwipe from '../../utils/useSwipe';
import useFixedPosition from '../../utils/useFixedPosition';
import useEventListener from '../../utils/useEventListener';

export const Carousel = (props) => {
  const carouselWrapperRef = useRef(null);
  const carouselRef = useRef(null);
  const slidesRef = useRef(null);

  // process slides
  const hasImages = 'images' in props;
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children];
  const rawSlides = hasImages ? props.images : children;
  const [slides, slidesElements] = useSlides(rawSlides, {
    rtl: props.isRTL,
    loop: props.isLoop
  });
  const [curIndex, setCurIndex] = useState(slides.curIndex);
  const indexStep = props.isRTL ? -1 : +1;
  const [isPlaying, setIsPlaying] = useTimer(
    props.autoPlay && props.autoPlayInterval,
    () => updateIndexByAutoPlay(indexStep)
  );

  const applyTransitionDuration = useCallback(
    (swipedDisplacement = 0, hasToUpdate = true) => {
      const swipedDistance = Math.abs(swipedDisplacement);
      const transitionDistance = hasToUpdate
        ? Math.abs(slidesRef.current.clientWidth - swipedDistance)
        : swipedDistance;
      let transitionDuration = transitionDistance / props.transitionSpeed;

      // bound transitionDuration match in an range
      if (
        props.transitionDurationMin &&
        transitionDuration < props.transitionDurationMin
      )
        transitionDuration = props.transitionDurationMin;
      // transitionMax has precedence over transitionMin
      if (
        props.transitionDurationMax &&
        transitionDuration > props.transitionDurationMax
      )
        transitionDuration = props.transitionDurationMax;
      // make transitionDuration match autoPlayInterval
      if (isPlaying && transitionDuration > props.autoPlayInterval)
        transitionDuration = props.autoPlayInterval * 1;

      slidesRef.current.style.transitionDuration = `${transitionDuration}ms`;
      setTimeout(
        () => (slidesRef.current.style.transitionDuration = null),
        transitionDuration
      );
    },
    [
      props.transitionSpeed,
      isPlaying,
      props.autoPlayInterval,
      props.transitionDurationMin,
      props.transitionDurationMax
    ]
  );

  const applyTransition = useCallback(
    (swipeDisplacement = 0) =>
      (slidesRef.current.style.transform = `translate3d(calc(-100% * ${slides.curIndex} + ${swipeDisplacement}px), 0px, 0px)`),
    [slides.curIndex]
  );

  const calibrateIndexBySwipe = (swipeDisplacement) => {
    setIsPlaying(false);
    slides.calibrateIndex(-swipeDisplacement);
    applyTransition(swipeDisplacement);
  };

  const updateIndexBySwipe = useCallback(
    (change, swipedDisplacement = 0) => {
      slides.updateIndex(change);
      applyTransitionDuration(swipedDisplacement, change !== 0);
      applyTransition();
      setCurIndex(slides.curIndex);
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

  const goLeft = useCallback(() => updateIndexByButtonOrKey(-1), [
    updateIndexByButtonOrKey
  ]);

  const goRight = useCallback(() => updateIndexByButtonOrKey(+1), [
    updateIndexByButtonOrKey
  ]);

  const isReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  useEffect(() => {
    if (isReducedMotion) setIsPlaying(false);
  }, [isReducedMotion, setIsPlaying]);
  useEffect(() => {
    if (props.autoPlayPaused) setIsPlaying(false);
  }, [props.autoPlayPaused, setIsPlaying]);

  const handleMediaButtonClick = useCallback(() => {
    setIsPlaying((isPlaying) => !isPlaying);
  }, [setIsPlaying]);

  useKeyboard(carouselWrapperRef);

  useKeys(slidesRef, {
    ArrowLeft: () => updateIndexByButtonOrKey(-1),
    ArrowRight: () => updateIndexByButtonOrKey(+1)
  });

  const swipeEventHandlers = useSwipe(carouselRef, props.swipeThreshold, {
    swipeMove: (displacement) => calibrateIndexBySwipe(displacement),
    swipeEndRight: (displacement) => updateIndexBySwipe(-1, displacement),
    swipeEndLeft: (displacement) => updateIndexBySwipe(+1, displacement),
    swipeEndDown: () => {
      setIsMaximized(() => false);
      updateIndexBySwipe(0, 0);
    },
    swipeEndDisqualified: (displacement) => updateIndexBySwipe(0, displacement)
  });

  useEffect(() => {
    applyTransition();
  }, [applyTransition]);

  const [isMaximized, setIsMaximized] = useFixedPosition(
    false,
    carouselWrapperRef
  );

  const handleSizeButtonClick = () =>
    setIsMaximized((isMaximized) => !isMaximized);

  useKeys(carouselWrapperRef, { Escape: () => setIsMaximized(() => false) });

  useEventListener(window, 'orientationchange', () => updateIndexBySwipe(0, 0));

  // callbacks for go to each index
  const goToIndex = (index) => {
    setIsPlaying(false);
    slides.goToIndex(index);
    applyTransitionDuration();
    applyTransition();
    setCurIndex(slides.curIndex);
  };
  const indices = slides.allIndices;
  const goToIndexCallbacks = indices.map((index) => () => goToIndex(index));
  const goToIndexCallbacksObj = indices.reduce(
    (obj, key, index) => ({ ...obj, [key]: goToIndexCallbacks[index] }),
    {}
  );

  // styles of the carousel
  const carouselWrapperMinimizedClassName = `${styles.carouselWrapper}${
    hasImages ? ' ' + styles.galleryCarousel : ''
  }${'className' in props ? ' ' + props.className : ''}`;
  const carouselWrapperMaximizedClassName = `${
    styles.carouselWrapperMaximized
  }${hasImages ? ' ' + styles.galleryCarousel : ''}`;
  const carouselWrapperClassName = isMaximized
    ? carouselWrapperMaximizedClassName
    : carouselWrapperMinimizedClassName;

  // components for maximized carousel
  const carouselMinimizedPlaceholder = isMaximized && (
    <div className={carouselWrapperMinimizedClassName} style={props.style} />
  );
  const carouselMaximizedBackground = isMaximized && (
    <div className={styles.carouselWrapperMaximized} />
  );

  const indexBoard = props.indexBoard && (
    <IndexBoard
      position={props.indexBoard}
      curIndex={props.isLoop ? curIndex : curIndex + 1}
      totalIndices={indices.length}
    />
  );

  const mediaButtons = props.mediaButtons && props.autoPlay && (
    <MediaButtons
      position={props.mediaButtons}
      isPlaying={isPlaying}
      clickCallback={handleMediaButtonClick}
    />
  );

  const sizeButtons = props.sizeButtons && (
    <SizeButtons
      position={props.sizeButtons}
      isMaximized={isMaximized}
      clickCallback={handleSizeButtonClick}
    />
  );

  const arrowButtons = props.arrowButtons && (
    <ArrowButtons
      isRTL={props.isRTL}
      isLeftDisabled={!slides.canUpdateIndex(-1)}
      isRightDisabled={!slides.canUpdateIndex(+1)}
      onClickLeft={goLeft}
      onClickRight={goRight}
    />
  );

  const indicatorButtons = props.indicatorButtons && (
    <IndicatorButtons
      position={props.indicatorButtons}
      curIndex={curIndex}
      callbacks={goToIndexCallbacksObj}
    />
  );

  const thumbnails = props.thumbnails && (
    <Thumbnails
      slides={slidesElements}
      hasImages={hasImages}
      lazyLoad={props.lazyLoad}
      curIndex={curIndex}
      callbacks={goToIndexCallbacksObj}
    />
  );

  return (
    <>
      {carouselMinimizedPlaceholder}
      {carouselMaximizedBackground}
      <div
        ref={carouselWrapperRef}
        className={carouselWrapperClassName}
        style={isMaximized ? {} : props.style}
        data-is-keyboard-user='true'
      >
        <div
          ref={carouselRef}
          className={`${styles.carousel}${
            props.thumbnails ? ' ' + styles.shorterCarousel : ''
          }`}
          {...swipeEventHandlers}
        >
          {indexBoard}
          {mediaButtons}
          {sizeButtons}
          {arrowButtons}
          {indicatorButtons}
          <Slides
            reference={slidesRef}
            slides={slidesElements}
            hasImages={hasImages}
            {...props}
          />
        </div>
        {thumbnails}
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
  isRTL: PropTypes.bool.isRequired,
  isLoop: PropTypes.bool.isRequired,
  lazyLoad: PropTypes.bool.isRequired,
  objectFit: PropTypes.string.isRequired,
  autoPlay: PropTypes.bool.isRequired,
  autoPlayPaused: PropTypes.bool.isRequired,
  autoPlayInterval: positiveNumber(),
  swipeThreshold: numberBetween(0, 1),
  transitionSpeed: positiveNumber(),
  transitionDurationMin: positiveNumber(),
  transitionDurationMax: compareToProp('>=', 'transitionDurationMin'),
  arrowButtons: PropTypes.bool.isRequired,
  indexBoard: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.string.isRequired
  ]).isRequired,
  mediaButtons: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.string.isRequired
  ]).isRequired,
  sizeButtons: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.string.isRequired
  ]).isRequired,
  indicatorButtons: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.string.isRequired
  ]).isRequired,
  thumbnails: PropTypes.bool.isRequired,
  className: PropTypes.string,
  style: PropTypes.object
};

Carousel.defaultProps = {
  isRTL: false,
  isLoop: true,
  lazyLoad: true,
  objectFit: 'cover',
  autoPlay: false,
  autoPlayPaused: false,
  autoPlayInterval: 5000, // ms
  swipeThreshold: 0.05, // * 100%
  transitionSpeed: 1.5, // px/ms
  arrowButtons: true,
  indexBoard: 'topLeft',
  mediaButtons: 'topCenter',
  sizeButtons: 'topRight',
  indicatorButtons: 'bottom',
  thumbnails: true
};
