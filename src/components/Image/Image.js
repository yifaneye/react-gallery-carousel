import React, { Fragment, useRef, useState } from 'react';
import styles from './Image.module.css';
import PropTypes from 'prop-types';
import placeholder from 'placeholderImage.jpg';
import { Caption } from '../Widgets';
import useIntersectionObserver from '../../utils/useIntersectionObserver';

const LazyLoadedImage = (props) => {
  const imageRef = useRef(null);
  const isInViewport = useIntersectionObserver(imageRef);
  const [isThumbnailLoaded, setIsThumbnailLoaded] = useState(false);

  const handleLoad = () => {
    if (isInViewport) setIsThumbnailLoaded(true);
  };

  const source = isThumbnailLoaded
    ? props.src
    : isInViewport
    ? props.thumbnail
    : placeholder;

  return (
    <figure className={styles.figure}>
      <img
        ref={imageRef}
        className={styles.image}
        src={source}
        alt={props.title}
        aria-label={props.title}
        loading='lazy'
        style={{ objectFit: props.objectFit }}
        onLoad={handleLoad}
        onError={props.onError}
      />
      {props.caption && props.title && (
        <Caption text={props.title} position={props.caption} />
      )}
    </figure>
  );
};

LazyLoadedImage.propTypes = {
  src: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  objectFit: PropTypes.string,
  hasShadow: PropTypes.bool.isRequired,
  onError: PropTypes.func.isRequired,
  caption: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.string.isRequired
  ]).isRequired
};

export const Image = (props) => {
  const imageSource = props.image.src;
  const imageThumbnail = props.image.thumbnail || placeholder;
  const imageTitle = props.image.alt || null;
  const [isThumbnailLoaded, setIsThumbnailLoaded] = useState(false);
  const objectFit = props.objectFit === 'cover' ? null : props.objectFit;

  const handleError = (event) => {
    event.target.onerror = null;
    event.target.src = placeholder;
  };

  if (props.lazyLoad)
    return (
      <LazyLoadedImage
        src={imageSource}
        thumbnail={imageThumbnail}
        title={imageTitle}
        objectFit={objectFit}
        hasShadow={props.hasShadow}
        caption={props.caption}
        onError={handleError}
      />
    );

  const handleLoad = () => setIsThumbnailLoaded(true);

  const source = isThumbnailLoaded ? imageSource : placeholder;

  return (
    <>
      <img
        className={styles.image}
        src={source}
        alt={imageTitle}
        aria-label={imageTitle}
        loading='auto'
        style={{ objectFit: objectFit }}
        onLoad={handleLoad}
        onError={handleError}
      />
      {props.caption && props.title && (
        <Caption text={props.title} position={props.caption} />
      )}
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
  hasShadow: PropTypes.bool.isRequired,
  caption: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.string.isRequired
  ]).isRequired
};
