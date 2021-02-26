import React from 'react';
import styles from './IconButton.module.css';
import PropTypes from 'prop-types';

export const IconButton = (props) => {
  return (
    <button
      className={`${styles.button} ${styles[props.name]}${
        props.hasShadow ? ' ' + styles.buttonShadow : ''
      }`}
      aria-label={props.label}
      aria-disabled={false}
      onClick={props.clickCallback}
    />
  );
};

IconButton.propTypes = {
  name: PropTypes.oneOf([
    'left',
    'right',
    'play',
    'pause',
    'maximize',
    'minimize',
    'circle',
    'circleLight'
  ]).isRequired,
  hasShadow: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  clickCallback: PropTypes.func.isRequired
};
