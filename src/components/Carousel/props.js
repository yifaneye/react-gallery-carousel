import PropTypes from 'prop-types';
import {
  compareToProp,
  fallbackProps,
  numberBetween,
  positiveNumber
} from '../../utils/validators';

const widgetPositions = PropTypes.oneOf([
  false,
  'topLeft',
  'topCenter',
  'topRight',
  'bottomLeft',
  'bottomCenter',
  'bottomRight'
]).isRequired;

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
  objectFit: PropTypes.oneOf([
    'contain',
    'cover',
    'fill',
    'none',
    'scale-down'
  ]),
  autoPlay: PropTypes.bool.isRequired,
  autoPlayStarted: PropTypes.bool.isRequired,
  autoPlayInterval: positiveNumber(false),
  swipeThreshold: numberBetween(0, 1),
  transitionSpeed: positiveNumber(true),
  transitionDurationMin: positiveNumber(true),
  transitionDurationMax: compareToProp('>=', 'transitionDurationMin'),
  widgetsShadow: PropTypes.bool.isRequired,
  mediaButtons: widgetPositions,
  indexBoard: widgetPositions,
  sizeButtons: widgetPositions,
  arrowButtons: PropTypes.bool.isRequired,
  dotButtons: PropTypes.oneOf([false, 'top', 'bottom']).isRequired,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  playIcon: PropTypes.node,
  pauseIcon: PropTypes.node,
  minIcon: PropTypes.node,
  maxIcon: PropTypes.node,
  activeIcon: PropTypes.node,
  passiveIcon: PropTypes.node,
  caption: PropTypes.oneOf([false, 'top', 'bottom']).isRequired,
  thumbnails: PropTypes.bool.isRequired,
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
  autoPlay: true,
  autoPlayStarted: false,
  autoPlayInterval: 5000, // ms
  swipeThreshold: 0.1, // * 100%
  transitionSpeed: 1, // px/ms
  transitionDurationMin: 200, // ms
  widgetsShadow: false,
  mediaButtons: 'topLeft',
  indexBoard: 'topCenter',
  sizeButtons: 'topRight',
  arrowButtons: true,
  dotButtons: false,
  caption: false,
  thumbnails: true,
  shouldSwipeOnMouse: true,
  shouldMaximizeOnClick: false,
  shouldMinimizeOnClick: false,
  shouldMinimizeOnSwipeDown: true,
  onIndexChange: () => {}
};
