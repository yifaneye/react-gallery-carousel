import React, {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
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
  const documentRef = useRef(document);
  const maximizedBackgroundRef = useRef(null);
  const carouselWrapperRef = useRef(null);
  const carouselRef = useRef(null);
  const slidesRef = useRef(null);

  /* process slides */
  const hasImages = 'images' in props;
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children];
  const rawSlides = hasImages ? props.images : children;
  const [slides, slidesElements] = useSlides(rawSlides, {
    rtl: props.isRTL,
    loop: props.isLoop
  });
  const [, setCurIndex] = useState(slides.curIndex);

  /* handle autoplay and reduced motion settings */
  const indexStep = props.isRTL ? -1 : +1;
  const [isPlaying, setIsPlaying] = useTimer(
    props.autoPlay && props.autoPlayInterval,
    () => updateIndexByAutoPlay(indexStep)
  );
  const handleMediaButtonClick = useCallback(() => {
    setIsPlaying((isPlaying) => !isPlaying);
  }, [setIsPlaying]);
  useEffect(() => {
    if (props.autoPlayPaused) setIsPlaying(false);
  }, [props.autoPlayPaused, setIsPlaying]);

  const isReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  useEffect(() => {
    if (isReducedMotion) setIsPlaying(false);
  }, [isReducedMotion, setIsPlaying]);

  /* handle maximization and full screen */
  const [isMaximized, setIsMaximized] = useFixedPosition(
    false,
    carouselWrapperRef
  );
  const handleSizeButtonClick = () => {
    // carousel is to be maximized
    if (!isMaximized) slidesRef.current.focus();
    setIsMaximized((isMaximized) => !isMaximized);
  };

  /* handle UI update */
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

  const applyTransitionY = useCallback(
    (swipeDisplacement = 0) => {
      carouselWrapperRef.current.style.top = `${swipeDisplacement}px`;
      const scale = 1 - swipeDisplacement / 1000;
      carouselWrapperRef.current.style.transform = `scale(${scale})`;
      if (maximizedBackgroundRef.current)
        maximizedBackgroundRef.current.style.opacity = scale;
    },
    [carouselWrapperRef, maximizedBackgroundRef]
  );

  const applyTransitionX = useCallback(
    (swipeDisplacement = 0) => {
      applyTransitionY(0);
      slidesRef.current.style.transform = `translateX(calc(-100% * ${slides.curIndex} + ${swipeDisplacement}px))`;
    },
    [applyTransitionY, slides.curIndex]
  );

  // change to current index before browser paints
  useLayoutEffect(() => {
    applyTransitionX();
  }, [applyTransitionX]);

  /* handle neighbouring current index update */
  // store isMaximized to combat stale closure
  const isMaximizedRef = useRef(isMaximized);
  isMaximizedRef.current = isMaximized;
  const calibrateIndexBySwipe = (swipeXDisplacement) => {
    setIsPlaying(false);
    slides.calibrateIndex(-swipeXDisplacement);
    applyTransitionX(swipeXDisplacement);
  };

  const updateIndexBySwipe = useCallback(
    (change, swipedDisplacement = 0) => {
      slides.updateIndex(change);
      applyTransitionDuration(swipedDisplacement, change !== 0);
      applyTransitionX();
      setCurIndex(slides.curIndex);
    },
    [slides, applyTransitionDuration, applyTransitionX, setCurIndex]
  );
  const rollBackUpdateIndex = () => updateIndexBySwipe(0, 0);

  const updateIndexByAutoPlay = useCallback(
    (change) => {
      slides.calibrateIndex(change);
      applyTransitionX();
      updateIndexBySwipe(change);
    },
    [slides, applyTransitionX, updateIndexBySwipe]
  );

  const updateIndex = useCallback(
    (change) => {
      setIsPlaying(false);
      updateIndexByAutoPlay(change);
    },
    [setIsPlaying, updateIndexByAutoPlay]
  );
  const goLeft = useCallback(() => updateIndex(-1), [updateIndex]);
  const goRight = useCallback(() => updateIndex(+1), [updateIndex]);

  useEventListener(window, 'orientationchange', rollBackUpdateIndex);

  /* handle explicit current index update */
  const goToIndex = (index) => {
    setIsPlaying(false);
    slides.goToIndex(index);
    applyTransitionX();
    setCurIndex(slides.curIndex);
  };
  const indices = slides.allIndices;
  const goToIndexCallbacks = indices.map((index) => () => goToIndex(index));
  const goToIndexCallbacksObj = indices.reduce(
    (obj, key, index) => ({ ...obj, [key]: goToIndexCallbacks[index] }),
    {}
  );

  /* handle keyboard events */
  useKeys(documentRef, { Escape: () => setIsMaximized(() => false) });
  useKeyboard(carouselWrapperRef);
  useKeys(slidesRef, {
    ArrowLeft: () => updateIndex(-1),
    ArrowRight: () => updateIndex(+1)
  });

  /* handle mouse and touch events */
  const handleSwipeMoveDown = (displacement) => {
    if (!props.shouldCloseOnSwipeDown) return;
    if (isMaximizedRef.current) applyTransitionY(displacement);
  };

  const handleSwipeEndDown = () => {
    if (!props.shouldCloseOnSwipeDown) return;
    setIsMaximized(() => false);
    rollBackUpdateIndex();
  };

  const handleTap = () => {
    if (isMaximizedRef.current && props.shouldCloseOnTap)
      setIsMaximized(() => false);
    else if (!isMaximizedRef.current && props.shouldMaximizeOnTap)
      setIsMaximized(() => true);
  };

  const swipeEventHandlers = useSwipe(carouselRef, props.swipeThreshold, {
    swipeMove: (displacementX) => calibrateIndexBySwipe(displacementX),
    swipeMoveDown: (displacementY) => handleSwipeMoveDown(displacementY),
    swipeEndRight: (displacement) => updateIndexBySwipe(-1, displacement),
    swipeEndLeft: (displacement) => updateIndexBySwipe(+1, displacement),
    swipeEndDown: handleSwipeEndDown,
    swipeEndDisqualified: (displacement) => updateIndexBySwipe(0, displacement),
    tap: handleTap
  });

  /* process styles */
  const carouselWrapperMinimizedClassName = `${styles.carouselWrapper}${
    hasImages ? ' ' + styles.galleryCarousel : ''
  }${'className' in props ? ' ' + props.className : ''}`;
  const carouselWrapperMaximizedClassName = `${
    styles.carouselWrapperMaximized
  }${hasImages ? ' ' + styles.galleryCarousel : ''}`;
  const carouselWrapperClassName = isMaximized
    ? carouselWrapperMaximizedClassName
    : carouselWrapperMinimizedClassName;

  /* process maximized carousel */
  const carouselMinimizedPlaceholder = isMaximized && (
    <div className={carouselWrapperMinimizedClassName} style={props.style} />
  );
  const carouselMaximizedBackground = isMaximized && (
    <div
      ref={maximizedBackgroundRef}
      className={styles.carouselWrapperMaximized}
    />
  );

  /* process widgets */
  const curIndexAsKey = slides.curIndexAsKey;
  const curIndexForDisplay = slides.curIndexForDisplay;

  const indexBoard = props.indexBoard && (
    <IndexBoard
      hasShadow={props.widgetsShadow}
      position={props.indexBoard}
      curIndex={curIndexForDisplay}
      totalIndices={indices.length}
    />
  );

  const mediaButtons = props.mediaButtons && props.autoPlay && (
    <MediaButtons
      hasShadow={props.widgetsShadow}
      position={props.mediaButtons}
      isPlaying={isPlaying}
      clickCallback={handleMediaButtonClick}
    />
  );

  const sizeButtons = props.sizeButtons && (
    <SizeButtons
      hasShadow={props.widgetsShadow}
      position={props.sizeButtons}
      isMaximized={isMaximized}
      clickCallback={handleSizeButtonClick}
    />
  );

  const arrowButtons = props.arrowButtons && (
    <ArrowButtons
      hasShadow={props.widgetsShadow}
      isRTL={props.isRTL}
      isLeftDisabled={!slides.canUpdateIndex(-1)}
      isRightDisabled={!slides.canUpdateIndex(+1)}
      onClickLeft={goLeft}
      onClickRight={goRight}
    />
  );

  const indicatorButtons = props.indicatorButtons && (
    <IndicatorButtons
      hasShadow={props.widgetsShadow}
      position={props.indicatorButtons}
      curIndex={curIndexAsKey}
      callbacks={goToIndexCallbacksObj}
    />
  );

  const thumbnails = props.thumbnails && (
    <Thumbnails
      slides={slidesElements}
      hasImages={hasImages}
      lazyLoad={props.lazyLoad}
      curIndex={curIndexAsKey}
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
  thumbnails: PropTypes.bool.isRequired,
  widgetsShadow: PropTypes.bool.isRequired,
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
  shouldMaximizeOnTap: PropTypes.bool.isRequired,
  shouldCloseOnTap: PropTypes.bool.isRequired,
  shouldCloseOnSwipeDown: PropTypes.bool.isRequired,
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
  thumbnails: true,
  arrowButtons: true,
  widgetsShadow: false,
  indexBoard: 'topLeft',
  mediaButtons: 'topCenter',
  sizeButtons: 'topRight',
  indicatorButtons: 'bottom',
  shouldMaximizeOnTap: true,
  shouldCloseOnTap: true,
  shouldCloseOnSwipeDown: true
};
