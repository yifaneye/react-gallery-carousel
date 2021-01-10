import React, { memo } from 'react';
import { Slide } from '../Slide/Slide';
import PropTypes from 'prop-types';
import { isEqualProps } from '../utils/utils';

export const Slides = memo((props) => {
  const slides = props.slides;
  const hasImages = !!props.images;

  return slides.map((slide, index) => (
    <Slide key={index} {...props} slide={slide} isImage={hasImages} />
  ));
}, isEqualProps);

Slides.propTypes = {
  slides: PropTypes.array.isRequired,
  images: PropTypes.array
};
