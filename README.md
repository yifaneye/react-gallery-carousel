# react-gallery-carousel

Dependency-free, ready-to-go Carousel with support for lazy loading, thumbnail, swiping, pinch zoom, velocity detection and maximisation.

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
    src: `https://placekitten.com/${size}/${size}`
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
|className                |String                |undefined  |Class name(s) to be placed on the carousel, when the carousel is not maximized.|
|style                    |Object                |undefined  |Inline style(s) to be placed on the carousel.|
|index                    |Number                |undefined  |Current index of the slides of the carousel as a whole number starting from 1.|
|isRTL                    |Boolean               |false      |If true, the carousel shows the right-most slide first (and auto plays from the right to the left).|
|isLoop                   |Boolean               |true       |If true, the carousel form a loop from the ribbon of slides.|
|lazyLoad                 |Boolean               |true       |If true, images that are not yet in the viewport of the carousel will be lazy loaded.|
|objectFit                |String                |'cover'    |CSS 'object-fit' style of the images.|
|autoPlay                 |Boolean               |true       |If true, the carousel has auto play capability.|
|autoPlayStarted          |Boolean               |false      |If true, the carousel's auto play is started initially.|
|autoPlayInterval         |Number                |5000       |Interval of auto play (in milliseconds).|
|swipeThreshold           |Number                |0.1        |Threshold swipe distance (in percentage of the width of the viewport of the carousel) to move to the previous or the next slide.|
|hasTransition            |Boolean               |true       |If false, the carousel does not have transition.|
|transitionSpeed          |Number                |1          |Speed of the transition (in pixels per milliseconds) in moving to the previous or the next slide.|
|transitionDurationMin    |Number                |undefined  |Minimum transition duration (in milliseconds). Together with transitionDurationMax, they can be used to set constant transition duration with transitionDurationMin === transitionDurationMax.|
|transitionDurationMax    |Number                |undefined  |Maximum transition duration (in milliseconds). It has precedence over 'transitionDurationMin' when transitionDurationMin > transitionDurationMax.|
|widgetsHasShadow         |Boolean               |false      |If true, the following widgets have shadows. If true, the transition will drop frames when there are a large number (> 20) of images on all tested browsers (Safari, Chrome, Opera, Edge), except Firefox.|
|hasArrowButtons          |Boolean               |true       |If false, the carousel does not show arrow buttons (i.e. left and right).|
|hasMediaButton           |Boolean or String     |'topLeft'  |If false, the carousel does not show media button (i.e. play and pause). Its position can be specified by one of ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter','bottomRight'].|
|hasSizeButton            |Boolean or String     |'topRight' |If false, the carousel does not show size button (i.e. maximize and minimize). Its position can be specified by one of ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter','bottomRight'].|
|hasIndexBoard            |Boolean or String     |'topCenter'|If false, the carousel does not show index board (e.g. 8/10). Its position can be specified by one of ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter','bottomRight'].|
|hasDotButtons            |Boolean or String     |false      |If false, the carousel does not show dot buttons (i.e. array of dots indicating the current slide in relation to other slides). Its position can be specified by one of ['top', 'bottom']|
|hasCaptions              |Boolean or String     |false      |If false, the carousel does not show caption for each image. Its position can be specified by one of ['top', 'bottom']|
|hasThumbnails            |Boolean               |true       |If false, the carousel does not show thumbnails.|
|hasArrowButtonsAtMax     |Boolean               |true       |If false, the maximized carousel does not show arrow buttons (i.e. left and right). It overrides 'hasArrowButtons' prop for the maximized carousel.|
|hasMediaButtonAtMax      |Boolean or String     |'topLeft'  |If false, the maximized carousel does not show media button (i.e. play and pause). It overrides 'hasMediaButton' prop for the maximized carousel. Its position can be specified by one of ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter','bottomRight'].|
|hasSizeButtonAtMax       |Boolean or String     |'topRight' |If false, the maximized carousel does not show size button (i.e. maximize and minimize). It overrides 'hasSizeButton' prop for the maximized carousel. Its position can be specified by one of ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter','bottomRight'].|
|hasIndexBoardAtMax       |Boolean or String     |'topCenter'|If false, the maximized carousel does not show index board (e.g. 8/10). It overrides 'hasIndexBoard' prop for the maximized carousel. Its position can be specified by one of ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter','bottomRight'].|
|hasDotButtonsAtMax       |Boolean or String     |false      |If false, the maximized carousel does not show dot buttons (i.e. array of dots indicating the current slide in relation to other slides). It overrides 'hasDotButtons' prop for the maximized carousel. Its position can be specified by one of ['top', 'bottom']|
|hasCaptionsAtMax         |Boolean or String     |false      |If false, the maximized carousel does not show caption for each image. It overrides 'hasCaptions' prop for the maximized carousel. Its position can be specified by one of ['top', 'bottom']|
|hasThumbnailsAtMax       |Boolean               |true       |If false, the maximized carousel does not show thumbnails. It overrides 'hasThumbnails' for the maximized carousel.|
|leftIcon                 |node                  |undefined  |Left icon (HTML element) to be placed into arrowButtons, but it (they) will be placed only if the 'arrowButtons' prop is truthy.|
|rightIcon                |node                  |undefined  |Right icon (HTML element) to be placed into arrowButtons, but it (they) will be placed only if the 'arrowButtons' prop is truthy.|
|playIcon                 |node                  |undefined  |Play icon (HTML element) to be placed into mediaButtons, but it (they) will be placed only if the 'mediaButton' prop is truthy.|
|pauseIcon                |node                  |undefined  |Pause icon (HTML element) to be placed into mediaButtons, but it (they) will be placed only if the 'mediaButton' prop is truthy.|
|minIcon                  |node                  |undefined  |Minimize icon (HTML element) to be placed into sizeButtons, but it (they) will be placed only if the 'sizeButton' prop is truthy.|
|maxIcon                  |node                  |undefined  |Maximize icon (HTML element) to be placed into sizeButtons, but it (they) will be placed only if the 'sizeButton' prop is truthy.|
|activeIcon               |node                  |undefined  |Active dot icon (HTML element) to be placed into dotButtons, but it (they) will be placed only if the 'dotButtons' prop is truthy.|
|passiveIcon              |node                  |undefined  |Passive dot icon (HTML element) to be placed into dotButtons, but it (they) will be placed only if the 'dotButtons' prop is truthy.|
|shouldSwipeOnMouse       |Boolean               |true       |If true, the carousel can be swiped by cursor using a mouse or a track pad.|
|shouldMaximizeOnClick    |Boolean               |false      |If true, the carousel can be maximized by clicking. It is suitable for when there is no control widget.|
|shouldMinimizeOnClick    |Boolean               |false      |If true, the carousel can be minimized by clicking. It is suitable for when there is no control widget.|
|shouldMinimizeOnSwipeDown|Boolean               |true       |If true, the carousel can be minimized by touch swiping down.|
|onIndexChange            |Function              |() => {}   |Callback function invoked when the current index is being updated. It is called regardless of whether index value's before and after are the same.|

## License

MIT © [yifaneye](https://github.com/yifaneye/react-gallery-carousel)
