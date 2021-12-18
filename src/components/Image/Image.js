import React, { Fragment, useRef, useState } from 'react';
import styles from './Image.module.css';
import { PLACEHOLDER_IMAGE } from './constants';
import { Caption } from '../Widgets';
import useIntersectionObserver from '../../utils/useIntersectionObserver';
import PropTypes from 'prop-types';
import {
  objectFitStyles,
  largeWidgetPositions,
  imageObject,
  elementRef
} from '../../utils/validators';

const handleError = (event) => {
  event.target.src = PLACEHOLDER_IMAGE;
};

const LazyLoadedImage = (props) => {
  const imageRef = useRef(null);
  const isInViewport = useIntersectionObserver(
    imageRef,
    props.slidesContainerRef,
    '0px 101% 0px 101%'
    // preload 2 images on either side of the slides' container (viewport)
  );
  const [shouldShowThumbnail, setShouldShowThumbnail] = useState(
    props.image.thumbnail
  );
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    if (isInViewport) setShouldShowThumbnail(false);
    // the low quality image (props.image.thumbnail) will be hidden
  };

  const handleError = () => {
    setHasError(true);
  };

  let { src, srcset, alt, thumbnail, ...otherImageProps } = props.image;

  src = isInViewport && !hasError ? src : PLACEHOLDER_IMAGE;
  srcset = isInViewport && !hasError ? srcset : null;
  thumbnail = isInViewport && !hasError ? thumbnail : PLACEHOLDER_IMAGE;

  return (
    <>
      <img
        ref={imageRef}
        className={styles.image}
        srcSet={srcset}
        src={src}
        alt={alt || null}
        style={props.style}
        onLoad={handleLoad}
        onError={handleError || handleLoad}
        {...otherImageProps}
      />
      <img
        className={
          styles.thumbnail + (shouldShowThumbnail ? '' : ' ' + styles.hidden)
        }
        src={thumbnail}
        alt={alt || null}
        style={props.style}
        onError={handleError}
      />
    </>
  );
};

LazyLoadedImage.propTypes = {
  slidesContainerRef: elementRef.isRequired,
  image: imageObject.isRequired,
  style: PropTypes.object.isRequired
};

export const Image = (props) => {
  const objectFit = props.objectFit === 'cover' ? null : props.objectFit;
  const style = { objectFit: objectFit };

  const { src, alt, srcset, thumbnail, ...otherImageProps } = props.image;

  const image = props.shouldLazyLoad ? (
    <LazyLoadedImage
      slidesContainerRef={props.slidesContainerRef}
      image={props.image}
      style={style}
    />
  ) : (
    <img
      className={styles.image}
      srcSet={srcset}
      src={src}
      alt={alt || null}
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
  image: imageObject.isRequired,
  shouldLazyLoad: PropTypes.bool.isRequired,
  slidesContainerRef: elementRef.isRequired,
  hasCaption: largeWidgetPositions.isRequired,
  widgetsHasShadow: PropTypes.bool.isRequired
};
