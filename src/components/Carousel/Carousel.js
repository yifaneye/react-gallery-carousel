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
const MIN_SPEED = 0.1;
const MIN_SPEED_TO_UPDATE = 1;
const TRANSITION_DURATION_THRESHOLD = 500; // ms
const MAX_TRANSITION_DURATION = 1000; // ms
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
    isLoop: props.isLoop
  });
  const nSlides = slides.length;
  const increment = props.isRTL ? -1 : +1;
  const slidesMin = `${nSlides * -increment}00%`;
  const slidesMax = `${nSlides * increment}00%`;

  const [, setCurIndex] = useState(slides.curIndex);
  const applyCurIndexUpdate = (curIndex) => {
    setCurIndex(curIndex);
    props.onIndexChange(slides.curIndexForDisplay);
  };

  /* handle autoplay and reduced motion settings */
  const [isPlaying, setIsPlaying] = useTimer(
    props.autoPlay && props.autoPlayInterval,
    props.autoPlayStarted,
    () => updateIndex(+1)
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
  const [isMaximized, setIsMaximized] = useFixedPosition(
    props.isMaximized,
    slidesWrapperRef
  );

  const handleSizeButtonClick = () => {
    setIsMaximized((isMaximized) => !isMaximized);
  };

  /* handle UI update */
  const applyTransitionDuration = (
    displacementX = 0,
    speed = props.transitionSpeed,
    hasToUpdate = true
  ) => {
    if (!props.hasTransition) return;
    if (isReducedMotion) return;

    // calculate transition duration
    const swipedDistance = Math.abs(displacementX);
    const transitionDistance = hasToUpdate
      ? Math.abs(slidesRef.current.clientWidth - swipedDistance)
      : swipedDistance;
    speed = hasToUpdate ? Math.max(speed, MIN_SPEED_TO_UPDATE) : MIN_SPEED;
    let duration = transitionDistance / speed;

    // flatten transitionDurations
    if (duration > TRANSITION_DURATION_THRESHOLD)
      duration =
        (Math.atan(duration / TRANSITION_DURATION_THRESHOLD) *
          MAX_TRANSITION_DURATION *
          2) /
        Math.PI;

    // bound duration to a range
    if (props.transitionDurationMin)
      duration = Math.max(duration, props.transitionDurationMin);

    // transitionMax has precedence over transitionMin
    if (props.transitionDurationMax)
      duration = Math.min(duration, props.transitionDurationMax);

    // make duration match autoPlayInterval
    if (isPlaying && duration > props.autoPlayInterval)
      duration = props.autoPlayInterval * 1;

    // apply transition duration for the period of duration
    slidesRef.current.style.transitionDuration = `${duration}ms`;
    setTimeout(
      () => (slidesRef.current.style.transitionDuration = null),
      duration
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
        slidesRef.current.style.transform = `translateX(calc(${
          -100 * slides.curIndex * increment
        }% + ${displacementX}px))`;
    },
    [slides.curIndex, increment]
  );

  // change to the current slide before browser paints
  useLayoutEffect(() => applyTransitionX(), [applyTransitionX]);

  /* handle implicit current index update */
  const shouldCalibrateIndex = props.isLoop && nSlides > 1;

  const handleSwipeMoveX = (displacementX) => {
    const change = -displacementX * increment;

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
      } else if (!slides.isMinIndex() && !slides.isMaxIndex() && change !== 0) {
        slideMinRef.current.style.transform = null;
        slideMaxRef.current.style.transform = null;
      }
    }

    // update carousel
    if (slides.calibrateIndex(change) && shouldCalibrateIndex) {
      // remove carry-over transitionDuration
      slidesRef.current.style.transitionDuration = null;
      applyTransitionX(displacementX);
    }

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
  const goToIndexCallbacksObject = indices.reduce(
    (obj, key, index) => ({ ...obj, [key]: goToIndexCallbacks[index] }),
    {}
  );

  /* handle keyboard events */
  useKeys(documentRef, { Escape: () => setIsMaximized(() => false) });

  useKeyboard(carouselRef);

  const goLeft = () => updateIndex(-increment);
  const goRight = () => updateIndex(+increment);

  useKeys(slidesWrapperRef, {
    ArrowLeft: goLeft,
    ArrowRight: goRight,
    /* can not use useEnter hook here to mimic user click, since a click
    on slidesWrapper should not and will not trigger anything */
    Enter: (event) => {
      // ignore ('Enter' key) keydown events on widgets (buttons) bubbling up to here
      if (event.target !== event.currentTarget) return;
      handleSizeButtonClick();
    }
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
    onSwipeEndLeft: (displacementX, speed) =>
      updateIndex(increment, displacementX, speed),
    onSwipeEndRight: (displacementX, speed) =>
      updateIndex(-increment, displacementX, speed),
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
  const carouselPlaceholder = isMaximized && (
    <div className={carouselClassName} style={props.style} />
  );

  const maxCarouselBackground = isMaximized && (
    <div ref={maximizedBackgroundRef} className={maxCarouselClassName} />
  );

  /* process settings */
  const objectFit =
    isMaximized && 'objectFitAtMax' in props
      ? props.objectFitAtMax
      : props.objectFit;
  const hasArrowButtons =
    isMaximized && 'hasArrowButtonsAtMax' in props
      ? props.hasArrowButtonsAtMax
      : props.hasArrowButtons;
  const hasMediaButton =
    isMaximized && 'hasMediaButtonAtMax' in props
      ? props.hasMediaButtonAtMax
      : props.hasMediaButton;
  const hasSizeButton =
    isMaximized && 'hasSizeButtonAtMax' in props
      ? props.hasSizeButtonAtMax
      : props.hasSizeButton;
  const hasDotButtons =
    isMaximized && 'hasDotButtonsAtMax' in props
      ? props.hasDotButtonsAtMax
      : props.hasDotButtons;
  const hasIndexBoard =
    isMaximized && 'hasIndexBoardAtMax' in props
      ? props.hasIndexBoardAtMax
      : props.hasIndexBoard;
  const hasCaptions =
    isMaximized && 'hasCaptionsAtMax' in props
      ? props.hasCaptionsAtMax
      : props.hasCaptions;
  const hasThumbnails =
    isMaximized && 'hasThumbnailsAtMax' in props
      ? props.hasThumbnailsAtMax
      : props.hasThumbnails;

  /* process widgets */
  const indexBoard = hasIndexBoard && (
    <IndexBoard
      hasShadow={props.widgetsHasShadow}
      position={hasIndexBoard}
      curIndex={slides.curIndexForDisplay}
      totalIndices={indices.length}
    />
  );

  const mediaButtons = hasMediaButton && props.autoPlay && (
    <MediaButtons
      playIcon={props.playIcon}
      pauseIcon={props.pauseIcon}
      hasShadow={props.widgetsHasShadow}
      position={hasMediaButton}
      isPlaying={isPlaying}
      clickCallback={handleMediaButtonClick}
    />
  );

  const sizeButtons = hasSizeButton && (
    <SizeButtons
      minIcon={props.minIcon}
      maxIcon={props.maxIcon}
      hasShadow={props.widgetsHasShadow}
      position={hasSizeButton}
      isMaximized={isMaximized}
      clickCallback={handleSizeButtonClick}
    />
  );

  const arrowButtons = hasArrowButtons && (
    <ArrowButtons
      leftIcon={props.leftIcon}
      rightIcon={props.rightIcon}
      hasShadow={props.widgetsHasShadow}
      isRTL={props.isRTL}
      isLeftDisabled={!slides.canUpdateIndex(-increment)}
      isRightDisabled={!slides.canUpdateIndex(+increment)}
      onClickLeft={goLeft}
      onClickRight={goRight}
    />
  );

  const dotButtons = hasDotButtons && (
    <DotButtons
      isRTL={props.isRTL}
      activeIcon={props.activeIcon}
      passiveIcon={props.passiveIcon}
      hasShadow={props.widgetsHasShadow}
      position={hasDotButtons}
      curIndex={slides.curIndex}
      callbacks={goToIndexCallbacksObject}
    />
  );

  const thumbnails = hasThumbnails && (
    <Thumbnails
      isRTL={props.isRTL}
      isMaximized={isMaximized}
      slides={slidesElements}
      hasImages={hasImages}
      lazyLoad={props.lazyLoad}
      curIndex={slides.curIndex}
      callbacks={goToIndexCallbacksObject}
    />
  );

  return (
    <>
      {carouselPlaceholder}
      {maxCarouselBackground}
      <div
        ref={carouselRef}
        className={isMaximized ? maxCarouselClassName : carouselClassName}
        style={isMaximized ? {} : props.style}
        data-is-not-keyboard-user='true'
      >
        <div
          ref={slidesWrapperRef}
          className={styles.slidesWrapper}
          tabIndex={0}
          {...(props.shouldSwipeOnMouse ? mouseEventHandlers : {})}
        >
          <Slides
            minRef={slideMinRef}
            maxRef={slideMaxRef}
            slidesRef={slidesRef}
            length={nSlides}
            slides={slidesElements}
            hasImages={hasImages}
            isRTL={props.isRTL}
            lazyLoad={props.lazyLoad}
            objectFit={objectFit}
            widgetsHasShadow={props.widgetsHasShadow}
            hasCaptions={hasCaptions}
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
