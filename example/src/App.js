import React from 'react';
import Header from './components/Header';
import Carousel1 from './components/Carousel1';
import Carousel2 from './components/Carousel2';
import Carousel3 from './components/Carousel3';
import Carousel4 from './components/Carousel4';
import Carousel5 from './components/Carousel5';
import Carousel6 from './components/Carousel6';
import Carousel7 from './components/Carousel7';
import Carousel8 from './components/Carousel8';
import Footer from './components/Footer';

const imageIDs = Array(30) // the maximum is currently 149
  .fill(1)
  .map((_, i) => i + 1);
const images = imageIDs.map((imageID) => {
  return {
    src: `https://placedog.net/400/240?id=${imageID}`,
    srcset: `https://placedog.net/400/240?id=${imageID} 400w, https://placedog.net/700/420?id=${imageID} 700w, https://placedog.net/1000/600?id=${imageID} 1000w`,
    sizes: '(max-width: 1000px) 400px, (max-width: 2000px) 700px, 1000px',
    alt: `Dog No. ${imageID}. Dogs are domesticated mammals, not natural wild animals.`,
    thumbnail: `https://placedog.net/100/60?id=${imageID}`
  };
});

const App = () => {
  return (
    <div className='carousel-page'>
      <Header />
      <Carousel1 />
      <Carousel2 images={images} />
      <Carousel3 images={images} />
      <Carousel4 images={images} />
      <Carousel5 images={images} />
      <Carousel6 images={images} />
      <Carousel7 images={images} />
      <Carousel8 images={images} />
      <Footer />
    </div>
  );
};

export default App;
