import React, {
  Fragment,
  useCallback,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import styles from './Carousel.module.css';
import Slides from '../Slides';
import Thumbnails from '../Thumbnails';
import {
  ArrowButtons,
  IndexBoard,
  DotButtons,
  MediaButtons,
  SizeButtons
} from '../Widgets';
import useKeys from '../../utils/useKeys';
import useSwipe from '../../utils/useSwipe';
import useTimer from '../../utils/useTimer';
import useSlides from '../../utils/useSlides';
import useKeyboard from '../../utils/useKeyboard';
import useMediaQuery from '../../utils/useMediaQuery';
import useEventListener from '../../utils/useEventListener';
import useFixedPosition from '../../utils/useFixedPosition';
import { propTypes, defaultProps } from './props';

// constants
const MIN_SPEED = 0.2;
const MIN_SPEED_TO_UPDATE = 1;
const TRANSITION_DURATION_THRESHOLD = 1000; // ms
const MAX_TRANSITION_DURATION = 2000; // ms
const MAX_SWIPE_DOWN_DISTANCE = 1500; // px

export const Carousel = (props) => {
  const documentRef = useRef(document);
  const maximizedBackgroundRef = useRef(null);
  const carouselRef = useRef(null);
  const slidesWrapperRef = useRef(null);
  const slidesRef = useRef(null);
  const slideMinRef = useRef(null);
  const slideMaxRef = useRef(null);

  /* process slides */
  const hasImages = 'images' in props;
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children];
  const rawSlides = hasImages ? props.images : children;
  const [slides, slidesElements] = useSlides(rawSlides, {
    index: props.index,
    isRTL: props.isRTL,
    isLoop: props.isLoop
  });
  const nSlides = slides.length;
  const slidesMin = `-${nSlides}00%`;
  const slidesMax = `${nSlides}00%`;

  const [, setCurIndex] = useState(slides.curIndex);
  const applyCurIndexUpdate = (curIndex) => {
    setCurIndex(curIndex);
    props.onIndexChange(slides.curIndexForDisplay);
  };

  /* handle autoplay and reduced motion settings */
  const indexStep = props.isRTL ? -1 : +1;
  const [isPlaying, setIsPlaying] = useTimer(
    props.autoPlay && props.autoPlayInterval,
    props.autoPlayStarted,
    () => updateIndex(indexStep)
  );
  const handleMediaButtonClick = () => {
    setIsPlaying((isPlaying) => !isPlaying);
  };

  const isReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  useLayoutEffect(() => {
    if (isReducedMotion) setIsPlaying(false);
  }, [isReducedMotion, setIsPlaying]);

  const [wasPlaying, setWasPlaying] = useState(false);
  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState !== 'visible') {
      // user switches tab away from the page
      setWasPlaying(isPlaying);
      setIsPlaying(false);
    } else {
      // user switches tab back to the page
      setIsPlaying(wasPlaying);
    }
  }, [isPlaying, setIsPlaying, wasPlaying, setWasPlaying]);

  useEventListener(document, 'visibilitychange', handleVisibilityChange);

  /* handle maximization/minimization and full screen */
  const [isMaximized, setIsMaximized] = useFixedPosition(false, carouselRef);
  const handleSizeButtonClick = () => {
    // carousel is to be maximized
    if (!isMaximized) slidesWrapperRef.current.focus();
    setIsMaximized((isMaximized) => !isMaximized);
  };

  /* handle UI update */
  const applyTransitionDuration = (
    displacementX = 0,
    speed = props.transitionSpeed,
    hasToUpdate = true
  ) => {
    if (isReducedMotion) return;

    // calculate transition duration
    const swipedDistance = Math.abs(displacementX);
    const transitionDistance = hasToUpdate
      ? Math.abs(slidesRef.current.clientWidth - swipedDistance)
      : swipedDistance;
    speed = hasToUpdate
      ? Math.min(speed, MIN_SPEED_TO_UPDATE)
      : Math.min(speed, MIN_SPEED);
    let transitionDuration = transitionDistance / speed;

    // flatten transitionDurations
    if (transitionDuration > TRANSITION_DURATION_THRESHOLD)
      transitionDuration =
        (Math.atan(transitionDuration / TRANSITION_DURATION_THRESHOLD) *
          MAX_TRANSITION_DURATION *
          2) /
        Math.PI;

    // bound transitionDuration to a range
    if (props.transitionDurationMin)
      transitionDuration = Math.max(
        transitionDuration,
        props.transitionDurationMin
      );

    // transitionMax has precedence over transitionMin
    if (props.transitionDurationMax)
      transitionDuration = Math.min(
        transitionDuration,
        props.transitionDurationMax
      );

    // make transitionDuration match autoPlayInterval
    if (isPlaying && transitionDuration > props.autoPlayInterval)
      transitionDuration = props.autoPlayInterval * 1;

    // apply transition duration for the period of transitionDuration
    slidesRef.current.style.transitionDuration = `${transitionDuration}ms`;
    setTimeout(
      () => (slidesRef.current.style.transitionDuration = null),
      transitionDuration
    );
  };

  const applyTransitionY = (displacementX = 0, displacementY = 0) => {
    // do not update the maximized carousel when it is above its original position
    // to hint the user that swiping up will not be able to minimize the carousel
    const distance = displacementY > 0 ? displacementY : 0;
    const portion = 1 - distance / MAX_SWIPE_DOWN_DISTANCE;

    // move and scale the element
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translate(${displacementX}px, ${displacementY}px) scale(${portion})`;
    }

    // update opacity of the background
    if (maximizedBackgroundRef.current) {
      maximizedBackgroundRef.current.style.opacity = portion;
    }
  };

  const applyTransitionX = useCallback(
    (displacementX = 0) => {
      // move the element
      if (slidesRef.current)
        slidesRef.current.style.transform = `translateX(calc(-100% * ${slides.curIndex} + ${displacementX}px))`;
    },
    [slides.curIndex]
  );

  // change to the current slide before browser paints
  useLayoutEffect(() => applyTransitionX(), [applyTransitionX]);

  /* handle implicit current index update */
  const shouldCalibrateIndex = props.isLoop && nSlides > 1;

  const handleSwipeMoveX = (displacementX) => {
    const change = -displacementX;

    // calibrate index for looping of the carousel
    if (shouldCalibrateIndex) {
      if (slides.isMinIndex() && change < 0 && slideMaxRef.current) {
        slideMaxRef.current.style.transform = `translateX(${slidesMin})`;
      } else if (slides.isMaxIndex() && change > 0 && slideMinRef.current) {
        slideMinRef.current.style.transform = `translateX(${slidesMax})`;
      } else {
        slideMinRef.current.style.transform = null;
        slideMaxRef.current.style.transform = null;
      }
    }

    // update UI
    applyTransitionX(displacementX);
  };

  const updateIndex = (change, displacementX = 0, speed) => {
    // calibrate index for looping of the carousel
    if (shouldCalibrateIndex && slideMinRef.current && slideMaxRef.current) {
      if (slides.isMinIndex() && change < 0) {
        slideMinRef.current.style.transform = `translateX(${slidesMax})`;
        slideMaxRef.current.style.transform = null;
      } else if (slides.isMaxIndex() && change > 0) {
        slideMinRef.current.style.transform = null;
        slideMaxRef.current.style.transform = `translateX(${slidesMin})`;
      } else if (change !== 0) {
        slideMinRef.current.style.transform = null;
        slideMaxRef.current.style.transform = null;
      }
    }

    // update carousel
    if (slides.calibrateIndex(change) && shouldCalibrateIndex)
      applyTransitionX(displacementX);
    slides.updateIndex(change);
    applyTransitionDuration(displacementX, speed, change !== 0);
    applyTransitionY(0, 0);
    applyTransitionX();
    applyCurIndexUpdate(slides.curIndex);
  };

  const rollBackIndexUpdate = () => updateIndex(0, 0, 0);

  useEventListener(window, 'orientationchange', rollBackIndexUpdate);

  /* handle explicit current index update */
  const goToIndex = (index) => {
    // set both the first and the last slide back into their respective original places
    slideMinRef.current.style.transform = null;
    slideMaxRef.current.style.transform = null;

    // update carousel
    slides.goToIndex(index);
    applyTransitionX();
    applyCurIndexUpdate(slides.curIndex);
  };

  // process callbacks, one for each for dotButton and thumbnail
  const indices = slides.allIndices;
  const goToIndexCallbacks = indices.map((index) => () => goToIndex(index));
  const goToIndexCallbacksObj = indices.reduce(
    (obj, key, index) => ({ ...obj, [key]: goToIndexCallbacks[index] }),
    {}
  );

  /* handle keyboard events */
  useKeys(documentRef, { Escape: () => setIsMaximized(() => false) });

  useKeyboard(carouselRef);

  const goLeft = () => updateIndex(-1);
  const goRight = () => updateIndex(+1);

  useKeys(slidesRef, {
    ArrowLeft: goLeft,
    ArrowRight: goRight
  });

  /* handle mouse and touch events */
  // store isMaximized to combat stale closure
  const isMaximizedRef = useRef(isMaximized);
  isMaximizedRef.current = isMaximized;

  const handleSwipeMoveY = (displacementX, displacementY) => {
    if (!props.shouldMinimizeOnSwipeDown) return;
    if (isMaximizedRef.current) applyTransitionY(displacementX, displacementY);
  };

  const handleSwipeEndDown = () => {
    if (!props.shouldMinimizeOnSwipeDown) return;
    applyTransitionY(0, 0);
    setIsMaximized(() => false);
    rollBackIndexUpdate();
  };

  const handleTap = () => {
    if (isMaximizedRef.current && props.shouldMinimizeOnClick)
      setIsMaximized(() => false);
    else if (!isMaximizedRef.current && props.shouldMaximizeOnClick)
      setIsMaximized(() => true);
  };

  const mouseEventHandlers = useSwipe(slidesWrapperRef, props.swipeThreshold, {
    onSwipeMoveX: handleSwipeMoveX,
    onSwipeMoveY: handleSwipeMoveY,
    onSwipeEndRight: (displacementX, speed) =>
      updateIndex(-1, displacementX, speed),
    onSwipeEndLeft: (displacementX, speed) =>
      updateIndex(+1, displacementX, speed),
    onSwipeEndDisqualified: (displacementX, speed) =>
      updateIndex(0, displacementX, speed),
    onSwipeEndDown: handleSwipeEndDown,
    onTap: handleTap
  });
  // touch event handlers are already added to slidesWrapperRef by useSwipe hook at this point

  /* process class names */
  const propsClassName = 'className' in props ? ' ' + props.className : '';
  const galleryClassName = hasImages ? ' ' + styles.gallery : '';
  const carouselClassName = styles.carousel + propsClassName + galleryClassName;
  const maxCarouselClassName = styles.maxCarousel + galleryClassName;

  /* process components for maximized carousel */
  const minCarouselPlaceholder = isMaximized && (
    <div className={carouselClassName} style={props.style} />
  );

  const maxCarouselBackground = isMaximized && (
    <div ref={maximizedBackgroundRef} className={maxCarouselClassName} />
  );

  /* process widgets */
  const indexBoard = props.indexBoard && (
    <IndexBoard
      hasShadow={props.widgetsShadow}
      position={props.indexBoard}
      curIndex={slides.curIndexForDisplay}
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

  const dotButtons = props.dotButtons && (
    <DotButtons
      hasShadow={props.widgetsShadow}
      position={props.dotButtons}
      curIndex={slides.curIndex}
      callbacks={goToIndexCallbacksObj}
    />
  );

  const thumbnails = props.thumbnails && (
    <Thumbnails
      isMaximized={isMaximizedRef.current}
      slides={slidesElements}
      hasImages={hasImages}
      lazyLoad={props.lazyLoad}
      curIndex={slides.curIndex}
      callbacks={goToIndexCallbacksObj}
    />
  );

  return (
    <>
      {minCarouselPlaceholder}
      {maxCarouselBackground}
      <div
        ref={carouselRef}
        className={isMaximized ? maxCarouselClassName : carouselClassName}
        style={isMaximized ? {} : props.style}
      >
        <div
          ref={slidesWrapperRef}
          className={styles.slidesWrapper}
          {...(props.shouldSwipeOnMouse ? mouseEventHandlers : {})}
        >
          <Slides
            minRef={slideMinRef}
            maxRef={slideMaxRef}
            slidesRef={slidesRef}
            slides={slidesElements}
            hasImages={hasImages}
            length={nSlides}
            {...props}
          />
          {mediaButtons}
          {indexBoard}
          {sizeButtons}
          {arrowButtons}
          {dotButtons}
        </div>
        {thumbnails}
      </div>
    </>
  );
};

Carousel.propTypes = propTypes;
Carousel.defaultProps = defaultProps;
