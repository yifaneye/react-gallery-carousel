import React, { useEffect, useRef, useState } from 'react';
import styles from './Image.module.css';
import PropTypes from 'prop-types';
import placeholder from 'placeholderImage.jpg';

export const Image = (props) => {
  const imageRef = useRef(null);
  const [isInViewport, setIsInViewport] = useState(false);

  const imageTitle = props.image.alt || null;

  useEffect(() => {
    if (!props.lazy) {
      return;
    }
    // eslint-disable-next-line no-undef
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInViewport) {
          setIsInViewport(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0
      }
    );
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }
    return () => {
      if (props.lazy) {
        observer.disconnect();
      }
    };
  }, [imageRef, isInViewport, props.lazy]);

  return (
    <img
      ref={imageRef}
      className={styles.image}
      src={!props.lazy || isInViewport ? props.image.src : placeholder}
      alt={imageTitle}
      aria-label={imageTitle}
      title={imageTitle}
      loading={props.lazy ? 'lazy' : 'eager'}
      style={{ objectFit: props.fit || null }}
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
  lazy: PropTypes.bool,
  fit: PropTypes.oneOf(['contain', 'cover', 'fill', 'none', 'scale-down'])
};
