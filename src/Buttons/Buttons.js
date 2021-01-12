import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '../IconButton/IconButton';
import styles from './Buttons.module.css';

export const ArrowButtons = memo((props) => {
  if (props.disabled) return null;

  return (
    <Fragment>
      <div className={styles.buttonWrapper + ' ' + styles.centerLeft}>
        <IconButton
          name='left'
          label='Previous Slide'
          clickCallback={props.onClickLeft}
        />
      </div>
      <div className={styles.buttonWrapper + ' ' + styles.centerRight}>
        <IconButton
          name='right'
          label='Next Slide'
          clickCallback={props.onClickRight}
        />
      </div>
    </Fragment>
  );
});

ArrowButtons.propTypes = {
  disabled: PropTypes.bool,
  onClickLeft: PropTypes.func.isRequired,
  onClickRight: PropTypes.func.isRequired
};

export const MediaButtons = (props) => {
  if (props.disabled) return null;

  return (
    <div className={styles.buttonWrapper + ' ' + styles.topLeft}>
      <IconButton
        name={props.isPlaying ? 'pause' : 'play'}
        label={props.isPlaying ? 'Pause Autoplay' : 'Start Autoplay'}
        clickCallback={props.clickCallback}
      />
    </div>
  );
};

MediaButtons.propTypes = {
  disabled: PropTypes.bool,
  isPlaying: PropTypes.bool.isRequired,
  clickCallback: PropTypes.func.isRequired
};
