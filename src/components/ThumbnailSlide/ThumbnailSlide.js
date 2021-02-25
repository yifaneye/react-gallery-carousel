import React from 'react';
import styles from './ThumbnailSlide.module.css';
import PropTypes from 'prop-types';

export const ThumbnailSlide = (props) => {
  return (
    <div className={styles.slide} tabIndex={0}>
      {props.slide}
    </div>
  );
};

ThumbnailSlide.propTypes = {
  slide: PropTypes.node.isRequired
};
