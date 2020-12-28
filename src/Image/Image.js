import React, { useEffect, useRef, useState } from 'react';
import styles from './Image.module.css';

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
  }, [imageRef]);

  return (
    <figure className={styles.imageWrapper} ref={imageRef}>
      <img
        className={styles.image}
        src={!props.lazy || isInViewport ? props.image.src : undefined}
        alt={imageTitle}
        aria-label={imageTitle}
        title={imageTitle}
        loading={props.lazy ? 'lazy' : 'eager'}
        style={{ objectFit: props.fit || null }}
      />
      <figcaption className={styles.displayNone}>{imageTitle}</figcaption>
    </figure>
  );
};
