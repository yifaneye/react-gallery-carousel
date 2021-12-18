import React, { useRef } from 'react';
import styles from './Image.module.css';
import { PLACEHOLDER_IMAGE } from './constants';
import useIntersectionObserver from '../../utils/useIntersectionObserver';
import PropTypes from 'prop-types';
import { elementRef, imageObject } from '../../utils/validators';

const handleError = (event) => {
  // permanently replace the image with the fallback image
  event.target.src = PLACEHOLDER_IMAGE;
};

const LazyLoadedImageThumbnail = (props) => {
  const imageRef = useRef(null);
  const isInViewport = useIntersectionObserver(
    imageRef,
    props.thumbnailsContainerRef,
    '0px 20% 0px 20%'
    // preload approximately 2 image thumbnails on either side of the thumbnails' container (viewport)
    // 'approximately' is due to the presence of margin between adjacent images
  );

  // temporarily replace the image with the placeholder image
  const src = isInViewport ? props.src : PLACEHOLDER_IMAGE;

  return (
    <img
      ref={imageRef}
      className={styles.image}
      src={src}
      alt={props.alt}
      aria-label={props.alt}
      onError={handleError}
    />
  );
};

LazyLoadedImageThumbnail.propTypes = {
  thumbnailsContainerRef: elementRef.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string
};

export const ImageThumbnail = (props) => {
  // use the original image as fallback for the thumbnail
  const src = props.image.thumbnail || props.image.src;
  const alt = props.image.alt || null;

  if (props.shouldLazyLoad)
    return (
      <LazyLoadedImageThumbnail
        thumbnailsContainerRef={props.thumbnailsContainerRef}
        src={src}
        alt={alt}
      />
    );

  return (
    <img
      className={styles.image}
      src={src}
      alt={alt}
      aria-label={alt}
      loading='auto'
      onError={handleError}
    />
  );
};

ImageThumbnail.propTypes = {
  image: imageObject.isRequired,
  shouldLazyLoad: PropTypes.bool.isRequired,
  thumbnailsContainerRef: elementRef.isRequired
};
