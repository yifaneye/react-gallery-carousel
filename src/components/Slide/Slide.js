import React from 'react';
import Image from '../Image';
import styles from './Slide.module.css';
import PropTypes from 'prop-types';

export const Slide = (props) => {
  const slide = props.isImage ? (
    <Image
      image={props.slide}
      lazyLoad={props.lazyLoad}
      objectFit={props.objectFit}
    />
  ) : (
    props.slide
  );
  return <li className={styles.slide}>{slide}</li>;
};

Slide.propTypes = {
  isImage: PropTypes.bool.isRequired,
  slide: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.element.isRequired
  ]).isRequired,
  lazyLoad: PropTypes.bool.isRequired,
  objectFit: PropTypes.string.isRequired
};
