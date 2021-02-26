import React from 'react';
import styles from './Slides.module.css';
import Slide from '../Slide';
import PropTypes from 'prop-types';
import { positiveNumber, elementRef } from '../../utils/validators';

// memo is useful here
export const Slides = (props) => {
  const slides = props.slides;

  return (
    <ul className={styles.slides} ref={props.slidesRef} tabIndex={0}>
      {slides.map((slide, index) => {
        let reference = null;
        if (index === 0) reference = props.minRef;
        else if (index === props.length - 1) reference = props.maxRef;
        return (
          <Slide
            reference={reference}
            key={index}
            {...props}
            slide={slide}
            isImage={props.hasImages}
            draggable='false'
          />
        );
      })}
    </ul>
  );
};

Slides.propTypes = {
  slides: PropTypes.array.isRequired,
  slidesRef: elementRef.isRequired,
  minRef: elementRef.isRequired,
  maxRef: elementRef.isRequired,
  length: positiveNumber(true),
  hasImages: PropTypes.bool.isRequired
};
