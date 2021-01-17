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
    <Carousel images={images} lazy loop style={{ height: '40vh' }} />
  );
};

export default App;

```

## Props

To customize the carousel, use the following props:

|Name     |Type                  |Default  |Description|
|:--------|:---------------------|:--------|:----------|
|images   |Array                 |null     |Images to be placed in the carousel.|
|children |node or Array of nodes|undefined|HTML element(s) to be placed into the carousel, but it (they) will be placed only if the 'images' prop is not present.|
|fit      |String                |'cover'  |CSS 'object-fit' style of the images.|
|lazy     |Boolean               |false    |If true, images that are not yet in the viewport of the carousel will be lazy loaded.|
|loop     |Boolean               |false    |If true, the carousel form a loop from the ribbon of slides.|
|auto     |Boolean               |false    |If true, the carousel has auto play capability.|
|paused   |Boolean               |false    |If true, the carousel's auto play is paused at start.|
|rtl      |Boolean               |false    |If true, the carousel shows the right-most slide first (and auto plays from the right to the left).|
|interval |Number                |5000     |Interval of auto play (in milliseconds).|
|speed    |Number                |1.5      |Speed of the transition (in pixels per milliseconds) in moving to the previous or the next slide.|
|threshold|Number                |0.1      |Threshold swipe distance (in percentage of the width of the viewport of the carousel) to move to the previous or the next slide.|
|style    |Object                |{}       |Inline style(s) to be placed on the carousel.|

## License

MIT © [yifaneye](https://github.com/yifaneye/react-gallery-carousel)
