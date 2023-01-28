import PropTypes from 'prop-types';
import {
  compareToProp,
  fallbackProps,
  numberBetween,
  positiveNumber,
  objectFitStyles,
  smallWidgetPositions,
  largeWidgetPositions
} from '../../utils/validators';

export const propTypes = {
  images: PropTypes.array && fallbackProps(['children']),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  thumbnails: PropTypes.arrayOf(PropTypes.node),
  isRTL: PropTypes.bool.isRequired,
  isLoop: PropTypes.bool.isRequired,
  isMaximized: PropTypes.bool.isRequired,
  index: positiveNumber(true),
  shouldLazyLoad: PropTypes.bool.isRequired,
  canAutoPlay: PropTypes.bool.isRequired,
  isAutoPlaying: PropTypes.bool.isRequired,
  autoPlayInterval: positiveNumber(false),
  hasTransition: PropTypes.bool.isRequired,
  swipeThreshold: numberBetween(0, 1),
  swipeRollbackSpeed: positiveNumber(true),
  transitionSpeed: positiveNumber(true),
  transitionDurationLimit: positiveNumber(true),
  transitionDurationMin: positiveNumber(true),
  transitionDurationMax: compareToProp('>=', 'transitionDurationMin'),
  widgetsHasShadow: PropTypes.bool.isRequired,
  hasLeftButton: smallWidgetPositions.isRequired,
  hasRightButton: smallWidgetPositions.isRequired,
  hasMediaButton: smallWidgetPositions.isRequired,
  hasSizeButton: smallWidgetPositions.isRequired,
  hasIndexBoard: smallWidgetPositions.isRequired,
  hasDotButtons: largeWidgetPositions.isRequired,
  hasCaptions: largeWidgetPositions.isRequired,
  hasThumbnails: PropTypes.bool.isRequired,
  hasLeftButtonAtMax: smallWidgetPositions,
  hasRightButtonAtMax: smallWidgetPositions,
  hasMediaButtonAtMax: smallWidgetPositions,
  hasSizeButtonAtMax: smallWidgetPositions,
  hasIndexBoardAtMax: smallWidgetPositions,
  hasDotButtonsAtMax: largeWidgetPositions,
  hasCaptionsAtMax: largeWidgetPositions,
  hasThumbnailsAtMax: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  playIcon: PropTypes.node,
  pauseIcon: PropTypes.node,
  minIcon: PropTypes.node,
  maxIcon: PropTypes.node,
  activeIcon: PropTypes.node,
  passiveIcon: PropTypes.node,
  elements: PropTypes.node,
  shouldSwipeOnMouse: PropTypes.bool.isRequired,
  shouldMaximizeOnClick: PropTypes.bool.isRequired,
  shouldMinimizeOnClick: PropTypes.bool.isRequired,
  shouldMinimizeOnSwipeDown: PropTypes.bool.isRequired,
  onIndexChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  objectFit: objectFitStyles.isRequired,
  objectFitAtMax: objectFitStyles.isRequired,
  thumbnailWidth: PropTypes.string,
  thumbnailHeight: PropTypes.string,
  zIndexAtMax: PropTypes.number
};

export const defaultProps = {
  index: 0,
  isRTL: false,
  isLoop: true,
  isMaximized: false,
  shouldLazyLoad: true,
  canAutoPlay: true,
  isAutoPlaying: false,
  autoPlayInterval: 5000, // ms
  hasTransition: true,
  swipeThreshold: 0.1, // * 100%
  swipeRollbackSpeed: 0.1, // px/ms
  transitionSpeed: 1, // px/ms
  transitionDurationMin: 250, // ms
  transitionDurationLimit: 750, // ms
  widgetsHasShadow: false,
  hasLeftButton: 'centerLeft',
  hasRightButton: 'centerRight',
  hasMediaButton: 'topLeft',
  hasSizeButton: 'topRight',
  hasIndexBoard: 'topCenter',
  hasDotButtons: false,
  hasCaptions: false,
  hasThumbnails: true,
  shouldSwipeOnMouse: true,
  shouldMaximizeOnClick: false,
  shouldMinimizeOnClick: false,
  shouldMinimizeOnSwipeDown: true,
  onIndexChange: () => {},
  onSwipeMoveX: () => {},
  onSwipeMoveY: () => {},
  onSwipeEndDown: () => {},
  onTap: () => {},
  objectFit: 'cover',
  objectFitAtMax: 'contain'
};

// get props according to whether the carousel isMaximized
export const getSettings = (props, propNames, isMaximized) => {
  const newProps = propNames.map((propName) => {
    if (!isMaximized) return props[propName];
    const propNameAtMax = propName + 'AtMax';
    // only take the props[propNameAtMax] if it is specified
    if (propNameAtMax in props) return props[propNameAtMax];
    // take the props[propName] as a fallback
    return props[propName];
  });
  return propNames.reduce(
    (obj, key, index) => ({ ...obj, [key]: newProps[index] }),
    {}
  );
};
