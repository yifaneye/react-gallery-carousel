import React, { memo, useRef } from 'react';
import styles from './Thumbnail.module.css';
import ThumbnailImage from '../ThumbnailImage';
import ThumbnailSlide from '../ThumbnailSlide';
import useAnchor from '../../utils/useAnchor';
import PropTypes from 'prop-types';

export const Thumbnail = memo((props) => {
  const ref = useRef(null);

  const slide = props.isImage ? (
    <ThumbnailImage image={props.slide} lazyLoad={props.lazyLoad} />
  ) : (
    <ThumbnailSlide slide={props.slide} />
  );

  const className = `${styles.thumbnail}${
    props.isCurrent ? ' ' + styles.currentThumbnail : ''
  }`;

  useAnchor(ref, {
    isCurrent: props.isCurrent,
    isMaximized: props.isMaximized
  });

  return (
    <li ref={ref} className={className} tabIndex={0} onClick={props.onClick}>
      {slide}
    </li>
  );
});

Thumbnail.propTypes = {
  slide: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.element.isRequired
  ]).isRequired,
  isImage: PropTypes.bool.isRequired,
  lazyLoad: PropTypes.bool.isRequired,
  isMaximized: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};
