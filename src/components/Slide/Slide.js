import React from 'react';
import styles from './Slide.module.css';
import Image from '../Image';
import UserSlide from '../UserSlide';
import PropTypes from 'prop-types';
import {
  elementRef,
  largeWidgetPositions,
  objectFitStyles,
  slideObject
} from '../../utils/validators';

export const Slide = (props) => {
  const slide = props.isImage ? (
    <Image
      image={props.slide}
      shouldLazyLoad={props.shouldLazyLoad}
      objectFit={props.objectFit}
      widgetsHasShadow={props.widgetsHasShadow}
      hasCaption={props.hasCaption}
      slidesContainerRef={props.slidesContainerRef}
      fallbackImg={props.fallbackImg}
    />
  ) : (
    <UserSlide slide={props.slide} />
  );
  return (
    <li
      ref={props.reference}
      className={styles.slide}
      role='presentation'
      aria-live={props.isCurrent ? 'polite' : null}
    >
      {slide}
    </li>
  );
};

Slide.propTypes = {
  isImage: PropTypes.bool.isRequired,
  slide: slideObject.isRequired,
  shouldLazyLoad: PropTypes.bool.isRequired,
  objectFit: objectFitStyles.isRequired,
  widgetsHasShadow: PropTypes.bool.isRequired,
  hasCaption: largeWidgetPositions.isRequired,
  slidesContainerRef: elementRef.isRequired,
  reference: elementRef,
  isCurrent: PropTypes.bool.isRequired,
  fallbackImg: PropTypes.string
};
