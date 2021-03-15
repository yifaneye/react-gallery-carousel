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

  const { src, srcset, alt, thumbnail, ...otherImageProps } = props.image;

  return (
    <>
      <img
        className={styles.image}
        src={isInViewport ? src : placeholderImage}
        alt={alt || null}
        srcSet={isInViewport ? srcset : null}
        loading='lazy'
        style={props.style}
        onLoad={handleLoad}
        onError={handleError}
        {...otherImageProps}
      />
      <img
        ref={imageRef}
        className={styles.thumbnail + (isLoaded ? ' ' + styles.hidden : '')}
        src={isInViewport ? thumbnail : placeholderImage}
        alt={alt}
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

  const { src, alt, srcset, thumbnail, ...otherImageProps } = props.image;

  const image = props.shouldLazyLoad ? (
    <LazyLoadedImage image={props.image} style={style} />
  ) : (
    <img
      className={styles.image}
      src={src}
      alt={alt || null}
      srcSet={srcset}
      loading='auto'
      style={style}
      onError={handleError}
      {...otherImageProps}
    />
  );

  return (
    <figure className={styles.figure} aria-label={props.image.alt || null}>
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
  shouldLazyLoad: PropTypes.bool.isRequired,
  image: imageObject.isRequired,
  hasCaption: largeWidgetPositions.isRequired,
  widgetsHasShadow: PropTypes.bool.isRequired
};
