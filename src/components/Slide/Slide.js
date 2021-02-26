import React from 'react';
import styles from './Slide.module.css';
import Image from '../Image';
import UserSlide from '../UserSlide';
import PropTypes from 'prop-types';
import { elementRef } from '../../utils/validators';

export const Slide = (props) => {
  const slide = props.isImage ? (
    <Image
      image={props.slide}
      lazyLoad={props.lazyLoad}
      objectFit={props.objectFit}
      caption={props.caption}
      hasShadow={props.widgetsShadow}
    />
  ) : (
    <UserSlide slide={props.slide} />
  );
  return (
    <li ref={props.reference} className={styles.slide}>
      {slide}
    </li>
  );
};

Slide.propTypes = {
  isImage: PropTypes.bool.isRequired,
  slide: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.element.isRequired
  ]).isRequired,
  caption: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.string.isRequired
  ]).isRequired,
  reference: elementRef
};
