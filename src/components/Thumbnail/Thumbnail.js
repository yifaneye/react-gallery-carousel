import React, { useRef } from 'react';
import styles from './Thumbnail.module.css';
import ThumbnailImage from '../ImageThumbnail';
import { UserSlideThumbnail } from '../UserSlide';
import useNoDrag from '../../utils/useNoDrag';
import useEnter from '../../utils/useEnter';
import PropTypes from 'prop-types';
import { elementRef, slideObject } from '../../utils/validators';

export const Thumbnail = (props) => {
  const reference = useRef(null);

  const slide = props.isImage ? (
    <ThumbnailImage image={props.slide} lazyLoad={props.lazyLoad} />
  ) : (
    <UserSlideThumbnail slide={props.slide} />
  );

  const className = `${styles.thumbnail}${
    props.isCurrent ? ' ' + styles.currentThumbnail : ''
  }`;

  const ref = props.isCurrent ? props.reference : reference;

  useNoDrag(ref); // prevent dragging on FireFox

  useEnter(ref);

  return (
    <li
      ref={ref}
      className={className}
      role='button'
      tabIndex={0}
      onMouseUpCapture={props.onClick} // onmouseup also works for tap on touch devices
    >
      {slide}
    </li>
  );
};

Thumbnail.propTypes = {
  isImage: PropTypes.bool.isRequired,
  slide: slideObject.isRequired,
  lazyLoad: PropTypes.bool.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  isMaximized: PropTypes.bool.isRequired,
  reference: elementRef.isRequired,
  onClick: PropTypes.func.isRequired
};
