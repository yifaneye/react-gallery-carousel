import React from 'react';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

const Carousel6 = ({ images }) => {
  const thumbnails = images.map((_, idx) => (
    <img src={`https://picsum.photos/id/${idx}/info`} alt='' />
  ));
  const imageElements = images.map((image) => (
    <img src={image.src} alt={image.alt} />
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
