import React, { memo } from 'react';
import styles from './Thumbnails.module.css';
import Thumbnail from '../Thumbnail';
import ThumbnailSlide from '../ThumbnailSlide';

export const Thumbnails = memo((props) => {
  if (props.disabled) return null;
  const callbacks = props.callbacks;

  return (
    <div className={styles.ThumbnailsWrapper + ' ' + styles.bottomCenter}>
      <div className={styles.thumbnailsContainer}>
        {props.hasImages &&
          Object.keys(callbacks).map((key, index) => (
            <Thumbnail
              key={index}
              image={props.slides[index]}
              lazy={props.lazy}
              isCurrent={Number(key) === props.curIndex}
              clickCallback={callbacks[key]}
            />
          ))}
        {!props.hasImages &&
          Object.keys(callbacks).map((key, index) => (
            <ThumbnailSlide
              key={index}
              slide={props.slides[index]}
              isCurrent={Number(key) === props.curIndex}
              clickCallback={callbacks[key]}
            />
          ))}
      </div>
    </div>
  );
});
