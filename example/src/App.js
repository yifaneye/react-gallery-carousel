import React from 'react';

import { Carousel } from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

const App = () => {
  const images = [
    {
      src: 'https://placekitten.com/200/300',
      alt: 'Cat 1'
    },
    {
      src: 'https://placekitten.com/400/300',
      alt: 'Cat 2'
    },
    {
      src: 'https://placekitten.com/600/300',
      alt: 'Cat 3'
    }
  ];
  return (
    <div
      style={{
        width: '100vw',
        height: '50vh'
      }}
    >
      <Carousel images={images} />
    </div>
  );
};

export default App;
