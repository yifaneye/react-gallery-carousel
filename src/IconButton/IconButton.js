import React from 'react';
import styles from './IconButton.module.css';
import PropTypes from 'prop-types';

export const IconButton = (props) => {
  return (
    <button
      className={styles.button + ' ' + styles[props.name]}
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
    'circle',
    'circleLight'
  ]),
  label: PropTypes.string,
  clickCallback: PropTypes.func
};
