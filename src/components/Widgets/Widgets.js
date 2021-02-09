import React, { Fragment, memo, useRef } from 'react';
import PropTypes from 'prop-types';
import IconButton from '../IconButton';
import styles from './Widgets.module.css';
import useNoSwipe from '../../utils/useNoSwipe';

export const ArrowButtons = memo((props) => {
  const leftButton = !props.isLeftDisabled && (
    <div className={styles.widgetWrapper + ' ' + styles.centerLeft}>
      <IconButton
        name='left'
        label={props.isRTL ? 'Next Slide' : 'Previous Slide'}
        hasShadow={props.hasShadow}
        clickCallback={props.onClickLeft}
      />
    </div>
  );

  const rightButton = !props.isRightDisabled && (
    <div className={styles.widgetWrapper + ' ' + styles.centerRight}>
      <IconButton
        name='right'
        label={props.isRTL ? 'Previous Slide' : 'Next Slide'}
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
});

ArrowButtons.propTypes = {
  hasShadow: PropTypes.bool.isRequired,
  isRTL: PropTypes.bool.isRequired,
  isLeftDisabled: PropTypes.bool.isRequired,
  isRightDisabled: PropTypes.bool.isRequired,
  onClickLeft: PropTypes.func.isRequired,
  onClickRight: PropTypes.func.isRequired
};

export const MediaButtons = memo((props) => {
  return (
    <div className={styles.widgetWrapper + ' ' + styles[props.position]}>
      <IconButton
        name={props.isPlaying ? 'pause' : 'play'}
        label={props.isPlaying ? 'Pause Autoplay' : 'Start Autoplay'}
        hasShadow={props.hasShadow}
        clickCallback={props.clickCallback}
      />
    </div>
  );
});

MediaButtons.propTypes = {
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

export const SizeButtons = memo((props) => {
  return (
    <div className={styles.widgetWrapper + ' ' + styles[props.position]}>
      <IconButton
        name={props.isMaximized ? 'minimize' : 'maximize'}
        label={props.isMaximized ? 'Minimize Slides' : 'Maximize Slides'}
        hasShadow={props.hasShadow}
        clickCallback={props.clickCallback}
      />
    </div>
  );
});

SizeButtons.propTypes = {
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

export const IndexBoard = memo((props) => {
  return (
    <div
      className={
        styles.widgetWrapper +
        ' ' +
        styles.textWrapper +
        ' ' +
        styles[props.position] +
        (props.hasShadow ? ' ' + styles.shadow : '')
      }
    >
      <span className={styles.text}>
        {props.curIndex} / {props.totalIndices}
      </span>
    </div>
  );
});

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

export const DotButtons = memo((props) => {
  const callbacks = props.callbacks;

  return (
    <div className={styles.widgetWrapper + ' ' + styles[props.position]}>
      <div className={styles.buttonsContainer}>
        {Object.keys(callbacks).map((key, index) => (
          <IconButton
            key={index}
            name={Number(key) === props.curIndex ? 'circleLight' : 'circle'}
            hasShadow={props.hasShadow}
            label={
              Number(key) === props.curIndex
                ? `Stay on Slide Number ${index + 1}`
                : `Go to Slide Number ${index + 1}`
            }
            clickCallback={callbacks[key]}
          />
        ))}
      </div>
    </div>
  );
});

DotButtons.propTypes = {
  hasShadow: PropTypes.bool.isRequired,
  position: PropTypes.oneOf(['top', 'bottom']).isRequired,
  curIndex: PropTypes.number.isRequired,
  callbacks: PropTypes.shape(PropTypes.function).isRequired
};

export const LoadingSpinner = memo((props) => {
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
});

LoadingSpinner.propTypes = {
  hasShadow: PropTypes.bool.isRequired
};

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
