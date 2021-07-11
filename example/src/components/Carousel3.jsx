import React from 'react';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

const Carousel3 = ({ images }) => {
  return (
    <section className='section' aria-labelledby='example3'>
      <header className='section-header'>
        <h2 id='example3'>
          Example 3: Default carousel with images and with right-to-left (RTL){' '}
          <a href='https://yifanai.com/rgc3'>code</a>
        </h2>
        <p>
          A default carousel example has lazy loading and preloading; touch
          swiping and mouse dragging on the carousel; touch swiping, mouse
          dragging and wheel scrolling on the thumbnails; touch swipe down to
          exit the maximized carousel; and keyboard navigation.
        </p>
      </header>
      <div className='carousel-container'>
        <Carousel images={images} isRTL={true} />
      </div>
    </section>
  );
};

export default Carousel3;
