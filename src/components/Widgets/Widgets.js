import React, { Fragment, memo, useRef } from 'react';
import styles from './Widgets.module.css';
import IconButton from '../IconButton';
import useNoSwipe from '../../utils/useNoSwipe';
import PropTypes from 'prop-types';
import {
  smallWidgetPositions,
  largeWidgetPositions
} from '../../utils/validators';

export const ArrowButtons = (props) => {
  const leftButton = !props.isLeftDisabled && (
    <div className={styles.widgetWrapper + ' ' + styles.centerLeft}>
      <IconButton
        icon={props.leftIcon}
        name='left'
        label={props.isRTL ? 'Go to Next Slide' : 'Go to Previous Slide'}
        hasShadow={props.hasShadow}
        clickCallback={props.onClickLeft}
      />
    </div>
  );

  const rightButton = !props.isRightDisabled && (
    <div className={styles.widgetWrapper + ' ' + styles.centerRight}>
      <IconButton
        icon={props.rightIcon}
        name='right'
        label={props.isRTL ? 'Go to Previous Slide' : 'Go to Next Slide'}
        hasShadow={props.hasShadow}
        clickCallback={props.onClickRight}
      />
    </div>
  );

  return (
    <Fragment>
      {leftButton}
      {rightButton}
    </Fragment>
  );
};

ArrowButtons.propTypes = {
  isLeftDisabled: PropTypes.bool.isRequired,
  leftIcon: PropTypes.node,
  isRTL: PropTypes.bool.isRequired,
  hasShadow: PropTypes.bool.isRequired,
  onClickLeft: PropTypes.func.isRequired,
  isRightDisabled: PropTypes.bool.isRequired,
  rightIcon: PropTypes.node,
  onClickRight: PropTypes.func.isRequired
};

export const MediaButtons = (props) => {
  return (
    <div className={styles.widgetWrapper + ' ' + styles[props.position]}>
      <IconButton
        icon={props.isPlaying ? props.pauseIcon : props.playIcon}
        name={props.isPlaying ? 'pause' : 'play'}
        label={props.isPlaying ? 'Pause Autoplay' : 'Start Autoplay'}
        hasShadow={props.hasShadow}
        clickCallback={props.clickCallback}
      />
    </div>
  );
};

MediaButtons.propTypes = {
  position: smallWidgetPositions.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  pauseIcon: PropTypes.node,
  playIcon: PropTypes.node,
  hasShadow: PropTypes.bool.isRequired,
  clickCallback: PropTypes.func.isRequired
};

export const SizeButtons = (props) => {
  return (
    <div className={styles.widgetWrapper + ' ' + styles[props.position]}>
      <IconButton
        icon={props.isMaximized ? props.minIcon : props.maxIcon}
        name={props.isMaximized ? 'min' : 'max'}
        label={props.isMaximized ? 'Minimize Slides' : 'Maximize Slides'}
        hasShadow={props.hasShadow}
        clickCallback={props.clickCallback}
      />
    </div>
  );
};

SizeButtons.propTypes = {
  position: smallWidgetPositions.isRequired,
  isMaximized: PropTypes.bool.isRequired,
  minIcon: PropTypes.node,
  maxIcon: PropTypes.node,
  hasShadow: PropTypes.bool.isRequired,
  clickCallback: PropTypes.func.isRequired
};

export const IndexBoard = (props) => {
  const ref = useRef(null);

  // useNoSwipe(ref);

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
        {props.curIndex} / {props.totalIndices}
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
            clickCallback={callbacks[key]}
          />
        ))}
      </div>
    </div>
  );
};

DotButtons.propTypes = {
  callbacks: PropTypes.shape(PropTypes.function).isRequired,
  position: largeWidgetPositions.isRequired,
  isRTL: PropTypes.bool.isRequired,
  curIndex: PropTypes.number.isRequired,
  activeIcon: PropTypes.node,
  passiveIcon: PropTypes.node,
  hasShadow: PropTypes.bool.isRequired
};

/*
// not used for performance gains
export const LoadingSpinner = (props) => {
  return (
    <div className={styles.centerWrapper}>
      <div className={styles.widgetWrapper + ' ' + styles.centerCenter}>
        <div
          className={
            styles.spinner + (props.hasShadow ? ' ' + styles.shadow : '')
          }
          aria-label='Loading'
        />
      </div>
    </div>
  );
};

LoadingSpinner.propTypes = {
  hasShadow: PropTypes.bool.isRequired
};
*/

// memo is useful here
export const Caption = memo((props) => {
  const captionRef = useRef(null);

  // allow the user to select hasCaptions text using cursor or finger
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

Caption.propTypes = {
  position: largeWidgetPositions.isRequired,
  hasShadow: PropTypes.bool.isRequired,
  text: PropTypes.string
};
