import React from 'react';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

const Carousel6 = ({ images }) => {
  const thumbnails = images.map((_, index) => (
    <span style={{ fontSize: 200, fontWeight: 'bold' }} key={index}>
      {index + 1}
    </span>
  ));
  const imageElements = images.map((image, index) => (
    <img
      src={image.src}
      alt={image.alt}
      className='image-responsive'
      key={index}
    />
  ));

  return (
    <section className='section' aria-labelledby='example6'>
      <header className='section-header'>
        <h2 id='example6'>
          Example 6: Carousel with custom children and custom thumbnails{' '}
          <a href='https://yifanai.com/rgc6'>code</a>
        </h2>
      </header>
      <div className='carousel-container'>
        <Carousel thumbnails={thumbnails}>{imageElements}</Carousel>
      </div>
    </section>
  );
};

export default Carousel6;
