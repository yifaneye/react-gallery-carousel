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
  isRTL: PropTypes.bool.isRequired,
  isLoop: PropTypes.bool.isRequired,
  isMaximized: PropTypes.bool.isRequired,
  index: positiveNumber(true),
  lazyLoad: PropTypes.bool.isRequired,
  objectFit: objectFitStyles.isRequired,
  objectFitAtMax: objectFitStyles.isRequired,
  autoPlay: PropTypes.bool.isRequired,
  autoPlayStarted: PropTypes.bool.isRequired,
  autoPlayInterval: positiveNumber(false),
  swipeThreshold: numberBetween(0, 1),
  hasTransition: PropTypes.bool.isRequired,
  transitionSpeed: positiveNumber(true),
  transitionDurationMin: positiveNumber(true),
  transitionDurationMax: compareToProp('>=', 'transitionDurationMin'),
  widgetsHasShadow: PropTypes.bool.isRequired,
  hasArrowButtons: PropTypes.bool.isRequired,
  hasMediaButton: smallWidgetPositions.isRequired,
  hasSizeButton: smallWidgetPositions.isRequired,
  hasIndexBoard: smallWidgetPositions.isRequired,
  hasDotButtons: largeWidgetPositions.isRequired,
  hasCaptions: largeWidgetPositions.isRequired,
  hasThumbnails: PropTypes.bool.isRequired,
  hasArrowButtonsAtMax: PropTypes.bool,
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
  shouldSwipeOnMouse: PropTypes.bool.isRequired,
  shouldMaximizeOnClick: PropTypes.bool.isRequired,
  shouldMinimizeOnClick: PropTypes.bool.isRequired,
  shouldMinimizeOnSwipeDown: PropTypes.bool.isRequired,
  onIndexChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object
};

export const defaultProps = {
  index: 0,
  isRTL: false,
  isLoop: true,
  isMaximized: false,
  lazyLoad: true,
  objectFit: 'cover',
  objectFitAtMax: 'contain',
  autoPlay: true,
  autoPlayStarted: false,
  autoPlayInterval: 5000, // ms
  swipeThreshold: 0.1, // * 100%
  hasTransition: true,
  transitionSpeed: 1, // px/ms
  transitionDurationMin: 200, // ms
  widgetsHasShadow: false,
  hasMediaButton: 'topLeft',
  hasIndexBoard: 'topCenter',
  hasSizeButton: 'topRight',
  hasArrowButtons: true,
  hasDotButtons: false,
  hasCaptions: false,
  hasThumbnails: true,
  shouldSwipeOnMouse: true,
  shouldMaximizeOnClick: false,
  shouldMinimizeOnClick: false,
  shouldMinimizeOnSwipeDown: true,
  onIndexChange: () => {}
};
