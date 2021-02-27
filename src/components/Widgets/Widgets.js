import React, { Fragment, memo, useRef } from 'react';
import styles from './Widgets.module.css';
import IconButton from '../IconButton';
import useNoSwipe from '../../utils/useNoSwipe';
import PropTypes from 'prop-types';

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
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  hasShadow: PropTypes.bool.isRequired,
  isRTL: PropTypes.bool.isRequired,
  isLeftDisabled: PropTypes.bool.isRequired,
  isRightDisabled: PropTypes.bool.isRequired,
  onClickLeft: PropTypes.func.isRequired,
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
  playIcon: PropTypes.node,
  pauseIcon: PropTypes.node,
  hasShadow: PropTypes.bool.isRequired,
  position: PropTypes.oneOf([
    'topLeft',
    'topCenter',
    'topRight',
    'bottomLeft',
    'bottomCenter',
    'bottomRight'
  ]).isRequired,
  isPlaying: PropTypes.bool.isRequired,
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
  minIcon: PropTypes.node,
  maxIcon: PropTypes.node,
  hasShadow: PropTypes.bool.isRequired,
  position: PropTypes.oneOf([
    'topLeft',
    'topCenter',
    'topRight',
    'bottomLeft',
    'bottomCenter',
    'bottomRight'
  ]).isRequired,
  isMaximized: PropTypes.bool.isRequired,
  clickCallback: PropTypes.func.isRequired
};

export const IndexBoard = (props) => {
  const ref = useRef(null);

  useNoSwipe(ref);

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
      aria-label={`Slide ${props.curIndex} of ${props.totalIndices}`}
    >
      <span className={styles.text}>
        {props.curIndex} / {props.totalIndices}
      </span>
    </div>
  );
};

IndexBoard.propTypes = {
  hasShadow: PropTypes.bool.isRequired,
  position: PropTypes.oneOf([
    'topLeft',
    'topCenter',
    'topRight',
    'bottomLeft',
    'bottomCenter',
    'bottomRight'
  ]).isRequired,
  curIndex: PropTypes.number.isRequired,
  totalIndices: PropTypes.number.isRequired
};

export const DotButtons = (props) => {
  const callbacks = props.callbacks;

  return (
    <div className={styles.widgetWrapper + ' ' + styles[props.position]}>
      <div className={styles.buttonsWrapper}>
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
  activeIcon: PropTypes.node,
  passiveIcon: PropTypes.node,
  hasShadow: PropTypes.bool.isRequired,
  position: PropTypes.oneOf(['top', 'bottom']).isRequired,
  curIndex: PropTypes.number.isRequired,
  callbacks: PropTypes.shape(PropTypes.function).isRequired
};

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
    >
      <span className={styles.text}>{props.text}</span>
    </figcaption>
  );
});

Caption.propTypes = {
  text: PropTypes.string,
  position: PropTypes.oneOf(['top', 'bottom']).isRequired
};
