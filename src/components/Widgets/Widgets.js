import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import IconButton from '../IconButton';
import styles from './Widgets.module.css';

export const ArrowButtons = memo((props) => {
  const leftButton = !props.isLeftDisabled && (
    <div className={styles.widgetWrapper + ' ' + styles.centerLeft}>
      <IconButton
        name='left'
        label={props.isRTL ? 'Next Slide' : 'Previous Slide'}
        clickCallback={props.onClickLeft}
      />
    </div>
  );

  const rightButton = !props.isRightDisabled && (
    <div className={styles.widgetWrapper + ' ' + styles.centerRight}>
      <IconButton
        name='right'
        label={props.isRTL ? 'Previous Slide' : 'Next Slide'}
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
  isRTL: PropTypes.bool.isRequired,
  isLeftDisabled: PropTypes.bool.isRequired,
  isRightDisabled: PropTypes.bool.isRequired,
  onClickLeft: PropTypes.func.isRequired,
  onClickRight: PropTypes.func.isRequired
};

export const MediaButtons = memo((props) => {
  return (
    <div className={styles.widgetWrapper + ' ' + styles.topCenter}>
      <IconButton
        name={props.isPlaying ? 'pause' : 'play'}
        label={props.isPlaying ? 'Pause Autoplay' : 'Start Autoplay'}
        clickCallback={props.clickCallback}
      />
    </div>
  );
});

MediaButtons.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  clickCallback: PropTypes.func.isRequired
};

export const SizeButtons = memo((props) => {
  return (
    <div className={styles.widgetWrapper + ' ' + styles.topRight}>
      <IconButton
        name={props.isMaximized ? 'minimize' : 'maximize'}
        label={props.isMaximized ? 'Minimize Slides' : 'Maximize Slides'}
        clickCallback={props.clickCallback}
      />
    </div>
  );
});

SizeButtons.propTypes = {
  isMaximized: PropTypes.bool.isRequired,
  clickCallback: PropTypes.func.isRequired
};

export const IndexBoard = memo((props) => {
  return (
    <div
      className={
        styles.widgetWrapper + ' ' + styles.textWrapper + ' ' + styles.topLeft
      }
    >
      <div className={styles.text}>
        {props.curIndex} / {props.totalIndices}
      </div>
    </div>
  );
});

IndexBoard.propTypes = {
  curIndex: PropTypes.number.isRequired,
  totalIndices: PropTypes.number.isRequired
};

export const IndicatorButtons = memo((props) => {
  const callbacks = props.callbacks;

  return (
    <div className={styles.widgetWrapper + ' ' + styles.bottomCenter}>
      <div className={styles.buttonsContainer}>
        {Object.keys(callbacks).map((key, index) => (
          <IconButton
            key={index}
            name={Number(key) === props.curIndex ? 'circleLight' : 'circle'}
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

IndicatorButtons.propTypes = {
  curIndex: PropTypes.number.isRequired,
  callbacks: PropTypes.shape(PropTypes.function).isRequired
};
