import React, { Fragment, useRef, useState } from 'react';
import styles from './Image.module.css';
import placeholderImage from 'placeholder.jpg';
import fallbackImage from 'fallback.jpg';
import { Caption } from '../Widgets';
import useIntersectionObserver from '../../utils/useIntersectionObserver';
import PropTypes from 'prop-types';
import {
  objectFitStyles,
  largeWidgetPositions,
  imageObject
} from '../../utils/validators';

const handleError = (event) => {
  event.target.src = fallbackImage;
};

const LazyLoadedImage = (props) => {
  const imageRef = useRef(null);
  const isInViewport = useIntersectionObserver(imageRef);
  const [isLoaded, setIsLoaded] = useState(!props.image.thumbnail);

  const handleLoad = () => {
    if (isInViewport) setIsLoaded(true);
  };

  const src = isInViewport ? props.image.src : placeholderImage;
  const alt = props.image.alt || null;
  const thumbnail = isInViewport ? props.image.thumbnail : placeholderImage;

  return (
    <>
      <img
        className={styles.image}
        src={src}
        alt={alt}
        aria-label={alt}
        loading='lazy'
        style={props.style}
        onLoad={handleLoad}
        onError={handleError}
      />
      <img
        ref={imageRef}
        className={styles.thumbnail + (isLoaded ? ' ' + styles.hidden : '')}
        src={thumbnail}
        alt={alt}
        aria-label={alt}
        loading='lazy'
        style={props.style}
        onError={handleError}
      />
    </>
  );
};

LazyLoadedImage.propTypes = {
  image: imageObject.isRequired,
  style: PropTypes.object.isRequired
};

export const Image = (props) => {
  const objectFit = props.objectFit === 'cover' ? null : props.objectFit;
  const style = { objectFit: objectFit };

  const image = props.lazyLoad ? (
    <LazyLoadedImage image={props.image} style={style} />
  ) : (
    <img
      className={styles.image}
      src={props.image.src}
      alt={props.image.alt || null}
      aria-label={props.image.alt || null}
      loading='auto'
      style={style}
      onError={handleError}
    />
  );

  return (
    <figure className={styles.figure}>
      {image}
      {props.hasCaption && props.image.alt && (
        <Caption
          text={props.image.alt || null}
          position={props.hasCaption}
          hasShadow={props.widgetsHasShadow}
        />
      )}
    </figure>
  );
};

Image.propTypes = {
  objectFit: objectFitStyles.isRequired,
  lazyLoad: PropTypes.bool.isRequired,
  image: imageObject.isRequired,
  hasCaption: largeWidgetPositions.isRequired,
  widgetsHasShadow: PropTypes.bool.isRequired
};
