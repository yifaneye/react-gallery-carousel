import React, { memo, useRef } from 'react';
import styles from './Widgets.module.css';
import IconButton from '../IconButton';
import useNoSwipe from '../../utils/useNoSwipe';
import PropTypes from 'prop-types';
import {
  smallWidgetPositions,
  largeWidgetPositions
} from '../../utils/validators';

const arrowButtonPropTypes = {
  position: smallWidgetPositions.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  icon: PropTypes.node,
  isRTL: PropTypes.bool.isRequired,
  hasShadow: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export const LeftButton = (props) => {
  return (
    <div
      className={
        styles.widgetWrapper +
        ' ' +
        styles[props.position] +
        `${props.isDisabled ? ' ' + styles.disabled : ''}`
      }
    >
      <IconButton
        icon={props.icon}
        name='left'
        hasShadow={props.hasShadow}
        label={props.isRTL ? 'Go to Next Slide' : 'Go to Previous Slide'}
        onClick={props.isDisabled ? undefined : props.onClick}
      />
    </div>
  );
};

LeftButton.propTypes = arrowButtonPropTypes;

export const RightButton = (props) => {
  return (
    <div
      className={
        styles.widgetWrapper +
        ' ' +
        styles[props.position] +
        `${props.isDisabled ? ' ' + styles.disabled : ''}`
      }
    >
      <IconButton
        icon={props.icon}
        name='right'
        hasShadow={props.hasShadow}
        label={props.isRTL ? 'Go to Previous Slide' : 'Go to Next Slide'}
        onClick={props.isDisabled ? undefined : props.onClick}
      />
    </div>
  );
};

RightButton.propTypes = arrowButtonPropTypes;

export const MediaButton = (props) => {
  return (
    <div className={styles.widgetWrapper + ' ' + styles[props.position]}>
      <IconButton
        icon={props.isPlaying ? props.pauseIcon : props.playIcon}
        name={props.isPlaying ? 'pause' : 'play'}
        hasShadow={props.hasShadow}
        label={props.isPlaying ? 'Pause Autoplay' : 'Start Autoplay'}
        onClick={props.onClick}
      />
    </div>
  );
};

MediaButton.propTypes = {
  position: smallWidgetPositions.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  pauseIcon: PropTypes.node,
  playIcon: PropTypes.node,
  hasShadow: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export const SizeButton = (props) => {
  return (
    <div className={styles.widgetWrapper + ' ' + styles[props.position]}>
      <IconButton
        icon={props.isMaximized ? props.minIcon : props.maxIcon}
        name={props.isMaximized ? 'min' : 'max'}
        hasShadow={props.hasShadow}
        label={props.isMaximized ? 'Minimize Slides' : 'Maximize Slides'}
        onClick={props.onClick}
      />
    </div>
  );
};

SizeButton.propTypes = {
  position: smallWidgetPositions.isRequired,
  isMaximized: PropTypes.bool.isRequired,
  minIcon: PropTypes.node,
  maxIcon: PropTypes.node,
  hasShadow: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export const IndexBoard = (props) => {
  const ref = useRef(null);

  return (
    <div
      ref={ref}
      className={
        styles.widgetWrapper +
        ' ' +
        styles.textWrapper +
        ' ' +
        styles[props.position] +
        (props.hasShadow ? ' ' + styles.shadow : '')
      }
      tabIndex='-1'
    >
      <span className={styles.text}>
        {/* make curIndex and totalIndices fallback to 0 */}
        {props.curIndex || 0} / {props.totalIndices || 0}
      </span>
    </div>
  );
};

IndexBoard.propTypes = {
  position: smallWidgetPositions.isRequired,
  hasShadow: PropTypes.bool.isRequired,
  curIndex: PropTypes.number.isRequired,
  totalIndices: PropTypes.number.isRequired
};

export const DotButtons = (props) => {
  const callbacks = props.callbacks;

  return (
    <div className={styles.widgetWrapper + ' ' + styles[props.position]}>
      <div
        className={
          styles.buttonsWrapper + `${props.isRTL ? ' ' + styles.RTL : ''}`
        }
      >
        {Object.keys(callbacks).map((key, index) => (
          <IconButton
            key={index}
            icon={
              Number(key) === props.curIndex
                ? props.activeIcon
                : props.passiveIcon
            }
            name={Number(key) === props.curIndex ? 'active' : 'passive'}
            label={
              Number(key) === props.curIndex
                ? `Stay on Slide ${index + 1}`
                : `Go to Slide ${index + 1}`
            }
            hasShadow={props.hasShadow}
            onClick={callbacks[key]}
          />
        ))}
      </div>
    </div>
  );
};

DotButtons.propTypes = {
  callbacks: PropTypes.objectOf(PropTypes.func).isRequired,
  position: largeWidgetPositions.isRequired,
  isRTL: PropTypes.bool.isRequired,
  curIndex: PropTypes.number.isRequired,
  activeIcon: PropTypes.node,
  passiveIcon: PropTypes.node,
  hasShadow: PropTypes.bool.isRequired
};

// memo is useful here
export const Caption = memo((props) => {
  const captionRef = useRef(null);

  // allow the user to select text using cursor or finger
  useNoSwipe(captionRef);

  return (
    <figcaption
      ref={captionRef}
      className={
        styles.widgetWrapper +
        ' ' +
        styles.captionWrapper +
        ' ' +
        styles[props.position] +
        ' ' +
        (props.hasShadow ? ' ' + styles.shadow : '')
      }
      tabIndex='-1'
    >
      <span className={styles.text}>{props.text}</span>
    </figcaption>
  );
});

Caption.type.displayName = 'Caption';

Caption.propTypes = {
  position: largeWidgetPositions.isRequired,
  hasShadow: PropTypes.bool.isRequired,
  text: PropTypes.string
};
