import React, { useRef } from 'react';
import styles from './Thumbnails.module.css';
import Thumbnail from '../Thumbnail';
import PropTypes from 'prop-types';
import useAnchor from '../../utils/useAnchor';
import useNoOverScroll from '../../utils/useNoOverScroll';

export const Thumbnails = (props) => {
  const callbacks = props.callbacks;
  const thumbnailsRef = useRef(null);
  const thumbnailRef = useRef(null);
  useAnchor(thumbnailRef, { isMaximized: props.isMaximized });
  const wheelEventHandler = useNoOverScroll(thumbnailsRef);

  return (
    <div
      ref={thumbnailsRef}
      className={styles.thumbnailsWrapper}
      onWheel={wheelEventHandler}
    >
      <ul className={styles.thumbnails}>
        {Object.keys(callbacks).map((key, index) => {
          return (
            <Thumbnail
              key={index}
              reference={thumbnailRef}
              slide={props.slides[key]}
              isImage={props.hasImages}
              lazyLoad={props.lazyLoad}
              isCurrent={Number(key) === props.curIndex}
              isMaximized={props.isMaximized}
              onClick={callbacks[key]}
            />
          );
        })}
      </ul>
    </div>
  );
};

Thumbnails.propTypes = {
  slides: PropTypes.array.isRequired,
  hasImages: PropTypes.bool.isRequired,
  lazyLoad: PropTypes.bool.isRequired,
  curIndex: PropTypes.number.isRequired,
  callbacks: PropTypes.objectOf(PropTypes.func.isRequired).isRequired
};
