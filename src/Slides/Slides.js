import React from 'react';
import { Slide } from '../Slide/Slide';

export const Slides = (props) => {
  const slides = props.slides;
  const hasImages = !!props.images;

  return slides.map((slide, index) => (
    <Slide key={index} {...props} slide={slide} isImage={hasImages} />
  ));
};
