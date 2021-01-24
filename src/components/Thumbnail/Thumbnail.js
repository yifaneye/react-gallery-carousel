import React, { memo } from 'react';
import ThumbnailImage from '../ThumbnailImage';
import ThumbnailSlide from '../ThumbnailSlide';
import PropTypes from 'prop-types';

export const Thumbnail = memo((props) => {
  return props.isImage ? (
    <ThumbnailImage
      image={props.slide}
      lazy={props.lazy}
      isCurrent={props.isCurrent}
      clickCallback={props.clickCallback}
    />
  ) : (
    <ThumbnailSlide
      slide={props.slide}
      isCurrent={props.isCurrent}
      clickCallback={props.clickCallback}
    />
  );
});

Thumbnail.propTypes = {
  slide: PropTypes.object.isRequired,
  hasImages: PropTypes.bool,
  lazy: PropTypes.bool,
  curIndex: PropTypes.number,
  clickCallback: PropTypes.func
};
