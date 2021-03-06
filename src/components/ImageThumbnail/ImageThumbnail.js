import React, { useRef } from 'react';
import styles from './ThumbnailImage.module.css';
import placeholderImage from 'placeholder.jpg';
import fallbackImage from 'fallback.jpg';
import useIntersectionObserver from '../../utils/useIntersectionObserver';
import PropTypes from 'prop-types';
import { imageObject } from '../../utils/validators';

const handleError = (event) => {
  // permanently replace the image with the fallback image
  event.target.src = fallbackImage;
};

const LazyLoadedImage = (props) => {
  const imageRef = useRef(null);
  const isInViewport = useIntersectionObserver(imageRef);

  // temporarily replace the image with the placeholder image
  const src = isInViewport ? props.src : placeholderImage;

  return (
    <img
      ref={imageRef}
      className={styles.image}
      src={src}
      alt={props.alt}
      aria-label={props.alt}
      loading='lazy'
      onError={handleError}
    />
  );
};

LazyLoadedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string
};

export const ImageThumbnail = (props) => {
  // use the original image as fallback for the thumbnail
  const src = props.image.thumbnail || props.image.src;
  const alt = props.image.alt || null;

  if (props.lazyLoad) return <LazyLoadedImage src={src} alt={alt} />;

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
  lazyLoad: PropTypes.bool.isRequired
};
