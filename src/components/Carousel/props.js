import PropTypes from 'prop-types';
import {
  compareToProp,
  fallbackProps,
  numberBetween,
  positiveNumber
} from '../../utils/validators';

const objectFitStyles = PropTypes.oneOf([
  'contain',
  'cover',
  'fill',
  'none',
  'scale-down'
]).isRequired;
const smallWidgetPositions = PropTypes.oneOf([
  false,
  'topLeft',
  'topCenter',
  'topRight',
  'bottomLeft',
  'bottomCenter',
  'bottomRight'
]).isRequired;

const largeWidgetPositions = PropTypes.oneOf([false, 'top', 'bottom'])
  .isRequired;

export const propTypes = {
  images: PropTypes.array && fallbackProps(['children']),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  isRTL: PropTypes.bool.isRequired,
  isLoop: PropTypes.bool.isRequired,
  index: positiveNumber(true),
  lazyLoad: PropTypes.bool.isRequired,
  objectFit: objectFitStyles,
  objectFitAtMax: objectFitStyles,
  autoPlay: PropTypes.bool.isRequired,
  autoPlayStarted: PropTypes.bool.isRequired,
  autoPlayInterval: positiveNumber(false),
  swipeThreshold: numberBetween(0, 1),
  transitionSpeed: positiveNumber(true),
  transitionDurationMin: positiveNumber(true),
  transitionDurationMax: compareToProp('>=', 'transitionDurationMin'),
  widgetsShadow: PropTypes.bool.isRequired,
  hasArrowButtons: PropTypes.bool.isRequired,
  hasMediaButton: smallWidgetPositions,
  hasSizeButton: smallWidgetPositions,
  hasDotButtons: largeWidgetPositions,
  hasIndexBoard: smallWidgetPositions,
  hasCaptions: largeWidgetPositions,
  hasThumbnails: PropTypes.bool.isRequired,
  hasArrowButtonsAtMax: PropTypes.bool.isRequired,
  hasMediaButtonAtMax: smallWidgetPositions,
  hasSizeButtonAtMax: smallWidgetPositions,
  hasDotButtonsAtMax: largeWidgetPositions,
  hasIndexBoardAtMax: smallWidgetPositions,
  hasCaptionsAtMax: largeWidgetPositions,
  hasThumbnailsAtMax: PropTypes.bool.isRequired,
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
  lazyLoad: true,
  objectFit: 'cover',
  objectFitAtMax: 'contain',
  autoPlay: true,
  autoPlayStarted: false,
  autoPlayInterval: 5000, // ms
  swipeThreshold: 0.1, // * 100%
  transitionSpeed: 1, // px/ms
  transitionDurationMin: 200, // ms
  widgetsShadow: false,
  hasMediaButton: 'topLeft',
  hasIndexBoard: 'topCenter',
  hasSizeButton: 'topRight',
  hasArrowButtons: true,
  hasDotButtons: false,
  hasCaptions: false,
  hasThumbnails: true,
  hasMediaButtonAtMax: 'topLeft',
  hasIndexBoardAtMax: 'topCenter',
  hasSizeButtonAtMax: 'topRight',
  hasArrowButtonsAtMax: true,
  hasDotButtonsAtMax: false,
  hasCaptionsAtMax: false,
  hasThumbnailsAtMax: true,
  shouldSwipeOnMouse: true,
  shouldMaximizeOnClick: false,
  shouldMinimizeOnClick: false,
  shouldMinimizeOnSwipeDown: true,
  onIndexChange: () => {}
};
