import React from 'react';

import { Carousel } from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

const App = () => {
  const kittenImageSizes = [900, 800, 700, 600, 500, 400];
  const images = kittenImageSizes.map((kittenImageSize) => ({
    src: `https://placekitten.com/${kittenImageSize}/${kittenImageSize}`,
    alt: `Kitten of size ${kittenImageSize} pixels`
  }));

  return (
    <div>
      <div
        style={{
          width: '100vw',
          height: '50vh'
        }}
      >
        <Carousel images={images} lazy />
      </div>
      <div
        style={{
          width: '100vw',
          height: '50vh',
          border: '10px solid #bbb',
          overflow: 'hidden',
          borderRadius: 20,
          willChange: 'transform',
          WebkitMaskImage: '-webkit-radial-gradient(white, black)',
          boxSizing: 'border-box'
        }}
      >
        <Carousel
          images={images}
          speed={1500} // px per second
          threshold={0.1} // 10% of image width
          interval={5} // 5 second auto play interval
          fit={'contain'}
          lazy
          auto
          infinite
          loop
        />
      </div>
    </div>
  );
};

export default App;
