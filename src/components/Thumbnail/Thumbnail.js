import React from 'react';
import styles from './Thumbnail.module.css';
import ThumbnailImage from '../ImageThumbnail';
import { UserSlideThumbnail } from '../UserSlide';
import PropTypes from 'prop-types';

export const Thumbnail = (props) => {
  const slide = props.isImage ? (
    <ThumbnailImage image={props.slide} lazyLoad={props.lazyLoad} />
  ) : (
    <UserSlideThumbnail slide={props.slide} />
  );

  const className = `${styles.thumbnail}${
    props.isCurrent ? ' ' + styles.currentThumbnail : ''
  }`;

  const ref = props.isCurrent ? props.reference : null;

  return (
    <li ref={ref} className={className} tabIndex={0} onClick={props.onClick}>
      {slide}
    </li>
  );
};

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
