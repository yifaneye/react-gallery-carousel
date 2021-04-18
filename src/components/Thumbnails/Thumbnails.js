import React, { useRef } from 'react';
import styles from './Thumbnails.module.scss';
import Thumbnail from '../Thumbnail';
import useAnchor from '../../utils/useAnchor';
import useNoOverScroll from '../../utils/useNoOverScroll';
import useMouseDrag from '../../utils/useMouseDrag';
import PropTypes from 'prop-types';

export const Thumbnails = (props) => {
  const callbacks = props.callbacks;
  const thumbnailsContainerRef = useRef(null);
  const thumbnailRef = useRef(null);

  useAnchor(thumbnailRef, { isMaximized: props.isMaximized });

  const wheelEventHandler = useNoOverScroll(thumbnailsContainerRef);
  const mouseEventHandlers = useMouseDrag(thumbnailsContainerRef);

  return (
    <div
      ref={thumbnailsContainerRef}
      className={styles.thumbnailsWrapper}
      onWheel={wheelEventHandler}
      {...mouseEventHandlers}
    >
      <ul
        className={styles.thumbnails + `${props.isRTL ? ' ' + styles.RTL : ''}`}
      >
        {Object.keys(callbacks).map((key, index) => {
          return (
            <Thumbnail
              key={index}
              reference={thumbnailRef}
              thumbnailsContainerRef={thumbnailsContainerRef}
              slide={props.slides[key]}
              isImage={props.hasImages}
              shouldLazyLoad={props.shouldLazyLoad}
              isCurrent={Number(key) === props.curIndex}
              onClick={callbacks[key]}
            />
          );
        })}
      </ul>
    </div>
  );
};

Thumbnails.propTypes = {
  callbacks: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
  isMaximized: PropTypes.bool.isRequired,
  isRTL: PropTypes.bool.isRequired,
  slides: PropTypes.array.isRequired,
  hasImages: PropTypes.bool.isRequired,
  shouldLazyLoad: PropTypes.bool.isRequired,
  curIndex: PropTypes.number.isRequired
};

Thumbnails.defaultProps = {
  curIndex: 0
};
