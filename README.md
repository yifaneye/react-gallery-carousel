# react-gallery-carousel

React carousel component with support for swiping, image lazy loading and accessibility.

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
      src: `https://placekitten.com/${size}/${size}`,
      alt: `Kitten of size ${size} pixels`
    }));

  return (
    <Carousel images={images} style={{ height: '40vh' }} />
  );
};

export default App;

```

## Props

To customize the carousel, use the following props:

|Name                 |Type                  |Default  |Description|
|:--------------------|:---------------------|:--------|:----------|
|images               |Array                 |undefined|Images to be placed in the carousel.|
|children             |node or Array of nodes|undefined|HTML element(s) to be placed into the carousel, but it (they) will be placed only if the 'images' prop is not present.|
|isRTL                |Boolean               |false    |If true, the carousel shows the right-most slide first (and auto plays from the right to the left).|
|isLoop               |Boolean               |true     |If true, the carousel form a loop from the ribbon of slides.|
|lazyLoad             |Boolean               |true     |If true, images that are not yet in the viewport of the carousel will be lazy loaded.|
|objectFit            |String                |'cover'  |CSS 'object-fit' style of the images.|
|autoPlay             |Boolean               |false    |If true, the carousel has auto play capability.|
|autoPlayPaused       |Boolean               |false    |If true, the carousel's auto play is paused at start.|
|autoPlayInterval     |Number                |5000     |Interval of auto play (in milliseconds).|
|swipeThreshold       |Number                |0.05     |Threshold swipe distance (in percentage of the width of the viewport of the carousel) to move to the previous or the next slide.|
|transitionSpeed      |Number                |1.5      |Speed of the transition (in pixels per milliseconds) in moving to the previous or the next slide.|
|transitionDurationMin|Number                |undefined|Minimum transition duration (in milliseconds).|
|transitionDurationMax|Number                |undefined|Maximum transition duration (in milliseconds). It has precedence over 'transitionMin'.|
|className            |String                |undefined|Class name(s) to be placed on the carousel, when the carousel is not maximized.|
|style                |Object                |undefined|Inline style(s) to be placed on the carousel.|

## License

MIT © [yifaneye](https://github.com/yifaneye/react-gallery-carousel)
