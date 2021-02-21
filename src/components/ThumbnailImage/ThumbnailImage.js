import React, { useRef } from 'react';
import styles from './ThumbnailImage.module.css';
import PropTypes from 'prop-types';
import placeholder from 'placeholderImage.jpg';
import useIntersectionObserver from '../../utils/useIntersectionObserver';
import useAnchor from '../../utils/useAnchor';

const LazyLoadedImage = (props) => {
  const imageRef = useRef(null);
  const isInViewport = useIntersectionObserver(imageRef);

  useAnchor(imageRef, props.isCurrent);

  const source = isInViewport ? props.src : placeholder;

  return (
    <img
      ref={imageRef}
      className={props.className}
      src={source}
      alt={props.title}
      aria-label={props.title}
      title={props.title}
      loading='lazy'
      tabIndex={0}
      onError={props.onError}
      onClick={props.clickCallback}
    />
  );
};

LazyLoadedImage.propTypes = {
  className: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
  isCurrent: PropTypes.bool.isRequired,
  onError: PropTypes.func.isRequired,
  clickCallback: PropTypes.func.isRequired
};

export const ThumbnailImage = (props) => {
  const imageRef = useRef(null);
  const imageSource = props.image.thumbnail || props.image.src;
  const imageTitle = props.image.alt || null;
  const imageClassName = `${styles.image}${
    props.isCurrent ? ' ' + styles.currentImage : ''
  }`;

  const handleError = (event) => {
    event.target.src = placeholder;
  };

  useAnchor(imageRef, props.isCurrent);

  if (props.lazyLoad)
    return (
      <LazyLoadedImage
        className={imageClassName}
        src={imageSource}
        title={imageTitle}
        isCurrent={props.isCurrent}
        clickCallback={props.clickCallback}
        onError={handleError}
      />
    );

  return (
    <img
      ref={imageRef}
      className={imageClassName}
      src={imageSource}
      alt={imageTitle}
      aria-label={imageTitle}
      title={imageTitle}
      loading='auto'
      tabIndex={0}
      onError={handleError}
      onClick={props.clickCallback}
    />
  );
};

ThumbnailImage.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    thumbnail: PropTypes.string
  }).isRequired,
  lazyLoad: PropTypes.bool.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  clickCallback: PropTypes.func.isRequired
};
