import React, { useRef } from 'react';
import styles from './Image.module.css';
import PropTypes from 'prop-types';
import placeholder from 'placeholderImage.jpg';
import useIntersectionObserver from '../../utils/useIntersectionObserver';

const LazyLoadedImage = (props) => {
  const imageRef = useRef(null);
  const isInViewport = useIntersectionObserver(imageRef);

  return (
    <img
      ref={imageRef}
      className={styles.image}
      src={isInViewport ? props.src : placeholder}
      alt={props.title}
      aria-label={props.title}
      title={props.title}
      loading='lazy'
      style={{ objectFit: props.objectFit || null }}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = placeholder;
      }}
    />
  );
};

LazyLoadedImage.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  objectFit: PropTypes.string.isRequired
};

export const Image = (props) => {
  const imageTitle = props.image.alt || null;

  if (props.lazyLoad)
    return (
      <LazyLoadedImage
        src={props.image.src}
        title={imageTitle}
        objectFit={props.objectFit}
      />
    );

  return (
    <img
      className={styles.image}
      src={props.image.src}
      alt={imageTitle}
      aria-label={imageTitle}
      title={imageTitle}
      loading='auto'
      style={{
        objectFit: props.objectFit === 'cover' ? null : props.objectFit
      }}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = placeholder;
      }}
    />
  );
};

Image.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string
  }).isRequired,
  lazyLoad: PropTypes.bool.isRequired,
  objectFit: PropTypes.string.isRequired
};
