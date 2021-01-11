import React, { memo } from 'react';
import { Slides } from '../Slides/Slides';
import PropTypes from 'prop-types';
import { isEqualProps } from '../utils/utils';
import styles from './Ribbon.module.css';

export const Ribbon = memo((props) => {
  return (
    <ul
      className={styles.ribbon}
      ref={props.reference}
      {...props.handlers}
      tabIndex={0}
    >
      <Slides slides={props.slides} {...props} />
    </ul>
  );
}, isEqualProps);

Ribbon.propTypes = {
  slides: PropTypes.array.isRequired,
  images: PropTypes.array
};
