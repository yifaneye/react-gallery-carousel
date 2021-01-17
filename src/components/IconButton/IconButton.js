import React, { memo } from 'react';
import styles from './IconButton.module.css';
import PropTypes from 'prop-types';

export const IconButton = memo((props) => {
  return (
    <button
      className={`${styles.button} ${styles[props.name]}${
        props.disabled ? ' ' + styles.disabled : ''
      }`}
      aria-label={props.label}
      aria-disabled={!!props.disabled}
      onClick={props.clickCallback}
    />
  );
});

IconButton.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.oneOf([
    'left',
    'right',
    'play',
    'pause',
    'maximize',
    'minimize',
    'circle',
    'circleLight'
  ]),
  label: PropTypes.string,
  clickCallback: PropTypes.func
};
