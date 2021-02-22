import React, { useRef } from 'react';
import styles from './ThumbnailSlide.module.css';
import PropTypes from 'prop-types';
import useAnchor from '../../utils/useAnchor';

export const ThumbnailSlide = (props) => {
  const slideRef = useRef(null);
  const slideClassName = `${styles.slide}${
    props.isCurrent ? ' ' + styles.currentSlide : ''
  }`;

  const handleClick = () => {
    props.clickCallback();
  };

  useAnchor(slideRef, {
    isCurrent: props.isCurrent,
    isMaximized: props.isMaximized
  });

  return (
    <div
      ref={slideRef}
      className={slideClassName}
      tabIndex={0}
      onClick={handleClick}
    >
      {props.slide}
    </div>
  );
};

ThumbnailSlide.propTypes = {
  slide: PropTypes.node.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  isMaximized: PropTypes.bool.isRequired,
  clickCallback: PropTypes.func.isRequired
};
