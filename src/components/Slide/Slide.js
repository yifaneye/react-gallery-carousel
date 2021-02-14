import React from 'react';
import Image from '../Image';
import styles from './Slide.module.css';
import PropTypes from 'prop-types';
import { ref } from '../../utils/validators';

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
    props.slide
  );
  return (
    <li className={styles.slide} ref={props.reference}>
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
  reference: ref
};
