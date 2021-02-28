import React, { memo } from 'react';
import styles from './Slides.module.css';
import Slide from '../Slide';
import PropTypes from 'prop-types';
import {
  positiveNumber,
  elementRef,
  largeWidgetPositions,
  objectFitStyles
} from '../../utils/validators';

// memo is useful here
export const Slides = memo((props) => {
  const slides = props.slides;

  return (
    <ul
      className={styles.slides + `${props.isRTL ? ' ' + styles.RTL : ''}`}
      ref={props.slidesRef}
      tabIndex={0}
    >
      {slides.map((slide, index) => {
        let reference = null;
        if (index === 0) reference = props.minRef;
        else if (index === props.length - 1) reference = props.maxRef;
        return (
          <Slide
            key={index}
            draggable='false'
            reference={reference}
            slide={slide}
            isImage={props.hasImages}
            lazyLoad={props.lazyLoad}
            objectFit={props.objectFit}
            widgetsHasShadow={props.widgetsHasShadow}
            hasCaption={props.hasCaptions}
          />
        );
      })}
    </ul>
  );
});

Slides.propTypes = {
  slides: PropTypes.array.isRequired,
  isRTL: PropTypes.bool.isRequired,
  slidesRef: elementRef.isRequired,
  minRef: elementRef.isRequired,
  length: positiveNumber(true),
  maxRef: elementRef.isRequired,
  hasImages: PropTypes.bool.isRequired,
  lazyLoad: PropTypes.bool.isRequired,
  objectFit: objectFitStyles.isRequired,
  widgetsHasShadow: PropTypes.bool.isRequired,
  hasCaptions: largeWidgetPositions.isRequired
};
