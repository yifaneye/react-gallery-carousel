import React, { memo } from 'react';
import styles from './Thumbnails.module.css';
import Thumbnail from '../Thumbnail';
import PropTypes from 'prop-types';

export const Thumbnails = memo((props) => {
  const callbacks = props.callbacks;

  return (
    <div className={styles.ThumbnailsWrapper + ' ' + styles.bottomCenter}>
      <div className={styles.thumbnailsContainer}>
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
  lazyLoad: PropTypes.bool,
  curIndex: PropTypes.number,
  clickCallback: PropTypes.func
};
