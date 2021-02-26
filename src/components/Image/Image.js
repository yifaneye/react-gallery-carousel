import React, { useRef, useState } from 'react';
import styles from './Image.module.css';
import placeholder from 'placeholderImage.jpg';
import { Caption } from '../Widgets';
import useIntersectionObserver from '../../utils/useIntersectionObserver';
import PropTypes from 'prop-types';

const handleError = (event) => {
  event.target.src = placeholder;
};

const LazyLoadedImage = (props) => {
  const imageRef = useRef(null);
  const isInViewport = useIntersectionObserver(imageRef);
  const [isThumbnailLoaded, setIsThumbnailLoaded] = useState(
    !props.image.thumbnail
  );

  const handleLoad = () => {
    if (isInViewport) setIsThumbnailLoaded(true);
  };

  const source = isThumbnailLoaded
    ? props.image.src
    : isInViewport
    ? props.image.thumbnail
    : placeholder;

  return (
    <img
      ref={imageRef}
      className={styles.image}
      src={source}
      alt={props.image.alt || null}
      aria-label={props.image.alt || null}
      loading='lazy'
      style={props.style}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
};

LazyLoadedImage.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    thumbnail: PropTypes.string
  }).isRequired,
  style: PropTypes.object
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
      {props.caption && props.image.alt && (
        <Caption
          text={props.image.alt || null}
          position={props.caption}
          hasShadow={props.hasShadow}
        />
      )}
    </figure>
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
