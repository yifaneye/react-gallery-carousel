import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './Slides.module.css';
import Slide from '../Slide';

export const Slides = memo((props) => {
  const slides = props.slides;
  const hasImages = !!props.images;

  return (
    <ul className={styles.ribbon} ref={props.reference} tabIndex={0}>
      {slides.map((slide, index) => (
        <Slide
          key={index}
          {...props}
          slide={slide}
          isImage={hasImages}
          draggable='false'
        />
      ))}
    </ul>
  );
});

Slides.propTypes = {
  slides: PropTypes.array.isRequired,
  images: PropTypes.array
};
