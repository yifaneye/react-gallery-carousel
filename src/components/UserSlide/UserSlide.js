import React from 'react';
import styles from './UserSlide.module.scss';
import PropTypes from 'prop-types';

export const UserSlide = (props) => {
  return <div className={styles.userSlide}>{props.slide}</div>;
};

UserSlide.propTypes = {
  slide: PropTypes.node.isRequired
};

export const UserSlideThumbnail = (props) => {
  return (
    <div className={styles.userSlide + ' ' + styles.thumbnail} tabIndex='-1'>
      {props.slide}
    </div>
  );
};

UserSlideThumbnail.propTypes = {
  slide: PropTypes.node.isRequired
};
