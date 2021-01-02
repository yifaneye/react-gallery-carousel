import React from 'react';
import Image from '../Image';
import styles from './Slides.module.css';

const Slide = (props) => {
  const slide = props.isImage ? (
    <Image image={props.slide} lazy={props.lazy} fit={props.fit} />
  ) : (
    props.slide
  );
  return <div className={styles.slideWrapper}>{slide}</div>;
};

export const Slides = (props) => {
  const slides = props.slides;
  const hasImages = !!props.images;

  return slides.map((slide, index) => (
    <Slide key={index} {...props} slide={slide} isImage={hasImages} />
  ));
};
