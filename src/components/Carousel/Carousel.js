import React, {
  forwardRef,
  Fragment,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import styles from './Carousel.module.css';
import Slides from '../Slides';
import Thumbnails from '../Thumbnails';
import {
  LeftButton,
  RightButton,
  MediaButton,
  SizeButton,
  IndexBoard,
  DotButtons
} from '../Widgets';
import isSSR from '../../utils/isSSR';
import useKeys from '../../utils/useKeys';
import useSwipe from '../../utils/useSwipe';
import useTimer from '../../utils/useTimer';
import useSlides from '../../utils/useSlides';
import useKeyboard from '../../utils/useKeyboard';
import useMediaQuery from '../../utils/useMediaQuery';
import useEventListener from '../../utils/useEventListener';
import useFixedPosition from '../../utils/useFixedPosition';
import {
  MAX_SWIPE_DOWN_DISTANCE,
  WIDGET_POSITIONS,
  WIDGET_POSITIONS_WITH_RTL
} from './constants';
import ReversedMap from '../../utils/ReversedMap';
import { propTypes, defaultProps, getSettings } from './props';

const GalleryCarousel = (props, ref) => {
  /* initialize references */
  const documentRef = useRef(isSSR ? undefined : document);
  const maximizedBackgroundRef = useRef(null);
  const carouselRef = useRef(null);
  const slidesContainerRef = useRef(null);
  const slidesRef = useRef(null);
  const slideMinRef = useRef(null);
  const slideMaxRef = useRef(null);

  /* process slides */
  const hasImages = 'images' in props; // true even the 'images' prop is an empty Array
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

  /* handle current index change */
  const [, setCurIndex] = useState(slides.curIndex);

  const applyCurIndexUpdate = (curIndex) => {
    setCurIndex(curIndex);
    props.onIndexChange({
      curIndex: slides.curIndex,
      curIndexForDisplay: slides.curIndexForDisplay
    });
  };

  /* handle autoplay and reduced motion setting */
  const [
    isPlaying,
    setIsPlaying,
    { stopTimer, restartTimer }
  ] = useTimer(
    props.canAutoPlay && props.autoPlayInterval,
    props.isAutoPlaying,
    () => updateIndex(+1)
  );

  const handleMediaButtonClick = () => {
    setIsPlaying((isPlaying) => !isPlaying);
  };

  const isReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    if (isReducedMotion) setIsPlaying(false);
  }, [isReducedMotion, setIsPlaying]);

  /* set up smart pause */
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

  useEventListener(
    isSSR ? undefined : document,
    'visibilitychange',
    handleVisibilityChange
  );

  /* handle maximization/minimization and full screen */
  const [isMaximized, setIsMaximized] = useFixedPosition(
    props.isMaximized,
    slidesContainerRef
  );

  const handleSizeButtonClick = () => {
    setIsMaximized((isMaximized) => !isMaximized);
  };

  /* handle UI updates */
  const applyTransitionDuration = (
    displacementX = 0,
    speed = props.transitionSpeed,
    hasToUpdate = true
  ) => {
    if (!props.hasTransition) return;
    if (isReducedMotion) return;

    // calculate transition duration
    const swipedDistance = Math.abs(displacementX);
    const transitionDistance =
      hasToUpdate && slidesRef.current
        ? Math.abs(slidesRef.current.clientWidth - swipedDistance)
        : swipedDistance;
    speed = hasToUpdate ? speed : props.swipeRollbackSpeed;
    let duration = transitionDistance / speed;

    // flatten transitionDurations
    if (duration > props.transitionDurationLimit / 2)
      duration =
        (Math.atan((2 * duration) / props.transitionDurationLimit) *
          props.transitionDurationLimit *
          2) /
        Math.PI;

    // bound duration to a range
    if (props.transitionDurationMin)
      duration = Math.max(duration, props.transitionDurationMin);

    // transitionDurationMax has precedence over transitionDurationMin
    if (props.transitionDurationMax)
      duration = Math.min(duration, props.transitionDurationMax);

    // make duration greater or equal to autoPlayInterval
    if (isPlaying && duration > props.autoPlayInterval)
      duration = props.autoPlayInterval * 1;

    // apply transition duration for the period of duration
    if (slidesRef.current)
      slidesRef.current.style.transitionDuration = `${duration}ms`;
    setTimeout(() => {
      // revert temporary style changes made on the slides for transition and looping
      if (slidesRef.current) slidesRef.current.style.transitionDuration = null;
    }, duration);
  };

  // handle touch swipe down specifically
  const applyTransitionY = (displacementX = 0, displacementY = 0) => {
    // do not update the maximized carousel when it is above its original position
    // to hint the user that swiping up will not be able to minimize the carousel
    const distance = displacementY > 0 ? displacementY : 0;
    const portion = 1 - distance / MAX_SWIPE_DOWN_DISTANCE;

    // move and scale the element
    if (carouselRef.current) {
      // check whether the update is necessary
      if (
        carouselRef.current.style.transform !==
        `translate(${displacementX}px, ${displacementY}px) scale(${portion})`
      ) {
        carouselRef.current.style.transform = `translate(${displacementX}px, ${displacementY}px) scale(${portion})`;
      }
    }

    // update opacity of the background
    if (maximizedBackgroundRef.current) {
      // check whether the update is necessary
      if (maximizedBackgroundRef.current.style.opacity !== portion) {
        maximizedBackgroundRef.current.style.opacity = portion;
      }
    }
  };

  const applyTransitionX = useCallback(
    (displacementX = 0) => {
      const targetPosition =
        displacementX === 0
          ? `${-100 * slides.curIndex * increment}%`
          : `calc(${-100 * slides.curIndex * increment}% + ${displacementX}px)`;
      // move the element
      if (slidesRef.current) {
        slidesRef.current.style.transform = `translateX(${targetPosition})`;
      }
    },
    [slides.curIndex, increment]
  );

  // change to the current slide before browser paints
  useEffect(() => applyTransitionX(), [applyTransitionX]);

  /* handle implicit current index update (e.g. +1 or -1) */
  const shouldCalibrateIndex = props.isLoop && nSlides > 1;

  const handleSwipeMoveX = (displacementX) => {
    props.onSwipeMoveX(displacementX);
    // stop the timer for autoplay if there is a timer
    // should not use setIsPlaying(false) here since it will update the icon in the media button
    if (props.canAutoPlay) stopTimer();

    const change = -displacementX * increment;

    // calibrate index for looping of the carousel
    if (shouldCalibrateIndex) {
      if (slides.isMinIndex() && change < 0 && slideMaxRef.current) {
        slideMaxRef.current.style.transform = `translateX(${slidesMin})`;
      } else if (slides.isMaxIndex() && change > 0 && slideMinRef.current) {
        slideMinRef.current.style.transform = `translateX(${slidesMax})`;
      } else {
        if (slideMinRef.current) slideMinRef.current.style.transform = null;
        if (slideMaxRef.current) slideMaxRef.current.style.transform = null;
      }
    }

    // update UI
    applyTransitionX(displacementX);
  };

  const updateIndex = (change, displacementX = 0, speed) => {
    // restart the timer for autoplay if there is a timer and the index update is being roll-backed
    if (props.canAutoPlay && change === 0) restartTimer();

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
      } // if change === 0 then the adjacent slides shall be kept in place for the rollback transition
    }

    // update UI
    if (slides.calibrateIndex(change) && shouldCalibrateIndex) {
      // remove carry-over transitionDuration
      if (slidesRef.current) slidesRef.current.style.transitionDuration = null;
      applyTransitionX(displacementX);
    }

    slides.updateIndex(change);
    applyTransitionDuration(displacementX, speed, change !== 0);
    applyTransitionY(0, 0);
    applyTransitionX();
    applyCurIndexUpdate(slides.curIndex);
  };

  const rollBackIndexUpdate = () => updateIndex(0, 0, 0);

  useEventListener(
    isSSR ? undefined : window,
    'orientationchange',
    rollBackIndexUpdate
  );

  /* handle explicit current index update (e.g. go to slide number 16) */
  const goToIndex = (index) => {
    // set both the first and the last slide back into their respective original places
    if (slideMinRef.current) slideMinRef.current.style.transform = null;
    if (slideMaxRef.current) slideMaxRef.current.style.transform = null;

    // update carousel
    slides.goToIndex(index);
    applyTransitionX();
    applyCurIndexUpdate(slides.curIndex);
  };

  // set up callbacks (i.e. 1 callback for each dotButton and each thumbnail)
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

  useKeys(carouselRef, {
    ArrowLeft: goLeft,
    ArrowRight: goRight,
    /* can not use useEnter hook here to mimic user click, since a click
    on slidesContainer should not and will not trigger anything */
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
    props.onSwipeMoveY(displacementX, displacementY);
    if (!props.shouldMinimizeOnSwipeDown) return;
    if (isMaximizedRef.current) applyTransitionY(displacementX, displacementY);
  };

  const handleSwipeEndDown = () => {
    props.onSwipeEndDown();
    if (!props.shouldMinimizeOnSwipeDown) return;
    applyTransitionY(0, 0);
    setIsMaximized(() => false);
    rollBackIndexUpdate();
  };

  const handleTap = () => {
    props.onTap();
    if (isMaximizedRef.current && props.shouldMinimizeOnClick)
      setIsMaximized(() => false);
    else if (!isMaximizedRef.current && props.shouldMaximizeOnClick)
      setIsMaximized(() => true);
  };

  const mouseEventHandlers = useSwipe(
    slidesContainerRef,
    props.swipeThreshold,
    {
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
    }
  );
  // touch event handlers are already added to slidesContainerRef by useSwipe hook at this point

  /* process class names */
  const propsClassName = 'className' in props ? ' ' + props.className : '';
  const galleryClassName = hasImages ? ' ' + styles.gallery : '';
  const carouselClassName = styles.carousel + propsClassName + galleryClassName;
  const maxCarouselClassName = styles.maxCarousel + galleryClassName;

  /* process components for maximized carousel */
  // placeholder to be placed at the carousel's non-maximized position
  const carouselPlaceholder = isMaximized && (
    <div className={carouselClassName} style={props.style} />
  );

  // background to be placed behind the maximized carousel
  const maxCarouselBackground = isMaximized && (
    <div
      ref={maximizedBackgroundRef}
      className={maxCarouselClassName}
      style={'zIndexAtMax' in props ? { zIndex: props.zIndexAtMax } : {}}
    />
  );

  /* process settings */
  const settings = getSettings(
    props,
    ['objectFit', 'hasCaptions', 'hasThumbnails'],
    isMaximized
  );

  const widgetSettings = getSettings(
    props,
    [
      'hasLeftButton',
      'hasRightButton',
      'hasMediaButton',
      'hasSizeButton',
      'hasDotButtons',
      'hasIndexBoard'
    ],
    isMaximized
  );

  const leftButton = widgetSettings.hasLeftButton && (
    <LeftButton
      position={widgetSettings.hasLeftButton}
      isDisabled={!slides.canUpdateIndex(-increment)}
      icon={props.leftIcon}
      isRTL={props.isRTL}
      hasShadow={props.widgetsHasShadow}
      onClick={goLeft}
    />
  );

  const rightButton = widgetSettings.hasRightButton && (
    <RightButton
      position={widgetSettings.hasRightButton}
      isDisabled={!slides.canUpdateIndex(+increment)}
      icon={props.rightIcon}
      isRTL={props.isRTL}
      hasShadow={props.widgetsHasShadow}
      onClick={goRight}
    />
  );

  const mediaButton = widgetSettings.hasMediaButton && props.canAutoPlay && (
    <MediaButton
      position={widgetSettings.hasMediaButton}
      isPlaying={isPlaying}
      playIcon={props.playIcon}
      pauseIcon={props.pauseIcon}
      hasShadow={props.widgetsHasShadow}
      onClick={handleMediaButtonClick}
    />
  );

  const sizeButton = widgetSettings.hasSizeButton && (
    <SizeButton
      position={widgetSettings.hasSizeButton}
      isMaximized={isMaximized}
      minIcon={props.minIcon}
      maxIcon={props.maxIcon}
      hasShadow={props.widgetsHasShadow}
      onClick={handleSizeButtonClick}
    />
  );

  const indexBoard = widgetSettings.hasIndexBoard && (
    <IndexBoard
      position={widgetSettings.hasIndexBoard}
      hasShadow={props.widgetsHasShadow}
      curIndex={slides.curIndexForDisplay}
      totalIndices={indices.length}
    />
  );

  const dotButtons = widgetSettings.hasDotButtons && (
    <DotButtons
      callbacks={goToIndexCallbacksObject}
      position={widgetSettings.hasDotButtons}
      isRTL={props.isRTL}
      curIndex={slides.curIndex}
      activeIcon={props.activeIcon}
      passiveIcon={props.passiveIcon}
      hasShadow={props.widgetsHasShadow}
    />
  );

  const thumbnails = settings.hasThumbnails && (
    <Thumbnails
      isRTL={props.isRTL}
      isMaximized={isMaximized}
      width={props.thumbnailWidth}
      height={props.thumbnailHeight}
      slides={slidesElements}
      hasImages={hasImages}
      shouldLazyLoad={props.shouldLazyLoad}
      curIndex={slides.curIndex}
      callbacks={goToIndexCallbacksObject}
    />
  );

  // organize and sort the widgets
  const widgetsObj = {
    hasLeftButton: leftButton,
    hasRightButton: rightButton,
    hasMediaButton: mediaButton,
    hasSizeButton: sizeButton,
    hasDotButtons: dotButtons,
    hasIndexBoard: indexBoard
  };
  const positionsToWidgets = new ReversedMap(widgetSettings);
  const positions = props.isRTL ? WIDGET_POSITIONS_WITH_RTL : WIDGET_POSITIONS;
  const widgets = (
    <>
      {positions.map(
        (position, index) =>
          widgetsObj[positionsToWidgets.get(position)] && (
            <Fragment key={index}>
              {
                widgetsObj[
                  positionsToWidgets.get(position).replace(/AtMax$/, '')
                ]
              }
            </Fragment>
          )
      )}
    </>
  );

  /* provide handlers for controlling the carousel in an imperative way */
  useImperativeHandle(ref, () => ({
    play: () => setIsPlaying(() => true),
    pause: () => setIsPlaying(() => false),
    toggleIsPlaying: () => setIsPlaying((isPlaying) => !isPlaying),
    maximize: () => setIsMaximized(() => true),
    minimize: () => setIsMaximized(() => false),
    toggleIsMaximized: () => setIsMaximized((isMaximized) => !isMaximized),
    goLeft: goLeft,
    goRight: goRight,
    goToIndex: goToIndex
  }));

  return (
    <>
      {carouselPlaceholder}
      {maxCarouselBackground}
      <div
        ref={carouselRef}
        className={isMaximized ? maxCarouselClassName : carouselClassName}
        style={
          isMaximized
            ? 'zIndexAtMax' in props
              ? { zIndex: props.zIndexAtMax }
              : {}
            : props.style
        }
        data-is-not-keyboard-user='true'
      >
        <div className={styles.carouselInner}>
          <div
            ref={slidesContainerRef}
            className={styles.slidesContainer}
            tabIndex={0}
            {...(props.shouldSwipeOnMouse ? mouseEventHandlers : {})}
          >
            <Slides
              minRef={slideMinRef}
              maxRef={slideMaxRef}
              slidesRef={slidesRef}
              slidesContainerRef={slidesContainerRef}
              length={nSlides}
              slides={slidesElements}
              hasImages={hasImages}
              isRTL={props.isRTL}
              shouldLazyLoad={props.shouldLazyLoad}
              objectFit={settings.objectFit}
              widgetsHasShadow={props.widgetsHasShadow}
              hasCaptions={settings.hasCaptions}
              curIndex={slides.curIndex}
            />
          </div>
          {widgets}
        </div>
        {thumbnails}
      </div>
    </>
  );
};

export const Carousel = forwardRef(GalleryCarousel);

Carousel.displayName = 'Carousel';
Carousel.propTypes = propTypes;
Carousel.defaultProps = defaultProps;
