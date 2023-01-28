import React, { useRef } from 'react';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

const Carousel7 = ({ images }) => {
  const carouselRef = useRef(null);

  return (
    <section className='section' aria-labelledby='example7'>
      <header className='section-header'>
        <h2 id='example7'>
          Example 7: Default carousel with custom icons{' '}
          <a href='https://yifanai.com/rgc7'>code</a>
        </h2>
        <p>
          To customize the icons, pass custom icon component to props (e.g.{' '}
          <code>leftIcon</code>, <code>rightIcon</code>).
        </p>
      </header>
      <div className='carousel-container'>
        <Carousel
          ref={carouselRef}
          images={images}
          isMaximized={false}
          hasMediaButton={false}
          hasIndexBoard={false}
          maxIcon={
            <span
              className='icon-text'
              role='img'
              aria-label='max'
              style={{
                fontSize: 'min(50px, 5vw)'
              }}
            >
              ↗️
            </span>
          }
          minIcon={
            <span
              className='icon-text'
              role='img'
              aria-label='min'
              style={{
                fontSize: 'min(50px, 5vw)'
              }}
            >
              ↙️
            </span>
          }
          leftIcon={
            <span
              className='icon-text'
              role='img'
              aria-label='left'
              style={{
                fontSize: 'min(50px, 5vw)'
              }}
            >
              ◀️
            </span>
          }
          rightIcon={
            <span
              className='icon-text'
              role='img'
              aria-label='right'
              style={{
                fontSize: 'min(50px, 5vw)'
              }}
            >
              ▶️
            </span>
          }
        />
      </div>
    </section>
  );
};

export default Carousel7;
