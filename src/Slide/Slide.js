import React from 'react';
import Image from '../Image';
import styles from './Slide.module.css';
import PropTypes from 'prop-types';

export const Slide = (props) => {
  const slide = props.isImage ? (
    <Image image={props.slide} lazy={props.lazy} fit={props.fit} />
  ) : (
    props.slide
  );
  return <div className={styles.slide}>{slide}</div>;
};

Slide.propTypes = {
  isImage: PropTypes.bool.isRequired,
  slide: PropTypes.oneOfType([PropTypes.object, PropTypes.element]).isRequired,
  lazy: PropTypes.bool,
  fit: PropTypes.string
};
