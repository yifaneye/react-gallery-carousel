import React, { useRef } from 'react';
import styles from './Thumbnail.module.scss';
import { ImageThumbnail } from '../Image';
import { UserSlideThumbnail } from '../UserSlide';
import useNoDrag from '../../utils/useNoDrag';
import useKeys from '../../utils/useKeys';
import PropTypes from 'prop-types';
import { elementRef, slideObject } from '../../utils/validators';

export const Thumbnail = (props) => {
  const reference = useRef(null);

  const slide = props.isImage ? (
    <ImageThumbnail
      thumbnailsContainerRef={props.thumbnailsContainerRef}
      image={props.slide}
      shouldLazyLoad={props.shouldLazyLoad}
    />
  ) : (
    <UserSlideThumbnail slide={props.thumbnail} />
  );

  const className = `${styles.thumbnail}${
    props.isCurrent ? ' ' + styles.currentThumbnail : ''
  }`;

  // customize the width of the thumbnail
  const style =
    'width' in props
      ? {
          minWidth: props.width,
          width: props.width,
          maxWidth: props.width
        }
      : {};

  const ref = props.isCurrent ? props.reference : reference;

  useNoDrag(ref); // prevent dragging on FireFox

  useKeys(ref, { Enter: props.onClick }); // allow keyboard navigation

  return (
    <li
      ref={ref}
      className={className}
      role='button'
      tabIndex={0}
      style={style}
      onMouseUpCapture={props.onClick} // onmouseup also works for tap on touch devices
    >
      {slide}
    </li>
  );
};

Thumbnail.propTypes = {
  isImage: PropTypes.bool.isRequired,
  thumbnailsContainerRef: elementRef.isRequired,
  slide: slideObject.isRequired,
  thumbnail: slideObject.isRequired,
  shouldLazyLoad: PropTypes.bool.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  width: PropTypes.string,
  reference: elementRef.isRequired,
  onClick: PropTypes.func.isRequired
};
