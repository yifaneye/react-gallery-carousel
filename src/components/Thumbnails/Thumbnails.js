import React, { memo, useRef } from 'react';
import styles from './Thumbnails.module.css';
import Thumbnail from '../Thumbnail';
import PropTypes from 'prop-types';

export const Thumbnails = memo((props) => {
  const callbacks = props.callbacks;
  const thumbnailsRef = useRef(null);

  const handleWheel = (event) => {
    if (Math.abs(event.deltaX) < Math.abs(event.deltaY)) return;
    const { scrollLeft, scrollWidth, offsetWidth } = thumbnailsRef.current;
    if (
      scrollLeft + event.deltaX < 0 ||
      scrollLeft + event.deltaX > scrollWidth - offsetWidth
    )
      event.preventDefault();
  };

  return (
    <div className={styles.ThumbnailsWrapper + ' ' + styles.bottomCenter}>
      <div
        ref={thumbnailsRef}
        className={styles.thumbnailsContainer}
        onWheel={handleWheel}
      >
        {Object.keys(callbacks).map((key, index) => {
          return (
            <Thumbnail
              key={index}
              slide={props.slides[key]}
              isImage={props.hasImages}
              lazyLoad={props.lazyLoad}
              isCurrent={Number(key) === props.curIndex}
              clickCallback={callbacks[key]}
            />
          );
        })}
      </div>
    </div>
  );
});

Thumbnails.propTypes = {
  slides: PropTypes.array.isRequired,
  hasImages: PropTypes.bool.isRequired,
  lazyLoad: PropTypes.bool.isRequired,
  curIndex: PropTypes.number.isRequired,
  callbacks: PropTypes.objectOf(PropTypes.func.isRequired).isRequired
};
