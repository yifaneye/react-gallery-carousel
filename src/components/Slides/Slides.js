import React from 'react';
import styles from './Slides.module.css';
import Slide from '../Slide';
import PropTypes from 'prop-types';
import {
  positiveNumber,
  elementRef,
  largeWidgetPositions,
  objectFitStyles
} from '../../utils/validators';

export const Slides = (props) => {
  const slides = props.slides;

  return (
    <ul
      ref={props.slidesRef}
      className={
        styles.slides +
        `${props.isRTL ? ' ' + styles.RTL : ''}` +
        `${props.hasImages ? ' ' + styles.hasImages : ''}`
      }
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
            slidesContainerRef={props.slidesContainerRef}
            slide={slide}
            isImage={props.hasImages}
            shouldLazyLoad={props.shouldLazyLoad}
            objectFit={props.objectFit}
            widgetsHasShadow={props.widgetsHasShadow}
            hasCaption={props.hasCaptions}
            isCurrent={index === props.curIndex}
            fallbackImg={props.fallbackImg}
          />
        );
      })}
    </ul>
  );
};

Slides.propTypes = {
  slides: PropTypes.array.isRequired,
  isRTL: PropTypes.bool.isRequired,
  slidesRef: elementRef.isRequired,
  minRef: elementRef.isRequired,
  length: positiveNumber(true),
  maxRef: elementRef.isRequired,
  slidesContainerRef: elementRef.isRequired,
  hasImages: PropTypes.bool.isRequired,
  shouldLazyLoad: PropTypes.bool.isRequired,
  objectFit: objectFitStyles.isRequired,
  widgetsHasShadow: PropTypes.bool.isRequired,
  hasCaptions: largeWidgetPositions.isRequired,
  curIndex: PropTypes.number,
  fallbackImg: PropTypes.string
};
