import React from 'react';
import styles from './UserSlide.module.scss';
import PropTypes from 'prop-types';

export const UserSlide = (props) => {
  return <div className={`${styles.userSlide} ${
    (props.isMaximized ? props.classes?.slideMax : props.classes?.slide) || ''
  }`}>{props.slide}</div>;
};

UserSlide.propTypes = {
  slide: PropTypes.node.isRequired,
  classes: PropTypes.object,
  isMaximized: PropTypes.bool,
};

export const UserSlideThumbnail = (props) => {
  return (
    <div className={`${styles.userSlide} ${styles.thumbnail} ${
      (props.isMaximized ? props.classes?.thumbnailSlideMax : props.classes?.thumbnailSlide) || ''
    }`} tabIndex='-1'>
      {props.slide}
    </div>
  );
};

UserSlideThumbnail.propTypes = {
  slide: PropTypes.node.isRequired,
  isMaximized: PropTypes.bool,
};
