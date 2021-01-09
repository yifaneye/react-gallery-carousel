import React, { Fragment, useEffect, useState } from 'react';
import { ArrowButton, MediaButton } from '../Button/Button';
import PropTypes from 'prop-types';
import useMediaQuery from '../utils/useMediaQuery';

export const ArrowButtons = (props) => {
  if (props.disabled) return null;

  return (
    <Fragment>
      <ArrowButton direction='left' clickCallback={props.onClickLeft} />
      <ArrowButton direction='right' clickCallback={props.onClickRight} />
    </Fragment>
  );
};

ArrowButtons.propTypes = {
  disabled: PropTypes.bool,
  onClickLeft: PropTypes.func.isRequired,
  onClickRight: PropTypes.func.isRequired
};

export const MediaButtons = (props) => {
  if (props.disabled) return null;

  const [isPlaying, setIsPlaying] = useState(true);
  const shouldPause = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    if (shouldPause && isPlaying) {
      props.onClickPause();
      setIsPlaying(false);
    }
  }, [shouldPause]);

  const handleClick = () => {
    isPlaying ? props.onClickPause() : props.onClickPlay();
    setIsPlaying(!isPlaying);
  };

  return <MediaButton isPlaying={isPlaying} clickCallback={handleClick} />;
};

MediaButtons.propTypes = {
  disabled: PropTypes.bool,
  onClickPlay: PropTypes.func.isRequired,
  onClickPause: PropTypes.func.isRequired
};
