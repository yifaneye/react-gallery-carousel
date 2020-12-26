import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Carousel.module.css';
import { Image } from '../Image';

export function Carousel(props) {
  const [, setCurrentImageIndex] = useState(0);
  const imagesRef = useRef(null);
  const maxImageIndex = props.images.length;

  const updateCurrentImageIndex = (change) =>
    setCurrentImageIndex((currentImageIndex) => {
      if (
        currentImageIndex + change < 0 ||
        currentImageIndex + change >= maxImageIndex
      ) {
        return currentImageIndex;
      }
      const newCurrentImageIndex = Math.abs(
        (currentImageIndex + change) % maxImageIndex
      );
      imagesRef.current.style.transform = `translateX(calc(-100% * ${newCurrentImageIndex})`;
      return newCurrentImageIndex;
    });

  const updateCarousel = useCallback((event) => {
    if (event.key === 'ArrowLeft') {
      updateCurrentImageIndex(-1);
    } else if (event.key === 'ArrowRight') {
      updateCurrentImageIndex(+1);
    }
  }, []);

  useEffect(() => {
    imagesRef.current.addEventListener('keydown', updateCarousel, false);

    return () => {
      imagesRef.current.removeEventListener('keydown', updateCarousel, false);
    };
  }, [updateCarousel]);

  return (
    <div className={styles.imagesWrapper}>
      <div className={styles.images} ref={imagesRef} tabIndex={0}>
        {props.images.map((image, index) => (
          <Image key={index} image={image} />
        ))}
      </div>
    </div>
  );
}
