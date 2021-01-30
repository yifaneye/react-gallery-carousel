import React, { Fragment, useRef, useState } from 'react';
import styles from './Image.module.css';
import { LoadingSpinner } from '../Widgets';
import PropTypes from 'prop-types';
import placeholder from 'placeholderImage.jpg';
import useIntersectionObserver from '../../utils/useIntersectionObserver';

const LazyLoadedImage = (props) => {
  const imageRef = useRef(null);
  const isInViewport = useIntersectionObserver(imageRef);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  const handleLoad = () => {
    if (isInViewport) setIsFullyLoaded(true);
  };

  return (
    <>
      {!isFullyLoaded && <LoadingSpinner hasShadow={props.hasShadow} />}
      <img
        ref={imageRef}
        className={styles.image}
        src={isInViewport ? props.src : props.thumbnail}
        alt={props.title}
        aria-label={props.title}
        title={props.title}
        loading='lazy'
        style={{ objectFit: props.objectFit || null }}
        onLoad={handleLoad}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = placeholder;
        }}
      />
    </>
  );
};

LazyLoadedImage.propTypes = {
  src: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  objectFit: PropTypes.string.isRequired,
  hasShadow: PropTypes.bool.isRequired
};

export const Image = (props) => {
  const imageTitle = props.image.alt || null;
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  const handleLoad = () => setIsFullyLoaded(true);

  if (props.lazyLoad)
    return (
      <LazyLoadedImage
        src={props.image.src}
        thumbnail={props.image.thumbnail || placeholder}
        title={imageTitle}
        objectFit={props.objectFit}
        hasShadow={props.hasShadow}
      />
    );

  return (
    <>
      {!isFullyLoaded && <LoadingSpinner hasShadow={props.hasShadow} />}
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
        onLoad={handleLoad}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = placeholder;
        }}
      />
    </>
  );
};

Image.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    thumbnail: PropTypes.string
  }).isRequired,
  lazyLoad: PropTypes.bool.isRequired,
  objectFit: PropTypes.oneOf(['contain', 'cover', 'fill', 'none', 'scale-down'])
    .isRequired,
  hasShadow: PropTypes.bool.isRequired
};
