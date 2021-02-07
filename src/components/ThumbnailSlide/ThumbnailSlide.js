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

  useAnchor(slideRef, props.isCurrent);

  return (
    <div ref={slideRef} className={slideClassName} onClick={handleClick}>
      {props.slide}
    </div>
  );
};

ThumbnailSlide.propTypes = {
  slide: PropTypes.node.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  clickCallback: PropTypes.func.isRequired
};
