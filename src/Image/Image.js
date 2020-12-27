import React, { useEffect, useRef, useState } from 'react';
import styles from './Image.module.css';

export const Image = (props) => {
  const imageRef = useRef(null);
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
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
        src={isInViewport ? props.image.src : undefined}
        alt={props.image.alt}
        loading='lazy'
        aria-label='Image'
        title={props.image.alt}
      />
      <figcaption className={styles.displayNone}>{props.image.alt}</figcaption>
    </figure>
  );
};
