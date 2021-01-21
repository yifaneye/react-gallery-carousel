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
      style={{ objectFit: props.fit || null }}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = placeholder;
      }}
    />
  );
};

export const Image = (props) => {
  const imageTitle = props.image.alt || null;

  if (props.lazy)
    return (
      <LazyLoadedImage
        src={props.image.src}
        title={imageTitle}
        fit={props.fit}
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
      style={{ objectFit: props.fit || null }}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = placeholder;
      }}
    />
  );
};

LazyLoadedImage.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
  fit: PropTypes.oneOf(['contain', 'cover', 'fill', 'none', 'scale-down'])
};

Image.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string
  }).isRequired,
  lazy: PropTypes.bool,
  fit: PropTypes.oneOf(['contain', 'cover', 'fill', 'none', 'scale-down'])
};
