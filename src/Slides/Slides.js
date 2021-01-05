import React from 'react';
import { Slide } from '../Slide/Slide';
import PropTypes from 'prop-types';

export const Slides = (props) => {
  const slides = props.slides;
  const hasImages = !!props.images;

  return slides.map((slide, index) => (
    <Slide key={index} {...props} slide={slide} isImage={hasImages} />
  ));
};

Slides.propTypes = {
  slides: PropTypes.array.isRequired,
  images: PropTypes.array
};
