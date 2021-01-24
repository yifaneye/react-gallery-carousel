import React, { useRef } from 'react';
import styles from './Thumbnail.module.css';
import PropTypes from 'prop-types';
import placeholder from '../Image/placeholderImage.jpg';
import useIntersectionObserver from '../../utils/useIntersectionObserver';
import useAnchor from '../../utils/useAnchor';

const LazyLoadedImage = (props) => {
  const imageRef = useRef(null);
  const isInViewport = useIntersectionObserver(imageRef);

  useAnchor(imageRef);

  return (
    <img
      ref={imageRef}
      className={props.className}
      src={isInViewport ? props.src : placeholder}
      alt={props.title}
      aria-label={props.title}
      title={props.title}
      loading='lazy'
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = placeholder;
      }}
      onClick={props.clickCallback}
    />
  );
};

export const Thumbnail = (props) => {
  const imageRef = useRef(null);
  const imageTitle = props.image.alt || null;
  const imageClassName = `${styles.image}${
    props.isCurrent ? ' ' + styles.currentImage : ''
  }`;

  useAnchor(imageRef);

  if (!props.lazy)
    return (
      <LazyLoadedImage
        className={imageClassName}
        src={props.image.src}
        title={imageTitle}
        clickCallback={props.clickCallback}
      />
    );

  return (
    <img
      ref={imageRef}
      className={imageClassName}
      src={props.image.src}
      alt={imageTitle}
      aria-label={imageTitle}
      title={imageTitle}
      loading='auto'
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = placeholder;
      }}
      onClick={props.clickCallback}
    />
  );
};

LazyLoadedImage.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
  clickCallback: PropTypes.func
};

Thumbnail.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string
  }).isRequired,
  lazy: PropTypes.bool,
  clickCallback: PropTypes.func
};
