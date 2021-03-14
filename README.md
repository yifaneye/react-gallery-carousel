# react-gallery-carousel

Carousel component with support for lazy loading, velocity detection, pinch zoom, touch swiping, mouse dragging, keyboard navigation, full screen mode and thumbnails.

[![NPM](https://img.shields.io/npm/v/react-gallery-carousel.svg)](https://www.npmjs.com/package/react-gallery-carousel)

## Install

```bash
npm install --save react-gallery-carousel
```
OR
```bash
yarn add react-gallery-carousel
```

## Usage

```jsx
import React from 'react';
import { Carousel } from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

const App = () => {
  const sizes = [900, 800, 700, 600, 500, 400];
  const images = sizes.map((size) => ({
    src: `https://placedog.net/${size}/${size}`
  }));

  return (
    <Carousel images={images} />
  );
};

export default App;

```

## Props

To customize the carousel, use the following props:

|Name                     |Type                  |Default    |Description|
|:------------------------|----------------------|:----------|:----------|
|images                   |Array                 |undefined  |Images to be placed in the carousel.|
|children                 |node or Array of nodes|undefined  |HTML element(s) to be placed into the carousel, but it (they) will be placed only if the 'images' prop is falsy.|
|index                    |Number                |undefined  |Current index of the slides of the carousel as a whole number starting from 1.|
|isRTL                    |Boolean               |false      |If true, the carousel shows the right-most slide first (and auto plays from the right to the left).|
|isLoop                   |Boolean               |true       |If true, the carousel form a loop from the ribbon of slides.|
|isMaximized              |Boolean               |false      |If true, the carousel is maximized initially.|
|shouldLazyLoad           |Boolean               |true       |If true, images that are not yet in the viewport of the carousel will be lazy loaded.|
|canAutoPlay              |Boolean               |true       |If true, the carousel has auto play capability.|
|isAutoPlaying            |Boolean               |false      |If true, the carousel's auto play is started initially.|
|autoPlayInterval         |Number                |5000       |Interval of auto play (in milliseconds).|
|hasTransition            |Boolean               |true       |If false, the carousel does not have transition.|
|swipeThreshold           |Number                |0.1        |Threshold swipe distance (in percentage of the width of the viewport of the carousel) to move to the previous or the next slide.|
|swipeRollbackSpeed       |Number                |0.1        |Speed of the transition (in pixels per millisecond) in moving back to the current slide after a swipe smaller than swipeThreshold.|
|transitionSpeed          |Number                |1          |Speed of the transition (in pixels per millisecond) in moving to the previous or the next slide on non-swipe updates on the carousel.|
|transitionDurationLimit  |Number                |1000       |Limit of transition duration (in milliseconds). The limit used to flatten transition duration, where transition duration infinitely approaches this value.|
|transitionDurationMin    |Number                |undefined  |Minimum transition duration (in milliseconds). With transitionDurationMin === transitionDurationMax, the transition duration is set to be a constant.|
|transitionDurationMax    |Number                |undefined  |Maximum transition duration (in milliseconds). It has precedence over 'transitionDurationMin' when transitionDurationMin > transitionDurationMax.|
|widgetsHasShadow         |Boolean               |false      |If true, the following widgets have shadows. If true, the transition will tend to drop frames.|
|hasMediaButton           |Boolean or String     |'topLeft'  |If false, the carousel does not show media button (i.e. play and pause). Its position can be specified by one of ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter','bottomRight']. If the value of 'canAutoPlay' is falsy, media button will not be shown on the carousel.|
|hasIndexBoard            |Boolean or String     |'topCenter'|If false, the carousel does not show index board (e.g. 8/10). Its position can be specified by one of ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter','bottomRight'].|
|hasSizeButton            |Boolean or String     |'topRight' |If false, the carousel does not show size button (i.e. maximize and minimize). Its position can be specified by one of ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter','bottomRight'].|
|hasArrowButtons          |Boolean               |true       |If false, the carousel does not show arrow buttons (i.e. left and right).|
|hasCaptions              |Boolean or String     |false      |If false, the carousel does not show caption for each image. Its position can be specified by one of ['top', 'bottom']|
|hasDotButtons            |Boolean or String     |false      |If false, the carousel does not show dot buttons (i.e. array of dots indicating the current slide in relation to other slides). Its position can be specified by one of ['top', 'bottom']|
|hasThumbnails            |Boolean               |true       |If false, the carousel does not show thumbnails at the bottom.|
|hasMediaButtonAtMax      |Boolean or String     |undefined  |If false, the maximized carousel does not show media button (i.e. play and pause). It overrides 'hasMediaButton' prop for the maximized carousel. Its position can be specified by one of ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter','bottomRight']. If not specified, the value of 'hasMediaButton' will be used. If the value of 'canAutoPlay' is falsy, media button will not be shown on the maximized carousel.|
|hasIndexBoardAtMax       |Boolean or String     |undefined  |If false, the maximized carousel does not show index board (e.g. 8/10). It overrides 'hasIndexBoard' prop for the maximized carousel. Its position can be specified by one of ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter','bottomRight']. If not specified, the value of 'hasIndexBoard' will be used.|
|hasSizeButtonAtMax       |Boolean or String     |undefined  |If false, the maximized carousel does not show size button (i.e. maximize and minimize). It overrides 'hasSizeButton' prop for the maximized carousel. Its position can be specified by one of ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter','bottomRight']. If not specified, the value of 'hasSizeButton' will be used.|
|hasArrowButtonsAtMax     |Boolean               |undefined  |If false, the maximized carousel does not show arrow buttons (i.e. left and right). It overrides 'hasArrowButtons' prop for the maximized carousel. If not specified, the value of 'hasArrowButtons' will be used.|
|hasCaptionsAtMax         |Boolean or String     |undefined  |If false, the maximized carousel does not show caption for each image. It overrides 'hasCaptions' prop for the maximized carousel. Its position can be specified by one of ['top', 'bottom']. If not specified, the value of 'hasCaptions' will be used.|
|hasDotButtonsAtMax       |Boolean or String     |undefined  |If false, the maximized carousel does not show dot buttons (i.e. array of dots indicating the current slide in relation to other slides). It overrides 'hasDotButtons' prop for the maximized carousel. Its position can be specified by one of ['top', 'bottom']. If not specified, the value of 'hasDotButtons' will be used.|
|hasThumbnailsAtMax       |Boolean               |undefined  |If false, the maximized carousel does not show thumbnails at the bottom. It overrides 'hasThumbnails' for the maximized carousel. If not specified, the value without 'hasThumbnails' will be used.|
|leftIcon                 |node                  |undefined  |Left icon (HTML element) to be placed into arrowButtons, but it (they) will be placed only if the 'hasArrowButtons' prop is truthy.|
|rightIcon                |node                  |undefined  |Right icon (HTML element) to be placed into arrowButtons, but it (they) will be placed only if the 'hasArrowButtons' prop is truthy.|
|playIcon                 |node                  |undefined  |Play icon (HTML element) to be placed into mediaButtons, but it (they) will be placed only if the 'hasMediaButton' prop is truthy.|
|pauseIcon                |node                  |undefined  |Pause icon (HTML element) to be placed into mediaButtons, but it (they) will be placed only if the 'hasMediaButton' prop is truthy.|
|minIcon                  |node                  |undefined  |Minimize icon (HTML element) to be placed into sizeButtons, but it (they) will be placed only if the 'hasSizeButton' prop is truthy.|
|maxIcon                  |node                  |undefined  |Maximize icon (HTML element) to be placed into sizeButtons, but it (they) will be placed only if the 'hasSizeButton' prop is truthy.|
|activeIcon               |node                  |undefined  |Active dot icon (HTML element) to be placed into dotButtons, but it (they) will be placed only if the 'hasDotButtons' prop is truthy.|
|passiveIcon              |node                  |undefined  |Passive dot icon (HTML element) to be placed into dotButtons, but it (they) will be placed only if the 'hasDotButtons' prop is truthy.|
|shouldSwipeOnMouse       |Boolean               |true       |If true, the carousel can be swiped by cursor using a mouse or a track pad.|
|shouldMaximizeOnClick    |Boolean               |false      |If true, the carousel can be maximized by clicking. It is suitable for when there is no control widget.|
|shouldMinimizeOnClick    |Boolean               |false      |If true, the carousel can be minimized by clicking. It is suitable for when there is no control widget.|
|shouldMinimizeOnSwipeDown|Boolean               |true       |If true, the carousel can be minimized by touch swiping down.|
|onIndexChange            |Function              |() => {}   |Callback function invoked when the current index is being updated. It is called regardless of whether index value's before and after are the same.|
|objectFit                |String                |'cover'    |CSS 'object-fit' style of the images.|
|className                |String                |undefined  |Class name(s) to be placed on the carousel, when the carousel is not maximized.|
|style                    |Object                |undefined  |Inline style(s) to be placed on the carousel.|

## License

MIT © [yifaneye](https://github.com/yifaneye/react-gallery-carousel)
