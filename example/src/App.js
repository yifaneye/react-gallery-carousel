import React from 'react';

import { Carousel } from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

const App = () => {
  const catImageSizes = [900, 800, 700, 600, 500, 400];
  const images = catImageSizes.map((catImageSize) => ({
    src: `https://placekitten.com/${catImageSize}/${catImageSize}`,
    alt: `Kitten of size ${catImageSize}px`
  }));

  return (
    <>
      <div
        style={{
          width: '100vw',
          height: '50vh'
        }}
      >
        <Carousel images={images} />
      </div>
      <div
        style={{
          width: '50vw',
          height: 450,
          border: '10px solid #bbb',
          overflow: 'hidden',
          borderRadius: 20,
          willChange: 'transform',
          WebkitMaskImage: '-webkit-radial-gradient(white, black)',
          margin: '20px auto'
        }}
      >
        <Carousel images={images} auto infinite rtl loop />
      </div>
    </>
  );
};

export default App;
