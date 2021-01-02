import React from 'react';
import Image from '../Image';
import styles from './Slide.module.css';

export const Slide = (props) => {
  const slide = props.isImage ? (
    <Image image={props.slide} lazy={props.lazy} fit={props.fit} />
  ) : (
    props.slide
  );
  return <div className={styles.slide}>{slide}</div>;
};
